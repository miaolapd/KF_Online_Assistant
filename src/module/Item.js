/* 物品模块 */
'use strict';
import Info from './Info';
import * as Util from './Util';
import * as Msg from './Msg';
import * as Dialog from './Dialog';
import Const from './Const';
import {read as readConfig, write as writeConfig} from './Config';
import * as Log from './Log';
import * as Script from './Script';
import * as Public from './Public';
import * as Loot from './Loot';

// 盒子区域
let $boxArea;
// 装备区域
let $armArea;
// 物品区域
let $itemArea;
// SafeID
let safeId;

// 盒子种类列表
export const boxTypeList = ['普通盒子', '幸运盒子', '稀有盒子', '传奇盒子', '神秘盒子'];

// 装备类别列表
export const armClassList = ['武器', '护甲', '项链'];
// 装备组别列表
export const armGroupList = ['长剑', '短弓', '法杖', '铠甲', '皮甲', '布甲'];
// 装备种类列表
export const armTypeList = ['普通的装备', '幸运的装备', '稀有的装备', '传奇的装备', '神秘的装备'];

// 道具种类列表
export const itemTypeList = [
    '零时迷子的碎片', '被遗弃的告白信', '学校天台的钥匙', 'TMA最新作压缩包', 'LOLI的钱包', '棒棒糖', '蕾米莉亚同人漫画', '十六夜同人漫画',
    '档案室钥匙', '傲娇LOLI娇蛮音CD', '整形优惠卷', '消逝之药',
];

/**
 * 初始化
 */
export const init = function () {
    safeId = Public.getSafeId();
    if (!safeId) return;
    $boxArea = $('.kf_fw_ig1:eq(0)');
    $boxArea.attr('id', 'pdBoxArea');
    $armArea = $('.kf_fw_ig4:eq(0)');
    $armArea.attr('id', 'pdArmArea');
    $itemArea = $('.kf_fw_ig1:eq(1)');
    $itemArea.attr('id', 'pdItemArea');

    addBatchOpenBoxesLink();
    addOpenAllBoxesButton();

    if (Config.autoSaveArmsInfoEnabled) {
        addSavedArmsInfo($armArea);
    }
    handleArmArea($armArea);
    bindArmLinkClickEvent($armArea, safeId);

    addArmsButton();
    addBatchUseAndSellItemsButton();
};

/**
 * 获取下一批物品
 * @param {number} sequence 下一批物品的插入顺序，1：向前插入；2：往后添加
 * @param {function} callback 回调函数
 */
export const getNextObjects = function (sequence = 1, callback = null) {
    console.log('获取下一批物品Start');
    $.ajax({
        type: 'GET',
        url: 'kf_fw_ig_mybp.php?t=' + $.now(),
        timeout: Const.defAjaxTimeout,
        async: !Config.autoSaveArmsInfoEnabled
    }).done(function (html) {
        for (let index = 1; index <= 2; index++) {
            let matches = null;
            if (index === 1) {
                matches = /<tr><td width="\d+%">装备.+?\r\n(<tr.+?<\/tr>)<tr><td colspan="4">/.exec(html);
            }
            else {
                matches = /<tr><td width="\d+%">使用.+?\r\n(<tr.+?<\/tr>)<tr><td colspan="4">/.exec(html);
            }
            if (!matches) continue;
            let trMatches = matches[1].match(/<tr(.+?)<\/tr>/g);
            let $area = index === 1 ? $armArea : $itemArea;
            let addHtml = '';
            let newArmsInfo = {'已装备武器': 0, '已装备护甲': 0, '上次记录的最新装备': 0, '上次记录的时间': 0, '装备列表': {}};
            for (let i in trMatches) {
                let idMatches = /"wp_(\d+)"/.exec(trMatches[i]);
                if (!idMatches) continue;
                let id = parseInt(idMatches[1]);
                if (!$area.has(`[id="wp_${id}"]`).length) {
                    addHtml += trMatches[i];
                }
                if (index === 1) {
                    newArmsInfo['装备列表'][id] = trMatches[i];
                    let equippedArmMatches = /<tr id="wp_(\d+)">.+?（装备中）<span[^<>]*>[^<>]+的([^<>]+)<\/span>/.exec(trMatches[i]);
                    if (equippedArmMatches) {
                        let equippedArmId = parseInt(equippedArmMatches[1]);
                        let armClassName = getArmClassNameByGroupName(equippedArmMatches[2]);
                        if (armClassName) {
                            newArmsInfo[`已装备${armClassName}`] = equippedArmId;
                        }
                    }
                }
            }
            if (index === 1 && Config.autoSaveArmsInfoEnabled) {
                let armsInfo = readArmsInfo();
                if (newArmsInfo['已装备武器'] > 0) armsInfo['已装备武器'] = newArmsInfo['已装备武器'];
                if (newArmsInfo['已装备护甲'] > 0) armsInfo['已装备护甲'] = newArmsInfo['已装备护甲'];
                $.extend(armsInfo['装备列表'], newArmsInfo['装备列表']);
                writeArmsInfo(armsInfo);
            }
            if (addHtml) {
                if (sequence === 2) {
                    $area.find('> tbody > tr:last-child').before(addHtml);
                }
                else {
                    $area.find('> tbody > tr:nth-child(2)').after(addHtml);
                }
                if (index === 1) {
                    handleArmArea($armArea);
                }
            }
        }
        if (typeof callback === 'function') callback();
    }).fail(function () {
        setTimeout(() => getNextObjects(sequence, callback), Const.defAjaxInterval);
    });
};

/**
 * 添加批量打开盒子链接
 */
const addBatchOpenBoxesLink = function () {
    $boxArea = $('.kf_fw_ig1:first');
    $boxArea.find('> tbody > tr:nth-child(3) > td > a[onclick^="dkhz"]').each(function () {
        let $this = $(this);
        let matches = /dkhz\('(\d+)'\)/.exec($this.attr('onclick'));
        if (!matches) return;
        $this.after(`<a class="pd_highlight" href="#" data-name="openBoxes" data-id="${matches[1]}" style="margin-left: 10px;">批量打开</a>`);
    });

    $boxArea.on('click', 'a[data-name="openBoxes"]', function (e) {
        e.preventDefault();
        let $this = $(this);
        let id = parseInt($this.data('id'));
        let $info = $boxArea.find(`> tbody > tr:nth-child(2) > td:nth-child(${id})`);
        let boxType = $info.find('span:first').text().trim() + '盒子';
        if (!boxTypeList.includes(boxType)) return;
        let currentNum = parseInt($info.find('span:last').text());
        let num = parseInt(prompt(`你要打开多少个【${boxType}】？`, currentNum));
        if (!num || num < 0) return;
        Msg.destroy();
        if (Config.autoSaveArmsInfoEnabled) {
            getNextObjects(1);
        }
        openBoxes({id, boxType, num, safeId});
    });
};

/**
 * 添加一键开盒按钮
 */
const addOpenAllBoxesButton = function () {
    $(`
<div class="pd_item_btns" data-name="openBoxesBtns">
  <label>
    <input name="autoSaveArmsInfoEnabled" type="checkbox" ${Config.autoSaveArmsInfoEnabled ? 'checked' : ''}> 保存装备信息</input>
    <span class="pd_cfg_tips" title="在批量打开盒子时自动保存装备信息，可突破装备背包最多显示10件的限制">[?]</span>
  </label>
  <button name="clearMsg" type="button" title="清除页面上所有的消息和操作结果">清除消息</button>
  <button name="openAllBoxes" type="button" style="color: #f00;" title="打开全部盒子">一键开盒</button>
</div>
`).insertAfter($boxArea).find('[name="autoSaveArmsInfoEnabled"]').click(function () {
        let checked = $(this).prop('checked');
        if (Config.autoSaveArmsInfoEnabled !== checked) {
            readConfig();
            Config.autoSaveArmsInfoEnabled = checked;
            writeConfig();
        }
    }).end().find('[name="clearMsg"]').click(function () {
        Msg.destroy();
        $('.pd_result').remove();
    }).end().find('[name="openAllBoxes"]').click(showOpenAllBoxesDialog);
    Public.addSlowActionChecked($('.pd_item_btns[data-name="openBoxesBtns"]'));
};

/**
 * 显示一键开盒对话框
 */
const showOpenAllBoxesDialog = function () {
    const dialogName = 'pdOpenAllBoxesDialog';
    if ($('#' + dialogName).length > 0) return;
    Msg.destroy();
    readConfig();

    let boxTypesOptionHtml = '';
    for (let boxName of boxTypeList.slice(0, 4)) {
        boxTypesOptionHtml += `<option>${boxName}</option>`;
    }

    let armTypesCheckedHtml = '';
    for (let group of armGroupList) {
        armTypesCheckedHtml += `<li><b>${group}：</b>`;
        for (let type of armTypeList) {
            let prefix = type.split('的')[0];
            if (prefix === '神秘') continue;
            let name = `${prefix}的${group}`;
            armTypesCheckedHtml += `
<label style="margin-right: 5px;">
  <input type="checkbox" name="smeltArmsType" value="${name}" ${Config.defSmeltArmTypeList.includes(name) ? 'checked' : ''}> ${prefix}
</label>`;
        }
        armTypesCheckedHtml += '</li>';
    }

    let itemTypesOptionHtml = '';
    for (let itemName of itemTypeList.slice(6)) {
        itemTypesOptionHtml += `<option>${itemName}</option>`;
    }

    let html = `
<div class="pd_cfg_main">
  <fieldset style="margin-top: 5px;">
    <legend>请选择想批量打开的盒子种类（按<b>Ctrl键</b>或<b>Shift键</b>可多选）：</legend>
    <select name="openBoxesTypes" size="4" style="width: 320px;" multiple>${boxTypesOptionHtml}</select>
  </fieldset>
  <div style="margin-top: 5px;"><b>请选择批量打开盒子后想要进行的操作（如无需操作可不用勾选）：</b></div>
  <fieldset>
    <legend>
      <label><input name="smeltArmsAfterOpenBoxesEnabled" type="checkbox"> 熔炼装备</label>
    </legend>
    <div>请选择想批量熔炼的装备种类：</div>
    <ul data-name="smeltArmTypeList">${armTypesCheckedHtml}</ul>
    <div>
      <a class="pd_btn_link" href="#" data-name="selectAll">全选</a>
      <a class="pd_btn_link" href="#" data-name="selectInverse">反选</a>
    </div>
  </fieldset>
  <fieldset>
    <legend>
      <label><input name="useItemsAfterOpenBoxesEnabled" type="checkbox"> 使用道具</label>
    </legend>
    <div>请选择想批量使用的道具种类（按<b>Ctrl键</b>或<b>Shift键</b>可多选）：</div>
    <select name="useItemTypes" size="6" style="width: 320px;" multiple>${itemTypesOptionHtml}</select>
  </fieldset>
  <fieldset>
    <legend>
      <label><input name="sellItemsAfterOpenBoxesEnabled" type="checkbox"> 出售道具</label>
    </legend>
    <div>请选择想批量出售的道具种类（按<b>Ctrl键</b>或<b>Shift键</b>可多选）：</div>
    <select name="sellItemTypes" size="6" style="width: 320px;" multiple>${itemTypesOptionHtml}</select>
  </fieldset>
  <div style="margin-top: 5px;">
    <label>
      <input name="showArmsFinalAdditionAfterOpenBoxesEnabled" type="checkbox"> 在一键开盒后显示装备最终加成
      <span class="pd_cfg_tips" title="在一键开盒（并执行后续操作）后显示当前页面上装备的最终加成信息">[?]</span>
    </label>
  </div>
</div>
<div class="pd_cfg_btns">
  <button name="open" type="button" style="color: #f00;">一键开盒</button>
  <button name="save" type="button">保存设置</button>
  <button data-action="close" type="button">关闭</button>
</div>`;
    let $dialog = Dialog.create(dialogName, '一键开盒', html);
    let $smeltArmTypeList = $dialog.find('ul[data-name="smeltArmTypeList"]');

    /**
     * 保存设置
     */
    const saveSettings = function () {
        readConfig();
        let tmpBoxTypeList = $dialog.find('select[name="openBoxesTypes"]').val();
        if (!Array.isArray(tmpBoxTypeList)) tmpBoxTypeList = [];
        Config.defOpenBoxTypeList = tmpBoxTypeList;

        $dialog.find('[type="checkbox"]').each(function () {
            let $this = $(this);
            let name = $this.attr('name');
            if (name in Config) {
                Config[name] = Boolean($this.prop('checked'));
            }
        });

        if (Config.smeltArmsAfterOpenBoxesEnabled) {
            let typeList = [];
            $smeltArmTypeList.find('input[name="smeltArmsType"]:checked').each(function () {
                typeList.push($(this).val());
            });
            if (typeList.length > 0) Config.defSmeltArmTypeList = typeList;
            else Config.smeltArmsAfterOpenBoxesEnabled = false;
        }
        if (Config.useItemsAfterOpenBoxesEnabled) {
            let typeList = $dialog.find('select[name="useItemTypes"]').val();
            if (Array.isArray(typeList)) Config.defUseItemTypeList = typeList;
            else Config.useItemsAfterOpenBoxesEnabled = false;
        }
        if (Config.sellItemsAfterOpenBoxesEnabled) {
            let typeList = $dialog.find('select[name="sellItemTypes"]').val();
            if (Array.isArray(typeList)) Config.defSellItemTypeList = typeList;
            else Config.sellItemsAfterOpenBoxesEnabled = false;
        }

        writeConfig();
    };

    $dialog.find('[name="open"]').click(function () {
        if (!$dialog.find('select[name="openBoxesTypes"]').val()) {
            alert('未选择盒子种类');
            return;
        }
        if (!confirm('是否一键开盒（并执行所选操作）？')) return;
        saveSettings();
        Dialog.close(dialogName);
        if (Config.autoSaveArmsInfoEnabled) {
            getNextObjects(1);
        }
        $(document).clearQueue('OpenAllBoxes');
        $boxArea.find('> tbody > tr:nth-child(2) > td').each(function (index) {
            let $this = $(this);
            let boxType = $this.find('span:first').text().trim() + '盒子';
            if (!Config.defOpenBoxTypeList.includes(boxType)) return;
            let num = parseInt($this.find('span:last').text());
            if (!num || num < 0) return;
            let id = parseInt($boxArea.find(`> tbody > tr:nth-child(3) > td:nth-child(${index + 1}) > a[data-name="openBoxes"]`).data('id'));
            if (!id) return;
            $(document).queue('OpenAllBoxes', () => openBoxes({id, boxType, num, safeId, nextActionEnabled: true}));
        });
        $(document).dequeue('OpenAllBoxes');
    }).end().find('[name="save"]').click(function () {
        saveSettings();
        alert('设置已保存');
    }).end().find('a[data-name="selectAll"]').click(() => Util.selectAll($smeltArmTypeList.find('input[name="smeltArmsType"]')))
        .end().find('a[data-name="selectInverse"]').click(() => Util.selectInverse($smeltArmTypeList.find('input[name="smeltArmsType"]')));

    $dialog.on('keydown', 'select[name$="Types"]', (function (e) {
        if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            $(this).children().prop('selected', true);
        }
    })).find('[type="checkbox"]').each(function () {
        let $this = $(this);
        let name = $this.attr('name');
        if (name in Config) {
            $this.prop('checked', Config[name] === true);
        }
    });

    $dialog.find('select[name$="Types"]').each(function (index) {
        let $this = $(this);
        let typeList = Config.defOpenBoxTypeList;
        if (index === 1) typeList = Config.defUseItemTypeList;
        else if (index === 2) typeList = Config.defSellItemTypeList;
        $this.find('option').each(function () {
            let $this = $(this);
            if (typeList.includes($this.val())) {
                $this.prop('selected', true);
            }
        });
    });

    Dialog.show(dialogName);
    Script.runFunc('Item.showOpenAllBoxes_after_');
};

