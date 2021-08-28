/* 日志对话框模块 */
'use strict';
import * as Util from './Util';
import * as Dialog from './Dialog';
import {
    read as readConfig,
    write as writeConfig,
} from './Config';
import * as Log from './Log';
import * as Item from './Item';
import * as Read from './Read';
import * as Script from './Script';

/**
 * 显示日志对话框
 */
export const show = function () {
    const dialogName = 'pdLogDialog';
    if ($('#' + dialogName).length > 0) return;
    readConfig();
    Script.runFunc('LogDialog.show_before_');
    let html = `
<div class="pd_cfg_main">
  <div class="pd_log_nav">
    <a class="pd_disabled_link" data-name="start" href="#">&lt;&lt;</a>
    <a class="pd_disabled_link" data-name="prev" href="#" style="padding: 0 7px;">&lt;</a>
    <h2 class="pd_log_date pd_custom_tips">暂无日志</h2>
    <a class="pd_disabled_link" data-name="next" href="#" style="padding: 0 7px;">&gt;</a>
    <a class="pd_disabled_link" data-name="end" href="#">&gt;&gt;</a>
  </div>
  <fieldset>
    <legend>日志内容</legend>
    <div>
      <strong>排序方式：</strong>
      <label title="按时间顺序排序"><input type="radio" name="sortType" value="time" checked> 按时间</label>
      <label title="按日志类别排序"><input type="radio" name="sortType" value="type"> 按类别</label>
    </div>
    <div class="pd_stat pd_log_content">暂无日志</div>
  </fieldset>
  <fieldset>
    <legend>统计结果</legend>
    <div>
      <strong>统计范围：</strong>
      <label title="显示当天的统计结果"><input type="radio" name="statType" value="current" checked> 当天</label>
      <label title="显示距该日N天内的统计结果"><input type="radio" name="statType" value="custom"></label>
      <label title="显示距该日N天内的统计结果"><input name="statDays" type="text" style="width: 22px;" maxlength="3"> 天内</label>
      <label title="显示全部统计结果"><input type="radio" name="statType" value="all"> 全部</label>
    </div>
    <div class="pd_stat" data-name="stat">暂无日志</div>
  </fieldset>
</div>
<div class="pd_cfg_btns">
  <span class="pd_cfg_about">
    <a class="pd_btn_link" data-name="openImOrExLogDialog" href="#">导入/导出日志</a>
    <a class="pd_btn_link" data-name="openBuyThreadLogDialog" href="#">查看购买帖子记录</a>
  </span>
  <button data-action="close" type="button">关闭</button>
  <button name="clear" type="button">清除日志</button>
</div>`;
    let $dialog = Dialog.create(dialogName, 'KFOL助手日志', html, 'width: 880px;');
    let $logNav = $dialog.find('.pd_log_nav');

    let log = Log.read();
    let dateList = [];
    let curIndex = 0;
    if (!$.isEmptyObject(log)) {
        dateList = Util.getObjectKeyList(log, 1);
        curIndex = dateList.length - 1;
        $logNav.find('.pd_log_date').attr('title', `总共记录了${dateList.length}天的日志`).text(dateList[curIndex]);
        if (dateList.length > 1) {
            $logNav.find('[data-name="start"]').attr('title', dateList[0]).removeClass('pd_disabled_link');
            $logNav.find('[data-name="prev"]').attr('title', dateList[curIndex - 1]).removeClass('pd_disabled_link');
        }
    }
    $logNav.on('click', 'a[data-name]', function (e) {
        e.preventDefault();
        let $this = $(this);
        if ($this.hasClass('pd_disabled_link')) return;
        let name = $this.data('name');
        if (name === 'start') {
            curIndex = 0;
        }
        else if (name === 'prev') {
            if (curIndex > 0) curIndex--;
            else return;
        }
        else if (name === 'next') {
            if (curIndex < dateList.length - 1) curIndex++;
            else return;
        }
        else if (name === 'end') {
            curIndex = dateList.length - 1;
        }
        $logNav.find('.pd_log_date').text(dateList[curIndex]);
        showLogContent(log, dateList[curIndex], $dialog);
        showLogStat(log, dateList[curIndex], $dialog);
        if (curIndex > 0) {
            $logNav.find('[data-name="start"]').attr('title', dateList[0]).removeClass('pd_disabled_link');
            $logNav.find('[data-name="prev"]').attr('title', dateList[curIndex - 1]).removeClass('pd_disabled_link');
        }
        else {
            $logNav.find('[data-name="start"], [data-name="prev"]').removeAttr('title').addClass('pd_disabled_link');
        }
        if (curIndex < dateList.length - 1) {
            $logNav.find('[data-name="next"]').attr('title', dateList[curIndex + 1]).removeClass('pd_disabled_link');
            $logNav.find('[data-name="end"]').attr('title', dateList[dateList.length - 1]).removeClass('pd_disabled_link');
        }
        else {
            $logNav.find('[data-name="next"], [data-name="end"]').removeAttr('title').addClass('pd_disabled_link');
        }
    });

    $dialog.find('[name="sortType"]').click(function () {
        let value = $(this).val();
        if (Config.logSortType !== value) {
            Config.logSortType = value;
            writeConfig();
            showLogContent(log, dateList[curIndex], $dialog);
        }
    }).end().find('[name="statType"]').click(function () {
        let value = $(this).val();
        if (Config.logStatType !== value) {
            Config.logStatType = value;
            writeConfig();
            showLogStat(log, dateList[curIndex], $dialog);
        }
    }).end().find('[name="statDays"]').keyup(function () {
        let days = parseInt($(this).val());
        if (days > 0 && Config.logStatDays !== days) {
            Config.logStatDays = days;
            writeConfig();
            $dialog.find('[name="statType"][value="custom"]:not(:checked)').click();
            showLogStat(log, dateList[curIndex], $dialog);
        }
    }).end().find(`[name="sortType"][value="${Config.logSortType}"]`).click()
        .end().find(`[name="statType"][value="${Config.logStatType}"]`).click()
        .end().find('[name="statDays"]').val(Config.logStatDays);

    $dialog.find('[name="clear"]').click(function (e) {
        e.preventDefault();
        if (confirm('是否清除所有日志？')) {
            Log.clear();
            alert('日志已清除');
            location.reload();
        }
    }).end().find('[data-name="openImOrExLogDialog"]').click(function (e) {
        e.preventDefault();
        showImportOrExportLogDialog();
    }).end().find('[data-name="openBuyThreadLogDialog"]').click(function (e) {
        e.preventDefault();
        Read.showBuyThreadLogDialog();
    });

    showLogContent(log, dateList[curIndex], $dialog);
    showLogStat(log, dateList[curIndex], $dialog);

    if ($(window).height() <= 750) $dialog.find('.pd_log_content').css('height', '192px');
    Dialog.show(dialogName);
    Script.runFunc('LogDialog.show_after_');
};

