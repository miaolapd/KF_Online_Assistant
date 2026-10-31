'use strict';
/* 监视模式：源文件变更时重新构建ES6产物与发行版本 */
import {watch} from 'node:fs';
import path from 'node:path';
import {SRC_DIR} from './lib.mjs';
import {buildEs6} from './build.mjs';

// 重新构建的防抖延迟（毫秒），避免编辑器一次保存触发多次构建
const DEBOUNCE_DELAY = 150;
let timer = null;
let building = false;
let pending = false;

/**
 * 执行一次构建
 * @returns {Promise<void>}
 */
const rebuild = async function () {
    if (building) {
        pending = true;
        return;
    }
    building = true;
    try {
        console.log('-> 检测到改动，正在编译...');
        await buildEs6();
        console.log('-> 编译完成');
    } catch (ex) {
        // 单个文件的错误只记录日志，不终止监视进程
        console.error('-> 编译失败：');
        console.error(ex);
    } finally {
        building = false;
        if (pending) {
            pending = false;
            await rebuild();
        }
    }
};

/**
 * 触发防抖重建
 */
const scheduleRebuild = function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
        timer = null;
        rebuild();
    }, DEBOUNCE_DELAY);
};

console.log(`-> 正在监视 ${path.relative(process.cwd(), SRC_DIR)} 目录的改动...`);
try {
    watch(SRC_DIR, {recursive: true}, (eventType, fileName) => {
        if (fileName && fileName.endsWith('.js')) scheduleRebuild();
    });
} catch (ex) {
    console.error(`-> 无法递归监视源码目录：${ex.message}`);
    process.exitCode = 1;
}

// 启动时先构建一次
rebuild();
