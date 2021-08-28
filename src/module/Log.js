/* 日志模块 */
'use strict';
import Info from './Info';
import * as Util from './Util';
import Const from './Const';

// 保存日志的键值名称
const name = Const.storagePrefix + 'log';

/**
 * 读取日志
 * @returns {{}} 日志对象
 */
export const read = function () {
    let log = {};
    let options = Util.readData(name + '_' + Info.uid);
    if (!options) return log;
    try {
        options = JSON.parse(options);
    }
    catch (ex) {
        return log;
    }
    if (!options || $.type(options) !== 'object') return log;
    log = options;
    return log;
};

/**
 * 写入日志
 * @param {{}} log 日志对象
 */
export const write = log => Util.writeData(name + '_' + Info.uid, JSON.stringify(log));

/**
 * 清除日志
 */
export const clear = () => Util.deleteData(name + '_' + Info.uid);

/**
 * 记录一条新日志
 * @param {string} type 日志类别
 * @param {string} action 行为
 * @param {?{}} gain 收获
 * @param {?{}} pay 付出
 */
export const push = function (type, action, {gain = null, pay = null} = {}) {
    let log = read();
    let overdueDate = Util.getDateString(Util.getDate(`-${Config.logSaveDays}d`));
    for (let date of Util.getObjectKeyList(log, 1)) {
        if (date <= overdueDate) delete log[date];
        else break;
    }

    let now = new Date();
    let time = now.getTime();
    let today = Util.getDateString(now);
    let obj = {time, type, action};
    if (gain) obj['gain'] = gain;
    if (pay) obj['pay'] = pay;
    if (!Array.isArray(log[today])) log[today] = [];
    log[today].push(obj);
    write(log);
};

/**
 * 获取合并后的日志
 * @param {{}} log 当前日志
 * @param {{}} newLog 新日志
 * @returns {{}} 合并后的日志
 */
export const getMergeLog = function (log, newLog) {
    for (let date in newLog) {
        if (!Array.isArray(log[date])) {
            log[date] = newLog[date];
        }
        else {
            for (let newItem of newLog[date]) {
                if (typeof newItem.time !== 'number' || typeof newItem.type !== 'string') continue;
                let index = log[date].findIndex(item => newItem['time'] === item['time'] && newItem['type'] === item['type']);
                if (index > -1) log[date][index] = newItem;
                else log[date].push(newItem);
            }
            log[date].sort((a, b) => a.time > b.time ? 1 : -1);
        }
    }
    return log;
};
