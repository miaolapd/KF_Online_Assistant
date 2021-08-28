/* 争夺模块 */
'use strict';
import Info from './Info';
import * as Util from './Util';
import * as Msg from './Msg';
import * as Dialog from './Dialog';
import Const from './Const';
import {read as readConfig, write as writeConfig} from './Config';
import * as Log from './Log';
import * as TmpLog from './TmpLog';
import * as Script from './Script';
import * as Public from './Public';
import * as Item from './Item';

// SafeID
let safeId;
// 争夺属性区域
let $properties;
// 点数区域
let $points;
// 装备区域
let $armArea;
// 争夺记录区域容器
let $logBox;
// 争夺记录区域
let $log;
// 争夺记录
let log = '';
// 各层争夺记录列表
let logList = [];
// 各层战斗信息列表
let levelInfoList = [];
// 当前争夺属性
let propertyList = {};
// 额外点数列表
let extraPointsList = {};
// 光环信息
let haloInfo = {};
// 当前装备情况
let currentArmInfo = new Map();
// 装备等级情况列表
let armsLevelList = new Map();
// 道具使用情况列表
let itemUsedNumList = new Map();
// 修改点数可用次数
let changePointsAvailableCount = 0;
// 服务器状态
let serverStatus = '';

/**
 * 初始化
 */
export const init = function () {
    safeId = Public.getSafeId();
    if (!safeId) return;

    $properties = $('.kf_fw_ig3:first');
    $points = $('#wdsx .kf_fw_ig1:first');
    $points.find('> tbody > tr:first-child > td').attr('id', 'pdArmArea');
    $armArea = $points.find('#pdArmArea');

    let tmpHaloInfo = TmpLog.getValue(Const.haloInfoTmpLogName);
    if (tmpHaloInfo && $.type(tmpHaloInfo) === 'object') {
        let diff = $.now() - tmpHaloInfo.time;
        if (diff >= 0 && diff < Const.tmpHaloInfoExpires * 60 * 1000) {
            delete tmpHaloInfo.time;
            setHaloInfo(tmpHaloInfo);
            enhanceLootIndexPage();
        } else readHaloInfo(true);
    } else readHaloInfo(true);
};

/**
 * 增强争夺首页
 */
export const enhanceLootIndexPage = function () {
    Script.runFunc('Loot.enhanceLootIndexPage_before_');
    let propertiesHtml = $properties.html();
    propertyList = getLootPropertyList(propertiesHtml);
    itemUsedNumList = Item.getItemsUsedNumInfo(propertiesHtml);
    armsLevelList = Item.getArmsLevelInfo(propertiesHtml);

    let armHtml = $armArea.html();
    if (armHtml.includes('（装备中）')) {
        let [armInfoHtml] = armHtml.split('<br><br>');
        let [, weaponInfoHtml = '', armorInfoHtml = ''] = armInfoHtml.split('（装备中）');
        currentArmInfo.set('武器', Item.getArmInfo(weaponInfoHtml));
        currentArmInfo.set('护甲', Item.getArmInfo(armorInfoHtml));
    } else {
        console.log('需要至少使用一件装备才能在此页面正常使用KFOL助手的功能');
        return;
    }

    $logBox = $('#pk_text_div');
    $log = $('#pk_text');
    log = $log.html();
    logList = getLogList(log);
    levelInfoList = getLevelInfoList(logList);

    handlePropertiesArea();
    handlePointsArea();
    addLevelPointListSelect();
    if (Config.alwaysOpenPointAreaEnabled) {
        $('#wdsx').show();
    }

    Script.runFunc('Loot.enhanceLootIndexPage_after_');
};

/**
 * 处理争夺属性区域
 */
const handlePropertiesArea = function () {
    $properties.attr('id', 'pdPropertiesArea')
        .find('input[value$="可分配属性"]').after('<span id="pdSurplusPoint" class="pd_property_diff" hidden>(<em></em>)</span>');

    let $serverStatus = $properties.find('> tbody > tr:first-child td:contains("错高峰福利") > span:last').attr('id', 'pdServerStatus');
    if ($serverStatus.length > 0) {
        serverStatus = $serverStatus.text().trim();
        $serverStatus.attr('id', 'pdServerStatus').data('prev-status', serverStatus);
    }

    $properties.on('change', '.pd_arm_level', function () {
        let type = $(this).data('type');
        let diffName = 'Weapon';
        if (type === '护甲') diffName = 'Armor';
        else if (type === '项链') diffName = 'Necklace';
        $(`#pd${diffName}ExpDiff em`).text(armsLevelList.get(type)['经验'] - Math.pow((armsLevelList.get(type)['等级'] + 1), 2) * 2);
    });
    $properties.find('input[value^="武器等级"]').addClass('pd_arm_level').attr('data-type', '武器')
        .after(`<span id="pdWeaponExpDiff" class="pd_property_diff" title="下一级经验差值" style="color: #393;">(<em></em>)</span>`).trigger('change');
    $properties.find('input[value^="护甲等级"]').addClass('pd_arm_level').attr('data-type', '护甲')
        .after(`<span id="pdArmorExpDiff" class="pd_property_diff" title="下一级经验差值" style="color: #393;">(<em></em>)</span>`).trigger('change');
    $properties.find('input[value^="项链等级"]').addClass('pd_arm_level').attr('data-type', '项链')
        .after(`<span id="pdNecklaceExpDiff" class="pd_property_diff" title="下一级经验差值" style="color: #393;">(<em></em>)</span>`).trigger('change');

    $('<a data-name="copyParameterSetting" href="#" style="margin-left: -20px;" title="复制计算器的部分参数设置（包括神秘系数、光环和道具数量）">复</a>')
        .insertAfter($properties.find('input[value$="蕾米莉亚同人漫画"]'))
        .click(function (e) {
            e.preventDefault();
            let $this = $(this);
            let coefficient = Math.floor(
                (propertyList['可分配属性点'] - 50 - (itemUsedNumList.get('档案室钥匙') === 30 ? 30 : 0) - (itemUsedNumList.get('消逝之药') === 10 ? 120 : 0)) / 5
            );
            let copyText = coefficient + ' ' + Math.floor(haloInfo['全属性'] * 1000) + '\n';
            for (let value of itemUsedNumList.values()) {
                copyText += value + ' ';
            }
            $this.data('copy-text', copyText.trim());
            console.log('KFOL计算器的部分参数设置：\n' + copyText.trim());
            if (!Util.copyText($this, 'KFOL计算器的部分参数设置已复制')) {
                alert('你的浏览器不支持复制，请打开Web控制台查看');
            }
        });
};

/**
 * 处理点数区域
 */
