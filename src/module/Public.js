/* 公共模块 */
'use strict';
import Info from './Info';
import * as Util from './Util';
import * as Msg from './Msg';
import * as Dialog from './Dialog';
import Const from './Const';
import {read as readConfig, write as writeConfig} from './Config';
import {show as showConfigDialog} from './ConfigDialog';
import * as Log from './Log';
import {show as showLogDialog} from './LogDialog';
import * as TmpLog from './TmpLog';
import * as Script from './Script';
import * as Read from './Read';
import * as Loot from './Loot';
import * as Item from './Item';

/**
 * 获取Uid和用户名
 * @returns {boolean} 是否获取成功
 */
export const getUidAndUserName = function () {
    let $userName = $('#kf_topuser > a[href="javascript:;"]').eq(0);
    let $uid = Info.$userMenu.find('a[href^="profile.php?action=show&uid="]').eq(0);
    if (!$userName.length || !$uid.length) return false;
    $userName.attr('id', 'pdUserName');
    Info.userName = $.trim($userName.contents().get(0).textContent);
    if (!Info.userName) return false;
    let matches = /&uid=(\d+)/.exec($uid.attr('href'));
    if (!matches) return false;
    Info.uid = parseInt(matches[1]);
    return true;
};

/**
 * 获取用户的SafeID
 * @returns {string} 用户的SafeID
 */
export const getSafeId = function () {
    let safeId = $('input#safeid').val();
    if (!safeId) {
        let matches = /safeid=(\w+)/i.exec($('a[href*="safeid="]:first').attr('href'));
        if (matches) safeId = matches[1];
    }
    return safeId ? safeId : '';
};

/**
 * 检查浏览器类型
 */
export const checkBrowserType = function () {
    if (Config.browseType === 'auto') {
        Info.isMobile = /(Mobile|MIDP)/i.test(navigator.userAgent);
    } else {
        Info.isMobile = Config.browseType === 'mobile';
    }
};

/**
 * 添加CSS样式
 */