/**
 * 显示指定日期的日志内容
 * @param {{}} log 日志对象
 * @param {string} date 日志对象关键字
 * @param {jQuery} $dialog 日志对话框对象
 */
const showLogContent = function (log, date, $dialog) {
    if (!Array.isArray(log[date])) return;
    $dialog.find('.pd_log_content').html(getLogContent(log, date, Config.logSortType))
        .parent().find('legend:first-child').text(`日志内容 (共${log[date].length}项)`);
};

/**
 * 获取指定日期的日志内容
 * @param {{}} log 日志对象
 * @param {string} date 日志对象关键字
 * @param {string} logSortType 日志内容的排序方式
 * @returns {string} 指定日期的日志内容
 */
const getLogContent = function (log, date, logSortType) {
    let logList = log[date];
    if (logSortType === 'type') {
        const sortTypeList = ['领取每日奖励', '提升战力光环', '争夺攻击', '捐款', '领取争夺奖励', '批量攻击', '试探攻击', '抽取神秘盒子', '抽取道具或卡片',
            '打开盒子', '购买物品', '使用道具', '恢复道具', '循环使用道具', '将道具转换为能量', '将卡片转换为VIP时间', '购买道具', '统计道具购买价格',
            '出售道具', '熔炼装备', '神秘抽奖', '统计神秘抽奖结果', '神秘等级升级', '神秘系数排名变化', '批量转账', '购买帖子', '自动存款'];
        logList.sort((a, b) => sortTypeList.indexOf(a.type) > sortTypeList.indexOf(b.type) ? 1 : -1);
    }
    else {
        logList.sort((a, b) => a.time > b.time ? 1 : -1);
    }

    let content = '', curType = '';
    for (let {time, type, action, gain, pay} of logList) {
        if (typeof time === 'undefined' || typeof type === 'undefined' || typeof action === 'undefined') continue;
        let d = new Date(time);
        if (logSortType === 'type') {
            if (curType !== type) {
                content += `<h3>【${type}】</h3>`;
                curType = type;
            }
            content += `<p><b>${Util.getTimeString(d)}：</b>${action.replace(/`([^`]+?)`/g, '<b style="color: #f00;">$1</b>')}`;
        }
        else {
            content += `<p><b>${Util.getTimeString(d)} (${type})：</b>${action.replace(/`([^`]+?)`/g, '<b style="color: #f00;">$1</b>')}`;
        }

        let stat = '';
        if ($.type(gain) === 'object' && !$.isEmptyObject(gain)) {
            stat += '，';
            for (let k of Object.keys(gain)) {
                if (k === 'item') {
                    for (let name of Util.getSortedObjectKeyList(Item.itemTypeList, gain[k])) {
                        stat += `<i>${name}<em>+${gain[k][name].toLocaleString()}</em></i> `;
                    }
                }
                else if (k === 'arm') {
                    for (let name of Util.getSortedObjectKeyList(Item.armTypeList, gain[k])) {
                        stat += `<i>${name}<em>+${gain[k][name].toLocaleString()}</em></i> `;
                    }
                }
                else if (k === 'box') {
                    for (let name of Util.getSortedObjectKeyList(Item.boxTypeList, gain[k])) {
                        stat += `<i>${name}<em>+${gain[k][name].toLocaleString()}</em></i> `;
                    }
                }
                else {
                    stat += `<i>${k}<em>+${gain[k].toLocaleString()}</em></i> `;
                }
            }
        }
        if ($.type(pay) === 'object' && !$.isEmptyObject(pay)) {
            if (!stat) stat += '，';
            for (let k of Object.keys(pay)) {
                if (k === 'item') {
                    for (let itemName of Object.keys(pay[k])) {
                        stat += `<i>${itemName}<ins>${pay[k][itemName].toLocaleString()}</ins></i> `;
                    }
                }
                else {
                    stat += `<i>${k}<ins>${pay[k].toLocaleString()}</ins></i> `;
                }
            }
        }

        content += stat + '</p>';
    }

    return content;
};

