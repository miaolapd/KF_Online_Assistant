// ==UserScript==
// @name        在达到所设定的阈值时暂停自动攻击
// @version     1.0
// @trigger     start
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=13301335
// @description 在达到所设定的阈值时暂停自动攻击，在其它情况下则返回相应层数的点数分配方案
// ==/UserScript==
'use strict';
// 阈值类型：reduceLifePercent、targetLife、targetLevel，请设为这些类型中的其中一种
const type = 'reduceLifePercent';
// 阈值数据（设定其中一种阈值即可）
const limits = {
    // 在当前剩余生命值低于该层初始生命值的指定百分比时暂停攻击
    reduceLifePercent: 80,
    // 在当前剩余生命值低于指定值时暂停攻击
    targetLife: 1000,
    // 在当攻击到指定层数时暂停攻击
    targetLevel: 30,
};

const Const = require('./Const').default;
Const.getCustomPoints = function ({currentLife, currentInitLife, currentLevel}) {
    switch (type) {
        case 'reduceLifePercent':
            if (currentLife > 0 && currentLife / currentInitLife * 100 < limits.reduceLifePercent) {
                alert('当前去血量低于指定百分比，请手动攻击');
                return null;
            }
            break;
        case 'targetLife':
            if (currentLife > 0 && currentLife < limits.targetLife) {
                alert('当前剩余生命值低于指定值，请手动攻击');
                return null;
            }
            break;
        case 'targetLevel':
            if (currentLevel > limits.targetLevel) {
                alert('已攻击到指定层数，请手动攻击');
                return null;
            }
            break;
    }
    return currentLevel + 1;
};