'use strict';
/* 导入模块 */
const gulp = require('gulp');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babelify = require('babelify');
const watchify = require('watchify');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');

/* 路径、文件名常量定义 */
const srcPath = 'src/';
const distPath = 'dist/';
const es5Path = 'es5/';
const es6Path = 'es6/';
const libPath = 'lib/';
const appFileName = 'app.js';
const metaFileName = 'meta.js';
const commonEditionName = 'Common';
const fullEditionName = 'Full';
const forFirefoxEditionName = 'ForFirefox';
const scriptExt = '.user.js';
const metaExt = '.meta.js';

// 匹配meta内容正则表达式
const metaContentRegex = /(\/\/ ==UserScript==(?:.|\r|\n)+?\/\/ ==\/UserScript==)(?:.|\r|\n)+/;
// babel-polyfill脚本的URL
const polyfillUrl = 'https://gitee.com/miaolapd/KF_Online_Assistant/raw/master/dist/lib/polyfill.min.js?V6.26.0';
// jQuery脚本的URL
const jQueryUrl = 'https://gitee.com/miaolapd/KF_Online_Assistant/raw/master/dist/lib/jquery.min.js?V2.2.4';

/**
 * 打包模块（ES6版本）
 * @returns {*}
 */
const getBundler = function () {
    return browserify({entries: [srcPath + appFileName]})
        .transform(babelify, {'plugins': ['transform-es2015-modules-commonjs']});
};

/**
 * 编译ES6版本
 * @param bundler
 * @returns {*}
 */
const compileEs6 = function (bundler) {
    return bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Compile es6 Script Error:\n'))
        .pipe(source(appFileName))
        .pipe(replace(/\r\n/g, '\n'))
        .pipe(buffer())
        .pipe(gulp.dest(distPath + es6Path));
};

/**
 * 编译ES5版本
 * @returns {*}
 */
const compileEs5 = function () {
    return browserify({entries: [srcPath + appFileName]})
        .transform(babelify, {presets: ['es2015']})
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Compile es5 Script Error:\n'))
        .pipe(source(appFileName))
        .pipe(replace(/\r\n/g, '\n'))
        .pipe(buffer())
        .pipe(gulp.dest(distPath + es5Path));
};

/**
 * 生成通用版文件
 * @param {boolean} isEs6 是否为ES6版本
 * @returns {*}
 */
const buildCommonEdition = function (isEs6 = false) {
    let path = isEs6 ? es6Path : es5Path;
    return gulp.src([srcPath + metaFileName, distPath + path + appFileName])
        .pipe(concat(commonEditionName + scriptExt))
        .pipe(replace(/\r\n/g, '\n'))
        .pipe(replace(
            /\/\/ @pd-update-url-placeholder/,
            `// @updateURL   https://gitee.com/miaolapd/KF_Online_Assistant/raw/master/dist/${path}Common.meta.js\n` +
            `// @downloadURL https://gitee.com/miaolapd/KF_Online_Assistant/raw/master/dist/${path}Common.user.js`
        ))
        .pipe(replace(/\/\/ @pd-require\r?\n/, !isEs6 ? `// @require     ${polyfillUrl}\n` : ''))
        .pipe(gulp.dest(distPath + path))
        .pipe(replace(metaContentRegex, '$1'))
        .pipe(rename(commonEditionName + metaExt))
        .pipe(gulp.dest(distPath + path));
};

/**
 * 生成全功能版文件
 * @param {boolean} isEs6 是否为ES6版本
 * @returns {*}
 */
const buildFullEdition = function (isEs6 = false) {
    let path = isEs6 ? es6Path : es5Path;
    return gulp.src([srcPath + metaFileName, distPath + path + appFileName])
        .pipe(concat(fullEditionName + scriptExt))
        .pipe(replace(/\r\n/g, '\n'))
        .pipe(replace(
            /\/\/ @pd-update-url-placeholder/,
            `// @updateURL   https://gitee.com/miaolapd/KF_Online_Assistant/raw/master/dist/${path}Full.meta.js\n` +
            `// @downloadURL https://gitee.com/miaolapd/KF_Online_Assistant/raw/master/dist/${path}Full.user.js`
        ))
        .pipe(replace(/\/\/ @pd-require\r?\n/, !isEs6 ? `// @require     ${polyfillUrl}\n` : ''))
        .pipe(replace(/(\/\/ @grant\s+)none/, '$1GM_getValue\n$1GM_setValue\n$1GM_deleteValue'))
        .pipe(gulp.dest(distPath + path))
        .pipe(replace(metaContentRegex, '$1'))
        .pipe(rename(fullEditionName + metaExt))
        .pipe(gulp.dest(distPath + path));
};