/**
 * 显示指定日期的日志统计结果
 * @param {{}} log 日志对象
 * @param {string} date 日志对象关键字
 * @param {jQuery} $dialog 日志对话框对象
 */
const showLogStat = function (log, date, $dialog) {
    if (!Array.isArray(log[date])) return;
    $dialog.find('[data-name="stat"]').html(getLogStat(log, date, Config.logStatType));
};

/**
 * 获取指定日期的日志统计结果
 * @param {{}} log 日志对象
 * @param {string} date 日志对象关键字
 * @param {string} logStatType 日志统计范围类型
 * @returns {string} 指定日期的日志统计结果
 */
const getLogStat = function (log, date, logStatType) {
    let rangeLog = {};

    if (logStatType === 'custom') {
        let minDate = new Date(date);
        minDate.setDate(minDate.getDate() - Config.logStatDays + 1);
        minDate = Util.getDateString(minDate);
        for (let d of Util.getObjectKeyList(log, 1)) {
            if (d >= minDate && d <= date) rangeLog[d] = log[d];
        }
    }
    else if (logStatType === 'all') {
        rangeLog = log;
    }
    else {
        rangeLog[date] = log[date];
    }

    let income = {}, expense = {}, profit = {};
    let lootCount = 0, lootLevelStat = {total: 0, min: 0, max: 0}, lootBoxTotalNum = 0, lootBoxStat = {};
    let boxTotalNum = 0, boxStat = {}, boxGain = {'KFB': 0, '经验值': 0, '道具': 0, '装备': 0, item: {}, arm: {}},
        boxRandomTotalNum = 0, boxRandomTotalCount = 0;
    let validItemNum = 0, validItemStat = {}, invalidItemNum = 0, invalidItemStat = {};
    let invalidKeyList = [
        'item', 'arm', 'box', '夺取KFB', 'VIP小时', '神秘', '燃烧伤害', '命中', '闪避', '暴击比例', '暴击几率', '防御', '有效道具', '无效道具',
        '长剑经验', '短弓经验', '法杖经验'
    ];
    for (let d in rangeLog) {
        for (let {type, action, gain, pay, notStat} of rangeLog[d]) {
            if (typeof type === 'undefined' || typeof notStat !== 'undefined') continue;
            if ($.type(gain) === 'object') {
                for (let k of Object.keys(gain)) {
                    if (invalidKeyList.includes(k)) continue;
                    if (typeof income[k] === 'undefined') income[k] = gain[k];
                    else income[k] += gain[k];
                }
            }
            if ($.type(pay) === 'object') {
                for (let k of Object.keys(pay)) {
                    if (invalidKeyList.includes(k)) continue;
                    if (typeof expense[k] === 'undefined') expense[k] = pay[k];
                    else expense[k] += pay[k];
                }
            }

            if (type === '争夺攻击' && $.type(gain) === 'object') {
                let matches = /第`(\d+)`层/.exec(action);
                if (matches) {
                    lootCount++;
                    let level = parseInt(matches[1]);
                    lootLevelStat.total += level;
                    if (lootLevelStat.max < level) lootLevelStat.max = level;
                    if (!lootLevelStat.min || lootLevelStat.min > level) lootLevelStat.min = level;
                    if ($.type(gain['box']) === 'object') {
                        for (let [key, num] of Util.entries(gain['box'])) {
                            lootBoxTotalNum += num;
                            if (!(key in lootBoxStat)) lootBoxStat[key] = {total: 0, min: -1, max: -1};
                            lootBoxStat[key].total += num;
                            if (lootBoxStat[key].max < num) lootBoxStat[key].max = num;
                            if (lootBoxStat[key].min < 0 || lootBoxStat[key].min > num) lootBoxStat[key].min = num;
                        }
                        for (let key of Item.boxTypeList) {
                            if (!(key in gain['box']) && (key in lootBoxStat)) lootBoxStat[key].min = 0;
                        }
                    }
                }
            }
            else if (type === '打开盒子' && $.type(gain) === 'object' && $.type(pay) === 'object') {
                let matches = /【`(.+?)`】打开成功/.exec(action);
                if (!matches) continue;
                let boxType = matches[1];
                let boxNum = Math.abs(pay['盒子']);
                boxTotalNum += boxNum;
                if (!(boxType in boxStat)) boxStat[boxType] = 0;
                boxStat[boxType] += Math.abs(pay['盒子']);

                let randomMatches = /平均随机值【`([\d\.]+)`】/.exec(action);
                if (randomMatches) {
                    boxRandomTotalCount += boxNum;
                    boxRandomTotalNum += parseFloat(randomMatches[1]) * boxNum;
                }

                for (let [key, value] of Util.entries(gain)) {
                    if (!(key in boxGain)) continue;
                    if ($.type(value) === 'object') {
                        for (let [name, num] of Util.entries(value)) {
                            if (!(name in boxGain[key])) boxGain[key][name] = 0;
                            boxGain[key][name] += num;
                        }
                    }
                    else {
                        boxGain[key] += value;
                    }
                }
            }
            else if ((type === '使用道具' || type === '循环使用道具') && $.type(gain) === 'object') {
                let matches = /【`Lv.(\d+)：(.+?)`】/.exec(action);
                if (matches) {
                    let itemLevel = parseInt(matches[1]);
                    if (itemLevel < 3) continue;
                    let itemName = matches[2];
                    if (gain['有效道具'] > 0) {
                        validItemNum += gain['有效道具'];
                        if (typeof validItemStat[itemName] === 'undefined') validItemStat[itemName] = 0;
                        validItemStat[itemName] += gain['有效道具'];
                    }
                    if (gain['无效道具'] > 0) {
                        invalidItemNum += gain['无效道具'];
                        if (typeof invalidItemStat[itemName] === 'undefined') invalidItemStat[itemName] = 0;
                        invalidItemStat[itemName] += gain['无效道具'];
                    }
                }
            }
        }
    }

    let content = '';
    let sortStatTypeList = ['KFB', '经验值', '贡献', '转账额度', '盒子', '道具', '已使用道具', '装备', '武器经验', '护甲经验', '项链经验', '能量', '卡片'];
    content += '<strong>收获：</strong>';
    for (let key of Util.getSortedObjectKeyList(sortStatTypeList, income)) {
        profit[key] = income[key];
        content += `<i>${key}<em>+${income[key].toLocaleString()}</em></i> `;
    }
    content += '<br><strong>付出：</strong>';
    for (let key of Util.getSortedObjectKeyList(sortStatTypeList, expense)) {
        if (typeof profit[key] === 'undefined') profit[key] = expense[key];
        else profit[key] += expense[key];
        content += `<i>${key}<ins>${expense[key].toLocaleString()}</ins></i> `;
    }
    content += '<br><strong>结余：</strong>';
    for (let key of Util.getSortedObjectKeyList(sortStatTypeList, profit)) {
        content += `<i>${key}${Util.getStatFormatNumber(profit[key])}</i> `;
    }

    content += '<div style="margin: 5px 0; border-bottom: 1px dashed #ccccff;"></div>';
    content += `\n<strong>争夺攻击统计：</strong><i>次数<em>+${lootCount}</em></i> `;
    if (lootCount > 0) {
        content += `<i>层数<span class="pd_stat_extra">(<em title="平均值">+${(lootLevelStat.total / lootCount).toFixed(2)}</em>|` +
            `<em title="最小值">+${lootLevelStat.min}</em>|<em title="最大值">+${lootLevelStat.max}</em>)</span></i> `;
        content += `<i>盒子<em>+${lootBoxTotalNum.toLocaleString()}</em></i> `;
        for (let key of Util.getSortedObjectKeyList(Item.boxTypeList, lootBoxStat)) {
            if (!lootBoxStat[key].total) continue;
            content += `<i>${key}<em>+${lootBoxStat[key].total.toLocaleString()}</em>` +
                `<span class="pd_stat_extra">(<em title="平均值">+${(lootBoxStat[key].total / lootCount).toFixed(2)}</em>|` +
                `<em title="最小值">+${lootBoxStat[key].min}</em>|<em title="最大值">+${lootBoxStat[key].max}</em>)</span></i> `;
        }
    }

    let boxStatContent = '';
    for (let boxType of Util.getSortedObjectKeyList(Item.boxTypeList, boxStat)) {
        if (boxStatContent) boxStatContent += '|';
        boxStatContent += `<ins title="${boxType}">-${boxStat[boxType].toLocaleString()}</ins>`;
    }
    content += `<br><strong>盒子收获统计：</strong><i>盒子<ins>-${boxTotalNum}</ins>` +
        `${boxStatContent ? `<span class="pd_stat_extra">(${boxStatContent})</span>` : ''}</i> `;
    if (boxRandomTotalCount > 0) {
        content += `<i>平均随机值<em>+${Util.getFixedNumLocStr(boxRandomTotalNum / boxRandomTotalCount, 2)}</em></i> `;
    }
    if (boxTotalNum > 0) {
        for (let [key, value] of Util.entries(boxGain)) {
            if (!value || ($.type(value) === 'object' && $.isEmptyObject(value))) continue;
            if ($.type(value) === 'object') {
                let typeList = key === 'item' ? Item.itemTypeList : Item.armTypeList;
                for (let name of Util.getSortedObjectKeyList(typeList, value)) {
                    content += `<i>${name}<em>+${value[name].toLocaleString()}</em></i> `;
                }
            }
            else {
                content += `<i>${key}<span class="pd_stat_extra"><em>+${value.toLocaleString()}</em>` +
                    `(<em title="平均值">+${Util.getFixedNumLocStr(value / boxTotalNum, 2).toLocaleString()}</em>)</span></i> `
            }
        }
    }

    content += `<br><strong>有效道具统计：</strong><i>有效道具<em>+${validItemNum.toLocaleString()}</em></i> `;
    for (let itemName of Util.getSortedObjectKeyList(Item.itemTypeList, validItemStat)) {
        content += `<i>${itemName}<em>+${validItemStat[itemName].toLocaleString()}</em></i> `;
    }
    content += `<br><strong>无效道具统计：</strong><i>无效道具<em>+${invalidItemNum.toLocaleString()}</em></i> `;
    for (let itemName of Util.getSortedObjectKeyList(Item.itemTypeList, invalidItemStat)) {
        content += `<i>${itemName}<em>+${invalidItemStat[itemName].toLocaleString()}</em></i> `;
    }

    return content;
};

