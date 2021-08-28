// ==UserScript==
// @name        在被击败后修改点数分配方案
// @version     1.1
// @trigger     start
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=13737219
// @description 当被击败后还有剩余改点次数的情况下修改点数分配方案
// ==/UserScript==
'use strict';

addFunc('Loot.lootAttack_complete_', function () {
    // 修改类型，targetLevel：修改为第N层的点数分配方案；manual：手动设定点数分配方案
    var type = 'targetLevel';
    // 修改为第N层的点数分配方案
    var targetLevel = 1;
    // 手动设定的点数分配方案
    var points = { "力量": 16, "体质": 19, "敏捷": 432, "灵活": 1, "智力": 300, "意志": 12, "武器ID": 1429379, "武器备注": "传奇的法杖", "护甲ID": 2572888, "护甲备注": "传奇的皮甲" };

    var Msg = require('./Msg');
    var Loot = require('./Loot');

    var _Loot$getLootInfo = Loot.getLootInfo(),
        changePointsAvailableCount = _Loot$getLootInfo.changePointsAvailableCount;

    if (!changePointsAvailableCount) return;
    var $wait = Msg.wait('<strong>正在修改点数分配方案&hellip;</strong>');
    if (type === 'manual') {
        var $points = $('#wdsx');
        $.each(points, function (key, value) {
            $points.find('input[name="' + Loot.getFieldNameByPointName(key) + '"]').val(value).trigger('change');
        });
    } else {
        $('#pdLevelPointListSelect').val(targetLevel).trigger('change');
    }
    Loot.changePointsAndArms(type === 'manual' ? -1 : targetLevel, function (result) {
        if (result === 'success') {
            Loot.updateLootInfo(function () {
                Msg.remove($wait);
                Msg.show('<strong>已成功修改为所设定的点数分配方案</strong>', -1);
            });
        } else {
            Msg.remove($wait);
        }
    });
});