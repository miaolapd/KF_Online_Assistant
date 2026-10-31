'use strict';
/* 构建库自测：验证头部拼接、占位符替换与meta裁剪 */
import {buildEditionContent, extractMeta, concatMetaAndApp, toLf} from './lib.mjs';

const meta = [
    '// ==UserScript==',
    '// @name        Test',
    '// @pd-update-url-placeholder',
    '// @pd-require',
    '// @grant       none',
    '// ==/UserScript==',
    ''
].join('\n');
const app = 'console.log("app");\nInfo_default.default.w.Config.a = 1;\nInfo_default.w.Config.b = 2;\n_Info2.default.w.Config.c = 3;\n';

let failed = 0;
/**
 * 断言
 * @param {string} name 用例名称
 * @param {boolean} condition 条件
 * @param {string} [detail] 失败详情
 */
const check = function (name, condition, detail = '') {
    if (condition) {
        console.log(`  ✓ ${name}`);
    } else {
        failed++;
        console.error(`  ✗ ${name}${detail ? ' — ' + detail : ''}`);
    }
};

/**
 * 统计子串出现次数
 * @param {string} text 文本
 * @param {string} sub 子串
 * @returns {number}
 */
const count = function (text, sub) {
    return text.split(sub).length - 1;
};

console.log('lib.mjs');

// 2.1 拼接与换行统一
const merged = concatMetaAndApp(meta.replace(/\n/g, '\r\n'), app);
check('拼接后以UserScript头部开头', merged.startsWith('// ==UserScript=='));
check('拼接后不含CR', !merged.includes('\r'));
check('拼接后包含打包产物', merged.includes('console.log("app")'));
check('toLf转换CRLF', toLf('a\r\nb\r\n') === 'a\nb\n');

// 2.2 占位符替换
const commonEs6 = buildEditionContent({meta, app, edition: 'Common', dirName: 'es6', isEs6: true});
check('ES6不残留更新地址占位符', !commonEs6.includes('@pd-update-url-placeholder'));
check('ES6 updateURL指向es6', commonEs6.includes('// @updateURL   https://gitee.com/miaolapd/KF_Online_Assistant/raw/master/dist/es6/Common.meta.js'));
check('ES6 downloadURL指向es6', commonEs6.includes('// @downloadURL https://gitee.com/miaolapd/KF_Online_Assistant/raw/master/dist/es6/Common.user.js'));
check('ES6不注入polyfill', !commonEs6.includes('polyfill.min.js'));
check('ES6不残留require占位符', !commonEs6.includes('@pd-require'));

const commonEs5 = buildEditionContent({meta, app, edition: 'Common', dirName: 'es5', isEs6: false});
check('ES5注入polyfill', commonEs5.includes('// @require     https://gitee.com/miaolapd/KF_Online_Assistant/raw/master/dist/lib/polyfill.min.js?V6.26.0'));
check('ES5 updateURL指向es5', commonEs5.includes('/dist/es5/Common.meta.js'));

const firefoxEs6 = buildEditionContent({meta, app, edition: 'ForFirefox', dirName: 'es6', isEs6: true});
check('ForFirefox注入jQuery', firefoxEs6.includes('/dist/lib/jquery.min.js?V2.2.4'));
check('ForFirefox ES6不含polyfill', !firefoxEs6.includes('polyfill.min.js'));

const firefoxEs5 = buildEditionContent({meta, app, edition: 'ForFirefox', dirName: 'es5', isEs6: false});
check('ForFirefox ES5同时含polyfill与jQuery',
    firefoxEs5.includes('polyfill.min.js') && firefoxEs5.includes('jquery.min.js'));

// 2.3 版本专属改写
check('Common保持grant none', commonEs6.includes('// @grant       none'));
const fullEs6 = buildEditionContent({meta, app, edition: 'Full', dirName: 'es6', isEs6: true});
check('Full展开GM_getValue', fullEs6.includes('// @grant       GM_getValue'));
check('Full展开GM_setValue', fullEs6.includes('// @grant       GM_setValue'));
check('Full展开GM_deleteValue', fullEs6.includes('// @grant       GM_deleteValue'));
check('Full不再残留grant none', !fullEs6.includes('// @grant       none'));
check('ForFirefox同样展开GM授权', firefoxEs6.includes('// @grant       GM_deleteValue'));
check('ForFirefox改写default.w.Config', count(firefoxEs6, '.default.w.Config') === 0);
check('ForFirefox改写InfoX.w.Config', count(firefoxEs6, '.w.Config') === 0);
check('ForFirefox产生window.Config', count(firefoxEs6, 'window.Config') === 3);
check('Common不改写default.w.Config', count(commonEs6, '.default.w.Config') > 0);
check('Common不改写w.Config', count(commonEs6, '.w.Config') > 0);

// 2.4 meta裁剪
const metaOnly = extractMeta(commonEs6);
check('meta以UserScript头部开头', metaOnly.startsWith('// ==UserScript=='));
check('meta以UserScript头部结尾', metaOnly.endsWith('// ==/UserScript=='));
check('meta不含脚本主体', !metaOnly.includes('console.log'));
check('meta仅出现一次头部标记', count(metaOnly, '// ==/UserScript==') === 1);

if (failed > 0) {
    console.error(`\n${failed} 项断言失败`);
    process.exit(1);
}
console.log('  全部断言通过');