/**
 * 显示导入或导出日志对话框
 */
const showImportOrExportLogDialog = function () {
    const dialogName = 'pdImOrExLogDialog';
    if ($('#' + dialogName).length > 0) return;
    let log = Log.read();
    let html = `
<div class="pd_cfg_main">
  <div style="margin-top: 5px;">
    <label style="color: #f00;"><input type="radio" name="logType" value="setting" checked> 导入/导出日志</label>
    <label style="color: #00f;"><input type="radio" name="logType" value="text"> 导出日志文本</label>
  </div>
  <div data-name="logSetting">
    <strong>导入日志：</strong>将日志内容粘贴到文本框中并点击合并或覆盖按钮即可<br>
    <strong>导出日志：</strong>复制文本框里的内容并粘贴到别处即可<br>
    <textarea name="setting" style="width: 600px; height: 400px; word-break: break-all;"></textarea>
  </div>
  <div data-name="logText" style="display: none;">
    <strong>导出日志文本</strong>：复制文本框里的内容并粘贴到别处即可
    <div>
      <label title="按时间顺序排序"><input type="radio" name="sortType2" value="time" checked> 按时间</label>
      <label title="按日志类别排序"><input type="radio" name="sortType2" value="type"> 按类别</label>
      <label title="在日志文本里显示每日以及全部数据的统计结果"><input type="checkbox" name="showStat" checked> 显示统计</label>
    </div>
    <textarea name="text" style="width: 600px; height: 400px;" readonly></textarea>
  </div>
</div>
<div class="pd_cfg_btns">
  <button name="merge" type="button">合并日志</button>
  <button name="overwrite" type="button" style="color: #f00;">覆盖日志</button>
  <button data-action="close" type="button">关闭</button>
</div>`;

    let $dialog = Dialog.create(dialogName, '导入或导出日志', html);
    $dialog.find('[name="sortType2"], [name="showStat"]').click(function () {
        showLogText(log, $dialog);
        $dialog.find('[name="text"]').select();
    }).end().find('[name="logType"]').click(function () {
        let type = $(this).val();
        $dialog.find(`[data-name="log${type === 'text' ? 'Setting' : 'Text'}"]`).hide();
        $dialog.find(`[data-name="log${type === 'text' ? 'Text' : 'Setting'}"]`).show();
        $dialog.find(`[data-name="log${type === 'text' ? 'Text' : 'Setting'}"]`).select();
    }).end().find('[name="merge"], [name="overwrite"]').click(function (e) {
        e.preventDefault();
        let name = $(this).attr('name');
        if (!confirm(`是否将文本框中的日志${name === 'overwrite' ? '覆盖' : '合并'}到本地日志？`)) return;
        let newLog = $.trim($dialog.find('[name="setting"]').val());
        if (!newLog) return;
        try {
            newLog = JSON.parse(newLog);
        }
        catch (ex) {
            alert('日志有错误');
            return;
        }
        if (!newLog || $.type(newLog) !== 'object') {
            alert('日志有错误');
            return;
        }
        if (name === 'merge') log = Log.getMergeLog(log, newLog);
        else log = newLog;
        Log.write(log);
        alert('日志已导入');
        location.reload();
    });

    Dialog.show(dialogName);
    $dialog.find(`[name="sortType2"][value="${Config.logSortType}"]`).prop('checked', true).triggerHandler('click');
    $dialog.find('[name="setting"]').val(JSON.stringify(log)).select().focus();
    Script.runFunc('LogDialog.showImportOrExportLogDialog_after_');
};

