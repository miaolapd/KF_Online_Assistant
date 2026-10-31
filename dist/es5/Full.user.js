// ==UserScript==
// @name        KF Online助手
// @namespace   https://greasyfork.org/users/4514
// @icon        https://gitee.com/miaolapd/KF_Online_Assistant/raw/master/icon.png
// @author      喵拉布丁
// @homepage    https://github.com/miaolapd/KF_Online_Assistant
// @description KFOL必备！为绯月ScarletMoon论坛增加了大量人性化、自动化的功能，更多功能开发中……
// @updateURL   https://gitee.com/miaolapd/KF_Online_Assistant/raw/master/dist/es5/Full.meta.js
// @downloadURL https://gitee.com/miaolapd/KF_Online_Assistant/raw/master/dist/es5/Full.user.js
// @require     https://gitee.com/miaolapd/KF_Online_Assistant/raw/master/dist/lib/polyfill.min.js?V6.26.0
// @include     https://*kfpromax.com/*
// @include     https://*9shenmi.com/*
// @include     https://*kfmax.com/*
// @include     https://*bakabbs.com/*
// @include     https://*365gal.com/*
// @include     https://*365galgame.com/*
// @include     https://*fygal.com/*
// @version     15.0.0
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @run-at      document-end
// @license     MIT
// ==/UserScript==
"use strict";

function _toConsumableArray(a) { return _arrayWithoutHoles(a) || _iterableToArray(a) || _unsupportedIterableToArray(a) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { var e = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (Array.isArray(r) && (null == e || e === ("undefined" != typeof Symbol && [][Symbol.iterator]) || e === []["@@iterator"])) return r; if (null != e) { for (var t, o = [], a = e.call(r); !(t = a.next()).done;) o.push(t.value); return o; } }
function _arrayWithoutHoles(a) { if (Array.isArray(a)) return _arrayLikeToArray(a); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var r, e, o = "function" == typeof Symbol ? Symbol : {}, n = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag"; function i(o, n, a, i) { var u = n && n.prototype instanceof Generator ? n : Generator, f = Object.create(u.prototype); return _regeneratorDefine2(f, "_invoke", function (t, o, n) { var a, i, u, f = 0, p = n || [], y = !1, G = { p: 0, n: 0, v: r, a: l, f: l.bind(r, 4), d: function d(t, e) { return a = t, i = 0, u = r, G.n = e, c; } }; function l(t, o) { for (i = t, u = o, e = 0; !y && f && !n && e < p.length; e++) { var n, a = p[e], l = G.p, F = a[2]; t > 3 ? (n = F === o) && (u = a[(i = a[4]) ? 5 : (i = 3, 3)], a[4] = a[5] = r) : a[0] <= l && ((n = t < 2 && l < a[1]) ? (i = 0, G.v = o, G.n = a[1]) : l < F && (n = t < 3 || a[0] > o || o > F) && (a[4] = t, a[5] = o, G.n = F, i = 0)); } if (n || t > 1) return c; throw y = !0, o; } return function (n, p, F) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && l(p, F), i = p, u = F; (e = i < 2 ? r : u) || !y;) { a || (i ? i < 3 ? (i > 1 && (G.n = -1), l(i, u)) : G.n = u : G.v = u); try { if (f = 2, a) { if (i || (n = "next"), e = a[n]) { if (!(e = e.call(a, u))) throw TypeError("iterator result is not an object"); if (!e.done) return e; u = e.value, i < 2 && (i = 0); } else 1 === i && (e = a.return) && e.call(a), i < 2 && (u = TypeError("The iterator does not provide a '" + n + "' method"), i = 1); a = r; } else if ((e = (y = G.n < 0) ? u : t.call(o, G)) !== c) break; } catch (t) { a = r, i = 1, u = t; } finally { f = 1; } } return { value: e, done: y }; }; }(o, a, i), !0), f; } var c = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} e = Object.getPrototypeOf; var u = [][n] ? e(e([][n]())) : (_regeneratorDefine2(e = {}, n, function () { return this; }), e), f = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(u); function p(r) { return Object.setPrototypeOf ? Object.setPrototypeOf(r, GeneratorFunctionPrototype) : (r.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(r, a, "GeneratorFunction")), r.prototype = Object.create(f), r; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(f, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, a, "GeneratorFunction"), _regeneratorDefine2(f), _regeneratorDefine2(f, a, "Generator"), _regeneratorDefine2(f, n, function () { return this; }), _regeneratorDefine2(f, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: p }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(e, i) { return _iterableToArrayLimit(e, i) || _unsupportedIterableToArray(e, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, t) { var e = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (Array.isArray(r) && (null == e || e === ("undefined" != typeof Symbol && [][Symbol.iterator]) || e === []["@@iterator"])) return r; if (null != e) { var l, n, i, a, u = [], o = !0, f = !1; try { if (i = (e = e.call(r)).next, 0 === t) { if (Object(e) !== e) return; o = !1; } else for (; !(o = (l = i.call(e)).done) && (u.push(l.value), u.length !== t); o = !0); } catch (r) { f = !0, n = r; } finally { try { if (!o && null != e.return && (a = e.return(), Object(a) !== a)) return; } finally { if (f) throw n; } } return u; } }
function _createForOfIteratorHelper(e, t) { var _n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"]; if (!_n) { if (Array.isArray(e) || (_n = _unsupportedIterableToArray(e)) || t && e && "number" == typeof e.length) { _n && (e = _n); var o = 0, F = function F() {}; return { s: F, n: function n() { return o >= e.length ? { done: !0 } : { done: !1, value: e[o++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var a, u, i = !0; return { s: function s() { _n = _n.call(e); }, n: function n() { i = !0; var r = _n.next(); return r.done ? { done: !0 } : { value: r.value, done: i = !1 }; }, e: function e(r) { a = !0, u = r; }, f: function f() { try { i || null == _n.return || _n.return(); } finally { if (a) throw u; } } }; }
function _unsupportedIterableToArray(t, e) { if (t) { if ("string" == typeof t) return _arrayLikeToArray(t, e); var o = {}.toString.call(t).slice(8, -1); return "Object" === o && t.constructor && (o = t.constructor.name), "Map" === o || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? _arrayLikeToArray(t, e) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = function __esm(fn, res, err) {
    return function __init() {
      if (err) throw err[0];
      try {
        return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
      } catch (e) {
        throw err = [e], e;
      }
    };
  };
  var __export = function __export(target, all) {
    for (var name4 in all) __defProp(target, name4, {
      get: all[name4],
      enumerable: true
    });
  };
  var __copyProps = function __copyProps(to, from, except, desc) {
    if (from && _typeof(from) === "object" || typeof from === "function") {
      var _iterator = _createForOfIteratorHelper(__getOwnPropNames(from)),
        _step;
      try {
        var _loop = function _loop() {
          var key = _step.value;
          if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: function get() {
              return from[key];
            },
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
          });
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return to;
  };
  var __toCommonJS = function __toCommonJS(mod) {
    return __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
  };

  // src/module/Info.js
  var Info_exports = {};
  __export(Info_exports, {
    default: function _default() {
      return Info_default;
    }
  });
  var Info, Info_default;
  var init_Info = __esm({
    "src/module/Info.js": function src_module_InfoJs() {
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
    default: function _default() {
      return Const_default;
    }
  });
  var storagePrefix, Const, Const_default;
  var init_Const = __esm({
    "src/module/Const.js": function src_module_ConstJs() {
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
        specialAjaxInterval: function specialAjaxInterval() {
          if (Config.slowActionEnabled) return Math.floor(Math.random() * 4e3) + 3e3;else return Math.floor(Math.random() * 200) + 1e3;
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
        storagePrefix: storagePrefix,
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
    addCode: function addCode() {
      return _addCode;
    },
    ajax: function ajax() {
      return _ajax;
    },
    compareSmLevel: function compareSmLevel() {
      return _compareSmLevel;
    },
    copyText: function copyText() {
      return _copyText;
    },
    deepEqual: function deepEqual() {
      return _deepEqual2;
    },
    deleteCookie: function deleteCookie() {
      return _deleteCookie;
    },
    deleteData: function deleteData() {
      return _deleteData;
    },
    entries: function entries() {
      return _entries;
    },
    getCookie: function getCookie() {
      return _getCookie;
    },
    getCurrentThreadPage: function getCurrentThreadPage() {
      return _getCurrentThreadPage;
    },
    getDate: function getDate() {
      return _getDate;
    },
    getDateByTime: function getDateByTime() {
      return _getDateByTime;
    },
    getDateString: function getDateString() {
      return _getDateString;
    },
    getDifferenceSetOfObject: function getDifferenceSetOfObject() {
      return _getDifferenceSetOfObject;
    },
    getFixedNumLocStr: function getFixedNumLocStr() {
      return _getFixedNumLocStr;
    },
    getFloorUserName: function getFloorUserName() {
      return _getFloorUserName;
    },
    getGBKEncodeString: function getGBKEncodeString() {
      return _getGBKEncodeString;
    },
    getHostNameUrl: function getHostNameUrl() {
      return _getHostNameUrl;
    },
    getMidnightHourDate: function getMidnightHourDate() {
      return _getMidnightHourDate;
    },
    getObjectKeyList: function getObjectKeyList() {
      return _getObjectKeyList;
    },
    getResponseMsg: function getResponseMsg() {
      return _getResponseMsg;
    },
    getSelText: function getSelText() {
      return _getSelText;
    },
    getSortedObjectKeyList: function getSortedObjectKeyList() {
      return _getSortedObjectKeyList;
    },
    getStatFormatNumber: function getStatFormatNumber() {
      return _getStatFormatNumber;
    },
    getStrByteLen: function getStrByteLen() {
      return _getStrByteLen;
    },
    getThreadSfParam: function getThreadSfParam() {
      return _getThreadSfParam;
    },
    getTimeDiffInfo: function getTimeDiffInfo() {
      return _getTimeDiffInfo;
    },
    getTimeString: function getTimeString() {
      return _getTimeString;
    },
    getTimezoneDateByTime: function getTimezoneDateByTime() {
      return _getTimezoneDateByTime;
    },
    getUrlParam: function getUrlParam() {
      return _getUrlParam;
    },
    htmlDecode: function htmlDecode() {
      return _htmlDecode;
    },
    htmlEncode: function htmlEncode() {
      return _htmlEncode;
    },
    inFollowOrBlockUserList: function inFollowOrBlockUserList() {
      return _inFollowOrBlockUserList;
    },
    isBetweenInTimeRange: function isBetweenInTimeRange() {
      return _isBetweenInTimeRange;
    },
    isEdge: function isEdge() {
      return _isEdge;
    },
    isIE: function isIE() {
      return _isIE;
    },
    isOpera: function isOpera() {
      return _isOpera;
    },
    readData: function readData() {
      return _readData;
    },
    removeHtmlTag: function removeHtmlTag() {
      return _removeHtmlTag;
    },
    removeUnpairedBBCodeContent: function removeUnpairedBBCodeContent() {
      return _removeUnpairedBBCodeContent;
    },
    selectAll: function selectAll() {
      return _selectAll;
    },
    selectInverse: function selectInverse() {
      return _selectInverse;
    },
    setCookie: function setCookie() {
      return _setCookie;
    },
    writeData: function writeData() {
      return _writeData;
    }
  });
  var _setCookie, _getCookie, _deleteCookie, _getDateByTime, _getTimezoneDateByTime, _getMidnightHourDate, _getDate, _getDateString, _getTimeString, _getTimeDiffInfo, _isBetweenInTimeRange, _getHostNameUrl, _getDifferenceSetOfObject, _deepEqual2, _getUrlParam, _getGBKEncodeString, _htmlEncode, _htmlDecode, _removeHtmlTag, _getObjectKeyList, _getSortedObjectKeyList, _getStatFormatNumber, _isOpera, _isIE, _isEdge, _compareSmLevel, _getCurrentThreadPage, _getFixedNumLocStr, _removeUnpairedBBCodeContent, _getStrByteLen, _addCode, _getSelText, _copyText, _getResponseMsg, _entries, _inFollowOrBlockUserList, _selectAll, _selectInverse, _readData, _writeData, _deleteData, _getThreadSfParam, _ajax, _getFloorUserName;
  var init_Util = __esm({
    "src/module/Util.js": function src_module_UtilJs() {
      "use strict";

      init_Info();
      init_Const();
      _setCookie = function _setCookie(name4, value) {
        var date = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Info_default.uid + "_" + Const_default.storagePrefix;
        document.cookie = "".concat(prefix).concat(name4, "=").concat(encodeURI(value)).concat(!date ? "" : ";expires=" + date.toUTCString(), ";path=/;");
      };
      _getCookie = function _getCookie(name4) {
        var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Info_default.uid + "_" + Const_default.storagePrefix;
        var regex2 = new RegExp("(^| )".concat(prefix).concat(name4, "=([^;]*)(;|$)"));
        var matches = document.cookie.match(regex2);
        if (!matches) return null;else return decodeURI(matches[2]);
      };
      _deleteCookie = function _deleteCookie(name4) {
        var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Info_default.uid + "_" + Const_default.storagePrefix;
        document.cookie = "".concat(prefix).concat(name4, "=;expires=").concat(_getDate("-1y").toUTCString(), ";path=/;");
      };
      _getDateByTime = function _getDateByTime(time) {
        var date = /* @__PURE__ */new Date();
        var _time$split = time.split(":"),
          _time$split2 = _slicedToArray(_time$split, 3),
          hour = _time$split2[0],
          minute = _time$split2[1],
          second = _time$split2[2];
        if (typeof hour !== "undefined") date.setHours(parseInt(hour));
        if (typeof minute !== "undefined") date.setMinutes(parseInt(minute));
        if (typeof second !== "undefined") date.setSeconds(parseInt(second));
        date.setMilliseconds(0);
        return date;
      };
      _getTimezoneDateByTime = function _getTimezoneDateByTime(time) {
        var timezoneOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Const_default.forumTimezoneOffset;
        var date = /* @__PURE__ */new Date();
        var _time$split3 = time.split(":"),
          _time$split4 = _slicedToArray(_time$split3, 3),
          hour = _time$split4[0],
          minute = _time$split4[1],
          second = _time$split4[2];
        if (typeof hour !== "undefined") date.setUTCHours(parseInt(hour) + timezoneOffset);
        if (typeof minute !== "undefined") date.setUTCMinutes(parseInt(minute));
        if (typeof second !== "undefined") date.setUTCSeconds(parseInt(second));
        date.setUTCMilliseconds(0);
        var now = /* @__PURE__ */new Date();
        if (now.getDate() > date.getDate() || now.getMonth() > date.getMonth() || now.getFullYear() > date.getFullYear()) {
          date.setDate(date.getDate() + 1);
        }
        return date;
      };
      _getMidnightHourDate = function _getMidnightHourDate(days) {
        var date = _getDateByTime("00:00:00");
        date.setDate(date.getDate() + days);
        return date;
      };
      _getDate = function _getDate(value) {
        var date = /* @__PURE__ */new Date();
        var matches = /^(-|\+)?(\d+)([a-zA-Z]{1,2})$/.exec(value);
        if (!matches) return null;
        var flag2 = typeof matches[1] === "undefined" ? 0 : matches[1] === "+" ? 1 : -1;
        var increment = flag2 === -1 ? -parseInt(matches[2]) : parseInt(matches[2]);
        var unit = matches[3];
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
      _getDateString = function _getDateString(date) {
        var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "-";
        date = date ? date : /* @__PURE__ */new Date();
        var month = (date.getMonth() + 1).toString();
        var day = date.getDate().toString();
        return date.getFullYear() + separator + month.padStart(2, "0") + separator + day.padStart(2, "0");
      };
      _getTimeString = function _getTimeString() {
        var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /* @__PURE__ */new Date();
        var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ":";
        var isShowSecond = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var hour = date.getHours().toString();
        var minute = date.getMinutes().toString();
        var second = date.getSeconds().toString();
        return hour.padStart(2, "0") + separator + minute.padStart(2, "0") + (isShowSecond ? separator : "") + (isShowSecond ? second.padStart(2, "0") : "");
      };
      _getTimeDiffInfo = function _getTimeDiffInfo(timestamp) {
        var diff = timestamp - $.now();
        if (diff > 0) {
          diff = Math.floor(diff / 1e3);
          var hours = Math.floor(diff / 60 / 60);
          if (hours >= 0) {
            var minutes = Math.floor((diff - hours * 60 * 60) / 60);
            if (minutes < 0) minutes = 0;
            var seconds = Math.floor(diff - hours * 60 * 60 - minutes * 60);
            if (seconds < 0) seconds = 0;
            return {
              hours: hours,
              minutes: minutes,
              seconds: seconds
            };
          }
        }
        return {
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      };
      _isBetweenInTimeRange = function _isBetweenInTimeRange(time, range) {
        var _range$split = range.split("-"),
          _range$split2 = _slicedToArray(_range$split, 2),
          range1 = _range$split2[0],
          range2 = _range$split2[1];
        if (typeof range2 === "undefined") return null;
        var start = _getDateByTime(range1);
        var end = _getDateByTime(range2);
        if (end < start) {
          if (time > end) end.setDate(end.getDate() + 1);else start.setDate(start.getDate() - 1);
        }
        return time >= start && time <= end;
      };
      _getHostNameUrl = function _getHostNameUrl() {
        return "".concat(location.protocol, "//").concat(location.host, "/");
      };
      _getDifferenceSetOfObject = function _getDifferenceSetOfObject(a, b) {
        var c = {};
        if ($.type(a) !== "object" || $.type(b) !== "object") return c;
        $.each(b, function (key, data) {
          if (key in a) {
            if (!_deepEqual2(a[key], data)) c[key] = data;
          }
        });
        return c;
      };
      _deepEqual2 = function _deepEqual(a, b) {
        if (a === b) return true;
        if ($.type(a) !== $.type(b)) return false;
        if (typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b)) return true;
        if ($.isArray(a) && $.isArray(b) || $.type(a) === "object" && $.type(b) === "object") {
          if (a.length !== b.length) return false;
          for (var i in $.extend($.isArray(a) ? [] : {}, a, b)) {
            if (typeof a[i] === "undefined" || typeof b[i] === "undefined") return false;
            if (!_deepEqual2(a[i], b[i])) return false;
          }
          return true;
        }
        return false;
      };
      _getUrlParam = function _getUrlParam(name4) {
        var regex2 = new RegExp("(^|&)" + name4 + "=([^&]*)(&|$)");
        var matches = location.search.substring(1).match(regex2);
        if (matches) return decodeURI(matches[2]);else return null;
      };
      _getGBKEncodeString = function _getGBKEncodeString(str) {
        var img = document.createElement("img");
        img.src = "nothing?sp=" + str;
        document.body.appendChild(img);
        var encodeStr = img.src.split("nothing?sp=").pop();
        document.body.removeChild(img);
        return encodeStr;
      };
      _htmlEncode = function _htmlEncode(str) {
        if (!str.length) return "";
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;").replace(/\'/g, "&#39;").replace(/\"/g, "&quot;").replace(/\n/g, "<br>");
      };
      _htmlDecode = function _htmlDecode(str) {
        if (!str.length) return "";
        return str.replace(/<br\s*\/?>/gi, "\n").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'").replace(/&nbsp;/gi, " ").replace(/&gt;/gi, ">").replace(/&lt;/gi, "<").replace(/&amp;/gi, "&");
      };
      _removeHtmlTag = function _removeHtmlTag(html2) {
        return html2 ? html2.replace(/<br\s*\/?>/g, "\n").replace(/<[^>]+>/g, "") : "";
      };
      _getObjectKeyList = function _getObjectKeyList(obj) {
        var sortBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var list = [];
        if ($.type(obj) !== "object") return list;
        for (var key in obj) {
          list.push(key);
        }
        if (sortBy !== 0) {
          list.sort(function (a, b) {
            return sortBy > 0 ? a > b ? 1 : -1 : a < b ? 1 : -1;
          });
        }
        return list;
      };
      _getSortedObjectKeyList = function _getSortedObjectKeyList(sortKeyList, obj) {
        var list = _getObjectKeyList(obj);
        list.sort(function (a, b) {
          return sortKeyList.indexOf(a) > sortKeyList.indexOf(b) ? 1 : -1;
        });
        return list;
      };
      _getStatFormatNumber = function _getStatFormatNumber(num2) {
        return num2 >= 0 ? "<em>+".concat(num2.toLocaleString(), "</em>") : "<ins>".concat(num2.toLocaleString(), "</ins>");
      };
      _isOpera = function _isOpera() {
        return typeof Info_default.w.opera !== "undefined";
      };
      _isIE = function _isIE() {
        return typeof navigator.msMaxTouchPoints !== "undefined";
      };
      _isEdge = function _isEdge() {
        return navigator.appVersion && navigator.appVersion.includes("Edge");
      };
      _compareSmLevel = function _compareSmLevel(a, b) {
        var x = a.toUpperCase() === "MAX" ? Number.MAX_VALUE : parseInt(a);
        var y = b.toUpperCase() === "MAX" ? Number.MAX_VALUE : parseInt(b);
        if (x > y) return 1;else if (x < y) return -1;else return 0;
      };
      _getCurrentThreadPage = function _getCurrentThreadPage() {
        var matches = /- (\d+) -/.exec($('.pages:first > li > a[href="javascript:;"]').text());
        return matches ? parseInt(matches[1]) : 1;
      };
      _getFixedNumLocStr = function _getFixedNumLocStr(num2) {
        var digit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var _num2$toFixed$split = num2.toFixed(digit).split("."),
          _num2$toFixed$split2 = _slicedToArray(_num2$toFixed$split, 2),
          iNum = _num2$toFixed$split2[0],
          dNum = _num2$toFixed$split2[1];
        var iStr = parseInt(iNum).toLocaleString();
        var dStr = "";
        if (typeof dNum !== "undefined") dStr = "." + dNum;
        return iStr + dStr;
      };
      _removeUnpairedBBCodeContent = function _removeUnpairedBBCodeContent(content) {
        var startCodeList = [/\[color=.+?\]/g, /\[backcolor=.+?\]/g, /\[size=.+?\]/g, /\[font=.+?\]/g, /\[align=.+?\]/g, /\[b\]/g, /\[i\]/g, /\[u\]/g, /\[strike\]/g, /\[sup\]/g, /\[sub\]/g];
        var endCodeList = [/\[\/color\]/g, /\[\/backcolor\]/g, /\[\/size\]/g, /\[\/font\]/g, /\[\/align\]/g, /\[\/b\]/g, /\[\/i\]/g, /\[\/u\]/g, /\[\/strike\]/g, /\[\/sup\]/g, /\[\/sub\]/g];
        for (var i = 0; i < startCodeList.length; i++) {
          var startMatches = content.match(startCodeList[i]);
          var endMatches = content.match(endCodeList[i]);
          var startMatchesNum = startMatches ? startMatches.length : 0;
          var endMatchesNum = endMatches ? endMatches.length : 0;
          if (startMatchesNum !== endMatchesNum) {
            content = content.replace(startCodeList[i], "").replace(endCodeList[i], "");
          }
        }
        return content;
      };
      _getStrByteLen = function _getStrByteLen(str) {
        var len = 0;
        var cLen = 2;
        for (var i = 0; i < str.length; i++) {
          len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? cLen : 1;
        }
        return len;
      };
      _addCode = function _addCode(textArea, code) {
        var selText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
        var startPos = !selText ? code.indexOf("]") + 1 : code.indexOf(selText);
        if (typeof textArea.selectionStart !== "undefined") {
          var prePos = textArea.selectionStart;
          textArea.value = textArea.value.substring(0, prePos) + code + textArea.value.substring(textArea.selectionEnd);
          textArea.selectionStart = prePos + startPos;
          textArea.selectionEnd = prePos + startPos + selText.length;
        } else {
          textArea.value += code;
        }
      };
      _getSelText = function _getSelText(textArea) {
        return textArea.value.substring(textArea.selectionStart, textArea.selectionEnd);
      };
      _copyText = function _copyText($target) {
        var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        var $excludeElem = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        if (!("execCommand" in document) || !$target.length) return false;
        var copyText2 = $target.data("copy-text");
        if (copyText2) {
          $target = $("<span class=\"pd_hide\">".concat(copyText2.replace(/\n/g, "<br>"), "</span>")).insertAfter($target);
        }
        if ($excludeElem) $excludeElem.prop("hidden", true);
        var result2 = null;
        if ($target.is("input, textarea")) {
          $target.select();
          result2 = document.execCommand("copy");
        } else {
          var s = window.getSelection();
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
      _getResponseMsg = function _getResponseMsg(html2) {
        var type = 0;
        var msg = "",
          url = "";
        var matches = /<span style=".+?">(.+?)<\/span><br\s*\/?><a href="(.+?)">/i.exec(html2);
        if (matches) {
          type = 1;
          msg = matches[1];
          url = matches[2];
        } else {
          var matches2 = /操作提示<br\s*\/?>\r\n(.+?)<br\s*\/?>\r\n<a href="javascript:history\.go\(-1\);">返回上一步操作<\/a>/i.exec(html2);
          if (matches2) {
            type = -1;
            msg = matches2[1];
          }
        }
        return {
          type: type,
          msg: msg ? msg : "\u672A\u80FD\u83B7\u5F97\u9884\u671F\u7684\u56DE\u5E94",
          url: url
        };
      };
      _entries = /*#__PURE__*/_regenerator().m(function _entries(obj) {
        var _i, _Object$keys, key;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _i = 0, _Object$keys = Object.keys(obj);
            case 1:
              if (!(_i < _Object$keys.length)) {
                _context.n = 3;
                break;
              }
              key = _Object$keys[_i];
              _context.n = 2;
              return [key, obj[key]];
            case 2:
              _i++;
              _context.n = 1;
              break;
            case 3:
              return _context.a(2);
          }
        }, _entries);
      });
      _inFollowOrBlockUserList = function _inFollowOrBlockUserList(name4, list) {
        return list.findIndex(function (data) {
          return data.name && data.name === name4;
        });
      };
      _selectAll = function _selectAll($nodes) {
        $nodes.prop("checked", true);
        return false;
      };
      _selectInverse = function _selectInverse($nodes) {
        $nodes.each(function () {
          var $this2 = $(this);
          $this2.prop("checked", !$this2.prop("checked"));
        });
        return false;
      };
      _readData = function _readData(key) {
        var storageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Info_default.storageType;
        return storageType === "ByUid" || storageType === "Global" ? GM_getValue(key) : localStorage.getItem(key);
      };
      _writeData = function _writeData(key, value) {
        var storageType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Info_default.storageType;
        try {
          if (storageType === "ByUid" || storageType === "Global") GM_setValue(key, value);else localStorage.setItem(key, value);
        } catch (ex) {
          console.log(ex);
          alert("\u5199\u5165\u6570\u636E\u5931\u8D25\uFF0C\u53EF\u80FD\u662F\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u6240\u8BBE\u5B9A\u7684\u5B58\u50A8\u7C7B\u578B\u6216localStorage\u8D85\u51FA\u9650\u989D");
        }
      };
      _deleteData = function _deleteData(key) {
        var storageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Info_default.storageType;
        if (storageType === "ByUid" || storageType === "Global") GM_deleteValue(key);else localStorage.removeItem(key);
      };
      _getThreadSfParam = function _getThreadSfParam() {
        var sf = "";
        var matches = /&sf=(\w+)/.exec($(".pages:first > li:first-child > a").attr("href"));
        if (matches) {
          sf = matches[1];
        } else {
          sf = _getUrlParam("sf");
        }
        return sf ? sf : "";
      };
      _ajax = function _ajax(param) {
        if (!param.timeout) {
          param.timeout = Const_default.defAjaxTimeout;
        }
        if (param.url.startsWith("kf_fw_ig_index.php")) {
          var num2 = Info_default.ajaxStat["kf_fw_ig_index.php"];
          num2 = num2 ? num2 : 0;
          Info_default.ajaxStat["kf_fw_ig_index.php"] = ++num2;
          if (num2 > 20) {
            Info_default.ajaxStat["kf_fw_ig_index.php"] = 0;
            setTimeout(function () {
              $.ajax(param);
            }, 60 * 1e3);
            return;
          }
        }
        $.ajax(param);
      };
      _getFloorUserName = function _getFloorUserName(name4) {
        name4 = $.trim(name4);
        if (name4.includes(" ")) {
          var arr = name4.split(" ");
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
    clear: function clear() {
      return _clear;
    },
    getMergeLog: function getMergeLog() {
      return _getMergeLog;
    },
    push: function push() {
      return _push;
    },
    read: function read() {
      return _read;
    },
    write: function write() {
      return _write;
    }
  });
  var name, _read, _write, _clear, _push, _getMergeLog;
  var init_Log = __esm({
    "src/module/Log.js": function src_module_LogJs() {
      "use strict";

      init_Info();
      init_Util();
      init_Const();
      name = Const_default.storagePrefix + "log";
      _read = function _read() {
        var log2 = {};
        var options = _readData(name + "_" + Info_default.uid);
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
      _write = function _write(log2) {
        return _writeData(name + "_" + Info_default.uid, JSON.stringify(log2));
      };
      _clear = function _clear() {
        return _deleteData(name + "_" + Info_default.uid);
      };
      _push = function _push(type, action) {
        var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref$gain = _ref.gain,
          gain = _ref$gain === void 0 ? null : _ref$gain,
          _ref$pay = _ref.pay,
          pay = _ref$pay === void 0 ? null : _ref$pay;
        var log2 = _read();
        var overdueDate = _getDateString(_getDate("-".concat(Config.logSaveDays, "d")));
        var _iterator2 = _createForOfIteratorHelper(_getObjectKeyList(log2, 1)),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var date = _step2.value;
            if (date <= overdueDate) delete log2[date];else break;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        var now = /* @__PURE__ */new Date();
        var time = now.getTime();
        var today = _getDateString(now);
        var obj = {
          time: time,
          type: type,
          action: action
        };
        if (gain) obj["gain"] = gain;
        if (pay) obj["pay"] = pay;
        if (!Array.isArray(log2[today])) log2[today] = [];
        log2[today].push(obj);
        _write(log2);
      };
      _getMergeLog = function _getMergeLog(log2, newLog) {
        for (var date in newLog) {
          if (!Array.isArray(log2[date])) {
            log2[date] = newLog[date];
          } else {
            var _iterator3 = _createForOfIteratorHelper(newLog[date]),
              _step3;
            try {
              var _loop2 = function _loop2() {
                var newItem = _step3.value;
                if (typeof newItem.time !== "number" || typeof newItem.type !== "string") return 1; // continue
                var index = log2[date].findIndex(function (item) {
                  return newItem["time"] === item["time"] && newItem["type"] === item["type"];
                });
                if (index > -1) log2[date][index] = newItem;else log2[date].push(newItem);
              };
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                if (_loop2()) continue;
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
            log2[date].sort(function (a, b) {
              return a.time > b.time ? 1 : -1;
            });
          }
        }
        return log2;
      };
    }
  });

  // src/module/TmpLog.js
  var TmpLog_exports = {};
  __export(TmpLog_exports, {
    clear: function clear() {
      return clear2;
    },
    deleteValue: function deleteValue() {
      return _deleteValue;
    },
    getValue: function getValue() {
      return _getValue;
    },
    read: function read() {
      return read2;
    },
    setValue: function setValue() {
      return _setValue;
    },
    write: function write() {
      return write2;
    }
  });
  var name2, read2, write2, clear2, _getValue, _setValue, _deleteValue;
  var init_TmpLog = __esm({
    "src/module/TmpLog.js": function src_module_TmpLogJs() {
      "use strict";

      init_Info();
      init_Const();
      init_Util();
      name2 = Const_default.storagePrefix + "tmp_log";
      read2 = function read2() {
        var log2 = {};
        var options = _readData(name2 + "_" + Info_default.uid);
        if (!options) return log2;
        try {
          options = JSON.parse(options);
        } catch (ex) {
          return log2;
        }
        if (!options || $.type(options) !== "object") return log2;
        var allowKeys = [];
        for (var k in Const_default) {
          if (k.endsWith("TmpLogName")) allowKeys.push(Const_default[k]);
        }
        for (var _i2 = 0, _Object$keys2 = Object.keys(options); _i2 < _Object$keys2.length; _i2++) {
          var _k = _Object$keys2[_i2];
          if (!allowKeys.includes(_k)) delete options[_k];
        }
        log2 = options;
        return log2;
      };
      write2 = function write2(log2) {
        return _writeData(name2 + "_" + Info_default.uid, JSON.stringify(log2));
      };
      clear2 = function clear2() {
        return _deleteData(name2 + "_" + Info_default.uid);
      };
      _getValue = function _getValue(key) {
        var log2 = read2();
        return key in log2 ? log2[key] : null;
      };
      _setValue = function _setValue(key, value) {
        var log2 = read2();
        log2[key] = value;
        write2(log2);
      };
      _deleteValue = function _deleteValue(key) {
        var log2 = read2();
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
    destroy: function destroy() {
      return _destroy;
    },
    remove: function remove() {
      return _remove;
    },
    show: function show() {
      return _show;
    },
    wait: function wait() {
      return _wait;
    }
  });
  var _show, _wait, _remove, _destroy;
  var init_Msg = __esm({
    "src/module/Msg.js": function src_module_MsgJs() {
      "use strict";

      _show = function _show(options, duration) {
        var settings = {
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
        if ($(".pd_msg").length > 20) _destroy();
        var $container = $(".pd_msg_container");
        var isFirst = $container.length === 0;
        if (!isFirst && !$(".pd_mask").length) {
          var $lastTips = $(".pd_msg:last");
          if ($lastTips.length > 0) {
            var top = $lastTips.offset().top;
            var winScrollTop = $(window).scrollTop();
            if (top < winScrollTop || top >= winScrollTop + $(window).height() - $lastTips.outerHeight() - 10) {
              _destroy();
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
        var $msg = $("<div class=\"pd_msg\">".concat(settings.msg, "</div>")).appendTo($container);
        $msg.on("click", ".pd_stop_action", function (e) {
          e.preventDefault();
          $(this).html("\u6B63\u5728\u505C\u6B62&hellip;").closest(".pd_msg").data("stop", true);
        });
        if (settings.clickable) {
          $msg.css("cursor", "pointer").click(function () {
            $(this).stop(true, true).fadeOut("slow", function () {
              _remove($(this));
            });
          }).find("a").click(function (e) {
            e.stopPropagation();
          });
        }
        var windowWidth = $(window).width();
        var popTipsWidth = $msg.outerWidth(),
          popTipsHeight = $msg.outerHeight();
        var left = windowWidth / 2 - popTipsWidth / 2;
        if (left + popTipsWidth > windowWidth) left = windowWidth - popTipsWidth - 20;
        if (left < 0) left = 0;
        if (isFirst) {
          $container.css("top", $(window).height() / 2 - popTipsHeight / 2);
        } else {
          $container.stop(false, true).animate({
            "top": "-=" + popTipsHeight / 1.75
          });
        }
        $(":focus").blur();
        var $prev = $msg.prev(".pd_msg");
        $msg.css({
          "top": $prev.length > 0 ? parseInt($prev.css("top")) + $prev.outerHeight() + 5 : 0,
          left: left
        }).fadeIn("slow");
        if (settings.duration !== -1) {
          $msg.delay(settings.duration * 1e3).fadeOut("slow", function () {
            _remove($(this));
          });
        }
        return $msg;
      };
      _wait = function _wait(msg) {
        var preventable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        return _show({
          msg: msg,
          duration: -1,
          clickable: false,
          preventable: preventable
        });
      };
      _remove = function _remove($msg) {
        var $parent = $msg.parent();
        $msg.remove();
        if (!$(".pd_msg").length) {
          $parent.remove();
          $(".pd_mask").remove();
        } else if (!$(".pd_countdown").length) {
          $(".pd_mask").remove();
        }
      };
      _destroy = function _destroy() {
        $(".pd_msg_container").remove();
        $(".pd_mask").remove();
      };
    }
  });

  // src/module/Loot.js
  var Loot_exports = {};
  __export(Loot_exports, {
    addUserLinkInHaloPage: function addUserLinkInHaloPage() {
      return _addUserLinkInHaloPage;
    },
    addUserLinkInPkListPage: function addUserLinkInPkListPage() {
      return _addUserLinkInPkListPage;
    },
    changePointsAndArms: function changePointsAndArms() {
      return _changePointsAndArms;
    },
    enhanceLootIndexPage: function enhanceLootIndexPage() {
      return _enhanceLootIndexPage;
    },
    getCurrentAssignedPoint: function getCurrentAssignedPoint() {
      return _getCurrentAssignedPoint;
    },
    getExtraPoint: function getExtraPoint() {
      return _getExtraPoint;
    },
    getFieldNameByPointName: function getFieldNameByPointName() {
      return _getFieldNameByPointName;
    },
    getHaloInfo: function getHaloInfo() {
      return _getHaloInfo;
    },
    getLevelInfo: function getLevelInfo() {
      return _getLevelInfo;
    },
    getLevelInfoList: function getLevelInfoList() {
      return _getLevelInfoList;
    },
    getLogList: function getLogList() {
      return _getLogList;
    },
    getLootInfo: function getLootInfo() {
      return _getLootInfo;
    },
    getPointByProperty: function getPointByProperty() {
      return _getPointByProperty;
    },
    getPointNameByFieldName: function getPointNameByFieldName() {
      return _getPointNameByFieldName;
    },
    getPromoteHaloCostByTypeId: function getPromoteHaloCostByTypeId() {
      return _getPromoteHaloCostByTypeId;
    },
    getPromoteHaloInfo: function getPromoteHaloInfo() {
      return _getPromoteHaloInfo2;
    },
    getPropertyByPoint: function getPropertyByPoint() {
      return _getPropertyByPoint;
    },
    getSkillAttack: function getSkillAttack() {
      return _getSkillAttack;
    },
    init: function init() {
      return _init;
    },
    promoteHalo: function promoteHalo() {
      return _promoteHalo;
    },
    setHaloInfo: function setHaloInfo() {
      return _setHaloInfo;
    },
    updateLootInfo: function updateLootInfo() {
      return _updateLootInfo2;
    }
  });
  var safeId, $properties, $points, $armArea, $logBox, $log, log, logList, levelInfoList, propertyList, extraPointsList, haloInfo, currentArmInfo, armsLevelList, itemUsedNumList, changePointsAvailableCount, serverStatus, _init, _enhanceLootIndexPage, handlePropertiesArea, handlePointsArea, checkPoints, getLootPropertyList, _getCurrentAssignedPoint, _getSkillAttack, _getPointNameByFieldName, _getFieldNameByPointName, _getExtraPoint, _getPropertyByPoint, _getPointByProperty, addLevelPointListSelect, fillPoints, setLevelPointListSelect, _changePointsAndArms, _updateLootInfo2, _getLootInfo, _showLevelPointListConfigDialog, addOrChangeArm, showAddOrChangeArmDialog, _getLogList, _getLevelInfo, _getLevelInfoList, getCurrentLevel, _addUserLinkInPkListPage, _addUserLinkInHaloPage, _readHaloInfo, _getHaloInfo, _setHaloInfo, _getPromoteHaloInfo2, _promoteHalo, _getPromoteHaloCostByTypeId;
  var init_Loot = __esm({
    "src/module/Loot.js": function src_module_LootJs() {
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
      currentArmInfo = /* @__PURE__ */new Map();
      armsLevelList = /* @__PURE__ */new Map();
      itemUsedNumList = /* @__PURE__ */new Map();
      changePointsAvailableCount = 0;
      serverStatus = "";
      _init = function _init() {
        safeId = _getSafeId();
        if (!safeId) return;
        $properties = $(".kf_fw_ig3:first");
        $points = $("#wdsx .kf_fw_ig1:first");
        $points.find("> tbody > tr:first-child > td").attr("id", "pdArmArea");
        $armArea = $points.find("#pdArmArea");
        var tmpHaloInfo = _getValue(Const_default.haloInfoTmpLogName);
        if (tmpHaloInfo && $.type(tmpHaloInfo) === "object") {
          var diff = $.now() - tmpHaloInfo.time;
          if (diff >= 0 && diff < Const_default.tmpHaloInfoExpires * 60 * 1e3) {
            delete tmpHaloInfo.time;
            _setHaloInfo(tmpHaloInfo);
            _enhanceLootIndexPage();
          } else _readHaloInfo(true);
        } else _readHaloInfo(true);
      };
      _enhanceLootIndexPage = function _enhanceLootIndexPage() {
        _runFunc("Loot.enhanceLootIndexPage_before_");
        var propertiesHtml = $properties.html();
        propertyList = getLootPropertyList(propertiesHtml);
        itemUsedNumList = _getItemsUsedNumInfo(propertiesHtml);
        armsLevelList = _getArmsLevelInfo(propertiesHtml);
        var armHtml = $armArea.html();
        if (armHtml.includes("\uFF08\u88C5\u5907\u4E2D\uFF09")) {
          var _armHtml$split = armHtml.split("<br><br>"),
            _armHtml$split2 = _slicedToArray(_armHtml$split, 1),
            armInfoHtml = _armHtml$split2[0];
          var _armInfoHtml$split = armInfoHtml.split("\uFF08\u88C5\u5907\u4E2D\uFF09"),
            _armInfoHtml$split2 = _slicedToArray(_armInfoHtml$split, 3),
            _armInfoHtml$split2$ = _armInfoHtml$split2[1],
            weaponInfoHtml = _armInfoHtml$split2$ === void 0 ? "" : _armInfoHtml$split2$,
            _armInfoHtml$split2$2 = _armInfoHtml$split2[2],
            armorInfoHtml = _armInfoHtml$split2$2 === void 0 ? "" : _armInfoHtml$split2$2;
          currentArmInfo.set("\u6B66\u5668", _getArmInfo(weaponInfoHtml));
          currentArmInfo.set("\u62A4\u7532", _getArmInfo(armorInfoHtml));
        } else {
          console.log("\u9700\u8981\u81F3\u5C11\u4F7F\u7528\u4E00\u4EF6\u88C5\u5907\u624D\u80FD\u5728\u6B64\u9875\u9762\u6B63\u5E38\u4F7F\u7528KFOL\u52A9\u624B\u7684\u529F\u80FD");
          return;
        }
        $logBox = $("#pk_text_div");
        $log = $("#pk_text");
        log = $log.html();
        logList = _getLogList(log);
        levelInfoList = _getLevelInfoList(logList);
        handlePropertiesArea();
        handlePointsArea();
        addLevelPointListSelect();
        if (Config.alwaysOpenPointAreaEnabled) {
          $("#wdsx").show();
        }
        _runFunc("Loot.enhanceLootIndexPage_after_");
      };
      handlePropertiesArea = function handlePropertiesArea() {
        $properties.attr("id", "pdPropertiesArea").find("input[value$=\"\u53EF\u5206\u914D\u5C5E\u6027\"]").after('<span id="pdSurplusPoint" class="pd_property_diff" hidden>(<em></em>)</span>');
        var $serverStatus = $properties.find("> tbody > tr:first-child td:contains(\"\u9519\u9AD8\u5CF0\u798F\u5229\") > span:last").attr("id", "pdServerStatus");
        if ($serverStatus.length > 0) {
          serverStatus = $serverStatus.text().trim();
          $serverStatus.attr("id", "pdServerStatus").data("prev-status", serverStatus);
        }
        $properties.on("change", ".pd_arm_level", function () {
          var type = $(this).data("type");
          var diffName = "Weapon";
          if (type === "\u62A4\u7532") diffName = "Armor";else if (type === "\u9879\u94FE") diffName = "Necklace";
          $("#pd".concat(diffName, "ExpDiff em")).text(armsLevelList.get(type)["\u7ECF\u9A8C"] - Math.pow(armsLevelList.get(type)["\u7B49\u7EA7"] + 1, 2) * 2);
        });
        $properties.find("input[value^=\"\u6B66\u5668\u7B49\u7EA7\"]").addClass("pd_arm_level").attr("data-type", "\u6B66\u5668").after("<span id=\"pdWeaponExpDiff\" class=\"pd_property_diff\" title=\"\u4E0B\u4E00\u7EA7\u7ECF\u9A8C\u5DEE\u503C\" style=\"color: #393;\">(<em></em>)</span>").trigger("change");
        $properties.find("input[value^=\"\u62A4\u7532\u7B49\u7EA7\"]").addClass("pd_arm_level").attr("data-type", "\u62A4\u7532").after("<span id=\"pdArmorExpDiff\" class=\"pd_property_diff\" title=\"\u4E0B\u4E00\u7EA7\u7ECF\u9A8C\u5DEE\u503C\" style=\"color: #393;\">(<em></em>)</span>").trigger("change");
        $properties.find("input[value^=\"\u9879\u94FE\u7B49\u7EA7\"]").addClass("pd_arm_level").attr("data-type", "\u9879\u94FE").after("<span id=\"pdNecklaceExpDiff\" class=\"pd_property_diff\" title=\"\u4E0B\u4E00\u7EA7\u7ECF\u9A8C\u5DEE\u503C\" style=\"color: #393;\">(<em></em>)</span>").trigger("change");
        $("<a data-name=\"copyParameterSetting\" href=\"#\" style=\"margin-left: -20px;\" title=\"\u590D\u5236\u8BA1\u7B97\u5668\u7684\u90E8\u5206\u53C2\u6570\u8BBE\u7F6E\uFF08\u5305\u62EC\u795E\u79D8\u7CFB\u6570\u3001\u5149\u73AF\u548C\u9053\u5177\u6570\u91CF\uFF09\">\u590D</a>").insertAfter($properties.find("input[value$=\"\u857E\u7C73\u8389\u4E9A\u540C\u4EBA\u6F2B\u753B\"]")).click(function (e) {
          e.preventDefault();
          var $this2 = $(this);
          var coefficient = Math.floor((propertyList["\u53EF\u5206\u914D\u5C5E\u6027\u70B9"] - 50 - (itemUsedNumList.get("\u6863\u6848\u5BA4\u94A5\u5319") === 30 ? 30 : 0) - (itemUsedNumList.get("\u6D88\u901D\u4E4B\u836F") === 10 ? 120 : 0)) / 5);
          var copyText2 = coefficient + " " + Math.floor(haloInfo["\u5168\u5C5E\u6027"] * 1e3) + "\n";
          var _iterator4 = _createForOfIteratorHelper(itemUsedNumList.values()),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var value = _step4.value;
              copyText2 += value + " ";
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
          $this2.data("copy-text", copyText2.trim());
          console.log("KFOL\u8BA1\u7B97\u5668\u7684\u90E8\u5206\u53C2\u6570\u8BBE\u7F6E\uFF1A\n" + copyText2.trim());
          if (!_copyText($this2, "KFOL\u8BA1\u7B97\u5668\u7684\u90E8\u5206\u53C2\u6570\u8BBE\u7F6E\u5DF2\u590D\u5236")) {
            alert("\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u590D\u5236\uFF0C\u8BF7\u6253\u5F00Web\u63A7\u5236\u53F0\u67E5\u770B");
          }
        });
      };
      handlePointsArea = function handlePointsArea() {
        $points.find('[type="text"]:not([readonly])').attr("type", "number").attr("min", 1).attr("max", 9999).prop("required", true).css("width", "60px").addClass("pd_point").next("span").addClass("pd_extra_point").after("<span class=\"pd_sum_point\" style=\"color: #f03; cursor: pointer;\" title=\"\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9\"></span>");
        $points.find("input[readonly]").attr("type", "number").prop("disabled", true).css("width", "60px");
        var _$armArea$html$split = $armArea.html().split("<br><br>", 2),
          _$armArea$html$split2 = _slicedToArray(_$armArea$html$split, 2),
          armInfoHtml = _$armArea$html$split2[0],
          _$armArea$html$split3 = _$armArea$html$split2[1],
          finalAddAdditionHtml = _$armArea$html$split3 === void 0 ? "" : _$armArea$html$split3;
        var _armInfoHtml$split3 = armInfoHtml.split("\uFF08\u88C5\u5907\u4E2D\uFF09"),
          _armInfoHtml$split4 = _slicedToArray(_armInfoHtml$split3, 3),
          _armInfoHtml$split4$ = _armInfoHtml$split4[1],
          weaponInfoHtml = _armInfoHtml$split4$ === void 0 ? "" : _armInfoHtml$split4$,
          _armInfoHtml$split4$2 = _armInfoHtml$split4[2],
          armorInfoHtml = _armInfoHtml$split4$2 === void 0 ? "" : _armInfoHtml$split4$2;
        var newArmHtml = "";
        if (weaponInfoHtml) newArmHtml += "\uFF08\u88C5\u5907\u4E2D\uFF09" + _handleUselessSubProperties(weaponInfoHtml);
        if (armorInfoHtml) newArmHtml += "\uFF08\u88C5\u5907\u4E2D\uFF09" + _handleUselessSubProperties(armorInfoHtml);
        if (finalAddAdditionHtml) newArmHtml += "<br><br>" + finalAddAdditionHtml;
        $armArea.html(newArmHtml);
        $("\n<tr>\n  <td>\n    \u88C5\u5907ID\u548C\u5907\u6CE8\n    <span class=\"pd_cfg_tips\" title=\"\u53EF\u70B9\u51FB\u53F3\u8FB9\u7684\u201C\u66F4\u6362\u88C5\u5907\u201D\u6309\u94AE\uFF0C\u4E5F\u53EF\u624B\u52A8\u586B\u5199\u88C5\u5907ID\u3002\u7559\u7A7A\u8868\u793A\u4E0D\u66F4\u6362\u88C5\u5907\u3002\n\u5F53\u6587\u672C\u6846\u5185\u7684\u88C5\u5907ID\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u70B9\u51FB\u653B\u51FB\u6309\u94AE\u5C06\u4F1A\u81EA\u52A8\u66F4\u6362\u88C5\u5907\uFF08\u70B9\u51FB\u201C\u4FEE\u6539\u70B9\u6570\u5206\u914D\u201D\u6309\u94AE\u53EA\u4F1A\u4FEE\u6539\u70B9\u6570\u800C\u4E0D\u4F1A\u66F4\u6362\u88C5\u5907\uFF09\u3002\">[?]</span>\n  </td>\n  <td>\n    <input class=\"pd_arm_input\" name=\"weaponId\" type=\"text\" value=\"\" maxlength=\"15\" title=\"\u6B66\u5668ID\" placeholder=\"\u6B66\u5668ID\" style=\"width: 70px;\">\n    <input class=\"pd_arm_input\" name=\"weaponMemo\" type=\"text\" value=\"\" maxlength=\"20\" title=\"\u6B66\u5668\u5907\u6CE8\" placeholder=\"\u6B66\u5668\u5907\u6CE8\" style=\"width: 80px;\">\n    <input class=\"pd_arm_input\" name=\"armorId\" type=\"text\" value=\"\" maxlength=\"15\" title=\"\u62A4\u7532ID\" placeholder=\"\u62A4\u7532ID\" style=\"width: 70px;\">\n    <input class=\"pd_arm_input\" name=\"armorMemo\" type=\"text\" value=\"\" maxlength=\"20\" title=\"\u62A4\u7532\u5907\u6CE8\" placeholder=\"\u62A4\u7532\u5907\u6CE8\" style=\"width: 80px;\">\n    <a class=\"pd_btn_link\" data-name=\"changeArm\" href=\"#\" title=\"\u66F4\u6362\u5F53\u524D\u88C5\u5907\">\u66F4\u6362\u88C5\u5907</a>\n  </td>\n</tr>\n").insertAfter($armArea.parent()).find('[data-name="changeArm"]').click(function (e) {
          e.preventDefault();
          addOrChangeArm(0);
        });
        $points.find('input[name="prosubmit"]').replaceWith("<button name=\"prosubmit\" type=\"submit\">\u4FEE\u6539\u70B9\u6570\u5206\u914D</button>");
        $("<button name=\"changePointsAndArms\" type=\"button\" title=\"\u6309\u7167\u5F53\u524D\u9875\u9762\u4E0A\u7684\u70B9\u6570\u8BBE\u7F6E\u548C\u88C5\u5907ID\u8FDB\u884C\u4FEE\u6539\" style=\"margin-left: 3px;\">\u4FEE\u6539\u70B9\u6570\u548C\u88C5\u5907</button>").insertAfter($points.find('button[name="prosubmit"]')).click(function () {
          var $wait = _wait("<strong>\u6B63\u5728\u4FEE\u6539\u70B9\u6570\u548C\u88C5\u5907&hellip;</strong>");
          _changePointsAndArms(-1, function (result2) {
            if (result2 === "success") {
              _updateLootInfo2(function () {
                _remove($wait);
                _show("<strong>\u5DF2\u6210\u529F\u4FEE\u6539\u4E3A\u6307\u5B9A\u7684\u70B9\u6570\u8BBE\u7F6E\u548C\u88C5\u5907ID</strong>", 3);
              });
            } else {
              _remove($wait);
              if (result2 === "ignore") {
                alert("\u5F53\u524D\u9875\u9762\u7684\u70B9\u6570\u8BBE\u7F6E\u548C\u88C5\u5907ID\u6CA1\u6709\u53D1\u751F\u53D8\u5316");
              } else if (result2 === "timeout") {
                alert("\u8FDE\u63A5\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5");
              }
            }
          });
        });
        var $changeCount = $points.find("> tbody > tr:last-child > td:last-child");
        $changeCount.wrapInner('<span id="pdChangeCount"></span>');
        var changeCountMatches = /当前修改配点可用\[(\d+)]次/.exec($changeCount.text());
        if (changeCountMatches) {
          changePointsAvailableCount = parseInt(changeCountMatches[1]);
        }
        var countDownMatches = /\(下次修改配点还需\[(\d+)]分钟\)/.exec($changeCount.text());
        if (countDownMatches) {
          var nextTime = _getDate("+".concat(countDownMatches[1], "m"));
          _setCookie(Const_default.changePointsInfoCookieName, nextTime.getTime(), nextTime);
        } else {
          var count = parseInt(_getCookie(Const_default.changePointsInfoCookieName));
          if (count !== changePointsAvailableCount) {
            _setCookie(Const_default.changePointsInfoCookieName, changePointsAvailableCount + "c", _getDate("+".concat(Const_default.changePointsInfoExpires, "m")));
          }
        }
        extraPointsList = {
          "\u8010\u529B": parseInt($points.find('[name="p"]').next("span").text()),
          "\u5E78\u8FD0": parseInt($points.find('[name="l"]').next("span").text())
        };
        var showSurplusPoint = function showSurplusPoint() {
          var surplusPoint = propertyList["\u53EF\u5206\u914D\u5C5E\u6027\u70B9"] - _getCurrentAssignedPoint($points.find(".pd_point"));
          $("#pdSurplusPoint").prop("hidden", surplusPoint === 0).css("color", surplusPoint !== 0 ? surplusPoint > 0 ? "#f03" : "#393" : "#000").find("em").text((surplusPoint > 0 ? "+" : "") + surplusPoint);
        };
        var showExtraPoint = function showExtraPoint($point) {
          var num2 = parseInt($point.val());
          if (!num2 || num2 < 0) num2 = 1;
          var extraNum = _getExtraPoint(_getPointNameByFieldName($point.attr("name")), num2);
          $point.next(".pd_extra_point").text("+" + extraNum);
        };
        var showSumOfPoint = function showSumOfPoint($point) {
          var num2 = parseInt($point.val());
          if (!num2 || num2 < 0) num2 = 1;
          var extraNum = parseInt($point.next(".pd_extra_point").text());
          $point.next(".pd_extra_point").next(".pd_sum_point").text("=" + (num2 + extraNum));
        };
        $points.on("change", ".pd_point", function () {
          var $this2 = $(this);
          showSurplusPoint();
          showExtraPoint($this2);
          showSumOfPoint($this2);
        }).on("click", ".pd_sum_point", function () {
          var surplusPoint = propertyList["\u53EF\u5206\u914D\u5C5E\u6027\u70B9"] - _getCurrentAssignedPoint($points.find(".pd_point"));
          if (!surplusPoint) return;
          var $point = $(this).prev("span").prev(".pd_point");
          if (!$point.length) return;
          var num2 = parseInt($point.val());
          if (isNaN(num2) || num2 < 0) num2 = 0;
          num2 = num2 + surplusPoint;
          $point.val(num2 < 1 ? 1 : num2).trigger("change");
        }).closest("form").submit(function () {
          _deleteCookie(Const_default.changePointsInfoCookieName);
          return checkPoints($points);
        }).find(".pd_point").trigger("change");
      };
      checkPoints = function checkPoints($points2) {
        var surplusPoint = propertyList["\u53EF\u5206\u914D\u5C5E\u6027\u70B9"] - _getCurrentAssignedPoint($points2.find(".pd_point"));
        if (surplusPoint < 0) {
          alert("\u5269\u4F59\u5C5E\u6027\u70B9\u4E3A\u8D1F\uFF0C\u8BF7\u91CD\u65B0\u586B\u5199");
          return false;
        } else if (surplusPoint > 0) {
          if (!confirm("\u53EF\u5206\u914D\u5C5E\u6027\u70B9\u5C1A\u672A\u7528\u5B8C\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F")) return false;
        }
        return true;
      };
      getLootPropertyList = function getLootPropertyList(html2) {
        var propertyList2 = {
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
        var matches = /"(\d+)攻击力"/.exec(html2);
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
      _getCurrentAssignedPoint = function _getCurrentAssignedPoint($points2) {
        var usedPoint = 0;
        $points2.each(function () {
          var $this2 = $(this);
          var name4 = $this2.attr("name");
          var point = parseInt($this2.val());
          if (point && point > 0) usedPoint += point;
        });
        return usedPoint;
      };
      _getSkillAttack = function _getSkillAttack(power, life, intelligence) {
        return power * 5 + life * 5 + intelligence * 5;
      };
      _getPointNameByFieldName = function _getPointNameByFieldName(fieldName) {
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
      _getFieldNameByPointName = function _getFieldNameByPointName(pointName) {
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
      _getExtraPoint = function _getExtraPoint(pointName, point) {
        var elapsedMedicine = itemUsedNumList.get("\u6D88\u901D\u4E4B\u836F") * 5;
        var haloPercent = haloInfo["\u5168\u5C5E\u6027"];
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
            return Math.floor((Math.floor(point * haloPercent) + elapsedMedicine + point) * (currentArmInfo.get("\u62A4\u7532")["\u7EC4\u522B"] === "\u94E0\u7532" ? 1.1 : 1)) - point;
          default:
            return 0;
        }
      };
      _getPropertyByPoint = function _getPropertyByPoint(pointName, point) {
        var pointValue = point + _getExtraPoint(pointName, point);
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
      _getPointByProperty = function _getPointByProperty(pointName, num2) {
        var elapsedMedicine = itemUsedNumList.get("\u6D88\u901D\u4E4B\u836F") * 5;
        var haloPercent = 1 + haloInfo["\u5168\u5C5E\u6027"];
        var value = 0;
        switch (pointName) {
          case "\u529B\u91CF":
            value = Math.ceil((Math.ceil((num2 - haloInfo["\u653B\u51FB\u529B"]) / 5) - itemUsedNumList.get("\u857E\u7C73\u8389\u4E9A\u540C\u4EBA\u6F2B\u753B") - elapsedMedicine) / haloPercent);
            break;
          case "\u4F53\u8D28":
            value = Math.ceil((Math.ceil((num2 - haloInfo["\u751F\u547D\u503C"] - (itemUsedNumList.get("\u857E\u7C73\u8389\u4E9A\u540C\u4EBA\u6F2B\u753B") === 50 ? 700 : 0)) / 20) - itemUsedNumList.get("\u857E\u7C73\u8389\u4E9A\u540C\u4EBA\u6F2B\u753B") - elapsedMedicine) / haloPercent);
            break;
          case "\u654F\u6377":
            value = Math.ceil((Math.ceil((num2 - (itemUsedNumList.get("\u5341\u516D\u591C\u540C\u4EBA\u6F2B\u753B") === 50 ? 100 : 0)) / 2) - itemUsedNumList.get("\u5341\u516D\u591C\u540C\u4EBA\u6F2B\u753B") - elapsedMedicine) / haloPercent);
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
      addLevelPointListSelect = function addLevelPointListSelect() {
        $("\n<tr>\n  <td colspan=\"2\">\n    <select id=\"pdLevelPointListSelect\" style=\"margin: 5px 0;\">\n      <option>\u70B9\u6570\u5206\u914D\u65B9\u6848</option>\n      <option value=\"0\">\u9ED8\u8BA4</option>\n    </select>\n    <a class=\"pd_btn_link\" data-name=\"save\" href=\"#\" title=\"\u5C06\u5F53\u524D\u70B9\u6570\u8BBE\u7F6E\u4FDD\u5B58\u4E3A\u65B0\u7684\u65B9\u6848\">\u4FDD\u5B58</a>\n    <a class=\"pd_btn_link\" data-name=\"edit\" href=\"#\" title=\"\u7F16\u8F91\u5404\u5C42\u70B9\u6570\u5206\u914D\u65B9\u6848\">\u7F16\u8F91</a>\n    <a class=\"pd_btn_link\" data-name=\"fill\" href=\"#\" title=\"\u8F93\u5165\u4E00\u4E32\u6570\u5B57\u6309\u987A\u5E8F\u586B\u5145\u5230\u5404\u4E2A\u70B9\u6570\u5B57\u6BB5\u4E2D\">\u586B\u5145</a>\n  </td>\n</tr>").prependTo($points.find("> tbody")).find("#pdLevelPointListSelect").change(function () {
          var level = parseInt($(this).val());
          if (level > 0) {
            var points = Config.levelPointList[parseInt(level)];
            if (_typeof(points) !== "object") return;
            $points.find(".pd_point, .pd_arm_input").each(function () {
              var $this2 = $(this);
              var pointName = _getPointNameByFieldName($this2.attr("name"));
              $this2.val(points[pointName]);
            }).trigger("change");
          } else if (level === 0) {
            $points.find(".pd_point, .pd_arm_input").each(function () {
              $(this).val(this.defaultValue);
            }).trigger("change");
          }
        }).end().find('[data-name="save"]').click(function (e) {
          e.preventDefault();
          if (!checkPoints($points)) return;
          var $levelPointListSelect = $("#pdLevelPointListSelect");
          var level = parseInt($levelPointListSelect.val());
          level = parseInt(prompt("\u8BF7\u8F93\u5165\u5C42\u6570\uFF1A", level ? level : ""));
          if (!level || level < 0) return;
          read3();
          if (level in Config.levelPointList) {
            if (!confirm("\u8BE5\u5C42\u6570\u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F")) return;
          }
          var points = {};
          for (var _i3 = 0, _Array$from = Array.from($points.find(".pd_point, .pd_arm_input")); _i3 < _Array$from.length; _i3++) {
            var elem = _Array$from[_i3];
            var $elem = $(elem);
            var name4 = $elem.attr("name");
            var value = $.trim($elem.val());
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
            points[_getPointNameByFieldName(name4)] = value;
          }
          Config.levelPointList[level] = points;
          write3();
          setLevelPointListSelect(Config.levelPointList);
          $levelPointListSelect.val(level);
        }).end().find('[data-name="edit"]').click(function (e) {
          e.preventDefault();
          _showLevelPointListConfigDialog();
        }).end().find('[data-name="fill"]').click(function (e) {
          e.preventDefault();
          fillPoints($points);
        });
        setLevelPointListSelect(Config.levelPointList);
      };
      fillPoints = function fillPoints($points2) {
        var value = $.trim(prompt("\u8BF7\u8F93\u5165\u4EE5\u4EFB\u610F\u5B57\u7B26\u5206\u9694\u7684\u4E00\u4E32\u6570\u5B57\uFF0C\u6309\u987A\u5E8F\u586B\u5145\u5230\u5404\u4E2A\u70B9\u6570\u5B57\u6BB5\u4E2D\uFF08\u6CE8\uFF1A5\u4F4D\u6570\u4EE5\u4E0A\u7684\u6570\u5B57\u5C06\u88AB\u5F53\u4F5C\u88C5\u5907ID\uFF09\uFF1A\n\u53EF\u76F4\u63A5\u8F93\u5165\u8BA1\u7B97\u5668\u8F93\u51FA\u7684\u70B9\u6570\u8BBE\u7F6E\uFF0C\u4F8B\uFF1A1 100 50 5 25 1  0 3 Bow #1234567 Cloth #7654321"));
        if (!value) return;
        var pointsMatches = /^\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+\d+\s+\d+\s+(\S+)\s+#(\d+)\s+(\S+)\s+#(\d+)/.exec(value);
        if (!pointsMatches) {
          pointsMatches = /^\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+\d+\s+(\S+)\s+#(\d+)/.exec(value);
        }
        if (pointsMatches) {
          $points2.find(".pd_point").each(function (index) {
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
          var numMatches = value.match(/\b\d{1,4}\b/g);
          if (!numMatches) return;
          $points2.find(".pd_point").each(function (index) {
            if (index < numMatches.length) $(this).val(parseInt(numMatches[index])).trigger("change");else return false;
          });
          var armIdMatches = value.match(/\b(\d{5,})\b/g);
          for (var i in armIdMatches) {
            var name4 = parseInt(i) === 0 ? "weaponId" : "armorId";
            $points2.find("input[name=\"".concat(name4, "\"]")).val(armIdMatches[i]);
          }
        }
      };
      setLevelPointListSelect = function setLevelPointListSelect(levelPointList) {
        var pointListHtml = "";
        var _iterator5 = _createForOfIteratorHelper(_entries(levelPointList)),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _step5$value = _slicedToArray(_step5.value, 2),
              level = _step5$value[0],
              points = _step5$value[1];
            if (!$.isNumeric(level)) continue;
            pointListHtml += "<option value=\"".concat(level, "\">\u7B2C").concat(level, "\u5C42 ").concat(points["\u6B66\u5668ID"] || points["\u62A4\u7532ID"] ? "(\u88C5)" : "", "</option>");
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
        $("#pdLevelPointListSelect").find("option:gt(1)").remove().end().append(pointListHtml);
      };
      _changePointsAndArms = function _changePointsAndArms(nextLevel, callback) {
        if (nextLevel > 0 && Config.customPointsScriptEnabled && typeof Const_default.getCustomPoints === "function") {
          var points = null;
          try {
            points = Const_default.getCustomPoints($.extend(_getLootInfo(), {
              getExtraPoint: _getExtraPoint,
              getPointByProperty: _getPointByProperty,
              getPropertyByPoint: _getPropertyByPoint
            }));
          } catch (ex) {
            console.log(ex);
          }
          if ($.type(points) === "object") {
            var _iterator6 = _createForOfIteratorHelper(_entries(points)),
              _step6;
            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var _step6$value = _slicedToArray(_step6.value, 2),
                  key = _step6$value[0],
                  value = _step6$value[1];
                $points.find("input[name=\"".concat(_getFieldNameByPointName(key), "\"]")).val(value).trigger("change");
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
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
        var nextLevelText = getCurrentLevel(logList) + 1;
        var changeLevel = nextLevel > 0 ? Math.max.apply(Math, _toConsumableArray(Object.keys(Config.levelPointList).filter(function (level) {
          return level <= nextLevel;
        }))) : -1;
        var $levelPointListSelect = $("#pdLevelPointListSelect");
        if (changeLevel > 0) $levelPointListSelect.val(changeLevel).trigger("change");else $levelPointListSelect.get(0).selectedIndex = 0;
        var isChangeWeapon = false,
          isChangeArmor = false,
          isChangePoints = false;
        $points.find('.pd_point, input[name="weaponId"], input[name="armorId"]').each(function () {
          var $this2 = $(this);
          var name4 = $this2.attr("name");
          var value = $.trim($this2.val());
          if (parseInt(value) > 0 && this.defaultValue !== value) {
            if (name4 === "weaponId") isChangeWeapon = true;else if (name4 === "armorId") isChangeArmor = true;else isChangePoints = true;
          }
        });
        if (isChangeWeapon || isChangeArmor || isChangePoints) {
          if (Config.unusedPointNumAlertEnabled && !Info_default.w.unusedPointNumAlert && parseInt($("#pdSurplusPoint > em").text()) > 0) {
            if (confirm("\u53EF\u5206\u914D\u5C5E\u6027\u70B9\u5C1A\u672A\u7528\u5B8C\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F")) Info_default.w.unusedPointNumAlert = true;else return callback("error");
          }
          var weaponId = parseInt($points.find('input[name="weaponId"]').val());
          var armorId = parseInt($points.find('input[name="armorId"]').val());
          var ajaxList = ["ignore", "ignore", "ignore"];
          if (isChangeWeapon) {
            ajaxList[0] = {
              type: "POST",
              url: "kf_fw_ig_mybpdt.php",
              timeout: Const_default.defAjaxTimeout,
              data: "do=4&id=".concat(weaponId, "&safeid=").concat(safeId)
            };
          }
          if (isChangeArmor) {
            ajaxList[1] = {
              type: "POST",
              url: "kf_fw_ig_mybpdt.php",
              timeout: Const_default.defAjaxTimeout,
              data: "do=4&id=".concat(armorId, "&safeid=").concat(safeId)
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
          var result2 = "success";
          $(document).clearQueue("ChangePointsAndArms");
          $.each(ajaxList, function (index, ajax2) {
            if (ajax2 === "ignore") return;
            $(document).queue("ChangePointsAndArms", function () {
              $.ajax(ajax2).done(function (html2) {
                if (index === 0) {
                  var msg = _removeHtmlTag(html2);
                  if (/装备完毕/.test(msg)) {
                    $points.find('input[name="weaponId"], input[name="weaponMemo"]').each(function () {
                      this.defaultValue = $(this).val();
                    });
                    if (Config.autoSaveArmsInfoEnabled) {
                      var armsInfo = _readArmsInfo();
                      armsInfo["\u5DF2\u88C5\u5907\u6B66\u5668"] = weaponId;
                      _writeArmsInfo(armsInfo);
                    }
                  } else {
                    _show("<strong>\u66F4\u6362\u6B66\u5668\uFF1A".concat(msg, "</strong>"), -1);
                    _runFunc("Loot.lootAttack_changePointsAndArms_error_", msg);
                    result2 = "error";
                  }
                } else if (index === 1) {
                  var _msg = _removeHtmlTag(html2);
                  if (/装备完毕/.test(_msg)) {
                    $points.find('input[name="armorId"], input[name="armorMemo"]').each(function () {
                      this.defaultValue = $(this).val();
                    });
                    if (Config.autoSaveArmsInfoEnabled) {
                      var _armsInfo = _readArmsInfo();
                      _armsInfo["\u5DF2\u88C5\u5907\u62A4\u7532"] = armorId;
                      _writeArmsInfo(_armsInfo);
                    }
                  } else {
                    _show("<strong>\u66F4\u6362\u62A4\u7532\uFF1A".concat(_msg, "</strong>"), -1);
                    _runFunc("Loot.lootAttack_changePointsAndArms_error_", _msg);
                    result2 = "error";
                  }
                } else if (index === 2) {
                  var _getResponseMsg2 = _getResponseMsg(html2),
                    _msg2 = _getResponseMsg2.msg;
                  if (/已经重新配置加点！/.test(_msg2)) {
                    _deleteCookie(Const_default.changePointsInfoCookieName);
                    $points.find(".pd_point").each(function () {
                      this.defaultValue = $(this).val();
                    });
                  } else {
                    var matches = /你还需要等待(\d+)分钟/.exec(_msg2);
                    if (matches) {
                      var nextTime = _getDate("+".concat(parseInt(matches[1]), "m"));
                      _setCookie(Const_default.changePointsInfoCookieName, nextTime.getTime(), nextTime);
                    }
                    _show("<strong>\u7B2C<em>".concat(nextLevelText, "</em>\u5C42\u65B9\u6848\uFF1A").concat(_msg2, "</strong>"), -1);
                    _runFunc("Loot.lootAttack_changePointsAndArms_error_", _msg2);
                    result2 = "error";
                  }
                }
              }).fail(function () {
                result2 = "timeout";
              }).always(function () {
                if (result2 === "error" || result2 === "timeout") {
                  $(document).clearQueue("ChangePointsAndArms");
                  callback(result2);
                } else if (!$(document).queue("ChangePointsAndArms").length) {
                  _runFunc("Loot.changePointsAndArms_success_");
                  callback(result2);
                } else {
                  setTimeout(function () {
                    return $(document).dequeue("ChangePointsAndArms");
                  }, Const_default.minActionInterval);
                }
              });
            });
          });
          $(document).dequeue("ChangePointsAndArms");
        } else {
          callback("ignore");
        }
      };
      _updateLootInfo2 = function _updateLootInfo() {
        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        console.log("\u66F4\u65B0\u4E89\u593A\u4FE1\u606FStart");
        $.ajax({
          type: "GET",
          url: "kf_fw_ig_index.php?t=" + $.now(),
          timeout: Const_default.defAjaxTimeout
        }).done(function (html2) {
          var $area = $("#wdsx", html2).parent();
          log = $area.find("#pk_text").html();
          if (!log) {
            _remove($(".pd_countdown").closest(".pd_msg"));
            return;
          }
          $area.find('.kf_fw_ig3:first input[type="text"]').each(function (index) {
            var value = $.trim($(this).val());
            if (!value) return;
            $properties.find("input[type=\"text\"]:eq(".concat(index, ")")).val(value);
          });
          var serverStatusMatches = /错高峰福利：当前服务器状态\[\s*<span style="color:(#[a-fA-F0-9]+);[^<>]+>(\S+?)<\/span>\s*\]/.exec(html2);
          if (serverStatusMatches) {
            var serverStatusColor = serverStatusMatches[1];
            serverStatus = serverStatusMatches[2];
            if (Const_default.debug) console.log("\u5F53\u524D\u670D\u52A1\u5668\u72B6\u6001\uFF1A" + serverStatus);
            $properties.find("#pdServerStatus").text(serverStatus).css("color", serverStatusColor);
          }
          var countDownMatches = /\(下次修改配点还需\[(\d+)]分钟\)/.exec(html2);
          if (countDownMatches) {
            changePointsAvailableCount = 0;
            var nextTime = _getDate("+".concat(countDownMatches[1], "m"));
            _setCookie(Const_default.changePointsInfoCookieName, nextTime.getTime(), nextTime);
            $points.find("#pdChangeCount").text("(\u4E0B\u6B21\u4FEE\u6539\u914D\u70B9\u8FD8\u9700[".concat(countDownMatches[1], "]\u5206\u949F)"));
          }
          var changeCountMatches = /当前修改配点可用\[(\d+)]次/.exec(html2);
          if (changeCountMatches) {
            changePointsAvailableCount = parseInt(changeCountMatches[1]);
            _setCookie(Const_default.changePointsInfoCookieName, changePointsAvailableCount + "c", _getDate("+".concat(Const_default.changePointsInfoExpires, "m")));
            $points.find("#pdChangeCount").text("(\u5F53\u524D\u4FEE\u6539\u914D\u70B9\u53EF\u7528[".concat(changePointsAvailableCount, "]\u6B21)"));
          }
          var armHtml = $area.find(".kf_fw_ig1:first > tbody > tr:first-child > td").html();
          if (armHtml.includes("\uFF08\u88C5\u5907\u4E2D\uFF09")) {
            var _armHtml$split3 = armHtml.split("<br><br>", 2),
              _armHtml$split4 = _slicedToArray(_armHtml$split3, 2),
              armInfoHtml = _armHtml$split4[0],
              _armHtml$split4$ = _armHtml$split4[1],
              finalAddAdditionHtml = _armHtml$split4$ === void 0 ? "" : _armHtml$split4$;
            var _armInfoHtml$split5 = armInfoHtml.split("\uFF08\u88C5\u5907\u4E2D\uFF09"),
              _armInfoHtml$split6 = _slicedToArray(_armInfoHtml$split5, 3),
              _armInfoHtml$split6$ = _armInfoHtml$split6[1],
              weaponInfoHtml = _armInfoHtml$split6$ === void 0 ? "" : _armInfoHtml$split6$,
              _armInfoHtml$split6$2 = _armInfoHtml$split6[2],
              armorInfoHtml = _armInfoHtml$split6$2 === void 0 ? "" : _armInfoHtml$split6$2;
            var newArmHtml = "";
            if (weaponInfoHtml) newArmHtml += "\uFF08\u88C5\u5907\u4E2D\uFF09" + _handleUselessSubProperties(weaponInfoHtml);
            if (armorInfoHtml) newArmHtml += "\uFF08\u88C5\u5907\u4E2D\uFF09" + _handleUselessSubProperties(armorInfoHtml);
            if (finalAddAdditionHtml) newArmHtml += "<br><br>" + finalAddAdditionHtml;
            $armArea.html(newArmHtml);
            currentArmInfo.set("\u6B66\u5668", _getArmInfo(weaponInfoHtml));
            currentArmInfo.set("\u62A4\u7532", _getArmInfo(armorInfoHtml));
          }
          var propertiesHtml = $properties.html();
          propertyList = getLootPropertyList(propertiesHtml);
          itemUsedNumList = _getItemsUsedNumInfo(propertiesHtml);
          armsLevelList = _getArmsLevelInfo(propertiesHtml);
          $properties.find(".pd_arm_level").trigger("change");
          $points.find(".pd_point").trigger("change");
          if (typeof callback === "function") callback();
          _runFunc("Loot.updateLootInfo_after_", html2);
        }).fail(function () {
          setTimeout(function () {
            return _updateLootInfo2(callback);
          }, Const_default.minActionInterval);
        });
      };
      _getLootInfo = function _getLootInfo() {
        var currentLevel = getCurrentLevel(logList);
        var info = levelInfoList[currentLevel];
        var currentLife = 0,
          currentInitLife = 0;
        if (info) {
          currentLife = info.life;
          currentInitLife = info.initLife;
        }
        var enemyList = getEnemyList(levelInfoList);
        return {
          currentLevel: currentLevel,
          currentLife: currentLife,
          currentInitLife: currentInitLife,
          levelPointList: Config.levelPointList,
          availablePoint: propertyList["\u53EF\u5206\u914D\u5C5E\u6027\u70B9"],
          haloInfo: haloInfo,
          extraPointsList: extraPointsList,
          propertyList: propertyList,
          itemUsedNumList: itemUsedNumList,
          armsLevelList: armsLevelList,
          currentArmInfo: currentArmInfo,
          changePointsAvailableCount: changePointsAvailableCount,
          log: log,
          logList: logList,
          enemyList: enemyList
        };
      };
      _showLevelPointListConfigDialog = function showLevelPointListConfigDialog(callback) {
        var dialogName2 = "pdLevelPointListConfigDialog";
        if ($("#" + dialogName2).length > 0) return;
        read3();
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <div style=\"margin: 5px 0; line-height: 1.6em;\">\n    \u8BF7\u586B\u5199\u5404\u5C42\u5BF9\u5E94\u7684\u70B9\u6570\u5206\u914D\u65B9\u6848\uFF0C\u76F8\u90BB\u5C42\u6570\u5982\u6570\u503C\u5B8C\u5168\u76F8\u540C\u7684\u8BDD\uFF0C\u5219\u53EA\u4FDD\u7559\u6700\u524D\u9762\u7684\u4E00\u5C42<br>\n    \uFF08\u4F8B\uFF1A11-19\u5C42\u70B9\u6570\u76F8\u540C\u7684\u8BDD\uFF0C\u5219\u53EA\u4FDD\u7559\u7B2C11\u5C42\uFF09<br>\n    \u6B66\u5668\u3001\u62A4\u7532ID\u548C\u5907\u6CE8\u4E3A\u53EF\u9009\u9879\uFF0C\u53EA\u5728\u9700\u8981\u66F4\u6362\u88C5\u5907\u65F6\u586B\u5199<br>\n    \u81EA\u5B9A\u4E49\u70B9\u6570\u5206\u914D\u65B9\u6848\u811A\u672C\u7684\u53C2\u8003\u8303\u4F8B\u8BF7\u53C2\u89C1<a href=\"read.php?tid=500968&spid=13270735&sf=b09\" target=\"_blank\">\u6B64\u8D3453\u697C</a>\n  </div>\n  <div style=\"overflow-y: auto; max-height: 400px;\">\n    <table id=\"pdLevelPointList\" style=\"text-align: center; white-space: nowrap;\">\n      <tbody>\n        <tr>\n          <th></th><th>\u5C42\u6570</th><th>\u529B\u91CF</th><th>\u4F53\u8D28</th><th>\u654F\u6377</th><th>\u7075\u6D3B</th><th>\u667A\u529B</th><th>\u610F\u5FD7</th>\n<th>\u6B66\u5668ID</th><th>\u6B66\u5668\u5907\u6CE8</th><th>\u62A4\u7532ID</th><th>\u62A4\u7532\u5907\u6CE8</th><th></th>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n  <hr>\n  <div style=\"float: left; line-height: 27px;\">\n    <a class=\"pd_btn_link\" data-name=\"selectAll\" href=\"#\">\u5168\u9009</a>\n    <a class=\"pd_btn_link\" data-name=\"selectInverse\" href=\"#\">\u53CD\u9009</a>\n    <a class=\"pd_btn_link pd_highlight\" data-name=\"add\" href=\"#\">\u589E\u52A0</a>\n    <a class=\"pd_btn_link\" data-name=\"deleteSelect\" href=\"#\">\u5220\u9664</a>\n  </div>\n  <div data-id=\"modifyArea\" style=\"float: right;\">\n    <input name=\"s1\" type=\"text\" maxlength=\"5\" title=\"\u529B\u91CF\" placeholder=\"\u529B\u91CF\" style=\"width: 35px;\">\n    <input name=\"s2\" type=\"text\" maxlength=\"5\" title=\"\u4F53\u8D28\" placeholder=\"\u4F53\u8D28\" style=\"width: 35px;\">\n    <input name=\"d1\" type=\"text\" maxlength=\"5\" title=\"\u654F\u6377\" placeholder=\"\u654F\u6377\" style=\"width: 35px;\">\n    <input name=\"d2\" type=\"text\" maxlength=\"5\" title=\"\u7075\u6D3B\" placeholder=\"\u7075\u6D3B\" style=\"width: 35px;\">\n    <input name=\"i1\" type=\"text\" maxlength=\"5\" title=\"\u667A\u529B\" placeholder=\"\u667A\u529B\" style=\"width: 35px;\">\n    <input name=\"i2\" type=\"text\" maxlength=\"5\" title=\"\u610F\u5FD7\" placeholder=\"\u610F\u5FD7\" style=\"width: 35px;\">\n    <a class=\"pd_btn_link\" data-name=\"clear\" href=\"#\" title=\"\u6E05\u7A7A\u5404\u4FEE\u6539\u5B57\u6BB5\">\u6E05\u7A7A</a>\n    <button type=\"button\" name=\"modify\">\u4FEE\u6539</button>\n    <span class=\"pd_cfg_tips\" title=\"\u53EF\u5C06\u6240\u9009\u62E9\u7684\u5C42\u6570\u7684\u76F8\u5E94\u5C5E\u6027\u4FEE\u6539\u4E3A\u6307\u5B9A\u7684\u6570\u503C\uFF1B\u6570\u5B57\u524D\u53EF\u8BBE+/-\u53F7\uFF0C\u8868\u793A\u589E\u52A0/\u51CF\u5C11\u76F8\u5E94\u6570\u91CF\uFF1B\u4F8B\uFF1A100\u3001+5\u6216-2\">[?]</span>\n  </div>\n</div>\n<div class=\"pd_cfg_btns\">\n  <span class=\"pd_cfg_about\"><a data-name=\"openImOrExLevelPointListConfigDialog\" href=\"#\">\u5BFC\u5165/\u5BFC\u51FA\u5206\u914D\u65B9\u6848</a></span>\n  <button type=\"submit\">\u4FDD\u5B58</button>\n  <button data-action=\"close\" type=\"button\">\u53D6\u6D88</button>\n</div>";
        var $dialog2 = _create(dialogName2, "\u5404\u5C42\u70B9\u6570\u5206\u914D\u65B9\u6848", html2, "min-width: 840px;");
        var $levelPointList = $dialog2.find("#pdLevelPointList > tbody");
        var addLevelPointHtml = function addLevelPointHtml(level, points) {
          $("\n<tr>\n  <td style=\"width: 25px; text-align: left;\"><input type=\"checkbox\"></td>\n  <td style=\"text-align: left;\">\n    <label style=\"margin-right: 8px;\">\n      \u7B2C <input name=\"level\" type=\"text\" value=\"".concat(level ? level : "", "\" style=\"width: 30px;\"> \u5C42\n    </label>\n  </td>\n  <td><input class=\"pd_point\" name=\"s1\" type=\"number\" value=\"").concat(points["\u529B\u91CF"], "\" min=\"1\" style=\"width: 50px;\" required></td>\n  <td><input class=\"pd_point\" name=\"s2\" type=\"number\" value=\"").concat(points["\u4F53\u8D28"], "\" min=\"1\" style=\"width: 50px;\" required></td>\n  <td><input class=\"pd_point\" name=\"d1\" type=\"number\" value=\"").concat(points["\u654F\u6377"], "\" min=\"1\" style=\"width: 50px;\" required></td>\n  <td><input class=\"pd_point\" name=\"d2\" type=\"number\" value=\"").concat(points["\u7075\u6D3B"], "\" min=\"1\" style=\"width: 50px;\" required></td>\n  <td><input class=\"pd_point\" name=\"i1\" type=\"number\" value=\"").concat(points["\u667A\u529B"], "\" min=\"1\" style=\"width: 50px;\" required></td>\n  <td><input class=\"pd_point\" name=\"i2\" type=\"number\" value=\"").concat(points["\u610F\u5FD7"], "\" min=\"1\" style=\"width: 50px;\" required></td>\n  <td><input class=\"pd_arm_input\" name=\"weaponId\" type=\"text\" value=\"").concat(points["\u6B66\u5668ID"] ? points["\u6B66\u5668ID"] : "", "\" maxlength=\"15\" style=\"width: 65px;\"></td>\n  <td><input class=\"pd_arm_input\" name=\"weaponMemo\" type=\"text\" value=\"").concat(points["\u6B66\u5668\u5907\u6CE8"] ? points["\u6B66\u5668\u5907\u6CE8"] : "", "\" maxlength=\"20\" style=\"width: 70px;\"></td>\n  <td><input class=\"pd_arm_input\" name=\"armorId\" type=\"text\" value=\"").concat(points["\u62A4\u7532ID"] ? points["\u62A4\u7532ID"] : "", "\" maxlength=\"15\" style=\"width: 65px;\"></td>\n  <td><input class=\"pd_arm_input\" name=\"armorMemo\" type=\"text\" value=\"").concat(points["\u62A4\u7532\u5907\u6CE8"] ? points["\u62A4\u7532\u5907\u6CE8"] : "", "\" maxlength=\"20\" style=\"width: 70px;\"></td>\n  <td style=\"text-align: left;\">\n    <a class=\"pd_btn_link\" data-name=\"fill\" href=\"#\">\u586B\u5145</a>\n    <a class=\"pd_btn_link\" data-name=\"addArm\" href=\"#\">\u88C5\u5907</a>\n    <a class=\"pd_btn_link pd_highlight\" data-name=\"delete\" href=\"#\">\u5220\u9664</a>\n  </td>\n</tr>\n<tr>\n  <td></td>\n  <td class=\"pd_custom_tips\" title=\"\u5269\u4F59\u5C5E\u6027\u70B9\">\u5269\u4F59\uFF1A<span data-id=\"surplusPoint\">0</span></td>\n  <td title=\"\u653B\u51FB\u529B\" hidden> <!-- \u4E34\u65F6\u7981\u7528 -->\n    \u653B\uFF1A<span data-id=\"pro_s1\" style=\"cursor: pointer;\">0</span> <a data-id=\"opt_s1\" href=\"#\" title=\"\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9\">&#177;</a>\n  </td>\n  <td title=\"\u6700\u5927\u751F\u547D\u503C\" hidden>\n    \u547D\uFF1A<span data-id=\"pro_s2\" style=\"cursor: pointer;\">0</span> <a data-id=\"opt_s2\" href=\"#\" title=\"\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9\">&#177;</a>\n  </td>\n  <td title=\"\u653B\u51FB\u901F\u5EA6\" hidden>\n    \u901F\uFF1A<span data-id=\"pro_d1\" style=\"cursor: pointer;\">0</span> <a data-id=\"opt_d1\" href=\"#\" title=\"\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9\">&#177;</a>\n  </td>\n  <td title=\"\u66B4\u51FB\u51E0\u7387\" hidden>\n    \u66B4\uFF1A<span data-id=\"pro_d2\" style=\"cursor: pointer;\">0</span>% <a data-id=\"opt_d2\" href=\"#\" title=\"\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9\">&#177;</a>\n  </td>\n  <td title=\"\u6280\u80FD\u91CA\u653E\u6982\u7387\" hidden>\n    \u6280\uFF1A<span data-id=\"pro_i1\" style=\"cursor: pointer;\">0</span>% <a data-id=\"opt_i1\" href=\"#\" title=\"\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9\">&#177;</a>\n  </td>\n  <td title=\"\u9632\u5FA1\u51CF\u4F24\" hidden>\n    \u9632\uFF1A<span data-id=\"pro_i2\" style=\"cursor: pointer;\">0</span>% <a data-id=\"opt_i2\" href=\"#\" title=\"\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9\">&#177;</a>\n  </td>\n  <td class=\"pd_custom_tips\" title=\"[\u98DE\u8EAB\u5288\u65A9]\u4F24\u5BB3\uFF1A\u653B\u51FB+\u4F53\u8D28\u503C*5+\u667A\u529B\u503C*5\" hidden>\u6280\u4F24\uFF1A<span data-id=\"skillAttack\">0</span></td>\n  <td hidden></td>\n  <td hidden></td>\n</tr>\n")).appendTo($levelPointList).find(".pd_point").trigger("change");
        };
        $dialog2.submit(function (e) {
          e.preventDefault();
          read3();
          var levelPointList = {};
          var prevPoints = {};
          var isError = false,
            isSurplus = false;
          $levelPointList.find("tr:gt(0)").each(function () {
            var $this2 = $(this);
            if (!$this2.find(".pd_point").length) return;
            var surplusPoint = propertyList["\u53EF\u5206\u914D\u5C5E\u6027\u70B9"] - _getCurrentAssignedPoint($this2.find(".pd_point"));
            if (surplusPoint > 0) isSurplus = true;else if (surplusPoint < 0) {
              isError = true;
              return false;
            }
            var level = parseInt($this2.find('[name="level"]').val());
            if (!level || level < 0) return;
            var points = {};
            for (var _i4 = 0, _Array$from2 = Array.from($this2.find(".pd_point, .pd_arm_input")); _i4 < _Array$from2.length; _i4++) {
              var elem = _Array$from2[_i4];
              var $elem = $(elem);
              var name4 = $elem.attr("name");
              var value = null;
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
              points[_getPointNameByFieldName(name4)] = value;
            }
            if (_deepEqual2(prevPoints, points)) return;
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
          _close(dialogName2);
          setLevelPointListSelect(Config.levelPointList);
        }).find('[data-name="add"]').click(function (e) {
          e.preventDefault();
          var points = {
            "\u529B\u91CF": 1,
            "\u4F53\u8D28": 1,
            "\u654F\u6377": 1,
            "\u7075\u6D3B": 1,
            "\u667A\u529B": 1,
            "\u610F\u5FD7": 1
          };
          addLevelPointHtml(0, points);
          $levelPointList.find('[name="level"]:last').focus();
          _resize(dialogName2);
        }).end().find('[data-name="deleteSelect"]').click(function (e) {
          e.preventDefault();
          var $checked = $levelPointList.find('[type="checkbox"]:checked');
          if (!$checked.length || !confirm("\u662F\u5426\u5220\u9664\u6240\u9009\u5C42\u6570\uFF1F")) return;
          var $line = $checked.closest("tr");
          $line.next("tr").addBack().remove();
          _resize(dialogName2);
        }).end().find('[data-name="openImOrExLevelPointListConfigDialog"]').click(function (e) {
          e.preventDefault();
          _showCommonImportOrExportConfigDialog("\u5404\u5C42\u70B9\u6570\u5206\u914D\u65B9\u6848", "levelPointList", null, function () {
            $("#pdLevelPointListConfigDialog").remove();
            _showLevelPointListConfigDialog(function ($dialog3) {
              return $dialog3.submit();
            });
          });
        }).end().find('[data-name="selectAll"]').click(function () {
          return _selectAll($levelPointList.find('[type="checkbox"]'));
        }).end().find('[data-name="selectInverse"]').click(function () {
          return _selectInverse($levelPointList.find('[type="checkbox"]'));
        });
        $levelPointList.on("click", '[data-name="fill"]', function (e) {
          e.preventDefault();
          fillPoints($(this).closest("tr"));
        }).on("click", '[data-name="delete"]', function (e) {
          e.preventDefault();
          var $line = $(this).closest("tr");
          $line.next("tr").addBack().remove();
          _resize(dialogName2);
        }).on("click", '[data-name="addArm"]', function (e) {
          e.preventDefault();
          $levelPointList.find("#pdAddWeaponId, #pdAddWeaponMemo, #pdAddArmorId, #pdAddArmorMemo").removeAttr("id");
          var $tr = $(this).closest("tr");
          $tr.find('[name="weaponId"]').attr("id", "pdAddWeaponId").end().find('[name="weaponMemo"]').attr("id", "pdAddWeaponMemo").end().find('[name="armorId"]').attr("id", "pdAddArmorId").end().find('[name="armorMemo"]').attr("id", "pdAddArmorMemo");
          addOrChangeArm(1);
        }).on("change", ".pd_point", function () {
          var $this2 = $(this);
          var name4 = $this2.attr("name");
          var point = parseInt($this2.val());
          if (!point || point < 0) return;
          var $points2 = $this2.closest("tr");
          var $properties2 = $points2.next("tr");
          $properties2.find("[data-id=\"pro_".concat(name4, "\"]")).text(_getPropertyByPoint(_getPointNameByFieldName(name4), point));
          var power = parseInt($points2.find('[name="s1"]').val());
          var life = parseInt($points2.find('[name="s2"]').val());
          var intelligence = parseInt($points2.find('[name="i1"]').val());
          $properties2.find('[data-id="skillAttack"]').text(_getSkillAttack(power + _getExtraPoint("\u529B\u91CF", power), life + _getExtraPoint("\u4F53\u8D28", life), intelligence + _getExtraPoint("\u667A\u529B", intelligence)));
          var surplusPoint = propertyList["\u53EF\u5206\u914D\u5C5E\u6027\u70B9"] - _getCurrentAssignedPoint($points2.find(".pd_point"));
          $properties2.find('[data-id="surplusPoint"]').text(surplusPoint).css("color", surplusPoint !== 0 ? "#f00" : "#000");
        }).on("click", '[data-id^="pro_"]', function () {
          var $this2 = $(this);
          var name4 = $this2.data("id").replace("pro_", "");
          var num2 = parseInt(prompt("\u8BF7\u8F93\u5165\u6570\u503C\uFF1A", $this2.text()));
          if (!num2 || num2 < 0) return;
          $this2.closest("tr").prev("tr").find("[name=\"".concat(name4, "\"]")).val(_getPointByProperty(_getPointNameByFieldName(name4), num2)).trigger("change");
        }).on("click", '[data-id^="opt_"]', function (e) {
          e.preventDefault();
          var $this2 = $(this);
          var name4 = $this2.data("id").replace("opt_", "");
          var $points2 = $this2.closest("tr").prev("tr");
          var surplusPoint = propertyList["\u53EF\u5206\u914D\u5C5E\u6027\u70B9"] - _getCurrentAssignedPoint($points2.find(".pd_point"));
          if (!surplusPoint) return;
          var $point = $points2.find("[name=\"".concat(name4, "\"]"));
          if (!$point.length) return;
          var num2 = parseInt($point.val());
          if (isNaN(num2) || num2 < 0) num2 = 0;
          num2 = num2 + surplusPoint;
          var min = parseInt($point.attr("min"));
          $point.val(num2 < min ? min : num2).trigger("change");
        });
        $dialog2.find('[name="modify"]').click(function () {
          var $checked = $levelPointList.find('[type="checkbox"]:checked');
          if (!$checked.length) return;
          var data = {};
          $dialog2.find('[data-id="modifyArea"] [type="text"]').each(function () {
            var $this2 = $(this);
            var name4 = $this2.attr("name");
            var value = $.trim($this2.val());
            if (!value) return;
            var matches = /^(-|\+)?(\d+)$/.exec(value);
            if (!matches) {
              alert("\u683C\u5F0F\u4E0D\u6B63\u786E");
              $this2.select().focus();
            }
            data[name4] = {};
            if (typeof matches[1] !== "undefined") data[name4].action = matches[1] === "+" ? "add" : "minus";else data[name4].action = "equal";
            data[name4].value = parseInt(matches[2]);
          });
          $checked.each(function () {
            var $points2 = $(this).closest("tr");
            $points2.find(".pd_point").each(function () {
              var $this2 = $(this);
              var name4 = $this2.attr("name");
              if (!(name4 in data)) return;
              if (data[name4].action !== "equal") {
                var point = parseInt($this2.val());
                if (!point || point < 0) point = 0;
                point += data[name4].action === "add" ? data[name4].value : -data[name4].value;
                $this2.val(point > 1 ? point : 1);
              } else $this2.val(data[name4].value);
            }).trigger("change");
          });
          alert("\u70B9\u6570\u5DF2\u4FEE\u6539");
        }).end().find('[data-name="clear"]').click(function (e) {
          e.preventDefault();
          $(this).closest('[data-id="modifyArea"]').find('[type="text"]').val("");
        });
        var _iterator7 = _createForOfIteratorHelper(_entries(Config.levelPointList)),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var _step7$value = _slicedToArray(_step7.value, 2),
              level = _step7$value[0],
              points = _step7$value[1];
            if (!$.isNumeric(level)) continue;
            addLevelPointHtml(level, points);
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
        show2(dialogName2);
        if (typeof callback === "function") callback($dialog2);
      };
      addOrChangeArm = function addOrChangeArm(type) {
        read3();
        var dialogName2 = "pd".concat(type === 1 ? "Add" : "Change", "ArmDialog");
        var $dialog2 = $("#" + dialogName2).parent();
        if ($dialog2.length > 0 && type === 1) {
          $dialog2.fadeIn("fast");
          _resize(dialogName2);
        } else {
          var $wait = _wait("<strong>\u6B63\u5728\u83B7\u53D6\u88C5\u5907\u4FE1\u606F&hellip;</strong>");
          $.ajax({
            type: "GET",
            url: "kf_fw_ig_mybp.php?t=" + $.now(),
            timeout: Const_default.defAjaxTimeout
          }).done(function (html2) {
            _remove($wait);
            var matches = /<tr><td width="\d+%">装备.+?\r\n(<tr.+?<\/tr>)<tr><td colspan="4">/.exec(html2);
            if (matches) {
              showAddOrChangeArmDialog(type, matches[1]);
            }
          }).fail(function () {
            return _remove($wait);
          });
        }
      };
      showAddOrChangeArmDialog = function showAddOrChangeArmDialog(type, armHtml) {
        var dialogName2 = "pd".concat(type === 1 ? "Add" : "Change", "ArmDialog");
        if ($("#" + dialogName2).length > 0) return;
        var html2 = "\n<div class=\"pd_cfg_main\" style=\"padding: 0;\">\n  <table class=\"kf_fw_ig4\" data-name=\"armList\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"width: 800px;\">\n    <tbody>\n      <tr hidden><td colspan=\"3\" class=\"kf_fw_ig_title1\">\u6211\u7684\u88C5\u5907\u80CC\u5305</td></tr>\n      <tr><td width=\"10%\">\u88C5\u5907</td><td width=\"10%\">\u7194\u70BC</td><td width=\"80%\">\u540D\u79F0</td></tr>\n      ".concat(armHtml, "\n      <tr><td colspan=\"3\"><span style=\"color:#00f;\">\u4E0D\u663E\u793A\u8D85\u8FC710\u4EF6\u4EE5\u4E0A\u7684\u7269\u54C1\uFF0C\u5982\u7269\u54C1\u8D85\u8FC710\u4EF6\uFF0C\u8BF7\u7194\u70BC\u6389\u591A\u4F59\u7684\u5373\u53EF\u5168\u90E8\u663E\u793A\u3002</span></td></tr>\n    </tbody>\n  </table>\n</div>\n<div class=\"pd_cfg_btns\">\n  ").concat(type === 0 ? "<button name=\"manualInputArmId\" type=\"button\" title=\"\u624B\u52A8\u8F93\u5165\u88C5\u5907ID\">\u624B\u52A8\u8F93\u5165ID</button>" : "", "\n  <button data-action=\"close\" type=\"button\">\u5173\u95ED</button>\n</div>");
        var $dialog2 = _create(dialogName2, "".concat(type === 1 ? "\u52A0\u5165" : "\u66F4\u6362", "\u88C5\u5907"), html2, "min-width: 820px; z-index: 1003;");
        var $armArea3 = $dialog2.find('.kf_fw_ig4[data-name="armList"]');
        _addCommonArmsButton($dialog2.find(".pd_cfg_btns"), $armArea3);
        if (type === 1) {
          $dialog2.off("click", '[data-action="close"]').on("click", '[data-action="close"]', function () {
            $dialog2.fadeOut("fast");
          });
        } else {
          $dialog2.find('[name="manualInputArmId"]').click(function () {
            var value = $.trim(prompt("\u8BF7\u8F93\u5165\u88C5\u5907ID\uFF08\u591A\u4E2AID\u7528\u7A7A\u683C\u5206\u9694\uFF09\uFF1A"));
            if (!value) return;
            var armIdList = value.split(" ");
            var $wait = _wait("<strong>\u6B63\u5728\u88C5\u5907\u4E2D&hellip;</strong>");
            $(document).clearQueue("ChangeArms");
            $.each(armIdList, function (i, armId) {
              if (!armId) return;
              $(document).queue("ChangeArms", function () {
                $.post("kf_fw_ig_mybpdt.php", "do=4&id=".concat(armId, "&safeid=").concat(safeId), function (html3) {
                  var msg = _removeHtmlTag(html3);
                  if (/装备完毕/.test(msg)) {
                    if (Config.autoSaveArmsInfoEnabled) {
                      var armsInfo = _readArmsInfo();
                      armsInfo["\u5DF2\u88C5\u5907\u6B66\u5668"] = armsInfo["\u5DF2\u88C5\u5907\u62A4\u7532"] = 0;
                      _writeArmsInfo(armsInfo);
                    }
                  } else {
                    _remove($wait);
                    alert(msg);
                  }
                }).fail(function () {
                  $(document).clearQueue("ChangeArms");
                  _remove($wait);
                  alert("\u8FDE\u63A5\u8D85\u65F6");
                }).always(function () {
                  if (!$(document).queue("ChangeArms").length) {
                    _updateLootInfo2(function () {
                      _remove($wait);
                      _close(dialogName2);
                      $(".pd_arm_input").val("");
                    });
                  } else {
                    setTimeout(function () {
                      return $(document).dequeue("ChangeArms");
                    }, Const_default.minActionInterval);
                  }
                });
              });
            });
            $(document).dequeue("ChangeArms");
          });
        }
        if (Config.autoSaveArmsInfoEnabled) {
          _addSavedArmsInfo($armArea3);
        }
        _handleArmArea($armArea3, type);
        _bindArmLinkClickEvent($armArea3, safeId, 1);
        show2(dialogName2);
        _runFunc("Item.show".concat(type === 1 ? "Add" : "Change", "ArmDialog_after_"));
      };
      _getLogList = function _getLogList(log2) {
        var logList2 = [];
        var matches = log2.match(/<li class="pk_log_j">.+?(?=\s*<li class="pk_log_j">|\s*$)/g);
        for (var i in matches) {
          var levelMatches = /在\[\s*(\d+)\s*层]/.exec(_removeHtmlTag(matches[i]));
          if (levelMatches) logList2[parseInt(levelMatches[1])] = matches[i];
        }
        return logList2;
      };
      _getLevelInfo = function _getLevelInfo(levelLog) {
        var info = {
          enemy: "",
          life: 0,
          initLife: 0,
          box: ""
        };
        if (!levelLog) return info;
        levelLog = _removeHtmlTag(levelLog.replace(/<\/li>/g, "</li>\n"));
        var matches = /你\((\d+)\)遭遇了\[([^\]]+)的]NPC/.exec(levelLog);
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
      _getLevelInfoList = function _getLevelInfoList(logList2) {
        var levelInfoList2 = [];
        $.each(logList2, function (level, levelLog) {
          if (!levelLog) return;
          levelInfoList2[level] = _getLevelInfo(levelLog);
        });
        return levelInfoList2;
      };
      getCurrentLevel = function getCurrentLevel(logList2) {
        return logList2.length - 1 >= 1 ? logList2.length - 1 : 0;
      };
      _addUserLinkInPkListPage = function _addUserLinkInPkListPage() {
        $(".kf_fw_ig1 > tbody > tr:gt(1) > td:nth-child(2)").each(function () {
          var $this2 = $(this);
          var userName2 = $this2.text().trim();
          $this2.html("<a class=\"".concat(!Config.adminMemberEnabled ? "pd_not_click_link" : "", "\" href=\"profile.php?action=show&username=").concat(userName2, "\" target=\"_blank\">").concat(userName2, "</a>"));
          if (userName2 === Info_default.userName) $this2.find("a").addClass("pd_highlight");
        });
      };
      _addUserLinkInHaloPage = function _addUserLinkInHaloPage() {
        $(".kf_fw_ig1:eq(1) > tbody > tr:gt(1) > td:nth-child(2)").each(function () {
          var $this2 = $(this);
          var userName2 = $this2.text().trim();
          $this2.html("<a class=\"".concat(!Config.adminMemberEnabled ? "pd_not_click_link" : "", "\" href=\"profile.php?action=show&username=").concat(userName2, "\" target=\"_blank\">").concat(userName2, "</a>"));
          if (userName2 === Info_default.userName) $this2.find("a").addClass("pd_highlight");
        });
      };
      _readHaloInfo = function readHaloInfo() {
        var isInitLootPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        console.log("\u83B7\u53D6\u6218\u529B\u5149\u73AF\u4FE1\u606FStart");
        var $wait = _wait("<strong>\u6B63\u5728\u83B7\u53D6\u6218\u529B\u5149\u73AF\u4FE1\u606F\uFF0C\u8BF7\u7A0D\u5019&hellip;</strong>");
        _getHaloInfo().done(function (result2) {
          if ($.type(result2) === "object") {
            _setHaloInfo(result2);
            if (isInitLootPage) _enhanceLootIndexPage();else $points.find(".pd_point").trigger("change");
          }
        }).always(function (result2) {
          _remove($wait);
          if (result2 === "timeout") {
            setTimeout(function () {
              return _readHaloInfo(isInitLootPage);
            }, Const_default.defAjaxInterval);
          } else if (result2 === "error") {
            _show("<strong>\u6218\u529B\u5149\u73AF\u4FE1\u606F\u83B7\u53D6\u5931\u8D25\uFF01</strong>", -1);
          }
        });
      };
      _getHaloInfo = function _getHaloInfo() {
        return $.ajax({
          type: "GET",
          url: "kf_fw_ig_halo.php?t=" + $.now(),
          timeout: Const_default.defAjaxTimeout
        }).then(function (html2) {
          var haloInfo2 = {
            "\u5168\u5C5E\u6027": 0,
            "\u653B\u51FB\u529B": 0,
            "\u751F\u547D\u503C": 0
          };
          var matches = /全属性\s*\+\s*(\d+(?:\.\d+)?)%/.exec(html2);
          if (matches) {
            haloInfo2["\u5168\u5C5E\u6027"] = Math.round(parseFloat(matches[1]) * 10) / 1e3;
            var extraMatches = /福利加成\s*\+\s*(\d+)攻击力\s*&\s*\+\s*(\d+)生命值/.exec(html2);
            if (extraMatches) {
              haloInfo2["\u653B\u51FB\u529B"] = parseInt(extraMatches[1]);
              haloInfo2["\u751F\u547D\u503C"] = parseInt(extraMatches[2]);
            }
            _setValue(Const_default.haloInfoTmpLogName, $.extend(haloInfo2, {
              time: $.now()
            }));
            return haloInfo2;
          } else return "error";
        }, function () {
          return "timeout";
        });
      };
      _setHaloInfo = function _setHaloInfo(newHaloInfo) {
        haloInfo = newHaloInfo;
        if (!$("#pdHaloInfo").length) {
          var $node = $properties.find('input[type="text"]:eq(13)');
          if (!$node.length || $.trim($node.val())) return;
          $node.attr("id", "pdHaloInfo");
          $("<a data-name=\"reloadHaloInfo\" href=\"#\" style=\"margin-left: -20px;\" title=\"\u5982\u6218\u529B\u5149\u73AF\u4FE1\u606F\u4E0D\u6B63\u786E\u65F6\uFF0C\u8BF7\u70B9\u6B64\u91CD\u65B0\u8BFB\u53D6\">\u8BFB</a>").insertAfter($node).click(function (e) {
            e.preventDefault();
            if (confirm("\u662F\u5426\u91CD\u65B0\u8BFB\u53D6\u6218\u529B\u5149\u73AF\u4FE1\u606F\uFF1F")) {
              _deleteValue(Const_default.haloInfoTmpLogName);
              _readHaloInfo();
            }
          });
        }
        $("#pdHaloInfo").val("\u5168\u5C5E\u6027+".concat(Math.round(haloInfo["\u5168\u5C5E\u6027"] * 1e3) / 10, "% (+").concat(haloInfo["\u653B\u51FB\u529B"], "|+").concat(haloInfo["\u751F\u547D\u503C"], ")"));
      };
      _getPromoteHaloInfo2 = function _getPromoteHaloInfo() {
        _runFunc("Loot.getPromoteHaloInfo_before_");
        console.log("\u83B7\u53D6\u6218\u529B\u5149\u73AF\u9875\u9762\u4FE1\u606FStart");
        var $wait = _wait("<strong>\u6B63\u5728\u83B7\u53D6\u6218\u529B\u5149\u73AF\u4FE1\u606F\uFF0C\u8BF7\u7A0D\u5019&hellip;</strong>");
        var setCookie2 = function setCookie2(value) {
          var nextTime = _getDate(value);
          _setCookie(Const_default.promoteHaloCookieName, nextTime.getTime(), nextTime);
          $(document).dequeue("AutoAction");
          return false;
        };
        var _getPersonalInfo = function getPersonalInfo() {
          $.ajax({
            type: "GET",
            url: "profile.php?action=show&uid=".concat(Info_default.uid, "&t=").concat($.now()),
            timeout: Const_default.defAjaxTimeout
          }).done(function (html2) {
            _remove($wait);
            var regex2 = Config.promoteHaloCostType >= 11 ? /贡献数值：(\d+(?:\.\d+)?)/ : /论坛货币：(-?\d+)\s*KFB/;
            var matches = regex2.exec(html2);
            if (!matches) return setCookie2("+".concat(Const_default.promoteHaloLimitNextActionInterval, "m"));
            var currency = parseFloat(matches[1]);
            if (currency > Config.promoteHaloLimit) {
              var _getPromoteHaloCostBy = _getPromoteHaloCostByTypeId(Config.promoteHaloCostType),
                num2 = _getPromoteHaloCostBy.num;
              var maxCount = Math.floor((currency - Config.promoteHaloLimit) / num2);
              if (maxCount > 0) {
                $wait = _wait("<strong>\u6B63\u5728\u83B7\u53D6\u6218\u529B\u5149\u73AF\u4FE1\u606F\uFF0C\u8BF7\u7A0D\u5019&hellip;</strong>");
                getHaloInfo2(maxCount);
              } else return setCookie2("+".concat(Const_default.promoteHaloLimitNextActionInterval, "m"));
            } else return setCookie2("+".concat(Const_default.promoteHaloLimitNextActionInterval, "m"));
          }).fail(function () {
            return setTimeout(_getPersonalInfo, Const_default.defAjaxInterval);
          });
        };
        var getHaloInfo2 = function getHaloInfo2() {
          var maxCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
          $.ajax({
            type: "GET",
            url: "kf_fw_ig_halo.php?t=" + $.now(),
            timeout: Const_default.defAjaxTimeout
          }).done(function (html2) {
            _remove($wait);
            var safeIdMatches = /safeid=(\w+)"/.exec(html2);
            if (!safeIdMatches) return setCookie2("+1h");
            var safeId3 = safeIdMatches[1];
            var surplusMatches = /下次随机还需\[(\d+)]分钟/.exec(html2);
            if (surplusMatches) {
              var promoteHaloInterval = Config.promoteHaloAutoIntervalEnabled ? Const_default.minPromoteHaloInterval : Config.promoteHaloInterval * 60;
              promoteHaloInterval = promoteHaloInterval < Const_default.minPromoteHaloInterval ? Const_default.minPromoteHaloInterval : promoteHaloInterval;
              return setCookie2("+".concat(promoteHaloInterval - (Const_default.minPromoteHaloInterval - parseInt(surplusMatches[1])), "m"));
            }
            var totalCount = 1;
            var countMatches = /当前光环随机可用\[(\d+)]次/.exec(html2);
            if (Config.promoteHaloAutoIntervalEnabled && countMatches) {
              totalCount = parseInt(countMatches[1]);
              if (maxCount > -1) totalCount = totalCount > maxCount ? maxCount : totalCount;
            }
            _promoteHalo(totalCount, Config.promoteHaloCostType, safeId3);
          }).fail(function () {
            _remove($wait);
            setTimeout(_getPromoteHaloInfo2, Const_default.defAjaxInterval);
          });
        };
        if (Config.promoteHaloLimit > 0) _getPersonalInfo();else getHaloInfo2();
      };
      _promoteHalo = function _promoteHalo(totalCount, promoteHaloCostType, safeId3) {
        console.log("\u63D0\u5347\u6218\u529B\u5149\u73AFStart");
        var $wait = _wait("<strong>\u6B63\u5728\u63D0\u5347\u6218\u529B\u5149\u73AF&hellip;</strong><i>\u5269\u4F59\uFF1A<em class=\"pd_countdown\">".concat(totalCount, "</em></i><a class=\"pd_stop_action\" href=\"#\">\u505C\u6B62\u64CD\u4F5C</a>"));
        _deleteValue(Const_default.haloInfoTmpLogName);
        var isStop = false;
        var index = 0;
        var nextTime = _getDate("+10m").getTime();
        var _promote = function promote() {
          $.ajax({
            type: "GET",
            url: "kf_fw_ig_halo.php?do=buy&id=".concat(promoteHaloCostType, "&safeid=").concat(safeId3, "&t=").concat($.now()),
            timeout: Const_default.defAjaxTimeout
          }).done(function (html2) {
            _showFormatLog("\u63D0\u5347\u6218\u529B\u5149\u73AF", html2);
            var _getResponseMsg3 = _getResponseMsg(html2),
              msg = _getResponseMsg3.msg;
            var matches = /(新数值为|随机值为)\[(\d+(?:\.\d+)?)%]/.exec(msg);
            if (matches) {
              var isNew = matches[1] === "\u65B0\u6570\u503C\u4E3A";
              nextTime = Config.promoteHaloAutoIntervalEnabled ? 0 : _getDate("+".concat(Config.promoteHaloInterval, "h")).getTime();
              var randomNum = parseFloat(matches[2]);
              var costResult = _getPromoteHaloCostByTypeId(promoteHaloCostType);
              _show("<strong>" + (isNew ? "\u606D\u559C\u4F60\u63D0\u5347\u4E86\u5149\u73AF\u7684\u6548\u679C\uFF01\u65B0\u6570\u503C\u4E3A\u3010<em>".concat(randomNum, "%</em>\u3011") : "\u4F60\u672C\u6B21\u968F\u673A\u503C\u4E3A\u3010<em>".concat(randomNum, "%</em>\u3011\uFF0C\u672A\u8D85\u8FC7\u5149\u73AF\u6548\u679C")) + "</strong><i>".concat(costResult.type, "<ins>").concat((-costResult.num).toLocaleString(), "</ins></i>"));
              var pay = {};
              pay[costResult.type] = -costResult.num;
              _push("\u63D0\u5347\u6218\u529B\u5149\u73AF", isNew ? "\u606D\u559C\u4F60\u63D0\u5347\u4E86\u5149\u73AF\u7684\u6548\u679C\uFF01\u65B0\u6570\u503C\u4E3A\u3010`".concat(randomNum, "%`\u3011") : "\u4F60\u672C\u6B21\u968F\u673A\u503C\u4E3A\u3010`".concat(randomNum, "%`\u3011\uFF0C\u672A\u8D85\u8FC7\u5149\u73AF\u6548\u679C"), {
                pay: pay
              });
              index++;
            } else {
              if (/两次操作间隔过短/.test(msg)) nextTime = _getDate("+10s").getTime();else isStop = true;
              matches = /你的(贡献点数|KFB)不足/.exec(msg);
              if (matches) {
                nextTime = _getDate("+".concat(Config.promoteHaloInterval, "h")).getTime();
                _show("<strong>".concat(matches[1], "\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u63D0\u5347\u6218\u529B\u5149\u73AF</strong><a href=\"kf_fw_ig_halo.php\" target=\"_blank\">\u624B\u52A8\u9009\u62E9</a>"), -1);
              }
              matches = /你还需要等待(\d+)分钟/.exec(msg);
              if (matches) {
                var promoteHaloInterval = Config.promoteHaloInterval * 60;
                promoteHaloInterval = promoteHaloInterval < Const_default.minPromoteHaloInterval ? Const_default.minPromoteHaloInterval : promoteHaloInterval;
                nextTime = _getDate("+".concat(Config.promoteHaloInterval * 60 - (Const_default.minPromoteHaloInterval - parseInt(matches[1])), "m")).getTime();
              }
            }
          }).always(function () {
            $wait.find(".pd_countdown").text(totalCount - index);
            isStop = isStop || $wait.data("stop");
            if (isStop || index === totalCount) {
              _remove($wait);
              if (nextTime > 0 || isStop) {
                _setCookie(Const_default.promoteHaloCookieName, nextTime, new Date(nextTime));
                setTimeout(function () {
                  return $(document).dequeue("AutoAction");
                }, Const_default.minActionInterval);
              } else {
                _deleteCookie(Const_default.promoteHaloCookieName);
                _getPromoteHaloInfo2();
              }
              _runFunc("Loot.promoteHalo_after_");
            } else {
              setTimeout(_promote, Const_default.promoteHaloActionInterval);
            }
          });
        };
        _promote();
      };
      _getPromoteHaloCostByTypeId = function _getPromoteHaloCostByTypeId(id) {
        switch (id) {
          case 1:
            return {
              type: "KFB",
              num: 100
            };
          case 2:
            return {
              type: "KFB",
              num: 1e3
            };
          case 11:
            return {
              type: "\u8D21\u732E",
              num: 0.2
            };
          case 12:
            return {
              type: "\u8D21\u732E",
              num: 2
            };
          default:
            return {
              type: "KFB",
              num: 0
            };
        }
      };
    }
  });

  // src/module/Index.js
  var Index_exports = {};
  __export(Index_exports, {
    addPromoteHaloInterval: function addPromoteHaloInterval() {
      return _addPromoteHaloInterval;
    },
    addThreadFastGotoLink: function addThreadFastGotoLink() {
      return _addThreadFastGotoLink;
    },
    smLevelUpAlert: function smLevelUpAlert() {
      return _smLevelUpAlert;
    },
    smRankChangeAlert: function smRankChangeAlert() {
      return _smRankChangeAlert;
    }
  });
  var _smLevelUpAlert, _smRankChangeAlert, _addThreadFastGotoLink, _addPromoteHaloInterval;
  var init_Index = __esm({
    "src/module/Index.js": function src_module_IndexJs() {
      "use strict";

      init_Info();
      init_Util();
      init_Msg();
      init_Const();
      init_Log();
      init_TmpLog();
      init_Loot();
      _smLevelUpAlert = function _smLevelUpAlert() {
        var smLevel = parseInt($("#pdSmLevel").data("sm-level"));
        if (!smLevel) return;
        var writeData2 = function writeData2(smLevel2) {
          _setValue(Const_default.smLevelUpTmpLogName, {
            time: $.now(),
            smLevel: smLevel2
          });
        };
        var data = _getValue(Const_default.smLevelUpTmpLogName);
        if (!data || $.type(data.time) !== "number" || $.type(data.smLevel) !== "number") {
          writeData2(smLevel);
        } else if (smLevel > data.smLevel) {
          var diff = Math.floor(($.now() - data.time) / 60 / 60 / 1e3);
          if (diff >= Const_default.smLevelUpAlertInterval) {
            var date = new Date(data.time);
            writeData2(smLevel);
            _push("\u795E\u79D8\u7B49\u7EA7\u5347\u7EA7", "\u81EA`".concat(_getDateString(date), "`\u4EE5\u6765\uFF0C\u4F60\u7684\u795E\u79D8\u7B49\u7EA7\u5171\u4E0A\u5347\u4E86`").concat(smLevel - data.smLevel, "`\u7EA7 (Lv.`").concat(data.smLevel, "`->Lv.`").concat(smLevel, "`)"));
            _show("\u81EA<em>".concat(_getDateString(date), "</em>\u4EE5\u6765\uFF0C\u4F60\u7684\u795E\u79D8\u7B49\u7EA7\u5171\u4E0A\u5347\u4E86<em>").concat(smLevel - data.smLevel, "</em>\u7EA7"));
          } else if (diff < 0) {
            writeData2(smLevel);
          }
        } else if (smLevel < data.smLevel) {
          writeData2(smLevel);
        }
      };
      _smRankChangeAlert = function _smRankChangeAlert() {
        var smRank = $("#pdSmLevel").data("sm-rank");
        if (!smRank || smRank.toString().endsWith("+")) return;
        smRank = parseInt(smRank);
        var writeData2 = function writeData2(smRank2) {
          return _setValue(Const_default.smRankChangeTmpLogName, {
            time: $.now(),
            smRank: smRank2
          });
        };
        var data = _getValue(Const_default.smRankChangeTmpLogName);
        if (!data || $.type(data.time) !== "number" || $.type(data.smRank) !== "number") {
          writeData2(smRank);
        } else if (smRank !== data.smRank) {
          var diff = Math.floor(($.now() - data.time) / 60 / 60 / 1e3);
          if (diff >= Const_default.smRankChangeAlertInterval) {
            var date = new Date(data.time);
            var isUp = smRank < data.smRank;
            writeData2(smRank);
            _push("\u795E\u79D8\u7CFB\u6570\u6392\u540D\u53D8\u5316", "\u81EA`".concat(_getDateString(date), "`\u4EE5\u6765\uFF0C\u4F60\u7684\u795E\u79D8\u7CFB\u6570\u6392\u540D\u5171`").concat(isUp ? "\u4E0A\u5347" : "\u4E0B\u964D", "`\u4E86`").concat(Math.abs(smRank - data.smRank), "`\u540D (No.`").concat(data.smRank, "`->No.`").concat(smRank, "`)"));
            _show("\u81EA<em>".concat(_getDateString(date), "</em>\u4EE5\u6765\uFF0C\u4F60\u7684\u795E\u79D8\u7CFB\u6570\u6392\u540D\u5171<b style=\"color: ").concat(isUp ? "#F00" : "#393", "\">").concat(isUp ? "\u4E0A\u5347" : "\u4E0B\u964D", "</b>\u4E86<em>").concat(Math.abs(smRank - data.smRank), "</em>\u540D"));
          } else if (diff < 0) {
            writeData2(smRank);
          }
        }
      };
      _addThreadFastGotoLink = function _addThreadFastGotoLink() {
        $("#alldiv > .drow:last-child").on("click", "span.indexlbtc_s, span.k_fr", function (e) {
          var $this2 = $(this);
          var url = $this2.parent("a").attr("href");
          if (url) {
            e.preventDefault();
            location.href = url + "&page=e#a";
            return false;
          }
        });
      };
      _addPromoteHaloInterval = function _addPromoteHaloInterval() {
        var nextTime = parseInt(_getCookie(Const_default.promoteHaloCookieName));
        if (!nextTime) return;
        var interval = nextTime - $.now();
        if (interval > 0) {
          var minutes = Math.ceil(interval / 60 / 1e3);
          var hours = Math.floor(minutes / 60);
          minutes -= hours * 60;
          $("#pdLoot").append("<span id=\"pdHaloInterval\"> (\u5149\u73AF\uFF1A".concat(hours > 0 ? hours + "\u65F6" : "").concat(minutes, "\u5206)</span>"));
        }
      };
    }
  });

  // src/module/Post.js
  var Post_exports = {};
  __export(Post_exports, {
    addAttachChangeAlert: function addAttachChangeAlert() {
      return _addAttachChangeAlert;
    },
    addExtraOptionInPostPage: function addExtraOptionInPostPage() {
      return _addExtraOptionInPostPage;
    },
    addExtraPostEditorButton: function addExtraPostEditorButton() {
      return _addExtraPostEditorButton;
    },
    addFillTitleBtn: function addFillTitleBtn() {
      return _addFillTitleBtn;
    },
    addRedundantKeywordWarning: function addRedundantKeywordWarning() {
      return _addRedundantKeywordWarning;
    },
    handleMultiQuote: function handleMultiQuote() {
      return _handleMultiQuote;
    },
    importKfSmileEnhanceExtension: function importKfSmileEnhanceExtension() {
      return _importKfSmileEnhanceExtension;
    },
    modifyPostPreviewPage: function modifyPostPreviewPage() {
      return _modifyPostPreviewPage;
    },
    preventCloseWindowWhenEditPost: function preventCloseWindowWhenEditPost() {
      return _preventCloseWindowWhenEditPost;
    },
    removeUnpairedBBCodeInQuoteContent: function removeUnpairedBBCodeInQuoteContent() {
      return _removeUnpairedBBCodeInQuoteContent;
    },
    replaceSiteLink: function replaceSiteLink() {
      return _replaceSiteLink;
    },
    savePostContentWhenSubmit: function savePostContentWhenSubmit() {
      return _savePostContentWhenSubmit;
    }
  });
  var _handleMultiQuote, _removeUnpairedBBCodeInQuoteContent, _addExtraPostEditorButton, _addExtraOptionInPostPage, _modifyPostPreviewPage, _addAttachChangeAlert, _importKfSmileEnhanceExtension, _preventCloseWindowWhenEditPost, _savePostContentWhenSubmit, _addRedundantKeywordWarning, _addFillTitleBtn, _replaceSiteLink;
  var init_Post = __esm({
    "src/module/Post.js": function src_module_PostJs() {
      "use strict";

      init_Info();
      init_Util();
      init_Msg();
      init_Const();
      init_Script();
      _handleMultiQuote = function _handleMultiQuote() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        _runFunc("Post.handleMultiQuote_before_", type);
        if (!$("#pdClearMultiQuoteData").length) {
          if (location.pathname === "/read.php") {
            $("<a id=\"pdClearMultiQuoteData\" style=\"margin-right: 7px;\" title=\"\u6E05\u9664\u5728\u6D4F\u89C8\u5668\u4E2D\u4FDD\u5B58\u7684\u591A\u91CD\u5F15\u7528\u6570\u636E\" href=\"#\">\u6E05\u9664\u5F15\u7528\u6570\u636E</a>").prependTo($('input[name="diy_guanjianci"]').parent());
          } else {
            $("<a id=\"pdClearMultiQuoteData\" style=\"margin-left: 7px;\" title=\"\u6E05\u9664\u5728\u6D4F\u89C8\u5668\u4E2D\u4FDD\u5B58\u7684\u591A\u91CD\u5F15\u7528\u6570\u636E\" href=\"#\">\u6E05\u9664\u5F15\u7528\u6570\u636E</a>").insertAfter('input[name="diy_guanjianci"]');
          }
          $("#pdClearMultiQuoteData").click(function (e) {
            e.preventDefault();
            localStorage.removeItem(Const_default.multiQuoteStorageName);
            $('input[name="diy_guanjianci"]').val("");
            $(type === 2 ? "#textarea" : 'textarea[name="atc_content"]').val("");
            alert("\u591A\u91CD\u5F15\u7528\u6570\u636E\u5DF2\u88AB\u6E05\u9664");
          });
        }
        var data = localStorage[Const_default.multiQuoteStorageName];
        if (!data) return;
        try {
          data = JSON.parse(data);
        } catch (ex) {
          return;
        }
        if (!data || $.type(data) !== "object" || $.isEmptyObject(data)) return;
        var tid = parseInt(_getUrlParam("tid")),
          fid2 = parseInt(_getUrlParam("fid"));
        if (!tid || typeof data.tid === "undefined" || data.tid !== tid || !Array.isArray(data.quoteList)) return;
        if (type === 2 && !fid2) return;
        var list = [];
        var _iterator8 = _createForOfIteratorHelper(data.quoteList),
          _step8;
        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var quote = _step8.value;
            if (!Array.isArray(quote)) continue;
            var _iterator9 = _createForOfIteratorHelper(quote),
              _step9;
            try {
              for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                var data2 = _step9.value;
                list.push(data2);
              }
            } catch (err) {
              _iterator9.e(err);
            } finally {
              _iterator9.f();
            }
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
        if (!list.length) {
          localStorage.removeItem(Const_default.multiQuoteStorageName);
          return;
        }
        var keywords = /* @__PURE__ */new Set();
        var content = "";
        var $keywords = $('input[name="diy_guanjianci"]');
        if (type === 2) {
          _wait("<strong>\u6B63\u5728\u83B7\u53D6\u5F15\u7528\u5185\u5BB9\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em class=\"pd_countdown\">".concat(list.length, "</em></i>"));
          $(document).clearQueue("MultiQuote");
        }
        $.each(list, function (index, data2) {
          if (typeof data2.floor === "undefined" || typeof data2.pid === "undefined") return;
          keywords.add(data2.userName);
          if (type === 2) {
            $(document).queue("MultiQuote", function () {
              $.get("post.php?action=quote&fid=".concat(fid2, "&tid=").concat(tid, "&pid=").concat(data2.pid, "&article=").concat(data2.floor, "&t=").concat($.now()), function (html2) {
                var matches = /<textarea id="textarea".*?>((.|\n)+?)<\/textarea>/i.exec(html2);
                if (matches) {
                  content += _removeUnpairedBBCodeContent(_htmlDecode(matches[1]).replace(/\n{2,}/g, "\n")) + (index === list.length - 1 ? "" : "\n");
                }
                var $countdown = $(".pd_countdown:last");
                $countdown.text(parseInt($countdown.text()) - 1);
                if (index === list.length - 1) {
                  _destroy();
                  var $textarea = $("#textarea");
                  $textarea.get(0).defaultValue = content;
                  $textarea.val(content).focus();
                  $keywords.trigger("change");
                } else {
                  setTimeout(function () {
                    $(document).dequeue("MultiQuote");
                  }, 100);
                }
              });
            });
          } else {
            content += "[quote]\u56DE ".concat(data2.floor, "\u697C(").concat(data2.userName, ") \u7684\u5E16\u5B50[/quote]\n");
          }
        });
        $keywords.val(_toConsumableArray(keywords).join(","));
        $('form[name="FORM"]').submit(function () {
          localStorage.removeItem(Const_default.multiQuoteStorageName);
        });
        if (type === 2) {
          $(document).dequeue("MultiQuote");
        } else {
          var $textarea = $('textarea[name="atc_content"]');
          $textarea.get(0).defaultValue = content;
          $textarea.val(content).focus();
          $keywords.trigger("change");
        }
        _runFunc("Post.handleMultiQuote_after_", type);
      };
      _removeUnpairedBBCodeInQuoteContent = function _removeUnpairedBBCodeInQuoteContent() {
        var $content = $("#textarea");
        var content = $content.val();
        var matches = /\[quote\](.|\r|\n)+?\[\/quote\]/.exec(content);
        if (matches) {
          var workedContent = _removeUnpairedBBCodeContent(matches[0]);
          if (matches[0] !== workedContent) {
            $content.val(content.replace(matches[0], workedContent));
          }
        }
      };
      _addExtraPostEditorButton = function _addExtraPostEditorButton() {
        var textArea = $("#textarea").get(0);
        if (!textArea) return;
        $("\n<span id=\"wy_post\" title=\"\u63D2\u5165\u9690\u85CF\u5185\u5BB9\" data-type=\"hide\" style=\"background-position: 0 -280px;\">\u63D2\u5165\u9690\u85CF\u5185\u5BB9</span>\n<span id=\"wy_justifyleft\" title=\"\u5DE6\u5BF9\u9F50\" data-type=\"left\" style=\"background-position: 0 -360px;\">\u5DE6\u5BF9\u9F50</span>\n<span id=\"wy_justifycenter\" title=\"\u5C45\u4E2D\" data-type=\"center\" style=\"background-position: 0 -380px;\">\u5C45\u4E2D</span>\n<span id=\"wy_justifyright\" title=\"\u53F3\u5BF9\u9F50\" data-type=\"right\" style=\"background-position: 0 -400px;\">\u53F3\u5BF9\u9F50</span>\n<span id=\"wy_subscript\" title=\"\u4E0B\u6807\" data-type=\"sub\" style=\"background-position: 0 -80px;\">\u4E0B\u6807</span>\n<span id=\"wy_superscript\" title=\"\u4E0A\u6807\" data-type=\"sup\" style=\"background-position: 0 -100px;\">\u4E0A\u6807</span>\n<span class=\"pd_editor_btn\" title=\"\u63D2\u5165\u98DE\u884C\u6587\u5B57\" data-type=\"fly\">F</span>\n<span class=\"pd_editor_btn\" title=\"\u63D2\u5165HTML5\u97F3\u9891\" data-type=\"audio\">A</span>\n<span class=\"pd_editor_btn\" title=\"\u63D2\u5165HTML5\u89C6\u9891\" data-type=\"video\">V</span>\n").appendTo("#editor-button .editor-button").click(function () {
          var $this2 = $(this);
          var type = $this2.data("type");
          var text = "";
          switch (type) {
            case "hide":
              text = prompt("\u8BF7\u8F93\u5165\u795E\u79D8\u7B49\u7EA7\uFF1A", 5);
              break;
            case "audio":
              {
                text = prompt("\u8BF7\u8F93\u5165HTML5\u97F3\u9891\u5B9E\u9645\u5730\u5740\uFF1A\n\uFF08\u53EF\u76F4\u63A5\u8F93\u5165\u7F51\u6613\u4E91\u97F3\u4E50\u7684\u5355\u66F2\u5730\u5740\uFF0C\u5C06\u81EA\u52A8\u8F6C\u6362\u4E3A\u5916\u94FE\u5730\u5740\uFF09", "http://");
                var matches = /^https?:\/\/music\.163\.com\/(?:#\/)?song\?id=(\d+)/i.exec(text);
                if (matches) text = "https://music.miaola.work/163/".concat(matches[1], ".mp3");
                matches = /^https?:\/\/www\.xiami\.com\/song\/(\w+)/i.exec(text);
                if (matches) text = "https://music.miaola.work/xiami/".concat(matches[1], ".mp3");
              }
              break;
            case "video":
              {
                text = prompt("\u8BF7\u8F93\u5165HTML5\u89C6\u9891\u5B9E\u9645\u5730\u5740\uFF1A\n\uFF08\u53EF\u76F4\u63A5\u8F93\u5165YouTube\u89C6\u9891\u9875\u9762\u7684\u5730\u5740\uFF0C\u5C06\u81EA\u52A8\u8F6C\u6362\u4E3A\u5916\u94FE\u5730\u5740\uFF09", "http://");
                var _matches = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w\-]+)/i.exec(text);
                if (_matches) text = "https://video.miaola.work/youtube/".concat(_matches[1]);
                _matches = /^https?:\/\/youtu\.be\/([\w\-]+)$/i.exec(text);
                if (_matches) text = "https://video.miaola.work/youtube/".concat(_matches[1]);
              }
              break;
          }
          if (text === null) return;
          var selText = "";
          var code = "";
          switch (type) {
            case "hide":
              selText = _getSelText(textArea);
              code = "[hide=".concat(text, "]").concat(selText, "[/hide]");
              break;
            case "left":
              selText = _getSelText(textArea);
              code = "[align=left]".concat(selText, "[/align]");
              break;
            case "center":
              selText = _getSelText(textArea);
              code = "[align=center]".concat(selText, "[/align]");
              break;
            case "right":
              selText = _getSelText(textArea);
              code = "[align=right]".concat(selText, "[/align]");
              break;
            case "fly":
              selText = _getSelText(textArea);
              code = "[fly]".concat(selText, "[/fly]");
              break;
            case "sub":
              selText = _getSelText(textArea);
              code = "[sub]".concat(selText, "[/sub]");
              break;
            case "sup":
              selText = _getSelText(textArea);
              code = "[sup]".concat(selText, "[/sup]");
              break;
            case "audio":
              code = "[audio]".concat(text, "[/audio]");
              break;
            case "video":
              code = "[video]".concat(text, "[/video]");
              break;
          }
          if (!code) return;
          _addCode(textArea, code, selText);
          textArea.focus();
        }).mouseenter(function () {
          $(this).addClass("buttonHover");
        }).mouseleave(function () {
          $(this).removeClass("buttonHover");
        });
      };
      _addExtraOptionInPostPage = function _addExtraOptionInPostPage() {
        $("\n<div class=\"pd_post_extra_option\">\n  <label><input type=\"checkbox\" name=\"autoAnalyzeUrl\" checked> \u81EA\u52A8\u5206\u6790url</label>\n  <label style=\"margin-left: 5px;\"><input type=\"checkbox\" name=\"windCodeAutoConvert\" checked> Wind Code\u81EA\u52A8\u8F6C\u6362</label>\n</div>\n").appendTo($("#menu_show").closest("td")).on("click", '[type="checkbox"]', function () {
          var $this2 = $(this);
          var inputName = $this2.is('[name="autoAnalyzeUrl"]') ? "atc_autourl" : "atc_convert";
          $('form[name="FORM"]').find("[name=\"".concat(inputName, "\"]")).val($this2.prop("checked") ? 1 : 0);
        });
        $("<input type=\"button\" value=\"\u9884\u89C8\u5E16\u5B50\" style=\"margin-left: 7px;\">").insertAfter('[type="submit"][name="Submit"]').click(function (e) {
          e.preventDefault();
          var $form = $('form[name="preview"]');
          $form.find('input[name="atc_content"]').val($("#textarea").val());
          $form.submit();
        });
      };
      _modifyPostPreviewPage = function _modifyPostPreviewPage() {
        $("table > tbody > tr.tr1 > th").css({
          "text-align": "left",
          "font-weight": "normal",
          "border": "1px solid #9191ff",
          "padding": "10px"
        });
      };
      _addAttachChangeAlert = function _addAttachChangeAlert() {
        $(document).on("click", '.abtn[id^="md_"]', function () {
          if (!$(document).data("attachUpdateAlert")) {
            alert("\u672C\u53CD\u5411\u4EE3\u7406\u670D\u52A1\u5668\u4E3A\u4E86\u63D0\u9AD8\u6027\u80FD\u5BF9\u56FE\u7247\u8BBE\u7F6E\u4E86\u7F13\u5B58\uFF0C\u66F4\u65B0\u9644\u4EF6\u56FE\u7247\u540E\u53EF\u80FD\u9700\u7B49\u5F85\u6700\u591A30\u5206\u949F\u624D\u80FD\u770B\u5230\u6548\u679C");
            $(document).data("attachUpdateAlert", true);
          }
        });
      };
      _importKfSmileEnhanceExtension = function _importKfSmileEnhanceExtension() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.charset = "utf-8";
        script.src = "https://kf.miaola.work/KfEmotion.min.user.js" + (typeof Info_default.w.resTimestamp !== "undefined" ? "?ts=" + Info_default.w.resTimestamp : "");
        document.body.appendChild(script);
      };
      _preventCloseWindowWhenEditPost = function _preventCloseWindowWhenEditPost() {
        window.addEventListener("beforeunload", function (e) {
          var $textArea = $(location.pathname === "/post.php" ? "#textarea" : 'textarea[name="atc_content"]');
          var content = $textArea.val();
          if (content && content !== $textArea.get(0).defaultValue && !Info_default.w.isSubmit) {
            var msg = "\u4F60\u53EF\u80FD\u6B63\u5728\u64B0\u5199\u53D1\u5E16\u5185\u5BB9\u4E2D\uFF0C\u786E\u5B9A\u8981\u5173\u95ED\u9875\u9762\u5417\uFF1F";
            e.returnValue = msg;
            return msg;
          }
        });
        $('form[action="post.php?"]').submit(function () {
          Info_default.w.isSubmit = true;
        });
      };
      _savePostContentWhenSubmit = function _savePostContentWhenSubmit() {
        var $textArea = $(location.pathname === "/post.php" ? "#textarea" : 'textarea[name="atc_content"]');
        $('form[action="post.php?"]').submit(function () {
          var content = $textArea.val();
          if ($.trim(content).length > 0) sessionStorage.setItem(Const_default.postContentStorageName, content);
        });
        var postContent = sessionStorage.getItem(Const_default.postContentStorageName);
        if (postContent) {
          $("\n<div style=\"padding: 0 10px; line-height: 2em; text-align: left; background-color: #fefee9; border: 1px solid #99f;\">\n  <a class=\"pd_btn_link\" data-name=\"restore\" href=\"#\">[\u6062\u590D\u4E0A\u6B21\u63D0\u4EA4\u7684\u5185\u5BB9]</a>\n  <a class=\"pd_btn_link\" data-name=\"clear\" href=\"#\">[\u6E05\u9664]</a>\n</div>\n").insertBefore($textArea).find('[data-name="restore"]').click(function (e) {
            e.preventDefault();
            $textArea.val(postContent);
            $(this).parent().find('[data-name="clear"]').click();
          }).end().find('[data-name="clear"]').click(function (e) {
            e.preventDefault();
            sessionStorage.removeItem(Const_default.postContentStorageName);
            $(this).parent().remove();
          });
        }
      };
      _addRedundantKeywordWarning = function _addRedundantKeywordWarning() {
        $('input[name="diy_guanjianci"]').change(function () {
          var $this2 = $(this);
          var keywords = $.trim($this2.val()).split(",").filter(function (str) {
            return str;
          });
          if (keywords.length > 5) {
            alert("\u6240\u586B\u5173\u952E\u8BCD\u5DF2\u8D85\u8FC75\u4E2A\uFF0C\u591A\u4F59\u7684\u5173\u952E\u8BCD\u5C06\u88AB\u5FFD\u7565");
            $this2.select().focus();
          }
        });
      };
      _addFillTitleBtn = function _addFillTitleBtn() {
        $("<a class=\"pd_btn_link\" data-name=\"fill\" href=\"#\" title=\"\u6309\u7167\u683C\u5F0F\u586B\u5145\u6807\u9898\">\u586B\u5145</a>").insertAfter("#btyl").click(function (e) {
          e.preventDefault();
          var value = $.trim(prompt("\u8BF7\u6309\u683C\u5F0F\u586B\u5199\u6807\u9898\u540D\u79F0\uFF0C\u4F1A\u81EA\u52A8\u586B\u5145\u5230\u76F8\u5E94\u7684\u8868\u5355\u4E2D\uFF08\u9009\u586B\u9879\u53EF\u4E0D\u586B\uFF09\uFF1A\n\u4F8B\uFF1A[\u8BF8\u795E\u5B57\u5E55\u7EC4][Seiren][\u6E05\u604B][01-12\u5408\u96C6][\u7B80\u7E41\u65E5\u5185\u6302][1080P][\u767E\u5EA630D][3.25GB][BDRIP]\n\u6216 [\u81EA\u8D2D][\u65B0\u4F5C][nostalabel]\u5F85\u96EA\u306E\u82B1 \uFF5Esnow drop\uFF5E[MEGA\u957F\u671F][667MB][BMP]"));
          if (!value) return;
          var matches = /(\[自购\])?(\[新作\])?(.+)\[([^\[\]]+?)(\d+D|长期)?\]\[(\d+(?:\.\d+)?(?:G|M)B?)\](?:\[([^\[\]]+)\])?/i.exec(value);
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
      _replaceSiteLink = function _replaceSiteLink() {
        $('form[name="FORM"]').submit(function () {
          var $textArea = $(this).find('textarea[name="atc_content"]');
          if (!$textArea.length) return;
          $textArea.val($textArea.val().replace(new RegExp("".concat(location.protocol, "//").concat(location.hostname.replace(/\./g, "\\."), "/(\\w+)\\.php"), "g"), "https://bbs.kfpromax.com/$1.php"));
        });
      };
    }
  });

  // src/module/Read.js
  var Read_exports = {};
  __export(Read_exports, {
    addCopyBuyersListOption: function addCopyBuyersListOption() {
      return _addCopyBuyersListOption;
    },
    addCopyCodeLink: function addCopyCodeLink() {
      return _addCopyCodeLink;
    },
    addFastGotoFloorInput: function addFastGotoFloorInput() {
      return _addFastGotoFloorInput;
    },
    addFloorGotoLink: function addFloorGotoLink() {
      return _addFloorGotoLink;
    },
    addMoreSmileLink: function addMoreSmileLink() {
      return _addMoreSmileLink;
    },
    addMultiQuoteButton: function addMultiQuoteButton() {
      return _addMultiQuoteButton;
    },
    addSignTips: function addSignTips() {
      return _addSignTips;
    },
    addStatAndBuyThreadBtn: function addStatAndBuyThreadBtn() {
      return _addStatAndBuyThreadBtn;
    },
    addUserMemo: function addUserMemo() {
      return _addUserMemo;
    },
    adjustThreadContentFontSize: function adjustThreadContentFontSize() {
      return _adjustThreadContentFontSize;
    },
    buyThreads: function buyThreads() {
      return _buyThreads;
    },
    clearBuyThreadLog: function clearBuyThreadLog() {
      return _clearBuyThreadLog;
    },
    fastGotoFloor: function fastGotoFloor() {
      return _fastGotoFloor;
    },
    getMultiQuoteData: function getMultiQuoteData() {
      return _getMultiQuoteData;
    },
    getThreadTitle: function getThreadTitle() {
      return _getThreadTitle;
    },
    handleBuyThreadBtn: function handleBuyThreadBtn() {
      return _handleBuyThreadBtn;
    },
    modifyFloorSmColor: function modifyFloorSmColor() {
      return _modifyFloorSmColor;
    },
    modifyKFOtherDomainLink: function modifyKFOtherDomainLink() {
      return _modifyKFOtherDomainLink;
    },
    modifyMySmColor: function modifyMySmColor() {
      return _modifyMySmColor;
    },
    parseMediaTag: function parseMediaTag() {
      return _parseMediaTag;
    },
    readBuyThreadLog: function readBuyThreadLog() {
      return _readBuyThreadLog;
    },
    recordBuyThreadLog: function recordBuyThreadLog() {
      return _recordBuyThreadLog;
    },
    replaceReadImage: function replaceReadImage() {
      return _replaceReadImage;
    },
    showAttachImageOutsideSellBox: function showAttachImageOutsideSellBox() {
      return _showAttachImageOutsideSellBox;
    },
    showBuyThreadLogDialog: function showBuyThreadLogDialog() {
      return _showBuyThreadLogDialog;
    },
    showStatFloorDialog: function showStatFloorDialog() {
      return _showStatFloorDialog;
    },
    statFloor: function statFloor() {
      return _statFloor;
    },
    writeBuyThreadLog: function writeBuyThreadLog() {
      return _writeBuyThreadLog;
    }
  });
  var _addFloorGotoLink, _addFastGotoFloorInput, _fastGotoFloor, _modifyFloorSmColor, _modifyMySmColor, _adjustThreadContentFontSize, _addCopyBuyersListOption, _addStatAndBuyThreadBtn, _statFloor, _showStatFloorDialog, _buyThreads, _handleBuyThreadBtn, _getMultiQuoteData, _addMultiQuoteButton, _modifyKFOtherDomainLink, _addUserMemo, _addCopyCodeLink, _addMoreSmileLink, _parseMediaTag, _showAttachImageOutsideSellBox, _getThreadTitle, buyThreadLogName, _readBuyThreadLog, _writeBuyThreadLog, _clearBuyThreadLog, _recordBuyThreadLog, _showBuyThreadLogDialog, _addSignTips, _replaceReadImage;
  var init_Read = __esm({
    "src/module/Read.js": function src_module_ReadJs() {
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
      _addFloorGotoLink = function _addFloorGotoLink() {
        var sf = _getThreadSfParam();
        $(".readtext").find("> table > tbody > tr > td:nth-child(2) > div > div:nth-child(2) > span:first-child").each(function () {
          var $this2 = $(this);
          var floorText = $this2.text();
          if (!/^\d+楼/.test(floorText)) return;
          var linkName = $this2.closest(".readtext").prev(".readlou").prev("a").attr("name");
          if (!linkName || !/^\d+$/.test(linkName)) return;
          var url = "".concat(_getHostNameUrl(), "read.php?tid=").concat(_getUrlParam("tid"), "&spid=").concat(linkName).concat(sf ? "&sf=" + sf : "");
          $this2.html($this2.html().replace(/(\d+)楼/, "<a class=\"pd_goto_link\" href=\"".concat(url, "\" title=\"\u590D\u5236\u697C\u5C42\u94FE\u63A5\">$1\u697C</a>")));
          $this2.find("a").click(function (e) {
            e.preventDefault();
            var $this3 = $(this);
            var url2 = $this3.attr("href");
            $this3.data("copy-text", url2);
            if (!_copyText($this3, "\u697C\u5C42\u94FE\u63A5\u5DF2\u590D\u5236")) {
              prompt("\u672C\u697C\u7684\u8DF3\u8F6C\u94FE\u63A5\uFF08\u8BF7\u6309Ctrl+C\u590D\u5236\uFF09\uFF1A", url2);
            }
          });
        });
      };
      _addFastGotoFloorInput = function _addFastGotoFloorInput() {
        $("\n<li class=\"pd_fast_goto_floor\">\n    <form>\n        \u76F4\u8FBE <input class=\"pd_input\" style=\"width: 30px;\" type=\"text\" maxlength=\"8\">\n        <span data-name=\"submit\" style=\"cursor: pointer;\">\u697C</span>\n    </form>\n</li>\n").appendTo($("#read_tui").parent("li").parent(".b_tit2")).submit(function (e) {
          e.preventDefault();
          var floor = parseInt($(this).find("input").val());
          if (!floor || floor < 0) return;
          var sf = _getThreadSfParam();
          location.href = "read.php?tid=".concat(_getUrlParam("tid"), "&page=").concat(parseInt(floor / Config.perPageFloorNum) + 1, "&floor=").concat(floor, "&sf=").concat(sf);
        }).find('[data-name="submit"]').click(function () {
          $(this).closest("form").submit();
        });
      };
      _fastGotoFloor = function _fastGotoFloor() {
        var floor = parseInt(_getUrlParam("floor"));
        if (!floor || floor < 0) return;
        var $floorNode = $(".readtext > table > tbody > tr > td:nth-child(2) > div > div:nth-child(2) > span:first-child:contains(\"".concat(floor, "\u697C\")"));
        if (!$floorNode.length) return;
        var linkName = $floorNode.closest(".readtext").prev(".readlou").prev("a").attr("name");
        if (!linkName || !/^\d+$/.test(linkName)) return;
        location.hash = "#" + linkName;
      };
      _modifyFloorSmColor = function _modifyFloorSmColor($elem, color) {
        $elem.css("color", color).parent(".readidmsbottom").next(".readidmsbottom").find("> span:nth-child(2)").css("color", color).parent(".readidmsbottom").next(".readidmsbottom").find("> span:nth-child(2)").css("color", color);
        $elem.closest(".readtext").css("box-shadow", "1px 1px 2px 2px ".concat(color)).find("> table > tbody > tr > td:nth-child(2) > div").css("box-shadow", "1px 1px 2px 2px ".concat(color));
      };
      _modifyMySmColor = function _modifyMySmColor() {
        var $my = $(".readidmsbottom > a[href^=\"profile.php?action=show&uid=".concat(Info_default.uid, "\"]"));
        if ($my.length > 0) {
          _modifyFloorSmColor($my, Config.customMySmColor);
        }
      };
      _adjustThreadContentFontSize = function _adjustThreadContentFontSize() {
        if (Config.threadContentFontSize > 0 && Config.threadContentFontSize !== 12) {
          $("head").append("\n<style>\n  .readtext > table > tbody > tr > td:nth-child(2) { font-size: ".concat(Config.threadContentFontSize, "px; line-height: 1.6em; width: 100%; }\n  .readtext > table > tbody > tr > td:nth-child(2) > div > div:first-child,\n  .readtext > table > tbody > tr > td:nth-child(2) > div > div:nth-child(2),\n  .readtext .read_fds {\n    font-size: 14px;\n    line-height: 22px;\n  }\n</style>\n"));
        }
      };
      _addCopyBuyersListOption = function _addCopyBuyersListOption() {
        $('.readtext select[name="buyers"]').each(function () {
          $(this).find("option:first-child").after("<option value=\"copyList\">\u590D\u5236\u540D\u5355</option><option value=\"openBuyThreadLogDialog\">\u67E5\u770B\u8D2D\u4E70\u8BB0\u5F55</option>");
        });
        $(document).on("change", 'select[name="buyers"]', function () {
          var $this2 = $(this);
          var name4 = $this2.val();
          if (name4 === "copyList") {
            var buyerList = $this2.find("option").map(function (index) {
              var name5 = $(this).text();
              if (index <= 2 || name5.includes("-".repeat(11))) return null;else return name5;
            }).get().join("\n");
            $this2.get(0).selectedIndex = 0;
            if (!buyerList) {
              alert("\u6682\u65F6\u65E0\u4EBA\u8D2D\u4E70");
              return;
            }
            var dialogName2 = "pdCopyBuyerListDialog";
            if ($("#" + dialogName2).length > 0) return;
            var html2 = "\n<div class=\"pd_cfg_main\">\n  <textarea name=\"buyerList\" style=\"width: 200px; height: 300px; margin: 5px 0;\" readonly>".concat(buyerList, "</textarea>\n</div>");
            var $dialog2 = _create(dialogName2, "\u8D2D\u4E70\u4EBA\u540D\u5355", html2);
            show2(dialogName2);
            $dialog2.find('[name="buyerList"]').select().focus();
          } else if (name4 === "openBuyThreadLogDialog") {
            $this2.get(0).selectedIndex = 0;
            _showBuyThreadLogDialog();
          }
        });
      };
      _addStatAndBuyThreadBtn = function _addStatAndBuyThreadBtn() {
        $("<span style=\"margin: 0 5px;\">|</span><a data-name=\"statAndBuyThread\" title=\"\u7EDF\u8BA1\u56DE\u5E16\u8005\u540D\u5355\u4EE5\u53CA\u6279\u91CF\u8D2D\u4E70\u5E16\u5B50\" href=\"#\">\u7EDF\u8BA1\u548C\u8D2D\u4E70</a>").insertAfter('td > a[href^="kf_tidfavor.php?action=favor&tid="]').filter('[data-name="statAndBuyThread"]').click(function (e) {
          e.preventDefault();
          if ($("#pdStatFloorDialog").length > 0) return;
          var tid = parseInt(_getUrlParam("tid"));
          if (!tid) return;
          var value = $.trim(prompt("\u7EDF\u8BA1\u5230\u7B2C\u51E0\u697C\uFF1F\uFF080\u8868\u793A\u7EDF\u8BA1\u6240\u6709\u697C\u5C42\uFF0C\u53EF\u7528m-n\u7684\u65B9\u5F0F\u6765\u8BBE\u5B9A\u7EDF\u8BA1\u697C\u5C42\u7684\u533A\u95F4\u8303\u56F4\uFF09", 0));
          if (value === "") return;
          if (!/^\d+(-\d+)?$/.test(value)) {
            alert("\u7EDF\u8BA1\u697C\u5C42\u683C\u5F0F\u4E0D\u6B63\u786E");
            return;
          }
          var sf = _getThreadSfParam();
          var startFloor = 0,
            endFloor = 0;
          var valueArr = value.split("-");
          if (valueArr.length === 2) {
            startFloor = parseInt(valueArr[0]);
            endFloor = parseInt(valueArr[1]);
          } else endFloor = parseInt(valueArr[0]);
          if (endFloor < startFloor) {
            alert("\u7EDF\u8BA1\u697C\u5C42\u683C\u5F0F\u4E0D\u6B63\u786E");
            return;
          }
          var matches = /(\d+)页/.exec($(".pages:eq(0) > li:last-child > a").text());
          var maxPage = matches ? parseInt(matches[1]) : 1;
          if (startFloor === 0) startFloor = 1;
          if (endFloor === 0) endFloor = maxPage * Config.perPageFloorNum - 1;
          var startPage = Math.floor(startFloor / Config.perPageFloorNum) + 1;
          var endPage = Math.floor(endFloor / Config.perPageFloorNum) + 1;
          if (endPage > maxPage) endPage = maxPage;
          if (endPage - startPage > Const_default.statFloorMaxPage) {
            alert("\u9700\u8BBF\u95EE\u7684\u603B\u9875\u6570\u4E0D\u53EF\u8D85\u8FC7" + Const_default.statFloorMaxPage);
            return;
          }
          _destroy();
          _wait("<strong>\u6B63\u5728\u7EDF\u8BA1\u697C\u5C42\u4E2D&hellip;</strong><i>\u5269\u4F59\u9875\u6570\uFF1A<em class=\"pd_countdown\">".concat(endPage - startPage + 1, "</em></i><a class=\"pd_stop_action\" href=\"#\">\u505C\u6B62\u64CD\u4F5C</a>"));
          _statFloor(tid, startPage, endPage, startFloor, endFloor, sf);
        });
      };
      _statFloor = function _statFloor(tid, startPage, endPage, startFloor, endFloor, sf) {
        var isStop = false;
        var floorList = [];
        var _stat = function stat(page) {
          $.ajax({
            type: "GET",
            url: "read.php?tid=".concat(tid, "&page=").concat(page, "&sf=").concat(sf, "&t=").concat($.now()),
            timeout: Const_default.defAjaxTimeout,
            success: function success(html2) {
              $(".readtext", html2.replace(/src="[^"]+"/g, "")).each(function () {
                var data = {};
                var $floor = $(this);
                var $floorHeader = $floor.prev(".readlou");
                var floor = parseInt($floorHeader.find("> div:nth-child(2) > span:first-child").text());
                if (!floor) return;
                if (floor < startFloor) return;
                if (floor > endFloor) {
                  isStop = true;
                  return false;
                }
                data.pid = parseInt($floorHeader.prev(".readlou").prev("a").attr("name"));
                var $user = $floorHeader.prev(".readlou").find(".readidms, .readidm");
                var $userLink = $user.find('a[href^="profile.php?action=show&uid="]');
                data.userName = $userLink.text();
                data.uid = "";
                data.sf = "";
                var userMatches = /profile\.php\?action=show&uid=(\d+)(?:&sf=(\w+))/.exec($userLink.attr("href"));
                if (userMatches) {
                  data.uid = parseInt(userMatches[1]);
                  data.sf = userMatches[2];
                }
                data.smLevel = "";
                var matches = /(\S+) 级神秘/.exec($user.find(".readidmsbottom, .readidmbottom").text());
                if (matches) data.smLevel = matches[1];
                var $buyer = $floor.find('[name="buyers"]:first');
                data.status = 0;
                if ($buyer.length > 0) {
                  var $input = $buyer.next("input");
                  data.status = $input.length > 0 ? 1 : 2;
                  if (data.status === 1) {
                    var matches2 = /此帖售价\s*(\d+)\s*KFB/.exec($buyer.parent("legend").text());
                    if (matches2) data.sell = parseInt(matches2[1]);
                    matches2 = /location\.href="(.+)"/i.exec($input.attr("onclick"));
                    if (matches2) data.buyUrl = matches2[1];
                  }
                }
                floorList[floor] = data;
              });
              var $countdown = $(".pd_countdown:last");
              $countdown.text(parseInt($countdown.text()) - 1);
              isStop = isStop || $countdown.closest(".pd_msg").data("stop");
            },
            error: function error() {
              setTimeout(function () {
                return _stat(page);
              }, Const_default.defAjaxInterval);
            },
            complete: function complete() {
              if (isStop || page >= endPage) {
                _destroy();
                _showStatFloorDialog(floorList);
              } else {
                setTimeout(function () {
                  return _stat(page + 1);
                }, Const_default.defAjaxInterval);
              }
            }
          });
        };
        _stat(startPage);
      };
      _showStatFloorDialog = function _showStatFloorDialog(floorList) {
        var dialogName2 = "pdStatFloorDialog";
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <div id=\"pdStatFloorFilter\" style=\"margin-top: 5px;\">\n    <label><input name=\"removeRepeatedEnabled\" type=\"checkbox\"> \u53BB\u9664\u91CD\u590D</label>\n    <label><input name=\"removeTopFloorEnabled\" type=\"checkbox\"> \u53BB\u9664\u697C\u4E3B</label>\n  </div>\n  <div id=\"pdStatFloorSelectBtns\">\n    <label style=\"margin-left: 3px;\">\u552E\u4EF7\u533A\u95F4\uFF1A</label>\n    <input name=\"startSell\" type=\"number\" value=\"1\" min=\"1\" max=\"100\" style=\"width: 40px;\"> -\n    <input name=\"endSell\" type=\"number\" value=\"100\" min=\"1\" max=\"100\" style=\"width: 40px;\">\n    <label style=\"margin-left: 3px;\">\n      \u6BCF\u540D\u7528\u6237\u9650\u9009 <input name=\"limitNum\" type=\"number\" min=\"0\" style=\"width: 32px;\"> \u4E2A\n    </label>\n    <a class=\"pd_btn_link\" data-name=\"selectFilter\" href=\"#\">\u7B5B\u9009</a><br>\n    <a class=\"pd_btn_link\" data-name=\"selectAll\" href=\"#\">\u5168\u9009</a>\n    <a class=\"pd_btn_link\" data-name=\"selectInverse\" href=\"#\">\u53CD\u9009</a>\n  </div>\n  <div class=\"pd_highlight\" style=\"text-align: center;\">\n    \u5171\u663E\u793A<b id=\"pdStatFloorShowCount\">0</b>\u6761\u9879\u76EE\uFF0C\u5171\u9009\u62E9<b id=\"pdStatFloorSelectCount\">0</b>\u6761\u9879\u76EE\n  </div>\n  <table style=\"line-height: 1.8em; text-align: center;\">\n    <thead>\n      <tr>\n        <th style=\"width: 30px;\"></th>\n        <th style=\"width: 65px;\">\u697C\u5C42\u53F7</th>\n        <th style=\"width: 120px;\">\u7528\u6237\u540D</th>\n        <th style=\"width: 80px;\">\u795E\u79D8\u7B49\u7EA7</th>\n        <th style=\"width: 100px;\">\n          \u552E\u4EF7(KFB) <span class=\"pd_cfg_tips\" title=\"\u6CE8\uFF1A\u552E\u4EF7\u4FE1\u606F\u5728\u7EDF\u8BA1\u540E\u53EF\u80FD\u4F1A\u53D1\u751F\u53D8\u5316\uFF0C\u5982\u6709\u5FC5\u8981\uFF0C\u5EFA\u8BAE\u5C3D\u5FEB\u8D2D\u4E70\u5E16\u5B50\">[?]</span>\n        </th>\n      </tr>\n    </thead>\n    <tbody id=\"pdStatFloorList\"></tbody>\n  </table>\n  <textarea name=\"statFloorListContent\" style=\"margin-top: 8px; width: 250px; height: 300px;\" hidden></textarea>\n</div>\n\n<div class=\"pd_cfg_btns\">\n  <button name=\"copyList\" type=\"button\" style=\"color: #00f;\" title=\"\u590D\u5236\u6240\u6709\u6216\u6240\u9009\u697C\u5C42\u7684\u7528\u6237\u540D\u5355\">\u590D\u5236\u540D\u5355</button>\n  <button name=\"buyThread\" type=\"button\" style=\"color: #f00;\" title=\"\u6279\u91CF\u8D2D\u4E70\u6240\u9009\u697C\u5C42\u7684\u5E16\u5B50\">\u8D2D\u4E70\u5E16\u5B50</button>\n  <button data-action=\"close\" type=\"button\">\u5173\u95ED</button>\n</div>";
        var $dialog2 = _create(dialogName2, "\u7EDF\u8BA1\u697C\u5C42", html2);
        var $statFloorFilter = $dialog2.find("#pdStatFloorFilter");
        var $statFloorList = $dialog2.find("#pdStatFloorList");
        var $statFloorListContent = $dialog2.find('[name="statFloorListContent"]');
        var tid = _getUrlParam("tid");
        var sf = _getThreadSfParam();
        var showStatFloorList = function showStatFloorList() {
          var list = _toConsumableArray(floorList);
          var isRemoveRepeated = $statFloorFilter.find('[name="removeRepeatedEnabled"]').prop("checked"),
            isRemoveTopFloor = $statFloorFilter.find('[name="removeTopFloorEnabled"]').prop("checked");
          if (isRemoveRepeated) {
            list = list.map(function (data, index, list2) {
              if (!data) return null;else return list2.findIndex(function (data2) {
                return data2 && data2.userName === data.userName;
              }) === index ? data : null;
            });
          }
          if (isRemoveTopFloor) {
            var $topFloor = $(".readtext:first");
            if ($topFloor.prev(".readlou").prev("a").attr("name") === "tpc") {
              var topFloorUserName = $topFloor.find(".readidmsbottom, .readidmbottom").find('a[href^="profile.php?action=show&uid="]').text();
              list = list.map(function (data) {
                return data && data.userName !== topFloorUserName ? data : null;
              });
            }
          }
          var content = "",
            copyContent = "";
          var num2 = 0;
          var _iterator0 = _createForOfIteratorHelper(list.entries()),
            _step0;
          try {
            for (_iterator0.s(); !(_step0 = _iterator0.n()).done;) {
              var _step0$value = _slicedToArray(_step0.value, 2),
                floor = _step0$value[0],
                data = _step0$value[1];
              if (!data) continue;
              content += "\n<tr>\n  <td>\n    <label>\n      <input data-status=\"".concat(data.status, "\" data-sell=\"").concat(data.sell ? data.sell : 0, "\" data-url=\"").concat(data.buyUrl ? data.buyUrl : "", "\"\n        type=\"checkbox\" value=\"").concat(data.userName, "\">\n    </label>\n  </td>\n  <td><a href=\"read.php?tid=").concat(tid, "&spid=").concat(data.pid).concat(sf ? "&sf=" + sf : "", "\" target=\"_blank\">").concat(floor, "\u697C</a></td>\n  <td><a href=\"profile.php?action=show&uid=").concat(data.uid, "&sf=").concat(data.sf, "\" target=\"_blank\" style=\"color: #000;\">").concat(data.userName, "</a></td>\n  <td style=\"").concat(data.smLevel.endsWith("W") || data.smLevel === "MAX" ? "color: #f39;" : "", "\">").concat(data.smLevel, "</td>\n  <td class=\"pd_stat\">").concat(data.status === 1 ? "<em>".concat(data.sell, "</em>") : "<span class=\"pd_notice\">".concat(!data.status ? "\u65E0" : "\u5DF2\u4E70", "</span>"), "</td>\n</tr>");
              copyContent += data.userName + "\n";
              num2++;
            }
          } catch (err) {
            _iterator0.e(err);
          } finally {
            _iterator0.f();
          }
          $statFloorList.html(content);
          $statFloorListContent.val(copyContent).data("copy-text", copyContent);
          $dialog2.find("#pdStatFloorShowCount").text(num2);
          $dialog2.find("#pdStatFloorSelectCount").text(0);
        };
        $dialog2.find("#pdStatFloorSelectBtns").on("click", "[data-name]", function (e) {
          e.preventDefault();
          var name4 = $(this).data("name");
          if (name4 === "selectAll") _selectAll($statFloorList.find('[type="checkbox"]'));else if (name4 === "selectInverse") _selectInverse($statFloorList.find('[type="checkbox"]'));else if (name4 === "selectFilter") {
            var startSell = parseInt($dialog2.find('[name="startSell"]').val());
            var endSell = parseInt($dialog2.find('[name="endSell"]').val());
            var limitNum = parseInt($dialog2.find('[name="limitNum"]').val());
            if (!limitNum || limitNum < 0) limitNum = 0;
            if (!startSell || startSell < 1 || !endSell || endSell < 1) return;
            var userStat = {};
            $statFloorList.find('[type="checkbox"]').each(function () {
              var $this2 = $(this);
              var status = parseInt($this2.data("status"));
              if (!status) return;
              var sell = parseInt($this2.data("sell"));
              var userName2 = $this2.val();
              if (!(userName2 in userStat)) userStat[userName2] = 0;
              userStat[userName2]++;
              var isChecked = status === 1 && sell >= startSell && sell <= endSell;
              if (isChecked && limitNum > 0) {
                if (userStat[userName2] > limitNum) isChecked = false;
              }
              $this2.prop("checked", isChecked);
            });
          }
          $dialog2.find("#pdStatFloorSelectCount").text($statFloorList.find('[type="checkbox"]:checked').length);
        }).end().find('[name="copyList"]').click(function () {
          var $this2 = $(this);
          if ($this2.text() === "\u53D6\u6D88\u590D\u5236") {
            $this2.text("\u590D\u5236\u540D\u5355");
            $statFloorListContent.prop("hidden", true);
            $statFloorList.closest("table").prop("hidden", false);
            _resize(dialogName2);
            return;
          }
          var type = "all";
          var checked = $statFloorList.find('[type="checkbox"]:checked');
          if (checked.length > 0) {
            type = "select";
            var copyContent = "";
            checked.each(function () {
              copyContent += $(this).val() + "\n";
            });
            $statFloorListContent.val(copyContent).data("copy-text", copyContent);
          }
          if (!_copyText($statFloorListContent, (type === "all" ? "\u6240\u6709" : "\u6240\u9009") + "\u7528\u6237\u540D\u5355\u5DF2\u590D\u5236")) {
            $this2.text("\u53D6\u6D88\u590D\u5236");
            $statFloorList.closest("table").prop("hidden", true);
            $statFloorListContent.prop("hidden", false).select().focus();
            _resize(dialogName2);
          }
        }).end().find('[name="buyThread"]').click(function () {
          var threadList = [];
          var totalSell = 0;
          if (!$statFloorList.find('[type="checkbox"]:checked').length) $dialog2.find('[data-name="selectAll"]').click();
          $statFloorList.find('[type="checkbox"]:checked').each(function () {
            var $this2 = $(this);
            var url = $this2.data("url");
            var sell = parseInt($this2.data("sell"));
            if (url && sell > 0) {
              threadList.push({
                url: url,
                sell: sell
              });
              totalSell += sell;
            }
          });
          if (!threadList.length) return;
          if (!confirm("\u4F60\u5171\u9009\u62E9\u4E86 ".concat(threadList.length, " \u4E2A\u53EF\u8D2D\u4E70\u9879\uFF0C\u603B\u552E\u4EF7 ").concat(totalSell.toLocaleString(), " KFB\uFF0C\u5747\u4EF7 ").concat(_getFixedNumLocStr(totalSell / threadList.length, 2), " KFB\uFF0C\u662F\u5426\u6279\u91CF\u8D2D\u4E70\uFF1F"))) return;
          _destroy();
          _wait("<strong>\u6B63\u5728\u8D2D\u4E70\u5E16\u5B50\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em class=\"pd_countdown\">".concat(threadList.length, "</em></i><a class=\"pd_stop_action\" href=\"#\">\u505C\u6B62\u64CD\u4F5C</a>"));
          _buyThreads(threadList);
        });
        if (_getCurrentThreadPage() !== 1) $statFloorFilter.find('[name="removeTopFloorEnabled"]').prop("disabled", true).parent("label").attr("title", "\u8BF7\u5728\u7B2C1\u9875\u8FDB\u884C\u7EDF\u8BA1");
        $statFloorFilter.on("click", '[type="checkbox"]', showStatFloorList);
        showStatFloorList();
        show2(dialogName2);
        _runFunc("Read.showStatFloorDialog_after_");
      };
      _buyThreads = function _buyThreads(threadList) {
        var successNum = 0,
          failNum = 0,
          totalSell = 0;
        $(document).clearQueue("BuyThread");
        $.each(threadList, function (index, _ref2) {
          var url = _ref2.url,
            sell = _ref2.sell;
          $(document).queue("BuyThread", function () {
            $.ajax({
              type: "GET",
              url: url + "&t=" + $.now(),
              timeout: Const_default.defAjaxTimeout,
              success: function success(html2) {
                _showFormatLog("\u8D2D\u4E70\u5E16\u5B50", html2);
                var _getResponseMsg4 = _getResponseMsg(html2),
                  msg = _getResponseMsg4.msg;
                if (/操作完成/.test(msg)) {
                  successNum++;
                  totalSell += sell;
                } else failNum++;
              },
              error: function error() {
                failNum++;
              },
              complete: function complete() {
                var $countdown = $(".pd_countdown:last");
                $countdown.text(parseInt($countdown.text()) - 1);
                var isStop = $countdown.closest(".pd_msg").data("stop");
                if (isStop) $(document).clearQueue("BuyThread");
                if (isStop || index === threadList.length - 1) {
                  _destroy();
                  if (successNum > 0) {
                    _push("\u8D2D\u4E70\u5E16\u5B50", "\u5171\u6709`".concat(successNum, "`\u4E2A\u5E16\u5B50\u8D2D\u4E70\u6210\u529F"), {
                      pay: {
                        "KFB": -totalSell
                      }
                    });
                  }
                  console.log("\u5171\u6709".concat(successNum, "\u4E2A\u5E16\u5B50\u8D2D\u4E70\u6210\u529F\uFF0C\u5171\u6709").concat(failNum, "\u4E2A\u5E16\u5B50\u8D2D\u4E70\u5931\u8D25\uFF0CKFB-").concat(totalSell));
                  _show("<strong>\u5171\u6709<em>".concat(successNum, "</em>\u4E2A\u5E16\u5B50\u8D2D\u4E70\u6210\u529F").concat(failNum > 0 ? "\uFF0C\u5171\u6709<em>".concat(failNum, "</em>\u4E2A\u5E16\u5B50\u8D2D\u4E70\u5931\u8D25") : "", "</strong><i>KFB<ins>-").concat(totalSell, "</ins></i>"), -1);
                  _runFunc("Read.buyThreads_after_", threadList);
                } else {
                  setTimeout(function () {
                    return $(document).dequeue("BuyThread");
                  }, Const_default.defAjaxInterval);
                }
              }
            });
          });
        });
        $(document).dequeue("BuyThread");
      };
      _handleBuyThreadBtn = function _handleBuyThreadBtn() {
        $(".readtext input[type=\"button\"][value=\"\u613F\u610F\u8D2D\u4E70,\u652F\u4ED8KFB\"]").each(function () {
          var $this2 = $(this);
          var matches = /此帖售价\s*(\d+)\s*KFB/.exec($this2.closest("legend").contents().eq(0).text());
          if (!matches) return;
          var sell = parseInt(matches[1]);
          matches = /location\.href="(.+?)"/i.exec($this2.attr("onclick"));
          if (!matches) return;
          $this2.data("sell", sell).data("url", matches[1]).removeAttr("onclick").click(function (e) {
            e.preventDefault();
            var $this3 = $(this);
            var sell2 = $this3.data("sell");
            var url = $this3.data("url");
            if (!sell2 || !url) return;
            if (sell2 >= Const_default.minBuyThreadWarningSell && !confirm("\u6B64\u8D34\u552E\u4EF7 ".concat(sell2, " KFB\uFF0C\u662F\u5426\u8D2D\u4E70\uFF1F"))) return;
            if (Config.buyThreadNoJumpEnabled) {
              var $wait = _wait("<strong>\u6B63\u5728\u8D2D\u4E70\u5E16\u5B50&hellip;</strong>");
              $.get(url + "&t=" + $.now(), function (html2) {
                _showFormatLog("\u8D2D\u4E70\u5E16\u5B50", html2);
                var _getResponseMsg5 = _getResponseMsg(html2),
                  msg = _getResponseMsg5.msg;
                _remove($wait);
                if (/操作完成/.test(msg)) {
                  if (Config.saveBuyThreadLogEnabled) {
                    var urlMatches = /tid=(\d+)&pid=(\d+|tpc)/.exec(url);
                    if (!urlMatches) return;
                    var fid2 = parseInt($('input[name="fid"]:first').val());
                    var tid = parseInt(urlMatches[1]);
                    var pid = urlMatches[2];
                    var forumName = $('a[href^="kf_tidfavor.php?action=favor"]').parent().find('a[href^="thread.php?fid="]:last').text().trim();
                    var threadTitle = _getThreadTitle();
                    var userName2 = $this3.closest(".readtext").find(".readidmsbottom, .readidmbottom").find('a[href^="profile.php?action=show"]').text().trim();
                    _recordBuyThreadLog({
                      fid: fid2,
                      tid: tid,
                      pid: pid,
                      forumName: forumName,
                      threadTitle: threadTitle,
                      userName: userName2,
                      sell: sell2
                    });
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
      _getMultiQuoteData = function _getMultiQuoteData() {
        var quoteList = [];
        $(".pd_multi_quote_chk input:checked").each(function () {
          var $floor = $(this).closest(".readtext");
          var matches = /(\d+)楼/.exec($floor.find(".pd_goto_link").text());
          var floor = matches ? parseInt(matches[1]) : 0;
          var pid = $floor.prev(".readlou").prev("a").attr("name");
          var userName2 = _getFloorUserName($floor.find('.readidmsbottom > a[href^="profile.php?action=show&uid="]').text());
          if (!userName2) return;
          quoteList.push({
            floor: floor,
            pid: pid,
            userName: userName2
          });
        });
        return quoteList;
      };
      _addMultiQuoteButton = function _addMultiQuoteButton() {
        var replyUrl = $('a[href^="post.php?action=reply"].b_tit2').attr("href");
        if (!replyUrl) return;
        $("<label title=\"\u591A\u91CD\u5F15\u7528\" class=\"pd_multi_quote_chk\"><input type=\"checkbox\"> \u5F15</label>").appendTo(".readtext > table > tbody > tr > td:nth-child(2) > div > div:nth-child(2)").find("input").click(function () {
          var tid = parseInt(_getUrlParam("tid"));
          var data = localStorage[Const_default.multiQuoteStorageName];
          if (data) {
            try {
              data = JSON.parse(data);
              if (!data || $.type(data) !== "object" || $.isEmptyObject(data)) data = null;else if (typeof data.tid === "undefined" || data.tid !== tid || !Array.isArray(data.quoteList)) data = null;
            } catch (ex) {
              data = null;
            }
          } else {
            data = null;
          }
          var quoteList = _getMultiQuoteData();
          if (!data) {
            localStorage.removeItem(Const_default.multiQuoteStorageName);
            data = {
              tid: tid,
              quoteList: []
            };
          }
          var page = _getCurrentThreadPage();
          if (quoteList.length > 0) data.quoteList[page] = quoteList;else delete data.quoteList[page];
          localStorage[Const_default.multiQuoteStorageName] = JSON.stringify(data);
        });
        $(".readtext:last").next(".c").next("div").find("> table > tbody > tr > td:last-child").css({
          "text-align": "right",
          "width": "320px"
        }).append("<span class=\"b_tit2\" style=\"margin-left: 5px;\"><a style=\"display: inline-block;\" href=\"#\" title=\"\u591A\u91CD\u56DE\u590D\">\u56DE\u590D</a> <a style=\"display: inline-block;\" href=\"".concat(replyUrl, "&multiquote=1\" title=\"\u591A\u91CD\u5F15\u7528\">\u5F15\u7528</a></span>")).find(".b_tit2 > a:eq(0)").click(function (e) {
          e.preventDefault();
          _handleMultiQuote(1);
        });
      };
      _modifyKFOtherDomainLink = function _modifyKFOtherDomainLink() {
        $(".readtext a, .thread2 a").each(function () {
          var $this2 = $(this);
          var url = $this2.attr("href");
          if (/m\.miaola\.(info|work)\//i.test(url)) return;
          var matches = /^(https?:\/\/(?:[\w\.]+?\.)?(?:2dgal|ddgal|9gal|9baka|9moe|kfgal|2dkf|ikfol|kfacg|fygal|bakabbs|365gal|365galgame|kforz|kfmax|9shenmi|kfpromax|miaola|koyuki)\.\w+?\/)\w+\.php/i.exec(url);
          if (matches) $this2.attr("href", url.replace(matches[1], _getHostNameUrl()));
        });
      };
      _addUserMemo = function _addUserMemo() {
        if ($.isEmptyObject(Config.userMemoList)) return;
        $('.readidmsbottom > a[href^="profile.php?action=show&uid="]').each(function () {
          var $this2 = $(this);
          var userName2 = _getFloorUserName($this2.text().trim());
          var key = Object.keys(Config.userMemoList).find(function (name4) {
            return name4 === userName2;
          });
          if (!key) return;
          var memo = Config.userMemoList[key];
          $this2.after("<span class=\"pd_custom_tips pd_user_memo\" title=\"\u5907\u6CE8\uFF1A".concat(memo, "\">[?]</span>"));
        });
      };
      _addCopyCodeLink = function _addCopyCodeLink() {
        $('.readtext fieldset > legend:contains("Copy code")').html("<a class=\"pd_copy_code\" href=\"#\">\u590D\u5236\u4EE3\u7801</a>").parent("fieldset").addClass("pd_code_area");
        if (!$(".pd_copy_code").length) return;
        $("#alldiv").on("click", "a.pd_copy_code", function (e) {
          e.preventDefault();
          var $this2 = $(this);
          var $fieldset = $this2.closest("fieldset");
          if (_copyText($fieldset, "\u4EE3\u7801\u5DF2\u590D\u5236", $this2.parent())) return;
          var content = $fieldset.data("content");
          if (content) {
            $fieldset.html("<legend><a class=\"pd_copy_code\" href=\"#\">\u590D\u5236\u4EE3\u7801</a></legend>" + content).removeData("content");
          } else {
            var html2 = $fieldset.html();
            html2 = html2.replace(/<legend>.+?<\/legend>/i, "");
            $fieldset.data("content", html2);
            html2 = _htmlDecode(html2);
            var height = $fieldset.height();
            height -= 17;
            if (height < 50) height = 50;
            if (height > 540) height = 540;
            $fieldset.html("\n<legend><a class=\"pd_copy_code\" href=\"#\">\u8FD8\u539F\u4EE3\u7801</a></legend>\n<textarea wrap=\"off\" class=\"pd_textarea\" style=\"width: 100%; height: ".concat(height, "px; line-height: 1.4em; white-space: pre;\">").concat(html2, "</textarea>\n"));
            $fieldset.find("textarea").select().focus();
          }
        });
      };
      _addMoreSmileLink = function _addMoreSmileLink() {
        var addSmileCode = function addSmileCode(id) {
          var textArea = $('textarea[name="atc_content"]').get(0);
          if (!textArea) return;
          var code = "[s:".concat(id, "]");
          _addCode(textArea, code);
          if (Info_default.isMobile) textArea.blur();else textArea.focus();
        };
        var $area = $('form[action="post.php?"] > div:first > table > tbody > tr:nth-child(2) > td:first-child');
        $area.on("click", 'a[href="javascript:;"]', function (e) {
          e.preventDefault();
          var id = $(this).data("id");
          if (id) addSmileCode(id);
        }).find('a[onclick^="javascript:addsmile"]').each(function () {
          var $this2 = $(this);
          var matches = /addsmile\((\d+)\)/i.exec($this2.attr("onclick"));
          if (matches) {
            $this2.data("id", matches[1]).removeAttr("onclick").attr("href", "javascript:;");
          }
        });
        $("<a class=\"pd_highlight\" href=\"#\">[\u66F4\u591A]</a>").appendTo($area).click(function (e) {
          e.preventDefault();
          var $this2 = $(this);
          var $panel = $("#pdSmilePanel");
          if ($panel.length > 0) {
            $this2.text("[\u66F4\u591A]");
            $panel.remove();
            return;
          }
          $this2.text("[\u5173\u95ED]");
          var smileImageIdList = ["48", "35", "34", "33", "32", "31", "30", "29", "28", "27", "26", "36", "37", "47", "46", "45", "44", "43", "42", "41", "40", "39", "38", "25", "24", "11", "10", "09", "08", "01", "02", "03", "04", "05", "06", "12", "13", "23", "22", "21", "20", "19", "18", "17", "16", "15", "14", "07"];
          var smileCodeIdList = [57, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 45, 46, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 34, 33, 20, 19, 18, 17, 10, 11, 12, 13, 14, 15, 21, 22, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 16];
          var html2 = "";
          for (var i = 0; i < smileImageIdList.length; i++) {
            html2 += "<img src=\"".concat(Info_default.w.imgpath, "/post/smile/em/em").concat(smileImageIdList[i], ".gif\" alt=\"[\u8868\u60C5]\" data-id=\"").concat(smileCodeIdList[i], "\">");
          }
          html2 = "<div class=\"pd_panel\" id=\"pdSmilePanel\" style=\"width: 308px; height: 185px;\">".concat(html2, "</div>");
          var offset = $area.offset();
          $panel = $(html2).appendTo("body");
          $panel.css("top", offset.top - $panel.height() + 10).css("left", offset.left + $area.width() - $panel.width() - 10).on("click", "img", function () {
            var id = $(this).data("id");
            if (id) addSmileCode(id);
          });
          _runFunc("Read.addMoreSmileLink_after_click_");
        });
      };
      _parseMediaTag = function _parseMediaTag() {
        $(".readtext > table > tbody > tr > td:nth-child(2)").each(function () {
          var $this2 = $(this);
          var html2 = $this2.html();
          if (/\[(audio|video)\](http|ftp)[^<>]+\[\/(audio|video)\]/.test(html2)) {
            $this2.html(html2.replace(/\[audio\]((?:http|ftp)[^<>]+?)\[\/audio\](?!<\/fieldset>)/g, "<audio src=\"$1\" controls preload=\"none\" style=\"margin: 3px 0;\">[\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301audio\u6807\u7B7E]</audio>").replace(/\[video\]((?:http|ftp)[^<>]+?)\[\/video\](?!<\/fieldset>)/g, "<video src=\"$1\" controls preload=\"none\" style=\"max-width: ".concat(Config.adjustThreadContentWidthEnabled ? 627 : 820, "px; margin:3px 0;\">[\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301video\u6807\u7B7E]</video>")));
          }
        });
      };
      _showAttachImageOutsideSellBox = function _showAttachImageOutsideSellBox() {
        if (_getCurrentThreadPage() !== 1) return;
        var $area = $(".readtext:first > table > tbody > tr > td:nth-child(2)");
        if (!$area.find('select[name="buyers"]').length) return;
        var html2 = $area.html();
        if (/\[attachment=\d+\]/.test(html2)) {
          var pid = $area.closest(".readtext").prev(".readlou").prev(".readlou").prev("a").attr("name");
          var tid = _getUrlParam("tid");
          $area.html(html2.replace(/\[attachment=(\d+)\]/g, "<img src=\"job.php?action=download&pid=".concat(pid, "&tid=").concat(tid, "&aid=$1\" alt=\"[\u9644\u4EF6\u56FE\u7247]\" style=\"max-width: 550px;\" onclick=\"if(this.width>=550) window.open('job.php?action=download&pid=").concat(pid, "&tid=").concat(tid, "&aid=$1');\">")));
        }
      };
      _getThreadTitle = function _getThreadTitle() {
        return $('form[name="delatc"] > div:first > table > tbody > tr > td > span:first').text().trim();
      };
      buyThreadLogName = Const_default.storagePrefix + "buyThreadLog";
      _readBuyThreadLog = function _readBuyThreadLog() {
        var log2 = [];
        var options = _readData(buyThreadLogName + "_" + Info_default.uid);
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
      _writeBuyThreadLog = function _writeBuyThreadLog(log2) {
        return _writeData(buyThreadLogName + "_" + Info_default.uid, JSON.stringify(log2));
      };
      _clearBuyThreadLog = function _clearBuyThreadLog() {
        return _deleteData(buyThreadLogName + "_" + Info_default.uid);
      };
      _recordBuyThreadLog = function _recordBuyThreadLog(_ref3) {
        var fid2 = _ref3.fid,
          tid = _ref3.tid,
          pid = _ref3.pid,
          forumName = _ref3.forumName,
          threadTitle = _ref3.threadTitle,
          userName2 = _ref3.userName,
          sell = _ref3.sell;
        var log2 = _readBuyThreadLog();
        log2.push($.extend({
          time: $.now()
        }, {
          fid: fid2,
          tid: tid,
          pid: pid,
          forumName: forumName,
          threadTitle: threadTitle,
          userName: userName2,
          sell: sell
        }));
        log2 = log2.sort(function (a, b) {
          return a.time - b.time;
        }).slice(-Config.saveBuyThreadLogMaxNum);
        _writeBuyThreadLog(log2);
      };
      _showBuyThreadLogDialog = function _showBuyThreadLogDialog() {
        var dialogName2 = "pdBuyThreadLogDialog";
        if ($("#" + dialogName2).length > 0) return;
        var log2 = _readBuyThreadLog();
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <div style=\"margin-top: 5px;\">\n    <label>\n      \u4FDD\u5B58\u6700\u8FD1\u7684 <input name=\"saveBuyThreadLogMaxNum\" type=\"number\" value=\"".concat(Config.saveBuyThreadLogMaxNum, "\" min=\"1\" max=\"10000\" style=\"width: 60px;\"> \u6761\u8BB0\u5F55\n    </label>\n    <a class=\"pd_btn_link\" data-name=\"save\" href=\"#\">\u4FDD\u5B58</a>\n  </div>\n  <fieldset>\n    <legend>\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55 <span class=\"pd_stat\" data-name=\"logHeaderInfo\"></span></legend>\n    <div class=\"pd_stat pd_log_content\" id=\"pdBuyThreadLog\" style=\"width: 900px; max-height: 450px; height: auto;\"></div>\n  </fieldset>\n</div>\n<div class=\"pd_cfg_btns\">\n  <span class=\"pd_cfg_about\"><a data-name=\"openImOrExBuyThreadLogDialog\" href=\"#\">\u5BFC\u5165/\u5BFC\u51FA\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55</a></span>\n  <button data-action=\"close\" type=\"button\">\u5173\u95ED</button>\n  <button name=\"clear\" type=\"button\">\u6E05\u9664\u8BB0\u5F55</button>\n</div>");
        var $dialog2 = _create(dialogName2, "\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55", html2);
        var $buyThreadLog = $dialog2.find("#pdBuyThreadLog");
        $dialog2.find('[data-name="save"]').click(function (e) {
          e.preventDefault();
          var num2 = parseInt($dialog2.find('[name="saveBuyThreadLogMaxNum"]').val());
          if (!num2 || num2 > 1e4 || num2 < 0) {
            alert("\u6570\u91CF\u53D6\u503C\u8303\u56F4\uFF1A1-10000");
            return;
          }
          read3();
          Config.saveBuyThreadLogMaxNum = num2;
          write3();
          alert("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58");
        }).end().find('[data-name="openImOrExBuyThreadLogDialog"]').click(function (e) {
          e.preventDefault();
          _showCommonImportOrExportConfigDialog("\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55", {
            read: _readBuyThreadLog,
            write: _writeBuyThreadLog
          });
        }).end().find('[name="clear"]').click(function () {
          if (confirm("\u662F\u5426\u6E05\u9664\u6240\u6709\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55\uFF1F")) {
            _clearBuyThreadLog();
            alert("\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55\u5DF2\u6E05\u9664");
          }
        });
        var logInfo = {};
        var _iterator1 = _createForOfIteratorHelper(log2),
          _step1;
        try {
          for (_iterator1.s(); !(_step1 = _iterator1.n()).done;) {
            var info = _step1.value;
            var date = _getDateString(new Date(info.time));
            if (!(date in logInfo)) logInfo[date] = [];
            logInfo[date].push(info);
          }
        } catch (err) {
          _iterator1.e(err);
        } finally {
          _iterator1.f();
        }
        var totalSell = 0;
        var logHtml = "";
        var _iterator10 = _createForOfIteratorHelper(Object.keys(logInfo).sort(function (a, b) {
            return a > b ? 1 : -1;
          })),
          _step10;
        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var _date = _step10.value;
            var currentDateHtml = "";
            var currentDateTotalSell = 0;
            var _iterator11 = _createForOfIteratorHelper(logInfo[_date]),
              _step11;
            try {
              for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                var _step11$value = _step11.value,
                  time = _step11$value.time,
                  fid2 = _step11$value.fid,
                  tid = _step11$value.tid,
                  pid = _step11$value.pid,
                  forumName = _step11$value.forumName,
                  threadTitle = _step11$value.threadTitle,
                  userName2 = _step11$value.userName,
                  sell = _step11$value.sell;
                totalSell += sell;
                currentDateTotalSell += sell;
                currentDateHtml += "\n<p>\n  <b>".concat(_getTimeString(new Date(time)), "\uFF1A</b>[<a href=\"thread.php?fid=").concat(fid2, "\" target=\"_blank\">").concat(forumName, "</a>]\n  \u300A<a href=\"read.php?tid=").concat(tid).concat(pid === "tpc" ? "" : "&spid=" + pid, "\" target=\"_blank\">").concat(threadTitle, "</a>\u300B\n  &nbsp;\u53D1\u5E16\u8005\uFF1A<a class=\"").concat(!Config.adminMemberEnabled ? "pd_not_click_link" : "", "\" href=\"profile.php?action=show&username=").concat(userName2, "\" target=\"_blank\">").concat(userName2, "</a>\n  &nbsp;\u552E\u4EF7\uFF1A<em>").concat(sell, "</em>KFB\n</p>");
              }
            } catch (err) {
              _iterator11.e(err);
            } finally {
              _iterator11.f();
            }
            logHtml += "<h3>\u3010".concat(_date, "\u3011 (\u5171<em>").concat(logInfo[_date].length, "</em>\u9879\uFF0C\u5408\u8BA1<em>").concat(currentDateTotalSell.toLocaleString(), "</em>KFB)</h3>").concat(currentDateHtml);
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }
        $buyThreadLog.html(logHtml ? logHtml : "\u6682\u65E0\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55\uFF08\u9700\u5F00\u542F\u201C\u4FDD\u5B58\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55\u201D\u7684\u529F\u80FD\uFF09");
        $dialog2.find('[data-name="logHeaderInfo"]').html("(\u5171<em>".concat(log2.length, "</em>\u9879\uFF0C\u603B\u552E\u4EF7<em>").concat(totalSell.toLocaleString(), "</em>KFB)"));
        show2(dialogName2);
        var $lastChild = $buyThreadLog.find("p:last");
        if ($lastChild.length > 0) {
          $lastChild.get(0).scrollIntoView();
        }
        _runFunc("Read.showBuyThreadLogDialog_after_");
      };
      _addSignTips = function _addSignTips() {
        $(".readtext > table > tbody > tr > td:nth-child(2) > div > div:nth-child(2) > span:nth-child(3)").each(function () {
          var $this2 = $(this);
          $this2.attr("title", $this2.text()).addClass("pd_custom_tips");
        });
      };
      _replaceReadImage = function _replaceReadImage() {
        $(".readtext span.k_f18").each(function () {
          var $this2 = $(this);
          var $parent = $this2.parent("a");
          var imgUrl = $parent.attr("href");
          if (imgUrl) {
            $parent.html("<img class=\"pd_kf18\" alt=\"[\u56FE\u7247]\" src=\"".concat(imgUrl, "\" />"));
          }
        });
      };
    }
  });

  // src/module/Bank.js
  var Bank_exports = {};
  __export(Bank_exports, {
    handleBankPage: function handleBankPage() {
      return _handleBankPage;
    },
    setNodeValue: function setNodeValue() {
      return _setNodeValue;
    }
  });
  var minTransferNum, maxTransferNum, _handleBankPage, _setNodeValue, batchTransfer, batchTransferVerify, addBatchTransferButton;
  var init_Bank = __esm({
    "src/module/Bank.js": function src_module_BankJs() {
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
      _handleBankPage = function _handleBankPage() {
        var $account = $(".bank1 > tbody > tr:nth-child(2) > td:contains(\"\u4F60\u6240\u62E5\u6709\u7684\u8D21\u732E\uFF1A\")");
        if (!$account.length) return;
        var html2 = $account.html();
        $account.html(html2.replace(/你所拥有的贡献：(-?\d+(?:\.\d+)?)/, function (m, num2) {
          return "\u4F60\u6240\u62E5\u6709\u7684\u8D21\u732E\uFF1A<b id=\"pdGongXian\" data-num=\"".concat(num2, "\">").concat(parseFloat(num2).toLocaleString(), "</b>");
        }));
        var matches = /注意你转账的是贡献，最小\[(\d+(?:\.\d+)?)\]，最大\[(\d+(?:\.\d+)?)\]/.exec(html2);
        if (matches) {
          minTransferNum = parseFloat(matches[1]);
          maxTransferNum = parseFloat(matches[2]);
        }
        $(document).on("change", 'input[name="to_money"]', function () {
          var $this2 = $(this);
          var num2 = parseFloat($this2.val());
          if (isNaN(num2) || num2 < minTransferNum || num2 > maxTransferNum) {
            alert("\u8F6C\u8D26\u6570\u989D\u7684\u6700\u5C0F\u503C\u4E3A[".concat(minTransferNum, "]\uFF0C\u6700\u5927\u503C\u4E3A[").concat(maxTransferNum, "]\uFF0C\u8D85\u8FC7\u6700\u5927\u503C\u8BF7\u5206\u591A\u6B21\u8F6C\u8D26"));
          }
        });
        addBatchTransferButton();
      };
      _setNodeValue = function _setNodeValue($node, value) {
        if (!$node.length) return;
        var num2 = 0;
        if (!$.isNumeric(value)) {
          var matches = /(\+|-)=(\d+(?:\.\d+)?)/.exec(value);
          if (!matches) return;
          var diff = parseFloat(matches[2]);
          var oldNum = parseFloat($node.data("num"));
          oldNum = oldNum ? oldNum : 0;
          num2 = value.startsWith("+") ? oldNum + diff : oldNum - diff;
        } else {
          num2 = parseFloat(value);
        }
        $node.text(num2.toLocaleString()).data("num", num2);
      };
      batchTransfer = function batchTransfer(users, msg) {
        var successNum = 0,
          failNum = 0,
          successMoney = 0;
        $.each(users, function (index, _ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
            userName2 = _ref5[0],
            money = _ref5[1];
          $(document).queue("Bank", function () {
            $.ajax({
              type: "POST",
              url: "hack.php?H_name=bank",
              timeout: Const_default.defAjaxTimeout,
              data: "&action=virement&pwuser=".concat(_getGBKEncodeString(userName2), "&to_money=").concat(money, "&memo=").concat(_getGBKEncodeString(msg)),
              success: function success(html2) {
                _showFormatLog("\u6279\u91CF\u8F6C\u8D26", html2);
                var _getResponseMsg6 = _getResponseMsg(html2),
                  msg2 = _getResponseMsg6.msg;
                var msgHtml = "".concat(userName2, " <em>+").concat(money.toLocaleString(), "</em>");
                if (/完成转帐!/.test(msg2)) {
                  successNum++;
                  successMoney += money;
                } else {
                  failNum++;
                  if (/用户<b>.+?<\/b>不存在/.test(msg2)) msg2 = "\u7528\u6237\u4E0D\u5B58\u5728";
                  msgHtml += " <span class=\"pd_notice\">(\u9519\u8BEF\uFF1A".concat(msg2, ")</span>");
                }
                $(".pd_result:last").append("<li>".concat(msgHtml, "</li>"));
              },
              error: function error() {
                failNum++;
                $(".pd_result:last").append("\n<li>\n  ".concat(userName2, ":").concat(money.toLocaleString(), "\n  <span class=\"pd_notice\">(\u9519\u8BEF\uFF1A\u8FDE\u63A5\u8D85\u65F6\uFF0C\u8F6C\u8D26\u7ED3\u679C\u672A\u77E5\uFF0C\u8BF7\u5230<a target=\"_blank\" href=\"hack.php?H_name=bank&action=log\">\u94F6\u884C\u65E5\u5FD7</a>\u91CC\u8FDB\u884C\u786E\u8BA4)</span>\n</li>\n"));
              },
              complete: function complete() {
                var $countdown = $(".pd_countdown:last");
                $countdown.text(parseInt($countdown.text()) - 1);
                var isStop = $countdown.closest(".pd_msg").data("stop");
                if (isStop) $(document).clearQueue("Bank");
                if (isStop || index === users.length - 1) {
                  _destroy();
                  if (successNum > 0) _push("\u6279\u91CF\u8F6C\u8D26", "\u5171\u6709`".concat(successNum, "`\u6B21\u8F6C\u8D26\u6210\u529F"), {
                    pay: {
                      "\u8D21\u732E": -successMoney
                    }
                  });
                  _setNodeValue($("#pdGongXian"), "-=" + successMoney);
                  console.log("\u5171\u6709".concat(successNum, "\u6B21\u8F6C\u8D26\u6210\u529F\uFF0C\u5171\u6709").concat(failNum, "\u6B21\u8F6C\u8D26\u5931\u8D25\uFF0C\u8D21\u732E-").concat(successMoney));
                  $(".pd_result:last").append("<li><b>\u5171\u6709<em>".concat(successNum, "</em>\u6B21\u8F6C\u8D26\u6210\u529F").concat(failNum > 0 ? "\uFF0C\u5171\u6709<em>".concat(failNum, "</em>\u6B21\u8F6C\u8D26\u5931\u8D25") : "", "\uFF1A</b>\u8D21\u732E <ins>-").concat(successMoney.toLocaleString(), "</ins></li>"));
                  _show("<strong>\u5171\u6709<em>".concat(successNum, "</em>\u6B21\u8F6C\u8D26\u6210\u529F").concat(failNum > 0 ? "\uFF0C\u5171\u6709<em>".concat(failNum, "</em>\u6B21\u8F6C\u8D26\u5931\u8D25") : "", "</strong><i>\u8D21\u732E<ins>-").concat(successMoney.toLocaleString(), "</ins></i>"), -1);
                } else {
                  setTimeout(function () {
                    return $(document).dequeue("Bank");
                  }, Const_default.bankActionInterval);
                }
              }
            });
          });
        });
        $(document).dequeue("Bank");
      };
      batchTransferVerify = function batchTransferVerify($transfer) {
        var $bankUsers = $transfer.find('[name="users"]');
        var users = $bankUsers.val();
        if (!/^\s*\S+\s*$/m.test(users) || /^\s*:/m.test(users) || /:/.test(users) && /:(\D|$)/m.test(users)) {
          alert("\u7528\u6237\u5217\u8868\u683C\u5F0F\u4E0D\u6B63\u786E");
          $bankUsers.select().focus();
          return false;
        }
        if (/^\s*\S+?:0*(\.0\d+)?\s*$/m.test(users)) {
          alert("\u8F6C\u5E10\u6570\u989D\u4E0D\u80FD\u5C0F\u4E8E[".concat(minTransferNum, "]\u8D21\u732E"));
          $bankUsers.select().focus();
          return false;
        }
        var $bankMoney = $transfer.find('[name="transfer_money"]');
        var money = parseFloat($bankMoney.val());
        if (/^\s*[^:]+\s*$/m.test(users)) {
          if (!$.isNumeric(money)) {
            alert("\u901A\u7528\u8F6C\u8D26\u6570\u989D\u683C\u5F0F\u4E0D\u6B63\u786E");
            $bankMoney.select().focus();
            return false;
          } else if (money < minTransferNum) {
            alert("\u8F6C\u5E10\u6570\u989D\u4E0D\u80FD\u5C0F\u4E8E".concat(minTransferNum, "\u8D21\u732E"));
            $bankMoney.select().focus();
            return false;
          }
        }
        return true;
      };
      addBatchTransferButton = function addBatchTransferButton() {
        var $area = $("\n<tr id=\"pdBankTransferArea\">\n  <td style=\"vertical-align: top;\">\n    \u4F7F\u7528\u8BF4\u660E\uFF1A<br>\u6BCF\u884C\u4E00\u540D\u7528\u6237\uFF0C<br>\u5982\u9700\u5355\u72EC\u8BBE\u5B9A\u8F6C\u8D26\u6570\u989D\uFF0C<br>\u53EF\u5199\u4E3A\u201C\u7528\u6237\u540D:\u8D21\u732E\u201D<br>\uFF08\u6CE8\u610F\u662F<b>\u82F1\u6587\u5192\u53F7</b>\uFF09<br>\u4F8B\u5B50\uFF1A<br>\n    <pre style=\"border: 1px solid #9999ff; padding: 5px;\">\u5F20\u4E09\n\u674E\u56DB:0.1\n\u738B\u4E94:1.2\n\u4FE1\u4EF0\u98CE</pre>\n  </td>\n  <td>\n  <form>\n    <div style=\"display: inline-block;\">\n      <label>\u7528\u6237\u5217\u8868\uFF1A<br>\n        <textarea class=\"pd_textarea\" name=\"users\" style=\"width: 270px; height: 250px;\"></textarea>\n      </label>\n    </div>\n    <div style=\"display: inline-block; margin-left: 10px;\">\n      <label>\u901A\u7528\u8F6C\u5E10\u6570\u989D\uFF08\u5982\u6240\u6709\u7528\u6237\u90FD\u5DF2\u8BBE\u5B9A\u5355\u72EC\u6570\u989D\u5219\u53EF\u7559\u7A7A\uFF09\uFF1A<br>\n        <input class=\"pd_input\" name=\"transfer_money\" type=\"text\" style=\"width: 217px;\">\n      </label><br>\n      <label style=\"margin-top: 5px;\">\u8F6C\u5E10\u9644\u8A00\uFF08\u53EF\u7559\u7A7A\uFF09\uFF1A<br>\n        <textarea class=\"pd_textarea\" name=\"msg\" style=\"width: 225px; height: 206px;\"></textarea>\n      </label>\n    </div>\n    <div>\n      <button type=\"submit\">\u6279\u91CF\u8F6C\u8D26</button>\n      <button type=\"reset\">\u91CD\u7F6E</button>\n      <button name=\"random\" type=\"button\" title=\"\u4E3A\u7528\u6237\u5217\u8868\u4E0A\u7684\u6BCF\u4E2A\u7528\u6237\u8BBE\u5B9A\u6307\u5B9A\u8303\u56F4\u5185\u7684\u968F\u673A\u6570\u989D\">\u968F\u673A\u6570\u989D</button>\n      <br><span class=\"pd_highlight\">\uFF08\u6CE8\u610F\uFF1A\u4F60\u8F6C\u7ED9\u5BF9\u65B9\u7684\u662F\u8D21\u732E\uFF0C\u6BCF\u540D\u7528\u6237\u7684\u8F6C\u8D26\u6570\u989D\u53EF\u8D85\u8FC7\u5355\u6B21\u8F6C\u8D26\u7684\u6700\u5927\u503C\uFF0C\u52A9\u624B\u4F1A\u81EA\u52A8\u5206\u591A\u6B21\u8F6C\u8D26\uFF09</span>\n      ".concat(_isIE() || _isEdge() ? "<br><span class=\"pd_highlight\">\u6CE8\uFF1AIE\u548CEdge\u6D4F\u89C8\u5668\u5728\u6279\u91CF\u8F6C\u8D26\u7ED9\u4E2D\u6587\u540D\u7528\u6237\u65F6\u4F1A\u51FA\u73B0\u4E71\u7801\uFF0C\u8BF7\u4F7F\u7528\u5176\u5B83\u6D4F\u89C8\u5668\u8FDB\u884C\u6279\u91CF\u8F6C\u8D26</span>" : "", "\n    </div>\n  </form>\n  </td>\n</tr>\n")).insertAfter(".bank1 > tbody > tr:nth-child(2)");
        $area.find("form").submit(function (e) {
          e.preventDefault();
          _destroy();
          if (!batchTransferVerify($area)) return;
          var commonMoney = parseFloat($area.find('[name="transfer_money"]').val());
          if (!commonMoney) commonMoney = 0;
          var msg = $area.find('[name="msg"]').val();
          var users = [];
          var _iterator12 = _createForOfIteratorHelper($area.find('[name="users"]').val().split("\n")),
            _step12;
          try {
            for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
              var line = _step12.value;
              line = $.trim(line);
              if (!line) continue;
              var userName2 = line;
              var strMoney = 0;
              if (line.includes(":")) {
                var _line$split = line.split(":");
                var _line$split2 = _slicedToArray(_line$split, 2);
                userName2 = _line$split2[0];
                strMoney = _line$split2[1];
                userName2 = $.trim(userName2);
                if (typeof strMoney === "undefined") continue;
              } else {
                strMoney = commonMoney;
              }
              var _money = parseFloat(strMoney);
              _money = Math.floor(_money * 10) / 10;
              if (_money > maxTransferNum) {
                var count = Math.floor(_money * 10 / (maxTransferNum * 10));
                var addNum = _money * 10 % (maxTransferNum * 10) / 10;
                for (var i = 1; i <= count; i++) {
                  users.push([userName2, maxTransferNum]);
                }
                if (addNum >= 0.1) {
                  users.push([userName2, addNum]);
                }
              } else {
                users.push([userName2, _money]);
              }
            }
          } catch (err) {
            _iterator12.e(err);
          } finally {
            _iterator12.f();
          }
          if (!users.length) return;
          var totalMoney = 0;
          var realUsers = [];
          for (var _i5 = 0, _users = users; _i5 < _users.length; _i5++) {
            var _users$_i = _slicedToArray(_users[_i5], 2),
              user = _users$_i[0],
              money = _users$_i[1];
            totalMoney += money;
            if (!realUsers.includes(user)) {
              realUsers.push(user);
            }
          }
          var $gongXian = $("#pdGongXian");
          if ($gongXian.length > 0 && Math.floor(totalMoney * 10) > Math.floor(parseFloat($gongXian.data("num")) * 10)) {
            alert("\u4F60\u5F53\u524D\u6CA1\u6709[".concat(totalMoney.toLocaleString(), "]\u8D21\u732E\u53EF\u4F9B\u8F6C\u8D26"));
            return;
          }
          if (!confirm("\u5171\u8BA1[".concat(realUsers.length, "]\u540D\u7528\u6237\uFF0C\u603B\u8BA1[").concat(totalMoney.toLocaleString(), "]\u8D21\u732E\uFF0C\u662F\u5426\u8F6C\u8D26\uFF1F"))) return;
          if (totalMoney > maxTransferNum && !confirm("\u4F60\u771F\u7684\u8981\u8F6C\u8D26[".concat(totalMoney.toLocaleString(), "]\u8D21\u732E\uFF1F\u8BF7\u6CE8\u610F\u4F60\u8F6C\u7ED9\u5BF9\u65B9\u7684\u662F\u8D21\u732E\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F"))) return;
          _wait("<strong>\u6B63\u5728\u6279\u91CF\u8F6C\u8D26\u4E2D\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85&hellip;</strong><i>\u5269\u4F59\uFF1A<em class=\"pd_countdown\">".concat(users.length, "</em></i><a class=\"pd_stop_action\" href=\"#\">\u505C\u6B62\u64CD\u4F5C</a>"));
          $area.find("> td:last-child").append("<ul class=\"pd_result pd_stat\"><li><strong>\u8F6C\u8D26\u7ED3\u679C\uFF1A</strong></li></ul>");
          batchTransfer(users, msg);
        }).find('[name="random"]').click(function () {
          var userList = [];
          var _iterator13 = _createForOfIteratorHelper($area.find('[name="users"]').val().split("\n")),
            _step13;
          try {
            for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
              var line = _step13.value;
              line = $.trim(line);
              if (!line) continue;
              userList.push($.trim(line.split(":")[0]));
            }
          } catch (err) {
            _iterator13.e(err);
          } finally {
            _iterator13.f();
          }
          if (!userList.length) return;
          var range = prompt("\u8BBE\u5B9A\u968F\u673A\u6570\u989D\u7684\u8303\u56F4\uFF08\u6CE8\uFF1A\u6700\u4F4E\u8F6C\u8D26\u6570\u989D\u4E3A0.1\u8D21\u732E\uFF09", "0.1-1");
          if (range === null) return;
          range = $.trim(range);
          if (!/^\d+(?:\.\d+)?-\d+(?:\.\d+)?$/.test(range)) {
            alert("\u968F\u673A\u6570\u989D\u8303\u56F4\u683C\u5F0F\u4E0D\u6B63\u786E");
            return;
          }
          var arr = range.split("-");
          var min = parseFloat(arr[0]),
            max = parseFloat(arr[1]);
          if (max < min) {
            alert("\u6700\u5927\u503C\u4E0D\u80FD\u4F4E\u4E8E\u6700\u5C0F\u503C");
            return;
          }
          var content = "";
          for (var _i6 = 0, _userList = userList; _i6 < _userList.length; _i6++) {
            var userName2 = _userList[_i6];
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
    addAutoChangeIdColorButton: function addAutoChangeIdColorButton() {
      return _addAutoChangeIdColorButton;
    },
    addAvatarChangeAlert: function addAvatarChangeAlert() {
      return _addAvatarChangeAlert;
    },
    addFastDrawMoneyLink: function addFastDrawMoneyLink() {
      return _addFastDrawMoneyLink;
    },
    addFastGotoThreadPageLink: function addFastGotoThreadPageLink() {
      return _addFastGotoThreadPageLink;
    },
    addFollowAndBlockAndMemoUserLink: function addFollowAndBlockAndMemoUserLink() {
      return _addFollowAndBlockAndMemoUserLink;
    },
    addGuanJianCiUserNameLink: function addGuanJianCiUserNameLink() {
      return _addGuanJianCiUserNameLink;
    },
    addMsgSelectButton: function addMsgSelectButton() {
      return _addMsgSelectButton;
    },
    addUserNameLinkInRankPage: function addUserNameLinkInRankPage() {
      return _addUserNameLinkInRankPage;
    },
    handleProfilePage: function handleProfilePage() {
      return _handleProfilePage;
    },
    highlightNewPost: function highlightNewPost() {
      return _highlightNewPost;
    },
    highlightUnReadAtTipsMsg: function highlightUnReadAtTipsMsg() {
      return _highlightUnReadAtTipsMsg;
    },
    modifyMyPostLink: function modifyMyPostLink() {
      return _modifyMyPostLink;
    },
    syncModifyPerPageFloorNum: function syncModifyPerPageFloorNum() {
      return _syncModifyPerPageFloorNum;
    }
  });
  var _highlightNewPost, _addFastGotoThreadPageLink, _highlightUnReadAtTipsMsg, _addFastDrawMoneyLink, _addFollowAndBlockAndMemoUserLink, _modifyMyPostLink, _addMsgSelectButton, _addAutoChangeIdColorButton, _syncModifyPerPageFloorNum, _addAvatarChangeAlert, _addUserNameLinkInRankPage, _handleProfilePage, _addGuanJianCiUserNameLink;
  var init_Other = __esm({
    "src/module/Other.js": function src_module_OtherJs() {
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
      _highlightNewPost = function _highlightNewPost() {
        $(".thread1 > tbody > tr > td:last-child").has("a.bl").each(function () {
          var html2 = $(this).html();
          if (/\|\s*\d{2}:\d{2}<br>\n.*\d{2}:\d{2}/.test(html2)) {
            html2 = html2.replace(/(\d{2}:\d{2})<br>/, '<span class="pd_highlight">$1</span><br>');
            $(this).html(html2);
          }
        });
      };
      _addFastGotoThreadPageLink = function _addFastGotoThreadPageLink() {
        $('.threadtit1 > a[href^="read.php"]').each(function () {
          var $link = $(this);
          var floorNum = $link.closest("td").next().find("ul > li > a").contents().eq(0).text();
          if (!floorNum || floorNum < Config.perPageFloorNum) return;
          var url = $link.attr("href");
          var totalPageNum = Math.floor(floorNum / Config.perPageFloorNum) + 1;
          var html2 = "";
          for (var i = 1; i < totalPageNum; i++) {
            if (i > Config.maxFastGotoThreadPageNum) {
              if (i + 1 <= totalPageNum) {
                html2 += "..<a href=\"".concat(url, "&page=").concat(totalPageNum, "\">").concat(totalPageNum, "</a>");
              }
              break;
            }
            html2 += "<a href=\"".concat(url, "&page=").concat(i + 1, "\">").concat(i + 1, "</a>");
          }
          html2 = "<span class=\"pd_thread_page\">&hellip;".concat(html2, "</span>");
          $link.after(html2).parent().css("white-space", "normal");
        });
      };
      _highlightUnReadAtTipsMsg = function _highlightUnReadAtTipsMsg() {
        if ($(".kf_share1:first").text().trim() !== "\u542B\u6709\u5173\u952E\u8BCD \u201C".concat(Info_default.userName, "\u201D \u7684\u5185\u5BB9")) return;
        var timeString = _getCookie(Const_default.prevReadAtTipsCookieName);
        if (!timeString || !/^\d+日\d+时\d+分$/.test(timeString)) return;
        var prevString = "";
        $(".kf_share1:eq(1) > tbody > tr:gt(0) > td:first-child").each(function (index) {
          var $this2 = $(this);
          var curString = $this2.text().trim();
          if (index === 0) prevString = curString;
          if (timeString < curString && prevString >= curString) {
            $this2.addClass("pd_highlight");
            prevString = curString;
          } else return false;
        });
        $(".kf_share1").on("click", "td > a", function () {
          _deleteCookie(Const_default.prevReadAtTipsCookieName);
        });
      };
      _addFastDrawMoneyLink = function _addFastDrawMoneyLink() {
        if (!$('td:contains("SYSTEM")').length || !$("td:contains(\"\u6536\u5230\u4E86\u4ED6\u4EBA\u8F6C\u8D26\u7684\u8D21\u732E\")").length) return;
        var $msg = $(".thread2 > tbody > tr:eq(-2) > td:last");
        var html2 = $msg.html();
        var matches = /给你转帐(\d+(?:\.\d+)?)贡献/.exec(html2);
        if (matches) {
          var gongXian = parseFloat(matches[1]);
          $msg.html(html2.replace(/会员\[(.+?)\]通过论坛银行/, "\u4F1A\u5458[<a class=\"".concat(!Config.adminMemberEnabled ? "pd_not_click_link" : "", "\" target=\"_blank\" href=\"profile.php?action=show&username=$1\">$1</a>]\u901A\u8FC7\u8BBA\u575B\u94F6\u884C")).replace(matches[0], "\u7ED9\u4F60\u8F6C\u5E10<span class=\"pd_stat\"><em>".concat(gongXian.toLocaleString(), "</em></span>\u8D21\u732E")));
          $('a[href^="message.php?action=write&remid="]').attr("href", "#").addClass("pd_disabled_link").click(function (e) {
            e.preventDefault();
            alert("\u672C\u77ED\u6D88\u606F\u7531\u7CFB\u7EDF\u53D1\u9001\uFF0C\u8BF7\u52FF\u76F4\u63A5\u56DE\u590D\uFF1B\u5982\u9700\u56DE\u590D\uFF0C\u8BF7\u70B9\u51FB\u7ED9\u4F60\u8F6C\u8D26\u7684\u7528\u6237\u94FE\u63A5\uFF0C\u5411\u5176\u53D1\u9001\u77ED\u6D88\u606F");
          });
        }
      };
      _addFollowAndBlockAndMemoUserLink = function _addFollowAndBlockAndMemoUserLink() {
        var matches = /(.+?)\s*详细信息/.exec($("td:contains(\"\u8BE6\u7EC6\u4FE1\u606F\")").text());
        if (!matches) return;
        var userName2 = $.trim(matches[1]);
        $("<span>[<a href=\"#\">\u5173\u6CE8\u7528\u6237</a>] [<a href=\"#\">\u5C4F\u853D\u7528\u6237</a>]</span><br><span>[<a href=\"#\">\u6DFB\u52A0\u5907\u6CE8</a>]</span><br>").appendTo($('a[href^="message.php?action=write&touid="]').parent()).find("a").each(function () {
          var $this2 = $(this);
          if ($this2.is("a:contains(\"\u5907\u6CE8\")")) {
            var str = "";
            var _iterator14 = _createForOfIteratorHelper(_entries(Config.userMemoList)),
              _step14;
            try {
              for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
                var _step14$value = _slicedToArray(_step14.value, 2),
                  name4 = _step14$value[0],
                  memo = _step14$value[1];
                if (name4 === userName2) {
                  str = memo;
                  break;
                }
              }
            } catch (err) {
              _iterator14.e(err);
            } finally {
              _iterator14.f();
            }
            if (str !== "") {
              $this2.text("\u4FEE\u6539\u5907\u6CE8").data("memo", str);
              var $info = $(".log1 > tbody > tr:last-child > td:last-child");
              $info.html("\u5907\u6CE8\uFF1A".concat(str, "<br>").concat($info.html()));
            }
          } else {
            var _str = "\u5173\u6CE8";
            var userList = Config.followUserList;
            if ($this2.text().indexOf("\u5C4F\u853D") > -1) {
              _str = "\u5C4F\u853D";
              userList = Config.blockUserList;
            }
            if (_inFollowOrBlockUserList(userName2, userList) > -1) {
              $this2.addClass("pd_highlight").text("\u89E3\u9664" + _str);
            }
          }
        }).click(function (e) {
          e.preventDefault();
          read3();
          var $this2 = $(this);
          if ($this2.is("a:contains(\"\u5907\u6CE8\")")) {
            var memo = $this2.data("memo");
            if (!memo) memo = "";
            var value = prompt("\u4E3A\u6B64\u7528\u6237\u6DFB\u52A0\u5907\u6CE8\uFF08\u8981\u5220\u9664\u5907\u6CE8\u8BF7\u7559\u7A7A\uFF09\uFF1A", memo);
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
            var str = "\u5173\u6CE8";
            var userList = Config.followUserList;
            if ($this2.text().includes("\u5C4F\u853D")) {
              str = "\u5C4F\u853D";
              userList = Config.blockUserList;
              if (!Config.blockUserEnabled) Config.blockUserEnabled = true;
            } else {
              if (!Config.followUserEnabled) Config.followUserEnabled = true;
            }
            if ($this2.text() === "\u89E3\u9664" + str) {
              var index = _inFollowOrBlockUserList(userName2, userList);
              if (index > -1) {
                userList.splice(index, 1);
                write3();
              }
              $this2.removeClass("pd_highlight").text(str + "\u7528\u6237");
              alert("\u8BE5\u7528\u6237\u5DF2\u88AB\u89E3\u9664" + str);
            } else {
              if (_inFollowOrBlockUserList(userName2, userList) === -1) {
                if (str === "\u5C4F\u853D") {
                  var type = Config.blockUserDefaultType;
                  type = prompt("\u8BF7\u586B\u5199\u5C4F\u853D\u7C7B\u578B\uFF0C0\uFF1A\u5C4F\u853D\u4E3B\u9898\u548C\u56DE\u5E16\uFF1B1\uFF1A\u4EC5\u5C4F\u853D\u4E3B\u9898\uFF1B2\uFF1A\u4EC5\u5C4F\u853D\u56DE\u5E16", type);
                  if (type === null) return;
                  type = parseInt(type);
                  if (isNaN(type) || type < 0 || type > 2) type = Config.blockUserDefaultType;
                  userList.push({
                    name: userName2,
                    type: type
                  });
                } else {
                  userList.push({
                    name: userName2
                  });
                }
                write3();
              }
              $this2.addClass("pd_highlight").text("\u89E3\u9664" + str);
              alert("\u8BE5\u7528\u6237\u5DF2\u88AB" + str);
            }
          }
        });
      };
      _modifyMyPostLink = function _modifyMyPostLink() {
        $('.t a[href^="read.php?tid="]').each(function () {
          var $this2 = $(this);
          $this2.attr("href", $this2.attr("href").replace(/&uid=\d+#(\d+)/, "&spid=$1"));
        });
      };
      _addMsgSelectButton = function _addMsgSelectButton() {
        var $checkeds = $('.thread1 > tbody > tr > td:last-child > [type="checkbox"]');
        $("<input value=\"\u81EA\u5B9A\u4E49\" type=\"button\" style=\"margin-right: 3px;\">").insertBefore("[type=\"button\"][value=\"\u5168\u9009\"]").click(function (e) {
          e.preventDefault();
          var value = $.trim(prompt("\u8BF7\u586B\u5199\u6240\u8981\u9009\u62E9\u7684\u5305\u542B\u6307\u5B9A\u5B57\u7B26\u4E32\u7684\u77ED\u6D88\u606F\u6807\u9898\uFF08\u53EF\u7528|\u7B26\u53F7\u5206\u9694\u591A\u4E2A\u6807\u9898\uFF09", "\u6536\u5230\u4E86\u4ED6\u4EBA\u8F6C\u8D26\u7684\u8D21\u732E|\u6536\u5230\u4E86\u4ED6\u4EBA\u8F6C\u8D26\u7684KFB|\u94F6\u884C\u6C47\u6B3E\u901A\u77E5|\u60A8\u7684\u6587\u7AE0\u88AB\u8BC4\u5206|\u60A8\u7684\u6587\u7AE0\u88AB\u5220\u9664"));
          if (value !== "") {
            $checkeds.prop("checked", false);
            var titleArr = value.split("|");
            $(".thread1 > tbody > tr > td:nth-child(2) > a").each(function () {
              var $this2 = $(this);
              var _iterator15 = _createForOfIteratorHelper(titleArr),
                _step15;
              try {
                for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
                  var title2 = _step15.value;
                  if ($this2.text().toLowerCase().includes(title2.toLowerCase())) {
                    $this2.closest("tr").find('td:last-child > input[type="checkbox"]').prop("checked", true);
                  }
                }
              } catch (err) {
                _iterator15.e(err);
              } finally {
                _iterator15.f();
              }
            });
          }
        }).parent().attr("colspan", 4).prev("td").attr("colspan", 3);
        $("<input value=\"\u53CD\u9009\" type=\"button\" style=\"margin-left: 5px; margin-right: 1px;\">").insertAfter("[type=\"button\"][value=\"\u5168\u9009\"]").click(function () {
          return _selectInverse($checkeds);
        });
      };
      _addAutoChangeIdColorButton = function _addAutoChangeIdColorButton() {
        var $autoChangeIdColor = $("table div > table > tbody > tr > td:contains(\"\u81EA\u5B9A\u4E49ID\u989C\u8272\")");
        $("<span class=\"pd_highlight\">\u4F4E\u7B49\u7EA7\u6CA1\u4EBA\u6743\uFF1F\u6CA1\u6709\u81EA\u5DF1\u559C\u6B22\u7684\u989C\u8272\uFF1F\u5FEB\u6765\u8BD5\u8BD5\u52A9\u624B\u7684<a href=\"#\">\u81EA\u5B9A\u4E49\u672C\u4EBA\u795E\u79D8\u989C\u8272</a>\u7684\u529F\u80FD\u5427\uFF01\uFF08\u867D\u7136\u4EC5\u9650\u81EA\u5DF1\u53EF\u89C1 \u256E(\u256F\u25BD\u2570)\u256D\uFF09</span><br>").appendTo($autoChangeIdColor).find("a").click(function (e) {
          e.preventDefault();
          show3();
        });
        var $idColors = $autoChangeIdColor.parent("tr").nextAll("tr").not("tr:last");
        if ($idColors.find("a").length <= 1) return;
        var $area = $("\n<form>\n<div data-name=\"autoChangeIdColorBtns\" style=\"margin-top: 5px;\">\n  <label><input name=\"autoChangeIdColorEnabled\" class=\"pd_input\" type=\"checkbox\"> \u81EA\u52A8\u66F4\u6362ID\u989C\u8272</label>\n</div>\n</form>\n").appendTo($autoChangeIdColor);
        $area.find('[name="autoChangeIdColorEnabled"]').click(function () {
          var $this2 = $(this);
          var enabled = $this2.prop("checked");
          if (enabled !== Config.autoChangeIdColorEnabled) {
            read3();
            Config.autoChangeIdColorEnabled = enabled;
            write3();
          }
          if (enabled) {
            $idColors.addClass("pd_id_color_select").find("td:not(:has(a))").css("cursor", "not-allowed");
            $("\n<label class=\"pd_cfg_ml\">\n  \u66F4\u6362\u987A\u5E8F\n  <select name=\"autoChangeIdColorType\" style=\"font-size: 12px;\">\n    <option value=\"random\">\u968F\u673A</option><option value=\"sequence\">\u987A\u5E8F</option>\n  </select>\n</label>&nbsp;\n<label>\u6BCF\u9694 <input name=\"autoChangeIdColorInterval\" class=\"pd_input\" style=\"width: 25px;\" type=\"text\" maxlength=\"5\"> \u5C0F\u65F6</label>\n<button name=\"save\" type=\"button\">\u4FDD\u5B58</button>\n<button name=\"reset\" type=\"button\" style=\"margin-left: 3px;\">\u91CD\u7F6E</button><br>\n<a class=\"pd_btn_link\" data-name=\"selectAll\" href=\"#\">\u5168\u9009</a>\n<a class=\"pd_btn_link\" data-name=\"selectInverse\" href=\"#\">\u53CD\u9009</a>\n<label><input name=\"changeAllAvailableIdColorEnabled\" class=\"pd_input\" type=\"checkbox\"> \u9009\u62E9\u5F53\u524D\u6240\u6709\u53EF\u7528\u7684ID\u989C\u8272</label>\n").insertAfter($this2.parent()).filter('[name="save"]').click(function () {
              var $autoChangeIdColorInterval = $area.find('[name="autoChangeIdColorInterval"]');
              var interval = parseInt($autoChangeIdColorInterval.val());
              if (isNaN(interval) || interval <= 0) {
                alert("ID\u989C\u8272\u66F4\u6362\u65F6\u95F4\u95F4\u9694\u683C\u5F0F\u4E0D\u6B63\u786E");
                $autoChangeIdColorInterval.select().focus();
                return;
              }
              var changeAllAvailableSMColorEnabled = $area.find('[name="changeAllAvailableIdColorEnabled"]').prop("checked");
              var customChangeSMColorList = [];
              $idColors.find('[type="checkbox"]:checked').each(function () {
                customChangeSMColorList.push(parseInt($(this).val()));
              });
              if (!changeAllAvailableSMColorEnabled && customChangeSMColorList.length <= 1) {
                alert("\u5FC5\u987B\u9009\u62E92\u79CD\u6216\u4EE5\u4E0A\u7684ID\u989C\u8272");
                return;
              }
              if (customChangeSMColorList.length <= 1) customChangeSMColorList = [];
              var oriInterval = Config.autoChangeIdColorInterval;
              read3();
              Config.autoChangeIdColorType = $area.find('[name="autoChangeIdColorType"]').val().toLowerCase();
              Config.autoChangeIdColorInterval = interval;
              Config.changeAllAvailableIdColorEnabled = changeAllAvailableSMColorEnabled;
              Config.customAutoChangeIdColorList = customChangeSMColorList;
              write3();
              if (oriInterval !== Config.autoChangeIdColorInterval) _deleteCookie(Const_default.autoChangeIdColorCookieName);
              alert("\u8BBE\u7F6E\u4FDD\u5B58\u6210\u529F");
            }).end().filter('[name="reset"]').click(function () {
              read3();
              Config.autoChangeIdColorEnabled = Config2.autoChangeIdColorEnabled;
              Config.autoChangeIdColorType = Config2.autoChangeIdColorType;
              Config.autoChangeIdColorInterval = Config2.autoChangeIdColorInterval;
              Config.changeAllAvailableIdColorEnabled = Config2.changeAllAvailableIdColorEnabled;
              Config.customAutoChangeIdColorList = Config2.customAutoChangeIdColorList;
              write3();
              _deleteCookie(Const_default.autoChangeIdColorCookieName);
              _deleteValue(Const_default.prevAutoChangeIdColorTmpLogName);
              alert("\u8BBE\u7F6E\u5DF2\u91CD\u7F6E");
              location.reload();
            }).end().filter('[data-name="selectAll"], [data-name="selectInverse"]').click(function (e) {
              e.preventDefault();
              if ($idColors.find("input[disabled]").length > 0) {
                alert("\u8BF7\u5148\u53D6\u6D88\u52FE\u9009\u201C\u9009\u62E9\u5F53\u524D\u6240\u6709\u53EF\u7528\u7684ID\u989C\u8272\u201D\u590D\u9009\u6846");
                $area.find('[name="changeAllAvailableIdColorEnabled"]').focus();
                return;
              }
              if ($(this).is('[data-name="selectAll"]')) _selectAll($idColors.find('[type="checkbox"]'));else _selectInverse($idColors.find('[type="checkbox"]'));
            });
            $idColors.find("td:has(a)").each(function () {
              var $this3 = $(this);
              var matches = /&color=(\d+)/i.exec($this3.find("a").attr("href"));
              if (matches) $this3.append("<input type=\"checkbox\" class=\"pd_input\" value=\"".concat(matches[1], "\">"));
            });
            $area.find('[name="autoChangeIdColorType"]').val(Config.autoChangeIdColorType);
            $area.find('[name="autoChangeIdColorInterval"]').val(Config.autoChangeIdColorInterval);
            $area.find('[name="changeAllAvailableIdColorEnabled"]').click(function () {
              $idColors.find("input").prop("disabled", $(this).prop("checked"));
            }).prop("checked", Config.changeAllAvailableIdColorEnabled).triggerHandler("click");
            var _iterator16 = _createForOfIteratorHelper(Config.customAutoChangeIdColorList),
              _step16;
            try {
              for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
                var id = _step16.value;
                $idColors.find("input[value=\"".concat(id, "\"]")).prop("checked", true);
              }
            } catch (err) {
              _iterator16.e(err);
            } finally {
              _iterator16.f();
            }
          } else {
            $this2.parent().nextAll().remove();
            $idColors.removeClass("pd_id_color_select").find("input").remove();
          }
        });
        $idColors.on("click", "td", function (e) {
          if (!$(e.target).is("a")) {
            var $this2 = $(this);
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
      _syncModifyPerPageFloorNum = function _syncModifyPerPageFloorNum() {
        var syncConfig = function syncConfig() {
          var perPageFloorNum = parseInt($('select[name="p_num"]').val());
          if (isNaN(perPageFloorNum)) return;
          if (!perPageFloorNum) perPageFloorNum = 20;
          if (perPageFloorNum !== Config.perPageFloorNum) {
            Config.perPageFloorNum = perPageFloorNum;
            write3();
          }
        };
        $("form#creator").submit(function () {
          read3();
          syncConfig();
        });
        syncConfig();
      };
      _addAvatarChangeAlert = function _addAvatarChangeAlert() {
        $('input[name="uploadurl[2]"]').parent().append("<div class=\"pd_highlight\">\u672C\u53CD\u5411\u4EE3\u7406\u670D\u52A1\u5668\u4E3A\u4E86\u63D0\u9AD8\u6027\u80FD\u5BF9\u56FE\u7247\u8BBE\u7F6E\u4E86\u7F13\u5B58\uFF0C\u66F4\u6362\u5934\u50CF\u540E\u53EF\u80FD\u9700\u7B49\u5F85<b>\u6700\u591A30\u5206\u949F</b>\u624D\u80FD\u770B\u5230\u6548\u679C</div>");
      };
      _addUserNameLinkInRankPage = function _addUserNameLinkInRankPage() {
        $(".kf_no11:eq(2) > tbody > tr:gt(0) > td:nth-child(2)").each(function () {
          var $this2 = $(this);
          var userName2 = $this2.text().trim();
          $this2.html("<a class=\"".concat(!Config.adminMemberEnabled ? "pd_not_click_link" : "", "\" href=\"profile.php?action=show&username=").concat(userName2, "\" target=\"_blank\">").concat(userName2, "</a>"));
          if (userName2 === Info_default.userName) $this2.find("a").addClass("pd_highlight");
        });
      };
      _handleProfilePage = function _handleProfilePage() {
        var $area = $(".log1 > tbody > tr:last-child > td:nth-child(2)");
        $area.html($area.html().replace(/<b>在线<\/b>/, "<b style=\"color: #090;\">\u5728\u7EBF</b>").replace(/<b>离线<\/b>/, "<b style=\"color: #999;\">\u79BB\u7EBF</b>").replace(/系统等级：(\S+)/, "\u7CFB\u7EDF\u7B49\u7EA7\uFF1A<span class=\"pd_highlight\">$1</span>").replace(/发帖数量：(\d+)/, function (m, num2) {
          return "\u53D1\u5E16\u6570\u91CF\uFF1A<span data-num=\"".concat(num2, "\">").concat(parseInt(num2).toLocaleString(), "</span>");
        }).replace(/神秘等级：(-?\d+)/, function (m, num2) {
          return "\u795E\u79D8\u7B49\u7EA7\uFF1A<span data-num=\"".concat(num2, "\">").concat(parseInt(num2).toLocaleString(), "</span>");
        }).replace(/论坛货币：(-?\d+)/, function (m, num2) {
          return "\u8BBA\u575B\u8D27\u5E01\uFF1A<span data-num=\"".concat(num2, "\">").concat(parseInt(num2).toLocaleString(), "</span>");
        }).replace(/贡献数值：(-?\d+(?:\.\d+)?)/, function (m, num2) {
          return "\u8D21\u732E\u6570\u503C\uFF1A<span data-num=\"".concat(num2, "\">").concat(parseFloat(num2).toLocaleString(), "</span>");
        }).replace(/在线时间：(\d+)/, function (m, num2) {
          return "\u5728\u7EBF\u65F6\u95F4\uFF1A<span data-num=\"".concat(num2, "\">").concat(parseInt(num2).toLocaleString(), "</span>");
        }).replace(/注册时间：((\d{4})-(\d{2})-(\d{2}))/, function (m, date, year, month, day) {
          var now = /* @__PURE__ */new Date();
          var html2 = date;
          if (parseInt(month) === now.getMonth() + 1 && parseInt(day) === now.getDate() && parseInt(year) <= now.getFullYear()) html2 = "<span class=\"pd_custom_tips pd_highlight\" title=\"\u4ECA\u5929\u662F\u8BE5\u7528\u6237\u6CE8\u518C".concat(now.getFullYear() - parseInt(year), "\u5468\u5E74\u7EAA\u5FF5\u65E5\">").concat(date, "</span>");
          return "\u6CE8\u518C\u65F6\u95F4\uFF1A" + html2;
        })).css("vertical-align", "top");
      };
      _addGuanJianCiUserNameLink = function _addGuanJianCiUserNameLink() {
        $(".kf_share1 > tbody > tr:gt(1) > td.kf_share2:last-child").each(function () {
          var $this2 = $(this);
          var userName2 = $this2.text().trim();
          if (userName2) {
            $this2.html("<a href=\"profile.php?action=show&username=".concat(userName2, "\">").concat(userName2, "</a>"));
          }
        });
      };
    }
  });

  // src/module/Script.js
  var Script_exports = {};
  __export(Script_exports, {
    addFunc: function addFunc() {
      return _addFunc;
    },
    handleInstallScriptLink: function handleInstallScriptLink() {
      return _handleInstallScriptLink;
    },
    runCmd: function runCmd() {
      return _runCmd;
    },
    runCustomScript: function runCustomScript() {
      return _runCustomScript;
    },
    runFunc: function runFunc() {
      return _runFunc;
    },
    showDialog: function showDialog() {
      return _showDialog;
    }
  });
  var defScriptName, metaRegex, funcList, _runCustomScript, _runCmd, _addFunc, _runFunc, getScriptMeta, _showDialog, _handleInstallScriptLink;
  var init_Script = __esm({
    "src/module/Script.js": function src_module_ScriptJs() {
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
      funcList = /* @__PURE__ */new Map();
      _runCustomScript = function _runCustomScript() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "end";
        var _iterator17 = _createForOfIteratorHelper(Config.customScriptList),
          _step17;
        try {
          for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
            var _step17$value = _step17.value,
              enabled = _step17$value.enabled,
              trigger = _step17$value.trigger,
              content = _step17$value.content;
            if (enabled && trigger === type && content) {
              _runCmd(content);
            }
          }
        } catch (err) {
          _iterator17.e(err);
        } finally {
          _iterator17.f();
        }
      };
      _runCmd = function _runCmd(cmd) {
        var isOutput = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var result = true;
        var response = "";
        try {
          response = eval(cmd);
          if (isOutput) console.log(response);
        } catch (ex) {
          result = false;
          response = ex;
          console.log(ex);
        }
        return {
          result: result,
          response: String(response)
        };
      };
      _addFunc = function _addFunc(name4, func) {
        if (!funcList.has(name4)) funcList.set(name4, []);
        funcList.get(name4).push(func);
      };
      _runFunc = function _runFunc(name4, data) {
        if (funcList.has(name4)) {
          var _iterator18 = _createForOfIteratorHelper(funcList.get(name4)),
            _step18;
          try {
            for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
              var func = _step18.value;
              if (typeof func === "function") {
                try {
                  func(data);
                } catch (ex) {
                  console.log(ex);
                }
              }
            }
          } catch (err) {
            _iterator18.e(err);
          } finally {
            _iterator18.f();
          }
        }
      };
      getScriptMeta = function getScriptMeta(content) {
        var meta = {
          name: defScriptName,
          version: "",
          trigger: "end",
          homepage: "",
          author: ""
        };
        var matches = metaRegex.exec(content);
        if (!matches) return meta;
        var metaContent = matches[1];
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
      _showDialog = function _showDialog() {
        var showIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var dialogName2 = "pdCustomScriptDialog";
        if ($("#" + dialogName2).length > 0) return;
        read3();
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <div style=\"margin-top: 5px;\">\n    <a class=\"pd_highlight pd_btn_link\" data-name=\"addNewScript\" href=\"#\">\u6DFB\u52A0\u65B0\u811A\u672C</a>\n    <a class=\"pd_btn_link\" data-name=\"insertSample\" href=\"#\">\u63D2\u5165\u8303\u4F8B</a>\n  </div>\n  <div data-name=\"customScriptList\"></div>\n</div>\n<div class=\"pd_cfg_btns\">\n  <span class=\"pd_cfg_about\">\n    <a class=\"pd_btn_link pd_highlight\" href=\"read.php?tid=500968&sf=b09\" target=\"_blank\">\u81EA\u5B9A\u4E49\u811A\u672C\u6536\u96C6\u8D34</a>\n    <a class=\"pd_btn_link\" data-name=\"openImOrExCustomScriptDialog\" href=\"#\">\u5BFC\u5165/\u5BFC\u51FA\u6240\u6709\u811A\u672C</a>\n  </span>\n  <button type=\"submit\">\u4FDD\u5B58</button>\n  <button data-action=\"close\" type=\"button\">\u53D6\u6D88</button>\n  <button class=\"pd_highlight\" name=\"clear\" type=\"button\">\u6E05\u7A7A</button>\n</div>";
        var $dialog2 = _create(dialogName2, "\u81EA\u5B9A\u4E49\u811A\u672C", html2, "min-width: 776px;");
        var $customScriptList = $dialog2.find('[data-name="customScriptList"]');
        $dialog2.submit(function (e) {
          e.preventDefault();
          Config.customScriptList = [];
          $customScriptList.find(".pd_custom_script_content").each(function () {
            var $this2 = $(this);
            var content = $this2.val();
            if (!$.trim(content)) return;
            var enabled = $this2.prev().find('[type="checkbox"]').prop("checked");
            Config.customScriptList.push($.extend(getScriptMeta(content), {
              enabled: enabled,
              content: content
            }));
          });
          write3();
          _close(dialogName2);
          alert("\u81EA\u5B9A\u4E49\u811A\u672C\u4FEE\u6539\u6210\u529F\uFF08\u9700\u5237\u65B0\u9875\u9762\u540E\u624D\u53EF\u751F\u6548\uFF09");
        }).end().find('[name="clear"]').click(function (e) {
          e.preventDefault();
          if (confirm("\u662F\u5426\u6E05\u7A7A\u6240\u6709\u811A\u672C\uFF1F")) {
            $customScriptList.html("");
            _resize(dialogName2);
          }
        });
        var addCustomScript = function addCustomScript() {
          var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref6$enabled = _ref6.enabled,
            enabled = _ref6$enabled === void 0 ? true : _ref6$enabled,
            _ref6$name = _ref6.name,
            name4 = _ref6$name === void 0 ? defScriptName : _ref6$name,
            _ref6$version = _ref6.version,
            version2 = _ref6$version === void 0 ? "" : _ref6$version,
            _ref6$homepage = _ref6.homepage,
            homepage = _ref6$homepage === void 0 ? "" : _ref6$homepage,
            _ref6$trigger = _ref6.trigger,
            trigger = _ref6$trigger === void 0 ? "end" : _ref6$trigger,
            _ref6$content = _ref6.content,
            content = _ref6$content === void 0 ? "" : _ref6$content;
          $customScriptList.append("\n<div class=\"pd_custom_script_header\">\n  <input type=\"checkbox\" ".concat(enabled ? "checked" : "", " title=\"\u662F\u5426\u542F\u7528\u6B64\u811A\u672C\">\n  <a class=\"pd_custom_script_name\" href=\"#\" style=\"margin-left: 5px;\">[").concat(name4, "]</a>\n  <span data-name=\"version\" style=\"margin-left: 5px; color: #666;\" ").concat(!version2 ? "hidden" : "", ">").concat(version2, "</span>\n  <span data-name=\"trigger\" style=\"margin-left: 5px; color: ").concat(trigger === "start" ? "#f00" : "#00f", ";\" title=\"\u811A\u672C\u6267\u884C\u65F6\u673A\">\n    [").concat(trigger === "start" ? "\u5F00\u59CB\u65F6" : "\u7ED3\u675F\u65F6", "]\n  </span>\n  <a data-name=\"homepage\" href=\"").concat(homepage, "\" target=\"_blank\" style=\"margin-left: 5px;\" ").concat(!homepage ? "hidden" : "", ">[\u4E3B\u9875]</a>\n  <a data-name=\"delete\" href=\"#\" style=\"margin-left: 5px; color: #666;\">[\u5220\u9664]</a>\n</div>\n<textarea class=\"pd_custom_script_content\" wrap=\"off\">").concat(content, "</textarea>\n"));
        };
        var _iterator19 = _createForOfIteratorHelper(Config.customScriptList),
          _step19;
        try {
          for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
            var data = _step19.value;
            addCustomScript(data);
          }
        } catch (err) {
          _iterator19.e(err);
        } finally {
          _iterator19.f();
        }
        $dialog2.find('[data-name="addNewScript"]').click(function (e) {
          e.preventDefault();
          $customScriptList.find(".pd_custom_script_content").hide();
          addCustomScript();
          $customScriptList.find(".pd_custom_script_content:last").show().focus();
          _resize(dialogName2);
        }).end().find('[data-name="insertSample"]').click(function (e) {
          e.preventDefault();
          var $content = $customScriptList.find(".pd_custom_script_content:visible");
          $content.val("\n// ==UserScript==\n// @name        ".concat(defScriptName, "\n// @version     1.0\n// @author      ").concat(Info_default.userName, "\n// @trigger     end\n// @homepage    read.php?tid=500968&spid=12318348\n// @description \u8FD9\u662F\u4E00\u4E2A\u672A\u547D\u540D\u811A\u672C\n// ==/UserScript==\n").trim() + "\n" + $content.val()).focus();
        }).end().find('[data-name="openImOrExCustomScriptDialog"]').click(function (e) {
          e.preventDefault();
          _showCommonImportOrExportConfigDialog("\u81EA\u5B9A\u4E49\u811A\u672C", "customScriptList");
        });
        $customScriptList.on("click", ".pd_custom_script_name", function (e) {
          e.preventDefault();
          $dialog2.find(".pd_custom_script_content").hide();
          $(this).parent().next().show().focus();
          _resize(dialogName2);
        }).on("click", '[data-name="delete"]', function (e) {
          e.preventDefault();
          if (!confirm("\u662F\u5426\u5220\u9664\u6B64\u811A\u672C\uFF1F")) return;
          var $header = $(this).closest(".pd_custom_script_header");
          $header.next().remove();
          $header.remove();
          _resize(dialogName2);
        }).on("change", ".pd_custom_script_content", function () {
          var $this2 = $(this);
          var _getScriptMeta = getScriptMeta($this2.val()),
            name4 = _getScriptMeta.name,
            version2 = _getScriptMeta.version,
            homepage = _getScriptMeta.homepage,
            trigger = _getScriptMeta.trigger;
          var $header = $this2.prev();
          $header.find(".pd_custom_script_name").text("[".concat(name4 ? name4 : defScriptName, "]"));
          $header.find('[data-name="version"]').text(version2).prop("hidden", !version2);
          $header.find('[data-name="homepage"]').attr("href", homepage ? homepage : "").prop("hidden", !homepage);
          $header.find('[data-name="trigger"]').html("[".concat(trigger === "start" ? "\u5F00\u59CB\u65F6" : "\u7ED3\u675F\u65F6", "]")).css("color", trigger === "start" ? "#f00" : "#00f");
        });
        show2(dialogName2);
        if (typeof showIndex === "number") $customScriptList.find(".pd_custom_script_name").eq(showIndex).click();
      };
      _handleInstallScriptLink = function _handleInstallScriptLink() {
        $(document).on("click", 'a[href$="#install-script"]', function (e) {
          e.preventDefault();
          var $this2 = $(this);
          var $area = $this2.nextAll(".pd_code_area").eq(0);
          if (!$area.length) return;
          var content = _htmlDecode($area.html().replace(/<legend>.+?<\/legend>/i, "")).trim();
          if (!metaRegex.test(content)) return;
          read3();
          var meta = getScriptMeta(content);
          var index = Config.customScriptList.findIndex(function (script2) {
            return script2.name === meta.name && script2.author === meta.author;
          });
          var type = index > -1 ? 1 : 0;
          if (!confirm("\u662F\u5426".concat(type === 1 ? "\u66F4\u65B0" : "\u5B89\u88C5", "\u6B64\u811A\u672C\uFF1F"))) return;
          Config.customScriptEnabled = true;
          var script = $.extend(meta, {
            enabled: true,
            content: content
          });
          if (type === 1) Config.customScriptList[index] = script;else Config.customScriptList.push(script);
          write3();
          _close("pdCustomScriptDialog");
          _showDialog(index);
        });
      };
    }
  });

  // src/module/ConfigDialog.js
  var show3, setMainConfigValue, getMainConfigValue, verifyMainConfig, showClearDataDialog, showRunCommandDialog, showImportOrExportSettingDialog, showCustomCssDialog, showUserMemoDialog, showFollowUserDialog, showBlockUserDialog, showBlockThreadDialog, showBuyItemTipsDialog;
  var init_ConfigDialog = __esm({
    "src/module/ConfigDialog.js": function src_module_ConfigDialogJs() {
      "use strict";

      init_Info();
      init_Util();
      init_Dialog();
      init_Const();
      init_Config();
      init_TmpLog();
      init_Public();
      init_Script();
      show3 = function show3() {
        var dialogName2 = "pdConfigDialog";
        if ($("#" + dialogName2).length > 0) return;
        read3();
        _runFunc("ConfigDialog.show_before_");
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <div class=\"pd_cfg_nav\">\n    <a class=\"pd_btn_link\" data-name=\"openClearDataDialog\" title=\"\u6E05\u9664\u4E0E\u52A9\u624B\u6709\u5173\u7684\u6570\u636E\" href=\"#\">\u6E05\u9664\u6570\u636E</a>\n    <a class=\"pd_btn_link\" data-name=\"openRumCommandDialog\" href=\"#\">\u8FD0\u884C\u547D\u4EE4</a>\n    <a class=\"pd_btn_link\" data-name=\"openImportOrExportSettingDialog\" href=\"#\">\u5BFC\u5165/\u5BFC\u51FA\u8BBE\u7F6E</a>\n  </div>\n\n  <div class=\"pd_cfg_panel\" style=\"margin-bottom: 5px;\">\n    <fieldset>\n      <legend>\n        <label>\n          <input name=\"timingModeEnabled\" type=\"checkbox\"> \u5B9A\u65F6\u6A21\u5F0F\n          <span class=\"pd_cfg_tips\" title=\"\u53EF\u6309\u65F6\u8FDB\u884C\u81EA\u52A8\u64CD\u4F5C\uFF08\u5305\u62EC\u81EA\u52A8\u9886\u53D6\u6BCF\u65E5\u5956\u52B1\u3001\u81EA\u52A8\u63D0\u5347\u6218\u529B\u5149\u73AF\u3001\u81EA\u52A8\u4E89\u593A\u3001\u81EA\u52A8\u8D2D\u4E70\u7269\u54C1\uFF0C\u9700\u5F00\u542F\u76F8\u5173\u529F\u80FD\uFF09\n\u53EA\u5728\u8BBA\u575B\u9996\u9875\u548C\u4E89\u593A\u9996\u9875\u751F\u6548\uFF08\u4E0D\u5F00\u542F\u6B64\u6A21\u5F0F\u7684\u8BDD\u53EA\u80FD\u5728\u5237\u65B0\u9875\u9762\u540E\u624D\u4F1A\u8FDB\u884C\u64CD\u4F5C\uFF09\">[?]</span>\n        </label>\n      </legend>\n      <label>\n        \u6807\u9898\u63D0\u793A\u65B9\u6848\n        <select name=\"showTimingModeTipsType\">\n          <option value=\"auto\">\u505C\u7559\u4E00\u5206\u949F\u540E\u663E\u793A</option>\n          <option value=\"always\">\u603B\u662F\u663E\u793A</option>\n          <option value=\"never\">\u4E0D\u663E\u793A</option>\n        </select>\n        <span class=\"pd_cfg_tips\" title=\"\u5728\u9996\u9875\u7684\u7F51\u9875\u6807\u9898\u4E0A\u663E\u793A\u5B9A\u65F6\u6A21\u5F0F\u63D0\u793A\u7684\u65B9\u6848\">[?]</span>\n      </label>\n    </fieldset>\n    <fieldset>\n      <legend>\n        <label>\u81EA\u52A8\u9886\u53D6\u6BCF\u65E5\u5956\u52B1</label>\n      </legend>\n      <label>\n        <input name=\"autoGetDailyBonusEnabled\" type=\"checkbox\"> \u81EA\u52A8\u9886\u53D6\u6BCF\u65E5\u5956\u52B1\n        <span class=\"pd_cfg_tips\" title=\"\u6BCF\u5929\u81EA\u52A8\u9886\u53D6\u6BCF\u65E5\u5956\u52B1\">[?]</span>\n      </label>\n    </fieldset>\n    <fieldset>\n      <legend>\n        <label><input name=\"autoPromoteHaloEnabled\" type=\"checkbox\"> \u81EA\u52A8\u63D0\u5347\u6218\u529B\u5149\u73AF</label>\n      </legend>\n      <label>\n        \u82B1\u8D39\n        <select name=\"promoteHaloCostType\" required>\n          <option value=\"1\">100KFB</option>\n          <option value=\"2\">1000KFB</option>\n          <option value=\"11\">0.2\u8D21\u732E</option>\n          <option value=\"12\">2\u8D21\u732E</option>\n        </select>\n        <span class=\"pd_cfg_tips\" title=\"\u63D0\u5347\u6218\u529B\u5149\u73AF\u7684\u82B1\u8D39\u7C7B\u578B\">[?]</span>\n      </label>\n      <label class=\"pd_cfg_ml\">\n         \u9AD8\u4E8E <input name=\"promoteHaloLimit\" type=\"number\" min=\"0\" step=\"0.1\" style=\"width: 55px;\" required>\n         <span data-id=\"promoteHaloLimitUnit\">KFB</span>\u65F6\n         <span class=\"pd_cfg_tips\" title=\"\u5728\u64CD\u4F5C\u540E\u6240\u5269\u4F59\u7684KFB\u6216\u8D21\u732E\u9AD8\u4E8E\u6307\u5B9A\u503C\u65F6\u624D\u81EA\u52A8\u63D0\u5347\u6218\u529B\u5149\u73AF\uFF0C\u8BBE\u4E3A0\u8868\u793A\u4E0D\u9650\u5236\">[?]</span>\n      </label><br>\n      <label>\n        \u6BCF\u9694 <input name=\"promoteHaloInterval\" type=\"number\" min=\"8\" style=\"width: 40px;\" required> \u5C0F\u65F6\n        <span class=\"pd_cfg_tips\" title=\"\u81EA\u52A8\u63D0\u5347\u6218\u529B\u5149\u73AF\u7684\u95F4\u9694\u65F6\u95F4\uFF0C\u6700\u4F4E\u503C\uFF1A8\u5C0F\u65F6\">[?]</span>\n      </label>\n      <label class=\"pd_cfg_ml\">\n        <input name=\"promoteHaloAutoIntervalEnabled\" type=\"checkbox\" data-mutex=\"[name=promoteHaloInterval]\"> \u81EA\u52A8\u5224\u65AD\n        <span class=\"pd_cfg_tips\" title=\"\u81EA\u52A8\u5224\u65AD\u63D0\u5347\u6218\u529B\u5149\u73AF\u7684\u95F4\u9694\u65F6\u95F4\uFF08\u5728\u6709\u5269\u4F59\u6B21\u6570\u65F6\u5C3D\u53EF\u80FD\u4F7F\u7528\uFF09\">[?]</span>\n      </label>\n    </fieldset>\n    <fieldset>\n      <legend>\n        <label><input name=\"autoBuyItemEnabled\" type=\"checkbox\"> \u81EA\u52A8\u8D2D\u4E70\u7269\u54C1</label>\n      </legend>\n      <label>\n        \u7269\u54C1ID\u5217\u8868 <input name=\"buyItemIdList\" type=\"text\" maxlength=\"50\" style=\"width: 150px;\">\n      </label>\n      <a class=\"pd_cfg_ml\" data-name=\"openBuyItemTipsDialog\" href=\"#\">\u8BE6\u7EC6\u8BF4\u660E&raquo;</a><br>\n      <label>\n        \u5728 <input name=\"buyItemAfterTime\" type=\"text\" maxlength=\"8\" style=\"width: 55px;\" required> \u4E4B\u540E\u8D2D\u4E70\u7269\u54C1\n        <span class=\"pd_cfg_tips\" title=\"\u5728\u5F53\u5929\u7684\u6307\u5B9A\u65F6\u95F4\u4E4B\u540E\u8D2D\u4E70\u7269\u54C1\uFF08\u672C\u5730\u65F6\u95F4\uFF09\uFF0C\u4F8B\uFF1A00:40:00\uFF08\u6CE8\uFF1A\u8BF7\u4E0D\u8981\u8BBE\u7F6E\u4E3A\u572800:25:00\u4E4B\u524D\u7684\u65F6\u95F4\uFF09\">[?]</span>\n      </label>\n    </fieldset>\n    <fieldset>\n      <legend>\u9996\u9875\u76F8\u5173</legend>\n      <label hidden>\n        <input name=\"smLevelUpAlertEnabled\" type=\"checkbox\"> \u795E\u79D8\u7B49\u7EA7\u5347\u7EA7\u63D0\u9192\n        <span class=\"pd_cfg_tips\" title=\"\u5728\u795E\u79D8\u7B49\u7EA7\u5347\u7EA7\u540E\u8FDB\u884C\u63D0\u9192\uFF0C\u53EA\u5728\u9996\u9875\u751F\u6548\">[?]</span>\n      </label>\n      <label class=\"pd_cfg_ml\" hidden>\n        <input name=\"smRankChangeAlertEnabled\" type=\"checkbox\"> \u7CFB\u6570\u6392\u540D\u53D8\u5316\u63D0\u9192\n        <span class=\"pd_cfg_tips\" title=\"\u5728\u795E\u79D8\u7CFB\u6570\u6392\u540D\u53D1\u751F\u53D8\u5316\u65F6\u8FDB\u884C\u63D0\u9192\uFF0C\u53EA\u5728\u9996\u9875\u751F\u6548\">[?]</span>\n      </label><br hidden>\n      <label>\n        <input name=\"homePageThreadFastGotoLinkEnabled\" type=\"checkbox\"> \u4E3A\u9996\u9875\u5E16\u5B50\u52A0\u4E0A\u8DF3\u8F6C\u81F3\u9875\u672B\u94FE\u63A5\n        <span class=\"pd_cfg_tips\" title=\"\u5F00\u542F\u6B64\u529F\u80FD\u540E\uFF0C\u70B9\u51FB\u9996\u9875\u5E16\u5B50\u94FE\u63A5\u53F3\u4FA7\u7684\u56DE\u590D\u65F6\u95F4\u90E8\u5206\u5373\u53EF\u5FEB\u901F\u8DF3\u8F6C\u81F3\u5E16\u5B50\u9875\u672B\">[?]</span>\n      </label>\n    </fieldset>\n    <fieldset>\n      <legend>\u7248\u5757\u9875\u9762\u76F8\u5173</legend>\n      <label>\n        <input name=\"showFastGotoThreadPageEnabled\" type=\"checkbox\" data-disabled=\"[name=maxFastGotoThreadPageNum]\"> \u663E\u793A\u5E16\u5B50\u9875\u6570\u5FEB\u6377\u94FE\u63A5\n        <span class=\"pd_cfg_tips\" title=\"\u5728\u7248\u5757\u9875\u9762\u4E2D\u663E\u793A\u5E16\u5B50\u9875\u6570\u5FEB\u6377\u94FE\u63A5\">[?]</span>\n      </label>\n      <label class=\"pd_cfg_ml\">\n        \u9875\u6570\u94FE\u63A5\u6700\u5927\u6570\u91CF <input name=\"maxFastGotoThreadPageNum\" type=\"number\" min=\"1\" max=\"10\" style=\"width: 40px;\" required>\n        <span class=\"pd_cfg_tips\" title=\"\u5728\u5E16\u5B50\u9875\u6570\u5FEB\u6377\u94FE\u63A5\u4E2D\u663E\u793A\u9875\u6570\u94FE\u63A5\u7684\u6700\u5927\u6570\u91CF\">[?]</span>\n      </label><br>\n      <label>\n        <input name=\"highlightNewPostEnabled\" type=\"checkbox\"> \u9AD8\u4EAE\u4ECA\u65E5\u7684\u65B0\u5E16\n        <span class=\"pd_cfg_tips\" title=\"\u5728\u7248\u5757\u9875\u9762\u4E2D\u9AD8\u4EAE\u4ECA\u65E5\u65B0\u53D1\u8868\u5E16\u5B50\u7684\u53D1\u8868\u65F6\u95F4\">[?]</span>\n      </label>\n    </fieldset>\n    <fieldset>\n      <legend>\u5173\u6CE8\u548C\u5C4F\u853D</legend>\n      <label>\n        <input name=\"followUserEnabled\" type=\"checkbox\" data-disabled=\"[data-name=openFollowUserDialog]\"> \u5173\u6CE8\u7528\u6237\n        <span class=\"pd_cfg_tips\" title=\"\u5F00\u542F\u5173\u6CE8\u7528\u6237\u7684\u529F\u80FD\uFF0C\u6240\u5173\u6CE8\u7684\u7528\u6237\u5C06\u88AB\u52A0\u6CE8\u8BB0\u53F7\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u7BA1\u7406\u5173\u6CE8\u7528\u6237\">[?]</span>\n      </label>\n      <a class=\"pd_cfg_ml\" data-name=\"openFollowUserDialog\" href=\"#\">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n      <label>\n        <input name=\"blockUserEnabled\" type=\"checkbox\" data-disabled=\"[data-name=openBlockUserDialog]\"> \u5C4F\u853D\u7528\u6237\n        <span class=\"pd_cfg_tips\" title=\"\u5F00\u542F\u5C4F\u853D\u7528\u6237\u7684\u529F\u80FD\uFF0C\u4F60\u5C06\u770B\u4E0D\u89C1\u6240\u5C4F\u853D\u7528\u6237\u7684\u53D1\u8A00\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u7BA1\u7406\u5C4F\u853D\u7528\u6237\">[?]</span>\n      </label>\n      <a class=\"pd_cfg_ml\" data-name=\"openBlockUserDialog\" href=\"#\">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n      <label>\n        <input name=\"blockThreadEnabled\" type=\"checkbox\" data-disabled=\"[data-name=openBlockThreadDialog]\"> \u5C4F\u853D\u5E16\u5B50\n        <span class=\"pd_cfg_tips\" title=\"\u5F00\u542F\u5C4F\u853D\u6807\u9898\u4E2D\u5305\u542B\u6307\u5B9A\u5173\u952E\u5B57\u7684\u5E16\u5B50\u7684\u529F\u80FD\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u7BA1\u7406\u5C4F\u853D\u5173\u952E\u5B57\">[?]</span>\n      </label>\n      <a class=\"pd_cfg_ml\" data-name=\"openBlockThreadDialog\" href=\"#\">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n    </fieldset>\n  </div>\n\n  <div class=\"pd_cfg_panel\">\n    <fieldset>\n      <legend>\u5E16\u5B50\u9875\u9762\u76F8\u5173</legend>\n      <label>\n        \u5E16\u5B50\u6BCF\u9875\u697C\u5C42\u6570\u91CF\n        <select name=\"perPageFloorNum\">\n          <option value=\"10\">10</option>\n          <option value=\"20\">20</option>\n          <option value=\"30\">30</option>\n        </select>\n        <span class=\"pd_cfg_tips\" title=\"\u7528\u4E8E\u7535\u68AF\u76F4\u8FBE\u548C\u5E16\u5B50\u9875\u6570\u5FEB\u6377\u94FE\u63A5\u7B49\u529F\u80FD\uFF0C\u5982\u679C\u4FEE\u6539\u4E86\u8BBA\u575B\u8BBE\u7F6E\u91CC\u7684\u201C\u6587\u7AE0\u5217\u8868\u6BCF\u9875\u4E2A\u6570\u201D\uFF0C\u8BF7\u5728\u6B64\u4FEE\u6539\u6210\u76F8\u540C\u7684\u6570\u76EE\">[?]</span>\n      </label>\n      <label class=\"pd_cfg_ml\">\n        \u5E16\u5B50\u5185\u5BB9\u5B57\u4F53\u5927\u5C0F <input name=\"threadContentFontSize\" type=\"number\" min=\"7\" max=\"72\" style=\"width: 40px;\"> px\n        <span class=\"pd_cfg_tips\" title=\"\u5E16\u5B50\u5185\u5BB9\u5B57\u4F53\u5927\u5C0F\uFF0C\u7559\u7A7A\u8868\u793A\u4F7F\u7528\u9ED8\u8BA4\u5927\u5C0F\uFF0C\u63A8\u8350\u503C\uFF1A14\">[?]</span>\n      </label><br>\n      <label>\n        <input name=\"turnPageViaKeyboardEnabled\" type=\"checkbox\"> \u901A\u8FC7\u5DE6\u53F3\u952E\u7FFB\u9875\n        <span class=\"pd_cfg_tips\" title=\"\u5728\u5E16\u5B50\u548C\u641C\u7D22\u9875\u9762\u901A\u8FC7\u5DE6\u53F3\u952E\u8FDB\u884C\u7FFB\u9875\">[?]</span>\n      </label>\n      <label class=\"pd_cfg_ml\">\n        <input name=\"kfSmileEnhanceExtensionEnabled\" type=\"checkbox\" ".concat(Info_default.isInSpecialDomain ? "" : "disabled", "> \u5F00\u542F\u7EEF\u6708\u8868\u60C5\u589E\u5F3A\u63D2\u4EF6\n        <span class=\"pd_cfg_tips\" title=\"\u5728\u53D1\u5E16\u6846\u4E0A\u663E\u793A\u7EEF\u6708\u8868\u60C5\u589E\u5F3A\u63D2\u4EF6\uFF08\u4EC5\u5728miaola.work\u57DF\u540D\u4E0B\u751F\u6548\uFF09\">[?]</span>\n      </label><br>\n      <label>\n        <input name=\"autoChangeIdColorEnabled\" type=\"checkbox\" data-disabled=\"[data-name=openAutoChangeSmColorPage]\"> \u81EA\u52A8\u66F4\u6362ID\u989C\u8272\n        <span class=\"pd_cfg_tips\" title=\"\u53EF\u81EA\u52A8\u66F4\u6362ID\u989C\u8272\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u524D\u5F80\u76F8\u5E94\u9875\u9762\u8FDB\u884C\u81EA\u5B9A\u4E49\u8BBE\u7F6E\">[?]</span>\n      </label>\n      <a data-name=\"openAutoChangeSmColorPage\" class=\"pd_cfg_ml\" target=\"_blank\" href=\"kf_growup.php\">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n      <label>\n        \u81EA\u5B9A\u4E49\u672C\u4EBA\u7684\u795E\u79D8\u989C\u8272 <input name=\"customMySmColor\" maxlength=\"7\" style=\"width: 50px;\" type=\"text\">\n        <input style=\"margin-left: 0;\" type=\"color\" data-name=\"customMySmColorSelect\">\n        <span class=\"pd_cfg_tips\" title=\"\u81EA\u5B9A\u4E49\u672C\u4EBA\u7684\u795E\u79D8\u989C\u8272\uFF08\u5305\u62EC\u5E16\u5B50\u9875\u9762\u7684ID\u663E\u793A\u989C\u8272\u548C\u697C\u5C42\u8FB9\u6846\u989C\u8272\uFF0C\u4EC5\u81EA\u5DF1\u53EF\u89C1\uFF09\uFF0C\u4F8B\uFF1A#009cff\uFF0C\u5982\u65E0\u9700\u6C42\u53EF\u7559\u7A7A\">[?]</span>\n      </label><br>\n      <label>\n        <input name=\"userMemoEnabled\" type=\"checkbox\" data-disabled=\"[data-name=openUserMemoDialog]\"> \u663E\u793A\u7528\u6237\u5907\u6CE8\n        <span class=\"pd_cfg_tips\" title=\"\u5728\u697C\u5C42\u5185\u7684\u7528\u6237\u540D\u65C1\u663E\u793A\u8BE5\u7528\u6237\u7684\u81EA\u5B9A\u4E49\u5907\u6CE8\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u81EA\u5B9A\u4E49\u7528\u6237\u5907\u6CE8\">[?]</span>\n      </label>\n      <a class=\"pd_cfg_ml\" data-name=\"openUserMemoDialog\" href=\"#\">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n      <label>\n        <input name=\"modifyKfOtherDomainEnabled\" type=\"checkbox\"> \u5C06\u7EEF\u6708\u5176\u5B83\u57DF\u540D\u7684\u94FE\u63A5\u4FEE\u6539\u4E3A\u5F53\u524D\u57DF\u540D\n        <span class=\"pd_cfg_tips\" title=\"\u5C06\u5E16\u5B50\u548C\u77ED\u6D88\u606F\u4E2D\u7684\u7EEF\u6708\u5176\u5B83\u57DF\u540D\u7684\u94FE\u63A5\u4FEE\u6539\u4E3A\u5F53\u524D\u57DF\u540D\">[?]</span>\n      </label><br>\n      <label>\n        <input name=\"multiQuoteEnabled\" type=\"checkbox\"> \u5F00\u542F\u591A\u91CD\u5F15\u7528\u529F\u80FD\n        <span class=\"pd_cfg_tips\" title=\"\u5728\u5E16\u5B50\u9875\u9762\u5F00\u542F\u591A\u91CD\u56DE\u590D\u548C\u591A\u91CD\u5F15\u7528\u529F\u80FD\">[?]</span>\n      </label>\n      <label class=\"pd_cfg_ml\">\n        <input name=\"parseMediaTagEnabled\" type=\"checkbox\"> \u89E3\u6790\u591A\u5A92\u4F53\u6807\u7B7E\n        <span class=\"pd_cfg_tips\" title=\"\u5728\u5E16\u5B50\u9875\u9762\u89E3\u6790HTML5\u591A\u5A92\u4F53\u6807\u7B7E\uFF0C\u8BE6\u89C1\u3010\u5E38\u89C1\u95EE\u989812\u3011\">[?]</span>\n      </label><br>\n      <label>\n        <input name=\"buyThreadNoJumpEnabled\" type=\"checkbox\" data-disabled=\"[name=saveBuyThreadLogEnabled]\" data-mutex=\"true\"> \u8D2D\u4E70\u5E16\u5B50\u65F6\u4E0D\u8DF3\u8F6C\n        <span class=\"pd_cfg_tips\" title=\"\u4F7F\u7528Ajax\u7684\u65B9\u5F0F\u8D2D\u4E70\u5E16\u5B50\uFF0C\u8D2D\u4E70\u65F6\u9875\u9762\u4E0D\u4F1A\u8DF3\u8F6C\">[?]</span>\n      </label>\n      <label class=\"pd_cfg_ml\">\n        <input name=\"saveBuyThreadLogEnabled\" type=\"checkbox\"> \u4FDD\u5B58\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55\n        <span class=\"pd_cfg_tips\" title=\"\u81EA\u52A8\u4FDD\u5B58\u8D2D\u4E70\u5E16\u5B50\u7684\u8BB0\u5F55\uFF0C\u53EF\u5728\u52A9\u624B\u65E5\u5FD7\u6216\u8D2D\u4E70\u4EBA\u540D\u5355\u91CC\u70B9\u51FB\u67E5\u770B\u8D2D\u4E70\u8BB0\u5F55\uFF08\u9700\u540C\u65F6\u5F00\u542F\u201C\u8D2D\u4E70\u5E16\u5B50\u65F6\u4E0D\u8DF3\u8F6C\u201D\u7684\u529F\u80FD\uFF09\">[?]</span>\n      </label><br>\n      <label>\n        <input name=\"preventCloseWindowWhenEditPostEnabled\" type=\"checkbox\"> \u5199\u5E16\u5B50\u65F6\u963B\u6B62\u5173\u95ED\u9875\u9762\n        <span class=\"pd_cfg_tips\" title=\"\u5728\u64B0\u5199\u53D1\u5E16\u5185\u5BB9\u65F6\uFF0C\u5982\u4E0D\u5C0F\u5FC3\u5173\u95ED\u4E86\u9875\u9762\u4F1A\u8FDB\u884C\u63D0\u793A\">[?]</span>\n      </label>\n      <label class=\"pd_cfg_ml\">\n        <input name=\"autoSavePostContentWhenSubmitEnabled\" type=\"checkbox\"> \u63D0\u4EA4\u65F6\u4FDD\u5B58\u53D1\u5E16\u5185\u5BB9\n        <span class=\"pd_cfg_tips\" title=\"\u5728\u63D0\u4EA4\u65F6\u81EA\u52A8\u4FDD\u5B58\u53D1\u5E16\u5185\u5BB9\uFF0C\u4EE5\u4FBF\u5728\u51FA\u73B0\u610F\u5916\u60C5\u51B5\u65F6\u80FD\u591F\u6062\u590D\u53D1\u5E16\u5185\u5BB9\uFF08\u9700\u5728\u4E0D\u5173\u95ED\u5F53\u524D\u6807\u7B7E\u9875\u7684\u60C5\u51B5\u4E0B\u624D\u80FD\u8D77\u6548\uFF09\">[?]</span>\n      </label><br>\n      <label>\n        <input name=\"autoReplaceManualOpenImgLinkEnabled\" type=\"checkbox\"> \u81EA\u52A8\u66FF\u6362\u624B\u52A8\u6253\u5F00\u56FE\u7247\u94FE\u63A5\n        <span class=\"pd_cfg_tips\" title=\"\u81EA\u52A8\u5C06\u8D44\u6E90\u677F\u5757\u5E16\u5B50\u4E2D\u7684\u201C\u8BF7\u624B\u52A8\u70B9\u51FB\u6253\u5F00\u672C\u56FE\u7247\u201D\u94FE\u63A5\u66FF\u6362\u4E3A\u5B9E\u9645\u56FE\u7247\">[?]</span>\n      </label>\n    </fieldset>\n    <fieldset>\n      <legend>\u5176\u5B83\u8BBE\u7F6E</legend>\n      <label class=\"pd_highlight\">\n        \u5B58\u50A8\u7C7B\u578B\n        <select data-name=\"storageType\">\n          <option value=\"Default\">\u9ED8\u8BA4</option>\n          <option value=\"ByUid\">\u6309uid</option>\n          <option value=\"Global\">\u5168\u5C40</option>\n        </select>\n        <span class=\"pd_cfg_tips\" title=\"\u52A9\u624B\u8BBE\u7F6E\u548C\u65E5\u5FD7\u7684\u5B58\u50A8\u65B9\u5F0F\uFF0C\u8BE6\u60C5\u53C2\u89C1\u3010\u5E38\u89C1\u95EE\u98981\u3011\">[?]</span>\n      </label>\n      <label class=\"pd_cfg_ml\">\n        \u6D4F\u89C8\u5668\u7C7B\u578B\n        <select name=\"browseType\">\n          <option value=\"auto\">\u81EA\u52A8\u68C0\u6D4B</option>\n          <option value=\"desktop\">\u684C\u9762\u7248</option>\n          <option value=\"mobile\">\u79FB\u52A8\u7248</option>\n        </select>\n        <span class=\"pd_cfg_tips\" title=\"\u7528\u4E8E\u5728KFOL\u52A9\u624B\u4E0A\u5224\u65AD\u6D4F\u89C8\u5668\u7684\u7C7B\u578B\uFF0C\u4E00\u822C\u4F7F\u7528\u81EA\u52A8\u68C0\u6D4B\u5373\u53EF\uFF1B\n\u5982\u679C\u5F53\u524D\u6D4F\u89C8\u5668\u4E0E\u81EA\u52A8\u68C0\u6D4B\u7684\u7C7B\u578B\u4E0D\u76F8\u7B26\uFF08\u79FB\u52A8\u7248\u4F1A\u5728\u8BBE\u7F6E\u754C\u9762\u6807\u9898\u4E0A\u663E\u793A\u201CFor Mobile\u201D\u7684\u5B57\u6837\uFF09\uFF0C\u8BF7\u624B\u52A8\u8BBE\u7F6E\u4E3A\u6B63\u786E\u7684\u7C7B\u578B\">[?]</span>\n      </label><br>\n      <label>\n        \u6D88\u606F\u663E\u793A\u65F6\u95F4 <input name=\"defShowMsgDuration\" type=\"number\" min=\"-1\" style=\"width: 46px;\" required> \u79D2\n        <span class=\"pd_cfg_tips\" title=\"\u9ED8\u8BA4\u7684\u6D88\u606F\u663E\u793A\u65F6\u95F4\uFF08\u79D2\uFF09\uFF0C\u8BBE\u7F6E\u4E3A-1\u8868\u793A\u6C38\u4E45\u663E\u793A\uFF0C\u4F8B\uFF1A15\uFF08\u9ED8\u8BA4\u503C\uFF1A-1\uFF09\">[?]</span>\n      </label>\n      <label class=\"pd_cfg_ml\">\n        \u65E5\u5FD7\u4FDD\u5B58\u5929\u6570 <input name=\"logSaveDays\" type=\"number\" min=\"1\" max=\"270\" style=\"width: 46px;\" required>\n        <span class=\"pd_cfg_tips\" title=\"\u65E5\u5FD7\u4FDD\u5B58\u5929\u6570\uFF0C\u9ED8\u8BA4\u503C\uFF1A").concat(Config2.logSaveDays, "\uFF0C\u6700\u5927\u503C\uFF1A270\">[?]</span>\n      </label><br>\n      <label>\n        <input name=\"showSearchLinkEnabled\" type=\"checkbox\"> \u663E\u793A\u641C\u7D22\u94FE\u63A5\n        <span class=\"pd_cfg_tips\" title=\"\u5728\u7528\u6237\u83DC\u5355\u4E0A\u663E\u793A\u641C\u7D22\u5BF9\u8BDD\u6846\u7684\u94FE\u63A5\">[?]</span>\n      </label>\n      <label class=\"pd_cfg_ml\">\n        <input name=\"animationEffectOffEnabled\" type=\"checkbox\"> \u7981\u7528\u52A8\u753B\u6548\u679C\n        <span class=\"pd_cfg_tips\" title=\"\u7981\u7528jQuery\u7684\u52A8\u753B\u6548\u679C\uFF08\u63A8\u8350\u5728\u914D\u7F6E\u8F83\u5DEE\u7684\u673A\u5668\u4E0A\u4F7F\u7528\uFF09\">[?]</span>\n      </label><br>\n      <label>\n        <input name=\"addFastNavMenuEnabled\" type=\"checkbox\"> \u6DFB\u52A0\u5FEB\u6377\u5BFC\u822A\u83DC\u5355\n        <span class=\"pd_cfg_tips\" title=\"\u4E3A\u9876\u90E8\u5BFC\u822A\u680F\u6DFB\u52A0\u5FEB\u6377\u5BFC\u822A\u83DC\u5355\">[?]</span>\n      </label>\n      <label class=\"pd_cfg_ml\">\n        <input name=\"changeNewTipsColorEnabled\" type=\"checkbox\"> \u4FEE\u6539\u65B0\u63D0\u9192\u989C\u8272\n        <span class=\"pd_cfg_tips\" title=\"\u4FEE\u6539\u9876\u90E8\u7528\u6237\u83DC\u5355\u7684\u65B0\u63D0\u9192\u7684\u989C\u8272\uFF0C\u53EF\u6839\u636E\u4E0D\u540C\u7684\u6D88\u606F\u63D0\u9192\uFF08\u65B0\u77ED\u4FE1\u3001\u65B0\u56DE\u590D\u3001\u65B0\u8BC4\u5206\uFF09\uFF0C\u5206\u522B\u8BBE\u5B9A\u4E0D\u540C\u7684\u989C\u8272\">[?]</span>\n      </label><br>\n      <label>\n        <input name=\"customCssEnabled\" type=\"checkbox\" data-disabled=\"[data-name=openCustomCssDialog]\"> \u6DFB\u52A0\u81EA\u5B9A\u4E49CSS\n        <span class=\"pd_cfg_tips\" title=\"\u4E3A\u9875\u9762\u6DFB\u52A0\u81EA\u5B9A\u4E49\u7684CSS\u5185\u5BB9\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u586B\u5165\u81EA\u5B9A\u4E49\u7684CSS\u5185\u5BB9\">[?]</span>\n      </label>\n      <a class=\"pd_cfg_ml\" data-name=\"openCustomCssDialog\" href=\"#\">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n      <label>\n        <input name=\"customScriptEnabled\" type=\"checkbox\" data-disabled=\"[data-name=openCustomScriptDialog]\"> \u6267\u884C\u81EA\u5B9A\u4E49\u811A\u672C\n        <span class=\"pd_cfg_tips\" title=\"\u6267\u884C\u81EA\u5B9A\u4E49\u7684javascript\u811A\u672C\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u586B\u5165\u81EA\u5B9A\u4E49\u7684\u811A\u672C\u5185\u5BB9\">[?]</span>\n      </label>\n      <a class=\"pd_cfg_ml\" data-name=\"openCustomScriptDialog\" href=\"#\">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n      <label>\n        <input name=\"adminMemberEnabled\" type=\"checkbox\"> \u6211\u662F\u7BA1\u7406\u6210\u5458\n        <span class=\"pd_cfg_tips\" title=\"\u7BA1\u7406\u6210\u5458\u53EF\u5F00\u542F\u6B64\u529F\u80FD\uFF0C\u52A9\u624B\u4F1A\u5F00\u542F\u90E8\u5206\u53EA\u6709\u7BA1\u7406\u6210\u5458\u624D\u80FD\u4F7F\u7528\u7684\u529F\u80FD\uFF0C\u975E\u7BA1\u7406\u6210\u5458\u5F00\u542F\u6B64\u529F\u80FD\u65E0\u6548\">[?]</span>\n      </label>\n      <label class=\"pd_cfg_ml\">\n        <input name=\"navBarAlwaysTopEnabled\" type=\"checkbox\"> \u4FDD\u6301\u5BFC\u822A\u680F\u7F6E\u9876\n        <span class=\"pd_cfg_tips\" title=\"\u4FDD\u6301\u9876\u90E8\u5BFC\u822A\u680F\u7F6E\u9876\uFF08\u65E7\u7248\u672C\u6D4F\u89C8\u5668\u53EF\u80FD\u65E0\u6CD5\u751F\u6548\uFF09\">[?]</span>\n      </label><br>\n      <label>\n        <input name=\"showGuGuZhenInFastNavEnabled\" type=\"checkbox\" ").concat(Info_default.isInSpecialDomain ? "" : "disabled", "> \u5FEB\u6377\u5BFC\u822A\u663E\u793A\u5495\u5495\u9547\n        <span class=\"pd_cfg_tips\" title=\"\u5728\u5FEB\u6377\u5BFC\u822A\u4E2D\u663E\u793A\u5495\u5495\u9547\u7684\u94FE\u63A5\">[?]</span>\n      </label>\n    </fieldset>\n  </div>\n</div>\n\n<div class=\"pd_cfg_btns\">\n  <span class=\"pd_cfg_about\">\n    <a target=\"_blank\" href=\"read.php?tid=508450&sf=140\">By \u55B5\u62C9\u5E03\u4E01</a>\n    <i style=\"color: #666; font-style: normal;\">(V").concat(Info_default.version, ")</i>\n    <a target=\"_blank\" href=\"https://gitee.com/miaolapd/KF_Online_Assistant/wikis/pages?title=%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98\">[\u5E38\u89C1\u95EE\u9898]</a>\n  </span>\n  <button type=\"submit\">\u4FDD\u5B58</button>\n  <button data-action=\"close\" type=\"button\">\u53D6\u6D88</button>\n  <button name=\"default\" type=\"button\">\u9ED8\u8BA4\u503C</button>\n</div>");
        var $dialog2 = _create(dialogName2, "KFOL\u52A9\u624B\u8BBE\u7F6E" + (Info_default.isMobile ? " (For Mobile)" : ""), html2);
        $dialog2.submit(function (e) {
          e.preventDefault();
          if (!verifyMainConfig($dialog2)) return;
          var oriAutoRefreshEnabled = Config.timingModeEnabled;
          read3();
          var options = getMainConfigValue($dialog2);
          options = _normalize(options);
          $.extend(Config, options);
          write3();
          var storageType = $dialog2.find('[data-name="storageType"]').val();
          if (storageType !== Info_default.storageType) {
            if (!confirm("\u662F\u5426\u4FEE\u6539\u5B58\u50A8\u7C7B\u578B\uFF1F")) return;
            _changeStorageType(storageType);
            alert("\u5B58\u50A8\u7C7B\u578B\u5DF2\u4FEE\u6539");
            location.reload();
            return;
          }
          _close(dialogName2);
          if (oriAutoRefreshEnabled !== options.timingModeEnabled) {
            if (confirm("\u4F60\u5DF2\u4FEE\u6539\u4E86\u5B9A\u65F6\u6A21\u5F0F\u7684\u8BBE\u7F6E\uFF0C\u9700\u8981\u5237\u65B0\u9875\u9762\u624D\u80FD\u751F\u6548\uFF0C\u662F\u5426\u7ACB\u5373\u5237\u65B0\uFF1F")) {
              location.reload();
            }
          }
        }).find('[name="default"]').click(function () {
          if (confirm("\u662F\u5426\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\uFF1F")) {
            clear3();
            alert("\u8BBE\u7F6E\u5DF2\u91CD\u7F6E");
            location.reload();
          }
        });
        $dialog2.on("click", 'a[data-name^="open"][href="#"]', function (e) {
          e.preventDefault();
          var $this2 = $(this);
          if ($this2.hasClass("pd_disabled_link")) return;
          var name4 = $this2.data("name");
          if (name4 === "openClearDataDialog") showClearDataDialog();else if (name4 === "openRumCommandDialog") showRunCommandDialog();else if (name4 === "openImportOrExportSettingDialog") showImportOrExportSettingDialog();else if (name4 === "openBuyItemTipsDialog") showBuyItemTipsDialog();else if (name4 === "openCustomSmColorDialog") showCustomSmColorDialog();else if (name4 === "openUserMemoDialog") showUserMemoDialog();else if (name4 === "openCustomCssDialog") showCustomCssDialog();else if (name4 === "openCustomScriptDialog") _showDialog();else if (name4 === "openFollowUserDialog") showFollowUserDialog();else if (name4 === "openBlockUserDialog") showBlockUserDialog();else if (name4 === "openBlockThreadDialog") showBlockThreadDialog();
        }).find('[name="promoteHaloCostType"]').change(function () {
          var typeId = parseInt($(this).val());
          $dialog2.find('[data-id="promoteHaloLimitUnit"]').text(typeId >= 11 ? "\u8D21\u732E" : "KFB");
        }).end().find('[data-name="customMySmColorSelect"]').change(function () {
          $dialog2.find('[name="customMySmColor"]').val($(this).val().toString().toLowerCase());
        }).end().find('[name="customMySmColor"]').change(function () {
          var color = $.trim($(this).val());
          if (/^#[0-9a-fA-F]{6}$/.test(color)) $dialog2.find('[data-name="customMySmColorSelect"]').val(color.toLowerCase());
        });
        setMainConfigValue($dialog2);
        show2(dialogName2);
        _runFunc("ConfigDialog.show_after_");
      };
      setMainConfigValue = function setMainConfigValue($dialog2) {
        $dialog2.find("input[name], select[name]").each(function () {
          var $this2 = $(this);
          var name4 = $this2.attr("name");
          if (name4 in Config) {
            if ($this2.is('[type="checkbox"]') && typeof Config[name4] === "boolean") $this2.prop("checked", Config[name4] === true);else $this2.val(Config[name4]);
          }
        });
        $dialog2.find('[name="promoteHaloCostType"]').trigger("change");
        $dialog2.find('[name="buyItemIdList"]').val(Config.buyItemIdList.join(","));
        $dialog2.find('[name="threadContentFontSize"]').val(Config.threadContentFontSize > 0 ? Config.threadContentFontSize : "");
        $dialog2.find('[data-name="customMySmColorSelect"]').val(Config.customMySmColor);
        $dialog2.find('[data-name="storageType"]').val(Info_default.storageType);
        if (typeof GM_getValue === "undefined") $dialog2.find('[data-name="storageType"] > option:gt(0)').prop("disabled", true);
      };
      getMainConfigValue = function getMainConfigValue($dialog2) {
        var options = {};
        $dialog2.find("input[name], select[name]").each(function () {
          var $this2 = $(this);
          var name4 = $this2.attr("name");
          if (name4 in Config) {
            if ($this2.is('[type="checkbox"]') && typeof Config[name4] === "boolean") {
              options[name4] = Boolean($this2.prop("checked"));
            } else if (typeof Config[name4] === "number") {
              var value = $.trim($this2.val());
              if (/\d+\.\d+/.test(value)) options[name4] = parseFloat(value);else options[name4] = parseInt(value);
              if (name4 === "threadContentFontSize" && isNaN(options[name4])) options[name4] = 0;
            } else {
              options[name4] = $.trim($this2.val());
            }
          }
        });
        if (options.buyItemIdList) options.buyItemIdList = options.buyItemIdList.split(",");else options.buyItemIdList = [];
        return options;
      };
      verifyMainConfig = function verifyMainConfig($dialog2) {
        var $txtBuyItemIdList = $dialog2.find('[name="buyItemIdList"]');
        var buyItemIdList = $.trim($txtBuyItemIdList.val());
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
        var $txtBuyItemAfterTime = $dialog2.find('[name="buyItemAfterTime"]');
        var buyItemAfterTime = $.trim($txtBuyItemAfterTime.val());
        if (!/^(2[0-3]|[0-1][0-9]):[0-5][0-9]:[0-5][0-9]$/.test(buyItemAfterTime)) {
          alert("\u5728\u6307\u5B9A\u65F6\u95F4\u4E4B\u540E\u8D2D\u4E70\u7269\u54C1\u683C\u5F0F\u4E0D\u6B63\u786E");
          $txtBuyItemAfterTime.select().focus();
          return false;
        } else if (buyItemAfterTime < "00:25:00") {
          alert("\u5728\u6307\u5B9A\u65F6\u95F4\u4E4B\u540E\u8D2D\u4E70\u7269\u54C1\u4E0D\u5F97\u5C0F\u4E8E00:25:00");
          $txtBuyItemAfterTime.select().focus();
          return false;
        }
        var $txtCustomMySmColor = $dialog2.find('[name="customMySmColor"]');
        var customMySmColor = $.trim($txtCustomMySmColor.val());
        if (customMySmColor && !/^#[0-9a-fA-F]{6}$/.test(customMySmColor)) {
          alert("\u81EA\u5B9A\u4E49\u672C\u4EBA\u7684\u795E\u79D8\u989C\u8272\u683C\u5F0F\u4E0D\u6B63\u786E\uFF0C\u4F8B\uFF1A#009cff");
          $txtCustomMySmColor.select().focus();
          return false;
        }
        return true;
      };
      showClearDataDialog = function showClearDataDialog() {
        var dialogName2 = "pdClearDataDialog";
        if ($("#" + dialogName2).length > 0) return;
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <fieldset style=\"margin-top: 5px;\">\n    <legend>\u8BF7\u9009\u62E9\u60F3\u6E05\u9664\u7684\u4E34\u65F6\u7F13\u5B58\u6570\u636E\uFF08\u6309<b>Ctrl\u952E</b>\u6216<b>Shift\u952E</b>\u53EF\u591A\u9009\uFF09\uFF1A</legend>\n    <select name=\"caches\" size=\"2\" style=\"width: 340px;\" multiple>\n      <option value=\"cookies\">\u52A9\u624BCookies</option><option value=\"tmpData\">\u52A9\u624B\u4E34\u65F6\u6570\u636E</option>\n    </select>\n  </fieldset>\n  <fieldset style=\"margin-top: 5px;\">\n    <legend>\u8BF7\u9009\u62E9\u60F3\u6E05\u9664\u7684\u8BBE\u7F6E\u6216\u65E5\u5FD7\uFF08\u6309<b>Ctrl\u952E</b>\u6216<b>Shift\u952E</b>\u53EF\u591A\u9009\uFF09\uFF1A</legend>\n    <select name=\"settingsAndLogs\" size=\"5\" style=\"width: 340px;\" multiple>\n      <option value=\"config\">\u52A9\u624B\u8BBE\u7F6E</option><option value=\"log\">\u52A9\u624B\u65E5\u5FD7</option>\n      <option value=\"armsInfo\">\u88C5\u5907\u4FE1\u606F</option><option value=\"buyThreadLog\">\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55</option>\n    </select>\n  </fieldset>\n</div>\n<div class=\"pd_cfg_btns\">\n  <button type=\"submit\" style=\"color: #f00;\">\u6E05\u9664\u6570\u636E</button>\n  <button data-action=\"close\" type=\"button\">\u53D6\u6D88</button>\n</div>";
        var $dialog2 = _create(dialogName2, "\u6E05\u9664\u6570\u636E", html2);
        $dialog2.on("keydown", "select", function (e) {
          if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            $(this).children().prop("selected", true);
          }
        }).submit(function (e) {
          e.preventDefault();
          var caches = $dialog2.find('[name="caches"]').val();
          var settingsAndLogs = $dialog2.find('[name="settingsAndLogs"]').val();
          if (!caches && !settingsAndLogs || !confirm("\u662F\u5426\u6E05\u9664\u9009\u5B9A\u7684\u6570\u636E\uFF1F")) return;
          caches = caches ? caches : [];
          settingsAndLogs = settingsAndLogs ? settingsAndLogs : [];
          var _iterator20 = _createForOfIteratorHelper(caches),
            _step20;
          try {
            for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
              var name4 = _step20.value;
              _clearData(name4);
            }
          } catch (err) {
            _iterator20.e(err);
          } finally {
            _iterator20.f();
          }
          var _iterator21 = _createForOfIteratorHelper(settingsAndLogs),
            _step21;
          try {
            for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
              var _name = _step21.value;
              _clearData(_name);
            }
          } catch (err) {
            _iterator21.e(err);
          } finally {
            _iterator21.f();
          }
          alert("\u9009\u5B9A\u7684\u6570\u636E\u5DF2\u6E05\u9664");
          location.reload();
        });
        show2(dialogName2);
        _runFunc("ConfigDialog.showClearDataDialog_after_");
      };
      showRunCommandDialog = function showRunCommandDialog() {
        var dialogName2 = "pdRunCommandDialog";
        if ($("#" + dialogName2).length > 0) return;
        _close("pdConfigDialog");
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <div style=\"margin: 5px 0;\">\n    \u8FD0\u884C\u547D\u4EE4\u5FEB\u6377\u952E\uFF1A<b>Ctrl+Enter</b>\uFF1B\u6E05\u9664\u547D\u4EE4\u5FEB\u6377\u952E\uFF1A<b>Ctrl+\u9000\u683C\u952E</b><br>\n    \u6309<b>F12\u952E</b>\u53EF\u6253\u5F00\u6D4F\u89C8\u5668\u63A7\u5236\u53F0\u67E5\u770B\u6D88\u606F\uFF08\u9700\u5207\u6362\u81F3\u63A7\u5236\u53F0\u6216Console\u6807\u7B7E\uFF09\n  </div>\n  <textarea name=\"cmd\" wrap=\"off\" style=\"width: 750px; height: 300px; white-space: pre;\"></textarea>\n</div>\n<div class=\"pd_cfg_btns\">\n  <button type=\"submit\">\u8FD0\u884C</button>\n  <button name=\"clear\" type=\"button\">\u6E05\u9664</button>\n  <button data-action=\"close\" type=\"button\">\u5173\u95ED</button>\n</div>";
        var $dialog2 = _create(dialogName2, "\u8FD0\u884C\u547D\u4EE4", html2);
        var $cmd = $dialog2.find('[name="cmd"]');
        $dialog2.submit(function (e) {
          e.preventDefault();
          var content = $cmd.val();
          if (content) _runCmd(content, true);
        }).end().find('[name="clear"]').click(function () {
          $cmd.val("").focus();
        });
        $cmd.keydown(function (e) {
          if (e.ctrlKey && e.keyCode === 13) {
            $dialog2.submit();
          } else if (e.ctrlKey && e.keyCode === 8) {
            $dialog2.find('[name="clear"]').click();
          }
        });
        show2(dialogName2);
        $cmd.focus();
      };
      showImportOrExportSettingDialog = function showImportOrExportSettingDialog() {
        var dialogName2 = "pdImOrExSettingDialog";
        if ($("#" + dialogName2).length > 0) return;
        read3();
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <div>\n    <strong>\u5BFC\u5165\u8BBE\u7F6E\uFF1A</strong>\u5C06\u8BBE\u7F6E\u5185\u5BB9\u7C98\u8D34\u5230\u6587\u672C\u6846\u4E2D\u5E76\u70B9\u51FB\u4FDD\u5B58\u6309\u94AE\u5373\u53EF<br>\n    <strong>\u5BFC\u51FA\u8BBE\u7F6E\uFF1A</strong>\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u522B\u5904\u5373\u53EF\n  </div>\n  <textarea name=\"setting\" style=\"width: 600px; height: 400px; word-break: break-all;\"></textarea>\n</div>\n<div class=\"pd_cfg_btns\">\n  <button type=\"submit\">\u4FDD\u5B58</button>\n  <button data-action=\"close\" type=\"button\">\u53D6\u6D88</button>\n</div>";
        var $dialog2 = _create(dialogName2, "\u5BFC\u5165\u6216\u5BFC\u51FA\u8BBE\u7F6E", html2);
        var $setting = $dialog2.find('[name="setting"]');
        $dialog2.submit(function (e) {
          e.preventDefault();
          if (!confirm("\u662F\u5426\u5BFC\u5165\u6587\u672C\u6846\u4E2D\u7684\u8BBE\u7F6E\uFF1F")) return;
          var options = $.trim($setting.val());
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
          options = _normalize(options);
          Info_default.w.Config = $.extend(true, {}, Config2, options);
          write3();
          alert("\u8BBE\u7F6E\u5DF2\u5BFC\u5165");
          location.reload();
        });
        show2(dialogName2);
        $setting.val(JSON.stringify(_getDifferenceSetOfObject(Config2, Config))).select().focus();
      };
      showCustomCssDialog = function showCustomCssDialog() {
        var dialogName2 = "pdCustomCssDialog";
        if ($("#" + dialogName2).length > 0) return;
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <strong>\u81EA\u5B9A\u4E49CSS\u5185\u5BB9\uFF1A</strong><br>\n  <textarea name=\"customCssContent\" wrap=\"off\" style=\"width: 750px; height: 400px; white-space: pre;\"></textarea>\n</div>\n<div class=\"pd_cfg_btns\">\n  <span class=\"pd_cfg_about\"><a target=\"_blank\" href=\"read.php?tid=500969&sf=206\">CSS\u89C4\u5219\u6536\u96C6\u8D34</a></span>\n  <button type=\"submit\">\u4FDD\u5B58</button>\n  <button data-action=\"close\" type=\"button\">\u53D6\u6D88</button>\n</div>";
        var $dialog2 = _create(dialogName2, "\u81EA\u5B9A\u4E49CSS", html2);
        var $content = $dialog2.find('[name="customCssContent"]');
        $dialog2.submit(function (e) {
          e.preventDefault();
          Config.customCssContent = $.trim($content.val());
          write3();
          _close(dialogName2);
          alert("\u81EA\u5B9A\u4E49CSS\u4FEE\u6539\u6210\u529F\uFF08\u9700\u5237\u65B0\u9875\u9762\u540E\u624D\u53EF\u751F\u6548\uFF09");
        });
        $content.val(Config.customCssContent);
        show2(dialogName2);
        $content.focus();
      };
      showUserMemoDialog = function showUserMemoDialog() {
        var dialogName2 = "pdUserMemoDialog";
        if ($("#" + dialogName2).length > 0) return;
        var html2 = "\n<div class=\"pd_cfg_main\">\n  \u6309\u7167\u201C\u7528\u6237\u540D:\u5907\u6CE8\u201D\u7684\u683C\u5F0F\uFF08\u6CE8\u610F\u662F\u82F1\u6587\u5192\u53F7\uFF09\uFF0C\u6BCF\u884C\u4E00\u4E2A<br>\n  <textarea name=\"userMemoList\" wrap=\"off\" style=\"width: 320px; height: 400px; white-space: pre;\"></textarea>\n</div>\n<div class=\"pd_cfg_btns\">\n  <button type=\"submit\">\u4FDD\u5B58</button>\n  <button data-action=\"close\" type=\"button\">\u53D6\u6D88</button>\n</div>";
        var $dialog2 = _create(dialogName2, "\u7528\u6237\u5907\u6CE8", html2);
        var $userMemoList = $dialog2.find('[name="userMemoList"]');
        $dialog2.submit(function (e) {
          e.preventDefault();
          var content2 = $.trim($userMemoList.val());
          Config.userMemoList = {};
          var _iterator22 = _createForOfIteratorHelper(content2.split("\n")),
            _step22;
          try {
            for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
              var line = _step22.value;
              line = $.trim(line);
              if (!line) continue;
              if (!/.+?:.+/.test(line)) {
                alert("\u7528\u6237\u5907\u6CE8\u683C\u5F0F\u4E0D\u6B63\u786E");
                $userMemoList.focus();
                return;
              }
              var _line$split3 = line.split(":"),
                _line$split4 = _slicedToArray(_line$split3, 2),
                user = _line$split4[0],
                _line$split4$ = _line$split4[1],
                memo = _line$split4$ === void 0 ? "" : _line$split4$;
              if (!memo) continue;
              Config.userMemoList[user.trim()] = memo.trim();
            }
          } catch (err) {
            _iterator22.e(err);
          } finally {
            _iterator22.f();
          }
          write3();
          _close(dialogName2);
        });
        var content = "";
        var _iterator23 = _createForOfIteratorHelper(_entries(Config.userMemoList)),
          _step23;
        try {
          for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
            var _step23$value = _slicedToArray(_step23.value, 2),
              user = _step23$value[0],
              memo = _step23$value[1];
            content += "".concat(user, ":").concat(memo, "\n");
          }
        } catch (err) {
          _iterator23.e(err);
        } finally {
          _iterator23.f();
        }
        $userMemoList.val(content);
        show2(dialogName2);
        $userMemoList.focus();
      };
      showFollowUserDialog = function showFollowUserDialog() {
        var dialogName2 = "pdFollowUserDialog";
        if ($("#" + dialogName2).length > 0) return;
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <div style=\"margin-top: 5px;\">\n    <label>\n      <input name=\"highlightFollowUserThreadInHpEnabled\" type=\"checkbox\"> \u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u7684\u9996\u9875\u5E16\u5B50\u94FE\u63A5\n      <span class=\"pd_cfg_tips\" title=\"\u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u5728\u9996\u9875\u4E0B\u7684\u5E16\u5B50\u94FE\u63A5\">[?]</span>\n    </label><br>\n    <label>\n      <input name=\"highlightFollowUserThreadLinkEnabled\" type=\"checkbox\"> \u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u7684\u5E16\u5B50\u94FE\u63A5\n      <span class=\"pd_cfg_tips\" title=\"\u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u5728\u7248\u5757\u9875\u9762\u4E0B\u7684\u5E16\u5B50\u94FE\u63A5\">[?]</span>\n    </label><br>\n    <label>\n      <input name=\"highlightFollowUserFloorEnabled\" type=\"checkbox\"> \u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u7684\u697C\u5C42\n      <span class=\"pd_cfg_tips\" title=\"\u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u5728\u5E16\u5B50\u9875\u9762\u4E0B\u7684\u697C\u5C42\u7684\u8FB9\u6846\">[?]</span>\n    </label><br>\n  </div>\n  <ul id=\"pdFollowUserList\" style=\"margin-top: 5px; min-width: 274px; line-height: 24px;\"></ul>\n  <div style=\"margin-top: 5px;\">\n    <div style=\"display: inline-block;\">\n      <a class=\"pd_btn_link\" data-name=\"selectAll\" href=\"#\">\u5168\u9009</a>\n      <a class=\"pd_btn_link\" data-name=\"selectInverse\" href=\"#\">\u53CD\u9009</a>\n    </div>\n    <div style=\"float: right;\">\n      <a class=\"pd_btn_link\" data-name=\"deleteSelect\" href=\"#\">\u5220\u9664</a>\n    </div>\n  </div>\n  <div style=\"margin-top: 5px;\" title=\"\u6DFB\u52A0\u591A\u4E2A\u7528\u6237\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694\">\n    <input name=\"addFollowUser\" style=\"width: 200px;\" type=\"text\">\n    <a class=\"pd_btn_link\" data-name=\"add\" href=\"#\">\u6DFB\u52A0</a>\n  </div>\n</div>\n<div class=\"pd_cfg_btns\">\n  <span class=\"pd_cfg_about\"><a data-name=\"openImOrExFollowUserListDialog\" href=\"#\">\u5BFC\u5165/\u5BFC\u51FA\u5173\u6CE8\u7528\u6237</a></span>\n  <button type=\"submit\">\u4FDD\u5B58</button>\n  <button data-action=\"close\" type=\"button\">\u53D6\u6D88</button>\n</div>";
        var $dialog2 = _create(dialogName2, "\u5173\u6CE8\u7528\u6237", html2);
        var $followUserList = $dialog2.find("#pdFollowUserList");
        var addFollowUser = function addFollowUser(name4) {
          $("\n<li>\n  <input type=\"checkbox\">\n  <input name=\"username\" type=\"text\" style=\"width: 178px; margin-left: 5px;\" maxlength=\"15\" value=\"".concat(name4, "\">\n  <a class=\"pd_btn_link\" data-name=\"delete\" href=\"#\">\u5220\u9664</a>\n</li>\n")).appendTo($followUserList);
        };
        $dialog2.submit(function (e) {
          e.preventDefault();
          Config.highlightFollowUserThreadInHPEnabled = $dialog2.find('[name="highlightFollowUserThreadInHpEnabled"]').prop("checked");
          Config.highlightFollowUserThreadLinkEnabled = $dialog2.find('[name="highlightFollowUserThreadLinkEnabled"]').prop("checked");
          Config.highlightFollowUserFloorEnabled = $dialog2.find('[name="highlightFollowUserFloorEnabled"]').prop("checked");
          Config.followUserList = [];
          $followUserList.find("li").each(function () {
            var $this2 = $(this);
            var name4 = $.trim($this2.find('[name="username"]').val());
            if (name4 !== "" && _inFollowOrBlockUserList(name4, Config.followUserList) === -1) {
              Config.followUserList.push({
                name: name4
              });
            }
          });
          write3();
          _close(dialogName2);
        });
        $followUserList.on("click", '[data-name="delete"]', function (e) {
          e.preventDefault();
          $(this).parent().remove();
        });
        $dialog2.find('[data-name="selectAll"]').click(function () {
          return _selectAll($followUserList.find('[type="checkbox"]'));
        }).end().find('[data-name="selectInverse"]').click(function () {
          return _selectInverse($followUserList.find('[type="checkbox"]'));
        }).end().find('[data-name="deleteSelect"]').click(function (e) {
          e.preventDefault();
          var $checked = $followUserList.find('li:has([type="checkbox"]:checked)');
          if (!$checked.length) return;
          if (confirm("\u662F\u5426\u5220\u9664\u6240\u9009\u7528\u6237\uFF1F")) {
            $checked.remove();
            _resize(dialogName2);
          }
        });
        $dialog2.find('[name="addFollowUser"]').keydown(function (e) {
          if (e.keyCode === 13) {
            e.preventDefault();
            $(this).next("a").click();
          }
        }).end().find('[data-name="add"]').click(function (e) {
          e.preventDefault();
          var _iterator24 = _createForOfIteratorHelper($.trim($dialog2.find('[name="addFollowUser"]').val()).split(",")),
            _step24;
          try {
            for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
              var name4 = _step24.value;
              name4 = $.trim(name4);
              if (!name4) continue;
              if (_inFollowOrBlockUserList(name4, Config.followUserList) === -1) {
                addFollowUser(name4);
              }
            }
          } catch (err) {
            _iterator24.e(err);
          } finally {
            _iterator24.f();
          }
          $dialog2.find('[name="addFollowUser"]').val("");
          _resize(dialogName2);
        }).end().find('[data-name="openImOrExFollowUserListDialog"]').click(function (e) {
          e.preventDefault();
          _showCommonImportOrExportConfigDialog("\u5173\u6CE8\u7528\u6237", "followUserList");
        });
        $dialog2.find('[name="highlightFollowUserThreadInHpEnabled"]').prop("checked", Config.highlightFollowUserThreadInHPEnabled);
        $dialog2.find('[name="highlightFollowUserThreadLinkEnabled"]').prop("checked", Config.highlightFollowUserThreadLinkEnabled);
        $dialog2.find('[name="highlightFollowUserFloorEnabled"]').prop("checked", Config.highlightFollowUserFloorEnabled);
        var _iterator25 = _createForOfIteratorHelper(Config.followUserList),
          _step25;
        try {
          for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
            var user = _step25.value;
            addFollowUser(user.name);
          }
        } catch (err) {
          _iterator25.e(err);
        } finally {
          _iterator25.f();
        }
        show2(dialogName2);
      };
      showBlockUserDialog = function showBlockUserDialog() {
        var dialogName2 = "pdBlockUserDialog";
        if ($("#" + dialogName2).length > 0) return;
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <div style=\"margin-top: 5px; line-height: 24px;\">\n    <label>\n      \u9ED8\u8BA4\u5C4F\u853D\u7C7B\u578B\n      <select name=\"blockUserDefaultType\">\n        <option value=\"0\">\u5C4F\u853D\u4E3B\u9898\u548C\u56DE\u5E16</option><option value=\"1\">\u4EC5\u5C4F\u853D\u4E3B\u9898</option><option value=\"2\">\u4EC5\u5C4F\u853D\u56DE\u5E16</option>\n      </select>\n    </label>\n    <label class=\"pd_cfg_ml\">\n      <input name=\"blockUserAtTipsEnabled\" type=\"checkbox\"> \u5C4F\u853D@\u63D0\u9192 <span class=\"pd_cfg_tips\" title=\"\u5C4F\u853D\u88AB\u5C4F\u853D\u7528\u6237\u7684@\u63D0\u9192\">[?]</span>\n    </label><br>\n    <label>\u7248\u5757\u5C4F\u853D\u8303\u56F4\n      <select name=\"blockUserForumType\">\n        <option value=\"0\">\u6240\u6709\u7248\u5757</option><option value=\"1\">\u5305\u62EC\u6307\u5B9A\u7248\u5757</option><option value=\"2\">\u6392\u9664\u6307\u5B9A\u7248\u5757</option>\n      </select>\n    </label><br>\n    <label>\u7248\u5757ID\u5217\u8868\n      <input name=\"blockUserFidList\" type=\"text\" style=\"width: 220px;\"> \n      <span class=\"pd_cfg_tips\" title=\"\u7248\u5757URL\u4E2D\u7684fid\u53C2\u6570\uFF0C\u591A\u4E2AID\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694\">[?]</span>\n    </label>\n  </div>\n  <ul id=\"pdBlockUserList\" style=\"margin-top: 5px; min-width: 362px; line-height: 24px;\"></ul>\n  <div style=\"margin-top: 5px;\">\n    <div style=\"display: inline-block;\">\n      <a class=\"pd_btn_link\" data-name=\"selectAll\" href=\"#\">\u5168\u9009</a>\n      <a class=\"pd_btn_link\" data-name=\"selectInverse\" href=\"#\">\u53CD\u9009</a>\n    </div>\n    <div style=\"float: right;\">\n      <a class=\"pd_btn_link\" data-name=\"modify\" href=\"#\">\u4FEE\u6539\u4E3A</a>\n      <select>\n        <option value=\"0\">\u5C4F\u853D\u4E3B\u9898\u548C\u56DE\u5E16</option><option value=\"1\">\u4EC5\u5C4F\u853D\u4E3B\u9898</option><option value=\"2\">\u4EC5\u5C4F\u853D\u56DE\u5E16</option>\n      </select>\n      <a class=\"pd_btn_link\" data-name=\"deleteSelect\" href=\"#\">\u5220\u9664</a>\n    </div>\n  </div>\n  <div style=\"margin-top: 5px;\" title=\"\u6DFB\u52A0\u591A\u4E2A\u7528\u6237\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694\">\n    <input name=\"addBlockUser\" style=\"width: 200px;\" type=\"text\">\n    <a class=\"pd_btn_link\" data-name=\"add\" href=\"#\">\u6DFB\u52A0</a>\n  </div>\n</div>\n<div class=\"pd_cfg_btns\">\n  <span class=\"pd_cfg_about\"><a data-name=\"openImOrExBlockUserListDialog\" href=\"#\">\u5BFC\u5165/\u5BFC\u51FA\u5C4F\u853D\u7528\u6237</a></span>\n  <button type=\"submit\">\u4FDD\u5B58</button>\n  <button data-action=\"close\" type=\"button\">\u53D6\u6D88</button>\n</div>";
        var $dialog2 = _create(dialogName2, "\u5C4F\u853D\u7528\u6237", html2);
        var $blockUserList = $dialog2.find("#pdBlockUserList");
        var addBlockUser = function addBlockUser(name4, type) {
          $("\n<li>\n  <input type=\"checkbox\">\n  <input name=\"username\" type=\"text\" style=\"width: 150px; margin-left: 5px;\" maxlength=\"15\" value=\"".concat(name4, "\">\n  <select name=\"blockType\" style=\"margin-left: 5px;\">\n    <option value=\"0\">\u5C4F\u853D\u4E3B\u9898\u548C\u56DE\u5E16</option><option value=\"1\">\u4EC5\u5C4F\u853D\u4E3B\u9898</option><option value=\"2\">\u4EC5\u5C4F\u853D\u56DE\u5E16</option>\n  </select>\n  <a class=\"pd_btn_link\" data-name=\"delete\" href=\"#\">\u5220\u9664</a>\n</li>")).appendTo($blockUserList).find('[name="blockType"]').val(type);
        };
        $dialog2.submit(function (e) {
          e.preventDefault();
          Config.blockUserDefaultType = parseInt($dialog2.find('[name="blockUserDefaultType"]').val());
          Config.blockUserAtTipsEnabled = $dialog2.find('[name="blockUserAtTipsEnabled"]').prop("checked");
          Config.blockUserForumType = parseInt($dialog2.find('[name="blockUserForumType"]').val());
          var blockUserFidList = /* @__PURE__ */new Set();
          var _iterator26 = _createForOfIteratorHelper($.trim($dialog2.find('[name="blockUserFidList"]').val()).split(",")),
            _step26;
          try {
            for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
              var fid2 = _step26.value;
              fid2 = parseInt(fid2);
              if (!isNaN(fid2) && fid2 > 0) blockUserFidList.add(fid2);
            }
          } catch (err) {
            _iterator26.e(err);
          } finally {
            _iterator26.f();
          }
          Config.blockUserFidList = _toConsumableArray(blockUserFidList);
          Config.blockUserList = [];
          $blockUserList.find("li").each(function () {
            var $this2 = $(this);
            var name4 = $.trim($this2.find('[name="username"]').val());
            if (name4 !== "" && _inFollowOrBlockUserList(name4, Config.blockUserList) === -1) {
              var type = parseInt($this2.find('[name="blockType"]').val());
              Config.blockUserList.push({
                name: name4,
                type: type
              });
            }
          });
          write3();
          _close(dialogName2);
        });
        $blockUserList.on("click", '[data-name="delete"]', function (e) {
          e.preventDefault();
          $(this).parent().remove();
        });
        $dialog2.find('[data-name="selectAll"]').click(function () {
          return _selectAll($blockUserList.find('input[type="checkbox"]'));
        }).end().find('[data-name="selectInverse"]').click(function () {
          return _selectInverse($blockUserList.find('input[type="checkbox"]'));
        }).end().find('[data-name="modify"]').click(function (e) {
          e.preventDefault();
          var value = $(this).next("select").val();
          $blockUserList.find('li:has([type="checkbox"]:checked) > select').val(value);
        }).end().find('[data-name="deleteSelect"]').click(function (e) {
          e.preventDefault();
          var $checked = $blockUserList.find('li:has([type="checkbox"]:checked)');
          if (!$checked.length) return;
          if (confirm("\u662F\u5426\u5220\u9664\u6240\u9009\u7528\u6237\uFF1F")) {
            $checked.remove();
            _resize(dialogName2);
          }
        });
        $dialog2.find('[name="addBlockUser"]').keydown(function (e) {
          if (e.keyCode === 13) {
            e.preventDefault();
            $(this).next("a").click();
          }
        }).end().find('[data-name="add"]').click(function (e) {
          e.preventDefault();
          var type = parseInt($dialog2.find('[name="blockUserDefaultType"]').val());
          var _iterator27 = _createForOfIteratorHelper($.trim($dialog2.find('[name="addBlockUser"]').val()).split(",")),
            _step27;
          try {
            for (_iterator27.s(); !(_step27 = _iterator27.n()).done;) {
              var name4 = _step27.value;
              name4 = $.trim(name4);
              if (!name4) continue;
              if (_inFollowOrBlockUserList(name4, Config.blockUserList) === -1) {
                addBlockUser(name4, type);
              }
            }
          } catch (err) {
            _iterator27.e(err);
          } finally {
            _iterator27.f();
          }
          $dialog2.find('[name="addBlockUser"]').val("");
          _resize(dialogName2);
        }).end().find('[name="blockUserForumType"]').change(function () {
          $dialog2.find('[name="blockUserFidList"]').prop("disabled", parseInt($(this).val()) === 0);
        }).end().find('[data-name="openImOrExBlockUserListDialog"]').click(function (e) {
          e.preventDefault();
          _showCommonImportOrExportConfigDialog("\u5C4F\u853D\u7528\u6237", "blockUserList");
        });
        $dialog2.find('[name="blockUserDefaultType"]').val(Config.blockUserDefaultType);
        $dialog2.find('[name="blockUserAtTipsEnabled"]').prop("checked", Config.blockUserAtTipsEnabled);
        $dialog2.find('[name="blockUserForumType"]').val(Config.blockUserForumType).triggerHandler("change");
        $dialog2.find('[name="blockUserFidList"]').val(Config.blockUserFidList.join(","));
        var _iterator28 = _createForOfIteratorHelper(Config.blockUserList),
          _step28;
        try {
          for (_iterator28.s(); !(_step28 = _iterator28.n()).done;) {
            var user = _step28.value;
            addBlockUser(user.name, user.type);
          }
        } catch (err) {
          _iterator28.e(err);
        } finally {
          _iterator28.f();
        }
        show2(dialogName2);
      };
      showBlockThreadDialog = function showBlockThreadDialog() {
        var dialogName = "pdBlockThreadDialog";
        if ($("#" + dialogName).length > 0) return;
        var html = "\n<div class=\"pd_cfg_main\">\n  <div style=\"border-bottom: 1px solid #9191ff; margin-bottom: 7px; padding-bottom: 5px;\">\n    \u6807\u9898\u5173\u952E\u5B57\u53EF\u4F7F\u7528\u666E\u901A\u5B57\u7B26\u4E32\u6216\u6B63\u5219\u8868\u8FBE\u5F0F\uFF0C\u6B63\u5219\u8868\u8FBE\u5F0F\u8BF7\u4F7F\u7528<code>/abc/</code>\u7684\u683C\u5F0F\uFF0C\u4F8B\uFF1A<code>/\u5173\u952E\u5B57A.*\u5173\u952E\u5B57B/i</code><br>\n    \u7528\u6237\u540D\u548C\u7248\u5757ID\u4E3A\u53EF\u9009\u9879\uFF08\u591A\u4E2A\u7528\u6237\u540D\u6216\u7248\u5757ID\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694\uFF09<br>\n    <label>\n      \u9ED8\u8BA4\u7248\u5757\u5C4F\u853D\u8303\u56F4\n      <select name=\"blockThreadDefForumType\">\n        <option value=\"0\">\u6240\u6709\u7248\u5757</option><option value=\"1\">\u5305\u62EC\u6307\u5B9A\u7248\u5757</option><option value=\"2\">\u6392\u9664\u6307\u5B9A\u7248\u5757</option>\n      </select>\n    </label>\n    <label style=\"margin-left: 5px;\">\u9ED8\u8BA4\u7248\u5757ID\u5217\u8868 <input name=\"blockThreadDefFidList\" type=\"text\" style=\"width: 150px;\"></label>\n  </div>\n  <table id=\"pdBlockThreadList\" style=\"line-height: 22px; text-align: center;\">\n    <tbody>\n      <tr>\n        <th style=\"width: 220px;\">\u6807\u9898\u5173\u952E\u5B57(\u5FC5\u586B)</th>\n        <th style=\"width: 62px;\">\u5C4F\u853D\u7528\u6237</th>\n        <th style=\"width: 200px;\">\u7528\u6237\u540D <span class=\"pd_cfg_tips\" title=\"\u591A\u4E2A\u7528\u6237\u540D\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694\">[?]</span></th>\n        <th style=\"width: 62px;\">\u5C4F\u853D\u8303\u56F4</th>\n        <th style=\"width: 132px;\">\u7248\u5757ID <span class=\"pd_cfg_tips\" title=\"\u7248\u5757URL\u4E2D\u7684fid\u53C2\u6570\uFF0C\u591A\u4E2AID\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694\">[?]</span></th>\n        <th style=\"width: 35px;\"></th>\n      </tr>\n    </tbody>\n  </table>\n  <div data-name=\"blockThreadAddBtns\" style=\"margin-top: 5px;\">\n    <a class=\"pd_btn_link\" data-name=\"addOne\" href=\"#\">\u589E\u52A01\u4E2A</a>\n    <a class=\"pd_btn_link\" data-name=\"addFive\" href=\"#\">\u589E\u52A05\u4E2A</a>\n    <a class=\"pd_btn_link pd_highlight\" data-name=\"clear\" href=\"#\">\u6E05\u9664\u6240\u6709</a>\n  </div>\n</div>\n<div class=\"pd_cfg_btns\">\n  <span class=\"pd_cfg_about\"><a data-name=\"openImOrExBlockThreadListDialog\" href=\"#\">\u5BFC\u5165/\u5BFC\u51FA\u5C4F\u853D\u5E16\u5B50</a></span>\n  <button type=\"submit\">\u4FDD\u5B58</button>\n  <button data-action=\"close\" type=\"button\">\u53D6\u6D88</button>\n</div>";
        var $dialog = _create(dialogName, "\u5C4F\u853D\u5E16\u5B50", html, "width: 768px;");
        var $blockThreadList = $dialog.find("#pdBlockThreadList");
        var addBlockThread = function addBlockThread(keyWord2, userType, userList, fidType, fidList) {
          $("\n<tr>\n  <td><input name=\"keyWord\" type=\"text\" style=\"width: 208px;\" value=\"".concat(keyWord2, "\"></td>\n  <td><select name=\"userType\"><option value=\"0\">\u6240\u6709</option><option value=\"1\">\u5305\u62EC</option><option value=\"2\">\u6392\u9664</option></select></td>\n  <td><input name=\"userList\" type=\"text\" style=\"width: 188px;\" value=\"").concat(userList.join(","), "\" ").concat(userType === 0 ? "disabled" : "", "></td>\n  <td><select name=\"fidType\"><option value=\"0\">\u6240\u6709</option><option value=\"1\">\u5305\u62EC</option><option value=\"2\">\u6392\u9664</option></select></td>\n  <td><input name=\"fidList\" type=\"text\" style=\"width: 120px;\" value=\"").concat(fidList.join(","), "\" ").concat(fidType === 0 ? "disabled" : "", "></td>\n  <td><a href=\"#\" data-name=\"delete\">\u5220\u9664</a></td>\n</tr>\n")).appendTo($blockThreadList).find('[name="userType"]').val(userType).end().find('[name="fidType"]').val(fidType);
        };
        var verify = function verify() {
          var flag = true;
          $blockThreadList.find("tr:gt(0)").each(function () {
            var $this = $(this);
            var $txtKeyWord = $this.find('[name="keyWord"]');
            var keyWord = $txtKeyWord.val();
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
        $dialog.submit(function (e) {
          e.preventDefault();
          if (!verify()) return;
          Config.blockThreadDefForumType = parseInt($dialog.find('[name="blockThreadDefForumType"]').val());
          var blockThreadDefFidList = /* @__PURE__ */new Set();
          var _iterator29 = _createForOfIteratorHelper($.trim($dialog.find('[name="blockThreadDefFidList"]').val()).split(",")),
            _step29;
          try {
            for (_iterator29.s(); !(_step29 = _iterator29.n()).done;) {
              var fid2 = _step29.value;
              fid2 = parseInt(fid2);
              if (!isNaN(fid2) && fid2 > 0) blockThreadDefFidList.add(fid2);
            }
          } catch (err) {
            _iterator29.e(err);
          } finally {
            _iterator29.f();
          }
          Config.blockThreadDefFidList = _toConsumableArray(blockThreadDefFidList);
          Config.blockThreadList = [];
          $blockThreadList.find("tr:gt(0)").each(function () {
            var $this2 = $(this);
            var keyWord2 = $this2.find('[name="keyWord"]').val();
            if ($.trim(keyWord2) === "") return;
            var newObj = {
              keyWord: keyWord2
            };
            var userType = parseInt($this2.find('[name="userType"]').val());
            if (userType > 0) {
              var userList = /* @__PURE__ */new Set();
              var _iterator30 = _createForOfIteratorHelper($.trim($this2.find('[name="userList"]').val()).split(",")),
                _step30;
              try {
                for (_iterator30.s(); !(_step30 = _iterator30.n()).done;) {
                  var user = _step30.value;
                  user = $.trim(user);
                  if (user) userList.add(user);
                }
              } catch (err) {
                _iterator30.e(err);
              } finally {
                _iterator30.f();
              }
              if (userList.size > 0) newObj[userType === 2 ? "excludeUser" : "includeUser"] = _toConsumableArray(userList);
            }
            var fidType = parseInt($this2.find('[name="fidType"]').val());
            if (fidType > 0) {
              var fidList = /* @__PURE__ */new Set();
              var _iterator31 = _createForOfIteratorHelper($.trim($this2.find('[name="fidList"]').val()).split(",")),
                _step31;
              try {
                for (_iterator31.s(); !(_step31 = _iterator31.n()).done;) {
                  var fid2 = _step31.value;
                  fid2 = parseInt(fid2);
                  if (!isNaN(fid2) && fid2 > 0) fidList.add(fid2);
                }
              } catch (err) {
                _iterator31.e(err);
              } finally {
                _iterator31.f();
              }
              if (fidList.size > 0) newObj[fidType === 2 ? "excludeFid" : "includeFid"] = _toConsumableArray(fidList);
            }
            Config.blockThreadList.push(newObj);
          });
          write3();
          _close(dialogName);
        });
        $blockThreadList.on("change", "select", function () {
          var $this2 = $(this);
          $this2.parent("td").next("td").find("input").prop("disabled", parseInt($this2.val()) === 0);
        }).on("click", '[data-name="delete"]', function (e) {
          e.preventDefault();
          $(this).closest("tr").remove();
        });
        $dialog.find('[data-name="addOne"], [data-name="addFive"]').click(function (e) {
          e.preventDefault();
          var num2 = 1;
          if ($(this).is('[data-name="addFive"]')) num2 = 5;
          for (var i = 1; i <= num2; i++) {
            addBlockThread("", 0, [], parseInt($dialog.find('[name="blockThreadDefForumType"]').val()), $.trim($dialog.find('[name="blockThreadDefFidList"]').val()).split(","));
          }
          _resize(dialogName);
        }).end().find('[data-name="clear"]').click(function (e) {
          e.preventDefault();
          if (confirm("\u662F\u5426\u6E05\u9664\u6240\u6709\u5C4F\u853D\u5173\u952E\u5B57\uFF1F")) {
            $blockThreadList.find("tbody > tr:gt(0)").remove();
            _resize(dialogName);
          }
        }).end().find('[name="blockThreadDefForumType"]').change(function () {
          $dialog.find('[name="blockThreadDefFidList"]').prop("disabled", parseInt($(this).val()) === 0);
        }).end().find('[data-name="openImOrExBlockThreadListDialog"]').click(function (e) {
          e.preventDefault();
          _showCommonImportOrExportConfigDialog("\u5C4F\u853D\u5E16\u5B50", "blockThreadList");
        });
        $dialog.find('[name="blockThreadDefForumType"]').val(Config.blockThreadDefForumType).triggerHandler("change");
        $dialog.find('[name="blockThreadDefFidList"]').val(Config.blockThreadDefFidList.join(","));
        var _iterator32 = _createForOfIteratorHelper(Config.blockThreadList),
          _step32;
        try {
          for (_iterator32.s(); !(_step32 = _iterator32.n()).done;) {
            var data = _step32.value;
            var keyWord2 = data.keyWord,
              includeUser2 = data.includeUser,
              excludeUser2 = data.excludeUser,
              includeFid2 = data.includeFid,
              excludeFid2 = data.excludeFid;
            var userType = 0;
            var userList = [];
            if (typeof includeUser2 !== "undefined") {
              userType = 1;
              userList = includeUser2;
            } else if (typeof excludeUser2 !== "undefined") {
              userType = 2;
              userList = excludeUser2;
            }
            var fidType = 0;
            var fidList = [];
            if (typeof includeFid2 !== "undefined") {
              fidType = 1;
              fidList = includeFid2;
            } else if (typeof excludeFid2 !== "undefined") {
              fidType = 2;
              fidList = excludeFid2;
            }
            addBlockThread(keyWord2, userType, userList, fidType, fidList);
          }
        } catch (err) {
          _iterator32.e(err);
        } finally {
          _iterator32.f();
        }
        show2(dialogName);
      };
      showBuyItemTipsDialog = function showBuyItemTipsDialog() {
        var dialogName2 = "pdBuyItemTipsDialog";
        if ($("#" + dialogName2).length > 0) return;
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <div style=\"margin: 5px 0;\">\n    <strong>\u8BBE\u7F6E\u8BF4\u660E\uFF1A</strong><br>\n    \u5728\u7269\u54C1ID\u5217\u8868\u586B\u5165\u76F8\u5E94\u7684\u7269\u54C1ID\uFF0C\u53EF\u81EA\u52A8\u8D2D\u4E70\u6240\u9700\u7684\u7269\u54C1\uFF0C\u6BCF\u5929\u6700\u591A\u53EF\u8D2D\u4E70\u4E24\u6B21\u3002<br>\n    \uFF08\u5373\uFF1A\u53EA\u8D2D\u4E701\u79CD\u7269\u54C1\u7684\u8BDD\u6700\u591A\u53EF\u8D2D\u4E702\u6B21\uFF1B\u8D2D\u4E702\u79CD\u7269\u54C1\u7684\u8BDD\u6BCF\u79CD\u7269\u54C1\u53EA\u80FD\u8D2D\u4E701\u6B21\uFF0C\u5408\u8BA12\u6B21\uFF09<br>\n    <strong>\u5404\u7269\u54C1ID\uFF1A</strong><br>\n    <strike><b>\u7B49\u7EA7\u7ECF\u9A8C\u836F\u4E38</b>\uFF1A101\uFF1B<b>\u7B49\u7EA7\u7ECF\u9A8C\u836F\u4E38\uFF08\u86CB\uFF09</b>\uFF1A102\uFF1B</strike><b>\u4FEE\u70BC\u624B\u518C</b>\uFF1A103\u3002<span class=\"pd_notice\">\uFF08\u6CE8\uFF1A\u91CD\u751F\u4E4B\u836F\u8BF7\u624B\u52A8\u8D2D\u4E70\uFF09</span><br>\n    <strong>\u683C\u5F0F\uFF1A</strong><br>\n    \u4E24\u6B21\u8D2D\u4E70\u4E4B\u95F4\u7684\u7269\u54C1ID\u8BF7\u7528<b>\u82F1\u6587\u9017\u53F7</b>\u5206\u9694\uFF1B\u540C\u4E00\u6B21\u8D2D\u4E70\u7684\u7269\u54C1ID\u5982\u7528<b>\u7AD6\u7EBF</b>\u5206\u9694\uFF0C\u8868\u793A\u524D\u4E00\u79CD\u7269\u54C1\u5982\u8D39\u7528\u4E0D\u8DB3\uFF0C\u53EF\u81EA\u52A8\u66F4\u6362\u4E3A\u8D2D\u4E70\u53E6\u4E00\u79CD\u7269\u54C1\u3002<br>\n    <strong>\u4F8B\u5B50\uFF1A</strong><br>\n    <b>103</b>\uFF1A\u8868\u793A\u53EA\u8D2D\u4E70\u4E00\u6B21[103]\u7269\u54C1\u3002<br>\n    <b>103,101</b>\uFF1A\u8868\u793A\u7B2C1\u6B21\u8D2D\u4E70[103]\u7269\u54C1\uFF0C\u7B2C2\u6B21\u8D2D\u4E70[101]\u7269\u54C1\u3002<br>\n    <b>102|101,103|102|101</b>\uFF1A\u8868\u793A\u7B2C1\u6B21\u5148\u5C1D\u8BD5\u8D2D\u4E70[102]\u7269\u54C1\uFF0C\u5982\u8D39\u7528\u4E0D\u8DB3\u5219\u8D2D\u4E70[101]\u7269\u54C1\uFF1B\u7B2C2\u6B21\u5148\u5C1D\u8BD5\u8D2D\u4E70[103]\u7269\u54C1\uFF0C\u5982\u8D39\u7528\u4E0D\u8DB3\u5219\u8D2D\u4E70[102]\u7269\u54C1\uFF0C\u4F9D\u7136\u4E0D\u8DB3\u5219\u8D2D\u4E70[101]\u7269\u54C1\u3002<br>\n  </div>\n</div>";
        _create(dialogName2, "\u81EA\u52A8\u8D2D\u4E70\u7269\u54C1\u8BE6\u7EC6\u8BF4\u660E", html2, "max-width: 600px;");
        show2(dialogName2);
      };
    }
  });

  // src/module/LogDialog.js
  var show4, showLogContent, getLogContent, showLogStat, getLogStat, showImportOrExportLogDialog, showLogText;
  var init_LogDialog = __esm({
    "src/module/LogDialog.js": function src_module_LogDialogJs() {
      "use strict";

      init_Util();
      init_Dialog();
      init_Config();
      init_Log();
      init_Item();
      init_Read();
      init_Script();
      show4 = function show4() {
        var dialogName2 = "pdLogDialog";
        if ($("#" + dialogName2).length > 0) return;
        read3();
        _runFunc("LogDialog.show_before_");
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <div class=\"pd_log_nav\">\n    <a class=\"pd_disabled_link\" data-name=\"start\" href=\"#\">&lt;&lt;</a>\n    <a class=\"pd_disabled_link\" data-name=\"prev\" href=\"#\" style=\"padding: 0 7px;\">&lt;</a>\n    <h2 class=\"pd_log_date pd_custom_tips\">\u6682\u65E0\u65E5\u5FD7</h2>\n    <a class=\"pd_disabled_link\" data-name=\"next\" href=\"#\" style=\"padding: 0 7px;\">&gt;</a>\n    <a class=\"pd_disabled_link\" data-name=\"end\" href=\"#\">&gt;&gt;</a>\n  </div>\n  <fieldset>\n    <legend>\u65E5\u5FD7\u5185\u5BB9</legend>\n    <div>\n      <strong>\u6392\u5E8F\u65B9\u5F0F\uFF1A</strong>\n      <label title=\"\u6309\u65F6\u95F4\u987A\u5E8F\u6392\u5E8F\"><input type=\"radio\" name=\"sortType\" value=\"time\" checked> \u6309\u65F6\u95F4</label>\n      <label title=\"\u6309\u65E5\u5FD7\u7C7B\u522B\u6392\u5E8F\"><input type=\"radio\" name=\"sortType\" value=\"type\"> \u6309\u7C7B\u522B</label>\n    </div>\n    <div class=\"pd_stat pd_log_content\">\u6682\u65E0\u65E5\u5FD7</div>\n  </fieldset>\n  <fieldset>\n    <legend>\u7EDF\u8BA1\u7ED3\u679C</legend>\n    <div>\n      <strong>\u7EDF\u8BA1\u8303\u56F4\uFF1A</strong>\n      <label title=\"\u663E\u793A\u5F53\u5929\u7684\u7EDF\u8BA1\u7ED3\u679C\"><input type=\"radio\" name=\"statType\" value=\"current\" checked> \u5F53\u5929</label>\n      <label title=\"\u663E\u793A\u8DDD\u8BE5\u65E5N\u5929\u5185\u7684\u7EDF\u8BA1\u7ED3\u679C\"><input type=\"radio\" name=\"statType\" value=\"custom\"></label>\n      <label title=\"\u663E\u793A\u8DDD\u8BE5\u65E5N\u5929\u5185\u7684\u7EDF\u8BA1\u7ED3\u679C\"><input name=\"statDays\" type=\"text\" style=\"width: 22px;\" maxlength=\"3\"> \u5929\u5185</label>\n      <label title=\"\u663E\u793A\u5168\u90E8\u7EDF\u8BA1\u7ED3\u679C\"><input type=\"radio\" name=\"statType\" value=\"all\"> \u5168\u90E8</label>\n    </div>\n    <div class=\"pd_stat\" data-name=\"stat\">\u6682\u65E0\u65E5\u5FD7</div>\n  </fieldset>\n</div>\n<div class=\"pd_cfg_btns\">\n  <span class=\"pd_cfg_about\">\n    <a class=\"pd_btn_link\" data-name=\"openImOrExLogDialog\" href=\"#\">\u5BFC\u5165/\u5BFC\u51FA\u65E5\u5FD7</a>\n    <a class=\"pd_btn_link\" data-name=\"openBuyThreadLogDialog\" href=\"#\">\u67E5\u770B\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55</a>\n  </span>\n  <button data-action=\"close\" type=\"button\">\u5173\u95ED</button>\n  <button name=\"clear\" type=\"button\">\u6E05\u9664\u65E5\u5FD7</button>\n</div>";
        var $dialog2 = _create(dialogName2, "KFOL\u52A9\u624B\u65E5\u5FD7", html2, "width: 880px;");
        var $logNav = $dialog2.find(".pd_log_nav");
        var log2 = _read();
        var dateList = [];
        var curIndex = 0;
        if (!$.isEmptyObject(log2)) {
          dateList = _getObjectKeyList(log2, 1);
          curIndex = dateList.length - 1;
          $logNav.find(".pd_log_date").attr("title", "\u603B\u5171\u8BB0\u5F55\u4E86".concat(dateList.length, "\u5929\u7684\u65E5\u5FD7")).text(dateList[curIndex]);
          if (dateList.length > 1) {
            $logNav.find('[data-name="start"]').attr("title", dateList[0]).removeClass("pd_disabled_link");
            $logNav.find('[data-name="prev"]').attr("title", dateList[curIndex - 1]).removeClass("pd_disabled_link");
          }
        }
        $logNav.on("click", "a[data-name]", function (e) {
          e.preventDefault();
          var $this2 = $(this);
          if ($this2.hasClass("pd_disabled_link")) return;
          var name4 = $this2.data("name");
          if (name4 === "start") {
            curIndex = 0;
          } else if (name4 === "prev") {
            if (curIndex > 0) curIndex--;else return;
          } else if (name4 === "next") {
            if (curIndex < dateList.length - 1) curIndex++;else return;
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
        $dialog2.find('[name="sortType"]').click(function () {
          var value = $(this).val();
          if (Config.logSortType !== value) {
            Config.logSortType = value;
            write3();
            showLogContent(log2, dateList[curIndex], $dialog2);
          }
        }).end().find('[name="statType"]').click(function () {
          var value = $(this).val();
          if (Config.logStatType !== value) {
            Config.logStatType = value;
            write3();
            showLogStat(log2, dateList[curIndex], $dialog2);
          }
        }).end().find('[name="statDays"]').keyup(function () {
          var days = parseInt($(this).val());
          if (days > 0 && Config.logStatDays !== days) {
            Config.logStatDays = days;
            write3();
            $dialog2.find('[name="statType"][value="custom"]:not(:checked)').click();
            showLogStat(log2, dateList[curIndex], $dialog2);
          }
        }).end().find("[name=\"sortType\"][value=\"".concat(Config.logSortType, "\"]")).click().end().find("[name=\"statType\"][value=\"".concat(Config.logStatType, "\"]")).click().end().find('[name="statDays"]').val(Config.logStatDays);
        $dialog2.find('[name="clear"]').click(function (e) {
          e.preventDefault();
          if (confirm("\u662F\u5426\u6E05\u9664\u6240\u6709\u65E5\u5FD7\uFF1F")) {
            _clear();
            alert("\u65E5\u5FD7\u5DF2\u6E05\u9664");
            location.reload();
          }
        }).end().find('[data-name="openImOrExLogDialog"]').click(function (e) {
          e.preventDefault();
          showImportOrExportLogDialog();
        }).end().find('[data-name="openBuyThreadLogDialog"]').click(function (e) {
          e.preventDefault();
          _showBuyThreadLogDialog();
        });
        showLogContent(log2, dateList[curIndex], $dialog2);
        showLogStat(log2, dateList[curIndex], $dialog2);
        if ($(window).height() <= 750) $dialog2.find(".pd_log_content").css("height", "192px");
        show2(dialogName2);
        _runFunc("LogDialog.show_after_");
      };
      showLogContent = function showLogContent(log2, date, $dialog2) {
        if (!Array.isArray(log2[date])) return;
        $dialog2.find(".pd_log_content").html(getLogContent(log2, date, Config.logSortType)).parent().find("legend:first-child").text("\u65E5\u5FD7\u5185\u5BB9 (\u5171".concat(log2[date].length, "\u9879)"));
      };
      getLogContent = function getLogContent(log2, date, logSortType) {
        var logList2 = log2[date];
        if (logSortType === "type") {
          var sortTypeList = ["\u9886\u53D6\u6BCF\u65E5\u5956\u52B1", "\u63D0\u5347\u6218\u529B\u5149\u73AF", "\u4E89\u593A\u653B\u51FB", "\u6350\u6B3E", "\u9886\u53D6\u4E89\u593A\u5956\u52B1", "\u6279\u91CF\u653B\u51FB", "\u8BD5\u63A2\u653B\u51FB", "\u62BD\u53D6\u795E\u79D8\u76D2\u5B50", "\u62BD\u53D6\u9053\u5177\u6216\u5361\u7247", "\u6253\u5F00\u76D2\u5B50", "\u8D2D\u4E70\u7269\u54C1", "\u4F7F\u7528\u9053\u5177", "\u6062\u590D\u9053\u5177", "\u5FAA\u73AF\u4F7F\u7528\u9053\u5177", "\u5C06\u9053\u5177\u8F6C\u6362\u4E3A\u80FD\u91CF", "\u5C06\u5361\u7247\u8F6C\u6362\u4E3AVIP\u65F6\u95F4", "\u8D2D\u4E70\u9053\u5177", "\u7EDF\u8BA1\u9053\u5177\u8D2D\u4E70\u4EF7\u683C", "\u51FA\u552E\u9053\u5177", "\u7194\u70BC\u88C5\u5907", "\u795E\u79D8\u62BD\u5956", "\u7EDF\u8BA1\u795E\u79D8\u62BD\u5956\u7ED3\u679C", "\u795E\u79D8\u7B49\u7EA7\u5347\u7EA7", "\u795E\u79D8\u7CFB\u6570\u6392\u540D\u53D8\u5316", "\u6279\u91CF\u8F6C\u8D26", "\u8D2D\u4E70\u5E16\u5B50", "\u81EA\u52A8\u5B58\u6B3E"];
          logList2.sort(function (a, b) {
            return sortTypeList.indexOf(a.type) > sortTypeList.indexOf(b.type) ? 1 : -1;
          });
        } else {
          logList2.sort(function (a, b) {
            return a.time > b.time ? 1 : -1;
          });
        }
        var content = "",
          curType = "";
        var _iterator33 = _createForOfIteratorHelper(logList2),
          _step33;
        try {
          for (_iterator33.s(); !(_step33 = _iterator33.n()).done;) {
            var _step33$value = _step33.value,
              time = _step33$value.time,
              type = _step33$value.type,
              action = _step33$value.action,
              gain = _step33$value.gain,
              pay = _step33$value.pay;
            if (typeof time === "undefined" || typeof type === "undefined" || typeof action === "undefined") continue;
            var d = new Date(time);
            if (logSortType === "type") {
              if (curType !== type) {
                content += "<h3>\u3010".concat(type, "\u3011</h3>");
                curType = type;
              }
              content += "<p><b>".concat(_getTimeString(d), "\uFF1A</b>").concat(action.replace(/`([^`]+?)`/g, '<b style="color: #f00;">$1</b>'));
            } else {
              content += "<p><b>".concat(_getTimeString(d), " (").concat(type, ")\uFF1A</b>").concat(action.replace(/`([^`]+?)`/g, '<b style="color: #f00;">$1</b>'));
            }
            var stat = "";
            if ($.type(gain) === "object" && !$.isEmptyObject(gain)) {
              stat += "\uFF0C";
              for (var _i7 = 0, _Object$keys3 = Object.keys(gain); _i7 < _Object$keys3.length; _i7++) {
                var k = _Object$keys3[_i7];
                if (k === "item") {
                  var _iterator34 = _createForOfIteratorHelper(_getSortedObjectKeyList(_itemTypeList, gain[k])),
                    _step34;
                  try {
                    for (_iterator34.s(); !(_step34 = _iterator34.n()).done;) {
                      var name4 = _step34.value;
                      stat += "<i>".concat(name4, "<em>+").concat(gain[k][name4].toLocaleString(), "</em></i> ");
                    }
                  } catch (err) {
                    _iterator34.e(err);
                  } finally {
                    _iterator34.f();
                  }
                } else if (k === "arm") {
                  var _iterator35 = _createForOfIteratorHelper(_getSortedObjectKeyList(_armTypeList, gain[k])),
                    _step35;
                  try {
                    for (_iterator35.s(); !(_step35 = _iterator35.n()).done;) {
                      var _name2 = _step35.value;
                      stat += "<i>".concat(_name2, "<em>+").concat(gain[k][_name2].toLocaleString(), "</em></i> ");
                    }
                  } catch (err) {
                    _iterator35.e(err);
                  } finally {
                    _iterator35.f();
                  }
                } else if (k === "box") {
                  var _iterator36 = _createForOfIteratorHelper(_getSortedObjectKeyList(_boxTypeList, gain[k])),
                    _step36;
                  try {
                    for (_iterator36.s(); !(_step36 = _iterator36.n()).done;) {
                      var _name3 = _step36.value;
                      stat += "<i>".concat(_name3, "<em>+").concat(gain[k][_name3].toLocaleString(), "</em></i> ");
                    }
                  } catch (err) {
                    _iterator36.e(err);
                  } finally {
                    _iterator36.f();
                  }
                } else {
                  stat += "<i>".concat(k, "<em>+").concat(gain[k].toLocaleString(), "</em></i> ");
                }
              }
            }
            if ($.type(pay) === "object" && !$.isEmptyObject(pay)) {
              if (!stat) stat += "\uFF0C";
              for (var _i8 = 0, _Object$keys4 = Object.keys(pay); _i8 < _Object$keys4.length; _i8++) {
                var _k2 = _Object$keys4[_i8];
                if (_k2 === "item") {
                  for (var _i9 = 0, _Object$keys5 = Object.keys(pay[_k2]); _i9 < _Object$keys5.length; _i9++) {
                    var itemName = _Object$keys5[_i9];
                    stat += "<i>".concat(itemName, "<ins>").concat(pay[_k2][itemName].toLocaleString(), "</ins></i> ");
                  }
                } else {
                  stat += "<i>".concat(_k2, "<ins>").concat(pay[_k2].toLocaleString(), "</ins></i> ");
                }
              }
            }
            content += stat + "</p>";
          }
        } catch (err) {
          _iterator33.e(err);
        } finally {
          _iterator33.f();
        }
        return content;
      };
      showLogStat = function showLogStat(log2, date, $dialog2) {
        if (!Array.isArray(log2[date])) return;
        $dialog2.find('[data-name="stat"]').html(getLogStat(log2, date, Config.logStatType));
      };
      getLogStat = function getLogStat(log2, date, logStatType) {
        var rangeLog = {};
        if (logStatType === "custom") {
          var minDate = new Date(date);
          minDate.setDate(minDate.getDate() - Config.logStatDays + 1);
          minDate = _getDateString(minDate);
          var _iterator37 = _createForOfIteratorHelper(_getObjectKeyList(log2, 1)),
            _step37;
          try {
            for (_iterator37.s(); !(_step37 = _iterator37.n()).done;) {
              var d = _step37.value;
              if (d >= minDate && d <= date) rangeLog[d] = log2[d];
            }
          } catch (err) {
            _iterator37.e(err);
          } finally {
            _iterator37.f();
          }
        } else if (logStatType === "all") {
          rangeLog = log2;
        } else {
          rangeLog[date] = log2[date];
        }
        var income = {},
          expense = {},
          profit = {};
        var lootCount = 0,
          lootLevelStat = {
            total: 0,
            min: 0,
            max: 0
          },
          lootBoxTotalNum = 0,
          lootBoxStat = {};
        var boxTotalNum = 0,
          boxStat = {},
          boxGain = {
            "KFB": 0,
            "\u7ECF\u9A8C\u503C": 0,
            "\u9053\u5177": 0,
            "\u88C5\u5907": 0,
            item: {},
            arm: {}
          },
          boxRandomTotalNum = 0,
          boxRandomTotalCount = 0;
        var validItemNum = 0,
          validItemStat = {},
          invalidItemNum = 0,
          invalidItemStat = {};
        var invalidKeyList = ["item", "arm", "box", "\u593A\u53D6KFB", "VIP\u5C0F\u65F6", "\u795E\u79D8", "\u71C3\u70E7\u4F24\u5BB3", "\u547D\u4E2D", "\u95EA\u907F", "\u66B4\u51FB\u6BD4\u4F8B", "\u66B4\u51FB\u51E0\u7387", "\u9632\u5FA1", "\u6709\u6548\u9053\u5177", "\u65E0\u6548\u9053\u5177", "\u957F\u5251\u7ECF\u9A8C", "\u77ED\u5F13\u7ECF\u9A8C", "\u6CD5\u6756\u7ECF\u9A8C"];
        for (var _d in rangeLog) {
          var _iterator38 = _createForOfIteratorHelper(rangeLog[_d]),
            _step38;
          try {
            for (_iterator38.s(); !(_step38 = _iterator38.n()).done;) {
              var _step38$value = _step38.value,
                type = _step38$value.type,
                action = _step38$value.action,
                gain = _step38$value.gain,
                pay = _step38$value.pay,
                notStat = _step38$value.notStat;
              if (typeof type === "undefined" || typeof notStat !== "undefined") continue;
              if ($.type(gain) === "object") {
                for (var _i0 = 0, _Object$keys6 = Object.keys(gain); _i0 < _Object$keys6.length; _i0++) {
                  var k = _Object$keys6[_i0];
                  if (invalidKeyList.includes(k)) continue;
                  if (typeof income[k] === "undefined") income[k] = gain[k];else income[k] += gain[k];
                }
              }
              if ($.type(pay) === "object") {
                for (var _i1 = 0, _Object$keys7 = Object.keys(pay); _i1 < _Object$keys7.length; _i1++) {
                  var _k3 = _Object$keys7[_i1];
                  if (invalidKeyList.includes(_k3)) continue;
                  if (typeof expense[_k3] === "undefined") expense[_k3] = pay[_k3];else expense[_k3] += pay[_k3];
                }
              }
              if (type === "\u4E89\u593A\u653B\u51FB" && $.type(gain) === "object") {
                var matches = /第`(\d+)`层/.exec(action);
                if (matches) {
                  lootCount++;
                  var level = parseInt(matches[1]);
                  lootLevelStat.total += level;
                  if (lootLevelStat.max < level) lootLevelStat.max = level;
                  if (!lootLevelStat.min || lootLevelStat.min > level) lootLevelStat.min = level;
                  if ($.type(gain["box"]) === "object") {
                    var _iterator39 = _createForOfIteratorHelper(_entries(gain["box"])),
                      _step39;
                    try {
                      for (_iterator39.s(); !(_step39 = _iterator39.n()).done;) {
                        var _step39$value = _slicedToArray(_step39.value, 2),
                          key = _step39$value[0],
                          num2 = _step39$value[1];
                        lootBoxTotalNum += num2;
                        if (!(key in lootBoxStat)) lootBoxStat[key] = {
                          total: 0,
                          min: -1,
                          max: -1
                        };
                        lootBoxStat[key].total += num2;
                        if (lootBoxStat[key].max < num2) lootBoxStat[key].max = num2;
                        if (lootBoxStat[key].min < 0 || lootBoxStat[key].min > num2) lootBoxStat[key].min = num2;
                      }
                    } catch (err) {
                      _iterator39.e(err);
                    } finally {
                      _iterator39.f();
                    }
                    var _iterator40 = _createForOfIteratorHelper(_boxTypeList),
                      _step40;
                    try {
                      for (_iterator40.s(); !(_step40 = _iterator40.n()).done;) {
                        var _key = _step40.value;
                        if (!(_key in gain["box"]) && _key in lootBoxStat) lootBoxStat[_key].min = 0;
                      }
                    } catch (err) {
                      _iterator40.e(err);
                    } finally {
                      _iterator40.f();
                    }
                  }
                }
              } else if (type === "\u6253\u5F00\u76D2\u5B50" && $.type(gain) === "object" && $.type(pay) === "object") {
                var _matches2 = /【`(.+?)`】打开成功/.exec(action);
                if (!_matches2) continue;
                var boxType = _matches2[1];
                var boxNum = Math.abs(pay["\u76D2\u5B50"]);
                boxTotalNum += boxNum;
                if (!(boxType in boxStat)) boxStat[boxType] = 0;
                boxStat[boxType] += Math.abs(pay["\u76D2\u5B50"]);
                var randomMatches = /平均随机值【`([\d\.]+)`】/.exec(action);
                if (randomMatches) {
                  boxRandomTotalCount += boxNum;
                  boxRandomTotalNum += parseFloat(randomMatches[1]) * boxNum;
                }
                var _iterator41 = _createForOfIteratorHelper(_entries(gain)),
                  _step41;
                try {
                  for (_iterator41.s(); !(_step41 = _iterator41.n()).done;) {
                    var _step41$value = _slicedToArray(_step41.value, 2),
                      _key2 = _step41$value[0],
                      value = _step41$value[1];
                    if (!(_key2 in boxGain)) continue;
                    if ($.type(value) === "object") {
                      var _iterator42 = _createForOfIteratorHelper(_entries(value)),
                        _step42;
                      try {
                        for (_iterator42.s(); !(_step42 = _iterator42.n()).done;) {
                          var _step42$value = _slicedToArray(_step42.value, 2),
                            name4 = _step42$value[0],
                            _num = _step42$value[1];
                          if (!(name4 in boxGain[_key2])) boxGain[_key2][name4] = 0;
                          boxGain[_key2][name4] += _num;
                        }
                      } catch (err) {
                        _iterator42.e(err);
                      } finally {
                        _iterator42.f();
                      }
                    } else {
                      boxGain[_key2] += value;
                    }
                  }
                } catch (err) {
                  _iterator41.e(err);
                } finally {
                  _iterator41.f();
                }
              } else if ((type === "\u4F7F\u7528\u9053\u5177" || type === "\u5FAA\u73AF\u4F7F\u7528\u9053\u5177") && $.type(gain) === "object") {
                var _matches3 = /【`Lv.(\d+)：(.+?)`】/.exec(action);
                if (_matches3) {
                  var itemLevel = parseInt(_matches3[1]);
                  if (itemLevel < 3) continue;
                  var itemName = _matches3[2];
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
          } catch (err) {
            _iterator38.e(err);
          } finally {
            _iterator38.f();
          }
        }
        var content = "";
        var sortStatTypeList = ["KFB", "\u7ECF\u9A8C\u503C", "\u8D21\u732E", "\u8F6C\u8D26\u989D\u5EA6", "\u76D2\u5B50", "\u9053\u5177", "\u5DF2\u4F7F\u7528\u9053\u5177", "\u88C5\u5907", "\u6B66\u5668\u7ECF\u9A8C", "\u62A4\u7532\u7ECF\u9A8C", "\u9879\u94FE\u7ECF\u9A8C", "\u80FD\u91CF", "\u5361\u7247"];
        content += "<strong>\u6536\u83B7\uFF1A</strong>";
        var _iterator43 = _createForOfIteratorHelper(_getSortedObjectKeyList(sortStatTypeList, income)),
          _step43;
        try {
          for (_iterator43.s(); !(_step43 = _iterator43.n()).done;) {
            var _key5 = _step43.value;
            profit[_key5] = income[_key5];
            content += "<i>".concat(_key5, "<em>+").concat(income[_key5].toLocaleString(), "</em></i> ");
          }
        } catch (err) {
          _iterator43.e(err);
        } finally {
          _iterator43.f();
        }
        content += "<br><strong>\u4ED8\u51FA\uFF1A</strong>";
        var _iterator44 = _createForOfIteratorHelper(_getSortedObjectKeyList(sortStatTypeList, expense)),
          _step44;
        try {
          for (_iterator44.s(); !(_step44 = _iterator44.n()).done;) {
            var _key6 = _step44.value;
            if (typeof profit[_key6] === "undefined") profit[_key6] = expense[_key6];else profit[_key6] += expense[_key6];
            content += "<i>".concat(_key6, "<ins>").concat(expense[_key6].toLocaleString(), "</ins></i> ");
          }
        } catch (err) {
          _iterator44.e(err);
        } finally {
          _iterator44.f();
        }
        content += "<br><strong>\u7ED3\u4F59\uFF1A</strong>";
        var _iterator45 = _createForOfIteratorHelper(_getSortedObjectKeyList(sortStatTypeList, profit)),
          _step45;
        try {
          for (_iterator45.s(); !(_step45 = _iterator45.n()).done;) {
            var _key7 = _step45.value;
            content += "<i>".concat(_key7).concat(_getStatFormatNumber(profit[_key7]), "</i> ");
          }
        } catch (err) {
          _iterator45.e(err);
        } finally {
          _iterator45.f();
        }
        content += '<div style="margin: 5px 0; border-bottom: 1px dashed #ccccff;"></div>';
        content += "\n<strong>\u4E89\u593A\u653B\u51FB\u7EDF\u8BA1\uFF1A</strong><i>\u6B21\u6570<em>+".concat(lootCount, "</em></i> ");
        if (lootCount > 0) {
          content += "<i>\u5C42\u6570<span class=\"pd_stat_extra\">(<em title=\"\u5E73\u5747\u503C\">+".concat((lootLevelStat.total / lootCount).toFixed(2), "</em>|<em title=\"\u6700\u5C0F\u503C\">+").concat(lootLevelStat.min, "</em>|<em title=\"\u6700\u5927\u503C\">+").concat(lootLevelStat.max, "</em>)</span></i> ");
          content += "<i>\u76D2\u5B50<em>+".concat(lootBoxTotalNum.toLocaleString(), "</em></i> ");
          var _iterator46 = _createForOfIteratorHelper(_getSortedObjectKeyList(_boxTypeList, lootBoxStat)),
            _step46;
          try {
            for (_iterator46.s(); !(_step46 = _iterator46.n()).done;) {
              var _key3 = _step46.value;
              if (!lootBoxStat[_key3].total) continue;
              content += "<i>".concat(_key3, "<em>+").concat(lootBoxStat[_key3].total.toLocaleString(), "</em><span class=\"pd_stat_extra\">(<em title=\"\u5E73\u5747\u503C\">+").concat((lootBoxStat[_key3].total / lootCount).toFixed(2), "</em>|<em title=\"\u6700\u5C0F\u503C\">+").concat(lootBoxStat[_key3].min, "</em>|<em title=\"\u6700\u5927\u503C\">+").concat(lootBoxStat[_key3].max, "</em>)</span></i> ");
            }
          } catch (err) {
            _iterator46.e(err);
          } finally {
            _iterator46.f();
          }
        }
        var boxStatContent = "";
        var _iterator47 = _createForOfIteratorHelper(_getSortedObjectKeyList(_boxTypeList, boxStat)),
          _step47;
        try {
          for (_iterator47.s(); !(_step47 = _iterator47.n()).done;) {
            var _boxType = _step47.value;
            if (boxStatContent) boxStatContent += "|";
            boxStatContent += "<ins title=\"".concat(_boxType, "\">-").concat(boxStat[_boxType].toLocaleString(), "</ins>");
          }
        } catch (err) {
          _iterator47.e(err);
        } finally {
          _iterator47.f();
        }
        content += "<br><strong>\u76D2\u5B50\u6536\u83B7\u7EDF\u8BA1\uFF1A</strong><i>\u76D2\u5B50<ins>-".concat(boxTotalNum, "</ins>").concat(boxStatContent ? "<span class=\"pd_stat_extra\">(".concat(boxStatContent, ")</span>") : "", "</i> ");
        if (boxRandomTotalCount > 0) {
          content += "<i>\u5E73\u5747\u968F\u673A\u503C<em>+".concat(_getFixedNumLocStr(boxRandomTotalNum / boxRandomTotalCount, 2), "</em></i> ");
        }
        if (boxTotalNum > 0) {
          var _iterator48 = _createForOfIteratorHelper(_entries(boxGain)),
            _step48;
          try {
            for (_iterator48.s(); !(_step48 = _iterator48.n()).done;) {
              var _step48$value = _slicedToArray(_step48.value, 2),
                _key4 = _step48$value[0],
                _value = _step48$value[1];
              if (!_value || $.type(_value) === "object" && $.isEmptyObject(_value)) continue;
              if ($.type(_value) === "object") {
                var typeList = _key4 === "item" ? _itemTypeList : _armTypeList;
                var _iterator49 = _createForOfIteratorHelper(_getSortedObjectKeyList(typeList, _value)),
                  _step49;
                try {
                  for (_iterator49.s(); !(_step49 = _iterator49.n()).done;) {
                    var _name4 = _step49.value;
                    content += "<i>".concat(_name4, "<em>+").concat(_value[_name4].toLocaleString(), "</em></i> ");
                  }
                } catch (err) {
                  _iterator49.e(err);
                } finally {
                  _iterator49.f();
                }
              } else {
                content += "<i>".concat(_key4, "<span class=\"pd_stat_extra\"><em>+").concat(_value.toLocaleString(), "</em>(<em title=\"\u5E73\u5747\u503C\">+").concat(_getFixedNumLocStr(_value / boxTotalNum, 2).toLocaleString(), "</em>)</span></i> ");
              }
            }
          } catch (err) {
            _iterator48.e(err);
          } finally {
            _iterator48.f();
          }
        }
        content += "<br><strong>\u6709\u6548\u9053\u5177\u7EDF\u8BA1\uFF1A</strong><i>\u6709\u6548\u9053\u5177<em>+".concat(validItemNum.toLocaleString(), "</em></i> ");
        var _iterator50 = _createForOfIteratorHelper(_getSortedObjectKeyList(_itemTypeList, validItemStat)),
          _step50;
        try {
          for (_iterator50.s(); !(_step50 = _iterator50.n()).done;) {
            var _itemName = _step50.value;
            content += "<i>".concat(_itemName, "<em>+").concat(validItemStat[_itemName].toLocaleString(), "</em></i> ");
          }
        } catch (err) {
          _iterator50.e(err);
        } finally {
          _iterator50.f();
        }
        content += "<br><strong>\u65E0\u6548\u9053\u5177\u7EDF\u8BA1\uFF1A</strong><i>\u65E0\u6548\u9053\u5177<em>+".concat(invalidItemNum.toLocaleString(), "</em></i> ");
        var _iterator51 = _createForOfIteratorHelper(_getSortedObjectKeyList(_itemTypeList, invalidItemStat)),
          _step51;
        try {
          for (_iterator51.s(); !(_step51 = _iterator51.n()).done;) {
            var _itemName2 = _step51.value;
            content += "<i>".concat(_itemName2, "<em>+").concat(invalidItemStat[_itemName2].toLocaleString(), "</em></i> ");
          }
        } catch (err) {
          _iterator51.e(err);
        } finally {
          _iterator51.f();
        }
        return content;
      };
      showImportOrExportLogDialog = function showImportOrExportLogDialog() {
        var dialogName2 = "pdImOrExLogDialog";
        if ($("#" + dialogName2).length > 0) return;
        var log2 = _read();
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <div style=\"margin-top: 5px;\">\n    <label style=\"color: #f00;\"><input type=\"radio\" name=\"logType\" value=\"setting\" checked> \u5BFC\u5165/\u5BFC\u51FA\u65E5\u5FD7</label>\n    <label style=\"color: #00f;\"><input type=\"radio\" name=\"logType\" value=\"text\"> \u5BFC\u51FA\u65E5\u5FD7\u6587\u672C</label>\n  </div>\n  <div data-name=\"logSetting\">\n    <strong>\u5BFC\u5165\u65E5\u5FD7\uFF1A</strong>\u5C06\u65E5\u5FD7\u5185\u5BB9\u7C98\u8D34\u5230\u6587\u672C\u6846\u4E2D\u5E76\u70B9\u51FB\u5408\u5E76\u6216\u8986\u76D6\u6309\u94AE\u5373\u53EF<br>\n    <strong>\u5BFC\u51FA\u65E5\u5FD7\uFF1A</strong>\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u522B\u5904\u5373\u53EF<br>\n    <textarea name=\"setting\" style=\"width: 600px; height: 400px; word-break: break-all;\"></textarea>\n  </div>\n  <div data-name=\"logText\" style=\"display: none;\">\n    <strong>\u5BFC\u51FA\u65E5\u5FD7\u6587\u672C</strong>\uFF1A\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u522B\u5904\u5373\u53EF\n    <div>\n      <label title=\"\u6309\u65F6\u95F4\u987A\u5E8F\u6392\u5E8F\"><input type=\"radio\" name=\"sortType2\" value=\"time\" checked> \u6309\u65F6\u95F4</label>\n      <label title=\"\u6309\u65E5\u5FD7\u7C7B\u522B\u6392\u5E8F\"><input type=\"radio\" name=\"sortType2\" value=\"type\"> \u6309\u7C7B\u522B</label>\n      <label title=\"\u5728\u65E5\u5FD7\u6587\u672C\u91CC\u663E\u793A\u6BCF\u65E5\u4EE5\u53CA\u5168\u90E8\u6570\u636E\u7684\u7EDF\u8BA1\u7ED3\u679C\"><input type=\"checkbox\" name=\"showStat\" checked> \u663E\u793A\u7EDF\u8BA1</label>\n    </div>\n    <textarea name=\"text\" style=\"width: 600px; height: 400px;\" readonly></textarea>\n  </div>\n</div>\n<div class=\"pd_cfg_btns\">\n  <button name=\"merge\" type=\"button\">\u5408\u5E76\u65E5\u5FD7</button>\n  <button name=\"overwrite\" type=\"button\" style=\"color: #f00;\">\u8986\u76D6\u65E5\u5FD7</button>\n  <button data-action=\"close\" type=\"button\">\u5173\u95ED</button>\n</div>";
        var $dialog2 = _create(dialogName2, "\u5BFC\u5165\u6216\u5BFC\u51FA\u65E5\u5FD7", html2);
        $dialog2.find('[name="sortType2"], [name="showStat"]').click(function () {
          showLogText(log2, $dialog2);
          $dialog2.find('[name="text"]').select();
        }).end().find('[name="logType"]').click(function () {
          var type = $(this).val();
          $dialog2.find("[data-name=\"log".concat(type === "text" ? "Setting" : "Text", "\"]")).hide();
          $dialog2.find("[data-name=\"log".concat(type === "text" ? "Text" : "Setting", "\"]")).show();
          $dialog2.find("[data-name=\"log".concat(type === "text" ? "Text" : "Setting", "\"]")).select();
        }).end().find('[name="merge"], [name="overwrite"]').click(function (e) {
          e.preventDefault();
          var name4 = $(this).attr("name");
          if (!confirm("\u662F\u5426\u5C06\u6587\u672C\u6846\u4E2D\u7684\u65E5\u5FD7".concat(name4 === "overwrite" ? "\u8986\u76D6" : "\u5408\u5E76", "\u5230\u672C\u5730\u65E5\u5FD7\uFF1F"))) return;
          var newLog = $.trim($dialog2.find('[name="setting"]').val());
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
          if (name4 === "merge") log2 = _getMergeLog(log2, newLog);else log2 = newLog;
          _write(log2);
          alert("\u65E5\u5FD7\u5DF2\u5BFC\u5165");
          location.reload();
        });
        show2(dialogName2);
        $dialog2.find("[name=\"sortType2\"][value=\"".concat(Config.logSortType, "\"]")).prop("checked", true).triggerHandler("click");
        $dialog2.find('[name="setting"]').val(JSON.stringify(log2)).select().focus();
        _runFunc("LogDialog.showImportOrExportLogDialog_after_");
      };
      showLogText = function showLogText(log2, $dialog2) {
        var logSortType = $dialog2.find('input[name="sortType2"]:checked').val();
        var isShowStat = $dialog2.find('[name="showStat"]').prop("checked");
        var content = "",
          lastDate = "";
        for (var _i10 = 0, _Object$keys8 = Object.keys(log2); _i10 < _Object$keys8.length; _i10++) {
          var date = _Object$keys8[_i10];
          if (!Array.isArray(log2[date])) continue;
          if (lastDate > date) lastDate = date;
          content += "\u3010".concat(date, "\u3011(\u5171").concat(log2[date].length, "\u9879)\n").concat(logSortType === "type" ? "" : "\n") + getLogContent(log2, date, logSortType).replace(/<h3>/g, "\n").replace(/<\/h3>/g, "\n").replace(/<\/p>/g, "\n").replace(/(<.+?>|<\/.+?>)/g, "").replace(/`/g, "");
          if (isShowStat) {
            content += "".concat("-".repeat(46), "\n\u5408\u8BA1\uFF1A\n").concat(getLogStat(log2, date, "current").replace(/<br\s*\/?>/g, "\n").replace(/(<.+?>|<\/.+?>)/g, ""), "\n");
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
    addConfigAndLogDialogLink: function addConfigAndLogDialogLink() {
      return _addConfigAndLogDialogLink;
    },
    addFastNavMenu: function addFastNavMenu() {
      return _addFastNavMenu;
    },
    addPolyfill: function addPolyfill() {
      return _addPolyfill;
    },
    addSearchDialogLink: function addSearchDialogLink() {
      return _addSearchDialogLink;
    },
    addSlowActionChecked: function addSlowActionChecked() {
      return _addSlowActionChecked;
    },
    appendCss: function appendCss() {
      return _appendCss;
    },
    bindElementTitleClick: function bindElementTitleClick() {
      return _bindElementTitleClick;
    },
    bindSearchTypeSelectMenuClick: function bindSearchTypeSelectMenuClick() {
      return _bindSearchTypeSelectMenuClick;
    },
    blockThread: function blockThread() {
      return _blockThread;
    },
    blockUsers: function blockUsers() {
      return _blockUsers;
    },
    changeIdColor: function changeIdColor() {
      return _changeIdColor;
    },
    changeNewTipsColor: function changeNewTipsColor() {
      return _changeNewTipsColor;
    },
    checkBrowserType: function checkBrowserType() {
      return _checkBrowserType;
    },
    followUsers: function followUsers() {
      return _followUsers;
    },
    getDailyBonus: function getDailyBonus() {
      return _getDailyBonus2;
    },
    getNextTimingIntervalInfo: function getNextTimingIntervalInfo() {
      return _getNextTimingIntervalInfo;
    },
    getSafeId: function getSafeId() {
      return _getSafeId;
    },
    getUidAndUserName: function getUidAndUserName() {
      return _getUidAndUserName;
    },
    handleSideBarLink: function handleSideBarLink() {
      return _handleSideBarLink;
    },
    makeSearchByBelowTwoKeyWordAvailable: function makeSearchByBelowTwoKeyWordAvailable() {
      return _makeSearchByBelowTwoKeyWordAvailable;
    },
    modifyDomainTips: function modifyDomainTips() {
      return _modifyDomainTips;
    },
    preventCloseWindowWhenActioning: function preventCloseWindowWhenActioning() {
      return _preventCloseWindowWhenActioning;
    },
    repairBbsErrorCode: function repairBbsErrorCode() {
      return _repairBbsErrorCode;
    },
    showCommonImportOrExportConfigDialog: function showCommonImportOrExportConfigDialog() {
      return _showCommonImportOrExportConfigDialog;
    },
    showCommonImportOrExportLogDialog: function showCommonImportOrExportLogDialog() {
      return _showCommonImportOrExportLogDialog;
    },
    showElementTitleTips: function showElementTitleTips() {
      return _showElementTitleTips;
    },
    showFormatLog: function showFormatLog() {
      return _showFormatLog;
    },
    startTimingMode: function startTimingMode() {
      return _startTimingMode;
    },
    turnPageViaKeyboard: function turnPageViaKeyboard() {
      return _turnPageViaKeyboard;
    }
  });
  var _getUidAndUserName, _getSafeId, _checkBrowserType, _appendCss, _addConfigAndLogDialogLink, _handleSideBarLink, _preventCloseWindowWhenActioning, _showFormatLog, _addPolyfill, _getNextTimingIntervalInfo, _startTimingMode, _getDailyBonus2, _followUsers, _blockUsers, _blockThread, _addFastNavMenu, _changeIdColor, _showElementTitleTips, _bindElementTitleClick, _bindSearchTypeSelectMenuClick, _makeSearchByBelowTwoKeyWordAvailable, _addSearchDialogLink, _repairBbsErrorCode, _turnPageViaKeyboard, _showCommonImportOrExportConfigDialog, _showCommonImportOrExportLogDialog, _changeNewTipsColor, _addSlowActionChecked, _modifyDomainTips;
  var init_Public = __esm({
    "src/module/Public.js": function src_module_PublicJs() {
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
      _getUidAndUserName = function _getUidAndUserName() {
        var $userName = $('#kf_topuser > a[href="javascript:;"]').eq(0);
        var $uid = Info_default.$userMenu.find('a[href^="profile.php?action=show&uid="]').eq(0);
        if (!$userName.length || !$uid.length) return false;
        $userName.attr("id", "pdUserName");
        Info_default.userName = $.trim($userName.contents().get(0).textContent);
        if (!Info_default.userName) return false;
        var matches = /&uid=(\d+)/.exec($uid.attr("href"));
        if (!matches) return false;
        Info_default.uid = parseInt(matches[1]);
        return true;
      };
      _getSafeId = function _getSafeId() {
        var safeId3 = $("input#safeid").val();
        if (!safeId3) {
          var matches = /safeid=(\w+)/i.exec($('a[href*="safeid="]:first').attr("href"));
          if (matches) safeId3 = matches[1];
        }
        return safeId3 ? safeId3 : "";
      };
      _checkBrowserType = function _checkBrowserType() {
        if (Config.browseType === "auto") {
          Info_default.isMobile = /(Mobile|MIDP)/i.test(navigator.userAgent);
        } else {
          Info_default.isMobile = Config.browseType === "mobile";
        }
      };
      _appendCss = function _appendCss() {
        $("head").append("\n<style>\n  /* \u516C\u5171 */\n  .pd_highlight { color: #f00 !important; }\n  .pd_notice, .pd_msg .pd_notice { font-style: italic; color: #666; }\n  .pd_input, .pd_cfg_main input, .pd_cfg_main select {\n    vertical-align: middle; height: auto; margin-right: 0; line-height: 22px; font-size: 12px;\n  }\n  .pd_input[type=\"text\"], .pd_input[type=\"number\"], .pd_cfg_main input[type=\"text\"], .pd_cfg_main input[type=\"number\"] {\n    height: 22px; line-height: 22px;\n  }\n  .pd_input:focus, .pd_cfg_main input[type=\"text\"]:focus, .pd_cfg_main input[type=\"number\"]:focus, .pd_cfg_main textarea:focus,\n      .pd_textarea:focus { border-color: #7eb4ea; }\n  .pd_textarea, .pd_cfg_main textarea { border: 1px solid #ccc; font-size: 12px; }\n  .pd_btn_link { margin-left: 4px; margin-right: 4px; }\n  .pd_custom_tips { cursor: help; }\n  .pd_disabled_link { color: #999 !important; text-decoration: none !important; cursor: default; }\n  .pd_not_click_link, .pd_not_click_link:visited { color: #000; pointer-events: none; }\n  hr {\n    box-sizing: content-box; height: 0; margin-top: 7px; margin-bottom: 7px; border: 0; border-top: 1px solid rgba(0, 0, 0, .2);\n  }\n  .pd_overflow { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n  .pd_hide { width: 0 !important; height: 0 !important; font: 0/0 a; color: transparent; background-color: transparent; border: 0 !important; }\n  .pd_stat i { display: inline-block; font-style: normal; margin-right: 3px; }\n  .pd_stat_extra em, .pd_stat_extra ins { padding: 0 2px; cursor: help; }\n  .pd_panel { position: absolute; overflow-y: auto; background-color: #fff; border: 1px solid #9191ff; opacity: 0.9; }\n  .pd_title_tips {\n    position: absolute; max-width: 470px; font-size: 12px; line-height: 1.5em;\n    padding: 2px 5px; background-color: #fcfcfc; border: 1px solid #767676; z-index: 9999;\n  }\n  .pd_search_type {\n    float: left; height: 26px; line-height: 26px; width: 65px; text-align: center;\n    border: 1px solid #ccc; border-left: none; border-right: none; cursor: pointer;\n  }\n  .pd_search_type i { font-style: normal; margin-left: 5px; font-family: sans-serif; }\n  .pd_search_type_list {\n    position: absolute; width: 63px; background-color: #fcfcfc; border: 1px solid #ccc; border-top: none; line-height: 26px;\n    text-indent: 13px; cursor: pointer; z-index: 1004;\n  }\n  .pd_search_type_list li:hover { color: #fff; background-color: #87c3cf; }\n  #alldiv > .drow:nth-child(2) { ".concat(Config.navBarAlwaysTopEnabled && !location.host.endsWith(".miaola.info") ? "position: sticky; top: 0;" : "", " z-index: 1001 !important; }\n  .pd_domain_tips { position: absolute; top: 0; width: 1200px; }\n  \n  /* \u6D88\u606F\u6846 */\n  .pd_mask { position: fixed; width: 100%; height: 100%; left: 0; top: 0; z-index: 1000; }\n  .pd_msg_container { position: ").concat(Info_default.isMobile ? "absolute" : "fixed", "; width: 100%; z-index: 1003; }\n  .pd_msg {\n    border: 1px solid #6ca7c0; text-shadow: 0 0 3px rgba(0, 0, 0, 0.1); border-radius: 3px; padding: 10px 40px; text-align: center;\n    font-size: 14px; position: absolute; display: none; color: #333; line-height: 1.6em; background: #f8fcfe; background-repeat: no-repeat;\n    background-image: -webkit-linear-gradient(#f9fcfe, #f6fbfe 25%, #eff7fc);\n    background-image: -moz-linear-gradient(top, #f9fcfe, #f6fbfe 25%, #eff7fc);\n    background-image: -ms-linear-gradient(#f9fcfe, #f6fbfe 25%, #eff7fc);\n    background-image: linear-gradient(#f9fcfe, #f6fbfe 25%, #eff7fc);\n  }\n  .pd_msg strong { margin-right: 5px; }\n  .pd_msg i { font-style: normal; padding-left: 10px; }\n  .pd_msg em, .pd_stat em, .pd_msg ins, .pd_stat ins { font-weight: 700; font-style: normal; color:#ff6600; padding: 0 3px; }\n  .pd_msg ins, .pd_stat ins { text-decoration: none; color: #339933; }\n  .pd_msg a { font-weight: bold; margin-left: 15px; }\n  .pd_change_domain_tips_area {\n    position: fixed;\n    top: 0;\n    width: 1198px;\n    text-align: center;\n    line-height: 50px;\n    font-size: 16px;\n    color: #842029;\n    background-color: #f8d7da;\n    border: 1px solid #f5c2c7;\n    z-index: 1002 !important;\n  }\n  \n  /* \u5E16\u5B50\u9875\u9762 */\n  .readtext .pd_goto_link { color: #000; }\n  .readtext .pd_goto_link:hover { color: #51d; }\n  .pd_multi_quote_chk { margin-right: 2px; float: right; }\n  .pd_fast_goto_floor { margin-right: 10px !important; line-height: 32px; }\n  .pd_user_memo { font-size: 12px; color: #999; margin-left: 5px; }\n  .readtext img[onclick], .pd_kf18 { width: auto; max-width: 850px; }\n  .read_fds { text-align: left !important; font-weight: normal !important; font-style: normal !important; }\n  .pd_code_area { max-height: 550px; margin-top: 1em; overflow-y: auto; font-size: 12px; font-family: Consolas, \"Courier New\"; }\n  .pd_code_area .pd_copy_code { position: absolute; margin-top: -1em; min-width: 5em; text-align: center; background-color: #fffbf4; height: 20px; }\n  .pd_good_post_mark { outline: 3px solid #f00; outline-offset: -3px; }\n  .pd_follow_highlight { box-shadow: 0 0 3px 1px #ff9933 !important; }\n  \n  /* \u6211\u7684\u7269\u54C1\u9875\u9762 */\n  .pd_item_btns { text-align: right; margin-top: 5px;  }\n  .pd_item_btns button, .pd_item_btns input { margin-bottom: 2px; vertical-align: middle; }\n  .pd_result { border: 1px solid #99f; padding: 5px; margin-top: 10px; line-height: 2em; }\n  .pd_arm_equipped { background-color:#eef; -webkit-box-shadow: 0 0 7px #99f; box-shadow: 0 0 7px #99f; }\n  .pd_arm_equipped > td:nth-child(3)::before { content: \"\uFF08\u88C5\u5907\u4E2D\uFF09\"; font-weight: bold; }\n  .pd_arm_equipped a[data-name=\"equip\"], .pd_arm_equipped a[data-name=\"smelt\"] { color: #777; pointer-events: none; }\n  .kf_fw_ig4 > tbody > tr > td { position: relative; }\n  .kf_fw_ig4 > tbody > tr > td[data-memo]::after {\n    content: \"(\" attr(data-memo) \")\"; position: absolute; bottom: 0; right: 5px; padding: 0 5px; color: #777; background: rgba(252, 252, 252, .7);\n  }\n  .kf_fw_ig4 > tbody > .pd_arm_equipped > td[data-memo]::after { background: rgba(238, 238, 255, .7); }\n  .kf_fw_ig4 > tbody > tr > td > input[name=\"armCheck\"] { position: absolute; top: 0; left: 5px; }\n  .show_arm_info { position: absolute; top: 0; right: 0; padding: 0 10px; background: rgba(252, 252, 252, .9); }\n  .pd_arm_equipped .show_arm_info { background: rgba(238, 238, 255, .9); }\n  .pd_useless_sub_property { color: #999; text-decoration: line-through; }\n  .pd_arm_id { font-style: normal; color: #999; }\n  .pd_new_arm_mark { font-style: normal; color: #f00; }\n  \n  /* \u53D1\u5E16\u9875\u9762 */\n  #pdSmilePanel img { margin: 3px; cursor: pointer; }\n  .editor-button .pd_editor_btn { background: none; text-indent: 0; line-height: 18px; cursor: default; }\n  .pd_post_extra_option { text-align: left; margin: 5px; }\n  .pd_post_extra_option input { vertical-align: middle; height: auto; margin-right: 0; }\n  \n  /* \u5176\u5B83\u9875\u9762 */\n  .pd_thread_page { margin-left: 5px; }\n  .pd_thread_page a { color: #444; padding: 0 3px; }\n  .pd_thread_page a:hover { color: #51d; }\n  .pd_card_chk { position: absolute; bottom: -8px; left: 1px; }\n  .pd_thread_goto {\n    position: absolute; top: 0; right: 0; box-sizing: border-box; width: 100%; height: 100%; visibility: hidden; z-index: 1;\n  }\n  .pd_id_color_select > td { position: relative; cursor: pointer; }\n  .pd_id_color_select > td > input { position: absolute; top: 18px; left: 10px; }\n  #pdPropertiesArea td { position: relative; }\n  #pdPropertiesArea input[type=\"text\"] { width: 211px; }\n  .pd_property_diff { position: absolute; top: 0px; right: 5px; }\n  .pd_property_diff em { font-style: normal; }\n  .rightbox1 { overflow: hidden; }\n  .pd_rightbox1_gray, .pd_rightbox1_gray:visited, .pd_rightbox1_gray:hover { color: #b0b0ff; border-color: #b0b0ff; }\n\n  /* \u8BBE\u7F6E\u5BF9\u8BDD\u6846 */\n  .pd_cfg_ml { margin-left: 10px; }\n  .pd_cfg_box {\n    position: ").concat(Info_default.isMobile ? "absolute" : "fixed", "; border: 1px solid #9191ff; display: none; z-index: 1002;\n    -webkit-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); -moz-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);\n  }\n  .pd_cfg_box h1 {\n    text-align: center; font-size: 14px; background-color: #9191ff; color: #fff; line-height: 2em; margin: 0; padding-left: 20px;\n  }\n  .pd_cfg_box h1 span { float: right; cursor: pointer; padding: 0 10px; }\n  .pd_cfg_nav { text-align: right; margin-top: 5px; margin-bottom: -5px; }\n  .pd_cfg_main { background-color: #fcfcfc; padding: 0 10px; font-size: 12px; line-height: 24px; min-height: 50px; overflow: auto; }\n  .pd_cfg_main fieldset { border: 1px solid #ccccff; padding: 0 6px 6px; }\n  .pd_cfg_main legend { font-weight: bold; }\n  .pd_cfg_main input[type=\"color\"] { height: 18px; width: 30px; padding: 0; }\n  .pd_cfg_tips { color: #51d; text-decoration: none; cursor: help; }\n  .pd_cfg_tips:hover { color: #ff0000; }\n  #pdConfigDialog .pd_cfg_main { overflow-x: hidden; white-space: nowrap; }\n  .pd_cfg_panel { display: inline-block; width: 400px; vertical-align: top; }\n  .pd_cfg_panel + .pd_cfg_panel { margin-left: 5px; }\n  .pd_cfg_btns { background-color: #fcfcfc; text-align: right; padding: 5px; }\n  .pd_cfg_btns input, .pd_cfg_btns button { vertical-align: middle; }\n  .pd_cfg_btns button { min-width: 80px; }\n  .pd_cfg_about { float: left; line-height: 24px; margin-left: 5px; }\n  .pd_custom_script_header { margin: 7px 0; padding: 5px; background-color: #e8e8e8; border-radius: 5px; }\n  .pd_custom_script_content { display: none; width: 750px; height: 350px; white-space: pre; }\n\n  /* \u65E5\u5FD7\u5BF9\u8BDD\u6846 */\n  .pd_log_nav { text-align: center; margin: -5px 0 -12px; font-size: 14px; line-height: 44px; }\n  .pd_log_nav a { display: inline-block; }\n  .pd_log_nav h2 { display: inline; font-size: 14px; margin-left: 7px; margin-right: 7px; }\n  .pd_log_content { height: 242px; overflow: auto; }\n  .pd_log_content h3 { display: inline-block; font-size: 12px; line-height: 22px; margin: 0; }\n  .pd_log_content h3:not(:first-child) { margin-top: 5px; }\n  .pd_log_content p { line-height: 22px; margin: 0; }\n</style>\n"));
        if (location.pathname === "/read.php" && (Config.threadContentFontSize > 0 || Config.adjustThreadContentWidthEnabled)) {
          $("head").append("\n<style>\n  .readtext > table > tbody > tr > td:nth-child(2) {\n    width: ".concat(Config.adjustThreadContentWidthEnabled ? 643.2 : 823.2, "px;\n    display: inline-block;\n    overflow-wrap: break-word;\n  }\n  .readtext > table > tbody > tr > td:nth-child(2) table { word-break: break-all; }\n</style>\n"));
        }
        if (Config.customCssEnabled) {
          $("head").append("<style>".concat(Config.customCssContent, "</style>"));
        }
      };
      _addConfigAndLogDialogLink = function _addConfigAndLogDialogLink() {
        $("\n<li><a data-name=\"openConfigDialog\" href=\"#\">\u52A9\u624B\u8BBE\u7F6E</a></li>\n<li><a data-name=\"openLogDialog\" href=\"#\">\u52A9\u624B\u65E5\u5FD7</a></li>\n").appendTo(Info_default.$userMenu).find('[data-name="openConfigDialog"]').click(function (e) {
          e.preventDefault();
          show3();
        }).end().find('[data-name="openLogDialog"]').click(function (e) {
          e.preventDefault();
          show4();
        });
      };
      _handleSideBarLink = function _handleSideBarLink() {
        var $kfb = $("a.rightbox1[title=\"\u7F51\u7AD9\u865A\u62DF\u8D27\u5E01\"]");
        $kfb.attr("id", "pdKfb");
        var matches = /(-?\d+)KFB\s*\|\s*(-?\d+(?:\.\d+)?)贡献/.exec($kfb.text());
        if (matches) {
          var kfb = parseInt(matches[1]);
          var gongXian = parseFloat(matches[2]);
          $kfb.html("<b>".concat(kfb.toLocaleString(), "</b>KFB | <b>").concat(gongXian.toLocaleString(), "</b>\u8D21\u732E")).attr("data-kfb", kfb).attr("data-gongxian", gongXian);
        }
        var $smLevel = $('a.rightbox1[href="kf_growup.php"]');
        $smLevel.attr("id", "pdSmLevel");
        matches = /神秘(-?\d+)级 \(系数排名第\s*(\d+\+?)\s*位/.exec($smLevel.text());
        if (matches) {
          var smLevel = parseInt(matches[1]);
          var smRank = matches[2];
          $smLevel.html("\u795E\u79D8<b>".concat(smLevel.toLocaleString(), "</b>\u7EA7 (\u7CFB\u6570\u6392\u540D\u7B2C<b style=\"color: #00f;\">").concat(smRank, "</b>\u4F4D)")).attr("data-sm-level", smLevel).attr("data-sm-rank", smRank);
        }
        $('a.rightbox1[href="kf_fw_ig_index.php"]').attr("id", "pdLoot");
      };
      _preventCloseWindowWhenActioning = function _preventCloseWindowWhenActioning(e) {
        if ($(".pd_mask").length > 0) {
          var msg = "\u64CD\u4F5C\u6B63\u5728\u8FDB\u884C\u4E2D\uFF0C\u786E\u5B9A\u8981\u5173\u95ED\u9875\u9762\u5417\uFF1F";
          e.returnValue = msg;
          return msg;
        }
      };
      _showFormatLog = function _showFormatLog(msgType, html2) {
        var _getResponseMsg7 = _getResponseMsg(html2),
          msg = _getResponseMsg7.msg,
          url = _getResponseMsg7.url;
        console.log("\u3010".concat(msgType, "\u3011\u56DE\u5E94\uFF1A").concat(msg).concat(url ? "\uFF1B\u8DF3\u8F6C\u5730\u5740\uFF1A".concat(_getHostNameUrl()).concat(url) : ""));
      };
      _addPolyfill = function _addPolyfill() {
        if (!Array.prototype.includes) {
          Array.prototype.includes = function (searchElement) {
            if (this == null) throw new TypeError("Array.prototype.includes called on null or undefined");
            var O = Object(this);
            var len = parseInt(O.length) || 0;
            if (len === 0) return false;
            var n = parseInt(arguments[1]) || 0;
            var k;
            if (n >= 0) k = n;else {
              k = len + n;
              if (k < 0) k = 0;
            }
            var currentElement;
            while (k < len) {
              currentElement = O[k];
              if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) return true;
              k++;
            }
            return false;
          };
        }
        if (!String.prototype.padStart) {
          String.prototype.padStart = function padStart(maxLength) {
            var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : " ";
            var O = Object(this);
            var S = String(O);
            var intMaxLength = parseInt(maxLength) || 0;
            var stringLength = parseInt(S.length) || 0;
            if (intMaxLength <= stringLength) return S;
            var filler = typeof fillString === "undefined" ? " " : String(fillString);
            if (filler === "") return S;
            var fillLen = intMaxLength - stringLength;
            while (filler.length < fillLen) {
              var fLen = filler.length;
              var remainingCodeUnits = fillLen - fLen;
              if (fLen > remainingCodeUnits) filler += filler.slice(0, remainingCodeUnits);else filler += filler;
            }
            var truncatedStringFiller = filler.slice(0, fillLen);
            return truncatedStringFiller + S;
          };
        }
        if (!String.prototype.padEnd) {
          String.prototype.padEnd = function padEnd(maxLength) {
            var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : " ";
            var O = Object(this);
            var S = String(O);
            var intMaxLength = parseInt(maxLength) || 0;
            var stringLength = parseInt(S.length) || 0;
            if (intMaxLength <= stringLength) return S;
            var filler = typeof fillString === "undefined" ? " " : String(fillString);
            if (filler === "") return S;
            var fillLen = intMaxLength - stringLength;
            while (filler.length < fillLen) {
              var fLen = filler.length;
              var remainingCodeUnits = fillLen - fLen;
              if (fLen > remainingCodeUnits) filler += filler.slice(0, remainingCodeUnits);else filler += filler;
            }
            var truncatedStringFiller = filler.slice(0, fillLen);
            return S + truncatedStringFiller;
          };
        }
      };
      _getNextTimingIntervalInfo = function _getNextTimingIntervalInfo() {
        var promoteHaloInterval = -1;
        if (Config.autoPromoteHaloEnabled) {
          var value = parseInt(_getCookie(Const_default.promoteHaloCookieName));
          if (value > 0) {
            promoteHaloInterval = Math.floor((value - $.now()) / 1e3);
          } else {
            promoteHaloInterval = 0;
          }
        }
        var getDailyBonusInterval = -1;
        if (Config.autoGetDailyBonusEnabled) {
          var _value2 = parseInt(_getCookie(Const_default.getDailyBonusCookieName));
          if (_value2 > 0) {
            var date = _getTimezoneDateByTime(Const_default.getDailyBonusAfterTime);
            date.setDate(date.getDate() + 1);
            var now = /* @__PURE__ */new Date();
            if (now > date) date.setDate(date.getDate() + 1);
            getDailyBonusInterval = Math.floor((date - now) / 1e3);
          } else if (_value2 < 0) {
            getDailyBonusInterval = Const_default.getDailyBonusSpecialInterval * 60;
          } else {
            getDailyBonusInterval = 0;
          }
        }
        var buyItemInterval = -1;
        if (Config.autoBuyItemEnabled) {
          var _date2 = _getDateByTime(Config.buyItemAfterTime);
          var _now = /* @__PURE__ */new Date();
          if (_getCookie(Const_default.buyItemReadyCookieName)) {
            buyItemInterval = 5 * 60;
          } else if (_getCookie(Const_default.buyItemCookieName) || _now < _date2) {
            if (_now > _date2) _date2.setDate(_date2.getDate() + 1);
            buyItemInterval = Math.floor((_date2 - _now) / 1e3);
          } else {
            buyItemInterval = 0;
          }
        }
        var intervalList = [{
          action: "\u63D0\u5347\u6218\u529B\u5149\u73AF",
          interval: promoteHaloInterval
        }, {
          action: "\u81EA\u52A8\u83B7\u53D6\u6BCF\u65E5\u5956\u52B1",
          interval: getDailyBonusInterval
        }, {
          action: "\u81EA\u52A8\u8D2D\u4E70\u7269\u54C1",
          interval: buyItemInterval
        }];
        var minAction = "",
          minInterval = -1;
        var _iterator52 = _createForOfIteratorHelper(intervalList.filter(function (data) {
            return data.interval > -1;
          })),
          _step52;
        try {
          for (_iterator52.s(); !(_step52 = _iterator52.n()).done;) {
            var _step52$value = _step52.value,
              action = _step52$value.action,
              interval = _step52$value.interval;
            if (minInterval < 0 || interval < minInterval) {
              minAction = action;
              minInterval = interval;
            }
          }
        } catch (err) {
          _iterator52.e(err);
        } finally {
          _iterator52.f();
        }
        return {
          action: minInterval > 0 ? minAction : "",
          interval: minInterval + 1
        };
      };
      _startTimingMode = function _startTimingMode() {
        var _getNextTimingInterva = _getNextTimingIntervalInfo(),
          action = _getNextTimingInterva.action,
          interval = _getNextTimingInterva.interval;
        if (interval === -1) return;
        var oriTitle = document.title;
        var titleItvFunc = null;
        var prevInterval = -1,
          errorNum = 0;
        var getFormatIntervalTitle = function getFormatIntervalTitle(type, interval2) {
          var diff = _getTimeDiffInfo(_getDate("+" + interval2 + "s").getTime());
          var textInterval = diff.hours > 0 ? diff.hours + "\u65F6" : "";
          if (type === 1) textInterval += (diff.minutes > 0 ? diff.minutes + "\u5206" : "") + diff.seconds + "\u79D2";else textInterval += diff.minutes + "\u5206";
          return textInterval;
        };
        var showRefreshModeTips = function showRefreshModeTips(interval2) {
          var action2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
          var isShowTitle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          if (titleItvFunc) window.clearInterval(titleItvFunc);
          var showInterval = interval2;
          console.log("\u3010\u5B9A\u65F6\u6A21\u5F0F\u3011\u5012\u8BA1\u65F6".concat(action2 ? "(".concat(action2, ")") : "", "\uFF1A") + getFormatIntervalTitle(1, showInterval));
          if (Config.showTimingModeTipsType.toLowerCase() !== "never") {
            var showIntervalTitle = function showIntervalTitle() {
              document.title = "".concat(oriTitle, " (\u5B9A\u65F6: ").concat(getFormatIntervalTitle(interval2 < 60 ? 1 : 2, showInterval), ")");
              showInterval = interval2 < 60 ? showInterval - 1 : showInterval - 60;
            };
            if (isShowTitle || Config.showTimingModeTipsType.toLowerCase() === "always" || interval2 < 60) showIntervalTitle();else showInterval = interval2 < 60 ? showInterval - 1 : showInterval - 60;
            titleItvFunc = setInterval(showIntervalTitle, Const_default.showRefreshModeTipsInterval * 60 * 1e3);
          }
        };
        var _handleError = function handleError() {
          var interval2 = 0,
            errorText = "";
          $.ajax({
            type: "GET",
            url: "index.php?t=" + $.now(),
            timeout: Const_default.defAjaxTimeout,
            success: function success(html2) {
              if (!/"kf_fw_ig_index.php"/.test(html2)) {
                interval2 = 10;
                errorText = "\u8BBA\u575B\u7EF4\u62A4\u6216\u5176\u5B83\u672A\u77E5\u60C5\u51B5";
              }
            },
            error: function error() {
              interval2 = Const_default.errorRefreshInterval;
              errorText = "\u8FDE\u63A5\u8D85\u65F6";
            },
            complete: function complete() {
              if (interval2 > 0) {
                console.log("\u5B9A\u65F6\u64CD\u4F5C\u5931\u8D25\uFF08\u539F\u56E0\uFF1A".concat(errorText, "\uFF09\uFF0C\u5C06\u5728").concat(interval2, "\u5206\u949F\u540E\u91CD\u8BD5..."));
                _remove($(".pd_refresh_notice").parent());
                _show("<strong class=\"pd_refresh_notice\">\u5B9A\u65F6\u64CD\u4F5C\u5931\u8D25\uFF08\u539F\u56E0\uFF1A".concat(errorText, "\uFF09\uFF0C\u5C06\u5728<em>").concat(interval2, "</em>\u5206\u949F\u540E\u91CD\u8BD5&hellip;</strong>"), -1);
                setTimeout(_handleError, interval2 * 60 * 1e3);
                showRefreshModeTips(interval2 * 60, "", true);
              } else {
                if (errorNum > 6) {
                  errorNum = 0;
                  interval2 = 15;
                  setTimeout(_checkRefreshInterval, interval2 * 60 * 1e3);
                  showRefreshModeTips(interval2 * 60, "", true);
                } else {
                  errorNum++;
                  _checkRefreshInterval();
                }
              }
            }
          });
        };
        var _checkRefreshInterval = function checkRefreshInterval() {
          _remove($(".pd_refresh_notice").parent());
          $(document).clearQueue("AutoAction");
          if (Config.autoPromoteHaloEnabled && !_getCookie(Const_default.promoteHaloCookieName)) {
            $(document).queue("AutoAction", function () {
              return _getPromoteHaloInfo2();
            });
          }
          if (Config.autoGetDailyBonusEnabled && !_getCookie(Const_default.getDailyBonusCookieName)) {
            $(document).queue("AutoAction", function () {
              return _getDailyBonus2();
            });
          }
          if (Config.autoBuyItemEnabled && !_getCookie(Const_default.buyItemCookieName) && !_getCookie(Const_default.buyItemReadyCookieName)) {
            $(document).queue("AutoAction", function () {
              return _buyItems(Config.buyItemIdList);
            });
          }
          $(document).dequeue("AutoAction");
          var _getNextTimingInterva2 = _getNextTimingIntervalInfo(),
            action2 = _getNextTimingInterva2.action,
            interval2 = _getNextTimingInterva2.interval;
          if (interval2 > 0) errorNum = 0;
          if (interval2 === 0 && prevInterval === 0) {
            prevInterval = -1;
            _handleError();
            return;
          } else prevInterval = interval2;
          if (interval2 === -1) {
            if (titleItvFunc) clearInterval(titleItvFunc);
            return;
          } else if (interval2 === 0) interval2 = Const_default.actionFinishRetryInterval;
          setTimeout(_checkRefreshInterval, interval2 * 1e3);
          showRefreshModeTips(interval2, action2, true);
        };
        setTimeout(_checkRefreshInterval, interval < 60 ? 60 * 1e3 : interval * 1e3);
        showRefreshModeTips(interval < 60 ? 60 : interval, action);
      };
      _getDailyBonus2 = function _getDailyBonus() {
        _runFunc("Public.getDailyBonus_before_");
        console.log("\u9886\u53D6\u6BCF\u65E5\u5956\u52B1Start");
        var $wait = _wait("<strong>\u6B63\u5728\u9886\u53D6\u6BCF\u65E5\u5956\u52B1\uFF0C\u8BF7\u7A0D\u5019&hellip;</strong>");
        var getCookieDate = function getCookieDate() {
          var date = _getTimezoneDateByTime(Const_default.getDailyBonusAfterTime);
          date.setDate(date.getDate() + 1);
          if (/* @__PURE__ */new Date() > date) date.setDate(date.getDate() + 1);
          return date;
        };
        $.ajax({
          type: "GET",
          url: "kf_growup.php?t=" + $.now(),
          timeout: Const_default.defAjaxTimeout
        }).done(function (html2) {
          var matches = /<a href="(kf_growup\.php\?ok=3&safeid=\w+)" target="_self">你可以领取\s*(\d+)KFB\s*\+\s*(\d+)经验\s*\+\s*(\d+(?:\.\d+)?)贡献/.exec(html2);
          if (matches) {
            var url = matches[1];
            var gain = {};
            if (parseInt(matches[2]) > 0) gain["KFB"] = parseInt(matches[2]);
            if (parseInt(matches[3]) > 0) gain["\u7ECF\u9A8C\u503C"] = parseInt(matches[3]);
            if (parseFloat(matches[4]) > 0) gain["\u8D21\u732E"] = parseFloat(matches[4]);
            $.get("".concat(url, "&t=").concat($.now()), function (html3) {
              _showFormatLog("\u9886\u53D6\u6BCF\u65E5\u5956\u52B1", html3);
              var _getResponseMsg8 = _getResponseMsg(html3),
                msg = _getResponseMsg8.msg;
              _remove($wait);
              if (/领取成功/.test(msg)) {
                _setCookie(Const_default.getDailyBonusCookieName, 1, getCookieDate());
                var logStatText = "",
                  msgStatText = "";
                var _iterator53 = _createForOfIteratorHelper(_entries(gain)),
                  _step53;
                try {
                  for (_iterator53.s(); !(_step53 = _iterator53.n()).done;) {
                    var _step53$value = _slicedToArray(_step53.value, 2),
                      key = _step53$value[0],
                      num2 = _step53$value[1];
                    logStatText += "".concat(key, "+").concat(num2, " ");
                    msgStatText += "<i>".concat(key, "<em>+").concat(num2.toLocaleString(), "</em></i>");
                  }
                } catch (err) {
                  _iterator53.e(err);
                } finally {
                  _iterator53.f();
                }
                console.log("\u9886\u53D6\u6BCF\u65E5\u5956\u52B1\uFF0C" + logStatText);
                _show("<strong>\u9886\u53D6\u6BCF\u65E5\u5956\u52B1</strong>" + msgStatText);
                if (!$.isEmptyObject(gain)) _push("\u9886\u53D6\u6BCF\u65E5\u5956\u52B1", "\u9886\u53D6\u6BCF\u65E5\u5956\u52B1", {
                  gain: gain
                });
                if (Config.promoteHaloLimit > 0) _deleteCookie(Const_default.promoteHaloCookieName);
              } else {
                _setCookie(Const_default.getDailyBonusCookieName, -1, _getDate("+5m"));
              }
              _runFunc("Public.getDailyBonus_after_", msg);
            }).fail(function () {
              return _remove($wait);
            });
          } else {
            _remove($wait);
            _setCookie(Const_default.getDailyBonusCookieName, 1, getCookieDate());
          }
        }).fail(function () {
          _remove($wait);
          $(document).queue("AutoAction", function () {
            setTimeout(_getDailyBonus2, Const_default.defAjaxInterval);
          });
        }).always(function () {
          setTimeout(function () {
            return $(document).dequeue("AutoAction");
          }, Const_default.minActionInterval);
        });
      };
      _followUsers = function _followUsers() {
        if (!Config.followUserList.length) return;
        if (Info_default.isInHomePage && Config.highlightFollowUserThreadInHPEnabled) {
          $(".indexlbtc > a").each(function () {
            var $this2 = $(this);
            var userName2 = $this2.attr("uname");
            if (!userName2) return;
            if (_inFollowOrBlockUserList(userName2, Config.followUserList) > -1) {
              $this2.addClass("pd_highlight");
            }
          });
        } else if (location.pathname === "/thread.php") {
          $('a.bl[href^="profile.php?action=show&uid="]').each(function () {
            var $this2 = $(this);
            if (_inFollowOrBlockUserList($this2.text(), Config.followUserList) > -1) {
              $this2.addClass("pd_highlight");
              if (Config.highlightFollowUserThreadLinkEnabled) {
                $this2.parent("td").prev("td").prev("td").find('div > a[href^="read.php?tid="]').addClass("pd_highlight");
              }
            }
          });
        } else if (location.pathname === "/read.php") {
          $('.readidmsbottom > a[href^="profile.php?action=show"]').each(function () {
            var $this2 = $(this);
            if (_inFollowOrBlockUserList(_getFloorUserName($this2.text()), Config.followUserList) > -1) {
              if (Config.highlightFollowUserFloorEnabled) {
                $this2.closest(".readtext").addClass("pd_follow_highlight").find("> table > tbody > tr > td:nth-child(2) > div").addClass("pd_follow_highlight");
              } else {
                $this2.closest(".readtext").find(".pd_goto_link").addClass("pd_highlight");
              }
            }
          });
        } else if (location.pathname === "/guanjianci.php" || location.pathname === "/kf_share.php") {
          $(".kf_share1 > tbody > tr > td:last-child").each(function () {
            var $this2 = $(this);
            if (_inFollowOrBlockUserList($this2.text(), Config.followUserList) > -1) {
              $this2.addClass("pd_highlight");
            }
          });
        } else if (location.pathname === "/search.php") {
          $('.thread1 a[href^="profile.php?action=show&uid="]').each(function () {
            var $this2 = $(this);
            if (_inFollowOrBlockUserList($this2.text(), Config.followUserList) > -1) {
              $this2.addClass("pd_highlight");
            }
          });
        }
      };
      _blockUsers = function _blockUsers() {
        if (!Config.blockUserList.length) return;
        var num2 = 0;
        if (Info_default.isInHomePage) {
          $(".indexlbtc > a").each(function () {
            var $this2 = $(this);
            var userName2 = $this2.attr("uname");
            if (!userName2) return;
            var index = _inFollowOrBlockUserList(userName2, Config.blockUserList);
            if (index > -1 && Config.blockUserList[index].type < 2) {
              num2++;
              $this2.parent(".indexlbtc").remove();
            }
          });
        } else if (location.pathname === "/thread.php") {
          var fid2 = parseInt($('input[name="f_fid"]:not([value="all"])').val());
          if (!fid2) return;
          if (Config.blockUserForumType === 1 && !Config.blockUserFidList.includes(fid2)) return;else if (Config.blockUserForumType === 2 && Config.blockUserFidList.includes(fid2)) return;
          $('a.bl[href^="profile.php?action=show&uid="]').each(function () {
            var $this2 = $(this);
            var index = _inFollowOrBlockUserList($this2.text(), Config.blockUserList);
            if (index > -1 && Config.blockUserList[index].type < 2) {
              num2++;
              $this2.closest("tr").remove();
            }
          });
        } else if (location.pathname === "/read.php") {
          if (Config.blockUserForumType > 0) {
            var _fid = parseInt($('input[name="fid"]:first').val());
            if (!_fid) return;
            if (Config.blockUserForumType === 1 && !Config.blockUserFidList.includes(_fid)) return;else if (Config.blockUserForumType === 2 && Config.blockUserFidList.includes(_fid)) return;
          }
          var page = _getCurrentThreadPage();
          $('.readidmsbottom > a[href^="profile.php?action=show"]').each(function (i) {
            var $this2 = $(this);
            var index = _inFollowOrBlockUserList(_getFloorUserName($this2.text()), Config.blockUserList);
            if (index > -1) {
              var type = Config.blockUserList[index].type;
              if (i === 0 && page === 1 && type > 1) return;else if ((i === 0 && page !== 1 || i > 0) && type === 1) return;
              num2++;
              var $floor = $this2.closest(".readtext");
              $floor.prev(".readlou").remove();
              $floor.remove();
            }
          });
          $('.readtext fieldset:has(legend:contains("Quote:"))').each(function () {
            var $this2 = $(this);
            var text = $this2.text();
            var _iterator54 = _createForOfIteratorHelper(Config.blockUserList),
              _step54;
            try {
              for (_iterator54.s(); !(_step54 = _iterator54.n()).done;) {
                var data = _step54.value;
                if (data.type === 1) continue;
                try {
                  var regex1 = new RegExp("^Quote:\u5F15\u7528(\u7B2C\\d+\u697C|\u697C\u4E3B)".concat(data.name, "\u4E8E"), "i");
                  var regex2 = new RegExp("^Quote:\u56DE\\s*\\d+\u697C\\(".concat(data.name, "\\)\\s*\u7684\u5E16\u5B50"), "i");
                  if (regex1.test(text) || regex2.test(text)) {
                    $this2.html("<legend>Quote:</legend><mark class=\"pd_custom_tips\" title=\"\u88AB\u5C4F\u853D\u7528\u6237\uFF1A".concat(data.name, "\">\u8BE5\u7528\u6237\u5DF2\u88AB\u5C4F\u853D</mark>"));
                  }
                } catch (ex) {}
              }
            } catch (err) {
              _iterator54.e(err);
            } finally {
              _iterator54.f();
            }
          });
        } else if (location.pathname === "/guanjianci.php" && Config.blockUserAtTipsEnabled) {
          $(".kf_share1 > tbody > tr > td:last-child").each(function () {
            var $this2 = $(this);
            if (_inFollowOrBlockUserList($this2.text(), Config.blockUserList) > -1) {
              num2++;
              $this2.closest("tr").remove();
            }
          });
        }
        if (num2 > 0) console.log("\u3010\u5C4F\u853D\u7528\u6237\u3011\u5171\u6709".concat(num2, "\u4E2A\u5E16\u5B50\u6216\u56DE\u590D\u88AB\u5C4F\u853D"));
      };
      _blockThread = function _blockThread() {
        if (!Config.blockThreadList.length) return;
        var isBlock = function isBlock(title, userName) {
          var fid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          var _iterator55 = _createForOfIteratorHelper(Config.blockThreadList),
            _step55;
          try {
            for (_iterator55.s(); !(_step55 = _iterator55.n()).done;) {
              var _step55$value = _step55.value,
                keyWord = _step55$value.keyWord,
                includeUser = _step55$value.includeUser,
                excludeUser = _step55$value.excludeUser,
                includeFid = _step55$value.includeFid,
                excludeFid = _step55$value.excludeFid;
              var regex = null;
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
          } catch (err) {
            _iterator55.e(err);
          } finally {
            _iterator55.f();
          }
          return false;
        };
        var blockRecommendThread = function blockRecommendThread($area) {
          var tmpNum = 0;
          $area.each(function () {
            var $this2 = $(this);
            var title2 = $this2.attr("title");
            if (!title2) return;
            var matches = /^《(.+)》$/.exec(title2);
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
        var num = 0;
        if (Info_default.isInHomePage) {
          num += blockRecommendThread($(".rightboxa a"));
          $(".indexlbtc a").each(function () {
            var $this2 = $(this);
            var title2 = $this2.attr("title");
            if (!title2) return;
            var matches = /^《(.+)》$/.exec(title2);
            if (matches) {
              var uname = $this2.attr("uname");
              if (isBlock(matches[1], uname)) {
                num++;
                $this2.parent(".indexlbtc").remove();
              }
            }
          });
        } else if (location.pathname === "/thread.php") {
          num += blockRecommendThread($(".rightboxa a"));
          var fid2 = parseInt($('input[name="f_fid"]:not([value="all"])').val());
          if (!fid2) return;
          $('.threadtit1 a[href^="read.php"]').each(function () {
            var $this2 = $(this);
            if (isBlock($this2.text(), $this2.closest("tr").find("td:last-child > a.bl").text(), fid2)) {
              num++;
              $this2.closest("tr").remove();
            }
          });
        } else if (location.pathname === "/read.php") {
          if (_getCurrentThreadPage() !== 1) return;
          var title2 = _getThreadTitle();
          if (!title2) return;
          var $userName = $('.readidmsbottom > a[href^="profile.php?action=show"]').eq(0);
          if (!$userName.closest(".readtext").find("> table > tbody > tr > td:nth-child(2) > div > div:nth-child(2) > span:first-child").text().includes("\u697C\u4E3B")) return;
          var userName2 = _getFloorUserName($userName.text());
          if (!userName2) return;
          var _fid2 = parseInt($('input[name="fid"]:first').val());
          if (!_fid2) return;
          if (isBlock(title2, userName2, _fid2)) {
            num++;
            var $floor = $userName.closest(".readtext");
            $floor.prev(".readlou").remove();
            $floor.remove();
          }
        } else {
          num += blockRecommendThread($(".rightboxa a"));
        }
        if (num > 0) console.log("\u3010\u5C4F\u853D\u5E16\u5B50\u3011\u5171\u6709".concat(num, "\u4E2A\u5E16\u5B50\u88AB\u5C4F\u853D"));
      };
      _addFastNavMenu = function _addFastNavMenu() {
        var $menuBtn = $("#alldiv > .drow:nth-child(2) > .dcol > .topmenuo > .topmenuo1 > .topmenuo3:last-child > a:contains(\"\u6E38\u620F\u4ECB\u7ECD\")");
        if (!$menuBtn.length) return;
        $menuBtn.parent().after("\n<li class=\"topmenuo3\">\n  <a href=\"javascript:;\" style=\"width:100px;\">\u5FEB\u6377\u5BFC\u822A</a>\n  <ul class=\"topmenuo2\">\n      ".concat(Info_default.isInSpecialDomain && !Config.showGuGuZhenInFastNavEnabled ? "" : "<li><a href=\"fyg_sjcdwj.php?go=play&xl=2\" target=\"_blank\">\u5495\u5495\u9547</a></li>", "\n      ").concat(Info_default.isInSpecialDomain && !Config.showGuGuZhenInFastNavEnabled ? "" : "<li><a href=\"fyg_sjcdwj.php?go=play&xl=1\" target=\"_blank\">\u5495\u5495\u95472</a></li>", "\n      <li><a href=\"search.php?authorid=").concat(Info_default.uid, "\">\u6211\u7684\u4E3B\u9898</a></li>\n      <li><a href=\"personal.php?action=post\">\u6211\u7684\u56DE\u590D</a></li>\n      <li><a href=\"profile.php?action=favor\">\u6536\u85CF</a></li>\n      <li><a href=\"profile.php?action=friend\">\u597D\u53CB\u5217\u8868</a></li>\n      <li><a href=\"kf_fw_ig_index.php\">\u4E89\u593A\u5956\u52B1</a></li>\n      <li><a href=\"kf_fw_ig_mybp.php\">\u6211\u7684\u7269\u54C1</a></li>\n      <li><a href=\"kf_fw_ig_halo.php\">\u6218\u529B\u5149\u73AF</a></li>\n      <li><a href=\"kf_fw_ig_shop.php\">\u7269\u54C1\u5546\u5E97</a></li>\n      ").concat(Info_default.isInSpecialDomain ? "<li><a href=\"https://m.miaola.work/\" target=\"_blank\">\u624B\u673A\u7248</a></li>" : "", "\n      ").concat(Const_default.customFastNavMenuContent, "\n  </ul>\n</li>"));
        if (Config.adminMemberEnabled) {
          $("#alldiv > .drow:nth-child(2) > .dcol > .topmenuo > .topmenuo1 > .topmenuo3:nth-last-child(4) > a:contains(\"\u804A\u5929\u4EA4\u6D41\")").next("ul").append("<li><a href=\"thread.php?fid=93\">\u5185\u90E8\u7BA1\u7406\u4E13\u7528</a></li>");
        }
      };
      _changeIdColor = function _changeIdColor() {
        if (!Config.changeAllAvailableIdColorEnabled && Config.customAutoChangeIdColorList.length <= 1) return;
        var setCookie2 = function setCookie2() {
          var nextTime = _getDate("+".concat(Config.autoChangeIdColorInterval, "h"));
          _setCookie(Const_default.autoChangeIdColorCookieName, nextTime.getTime(), nextTime);
        };
        console.log("\u81EA\u52A8\u66F4\u6362ID\u989C\u8272Start");
        $.get("kf_growup.php?t=" + $.now(), function (html2) {
          if (_getCookie(Const_default.autoChangeIdColorCookieName)) return;
          var matches = html2.match(/href="kf_growup\.php\?ok=2&safeid=\w+&color=\d+"/g);
          if (matches) {
            var safeId3 = "";
            var safeIdMatches = /safeid=(\w+)&/i.exec(matches[0]);
            if (safeIdMatches) safeId3 = safeIdMatches[1];
            if (!safeId3) {
              setCookie2();
              return;
            }
            var availableIdList = [];
            for (var i in matches) {
              var idMatches = /color=(\d+)/i.exec(matches[i]);
              if (idMatches) availableIdList.push(parseInt(idMatches[1]));
            }
            var idList = availableIdList;
            if (!Config.changeAllAvailableIdColorEnabled) {
              idList = [];
              var _iterator56 = _createForOfIteratorHelper(Config.customAutoChangeIdColorList),
                _step56;
              try {
                for (_iterator56.s(); !(_step56 = _iterator56.n()).done;) {
                  var id = _step56.value;
                  if (availableIdList.includes(id)) idList.push(id);
                }
              } catch (err) {
                _iterator56.e(err);
              } finally {
                _iterator56.f();
              }
            }
            if (idList.length <= 1) {
              setCookie2();
              return;
            }
            var prevId = parseInt(_getValue(Const_default.prevAutoChangeIdColorTmpLogName));
            if (isNaN(prevId) || prevId < 0) prevId = 0;
            var nextId = 0;
            if (Config.autoChangeIdColorType.toLowerCase() === "sequence") {
              var _iterator57 = _createForOfIteratorHelper(idList.entries()),
                _step57;
              try {
                for (_iterator57.s(); !(_step57 = _iterator57.n()).done;) {
                  var _step57$value = _slicedToArray(_step57.value, 2),
                    _i11 = _step57$value[0],
                    _id = _step57$value[1];
                  if (_id > prevId) {
                    nextId = _id;
                    break;
                  }
                }
              } catch (err) {
                _iterator57.e(err);
              } finally {
                _iterator57.f();
              }
              if (nextId === 0) nextId = idList[0];
            } else {
              var _iterator58 = _createForOfIteratorHelper(idList.entries()),
                _step58;
              try {
                for (_iterator58.s(); !(_step58 = _iterator58.n()).done;) {
                  var _step58$value = _slicedToArray(_step58.value, 2),
                    _i12 = _step58$value[0],
                    _id2 = _step58$value[1];
                  if (_id2 === prevId) {
                    idList.splice(_i12, 1);
                    break;
                  }
                }
              } catch (err) {
                _iterator58.e(err);
              } finally {
                _iterator58.f();
              }
              nextId = idList[Math.floor(Math.random() * idList.length)];
            }
            $.get("kf_growup.php?ok=2&safeid=".concat(safeId3, "&color=").concat(nextId, "&t=").concat($.now()), function (html3) {
              setCookie2();
              _showFormatLog("\u81EA\u52A8\u66F4\u6362ID\u989C\u8272", html3);
              var _getResponseMsg9 = _getResponseMsg(html3),
                msg = _getResponseMsg9.msg;
              if (/等级颜色修改完毕/.test(msg)) {
                console.log("ID\u989C\u8272\u66F4\u6362\u4E3A\uFF1A" + nextId);
                _setValue(Const_default.prevAutoChangeIdColorTmpLogName, nextId);
              }
            });
          } else {
            setCookie2();
          }
        });
      };
      _showElementTitleTips = function _showElementTitleTips(e, title2) {
        $(".pd_title_tips").remove();
        if (!title2 || !e.originalEvent) return;
        $("<div class=\"pd_title_tips\">".concat(title2.replace(/\n/g, "<br>"), "</div>")).appendTo("body").css("left", e.originalEvent.pageX - 20).css("top", e.originalEvent.pageY + 15);
      };
      _bindElementTitleClick = function _bindElementTitleClick() {
        var excludeNodeNameList = ["A", "IMG", "INPUT", "BUTTON", "TEXTAREA", "SELECT"];
        $(document).click(function (e) {
          var target = e.target;
          if (!target.title && !excludeNodeNameList.includes(target.nodeName) && target.parentNode && target.parentNode.title) target = target.parentNode;
          if (target.title && !excludeNodeNameList.includes(target.nodeName) && (!target.id || !target.id.startsWith("wy_")) && !$(target).is(".pd_editor_btn")) {
            _showElementTitleTips(e, target.title);
          } else {
            $(".pd_title_tips").remove();
          }
        });
      };
      _bindSearchTypeSelectMenuClick = function _bindSearchTypeSelectMenuClick() {
        $(document).on("click", ".pd_search_type", function () {
          var $menu = $(this);
          var $searchTypeList = $(".pd_search_type_list");
          if ($searchTypeList.length > 0) {
            $searchTypeList.remove();
            return;
          }
          var type = $menu.data("type");
          $searchTypeList = $("\n<ul class=\"pd_search_type_list\">\n  <li>\u6807\u9898</li><li>\u4F5C\u8005</li><li>\u5173\u952E\u8BCD</li><li ".concat(!Config.adminMemberEnabled ? "hidden" : "", ">\u7528\u6237\u540D</li>\n</ul>")).appendTo("body");
          var offset = $menu.offset();
          $searchTypeList.css("top", offset.top + $menu.height() + 2).css("left", offset.left + 1);
          if (type === "dialog") {
            $searchTypeList.css({
              "width": "65px",
              "left": offset.left - 1
            });
          }
          $searchTypeList.on("click", "li", function () {
            var $this2 = $(this);
            var type2 = $this2.text().trim();
            var $form = $menu.closest("form");
            var $keyWord = $form.find('input[name="keyword"], input[name="pwuser"]');
            $menu.find("span").text(type2);
            if (type2 !== "\u5173\u952E\u8BCD" && type2 !== "\u7528\u6237\u540D") $form.attr("action", "search.php?");
            if (type2 === "\u4F5C\u8005") $keyWord.attr("name", "pwuser");else $keyWord.attr("name", "keyword");
            var $searchRange = $form.find('[name="searchRange"][value="current"]');
            if ($searchRange.length > 0) {
              $searchRange.prop("disabled", type2 === "\u5173\u952E\u8BCD" || type2 === "\u7528\u6237\u540D" || !$searchRange.data("enabled"));
            }
            $searchTypeList.remove();
            $keyWord.focus();
          });
        });
        $(document).on("submit", 'form[name="pdSearchForm"]', function () {
          var $this2 = $(this);
          var type = $.trim($this2.find(".pd_search_type > span").text());
          if (type === "\u5173\u952E\u8BCD") {
            $this2.attr("action", "guanjianci.php?gjc=" + $this2.find('input[name="keyword"]').val());
          } else if (type === "\u7528\u6237\u540D") {
            $this2.attr("action", "profile.php?action=show&username=" + $this2.find('input[name="keyword"]').val());
          }
        });
      };
      _makeSearchByBelowTwoKeyWordAvailable = function _makeSearchByBelowTwoKeyWordAvailable() {
        $(document).on("submit", 'form[action="search.php?"]', function () {
          var $this2 = $(this);
          var $keyWord = $this2.find('input[name="keyword"]');
          if (!$keyWord.length) return;
          var keyWord2 = $.trim($keyWord.val());
          if (!keyWord2 || _getStrByteLen(keyWord2) > 2) return;
          $keyWord.val(keyWord2 + " " + keyWord2);
          setTimeout(function () {
            $keyWord.val(keyWord2);
          }, 200);
        });
      };
      _addSearchDialogLink = function _addSearchDialogLink() {
        $("<li><a data-name=\"search\" href=\"#\">\u641C\u7D22</a></li>").insertBefore(Info_default.$userMenu.find("> li:nth-last-child(3)")).find('[data-name="search"]').click(function (e) {
          e.preventDefault();
          var dialogName2 = "pdSearchDialog";
          if ($("#" + dialogName2).length > 0) return;
          var html2 = "\n<div class=\"pd_cfg_main\">\n  <input name=\"step\" value=\"2\" type=\"hidden\">\n  <input name=\"method\" value=\"AND\" type=\"hidden\">\n  <input name=\"sch_area\" value=\"0\" type=\"hidden\">\n  <input name=\"s_type\" value=\"forum\" type=\"hidden\">\n  <input name=\"f_fid\" value=\"all\" type=\"hidden\">\n  <input name=\"orderway\" value=\"lastpost\" type=\"hidden\">\n  <input name=\"asc\" value=\"DESC\" type=\"hidden\">\n  <div style=\"margin-top: 15px;\">\n    <input class=\"pd_input\" name=\"keyword\" type=\"search\" style=\"float: left; width: 175px; line-height: 26px;\" placeholder=\"\u5173\u952E\u5B57\">\n    <div class=\"pd_search_type\" data-type=\"dialog\"><span>\u6807\u9898</span><i>\u2228</i></div>\n    <button class=\"indloginm\" name=\"submit\" type=\"submit\">\u641C\u7D22</button>\n  </div>\n  <div style=\"margin-bottom: 8px; line-height: 35px;\">\n    <label><input name=\"searchRange\" type=\"radio\" value=\"all\" checked> \u5168\u7AD9 </label>\n    <label><input name=\"searchRange\" type=\"radio\" value=\"current\" disabled> \u672C\u7248</label>\n  </div>\n</div>";
          var $dialog2 = _create(dialogName2, "\u641C\u7D22", html2);
          $dialog2.closest("form").attr({
            "name": "pdSearchForm",
            "action": "search.php?",
            "method": "post",
            "target": "_blank"
          }).off("submit");
          var fid2 = parseInt($('input[name="f_fid"]:not([value="all"]), input[name="fid"]:first').val());
          if (fid2) {
            $dialog2.find('[name="searchRange"]').click(function () {
              var $this2 = $(this);
              $dialog2.find('input[name="f_fid"]').val($this2.val() === "current" ? fid2 : "all");
            });
            $dialog2.find('[name="searchRange"][value="current"]').prop("disabled", false).data("enabled", true).click();
          }
          $dialog2.keydown(function (e2) {
            if (e2.keyCode === 27) {
              $(".pd_search_type_list").remove();
            }
          }).find("h1 > span").click(function () {
            $(".pd_search_type_list").remove();
          });
          show2(dialogName2);
          $dialog2.find('[name="keyword"]').focus();
        });
      };
      _repairBbsErrorCode = function _repairBbsErrorCode() {
        Info_default.w.is_ie = false;
        if (location.pathname === "/read.php") Info_default.w.strlen = _getStrByteLen;
      };
      _turnPageViaKeyboard = function _turnPageViaKeyboard() {
        $(document).keydown(function (e) {
          if (e.keyCode !== 37 && e.keyCode !== 39) return;
          if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
          var $page = $(".pages:first");
          var $curPage = $page.find('li > a[href="javascript:;"]');
          if (!$curPage.length) return;
          var curPage = _getCurrentThreadPage();
          var url = "";
          if (e.keyCode === 37) {
            if (curPage <= 1) return;
            url = $page.find("li > a:contains(\"\u4E0A\u4E00\u9875\")").attr("href");
          } else {
            var matches = /&page=(\d+)/.exec($page.find("li:last-child > a").attr("href"));
            if (!matches) return;
            if (curPage >= parseInt(matches[1])) return;
            url = $page.find("li > a:contains(\"\u4E0B\u4E00\u9875\")").attr("href");
          }
          location.href = url;
        });
      };
      _showCommonImportOrExportConfigDialog = function _showCommonImportOrExportConfigDialog(title2, configName, callback, callbackAfterSubmit) {
        var dialogName2 = "pdCommonImOrExConfigDialog";
        if ($("#" + dialogName2).length > 0) return;
        read3();
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <div>\n    <strong>\u5BFC\u5165\u8BBE\u7F6E\uFF1A</strong>\u5C06\u8BBE\u7F6E\u5185\u5BB9\u7C98\u8D34\u5230\u6587\u672C\u6846\u4E2D\u5E76\u70B9\u51FB\u4FDD\u5B58\u6309\u94AE\u5373\u53EF<br>\n    <strong>\u5BFC\u51FA\u8BBE\u7F6E\uFF1A</strong>\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u522B\u5904\u5373\u53EF\n  </div>\n  <textarea name=\"commonConfig\" style=\"width: 500px; height: 300px; word-break: break-all;\"></textarea>\n</div>\n<div class=\"pd_cfg_btns\">\n  <span class=\"pd_cfg_about\"></span>\n  <button type=\"submit\">\u4FDD\u5B58</button>\n  <button data-action=\"close\" type=\"button\">\u53D6\u6D88</button>\n</div>";
        var $dialog2 = _create(dialogName2, "\u5BFC\u5165\u6216\u5BFC\u51FA".concat(title2), html2);
        var settings = $.type(configName) === "object" ? configName.read() : Config[configName];
        $dialog2.submit(function (e) {
          e.preventDefault();
          if (!confirm("\u662F\u5426\u5BFC\u5165\u6587\u672C\u6846\u4E2D\u7684\u8BBE\u7F6E\uFF1F")) return;
          var options = $.trim($dialog2.find('[name="commonConfig"]').val());
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
          _close(dialogName2);
          if (typeof callbackAfterSubmit === "function") callbackAfterSubmit();else location.reload();
        });
        show2(dialogName2);
        $dialog2.find('[name="commonConfig"]').val(JSON.stringify(settings)).select().focus();
        if (typeof callback === "function") callback($dialog2);
        _runFunc("Public.showCommonImportOrExportConfigDialog_after_", {
          title: title2,
          configName: configName
        });
      };
      _showCommonImportOrExportLogDialog = function _showCommonImportOrExportLogDialog(_ref7) {
        var name4 = _ref7.name,
          read4 = _ref7.read,
          write4 = _ref7.write,
          merge = _ref7.merge,
          callback = _ref7.callback,
          callbackAfterSubmit = _ref7.callbackAfterSubmit;
        var dialogName2 = "pdCommonImOrExLogDialog";
        if ($("#" + dialogName2).length > 0) return;
        var log2 = read4();
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <strong>\u5BFC\u5165".concat(name4, "\uFF1A</strong>\u5C06").concat(name4, "\u5185\u5BB9\u7C98\u8D34\u5230\u6587\u672C\u6846\u4E2D\u5E76\u70B9\u51FB\u5408\u5E76\u6216\u8986\u76D6\u6309\u94AE\u5373\u53EF<br>\n  <strong>\u5BFC\u51FA").concat(name4, "\uFF1A</strong>\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u522B\u5904\u5373\u53EF<br>\n  <textarea name=\"log\" style=\"width: 600px; height: 400px; word-break: break-all;\"></textarea>\n</div>\n<div class=\"pd_cfg_btns\">\n  <button name=\"merge\" type=\"button\" ").concat(typeof merge !== "function" ? "hidden" : "", ">\u5408\u5E76\u8BB0\u5F55</button>\n  <button name=\"overwrite\" type=\"button\" style=\"color: #f00;\">\u8986\u76D6\u8BB0\u5F55</button>\n  <button data-action=\"close\" type=\"button\">\u5173\u95ED</button>\n</div>");
        var $dialog2 = _create(dialogName2, "\u5BFC\u5165\u6216\u5BFC\u51FA".concat(name4), html2);
        $dialog2.find('[name="merge"], [name="overwrite"]').click(function (e) {
          e.preventDefault();
          var action = $(this).attr("name");
          if (!confirm("\u662F\u5426\u5C06\u6587\u672C\u6846\u4E2D\u7684".concat(name4).concat(action === "overwrite" ? "\u8986\u76D6" : "\u5408\u5E76", "\u5230\u672C\u5730\uFF1F"))) return;
          var newLog = $.trim($dialog2.find('[name="log"]').val());
          if (!newLog) return;
          try {
            newLog = JSON.parse(newLog);
          } catch (ex) {
            alert("".concat(name4, "\u6709\u9519\u8BEF"));
            return;
          }
          if (!newLog || $.type(newLog) !== "object") {
            alert("".concat(name4, "\u6709\u9519\u8BEF"));
            return;
          }
          if (action === "merge" && typeof merge === "function") log2 = merge(log2, newLog);else log2 = newLog;
          write4(log2);
          alert("".concat(name4, "\u5DF2\u5BFC\u5165"));
          if (typeof callbackAfterSubmit === "function") callbackAfterSubmit();else location.reload();
        });
        show2(dialogName2);
        $dialog2.find('[name="log"]').val(JSON.stringify(log2)).select().focus();
        if (typeof callback === "function") callback($dialog2);
        _runFunc("Public.showCommonImportOrExportLogDialog_after_", {
          name: name4,
          read: read4,
          write: write4,
          merge: merge
        });
      };
      _changeNewTipsColor = function _changeNewTipsColor() {
        var $msgTips = $("#pdUserName").find("span:first");
        if (!$msgTips.length) return;
        $msgTips.addClass("pd_new_tips");
        if (Info_default.$userMenu.find("a[href=\"message.php\"]:contains(\"\u6709\u65B0\u6D88\u606F\")").length > 0) {
          $msgTips.attr("id", "pdNewMsgTips").css({
            "color": "#0099cc"
          });
        } else if (Info_default.$userMenu.find("a[href^=\"guanjianci.php?gjc=\"]:contains(\"\u6709\u4EBA@\u6211\")").length > 0) {
          $msgTips.attr("id", "pdNewReplyTips");
        } else if (Info_default.$userMenu.find("a[href=\"kf_fw_1wkfb.php?ping=3\"]:contains(\"\u6709\u65B0\u8BC4\u5206\")").length > 0) {
          $msgTips.attr("id", "pdNewRateTips").css({
            "color": "#5cb85c"
          });
        }
      };
      _addSlowActionChecked = function _addSlowActionChecked($area) {
        $("\n<label style=\"margin-right: 5px;\">\n  <input name=\"slowActionEnabled\" type=\"checkbox\" ".concat(Config.slowActionEnabled ? "checked" : "", "> \u6162\u901F\u64CD\u4F5C\n  <span class=\"pd_cfg_tips\" title=\"\u5EF6\u957F\u90E8\u5206\u6279\u91CF\u64CD\u4F5C\u7684\u65F6\u95F4\u95F4\u9694\uFF08\u57283~7\u79D2\u4E4B\u95F4\uFF09\uFF0C\u5982\u4F7F\u7528\u9053\u5177\u3001\u6253\u5F00\u76D2\u5B50\u7B49\">[?]</span>\n</label>\n")).prependTo($area).find('input[name="slowActionEnabled"]').click(function () {
          var checked = $(this).prop("checked");
          $('input[name="slowActionEnabled"]').not(this).prop("checked", checked);
          if (Config.slowActionEnabled !== checked) {
            read3();
            Config.slowActionEnabled = checked;
            write3();
          }
        });
      };
      _modifyDomainTips = function _modifyDomainTips() {
        $("#alldiv > .drow:first-child").has("div:contains(\"\u4E3B\u57DF\u540D\u66F4\u6362\")").insertBefore("#alldiv > .drow:last-child").addClass("pd_domain_tips").parent().find("> .drow:first-child").css("margin-top", "40px");
      };
    }
  });

  // src/module/Dialog.js
  var Dialog_exports = {};
  __export(Dialog_exports, {
    close: function close() {
      return _close;
    },
    create: function create() {
      return _create;
    },
    resize: function resize() {
      return _resize;
    },
    show: function show() {
      return show2;
    }
  });
  var _create, show2, _resize, _close;
  var init_Dialog = __esm({
    "src/module/Dialog.js": function src_module_DialogJs() {
      "use strict";

      init_Info();
      init_Util();
      init_Public();
      _create = function _create(id, title2, content) {
        var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
        var html2 = "\n<form>\n<div class=\"pd_cfg_box\" id=\"".concat(id, "\" style=\"").concat(style, "\">\n  <h1>").concat(title2, "<span data-action=\"close\">&times;</span></h1>\n  ").concat(content, "\n</div>\n</form>");
        var $dialog2 = $(html2).appendTo("body");
        $dialog2.on("click", ".pd_cfg_tips", function (e) {
          if (Info_default.isMobile) _showElementTitleTips(e, this.title);
          return false;
        }).on("click", "a.pd_disabled_link", function () {
          return false;
        }).on("click", '[data-action="close"]', function () {
          return _close(id);
        }).keydown(function (e) {
          if (e.keyCode === 27) {
            return _close(id);
          }
        }).find('legend [type="checkbox"]').click(function () {
          var $this2 = $(this);
          var checked = $this2.prop("checked");
          if (_isOpera() || _isEdge()) $this2.closest("fieldset").find("input, select, textarea, button").not("legend input").prop("disabled", !checked);else $this2.closest("fieldset").prop("disabled", !checked);
        }).end().find("input[data-disabled]").click(function () {
          var $this2 = $(this);
          var checked = $this2.prop("checked");
          $($this2.data("disabled")).each(function () {
            var $this3 = $(this);
            if ($this3.is("a")) {
              if (checked) $this3.removeClass("pd_disabled_link");else $this3.addClass("pd_disabled_link");
            } else {
              $this3.prop("disabled", !checked);
            }
          });
        }).end().find("input[data-mutex]").click(function () {
          var $this2 = $(this);
          var checked = $this2.prop("checked");
          $($this2.data("mutex")).each(function () {
            var $this3 = $(this);
            if ($this3.is("a")) {
              if (checked) $this3.addClass("pd_disabled_link");else $this3.removeClass("pd_disabled_link");
            } else {
              $this3.prop("disabled", checked);
            }
          });
        });
        if (!Info_default.isMobile) {
          $(window).on("resize." + id, function () {
            return _resize(id);
          });
        }
        return $dialog2;
      };
      show2 = function show2(id) {
        var $dialog2 = $("#" + id);
        if (!$dialog2.length) return;
        $dialog2.find('legend [type="checkbox"]').each(function () {
          $(this).triggerHandler("click");
        }).end().find("input[data-disabled], input[data-mutex]").each(function () {
          $(this).triggerHandler("click");
        });
        $dialog2.fadeIn("fast");
        _resize(id);
        $dialog2.find("input:first, select:first, a:first, textarea:first, button:first").eq(0).focus();
      };
      _resize = function _resize(id) {
        var $dialog2 = $("#" + id);
        var windowHeight = $(window).height();
        $dialog2.find(".pd_cfg_main").css("max-height", windowHeight - 80);
        var dialogWidth = $dialog2.outerWidth(),
          windowWidth = $(window).width();
        var left = windowWidth / 2 - dialogWidth / 2;
        if (left + dialogWidth > windowWidth) left = windowWidth - dialogWidth - 20;
        if (left < 0) left = 0;
        var top = windowHeight / 2 - $dialog2.outerHeight() / 2;
        if (top < 0) top = 0;
        $dialog2.css({
          top: top,
          left: left
        });
      };
      _close = function _close(id) {
        $("#" + id).fadeOut("fast", function () {
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
    addCommonArmsButton: function addCommonArmsButton() {
      return _addCommonArmsButton;
    },
    addSavedArmsInfo: function addSavedArmsInfo() {
      return _addSavedArmsInfo;
    },
    armClassList: function armClassList() {
      return _armClassList;
    },
    armGroupList: function armGroupList() {
      return _armGroupList;
    },
    armTypeList: function armTypeList() {
      return _armTypeList;
    },
    autoOpenBoxes: function autoOpenBoxes() {
      return _autoOpenBoxes;
    },
    bindArmLinkClickEvent: function bindArmLinkClickEvent() {
      return _bindArmLinkClickEvent;
    },
    boxTypeList: function boxTypeList() {
      return _boxTypeList;
    },
    buyItems: function buyItems() {
      return _buyItems;
    },
    clearArmsInfo: function clearArmsInfo() {
      return _clearArmsInfo;
    },
    getArmClassNameByGroupName: function getArmClassNameByGroupName() {
      return _getArmClassNameByGroupName;
    },
    getArmInfo: function getArmInfo() {
      return _getArmInfo;
    },
    getArmParameterSetting: function getArmParameterSetting() {
      return _getArmParameterSetting;
    },
    getArmsLevelInfo: function getArmsLevelInfo() {
      return _getArmsLevelInfo;
    },
    getItemsUsedNumInfo: function getItemsUsedNumInfo() {
      return _getItemsUsedNumInfo;
    },
    getLevelByName: function getLevelByName() {
      return _getLevelByName;
    },
    getMergeArmsInfo: function getMergeArmsInfo() {
      return _getMergeArmsInfo;
    },
    getNextObjects: function getNextObjects() {
      return _getNextObjects2;
    },
    handleArmArea: function handleArmArea() {
      return _handleArmArea;
    },
    handleUselessSubProperties: function handleUselessSubProperties() {
      return _handleUselessSubProperties;
    },
    init: function init() {
      return init2;
    },
    itemTypeList: function itemTypeList() {
      return _itemTypeList;
    },
    openBoxes: function openBoxes() {
      return _openBoxes;
    },
    readArmsInfo: function readArmsInfo() {
      return _readArmsInfo;
    },
    sellItems: function sellItems() {
      return _sellItems;
    },
    showArmsFinalAddition: function showArmsFinalAddition() {
      return _showArmsFinalAddition;
    },
    showBuyItemTips: function showBuyItemTips() {
      return _showBuyItemTips;
    },
    showMyInfoInItemShop: function showMyInfoInItemShop() {
      return _showMyInfoInItemShop;
    },
    smeltArms: function smeltArms() {
      return _smeltArms;
    },
    sortArmsByGroup: function sortArmsByGroup() {
      return _sortArmsByGroup;
    },
    sortArmsById: function sortArmsById() {
      return _sortArmsById;
    },
    useItems: function useItems() {
      return _useItems;
    },
    writeArmsInfo: function writeArmsInfo() {
      return _writeArmsInfo;
    }
  });
  var $boxArea, $armArea2, $itemArea, safeId2, _boxTypeList, _armClassList, _armGroupList, _armTypeList, _itemTypeList, init2, _getNextObjects2, addBatchOpenBoxesLink, addOpenAllBoxesButton, showOpenAllBoxesDialog, _autoOpenBoxes, _openBoxes, showArmsFinalAdditionAfterOpenBoxes, myArmsInfoName, _readArmsInfo, _writeArmsInfo, _clearArmsInfo, _getMergeArmsInfo, _addSavedArmsInfo, removeSavedArmInfo, _handleArmArea, _sortArmsByGroup, _sortArmsById, _bindArmLinkClickEvent, showArmInfoDialog, armPropertyKeyList, _getArmParameterSetting, _handleUselessSubProperties, addArmsButton, _addCommonArmsButton, _showArmsFinalAddition, showBatchSmeltArmsDialog, _smeltArms, _getArmClassNameByGroupName, _getArmInfo, _getArmsLevelInfo, _getLevelByName, _getItemsUsedNumInfo, addBatchUseAndSellItemsButton, showBatchUseAndSellItemsDialog, _useItems, _sellItems, _buyItems, _showMyInfoInItemShop, _showBuyItemTips;
  var init_Item = __esm({
    "src/module/Item.js": function src_module_ItemJs() {
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
      _boxTypeList = ["\u666E\u901A\u76D2\u5B50", "\u5E78\u8FD0\u76D2\u5B50", "\u7A00\u6709\u76D2\u5B50", "\u4F20\u5947\u76D2\u5B50", "\u795E\u79D8\u76D2\u5B50"];
      _armClassList = ["\u6B66\u5668", "\u62A4\u7532", "\u9879\u94FE"];
      _armGroupList = ["\u957F\u5251", "\u77ED\u5F13", "\u6CD5\u6756", "\u94E0\u7532", "\u76AE\u7532", "\u5E03\u7532"];
      _armTypeList = ["\u666E\u901A\u7684\u88C5\u5907", "\u5E78\u8FD0\u7684\u88C5\u5907", "\u7A00\u6709\u7684\u88C5\u5907", "\u4F20\u5947\u7684\u88C5\u5907", "\u795E\u79D8\u7684\u88C5\u5907"];
      _itemTypeList = ["\u96F6\u65F6\u8FF7\u5B50\u7684\u788E\u7247", "\u88AB\u9057\u5F03\u7684\u544A\u767D\u4FE1", "\u5B66\u6821\u5929\u53F0\u7684\u94A5\u5319", "TMA\u6700\u65B0\u4F5C\u538B\u7F29\u5305", "LOLI\u7684\u94B1\u5305", "\u68D2\u68D2\u7CD6", "\u857E\u7C73\u8389\u4E9A\u540C\u4EBA\u6F2B\u753B", "\u5341\u516D\u591C\u540C\u4EBA\u6F2B\u753B", "\u6863\u6848\u5BA4\u94A5\u5319", "\u50B2\u5A07LOLI\u5A07\u86EE\u97F3CD", "\u6574\u5F62\u4F18\u60E0\u5377", "\u6D88\u901D\u4E4B\u836F"];
      init2 = function init2() {
        safeId2 = _getSafeId();
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
          _addSavedArmsInfo($armArea2);
        }
        _handleArmArea($armArea2);
        _bindArmLinkClickEvent($armArea2, safeId2);
        addArmsButton();
        addBatchUseAndSellItemsButton();
      };
      _getNextObjects2 = function _getNextObjects() {
        var sequence = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        console.log("\u83B7\u53D6\u4E0B\u4E00\u6279\u7269\u54C1Start");
        $.ajax({
          type: "GET",
          url: "kf_fw_ig_mybp.php?t=" + $.now(),
          timeout: Const_default.defAjaxTimeout,
          async: !Config.autoSaveArmsInfoEnabled
        }).done(function (html2) {
          for (var index = 1; index <= 2; index++) {
            var matches = null;
            if (index === 1) {
              matches = /<tr><td width="\d+%">装备.+?\r\n(<tr.+?<\/tr>)<tr><td colspan="4">/.exec(html2);
            } else {
              matches = /<tr><td width="\d+%">使用.+?\r\n(<tr.+?<\/tr>)<tr><td colspan="4">/.exec(html2);
            }
            if (!matches) continue;
            var trMatches = matches[1].match(/<tr(.+?)<\/tr>/g);
            var $area = index === 1 ? $armArea2 : $itemArea;
            var addHtml = "";
            var newArmsInfo = {
              "\u5DF2\u88C5\u5907\u6B66\u5668": 0,
              "\u5DF2\u88C5\u5907\u62A4\u7532": 0,
              "\u4E0A\u6B21\u8BB0\u5F55\u7684\u6700\u65B0\u88C5\u5907": 0,
              "\u4E0A\u6B21\u8BB0\u5F55\u7684\u65F6\u95F4": 0,
              "\u88C5\u5907\u5217\u8868": {}
            };
            for (var i in trMatches) {
              var idMatches = /"wp_(\d+)"/.exec(trMatches[i]);
              if (!idMatches) continue;
              var id = parseInt(idMatches[1]);
              if (!$area.has("[id=\"wp_".concat(id, "\"]")).length) {
                addHtml += trMatches[i];
              }
              if (index === 1) {
                newArmsInfo["\u88C5\u5907\u5217\u8868"][id] = trMatches[i];
                var equippedArmMatches = /<tr id="wp_(\d+)">.+?（装备中）<span[^<>]*>[^<>]+的([^<>]+)<\/span>/.exec(trMatches[i]);
                if (equippedArmMatches) {
                  var equippedArmId = parseInt(equippedArmMatches[1]);
                  var armClassName = _getArmClassNameByGroupName(equippedArmMatches[2]);
                  if (armClassName) {
                    newArmsInfo["\u5DF2\u88C5\u5907".concat(armClassName)] = equippedArmId;
                  }
                }
              }
            }
            if (index === 1 && Config.autoSaveArmsInfoEnabled) {
              var armsInfo = _readArmsInfo();
              if (newArmsInfo["\u5DF2\u88C5\u5907\u6B66\u5668"] > 0) armsInfo["\u5DF2\u88C5\u5907\u6B66\u5668"] = newArmsInfo["\u5DF2\u88C5\u5907\u6B66\u5668"];
              if (newArmsInfo["\u5DF2\u88C5\u5907\u62A4\u7532"] > 0) armsInfo["\u5DF2\u88C5\u5907\u62A4\u7532"] = newArmsInfo["\u5DF2\u88C5\u5907\u62A4\u7532"];
              $.extend(armsInfo["\u88C5\u5907\u5217\u8868"], newArmsInfo["\u88C5\u5907\u5217\u8868"]);
              _writeArmsInfo(armsInfo);
            }
            if (addHtml) {
              if (sequence === 2) {
                $area.find("> tbody > tr:last-child").before(addHtml);
              } else {
                $area.find("> tbody > tr:nth-child(2)").after(addHtml);
              }
              if (index === 1) {
                _handleArmArea($armArea2);
              }
            }
          }
          if (typeof callback === "function") callback();
        }).fail(function () {
          setTimeout(function () {
            return _getNextObjects2(sequence, callback);
          }, Const_default.defAjaxInterval);
        });
      };
      addBatchOpenBoxesLink = function addBatchOpenBoxesLink() {
        $boxArea = $(".kf_fw_ig1:first");
        $boxArea.find('> tbody > tr:nth-child(3) > td > a[onclick^="dkhz"]').each(function () {
          var $this2 = $(this);
          var matches = /dkhz\('(\d+)'\)/.exec($this2.attr("onclick"));
          if (!matches) return;
          $this2.after("<a class=\"pd_highlight\" href=\"#\" data-name=\"openBoxes\" data-id=\"".concat(matches[1], "\" style=\"margin-left: 10px;\">\u6279\u91CF\u6253\u5F00</a>"));
        });
        $boxArea.on("click", 'a[data-name="openBoxes"]', function (e) {
          e.preventDefault();
          var $this2 = $(this);
          var id = parseInt($this2.data("id"));
          var $info = $boxArea.find("> tbody > tr:nth-child(2) > td:nth-child(".concat(id, ")"));
          var boxType = $info.find("span:first").text().trim() + "\u76D2\u5B50";
          if (!_boxTypeList.includes(boxType)) return;
          var currentNum = parseInt($info.find("span:last").text());
          var num2 = parseInt(prompt("\u4F60\u8981\u6253\u5F00\u591A\u5C11\u4E2A\u3010".concat(boxType, "\u3011\uFF1F"), currentNum));
          if (!num2 || num2 < 0) return;
          _destroy();
          if (Config.autoSaveArmsInfoEnabled) {
            _getNextObjects2(1);
          }
          _openBoxes({
            id: id,
            boxType: boxType,
            num: num2,
            safeId: safeId2
          });
        });
      };
      addOpenAllBoxesButton = function addOpenAllBoxesButton() {
        $("\n<div class=\"pd_item_btns\" data-name=\"openBoxesBtns\">\n  <label>\n    <input name=\"autoSaveArmsInfoEnabled\" type=\"checkbox\" ".concat(Config.autoSaveArmsInfoEnabled ? "checked" : "", "> \u4FDD\u5B58\u88C5\u5907\u4FE1\u606F</input>\n    <span class=\"pd_cfg_tips\" title=\"\u5728\u6279\u91CF\u6253\u5F00\u76D2\u5B50\u65F6\u81EA\u52A8\u4FDD\u5B58\u88C5\u5907\u4FE1\u606F\uFF0C\u53EF\u7A81\u7834\u88C5\u5907\u80CC\u5305\u6700\u591A\u663E\u793A10\u4EF6\u7684\u9650\u5236\">[?]</span>\n  </label>\n  <button name=\"clearMsg\" type=\"button\" title=\"\u6E05\u9664\u9875\u9762\u4E0A\u6240\u6709\u7684\u6D88\u606F\u548C\u64CD\u4F5C\u7ED3\u679C\">\u6E05\u9664\u6D88\u606F</button>\n  <button name=\"openAllBoxes\" type=\"button\" style=\"color: #f00;\" title=\"\u6253\u5F00\u5168\u90E8\u76D2\u5B50\">\u4E00\u952E\u5F00\u76D2</button>\n</div>\n")).insertAfter($boxArea).find('[name="autoSaveArmsInfoEnabled"]').click(function () {
          var checked = $(this).prop("checked");
          if (Config.autoSaveArmsInfoEnabled !== checked) {
            read3();
            Config.autoSaveArmsInfoEnabled = checked;
            write3();
          }
        }).end().find('[name="clearMsg"]').click(function () {
          _destroy();
          $(".pd_result").remove();
        }).end().find('[name="openAllBoxes"]').click(showOpenAllBoxesDialog);
        _addSlowActionChecked($('.pd_item_btns[data-name="openBoxesBtns"]'));
      };
      showOpenAllBoxesDialog = function showOpenAllBoxesDialog() {
        var dialogName2 = "pdOpenAllBoxesDialog";
        if ($("#" + dialogName2).length > 0) return;
        _destroy();
        read3();
        var boxTypesOptionHtml = "";
        var _iterator59 = _createForOfIteratorHelper(_boxTypeList.slice(0, 4)),
          _step59;
        try {
          for (_iterator59.s(); !(_step59 = _iterator59.n()).done;) {
            var boxName = _step59.value;
            boxTypesOptionHtml += "<option>".concat(boxName, "</option>");
          }
        } catch (err) {
          _iterator59.e(err);
        } finally {
          _iterator59.f();
        }
        var armTypesCheckedHtml = "";
        var _iterator60 = _createForOfIteratorHelper(_armGroupList),
          _step60;
        try {
          for (_iterator60.s(); !(_step60 = _iterator60.n()).done;) {
            var group = _step60.value;
            armTypesCheckedHtml += "<li><b>".concat(group, "\uFF1A</b>");
            var _iterator62 = _createForOfIteratorHelper(_armTypeList),
              _step62;
            try {
              for (_iterator62.s(); !(_step62 = _iterator62.n()).done;) {
                var type = _step62.value;
                var prefix = type.split("\u7684")[0];
                if (prefix === "\u795E\u79D8") continue;
                var name4 = "".concat(prefix, "\u7684").concat(group);
                armTypesCheckedHtml += "\n<label style=\"margin-right: 5px;\">\n  <input type=\"checkbox\" name=\"smeltArmsType\" value=\"".concat(name4, "\" ").concat(Config.defSmeltArmTypeList.includes(name4) ? "checked" : "", "> ").concat(prefix, "\n</label>");
              }
            } catch (err) {
              _iterator62.e(err);
            } finally {
              _iterator62.f();
            }
            armTypesCheckedHtml += "</li>";
          }
        } catch (err) {
          _iterator60.e(err);
        } finally {
          _iterator60.f();
        }
        var itemTypesOptionHtml = "";
        var _iterator61 = _createForOfIteratorHelper(_itemTypeList.slice(6)),
          _step61;
        try {
          for (_iterator61.s(); !(_step61 = _iterator61.n()).done;) {
            var itemName = _step61.value;
            itemTypesOptionHtml += "<option>".concat(itemName, "</option>");
          }
        } catch (err) {
          _iterator61.e(err);
        } finally {
          _iterator61.f();
        }
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <fieldset style=\"margin-top: 5px;\">\n    <legend>\u8BF7\u9009\u62E9\u60F3\u6279\u91CF\u6253\u5F00\u7684\u76D2\u5B50\u79CD\u7C7B\uFF08\u6309<b>Ctrl\u952E</b>\u6216<b>Shift\u952E</b>\u53EF\u591A\u9009\uFF09\uFF1A</legend>\n    <select name=\"openBoxesTypes\" size=\"4\" style=\"width: 320px;\" multiple>".concat(boxTypesOptionHtml, "</select>\n  </fieldset>\n  <div style=\"margin-top: 5px;\"><b>\u8BF7\u9009\u62E9\u6279\u91CF\u6253\u5F00\u76D2\u5B50\u540E\u60F3\u8981\u8FDB\u884C\u7684\u64CD\u4F5C\uFF08\u5982\u65E0\u9700\u64CD\u4F5C\u53EF\u4E0D\u7528\u52FE\u9009\uFF09\uFF1A</b></div>\n  <fieldset>\n    <legend>\n      <label><input name=\"smeltArmsAfterOpenBoxesEnabled\" type=\"checkbox\"> \u7194\u70BC\u88C5\u5907</label>\n    </legend>\n    <div>\u8BF7\u9009\u62E9\u60F3\u6279\u91CF\u7194\u70BC\u7684\u88C5\u5907\u79CD\u7C7B\uFF1A</div>\n    <ul data-name=\"smeltArmTypeList\">").concat(armTypesCheckedHtml, "</ul>\n    <div>\n      <a class=\"pd_btn_link\" href=\"#\" data-name=\"selectAll\">\u5168\u9009</a>\n      <a class=\"pd_btn_link\" href=\"#\" data-name=\"selectInverse\">\u53CD\u9009</a>\n    </div>\n  </fieldset>\n  <fieldset>\n    <legend>\n      <label><input name=\"useItemsAfterOpenBoxesEnabled\" type=\"checkbox\"> \u4F7F\u7528\u9053\u5177</label>\n    </legend>\n    <div>\u8BF7\u9009\u62E9\u60F3\u6279\u91CF\u4F7F\u7528\u7684\u9053\u5177\u79CD\u7C7B\uFF08\u6309<b>Ctrl\u952E</b>\u6216<b>Shift\u952E</b>\u53EF\u591A\u9009\uFF09\uFF1A</div>\n    <select name=\"useItemTypes\" size=\"6\" style=\"width: 320px;\" multiple>").concat(itemTypesOptionHtml, "</select>\n  </fieldset>\n  <fieldset>\n    <legend>\n      <label><input name=\"sellItemsAfterOpenBoxesEnabled\" type=\"checkbox\"> \u51FA\u552E\u9053\u5177</label>\n    </legend>\n    <div>\u8BF7\u9009\u62E9\u60F3\u6279\u91CF\u51FA\u552E\u7684\u9053\u5177\u79CD\u7C7B\uFF08\u6309<b>Ctrl\u952E</b>\u6216<b>Shift\u952E</b>\u53EF\u591A\u9009\uFF09\uFF1A</div>\n    <select name=\"sellItemTypes\" size=\"6\" style=\"width: 320px;\" multiple>").concat(itemTypesOptionHtml, "</select>\n  </fieldset>\n  <div style=\"margin-top: 5px;\">\n    <label>\n      <input name=\"showArmsFinalAdditionAfterOpenBoxesEnabled\" type=\"checkbox\"> \u5728\u4E00\u952E\u5F00\u76D2\u540E\u663E\u793A\u88C5\u5907\u6700\u7EC8\u52A0\u6210\n      <span class=\"pd_cfg_tips\" title=\"\u5728\u4E00\u952E\u5F00\u76D2\uFF08\u5E76\u6267\u884C\u540E\u7EED\u64CD\u4F5C\uFF09\u540E\u663E\u793A\u5F53\u524D\u9875\u9762\u4E0A\u88C5\u5907\u7684\u6700\u7EC8\u52A0\u6210\u4FE1\u606F\">[?]</span>\n    </label>\n  </div>\n</div>\n<div class=\"pd_cfg_btns\">\n  <button name=\"open\" type=\"button\" style=\"color: #f00;\">\u4E00\u952E\u5F00\u76D2</button>\n  <button name=\"save\" type=\"button\">\u4FDD\u5B58\u8BBE\u7F6E</button>\n  <button data-action=\"close\" type=\"button\">\u5173\u95ED</button>\n</div>");
        var $dialog2 = _create(dialogName2, "\u4E00\u952E\u5F00\u76D2", html2);
        var $smeltArmTypeList = $dialog2.find('ul[data-name="smeltArmTypeList"]');
        var saveSettings = function saveSettings() {
          read3();
          var tmpBoxTypeList = $dialog2.find('select[name="openBoxesTypes"]').val();
          if (!Array.isArray(tmpBoxTypeList)) tmpBoxTypeList = [];
          Config.defOpenBoxTypeList = tmpBoxTypeList;
          $dialog2.find('[type="checkbox"]').each(function () {
            var $this2 = $(this);
            var name4 = $this2.attr("name");
            if (name4 in Config) {
              Config[name4] = Boolean($this2.prop("checked"));
            }
          });
          if (Config.smeltArmsAfterOpenBoxesEnabled) {
            var typeList = [];
            $smeltArmTypeList.find('input[name="smeltArmsType"]:checked').each(function () {
              typeList.push($(this).val());
            });
            if (typeList.length > 0) Config.defSmeltArmTypeList = typeList;else Config.smeltArmsAfterOpenBoxesEnabled = false;
          }
          if (Config.useItemsAfterOpenBoxesEnabled) {
            var _typeList = $dialog2.find('select[name="useItemTypes"]').val();
            if (Array.isArray(_typeList)) Config.defUseItemTypeList = _typeList;else Config.useItemsAfterOpenBoxesEnabled = false;
          }
          if (Config.sellItemsAfterOpenBoxesEnabled) {
            var _typeList2 = $dialog2.find('select[name="sellItemTypes"]').val();
            if (Array.isArray(_typeList2)) Config.defSellItemTypeList = _typeList2;else Config.sellItemsAfterOpenBoxesEnabled = false;
          }
          write3();
        };
        $dialog2.find('[name="open"]').click(function () {
          if (!$dialog2.find('select[name="openBoxesTypes"]').val()) {
            alert("\u672A\u9009\u62E9\u76D2\u5B50\u79CD\u7C7B");
            return;
          }
          if (!confirm("\u662F\u5426\u4E00\u952E\u5F00\u76D2\uFF08\u5E76\u6267\u884C\u6240\u9009\u64CD\u4F5C\uFF09\uFF1F")) return;
          saveSettings();
          _close(dialogName2);
          if (Config.autoSaveArmsInfoEnabled) {
            _getNextObjects2(1);
          }
          $(document).clearQueue("OpenAllBoxes");
          $boxArea.find("> tbody > tr:nth-child(2) > td").each(function (index) {
            var $this2 = $(this);
            var boxType = $this2.find("span:first").text().trim() + "\u76D2\u5B50";
            if (!Config.defOpenBoxTypeList.includes(boxType)) return;
            var num2 = parseInt($this2.find("span:last").text());
            if (!num2 || num2 < 0) return;
            var id = parseInt($boxArea.find("> tbody > tr:nth-child(3) > td:nth-child(".concat(index + 1, ") > a[data-name=\"openBoxes\"]")).data("id"));
            if (!id) return;
            $(document).queue("OpenAllBoxes", function () {
              return _openBoxes({
                id: id,
                boxType: boxType,
                num: num2,
                safeId: safeId2,
                nextActionEnabled: true
              });
            });
          });
          $(document).dequeue("OpenAllBoxes");
        }).end().find('[name="save"]').click(function () {
          saveSettings();
          alert("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58");
        }).end().find('a[data-name="selectAll"]').click(function () {
          return _selectAll($smeltArmTypeList.find('input[name="smeltArmsType"]'));
        }).end().find('a[data-name="selectInverse"]').click(function () {
          return _selectInverse($smeltArmTypeList.find('input[name="smeltArmsType"]'));
        });
        $dialog2.on("keydown", 'select[name$="Types"]', function (e) {
          if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            $(this).children().prop("selected", true);
          }
        }).find('[type="checkbox"]').each(function () {
          var $this2 = $(this);
          var name4 = $this2.attr("name");
          if (name4 in Config) {
            $this2.prop("checked", Config[name4] === true);
          }
        });
        $dialog2.find('select[name$="Types"]').each(function (index) {
          var $this2 = $(this);
          var typeList = Config.defOpenBoxTypeList;
          if (index === 1) typeList = Config.defUseItemTypeList;else if (index === 2) typeList = Config.defSellItemTypeList;
          $this2.find("option").each(function () {
            var $this3 = $(this);
            if (typeList.includes($this3.val())) {
              $this3.prop("selected", true);
            }
          });
        });
        show2(dialogName2);
        _runFunc("Item.showOpenAllBoxes_after_");
      };
      _autoOpenBoxes = function _autoOpenBoxes() {
        var safeId3 = _getSafeId();
        if (!safeId3) {
          $(document).dequeue("AutoAction");
          return;
        }
        $(document).clearQueue("OpenAllBoxes");
        $boxArea.find("> tbody > tr:nth-child(2) > td").each(function (index) {
          var $this2 = $(this);
          var boxType = $this2.find("span:first").text().trim() + "\u76D2\u5B50";
          if (!Config.defOpenBoxTypeList.includes(boxType)) return;
          var num2 = parseInt($this2.find("span:last").text());
          if (!num2 || num2 < 0) return;
          var id = parseInt($boxArea.find("> tbody > tr:nth-child(3) > td:nth-child(".concat(index + 1, ") > a[data-name=\"openBoxes\"]")).data("id"));
          if (!id) return;
          $(document).queue("OpenAllBoxes", function () {
            return _openBoxes({
              id: id,
              boxType: boxType,
              num: num2,
              safeId: safeId3,
              nextActionEnabled: true
            });
          });
        });
        $(document).dequeue("OpenAllBoxes");
        $(document).dequeue("AutoAction");
      };
      _openBoxes = function _openBoxes(_ref8) {
        var id = _ref8.id,
          boxType = _ref8.boxType,
          num2 = _ref8.num,
          safeId3 = _ref8.safeId,
          _ref8$nextActionEnabl = _ref8.nextActionEnabled,
          nextActionEnabled = _ref8$nextActionEnabl === void 0 ? false : _ref8$nextActionEnabl;
        var successNum = 0,
          failNum = 0,
          index = 0;
        var randomTotalNum = 0,
          randomTotalCount = 0;
        var isStop = false;
        var stat = {
          "KFB": 0,
          "\u7ECF\u9A8C\u503C": 0,
          "\u9053\u5177": 0,
          "\u88C5\u5907": 0,
          item: {},
          arm: {}
        };
        var _open = function open() {
          $.ajax({
            type: "POST",
            url: "kf_fw_ig_mybpdt.php",
            data: "do=3&id=".concat(id, "&safeid=").concat(safeId3),
            timeout: Const_default.defAjaxTimeout
          }).done(function (html2) {
            index++;
            var msg = _removeHtmlTag(html2);
            if (msg.includes("\u83B7\u5F97")) {
              successNum++;
              var matches = /获得\[(\d+)]KFB/.exec(msg);
              if (matches) stat["KFB"] += parseInt(matches[1]);
              matches = /获得\[(\d+)]经验值/.exec(msg);
              if (matches) stat["\u7ECF\u9A8C\u503C"] += parseInt(matches[1]);
              matches = /打开盒子获得了道具\[\s*(.+?)\s*]/.exec(msg);
              if (matches) {
                stat["\u9053\u5177"]++;
                var itemName = matches[1];
                if (!(itemName in stat.item)) stat.item[itemName] = 0;
                stat.item[itemName]++;
              }
              matches = /获得一件\[(.+?)]的?装备/.exec(msg);
              if (matches) {
                stat["\u88C5\u5907"]++;
                var armType = matches[1] + "\u88C5\u5907";
                if (!(armType in stat.arm)) stat.arm[armType] = 0;
                stat.arm[armType]++;
              }
              matches = /随机值(\d+)/.exec(msg);
              if (matches) {
                randomTotalCount++;
                randomTotalNum += parseInt(matches[1]);
              }
            } else if (msg.includes("\u64CD\u4F5C\u8FC7\u5FEB")) {
              $(document).queue("OpenBoxes", _open);
            } else if (msg.includes("\u76D2\u5B50\u4E0D\u8DB3") || msg.includes("\u9519\u8BEF\u7684\u5B89\u5168\u7801")) {
              $(document).clearQueue("OpenBoxes");
              isStop = true;
            } else {
              failNum++;
            }
            console.log("\u7B2C".concat(index, "\u6B21\uFF1A").concat(msg));
            $('.pd_result[data-name="boxResult"]:last').append("<li><b>\u7B2C".concat(index, "\u6B21\uFF1A</b>").concat(msg, "</li>"));
            _runFunc("Item.openBoxes_success_", msg);
          }).fail(function () {
            failNum++;
          }).always(function () {
            var length = $(document).queue("OpenBoxes").length;
            var $countdown = $(".pd_countdown:last");
            $countdown.text(length);
            var isPause = $countdown.closest(".pd_msg").data("stop");
            isStop = isStop || isPause;
            if (isPause) {
              $(document).clearQueue("OpenAllBoxes");
              nextActionEnabled = false;
            }
            if (isStop || !length) {
              _remove($wait);
              var avgRandomNum = randomTotalCount > 0 ? _getFixedNumLocStr(randomTotalNum / randomTotalCount, 2) : 0;
              var _iterator63 = _createForOfIteratorHelper(_entries(stat)),
                _step63;
              try {
                for (_iterator63.s(); !(_step63 = _iterator63.n()).done;) {
                  var _step63$value = _slicedToArray(_step63.value, 2),
                    key = _step63$value[0],
                    value = _step63$value[1];
                  if (!value || $.type(value) === "object" && $.isEmptyObject(value)) {
                    delete stat[key];
                  }
                }
              } catch (err) {
                _iterator63.e(err);
              } finally {
                _iterator63.f();
              }
              if (!$.isEmptyObject(stat)) {
                _push("\u6253\u5F00\u76D2\u5B50", "\u5171\u6709`".concat(successNum, "`\u4E2A\u3010`").concat(boxType, "`\u3011\u6253\u5F00\u6210\u529F (\u5E73\u5747\u968F\u673A\u503C\u3010`").concat(avgRandomNum, "`\u3011)"), {
                  gain: stat,
                  pay: {
                    "\u76D2\u5B50": -successNum
                  }
                });
              }
              var $currentNum = $boxArea.find("> tbody > tr:nth-child(2) > td:nth-child(".concat(id, ") > span:last"));
              var prevNum = parseInt($currentNum.text());
              if (prevNum > 0) {
                $currentNum.text(prevNum - successNum);
              }
              var resultStatHtml = "",
                msgStatHtml = "";
              var _iterator64 = _createForOfIteratorHelper(_entries(stat)),
                _step64;
              try {
                for (_iterator64.s(); !(_step64 = _iterator64.n()).done;) {
                  var _step64$value = _slicedToArray(_step64.value, 2),
                    _key8 = _step64$value[0],
                    _value3 = _step64$value[1];
                  var tmpHtml = "";
                  if ($.type(_value3) === "object") {
                    resultStatHtml += resultStatHtml ? "<br>" : "";
                    msgStatHtml += msgStatHtml ? "<br>" : "";
                    resultStatHtml += "".concat(_key8 === "item" ? "\u9053\u5177" : "\u88C5\u5907", "\uFF1A");
                    var typeList = _key8 === "item" ? _itemTypeList : _armTypeList;
                    var _iterator65 = _createForOfIteratorHelper(_getSortedObjectKeyList(typeList, _value3)),
                      _step65;
                    try {
                      for (_iterator65.s(); !(_step65 = _iterator65.n()).done;) {
                        var name4 = _step65.value;
                        tmpHtml += "<i>".concat(name4, "<em>+").concat(_value3[name4].toLocaleString(), "</em></i> ");
                      }
                    } catch (err) {
                      _iterator65.e(err);
                    } finally {
                      _iterator65.f();
                    }
                  } else {
                    tmpHtml += "<i>".concat(_key8, "<em>+").concat(_value3.toLocaleString(), "</em></i> ");
                  }
                  resultStatHtml += tmpHtml;
                  msgStatHtml += tmpHtml.trim();
                }
              } catch (err) {
                _iterator64.e(err);
              } finally {
                _iterator64.f();
              }
              if (msgStatHtml.length < 200) {
                msgStatHtml = msgStatHtml.replace(/(.*)<br>/, "$1");
              }
              $('.pd_result[data-name="boxResult"]:last').append("\n<li class=\"pd_stat\">\n  <b>\u7EDF\u8BA1\u7ED3\u679C\uFF08\u5E73\u5747\u968F\u673A\u503C\u3010<em>".concat(avgRandomNum, "</em>\u3011\uFF09\uFF1A</b><br>\n  ").concat(resultStatHtml ? resultStatHtml : "\u65E0", "\n</li>\n"));
              console.log("\u5171\u6709".concat(successNum, "\u4E2A\u3010").concat(boxType, "\u3011\u6253\u5F00\u6210\u529F\uFF08\u5E73\u5747\u968F\u673A\u503C\u3010").concat(avgRandomNum, "\u3011\uFF09").concat(failNum > 0 ? "\uFF0C\u5171\u6709".concat(failNum, "\u4E2A\u76D2\u5B50\u65E0\u6CD5\u83B7\u53D6\u7ED3\u679C") : ""));
              _show("<strong>\u5171\u6709<em>".concat(successNum, "</em>\u4E2A\u3010").concat(boxType, "\u3011\u6253\u5F00\u6210\u529F\uFF08\u5E73\u5747\u968F\u673A\u503C\u3010<em>").concat(avgRandomNum, "</em>\u3011\uFF09").concat(failNum > 0 ? "\uFF0C\u5171\u6709<em>".concat(failNum, "</em>\u4E2A\u76D2\u5B50\u65E0\u6CD5\u83B7\u53D6\u7ED3\u679C") : "", "</strong>").concat(msgStatHtml.length > 25 ? "<br>" + msgStatHtml : msgStatHtml), -1);
              _runFunc("Item.openBoxes_after_", stat);
              setTimeout(function () {
                return _getNextObjects2(1);
              }, Const_default.defAjaxInterval);
              if ($(document).queue("OpenAllBoxes").length > 0) {
                setTimeout(function () {
                  return $(document).dequeue("OpenAllBoxes");
                }, typeof Const_default.specialAjaxInterval === "function" ? Const_default.specialAjaxInterval() : Const_default.specialAjaxInterval);
              } else if (nextActionEnabled) {
                var action = null;
                if (Config.smeltArmsAfterOpenBoxesEnabled) {
                  action = function action() {
                    return _smeltArms({
                      typeList: Config.defSmeltArmTypeList,
                      safeId: safeId3,
                      nextActionEnabled: nextActionEnabled
                    });
                  };
                } else if (Config.useItemsAfterOpenBoxesEnabled) {
                  action = function action() {
                    return _useItems({
                      typeList: Config.defUseItemTypeList,
                      safeId: safeId3,
                      nextActionEnabled: nextActionEnabled
                    });
                  };
                } else if (Config.sellItemsAfterOpenBoxesEnabled) {
                  action = function action() {
                    return _sellItems({
                      typeList: Config.defSellItemTypeList,
                      safeId: safeId3,
                      nextActionEnabled: nextActionEnabled
                    });
                  };
                }
                if (action) {
                  setTimeout(action, Const_default.minActionInterval);
                } else if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
                  showArmsFinalAdditionAfterOpenBoxes();
                }
              }
            } else {
              if (index % 10 === 0) {
                setTimeout(function () {
                  return _getNextObjects2(1);
                }, Const_default.defAjaxInterval);
              }
              setTimeout(function () {
                return $(document).dequeue("OpenBoxes");
              }, typeof Const_default.specialAjaxInterval === "function" ? Const_default.specialAjaxInterval() : Const_default.specialAjaxInterval);
            }
          });
        };
        $boxArea.parent().append("<ul class=\"pd_result\" data-name=\"boxResult\"><li><strong>\u3010".concat(boxType, "\u3011\u6253\u5F00\u7ED3\u679C\uFF1A</strong></li></ul>"));
        var $wait = _wait("<strong>\u6B63\u5728\u6253\u5F00\u76D2\u5B50\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em class=\"pd_countdown\">".concat(num2, "</em></i><a class=\"pd_stop_action\" href=\"#\">\u505C\u6B62\u64CD\u4F5C</a>"));
        $(document).clearQueue("OpenBoxes");
        $.each(new Array(num2), function () {
          $(document).queue("OpenBoxes", _open);
        });
        $(document).dequeue("OpenBoxes");
      };
      showArmsFinalAdditionAfterOpenBoxes = function showArmsFinalAdditionAfterOpenBoxes() {
        if (Info_default.w.isShowArmsFinalAddition) return;
        Info_default.w.isShowArmsFinalAddition = true;
        var oriEquippedArmList = [];
        var armList = [];
        $armArea2.find("tr[data-id]").each(function () {
          var $this2 = $(this);
          var armId = parseInt($this2.data("id"));
          var armClass = $this2.data("class");
          if (armId && armClass) {
            armList.push({
              armId: armId,
              armClass: armClass
            });
          }
          if ($this2.hasClass("pd_arm_equipped")) {
            oriEquippedArmList.push({
              armId: armId,
              armClass: armClass
            });
          }
        });
        if (oriEquippedArmList.length < 2 && !confirm("\u672A\u5728\u5F53\u524D\u9875\u9762\u4E0A\u5B58\u5728\u5DF2\u88C5\u5907\u7684\u8BE5\u7C7B\u522B\u88C5\u5907\uFF0C\u5728\u64CD\u4F5C\u540E\u5C06\u88C5\u5907\u4E3A\u8BE5\u9875\u9762\u4E0A\u5176\u7C7B\u522B\u7684\u6700\u540E\u4E00\u4EF6\u88C5\u5907\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F")) return;
        if (armList.length > 0) {
          console.log("\u5728\u4E00\u952E\u5F00\u76D2\u540E\u81EA\u52A8\u663E\u793A\u88C5\u5907\u6700\u7EC8\u52A0\u6210\u4FE1\u606FStart");
          if (Const_default.debug) console.log(oriEquippedArmList);
          _showArmsFinalAddition(armList, oriEquippedArmList, safeId2);
        }
      };
      myArmsInfoName = Const_default.storagePrefix + "myArmsInfo2";
      _readArmsInfo = function _readArmsInfo() {
        var info = {
          "\u5DF2\u88C5\u5907\u6B66\u5668": 0,
          "\u5DF2\u88C5\u5907\u62A4\u7532": 0,
          "\u4E0A\u6B21\u8BB0\u5F55\u7684\u6700\u65B0\u88C5\u5907": 0,
          "\u4E0A\u6B21\u8BB0\u5F55\u7684\u65F6\u95F4": 0,
          "\u88C5\u5907\u5217\u8868": {}
        };
        var options = _readData(myArmsInfoName + "_" + Info_default.uid);
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
      _writeArmsInfo = function _writeArmsInfo(info) {
        return _writeData(myArmsInfoName + "_" + Info_default.uid, JSON.stringify(info));
      };
      _clearArmsInfo = function _clearArmsInfo() {
        return _deleteData(myArmsInfoName + "_" + Info_default.uid);
      };
      _getMergeArmsInfo = function _getMergeArmsInfo(info, newInfo) {
        for (var key in newInfo) {
          if (key === "\u88C5\u5907\u5217\u8868") {
            for (var armId in newInfo["\u88C5\u5907\u5217\u8868"]) {
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
      _addSavedArmsInfo = function _addSavedArmsInfo($armArea3) {
        var armsInfo = _readArmsInfo();
        var addHtml = "";
        var _iterator66 = _createForOfIteratorHelper(Object.keys(armsInfo["\u88C5\u5907\u5217\u8868"]).reverse()),
          _step66;
        try {
          for (_iterator66.s(); !(_step66 = _iterator66.n()).done;) {
            var armId = _step66.value;
            if (!$armArea3.find("[id=\"wp_".concat(armId, "\"]")).length) {
              addHtml += armsInfo["\u88C5\u5907\u5217\u8868"][armId].replace(/(<tr(?: id="wp_\d+")?)>/, '$1 data-saved="true">');
            }
          }
        } catch (err) {
          _iterator66.e(err);
        } finally {
          _iterator66.f();
        }
        $armArea3.find("> tbody > tr:last-child").before(addHtml);
      };
      removeSavedArmInfo = function removeSavedArmInfo(armId, $armArea3) {
        var armsInfo = _readArmsInfo();
        delete armsInfo["\u88C5\u5907\u5217\u8868"][armId];
        _writeArmsInfo(armsInfo);
        $armArea3.find("tr[data-id=\"".concat(armId, "\"]")).replaceWith("<tr><td colspan=\"3\" style=\"color: #777;\">\u8BE5\u88C5\u5907\u4E0D\u5B58\u5728</td></tr>");
      };
      _handleArmArea = function _handleArmArea($armArea3) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        $armArea3.find('a[onclick^="cdzb"]').removeAttr("onclick").attr("data-name", "equip");
        $armArea3.find('a[onclick^="rlzb"]').removeAttr("onclick").attr("data-name", "smelt");
        $armArea3.find('tr[id^="wp_"]').each(function () {
          var $this2 = $(this);
          var id = $this2.attr("id");
          var $td = $this2.find("td");
          $td.removeAttr("colspan").removeAttr("style").css({
            "text-align": "left",
            "padding-left": "5px"
          });
          $td.html($td.html().replace("\uFF08\u88C5\u5907\u4E2D\uFF09", ""));
          $this2.removeAttr("id").prepend("<td id=\"".concat(id, "\"><a data-name=\"equip\" href=\"javascript:;\">\u88C5\u5907</a></td><td><a data-name=\"smelt\" href=\"javascript:;\">\u7194\u70BC</a></td>")).addClass("pd_arm_equipped");
        });
        var writeArmsInfoflag = false;
        var armsInfo = Config.autoSaveArmsInfoEnabled ? _readArmsInfo() : {};
        $armArea3.find('tr:not([data-id]) > td[id^="wp_"]').each(function (index) {
          var $this2 = $(this);
          var matches = /wp_(\d+)/.exec($this2.attr("id"));
          if (!matches) return;
          var armId = parseInt(matches[1]);
          var $tr = $this2.parent("tr");
          var $td = $tr.find("> td:nth-child(3)");
          var html2 = $td.html();
          var armInfo = _getArmInfo(html2);
          $tr.attr("data-id", armId).attr("data-class", armInfo["\u7C7B\u522B"]).attr("data-group", armInfo["\u7EC4\u522B"]);
          var newArmMark = false;
          if (Config.autoSaveArmsInfoEnabled) {
            if (index === 0) {
              var today = _getMidnightHourDate(0);
              var prev = armsInfo["\u4E0A\u6B21\u8BB0\u5F55\u7684\u65F6\u95F4"] && armsInfo["\u4E0A\u6B21\u8BB0\u5F55\u7684\u6700\u65B0\u88C5\u5907"] ? new Date(armsInfo["\u4E0A\u6B21\u8BB0\u5F55\u7684\u65F6\u95F4"]) : /* @__PURE__ */new Date(0);
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
          $td.html("".concat(newArmMark ? "<i class=\"pd_new_arm_mark\">[\u65B0]</i> " : "", "<i class=\"pd_arm_id\">[ID: ").concat(armId, "]</i> ").concat(_handleUselessSubProperties(html2)));
          if (Config.armsMemo[armId]) {
            $td.attr("data-memo", Config.armsMemo[armId].replace(/"/g, ""));
          }
          if (type === 0) {
            $this2.prepend("<input name=\"armCheck\" type=\"checkbox\" value=\"".concat(armId, "\">"));
          }
        });
        if (Config.sortArmsByGroupEnabled) {
          _sortArmsByGroup($armArea3);
        }
        if (Config.autoSaveArmsInfoEnabled) {
          if (!Config.sortArmsByGroupEnabled) {
            _sortArmsById($armArea3);
          }
          var realEquippedWeaponId = parseInt($armArea3.find(".pd_arm_equipped[data-class=\"\u6B66\u5668\"]:not([data-saved=\"true\"])").data("id"));
          var realEquippedArmorId = parseInt($armArea3.find(".pd_arm_equipped[data-class=\"\u62A4\u7532\"]:not([data-saved=\"true\"])").data("id"));
          if (realEquippedWeaponId > 0 && armsInfo["\u5DF2\u88C5\u5907\u6B66\u5668"] !== realEquippedWeaponId) {
            writeArmsInfoflag = true;
            armsInfo["\u5DF2\u88C5\u5907\u6B66\u5668"] = realEquippedWeaponId;
          }
          if (realEquippedArmorId > 0 && armsInfo["\u5DF2\u88C5\u5907\u62A4\u7532"] !== realEquippedArmorId) {
            writeArmsInfoflag = true;
            armsInfo["\u5DF2\u88C5\u5907\u62A4\u7532"] = realEquippedArmorId;
          }
          if (writeArmsInfoflag) {
            _writeArmsInfo(armsInfo);
          }
          $armArea3.find(".pd_arm_equipped[data-saved=\"true\"][data-class=\"\u6B66\u5668\"]:not([data-id=\"".concat(armsInfo["\u5DF2\u88C5\u5907\u6B66\u5668"], "\"])")).removeClass("pd_arm_equipped");
          $armArea3.find(".pd_arm_equipped[data-saved=\"true\"][data-class=\"\u62A4\u7532\"]:not([data-id=\"".concat(armsInfo["\u5DF2\u88C5\u5907\u62A4\u7532"], "\"])")).removeClass("pd_arm_equipped");
          if (!$armArea3.find(".pd_arm_equipped[data-class=\"\u6B66\u5668\"]").length) {
            $armArea3.find("tr[data-id=\"".concat(armsInfo["\u5DF2\u88C5\u5907\u6B66\u5668"], "\"]")).addClass("pd_arm_equipped");
          }
          if (!$armArea3.find(".pd_arm_equipped[data-class=\"\u62A4\u7532\"]").length) {
            $armArea3.find("tr[data-id=\"".concat(armsInfo["\u5DF2\u88C5\u5907\u62A4\u7532"], "\"]")).addClass("pd_arm_equipped");
          }
        }
        if (type === 1) {
          $armArea3.find('a[data-name="equip"]').attr("data-name", "add").text("\u52A0\u5165");
        }
        _runFunc("Item.handleArmArea_after_", {
          $armArea: $armArea3,
          type: type
        });
      };
      _sortArmsByGroup = function _sortArmsByGroup($armArea3) {
        var _iterator67 = _createForOfIteratorHelper(_armGroupList),
          _step67;
        try {
          for (_iterator67.s(); !(_step67 = _iterator67.n()).done;) {
            var armGroup = _step67.value;
            $armArea3.find("tr[data-group=\"".concat(armGroup, "\"]")).insertAfter($armArea3.find("tr:nth-child(2)"));
          }
        } catch (err) {
          _iterator67.e(err);
        } finally {
          _iterator67.f();
        }
      };
      _sortArmsById = function _sortArmsById($armArea3) {
        var armIdList = [];
        $armArea3.find("tr[data-id]").each(function () {
          armIdList.push(parseInt($(this).data("id")));
        });
        armIdList.sort(function (a, b) {
          return a - b;
        });
        for (var _i13 = 0, _armIdList = armIdList; _i13 < _armIdList.length; _i13++) {
          var armId = _armIdList[_i13];
          $armArea3.find("tr[data-id=\"".concat(armId, "\"]")).insertAfter($armArea3.find("tr:nth-child(2)"));
        }
      };
      _bindArmLinkClickEvent = function _bindArmLinkClickEvent($armArea3, safeId3) {
        var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        $armArea3.on("click", 'a[data-name="equip"]', function () {
          var $this2 = $(this);
          var $tr = $this2.closest("tr");
          var armId = parseInt($tr.data("id"));
          var armClass = $tr.data("class");
          $.post("kf_fw_ig_mybpdt.php", "do=4&id=".concat(armId, "&safeid=").concat(safeId3), function (html2) {
            var msg = _removeHtmlTag(html2);
            if (/装备完毕/.test(msg)) {
              $armArea3.find(".pd_arm_equipped[data-class=\"".concat(armClass, "\"]")).removeClass("pd_arm_equipped");
              $this2.closest("tr").addClass("pd_arm_equipped");
              if (Config.autoSaveArmsInfoEnabled) {
                var armsInfo = _readArmsInfo();
                armsInfo["\u5DF2\u88C5\u5907".concat(armClass)] = armId;
                _writeArmsInfo(armsInfo);
              }
              if (type === 1) {
                var $wait = _wait("<strong>\u6B63\u5728\u83B7\u53D6\u4E89\u593A\u9996\u9875\u4FE1\u606F&hellip;</strong>");
                _updateLootInfo2(function () {
                  _remove($wait);
                  var $armId = $('input[name="armId"]:first');
                  var $armMemo = $('input[name="armMemo"]:first');
                  $armId.val(armId);
                  $armMemo.val($("#pdArmArea > span:first").text().trim());
                  $(".pd_arm_input").each(function () {
                    $(this).val("");
                    this.defaultValue = "";
                  });
                  _runFunc("Item.bindArmLinkClickEvent_equip_after_", {
                    $armArea: $armArea3,
                    type: type
                  });
                });
              }
            } else {
              if (Config.autoSaveArmsInfoEnabled && (msg === "\u9519\u8BEF\u7684\u7F16\u53F7" || msg === "\u4E0D\u662F\u4F60\u7684\u4E1C\u897F")) {
                removeSavedArmInfo(armId, $armArea3);
              }
              alert(msg);
            }
          });
        }).on("click", 'a[data-name="smelt"]', function () {
          if (!confirm("\u786E\u5B9A\u7194\u70BC\u6B64\u88C5\u5907\u5417\uFF1F")) return;
          var $this2 = $(this);
          var $tr = $this2.closest("tr");
          var armId = parseInt($tr.data("id"));
          $.post("kf_fw_ig_mybpdt.php", "do=5&id=".concat(armId, "&safeid=").concat(safeId3), function (html2) {
            var msg = _removeHtmlTag(html2);
            if (/装备消失/.test(msg)) {
              if (armId in Config.armsMemo) {
                read3();
                delete Config.armsMemo[armId];
                write3();
              }
              var matches = /获得对应装备经验\[\+(\d+)]/.exec(msg);
              if (matches) {
                var armClass = $tr.data("class");
                var gain = {};
                gain[armClass + "\u7ECF\u9A8C"] = parseInt(matches[1]);
                _push("\u7194\u70BC\u88C5\u5907", "\u5171\u6709`1`\u4E2A\u3010`".concat(armClass, "`\u3011\u88C5\u5907\u7194\u70BC\u6210\u529F"), {
                  gain: gain,
                  pay: {
                    "\u88C5\u5907": -1
                  }
                });
              }
              $tr.replaceWith("<tr><td colspan=\"3\">".concat(msg, "</td></tr>"));
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
        }).on("click", 'a[data-name="add"]', function () {
          var $tr = $(this).closest("tr");
          var armId = parseInt($tr.data("id"));
          var armClass = $tr.data("class");
          var armInfo = _getArmInfo($tr.find("> td:nth-child(3)").html());
          $("#pdAddArmDialog").parent().hide();
          if (armClass === "\u6B66\u5668") {
            $("#pdAddWeaponMemo").val(armInfo["\u540D\u79F0"]);
            $("#pdAddWeaponId").val(armId).focus();
          } else if (armClass === "\u62A4\u7532") {
            $("#pdAddArmorMemo").val(armInfo["\u540D\u79F0"]);
            $("#pdAddArmorId").val(armId).focus();
          }
        }).on("mouseenter", "tr[data-id]", function () {
          var $td = $(this).find("> td:nth-child(3)");
          $td.append("<a class=\"show_arm_info\" data-name=\"showArmInfo\" href=\"#\" title=\"\u67E5\u770B\u88C5\u5907\u4FE1\u606F\">\u67E5</a>");
        }).on("mouseleave", "tr[data-id]", function () {
          $(this).find("> td:nth-child(3) .show_arm_info").remove();
        }).on("click", ".show_arm_info", function (e) {
          e.preventDefault();
          var $this2 = $(this);
          var $td = $(this).parent("td");
          var $tr = $this2.closest("tr");
          var id = parseInt($tr.data("id"));
          $this2.remove();
          var html2 = $td.html();
          var armInfo = _getArmInfo(html2);
          showArmInfoDialog(id, armInfo, $armArea3);
        });
      };
      showArmInfoDialog = function showArmInfoDialog(armId, armInfo, $armArea3) {
        var dialogName2 = "pdArmInfoDialog";
        if ($("#" + dialogName2).length > 0) return;
        _destroy();
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <div style=\"width: 550px; margin-top: 5px; padding-bottom: 5px; border-bottom: 1px solid #99f;\">\n    <span style=\"color: ".concat(armInfo["\u989C\u8272"], "\">").concat(armInfo["\u540D\u79F0"], "</span> - ").concat(armInfo["\u63CF\u8FF0"], "\n  </div>\n  <div style=\"margin-top: 5px;\">\n    <label>\u88C5\u5907ID\uFF1A<input name=\"armId\" type=\"text\" value=\"").concat(armId, "\" style=\"width: 100px;\" readonly></label>\n    <a class=\"pd_btn_link\" data-name=\"copy\" data-target=\"[name=armId]\" href=\"#\">\u590D\u5236</a>\n  </div>\n  <div style=\"margin-top: 5px;\">\n    <label>\u88C5\u5907\u53C2\u6570\u8BBE\u7F6E\uFF1A</label>\n    <a class=\"pd_btn_link\" data-name=\"copy\" data-target=\"[name=armParameterSetting]\" href=\"#\">\u590D\u5236</a><br>\n    <textarea name=\"armParameterSetting\" rows=\"6\" style=\"width: 550px;\" wrap=\"off\" style=\"white-space: pre;\" readonly></textarea>\n  </div>\n  <div style=\"margin-top: 5px;\">\n    <label>\n      \u88C5\u5907\u5907\u6CE8\uFF1A<input name=\"armMemo\" type=\"text\" maxlength=\"100\" style=\"width: 200px;\">\n    </label>\n  </div>\n</div>\n<div class=\"pd_cfg_btns\">\n  <button name=\"saveMemo\" type=\"submit\">\u4FDD\u5B58\u5907\u6CE8</button>\n  <button data-action=\"close\" type=\"button\">\u5173\u95ED</button>\n</div>");
        var $dialog2 = _create(dialogName2, "\u88C5\u5907\u4FE1\u606F", html2, "z-index: 1003;");
        $dialog2.on("click", 'a[data-name="copy"]', function (e) {
          e.preventDefault();
          var $target = $dialog2.find($(this).data("target"));
          if (!_copyText($target)) {
            $target.select().focus();
          }
          _runFunc("Item.showArmInfoDialog_copy_");
        }).submit(function (e) {
          e.preventDefault();
          read3();
          var value = $.trim($dialog2.find('input[name="armMemo"]').val());
          var $node = $armArea3.find("tr[data-id=\"".concat(armId, "\"] > td:nth-child(3)"));
          if (value) {
            Config.armsMemo[armId] = value;
            $node.attr("data-memo", value.replace(/"/g, ""));
          } else {
            delete Config.armsMemo[armId];
            $node.removeAttr("data-memo");
          }
          write3();
          _close(dialogName2);
        });
        $dialog2.find('textarea[name="armParameterSetting"]').val(_getArmParameterSetting(armId, armInfo));
        if (Config.armsMemo[armId]) {
          $dialog2.find('input[name="armMemo"]').val(Config.armsMemo[armId]);
        }
        show2(dialogName2);
        _runFunc("Item.showArmInfoDialog_after_");
      };
      armPropertyKeyList = /* @__PURE__ */new Map([["\u589E\u52A0\u653B\u51FB\u529B", "ATK"], ["\u589E\u52A0\u66B4\u51FB\u4F24\u5BB3", "CRT"], ["\u589E\u52A0\u6280\u80FD\u4F24\u5BB3", "SKL"], ["\u7A7F\u900F\u5BF9\u65B9\u610F\u5FD7", "BRC"], ["\u751F\u547D\u593A\u53D6", "LCH"], ["\u589E\u52A0\u901F\u5EA6", "SPD"], ["\u653B\u51FB", "ATK"], ["\u66B4\u51FB", "CRT"], ["\u6280\u80FD", "SKL"], ["\u7A7F\u900F", "BRC"], ["\u5438\u8840", "LCH"], ["\u901F\u5EA6", "SPD"], ["\u88AB\u653B\u51FB\u56DE\u8840100+", "HEL"], ["\u83B7\u5F97\u65E0\u62A4\u7532\u9B54\u6CD5\u76FE500+", "SLD"], ["\u6BCF\u51CF\u5C115%\u751F\u547D\u503C\u83B7\u5F97\u989D\u5916\u610F\u5FD7", "AMR"], ["\u53CD\u5F39\u5BF9\u65B9\u5B9E\u9645\u4F24\u5BB315%+", "RFL"], ["\u51CF\u5C11\u6765\u81EA\u66B4\u51FB\u7684\u4F24\u5BB310%+", "CRD"], ["\u51CF\u5C11\u6765\u81EA\u6280\u80FD\u7684\u4F24\u5BB310%+", "SRD"], ["\u56DE\u8840", "HEL"], ["\u62A4\u76FE", "SLD"], ["\u52A0\u9632", "AMR"], ["\u53CD\u4F24", "RFL"], ["\u66B4\u51CF", "CRD"], ["\u6280\u51CF", "SRD"]]);
      _getArmParameterSetting = function _getArmParameterSetting(armId, armInfo) {
        var info = {
          "\u7EC4\u522B": "",
          "\u88C5\u5907ID": "",
          "\u795E\u79D8\u5C5E\u6027\u6570\u91CF": 0,
          "\u6240\u6709\u7684\u795E\u79D8\u5C5E\u6027": "",
          "\u4E3B\u5C5E\u6027\u6570\u91CF": 0,
          "\u6240\u6709\u7684\u4E3B\u5C5E\u6027": "",
          "\u4ECE\u5C5E\u6027\u6570\u91CF": 0,
          "\u6240\u6709\u7684\u4ECE\u5C5E\u6027": ""
        };
        var groupKeyList = /* @__PURE__ */new Map([["\u957F\u5251", "Sword"], ["\u77ED\u5F13", "Bow"], ["\u6CD5\u6756", "Staff"], ["\u94E0\u7532", "Plate"], ["\u76AE\u7532", "Leather"], ["\u5E03\u7532", "Cloth"]]);
        info["\u7EC4\u522B"] = groupKeyList.get(armInfo["\u7EC4\u522B"]);
        info["\u88C5\u5907ID"] = "#" + armId;
        var smKeyList = /* @__PURE__ */new Map([["\u706B\u795E\u79D8", "FMT"], ["\u96F7\u795E\u79D8", "LMT"], ["\u98CE\u795E\u79D8", "AMT"], ["\u51B0\u971C\u795E\u79D8", "IMT"], ["\u5C16\u523A\u795E\u79D8", "TMT"], ["\u4EC7\u6068\u795E\u79D8", "HMT"]]);
        var _iterator68 = _createForOfIteratorHelper(smKeyList),
          _step68;
        try {
          for (_iterator68.s(); !(_step68 = _iterator68.n()).done;) {
            var _step68$value = _slicedToArray(_step68.value, 2),
              key = _step68$value[0],
              value = _step68$value[1];
            if (key in armInfo) {
              info["\u795E\u79D8\u5C5E\u6027\u6570\u91CF"]++;
              info["\u6240\u6709\u7684\u795E\u79D8\u5C5E\u6027"] += value + " ";
            }
          }
        } catch (err) {
          _iterator68.e(err);
        } finally {
          _iterator68.f();
        }
        var _iterator69 = _createForOfIteratorHelper(armInfo["\u4E3B\u5C5E\u6027"]),
          _step69;
        try {
          for (_iterator69.s(); !(_step69 = _iterator69.n()).done;) {
            var _value4 = _step69.value;
            var _value4$split = _value4.split("(", 1),
              _value4$split2 = _slicedToArray(_value4$split, 1),
              _value4$split2$ = _value4$split2[0],
              property = _value4$split2$ === void 0 ? "" : _value4$split2$;
            property = property.trim();
            if (property) {
              info["\u4E3B\u5C5E\u6027\u6570\u91CF"]++;
              info["\u6240\u6709\u7684\u4E3B\u5C5E\u6027"] += armPropertyKeyList.get(property) + " ";
            }
          }
        } catch (err) {
          _iterator69.e(err);
        } finally {
          _iterator69.f();
        }
        var subPropertyKeyList = /* @__PURE__ */new Map([["\u7CFB\u6570(x3)", "COF"], ["\u529B\u91CF", "STR"], ["\u654F\u6377", "AGI"], ["\u667A\u529B", "INT"], ["\u4F53\u8D28", "VIT"], ["\u7075\u6D3B", "DEX"], ["\u610F\u5FD7", "RES"]]);
        var _iterator70 = _createForOfIteratorHelper(armInfo["\u4ECE\u5C5E\u6027"]),
          _step70;
        try {
          for (_iterator70.s(); !(_step70 = _iterator70.n()).done;) {
            var _value5 = _step70.value;
            _value5 = $.trim(_value5);
            if (!_value5) continue;
            var matches = /(?:\[.])?(\S+?)\((\S+?)x([\d\.]+)%\)/.exec(_value5);
            if (matches) {
              info["\u4ECE\u5C5E\u6027\u6570\u91CF"]++;
              info["\u6240\u6709\u7684\u4ECE\u5C5E\u6027"] += armPropertyKeyList.get(matches[1]) + " " + subPropertyKeyList.get(matches[2]) + " " + Math.floor(parseFloat(matches[3]) * 10) + " ";
            }
          }
        } catch (err) {
          _iterator70.e(err);
        } finally {
          _iterator70.f();
        }
        var content = "\n[\u7EC4\u522B] [\u88C5\u5907ID]\n[\u795E\u79D8\u5C5E\u6027\u6570\u91CF] [\u6240\u6709\u7684\u795E\u79D8\u5C5E\u6027]\n[\u4E3B\u5C5E\u6027\u6570\u91CF] [\u6240\u6709\u7684\u4E3B\u5C5E\u6027]\n[\u4ECE\u5C5E\u6027\u6570\u91CF] [\u6240\u6709\u7684\u4ECE\u5C5E\u6027]\n".trim();
        var _iterator71 = _createForOfIteratorHelper(_entries(info)),
          _step71;
        try {
          for (_iterator71.s(); !(_step71 = _iterator71.n()).done;) {
            var _step71$value = _slicedToArray(_step71.value, 2),
              _key9 = _step71$value[0],
              _value6 = _step71$value[1];
            content = content.replace("[".concat(_key9, "]"), $.trim(_value6));
          }
        } catch (err) {
          _iterator71.e(err);
        } finally {
          _iterator71.f();
        }
        return content;
      };
      _handleUselessSubProperties = function _handleUselessSubProperties(html2) {
        var armInfo = _getArmInfo(html2);
        var keyList = [];
        var _iterator72 = _createForOfIteratorHelper(armInfo["\u4E3B\u5C5E\u6027"]),
          _step72;
        try {
          for (_iterator72.s(); !(_step72 = _iterator72.n()).done;) {
            var _value7 = _step72.value;
            var _value7$split = _value7.split("(", 1),
              _value7$split2 = _slicedToArray(_value7$split, 1),
              _value7$split2$ = _value7$split2[0],
              _property = _value7$split2$ === void 0 ? "" : _value7$split2$;
            if (_property) {
              keyList.push(armPropertyKeyList.get(_property));
            }
          }
        } catch (err) {
          _iterator72.e(err);
        } finally {
          _iterator72.f();
        }
        var matches = /从属性：(.+?)(<br(?:\s*\/)?>|$)/.exec(html2);
        if (matches) {
          var subPropertiesHtml = "";
          var _iterator73 = _createForOfIteratorHelper(matches[1].split("\u3002")),
            _step73;
          try {
            for (_iterator73.s(); !(_step73 = _iterator73.n()).done;) {
              var value = _step73.value;
              if (!value) continue;
              var subMatches = /(?:^|>)([^<>]+?)\(/.exec(value);
              if (subMatches) {
                var property = subMatches[1];
                if (!keyList.includes(armPropertyKeyList.get(property))) {
                  value = "<span class=\"pd_useless_sub_property\">".concat(value, "</span>");
                }
              }
              subPropertiesHtml += value + "\u3002";
            }
          } catch (err) {
            _iterator73.e(err);
          } finally {
            _iterator73.f();
          }
          html2 = html2.replace(matches[0], "\u4ECE\u5C5E\u6027\uFF1A" + subPropertiesHtml + matches[2]);
        }
        return html2;
      };
      addArmsButton = function addArmsButton() {
        $("\n<div class=\"pd_item_btns\" data-name=\"handleArmBtns\">\n  <button name=\"openImOrExOrClearArmsLogDialog\" type=\"button\" title=\"\u5BFC\u5165/\u5BFC\u51FA/\u6E05\u9664\u5DF2\u4FDD\u5B58\u7684\u88C5\u5907\u4FE1\u606F\">\u5BFC\u5165/\u5BFC\u51FA/\u6E05\u9664</button>\n  <button name=\"showArmsFinalAddition\" type=\"button\" title=\"\u663E\u793A\u5F53\u524D\u9875\u9762\u4E0A\u6240\u6709\u88C5\u5907\u7684\u6700\u7EC8\u52A0\u6210\u4FE1\u606F\">\u663E\u793A\u6700\u7EC8\u52A0\u6210</button>\n  <button name=\"smeltSelectArms\" type=\"button\" style=\"color: #00f;\" title=\"\u6279\u91CF\u7194\u70BC\u5F53\u524D\u9875\u9762\u4E0A\u6240\u9009\u7684\u88C5\u5907\">\u7194\u70BC\u6240\u9009</button>\n  <button name=\"smeltArms\" type=\"button\" style=\"color: #f00;\" title=\"\u6279\u91CF\u7194\u70BC\u6307\u5B9A\u79CD\u7C7B\u7684\u88C5\u5907\">\u6279\u91CF\u7194\u70BC</button>\n</div>\n").insertAfter($armArea2).find('[name="openImOrExOrClearArmsLogDialog"]').click(function () {
          _showCommonImportOrExportLogDialog({
            name: "\u88C5\u5907\u4FE1\u606F",
            read: _readArmsInfo,
            write: _writeArmsInfo,
            merge: _getMergeArmsInfo,
            callback: function callback($dialog2) {
              $("<button name=\"clearArmsMemo\" type=\"button\" style=\"color: #00f;\">\u6E05\u9664\u5907\u6CE8</button> <button name=\"clear\" type=\"button\" style=\"color: #f00;\">\u6E05\u9664\u8BB0\u5F55</button>").prependTo($dialog2.find(".pd_cfg_btns")).filter('[name="clearArmsMemo"]').click(function () {
                if (!confirm("\u662F\u5426\u6E05\u9664\u6240\u6709\u88C5\u5907\u7684\u5907\u6CE8\uFF1F")) return;
                read3();
                Config.armsMemo = {};
                write3();
                alert("\u6240\u6709\u88C5\u5907\u7684\u5907\u6CE8\u5DF2\u88AB\u6E05\u9664");
                location.reload();
              }).end().filter('[name="clear"]').click(function () {
                if (!confirm("\u662F\u5426\u6E05\u9664\u6240\u6709\u5DF2\u4FDD\u5B58\u7684\u88C5\u5907\u4FE1\u606F\uFF1F")) return;
                _clearArmsInfo();
                alert("\u5728\u672C\u5730\u4FDD\u5B58\u7684\u88C5\u5907\u4FE1\u606F\u5DF2\u88AB\u6E05\u9664");
                location.reload();
              });
            }
          });
        }).end().find('[name="showArmsFinalAddition"]').click(function () {
          var $arms = $armArea2.find('tr[data-id]:has([name="armCheck"]:checked)');
          if (!confirm("\u662F\u5426\u663E\u793A\u5F53\u524D\u9875\u9762\u4E0A\u3010".concat($arms.length > 0 ? "\u6240\u9009" : "\u5168\u90E8", "\u3011\u88C5\u5907\u7684\u6700\u7EC8\u52A0\u6210\u4FE1\u606F\uFF1F\n\uFF08\u8B66\u544A\uFF1A\u8BF7\u4E0D\u8981\u5728\u4E89\u593A\u653B\u51FB\u9014\u4E2D\u4F7F\u7528\u6B64\u529F\u80FD\uFF01\uFF09"))) return;
          if (!$arms.length) $arms = $armArea2.find("tr[data-id]");
          _destroy();
          var armList = [];
          $arms.each(function () {
            var $this2 = $(this);
            var armId = parseInt($this2.data("id"));
            var armClass = $this2.data("class");
            if (armId && armClass) {
              armList.push({
                armId: armId,
                armClass: armClass
              });
            }
          });
          if (!armList.length) return;
          var oriEquippedArmList = [];
          $armArea2.find(".pd_arm_equipped").each(function () {
            var $this2 = $(this);
            var armId = parseInt($this2.data("id"));
            var armClass = $this2.data("class");
            oriEquippedArmList.push({
              armId: armId,
              armClass: armClass
            });
          });
          if (oriEquippedArmList.length < 2 && !confirm("\u672A\u5728\u5F53\u524D\u9875\u9762\u4E0A\u5B58\u5728\u5DF2\u88C5\u5907\u7684\u8BE5\u7C7B\u522B\u88C5\u5907\uFF0C\u5728\u64CD\u4F5C\u540E\u5C06\u88C5\u5907\u4E3A\u8BE5\u9875\u9762\u4E0A\u5176\u7C7B\u522B\u7684\u6700\u540E\u4E00\u4EF6\u88C5\u5907\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F")) return;
          _showArmsFinalAddition(armList, oriEquippedArmList, safeId2);
        }).end().find('[name="smeltSelectArms"]').click(function () {
          var idList = [];
          $armArea2.find('input[name="armCheck"]:checked').each(function () {
            idList.push(parseInt($(this).val()));
          });
          if (!idList.length || !confirm("\u662F\u5426\u7194\u70BC\u6240\u9009\u7684 ".concat(idList.length, " \u4EF6\u88C5\u5907\uFF1F"))) return;
          _smeltArms({
            idList: idList,
            safeId: safeId2
          });
        }).end().find('[name="smeltArms"]').click(function () {
          return showBatchSmeltArmsDialog(safeId2);
        });
        _addCommonArmsButton($('.pd_item_btns[data-name="handleArmBtns"]'), $armArea2);
      };
      _addCommonArmsButton = function _addCommonArmsButton($area, $armArea3) {
        $("\n<label>\n  <input name=\"sortArmsByGroupEnabled\" type=\"checkbox\" ".concat(Config.sortArmsByGroupEnabled ? "checked" : "", "> \u5206\u7EC4\u6392\u5217</input>\n  <span class=\"pd_cfg_tips\" title=\"\u5206\u7EC4\u6392\u5217\u88C5\u5907\">[?]</span>\n</label>\n<select name=\"select\" style=\"width: 92px; vertical-align: middle; margin-bottom: 2px;\">\n  <option>\u9009\u62E9\u88C5\u5907</option>\n  <option value=\"selectAll\">\u5168\u9009</option>\n  <option value=\"selectInverse\">\u53CD\u9009</option>\n  <option value=\"selectCancel\">\u53D6\u6D88</option>\n  <option value=\"selectWeapon\">\u9009\u62E9\u6B66\u5668</option>\n  <option value=\"selectArmor\">\u9009\u62E9\u62A4\u7532</option>\n  <option value=\"selectNewArm\">\u9009\u62E9\u65B0\u88C5\u5907</option>\n  <option value=\"selectNoMemo\">\u9009\u62E9\u65E0\u5907\u6CE8\u7684\u88C5\u5907</option>\n  <option value=\"selectArmId\">\u9009\u62E9\u6307\u5B9AID\u7684\u88C5\u5907</option>\n</select>\n<button name=\"copyArmParameterSetting\" type=\"button\" title=\"\u590D\u5236\u6240\u9009\u88C5\u5907\u7684\u8BA1\u7B97\u5668\u53C2\u6570\u8BBE\u7F6E\">\u590D\u5236\u88C5\u5907\u53C2\u6570</button>\n")).prependTo($area).find('[name="sortArmsByGroupEnabled"]').click(function () {
          var checked = $(this).prop("checked");
          if (Config.sortArmsByGroupEnabled !== checked) {
            read3();
            Config.sortArmsByGroupEnabled = checked;
            write3();
          }
          if (checked) {
            _sortArmsByGroup($armArea3);
          } else {
            _sortArmsById($armArea3);
          }
        }).end().filter('[name="select"]').change(function () {
          var $selectedArmsNum = $armArea3.find("#pdSelectedArmsNum");
          $selectedArmsNum.text(0).parent().hide();
          var name4 = $(this).val();
          var $checkboxes = $armArea3.find('input[name="armCheck"]');
          if (name4 === "selectAll") {
            _selectAll($checkboxes);
          } else if (name4 === "selectInverse") {
            _selectInverse($checkboxes);
          } else if (name4 === "selectCancel") {
            $checkboxes.prop("checked", false);
          } else if (name4 === "selectWeapon") {
            $checkboxes.prop("checked", false);
            $armArea3.find("tr[data-class=\"\u6B66\u5668\"] input[name=\"armCheck\"]").prop("checked", true);
          } else if (name4 === "selectArmor") {
            $checkboxes.prop("checked", false);
            $armArea3.find("tr[data-class=\"\u62A4\u7532\"] input[name=\"armCheck\"]").prop("checked", true);
          } else if (name4 === "selectNewArm") {
            $checkboxes.prop("checked", false);
            $armArea3.find('tr:has(.pd_new_arm_mark) input[name="armCheck"]').prop("checked", true);
          } else if (name4 === "selectNoMemo") {
            $checkboxes.prop("checked", false);
            if (!$armArea3.find("tr:has(td[data-memo])").length) {
              if (!confirm("\u5728\u5F53\u524D\u9875\u9762\u4E0A\u672A\u53D1\u73B0\u5305\u542B\u5907\u6CE8\u7684\u88C5\u5907\uFF0C\u5EFA\u8BAE\u68C0\u67E5\u4E00\u4E0B\u4F60\u662F\u5426\u6E05\u7A7A\u4E86\u88C5\u5907\u5907\u6CE8\uFF0C\u662F\u5426\u7EE7\u7EED\u9009\u62E9\uFF1F")) return;
            }
            var $legendEquip = $armArea3.find("tr[data-id]:has(span:contains(\"\u4F20\u5947\u7684\"))").not(":has(td[data-memo])");
            if ($legendEquip.length > 0) {
              if (!confirm("\u4F60\u4E00\u5171\u9009\u62E9\u4E86 ".concat($legendEquip.length, " \u4EF6\u4F20\u5947\u88C5\u5907\uFF0C\u662F\u5426\u7EE7\u7EED\u9009\u62E9\uFF1F"))) return;
            }
            $armArea3.find('tr:not(:has(td[data-memo])) input[name="armCheck"]').prop("checked", true);
          } else if (name4 === "selectArmId") {
            var text = $.trim(prompt("\u8BF7\u8F93\u5165\u8981\u9009\u62E9\u7684\u88C5\u5907ID\uFF08\u591A\u4E2A\u88C5\u5907ID\u7528\u7A7A\u683C\u5206\u9694\uFF09\uFF1A"));
            if (text) {
              $checkboxes.prop("checked", false);
              $armArea3.find(text.split(" ").map(function (armId) {
                return "tr[data-id=\"".concat(armId, "\"] input[name=\"armCheck\"]");
              }).join(",")).prop("checked", true);
            }
          }
          var selectedNum = $checkboxes.filter(":checked").length;
          if (selectedNum > 0) {
            $selectedArmsNum.text(selectedNum).parent().show();
          }
          _runFunc("Item.addCommonArmsButton_select_change_", {
            name: name4,
            $armArea: $armArea3
          });
          this.selectedIndex = 0;
        }).end().filter('[name="copyArmParameterSetting"]').click(function () {
          var $this2 = $(this);
          var armInfoList = [];
          $armArea3.find('input[name="armCheck"]:checked').each(function () {
            var $this3 = $(this);
            var id = parseInt($this3.val());
            var html2 = $this3.closest("tr").find("> td:nth-child(3)").html();
            if (!html2) return;
            armInfoList.push({
              id: id,
              info: _getArmInfo(html2)
            });
          });
          if (!armInfoList.length) return;
          var copyData = "";
          for (var _i14 = 0, _armInfoList = armInfoList; _i14 < _armInfoList.length; _i14++) {
            var _armInfoList$_i = _armInfoList[_i14],
              id = _armInfoList$_i.id,
              info = _armInfoList$_i.info;
            copyData += _getArmParameterSetting(id, info) + "\n\n";
          }
          $this2.data("copy-text", copyData.trim());
          console.log("\u6240\u9009\u7684 ".concat(armInfoList.length, " \u4EF6\u88C5\u5907\u7684\u8BA1\u7B97\u5668\u88C5\u5907\u53C2\u6570\u8BBE\u7F6E\uFF1A\n\n") + copyData.trim());
          if (!_copyText($this2, "\u6240\u9009\u7684 ".concat(armInfoList.length, " \u4EF6\u88C5\u5907\u7684\u8BA1\u7B97\u5668\u88C5\u5907\u53C2\u6570\u8BBE\u7F6E\u5DF2\u590D\u5236"))) {
            alert("\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u590D\u5236\uFF0C\u8BF7\u6253\u5F00Web\u63A7\u5236\u53F0\u67E5\u770B");
          }
        });
        $armArea3.find("> tbody > tr:last-child > td:first-child").append("<div class=\"pd_highlight\" style=\"position: absolute; left: 7px; top: 0; display: none;\">(\u5DF2\u9009 <span id=\"pdSelectedArmsNum\">0</span> \u4EF6)</div>");
        _runFunc("Item.addCommonArmsButton_after_", {
          $area: $area,
          $armArea: $armArea3
        });
      };
      _showArmsFinalAddition = function _showArmsFinalAddition(armList, oriEquippedArmList, safeId3) {
        var index = 0;
        var writeArmInfo = function writeArmInfo(armId, armClass) {
          $armArea2.find(".pd_arm_equipped[data-class=\"".concat(armClass, "\"]")).removeClass("pd_arm_equipped").end().find("tr[data-id=\"".concat(armId, "\"]")).addClass("pd_arm_equipped");
          if (Config.autoSaveArmsInfoEnabled) {
            var armsInfo = _readArmsInfo();
            armsInfo["\u5DF2\u88C5\u5907".concat(armClass)] = armId;
            _writeArmsInfo(armsInfo);
          }
        };
        var _equip = function equip(_ref9) {
          var armId = _ref9.armId,
            armClass = _ref9.armClass;
          var isComplete = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
          $.ajax({
            type: "POST",
            url: "kf_fw_ig_mybpdt.php",
            data: "do=4&id=".concat(armId, "&safeid=").concat(safeId3),
            timeout: Const_default.defAjaxTimeout
          }).done(function (html2) {
            var msg = _removeHtmlTag(html2);
            console.log("\u3010\u88C5\u5907ID[".concat(armId, "]\uFF0C\u88C5\u5907\u7C7B\u522B[").concat(armClass, "]\u3011\uFF1A").concat(msg.replace("\n", " ")));
            if (isComplete) {
              if (/装备完毕/.test(msg)) {
                writeArmInfo(armId, armClass);
                if (typeof callback === "function") callback();
              } else {
                setTimeout(function () {
                  return _equip({
                    armId: armId,
                    armClass: armClass
                  }, isComplete, callback);
                }, Const_default.minActionInterval);
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
              setTimeout(function () {
                return _equip(armList[index]);
              }, Const_default.minActionInterval);
            } else {
              writeArmInfo(armId, armClass);
              setTimeout(function () {
                return _getFinalAddition({
                  armId: armId,
                  armClass: armClass
                });
              }, Const_default.defAjaxInterval);
            }
          }).fail(function () {
            return setTimeout(function () {
              return _equip({
                armId: armId,
                armClass: armClass
              }, isComplete, callback);
            }, Const_default.minActionInterval);
          });
        };
        var _getFinalAddition = function getFinalAddition(_ref0) {
          var armId = _ref0.armId,
            armClass = _ref0.armClass;
          $.ajax({
            type: "GET",
            url: "kf_fw_ig_index.php?t=" + $.now(),
            timeout: Const_default.defAjaxTimeout
          }).done(function (html2) {
            $wait.find(".pd_countdown").text(armList.length - (index + 1));
            if ($wait.data("stop")) {
              complete();
              return;
            }
            var matches = armClass === "\u6B66\u5668" ? />(攻击伤害\+[^<>]+)</.exec(html2) : />(受伤回血\+[^<>]+)</.exec(html2);
            if (matches) {
              var info = matches[1];
              console.log("\u3010\u88C5\u5907ID[".concat(armId, "]\uFF0C\u88C5\u5907\u7C7B\u522B[").concat(armClass, "]\u3011\uFF1A").concat(info));
              var $armInfo = $armArea2.find("tr[data-id=\"".concat(armId, "\"]")).find("td:nth-child(3)");
              $armInfo.find(".pd_final_addition_info").remove();
              $armInfo.append("<span class=\"pd_final_addition_info\" title=\"\u6700\u7EC8\u52A0\u6210\uFF1A".concat(info, "\"><br>\u6700\u7EC8\u52A0\u6210\uFF1A").concat(info, "</span>"));
            }
            index++;
            if (index >= armList.length) {
              complete();
              return;
            }
            setTimeout(function () {
              return _equip(armList[index]);
            }, Const_default.minActionInterval);
            _runFunc("Item.showArmsFinalAddition_show_", {
              armId: armId,
              armClass: armClass
            });
          }).fail(function () {
            return setTimeout(function () {
              return _getFinalAddition({
                armId: armId,
                armClass: armClass
              });
            }, Const_default.minActionInterval);
          });
        };
        var complete = function complete() {
          _remove($wait);
          if (oriEquippedArmList.length > 0) {
            var $wait2 = _wait("<strong>\u6B63\u5728\u8FD8\u539F\u4E3A\u4E4B\u524D\u7684\u88C5\u5907&hellip;</strong>");
            setTimeout(function () {
              return _equip(oriEquippedArmList[0], true, function () {
                if (!oriEquippedArmList[1]) {
                  _remove($wait2);
                  return;
                }
                setTimeout(function () {
                  return _equip(oriEquippedArmList[1], true, function () {
                    _remove($wait2);
                  });
                }, Const_default.minActionInterval);
              });
            }, Const_default.minActionInterval);
          }
          _runFunc("Item.showArmsFinalAddition_complete_");
        };
        var $wait = _wait("<strong>\u6B63\u5728\u83B7\u53D6\u88C5\u5907\u6700\u7EC8\u52A0\u6210\u4FE1\u606F&hellip;</strong><i>\u5269\u4F59\uFF1A<em class=\"pd_countdown\">".concat(armList.length, "</em></i><a class=\"pd_stop_action\" href=\"#\">\u505C\u6B62\u64CD\u4F5C</a>"));
        _equip(armList[0]);
      };
      showBatchSmeltArmsDialog = function showBatchSmeltArmsDialog() {
        var dialogName2 = "pdBatchSmeltArmsDialog";
        if ($("#" + dialogName2).length > 0) return;
        _destroy();
        read3();
        var armTypeCheckedHtml = "";
        var _iterator74 = _createForOfIteratorHelper(_armGroupList),
          _step74;
        try {
          for (_iterator74.s(); !(_step74 = _iterator74.n()).done;) {
            var group = _step74.value;
            armTypeCheckedHtml += "<li><b>".concat(group, "\uFF1A</b>");
            var _iterator75 = _createForOfIteratorHelper(_armTypeList),
              _step75;
            try {
              for (_iterator75.s(); !(_step75 = _iterator75.n()).done;) {
                var type = _step75.value;
                var prefix = type.split("\u7684")[0];
                if (prefix === "\u795E\u79D8") continue;
                var name4 = "".concat(prefix, "\u7684").concat(group);
                armTypeCheckedHtml += "\n<label style=\"margin-right: 5px;\">\n  <input type=\"checkbox\" name=\"smeltArmsType\" value=\"".concat(name4, "\" ").concat(Config.defSmeltArmTypeList.includes(name4) ? "checked" : "", "> ").concat(prefix, "\n</label>");
              }
            } catch (err) {
              _iterator75.e(err);
            } finally {
              _iterator75.f();
            }
            armTypeCheckedHtml += "</li>";
          }
        } catch (err) {
          _iterator74.e(err);
        } finally {
          _iterator74.f();
        }
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <div>\u8BF7\u9009\u62E9\u60F3\u6279\u91CF\u7194\u70BC\u7684\u88C5\u5907\u79CD\u7C7B\uFF1A</div>\n  <ul data-name=\"smeltArmTypeList\">".concat(armTypeCheckedHtml, "</ul>\n</div>\n<div class=\"pd_cfg_btns\">\n  <button name=\"selectAll\" type=\"button\">\u5168\u9009</button>\n  <button name=\"selectInverse\" type=\"button\">\u53CD\u9009</button>\n  <button name=\"smelt\" type=\"button\" style=\"color: #f00;\">\u7194\u70BC</button>\n  <button data-action=\"close\" type=\"button\">\u5173\u95ED</button>\n</div>");
        var $dialog2 = _create(dialogName2, "\u6279\u91CF\u7194\u70BC\u88C5\u5907", html2);
        var $smeltArmTypeList = $dialog2.find('ul[data-name="smeltArmTypeList"]');
        $dialog2.find('[name="smelt"]').click(function () {
          var typeList = [];
          $smeltArmTypeList.find('input[name="smeltArmsType"]:checked').each(function () {
            typeList.push($(this).val());
          });
          if (!typeList.length) return;
          read3();
          Config.defSmeltArmTypeList = typeList;
          write3();
          if (!confirm("\u662F\u5426\u7194\u70BC\u6240\u9009\u88C5\u5907\u79CD\u7C7B\uFF1F")) return;
          _close(dialogName2);
          _smeltArms({
            typeList: typeList,
            safeId: safeId2
          });
        }).end().find('[name="selectAll"]').click(function () {
          return _selectAll($smeltArmTypeList.find('input[name="smeltArmsType"]'));
        }).end().find('[name="selectInverse"]').click(function () {
          return _selectInverse($smeltArmTypeList.find('input[name="smeltArmsType"]'));
        });
        show2(dialogName2);
        _runFunc("Item.showBatchSmeltArmsDialog_after_");
      };
      _smeltArms = function _smeltArms(_ref1) {
        var _ref1$typeList = _ref1.typeList,
          typeList = _ref1$typeList === void 0 ? [] : _ref1$typeList,
          _ref1$idList = _ref1.idList,
          idList = _ref1$idList === void 0 ? [] : _ref1$idList,
          safeId3 = _ref1.safeId,
          _ref1$nextActionEnabl = _ref1.nextActionEnabled,
          nextActionEnabled = _ref1$nextActionEnabl === void 0 ? false : _ref1$nextActionEnabl;
        var successNum = 0,
          index = 0;
        var smeltInfo = {};
        var isStop = false,
          isDeleteMemo = false;
        var smeltedArmIdList = [];
        var smelt = function smelt(armId, armClass, armGroup, armName, armNum) {
          index++;
          $.ajax({
            type: "POST",
            url: "kf_fw_ig_mybpdt.php",
            data: "do=5&id=".concat(armId, "&safeid=").concat(safeId3),
            timeout: Const_default.defAjaxTimeout
          }).done(function (html2) {
            if (!html2) return;
            var msg = _removeHtmlTag(html2);
            console.log("\u3010".concat(armName, "\u3011 ").concat(msg));
            if (msg.includes("\u9519\u8BEF\u7684\u5B89\u5168\u7801")) isStop = true;
            $('.pd_result[data-name="armResult"]:last').append("<li>\u3010".concat(armName, "\u3011 ").concat(msg, "</li>"));
            $armArea2.find("td[id=\"wp_".concat(armId, "\"]")).parent("tr").fadeOut("normal", function () {
              $(this).remove();
            });
            if (Config.autoSaveArmsInfoEnabled && /装备消失|错误的编号|不是你的东西/.test(msg)) {
              smeltedArmIdList.push(armId);
            }
            var matches = /获得对应装备经验\[\+(\d+)]/.exec(msg);
            if (matches) {
              successNum++;
              if (armId in Config.armsMemo) {
                isDeleteMemo = true;
                delete Config.armsMemo[armId];
              }
              if (!(armClass in smeltInfo)) smeltInfo[armClass] = {};
              if (!(armGroup in smeltInfo[armClass])) smeltInfo[armClass][armGroup] = {
                num: 0,
                exp: 0
              };
              smeltInfo[armClass][armGroup].num++;
              smeltInfo[armClass][armGroup].exp += parseInt(matches[1]);
              $wait.find(".pd_countdown").text(successNum);
            }
            _runFunc("Item.smeltArms_after_", msg);
          }).fail(function () {
            $('.pd_result[data-name="armResult"]:last').append("<li>\u3010".concat(armName, "\u3011 <span class=\"pd_notice\">\u8FDE\u63A5\u8D85\u65F6</span></li>"));
          }).always(function () {
            if (isStop || $wait.data("stop")) {
              complete();
            } else {
              if (index === armNum) setTimeout(getNextArms, Const_default.minActionInterval);else setTimeout(function () {
                return $(document).dequeue("SmeltArms");
              }, Const_default.minActionInterval);
            }
          });
        };
        var getCurrentArms = function getCurrentArms() {
          var armList = [];
          $armArea2.find('td[id^="wp_"]').each(function () {
            var $this2 = $(this);
            var $tr = $this2.parent("tr");
            if ($tr.hasClass("pd_arm_equipped")) return;
            var armId = parseInt($tr.data("id"));
            var armName = $tr.find("> td:nth-child(3) > span:first").text().trim();
            var _armName$split = armName.split("\u7684"),
              _armName$split2 = _slicedToArray(_armName$split, 2),
              armGroup = _armName$split2[1];
            var armClass = _getArmClassNameByGroupName(armGroup);
            if (armName && armGroup) {
              if (typeList.length > 0 && typeList.includes(armName)) {
                armList.push({
                  armId: armId,
                  armClass: armClass,
                  armGroup: armGroup,
                  armName: armName
                });
              } else if (idList.length > 0 && idList.includes(armId)) {
                armList.push({
                  armId: armId,
                  armClass: armClass,
                  armGroup: armGroup,
                  armName: armName
                });
              }
            }
          });
          if (!armList.length) {
            complete();
            return;
          }
          index = 0;
          $(document).clearQueue("SmeltArms");
          $.each(armList, function (i, _ref10) {
            var armId = _ref10.armId,
              armClass = _ref10.armClass,
              armGroup = _ref10.armGroup,
              armName = _ref10.armName;
            $(document).queue("SmeltArms", function () {
              return smelt(armId, armClass, armGroup, armName, armList.length);
            });
          });
          $(document).dequeue("SmeltArms");
        };
        var getNextArms = function getNextArms() {
          _getNextObjects2(2, function () {
            if ($wait.data("stop")) complete();else setTimeout(getCurrentArms, Const_default.defAjaxInterval);
          });
        };
        var nextAction = function nextAction() {
          var action = null;
          if (Config.useItemsAfterOpenBoxesEnabled) {
            action = function action() {
              return _useItems({
                typeList: Config.defUseItemTypeList,
                safeId: safeId3,
                nextActionEnabled: nextActionEnabled
              });
            };
          } else if (Config.sellItemsAfterOpenBoxesEnabled) {
            action = function action() {
              return _sellItems({
                typeList: Config.defSellItemTypeList,
                safeId: safeId3,
                nextActionEnabled: nextActionEnabled
              });
            };
          }
          if (action) {
            setTimeout(action, Const_default.minActionInterval);
          } else if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
            showArmsFinalAdditionAfterOpenBoxes();
          }
        };
        var clearInfo = function clearInfo() {
          if (isDeleteMemo) write3();
          if (Config.autoSaveArmsInfoEnabled) {
            var armsInfo = _readArmsInfo();
            for (var _i15 = 0, _smeltedArmIdList = smeltedArmIdList; _i15 < _smeltedArmIdList.length; _i15++) {
              var armId = _smeltedArmIdList[_i15];
              delete armsInfo["\u88C5\u5907\u5217\u8868"][armId];
            }
            _writeArmsInfo(armsInfo);
          }
        };
        var complete = function complete() {
          $(document).clearQueue("SmeltArms");
          _remove($wait);
          if ($.isEmptyObject(smeltInfo)) {
            console.log("\u6CA1\u6709\u88C5\u5907\u88AB\u7194\u70BC\uFF01");
            clearInfo();
            if (nextActionEnabled) nextAction();
            _runFunc("Item.smeltArms_complete_", {
              nextActionEnabled: nextActionEnabled,
              $armArea: $armArea2
            });
            return;
          }
          var armGroupNum = 0;
          var resultStat = "",
            resultDetailStat = "",
            msgStat = "",
            logStat = "";
          var _iterator76 = _createForOfIteratorHelper(_getSortedObjectKeyList(_armClassList, smeltInfo)),
            _step76;
          try {
            for (_iterator76.s(); !(_step76 = _iterator76.n()).done;) {
              var armClass = _step76.value;
              resultDetailStat += "<b>\u3010".concat(armClass, "\u3011\uFF1A</b><br>");
              var armClassNum = 0;
              var gain = {};
              gain["".concat(armClass, "\u7ECF\u9A8C")] = 0;
              var _iterator77 = _createForOfIteratorHelper(_getSortedObjectKeyList(_armGroupList, smeltInfo[armClass])),
                _step77;
              try {
                for (_iterator77.s(); !(_step77 = _iterator77.n()).done;) {
                  var armGroup = _step77.value;
                  armGroupNum++;
                  var _smeltInfo$armClass$a = smeltInfo[armClass][armGroup],
                    exp = _smeltInfo$armClass$a.exp,
                    num2 = _smeltInfo$armClass$a.num;
                  armClassNum += num2;
                  gain["".concat(armClass, "\u7ECF\u9A8C")] += exp;
                  resultDetailStat += "&nbsp;&nbsp;\u3010".concat(armGroup, "\u3011 <i>\u88C5\u5907<ins>-").concat(num2, "</ins></i> <i>").concat(armClass, "\u7ECF\u9A8C<em>+").concat(exp.toLocaleString(), "</em></i><br>");
                }
              } catch (err) {
                _iterator77.e(err);
              } finally {
                _iterator77.f();
              }
              var commonStat = "<i>".concat(armClass, "\u7ECF\u9A8C<em>+").concat(gain["".concat(armClass, "\u7ECF\u9A8C")].toLocaleString(), "</em></i> ");
              resultStat += commonStat;
              msgStat += commonStat.trim();
              logStat += _removeHtmlTag(commonStat);
              _push("\u7194\u70BC\u88C5\u5907", "\u5171\u6709`".concat(armClassNum, "`\u4E2A\u3010`").concat(armClass, "`\u3011\u88C5\u5907\u7194\u70BC\u6210\u529F"), {
                gain: gain,
                pay: {
                  "\u88C5\u5907": -armClassNum
                }
              });
            }
          } catch (err) {
            _iterator76.e(err);
          } finally {
            _iterator76.f();
          }
          $('.pd_result[data-name="armResult"]:last').append("\n<li class=\"pd_stat\">\n  <b>\u7EDF\u8BA1\u7ED3\u679C\uFF08\u5171\u6709<em>".concat(armGroupNum, "</em>\u4E2A\u7EC4\u522B\u4E2D\u7684<em>").concat(successNum, "</em>\u4E2A\u88C5\u5907\u7194\u70BC\u6210\u529F\uFF09\uFF1A</b><br>\n  ").concat(resultStat, "<br>\n  ").concat(resultDetailStat, "\n</li>"));
          console.log("\u5171\u6709".concat(armGroupNum, "\u4E2A\u7EC4\u522B\u4E2D\u7684").concat(successNum, "\u4E2A\u88C5\u5907\u7194\u70BC\u6210\u529F\uFF0C").concat(logStat));
          _show("<strong>\u5171\u6709<em>".concat(armGroupNum, "</em>\u4E2A\u7EC4\u522B\u4E2D\u7684<em>").concat(successNum, "</em>\u4E2A\u88C5\u5907\u7194\u70BC\u6210\u529F</strong>").concat(msgStat), -1);
          clearInfo();
          setTimeout(function () {
            return _getNextObjects2(2);
          }, Const_default.defAjaxInterval);
          if (nextActionEnabled) nextAction();
          _runFunc("Item.smeltArms_complete_", {
            nextActionEnabled: nextActionEnabled,
            $armArea: $armArea2
          });
        };
        if (!$.isEmptyObject(Config.armsMemo)) read3();
        $armArea2.parent().append("<ul class=\"pd_result\" data-name=\"armResult\"><li><strong>\u7194\u70BC\u7ED3\u679C\uFF1A</strong></li></ul>");
        var $wait = _wait("<strong>\u6B63\u5728\u7194\u70BC\u88C5\u5907\u4E2D&hellip;</strong><i>\u5DF2\u7194\u70BC\uFF1A<em class=\"pd_countdown\">0</em></i><a class=\"pd_stop_action\" href=\"#\">\u505C\u6B62\u64CD\u4F5C</a>");
        getCurrentArms();
      };
      _getArmClassNameByGroupName = function _getArmClassNameByGroupName(groupName) {
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
      _getArmInfo = function _getArmInfo(html2) {
        var armInfo = {
          "\u540D\u79F0": "",
          "\u989C\u8272": "#000",
          "\u7C7B\u522B": "",
          "\u7EC4\u522B": "",
          "\u63CF\u8FF0": "",
          "\u4F5C\u7528": "",
          "\u4E3B\u5C5E\u6027": [],
          "\u4ECE\u5C5E\u6027": []
        };
        var matches = /<span style="color:([^<>]+);">([^<>]+)<\/span>/.exec(html2);
        if (!matches) return armInfo;
        armInfo["\u989C\u8272"] = matches[1];
        armInfo["\u540D\u79F0"] = matches[2];
        var _matches$2$split = matches[2].split("\u7684");
        var _matches$2$split2 = _slicedToArray(_matches$2$split, 2);
        var _matches$2$split2$ = _matches$2$split2[1];
        armInfo["\u7EC4\u522B"] = _matches$2$split2$ === void 0 ? "" : _matches$2$split2$;
        armInfo["\u7C7B\u522B"] = _getArmClassNameByGroupName(armInfo["\u7EC4\u522B"]);
        var _html2$split = html2.split("</span> - ", 2);
        var _html2$split2 = _slicedToArray(_html2$split, 2);
        var _html2$split2$ = _html2$split2[1];
        armInfo["\u63CF\u8FF0"] = _html2$split2$ === void 0 ? "" : _html2$split2$;
        var description = _removeHtmlTag(armInfo["\u63CF\u8FF0"]);
        var _description$split = description.split("\n", 1);
        var _description$split2 = _slicedToArray(_description$split, 1);
        var _description$split2$ = _description$split2[0];
        armInfo["\u4F5C\u7528"] = _description$split2$ === void 0 ? "" : _description$split2$;
        matches = /主属性：(.+?)\n/.exec(description);
        if (matches) armInfo["\u4E3B\u5C5E\u6027"] = matches[1].split("\u3002");
        matches = /从属性：(.+?)(\n|$)/.exec(description);
        if (matches) armInfo["\u4ECE\u5C5E\u6027"] = matches[1].split("\u3002");
        var smMatches = description.match(/([^。\s]+神秘)：(.+?)。/g);
        for (var i in smMatches) {
          var subMatches = /([^。\s]+神秘)：(.+?)。/.exec(smMatches[i]);
          if (smMatches) {
            armInfo[subMatches[1]] = subMatches[2];
          }
        }
        return armInfo;
      };
      _getArmsLevelInfo = function _getArmsLevelInfo(html2) {
        var armsLevelList2 = /* @__PURE__ */new Map([["\u6B66\u5668", 0], ["\u62A4\u7532", 0], ["\u9879\u94FE", 0]]);
        var matches = html2.match(/value="(\S+?)等级\[\s*(\d+)\s*] 经验:(\d+)"/g);
        for (var i in matches) {
          var subMatches = /value="(\S+?)等级\[\s*(\d+)\s*] 经验:(\d+)"/.exec(matches[i]);
          armsLevelList2.set(subMatches[1], {
            "\u7B49\u7EA7": parseInt(subMatches[2]),
            "\u7ECF\u9A8C": parseInt(subMatches[3])
          });
        }
        return armsLevelList2;
      };
      _getLevelByName = function _getLevelByName(itemName) {
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
      _getItemsUsedNumInfo = function _getItemsUsedNumInfo(html2) {
        var itemUsedNumList2 = /* @__PURE__ */new Map([["\u857E\u7C73\u8389\u4E9A\u540C\u4EBA\u6F2B\u753B", 0], ["\u5341\u516D\u591C\u540C\u4EBA\u6F2B\u753B", 0], ["\u6863\u6848\u5BA4\u94A5\u5319", 0], ["\u50B2\u5A07LOLI\u5A07\u86EE\u97F3CD", 0], ["\u6D88\u901D\u4E4B\u836F", 0], ["\u6574\u5F62\u4F18\u60E0\u5377", 0]]);
        var matches = html2.match(/value="\[\s*(\d+)\s*](\S+?)"/g);
        for (var i in matches) {
          var subMatches = /value="\[\s*(\d+)\s*](\S+?)"/.exec(matches[i]);
          if (itemUsedNumList2.has(subMatches[2])) {
            itemUsedNumList2.set(subMatches[2], parseInt(subMatches[1]));
          }
        }
        return itemUsedNumList2;
      };
      addBatchUseAndSellItemsButton = function addBatchUseAndSellItemsButton() {
        $("\n<div class=\"pd_item_btns\" data-name=\"handleItemsBtns\">\n  <button name=\"useItems\" type=\"button\" style=\"color: #00f;\" title=\"\u6279\u91CF\u4F7F\u7528\u6307\u5B9A\u9053\u5177\">\u6279\u91CF\u4F7F\u7528</button>\n  <button name=\"sellItems\" type=\"button\" style=\"color: #f00;\" title=\"\u6279\u91CF\u51FA\u552E\u6307\u5B9A\u9053\u5177\">\u6279\u91CF\u51FA\u552E</button>\n</div>\n").insertAfter($itemArea).find('[name="useItems"]').click(function () {
          return showBatchUseAndSellItemsDialog(1, safeId2);
        }).end().find('[name="sellItems"]').click(function () {
          return showBatchUseAndSellItemsDialog(2, safeId2);
        });
        _addSlowActionChecked($('.pd_item_btns[data-name="handleItemsBtns"]'));
      };
      showBatchUseAndSellItemsDialog = function showBatchUseAndSellItemsDialog(type) {
        var dialogName2 = "pdBatchUseAndSellItemsDialog";
        if ($("#" + dialogName2).length > 0) return;
        _destroy();
        var typeName = type === 1 ? "\u4F7F\u7528" : "\u51FA\u552E";
        read3();
        var itemTypesOptionHtml = "";
        var _iterator78 = _createForOfIteratorHelper(_itemTypeList.slice(6)),
          _step78;
        try {
          for (_iterator78.s(); !(_step78 = _iterator78.n()).done;) {
            var itemName = _step78.value;
            itemTypesOptionHtml += "<option>".concat(itemName, "</option>");
          }
        } catch (err) {
          _iterator78.e(err);
        } finally {
          _iterator78.f();
        }
        var html2 = "\n<div class=\"pd_cfg_main\">\n  <div style=\"margin: 5px 0;\">\u8BF7\u9009\u62E9\u60F3\u6279\u91CF".concat(typeName, "\u7684\u9053\u5177\u79CD\u7C7B\uFF08\u6309<b>Ctrl\u952E</b>\u6216<b>Shift\u952E</b>\u53EF\u591A\u9009\uFF09\uFF1A</div>\n  <select name=\"itemTypes\" size=\"6\" style=\"width: 320px;\" multiple>").concat(itemTypesOptionHtml, "</select>\n</div>\n<div class=\"pd_cfg_btns\">\n  <button name=\"sell\" type=\"button\">").concat(typeName, "</button>\n  <button data-action=\"close\" type=\"button\">\u5173\u95ED</button>\n</div>");
        var $dialog2 = _create(dialogName2, "\u6279\u91CF".concat(typeName, "\u9053\u5177"), html2);
        $dialog2.find('[name="itemTypes"]').keydown(function (e) {
          if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            $(this).children().prop("selected", true);
          }
        }).end().find('[name="sell"]').click(function () {
          var typeList = $dialog2.find('[name="itemTypes"]').val();
          if (!Array.isArray(typeList)) return;
          read3();
          if (type === 1) Config.defUseItemTypeList = typeList;else Config.defSellItemTypeList = typeList;
          write3();
          if (!confirm("\u662F\u5426".concat(typeName, "\u6240\u9009\u9053\u5177\u79CD\u7C7B\uFF1F"))) return;
          _close(dialogName2);
          if (type === 1) _useItems({
            typeList: typeList,
            safeId: safeId2
          });else _sellItems({
            typeList: typeList,
            safeId: safeId2
          });
        });
        $dialog2.find('[name="itemTypes"] > option').each(function () {
          var $this2 = $(this);
          var itemTypeList2 = type === 1 ? Config.defUseItemTypeList : Config.defSellItemTypeList;
          if (itemTypeList2.includes($this2.val())) $this2.prop("selected", true);
        });
        show2(dialogName2);
        _runFunc("Item.showBatchUseAndSellItemsDialog_after_", type);
      };
      _useItems = function _useItems(_ref11) {
        var typeList = _ref11.typeList,
          safeId3 = _ref11.safeId,
          _ref11$nextActionEnab = _ref11.nextActionEnabled,
          nextActionEnabled = _ref11$nextActionEnab === void 0 ? false : _ref11$nextActionEnab;
        var totalSuccessNum = 0,
          totalValidNum = 0,
          totalInvalidNum = 0,
          index = 0;
        var useInfo = {};
        var tmpItemTypeList = _toConsumableArray(typeList);
        var isStop = false;
        var use = function use(itemId, itemName, itemNum) {
          index++;
          $.ajax({
            type: "POST",
            url: "kf_fw_ig_mybpdt.php",
            data: "do=1&id=".concat(itemId, "&safeid=").concat(safeId3),
            timeout: Const_default.defAjaxTimeout
          }).done(function (html2) {
            if (!html2) return;
            var msg = _removeHtmlTag(html2);
            var isDelete = false;
            if (/(成功|失败)！/.test(msg)) {
              totalSuccessNum++;
              if (!(itemName in useInfo)) useInfo[itemName] = {
                "\u9053\u5177": 0,
                "\u6709\u6548\u9053\u5177": 0,
                "\u65E0\u6548\u9053\u5177": 0
              };
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
              var typeIndex = tmpItemTypeList.indexOf(itemName);
              if (typeIndex > -1) tmpItemTypeList.splice(typeIndex, 1);
            } else if (msg.includes("\u9519\u8BEF\u7684\u5B89\u5168\u7801")) {
              isStop = true;
            } else {
              isDelete = true;
            }
            if (isDelete) {
              $itemArea.find("[id=\"wp_".concat(itemId, "\"]")).fadeOut("normal", function () {
                $(this).remove();
              });
            }
            console.log("\u3010Lv.".concat(_getLevelByName(itemName), "\uFF1A").concat(itemName, "\u3011 ").concat(msg));
            $('.pd_result[data-name="itemResult"]:last').append("<li>\u3010Lv.".concat(_getLevelByName(itemName), "\uFF1A").concat(itemName, "\u3011 ").concat(msg, "</li>"));
            _runFunc("Item.useItems_after_", msg);
          }).fail(function () {
            $('.pd_result[data-name="itemResult"]:last').append("<li>\u3010Lv.".concat(_getLevelByName(itemName), "\uFF1A").concat(itemName, "\u3011 <span class=\"pd_notice\">\u8FDE\u63A5\u8D85\u65F6</span></li>"));
          }).always(function () {
            if (isStop || $wait.data("stop")) {
              complete();
            } else {
              if (index === itemNum) setTimeout(getNextItems, typeof Const_default.specialAjaxInterval === "function" ? Const_default.specialAjaxInterval() : Const_default.specialAjaxInterval);else setTimeout(function () {
                return $(document).dequeue("UseItems");
              }, typeof Const_default.specialAjaxInterval === "function" ? Const_default.specialAjaxInterval() : Const_default.specialAjaxInterval);
            }
          });
        };
        var getCurrentItems = function getCurrentItems() {
          var itemList = [];
          $itemArea.find('tr[id^="wp_"]').each(function () {
            var $this2 = $(this);
            var matches = /wp_(\d+)/.exec($this2.attr("id"));
            if (!matches) return;
            var itemId = parseInt(matches[1]);
            var itemName = $this2.find("> td:nth-child(3)").text().trim();
            if (tmpItemTypeList.includes(itemName)) itemList.push({
              itemId: itemId,
              itemName: itemName
            });
          });
          if (!itemList.length) {
            complete();
            return;
          }
          index = 0;
          $(document).clearQueue("UseItems");
          $.each(itemList, function (i, _ref12) {
            var itemId = _ref12.itemId,
              itemName = _ref12.itemName;
            $(document).queue("UseItems", function () {
              return use(itemId, itemName, itemList.length);
            });
          });
          $(document).dequeue("UseItems");
        };
        var getNextItems = function getNextItems() {
          _getNextObjects2(2, function () {
            if ($wait.data("stop")) complete();else setTimeout(getCurrentItems, Const_default.defAjaxInterval);
          });
        };
        var nextAction = function nextAction() {
          var action = null;
          if (Config.sellItemsAfterOpenBoxesEnabled) {
            action = function action() {
              return _sellItems({
                typeList: Config.defSellItemTypeList,
                safeId: safeId3,
                nextActionEnabled: nextActionEnabled
              });
            };
          }
          if (action) {
            setTimeout(action, Const_default.minActionInterval);
          } else if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
            showArmsFinalAdditionAfterOpenBoxes();
          }
        };
        var complete = function complete() {
          $(document).clearQueue("UseItems");
          _remove($wait);
          if ($.isEmptyObject(useInfo)) {
            console.log("\u6CA1\u6709\u9053\u5177\u88AB\u4F7F\u7528\uFF01");
            if (nextActionEnabled) nextAction();
            _runFunc("Item.useItems_complete_", {
              nextActionEnabled: nextActionEnabled,
              $armArea: $armArea2
            });
            return;
          }
          var itemTypeNum = 0;
          var resultStat = "";
          var _iterator79 = _createForOfIteratorHelper(_getSortedObjectKeyList(typeList, useInfo)),
            _step79;
          try {
            for (_iterator79.s(); !(_step79 = _iterator79.n()).done;) {
              var itemName = _step79.value;
              itemTypeNum++;
              var itemLevel = _getLevelByName(itemName);
              var stat = useInfo[itemName];
              var successNum = stat["\u9053\u5177"];
              delete stat["\u9053\u5177"];
              if (stat["\u6709\u6548\u9053\u5177"] === 0) delete stat["\u6709\u6548\u9053\u5177"];
              if (stat["\u65E0\u6548\u9053\u5177"] === 0) delete stat["\u65E0\u6548\u9053\u5177"];
              if (!$.isEmptyObject(stat)) {
                resultStat += "\u3010Lv.".concat(itemLevel, "\uFF1A").concat(itemName, "\u3011 <i>\u9053\u5177<ins>-").concat(successNum, "</ins></i> ");
                var _iterator80 = _createForOfIteratorHelper(_entries(stat)),
                  _step80;
                try {
                  for (_iterator80.s(); !(_step80 = _iterator80.n()).done;) {
                    var _step80$value = _slicedToArray(_step80.value, 2),
                      key = _step80$value[0],
                      num2 = _step80$value[1];
                    resultStat += "<i>".concat(key, "<em>+").concat(num2, "</em></i> ");
                  }
                } catch (err) {
                  _iterator80.e(err);
                } finally {
                  _iterator80.f();
                }
                resultStat += "<br>";
                _push("\u4F7F\u7528\u9053\u5177", "\u5171\u6709`".concat(successNum, "`\u4E2A\u3010`Lv.").concat(itemLevel, "\uFF1A").concat(itemName, "`\u3011\u9053\u5177\u88AB\u4F7F\u7528"), {
                  gain: stat,
                  pay: {
                    "\u9053\u5177": -successNum
                  }
                });
              }
            }
          } catch (err) {
            _iterator79.e(err);
          } finally {
            _iterator79.f();
          }
          $('.pd_result[data-name="itemResult"]:last').append("\n<li class=\"pd_stat\">\n  <b>\u7EDF\u8BA1\u7ED3\u679C\uFF08\u5171\u6709<em>".concat(itemTypeNum, "</em>\u4E2A\u79CD\u7C7B\u4E2D\u7684<em>").concat(totalSuccessNum, "</em>\u4E2A\u9053\u5177\u88AB\u4F7F\u7528\uFF0C\n<i>\u6709\u6548\u9053\u5177<em>+").concat(totalValidNum, "</em></i><i>\u65E0\u6548\u9053\u5177<em>+").concat(totalInvalidNum, "</em></i>\uFF09\uFF1A</b><br>\n  ").concat(resultStat, "\n</li>"));
          console.log("\u5171\u6709".concat(itemTypeNum, "\u4E2A\u79CD\u7C7B\u4E2D\u7684").concat(totalSuccessNum, "\u4E2A\u9053\u5177\u88AB\u4F7F\u7528\uFF0C\u6709\u6548\u9053\u5177+").concat(totalValidNum, "\uFF0C\u65E0\u6548\u9053\u5177+").concat(totalInvalidNum));
          _show("<strong>\u5171\u6709<em>".concat(itemTypeNum, "</em>\u4E2A\u79CD\u7C7B\u4E2D\u7684<em>").concat(totalSuccessNum, "</em>\u4E2A\u9053\u5177\u88AB\u4F7F\u7528</strong><i>\u6709\u6548\u9053\u5177<em>+").concat(totalValidNum, "</em></i><i>\u65E0\u6548\u9053\u5177<em>+").concat(totalInvalidNum, "</em></i>"), -1);
          setTimeout(function () {
            return _getNextObjects2(2);
          }, Const_default.defAjaxInterval);
          if (nextActionEnabled) nextAction();
          _runFunc("Item.useItems_complete_", {
            nextActionEnabled: nextActionEnabled,
            $armArea: $armArea2
          });
        };
        $itemArea.parent().append("<ul class=\"pd_result\" data-name=\"itemResult\"><li><strong>\u4F7F\u7528\u7ED3\u679C\uFF1A</strong></li></ul>");
        var $wait = _wait("<strong>\u6B63\u5728\u4F7F\u7528\u9053\u5177\u4E2D&hellip;</strong><i>\u5DF2\u4F7F\u7528\uFF1A<em class=\"pd_countdown\">0</em></i><a class=\"pd_stop_action\" href=\"#\">\u505C\u6B62\u64CD\u4F5C</a>");
        getCurrentItems();
      };
      _sellItems = function _sellItems(_ref13) {
        var typeList = _ref13.typeList,
          safeId3 = _ref13.safeId,
          _ref13$nextActionEnab = _ref13.nextActionEnabled,
          nextActionEnabled = _ref13$nextActionEnab === void 0 ? false : _ref13$nextActionEnab;
        var successNum = 0,
          index = 0;
        var sellInfo = {};
        var isStop = false;
        var sell = function sell(itemId, itemName, itemNum) {
          index++;
          $.ajax({
            type: "POST",
            url: "kf_fw_ig_mybpdt.php",
            data: "do=2&id=".concat(itemId, "&safeid=").concat(safeId3),
            timeout: Const_default.defAjaxTimeout
          }).done(function (html2) {
            if (!html2) return;
            var msg = _removeHtmlTag(html2);
            if (msg.includes("\u9519\u8BEF\u7684\u5B89\u5168\u7801")) isStop = true;
            console.log("\u3010Lv.".concat(_getLevelByName(itemName), "\uFF1A").concat(itemName, "\u3011 ").concat(msg));
            $('.pd_result[data-name="itemResult"]:last').append("<li>\u3010Lv.".concat(_getLevelByName(itemName), "\uFF1A").concat(itemName, "\u3011 ").concat(msg, "</li>"));
            $itemArea.find("[id=\"wp_".concat(itemId, "\"]")).fadeOut("normal", function () {
              $(this).remove();
            });
            var matches = /出售该物品获得了\[\s*(\d+)\s*]KFB/.exec(msg);
            if (matches) {
              successNum++;
              if (!(itemName in sellInfo)) sellInfo[itemName] = {
                num: 0,
                sell: 0
              };
              sellInfo[itemName].num++;
              sellInfo[itemName].sell += parseInt(matches[1]);
              $wait.find(".pd_countdown").text(successNum);
            }
            _runFunc("Item.sellItems_after_", msg);
          }).fail(function () {
            $('.pd_result[data-name="itemResult"]:last').append("<li>\u3010Lv.".concat(_getLevelByName(itemName), "\uFF1A").concat(itemName, "\u3011 <span class=\"pd_notice\">\u8FDE\u63A5\u8D85\u65F6</span></li>"));
          }).always(function () {
            if (isStop || $wait.data("stop")) {
              complete();
            } else {
              if (index === itemNum) setTimeout(getNextItems, Const_default.minActionInterval);else setTimeout(function () {
                return $(document).dequeue("SellItems");
              }, Const_default.minActionInterval);
            }
          });
        };
        var getCurrentItems = function getCurrentItems() {
          var itemList = [];
          $itemArea.find('tr[id^="wp_"]').each(function () {
            var $this2 = $(this);
            var matches = /wp_(\d+)/.exec($this2.attr("id"));
            if (!matches) return;
            var itemId = parseInt(matches[1]);
            var itemName = $this2.find("> td:nth-child(3)").text().trim();
            if (typeList.includes(itemName)) itemList.push({
              itemId: itemId,
              itemName: itemName
            });
          });
          if (!itemList.length) {
            complete();
            return;
          }
          index = 0;
          $(document).clearQueue("SellItems");
          $.each(itemList, function (i, _ref14) {
            var itemId = _ref14.itemId,
              itemName = _ref14.itemName;
            $(document).queue("SellItems", function () {
              return sell(itemId, itemName, itemList.length);
            });
          });
          $(document).dequeue("SellItems");
        };
        var getNextItems = function getNextItems() {
          _getNextObjects2(2, function () {
            if ($wait.data("stop")) complete();else setTimeout(getCurrentItems, Const_default.defAjaxInterval);
          });
        };
        var complete = function complete() {
          $(document).clearQueue("SellItems");
          _remove($wait);
          if ($.isEmptyObject(sellInfo)) {
            console.log("\u6CA1\u6709\u9053\u5177\u88AB\u51FA\u552E\uFF01");
            if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
              showArmsFinalAdditionAfterOpenBoxes();
            }
            _runFunc("Item.sellItems_complete_", {
              nextActionEnabled: nextActionEnabled,
              $armArea: $armArea2
            });
            return;
          }
          var itemTypeNum = 0,
            totalSell = 0;
          var resultStat = "";
          var _iterator81 = _createForOfIteratorHelper(_getSortedObjectKeyList(typeList, sellInfo)),
            _step81;
          try {
            for (_iterator81.s(); !(_step81 = _iterator81.n()).done;) {
              var itemName = _step81.value;
              itemTypeNum++;
              var itemLevel = _getLevelByName(itemName);
              var _sellInfo$itemName = sellInfo[itemName],
                sell2 = _sellInfo$itemName.sell,
                num2 = _sellInfo$itemName.num;
              totalSell += sell2;
              resultStat += "\u3010Lv.".concat(itemLevel, "\uFF1A").concat(itemName, "\u3011 <i>\u9053\u5177<ins>-").concat(num2, "</ins></i> <i>KFB<em>+").concat(sell2.toLocaleString(), "</em></i><br>");
              _push("\u51FA\u552E\u9053\u5177", "\u5171\u6709`".concat(num2, "`\u4E2A\u3010`Lv.").concat(itemLevel, "\uFF1A").concat(itemName, "`\u3011\u9053\u5177\u51FA\u552E\u6210\u529F"), {
                gain: {
                  "KFB": sell2
                },
                pay: {
                  "\u9053\u5177": -num2
                }
              });
            }
          } catch (err) {
            _iterator81.e(err);
          } finally {
            _iterator81.f();
          }
          $('.pd_result[data-name="itemResult"]:last').append("\n<li class=\"pd_stat\">\n  <b>\u7EDF\u8BA1\u7ED3\u679C\uFF08\u5171\u6709<em>".concat(itemTypeNum, "</em>\u4E2A\u79CD\u7C7B\u4E2D\u7684<em>").concat(successNum, "</em>\u4E2A\u9053\u5177\u51FA\u552E\u6210\u529F\uFF09\uFF1A</b> <i>KFB<em>+").concat(totalSell.toLocaleString(), "</em></i><br>\n  ").concat(resultStat, "\n</li>"));
          console.log("\u5171\u6709".concat(itemTypeNum, "\u4E2A\u79CD\u7C7B\u4E2D\u7684").concat(successNum, "\u4E2A\u9053\u5177\u51FA\u552E\u6210\u529F\uFF0CKFB+").concat(totalSell));
          _show("<strong>\u5171\u6709<em>".concat(itemTypeNum, "</em>\u4E2A\u79CD\u7C7B\u4E2D\u7684<em>").concat(successNum, "</em>\u4E2A\u9053\u5177\u51FA\u552E\u6210\u529F</strong><i>KFB<em>+").concat(totalSell.toLocaleString(), "</em></i>"), -1);
          setTimeout(function () {
            return _getNextObjects2(2);
          }, Const_default.defAjaxInterval);
          if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
            showArmsFinalAdditionAfterOpenBoxes();
          }
          _runFunc("Item.sellItems_complete_", {
            nextActionEnabled: nextActionEnabled,
            $armArea: $armArea2
          });
        };
        $itemArea.parent().append("<ul class=\"pd_result\" data-name=\"itemResult\"><li><strong>\u51FA\u552E\u7ED3\u679C\uFF1A</strong></li></ul>");
        var $wait = _wait("<strong>\u6B63\u5728\u51FA\u552E\u9053\u5177\u4E2D&hellip;</strong><i>\u5DF2\u51FA\u552E\uFF1A<em class=\"pd_countdown\">0</em></i><a class=\"pd_stop_action\" href=\"#\">\u505C\u6B62\u64CD\u4F5C</a>");
        getCurrentItems();
      };
      _buyItems = function _buyItems(buyItemIdList) {
        if (/* @__PURE__ */new Date() < _getDateByTime(Config.buyItemAfterTime)) {
          $(document).dequeue("AutoAction");
          return;
        }
        var index = 0,
          subIndex = 0;
        var isStop = false;
        var itemIdList = [];
        var getItemNameById = function getItemNameById(itemId) {
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
        var getItemPayById = function getItemPayById(itemId) {
          switch (parseInt(itemId)) {
            case 101:
              return {
                "KFB": -5e3
              };
            case 102:
              return {
                "KFB": -1e4
              };
            case 103:
              return {
                "\u666E\u901A\u76D2\u5B50": -100
              };
            default:
              return null;
          }
        };
        var getCookieDate = function getCookieDate() {
          var now = /* @__PURE__ */new Date();
          var date = _getTimezoneDateByTime("00:25:00");
          if (now > date) date.setDate(date.getDate() + 1);
          return date;
        };
        var _readBuyInfo = function readBuyInfo() {
          console.log("\u8BFB\u53D6\u8D2D\u4E70\u9875\u9762\u4FE1\u606FStart");
          $.ajax({
            type: "GET",
            url: "kf_fw_ig_shop.php?t=" + $.now(),
            timeout: Const_default.defAjaxTimeout
          }).done(function (html2) {
            if (_getCookie(Const_default.buyItemReadyCookieName)) {
              _remove($wait);
              $(document).dequeue("AutoAction");
              return;
            }
            var matches = /safeid=(\w+)/.exec(html2);
            if (matches) {
              _setCookie(Const_default.buyItemReadyCookieName, 1, _getDate("+5m"));
              var safeId3 = matches[1];
              setTimeout(function () {
                return _buy(parseInt(itemIdList[index][subIndex]), safeId3);
              }, Const_default.defAjaxInterval);
            } else {
              _remove($wait);
              _setCookie(Const_default.buyItemCookieName, 1, _getDate("+15m"));
              $(document).dequeue("AutoAction");
            }
          }).fail(function () {
            setTimeout(_readBuyInfo, Const_default.defAjaxInterval);
          });
        };
        var _buy = function buy(itemId, safeId3) {
          $.ajax({
            type: "POST",
            url: "kf_fw_ig_shop.php",
            data: "buy=".concat(itemId, "&safeid=").concat(safeId3),
            timeout: Const_default.defAjaxTimeout
          }).done(function (html2) {
            var msg = _removeHtmlTag(html2);
            var itemName = getItemNameById(itemId);
            console.log("\u3010\u8D2D\u4E70\u7269\u54C1\u3011\u3010".concat(itemName, "\u3011\uFF1A").concat(msg));
            var isShowMsg = false;
            if (msg.includes("\u8D2D\u4E70\u6210\u529F")) {
              index++;
              subIndex = 0;
              var matches = /\+(\d+)(武器\/护甲经验|经验)/.exec(msg);
              if (matches) {
                var num2 = parseInt(matches[1]),
                  key = matches[2];
                var gain = {},
                  pay = getItemPayById(itemId);
                if (key === "\u7ECF\u9A8C") {
                  gain["\u7ECF\u9A8C\u503C"] = num2;
                } else {
                  gain["\u6B66\u5668\u7ECF\u9A8C"] = num2;
                  gain["\u62A4\u7532\u7ECF\u9A8C"] = num2;
                }
                if (pay) {
                  _push("\u8D2D\u4E70\u7269\u54C1", "\u5171\u6709`1`\u4E2A\u3010`".concat(itemName, "`\u3011\u8D2D\u4E70\u6210\u529F"), {
                    gain: gain,
                    pay: pay
                  });
                }
                var msgStat = "";
                var _iterator82 = _createForOfIteratorHelper(_entries(gain)),
                  _step82;
                try {
                  for (_iterator82.s(); !(_step82 = _iterator82.n()).done;) {
                    var _step82$value = _slicedToArray(_step82.value, 2),
                      key2 = _step82$value[0],
                      value = _step82$value[1];
                    msgStat += "<i>".concat(key2, "<em>+").concat(value.toLocaleString(), "</em></i>");
                  }
                } catch (err) {
                  _iterator82.e(err);
                } finally {
                  _iterator82.f();
                }
                var _iterator83 = _createForOfIteratorHelper(_entries(pay)),
                  _step83;
                try {
                  for (_iterator83.s(); !(_step83 = _iterator83.n()).done;) {
                    var _step83$value = _slicedToArray(_step83.value, 2),
                      _key0 = _step83$value[0],
                      _value8 = _step83$value[1];
                    msgStat += "<i>".concat(_key0, "<ins>").concat(_value8.toLocaleString(), "</ins></i>");
                  }
                } catch (err) {
                  _iterator83.e(err);
                } finally {
                  _iterator83.f();
                }
                isShowMsg = true;
                _show("<strong>\u8D2D\u4E70\u7269\u54C1\u3010".concat(itemName, "\u3011").concat(msgStat));
                _runFunc("Item.buyItems_success_", msg);
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
                _setCookie(Const_default.buyItemCookieName, 1, getCookieDate());
              }
            }
            if (!isShowMsg) {
              _show("<strong>\u8D2D\u4E70\u7269\u54C1\u3010".concat(itemName, "\u3011\uFF1A").concat(msg, "</strong>"));
            }
          }).fail(function () {
            index++;
            subIndex = 0;
            _show("<strong>\u8D2D\u4E70\u7269\u54C1\u3010".concat(getItemNameById(itemId), "\u3011\uFF1A\u8FDE\u63A5\u8D85\u65F6</strong>"));
          }).always(function () {
            isStop = isStop || $wait.data("stop");
            if (isStop || index >= itemIdList.length) {
              _remove($wait);
              _deleteCookie(Const_default.buyItemReadyCookieName);
              _setCookie(Const_default.buyItemCookieName, 1, getCookieDate());
              setTimeout(function () {
                return $(document).dequeue("AutoAction");
              }, Const_default.minActionInterval);
              _runFunc("Item.buyItems_complete_");
            } else {
              setTimeout(function () {
                return _buy(parseInt(itemIdList[index][subIndex]), safeId3);
              }, Const_default.minActionInterval);
            }
          });
        };
        var _iterator84 = _createForOfIteratorHelper(buyItemIdList),
          _step84;
        try {
          for (_iterator84.s(); !(_step84 = _iterator84.n()).done;) {
            var value = _step84.value;
            if (!/^\d+(\|\d+)*$/.test(value)) continue;
            var arr = value.split("|").filter(function (id) {
              return id && getItemNameById(parseInt(id)) !== "\u672A\u77E5";
            });
            if (arr.length > 0) {
              itemIdList.push(arr);
            }
          }
        } catch (err) {
          _iterator84.e(err);
        } finally {
          _iterator84.f();
        }
        if (!itemIdList.length) {
          _setCookie(Const_default.buyItemCookieName, 1, getCookieDate());
          $(document).dequeue("AutoAction");
          return;
        }
        var $wait = _wait("<strong>\u6B63\u5728\u8D2D\u4E70\u7269\u54C1\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em class=\"pd_countdown\">".concat(itemIdList.length, "</em></i><a class=\"pd_stop_action\" href=\"#\">\u505C\u6B62\u64CD\u4F5C</a>"));
        _readBuyInfo();
      };
      _showMyInfoInItemShop = function _showMyInfoInItemShop() {
        $.get("profile.php?action=show&uid=".concat(Info_default.uid, "&t=").concat($.now()), function (html2) {
          var kfbMatches = /论坛货币：(\d+)\s*KFB/.exec(html2);
          var gxMatches = /贡献数值：(\d+(?:\.\d+)?)/.exec(html2);
          if (!kfbMatches && !gxMatches) return;
          var kfb = parseInt(kfbMatches[1]);
          var gx = parseFloat(gxMatches[1]);
          $(".kf_fw_ig_title1:eq(1)").append("\n<span style=\"margin-left: 7px;\">(\u5F53\u524D\u6301\u6709 <b style=\"font-size: 14px;\">".concat(kfb.toLocaleString(), "</b> KFB \u548C <b style=\"font-size: 14px;\">").concat(gx, "</b> \u8D21\u732E)</span>\n"));
        });
      };
      _showBuyItemTips = function _showBuyItemTips() {
        $(".kf_fw_ig1:first > tbody > tr:gt(0)").each(function (index) {
          if (index <= 1) {
            var $this2 = $(this);
            $this2.find("td:last-child").append("<span class=\"pd_cfg_tips pd_highlight\" title=\"\u7279\u522B\u63D0\u793A\uFF1A\n\u795E\u79D8\u7CFB\u6570\u975E\u795E\u79D8\u7B49\u7EA7\uFF0C\u8D2D\u4E70\u3010\u7B49\u7EA7\u7ECF\u9A8C\u836F\u4E38".concat(index === 1 ? "\uFF08\u86CB\uFF09" : "", "\u3011\u53EF\u80FD\u5BFC\u81F4\u795E\u79D8\u7B49\u7EA7\u4E0B\u964D\uFF0C\u8BF7\u77E5\u6089\uFF01\n\u795E\u79D8\u7B49\u7EA7\u516C\u5F0F\uFF1A\u795E\u79D8\u7CFB\u6570*((\u795E\u79D8\u7CFB\u6570*0.5)+(\u8D21\u732E*5)+(KFB*0.001)+(\u53D1\u5E16*0.01))\">[?]</span>"));
          }
        });
      };
    }
  });

  // src/module/Config.js
  var Config_exports = {};
  __export(Config_exports, {
    Config: function Config() {
      return Config2;
    },
    changeStorageType: function changeStorageType() {
      return _changeStorageType;
    },
    clear: function clear() {
      return clear3;
    },
    clearData: function clearData() {
      return _clearData;
    },
    init: function init() {
      return init3;
    },
    normalize: function normalize() {
      return _normalize;
    },
    read: function read() {
      return read3;
    },
    write: function write() {
      return write3;
    }
  });
  var name3, Config2, init3, read3, write3, clear3, _changeStorageType, _normalize, _clearData;
  var init_Config = __esm({
    "src/module/Config.js": function src_module_ConfigJs() {
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
      init3 = function init3() {
        Info_default.w.Config = $.extend(true, {}, Config2);
        if (typeof GM_getValue !== "undefined") {
          Info_default.storageType = GM_getValue("StorageType");
          if (Info_default.storageType !== "ByUid" && Info_default.storageType !== "Global") Info_default.storageType = "Default";
        }
        read3();
      };
      read3 = function read3() {
        var options = _readData(Info_default.storageType === "ByUid" ? name3 + "_" + Info_default.uid : name3);
        if (!options) return;
        try {
          options = JSON.parse(options);
        } catch (ex) {
          return;
        }
        if (!options || $.type(options) !== "object" || $.isEmptyObject(options)) return;
        options = _normalize(options);
        Info_default.w.Config = $.extend(true, {}, Config2, options);
      };
      write3 = function write3() {
        var options = _getDifferenceSetOfObject(Config2, Info_default.w.Config);
        _writeData(Info_default.storageType === "ByUid" ? name3 + "_" + Info_default.uid : name3, JSON.stringify(options));
      };
      clear3 = function clear3() {
        return _deleteData(Info_default.storageType === "ByUid" ? name3 + "_" + Info_default.uid : name3);
      };
      _changeStorageType = function _changeStorageType(storageType) {
        var log2 = _read();
        var tmpLog = read2();
        var armsInfo = _readArmsInfo();
        var buyThreadLog = _readBuyThreadLog();
        Info_default.storageType = storageType;
        if (typeof GM_setValue !== "undefined") GM_setValue("StorageType", Info_default.storageType);
        if (!_deepEqual2(Config2, Info_default.w.Config) || !$.isEmptyObject(log2)) {
          if (confirm("\u662F\u5426\u5C06\u52A9\u624B\u8BBE\u7F6E\u548C\u65E5\u5FD7\u8F6C\u79FB\u5230\u5BF9\u5E94\u5B58\u50A8\u7C7B\u578B\u4E2D\uFF1F\uFF08\u5BF9\u5E94\u5B58\u50A8\u7C7B\u578B\u4E2D\u7684\u6570\u636E\u5C06\u88AB\u8986\u76D6\uFF09")) {
            write3();
            _write(log2);
            write2(tmpLog);
            _writeArmsInfo(armsInfo);
            _writeBuyThreadLog(buyThreadLog);
          }
        }
      };
      _normalize = function _normalize(options) {
        var settings = {};
        if ($.type(options) !== "object") return settings;
        var _iterator85 = _createForOfIteratorHelper(_entries(options)),
          _step85;
        try {
          for (_iterator85.s(); !(_step85 = _iterator85.n()).done;) {
            var _step85$value = _slicedToArray(_step85.value, 2),
              key = _step85$value[0],
              value = _step85$value[1];
            if (key in Config2 && $.type(value) === $.type(Config2[key])) {
              settings[key] = value;
            }
          }
        } catch (err) {
          _iterator85.e(err);
        } finally {
          _iterator85.f();
        }
        return settings;
      };
      _clearData = function _clearData(name4) {
        if (name4 === "cookies") {
          for (var key in Const_default) {
            if (/CookieName$/.test(key)) {
              _deleteCookie(Const_default[key]);
            }
          }
        } else if (name4 === "tmpData") {
          clear2();
          localStorage.removeItem(Const_default.multiQuoteStorageName);
          localStorage.removeItem(Const_default.tempPointsLogListStorageName);
        } else if (name4 === "config") {
          clear3();
        } else if (name4 === "log") {
          _clear();
        } else if (name4 === "armsInfo") {
          _clearArmsInfo();
        } else if (name4 === "buyThreadLog") {
          _clearBuyThreadLog();
        }
      };
    }
  });

  // src/module/SelfRate.js
  var SelfRate_exports = {};
  __export(SelfRate_exports, {
    addLinksInPage: function addLinksInPage() {
      return _addLinksInPage;
    },
    addUnrecognizedSizeWarning: function addUnrecognizedSizeWarning() {
      return _addUnrecognizedSizeWarning;
    },
    checkRateSize: function checkRateSize() {
      return _checkRateSize;
    },
    handleGoodPostSubmit: function handleGoodPostSubmit() {
      return _handleGoodPostSubmit;
    },
    highlightRateErrorSize: function highlightRateErrorSize() {
      return _highlightRateErrorSize;
    },
    refreshWaitCheckRatePage: function refreshWaitCheckRatePage() {
      return _refreshWaitCheckRatePage;
    },
    showErrorSizeSubmitWarning: function showErrorSizeSubmitWarning() {
      return _showErrorSizeSubmitWarning;
    }
  });
  var _checkRateSize, _highlightRateErrorSize, _showErrorSizeSubmitWarning, _addUnrecognizedSizeWarning, _refreshWaitCheckRatePage, _addLinksInPage, _handleGoodPostSubmit;
  var init_SelfRate = __esm({
    "src/module/SelfRate.js": function src_module_SelfRateJs() {
      "use strict";

      init_Info();
      init_Const();
      init_Public();
      _checkRateSize = function _checkRateSize(title2, ratingSize) {
        var titleSize = 0;
        var matches = title2.match(/\b(\d+(?:\.\d+)?)\s?(M|G)B?\b/ig);
        if (matches) {
          for (var i = 0; i < matches.length; i++) {
            var sizeMatches = /(\d+(?:\.\d+)?)\s?(M|G)/i.exec(matches[i]);
            if (!sizeMatches) continue;
            var size = parseFloat(sizeMatches[1]);
            if (sizeMatches[2].toUpperCase() === "G") size *= 1024;
            titleSize += size;
          }
        }
        if (!titleSize || !ratingSize) {
          return {
            type: -1
          };
        } else if (titleSize > ratingSize * (100 + Const_default.ratingErrorSizePercent) / 100 + 1 || titleSize < ratingSize * (100 - Const_default.ratingErrorSizePercent) / 100 - 1) {
          return {
            type: 1,
            titleSize: titleSize,
            ratingSize: ratingSize
          };
        } else return {
          type: 0
        };
      };
      _highlightRateErrorSize = function _highlightRateErrorSize() {
        $('.adp1:eq(1) a[href^="read.php?tid="]').each(function () {
          var $this2 = $(this);
          var title2 = $this2.text();
          var ratingSize = 0;
          var $ratingCell = $this2.parent("td").next("td");
          var matches = /认定\[(\d+)\]/i.exec($ratingCell.text());
          if (matches) {
            ratingSize = parseInt(matches[1]);
          }
          var _checkRateSize2 = _checkRateSize(title2, ratingSize),
            type = _checkRateSize2.type,
            titleSize = _checkRateSize2.titleSize;
          if (type === -1) {
            $ratingCell.css("color", "#ff9933").attr("title", "\u6807\u9898\u6587\u4EF6\u5927\u5C0F\u65E0\u6CD5\u89E3\u6790").addClass("pd_custom_tips");
          } else if (type === 1) {
            $ratingCell.addClass("pd_highlight pd_custom_tips").attr("title", "\u6807\u9898\u6587\u4EF6\u5927\u5C0F(".concat(titleSize.toLocaleString(), "M)\u4E0E\u8BA4\u5B9A\u6587\u4EF6\u5927\u5C0F(").concat(ratingSize.toLocaleString(), "M)\u4E0D\u4E00\u81F4"));
          }
        });
      };
      _showErrorSizeSubmitWarning = function _showErrorSizeSubmitWarning() {
        $('form[name="mail1"]').submit(function () {
          var ratingSize = parseFloat($('[name="psize"]').val());
          if (isNaN(ratingSize) || ratingSize <= 0) return;
          if (parseInt($('[name="psizegb"]').val()) === 2) ratingSize *= 1024;
          var title2 = $('.adp1 a[href^="read.php?tid="]').text();
          var _checkRateSize3 = _checkRateSize(title2, ratingSize),
            type = _checkRateSize3.type,
            titleSize = _checkRateSize3.titleSize;
          if (type === 1) {
            return confirm("\u6807\u9898\u6587\u4EF6\u5927\u5C0F(".concat(titleSize.toLocaleString(), "M)\u4E0E\u8BA4\u5B9A\u6587\u4EF6\u5927\u5C0F(").concat(ratingSize.toLocaleString(), "M)\u4E0D\u4E00\u81F4\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F"));
          }
        });
      };
      _addUnrecognizedSizeWarning = function _addUnrecognizedSizeWarning() {
        var $title = $('.adp1 a[href^="read.php?tid="]');
        var title2 = $title.text();
        var _checkRateSize4 = _checkRateSize(title2, 1),
          type = _checkRateSize4.type;
        if (type === -1) {
          $title.parent().append("&nbsp;<span style=\"color: #ff9933;\">(\u6807\u9898\u6587\u4EF6\u5927\u5C0F\u65E0\u6CD5\u89E3\u6790)</span>");
        }
      };
      _refreshWaitCheckRatePage = function _refreshWaitCheckRatePage() {
        if (!/剩余-\d+分钟/.test($(".adp1:eq(1) > tbody > tr:last-child > td:first-child").text())) return;
        var _refresh = function refresh() {
          console.log("\u81EA\u52A8\u5237\u65B0Start");
          $.ajax({
            type: "GET",
            url: "kf_fw_1wkfb.php?ping=2&t=" + $.now(),
            timeout: 1e4
          }).done(function (html2) {
            if (/剩余-\d+分钟/.test(html2)) setTimeout(_refresh, Const_default.defAjaxInterval);
          }).fail(function () {
            return setTimeout(_refresh, Const_default.defAjaxInterval);
          });
        };
        _refresh();
      };
      _addLinksInPage = function _addLinksInPage() {
        if (/\/kf_fw_1wkfb\.php\?ping=5\b/.test(location.href)) {
          $(".adp1:last > tbody > tr:gt(0) > td:last-child").each(function () {
            var $this2 = $(this);
            var uid = parseInt($this2.text());
            $this2.wrapInner("<a class=\"".concat(uid === Info_default.uid ? "pd_highlight" : "", " ").concat(!Config.adminMemberEnabled ? "pd_not_click_link" : "", "\" href=\"profile.php?action=show&uid=").concat(uid, "\" target=\"_blank\"></a>"));
          });
        } else if (/\/kf_fw_1wkfb\.php\?ping=6\b/.test(location.href)) {
          $(".adp1:last > tbody > tr:gt(1) > td:nth-child(3)").each(function () {
            var $this2 = $(this);
            var userName2 = $this2.text().trim();
            if (userName2 === "0") return;
            $this2.wrapInner("<a class=\"".concat(userName2 === Info_default.userName ? "pd_highlight" : "", " ").concat(!Config.adminMemberEnabled ? "pd_not_click_link" : "", "\" href=\"profile.php?action=show&username=").concat(userName2, "\" target=\"_blank\"></a>"));
          });
          $(".adp1:last > tbody > tr:gt(1) > td:last-child").each(function () {
            var $this2 = $(this);
            var matches = /\[(\d+)]板块/.exec($this2.text());
            if (matches) $this2.wrapInner("<a href=\"thread.php?fid=".concat(matches[1], "\" target=\"_blank\"></a>"));
          });
        } else if (/\/kf_fw_1wkfb\.php\?ping=8\b/.test(location.href)) {
          $(".adp1:last > tbody > tr:gt(1) > td:last-child").each(function () {
            var $this2 = $(this);
            $this2.html($this2.html().replace(/(管理|会员):([^\[\]]+)\]/g, "$1:<a class=\"".concat(!Config.adminMemberEnabled ? "pd_not_click_link" : "", "\" href=\"profile.php?action=show&username=$2\" target=\"_blank\">$2</a>]")).replace(/\[帖子:(\d+)\]/, "[\u5E16\u5B50:<a href=\"read.php?tid=$1\" target=\"_blank\">$1</a>]"));
          });
        } else if (/\/kf_fw_1wkfb\.php\?ping=9\b/.test(location.href)) {
          $(".adp1:last > tbody > tr:gt(2) > td:first-child").each(function () {
            var $this2 = $(this);
            $this2.html($this2.html().replace(/UID:(\d+)/, "UID:<a class=\"".concat(!Config.adminMemberEnabled ? "pd_not_click_link" : "", "\" href=\"profile.php?action=show&uid=$1\" target=\"_blank\">$1</a>")));
          });
        } else if (/\/kf_fw_1wkfb\.php\?do=2\b/.test(location.href)) {
          var $node1 = $(".adp1 > tbody > tr:nth-of-type(4):contains(\"\u8BC4\u5206\u4F1A\u5458\") > td:last-child");
          $node1.wrapInner("<a class=\"".concat(!Config.adminMemberEnabled ? "pd_not_click_link" : "", "\" href=\"profile.php?action=show&username=").concat($node1.text().trim(), "\" target=\"_blank\"></a>"));
          var $node2 = $(".adp1 > tbody > tr:nth-of-type(10) > td:last-child:contains(\"\u5F02\u8BAE\u63D0\u51FA\u4EBA\")");
          $node2.html($node2.html().replace(/：(\S+)/, "\uFF1A<a class=\"".concat(!Config.adminMemberEnabled ? "pd_not_click_link" : "", "\" href=\"profile.php?action=show&username=$1\" target=\"_blank\">$1</a>")));
        }
      };
      _handleGoodPostSubmit = function _handleGoodPostSubmit() {
        $('a[id^="cztz"]').attr("data-onclick", function () {
          return $(this).attr("onclick");
        }).removeAttr("onclick");
        $("#alldiv").on("click", 'a[onclick^="cztz"]', function () {
          var $this2 = $(this);
          var $floor = $this2.closest(".readtext");
          if ($this2.data("highlight")) {
            $floor.removeClass("pd_good_post_mark");
            $this2.removeData("highlight");
          } else {
            $floor.addClass("pd_good_post_mark");
            $this2.data("highlight", true);
          }
        }).on("click", 'a[id^="cztz"]', function () {
          var $this2 = $(this);
          if ($this2.data("wait")) return;
          var $floor = $this2.closest(".readtext");
          var url = $floor.find(".readidmsbottom, .readidmbottom").find('a[href^="profile.php?action=show"]').attr("href");
          var flag2 = false;
          $(".readidmsbottom, .readidmbottom").find("a[href=\"".concat(url, "\"]")).each(function () {
            var $currentFloor = $(this).closest(".readtext");
            if ($currentFloor.is($floor)) return;
            if ($currentFloor.find(".read_fds:contains(\"\u672C\u5E16\u4E3A\u4F18\u79C0\u5E16\")").length > 0) {
              flag2 = true;
              return false;
            }
          });
          if (flag2 && !confirm("\u5728\u5F53\u524D\u9875\u9762\u4E2D\u8BE5\u4F1A\u5458\u5DF2\u7ECF\u6709\u56DE\u5E16\u88AB\u8BC4\u4E3A\u4F18\u79C0\u5E16\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F")) return;
          var safeId3 = _getSafeId();
          var matches = /cztzyx\('(\d+)','(\d+|tpc)'\)/.exec($this2.data("onclick"));
          if (!matches || !safeId3) return;
          $this2.next(".pd_good_post_msg").remove();
          $this2.data("wait", true);
          $.ajax({
            type: "POST",
            url: "diy_read_cztz.php",
            data: "tid=".concat(matches[1], "&pid=").concat(matches[2], "&safeid=").concat(safeId3),
            timeout: Const_default.defAjaxTimeout
          }).done(function (html2) {
            if (/已将本帖操作为优秀帖|该楼层已经是优秀帖/.test(html2)) {
              var $content = $floor.find("> table > tbody > tr > td");
              if (!$content.find(".read_fds:contains(\"\u672C\u5E16\u4E3A\u4F18\u79C0\u5E16\")").length) {
                $content.find(".readidms, .readidm").after("<fieldset class=\"read_fds\"><legend>\u2193</legend>\u672C\u5E16\u4E3A\u4F18\u79C0\u5E16</fieldset>");
              }
            }
            if (!/已将本楼层提交为优秀帖申请/.test(html2)) {
              $floor.removeClass("pd_good_post_mark");
            }
            $this2.after("<span class=\"pd_good_post_msg\" style=\"margin-left: 5px; color: #777;\">(".concat(html2, ")</span>"));
          }).always(function () {
            return $this2.removeData("wait");
          });
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
  var exportModule = function exportModule() {
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
      var Conf = (init_Config(), __toCommonJS(Config_exports));
      Info_default.w.readConfig = Conf.read;
      Info_default.w.writeConfig = Conf.write;
    } catch (ex) {
      console.log(ex);
    }
  };
  var init4 = function init4() {
    var startDate = /* @__PURE__ */new Date();
    Info_default.version = version;
    if (!_getUidAndUserName()) return;
    _addPolyfill();
    exportModule();
    init3();
    _checkBrowserType();
    _modifyDomainTips();
    _appendCss();
    _addConfigAndLogDialogLink();
    if (Config.animationEffectOffEnabled) $.fx.off = true;
    if (Config.customScriptEnabled) _runCustomScript("start");
    _repairBbsErrorCode();
    window.addEventListener("beforeunload", _preventCloseWindowWhenActioning);
    _makeSearchByBelowTwoKeyWordAvailable();
    if (Config.addFastNavMenuEnabled) _addFastNavMenu();
    Info_default.$userMenu.find('a[href^="login.php?action=quit"]').click(function () {
      return confirm("\u662F\u5426\u9000\u51FA\u8D26\u53F7\uFF1F");
    });
    if (Config.changeNewTipsColorEnabled) _changeNewTipsColor();
    if (Info_default.isInHomePage) {
      if (Config.homePageThreadFastGotoLinkEnabled) _addThreadFastGotoLink();
    } else if (location.pathname === "/read.php") {
      if (Config.turnPageViaKeyboardEnabled) _turnPageViaKeyboard();
      _fastGotoFloor();
      _addFloorGotoLink();
      _adjustThreadContentFontSize();
      _showAttachImageOutsideSellBox();
      if (Config.parseMediaTagEnabled) _parseMediaTag();
      if (Config.modifyKfOtherDomainEnabled) _modifyKFOtherDomainLink();
      _addSignTips();
      if (Config.customMySmColor) _modifyMySmColor();
      if (Config.multiQuoteEnabled) _addMultiQuoteButton();
      _addFastGotoFloorInput();
      _handleBuyThreadBtn();
      _addCopyBuyersListOption();
      if (Config.autoReplaceManualOpenImgLinkEnabled) _replaceReadImage();
      if (Config.userMemoEnabled) _addUserMemo();
      _addCopyCodeLink();
      _addMoreSmileLink();
      _addRedundantKeywordWarning();
      if ($('a[href$="#install-script"]').length > 0) _handleInstallScriptLink();
      if (Config.preventCloseWindowWhenEditPostEnabled) _preventCloseWindowWhenEditPost();
      if (Config.autoSavePostContentWhenSubmitEnabled) _savePostContentWhenSubmit();
    } else if (location.pathname === "/thread.php") {
      if (Config.highlightNewPostEnabled) _highlightNewPost();
      if (Config.showFastGotoThreadPageEnabled) _addFastGotoThreadPageLink();
    } else if (location.pathname === "/post.php") {
      _addRedundantKeywordWarning();
      if (/\bmultiquote=1/i.test(location.href)) {
        if (Config.multiQuoteEnabled) _handleMultiQuote(2);
      } else if (/\baction=quote/i.test(location.href)) {
        _removeUnpairedBBCodeInQuoteContent();
      }
      _addFillTitleBtn();
      _addExtraPostEditorButton();
      _addExtraOptionInPostPage();
      if (Config.preventCloseWindowWhenEditPostEnabled) _preventCloseWindowWhenEditPost();
      if (Config.autoSavePostContentWhenSubmitEnabled) _savePostContentWhenSubmit();
      if (Info_default.isInSpecialDomain) _addAttachChangeAlert();
    } else if (location.pathname === "/kf_fw_ig_mybp.php") {
      init2();
    } else if (location.pathname === "/kf_fw_ig_shop.php") {
      _showMyInfoInItemShop();
      _showBuyItemTips();
    } else if (location.pathname === "/kf_fw_ig_pklist.php") {
      _addUserLinkInPkListPage();
    } else if (location.pathname === "/kf_fw_ig_halo.php") {
      $(".kf_fw_ig1:first").on("click", 'a[href^="kf_fw_ig_halo.php?do=buy&id="]', function () {
        if (!confirm("\u662F\u5426\u63D0\u5347\u6218\u529B\u5149\u73AF\uFF1F")) return false;
        _deleteValue(Const_default.haloInfoTmpLogName);
      });
      _addUserLinkInHaloPage();
    } else if (/\/hack\.php\?H_name=bank$/i.test(location.href)) {
      _handleBankPage();
    } else if (/\/message\.php\?action=read&mid=\d+/i.test(location.href)) {
      _addFastDrawMoneyLink();
      if (Config.modifyKfOtherDomainEnabled) _modifyKFOtherDomainLink();
    } else if (/\/message\.php($|\?action=receivebox)/i.test(location.href)) {
      _addMsgSelectButton();
    } else if (/\/profile\.php\?action=show/i.test(location.href)) {
      _handleProfilePage();
      _addFollowAndBlockAndMemoUserLink();
    } else if (/\/personal\.php\?action=post/i.test(location.href)) {
      if (Config.perPageFloorNum === 20) _modifyMyPostLink();
    } else if (location.pathname === "/kf_growup.php") {
      _addAutoChangeIdColorButton();
    } else if (location.pathname === "/guanjianci.php") {
      _highlightUnReadAtTipsMsg();
      if (Config.adminMemberEnabled) {
        _addGuanJianCiUserNameLink();
      }
    } else if (/\/profile\.php\?action=modify$/i.test(location.href)) {
      _syncModifyPerPageFloorNum();
      if (Info_default.isInSpecialDomain) _addAvatarChangeAlert();
    } else if (/\/job\.php\?action=preview$/i.test(location.href)) {
      _modifyPostPreviewPage();
    } else if (location.pathname === "/search.php") {
      if (Config.turnPageViaKeyboardEnabled) _turnPageViaKeyboard();
    } else if (location.pathname === "/kf_fw_1wkfb.php") {
      if (/\/kf_fw_1wkfb\.php\?ping=(2|4|7)\b/.test(location.href)) {
        _highlightRateErrorSize();
        if (/\/kf_fw_1wkfb\.php\?ping=2\b/.test(location.href)) {
          _refreshWaitCheckRatePage();
        }
      } else if (/\/kf_fw_1wkfb\.php\?do=1\b/.test(location.href)) {
        _addUnrecognizedSizeWarning();
        _showErrorSizeSubmitWarning();
      }
      _addLinksInPage();
    } else if (location.pathname === "/kf_no1.php") {
      _addUserNameLinkInRankPage();
    } else if (location.pathname === "/kf_fw_ig_index.php") {
      _init();
    }
    if (Config.blockUserEnabled) _blockUsers();
    if (Config.blockThreadEnabled) _blockThread();
    if (Config.followUserEnabled) _followUsers();
    if (Info_default.isMobile) _bindElementTitleClick();
    if (Info_default.isInSpecialDomain) {
      if (["/read.php", "/post.php", "/message.php"].includes(location.pathname)) {
        if (Config.kfSmileEnhanceExtensionEnabled) _importKfSmileEnhanceExtension();
        _replaceSiteLink();
      }
    }
    $(document).clearQueue("AutoAction");
    if (Config.autoPromoteHaloEnabled && !_getCookie(Const_default.promoteHaloCookieName)) {
      $(document).queue("AutoAction", function () {
        return _getPromoteHaloInfo2();
      });
    }
    if (Config.autoGetDailyBonusEnabled && !_getCookie(Const_default.getDailyBonusCookieName)) {
      $(document).queue("AutoAction", function () {
        return _getDailyBonus2();
      });
    }
    if ((Info_default.isInHomePage || location.pathname === "/kf_fw_ig_index.php") && Config.autoBuyItemEnabled && !_getCookie(Const_default.buyItemCookieName) && !_getCookie(Const_default.buyItemReadyCookieName)) {
      $(document).queue("AutoAction", function () {
        return _buyItems(Config.buyItemIdList);
      });
    }
    $(document).dequeue("AutoAction");
    if (Config.autoChangeIdColorEnabled && !_getCookie(Const_default.autoChangeIdColorCookieName)) {
      _changeIdColor();
    }
    if (Config.timingModeEnabled && (Info_default.isInHomePage || location.pathname === "/kf_fw_ig_index.php" || /kf_fw_ig_mybp\.php\?openboxes=true/.test(location.href))) {
      _startTimingMode();
    }
    if (Config.customScriptEnabled) _runCustomScript("end");
    var endDate = /* @__PURE__ */new Date();
    console.log("\u3010KF Online\u52A9\u624B\u3011\u521D\u59CB\u5316\u8017\u65F6\uFF1A".concat(endDate - startDate, "ms"));
  };
  if (typeof jQuery !== "undefined") {
    $(document).ready(init4);
  }
})();