/**
 * 生成Firefox特别版文件
 * @param {boolean} isEs6 是否为ES6版本
 * @returns {*}
 */
const buildForFirefoxEdition = function (isEs6 = false) {
    let path = isEs6 ? es6Path : es5Path;
    return gulp.src([srcPath + metaFileName, distPath + path + appFileName])
        .pipe(concat(forFirefoxEditionName + scriptExt))
        .pipe(replace(/\r\n/g, '\n'))
        .pipe(replace(
            /\/\/ @pd-update-url-placeholder/,
            `// @updateURL   https://gitee.com/miaolapd/KF_Online_Assistant/raw/master/dist/${path}ForFirefox.meta.js\n` +
            `// @downloadURL https://gitee.com/miaolapd/KF_Online_Assistant/raw/master/dist/${path}ForFirefox.user.js`
        ))
        .pipe(replace(/(\/\/ @grant\s+)none/, '$1GM_getValue\n$1GM_setValue\n$1GM_deleteValue'))
        .pipe(replace(
            /\/\/ @pd-require\r?\n/,
            (!isEs6 ? `// @require     ${polyfillUrl}\n` : '') + `// @require     ${jQueryUrl}\n`
        ))
        .pipe(replace(/\b_Info2\.default\.w\.Config\b/g, 'window.Config'))
        .pipe(gulp.dest(distPath + path))
        .pipe(replace(metaContentRegex, '$1'))
        .pipe(rename(forFirefoxEditionName + metaExt))
        .pipe(gulp.dest(distPath + path));
};

// 编译ES6版本的任务
gulp.task('compileEs6', () => compileEs6(getBundler()));
// 生成ES6通用版文件的任务
gulp.task('buildEs6CommonEdition', () => buildCommonEdition(true));
// 生成ES6全功能版文件的任务
gulp.task('buildEs6FullEdition', () => buildFullEdition(true));
// 生成ES6 Firefox特别版文件的任务
gulp.task('buildEs6ForFirefoxEdition', () => buildForFirefoxEdition(true));

// 编译ES5版本的任务
gulp.task('compileEs5', () => compileEs5());
// 生成ES5通用版文件的任务
gulp.task('buildEs5CommonEdition', () => buildCommonEdition());
// 生成ES5全功能版文件的任务
gulp.task('buildEs5FullEdition', () => buildFullEdition());
// 生成ES5 Firefox特别版文件的任务
gulp.task('buildEs5ForFirefoxEdition', () => buildForFirefoxEdition());

// 生成ES5通用版压缩文件的任务
gulp.task('uglifyEs5', function () {
    return gulp.src(distPath + es5Path + commonEditionName + scriptExt)
        .pipe(uglify())
        .pipe(rename(commonEditionName + '.min' + scriptExt))
        .pipe(gulp.dest(distPath + es5Path));
});

const bundler = watchify(getBundler());
// 监视任务
gulp.task('watch', function () {
    bundler.on('update', function () {
        console.log('-> Compiling Script...');
        compileEs6(bundler);
    });
    bundler.on('log', gutil.log);
    gulp.watch(distPath + es6Path + appFileName, ['buildEs6CommonEdition', 'buildEs6FullEdition', 'buildEs6ForFirefoxEdition']);
    return compileEs6(bundler);
});

// 复制库文件的任务
gulp.task('copy', () => gulp.src(srcPath + libPath + '*.js').pipe(gulp.dest(distPath + libPath)));

// 生成所有文件的任务
gulp.task('build', function (cb) {
    runSequence(
        'compileEs6', ['buildEs6CommonEdition', 'buildEs6FullEdition', 'buildEs6ForFirefoxEdition'],
        'compileEs5', ['buildEs5CommonEdition', 'buildEs5FullEdition', 'buildEs5ForFirefoxEdition'],
        'uglifyEs5', 'copy', cb
    );
});

// 默认任务
gulp.task('default', ['build']);