const handlePointsArea = function () {
    $points.find('[type="text"]:not([readonly])').attr('type', 'number').attr('min', 1).attr('max', 9999)
        .prop('required', true).css('width', '60px').addClass('pd_point').next('span').addClass('pd_extra_point')
        .after('<span class="pd_sum_point" style="color: #f03; cursor: pointer;" title="点击：给该项加上或减去剩余属性点"></span>');
    $points.find('input[readonly]').attr('type', 'number').prop('disabled', true).css('width', '60px');

    let [armInfoHtml, finalAddAdditionHtml = ''] = $armArea.html().split('<br><br>', 2);
    let [, weaponInfoHtml = '', armorInfoHtml = ''] = armInfoHtml.split('（装备中）');
    let newArmHtml = '';
    if (weaponInfoHtml) newArmHtml += '（装备中）' + Item.handleUselessSubProperties(weaponInfoHtml);
    if (armorInfoHtml) newArmHtml += '（装备中）' + Item.handleUselessSubProperties(armorInfoHtml);
    if (finalAddAdditionHtml) newArmHtml += '<br><br>' + finalAddAdditionHtml;
    $armArea.html(newArmHtml);

    $(`
<tr>
  <td>
    装备ID和备注
    <span class="pd_cfg_tips" title="可点击右边的“更换装备”按钮，也可手动填写装备ID。留空表示不更换装备。
当文本框内的装备ID发生变化时，点击攻击按钮将会自动更换装备（点击“修改点数分配”按钮只会修改点数而不会更换装备）。">[?]</span>
  </td>
  <td>
    <input class="pd_arm_input" name="weaponId" type="text" value="" maxlength="15" title="武器ID" placeholder="武器ID" style="width: 70px;">
    <input class="pd_arm_input" name="weaponMemo" type="text" value="" maxlength="20" title="武器备注" placeholder="武器备注" style="width: 80px;">
    <input class="pd_arm_input" name="armorId" type="text" value="" maxlength="15" title="护甲ID" placeholder="护甲ID" style="width: 70px;">
    <input class="pd_arm_input" name="armorMemo" type="text" value="" maxlength="20" title="护甲备注" placeholder="护甲备注" style="width: 80px;">
    <a class="pd_btn_link" data-name="changeArm" href="#" title="更换当前装备">更换装备</a>
  </td>
</tr>
`).insertAfter($armArea.parent()).find('[data-name="changeArm"]').click(function (e) {
        e.preventDefault();
        addOrChangeArm(0);
    });

    $points.find('input[name="prosubmit"]').replaceWith('<button name="prosubmit" type="submit">修改点数分配</button>');
    $('<button name="changePointsAndArms" type="button" title="按照当前页面上的点数设置和装备ID进行修改" style="margin-left: 3px;">修改点数和装备</button>')
        .insertAfter($points.find('button[name="prosubmit"]'))
        .click(function () {
            let $wait = Msg.wait('<strong>正在修改点数和装备&hellip;</strong>');
            changePointsAndArms(-1, function (result) {
                if (result === 'success') {
                    updateLootInfo(function () {
                        Msg.remove($wait);
                        Msg.show('<strong>已成功修改为指定的点数设置和装备ID</strong>', 3);
                    });
                } else {
                    Msg.remove($wait);
                    if (result === 'ignore') {
                        alert('当前页面的点数设置和装备ID没有发生变化');
                    } else if (result === 'timeout') {
                        alert('连接超时，请重试');
                    }
                }
            });
        });

    let $changeCount = $points.find('> tbody > tr:last-child > td:last-child');
    $changeCount.wrapInner('<span id="pdChangeCount"></span>');
    let changeCountMatches = /当前修改配点可用\[(\d+)]次/.exec($changeCount.text());
    if (changeCountMatches) {
        changePointsAvailableCount = parseInt(changeCountMatches[1]);
    }
    let countDownMatches = /\(下次修改配点还需\[(\d+)]分钟\)/.exec($changeCount.text());
    if (countDownMatches) {
        let nextTime = Util.getDate(`+${countDownMatches[1]}m`);
        Util.setCookie(Const.changePointsInfoCookieName, nextTime.getTime(), nextTime);
    } else {
        let count = parseInt(Util.getCookie(Const.changePointsInfoCookieName));
        if (count !== changePointsAvailableCount) {
            Util.setCookie(Const.changePointsInfoCookieName, changePointsAvailableCount + 'c', Util.getDate(`+${Const.changePointsInfoExpires}m`));
        }
    }

    extraPointsList = {
        '耐力': parseInt($points.find('[name="p"]').next('span').text()),
        '幸运': parseInt($points.find('[name="l"]').next('span').text()),
    };

    /**
     * 显示剩余属性点
     */
    const showSurplusPoint = function () {
        let surplusPoint = propertyList['可分配属性点'] - getCurrentAssignedPoint($points.find('.pd_point'));
        $('#pdSurplusPoint').prop('hidden', surplusPoint === 0).css('color', surplusPoint !== 0 ? (surplusPoint > 0 ? '#f03' : '#393') : '#000')
            .find('em').text((surplusPoint > 0 ? '+' : '') + surplusPoint);
    };

    /**
     * 显示各项点数的额外加成
     * @param {jQuery} $point 点数字段对象
     */
    const showExtraPoint = function ($point) {
        let num = parseInt($point.val());
        if (!num || num < 0) num = 1;
        let extraNum = getExtraPoint(getPointNameByFieldName($point.attr('name')), num);
        $point.next('.pd_extra_point').text('+' + extraNum);
    };

    /**
     * 显示各项点数的和值
     * @param {jQuery} $point 点数字段对象
     */
    const showSumOfPoint = function ($point) {
        let num = parseInt($point.val());
        if (!num || num < 0) num = 1;
        let extraNum = parseInt($point.next('.pd_extra_point').text());
        $point.next('.pd_extra_point').next('.pd_sum_point').text('=' + (num + extraNum));
    };

    $points.on('change', '.pd_point', function () {
        let $this = $(this);
        showSurplusPoint();
        showExtraPoint($this);
        showSumOfPoint($this);
    }).on('click', '.pd_sum_point', function () {
        let surplusPoint = propertyList['可分配属性点'] - getCurrentAssignedPoint($points.find('.pd_point'));
        if (!surplusPoint) return;
        let $point = $(this).prev('span').prev('.pd_point');
        if (!$point.length) return;
        let num = parseInt($point.val());
        if (isNaN(num) || num < 0) num = 0;
        num = num + surplusPoint;
        $point.val(num < 1 ? 1 : num).trigger('change');
    }).closest('form').submit(() => {
        Util.deleteCookie(Const.changePointsInfoCookieName);
        return checkPoints($points);
    }).find('.pd_point').trigger('change');
};

/**
 * 检查点数设置
 * @param {jQuery} $points 点数字段对象
 * @returns {boolean} 检查结果
 */
const checkPoints = function ($points) {
    let surplusPoint = propertyList['可分配属性点'] - getCurrentAssignedPoint($points.find('.pd_point'));
    if (surplusPoint < 0) {
        alert('剩余属性点为负，请重新填写');
        return false;
    } else if (surplusPoint > 0) {
        if (!confirm('可分配属性点尚未用完，是否继续？')) return false;
    }
    return true;
};

/**
 * 获取争夺属性列表
 * @param {string} html 争夺属性区域的HTML代码
 * @returns {{}} 争夺属性
 */
const getLootPropertyList = function (html) {
    let propertyList = {
        '攻击力': 0,
        '生命值': 0,
        '最大生命值': 0,
        '攻击速度': 0,
        '暴击几率': 0,
        '技能伤害': 0,
        '技能释放概率': 0,
        '防御': 0,
        '可分配属性点': 0,
    };
    let matches = /"(\d+)攻击力"/.exec(html);
    if (matches) propertyList['攻击力'] = parseInt(matches[1]);
    matches = /"(\d+)\/(\d+)生命值"/.exec(html);
    if (matches) {
        propertyList['生命值'] = parseInt(matches[1]);
        propertyList['最大生命值'] = parseInt(matches[2]);
    }
    matches = /"(\d+)攻击速度"/.exec(html);
    if (matches) propertyList['攻击速度'] = parseInt(matches[1]);
    matches = /"(\d+(?:\.\d+)?)%减伤"/.exec(html);
    if (matches) propertyList['防御'] = parseFloat(matches[1]);
    matches = /"(\d+)\s*可分配属性"/.exec(html);
    if (matches) propertyList['可分配属性点'] = parseInt(matches[1]);
    return propertyList;
};

/**
 * 获取当前已分配的点数
 * @param {jQuery} $points 点数字段对象
 * @returns {number} 当前已分配的点数
 */
export const getCurrentAssignedPoint = function ($points) {
    let usedPoint = 0;
    $points.each(function () {
        let $this = $(this);
        let name = $this.attr('name');
        let point = parseInt($this.val());
        if (point && point > 0) usedPoint += point;
    });
    return usedPoint;
};

/**
 * 获取技能伤害的值
 * @param {number} power 力量总和
 * @param {number} life 体质总和
 * @param {number} intelligence 智力总和
 * @returns {number} 技能伤害的值
 */
export const getSkillAttack = (power, life, intelligence) => power * 5 + life * 5 + intelligence * 5;

/**
 * 根据字段名称获取点数名称
 * @param {string} fieldName 字段名称
 * @returns {string} 点数名称
 */
export const getPointNameByFieldName = function (fieldName) {
    switch (fieldName) {
        case 's1':
            return '力量';
        case 's2':
            return '体质';
        case 'd1':
            return '敏捷';
        case 'd2':
            return '灵活';
        case 'i1':
            return '智力';
        case 'i2':
            return '意志';
        case 'p':
            return '耐力';
        case 'l':
            return '幸运';
        case 'weaponId':
            return '武器ID';
        case 'weaponMemo':
            return '武器备注';
        case 'armorId':
            return '护甲ID';
        case 'armorMemo':
            return '护甲备注';
        default:
            return '';
    }
};

/**
 * 根据点数名称获取字段名称
 * @param {string} pointName 点数名称
 * @returns {string} 字段名称
 */
export const getFieldNameByPointName = function (pointName) {
    switch (pointName) {
        case '力量':
            return 's1';
        case '体质':
            return 's2';
        case '敏捷':
            return 'd1';
        case '灵活':
            return 'd2';
        case '智力':
            return 'i1';
        case '意志':
            return 'i2';
        case '耐力':
            return 'p';
        case '幸运':
            return 'l';
        case '武器ID':
            return 'weaponId';
        case '武器备注':
            return 'weaponMemo';
        case '护甲ID':
            return 'armorId';
        case '护甲备注':
            return 'armorMemo';
        default:
            return '';
    }
};

/**
 * 根据指定的点数获得相应额外加成点数
 * @param {string} pointName 点数名称
 * @param {number} point 点数的值
 * @returns {number} 额外加成点数
 */
export const getExtraPoint = function (pointName, point) {
    let elapsedMedicine = itemUsedNumList.get('消逝之药') * 5;
    let haloPercent = haloInfo['全属性'];
    switch (pointName) {
        case '力量':
            return Math.floor(point * haloPercent) + itemUsedNumList.get('蕾米莉亚同人漫画') + elapsedMedicine;
        case '体质':
            return Math.floor(point * haloPercent) + itemUsedNumList.get('蕾米莉亚同人漫画') + elapsedMedicine;
        case '敏捷':
            return Math.floor(point * haloPercent) + itemUsedNumList.get('十六夜同人漫画') + elapsedMedicine;
        case '灵活':
            return Math.floor(point * haloPercent) + itemUsedNumList.get('十六夜同人漫画') + elapsedMedicine;
        case '智力':
            return Math.floor(point * haloPercent) + elapsedMedicine;
        case '意志':
            return Math.floor(
                (Math.floor(point * haloPercent) + elapsedMedicine + point) * (currentArmInfo.get('护甲')['组别'] === '铠甲' ? 1.1 : 1)
            ) - point;
        default:
            return 0;
    }
};