/**
 * 自动一键开盒
 */
export const autoOpenBoxes = function () {
    let safeId = Public.getSafeId();
    if (!safeId) {
        $(document).dequeue('AutoAction');
        return;
    }
    $(document).clearQueue('OpenAllBoxes');
    $boxArea.find('> tbody > tr:nth-child(2) > td').each(function (index) {
        let $this = $(this);
        let boxType = $this.find('span:first').text().trim() + '盒子';
        if (!Config.defOpenBoxTypeList.includes(boxType)) return;
        let num = parseInt($this.find('span:last').text());
        if (!num || num < 0) return;
        let id = parseInt($boxArea.find(`> tbody > tr:nth-child(3) > td:nth-child(${index + 1}) > a[data-name="openBoxes"]`).data('id'));
        if (!id) return;
        $(document).queue('OpenAllBoxes', () => openBoxes({id, boxType, num, safeId, nextActionEnabled: true}));
    });
    $(document).dequeue('OpenAllBoxes');
    $(document).dequeue('AutoAction');
};

/**
 * 打开盒子
 * @param {number} id 盒子类型ID
 * @param {string} boxType 盒子类型名称
 * @param {number} num 打开盒子数量
 * @param {string} safeId SafeID
 * @param {boolean} nextActionEnabled 是否执行后续操作
 */
export const openBoxes = function ({id, boxType, num, safeId, nextActionEnabled = false}) {
    let successNum = 0, failNum = 0, index = 0;
    let randomTotalNum = 0, randomTotalCount = 0;
    let isStop = false;
    let stat = {'KFB': 0, '经验值': 0, '道具': 0, '装备': 0, item: {}, arm: {}};

    /**
     * 打开
     */
    const open = function () {
        $.ajax({
            type: 'POST',
            url: 'kf_fw_ig_mybpdt.php',
            data: `do=3&id=${id}&safeid=${safeId}`,
            timeout: Const.defAjaxTimeout,
        }).done(function (html) {
            index++;
            let msg = Util.removeHtmlTag(html);
            if (msg.includes('获得')) {
                successNum++;
                let matches = /获得\[(\d+)]KFB/.exec(msg);
                if (matches) stat['KFB'] += parseInt(matches[1]);

                matches = /获得\[(\d+)]经验值/.exec(msg);
                if (matches) stat['经验值'] += parseInt(matches[1]);

                matches = /打开盒子获得了道具\[\s*(.+?)\s*]/.exec(msg);
                if (matches) {
                    stat['道具']++;
                    let itemName = matches[1];
                    if (!(itemName in stat.item)) stat.item[itemName] = 0;
                    stat.item[itemName]++;
                }

                matches = /获得一件\[(.+?)]的?装备/.exec(msg);
                if (matches) {
                    stat['装备']++;
                    let armType = matches[1] + '装备';
                    if (!(armType in stat.arm)) stat.arm[armType] = 0;
                    stat.arm[armType]++;
                }

                matches = /随机值(\d+)/.exec(msg);
                if (matches) {
                    randomTotalCount++;
                    randomTotalNum += parseInt(matches[1]);
                }
            }
            else if (msg.includes('操作过快')) {
                $(document).queue('OpenBoxes', open);
            }
            else if (msg.includes('盒子不足') || msg.includes('错误的安全码')) {
                $(document).clearQueue('OpenBoxes');
                isStop = true;
            }
            else {
                failNum++;
            }

            console.log(`第${index}次：${msg}`);
            $('.pd_result[data-name="boxResult"]:last').append(`<li><b>第${index}次：</b>${msg}</li>`);
            Script.runFunc('Item.openBoxes_success_', msg);
        }).fail(function () {
            failNum++;
        }).always(function () {
            let length = $(document).queue('OpenBoxes').length;
            let $countdown = $('.pd_countdown:last');
            $countdown.text(length);
            let isPause = $countdown.closest('.pd_msg').data('stop');
            isStop = isStop || isPause;
            if (isPause) {
                $(document).clearQueue('OpenAllBoxes');
                nextActionEnabled = false;
            }

            if (isStop || !length) {
                Msg.remove($wait);
                let avgRandomNum = randomTotalCount > 0 ? Util.getFixedNumLocStr(randomTotalNum / randomTotalCount, 2) : 0;
                for (let [key, value] of Util.entries(stat)) {
                    if (!value || ($.type(value) === 'object' && $.isEmptyObject(value))) {
                        delete stat[key];
                    }
                }
                if (!$.isEmptyObject(stat)) {
                    Log.push(
                        '打开盒子',
                        `共有\`${successNum}\`个【\`${boxType}\`】打开成功 (平均随机值【\`${avgRandomNum}\`】)`,
                        {
                            gain: stat,
                            pay: {'盒子': -successNum}
                        }
                    );
                }

                let $currentNum = $boxArea.find(`> tbody > tr:nth-child(2) > td:nth-child(${id}) > span:last`);
                let prevNum = parseInt($currentNum.text());
                if (prevNum > 0) {
                    $currentNum.text(prevNum - successNum);
                }

                let resultStatHtml = '', msgStatHtml = '';
                for (let [key, value] of Util.entries(stat)) {
                    let tmpHtml = '';
                    if ($.type(value) === 'object') {
                        resultStatHtml += resultStatHtml ? '<br>' : '';
                        msgStatHtml += msgStatHtml ? '<br>' : '';
                        resultStatHtml += `${key === 'item' ? '道具' : '装备'}：`;

                        let typeList = key === 'item' ? itemTypeList : armTypeList;
                        for (let name of Util.getSortedObjectKeyList(typeList, value)) {
                            tmpHtml += `<i>${name}<em>+${value[name].toLocaleString()}</em></i> `;
                        }
                    }
                    else {
                        tmpHtml += `<i>${key}<em>+${value.toLocaleString()}</em></i> `;
                    }
                    resultStatHtml += tmpHtml;
                    msgStatHtml += tmpHtml.trim();
                }
                if (msgStatHtml.length < 200) {
                    msgStatHtml = msgStatHtml.replace(/(.*)<br>/, '$1');
                }
                $('.pd_result[data-name="boxResult"]:last').append(`
<li class="pd_stat">
  <b>统计结果（平均随机值【<em>${avgRandomNum}</em>】）：</b><br>
  ${resultStatHtml ? resultStatHtml : '无'}
</li>
`);
                console.log(
                    `共有${successNum}个【${boxType}】打开成功（平均随机值【${avgRandomNum}】）${failNum > 0 ? `，共有${failNum}个盒子无法获取结果` : ''}`
                );
                Msg.show(
                    `<strong>共有<em>${successNum}</em>个【${boxType}】打开成功（平均随机值【<em>${avgRandomNum}</em>】）` +
                    `${failNum > 0 ? `，共有<em>${failNum}</em>个盒子无法获取结果` : ''}</strong>${msgStatHtml.length > 25 ? '<br>' + msgStatHtml : msgStatHtml}`,
                    -1
                );

                Script.runFunc('Item.openBoxes_after_', stat);
                setTimeout(() => getNextObjects(1), Const.defAjaxInterval);
                if ($(document).queue('OpenAllBoxes').length > 0) {
                    setTimeout(
                        () => $(document).dequeue('OpenAllBoxes'),
                        typeof Const.specialAjaxInterval === 'function' ? Const.specialAjaxInterval() : Const.specialAjaxInterval
                    );
                }
                else if (nextActionEnabled) {
                    let action = null;
                    if (Config.smeltArmsAfterOpenBoxesEnabled) {
                        action = () => smeltArms({typeList: Config.defSmeltArmTypeList, safeId, nextActionEnabled});
                    }
                    else if (Config.useItemsAfterOpenBoxesEnabled) {
                        action = () => useItems({typeList: Config.defUseItemTypeList, safeId, nextActionEnabled});
                    }
                    else if (Config.sellItemsAfterOpenBoxesEnabled) {
                        action = () => sellItems({typeList: Config.defSellItemTypeList, safeId, nextActionEnabled});
                    }
                    if (action) {
                        setTimeout(action, Const.minActionInterval);
                    }
                    else if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
                        showArmsFinalAdditionAfterOpenBoxes();
                    }
                }
            }
            else {
                if (index % 10 === 0) {
                    setTimeout(() => getNextObjects(1), Const.defAjaxInterval);
                }
                setTimeout(
                    () => $(document).dequeue('OpenBoxes'),
                    typeof Const.specialAjaxInterval === 'function' ? Const.specialAjaxInterval() : Const.specialAjaxInterval
                );
            }
        });
    };

    $boxArea.parent().append(`<ul class="pd_result" data-name="boxResult"><li><strong>【${boxType}】打开结果：</strong></li></ul>`);
    let $wait = Msg.wait(
        `<strong>正在打开盒子中&hellip;</strong><i>剩余：<em class="pd_countdown">${num}</em></i><a class="pd_stop_action" href="#">停止操作</a>`
    );
    $(document).clearQueue('OpenBoxes');
    $.each(new Array(num), function () {
        $(document).queue('OpenBoxes', open);
    });
    $(document).dequeue('OpenBoxes');
};

/**
 * 在一键开盒后自动显示装备最终加成信息
 */
