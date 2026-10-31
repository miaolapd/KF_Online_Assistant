// ==UserScript==
// @name        KF Online助手
// @namespace   https://greasyfork.org/users/4514
// @icon        https://gitee.com/miaolapd/KF_Online_Assistant/raw/master/icon.png
// @author      喵拉布丁
// @homepage    https://github.com/miaolapd/KF_Online_Assistant
// @description KFOL必备！为绯月ScarletMoon论坛增加了大量人性化、自动化的功能，更多功能开发中……
// @updateURL   https://gitee.com/miaolapd/KF_Online_Assistant/raw/master/dist/es6/Common.meta.js
// @downloadURL https://gitee.com/miaolapd/KF_Online_Assistant/raw/master/dist/es6/Common.user.js
// @include     https://*kfpromax.com/*
// @include     https://*9shenmi.com/*
// @include     https://*kfmax.com/*
// @include     https://*bakabbs.com/*
// @include     https://*365gal.com/*
// @include     https://*365galgame.com/*
// @include     https://*fygal.com/*
// @version     15.0.0
// @grant       none
// @run-at      document-end
// @license     MIT
// ==/UserScript==
"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __export = (target, all) => {
    for (var name4 in all)
      __defProp(target, name4, { get: all[name4], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/module/Info.js
  var Info_exports = {};
  __export(Info_exports, {
    default: () => Info_default
  });
  var Info, Info_default;
  var init_Info = __esm({
    "src/module/Info.js"() {
      "use strict";
      Info = {
        // 用户ID
        uid: 0,
        // 用户名
        userName: "",
        // 是否位于首页
        isInHomePage: location.pathname === "/" || location.pathname === "/index.php",
        // 是否为移动版
        isMobile: false,
        // 当前域名是否在特殊域名下
        isInSpecialDomain: location.host.endsWith(".miaola.info") || location.host.endsWith(".miaola.work") || location.host.endsWith(".koyuki.cc"),
        // 版本号
        version: "",
        // 当前窗口
        w: typeof unsafeWindow !== "undefined" ? unsafeWindow : window,
        /**
         * 助手设置和日志的存储位置类型
         * Default：存储在浏览器的localStorage中，设置仅按域名区分，日志同时按域名和uid区分；
         * ByUid：存储在油猴脚本的数据库中，设置和日志仅按uid区分;
         * Global：存储在油猴脚本的数据库中，各域名和各uid均使用全局设置，日志仅按uid区分；
         */
        storageType: "Default",
        // 用户菜单区域
        $userMenu: $("#kf_information > ul"),
        // AJAX请求统计
        ajaxStat: {}
      };
      Info_default = Info;
    }
  });

  // src/module/Const.js
  var Const_exports = {};
  __export(Const_exports, {
    default: () => Const_default
  });
  var storagePrefix, Const, Const_default;
  var init_Const = __esm({
    "src/module/Const.js"() {
      "use strict";
      storagePrefix = "pd_";
      Const = {
        // 开启调试模式，true：开启；false：关闭
        debug: false,
        // UTC时间与论坛时间之间的时差（小时）
        forumTimezoneOffset: -8,
        // 在当天的指定时间之后领取每日奖励（北京时间），例：00:20:00
        getDailyBonusAfterTime: "00:20:00",
        // 新装备标志的持续时间（天）
        newArmMarkDuration: 1,
        // 获取自定义的争夺点数分配方案（函数），参考范例见：read.php?tid=500968&spid=13270735&sf=b09
        getCustomPoints: null,
        // 定时操作结束后的再判断间隔（秒），用于在定时模式中进行下一次定时时间的再判断
        actionFinishRetryInterval: 60,
        // 在连接超时的情况下获取剩余时间失败后的重试间隔（分钟），用于定时模式
        errorRefreshInterval: 1,
        // 在网页标题上显示定时模式提示的更新间隔（分钟）
        showRefreshModeTipsInterval: 1,
        // 领取每日争夺奖励时，遇见所设定的任务未完成时的重试间隔（分钟）
        getDailyBonusSpecialInterval: 30,
        // 提升战力光环的最小间隔时间（分钟）
        minPromoteHaloInterval: 480,
        // 在检测到当前持有的KFB或贡献未高于指定值时的下一次自动提升战力光环的间隔时间（分钟）
        promoteHaloLimitNextActionInterval: 480,
        // 进行批量提升战力光环操作的间隔时间（毫秒）
        promoteHaloActionInterval: 1e3,
        // 临时存储的战力光环信息的有效期（分钟）
        tmpHaloInfoExpires: 420,
        // 在尚有剩余次数情况下的存储改点剩余次数信息的Cookie有效期（分钟）
        changePointsInfoExpires: 30,
        // 标记已去除首页已读at高亮提示的Cookie有效期（天）
        hideMarkReadAtTipsExpires: 3,
        // 神秘等级升级的提醒间隔（小时），设为0表示当升级时随时进行提醒
        smLevelUpAlertInterval: 3,
        // 神秘系数排名变化的提醒间隔（小时），设为0表示当排名变化时随时进行提醒
        smRankChangeAlertInterval: 22,
        // ajax请求的默认超时时间（毫秒）
        defAjaxTimeout: 3e4,
        // ajax请求的默认时间间隔（毫秒）
        defAjaxInterval: 300,
        // 特殊情况下的ajax请求（如使用道具、打开盒子等）的时间间隔（毫秒），可设置为函数来返回值
        specialAjaxInterval() {
          if (Config.slowActionEnabled) return Math.floor(Math.random() * 4e3) + 3e3;
          else return Math.floor(Math.random() * 200) + 1e3;
        },
        // 部分操作的最小时间间隔（毫秒）
        minActionInterval: 1e3,
        // 银行相关操作的时间间隔（毫秒）
        bankActionInterval: 5e3,
        // 购买帖子提醒的最低售价（KFB）
        minBuyThreadWarningSell: 6,
        // 统计楼层最大能访问的帖子页数
        statFloorMaxPage: 300,
        // 可进行自助评分的版块ID列表
        selfRateFidList: [41, 67, 92, 127, 68, 163],
        // 自助评分错标范围百分比
        ratingErrorSizePercent: 3,
        // 自定义快捷导航菜单内容
        // 格式：'<li><a href="导航链接">导航项名称</a></li>'
        customFastNavMenuContent: "",
        // 通用存储数据名称前缀
        storagePrefix,
        // 存储多重引用数据的LocalStorage名称
        multiQuoteStorageName: storagePrefix + "multiQuote",
        // 保存发帖内容的SessionStorage名称
        postContentStorageName: storagePrefix + "postContent",
        // 存储临时点数分配记录列表的LocalStorage名称
        tempPointsLogListStorageName: storagePrefix + "tempPointsLogList",
        // 神秘等级升级提醒的临时日志名称
        smLevelUpTmpLogName: "SmLevelUp",
        // 神秘系数排名变化提醒的临时日志名称
        smRankChangeTmpLogName: "SmRankChange",
        // 存储上一次自动更换ID颜色的临时日志名称
        prevAutoChangeIdColorTmpLogName: "PrevAutoChangeIdColor",
        // 存储战力光环信息的临时日志名称
        haloInfoTmpLogName: "HaloInfo",
        // 标记在争夺完后自动一键开盒的临时日志名称
        autoOpenBoxesAfterLootTmpLogName: "AutoOpenBoxesAfterLoot",
        // 标记已领取每日奖励的Cookie名称
        getDailyBonusCookieName: "getDailyBonus",
        // 标记已提升战力光环的Cookie名称
        promoteHaloCookieName: "promoteHalo",
        // 标记正在检查争夺情况的Cookie名称
        lootCheckingCookieName: "lootChecking",
        // 标记正在进行争夺攻击的Cookie名称
        lootAttackingCookieName: "lootAttacking",
        // 存储改点剩余次数信息的Cookie名称
        changePointsInfoCookieName: "changePointsInfo",
        // 标记已完成自动争夺的Cookie名称
        lootCompleteCookieName: "lootComplete",
        // 标记准备购买物品的Cookie名称
        buyItemReadyCookieName: "buyItemReady",
        // 标记已购买物品的Cookie名称
        buyItemCookieName: "buyItem",
        // 标记抽卡的Cookie名称
        drawCardCookieName: "drawCard",
        // 标记已去除首页已读at高亮提示的Cookie名称
        hideReadAtTipsCookieName: "hideReadAtTips",
        // 存储之前已读的at提醒信息的Cookie名称
        prevReadAtTipsCookieName: "prevReadAtTips",
        // 标记已自动更换ID颜色的Cookie名称
        autoChangeIdColorCookieName: "autoChangeIdColor"
      };
      Const_default = Const;
    }
  });

  // src/module/Util.js
  var Util_exports = {};
  __export(Util_exports, {
    addCode: () => addCode,
    ajax: () => ajax,
    compareSmLevel: () => compareSmLevel,
    copyText: () => copyText,
    deepEqual: () => deepEqual,
    deleteCookie: () => deleteCookie,
    deleteData: () => deleteData,
    entries: () => entries,
    getCookie: () => getCookie,
    getCurrentThreadPage: () => getCurrentThreadPage,
    getDate: () => getDate,
    getDateByTime: () => getDateByTime,
    getDateString: () => getDateString,
    getDifferenceSetOfObject: () => getDifferenceSetOfObject,
    getFixedNumLocStr: () => getFixedNumLocStr,
    getFloorUserName: () => getFloorUserName,
    getGBKEncodeString: () => getGBKEncodeString,
    getHostNameUrl: () => getHostNameUrl,
    getMidnightHourDate: () => getMidnightHourDate,
    getObjectKeyList: () => getObjectKeyList,
    getResponseMsg: () => getResponseMsg,
    getSelText: () => getSelText,
    getSortedObjectKeyList: () => getSortedObjectKeyList,
    getStatFormatNumber: () => getStatFormatNumber,
    getStrByteLen: () => getStrByteLen,
    getThreadSfParam: () => getThreadSfParam,
    getTimeDiffInfo: () => getTimeDiffInfo,
    getTimeString: () => getTimeString,
    getTimezoneDateByTime: () => getTimezoneDateByTime,
    getUrlParam: () => getUrlParam,
    htmlDecode: () => htmlDecode,
    htmlEncode: () => htmlEncode,
    inFollowOrBlockUserList: () => inFollowOrBlockUserList,
    isBetweenInTimeRange: () => isBetweenInTimeRange,
    isEdge: () => isEdge,
    isIE: () => isIE,
    isOpera: () => isOpera,
    readData: () => readData,
    removeHtmlTag: () => removeHtmlTag,
    removeUnpairedBBCodeContent: () => removeUnpairedBBCodeContent,
    selectAll: () => selectAll,
    selectInverse: () => selectInverse,
    setCookie: () => setCookie,
    writeData: () => writeData
  });
  var setCookie, getCookie, deleteCookie, getDateByTime, getTimezoneDateByTime, getMidnightHourDate, getDate, getDateString, getTimeString, getTimeDiffInfo, isBetweenInTimeRange, getHostNameUrl, getDifferenceSetOfObject, deepEqual, getUrlParam, getGBKEncodeString, htmlEncode, htmlDecode, removeHtmlTag, getObjectKeyList, getSortedObjectKeyList, getStatFormatNumber, isOpera, isIE, isEdge, compareSmLevel, getCurrentThreadPage, getFixedNumLocStr, removeUnpairedBBCodeContent, getStrByteLen, addCode, getSelText, copyText, getResponseMsg, entries, inFollowOrBlockUserList, selectAll, selectInverse, readData, writeData, deleteData, getThreadSfParam, ajax, getFloorUserName;
  var init_Util = __esm({
    "src/module/Util.js"() {
      "use strict";
      init_Info();
      init_Const();
      setCookie = function(name4, value, date = null, prefix = Info_default.uid + "_" + Const_default.storagePrefix) {
        document.cookie = `${prefix}${name4}=${encodeURI(value)}${!date ? "" : ";expires=" + date.toUTCString()};path=/;`;
      };
      getCookie = function(name4, prefix = Info_default.uid + "_" + Const_default.storagePrefix) {
        let regex2 = new RegExp(`(^| )${prefix}${name4}=([^;]*)(;|$)`);
        let matches = document.cookie.match(regex2);
        if (!matches) return null;
        else return decodeURI(matches[2]);
      };
      deleteCookie = function(name4, prefix = Info_default.uid + "_" + Const_default.storagePrefix) {
        document.cookie = `${prefix}${name4}=;expires=${getDate("-1y").toUTCString()};path=/;`;
      };
      getDateByTime = function(time) {
        let date = /* @__PURE__ */ new Date();
        let [hour, minute, second] = time.split(":");
        if (typeof hour !== "undefined") date.setHours(parseInt(hour));
        if (typeof minute !== "undefined") date.setMinutes(parseInt(minute));
        if (typeof second !== "undefined") date.setSeconds(parseInt(second));
        date.setMilliseconds(0);
        return date;
      };
      getTimezoneDateByTime = function(time, timezoneOffset = Const_default.forumTimezoneOffset) {
        let date = /* @__PURE__ */ new Date();
        let [hour, minute, second] = time.split(":");
        if (typeof hour !== "undefined") date.setUTCHours(parseInt(hour) + timezoneOffset);
        if (typeof minute !== "undefined") date.setUTCMinutes(parseInt(minute));
        if (typeof second !== "undefined") date.setUTCSeconds(parseInt(second));
        date.setUTCMilliseconds(0);
        let now = /* @__PURE__ */ new Date();
        if (now.getDate() > date.getDate() || now.getMonth() > date.getMonth() || now.getFullYear() > date.getFullYear()) {
          date.setDate(date.getDate() + 1);
        }
        return date;
      };
      getMidnightHourDate = function(days) {
        let date = getDateByTime("00:00:00");
        date.setDate(date.getDate() + days);
        return date;
      };
      getDate = function(value) {
        let date = /* @__PURE__ */ new Date();
        let matches = /^(-|\+)?(\d+)([a-zA-Z]{1,2})$/.exec(value);
        if (!matches) return null;
        let flag2 = typeof matches[1] === "undefined" ? 0 : matches[1] === "+" ? 1 : -1;
        let increment = flag2 === -1 ? -parseInt(matches[2]) : parseInt(matches[2]);
        let unit = matches[3];
        switch (unit) {
          case "Y":
            date.setFullYear(increment);
            break;
          case "y":
            date.setFullYear(flag2 === 0 ? increment : date.getFullYear() + increment);
            break;
          case "M":
            date.setMonth(flag2 === 0 ? increment : date.getMonth() + increment);
            break;
          case "d":
            date.setDate(flag2 === 0 ? increment : date.getDate() + increment);
            break;
          case "h":
            date.setHours(flag2 === 0 ? increment : date.getHours() + increment);
            break;
          case "m":
            date.setMinutes(flag2 === 0 ? increment : date.getMinutes() + increment);
            break;
          case "s":
            date.setSeconds(flag2 === 0 ? increment : date.getSeconds() + increment);
            break;
          case "ms":
            date.setMilliseconds(flag2 === 0 ? increment : date.getMilliseconds() + increment);
            break;
          default:
            return null;
        }
        return date;
      };
      getDateString = function(date, separator = "-") {
        date = date ? date : /* @__PURE__ */ new Date();
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();
        return date.getFullYear() + separator + month.padStart(2, "0") + separator + day.padStart(2, "0");
      };
      getTimeString = function(date = /* @__PURE__ */ new Date(), separator = ":", isShowSecond = true) {
        let hour = date.getHours().toString();
        let minute = date.getMinutes().toString();
        let second = date.getSeconds().toString();
        return hour.padStart(2, "0") + separator + minute.padStart(2, "0") + (isShowSecond ? separator : "") + (isShowSecond ? second.padStart(2, "0") : "");
      };
      getTimeDiffInfo = function(timestamp) {
        let diff = timestamp - $.now();
        if (diff > 0) {
          diff = Math.floor(diff / 1e3);
          let hours = Math.floor(diff / 60 / 60);
          if (hours >= 0) {
            let minutes = Math.floor((diff - hours * 60 * 60) / 60);
            if (minutes < 0) minutes = 0;
            let seconds = Math.floor(diff - hours * 60 * 60 - minutes * 60);
            if (seconds < 0) seconds = 0;
            return { hours, minutes, seconds };
          }
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      };
      isBetweenInTimeRange = function(time, range) {
        let [range1, range2] = range.split("-");
        if (typeof range2 === "undefined") return null;
        let start = getDateByTime(range1);
        let end = getDateByTime(range2);
        if (end < start) {
          if (time > end) end.setDate(end.getDate() + 1);
          else start.setDate(start.getDate() - 1);
        }
        return time >= start && time <= end;
      };
      getHostNameUrl = function() {
        return `${location.protocol}//${location.host}/`;
      };
      getDifferenceSetOfObject = function(a, b) {
        let c = {};
        if ($.type(a) !== "object" || $.type(b) !== "object") return c;
        $.each(b, (key, data) => {
          if (key in a) {
            if (!deepEqual(a[key], data)) c[key] = data;
          }
        });
        return c;
      };
      deepEqual = function(a, b) {
        if (a === b) return true;
        if ($.type(a) !== $.type(b)) return false;
        if (typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b)) return true;
        if ($.isArray(a) && $.isArray(b) || $.type(a) === "object" && $.type(b) === "object") {
          if (a.length !== b.length) return false;
          for (let i in $.extend($.isArray(a) ? [] : {}, a, b)) {
            if (typeof a[i] === "undefined" || typeof b[i] === "undefined") return false;
            if (!deepEqual(a[i], b[i])) return false;
          }
          return true;
        }
        return false;
      };
      getUrlParam = function(name4) {
        let regex2 = new RegExp("(^|&)" + name4 + "=([^&]*)(&|$)");
        let matches = location.search.substring(1).match(regex2);
        if (matches) return decodeURI(matches[2]);
        else return null;
      };
      getGBKEncodeString = function(str) {
        let img = document.createElement("img");
        img.src = "nothing?sp=" + str;
        document.body.appendChild(img);
        let encodeStr = img.src.split("nothing?sp=").pop();
        document.body.removeChild(img);
        return encodeStr;
      };
      htmlEncode = function(str) {
        if (!str.length) return "";
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;").replace(/\'/g, "&#39;").replace(/\"/g, "&quot;").replace(/\n/g, "<br>");
      };
      htmlDecode = function(str) {
        if (!str.length) return "";
        return str.replace(/<br\s*\/?>/gi, "\n").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'").replace(/&nbsp;/gi, " ").replace(/&gt;/gi, ">").replace(/&lt;/gi, "<").replace(/&amp;/gi, "&");
      };
      removeHtmlTag = (html2) => html2 ? html2.replace(/<br\s*\/?>/g, "\n").replace(/<[^>]+>/g, "") : "";
      getObjectKeyList = function(obj, sortBy = 0) {
        let list = [];
        if ($.type(obj) !== "object") return list;
        for (let key in obj) {
          list.push(key);
        }
        if (sortBy !== 0) {
          list.sort((a, b) => sortBy > 0 ? a > b ? 1 : -1 : a < b ? 1 : -1);
        }
        return list;
      };
      getSortedObjectKeyList = function(sortKeyList, obj) {
        let list = getObjectKeyList(obj);
        list.sort((a, b) => sortKeyList.indexOf(a) > sortKeyList.indexOf(b) ? 1 : -1);
        return list;
      };
      getStatFormatNumber = (num2) => num2 >= 0 ? `<em>+${num2.toLocaleString()}</em>` : `<ins>${num2.toLocaleString()}</ins>`;
      isOpera = () => typeof Info_default.w.opera !== "undefined";
      isIE = () => typeof navigator.msMaxTouchPoints !== "undefined";
      isEdge = () => navigator.appVersion && navigator.appVersion.includes("Edge");
      compareSmLevel = function(a, b) {
        let x = a.toUpperCase() === "MAX" ? Number.MAX_VALUE : parseInt(a);
        let y = b.toUpperCase() === "MAX" ? Number.MAX_VALUE : parseInt(b);
        if (x > y) return 1;
        else if (x < y) return -1;
        else return 0;
      };
      getCurrentThreadPage = function() {
        let matches = /- (\d+) -/.exec($('.pages:first > li > a[href="javascript:;"]').text());
        return matches ? parseInt(matches[1]) : 1;
      };
      getFixedNumLocStr = function(num2, digit = 0) {
        let [iNum, dNum] = num2.toFixed(digit).split(".");
        let iStr = parseInt(iNum).toLocaleString();
        let dStr = "";
        if (typeof dNum !== "undefined") dStr = "." + dNum;
        return iStr + dStr;
      };
      removeUnpairedBBCodeContent = function(content) {
        let startCodeList = [
          /\[color=.+?\]/g,
          /\[backcolor=.+?\]/g,
          /\[size=.+?\]/g,
          /\[font=.+?\]/g,
          /\[align=.+?\]/g,
          /\[b\]/g,
          /\[i\]/g,
          /\[u\]/g,
          /\[strike\]/g,
          /\[sup\]/g,
          /\[sub\]/g
        ];
        let endCodeList = [
          /\[\/color\]/g,
          /\[\/backcolor\]/g,
          /\[\/size\]/g,
          /\[\/font\]/g,
          /\[\/align\]/g,
          /\[\/b\]/g,
          /\[\/i\]/g,
          /\[\/u\]/g,
          /\[\/strike\]/g,
          /\[\/sup\]/g,
          /\[\/sub\]/g
        ];
        for (let i = 0; i < startCodeList.length; i++) {
          let startMatches = content.match(startCodeList[i]);
          let endMatches = content.match(endCodeList[i]);
          let startMatchesNum = startMatches ? startMatches.length : 0;
          let endMatchesNum = endMatches ? endMatches.length : 0;
          if (startMatchesNum !== endMatchesNum) {
            content = content.replace(startCodeList[i], "").replace(endCodeList[i], "");
          }
        }
        return content;
      };
      getStrByteLen = function(str) {
        let len = 0;
        let cLen = 2;
        for (let i = 0; i < str.length; i++) {
          len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? cLen : 1;
        }
        return len;
      };
      addCode = function(textArea, code, selText = "") {
        let startPos = !selText ? code.indexOf("]") + 1 : code.indexOf(selText);
        if (typeof textArea.selectionStart !== "undefined") {
          let prePos = textArea.selectionStart;
          textArea.value = textArea.value.substring(0, prePos) + code + textArea.value.substring(textArea.selectionEnd);
          textArea.selectionStart = prePos + startPos;
          textArea.selectionEnd = prePos + startPos + selText.length;
        } else {
          textArea.value += code;
        }
      };
      getSelText = function(textArea) {
        return textArea.value.substring(textArea.selectionStart, textArea.selectionEnd);
      };
      copyText = function($target, msg = "", $excludeElem = null) {
        if (!("execCommand" in document) || !$target.length) return false;
        let copyText2 = $target.data("copy-text");
        if (copyText2) {
          $target = $(`<span class="pd_hide">${copyText2.replace(/\n/g, "<br>")}</span>`).insertAfter($target);
        }
        if ($excludeElem) $excludeElem.prop("hidden", true);
        let result2 = null;
        if ($target.is("input, textarea")) {
          $target.select();
          result2 = document.execCommand("copy");
        } else {
          let s = window.getSelection();
          s.selectAllChildren($target.get(0));
          result2 = document.execCommand("copy");
          s.removeAllRanges();
        }
        if (copyText2) $target.remove();
        if ($excludeElem) $excludeElem.removeProp("hidden");
        if (result2) {
          alert(msg ? msg : "\u5DF2\u590D\u5236");
        }
        return result2;
      };
      getResponseMsg = function(html2) {
        let type = 0;
        let msg = "", url = "";
        let matches = /<span style=".+?">(.+?)<\/span><br\s*\/?><a href="(.+?)">/i.exec(html2);
        if (matches) {
          type = 1;
          msg = matches[1];
          url = matches[2];
        } else {
          let matches2 = /操作提示<br\s*\/?>\r\n(.+?)<br\s*\/?>\r\n<a href="javascript:history\.go\(-1\);">返回上一步操作<\/a>/i.exec(html2);
          if (matches2) {
            type = -1;
            msg = matches2[1];
          }
        }
        return { type, msg: msg ? msg : "\u672A\u80FD\u83B7\u5F97\u9884\u671F\u7684\u56DE\u5E94", url };
      };
      entries = function* (obj) {
        for (let key of Object.keys(obj)) {
          yield [key, obj[key]];
        }
      };
      inFollowOrBlockUserList = (name4, list) => list.findIndex((data) => data.name && data.name === name4);
      selectAll = function($nodes) {
        $nodes.prop("checked", true);
        return false;
      };
      selectInverse = function($nodes) {
        $nodes.each(function() {
          let $this2 = $(this);
          $this2.prop("checked", !$this2.prop("checked"));
        });
        return false;
      };
      readData = (key, storageType = Info_default.storageType) => {
        return storageType === "ByUid" || storageType === "Global" ? GM_getValue(key) : localStorage.getItem(key);
      };
      writeData = (key, value, storageType = Info_default.storageType) => {
        try {
          if (storageType === "ByUid" || storageType === "Global") GM_setValue(key, value);
          else localStorage.setItem(key, value);
        } catch (ex) {
          console.log(ex);
          alert("\u5199\u5165\u6570\u636E\u5931\u8D25\uFF0C\u53EF\u80FD\u662F\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u6240\u8BBE\u5B9A\u7684\u5B58\u50A8\u7C7B\u578B\u6216localStorage\u8D85\u51FA\u9650\u989D");
        }
      };
      deleteData = (key, storageType = Info_default.storageType) => {
        if (storageType === "ByUid" || storageType === "Global") GM_deleteValue(key);
        else localStorage.removeItem(key);
      };
      getThreadSfParam = function() {
        let sf = "";
        let matches = /&sf=(\w+)/.exec($(".pages:first > li:first-child > a").attr("href"));
        if (matches) {
          sf = matches[1];
        } else {
          sf = getUrlParam("sf");
        }
        return sf ? sf : "";
      };
      ajax = function(param) {
        if (!param.timeout) {
          param.timeout = Const_default.defAjaxTimeout;
        }
        if (param.url.startsWith("kf_fw_ig_index.php")) {
          let num2 = Info_default.ajaxStat["kf_fw_ig_index.php"];
          num2 = num2 ? num2 : 0;
          Info_default.ajaxStat["kf_fw_ig_index.php"] = ++num2;
          if (num2 > 20) {
            Info_default.ajaxStat["kf_fw_ig_index.php"] = 0;
            setTimeout(function() {
              $.ajax(param);
            }, 60 * 1e3);
            return;
          }
        }
        $.ajax(param);
      };
      getFloorUserName = function(name4) {
        name4 = $.trim(name4);
        if (name4.includes(" ")) {
          let arr = name4.split(" ");
          return arr.length === 2 ? arr[1] : name4;
        } else {
          return name4;
        }
      };
    }
  });

  // src/module/Log.js
  var Log_exports = {};
  __export(Log_exports, {
    clear: () => clear,
    getMergeLog: () => getMergeLog,
    push: () => push,
    read: () => read,
    write: () => write
  });
  var name, read, write, clear, push, getMergeLog;
  var init_Log = __esm({
    "src/module/Log.js"() {
      "use strict";
      init_Info();
      init_Util();
      init_Const();
      name = Const_default.storagePrefix + "log";
      read = function() {
        let log2 = {};
        let options = readData(name + "_" + Info_default.uid);
        if (!options) return log2;
        try {
          options = JSON.parse(options);
        } catch (ex) {
          return log2;
        }
        if (!options || $.type(options) !== "object") return log2;
        log2 = options;
        return log2;
      };
      write = (log2) => writeData(name + "_" + Info_default.uid, JSON.stringify(log2));
      clear = () => deleteData(name + "_" + Info_default.uid);
      push = function(type, action, { gain = null, pay = null } = {}) {
        let log2 = read();
        let overdueDate = getDateString(getDate(`-${Config.logSaveDays}d`));
        for (let date of getObjectKeyList(log2, 1)) {
          if (date <= overdueDate) delete log2[date];
          else break;
        }
        let now = /* @__PURE__ */ new Date();
        let time = now.getTime();
        let today = getDateString(now);
        let obj = { time, type, action };
        if (gain) obj["gain"] = gain;
        if (pay) obj["pay"] = pay;
        if (!Array.isArray(log2[today])) log2[today] = [];
        log2[today].push(obj);
        write(log2);
      };
      getMergeLog = function(log2, newLog) {
        for (let date in newLog) {
          if (!Array.isArray(log2[date])) {
            log2[date] = newLog[date];
          } else {
            for (let newItem of newLog[date]) {
              if (typeof newItem.time !== "number" || typeof newItem.type !== "string") continue;
              let index = log2[date].findIndex((item) => newItem["time"] === item["time"] && newItem["type"] === item["type"]);
              if (index > -1) log2[date][index] = newItem;
              else log2[date].push(newItem);
            }
            log2[date].sort((a, b) => a.time > b.time ? 1 : -1);
          }
        }
        return log2;
      };
    }
  });

  // src/module/TmpLog.js
  var TmpLog_exports = {};
  __export(TmpLog_exports, {
    clear: () => clear2,
    deleteValue: () => deleteValue,
    getValue: () => getValue,
    read: () => read2,
    setValue: () => setValue,
    write: () => write2
  });
  var name2, read2, write2, clear2, getValue, setValue, deleteValue;
  var init_TmpLog = __esm({
    "src/module/TmpLog.js"() {
      "use strict";
      init_Info();
      init_Const();
      init_Util();
      name2 = Const_default.storagePrefix + "tmp_log";
      read2 = function() {
        let log2 = {};
        let options = readData(name2 + "_" + Info_default.uid);
        if (!options) return log2;
        try {
          options = JSON.parse(options);
        } catch (ex) {
          return log2;
        }
        if (!options || $.type(options) !== "object") return log2;
        let allowKeys = [];
        for (let k in Const_default) {
          if (k.endsWith("TmpLogName")) allowKeys.push(Const_default[k]);
        }
        for (let k of Object.keys(options)) {
          if (!allowKeys.includes(k)) delete options[k];
        }
        log2 = options;
        return log2;
      };
      write2 = (log2) => writeData(name2 + "_" + Info_default.uid, JSON.stringify(log2));
      clear2 = () => deleteData(name2 + "_" + Info_default.uid);
      getValue = function(key) {
        let log2 = read2();
        return key in log2 ? log2[key] : null;
      };
      setValue = function(key, value) {
        let log2 = read2();
        log2[key] = value;
        write2(log2);
      };
      deleteValue = function(key) {
        let log2 = read2();
        if (key in log2) {
          delete log2[key];
          write2(log2);
        }
      };
    }
  });

  // src/module/Msg.js
  var Msg_exports = {};
  __export(Msg_exports, {
    destroy: () => destroy,
    remove: () => remove,
    show: () => show,
    wait: () => wait
  });
  var show, wait, remove, destroy;
  var init_Msg = __esm({
    "src/module/Msg.js"() {
      "use strict";
      show = function(options, duration) {
        let settings = {
          msg: "",
          duration: Config.defShowMsgDuration,
          clickable: true,
          preventable: false
        };
        if ($.type(options) === "object") {
          $.extend(settings, options);
        } else {
          settings.msg = options;
          settings.duration = typeof duration === "undefined" ? Config.defShowMsgDuration : duration;
        }
        if ($(".pd_msg").length > 20) destroy();
        let $container = $(".pd_msg_container");
        let isFirst = $container.length === 0;
        if (!isFirst && !$(".pd_mask").length) {
          let $lastTips = $(".pd_msg:last");
          if ($lastTips.length > 0) {
            let top = $lastTips.offset().top;
            let winScrollTop = $(window).scrollTop();
            if (top < winScrollTop || top >= winScrollTop + $(window).height() - $lastTips.outerHeight() - 10) {
              destroy();
              isFirst = true;
            }
          }
        }
        if (settings.preventable && !$(".pd_mask").length) {
          $('<div class="pd_mask"></div>').appendTo("body");
        }
        if (isFirst) {
          $container = $('<div class="pd_msg_container"></div>').appendTo("body");
        }
        let $msg = $(`<div class="pd_msg">${settings.msg}</div>`).appendTo($container);
        $msg.on("click", ".pd_stop_action", function(e) {
          e.preventDefault();
          $(this).html("\u6B63\u5728\u505C\u6B62&hellip;").closest(".pd_msg").data("stop", true);
        });
        if (settings.clickable) {
          $msg.css("cursor", "pointer").click(function() {
            $(this).stop(true, true).fadeOut("slow", function() {
              remove($(this));
            });
          }).find("a").click(function(e) {
            e.stopPropagation();
          });
        }
        let windowWidth = $(window).width();
        let popTipsWidth = $msg.outerWidth(), popTipsHeight = $msg.outerHeight();
        let left = windowWidth / 2 - popTipsWidth / 2;
        if (left + popTipsWidth > windowWidth) left = windowWidth - popTipsWidth - 20;
        if (left < 0) left = 0;
        if (isFirst) {
          $container.css("top", $(window).height() / 2 - popTipsHeight / 2);
        } else {
          $container.stop(false, true).animate({ "top": "-=" + popTipsHeight / 1.75 });
        }
        $(":focus").blur();
        let $prev = $msg.prev(".pd_msg");
        $msg.css({
          "top": $prev.length > 0 ? parseInt($prev.css("top")) + $prev.outerHeight() + 5 : 0,
          left
        }).fadeIn("slow");
        if (settings.duration !== -1) {
          $msg.delay(settings.duration * 1e3).fadeOut("slow", function() {
            remove($(this));
          });
        }
        return $msg;
      };
      wait = function(msg, preventable = true) {
        return show({ msg, duration: -1, clickable: false, preventable });
      };
      remove = function($msg) {
        let $parent = $msg.parent();
        $msg.remove();
        if (!$(".pd_msg").length) {
          $parent.remove();
          $(".pd_mask").remove();
        } else if (!$(".pd_countdown").length) {
          $(".pd_mask").remove();
        }
      };
      destroy = function() {
        $(".pd_msg_container").remove();
        $(".pd_mask").remove();
      };
    }
  });

  // src/module/Loot.js
  var Loot_exports = {};
  __export(Loot_exports, {
    addUserLinkInHaloPage: () => addUserLinkInHaloPage,
    addUserLinkInPkListPage: () => addUserLinkInPkListPage,
    changePointsAndArms: () => changePointsAndArms,
    enhanceLootIndexPage: () => enhanceLootIndexPage,
    getCurrentAssignedPoint: () => getCurrentAssignedPoint,
    getExtraPoint: () => getExtraPoint,
    getFieldNameByPointName: () => getFieldNameByPointName,
    getHaloInfo: () => getHaloInfo,
    getLevelInfo: () => getLevelInfo,
    getLevelInfoList: () => getLevelInfoList,
    getLogList: () => getLogList,
    getLootInfo: () => getLootInfo,
    getPointByProperty: () => getPointByProperty,
    getPointNameByFieldName: () => getPointNameByFieldName,
    getPromoteHaloCostByTypeId: () => getPromoteHaloCostByTypeId,
    getPromoteHaloInfo: () => getPromoteHaloInfo,
    getPropertyByPoint: () => getPropertyByPoint,
    getSkillAttack: () => getSkillAttack,
    init: () => init,
    promoteHalo: () => promoteHalo,
    setHaloInfo: () => setHaloInfo,
    updateLootInfo: () => updateLootInfo
  });
  var safeId, $properties, $points, $armArea, $logBox, $log, log, logList, levelInfoList, propertyList, extraPointsList, haloInfo, currentArmInfo, armsLevelList, itemUsedNumList, changePointsAvailableCount, serverStatus, init, enhanceLootIndexPage, handlePropertiesArea, handlePointsArea, checkPoints, getLootPropertyList, getCurrentAssignedPoint, getSkillAttack, getPointNameByFieldName, getFieldNameByPointName, getExtraPoint, getPropertyByPoint, getPointByProperty, addLevelPointListSelect, fillPoints, setLevelPointListSelect, changePointsAndArms, updateLootInfo, getLootInfo, showLevelPointListConfigDialog, addOrChangeArm, showAddOrChangeArmDialog, getLogList, getLevelInfo, getLevelInfoList, getCurrentLevel, addUserLinkInPkListPage, addUserLinkInHaloPage, readHaloInfo, getHaloInfo, setHaloInfo, getPromoteHaloInfo, promoteHalo, getPromoteHaloCostByTypeId;
  var init_Loot = __esm({
    "src/module/Loot.js"() {
      "use strict";
      init_Info();
      init_Util();
      init_Msg();
      init_Dialog();
      init_Const();
      init_Config();
      init_Log();
      init_TmpLog();
      init_Script();
      init_Public();
      init_Item();
      log = "";
      logList = [];
      levelInfoList = [];
      propertyList = {};
      extraPointsList = {};
      haloInfo = {};
      currentArmInfo = /* @__PURE__ */ new Map();
      armsLevelList = /* @__PURE__ */ new Map();
      itemUsedNumList = /* @__PURE__ */ new Map();
      changePointsAvailableCount = 0;
      serverStatus = "";
      init = function() {
        safeId = getSafeId();
        if (!safeId) return;
        $properties = $(".kf_fw_ig3:first");
        $points = $("#wdsx .kf_fw_ig1:first");
        $points.find("> tbody > tr:first-child > td").attr("id", "pdArmArea");
        $armArea = $points.find("#pdArmArea");
        let tmpHaloInfo = getValue(Const_default.haloInfoTmpLogName);
        if (tmpHaloInfo && $.type(tmpHaloInfo) === "object") {
          let diff = $.now() - tmpHaloInfo.time;
          if (diff >= 0 && diff < Const_default.tmpHaloInfoExpires * 60 * 1e3) {
            delete tmpHaloInfo.time;
            setHaloInfo(tmpHaloInfo);
            enhanceLootIndexPage();
          } else readHaloInfo(true);
        } else readHaloInfo(true);
      };
      enhanceLootIndexPage = function() {
        runFunc("Loot.enhanceLootIndexPage_before_");
        let propertiesHtml = $properties.html();
        propertyList = getLootPropertyList(propertiesHtml);
        itemUsedNumList = getItemsUsedNumInfo(propertiesHtml);
        armsLevelList = getArmsLevelInfo(propertiesHtml);
        let armHtml = $armArea.html();
        if (armHtml.includes("\uFF08\u88C5\u5907\u4E2D\uFF09")) {
          let [armInfoHtml] = armHtml.split("<br><br>");
          let [, weaponInfoHtml = "", armorInfoHtml = ""] = armInfoHtml.split("\uFF08\u88C5\u5907\u4E2D\uFF09");
          currentArmInfo.set("\u6B66\u5668", getArmInfo(weaponInfoHtml));
          currentArmInfo.set("\u62A4\u7532", getArmInfo(armorInfoHtml));
        } else {
          console.log("\u9700\u8981\u81F3\u5C11\u4F7F\u7528\u4E00\u4EF6\u88C5\u5907\u624D\u80FD\u5728\u6B64\u9875\u9762\u6B63\u5E38\u4F7F\u7528KFOL\u52A9\u624B\u7684\u529F\u80FD");
          return;
        }
        $logBox = $("#pk_text_div");
        $log = $("#pk_text");
        log = $log.html();
        logList = getLogList(log);
        levelInfoList = getLevelInfoList(logList);
        handlePropertiesArea();
        handlePointsArea();
        addLevelPointListSelect();
        if (Config.alwaysOpenPointAreaEnabled) {
          $("#wdsx").show();
        }
        runFunc("Loot.enhanceLootIndexPage_after_");
      };
      handlePropertiesArea = function() {
        $properties.attr("id", "pdPropertiesArea").find('input[value$="\u53EF\u5206\u914D\u5C5E\u6027"]').after('<span id="pdSurplusPoint" class="pd_property_diff" hidden>(<em></em>)</span>');
        let $serverStatus = $properties.find('> tbody > tr:first-child td:contains("\u9519\u9AD8\u5CF0\u798F\u5229") > span:last').attr("id", "pdServerStatus");
        if ($serverStatus.length > 0) {
          serverStatus = $serverStatus.text().trim();
          $serverStatus.attr("id", "pdServerStatus").data("prev-status", serverStatus);
        }
        $properties.on("change", ".pd_arm_level", function() {
          let type = $(this).data("type");
          let diffName = "Weapon";
          if (type === "\u62A4\u7532") diffName = "Armor";
          else if (type === "\u9879\u94FE") diffName = "Necklace";
          $(`#pd${diffName}ExpDiff em`).text(armsLevelList.get(type)["\u7ECF\u9A8C"] - Math.pow(armsLevelList.get(type)["\u7B49\u7EA7"] + 1, 2) * 2);
        });
        $properties.find('input[value^="\u6B66\u5668\u7B49\u7EA7"]').addClass("pd_arm_level").attr("data-type", "\u6B66\u5668").after(`<span id="pdWeaponExpDiff" class="pd_property_diff" title="\u4E0B\u4E00\u7EA7\u7ECF\u9A8C\u5DEE\u503C" style="color: #393;">(<em></em>)</span>`).trigger("change");
        $properties.find('input[value^="\u62A4\u7532\u7B49\u7EA7"]').addClass("pd_arm_level").attr("data-type", "\u62A4\u7532").after(`<span id="pdArmorExpDiff" class="pd_property_diff" title="\u4E0B\u4E00\u7EA7\u7ECF\u9A8C\u5DEE\u503C" style="color: #393;">(<em></em>)</span>`).trigger("change");
        $properties.find('input[value^="\u9879\u94FE\u7B49\u7EA7"]').addClass("pd_arm_level").attr("data-type", "\u9879\u94FE").after(`<span id="pdNecklaceExpDiff" class="pd_property_diff" title="\u4E0B\u4E00\u7EA7\u7ECF\u9A8C\u5DEE\u503C" style="color: #393;">(<em></em>)</span>`).trigger("change");
        $('<a data-name="copyParameterSetting" href="#" style="margin-left: -20px;" title="\u590D\u5236\u8BA1\u7B97\u5668\u7684\u90E8\u5206\u53C2\u6570\u8BBE\u7F6E\uFF08\u5305\u62EC\u795E\u79D8\u7CFB\u6570\u3001\u5149\u73AF\u548C\u9053\u5177\u6570\u91CF\uFF09">\u590D</a>').insertAfter($properties.find('input[value$="\u857E\u7C73\u8389\u4E9A\u540C\u4EBA\u6F2B\u753B"]')).click(function(e) {
          e.preventDefault();
          let $this2 = $(this);
          let coefficient = Math.floor(
            (propertyList["\u53EF\u5206\u914D\u5C5E\u6027\u70B9"] - 50 - (itemUsedNumList.get("\u6863\u6848\u5BA4\u94A5\u5319") === 30 ? 30 : 0) - (itemUsedNumList.get("\u6D88\u901D\u4E4B\u836F") === 10 ? 120 : 0)) / 5
          );
          let copyText2 = coefficient + " " + Math.floor(haloInfo["\u5168\u5C5E\u6027"] * 1e3) + "\n";
          for (let value of itemUsedNumList.values()) {
            copyText2 += value + " ";
          }
          $this2.data("copy-text", copyText2.trim());
          console.log("KFOL\u8BA1\u7B97\u5668\u7684\u90E8\u5206\u53C2\u6570\u8BBE\u7F6E\uFF1A\n" + copyText2.trim());
          if (!copyText($this2, "KFOL\u8BA1\u7B97\u5668\u7684\u90E8\u5206\u53C2\u6570\u8BBE\u7F6E\u5DF2\u590D\u5236")) {
            alert("\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u590D\u5236\uFF0C\u8BF7\u6253\u5F00Web\u63A7\u5236\u53F0\u67E5\u770B");
          }
        });
      };
      handlePointsArea = function() {
        $points.find('[type="text"]:not([readonly])').attr("type", "number").attr("min", 1).attr("max", 9999).prop("required", true).css("width", "60px").addClass("pd_point").next("span").addClass("pd_extra_point").after('<span class="pd_sum_point" style="color: #f03; cursor: pointer;" title="\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9"></span>');
        $points.find("input[readonly]").attr("type", "number").prop("disabled", true).css("width", "60px");
        let [armInfoHtml, finalAddAdditionHtml = ""] = $armArea.html().split("<br><br>", 2);
        let [, weaponInfoHtml = "", armorInfoHtml = ""] = armInfoHtml.split("\uFF08\u88C5\u5907\u4E2D\uFF09");
        let newArmHtml = "";
        if (weaponInfoHtml) newArmHtml += "\uFF08\u88C5\u5907\u4E2D\uFF09" + handleUselessSubProperties(weaponInfoHtml);
        if (armorInfoHtml) newArmHtml += "\uFF08\u88C5\u5907\u4E2D\uFF09" + handleUselessSubProperties(armorInfoHtml);
        if (finalAddAdditionHtml) newArmHtml += "<br><br>" + finalAddAdditionHtml;
        $armArea.html(newArmHtml);
        $(`
<tr>
  <td>
    \u88C5\u5907ID\u548C\u5907\u6CE8
    <span class="pd_cfg_tips" title="\u53EF\u70B9\u51FB\u53F3\u8FB9\u7684\u201C\u66F4\u6362\u88C5\u5907\u201D\u6309\u94AE\uFF0C\u4E5F\u53EF\u624B\u52A8\u586B\u5199\u88C5\u5907ID\u3002\u7559\u7A7A\u8868\u793A\u4E0D\u66F4\u6362\u88C5\u5907\u3002
\u5F53\u6587\u672C\u6846\u5185\u7684\u88C5\u5907ID\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u70B9\u51FB\u653B\u51FB\u6309\u94AE\u5C06\u4F1A\u81EA\u52A8\u66F4\u6362\u88C5\u5907\uFF08\u70B9\u51FB\u201C\u4FEE\u6539\u70B9\u6570\u5206\u914D\u201D\u6309\u94AE\u53EA\u4F1A\u4FEE\u6539\u70B9\u6570\u800C\u4E0D\u4F1A\u66F4\u6362\u88C5\u5907\uFF09\u3002">[?]</span>
  </td>
  <td>
    <input class="pd_arm_input" name="weaponId" type="text" value="" maxlength="15" title="\u6B66\u5668ID" placeholder="\u6B66\u5668ID" style="width: 70px;">
    <input class="pd_arm_input" name="weaponMemo" type="text" value="" maxlength="20" title="\u6B66\u5668\u5907\u6CE8" placeholder="\u6B66\u5668\u5907\u6CE8" style="width: 80px;">
    <input class="pd_arm_input" name="armorId" type="text" value="" maxlength="15" title="\u62A4\u7532ID" placeholder="\u62A4\u7532ID" style="width: 70px;">
    <input class="pd_arm_input" name="armorMemo" type="text" value="" maxlength="20" title="\u62A4\u7532\u5907\u6CE8" placeholder="\u62A4\u7532\u5907\u6CE8" style="width: 80px;">
    <a class="pd_btn_link" data-name="changeArm" href="#" title="\u66F4\u6362\u5F53\u524D\u88C5\u5907">\u66F4\u6362\u88C5\u5907</a>
  </td>
</tr>
`).insertAfter($armArea.parent()).find('[data-name="changeArm"]').click(function(e) {
          e.preventDefault();
          addOrChangeArm(0);
        });
        $points.find('input[name="prosubmit"]').replaceWith('<button name="prosubmit" type="submit">\u4FEE\u6539\u70B9\u6570\u5206\u914D</button>');
        $('<button name="changePointsAndArms" type="button" title="\u6309\u7167\u5F53\u524D\u9875\u9762\u4E0A\u7684\u70B9\u6570\u8BBE\u7F6E\u548C\u88C5\u5907ID\u8FDB\u884C\u4FEE\u6539" style="margin-left: 3px;">\u4FEE\u6539\u70B9\u6570\u548C\u88C5\u5907</button>').insertAfter($points.find('button[name="prosubmit"]')).click(function() {
          let $wait = wait("<strong>\u6B63\u5728\u4FEE\u6539\u70B9\u6570\u548C\u88C5\u5907&hellip;</strong>");
          changePointsAndArms(-1, function(result2) {
            if (result2 === "success") {
              updateLootInfo(function() {
                remove($wait);
                show("<strong>\u5DF2\u6210\u529F\u4FEE\u6539\u4E3A\u6307\u5B9A\u7684\u70B9\u6570\u8BBE\u7F6E\u548C\u88C5\u5907ID</strong>", 3);
              });
            } else {
              remove($wait);
              if (result2 === "ignore") {
                alert("\u5F53\u524D\u9875\u9762\u7684\u70B9\u6570\u8BBE\u7F6E\u548C\u88C5\u5907ID\u6CA1\u6709\u53D1\u751F\u53D8\u5316");
              } else if (result2 === "timeout") {
                alert("\u8FDE\u63A5\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5");
              }
            }
          });
        });
        let $changeCount = $points.find("> tbody > tr:last-child > td:last-child");
        $changeCount.wrapInner('<span id="pdChangeCount"></span>');
        let changeCountMatches = /当前修改配点可用\[(\d+)]次/.exec($changeCount.text());
        if (changeCountMatches) {
          changePointsAvailableCount = parseInt(changeCountMatches[1]);
        }
        let countDownMatches = /\(下次修改配点还需\[(\d+)]分钟\)/.exec($changeCount.text());
        if (countDownMatches) {
          let nextTime = getDate(`+${countDownMatches[1]}m`);
          setCookie(Const_default.changePointsInfoCookieName, nextTime.getTime(), nextTime);
        } else {
          let count = parseInt(getCookie(Const_default.changePointsInfoCookieName));
          if (count !== changePointsAvailableCount) {
            setCookie(Const_default.changePointsInfoCookieName, changePointsAvailableCount + "c", getDate(`+${Const_default.changePointsInfoExpires}m`));
          }
        }
        extraPointsList = {
          "\u8010\u529B": parseInt($points.find('[name="p"]').next("span").text()),
          "\u5E78\u8FD0": parseInt($points.find('[name="l"]').next("span").text())
        };
        const showSurplusPoint = function() {
          let surplusPoint = propertyList["\u53EF\u5206\u914D\u5C5E\u6027\u70B9"] - getCurrentAssignedPoint($points.find(".pd_point"));
          $("#pdSurplusPoint").prop("hidden", surplusPoint === 0).css("color", surplusPoint !== 0 ? surplusPoint > 0 ? "#f03" : "#393" : "#000").find("em").text((surplusPoint > 0 ? "+" : "") + surplusPoint);
        };
        const showExtraPoint = function($point) {
          let num2 = parseInt($point.val());
          if (!num2 || num2 < 0) num2 = 1;
          let extraNum = getExtraPoint(getPointNameByFieldName($point.attr("name")), num2);
          $point.next(".pd_extra_point").text("+" + extraNum);
        };
        const showSumOfPoint = function($point) {
          let num2 = parseInt($point.val());
          if (!num2 || num2 < 0) num2 = 1;
          let extraNum = parseInt($point.next(".pd_extra_point").text());
          $point.next(".pd_extra_point").next(".pd_sum_point").text("=" + (num2 + extraNum));
        };
        $points.on("change", ".pd_point", function() {
          let $this2 = $(this);
          showSurplusPoint();
          showExtraPoint($this2);
          showSumOfPoint($this2);
        }).on("click", ".pd_sum_point", function() {
          let surplusPoint = propertyList["\u53EF\u5206\u914D\u5C5E\u6027\u70B9"] - getCurrentAssignedPoint($points.find(".pd_point"));
          if (!surplusPoint) return;
          let $point = $(this).prev("span").prev(".pd_point");
          if (!$point.length) return;
          let num2 = parseInt($point.val());
          if (isNaN(num2) || num2 < 0) num2 = 0;
          num2 = num2 + surplusPoint;
          $point.val(num2 < 1 ? 1 : num2).trigger("change");
        }).closest("form").submit(() => {
          deleteCookie(Const_default.changePointsInfoCookieName);
          return checkPoints($points);
        }).find(".pd_point").trigger("change");
      };
      checkPoints = function($points2) {
        let surplusPoint = propertyList["\u53EF\u5206\u914D\u5C5E\u6027\u70B9"] - getCurrentAssignedPoint($points2.find(".pd_point"));
        if (surplusPoint < 0) {
          alert("\u5269\u4F59\u5C5E\u6027\u70B9\u4E3A\u8D1F\uFF0C\u8BF7\u91CD\u65B0\u586B\u5199");
          return false;
        } else if (surplusPoint > 0) {
          if (!confirm("\u53EF\u5206\u914D\u5C5E\u6027\u70B9\u5C1A\u672A\u7528\u5B8C\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F")) return false;
        }
        return true;
      };
      getLootPropertyList = function(html2) {
        let propertyList2 = {
          "\u653B\u51FB\u529B": 0,
          "\u751F\u547D\u503C": 0,
          "\u6700\u5927\u751F\u547D\u503C": 0,
          "\u653B\u51FB\u901F\u5EA6": 0,
          "\u66B4\u51FB\u51E0\u7387": 0,
          "\u6280\u80FD\u4F24\u5BB3": 0,
          "\u6280\u80FD\u91CA\u653E\u6982\u7387": 0,
          "\u9632\u5FA1": 0,
          "\u53EF\u5206\u914D\u5C5E\u6027\u70B9": 0
        };
        let matches = /"(\d+)攻击力"/.exec(html2);
        if (matches) propertyList2["\u653B\u51FB\u529B"] = parseInt(matches[1]);
        matches = /"(\d+)\/(\d+)生命值"/.exec(html2);
        if (matches) {
          propertyList2["\u751F\u547D\u503C"] = parseInt(matches[1]);
          propertyList2["\u6700\u5927\u751F\u547D\u503C"] = parseInt(matches[2]);
        }
        matches = /"(\d+)攻击速度"/.exec(html2);
        if (matches) propertyList2["\u653B\u51FB\u901F\u5EA6"] = parseInt(matches[1]);
        matches = /"(\d+(?:\.\d+)?)%减伤"/.exec(html2);
        if (matches) propertyList2["\u9632\u5FA1"] = parseFloat(matches[1]);
        matches = /"(\d+)\s*可分配属性"/.exec(html2);
        if (matches) propertyList2["\u53EF\u5206\u914D\u5C5E\u6027\u70B9"] = parseInt(matches[1]);
        return propertyList2;
      };
      getCurrentAssignedPoint = function($points2) {
        let usedPoint = 0;
        $points2.each(function() {
          let $this2 = $(this);
          let name4 = $this2.attr("name");
          let point = parseInt($this2.val());
          if (point && point > 0) usedPoint += point;
        });
        return usedPoint;
      };
      getSkillAttack = (power, life, intelligence) => power * 5 + life * 5 + intelligence * 5;
      getPointNameByFieldName = function(fieldName) {
        switch (fieldName) {
          case "s1":
            return "\u529B\u91CF";
          case "s2":
            return "\u4F53\u8D28";
          case "d1":
            return "\u654F\u6377";
          case "d2":
            return "\u7075\u6D3B";
          case "i1":
            return "\u667A\u529B";
          case "i2":
            return "\u610F\u5FD7";
          case "p":
            return "\u8010\u529B";
          case "l":
            return "\u5E78\u8FD0";
          case "weaponId":
            return "\u6B66\u5668ID";
          case "weaponMemo":
            return "\u6B66\u5668\u5907\u6CE8";
          case "armorId":
            return "\u62A4\u7532ID";
          case "armorMemo":
            return "\u62A4\u7532\u5907\u6CE8";
          default:
            return "";
        }
      };
      getFieldNameByPointName = function(pointName) {
        switch (pointName) {
          case "\u529B\u91CF":
            return "s1";
          case "\u4F53\u8D28":
            return "s2";
          case "\u654F\u6377":
            return "d1";
          case "\u7075\u6D3B":
            return "d2";
          case "\u667A\u529B":
            return "i1";
          case "\u610F\u5FD7":
            return "i2";
          case "\u8010\u529B":
            return "p";
          case "\u5E78\u8FD0":
            return "l";
          case "\u6B66\u5668ID":
            return "weaponId";
          case "\u6B66\u5668\u5907\u6CE8":
            return "weaponMemo";
          case "\u62A4\u7532ID":
            return "armorId";
          case "\u62A4\u7532\u5907\u6CE8":
            return "armorMemo";
          default:
            return "";
        }
      };
      getExtraPoint = function(pointName, point) {
        let elapsedMedicine = itemUsedNumList.get("\u6D88\u901D\u4E4B\u836F") * 5;
        let haloPercent = haloInfo["\u5168\u5C5E\u6027"];
        switch (pointName) {
          case "\u529B\u91CF":
            return Math.floor(point * haloPercent) + itemUsedNumList.get("\u857E\u7C73\u8389\u4E9A\u540C\u4EBA\u6F2B\u753B") + elapsedMedicine;
          case "\u4F53\u8D28":
            return Math.floor(point * haloPercent) + itemUsedNumList.get("\u857E\u7C73\u8389\u4E9A\u540C\u4EBA\u6F2B\u753B") + elapsedMedicine;
          case "\u654F\u6377":
            return Math.floor(point * haloPercent) + itemUsedNumList.get("\u5341\u516D\u591C\u540C\u4EBA\u6F2B\u753B") + elapsedMedicine;
          case "\u7075\u6D3B":
            return Math.floor(point * haloPercent) + itemUsedNumList.get("\u5341\u516D\u591C\u540C\u4EBA\u6F2B\u753B") + elapsedMedicine;
          case "\u667A\u529B":
            return Math.floor(point * haloPercent) + elapsedMedicine;
          case "\u610F\u5FD7":
            return Math.floor(
              (Math.floor(point * haloPercent) + elapsedMedicine + point) * (currentArmInfo.get("\u62A4\u7532")["\u7EC4\u522B"] === "\u94E0\u7532" ? 1.1 : 1)
            ) - point;
          default:
            return 0;
        }
      };
      getPropertyByPoint = function(pointName, point) {
        let pointValue = point + getExtraPoint(pointName, point);
        switch (pointName) {
          case "\u529B\u91CF":
            return pointValue * 5 + haloInfo["\u653B\u51FB\u529B"];
          case "\u4F53\u8D28":
            return pointValue * 20 + (itemUsedNumList.get("\u857E\u7C73\u8389\u4E9A\u540C\u4EBA\u6F2B\u753B") === 50 ? 700 : 0) + haloInfo["\u751F\u547D\u503C"];
          case "\u654F\u6377":
            return pointValue * 2 + (itemUsedNumList.get("\u5341\u516D\u591C\u540C\u4EBA\u6F2B\u753B") === 50 ? 100 : 0);
          case "\u7075\u6D3B":
            return Math.round(pointValue / (pointValue + 100) * 100);
          case "\u667A\u529B":
            return Math.round(pointValue / (pointValue + 90) * 100);
          case "\u610F\u5FD7":
            return Math.round(pointValue / (pointValue + 150) * 100);
          default:
            return 0;
        }
      };
      getPointByProperty = function(pointName, num2) {
        let elapsedMedicine = itemUsedNumList.get("\u6D88\u901D\u4E4B\u836F") * 5;
        let haloPercent = 1 + haloInfo["\u5168\u5C5E\u6027"];
        let value = 0;
        switch (pointName) {
          case "\u529B\u91CF":
            value = Math.ceil((Math.ceil((num2 - haloInfo["\u653B\u51FB\u529B"]) / 5) - itemUsedNumList.get("\u857E\u7C73\u8389\u4E9A\u540C\u4EBA\u6F2B\u753B") - elapsedMedicine) / haloPercent);
            break;
          case "\u4F53\u8D28":
            value = Math.ceil(
              (Math.ceil((num2 - haloInfo["\u751F\u547D\u503C"] - (itemUsedNumList.get("\u857E\u7C73\u8389\u4E9A\u540C\u4EBA\u6F2B\u753B") === 50 ? 700 : 0)) / 20) - itemUsedNumList.get("\u857E\u7C73\u8389\u4E9A\u540C\u4EBA\u6F2B\u753B") - elapsedMedicine) / haloPercent
            );
            break;
          case "\u654F\u6377":
            value = Math.ceil(
              (Math.ceil((num2 - (itemUsedNumList.get("\u5341\u516D\u591C\u540C\u4EBA\u6F2B\u753B") === 50 ? 100 : 0)) / 2) - itemUsedNumList.get("\u5341\u516D\u591C\u540C\u4EBA\u6F2B\u753B") - elapsedMedicine) / haloPercent
            );
            break;
          case "\u7075\u6D3B":
            value = Math.floor((Math.round(100 * num2 / (100 - num2)) - itemUsedNumList.get("\u5341\u516D\u591C\u540C\u4EBA\u6F2B\u753B") - elapsedMedicine) / haloPercent);
            break;
          case "\u667A\u529B":
            value = Math.floor((Math.round(90 * num2 / (100 - num2)) - elapsedMedicine) / haloPercent);
            break;
          case "\u610F\u5FD7":
            value = Math.floor((Math.round(150 * num2 / (100 - num2)) - elapsedMedicine) / haloPercent);
            break;
        }
        if (!isFinite(value) || value < 1) value = 1;
        return value;
      };
      addLevelPointListSelect = function() {
        $(`
<tr>
  <td colspan="2">
    <select id="pdLevelPointListSelect" style="margin: 5px 0;">
      <option>\u70B9\u6570\u5206\u914D\u65B9\u6848</option>
      <option value="0">\u9ED8\u8BA4</option>
    </select>
    <a class="pd_btn_link" data-name="save" href="#" title="\u5C06\u5F53\u524D\u70B9\u6570\u8BBE\u7F6E\u4FDD\u5B58\u4E3A\u65B0\u7684\u65B9\u6848">\u4FDD\u5B58</a>
    <a class="pd_btn_link" data-name="edit" href="#" title="\u7F16\u8F91\u5404\u5C42\u70B9\u6570\u5206\u914D\u65B9\u6848">\u7F16\u8F91</a>
    <a class="pd_btn_link" data-name="fill" href="#" title="\u8F93\u5165\u4E00\u4E32\u6570\u5B57\u6309\u987A\u5E8F\u586B\u5145\u5230\u5404\u4E2A\u70B9\u6570\u5B57\u6BB5\u4E2D">\u586B\u5145</a>
  </td>
</tr>`).prependTo($points.find("> tbody")).find("#pdLevelPointListSelect").change(function() {
          let level = parseInt($(this).val());
          if (level > 0) {
            let points = Config.levelPointList[parseInt(level)];
            if (typeof points !== "object") return;
            $points.find(".pd_point, .pd_arm_input").each(function() {
              let $this2 = $(this);
              let pointName = getPointNameByFieldName($this2.attr("name"));
              $this2.val(points[pointName]);
            }).trigger("change");
          } else if (level === 0) {
            $points.find(".pd_point, .pd_arm_input").each(function() {
              $(this).val(this.defaultValue);
            }).trigger("change");
          }
        }).end().find('[data-name="save"]').click(function(e) {
          e.preventDefault();
          if (!checkPoints($points)) return;
          let $levelPointListSelect = $("#pdLevelPointListSelect");
          let level = parseInt($levelPointListSelect.val());
          level = parseInt(prompt("\u8BF7\u8F93\u5165\u5C42\u6570\uFF1A", level ? level : ""));
          if (!level || level < 0) return;
          read3();
          if (level in Config.levelPointList) {
            if (!confirm("\u8BE5\u5C42\u6570\u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F")) return;
          }
          let points = {};
          for (let elem of Array.from($points.find(".pd_point, .pd_arm_input"))) {
            let $elem = $(elem);
            let name4 = $elem.attr("name");
            let value = $.trim($elem.val());
            if ($elem.is(".pd_point")) {
              value = parseInt(value);
              if (!value || value < 0) return;
            } else {
              if (!value) continue;
              if (name4 === "weaponId" || name4 === "armorId") {
                value = parseInt(value);
                if (!value || value < 0) return;
              }
            }
            points[getPointNameByFieldName(name4)] = value;
          }
          Config.levelPointList[level] = points;
          write3();
          setLevelPointListSelect(Config.levelPointList);
          $levelPointListSelect.val(level);
        }).end().find('[data-name="edit"]').click(function(e) {
          e.preventDefault();
          showLevelPointListConfigDialog();
        }).end().find('[data-name="fill"]').click(function(e) {
          e.preventDefault();
          fillPoints($points);
        });
        setLevelPointListSelect(Config.levelPointList);
      };
      fillPoints = function($points2) {
        let value = $.trim(prompt(`\u8BF7\u8F93\u5165\u4EE5\u4EFB\u610F\u5B57\u7B26\u5206\u9694\u7684\u4E00\u4E32\u6570\u5B57\uFF0C\u6309\u987A\u5E8F\u586B\u5145\u5230\u5404\u4E2A\u70B9\u6570\u5B57\u6BB5\u4E2D\uFF08\u6CE8\uFF1A5\u4F4D\u6570\u4EE5\u4E0A\u7684\u6570\u5B57\u5C06\u88AB\u5F53\u4F5C\u88C5\u5907ID\uFF09\uFF1A
\u53EF\u76F4\u63A5\u8F93\u5165\u8BA1\u7B97\u5668\u8F93\u51FA\u7684\u70B9\u6570\u8BBE\u7F6E\uFF0C\u4F8B\uFF1A1 100 50 5 25 1  0 3 Bow #1234567 Cloth #7654321`));
        if (!value) return;
        let pointsMatches = /^\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+\d+\s+\d+\s+(\S+)\s+#(\d+)\s+(\S+)\s+#(\d+)/.exec(value);
        if (!pointsMatches) {
          pointsMatches = /^\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+\d+\s+(\S+)\s+#(\d+)/.exec(value);
        }
        if (pointsMatches) {
          $points2.find(".pd_point").each(function(index) {
            if (index + 1 < pointsMatches.length) {
              $(this).val(pointsMatches[index + 1]).trigger("change");
            }
          });
          $points2.find('input[name="weaponMemo"]').val(pointsMatches[7]);
          $points2.find('input[name="weaponId"]').val(pointsMatches[8]);
          if (pointsMatches[9] && pointsMatches[10]) {
            $points2.find('input[name="armorMemo"]').val(pointsMatches[9]);
            $points2.find('input[name="armorId"]').val(pointsMatches[10]);
          }
        } else {
          let numMatches = value.match(/\b\d{1,4}\b/g);
          if (!numMatches) return;
          $points2.find(".pd_point").each(function(index) {
            if (index < numMatches.length) $(this).val(parseInt(numMatches[index])).trigger("change");
            else return false;
          });
          let armIdMatches = value.match(/\b(\d{5,})\b/g);
          for (let i in armIdMatches) {
            let name4 = parseInt(i) === 0 ? "weaponId" : "armorId";
            $points2.find(`input[name="${name4}"]`).val(armIdMatches[i]);
          }
        }
      };
      setLevelPointListSelect = function(levelPointList) {
        let pointListHtml = "";
        for (let [level, points] of entries(levelPointList)) {
          if (!$.isNumeric(level)) continue;
          pointListHtml += `<option value="${level}">\u7B2C${level}\u5C42 ${points["\u6B66\u5668ID"] || points["\u62A4\u7532ID"] ? "(\u88C5)" : ""}</option>`;
        }
        $("#pdLevelPointListSelect").find("option:gt(1)").remove().end().append(pointListHtml);
      };
      changePointsAndArms = function(nextLevel, callback) {
        if (nextLevel > 0 && Config.customPointsScriptEnabled && typeof Const_default.getCustomPoints === "function") {
          let points = null;
          try {
            points = Const_default.getCustomPoints(
              $.extend(getLootInfo(), { getExtraPoint, getPointByProperty, getPropertyByPoint })
            );
          } catch (ex) {
            console.log(ex);
          }
          if ($.type(points) === "object") {
            for (let [key, value] of entries(points)) {
              $points.find(`input[name="${getFieldNameByPointName(key)}"]`).val(value).trigger("change");
            }
            nextLevel = -1;
          } else if (typeof points === "number") {
            nextLevel = parseInt(points);
            nextLevel = nextLevel > 1 ? nextLevel : 1;
          } else if (points === false) {
            return callback("ignore");
          } else {
            return callback("error");
          }
        }
        let nextLevelText = getCurrentLevel(logList) + 1;
        let changeLevel = nextLevel > 0 ? Math.max(...Object.keys(Config.levelPointList).filter((level) => level <= nextLevel)) : -1;
        let $levelPointListSelect = $("#pdLevelPointListSelect");
        if (changeLevel > 0) $levelPointListSelect.val(changeLevel).trigger("change");
        else $levelPointListSelect.get(0).selectedIndex = 0;
        let isChangeWeapon = false, isChangeArmor = false, isChangePoints = false;
        $points.find('.pd_point, input[name="weaponId"], input[name="armorId"]').each(function() {
          let $this2 = $(this);
          let name4 = $this2.attr("name");
          let value = $.trim($this2.val());
          if (parseInt(value) > 0 && this.defaultValue !== value) {
            if (name4 === "weaponId") isChangeWeapon = true;
            else if (name4 === "armorId") isChangeArmor = true;
            else isChangePoints = true;
          }
        });
        if (isChangeWeapon || isChangeArmor || isChangePoints) {
          if (Config.unusedPointNumAlertEnabled && !Info_default.w.unusedPointNumAlert && parseInt($("#pdSurplusPoint > em").text()) > 0) {
            if (confirm("\u53EF\u5206\u914D\u5C5E\u6027\u70B9\u5C1A\u672A\u7528\u5B8C\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F")) Info_default.w.unusedPointNumAlert = true;
            else return callback("error");
          }
          let weaponId = parseInt($points.find('input[name="weaponId"]').val());
          let armorId = parseInt($points.find('input[name="armorId"]').val());
          let ajaxList = ["ignore", "ignore", "ignore"];
          if (isChangeWeapon) {
            ajaxList[0] = {
              type: "POST",
              url: "kf_fw_ig_mybpdt.php",
              timeout: Const_default.defAjaxTimeout,
              data: `do=4&id=${weaponId}&safeid=${safeId}`
            };
          }
          if (isChangeArmor) {
            ajaxList[1] = {
              type: "POST",
              url: "kf_fw_ig_mybpdt.php",
              timeout: Const_default.defAjaxTimeout,
              data: `do=4&id=${armorId}&safeid=${safeId}`
            };
          }
          if (isChangePoints) {
            ajaxList[2] = {
              type: "POST",
              url: "kf_fw_ig_enter.php",
              timeout: Const_default.defAjaxTimeout,
              data: $points.closest("form").serialize()
            };
          }
          let result2 = "success";
          $(document).clearQueue("ChangePointsAndArms");
          $.each(ajaxList, function(index, ajax2) {
            if (ajax2 === "ignore") return;
            $(document).queue("ChangePointsAndArms", function() {
              $.ajax(ajax2).done(function(html2) {
                if (index === 0) {
                  let msg = removeHtmlTag(html2);
                  if (/装备完毕/.test(msg)) {
                    $points.find('input[name="weaponId"], input[name="weaponMemo"]').each(function() {
                      this.defaultValue = $(this).val();
                    });
                    if (Config.autoSaveArmsInfoEnabled) {
                      let armsInfo = readArmsInfo();
                      armsInfo["\u5DF2\u88C5\u5907\u6B66\u5668"] = weaponId;
                      writeArmsInfo(armsInfo);
                    }
                  } else {
                    show(`<strong>\u66F4\u6362\u6B66\u5668\uFF1A${msg}</strong>`, -1);
                    runFunc("Loot.lootAttack_changePointsAndArms_error_", msg);
                    result2 = "error";
                  }
                } else if (index === 1) {
                  let msg = removeHtmlTag(html2);
                  if (/装备完毕/.test(msg)) {
                    $points.find('input[name="armorId"], input[name="armorMemo"]').each(function() {
                      this.defaultValue = $(this).val();
                    });
                    if (Config.autoSaveArmsInfoEnabled) {
                      let armsInfo = readArmsInfo();
                      armsInfo["\u5DF2\u88C5\u5907\u62A4\u7532"] = armorId;
                      writeArmsInfo(armsInfo);
                    }
                  } else {
                    show(`<strong>\u66F4\u6362\u62A4\u7532\uFF1A${msg}</strong>`, -1);
                    runFunc("Loot.lootAttack_changePointsAndArms_error_", msg);
                    result2 = "error";
                  }
                } else if (index === 2) {
                  let { msg } = getResponseMsg(html2);
                  if (/已经重新配置加点！/.test(msg)) {
                    deleteCookie(Const_default.changePointsInfoCookieName);
                    $points.find(".pd_point").each(function() {
                      this.defaultValue = $(this).val();
                    });
                  } else {
                    let matches = /你还需要等待(\d+)分钟/.exec(msg);
                    if (matches) {
                      let nextTime = getDate(`+${parseInt(matches[1])}m`);
                      setCookie(Const_default.changePointsInfoCookieName, nextTime.getTime(), nextTime);
                    }
                    show(`<strong>\u7B2C<em>${nextLevelText}</em>\u5C42\u65B9\u6848\uFF1A${msg}</strong>`, -1);
                    runFunc("Loot.lootAttack_changePointsAndArms_error_", msg);
                    result2 = "error";
                  }
                }
              }).fail(function() {
                result2 = "timeout";
              }).always(function() {
                if (result2 === "error" || result2 === "timeout") {
                  $(document).clearQueue("ChangePointsAndArms");
                  callback(result2);
                } else if (!$(document).queue("ChangePointsAndArms").length) {
                  runFunc("Loot.changePointsAndArms_success_");
                  callback(result2);
                } else {
                  setTimeout(() => $(document).dequeue("ChangePointsAndArms"), Const_default.minActionInterval);
                }
              });
            });
          });
          $(document).dequeue("ChangePointsAndArms");
        } else {
          callback("ignore");
        }
      };
      updateLootInfo = function(callback = null) {
        console.log("\u66F4\u65B0\u4E89\u593A\u4FE1\u606FStart");
        $.ajax({
          type: "GET",
          url: "kf_fw_ig_index.php?t=" + $.now(),
          timeout: Const_default.defAjaxTimeout
        }).done(function(html2) {
          let $area = $("#wdsx", html2).parent();
          log = $area.find("#pk_text").html();
          if (!log) {
            remove($(".pd_countdown").closest(".pd_msg"));
            return;
          }
          $area.find('.kf_fw_ig3:first input[type="text"]').each(function(index) {
            let value = $.trim($(this).val());
            if (!value) return;
            $properties.find(`input[type="text"]:eq(${index})`).val(value);
          });
          let serverStatusMatches = /错高峰福利：当前服务器状态\[\s*<span style="color:(#[a-fA-F0-9]+);[^<>]+>(\S+?)<\/span>\s*\]/.exec(html2);
          if (serverStatusMatches) {
            let serverStatusColor = serverStatusMatches[1];
            serverStatus = serverStatusMatches[2];
            if (Const_default.debug) console.log("\u5F53\u524D\u670D\u52A1\u5668\u72B6\u6001\uFF1A" + serverStatus);
            $properties.find("#pdServerStatus").text(serverStatus).css("color", serverStatusColor);
          }
          let countDownMatches = /\(下次修改配点还需\[(\d+)]分钟\)/.exec(html2);
          if (countDownMatches) {
            changePointsAvailableCount = 0;
            let nextTime = getDate(`+${countDownMatches[1]}m`);
            setCookie(Const_default.changePointsInfoCookieName, nextTime.getTime(), nextTime);
            $points.find("#pdChangeCount").text(`(\u4E0B\u6B21\u4FEE\u6539\u914D\u70B9\u8FD8\u9700[${countDownMatches[1]}]\u5206\u949F)`);
          }
          let changeCountMatches = /当前修改配点可用\[(\d+)]次/.exec(html2);
          if (changeCountMatches) {
            changePointsAvailableCount = parseInt(changeCountMatches[1]);
            setCookie(Const_default.changePointsInfoCookieName, changePointsAvailableCount + "c", getDate(`+${Const_default.changePointsInfoExpires}m`));
            $points.find("#pdChangeCount").text(`(\u5F53\u524D\u4FEE\u6539\u914D\u70B9\u53EF\u7528[${changePointsAvailableCount}]\u6B21)`);
          }
          let armHtml = $area.find(".kf_fw_ig1:first > tbody > tr:first-child > td").html();
          if (armHtml.includes("\uFF08\u88C5\u5907\u4E2D\uFF09")) {
            let [armInfoHtml, finalAddAdditionHtml = ""] = armHtml.split("<br><br>", 2);
            let [, weaponInfoHtml = "", armorInfoHtml = ""] = armInfoHtml.split("\uFF08\u88C5\u5907\u4E2D\uFF09");
            let newArmHtml = "";
            if (weaponInfoHtml) newArmHtml += "\uFF08\u88C5\u5907\u4E2D\uFF09" + handleUselessSubProperties(weaponInfoHtml);
            if (armorInfoHtml) newArmHtml += "\uFF08\u88C5\u5907\u4E2D\uFF09" + handleUselessSubProperties(armorInfoHtml);
            if (finalAddAdditionHtml) newArmHtml += "<br><br>" + finalAddAdditionHtml;
            $armArea.html(newArmHtml);
            currentArmInfo.set("\u6B66\u5668", getArmInfo(weaponInfoHtml));
            currentArmInfo.set("\u62A4\u7532", getArmInfo(armorInfoHtml));
          }
          let propertiesHtml = $properties.html();
          propertyList = getLootPropertyList(propertiesHtml);
          itemUsedNumList = getItemsUsedNumInfo(propertiesHtml);
          armsLevelList = getArmsLevelInfo(propertiesHtml);
          $properties.find(".pd_arm_level").trigger("change");
          $points.find(".pd_point").trigger("change");
          if (typeof callback === "function") callback();
          runFunc("Loot.updateLootInfo_after_", html2);
        }).fail(function() {
          setTimeout(() => updateLootInfo(callback), Const_default.minActionInterval);
        });
      };
      getLootInfo = function() {
        let currentLevel = getCurrentLevel(logList);
        let info = levelInfoList[currentLevel];
        let currentLife = 0, currentInitLife = 0;
        if (info) {
          currentLife = info.life;
          currentInitLife = info.initLife;
        }
        let enemyList = getEnemyList(levelInfoList);
        return {
          currentLevel,
          currentLife,
          currentInitLife,
          levelPointList: Config.levelPointList,
          availablePoint: propertyList["\u53EF\u5206\u914D\u5C5E\u6027\u70B9"],
          haloInfo,
          extraPointsList,
          propertyList,
          itemUsedNumList,
          armsLevelList,
          currentArmInfo,
          changePointsAvailableCount,
          log,
          logList,
          enemyList
        };
      };
      showLevelPointListConfigDialog = function(callback) {
        const dialogName2 = "pdLevelPointListConfigDialog";
        if ($("#" + dialogName2).length > 0) return;
        read3();
        let html2 = `
<div class="pd_cfg_main">
  <div style="margin: 5px 0; line-height: 1.6em;">
    \u8BF7\u586B\u5199\u5404\u5C42\u5BF9\u5E94\u7684\u70B9\u6570\u5206\u914D\u65B9\u6848\uFF0C\u76F8\u90BB\u5C42\u6570\u5982\u6570\u503C\u5B8C\u5168\u76F8\u540C\u7684\u8BDD\uFF0C\u5219\u53EA\u4FDD\u7559\u6700\u524D\u9762\u7684\u4E00\u5C42<br>
    \uFF08\u4F8B\uFF1A11-19\u5C42\u70B9\u6570\u76F8\u540C\u7684\u8BDD\uFF0C\u5219\u53EA\u4FDD\u7559\u7B2C11\u5C42\uFF09<br>
    \u6B66\u5668\u3001\u62A4\u7532ID\u548C\u5907\u6CE8\u4E3A\u53EF\u9009\u9879\uFF0C\u53EA\u5728\u9700\u8981\u66F4\u6362\u88C5\u5907\u65F6\u586B\u5199<br>
    \u81EA\u5B9A\u4E49\u70B9\u6570\u5206\u914D\u65B9\u6848\u811A\u672C\u7684\u53C2\u8003\u8303\u4F8B\u8BF7\u53C2\u89C1<a href="read.php?tid=500968&spid=13270735&sf=b09" target="_blank">\u6B64\u8D3453\u697C</a>
  </div>
  <div style="overflow-y: auto; max-height: 400px;">
    <table id="pdLevelPointList" style="text-align: center; white-space: nowrap;">
      <tbody>
        <tr>
          <th></th><th>\u5C42\u6570</th><th>\u529B\u91CF</th><th>\u4F53\u8D28</th><th>\u654F\u6377</th><th>\u7075\u6D3B</th><th>\u667A\u529B</th><th>\u610F\u5FD7</th>
<th>\u6B66\u5668ID</th><th>\u6B66\u5668\u5907\u6CE8</th><th>\u62A4\u7532ID</th><th>\u62A4\u7532\u5907\u6CE8</th><th></th>
        </tr>
      </tbody>
    </table>
  </div>
  <hr>
  <div style="float: left; line-height: 27px;">
    <a class="pd_btn_link" data-name="selectAll" href="#">\u5168\u9009</a>
    <a class="pd_btn_link" data-name="selectInverse" href="#">\u53CD\u9009</a>
    <a class="pd_btn_link pd_highlight" data-name="add" href="#">\u589E\u52A0</a>
    <a class="pd_btn_link" data-name="deleteSelect" href="#">\u5220\u9664</a>
  </div>
  <div data-id="modifyArea" style="float: right;">
    <input name="s1" type="text" maxlength="5" title="\u529B\u91CF" placeholder="\u529B\u91CF" style="width: 35px;">
    <input name="s2" type="text" maxlength="5" title="\u4F53\u8D28" placeholder="\u4F53\u8D28" style="width: 35px;">
    <input name="d1" type="text" maxlength="5" title="\u654F\u6377" placeholder="\u654F\u6377" style="width: 35px;">
    <input name="d2" type="text" maxlength="5" title="\u7075\u6D3B" placeholder="\u7075\u6D3B" style="width: 35px;">
    <input name="i1" type="text" maxlength="5" title="\u667A\u529B" placeholder="\u667A\u529B" style="width: 35px;">
    <input name="i2" type="text" maxlength="5" title="\u610F\u5FD7" placeholder="\u610F\u5FD7" style="width: 35px;">
    <a class="pd_btn_link" data-name="clear" href="#" title="\u6E05\u7A7A\u5404\u4FEE\u6539\u5B57\u6BB5">\u6E05\u7A7A</a>
    <button type="button" name="modify">\u4FEE\u6539</button>
    <span class="pd_cfg_tips" title="\u53EF\u5C06\u6240\u9009\u62E9\u7684\u5C42\u6570\u7684\u76F8\u5E94\u5C5E\u6027\u4FEE\u6539\u4E3A\u6307\u5B9A\u7684\u6570\u503C\uFF1B\u6570\u5B57\u524D\u53EF\u8BBE+/-\u53F7\uFF0C\u8868\u793A\u589E\u52A0/\u51CF\u5C11\u76F8\u5E94\u6570\u91CF\uFF1B\u4F8B\uFF1A100\u3001+5\u6216-2">[?]</span>
  </div>
</div>
<div class="pd_cfg_btns">
  <span class="pd_cfg_about"><a data-name="openImOrExLevelPointListConfigDialog" href="#">\u5BFC\u5165/\u5BFC\u51FA\u5206\u914D\u65B9\u6848</a></span>
  <button type="submit">\u4FDD\u5B58</button>
  <button data-action="close" type="button">\u53D6\u6D88</button>
</div>`;
        let $dialog2 = create(dialogName2, "\u5404\u5C42\u70B9\u6570\u5206\u914D\u65B9\u6848", html2, "min-width: 840px;");
        let $levelPointList = $dialog2.find("#pdLevelPointList > tbody");
        const addLevelPointHtml = function(level, points) {
          $(`
<tr>
  <td style="width: 25px; text-align: left;"><input type="checkbox"></td>
  <td style="text-align: left;">
    <label style="margin-right: 8px;">
      \u7B2C <input name="level" type="text" value="${level ? level : ""}" style="width: 30px;"> \u5C42
    </label>
  </td>
  <td><input class="pd_point" name="s1" type="number" value="${points["\u529B\u91CF"]}" min="1" style="width: 50px;" required></td>
  <td><input class="pd_point" name="s2" type="number" value="${points["\u4F53\u8D28"]}" min="1" style="width: 50px;" required></td>
  <td><input class="pd_point" name="d1" type="number" value="${points["\u654F\u6377"]}" min="1" style="width: 50px;" required></td>
  <td><input class="pd_point" name="d2" type="number" value="${points["\u7075\u6D3B"]}" min="1" style="width: 50px;" required></td>
  <td><input class="pd_point" name="i1" type="number" value="${points["\u667A\u529B"]}" min="1" style="width: 50px;" required></td>
  <td><input class="pd_point" name="i2" type="number" value="${points["\u610F\u5FD7"]}" min="1" style="width: 50px;" required></td>
  <td><input class="pd_arm_input" name="weaponId" type="text" value="${points["\u6B66\u5668ID"] ? points["\u6B66\u5668ID"] : ""}" maxlength="15" style="width: 65px;"></td>
  <td><input class="pd_arm_input" name="weaponMemo" type="text" value="${points["\u6B66\u5668\u5907\u6CE8"] ? points["\u6B66\u5668\u5907\u6CE8"] : ""}" maxlength="20" style="width: 70px;"></td>
  <td><input class="pd_arm_input" name="armorId" type="text" value="${points["\u62A4\u7532ID"] ? points["\u62A4\u7532ID"] : ""}" maxlength="15" style="width: 65px;"></td>
  <td><input class="pd_arm_input" name="armorMemo" type="text" value="${points["\u62A4\u7532\u5907\u6CE8"] ? points["\u62A4\u7532\u5907\u6CE8"] : ""}" maxlength="20" style="width: 70px;"></td>
  <td style="text-align: left;">
    <a class="pd_btn_link" data-name="fill" href="#">\u586B\u5145</a>
    <a class="pd_btn_link" data-name="addArm" href="#">\u88C5\u5907</a>
    <a class="pd_btn_link pd_highlight" data-name="delete" href="#">\u5220\u9664</a>
  </td>
</tr>
<tr>
  <td></td>
  <td class="pd_custom_tips" title="\u5269\u4F59\u5C5E\u6027\u70B9">\u5269\u4F59\uFF1A<span data-id="surplusPoint">0</span></td>
  <td title="\u653B\u51FB\u529B" hidden> <!-- \u4E34\u65F6\u7981\u7528 -->
    \u653B\uFF1A<span data-id="pro_s1" style="cursor: pointer;">0</span> <a data-id="opt_s1" href="#" title="\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9">&#177;</a>
  </td>
  <td title="\u6700\u5927\u751F\u547D\u503C" hidden>
    \u547D\uFF1A<span data-id="pro_s2" style="cursor: pointer;">0</span> <a data-id="opt_s2" href="#" title="\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9">&#177;</a>
  </td>
  <td title="\u653B\u51FB\u901F\u5EA6" hidden>
    \u901F\uFF1A<span data-id="pro_d1" style="cursor: pointer;">0</span> <a data-id="opt_d1" href="#" title="\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9">&#177;</a>
  </td>
  <td title="\u66B4\u51FB\u51E0\u7387" hidden>
    \u66B4\uFF1A<span data-id="pro_d2" style="cursor: pointer;">0</span>% <a data-id="opt_d2" href="#" title="\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9">&#177;</a>
  </td>
  <td title="\u6280\u80FD\u91CA\u653E\u6982\u7387" hidden>
    \u6280\uFF1A<span data-id="pro_i1" style="cursor: pointer;">0</span>% <a data-id="opt_i1" href="#" title="\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9">&#177;</a>
  </td>
  <td title="\u9632\u5FA1\u51CF\u4F24" hidden>
    \u9632\uFF1A<span data-id="pro_i2" style="cursor: pointer;">0</span>% <a data-id="opt_i2" href="#" title="\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9">&#177;</a>
  </td>
  <td class="pd_custom_tips" title="[\u98DE\u8EAB\u5288\u65A9]\u4F24\u5BB3\uFF1A\u653B\u51FB+\u4F53\u8D28\u503C*5+\u667A\u529B\u503C*5" hidden>\u6280\u4F24\uFF1A<span data-id="skillAttack">0</span></td>
  <td hidden></td>
  <td hidden></td>
</tr>
`).appendTo($levelPointList).find(".pd_point").trigger("change");
        };
        $dialog2.submit(function(e) {
          e.preventDefault();
          read3();
          let levelPointList = {};
          let prevPoints = {};
          let isError = false, isSurplus = false;
          $levelPointList.find("tr:gt(0)").each(function() {
            let $this2 = $(this);
            if (!$this2.find(".pd_point").length) return;
            let surplusPoint = propertyList["\u53EF\u5206\u914D\u5C5E\u6027\u70B9"] - getCurrentAssignedPoint($this2.find(".pd_point"));
            if (surplusPoint > 0) isSurplus = true;
            else if (surplusPoint < 0) {
              isError = true;
              return false;
            }
            let level = parseInt($this2.find('[name="level"]').val());
            if (!level || level < 0) return;
            let points = {};
            for (let elem of Array.from($this2.find(".pd_point, .pd_arm_input"))) {
              let $elem = $(elem);
              let name4 = $elem.attr("name");
              let value = null;
              value = $.trim($elem.val());
              if ($elem.is(".pd_point")) {
                value = parseInt(value);
                if (!value || value < 0) return;
              } else {
                if (!value) continue;
                if (name4 === "weaponId" || name4 === "armorId") {
                  value = parseInt(value);
                  if (!value || value < 0) return;
                }
              }
              points[getPointNameByFieldName(name4)] = value;
            }
            if (deepEqual(prevPoints, points)) return;
            levelPointList[level] = points;
            prevPoints = points;
          });
          if (isSurplus) {
            if (!confirm("\u90E8\u5206\u5C42\u6570\u7684\u53EF\u5206\u914D\u5C5E\u6027\u70B9\u5C1A\u672A\u7528\u5B8C\uFF0C\u662F\u5426\u63D0\u4EA4\uFF1F")) return;
          }
          if (isError) {
            alert("\u90E8\u5206\u5C42\u6570\u7684\u5269\u4F59\u5C5E\u6027\u70B9\u4E3A\u8D1F\uFF0C\u8BF7\u91CD\u65B0\u586B\u5199");
            return;
          }
          Config.levelPointList = levelPointList;
          write3();
          close(dialogName2);
          setLevelPointListSelect(Config.levelPointList);
        }).find('[data-name="add"]').click(function(e) {
          e.preventDefault();
          let points = { "\u529B\u91CF": 1, "\u4F53\u8D28": 1, "\u654F\u6377": 1, "\u7075\u6D3B": 1, "\u667A\u529B": 1, "\u610F\u5FD7": 1 };
          addLevelPointHtml(0, points);
          $levelPointList.find('[name="level"]:last').focus();
          resize(dialogName2);
        }).end().find('[data-name="deleteSelect"]').click(function(e) {
          e.preventDefault();
          let $checked = $levelPointList.find('[type="checkbox"]:checked');
          if (!$checked.length || !confirm("\u662F\u5426\u5220\u9664\u6240\u9009\u5C42\u6570\uFF1F")) return;
          let $line = $checked.closest("tr");
          $line.next("tr").addBack().remove();
          resize(dialogName2);
        }).end().find('[data-name="openImOrExLevelPointListConfigDialog"]').click(function(e) {
          e.preventDefault();
          showCommonImportOrExportConfigDialog(
            "\u5404\u5C42\u70B9\u6570\u5206\u914D\u65B9\u6848",
            "levelPointList",
            null,
            function() {
              $("#pdLevelPointListConfigDialog").remove();
              showLevelPointListConfigDialog(($dialog3) => $dialog3.submit());
            }
          );
        }).end().find('[data-name="selectAll"]').click(() => selectAll($levelPointList.find('[type="checkbox"]'))).end().find('[data-name="selectInverse"]').click(() => selectInverse($levelPointList.find('[type="checkbox"]')));
        $levelPointList.on("click", '[data-name="fill"]', function(e) {
          e.preventDefault();
          fillPoints($(this).closest("tr"));
        }).on("click", '[data-name="delete"]', function(e) {
          e.preventDefault();
          let $line = $(this).closest("tr");
          $line.next("tr").addBack().remove();
          resize(dialogName2);
        }).on("click", '[data-name="addArm"]', function(e) {
          e.preventDefault();
          $levelPointList.find("#pdAddWeaponId, #pdAddWeaponMemo, #pdAddArmorId, #pdAddArmorMemo").removeAttr("id");
          let $tr = $(this).closest("tr");
          $tr.find('[name="weaponId"]').attr("id", "pdAddWeaponId").end().find('[name="weaponMemo"]').attr("id", "pdAddWeaponMemo").end().find('[name="armorId"]').attr("id", "pdAddArmorId").end().find('[name="armorMemo"]').attr("id", "pdAddArmorMemo");
          addOrChangeArm(1);
        }).on("change", ".pd_point", function() {
          let $this2 = $(this);
          let name4 = $this2.attr("name");
          let point = parseInt($this2.val());
          if (!point || point < 0) return;
          let $points2 = $this2.closest("tr");
          let $properties2 = $points2.next("tr");
          $properties2.find(`[data-id="pro_${name4}"]`).text(getPropertyByPoint(getPointNameByFieldName(name4), point));
          let power = parseInt($points2.find('[name="s1"]').val());
          let life = parseInt($points2.find('[name="s2"]').val());
          let intelligence = parseInt($points2.find('[name="i1"]').val());
          $properties2.find('[data-id="skillAttack"]').text(
            getSkillAttack(
              power + getExtraPoint("\u529B\u91CF", power),
              life + getExtraPoint("\u4F53\u8D28", life),
              intelligence + getExtraPoint("\u667A\u529B", intelligence)
            )
          );
          let surplusPoint = propertyList["\u53EF\u5206\u914D\u5C5E\u6027\u70B9"] - getCurrentAssignedPoint($points2.find(".pd_point"));
          $properties2.find('[data-id="surplusPoint"]').text(surplusPoint).css("color", surplusPoint !== 0 ? "#f00" : "#000");
        }).on("click", '[data-id^="pro_"]', function() {
          let $this2 = $(this);
          let name4 = $this2.data("id").replace("pro_", "");
          let num2 = parseInt(prompt("\u8BF7\u8F93\u5165\u6570\u503C\uFF1A", $this2.text()));
          if (!num2 || num2 < 0) return;
          $this2.closest("tr").prev("tr").find(`[name="${name4}"]`).val(getPointByProperty(getPointNameByFieldName(name4), num2)).trigger("change");
        }).on("click", '[data-id^="opt_"]', function(e) {
          e.preventDefault();
          let $this2 = $(this);
          let name4 = $this2.data("id").replace("opt_", "");
          let $points2 = $this2.closest("tr").prev("tr");
          let surplusPoint = propertyList["\u53EF\u5206\u914D\u5C5E\u6027\u70B9"] - getCurrentAssignedPoint($points2.find(".pd_point"));
          if (!surplusPoint) return;
          let $point = $points2.find(`[name="${name4}"]`);
          if (!$point.length) return;
          let num2 = parseInt($point.val());
          if (isNaN(num2) || num2 < 0) num2 = 0;
          num2 = num2 + surplusPoint;
          let min = parseInt($point.attr("min"));
          $point.val(num2 < min ? min : num2).trigger("change");
        });
        $dialog2.find('[name="modify"]').click(function() {
          let $checked = $levelPointList.find('[type="checkbox"]:checked');
          if (!$checked.length) return;
          let data = {};
          $dialog2.find('[data-id="modifyArea"] [type="text"]').each(function() {
            let $this2 = $(this);
            let name4 = $this2.attr("name");
            let value = $.trim($this2.val());
            if (!value) return;
            let matches = /^(-|\+)?(\d+)$/.exec(value);
            if (!matches) {
              alert("\u683C\u5F0F\u4E0D\u6B63\u786E");
              $this2.select().focus();
            }
            data[name4] = {};
            if (typeof matches[1] !== "undefined") data[name4].action = matches[1] === "+" ? "add" : "minus";
            else data[name4].action = "equal";
            data[name4].value = parseInt(matches[2]);
          });
          $checked.each(function() {
            let $points2 = $(this).closest("tr");
            $points2.find(".pd_point").each(function() {
              let $this2 = $(this);
              let name4 = $this2.attr("name");
              if (!(name4 in data)) return;
              if (data[name4].action !== "equal") {
                let point = parseInt($this2.val());
                if (!point || point < 0) point = 0;
                point += data[name4].action === "add" ? data[name4].value : -data[name4].value;
                $this2.val(point > 1 ? point : 1);
              } else $this2.val(data[name4].value);
            }).trigger("change");
          });
          alert("\u70B9\u6570\u5DF2\u4FEE\u6539");
        }).end().find('[data-name="clear"]').click(function(e) {
          e.preventDefault();
          $(this).closest('[data-id="modifyArea"]').find('[type="text"]').val("");
        });
        for (let [level, points] of entries(Config.levelPointList)) {
          if (!$.isNumeric(level)) continue;
          addLevelPointHtml(level, points);
        }
        show2(dialogName2);
        if (typeof callback === "function") callback($dialog2);
      };
      addOrChangeArm = function(type) {
        read3();
        const dialogName2 = `pd${type === 1 ? "Add" : "Change"}ArmDialog`;
        let $dialog2 = $("#" + dialogName2).parent();
        if ($dialog2.length > 0 && type === 1) {
          $dialog2.fadeIn("fast");
          resize(dialogName2);
        } else {
          let $wait = wait("<strong>\u6B63\u5728\u83B7\u53D6\u88C5\u5907\u4FE1\u606F&hellip;</strong>");
          $.ajax({
            type: "GET",
            url: "kf_fw_ig_mybp.php?t=" + $.now(),
            timeout: Const_default.defAjaxTimeout
          }).done(function(html2) {
            remove($wait);
            let matches = /<tr><td width="\d+%">装备.+?\r\n(<tr.+?<\/tr>)<tr><td colspan="4">/.exec(html2);
            if (matches) {
              showAddOrChangeArmDialog(type, matches[1]);
            }
          }).fail(() => remove($wait));
        }
      };
      showAddOrChangeArmDialog = function(type, armHtml) {
        const dialogName2 = `pd${type === 1 ? "Add" : "Change"}ArmDialog`;
        if ($("#" + dialogName2).length > 0) return;
        let html2 = `
<div class="pd_cfg_main" style="padding: 0;">
  <table class="kf_fw_ig4" data-name="armList" cellspacing="0" cellpadding="0" align="center" style="width: 800px;">
    <tbody>
      <tr hidden><td colspan="3" class="kf_fw_ig_title1">\u6211\u7684\u88C5\u5907\u80CC\u5305</td></tr>
      <tr><td width="10%">\u88C5\u5907</td><td width="10%">\u7194\u70BC</td><td width="80%">\u540D\u79F0</td></tr>
      ${armHtml}
      <tr><td colspan="3"><span style="color:#00f;">\u4E0D\u663E\u793A\u8D85\u8FC710\u4EF6\u4EE5\u4E0A\u7684\u7269\u54C1\uFF0C\u5982\u7269\u54C1\u8D85\u8FC710\u4EF6\uFF0C\u8BF7\u7194\u70BC\u6389\u591A\u4F59\u7684\u5373\u53EF\u5168\u90E8\u663E\u793A\u3002</span></td></tr>
    </tbody>
  </table>
</div>
<div class="pd_cfg_btns">
  ${type === 0 ? '<button name="manualInputArmId" type="button" title="\u624B\u52A8\u8F93\u5165\u88C5\u5907ID">\u624B\u52A8\u8F93\u5165ID</button>' : ""}
  <button data-action="close" type="button">\u5173\u95ED</button>
</div>`;
        let $dialog2 = create(dialogName2, `${type === 1 ? "\u52A0\u5165" : "\u66F4\u6362"}\u88C5\u5907`, html2, "min-width: 820px; z-index: 1003;");
        let $armArea3 = $dialog2.find('.kf_fw_ig4[data-name="armList"]');
        addCommonArmsButton($dialog2.find(".pd_cfg_btns"), $armArea3);
        if (type === 1) {
          $dialog2.off("click", '[data-action="close"]').on("click", '[data-action="close"]', function() {
            $dialog2.fadeOut("fast");
          });
        } else {
          $dialog2.find('[name="manualInputArmId"]').click(function() {
            let value = $.trim(prompt("\u8BF7\u8F93\u5165\u88C5\u5907ID\uFF08\u591A\u4E2AID\u7528\u7A7A\u683C\u5206\u9694\uFF09\uFF1A"));
            if (!value) return;
            let armIdList = value.split(" ");
            let $wait = wait("<strong>\u6B63\u5728\u88C5\u5907\u4E2D&hellip;</strong>");
            $(document).clearQueue("ChangeArms");
            $.each(armIdList, function(i, armId) {
              if (!armId) return;
              $(document).queue("ChangeArms", function() {
                $.post("kf_fw_ig_mybpdt.php", `do=4&id=${armId}&safeid=${safeId}`, function(html3) {
                  let msg = removeHtmlTag(html3);
                  if (/装备完毕/.test(msg)) {
                    if (Config.autoSaveArmsInfoEnabled) {
                      let armsInfo = readArmsInfo();
                      armsInfo["\u5DF2\u88C5\u5907\u6B66\u5668"] = armsInfo["\u5DF2\u88C5\u5907\u62A4\u7532"] = 0;
                      writeArmsInfo(armsInfo);
                    }
                  } else {
                    remove($wait);
                    alert(msg);
                  }
                }).fail(function() {
                  $(document).clearQueue("ChangeArms");
                  remove($wait);
                  alert("\u8FDE\u63A5\u8D85\u65F6");
                }).always(function() {
                  if (!$(document).queue("ChangeArms").length) {
                    updateLootInfo(function() {
                      remove($wait);
                      close(dialogName2);
                      $(".pd_arm_input").val("");
                    });
                  } else {
                    setTimeout(() => $(document).dequeue("ChangeArms"), Const_default.minActionInterval);
                  }
                });
              });
            });
            $(document).dequeue("ChangeArms");
          });
        }
        if (Config.autoSaveArmsInfoEnabled) {
          addSavedArmsInfo($armArea3);
        }
        handleArmArea($armArea3, type);
        bindArmLinkClickEvent($armArea3, safeId, 1);
        show2(dialogName2);
        runFunc(`Item.show${type === 1 ? "Add" : "Change"}ArmDialog_after_`);
      };
      getLogList = function(log2) {
        let logList2 = [];
        let matches = log2.match(/<li class="pk_log_j">.+?(?=\s*<li class="pk_log_j">|\s*$)/g);
        for (let i in matches) {
          let levelMatches = /在\[\s*(\d+)\s*层]/.exec(removeHtmlTag(matches[i]));
          if (levelMatches) logList2[parseInt(levelMatches[1])] = matches[i];
        }
        return logList2;
      };
      getLevelInfo = function(levelLog) {
        let info = { enemy: "", life: 0, initLife: 0, box: "" };
        if (!levelLog) return info;
        levelLog = removeHtmlTag(levelLog.replace(/<\/li>/g, "</li>\n"));
        let matches = /你\((\d+)\)遭遇了\[([^\]]+)的]NPC/.exec(levelLog);
        if (matches) {
          info.initLife = parseInt(matches[1]);
          info.enemy = matches[2];
          info.enemy = info.enemy.replace("\u7279\u522B", "").replace("(\u540E\u7EED\u66F4\u65B0\u524D\u6B64\u8DEF\u4E0D\u901A)", "");
        }
        matches = /生命值\[(\d+)\s*\/\s*\d+]/.exec(levelLog);
        if (matches) info.life = parseInt(matches[1]);
        matches = /敌人掉落了一个\s*\[\s*(\S+?盒子)\s*]/.exec(levelLog);
        if (matches) info.box = matches[1];
        return info;
      };
      getLevelInfoList = function(logList2) {
        let levelInfoList2 = [];
        $.each(logList2, function(level, levelLog) {
          if (!levelLog) return;
          levelInfoList2[level] = getLevelInfo(levelLog);
        });
        return levelInfoList2;
      };
      getCurrentLevel = (logList2) => logList2.length - 1 >= 1 ? logList2.length - 1 : 0;
      addUserLinkInPkListPage = function() {
        $(".kf_fw_ig1 > tbody > tr:gt(1) > td:nth-child(2)").each(function() {
          let $this2 = $(this);
          let userName2 = $this2.text().trim();
          $this2.html(`<a class="${!Config.adminMemberEnabled ? "pd_not_click_link" : ""}" href="profile.php?action=show&username=${userName2}" target="_blank">${userName2}</a>`);
          if (userName2 === Info_default.userName) $this2.find("a").addClass("pd_highlight");
        });
      };
      addUserLinkInHaloPage = function() {
        $(".kf_fw_ig1:eq(1) > tbody > tr:gt(1) > td:nth-child(2)").each(function() {
          let $this2 = $(this);
          let userName2 = $this2.text().trim();
          $this2.html(`<a class="${!Config.adminMemberEnabled ? "pd_not_click_link" : ""}" href="profile.php?action=show&username=${userName2}" target="_blank">${userName2}</a>`);
          if (userName2 === Info_default.userName) $this2.find("a").addClass("pd_highlight");
        });
      };
      readHaloInfo = function(isInitLootPage = false) {
        console.log("\u83B7\u53D6\u6218\u529B\u5149\u73AF\u4FE1\u606FStart");
        let $wait = wait("<strong>\u6B63\u5728\u83B7\u53D6\u6218\u529B\u5149\u73AF\u4FE1\u606F\uFF0C\u8BF7\u7A0D\u5019&hellip;</strong>");
        getHaloInfo().done(function(result2) {
          if ($.type(result2) === "object") {
            setHaloInfo(result2);
            if (isInitLootPage) enhanceLootIndexPage();
            else $points.find(".pd_point").trigger("change");
          }
        }).always(function(result2) {
          remove($wait);
          if (result2 === "timeout") {
            setTimeout(() => readHaloInfo(isInitLootPage), Const_default.defAjaxInterval);
          } else if (result2 === "error") {
            show("<strong>\u6218\u529B\u5149\u73AF\u4FE1\u606F\u83B7\u53D6\u5931\u8D25\uFF01</strong>", -1);
          }
        });
      };
      getHaloInfo = function() {
        return $.ajax({
          type: "GET",
          url: "kf_fw_ig_halo.php?t=" + $.now(),
          timeout: Const_default.defAjaxTimeout
        }).then(function(html2) {
          let haloInfo2 = { "\u5168\u5C5E\u6027": 0, "\u653B\u51FB\u529B": 0, "\u751F\u547D\u503C": 0 };
          let matches = /全属性\s*\+\s*(\d+(?:\.\d+)?)%/.exec(html2);
          if (matches) {
            haloInfo2["\u5168\u5C5E\u6027"] = Math.round(parseFloat(matches[1]) * 10) / 1e3;
            let extraMatches = /福利加成\s*\+\s*(\d+)攻击力\s*&\s*\+\s*(\d+)生命值/.exec(html2);
            if (extraMatches) {
              haloInfo2["\u653B\u51FB\u529B"] = parseInt(extraMatches[1]);
              haloInfo2["\u751F\u547D\u503C"] = parseInt(extraMatches[2]);
            }
            setValue(Const_default.haloInfoTmpLogName, $.extend(haloInfo2, { time: $.now() }));
            return haloInfo2;
          } else return "error";
        }, () => "timeout");
      };
      setHaloInfo = function(newHaloInfo) {
        haloInfo = newHaloInfo;
        if (!$("#pdHaloInfo").length) {
          let $node = $properties.find('input[type="text"]:eq(13)');
          if (!$node.length || $.trim($node.val())) return;
          $node.attr("id", "pdHaloInfo");
          $('<a data-name="reloadHaloInfo" href="#" style="margin-left: -20px;" title="\u5982\u6218\u529B\u5149\u73AF\u4FE1\u606F\u4E0D\u6B63\u786E\u65F6\uFF0C\u8BF7\u70B9\u6B64\u91CD\u65B0\u8BFB\u53D6">\u8BFB</a>').insertAfter($node).click(function(e) {
            e.preventDefault();
            if (confirm("\u662F\u5426\u91CD\u65B0\u8BFB\u53D6\u6218\u529B\u5149\u73AF\u4FE1\u606F\uFF1F")) {
              deleteValue(Const_default.haloInfoTmpLogName);
              readHaloInfo();
            }
          });
        }
        $("#pdHaloInfo").val(`\u5168\u5C5E\u6027+${Math.round(haloInfo["\u5168\u5C5E\u6027"] * 1e3) / 10}% (+${haloInfo["\u653B\u51FB\u529B"]}|+${haloInfo["\u751F\u547D\u503C"]})`);
      };
      getPromoteHaloInfo = function() {
        runFunc("Loot.getPromoteHaloInfo_before_");
        console.log("\u83B7\u53D6\u6218\u529B\u5149\u73AF\u9875\u9762\u4FE1\u606FStart");
        let $wait = wait("<strong>\u6B63\u5728\u83B7\u53D6\u6218\u529B\u5149\u73AF\u4FE1\u606F\uFF0C\u8BF7\u7A0D\u5019&hellip;</strong>");
        const setCookie2 = function(value) {
          let nextTime = getDate(value);
          setCookie(Const_default.promoteHaloCookieName, nextTime.getTime(), nextTime);
          $(document).dequeue("AutoAction");
          return false;
        };
        const getPersonalInfo = function() {
          $.ajax({
            type: "GET",
            url: `profile.php?action=show&uid=${Info_default.uid}&t=${$.now()}`,
            timeout: Const_default.defAjaxTimeout
          }).done(function(html2) {
            remove($wait);
            let regex2 = Config.promoteHaloCostType >= 11 ? /贡献数值：(\d+(?:\.\d+)?)/ : /论坛货币：(-?\d+)\s*KFB/;
            let matches = regex2.exec(html2);
            if (!matches) return setCookie2(`+${Const_default.promoteHaloLimitNextActionInterval}m`);
            let currency = parseFloat(matches[1]);
            if (currency > Config.promoteHaloLimit) {
              let { num: num2 } = getPromoteHaloCostByTypeId(Config.promoteHaloCostType);
              let maxCount = Math.floor((currency - Config.promoteHaloLimit) / num2);
              if (maxCount > 0) {
                $wait = wait("<strong>\u6B63\u5728\u83B7\u53D6\u6218\u529B\u5149\u73AF\u4FE1\u606F\uFF0C\u8BF7\u7A0D\u5019&hellip;</strong>");
                getHaloInfo2(maxCount);
              } else return setCookie2(`+${Const_default.promoteHaloLimitNextActionInterval}m`);
            } else return setCookie2(`+${Const_default.promoteHaloLimitNextActionInterval}m`);
          }).fail(() => setTimeout(getPersonalInfo, Const_default.defAjaxInterval));
        };
        const getHaloInfo2 = function(maxCount = -1) {
          $.ajax({
            type: "GET",
            url: "kf_fw_ig_halo.php?t=" + $.now(),
            timeout: Const_default.defAjaxTimeout
          }).done(function(html2) {
            remove($wait);
            let safeIdMatches = /safeid=(\w+)"/.exec(html2);
            if (!safeIdMatches) return setCookie2("+1h");
            let safeId3 = safeIdMatches[1];
            let surplusMatches = /下次随机还需\[(\d+)]分钟/.exec(html2);
            if (surplusMatches) {
              let promoteHaloInterval = Config.promoteHaloAutoIntervalEnabled ? Const_default.minPromoteHaloInterval : Config.promoteHaloInterval * 60;
              promoteHaloInterval = promoteHaloInterval < Const_default.minPromoteHaloInterval ? Const_default.minPromoteHaloInterval : promoteHaloInterval;
              return setCookie2(`+${promoteHaloInterval - (Const_default.minPromoteHaloInterval - parseInt(surplusMatches[1]))}m`);
            }
            let totalCount = 1;
            let countMatches = /当前光环随机可用\[(\d+)]次/.exec(html2);
            if (Config.promoteHaloAutoIntervalEnabled && countMatches) {
              totalCount = parseInt(countMatches[1]);
              if (maxCount > -1) totalCount = totalCount > maxCount ? maxCount : totalCount;
            }
            promoteHalo(totalCount, Config.promoteHaloCostType, safeId3);
          }).fail(function() {
            remove($wait);
            setTimeout(getPromoteHaloInfo, Const_default.defAjaxInterval);
          });
        };
        if (Config.promoteHaloLimit > 0) getPersonalInfo();
        else getHaloInfo2();
      };
      promoteHalo = function(totalCount, promoteHaloCostType, safeId3) {
        console.log("\u63D0\u5347\u6218\u529B\u5149\u73AFStart");
        let $wait = wait(
          `<strong>\u6B63\u5728\u63D0\u5347\u6218\u529B\u5149\u73AF&hellip;</strong><i>\u5269\u4F59\uFF1A<em class="pd_countdown">${totalCount}</em></i><a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>`
        );
        deleteValue(Const_default.haloInfoTmpLogName);
        let isStop = false;
        let index = 0;
        let nextTime = getDate("+10m").getTime();
        const promote = function() {
          $.ajax({
            type: "GET",
            url: `kf_fw_ig_halo.php?do=buy&id=${promoteHaloCostType}&safeid=${safeId3}&t=${$.now()}`,
            timeout: Const_default.defAjaxTimeout
          }).done(function(html2) {
            showFormatLog("\u63D0\u5347\u6218\u529B\u5149\u73AF", html2);
            let { msg } = getResponseMsg(html2);
            let matches = /(新数值为|随机值为)\[(\d+(?:\.\d+)?)%]/.exec(msg);
            if (matches) {
              let isNew = matches[1] === "\u65B0\u6570\u503C\u4E3A";
              nextTime = Config.promoteHaloAutoIntervalEnabled ? 0 : getDate(`+${Config.promoteHaloInterval}h`).getTime();
              let randomNum = parseFloat(matches[2]);
              let costResult = getPromoteHaloCostByTypeId(promoteHaloCostType);
              show(
                "<strong>" + (isNew ? `\u606D\u559C\u4F60\u63D0\u5347\u4E86\u5149\u73AF\u7684\u6548\u679C\uFF01\u65B0\u6570\u503C\u4E3A\u3010<em>${randomNum}%</em>\u3011` : `\u4F60\u672C\u6B21\u968F\u673A\u503C\u4E3A\u3010<em>${randomNum}%</em>\u3011\uFF0C\u672A\u8D85\u8FC7\u5149\u73AF\u6548\u679C`) + `</strong><i>${costResult.type}<ins>${(-costResult.num).toLocaleString()}</ins></i>`
              );
              let pay = {};
              pay[costResult.type] = -costResult.num;
              push(
                "\u63D0\u5347\u6218\u529B\u5149\u73AF",
                isNew ? `\u606D\u559C\u4F60\u63D0\u5347\u4E86\u5149\u73AF\u7684\u6548\u679C\uFF01\u65B0\u6570\u503C\u4E3A\u3010\`${randomNum}%\`\u3011` : `\u4F60\u672C\u6B21\u968F\u673A\u503C\u4E3A\u3010\`${randomNum}%\`\u3011\uFF0C\u672A\u8D85\u8FC7\u5149\u73AF\u6548\u679C`,
                { pay }
              );
              index++;
            } else {
              if (/两次操作间隔过短/.test(msg)) nextTime = getDate("+10s").getTime();
              else isStop = true;
              matches = /你的(贡献点数|KFB)不足/.exec(msg);
              if (matches) {
                nextTime = getDate(`+${Config.promoteHaloInterval}h`).getTime();
                show(`<strong>${matches[1]}\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u63D0\u5347\u6218\u529B\u5149\u73AF</strong><a href="kf_fw_ig_halo.php" target="_blank">\u624B\u52A8\u9009\u62E9</a>`, -1);
              }
              matches = /你还需要等待(\d+)分钟/.exec(msg);
              if (matches) {
                let promoteHaloInterval = Config.promoteHaloInterval * 60;
                promoteHaloInterval = promoteHaloInterval < Const_default.minPromoteHaloInterval ? Const_default.minPromoteHaloInterval : promoteHaloInterval;
                nextTime = getDate(`+${Config.promoteHaloInterval * 60 - (Const_default.minPromoteHaloInterval - parseInt(matches[1]))}m`).getTime();
              }
            }
          }).always(function() {
            $wait.find(".pd_countdown").text(totalCount - index);
            isStop = isStop || $wait.data("stop");
            if (isStop || index === totalCount) {
              remove($wait);
              if (nextTime > 0 || isStop) {
                setCookie(Const_default.promoteHaloCookieName, nextTime, new Date(nextTime));
                setTimeout(() => $(document).dequeue("AutoAction"), Const_default.minActionInterval);
              } else {
                deleteCookie(Const_default.promoteHaloCookieName);
                getPromoteHaloInfo();
              }
              runFunc("Loot.promoteHalo_after_");
            } else {
              setTimeout(promote, Const_default.promoteHaloActionInterval);
            }
          });
        };
        promote();
      };
      getPromoteHaloCostByTypeId = function(id) {
        switch (id) {
          case 1:
            return { type: "KFB", num: 100 };
          case 2:
            return { type: "KFB", num: 1e3 };
          case 11:
            return { type: "\u8D21\u732E", num: 0.2 };
          case 12:
            return { type: "\u8D21\u732E", num: 2 };
          default:
            return { type: "KFB", num: 0 };
        }
      };
    }
  });

  // src/module/Index.js
  var Index_exports = {};
  __export(Index_exports, {
    addPromoteHaloInterval: () => addPromoteHaloInterval,
    addThreadFastGotoLink: () => addThreadFastGotoLink,
    smLevelUpAlert: () => smLevelUpAlert,
    smRankChangeAlert: () => smRankChangeAlert
  });
  var smLevelUpAlert, smRankChangeAlert, addThreadFastGotoLink, addPromoteHaloInterval;
  var init_Index = __esm({
    "src/module/Index.js"() {
      "use strict";
      init_Info();
      init_Util();
      init_Msg();
      init_Const();
      init_Log();
      init_TmpLog();
      init_Loot();
      smLevelUpAlert = function() {
        let smLevel = parseInt($("#pdSmLevel").data("sm-level"));
        if (!smLevel) return;
        const writeData2 = function(smLevel2) {
          setValue(Const_default.smLevelUpTmpLogName, { time: $.now(), smLevel: smLevel2 });
        };
        let data = getValue(Const_default.smLevelUpTmpLogName);
        if (!data || $.type(data.time) !== "number" || $.type(data.smLevel) !== "number") {
          writeData2(smLevel);
        } else if (smLevel > data.smLevel) {
          let diff = Math.floor(($.now() - data.time) / 60 / 60 / 1e3);
          if (diff >= Const_default.smLevelUpAlertInterval) {
            let date = new Date(data.time);
            writeData2(smLevel);
            push(
              "\u795E\u79D8\u7B49\u7EA7\u5347\u7EA7",
              `\u81EA\`${getDateString(date)}\`\u4EE5\u6765\uFF0C\u4F60\u7684\u795E\u79D8\u7B49\u7EA7\u5171\u4E0A\u5347\u4E86\`${smLevel - data.smLevel}\`\u7EA7 (Lv.\`${data.smLevel}\`->Lv.\`${smLevel}\`)`
            );
            show(`\u81EA<em>${getDateString(date)}</em>\u4EE5\u6765\uFF0C\u4F60\u7684\u795E\u79D8\u7B49\u7EA7\u5171\u4E0A\u5347\u4E86<em>${smLevel - data.smLevel}</em>\u7EA7`);
          } else if (diff < 0) {
            writeData2(smLevel);
          }
        } else if (smLevel < data.smLevel) {
          writeData2(smLevel);
        }
      };
      smRankChangeAlert = function() {
        let smRank = $("#pdSmLevel").data("sm-rank");
        if (!smRank || smRank.toString().endsWith("+")) return;
        smRank = parseInt(smRank);
        const writeData2 = (smRank2) => setValue(Const_default.smRankChangeTmpLogName, { time: $.now(), smRank: smRank2 });
        let data = getValue(Const_default.smRankChangeTmpLogName);
        if (!data || $.type(data.time) !== "number" || $.type(data.smRank) !== "number") {
          writeData2(smRank);
        } else if (smRank !== data.smRank) {
          let diff = Math.floor(($.now() - data.time) / 60 / 60 / 1e3);
          if (diff >= Const_default.smRankChangeAlertInterval) {
            let date = new Date(data.time);
            let isUp = smRank < data.smRank;
            writeData2(smRank);
            push(
              "\u795E\u79D8\u7CFB\u6570\u6392\u540D\u53D8\u5316",
              `\u81EA\`${getDateString(date)}\`\u4EE5\u6765\uFF0C\u4F60\u7684\u795E\u79D8\u7CFB\u6570\u6392\u540D\u5171\`${isUp ? "\u4E0A\u5347" : "\u4E0B\u964D"}\`\u4E86\`${Math.abs(smRank - data.smRank)}\`\u540D (No.\`${data.smRank}\`->No.\`${smRank}\`)`
            );
            show(
              `\u81EA<em>${getDateString(date)}</em>\u4EE5\u6765\uFF0C\u4F60\u7684\u795E\u79D8\u7CFB\u6570\u6392\u540D\u5171<b style="color: ${isUp ? "#F00" : "#393"}">${isUp ? "\u4E0A\u5347" : "\u4E0B\u964D"}</b>\u4E86<em>${Math.abs(smRank - data.smRank)}</em>\u540D`
            );
          } else if (diff < 0) {
            writeData2(smRank);
          }
        }
      };
      addThreadFastGotoLink = function() {
        $("#alldiv > .drow:last-child").on("click", "span.indexlbtc_s, span.k_fr", function(e) {
          let $this2 = $(this);
          let url = $this2.parent("a").attr("href");
          if (url) {
            e.preventDefault();
            location.href = url + "&page=e#a";
            return false;
          }
        });
      };
      addPromoteHaloInterval = function() {
        let nextTime = parseInt(getCookie(Const_default.promoteHaloCookieName));
        if (!nextTime) return;
        let interval = nextTime - $.now();
        if (interval > 0) {
          let minutes = Math.ceil(interval / 60 / 1e3);
          let hours = Math.floor(minutes / 60);
          minutes -= hours * 60;
          $("#pdLoot").append(`<span id="pdHaloInterval"> (\u5149\u73AF\uFF1A${hours > 0 ? hours + "\u65F6" : ""}${minutes}\u5206)</span>`);
        }
      };
    }
  });

  // src/module/Post.js
  var Post_exports = {};
  __export(Post_exports, {
    addAttachChangeAlert: () => addAttachChangeAlert,
    addExtraOptionInPostPage: () => addExtraOptionInPostPage,
    addExtraPostEditorButton: () => addExtraPostEditorButton,
    addFillTitleBtn: () => addFillTitleBtn,
    addRedundantKeywordWarning: () => addRedundantKeywordWarning,
    handleMultiQuote: () => handleMultiQuote,
    importKfSmileEnhanceExtension: () => importKfSmileEnhanceExtension,
    modifyPostPreviewPage: () => modifyPostPreviewPage,
    preventCloseWindowWhenEditPost: () => preventCloseWindowWhenEditPost,
    removeUnpairedBBCodeInQuoteContent: () => removeUnpairedBBCodeInQuoteContent,
    replaceSiteLink: () => replaceSiteLink,
    savePostContentWhenSubmit: () => savePostContentWhenSubmit
  });
  var handleMultiQuote, removeUnpairedBBCodeInQuoteContent, addExtraPostEditorButton, addExtraOptionInPostPage, modifyPostPreviewPage, addAttachChangeAlert, importKfSmileEnhanceExtension, preventCloseWindowWhenEditPost, savePostContentWhenSubmit, addRedundantKeywordWarning, addFillTitleBtn, replaceSiteLink;
  var init_Post = __esm({
    "src/module/Post.js"() {
      "use strict";
      init_Info();
      init_Util();
      init_Msg();
      init_Const();
      init_Script();
      handleMultiQuote = function(type = 1) {
        runFunc("Post.handleMultiQuote_before_", type);
        if (!$("#pdClearMultiQuoteData").length) {
          if (location.pathname === "/read.php") {
            $('<a id="pdClearMultiQuoteData" style="margin-right: 7px;" title="\u6E05\u9664\u5728\u6D4F\u89C8\u5668\u4E2D\u4FDD\u5B58\u7684\u591A\u91CD\u5F15\u7528\u6570\u636E" href="#">\u6E05\u9664\u5F15\u7528\u6570\u636E</a>').prependTo($('input[name="diy_guanjianci"]').parent());
          } else {
            $('<a id="pdClearMultiQuoteData" style="margin-left: 7px;" title="\u6E05\u9664\u5728\u6D4F\u89C8\u5668\u4E2D\u4FDD\u5B58\u7684\u591A\u91CD\u5F15\u7528\u6570\u636E" href="#">\u6E05\u9664\u5F15\u7528\u6570\u636E</a>').insertAfter('input[name="diy_guanjianci"]');
          }
          $("#pdClearMultiQuoteData").click(function(e) {
            e.preventDefault();
            localStorage.removeItem(Const_default.multiQuoteStorageName);
            $('input[name="diy_guanjianci"]').val("");
            $(type === 2 ? "#textarea" : 'textarea[name="atc_content"]').val("");
            alert("\u591A\u91CD\u5F15\u7528\u6570\u636E\u5DF2\u88AB\u6E05\u9664");
          });
        }
        let data = localStorage[Const_default.multiQuoteStorageName];
        if (!data) return;
        try {
          data = JSON.parse(data);
        } catch (ex) {
          return;
        }
        if (!data || $.type(data) !== "object" || $.isEmptyObject(data)) return;
        let tid = parseInt(getUrlParam("tid")), fid2 = parseInt(getUrlParam("fid"));
        if (!tid || typeof data.tid === "undefined" || data.tid !== tid || !Array.isArray(data.quoteList)) return;
        if (type === 2 && !fid2) return;
        let list = [];
        for (let quote of data.quoteList) {
          if (!Array.isArray(quote)) continue;
          for (let data2 of quote) {
            list.push(data2);
          }
        }
        if (!list.length) {
          localStorage.removeItem(Const_default.multiQuoteStorageName);
          return;
        }
        let keywords = /* @__PURE__ */ new Set();
        let content = "";
        let $keywords = $('input[name="diy_guanjianci"]');
        if (type === 2) {
          wait(`<strong>\u6B63\u5728\u83B7\u53D6\u5F15\u7528\u5185\u5BB9\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em class="pd_countdown">${list.length}</em></i>`);
          $(document).clearQueue("MultiQuote");
        }
        $.each(list, function(index, data2) {
          if (typeof data2.floor === "undefined" || typeof data2.pid === "undefined") return;
          keywords.add(data2.userName);
          if (type === 2) {
            $(document).queue("MultiQuote", function() {
              $.get(
                `post.php?action=quote&fid=${fid2}&tid=${tid}&pid=${data2.pid}&article=${data2.floor}&t=${$.now()}`,
                function(html2) {
                  let matches = /<textarea id="textarea".*?>((.|\n)+?)<\/textarea>/i.exec(html2);
                  if (matches) {
                    content += removeUnpairedBBCodeContent(
                      htmlDecode(matches[1]).replace(/\n{2,}/g, "\n")
                    ) + (index === list.length - 1 ? "" : "\n");
                  }
                  let $countdown = $(".pd_countdown:last");
                  $countdown.text(parseInt($countdown.text()) - 1);
                  if (index === list.length - 1) {
                    destroy();
                    let $textarea = $("#textarea");
                    $textarea.get(0).defaultValue = content;
                    $textarea.val(content).focus();
                    $keywords.trigger("change");
                  } else {
                    setTimeout(function() {
                      $(document).dequeue("MultiQuote");
                    }, 100);
                  }
                }
              );
            });
          } else {
            content += `[quote]\u56DE ${data2.floor}\u697C(${data2.userName}) \u7684\u5E16\u5B50[/quote]
`;
          }
        });
        $keywords.val([...keywords].join(","));
        $('form[name="FORM"]').submit(function() {
          localStorage.removeItem(Const_default.multiQuoteStorageName);
        });
        if (type === 2) {
          $(document).dequeue("MultiQuote");
        } else {
          let $textarea = $('textarea[name="atc_content"]');
          $textarea.get(0).defaultValue = content;
          $textarea.val(content).focus();
          $keywords.trigger("change");
        }
        runFunc("Post.handleMultiQuote_after_", type);
      };
      removeUnpairedBBCodeInQuoteContent = function() {
        let $content = $("#textarea");
        let content = $content.val();
        let matches = /\[quote\](.|\r|\n)+?\[\/quote\]/.exec(content);
        if (matches) {
          let workedContent = removeUnpairedBBCodeContent(matches[0]);
          if (matches[0] !== workedContent) {
            $content.val(content.replace(matches[0], workedContent));
          }
        }
      };
      addExtraPostEditorButton = function() {
        let textArea = $("#textarea").get(0);
        if (!textArea) return;
        $(`
<span id="wy_post" title="\u63D2\u5165\u9690\u85CF\u5185\u5BB9" data-type="hide" style="background-position: 0 -280px;">\u63D2\u5165\u9690\u85CF\u5185\u5BB9</span>
<span id="wy_justifyleft" title="\u5DE6\u5BF9\u9F50" data-type="left" style="background-position: 0 -360px;">\u5DE6\u5BF9\u9F50</span>
<span id="wy_justifycenter" title="\u5C45\u4E2D" data-type="center" style="background-position: 0 -380px;">\u5C45\u4E2D</span>
<span id="wy_justifyright" title="\u53F3\u5BF9\u9F50" data-type="right" style="background-position: 0 -400px;">\u53F3\u5BF9\u9F50</span>
<span id="wy_subscript" title="\u4E0B\u6807" data-type="sub" style="background-position: 0 -80px;">\u4E0B\u6807</span>
<span id="wy_superscript" title="\u4E0A\u6807" data-type="sup" style="background-position: 0 -100px;">\u4E0A\u6807</span>
<span class="pd_editor_btn" title="\u63D2\u5165\u98DE\u884C\u6587\u5B57" data-type="fly">F</span>
<span class="pd_editor_btn" title="\u63D2\u5165HTML5\u97F3\u9891" data-type="audio">A</span>
<span class="pd_editor_btn" title="\u63D2\u5165HTML5\u89C6\u9891" data-type="video">V</span>
`).appendTo("#editor-button .editor-button").click(function() {
          let $this2 = $(this);
          let type = $this2.data("type");
          let text = "";
          switch (type) {
            case "hide":
              text = prompt("\u8BF7\u8F93\u5165\u795E\u79D8\u7B49\u7EA7\uFF1A", 5);
              break;
            case "audio":
              {
                text = prompt("\u8BF7\u8F93\u5165HTML5\u97F3\u9891\u5B9E\u9645\u5730\u5740\uFF1A\n\uFF08\u53EF\u76F4\u63A5\u8F93\u5165\u7F51\u6613\u4E91\u97F3\u4E50\u7684\u5355\u66F2\u5730\u5740\uFF0C\u5C06\u81EA\u52A8\u8F6C\u6362\u4E3A\u5916\u94FE\u5730\u5740\uFF09", "http://");
                let matches = /^https?:\/\/music\.163\.com\/(?:#\/)?song\?id=(\d+)/i.exec(text);
                if (matches) text = `https://music.miaola.work/163/${matches[1]}.mp3`;
                matches = /^https?:\/\/www\.xiami\.com\/song\/(\w+)/i.exec(text);
                if (matches) text = `https://music.miaola.work/xiami/${matches[1]}.mp3`;
              }
              break;
            case "video":
              {
                text = prompt("\u8BF7\u8F93\u5165HTML5\u89C6\u9891\u5B9E\u9645\u5730\u5740\uFF1A\n\uFF08\u53EF\u76F4\u63A5\u8F93\u5165YouTube\u89C6\u9891\u9875\u9762\u7684\u5730\u5740\uFF0C\u5C06\u81EA\u52A8\u8F6C\u6362\u4E3A\u5916\u94FE\u5730\u5740\uFF09", "http://");
                let matches = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w\-]+)/i.exec(text);
                if (matches) text = `https://video.miaola.work/youtube/${matches[1]}`;
                matches = /^https?:\/\/youtu\.be\/([\w\-]+)$/i.exec(text);
                if (matches) text = `https://video.miaola.work/youtube/${matches[1]}`;
              }
              break;
          }
          if (text === null) return;
          let selText = "";
          let code = "";
          switch (type) {
            case "hide":
              selText = getSelText(textArea);
              code = `[hide=${text}]${selText}[/hide]`;
              break;
            case "left":
              selText = getSelText(textArea);
              code = `[align=left]${selText}[/align]`;
              break;
            case "center":
              selText = getSelText(textArea);
              code = `[align=center]${selText}[/align]`;
              break;
            case "right":
              selText = getSelText(textArea);
              code = `[align=right]${selText}[/align]`;
              break;
            case "fly":
              selText = getSelText(textArea);
              code = `[fly]${selText}[/fly]`;
              break;
            case "sub":
              selText = getSelText(textArea);
              code = `[sub]${selText}[/sub]`;
              break;
            case "sup":
              selText = getSelText(textArea);
              code = `[sup]${selText}[/sup]`;
              break;
            case "audio":
              code = `[audio]${text}[/audio]`;
              break;
            case "video":
              code = `[video]${text}[/video]`;
              break;
          }
          if (!code) return;
          addCode(textArea, code, selText);
          textArea.focus();
        }).mouseenter(function() {
          $(this).addClass("buttonHover");
        }).mouseleave(function() {
          $(this).removeClass("buttonHover");
        });
      };
      addExtraOptionInPostPage = function() {
        $(`
<div class="pd_post_extra_option">
  <label><input type="checkbox" name="autoAnalyzeUrl" checked> \u81EA\u52A8\u5206\u6790url</label>
  <label style="margin-left: 5px;"><input type="checkbox" name="windCodeAutoConvert" checked> Wind Code\u81EA\u52A8\u8F6C\u6362</label>
</div>
`).appendTo($("#menu_show").closest("td")).on("click", '[type="checkbox"]', function() {
          let $this2 = $(this);
          let inputName = $this2.is('[name="autoAnalyzeUrl"]') ? "atc_autourl" : "atc_convert";
          $('form[name="FORM"]').find(`[name="${inputName}"]`).val($this2.prop("checked") ? 1 : 0);
        });
        $('<input type="button" value="\u9884\u89C8\u5E16\u5B50" style="margin-left: 7px;">').insertAfter('[type="submit"][name="Submit"]').click(function(e) {
          e.preventDefault();
          let $form = $('form[name="preview"]');
          $form.find('input[name="atc_content"]').val($("#textarea").val());
          $form.submit();
        });
      };
      modifyPostPreviewPage = function() {
        $("table > tbody > tr.tr1 > th").css({
          "text-align": "left",
          "font-weight": "normal",
          "border": "1px solid #9191ff",
          "padding": "10px"
        });
      };
      addAttachChangeAlert = function() {
        $(document).on("click", '.abtn[id^="md_"]', function() {
          if (!$(document).data("attachUpdateAlert")) {
            alert("\u672C\u53CD\u5411\u4EE3\u7406\u670D\u52A1\u5668\u4E3A\u4E86\u63D0\u9AD8\u6027\u80FD\u5BF9\u56FE\u7247\u8BBE\u7F6E\u4E86\u7F13\u5B58\uFF0C\u66F4\u65B0\u9644\u4EF6\u56FE\u7247\u540E\u53EF\u80FD\u9700\u7B49\u5F85\u6700\u591A30\u5206\u949F\u624D\u80FD\u770B\u5230\u6548\u679C");
            $(document).data("attachUpdateAlert", true);
          }
        });
      };
      importKfSmileEnhanceExtension = function() {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.charset = "utf-8";
        script.src = "https://kf.miaola.work/KfEmotion.min.user.js" + (typeof Info_default.w.resTimestamp !== "undefined" ? "?ts=" + Info_default.w.resTimestamp : "");
        document.body.appendChild(script);
      };
      preventCloseWindowWhenEditPost = function() {
        window.addEventListener("beforeunload", function(e) {
          let $textArea = $(location.pathname === "/post.php" ? "#textarea" : 'textarea[name="atc_content"]');
          let content = $textArea.val();
          if (content && content !== $textArea.get(0).defaultValue && !Info_default.w.isSubmit) {
            let msg = "\u4F60\u53EF\u80FD\u6B63\u5728\u64B0\u5199\u53D1\u5E16\u5185\u5BB9\u4E2D\uFF0C\u786E\u5B9A\u8981\u5173\u95ED\u9875\u9762\u5417\uFF1F";
            e.returnValue = msg;
            return msg;
          }
        });
        $('form[action="post.php?"]').submit(function() {
          Info_default.w.isSubmit = true;
        });
      };
      savePostContentWhenSubmit = function() {
        let $textArea = $(location.pathname === "/post.php" ? "#textarea" : 'textarea[name="atc_content"]');
        $('form[action="post.php?"]').submit(function() {
          let content = $textArea.val();
          if ($.trim(content).length > 0) sessionStorage.setItem(Const_default.postContentStorageName, content);
        });
        let postContent = sessionStorage.getItem(Const_default.postContentStorageName);
        if (postContent) {
          $(`
<div style="padding: 0 10px; line-height: 2em; text-align: left; background-color: #fefee9; border: 1px solid #99f;">
  <a class="pd_btn_link" data-name="restore" href="#">[\u6062\u590D\u4E0A\u6B21\u63D0\u4EA4\u7684\u5185\u5BB9]</a>
  <a class="pd_btn_link" data-name="clear" href="#">[\u6E05\u9664]</a>
</div>
`).insertBefore($textArea).find('[data-name="restore"]').click(function(e) {
            e.preventDefault();
            $textArea.val(postContent);
            $(this).parent().find('[data-name="clear"]').click();
          }).end().find('[data-name="clear"]').click(function(e) {
            e.preventDefault();
            sessionStorage.removeItem(Const_default.postContentStorageName);
            $(this).parent().remove();
          });
        }
      };
      addRedundantKeywordWarning = function() {
        $('input[name="diy_guanjianci"]').change(function() {
          let $this2 = $(this);
          let keywords = $.trim($this2.val()).split(",").filter((str) => str);
          if (keywords.length > 5) {
            alert("\u6240\u586B\u5173\u952E\u8BCD\u5DF2\u8D85\u8FC75\u4E2A\uFF0C\u591A\u4F59\u7684\u5173\u952E\u8BCD\u5C06\u88AB\u5FFD\u7565");
            $this2.select().focus();
          }
        });
      };
      addFillTitleBtn = function() {
        $('<a class="pd_btn_link" data-name="fill" href="#" title="\u6309\u7167\u683C\u5F0F\u586B\u5145\u6807\u9898">\u586B\u5145</a>').insertAfter("#btyl").click(function(e) {
          e.preventDefault();
          let value = $.trim(
            prompt(`\u8BF7\u6309\u683C\u5F0F\u586B\u5199\u6807\u9898\u540D\u79F0\uFF0C\u4F1A\u81EA\u52A8\u586B\u5145\u5230\u76F8\u5E94\u7684\u8868\u5355\u4E2D\uFF08\u9009\u586B\u9879\u53EF\u4E0D\u586B\uFF09\uFF1A
\u4F8B\uFF1A[\u8BF8\u795E\u5B57\u5E55\u7EC4][Seiren][\u6E05\u604B][01-12\u5408\u96C6][\u7B80\u7E41\u65E5\u5185\u6302][1080P][\u767E\u5EA630D][3.25GB][BDRIP]
\u6216 [\u81EA\u8D2D][\u65B0\u4F5C][nostalabel]\u5F85\u96EA\u306E\u82B1 \uFF5Esnow drop\uFF5E[MEGA\u957F\u671F][667MB][BMP]`)
          );
          if (!value) return;
          let matches = /(\[自购\])?(\[新作\])?(.+)\[([^\[\]]+?)(\d+D|长期)?\]\[(\d+(?:\.\d+)?(?:G|M)B?)\](?:\[([^\[\]]+)\])?/i.exec(value);
          if (!matches) {
            alert("\u6807\u9898\u683C\u5F0F\u4E0D\u7B26\u5408\u6807\u51C6");
            return;
          }
          $("#diy_titlezigou").prop("checked", typeof matches[1] !== "undefined");
          $("#diy_xinzuo").prop("checked", typeof matches[2] !== "undefined");
          $("#diy_titlewplx").val(matches[4]);
          $("#diy_titleyxqx").val(matches[5] ? matches[5] : "");
          $("#diy_titlezytj").val(matches[6]);
          $("#diy_titlezygs").val(matches[7] ? matches[7] : "");
          $("#diy_titlezpmc").val(matches[3]).trigger("change");
        });
      };
      replaceSiteLink = function() {
        $('form[name="FORM"]').submit(
          function() {
            let $textArea = $(this).find('textarea[name="atc_content"]');
            if (!$textArea.length) return;
            $textArea.val(
              $textArea.val().replace(
                new RegExp(`${location.protocol}//${location.hostname.replace(/\./g, "\\.")}/(\\w+)\\.php`, "g"),
                "https://bbs.kfpromax.com/$1.php"
              )
            );
          }
        );
      };
    }
  });

  // src/module/Read.js
  var Read_exports = {};
  __export(Read_exports, {
    addCopyBuyersListOption: () => addCopyBuyersListOption,
    addCopyCodeLink: () => addCopyCodeLink,
    addFastGotoFloorInput: () => addFastGotoFloorInput,
    addFloorGotoLink: () => addFloorGotoLink,
    addMoreSmileLink: () => addMoreSmileLink,
    addMultiQuoteButton: () => addMultiQuoteButton,
    addSignTips: () => addSignTips,
    addStatAndBuyThreadBtn: () => addStatAndBuyThreadBtn,
    addUserMemo: () => addUserMemo,
    adjustThreadContentFontSize: () => adjustThreadContentFontSize,
    buyThreads: () => buyThreads,
    clearBuyThreadLog: () => clearBuyThreadLog,
    fastGotoFloor: () => fastGotoFloor,
    getMultiQuoteData: () => getMultiQuoteData,
    getThreadTitle: () => getThreadTitle,
    handleBuyThreadBtn: () => handleBuyThreadBtn,
    modifyFloorSmColor: () => modifyFloorSmColor,
    modifyKFOtherDomainLink: () => modifyKFOtherDomainLink,
    modifyMySmColor: () => modifyMySmColor,
    parseMediaTag: () => parseMediaTag,
    readBuyThreadLog: () => readBuyThreadLog,
    recordBuyThreadLog: () => recordBuyThreadLog,
    replaceReadImage: () => replaceReadImage,
    showAttachImageOutsideSellBox: () => showAttachImageOutsideSellBox,
    showBuyThreadLogDialog: () => showBuyThreadLogDialog,
    showStatFloorDialog: () => showStatFloorDialog,
    statFloor: () => statFloor,
    writeBuyThreadLog: () => writeBuyThreadLog
  });
  var addFloorGotoLink, addFastGotoFloorInput, fastGotoFloor, modifyFloorSmColor, modifyMySmColor, adjustThreadContentFontSize, addCopyBuyersListOption, addStatAndBuyThreadBtn, statFloor, showStatFloorDialog, buyThreads, handleBuyThreadBtn, getMultiQuoteData, addMultiQuoteButton, modifyKFOtherDomainLink, addUserMemo, addCopyCodeLink, addMoreSmileLink, parseMediaTag, showAttachImageOutsideSellBox, getThreadTitle, buyThreadLogName, readBuyThreadLog, writeBuyThreadLog, clearBuyThreadLog, recordBuyThreadLog, showBuyThreadLogDialog, addSignTips, replaceReadImage;
  var init_Read = __esm({
    "src/module/Read.js"() {
      "use strict";
      init_Info();
      init_Util();
      init_Msg();
      init_Dialog();
      init_Const();
      init_Config();
      init_Log();
      init_Script();
      init_Public();
      init_Post();
      addFloorGotoLink = function() {
        let sf = getThreadSfParam();
        $(".readtext").find("> table > tbody > tr > td:nth-child(2) > div > div:nth-child(2) > span:first-child").each(function() {
          let $this2 = $(this);
          let floorText = $this2.text();
          if (!/^\d+楼/.test(floorText)) return;
          let linkName = $this2.closest(".readtext").prev(".readlou").prev("a").attr("name");
          if (!linkName || !/^\d+$/.test(linkName)) return;
          let url = `${getHostNameUrl()}read.php?tid=${getUrlParam("tid")}&spid=${linkName}${sf ? "&sf=" + sf : ""}`;
          $this2.html($this2.html().replace(/(\d+)楼/, `<a class="pd_goto_link" href="${url}" title="\u590D\u5236\u697C\u5C42\u94FE\u63A5">$1\u697C</a>`));
          $this2.find("a").click(function(e) {
            e.preventDefault();
            let $this3 = $(this);
            let url2 = $this3.attr("href");
            $this3.data("copy-text", url2);
            if (!copyText($this3, "\u697C\u5C42\u94FE\u63A5\u5DF2\u590D\u5236")) {
              prompt("\u672C\u697C\u7684\u8DF3\u8F6C\u94FE\u63A5\uFF08\u8BF7\u6309Ctrl+C\u590D\u5236\uFF09\uFF1A", url2);
            }
          });
        });
      };
      addFastGotoFloorInput = function() {
        $(`
<li class="pd_fast_goto_floor">
    <form>
        \u76F4\u8FBE <input class="pd_input" style="width: 30px;" type="text" maxlength="8">
        <span data-name="submit" style="cursor: pointer;">\u697C</span>
    </form>
</li>
`).appendTo($("#read_tui").parent("li").parent(".b_tit2")).submit(function(e) {
          e.preventDefault();
          let floor = parseInt($(this).find("input").val());
          if (!floor || floor < 0) return;
          let sf = getThreadSfParam();
          location.href = `read.php?tid=${getUrlParam("tid")}&page=${parseInt(floor / Config.perPageFloorNum) + 1}&floor=${floor}&sf=${sf}`;
        }).find('[data-name="submit"]').click(function() {
          $(this).closest("form").submit();
        });
      };
      fastGotoFloor = function() {
        let floor = parseInt(getUrlParam("floor"));
        if (!floor || floor < 0) return;
        let $floorNode = $(`.readtext > table > tbody > tr > td:nth-child(2) > div > div:nth-child(2) > span:first-child:contains("${floor}\u697C")`);
        if (!$floorNode.length) return;
        let linkName = $floorNode.closest(".readtext").prev(".readlou").prev("a").attr("name");
        if (!linkName || !/^\d+$/.test(linkName)) return;
        location.hash = "#" + linkName;
      };
      modifyFloorSmColor = function($elem, color) {
        $elem.css("color", color).parent(".readidmsbottom").next(".readidmsbottom").find("> span:nth-child(2)").css("color", color).parent(".readidmsbottom").next(".readidmsbottom").find("> span:nth-child(2)").css("color", color);
        $elem.closest(".readtext").css("box-shadow", `1px 1px 2px 2px ${color}`).find("> table > tbody > tr > td:nth-child(2) > div").css("box-shadow", `1px 1px 2px 2px ${color}`);
      };
      modifyMySmColor = function() {
        let $my = $(`.readidmsbottom > a[href^="profile.php?action=show&uid=${Info_default.uid}"]`);
        if ($my.length > 0) {
          modifyFloorSmColor($my, Config.customMySmColor);
        }
      };
      adjustThreadContentFontSize = function() {
        if (Config.threadContentFontSize > 0 && Config.threadContentFontSize !== 12) {
          $("head").append(`
<style>
  .readtext > table > tbody > tr > td:nth-child(2) { font-size: ${Config.threadContentFontSize}px; line-height: 1.6em; width: 100%; }
  .readtext > table > tbody > tr > td:nth-child(2) > div > div:first-child,
  .readtext > table > tbody > tr > td:nth-child(2) > div > div:nth-child(2),
  .readtext .read_fds {
    font-size: 14px;
    line-height: 22px;
  }
</style>
`);
        }
      };
      addCopyBuyersListOption = function() {
        $('.readtext select[name="buyers"]').each(function() {
          $(this).find("option:first-child").after('<option value="copyList">\u590D\u5236\u540D\u5355</option><option value="openBuyThreadLogDialog">\u67E5\u770B\u8D2D\u4E70\u8BB0\u5F55</option>');
        });
        $(document).on("change", 'select[name="buyers"]', function() {
          let $this2 = $(this);
          let name4 = $this2.val();
          if (name4 === "copyList") {
            let buyerList = $this2.find("option").map(function(index) {
              let name5 = $(this).text();
              if (index <= 2 || name5.includes("-".repeat(11))) return null;
              else return name5;
            }).get().join("\n");
            $this2.get(0).selectedIndex = 0;
            if (!buyerList) {
              alert("\u6682\u65F6\u65E0\u4EBA\u8D2D\u4E70");
              return;
            }
            const dialogName2 = "pdCopyBuyerListDialog";
            if ($("#" + dialogName2).length > 0) return;
            let html2 = `
<div class="pd_cfg_main">
  <textarea name="buyerList" style="width: 200px; height: 300px; margin: 5px 0;" readonly>${buyerList}</textarea>
</div>`;
            let $dialog2 = create(dialogName2, "\u8D2D\u4E70\u4EBA\u540D\u5355", html2);
            show2(dialogName2);
            $dialog2.find('[name="buyerList"]').select().focus();
          } else if (name4 === "openBuyThreadLogDialog") {
            $this2.get(0).selectedIndex = 0;
            showBuyThreadLogDialog();
          }
        });
      };
      addStatAndBuyThreadBtn = function() {
        $('<span style="margin: 0 5px;">|</span><a data-name="statAndBuyThread" title="\u7EDF\u8BA1\u56DE\u5E16\u8005\u540D\u5355\u4EE5\u53CA\u6279\u91CF\u8D2D\u4E70\u5E16\u5B50" href="#">\u7EDF\u8BA1\u548C\u8D2D\u4E70</a>').insertAfter('td > a[href^="kf_tidfavor.php?action=favor&tid="]').filter('[data-name="statAndBuyThread"]').click(function(e) {
          e.preventDefault();
          if ($("#pdStatFloorDialog").length > 0) return;
          let tid = parseInt(getUrlParam("tid"));
          if (!tid) return;
          let value = $.trim(prompt("\u7EDF\u8BA1\u5230\u7B2C\u51E0\u697C\uFF1F\uFF080\u8868\u793A\u7EDF\u8BA1\u6240\u6709\u697C\u5C42\uFF0C\u53EF\u7528m-n\u7684\u65B9\u5F0F\u6765\u8BBE\u5B9A\u7EDF\u8BA1\u697C\u5C42\u7684\u533A\u95F4\u8303\u56F4\uFF09", 0));
          if (value === "") return;
          if (!/^\d+(-\d+)?$/.test(value)) {
            alert("\u7EDF\u8BA1\u697C\u5C42\u683C\u5F0F\u4E0D\u6B63\u786E");
            return;
          }
          let sf = getThreadSfParam();
          let startFloor = 0, endFloor = 0;
          let valueArr = value.split("-");
          if (valueArr.length === 2) {
            startFloor = parseInt(valueArr[0]);
            endFloor = parseInt(valueArr[1]);
          } else endFloor = parseInt(valueArr[0]);
          if (endFloor < startFloor) {
            alert("\u7EDF\u8BA1\u697C\u5C42\u683C\u5F0F\u4E0D\u6B63\u786E");
            return;
          }
          let matches = /(\d+)页/.exec($(".pages:eq(0) > li:last-child > a").text());
          let maxPage = matches ? parseInt(matches[1]) : 1;
          if (startFloor === 0) startFloor = 1;
          if (endFloor === 0) endFloor = maxPage * Config.perPageFloorNum - 1;
          let startPage = Math.floor(startFloor / Config.perPageFloorNum) + 1;
          let endPage = Math.floor(endFloor / Config.perPageFloorNum) + 1;
          if (endPage > maxPage) endPage = maxPage;
          if (endPage - startPage > Const_default.statFloorMaxPage) {
            alert("\u9700\u8BBF\u95EE\u7684\u603B\u9875\u6570\u4E0D\u53EF\u8D85\u8FC7" + Const_default.statFloorMaxPage);
            return;
          }
          destroy();
          wait(
            `<strong>\u6B63\u5728\u7EDF\u8BA1\u697C\u5C42\u4E2D&hellip;</strong><i>\u5269\u4F59\u9875\u6570\uFF1A<em class="pd_countdown">${endPage - startPage + 1}</em></i><a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>`
          );
          statFloor(tid, startPage, endPage, startFloor, endFloor, sf);
        });
      };
      statFloor = function(tid, startPage, endPage, startFloor, endFloor, sf) {
        let isStop = false;
        let floorList = [];
        const stat = function(page) {
          $.ajax({
            type: "GET",
            url: `read.php?tid=${tid}&page=${page}&sf=${sf}&t=${$.now()}`,
            timeout: Const_default.defAjaxTimeout,
            success(html2) {
              $(".readtext", html2.replace(/src="[^"]+"/g, "")).each(function() {
                let data = {};
                let $floor = $(this);
                let $floorHeader = $floor.prev(".readlou");
                let floor = parseInt($floorHeader.find("> div:nth-child(2) > span:first-child").text());
                if (!floor) return;
                if (floor < startFloor) return;
                if (floor > endFloor) {
                  isStop = true;
                  return false;
                }
                data.pid = parseInt($floorHeader.prev(".readlou").prev("a").attr("name"));
                let $user = $floorHeader.prev(".readlou").find(".readidms, .readidm");
                let $userLink = $user.find('a[href^="profile.php?action=show&uid="]');
                data.userName = $userLink.text();
                data.uid = "";
                data.sf = "";
                let userMatches = /profile\.php\?action=show&uid=(\d+)(?:&sf=(\w+))/.exec($userLink.attr("href"));
                if (userMatches) {
                  data.uid = parseInt(userMatches[1]);
                  data.sf = userMatches[2];
                }
                data.smLevel = "";
                let matches = /(\S+) 级神秘/.exec($user.find(".readidmsbottom, .readidmbottom").text());
                if (matches) data.smLevel = matches[1];
                let $buyer = $floor.find('[name="buyers"]:first');
                data.status = 0;
                if ($buyer.length > 0) {
                  let $input = $buyer.next("input");
                  data.status = $input.length > 0 ? 1 : 2;
                  if (data.status === 1) {
                    let matches2 = /此帖售价\s*(\d+)\s*KFB/.exec($buyer.parent("legend").text());
                    if (matches2) data.sell = parseInt(matches2[1]);
                    matches2 = /location\.href="(.+)"/i.exec($input.attr("onclick"));
                    if (matches2) data.buyUrl = matches2[1];
                  }
                }
                floorList[floor] = data;
              });
              let $countdown = $(".pd_countdown:last");
              $countdown.text(parseInt($countdown.text()) - 1);
              isStop = isStop || $countdown.closest(".pd_msg").data("stop");
            },
            error() {
              setTimeout(() => stat(page), Const_default.defAjaxInterval);
            },
            complete() {
              if (isStop || page >= endPage) {
                destroy();
                showStatFloorDialog(floorList);
              } else {
                setTimeout(() => stat(page + 1), Const_default.defAjaxInterval);
              }
            }
          });
        };
        stat(startPage);
      };
      showStatFloorDialog = function(floorList) {
        const dialogName2 = "pdStatFloorDialog";
        let html2 = `
<div class="pd_cfg_main">
  <div id="pdStatFloorFilter" style="margin-top: 5px;">
    <label><input name="removeRepeatedEnabled" type="checkbox"> \u53BB\u9664\u91CD\u590D</label>
    <label><input name="removeTopFloorEnabled" type="checkbox"> \u53BB\u9664\u697C\u4E3B</label>
  </div>
  <div id="pdStatFloorSelectBtns">
    <label style="margin-left: 3px;">\u552E\u4EF7\u533A\u95F4\uFF1A</label>
    <input name="startSell" type="number" value="1" min="1" max="100" style="width: 40px;"> -
    <input name="endSell" type="number" value="100" min="1" max="100" style="width: 40px;">
    <label style="margin-left: 3px;">
      \u6BCF\u540D\u7528\u6237\u9650\u9009 <input name="limitNum" type="number" min="0" style="width: 32px;"> \u4E2A
    </label>
    <a class="pd_btn_link" data-name="selectFilter" href="#">\u7B5B\u9009</a><br>
    <a class="pd_btn_link" data-name="selectAll" href="#">\u5168\u9009</a>
    <a class="pd_btn_link" data-name="selectInverse" href="#">\u53CD\u9009</a>
  </div>
  <div class="pd_highlight" style="text-align: center;">
    \u5171\u663E\u793A<b id="pdStatFloorShowCount">0</b>\u6761\u9879\u76EE\uFF0C\u5171\u9009\u62E9<b id="pdStatFloorSelectCount">0</b>\u6761\u9879\u76EE
  </div>
  <table style="line-height: 1.8em; text-align: center;">
    <thead>
      <tr>
        <th style="width: 30px;"></th>
        <th style="width: 65px;">\u697C\u5C42\u53F7</th>
        <th style="width: 120px;">\u7528\u6237\u540D</th>
        <th style="width: 80px;">\u795E\u79D8\u7B49\u7EA7</th>
        <th style="width: 100px;">
          \u552E\u4EF7(KFB) <span class="pd_cfg_tips" title="\u6CE8\uFF1A\u552E\u4EF7\u4FE1\u606F\u5728\u7EDF\u8BA1\u540E\u53EF\u80FD\u4F1A\u53D1\u751F\u53D8\u5316\uFF0C\u5982\u6709\u5FC5\u8981\uFF0C\u5EFA\u8BAE\u5C3D\u5FEB\u8D2D\u4E70\u5E16\u5B50">[?]</span>
        </th>
      </tr>
    </thead>
    <tbody id="pdStatFloorList"></tbody>
  </table>
  <textarea name="statFloorListContent" style="margin-top: 8px; width: 250px; height: 300px;" hidden></textarea>
</div>

<div class="pd_cfg_btns">
  <button name="copyList" type="button" style="color: #00f;" title="\u590D\u5236\u6240\u6709\u6216\u6240\u9009\u697C\u5C42\u7684\u7528\u6237\u540D\u5355">\u590D\u5236\u540D\u5355</button>
  <button name="buyThread" type="button" style="color: #f00;" title="\u6279\u91CF\u8D2D\u4E70\u6240\u9009\u697C\u5C42\u7684\u5E16\u5B50">\u8D2D\u4E70\u5E16\u5B50</button>
  <button data-action="close" type="button">\u5173\u95ED</button>
</div>`;
        let $dialog2 = create(dialogName2, "\u7EDF\u8BA1\u697C\u5C42", html2);
        let $statFloorFilter = $dialog2.find("#pdStatFloorFilter");
        let $statFloorList = $dialog2.find("#pdStatFloorList");
        let $statFloorListContent = $dialog2.find('[name="statFloorListContent"]');
        let tid = getUrlParam("tid");
        let sf = getThreadSfParam();
        const showStatFloorList = function() {
          let list = [...floorList];
          let isRemoveRepeated = $statFloorFilter.find('[name="removeRepeatedEnabled"]').prop("checked"), isRemoveTopFloor = $statFloorFilter.find('[name="removeTopFloorEnabled"]').prop("checked");
          if (isRemoveRepeated) {
            list = list.map((data, index, list2) => {
              if (!data) return null;
              else return list2.findIndex((data2) => data2 && data2.userName === data.userName) === index ? data : null;
            });
          }
          if (isRemoveTopFloor) {
            let $topFloor = $(".readtext:first");
            if ($topFloor.prev(".readlou").prev("a").attr("name") === "tpc") {
              let topFloorUserName = $topFloor.find(".readidmsbottom, .readidmbottom").find('a[href^="profile.php?action=show&uid="]').text();
              list = list.map((data) => data && data.userName !== topFloorUserName ? data : null);
            }
          }
          let content = "", copyContent = "";
          let num2 = 0;
          for (let [floor, data] of list.entries()) {
            if (!data) continue;
            content += `
<tr>
  <td>
    <label>
      <input data-status="${data.status}" data-sell="${data.sell ? data.sell : 0}" data-url="${data.buyUrl ? data.buyUrl : ""}"
        type="checkbox" value="${data.userName}">
    </label>
  </td>
  <td><a href="read.php?tid=${tid}&spid=${data.pid}${sf ? "&sf=" + sf : ""}" target="_blank">${floor}\u697C</a></td>
  <td><a href="profile.php?action=show&uid=${data.uid}&sf=${data.sf}" target="_blank" style="color: #000;">${data.userName}</a></td>
  <td style="${data.smLevel.endsWith("W") || data.smLevel === "MAX" ? "color: #f39;" : ""}">${data.smLevel}</td>
  <td class="pd_stat">${data.status === 1 ? `<em>${data.sell}</em>` : `<span class="pd_notice">${!data.status ? "\u65E0" : "\u5DF2\u4E70"}</span>`}</td>
</tr>`;
            copyContent += data.userName + "\n";
            num2++;
          }
          $statFloorList.html(content);
          $statFloorListContent.val(copyContent).data("copy-text", copyContent);
          $dialog2.find("#pdStatFloorShowCount").text(num2);
          $dialog2.find("#pdStatFloorSelectCount").text(0);
        };
        $dialog2.find("#pdStatFloorSelectBtns").on("click", "[data-name]", function(e) {
          e.preventDefault();
          let name4 = $(this).data("name");
          if (name4 === "selectAll") selectAll($statFloorList.find('[type="checkbox"]'));
          else if (name4 === "selectInverse") selectInverse($statFloorList.find('[type="checkbox"]'));
          else if (name4 === "selectFilter") {
            let startSell = parseInt($dialog2.find('[name="startSell"]').val());
            let endSell = parseInt($dialog2.find('[name="endSell"]').val());
            let limitNum = parseInt($dialog2.find('[name="limitNum"]').val());
            if (!limitNum || limitNum < 0) limitNum = 0;
            if (!startSell || startSell < 1 || !endSell || endSell < 1) return;
            let userStat = {};
            $statFloorList.find('[type="checkbox"]').each(function() {
              let $this2 = $(this);
              let status = parseInt($this2.data("status"));
              if (!status) return;
              let sell = parseInt($this2.data("sell"));
              let userName2 = $this2.val();
              if (!(userName2 in userStat)) userStat[userName2] = 0;
              userStat[userName2]++;
              let isChecked = status === 1 && sell >= startSell && sell <= endSell;
              if (isChecked && limitNum > 0) {
                if (userStat[userName2] > limitNum) isChecked = false;
              }
              $this2.prop("checked", isChecked);
            });
          }
          $dialog2.find("#pdStatFloorSelectCount").text($statFloorList.find('[type="checkbox"]:checked').length);
        }).end().find('[name="copyList"]').click(function() {
          let $this2 = $(this);
          if ($this2.text() === "\u53D6\u6D88\u590D\u5236") {
            $this2.text("\u590D\u5236\u540D\u5355");
            $statFloorListContent.prop("hidden", true);
            $statFloorList.closest("table").prop("hidden", false);
            resize(dialogName2);
            return;
          }
          let type = "all";
          let checked = $statFloorList.find('[type="checkbox"]:checked');
          if (checked.length > 0) {
            type = "select";
            let copyContent = "";
            checked.each(function() {
              copyContent += $(this).val() + "\n";
            });
            $statFloorListContent.val(copyContent).data("copy-text", copyContent);
          }
          if (!copyText($statFloorListContent, (type === "all" ? "\u6240\u6709" : "\u6240\u9009") + "\u7528\u6237\u540D\u5355\u5DF2\u590D\u5236")) {
            $this2.text("\u53D6\u6D88\u590D\u5236");
            $statFloorList.closest("table").prop("hidden", true);
            $statFloorListContent.prop("hidden", false).select().focus();
            resize(dialogName2);
          }
        }).end().find('[name="buyThread"]').click(function() {
          let threadList = [];
          let totalSell = 0;
          if (!$statFloorList.find('[type="checkbox"]:checked').length) $dialog2.find('[data-name="selectAll"]').click();
          $statFloorList.find('[type="checkbox"]:checked').each(function() {
            let $this2 = $(this);
            let url = $this2.data("url");
            let sell = parseInt($this2.data("sell"));
            if (url && sell > 0) {
              threadList.push({ url, sell });
              totalSell += sell;
            }
          });
          if (!threadList.length) return;
          if (!confirm(
            `\u4F60\u5171\u9009\u62E9\u4E86 ${threadList.length} \u4E2A\u53EF\u8D2D\u4E70\u9879\uFF0C\u603B\u552E\u4EF7 ${totalSell.toLocaleString()} KFB\uFF0C\u5747\u4EF7 ${getFixedNumLocStr(totalSell / threadList.length, 2)} KFB\uFF0C\u662F\u5426\u6279\u91CF\u8D2D\u4E70\uFF1F`
          )) return;
          destroy();
          wait(
            `<strong>\u6B63\u5728\u8D2D\u4E70\u5E16\u5B50\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em class="pd_countdown">${threadList.length}</em></i><a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>`
          );
          buyThreads(threadList);
        });
        if (getCurrentThreadPage() !== 1)
          $statFloorFilter.find('[name="removeTopFloorEnabled"]').prop("disabled", true).parent("label").attr("title", "\u8BF7\u5728\u7B2C1\u9875\u8FDB\u884C\u7EDF\u8BA1");
        $statFloorFilter.on("click", '[type="checkbox"]', showStatFloorList);
        showStatFloorList();
        show2(dialogName2);
        runFunc("Read.showStatFloorDialog_after_");
      };
      buyThreads = function(threadList) {
        let successNum = 0, failNum = 0, totalSell = 0;
        $(document).clearQueue("BuyThread");
        $.each(threadList, function(index, { url, sell }) {
          $(document).queue("BuyThread", function() {
            $.ajax({
              type: "GET",
              url: url + "&t=" + $.now(),
              timeout: Const_default.defAjaxTimeout,
              success(html2) {
                showFormatLog("\u8D2D\u4E70\u5E16\u5B50", html2);
                let { msg } = getResponseMsg(html2);
                if (/操作完成/.test(msg)) {
                  successNum++;
                  totalSell += sell;
                } else failNum++;
              },
              error() {
                failNum++;
              },
              complete() {
                let $countdown = $(".pd_countdown:last");
                $countdown.text(parseInt($countdown.text()) - 1);
                let isStop = $countdown.closest(".pd_msg").data("stop");
                if (isStop) $(document).clearQueue("BuyThread");
                if (isStop || index === threadList.length - 1) {
                  destroy();
                  if (successNum > 0) {
                    push("\u8D2D\u4E70\u5E16\u5B50", `\u5171\u6709\`${successNum}\`\u4E2A\u5E16\u5B50\u8D2D\u4E70\u6210\u529F`, { pay: { "KFB": -totalSell } });
                  }
                  console.log(`\u5171\u6709${successNum}\u4E2A\u5E16\u5B50\u8D2D\u4E70\u6210\u529F\uFF0C\u5171\u6709${failNum}\u4E2A\u5E16\u5B50\u8D2D\u4E70\u5931\u8D25\uFF0CKFB-${totalSell}`);
                  show(
                    `<strong>\u5171\u6709<em>${successNum}</em>\u4E2A\u5E16\u5B50\u8D2D\u4E70\u6210\u529F${failNum > 0 ? `\uFF0C\u5171\u6709<em>${failNum}</em>\u4E2A\u5E16\u5B50\u8D2D\u4E70\u5931\u8D25` : ""}</strong><i>KFB<ins>-${totalSell}</ins></i>`,
                    -1
                  );
                  runFunc("Read.buyThreads_after_", threadList);
                } else {
                  setTimeout(() => $(document).dequeue("BuyThread"), Const_default.defAjaxInterval);
                }
              }
            });
          });
        });
        $(document).dequeue("BuyThread");
      };
      handleBuyThreadBtn = function() {
        $('.readtext input[type="button"][value="\u613F\u610F\u8D2D\u4E70,\u652F\u4ED8KFB"]').each(function() {
          let $this2 = $(this);
          let matches = /此帖售价\s*(\d+)\s*KFB/.exec($this2.closest("legend").contents().eq(0).text());
          if (!matches) return;
          let sell = parseInt(matches[1]);
          matches = /location\.href="(.+?)"/i.exec($this2.attr("onclick"));
          if (!matches) return;
          $this2.data("sell", sell).data("url", matches[1]).removeAttr("onclick").click(function(e) {
            e.preventDefault();
            let $this3 = $(this);
            let sell2 = $this3.data("sell");
            let url = $this3.data("url");
            if (!sell2 || !url) return;
            if (sell2 >= Const_default.minBuyThreadWarningSell && !confirm(`\u6B64\u8D34\u552E\u4EF7 ${sell2} KFB\uFF0C\u662F\u5426\u8D2D\u4E70\uFF1F`)) return;
            if (Config.buyThreadNoJumpEnabled) {
              let $wait = wait("<strong>\u6B63\u5728\u8D2D\u4E70\u5E16\u5B50&hellip;</strong>");
              $.get(url + "&t=" + $.now(), function(html2) {
                showFormatLog("\u8D2D\u4E70\u5E16\u5B50", html2);
                let { msg } = getResponseMsg(html2);
                remove($wait);
                if (/操作完成/.test(msg)) {
                  if (Config.saveBuyThreadLogEnabled) {
                    let urlMatches = /tid=(\d+)&pid=(\d+|tpc)/.exec(url);
                    if (!urlMatches) return;
                    let fid2 = parseInt($('input[name="fid"]:first').val());
                    let tid = parseInt(urlMatches[1]);
                    let pid = urlMatches[2];
                    let forumName = $('a[href^="kf_tidfavor.php?action=favor"]').parent().find('a[href^="thread.php?fid="]:last').text().trim();
                    let threadTitle = getThreadTitle();
                    let userName2 = $this3.closest(".readtext").find(".readidmsbottom, .readidmbottom").find('a[href^="profile.php?action=show"]').text().trim();
                    recordBuyThreadLog({ fid: fid2, tid, pid, forumName, threadTitle, userName: userName2, sell: sell2 });
                  }
                  location.reload();
                } else if (/您已经购买此帖/.test(msg)) {
                  alert("\u4F60\u5DF2\u7ECF\u8D2D\u4E70\u8FC7\u6B64\u5E16");
                  location.reload();
                } else {
                  alert("\u5E16\u5B50\u8D2D\u4E70\u5931\u8D25");
                }
              });
            } else location.href = url;
          });
        });
      };
      getMultiQuoteData = function() {
        let quoteList = [];
        $(".pd_multi_quote_chk input:checked").each(function() {
          let $floor = $(this).closest(".readtext");
          let matches = /(\d+)楼/.exec($floor.find(".pd_goto_link").text());
          let floor = matches ? parseInt(matches[1]) : 0;
          let pid = $floor.prev(".readlou").prev("a").attr("name");
          let userName2 = getFloorUserName($floor.find('.readidmsbottom > a[href^="profile.php?action=show&uid="]').text());
          if (!userName2) return;
          quoteList.push({ floor, pid, userName: userName2 });
        });
        return quoteList;
      };
      addMultiQuoteButton = function() {
        let replyUrl = $('a[href^="post.php?action=reply"].b_tit2').attr("href");
        if (!replyUrl) return;
        $('<label title="\u591A\u91CD\u5F15\u7528" class="pd_multi_quote_chk"><input type="checkbox"> \u5F15</label>').appendTo(".readtext > table > tbody > tr > td:nth-child(2) > div > div:nth-child(2)").find("input").click(function() {
          let tid = parseInt(getUrlParam("tid"));
          let data = localStorage[Const_default.multiQuoteStorageName];
          if (data) {
            try {
              data = JSON.parse(data);
              if (!data || $.type(data) !== "object" || $.isEmptyObject(data)) data = null;
              else if (typeof data.tid === "undefined" || data.tid !== tid || !Array.isArray(data.quoteList)) data = null;
            } catch (ex) {
              data = null;
            }
          } else {
            data = null;
          }
          let quoteList = getMultiQuoteData();
          if (!data) {
            localStorage.removeItem(Const_default.multiQuoteStorageName);
            data = { tid, quoteList: [] };
          }
          let page = getCurrentThreadPage();
          if (quoteList.length > 0) data.quoteList[page] = quoteList;
          else delete data.quoteList[page];
          localStorage[Const_default.multiQuoteStorageName] = JSON.stringify(data);
        });
        $(".readtext:last").next(".c").next("div").find("> table > tbody > tr > td:last-child").css({ "text-align": "right", "width": "320px" }).append(`<span class="b_tit2" style="margin-left: 5px;"><a style="display: inline-block;" href="#" title="\u591A\u91CD\u56DE\u590D">\u56DE\u590D</a> <a style="display: inline-block;" href="${replyUrl}&multiquote=1" title="\u591A\u91CD\u5F15\u7528">\u5F15\u7528</a></span>`).find(".b_tit2 > a:eq(0)").click(function(e) {
          e.preventDefault();
          handleMultiQuote(1);
        });
      };
      modifyKFOtherDomainLink = function() {
        $(".readtext a, .thread2 a").each(function() {
          let $this2 = $(this);
          let url = $this2.attr("href");
          if (/m\.miaola\.(info|work)\//i.test(url)) return;
          let matches = /^(https?:\/\/(?:[\w\.]+?\.)?(?:2dgal|ddgal|9gal|9baka|9moe|kfgal|2dkf|ikfol|kfacg|fygal|bakabbs|365gal|365galgame|kforz|kfmax|9shenmi|kfpromax|miaola|koyuki)\.\w+?\/)\w+\.php/i.exec(url);
          if (matches) $this2.attr("href", url.replace(matches[1], getHostNameUrl()));
        });
      };
      addUserMemo = function() {
        if ($.isEmptyObject(Config.userMemoList)) return;
        $('.readidmsbottom > a[href^="profile.php?action=show&uid="]').each(function() {
          let $this2 = $(this);
          let userName2 = getFloorUserName($this2.text().trim());
          let key = Object.keys(Config.userMemoList).find((name4) => name4 === userName2);
          if (!key) return;
          let memo = Config.userMemoList[key];
          $this2.after(`<span class="pd_custom_tips pd_user_memo" title="\u5907\u6CE8\uFF1A${memo}">[?]</span>`);
        });
      };
      addCopyCodeLink = function() {
        $('.readtext fieldset > legend:contains("Copy code")').html('<a class="pd_copy_code" href="#">\u590D\u5236\u4EE3\u7801</a>').parent("fieldset").addClass("pd_code_area");
        if (!$(".pd_copy_code").length) return;
        $("#alldiv").on("click", "a.pd_copy_code", function(e) {
          e.preventDefault();
          let $this2 = $(this);
          let $fieldset = $this2.closest("fieldset");
          if (copyText($fieldset, "\u4EE3\u7801\u5DF2\u590D\u5236", $this2.parent())) return;
          let content = $fieldset.data("content");
          if (content) {
            $fieldset.html('<legend><a class="pd_copy_code" href="#">\u590D\u5236\u4EE3\u7801</a></legend>' + content).removeData("content");
          } else {
            let html2 = $fieldset.html();
            html2 = html2.replace(/<legend>.+?<\/legend>/i, "");
            $fieldset.data("content", html2);
            html2 = htmlDecode(html2);
            let height = $fieldset.height();
            height -= 17;
            if (height < 50) height = 50;
            if (height > 540) height = 540;
            $fieldset.html(`
<legend><a class="pd_copy_code" href="#">\u8FD8\u539F\u4EE3\u7801</a></legend>
<textarea wrap="off" class="pd_textarea" style="width: 100%; height: ${height}px; line-height: 1.4em; white-space: pre;">${html2}</textarea>
`);
            $fieldset.find("textarea").select().focus();
          }
        });
      };
      addMoreSmileLink = function() {
        const addSmileCode = function(id) {
          let textArea = $('textarea[name="atc_content"]').get(0);
          if (!textArea) return;
          let code = `[s:${id}]`;
          addCode(textArea, code);
          if (Info_default.isMobile) textArea.blur();
          else textArea.focus();
        };
        let $area = $('form[action="post.php?"] > div:first > table > tbody > tr:nth-child(2) > td:first-child');
        $area.on("click", 'a[href="javascript:;"]', function(e) {
          e.preventDefault();
          let id = $(this).data("id");
          if (id) addSmileCode(id);
        }).find('a[onclick^="javascript:addsmile"]').each(function() {
          let $this2 = $(this);
          let matches = /addsmile\((\d+)\)/i.exec($this2.attr("onclick"));
          if (matches) {
            $this2.data("id", matches[1]).removeAttr("onclick").attr("href", "javascript:;");
          }
        });
        $('<a class="pd_highlight" href="#">[\u66F4\u591A]</a>').appendTo($area).click(function(e) {
          e.preventDefault();
          let $this2 = $(this);
          let $panel = $("#pdSmilePanel");
          if ($panel.length > 0) {
            $this2.text("[\u66F4\u591A]");
            $panel.remove();
            return;
          }
          $this2.text("[\u5173\u95ED]");
          let smileImageIdList = [
            "48",
            "35",
            "34",
            "33",
            "32",
            "31",
            "30",
            "29",
            "28",
            "27",
            "26",
            "36",
            "37",
            "47",
            "46",
            "45",
            "44",
            "43",
            "42",
            "41",
            "40",
            "39",
            "38",
            "25",
            "24",
            "11",
            "10",
            "09",
            "08",
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "12",
            "13",
            "23",
            "22",
            "21",
            "20",
            "19",
            "18",
            "17",
            "16",
            "15",
            "14",
            "07"
          ];
          let smileCodeIdList = [
            57,
            44,
            43,
            42,
            41,
            40,
            39,
            38,
            37,
            36,
            35,
            45,
            46,
            56,
            55,
            54,
            53,
            52,
            51,
            50,
            49,
            48,
            47,
            34,
            33,
            20,
            19,
            18,
            17,
            10,
            11,
            12,
            13,
            14,
            15,
            21,
            22,
            32,
            31,
            30,
            29,
            28,
            27,
            26,
            25,
            24,
            23,
            16
          ];
          let html2 = "";
          for (let i = 0; i < smileImageIdList.length; i++) {
            html2 += `<img src="${Info_default.w.imgpath}/post/smile/em/em${smileImageIdList[i]}.gif" alt="[\u8868\u60C5]" data-id="${smileCodeIdList[i]}">`;
          }
          html2 = `<div class="pd_panel" id="pdSmilePanel" style="width: 308px; height: 185px;">${html2}</div>`;
          let offset = $area.offset();
          $panel = $(html2).appendTo("body");
          $panel.css("top", offset.top - $panel.height() + 10).css("left", offset.left + $area.width() - $panel.width() - 10).on("click", "img", function() {
            let id = $(this).data("id");
            if (id) addSmileCode(id);
          });
          runFunc("Read.addMoreSmileLink_after_click_");
        });
      };
      parseMediaTag = function() {
        $(".readtext > table > tbody > tr > td:nth-child(2)").each(function() {
          let $this2 = $(this);
          let html2 = $this2.html();
          if (/\[(audio|video)\](http|ftp)[^<>]+\[\/(audio|video)\]/.test(html2)) {
            $this2.html(
              html2.replace(
                /\[audio\]((?:http|ftp)[^<>]+?)\[\/audio\](?!<\/fieldset>)/g,
                '<audio src="$1" controls preload="none" style="margin: 3px 0;">[\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301audio\u6807\u7B7E]</audio>'
              ).replace(
                /\[video\]((?:http|ftp)[^<>]+?)\[\/video\](?!<\/fieldset>)/g,
                `<video src="$1" controls preload="none" style="max-width: ${Config.adjustThreadContentWidthEnabled ? 627 : 820}px; margin:3px 0;">[\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301video\u6807\u7B7E]</video>`
              )
            );
          }
        });
      };
      showAttachImageOutsideSellBox = function() {
        if (getCurrentThreadPage() !== 1) return;
        let $area = $(".readtext:first > table > tbody > tr > td:nth-child(2)");
        if (!$area.find('select[name="buyers"]').length) return;
        let html2 = $area.html();
        if (/\[attachment=\d+\]/.test(html2)) {
          let pid = $area.closest(".readtext").prev(".readlou").prev(".readlou").prev("a").attr("name");
          let tid = getUrlParam("tid");
          $area.html(
            html2.replace(
              /\[attachment=(\d+)\]/g,
              `<img src="job.php?action=download&pid=${pid}&tid=${tid}&aid=$1" alt="[\u9644\u4EF6\u56FE\u7247]" style="max-width: 550px;" onclick="if(this.width>=550) window.open('job.php?action=download&pid=${pid}&tid=${tid}&aid=$1');">`
            )
          );
        }
      };
      getThreadTitle = function() {
        return $('form[name="delatc"] > div:first > table > tbody > tr > td > span:first').text().trim();
      };
      buyThreadLogName = Const_default.storagePrefix + "buyThreadLog";
      readBuyThreadLog = function() {
        let log2 = [];
        let options = readData(buyThreadLogName + "_" + Info_default.uid);
        if (!options) return log2;
        try {
          options = JSON.parse(options);
        } catch (ex) {
          return log2;
        }
        if (!options || !Array.isArray(options)) return log2;
        log2 = options;
        return log2;
      };
      writeBuyThreadLog = (log2) => writeData(buyThreadLogName + "_" + Info_default.uid, JSON.stringify(log2));
      clearBuyThreadLog = () => deleteData(buyThreadLogName + "_" + Info_default.uid);
      recordBuyThreadLog = function({ fid: fid2, tid, pid, forumName, threadTitle, userName: userName2, sell }) {
        let log2 = readBuyThreadLog();
        log2.push($.extend({ time: $.now() }, { fid: fid2, tid, pid, forumName, threadTitle, userName: userName2, sell }));
        log2 = log2.sort((a, b) => a.time - b.time).slice(-Config.saveBuyThreadLogMaxNum);
        writeBuyThreadLog(log2);
      };
      showBuyThreadLogDialog = function() {
        const dialogName2 = "pdBuyThreadLogDialog";
        if ($("#" + dialogName2).length > 0) return;
        let log2 = readBuyThreadLog();
        let html2 = `
<div class="pd_cfg_main">
  <div style="margin-top: 5px;">
    <label>
      \u4FDD\u5B58\u6700\u8FD1\u7684 <input name="saveBuyThreadLogMaxNum" type="number" value="${Config.saveBuyThreadLogMaxNum}" min="1" max="10000" style="width: 60px;"> \u6761\u8BB0\u5F55
    </label>
    <a class="pd_btn_link" data-name="save" href="#">\u4FDD\u5B58</a>
  </div>
  <fieldset>
    <legend>\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55 <span class="pd_stat" data-name="logHeaderInfo"></span></legend>
    <div class="pd_stat pd_log_content" id="pdBuyThreadLog" style="width: 900px; max-height: 450px; height: auto;"></div>
  </fieldset>
</div>
<div class="pd_cfg_btns">
  <span class="pd_cfg_about"><a data-name="openImOrExBuyThreadLogDialog" href="#">\u5BFC\u5165/\u5BFC\u51FA\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55</a></span>
  <button data-action="close" type="button">\u5173\u95ED</button>
  <button name="clear" type="button">\u6E05\u9664\u8BB0\u5F55</button>
</div>`;
        let $dialog2 = create(dialogName2, "\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55", html2);
        let $buyThreadLog = $dialog2.find("#pdBuyThreadLog");
        $dialog2.find('[data-name="save"]').click(function(e) {
          e.preventDefault();
          let num2 = parseInt($dialog2.find('[name="saveBuyThreadLogMaxNum"]').val());
          if (!num2 || num2 > 1e4 || num2 < 0) {
            alert("\u6570\u91CF\u53D6\u503C\u8303\u56F4\uFF1A1-10000");
            return;
          }
          read3();
          Config.saveBuyThreadLogMaxNum = num2;
          write3();
          alert("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58");
        }).end().find('[data-name="openImOrExBuyThreadLogDialog"]').click(function(e) {
          e.preventDefault();
          showCommonImportOrExportConfigDialog("\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55", { read: readBuyThreadLog, write: writeBuyThreadLog });
        }).end().find('[name="clear"]').click(function() {
          if (confirm("\u662F\u5426\u6E05\u9664\u6240\u6709\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55\uFF1F")) {
            clearBuyThreadLog();
            alert("\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55\u5DF2\u6E05\u9664");
          }
        });
        let logInfo = {};
        for (let info of log2) {
          let date = getDateString(new Date(info.time));
          if (!(date in logInfo)) logInfo[date] = [];
          logInfo[date].push(info);
        }
        let totalSell = 0;
        let logHtml = "";
        for (let date of Object.keys(logInfo).sort((a, b) => a > b ? 1 : -1)) {
          let currentDateHtml = "";
          let currentDateTotalSell = 0;
          for (let { time, fid: fid2, tid, pid, forumName, threadTitle, userName: userName2, sell } of logInfo[date]) {
            totalSell += sell;
            currentDateTotalSell += sell;
            currentDateHtml += `
<p>
  <b>${getTimeString(new Date(time))}\uFF1A</b>[<a href="thread.php?fid=${fid2}" target="_blank">${forumName}</a>]
  \u300A<a href="read.php?tid=${tid}${pid === "tpc" ? "" : "&spid=" + pid}" target="_blank">${threadTitle}</a>\u300B
  &nbsp;\u53D1\u5E16\u8005\uFF1A<a class="${!Config.adminMemberEnabled ? "pd_not_click_link" : ""}" href="profile.php?action=show&username=${userName2}" target="_blank">${userName2}</a>
  &nbsp;\u552E\u4EF7\uFF1A<em>${sell}</em>KFB
</p>`;
          }
          logHtml += `<h3>\u3010${date}\u3011 (\u5171<em>${logInfo[date].length}</em>\u9879\uFF0C\u5408\u8BA1<em>${currentDateTotalSell.toLocaleString()}</em>KFB)</h3>${currentDateHtml}`;
        }
        $buyThreadLog.html(logHtml ? logHtml : "\u6682\u65E0\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55\uFF08\u9700\u5F00\u542F\u201C\u4FDD\u5B58\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55\u201D\u7684\u529F\u80FD\uFF09");
        $dialog2.find('[data-name="logHeaderInfo"]').html(`(\u5171<em>${log2.length}</em>\u9879\uFF0C\u603B\u552E\u4EF7<em>${totalSell.toLocaleString()}</em>KFB)`);
        show2(dialogName2);
        let $lastChild = $buyThreadLog.find("p:last");
        if ($lastChild.length > 0) {
          $lastChild.get(0).scrollIntoView();
        }
        runFunc("Read.showBuyThreadLogDialog_after_");
      };
      addSignTips = function() {
        $(".readtext > table > tbody > tr > td:nth-child(2) > div > div:nth-child(2) > span:nth-child(3)").each(function() {
          let $this2 = $(this);
          $this2.attr("title", $this2.text()).addClass("pd_custom_tips");
        });
      };
      replaceReadImage = function() {
        $(".readtext span.k_f18").each(function() {
          let $this2 = $(this);
          let $parent = $this2.parent("a");
          let imgUrl = $parent.attr("href");
          if (imgUrl) {
            $parent.html(`<img class="pd_kf18" alt="[\u56FE\u7247]" src="${imgUrl}" />`);
          }
        });
      };
    }
  });

  // src/module/Bank.js
  var Bank_exports = {};
  __export(Bank_exports, {
    handleBankPage: () => handleBankPage,
    setNodeValue: () => setNodeValue
  });
  var minTransferNum, maxTransferNum, handleBankPage, setNodeValue, batchTransfer, batchTransferVerify, addBatchTransferButton;
  var init_Bank = __esm({
    "src/module/Bank.js"() {
      "use strict";
      init_Util();
      init_Msg();
      init_Const();
      init_Log();
      init_TmpLog();
      init_Public();
      init_Script();
      minTransferNum = 0;
      maxTransferNum = Number.MAX_SAFE_INTEGER;
      handleBankPage = function() {
        let $account = $('.bank1 > tbody > tr:nth-child(2) > td:contains("\u4F60\u6240\u62E5\u6709\u7684\u8D21\u732E\uFF1A")');
        if (!$account.length) return;
        let html2 = $account.html();
        $account.html(
          html2.replace(
            /你所拥有的贡献：(-?\d+(?:\.\d+)?)/,
            (m, num2) => `\u4F60\u6240\u62E5\u6709\u7684\u8D21\u732E\uFF1A<b id="pdGongXian" data-num="${num2}">${parseFloat(num2).toLocaleString()}</b>`
          )
        );
        let matches = /注意你转账的是贡献，最小\[(\d+(?:\.\d+)?)\]，最大\[(\d+(?:\.\d+)?)\]/.exec(html2);
        if (matches) {
          minTransferNum = parseFloat(matches[1]);
          maxTransferNum = parseFloat(matches[2]);
        }
        $(document).on("change", 'input[name="to_money"]', function() {
          let $this2 = $(this);
          let num2 = parseFloat($this2.val());
          if (isNaN(num2) || num2 < minTransferNum || num2 > maxTransferNum) {
            alert(`\u8F6C\u8D26\u6570\u989D\u7684\u6700\u5C0F\u503C\u4E3A[${minTransferNum}]\uFF0C\u6700\u5927\u503C\u4E3A[${maxTransferNum}]\uFF0C\u8D85\u8FC7\u6700\u5927\u503C\u8BF7\u5206\u591A\u6B21\u8F6C\u8D26`);
          }
        });
        addBatchTransferButton();
      };
      setNodeValue = function($node, value) {
        if (!$node.length) return;
        let num2 = 0;
        if (!$.isNumeric(value)) {
          let matches = /(\+|-)=(\d+(?:\.\d+)?)/.exec(value);
          if (!matches) return;
          let diff = parseFloat(matches[2]);
          let oldNum = parseFloat($node.data("num"));
          oldNum = oldNum ? oldNum : 0;
          num2 = value.startsWith("+") ? oldNum + diff : oldNum - diff;
        } else {
          num2 = parseFloat(value);
        }
        $node.text(num2.toLocaleString()).data("num", num2);
      };
      batchTransfer = function(users, msg) {
        let successNum = 0, failNum = 0, successMoney = 0;
        $.each(users, function(index, [userName2, money]) {
          $(document).queue("Bank", function() {
            $.ajax({
              type: "POST",
              url: "hack.php?H_name=bank",
              timeout: Const_default.defAjaxTimeout,
              data: `&action=virement&pwuser=${getGBKEncodeString(userName2)}&to_money=${money}&memo=${getGBKEncodeString(msg)}`,
              success(html2) {
                showFormatLog("\u6279\u91CF\u8F6C\u8D26", html2);
                let { msg: msg2 } = getResponseMsg(html2);
                let msgHtml = `${userName2} <em>+${money.toLocaleString()}</em>`;
                if (/完成转帐!/.test(msg2)) {
                  successNum++;
                  successMoney += money;
                } else {
                  failNum++;
                  if (/用户<b>.+?<\/b>不存在/.test(msg2)) msg2 = "\u7528\u6237\u4E0D\u5B58\u5728";
                  msgHtml += ` <span class="pd_notice">(\u9519\u8BEF\uFF1A${msg2})</span>`;
                }
                $(".pd_result:last").append(`<li>${msgHtml}</li>`);
              },
              error() {
                failNum++;
                $(".pd_result:last").append(`
<li>
  ${userName2}:${money.toLocaleString()}
  <span class="pd_notice">(\u9519\u8BEF\uFF1A\u8FDE\u63A5\u8D85\u65F6\uFF0C\u8F6C\u8D26\u7ED3\u679C\u672A\u77E5\uFF0C\u8BF7\u5230<a target="_blank" href="hack.php?H_name=bank&action=log">\u94F6\u884C\u65E5\u5FD7</a>\u91CC\u8FDB\u884C\u786E\u8BA4)</span>
</li>
`);
              },
              complete() {
                let $countdown = $(".pd_countdown:last");
                $countdown.text(parseInt($countdown.text()) - 1);
                let isStop = $countdown.closest(".pd_msg").data("stop");
                if (isStop) $(document).clearQueue("Bank");
                if (isStop || index === users.length - 1) {
                  destroy();
                  if (successNum > 0) push("\u6279\u91CF\u8F6C\u8D26", `\u5171\u6709\`${successNum}\`\u6B21\u8F6C\u8D26\u6210\u529F`, { pay: { "\u8D21\u732E": -successMoney } });
                  setNodeValue($("#pdGongXian"), "-=" + successMoney);
                  console.log(`\u5171\u6709${successNum}\u6B21\u8F6C\u8D26\u6210\u529F\uFF0C\u5171\u6709${failNum}\u6B21\u8F6C\u8D26\u5931\u8D25\uFF0C\u8D21\u732E-${successMoney}`);
                  $(".pd_result:last").append(
                    `<li><b>\u5171\u6709<em>${successNum}</em>\u6B21\u8F6C\u8D26\u6210\u529F${failNum > 0 ? `\uFF0C\u5171\u6709<em>${failNum}</em>\u6B21\u8F6C\u8D26\u5931\u8D25` : ""}\uFF1A</b>\u8D21\u732E <ins>-${successMoney.toLocaleString()}</ins></li>`
                  );
                  show(
                    `<strong>\u5171\u6709<em>${successNum}</em>\u6B21\u8F6C\u8D26\u6210\u529F${failNum > 0 ? `\uFF0C\u5171\u6709<em>${failNum}</em>\u6B21\u8F6C\u8D26\u5931\u8D25` : ""}</strong><i>\u8D21\u732E<ins>-${successMoney.toLocaleString()}</ins></i>`,
                    -1
                  );
                } else {
                  setTimeout(() => $(document).dequeue("Bank"), Const_default.bankActionInterval);
                }
              }
            });
          });
        });
        $(document).dequeue("Bank");
      };
      batchTransferVerify = function($transfer) {
        let $bankUsers = $transfer.find('[name="users"]');
        let users = $bankUsers.val();
        if (!/^\s*\S+\s*$/m.test(users) || /^\s*:/m.test(users) || /:/.test(users) && /:(\D|$)/m.test(users)) {
          alert("\u7528\u6237\u5217\u8868\u683C\u5F0F\u4E0D\u6B63\u786E");
          $bankUsers.select().focus();
          return false;
        }
        if (/^\s*\S+?:0*(\.0\d+)?\s*$/m.test(users)) {
          alert(`\u8F6C\u5E10\u6570\u989D\u4E0D\u80FD\u5C0F\u4E8E[${minTransferNum}]\u8D21\u732E`);
          $bankUsers.select().focus();
          return false;
        }
        let $bankMoney = $transfer.find('[name="transfer_money"]');
        let money = parseFloat($bankMoney.val());
        if (/^\s*[^:]+\s*$/m.test(users)) {
          if (!$.isNumeric(money)) {
            alert("\u901A\u7528\u8F6C\u8D26\u6570\u989D\u683C\u5F0F\u4E0D\u6B63\u786E");
            $bankMoney.select().focus();
            return false;
          } else if (money < minTransferNum) {
            alert(`\u8F6C\u5E10\u6570\u989D\u4E0D\u80FD\u5C0F\u4E8E${minTransferNum}\u8D21\u732E`);
            $bankMoney.select().focus();
            return false;
          }
        }
        return true;
      };
      addBatchTransferButton = function() {
        let $area = $(`
<tr id="pdBankTransferArea">
  <td style="vertical-align: top;">
    \u4F7F\u7528\u8BF4\u660E\uFF1A<br>\u6BCF\u884C\u4E00\u540D\u7528\u6237\uFF0C<br>\u5982\u9700\u5355\u72EC\u8BBE\u5B9A\u8F6C\u8D26\u6570\u989D\uFF0C<br>\u53EF\u5199\u4E3A\u201C\u7528\u6237\u540D:\u8D21\u732E\u201D<br>\uFF08\u6CE8\u610F\u662F<b>\u82F1\u6587\u5192\u53F7</b>\uFF09<br>\u4F8B\u5B50\uFF1A<br>
    <pre style="border: 1px solid #9999ff; padding: 5px;">\u5F20\u4E09
\u674E\u56DB:0.1
\u738B\u4E94:1.2
\u4FE1\u4EF0\u98CE</pre>
  </td>
  <td>
  <form>
    <div style="display: inline-block;">
      <label>\u7528\u6237\u5217\u8868\uFF1A<br>
        <textarea class="pd_textarea" name="users" style="width: 270px; height: 250px;"></textarea>
      </label>
    </div>
    <div style="display: inline-block; margin-left: 10px;">
      <label>\u901A\u7528\u8F6C\u5E10\u6570\u989D\uFF08\u5982\u6240\u6709\u7528\u6237\u90FD\u5DF2\u8BBE\u5B9A\u5355\u72EC\u6570\u989D\u5219\u53EF\u7559\u7A7A\uFF09\uFF1A<br>
        <input class="pd_input" name="transfer_money" type="text" style="width: 217px;">
      </label><br>
      <label style="margin-top: 5px;">\u8F6C\u5E10\u9644\u8A00\uFF08\u53EF\u7559\u7A7A\uFF09\uFF1A<br>
        <textarea class="pd_textarea" name="msg" style="width: 225px; height: 206px;"></textarea>
      </label>
    </div>
    <div>
      <button type="submit">\u6279\u91CF\u8F6C\u8D26</button>
      <button type="reset">\u91CD\u7F6E</button>
      <button name="random" type="button" title="\u4E3A\u7528\u6237\u5217\u8868\u4E0A\u7684\u6BCF\u4E2A\u7528\u6237\u8BBE\u5B9A\u6307\u5B9A\u8303\u56F4\u5185\u7684\u968F\u673A\u6570\u989D">\u968F\u673A\u6570\u989D</button>
      <br><span class="pd_highlight">\uFF08\u6CE8\u610F\uFF1A\u4F60\u8F6C\u7ED9\u5BF9\u65B9\u7684\u662F\u8D21\u732E\uFF0C\u6BCF\u540D\u7528\u6237\u7684\u8F6C\u8D26\u6570\u989D\u53EF\u8D85\u8FC7\u5355\u6B21\u8F6C\u8D26\u7684\u6700\u5927\u503C\uFF0C\u52A9\u624B\u4F1A\u81EA\u52A8\u5206\u591A\u6B21\u8F6C\u8D26\uFF09</span>
      ${isIE() || isEdge() ? '<br><span class="pd_highlight">\u6CE8\uFF1AIE\u548CEdge\u6D4F\u89C8\u5668\u5728\u6279\u91CF\u8F6C\u8D26\u7ED9\u4E2D\u6587\u540D\u7528\u6237\u65F6\u4F1A\u51FA\u73B0\u4E71\u7801\uFF0C\u8BF7\u4F7F\u7528\u5176\u5B83\u6D4F\u89C8\u5668\u8FDB\u884C\u6279\u91CF\u8F6C\u8D26</span>' : ""}
    </div>
  </form>
  </td>
</tr>
`).insertAfter(".bank1 > tbody > tr:nth-child(2)");
        $area.find("form").submit(function(e) {
          e.preventDefault();
          destroy();
          if (!batchTransferVerify($area)) return;
          let commonMoney = parseFloat($area.find('[name="transfer_money"]').val());
          if (!commonMoney) commonMoney = 0;
          let msg = $area.find('[name="msg"]').val();
          let users = [];
          for (let line of $area.find('[name="users"]').val().split("\n")) {
            line = $.trim(line);
            if (!line) continue;
            let userName2 = line;
            let strMoney = 0;
            if (line.includes(":")) {
              [userName2, strMoney] = line.split(":");
              userName2 = $.trim(userName2);
              if (typeof strMoney === "undefined") continue;
            } else {
              strMoney = commonMoney;
            }
            let money = parseFloat(strMoney);
            money = Math.floor(money * 10) / 10;
            if (money > maxTransferNum) {
              let count = Math.floor(money * 10 / (maxTransferNum * 10));
              let addNum = money * 10 % (maxTransferNum * 10) / 10;
              for (let i = 1; i <= count; i++) {
                users.push([userName2, maxTransferNum]);
              }
              if (addNum >= 0.1) {
                users.push([userName2, addNum]);
              }
            } else {
              users.push([userName2, money]);
            }
          }
          if (!users.length) return;
          let totalMoney = 0;
          let realUsers = [];
          for (let [user, money] of users) {
            totalMoney += money;
            if (!realUsers.includes(user)) {
              realUsers.push(user);
            }
          }
          let $gongXian = $("#pdGongXian");
          if ($gongXian.length > 0 && Math.floor(totalMoney * 10) > Math.floor(parseFloat($gongXian.data("num")) * 10)) {
            alert(`\u4F60\u5F53\u524D\u6CA1\u6709[${totalMoney.toLocaleString()}]\u8D21\u732E\u53EF\u4F9B\u8F6C\u8D26`);
            return;
          }
          if (!confirm(`\u5171\u8BA1[${realUsers.length}]\u540D\u7528\u6237\uFF0C\u603B\u8BA1[${totalMoney.toLocaleString()}]\u8D21\u732E\uFF0C\u662F\u5426\u8F6C\u8D26\uFF1F`)) return;
          if (totalMoney > maxTransferNum && !confirm(`\u4F60\u771F\u7684\u8981\u8F6C\u8D26[${totalMoney.toLocaleString()}]\u8D21\u732E\uFF1F\u8BF7\u6CE8\u610F\u4F60\u8F6C\u7ED9\u5BF9\u65B9\u7684\u662F\u8D21\u732E\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F`)) return;
          wait(
            `<strong>\u6B63\u5728\u6279\u91CF\u8F6C\u8D26\u4E2D\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85&hellip;</strong><i>\u5269\u4F59\uFF1A<em class="pd_countdown">${users.length}</em></i><a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>`
          );
          $area.find("> td:last-child").append('<ul class="pd_result pd_stat"><li><strong>\u8F6C\u8D26\u7ED3\u679C\uFF1A</strong></li></ul>');
          batchTransfer(users, msg);
        }).find('[name="random"]').click(function() {
          let userList = [];
          for (let line of $area.find('[name="users"]').val().split("\n")) {
            line = $.trim(line);
            if (!line) continue;
            userList.push($.trim(line.split(":")[0]));
          }
          if (!userList.length) return;
          let range = prompt("\u8BBE\u5B9A\u968F\u673A\u6570\u989D\u7684\u8303\u56F4\uFF08\u6CE8\uFF1A\u6700\u4F4E\u8F6C\u8D26\u6570\u989D\u4E3A0.1\u8D21\u732E\uFF09", "0.1-1");
          if (range === null) return;
          range = $.trim(range);
          if (!/^\d+(?:\.\d+)?-\d+(?:\.\d+)?$/.test(range)) {
            alert("\u968F\u673A\u6570\u989D\u8303\u56F4\u683C\u5F0F\u4E0D\u6B63\u786E");
            return;
          }
          let arr = range.split("-");
          let min = parseFloat(arr[0]), max = parseFloat(arr[1]);
          if (max < min) {
            alert("\u6700\u5927\u503C\u4E0D\u80FD\u4F4E\u4E8E\u6700\u5C0F\u503C");
            return;
          }
          let content = "";
          for (let userName2 of userList) {
            content += userName2 + ":" + Math.floor((Math.random() * (max - min + 0.1) + min) * 10) / 10 + "\n";
          }
          $area.find('[name="users"]').val(content);
        });
      };
    }
  });

  // src/module/Other.js
  var Other_exports = {};
  __export(Other_exports, {
    addAutoChangeIdColorButton: () => addAutoChangeIdColorButton,
    addAvatarChangeAlert: () => addAvatarChangeAlert,
    addFastDrawMoneyLink: () => addFastDrawMoneyLink,
    addFastGotoThreadPageLink: () => addFastGotoThreadPageLink,
    addFollowAndBlockAndMemoUserLink: () => addFollowAndBlockAndMemoUserLink,
    addGuanJianCiUserNameLink: () => addGuanJianCiUserNameLink,
    addMsgSelectButton: () => addMsgSelectButton,
    addUserNameLinkInRankPage: () => addUserNameLinkInRankPage,
    handleProfilePage: () => handleProfilePage,
    highlightNewPost: () => highlightNewPost,
    highlightUnReadAtTipsMsg: () => highlightUnReadAtTipsMsg,
    modifyMyPostLink: () => modifyMyPostLink,
    syncModifyPerPageFloorNum: () => syncModifyPerPageFloorNum
  });
  var highlightNewPost, addFastGotoThreadPageLink, highlightUnReadAtTipsMsg, addFastDrawMoneyLink, addFollowAndBlockAndMemoUserLink, modifyMyPostLink, addMsgSelectButton, addAutoChangeIdColorButton, syncModifyPerPageFloorNum, addAvatarChangeAlert, addUserNameLinkInRankPage, handleProfilePage, addGuanJianCiUserNameLink;
  var init_Other = __esm({
    "src/module/Other.js"() {
      "use strict";
      init_Info();
      init_Util();
      init_Msg();
      init_Const();
      init_Config();
      init_ConfigDialog();
      init_TmpLog();
      init_Public();
      init_Bank();
      highlightNewPost = function() {
        $(".thread1 > tbody > tr > td:last-child").has("a.bl").each(function() {
          let html2 = $(this).html();
          if (/\|\s*\d{2}:\d{2}<br>\n.*\d{2}:\d{2}/.test(html2)) {
            html2 = html2.replace(/(\d{2}:\d{2})<br>/, '<span class="pd_highlight">$1</span><br>');
            $(this).html(html2);
          }
        });
      };
      addFastGotoThreadPageLink = function() {
        $('.threadtit1 > a[href^="read.php"]').each(function() {
          let $link = $(this);
          let floorNum = $link.closest("td").next().find("ul > li > a").contents().eq(0).text();
          if (!floorNum || floorNum < Config.perPageFloorNum) return;
          let url = $link.attr("href");
          let totalPageNum = Math.floor(floorNum / Config.perPageFloorNum) + 1;
          let html2 = "";
          for (let i = 1; i < totalPageNum; i++) {
            if (i > Config.maxFastGotoThreadPageNum) {
              if (i + 1 <= totalPageNum) {
                html2 += `..<a href="${url}&page=${totalPageNum}">${totalPageNum}</a>`;
              }
              break;
            }
            html2 += `<a href="${url}&page=${i + 1}">${i + 1}</a>`;
          }
          html2 = `<span class="pd_thread_page">&hellip;${html2}</span>`;
          $link.after(html2).parent().css("white-space", "normal");
        });
      };
      highlightUnReadAtTipsMsg = function() {
        if ($(".kf_share1:first").text().trim() !== `\u542B\u6709\u5173\u952E\u8BCD \u201C${Info_default.userName}\u201D \u7684\u5185\u5BB9`) return;
        let timeString = getCookie(Const_default.prevReadAtTipsCookieName);
        if (!timeString || !/^\d+日\d+时\d+分$/.test(timeString)) return;
        let prevString = "";
        $(".kf_share1:eq(1) > tbody > tr:gt(0) > td:first-child").each(function(index) {
          let $this2 = $(this);
          let curString = $this2.text().trim();
          if (index === 0) prevString = curString;
          if (timeString < curString && prevString >= curString) {
            $this2.addClass("pd_highlight");
            prevString = curString;
          } else return false;
        });
        $(".kf_share1").on("click", "td > a", function() {
          deleteCookie(Const_default.prevReadAtTipsCookieName);
        });
      };
      addFastDrawMoneyLink = function() {
        if (!$('td:contains("SYSTEM")').length || !$('td:contains("\u6536\u5230\u4E86\u4ED6\u4EBA\u8F6C\u8D26\u7684\u8D21\u732E")').length) return;
        let $msg = $(".thread2 > tbody > tr:eq(-2) > td:last");
        let html2 = $msg.html();
        let matches = /给你转帐(\d+(?:\.\d+)?)贡献/.exec(html2);
        if (matches) {
          let gongXian = parseFloat(matches[1]);
          $msg.html(
            html2.replace(
              /会员\[(.+?)\]通过论坛银行/,
              `\u4F1A\u5458[<a class="${!Config.adminMemberEnabled ? "pd_not_click_link" : ""}" target="_blank" href="profile.php?action=show&username=$1">$1</a>]\u901A\u8FC7\u8BBA\u575B\u94F6\u884C`
            ).replace(matches[0], `\u7ED9\u4F60\u8F6C\u5E10<span class="pd_stat"><em>${gongXian.toLocaleString()}</em></span>\u8D21\u732E`)
          );
          $('a[href^="message.php?action=write&remid="]').attr("href", "#").addClass("pd_disabled_link").click(function(e) {
            e.preventDefault();
            alert("\u672C\u77ED\u6D88\u606F\u7531\u7CFB\u7EDF\u53D1\u9001\uFF0C\u8BF7\u52FF\u76F4\u63A5\u56DE\u590D\uFF1B\u5982\u9700\u56DE\u590D\uFF0C\u8BF7\u70B9\u51FB\u7ED9\u4F60\u8F6C\u8D26\u7684\u7528\u6237\u94FE\u63A5\uFF0C\u5411\u5176\u53D1\u9001\u77ED\u6D88\u606F");
          });
        }
      };
      addFollowAndBlockAndMemoUserLink = function() {
        let matches = /(.+?)\s*详细信息/.exec($('td:contains("\u8BE6\u7EC6\u4FE1\u606F")').text());
        if (!matches) return;
        let userName2 = $.trim(matches[1]);
        $('<span>[<a href="#">\u5173\u6CE8\u7528\u6237</a>] [<a href="#">\u5C4F\u853D\u7528\u6237</a>]</span><br><span>[<a href="#">\u6DFB\u52A0\u5907\u6CE8</a>]</span><br>').appendTo($('a[href^="message.php?action=write&touid="]').parent()).find("a").each(function() {
          let $this2 = $(this);
          if ($this2.is('a:contains("\u5907\u6CE8")')) {
            let str = "";
            for (let [name4, memo] of entries(Config.userMemoList)) {
              if (name4 === userName2) {
                str = memo;
                break;
              }
            }
            if (str !== "") {
              $this2.text("\u4FEE\u6539\u5907\u6CE8").data("memo", str);
              let $info = $(".log1 > tbody > tr:last-child > td:last-child");
              $info.html(`\u5907\u6CE8\uFF1A${str}<br>${$info.html()}`);
            }
          } else {
            let str = "\u5173\u6CE8";
            let userList = Config.followUserList;
            if ($this2.text().indexOf("\u5C4F\u853D") > -1) {
              str = "\u5C4F\u853D";
              userList = Config.blockUserList;
            }
            if (inFollowOrBlockUserList(userName2, userList) > -1) {
              $this2.addClass("pd_highlight").text("\u89E3\u9664" + str);
            }
          }
        }).click(function(e) {
          e.preventDefault();
          read3();
          let $this2 = $(this);
          if ($this2.is('a:contains("\u5907\u6CE8")')) {
            let memo = $this2.data("memo");
            if (!memo) memo = "";
            let value = prompt("\u4E3A\u6B64\u7528\u6237\u6DFB\u52A0\u5907\u6CE8\uFF08\u8981\u5220\u9664\u5907\u6CE8\u8BF7\u7559\u7A7A\uFF09\uFF1A", memo);
            if (value === null) return;
            if (!Config.userMemoEnabled) Config.userMemoEnabled = true;
            value = $.trim(value);
            if (value) {
              Config.userMemoList[userName2] = value;
              $this2.text("\u4FEE\u6539\u5907\u6CE8");
            } else {
              delete Config.userMemoList[userName2];
              $this2.text("\u6DFB\u52A0\u5907\u6CE8");
            }
            $this2.data("memo", value);
            write3();
          } else {
            let str = "\u5173\u6CE8";
            let userList = Config.followUserList;
            if ($this2.text().includes("\u5C4F\u853D")) {
              str = "\u5C4F\u853D";
              userList = Config.blockUserList;
              if (!Config.blockUserEnabled) Config.blockUserEnabled = true;
            } else {
              if (!Config.followUserEnabled) Config.followUserEnabled = true;
            }
            if ($this2.text() === "\u89E3\u9664" + str) {
              let index = inFollowOrBlockUserList(userName2, userList);
              if (index > -1) {
                userList.splice(index, 1);
                write3();
              }
              $this2.removeClass("pd_highlight").text(str + "\u7528\u6237");
              alert("\u8BE5\u7528\u6237\u5DF2\u88AB\u89E3\u9664" + str);
            } else {
              if (inFollowOrBlockUserList(userName2, userList) === -1) {
                if (str === "\u5C4F\u853D") {
                  let type = Config.blockUserDefaultType;
                  type = prompt("\u8BF7\u586B\u5199\u5C4F\u853D\u7C7B\u578B\uFF0C0\uFF1A\u5C4F\u853D\u4E3B\u9898\u548C\u56DE\u5E16\uFF1B1\uFF1A\u4EC5\u5C4F\u853D\u4E3B\u9898\uFF1B2\uFF1A\u4EC5\u5C4F\u853D\u56DE\u5E16", type);
                  if (type === null) return;
                  type = parseInt(type);
                  if (isNaN(type) || type < 0 || type > 2) type = Config.blockUserDefaultType;
                  userList.push({ name: userName2, type });
                } else {
                  userList.push({ name: userName2 });
                }
                write3();
              }
              $this2.addClass("pd_highlight").text("\u89E3\u9664" + str);
              alert("\u8BE5\u7528\u6237\u5DF2\u88AB" + str);
            }
          }
        });
      };
      modifyMyPostLink = function() {
        $('.t a[href^="read.php?tid="]').each(function() {
          let $this2 = $(this);
          $this2.attr("href", $this2.attr("href").replace(/&uid=\d+#(\d+)/, "&spid=$1"));
        });
      };
      addMsgSelectButton = function() {
        let $checkeds = $('.thread1 > tbody > tr > td:last-child > [type="checkbox"]');
        $('<input value="\u81EA\u5B9A\u4E49" type="button" style="margin-right: 3px;">').insertBefore('[type="button"][value="\u5168\u9009"]').click(function(e) {
          e.preventDefault();
          let value = $.trim(
            prompt("\u8BF7\u586B\u5199\u6240\u8981\u9009\u62E9\u7684\u5305\u542B\u6307\u5B9A\u5B57\u7B26\u4E32\u7684\u77ED\u6D88\u606F\u6807\u9898\uFF08\u53EF\u7528|\u7B26\u53F7\u5206\u9694\u591A\u4E2A\u6807\u9898\uFF09", "\u6536\u5230\u4E86\u4ED6\u4EBA\u8F6C\u8D26\u7684\u8D21\u732E|\u6536\u5230\u4E86\u4ED6\u4EBA\u8F6C\u8D26\u7684KFB|\u94F6\u884C\u6C47\u6B3E\u901A\u77E5|\u60A8\u7684\u6587\u7AE0\u88AB\u8BC4\u5206|\u60A8\u7684\u6587\u7AE0\u88AB\u5220\u9664")
          );
          if (value !== "") {
            $checkeds.prop("checked", false);
            let titleArr = value.split("|");
            $(".thread1 > tbody > tr > td:nth-child(2) > a").each(function() {
              let $this2 = $(this);
              for (let title2 of titleArr) {
                if ($this2.text().toLowerCase().includes(title2.toLowerCase())) {
                  $this2.closest("tr").find('td:last-child > input[type="checkbox"]').prop("checked", true);
                }
              }
            });
          }
        }).parent().attr("colspan", 4).prev("td").attr("colspan", 3);
        $('<input value="\u53CD\u9009" type="button" style="margin-left: 5px; margin-right: 1px;">').insertAfter('[type="button"][value="\u5168\u9009"]').click(() => selectInverse($checkeds));
      };
      addAutoChangeIdColorButton = function() {
        let $autoChangeIdColor = $('table div > table > tbody > tr > td:contains("\u81EA\u5B9A\u4E49ID\u989C\u8272")');
        $('<span class="pd_highlight">\u4F4E\u7B49\u7EA7\u6CA1\u4EBA\u6743\uFF1F\u6CA1\u6709\u81EA\u5DF1\u559C\u6B22\u7684\u989C\u8272\uFF1F\u5FEB\u6765\u8BD5\u8BD5\u52A9\u624B\u7684<a href="#">\u81EA\u5B9A\u4E49\u672C\u4EBA\u795E\u79D8\u989C\u8272</a>\u7684\u529F\u80FD\u5427\uFF01\uFF08\u867D\u7136\u4EC5\u9650\u81EA\u5DF1\u53EF\u89C1 \u256E(\u256F\u25BD\u2570)\u256D\uFF09</span><br>').appendTo($autoChangeIdColor).find("a").click(function(e) {
          e.preventDefault();
          show3();
        });
        let $idColors = $autoChangeIdColor.parent("tr").nextAll("tr").not("tr:last");
        if ($idColors.find("a").length <= 1) return;
        let $area = $(`
<form>
<div data-name="autoChangeIdColorBtns" style="margin-top: 5px;">
  <label><input name="autoChangeIdColorEnabled" class="pd_input" type="checkbox"> \u81EA\u52A8\u66F4\u6362ID\u989C\u8272</label>
</div>
</form>
`).appendTo($autoChangeIdColor);
        $area.find('[name="autoChangeIdColorEnabled"]').click(function() {
          let $this2 = $(this);
          let enabled = $this2.prop("checked");
          if (enabled !== Config.autoChangeIdColorEnabled) {
            read3();
            Config.autoChangeIdColorEnabled = enabled;
            write3();
          }
          if (enabled) {
            $idColors.addClass("pd_id_color_select").find("td:not(:has(a))").css("cursor", "not-allowed");
            $(`
<label class="pd_cfg_ml">
  \u66F4\u6362\u987A\u5E8F
  <select name="autoChangeIdColorType" style="font-size: 12px;">
    <option value="random">\u968F\u673A</option><option value="sequence">\u987A\u5E8F</option>
  </select>
</label>&nbsp;
<label>\u6BCF\u9694 <input name="autoChangeIdColorInterval" class="pd_input" style="width: 25px;" type="text" maxlength="5"> \u5C0F\u65F6</label>
<button name="save" type="button">\u4FDD\u5B58</button>
<button name="reset" type="button" style="margin-left: 3px;">\u91CD\u7F6E</button><br>
<a class="pd_btn_link" data-name="selectAll" href="#">\u5168\u9009</a>
<a class="pd_btn_link" data-name="selectInverse" href="#">\u53CD\u9009</a>
<label><input name="changeAllAvailableIdColorEnabled" class="pd_input" type="checkbox"> \u9009\u62E9\u5F53\u524D\u6240\u6709\u53EF\u7528\u7684ID\u989C\u8272</label>
`).insertAfter($this2.parent()).filter('[name="save"]').click(function() {
              let $autoChangeIdColorInterval = $area.find('[name="autoChangeIdColorInterval"]');
              let interval = parseInt($autoChangeIdColorInterval.val());
              if (isNaN(interval) || interval <= 0) {
                alert("ID\u989C\u8272\u66F4\u6362\u65F6\u95F4\u95F4\u9694\u683C\u5F0F\u4E0D\u6B63\u786E");
                $autoChangeIdColorInterval.select().focus();
                return;
              }
              let changeAllAvailableSMColorEnabled = $area.find('[name="changeAllAvailableIdColorEnabled"]').prop("checked");
              let customChangeSMColorList = [];
              $idColors.find('[type="checkbox"]:checked').each(function() {
                customChangeSMColorList.push(parseInt($(this).val()));
              });
              if (!changeAllAvailableSMColorEnabled && customChangeSMColorList.length <= 1) {
                alert("\u5FC5\u987B\u9009\u62E92\u79CD\u6216\u4EE5\u4E0A\u7684ID\u989C\u8272");
                return;
              }
              if (customChangeSMColorList.length <= 1) customChangeSMColorList = [];
              let oriInterval = Config.autoChangeIdColorInterval;
              read3();
              Config.autoChangeIdColorType = $area.find('[name="autoChangeIdColorType"]').val().toLowerCase();
              Config.autoChangeIdColorInterval = interval;
              Config.changeAllAvailableIdColorEnabled = changeAllAvailableSMColorEnabled;
              Config.customAutoChangeIdColorList = customChangeSMColorList;
              write3();
              if (oriInterval !== Config.autoChangeIdColorInterval)
                deleteCookie(Const_default.autoChangeIdColorCookieName);
              alert("\u8BBE\u7F6E\u4FDD\u5B58\u6210\u529F");
            }).end().filter('[name="reset"]').click(function() {
              read3();
              Config.autoChangeIdColorEnabled = Config2.autoChangeIdColorEnabled;
              Config.autoChangeIdColorType = Config2.autoChangeIdColorType;
              Config.autoChangeIdColorInterval = Config2.autoChangeIdColorInterval;
              Config.changeAllAvailableIdColorEnabled = Config2.changeAllAvailableIdColorEnabled;
              Config.customAutoChangeIdColorList = Config2.customAutoChangeIdColorList;
              write3();
              deleteCookie(Const_default.autoChangeIdColorCookieName);
              deleteValue(Const_default.prevAutoChangeIdColorTmpLogName);
              alert("\u8BBE\u7F6E\u5DF2\u91CD\u7F6E");
              location.reload();
            }).end().filter('[data-name="selectAll"], [data-name="selectInverse"]').click(function(e) {
              e.preventDefault();
              if ($idColors.find("input[disabled]").length > 0) {
                alert("\u8BF7\u5148\u53D6\u6D88\u52FE\u9009\u201C\u9009\u62E9\u5F53\u524D\u6240\u6709\u53EF\u7528\u7684ID\u989C\u8272\u201D\u590D\u9009\u6846");
                $area.find('[name="changeAllAvailableIdColorEnabled"]').focus();
                return;
              }
              if ($(this).is('[data-name="selectAll"]')) selectAll($idColors.find('[type="checkbox"]'));
              else selectInverse($idColors.find('[type="checkbox"]'));
            });
            $idColors.find("td:has(a)").each(function() {
              let $this3 = $(this);
              let matches = /&color=(\d+)/i.exec($this3.find("a").attr("href"));
              if (matches) $this3.append(`<input type="checkbox" class="pd_input" value="${matches[1]}">`);
            });
            $area.find('[name="autoChangeIdColorType"]').val(Config.autoChangeIdColorType);
            $area.find('[name="autoChangeIdColorInterval"]').val(Config.autoChangeIdColorInterval);
            $area.find('[name="changeAllAvailableIdColorEnabled"]').click(function() {
              $idColors.find("input").prop("disabled", $(this).prop("checked"));
            }).prop("checked", Config.changeAllAvailableIdColorEnabled).triggerHandler("click");
            for (let id of Config.customAutoChangeIdColorList) {
              $idColors.find(`input[value="${id}"]`).prop("checked", true);
            }
          } else {
            $this2.parent().nextAll().remove();
            $idColors.removeClass("pd_id_color_select").find("input").remove();
          }
        });
        $idColors.on("click", "td", function(e) {
          if (!$(e.target).is("a")) {
            let $this2 = $(this);
            if ($this2.find("input[disabled]").length > 0) {
              alert("\u8BF7\u5148\u53D6\u6D88\u52FE\u9009\u201C\u9009\u62E9\u5F53\u524D\u6240\u6709\u53EF\u7528\u7684ID\u989C\u8272\u201D\u590D\u9009\u6846");
              $area.find('[name="changeAllAvailableIdColorEnabled"]').focus();
            } else if (!$(e.target).is("input")) {
              $this2.find("input").click();
            }
          }
        });
        if (Config.autoChangeIdColorEnabled) {
          $area.find('[name="autoChangeIdColorEnabled"]').prop("checked", true).triggerHandler("click");
        }
      };
      syncModifyPerPageFloorNum = function() {
        const syncConfig = function() {
          let perPageFloorNum = parseInt($('select[name="p_num"]').val());
          if (isNaN(perPageFloorNum)) return;
          if (!perPageFloorNum) perPageFloorNum = 20;
          if (perPageFloorNum !== Config.perPageFloorNum) {
            Config.perPageFloorNum = perPageFloorNum;
            write3();
          }
        };
        $("form#creator").submit(() => {
          read3();
          syncConfig();
        });
        syncConfig();
      };
      addAvatarChangeAlert = function() {
        $('input[name="uploadurl[2]"]').parent().append('<div class="pd_highlight">\u672C\u53CD\u5411\u4EE3\u7406\u670D\u52A1\u5668\u4E3A\u4E86\u63D0\u9AD8\u6027\u80FD\u5BF9\u56FE\u7247\u8BBE\u7F6E\u4E86\u7F13\u5B58\uFF0C\u66F4\u6362\u5934\u50CF\u540E\u53EF\u80FD\u9700\u7B49\u5F85<b>\u6700\u591A30\u5206\u949F</b>\u624D\u80FD\u770B\u5230\u6548\u679C</div>');
      };
      addUserNameLinkInRankPage = function() {
        $(".kf_no11:eq(2) > tbody > tr:gt(0) > td:nth-child(2)").each(function() {
          let $this2 = $(this);
          let userName2 = $this2.text().trim();
          $this2.html(`<a class="${!Config.adminMemberEnabled ? "pd_not_click_link" : ""}" href="profile.php?action=show&username=${userName2}" target="_blank">${userName2}</a>`);
          if (userName2 === Info_default.userName) $this2.find("a").addClass("pd_highlight");
        });
      };
      handleProfilePage = function() {
        let $area = $(".log1 > tbody > tr:last-child > td:nth-child(2)");
        $area.html(
          $area.html().replace(/<b>在线<\/b>/, '<b style="color: #090;">\u5728\u7EBF</b>').replace(/<b>离线<\/b>/, '<b style="color: #999;">\u79BB\u7EBF</b>').replace(/系统等级：(\S+)/, '\u7CFB\u7EDF\u7B49\u7EA7\uFF1A<span class="pd_highlight">$1</span>').replace(/发帖数量：(\d+)/, (m, num2) => `\u53D1\u5E16\u6570\u91CF\uFF1A<span data-num="${num2}">${parseInt(num2).toLocaleString()}</span>`).replace(/神秘等级：(-?\d+)/, (m, num2) => `\u795E\u79D8\u7B49\u7EA7\uFF1A<span data-num="${num2}">${parseInt(num2).toLocaleString()}</span>`).replace(/论坛货币：(-?\d+)/, (m, num2) => `\u8BBA\u575B\u8D27\u5E01\uFF1A<span data-num="${num2}">${parseInt(num2).toLocaleString()}</span>`).replace(/贡献数值：(-?\d+(?:\.\d+)?)/, (m, num2) => `\u8D21\u732E\u6570\u503C\uFF1A<span data-num="${num2}">${parseFloat(num2).toLocaleString()}</span>`).replace(/在线时间：(\d+)/, (m, num2) => `\u5728\u7EBF\u65F6\u95F4\uFF1A<span data-num="${num2}">${parseInt(num2).toLocaleString()}</span>`).replace(/注册时间：((\d{4})-(\d{2})-(\d{2}))/, (m, date, year, month, day) => {
            let now = /* @__PURE__ */ new Date();
            let html2 = date;
            if (parseInt(month) === now.getMonth() + 1 && parseInt(day) === now.getDate() && parseInt(year) <= now.getFullYear())
              html2 = `<span class="pd_custom_tips pd_highlight" title="\u4ECA\u5929\u662F\u8BE5\u7528\u6237\u6CE8\u518C${now.getFullYear() - parseInt(year)}\u5468\u5E74\u7EAA\u5FF5\u65E5">${date}</span>`;
            return "\u6CE8\u518C\u65F6\u95F4\uFF1A" + html2;
          })
        ).css("vertical-align", "top");
      };
      addGuanJianCiUserNameLink = function() {
        $(".kf_share1 > tbody > tr:gt(1) > td.kf_share2:last-child").each(function() {
          let $this2 = $(this);
          let userName2 = $this2.text().trim();
          if (userName2) {
            $this2.html(`<a href="profile.php?action=show&username=${userName2}">${userName2}</a>`);
          }
        });
      };
    }
  });

  // src/module/Script.js
  var Script_exports = {};
  __export(Script_exports, {
    addFunc: () => addFunc,
    handleInstallScriptLink: () => handleInstallScriptLink,
    runCmd: () => runCmd,
    runCustomScript: () => runCustomScript,
    runFunc: () => runFunc,
    showDialog: () => showDialog
  });
  var defScriptName, metaRegex, funcList, runCustomScript, runCmd, addFunc, runFunc, getScriptMeta, showDialog, handleInstallScriptLink;
  var init_Script = __esm({
    "src/module/Script.js"() {
      "use strict";
      init_Info();
      init_Dialog();
      init_Config();
      init_Util();
      init_Const();
      init_Msg();
      init_Log();
      init_TmpLog();
      init_Public();
      init_Index();
      init_Read();
      init_Post();
      init_Other();
      init_Bank();
      init_Item();
      init_Loot();
      init_ConfigDialog();
      defScriptName = "\u672A\u547D\u540D\u811A\u672C";
      metaRegex = /\/\/\s*==UserScript==((?:.|\n)+?)\/\/\s*==\/UserScript==/i;
      funcList = /* @__PURE__ */ new Map();
      runCustomScript = function(type = "end") {
        for (let { enabled, trigger, content } of Config.customScriptList) {
          if (enabled && trigger === type && content) {
            runCmd(content);
          }
        }
      };
      runCmd = function(cmd, isOutput = false) {
        let result = true;
        let response = "";
        try {
          response = eval(cmd);
          if (isOutput) console.log(response);
        } catch (ex) {
          result = false;
          response = ex;
          console.log(ex);
        }
        return { result, response: String(response) };
      };
      addFunc = function(name4, func) {
        if (!funcList.has(name4)) funcList.set(name4, []);
        funcList.get(name4).push(func);
      };
      runFunc = function(name4, data) {
        if (funcList.has(name4)) {
          for (let func of funcList.get(name4)) {
            if (typeof func === "function") {
              try {
                func(data);
              } catch (ex) {
                console.log(ex);
              }
            }
          }
        }
      };
      getScriptMeta = function(content) {
        let meta = {
          name: defScriptName,
          version: "",
          trigger: "end",
          homepage: "",
          author: ""
        };
        let matches = metaRegex.exec(content);
        if (!matches) return meta;
        let metaContent = matches[1];
        matches = /@name[ \t]+(.*)/i.exec(metaContent);
        if (matches) meta.name = matches[1];
        matches = /@version[ \t]+(.*)/i.exec(metaContent);
        if (matches) meta.version = matches[1];
        matches = /@trigger[ \t]+(.*)/i.exec(metaContent);
        if (matches) meta.trigger = matches[1].toLowerCase() === "start" ? "start" : "end";
        matches = /@homepage[ \t]+(.*)/i.exec(metaContent);
        if (matches) meta.homepage = matches[1];
        matches = /@author[ \t]+(.*)/i.exec(metaContent);
        if (matches) meta.author = matches[1];
        return meta;
      };
      showDialog = function(showIndex = null) {
        const dialogName2 = "pdCustomScriptDialog";
        if ($("#" + dialogName2).length > 0) return;
        read3();
        let html2 = `
<div class="pd_cfg_main">
  <div style="margin-top: 5px;">
    <a class="pd_highlight pd_btn_link" data-name="addNewScript" href="#">\u6DFB\u52A0\u65B0\u811A\u672C</a>
    <a class="pd_btn_link" data-name="insertSample" href="#">\u63D2\u5165\u8303\u4F8B</a>
  </div>
  <div data-name="customScriptList"></div>
</div>
<div class="pd_cfg_btns">
  <span class="pd_cfg_about">
    <a class="pd_btn_link pd_highlight" href="read.php?tid=500968&sf=b09" target="_blank">\u81EA\u5B9A\u4E49\u811A\u672C\u6536\u96C6\u8D34</a>
    <a class="pd_btn_link" data-name="openImOrExCustomScriptDialog" href="#">\u5BFC\u5165/\u5BFC\u51FA\u6240\u6709\u811A\u672C</a>
  </span>
  <button type="submit">\u4FDD\u5B58</button>
  <button data-action="close" type="button">\u53D6\u6D88</button>
  <button class="pd_highlight" name="clear" type="button">\u6E05\u7A7A</button>
</div>`;
        let $dialog2 = create(dialogName2, "\u81EA\u5B9A\u4E49\u811A\u672C", html2, "min-width: 776px;");
        let $customScriptList = $dialog2.find('[data-name="customScriptList"]');
        $dialog2.submit(function(e) {
          e.preventDefault();
          Config.customScriptList = [];
          $customScriptList.find(".pd_custom_script_content").each(function() {
            let $this2 = $(this);
            let content = $this2.val();
            if (!$.trim(content)) return;
            let enabled = $this2.prev().find('[type="checkbox"]').prop("checked");
            Config.customScriptList.push($.extend(getScriptMeta(content), { enabled, content }));
          });
          write3();
          close(dialogName2);
          alert("\u81EA\u5B9A\u4E49\u811A\u672C\u4FEE\u6539\u6210\u529F\uFF08\u9700\u5237\u65B0\u9875\u9762\u540E\u624D\u53EF\u751F\u6548\uFF09");
        }).end().find('[name="clear"]').click(function(e) {
          e.preventDefault();
          if (confirm("\u662F\u5426\u6E05\u7A7A\u6240\u6709\u811A\u672C\uFF1F")) {
            $customScriptList.html("");
            resize(dialogName2);
          }
        });
        const addCustomScript = function({
          enabled = true,
          name: name4 = defScriptName,
          version: version2 = "",
          homepage = "",
          trigger = "end",
          content = ""
        } = {}) {
          $customScriptList.append(`
<div class="pd_custom_script_header">
  <input type="checkbox" ${enabled ? "checked" : ""} title="\u662F\u5426\u542F\u7528\u6B64\u811A\u672C">
  <a class="pd_custom_script_name" href="#" style="margin-left: 5px;">[${name4}]</a>
  <span data-name="version" style="margin-left: 5px; color: #666;" ${!version2 ? "hidden" : ""}>${version2}</span>
  <span data-name="trigger" style="margin-left: 5px; color: ${trigger === "start" ? "#f00" : "#00f"};" title="\u811A\u672C\u6267\u884C\u65F6\u673A">
    [${trigger === "start" ? "\u5F00\u59CB\u65F6" : "\u7ED3\u675F\u65F6"}]
  </span>
  <a data-name="homepage" href="${homepage}" target="_blank" style="margin-left: 5px;" ${!homepage ? "hidden" : ""}>[\u4E3B\u9875]</a>
  <a data-name="delete" href="#" style="margin-left: 5px; color: #666;">[\u5220\u9664]</a>
</div>
<textarea class="pd_custom_script_content" wrap="off">${content}</textarea>
`);
        };
        for (let data of Config.customScriptList) {
          addCustomScript(data);
        }
        $dialog2.find('[data-name="addNewScript"]').click(function(e) {
          e.preventDefault();
          $customScriptList.find(".pd_custom_script_content").hide();
          addCustomScript();
          $customScriptList.find(".pd_custom_script_content:last").show().focus();
          resize(dialogName2);
        }).end().find('[data-name="insertSample"]').click(function(e) {
          e.preventDefault();
          let $content = $customScriptList.find(".pd_custom_script_content:visible");
          $content.val(`
// ==UserScript==
// @name        ${defScriptName}
// @version     1.0
// @author      ${Info_default.userName}
// @trigger     end
// @homepage    read.php?tid=500968&spid=12318348
// @description \u8FD9\u662F\u4E00\u4E2A\u672A\u547D\u540D\u811A\u672C
// ==/UserScript==
`.trim() + "\n" + $content.val()).focus();
        }).end().find('[data-name="openImOrExCustomScriptDialog"]').click(function(e) {
          e.preventDefault();
          showCommonImportOrExportConfigDialog("\u81EA\u5B9A\u4E49\u811A\u672C", "customScriptList");
        });
        $customScriptList.on("click", ".pd_custom_script_name", function(e) {
          e.preventDefault();
          $dialog2.find(".pd_custom_script_content").hide();
          $(this).parent().next().show().focus();
          resize(dialogName2);
        }).on("click", '[data-name="delete"]', function(e) {
          e.preventDefault();
          if (!confirm("\u662F\u5426\u5220\u9664\u6B64\u811A\u672C\uFF1F")) return;
          let $header = $(this).closest(".pd_custom_script_header");
          $header.next().remove();
          $header.remove();
          resize(dialogName2);
        }).on("change", ".pd_custom_script_content", function() {
          let $this2 = $(this);
          let { name: name4, version: version2, homepage, trigger } = getScriptMeta($this2.val());
          let $header = $this2.prev();
          $header.find(".pd_custom_script_name").text(`[${name4 ? name4 : defScriptName}]`);
          $header.find('[data-name="version"]').text(version2).prop("hidden", !version2);
          $header.find('[data-name="homepage"]').attr("href", homepage ? homepage : "").prop("hidden", !homepage);
          $header.find('[data-name="trigger"]').html(`[${trigger === "start" ? "\u5F00\u59CB\u65F6" : "\u7ED3\u675F\u65F6"}]`).css("color", trigger === "start" ? "#f00" : "#00f");
        });
        show2(dialogName2);
        if (typeof showIndex === "number") $customScriptList.find(".pd_custom_script_name").eq(showIndex).click();
      };
      handleInstallScriptLink = function() {
        $(document).on("click", 'a[href$="#install-script"]', function(e) {
          e.preventDefault();
          let $this2 = $(this);
          let $area = $this2.nextAll(".pd_code_area").eq(0);
          if (!$area.length) return;
          let content = htmlDecode($area.html().replace(/<legend>.+?<\/legend>/i, "")).trim();
          if (!metaRegex.test(content)) return;
          read3();
          let meta = getScriptMeta(content);
          let index = Config.customScriptList.findIndex((script2) => script2.name === meta.name && script2.author === meta.author);
          let type = index > -1 ? 1 : 0;
          if (!confirm(`\u662F\u5426${type === 1 ? "\u66F4\u65B0" : "\u5B89\u88C5"}\u6B64\u811A\u672C\uFF1F`)) return;
          Config.customScriptEnabled = true;
          let script = $.extend(meta, { enabled: true, content });
          if (type === 1) Config.customScriptList[index] = script;
          else Config.customScriptList.push(script);
          write3();
          close("pdCustomScriptDialog");
          showDialog(index);
        });
      };
    }
  });

  // src/module/ConfigDialog.js
  var show3, setMainConfigValue, getMainConfigValue, verifyMainConfig, showClearDataDialog, showRunCommandDialog, showImportOrExportSettingDialog, showCustomCssDialog, showUserMemoDialog, showFollowUserDialog, showBlockUserDialog, showBlockThreadDialog, showBuyItemTipsDialog;
  var init_ConfigDialog = __esm({
    "src/module/ConfigDialog.js"() {
      "use strict";
      init_Info();
      init_Util();
      init_Dialog();
      init_Const();
      init_Config();
      init_TmpLog();
      init_Public();
      init_Script();
      show3 = function() {
        const dialogName2 = "pdConfigDialog";
        if ($("#" + dialogName2).length > 0) return;
        read3();
        runFunc("ConfigDialog.show_before_");
        let html2 = `
<div class="pd_cfg_main">
  <div class="pd_cfg_nav">
    <a class="pd_btn_link" data-name="openClearDataDialog" title="\u6E05\u9664\u4E0E\u52A9\u624B\u6709\u5173\u7684\u6570\u636E" href="#">\u6E05\u9664\u6570\u636E</a>
    <a class="pd_btn_link" data-name="openRumCommandDialog" href="#">\u8FD0\u884C\u547D\u4EE4</a>
    <a class="pd_btn_link" data-name="openImportOrExportSettingDialog" href="#">\u5BFC\u5165/\u5BFC\u51FA\u8BBE\u7F6E</a>
  </div>

  <div class="pd_cfg_panel" style="margin-bottom: 5px;">
    <fieldset>
      <legend>
        <label>
          <input name="timingModeEnabled" type="checkbox"> \u5B9A\u65F6\u6A21\u5F0F
          <span class="pd_cfg_tips" title="\u53EF\u6309\u65F6\u8FDB\u884C\u81EA\u52A8\u64CD\u4F5C\uFF08\u5305\u62EC\u81EA\u52A8\u9886\u53D6\u6BCF\u65E5\u5956\u52B1\u3001\u81EA\u52A8\u63D0\u5347\u6218\u529B\u5149\u73AF\u3001\u81EA\u52A8\u4E89\u593A\u3001\u81EA\u52A8\u8D2D\u4E70\u7269\u54C1\uFF0C\u9700\u5F00\u542F\u76F8\u5173\u529F\u80FD\uFF09
\u53EA\u5728\u8BBA\u575B\u9996\u9875\u548C\u4E89\u593A\u9996\u9875\u751F\u6548\uFF08\u4E0D\u5F00\u542F\u6B64\u6A21\u5F0F\u7684\u8BDD\u53EA\u80FD\u5728\u5237\u65B0\u9875\u9762\u540E\u624D\u4F1A\u8FDB\u884C\u64CD\u4F5C\uFF09">[?]</span>
        </label>
      </legend>
      <label>
        \u6807\u9898\u63D0\u793A\u65B9\u6848
        <select name="showTimingModeTipsType">
          <option value="auto">\u505C\u7559\u4E00\u5206\u949F\u540E\u663E\u793A</option>
          <option value="always">\u603B\u662F\u663E\u793A</option>
          <option value="never">\u4E0D\u663E\u793A</option>
        </select>
        <span class="pd_cfg_tips" title="\u5728\u9996\u9875\u7684\u7F51\u9875\u6807\u9898\u4E0A\u663E\u793A\u5B9A\u65F6\u6A21\u5F0F\u63D0\u793A\u7684\u65B9\u6848">[?]</span>
      </label>
    </fieldset>
    <fieldset>
      <legend>
        <label>\u81EA\u52A8\u9886\u53D6\u6BCF\u65E5\u5956\u52B1</label>
      </legend>
      <label>
        <input name="autoGetDailyBonusEnabled" type="checkbox"> \u81EA\u52A8\u9886\u53D6\u6BCF\u65E5\u5956\u52B1
        <span class="pd_cfg_tips" title="\u6BCF\u5929\u81EA\u52A8\u9886\u53D6\u6BCF\u65E5\u5956\u52B1">[?]</span>
      </label>
    </fieldset>
    <fieldset>
      <legend>
        <label><input name="autoPromoteHaloEnabled" type="checkbox"> \u81EA\u52A8\u63D0\u5347\u6218\u529B\u5149\u73AF</label>
      </legend>
      <label>
        \u82B1\u8D39
        <select name="promoteHaloCostType" required>
          <option value="1">100KFB</option>
          <option value="2">1000KFB</option>
          <option value="11">0.2\u8D21\u732E</option>
          <option value="12">2\u8D21\u732E</option>
        </select>
        <span class="pd_cfg_tips" title="\u63D0\u5347\u6218\u529B\u5149\u73AF\u7684\u82B1\u8D39\u7C7B\u578B">[?]</span>
      </label>
      <label class="pd_cfg_ml">
         \u9AD8\u4E8E <input name="promoteHaloLimit" type="number" min="0" step="0.1" style="width: 55px;" required>
         <span data-id="promoteHaloLimitUnit">KFB</span>\u65F6
         <span class="pd_cfg_tips" title="\u5728\u64CD\u4F5C\u540E\u6240\u5269\u4F59\u7684KFB\u6216\u8D21\u732E\u9AD8\u4E8E\u6307\u5B9A\u503C\u65F6\u624D\u81EA\u52A8\u63D0\u5347\u6218\u529B\u5149\u73AF\uFF0C\u8BBE\u4E3A0\u8868\u793A\u4E0D\u9650\u5236">[?]</span>
      </label><br>
      <label>
        \u6BCF\u9694 <input name="promoteHaloInterval" type="number" min="8" style="width: 40px;" required> \u5C0F\u65F6
        <span class="pd_cfg_tips" title="\u81EA\u52A8\u63D0\u5347\u6218\u529B\u5149\u73AF\u7684\u95F4\u9694\u65F6\u95F4\uFF0C\u6700\u4F4E\u503C\uFF1A8\u5C0F\u65F6">[?]</span>
      </label>
      <label class="pd_cfg_ml">
        <input name="promoteHaloAutoIntervalEnabled" type="checkbox" data-mutex="[name=promoteHaloInterval]"> \u81EA\u52A8\u5224\u65AD
        <span class="pd_cfg_tips" title="\u81EA\u52A8\u5224\u65AD\u63D0\u5347\u6218\u529B\u5149\u73AF\u7684\u95F4\u9694\u65F6\u95F4\uFF08\u5728\u6709\u5269\u4F59\u6B21\u6570\u65F6\u5C3D\u53EF\u80FD\u4F7F\u7528\uFF09">[?]</span>
      </label>
    </fieldset>
    <fieldset>
      <legend>
        <label><input name="autoBuyItemEnabled" type="checkbox"> \u81EA\u52A8\u8D2D\u4E70\u7269\u54C1</label>
      </legend>
      <label>
        \u7269\u54C1ID\u5217\u8868 <input name="buyItemIdList" type="text" maxlength="50" style="width: 150px;">
      </label>
      <a class="pd_cfg_ml" data-name="openBuyItemTipsDialog" href="#">\u8BE6\u7EC6\u8BF4\u660E&raquo;</a><br>
      <label>
        \u5728 <input name="buyItemAfterTime" type="text" maxlength="8" style="width: 55px;" required> \u4E4B\u540E\u8D2D\u4E70\u7269\u54C1
        <span class="pd_cfg_tips" title="\u5728\u5F53\u5929\u7684\u6307\u5B9A\u65F6\u95F4\u4E4B\u540E\u8D2D\u4E70\u7269\u54C1\uFF08\u672C\u5730\u65F6\u95F4\uFF09\uFF0C\u4F8B\uFF1A00:40:00\uFF08\u6CE8\uFF1A\u8BF7\u4E0D\u8981\u8BBE\u7F6E\u4E3A\u572800:25:00\u4E4B\u524D\u7684\u65F6\u95F4\uFF09">[?]</span>
      </label>
    </fieldset>
    <fieldset>
      <legend>\u9996\u9875\u76F8\u5173</legend>
      <label hidden>
        <input name="smLevelUpAlertEnabled" type="checkbox"> \u795E\u79D8\u7B49\u7EA7\u5347\u7EA7\u63D0\u9192
        <span class="pd_cfg_tips" title="\u5728\u795E\u79D8\u7B49\u7EA7\u5347\u7EA7\u540E\u8FDB\u884C\u63D0\u9192\uFF0C\u53EA\u5728\u9996\u9875\u751F\u6548">[?]</span>
      </label>
      <label class="pd_cfg_ml" hidden>
        <input name="smRankChangeAlertEnabled" type="checkbox"> \u7CFB\u6570\u6392\u540D\u53D8\u5316\u63D0\u9192
        <span class="pd_cfg_tips" title="\u5728\u795E\u79D8\u7CFB\u6570\u6392\u540D\u53D1\u751F\u53D8\u5316\u65F6\u8FDB\u884C\u63D0\u9192\uFF0C\u53EA\u5728\u9996\u9875\u751F\u6548">[?]</span>
      </label><br hidden>
      <label>
        <input name="homePageThreadFastGotoLinkEnabled" type="checkbox"> \u4E3A\u9996\u9875\u5E16\u5B50\u52A0\u4E0A\u8DF3\u8F6C\u81F3\u9875\u672B\u94FE\u63A5
        <span class="pd_cfg_tips" title="\u5F00\u542F\u6B64\u529F\u80FD\u540E\uFF0C\u70B9\u51FB\u9996\u9875\u5E16\u5B50\u94FE\u63A5\u53F3\u4FA7\u7684\u56DE\u590D\u65F6\u95F4\u90E8\u5206\u5373\u53EF\u5FEB\u901F\u8DF3\u8F6C\u81F3\u5E16\u5B50\u9875\u672B">[?]</span>
      </label>
    </fieldset>
    <fieldset>
      <legend>\u7248\u5757\u9875\u9762\u76F8\u5173</legend>
      <label>
        <input name="showFastGotoThreadPageEnabled" type="checkbox" data-disabled="[name=maxFastGotoThreadPageNum]"> \u663E\u793A\u5E16\u5B50\u9875\u6570\u5FEB\u6377\u94FE\u63A5
        <span class="pd_cfg_tips" title="\u5728\u7248\u5757\u9875\u9762\u4E2D\u663E\u793A\u5E16\u5B50\u9875\u6570\u5FEB\u6377\u94FE\u63A5">[?]</span>
      </label>
      <label class="pd_cfg_ml">
        \u9875\u6570\u94FE\u63A5\u6700\u5927\u6570\u91CF <input name="maxFastGotoThreadPageNum" type="number" min="1" max="10" style="width: 40px;" required>
        <span class="pd_cfg_tips" title="\u5728\u5E16\u5B50\u9875\u6570\u5FEB\u6377\u94FE\u63A5\u4E2D\u663E\u793A\u9875\u6570\u94FE\u63A5\u7684\u6700\u5927\u6570\u91CF">[?]</span>
      </label><br>
      <label>
        <input name="highlightNewPostEnabled" type="checkbox"> \u9AD8\u4EAE\u4ECA\u65E5\u7684\u65B0\u5E16
        <span class="pd_cfg_tips" title="\u5728\u7248\u5757\u9875\u9762\u4E2D\u9AD8\u4EAE\u4ECA\u65E5\u65B0\u53D1\u8868\u5E16\u5B50\u7684\u53D1\u8868\u65F6\u95F4">[?]</span>
      </label>
    </fieldset>
    <fieldset>
      <legend>\u5173\u6CE8\u548C\u5C4F\u853D</legend>
      <label>
        <input name="followUserEnabled" type="checkbox" data-disabled="[data-name=openFollowUserDialog]"> \u5173\u6CE8\u7528\u6237
        <span class="pd_cfg_tips" title="\u5F00\u542F\u5173\u6CE8\u7528\u6237\u7684\u529F\u80FD\uFF0C\u6240\u5173\u6CE8\u7684\u7528\u6237\u5C06\u88AB\u52A0\u6CE8\u8BB0\u53F7\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u7BA1\u7406\u5173\u6CE8\u7528\u6237">[?]</span>
      </label>
      <a class="pd_cfg_ml" data-name="openFollowUserDialog" href="#">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>
      <label>
        <input name="blockUserEnabled" type="checkbox" data-disabled="[data-name=openBlockUserDialog]"> \u5C4F\u853D\u7528\u6237
        <span class="pd_cfg_tips" title="\u5F00\u542F\u5C4F\u853D\u7528\u6237\u7684\u529F\u80FD\uFF0C\u4F60\u5C06\u770B\u4E0D\u89C1\u6240\u5C4F\u853D\u7528\u6237\u7684\u53D1\u8A00\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u7BA1\u7406\u5C4F\u853D\u7528\u6237">[?]</span>
      </label>
      <a class="pd_cfg_ml" data-name="openBlockUserDialog" href="#">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>
      <label>
        <input name="blockThreadEnabled" type="checkbox" data-disabled="[data-name=openBlockThreadDialog]"> \u5C4F\u853D\u5E16\u5B50
        <span class="pd_cfg_tips" title="\u5F00\u542F\u5C4F\u853D\u6807\u9898\u4E2D\u5305\u542B\u6307\u5B9A\u5173\u952E\u5B57\u7684\u5E16\u5B50\u7684\u529F\u80FD\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u7BA1\u7406\u5C4F\u853D\u5173\u952E\u5B57">[?]</span>
      </label>
      <a class="pd_cfg_ml" data-name="openBlockThreadDialog" href="#">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>
    </fieldset>
  </div>

  <div class="pd_cfg_panel">
    <fieldset>
      <legend>\u5E16\u5B50\u9875\u9762\u76F8\u5173</legend>
      <label>
        \u5E16\u5B50\u6BCF\u9875\u697C\u5C42\u6570\u91CF
        <select name="perPageFloorNum">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
        <span class="pd_cfg_tips" title="\u7528\u4E8E\u7535\u68AF\u76F4\u8FBE\u548C\u5E16\u5B50\u9875\u6570\u5FEB\u6377\u94FE\u63A5\u7B49\u529F\u80FD\uFF0C\u5982\u679C\u4FEE\u6539\u4E86\u8BBA\u575B\u8BBE\u7F6E\u91CC\u7684\u201C\u6587\u7AE0\u5217\u8868\u6BCF\u9875\u4E2A\u6570\u201D\uFF0C\u8BF7\u5728\u6B64\u4FEE\u6539\u6210\u76F8\u540C\u7684\u6570\u76EE">[?]</span>
      </label>
      <label class="pd_cfg_ml">
        \u5E16\u5B50\u5185\u5BB9\u5B57\u4F53\u5927\u5C0F <input name="threadContentFontSize" type="number" min="7" max="72" style="width: 40px;"> px
        <span class="pd_cfg_tips" title="\u5E16\u5B50\u5185\u5BB9\u5B57\u4F53\u5927\u5C0F\uFF0C\u7559\u7A7A\u8868\u793A\u4F7F\u7528\u9ED8\u8BA4\u5927\u5C0F\uFF0C\u63A8\u8350\u503C\uFF1A14">[?]</span>
      </label><br>
      <label>
        <input name="turnPageViaKeyboardEnabled" type="checkbox"> \u901A\u8FC7\u5DE6\u53F3\u952E\u7FFB\u9875
        <span class="pd_cfg_tips" title="\u5728\u5E16\u5B50\u548C\u641C\u7D22\u9875\u9762\u901A\u8FC7\u5DE6\u53F3\u952E\u8FDB\u884C\u7FFB\u9875">[?]</span>
      </label>
      <label class="pd_cfg_ml">
        <input name="kfSmileEnhanceExtensionEnabled" type="checkbox" ${Info_default.isInSpecialDomain ? "" : "disabled"}> \u5F00\u542F\u7EEF\u6708\u8868\u60C5\u589E\u5F3A\u63D2\u4EF6
        <span class="pd_cfg_tips" title="\u5728\u53D1\u5E16\u6846\u4E0A\u663E\u793A\u7EEF\u6708\u8868\u60C5\u589E\u5F3A\u63D2\u4EF6\uFF08\u4EC5\u5728miaola.work\u57DF\u540D\u4E0B\u751F\u6548\uFF09">[?]</span>
      </label><br>
      <label>
        <input name="autoChangeIdColorEnabled" type="checkbox" data-disabled="[data-name=openAutoChangeSmColorPage]"> \u81EA\u52A8\u66F4\u6362ID\u989C\u8272
        <span class="pd_cfg_tips" title="\u53EF\u81EA\u52A8\u66F4\u6362ID\u989C\u8272\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u524D\u5F80\u76F8\u5E94\u9875\u9762\u8FDB\u884C\u81EA\u5B9A\u4E49\u8BBE\u7F6E">[?]</span>
      </label>
      <a data-name="openAutoChangeSmColorPage" class="pd_cfg_ml" target="_blank" href="kf_growup.php">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>
      <label>
        \u81EA\u5B9A\u4E49\u672C\u4EBA\u7684\u795E\u79D8\u989C\u8272 <input name="customMySmColor" maxlength="7" style="width: 50px;" type="text">
        <input style="margin-left: 0;" type="color" data-name="customMySmColorSelect">
        <span class="pd_cfg_tips" title="\u81EA\u5B9A\u4E49\u672C\u4EBA\u7684\u795E\u79D8\u989C\u8272\uFF08\u5305\u62EC\u5E16\u5B50\u9875\u9762\u7684ID\u663E\u793A\u989C\u8272\u548C\u697C\u5C42\u8FB9\u6846\u989C\u8272\uFF0C\u4EC5\u81EA\u5DF1\u53EF\u89C1\uFF09\uFF0C\u4F8B\uFF1A#009cff\uFF0C\u5982\u65E0\u9700\u6C42\u53EF\u7559\u7A7A">[?]</span>
      </label><br>
      <label>
        <input name="userMemoEnabled" type="checkbox" data-disabled="[data-name=openUserMemoDialog]"> \u663E\u793A\u7528\u6237\u5907\u6CE8
        <span class="pd_cfg_tips" title="\u5728\u697C\u5C42\u5185\u7684\u7528\u6237\u540D\u65C1\u663E\u793A\u8BE5\u7528\u6237\u7684\u81EA\u5B9A\u4E49\u5907\u6CE8\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u81EA\u5B9A\u4E49\u7528\u6237\u5907\u6CE8">[?]</span>
      </label>
      <a class="pd_cfg_ml" data-name="openUserMemoDialog" href="#">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>
      <label>
        <input name="modifyKfOtherDomainEnabled" type="checkbox"> \u5C06\u7EEF\u6708\u5176\u5B83\u57DF\u540D\u7684\u94FE\u63A5\u4FEE\u6539\u4E3A\u5F53\u524D\u57DF\u540D
        <span class="pd_cfg_tips" title="\u5C06\u5E16\u5B50\u548C\u77ED\u6D88\u606F\u4E2D\u7684\u7EEF\u6708\u5176\u5B83\u57DF\u540D\u7684\u94FE\u63A5\u4FEE\u6539\u4E3A\u5F53\u524D\u57DF\u540D">[?]</span>
      </label><br>
      <label>
        <input name="multiQuoteEnabled" type="checkbox"> \u5F00\u542F\u591A\u91CD\u5F15\u7528\u529F\u80FD
        <span class="pd_cfg_tips" title="\u5728\u5E16\u5B50\u9875\u9762\u5F00\u542F\u591A\u91CD\u56DE\u590D\u548C\u591A\u91CD\u5F15\u7528\u529F\u80FD">[?]</span>
      </label>
      <label class="pd_cfg_ml">
        <input name="parseMediaTagEnabled" type="checkbox"> \u89E3\u6790\u591A\u5A92\u4F53\u6807\u7B7E
        <span class="pd_cfg_tips" title="\u5728\u5E16\u5B50\u9875\u9762\u89E3\u6790HTML5\u591A\u5A92\u4F53\u6807\u7B7E\uFF0C\u8BE6\u89C1\u3010\u5E38\u89C1\u95EE\u989812\u3011">[?]</span>
      </label><br>
      <label>
        <input name="buyThreadNoJumpEnabled" type="checkbox" data-disabled="[name=saveBuyThreadLogEnabled]" data-mutex="true"> \u8D2D\u4E70\u5E16\u5B50\u65F6\u4E0D\u8DF3\u8F6C
        <span class="pd_cfg_tips" title="\u4F7F\u7528Ajax\u7684\u65B9\u5F0F\u8D2D\u4E70\u5E16\u5B50\uFF0C\u8D2D\u4E70\u65F6\u9875\u9762\u4E0D\u4F1A\u8DF3\u8F6C">[?]</span>
      </label>
      <label class="pd_cfg_ml">
        <input name="saveBuyThreadLogEnabled" type="checkbox"> \u4FDD\u5B58\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55
        <span class="pd_cfg_tips" title="\u81EA\u52A8\u4FDD\u5B58\u8D2D\u4E70\u5E16\u5B50\u7684\u8BB0\u5F55\uFF0C\u53EF\u5728\u52A9\u624B\u65E5\u5FD7\u6216\u8D2D\u4E70\u4EBA\u540D\u5355\u91CC\u70B9\u51FB\u67E5\u770B\u8D2D\u4E70\u8BB0\u5F55\uFF08\u9700\u540C\u65F6\u5F00\u542F\u201C\u8D2D\u4E70\u5E16\u5B50\u65F6\u4E0D\u8DF3\u8F6C\u201D\u7684\u529F\u80FD\uFF09">[?]</span>
      </label><br>
      <label>
        <input name="preventCloseWindowWhenEditPostEnabled" type="checkbox"> \u5199\u5E16\u5B50\u65F6\u963B\u6B62\u5173\u95ED\u9875\u9762
        <span class="pd_cfg_tips" title="\u5728\u64B0\u5199\u53D1\u5E16\u5185\u5BB9\u65F6\uFF0C\u5982\u4E0D\u5C0F\u5FC3\u5173\u95ED\u4E86\u9875\u9762\u4F1A\u8FDB\u884C\u63D0\u793A">[?]</span>
      </label>
      <label class="pd_cfg_ml">
        <input name="autoSavePostContentWhenSubmitEnabled" type="checkbox"> \u63D0\u4EA4\u65F6\u4FDD\u5B58\u53D1\u5E16\u5185\u5BB9
        <span class="pd_cfg_tips" title="\u5728\u63D0\u4EA4\u65F6\u81EA\u52A8\u4FDD\u5B58\u53D1\u5E16\u5185\u5BB9\uFF0C\u4EE5\u4FBF\u5728\u51FA\u73B0\u610F\u5916\u60C5\u51B5\u65F6\u80FD\u591F\u6062\u590D\u53D1\u5E16\u5185\u5BB9\uFF08\u9700\u5728\u4E0D\u5173\u95ED\u5F53\u524D\u6807\u7B7E\u9875\u7684\u60C5\u51B5\u4E0B\u624D\u80FD\u8D77\u6548\uFF09">[?]</span>
      </label><br>
      <label>
        <input name="autoReplaceManualOpenImgLinkEnabled" type="checkbox"> \u81EA\u52A8\u66FF\u6362\u624B\u52A8\u6253\u5F00\u56FE\u7247\u94FE\u63A5
        <span class="pd_cfg_tips" title="\u81EA\u52A8\u5C06\u8D44\u6E90\u677F\u5757\u5E16\u5B50\u4E2D\u7684\u201C\u8BF7\u624B\u52A8\u70B9\u51FB\u6253\u5F00\u672C\u56FE\u7247\u201D\u94FE\u63A5\u66FF\u6362\u4E3A\u5B9E\u9645\u56FE\u7247">[?]</span>
      </label>
    </fieldset>
    <fieldset>
      <legend>\u5176\u5B83\u8BBE\u7F6E</legend>
      <label class="pd_highlight">
        \u5B58\u50A8\u7C7B\u578B
        <select data-name="storageType">
          <option value="Default">\u9ED8\u8BA4</option>
          <option value="ByUid">\u6309uid</option>
          <option value="Global">\u5168\u5C40</option>
        </select>
        <span class="pd_cfg_tips" title="\u52A9\u624B\u8BBE\u7F6E\u548C\u65E5\u5FD7\u7684\u5B58\u50A8\u65B9\u5F0F\uFF0C\u8BE6\u60C5\u53C2\u89C1\u3010\u5E38\u89C1\u95EE\u98981\u3011">[?]</span>
      </label>
      <label class="pd_cfg_ml">
        \u6D4F\u89C8\u5668\u7C7B\u578B
        <select name="browseType">
          <option value="auto">\u81EA\u52A8\u68C0\u6D4B</option>
          <option value="desktop">\u684C\u9762\u7248</option>
          <option value="mobile">\u79FB\u52A8\u7248</option>
        </select>
        <span class="pd_cfg_tips" title="\u7528\u4E8E\u5728KFOL\u52A9\u624B\u4E0A\u5224\u65AD\u6D4F\u89C8\u5668\u7684\u7C7B\u578B\uFF0C\u4E00\u822C\u4F7F\u7528\u81EA\u52A8\u68C0\u6D4B\u5373\u53EF\uFF1B
\u5982\u679C\u5F53\u524D\u6D4F\u89C8\u5668\u4E0E\u81EA\u52A8\u68C0\u6D4B\u7684\u7C7B\u578B\u4E0D\u76F8\u7B26\uFF08\u79FB\u52A8\u7248\u4F1A\u5728\u8BBE\u7F6E\u754C\u9762\u6807\u9898\u4E0A\u663E\u793A\u201CFor Mobile\u201D\u7684\u5B57\u6837\uFF09\uFF0C\u8BF7\u624B\u52A8\u8BBE\u7F6E\u4E3A\u6B63\u786E\u7684\u7C7B\u578B">[?]</span>
      </label><br>
      <label>
        \u6D88\u606F\u663E\u793A\u65F6\u95F4 <input name="defShowMsgDuration" type="number" min="-1" style="width: 46px;" required> \u79D2
        <span class="pd_cfg_tips" title="\u9ED8\u8BA4\u7684\u6D88\u606F\u663E\u793A\u65F6\u95F4\uFF08\u79D2\uFF09\uFF0C\u8BBE\u7F6E\u4E3A-1\u8868\u793A\u6C38\u4E45\u663E\u793A\uFF0C\u4F8B\uFF1A15\uFF08\u9ED8\u8BA4\u503C\uFF1A-1\uFF09">[?]</span>
      </label>
      <label class="pd_cfg_ml">
        \u65E5\u5FD7\u4FDD\u5B58\u5929\u6570 <input name="logSaveDays" type="number" min="1" max="270" style="width: 46px;" required>
        <span class="pd_cfg_tips" title="\u65E5\u5FD7\u4FDD\u5B58\u5929\u6570\uFF0C\u9ED8\u8BA4\u503C\uFF1A${Config2.logSaveDays}\uFF0C\u6700\u5927\u503C\uFF1A270">[?]</span>
      </label><br>
      <label>
        <input name="showSearchLinkEnabled" type="checkbox"> \u663E\u793A\u641C\u7D22\u94FE\u63A5
        <span class="pd_cfg_tips" title="\u5728\u7528\u6237\u83DC\u5355\u4E0A\u663E\u793A\u641C\u7D22\u5BF9\u8BDD\u6846\u7684\u94FE\u63A5">[?]</span>
      </label>
      <label class="pd_cfg_ml">
        <input name="animationEffectOffEnabled" type="checkbox"> \u7981\u7528\u52A8\u753B\u6548\u679C
        <span class="pd_cfg_tips" title="\u7981\u7528jQuery\u7684\u52A8\u753B\u6548\u679C\uFF08\u63A8\u8350\u5728\u914D\u7F6E\u8F83\u5DEE\u7684\u673A\u5668\u4E0A\u4F7F\u7528\uFF09">[?]</span>
      </label><br>
      <label>
        <input name="addFastNavMenuEnabled" type="checkbox"> \u6DFB\u52A0\u5FEB\u6377\u5BFC\u822A\u83DC\u5355
        <span class="pd_cfg_tips" title="\u4E3A\u9876\u90E8\u5BFC\u822A\u680F\u6DFB\u52A0\u5FEB\u6377\u5BFC\u822A\u83DC\u5355">[?]</span>
      </label>
      <label class="pd_cfg_ml">
        <input name="changeNewTipsColorEnabled" type="checkbox"> \u4FEE\u6539\u65B0\u63D0\u9192\u989C\u8272
        <span class="pd_cfg_tips" title="\u4FEE\u6539\u9876\u90E8\u7528\u6237\u83DC\u5355\u7684\u65B0\u63D0\u9192\u7684\u989C\u8272\uFF0C\u53EF\u6839\u636E\u4E0D\u540C\u7684\u6D88\u606F\u63D0\u9192\uFF08\u65B0\u77ED\u4FE1\u3001\u65B0\u56DE\u590D\u3001\u65B0\u8BC4\u5206\uFF09\uFF0C\u5206\u522B\u8BBE\u5B9A\u4E0D\u540C\u7684\u989C\u8272">[?]</span>
      </label><br>
      <label>
        <input name="customCssEnabled" type="checkbox" data-disabled="[data-name=openCustomCssDialog]"> \u6DFB\u52A0\u81EA\u5B9A\u4E49CSS
        <span class="pd_cfg_tips" title="\u4E3A\u9875\u9762\u6DFB\u52A0\u81EA\u5B9A\u4E49\u7684CSS\u5185\u5BB9\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u586B\u5165\u81EA\u5B9A\u4E49\u7684CSS\u5185\u5BB9">[?]</span>
      </label>
      <a class="pd_cfg_ml" data-name="openCustomCssDialog" href="#">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>
      <label>
        <input name="customScriptEnabled" type="checkbox" data-disabled="[data-name=openCustomScriptDialog]"> \u6267\u884C\u81EA\u5B9A\u4E49\u811A\u672C
        <span class="pd_cfg_tips" title="\u6267\u884C\u81EA\u5B9A\u4E49\u7684javascript\u811A\u672C\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u586B\u5165\u81EA\u5B9A\u4E49\u7684\u811A\u672C\u5185\u5BB9">[?]</span>
      </label>
      <a class="pd_cfg_ml" data-name="openCustomScriptDialog" href="#">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>
      <label>
        <input name="adminMemberEnabled" type="checkbox"> \u6211\u662F\u7BA1\u7406\u6210\u5458
        <span class="pd_cfg_tips" title="\u7BA1\u7406\u6210\u5458\u53EF\u5F00\u542F\u6B64\u529F\u80FD\uFF0C\u52A9\u624B\u4F1A\u5F00\u542F\u90E8\u5206\u53EA\u6709\u7BA1\u7406\u6210\u5458\u624D\u80FD\u4F7F\u7528\u7684\u529F\u80FD\uFF0C\u975E\u7BA1\u7406\u6210\u5458\u5F00\u542F\u6B64\u529F\u80FD\u65E0\u6548">[?]</span>
      </label>
      <label class="pd_cfg_ml">
        <input name="navBarAlwaysTopEnabled" type="checkbox"> \u4FDD\u6301\u5BFC\u822A\u680F\u7F6E\u9876
        <span class="pd_cfg_tips" title="\u4FDD\u6301\u9876\u90E8\u5BFC\u822A\u680F\u7F6E\u9876\uFF08\u65E7\u7248\u672C\u6D4F\u89C8\u5668\u53EF\u80FD\u65E0\u6CD5\u751F\u6548\uFF09">[?]</span>
      </label><br>
      <label>
        <input name="showGuGuZhenInFastNavEnabled" type="checkbox" ${Info_default.isInSpecialDomain ? "" : "disabled"}> \u5FEB\u6377\u5BFC\u822A\u663E\u793A\u5495\u5495\u9547
        <span class="pd_cfg_tips" title="\u5728\u5FEB\u6377\u5BFC\u822A\u4E2D\u663E\u793A\u5495\u5495\u9547\u7684\u94FE\u63A5">[?]</span>
      </label>
    </fieldset>
  </div>
</div>

<div class="pd_cfg_btns">
  <span class="pd_cfg_about">
    <a target="_blank" href="read.php?tid=508450&sf=140">By \u55B5\u62C9\u5E03\u4E01</a>
    <i style="color: #666; font-style: normal;">(V${Info_default.version})</i>
    <a target="_blank" href="https://gitee.com/miaolapd/KF_Online_Assistant/wikis/pages?title=%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98">[\u5E38\u89C1\u95EE\u9898]</a>
  </span>
  <button type="submit">\u4FDD\u5B58</button>
  <button data-action="close" type="button">\u53D6\u6D88</button>
  <button name="default" type="button">\u9ED8\u8BA4\u503C</button>
</div>`;
        let $dialog2 = create(dialogName2, "KFOL\u52A9\u624B\u8BBE\u7F6E" + (Info_default.isMobile ? " (For Mobile)" : ""), html2);
        $dialog2.submit(function(e) {
          e.preventDefault();
          if (!verifyMainConfig($dialog2)) return;
          let oriAutoRefreshEnabled = Config.timingModeEnabled;
          read3();
          let options = getMainConfigValue($dialog2);
          options = normalize(options);
          $.extend(Config, options);
          write3();
          let storageType = $dialog2.find('[data-name="storageType"]').val();
          if (storageType !== Info_default.storageType) {
            if (!confirm("\u662F\u5426\u4FEE\u6539\u5B58\u50A8\u7C7B\u578B\uFF1F")) return;
            changeStorageType(storageType);
            alert("\u5B58\u50A8\u7C7B\u578B\u5DF2\u4FEE\u6539");
            location.reload();
            return;
          }
          close(dialogName2);
          if (oriAutoRefreshEnabled !== options.timingModeEnabled) {
            if (confirm("\u4F60\u5DF2\u4FEE\u6539\u4E86\u5B9A\u65F6\u6A21\u5F0F\u7684\u8BBE\u7F6E\uFF0C\u9700\u8981\u5237\u65B0\u9875\u9762\u624D\u80FD\u751F\u6548\uFF0C\u662F\u5426\u7ACB\u5373\u5237\u65B0\uFF1F")) {
              location.reload();
            }
          }
        }).find('[name="default"]').click(function() {
          if (confirm("\u662F\u5426\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\uFF1F")) {
            clear3();
            alert("\u8BBE\u7F6E\u5DF2\u91CD\u7F6E");
            location.reload();
          }
        });
        $dialog2.on("click", 'a[data-name^="open"][href="#"]', function(e) {
          e.preventDefault();
          let $this2 = $(this);
          if ($this2.hasClass("pd_disabled_link")) return;
          let name4 = $this2.data("name");
          if (name4 === "openClearDataDialog") showClearDataDialog();
          else if (name4 === "openRumCommandDialog") showRunCommandDialog();
          else if (name4 === "openImportOrExportSettingDialog") showImportOrExportSettingDialog();
          else if (name4 === "openBuyItemTipsDialog") showBuyItemTipsDialog();
          else if (name4 === "openCustomSmColorDialog") showCustomSmColorDialog();
          else if (name4 === "openUserMemoDialog") showUserMemoDialog();
          else if (name4 === "openCustomCssDialog") showCustomCssDialog();
          else if (name4 === "openCustomScriptDialog") showDialog();
          else if (name4 === "openFollowUserDialog") showFollowUserDialog();
          else if (name4 === "openBlockUserDialog") showBlockUserDialog();
          else if (name4 === "openBlockThreadDialog") showBlockThreadDialog();
        }).find('[name="promoteHaloCostType"]').change(function() {
          let typeId = parseInt($(this).val());
          $dialog2.find('[data-id="promoteHaloLimitUnit"]').text(typeId >= 11 ? "\u8D21\u732E" : "KFB");
        }).end().find('[data-name="customMySmColorSelect"]').change(function() {
          $dialog2.find('[name="customMySmColor"]').val($(this).val().toString().toLowerCase());
        }).end().find('[name="customMySmColor"]').change(function() {
          let color = $.trim($(this).val());
          if (/^#[0-9a-fA-F]{6}$/.test(color)) $dialog2.find('[data-name="customMySmColorSelect"]').val(color.toLowerCase());
        });
        setMainConfigValue($dialog2);
        show2(dialogName2);
        runFunc("ConfigDialog.show_after_");
      };
      setMainConfigValue = function($dialog2) {
        $dialog2.find("input[name], select[name]").each(function() {
          let $this2 = $(this);
          let name4 = $this2.attr("name");
          if (name4 in Config) {
            if ($this2.is('[type="checkbox"]') && typeof Config[name4] === "boolean") $this2.prop("checked", Config[name4] === true);
            else $this2.val(Config[name4]);
          }
        });
        $dialog2.find('[name="promoteHaloCostType"]').trigger("change");
        $dialog2.find('[name="buyItemIdList"]').val(Config.buyItemIdList.join(","));
        $dialog2.find('[name="threadContentFontSize"]').val(Config.threadContentFontSize > 0 ? Config.threadContentFontSize : "");
        $dialog2.find('[data-name="customMySmColorSelect"]').val(Config.customMySmColor);
        $dialog2.find('[data-name="storageType"]').val(Info_default.storageType);
        if (typeof GM_getValue === "undefined") $dialog2.find('[data-name="storageType"] > option:gt(0)').prop("disabled", true);
      };
      getMainConfigValue = function($dialog2) {
        let options = {};
        $dialog2.find("input[name], select[name]").each(function() {
          let $this2 = $(this);
          let name4 = $this2.attr("name");
          if (name4 in Config) {
            if ($this2.is('[type="checkbox"]') && typeof Config[name4] === "boolean") {
              options[name4] = Boolean($this2.prop("checked"));
            } else if (typeof Config[name4] === "number") {
              let value = $.trim($this2.val());
              if (/\d+\.\d+/.test(value)) options[name4] = parseFloat(value);
              else options[name4] = parseInt(value);
              if (name4 === "threadContentFontSize" && isNaN(options[name4])) options[name4] = 0;
            } else {
              options[name4] = $.trim($this2.val());
            }
          }
        });
        if (options.buyItemIdList) options.buyItemIdList = options.buyItemIdList.split(",");
        else options.buyItemIdList = [];
        return options;
      };
      verifyMainConfig = function($dialog2) {
        let $txtBuyItemIdList = $dialog2.find('[name="buyItemIdList"]');
        let buyItemIdList = $.trim($txtBuyItemIdList.val());
        if ($dialog2.find('[name="autoBuyItemEnabled"]').prop("checked")) {
          if (!/^(\d+)(\|\d+)*(,(\d+)(\|\d+)*)?$/.test(buyItemIdList)) {
            alert("\u8D2D\u4E70\u7269\u54C1ID\u5217\u8868\u683C\u5F0F\u4E0D\u6B63\u786E");
            $txtBuyItemIdList.select().focus();
            return false;
          } else if (buyItemIdList.includes("901")) {
            alert("\u4E0D\u652F\u6301\u81EA\u52A8\u8D2D\u4E70\u91CD\u751F\u4E4B\u836F");
            $txtBuyItemIdList.select().focus();
            return false;
          }
        }
        let $txtBuyItemAfterTime = $dialog2.find('[name="buyItemAfterTime"]');
        let buyItemAfterTime = $.trim($txtBuyItemAfterTime.val());
        if (!/^(2[0-3]|[0-1][0-9]):[0-5][0-9]:[0-5][0-9]$/.test(buyItemAfterTime)) {
          alert("\u5728\u6307\u5B9A\u65F6\u95F4\u4E4B\u540E\u8D2D\u4E70\u7269\u54C1\u683C\u5F0F\u4E0D\u6B63\u786E");
          $txtBuyItemAfterTime.select().focus();
          return false;
        } else if (buyItemAfterTime < "00:25:00") {
          alert("\u5728\u6307\u5B9A\u65F6\u95F4\u4E4B\u540E\u8D2D\u4E70\u7269\u54C1\u4E0D\u5F97\u5C0F\u4E8E00:25:00");
          $txtBuyItemAfterTime.select().focus();
          return false;
        }
        let $txtCustomMySmColor = $dialog2.find('[name="customMySmColor"]');
        let customMySmColor = $.trim($txtCustomMySmColor.val());
        if (customMySmColor && !/^#[0-9a-fA-F]{6}$/.test(customMySmColor)) {
          alert("\u81EA\u5B9A\u4E49\u672C\u4EBA\u7684\u795E\u79D8\u989C\u8272\u683C\u5F0F\u4E0D\u6B63\u786E\uFF0C\u4F8B\uFF1A#009cff");
          $txtCustomMySmColor.select().focus();
          return false;
        }
        return true;
      };
      showClearDataDialog = function() {
        const dialogName2 = "pdClearDataDialog";
        if ($("#" + dialogName2).length > 0) return;
        let html2 = `
<div class="pd_cfg_main">
  <fieldset style="margin-top: 5px;">
    <legend>\u8BF7\u9009\u62E9\u60F3\u6E05\u9664\u7684\u4E34\u65F6\u7F13\u5B58\u6570\u636E\uFF08\u6309<b>Ctrl\u952E</b>\u6216<b>Shift\u952E</b>\u53EF\u591A\u9009\uFF09\uFF1A</legend>
    <select name="caches" size="2" style="width: 340px;" multiple>
      <option value="cookies">\u52A9\u624BCookies</option><option value="tmpData">\u52A9\u624B\u4E34\u65F6\u6570\u636E</option>
    </select>
  </fieldset>
  <fieldset style="margin-top: 5px;">
    <legend>\u8BF7\u9009\u62E9\u60F3\u6E05\u9664\u7684\u8BBE\u7F6E\u6216\u65E5\u5FD7\uFF08\u6309<b>Ctrl\u952E</b>\u6216<b>Shift\u952E</b>\u53EF\u591A\u9009\uFF09\uFF1A</legend>
    <select name="settingsAndLogs" size="5" style="width: 340px;" multiple>
      <option value="config">\u52A9\u624B\u8BBE\u7F6E</option><option value="log">\u52A9\u624B\u65E5\u5FD7</option>
      <option value="armsInfo">\u88C5\u5907\u4FE1\u606F</option><option value="buyThreadLog">\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55</option>
    </select>
  </fieldset>
</div>
<div class="pd_cfg_btns">
  <button type="submit" style="color: #f00;">\u6E05\u9664\u6570\u636E</button>
  <button data-action="close" type="button">\u53D6\u6D88</button>
</div>`;
        let $dialog2 = create(dialogName2, "\u6E05\u9664\u6570\u636E", html2);
        $dialog2.on("keydown", "select", (function(e) {
          if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            $(this).children().prop("selected", true);
          }
        })).submit(function(e) {
          e.preventDefault();
          let caches = $dialog2.find('[name="caches"]').val();
          let settingsAndLogs = $dialog2.find('[name="settingsAndLogs"]').val();
          if (!caches && !settingsAndLogs || !confirm("\u662F\u5426\u6E05\u9664\u9009\u5B9A\u7684\u6570\u636E\uFF1F")) return;
          caches = caches ? caches : [];
          settingsAndLogs = settingsAndLogs ? settingsAndLogs : [];
          for (let name4 of caches) {
            clearData(name4);
          }
          for (let name4 of settingsAndLogs) {
            clearData(name4);
          }
          alert("\u9009\u5B9A\u7684\u6570\u636E\u5DF2\u6E05\u9664");
          location.reload();
        });
        show2(dialogName2);
        runFunc("ConfigDialog.showClearDataDialog_after_");
      };
      showRunCommandDialog = function() {
        const dialogName2 = "pdRunCommandDialog";
        if ($("#" + dialogName2).length > 0) return;
        close("pdConfigDialog");
        let html2 = `
<div class="pd_cfg_main">
  <div style="margin: 5px 0;">
    \u8FD0\u884C\u547D\u4EE4\u5FEB\u6377\u952E\uFF1A<b>Ctrl+Enter</b>\uFF1B\u6E05\u9664\u547D\u4EE4\u5FEB\u6377\u952E\uFF1A<b>Ctrl+\u9000\u683C\u952E</b><br>
    \u6309<b>F12\u952E</b>\u53EF\u6253\u5F00\u6D4F\u89C8\u5668\u63A7\u5236\u53F0\u67E5\u770B\u6D88\u606F\uFF08\u9700\u5207\u6362\u81F3\u63A7\u5236\u53F0\u6216Console\u6807\u7B7E\uFF09
  </div>
  <textarea name="cmd" wrap="off" style="width: 750px; height: 300px; white-space: pre;"></textarea>
</div>
<div class="pd_cfg_btns">
  <button type="submit">\u8FD0\u884C</button>
  <button name="clear" type="button">\u6E05\u9664</button>
  <button data-action="close" type="button">\u5173\u95ED</button>
</div>`;
        let $dialog2 = create(dialogName2, "\u8FD0\u884C\u547D\u4EE4", html2);
        let $cmd = $dialog2.find('[name="cmd"]');
        $dialog2.submit(function(e) {
          e.preventDefault();
          let content = $cmd.val();
          if (content) runCmd(content, true);
        }).end().find('[name="clear"]').click(function() {
          $cmd.val("").focus();
        });
        $cmd.keydown(function(e) {
          if (e.ctrlKey && e.keyCode === 13) {
            $dialog2.submit();
          } else if (e.ctrlKey && e.keyCode === 8) {
            $dialog2.find('[name="clear"]').click();
          }
        });
        show2(dialogName2);
        $cmd.focus();
      };
      showImportOrExportSettingDialog = function() {
        const dialogName2 = "pdImOrExSettingDialog";
        if ($("#" + dialogName2).length > 0) return;
        read3();
        let html2 = `
<div class="pd_cfg_main">
  <div>
    <strong>\u5BFC\u5165\u8BBE\u7F6E\uFF1A</strong>\u5C06\u8BBE\u7F6E\u5185\u5BB9\u7C98\u8D34\u5230\u6587\u672C\u6846\u4E2D\u5E76\u70B9\u51FB\u4FDD\u5B58\u6309\u94AE\u5373\u53EF<br>
    <strong>\u5BFC\u51FA\u8BBE\u7F6E\uFF1A</strong>\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u522B\u5904\u5373\u53EF
  </div>
  <textarea name="setting" style="width: 600px; height: 400px; word-break: break-all;"></textarea>
</div>
<div class="pd_cfg_btns">
  <button type="submit">\u4FDD\u5B58</button>
  <button data-action="close" type="button">\u53D6\u6D88</button>
</div>`;
        let $dialog2 = create(dialogName2, "\u5BFC\u5165\u6216\u5BFC\u51FA\u8BBE\u7F6E", html2);
        let $setting = $dialog2.find('[name="setting"]');
        $dialog2.submit(function(e) {
          e.preventDefault();
          if (!confirm("\u662F\u5426\u5BFC\u5165\u6587\u672C\u6846\u4E2D\u7684\u8BBE\u7F6E\uFF1F")) return;
          let options = $.trim($setting.val());
          if (!options) return;
          try {
            options = JSON.parse(options);
          } catch (ex) {
            alert("\u8BBE\u7F6E\u6709\u9519\u8BEF");
            return;
          }
          if (!options || $.type(options) !== "object") {
            alert("\u8BBE\u7F6E\u6709\u9519\u8BEF");
            return;
          }
          options = normalize(options);
          Info_default.w.Config = $.extend(true, {}, Config2, options);
          write3();
          alert("\u8BBE\u7F6E\u5DF2\u5BFC\u5165");
          location.reload();
        });
        show2(dialogName2);
        $setting.val(JSON.stringify(getDifferenceSetOfObject(Config2, Config))).select().focus();
      };
      showCustomCssDialog = function() {
        const dialogName2 = "pdCustomCssDialog";
        if ($("#" + dialogName2).length > 0) return;
        let html2 = `
<div class="pd_cfg_main">
  <strong>\u81EA\u5B9A\u4E49CSS\u5185\u5BB9\uFF1A</strong><br>
  <textarea name="customCssContent" wrap="off" style="width: 750px; height: 400px; white-space: pre;"></textarea>
</div>
<div class="pd_cfg_btns">
  <span class="pd_cfg_about"><a target="_blank" href="read.php?tid=500969&sf=206">CSS\u89C4\u5219\u6536\u96C6\u8D34</a></span>
  <button type="submit">\u4FDD\u5B58</button>
  <button data-action="close" type="button">\u53D6\u6D88</button>
</div>`;
        let $dialog2 = create(dialogName2, "\u81EA\u5B9A\u4E49CSS", html2);
        let $content = $dialog2.find('[name="customCssContent"]');
        $dialog2.submit(function(e) {
          e.preventDefault();
          Config.customCssContent = $.trim($content.val());
          write3();
          close(dialogName2);
          alert("\u81EA\u5B9A\u4E49CSS\u4FEE\u6539\u6210\u529F\uFF08\u9700\u5237\u65B0\u9875\u9762\u540E\u624D\u53EF\u751F\u6548\uFF09");
        });
        $content.val(Config.customCssContent);
        show2(dialogName2);
        $content.focus();
      };
      showUserMemoDialog = function() {
        const dialogName2 = "pdUserMemoDialog";
        if ($("#" + dialogName2).length > 0) return;
        let html2 = `
<div class="pd_cfg_main">
  \u6309\u7167\u201C\u7528\u6237\u540D:\u5907\u6CE8\u201D\u7684\u683C\u5F0F\uFF08\u6CE8\u610F\u662F\u82F1\u6587\u5192\u53F7\uFF09\uFF0C\u6BCF\u884C\u4E00\u4E2A<br>
  <textarea name="userMemoList" wrap="off" style="width: 320px; height: 400px; white-space: pre;"></textarea>
</div>
<div class="pd_cfg_btns">
  <button type="submit">\u4FDD\u5B58</button>
  <button data-action="close" type="button">\u53D6\u6D88</button>
</div>`;
        let $dialog2 = create(dialogName2, "\u7528\u6237\u5907\u6CE8", html2);
        let $userMemoList = $dialog2.find('[name="userMemoList"]');
        $dialog2.submit(function(e) {
          e.preventDefault();
          let content2 = $.trim($userMemoList.val());
          Config.userMemoList = {};
          for (let line of content2.split("\n")) {
            line = $.trim(line);
            if (!line) continue;
            if (!/.+?:.+/.test(line)) {
              alert("\u7528\u6237\u5907\u6CE8\u683C\u5F0F\u4E0D\u6B63\u786E");
              $userMemoList.focus();
              return;
            }
            let [user, memo = ""] = line.split(":");
            if (!memo) continue;
            Config.userMemoList[user.trim()] = memo.trim();
          }
          write3();
          close(dialogName2);
        });
        let content = "";
        for (let [user, memo] of entries(Config.userMemoList)) {
          content += `${user}:${memo}
`;
        }
        $userMemoList.val(content);
        show2(dialogName2);
        $userMemoList.focus();
      };
      showFollowUserDialog = function() {
        const dialogName2 = "pdFollowUserDialog";
        if ($("#" + dialogName2).length > 0) return;
        let html2 = `
<div class="pd_cfg_main">
  <div style="margin-top: 5px;">
    <label>
      <input name="highlightFollowUserThreadInHpEnabled" type="checkbox"> \u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u7684\u9996\u9875\u5E16\u5B50\u94FE\u63A5
      <span class="pd_cfg_tips" title="\u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u5728\u9996\u9875\u4E0B\u7684\u5E16\u5B50\u94FE\u63A5">[?]</span>
    </label><br>
    <label>
      <input name="highlightFollowUserThreadLinkEnabled" type="checkbox"> \u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u7684\u5E16\u5B50\u94FE\u63A5
      <span class="pd_cfg_tips" title="\u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u5728\u7248\u5757\u9875\u9762\u4E0B\u7684\u5E16\u5B50\u94FE\u63A5">[?]</span>
    </label><br>
    <label>
      <input name="highlightFollowUserFloorEnabled" type="checkbox"> \u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u7684\u697C\u5C42
      <span class="pd_cfg_tips" title="\u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u5728\u5E16\u5B50\u9875\u9762\u4E0B\u7684\u697C\u5C42\u7684\u8FB9\u6846">[?]</span>
    </label><br>
  </div>
  <ul id="pdFollowUserList" style="margin-top: 5px; min-width: 274px; line-height: 24px;"></ul>
  <div style="margin-top: 5px;">
    <div style="display: inline-block;">
      <a class="pd_btn_link" data-name="selectAll" href="#">\u5168\u9009</a>
      <a class="pd_btn_link" data-name="selectInverse" href="#">\u53CD\u9009</a>
    </div>
    <div style="float: right;">
      <a class="pd_btn_link" data-name="deleteSelect" href="#">\u5220\u9664</a>
    </div>
  </div>
  <div style="margin-top: 5px;" title="\u6DFB\u52A0\u591A\u4E2A\u7528\u6237\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694">
    <input name="addFollowUser" style="width: 200px;" type="text">
    <a class="pd_btn_link" data-name="add" href="#">\u6DFB\u52A0</a>
  </div>
</div>
<div class="pd_cfg_btns">
  <span class="pd_cfg_about"><a data-name="openImOrExFollowUserListDialog" href="#">\u5BFC\u5165/\u5BFC\u51FA\u5173\u6CE8\u7528\u6237</a></span>
  <button type="submit">\u4FDD\u5B58</button>
  <button data-action="close" type="button">\u53D6\u6D88</button>
</div>`;
        let $dialog2 = create(dialogName2, "\u5173\u6CE8\u7528\u6237", html2);
        let $followUserList = $dialog2.find("#pdFollowUserList");
        const addFollowUser = function(name4) {
          $(`
<li>
  <input type="checkbox">
  <input name="username" type="text" style="width: 178px; margin-left: 5px;" maxlength="15" value="${name4}">
  <a class="pd_btn_link" data-name="delete" href="#">\u5220\u9664</a>
</li>
`).appendTo($followUserList);
        };
        $dialog2.submit(function(e) {
          e.preventDefault();
          Config.highlightFollowUserThreadInHPEnabled = $dialog2.find('[name="highlightFollowUserThreadInHpEnabled"]').prop("checked");
          Config.highlightFollowUserThreadLinkEnabled = $dialog2.find('[name="highlightFollowUserThreadLinkEnabled"]').prop("checked");
          Config.highlightFollowUserFloorEnabled = $dialog2.find('[name="highlightFollowUserFloorEnabled"]').prop("checked");
          Config.followUserList = [];
          $followUserList.find("li").each(function() {
            let $this2 = $(this);
            let name4 = $.trim($this2.find('[name="username"]').val());
            if (name4 !== "" && inFollowOrBlockUserList(name4, Config.followUserList) === -1) {
              Config.followUserList.push({ name: name4 });
            }
          });
          write3();
          close(dialogName2);
        });
        $followUserList.on("click", '[data-name="delete"]', function(e) {
          e.preventDefault();
          $(this).parent().remove();
        });
        $dialog2.find('[data-name="selectAll"]').click(() => selectAll($followUserList.find('[type="checkbox"]'))).end().find('[data-name="selectInverse"]').click(() => selectInverse($followUserList.find('[type="checkbox"]'))).end().find('[data-name="deleteSelect"]').click(function(e) {
          e.preventDefault();
          let $checked = $followUserList.find('li:has([type="checkbox"]:checked)');
          if (!$checked.length) return;
          if (confirm("\u662F\u5426\u5220\u9664\u6240\u9009\u7528\u6237\uFF1F")) {
            $checked.remove();
            resize(dialogName2);
          }
        });
        $dialog2.find('[name="addFollowUser"]').keydown(function(e) {
          if (e.keyCode === 13) {
            e.preventDefault();
            $(this).next("a").click();
          }
        }).end().find('[data-name="add"]').click(function(e) {
          e.preventDefault();
          for (let name4 of $.trim($dialog2.find('[name="addFollowUser"]').val()).split(",")) {
            name4 = $.trim(name4);
            if (!name4) continue;
            if (inFollowOrBlockUserList(name4, Config.followUserList) === -1) {
              addFollowUser(name4);
            }
          }
          $dialog2.find('[name="addFollowUser"]').val("");
          resize(dialogName2);
        }).end().find('[data-name="openImOrExFollowUserListDialog"]').click(function(e) {
          e.preventDefault();
          showCommonImportOrExportConfigDialog("\u5173\u6CE8\u7528\u6237", "followUserList");
        });
        $dialog2.find('[name="highlightFollowUserThreadInHpEnabled"]').prop("checked", Config.highlightFollowUserThreadInHPEnabled);
        $dialog2.find('[name="highlightFollowUserThreadLinkEnabled"]').prop("checked", Config.highlightFollowUserThreadLinkEnabled);
        $dialog2.find('[name="highlightFollowUserFloorEnabled"]').prop("checked", Config.highlightFollowUserFloorEnabled);
        for (let user of Config.followUserList) {
          addFollowUser(user.name);
        }
        show2(dialogName2);
      };
      showBlockUserDialog = function() {
        const dialogName2 = "pdBlockUserDialog";
        if ($("#" + dialogName2).length > 0) return;
        let html2 = `
<div class="pd_cfg_main">
  <div style="margin-top: 5px; line-height: 24px;">
    <label>
      \u9ED8\u8BA4\u5C4F\u853D\u7C7B\u578B
      <select name="blockUserDefaultType">
        <option value="0">\u5C4F\u853D\u4E3B\u9898\u548C\u56DE\u5E16</option><option value="1">\u4EC5\u5C4F\u853D\u4E3B\u9898</option><option value="2">\u4EC5\u5C4F\u853D\u56DE\u5E16</option>
      </select>
    </label>
    <label class="pd_cfg_ml">
      <input name="blockUserAtTipsEnabled" type="checkbox"> \u5C4F\u853D@\u63D0\u9192 <span class="pd_cfg_tips" title="\u5C4F\u853D\u88AB\u5C4F\u853D\u7528\u6237\u7684@\u63D0\u9192">[?]</span>
    </label><br>
    <label>\u7248\u5757\u5C4F\u853D\u8303\u56F4
      <select name="blockUserForumType">
        <option value="0">\u6240\u6709\u7248\u5757</option><option value="1">\u5305\u62EC\u6307\u5B9A\u7248\u5757</option><option value="2">\u6392\u9664\u6307\u5B9A\u7248\u5757</option>
      </select>
    </label><br>
    <label>\u7248\u5757ID\u5217\u8868
      <input name="blockUserFidList" type="text" style="width: 220px;"> 
      <span class="pd_cfg_tips" title="\u7248\u5757URL\u4E2D\u7684fid\u53C2\u6570\uFF0C\u591A\u4E2AID\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694">[?]</span>
    </label>
  </div>
  <ul id="pdBlockUserList" style="margin-top: 5px; min-width: 362px; line-height: 24px;"></ul>
  <div style="margin-top: 5px;">
    <div style="display: inline-block;">
      <a class="pd_btn_link" data-name="selectAll" href="#">\u5168\u9009</a>
      <a class="pd_btn_link" data-name="selectInverse" href="#">\u53CD\u9009</a>
    </div>
    <div style="float: right;">
      <a class="pd_btn_link" data-name="modify" href="#">\u4FEE\u6539\u4E3A</a>
      <select>
        <option value="0">\u5C4F\u853D\u4E3B\u9898\u548C\u56DE\u5E16</option><option value="1">\u4EC5\u5C4F\u853D\u4E3B\u9898</option><option value="2">\u4EC5\u5C4F\u853D\u56DE\u5E16</option>
      </select>
      <a class="pd_btn_link" data-name="deleteSelect" href="#">\u5220\u9664</a>
    </div>
  </div>
  <div style="margin-top: 5px;" title="\u6DFB\u52A0\u591A\u4E2A\u7528\u6237\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694">
    <input name="addBlockUser" style="width: 200px;" type="text">
    <a class="pd_btn_link" data-name="add" href="#">\u6DFB\u52A0</a>
  </div>
</div>
<div class="pd_cfg_btns">
  <span class="pd_cfg_about"><a data-name="openImOrExBlockUserListDialog" href="#">\u5BFC\u5165/\u5BFC\u51FA\u5C4F\u853D\u7528\u6237</a></span>
  <button type="submit">\u4FDD\u5B58</button>
  <button data-action="close" type="button">\u53D6\u6D88</button>
</div>`;
        let $dialog2 = create(dialogName2, "\u5C4F\u853D\u7528\u6237", html2);
        let $blockUserList = $dialog2.find("#pdBlockUserList");
        const addBlockUser = function(name4, type) {
          $(`
<li>
  <input type="checkbox">
  <input name="username" type="text" style="width: 150px; margin-left: 5px;" maxlength="15" value="${name4}">
  <select name="blockType" style="margin-left: 5px;">
    <option value="0">\u5C4F\u853D\u4E3B\u9898\u548C\u56DE\u5E16</option><option value="1">\u4EC5\u5C4F\u853D\u4E3B\u9898</option><option value="2">\u4EC5\u5C4F\u853D\u56DE\u5E16</option>
  </select>
  <a class="pd_btn_link" data-name="delete" href="#">\u5220\u9664</a>
</li>`).appendTo($blockUserList).find('[name="blockType"]').val(type);
        };
        $dialog2.submit(function(e) {
          e.preventDefault();
          Config.blockUserDefaultType = parseInt($dialog2.find('[name="blockUserDefaultType"]').val());
          Config.blockUserAtTipsEnabled = $dialog2.find('[name="blockUserAtTipsEnabled"]').prop("checked");
          Config.blockUserForumType = parseInt($dialog2.find('[name="blockUserForumType"]').val());
          let blockUserFidList = /* @__PURE__ */ new Set();
          for (let fid2 of $.trim($dialog2.find('[name="blockUserFidList"]').val()).split(",")) {
            fid2 = parseInt(fid2);
            if (!isNaN(fid2) && fid2 > 0) blockUserFidList.add(fid2);
          }
          Config.blockUserFidList = [...blockUserFidList];
          Config.blockUserList = [];
          $blockUserList.find("li").each(function() {
            let $this2 = $(this);
            let name4 = $.trim($this2.find('[name="username"]').val());
            if (name4 !== "" && inFollowOrBlockUserList(name4, Config.blockUserList) === -1) {
              let type = parseInt($this2.find('[name="blockType"]').val());
              Config.blockUserList.push({ name: name4, type });
            }
          });
          write3();
          close(dialogName2);
        });
        $blockUserList.on("click", '[data-name="delete"]', function(e) {
          e.preventDefault();
          $(this).parent().remove();
        });
        $dialog2.find('[data-name="selectAll"]').click(() => selectAll($blockUserList.find('input[type="checkbox"]'))).end().find('[data-name="selectInverse"]').click(() => selectInverse($blockUserList.find('input[type="checkbox"]'))).end().find('[data-name="modify"]').click(function(e) {
          e.preventDefault();
          let value = $(this).next("select").val();
          $blockUserList.find('li:has([type="checkbox"]:checked) > select').val(value);
        }).end().find('[data-name="deleteSelect"]').click(function(e) {
          e.preventDefault();
          let $checked = $blockUserList.find('li:has([type="checkbox"]:checked)');
          if (!$checked.length) return;
          if (confirm("\u662F\u5426\u5220\u9664\u6240\u9009\u7528\u6237\uFF1F")) {
            $checked.remove();
            resize(dialogName2);
          }
        });
        $dialog2.find('[name="addBlockUser"]').keydown(function(e) {
          if (e.keyCode === 13) {
            e.preventDefault();
            $(this).next("a").click();
          }
        }).end().find('[data-name="add"]').click(function(e) {
          e.preventDefault();
          let type = parseInt($dialog2.find('[name="blockUserDefaultType"]').val());
          for (let name4 of $.trim($dialog2.find('[name="addBlockUser"]').val()).split(",")) {
            name4 = $.trim(name4);
            if (!name4) continue;
            if (inFollowOrBlockUserList(name4, Config.blockUserList) === -1) {
              addBlockUser(name4, type);
            }
          }
          $dialog2.find('[name="addBlockUser"]').val("");
          resize(dialogName2);
        }).end().find('[name="blockUserForumType"]').change(function() {
          $dialog2.find('[name="blockUserFidList"]').prop("disabled", parseInt($(this).val()) === 0);
        }).end().find('[data-name="openImOrExBlockUserListDialog"]').click(function(e) {
          e.preventDefault();
          showCommonImportOrExportConfigDialog("\u5C4F\u853D\u7528\u6237", "blockUserList");
        });
        $dialog2.find('[name="blockUserDefaultType"]').val(Config.blockUserDefaultType);
        $dialog2.find('[name="blockUserAtTipsEnabled"]').prop("checked", Config.blockUserAtTipsEnabled);
        $dialog2.find('[name="blockUserForumType"]').val(Config.blockUserForumType).triggerHandler("change");
        $dialog2.find('[name="blockUserFidList"]').val(Config.blockUserFidList.join(","));
        for (let user of Config.blockUserList) {
          addBlockUser(user.name, user.type);
        }
        show2(dialogName2);
      };
      showBlockThreadDialog = function() {
        const dialogName = "pdBlockThreadDialog";
        if ($("#" + dialogName).length > 0) return;
        let html = `
<div class="pd_cfg_main">
  <div style="border-bottom: 1px solid #9191ff; margin-bottom: 7px; padding-bottom: 5px;">
    \u6807\u9898\u5173\u952E\u5B57\u53EF\u4F7F\u7528\u666E\u901A\u5B57\u7B26\u4E32\u6216\u6B63\u5219\u8868\u8FBE\u5F0F\uFF0C\u6B63\u5219\u8868\u8FBE\u5F0F\u8BF7\u4F7F\u7528<code>/abc/</code>\u7684\u683C\u5F0F\uFF0C\u4F8B\uFF1A<code>/\u5173\u952E\u5B57A.*\u5173\u952E\u5B57B/i</code><br>
    \u7528\u6237\u540D\u548C\u7248\u5757ID\u4E3A\u53EF\u9009\u9879\uFF08\u591A\u4E2A\u7528\u6237\u540D\u6216\u7248\u5757ID\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694\uFF09<br>
    <label>
      \u9ED8\u8BA4\u7248\u5757\u5C4F\u853D\u8303\u56F4
      <select name="blockThreadDefForumType">
        <option value="0">\u6240\u6709\u7248\u5757</option><option value="1">\u5305\u62EC\u6307\u5B9A\u7248\u5757</option><option value="2">\u6392\u9664\u6307\u5B9A\u7248\u5757</option>
      </select>
    </label>
    <label style="margin-left: 5px;">\u9ED8\u8BA4\u7248\u5757ID\u5217\u8868 <input name="blockThreadDefFidList" type="text" style="width: 150px;"></label>
  </div>
  <table id="pdBlockThreadList" style="line-height: 22px; text-align: center;">
    <tbody>
      <tr>
        <th style="width: 220px;">\u6807\u9898\u5173\u952E\u5B57(\u5FC5\u586B)</th>
        <th style="width: 62px;">\u5C4F\u853D\u7528\u6237</th>
        <th style="width: 200px;">\u7528\u6237\u540D <span class="pd_cfg_tips" title="\u591A\u4E2A\u7528\u6237\u540D\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694">[?]</span></th>
        <th style="width: 62px;">\u5C4F\u853D\u8303\u56F4</th>
        <th style="width: 132px;">\u7248\u5757ID <span class="pd_cfg_tips" title="\u7248\u5757URL\u4E2D\u7684fid\u53C2\u6570\uFF0C\u591A\u4E2AID\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694">[?]</span></th>
        <th style="width: 35px;"></th>
      </tr>
    </tbody>
  </table>
  <div data-name="blockThreadAddBtns" style="margin-top: 5px;">
    <a class="pd_btn_link" data-name="addOne" href="#">\u589E\u52A01\u4E2A</a>
    <a class="pd_btn_link" data-name="addFive" href="#">\u589E\u52A05\u4E2A</a>
    <a class="pd_btn_link pd_highlight" data-name="clear" href="#">\u6E05\u9664\u6240\u6709</a>
  </div>
</div>
<div class="pd_cfg_btns">
  <span class="pd_cfg_about"><a data-name="openImOrExBlockThreadListDialog" href="#">\u5BFC\u5165/\u5BFC\u51FA\u5C4F\u853D\u5E16\u5B50</a></span>
  <button type="submit">\u4FDD\u5B58</button>
  <button data-action="close" type="button">\u53D6\u6D88</button>
</div>`;
        let $dialog = create(dialogName, "\u5C4F\u853D\u5E16\u5B50", html, "width: 768px;");
        let $blockThreadList = $dialog.find("#pdBlockThreadList");
        const addBlockThread = function(keyWord2, userType, userList, fidType, fidList) {
          $(`
<tr>
  <td><input name="keyWord" type="text" style="width: 208px;" value="${keyWord2}"></td>
  <td><select name="userType"><option value="0">\u6240\u6709</option><option value="1">\u5305\u62EC</option><option value="2">\u6392\u9664</option></select></td>
  <td><input name="userList" type="text" style="width: 188px;" value="${userList.join(",")}" ${userType === 0 ? "disabled" : ""}></td>
  <td><select name="fidType"><option value="0">\u6240\u6709</option><option value="1">\u5305\u62EC</option><option value="2">\u6392\u9664</option></select></td>
  <td><input name="fidList" type="text" style="width: 120px;" value="${fidList.join(",")}" ${fidType === 0 ? "disabled" : ""}></td>
  <td><a href="#" data-name="delete">\u5220\u9664</a></td>
</tr>
`).appendTo($blockThreadList).find('[name="userType"]').val(userType).end().find('[name="fidType"]').val(fidType);
        };
        const verify = function() {
          let flag = true;
          $blockThreadList.find("tr:gt(0)").each(function() {
            let $this = $(this);
            let $txtKeyWord = $this.find('[name="keyWord"]');
            let keyWord = $txtKeyWord.val();
            if ($.trim(keyWord) === "") return;
            if (/^\/.+\/[gimuy]*$/.test(keyWord)) {
              try {
                eval(keyWord);
              } catch (ex) {
                alert("\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u6B63\u786E");
                $txtKeyWord.select().focus();
                flag = false;
                return false;
              }
            }
          });
          return flag;
        };
        $dialog.submit(function(e) {
          e.preventDefault();
          if (!verify()) return;
          Config.blockThreadDefForumType = parseInt($dialog.find('[name="blockThreadDefForumType"]').val());
          let blockThreadDefFidList = /* @__PURE__ */ new Set();
          for (let fid2 of $.trim($dialog.find('[name="blockThreadDefFidList"]').val()).split(",")) {
            fid2 = parseInt(fid2);
            if (!isNaN(fid2) && fid2 > 0) blockThreadDefFidList.add(fid2);
          }
          Config.blockThreadDefFidList = [...blockThreadDefFidList];
          Config.blockThreadList = [];
          $blockThreadList.find("tr:gt(0)").each(function() {
            let $this2 = $(this);
            let keyWord2 = $this2.find('[name="keyWord"]').val();
            if ($.trim(keyWord2) === "") return;
            let newObj = { keyWord: keyWord2 };
            let userType = parseInt($this2.find('[name="userType"]').val());
            if (userType > 0) {
              let userList = /* @__PURE__ */ new Set();
              for (let user of $.trim($this2.find('[name="userList"]').val()).split(",")) {
                user = $.trim(user);
                if (user) userList.add(user);
              }
              if (userList.size > 0) newObj[userType === 2 ? "excludeUser" : "includeUser"] = [...userList];
            }
            let fidType = parseInt($this2.find('[name="fidType"]').val());
            if (fidType > 0) {
              let fidList = /* @__PURE__ */ new Set();
              for (let fid2 of $.trim($this2.find('[name="fidList"]').val()).split(",")) {
                fid2 = parseInt(fid2);
                if (!isNaN(fid2) && fid2 > 0) fidList.add(fid2);
              }
              if (fidList.size > 0) newObj[fidType === 2 ? "excludeFid" : "includeFid"] = [...fidList];
            }
            Config.blockThreadList.push(newObj);
          });
          write3();
          close(dialogName);
        });
        $blockThreadList.on("change", "select", function() {
          let $this2 = $(this);
          $this2.parent("td").next("td").find("input").prop("disabled", parseInt($this2.val()) === 0);
        }).on("click", '[data-name="delete"]', function(e) {
          e.preventDefault();
          $(this).closest("tr").remove();
        });
        $dialog.find('[data-name="addOne"], [data-name="addFive"]').click(function(e) {
          e.preventDefault();
          let num2 = 1;
          if ($(this).is('[data-name="addFive"]')) num2 = 5;
          for (let i = 1; i <= num2; i++) {
            addBlockThread(
              "",
              0,
              [],
              parseInt($dialog.find('[name="blockThreadDefForumType"]').val()),
              $.trim($dialog.find('[name="blockThreadDefFidList"]').val()).split(",")
            );
          }
          resize(dialogName);
        }).end().find('[data-name="clear"]').click(function(e) {
          e.preventDefault();
          if (confirm("\u662F\u5426\u6E05\u9664\u6240\u6709\u5C4F\u853D\u5173\u952E\u5B57\uFF1F")) {
            $blockThreadList.find("tbody > tr:gt(0)").remove();
            resize(dialogName);
          }
        }).end().find('[name="blockThreadDefForumType"]').change(function() {
          $dialog.find('[name="blockThreadDefFidList"]').prop("disabled", parseInt($(this).val()) === 0);
        }).end().find('[data-name="openImOrExBlockThreadListDialog"]').click(function(e) {
          e.preventDefault();
          showCommonImportOrExportConfigDialog("\u5C4F\u853D\u5E16\u5B50", "blockThreadList");
        });
        $dialog.find('[name="blockThreadDefForumType"]').val(Config.blockThreadDefForumType).triggerHandler("change");
        $dialog.find('[name="blockThreadDefFidList"]').val(Config.blockThreadDefFidList.join(","));
        for (let data of Config.blockThreadList) {
          let { keyWord: keyWord2, includeUser: includeUser2, excludeUser: excludeUser2, includeFid: includeFid2, excludeFid: excludeFid2 } = data;
          let userType = 0;
          let userList = [];
          if (typeof includeUser2 !== "undefined") {
            userType = 1;
            userList = includeUser2;
          } else if (typeof excludeUser2 !== "undefined") {
            userType = 2;
            userList = excludeUser2;
          }
          let fidType = 0;
          let fidList = [];
          if (typeof includeFid2 !== "undefined") {
            fidType = 1;
            fidList = includeFid2;
          } else if (typeof excludeFid2 !== "undefined") {
            fidType = 2;
            fidList = excludeFid2;
          }
          addBlockThread(keyWord2, userType, userList, fidType, fidList);
        }
        show2(dialogName);
      };
      showBuyItemTipsDialog = function() {
        const dialogName2 = "pdBuyItemTipsDialog";
        if ($("#" + dialogName2).length > 0) return;
        let html2 = `
<div class="pd_cfg_main">
  <div style="margin: 5px 0;">
    <strong>\u8BBE\u7F6E\u8BF4\u660E\uFF1A</strong><br>
    \u5728\u7269\u54C1ID\u5217\u8868\u586B\u5165\u76F8\u5E94\u7684\u7269\u54C1ID\uFF0C\u53EF\u81EA\u52A8\u8D2D\u4E70\u6240\u9700\u7684\u7269\u54C1\uFF0C\u6BCF\u5929\u6700\u591A\u53EF\u8D2D\u4E70\u4E24\u6B21\u3002<br>
    \uFF08\u5373\uFF1A\u53EA\u8D2D\u4E701\u79CD\u7269\u54C1\u7684\u8BDD\u6700\u591A\u53EF\u8D2D\u4E702\u6B21\uFF1B\u8D2D\u4E702\u79CD\u7269\u54C1\u7684\u8BDD\u6BCF\u79CD\u7269\u54C1\u53EA\u80FD\u8D2D\u4E701\u6B21\uFF0C\u5408\u8BA12\u6B21\uFF09<br>
    <strong>\u5404\u7269\u54C1ID\uFF1A</strong><br>
    <strike><b>\u7B49\u7EA7\u7ECF\u9A8C\u836F\u4E38</b>\uFF1A101\uFF1B<b>\u7B49\u7EA7\u7ECF\u9A8C\u836F\u4E38\uFF08\u86CB\uFF09</b>\uFF1A102\uFF1B</strike><b>\u4FEE\u70BC\u624B\u518C</b>\uFF1A103\u3002<span class="pd_notice">\uFF08\u6CE8\uFF1A\u91CD\u751F\u4E4B\u836F\u8BF7\u624B\u52A8\u8D2D\u4E70\uFF09</span><br>
    <strong>\u683C\u5F0F\uFF1A</strong><br>
    \u4E24\u6B21\u8D2D\u4E70\u4E4B\u95F4\u7684\u7269\u54C1ID\u8BF7\u7528<b>\u82F1\u6587\u9017\u53F7</b>\u5206\u9694\uFF1B\u540C\u4E00\u6B21\u8D2D\u4E70\u7684\u7269\u54C1ID\u5982\u7528<b>\u7AD6\u7EBF</b>\u5206\u9694\uFF0C\u8868\u793A\u524D\u4E00\u79CD\u7269\u54C1\u5982\u8D39\u7528\u4E0D\u8DB3\uFF0C\u53EF\u81EA\u52A8\u66F4\u6362\u4E3A\u8D2D\u4E70\u53E6\u4E00\u79CD\u7269\u54C1\u3002<br>
    <strong>\u4F8B\u5B50\uFF1A</strong><br>
    <b>103</b>\uFF1A\u8868\u793A\u53EA\u8D2D\u4E70\u4E00\u6B21[103]\u7269\u54C1\u3002<br>
    <b>103,101</b>\uFF1A\u8868\u793A\u7B2C1\u6B21\u8D2D\u4E70[103]\u7269\u54C1\uFF0C\u7B2C2\u6B21\u8D2D\u4E70[101]\u7269\u54C1\u3002<br>
    <b>102|101,103|102|101</b>\uFF1A\u8868\u793A\u7B2C1\u6B21\u5148\u5C1D\u8BD5\u8D2D\u4E70[102]\u7269\u54C1\uFF0C\u5982\u8D39\u7528\u4E0D\u8DB3\u5219\u8D2D\u4E70[101]\u7269\u54C1\uFF1B\u7B2C2\u6B21\u5148\u5C1D\u8BD5\u8D2D\u4E70[103]\u7269\u54C1\uFF0C\u5982\u8D39\u7528\u4E0D\u8DB3\u5219\u8D2D\u4E70[102]\u7269\u54C1\uFF0C\u4F9D\u7136\u4E0D\u8DB3\u5219\u8D2D\u4E70[101]\u7269\u54C1\u3002<br>
  </div>
</div>`;
        create(dialogName2, "\u81EA\u52A8\u8D2D\u4E70\u7269\u54C1\u8BE6\u7EC6\u8BF4\u660E", html2, "max-width: 600px;");
        show2(dialogName2);
      };
    }
  });

  // src/module/LogDialog.js
  var show4, showLogContent, getLogContent, showLogStat, getLogStat, showImportOrExportLogDialog, showLogText;
  var init_LogDialog = __esm({
    "src/module/LogDialog.js"() {
      "use strict";
      init_Util();
      init_Dialog();
      init_Config();
      init_Log();
      init_Item();
      init_Read();
      init_Script();
      show4 = function() {
        const dialogName2 = "pdLogDialog";
        if ($("#" + dialogName2).length > 0) return;
        read3();
        runFunc("LogDialog.show_before_");
        let html2 = `
<div class="pd_cfg_main">
  <div class="pd_log_nav">
    <a class="pd_disabled_link" data-name="start" href="#">&lt;&lt;</a>
    <a class="pd_disabled_link" data-name="prev" href="#" style="padding: 0 7px;">&lt;</a>
    <h2 class="pd_log_date pd_custom_tips">\u6682\u65E0\u65E5\u5FD7</h2>
    <a class="pd_disabled_link" data-name="next" href="#" style="padding: 0 7px;">&gt;</a>
    <a class="pd_disabled_link" data-name="end" href="#">&gt;&gt;</a>
  </div>
  <fieldset>
    <legend>\u65E5\u5FD7\u5185\u5BB9</legend>
    <div>
      <strong>\u6392\u5E8F\u65B9\u5F0F\uFF1A</strong>
      <label title="\u6309\u65F6\u95F4\u987A\u5E8F\u6392\u5E8F"><input type="radio" name="sortType" value="time" checked> \u6309\u65F6\u95F4</label>
      <label title="\u6309\u65E5\u5FD7\u7C7B\u522B\u6392\u5E8F"><input type="radio" name="sortType" value="type"> \u6309\u7C7B\u522B</label>
    </div>
    <div class="pd_stat pd_log_content">\u6682\u65E0\u65E5\u5FD7</div>
  </fieldset>
  <fieldset>
    <legend>\u7EDF\u8BA1\u7ED3\u679C</legend>
    <div>
      <strong>\u7EDF\u8BA1\u8303\u56F4\uFF1A</strong>
      <label title="\u663E\u793A\u5F53\u5929\u7684\u7EDF\u8BA1\u7ED3\u679C"><input type="radio" name="statType" value="current" checked> \u5F53\u5929</label>
      <label title="\u663E\u793A\u8DDD\u8BE5\u65E5N\u5929\u5185\u7684\u7EDF\u8BA1\u7ED3\u679C"><input type="radio" name="statType" value="custom"></label>
      <label title="\u663E\u793A\u8DDD\u8BE5\u65E5N\u5929\u5185\u7684\u7EDF\u8BA1\u7ED3\u679C"><input name="statDays" type="text" style="width: 22px;" maxlength="3"> \u5929\u5185</label>
      <label title="\u663E\u793A\u5168\u90E8\u7EDF\u8BA1\u7ED3\u679C"><input type="radio" name="statType" value="all"> \u5168\u90E8</label>
    </div>
    <div class="pd_stat" data-name="stat">\u6682\u65E0\u65E5\u5FD7</div>
  </fieldset>
</div>
<div class="pd_cfg_btns">
  <span class="pd_cfg_about">
    <a class="pd_btn_link" data-name="openImOrExLogDialog" href="#">\u5BFC\u5165/\u5BFC\u51FA\u65E5\u5FD7</a>
    <a class="pd_btn_link" data-name="openBuyThreadLogDialog" href="#">\u67E5\u770B\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55</a>
  </span>
  <button data-action="close" type="button">\u5173\u95ED</button>
  <button name="clear" type="button">\u6E05\u9664\u65E5\u5FD7</button>
</div>`;
        let $dialog2 = create(dialogName2, "KFOL\u52A9\u624B\u65E5\u5FD7", html2, "width: 880px;");
        let $logNav = $dialog2.find(".pd_log_nav");
        let log2 = read();
        let dateList = [];
        let curIndex = 0;
        if (!$.isEmptyObject(log2)) {
          dateList = getObjectKeyList(log2, 1);
          curIndex = dateList.length - 1;
          $logNav.find(".pd_log_date").attr("title", `\u603B\u5171\u8BB0\u5F55\u4E86${dateList.length}\u5929\u7684\u65E5\u5FD7`).text(dateList[curIndex]);
          if (dateList.length > 1) {
            $logNav.find('[data-name="start"]').attr("title", dateList[0]).removeClass("pd_disabled_link");
            $logNav.find('[data-name="prev"]').attr("title", dateList[curIndex - 1]).removeClass("pd_disabled_link");
          }
        }
        $logNav.on("click", "a[data-name]", function(e) {
          e.preventDefault();
          let $this2 = $(this);
          if ($this2.hasClass("pd_disabled_link")) return;
          let name4 = $this2.data("name");
          if (name4 === "start") {
            curIndex = 0;
          } else if (name4 === "prev") {
            if (curIndex > 0) curIndex--;
            else return;
          } else if (name4 === "next") {
            if (curIndex < dateList.length - 1) curIndex++;
            else return;
          } else if (name4 === "end") {
            curIndex = dateList.length - 1;
          }
          $logNav.find(".pd_log_date").text(dateList[curIndex]);
          showLogContent(log2, dateList[curIndex], $dialog2);
          showLogStat(log2, dateList[curIndex], $dialog2);
          if (curIndex > 0) {
            $logNav.find('[data-name="start"]').attr("title", dateList[0]).removeClass("pd_disabled_link");
            $logNav.find('[data-name="prev"]').attr("title", dateList[curIndex - 1]).removeClass("pd_disabled_link");
          } else {
            $logNav.find('[data-name="start"], [data-name="prev"]').removeAttr("title").addClass("pd_disabled_link");
          }
          if (curIndex < dateList.length - 1) {
            $logNav.find('[data-name="next"]').attr("title", dateList[curIndex + 1]).removeClass("pd_disabled_link");
            $logNav.find('[data-name="end"]').attr("title", dateList[dateList.length - 1]).removeClass("pd_disabled_link");
          } else {
            $logNav.find('[data-name="next"], [data-name="end"]').removeAttr("title").addClass("pd_disabled_link");
          }
        });
        $dialog2.find('[name="sortType"]').click(function() {
          let value = $(this).val();
          if (Config.logSortType !== value) {
            Config.logSortType = value;
            write3();
            showLogContent(log2, dateList[curIndex], $dialog2);
          }
        }).end().find('[name="statType"]').click(function() {
          let value = $(this).val();
          if (Config.logStatType !== value) {
            Config.logStatType = value;
            write3();
            showLogStat(log2, dateList[curIndex], $dialog2);
          }
        }).end().find('[name="statDays"]').keyup(function() {
          let days = parseInt($(this).val());
          if (days > 0 && Config.logStatDays !== days) {
            Config.logStatDays = days;
            write3();
            $dialog2.find('[name="statType"][value="custom"]:not(:checked)').click();
            showLogStat(log2, dateList[curIndex], $dialog2);
          }
        }).end().find(`[name="sortType"][value="${Config.logSortType}"]`).click().end().find(`[name="statType"][value="${Config.logStatType}"]`).click().end().find('[name="statDays"]').val(Config.logStatDays);
        $dialog2.find('[name="clear"]').click(function(e) {
          e.preventDefault();
          if (confirm("\u662F\u5426\u6E05\u9664\u6240\u6709\u65E5\u5FD7\uFF1F")) {
            clear();
            alert("\u65E5\u5FD7\u5DF2\u6E05\u9664");
            location.reload();
          }
        }).end().find('[data-name="openImOrExLogDialog"]').click(function(e) {
          e.preventDefault();
          showImportOrExportLogDialog();
        }).end().find('[data-name="openBuyThreadLogDialog"]').click(function(e) {
          e.preventDefault();
          showBuyThreadLogDialog();
        });
        showLogContent(log2, dateList[curIndex], $dialog2);
        showLogStat(log2, dateList[curIndex], $dialog2);
        if ($(window).height() <= 750) $dialog2.find(".pd_log_content").css("height", "192px");
        show2(dialogName2);
        runFunc("LogDialog.show_after_");
      };
      showLogContent = function(log2, date, $dialog2) {
        if (!Array.isArray(log2[date])) return;
        $dialog2.find(".pd_log_content").html(getLogContent(log2, date, Config.logSortType)).parent().find("legend:first-child").text(`\u65E5\u5FD7\u5185\u5BB9 (\u5171${log2[date].length}\u9879)`);
      };
      getLogContent = function(log2, date, logSortType) {
        let logList2 = log2[date];
        if (logSortType === "type") {
          const sortTypeList = [
            "\u9886\u53D6\u6BCF\u65E5\u5956\u52B1",
            "\u63D0\u5347\u6218\u529B\u5149\u73AF",
            "\u4E89\u593A\u653B\u51FB",
            "\u6350\u6B3E",
            "\u9886\u53D6\u4E89\u593A\u5956\u52B1",
            "\u6279\u91CF\u653B\u51FB",
            "\u8BD5\u63A2\u653B\u51FB",
            "\u62BD\u53D6\u795E\u79D8\u76D2\u5B50",
            "\u62BD\u53D6\u9053\u5177\u6216\u5361\u7247",
            "\u6253\u5F00\u76D2\u5B50",
            "\u8D2D\u4E70\u7269\u54C1",
            "\u4F7F\u7528\u9053\u5177",
            "\u6062\u590D\u9053\u5177",
            "\u5FAA\u73AF\u4F7F\u7528\u9053\u5177",
            "\u5C06\u9053\u5177\u8F6C\u6362\u4E3A\u80FD\u91CF",
            "\u5C06\u5361\u7247\u8F6C\u6362\u4E3AVIP\u65F6\u95F4",
            "\u8D2D\u4E70\u9053\u5177",
            "\u7EDF\u8BA1\u9053\u5177\u8D2D\u4E70\u4EF7\u683C",
            "\u51FA\u552E\u9053\u5177",
            "\u7194\u70BC\u88C5\u5907",
            "\u795E\u79D8\u62BD\u5956",
            "\u7EDF\u8BA1\u795E\u79D8\u62BD\u5956\u7ED3\u679C",
            "\u795E\u79D8\u7B49\u7EA7\u5347\u7EA7",
            "\u795E\u79D8\u7CFB\u6570\u6392\u540D\u53D8\u5316",
            "\u6279\u91CF\u8F6C\u8D26",
            "\u8D2D\u4E70\u5E16\u5B50",
            "\u81EA\u52A8\u5B58\u6B3E"
          ];
          logList2.sort((a, b) => sortTypeList.indexOf(a.type) > sortTypeList.indexOf(b.type) ? 1 : -1);
        } else {
          logList2.sort((a, b) => a.time > b.time ? 1 : -1);
        }
        let content = "", curType = "";
        for (let { time, type, action, gain, pay } of logList2) {
          if (typeof time === "undefined" || typeof type === "undefined" || typeof action === "undefined") continue;
          let d = new Date(time);
          if (logSortType === "type") {
            if (curType !== type) {
              content += `<h3>\u3010${type}\u3011</h3>`;
              curType = type;
            }
            content += `<p><b>${getTimeString(d)}\uFF1A</b>${action.replace(/`([^`]+?)`/g, '<b style="color: #f00;">$1</b>')}`;
          } else {
            content += `<p><b>${getTimeString(d)} (${type})\uFF1A</b>${action.replace(/`([^`]+?)`/g, '<b style="color: #f00;">$1</b>')}`;
          }
          let stat = "";
          if ($.type(gain) === "object" && !$.isEmptyObject(gain)) {
            stat += "\uFF0C";
            for (let k of Object.keys(gain)) {
              if (k === "item") {
                for (let name4 of getSortedObjectKeyList(itemTypeList, gain[k])) {
                  stat += `<i>${name4}<em>+${gain[k][name4].toLocaleString()}</em></i> `;
                }
              } else if (k === "arm") {
                for (let name4 of getSortedObjectKeyList(armTypeList, gain[k])) {
                  stat += `<i>${name4}<em>+${gain[k][name4].toLocaleString()}</em></i> `;
                }
              } else if (k === "box") {
                for (let name4 of getSortedObjectKeyList(boxTypeList, gain[k])) {
                  stat += `<i>${name4}<em>+${gain[k][name4].toLocaleString()}</em></i> `;
                }
              } else {
                stat += `<i>${k}<em>+${gain[k].toLocaleString()}</em></i> `;
              }
            }
          }
          if ($.type(pay) === "object" && !$.isEmptyObject(pay)) {
            if (!stat) stat += "\uFF0C";
            for (let k of Object.keys(pay)) {
              if (k === "item") {
                for (let itemName of Object.keys(pay[k])) {
                  stat += `<i>${itemName}<ins>${pay[k][itemName].toLocaleString()}</ins></i> `;
                }
              } else {
                stat += `<i>${k}<ins>${pay[k].toLocaleString()}</ins></i> `;
              }
            }
          }
          content += stat + "</p>";
        }
        return content;
      };
      showLogStat = function(log2, date, $dialog2) {
        if (!Array.isArray(log2[date])) return;
        $dialog2.find('[data-name="stat"]').html(getLogStat(log2, date, Config.logStatType));
      };
      getLogStat = function(log2, date, logStatType) {
        let rangeLog = {};
        if (logStatType === "custom") {
          let minDate = new Date(date);
          minDate.setDate(minDate.getDate() - Config.logStatDays + 1);
          minDate = getDateString(minDate);
          for (let d of getObjectKeyList(log2, 1)) {
            if (d >= minDate && d <= date) rangeLog[d] = log2[d];
          }
        } else if (logStatType === "all") {
          rangeLog = log2;
        } else {
          rangeLog[date] = log2[date];
        }
        let income = {}, expense = {}, profit = {};
        let lootCount = 0, lootLevelStat = { total: 0, min: 0, max: 0 }, lootBoxTotalNum = 0, lootBoxStat = {};
        let boxTotalNum = 0, boxStat = {}, boxGain = { "KFB": 0, "\u7ECF\u9A8C\u503C": 0, "\u9053\u5177": 0, "\u88C5\u5907": 0, item: {}, arm: {} }, boxRandomTotalNum = 0, boxRandomTotalCount = 0;
        let validItemNum = 0, validItemStat = {}, invalidItemNum = 0, invalidItemStat = {};
        let invalidKeyList = [
          "item",
          "arm",
          "box",
          "\u593A\u53D6KFB",
          "VIP\u5C0F\u65F6",
          "\u795E\u79D8",
          "\u71C3\u70E7\u4F24\u5BB3",
          "\u547D\u4E2D",
          "\u95EA\u907F",
          "\u66B4\u51FB\u6BD4\u4F8B",
          "\u66B4\u51FB\u51E0\u7387",
          "\u9632\u5FA1",
          "\u6709\u6548\u9053\u5177",
          "\u65E0\u6548\u9053\u5177",
          "\u957F\u5251\u7ECF\u9A8C",
          "\u77ED\u5F13\u7ECF\u9A8C",
          "\u6CD5\u6756\u7ECF\u9A8C"
        ];
        for (let d in rangeLog) {
          for (let { type, action, gain, pay, notStat } of rangeLog[d]) {
            if (typeof type === "undefined" || typeof notStat !== "undefined") continue;
            if ($.type(gain) === "object") {
              for (let k of Object.keys(gain)) {
                if (invalidKeyList.includes(k)) continue;
                if (typeof income[k] === "undefined") income[k] = gain[k];
                else income[k] += gain[k];
              }
            }
            if ($.type(pay) === "object") {
              for (let k of Object.keys(pay)) {
                if (invalidKeyList.includes(k)) continue;
                if (typeof expense[k] === "undefined") expense[k] = pay[k];
                else expense[k] += pay[k];
              }
            }
            if (type === "\u4E89\u593A\u653B\u51FB" && $.type(gain) === "object") {
              let matches = /第`(\d+)`层/.exec(action);
              if (matches) {
                lootCount++;
                let level = parseInt(matches[1]);
                lootLevelStat.total += level;
                if (lootLevelStat.max < level) lootLevelStat.max = level;
                if (!lootLevelStat.min || lootLevelStat.min > level) lootLevelStat.min = level;
                if ($.type(gain["box"]) === "object") {
                  for (let [key, num2] of entries(gain["box"])) {
                    lootBoxTotalNum += num2;
                    if (!(key in lootBoxStat)) lootBoxStat[key] = { total: 0, min: -1, max: -1 };
                    lootBoxStat[key].total += num2;
                    if (lootBoxStat[key].max < num2) lootBoxStat[key].max = num2;
                    if (lootBoxStat[key].min < 0 || lootBoxStat[key].min > num2) lootBoxStat[key].min = num2;
                  }
                  for (let key of boxTypeList) {
                    if (!(key in gain["box"]) && key in lootBoxStat) lootBoxStat[key].min = 0;
                  }
                }
              }
            } else if (type === "\u6253\u5F00\u76D2\u5B50" && $.type(gain) === "object" && $.type(pay) === "object") {
              let matches = /【`(.+?)`】打开成功/.exec(action);
              if (!matches) continue;
              let boxType = matches[1];
              let boxNum = Math.abs(pay["\u76D2\u5B50"]);
              boxTotalNum += boxNum;
              if (!(boxType in boxStat)) boxStat[boxType] = 0;
              boxStat[boxType] += Math.abs(pay["\u76D2\u5B50"]);
              let randomMatches = /平均随机值【`([\d\.]+)`】/.exec(action);
              if (randomMatches) {
                boxRandomTotalCount += boxNum;
                boxRandomTotalNum += parseFloat(randomMatches[1]) * boxNum;
              }
              for (let [key, value] of entries(gain)) {
                if (!(key in boxGain)) continue;
                if ($.type(value) === "object") {
                  for (let [name4, num2] of entries(value)) {
                    if (!(name4 in boxGain[key])) boxGain[key][name4] = 0;
                    boxGain[key][name4] += num2;
                  }
                } else {
                  boxGain[key] += value;
                }
              }
            } else if ((type === "\u4F7F\u7528\u9053\u5177" || type === "\u5FAA\u73AF\u4F7F\u7528\u9053\u5177") && $.type(gain) === "object") {
              let matches = /【`Lv.(\d+)：(.+?)`】/.exec(action);
              if (matches) {
                let itemLevel = parseInt(matches[1]);
                if (itemLevel < 3) continue;
                let itemName = matches[2];
                if (gain["\u6709\u6548\u9053\u5177"] > 0) {
                  validItemNum += gain["\u6709\u6548\u9053\u5177"];
                  if (typeof validItemStat[itemName] === "undefined") validItemStat[itemName] = 0;
                  validItemStat[itemName] += gain["\u6709\u6548\u9053\u5177"];
                }
                if (gain["\u65E0\u6548\u9053\u5177"] > 0) {
                  invalidItemNum += gain["\u65E0\u6548\u9053\u5177"];
                  if (typeof invalidItemStat[itemName] === "undefined") invalidItemStat[itemName] = 0;
                  invalidItemStat[itemName] += gain["\u65E0\u6548\u9053\u5177"];
                }
              }
            }
          }
        }
        let content = "";
        let sortStatTypeList = ["KFB", "\u7ECF\u9A8C\u503C", "\u8D21\u732E", "\u8F6C\u8D26\u989D\u5EA6", "\u76D2\u5B50", "\u9053\u5177", "\u5DF2\u4F7F\u7528\u9053\u5177", "\u88C5\u5907", "\u6B66\u5668\u7ECF\u9A8C", "\u62A4\u7532\u7ECF\u9A8C", "\u9879\u94FE\u7ECF\u9A8C", "\u80FD\u91CF", "\u5361\u7247"];
        content += "<strong>\u6536\u83B7\uFF1A</strong>";
        for (let key of getSortedObjectKeyList(sortStatTypeList, income)) {
          profit[key] = income[key];
          content += `<i>${key}<em>+${income[key].toLocaleString()}</em></i> `;
        }
        content += "<br><strong>\u4ED8\u51FA\uFF1A</strong>";
        for (let key of getSortedObjectKeyList(sortStatTypeList, expense)) {
          if (typeof profit[key] === "undefined") profit[key] = expense[key];
          else profit[key] += expense[key];
          content += `<i>${key}<ins>${expense[key].toLocaleString()}</ins></i> `;
        }
        content += "<br><strong>\u7ED3\u4F59\uFF1A</strong>";
        for (let key of getSortedObjectKeyList(sortStatTypeList, profit)) {
          content += `<i>${key}${getStatFormatNumber(profit[key])}</i> `;
        }
        content += '<div style="margin: 5px 0; border-bottom: 1px dashed #ccccff;"></div>';
        content += `
<strong>\u4E89\u593A\u653B\u51FB\u7EDF\u8BA1\uFF1A</strong><i>\u6B21\u6570<em>+${lootCount}</em></i> `;
        if (lootCount > 0) {
          content += `<i>\u5C42\u6570<span class="pd_stat_extra">(<em title="\u5E73\u5747\u503C">+${(lootLevelStat.total / lootCount).toFixed(2)}</em>|<em title="\u6700\u5C0F\u503C">+${lootLevelStat.min}</em>|<em title="\u6700\u5927\u503C">+${lootLevelStat.max}</em>)</span></i> `;
          content += `<i>\u76D2\u5B50<em>+${lootBoxTotalNum.toLocaleString()}</em></i> `;
          for (let key of getSortedObjectKeyList(boxTypeList, lootBoxStat)) {
            if (!lootBoxStat[key].total) continue;
            content += `<i>${key}<em>+${lootBoxStat[key].total.toLocaleString()}</em><span class="pd_stat_extra">(<em title="\u5E73\u5747\u503C">+${(lootBoxStat[key].total / lootCount).toFixed(2)}</em>|<em title="\u6700\u5C0F\u503C">+${lootBoxStat[key].min}</em>|<em title="\u6700\u5927\u503C">+${lootBoxStat[key].max}</em>)</span></i> `;
          }
        }
        let boxStatContent = "";
        for (let boxType of getSortedObjectKeyList(boxTypeList, boxStat)) {
          if (boxStatContent) boxStatContent += "|";
          boxStatContent += `<ins title="${boxType}">-${boxStat[boxType].toLocaleString()}</ins>`;
        }
        content += `<br><strong>\u76D2\u5B50\u6536\u83B7\u7EDF\u8BA1\uFF1A</strong><i>\u76D2\u5B50<ins>-${boxTotalNum}</ins>${boxStatContent ? `<span class="pd_stat_extra">(${boxStatContent})</span>` : ""}</i> `;
        if (boxRandomTotalCount > 0) {
          content += `<i>\u5E73\u5747\u968F\u673A\u503C<em>+${getFixedNumLocStr(boxRandomTotalNum / boxRandomTotalCount, 2)}</em></i> `;
        }
        if (boxTotalNum > 0) {
          for (let [key, value] of entries(boxGain)) {
            if (!value || $.type(value) === "object" && $.isEmptyObject(value)) continue;
            if ($.type(value) === "object") {
              let typeList = key === "item" ? itemTypeList : armTypeList;
              for (let name4 of getSortedObjectKeyList(typeList, value)) {
                content += `<i>${name4}<em>+${value[name4].toLocaleString()}</em></i> `;
              }
            } else {
              content += `<i>${key}<span class="pd_stat_extra"><em>+${value.toLocaleString()}</em>(<em title="\u5E73\u5747\u503C">+${getFixedNumLocStr(value / boxTotalNum, 2).toLocaleString()}</em>)</span></i> `;
            }
          }
        }
        content += `<br><strong>\u6709\u6548\u9053\u5177\u7EDF\u8BA1\uFF1A</strong><i>\u6709\u6548\u9053\u5177<em>+${validItemNum.toLocaleString()}</em></i> `;
        for (let itemName of getSortedObjectKeyList(itemTypeList, validItemStat)) {
          content += `<i>${itemName}<em>+${validItemStat[itemName].toLocaleString()}</em></i> `;
        }
        content += `<br><strong>\u65E0\u6548\u9053\u5177\u7EDF\u8BA1\uFF1A</strong><i>\u65E0\u6548\u9053\u5177<em>+${invalidItemNum.toLocaleString()}</em></i> `;
        for (let itemName of getSortedObjectKeyList(itemTypeList, invalidItemStat)) {
          content += `<i>${itemName}<em>+${invalidItemStat[itemName].toLocaleString()}</em></i> `;
        }
        return content;
      };
      showImportOrExportLogDialog = function() {
        const dialogName2 = "pdImOrExLogDialog";
        if ($("#" + dialogName2).length > 0) return;
        let log2 = read();
        let html2 = `
<div class="pd_cfg_main">
  <div style="margin-top: 5px;">
    <label style="color: #f00;"><input type="radio" name="logType" value="setting" checked> \u5BFC\u5165/\u5BFC\u51FA\u65E5\u5FD7</label>
    <label style="color: #00f;"><input type="radio" name="logType" value="text"> \u5BFC\u51FA\u65E5\u5FD7\u6587\u672C</label>
  </div>
  <div data-name="logSetting">
    <strong>\u5BFC\u5165\u65E5\u5FD7\uFF1A</strong>\u5C06\u65E5\u5FD7\u5185\u5BB9\u7C98\u8D34\u5230\u6587\u672C\u6846\u4E2D\u5E76\u70B9\u51FB\u5408\u5E76\u6216\u8986\u76D6\u6309\u94AE\u5373\u53EF<br>
    <strong>\u5BFC\u51FA\u65E5\u5FD7\uFF1A</strong>\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u522B\u5904\u5373\u53EF<br>
    <textarea name="setting" style="width: 600px; height: 400px; word-break: break-all;"></textarea>
  </div>
  <div data-name="logText" style="display: none;">
    <strong>\u5BFC\u51FA\u65E5\u5FD7\u6587\u672C</strong>\uFF1A\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u522B\u5904\u5373\u53EF
    <div>
      <label title="\u6309\u65F6\u95F4\u987A\u5E8F\u6392\u5E8F"><input type="radio" name="sortType2" value="time" checked> \u6309\u65F6\u95F4</label>
      <label title="\u6309\u65E5\u5FD7\u7C7B\u522B\u6392\u5E8F"><input type="radio" name="sortType2" value="type"> \u6309\u7C7B\u522B</label>
      <label title="\u5728\u65E5\u5FD7\u6587\u672C\u91CC\u663E\u793A\u6BCF\u65E5\u4EE5\u53CA\u5168\u90E8\u6570\u636E\u7684\u7EDF\u8BA1\u7ED3\u679C"><input type="checkbox" name="showStat" checked> \u663E\u793A\u7EDF\u8BA1</label>
    </div>
    <textarea name="text" style="width: 600px; height: 400px;" readonly></textarea>
  </div>
</div>
<div class="pd_cfg_btns">
  <button name="merge" type="button">\u5408\u5E76\u65E5\u5FD7</button>
  <button name="overwrite" type="button" style="color: #f00;">\u8986\u76D6\u65E5\u5FD7</button>
  <button data-action="close" type="button">\u5173\u95ED</button>
</div>`;
        let $dialog2 = create(dialogName2, "\u5BFC\u5165\u6216\u5BFC\u51FA\u65E5\u5FD7", html2);
        $dialog2.find('[name="sortType2"], [name="showStat"]').click(function() {
          showLogText(log2, $dialog2);
          $dialog2.find('[name="text"]').select();
        }).end().find('[name="logType"]').click(function() {
          let type = $(this).val();
          $dialog2.find(`[data-name="log${type === "text" ? "Setting" : "Text"}"]`).hide();
          $dialog2.find(`[data-name="log${type === "text" ? "Text" : "Setting"}"]`).show();
          $dialog2.find(`[data-name="log${type === "text" ? "Text" : "Setting"}"]`).select();
        }).end().find('[name="merge"], [name="overwrite"]').click(function(e) {
          e.preventDefault();
          let name4 = $(this).attr("name");
          if (!confirm(`\u662F\u5426\u5C06\u6587\u672C\u6846\u4E2D\u7684\u65E5\u5FD7${name4 === "overwrite" ? "\u8986\u76D6" : "\u5408\u5E76"}\u5230\u672C\u5730\u65E5\u5FD7\uFF1F`)) return;
          let newLog = $.trim($dialog2.find('[name="setting"]').val());
          if (!newLog) return;
          try {
            newLog = JSON.parse(newLog);
          } catch (ex) {
            alert("\u65E5\u5FD7\u6709\u9519\u8BEF");
            return;
          }
          if (!newLog || $.type(newLog) !== "object") {
            alert("\u65E5\u5FD7\u6709\u9519\u8BEF");
            return;
          }
          if (name4 === "merge") log2 = getMergeLog(log2, newLog);
          else log2 = newLog;
          write(log2);
          alert("\u65E5\u5FD7\u5DF2\u5BFC\u5165");
          location.reload();
        });
        show2(dialogName2);
        $dialog2.find(`[name="sortType2"][value="${Config.logSortType}"]`).prop("checked", true).triggerHandler("click");
        $dialog2.find('[name="setting"]').val(JSON.stringify(log2)).select().focus();
        runFunc("LogDialog.showImportOrExportLogDialog_after_");
      };
      showLogText = function(log2, $dialog2) {
        let logSortType = $dialog2.find('input[name="sortType2"]:checked').val();
        let isShowStat = $dialog2.find('[name="showStat"]').prop("checked");
        let content = "", lastDate = "";
        for (let date of Object.keys(log2)) {
          if (!Array.isArray(log2[date])) continue;
          if (lastDate > date) lastDate = date;
          content += `\u3010${date}\u3011(\u5171${log2[date].length}\u9879)
${logSortType === "type" ? "" : "\n"}` + getLogContent(log2, date, logSortType).replace(/<h3>/g, "\n").replace(/<\/h3>/g, "\n").replace(/<\/p>/g, "\n").replace(/(<.+?>|<\/.+?>)/g, "").replace(/`/g, "");
          if (isShowStat) {
            content += `${"-".repeat(46)}
\u5408\u8BA1\uFF1A
${getLogStat(log2, date, "current").replace(/<br\s*\/?>/g, "\n").replace(/(<.+?>|<\/.+?>)/g, "")}
`;
          }
          content += "=".repeat(46) + "\n";
        }
        if (content && isShowStat) {
          content += "\n\u603B\u8BA1\uFF1A\n" + getLogStat(log2, lastDate, "all").replace(/<br\s*\/?>/g, "\n").replace(/(<.+?>|<\/.+?>)/g, "");
        }
        $dialog2.find('[name="text"]').val(content);
      };
    }
  });

  // src/module/Public.js
  var Public_exports = {};
  __export(Public_exports, {
    addConfigAndLogDialogLink: () => addConfigAndLogDialogLink,
    addFastNavMenu: () => addFastNavMenu,
    addPolyfill: () => addPolyfill,
    addSearchDialogLink: () => addSearchDialogLink,
    addSlowActionChecked: () => addSlowActionChecked,
    appendCss: () => appendCss,
    bindElementTitleClick: () => bindElementTitleClick,
    bindSearchTypeSelectMenuClick: () => bindSearchTypeSelectMenuClick,
    blockThread: () => blockThread,
    blockUsers: () => blockUsers,
    changeIdColor: () => changeIdColor,
    changeNewTipsColor: () => changeNewTipsColor,
    checkBrowserType: () => checkBrowserType,
    followUsers: () => followUsers,
    getDailyBonus: () => getDailyBonus,
    getNextTimingIntervalInfo: () => getNextTimingIntervalInfo,
    getSafeId: () => getSafeId,
    getUidAndUserName: () => getUidAndUserName,
    handleSideBarLink: () => handleSideBarLink,
    makeSearchByBelowTwoKeyWordAvailable: () => makeSearchByBelowTwoKeyWordAvailable,
    modifyDomainTips: () => modifyDomainTips,
    preventCloseWindowWhenActioning: () => preventCloseWindowWhenActioning,
    repairBbsErrorCode: () => repairBbsErrorCode,
    showCommonImportOrExportConfigDialog: () => showCommonImportOrExportConfigDialog,
    showCommonImportOrExportLogDialog: () => showCommonImportOrExportLogDialog,
    showElementTitleTips: () => showElementTitleTips,
    showFormatLog: () => showFormatLog,
    startTimingMode: () => startTimingMode,
    turnPageViaKeyboard: () => turnPageViaKeyboard
  });
  var getUidAndUserName, getSafeId, checkBrowserType, appendCss, addConfigAndLogDialogLink, handleSideBarLink, preventCloseWindowWhenActioning, showFormatLog, addPolyfill, getNextTimingIntervalInfo, startTimingMode, getDailyBonus, followUsers, blockUsers, blockThread, addFastNavMenu, changeIdColor, showElementTitleTips, bindElementTitleClick, bindSearchTypeSelectMenuClick, makeSearchByBelowTwoKeyWordAvailable, addSearchDialogLink, repairBbsErrorCode, turnPageViaKeyboard, showCommonImportOrExportConfigDialog, showCommonImportOrExportLogDialog, changeNewTipsColor, addSlowActionChecked, modifyDomainTips;
  var init_Public = __esm({
    "src/module/Public.js"() {
      "use strict";
      init_Info();
      init_Util();
      init_Msg();
      init_Dialog();
      init_Const();
      init_Config();
      init_ConfigDialog();
      init_Log();
      init_LogDialog();
      init_TmpLog();
      init_Script();
      init_Read();
      init_Loot();
      init_Item();
      getUidAndUserName = function() {
        let $userName = $('#kf_topuser > a[href="javascript:;"]').eq(0);
        let $uid = Info_default.$userMenu.find('a[href^="profile.php?action=show&uid="]').eq(0);
        if (!$userName.length || !$uid.length) return false;
        $userName.attr("id", "pdUserName");
        Info_default.userName = $.trim($userName.contents().get(0).textContent);
        if (!Info_default.userName) return false;
        let matches = /&uid=(\d+)/.exec($uid.attr("href"));
        if (!matches) return false;
        Info_default.uid = parseInt(matches[1]);
        return true;
      };
      getSafeId = function() {
        let safeId3 = $("input#safeid").val();
        if (!safeId3) {
          let matches = /safeid=(\w+)/i.exec($('a[href*="safeid="]:first').attr("href"));
          if (matches) safeId3 = matches[1];
        }
        return safeId3 ? safeId3 : "";
      };
      checkBrowserType = function() {
        if (Config.browseType === "auto") {
          Info_default.isMobile = /(Mobile|MIDP)/i.test(navigator.userAgent);
        } else {
          Info_default.isMobile = Config.browseType === "mobile";
        }
      };
      appendCss = function() {
        $("head").append(`
<style>
  /* \u516C\u5171 */
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
  #alldiv > .drow:nth-child(2) { ${Config.navBarAlwaysTopEnabled && !location.host.endsWith(".miaola.info") ? "position: sticky; top: 0;" : ""} z-index: 1001 !important; }
  .pd_domain_tips { position: absolute; top: 0; width: 1200px; }
  
  /* \u6D88\u606F\u6846 */
  .pd_mask { position: fixed; width: 100%; height: 100%; left: 0; top: 0; z-index: 1000; }
  .pd_msg_container { position: ${Info_default.isMobile ? "absolute" : "fixed"}; width: 100%; z-index: 1003; }
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
  
  /* \u5E16\u5B50\u9875\u9762 */
  .readtext .pd_goto_link { color: #000; }
  .readtext .pd_goto_link:hover { color: #51d; }
  .pd_multi_quote_chk { margin-right: 2px; float: right; }
  .pd_fast_goto_floor { margin-right: 10px !important; line-height: 32px; }
  .pd_user_memo { font-size: 12px; color: #999; margin-left: 5px; }
  .readtext img[onclick], .pd_kf18 { width: auto; max-width: 850px; }
  .read_fds { text-align: left !important; font-weight: normal !important; font-style: normal !important; }
  .pd_code_area { max-height: 550px; margin-top: 1em; overflow-y: auto; font-size: 12px; font-family: Consolas, "Courier New"; }
  .pd_code_area .pd_copy_code { position: absolute; margin-top: -1em; min-width: 5em; text-align: center; background-color: #fffbf4; height: 20px; }
  .pd_good_post_mark { outline: 3px solid #f00; outline-offset: -3px; }
  .pd_follow_highlight { box-shadow: 0 0 3px 1px #ff9933 !important; }
  
  /* \u6211\u7684\u7269\u54C1\u9875\u9762 */
  .pd_item_btns { text-align: right; margin-top: 5px;  }
  .pd_item_btns button, .pd_item_btns input { margin-bottom: 2px; vertical-align: middle; }
  .pd_result { border: 1px solid #99f; padding: 5px; margin-top: 10px; line-height: 2em; }
  .pd_arm_equipped { background-color:#eef; -webkit-box-shadow: 0 0 7px #99f; box-shadow: 0 0 7px #99f; }
  .pd_arm_equipped > td:nth-child(3)::before { content: "\uFF08\u88C5\u5907\u4E2D\uFF09"; font-weight: bold; }
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
  
  /* \u53D1\u5E16\u9875\u9762 */
  #pdSmilePanel img { margin: 3px; cursor: pointer; }
  .editor-button .pd_editor_btn { background: none; text-indent: 0; line-height: 18px; cursor: default; }
  .pd_post_extra_option { text-align: left; margin: 5px; }
  .pd_post_extra_option input { vertical-align: middle; height: auto; margin-right: 0; }
  
  /* \u5176\u5B83\u9875\u9762 */
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

  /* \u8BBE\u7F6E\u5BF9\u8BDD\u6846 */
  .pd_cfg_ml { margin-left: 10px; }
  .pd_cfg_box {
    position: ${Info_default.isMobile ? "absolute" : "fixed"}; border: 1px solid #9191ff; display: none; z-index: 1002;
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

  /* \u65E5\u5FD7\u5BF9\u8BDD\u6846 */
  .pd_log_nav { text-align: center; margin: -5px 0 -12px; font-size: 14px; line-height: 44px; }
  .pd_log_nav a { display: inline-block; }
  .pd_log_nav h2 { display: inline; font-size: 14px; margin-left: 7px; margin-right: 7px; }
  .pd_log_content { height: 242px; overflow: auto; }
  .pd_log_content h3 { display: inline-block; font-size: 12px; line-height: 22px; margin: 0; }
  .pd_log_content h3:not(:first-child) { margin-top: 5px; }
  .pd_log_content p { line-height: 22px; margin: 0; }
</style>
`);
        if (location.pathname === "/read.php" && (Config.threadContentFontSize > 0 || Config.adjustThreadContentWidthEnabled)) {
          $("head").append(`
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
          $("head").append(`<style>${Config.customCssContent}</style>`);
        }
      };
      addConfigAndLogDialogLink = function() {
        $(`
<li><a data-name="openConfigDialog" href="#">\u52A9\u624B\u8BBE\u7F6E</a></li>
<li><a data-name="openLogDialog" href="#">\u52A9\u624B\u65E5\u5FD7</a></li>
`).appendTo(Info_default.$userMenu).find('[data-name="openConfigDialog"]').click(function(e) {
          e.preventDefault();
          show3();
        }).end().find('[data-name="openLogDialog"]').click(function(e) {
          e.preventDefault();
          show4();
        });
      };
      handleSideBarLink = function() {
        let $kfb = $('a.rightbox1[title="\u7F51\u7AD9\u865A\u62DF\u8D27\u5E01"]');
        $kfb.attr("id", "pdKfb");
        let matches = /(-?\d+)KFB\s*\|\s*(-?\d+(?:\.\d+)?)贡献/.exec($kfb.text());
        if (matches) {
          let kfb = parseInt(matches[1]);
          let gongXian = parseFloat(matches[2]);
          $kfb.html(`<b>${kfb.toLocaleString()}</b>KFB | <b>${gongXian.toLocaleString()}</b>\u8D21\u732E`).attr("data-kfb", kfb).attr("data-gongxian", gongXian);
        }
        let $smLevel = $('a.rightbox1[href="kf_growup.php"]');
        $smLevel.attr("id", "pdSmLevel");
        matches = /神秘(-?\d+)级 \(系数排名第\s*(\d+\+?)\s*位/.exec($smLevel.text());
        if (matches) {
          let smLevel = parseInt(matches[1]);
          let smRank = matches[2];
          $smLevel.html(`\u795E\u79D8<b>${smLevel.toLocaleString()}</b>\u7EA7 (\u7CFB\u6570\u6392\u540D\u7B2C<b style="color: #00f;">${smRank}</b>\u4F4D)`).attr("data-sm-level", smLevel).attr("data-sm-rank", smRank);
        }
        $('a.rightbox1[href="kf_fw_ig_index.php"]').attr("id", "pdLoot");
      };
      preventCloseWindowWhenActioning = function(e) {
        if ($(".pd_mask").length > 0) {
          let msg = "\u64CD\u4F5C\u6B63\u5728\u8FDB\u884C\u4E2D\uFF0C\u786E\u5B9A\u8981\u5173\u95ED\u9875\u9762\u5417\uFF1F";
          e.returnValue = msg;
          return msg;
        }
      };
      showFormatLog = function(msgType, html2) {
        let { msg, url } = getResponseMsg(html2);
        console.log(`\u3010${msgType}\u3011\u56DE\u5E94\uFF1A${msg}${url ? `\uFF1B\u8DF3\u8F6C\u5730\u5740\uFF1A${getHostNameUrl()}${url}` : ""}`);
      };
      addPolyfill = function() {
        if (!Array.prototype.includes) {
          Array.prototype.includes = function(searchElement) {
            if (this == null) throw new TypeError("Array.prototype.includes called on null or undefined");
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
              if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) return true;
              k++;
            }
            return false;
          };
        }
        if (!String.prototype.padStart) {
          String.prototype.padStart = function padStart(maxLength, fillString = " ") {
            const O = Object(this);
            const S = String(O);
            const intMaxLength = parseInt(maxLength) || 0;
            const stringLength = parseInt(S.length) || 0;
            if (intMaxLength <= stringLength) return S;
            let filler = typeof fillString === "undefined" ? " " : String(fillString);
            if (filler === "") return S;
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
          String.prototype.padEnd = function padEnd(maxLength, fillString = " ") {
            const O = Object(this);
            const S = String(O);
            const intMaxLength = parseInt(maxLength) || 0;
            const stringLength = parseInt(S.length) || 0;
            if (intMaxLength <= stringLength) return S;
            let filler = typeof fillString === "undefined" ? " " : String(fillString);
            if (filler === "") return S;
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
      getNextTimingIntervalInfo = function() {
        let promoteHaloInterval = -1;
        if (Config.autoPromoteHaloEnabled) {
          let value = parseInt(getCookie(Const_default.promoteHaloCookieName));
          if (value > 0) {
            promoteHaloInterval = Math.floor((value - $.now()) / 1e3);
          } else {
            promoteHaloInterval = 0;
          }
        }
        let getDailyBonusInterval = -1;
        if (Config.autoGetDailyBonusEnabled) {
          let value = parseInt(getCookie(Const_default.getDailyBonusCookieName));
          if (value > 0) {
            let date = getTimezoneDateByTime(Const_default.getDailyBonusAfterTime);
            date.setDate(date.getDate() + 1);
            let now = /* @__PURE__ */ new Date();
            if (now > date) date.setDate(date.getDate() + 1);
            getDailyBonusInterval = Math.floor((date - now) / 1e3);
          } else if (value < 0) {
            getDailyBonusInterval = Const_default.getDailyBonusSpecialInterval * 60;
          } else {
            getDailyBonusInterval = 0;
          }
        }
        let buyItemInterval = -1;
        if (Config.autoBuyItemEnabled) {
          let date = getDateByTime(Config.buyItemAfterTime);
          let now = /* @__PURE__ */ new Date();
          if (getCookie(Const_default.buyItemReadyCookieName)) {
            buyItemInterval = 5 * 60;
          } else if (getCookie(Const_default.buyItemCookieName) || now < date) {
            if (now > date) date.setDate(date.getDate() + 1);
            buyItemInterval = Math.floor((date - now) / 1e3);
          } else {
            buyItemInterval = 0;
          }
        }
        let intervalList = [
          { action: "\u63D0\u5347\u6218\u529B\u5149\u73AF", interval: promoteHaloInterval },
          { action: "\u81EA\u52A8\u83B7\u53D6\u6BCF\u65E5\u5956\u52B1", interval: getDailyBonusInterval },
          { action: "\u81EA\u52A8\u8D2D\u4E70\u7269\u54C1", interval: buyItemInterval }
        ];
        let minAction = "", minInterval = -1;
        for (let { action, interval } of intervalList.filter((data) => data.interval > -1)) {
          if (minInterval < 0 || interval < minInterval) {
            minAction = action;
            minInterval = interval;
          }
        }
        return { action: minInterval > 0 ? minAction : "", interval: minInterval + 1 };
      };
      startTimingMode = function() {
        let { action, interval } = getNextTimingIntervalInfo();
        if (interval === -1) return;
        let oriTitle = document.title;
        let titleItvFunc = null;
        let prevInterval = -1, errorNum = 0;
        const getFormatIntervalTitle = function(type, interval2) {
          let diff = getTimeDiffInfo(getDate("+" + interval2 + "s").getTime());
          let textInterval = diff.hours > 0 ? diff.hours + "\u65F6" : "";
          if (type === 1) textInterval += (diff.minutes > 0 ? diff.minutes + "\u5206" : "") + diff.seconds + "\u79D2";
          else textInterval += diff.minutes + "\u5206";
          return textInterval;
        };
        const showRefreshModeTips = function(interval2, action2 = "", isShowTitle = false) {
          if (titleItvFunc) window.clearInterval(titleItvFunc);
          let showInterval = interval2;
          console.log(`\u3010\u5B9A\u65F6\u6A21\u5F0F\u3011\u5012\u8BA1\u65F6${action2 ? `(${action2})` : ""}\uFF1A` + getFormatIntervalTitle(1, showInterval));
          if (Config.showTimingModeTipsType.toLowerCase() !== "never") {
            const showIntervalTitle = function() {
              document.title = `${oriTitle} (\u5B9A\u65F6: ${getFormatIntervalTitle(interval2 < 60 ? 1 : 2, showInterval)})`;
              showInterval = interval2 < 60 ? showInterval - 1 : showInterval - 60;
            };
            if (isShowTitle || Config.showTimingModeTipsType.toLowerCase() === "always" || interval2 < 60) showIntervalTitle();
            else showInterval = interval2 < 60 ? showInterval - 1 : showInterval - 60;
            titleItvFunc = setInterval(showIntervalTitle, Const_default.showRefreshModeTipsInterval * 60 * 1e3);
          }
        };
        const handleError = function() {
          let interval2 = 0, errorText = "";
          $.ajax({
            type: "GET",
            url: "index.php?t=" + $.now(),
            timeout: Const_default.defAjaxTimeout,
            success(html2) {
              if (!/"kf_fw_ig_index.php"/.test(html2)) {
                interval2 = 10;
                errorText = "\u8BBA\u575B\u7EF4\u62A4\u6216\u5176\u5B83\u672A\u77E5\u60C5\u51B5";
              }
            },
            error() {
              interval2 = Const_default.errorRefreshInterval;
              errorText = "\u8FDE\u63A5\u8D85\u65F6";
            },
            complete() {
              if (interval2 > 0) {
                console.log(`\u5B9A\u65F6\u64CD\u4F5C\u5931\u8D25\uFF08\u539F\u56E0\uFF1A${errorText}\uFF09\uFF0C\u5C06\u5728${interval2}\u5206\u949F\u540E\u91CD\u8BD5...`);
                remove($(".pd_refresh_notice").parent());
                show(`<strong class="pd_refresh_notice">\u5B9A\u65F6\u64CD\u4F5C\u5931\u8D25\uFF08\u539F\u56E0\uFF1A${errorText}\uFF09\uFF0C\u5C06\u5728<em>${interval2}</em>\u5206\u949F\u540E\u91CD\u8BD5&hellip;</strong>`, -1);
                setTimeout(handleError, interval2 * 60 * 1e3);
                showRefreshModeTips(interval2 * 60, "", true);
              } else {
                if (errorNum > 6) {
                  errorNum = 0;
                  interval2 = 15;
                  setTimeout(checkRefreshInterval, interval2 * 60 * 1e3);
                  showRefreshModeTips(interval2 * 60, "", true);
                } else {
                  errorNum++;
                  checkRefreshInterval();
                }
              }
            }
          });
        };
        const checkRefreshInterval = function() {
          remove($(".pd_refresh_notice").parent());
          $(document).clearQueue("AutoAction");
          if (Config.autoPromoteHaloEnabled && !getCookie(Const_default.promoteHaloCookieName)) {
            $(document).queue("AutoAction", () => getPromoteHaloInfo());
          }
          if (Config.autoGetDailyBonusEnabled && !getCookie(Const_default.getDailyBonusCookieName)) {
            $(document).queue("AutoAction", () => getDailyBonus());
          }
          if (Config.autoBuyItemEnabled && !getCookie(Const_default.buyItemCookieName) && !getCookie(Const_default.buyItemReadyCookieName)) {
            $(document).queue("AutoAction", () => buyItems(Config.buyItemIdList));
          }
          $(document).dequeue("AutoAction");
          let { action: action2, interval: interval2 } = getNextTimingIntervalInfo();
          if (interval2 > 0) errorNum = 0;
          if (interval2 === 0 && prevInterval === 0) {
            prevInterval = -1;
            handleError();
            return;
          } else prevInterval = interval2;
          if (interval2 === -1) {
            if (titleItvFunc) clearInterval(titleItvFunc);
            return;
          } else if (interval2 === 0) interval2 = Const_default.actionFinishRetryInterval;
          setTimeout(checkRefreshInterval, interval2 * 1e3);
          showRefreshModeTips(interval2, action2, true);
        };
        setTimeout(checkRefreshInterval, interval < 60 ? 60 * 1e3 : interval * 1e3);
        showRefreshModeTips(interval < 60 ? 60 : interval, action);
      };
      getDailyBonus = function() {
        runFunc("Public.getDailyBonus_before_");
        console.log("\u9886\u53D6\u6BCF\u65E5\u5956\u52B1Start");
        let $wait = wait("<strong>\u6B63\u5728\u9886\u53D6\u6BCF\u65E5\u5956\u52B1\uFF0C\u8BF7\u7A0D\u5019&hellip;</strong>");
        const getCookieDate = function() {
          let date = getTimezoneDateByTime(Const_default.getDailyBonusAfterTime);
          date.setDate(date.getDate() + 1);
          if (/* @__PURE__ */ new Date() > date) date.setDate(date.getDate() + 1);
          return date;
        };
        $.ajax({
          type: "GET",
          url: "kf_growup.php?t=" + $.now(),
          timeout: Const_default.defAjaxTimeout
        }).done(function(html2) {
          let matches = /<a href="(kf_growup\.php\?ok=3&safeid=\w+)" target="_self">你可以领取\s*(\d+)KFB\s*\+\s*(\d+)经验\s*\+\s*(\d+(?:\.\d+)?)贡献/.exec(html2);
          if (matches) {
            let url = matches[1];
            let gain = {};
            if (parseInt(matches[2]) > 0) gain["KFB"] = parseInt(matches[2]);
            if (parseInt(matches[3]) > 0) gain["\u7ECF\u9A8C\u503C"] = parseInt(matches[3]);
            if (parseFloat(matches[4]) > 0) gain["\u8D21\u732E"] = parseFloat(matches[4]);
            $.get(`${url}&t=${$.now()}`, function(html3) {
              showFormatLog("\u9886\u53D6\u6BCF\u65E5\u5956\u52B1", html3);
              let { msg } = getResponseMsg(html3);
              remove($wait);
              if (/领取成功/.test(msg)) {
                setCookie(Const_default.getDailyBonusCookieName, 1, getCookieDate());
                let logStatText = "", msgStatText = "";
                for (let [key, num2] of entries(gain)) {
                  logStatText += `${key}+${num2} `;
                  msgStatText += `<i>${key}<em>+${num2.toLocaleString()}</em></i>`;
                }
                console.log("\u9886\u53D6\u6BCF\u65E5\u5956\u52B1\uFF0C" + logStatText);
                show("<strong>\u9886\u53D6\u6BCF\u65E5\u5956\u52B1</strong>" + msgStatText);
                if (!$.isEmptyObject(gain)) push("\u9886\u53D6\u6BCF\u65E5\u5956\u52B1", "\u9886\u53D6\u6BCF\u65E5\u5956\u52B1", { gain });
                if (Config.promoteHaloLimit > 0) deleteCookie(Const_default.promoteHaloCookieName);
              } else {
                setCookie(Const_default.getDailyBonusCookieName, -1, getDate("+5m"));
              }
              runFunc("Public.getDailyBonus_after_", msg);
            }).fail(() => remove($wait));
          } else {
            remove($wait);
            setCookie(Const_default.getDailyBonusCookieName, 1, getCookieDate());
          }
        }).fail(function() {
          remove($wait);
          $(document).queue("AutoAction", function() {
            setTimeout(getDailyBonus, Const_default.defAjaxInterval);
          });
        }).always(function() {
          setTimeout(() => $(document).dequeue("AutoAction"), Const_default.minActionInterval);
        });
      };
      followUsers = function() {
        if (!Config.followUserList.length) return;
        if (Info_default.isInHomePage && Config.highlightFollowUserThreadInHPEnabled) {
          $(".indexlbtc > a").each(function() {
            let $this2 = $(this);
            let userName2 = $this2.attr("uname");
            if (!userName2) return;
            if (inFollowOrBlockUserList(userName2, Config.followUserList) > -1) {
              $this2.addClass("pd_highlight");
            }
          });
        } else if (location.pathname === "/thread.php") {
          $('a.bl[href^="profile.php?action=show&uid="]').each(function() {
            let $this2 = $(this);
            if (inFollowOrBlockUserList($this2.text(), Config.followUserList) > -1) {
              $this2.addClass("pd_highlight");
              if (Config.highlightFollowUserThreadLinkEnabled) {
                $this2.parent("td").prev("td").prev("td").find('div > a[href^="read.php?tid="]').addClass("pd_highlight");
              }
            }
          });
        } else if (location.pathname === "/read.php") {
          $('.readidmsbottom > a[href^="profile.php?action=show"]').each(function() {
            let $this2 = $(this);
            if (inFollowOrBlockUserList(getFloorUserName($this2.text()), Config.followUserList) > -1) {
              if (Config.highlightFollowUserFloorEnabled) {
                $this2.closest(".readtext").addClass("pd_follow_highlight").find("> table > tbody > tr > td:nth-child(2) > div").addClass("pd_follow_highlight");
              } else {
                $this2.closest(".readtext").find(".pd_goto_link").addClass("pd_highlight");
              }
            }
          });
        } else if (location.pathname === "/guanjianci.php" || location.pathname === "/kf_share.php") {
          $(".kf_share1 > tbody > tr > td:last-child").each(function() {
            let $this2 = $(this);
            if (inFollowOrBlockUserList($this2.text(), Config.followUserList) > -1) {
              $this2.addClass("pd_highlight");
            }
          });
        } else if (location.pathname === "/search.php") {
          $('.thread1 a[href^="profile.php?action=show&uid="]').each(function() {
            let $this2 = $(this);
            if (inFollowOrBlockUserList($this2.text(), Config.followUserList) > -1) {
              $this2.addClass("pd_highlight");
            }
          });
        }
      };
      blockUsers = function() {
        if (!Config.blockUserList.length) return;
        let num2 = 0;
        if (Info_default.isInHomePage) {
          $(".indexlbtc > a").each(function() {
            let $this2 = $(this);
            let userName2 = $this2.attr("uname");
            if (!userName2) return;
            let index = inFollowOrBlockUserList(userName2, Config.blockUserList);
            if (index > -1 && Config.blockUserList[index].type < 2) {
              num2++;
              $this2.parent(".indexlbtc").remove();
            }
          });
        } else if (location.pathname === "/thread.php") {
          let fid2 = parseInt($('input[name="f_fid"]:not([value="all"])').val());
          if (!fid2) return;
          if (Config.blockUserForumType === 1 && !Config.blockUserFidList.includes(fid2)) return;
          else if (Config.blockUserForumType === 2 && Config.blockUserFidList.includes(fid2)) return;
          $('a.bl[href^="profile.php?action=show&uid="]').each(function() {
            let $this2 = $(this);
            let index = inFollowOrBlockUserList($this2.text(), Config.blockUserList);
            if (index > -1 && Config.blockUserList[index].type < 2) {
              num2++;
              $this2.closest("tr").remove();
            }
          });
        } else if (location.pathname === "/read.php") {
          if (Config.blockUserForumType > 0) {
            let fid2 = parseInt($('input[name="fid"]:first').val());
            if (!fid2) return;
            if (Config.blockUserForumType === 1 && !Config.blockUserFidList.includes(fid2)) return;
            else if (Config.blockUserForumType === 2 && Config.blockUserFidList.includes(fid2)) return;
          }
          let page = getCurrentThreadPage();
          $('.readidmsbottom > a[href^="profile.php?action=show"]').each(function(i) {
            let $this2 = $(this);
            let index = inFollowOrBlockUserList(getFloorUserName($this2.text()), Config.blockUserList);
            if (index > -1) {
              let type = Config.blockUserList[index].type;
              if (i === 0 && page === 1 && type > 1) return;
              else if ((i === 0 && page !== 1 || i > 0) && type === 1) return;
              num2++;
              let $floor = $this2.closest(".readtext");
              $floor.prev(".readlou").remove();
              $floor.remove();
            }
          });
          $('.readtext fieldset:has(legend:contains("Quote:"))').each(function() {
            let $this2 = $(this);
            let text = $this2.text();
            for (let data of Config.blockUserList) {
              if (data.type === 1) continue;
              try {
                let regex1 = new RegExp(`^Quote:\u5F15\u7528(\u7B2C\\d+\u697C|\u697C\u4E3B)${data.name}\u4E8E`, "i");
                let regex2 = new RegExp(`^Quote:\u56DE\\s*\\d+\u697C\\(${data.name}\\)\\s*\u7684\u5E16\u5B50`, "i");
                if (regex1.test(text) || regex2.test(text)) {
                  $this2.html(`<legend>Quote:</legend><mark class="pd_custom_tips" title="\u88AB\u5C4F\u853D\u7528\u6237\uFF1A${data.name}">\u8BE5\u7528\u6237\u5DF2\u88AB\u5C4F\u853D</mark>`);
                }
              } catch (ex) {
              }
            }
          });
        } else if (location.pathname === "/guanjianci.php" && Config.blockUserAtTipsEnabled) {
          $(".kf_share1 > tbody > tr > td:last-child").each(function() {
            let $this2 = $(this);
            if (inFollowOrBlockUserList($this2.text(), Config.blockUserList) > -1) {
              num2++;
              $this2.closest("tr").remove();
            }
          });
        }
        if (num2 > 0) console.log(`\u3010\u5C4F\u853D\u7528\u6237\u3011\u5171\u6709${num2}\u4E2A\u5E16\u5B50\u6216\u56DE\u590D\u88AB\u5C4F\u853D`);
      };
      blockThread = function() {
        if (!Config.blockThreadList.length) return;
        const isBlock = function(title, userName, fid = 0) {
          for (let { keyWord, includeUser, excludeUser, includeFid, excludeFid } of Config.blockThreadList) {
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
        const blockRecommendThread = function($area) {
          let tmpNum = 0;
          $area.each(function() {
            let $this2 = $(this);
            let title2 = $this2.attr("title");
            if (!title2) return;
            let matches = /^《(.+)》$/.exec(title2);
            if (matches) {
              if (isBlock(matches[1], "")) {
                tmpNum++;
                $this2.next("br").remove();
                $this2.remove();
              }
            }
          });
          return tmpNum;
        };
        let num = 0;
        if (Info_default.isInHomePage) {
          num += blockRecommendThread($(".rightboxa a"));
          $(".indexlbtc a").each(function() {
            let $this2 = $(this);
            let title2 = $this2.attr("title");
            if (!title2) return;
            let matches = /^《(.+)》$/.exec(title2);
            if (matches) {
              let uname = $this2.attr("uname");
              if (isBlock(matches[1], uname)) {
                num++;
                $this2.parent(".indexlbtc").remove();
              }
            }
          });
        } else if (location.pathname === "/thread.php") {
          num += blockRecommendThread($(".rightboxa a"));
          let fid2 = parseInt($('input[name="f_fid"]:not([value="all"])').val());
          if (!fid2) return;
          $('.threadtit1 a[href^="read.php"]').each(function() {
            let $this2 = $(this);
            if (isBlock($this2.text(), $this2.closest("tr").find("td:last-child > a.bl").text(), fid2)) {
              num++;
              $this2.closest("tr").remove();
            }
          });
        } else if (location.pathname === "/read.php") {
          if (getCurrentThreadPage() !== 1) return;
          let title2 = getThreadTitle();
          if (!title2) return;
          let $userName = $('.readidmsbottom > a[href^="profile.php?action=show"]').eq(0);
          if (!$userName.closest(".readtext").find("> table > tbody > tr > td:nth-child(2) > div > div:nth-child(2) > span:first-child").text().includes("\u697C\u4E3B")) return;
          let userName2 = getFloorUserName($userName.text());
          if (!userName2) return;
          let fid2 = parseInt($('input[name="fid"]:first').val());
          if (!fid2) return;
          if (isBlock(title2, userName2, fid2)) {
            num++;
            let $floor = $userName.closest(".readtext");
            $floor.prev(".readlou").remove();
            $floor.remove();
          }
        } else {
          num += blockRecommendThread($(".rightboxa a"));
        }
        if (num > 0) console.log(`\u3010\u5C4F\u853D\u5E16\u5B50\u3011\u5171\u6709${num}\u4E2A\u5E16\u5B50\u88AB\u5C4F\u853D`);
      };
      addFastNavMenu = function() {
        let $menuBtn = $('#alldiv > .drow:nth-child(2) > .dcol > .topmenuo > .topmenuo1 > .topmenuo3:last-child > a:contains("\u6E38\u620F\u4ECB\u7ECD")');
        if (!$menuBtn.length) return;
        $menuBtn.parent().after(`
<li class="topmenuo3">
  <a href="javascript:;" style="width:100px;">\u5FEB\u6377\u5BFC\u822A</a>
  <ul class="topmenuo2">
      ${Info_default.isInSpecialDomain && !Config.showGuGuZhenInFastNavEnabled ? "" : '<li><a href="fyg_sjcdwj.php?go=play&xl=2" target="_blank">\u5495\u5495\u9547</a></li>'}
      ${Info_default.isInSpecialDomain && !Config.showGuGuZhenInFastNavEnabled ? "" : '<li><a href="fyg_sjcdwj.php?go=play&xl=1" target="_blank">\u5495\u5495\u95472</a></li>'}
      <li><a href="search.php?authorid=${Info_default.uid}">\u6211\u7684\u4E3B\u9898</a></li>
      <li><a href="personal.php?action=post">\u6211\u7684\u56DE\u590D</a></li>
      <li><a href="profile.php?action=favor">\u6536\u85CF</a></li>
      <li><a href="profile.php?action=friend">\u597D\u53CB\u5217\u8868</a></li>
      <li><a href="kf_fw_ig_index.php">\u4E89\u593A\u5956\u52B1</a></li>
      <li><a href="kf_fw_ig_mybp.php">\u6211\u7684\u7269\u54C1</a></li>
      <li><a href="kf_fw_ig_halo.php">\u6218\u529B\u5149\u73AF</a></li>
      <li><a href="kf_fw_ig_shop.php">\u7269\u54C1\u5546\u5E97</a></li>
      ${Info_default.isInSpecialDomain ? '<li><a href="https://m.miaola.work/" target="_blank">\u624B\u673A\u7248</a></li>' : ""}
      ${Const_default.customFastNavMenuContent}
  </ul>
</li>`);
        if (Config.adminMemberEnabled) {
          $('#alldiv > .drow:nth-child(2) > .dcol > .topmenuo > .topmenuo1 > .topmenuo3:nth-last-child(4) > a:contains("\u804A\u5929\u4EA4\u6D41")').next("ul").append(
            '<li><a href="thread.php?fid=93">\u5185\u90E8\u7BA1\u7406\u4E13\u7528</a></li>'
          );
        }
      };
      changeIdColor = function() {
        if (!Config.changeAllAvailableIdColorEnabled && Config.customAutoChangeIdColorList.length <= 1) return;
        const setCookie2 = function() {
          let nextTime = getDate(`+${Config.autoChangeIdColorInterval}h`);
          setCookie(Const_default.autoChangeIdColorCookieName, nextTime.getTime(), nextTime);
        };
        console.log("\u81EA\u52A8\u66F4\u6362ID\u989C\u8272Start");
        $.get("kf_growup.php?t=" + $.now(), function(html2) {
          if (getCookie(Const_default.autoChangeIdColorCookieName)) return;
          let matches = html2.match(/href="kf_growup\.php\?ok=2&safeid=\w+&color=\d+"/g);
          if (matches) {
            let safeId3 = "";
            let safeIdMatches = /safeid=(\w+)&/i.exec(matches[0]);
            if (safeIdMatches) safeId3 = safeIdMatches[1];
            if (!safeId3) {
              setCookie2();
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
              setCookie2();
              return;
            }
            let prevId = parseInt(getValue(Const_default.prevAutoChangeIdColorTmpLogName));
            if (isNaN(prevId) || prevId < 0) prevId = 0;
            let nextId = 0;
            if (Config.autoChangeIdColorType.toLowerCase() === "sequence") {
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
              `kf_growup.php?ok=2&safeid=${safeId3}&color=${nextId}&t=${$.now()}`,
              function(html3) {
                setCookie2();
                showFormatLog("\u81EA\u52A8\u66F4\u6362ID\u989C\u8272", html3);
                let { msg } = getResponseMsg(html3);
                if (/等级颜色修改完毕/.test(msg)) {
                  console.log("ID\u989C\u8272\u66F4\u6362\u4E3A\uFF1A" + nextId);
                  setValue(Const_default.prevAutoChangeIdColorTmpLogName, nextId);
                }
              }
            );
          } else {
            setCookie2();
          }
        });
      };
      showElementTitleTips = function(e, title2) {
        $(".pd_title_tips").remove();
        if (!title2 || !e.originalEvent) return;
        $(`<div class="pd_title_tips">${title2.replace(/\n/g, "<br>")}</div>`).appendTo("body").css("left", e.originalEvent.pageX - 20).css("top", e.originalEvent.pageY + 15);
      };
      bindElementTitleClick = function() {
        let excludeNodeNameList = ["A", "IMG", "INPUT", "BUTTON", "TEXTAREA", "SELECT"];
        $(document).click(function(e) {
          let target = e.target;
          if (!target.title && !excludeNodeNameList.includes(target.nodeName) && target.parentNode && target.parentNode.title)
            target = target.parentNode;
          if (target.title && !excludeNodeNameList.includes(target.nodeName) && (!target.id || !target.id.startsWith("wy_")) && !$(target).is(".pd_editor_btn")) {
            showElementTitleTips(e, target.title);
          } else {
            $(".pd_title_tips").remove();
          }
        });
      };
      bindSearchTypeSelectMenuClick = function() {
        $(document).on("click", ".pd_search_type", function() {
          let $menu = $(this);
          let $searchTypeList = $(".pd_search_type_list");
          if ($searchTypeList.length > 0) {
            $searchTypeList.remove();
            return;
          }
          let type = $menu.data("type");
          $searchTypeList = $(`
<ul class="pd_search_type_list">
  <li>\u6807\u9898</li><li>\u4F5C\u8005</li><li>\u5173\u952E\u8BCD</li><li ${!Config.adminMemberEnabled ? "hidden" : ""}>\u7528\u6237\u540D</li>
</ul>`).appendTo("body");
          let offset = $menu.offset();
          $searchTypeList.css("top", offset.top + $menu.height() + 2).css("left", offset.left + 1);
          if (type === "dialog") {
            $searchTypeList.css({
              "width": "65px",
              "left": offset.left - 1
            });
          }
          $searchTypeList.on("click", "li", function() {
            let $this2 = $(this);
            let type2 = $this2.text().trim();
            let $form = $menu.closest("form");
            let $keyWord = $form.find('input[name="keyword"], input[name="pwuser"]');
            $menu.find("span").text(type2);
            if (type2 !== "\u5173\u952E\u8BCD" && type2 !== "\u7528\u6237\u540D") $form.attr("action", "search.php?");
            if (type2 === "\u4F5C\u8005") $keyWord.attr("name", "pwuser");
            else $keyWord.attr("name", "keyword");
            let $searchRange = $form.find('[name="searchRange"][value="current"]');
            if ($searchRange.length > 0) {
              $searchRange.prop("disabled", type2 === "\u5173\u952E\u8BCD" || type2 === "\u7528\u6237\u540D" || !$searchRange.data("enabled"));
            }
            $searchTypeList.remove();
            $keyWord.focus();
          });
        });
        $(document).on("submit", 'form[name="pdSearchForm"]', function() {
          let $this2 = $(this);
          let type = $.trim($this2.find(".pd_search_type > span").text());
          if (type === "\u5173\u952E\u8BCD") {
            $this2.attr("action", "guanjianci.php?gjc=" + $this2.find('input[name="keyword"]').val());
          } else if (type === "\u7528\u6237\u540D") {
            $this2.attr("action", "profile.php?action=show&username=" + $this2.find('input[name="keyword"]').val());
          }
        });
      };
      makeSearchByBelowTwoKeyWordAvailable = function() {
        $(document).on("submit", 'form[action="search.php?"]', function() {
          let $this2 = $(this);
          let $keyWord = $this2.find('input[name="keyword"]');
          if (!$keyWord.length) return;
          let keyWord2 = $.trim($keyWord.val());
          if (!keyWord2 || getStrByteLen(keyWord2) > 2) return;
          $keyWord.val(keyWord2 + " " + keyWord2);
          setTimeout(() => {
            $keyWord.val(keyWord2);
          }, 200);
        });
      };
      addSearchDialogLink = function() {
        $('<li><a data-name="search" href="#">\u641C\u7D22</a></li>').insertBefore(Info_default.$userMenu.find("> li:nth-last-child(3)")).find('[data-name="search"]').click(function(e) {
          e.preventDefault();
          const dialogName2 = "pdSearchDialog";
          if ($("#" + dialogName2).length > 0) return;
          let html2 = `
<div class="pd_cfg_main">
  <input name="step" value="2" type="hidden">
  <input name="method" value="AND" type="hidden">
  <input name="sch_area" value="0" type="hidden">
  <input name="s_type" value="forum" type="hidden">
  <input name="f_fid" value="all" type="hidden">
  <input name="orderway" value="lastpost" type="hidden">
  <input name="asc" value="DESC" type="hidden">
  <div style="margin-top: 15px;">
    <input class="pd_input" name="keyword" type="search" style="float: left; width: 175px; line-height: 26px;" placeholder="\u5173\u952E\u5B57">
    <div class="pd_search_type" data-type="dialog"><span>\u6807\u9898</span><i>\u2228</i></div>
    <button class="indloginm" name="submit" type="submit">\u641C\u7D22</button>
  </div>
  <div style="margin-bottom: 8px; line-height: 35px;">
    <label><input name="searchRange" type="radio" value="all" checked> \u5168\u7AD9 </label>
    <label><input name="searchRange" type="radio" value="current" disabled> \u672C\u7248</label>
  </div>
</div>`;
          let $dialog2 = create(dialogName2, "\u641C\u7D22", html2);
          $dialog2.closest("form").attr({
            "name": "pdSearchForm",
            "action": "search.php?",
            "method": "post",
            "target": "_blank"
          }).off("submit");
          let fid2 = parseInt($('input[name="f_fid"]:not([value="all"]), input[name="fid"]:first').val());
          if (fid2) {
            $dialog2.find('[name="searchRange"]').click(function() {
              let $this2 = $(this);
              $dialog2.find('input[name="f_fid"]').val($this2.val() === "current" ? fid2 : "all");
            });
            $dialog2.find('[name="searchRange"][value="current"]').prop("disabled", false).data("enabled", true).click();
          }
          $dialog2.keydown(function(e2) {
            if (e2.keyCode === 27) {
              $(".pd_search_type_list").remove();
            }
          }).find("h1 > span").click(function() {
            $(".pd_search_type_list").remove();
          });
          show2(dialogName2);
          $dialog2.find('[name="keyword"]').focus();
        });
      };
      repairBbsErrorCode = function() {
        Info_default.w.is_ie = false;
        if (location.pathname === "/read.php") Info_default.w.strlen = getStrByteLen;
      };
      turnPageViaKeyboard = function() {
        $(document).keydown(function(e) {
          if (e.keyCode !== 37 && e.keyCode !== 39) return;
          if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
          let $page = $(".pages:first");
          let $curPage = $page.find('li > a[href="javascript:;"]');
          if (!$curPage.length) return;
          let curPage = getCurrentThreadPage();
          let url = "";
          if (e.keyCode === 37) {
            if (curPage <= 1) return;
            url = $page.find('li > a:contains("\u4E0A\u4E00\u9875")').attr("href");
          } else {
            let matches = /&page=(\d+)/.exec($page.find("li:last-child > a").attr("href"));
            if (!matches) return;
            if (curPage >= parseInt(matches[1])) return;
            url = $page.find('li > a:contains("\u4E0B\u4E00\u9875")').attr("href");
          }
          location.href = url;
        });
      };
      showCommonImportOrExportConfigDialog = function(title2, configName, callback, callbackAfterSubmit) {
        const dialogName2 = "pdCommonImOrExConfigDialog";
        if ($("#" + dialogName2).length > 0) return;
        read3();
        let html2 = `
<div class="pd_cfg_main">
  <div>
    <strong>\u5BFC\u5165\u8BBE\u7F6E\uFF1A</strong>\u5C06\u8BBE\u7F6E\u5185\u5BB9\u7C98\u8D34\u5230\u6587\u672C\u6846\u4E2D\u5E76\u70B9\u51FB\u4FDD\u5B58\u6309\u94AE\u5373\u53EF<br>
    <strong>\u5BFC\u51FA\u8BBE\u7F6E\uFF1A</strong>\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u522B\u5904\u5373\u53EF
  </div>
  <textarea name="commonConfig" style="width: 500px; height: 300px; word-break: break-all;"></textarea>
</div>
<div class="pd_cfg_btns">
  <span class="pd_cfg_about"></span>
  <button type="submit">\u4FDD\u5B58</button>
  <button data-action="close" type="button">\u53D6\u6D88</button>
</div>`;
        let $dialog2 = create(dialogName2, `\u5BFC\u5165\u6216\u5BFC\u51FA${title2}`, html2);
        let settings = $.type(configName) === "object" ? configName.read() : Config[configName];
        $dialog2.submit(function(e) {
          e.preventDefault();
          if (!confirm("\u662F\u5426\u5BFC\u5165\u6587\u672C\u6846\u4E2D\u7684\u8BBE\u7F6E\uFF1F")) return;
          let options = $.trim($dialog2.find('[name="commonConfig"]').val());
          if (!options) return;
          try {
            options = JSON.parse(options);
          } catch (ex) {
            alert("\u8BBE\u7F6E\u6709\u9519\u8BEF");
            return;
          }
          if (!options || $.type(options) !== $.type(settings)) {
            alert("\u8BBE\u7F6E\u6709\u9519\u8BEF");
            return;
          }
          if ($.type(configName) === "object") {
            configName.write(options);
          } else {
            Config[configName] = options;
            write3();
          }
          alert("\u8BBE\u7F6E\u5DF2\u5BFC\u5165");
          close(dialogName2);
          if (typeof callbackAfterSubmit === "function") callbackAfterSubmit();
          else location.reload();
        });
        show2(dialogName2);
        $dialog2.find('[name="commonConfig"]').val(JSON.stringify(settings)).select().focus();
        if (typeof callback === "function") callback($dialog2);
        runFunc("Public.showCommonImportOrExportConfigDialog_after_", { title: title2, configName });
      };
      showCommonImportOrExportLogDialog = function({ name: name4, read: read4, write: write4, merge, callback, callbackAfterSubmit }) {
        const dialogName2 = "pdCommonImOrExLogDialog";
        if ($("#" + dialogName2).length > 0) return;
        let log2 = read4();
        let html2 = `
<div class="pd_cfg_main">
  <strong>\u5BFC\u5165${name4}\uFF1A</strong>\u5C06${name4}\u5185\u5BB9\u7C98\u8D34\u5230\u6587\u672C\u6846\u4E2D\u5E76\u70B9\u51FB\u5408\u5E76\u6216\u8986\u76D6\u6309\u94AE\u5373\u53EF<br>
  <strong>\u5BFC\u51FA${name4}\uFF1A</strong>\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u522B\u5904\u5373\u53EF<br>
  <textarea name="log" style="width: 600px; height: 400px; word-break: break-all;"></textarea>
</div>
<div class="pd_cfg_btns">
  <button name="merge" type="button" ${typeof merge !== "function" ? "hidden" : ""}>\u5408\u5E76\u8BB0\u5F55</button>
  <button name="overwrite" type="button" style="color: #f00;">\u8986\u76D6\u8BB0\u5F55</button>
  <button data-action="close" type="button">\u5173\u95ED</button>
</div>`;
        let $dialog2 = create(dialogName2, `\u5BFC\u5165\u6216\u5BFC\u51FA${name4}`, html2);
        $dialog2.find('[name="merge"], [name="overwrite"]').click(function(e) {
          e.preventDefault();
          let action = $(this).attr("name");
          if (!confirm(`\u662F\u5426\u5C06\u6587\u672C\u6846\u4E2D\u7684${name4}${action === "overwrite" ? "\u8986\u76D6" : "\u5408\u5E76"}\u5230\u672C\u5730\uFF1F`)) return;
          let newLog = $.trim($dialog2.find('[name="log"]').val());
          if (!newLog) return;
          try {
            newLog = JSON.parse(newLog);
          } catch (ex) {
            alert(`${name4}\u6709\u9519\u8BEF`);
            return;
          }
          if (!newLog || $.type(newLog) !== "object") {
            alert(`${name4}\u6709\u9519\u8BEF`);
            return;
          }
          if (action === "merge" && typeof merge === "function") log2 = merge(log2, newLog);
          else log2 = newLog;
          write4(log2);
          alert(`${name4}\u5DF2\u5BFC\u5165`);
          if (typeof callbackAfterSubmit === "function") callbackAfterSubmit();
          else location.reload();
        });
        show2(dialogName2);
        $dialog2.find('[name="log"]').val(JSON.stringify(log2)).select().focus();
        if (typeof callback === "function") callback($dialog2);
        runFunc("Public.showCommonImportOrExportLogDialog_after_", { name: name4, read: read4, write: write4, merge });
      };
      changeNewTipsColor = function() {
        let $msgTips = $("#pdUserName").find("span:first");
        if (!$msgTips.length) return;
        $msgTips.addClass("pd_new_tips");
        if (Info_default.$userMenu.find('a[href="message.php"]:contains("\u6709\u65B0\u6D88\u606F")').length > 0) {
          $msgTips.attr("id", "pdNewMsgTips").css({ "color": "#0099cc" });
        } else if (Info_default.$userMenu.find('a[href^="guanjianci.php?gjc="]:contains("\u6709\u4EBA@\u6211")').length > 0) {
          $msgTips.attr("id", "pdNewReplyTips");
        } else if (Info_default.$userMenu.find('a[href="kf_fw_1wkfb.php?ping=3"]:contains("\u6709\u65B0\u8BC4\u5206")').length > 0) {
          $msgTips.attr("id", "pdNewRateTips").css({ "color": "#5cb85c" });
        }
      };
      addSlowActionChecked = function($area) {
        $(`
<label style="margin-right: 5px;">
  <input name="slowActionEnabled" type="checkbox" ${Config.slowActionEnabled ? "checked" : ""}> \u6162\u901F\u64CD\u4F5C
  <span class="pd_cfg_tips" title="\u5EF6\u957F\u90E8\u5206\u6279\u91CF\u64CD\u4F5C\u7684\u65F6\u95F4\u95F4\u9694\uFF08\u57283~7\u79D2\u4E4B\u95F4\uFF09\uFF0C\u5982\u4F7F\u7528\u9053\u5177\u3001\u6253\u5F00\u76D2\u5B50\u7B49">[?]</span>
</label>
`).prependTo($area).find('input[name="slowActionEnabled"]').click(function() {
          let checked = $(this).prop("checked");
          $('input[name="slowActionEnabled"]').not(this).prop("checked", checked);
          if (Config.slowActionEnabled !== checked) {
            read3();
            Config.slowActionEnabled = checked;
            write3();
          }
        });
      };
      modifyDomainTips = function() {
        $("#alldiv > .drow:first-child").has('div:contains("\u4E3B\u57DF\u540D\u66F4\u6362")').insertBefore("#alldiv > .drow:last-child").addClass("pd_domain_tips").parent().find("> .drow:first-child").css("margin-top", "40px");
      };
    }
  });

  // src/module/Dialog.js
  var Dialog_exports = {};
  __export(Dialog_exports, {
    close: () => close,
    create: () => create,
    resize: () => resize,
    show: () => show2
  });
  var create, show2, resize, close;
  var init_Dialog = __esm({
    "src/module/Dialog.js"() {
      "use strict";
      init_Info();
      init_Util();
      init_Public();
      create = function(id, title2, content, style = "") {
        let html2 = `
<form>
<div class="pd_cfg_box" id="${id}" style="${style}">
  <h1>${title2}<span data-action="close">&times;</span></h1>
  ${content}
</div>
</form>`;
        let $dialog2 = $(html2).appendTo("body");
        $dialog2.on("click", ".pd_cfg_tips", function(e) {
          if (Info_default.isMobile) showElementTitleTips(e, this.title);
          return false;
        }).on("click", "a.pd_disabled_link", () => false).on("click", '[data-action="close"]', () => close(id)).keydown(function(e) {
          if (e.keyCode === 27) {
            return close(id);
          }
        }).find('legend [type="checkbox"]').click(function() {
          let $this2 = $(this);
          let checked = $this2.prop("checked");
          if (isOpera() || isEdge())
            $this2.closest("fieldset").find("input, select, textarea, button").not("legend input").prop("disabled", !checked);
          else $this2.closest("fieldset").prop("disabled", !checked);
        }).end().find("input[data-disabled]").click(function() {
          let $this2 = $(this);
          let checked = $this2.prop("checked");
          $($this2.data("disabled")).each(function() {
            let $this3 = $(this);
            if ($this3.is("a")) {
              if (checked) $this3.removeClass("pd_disabled_link");
              else $this3.addClass("pd_disabled_link");
            } else {
              $this3.prop("disabled", !checked);
            }
          });
        }).end().find("input[data-mutex]").click(function() {
          let $this2 = $(this);
          let checked = $this2.prop("checked");
          $($this2.data("mutex")).each(function() {
            let $this3 = $(this);
            if ($this3.is("a")) {
              if (checked) $this3.addClass("pd_disabled_link");
              else $this3.removeClass("pd_disabled_link");
            } else {
              $this3.prop("disabled", checked);
            }
          });
        });
        if (!Info_default.isMobile) {
          $(window).on("resize." + id, () => resize(id));
        }
        return $dialog2;
      };
      show2 = function(id) {
        let $dialog2 = $("#" + id);
        if (!$dialog2.length) return;
        $dialog2.find('legend [type="checkbox"]').each(function() {
          $(this).triggerHandler("click");
        }).end().find("input[data-disabled], input[data-mutex]").each(function() {
          $(this).triggerHandler("click");
        });
        $dialog2.fadeIn("fast");
        resize(id);
        $dialog2.find("input:first, select:first, a:first, textarea:first, button:first").eq(0).focus();
      };
      resize = function(id) {
        let $dialog2 = $("#" + id);
        let windowHeight = $(window).height();
        $dialog2.find(".pd_cfg_main").css("max-height", windowHeight - 80);
        let dialogWidth = $dialog2.outerWidth(), windowWidth = $(window).width();
        let left = windowWidth / 2 - dialogWidth / 2;
        if (left + dialogWidth > windowWidth) left = windowWidth - dialogWidth - 20;
        if (left < 0) left = 0;
        let top = windowHeight / 2 - $dialog2.outerHeight() / 2;
        if (top < 0) top = 0;
        $dialog2.css({ top, left });
      };
      close = function(id) {
        $("#" + id).fadeOut("fast", function() {
          $(this).parent("form").remove();
        });
        if (!Info_default.isMobile) {
          $(window).off("resize." + id);
        }
        return false;
      };
    }
  });

  // src/module/Item.js
  var Item_exports = {};
  __export(Item_exports, {
    addCommonArmsButton: () => addCommonArmsButton,
    addSavedArmsInfo: () => addSavedArmsInfo,
    armClassList: () => armClassList,
    armGroupList: () => armGroupList,
    armTypeList: () => armTypeList,
    autoOpenBoxes: () => autoOpenBoxes,
    bindArmLinkClickEvent: () => bindArmLinkClickEvent,
    boxTypeList: () => boxTypeList,
    buyItems: () => buyItems,
    clearArmsInfo: () => clearArmsInfo,
    getArmClassNameByGroupName: () => getArmClassNameByGroupName,
    getArmInfo: () => getArmInfo,
    getArmParameterSetting: () => getArmParameterSetting,
    getArmsLevelInfo: () => getArmsLevelInfo,
    getItemsUsedNumInfo: () => getItemsUsedNumInfo,
    getLevelByName: () => getLevelByName,
    getMergeArmsInfo: () => getMergeArmsInfo,
    getNextObjects: () => getNextObjects,
    handleArmArea: () => handleArmArea,
    handleUselessSubProperties: () => handleUselessSubProperties,
    init: () => init2,
    itemTypeList: () => itemTypeList,
    openBoxes: () => openBoxes,
    readArmsInfo: () => readArmsInfo,
    sellItems: () => sellItems,
    showArmsFinalAddition: () => showArmsFinalAddition,
    showBuyItemTips: () => showBuyItemTips,
    showMyInfoInItemShop: () => showMyInfoInItemShop,
    smeltArms: () => smeltArms,
    sortArmsByGroup: () => sortArmsByGroup,
    sortArmsById: () => sortArmsById,
    useItems: () => useItems,
    writeArmsInfo: () => writeArmsInfo
  });
  var $boxArea, $armArea2, $itemArea, safeId2, boxTypeList, armClassList, armGroupList, armTypeList, itemTypeList, init2, getNextObjects, addBatchOpenBoxesLink, addOpenAllBoxesButton, showOpenAllBoxesDialog, autoOpenBoxes, openBoxes, showArmsFinalAdditionAfterOpenBoxes, myArmsInfoName, readArmsInfo, writeArmsInfo, clearArmsInfo, getMergeArmsInfo, addSavedArmsInfo, removeSavedArmInfo, handleArmArea, sortArmsByGroup, sortArmsById, bindArmLinkClickEvent, showArmInfoDialog, armPropertyKeyList, getArmParameterSetting, handleUselessSubProperties, addArmsButton, addCommonArmsButton, showArmsFinalAddition, showBatchSmeltArmsDialog, smeltArms, getArmClassNameByGroupName, getArmInfo, getArmsLevelInfo, getLevelByName, getItemsUsedNumInfo, addBatchUseAndSellItemsButton, showBatchUseAndSellItemsDialog, useItems, sellItems, buyItems, showMyInfoInItemShop, showBuyItemTips;
  var init_Item = __esm({
    "src/module/Item.js"() {
      "use strict";
      init_Info();
      init_Util();
      init_Msg();
      init_Dialog();
      init_Const();
      init_Config();
      init_Log();
      init_Script();
      init_Public();
      init_Loot();
      boxTypeList = ["\u666E\u901A\u76D2\u5B50", "\u5E78\u8FD0\u76D2\u5B50", "\u7A00\u6709\u76D2\u5B50", "\u4F20\u5947\u76D2\u5B50", "\u795E\u79D8\u76D2\u5B50"];
      armClassList = ["\u6B66\u5668", "\u62A4\u7532", "\u9879\u94FE"];
      armGroupList = ["\u957F\u5251", "\u77ED\u5F13", "\u6CD5\u6756", "\u94E0\u7532", "\u76AE\u7532", "\u5E03\u7532"];
      armTypeList = ["\u666E\u901A\u7684\u88C5\u5907", "\u5E78\u8FD0\u7684\u88C5\u5907", "\u7A00\u6709\u7684\u88C5\u5907", "\u4F20\u5947\u7684\u88C5\u5907", "\u795E\u79D8\u7684\u88C5\u5907"];
      itemTypeList = [
        "\u96F6\u65F6\u8FF7\u5B50\u7684\u788E\u7247",
        "\u88AB\u9057\u5F03\u7684\u544A\u767D\u4FE1",
        "\u5B66\u6821\u5929\u53F0\u7684\u94A5\u5319",
        "TMA\u6700\u65B0\u4F5C\u538B\u7F29\u5305",
        "LOLI\u7684\u94B1\u5305",
        "\u68D2\u68D2\u7CD6",
        "\u857E\u7C73\u8389\u4E9A\u540C\u4EBA\u6F2B\u753B",
        "\u5341\u516D\u591C\u540C\u4EBA\u6F2B\u753B",
        "\u6863\u6848\u5BA4\u94A5\u5319",
        "\u50B2\u5A07LOLI\u5A07\u86EE\u97F3CD",
        "\u6574\u5F62\u4F18\u60E0\u5377",
        "\u6D88\u901D\u4E4B\u836F"
      ];
      init2 = function() {
        safeId2 = getSafeId();
        if (!safeId2) return;
        $boxArea = $(".kf_fw_ig1:eq(0)");
        $boxArea.attr("id", "pdBoxArea");
        $armArea2 = $(".kf_fw_ig4:eq(0)");
        $armArea2.attr("id", "pdArmArea");
        $itemArea = $(".kf_fw_ig1:eq(1)");
        $itemArea.attr("id", "pdItemArea");
        addBatchOpenBoxesLink();
        addOpenAllBoxesButton();
        if (Config.autoSaveArmsInfoEnabled) {
          addSavedArmsInfo($armArea2);
        }
        handleArmArea($armArea2);
        bindArmLinkClickEvent($armArea2, safeId2);
        addArmsButton();
        addBatchUseAndSellItemsButton();
      };
      getNextObjects = function(sequence = 1, callback = null) {
        console.log("\u83B7\u53D6\u4E0B\u4E00\u6279\u7269\u54C1Start");
        $.ajax({
          type: "GET",
          url: "kf_fw_ig_mybp.php?t=" + $.now(),
          timeout: Const_default.defAjaxTimeout,
          async: !Config.autoSaveArmsInfoEnabled
        }).done(function(html2) {
          for (let index = 1; index <= 2; index++) {
            let matches = null;
            if (index === 1) {
              matches = /<tr><td width="\d+%">装备.+?\r\n(<tr.+?<\/tr>)<tr><td colspan="4">/.exec(html2);
            } else {
              matches = /<tr><td width="\d+%">使用.+?\r\n(<tr.+?<\/tr>)<tr><td colspan="4">/.exec(html2);
            }
            if (!matches) continue;
            let trMatches = matches[1].match(/<tr(.+?)<\/tr>/g);
            let $area = index === 1 ? $armArea2 : $itemArea;
            let addHtml = "";
            let newArmsInfo = { "\u5DF2\u88C5\u5907\u6B66\u5668": 0, "\u5DF2\u88C5\u5907\u62A4\u7532": 0, "\u4E0A\u6B21\u8BB0\u5F55\u7684\u6700\u65B0\u88C5\u5907": 0, "\u4E0A\u6B21\u8BB0\u5F55\u7684\u65F6\u95F4": 0, "\u88C5\u5907\u5217\u8868": {} };
            for (let i in trMatches) {
              let idMatches = /"wp_(\d+)"/.exec(trMatches[i]);
              if (!idMatches) continue;
              let id = parseInt(idMatches[1]);
              if (!$area.has(`[id="wp_${id}"]`).length) {
                addHtml += trMatches[i];
              }
              if (index === 1) {
                newArmsInfo["\u88C5\u5907\u5217\u8868"][id] = trMatches[i];
                let equippedArmMatches = /<tr id="wp_(\d+)">.+?（装备中）<span[^<>]*>[^<>]+的([^<>]+)<\/span>/.exec(trMatches[i]);
                if (equippedArmMatches) {
                  let equippedArmId = parseInt(equippedArmMatches[1]);
                  let armClassName = getArmClassNameByGroupName(equippedArmMatches[2]);
                  if (armClassName) {
                    newArmsInfo[`\u5DF2\u88C5\u5907${armClassName}`] = equippedArmId;
                  }
                }
              }
            }
            if (index === 1 && Config.autoSaveArmsInfoEnabled) {
              let armsInfo = readArmsInfo();
              if (newArmsInfo["\u5DF2\u88C5\u5907\u6B66\u5668"] > 0) armsInfo["\u5DF2\u88C5\u5907\u6B66\u5668"] = newArmsInfo["\u5DF2\u88C5\u5907\u6B66\u5668"];
              if (newArmsInfo["\u5DF2\u88C5\u5907\u62A4\u7532"] > 0) armsInfo["\u5DF2\u88C5\u5907\u62A4\u7532"] = newArmsInfo["\u5DF2\u88C5\u5907\u62A4\u7532"];
              $.extend(armsInfo["\u88C5\u5907\u5217\u8868"], newArmsInfo["\u88C5\u5907\u5217\u8868"]);
              writeArmsInfo(armsInfo);
            }
            if (addHtml) {
              if (sequence === 2) {
                $area.find("> tbody > tr:last-child").before(addHtml);
              } else {
                $area.find("> tbody > tr:nth-child(2)").after(addHtml);
              }
              if (index === 1) {
                handleArmArea($armArea2);
              }
            }
          }
          if (typeof callback === "function") callback();
        }).fail(function() {
          setTimeout(() => getNextObjects(sequence, callback), Const_default.defAjaxInterval);
        });
      };
      addBatchOpenBoxesLink = function() {
        $boxArea = $(".kf_fw_ig1:first");
        $boxArea.find('> tbody > tr:nth-child(3) > td > a[onclick^="dkhz"]').each(function() {
          let $this2 = $(this);
          let matches = /dkhz\('(\d+)'\)/.exec($this2.attr("onclick"));
          if (!matches) return;
          $this2.after(`<a class="pd_highlight" href="#" data-name="openBoxes" data-id="${matches[1]}" style="margin-left: 10px;">\u6279\u91CF\u6253\u5F00</a>`);
        });
        $boxArea.on("click", 'a[data-name="openBoxes"]', function(e) {
          e.preventDefault();
          let $this2 = $(this);
          let id = parseInt($this2.data("id"));
          let $info = $boxArea.find(`> tbody > tr:nth-child(2) > td:nth-child(${id})`);
          let boxType = $info.find("span:first").text().trim() + "\u76D2\u5B50";
          if (!boxTypeList.includes(boxType)) return;
          let currentNum = parseInt($info.find("span:last").text());
          let num2 = parseInt(prompt(`\u4F60\u8981\u6253\u5F00\u591A\u5C11\u4E2A\u3010${boxType}\u3011\uFF1F`, currentNum));
          if (!num2 || num2 < 0) return;
          destroy();
          if (Config.autoSaveArmsInfoEnabled) {
            getNextObjects(1);
          }
          openBoxes({ id, boxType, num: num2, safeId: safeId2 });
        });
      };
      addOpenAllBoxesButton = function() {
        $(`
<div class="pd_item_btns" data-name="openBoxesBtns">
  <label>
    <input name="autoSaveArmsInfoEnabled" type="checkbox" ${Config.autoSaveArmsInfoEnabled ? "checked" : ""}> \u4FDD\u5B58\u88C5\u5907\u4FE1\u606F</input>
    <span class="pd_cfg_tips" title="\u5728\u6279\u91CF\u6253\u5F00\u76D2\u5B50\u65F6\u81EA\u52A8\u4FDD\u5B58\u88C5\u5907\u4FE1\u606F\uFF0C\u53EF\u7A81\u7834\u88C5\u5907\u80CC\u5305\u6700\u591A\u663E\u793A10\u4EF6\u7684\u9650\u5236">[?]</span>
  </label>
  <button name="clearMsg" type="button" title="\u6E05\u9664\u9875\u9762\u4E0A\u6240\u6709\u7684\u6D88\u606F\u548C\u64CD\u4F5C\u7ED3\u679C">\u6E05\u9664\u6D88\u606F</button>
  <button name="openAllBoxes" type="button" style="color: #f00;" title="\u6253\u5F00\u5168\u90E8\u76D2\u5B50">\u4E00\u952E\u5F00\u76D2</button>
</div>
`).insertAfter($boxArea).find('[name="autoSaveArmsInfoEnabled"]').click(function() {
          let checked = $(this).prop("checked");
          if (Config.autoSaveArmsInfoEnabled !== checked) {
            read3();
            Config.autoSaveArmsInfoEnabled = checked;
            write3();
          }
        }).end().find('[name="clearMsg"]').click(function() {
          destroy();
          $(".pd_result").remove();
        }).end().find('[name="openAllBoxes"]').click(showOpenAllBoxesDialog);
        addSlowActionChecked($('.pd_item_btns[data-name="openBoxesBtns"]'));
      };
      showOpenAllBoxesDialog = function() {
        const dialogName2 = "pdOpenAllBoxesDialog";
        if ($("#" + dialogName2).length > 0) return;
        destroy();
        read3();
        let boxTypesOptionHtml = "";
        for (let boxName of boxTypeList.slice(0, 4)) {
          boxTypesOptionHtml += `<option>${boxName}</option>`;
        }
        let armTypesCheckedHtml = "";
        for (let group of armGroupList) {
          armTypesCheckedHtml += `<li><b>${group}\uFF1A</b>`;
          for (let type of armTypeList) {
            let prefix = type.split("\u7684")[0];
            if (prefix === "\u795E\u79D8") continue;
            let name4 = `${prefix}\u7684${group}`;
            armTypesCheckedHtml += `
<label style="margin-right: 5px;">
  <input type="checkbox" name="smeltArmsType" value="${name4}" ${Config.defSmeltArmTypeList.includes(name4) ? "checked" : ""}> ${prefix}
</label>`;
          }
          armTypesCheckedHtml += "</li>";
        }
        let itemTypesOptionHtml = "";
        for (let itemName of itemTypeList.slice(6)) {
          itemTypesOptionHtml += `<option>${itemName}</option>`;
        }
        let html2 = `
<div class="pd_cfg_main">
  <fieldset style="margin-top: 5px;">
    <legend>\u8BF7\u9009\u62E9\u60F3\u6279\u91CF\u6253\u5F00\u7684\u76D2\u5B50\u79CD\u7C7B\uFF08\u6309<b>Ctrl\u952E</b>\u6216<b>Shift\u952E</b>\u53EF\u591A\u9009\uFF09\uFF1A</legend>
    <select name="openBoxesTypes" size="4" style="width: 320px;" multiple>${boxTypesOptionHtml}</select>
  </fieldset>
  <div style="margin-top: 5px;"><b>\u8BF7\u9009\u62E9\u6279\u91CF\u6253\u5F00\u76D2\u5B50\u540E\u60F3\u8981\u8FDB\u884C\u7684\u64CD\u4F5C\uFF08\u5982\u65E0\u9700\u64CD\u4F5C\u53EF\u4E0D\u7528\u52FE\u9009\uFF09\uFF1A</b></div>
  <fieldset>
    <legend>
      <label><input name="smeltArmsAfterOpenBoxesEnabled" type="checkbox"> \u7194\u70BC\u88C5\u5907</label>
    </legend>
    <div>\u8BF7\u9009\u62E9\u60F3\u6279\u91CF\u7194\u70BC\u7684\u88C5\u5907\u79CD\u7C7B\uFF1A</div>
    <ul data-name="smeltArmTypeList">${armTypesCheckedHtml}</ul>
    <div>
      <a class="pd_btn_link" href="#" data-name="selectAll">\u5168\u9009</a>
      <a class="pd_btn_link" href="#" data-name="selectInverse">\u53CD\u9009</a>
    </div>
  </fieldset>
  <fieldset>
    <legend>
      <label><input name="useItemsAfterOpenBoxesEnabled" type="checkbox"> \u4F7F\u7528\u9053\u5177</label>
    </legend>
    <div>\u8BF7\u9009\u62E9\u60F3\u6279\u91CF\u4F7F\u7528\u7684\u9053\u5177\u79CD\u7C7B\uFF08\u6309<b>Ctrl\u952E</b>\u6216<b>Shift\u952E</b>\u53EF\u591A\u9009\uFF09\uFF1A</div>
    <select name="useItemTypes" size="6" style="width: 320px;" multiple>${itemTypesOptionHtml}</select>
  </fieldset>
  <fieldset>
    <legend>
      <label><input name="sellItemsAfterOpenBoxesEnabled" type="checkbox"> \u51FA\u552E\u9053\u5177</label>
    </legend>
    <div>\u8BF7\u9009\u62E9\u60F3\u6279\u91CF\u51FA\u552E\u7684\u9053\u5177\u79CD\u7C7B\uFF08\u6309<b>Ctrl\u952E</b>\u6216<b>Shift\u952E</b>\u53EF\u591A\u9009\uFF09\uFF1A</div>
    <select name="sellItemTypes" size="6" style="width: 320px;" multiple>${itemTypesOptionHtml}</select>
  </fieldset>
  <div style="margin-top: 5px;">
    <label>
      <input name="showArmsFinalAdditionAfterOpenBoxesEnabled" type="checkbox"> \u5728\u4E00\u952E\u5F00\u76D2\u540E\u663E\u793A\u88C5\u5907\u6700\u7EC8\u52A0\u6210
      <span class="pd_cfg_tips" title="\u5728\u4E00\u952E\u5F00\u76D2\uFF08\u5E76\u6267\u884C\u540E\u7EED\u64CD\u4F5C\uFF09\u540E\u663E\u793A\u5F53\u524D\u9875\u9762\u4E0A\u88C5\u5907\u7684\u6700\u7EC8\u52A0\u6210\u4FE1\u606F">[?]</span>
    </label>
  </div>
</div>
<div class="pd_cfg_btns">
  <button name="open" type="button" style="color: #f00;">\u4E00\u952E\u5F00\u76D2</button>
  <button name="save" type="button">\u4FDD\u5B58\u8BBE\u7F6E</button>
  <button data-action="close" type="button">\u5173\u95ED</button>
</div>`;
        let $dialog2 = create(dialogName2, "\u4E00\u952E\u5F00\u76D2", html2);
        let $smeltArmTypeList = $dialog2.find('ul[data-name="smeltArmTypeList"]');
        const saveSettings = function() {
          read3();
          let tmpBoxTypeList = $dialog2.find('select[name="openBoxesTypes"]').val();
          if (!Array.isArray(tmpBoxTypeList)) tmpBoxTypeList = [];
          Config.defOpenBoxTypeList = tmpBoxTypeList;
          $dialog2.find('[type="checkbox"]').each(function() {
            let $this2 = $(this);
            let name4 = $this2.attr("name");
            if (name4 in Config) {
              Config[name4] = Boolean($this2.prop("checked"));
            }
          });
          if (Config.smeltArmsAfterOpenBoxesEnabled) {
            let typeList = [];
            $smeltArmTypeList.find('input[name="smeltArmsType"]:checked').each(function() {
              typeList.push($(this).val());
            });
            if (typeList.length > 0) Config.defSmeltArmTypeList = typeList;
            else Config.smeltArmsAfterOpenBoxesEnabled = false;
          }
          if (Config.useItemsAfterOpenBoxesEnabled) {
            let typeList = $dialog2.find('select[name="useItemTypes"]').val();
            if (Array.isArray(typeList)) Config.defUseItemTypeList = typeList;
            else Config.useItemsAfterOpenBoxesEnabled = false;
          }
          if (Config.sellItemsAfterOpenBoxesEnabled) {
            let typeList = $dialog2.find('select[name="sellItemTypes"]').val();
            if (Array.isArray(typeList)) Config.defSellItemTypeList = typeList;
            else Config.sellItemsAfterOpenBoxesEnabled = false;
          }
          write3();
        };
        $dialog2.find('[name="open"]').click(function() {
          if (!$dialog2.find('select[name="openBoxesTypes"]').val()) {
            alert("\u672A\u9009\u62E9\u76D2\u5B50\u79CD\u7C7B");
            return;
          }
          if (!confirm("\u662F\u5426\u4E00\u952E\u5F00\u76D2\uFF08\u5E76\u6267\u884C\u6240\u9009\u64CD\u4F5C\uFF09\uFF1F")) return;
          saveSettings();
          close(dialogName2);
          if (Config.autoSaveArmsInfoEnabled) {
            getNextObjects(1);
          }
          $(document).clearQueue("OpenAllBoxes");
          $boxArea.find("> tbody > tr:nth-child(2) > td").each(function(index) {
            let $this2 = $(this);
            let boxType = $this2.find("span:first").text().trim() + "\u76D2\u5B50";
            if (!Config.defOpenBoxTypeList.includes(boxType)) return;
            let num2 = parseInt($this2.find("span:last").text());
            if (!num2 || num2 < 0) return;
            let id = parseInt($boxArea.find(`> tbody > tr:nth-child(3) > td:nth-child(${index + 1}) > a[data-name="openBoxes"]`).data("id"));
            if (!id) return;
            $(document).queue("OpenAllBoxes", () => openBoxes({ id, boxType, num: num2, safeId: safeId2, nextActionEnabled: true }));
          });
          $(document).dequeue("OpenAllBoxes");
        }).end().find('[name="save"]').click(function() {
          saveSettings();
          alert("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58");
        }).end().find('a[data-name="selectAll"]').click(() => selectAll($smeltArmTypeList.find('input[name="smeltArmsType"]'))).end().find('a[data-name="selectInverse"]').click(() => selectInverse($smeltArmTypeList.find('input[name="smeltArmsType"]')));
        $dialog2.on("keydown", 'select[name$="Types"]', (function(e) {
          if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            $(this).children().prop("selected", true);
          }
        })).find('[type="checkbox"]').each(function() {
          let $this2 = $(this);
          let name4 = $this2.attr("name");
          if (name4 in Config) {
            $this2.prop("checked", Config[name4] === true);
          }
        });
        $dialog2.find('select[name$="Types"]').each(function(index) {
          let $this2 = $(this);
          let typeList = Config.defOpenBoxTypeList;
          if (index === 1) typeList = Config.defUseItemTypeList;
          else if (index === 2) typeList = Config.defSellItemTypeList;
          $this2.find("option").each(function() {
            let $this3 = $(this);
            if (typeList.includes($this3.val())) {
              $this3.prop("selected", true);
            }
          });
        });
        show2(dialogName2);
        runFunc("Item.showOpenAllBoxes_after_");
      };
      autoOpenBoxes = function() {
        let safeId3 = getSafeId();
        if (!safeId3) {
          $(document).dequeue("AutoAction");
          return;
        }
        $(document).clearQueue("OpenAllBoxes");
        $boxArea.find("> tbody > tr:nth-child(2) > td").each(function(index) {
          let $this2 = $(this);
          let boxType = $this2.find("span:first").text().trim() + "\u76D2\u5B50";
          if (!Config.defOpenBoxTypeList.includes(boxType)) return;
          let num2 = parseInt($this2.find("span:last").text());
          if (!num2 || num2 < 0) return;
          let id = parseInt($boxArea.find(`> tbody > tr:nth-child(3) > td:nth-child(${index + 1}) > a[data-name="openBoxes"]`).data("id"));
          if (!id) return;
          $(document).queue("OpenAllBoxes", () => openBoxes({ id, boxType, num: num2, safeId: safeId3, nextActionEnabled: true }));
        });
        $(document).dequeue("OpenAllBoxes");
        $(document).dequeue("AutoAction");
      };
      openBoxes = function({ id, boxType, num: num2, safeId: safeId3, nextActionEnabled = false }) {
        let successNum = 0, failNum = 0, index = 0;
        let randomTotalNum = 0, randomTotalCount = 0;
        let isStop = false;
        let stat = { "KFB": 0, "\u7ECF\u9A8C\u503C": 0, "\u9053\u5177": 0, "\u88C5\u5907": 0, item: {}, arm: {} };
        const open = function() {
          $.ajax({
            type: "POST",
            url: "kf_fw_ig_mybpdt.php",
            data: `do=3&id=${id}&safeid=${safeId3}`,
            timeout: Const_default.defAjaxTimeout
          }).done(function(html2) {
            index++;
            let msg = removeHtmlTag(html2);
            if (msg.includes("\u83B7\u5F97")) {
              successNum++;
              let matches = /获得\[(\d+)]KFB/.exec(msg);
              if (matches) stat["KFB"] += parseInt(matches[1]);
              matches = /获得\[(\d+)]经验值/.exec(msg);
              if (matches) stat["\u7ECF\u9A8C\u503C"] += parseInt(matches[1]);
              matches = /打开盒子获得了道具\[\s*(.+?)\s*]/.exec(msg);
              if (matches) {
                stat["\u9053\u5177"]++;
                let itemName = matches[1];
                if (!(itemName in stat.item)) stat.item[itemName] = 0;
                stat.item[itemName]++;
              }
              matches = /获得一件\[(.+?)]的?装备/.exec(msg);
              if (matches) {
                stat["\u88C5\u5907"]++;
                let armType = matches[1] + "\u88C5\u5907";
                if (!(armType in stat.arm)) stat.arm[armType] = 0;
                stat.arm[armType]++;
              }
              matches = /随机值(\d+)/.exec(msg);
              if (matches) {
                randomTotalCount++;
                randomTotalNum += parseInt(matches[1]);
              }
            } else if (msg.includes("\u64CD\u4F5C\u8FC7\u5FEB")) {
              $(document).queue("OpenBoxes", open);
            } else if (msg.includes("\u76D2\u5B50\u4E0D\u8DB3") || msg.includes("\u9519\u8BEF\u7684\u5B89\u5168\u7801")) {
              $(document).clearQueue("OpenBoxes");
              isStop = true;
            } else {
              failNum++;
            }
            console.log(`\u7B2C${index}\u6B21\uFF1A${msg}`);
            $('.pd_result[data-name="boxResult"]:last').append(`<li><b>\u7B2C${index}\u6B21\uFF1A</b>${msg}</li>`);
            runFunc("Item.openBoxes_success_", msg);
          }).fail(function() {
            failNum++;
          }).always(function() {
            let length = $(document).queue("OpenBoxes").length;
            let $countdown = $(".pd_countdown:last");
            $countdown.text(length);
            let isPause = $countdown.closest(".pd_msg").data("stop");
            isStop = isStop || isPause;
            if (isPause) {
              $(document).clearQueue("OpenAllBoxes");
              nextActionEnabled = false;
            }
            if (isStop || !length) {
              remove($wait);
              let avgRandomNum = randomTotalCount > 0 ? getFixedNumLocStr(randomTotalNum / randomTotalCount, 2) : 0;
              for (let [key, value] of entries(stat)) {
                if (!value || $.type(value) === "object" && $.isEmptyObject(value)) {
                  delete stat[key];
                }
              }
              if (!$.isEmptyObject(stat)) {
                push(
                  "\u6253\u5F00\u76D2\u5B50",
                  `\u5171\u6709\`${successNum}\`\u4E2A\u3010\`${boxType}\`\u3011\u6253\u5F00\u6210\u529F (\u5E73\u5747\u968F\u673A\u503C\u3010\`${avgRandomNum}\`\u3011)`,
                  {
                    gain: stat,
                    pay: { "\u76D2\u5B50": -successNum }
                  }
                );
              }
              let $currentNum = $boxArea.find(`> tbody > tr:nth-child(2) > td:nth-child(${id}) > span:last`);
              let prevNum = parseInt($currentNum.text());
              if (prevNum > 0) {
                $currentNum.text(prevNum - successNum);
              }
              let resultStatHtml = "", msgStatHtml = "";
              for (let [key, value] of entries(stat)) {
                let tmpHtml = "";
                if ($.type(value) === "object") {
                  resultStatHtml += resultStatHtml ? "<br>" : "";
                  msgStatHtml += msgStatHtml ? "<br>" : "";
                  resultStatHtml += `${key === "item" ? "\u9053\u5177" : "\u88C5\u5907"}\uFF1A`;
                  let typeList = key === "item" ? itemTypeList : armTypeList;
                  for (let name4 of getSortedObjectKeyList(typeList, value)) {
                    tmpHtml += `<i>${name4}<em>+${value[name4].toLocaleString()}</em></i> `;
                  }
                } else {
                  tmpHtml += `<i>${key}<em>+${value.toLocaleString()}</em></i> `;
                }
                resultStatHtml += tmpHtml;
                msgStatHtml += tmpHtml.trim();
              }
              if (msgStatHtml.length < 200) {
                msgStatHtml = msgStatHtml.replace(/(.*)<br>/, "$1");
              }
              $('.pd_result[data-name="boxResult"]:last').append(`
<li class="pd_stat">
  <b>\u7EDF\u8BA1\u7ED3\u679C\uFF08\u5E73\u5747\u968F\u673A\u503C\u3010<em>${avgRandomNum}</em>\u3011\uFF09\uFF1A</b><br>
  ${resultStatHtml ? resultStatHtml : "\u65E0"}
</li>
`);
              console.log(
                `\u5171\u6709${successNum}\u4E2A\u3010${boxType}\u3011\u6253\u5F00\u6210\u529F\uFF08\u5E73\u5747\u968F\u673A\u503C\u3010${avgRandomNum}\u3011\uFF09${failNum > 0 ? `\uFF0C\u5171\u6709${failNum}\u4E2A\u76D2\u5B50\u65E0\u6CD5\u83B7\u53D6\u7ED3\u679C` : ""}`
              );
              show(
                `<strong>\u5171\u6709<em>${successNum}</em>\u4E2A\u3010${boxType}\u3011\u6253\u5F00\u6210\u529F\uFF08\u5E73\u5747\u968F\u673A\u503C\u3010<em>${avgRandomNum}</em>\u3011\uFF09${failNum > 0 ? `\uFF0C\u5171\u6709<em>${failNum}</em>\u4E2A\u76D2\u5B50\u65E0\u6CD5\u83B7\u53D6\u7ED3\u679C` : ""}</strong>${msgStatHtml.length > 25 ? "<br>" + msgStatHtml : msgStatHtml}`,
                -1
              );
              runFunc("Item.openBoxes_after_", stat);
              setTimeout(() => getNextObjects(1), Const_default.defAjaxInterval);
              if ($(document).queue("OpenAllBoxes").length > 0) {
                setTimeout(
                  () => $(document).dequeue("OpenAllBoxes"),
                  typeof Const_default.specialAjaxInterval === "function" ? Const_default.specialAjaxInterval() : Const_default.specialAjaxInterval
                );
              } else if (nextActionEnabled) {
                let action = null;
                if (Config.smeltArmsAfterOpenBoxesEnabled) {
                  action = () => smeltArms({ typeList: Config.defSmeltArmTypeList, safeId: safeId3, nextActionEnabled });
                } else if (Config.useItemsAfterOpenBoxesEnabled) {
                  action = () => useItems({ typeList: Config.defUseItemTypeList, safeId: safeId3, nextActionEnabled });
                } else if (Config.sellItemsAfterOpenBoxesEnabled) {
                  action = () => sellItems({ typeList: Config.defSellItemTypeList, safeId: safeId3, nextActionEnabled });
                }
                if (action) {
                  setTimeout(action, Const_default.minActionInterval);
                } else if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
                  showArmsFinalAdditionAfterOpenBoxes();
                }
              }
            } else {
              if (index % 10 === 0) {
                setTimeout(() => getNextObjects(1), Const_default.defAjaxInterval);
              }
              setTimeout(
                () => $(document).dequeue("OpenBoxes"),
                typeof Const_default.specialAjaxInterval === "function" ? Const_default.specialAjaxInterval() : Const_default.specialAjaxInterval
              );
            }
          });
        };
        $boxArea.parent().append(`<ul class="pd_result" data-name="boxResult"><li><strong>\u3010${boxType}\u3011\u6253\u5F00\u7ED3\u679C\uFF1A</strong></li></ul>`);
        let $wait = wait(
          `<strong>\u6B63\u5728\u6253\u5F00\u76D2\u5B50\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em class="pd_countdown">${num2}</em></i><a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>`
        );
        $(document).clearQueue("OpenBoxes");
        $.each(new Array(num2), function() {
          $(document).queue("OpenBoxes", open);
        });
        $(document).dequeue("OpenBoxes");
      };
      showArmsFinalAdditionAfterOpenBoxes = function() {
        if (Info_default.w.isShowArmsFinalAddition) return;
        Info_default.w.isShowArmsFinalAddition = true;
        let oriEquippedArmList = [];
        let armList = [];
        $armArea2.find("tr[data-id]").each(function() {
          let $this2 = $(this);
          let armId = parseInt($this2.data("id"));
          let armClass = $this2.data("class");
          if (armId && armClass) {
            armList.push({ armId, armClass });
          }
          if ($this2.hasClass("pd_arm_equipped")) {
            oriEquippedArmList.push({ armId, armClass });
          }
        });
        if (oriEquippedArmList.length < 2 && !confirm("\u672A\u5728\u5F53\u524D\u9875\u9762\u4E0A\u5B58\u5728\u5DF2\u88C5\u5907\u7684\u8BE5\u7C7B\u522B\u88C5\u5907\uFF0C\u5728\u64CD\u4F5C\u540E\u5C06\u88C5\u5907\u4E3A\u8BE5\u9875\u9762\u4E0A\u5176\u7C7B\u522B\u7684\u6700\u540E\u4E00\u4EF6\u88C5\u5907\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F")) return;
        if (armList.length > 0) {
          console.log("\u5728\u4E00\u952E\u5F00\u76D2\u540E\u81EA\u52A8\u663E\u793A\u88C5\u5907\u6700\u7EC8\u52A0\u6210\u4FE1\u606FStart");
          if (Const_default.debug) console.log(oriEquippedArmList);
          showArmsFinalAddition(armList, oriEquippedArmList, safeId2);
        }
      };
      myArmsInfoName = Const_default.storagePrefix + "myArmsInfo2";
      readArmsInfo = function() {
        let info = { "\u5DF2\u88C5\u5907\u6B66\u5668": 0, "\u5DF2\u88C5\u5907\u62A4\u7532": 0, "\u4E0A\u6B21\u8BB0\u5F55\u7684\u6700\u65B0\u88C5\u5907": 0, "\u4E0A\u6B21\u8BB0\u5F55\u7684\u65F6\u95F4": 0, "\u88C5\u5907\u5217\u8868": {} };
        let options = readData(myArmsInfoName + "_" + Info_default.uid);
        if (!options) return info;
        try {
          options = JSON.parse(options);
        } catch (ex) {
          return info;
        }
        if (!options || $.type(options) !== "object" || $.type(options["\u88C5\u5907\u5217\u8868"]) !== "object") return info;
        info = options;
        return info;
      };
      writeArmsInfo = (info) => writeData(myArmsInfoName + "_" + Info_default.uid, JSON.stringify(info));
      clearArmsInfo = () => deleteData(myArmsInfoName + "_" + Info_default.uid);
      getMergeArmsInfo = function(info, newInfo) {
        for (let key in newInfo) {
          if (key === "\u88C5\u5907\u5217\u8868") {
            for (let armId in newInfo["\u88C5\u5907\u5217\u8868"]) {
              armId = parseInt(armId);
              if (!armId || armId < 0) continue;
              info["\u88C5\u5907\u5217\u8868"][armId] = newInfo["\u88C5\u5907\u5217\u8868"][armId];
            }
          } else {
            info[key] = newInfo[key];
          }
        }
        return info;
      };
      addSavedArmsInfo = function($armArea3) {
        let armsInfo = readArmsInfo();
        let addHtml = "";
        for (let armId of Object.keys(armsInfo["\u88C5\u5907\u5217\u8868"]).reverse()) {
          if (!$armArea3.find(`[id="wp_${armId}"]`).length) {
            addHtml += armsInfo["\u88C5\u5907\u5217\u8868"][armId].replace(/(<tr(?: id="wp_\d+")?)>/, '$1 data-saved="true">');
          }
        }
        $armArea3.find("> tbody > tr:last-child").before(addHtml);
      };
      removeSavedArmInfo = function(armId, $armArea3) {
        let armsInfo = readArmsInfo();
        delete armsInfo["\u88C5\u5907\u5217\u8868"][armId];
        writeArmsInfo(armsInfo);
        $armArea3.find(`tr[data-id="${armId}"]`).replaceWith('<tr><td colspan="3" style="color: #777;">\u8BE5\u88C5\u5907\u4E0D\u5B58\u5728</td></tr>');
      };
      handleArmArea = function($armArea3, type = 0) {
        $armArea3.find('a[onclick^="cdzb"]').removeAttr("onclick").attr("data-name", "equip");
        $armArea3.find('a[onclick^="rlzb"]').removeAttr("onclick").attr("data-name", "smelt");
        $armArea3.find('tr[id^="wp_"]').each(function() {
          let $this2 = $(this);
          let id = $this2.attr("id");
          let $td = $this2.find("td");
          $td.removeAttr("colspan").removeAttr("style").css({ "text-align": "left", "padding-left": "5px" });
          $td.html($td.html().replace("\uFF08\u88C5\u5907\u4E2D\uFF09", ""));
          $this2.removeAttr("id").prepend(
            `<td id="${id}"><a data-name="equip" href="javascript:;">\u88C5\u5907</a></td><td><a data-name="smelt" href="javascript:;">\u7194\u70BC</a></td>`
          ).addClass("pd_arm_equipped");
        });
        let writeArmsInfoflag = false;
        let armsInfo = Config.autoSaveArmsInfoEnabled ? readArmsInfo() : {};
        $armArea3.find('tr:not([data-id]) > td[id^="wp_"]').each(function(index) {
          let $this2 = $(this);
          let matches = /wp_(\d+)/.exec($this2.attr("id"));
          if (!matches) return;
          let armId = parseInt(matches[1]);
          let $tr = $this2.parent("tr");
          let $td = $tr.find("> td:nth-child(3)");
          let html2 = $td.html();
          let armInfo = getArmInfo(html2);
          $tr.attr("data-id", armId).attr("data-class", armInfo["\u7C7B\u522B"]).attr("data-group", armInfo["\u7EC4\u522B"]);
          let newArmMark = false;
          if (Config.autoSaveArmsInfoEnabled) {
            if (index === 0) {
              let today = getMidnightHourDate(0);
              let prev = armsInfo["\u4E0A\u6B21\u8BB0\u5F55\u7684\u65F6\u95F4"] && armsInfo["\u4E0A\u6B21\u8BB0\u5F55\u7684\u6700\u65B0\u88C5\u5907"] ? new Date(armsInfo["\u4E0A\u6B21\u8BB0\u5F55\u7684\u65F6\u95F4"]) : /* @__PURE__ */ new Date(0);
              prev.setHours(0, 0, 0, 0);
              if (Math.abs(today - prev) >= Const_default.newArmMarkDuration * 24 * 60 * 60 * 1e3) {
                console.log("\u66F4\u65B0\u6700\u65B0\u88C5\u5907\u8BB0\u5F55");
                writeArmsInfoflag = true;
                armsInfo["\u4E0A\u6B21\u8BB0\u5F55\u7684\u6700\u65B0\u88C5\u5907"] = armId;
                armsInfo["\u4E0A\u6B21\u8BB0\u5F55\u7684\u65F6\u95F4"] = $.now();
              }
            }
            if (armId > armsInfo["\u4E0A\u6B21\u8BB0\u5F55\u7684\u6700\u65B0\u88C5\u5907"]) newArmMark = true;
          }
          $td.html(`${newArmMark ? '<i class="pd_new_arm_mark">[\u65B0]</i> ' : ""}<i class="pd_arm_id">[ID: ${armId}]</i> ${handleUselessSubProperties(html2)}`);
          if (Config.armsMemo[armId]) {
            $td.attr("data-memo", Config.armsMemo[armId].replace(/"/g, ""));
          }
          if (type === 0) {
            $this2.prepend(`<input name="armCheck" type="checkbox" value="${armId}">`);
          }
        });
        if (Config.sortArmsByGroupEnabled) {
          sortArmsByGroup($armArea3);
        }
        if (Config.autoSaveArmsInfoEnabled) {
          if (!Config.sortArmsByGroupEnabled) {
            sortArmsById($armArea3);
          }
          let realEquippedWeaponId = parseInt($armArea3.find('.pd_arm_equipped[data-class="\u6B66\u5668"]:not([data-saved="true"])').data("id"));
          let realEquippedArmorId = parseInt($armArea3.find('.pd_arm_equipped[data-class="\u62A4\u7532"]:not([data-saved="true"])').data("id"));
          if (realEquippedWeaponId > 0 && armsInfo["\u5DF2\u88C5\u5907\u6B66\u5668"] !== realEquippedWeaponId) {
            writeArmsInfoflag = true;
            armsInfo["\u5DF2\u88C5\u5907\u6B66\u5668"] = realEquippedWeaponId;
          }
          if (realEquippedArmorId > 0 && armsInfo["\u5DF2\u88C5\u5907\u62A4\u7532"] !== realEquippedArmorId) {
            writeArmsInfoflag = true;
            armsInfo["\u5DF2\u88C5\u5907\u62A4\u7532"] = realEquippedArmorId;
          }
          if (writeArmsInfoflag) {
            writeArmsInfo(armsInfo);
          }
          $armArea3.find(`.pd_arm_equipped[data-saved="true"][data-class="\u6B66\u5668"]:not([data-id="${armsInfo["\u5DF2\u88C5\u5907\u6B66\u5668"]}"])`).removeClass("pd_arm_equipped");
          $armArea3.find(`.pd_arm_equipped[data-saved="true"][data-class="\u62A4\u7532"]:not([data-id="${armsInfo["\u5DF2\u88C5\u5907\u62A4\u7532"]}"])`).removeClass("pd_arm_equipped");
          if (!$armArea3.find('.pd_arm_equipped[data-class="\u6B66\u5668"]').length) {
            $armArea3.find(`tr[data-id="${armsInfo["\u5DF2\u88C5\u5907\u6B66\u5668"]}"]`).addClass("pd_arm_equipped");
          }
          if (!$armArea3.find('.pd_arm_equipped[data-class="\u62A4\u7532"]').length) {
            $armArea3.find(`tr[data-id="${armsInfo["\u5DF2\u88C5\u5907\u62A4\u7532"]}"]`).addClass("pd_arm_equipped");
          }
        }
        if (type === 1) {
          $armArea3.find('a[data-name="equip"]').attr("data-name", "add").text("\u52A0\u5165");
        }
        runFunc("Item.handleArmArea_after_", { $armArea: $armArea3, type });
      };
      sortArmsByGroup = function($armArea3) {
        for (let armGroup of armGroupList) {
          $armArea3.find(`tr[data-group="${armGroup}"]`).insertAfter($armArea3.find("tr:nth-child(2)"));
        }
      };
      sortArmsById = function($armArea3) {
        let armIdList = [];
        $armArea3.find("tr[data-id]").each(function() {
          armIdList.push(parseInt($(this).data("id")));
        });
        armIdList.sort((a, b) => a - b);
        for (let armId of armIdList) {
          $armArea3.find(`tr[data-id="${armId}"]`).insertAfter($armArea3.find("tr:nth-child(2)"));
        }
      };
      bindArmLinkClickEvent = function($armArea3, safeId3, type = 0) {
        $armArea3.on("click", 'a[data-name="equip"]', function() {
          let $this2 = $(this);
          let $tr = $this2.closest("tr");
          let armId = parseInt($tr.data("id"));
          let armClass = $tr.data("class");
          $.post("kf_fw_ig_mybpdt.php", `do=4&id=${armId}&safeid=${safeId3}`, function(html2) {
            let msg = removeHtmlTag(html2);
            if (/装备完毕/.test(msg)) {
              $armArea3.find(`.pd_arm_equipped[data-class="${armClass}"]`).removeClass("pd_arm_equipped");
              $this2.closest("tr").addClass("pd_arm_equipped");
              if (Config.autoSaveArmsInfoEnabled) {
                let armsInfo = readArmsInfo();
                armsInfo[`\u5DF2\u88C5\u5907${armClass}`] = armId;
                writeArmsInfo(armsInfo);
              }
              if (type === 1) {
                let $wait = wait("<strong>\u6B63\u5728\u83B7\u53D6\u4E89\u593A\u9996\u9875\u4FE1\u606F&hellip;</strong>");
                updateLootInfo(function() {
                  remove($wait);
                  let $armId = $('input[name="armId"]:first');
                  let $armMemo = $('input[name="armMemo"]:first');
                  $armId.val(armId);
                  $armMemo.val($("#pdArmArea > span:first").text().trim());
                  $(".pd_arm_input").each(function() {
                    $(this).val("");
                    this.defaultValue = "";
                  });
                  runFunc("Item.bindArmLinkClickEvent_equip_after_", { $armArea: $armArea3, type });
                });
              }
            } else {
              if (Config.autoSaveArmsInfoEnabled && (msg === "\u9519\u8BEF\u7684\u7F16\u53F7" || msg === "\u4E0D\u662F\u4F60\u7684\u4E1C\u897F")) {
                removeSavedArmInfo(armId, $armArea3);
              }
              alert(msg);
            }
          });
        }).on("click", 'a[data-name="smelt"]', function() {
          if (!confirm("\u786E\u5B9A\u7194\u70BC\u6B64\u88C5\u5907\u5417\uFF1F")) return;
          let $this2 = $(this);
          let $tr = $this2.closest("tr");
          let armId = parseInt($tr.data("id"));
          $.post("kf_fw_ig_mybpdt.php", `do=5&id=${armId}&safeid=${safeId3}`, function(html2) {
            let msg = removeHtmlTag(html2);
            if (/装备消失/.test(msg)) {
              if (armId in Config.armsMemo) {
                read3();
                delete Config.armsMemo[armId];
                write3();
              }
              let matches = /获得对应装备经验\[\+(\d+)]/.exec(msg);
              if (matches) {
                let armClass = $tr.data("class");
                let gain = {};
                gain[armClass + "\u7ECF\u9A8C"] = parseInt(matches[1]);
                push(
                  "\u7194\u70BC\u88C5\u5907",
                  `\u5171\u6709\`1\`\u4E2A\u3010\`${armClass}\`\u3011\u88C5\u5907\u7194\u70BC\u6210\u529F`,
                  { gain, pay: { "\u88C5\u5907": -1 } }
                );
              }
              $tr.replaceWith(`<tr><td colspan="3">${msg}</td></tr>`);
              if (Config.autoSaveArmsInfoEnabled) {
                removeSavedArmInfo(armId, $armArea3);
              }
            } else {
              if (Config.autoSaveArmsInfoEnabled && (msg === "\u9519\u8BEF\u7684\u7F16\u53F7" || msg === "\u4E0D\u662F\u4F60\u7684\u4E1C\u897F")) {
                removeSavedArmInfo(armId, $armArea3);
              }
              alert(msg);
            }
          });
        }).on("click", 'a[data-name="add"]', function() {
          let $tr = $(this).closest("tr");
          let armId = parseInt($tr.data("id"));
          let armClass = $tr.data("class");
          let armInfo = getArmInfo($tr.find("> td:nth-child(3)").html());
          $("#pdAddArmDialog").parent().hide();
          if (armClass === "\u6B66\u5668") {
            $("#pdAddWeaponMemo").val(armInfo["\u540D\u79F0"]);
            $("#pdAddWeaponId").val(armId).focus();
          } else if (armClass === "\u62A4\u7532") {
            $("#pdAddArmorMemo").val(armInfo["\u540D\u79F0"]);
            $("#pdAddArmorId").val(armId).focus();
          }
        }).on("mouseenter", "tr[data-id]", function() {
          let $td = $(this).find("> td:nth-child(3)");
          $td.append('<a class="show_arm_info" data-name="showArmInfo" href="#" title="\u67E5\u770B\u88C5\u5907\u4FE1\u606F">\u67E5</a>');
        }).on("mouseleave", "tr[data-id]", function() {
          $(this).find("> td:nth-child(3) .show_arm_info").remove();
        }).on("click", ".show_arm_info", function(e) {
          e.preventDefault();
          let $this2 = $(this);
          let $td = $(this).parent("td");
          let $tr = $this2.closest("tr");
          let id = parseInt($tr.data("id"));
          $this2.remove();
          let html2 = $td.html();
          let armInfo = getArmInfo(html2);
          showArmInfoDialog(id, armInfo, $armArea3);
        });
      };
      showArmInfoDialog = function(armId, armInfo, $armArea3) {
        const dialogName2 = "pdArmInfoDialog";
        if ($("#" + dialogName2).length > 0) return;
        destroy();
        let html2 = `
<div class="pd_cfg_main">
  <div style="width: 550px; margin-top: 5px; padding-bottom: 5px; border-bottom: 1px solid #99f;">
    <span style="color: ${armInfo["\u989C\u8272"]}">${armInfo["\u540D\u79F0"]}</span> - ${armInfo["\u63CF\u8FF0"]}
  </div>
  <div style="margin-top: 5px;">
    <label>\u88C5\u5907ID\uFF1A<input name="armId" type="text" value="${armId}" style="width: 100px;" readonly></label>
    <a class="pd_btn_link" data-name="copy" data-target="[name=armId]" href="#">\u590D\u5236</a>
  </div>
  <div style="margin-top: 5px;">
    <label>\u88C5\u5907\u53C2\u6570\u8BBE\u7F6E\uFF1A</label>
    <a class="pd_btn_link" data-name="copy" data-target="[name=armParameterSetting]" href="#">\u590D\u5236</a><br>
    <textarea name="armParameterSetting" rows="6" style="width: 550px;" wrap="off" style="white-space: pre;" readonly></textarea>
  </div>
  <div style="margin-top: 5px;">
    <label>
      \u88C5\u5907\u5907\u6CE8\uFF1A<input name="armMemo" type="text" maxlength="100" style="width: 200px;">
    </label>
  </div>
</div>
<div class="pd_cfg_btns">
  <button name="saveMemo" type="submit">\u4FDD\u5B58\u5907\u6CE8</button>
  <button data-action="close" type="button">\u5173\u95ED</button>
</div>`;
        let $dialog2 = create(dialogName2, "\u88C5\u5907\u4FE1\u606F", html2, "z-index: 1003;");
        $dialog2.on("click", 'a[data-name="copy"]', function(e) {
          e.preventDefault();
          let $target = $dialog2.find($(this).data("target"));
          if (!copyText($target)) {
            $target.select().focus();
          }
          runFunc("Item.showArmInfoDialog_copy_");
        }).submit(function(e) {
          e.preventDefault();
          read3();
          let value = $.trim($dialog2.find('input[name="armMemo"]').val());
          let $node = $armArea3.find(`tr[data-id="${armId}"] > td:nth-child(3)`);
          if (value) {
            Config.armsMemo[armId] = value;
            $node.attr("data-memo", value.replace(/"/g, ""));
          } else {
            delete Config.armsMemo[armId];
            $node.removeAttr("data-memo");
          }
          write3();
          close(dialogName2);
        });
        $dialog2.find('textarea[name="armParameterSetting"]').val(getArmParameterSetting(armId, armInfo));
        if (Config.armsMemo[armId]) {
          $dialog2.find('input[name="armMemo"]').val(Config.armsMemo[armId]);
        }
        show2(dialogName2);
        runFunc("Item.showArmInfoDialog_after_");
      };
      armPropertyKeyList = /* @__PURE__ */ new Map([
        ["\u589E\u52A0\u653B\u51FB\u529B", "ATK"],
        ["\u589E\u52A0\u66B4\u51FB\u4F24\u5BB3", "CRT"],
        ["\u589E\u52A0\u6280\u80FD\u4F24\u5BB3", "SKL"],
        ["\u7A7F\u900F\u5BF9\u65B9\u610F\u5FD7", "BRC"],
        ["\u751F\u547D\u593A\u53D6", "LCH"],
        ["\u589E\u52A0\u901F\u5EA6", "SPD"],
        ["\u653B\u51FB", "ATK"],
        ["\u66B4\u51FB", "CRT"],
        ["\u6280\u80FD", "SKL"],
        ["\u7A7F\u900F", "BRC"],
        ["\u5438\u8840", "LCH"],
        ["\u901F\u5EA6", "SPD"],
        ["\u88AB\u653B\u51FB\u56DE\u8840100+", "HEL"],
        ["\u83B7\u5F97\u65E0\u62A4\u7532\u9B54\u6CD5\u76FE500+", "SLD"],
        ["\u6BCF\u51CF\u5C115%\u751F\u547D\u503C\u83B7\u5F97\u989D\u5916\u610F\u5FD7", "AMR"],
        ["\u53CD\u5F39\u5BF9\u65B9\u5B9E\u9645\u4F24\u5BB315%+", "RFL"],
        ["\u51CF\u5C11\u6765\u81EA\u66B4\u51FB\u7684\u4F24\u5BB310%+", "CRD"],
        ["\u51CF\u5C11\u6765\u81EA\u6280\u80FD\u7684\u4F24\u5BB310%+", "SRD"],
        ["\u56DE\u8840", "HEL"],
        ["\u62A4\u76FE", "SLD"],
        ["\u52A0\u9632", "AMR"],
        ["\u53CD\u4F24", "RFL"],
        ["\u66B4\u51CF", "CRD"],
        ["\u6280\u51CF", "SRD"]
      ]);
      getArmParameterSetting = function(armId, armInfo) {
        let info = {
          "\u7EC4\u522B": "",
          "\u88C5\u5907ID": "",
          "\u795E\u79D8\u5C5E\u6027\u6570\u91CF": 0,
          "\u6240\u6709\u7684\u795E\u79D8\u5C5E\u6027": "",
          "\u4E3B\u5C5E\u6027\u6570\u91CF": 0,
          "\u6240\u6709\u7684\u4E3B\u5C5E\u6027": "",
          "\u4ECE\u5C5E\u6027\u6570\u91CF": 0,
          "\u6240\u6709\u7684\u4ECE\u5C5E\u6027": ""
        };
        let groupKeyList = /* @__PURE__ */ new Map([["\u957F\u5251", "Sword"], ["\u77ED\u5F13", "Bow"], ["\u6CD5\u6756", "Staff"], ["\u94E0\u7532", "Plate"], ["\u76AE\u7532", "Leather"], ["\u5E03\u7532", "Cloth"]]);
        info["\u7EC4\u522B"] = groupKeyList.get(armInfo["\u7EC4\u522B"]);
        info["\u88C5\u5907ID"] = "#" + armId;
        let smKeyList = /* @__PURE__ */ new Map([["\u706B\u795E\u79D8", "FMT"], ["\u96F7\u795E\u79D8", "LMT"], ["\u98CE\u795E\u79D8", "AMT"], ["\u51B0\u971C\u795E\u79D8", "IMT"], ["\u5C16\u523A\u795E\u79D8", "TMT"], ["\u4EC7\u6068\u795E\u79D8", "HMT"]]);
        for (let [key, value] of smKeyList) {
          if (key in armInfo) {
            info["\u795E\u79D8\u5C5E\u6027\u6570\u91CF"]++;
            info["\u6240\u6709\u7684\u795E\u79D8\u5C5E\u6027"] += value + " ";
          }
        }
        for (let value of armInfo["\u4E3B\u5C5E\u6027"]) {
          let [property = ""] = value.split("(", 1);
          property = property.trim();
          if (property) {
            info["\u4E3B\u5C5E\u6027\u6570\u91CF"]++;
            info["\u6240\u6709\u7684\u4E3B\u5C5E\u6027"] += armPropertyKeyList.get(property) + " ";
          }
        }
        let subPropertyKeyList = /* @__PURE__ */ new Map([
          ["\u7CFB\u6570(x3)", "COF"],
          ["\u529B\u91CF", "STR"],
          ["\u654F\u6377", "AGI"],
          ["\u667A\u529B", "INT"],
          ["\u4F53\u8D28", "VIT"],
          ["\u7075\u6D3B", "DEX"],
          ["\u610F\u5FD7", "RES"]
        ]);
        for (let value of armInfo["\u4ECE\u5C5E\u6027"]) {
          value = $.trim(value);
          if (!value) continue;
          let matches = /(?:\[.])?(\S+?)\((\S+?)x([\d\.]+)%\)/.exec(value);
          if (matches) {
            info["\u4ECE\u5C5E\u6027\u6570\u91CF"]++;
            info["\u6240\u6709\u7684\u4ECE\u5C5E\u6027"] += armPropertyKeyList.get(matches[1]) + " " + subPropertyKeyList.get(matches[2]) + " " + Math.floor(parseFloat(matches[3]) * 10) + " ";
          }
        }
        let content = `
[\u7EC4\u522B] [\u88C5\u5907ID]
[\u795E\u79D8\u5C5E\u6027\u6570\u91CF] [\u6240\u6709\u7684\u795E\u79D8\u5C5E\u6027]
[\u4E3B\u5C5E\u6027\u6570\u91CF] [\u6240\u6709\u7684\u4E3B\u5C5E\u6027]
[\u4ECE\u5C5E\u6027\u6570\u91CF] [\u6240\u6709\u7684\u4ECE\u5C5E\u6027]
`.trim();
        for (let [key, value] of entries(info)) {
          content = content.replace(`[${key}]`, $.trim(value));
        }
        return content;
      };
      handleUselessSubProperties = function(html2) {
        let armInfo = getArmInfo(html2);
        let keyList = [];
        for (let value of armInfo["\u4E3B\u5C5E\u6027"]) {
          let [property = ""] = value.split("(", 1);
          if (property) {
            keyList.push(armPropertyKeyList.get(property));
          }
        }
        let matches = /从属性：(.+?)(<br(?:\s*\/)?>|$)/.exec(html2);
        if (matches) {
          let subPropertiesHtml = "";
          for (let value of matches[1].split("\u3002")) {
            if (!value) continue;
            let subMatches = /(?:^|>)([^<>]+?)\(/.exec(value);
            if (subMatches) {
              let property = subMatches[1];
              if (!keyList.includes(armPropertyKeyList.get(property))) {
                value = `<span class="pd_useless_sub_property">${value}</span>`;
              }
            }
            subPropertiesHtml += value + "\u3002";
          }
          html2 = html2.replace(matches[0], "\u4ECE\u5C5E\u6027\uFF1A" + subPropertiesHtml + matches[2]);
        }
        return html2;
      };
      addArmsButton = function() {
        $(`
<div class="pd_item_btns" data-name="handleArmBtns">
  <button name="openImOrExOrClearArmsLogDialog" type="button" title="\u5BFC\u5165/\u5BFC\u51FA/\u6E05\u9664\u5DF2\u4FDD\u5B58\u7684\u88C5\u5907\u4FE1\u606F">\u5BFC\u5165/\u5BFC\u51FA/\u6E05\u9664</button>
  <button name="showArmsFinalAddition" type="button" title="\u663E\u793A\u5F53\u524D\u9875\u9762\u4E0A\u6240\u6709\u88C5\u5907\u7684\u6700\u7EC8\u52A0\u6210\u4FE1\u606F">\u663E\u793A\u6700\u7EC8\u52A0\u6210</button>
  <button name="smeltSelectArms" type="button" style="color: #00f;" title="\u6279\u91CF\u7194\u70BC\u5F53\u524D\u9875\u9762\u4E0A\u6240\u9009\u7684\u88C5\u5907">\u7194\u70BC\u6240\u9009</button>
  <button name="smeltArms" type="button" style="color: #f00;" title="\u6279\u91CF\u7194\u70BC\u6307\u5B9A\u79CD\u7C7B\u7684\u88C5\u5907">\u6279\u91CF\u7194\u70BC</button>
</div>
`).insertAfter($armArea2).find('[name="openImOrExOrClearArmsLogDialog"]').click(function() {
          showCommonImportOrExportLogDialog({
            name: "\u88C5\u5907\u4FE1\u606F",
            read: readArmsInfo,
            write: writeArmsInfo,
            merge: getMergeArmsInfo,
            callback: function($dialog2) {
              $('<button name="clearArmsMemo" type="button" style="color: #00f;">\u6E05\u9664\u5907\u6CE8</button> <button name="clear" type="button" style="color: #f00;">\u6E05\u9664\u8BB0\u5F55</button>').prependTo($dialog2.find(".pd_cfg_btns")).filter('[name="clearArmsMemo"]').click(function() {
                if (!confirm("\u662F\u5426\u6E05\u9664\u6240\u6709\u88C5\u5907\u7684\u5907\u6CE8\uFF1F")) return;
                read3();
                Config.armsMemo = {};
                write3();
                alert("\u6240\u6709\u88C5\u5907\u7684\u5907\u6CE8\u5DF2\u88AB\u6E05\u9664");
                location.reload();
              }).end().filter('[name="clear"]').click(function() {
                if (!confirm("\u662F\u5426\u6E05\u9664\u6240\u6709\u5DF2\u4FDD\u5B58\u7684\u88C5\u5907\u4FE1\u606F\uFF1F")) return;
                clearArmsInfo();
                alert("\u5728\u672C\u5730\u4FDD\u5B58\u7684\u88C5\u5907\u4FE1\u606F\u5DF2\u88AB\u6E05\u9664");
                location.reload();
              });
            }
          });
        }).end().find('[name="showArmsFinalAddition"]').click(function() {
          let $arms = $armArea2.find('tr[data-id]:has([name="armCheck"]:checked)');
          if (!confirm(`\u662F\u5426\u663E\u793A\u5F53\u524D\u9875\u9762\u4E0A\u3010${$arms.length > 0 ? "\u6240\u9009" : "\u5168\u90E8"}\u3011\u88C5\u5907\u7684\u6700\u7EC8\u52A0\u6210\u4FE1\u606F\uFF1F
\uFF08\u8B66\u544A\uFF1A\u8BF7\u4E0D\u8981\u5728\u4E89\u593A\u653B\u51FB\u9014\u4E2D\u4F7F\u7528\u6B64\u529F\u80FD\uFF01\uFF09`)) return;
          if (!$arms.length) $arms = $armArea2.find("tr[data-id]");
          destroy();
          let armList = [];
          $arms.each(function() {
            let $this2 = $(this);
            let armId = parseInt($this2.data("id"));
            let armClass = $this2.data("class");
            if (armId && armClass) {
              armList.push({ armId, armClass });
            }
          });
          if (!armList.length) return;
          let oriEquippedArmList = [];
          $armArea2.find(".pd_arm_equipped").each(function() {
            let $this2 = $(this);
            let armId = parseInt($this2.data("id"));
            let armClass = $this2.data("class");
            oriEquippedArmList.push({ armId, armClass });
          });
          if (oriEquippedArmList.length < 2 && !confirm("\u672A\u5728\u5F53\u524D\u9875\u9762\u4E0A\u5B58\u5728\u5DF2\u88C5\u5907\u7684\u8BE5\u7C7B\u522B\u88C5\u5907\uFF0C\u5728\u64CD\u4F5C\u540E\u5C06\u88C5\u5907\u4E3A\u8BE5\u9875\u9762\u4E0A\u5176\u7C7B\u522B\u7684\u6700\u540E\u4E00\u4EF6\u88C5\u5907\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F")) return;
          showArmsFinalAddition(armList, oriEquippedArmList, safeId2);
        }).end().find('[name="smeltSelectArms"]').click(function() {
          let idList = [];
          $armArea2.find('input[name="armCheck"]:checked').each(function() {
            idList.push(parseInt($(this).val()));
          });
          if (!idList.length || !confirm(`\u662F\u5426\u7194\u70BC\u6240\u9009\u7684 ${idList.length} \u4EF6\u88C5\u5907\uFF1F`)) return;
          smeltArms({ idList, safeId: safeId2 });
        }).end().find('[name="smeltArms"]').click(() => showBatchSmeltArmsDialog(safeId2));
        addCommonArmsButton($('.pd_item_btns[data-name="handleArmBtns"]'), $armArea2);
      };
      addCommonArmsButton = function($area, $armArea3) {
        $(`
<label>
  <input name="sortArmsByGroupEnabled" type="checkbox" ${Config.sortArmsByGroupEnabled ? "checked" : ""}> \u5206\u7EC4\u6392\u5217</input>
  <span class="pd_cfg_tips" title="\u5206\u7EC4\u6392\u5217\u88C5\u5907">[?]</span>
</label>
<select name="select" style="width: 92px; vertical-align: middle; margin-bottom: 2px;">
  <option>\u9009\u62E9\u88C5\u5907</option>
  <option value="selectAll">\u5168\u9009</option>
  <option value="selectInverse">\u53CD\u9009</option>
  <option value="selectCancel">\u53D6\u6D88</option>
  <option value="selectWeapon">\u9009\u62E9\u6B66\u5668</option>
  <option value="selectArmor">\u9009\u62E9\u62A4\u7532</option>
  <option value="selectNewArm">\u9009\u62E9\u65B0\u88C5\u5907</option>
  <option value="selectNoMemo">\u9009\u62E9\u65E0\u5907\u6CE8\u7684\u88C5\u5907</option>
  <option value="selectArmId">\u9009\u62E9\u6307\u5B9AID\u7684\u88C5\u5907</option>
</select>
<button name="copyArmParameterSetting" type="button" title="\u590D\u5236\u6240\u9009\u88C5\u5907\u7684\u8BA1\u7B97\u5668\u53C2\u6570\u8BBE\u7F6E">\u590D\u5236\u88C5\u5907\u53C2\u6570</button>
`).prependTo($area).find('[name="sortArmsByGroupEnabled"]').click(function() {
          let checked = $(this).prop("checked");
          if (Config.sortArmsByGroupEnabled !== checked) {
            read3();
            Config.sortArmsByGroupEnabled = checked;
            write3();
          }
          if (checked) {
            sortArmsByGroup($armArea3);
          } else {
            sortArmsById($armArea3);
          }
        }).end().filter('[name="select"]').change(function() {
          let $selectedArmsNum = $armArea3.find("#pdSelectedArmsNum");
          $selectedArmsNum.text(0).parent().hide();
          let name4 = $(this).val();
          let $checkboxes = $armArea3.find('input[name="armCheck"]');
          if (name4 === "selectAll") {
            selectAll($checkboxes);
          } else if (name4 === "selectInverse") {
            selectInverse($checkboxes);
          } else if (name4 === "selectCancel") {
            $checkboxes.prop("checked", false);
          } else if (name4 === "selectWeapon") {
            $checkboxes.prop("checked", false);
            $armArea3.find('tr[data-class="\u6B66\u5668"] input[name="armCheck"]').prop("checked", true);
          } else if (name4 === "selectArmor") {
            $checkboxes.prop("checked", false);
            $armArea3.find('tr[data-class="\u62A4\u7532"] input[name="armCheck"]').prop("checked", true);
          } else if (name4 === "selectNewArm") {
            $checkboxes.prop("checked", false);
            $armArea3.find('tr:has(.pd_new_arm_mark) input[name="armCheck"]').prop("checked", true);
          } else if (name4 === "selectNoMemo") {
            $checkboxes.prop("checked", false);
            if (!$armArea3.find("tr:has(td[data-memo])").length) {
              if (!confirm("\u5728\u5F53\u524D\u9875\u9762\u4E0A\u672A\u53D1\u73B0\u5305\u542B\u5907\u6CE8\u7684\u88C5\u5907\uFF0C\u5EFA\u8BAE\u68C0\u67E5\u4E00\u4E0B\u4F60\u662F\u5426\u6E05\u7A7A\u4E86\u88C5\u5907\u5907\u6CE8\uFF0C\u662F\u5426\u7EE7\u7EED\u9009\u62E9\uFF1F")) return;
            }
            let $legendEquip = $armArea3.find('tr[data-id]:has(span:contains("\u4F20\u5947\u7684"))').not(":has(td[data-memo])");
            if ($legendEquip.length > 0) {
              if (!confirm(`\u4F60\u4E00\u5171\u9009\u62E9\u4E86 ${$legendEquip.length} \u4EF6\u4F20\u5947\u88C5\u5907\uFF0C\u662F\u5426\u7EE7\u7EED\u9009\u62E9\uFF1F`)) return;
            }
            $armArea3.find('tr:not(:has(td[data-memo])) input[name="armCheck"]').prop("checked", true);
          } else if (name4 === "selectArmId") {
            let text = $.trim(prompt("\u8BF7\u8F93\u5165\u8981\u9009\u62E9\u7684\u88C5\u5907ID\uFF08\u591A\u4E2A\u88C5\u5907ID\u7528\u7A7A\u683C\u5206\u9694\uFF09\uFF1A"));
            if (text) {
              $checkboxes.prop("checked", false);
              $armArea3.find(text.split(" ").map((armId) => `tr[data-id="${armId}"] input[name="armCheck"]`).join(",")).prop("checked", true);
            }
          }
          let selectedNum = $checkboxes.filter(":checked").length;
          if (selectedNum > 0) {
            $selectedArmsNum.text(selectedNum).parent().show();
          }
          runFunc("Item.addCommonArmsButton_select_change_", { name: name4, $armArea: $armArea3 });
          this.selectedIndex = 0;
        }).end().filter('[name="copyArmParameterSetting"]').click(function() {
          let $this2 = $(this);
          let armInfoList = [];
          $armArea3.find('input[name="armCheck"]:checked').each(function() {
            let $this3 = $(this);
            let id = parseInt($this3.val());
            let html2 = $this3.closest("tr").find("> td:nth-child(3)").html();
            if (!html2) return;
            armInfoList.push({ id, info: getArmInfo(html2) });
          });
          if (!armInfoList.length) return;
          let copyData = "";
          for (let { id, info } of armInfoList) {
            copyData += getArmParameterSetting(id, info) + "\n\n";
          }
          $this2.data("copy-text", copyData.trim());
          console.log(`\u6240\u9009\u7684 ${armInfoList.length} \u4EF6\u88C5\u5907\u7684\u8BA1\u7B97\u5668\u88C5\u5907\u53C2\u6570\u8BBE\u7F6E\uFF1A

` + copyData.trim());
          if (!copyText($this2, `\u6240\u9009\u7684 ${armInfoList.length} \u4EF6\u88C5\u5907\u7684\u8BA1\u7B97\u5668\u88C5\u5907\u53C2\u6570\u8BBE\u7F6E\u5DF2\u590D\u5236`)) {
            alert("\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u590D\u5236\uFF0C\u8BF7\u6253\u5F00Web\u63A7\u5236\u53F0\u67E5\u770B");
          }
        });
        $armArea3.find("> tbody > tr:last-child > td:first-child").append(
          '<div class="pd_highlight" style="position: absolute; left: 7px; top: 0; display: none;">(\u5DF2\u9009 <span id="pdSelectedArmsNum">0</span> \u4EF6)</div>'
        );
        runFunc("Item.addCommonArmsButton_after_", { $area, $armArea: $armArea3 });
      };
      showArmsFinalAddition = function(armList, oriEquippedArmList, safeId3) {
        let index = 0;
        const writeArmInfo = function(armId, armClass) {
          $armArea2.find(`.pd_arm_equipped[data-class="${armClass}"]`).removeClass("pd_arm_equipped").end().find(`tr[data-id="${armId}"]`).addClass("pd_arm_equipped");
          if (Config.autoSaveArmsInfoEnabled) {
            let armsInfo = readArmsInfo();
            armsInfo[`\u5DF2\u88C5\u5907${armClass}`] = armId;
            writeArmsInfo(armsInfo);
          }
        };
        const equip = function({ armId, armClass }, isComplete = false, callback = null) {
          $.ajax({
            type: "POST",
            url: "kf_fw_ig_mybpdt.php",
            data: `do=4&id=${armId}&safeid=${safeId3}`,
            timeout: Const_default.defAjaxTimeout
          }).done(function(html2) {
            let msg = removeHtmlTag(html2);
            console.log(`\u3010\u88C5\u5907ID[${armId}]\uFF0C\u88C5\u5907\u7C7B\u522B[${armClass}]\u3011\uFF1A${msg.replace("\n", " ")}`);
            if (isComplete) {
              if (/装备完毕/.test(msg)) {
                writeArmInfo(armId, armClass);
                if (typeof callback === "function") callback();
              } else {
                setTimeout(() => equip({ armId, armClass }, isComplete, callback), Const_default.minActionInterval);
              }
              return;
            }
            if (!/装备完毕|操作过快/.test(msg)) {
              index++;
              if (Config.autoSaveArmsInfoEnabled && (msg === "\u9519\u8BEF\u7684\u7F16\u53F7" || msg === "\u4E0D\u662F\u4F60\u7684\u4E1C\u897F")) {
                removeSavedArmInfo(armId, $armArea2);
              }
            }
            if (index >= armList.length) {
              complete();
              return;
            }
            if (!/装备完毕/.test(msg)) {
              setTimeout(() => equip(armList[index]), Const_default.minActionInterval);
            } else {
              writeArmInfo(armId, armClass);
              setTimeout(() => getFinalAddition({ armId, armClass }), Const_default.defAjaxInterval);
            }
          }).fail(() => setTimeout(() => equip({ armId, armClass }, isComplete, callback), Const_default.minActionInterval));
        };
        const getFinalAddition = function({ armId, armClass }) {
          $.ajax({
            type: "GET",
            url: "kf_fw_ig_index.php?t=" + $.now(),
            timeout: Const_default.defAjaxTimeout
          }).done(function(html2) {
            $wait.find(".pd_countdown").text(armList.length - (index + 1));
            if ($wait.data("stop")) {
              complete();
              return;
            }
            let matches = armClass === "\u6B66\u5668" ? />(攻击伤害\+[^<>]+)</.exec(html2) : />(受伤回血\+[^<>]+)</.exec(html2);
            if (matches) {
              let info = matches[1];
              console.log(`\u3010\u88C5\u5907ID[${armId}]\uFF0C\u88C5\u5907\u7C7B\u522B[${armClass}]\u3011\uFF1A${info}`);
              let $armInfo = $armArea2.find(`tr[data-id="${armId}"]`).find("td:nth-child(3)");
              $armInfo.find(".pd_final_addition_info").remove();
              $armInfo.append(`<span class="pd_final_addition_info" title="\u6700\u7EC8\u52A0\u6210\uFF1A${info}"><br>\u6700\u7EC8\u52A0\u6210\uFF1A${info}</span>`);
            }
            index++;
            if (index >= armList.length) {
              complete();
              return;
            }
            setTimeout(() => equip(armList[index]), Const_default.minActionInterval);
            runFunc("Item.showArmsFinalAddition_show_", { armId, armClass });
          }).fail(() => setTimeout(() => getFinalAddition({ armId, armClass }), Const_default.minActionInterval));
        };
        const complete = function() {
          remove($wait);
          if (oriEquippedArmList.length > 0) {
            let $wait2 = wait("<strong>\u6B63\u5728\u8FD8\u539F\u4E3A\u4E4B\u524D\u7684\u88C5\u5907&hellip;</strong>");
            setTimeout(() => equip(oriEquippedArmList[0], true, function() {
              if (!oriEquippedArmList[1]) {
                remove($wait2);
                return;
              }
              setTimeout(() => equip(oriEquippedArmList[1], true, function() {
                remove($wait2);
              }), Const_default.minActionInterval);
            }), Const_default.minActionInterval);
          }
          runFunc("Item.showArmsFinalAddition_complete_");
        };
        let $wait = wait(
          `<strong>\u6B63\u5728\u83B7\u53D6\u88C5\u5907\u6700\u7EC8\u52A0\u6210\u4FE1\u606F&hellip;</strong><i>\u5269\u4F59\uFF1A<em class="pd_countdown">${armList.length}</em></i><a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>`
        );
        equip(armList[0]);
      };
      showBatchSmeltArmsDialog = function() {
        const dialogName2 = "pdBatchSmeltArmsDialog";
        if ($("#" + dialogName2).length > 0) return;
        destroy();
        read3();
        let armTypeCheckedHtml = "";
        for (let group of armGroupList) {
          armTypeCheckedHtml += `<li><b>${group}\uFF1A</b>`;
          for (let type of armTypeList) {
            let prefix = type.split("\u7684")[0];
            if (prefix === "\u795E\u79D8") continue;
            let name4 = `${prefix}\u7684${group}`;
            armTypeCheckedHtml += `
<label style="margin-right: 5px;">
  <input type="checkbox" name="smeltArmsType" value="${name4}" ${Config.defSmeltArmTypeList.includes(name4) ? "checked" : ""}> ${prefix}
</label>`;
          }
          armTypeCheckedHtml += "</li>";
        }
        let html2 = `
<div class="pd_cfg_main">
  <div>\u8BF7\u9009\u62E9\u60F3\u6279\u91CF\u7194\u70BC\u7684\u88C5\u5907\u79CD\u7C7B\uFF1A</div>
  <ul data-name="smeltArmTypeList">${armTypeCheckedHtml}</ul>
</div>
<div class="pd_cfg_btns">
  <button name="selectAll" type="button">\u5168\u9009</button>
  <button name="selectInverse" type="button">\u53CD\u9009</button>
  <button name="smelt" type="button" style="color: #f00;">\u7194\u70BC</button>
  <button data-action="close" type="button">\u5173\u95ED</button>
</div>`;
        let $dialog2 = create(dialogName2, "\u6279\u91CF\u7194\u70BC\u88C5\u5907", html2);
        let $smeltArmTypeList = $dialog2.find('ul[data-name="smeltArmTypeList"]');
        $dialog2.find('[name="smelt"]').click(function() {
          let typeList = [];
          $smeltArmTypeList.find('input[name="smeltArmsType"]:checked').each(function() {
            typeList.push($(this).val());
          });
          if (!typeList.length) return;
          read3();
          Config.defSmeltArmTypeList = typeList;
          write3();
          if (!confirm("\u662F\u5426\u7194\u70BC\u6240\u9009\u88C5\u5907\u79CD\u7C7B\uFF1F")) return;
          close(dialogName2);
          smeltArms({ typeList, safeId: safeId2 });
        }).end().find('[name="selectAll"]').click(() => selectAll($smeltArmTypeList.find('input[name="smeltArmsType"]'))).end().find('[name="selectInverse"]').click(() => selectInverse($smeltArmTypeList.find('input[name="smeltArmsType"]')));
        show2(dialogName2);
        runFunc("Item.showBatchSmeltArmsDialog_after_");
      };
      smeltArms = function({ typeList = [], idList = [], safeId: safeId3, nextActionEnabled = false }) {
        let successNum = 0, index = 0;
        let smeltInfo = {};
        let isStop = false, isDeleteMemo = false;
        let smeltedArmIdList = [];
        const smelt = function(armId, armClass, armGroup, armName, armNum) {
          index++;
          $.ajax({
            type: "POST",
            url: "kf_fw_ig_mybpdt.php",
            data: `do=5&id=${armId}&safeid=${safeId3}`,
            timeout: Const_default.defAjaxTimeout
          }).done(function(html2) {
            if (!html2) return;
            let msg = removeHtmlTag(html2);
            console.log(`\u3010${armName}\u3011 ${msg}`);
            if (msg.includes("\u9519\u8BEF\u7684\u5B89\u5168\u7801")) isStop = true;
            $('.pd_result[data-name="armResult"]:last').append(`<li>\u3010${armName}\u3011 ${msg}</li>`);
            $armArea2.find(`td[id="wp_${armId}"]`).parent("tr").fadeOut("normal", function() {
              $(this).remove();
            });
            if (Config.autoSaveArmsInfoEnabled && /装备消失|错误的编号|不是你的东西/.test(msg)) {
              smeltedArmIdList.push(armId);
            }
            let matches = /获得对应装备经验\[\+(\d+)]/.exec(msg);
            if (matches) {
              successNum++;
              if (armId in Config.armsMemo) {
                isDeleteMemo = true;
                delete Config.armsMemo[armId];
              }
              if (!(armClass in smeltInfo)) smeltInfo[armClass] = {};
              if (!(armGroup in smeltInfo[armClass])) smeltInfo[armClass][armGroup] = { num: 0, exp: 0 };
              smeltInfo[armClass][armGroup].num++;
              smeltInfo[armClass][armGroup].exp += parseInt(matches[1]);
              $wait.find(".pd_countdown").text(successNum);
            }
            runFunc("Item.smeltArms_after_", msg);
          }).fail(function() {
            $('.pd_result[data-name="armResult"]:last').append(`<li>\u3010${armName}\u3011 <span class="pd_notice">\u8FDE\u63A5\u8D85\u65F6</span></li>`);
          }).always(function() {
            if (isStop || $wait.data("stop")) {
              complete();
            } else {
              if (index === armNum) setTimeout(getNextArms, Const_default.minActionInterval);
              else setTimeout(() => $(document).dequeue("SmeltArms"), Const_default.minActionInterval);
            }
          });
        };
        const getCurrentArms = function() {
          let armList = [];
          $armArea2.find('td[id^="wp_"]').each(function() {
            let $this2 = $(this);
            let $tr = $this2.parent("tr");
            if ($tr.hasClass("pd_arm_equipped")) return;
            let armId = parseInt($tr.data("id"));
            let armName = $tr.find("> td:nth-child(3) > span:first").text().trim();
            let [, armGroup] = armName.split("\u7684");
            let armClass = getArmClassNameByGroupName(armGroup);
            if (armName && armGroup) {
              if (typeList.length > 0 && typeList.includes(armName)) {
                armList.push({ armId, armClass, armGroup, armName });
              } else if (idList.length > 0 && idList.includes(armId)) {
                armList.push({ armId, armClass, armGroup, armName });
              }
            }
          });
          if (!armList.length) {
            complete();
            return;
          }
          index = 0;
          $(document).clearQueue("SmeltArms");
          $.each(armList, function(i, { armId, armClass, armGroup, armName }) {
            $(document).queue("SmeltArms", () => smelt(armId, armClass, armGroup, armName, armList.length));
          });
          $(document).dequeue("SmeltArms");
        };
        const getNextArms = function() {
          getNextObjects(2, () => {
            if ($wait.data("stop")) complete();
            else setTimeout(getCurrentArms, Const_default.defAjaxInterval);
          });
        };
        const nextAction = function() {
          let action = null;
          if (Config.useItemsAfterOpenBoxesEnabled) {
            action = () => useItems({ typeList: Config.defUseItemTypeList, safeId: safeId3, nextActionEnabled });
          } else if (Config.sellItemsAfterOpenBoxesEnabled) {
            action = () => sellItems({ typeList: Config.defSellItemTypeList, safeId: safeId3, nextActionEnabled });
          }
          if (action) {
            setTimeout(action, Const_default.minActionInterval);
          } else if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
            showArmsFinalAdditionAfterOpenBoxes();
          }
        };
        const clearInfo = function() {
          if (isDeleteMemo) write3();
          if (Config.autoSaveArmsInfoEnabled) {
            let armsInfo = readArmsInfo();
            for (let armId of smeltedArmIdList) {
              delete armsInfo["\u88C5\u5907\u5217\u8868"][armId];
            }
            writeArmsInfo(armsInfo);
          }
        };
        const complete = function() {
          $(document).clearQueue("SmeltArms");
          remove($wait);
          if ($.isEmptyObject(smeltInfo)) {
            console.log("\u6CA1\u6709\u88C5\u5907\u88AB\u7194\u70BC\uFF01");
            clearInfo();
            if (nextActionEnabled) nextAction();
            runFunc("Item.smeltArms_complete_", { nextActionEnabled, $armArea: $armArea2 });
            return;
          }
          let armGroupNum = 0;
          let resultStat = "", resultDetailStat = "", msgStat = "", logStat = "";
          for (let armClass of getSortedObjectKeyList(armClassList, smeltInfo)) {
            resultDetailStat += `<b>\u3010${armClass}\u3011\uFF1A</b><br>`;
            let armClassNum = 0;
            let gain = {};
            gain[`${armClass}\u7ECF\u9A8C`] = 0;
            for (let armGroup of getSortedObjectKeyList(armGroupList, smeltInfo[armClass])) {
              armGroupNum++;
              let { exp, num: num2 } = smeltInfo[armClass][armGroup];
              armClassNum += num2;
              gain[`${armClass}\u7ECF\u9A8C`] += exp;
              resultDetailStat += `&nbsp;&nbsp;\u3010${armGroup}\u3011 <i>\u88C5\u5907<ins>-${num2}</ins></i> <i>${armClass}\u7ECF\u9A8C<em>+${exp.toLocaleString()}</em></i><br>`;
            }
            let commonStat = `<i>${armClass}\u7ECF\u9A8C<em>+${gain[`${armClass}\u7ECF\u9A8C`].toLocaleString()}</em></i> `;
            resultStat += commonStat;
            msgStat += commonStat.trim();
            logStat += removeHtmlTag(commonStat);
            push(
              "\u7194\u70BC\u88C5\u5907",
              `\u5171\u6709\`${armClassNum}\`\u4E2A\u3010\`${armClass}\`\u3011\u88C5\u5907\u7194\u70BC\u6210\u529F`,
              { gain, pay: { "\u88C5\u5907": -armClassNum } }
            );
          }
          $('.pd_result[data-name="armResult"]:last').append(`
<li class="pd_stat">
  <b>\u7EDF\u8BA1\u7ED3\u679C\uFF08\u5171\u6709<em>${armGroupNum}</em>\u4E2A\u7EC4\u522B\u4E2D\u7684<em>${successNum}</em>\u4E2A\u88C5\u5907\u7194\u70BC\u6210\u529F\uFF09\uFF1A</b><br>
  ${resultStat}<br>
  ${resultDetailStat}
</li>`);
          console.log(`\u5171\u6709${armGroupNum}\u4E2A\u7EC4\u522B\u4E2D\u7684${successNum}\u4E2A\u88C5\u5907\u7194\u70BC\u6210\u529F\uFF0C${logStat}`);
          show(
            `<strong>\u5171\u6709<em>${armGroupNum}</em>\u4E2A\u7EC4\u522B\u4E2D\u7684<em>${successNum}</em>\u4E2A\u88C5\u5907\u7194\u70BC\u6210\u529F</strong>${msgStat}`,
            -1
          );
          clearInfo();
          setTimeout(() => getNextObjects(2), Const_default.defAjaxInterval);
          if (nextActionEnabled) nextAction();
          runFunc("Item.smeltArms_complete_", { nextActionEnabled, $armArea: $armArea2 });
        };
        if (!$.isEmptyObject(Config.armsMemo)) read3();
        $armArea2.parent().append('<ul class="pd_result" data-name="armResult"><li><strong>\u7194\u70BC\u7ED3\u679C\uFF1A</strong></li></ul>');
        let $wait = wait(
          '<strong>\u6B63\u5728\u7194\u70BC\u88C5\u5907\u4E2D&hellip;</strong><i>\u5DF2\u7194\u70BC\uFF1A<em class="pd_countdown">0</em></i><a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>'
        );
        getCurrentArms();
      };
      getArmClassNameByGroupName = function(groupName) {
        switch (groupName) {
          case "\u957F\u5251":
          case "\u77ED\u5F13":
          case "\u6CD5\u6756":
            return "\u6B66\u5668";
          case "\u94E0\u7532":
          case "\u76AE\u7532":
          case "\u5E03\u7532":
            return "\u62A4\u7532";
          default:
            return "";
        }
      };
      getArmInfo = function(html2) {
        let armInfo = {
          "\u540D\u79F0": "",
          "\u989C\u8272": "#000",
          "\u7C7B\u522B": "",
          "\u7EC4\u522B": "",
          "\u63CF\u8FF0": "",
          "\u4F5C\u7528": "",
          "\u4E3B\u5C5E\u6027": [],
          "\u4ECE\u5C5E\u6027": []
        };
        let matches = /<span style="color:([^<>]+);">([^<>]+)<\/span>/.exec(html2);
        if (!matches) return armInfo;
        armInfo["\u989C\u8272"] = matches[1];
        armInfo["\u540D\u79F0"] = matches[2];
        [, armInfo["\u7EC4\u522B"] = ""] = matches[2].split("\u7684");
        armInfo["\u7C7B\u522B"] = getArmClassNameByGroupName(armInfo["\u7EC4\u522B"]);
        [, armInfo["\u63CF\u8FF0"] = ""] = html2.split("</span> - ", 2);
        let description = removeHtmlTag(armInfo["\u63CF\u8FF0"]);
        [armInfo["\u4F5C\u7528"] = ""] = description.split("\n", 1);
        matches = /主属性：(.+?)\n/.exec(description);
        if (matches) armInfo["\u4E3B\u5C5E\u6027"] = matches[1].split("\u3002");
        matches = /从属性：(.+?)(\n|$)/.exec(description);
        if (matches) armInfo["\u4ECE\u5C5E\u6027"] = matches[1].split("\u3002");
        let smMatches = description.match(/([^。\s]+神秘)：(.+?)。/g);
        for (let i in smMatches) {
          let subMatches = /([^。\s]+神秘)：(.+?)。/.exec(smMatches[i]);
          if (smMatches) {
            armInfo[subMatches[1]] = subMatches[2];
          }
        }
        return armInfo;
      };
      getArmsLevelInfo = function(html2) {
        let armsLevelList2 = /* @__PURE__ */ new Map([
          ["\u6B66\u5668", 0],
          ["\u62A4\u7532", 0],
          ["\u9879\u94FE", 0]
        ]);
        let matches = html2.match(/value="(\S+?)等级\[\s*(\d+)\s*] 经验:(\d+)"/g);
        for (let i in matches) {
          let subMatches = /value="(\S+?)等级\[\s*(\d+)\s*] 经验:(\d+)"/.exec(matches[i]);
          armsLevelList2.set(subMatches[1], { "\u7B49\u7EA7": parseInt(subMatches[2]), "\u7ECF\u9A8C": parseInt(subMatches[3]) });
        }
        return armsLevelList2;
      };
      getLevelByName = function(itemName) {
        switch (itemName) {
          case "\u96F6\u65F6\u8FF7\u5B50\u7684\u788E\u7247":
          case "\u88AB\u9057\u5F03\u7684\u544A\u767D\u4FE1":
          case "\u5B66\u6821\u5929\u53F0\u7684\u94A5\u5319":
          case "TMA\u6700\u65B0\u4F5C\u538B\u7F29\u5305":
            return 1;
          case "LOLI\u7684\u94B1\u5305":
          case "\u68D2\u68D2\u7CD6":
            return 2;
          case "\u857E\u7C73\u8389\u4E9A\u540C\u4EBA\u6F2B\u753B":
          case "\u5341\u516D\u591C\u540C\u4EBA\u6F2B\u753B":
            return 3;
          case "\u6863\u6848\u5BA4\u94A5\u5319":
          case "\u50B2\u5A07LOLI\u5A07\u86EE\u97F3CD":
            return 4;
          case "\u6574\u5F62\u4F18\u60E0\u5377":
          case "\u6D88\u901D\u4E4B\u836F":
            return 5;
          default:
            return 0;
        }
      };
      getItemsUsedNumInfo = function(html2) {
        let itemUsedNumList2 = /* @__PURE__ */ new Map([
          ["\u857E\u7C73\u8389\u4E9A\u540C\u4EBA\u6F2B\u753B", 0],
          ["\u5341\u516D\u591C\u540C\u4EBA\u6F2B\u753B", 0],
          ["\u6863\u6848\u5BA4\u94A5\u5319", 0],
          ["\u50B2\u5A07LOLI\u5A07\u86EE\u97F3CD", 0],
          ["\u6D88\u901D\u4E4B\u836F", 0],
          ["\u6574\u5F62\u4F18\u60E0\u5377", 0]
        ]);
        let matches = html2.match(/value="\[\s*(\d+)\s*](\S+?)"/g);
        for (let i in matches) {
          let subMatches = /value="\[\s*(\d+)\s*](\S+?)"/.exec(matches[i]);
          if (itemUsedNumList2.has(subMatches[2])) {
            itemUsedNumList2.set(subMatches[2], parseInt(subMatches[1]));
          }
        }
        return itemUsedNumList2;
      };
      addBatchUseAndSellItemsButton = function() {
        $(`
<div class="pd_item_btns" data-name="handleItemsBtns">
  <button name="useItems" type="button" style="color: #00f;" title="\u6279\u91CF\u4F7F\u7528\u6307\u5B9A\u9053\u5177">\u6279\u91CF\u4F7F\u7528</button>
  <button name="sellItems" type="button" style="color: #f00;" title="\u6279\u91CF\u51FA\u552E\u6307\u5B9A\u9053\u5177">\u6279\u91CF\u51FA\u552E</button>
</div>
`).insertAfter($itemArea).find('[name="useItems"]').click(() => showBatchUseAndSellItemsDialog(1, safeId2)).end().find('[name="sellItems"]').click(() => showBatchUseAndSellItemsDialog(2, safeId2));
        addSlowActionChecked($('.pd_item_btns[data-name="handleItemsBtns"]'));
      };
      showBatchUseAndSellItemsDialog = function(type) {
        const dialogName2 = "pdBatchUseAndSellItemsDialog";
        if ($("#" + dialogName2).length > 0) return;
        destroy();
        let typeName = type === 1 ? "\u4F7F\u7528" : "\u51FA\u552E";
        read3();
        let itemTypesOptionHtml = "";
        for (let itemName of itemTypeList.slice(6)) {
          itemTypesOptionHtml += `<option>${itemName}</option>`;
        }
        let html2 = `
<div class="pd_cfg_main">
  <div style="margin: 5px 0;">\u8BF7\u9009\u62E9\u60F3\u6279\u91CF${typeName}\u7684\u9053\u5177\u79CD\u7C7B\uFF08\u6309<b>Ctrl\u952E</b>\u6216<b>Shift\u952E</b>\u53EF\u591A\u9009\uFF09\uFF1A</div>
  <select name="itemTypes" size="6" style="width: 320px;" multiple>${itemTypesOptionHtml}</select>
</div>
<div class="pd_cfg_btns">
  <button name="sell" type="button">${typeName}</button>
  <button data-action="close" type="button">\u5173\u95ED</button>
</div>`;
        let $dialog2 = create(dialogName2, `\u6279\u91CF${typeName}\u9053\u5177`, html2);
        $dialog2.find('[name="itemTypes"]').keydown(function(e) {
          if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            $(this).children().prop("selected", true);
          }
        }).end().find('[name="sell"]').click(function() {
          let typeList = $dialog2.find('[name="itemTypes"]').val();
          if (!Array.isArray(typeList)) return;
          read3();
          if (type === 1) Config.defUseItemTypeList = typeList;
          else Config.defSellItemTypeList = typeList;
          write3();
          if (!confirm(`\u662F\u5426${typeName}\u6240\u9009\u9053\u5177\u79CD\u7C7B\uFF1F`)) return;
          close(dialogName2);
          if (type === 1) useItems({ typeList, safeId: safeId2 });
          else sellItems({ typeList, safeId: safeId2 });
        });
        $dialog2.find('[name="itemTypes"] > option').each(function() {
          let $this2 = $(this);
          let itemTypeList2 = type === 1 ? Config.defUseItemTypeList : Config.defSellItemTypeList;
          if (itemTypeList2.includes($this2.val())) $this2.prop("selected", true);
        });
        show2(dialogName2);
        runFunc("Item.showBatchUseAndSellItemsDialog_after_", type);
      };
      useItems = function({ typeList, safeId: safeId3, nextActionEnabled = false }) {
        let totalSuccessNum = 0, totalValidNum = 0, totalInvalidNum = 0, index = 0;
        let useInfo = {};
        let tmpItemTypeList = [...typeList];
        let isStop = false;
        const use = function(itemId, itemName, itemNum) {
          index++;
          $.ajax({
            type: "POST",
            url: "kf_fw_ig_mybpdt.php",
            data: `do=1&id=${itemId}&safeid=${safeId3}`,
            timeout: Const_default.defAjaxTimeout
          }).done(function(html2) {
            if (!html2) return;
            let msg = removeHtmlTag(html2);
            let isDelete = false;
            if (/(成功|失败)！/.test(msg)) {
              totalSuccessNum++;
              if (!(itemName in useInfo)) useInfo[itemName] = { "\u9053\u5177": 0, "\u6709\u6548\u9053\u5177": 0, "\u65E0\u6548\u9053\u5177": 0 };
              useInfo[itemName]["\u9053\u5177"]++;
              if (/成功！/.test(msg)) {
                useInfo[itemName]["\u6709\u6548\u9053\u5177"]++;
                totalValidNum++;
              } else {
                useInfo[itemName]["\u65E0\u6548\u9053\u5177"]++;
                totalInvalidNum++;
              }
              $wait.find(".pd_countdown").text(totalSuccessNum);
              isDelete = true;
            } else if (msg.includes("\u65E0\u6CD5\u518D\u4F7F\u7528")) {
              index = itemNum;
              let typeIndex = tmpItemTypeList.indexOf(itemName);
              if (typeIndex > -1) tmpItemTypeList.splice(typeIndex, 1);
            } else if (msg.includes("\u9519\u8BEF\u7684\u5B89\u5168\u7801")) {
              isStop = true;
            } else {
              isDelete = true;
            }
            if (isDelete) {
              $itemArea.find(`[id="wp_${itemId}"]`).fadeOut("normal", function() {
                $(this).remove();
              });
            }
            console.log(`\u3010Lv.${getLevelByName(itemName)}\uFF1A${itemName}\u3011 ${msg}`);
            $('.pd_result[data-name="itemResult"]:last').append(`<li>\u3010Lv.${getLevelByName(itemName)}\uFF1A${itemName}\u3011 ${msg}</li>`);
            runFunc("Item.useItems_after_", msg);
          }).fail(function() {
            $('.pd_result[data-name="itemResult"]:last').append(
              `<li>\u3010Lv.${getLevelByName(itemName)}\uFF1A${itemName}\u3011 <span class="pd_notice">\u8FDE\u63A5\u8D85\u65F6</span></li>`
            );
          }).always(function() {
            if (isStop || $wait.data("stop")) {
              complete();
            } else {
              if (index === itemNum) setTimeout(
                getNextItems,
                typeof Const_default.specialAjaxInterval === "function" ? Const_default.specialAjaxInterval() : Const_default.specialAjaxInterval
              );
              else setTimeout(
                () => $(document).dequeue("UseItems"),
                typeof Const_default.specialAjaxInterval === "function" ? Const_default.specialAjaxInterval() : Const_default.specialAjaxInterval
              );
            }
          });
        };
        const getCurrentItems = function() {
          let itemList = [];
          $itemArea.find('tr[id^="wp_"]').each(function() {
            let $this2 = $(this);
            let matches = /wp_(\d+)/.exec($this2.attr("id"));
            if (!matches) return;
            let itemId = parseInt(matches[1]);
            let itemName = $this2.find("> td:nth-child(3)").text().trim();
            if (tmpItemTypeList.includes(itemName)) itemList.push({ itemId, itemName });
          });
          if (!itemList.length) {
            complete();
            return;
          }
          index = 0;
          $(document).clearQueue("UseItems");
          $.each(itemList, function(i, { itemId, itemName }) {
            $(document).queue("UseItems", () => use(itemId, itemName, itemList.length));
          });
          $(document).dequeue("UseItems");
        };
        const getNextItems = function() {
          getNextObjects(2, () => {
            if ($wait.data("stop")) complete();
            else setTimeout(getCurrentItems, Const_default.defAjaxInterval);
          });
        };
        const nextAction = function() {
          let action = null;
          if (Config.sellItemsAfterOpenBoxesEnabled) {
            action = () => sellItems({ typeList: Config.defSellItemTypeList, safeId: safeId3, nextActionEnabled });
          }
          if (action) {
            setTimeout(action, Const_default.minActionInterval);
          } else if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
            showArmsFinalAdditionAfterOpenBoxes();
          }
        };
        const complete = function() {
          $(document).clearQueue("UseItems");
          remove($wait);
          if ($.isEmptyObject(useInfo)) {
            console.log("\u6CA1\u6709\u9053\u5177\u88AB\u4F7F\u7528\uFF01");
            if (nextActionEnabled) nextAction();
            runFunc("Item.useItems_complete_", { nextActionEnabled, $armArea: $armArea2 });
            return;
          }
          let itemTypeNum = 0;
          let resultStat = "";
          for (let itemName of getSortedObjectKeyList(typeList, useInfo)) {
            itemTypeNum++;
            let itemLevel = getLevelByName(itemName);
            let stat = useInfo[itemName];
            let successNum = stat["\u9053\u5177"];
            delete stat["\u9053\u5177"];
            if (stat["\u6709\u6548\u9053\u5177"] === 0) delete stat["\u6709\u6548\u9053\u5177"];
            if (stat["\u65E0\u6548\u9053\u5177"] === 0) delete stat["\u65E0\u6548\u9053\u5177"];
            if (!$.isEmptyObject(stat)) {
              resultStat += `\u3010Lv.${itemLevel}\uFF1A${itemName}\u3011 <i>\u9053\u5177<ins>-${successNum}</ins></i> `;
              for (let [key, num2] of entries(stat)) {
                resultStat += `<i>${key}<em>+${num2}</em></i> `;
              }
              resultStat += "<br>";
              push(
                "\u4F7F\u7528\u9053\u5177",
                `\u5171\u6709\`${successNum}\`\u4E2A\u3010\`Lv.${itemLevel}\uFF1A${itemName}\`\u3011\u9053\u5177\u88AB\u4F7F\u7528`,
                { gain: stat, pay: { "\u9053\u5177": -successNum } }
              );
            }
          }
          $('.pd_result[data-name="itemResult"]:last').append(`
<li class="pd_stat">
  <b>\u7EDF\u8BA1\u7ED3\u679C\uFF08\u5171\u6709<em>${itemTypeNum}</em>\u4E2A\u79CD\u7C7B\u4E2D\u7684<em>${totalSuccessNum}</em>\u4E2A\u9053\u5177\u88AB\u4F7F\u7528\uFF0C
<i>\u6709\u6548\u9053\u5177<em>+${totalValidNum}</em></i><i>\u65E0\u6548\u9053\u5177<em>+${totalInvalidNum}</em></i>\uFF09\uFF1A</b><br>
  ${resultStat}
</li>`);
          console.log(`\u5171\u6709${itemTypeNum}\u4E2A\u79CD\u7C7B\u4E2D\u7684${totalSuccessNum}\u4E2A\u9053\u5177\u88AB\u4F7F\u7528\uFF0C\u6709\u6548\u9053\u5177+${totalValidNum}\uFF0C\u65E0\u6548\u9053\u5177+${totalInvalidNum}`);
          show(
            `<strong>\u5171\u6709<em>${itemTypeNum}</em>\u4E2A\u79CD\u7C7B\u4E2D\u7684<em>${totalSuccessNum}</em>\u4E2A\u9053\u5177\u88AB\u4F7F\u7528</strong><i>\u6709\u6548\u9053\u5177<em>+${totalValidNum}</em></i><i>\u65E0\u6548\u9053\u5177<em>+${totalInvalidNum}</em></i>`,
            -1
          );
          setTimeout(() => getNextObjects(2), Const_default.defAjaxInterval);
          if (nextActionEnabled) nextAction();
          runFunc("Item.useItems_complete_", { nextActionEnabled, $armArea: $armArea2 });
        };
        $itemArea.parent().append('<ul class="pd_result" data-name="itemResult"><li><strong>\u4F7F\u7528\u7ED3\u679C\uFF1A</strong></li></ul>');
        let $wait = wait(
          '<strong>\u6B63\u5728\u4F7F\u7528\u9053\u5177\u4E2D&hellip;</strong><i>\u5DF2\u4F7F\u7528\uFF1A<em class="pd_countdown">0</em></i><a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>'
        );
        getCurrentItems();
      };
      sellItems = function({ typeList, safeId: safeId3, nextActionEnabled = false }) {
        let successNum = 0, index = 0;
        let sellInfo = {};
        let isStop = false;
        const sell = function(itemId, itemName, itemNum) {
          index++;
          $.ajax({
            type: "POST",
            url: "kf_fw_ig_mybpdt.php",
            data: `do=2&id=${itemId}&safeid=${safeId3}`,
            timeout: Const_default.defAjaxTimeout
          }).done(function(html2) {
            if (!html2) return;
            let msg = removeHtmlTag(html2);
            if (msg.includes("\u9519\u8BEF\u7684\u5B89\u5168\u7801")) isStop = true;
            console.log(`\u3010Lv.${getLevelByName(itemName)}\uFF1A${itemName}\u3011 ${msg}`);
            $('.pd_result[data-name="itemResult"]:last').append(`<li>\u3010Lv.${getLevelByName(itemName)}\uFF1A${itemName}\u3011 ${msg}</li>`);
            $itemArea.find(`[id="wp_${itemId}"]`).fadeOut("normal", function() {
              $(this).remove();
            });
            let matches = /出售该物品获得了\[\s*(\d+)\s*]KFB/.exec(msg);
            if (matches) {
              successNum++;
              if (!(itemName in sellInfo)) sellInfo[itemName] = { num: 0, sell: 0 };
              sellInfo[itemName].num++;
              sellInfo[itemName].sell += parseInt(matches[1]);
              $wait.find(".pd_countdown").text(successNum);
            }
            runFunc("Item.sellItems_after_", msg);
          }).fail(function() {
            $('.pd_result[data-name="itemResult"]:last').append(
              `<li>\u3010Lv.${getLevelByName(itemName)}\uFF1A${itemName}\u3011 <span class="pd_notice">\u8FDE\u63A5\u8D85\u65F6</span></li>`
            );
          }).always(function() {
            if (isStop || $wait.data("stop")) {
              complete();
            } else {
              if (index === itemNum) setTimeout(getNextItems, Const_default.minActionInterval);
              else setTimeout(() => $(document).dequeue("SellItems"), Const_default.minActionInterval);
            }
          });
        };
        const getCurrentItems = function() {
          let itemList = [];
          $itemArea.find('tr[id^="wp_"]').each(function() {
            let $this2 = $(this);
            let matches = /wp_(\d+)/.exec($this2.attr("id"));
            if (!matches) return;
            let itemId = parseInt(matches[1]);
            let itemName = $this2.find("> td:nth-child(3)").text().trim();
            if (typeList.includes(itemName)) itemList.push({ itemId, itemName });
          });
          if (!itemList.length) {
            complete();
            return;
          }
          index = 0;
          $(document).clearQueue("SellItems");
          $.each(itemList, function(i, { itemId, itemName }) {
            $(document).queue("SellItems", () => sell(itemId, itemName, itemList.length));
          });
          $(document).dequeue("SellItems");
        };
        const getNextItems = function() {
          getNextObjects(2, () => {
            if ($wait.data("stop")) complete();
            else setTimeout(getCurrentItems, Const_default.defAjaxInterval);
          });
        };
        const complete = function() {
          $(document).clearQueue("SellItems");
          remove($wait);
          if ($.isEmptyObject(sellInfo)) {
            console.log("\u6CA1\u6709\u9053\u5177\u88AB\u51FA\u552E\uFF01");
            if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
              showArmsFinalAdditionAfterOpenBoxes();
            }
            runFunc("Item.sellItems_complete_", { nextActionEnabled, $armArea: $armArea2 });
            return;
          }
          let itemTypeNum = 0, totalSell = 0;
          let resultStat = "";
          for (let itemName of getSortedObjectKeyList(typeList, sellInfo)) {
            itemTypeNum++;
            let itemLevel = getLevelByName(itemName);
            let { sell: sell2, num: num2 } = sellInfo[itemName];
            totalSell += sell2;
            resultStat += `\u3010Lv.${itemLevel}\uFF1A${itemName}\u3011 <i>\u9053\u5177<ins>-${num2}</ins></i> <i>KFB<em>+${sell2.toLocaleString()}</em></i><br>`;
            push(
              "\u51FA\u552E\u9053\u5177",
              `\u5171\u6709\`${num2}\`\u4E2A\u3010\`Lv.${itemLevel}\uFF1A${itemName}\`\u3011\u9053\u5177\u51FA\u552E\u6210\u529F`,
              { gain: { "KFB": sell2 }, pay: { "\u9053\u5177": -num2 } }
            );
          }
          $('.pd_result[data-name="itemResult"]:last').append(`
<li class="pd_stat">
  <b>\u7EDF\u8BA1\u7ED3\u679C\uFF08\u5171\u6709<em>${itemTypeNum}</em>\u4E2A\u79CD\u7C7B\u4E2D\u7684<em>${successNum}</em>\u4E2A\u9053\u5177\u51FA\u552E\u6210\u529F\uFF09\uFF1A</b> <i>KFB<em>+${totalSell.toLocaleString()}</em></i><br>
  ${resultStat}
</li>`);
          console.log(`\u5171\u6709${itemTypeNum}\u4E2A\u79CD\u7C7B\u4E2D\u7684${successNum}\u4E2A\u9053\u5177\u51FA\u552E\u6210\u529F\uFF0CKFB+${totalSell}`);
          show(
            `<strong>\u5171\u6709<em>${itemTypeNum}</em>\u4E2A\u79CD\u7C7B\u4E2D\u7684<em>${successNum}</em>\u4E2A\u9053\u5177\u51FA\u552E\u6210\u529F</strong><i>KFB<em>+${totalSell.toLocaleString()}</em></i>`,
            -1
          );
          setTimeout(() => getNextObjects(2), Const_default.defAjaxInterval);
          if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
            showArmsFinalAdditionAfterOpenBoxes();
          }
          runFunc("Item.sellItems_complete_", { nextActionEnabled, $armArea: $armArea2 });
        };
        $itemArea.parent().append(`<ul class="pd_result" data-name="itemResult"><li><strong>\u51FA\u552E\u7ED3\u679C\uFF1A</strong></li></ul>`);
        let $wait = wait(
          '<strong>\u6B63\u5728\u51FA\u552E\u9053\u5177\u4E2D&hellip;</strong><i>\u5DF2\u51FA\u552E\uFF1A<em class="pd_countdown">0</em></i><a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>'
        );
        getCurrentItems();
      };
      buyItems = function(buyItemIdList) {
        if (/* @__PURE__ */ new Date() < getDateByTime(Config.buyItemAfterTime)) {
          $(document).dequeue("AutoAction");
          return;
        }
        let index = 0, subIndex = 0;
        let isStop = false;
        let itemIdList = [];
        const getItemNameById = function(itemId) {
          switch (parseInt(itemId)) {
            case 101:
              return "\u7B49\u7EA7\u7ECF\u9A8C\u836F\u4E38";
            case 102:
              return "\u7B49\u7EA7\u7ECF\u9A8C\u836F\u4E38\uFF08\u86CB\uFF09";
            case 103:
              return "\u4FEE\u70BC\u624B\u518C";
            default:
              return "\u672A\u77E5";
          }
        };
        const getItemPayById = function(itemId) {
          switch (parseInt(itemId)) {
            case 101:
              return { "KFB": -5e3 };
            case 102:
              return { "KFB": -1e4 };
            case 103:
              return { "\u666E\u901A\u76D2\u5B50": -100 };
            default:
              return null;
          }
        };
        const getCookieDate = function() {
          let now = /* @__PURE__ */ new Date();
          let date = getTimezoneDateByTime("00:25:00");
          if (now > date) date.setDate(date.getDate() + 1);
          return date;
        };
        const readBuyInfo = function() {
          console.log("\u8BFB\u53D6\u8D2D\u4E70\u9875\u9762\u4FE1\u606FStart");
          $.ajax({
            type: "GET",
            url: "kf_fw_ig_shop.php?t=" + $.now(),
            timeout: Const_default.defAjaxTimeout
          }).done(function(html2) {
            if (getCookie(Const_default.buyItemReadyCookieName)) {
              remove($wait);
              $(document).dequeue("AutoAction");
              return;
            }
            let matches = /safeid=(\w+)/.exec(html2);
            if (matches) {
              setCookie(Const_default.buyItemReadyCookieName, 1, getDate("+5m"));
              let safeId3 = matches[1];
              setTimeout(() => buy(parseInt(itemIdList[index][subIndex]), safeId3), Const_default.defAjaxInterval);
            } else {
              remove($wait);
              setCookie(Const_default.buyItemCookieName, 1, getDate("+15m"));
              $(document).dequeue("AutoAction");
            }
          }).fail(function() {
            setTimeout(readBuyInfo, Const_default.defAjaxInterval);
          });
        };
        const buy = function(itemId, safeId3) {
          $.ajax({
            type: "POST",
            url: "kf_fw_ig_shop.php",
            data: `buy=${itemId}&safeid=${safeId3}`,
            timeout: Const_default.defAjaxTimeout
          }).done(function(html2) {
            let msg = removeHtmlTag(html2);
            let itemName = getItemNameById(itemId);
            console.log(`\u3010\u8D2D\u4E70\u7269\u54C1\u3011\u3010${itemName}\u3011\uFF1A${msg}`);
            let isShowMsg = false;
            if (msg.includes("\u8D2D\u4E70\u6210\u529F")) {
              index++;
              subIndex = 0;
              let matches = /\+(\d+)(武器\/护甲经验|经验)/.exec(msg);
              if (matches) {
                let num2 = parseInt(matches[1]), key = matches[2];
                let gain = {}, pay = getItemPayById(itemId);
                if (key === "\u7ECF\u9A8C") {
                  gain["\u7ECF\u9A8C\u503C"] = num2;
                } else {
                  gain["\u6B66\u5668\u7ECF\u9A8C"] = num2;
                  gain["\u62A4\u7532\u7ECF\u9A8C"] = num2;
                }
                if (pay) {
                  push("\u8D2D\u4E70\u7269\u54C1", `\u5171\u6709\`1\`\u4E2A\u3010\`${itemName}\`\u3011\u8D2D\u4E70\u6210\u529F`, { gain, pay });
                }
                let msgStat = "";
                for (let [key2, value] of entries(gain)) {
                  msgStat += `<i>${key2}<em>+${value.toLocaleString()}</em></i>`;
                }
                for (let [key2, value] of entries(pay)) {
                  msgStat += `<i>${key2}<ins>${value.toLocaleString()}</ins></i>`;
                }
                isShowMsg = true;
                show(`<strong>\u8D2D\u4E70\u7269\u54C1\u3010${itemName}\u3011${msgStat}`);
                runFunc("Item.buyItems_success_", msg);
              }
            } else if (msg.includes("\u4E0D\u8DB3")) {
              subIndex++;
              if (subIndex >= itemIdList[index].length) {
                index++;
                subIndex = 0;
              }
            } else {
              if (!msg.includes("\u64CD\u4F5C\u8FC7\u5FEB")) {
                index++;
                subIndex = 0;
              }
              if (msg.includes("\u672C\u65E5\u8D2D\u4E70\u6B21\u6570\u5DF2\u7528\u5B8C")) {
                if (index === 1) isShowMsg = true;
                isStop = true;
                setCookie(Const_default.buyItemCookieName, 1, getCookieDate());
              }
            }
            if (!isShowMsg) {
              show(`<strong>\u8D2D\u4E70\u7269\u54C1\u3010${itemName}\u3011\uFF1A${msg}</strong>`);
            }
          }).fail(function() {
            index++;
            subIndex = 0;
            show(`<strong>\u8D2D\u4E70\u7269\u54C1\u3010${getItemNameById(itemId)}\u3011\uFF1A\u8FDE\u63A5\u8D85\u65F6</strong>`);
          }).always(function() {
            isStop = isStop || $wait.data("stop");
            if (isStop || index >= itemIdList.length) {
              remove($wait);
              deleteCookie(Const_default.buyItemReadyCookieName);
              setCookie(Const_default.buyItemCookieName, 1, getCookieDate());
              setTimeout(() => $(document).dequeue("AutoAction"), Const_default.minActionInterval);
              runFunc("Item.buyItems_complete_");
            } else {
              setTimeout(() => buy(parseInt(itemIdList[index][subIndex]), safeId3), Const_default.minActionInterval);
            }
          });
        };
        for (let value of buyItemIdList) {
          if (!/^\d+(\|\d+)*$/.test(value)) continue;
          let arr = value.split("|").filter((id) => id && getItemNameById(parseInt(id)) !== "\u672A\u77E5");
          if (arr.length > 0) {
            itemIdList.push(arr);
          }
        }
        if (!itemIdList.length) {
          setCookie(Const_default.buyItemCookieName, 1, getCookieDate());
          $(document).dequeue("AutoAction");
          return;
        }
        let $wait = wait(
          `<strong>\u6B63\u5728\u8D2D\u4E70\u7269\u54C1\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em class="pd_countdown">${itemIdList.length}</em></i><a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>`
        );
        readBuyInfo();
      };
      showMyInfoInItemShop = function() {
        $.get(`profile.php?action=show&uid=${Info_default.uid}&t=${$.now()}`, function(html2) {
          let kfbMatches = /论坛货币：(\d+)\s*KFB/.exec(html2);
          let gxMatches = /贡献数值：(\d+(?:\.\d+)?)/.exec(html2);
          if (!kfbMatches && !gxMatches) return;
          let kfb = parseInt(kfbMatches[1]);
          let gx = parseFloat(gxMatches[1]);
          $(".kf_fw_ig_title1:eq(1)").append(`
<span style="margin-left: 7px;">(\u5F53\u524D\u6301\u6709 <b style="font-size: 14px;">${kfb.toLocaleString()}</b> KFB \u548C <b style="font-size: 14px;">${gx}</b> \u8D21\u732E)</span>
`);
        });
      };
      showBuyItemTips = function() {
        $(".kf_fw_ig1:first > tbody > tr:gt(0)").each(function(index) {
          if (index <= 1) {
            let $this2 = $(this);
            $this2.find("td:last-child").append(`<span class="pd_cfg_tips pd_highlight" title="\u7279\u522B\u63D0\u793A\uFF1A
\u795E\u79D8\u7CFB\u6570\u975E\u795E\u79D8\u7B49\u7EA7\uFF0C\u8D2D\u4E70\u3010\u7B49\u7EA7\u7ECF\u9A8C\u836F\u4E38${index === 1 ? "\uFF08\u86CB\uFF09" : ""}\u3011\u53EF\u80FD\u5BFC\u81F4\u795E\u79D8\u7B49\u7EA7\u4E0B\u964D\uFF0C\u8BF7\u77E5\u6089\uFF01
\u795E\u79D8\u7B49\u7EA7\u516C\u5F0F\uFF1A\u795E\u79D8\u7CFB\u6570*((\u795E\u79D8\u7CFB\u6570*0.5)+(\u8D21\u732E*5)+(KFB*0.001)+(\u53D1\u5E16*0.01))">[?]</span>`);
          }
        });
      };
    }
  });

  // src/module/Config.js
  var Config_exports = {};
  __export(Config_exports, {
    Config: () => Config2,
    changeStorageType: () => changeStorageType,
    clear: () => clear3,
    clearData: () => clearData,
    init: () => init3,
    normalize: () => normalize,
    read: () => read3,
    write: () => write3
  });
  var name3, Config2, init3, read3, write3, clear3, changeStorageType, normalize, clearData;
  var init_Config = __esm({
    "src/module/Config.js"() {
      "use strict";
      init_Info();
      init_Util();
      init_Const();
      init_Log();
      init_TmpLog();
      init_Item();
      init_Read();
      name3 = Const_default.storagePrefix + "config";
      Config2 = {
        // 是否开启定时模式，可按时进行自动操作（包括自动领取每日奖励、自动提升战力光环、自动争夺，需开启相关功能），只在论坛首页生效（不开启此模式的话只能在刷新页面后才会进行操作），true：开启；false：关闭
        timingModeEnabled: false,
        // 在首页的网页标题上显示定时模式提示的方案，auto：停留一分钟后显示；always：总是显示；never：不显示
        showTimingModeTipsType: "auto",
        // 是否自动领取每日奖励，true：开启；false：关闭
        autoGetDailyBonusEnabled: false,
        // 争夺各层分配点数列表，例：{1:{"力量":1,"体质":2,"敏捷":3,"灵活":4,"智力":5,"意志":6}, 10:{"力量":6,"体质":5,"敏捷":4,"灵活":3,"智力":2,"意志":1}}
        levelPointList: {},
        // 是否使用自定义点数分配脚本（在设置了相应的自定义脚本的情况下，仅限自动攻击相关按钮有效），true：开启；false：关闭
        customPointsScriptEnabled: false,
        // 是否在攻击时如有剩余属性点则进行提醒（仅限自动攻击相关按钮有效），true：开启；false：关闭
        unusedPointNumAlertEnabled: true,
        // 是否总是打开个人属性/装备界面，true：开启；false：关闭
        alwaysOpenPointAreaEnabled: false,
        // 是否自动提升战力光环，true：开启；false：关闭
        autoPromoteHaloEnabled: false,
        // 自动提升战力光环的花费类型，1：花费100KFB；2：花费1000KFB；11：花费0.2贡献；12：花费2贡献
        promoteHaloCostType: 1,
        // 自动提升战力光环的间隔时间（小时），最低值：8
        promoteHaloInterval: 8,
        // 是否自动判断提升战力光环的间隔时间（在有剩余次数时尽可能使用），true：开启；false：关闭
        promoteHaloAutoIntervalEnabled: true,
        // 在操作后所剩余的KFB或贡献高于指定值时才自动提升战力光环，设为0表示不限制
        promoteHaloLimit: 0,
        // 是否自动购买物品，true：开启；false：关闭
        autoBuyItemEnabled: false,
        // 购买物品ID列表，例：['101','103|102']
        buyItemIdList: [],
        // 在当天的指定时间之后购买物品（本地时间），例：00:40:00
        buyItemAfterTime: "00:40:00",
        // 是否在神秘等级升级后进行提醒，只在首页生效，true：开启；false：关闭
        smLevelUpAlertEnabled: false,
        // 是否在神秘系数排名发生变化时进行提醒，只在首页生效，true：开启；false：关闭
        smRankChangeAlertEnabled: false,
        // 在首页帖子链接旁显示快速跳转至页末的链接，true：开启；false：关闭
        homePageThreadFastGotoLinkEnabled: true,
        // 是否在版块页面中显示帖子页数快捷链接，true：开启；false：关闭
        showFastGotoThreadPageEnabled: false,
        // 在帖子页数快捷链接中显示页数链接的最大数量
        maxFastGotoThreadPageNum: 5,
        // 帖子每页楼层数量，用于电梯直达和帖子页数快捷链接等功能，如果修改了论坛设置里的“文章列表每页个数”，请在此修改成相同的数目
        perPageFloorNum: 20,
        // 是否在版块页面中高亮今日新发表帖子的发表时间，true：开启；false：关闭
        highlightNewPostEnabled: true,
        // 帖子内容字体大小，设为0表示使用默认大小，推荐值：14
        threadContentFontSize: 0,
        // 自定义本人的神秘颜色（包括帖子页面的ID显示颜色和楼层边框颜色，仅自己可见），例：#009cff，如无需求可留空
        customMySmColor: "",
        // 是否将帖子中的绯月其它域名的链接修改为当前域名，true：开启；false：关闭
        modifyKfOtherDomainEnabled: true,
        // 是否在帖子页面开启多重回复和多重引用的功能，true：开启；false：关闭
        multiQuoteEnabled: true,
        // 是否在楼层内的用户名旁显示该用户的自定义备注，true：开启；false：关闭
        userMemoEnabled: false,
        // 用户自定义备注列表，格式：{'用户名':'备注'}，例：{'李四':'张三的马甲','王五':'张三的另一个马甲'}
        userMemoList: {},
        // 是否在帖子页面解析多媒体标签，true：开启；false：关闭
        parseMediaTagEnabled: true,
        // 是否在帖子和搜索页面通过左右键进行翻页，true：开启；false：关闭
        turnPageViaKeyboardEnabled: false,
        // 是否在购买帖子时页面不跳转，true：开启；false：关闭
        buyThreadNoJumpEnabled: true,
        // 是否保存购买帖子记录（需同时开启“在购买帖子时页面不跳转”的功能），true：开启；false：关闭
        saveBuyThreadLogEnabled: false,
        // 购买帖子记录的最大保存数量
        saveBuyThreadLogMaxNum: 2e3,
        // 是否在撰写发帖内容时阻止关闭页面，true：开启；false：关闭
        preventCloseWindowWhenEditPostEnabled: true,
        // 是否在提交时自动保存发帖内容，以便在出现意外情况时能够恢复发帖内容，true：开启；false：关闭
        autoSavePostContentWhenSubmitEnabled: false,
        // 是否在发帖框上显示绯月表情增强插件（仅在miaola.work域名下生效），true：开启；false：关闭
        kfSmileEnhanceExtensionEnabled: false,
        // 是否自动将“请手动点击打开本图片”链接替换为实际图片，true：开启；false：关闭
        autoReplaceManualOpenImgLinkEnabled: true,
        // 默认的消息显示时间（秒），设置为-1表示永久显示
        defShowMsgDuration: -1,
        // 是否禁用jQuery的动画效果（推荐在配置较差的机器上使用），true：开启；false：关闭
        animationEffectOffEnabled: false,
        // 在页面上方显示搜索对话框的链接，true：开启；false：关闭
        showSearchLinkEnabled: true,
        // 是否为顶部导航栏添加快捷导航菜单，true：开启；false：关闭
        addFastNavMenuEnabled: true,
        // 是否修改顶部用户菜单旁的新提醒的颜色，true：开启；false：关闭
        changeNewTipsColorEnabled: true,
        // 是否为页面添加自定义的CSS内容，true：开启；false：关闭
        customCssEnabled: false,
        // 自定义CSS的内容
        customCssContent: "",
        // 是否执行自定义的脚本，true：开启；false：关闭
        customScriptEnabled: false,
        // 自定义脚本列表
        customScriptList: [],
        // 浏览器类型，auto：自动检测；desktop：桌面版；mobile：移动版
        browseType: "auto",
        // 是否为管理成员，true：开启；false：关闭
        adminMemberEnabled: false,
        // 是否保持顶部导航栏置顶，true：开启；false：关闭
        navBarAlwaysTopEnabled: true,
        // 是否在快捷导航中显示咕咕镇的链接，true：开启；false：关闭
        showGuGuZhenInFastNavEnabled: false,
        // 是否开启关注用户的功能，true：开启；false：关闭
        followUserEnabled: false,
        // 关注用户列表，格式：[{name:'用户名'}]，例：[{name:'张三'}, {name:'李四'}]
        followUserList: [],
        // 是否高亮所关注用户在首页下的帖子链接，true：开启；false：关闭
        highlightFollowUserThreadInHPEnabled: true,
        // 是否高亮所关注用户在帖子列表页面下的帖子链接，true：开启；false：关闭
        highlightFollowUserThreadLinkEnabled: true,
        // 是否高亮所关注用户在帖子页面下的楼层的边框，true：开启；false：关闭
        highlightFollowUserFloorEnabled: true,
        // 是否开启屏蔽用户的功能，true：开启；false：关闭
        blockUserEnabled: false,
        // 屏蔽用户的默认屏蔽类型，0：屏蔽主题和回贴；1：仅屏蔽主题；2：仅屏蔽回贴
        blockUserDefaultType: 0,
        // 是否屏蔽被屏蔽用户的@提醒，true：开启；false：关闭
        blockUserAtTipsEnabled: true,
        // 屏蔽用户的版块屏蔽范围，0：所有版块；1：包括指定的版块；2：排除指定的版块
        blockUserForumType: 0,
        // 屏蔽用户的版块ID列表，例：[16, 41, 67, 57, 84, 92, 127, 68, 163, 182, 9]
        blockUserFidList: [],
        // 屏蔽用户列表，格式：[{name:'用户名', type:屏蔽类型}]，例：[{name:'张三', type:0}, {name:'李四', type:1}]
        blockUserList: [],
        // 是否开启屏蔽标题中包含指定关键字的帖子的功能，true：开启；false：关闭
        blockThreadEnabled: false,
        // 屏蔽帖子的默认版块屏蔽范围，0：所有版块；1：包括指定的版块；2：排除指定的版块
        blockThreadDefForumType: 0,
        // 屏蔽帖子的默认版块ID列表，例：[16, 41, 67, 57, 84, 92, 127, 68, 163, 182, 9]
        blockThreadDefFidList: [],
        // 屏蔽帖子的关键字列表，格式：[{keyWord:'关键字', includeUser:['包括的用户名'], excludeUser:['排除的用户名'], includeFid:[包括指定的版块ID], excludeFid:[排除指定的版块ID]}]
        // 关键字可使用普通字符串或正则表达式（正则表达式请使用'/abc/'的格式），includeUser、excludeUser、includeFid和excludeFid这三项为可选
        // 例：[{keyWord: '标题1'}, {keyWord: '标题2', includeUser:['用户名1', '用户名2'], includeFid: [5, 56]}, {keyWord: '/关键字A.*关键字B/i', excludeFid: [92, 127, 68]}]
        blockThreadList: [],
        // 日志保存天数
        logSaveDays: 30,
        // 日志内容的排序方式，time：按时间顺序排序；type：按日志类别排序
        logSortType: "time",
        // 日志统计范围类型，current：显示当天统计结果；custom：显示距该日N天内的统计结果；all：显示全部统计结果
        logStatType: "current",
        // 显示距该日N天内的统计结果（用于日志统计范围）
        logStatDays: 7,
        // 是否自动更换ID颜色，true：开启；false：关闭
        autoChangeIdColorEnabled: false,
        // 自动更换ID颜色的更换顺序类型，random：随机；sequence：顺序
        autoChangeIdColorType: "random",
        // 自动更换ID颜色的时间间隔（小时）
        autoChangeIdColorInterval: 24,
        // 是否从当前所有可用的ID颜色中进行更换，true：开启；false：关闭
        changeAllAvailableIdColorEnabled: true,
        // 自定义自动更换ID颜色的颜色ID列表，例：[1,8,13,20]
        customAutoChangeIdColorList: [],
        // 是否延长部分批量操作的时间间隔（如使用道具、打开盒子等），true：开启；false：关闭
        slowActionEnabled: false,
        // 是否自动保存我的装备信息，true：开启；false：关闭
        autoSaveArmsInfoEnabled: false,
        // 是否分组排列装备，true：开启；false：关闭
        sortArmsByGroupEnabled: false,
        // 装备备注，格式：{装备ID:'备注信息'}，例：{123456:'备注信息'}
        armsMemo: {},
        // 是否在打开盒子后熔炼装备，true：开启；false：关闭
        smeltArmsAfterOpenBoxesEnabled: false,
        // 是否在打开盒子后使用道具，true：开启；false：关闭
        useItemsAfterOpenBoxesEnabled: false,
        // 是否在打开盒子后出售道具，true：开启；false：关闭
        sellItemsAfterOpenBoxesEnabled: false,
        // 默认的批量打开的盒子种类列表，例：['普通盒子', '幸运盒子', '稀有盒子']
        defOpenBoxTypeList: [],
        // 默认的批量熔炼的装备种类列表，例：['普通的长剑', '幸运的长剑', '普通的短弓']
        defSmeltArmTypeList: [],
        // 默认的批量使用的道具种类列表，例：['蕾米莉亚同人漫画', '整形优惠卷']
        defUseItemTypeList: [],
        // 默认的批量出售的道具种类列表，例：['蕾米莉亚同人漫画', '整形优惠卷']
        defSellItemTypeList: [],
        // 是否在一键开盒后显示装备最终加成，true：开启；false：关闭
        showArmsFinalAdditionAfterOpenBoxesEnabled: false
      };
      init3 = function() {
        Info_default.w.Config = $.extend(true, {}, Config2);
        if (typeof GM_getValue !== "undefined") {
          Info_default.storageType = GM_getValue("StorageType");
          if (Info_default.storageType !== "ByUid" && Info_default.storageType !== "Global") Info_default.storageType = "Default";
        }
        read3();
      };
      read3 = function() {
        let options = readData(Info_default.storageType === "ByUid" ? name3 + "_" + Info_default.uid : name3);
        if (!options) return;
        try {
          options = JSON.parse(options);
        } catch (ex) {
          return;
        }
        if (!options || $.type(options) !== "object" || $.isEmptyObject(options)) return;
        options = normalize(options);
        Info_default.w.Config = $.extend(true, {}, Config2, options);
      };
      write3 = function() {
        let options = getDifferenceSetOfObject(Config2, Info_default.w.Config);
        writeData(Info_default.storageType === "ByUid" ? name3 + "_" + Info_default.uid : name3, JSON.stringify(options));
      };
      clear3 = () => deleteData(Info_default.storageType === "ByUid" ? name3 + "_" + Info_default.uid : name3);
      changeStorageType = function(storageType) {
        let log2 = read();
        let tmpLog = read2();
        let armsInfo = readArmsInfo();
        let buyThreadLog = readBuyThreadLog();
        Info_default.storageType = storageType;
        if (typeof GM_setValue !== "undefined") GM_setValue("StorageType", Info_default.storageType);
        if (!deepEqual(Config2, Info_default.w.Config) || !$.isEmptyObject(log2)) {
          if (confirm("\u662F\u5426\u5C06\u52A9\u624B\u8BBE\u7F6E\u548C\u65E5\u5FD7\u8F6C\u79FB\u5230\u5BF9\u5E94\u5B58\u50A8\u7C7B\u578B\u4E2D\uFF1F\uFF08\u5BF9\u5E94\u5B58\u50A8\u7C7B\u578B\u4E2D\u7684\u6570\u636E\u5C06\u88AB\u8986\u76D6\uFF09")) {
            write3();
            write(log2);
            write2(tmpLog);
            writeArmsInfo(armsInfo);
            writeBuyThreadLog(buyThreadLog);
          }
        }
      };
      normalize = function(options) {
        let settings = {};
        if ($.type(options) !== "object") return settings;
        for (let [key, value] of entries(options)) {
          if (key in Config2 && $.type(value) === $.type(Config2[key])) {
            settings[key] = value;
          }
        }
        return settings;
      };
      clearData = function(name4) {
        if (name4 === "cookies") {
          for (let key in Const_default) {
            if (/CookieName$/.test(key)) {
              deleteCookie(Const_default[key]);
            }
          }
        } else if (name4 === "tmpData") {
          clear2();
          localStorage.removeItem(Const_default.multiQuoteStorageName);
          localStorage.removeItem(Const_default.tempPointsLogListStorageName);
        } else if (name4 === "config") {
          clear3();
        } else if (name4 === "log") {
          clear();
        } else if (name4 === "armsInfo") {
          clearArmsInfo();
        } else if (name4 === "buyThreadLog") {
          clearBuyThreadLog();
        }
      };
    }
  });

  // src/module/SelfRate.js
  var SelfRate_exports = {};
  __export(SelfRate_exports, {
    addLinksInPage: () => addLinksInPage,
    addUnrecognizedSizeWarning: () => addUnrecognizedSizeWarning,
    checkRateSize: () => checkRateSize,
    handleGoodPostSubmit: () => handleGoodPostSubmit,
    highlightRateErrorSize: () => highlightRateErrorSize,
    refreshWaitCheckRatePage: () => refreshWaitCheckRatePage,
    showErrorSizeSubmitWarning: () => showErrorSizeSubmitWarning
  });
  var checkRateSize, highlightRateErrorSize, showErrorSizeSubmitWarning, addUnrecognizedSizeWarning, refreshWaitCheckRatePage, addLinksInPage, handleGoodPostSubmit;
  var init_SelfRate = __esm({
    "src/module/SelfRate.js"() {
      "use strict";
      init_Info();
      init_Const();
      init_Public();
      checkRateSize = function(title2, ratingSize) {
        let titleSize = 0;
        let matches = title2.match(/\b(\d+(?:\.\d+)?)\s?(M|G)B?\b/ig);
        if (matches) {
          for (let i = 0; i < matches.length; i++) {
            let sizeMatches = /(\d+(?:\.\d+)?)\s?(M|G)/i.exec(matches[i]);
            if (!sizeMatches) continue;
            let size = parseFloat(sizeMatches[1]);
            if (sizeMatches[2].toUpperCase() === "G") size *= 1024;
            titleSize += size;
          }
        }
        if (!titleSize || !ratingSize) {
          return { type: -1 };
        } else if (titleSize > ratingSize * (100 + Const_default.ratingErrorSizePercent) / 100 + 1 || titleSize < ratingSize * (100 - Const_default.ratingErrorSizePercent) / 100 - 1) {
          return { type: 1, titleSize, ratingSize };
        } else return { type: 0 };
      };
      highlightRateErrorSize = function() {
        $('.adp1:eq(1) a[href^="read.php?tid="]').each(function() {
          let $this2 = $(this);
          let title2 = $this2.text();
          let ratingSize = 0;
          let $ratingCell = $this2.parent("td").next("td");
          let matches = /认定\[(\d+)\]/i.exec($ratingCell.text());
          if (matches) {
            ratingSize = parseInt(matches[1]);
          }
          let { type, titleSize } = checkRateSize(title2, ratingSize);
          if (type === -1) {
            $ratingCell.css("color", "#ff9933").attr("title", "\u6807\u9898\u6587\u4EF6\u5927\u5C0F\u65E0\u6CD5\u89E3\u6790").addClass("pd_custom_tips");
          } else if (type === 1) {
            $ratingCell.addClass("pd_highlight pd_custom_tips").attr("title", `\u6807\u9898\u6587\u4EF6\u5927\u5C0F(${titleSize.toLocaleString()}M)\u4E0E\u8BA4\u5B9A\u6587\u4EF6\u5927\u5C0F(${ratingSize.toLocaleString()}M)\u4E0D\u4E00\u81F4`);
          }
        });
      };
      showErrorSizeSubmitWarning = function() {
        $('form[name="mail1"]').submit(function() {
          let ratingSize = parseFloat($('[name="psize"]').val());
          if (isNaN(ratingSize) || ratingSize <= 0) return;
          if (parseInt($('[name="psizegb"]').val()) === 2) ratingSize *= 1024;
          let title2 = $('.adp1 a[href^="read.php?tid="]').text();
          let { type, titleSize } = checkRateSize(title2, ratingSize);
          if (type === 1) {
            return confirm(`\u6807\u9898\u6587\u4EF6\u5927\u5C0F(${titleSize.toLocaleString()}M)\u4E0E\u8BA4\u5B9A\u6587\u4EF6\u5927\u5C0F(${ratingSize.toLocaleString()}M)\u4E0D\u4E00\u81F4\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F`);
          }
        });
      };
      addUnrecognizedSizeWarning = function() {
        let $title = $('.adp1 a[href^="read.php?tid="]');
        let title2 = $title.text();
        let { type } = checkRateSize(title2, 1);
        if (type === -1) {
          $title.parent().append('&nbsp;<span style="color: #ff9933;">(\u6807\u9898\u6587\u4EF6\u5927\u5C0F\u65E0\u6CD5\u89E3\u6790)</span>');
        }
      };
      refreshWaitCheckRatePage = function() {
        if (!/剩余-\d+分钟/.test($(".adp1:eq(1) > tbody > tr:last-child > td:first-child").text())) return;
        const refresh = function() {
          console.log("\u81EA\u52A8\u5237\u65B0Start");
          $.ajax({
            type: "GET",
            url: "kf_fw_1wkfb.php?ping=2&t=" + $.now(),
            timeout: 1e4
          }).done(function(html2) {
            if (/剩余-\d+分钟/.test(html2)) setTimeout(refresh, Const_default.defAjaxInterval);
          }).fail(() => setTimeout(refresh, Const_default.defAjaxInterval));
        };
        refresh();
      };
      addLinksInPage = function() {
        if (/\/kf_fw_1wkfb\.php\?ping=5\b/.test(location.href)) {
          $(".adp1:last > tbody > tr:gt(0) > td:last-child").each(function() {
            let $this2 = $(this);
            let uid = parseInt($this2.text());
            $this2.wrapInner(`<a class="${uid === Info_default.uid ? "pd_highlight" : ""} ${!Config.adminMemberEnabled ? "pd_not_click_link" : ""}" href="profile.php?action=show&uid=${uid}" target="_blank"></a>`);
          });
        } else if (/\/kf_fw_1wkfb\.php\?ping=6\b/.test(location.href)) {
          $(".adp1:last > tbody > tr:gt(1) > td:nth-child(3)").each(function() {
            let $this2 = $(this);
            let userName2 = $this2.text().trim();
            if (userName2 === "0") return;
            $this2.wrapInner(`<a class="${userName2 === Info_default.userName ? "pd_highlight" : ""} ${!Config.adminMemberEnabled ? "pd_not_click_link" : ""}" href="profile.php?action=show&username=${userName2}" target="_blank"></a>`);
          });
          $(".adp1:last > tbody > tr:gt(1) > td:last-child").each(function() {
            let $this2 = $(this);
            let matches = /\[(\d+)]板块/.exec($this2.text());
            if (matches) $this2.wrapInner(`<a href="thread.php?fid=${matches[1]}" target="_blank"></a>`);
          });
        } else if (/\/kf_fw_1wkfb\.php\?ping=8\b/.test(location.href)) {
          $(".adp1:last > tbody > tr:gt(1) > td:last-child").each(function() {
            let $this2 = $(this);
            $this2.html(
              $this2.html().replace(/(管理|会员):([^\[\]]+)\]/g, `$1:<a class="${!Config.adminMemberEnabled ? "pd_not_click_link" : ""}" href="profile.php?action=show&username=$2" target="_blank">$2</a>]`).replace(/\[帖子:(\d+)\]/, '[\u5E16\u5B50:<a href="read.php?tid=$1" target="_blank">$1</a>]')
            );
          });
        } else if (/\/kf_fw_1wkfb\.php\?ping=9\b/.test(location.href)) {
          $(".adp1:last > tbody > tr:gt(2) > td:first-child").each(function() {
            let $this2 = $(this);
            $this2.html(
              $this2.html().replace(/UID:(\d+)/, `UID:<a class="${!Config.adminMemberEnabled ? "pd_not_click_link" : ""}" href="profile.php?action=show&uid=$1" target="_blank">$1</a>`)
            );
          });
        } else if (/\/kf_fw_1wkfb\.php\?do=2\b/.test(location.href)) {
          let $node1 = $('.adp1 > tbody > tr:nth-of-type(4):contains("\u8BC4\u5206\u4F1A\u5458") > td:last-child');
          $node1.wrapInner(`<a class="${!Config.adminMemberEnabled ? "pd_not_click_link" : ""}" href="profile.php?action=show&username=${$node1.text().trim()}" target="_blank"></a>`);
          let $node2 = $('.adp1 > tbody > tr:nth-of-type(10) > td:last-child:contains("\u5F02\u8BAE\u63D0\u51FA\u4EBA")');
          $node2.html($node2.html().replace(/：(\S+)/, `\uFF1A<a class="${!Config.adminMemberEnabled ? "pd_not_click_link" : ""}" href="profile.php?action=show&username=$1" target="_blank">$1</a>`));
        }
      };
      handleGoodPostSubmit = function() {
        $('a[id^="cztz"]').attr("data-onclick", function() {
          return $(this).attr("onclick");
        }).removeAttr("onclick");
        $("#alldiv").on("click", 'a[onclick^="cztz"]', function() {
          let $this2 = $(this);
          let $floor = $this2.closest(".readtext");
          if ($this2.data("highlight")) {
            $floor.removeClass("pd_good_post_mark");
            $this2.removeData("highlight");
          } else {
            $floor.addClass("pd_good_post_mark");
            $this2.data("highlight", true);
          }
        }).on("click", 'a[id^="cztz"]', function() {
          let $this2 = $(this);
          if ($this2.data("wait")) return;
          let $floor = $this2.closest(".readtext");
          let url = $floor.find(".readidmsbottom, .readidmbottom").find('a[href^="profile.php?action=show"]').attr("href");
          let flag2 = false;
          $(".readidmsbottom, .readidmbottom").find(`a[href="${url}"]`).each(function() {
            let $currentFloor = $(this).closest(".readtext");
            if ($currentFloor.is($floor)) return;
            if ($currentFloor.find('.read_fds:contains("\u672C\u5E16\u4E3A\u4F18\u79C0\u5E16")').length > 0) {
              flag2 = true;
              return false;
            }
          });
          if (flag2 && !confirm("\u5728\u5F53\u524D\u9875\u9762\u4E2D\u8BE5\u4F1A\u5458\u5DF2\u7ECF\u6709\u56DE\u5E16\u88AB\u8BC4\u4E3A\u4F18\u79C0\u5E16\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F")) return;
          let safeId3 = getSafeId();
          let matches = /cztzyx\('(\d+)','(\d+|tpc)'\)/.exec($this2.data("onclick"));
          if (!matches || !safeId3) return;
          $this2.next(".pd_good_post_msg").remove();
          $this2.data("wait", true);
          $.ajax({
            type: "POST",
            url: "diy_read_cztz.php",
            data: `tid=${matches[1]}&pid=${matches[2]}&safeid=${safeId3}`,
            timeout: Const_default.defAjaxTimeout
          }).done(function(html2) {
            if (/已将本帖操作为优秀帖|该楼层已经是优秀帖/.test(html2)) {
              let $content = $floor.find("> table > tbody > tr > td");
              if (!$content.find('.read_fds:contains("\u672C\u5E16\u4E3A\u4F18\u79C0\u5E16")').length) {
                $content.find(".readidms, .readidm").after('<fieldset class="read_fds"><legend>\u2193</legend>\u672C\u5E16\u4E3A\u4F18\u79C0\u5E16</fieldset>');
              }
            }
            if (!/已将本楼层提交为优秀帖申请/.test(html2)) {
              $floor.removeClass("pd_good_post_mark");
            }
            $this2.after(`<span class="pd_good_post_msg" style="margin-left: 5px; color: #777;">(${html2})</span>`);
          }).always(() => $this2.removeData("wait"));
        });
      };
    }
  });

  // src/app.js
  init_Info();
  init_Config();
  init_Util();
  init_Const();
  init_Msg();
  init_Dialog();
  init_Log();
  init_TmpLog();
  init_Script();
  init_Public();
  init_Index();
  init_Read();
  init_Post();
  init_Other();
  init_Bank();
  init_Item();
  init_Loot();
  init_SelfRate();
  init_ConfigDialog();
  var version = "15.0.0";
  var exportModule = function() {
    try {
      Info_default.w.Info = (init_Info(), __toCommonJS(Info_exports)).default;
      Info_default.w.Util = (init_Util(), __toCommonJS(Util_exports));
      Info_default.w.Const = (init_Const(), __toCommonJS(Const_exports)).default;
      Info_default.w.Msg = (init_Msg(), __toCommonJS(Msg_exports));
      Info_default.w.Dialog = (init_Dialog(), __toCommonJS(Dialog_exports));
      Info_default.w.Log = (init_Log(), __toCommonJS(Log_exports));
      Info_default.w.TmpLog = (init_TmpLog(), __toCommonJS(TmpLog_exports));
      Info_default.w.Public = (init_Public(), __toCommonJS(Public_exports));
      Info_default.w.Index = (init_Index(), __toCommonJS(Index_exports));
      Info_default.w.Read = (init_Read(), __toCommonJS(Read_exports));
      Info_default.w.Post = (init_Post(), __toCommonJS(Post_exports));
      Info_default.w.Other = (init_Other(), __toCommonJS(Other_exports));
      Info_default.w.Bank = (init_Bank(), __toCommonJS(Bank_exports));
      Info_default.w.Item = (init_Item(), __toCommonJS(Item_exports));
      Info_default.w.Loot = (init_Loot(), __toCommonJS(Loot_exports));
      Info_default.w.SelfRate = (init_SelfRate(), __toCommonJS(SelfRate_exports));
      Info_default.w.Script = (init_Script(), __toCommonJS(Script_exports));
      const Conf = (init_Config(), __toCommonJS(Config_exports));
      Info_default.w.readConfig = Conf.read;
      Info_default.w.writeConfig = Conf.write;
    } catch (ex) {
      console.log(ex);
    }
  };
  var init4 = function() {
    let startDate = /* @__PURE__ */ new Date();
    Info_default.version = version;
    if (!getUidAndUserName()) return;
    addPolyfill();
    exportModule();
    init3();
    checkBrowserType();
    modifyDomainTips();
    appendCss();
    addConfigAndLogDialogLink();
    if (Config.animationEffectOffEnabled) $.fx.off = true;
    if (Config.customScriptEnabled) runCustomScript("start");
    repairBbsErrorCode();
    window.addEventListener("beforeunload", preventCloseWindowWhenActioning);
    makeSearchByBelowTwoKeyWordAvailable();
    if (Config.addFastNavMenuEnabled) addFastNavMenu();
    Info_default.$userMenu.find('a[href^="login.php?action=quit"]').click(() => confirm("\u662F\u5426\u9000\u51FA\u8D26\u53F7\uFF1F"));
    if (Config.changeNewTipsColorEnabled) changeNewTipsColor();
    if (Info_default.isInHomePage) {
      if (Config.homePageThreadFastGotoLinkEnabled) addThreadFastGotoLink();
    } else if (location.pathname === "/read.php") {
      if (Config.turnPageViaKeyboardEnabled) turnPageViaKeyboard();
      fastGotoFloor();
      addFloorGotoLink();
      adjustThreadContentFontSize();
      showAttachImageOutsideSellBox();
      if (Config.parseMediaTagEnabled) parseMediaTag();
      if (Config.modifyKfOtherDomainEnabled) modifyKFOtherDomainLink();
      addSignTips();
      if (Config.customMySmColor) modifyMySmColor();
      if (Config.multiQuoteEnabled) addMultiQuoteButton();
      addFastGotoFloorInput();
      handleBuyThreadBtn();
      addCopyBuyersListOption();
      if (Config.autoReplaceManualOpenImgLinkEnabled) replaceReadImage();
      if (Config.userMemoEnabled) addUserMemo();
      addCopyCodeLink();
      addMoreSmileLink();
      addRedundantKeywordWarning();
      if ($('a[href$="#install-script"]').length > 0) handleInstallScriptLink();
      if (Config.preventCloseWindowWhenEditPostEnabled) preventCloseWindowWhenEditPost();
      if (Config.autoSavePostContentWhenSubmitEnabled) savePostContentWhenSubmit();
    } else if (location.pathname === "/thread.php") {
      if (Config.highlightNewPostEnabled) highlightNewPost();
      if (Config.showFastGotoThreadPageEnabled) addFastGotoThreadPageLink();
    } else if (location.pathname === "/post.php") {
      addRedundantKeywordWarning();
      if (/\bmultiquote=1/i.test(location.href)) {
        if (Config.multiQuoteEnabled) handleMultiQuote(2);
      } else if (/\baction=quote/i.test(location.href)) {
        removeUnpairedBBCodeInQuoteContent();
      }
      addFillTitleBtn();
      addExtraPostEditorButton();
      addExtraOptionInPostPage();
      if (Config.preventCloseWindowWhenEditPostEnabled) preventCloseWindowWhenEditPost();
      if (Config.autoSavePostContentWhenSubmitEnabled) savePostContentWhenSubmit();
      if (Info_default.isInSpecialDomain) addAttachChangeAlert();
    } else if (location.pathname === "/kf_fw_ig_mybp.php") {
      init2();
    } else if (location.pathname === "/kf_fw_ig_shop.php") {
      showMyInfoInItemShop();
      showBuyItemTips();
    } else if (location.pathname === "/kf_fw_ig_pklist.php") {
      addUserLinkInPkListPage();
    } else if (location.pathname === "/kf_fw_ig_halo.php") {
      $(".kf_fw_ig1:first").on("click", 'a[href^="kf_fw_ig_halo.php?do=buy&id="]', () => {
        if (!confirm("\u662F\u5426\u63D0\u5347\u6218\u529B\u5149\u73AF\uFF1F")) return false;
        deleteValue(Const_default.haloInfoTmpLogName);
      });
      addUserLinkInHaloPage();
    } else if (/\/hack\.php\?H_name=bank$/i.test(location.href)) {
      handleBankPage();
    } else if (/\/message\.php\?action=read&mid=\d+/i.test(location.href)) {
      addFastDrawMoneyLink();
      if (Config.modifyKfOtherDomainEnabled) modifyKFOtherDomainLink();
    } else if (/\/message\.php($|\?action=receivebox)/i.test(location.href)) {
      addMsgSelectButton();
    } else if (/\/profile\.php\?action=show/i.test(location.href)) {
      handleProfilePage();
      addFollowAndBlockAndMemoUserLink();
    } else if (/\/personal\.php\?action=post/i.test(location.href)) {
      if (Config.perPageFloorNum === 20) modifyMyPostLink();
    } else if (location.pathname === "/kf_growup.php") {
      addAutoChangeIdColorButton();
    } else if (location.pathname === "/guanjianci.php") {
      highlightUnReadAtTipsMsg();
      if (Config.adminMemberEnabled) {
        addGuanJianCiUserNameLink();
      }
    } else if (/\/profile\.php\?action=modify$/i.test(location.href)) {
      syncModifyPerPageFloorNum();
      if (Info_default.isInSpecialDomain) addAvatarChangeAlert();
    } else if (/\/job\.php\?action=preview$/i.test(location.href)) {
      modifyPostPreviewPage();
    } else if (location.pathname === "/search.php") {
      if (Config.turnPageViaKeyboardEnabled) turnPageViaKeyboard();
    } else if (location.pathname === "/kf_fw_1wkfb.php") {
      if (/\/kf_fw_1wkfb\.php\?ping=(2|4|7)\b/.test(location.href)) {
        highlightRateErrorSize();
        if (/\/kf_fw_1wkfb\.php\?ping=2\b/.test(location.href)) {
          refreshWaitCheckRatePage();
        }
      } else if (/\/kf_fw_1wkfb\.php\?do=1\b/.test(location.href)) {
        addUnrecognizedSizeWarning();
        showErrorSizeSubmitWarning();
      }
      addLinksInPage();
    } else if (location.pathname === "/kf_no1.php") {
      addUserNameLinkInRankPage();
    } else if (location.pathname === "/kf_fw_ig_index.php") {
      init();
    }
    if (Config.blockUserEnabled) blockUsers();
    if (Config.blockThreadEnabled) blockThread();
    if (Config.followUserEnabled) followUsers();
    if (Info_default.isMobile) bindElementTitleClick();
    if (Info_default.isInSpecialDomain) {
      if (["/read.php", "/post.php", "/message.php"].includes(location.pathname)) {
        if (Config.kfSmileEnhanceExtensionEnabled) importKfSmileEnhanceExtension();
        replaceSiteLink();
      }
    }
    $(document).clearQueue("AutoAction");
    if (Config.autoPromoteHaloEnabled && !getCookie(Const_default.promoteHaloCookieName)) {
      $(document).queue("AutoAction", () => getPromoteHaloInfo());
    }
    if (Config.autoGetDailyBonusEnabled && !getCookie(Const_default.getDailyBonusCookieName)) {
      $(document).queue("AutoAction", () => getDailyBonus());
    }
    if ((Info_default.isInHomePage || location.pathname === "/kf_fw_ig_index.php") && Config.autoBuyItemEnabled && !getCookie(Const_default.buyItemCookieName) && !getCookie(Const_default.buyItemReadyCookieName)) {
      $(document).queue("AutoAction", () => buyItems(Config.buyItemIdList));
    }
    $(document).dequeue("AutoAction");
    if (Config.autoChangeIdColorEnabled && !getCookie(Const_default.autoChangeIdColorCookieName)) {
      changeIdColor();
    }
    if (Config.timingModeEnabled && (Info_default.isInHomePage || location.pathname === "/kf_fw_ig_index.php" || /kf_fw_ig_mybp\.php\?openboxes=true/.test(location.href))) {
      startTimingMode();
    }
    if (Config.customScriptEnabled) runCustomScript("end");
    let endDate = /* @__PURE__ */ new Date();
    console.log(`\u3010KF Online\u52A9\u624B\u3011\u521D\u59CB\u5316\u8017\u65F6\uFF1A${endDate - startDate}ms`);
  };
  if (typeof jQuery !== "undefined") {
    $(document).ready(init4);
  }
})();
