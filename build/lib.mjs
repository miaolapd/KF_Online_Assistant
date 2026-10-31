'use strict';
/* 构建库：负责 Userscript 头部拼接、占位符替换与文件写入 */
import {mkdir, readFile, rm, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// 项目根目录
export const ROOT = fileURLToPath(new URL('..', import.meta.url));
// 源码与产物目录
export const SRC_DIR = path.join(ROOT, 'src');
export const DIST_DIR = path.join(ROOT, 'dist');
// 打包入口与头部文件名
export const APP_FILE = 'app.js';
export const META_FILE = 'meta.js';
// 各发行版本名称
export const EDITIONS = ['Common', 'Full', 'ForFirefox'];
// 依赖占位符替换用的脚本URL
const REPO_RAW = 'https://gitee.com/miaolapd/KF_Online_Assistant/raw/master';
export const POLYFILL_URL = `${REPO_RAW}/dist/lib/polyfill.min.js?V6.26.0`;
export const JQUERY_URL = `${REPO_RAW}/dist/lib/jquery.min.js?V2.2.4`;
// UserScript 头部匹配
const META_CONTENT_REGEX = /\/\/ ==UserScript==[\s\S]+?\/\/ ==\/UserScript==/;

/**
 * 统一换行符为LF
 * @param {string} text 文本
 * @returns {string}
 */
export const toLf = function (text) {
    return text.replace(/\r\n/g, '\n');
};

/**
 * 读取源码中的UserScript头部
 * @returns {Promise<string>}
 */
export const readMeta = async function () {
    return toLf(await readFile(path.join(SRC_DIR, META_FILE), 'utf8'));
};

/**
 * 拼接UserScript头部与打包产物
 * @param {string} meta UserScript头部
 * @param {string} app 打包产物
 * @returns {string}
 */
export const concatMetaAndApp = function (meta, app) {
    return toLf(meta + '\n' + app);
};

/**
 * 生成指定发行版本的脚本内容
 * @param {{meta: string, app: string, edition: string, dirName: string, isEs6: boolean}} options
 *        meta：UserScript头部；app：打包产物；edition：版本名称；
 *        dirName：产物子目录（es5/es6）；isEs6：是否为ES6版本
 * @returns {string}
 */
export const buildEditionContent = function ({meta, app, edition, dirName, isEs6}) {
    let content = concatMetaAndApp(meta, app);
    const baseUrl = `${REPO_RAW}/dist/${dirName}`;

    // 更新地址占位符
    content = content.replace(
        '// @pd-update-url-placeholder',
        `// @updateURL   ${baseUrl}/${edition}.meta.js\n` +
        `// @downloadURL ${baseUrl}/${edition}.user.js`
    );

    // 全功能版与Firefox特别版展开GM授权
    if (edition === 'Full' || edition === 'ForFirefox') {
        content = content.replace(
            /(\/\/ @grant\s+)none/,
            '$1GM_getValue\n$1GM_setValue\n$1GM_deleteValue'
        );
    }

    // 依赖占位符：ES5注入polyfill，Firefox特别版额外注入jQuery
    let requireLines = [];
    if (!isEs6) requireLines.push(`// @require     ${POLYFILL_URL}`);
    if (edition === 'ForFirefox') requireLines.push(`// @require     ${JQUERY_URL}`);
    content = content.replace(
        /\/\/ @pd-require\r?\n/,
        requireLines.length > 0 ? requireLines.join('\n') + '\n' : ''
    );

    // Firefox特别版将默认导出的Config引用改写为window.Config
    // 兼容两种打包形式：旧babel为_Info2.default.w.Config，esbuild内联为Info_default.w.Config
    if (edition === 'ForFirefox') {
        content = content.replace(
            /(?<![A-Za-z0-9_$])(?:[A-Za-z_$][\w$]*\.)?default\.w\.Config\b/g,
            'window.Config'
        );
        content = content.replace(
            /(?<![A-Za-z0-9_$])[A-Za-z_$][\w$]*\.w\.Config\b/g,
            'window.Config'
        );
    }

    return content;
};

/**
 * 截取UserScript头部（用于生成.meta.js）
 * @param {string} content 完整脚本内容
 * @returns {string}
 */
export const extractMeta = function (content) {
    const matches = content.match(META_CONTENT_REGEX);
    if (!matches) throw new Error('生成.meta.js失败：未找到UserScript头部');
    return matches[0];
};

/**
 * 写入文本文件（自动创建目录）
 * @param {string} filePath 文件路径
 * @param {string} content 文件内容
 * @returns {Promise<void>}
 */
export const writeTextFile = async function (filePath, content) {
    await mkdir(path.dirname(filePath), {recursive: true});
    await writeFile(filePath, content, 'utf8');
};

/**
 * 清空目录
 * @param {string} dirPath 目录路径
 * @returns {Promise<void>}
 */
export const cleanDir = async function (dirPath) {
    await rm(dirPath, {recursive: true, force: true});
    await mkdir(dirPath, {recursive: true});
};