/**
 * 显示日志文本
 * @param {{}} log 日志对象
 * @param {jQuery} $dialog 导入或导出日志对话框对象
 */
const showLogText = function (log, $dialog) {
    let logSortType = $dialog.find('input[name="sortType2"]:checked').val();
    let isShowStat = $dialog.find('[name="showStat"]').prop('checked');
    let content = '', lastDate = '';
    for (let date of Object.keys(log)) {
        if (!Array.isArray(log[date])) continue;
        if (lastDate > date) lastDate = date;
        content += `【${date}】(共${log[date].length}项)\n${logSortType === 'type' ? '' : '\n'}` +
            getLogContent(log, date, logSortType)
                .replace(/<h3>/g, '\n')
                .replace(/<\/h3>/g, '\n')
                .replace(/<\/p>/g, '\n')
                .replace(/(<.+?>|<\/.+?>)/g, '')
                .replace(/`/g, '');
        if (isShowStat) {
            content += `${'-'.repeat(46)}\n合计：\n${getLogStat(log, date, 'current')
                .replace(/<br\s*\/?>/g, '\n')
                .replace(/(<.+?>|<\/.+?>)/g, '')}\n`;
        }
        content += '='.repeat(46) + '\n';
    }
    if (content && isShowStat) {
        content += '\n总计：\n' + getLogStat(log, lastDate, 'all').replace(/<br\s*\/?>/g, '\n').replace(/(<.+?>|<\/.+?>)/g, '');
    }
    $dialog.find('[name="text"]').val(content);
};
