/* 首页模块 */
'use strict';
import Info from './Info';
import * as Util from './Util';
import * as Msg from './Msg';
import Const from './Const';
import * as Log from './Log';
import * as TmpLog from './TmpLog';
import * as Loot from './Loot';

/**
 * 在神秘等级升级后进行提醒
 */
export const smLevelUpAlert = function () {
    let smLevel = parseInt($('#pdSmLevel').data('sm-level'));
    if (!smLevel) return;

    /**
     * 写入神秘等级数据
     * @param {number} smLevel 神秘等级
     */
    const writeData = function (smLevel) {
        TmpLog.setValue(Const.smLevelUpTmpLogName, {time: $.now(), smLevel});
    };

    let data = TmpLog.getValue(Const.smLevelUpTmpLogName);
    if (!data || $.type(data.time) !== 'number' || $.type(data.smLevel) !== 'number') {
        writeData(smLevel);
    }
    else if (smLevel > data.smLevel) {
        let diff = Math.floor(($.now() - data.time) / 60 / 60 / 1000);
        if (diff >= Const.smLevelUpAlertInterval) {
            let date = new Date(data.time);
            writeData(smLevel);
            Log.push(
                '神秘等级升级',
                `自\`${Util.getDateString(date)}\`以来，你的神秘等级共上升了\`${smLevel - data.smLevel}\`级 (Lv.\`${data.smLevel}\`->Lv.\`${smLevel}\`)`
            );
            Msg.show(`自<em>${Util.getDateString(date)}</em>以来，你的神秘等级共上升了<em>${smLevel - data.smLevel}</em>级`);
        }
        else if (diff < 0) {
            writeData(smLevel);
        }
    }
    else if (smLevel < data.smLevel) {
        writeData(smLevel);
    }
};

/**
 * 在神秘系数排名发生变化时进行提醒
 */
export const smRankChangeAlert = function () {
    let smRank = $('#pdSmLevel').data('sm-rank');
    if (!smRank || smRank.toString().endsWith('+')) return;
    smRank = parseInt(smRank);

    /**
     * 写入神秘系数排名数据
     * @param {number} smRank 神秘系数排名
     */
    const writeData = smRank => TmpLog.setValue(Const.smRankChangeTmpLogName, {time: $.now(), smRank});

    let data = TmpLog.getValue(Const.smRankChangeTmpLogName);
    if (!data || $.type(data.time) !== 'number' || $.type(data.smRank) !== 'number') {
        writeData(smRank);
    }
    else if (smRank !== data.smRank) {
        let diff = Math.floor(($.now() - data.time) / 60 / 60 / 1000);
        if (diff >= Const.smRankChangeAlertInterval) {
            let date = new Date(data.time);
            let isUp = smRank < data.smRank;
            writeData(smRank);
            Log.push(
                '神秘系数排名变化',
                `自\`${Util.getDateString(date)}\`以来，你的神秘系数排名共\`${isUp ? '上升' : '下降'}\`了\`${Math.abs(smRank - data.smRank)}\`名 ` +
                `(No.\`${data.smRank}\`->No.\`${smRank}\`)`
            );
            Msg.show(
                `自<em>${Util.getDateString(date)}</em>以来，你的神秘系数排名共<b style="color: ${isUp ? '#F00' : '#393'}">${isUp ? '上升' : '下降'}</b>了` +
                `<em>${Math.abs(smRank - data.smRank)}</em>名`
            );
        }
        else if (diff < 0) {
            writeData(smRank);
        }
    }
};

/**
 * 在首页帖子链接旁添加快速跳转至页末的链接
 */
export const addThreadFastGotoLink = function () {
    $('#alldiv > .drow:last-child').on('mouseenter', 'li.indexlbtit2 > a, li.rightlbtit > a', function () {
        let $this = $(this);
        $this.css('position', 'relative').prepend(`<a class="pd_thread_goto" href="${$this.attr('href')}&page=e#a"></a>`);
    }).on('mouseleave', 'li.indexlbtit2 > a, li.rightlbtit > a', function () {
        $(this).css('position', 'static').find('.pd_thread_goto').remove();
    });
};

/**
 * 添加提升战力光环间隔时间
 */
export const addPromoteHaloInterval = function () {
    let nextTime = parseInt(Util.getCookie(Const.promoteHaloCookieName));
    if (!nextTime) return;
    let interval = nextTime - $.now();
    if (interval > 0) {
        let minutes = Math.ceil(interval / 60 / 1000);
        let hours = Math.floor(minutes / 60);
        minutes -= hours * 60;
        $('#pdLoot').append(`<span id="pdHaloInterval"> (光环：${hours > 0 ? hours + '时' : ''}${minutes}分)</span>`);
    }
};