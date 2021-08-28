// ==UserScript==
// @name        在指定时间段强制领取每日奖励
// @version     1.0
// @trigger     start
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=13401407
// @description 在指定时间段内取消“完成发言后才领取”的条件，强制领取每日奖励
// ==/UserScript==
'use strict';
(function () {
    // 强制领取时间段（本地时间），例：'20:00:00-23:59:59'
    const timeRange = '20:00:00-23:59:59';

    const Const = require('./Const').default;
    const Util = require('./Util');
    const writeConfig = require('./Config').write;
    const Public = require('./Public');
    if (!Config.autoGetDailyBonusEnabled) return;
    let enabled = !Util.isBetweenInTimeRange(new Date(), timeRange);
    if (enabled === Config.getBonusAfterSpeakCompleteEnabled) return;
    Config.getBonusAfterSpeakCompleteEnabled = enabled;
    writeConfig();
    console.log('“完成发言后才领取”条件修改为：' + enabled);
    if (!enabled) Util.deleteCookie(Const.getDailyBonusCookieName);
})();