/**
 * 根据指定的点数获得相应争夺属性的值
 * @param {string} pointName 点数名称
 * @param {number} point 点数的值
 * @returns {number} 争夺属性的值
 */
export const getPropertyByPoint = function (pointName, point) {
    let pointValue = point + getExtraPoint(pointName, point);
    switch (pointName) {
        case '力量':
            return pointValue * 5 + haloInfo['攻击力'];
        case '体质':
            return pointValue * 20 + (itemUsedNumList.get('蕾米莉亚同人漫画') === 50 ? 700 : 0) + haloInfo['生命值'];
        case '敏捷':
            return pointValue * 2 + (itemUsedNumList.get('十六夜同人漫画') === 50 ? 100 : 0);
        case '灵活':
            return Math.round(pointValue / (pointValue + 100) * 100);
        case '智力':
            return Math.round(pointValue / (pointValue + 90) * 100);
        case '意志':
            return Math.round(pointValue / (pointValue + 150) * 100);
        default:
            return 0;
    }
};

/**
 * 根据指定的争夺属性获得相应点数的值
 * @param {string} pointName 点数名称
 * @param {number} num 争夺属性的值
 * @returns {number} 点数的值
 */
export const getPointByProperty = function (pointName, num) {
    let elapsedMedicine = itemUsedNumList.get('消逝之药') * 5;
    let haloPercent = 1 + haloInfo['全属性'];
    let value = 0;
    switch (pointName) {
        case '力量':
            value = Math.ceil((Math.ceil((num - haloInfo['攻击力']) / 5) - itemUsedNumList.get('蕾米莉亚同人漫画') - elapsedMedicine) / haloPercent);
            break;
        case '体质':
            value = Math.ceil(
                (Math.ceil(((num - haloInfo['生命值']) - (itemUsedNumList.get('蕾米莉亚同人漫画') === 50 ? 700 : 0)) / 20)
                    - itemUsedNumList.get('蕾米莉亚同人漫画') - elapsedMedicine) / haloPercent
            );
            break;
        case '敏捷':
            value = Math.ceil(
                (Math.ceil((num - (itemUsedNumList.get('十六夜同人漫画') === 50 ? 100 : 0)) / 2) - itemUsedNumList.get('十六夜同人漫画')
                    - elapsedMedicine) / haloPercent
            );
            break;
        case '灵活':
            value = Math.floor((Math.round(100 * num / (100 - num)) - itemUsedNumList.get('十六夜同人漫画') - elapsedMedicine) / haloPercent);
            break;
        case '智力':
            value = Math.floor((Math.round(90 * num / (100 - num)) - elapsedMedicine) / haloPercent);
            break;
        case '意志':
            value = Math.floor((Math.round(150 * num / (100 - num)) - elapsedMedicine) / haloPercent);
            break;
    }
    if (!isFinite(value) || value < 1) value = 1;
    return value;
};

/**
 * 添加各层点数分配方案选择框
 */
const addLevelPointListSelect = function () {
    $(`
<tr>
  <td colspan="2">
    <select id="pdLevelPointListSelect" style="margin: 5px 0;">
      <option>点数分配方案</option>
      <option value="0">默认</option>
    </select>
    <a class="pd_btn_link" data-name="save" href="#" title="将当前点数设置保存为新的方案">保存</a>
    <a class="pd_btn_link" data-name="edit" href="#" title="编辑各层点数分配方案">编辑</a>
    <a class="pd_btn_link" data-name="fill" href="#" title="输入一串数字按顺序填充到各个点数字段中">填充</a>
  </td>
</tr>`).prependTo($points.find('> tbody')).find('#pdLevelPointListSelect').change(function () {
        let level = parseInt($(this).val());
        if (level > 0) {
            let points = Config.levelPointList[parseInt(level)];
            if (typeof points !== 'object') return;
            $points.find('.pd_point, .pd_arm_input').each(function () {
                let $this = $(this);
                let pointName = getPointNameByFieldName($this.attr('name'));
                $this.val(points[pointName]);
            }).trigger('change');
        } else if (level === 0) {
            $points.find('.pd_point, .pd_arm_input').each(function () {
                $(this).val(this.defaultValue);
            }).trigger('change');
        }
    }).end().find('[data-name="save"]').click(function (e) {
        e.preventDefault();
        if (!checkPoints($points)) return;
        let $levelPointListSelect = $('#pdLevelPointListSelect');
        let level = parseInt($levelPointListSelect.val());
        level = parseInt(prompt('请输入层数：', level ? level : ''));
        if (!level || level < 0) return;

        readConfig();
        if (level in Config.levelPointList) {
            if (!confirm('该层数已存在，是否覆盖？')) return;
        }
        let points = {};
        for (let elem of Array.from($points.find('.pd_point, .pd_arm_input'))) {
            let $elem = $(elem);
            let name = $elem.attr('name');
            let value = $.trim($elem.val());
            if ($elem.is('.pd_point')) {
                value = parseInt(value);
                if (!value || value < 0) return;
            } else {
                if (!value) continue;
                if (name === 'weaponId' || name === 'armorId') {
                    value = parseInt(value);
                    if (!value || value < 0) return;
                }
            }
            points[getPointNameByFieldName(name)] = value;
        }
        Config.levelPointList[level] = points;
        writeConfig();
        setLevelPointListSelect(Config.levelPointList);
        $levelPointListSelect.val(level);
    }).end().find('[data-name="edit"]').click(function (e) {
        e.preventDefault();
        showLevelPointListConfigDialog();
    }).end().find('[data-name="fill"]').click(function (e) {
        e.preventDefault();
        fillPoints($points);
    });
    setLevelPointListSelect(Config.levelPointList);
};

/**
 * 填充点数设置
 * @param $points
 */
const fillPoints = function ($points) {
    let value = $.trim(prompt(`请输入以任意字符分隔的一串数字，按顺序填充到各个点数字段中（注：5位数以上的数字将被当作装备ID）：
可直接输入计算器输出的点数设置，例：1 100 50 5 25 1  0 3 Bow #1234567 Cloth #7654321`));
    if (!value) return;
    let pointsMatches = /^\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+\d+\s+\d+\s+(\S+)\s+#(\d+)\s+(\S+)\s+#(\d+)/.exec(value);
    if (!pointsMatches) {
        pointsMatches = /^\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+\d+\s+(\S+)\s+#(\d+)/.exec(value);
    }
    if (pointsMatches) {
        $points.find('.pd_point').each(function (index) {
            if (index + 1 < pointsMatches.length) {
                $(this).val(pointsMatches[index + 1]).trigger('change');
            }
        });
        $points.find('input[name="weaponMemo"]').val(pointsMatches[7]);
        $points.find('input[name="weaponId"]').val(pointsMatches[8]);
        if (pointsMatches[9] && pointsMatches[10]) {
            $points.find('input[name="armorMemo"]').val(pointsMatches[9]);
            $points.find('input[name="armorId"]').val(pointsMatches[10]);
        }
    } else {
        let numMatches = value.match(/\b\d{1,4}\b/g);
        if (!numMatches) return;
        $points.find('.pd_point').each(function (index) {
            if (index < numMatches.length) $(this).val(parseInt(numMatches[index])).trigger('change');
            else return false;
        });
        let armIdMatches = value.match(/\b(\d{5,})\b/g);
        for (let i in armIdMatches) {
            let name = parseInt(i) === 0 ? 'weaponId' : 'armorId';
            $points.find(`input[name="${name}"]`).val(armIdMatches[i]);
        }
    }
};

/**
 * 设置各层点数分配方案选择框
 * @param {{}} levelPointList 各层点数分配列表
 */
const setLevelPointListSelect = function (levelPointList) {
    let pointListHtml = '';
    for (let [level, points] of Util.entries(levelPointList)) {
        if (!$.isNumeric(level)) continue;
        pointListHtml += `<option value="${level}">第${level}层 ${points['武器ID'] || points['护甲ID'] ? '(装)' : ''}</option>`;
    }
    $('#pdLevelPointListSelect').find('option:gt(1)').remove().end().append(pointListHtml);
};

/**
 * 修改点数分配方案和装备
 * @param {number} nextLevel 下一层（设为-1表示采用当前点数分配方案）
 * @param {function} callback 回调函数
 */
