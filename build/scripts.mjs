'use strict';
/* 自定义脚本编译：将scripts/es6下的脚本编译为ES5 */
import {mkdir, readdir, readFile} from 'node:fs/promises';
import path from 'node:path';
import {transformAsync} from '@babel/core';
import presetEnv from '@babel/preset-env';
import {ROOT, toLf, writeTextFile} from './lib.mjs';

const SRC_SCRIPT_DIR = path.join(ROOT, 'scripts', 'es6');
const DEST_SCRIPT_DIR = path.join(ROOT, 'scripts', 'es5');
// ES5降级目标，必须显式声明
const ES5_TARGETS = {ie: '11'};

/**
 * 编译单个自定义脚本
 * @param {string} fileName 文件名
 * @returns {Promise<void>}
 */
const compileScript = async function (fileName) {
    const source = toLf(await readFile(path.join(SRC_SCRIPT_DIR, fileName), 'utf8'));
    const result = await transformAsync(source, {
        filename: fileName,
        presets: [[presetEnv, {targets: ES5_TARGETS}]],
        configFile: false,
        babelrc: false,
        compact: false
    });
    await writeTextFile(path.join(DEST_SCRIPT_DIR, fileName), toLf(result.code));
};

/**
 * 编译全部自定义脚本
 * @returns {Promise<void>}
 */
const buildScripts = async function () {
    await mkdir(DEST_SCRIPT_DIR, {recursive: true});
    const files = (await readdir(SRC_SCRIPT_DIR)).filter((file) => file.endsWith('.js'));
    for (const file of files) {
        await compileScript(file);
    }
    console.log(`-> 自定义脚本编译完成（共${files.length}个）`);
};

buildScripts().catch((ex) => {
    console.error(ex);
    process.exitCode = 1;
});