const showArmsFinalAdditionAfterOpenBoxes = function () {
    if (Info.w.isShowArmsFinalAddition) return;
    Info.w.isShowArmsFinalAddition = true;

    let oriEquippedArmList = [];
    let armList = [];
    $armArea.find('tr[data-id]').each(function () {
        let $this = $(this);
        let armId = parseInt($this.data('id'));
        let armClass = $this.data('class');
        if (armId && armClass) {
            armList.push({armId, armClass});
        }
        if ($this.hasClass('pd_arm_equipped')) {
            oriEquippedArmList.push({armId, armClass});
        }
    });
    if (oriEquippedArmList.length < 2 && !confirm('未在当前页面上存在已装备的该类别装备，在操作后将装备为该页面上其类别的最后一件装备，是否继续？')) return;
    if (armList.length > 0) {
        console.log('在一键开盒后自动显示装备最终加成信息Start');
        if (Const.debug) console.log(oriEquippedArmList);
        showArmsFinalAddition(armList, oriEquippedArmList, safeId);
    }
};

// 保存我的装备信息的键值名称
const myArmsInfoName = Const.storagePrefix + 'myArmsInfo2';

/**
 * 读取我的装备信息
 * @returns {{}} 装备信息对象
 */
export const readArmsInfo = function () {
    let info = {'已装备武器': 0, '已装备护甲': 0, '上次记录的最新装备': 0, '上次记录的时间': 0, '装备列表': {}};
    let options = Util.readData(myArmsInfoName + '_' + Info.uid);
    if (!options) return info;
    try {
        options = JSON.parse(options);
    }
    catch (ex) {
        return info;
    }
    if (!options || $.type(options) !== 'object' || $.type(options['装备列表']) !== 'object') return info;
    info = options;
    return info;
};

/**
 * 写入我的装备信息
 * @param {{}} info 装备信息对象
 */
export const writeArmsInfo = info => Util.writeData(myArmsInfoName + '_' + Info.uid, JSON.stringify(info));

/**
 * 清除我的装备信息
 */
export const clearArmsInfo = () => Util.deleteData(myArmsInfoName + '_' + Info.uid);

/**
 * 获取合并后的装备信息
 * @param {{}} info 当前装备信息
 * @param {{}} newInfo 新装备信息
 * @returns {{}} 合并后的装备信息
 */
export const getMergeArmsInfo = function (info, newInfo) {
    for (let key in newInfo) {
        if (key === '装备列表') {
            for (let armId in newInfo['装备列表']) {
                armId = parseInt(armId);
                if (!armId || armId < 0) continue;
                info['装备列表'][armId] = newInfo['装备列表'][armId];
            }
        }
        else {
            info[key] = newInfo[key];
        }
    }
    return info;
};

/**
 * 添加已保存的我的装备信息
 * @param {jQuery} $armArea 装备区域节点
 */
export const addSavedArmsInfo = function ($armArea) {
    let armsInfo = readArmsInfo();
    let addHtml = '';
    for (let armId of Object.keys(armsInfo['装备列表']).reverse()) {
        if (!$armArea.find(`[id="wp_${armId}"]`).length) {
            addHtml += armsInfo['装备列表'][armId].replace(/(<tr(?: id="wp_\d+")?)>/, '$1 data-saved="true">');
        }
    }
    $armArea.find('> tbody > tr:last-child').before(addHtml);
};

/**
 * 移除指定ID的已保存的装备信息
 * @param armId 装备ID
 * @param {jQuery} $armArea 装备区域节点
 */
const removeSavedArmInfo = function (armId, $armArea) {
    let armsInfo = readArmsInfo();
    delete armsInfo['装备列表'][armId];
    writeArmsInfo(armsInfo);
    $armArea.find(`tr[data-id="${armId}"]`).replaceWith('<tr><td colspan="3" style="color: #777;">该装备不存在</td></tr>');
};

/**
 * 处理装备区域
 * @param {jQuery} $armArea 装备区域节点
 * @param {number} type 页面类型，0：我的物品页面；1：争夺首页点数分配对话框
 */