export const changePointsAndArms = function (nextLevel, callback) {
    if (nextLevel > 0 && Config.customPointsScriptEnabled && typeof Const.getCustomPoints === 'function') {
        let points = null;
        try {
            points = Const.getCustomPoints(
                $.extend(getLootInfo(), {getExtraPoint, getPointByProperty, getPropertyByPoint})
            );
        } catch (ex) {
            console.log(ex);
        }
        if ($.type(points) === 'object') {
            for (let [key, value] of Util.entries(points)) {
                $points.find(`input[name="${getFieldNameByPointName(key)}"]`).val(value).trigger('change');
            }
            nextLevel = -1;
        } else if (typeof points === 'number') {
            nextLevel = parseInt(points);
            nextLevel = nextLevel > 1 ? nextLevel : 1;
        } else if (points === false) {
            return callback('ignore');
        } else {
            return callback('error');
        }
    }

    let nextLevelText = getCurrentLevel(logList) + 1;
    let changeLevel = nextLevel > 0 ? Math.max(...Object.keys(Config.levelPointList).filter(level => level <= nextLevel)) : -1;
    let $levelPointListSelect = $('#pdLevelPointListSelect');
    if (changeLevel > 0) $levelPointListSelect.val(changeLevel).trigger('change');
    else $levelPointListSelect.get(0).selectedIndex = 0;
    let isChangeWeapon = false, isChangeArmor = false, isChangePoints = false;
    $points.find('.pd_point, input[name="weaponId"], input[name="armorId"]').each(function () {
        let $this = $(this);
        let name = $this.attr('name');
        let value = $.trim($this.val());
        if (parseInt(value) > 0 && this.defaultValue !== value) {
            if (name === 'weaponId') isChangeWeapon = true;
            else if (name === 'armorId') isChangeArmor = true;
            else isChangePoints = true;
        }
    });

    if (isChangeWeapon || isChangeArmor || isChangePoints) {
        if (Config.unusedPointNumAlertEnabled && !Info.w.unusedPointNumAlert && parseInt($('#pdSurplusPoint > em').text()) > 0) {
            if (confirm('可分配属性点尚未用完，是否继续？')) Info.w.unusedPointNumAlert = true;
            else return callback('error');
        }

        let weaponId = parseInt($points.find('input[name="weaponId"]').val());
        let armorId = parseInt($points.find('input[name="armorId"]').val());
        let ajaxList = ['ignore', 'ignore', 'ignore'];
        if (isChangeWeapon) {
            ajaxList[0] = {
                type: 'POST',
                url: 'kf_fw_ig_mybpdt.php',
                timeout: Const.defAjaxTimeout,
                data: `do=4&id=${weaponId}&safeid=${safeId}`,
            };
        }
        if (isChangeArmor) {
            ajaxList[1] = {
                type: 'POST',
                url: 'kf_fw_ig_mybpdt.php',
                timeout: Const.defAjaxTimeout,
                data: `do=4&id=${armorId}&safeid=${safeId}`,
            };
        }
        if (isChangePoints) {
            ajaxList[2] = {
                type: 'POST',
                url: 'kf_fw_ig_enter.php',
                timeout: Const.defAjaxTimeout,
                data: $points.closest('form').serialize(),
            };
        }

        let result = 'success';
        $(document).clearQueue('ChangePointsAndArms');
        $.each(ajaxList, function (index, ajax) {
            if (ajax === 'ignore') return;
            $(document).queue('ChangePointsAndArms', function () {
                $.ajax(ajax).done(function (html) {
                    if (index === 0) {
                        let msg = Util.removeHtmlTag(html);
                        if (/装备完毕/.test(msg)) {
                            $points.find('input[name="weaponId"], input[name="weaponMemo"]').each(function () {
                                this.defaultValue = $(this).val();
                            });
                            if (Config.autoSaveArmsInfoEnabled) {
                                let armsInfo = Item.readArmsInfo();
                                armsInfo['已装备武器'] = weaponId;
                                Item.writeArmsInfo(armsInfo);
                            }
                        } else {
                            Msg.show((`<strong>更换武器：${msg}</strong>`), -1);
                            Script.runFunc('Loot.lootAttack_changePointsAndArms_error_', msg);
                            result = 'error';
                        }
                    } else if (index === 1) {
                        let msg = Util.removeHtmlTag(html);
                        if (/装备完毕/.test(msg)) {
                            $points.find('input[name="armorId"], input[name="armorMemo"]').each(function () {
                                this.defaultValue = $(this).val();
                            });
                            if (Config.autoSaveArmsInfoEnabled) {
                                let armsInfo = Item.readArmsInfo();
                                armsInfo['已装备护甲'] = armorId;
                                Item.writeArmsInfo(armsInfo);
                            }
                        } else {
                            Msg.show((`<strong>更换护甲：${msg}</strong>`), -1);
                            Script.runFunc('Loot.lootAttack_changePointsAndArms_error_', msg);
                            result = 'error';
                        }
                    } else if (index === 2) {
                        let {msg} = Util.getResponseMsg(html);
                        if (/已经重新配置加点！/.test(msg)) {
                            Util.deleteCookie(Const.changePointsInfoCookieName);
                            $points.find('.pd_point').each(function () {
                                this.defaultValue = $(this).val();
                            });
                        } else {
                            let matches = /你还需要等待(\d+)分钟/.exec(msg);
                            if (matches) {
                                let nextTime = Util.getDate(`+${parseInt(matches[1])}m`);
                                Util.setCookie(Const.changePointsInfoCookieName, nextTime.getTime(), nextTime);
                            }
                            Msg.show((`<strong>第<em>${nextLevelText}</em>层方案：${msg}</strong>`), -1);
                            Script.runFunc('Loot.lootAttack_changePointsAndArms_error_', msg);
                            result = 'error';
                        }
                    }
                }).fail(function () {
                    result = 'timeout';
                }).always(function () {
                    if (result === 'error' || result === 'timeout') {
                        $(document).clearQueue('ChangePointsAndArms');
                        callback(result);
                    } else if (!$(document).queue('ChangePointsAndArms').length) {
                        Script.runFunc('Loot.changePointsAndArms_success_');
                        callback(result);
                    } else {
                        setTimeout(() => $(document).dequeue('ChangePointsAndArms'), Const.minActionInterval);
                    }
                });
            });
        });
        $(document).dequeue('ChangePointsAndArms');
    } else {
        callback('ignore');
    }
};

/**
 * 更新争夺信息
 * @param {function} callback 回调函数
 */