export const appendCss = function () {
    $('head').append(`
<style>
  /* 公共 */
  .pd_highlight { color: #f00 !important; }
  .pd_notice, .pd_msg .pd_notice { font-style: italic; color: #666; }
  .pd_input, .pd_cfg_main input, .pd_cfg_main select {
    vertical-align: middle; height: auto; margin-right: 0; line-height: 22px; font-size: 12px;
  }
  .pd_input[type="text"], .pd_input[type="number"], .pd_cfg_main input[type="text"], .pd_cfg_main input[type="number"] {
    height: 22px; line-height: 22px;
  }
  .pd_input:focus, .pd_cfg_main input[type="text"]:focus, .pd_cfg_main input[type="number"]:focus, .pd_cfg_main textarea:focus,
      .pd_textarea:focus { border-color: #7eb4ea; }
  .pd_textarea, .pd_cfg_main textarea { border: 1px solid #ccc; font-size: 12px; }
  .pd_btn_link { margin-left: 4px; margin-right: 4px; }
  .pd_custom_tips { cursor: help; }
  .pd_disabled_link { color: #999 !important; text-decoration: none !important; cursor: default; }
  .pd_not_click_link, .pd_not_click_link:visited { color: #000; pointer-events: none; }
  hr {
    box-sizing: content-box; height: 0; margin-top: 7px; margin-bottom: 7px; border: 0; border-top: 1px solid rgba(0, 0, 0, .2);
  }
  .pd_overflow { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .pd_hide { width: 0 !important; height: 0 !important; font: 0/0 a; color: transparent; background-color: transparent; border: 0 !important; }
  .pd_stat i { display: inline-block; font-style: normal; margin-right: 3px; }
  .pd_stat_extra em, .pd_stat_extra ins { padding: 0 2px; cursor: help; }
  .pd_panel { position: absolute; overflow-y: auto; background-color: #fff; border: 1px solid #9191ff; opacity: 0.9; }
  .pd_title_tips {
    position: absolute; max-width: 470px; font-size: 12px; line-height: 1.5em;
    padding: 2px 5px; background-color: #fcfcfc; border: 1px solid #767676; z-index: 9999;
  }
  .pd_search_type {
    float: left; height: 26px; line-height: 26px; width: 65px; text-align: center;
    border: 1px solid #ccc; border-left: none; border-right: none; cursor: pointer;
  }
  .pd_search_type i { font-style: normal; margin-left: 5px; font-family: sans-serif; }
  .pd_search_type_list {
    position: absolute; width: 63px; background-color: #fcfcfc; border: 1px solid #ccc; border-top: none; line-height: 26px;
    text-indent: 13px; cursor: pointer; z-index: 1004;
  }
  .pd_search_type_list li:hover { color: #fff; background-color: #87c3cf; }
  #alldiv > .drow:nth-child(2) { ${Config.navBarAlwaysTopEnabled && !location.host.endsWith('.miaola.info') ? 'position: sticky; top: 0;' : ''} z-index: 1001 !important; }
  .pd_domain_tips { position: absolute; top: 0; width: 1200px; }
  
  /* 消息框 */
  .pd_mask { position: fixed; width: 100%; height: 100%; left: 0; top: 0; z-index: 1000; }
  .pd_msg_container { position: ${Info.isMobile ? 'absolute' : 'fixed'}; width: 100%; z-index: 1003; }
  .pd_msg {
    border: 1px solid #6ca7c0; text-shadow: 0 0 3px rgba(0, 0, 0, 0.1); border-radius: 3px; padding: 10px 40px; text-align: center;
    font-size: 14px; position: absolute; display: none; color: #333; line-height: 1.6em; background: #f8fcfe; background-repeat: no-repeat;
    background-image: -webkit-linear-gradient(#f9fcfe, #f6fbfe 25%, #eff7fc);
    background-image: -moz-linear-gradient(top, #f9fcfe, #f6fbfe 25%, #eff7fc);
    background-image: -ms-linear-gradient(#f9fcfe, #f6fbfe 25%, #eff7fc);
    background-image: linear-gradient(#f9fcfe, #f6fbfe 25%, #eff7fc);
  }
  .pd_msg strong { margin-right: 5px; }
  .pd_msg i { font-style: normal; padding-left: 10px; }
  .pd_msg em, .pd_stat em, .pd_msg ins, .pd_stat ins { font-weight: 700; font-style: normal; color:#ff6600; padding: 0 3px; }
  .pd_msg ins, .pd_stat ins { text-decoration: none; color: #339933; }
  .pd_msg a { font-weight: bold; margin-left: 15px; }
  .pd_change_domain_tips_area {
    position: fixed;
    top: 0;
    width: 1198px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: #842029;
    background-color: #f8d7da;
    border: 1px solid #f5c2c7;
    z-index: 1002 !important;
  }
  
  /* 帖子页面 */
  .readtext .pd_goto_link { color: #000; }
  .readtext .pd_goto_link:hover { color: #51d; }
  .pd_multi_quote_chk { margin-right: 2px; float: right; }
  .pd_fast_goto_floor { margin-right: 10px !important; line-height: 32px; }
  .pd_user_memo { font-size: 12px; color: #999; margin-left: 5px; }
  .readtext img[onclick] { width: auto; max-width: 850px; }
  .read_fds { text-align: left !important; font-weight: normal !important; font-style: normal !important; }
  .pd_code_area { max-height: 550px; margin-top: 1em; overflow-y: auto; font-size: 12px; font-family: Consolas, "Courier New"; }
  .pd_code_area .pd_copy_code { position: absolute; margin-top: -1em; min-width: 5em; text-align: center; background-color: #fffbf4; height: 20px; }
  .pd_good_post_mark { outline: 3px solid #f00; outline-offset: -3px; }
  .pd_follow_highlight { box-shadow: 0 0 3px 1px #ff9933 !important; }
  
  /* 我的物品页面 */
  .pd_item_btns { text-align: right; margin-top: 5px;  }
  .pd_item_btns button, .pd_item_btns input { margin-bottom: 2px; vertical-align: middle; }
  .pd_result { border: 1px solid #99f; padding: 5px; margin-top: 10px; line-height: 2em; }
  .pd_arm_equipped { background-color:#eef; -webkit-box-shadow: 0 0 7px #99f; box-shadow: 0 0 7px #99f; }
  .pd_arm_equipped > td:nth-child(3)::before { content: "（装备中）"; font-weight: bold; }
  .pd_arm_equipped a[data-name="equip"], .pd_arm_equipped a[data-name="smelt"] { color: #777; pointer-events: none; }
  .kf_fw_ig4 > tbody > tr > td { position: relative; }
  .kf_fw_ig4 > tbody > tr > td[data-memo]::after {
    content: "(" attr(data-memo) ")"; position: absolute; bottom: 0; right: 5px; padding: 0 5px; color: #777; background: rgba(252, 252, 252, .7);
  }
  .kf_fw_ig4 > tbody > .pd_arm_equipped > td[data-memo]::after { background: rgba(238, 238, 255, .7); }
  .kf_fw_ig4 > tbody > tr > td > input[name="armCheck"] { position: absolute; top: 0; left: 5px; }
  .show_arm_info { position: absolute; top: 0; right: 0; padding: 0 10px; background: rgba(252, 252, 252, .9); }
  .pd_arm_equipped .show_arm_info { background: rgba(238, 238, 255, .9); }
  .pd_useless_sub_property { color: #999; text-decoration: line-through; }
  .pd_arm_id { font-style: normal; color: #999; }
  .pd_new_arm_mark { font-style: normal; color: #f00; }
  
  /* 发帖页面 */
  #pdSmilePanel img { margin: 3px; cursor: pointer; }
  .editor-button .pd_editor_btn { background: none; text-indent: 0; line-height: 18px; cursor: default; }
  .pd_post_extra_option { text-align: left; margin: 5px; }
  .pd_post_extra_option input { vertical-align: middle; height: auto; margin-right: 0; }
  
  /* 其它页面 */
  .pd_thread_page { margin-left: 5px; }
  .pd_thread_page a { color: #444; padding: 0 3px; }
  .pd_thread_page a:hover { color: #51d; }
  .pd_card_chk { position: absolute; bottom: -8px; left: 1px; }
  .pd_thread_goto {
    position: absolute; top: 0; right: 0; box-sizing: border-box; width: 100%; height: 100%; visibility: hidden; z-index: 1;
  }
  .pd_id_color_select > td { position: relative; cursor: pointer; }
  .pd_id_color_select > td > input { position: absolute; top: 18px; left: 10px; }
  #pdPropertiesArea td { position: relative; }
  #pdPropertiesArea input[type="text"] { width: 211px; }
  .pd_property_diff { position: absolute; top: 0px; right: 5px; }
  .pd_property_diff em { font-style: normal; }
  .rightbox1 { overflow: hidden; }
  .pd_rightbox1_gray, .pd_rightbox1_gray:visited, .pd_rightbox1_gray:hover { color: #b0b0ff; border-color: #b0b0ff; }

  /* 设置对话框 */
  .pd_cfg_ml { margin-left: 10px; }
  .pd_cfg_box {
    position: ${Info.isMobile ? 'absolute' : 'fixed'}; border: 1px solid #9191ff; display: none; z-index: 1002;
    -webkit-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); -moz-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
  }
  .pd_cfg_box h1 {
    text-align: center; font-size: 14px; background-color: #9191ff; color: #fff; line-height: 2em; margin: 0; padding-left: 20px;
  }
  .pd_cfg_box h1 span { float: right; cursor: pointer; padding: 0 10px; }
  .pd_cfg_nav { text-align: right; margin-top: 5px; margin-bottom: -5px; }
  .pd_cfg_main { background-color: #fcfcfc; padding: 0 10px; font-size: 12px; line-height: 24px; min-height: 50px; overflow: auto; }
  .pd_cfg_main fieldset { border: 1px solid #ccccff; padding: 0 6px 6px; }
  .pd_cfg_main legend { font-weight: bold; }
  .pd_cfg_main input[type="color"] { height: 18px; width: 30px; padding: 0; }
  .pd_cfg_tips { color: #51d; text-decoration: none; cursor: help; }
  .pd_cfg_tips:hover { color: #ff0000; }
  #pdConfigDialog .pd_cfg_main { overflow-x: hidden; white-space: nowrap; }
  .pd_cfg_panel { display: inline-block; width: 400px; vertical-align: top; }
  .pd_cfg_panel + .pd_cfg_panel { margin-left: 5px; }
  .pd_cfg_btns { background-color: #fcfcfc; text-align: right; padding: 5px; }
  .pd_cfg_btns input, .pd_cfg_btns button { vertical-align: middle; }
  .pd_cfg_btns button { min-width: 80px; }
  .pd_cfg_about { float: left; line-height: 24px; margin-left: 5px; }
  .pd_custom_script_header { margin: 7px 0; padding: 5px; background-color: #e8e8e8; border-radius: 5px; }
  .pd_custom_script_content { display: none; width: 750px; height: 350px; white-space: pre; }

  /* 日志对话框 */
  .pd_log_nav { text-align: center; margin: -5px 0 -12px; font-size: 14px; line-height: 44px; }
  .pd_log_nav a { display: inline-block; }
  .pd_log_nav h2 { display: inline; font-size: 14px; margin-left: 7px; margin-right: 7px; }
  .pd_log_content { height: 242px; overflow: auto; }
  .pd_log_content h3 { display: inline-block; font-size: 12px; line-height: 22px; margin: 0; }
  .pd_log_content h3:not(:first-child) { margin-top: 5px; }
  .pd_log_content p { line-height: 22px; margin: 0; }
</style>
`);

    if (location.pathname === '/read.php' && (Config.threadContentFontSize > 0 || Config.adjustThreadContentWidthEnabled)) {
        $('head').append(`
<style>
  .readtext > table > tbody > tr > td:nth-child(2) {
    width: ${Config.adjustThreadContentWidthEnabled ? 643.2 : 823.2}px;
    display: inline-block;
    overflow-wrap: break-word;
  }
  .readtext > table > tbody > tr > td:nth-child(2) table { word-break: break-all; }
</style>
`);
    }

    if (Config.customCssEnabled) {
        $('head').append(`<style>${Config.customCssContent}</style>`);
    }
};

/**
 * 添加设置和日志对话框的链接
 */
export const addConfigAndLogDialogLink = function () {
    $(`
<li><a data-name="openConfigDialog" href="#">助手设置</a></li>
<li><a data-name="openLogDialog" href="#">助手日志</a></li>
`).appendTo(Info.$userMenu)
        .find('[data-name="openConfigDialog"]')
        .click(function (e) {
            e.preventDefault();
            showConfigDialog();
        }).end()
        .find('[data-name="openLogDialog"]')
        .click(function (e) {
            e.preventDefault();
            showLogDialog();
        });
};

