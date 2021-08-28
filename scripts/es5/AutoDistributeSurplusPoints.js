// ==UserScript==
// @name        自动分配剩余点数
// @version     1.0
// @trigger     start
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=13420207
// @description 可自动将剩余点数分配到设定的属性上
// ==/UserScript==
'use strict';
// 点数方案，自动分配剩余点数的属性请设置为'auto'（只能设置一个此类属性）
// 例：{"力量": 1, "体质": 'auto', "敏捷": 3, "灵活": 4, "智力": 5, "意志": 6}

var points = { "力量": 1, "体质": 'auto', "敏捷": 3, "灵活": 4, "智力": 5, "意志": 6 };

var Const = require('./Const').default;
Const.getCustomPoints = function (_ref) {
    var availablePoint = _ref.availablePoint;

    var otherTotalPoint = 0;
    var autoKey = '';
    $.each(points, function (key, point) {
        if (point === 'auto') {
            autoKey = key;
            return;
        }
        otherTotalPoint += point;
    });
    points[autoKey] = availablePoint - otherTotalPoint;
    return points;
};