export const updateLootInfo = function (callback = null) {
    console.log('更新争夺信息Start');
    $.ajax({
        type: 'GET',
        url: 'kf_fw_ig_index.php?t=' + $.now(),
        timeout: Const.defAjaxTimeout,
    }).done(function (html) {
        let $area = $('#wdsx', html).parent();
        log = $area.find('#pk_text').html();
        if (!log) {
            Msg.remove($('.pd_countdown').closest('.pd_msg'));
            return;
        }

        $area.find('.kf_fw_ig3:first input[type="text"]').each(function (index) {
            let value = $.trim($(this).val());
            if (!value) return;
            $properties.find(`input[type="text"]:eq(${index})`).val(value);
        });

        let serverStatusMatches = /错高峰福利：当前服务器状态\[\s*<span style="color:(#[a-fA-F0-9]+);[^<>]+>(\S+?)<\/span>\s*\]/.exec(html);
        if (serverStatusMatches) {
            let serverStatusColor = serverStatusMatches[1];
            serverStatus = serverStatusMatches[2];
            if (Const.debug) console.log('当前服务器状态：' + serverStatus);
            $properties.find('#pdServerStatus').text(serverStatus).css('color', serverStatusColor);
        }

        let countDownMatches = /\(下次修改配点还需\[(\d+)]分钟\)/.exec(html);
        if (countDownMatches) {
            changePointsAvailableCount = 0;
            let nextTime = Util.getDate(`+${countDownMatches[1]}m`);
            Util.setCookie(Const.changePointsInfoCookieName, nextTime.getTime(), nextTime);
            $points.find('#pdChangeCount').text(`(下次修改配点还需[${countDownMatches[1]}]分钟)`);
        }
        let changeCountMatches = /当前修改配点可用\[(\d+)]次/.exec(html);
        if (changeCountMatches) {
            changePointsAvailableCount = parseInt(changeCountMatches[1]);
            Util.setCookie(Const.changePointsInfoCookieName, changePointsAvailableCount + 'c', Util.getDate(`+${Const.changePointsInfoExpires}m`));
            $points.find('#pdChangeCount').text(`(当前修改配点可用[${changePointsAvailableCount}]次)`);
        }

        let armHtml = $area.find('.kf_fw_ig1:first > tbody > tr:first-child > td').html();
        if (armHtml.includes('（装备中）')) {
            let [armInfoHtml, finalAddAdditionHtml = ''] = armHtml.split('<br><br>', 2);
            let [, weaponInfoHtml = '', armorInfoHtml = ''] = armInfoHtml.split('（装备中）');
            let newArmHtml = '';
            if (weaponInfoHtml) newArmHtml += '（装备中）' + Item.handleUselessSubProperties(weaponInfoHtml);
            if (armorInfoHtml) newArmHtml += '（装备中）' + Item.handleUselessSubProperties(armorInfoHtml);
            if (finalAddAdditionHtml) newArmHtml += '<br><br>' + finalAddAdditionHtml;
            $armArea.html(newArmHtml);

            currentArmInfo.set('武器', Item.getArmInfo(weaponInfoHtml));
            currentArmInfo.set('护甲', Item.getArmInfo(armorInfoHtml));
        }

        let propertiesHtml = $properties.html();
        propertyList = getLootPropertyList(propertiesHtml);
        itemUsedNumList = Item.getItemsUsedNumInfo(propertiesHtml);
        armsLevelList = Item.getArmsLevelInfo(propertiesHtml);
        $properties.find('.pd_arm_level').trigger('change');
        $points.find('.pd_point').trigger('change');

        if (typeof callback === 'function') callback();
        Script.runFunc('Loot.updateLootInfo_after_', html);
    }).fail(function () {
        setTimeout(() => updateLootInfo(callback), Const.minActionInterval);
    });
};

/**
 * 获取当前争夺信息
 * @returns {{}} 当前争夺信息
 */
export const getLootInfo = function () {
    let currentLevel = getCurrentLevel(logList);
    let info = levelInfoList[currentLevel];
    let currentLife = 0, currentInitLife = 0;
    if (info) {
        currentLife = info.life;
        currentInitLife = info.initLife;
    }
    let enemyList = getEnemyList(levelInfoList);
    return {
        currentLevel,
        currentLife,
        currentInitLife,
        levelPointList: Config.levelPointList,
        availablePoint: propertyList['可分配属性点'],
        haloInfo,
        extraPointsList,
        propertyList,
        itemUsedNumList,
        armsLevelList,
        currentArmInfo,
        changePointsAvailableCount,
        log,
        logList,
        enemyList,
    };
};

/**
 * 显示各层点数分配方案对话框
 */
const showLevelPointListConfigDialog = function (callback) {
    const dialogName = 'pdLevelPointListConfigDialog';
    if ($('#' + dialogName).length > 0) return;
    readConfig();
    let html = `
<div class="pd_cfg_main">
  <div style="margin: 5px 0; line-height: 1.6em;">
    请填写各层对应的点数分配方案，相邻层数如数值完全相同的话，则只保留最前面的一层<br>
    （例：11-19层点数相同的话，则只保留第11层）<br>
    武器、护甲ID和备注为可选项，只在需要更换装备时填写<br>
    自定义点数分配方案脚本的参考范例请参见<a href="read.php?tid=500968&spid=13270735&sf=b09" target="_blank">此贴53楼</a>
  </div>
  <div style="overflow-y: auto; max-height: 400px;">
    <table id="pdLevelPointList" style="text-align: center; white-space: nowrap;">
      <tbody>
        <tr>
          <th></th><th>层数</th><th>力量</th><th>体质</th><th>敏捷</th><th>灵活</th><th>智力</th><th>意志</th>
<th>武器ID</th><th>武器备注</th><th>护甲ID</th><th>护甲备注</th><th></th>
        </tr>
      </tbody>
    </table>
  </div>
  <hr>
  <div style="float: left; line-height: 27px;">
    <a class="pd_btn_link" data-name="selectAll" href="#">全选</a>
    <a class="pd_btn_link" data-name="selectInverse" href="#">反选</a>
    <a class="pd_btn_link pd_highlight" data-name="add" href="#">增加</a>
    <a class="pd_btn_link" data-name="deleteSelect" href="#">删除</a>
  </div>
  <div data-id="modifyArea" style="float: right;">
    <input name="s1" type="text" maxlength="5" title="力量" placeholder="力量" style="width: 35px;">
    <input name="s2" type="text" maxlength="5" title="体质" placeholder="体质" style="width: 35px;">
    <input name="d1" type="text" maxlength="5" title="敏捷" placeholder="敏捷" style="width: 35px;">
    <input name="d2" type="text" maxlength="5" title="灵活" placeholder="灵活" style="width: 35px;">
    <input name="i1" type="text" maxlength="5" title="智力" placeholder="智力" style="width: 35px;">
    <input name="i2" type="text" maxlength="5" title="意志" placeholder="意志" style="width: 35px;">
    <a class="pd_btn_link" data-name="clear" href="#" title="清空各修改字段">清空</a>
    <button type="button" name="modify">修改</button>
    <span class="pd_cfg_tips" title="可将所选择的层数的相应属性修改为指定的数值；数字前可设+/-号，表示增加/减少相应数量；例：100、+5或-2">[?]</span>
  </div>
</div>
<div class="pd_cfg_btns">
  <span class="pd_cfg_about"><a data-name="openImOrExLevelPointListConfigDialog" href="#">导入/导出分配方案</a></span>
  <button type="submit">保存</button>
  <button data-action="close" type="button">取消</button>
</div>`;
    let $dialog = Dialog.create(dialogName, '各层点数分配方案', html, 'min-width: 840px;');
    let $levelPointList = $dialog.find('#pdLevelPointList > tbody');

    /**
     * 添加各层点数分配的HTML
     * @param {number} level 层数
     * @param {{}} points 点数对象
     */
    const addLevelPointHtml = function (level, points) {
        $(`
<tr>
  <td style="width: 25px; text-align: left;"><input type="checkbox"></td>
  <td style="text-align: left;">
    <label style="margin-right: 8px;">
      第 <input name="level" type="text" value="${level ? level : ''}" style="width: 30px;"> 层
    </label>
  </td>
  <td><input class="pd_point" name="s1" type="number" value="${points['力量']}" min="1" style="width: 50px;" required></td>
  <td><input class="pd_point" name="s2" type="number" value="${points['体质']}" min="1" style="width: 50px;" required></td>
  <td><input class="pd_point" name="d1" type="number" value="${points['敏捷']}" min="1" style="width: 50px;" required></td>
  <td><input class="pd_point" name="d2" type="number" value="${points['灵活']}" min="1" style="width: 50px;" required></td>
  <td><input class="pd_point" name="i1" type="number" value="${points['智力']}" min="1" style="width: 50px;" required></td>
  <td><input class="pd_point" name="i2" type="number" value="${points['意志']}" min="1" style="width: 50px;" required></td>
  <td><input class="pd_arm_input" name="weaponId" type="text" value="${points['武器ID'] ? points['武器ID'] : ''}" maxlength="15" style="width: 65px;"></td>
  <td><input class="pd_arm_input" name="weaponMemo" type="text" value="${points['武器备注'] ? points['武器备注'] : ''}" maxlength="20" style="width: 70px;"></td>
  <td><input class="pd_arm_input" name="armorId" type="text" value="${points['护甲ID'] ? points['护甲ID'] : ''}" maxlength="15" style="width: 65px;"></td>
  <td><input class="pd_arm_input" name="armorMemo" type="text" value="${points['护甲备注'] ? points['护甲备注'] : ''}" maxlength="20" style="width: 70px;"></td>
  <td style="text-align: left;">
    <a class="pd_btn_link" data-name="fill" href="#">填充</a>
    <a class="pd_btn_link" data-name="addArm" href="#">装备</a>
    <a class="pd_btn_link pd_highlight" data-name="delete" href="#">删除</a>
  </td>
</tr>
<tr>
  <td></td>
  <td class="pd_custom_tips" title="剩余属性点">剩余：<span data-id="surplusPoint">0</span></td>
  <td title="攻击力" hidden> <!-- 临时禁用 -->
    攻：<span data-id="pro_s1" style="cursor: pointer;">0</span> <a data-id="opt_s1" href="#" title="点击：给该项加上或减去剩余属性点">&#177;</a>
  </td>
  <td title="最大生命值" hidden>
    命：<span data-id="pro_s2" style="cursor: pointer;">0</span> <a data-id="opt_s2" href="#" title="点击：给该项加上或减去剩余属性点">&#177;</a>
  </td>
  <td title="攻击速度" hidden>
    速：<span data-id="pro_d1" style="cursor: pointer;">0</span> <a data-id="opt_d1" href="#" title="点击：给该项加上或减去剩余属性点">&#177;</a>
  </td>
  <td title="暴击几率" hidden>
    暴：<span data-id="pro_d2" style="cursor: pointer;">0</span>% <a data-id="opt_d2" href="#" title="点击：给该项加上或减去剩余属性点">&#177;</a>
  </td>
  <td title="技能释放概率" hidden>
    技：<span data-id="pro_i1" style="cursor: pointer;">0</span>% <a data-id="opt_i1" href="#" title="点击：给该项加上或减去剩余属性点">&#177;</a>
  </td>
  <td title="防御减伤" hidden>
    防：<span data-id="pro_i2" style="cursor: pointer;">0</span>% <a data-id="opt_i2" href="#" title="点击：给该项加上或减去剩余属性点">&#177;</a>
  </td>
  <td class="pd_custom_tips" title="[飞身劈斩]伤害：攻击+体质值*5+智力值*5" hidden>技伤：<span data-id="skillAttack">0</span></td>
  <td hidden></td>
  <td hidden></td>
</tr>
`).appendTo($levelPointList).find('.pd_point').trigger('change');
    };

    $dialog.submit(function (e) {
        e.preventDefault();
        readConfig();
        let levelPointList = {};
        let prevPoints = {};
        let isError = false, isSurplus = false;
        $levelPointList.find('tr:gt(0)').each(function () {
            let $this = $(this);
            if (!$this.find('.pd_point').length) return;
            let surplusPoint = propertyList['可分配属性点'] - getCurrentAssignedPoint($this.find('.pd_point'));
            if (surplusPoint > 0) isSurplus = true;
            else if (surplusPoint < 0) {
                isError = true;
                return false;
            }

            let level = parseInt($this.find('[name="level"]').val());
            if (!level || level < 0) return;
            let points = {};
            for (let elem of Array.from($this.find('.pd_point, .pd_arm_input'))) {
                let $elem = $(elem);
                let name = $elem.attr('name');
                let value = null;
                value = $.trim($elem.val());
                if ($elem.is('.pd_point')) {
                    value = parseInt(value);
                    if (!value || value < 0) return;
                } else {
                    if (!value) continue;
                    if (name === 'weaponId' || name === 'armorId') {
                        value = parseInt(value);
                        if (!value || value < 0) return;
                    }
                }
                points[getPointNameByFieldName(name)] = value;
            }
            if (Util.deepEqual(prevPoints, points)) return;

            levelPointList[level] = points;
            prevPoints = points;
        });
        if (isSurplus) {
            if (!confirm('部分层数的可分配属性点尚未用完，是否提交？')) return;
        }
        if (isError) {
            alert('部分层数的剩余属性点为负，请重新填写');
            return;
        }
        Config.levelPointList = levelPointList;
        writeConfig();
        Dialog.close(dialogName);
        setLevelPointListSelect(Config.levelPointList);
    }).find('[data-name="add"]').click(function (e) {
        e.preventDefault();
        let points = {'力量': 1, '体质': 1, '敏捷': 1, '灵活': 1, '智力': 1, '意志': 1};
        addLevelPointHtml(0, points);
        $levelPointList.find('[name="level"]:last').focus();
        Dialog.resize(dialogName);
    }).end().find('[data-name="deleteSelect"]').click(function (e) {
        e.preventDefault();
        let $checked = $levelPointList.find('[type="checkbox"]:checked');
        if (!$checked.length || !confirm('是否删除所选层数？')) return;
        let $line = $checked.closest('tr');
        $line.next('tr').addBack().remove();
        Dialog.resize(dialogName);
    }).end().find('[data-name="openImOrExLevelPointListConfigDialog"]').click(function (e) {
        e.preventDefault();
        Public.showCommonImportOrExportConfigDialog(
            '各层点数分配方案',
            'levelPointList',
            null,
            function () {
                $('#pdLevelPointListConfigDialog').remove();
                showLevelPointListConfigDialog($dialog => $dialog.submit());
            }
        );
    }).end().find('[data-name="selectAll"]').click(() => Util.selectAll($levelPointList.find('[type="checkbox"]')))
        .end().find('[data-name="selectInverse"]').click(() => Util.selectInverse($levelPointList.find('[type="checkbox"]')));

    $levelPointList.on('click', '[data-name="fill"]', function (e) {
        e.preventDefault();
        fillPoints($(this).closest('tr'));
    }).on('click', '[data-name="delete"]', function (e) {
        e.preventDefault();
        let $line = $(this).closest('tr');
        $line.next('tr').addBack().remove();
        Dialog.resize(dialogName);
    }).on('click', '[data-name="addArm"]', function (e) {
        e.preventDefault();
        $levelPointList.find('#pdAddWeaponId, #pdAddWeaponMemo, #pdAddArmorId, #pdAddArmorMemo').removeAttr('id');
        let $tr = $(this).closest('tr');
        $tr.find('[name="weaponId"]').attr('id', 'pdAddWeaponId').end().find('[name="weaponMemo"]').attr('id', 'pdAddWeaponMemo')
            .end().find('[name="armorId"]').attr('id', 'pdAddArmorId').end().find('[name="armorMemo"]').attr('id', 'pdAddArmorMemo');
        addOrChangeArm(1);
    }).on('change', '.pd_point', function () {
        let $this = $(this);
        let name = $this.attr('name');
        let point = parseInt($this.val());
        if (!point || point < 0) return;

        let $points = $this.closest('tr');
        let $properties = $points.next('tr');
        $properties.find(`[data-id="pro_${name}"]`).text(getPropertyByPoint(getPointNameByFieldName(name), point));
        let power = parseInt($points.find('[name="s1"]').val());
        let life = parseInt($points.find('[name="s2"]').val());
        let intelligence = parseInt($points.find('[name="i1"]').val());
        $properties.find('[data-id="skillAttack"]').text(
            getSkillAttack(
                power + getExtraPoint('力量', power),
                life + getExtraPoint('体质', life),
                intelligence + getExtraPoint('智力', intelligence)
            )
        );


        let surplusPoint = propertyList['可分配属性点'] - getCurrentAssignedPoint($points.find('.pd_point'));
        $properties.find('[data-id="surplusPoint"]').text(surplusPoint).css('color', surplusPoint !== 0 ? '#f00' : '#000');
    }).on('click', '[data-id^="pro_"]', function () {
        let $this = $(this);
        let name = $this.data('id').replace('pro_', '');
        let num = parseInt(prompt('请输入数值：', $this.text()));
        if (!num || num < 0) return;
        $this.closest('tr').prev('tr').find(`[name="${name}"]`).val(getPointByProperty(getPointNameByFieldName(name), num)).trigger('change');
    }).on('click', '[data-id^="opt_"]', function (e) {
        e.preventDefault();
        let $this = $(this);
        let name = $this.data('id').replace('opt_', '');
        let $points = $this.closest('tr').prev('tr');
        let surplusPoint = propertyList['可分配属性点'] - getCurrentAssignedPoint($points.find('.pd_point'));
        if (!surplusPoint) return;
        let $point = $points.find(`[name="${name}"]`);
        if (!$point.length) return;
        let num = parseInt($point.val());
        if (isNaN(num) || num < 0) num = 0;
        num = num + surplusPoint;
        let min = parseInt($point.attr('min'));
        $point.val(num < min ? min : num).trigger('change');
    });

    $dialog.find('[name="modify"]').click(function () {
        let $checked = $levelPointList.find('[type="checkbox"]:checked');
        if (!$checked.length) return;
        let data = {};
        $dialog.find('[data-id="modifyArea"] [type="text"]').each(function () {
            let $this = $(this);
            let name = $this.attr('name');
            let value = $.trim($this.val());
            if (!value) return;
            let matches = /^(-|\+)?(\d+)$/.exec(value);
            if (!matches) {
                alert('格式不正确');
                $this.select().focus();
            }
            data[name] = {};
            if (typeof matches[1] !== 'undefined') data[name].action = matches[1] === '+' ? 'add' : 'minus';
            else data[name].action = 'equal';
            data[name].value = parseInt(matches[2]);
        });
        $checked.each(function () {
            let $points = $(this).closest('tr');
            $points.find('.pd_point').each(function () {
                let $this = $(this);
                let name = $this.attr('name');
                if (!(name in data)) return;
                if (data[name].action !== 'equal') {
                    let point = parseInt($this.val());
                    if (!point || point < 0) point = 0;
                    point += (data[name].action === 'add' ? data[name].value : -data[name].value);
                    $this.val(point > 1 ? point : 1);
                } else $this.val(data[name].value);
            }).trigger('change');
        });
        alert('点数已修改');
    }).end().find('[data-name="clear"]').click(function (e) {
        e.preventDefault();
        $(this).closest('[data-id="modifyArea"]').find('[type="text"]').val('');
    });

    for (let [level, points] of Util.entries(Config.levelPointList)) {
        if (!$.isNumeric(level)) continue;
        addLevelPointHtml(level, points);
    }

    Dialog.show(dialogName);
    if (typeof callback === 'function') callback($dialog);
};

/**
 * 加入或更换装备
 * @param {number} type 类型，0：更换装备；1：加入装备
 */
const addOrChangeArm = function (type) {
    readConfig();
    const dialogName = `pd${type === 1 ? 'Add' : 'Change'}ArmDialog`;
    let $dialog = $('#' + dialogName).parent();
    if ($dialog.length > 0 && type === 1) {
        $dialog.fadeIn('fast');
        Dialog.resize(dialogName);
    } else {
        let $wait = Msg.wait('<strong>正在获取装备信息&hellip;</strong>');
        $.ajax({
            type: 'GET',
            url: 'kf_fw_ig_mybp.php?t=' + $.now(),
            timeout: Const.defAjaxTimeout,
        }).done(function (html) {
            Msg.remove($wait);
            let matches = /<tr><td width="\d+%">装备.+?\r\n(<tr.+?<\/tr>)<tr><td colspan="4">/.exec(html);
            if (matches) {
                showAddOrChangeArmDialog(type, matches[1]);
            }
        }).fail(() => Msg.remove($wait));
    }
};

/**
 * 显示加入或更换装备对话框
 * @param {number} type 类型，0：更换装备；1：加入装备
 * @param {string} armHtml 装备的HTML代码
 */
const showAddOrChangeArmDialog = function (type, armHtml) {
    const dialogName = `pd${type === 1 ? 'Add' : 'Change'}ArmDialog`;
    if ($('#' + dialogName).length > 0) return;

    let html = `
<div class="pd_cfg_main" style="padding: 0;">
  <table class="kf_fw_ig4" data-name="armList" cellspacing="0" cellpadding="0" align="center" style="width: 800px;">
    <tbody>
      <tr hidden><td colspan="3" class="kf_fw_ig_title1">我的装备背包</td></tr>
      <tr><td width="10%">装备</td><td width="10%">熔炼</td><td width="80%">名称</td></tr>
      ${armHtml}
      <tr><td colspan="3"><span style="color:#00f;">不显示超过10件以上的物品，如物品超过10件，请熔炼掉多余的即可全部显示。</span></td></tr>
    </tbody>
  </table>
</div>
<div class="pd_cfg_btns">
  ${type === 0 ? '<button name="manualInputArmId" type="button" title="手动输入装备ID">手动输入ID</button>' : ''}
  <button data-action="close" type="button">关闭</button>
</div>`;
    let $dialog = Dialog.create(dialogName, `${type === 1 ? '加入' : '更换'}装备`, html, 'min-width: 820px; z-index: 1003;');
    let $armArea = $dialog.find('.kf_fw_ig4[data-name="armList"]');

    Item.addCommonArmsButton($dialog.find('.pd_cfg_btns'), $armArea);
    if (type === 1) {
        $dialog.off('click', '[data-action="close"]').on('click', '[data-action="close"]', function () {
            $dialog.fadeOut('fast');
        });
    } else {
        $dialog.find('[name="manualInputArmId"]').click(function () {
            let value = $.trim(prompt('请输入装备ID（多个ID用空格分隔）：'));
            if (!value) return;
            let armIdList = value.split(' ');
            let $wait = Msg.wait('<strong>正在装备中&hellip;</strong>');
            $(document).clearQueue('ChangeArms');
            $.each(armIdList, function (i, armId) {
                if (!armId) return;
                $(document).queue('ChangeArms', function () {
                    $.post('kf_fw_ig_mybpdt.php', `do=4&id=${armId}&safeid=${safeId}`, function (html) {
                        let msg = Util.removeHtmlTag(html);
                        if (/装备完毕/.test(msg)) {
                            if (Config.autoSaveArmsInfoEnabled) {
                                let armsInfo = Item.readArmsInfo();
                                armsInfo['已装备武器'] = armsInfo['已装备护甲'] = 0;
                                Item.writeArmsInfo(armsInfo);
                            }
                        } else {
                            Msg.remove($wait);
                            alert(msg);
                        }
                    }).fail(function () {
                        $(document).clearQueue('ChangeArms');
                        Msg.remove($wait);
                        alert('连接超时');
                    }).always(function () {
                        if (!$(document).queue('ChangeArms').length) {
                            updateLootInfo(function () {
                                Msg.remove($wait);
                                Dialog.close(dialogName);
                                $('.pd_arm_input').val('');
                            });
                        } else {
                            setTimeout(() => $(document).dequeue('ChangeArms'), Const.minActionInterval);
                        }
                    });
                });
            });
            $(document).dequeue('ChangeArms');
        });
    }

    if (Config.autoSaveArmsInfoEnabled) {
        Item.addSavedArmsInfo($armArea);
    }
    Item.handleArmArea($armArea, type);
    Item.bindArmLinkClickEvent($armArea, safeId, 1);

    Dialog.show(dialogName);
    Script.runFunc(`Item.show${type === 1 ? 'Add' : 'Change'}ArmDialog_after_`);
};

/**
 * 获取各层争夺记录列表
 * @param log 争夺记录
 * @returns {string[]} 各层争夺记录列表
 */
export const getLogList = function (log) {
    let logList = [];
    let matches = log.match(/<li class="pk_log_j">.+?(?=\s*<li class="pk_log_j">|\s*$)/g);
    for (let i in matches) {
        let levelMatches = /在\[\s*(\d+)\s*层]/.exec(Util.removeHtmlTag(matches[i]));
        if (levelMatches) logList[parseInt(levelMatches[1])] = matches[i];
    }
    return logList;
};

/**
 * 获取该层的战斗信息
 * @param {string} levelLog 该层的争夺记录
 * @returns {{enemy: string, life: number, initLife: number, box: string}} enemy：遭遇敌人名称；life：该层剩余生命值；initLife：该层初始生命值；box：盒子名称
 */
export const getLevelInfo = function (levelLog) {
    let info = {enemy: '', life: 0, initLife: 0, box: ''};
    if (!levelLog) return info;
    levelLog = Util.removeHtmlTag(levelLog.replace(/<\/li>/g, '</li>\n'));

    let matches = /你\((\d+)\)遭遇了\[([^\]]+)的]NPC/.exec(levelLog);
    if (matches) {
        info.initLife = parseInt(matches[1]);
        info.enemy = matches[2];
        info.enemy = info.enemy.replace('特别', '').replace('(后续更新前此路不通)', '');
    }

    matches = /生命值\[(\d+)\s*\/\s*\d+]/.exec(levelLog);
    if (matches) info.life = parseInt(matches[1]);

    matches = /敌人掉落了一个\s*\[\s*(\S+?盒子)\s*]/.exec(levelLog);
    if (matches) info.box = matches[1];

    return info;
};

