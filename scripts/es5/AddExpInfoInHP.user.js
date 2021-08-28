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
    var expInfoExpires = 60;

    var Info = require('./Info').default;
    var Const = require('./Const').default;
    var Util = require('./Util');
    Const.getExpInfoCookieName = 'getExpInfo';

    var deleteCookie = function deleteCookie() {
        return Util.deleteCookie(Const.getExpInfoCookieName);
    };
    addFunc('Public.getDailyBonus_after_', deleteCookie);
    addFunc('Item.buyItems_complete_', deleteCookie);
    if (location.pathname === '/kf_growup.php') deleteCookie();

    if (!Info.isInHomePage) return;

    var setExpInfo = function setExpInfo(percent, exp) {
        $('#pdSmLevel').append('<span id="pdExpInfo" title="\u5B8C\u6210\u5EA6' + percent + '%\uFF0C\u8DDD\u5347\u7EA7\u8FD8\u9700 ' + exp.toLocaleString() + ' \u7ECF\u9A8C\u503C"> (<b>' + percent + '</b>%)</span>');
    };

    var value = Util.getCookie(Const.getExpInfoCookieName);
    var percent = void 0,
        exp = void 0;
    if (value && /^-?\d+\|-?\d+$/.test(value)) {
        var arr = value.split('|');
        percent = parseInt(arr[0]);
        exp = parseInt(arr[1]);
    }

    if (isNaN(percent) || isNaN(exp)) {
        console.log('获取经验值信息Start');
        $.get('kf_growup.php?t=' + new Date().getTime(), function (html) {
            var percentMatches = /升级经验已完成 (\d+)%/.exec(html);
            var expMatches = /距离升级神秘系数还需要(\d+)成长经验值/.exec(html);
            if (percentMatches && expMatches) {
                var _percent = parseInt(percentMatches[1]);
                var _exp = parseInt(expMatches[1]);
                Util.setCookie(Const.getExpInfoCookieName, _percent + '|' + _exp, Util.getDate('+' + expInfoExpires + 'm'));
                setExpInfo(_percent, _exp);
            } else Util.setCookie(Const.getExpInfoCookieName, '-1|-1', Util.getDate('+30m'));
        });
    } else if (percent > 0 && exp > 0) {
        setExpInfo(percent, exp);
    }
})();