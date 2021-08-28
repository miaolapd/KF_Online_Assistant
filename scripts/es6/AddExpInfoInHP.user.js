// ==UserScript==
// @name        在首页显示经验值信息
// @version     1.1
// @trigger     end
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=13507426
// @description 在首页的神秘等级提示框内，显示当前经验值完成度和距升级所需经验值（注：将鼠标移到经验值完成度上，会显示距升级所需经验值的提示）
// ==/UserScript==
'use strict';
(function () {
    // 经验值信息保存有效期（分钟）
    const expInfoExpires = 60;

    const Info = require('./Info').default;
    const Const = require('./Const').default;
    const Util = require('./Util');
    Const.getExpInfoCookieName = 'getExpInfo';

    const deleteCookie = () => Util.deleteCookie(Const.getExpInfoCookieName);
    addFunc('Public.getDailyBonus_after_', deleteCookie);
    addFunc('Item.buyItems_complete_', deleteCookie);
    if (location.pathname === '/kf_growup.php') deleteCookie();

    if (!Info.isInHomePage) return;

    const setExpInfo = function (percent, exp) {
        $('#pdSmLevel').append(`<span id="pdExpInfo" title="完成度${percent}%，距升级还需 ${exp.toLocaleString()} 经验值"> (<b>${percent}</b>%)</span>`);
    };

    let value = Util.getCookie(Const.getExpInfoCookieName);
    let percent, exp;
    if (value && /^-?\d+\|-?\d+$/.test(value)) {
        let arr = value.split('|');
        percent = parseInt(arr[0]);
        exp = parseInt(arr[1]);
    }

    if (isNaN(percent) || isNaN(exp)) {
        console.log('获取经验值信息Start');
        $.get('kf_growup.php?t=' + new Date().getTime(), function (html) {
            let percentMatches = /升级经验已完成 (\d+)%/.exec(html);
            let expMatches = /距离升级神秘系数还需要(\d+)成长经验值/.exec(html);
            if (percentMatches && expMatches) {
                let percent = parseInt(percentMatches[1]);
                let exp = parseInt(expMatches[1]);
                Util.setCookie(Const.getExpInfoCookieName, `${percent}|${exp}`, Util.getDate(`+${expInfoExpires}m`));
                setExpInfo(percent, exp);
            }
            else Util.setCookie(Const.getExpInfoCookieName, '-1|-1', Util.getDate('+30m'));
        });
    }
    else if (percent > 0 && exp > 0) {
        setExpInfo(percent, exp);
    }
})();