/**
 * 获取各层战斗信息列表
 * @param {string[]} logList 各层争夺记录列表
 * @returns {{}[]} 各层战斗信息列表
 */
export const getLevelInfoList = function (logList) {
    let levelInfoList = [];
    $.each(logList, function (level, levelLog) {
        if (!levelLog) return;
        levelInfoList[level] = getLevelInfo(levelLog);
    });
    return levelInfoList;
};

/**
 * 获取当前层数
 * @param {string[]} logList 各层争夺记录列表
 * @returns {number} 当前层数
 */
const getCurrentLevel = logList => logList.length - 1 >= 1 ? logList.length - 1 : 0;

/**
 * 在争夺排行页面添加用户链接
 */
export const addUserLinkInPkListPage = function () {
    $('.kf_fw_ig1 > tbody > tr:gt(1) > td:nth-child(2)').each(function () {
        let $this = $(this);
        let userName = $this.text().trim();
        $this.html(`<a class="${!Config.adminMemberEnabled ? 'pd_not_click_link' : ''}" href="profile.php?action=show&username=${userName}" target="_blank">${userName}</a>`);
        if (userName === Info.userName) $this.find('a').addClass('pd_highlight');
    });
};

/**
 * 在战力光环排行上添加用户链接
 */
export const addUserLinkInHaloPage = function () {
    $('.kf_fw_ig1:eq(1) > tbody > tr:gt(1) > td:nth-child(2)').each(function () {
        let $this = $(this);
        let userName = $this.text().trim();
        $this.html(`<a class="${!Config.adminMemberEnabled ? 'pd_not_click_link' : ''}" href="profile.php?action=show&username=${userName}" target="_blank">${userName}</a>`);
        if (userName === Info.userName) $this.find('a').addClass('pd_highlight');
    });
};