/**
 * 处理侧边栏链接
 */
export const handleSideBarLink = function () {
    let $kfb = $('a.rightbox1[title="网站虚拟货币"]');
    $kfb.attr('id', 'pdKfb');
    let matches = /(-?\d+)KFB\s*\|\s*(-?\d+(?:\.\d+)?)贡献/.exec($kfb.text());
    if (matches) {
        let kfb = parseInt(matches[1]);
        let gongXian = parseFloat(matches[2]);
        $kfb.html(`<b>${kfb.toLocaleString()}</b>KFB | <b>${gongXian.toLocaleString()}</b>贡献`)
            .attr('data-kfb', kfb)
            .attr('data-gongxian', gongXian);
    }

    let $smLevel = $('a.rightbox1[href="kf_growup.php"]');
    $smLevel.attr('id', 'pdSmLevel');
    matches = /神秘(-?\d+)级 \(系数排名第\s*(\d+\+?)\s*位/.exec($smLevel.text());
    if (matches) {
        let smLevel = parseInt(matches[1]);
        let smRank = matches[2];
        $smLevel.html(`神秘<b>${smLevel.toLocaleString()}</b>级 (系数排名第<b style="color: #00f;">${smRank}</b>位)`)
            .attr('data-sm-level', smLevel)
            .attr('data-sm-rank', smRank);
    }

    $('a.rightbox1[href="kf_fw_ig_index.php"]').attr('id', 'pdLoot');
};

/**
 * 在操作进行时阻止关闭页面
 * @param e
 * @returns {string} 提示消息
 */
export const preventCloseWindowWhenActioning = function (e) {
    if ($('.pd_mask').length > 0) {
        let msg = '操作正在进行中，确定要关闭页面吗？';
        e.returnValue = msg;
        return msg;
    }
};

/**
 * 输出经过格式化后的控制台消息
 * @param {string} msgType 消息类别
 * @param {string} html 回应的HTML源码
 */
export const showFormatLog = function (msgType, html) {
    let {msg, url} = Util.getResponseMsg(html);
    console.log(`【${msgType}】回应：${msg}${url ? `；跳转地址：${Util.getHostNameUrl()}${url}` : ''}`);
};

/**
 * 添加兼容方法
 */
export const addPolyfill = function () {
    if (!Array.prototype.includes) {
        Array.prototype.includes = function (searchElement /*, fromIndex = 0 */) {
            if (this == null) throw new TypeError('Array.prototype.includes called on null or undefined');
            const O = Object(this);
            const len = parseInt(O.length) || 0;
            if (len === 0) return false;
            let n = parseInt(arguments[1]) || 0;
            let k;
            if (n >= 0) k = n;
            else {
                k = len + n;
                if (k < 0) k = 0;
            }
            let currentElement;
            while (k < len) {
                currentElement = O[k];
                if (searchElement === currentElement || (searchElement !== searchElement && currentElement !== currentElement)) return true;
                k++;
            }
            return false;
        };
    }
    if (!String.prototype.padStart) {
        String.prototype.padStart = function padStart(maxLength, fillString = ' ') {
            const O = Object(this);
            const S = String(O);
            const intMaxLength = parseInt(maxLength) || 0;
            const stringLength = parseInt(S.length) || 0;
            if (intMaxLength <= stringLength) return S;
            let filler = typeof fillString === 'undefined' ? ' ' : String(fillString);
            if (filler === '') return S;
            const fillLen = intMaxLength - stringLength;
            while (filler.length < fillLen) {
                const fLen = filler.length;
                const remainingCodeUnits = fillLen - fLen;
                if (fLen > remainingCodeUnits) filler += filler.slice(0, remainingCodeUnits);
                else filler += filler;
            }
            const truncatedStringFiller = filler.slice(0, fillLen);
            return truncatedStringFiller + S;
        };
    }
    if (!String.prototype.padEnd) {
        String.prototype.padEnd = function padEnd(maxLength, fillString = ' ') {
            const O = Object(this);
            const S = String(O);
            const intMaxLength = parseInt(maxLength) || 0;
            const stringLength = parseInt(S.length) || 0;
            if (intMaxLength <= stringLength) return S;
            let filler = typeof fillString === 'undefined' ? ' ' : String(fillString);
            if (filler === '') return S;
            const fillLen = intMaxLength - stringLength;
            while (filler.length < fillLen) {
                const fLen = filler.length;
                const remainingCodeUnits = fillLen - fLen;
                if (fLen > remainingCodeUnits) filler += filler.slice(0, remainingCodeUnits);
                else filler += filler;
            }
            const truncatedStringFiller = filler.slice(0, fillLen);
            return S + truncatedStringFiller;
        };
    }
};

/**
 * 获取定时模式下次操作的时间间隔信息
 * @returns {{action: string, interval: number}} action：下次操作的名称；interval：下次操作的时间间隔（秒）
 */
export const getNextTimingIntervalInfo = function () {
    let promoteHaloInterval = -1;
    if (Config.autoPromoteHaloEnabled) {
        let value = parseInt(Util.getCookie(Const.promoteHaloCookieName));
        if (value > 0) {
            promoteHaloInterval = Math.floor((value - $.now()) / 1000);
        } else {
            promoteHaloInterval = 0;
        }
    }


    let getDailyBonusInterval = -1;
    if (Config.autoGetDailyBonusEnabled) {
        let value = parseInt(Util.getCookie(Const.getDailyBonusCookieName));
        if (value > 0) {
            let date = Util.getTimezoneDateByTime(Const.getDailyBonusAfterTime);
            date.setDate(date.getDate() + 1);
            let now = new Date();
            if (now > date) date.setDate(date.getDate() + 1);
            getDailyBonusInterval = Math.floor((date - now) / 1000);
        } else if (value < 0) {
            getDailyBonusInterval = Const.getDailyBonusSpecialInterval * 60;
        } else {
            getDailyBonusInterval = 0;
        }
    }

    let buyItemInterval = -1;
    if (Config.autoBuyItemEnabled) {
        let date = Util.getDateByTime(Config.buyItemAfterTime);
        let now = new Date();
        if (Util.getCookie(Const.buyItemReadyCookieName)) {
            buyItemInterval = 5 * 60;
        } else if (Util.getCookie(Const.buyItemCookieName) || now < date) {
            if (now > date) date.setDate(date.getDate() + 1);
            buyItemInterval = Math.floor((date - now) / 1000);
        } else {
            buyItemInterval = 0;
        }
    }

    let intervalList = [
        {action: '提升战力光环', interval: promoteHaloInterval},
        {action: '自动获取每日奖励', interval: getDailyBonusInterval},
        {action: '自动购买物品', interval: buyItemInterval},
    ];
    let minAction = '', minInterval = -1;
    for (let {action, interval} of intervalList.filter(data => data.interval > -1)) {
        if (minInterval < 0 || interval < minInterval) {
            minAction = action;
            minInterval = interval;
        }
    }
    return {action: minInterval > 0 ? minAction : '', interval: minInterval + 1};
};

/**
 * 启动定时模式
 */
export const startTimingMode = function () {
    let {action, interval} = getNextTimingIntervalInfo();
    if (interval === -1) return;
    let oriTitle = document.title;
    let titleItvFunc = null;
    let prevInterval = -1, errorNum = 0;

    /**
     * 获取经过格式化的倒计时标题
     * @param {number} type 倒计时显示类型，1：[小时:][分钟:]秒钟；2：[小时:]分钟
     * @param {number} interval 倒计时
     * @returns {string} 经过格式化的倒计时标题
     */
    const getFormatIntervalTitle = function (type, interval) {
        let diff = Util.getTimeDiffInfo(Util.getDate('+' + interval + 's').getTime());
        let textInterval = diff.hours > 0 ? diff.hours + '时' : '';
        if (type === 1) textInterval += (diff.minutes > 0 ? diff.minutes + '分' : '') + diff.seconds + '秒';
        else textInterval += diff.minutes + '分';
        return textInterval;
    };

    /**
     * 显示定时模式标题提示
     * @param {number} interval 倒计时的时间间隔（秒）
     * @param {string} action 下次操作的名称
     * @param {boolean} isShowTitle 是否立即显示标题
     */
    const showRefreshModeTips = function (interval, action = '', isShowTitle = false) {
        if (titleItvFunc) window.clearInterval(titleItvFunc);
        let showInterval = interval;
        console.log(`【定时模式】倒计时${action ? `(${action})` : ''}：` + getFormatIntervalTitle(1, showInterval));
        if (Config.showTimingModeTipsType.toLowerCase() !== 'never') {
            const showIntervalTitle = function () {
                document.title = `${oriTitle} (定时: ${getFormatIntervalTitle(interval < 60 ? 1 : 2, showInterval)})`;
                showInterval = interval < 60 ? showInterval - 1 : showInterval - 60;
            };
            if (isShowTitle || Config.showTimingModeTipsType.toLowerCase() === 'always' || interval < 60) showIntervalTitle();
            else showInterval = interval < 60 ? showInterval - 1 : showInterval - 60;
            titleItvFunc = setInterval(showIntervalTitle, Const.showRefreshModeTipsInterval * 60 * 1000);
        }
    };

    /**
     * 处理错误
     */
    const handleError = function () {
        let interval = 0, errorText = '';
        $.ajax({
            type: 'GET',
            url: 'index.php?t=' + $.now(),
            timeout: Const.defAjaxTimeout,
            success(html) {
                if (!/"kf_fw_ig_index.php"/.test(html)) {
                    interval = 10;
                    errorText = '论坛维护或其它未知情况';
                }
            },
            error() {
                interval = Const.errorRefreshInterval;
                errorText = '连接超时';
            },
            complete() {
                if (interval > 0) {
                    console.log(`定时操作失败（原因：${errorText}），将在${interval}分钟后重试...`);
                    Msg.remove($('.pd_refresh_notice').parent());
                    Msg.show(`<strong class="pd_refresh_notice">定时操作失败（原因：${errorText}），将在<em>${interval}</em>分钟后重试&hellip;</strong>`, -1);
                    setTimeout(handleError, interval * 60 * 1000);
                    showRefreshModeTips(interval * 60, '', true);
                } else {
                    if (errorNum > 6) {
                        errorNum = 0;
                        interval = 15;
                        setTimeout(checkRefreshInterval, interval * 60 * 1000);
                        showRefreshModeTips(interval * 60, '', true);
                    } else {
                        errorNum++;
                        checkRefreshInterval();
                    }
                }
            }
        });
    };

    /**
     * 检查刷新间隔
     */
    const checkRefreshInterval = function () {
        Msg.remove($('.pd_refresh_notice').parent());

        $(document).clearQueue('AutoAction');

        if (Config.autoPromoteHaloEnabled && !Util.getCookie(Const.promoteHaloCookieName)) {
            $(document).queue('AutoAction', () => Loot.getPromoteHaloInfo());
        }

        if (Config.autoGetDailyBonusEnabled && !Util.getCookie(Const.getDailyBonusCookieName)) {
            $(document).queue('AutoAction', () => getDailyBonus());
        }

        if (Config.autoBuyItemEnabled && !Util.getCookie(Const.buyItemCookieName) && !Util.getCookie(Const.buyItemReadyCookieName)) {
            $(document).queue('AutoAction', () => Item.buyItems(Config.buyItemIdList));
        }

        $(document).dequeue('AutoAction');

        let {action, interval} = getNextTimingIntervalInfo();
        if (interval > 0) errorNum = 0;
        if (interval === 0 && prevInterval === 0) {
            prevInterval = -1;
            handleError();
            return;
        } else prevInterval = interval;
        if (interval === -1) {
            if (titleItvFunc) clearInterval(titleItvFunc);
            return;
        } else if (interval === 0) interval = Const.actionFinishRetryInterval;
        setTimeout(checkRefreshInterval, interval * 1000);
        showRefreshModeTips(interval, action, true);
    };

    setTimeout(checkRefreshInterval, interval < 60 ? 60 * 1000 : interval * 1000);
    showRefreshModeTips(interval < 60 ? 60 : interval, action);
};

/**
 * 领取每日奖励
 */
export const getDailyBonus = function () {
    Script.runFunc('Public.getDailyBonus_before_');
    console.log('领取每日奖励Start');
    let $wait = Msg.wait('<strong>正在领取每日奖励，请稍候&hellip;</strong>');

    /**
     * 获取领取每日奖励Cookies有效期
     * @returns {Date} Cookies有效期的Date对象
     */
    const getCookieDate = function () {
        let date = Util.getTimezoneDateByTime(Const.getDailyBonusAfterTime);
        date.setDate(date.getDate() + 1);
        if (new Date() > date) date.setDate(date.getDate() + 1);
        return date;
    };

    $.ajax({
        type: 'GET',
        url: 'kf_growup.php?t=' + $.now(),
        timeout: Const.defAjaxTimeout,
    }).done(function (html) {
        let matches = /<a href="(kf_growup\.php\?ok=3&safeid=\w+)" target="_self">你可以领取\s*(\d+)KFB\s*\+\s*(\d+)经验\s*\+\s*(\d+(?:\.\d+)?)贡献/.exec(html);
        if (matches) {
            let url = matches[1];
            let gain = {};
            if (parseInt(matches[2]) > 0) gain['KFB'] = parseInt(matches[2]);
            if (parseInt(matches[3]) > 0) gain['经验值'] = parseInt(matches[3]);
            if (parseFloat(matches[4]) > 0) gain['贡献'] = parseFloat(matches[4]);

            $.get(`${url}&t=${$.now()}`, function (html) {
                showFormatLog('领取每日奖励', html);
                let {msg} = Util.getResponseMsg(html);
                Msg.remove($wait);

                if (/领取成功/.test(msg)) {
                    Util.setCookie(Const.getDailyBonusCookieName, 1, getCookieDate());
                    let logStatText = '', msgStatText = '';
                    for (let [key, num] of Util.entries(gain)) {
                        logStatText += `${key}+${num} `;
                        msgStatText += `<i>${key}<em>+${num.toLocaleString()}</em></i>`;
                    }
                    console.log('领取每日奖励，' + logStatText);
                    Msg.show('<strong>领取每日奖励</strong>' + msgStatText);
                    if (!$.isEmptyObject(gain)) Log.push('领取每日奖励', '领取每日奖励', {gain});
                    if (Config.promoteHaloLimit > 0) Util.deleteCookie(Const.promoteHaloCookieName);
                } else {
                    Util.setCookie(Const.getDailyBonusCookieName, -1, Util.getDate('+5m'));
                }
                Script.runFunc('Public.getDailyBonus_after_', msg);
            }).fail(() => Msg.remove($wait));
        } else {
            Msg.remove($wait);
            Util.setCookie(Const.getDailyBonusCookieName, 1, getCookieDate());
        }
    }).fail(function () {
        Msg.remove($wait);
        $(document).queue('AutoAction', function () {
            setTimeout(getDailyBonus, Const.defAjaxInterval);
        });
    }).always(function () {
        setTimeout(() => $(document).dequeue('AutoAction'), Const.minActionInterval);
    });
};

/**
 * 关注用户
 */
export const followUsers = function () {
    if (!Config.followUserList.length) return;
    if (Info.isInHomePage && Config.highlightFollowUserThreadInHPEnabled) {
        $('.indexlbtc > a').each(function () {
            let $this = $(this);
            let userName = $this.attr('uname');
            if (!userName) return;
            if (Util.inFollowOrBlockUserList(userName, Config.followUserList) > -1) {
                $this.addClass('pd_highlight');
            }
        });
    } else if (location.pathname === '/thread.php') {
        $('a.bl[href^="profile.php?action=show&uid="]').each(function () {
            let $this = $(this);
            if (Util.inFollowOrBlockUserList($this.text(), Config.followUserList) > -1) {
                $this.addClass('pd_highlight');
                if (Config.highlightFollowUserThreadLinkEnabled) {
                    $this.parent('td').prev('td').prev('td').find('div > a[href^="read.php?tid="]').addClass('pd_highlight');
                }
            }
        });
    } else if (location.pathname === '/read.php') {
        $('.readidmsbottom > a[href^="profile.php?action=show"]').each(function () {
            let $this = $(this);
            if (Util.inFollowOrBlockUserList(Util.getFloorUserName($this.text()), Config.followUserList) > -1) {
                if (Config.highlightFollowUserFloorEnabled) {
                    $this.closest('.readtext').addClass('pd_follow_highlight').find('> table > tbody > tr > td:nth-child(2) > div').addClass('pd_follow_highlight');
                } else {
                    $this.closest('.readtext').find('.pd_goto_link').addClass('pd_highlight');
                }
            }
        });
    } else if (location.pathname === '/guanjianci.php' || location.pathname === '/kf_share.php') {
        $('.kf_share1 > tbody > tr > td:last-child').each(function () {
            let $this = $(this);
            if (Util.inFollowOrBlockUserList($this.text(), Config.followUserList) > -1) {
                $this.addClass('pd_highlight');
            }
        });
    } else if (location.pathname === '/search.php') {
        $('.thread1 a[href^="profile.php?action=show&uid="]').each(function () {
            let $this = $(this);
            if (Util.inFollowOrBlockUserList($this.text(), Config.followUserList) > -1) {
                $this.addClass('pd_highlight');
            }
        });
    }
};

/**
 * 屏蔽用户
 */
export const blockUsers = function () {
    if (!Config.blockUserList.length) return;
    let num = 0;
    if (Info.isInHomePage) {
        $('.indexlbtc > a').each(function () {
            let $this = $(this);
            let userName = $this.attr('uname');
            if (!userName) return;
            let index = Util.inFollowOrBlockUserList(userName, Config.blockUserList);
            if (index > -1 && Config.blockUserList[index].type < 2) {
                num++;
                $this.parent('.indexlbtc').remove();
            }
        });
    } else if (location.pathname === '/thread.php') {
        let fid = parseInt($('input[name="f_fid"]:not([value="all"])').val());
        if (!fid) return;
        if (Config.blockUserForumType === 1 && !Config.blockUserFidList.includes(fid)) return;
        else if (Config.blockUserForumType === 2 && Config.blockUserFidList.includes(fid)) return;
        $('a.bl[href^="profile.php?action=show&uid="]').each(function () {
            let $this = $(this);
            let index = Util.inFollowOrBlockUserList($this.text(), Config.blockUserList);
            if (index > -1 && Config.blockUserList[index].type < 2) {
                num++;
                $this.closest('tr').remove();
            }
        });
    } else if (location.pathname === '/read.php') {
        if (Config.blockUserForumType > 0) {
            let fid = parseInt($('input[name="fid"]:first').val());
            if (!fid) return;
            if (Config.blockUserForumType === 1 && !Config.blockUserFidList.includes(fid)) return;
            else if (Config.blockUserForumType === 2 && Config.blockUserFidList.includes(fid)) return;
        }
        let page = Util.getCurrentThreadPage();
        $('.readidmsbottom > a[href^="profile.php?action=show"]').each(function (i) {
            let $this = $(this);
            let index = Util.inFollowOrBlockUserList(Util.getFloorUserName($this.text()), Config.blockUserList);
            if (index > -1) {
                let type = Config.blockUserList[index].type;
                if (i === 0 && page === 1 && type > 1) return;
                else if ((i === 0 && page !== 1 || i > 0) && type === 1) return;
                num++;
                let $floor = $this.closest('.readtext');
                $floor.prev('.readlou').remove();
                $floor.remove();
            }
        });
        $('.readtext fieldset:has(legend:contains("Quote:"))').each(function () {
            let $this = $(this);
            let text = $this.text();
            for (let data of Config.blockUserList) {
                if (data.type === 1) continue;
                try {
                    let regex1 = new RegExp(`^Quote:引用(第\\d+楼|楼主)${data.name}于`, 'i');
                    let regex2 = new RegExp(`^Quote:回\\s*\\d+楼\\(${data.name}\\)\\s*的帖子`, 'i');
                    if (regex1.test(text) || regex2.test(text)) {
                        $this.html(`<legend>Quote:</legend><mark class="pd_custom_tips" title="被屏蔽用户：${data.name}">该用户已被屏蔽</mark>`);
                    }
                } catch (ex) {
                }
            }
        });
    } else if (location.pathname === '/guanjianci.php' && Config.blockUserAtTipsEnabled) {
        $('.kf_share1 > tbody > tr > td:last-child').each(function () {
            let $this = $(this);
            if (Util.inFollowOrBlockUserList($this.text(), Config.blockUserList) > -1) {
                num++;
                $this.closest('tr').remove();
            }
        });
    }
    if (num > 0) console.log(`【屏蔽用户】共有${num}个帖子或回复被屏蔽`);
};

/**
 * 屏蔽帖子
 */
export const blockThread = function () {
    if (!Config.blockThreadList.length) return;

    /**
     * 是否屏蔽帖子
     * @param {string} title 帖子标题
     * @param {string} userName 用户名
     * @param {number} fid 版块ID
     * @returns {boolean} 是否屏蔽
     */
    const isBlock = function (title, userName, fid = 0) {
        for (let {keyWord, includeUser, excludeUser, includeFid, excludeFid} of Config.blockThreadList) {
            let regex = null;
            if (/^\/.+\/[gimuy]*$/.test(keyWord)) {
                try {
                    regex = eval(keyWord);
                } catch (ex) {
                    console.log(ex);
                    continue;
                }
            }
            if (userName) {
                if (includeUser) {
                    if (!includeUser.includes(userName)) continue;
                } else if (excludeUser) {
                    if (excludeUser.includes(userName)) continue;
                }
            }
            if (fid) {
                if (includeFid) {
                    if (!includeFid.includes(fid)) continue;
                } else if (excludeFid) {
                    if (excludeFid.includes(fid)) continue;
                }
            }
            if (regex) {
                if (regex.test(title)) return true;
            } else {
                if (title.toLowerCase().includes(keyWord.toLowerCase())) return true;
            }
        }
        return false;
    };

    /**
     * 屏蔽左侧帖子推荐榜单
     * @param $area 屏蔽区域
     * @return {number} 屏蔽数量
     */
    const blockRecommendThread = function ($area) {
        let tmpNum = 0;
        $area.each(function () {
            let $this = $(this);
            let title = $this.attr('title');
            if (!title) return;
            let matches = /^《(.+)》$/.exec(title);
            if (matches) {
                if (isBlock(matches[1], '')) {
                    tmpNum++;
                    $this.next('br').remove();
                    $this.remove();
                }
            }
        });
        return tmpNum;
    };

    let num = 0;
    if (Info.isInHomePage) {
        num += blockRecommendThread($('.rightboxa a'));
        $('.indexlbtc a').each(function () {
            let $this = $(this);
            let title = $this.attr('title');
            if (!title) return;
            let matches = /^《(.+)》$/.exec(title);
            if (matches) {
                let uname = $this.attr('uname');
                if (isBlock(matches[1], uname)) {
                    num++;
                    $this.parent('.indexlbtc').remove();
                }
            }
        });
    } else if (location.pathname === '/thread.php') {
        num += blockRecommendThread($('.rightboxa a'));
        let fid = parseInt($('input[name="f_fid"]:not([value="all"])').val());
        if (!fid) return;
        $('.threadtit1 a[href^="read.php"]').each(function () {
            let $this = $(this);
            if (isBlock($this.text(), $this.closest('tr').find('td:last-child > a.bl').text(), fid)) {
                num++;
                $this.closest('tr').remove();
            }
        });
    } else if (location.pathname === '/read.php') {
        if (Util.getCurrentThreadPage() !== 1) return;
        let title = Read.getThreadTitle();
        if (!title) return;
        let $userName = $('.readidmsbottom > a[href^="profile.php?action=show"]').eq(0);
        if (!$userName.closest('.readtext').find('> table > tbody > tr > td:nth-child(2) > div > div:nth-child(2) > span:first-child').text().includes('楼主')) return;
        let userName = Util.getFloorUserName($userName.text());
        if (!userName) return;
        let fid = parseInt($('input[name="fid"]:first').val());
        if (!fid) return;
        if (isBlock(title, userName, fid)) {
            num++;
            let $floor = $userName.closest('.readtext');
            $floor.prev('.readlou').remove();
            $floor.remove();
        }
    }
    else {
        num += blockRecommendThread($('.rightboxa a'));
    }
    if (num > 0) console.log(`【屏蔽帖子】共有${num}个帖子被屏蔽`);
};

/**
 * 为顶部导航栏添加快捷导航菜单
 */
export const addFastNavMenu = function () {
        let $menuBtn = $('#alldiv > .drow:nth-child(2) > .dcol > .topmenuo > .topmenuo1 > .topmenuo3:last-child > a:contains("游戏介绍")');
        if (!$menuBtn.length) return;
        $menuBtn.parent().after(`
<li class="topmenuo3">
  <a href="javascript:;" style="width:100px;">快捷导航</a>
  <ul class="topmenuo2">
      ${Info.isInSpecialDomain && !Config.showGuGuZhenInFastNavEnabled ? '' : '<li><a href="fyg_sjcdwj.php?go=play" target="_blank">咕咕镇</a></li>'}
      <li><a href="search.php?authorid=${Info.uid}">我的主题</a></li>
      <li><a href="personal.php?action=post">我的回复</a></li>
      <li><a href="profile.php?action=favor">收藏</a></li>
      <li><a href="profile.php?action=friend">好友列表</a></li>
      <li><a href="kf_fw_ig_index.php">争夺奖励</a></li>
      <li><a href="kf_fw_ig_mybp.php">我的物品</a></li>
      <li><a href="kf_fw_ig_halo.php">战力光环</a></li>
      <li><a href="kf_fw_ig_shop.php">物品商店</a></li>
      ${Info.isInSpecialDomain ? '<li><a href="https://m.miaola.work/" target="_blank">手机版</a></li>' : ''}
      ${Const.customFastNavMenuContent}
  </ul>
</li>`);

        if (Config.adminMemberEnabled) {
            $('#alldiv > .drow:nth-child(2) > .dcol > .topmenuo > .topmenuo1 > .topmenuo3:nth-last-child(4) > a:contains("聊天交流")').next('ul').append(
                '<li><a href="thread.php?fid=93">内部管理专用</a></li>'
            );
        }
    }

;

/**
 * 更换ID颜色
 */
export const changeIdColor = function () {
    if (!Config.changeAllAvailableIdColorEnabled && Config.customAutoChangeIdColorList.length <= 1) return;

    /**
     * 写入Cookie
     */
    const setCookie = function () {
        let nextTime = Util.getDate(`+${Config.autoChangeIdColorInterval}h`);
        Util.setCookie(Const.autoChangeIdColorCookieName, nextTime.getTime(), nextTime);
    };

    console.log('自动更换ID颜色Start');
    $.get('kf_growup.php?t=' + $.now(), function (html) {
        if (Util.getCookie(Const.autoChangeIdColorCookieName)) return;
        let matches = html.match(/href="kf_growup\.php\?ok=2&safeid=\w+&color=\d+"/g);
        if (matches) {
            let safeId = '';
            let safeIdMatches = /safeid=(\w+)&/i.exec(matches[0]);
            if (safeIdMatches) safeId = safeIdMatches[1];
            if (!safeId) {
                setCookie();
                return;
            }

            let availableIdList = [];
            for (let i in matches) {
                let idMatches = /color=(\d+)/i.exec(matches[i]);
                if (idMatches) availableIdList.push(parseInt(idMatches[1]));
            }

            let idList = availableIdList;
            if (!Config.changeAllAvailableIdColorEnabled) {
                idList = [];
                for (let id of Config.customAutoChangeIdColorList) {
                    if (availableIdList.includes(id)) idList.push(id);
                }
            }
            if (idList.length <= 1) {
                setCookie();
                return;
            }

            let prevId = parseInt(TmpLog.getValue(Const.prevAutoChangeIdColorTmpLogName));
            if (isNaN(prevId) || prevId < 0) prevId = 0;

            let nextId = 0;
            if (Config.autoChangeIdColorType.toLowerCase() === 'sequence') {
                for (let [i, id] of idList.entries()) {
                    if (id > prevId) {
                        nextId = id;
                        break;
                    }
                }
                if (nextId === 0) nextId = idList[0];
            } else {
                for (let [i, id] of idList.entries()) {
                    if (id === prevId) {
                        idList.splice(i, 1);
                        break;
                    }
                }
                nextId = idList[Math.floor(Math.random() * idList.length)];
            }

            $.get(
                `kf_growup.php?ok=2&safeid=${safeId}&color=${nextId}&t=${$.now()}`

                , function (html) {
                    setCookie();
                    showFormatLog('自动更换ID颜色', html);
                    let {msg} = Util.getResponseMsg(html);
                    if (/等级颜色修改完毕/.test(msg)) {
                        console.log('ID颜色更换为：' + nextId);
                        TmpLog.setValue(Const.prevAutoChangeIdColorTmpLogName, nextId);
                    }
                });
        } else {
            setCookie();
        }
    });
};

/**
 * 显示元素的title属性提示（用于移动版浏览器）
 * @param {{}} e 点击事件
 * @param {string} title title属性
 */
export const showElementTitleTips = function (e, title) {
    $('.pd_title_tips').remove();
    if (!title || !e.originalEvent) return;
    $(`<div class="pd_title_tips">${title.replace(/\n/g, '<br>')}</div>`)
        .appendTo('body')
        .css('left', e.originalEvent.pageX - 20)
        .css('top', e.originalEvent.pageY + 15);
};

/**
 * 绑定包含title属性元素的点击事件（用于移动版浏览器）
 */
export const bindElementTitleClick = function () {
    let excludeNodeNameList = ['A', 'IMG', 'INPUT', 'BUTTON', 'TEXTAREA', 'SELECT'];
    $(document).click(function (e) {
        let target = e.target;
        if (!target.title && !excludeNodeNameList.includes(target.nodeName) && target.parentNode && target.parentNode.title)
            target = target.parentNode;
        if (target.title && !excludeNodeNameList.includes(target.nodeName) &&
            (!target.id || !target.id.startsWith('wy_')) && !$(target).is('.pd_editor_btn')
        ) {
            showElementTitleTips(e, target.title);
        } else {
            $('.pd_title_tips').remove();
        }
    });
};

/**
 * 绑定搜索类型下拉菜单点击事件
 */
export const bindSearchTypeSelectMenuClick = function () {
    $(document).on('click', '.pd_search_type', function () {
        let $menu = $(this);
        let $searchTypeList = $('.pd_search_type_list');
        if ($searchTypeList.length > 0) {
            $searchTypeList.remove();
            return;
        }
        let type = $menu.data('type');
        $searchTypeList = $(`
<ul class="pd_search_type_list">
  <li>标题</li><li>作者</li><li>关键词</li><li ${!Config.adminMemberEnabled ? 'hidden' : ''}>用户名</li>
</ul>`).appendTo('body');
        let offset = $menu.offset();
        $searchTypeList.css('top', offset.top + $menu.height() + 2).css('left', offset.left + 1);
        if (type === 'dialog') {
            $searchTypeList.css({
                'width': '65px',
                'left': offset.left - 1
            });
        }
        $searchTypeList.on('click', 'li', function () {
            let $this = $(this);
            let type = $this.text().trim();
            let $form = $menu.closest('form');
            let $keyWord = $form.find('input[name="keyword"], input[name="pwuser"]');
            $menu.find('span').text(type);
            if (type !== '关键词' && type !== '用户名') $form.attr('action', 'search.php?');
            if (type === '作者') $keyWord.attr('name', 'pwuser');
            else $keyWord.attr('name', 'keyword');
            let $searchRange = $form.find('[name="searchRange"][value="current"]');
            if ($searchRange.length > 0) {
                $searchRange.prop('disabled', type === '关键词' || type === '用户名' || !$searchRange.data('enabled'));
            }
            $searchTypeList.remove();
            $keyWord.focus();
        });
    });

    $(document).on('submit', 'form[name="pdSearchForm"]', function () {
        let $this = $(this);
        let type = $.trim($this.find('.pd_search_type > span').text());
        if (type === '关键词') {
            $this.attr('action', 'guanjianci.php?gjc=' + $this.find('input[name="keyword"]').val());
        } else if (type === '用户名') {
            $this.attr('action', 'profile.php?action=show&username=' + $this.find('input[name="keyword"]').val());
        }
    });
};

/**
 * 可使用2个字以下的关键字进行搜索
 */
export const makeSearchByBelowTwoKeyWordAvailable = function () {
    $(document).on('submit', 'form[action="search.php?"]', function () {
        let $this = $(this);
        let $keyWord = $this.find('input[name="keyword"]');
        if (!$keyWord.length) return;
        let keyWord = $.trim($keyWord.val());
        if (!keyWord || Util.getStrByteLen(keyWord) > 2) return;
        $keyWord.val(keyWord + ' ' + keyWord);
        setTimeout(() => {
            $keyWord.val(keyWord);
        }, 200);
    });
};

/**
 * 添加搜索对话框链接
 */
export const addSearchDialogLink = function () {
    $('<li><a data-name="search" href="#">搜索</a></li>')
        .insertBefore(Info.$userMenu.find('> li:nth-last-child(3)'))
        .find('[data-name="search"]')
        .click(function (e) {
            e.preventDefault();
            const dialogName = 'pdSearchDialog';
            if ($('#' + dialogName).length > 0) return;
            let html = `
<div class="pd_cfg_main">
  <input name="step" value="2" type="hidden">
  <input name="method" value="AND" type="hidden">
  <input name="sch_area" value="0" type="hidden">
  <input name="s_type" value="forum" type="hidden">
  <input name="f_fid" value="all" type="hidden">
  <input name="orderway" value="lastpost" type="hidden">
  <input name="asc" value="DESC" type="hidden">
  <div style="margin-top: 15px;">
    <input class="pd_input" name="keyword" type="search" style="float: left; width: 175px; line-height: 26px;" placeholder="关键字">
    <div class="pd_search_type" data-type="dialog"><span>标题</span><i>∨</i></div>
    <button class="indloginm" name="submit" type="submit">搜索</button>
  </div>
  <div style="margin-bottom: 8px; line-height: 35px;">
    <label><input name="searchRange" type="radio" value="all" checked> 全站 </label>
    <label><input name="searchRange" type="radio" value="current" disabled> 本版</label>
  </div>
</div>`;
            let $dialog = Dialog.create(dialogName, '搜索', html);

            $dialog.closest('form').attr({
                'name': 'pdSearchForm',
                'action': 'search.php?',
                'method': 'post',
                'target': '_blank',
            }).off('submit');

            let fid = parseInt($('input[name="f_fid"]:not([value="all"]), input[name="fid"]:first').val());
            if (fid) {
                $dialog.find('[name="searchRange"]').click(function () {
                    let $this = $(this);
                    $dialog.find('input[name="f_fid"]').val($this.val() === 'current' ? fid : 'all');
                });
                $dialog.find('[name="searchRange"][value="current"]').prop('disabled', false).data('enabled', true).click();
            }

            $dialog.keydown(function (e) {
                if (e.keyCode === 27) {
                    $('.pd_search_type_list').remove();
                }
            }).find('h1 > span').click(function () {
                $('.pd_search_type_list').remove();
            });

            Dialog.show(dialogName);
            $dialog.find('[name="keyword"]').focus();
        });
};

/**
 * 修复论坛错误代码
 */
export const repairBbsErrorCode = function () {
    Info.w.is_ie = false;
    if (location.pathname === '/read.php') Info.w.strlen = Util.getStrByteLen;
};

/**
 * 通过左右键进行翻页
 */
export const turnPageViaKeyboard = function () {
    $(document).keydown(function (e) {
        if (e.keyCode !== 37 && e.keyCode !== 39) return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        let $page = $('.pages:first');
        let $curPage = $page.find('li > a[href="javascript:;"]');
        if (!$curPage.length) return;
        let curPage = Util.getCurrentThreadPage();
        let url = '';
        if (e.keyCode === 37) {
            if (curPage <= 1) return;
            url = $page.find('li > a:contains("上一页")').attr('href');
        } else {
            let matches = /&page=(\d+)/.exec($page.find('li:last-child > a').attr('href'));
            if (!matches) return;
            if (curPage >= parseInt(matches[1])) return;
            url = $page.find('li > a:contains("下一页")').attr('href');
        }
        location.href = url;
    });
};

/**
 * 显示通用的导入/导出设置对话框
 * @param {string} title 对话框标题
 * @param {string|{}} configName 设置名称或设置方法对象
 * @param {function} configName.read 读取设置的方法
 * @param {function} configName.write 写入设置的方法
 * @param {?function} [callback] 回调方法
 * @param {?function} [callbackAfterSubmit] 在提交之后的回调方法
 */
export const showCommonImportOrExportConfigDialog = function (title, configName, callback, callbackAfterSubmit) {
    const dialogName = 'pdCommonImOrExConfigDialog';
    if ($('#' + dialogName).length > 0) return;
    readConfig();
    let html = `
<div class="pd_cfg_main">
  <div>
    <strong>导入设置：</strong>将设置内容粘贴到文本框中并点击保存按钮即可<br>
    <strong>导出设置：</strong>复制文本框里的内容并粘贴到别处即可
  </div>
  <textarea name="commonConfig" style="width: 500px; height: 300px; word-break: break-all;"></textarea>
</div>
<div class="pd_cfg_btns">
  <span class="pd_cfg_about"></span>
  <button type="submit">保存</button>
  <button data-action="close" type="button">取消</button>
</div>`;
    let $dialog = Dialog.create(dialogName, `导入或导出${title}`, html);
    let settings = $.type(configName) === 'object' ? configName.read() : Config[configName];

    $dialog.submit(function (e) {
        e.preventDefault();
        if (!confirm('是否导入文本框中的设置？')) return;
        let options = $.trim($dialog.find('[name="commonConfig"]').val());
        if (!options) return;
        try {
            options = JSON.parse(options);
        } catch (ex) {
            alert('设置有错误');
            return;
        }
        if (!options || $.type(options) !== $.type(settings)) {
            alert('设置有错误');
            return;
        }
        if ($.type(configName) === 'object') {
            configName.write(options);
        } else {
            Config[configName] = options;
            writeConfig();
        }
        alert('设置已导入');
        Dialog.close(dialogName);
        if (typeof callbackAfterSubmit === 'function') callbackAfterSubmit();
        else location.reload();
    });
    Dialog.show(dialogName);
    $dialog.find('[name="commonConfig"]').val(JSON.stringify(settings)).select().focus();
    if (typeof callback === 'function') callback($dialog);
    Script.runFunc('Public.showCommonImportOrExportConfigDialog_after_', {title, configName});
};

/**
 * 显示通用的导入/导出记录对话框
 * @param {string} name 记录名称
 * @param {function} read 读取记录的方法
 * @param {function} write 写入记录的方法
 * @param {function} [merge] 获取合并后记录的方法
 * @param {function} [callback] 回调方法
 * @param {function} [callbackAfterSubmit] 在提交之后的回调方法
 */
export const showCommonImportOrExportLogDialog = function ({name, read, write, merge, callback, callbackAfterSubmit}) {
    const dialogName = 'pdCommonImOrExLogDialog';
    if ($('#' + dialogName).length > 0) return;
    let log = read();
    let html = `
<div class="pd_cfg_main">
  <strong>导入${name}：</strong>将${name}内容粘贴到文本框中并点击合并或覆盖按钮即可<br>
  <strong>导出${name}：</strong>复制文本框里的内容并粘贴到别处即可<br>
  <textarea name="log" style="width: 600px; height: 400px; word-break: break-all;"></textarea>
</div>
<div class="pd_cfg_btns">
  <button name="merge" type="button" ${typeof merge !== 'function' ? 'hidden' : ''}>合并记录</button>
  <button name="overwrite" type="button" style="color: #f00;">覆盖记录</button>
  <button data-action="close" type="button">关闭</button>
</div>`;

    let $dialog = Dialog.create(dialogName, `导入或导出${name}`, html);
    $dialog.find('[name="merge"], [name="overwrite"]').click(function (e) {
        e.preventDefault();
        let action = $(this).attr('name');
        if (!confirm(`是否将文本框中的${name}${action === 'overwrite' ? '覆盖' : '合并'}到本地？`)) return;
        let newLog = $.trim($dialog.find('[name="log"]').val());
        if (!newLog) return;
        try {
            newLog = JSON.parse(newLog);
        } catch (ex) {
            alert(`${name}有错误`);
            return;
        }
        if (!newLog || $.type(newLog) !== 'object') {
            alert(`${name}有错误`);
            return;
        }
        if (action === 'merge' && typeof merge === 'function') log = merge(log, newLog);
        else log = newLog;
        write(log);
        alert(`${name}已导入`);
        if (typeof callbackAfterSubmit === 'function') callbackAfterSubmit();
        else location.reload();
    });

    Dialog.show(dialogName);
    $dialog.find('[name="log"]').val(JSON.stringify(log)).select().focus();
    if (typeof callback === 'function') callback($dialog);
    Script.runFunc('Public.showCommonImportOrExportLogDialog_after_', {name, read, write, merge});
};

/**
 * 修改顶部导航栏的用户名旁新提醒的颜色
 */
export const changeNewTipsColor = function () {
    let $msgTips = $('#pdUserName').find('span:first');
    if (!$msgTips.length) return;
    $msgTips.addClass('pd_new_tips');
    if (Info.$userMenu.find('a[href="message.php"]:contains("有新消息")').length > 0) {
        $msgTips.attr('id', 'pdNewMsgTips').css({'color': '#0099cc'});
    } else if (Info.$userMenu.find('a[href^="guanjianci.php?gjc="]:contains("有人@我")').length > 0) {
        $msgTips.attr('id', 'pdNewReplyTips');
    } else if (Info.$userMenu.find('a[href="kf_fw_1wkfb.php?ping=3"]:contains("有新评分")').length > 0) {
        $msgTips.attr('id', 'pdNewRateTips').css({'color': '#5cb85c'});
    }
};

/**
 * 添加慢速操作复选框
 * @param {jQuery} $area 待添加区域
 */
export const addSlowActionChecked = function ($area) {
    $(`
<label style="margin-right: 5px;">
  <input name="slowActionEnabled" type="checkbox" ${Config.slowActionEnabled ? 'checked' : ''}> 慢速操作
  <span class="pd_cfg_tips" title="延长部分批量操作的时间间隔（在3~7秒之间），如使用道具、打开盒子等">[?]</span>
</label>
`).prependTo($area).find('input[name="slowActionEnabled"]').click(function () {
        let checked = $(this).prop('checked');
        $('input[name="slowActionEnabled"]').not(this).prop('checked', checked);
        if (Config.slowActionEnabled !== checked) {
            readConfig();
            Config.slowActionEnabled = checked;
            writeConfig();
        }
    });
};

/**
 * 修改域名更换提示区域
 */
export const modifyDomainTips = function () {
    $('#alldiv > .drow:first-child').has('div:contains("主域名更换")')
        .insertBefore('#alldiv > .drow:last-child').addClass('pd_domain_tips')
        .parent().find('> .drow:first-child').css('margin-top', '40px');
};
