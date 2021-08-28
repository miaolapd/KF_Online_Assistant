// ==UserScript==
// @name        自定义争夺点数分配方案参考范例
// @version     1.7
// @trigger     start
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=13270735
// @description 此为自定义争夺点数分配方案的参考范例，请有能力的用户按照自己的需求自行编写，请勿直接使用该脚本
// ==/UserScript==
'use strict';

var Const = require('./Const').default;

/**
 * 获取自定义争夺点数分配方案
 * @param {{}} data 参数对象
 * @param {number} data.currentLevel 当前层数（注：当前是指修改点数之前所在的层数，下同）
 * @param {number} data.currentLife 当前剩余生命值
 * @param {number} data.currentInitLife 当前层数的初始生命值
 * @param {{}} data.levelPointList 用户设置的各层点数分配方案
 * @param {number} data.availablePoint 可分配属性点
 * @param {{}} data.propertyList 当前争夺属性列表
 * @param {{}} data.haloInfo 光环信息
 * @param {{}} data.extraPointsList 额外点数列表
 * @param {Map} data.itemUsedNumList 道具使用情况列表
 * @param {number} data.changePointsAvailableCount 修改点数可用次数
 * @param {string} data.log 当前争夺记录
 * @param {string[]} data.logList 当前各层争夺记录列表
 * @param {string[]} data.enemyList 当前各层遭遇NPC列表
 * @param {function} data.getExtraPoint 根据指定的点数获得相应额外加成点数，例：data.getExtraPoint('力量', 5)
 * @param {function} data.getPropertyByPoint 根据指定的点数获得相应争夺属性的值（会根据用户的额外加成情况进行计算），例：data.getPropertyByPoint('力量', 5)
 * @param {function} data.getPointByProperty 根据指定的争夺属性获得相应点数的值（会根据用户的额外加成情况进行计算），例：data.getPointByProperty('力量', 400)
 * @returns {?{}|number|boolean} 争夺点数分配方案，可返回点数设置对象或各层点数分配方案中的指定层数，返回null表示暂停连续攻击，返回false表示使用当前点数继续攻击
 */
Const.getCustomPoints = function (data) {
    // data参数的含义见上方注释，可使用 console.log(data) 在控制台查看各参数具体的值
    //
    // 返回值：
    //   1. 点数设置对象（武器、护甲ID和备注为可选项），如：return {"力量": 1, "体质": 2, "敏捷": 3, "灵活": 3, "智力": 2, "意志": 1, "武器ID": 123456, "武器备注": "传奇的法杖", "护甲ID": 654321, "护甲备注": "传奇的布甲"};
    //   2. 用户设置的各层点数分配方案中的指定层数（如不存在指定层数的方案，则使用低于指定层数的最大层数的方案），如：return 18;
    //   3. 返回null表示暂停攻击，如：return null;
    //   4. 返回false表示使用当前点数继续攻击，如：return false;

    // 参考范例：
    console.log(data); // 在控制台输出各参数的具体值
    if (data.currentLevel === 1) {
        // 当处于第1层时，将剩余可分配属性点全部分配给体质
        return { "力量": 1, "体质": data.availablePoint - 5, "敏捷": 1, "灵活": 1, "智力": 1, "意志": 1 };
    } else if (data.currentLevel > 40) {
        // 当前层数大于40时暂停连续攻击，改为手动设置点数
        return null;
    } else if (data.currentLife < 1000) {
        // 在当前生命值小于1000时，返回指定的点数设置
        return { "力量": 1, "体质": 10, "敏捷": 60, "灵活": 90, "智力": 1, "意志": 1, "武器ID": 123456, "武器备注": "传奇的法杖", "护甲ID": 654321, "护甲备注": "传奇的布甲" };
    } else {
        // 在其它情况下，返回用户设置的各层点数分配方案的下一层的方案
        return data.currentLevel + 1;
    }
};