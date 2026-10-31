'use strict';
/* 构建入口：ES6/ES5 打包、发行版本生成、压缩与lib复制 */
import {copyFile, mkdir, readdir, readFile} from 'node:fs/promises';
import path from 'node:path';
import {build as esbuild} from 'esbuild';
import {transformAsync} from '@babel/core';
import presetEnv from '@babel/preset-env';
import {
    APP_FILE, DIST_DIR, EDITIONS, SRC_DIR,
    buildEditionContent, cleanDir, extractMeta, readMeta, toLf, writeTextFile
} from './lib.mjs';

const ES6_DIR = path.join(DIST_DIR, 'es6');
const ES5_DIR = path.join(DIST_DIR, 'es5');
const LIB_DIR = path.join(DIST_DIR, 'lib');
const SRC_LIB_DIR = path.join(SRC_DIR, 'lib');
const APP_ENTRY = path.join(SRC_DIR, APP_FILE);
// ES5降级目标，必须显式声明（Babel 8默认targets为browserslist默认值，会保留ES6语法）
const ES5_TARGETS = {ie: '11'};

/**
 * 打包ES6产物
 * @returns {Promise<string>} 打包后的源码
 */
const bundleEs6 = async function () {
    const result = await esbuild({
        entryPoints: [APP_ENTRY],
        bundle: true,
        format: 'iife',
        target: 'es2015',
        write: false,
        logLevel: 'warning'
    });
    return toLf(result.outputFiles[0].text);
};

/**
 * 将ES6产物降级为ES5
 * @param {string} code ES6源码
 * @returns {Promise<string>}
 */
const toEs5 = async function (code) {
    const result = await transformAsync(code, {
        filename: APP_FILE,
        presets: [[presetEnv, {targets: ES5_TARGETS}]],
        configFile: false,
        babelrc: false,
        compact: false
    });
    return toLf(result.code);
};

/**
 * 断言文本中不含ES6及以上语法
 * @param {string} code 待检查源码
 * @param {string} label 检查对象描述
 */
const assertNoEs6Syntax = function (code, label) {
    const checks = [
        ['const/let声明', /\b(?:const|let)\s/],
        ['箭头函数', /=>/],
        ['class声明', /\bclass\s+[A-Za-z_$]/],
        ['数组展开', /\[\s*\.\.\./],
        ['展开调用/参数', /\.\.\.[A-Za-z_$][\w$]*\s*[,)]/]
    ];
    const found = checks.filter(([, regex]) => regex.test(code)).map(([name]) => name);
    if (found.length > 0) {
        throw new Error(`${label} 仍包含ES6及以上语法：${found.join('、')}`);
    }
};

/**
 * 生成指定目标的发行版本文件
 * @param {string} dirName 产物子目录（es5/es6）
 * @param {boolean} isEs6 是否为ES6版本
 * @returns {Promise<void>}
 */
const buildEditions = async function (dirName, isEs6) {
    const meta = await readMeta();
    const app = await readFile(path.join(DIST_DIR, dirName, APP_FILE), 'utf8');
    const destDir = path.join(DIST_DIR, dirName);

    for (const edition of EDITIONS) {
        const content = buildEditionContent({meta, app, edition, dirName, isEs6});
        if (edition === 'ForFirefox' && content.includes('.default.w.Config')) {
            throw new Error('ForFirefox产物仍残留 .default.w.Config，Config改写失败');
        }
        await writeTextFile(path.join(destDir, `${edition}.user.js`), content);
        await writeTextFile(path.join(destDir, `${edition}.meta.js`), extractMeta(content));
    }
};

/**
 * 清空产物目录
 * @returns {Promise<void>}
 */
export const clean = async function () {
    await cleanDir(ES6_DIR);
    await cleanDir(ES5_DIR);
    await cleanDir(LIB_DIR);
    console.log('-> 已清空产物目录');
};

/**
 * 构建ES6产物
 * @returns {Promise<void>}
 */
export const buildEs6 = async function () {
    const code = await bundleEs6();
    await writeTextFile(path.join(ES6_DIR, APP_FILE), code);
    await buildEditions('es6', true);
    console.log('-> ES6版本构建完成');
};

/**
 * 构建ES5产物
 * @returns {Promise<void>}
 */
export const buildEs5 = async function () {
    const es5Code = await toEs5(await bundleEs6());
    assertNoEs6Syntax(es5Code, 'dist/es5/app.js');
    await writeTextFile(path.join(ES5_DIR, APP_FILE), es5Code);
    await buildEditions('es5', false);

    // 压缩通用版：分开处理头部与脚本主体，避免压缩器把UserScript头部当注释移除
    const sourcePath = path.join(ES5_DIR, 'Common.user.js');
    const minPath = path.join(ES5_DIR, 'Common.min.user.js');
    const source = await readFile(sourcePath, 'utf8');
    const header = extractMeta(source);
    const body = source.slice(source.indexOf(header) + header.length);
    const result = await esbuild({
        stdin: {contents: body, loader: 'js', resolveDir: ES5_DIR},
        bundle: false,
        minify: true,
        target: 'es5',
        write: false,
        logLevel: 'warning'
    });
    const minCode = toLf(result.outputFiles[0].text);
    if (!/\/\/ ==UserScript==[\s\S]+?\/\/ ==\/UserScript==/.test(header)) {
        throw new Error('压缩通用版失败：无法从产物中提取UserScript头部');
    }
    await writeTextFile(minPath, header + '\n' + minCode);
    console.log('-> ES5版本构建完成');
};

/**
 * 复制运行时库文件
 * @returns {Promise<void>}
 */
export const copyLib = async function () {
    await mkdir(LIB_DIR, {recursive: true});
    const files = await readdir(SRC_LIB_DIR);
    for (const file of files) {
        if (!file.endsWith('.js')) continue;
        await copyFile(path.join(SRC_LIB_DIR, file), path.join(LIB_DIR, file));
    }
    console.log('-> 运行时库复制完成');
};

/**
 * 完整构建
 * @returns {Promise<void>}
 */
export const buildAll = async function () {
    await clean();
    await buildEs6();
    await buildEs5();
    await copyLib();
    console.log('-> 全部构建完成');
};

// 命令行入口
const command = process.argv[2];
const commands = {
    clean,
    es6: buildEs6,
    es5: buildEs5,
    all: buildAll
};

if (command && commands[command]) {
    commands[command]().catch((ex) => {
        console.error(ex);
        process.exitCode = 1;
    });
} else if (command) {
    console.error(`未知构建命令：${command}（可用：${Object.keys(commands).join('、')}）`);
    process.exitCode = 1;
}

