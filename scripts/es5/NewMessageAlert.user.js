// ==UserScript==
// @name        显示新短消息通知
// @version     1.2
// @trigger     end
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=13137937
// @description 当收到新短消息时，可在页面右下角或中央进行更加醒目的提示（注：选择使用HTML5 Notification API进行通知的话，需要允许接受网站通知）
// ==/UserScript==
'use strict';

(function () {
    // 通知类型，1：使用HTML5 Notification API在屏幕右下角进行通知；2：使用KFOL助手的显示消息在屏幕中央进行通知
    var type = 1;

    var Info = require('./Info').default;
    var Msg = require('./Msg');
    if (location.pathname === '/message.php') return;
    if (!Info.$userMenu.find('a[href="message.php"]:contains("有新消息")').length) return;
    if (type === 2) {
        Msg.show('<strong>你有新的短消息</strong><a href="message.php">点击查看</a>');
    } else {
        if ('Notification' in window && Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission === 'granted') {
                    var notification = new Notification('【绯月Galgame】', { body: '你有新的短消息' });
                    notification.onclick = function (e) {
                        e.preventDefault();
                        window.open('message.php');
                        notification.close();
                    };
                }
            });
        }
    }
})();