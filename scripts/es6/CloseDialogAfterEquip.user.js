// ==UserScript==
// @name        更换完装备后关闭对话框
// @version     1.0
// @trigger     start
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=13799245
// @description 在争夺首页的更换装备对话框中，更换完装备后自动关闭对话框
// ==/UserScript==
'use strict';
const Dialog = require('./Dialog');
addFunc('Item.bindArmLinkClickEvent_equip_after_', function (obj) {
    if (obj.type === 1) {
        Dialog.close('pdChangeArmDialog');
    }
});