export const handleArmArea = function ($armArea, type = 0) {
    $armArea.find('a[onclick^="cdzb"]').removeAttr('onclick').attr('data-name', 'equip');
    $armArea.find('a[onclick^="rlzb"]').removeAttr('onclick').attr('data-name', 'smelt');

    $armArea.find('tr[id^="wp_"]').each(function () {
        let $this = $(this);
        let id = $this.attr('id');
        let $td = $this.find('td');
        $td.removeAttr('colspan').removeAttr('style').css({'text-align': 'left', 'padding-left': '5px'});
        $td.html($td.html().replace('（装备中）', ''));
        $this.removeAttr('id').prepend(
            `<td id="${id}"><a data-name="equip" href="javascript:;">装备</a></td><td><a data-name="smelt" href="javascript:;">熔炼</a></td>`
        ).addClass('pd_arm_equipped');
    });

    let writeArmsInfoflag = false;
    let armsInfo = Config.autoSaveArmsInfoEnabled ? readArmsInfo() : {};
    $armArea.find('tr:not([data-id]) > td[id^="wp_"]').each(function (index) {
        let $this = $(this);
        let matches = /wp_(\d+)/.exec($this.attr('id'));
        if (!matches) return;
        let armId = parseInt(matches[1]);
        let $tr = $this.parent('tr');
        let $td = $tr.find('> td:nth-child(3)');
        let html = $td.html();
        let armInfo = getArmInfo(html);
        $tr.attr('data-id', armId).attr('data-class', armInfo['类别']).attr('data-group', armInfo['组别']);
        let newArmMark = false;
        if (Config.autoSaveArmsInfoEnabled) {
            if (index === 0) {
                let today = Util.getMidnightHourDate(0);
                let prev = armsInfo['上次记录的时间'] && armsInfo['上次记录的最新装备'] ? new Date(armsInfo['上次记录的时间']) : new Date(0);
                prev.setHours(0, 0, 0, 0);
                if (Math.abs(today - prev) >= Const.newArmMarkDuration * 24 * 60 * 60 * 1000) {
                    console.log('更新最新装备记录');
                    writeArmsInfoflag = true;
                    armsInfo['上次记录的最新装备'] = armId;
                    armsInfo['上次记录的时间'] = $.now();
                }
            }
            if (armId > armsInfo['上次记录的最新装备']) newArmMark = true;
        }
        $td.html(`${newArmMark ? '<i class="pd_new_arm_mark">[新]</i> ' : ''}<i class="pd_arm_id">[ID: ${armId}]</i> ${handleUselessSubProperties(html)}`);
        if (Config.armsMemo[armId]) {
            $td.attr('data-memo', Config.armsMemo[armId].replace(/"/g, ''));
        }
        if (type === 0) {
            $this.prepend(`<input name="armCheck" type="checkbox" value="${armId}">`);
        }
    });

    if (Config.sortArmsByGroupEnabled) {
        sortArmsByGroup($armArea);
    }

    if (Config.autoSaveArmsInfoEnabled) {
        if (!Config.sortArmsByGroupEnabled) {
            sortArmsById($armArea);
        }

        let realEquippedWeaponId = parseInt($armArea.find('.pd_arm_equipped[data-class="武器"]:not([data-saved="true"])').data('id'));
        let realEquippedArmorId = parseInt($armArea.find('.pd_arm_equipped[data-class="护甲"]:not([data-saved="true"])').data('id'));
        if (realEquippedWeaponId > 0 && armsInfo['已装备武器'] !== realEquippedWeaponId) {
            writeArmsInfoflag = true;
            armsInfo['已装备武器'] = realEquippedWeaponId;
        }
        if (realEquippedArmorId > 0 && armsInfo['已装备护甲'] !== realEquippedArmorId) {
            writeArmsInfoflag = true;
            armsInfo['已装备护甲'] = realEquippedArmorId;
        }
        if (writeArmsInfoflag) {
            writeArmsInfo(armsInfo);
        }
        $armArea.find(`.pd_arm_equipped[data-saved="true"][data-class="武器"]:not([data-id="${armsInfo['已装备武器']}"])`).removeClass('pd_arm_equipped');
        $armArea.find(`.pd_arm_equipped[data-saved="true"][data-class="护甲"]:not([data-id="${armsInfo['已装备护甲']}"])`).removeClass('pd_arm_equipped');
        if (!$armArea.find('.pd_arm_equipped[data-class="武器"]').length) {
            $armArea.find(`tr[data-id="${armsInfo['已装备武器']}"]`).addClass('pd_arm_equipped');
        }
        if (!$armArea.find('.pd_arm_equipped[data-class="护甲"]').length) {
            $armArea.find(`tr[data-id="${armsInfo['已装备护甲']}"]`).addClass('pd_arm_equipped');
        }
    }

    if (type === 1) {
        $armArea.find('a[data-name="equip"]').attr('data-name', 'add').text('加入');
    }

    Script.runFunc('Item.handleArmArea_after_', {$armArea, type});
};

/**
 * 分组排列装备
 * @param {jQuery} $armArea 装备区域节点
 */
export const sortArmsByGroup = function ($armArea) {
    for (let armGroup of armGroupList) {
        $armArea.find(`tr[data-group="${armGroup}"]`).insertAfter($armArea.find('tr:nth-child(2)'));
    }
};

/**
 * 按ID顺序排列装备
 * @param {jQuery} $armArea 装备区域节点
 */
export const sortArmsById = function ($armArea) {
    let armIdList = [];
    $armArea.find('tr[data-id]').each(function () {
        armIdList.push(parseInt($(this).data('id')));
    });
    armIdList.sort((a, b) => a - b);
    for (let armId of armIdList) {
        $armArea.find(`tr[data-id="${armId}"]`).insertAfter($armArea.find('tr:nth-child(2)'));
    }
};

/**
 * 绑定装备点击事件
 * @param {jQuery} $armArea 装备区域节点
 * @param {string} safeId SafeID
 * @param {number} type 页面类型，0：我的物品页面；1：争夺首页
 */
export const bindArmLinkClickEvent = function ($armArea, safeId, type = 0) {
    $armArea.on('click', 'a[data-name="equip"]', function () {
        let $this = $(this);
        let $tr = $this.closest('tr');
        let armId = parseInt($tr.data('id'));
        let armClass = $tr.data('class');
        $.post('kf_fw_ig_mybpdt.php', `do=4&id=${armId}&safeid=${safeId}`, function (html) {
            let msg = Util.removeHtmlTag(html);
            if (/装备完毕/.test(msg)) {
                $armArea.find(`.pd_arm_equipped[data-class="${armClass}"]`).removeClass('pd_arm_equipped');
                $this.closest('tr').addClass('pd_arm_equipped');
                if (Config.autoSaveArmsInfoEnabled) {
                    let armsInfo = readArmsInfo();
                    armsInfo[`已装备${armClass}`] = armId;
                    writeArmsInfo(armsInfo);
                }
                if (type === 1) {
                    let $wait = Msg.wait('<strong>正在获取争夺首页信息&hellip;</strong>');
                    Loot.updateLootInfo(function () {
                        Msg.remove($wait);
                        let $armId = $('input[name="armId"]:first');
                        let $armMemo = $('input[name="armMemo"]:first');
                        $armId.val(armId);
                        $armMemo.val($('#pdArmArea > span:first').text().trim());
                        $('.pd_arm_input').each(function () {
                            $(this).val('');
                            this.defaultValue = '';
                        });
                        Script.runFunc('Item.bindArmLinkClickEvent_equip_after_', {$armArea, type});
                    });
                }
            }
            else {
                if (Config.autoSaveArmsInfoEnabled && (msg === '错误的编号' || msg === '不是你的东西')) {
                    removeSavedArmInfo(armId, $armArea);
                }
                alert(msg);
            }
        });
    }).on('click', 'a[data-name="smelt"]', function () {
        if (!confirm('确定熔炼此装备吗？')) return;
        let $this = $(this);
        let $tr = $this.closest('tr');
        let armId = parseInt($tr.data('id'));
        $.post('kf_fw_ig_mybpdt.php', `do=5&id=${armId}&safeid=${safeId}`, function (html) {
            let msg = Util.removeHtmlTag(html);
            if (/装备消失/.test(msg)) {
                if (armId in Config.armsMemo) {
                    readConfig();
                    delete Config.armsMemo[armId];
                    writeConfig();
                }

                let matches = /获得对应装备经验\[\+(\d+)]/.exec(msg);
                if (matches) {
                    let armClass = $tr.data('class');
                    let gain = {};
                    gain[armClass + '经验'] = parseInt(matches[1]);
                    Log.push(
                        '熔炼装备',
                        `共有\`1\`个【\`${armClass}\`】装备熔炼成功`,
                        {gain, pay: {'装备': -1}}
                    );
                }

                $tr.replaceWith(`<tr><td colspan="3">${msg}</td></tr>`);
                if (Config.autoSaveArmsInfoEnabled) {
                    removeSavedArmInfo(armId, $armArea);
                }
            }
            else {
                if (Config.autoSaveArmsInfoEnabled && (msg === '错误的编号' || msg === '不是你的东西')) {
                    removeSavedArmInfo(armId, $armArea);
                }
                alert(msg);
            }
        });
    }).on('click', 'a[data-name="add"]', function () {
        let $tr = $(this).closest('tr');
        let armId = parseInt($tr.data('id'));
        let armClass = $tr.data('class');
        let armInfo = getArmInfo($tr.find('> td:nth-child(3)').html());
        $('#pdAddArmDialog').parent().hide();
        if (armClass === '武器') {
            $('#pdAddWeaponMemo').val(armInfo['名称']);
            $('#pdAddWeaponId').val(armId).focus();
        }
        else if (armClass === '护甲') {
            $('#pdAddArmorMemo').val(armInfo['名称']);
            $('#pdAddArmorId').val(armId).focus();
        }
    }).on('mouseenter', 'tr[data-id]', function () {
        let $td = $(this).find('> td:nth-child(3)');
        $td.append('<a class="show_arm_info" data-name="showArmInfo" href="#" title="查看装备信息">查</a>');
    }).on('mouseleave', 'tr[data-id]', function () {
        $(this).find('> td:nth-child(3) .show_arm_info').remove();
    }).on('click', '.show_arm_info', function (e) {
        e.preventDefault();
        let $this = $(this);
        let $td = $(this).parent('td');
        let $tr = $this.closest('tr');
        let id = parseInt($tr.data('id'));
        $this.remove();
        let html = $td.html();
        let armInfo = getArmInfo(html);
        showArmInfoDialog(id, armInfo, $armArea);
    });
};

/**
 * 显示装备信息对话框
 * @param {number} armId 装备ID
 * @param {{}} armInfo 装备信息
 * @param {jQuery} $armArea 装备区域节点
 */
const showArmInfoDialog = function (armId, armInfo, $armArea) {
    const dialogName = 'pdArmInfoDialog';
    if ($('#' + dialogName).length > 0) return;
    Msg.destroy();

    let html = `
<div class="pd_cfg_main">
  <div style="width: 550px; margin-top: 5px; padding-bottom: 5px; border-bottom: 1px solid #99f;">
    <span style="color: ${armInfo['颜色']}">${armInfo['名称']}</span> - ${armInfo['描述']}
  </div>
  <div style="margin-top: 5px;">
    <label>装备ID：<input name="armId" type="text" value="${armId}" style="width: 100px;" readonly></label>
    <a class="pd_btn_link" data-name="copy" data-target="[name=armId]" href="#">复制</a>
  </div>
  <div style="margin-top: 5px;">
    <label>装备参数设置：</label>
    <a class="pd_btn_link" data-name="copy" data-target="[name=armParameterSetting]" href="#">复制</a><br>
    <textarea name="armParameterSetting" rows="6" style="width: 550px;" wrap="off" style="white-space: pre;" readonly></textarea>
  </div>
  <div style="margin-top: 5px;">
    <label>
      装备备注：<input name="armMemo" type="text" maxlength="100" style="width: 200px;">
    </label>
  </div>
</div>
<div class="pd_cfg_btns">
  <button name="saveMemo" type="submit">保存备注</button>
  <button data-action="close" type="button">关闭</button>
</div>`;
    let $dialog = Dialog.create(dialogName, '装备信息', html, 'z-index: 1003;');

    $dialog.on('click', 'a[data-name="copy"]', function (e) {
        e.preventDefault();
        let $target = $dialog.find($(this).data('target'));
        if (!Util.copyText($target)) {
            $target.select().focus();
        }
        Script.runFunc('Item.showArmInfoDialog_copy_');
    }).submit(function (e) {
        e.preventDefault();
        readConfig();
        let value = $.trim($dialog.find('input[name="armMemo"]').val());
        let $node = $armArea.find(`tr[data-id="${armId}"] > td:nth-child(3)`);
        if (value) {
            Config.armsMemo[armId] = value;
            $node.attr('data-memo', value.replace(/"/g, ''));
        }
        else {
            delete Config.armsMemo[armId];
            $node.removeAttr('data-memo');
        }
        writeConfig();
        Dialog.close(dialogName);
    });

    $dialog.find('textarea[name="armParameterSetting"]').val(getArmParameterSetting(armId, armInfo));
    if (Config.armsMemo[armId]) {
        $dialog.find('input[name="armMemo"]').val(Config.armsMemo[armId]);
    }
    Dialog.show(dialogName);
    Script.runFunc('Item.showArmInfoDialog_after_');
};

// 装备属性关键词列表
const armPropertyKeyList = new Map([
    ['增加攻击力', 'ATK'], ['增加暴击伤害', 'CRT'], ['增加技能伤害', 'SKL'], ['穿透对方意志', 'BRC'], ['生命夺取', 'LCH'], ['增加速度', 'SPD'],
    ['攻击', 'ATK'], ['暴击', 'CRT'], ['技能', 'SKL'], ['穿透', 'BRC'], ['吸血', 'LCH'], ['速度', 'SPD'],
    ['被攻击回血100+', 'HEL'], ['获得无护甲魔法盾500+', 'SLD'], ['每减少5%生命值获得额外意志', 'AMR'], ['反弹对方实际伤害15%+', 'RFL'],
    ['减少来自暴击的伤害10%+', 'CRD'], ['减少来自技能的伤害10%+', 'SRD'],
    ['回血', 'HEL'], ['护盾', 'SLD'], ['加防', 'AMR'], ['反伤', 'RFL'], ['暴减', 'CRD'], ['技减', 'SRD'],
]);

/**
 * 获取计算器装备参数设置
 * @param {number} armId 装备ID
 * @param {{}} armInfo 装备信息
 * @returns {string} 装备参数设置
 */
export const getArmParameterSetting = function (armId, armInfo) {
    let info = {
        '组别': '',
        '装备ID': '',
        '神秘属性数量': 0,
        '所有的神秘属性': '',
        '主属性数量': 0,
        '所有的主属性': '',
        '从属性数量': 0,
        '所有的从属性': '',
    };

    let groupKeyList = new Map([['长剑', 'Sword'], ['短弓', 'Bow'], ['法杖', 'Staff'], ['铠甲', 'Plate'], ['皮甲', 'Leather'], ['布甲', 'Cloth']]);
    info['组别'] = groupKeyList.get(armInfo['组别']);
    info['装备ID'] = '#' + armId;

    let smKeyList = new Map([['火神秘', 'FMT'], ['雷神秘', 'LMT'], ['风神秘', 'AMT'], ['冰霜神秘', 'IMT'], ['尖刺神秘', 'TMT'], ['仇恨神秘', 'HMT']]);
    for (let [key, value] of smKeyList) {
        if (key in armInfo) {
            info['神秘属性数量']++;
            info['所有的神秘属性'] += value + ' ';
        }
    }

    for (let value of armInfo['主属性']) {
        let [property = ''] = value.split('(', 1);
        property = property.trim();
        if (property) {
            info['主属性数量']++;
            info['所有的主属性'] += armPropertyKeyList.get(property) + ' ';
        }
    }

    let subPropertyKeyList = new Map([
        ['系数(x3)', 'COF'], ['力量', 'STR'], ['敏捷', 'AGI'], ['智力', 'INT'], ['体质', 'VIT'], ['灵活', 'DEX'], ['意志', 'RES']
    ]);
    for (let value of armInfo['从属性']) {
        value = $.trim(value);
        if (!value) continue;
        let matches = /(?:\[.])?(\S+?)\((\S+?)x([\d\.]+)%\)/.exec(value);
        if (matches) {
            info['从属性数量']++;
            info['所有的从属性'] += armPropertyKeyList.get(matches[1]) + ' ' + subPropertyKeyList.get(matches[2]) + ' ' +
                Math.floor(parseFloat(matches[3]) * 10) + ' ';
        }
    }

    let content = `
[组别] [装备ID]
[神秘属性数量] [所有的神秘属性]
[主属性数量] [所有的主属性]
[从属性数量] [所有的从属性]
`.trim();
    for (let [key, value] of Util.entries(info)) {
        content = content.replace(`[${key}]`, $.trim(value));
    }
    return content;
};

/**
 * 处理无用的从属性
 * @param {string} html 装备的HTML代码
 * @returns {string} 处理后的HTML代码
 */
export const handleUselessSubProperties = function (html) {
    let armInfo = getArmInfo(html);
    let keyList = [];
    for (let value of armInfo['主属性']) {
        let [property = ''] = value.split('(', 1);
        if (property) {
            keyList.push(armPropertyKeyList.get(property));
        }
    }

    let matches = /从属性：(.+?)(<br(?:\s*\/)?>|$)/.exec(html);
    if (matches) {
        let subPropertiesHtml = '';
        for (let value of matches[1].split('。')) {
            if (!value) continue;
            let subMatches = /(?:^|>)([^<>]+?)\(/.exec(value);
            if (subMatches) {
                let property = subMatches[1];
                if (!keyList.includes(armPropertyKeyList.get(property))) {
                    value = `<span class="pd_useless_sub_property">${value}</span>`;
                }
            }
            subPropertiesHtml += value + '。';
        }
        html = html.replace(matches[0], '从属性：' + subPropertiesHtml + matches[2]);
    }

    return html;
};

/**
 * 添加装备相关按钮
 */
const addArmsButton = function () {
    $(`
<div class="pd_item_btns" data-name="handleArmBtns">
  <button name="openImOrExOrClearArmsLogDialog" type="button" title="导入/导出/清除已保存的装备信息">导入/导出/清除</button>
  <button name="showArmsFinalAddition" type="button" title="显示当前页面上所有装备的最终加成信息">显示最终加成</button>
  <button name="smeltSelectArms" type="button" style="color: #00f;" title="批量熔炼当前页面上所选的装备">熔炼所选</button>
  <button name="smeltArms" type="button" style="color: #f00;" title="批量熔炼指定种类的装备">批量熔炼</button>
</div>
`).insertAfter($armArea).find('[name="openImOrExOrClearArmsLogDialog"]')
        .click(function () {
            Public.showCommonImportOrExportLogDialog({
                name: '装备信息',
                read: readArmsInfo,
                write: writeArmsInfo,
                merge: getMergeArmsInfo,
                callback: function ($dialog) {
                    $('<button name="clearArmsMemo" type="button" style="color: #00f;">清除备注</button> ' +
                        '<button name="clear" type="button" style="color: #f00;">清除记录</button>')
                        .prependTo($dialog.find('.pd_cfg_btns'))
                        .filter('[name="clearArmsMemo"]')
                        .click(function () {
                            if (!confirm('是否清除所有装备的备注？')) return;
                            readConfig();
                            Config.armsMemo = {};
                            writeConfig();
                            alert('所有装备的备注已被清除');
                            location.reload();
                        }).end().filter('[name="clear"]')
                        .click(function () {
                            if (!confirm('是否清除所有已保存的装备信息？')) return;
                            clearArmsInfo();
                            alert('在本地保存的装备信息已被清除');
                            location.reload();
                        });
                }
            });
        })
        .end().find('[name="showArmsFinalAddition"]')
        .click(function () {
            let $arms = $armArea.find('tr[data-id]:has([name="armCheck"]:checked)');
            if (!confirm(`是否显示当前页面上【${$arms.length > 0 ? '所选' : '全部'}】装备的最终加成信息？
（警告：请不要在争夺攻击途中使用此功能！）`)) return;
            if (!$arms.length) $arms = $armArea.find('tr[data-id]');
            Msg.destroy();

            let armList = [];
            $arms.each(function () {
                let $this = $(this);
                let armId = parseInt($this.data('id'));
                let armClass = $this.data('class');
                if (armId && armClass) {
                    armList.push({armId, armClass});
                }
            });
            if (!armList.length) return;

            let oriEquippedArmList = [];
            $armArea.find('.pd_arm_equipped').each(function () {
                let $this = $(this);
                let armId = parseInt($this.data('id'));
                let armClass = $this.data('class');
                oriEquippedArmList.push({armId, armClass});
            });
            if (oriEquippedArmList.length < 2 && !confirm('未在当前页面上存在已装备的该类别装备，在操作后将装备为该页面上其类别的最后一件装备，是否继续？')) return;

            showArmsFinalAddition(armList, oriEquippedArmList, safeId);
        }).end().find('[name="smeltSelectArms"]')
        .click(function () {
            let idList = [];
            $armArea.find('input[name="armCheck"]:checked').each(function () {
                idList.push(parseInt($(this).val()));
            });
            if (!idList.length || !confirm(`是否熔炼所选的 ${idList.length} 件装备？`)) return;
            smeltArms({idList, safeId});
        }).end().find('[name="smeltArms"]').click(() => showBatchSmeltArmsDialog(safeId));
    addCommonArmsButton($('.pd_item_btns[data-name="handleArmBtns"]'), $armArea);
};

/**
 * 添加装备相关的通用按钮
 * @param {jQuery} $area 要添加的区域节点
 * @param {jQuery} $armArea 装备区域节点
 */
export const addCommonArmsButton = function ($area, $armArea) {
    $(`
<label>
  <input name="sortArmsByGroupEnabled" type="checkbox" ${Config.sortArmsByGroupEnabled ? 'checked' : ''}> 分组排列</input>
  <span class="pd_cfg_tips" title="分组排列装备">[?]</span>
</label>
<select name="select" style="width: 92px; vertical-align: middle; margin-bottom: 2px;">
  <option>选择装备</option>
  <option value="selectAll">全选</option>
  <option value="selectInverse">反选</option>
  <option value="selectCancel">取消</option>
  <option value="selectWeapon">选择武器</option>
  <option value="selectArmor">选择护甲</option>
  <option value="selectNewArm">选择新装备</option>
  <option value="selectNoMemo">选择无备注的装备</option>
  <option value="selectArmId">选择指定ID的装备</option>
</select>
<button name="copyArmParameterSetting" type="button" title="复制所选装备的计算器参数设置">复制装备参数</button>
`).prependTo($area).find('[name="sortArmsByGroupEnabled"]').click(function () {
        let checked = $(this).prop('checked');
        if (Config.sortArmsByGroupEnabled !== checked) {
            readConfig();
            Config.sortArmsByGroupEnabled = checked;
            writeConfig();
        }
        if (checked) {
            sortArmsByGroup($armArea);
        }
        else {
            sortArmsById($armArea);
        }
    }).end().filter('[name="select"]').change(function () {
        let $selectedArmsNum = $armArea.find('#pdSelectedArmsNum');
        $selectedArmsNum.text(0).parent().hide();

        let name = $(this).val();
        let $checkboxes = $armArea.find('input[name="armCheck"]');
        if (name === 'selectAll') {
            Util.selectAll($checkboxes);
        }
        else if (name === 'selectInverse') {
            Util.selectInverse($checkboxes);
        }
        else if (name === 'selectCancel') {
            $checkboxes.prop('checked', false);
        }
        else if (name === 'selectWeapon') {
            $checkboxes.prop('checked', false);
            $armArea.find('tr[data-class="武器"] input[name="armCheck"]').prop('checked', true);
        }
        else if (name === 'selectArmor') {
            $checkboxes.prop('checked', false);
            $armArea.find('tr[data-class="护甲"] input[name="armCheck"]').prop('checked', true);
        }
        else if (name === 'selectNewArm') {
            $checkboxes.prop('checked', false);
            $armArea.find('tr:has(.pd_new_arm_mark) input[name="armCheck"]').prop('checked', true);
        }
        else if (name === 'selectNoMemo') {
            $checkboxes.prop('checked', false);
            if (!$armArea.find('tr:has(td[data-memo])').length) {
                if (!confirm('在当前页面上未发现包含备注的装备，建议检查一下你是否清空了装备备注，是否继续选择？')) return;
            }
            let $legendEquip = $armArea.find('tr[data-id]:has(span:contains("传奇的"))').not(':has(td[data-memo])');
            if ($legendEquip.length > 0) {
                if (!confirm(`你一共选择了 ${$legendEquip.length} 件传奇装备，是否继续选择？`)) return;
            }
            $armArea.find('tr:not(:has(td[data-memo])) input[name="armCheck"]').prop('checked', true);
        }
        else if (name === 'selectArmId') {
            let text = $.trim(prompt('请输入要选择的装备ID（多个装备ID用空格分隔）：'));
            if (text) {
                $checkboxes.prop('checked', false);
                $armArea.find(text.split(' ').map(armId => `tr[data-id="${armId}"] input[name="armCheck"]`).join(',')).prop('checked', true);
            }
        }

        let selectedNum = $checkboxes.filter(':checked').length;
        if (selectedNum > 0) {
            $selectedArmsNum.text(selectedNum).parent().show();
        }

        Script.runFunc('Item.addCommonArmsButton_select_change_', {name, $armArea});
        this.selectedIndex = 0;
    }).end().filter('[name="copyArmParameterSetting"]').click(function () {
        let $this = $(this);
        let armInfoList = [];
        $armArea.find('input[name="armCheck"]:checked').each(function () {
            let $this = $(this);
            let id = parseInt($this.val());
            let html = $this.closest('tr').find('> td:nth-child(3)').html();
            if (!html) return;
            armInfoList.push({id: id, info: getArmInfo(html)});
        });
        if (!armInfoList.length) return;
        let copyData = '';
        for (let {id, info} of armInfoList) {
            copyData += getArmParameterSetting(id, info) + '\n\n';
        }
        $this.data('copy-text', copyData.trim());
        console.log(`所选的 ${armInfoList.length} 件装备的计算器装备参数设置：\n\n` + copyData.trim());
        if (!Util.copyText($this, `所选的 ${armInfoList.length} 件装备的计算器装备参数设置已复制`)) {
            alert('你的浏览器不支持复制，请打开Web控制台查看');
        }
    });

    $armArea.find('> tbody > tr:last-child > td:first-child').append(
        '<div class="pd_highlight" style="position: absolute; left: 7px; top: 0; display: none;">(已选 <span id="pdSelectedArmsNum">0</span> 件)</div>'
    );
    Script.runFunc('Item.addCommonArmsButton_after_', {$area, $armArea});
};

/**
 * 显示装备最终加成信息
 * @param {Object[]} armList 装备列表
 * @param {Object[]} oriEquippedArmList 原先的装备列表
 * @param {string} safeId SafeID
 */
export const showArmsFinalAddition = function (armList, oriEquippedArmList, safeId) {
    let index = 0;

    /**
     * 写入装备信息
     * @param {number} armId 装备ID
     * @param {string} armClass 装备类别
     */
    const writeArmInfo = function (armId, armClass) {
        $armArea.find(`.pd_arm_equipped[data-class="${armClass}"]`).removeClass('pd_arm_equipped')
            .end().find(`tr[data-id="${armId}"]`).addClass('pd_arm_equipped');
        if (Config.autoSaveArmsInfoEnabled) {
            let armsInfo = readArmsInfo();
            armsInfo[`已装备${armClass}`] = armId;
            writeArmsInfo(armsInfo);
        }
    };

    /**
     * 装备
     * @param {number} armId 装备ID
     * @param {string} armClass 装备类别
     * @param {boolean} isComplete 是否操作完成
     * @param {function} callback 回调函数
     */
    const equip = function ({armId, armClass}, isComplete = false, callback = null) {
        $.ajax({
            type: 'POST',
            url: 'kf_fw_ig_mybpdt.php',
            data: `do=4&id=${armId}&safeid=${safeId}`,
            timeout: Const.defAjaxTimeout,
        }).done(function (html) {
            let msg = Util.removeHtmlTag(html);
            console.log(`【装备ID[${armId}]，装备类别[${armClass}]】：${msg.replace('\n', ' ')}`);
            if (isComplete) {
                if (/装备完毕/.test(msg)) {
                    writeArmInfo(armId, armClass);
                    if (typeof callback === 'function') callback();
                }
                else {
                    setTimeout(() => equip({armId, armClass}, isComplete, callback), Const.minActionInterval);
                }
                return;
            }
            if (!/装备完毕|操作过快/.test(msg)) {
                index++;
                if (Config.autoSaveArmsInfoEnabled && (msg === '错误的编号' || msg === '不是你的东西')) {
                    removeSavedArmInfo(armId, $armArea);
                }
            }
            if (index >= armList.length) {
                complete();
                return;
            }
            if (!/装备完毕/.test(msg)) {
                setTimeout(() => equip(armList[index]), Const.minActionInterval);
            }
            else {
                writeArmInfo(armId, armClass);
                setTimeout(() => getFinalAddition({armId, armClass}), Const.defAjaxInterval);
            }
        }).fail(() => setTimeout(() => equip({armId, armClass}, isComplete, callback), Const.minActionInterval));
    };

    /**
     * 获取当前装备的最终加成
     * @param {number} armId 装备ID
     * @param {string} armClass 装备类别
     */
    const getFinalAddition = function ({armId, armClass}) {
        $.ajax({
            type: 'GET',
            url: 'kf_fw_ig_index.php?t=' + $.now(),
            timeout: Const.defAjaxTimeout,
        }).done(function (html) {
            $wait.find('.pd_countdown').text(armList.length - (index + 1));
            if ($wait.data('stop')) {
                complete();
                return;
            }

            let matches = armClass === '武器' ? />(攻击伤害\+[^<>]+)</.exec(html) : />(受伤回血\+[^<>]+)</.exec(html);
            if (matches) {
                let info = matches[1];
                console.log(`【装备ID[${armId}]，装备类别[${armClass}]】：${info}`);
                let $armInfo = $armArea.find(`tr[data-id="${armId}"]`).find('td:nth-child(3)');
                $armInfo.find('.pd_final_addition_info').remove();
                $armInfo.append(`<span class="pd_final_addition_info" title="最终加成：${info}"><br>最终加成：${info}</span>`);
            }

            index++;
            if (index >= armList.length) {
                complete();
                return;
            }
            setTimeout(() => equip(armList[index]), Const.minActionInterval);
            Script.runFunc('Item.showArmsFinalAddition_show_', {armId, armClass});
        }).fail(() => setTimeout(() => getFinalAddition({armId, armClass}), Const.minActionInterval));
    };

    /**
     * 操作完成
     */
    const complete = function () {
        Msg.remove($wait);
        if (oriEquippedArmList.length > 0) {
            let $wait = Msg.wait('<strong>正在还原为之前的装备&hellip;</strong>');
            setTimeout(() => equip(oriEquippedArmList[0], true, function () {
                if (!oriEquippedArmList[1]) {
                    Msg.remove($wait);
                    return;
                }
                setTimeout(() => equip(oriEquippedArmList[1], true, function () {
                    Msg.remove($wait);
                }), Const.minActionInterval);
            }), Const.minActionInterval);
        }
        Script.runFunc('Item.showArmsFinalAddition_complete_');
    };

    let $wait = Msg.wait(
        `<strong>正在获取装备最终加成信息&hellip;</strong><i>剩余：<em class="pd_countdown">${armList.length}</em></i>` +
        `<a class="pd_stop_action" href="#">停止操作</a>`
    );
    equip(armList[0]);
};

/**
 * 显示批量熔炼装备对话框
 */
const showBatchSmeltArmsDialog = function () {
    const dialogName = 'pdBatchSmeltArmsDialog';
    if ($('#' + dialogName).length > 0) return;
    Msg.destroy();
    readConfig();

    let armTypeCheckedHtml = '';
    for (let group of armGroupList) {
        armTypeCheckedHtml += `<li><b>${group}：</b>`;
        for (let type of armTypeList) {
            let prefix = type.split('的')[0];
            if (prefix === '神秘') continue;
            let name = `${prefix}的${group}`;
            armTypeCheckedHtml += `
<label style="margin-right: 5px;">
  <input type="checkbox" name="smeltArmsType" value="${name}" ${Config.defSmeltArmTypeList.includes(name) ? 'checked' : ''}> ${prefix}
</label>`;
        }
        armTypeCheckedHtml += '</li>';
    }

    let html = `
<div class="pd_cfg_main">
  <div>请选择想批量熔炼的装备种类：</div>
  <ul data-name="smeltArmTypeList">${armTypeCheckedHtml}</ul>
</div>
<div class="pd_cfg_btns">
  <button name="selectAll" type="button">全选</button>
  <button name="selectInverse" type="button">反选</button>
  <button name="smelt" type="button" style="color: #f00;">熔炼</button>
  <button data-action="close" type="button">关闭</button>
</div>`;
    let $dialog = Dialog.create(dialogName, '批量熔炼装备', html);
    let $smeltArmTypeList = $dialog.find('ul[data-name="smeltArmTypeList"]');

    $dialog.find('[name="smelt"]').click(function () {
        let typeList = [];
        $smeltArmTypeList.find('input[name="smeltArmsType"]:checked').each(function () {
            typeList.push($(this).val());
        });
        if (!typeList.length) return;
        readConfig();
        Config.defSmeltArmTypeList = typeList;
        writeConfig();
        if (!confirm('是否熔炼所选装备种类？')) return;
        Dialog.close(dialogName);
        smeltArms({typeList, safeId});
    }).end().find('[name="selectAll"]').click(() => Util.selectAll($smeltArmTypeList.find('input[name="smeltArmsType"]')))
        .end().find('[name="selectInverse"]').click(() => Util.selectInverse($smeltArmTypeList.find('input[name="smeltArmsType"]')));

    Dialog.show(dialogName);
    Script.runFunc('Item.showBatchSmeltArmsDialog_after_');
};

/**
 * 熔炼装备
 * @param {string[]} typeList 想要熔炼的装备种类列表
 * @param {number[]} idList 想要熔炼的装备ID列表（用于熔炼所选，不要与typeList一起使用）
 * @param {string} safeId SafeID
 * @param {boolean} nextActionEnabled 是否执行后续操作
 */
export const smeltArms = function ({typeList = [], idList = [], safeId, nextActionEnabled = false}) {
    let successNum = 0, index = 0;
    let smeltInfo = {};
    let isStop = false, isDeleteMemo = false;
    let smeltedArmIdList = [];

    /**
     * 熔炼
     * @param {number} armId 装备ID
     * @param {string} armClass 装备类别
     * @param {string} armGroup 装备组别
     * @param {string} armName 装备名称
     * @param {number} armNum 本轮熔炼的装备数量
     */
    const smelt = function (armId, armClass, armGroup, armName, armNum) {
        index++;
        $.ajax({
            type: 'POST',
            url: 'kf_fw_ig_mybpdt.php',
            data: `do=5&id=${armId}&safeid=${safeId}`,
            timeout: Const.defAjaxTimeout,
        }).done(function (html) {
            if (!html) return;
            let msg = Util.removeHtmlTag(html);
            console.log(`【${armName}】 ${msg}`);
            if (msg.includes('错误的安全码')) isStop = true;
            $('.pd_result[data-name="armResult"]:last').append(`<li>【${armName}】 ${msg}</li>`);
            $armArea.find(`td[id="wp_${armId}"]`).parent('tr').fadeOut('normal', function () {
                $(this).remove();
            });
            if (Config.autoSaveArmsInfoEnabled && /装备消失|错误的编号|不是你的东西/.test(msg)) {
                smeltedArmIdList.push(armId);
            }

            let matches = /获得对应装备经验\[\+(\d+)]/.exec(msg);
            if (matches) {
                successNum++;
                if (armId in Config.armsMemo) {
                    isDeleteMemo = true;
                    delete Config.armsMemo[armId];
                }
                if (!(armClass in smeltInfo)) smeltInfo[armClass] = {};
                if (!(armGroup in smeltInfo[armClass])) smeltInfo[armClass][armGroup] = {num: 0, exp: 0};
                smeltInfo[armClass][armGroup].num++;
                smeltInfo[armClass][armGroup].exp += parseInt(matches[1]);
                $wait.find('.pd_countdown').text(successNum);
            }
            Script.runFunc('Item.smeltArms_after_', msg);
        }).fail(function () {
            $('.pd_result[data-name="armResult"]:last').append(`<li>【${armName}】 <span class="pd_notice">连接超时</span></li>`);
        }).always(function () {
            if (isStop || $wait.data('stop')) {
                complete();
            }
            else {
                if (index === armNum) setTimeout(getNextArms, Const.minActionInterval);
                else setTimeout(() => $(document).dequeue('SmeltArms'), Const.minActionInterval);
            }
        });
    };

    /**
     * 获取当前的装备
     */
    const getCurrentArms = function () {
        let armList = [];
        $armArea.find('td[id^="wp_"]').each(function () {
            let $this = $(this);
            let $tr = $this.parent('tr');
            if ($tr.hasClass('pd_arm_equipped')) return;
            let armId = parseInt($tr.data('id'));
            let armName = $tr.find('> td:nth-child(3) > span:first').text().trim();
            let [, armGroup] = armName.split('的');
            let armClass = getArmClassNameByGroupName(armGroup);
            if (armName && armGroup) {
                if (typeList.length > 0 && typeList.includes(armName)) {
                    armList.push({armId, armClass, armGroup, armName});
                }
                else if (idList.length > 0 && idList.includes(armId)) {
                    armList.push({armId, armClass, armGroup, armName});
                }
            }
        });
        if (!armList.length) {
            complete();
            return;
        }

        index = 0;
        $(document).clearQueue('SmeltArms');
        $.each(armList, function (i, {armId, armClass, armGroup, armName}) {
            $(document).queue('SmeltArms', () => smelt(armId, armClass, armGroup, armName, armList.length));
        });
        $(document).dequeue('SmeltArms');
    };

    /**
     * 获取下一批装备
     */
    const getNextArms = function () {
        getNextObjects(2, () => {
            if ($wait.data('stop')) complete();
            else setTimeout(getCurrentArms, Const.defAjaxInterval);
        });
    };

    /**
     * 执行后续操作
     */
    const nextAction = function () {
        let action = null;
        if (Config.useItemsAfterOpenBoxesEnabled) {
            action = () => useItems({typeList: Config.defUseItemTypeList, safeId, nextActionEnabled});
        }
        else if (Config.sellItemsAfterOpenBoxesEnabled) {
            action = () => sellItems({typeList: Config.defSellItemTypeList, safeId, nextActionEnabled});
        }
        if (action) {
            setTimeout(action, Const.minActionInterval);
        }
        else if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
            showArmsFinalAdditionAfterOpenBoxes();
        }
    };

    /**
     * 清除无效信息
     */
    const clearInfo = function () {
        if (isDeleteMemo) writeConfig();
        if (Config.autoSaveArmsInfoEnabled) {
            let armsInfo = readArmsInfo();
            for (let armId of smeltedArmIdList) {
                delete armsInfo['装备列表'][armId];
            }
            writeArmsInfo(armsInfo);
        }
    };

    /**
     * 操作完成
     */
    const complete = function () {
        $(document).clearQueue('SmeltArms');
        Msg.remove($wait);
        if ($.isEmptyObject(smeltInfo)) {
            console.log('没有装备被熔炼！');
            clearInfo();
            if (nextActionEnabled) nextAction();
            Script.runFunc('Item.smeltArms_complete_', {nextActionEnabled, $armArea});
            return;
        }

        let armGroupNum = 0;
        let resultStat = '', resultDetailStat = '', msgStat = '', logStat = '';
        for (let armClass of Util.getSortedObjectKeyList(armClassList, smeltInfo)) {
            resultDetailStat += `<b>【${armClass}】：</b><br>`;
            let armClassNum = 0;
            let gain = {};
            gain[`${armClass}经验`] = 0;
            for (let armGroup of Util.getSortedObjectKeyList(armGroupList, smeltInfo[armClass])) {
                armGroupNum++;
                let {exp, num} = smeltInfo[armClass][armGroup];
                armClassNum += num;
                gain[`${armClass}经验`] += exp;
                resultDetailStat += `&nbsp;&nbsp;【${armGroup}】 <i>装备<ins>-${num}</ins></i> <i>${armClass}经验<em>+${exp.toLocaleString()}</em></i><br>`;
            }
            let commonStat = `<i>${armClass}经验<em>+${gain[`${armClass}经验`].toLocaleString()}</em></i> `;
            resultStat += commonStat;
            msgStat += commonStat.trim();
            logStat += Util.removeHtmlTag(commonStat);
            Log.push(
                '熔炼装备',
                `共有\`${armClassNum}\`个【\`${armClass}\`】装备熔炼成功`,
                {gain, pay: {'装备': -armClassNum}}
            );
        }
        $('.pd_result[data-name="armResult"]:last').append(`
<li class="pd_stat">
  <b>统计结果（共有<em>${armGroupNum}</em>个组别中的<em>${successNum}</em>个装备熔炼成功）：</b><br>
  ${resultStat}<br>
  ${resultDetailStat}
</li>`);
        console.log(`共有${armGroupNum}个组别中的${successNum}个装备熔炼成功，${logStat}`);
        Msg.show(
            `<strong>共有<em>${armGroupNum}</em>个组别中的<em>${successNum}</em>个装备熔炼成功</strong>${msgStat}`,
            -1
        );

        clearInfo();
        setTimeout(() => getNextObjects(2), Const.defAjaxInterval);
        if (nextActionEnabled) nextAction();
        Script.runFunc('Item.smeltArms_complete_', {nextActionEnabled, $armArea});
    };

    if (!$.isEmptyObject(Config.armsMemo)) readConfig();
    $armArea.parent().append('<ul class="pd_result" data-name="armResult"><li><strong>熔炼结果：</strong></li></ul>');
    let $wait = Msg.wait(
        '<strong>正在熔炼装备中&hellip;</strong><i>已熔炼：<em class="pd_countdown">0</em></i><a class="pd_stop_action" href="#">停止操作</a>'
    );
    getCurrentArms();
};

/**
 * 通过装备组别名获取类别名
 * @param {string} groupName 装备组别名
 * @returns {string} 装备类别名
 */
export const getArmClassNameByGroupName = function (groupName) {
    switch (groupName) {
        case '长剑':
        case '短弓':
        case '法杖':
            return '武器';
        case '铠甲':
        case '皮甲':
        case '布甲':
            return '护甲';
        default:
            return '';
    }
};

/**
 * 获取指定装备情况
 * @param html 装备的HTML代码
 * @returns {{}} 当前装备情况
 */
export const getArmInfo = function (html) {
    let armInfo = {
        '名称': '',
        '颜色': '#000',
        '类别': '',
        '组别': '',
        '描述': '',
        '作用': '',
        '主属性': [],
        '从属性': [],
    };
    let matches = /<span style="color:([^<>]+);">([^<>]+)<\/span>/.exec(html);
    if (!matches) return armInfo;

    armInfo['颜色'] = matches[1];
    armInfo['名称'] = matches[2];
    [, armInfo['组别'] = ''] = matches[2].split('的');
    armInfo['类别'] = getArmClassNameByGroupName(armInfo['组别']);

    [, armInfo['描述'] = ''] = html.split('</span> - ', 2);
    let description = Util.removeHtmlTag(armInfo['描述']);
    [armInfo['作用'] = ''] = description.split('\n', 1);

    matches = /主属性：(.+?)\n/.exec(description);
    if (matches) armInfo['主属性'] = matches[1].split('。');

    matches = /从属性：(.+?)(\n|$)/.exec(description);
    if (matches) armInfo['从属性'] = matches[1].split('。');

    let smMatches = description.match(/([^。\s]+神秘)：(.+?)。/g);
    for (let i in smMatches) {
        let subMatches = /([^。\s]+神秘)：(.+?)。/.exec(smMatches[i]);
        if (smMatches) {
            armInfo[subMatches[1]] = subMatches[2];
        }
    }
    return armInfo;
};

/**
 * 获取装备等级情况
 * @param html 装备的HTML代码
 * @returns {Map} 装备等级情况列表
 */
export const getArmsLevelInfo = function (html) {
    let armsLevelList = new Map([
        ['武器', 0],
        ['护甲', 0],
        ['项链', 0],
    ]);
    let matches = html.match(/value="(\S+?)等级\[\s*(\d+)\s*] 经验:(\d+)"/g);
    for (let i in matches) {
        let subMatches = /value="(\S+?)等级\[\s*(\d+)\s*] 经验:(\d+)"/.exec(matches[i]);
        armsLevelList.set(subMatches[1], {'等级': parseInt(subMatches[2]), '经验': parseInt(subMatches[3])});
    }
    return armsLevelList;
};

/**
 * 获取指定名称的道具等级
 * @param {string} itemName 道具名称
 * @returns {number} 道具等级
 */
export const getLevelByName = function (itemName) {
    switch (itemName) {
        case '零时迷子的碎片':
        case '被遗弃的告白信':
        case '学校天台的钥匙':
        case 'TMA最新作压缩包':
            return 1;
        case 'LOLI的钱包':
        case '棒棒糖':
            return 2;
        case '蕾米莉亚同人漫画':
        case '十六夜同人漫画':
            return 3;
        case '档案室钥匙':
        case '傲娇LOLI娇蛮音CD':
            return 4;
        case '整形优惠卷':
        case '消逝之药':
            return 5;
        default:
            return 0;
    }
};

/**
 * 获取道具使用情况
 * @param html 争夺首页的HTML代码
 * @returns {Map} 道具使用情况列表
 */
export const getItemsUsedNumInfo = function (html) {
    let itemUsedNumList = new Map([
        ['蕾米莉亚同人漫画', 0],
        ['十六夜同人漫画', 0],
        ['档案室钥匙', 0],
        ['傲娇LOLI娇蛮音CD', 0],
        ['消逝之药', 0],
        ['整形优惠卷', 0],
    ]);
    let matches = html.match(/value="\[\s*(\d+)\s*](\S+?)"/g);
    for (let i in matches) {
        let subMatches = /value="\[\s*(\d+)\s*](\S+?)"/.exec(matches[i]);
        if (itemUsedNumList.has(subMatches[2])) {
            itemUsedNumList.set(subMatches[2], parseInt(subMatches[1]));
        }
    }
    return itemUsedNumList;
};

/**
 * 添加批量使用和出售道具按钮
 */
const addBatchUseAndSellItemsButton = function () {
    $(`
<div class="pd_item_btns" data-name="handleItemsBtns">
  <button name="useItems" type="button" style="color: #00f;" title="批量使用指定道具">批量使用</button>
  <button name="sellItems" type="button" style="color: #f00;" title="批量出售指定道具">批量出售</button>
</div>
`).insertAfter($itemArea).find('[name="useItems"]').click(() => showBatchUseAndSellItemsDialog(1, safeId))
        .end().find('[name="sellItems"]').click(() => showBatchUseAndSellItemsDialog(2, safeId));

    Public.addSlowActionChecked($('.pd_item_btns[data-name="handleItemsBtns"]'));
};

/**
 * 显示批量使用和出售道具对话框
 * @param {number} type 对话框类型，1：批量使用；2：批量出售
 */
const showBatchUseAndSellItemsDialog = function (type) {
    const dialogName = 'pdBatchUseAndSellItemsDialog';
    if ($('#' + dialogName).length > 0) return;
    Msg.destroy();
    let typeName = type === 1 ? '使用' : '出售';
    readConfig();

    let itemTypesOptionHtml = '';
    for (let itemName of itemTypeList.slice(6)) {
        itemTypesOptionHtml += `<option>${itemName}</option>`;
    }

    let html = `
<div class="pd_cfg_main">
  <div style="margin: 5px 0;">请选择想批量${typeName}的道具种类（按<b>Ctrl键</b>或<b>Shift键</b>可多选）：</div>
  <select name="itemTypes" size="6" style="width: 320px;" multiple>${itemTypesOptionHtml}</select>
</div>
<div class="pd_cfg_btns">
  <button name="sell" type="button">${typeName}</button>
  <button data-action="close" type="button">关闭</button>
</div>`;
    let $dialog = Dialog.create(dialogName, `批量${typeName}道具`, html);

    $dialog.find('[name="itemTypes"]').keydown(function (e) {
        if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            $(this).children().prop('selected', true);
        }
    }).end().find('[name="sell"]').click(function () {
        let typeList = $dialog.find('[name="itemTypes"]').val();
        if (!Array.isArray(typeList)) return;
        readConfig();
        if (type === 1) Config.defUseItemTypeList = typeList;
        else Config.defSellItemTypeList = typeList;
        writeConfig();
        if (!confirm(`是否${typeName}所选道具种类？`)) return;
        Dialog.close(dialogName);
        if (type === 1) useItems({typeList, safeId});
        else sellItems({typeList, safeId});
    });

    $dialog.find('[name="itemTypes"] > option').each(function () {
        let $this = $(this);
        let itemTypeList = type === 1 ? Config.defUseItemTypeList : Config.defSellItemTypeList;
        if (itemTypeList.includes($this.val())) $this.prop('selected', true);
    });

    Dialog.show(dialogName);
    Script.runFunc('Item.showBatchUseAndSellItemsDialog_after_', type);
};

/**
 * 使用道具
 * @param {string[]} typeList 想要使用的道具种类列表
 * @param {string} safeId SafeID
 * @param {boolean} nextActionEnabled 是否执行后续操作
 */
export const useItems = function ({typeList, safeId, nextActionEnabled = false}) {
    let totalSuccessNum = 0, totalValidNum = 0, totalInvalidNum = 0, index = 0;
    let useInfo = {};
    let tmpItemTypeList = [...typeList];
    let isStop = false;

    /**
     * 使用
     * @param {number} itemId 道具ID
     * @param {string} itemName 道具名称
     * @param {number} itemNum 本轮使用的道具数量
     */
    const use = function (itemId, itemName, itemNum) {
        index++;
        $.ajax({
            type: 'POST',
            url: 'kf_fw_ig_mybpdt.php',
            data: `do=1&id=${itemId}&safeid=${safeId}`,
            timeout: Const.defAjaxTimeout,
        }).done(function (html) {
            if (!html) return;
            let msg = Util.removeHtmlTag(html);
            let isDelete = false;
            if (/(成功|失败)！/.test(msg)) {
                totalSuccessNum++;
                if (!(itemName in useInfo)) useInfo[itemName] = {'道具': 0, '有效道具': 0, '无效道具': 0};
                useInfo[itemName]['道具']++;
                if (/成功！/.test(msg)) {
                    useInfo[itemName]['有效道具']++;
                    totalValidNum++;
                }
                else {
                    useInfo[itemName]['无效道具']++;
                    totalInvalidNum++;
                }
                $wait.find('.pd_countdown').text(totalSuccessNum);
                isDelete = true;
            }
            else if (msg.includes('无法再使用')) {
                index = itemNum;
                let typeIndex = tmpItemTypeList.indexOf(itemName);
                if (typeIndex > -1) tmpItemTypeList.splice(typeIndex, 1);
            }
            else if (msg.includes('错误的安全码')) {
                isStop = true;
            }
            else {
                isDelete = true;
            }

            if (isDelete) {
                $itemArea.find(`[id="wp_${itemId}"]`).fadeOut('normal', function () {
                    $(this).remove();
                });
            }
            console.log(`【Lv.${getLevelByName(itemName)}：${itemName}】 ${msg}`);
            $('.pd_result[data-name="itemResult"]:last').append(`<li>【Lv.${getLevelByName(itemName)}：${itemName}】 ${msg}</li>`);
            Script.runFunc('Item.useItems_after_', msg);
        }).fail(function () {
            $('.pd_result[data-name="itemResult"]:last').append(
                `<li>【Lv.${getLevelByName(itemName)}：${itemName}】 <span class="pd_notice">连接超时</span></li>`
            );
        }).always(function () {
            if (isStop || $wait.data('stop')) {
                complete();
            }
            else {
                if (index === itemNum) setTimeout(
                    getNextItems,
                    typeof Const.specialAjaxInterval === 'function' ? Const.specialAjaxInterval() : Const.specialAjaxInterval
                );
                else setTimeout(
                    () => $(document).dequeue('UseItems'),
                    typeof Const.specialAjaxInterval === 'function' ? Const.specialAjaxInterval() : Const.specialAjaxInterval
                );
            }
        });
    };

    /**
     * 获取当前的道具
     */
    const getCurrentItems = function () {
        let itemList = [];
        $itemArea.find('tr[id^="wp_"]').each(function () {
            let $this = $(this);
            let matches = /wp_(\d+)/.exec($this.attr('id'));
            if (!matches) return;
            let itemId = parseInt(matches[1]);
            let itemName = $this.find('> td:nth-child(3)').text().trim();
            if (tmpItemTypeList.includes(itemName)) itemList.push({itemId, itemName});
        });
        if (!itemList.length) {
            complete();
            return;
        }

        index = 0;
        $(document).clearQueue('UseItems');
        $.each(itemList, function (i, {itemId, itemName}) {
            $(document).queue('UseItems', () => use(itemId, itemName, itemList.length));
        });
        $(document).dequeue('UseItems');
    };

    /**
     * 获取下一批道具
     */
    const getNextItems = function () {
        getNextObjects(2, () => {
            if ($wait.data('stop')) complete();
            else setTimeout(getCurrentItems, Const.defAjaxInterval);
        });
    };

    /**
     * 执行后续操作
     */
    const nextAction = function () {
        let action = null;
        if (Config.sellItemsAfterOpenBoxesEnabled) {
            action = () => sellItems({typeList: Config.defSellItemTypeList, safeId, nextActionEnabled});
        }
        if (action) {
            setTimeout(action, Const.minActionInterval);
        }
        else if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
            showArmsFinalAdditionAfterOpenBoxes();
        }
    };

    /**
     * 操作完成
     */
    const complete = function () {
        $(document).clearQueue('UseItems');
        Msg.remove($wait);
        if ($.isEmptyObject(useInfo)) {
            console.log('没有道具被使用！');
            if (nextActionEnabled) nextAction();
            Script.runFunc('Item.useItems_complete_', {nextActionEnabled, $armArea});
            return;
        }

        let itemTypeNum = 0;
        let resultStat = '';
        for (let itemName of Util.getSortedObjectKeyList(typeList, useInfo)) {
            itemTypeNum++;
            let itemLevel = getLevelByName(itemName);
            let stat = useInfo[itemName];
            let successNum = stat['道具'];
            delete stat['道具'];
            if (stat['有效道具'] === 0) delete stat['有效道具'];
            if (stat['无效道具'] === 0) delete stat['无效道具'];
            if (!$.isEmptyObject(stat)) {
                resultStat += `【Lv.${itemLevel}：${itemName}】 <i>道具<ins>-${successNum}</ins></i> `;
                for (let [key, num] of Util.entries(stat)) {
                    resultStat += `<i>${key}<em>+${num}</em></i> `;
                }
                resultStat += '<br>';
                Log.push(
                    '使用道具',
                    `共有\`${successNum}\`个【\`Lv.${itemLevel}：${itemName}\`】道具被使用`,
                    {gain: stat, pay: {'道具': -successNum}}
                );
            }
        }
        $('.pd_result[data-name="itemResult"]:last').append(`
<li class="pd_stat">
  <b>统计结果（共有<em>${itemTypeNum}</em>个种类中的<em>${totalSuccessNum}</em>个道具被使用，
<i>有效道具<em>+${totalValidNum}</em></i><i>无效道具<em>+${totalInvalidNum}</em></i>）：</b><br>
  ${resultStat}
</li>`);
        console.log(`共有${itemTypeNum}个种类中的${totalSuccessNum}个道具被使用，有效道具+${totalValidNum}，无效道具+${totalInvalidNum}`);
        Msg.show(
            `<strong>共有<em>${itemTypeNum}</em>个种类中的<em>${totalSuccessNum}</em>个道具被使用</strong>` +
            `<i>有效道具<em>+${totalValidNum}</em></i><i>无效道具<em>+${totalInvalidNum}</em></i>`,
            -1
        );

        setTimeout(() => getNextObjects(2), Const.defAjaxInterval);
        if (nextActionEnabled) nextAction();
        Script.runFunc('Item.useItems_complete_', {nextActionEnabled, $armArea});
    };

    $itemArea.parent().append('<ul class="pd_result" data-name="itemResult"><li><strong>使用结果：</strong></li></ul>');
    let $wait = Msg.wait(
        '<strong>正在使用道具中&hellip;</strong><i>已使用：<em class="pd_countdown">0</em></i><a class="pd_stop_action" href="#">停止操作</a>'
    );
    getCurrentItems();
};

/**
 * 出售道具
 * @param {string[]} typeList 想要出售的道具种类列表
 * @param {string} safeId SafeID
 * @param {boolean} nextActionEnabled 是否执行后续操作
 */
export const sellItems = function ({typeList, safeId, nextActionEnabled = false}) {
    let successNum = 0, index = 0;
    let sellInfo = {};
    let isStop = false;

    /**
     * 出售
     * @param {number} itemId 道具ID
     * @param {string} itemName 道具名称
     * @param {number} itemNum 本轮出售的道具数量
     */
    const sell = function (itemId, itemName, itemNum) {
        index++;
        $.ajax({
            type: 'POST',
            url: 'kf_fw_ig_mybpdt.php',
            data: `do=2&id=${itemId}&safeid=${safeId}`,
            timeout: Const.defAjaxTimeout,
        }).done(function (html) {
            if (!html) return;
            let msg = Util.removeHtmlTag(html);
            if (msg.includes('错误的安全码')) isStop = true;
            console.log(`【Lv.${getLevelByName(itemName)}：${itemName}】 ${msg}`);
            $('.pd_result[data-name="itemResult"]:last').append(`<li>【Lv.${getLevelByName(itemName)}：${itemName}】 ${msg}</li>`);
            $itemArea.find(`[id="wp_${itemId}"]`).fadeOut('normal', function () {
                $(this).remove();
            });

            let matches = /出售该物品获得了\[\s*(\d+)\s*]KFB/.exec(msg);
            if (matches) {
                successNum++;
                if (!(itemName in sellInfo)) sellInfo[itemName] = {num: 0, sell: 0};
                sellInfo[itemName].num++;
                sellInfo[itemName].sell += parseInt(matches[1]);
                $wait.find('.pd_countdown').text(successNum);
            }
            Script.runFunc('Item.sellItems_after_', msg);
        }).fail(function () {
            $('.pd_result[data-name="itemResult"]:last').append(
                `<li>【Lv.${getLevelByName(itemName)}：${itemName}】 <span class="pd_notice">连接超时</span></li>`
            );
        }).always(function () {
            if (isStop || $wait.data('stop')) {
                complete();
            }
            else {
                if (index === itemNum) setTimeout(getNextItems, Const.minActionInterval);
                else setTimeout(() => $(document).dequeue('SellItems'), Const.minActionInterval);
            }
        });
    };

    /**
     * 获取当前的道具
     */
    const getCurrentItems = function () {
        let itemList = [];
        $itemArea.find('tr[id^="wp_"]').each(function () {
            let $this = $(this);
            let matches = /wp_(\d+)/.exec($this.attr('id'));
            if (!matches) return;
            let itemId = parseInt(matches[1]);
            let itemName = $this.find('> td:nth-child(3)').text().trim();
            if (typeList.includes(itemName)) itemList.push({itemId, itemName});
        });
        if (!itemList.length) {
            complete();
            return;
        }

        index = 0;
        $(document).clearQueue('SellItems');
        $.each(itemList, function (i, {itemId, itemName}) {
            $(document).queue('SellItems', () => sell(itemId, itemName, itemList.length));
        });
        $(document).dequeue('SellItems');
    };

    /**
     * 获取下一批道具
     */
    const getNextItems = function () {
        getNextObjects(2, () => {
            if ($wait.data('stop')) complete();
            else setTimeout(getCurrentItems, Const.defAjaxInterval);
        });
    };

    /**
     * 操作完成
     */
    const complete = function () {
        $(document).clearQueue('SellItems');
        Msg.remove($wait);
        if ($.isEmptyObject(sellInfo)) {
            console.log('没有道具被出售！');
            if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
                showArmsFinalAdditionAfterOpenBoxes();
            }
            Script.runFunc('Item.sellItems_complete_', {nextActionEnabled, $armArea});
            return;
        }

        let itemTypeNum = 0, totalSell = 0;
        let resultStat = '';
        for (let itemName of Util.getSortedObjectKeyList(typeList, sellInfo)) {
            itemTypeNum++;
            let itemLevel = getLevelByName(itemName);
            let {sell, num} = sellInfo[itemName];
            totalSell += sell;
            resultStat += `【Lv.${itemLevel}：${itemName}】 <i>道具<ins>-${num}</ins></i> <i>KFB<em>+${sell.toLocaleString()}</em></i><br>`;
            Log.push(
                '出售道具',
                `共有\`${num}\`个【\`Lv.${itemLevel}：${itemName}\`】道具出售成功`,
                {gain: {'KFB': sell}, pay: {'道具': -num}}
            );
        }
        $('.pd_result[data-name="itemResult"]:last').append(`
<li class="pd_stat">
  <b>统计结果（共有<em>${itemTypeNum}</em>个种类中的<em>${successNum}</em>个道具出售成功）：</b> <i>KFB<em>+${totalSell.toLocaleString()}</em></i><br>
  ${resultStat}
</li>`);
        console.log(`共有${itemTypeNum}个种类中的${successNum}个道具出售成功，KFB+${totalSell}`);
        Msg.show(
            `<strong>共有<em>${itemTypeNum}</em>个种类中的<em>${successNum}</em>个道具出售成功</strong><i>KFB<em>+${totalSell.toLocaleString()}</em></i>`,
            -1
        );
        setTimeout(() => getNextObjects(2), Const.defAjaxInterval);
        if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
            showArmsFinalAdditionAfterOpenBoxes();
        }
        Script.runFunc('Item.sellItems_complete_', {nextActionEnabled, $armArea});
    };

    $itemArea.parent().append(`<ul class="pd_result" data-name="itemResult"><li><strong>出售结果：</strong></li></ul>`);
    let $wait = Msg.wait(
        '<strong>正在出售道具中&hellip;</strong><i>已出售：<em class="pd_countdown">0</em></i><a class="pd_stop_action" href="#">停止操作</a>'
    );
    getCurrentItems();
};