/**
 * 读取战力光环页面信息
 * @param {boolean} isInitLootPage 是否初始化争夺首页
 */
const readHaloInfo = function (isInitLootPage = false) {
    console.log('获取战力光环信息Start');
    let $wait = Msg.wait('<strong>正在获取战力光环信息，请稍候&hellip;</strong>');
    getHaloInfo().done(function (result) {
        if ($.type(result) === 'object') {
            setHaloInfo(result);
            if (isInitLootPage) enhanceLootIndexPage();
            else $points.find('.pd_point').trigger('change');
        }
    }).always(function (result) {
        Msg.remove($wait);
        if (result === 'timeout') {
            setTimeout(() => readHaloInfo(isInitLootPage), Const.defAjaxInterval);
        } else if (result === 'error') {
            Msg.show('<strong>战力光环信息获取失败！</strong>', -1);
        }
    });
};

/**
 * 获取战力光环信息
 * @returns {Deferred} Deferred对象
 */
export const getHaloInfo = function () {
    return $.ajax({
        type: 'GET',
        url: 'kf_fw_ig_halo.php?t=' + $.now(),
        timeout: Const.defAjaxTimeout,
    }).then(function (html) {
        let haloInfo = {'全属性': 0, '攻击力': 0, '生命值': 0};
        let matches = /全属性\s*\+\s*(\d+(?:\.\d+)?)%/.exec(html);
        if (matches) {
            haloInfo['全属性'] = Math.round(parseFloat(matches[1]) * 10) / 1000;
            let extraMatches = /福利加成\s*\+\s*(\d+)攻击力\s*&\s*\+\s*(\d+)生命值/.exec(html);
            if (extraMatches) {
                haloInfo['攻击力'] = parseInt(extraMatches[1]);
                haloInfo['生命值'] = parseInt(extraMatches[2]);
            }
            TmpLog.setValue(Const.haloInfoTmpLogName, $.extend(haloInfo, {time: $.now()}));
            return haloInfo;
        } else return 'error';
    }, () => 'timeout');
};

/**
 * 设置战力光环信息
 * @param {{}} newHaloInfo 光环信息对象
 */
