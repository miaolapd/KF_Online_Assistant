// ==UserScript==
// @name        在特殊情况下停止批量打开盒子
// @version     1.1
// @trigger     start
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=13737242
// @description 在开出指定种类的道具后停止批量打开盒子
// ==/UserScript==
'use strict';

addFunc('Item.openBoxes_success_', function (msg) {
    // 停止批量打开盒子的指定种类的道具
    var targetItemTypes = ['档案室钥匙', '整形优惠卷'];

    var matches = /打开盒子获得了道具\[\s*(.+?)\s*]/.exec(msg);
    if (matches && targetItemTypes.includes(matches[1])) {
        $('.pd_countdown:last').closest('.pd_msg').data('stop', true);
    }
});