/**
 * 购买物品
 * @param {string[]} buyItemIdList 购买物品ID列表
 */
export const buyItems = function (buyItemIdList) {
    if (new Date() < Util.getDateByTime(Config.buyItemAfterTime)) {
        $(document).dequeue('AutoAction');
        return;
    }
    let index = 0, subIndex = 0;
    let isStop = false;
    let itemIdList = [];

    /**
     * 通过物品ID获取物品名称
     * @param {number} itemId 物品ID
     * @returns {string} 物品名称
     */
    const getItemNameById = function (itemId) {
        switch (parseInt(itemId)) {
            case 101:
                return '等级经验药丸';
            case 102:
                return '等级经验药丸（蛋）';
            case 103:
                return '修炼手册';
            default:
                return '未知';
        }
    };

    /**
     * 通过物品ID获取购买物品的代价
     * @param {number} itemId 物品ID
     * @returns {?{}} 购买物品的代价
     */
    const getItemPayById = function (itemId) {
        switch (parseInt(itemId)) {
            case 101:
                return {'KFB': -5000};
            case 102:
                return {'KFB': -10000};
            case 103:
                return {'普通盒子': -100};
            default:
                return null;
        }
    };

    /**
     * 获取自动购买物品的Cookies有效期
     * @returns {Date} Cookies有效期的Date对象
     */
    const getCookieDate = function () {
        let now = new Date();
        let date = Util.getTimezoneDateByTime('00:25:00');
        if (now > date) date.setDate(date.getDate() + 1);
        return date;
    };

    /**
     * 读取购买页面信息
     */
    const readBuyInfo = function () {
        console.log('读取购买页面信息Start');
        $.ajax({
            type: 'GET',
            url: 'kf_fw_ig_shop.php?t=' + $.now(),
            timeout: Const.defAjaxTimeout,
        }).done(function (html) {
            if (Util.getCookie(Const.buyItemReadyCookieName)) {
                Msg.remove($wait);
                $(document).dequeue('AutoAction');
                return;
            }
            let matches = /safeid=(\w+)/.exec(html);
            if (matches) {
                Util.setCookie(Const.buyItemReadyCookieName, 1, Util.getDate('+5m'));
                let safeId = matches[1];
                setTimeout(() => buy(parseInt(itemIdList[index][subIndex]), safeId), Const.defAjaxInterval);
            }
            else {
                Msg.remove($wait);
                Util.setCookie(Const.buyItemCookieName, 1, Util.getDate('+15m'));
                $(document).dequeue('AutoAction');
            }
        }).fail(function () {
            setTimeout(readBuyInfo, Const.defAjaxInterval);
        });
    };

    /**
     * 购买
     * @param {number} itemId 物品ID
     * @param {string} safeId SafeID
     */
    const buy = function (itemId, safeId) {
        $.ajax({
            type: 'POST',
            url: 'kf_fw_ig_shop.php',
            data: `buy=${itemId}&safeid=${safeId}`,
            timeout: Const.defAjaxTimeout,
        }).done(function (html) {
            let msg = Util.removeHtmlTag(html);
            let itemName = getItemNameById(itemId);
            console.log(`【购买物品】【${itemName}】：${msg}`);
            let isShowMsg = false;

            if (msg.includes('购买成功')) {
                index++;
                subIndex = 0;
                let matches = /\+(\d+)(武器\/护甲经验|经验)/.exec(msg);
                if (matches) {
                    let num = parseInt(matches[1]), key = matches[2];
                    let gain = {}, pay = getItemPayById(itemId);
                    if (key === '经验') {
                        gain['经验值'] = num;
                    }
                    else {
                        gain['武器经验'] = num;
                        gain['护甲经验'] = num;
                    }
                    if (pay) {
                        Log.push('购买物品', `共有\`1\`个【\`${itemName}\`】购买成功`, {gain, pay});
                    }

                    let msgStat = '';
                    for (let [key, value] of Util.entries(gain)) {
                        msgStat += `<i>${key}<em>+${value.toLocaleString()}</em></i>`;
                    }
                    for (let [key, value] of Util.entries(pay)) {
                        msgStat += `<i>${key}<ins>${value.toLocaleString()}</ins></i>`;
                    }
                    isShowMsg = true;
                    Msg.show(`<strong>购买物品【${itemName}】${msgStat}`);
                    Script.runFunc('Item.buyItems_success_', msg);
                }
            }
            else if (msg.includes('不足')) {
                subIndex++;
                if (subIndex >= itemIdList[index].length) {
                    index++;
                    subIndex = 0;
                }
            }
            else {
                if (!msg.includes('操作过快')) {
                    index++;
                    subIndex = 0;
                }
                if (msg.includes('本日购买次数已用完')) {
                    if (index === 1) isShowMsg = true;
                    isStop = true;
                    Util.setCookie(Const.buyItemCookieName, 1, getCookieDate());
                }
            }
            if (!isShowMsg) {
                Msg.show(`<strong>购买物品【${itemName}】：${msg}</strong>`);
            }
        }).fail(function () {
            index++;
            subIndex = 0;
            Msg.show(`<strong>购买物品【${getItemNameById(itemId)}】：连接超时</strong>`);
        }).always(function () {
            isStop = isStop || $wait.data('stop');
            if (isStop || index >= itemIdList.length) {
                Msg.remove($wait);
                Util.deleteCookie(Const.buyItemReadyCookieName);
                Util.setCookie(Const.buyItemCookieName, 1, getCookieDate());
                setTimeout(() => $(document).dequeue('AutoAction'), Const.minActionInterval);
                Script.runFunc('Item.buyItems_complete_');
            }
            else {
                setTimeout(() => buy(parseInt(itemIdList[index][subIndex]), safeId), Const.minActionInterval);
            }
        });
    };


    for (let value of buyItemIdList) {
        if (!/^\d+(\|\d+)*$/.test(value)) continue;
        let arr = value.split('|').filter(id => id && getItemNameById(parseInt(id)) !== '未知');
        if (arr.length > 0) {
            itemIdList.push(arr);
        }
    }
    if (!itemIdList.length) {
        Util.setCookie(Const.buyItemCookieName, 1, getCookieDate());
        $(document).dequeue('AutoAction');
        return;
    }
    let $wait = Msg.wait(
        `<strong>正在购买物品中&hellip;</strong><i>剩余：<em class="pd_countdown">${itemIdList.length}</em></i><a class="pd_stop_action" href="#">停止操作</a>`
    );
    readBuyInfo();
};