export const setHaloInfo = function (newHaloInfo) {
    haloInfo = newHaloInfo;
    if (!$('#pdHaloInfo').length) {
        let $node = $properties.find('input[type="text"]:eq(13)');
        if (!$node.length || $.trim($node.val())) return;
        $node.attr('id', 'pdHaloInfo');
        $('<a data-name="reloadHaloInfo" href="#" style="margin-left: -20px;" title="如战力光环信息不正确时，请点此重新读取">读</a>')
            .insertAfter($node)
            .click(function (e) {
                e.preventDefault();
                if (confirm('是否重新读取战力光环信息？')) {
                    TmpLog.deleteValue(Const.haloInfoTmpLogName);
                    readHaloInfo();
                }
            });
    }
    $('#pdHaloInfo').val(`全属性+${Math.round(haloInfo['全属性'] * 1000) / 10}% (+${haloInfo['攻击力']}|+${haloInfo['生命值']})`);
};

/**
 * 获取战力光环页面信息
 */
export const getPromoteHaloInfo = function () {
    Script.runFunc('Loot.getPromoteHaloInfo_before_');
    console.log('获取战力光环页面信息Start');
    let $wait = Msg.wait('<strong>正在获取战力光环信息，请稍候&hellip;</strong>');

    /**
     * 写入Cookie
     * @param {string} value 指定（相对）时间量
     * @returns {boolean} 返回false
     */
    const setCookie = function (value) {
        let nextTime = Util.getDate(value);
        Util.setCookie(Const.promoteHaloCookieName, nextTime.getTime(), nextTime);
        $(document).dequeue('AutoAction');
        return false;
    };

    /**
     * 获取个人信息
     */
    const getPersonalInfo = function () {
        $.ajax({
            type: 'GET',
            url: `profile.php?action=show&uid=${Info.uid}&t=${$.now()}`,
            timeout: Const.defAjaxTimeout,
        }).done(function (html) {
            Msg.remove($wait);
            let regex = Config.promoteHaloCostType >= 11 ? /贡献数值：(\d+(?:\.\d+)?)/ : /论坛货币：(-?\d+)\s*KFB/;
            let matches = regex.exec(html);
            if (!matches) return setCookie(`+${Const.promoteHaloLimitNextActionInterval}m`);
            let currency = parseFloat(matches[1]);
            if (currency > Config.promoteHaloLimit) {
                let {num} = getPromoteHaloCostByTypeId(Config.promoteHaloCostType);
                let maxCount = Math.floor((currency - Config.promoteHaloLimit) / num);
                if (maxCount > 0) {
                    $wait = Msg.wait('<strong>正在获取战力光环信息，请稍候&hellip;</strong>');
                    getHaloInfo(maxCount);
                } else return setCookie(`+${Const.promoteHaloLimitNextActionInterval}m`);
            } else return setCookie(`+${Const.promoteHaloLimitNextActionInterval}m`);
        }).fail(() => setTimeout(getPersonalInfo, Const.defAjaxInterval));
    };

    /**
     * 获取光环信息
     * @param {number} maxCount 最大提升战力光环次数（设为-1表示不限制）
     */
    const getHaloInfo = function (maxCount = -1) {
        $.ajax({
            type: 'GET',
            url: 'kf_fw_ig_halo.php?t=' + $.now(),
            timeout: Const.defAjaxTimeout,
        }).done(function (html) {
            Msg.remove($wait);

            let safeIdMatches = /safeid=(\w+)"/.exec(html);
            if (!safeIdMatches) return setCookie('+1h');
            let safeId = safeIdMatches[1];

            let surplusMatches = /下次随机还需\[(\d+)]分钟/.exec(html);
            if (surplusMatches) {
                let promoteHaloInterval = Config.promoteHaloAutoIntervalEnabled ? Const.minPromoteHaloInterval : Config.promoteHaloInterval * 60;
                promoteHaloInterval = promoteHaloInterval < Const.minPromoteHaloInterval ? Const.minPromoteHaloInterval : promoteHaloInterval;
                return setCookie(`+${promoteHaloInterval - (Const.minPromoteHaloInterval - parseInt(surplusMatches[1]))}m`);
            }

            let totalCount = 1;
            let countMatches = /当前光环随机可用\[(\d+)]次/.exec(html);
            if (Config.promoteHaloAutoIntervalEnabled && countMatches) {
                totalCount = parseInt(countMatches[1]);
                if (maxCount > -1) totalCount = totalCount > maxCount ? maxCount : totalCount;
            }

            promoteHalo(totalCount, Config.promoteHaloCostType, safeId);
        }).fail(function () {
            Msg.remove($wait);
            setTimeout(getPromoteHaloInfo, Const.defAjaxInterval);
        });
    };

    if (Config.promoteHaloLimit > 0) getPersonalInfo();
    else getHaloInfo();
};

/**
 * 提升战力光环
 * @param {number} totalCount 提升战力光环总次数
 * @param {number} promoteHaloCostType 自动提升战力光环的花费类型，参见{@link Config.promoteHaloCostType}
 * @param {string} safeId SafeID
 */
export const promoteHalo = function (totalCount, promoteHaloCostType, safeId) {
    console.log('提升战力光环Start');
    let $wait = Msg.wait(
        `<strong>正在提升战力光环&hellip;</strong><i>剩余：<em class="pd_countdown">${totalCount}</em></i><a class="pd_stop_action" href="#">停止操作</a>`
    );
    TmpLog.deleteValue(Const.haloInfoTmpLogName);
    let isStop = false;
    let index = 0;
    let nextTime = Util.getDate('+10m').getTime();

    /**
     * 提升
     */
    const promote = function () {
        $.ajax({
            type: 'GET',
            url: `kf_fw_ig_halo.php?do=buy&id=${promoteHaloCostType}&safeid=${safeId}&t=${$.now()}`,
            timeout: Const.defAjaxTimeout,
        }).done(function (html) {
            Public.showFormatLog('提升战力光环', html);
            let {msg} = Util.getResponseMsg(html);

            let matches = /(新数值为|随机值为)\[(\d+(?:\.\d+)?)%]/.exec(msg);
            if (matches) {
                let isNew = matches[1] === '新数值为';

                nextTime = Config.promoteHaloAutoIntervalEnabled ? 0 : Util.getDate(`+${Config.promoteHaloInterval}h`).getTime();
                let randomNum = parseFloat(matches[2]);
                let costResult = getPromoteHaloCostByTypeId(promoteHaloCostType);
                Msg.show(
                    '<strong>' +
                    (isNew ?
                        `恭喜你提升了光环的效果！新数值为【<em>${randomNum}%</em>】` : `你本次随机值为【<em>${randomNum}%</em>】，未超过光环效果`) +
                    `</strong><i>${costResult.type}<ins>${(-costResult.num).toLocaleString()}</ins></i>`
                );

                let pay = {};
                pay[costResult.type] = -costResult.num;
                Log.push(
                    '提升战力光环',
                    isNew ? `恭喜你提升了光环的效果！新数值为【\`${randomNum}%\`】` : `你本次随机值为【\`${randomNum}%\`】，未超过光环效果`,
                    {pay}
                );
                index++;
            } else {
                if (/两次操作间隔过短/.test(msg)) nextTime = Util.getDate('+10s').getTime();
                else isStop = true;

                matches = /你的(贡献点数|KFB)不足/.exec(msg);
                if (matches) {
                    nextTime = Util.getDate(`+${Config.promoteHaloInterval}h`).getTime();
                    Msg.show(`<strong>${matches[1]}不足，无法提升战力光环</strong><a href="kf_fw_ig_halo.php" target="_blank">手动选择</a>`, -1);
                }

                matches = /你还需要等待(\d+)分钟/.exec(msg);
                if (matches) {
                    let promoteHaloInterval = Config.promoteHaloInterval * 60;
                    promoteHaloInterval = promoteHaloInterval < Const.minPromoteHaloInterval ? Const.minPromoteHaloInterval : promoteHaloInterval;
                    nextTime = Util.getDate(`+${Config.promoteHaloInterval * 60 - (Const.minPromoteHaloInterval - parseInt(matches[1]))}m`).getTime();
                }
            }
        }).always(function () {
            $wait.find('.pd_countdown').text(totalCount - index);
            isStop = isStop || $wait.data('stop');
            if (isStop || index === totalCount) {
                Msg.remove($wait);
                if (nextTime > 0 || isStop) {
                    Util.setCookie(Const.promoteHaloCookieName, nextTime, new Date(nextTime));
                    setTimeout(() => $(document).dequeue('AutoAction'), Const.minActionInterval);
                } else {
                    Util.deleteCookie(Const.promoteHaloCookieName);
                    getPromoteHaloInfo();
                }
                Script.runFunc('Loot.promoteHalo_after_');
            } else {
                setTimeout(promote, Const.promoteHaloActionInterval);
            }
        });
    };

    promote();
};

/**
 * 通过获取类型ID获取提升战力光环花费
 * @param {number} id 提升战力光环的类型ID
 * @returns {{type: string, num: number}} type：花费类型；num：花费数额
 */
export const getPromoteHaloCostByTypeId = function (id) {
    switch (id) {
        case 1:
            return {type: 'KFB', num: 100};
        case 2:
            return {type: 'KFB', num: 1000};
        case 11:
            return {type: '贡献', num: 0.2};
        case 12:
            return {type: '贡献', num: 2};
        default:
            return {type: 'KFB', num: 0};
    }
};