/**
 * 在物品商店显示当前持有的KFB和贡献
 */
export const showMyInfoInItemShop = function () {
    $.get(`profile.php?action=show&uid=${Info.uid}&t=${$.now()}`, function (html) {
        let kfbMatches = /论坛货币：(\d+)\s*KFB/.exec(html);
        let gxMatches = /贡献数值：(\d+(?:\.\d+)?)/.exec(html);
        if (!kfbMatches && !gxMatches) return;
        let kfb = parseInt(kfbMatches[1]);
        let gx = parseFloat(gxMatches[1]);
        $('.kf_fw_ig_title1:eq(1)').append(`
<span style="margin-left: 7px;">(当前持有 <b style="font-size: 14px;">${kfb.toLocaleString()}</b> KFB 和 <b style="font-size: 14px;">${gx}</b> 贡献)</span>
`);
    });
};

/**
 * 在物品商店显示购买物品提示
 */
export const showBuyItemTips = function () {
    $('.kf_fw_ig1:first > tbody > tr:gt(0)').each(function (index) {
        if (index <= 1) {
            let $this = $(this);
            $this.find('td:last-child').append(`<span class="pd_cfg_tips pd_highlight" title="特别提示：
神秘系数非神秘等级，购买【等级经验药丸${index === 1 ? '（蛋）' : ''}】可能导致神秘等级下降，请知悉！
神秘等级公式：神秘系数*((神秘系数*0.5)+(贡献*5)+(KFB*0.001)+(发帖*0.01))">[?]</span>`);
        }
    });
};