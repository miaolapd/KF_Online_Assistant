(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _Info = require('./module/Info');

var _Info2 = _interopRequireDefault(_Info);

var _Config = require('./module/Config');

var _Util = require('./module/Util');

var Util = _interopRequireWildcard(_Util);

var _Const = require('./module/Const');

var _Const2 = _interopRequireDefault(_Const);

var _Msg = require('./module/Msg');

var Msg = _interopRequireWildcard(_Msg);

var _Dialog = require('./module/Dialog');

var Dialog = _interopRequireWildcard(_Dialog);

var _Log = require('./module/Log');

var Log = _interopRequireWildcard(_Log);

var _TmpLog = require('./module/TmpLog');

var TmpLog = _interopRequireWildcard(_TmpLog);

var _Script = require('./module/Script');

var Script = _interopRequireWildcard(_Script);

var _Public = require('./module/Public');

var Public = _interopRequireWildcard(_Public);

var _Index = require('./module/Index');

var Index = _interopRequireWildcard(_Index);

var _Read = require('./module/Read');

var Read = _interopRequireWildcard(_Read);

var _Post = require('./module/Post');

var Post = _interopRequireWildcard(_Post);

var _Other = require('./module/Other');

var Other = _interopRequireWildcard(_Other);

var _Bank = require('./module/Bank');

var Bank = _interopRequireWildcard(_Bank);

var _Item = require('./module/Item');

var Item = _interopRequireWildcard(_Item);

var _Loot = require('./module/Loot');

var Loot = _interopRequireWildcard(_Loot);

var _SelfRate = require('./module/SelfRate');

var SelfRate = _interopRequireWildcard(_SelfRate);

var _ConfigDialog = require('./module/ConfigDialog');

var ConfigDialog = _interopRequireWildcard(_ConfigDialog);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 版本号
var version = '14.3.3';

/**
 * 导出模块
 */
var exportModule = function exportModule() {
    try {
        _Info2.default.w.Info = require('./module/Info').default;
        _Info2.default.w.Util = require('./module/Util');
        _Info2.default.w.Const = require('./module/Const').default;
        _Info2.default.w.Msg = require('./module/Msg');
        _Info2.default.w.Dialog = require('./module/Dialog');
        _Info2.default.w.Log = require('./module/Log');
        _Info2.default.w.TmpLog = require('./module/TmpLog');
        _Info2.default.w.Public = require('./module/Public');
        _Info2.default.w.Index = require('./module/Index');
        _Info2.default.w.Read = require('./module/Read');
        _Info2.default.w.Post = require('./module/Post');
        _Info2.default.w.Other = require('./module/Other');
        _Info2.default.w.Bank = require('./module/Bank');
        _Info2.default.w.Item = require('./module/Item');
        _Info2.default.w.Loot = require('./module/Loot');
        _Info2.default.w.SelfRate = require('./module/SelfRate');
        _Info2.default.w.Script = require('./module/Script');
        var Conf = require('./module/Config');
        _Info2.default.w.readConfig = Conf.read;
        _Info2.default.w.writeConfig = Conf.write;
    } catch (ex) {
        console.log(ex);
    }
};

/**
 * 初始化
 */
var init = function init() {
    var startDate = new Date();
    //console.log('【KF Online助手】启动');
    _Info2.default.version = version;
    if (!Public.getUidAndUserName()) return;
    Public.addPolyfill();
    exportModule();
    (0, _Config.init)();
    Public.checkBrowserType();
    Public.modifyDomainTips();
    Public.appendCss();
    Public.addConfigAndLogDialogLink();
    if (Config.animationEffectOffEnabled) $.fx.off = true;

    if (Config.customScriptEnabled) Script.runCustomScript('start');
    Public.repairBbsErrorCode();
    window.addEventListener('beforeunload', Public.preventCloseWindowWhenActioning);
    //if (Config.showSearchLinkEnabled) Public.addSearchDialogLink(); //临时屏蔽
    //Public.bindSearchTypeSelectMenuClick(); //临时屏蔽
    Public.makeSearchByBelowTwoKeyWordAvailable();
    if (Config.addFastNavMenuEnabled) Public.addFastNavMenu();
    _Info2.default.$userMenu.find('a[href^="login.php?action=quit"]').click(function () {
        return confirm('是否退出账号？');
    });
    if (Config.changeNewTipsColorEnabled) Public.changeNewTipsColor();

    //Public.handleSideBarLink(); //临时屏蔽
    // if (parseInt(Util.getCookie(Const.lootCompleteCookieName)) === 2) {
    //     $('#pdLoot').addClass('pd_rightbox1_gray');
    // } //临时屏蔽

    if (_Info2.default.isInHomePage) {
        //if (Config.smLevelUpAlertEnabled) Index.smLevelUpAlert(); //临时屏蔽
        //if (Config.smRankChangeAlertEnabled) Index.smRankChangeAlert(); //临时屏蔽
        if (Config.homePageThreadFastGotoLinkEnabled) Index.addThreadFastGotoLink();
        //Index.addPromoteHaloInterval(); //临时屏蔽
    } else if (location.pathname === '/read.php') {
        if (Config.turnPageViaKeyboardEnabled) Public.turnPageViaKeyboard();
        Read.fastGotoFloor();
        Read.addFloorGotoLink();
        Read.adjustThreadContentFontSize();
        Read.showAttachImageOutsideSellBox();
        if (Config.parseMediaTagEnabled) Read.parseMediaTag();
        if (Config.modifyKfOtherDomainEnabled) Read.modifyKFOtherDomainLink();
        Read.addSignTips();
        if (Config.customMySmColor) Read.modifyMySmColor();
        if (Config.multiQuoteEnabled) Read.addMultiQuoteButton();
        Read.addFastGotoFloorInput();
        //Read.addStatAndBuyThreadBtn(); //临时屏蔽
        Read.handleBuyThreadBtn();
        Read.addCopyBuyersListOption();
        if (Config.userMemoEnabled) Read.addUserMemo();
        Read.addCopyCodeLink();
        Read.addMoreSmileLink();
        Post.addRedundantKeywordWarning();
        if ($('a[href$="#install-script"]').length > 0) Script.handleInstallScriptLink();
        if (Config.preventCloseWindowWhenEditPostEnabled) Post.preventCloseWindowWhenEditPost();
        if (Config.autoSavePostContentWhenSubmitEnabled) Post.savePostContentWhenSubmit();
        //SelfRate.handleGoodPostSubmit(); // 临时
    } else if (location.pathname === '/thread.php') {
        if (Config.highlightNewPostEnabled) Other.highlightNewPost();
        if (Config.showFastGotoThreadPageEnabled) Other.addFastGotoThreadPageLink();
    } else if (location.pathname === '/post.php') {
        Post.addRedundantKeywordWarning();
        if (/\bmultiquote=1/i.test(location.href)) {
            if (Config.multiQuoteEnabled) Post.handleMultiQuote(2);
        } else if (/\baction=quote/i.test(location.href)) {
            Post.removeUnpairedBBCodeInQuoteContent();
        }
        Post.addFillTitleBtn();
        Post.addExtraPostEditorButton();
        Post.addExtraOptionInPostPage();
        if (Config.preventCloseWindowWhenEditPostEnabled) Post.preventCloseWindowWhenEditPost();
        if (Config.autoSavePostContentWhenSubmitEnabled) Post.savePostContentWhenSubmit();
        if (_Info2.default.isInSpecialDomain) Post.addAttachChangeAlert();
    } else if (location.pathname === '/kf_fw_ig_mybp.php') {
        Item.init();
    } else if (location.pathname === '/kf_fw_ig_shop.php') {
        Item.showMyInfoInItemShop();
        Item.showBuyItemTips();
    } else if (location.pathname === '/kf_fw_ig_pklist.php') {
        Loot.addUserLinkInPkListPage();
    } else if (location.pathname === '/kf_fw_ig_halo.php') {
        $('.kf_fw_ig1:first').on('click', 'a[href^="kf_fw_ig_halo.php?do=buy&id="]', function () {
            if (!confirm('是否提升战力光环？')) return false;
            TmpLog.deleteValue(_Const2.default.haloInfoTmpLogName);
        });
        Loot.addUserLinkInHaloPage();
    } else if (/\/hack\.php\?H_name=bank$/i.test(location.href)) {
        Bank.handleBankPage();
    } else if (/\/message\.php\?action=read&mid=\d+/i.test(location.href)) {
        Other.addFastDrawMoneyLink();
        if (Config.modifyKfOtherDomainEnabled) Read.modifyKFOtherDomainLink();
    } else if (/\/message\.php($|\?action=receivebox)/i.test(location.href)) {
        Other.addMsgSelectButton();
    } else if (/\/profile\.php\?action=show/i.test(location.href)) {
        Other.handleProfilePage();
        Other.addFollowAndBlockAndMemoUserLink();
    } else if (/\/personal\.php\?action=post/i.test(location.href)) {
        if (Config.perPageFloorNum === 20) Other.modifyMyPostLink();
    } else if (location.pathname === '/kf_growup.php') {
        Other.addAutoChangeIdColorButton();
    } else if (location.pathname === '/guanjianci.php') {
        Other.highlightUnReadAtTipsMsg();
        if (Config.adminMemberEnabled) {
            Other.addGuanJianCiUserNameLink();
        }
    } else if (/\/profile\.php\?action=modify$/i.test(location.href)) {
        Other.syncModifyPerPageFloorNum();
        if (_Info2.default.isInSpecialDomain) Other.addAvatarChangeAlert();
    } else if (/\/job\.php\?action=preview$/i.test(location.href)) {
        Post.modifyPostPreviewPage();
    } else if (location.pathname === '/search.php') {
        if (Config.turnPageViaKeyboardEnabled) Public.turnPageViaKeyboard();
    } else if (location.pathname === '/kf_fw_1wkfb.php') {
        if (/\/kf_fw_1wkfb\.php\?ping=(2|4|7)\b/.test(location.href)) {
            SelfRate.highlightRateErrorSize();
            if (/\/kf_fw_1wkfb\.php\?ping=2\b/.test(location.href)) {
                SelfRate.refreshWaitCheckRatePage();
            }
        } else if (/\/kf_fw_1wkfb\.php\?do=1\b/.test(location.href)) {
            SelfRate.addUnrecognizedSizeWarning();
            SelfRate.showErrorSizeSubmitWarning();
        }
        SelfRate.addLinksInPage();
    } else if (location.pathname === '/kf_no1.php') {
        Other.addUserNameLinkInRankPage();
    } else if (location.pathname === '/kf_fw_ig_index.php') {
        Loot.init();
    }

    if (Config.blockUserEnabled) Public.blockUsers();
    if (Config.blockThreadEnabled) Public.blockThread();
    if (Config.followUserEnabled) Public.followUsers();
    if (_Info2.default.isMobile) Public.bindElementTitleClick();
    if (_Info2.default.isInSpecialDomain) {
        if (['/read.php', '/post.php', '/message.php'].includes(location.pathname)) {
            if (Config.kfSmileEnhanceExtensionEnabled) Post.importKfSmileEnhanceExtension();
            Post.replaceSiteLink();
        }
    }

    $(document).clearQueue('AutoAction');

    if (Config.autoPromoteHaloEnabled && !Util.getCookie(_Const2.default.promoteHaloCookieName)) {
        $(document).queue('AutoAction', function () {
            return Loot.getPromoteHaloInfo();
        });
    }

    if (Config.autoGetDailyBonusEnabled && !Util.getCookie(_Const2.default.getDailyBonusCookieName)) {
        $(document).queue('AutoAction', function () {
            return Public.getDailyBonus();
        });
    }

    if ((_Info2.default.isInHomePage || location.pathname === '/kf_fw_ig_index.php') && Config.autoBuyItemEnabled && !Util.getCookie(_Const2.default.buyItemCookieName) && !Util.getCookie(_Const2.default.buyItemReadyCookieName)) {
        $(document).queue('AutoAction', function () {
            return Item.buyItems(Config.buyItemIdList);
        });
    }

    $(document).dequeue('AutoAction');

    if (Config.autoChangeIdColorEnabled && !Util.getCookie(_Const2.default.autoChangeIdColorCookieName)) {
        Public.changeIdColor();
    }

    if (Config.timingModeEnabled && (_Info2.default.isInHomePage || location.pathname === '/kf_fw_ig_index.php' || /kf_fw_ig_mybp\.php\?openboxes=true/.test(location.href))) {
        Public.startTimingMode();
    }

    if (Config.customScriptEnabled) Script.runCustomScript('end');

    var endDate = new Date();
    console.log('\u3010KF Online\u52A9\u624B\u3011\u521D\u59CB\u5316\u8017\u65F6\uFF1A' + (endDate - startDate) + 'ms');
};

if (typeof jQuery !== 'undefined') {
    $(document).ready(init);
}

},{"./module/Bank":2,"./module/Config":3,"./module/ConfigDialog":4,"./module/Const":5,"./module/Dialog":6,"./module/Index":7,"./module/Info":8,"./module/Item":9,"./module/Log":10,"./module/Loot":12,"./module/Msg":13,"./module/Other":14,"./module/Post":15,"./module/Public":16,"./module/Read":17,"./module/Script":18,"./module/SelfRate":19,"./module/TmpLog":20,"./module/Util":21}],2:[function(require,module,exports){
/* 银行模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setNodeValue = exports.handleBankPage = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Msg = require('./Msg');

var Msg = _interopRequireWildcard(_Msg);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Log = require('./Log');

var Log = _interopRequireWildcard(_Log);

var _TmpLog = require('./TmpLog');

var TmpLog = _interopRequireWildcard(_TmpLog);

var _Public = require('./Public');

var Public = _interopRequireWildcard(_Public);

var _Script = require('./Script');

var Script = _interopRequireWildcard(_Script);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// 最低转账数额
var minTransferNum = 0;
// 最高转账数额
var maxTransferNum = Number.MAX_SAFE_INTEGER;

/**
 * 对银行页面元素进行处理
 */
var handleBankPage = exports.handleBankPage = function handleBankPage() {
    var $account = $('.bank1 > tbody > tr:nth-child(2) > td:contains("你所拥有的贡献：")');
    if (!$account.length) return;
    var html = $account.html();
    $account.html(html.replace(/你所拥有的贡献：(-?\d+(?:\.\d+)?)/, function (m, num) {
        return '\u4F60\u6240\u62E5\u6709\u7684\u8D21\u732E\uFF1A<b id="pdGongXian" data-num="' + num + '">' + parseFloat(num).toLocaleString() + '</b>';
    }));

    var matches = /注意你转账的是贡献，最小\[(\d+(?:\.\d+)?)\]，最大\[(\d+(?:\.\d+)?)\]/.exec(html);
    if (matches) {
        minTransferNum = parseFloat(matches[1]);
        maxTransferNum = parseFloat(matches[2]);
    }

    $(document).on('change', 'input[name="to_money"]', function () {
        var $this = $(this);
        var num = parseFloat($this.val());
        if (isNaN(num) || num < minTransferNum || num > maxTransferNum) {
            alert('\u8F6C\u8D26\u6570\u989D\u7684\u6700\u5C0F\u503C\u4E3A[' + minTransferNum + ']\uFF0C\u6700\u5927\u503C\u4E3A[' + maxTransferNum + ']\uFF0C\u8D85\u8FC7\u6700\u5927\u503C\u8BF7\u5206\u591A\u6B21\u8F6C\u8D26');
        }
    });

    addBatchTransferButton();
};

/**
 * 将指定账户金额节点设置为指定值
 * @param {jQuery} $node 账户金额节点
 * @param {number|string} value 数值（可设为相对值，如+=50、-=100）
 */
var setNodeValue = exports.setNodeValue = function setNodeValue($node, value) {
    if (!$node.length) return;
    var num = 0;
    if (!$.isNumeric(value)) {
        var matches = /(\+|-)=(\d+(?:\.\d+)?)/.exec(value);
        if (!matches) return;
        var diff = parseFloat(matches[2]);
        var oldNum = parseFloat($node.data('num'));
        oldNum = oldNum ? oldNum : 0;
        num = value.startsWith('+') ? oldNum + diff : oldNum - diff;
    } else {
        num = parseFloat(value);
    }
    $node.text(num.toLocaleString()).data('num', num);
};

/**
 * 批量转账
 * @param {Array} users 用户列表
 * @param {string} msg 转帐附言
 */
var batchTransfer = function batchTransfer(users, msg) {
    var successNum = 0,
        failNum = 0,
        successMoney = 0;

    $.each(users, function (index, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            userName = _ref2[0],
            money = _ref2[1];

        $(document).queue('Bank', function () {
            $.ajax({
                type: 'POST',
                url: 'hack.php?H_name=bank',
                timeout: _Const2.default.defAjaxTimeout,
                data: '&action=virement&pwuser=' + Util.getGBKEncodeString(userName) + '&to_money=' + money + '&memo=' + Util.getGBKEncodeString(msg),
                success: function success(html) {
                    Public.showFormatLog('批量转账', html);

                    var _Util$getResponseMsg = Util.getResponseMsg(html),
                        msg = _Util$getResponseMsg.msg;

                    var msgHtml = userName + ' <em>+' + money.toLocaleString() + '</em>';
                    if (/完成转帐!/.test(msg)) {
                        successNum++;
                        successMoney += money;
                    } else {
                        failNum++;
                        if (/用户<b>.+?<\/b>不存在/.test(msg)) msg = '用户不存在';
                        msgHtml += ' <span class="pd_notice">(\u9519\u8BEF\uFF1A' + msg + ')</span>';
                    }
                    $('.pd_result:last').append('<li>' + msgHtml + '</li>');
                },
                error: function error() {
                    failNum++;
                    $('.pd_result:last').append('\n<li>\n  ' + userName + ':' + money.toLocaleString() + '\n  <span class="pd_notice">(\u9519\u8BEF\uFF1A\u8FDE\u63A5\u8D85\u65F6\uFF0C\u8F6C\u8D26\u7ED3\u679C\u672A\u77E5\uFF0C\u8BF7\u5230<a target="_blank" href="hack.php?H_name=bank&action=log">\u94F6\u884C\u65E5\u5FD7</a>\u91CC\u8FDB\u884C\u786E\u8BA4)</span>\n</li>\n');
                },
                complete: function complete() {
                    var $countdown = $('.pd_countdown:last');
                    $countdown.text(parseInt($countdown.text()) - 1);
                    var isStop = $countdown.closest('.pd_msg').data('stop');
                    if (isStop) $(document).clearQueue('Bank');

                    if (isStop || index === users.length - 1) {
                        Msg.destroy();
                        if (successNum > 0) Log.push('批量转账', '\u5171\u6709`' + successNum + '`\u6B21\u8F6C\u8D26\u6210\u529F', { pay: { '贡献': -successMoney } });
                        setNodeValue($('#pdGongXian'), '-=' + successMoney);
                        console.log('\u5171\u6709' + successNum + '\u6B21\u8F6C\u8D26\u6210\u529F\uFF0C\u5171\u6709' + failNum + '\u6B21\u8F6C\u8D26\u5931\u8D25\uFF0C\u8D21\u732E-' + successMoney);
                        $('.pd_result:last').append('<li><b>\u5171\u6709<em>' + successNum + '</em>\u6B21\u8F6C\u8D26\u6210\u529F' + ((failNum > 0 ? '\uFF0C\u5171\u6709<em>' + failNum + '</em>\u6B21\u8F6C\u8D26\u5931\u8D25' : '') + '\uFF1A</b>\u8D21\u732E <ins>-' + successMoney.toLocaleString() + '</ins></li>'));
                        Msg.show('<strong>\u5171\u6709<em>' + successNum + '</em>\u6B21\u8F6C\u8D26\u6210\u529F' + ((failNum > 0 ? '\uFF0C\u5171\u6709<em>' + failNum + '</em>\u6B21\u8F6C\u8D26\u5931\u8D25' : '') + '</strong><i>\u8D21\u732E<ins>-' + successMoney.toLocaleString() + '</ins></i>'), -1);
                    } else {
                        setTimeout(function () {
                            return $(document).dequeue('Bank');
                        }, _Const2.default.bankActionInterval);
                    }
                }
            });
        });
    });

    $(document).dequeue('Bank');
};

/**
 * 验证批量转账的字段值是否正确
 * @param {jQuery} $transfer 批量转账区域对象
 * @returns {boolean} 是否正确
 */
var batchTransferVerify = function batchTransferVerify($transfer) {
    var $bankUsers = $transfer.find('[name="users"]');
    var users = $bankUsers.val();
    if (!/^\s*\S+\s*$/m.test(users) || /^\s*:/m.test(users) || /:/.test(users) && /:(\D|$)/m.test(users)) {
        alert('用户列表格式不正确');
        $bankUsers.select().focus();
        return false;
    }
    if (/^\s*\S+?:0*(\.0\d+)?\s*$/m.test(users)) {
        alert('\u8F6C\u5E10\u6570\u989D\u4E0D\u80FD\u5C0F\u4E8E[' + minTransferNum + ']\u8D21\u732E');
        $bankUsers.select().focus();
        return false;
    }
    var $bankMoney = $transfer.find('[name="transfer_money"]');
    var money = parseFloat($bankMoney.val());
    if (/^\s*[^:]+\s*$/m.test(users)) {
        if (!$.isNumeric(money)) {
            alert('通用转账数额格式不正确');
            $bankMoney.select().focus();
            return false;
        } else if (money < minTransferNum) {
            alert('\u8F6C\u5E10\u6570\u989D\u4E0D\u80FD\u5C0F\u4E8E' + minTransferNum + '\u8D21\u732E');
            $bankMoney.select().focus();
            return false;
        }
    }
    return true;
};

/**
 * 添加批量转账的按钮
 */
var addBatchTransferButton = function addBatchTransferButton() {
    var $area = $('\n<tr id="pdBankTransferArea">\n  <td style="vertical-align: top;">\n    \u4F7F\u7528\u8BF4\u660E\uFF1A<br>\u6BCF\u884C\u4E00\u540D\u7528\u6237\uFF0C<br>\u5982\u9700\u5355\u72EC\u8BBE\u5B9A\u8F6C\u8D26\u6570\u989D\uFF0C<br>\u53EF\u5199\u4E3A\u201C\u7528\u6237\u540D:\u8D21\u732E\u201D<br>\uFF08\u6CE8\u610F\u662F<b>\u82F1\u6587\u5192\u53F7</b>\uFF09<br>\u4F8B\u5B50\uFF1A<br>\n    <pre style="border: 1px solid #9999ff; padding: 5px;">\u5F20\u4E09\n\u674E\u56DB:0.1\n\u738B\u4E94:1.2\n\u4FE1\u4EF0\u98CE</pre>\n  </td>\n  <td>\n  <form>\n    <div style="display: inline-block;">\n      <label>\u7528\u6237\u5217\u8868\uFF1A<br>\n        <textarea class="pd_textarea" name="users" style="width: 270px; height: 250px;"></textarea>\n      </label>\n    </div>\n    <div style="display: inline-block; margin-left: 10px;">\n      <label>\u901A\u7528\u8F6C\u5E10\u6570\u989D\uFF08\u5982\u6240\u6709\u7528\u6237\u90FD\u5DF2\u8BBE\u5B9A\u5355\u72EC\u6570\u989D\u5219\u53EF\u7559\u7A7A\uFF09\uFF1A<br>\n        <input class="pd_input" name="transfer_money" type="text" style="width: 217px;">\n      </label><br>\n      <label style="margin-top: 5px;">\u8F6C\u5E10\u9644\u8A00\uFF08\u53EF\u7559\u7A7A\uFF09\uFF1A<br>\n        <textarea class="pd_textarea" name="msg" style="width: 225px; height: 206px;"></textarea>\n      </label>\n    </div>\n    <div>\n      <button type="submit">\u6279\u91CF\u8F6C\u8D26</button>\n      <button type="reset">\u91CD\u7F6E</button>\n      <button name="random" type="button" title="\u4E3A\u7528\u6237\u5217\u8868\u4E0A\u7684\u6BCF\u4E2A\u7528\u6237\u8BBE\u5B9A\u6307\u5B9A\u8303\u56F4\u5185\u7684\u968F\u673A\u6570\u989D">\u968F\u673A\u6570\u989D</button>\n      <br><span class="pd_highlight">\uFF08\u6CE8\u610F\uFF1A\u4F60\u8F6C\u7ED9\u5BF9\u65B9\u7684\u662F\u8D21\u732E\uFF0C\u6BCF\u540D\u7528\u6237\u7684\u8F6C\u8D26\u6570\u989D\u53EF\u8D85\u8FC7\u5355\u6B21\u8F6C\u8D26\u7684\u6700\u5927\u503C\uFF0C\u52A9\u624B\u4F1A\u81EA\u52A8\u5206\u591A\u6B21\u8F6C\u8D26\uFF09</span>\n      ' + (Util.isIE() || Util.isEdge() ? '<br><span class="pd_highlight">注：IE和Edge浏览器在批量转账给中文名用户时会出现乱码，请使用其它浏览器进行批量转账</span>' : '') + '\n    </div>\n  </form>\n  </td>\n</tr>\n').insertAfter('.bank1 > tbody > tr:nth-child(2)');

    $area.find('form').submit(function (e) {
        e.preventDefault();
        Msg.destroy();
        if (!batchTransferVerify($area)) return;

        var commonMoney = parseFloat($area.find('[name="transfer_money"]').val());
        if (!commonMoney) commonMoney = 0;
        var msg = $area.find('[name="msg"]').val();
        var users = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = $area.find('[name="users"]').val().split('\n')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var line = _step.value;

                line = $.trim(line);
                if (!line) continue;

                var userName = line;
                var strMoney = 0;
                if (line.includes(':')) {
                    var _line$split = line.split(':');

                    var _line$split2 = _slicedToArray(_line$split, 2);

                    userName = _line$split2[0];
                    strMoney = _line$split2[1];

                    userName = $.trim(userName);
                    if (typeof strMoney === 'undefined') continue;
                } else {
                    strMoney = commonMoney;
                }

                var money = parseFloat(strMoney);
                money = Math.floor(money * 10) / 10;
                if (money > maxTransferNum) {
                    var count = Math.floor(money * 10 / (maxTransferNum * 10));
                    var addNum = money * 10 % (maxTransferNum * 10) / 10;
                    for (var i = 1; i <= count; i++) {
                        users.push([userName, maxTransferNum]);
                    }
                    if (addNum >= 0.1) {
                        users.push([userName, addNum]);
                    }
                } else {
                    users.push([userName, money]);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        if (!users.length) return;

        var totalMoney = 0;
        var realUsers = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = users[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _step2$value = _slicedToArray(_step2.value, 2),
                    user = _step2$value[0],
                    _money = _step2$value[1];

                totalMoney += _money;
                if (!realUsers.includes(user)) {
                    realUsers.push(user);
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        var $gongXian = $('#pdGongXian');
        if ($gongXian.length > 0 && Math.floor(totalMoney * 10) > Math.floor(parseFloat($gongXian.data('num')) * 10)) {
            alert('\u4F60\u5F53\u524D\u6CA1\u6709[' + totalMoney.toLocaleString() + ']\u8D21\u732E\u53EF\u4F9B\u8F6C\u8D26');
            return;
        }
        if (!confirm('\u5171\u8BA1[' + realUsers.length + ']\u540D\u7528\u6237\uFF0C\u603B\u8BA1[' + totalMoney.toLocaleString() + ']\u8D21\u732E\uFF0C\u662F\u5426\u8F6C\u8D26\uFF1F')) return;
        if (totalMoney > maxTransferNum && !confirm('\u4F60\u771F\u7684\u8981\u8F6C\u8D26[' + totalMoney.toLocaleString() + ']\u8D21\u732E\uFF1F\u8BF7\u6CE8\u610F\u4F60\u8F6C\u7ED9\u5BF9\u65B9\u7684\u662F\u8D21\u732E\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F')) return;

        Msg.wait('<strong>\u6B63\u5728\u6279\u91CF\u8F6C\u8D26\u4E2D\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85&hellip;</strong><i>\u5269\u4F59\uFF1A<em class="pd_countdown">' + users.length + '</em></i>' + '<a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
        $area.find('> td:last-child').append('<ul class="pd_result pd_stat"><li><strong>转账结果：</strong></li></ul>');
        batchTransfer(users, msg);
    }).find('[name="random"]').click(function () {
        var userList = [];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = $area.find('[name="users"]').val().split('\n')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var line = _step3.value;

                line = $.trim(line);
                if (!line) continue;
                userList.push($.trim(line.split(':')[0]));
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        if (!userList.length) return;

        var range = prompt('设定随机数额的范围（注：最低转账数额为0.1贡献）', '0.1-1');
        if (range === null) return;
        range = $.trim(range);
        if (!/^\d+(?:\.\d+)?-\d+(?:\.\d+)?$/.test(range)) {
            alert('随机数额范围格式不正确');
            return;
        }
        var arr = range.split('-');
        var min = parseFloat(arr[0]),
            max = parseFloat(arr[1]);
        if (max < min) {
            alert('最大值不能低于最小值');
            return;
        }

        var content = '';
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = userList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var userName = _step4.value;

                content += userName + ':' + Math.floor((Math.random() * (max - min + 0.1) + min) * 10) / 10 + '\n';
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        $area.find('[name="users"]').val(content);
    });
};

},{"./Const":5,"./Log":10,"./Msg":13,"./Public":16,"./Script":18,"./TmpLog":20,"./Util":21}],3:[function(require,module,exports){
/* 配置模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clearData = exports.normalize = exports.changeStorageType = exports.clear = exports.write = exports.read = exports.init = exports.Config = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Log = require('./Log');

var Log = _interopRequireWildcard(_Log);

var _TmpLog = require('./TmpLog');

var TmpLog = _interopRequireWildcard(_TmpLog);

var _Item = require('./Item');

var Item = _interopRequireWildcard(_Item);

var _Read = require('./Read');

var Read = _interopRequireWildcard(_Read);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 保存设置的键值名称
var name = _Const2.default.storagePrefix + 'config';

/**
 * 配置类
 */
var Config = exports.Config = {
    // 是否开启定时模式，可按时进行自动操作（包括自动领取每日奖励、自动提升战力光环、自动争夺，需开启相关功能），只在论坛首页生效（不开启此模式的话只能在刷新页面后才会进行操作），true：开启；false：关闭
    timingModeEnabled: false,
    // 在首页的网页标题上显示定时模式提示的方案，auto：停留一分钟后显示；always：总是显示；never：不显示
    showTimingModeTipsType: 'auto',

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
    buyItemAfterTime: '00:40:00',

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
    customMySmColor: '',
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
    saveBuyThreadLogMaxNum: 2000,
    // 是否在撰写发帖内容时阻止关闭页面，true：开启；false：关闭
    preventCloseWindowWhenEditPostEnabled: true,
    // 是否在提交时自动保存发帖内容，以便在出现意外情况时能够恢复发帖内容，true：开启；false：关闭
    autoSavePostContentWhenSubmitEnabled: false,
    // 是否在发帖框上显示绯月表情增强插件（仅在miaola.work域名下生效），true：开启；false：关闭
    kfSmileEnhanceExtensionEnabled: false,

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
    customCssContent: '',
    // 是否执行自定义的脚本，true：开启；false：关闭
    customScriptEnabled: false,
    // 自定义脚本列表
    customScriptList: [],
    // 浏览器类型，auto：自动检测；desktop：桌面版；mobile：移动版
    browseType: 'auto',
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
    logSortType: 'time',
    // 日志统计范围类型，current：显示当天统计结果；custom：显示距该日N天内的统计结果；all：显示全部统计结果
    logStatType: 'current',
    // 显示距该日N天内的统计结果（用于日志统计范围）
    logStatDays: 7,

    // 是否自动更换ID颜色，true：开启；false：关闭
    autoChangeIdColorEnabled: false,
    // 自动更换ID颜色的更换顺序类型，random：随机；sequence：顺序
    autoChangeIdColorType: 'random',
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

/**
 * 初始化
 */
var init = exports.init = function init() {
    _Info2.default.w.Config = $.extend(true, {}, Config);
    if (typeof GM_getValue !== 'undefined') {
        _Info2.default.storageType = GM_getValue('StorageType');
        if (_Info2.default.storageType !== 'ByUid' && _Info2.default.storageType !== 'Global') _Info2.default.storageType = 'Default';
    }
    read();
};

/**
 * 读取设置
 */
var read = exports.read = function read() {
    var options = Util.readData(_Info2.default.storageType === 'ByUid' ? name + '_' + _Info2.default.uid : name);
    if (!options) return;
    try {
        options = JSON.parse(options);
    } catch (ex) {
        return;
    }
    if (!options || $.type(options) !== 'object' || $.isEmptyObject(options)) return;
    options = normalize(options);
    _Info2.default.w.Config = $.extend(true, {}, Config, options);
};

/**
 * 写入设置
 */
var write = exports.write = function write() {
    var options = Util.getDifferenceSetOfObject(Config, _Info2.default.w.Config);
    Util.writeData(_Info2.default.storageType === 'ByUid' ? name + '_' + _Info2.default.uid : name, JSON.stringify(options));
};

/**
 * 清空设置
 */
var clear = exports.clear = function clear() {
    return Util.deleteData(_Info2.default.storageType === 'ByUid' ? name + '_' + _Info2.default.uid : name);
};

/**
 * 更改存储类型
 * @param {string} storageType 要更改的存储类型
 */
var changeStorageType = exports.changeStorageType = function changeStorageType(storageType) {
    var log = Log.read();
    var tmpLog = TmpLog.read();
    var armsInfo = Item.readArmsInfo();
    var buyThreadLog = Read.readBuyThreadLog();
    _Info2.default.storageType = storageType;
    if (typeof GM_setValue !== 'undefined') GM_setValue('StorageType', _Info2.default.storageType);
    if (!Util.deepEqual(Config, _Info2.default.w.Config) || !$.isEmptyObject(log)) {
        if (confirm('是否将助手设置和日志转移到对应存储类型中？（对应存储类型中的数据将被覆盖）')) {
            write();
            Log.write(log);
            TmpLog.write(tmpLog);
            Item.writeArmsInfo(armsInfo);
            Read.writeBuyThreadLog(buyThreadLog);
        }
    }
};

/**
 * 获取经过规范化的Config对象
 * @param {{}} options 待处理的Config对象
 * @returns {{}} 经过规范化的Config对象
 */
var normalize = exports.normalize = function normalize(options) {
    var settings = {};
    if ($.type(options) !== 'object') return settings;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Util.entries(options)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                value = _step$value[1];

            if (key in Config && $.type(value) === $.type(Config[key])) {
                settings[key] = value;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return settings;
};

/**
 * 清除数据
 * @param {string} name 要清除的数据名称
 */
var clearData = exports.clearData = function clearData(name) {
    if (name === 'cookies') {
        for (var key in _Const2.default) {
            if (/CookieName$/.test(key)) {
                Util.deleteCookie(_Const2.default[key]);
            }
        }
    } else if (name === 'tmpData') {
        TmpLog.clear();
        localStorage.removeItem(_Const2.default.multiQuoteStorageName);
        localStorage.removeItem(_Const2.default.tempPointsLogListStorageName);
    } else if (name === 'config') {
        clear();
    } else if (name === 'log') {
        Log.clear();
    } else if (name === 'armsInfo') {
        Item.clearArmsInfo();
    } else if (name === 'buyThreadLog') {
        Read.clearBuyThreadLog();
    }
};

},{"./Const":5,"./Info":8,"./Item":9,"./Log":10,"./Read":17,"./TmpLog":20,"./Util":21}],4:[function(require,module,exports){
/* 设置对话框模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.show = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Dialog = require('./Dialog');

var Dialog = _interopRequireWildcard(_Dialog);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Config = require('./Config');

var _TmpLog = require('./TmpLog');

var TmpLog = _interopRequireWildcard(_TmpLog);

var _Public = require('./Public');

var Public = _interopRequireWildcard(_Public);

var _Script = require('./Script');

var Script = _interopRequireWildcard(_Script);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * 显示设置对话框
 */
var show = exports.show = function show() {
    var dialogName = 'pdConfigDialog';
    if ($('#' + dialogName).length > 0) return;
    (0, _Config.read)();
    Script.runFunc('ConfigDialog.show_before_');
    var html = '\n<div class="pd_cfg_main">\n  <div class="pd_cfg_nav">\n    <a class="pd_btn_link" data-name="openClearDataDialog" title="\u6E05\u9664\u4E0E\u52A9\u624B\u6709\u5173\u7684\u6570\u636E" href="#">\u6E05\u9664\u6570\u636E</a>\n    <a class="pd_btn_link" data-name="openRumCommandDialog" href="#">\u8FD0\u884C\u547D\u4EE4</a>\n    <a class="pd_btn_link" data-name="openImportOrExportSettingDialog" href="#">\u5BFC\u5165/\u5BFC\u51FA\u8BBE\u7F6E</a>\n  </div>\n\n  <div class="pd_cfg_panel" style="margin-bottom: 5px;">\n    <fieldset>\n      <legend>\n        <label>\n          <input name="timingModeEnabled" type="checkbox"> \u5B9A\u65F6\u6A21\u5F0F\n          <span class="pd_cfg_tips" title="\u53EF\u6309\u65F6\u8FDB\u884C\u81EA\u52A8\u64CD\u4F5C\uFF08\u5305\u62EC\u81EA\u52A8\u9886\u53D6\u6BCF\u65E5\u5956\u52B1\u3001\u81EA\u52A8\u63D0\u5347\u6218\u529B\u5149\u73AF\u3001\u81EA\u52A8\u4E89\u593A\u3001\u81EA\u52A8\u8D2D\u4E70\u7269\u54C1\uFF0C\u9700\u5F00\u542F\u76F8\u5173\u529F\u80FD\uFF09\n\u53EA\u5728\u8BBA\u575B\u9996\u9875\u548C\u4E89\u593A\u9996\u9875\u751F\u6548\uFF08\u4E0D\u5F00\u542F\u6B64\u6A21\u5F0F\u7684\u8BDD\u53EA\u80FD\u5728\u5237\u65B0\u9875\u9762\u540E\u624D\u4F1A\u8FDB\u884C\u64CD\u4F5C\uFF09">[?]</span>\n        </label>\n      </legend>\n      <label>\n        \u6807\u9898\u63D0\u793A\u65B9\u6848\n        <select name="showTimingModeTipsType">\n          <option value="auto">\u505C\u7559\u4E00\u5206\u949F\u540E\u663E\u793A</option>\n          <option value="always">\u603B\u662F\u663E\u793A</option>\n          <option value="never">\u4E0D\u663E\u793A</option>\n        </select>\n        <span class="pd_cfg_tips" title="\u5728\u9996\u9875\u7684\u7F51\u9875\u6807\u9898\u4E0A\u663E\u793A\u5B9A\u65F6\u6A21\u5F0F\u63D0\u793A\u7684\u65B9\u6848">[?]</span>\n      </label>\n    </fieldset>\n    <fieldset>\n      <legend>\n        <label>\u81EA\u52A8\u9886\u53D6\u6BCF\u65E5\u5956\u52B1</label>\n      </legend>\n      <label>\n        <input name="autoGetDailyBonusEnabled" type="checkbox"> \u81EA\u52A8\u9886\u53D6\u6BCF\u65E5\u5956\u52B1\n        <span class="pd_cfg_tips" title="\u6BCF\u5929\u81EA\u52A8\u9886\u53D6\u6BCF\u65E5\u5956\u52B1">[?]</span>\n      </label>\n    </fieldset>\n    <fieldset>\n      <legend>\n        <label><input name="autoPromoteHaloEnabled" type="checkbox"> \u81EA\u52A8\u63D0\u5347\u6218\u529B\u5149\u73AF</label>\n      </legend>\n      <label>\n        \u82B1\u8D39\n        <select name="promoteHaloCostType" required>\n          <option value="1">100KFB</option>\n          <option value="2">1000KFB</option>\n          <option value="11">0.2\u8D21\u732E</option>\n          <option value="12">2\u8D21\u732E</option>\n        </select>\n        <span class="pd_cfg_tips" title="\u63D0\u5347\u6218\u529B\u5149\u73AF\u7684\u82B1\u8D39\u7C7B\u578B">[?]</span>\n      </label>\n      <label class="pd_cfg_ml">\n         \u9AD8\u4E8E <input name="promoteHaloLimit" type="number" min="0" step="0.1" style="width: 55px;" required>\n         <span data-id="promoteHaloLimitUnit">KFB</span>\u65F6\n         <span class="pd_cfg_tips" title="\u5728\u64CD\u4F5C\u540E\u6240\u5269\u4F59\u7684KFB\u6216\u8D21\u732E\u9AD8\u4E8E\u6307\u5B9A\u503C\u65F6\u624D\u81EA\u52A8\u63D0\u5347\u6218\u529B\u5149\u73AF\uFF0C\u8BBE\u4E3A0\u8868\u793A\u4E0D\u9650\u5236">[?]</span>\n      </label><br>\n      <label>\n        \u6BCF\u9694 <input name="promoteHaloInterval" type="number" min="8" style="width: 40px;" required> \u5C0F\u65F6\n        <span class="pd_cfg_tips" title="\u81EA\u52A8\u63D0\u5347\u6218\u529B\u5149\u73AF\u7684\u95F4\u9694\u65F6\u95F4\uFF0C\u6700\u4F4E\u503C\uFF1A8\u5C0F\u65F6">[?]</span>\n      </label>\n      <label class="pd_cfg_ml">\n        <input name="promoteHaloAutoIntervalEnabled" type="checkbox" data-mutex="[name=promoteHaloInterval]"> \u81EA\u52A8\u5224\u65AD\n        <span class="pd_cfg_tips" title="\u81EA\u52A8\u5224\u65AD\u63D0\u5347\u6218\u529B\u5149\u73AF\u7684\u95F4\u9694\u65F6\u95F4\uFF08\u5728\u6709\u5269\u4F59\u6B21\u6570\u65F6\u5C3D\u53EF\u80FD\u4F7F\u7528\uFF09">[?]</span>\n      </label>\n    </fieldset>\n    <fieldset>\n      <legend>\n        <label><input name="autoBuyItemEnabled" type="checkbox"> \u81EA\u52A8\u8D2D\u4E70\u7269\u54C1</label>\n      </legend>\n      <label>\n        \u7269\u54C1ID\u5217\u8868 <input name="buyItemIdList" type="text" maxlength="50" style="width: 150px;">\n      </label>\n      <a class="pd_cfg_ml" data-name="openBuyItemTipsDialog" href="#">\u8BE6\u7EC6\u8BF4\u660E&raquo;</a><br>\n      <label>\n        \u5728 <input name="buyItemAfterTime" type="text" maxlength="8" style="width: 55px;" required> \u4E4B\u540E\u8D2D\u4E70\u7269\u54C1\n        <span class="pd_cfg_tips" title="\u5728\u5F53\u5929\u7684\u6307\u5B9A\u65F6\u95F4\u4E4B\u540E\u8D2D\u4E70\u7269\u54C1\uFF08\u672C\u5730\u65F6\u95F4\uFF09\uFF0C\u4F8B\uFF1A00:40:00\uFF08\u6CE8\uFF1A\u8BF7\u4E0D\u8981\u8BBE\u7F6E\u4E3A\u572800:25:00\u4E4B\u524D\u7684\u65F6\u95F4\uFF09">[?]</span>\n      </label>\n    </fieldset>\n    <fieldset>\n      <legend>\u9996\u9875\u76F8\u5173</legend>\n      <label hidden>\n        <input name="smLevelUpAlertEnabled" type="checkbox"> \u795E\u79D8\u7B49\u7EA7\u5347\u7EA7\u63D0\u9192\n        <span class="pd_cfg_tips" title="\u5728\u795E\u79D8\u7B49\u7EA7\u5347\u7EA7\u540E\u8FDB\u884C\u63D0\u9192\uFF0C\u53EA\u5728\u9996\u9875\u751F\u6548">[?]</span>\n      </label>\n      <label class="pd_cfg_ml" hidden>\n        <input name="smRankChangeAlertEnabled" type="checkbox"> \u7CFB\u6570\u6392\u540D\u53D8\u5316\u63D0\u9192\n        <span class="pd_cfg_tips" title="\u5728\u795E\u79D8\u7CFB\u6570\u6392\u540D\u53D1\u751F\u53D8\u5316\u65F6\u8FDB\u884C\u63D0\u9192\uFF0C\u53EA\u5728\u9996\u9875\u751F\u6548">[?]</span>\n      </label><br hidden>\n      <label>\n        <input name="homePageThreadFastGotoLinkEnabled" type="checkbox"> \u4E3A\u9996\u9875\u5E16\u5B50\u52A0\u4E0A\u8DF3\u8F6C\u81F3\u9875\u672B\u94FE\u63A5\n        <span class="pd_cfg_tips" title="\u5F00\u542F\u6B64\u529F\u80FD\u540E\uFF0C\u70B9\u51FB\u9996\u9875\u5E16\u5B50\u94FE\u63A5\u53F3\u4FA7\u7684\u56DE\u590D\u65F6\u95F4\u90E8\u5206\u5373\u53EF\u5FEB\u901F\u8DF3\u8F6C\u81F3\u5E16\u5B50\u9875\u672B">[?]</span>\n      </label>\n    </fieldset>\n    <fieldset>\n      <legend>\u7248\u5757\u9875\u9762\u76F8\u5173</legend>\n      <label>\n        <input name="showFastGotoThreadPageEnabled" type="checkbox" data-disabled="[name=maxFastGotoThreadPageNum]"> \u663E\u793A\u5E16\u5B50\u9875\u6570\u5FEB\u6377\u94FE\u63A5\n        <span class="pd_cfg_tips" title="\u5728\u7248\u5757\u9875\u9762\u4E2D\u663E\u793A\u5E16\u5B50\u9875\u6570\u5FEB\u6377\u94FE\u63A5">[?]</span>\n      </label>\n      <label class="pd_cfg_ml">\n        \u9875\u6570\u94FE\u63A5\u6700\u5927\u6570\u91CF <input name="maxFastGotoThreadPageNum" type="number" min="1" max="10" style="width: 40px;" required>\n        <span class="pd_cfg_tips" title="\u5728\u5E16\u5B50\u9875\u6570\u5FEB\u6377\u94FE\u63A5\u4E2D\u663E\u793A\u9875\u6570\u94FE\u63A5\u7684\u6700\u5927\u6570\u91CF">[?]</span>\n      </label><br>\n      <label>\n        <input name="highlightNewPostEnabled" type="checkbox"> \u9AD8\u4EAE\u4ECA\u65E5\u7684\u65B0\u5E16\n        <span class="pd_cfg_tips" title="\u5728\u7248\u5757\u9875\u9762\u4E2D\u9AD8\u4EAE\u4ECA\u65E5\u65B0\u53D1\u8868\u5E16\u5B50\u7684\u53D1\u8868\u65F6\u95F4">[?]</span>\n      </label>\n    </fieldset>\n    <fieldset>\n      <legend>\u5173\u6CE8\u548C\u5C4F\u853D</legend>\n      <label>\n        <input name="followUserEnabled" type="checkbox" data-disabled="[data-name=openFollowUserDialog]"> \u5173\u6CE8\u7528\u6237\n        <span class="pd_cfg_tips" title="\u5F00\u542F\u5173\u6CE8\u7528\u6237\u7684\u529F\u80FD\uFF0C\u6240\u5173\u6CE8\u7684\u7528\u6237\u5C06\u88AB\u52A0\u6CE8\u8BB0\u53F7\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u7BA1\u7406\u5173\u6CE8\u7528\u6237">[?]</span>\n      </label>\n      <a class="pd_cfg_ml" data-name="openFollowUserDialog" href="#">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n      <label>\n        <input name="blockUserEnabled" type="checkbox" data-disabled="[data-name=openBlockUserDialog]"> \u5C4F\u853D\u7528\u6237\n        <span class="pd_cfg_tips" title="\u5F00\u542F\u5C4F\u853D\u7528\u6237\u7684\u529F\u80FD\uFF0C\u4F60\u5C06\u770B\u4E0D\u89C1\u6240\u5C4F\u853D\u7528\u6237\u7684\u53D1\u8A00\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u7BA1\u7406\u5C4F\u853D\u7528\u6237">[?]</span>\n      </label>\n      <a class="pd_cfg_ml" data-name="openBlockUserDialog" href="#">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n      <label>\n        <input name="blockThreadEnabled" type="checkbox" data-disabled="[data-name=openBlockThreadDialog]"> \u5C4F\u853D\u5E16\u5B50\n        <span class="pd_cfg_tips" title="\u5F00\u542F\u5C4F\u853D\u6807\u9898\u4E2D\u5305\u542B\u6307\u5B9A\u5173\u952E\u5B57\u7684\u5E16\u5B50\u7684\u529F\u80FD\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u7BA1\u7406\u5C4F\u853D\u5173\u952E\u5B57">[?]</span>\n      </label>\n      <a class="pd_cfg_ml" data-name="openBlockThreadDialog" href="#">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n    </fieldset>\n  </div>\n\n  <div class="pd_cfg_panel">\n    <fieldset>\n      <legend>\u5E16\u5B50\u9875\u9762\u76F8\u5173</legend>\n      <label>\n        \u5E16\u5B50\u6BCF\u9875\u697C\u5C42\u6570\u91CF\n        <select name="perPageFloorNum">\n          <option value="10">10</option>\n          <option value="20">20</option>\n          <option value="30">30</option>\n        </select>\n        <span class="pd_cfg_tips" title="\u7528\u4E8E\u7535\u68AF\u76F4\u8FBE\u548C\u5E16\u5B50\u9875\u6570\u5FEB\u6377\u94FE\u63A5\u7B49\u529F\u80FD\uFF0C\u5982\u679C\u4FEE\u6539\u4E86\u8BBA\u575B\u8BBE\u7F6E\u91CC\u7684\u201C\u6587\u7AE0\u5217\u8868\u6BCF\u9875\u4E2A\u6570\u201D\uFF0C\u8BF7\u5728\u6B64\u4FEE\u6539\u6210\u76F8\u540C\u7684\u6570\u76EE">[?]</span>\n      </label>\n      <label class="pd_cfg_ml">\n        \u5E16\u5B50\u5185\u5BB9\u5B57\u4F53\u5927\u5C0F <input name="threadContentFontSize" type="number" min="7" max="72" style="width: 40px;"> px\n        <span class="pd_cfg_tips" title="\u5E16\u5B50\u5185\u5BB9\u5B57\u4F53\u5927\u5C0F\uFF0C\u7559\u7A7A\u8868\u793A\u4F7F\u7528\u9ED8\u8BA4\u5927\u5C0F\uFF0C\u63A8\u8350\u503C\uFF1A14">[?]</span>\n      </label><br>\n      <label>\n        <input name="turnPageViaKeyboardEnabled" type="checkbox"> \u901A\u8FC7\u5DE6\u53F3\u952E\u7FFB\u9875\n        <span class="pd_cfg_tips" title="\u5728\u5E16\u5B50\u548C\u641C\u7D22\u9875\u9762\u901A\u8FC7\u5DE6\u53F3\u952E\u8FDB\u884C\u7FFB\u9875">[?]</span>\n      </label>\n      <label class="pd_cfg_ml">\n        <input name="kfSmileEnhanceExtensionEnabled" type="checkbox" ' + (_Info2.default.isInSpecialDomain ? '' : 'disabled') + '> \u5F00\u542F\u7EEF\u6708\u8868\u60C5\u589E\u5F3A\u63D2\u4EF6\n        <span class="pd_cfg_tips" title="\u5728\u53D1\u5E16\u6846\u4E0A\u663E\u793A\u7EEF\u6708\u8868\u60C5\u589E\u5F3A\u63D2\u4EF6\uFF08\u4EC5\u5728miaola.work\u57DF\u540D\u4E0B\u751F\u6548\uFF09">[?]</span>\n      </label><br>\n      <label>\n        <input name="autoChangeIdColorEnabled" type="checkbox" data-disabled="[data-name=openAutoChangeSmColorPage]"> \u81EA\u52A8\u66F4\u6362ID\u989C\u8272\n        <span class="pd_cfg_tips" title="\u53EF\u81EA\u52A8\u66F4\u6362ID\u989C\u8272\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u524D\u5F80\u76F8\u5E94\u9875\u9762\u8FDB\u884C\u81EA\u5B9A\u4E49\u8BBE\u7F6E">[?]</span>\n      </label>\n      <a data-name="openAutoChangeSmColorPage" class="pd_cfg_ml" target="_blank" href="kf_growup.php">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n      <label>\n        \u81EA\u5B9A\u4E49\u672C\u4EBA\u7684\u795E\u79D8\u989C\u8272 <input name="customMySmColor" maxlength="7" style="width: 50px;" type="text">\n        <input style="margin-left: 0;" type="color" data-name="customMySmColorSelect">\n        <span class="pd_cfg_tips" title="\u81EA\u5B9A\u4E49\u672C\u4EBA\u7684\u795E\u79D8\u989C\u8272\uFF08\u5305\u62EC\u5E16\u5B50\u9875\u9762\u7684ID\u663E\u793A\u989C\u8272\u548C\u697C\u5C42\u8FB9\u6846\u989C\u8272\uFF0C\u4EC5\u81EA\u5DF1\u53EF\u89C1\uFF09\uFF0C\u4F8B\uFF1A#009cff\uFF0C\u5982\u65E0\u9700\u6C42\u53EF\u7559\u7A7A">[?]</span>\n      </label><br>\n      <label>\n        <input name="userMemoEnabled" type="checkbox" data-disabled="[data-name=openUserMemoDialog]"> \u663E\u793A\u7528\u6237\u5907\u6CE8\n        <span class="pd_cfg_tips" title="\u5728\u697C\u5C42\u5185\u7684\u7528\u6237\u540D\u65C1\u663E\u793A\u8BE5\u7528\u6237\u7684\u81EA\u5B9A\u4E49\u5907\u6CE8\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u81EA\u5B9A\u4E49\u7528\u6237\u5907\u6CE8">[?]</span>\n      </label>\n      <a class="pd_cfg_ml" data-name="openUserMemoDialog" href="#">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n      <label>\n        <input name="modifyKfOtherDomainEnabled" type="checkbox"> \u5C06\u7EEF\u6708\u5176\u5B83\u57DF\u540D\u7684\u94FE\u63A5\u4FEE\u6539\u4E3A\u5F53\u524D\u57DF\u540D\n        <span class="pd_cfg_tips" title="\u5C06\u5E16\u5B50\u548C\u77ED\u6D88\u606F\u4E2D\u7684\u7EEF\u6708\u5176\u5B83\u57DF\u540D\u7684\u94FE\u63A5\u4FEE\u6539\u4E3A\u5F53\u524D\u57DF\u540D">[?]</span>\n      </label><br>\n      <label>\n        <input name="multiQuoteEnabled" type="checkbox"> \u5F00\u542F\u591A\u91CD\u5F15\u7528\u529F\u80FD\n        <span class="pd_cfg_tips" title="\u5728\u5E16\u5B50\u9875\u9762\u5F00\u542F\u591A\u91CD\u56DE\u590D\u548C\u591A\u91CD\u5F15\u7528\u529F\u80FD">[?]</span>\n      </label>\n      <label class="pd_cfg_ml">\n        <input name="parseMediaTagEnabled" type="checkbox"> \u89E3\u6790\u591A\u5A92\u4F53\u6807\u7B7E\n        <span class="pd_cfg_tips" title="\u5728\u5E16\u5B50\u9875\u9762\u89E3\u6790HTML5\u591A\u5A92\u4F53\u6807\u7B7E\uFF0C\u8BE6\u89C1\u3010\u5E38\u89C1\u95EE\u989812\u3011">[?]</span>\n      </label><br>\n      <label>\n        <input name="buyThreadNoJumpEnabled" type="checkbox" data-disabled="[name=saveBuyThreadLogEnabled]" data-mutex="true"> \u8D2D\u4E70\u5E16\u5B50\u65F6\u4E0D\u8DF3\u8F6C\n        <span class="pd_cfg_tips" title="\u4F7F\u7528Ajax\u7684\u65B9\u5F0F\u8D2D\u4E70\u5E16\u5B50\uFF0C\u8D2D\u4E70\u65F6\u9875\u9762\u4E0D\u4F1A\u8DF3\u8F6C">[?]</span>\n      </label>\n      <label class="pd_cfg_ml">\n        <input name="saveBuyThreadLogEnabled" type="checkbox"> \u4FDD\u5B58\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55\n        <span class="pd_cfg_tips" title="\u81EA\u52A8\u4FDD\u5B58\u8D2D\u4E70\u5E16\u5B50\u7684\u8BB0\u5F55\uFF0C\u53EF\u5728\u52A9\u624B\u65E5\u5FD7\u6216\u8D2D\u4E70\u4EBA\u540D\u5355\u91CC\u70B9\u51FB\u67E5\u770B\u8D2D\u4E70\u8BB0\u5F55\uFF08\u9700\u540C\u65F6\u5F00\u542F\u201C\u8D2D\u4E70\u5E16\u5B50\u65F6\u4E0D\u8DF3\u8F6C\u201D\u7684\u529F\u80FD\uFF09">[?]</span>\n      </label><br>\n      <label>\n        <input name="preventCloseWindowWhenEditPostEnabled" type="checkbox"> \u5199\u5E16\u5B50\u65F6\u963B\u6B62\u5173\u95ED\u9875\u9762\n        <span class="pd_cfg_tips" title="\u5728\u64B0\u5199\u53D1\u5E16\u5185\u5BB9\u65F6\uFF0C\u5982\u4E0D\u5C0F\u5FC3\u5173\u95ED\u4E86\u9875\u9762\u4F1A\u8FDB\u884C\u63D0\u793A">[?]</span>\n      </label>\n      <label class="pd_cfg_ml">\n        <input name="autoSavePostContentWhenSubmitEnabled" type="checkbox"> \u63D0\u4EA4\u65F6\u4FDD\u5B58\u53D1\u5E16\u5185\u5BB9\n        <span class="pd_cfg_tips" title="\u5728\u63D0\u4EA4\u65F6\u81EA\u52A8\u4FDD\u5B58\u53D1\u5E16\u5185\u5BB9\uFF0C\u4EE5\u4FBF\u5728\u51FA\u73B0\u610F\u5916\u60C5\u51B5\u65F6\u80FD\u591F\u6062\u590D\u53D1\u5E16\u5185\u5BB9\uFF08\u9700\u5728\u4E0D\u5173\u95ED\u5F53\u524D\u6807\u7B7E\u9875\u7684\u60C5\u51B5\u4E0B\u624D\u80FD\u8D77\u6548\uFF09">[?]</span>\n      </label>\n    </fieldset>\n    <fieldset>\n      <legend>\u5176\u5B83\u8BBE\u7F6E</legend>\n      <label class="pd_highlight">\n        \u5B58\u50A8\u7C7B\u578B\n        <select data-name="storageType">\n          <option value="Default">\u9ED8\u8BA4</option>\n          <option value="ByUid">\u6309uid</option>\n          <option value="Global">\u5168\u5C40</option>\n        </select>\n        <span class="pd_cfg_tips" title="\u52A9\u624B\u8BBE\u7F6E\u548C\u65E5\u5FD7\u7684\u5B58\u50A8\u65B9\u5F0F\uFF0C\u8BE6\u60C5\u53C2\u89C1\u3010\u5E38\u89C1\u95EE\u98981\u3011">[?]</span>\n      </label>\n      <label class="pd_cfg_ml">\n        \u6D4F\u89C8\u5668\u7C7B\u578B\n        <select name="browseType">\n          <option value="auto">\u81EA\u52A8\u68C0\u6D4B</option>\n          <option value="desktop">\u684C\u9762\u7248</option>\n          <option value="mobile">\u79FB\u52A8\u7248</option>\n        </select>\n        <span class="pd_cfg_tips" title="\u7528\u4E8E\u5728KFOL\u52A9\u624B\u4E0A\u5224\u65AD\u6D4F\u89C8\u5668\u7684\u7C7B\u578B\uFF0C\u4E00\u822C\u4F7F\u7528\u81EA\u52A8\u68C0\u6D4B\u5373\u53EF\uFF1B\n\u5982\u679C\u5F53\u524D\u6D4F\u89C8\u5668\u4E0E\u81EA\u52A8\u68C0\u6D4B\u7684\u7C7B\u578B\u4E0D\u76F8\u7B26\uFF08\u79FB\u52A8\u7248\u4F1A\u5728\u8BBE\u7F6E\u754C\u9762\u6807\u9898\u4E0A\u663E\u793A\u201CFor Mobile\u201D\u7684\u5B57\u6837\uFF09\uFF0C\u8BF7\u624B\u52A8\u8BBE\u7F6E\u4E3A\u6B63\u786E\u7684\u7C7B\u578B">[?]</span>\n      </label><br>\n      <label>\n        \u6D88\u606F\u663E\u793A\u65F6\u95F4 <input name="defShowMsgDuration" type="number" min="-1" style="width: 46px;" required> \u79D2\n        <span class="pd_cfg_tips" title="\u9ED8\u8BA4\u7684\u6D88\u606F\u663E\u793A\u65F6\u95F4\uFF08\u79D2\uFF09\uFF0C\u8BBE\u7F6E\u4E3A-1\u8868\u793A\u6C38\u4E45\u663E\u793A\uFF0C\u4F8B\uFF1A15\uFF08\u9ED8\u8BA4\u503C\uFF1A-1\uFF09">[?]</span>\n      </label>\n      <label class="pd_cfg_ml">\n        \u65E5\u5FD7\u4FDD\u5B58\u5929\u6570 <input name="logSaveDays" type="number" min="1" max="270" style="width: 46px;" required>\n        <span class="pd_cfg_tips" title="\u65E5\u5FD7\u4FDD\u5B58\u5929\u6570\uFF0C\u9ED8\u8BA4\u503C\uFF1A' + _Config.Config.logSaveDays + '\uFF0C\u6700\u5927\u503C\uFF1A270">[?]</span>\n      </label><br>\n      <label>\n        <input name="showSearchLinkEnabled" type="checkbox"> \u663E\u793A\u641C\u7D22\u94FE\u63A5\n        <span class="pd_cfg_tips" title="\u5728\u7528\u6237\u83DC\u5355\u4E0A\u663E\u793A\u641C\u7D22\u5BF9\u8BDD\u6846\u7684\u94FE\u63A5">[?]</span>\n      </label>\n      <label class="pd_cfg_ml">\n        <input name="animationEffectOffEnabled" type="checkbox"> \u7981\u7528\u52A8\u753B\u6548\u679C\n        <span class="pd_cfg_tips" title="\u7981\u7528jQuery\u7684\u52A8\u753B\u6548\u679C\uFF08\u63A8\u8350\u5728\u914D\u7F6E\u8F83\u5DEE\u7684\u673A\u5668\u4E0A\u4F7F\u7528\uFF09">[?]</span>\n      </label><br>\n      <label>\n        <input name="addFastNavMenuEnabled" type="checkbox"> \u6DFB\u52A0\u5FEB\u6377\u5BFC\u822A\u83DC\u5355\n        <span class="pd_cfg_tips" title="\u4E3A\u9876\u90E8\u5BFC\u822A\u680F\u6DFB\u52A0\u5FEB\u6377\u5BFC\u822A\u83DC\u5355">[?]</span>\n      </label>\n      <label class="pd_cfg_ml">\n        <input name="changeNewTipsColorEnabled" type="checkbox"> \u4FEE\u6539\u65B0\u63D0\u9192\u989C\u8272\n        <span class="pd_cfg_tips" title="\u4FEE\u6539\u9876\u90E8\u7528\u6237\u83DC\u5355\u7684\u65B0\u63D0\u9192\u7684\u989C\u8272\uFF0C\u53EF\u6839\u636E\u4E0D\u540C\u7684\u6D88\u606F\u63D0\u9192\uFF08\u65B0\u77ED\u4FE1\u3001\u65B0\u56DE\u590D\u3001\u65B0\u8BC4\u5206\uFF09\uFF0C\u5206\u522B\u8BBE\u5B9A\u4E0D\u540C\u7684\u989C\u8272">[?]</span>\n      </label><br>\n      <label>\n        <input name="customCssEnabled" type="checkbox" data-disabled="[data-name=openCustomCssDialog]"> \u6DFB\u52A0\u81EA\u5B9A\u4E49CSS\n        <span class="pd_cfg_tips" title="\u4E3A\u9875\u9762\u6DFB\u52A0\u81EA\u5B9A\u4E49\u7684CSS\u5185\u5BB9\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u586B\u5165\u81EA\u5B9A\u4E49\u7684CSS\u5185\u5BB9">[?]</span>\n      </label>\n      <a class="pd_cfg_ml" data-name="openCustomCssDialog" href="#">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n      <label>\n        <input name="customScriptEnabled" type="checkbox" data-disabled="[data-name=openCustomScriptDialog]"> \u6267\u884C\u81EA\u5B9A\u4E49\u811A\u672C\n        <span class="pd_cfg_tips" title="\u6267\u884C\u81EA\u5B9A\u4E49\u7684javascript\u811A\u672C\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u586B\u5165\u81EA\u5B9A\u4E49\u7684\u811A\u672C\u5185\u5BB9">[?]</span>\n      </label>\n      <a class="pd_cfg_ml" data-name="openCustomScriptDialog" href="#">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n      <label>\n        <input name="adminMemberEnabled" type="checkbox"> \u6211\u662F\u7BA1\u7406\u6210\u5458\n        <span class="pd_cfg_tips" title="\u7BA1\u7406\u6210\u5458\u53EF\u5F00\u542F\u6B64\u529F\u80FD\uFF0C\u52A9\u624B\u4F1A\u5F00\u542F\u90E8\u5206\u53EA\u6709\u7BA1\u7406\u6210\u5458\u624D\u80FD\u4F7F\u7528\u7684\u529F\u80FD\uFF0C\u975E\u7BA1\u7406\u6210\u5458\u5F00\u542F\u6B64\u529F\u80FD\u65E0\u6548">[?]</span>\n      </label>\n      <label class="pd_cfg_ml">\n        <input name="navBarAlwaysTopEnabled" type="checkbox"> \u4FDD\u6301\u5BFC\u822A\u680F\u7F6E\u9876\n        <span class="pd_cfg_tips" title="\u4FDD\u6301\u9876\u90E8\u5BFC\u822A\u680F\u7F6E\u9876\uFF08\u65E7\u7248\u672C\u6D4F\u89C8\u5668\u53EF\u80FD\u65E0\u6CD5\u751F\u6548\uFF09">[?]</span>\n      </label><br>\n      <label>\n        <input name="showGuGuZhenInFastNavEnabled" type="checkbox" ' + (_Info2.default.isInSpecialDomain ? '' : 'disabled') + '> \u5FEB\u6377\u5BFC\u822A\u663E\u793A\u5495\u5495\u9547\n        <span class="pd_cfg_tips" title="\u5728\u5FEB\u6377\u5BFC\u822A\u4E2D\u663E\u793A\u5495\u5495\u9547\u7684\u94FE\u63A5">[?]</span>\n      </label>\n    </fieldset>\n  </div>\n</div>\n\n<div class="pd_cfg_btns">\n  <span class="pd_cfg_about">\n    <a target="_blank" href="read.php?tid=508450&sf=140">By \u55B5\u62C9\u5E03\u4E01</a>\n    <i style="color: #666; font-style: normal;">(V' + _Info2.default.version + ')</i>\n    <a target="_blank" href="https://gitee.com/miaolapd/KF_Online_Assistant/wikis/pages?title=%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98">[\u5E38\u89C1\u95EE\u9898]</a>\n  </span>\n  <button type="submit">\u4FDD\u5B58</button>\n  <button data-action="close" type="button">\u53D6\u6D88</button>\n  <button name="default" type="button">\u9ED8\u8BA4\u503C</button>\n</div>';
    var $dialog = Dialog.create(dialogName, 'KFOL助手设置' + (_Info2.default.isMobile ? ' (For Mobile)' : ''), html);

    $dialog.submit(function (e) {
        e.preventDefault();
        if (!verifyMainConfig($dialog)) return;
        var oriAutoRefreshEnabled = Config.timingModeEnabled;
        (0, _Config.read)();
        var options = getMainConfigValue($dialog);
        options = (0, _Config.normalize)(options);
        $.extend(Config, options);
        (0, _Config.write)();
        var storageType = $dialog.find('[data-name="storageType"]').val();
        if (storageType !== _Info2.default.storageType) {
            if (!confirm('是否修改存储类型？')) return;
            (0, _Config.changeStorageType)(storageType);
            alert('存储类型已修改');
            location.reload();
            return;
        }
        Dialog.close(dialogName);
        if (oriAutoRefreshEnabled !== options.timingModeEnabled) {
            if (confirm('你已修改了定时模式的设置，需要刷新页面才能生效，是否立即刷新？')) {
                location.reload();
            }
        }
    }).find('[name="default"]').click(function () {
        if (confirm('是否重置所有设置？')) {
            (0, _Config.clear)();
            alert('设置已重置');
            location.reload();
        }
    });

    $dialog.on('click', 'a[data-name^="open"][href="#"]', function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.hasClass('pd_disabled_link')) return;
        var name = $this.data('name');
        if (name === 'openClearDataDialog') showClearDataDialog();else if (name === 'openRumCommandDialog') showRunCommandDialog();else if (name === 'openImportOrExportSettingDialog') showImportOrExportSettingDialog();else if (name === 'openBuyItemTipsDialog') showBuyItemTipsDialog();else if (name === 'openCustomSmColorDialog') showCustomSmColorDialog();else if (name === 'openUserMemoDialog') showUserMemoDialog();else if (name === 'openCustomCssDialog') showCustomCssDialog();else if (name === 'openCustomScriptDialog') Script.showDialog();else if (name === 'openFollowUserDialog') showFollowUserDialog();else if (name === 'openBlockUserDialog') showBlockUserDialog();else if (name === 'openBlockThreadDialog') showBlockThreadDialog();
    }).find('[name="promoteHaloCostType"]').change(function () {
        var typeId = parseInt($(this).val());
        $dialog.find('[data-id="promoteHaloLimitUnit"]').text(typeId >= 11 ? '贡献' : 'KFB');
    }).end().find('[data-name="customMySmColorSelect"]').change(function () {
        $dialog.find('[name="customMySmColor"]').val($(this).val().toString().toLowerCase());
    }).end().find('[name="customMySmColor"]').change(function () {
        var color = $.trim($(this).val());
        if (/^#[0-9a-fA-F]{6}$/.test(color)) $dialog.find('[data-name="customMySmColorSelect"]').val(color.toLowerCase());
    });

    setMainConfigValue($dialog);
    Dialog.show(dialogName);
    Script.runFunc('ConfigDialog.show_after_');
};

/**
 * 设置主对话框中的字段值
 * @param {jQuery} $dialog 助手设置对话框对象
 */
var setMainConfigValue = function setMainConfigValue($dialog) {
    $dialog.find('input[name], select[name]').each(function () {
        var $this = $(this);
        var name = $this.attr('name');
        if (name in Config) {
            if ($this.is('[type="checkbox"]') && typeof Config[name] === 'boolean') $this.prop('checked', Config[name] === true);else $this.val(Config[name]);
        }
    });
    $dialog.find('[name="promoteHaloCostType"]').trigger('change');
    $dialog.find('[name="buyItemIdList"]').val(Config.buyItemIdList.join(','));
    $dialog.find('[name="threadContentFontSize"]').val(Config.threadContentFontSize > 0 ? Config.threadContentFontSize : '');
    $dialog.find('[data-name="customMySmColorSelect"]').val(Config.customMySmColor);

    $dialog.find('[data-name="storageType"]').val(_Info2.default.storageType);
    if (typeof GM_getValue === 'undefined') $dialog.find('[data-name="storageType"] > option:gt(0)').prop('disabled', true);
};

/**
 * 获取主对话框中字段值的Config对象
 * @param {jQuery} $dialog 助手设置对话框对象
 * @returns {{}} 字段值的Config对象
 */
var getMainConfigValue = function getMainConfigValue($dialog) {
    var options = {};
    $dialog.find('input[name], select[name]').each(function () {
        var $this = $(this);
        var name = $this.attr('name');
        if (name in Config) {
            if ($this.is('[type="checkbox"]') && typeof Config[name] === 'boolean') {
                options[name] = Boolean($this.prop('checked'));
            } else if (typeof Config[name] === 'number') {
                var value = $.trim($this.val());
                if (/\d+\.\d+/.test(value)) options[name] = parseFloat(value);else options[name] = parseInt(value);
                if (name === 'threadContentFontSize' && isNaN(options[name])) options[name] = 0;
            } else {
                options[name] = $.trim($this.val());
            }
        }
    });
    if (options.buyItemIdList) options.buyItemIdList = options.buyItemIdList.split(',');else options.buyItemIdList = [];
    return options;
};

/**
 * 验证主对话框设置是否正确
 * @param {jQuery} $dialog 助手设置对话框对象
 * @returns {boolean} 是否验证通过
 */
var verifyMainConfig = function verifyMainConfig($dialog) {
    var $txtBuyItemIdList = $dialog.find('[name="buyItemIdList"]');
    var buyItemIdList = $.trim($txtBuyItemIdList.val());
    if ($dialog.find('[name="autoBuyItemEnabled"]').prop('checked')) {
        if (!/^(\d+)(\|\d+)*(,(\d+)(\|\d+)*)?$/.test(buyItemIdList)) {
            alert('购买物品ID列表格式不正确');
            $txtBuyItemIdList.select().focus();
            return false;
        } else if (buyItemIdList.includes('901')) {
            alert('不支持自动购买重生之药');
            $txtBuyItemIdList.select().focus();
            return false;
        }
    }

    var $txtBuyItemAfterTime = $dialog.find('[name="buyItemAfterTime"]');
    var buyItemAfterTime = $.trim($txtBuyItemAfterTime.val());
    if (!/^(2[0-3]|[0-1][0-9]):[0-5][0-9]:[0-5][0-9]$/.test(buyItemAfterTime)) {
        alert('在指定时间之后购买物品格式不正确');
        $txtBuyItemAfterTime.select().focus();
        return false;
    } else if (buyItemAfterTime < '00:25:00') {
        alert('在指定时间之后购买物品不得小于00:25:00');
        $txtBuyItemAfterTime.select().focus();
        return false;
    }

    var $txtCustomMySmColor = $dialog.find('[name="customMySmColor"]');
    var customMySmColor = $.trim($txtCustomMySmColor.val());
    if (customMySmColor && !/^#[0-9a-fA-F]{6}$/.test(customMySmColor)) {
        alert('自定义本人的神秘颜色格式不正确，例：#009cff');
        $txtCustomMySmColor.select().focus();
        return false;
    }

    return true;
};

/**
 * 显示清除数据对话框
 */
var showClearDataDialog = function showClearDataDialog() {
    var dialogName = 'pdClearDataDialog';
    if ($('#' + dialogName).length > 0) return;

    var html = '\n<div class="pd_cfg_main">\n  <fieldset style="margin-top: 5px;">\n    <legend>\u8BF7\u9009\u62E9\u60F3\u6E05\u9664\u7684\u4E34\u65F6\u7F13\u5B58\u6570\u636E\uFF08\u6309<b>Ctrl\u952E</b>\u6216<b>Shift\u952E</b>\u53EF\u591A\u9009\uFF09\uFF1A</legend>\n    <select name="caches" size="2" style="width: 340px;" multiple>\n      <option value="cookies">\u52A9\u624BCookies</option><option value="tmpData">\u52A9\u624B\u4E34\u65F6\u6570\u636E</option>\n    </select>\n  </fieldset>\n  <fieldset style="margin-top: 5px;">\n    <legend>\u8BF7\u9009\u62E9\u60F3\u6E05\u9664\u7684\u8BBE\u7F6E\u6216\u65E5\u5FD7\uFF08\u6309<b>Ctrl\u952E</b>\u6216<b>Shift\u952E</b>\u53EF\u591A\u9009\uFF09\uFF1A</legend>\n    <select name="settingsAndLogs" size="5" style="width: 340px;" multiple>\n      <option value="config">\u52A9\u624B\u8BBE\u7F6E</option><option value="log">\u52A9\u624B\u65E5\u5FD7</option>\n      <option value="armsInfo">\u88C5\u5907\u4FE1\u606F</option><option value="buyThreadLog">\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55</option>\n    </select>\n  </fieldset>\n</div>\n<div class="pd_cfg_btns">\n  <button type="submit" style="color: #f00;">\u6E05\u9664\u6570\u636E</button>\n  <button data-action="close" type="button">\u53D6\u6D88</button>\n</div>';
    var $dialog = Dialog.create(dialogName, '清除数据', html);

    $dialog.on('keydown', 'select', function (e) {
        if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            $(this).children().prop('selected', true);
        }
    }).submit(function (e) {
        e.preventDefault();
        var caches = $dialog.find('[name="caches"]').val();
        var settingsAndLogs = $dialog.find('[name="settingsAndLogs"]').val();
        if (!caches && !settingsAndLogs || !confirm('是否清除选定的数据？')) return;
        caches = caches ? caches : [];
        settingsAndLogs = settingsAndLogs ? settingsAndLogs : [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = caches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var name = _step.value;

                (0, _Config.clearData)(name);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = settingsAndLogs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _name = _step2.value;

                (0, _Config.clearData)(_name);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        alert('选定的数据已清除');
        location.reload();
    });

    Dialog.show(dialogName);
    Script.runFunc('ConfigDialog.showClearDataDialog_after_');
};

/**
 * 显示运行命令对话框
 */
var showRunCommandDialog = function showRunCommandDialog() {
    var dialogName = 'pdRunCommandDialog';
    if ($('#' + dialogName).length > 0) return;
    Dialog.close('pdConfigDialog');
    var html = '\n<div class="pd_cfg_main">\n  <div style="margin: 5px 0;">\n    \u8FD0\u884C\u547D\u4EE4\u5FEB\u6377\u952E\uFF1A<b>Ctrl+Enter</b>\uFF1B\u6E05\u9664\u547D\u4EE4\u5FEB\u6377\u952E\uFF1A<b>Ctrl+\u9000\u683C\u952E</b><br>\n    \u6309<b>F12\u952E</b>\u53EF\u6253\u5F00\u6D4F\u89C8\u5668\u63A7\u5236\u53F0\u67E5\u770B\u6D88\u606F\uFF08\u9700\u5207\u6362\u81F3\u63A7\u5236\u53F0\u6216Console\u6807\u7B7E\uFF09\n  </div>\n  <textarea name="cmd" wrap="off" style="width: 750px; height: 300px; white-space: pre;"></textarea>\n</div>\n<div class="pd_cfg_btns">\n  <button type="submit">\u8FD0\u884C</button>\n  <button name="clear" type="button">\u6E05\u9664</button>\n  <button data-action="close" type="button">\u5173\u95ED</button>\n</div>';
    var $dialog = Dialog.create(dialogName, '运行命令', html);
    var $cmd = $dialog.find('[name="cmd"]');

    $dialog.submit(function (e) {
        e.preventDefault();
        var content = $cmd.val();
        if (content) Script.runCmd(content, true);
    }).end().find('[name="clear"]').click(function () {
        $cmd.val('').focus();
    });

    $cmd.keydown(function (e) {
        if (e.ctrlKey && e.keyCode === 13) {
            $dialog.submit();
        } else if (e.ctrlKey && e.keyCode === 8) {
            $dialog.find('[name="clear"]').click();
        }
    });

    Dialog.show(dialogName);
    $cmd.focus();
};

/**
 * 显示导入或导出设置对话框
 */
var showImportOrExportSettingDialog = function showImportOrExportSettingDialog() {
    var dialogName = 'pdImOrExSettingDialog';
    if ($('#' + dialogName).length > 0) return;
    (0, _Config.read)();
    var html = '\n<div class="pd_cfg_main">\n  <div>\n    <strong>\u5BFC\u5165\u8BBE\u7F6E\uFF1A</strong>\u5C06\u8BBE\u7F6E\u5185\u5BB9\u7C98\u8D34\u5230\u6587\u672C\u6846\u4E2D\u5E76\u70B9\u51FB\u4FDD\u5B58\u6309\u94AE\u5373\u53EF<br>\n    <strong>\u5BFC\u51FA\u8BBE\u7F6E\uFF1A</strong>\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u522B\u5904\u5373\u53EF\n  </div>\n  <textarea name="setting" style="width: 600px; height: 400px; word-break: break-all;"></textarea>\n</div>\n<div class="pd_cfg_btns">\n  <button type="submit">\u4FDD\u5B58</button>\n  <button data-action="close" type="button">\u53D6\u6D88</button>\n</div>';
    var $dialog = Dialog.create(dialogName, '导入或导出设置', html);
    var $setting = $dialog.find('[name="setting"]');
    $dialog.submit(function (e) {
        e.preventDefault();
        if (!confirm('是否导入文本框中的设置？')) return;
        var options = $.trim($setting.val());
        if (!options) return;
        try {
            options = JSON.parse(options);
        } catch (ex) {
            alert('设置有错误');
            return;
        }
        if (!options || $.type(options) !== 'object') {
            alert('设置有错误');
            return;
        }
        options = (0, _Config.normalize)(options);
        _Info2.default.w.Config = $.extend(true, {}, _Config.Config, options);
        (0, _Config.write)();
        alert('设置已导入');
        location.reload();
    });
    Dialog.show(dialogName);
    $setting.val(JSON.stringify(Util.getDifferenceSetOfObject(_Config.Config, Config))).select().focus();
};

/**
 * 显示自定义CSS对话框
 */
var showCustomCssDialog = function showCustomCssDialog() {
    var dialogName = 'pdCustomCssDialog';
    if ($('#' + dialogName).length > 0) return;
    var html = '\n<div class="pd_cfg_main">\n  <strong>\u81EA\u5B9A\u4E49CSS\u5185\u5BB9\uFF1A</strong><br>\n  <textarea name="customCssContent" wrap="off" style="width: 750px; height: 400px; white-space: pre;"></textarea>\n</div>\n<div class="pd_cfg_btns">\n  <span class="pd_cfg_about"><a target="_blank" href="read.php?tid=500969&sf=206">CSS\u89C4\u5219\u6536\u96C6\u8D34</a></span>\n  <button type="submit">\u4FDD\u5B58</button>\n  <button data-action="close" type="button">\u53D6\u6D88</button>\n</div>';
    var $dialog = Dialog.create(dialogName, '自定义CSS', html);
    var $content = $dialog.find('[name="customCssContent"]');
    $dialog.submit(function (e) {
        e.preventDefault();
        Config.customCssContent = $.trim($content.val());
        (0, _Config.write)();
        Dialog.close(dialogName);
        alert('自定义CSS修改成功（需刷新页面后才可生效）');
    });
    $content.val(Config.customCssContent);
    Dialog.show(dialogName);
    $content.focus();
};

/**
 * 显示用户备注对话框
 */
var showUserMemoDialog = function showUserMemoDialog() {
    var dialogName = 'pdUserMemoDialog';
    if ($('#' + dialogName).length > 0) return;
    var html = '\n<div class="pd_cfg_main">\n  \u6309\u7167\u201C\u7528\u6237\u540D:\u5907\u6CE8\u201D\u7684\u683C\u5F0F\uFF08\u6CE8\u610F\u662F\u82F1\u6587\u5192\u53F7\uFF09\uFF0C\u6BCF\u884C\u4E00\u4E2A<br>\n  <textarea name="userMemoList" wrap="off" style="width: 320px; height: 400px; white-space: pre;"></textarea>\n</div>\n<div class="pd_cfg_btns">\n  <button type="submit">\u4FDD\u5B58</button>\n  <button data-action="close" type="button">\u53D6\u6D88</button>\n</div>';
    var $dialog = Dialog.create(dialogName, '用户备注', html);
    var $userMemoList = $dialog.find('[name="userMemoList"]');
    $dialog.submit(function (e) {
        e.preventDefault();
        var content = $.trim($userMemoList.val());
        Config.userMemoList = {};
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = content.split('\n')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var line = _step3.value;

                line = $.trim(line);
                if (!line) continue;
                if (!/.+?:.+/.test(line)) {
                    alert('用户备注格式不正确');
                    $userMemoList.focus();
                    return;
                }

                var _line$split = line.split(':'),
                    _line$split2 = _slicedToArray(_line$split, 2),
                    user = _line$split2[0],
                    _line$split2$ = _line$split2[1],
                    memo = _line$split2$ === undefined ? '' : _line$split2$;

                if (!memo) continue;
                Config.userMemoList[user.trim()] = memo.trim();
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        (0, _Config.write)();
        Dialog.close(dialogName);
    });
    var content = '';
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = Util.entries(Config.userMemoList)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _step4$value = _slicedToArray(_step4.value, 2),
                user = _step4$value[0],
                memo = _step4$value[1];

            content += user + ':' + memo + '\n';
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    $userMemoList.val(content);
    Dialog.show(dialogName);
    $userMemoList.focus();
};

/**
 * 显示关注用户对话框
 */
var showFollowUserDialog = function showFollowUserDialog() {
    var dialogName = 'pdFollowUserDialog';
    if ($('#' + dialogName).length > 0) return;
    var html = '\n<div class="pd_cfg_main">\n  <div style="margin-top: 5px;">\n    <label>\n      <input name="highlightFollowUserThreadInHpEnabled" type="checkbox"> \u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u7684\u9996\u9875\u5E16\u5B50\u94FE\u63A5\n      <span class="pd_cfg_tips" title="\u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u5728\u9996\u9875\u4E0B\u7684\u5E16\u5B50\u94FE\u63A5">[?]</span>\n    </label><br>\n    <label>\n      <input name="highlightFollowUserThreadLinkEnabled" type="checkbox"> \u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u7684\u5E16\u5B50\u94FE\u63A5\n      <span class="pd_cfg_tips" title="\u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u5728\u7248\u5757\u9875\u9762\u4E0B\u7684\u5E16\u5B50\u94FE\u63A5">[?]</span>\n    </label><br>\n    <label>\n      <input name="highlightFollowUserFloorEnabled" type="checkbox"> \u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u7684\u697C\u5C42\n      <span class="pd_cfg_tips" title="\u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u5728\u5E16\u5B50\u9875\u9762\u4E0B\u7684\u697C\u5C42\u7684\u8FB9\u6846">[?]</span>\n    </label><br>\n  </div>\n  <ul id="pdFollowUserList" style="margin-top: 5px; min-width: 274px; line-height: 24px;"></ul>\n  <div style="margin-top: 5px;">\n    <div style="display: inline-block;">\n      <a class="pd_btn_link" data-name="selectAll" href="#">\u5168\u9009</a>\n      <a class="pd_btn_link" data-name="selectInverse" href="#">\u53CD\u9009</a>\n    </div>\n    <div style="float: right;">\n      <a class="pd_btn_link" data-name="deleteSelect" href="#">\u5220\u9664</a>\n    </div>\n  </div>\n  <div style="margin-top: 5px;" title="\u6DFB\u52A0\u591A\u4E2A\u7528\u6237\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694">\n    <input name="addFollowUser" style="width: 200px;" type="text">\n    <a class="pd_btn_link" data-name="add" href="#">\u6DFB\u52A0</a>\n  </div>\n</div>\n<div class="pd_cfg_btns">\n  <span class="pd_cfg_about"><a data-name="openImOrExFollowUserListDialog" href="#">\u5BFC\u5165/\u5BFC\u51FA\u5173\u6CE8\u7528\u6237</a></span>\n  <button type="submit">\u4FDD\u5B58</button>\n  <button data-action="close" type="button">\u53D6\u6D88</button>\n</div>';
    var $dialog = Dialog.create(dialogName, '关注用户', html);
    var $followUserList = $dialog.find('#pdFollowUserList');

    /**
     * 添加关注用户
     * @param {string} name 用户名
     */
    var addFollowUser = function addFollowUser(name) {
        $('\n<li>\n  <input type="checkbox">\n  <input name="username" type="text" style="width: 178px; margin-left: 5px;" maxlength="15" value="' + name + '">\n  <a class="pd_btn_link" data-name="delete" href="#">\u5220\u9664</a>\n</li>\n').appendTo($followUserList);
    };

    $dialog.submit(function (e) {
        e.preventDefault();
        Config.highlightFollowUserThreadInHPEnabled = $dialog.find('[name="highlightFollowUserThreadInHpEnabled"]').prop('checked');
        Config.highlightFollowUserThreadLinkEnabled = $dialog.find('[name="highlightFollowUserThreadLinkEnabled"]').prop('checked');
        Config.highlightFollowUserFloorEnabled = $dialog.find('[name="highlightFollowUserFloorEnabled"]').prop('checked');
        Config.followUserList = [];
        $followUserList.find('li').each(function () {
            var $this = $(this);
            var name = $.trim($this.find('[name="username"]').val());
            if (name !== '' && Util.inFollowOrBlockUserList(name, Config.followUserList) === -1) {
                Config.followUserList.push({ name: name });
            }
        });
        (0, _Config.write)();
        Dialog.close(dialogName);
    });

    $followUserList.on('click', '[data-name="delete"]', function (e) {
        e.preventDefault();
        $(this).parent().remove();
    });

    $dialog.find('[data-name="selectAll"]').click(function () {
        return Util.selectAll($followUserList.find('[type="checkbox"]'));
    }).end().find('[data-name="selectInverse"]').click(function () {
        return Util.selectInverse($followUserList.find('[type="checkbox"]'));
    }).end().find('[data-name="deleteSelect"]').click(function (e) {
        e.preventDefault();
        var $checked = $followUserList.find('li:has([type="checkbox"]:checked)');
        if (!$checked.length) return;
        if (confirm('是否删除所选用户？')) {
            $checked.remove();
            Dialog.resize(dialogName);
        }
    });

    $dialog.find('[name="addFollowUser"]').keydown(function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            $(this).next('a').click();
        }
    }).end().find('[data-name="add"]').click(function (e) {
        e.preventDefault();
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = $.trim($dialog.find('[name="addFollowUser"]').val()).split(',')[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var name = _step5.value;

                name = $.trim(name);
                if (!name) continue;
                if (Util.inFollowOrBlockUserList(name, Config.followUserList) === -1) {
                    addFollowUser(name);
                }
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }

        $dialog.find('[name="addFollowUser"]').val('');
        Dialog.resize(dialogName);
    }).end().find('[data-name="openImOrExFollowUserListDialog"]').click(function (e) {
        e.preventDefault();
        Public.showCommonImportOrExportConfigDialog('关注用户', 'followUserList');
    });

    $dialog.find('[name="highlightFollowUserThreadInHpEnabled"]').prop('checked', Config.highlightFollowUserThreadInHPEnabled);
    $dialog.find('[name="highlightFollowUserThreadLinkEnabled"]').prop('checked', Config.highlightFollowUserThreadLinkEnabled);
    $dialog.find('[name="highlightFollowUserFloorEnabled"]').prop('checked', Config.highlightFollowUserFloorEnabled);
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
        for (var _iterator6 = Config.followUserList[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var user = _step6.value;

            addFollowUser(user.name);
        }
    } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
            }
        } finally {
            if (_didIteratorError6) {
                throw _iteratorError6;
            }
        }
    }

    Dialog.show(dialogName);
};

/**
 * 显示屏蔽用户对话框
 */
var showBlockUserDialog = function showBlockUserDialog() {
    var dialogName = 'pdBlockUserDialog';
    if ($('#' + dialogName).length > 0) return;
    var html = '\n<div class="pd_cfg_main">\n  <div style="margin-top: 5px; line-height: 24px;">\n    <label>\n      \u9ED8\u8BA4\u5C4F\u853D\u7C7B\u578B\n      <select name="blockUserDefaultType">\n        <option value="0">\u5C4F\u853D\u4E3B\u9898\u548C\u56DE\u5E16</option><option value="1">\u4EC5\u5C4F\u853D\u4E3B\u9898</option><option value="2">\u4EC5\u5C4F\u853D\u56DE\u5E16</option>\n      </select>\n    </label>\n    <label class="pd_cfg_ml">\n      <input name="blockUserAtTipsEnabled" type="checkbox"> \u5C4F\u853D@\u63D0\u9192 <span class="pd_cfg_tips" title="\u5C4F\u853D\u88AB\u5C4F\u853D\u7528\u6237\u7684@\u63D0\u9192">[?]</span>\n    </label><br>\n    <label>\u7248\u5757\u5C4F\u853D\u8303\u56F4\n      <select name="blockUserForumType">\n        <option value="0">\u6240\u6709\u7248\u5757</option><option value="1">\u5305\u62EC\u6307\u5B9A\u7248\u5757</option><option value="2">\u6392\u9664\u6307\u5B9A\u7248\u5757</option>\n      </select>\n    </label><br>\n    <label>\u7248\u5757ID\u5217\u8868\n      <input name="blockUserFidList" type="text" style="width: 220px;"> \n      <span class="pd_cfg_tips" title="\u7248\u5757URL\u4E2D\u7684fid\u53C2\u6570\uFF0C\u591A\u4E2AID\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694">[?]</span>\n    </label>\n  </div>\n  <ul id="pdBlockUserList" style="margin-top: 5px; min-width: 362px; line-height: 24px;"></ul>\n  <div style="margin-top: 5px;">\n    <div style="display: inline-block;">\n      <a class="pd_btn_link" data-name="selectAll" href="#">\u5168\u9009</a>\n      <a class="pd_btn_link" data-name="selectInverse" href="#">\u53CD\u9009</a>\n    </div>\n    <div style="float: right;">\n      <a class="pd_btn_link" data-name="modify" href="#">\u4FEE\u6539\u4E3A</a>\n      <select>\n        <option value="0">\u5C4F\u853D\u4E3B\u9898\u548C\u56DE\u5E16</option><option value="1">\u4EC5\u5C4F\u853D\u4E3B\u9898</option><option value="2">\u4EC5\u5C4F\u853D\u56DE\u5E16</option>\n      </select>\n      <a class="pd_btn_link" data-name="deleteSelect" href="#">\u5220\u9664</a>\n    </div>\n  </div>\n  <div style="margin-top: 5px;" title="\u6DFB\u52A0\u591A\u4E2A\u7528\u6237\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694">\n    <input name="addBlockUser" style="width: 200px;" type="text">\n    <a class="pd_btn_link" data-name="add" href="#">\u6DFB\u52A0</a>\n  </div>\n</div>\n<div class="pd_cfg_btns">\n  <span class="pd_cfg_about"><a data-name="openImOrExBlockUserListDialog" href="#">\u5BFC\u5165/\u5BFC\u51FA\u5C4F\u853D\u7528\u6237</a></span>\n  <button type="submit">\u4FDD\u5B58</button>\n  <button data-action="close" type="button">\u53D6\u6D88</button>\n</div>';
    var $dialog = Dialog.create(dialogName, '屏蔽用户', html);
    var $blockUserList = $dialog.find('#pdBlockUserList');

    /**
     * 添加屏蔽用户
     * @param {string} name 用户名
     * @param {number} type 屏蔽类型
     */
    var addBlockUser = function addBlockUser(name, type) {
        $('\n<li>\n  <input type="checkbox">\n  <input name="username" type="text" style="width: 150px; margin-left: 5px;" maxlength="15" value="' + name + '">\n  <select name="blockType" style="margin-left: 5px;">\n    <option value="0">\u5C4F\u853D\u4E3B\u9898\u548C\u56DE\u5E16</option><option value="1">\u4EC5\u5C4F\u853D\u4E3B\u9898</option><option value="2">\u4EC5\u5C4F\u853D\u56DE\u5E16</option>\n  </select>\n  <a class="pd_btn_link" data-name="delete" href="#">\u5220\u9664</a>\n</li>').appendTo($blockUserList).find('[name="blockType"]').val(type);
    };

    $dialog.submit(function (e) {
        e.preventDefault();
        Config.blockUserDefaultType = parseInt($dialog.find('[name="blockUserDefaultType"]').val());
        Config.blockUserAtTipsEnabled = $dialog.find('[name="blockUserAtTipsEnabled"]').prop('checked');
        Config.blockUserForumType = parseInt($dialog.find('[name="blockUserForumType"]').val());
        var blockUserFidList = new Set();
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
            for (var _iterator7 = $.trim($dialog.find('[name="blockUserFidList"]').val()).split(',')[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                var fid = _step7.value;

                fid = parseInt(fid);
                if (!isNaN(fid) && fid > 0) blockUserFidList.add(fid);
            }
        } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                    _iterator7.return();
                }
            } finally {
                if (_didIteratorError7) {
                    throw _iteratorError7;
                }
            }
        }

        Config.blockUserFidList = [].concat(_toConsumableArray(blockUserFidList));
        Config.blockUserList = [];
        $blockUserList.find('li').each(function () {
            var $this = $(this);
            var name = $.trim($this.find('[name="username"]').val());
            if (name !== '' && Util.inFollowOrBlockUserList(name, Config.blockUserList) === -1) {
                var type = parseInt($this.find('[name="blockType"]').val());
                Config.blockUserList.push({ name: name, type: type });
            }
        });
        (0, _Config.write)();
        Dialog.close(dialogName);
    });

    $blockUserList.on('click', '[data-name="delete"]', function (e) {
        e.preventDefault();
        $(this).parent().remove();
    });

    $dialog.find('[data-name="selectAll"]').click(function () {
        return Util.selectAll($blockUserList.find('input[type="checkbox"]'));
    }).end().find('[data-name="selectInverse"]').click(function () {
        return Util.selectInverse($blockUserList.find('input[type="checkbox"]'));
    }).end().find('[data-name="modify"]').click(function (e) {
        e.preventDefault();
        var value = $(this).next('select').val();
        $blockUserList.find('li:has([type="checkbox"]:checked) > select').val(value);
    }).end().find('[data-name="deleteSelect"]').click(function (e) {
        e.preventDefault();
        var $checked = $blockUserList.find('li:has([type="checkbox"]:checked)');
        if (!$checked.length) return;
        if (confirm('是否删除所选用户？')) {
            $checked.remove();
            Dialog.resize(dialogName);
        }
    });

    $dialog.find('[name="addBlockUser"]').keydown(function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            $(this).next('a').click();
        }
    }).end().find('[data-name="add"]').click(function (e) {
        e.preventDefault();
        var type = parseInt($dialog.find('[name="blockUserDefaultType"]').val());
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
            for (var _iterator8 = $.trim($dialog.find('[name="addBlockUser"]').val()).split(',')[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                var name = _step8.value;

                name = $.trim(name);
                if (!name) continue;
                if (Util.inFollowOrBlockUserList(name, Config.blockUserList) === -1) {
                    addBlockUser(name, type);
                }
            }
        } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                    _iterator8.return();
                }
            } finally {
                if (_didIteratorError8) {
                    throw _iteratorError8;
                }
            }
        }

        $dialog.find('[name="addBlockUser"]').val('');
        Dialog.resize(dialogName);
    }).end().find('[name="blockUserForumType"]').change(function () {
        $dialog.find('[name="blockUserFidList"]').prop('disabled', parseInt($(this).val()) === 0);
    }).end().find('[data-name="openImOrExBlockUserListDialog"]').click(function (e) {
        e.preventDefault();
        Public.showCommonImportOrExportConfigDialog('屏蔽用户', 'blockUserList');
    });

    $dialog.find('[name="blockUserDefaultType"]').val(Config.blockUserDefaultType);
    $dialog.find('[name="blockUserAtTipsEnabled"]').prop('checked', Config.blockUserAtTipsEnabled);
    $dialog.find('[name="blockUserForumType"]').val(Config.blockUserForumType).triggerHandler('change');
    $dialog.find('[name="blockUserFidList"]').val(Config.blockUserFidList.join(','));
    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
        for (var _iterator9 = Config.blockUserList[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var user = _step9.value;

            addBlockUser(user.name, user.type);
        }
    } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion9 && _iterator9.return) {
                _iterator9.return();
            }
        } finally {
            if (_didIteratorError9) {
                throw _iteratorError9;
            }
        }
    }

    Dialog.show(dialogName);
};

/**
 * 显示屏蔽帖子对话框
 */
var showBlockThreadDialog = function showBlockThreadDialog() {
    var dialogName = 'pdBlockThreadDialog';
    if ($('#' + dialogName).length > 0) return;
    var html = '\n<div class="pd_cfg_main">\n  <div style="border-bottom: 1px solid #9191ff; margin-bottom: 7px; padding-bottom: 5px;">\n    \u6807\u9898\u5173\u952E\u5B57\u53EF\u4F7F\u7528\u666E\u901A\u5B57\u7B26\u4E32\u6216\u6B63\u5219\u8868\u8FBE\u5F0F\uFF0C\u6B63\u5219\u8868\u8FBE\u5F0F\u8BF7\u4F7F\u7528<code>/abc/</code>\u7684\u683C\u5F0F\uFF0C\u4F8B\uFF1A<code>/\u5173\u952E\u5B57A.*\u5173\u952E\u5B57B/i</code><br>\n    \u7528\u6237\u540D\u548C\u7248\u5757ID\u4E3A\u53EF\u9009\u9879\uFF08\u591A\u4E2A\u7528\u6237\u540D\u6216\u7248\u5757ID\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694\uFF09<br>\n    <label>\n      \u9ED8\u8BA4\u7248\u5757\u5C4F\u853D\u8303\u56F4\n      <select name="blockThreadDefForumType">\n        <option value="0">\u6240\u6709\u7248\u5757</option><option value="1">\u5305\u62EC\u6307\u5B9A\u7248\u5757</option><option value="2">\u6392\u9664\u6307\u5B9A\u7248\u5757</option>\n      </select>\n    </label>\n    <label style="margin-left: 5px;">\u9ED8\u8BA4\u7248\u5757ID\u5217\u8868 <input name="blockThreadDefFidList" type="text" style="width: 150px;"></label>\n  </div>\n  <table id="pdBlockThreadList" style="line-height: 22px; text-align: center;">\n    <tbody>\n      <tr>\n        <th style="width: 220px;">\u6807\u9898\u5173\u952E\u5B57(\u5FC5\u586B)</th>\n        <th style="width: 62px;">\u5C4F\u853D\u7528\u6237</th>\n        <th style="width: 200px;">\u7528\u6237\u540D <span class="pd_cfg_tips" title="\u591A\u4E2A\u7528\u6237\u540D\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694">[?]</span></th>\n        <th style="width: 62px;">\u5C4F\u853D\u8303\u56F4</th>\n        <th style="width: 132px;">\u7248\u5757ID <span class="pd_cfg_tips" title="\u7248\u5757URL\u4E2D\u7684fid\u53C2\u6570\uFF0C\u591A\u4E2AID\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694">[?]</span></th>\n        <th style="width: 35px;"></th>\n      </tr>\n    </tbody>\n  </table>\n  <div data-name="blockThreadAddBtns" style="margin-top: 5px;">\n    <a class="pd_btn_link" data-name="addOne" href="#">\u589E\u52A01\u4E2A</a>\n    <a class="pd_btn_link" data-name="addFive" href="#">\u589E\u52A05\u4E2A</a>\n    <a class="pd_btn_link pd_highlight" data-name="clear" href="#">\u6E05\u9664\u6240\u6709</a>\n  </div>\n</div>\n<div class="pd_cfg_btns">\n  <span class="pd_cfg_about"><a data-name="openImOrExBlockThreadListDialog" href="#">\u5BFC\u5165/\u5BFC\u51FA\u5C4F\u853D\u5E16\u5B50</a></span>\n  <button type="submit">\u4FDD\u5B58</button>\n  <button data-action="close" type="button">\u53D6\u6D88</button>\n</div>';
    var $dialog = Dialog.create(dialogName, '屏蔽帖子', html, 'width: 768px;');
    var $blockThreadList = $dialog.find('#pdBlockThreadList');

    /**
     * 添加屏蔽帖子
     * @param {string} keyWord 标题关键字
     * @param {number} userType 屏蔽用户，0：所有；1：包括；2：排除
     * @param {string[]} userList 用户名
     * @param {number} fidType 屏蔽范围，0：所有；1：包括；2：排除
     * @param {number[]} fidList 版块ID列表
     */
    var addBlockThread = function addBlockThread(keyWord, userType, userList, fidType, fidList) {
        $('\n<tr>\n  <td><input name="keyWord" type="text" style="width: 208px;" value="' + keyWord + '"></td>\n  <td><select name="userType"><option value="0">\u6240\u6709</option><option value="1">\u5305\u62EC</option><option value="2">\u6392\u9664</option></select></td>\n  <td><input name="userList" type="text" style="width: 188px;" value="' + userList.join(',') + '" ' + (userType === 0 ? 'disabled' : '') + '></td>\n  <td><select name="fidType"><option value="0">\u6240\u6709</option><option value="1">\u5305\u62EC</option><option value="2">\u6392\u9664</option></select></td>\n  <td><input name="fidList" type="text" style="width: 120px;" value="' + fidList.join(',') + '" ' + (fidType === 0 ? 'disabled' : '') + '></td>\n  <td><a href="#" data-name="delete">\u5220\u9664</a></td>\n</tr>\n').appendTo($blockThreadList).find('[name="userType"]').val(userType).end().find('[name="fidType"]').val(fidType);
    };

    /**
     * 验证设置是否正确
     * @returns {boolean} 是否验证通过
     */
    var verify = function verify() {
        var flag = true;
        $blockThreadList.find('tr:gt(0)').each(function () {
            var $this = $(this);
            var $txtKeyWord = $this.find('[name="keyWord"]');
            var keyWord = $txtKeyWord.val();
            if ($.trim(keyWord) === '') return;
            if (/^\/.+\/[gimuy]*$/.test(keyWord)) {
                try {
                    eval(keyWord);
                } catch (ex) {
                    alert('正则表达式不正确');
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
        var blockThreadDefFidList = new Set();
        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
            for (var _iterator10 = $.trim($dialog.find('[name="blockThreadDefFidList"]').val()).split(',')[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                var fid = _step10.value;

                fid = parseInt(fid);
                if (!isNaN(fid) && fid > 0) blockThreadDefFidList.add(fid);
            }
        } catch (err) {
            _didIteratorError10 = true;
            _iteratorError10 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                    _iterator10.return();
                }
            } finally {
                if (_didIteratorError10) {
                    throw _iteratorError10;
                }
            }
        }

        Config.blockThreadDefFidList = [].concat(_toConsumableArray(blockThreadDefFidList));
        Config.blockThreadList = [];
        $blockThreadList.find('tr:gt(0)').each(function () {
            var $this = $(this);
            var keyWord = $this.find('[name="keyWord"]').val();
            if ($.trim(keyWord) === '') return;
            var newObj = { keyWord: keyWord };

            var userType = parseInt($this.find('[name="userType"]').val());
            if (userType > 0) {
                var userList = new Set();
                var _iteratorNormalCompletion11 = true;
                var _didIteratorError11 = false;
                var _iteratorError11 = undefined;

                try {
                    for (var _iterator11 = $.trim($this.find('[name="userList"]').val()).split(',')[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                        var user = _step11.value;

                        user = $.trim(user);
                        if (user) userList.add(user);
                    }
                } catch (err) {
                    _didIteratorError11 = true;
                    _iteratorError11 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion11 && _iterator11.return) {
                            _iterator11.return();
                        }
                    } finally {
                        if (_didIteratorError11) {
                            throw _iteratorError11;
                        }
                    }
                }

                if (userList.size > 0) newObj[userType === 2 ? 'excludeUser' : 'includeUser'] = [].concat(_toConsumableArray(userList));
            }

            var fidType = parseInt($this.find('[name="fidType"]').val());
            if (fidType > 0) {
                var fidList = new Set();
                var _iteratorNormalCompletion12 = true;
                var _didIteratorError12 = false;
                var _iteratorError12 = undefined;

                try {
                    for (var _iterator12 = $.trim($this.find('[name="fidList"]').val()).split(',')[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                        var fid = _step12.value;

                        fid = parseInt(fid);
                        if (!isNaN(fid) && fid > 0) fidList.add(fid);
                    }
                } catch (err) {
                    _didIteratorError12 = true;
                    _iteratorError12 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion12 && _iterator12.return) {
                            _iterator12.return();
                        }
                    } finally {
                        if (_didIteratorError12) {
                            throw _iteratorError12;
                        }
                    }
                }

                if (fidList.size > 0) newObj[fidType === 2 ? 'excludeFid' : 'includeFid'] = [].concat(_toConsumableArray(fidList));
            }
            Config.blockThreadList.push(newObj);
        });
        (0, _Config.write)();
        Dialog.close(dialogName);
    });

    $blockThreadList.on('change', 'select', function () {
        var $this = $(this);
        $this.parent('td').next('td').find('input').prop('disabled', parseInt($this.val()) === 0);
    }).on('click', '[data-name="delete"]', function (e) {
        e.preventDefault();
        $(this).closest('tr').remove();
    });

    $dialog.find('[data-name="addOne"], [data-name="addFive"]').click(function (e) {
        e.preventDefault();
        var num = 1;
        if ($(this).is('[data-name="addFive"]')) num = 5;
        for (var i = 1; i <= num; i++) {
            addBlockThread('', 0, [], parseInt($dialog.find('[name="blockThreadDefForumType"]').val()), $.trim($dialog.find('[name="blockThreadDefFidList"]').val()).split(','));
        }
        Dialog.resize(dialogName);
    }).end().find('[data-name="clear"]').click(function (e) {
        e.preventDefault();
        if (confirm('是否清除所有屏蔽关键字？')) {
            $blockThreadList.find('tbody > tr:gt(0)').remove();
            Dialog.resize(dialogName);
        }
    }).end().find('[name="blockThreadDefForumType"]').change(function () {
        $dialog.find('[name="blockThreadDefFidList"]').prop('disabled', parseInt($(this).val()) === 0);
    }).end().find('[data-name="openImOrExBlockThreadListDialog"]').click(function (e) {
        e.preventDefault();
        Public.showCommonImportOrExportConfigDialog('屏蔽帖子', 'blockThreadList');
    });

    $dialog.find('[name="blockThreadDefForumType"]').val(Config.blockThreadDefForumType).triggerHandler('change');
    $dialog.find('[name="blockThreadDefFidList"]').val(Config.blockThreadDefFidList.join(','));
    var _iteratorNormalCompletion13 = true;
    var _didIteratorError13 = false;
    var _iteratorError13 = undefined;

    try {
        for (var _iterator13 = Config.blockThreadList[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            var data = _step13.value;
            var keyWord = data.keyWord,
                includeUser = data.includeUser,
                excludeUser = data.excludeUser,
                includeFid = data.includeFid,
                excludeFid = data.excludeFid;

            var userType = 0;
            var userList = [];
            if (typeof includeUser !== 'undefined') {
                userType = 1;
                userList = includeUser;
            } else if (typeof excludeUser !== 'undefined') {
                userType = 2;
                userList = excludeUser;
            }

            var fidType = 0;
            var fidList = [];
            if (typeof includeFid !== 'undefined') {
                fidType = 1;
                fidList = includeFid;
            } else if (typeof excludeFid !== 'undefined') {
                fidType = 2;
                fidList = excludeFid;
            }
            addBlockThread(keyWord, userType, userList, fidType, fidList);
        }
    } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion13 && _iterator13.return) {
                _iterator13.return();
            }
        } finally {
            if (_didIteratorError13) {
                throw _iteratorError13;
            }
        }
    }

    Dialog.show(dialogName);
};

/**
 * 显示自动购买物品详细说明对话框
 */
var showBuyItemTipsDialog = function showBuyItemTipsDialog() {
    var dialogName = 'pdBuyItemTipsDialog';
    if ($('#' + dialogName).length > 0) return;
    var html = '\n<div class="pd_cfg_main">\n  <div style="margin: 5px 0;">\n    <strong>\u8BBE\u7F6E\u8BF4\u660E\uFF1A</strong><br>\n    \u5728\u7269\u54C1ID\u5217\u8868\u586B\u5165\u76F8\u5E94\u7684\u7269\u54C1ID\uFF0C\u53EF\u81EA\u52A8\u8D2D\u4E70\u6240\u9700\u7684\u7269\u54C1\uFF0C\u6BCF\u5929\u6700\u591A\u53EF\u8D2D\u4E70\u4E24\u6B21\u3002<br>\n    \uFF08\u5373\uFF1A\u53EA\u8D2D\u4E701\u79CD\u7269\u54C1\u7684\u8BDD\u6700\u591A\u53EF\u8D2D\u4E702\u6B21\uFF1B\u8D2D\u4E702\u79CD\u7269\u54C1\u7684\u8BDD\u6BCF\u79CD\u7269\u54C1\u53EA\u80FD\u8D2D\u4E701\u6B21\uFF0C\u5408\u8BA12\u6B21\uFF09<br>\n    <strong>\u5404\u7269\u54C1ID\uFF1A</strong><br>\n    <strike><b>\u7B49\u7EA7\u7ECF\u9A8C\u836F\u4E38</b>\uFF1A101\uFF1B<b>\u7B49\u7EA7\u7ECF\u9A8C\u836F\u4E38\uFF08\u86CB\uFF09</b>\uFF1A102\uFF1B</strike><b>\u4FEE\u70BC\u624B\u518C</b>\uFF1A103\u3002<span class="pd_notice">\uFF08\u6CE8\uFF1A\u91CD\u751F\u4E4B\u836F\u8BF7\u624B\u52A8\u8D2D\u4E70\uFF09</span><br>\n    <strong>\u683C\u5F0F\uFF1A</strong><br>\n    \u4E24\u6B21\u8D2D\u4E70\u4E4B\u95F4\u7684\u7269\u54C1ID\u8BF7\u7528<b>\u82F1\u6587\u9017\u53F7</b>\u5206\u9694\uFF1B\u540C\u4E00\u6B21\u8D2D\u4E70\u7684\u7269\u54C1ID\u5982\u7528<b>\u7AD6\u7EBF</b>\u5206\u9694\uFF0C\u8868\u793A\u524D\u4E00\u79CD\u7269\u54C1\u5982\u8D39\u7528\u4E0D\u8DB3\uFF0C\u53EF\u81EA\u52A8\u66F4\u6362\u4E3A\u8D2D\u4E70\u53E6\u4E00\u79CD\u7269\u54C1\u3002<br>\n    <strong>\u4F8B\u5B50\uFF1A</strong><br>\n    <b>103</b>\uFF1A\u8868\u793A\u53EA\u8D2D\u4E70\u4E00\u6B21[103]\u7269\u54C1\u3002<br>\n    <b>103,101</b>\uFF1A\u8868\u793A\u7B2C1\u6B21\u8D2D\u4E70[103]\u7269\u54C1\uFF0C\u7B2C2\u6B21\u8D2D\u4E70[101]\u7269\u54C1\u3002<br>\n    <b>102|101,103|102|101</b>\uFF1A\u8868\u793A\u7B2C1\u6B21\u5148\u5C1D\u8BD5\u8D2D\u4E70[102]\u7269\u54C1\uFF0C\u5982\u8D39\u7528\u4E0D\u8DB3\u5219\u8D2D\u4E70[101]\u7269\u54C1\uFF1B\u7B2C2\u6B21\u5148\u5C1D\u8BD5\u8D2D\u4E70[103]\u7269\u54C1\uFF0C\u5982\u8D39\u7528\u4E0D\u8DB3\u5219\u8D2D\u4E70[102]\u7269\u54C1\uFF0C\u4F9D\u7136\u4E0D\u8DB3\u5219\u8D2D\u4E70[101]\u7269\u54C1\u3002<br>\n  </div>\n</div>';
    Dialog.create(dialogName, '自动购买物品详细说明', html, 'max-width: 600px;');
    Dialog.show(dialogName);
};

},{"./Config":3,"./Const":5,"./Dialog":6,"./Info":8,"./Public":16,"./Script":18,"./TmpLog":20,"./Util":21}],5:[function(require,module,exports){
/* 常量模块 */
'use strict';

// 通用存储数据名称前缀

Object.defineProperty(exports, "__esModule", {
    value: true
});
var storagePrefix = 'pd_';

/**
 * 常量类
 */
var Const = {
    // 开启调试模式，true：开启；false：关闭
    debug: false,

    // UTC时间与论坛时间之间的时差（小时）
    forumTimezoneOffset: -8,
    // 在当天的指定时间之后领取每日奖励（北京时间），例：00:20:00
    getDailyBonusAfterTime: '00:20:00',
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
    promoteHaloActionInterval: 1000,
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
    defAjaxTimeout: 30000,
    // ajax请求的默认时间间隔（毫秒）
    defAjaxInterval: 300,
    // 特殊情况下的ajax请求（如使用道具、打开盒子等）的时间间隔（毫秒），可设置为函数来返回值
    specialAjaxInterval: function specialAjaxInterval() {
        if (Config.slowActionEnabled) return Math.floor(Math.random() * 4000) + 3000; // 慢速情况
        else return Math.floor(Math.random() * 200) + 1000; // 正常情况
    },

    // 部分操作的最小时间间隔（毫秒）
    minActionInterval: 1000,
    // 银行相关操作的时间间隔（毫秒）
    bankActionInterval: 5000,

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
    customFastNavMenuContent: '',

    // 通用存储数据名称前缀
    storagePrefix: storagePrefix,
    // 存储多重引用数据的LocalStorage名称
    multiQuoteStorageName: storagePrefix + 'multiQuote',
    // 保存发帖内容的SessionStorage名称
    postContentStorageName: storagePrefix + 'postContent',
    // 存储临时点数分配记录列表的LocalStorage名称
    tempPointsLogListStorageName: storagePrefix + 'tempPointsLogList',

    // 神秘等级升级提醒的临时日志名称
    smLevelUpTmpLogName: 'SmLevelUp',
    // 神秘系数排名变化提醒的临时日志名称
    smRankChangeTmpLogName: 'SmRankChange',
    // 存储上一次自动更换ID颜色的临时日志名称
    prevAutoChangeIdColorTmpLogName: 'PrevAutoChangeIdColor',
    // 存储战力光环信息的临时日志名称
    haloInfoTmpLogName: 'HaloInfo',
    // 标记在争夺完后自动一键开盒的临时日志名称
    autoOpenBoxesAfterLootTmpLogName: 'AutoOpenBoxesAfterLoot',

    // 标记已领取每日奖励的Cookie名称
    getDailyBonusCookieName: 'getDailyBonus',
    // 标记已提升战力光环的Cookie名称
    promoteHaloCookieName: 'promoteHalo',
    // 标记正在检查争夺情况的Cookie名称
    lootCheckingCookieName: 'lootChecking',
    // 标记正在进行争夺攻击的Cookie名称
    lootAttackingCookieName: 'lootAttacking',
    // 存储改点剩余次数信息的Cookie名称
    changePointsInfoCookieName: 'changePointsInfo',
    // 标记已完成自动争夺的Cookie名称
    lootCompleteCookieName: 'lootComplete',
    // 标记准备购买物品的Cookie名称
    buyItemReadyCookieName: 'buyItemReady',
    // 标记已购买物品的Cookie名称
    buyItemCookieName: 'buyItem',
    // 标记抽卡的Cookie名称
    drawCardCookieName: 'drawCard',
    // 标记已去除首页已读at高亮提示的Cookie名称
    hideReadAtTipsCookieName: 'hideReadAtTips',
    // 存储之前已读的at提醒信息的Cookie名称
    prevReadAtTipsCookieName: 'prevReadAtTips',
    // 标记已自动更换ID颜色的Cookie名称
    autoChangeIdColorCookieName: 'autoChangeIdColor'
};

exports.default = Const;

},{}],6:[function(require,module,exports){
/* 对话框模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.close = exports.resize = exports.show = exports.create = undefined;

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Public = require('./Public');

var Public = _interopRequireWildcard(_Public);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 创建对话框
 * @param {string} id 对话框ID
 * @param {string} title 对话框标题
 * @param {string} content 对话框内容
 * @param {string} style 对话框样式
 * @returns {jQuery} 对话框的jQuery对象
 */
var create = exports.create = function create(id, title, content) {
    var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    var html = '\n<form>\n<div class="pd_cfg_box" id="' + id + '" style="' + style + '">\n  <h1>' + title + '<span data-action="close">&times;</span></h1>\n  ' + content + '\n</div>\n</form>';
    var $dialog = $(html).appendTo('body');
    $dialog.on('click', '.pd_cfg_tips', function (e) {
        if (_Info2.default.isMobile) Public.showElementTitleTips(e, this.title);
        return false;
    }).on('click', 'a.pd_disabled_link', function () {
        return false;
    }).on('click', '[data-action="close"]', function () {
        return close(id);
    }).keydown(function (e) {
        if (e.keyCode === 27) {
            return close(id);
        }
    }).find('legend [type="checkbox"]').click(function () {
        var $this = $(this);
        var checked = $this.prop('checked');
        if (Util.isOpera() || Util.isEdge()) $this.closest('fieldset').find('input, select, textarea, button').not('legend input').prop('disabled', !checked);else $this.closest('fieldset').prop('disabled', !checked);
    }).end().find('input[data-disabled]').click(function () {
        var $this = $(this);
        var checked = $this.prop('checked');
        $($this.data('disabled')).each(function () {
            var $this = $(this);
            if ($this.is('a')) {
                if (checked) $this.removeClass('pd_disabled_link');else $this.addClass('pd_disabled_link');
            } else {
                $this.prop('disabled', !checked);
            }
        });
    }).end().find('input[data-mutex]').click(function () {
        var $this = $(this);
        var checked = $this.prop('checked');
        $($this.data('mutex')).each(function () {
            var $this = $(this);
            if ($this.is('a')) {
                if (checked) $this.addClass('pd_disabled_link');else $this.removeClass('pd_disabled_link');
            } else {
                $this.prop('disabled', checked);
            }
        });
    });
    if (!_Info2.default.isMobile) {
        $(window).on('resize.' + id, function () {
            return resize(id);
        });
    }
    return $dialog;
};

/**
 * 显示或调整对话框
 * @param {string} id 对话框ID
 */
var show = exports.show = function show(id) {
    var $dialog = $('#' + id);
    if (!$dialog.length) return;
    $dialog.find('legend [type="checkbox"]').each(function () {
        $(this).triggerHandler('click');
    }).end().find('input[data-disabled], input[data-mutex]').each(function () {
        $(this).triggerHandler('click');
    });
    $dialog.fadeIn('fast');
    resize(id);
    $dialog.find('input:first, select:first, a:first, textarea:first, button:first').eq(0).focus();
};

/**
 * 调整对话框大小和位置
 * @param {string} id 对话框ID
 */
var resize = exports.resize = function resize(id) {
    var $dialog = $('#' + id);
    var windowHeight = $(window).height();
    $dialog.find('.pd_cfg_main').css('max-height', windowHeight - 80);
    var dialogWidth = $dialog.outerWidth(),
        windowWidth = $(window).width();
    var left = windowWidth / 2 - dialogWidth / 2;
    if (left + dialogWidth > windowWidth) left = windowWidth - dialogWidth - 20;
    if (left < 0) left = 0;
    var top = windowHeight / 2 - $dialog.outerHeight() / 2;
    if (top < 0) top = 0;
    $dialog.css({ top: top, left: left });
};

/**
 * 关闭对话框
 * @param {string} id 对话框ID
 * @returns {boolean} 返回false
 */
var close = exports.close = function close(id) {
    $('#' + id).fadeOut('fast', function () {
        $(this).parent('form').remove();
    });
    if (!_Info2.default.isMobile) {
        $(window).off('resize.' + id);
    }
    return false;
};

},{"./Info":8,"./Public":16,"./Util":21}],7:[function(require,module,exports){
/* 首页模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addPromoteHaloInterval = exports.addThreadFastGotoLink = exports.smRankChangeAlert = exports.smLevelUpAlert = undefined;

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Msg = require('./Msg');

var Msg = _interopRequireWildcard(_Msg);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Log = require('./Log');

var Log = _interopRequireWildcard(_Log);

var _TmpLog = require('./TmpLog');

var TmpLog = _interopRequireWildcard(_TmpLog);

var _Loot = require('./Loot');

var Loot = _interopRequireWildcard(_Loot);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 在神秘等级升级后进行提醒
 */
var smLevelUpAlert = exports.smLevelUpAlert = function smLevelUpAlert() {
    var smLevel = parseInt($('#pdSmLevel').data('sm-level'));
    if (!smLevel) return;

    /**
     * 写入神秘等级数据
     * @param {number} smLevel 神秘等级
     */
    var writeData = function writeData(smLevel) {
        TmpLog.setValue(_Const2.default.smLevelUpTmpLogName, { time: $.now(), smLevel: smLevel });
    };

    var data = TmpLog.getValue(_Const2.default.smLevelUpTmpLogName);
    if (!data || $.type(data.time) !== 'number' || $.type(data.smLevel) !== 'number') {
        writeData(smLevel);
    } else if (smLevel > data.smLevel) {
        var diff = Math.floor(($.now() - data.time) / 60 / 60 / 1000);
        if (diff >= _Const2.default.smLevelUpAlertInterval) {
            var date = new Date(data.time);
            writeData(smLevel);
            Log.push('神秘等级升级', '\u81EA`' + Util.getDateString(date) + '`\u4EE5\u6765\uFF0C\u4F60\u7684\u795E\u79D8\u7B49\u7EA7\u5171\u4E0A\u5347\u4E86`' + (smLevel - data.smLevel) + '`\u7EA7 (Lv.`' + data.smLevel + '`->Lv.`' + smLevel + '`)');
            Msg.show('\u81EA<em>' + Util.getDateString(date) + '</em>\u4EE5\u6765\uFF0C\u4F60\u7684\u795E\u79D8\u7B49\u7EA7\u5171\u4E0A\u5347\u4E86<em>' + (smLevel - data.smLevel) + '</em>\u7EA7');
        } else if (diff < 0) {
            writeData(smLevel);
        }
    } else if (smLevel < data.smLevel) {
        writeData(smLevel);
    }
};

/**
 * 在神秘系数排名发生变化时进行提醒
 */
var smRankChangeAlert = exports.smRankChangeAlert = function smRankChangeAlert() {
    var smRank = $('#pdSmLevel').data('sm-rank');
    if (!smRank || smRank.toString().endsWith('+')) return;
    smRank = parseInt(smRank);

    /**
     * 写入神秘系数排名数据
     * @param {number} smRank 神秘系数排名
     */
    var writeData = function writeData(smRank) {
        return TmpLog.setValue(_Const2.default.smRankChangeTmpLogName, { time: $.now(), smRank: smRank });
    };

    var data = TmpLog.getValue(_Const2.default.smRankChangeTmpLogName);
    if (!data || $.type(data.time) !== 'number' || $.type(data.smRank) !== 'number') {
        writeData(smRank);
    } else if (smRank !== data.smRank) {
        var diff = Math.floor(($.now() - data.time) / 60 / 60 / 1000);
        if (diff >= _Const2.default.smRankChangeAlertInterval) {
            var date = new Date(data.time);
            var isUp = smRank < data.smRank;
            writeData(smRank);
            Log.push('神秘系数排名变化', '\u81EA`' + Util.getDateString(date) + '`\u4EE5\u6765\uFF0C\u4F60\u7684\u795E\u79D8\u7CFB\u6570\u6392\u540D\u5171`' + (isUp ? '上升' : '下降') + '`\u4E86`' + Math.abs(smRank - data.smRank) + '`\u540D ' + ('(No.`' + data.smRank + '`->No.`' + smRank + '`)'));
            Msg.show('\u81EA<em>' + Util.getDateString(date) + '</em>\u4EE5\u6765\uFF0C\u4F60\u7684\u795E\u79D8\u7CFB\u6570\u6392\u540D\u5171<b style="color: ' + (isUp ? '#F00' : '#393') + '">' + (isUp ? '上升' : '下降') + '</b>\u4E86' + ('<em>' + Math.abs(smRank - data.smRank) + '</em>\u540D'));
        } else if (diff < 0) {
            writeData(smRank);
        }
    }
};

/**
 * 在首页帖子链接旁添加快速跳转至页末的链接
 */
var addThreadFastGotoLink = exports.addThreadFastGotoLink = function addThreadFastGotoLink() {
    $('#alldiv > .drow:last-child').on('click', 'span.indexlbtc_s, span.k_fr', function (e) {
        var $this = $(this);
        var url = $this.parent('a').attr('href');
        if (url) {
            e.preventDefault();
            location.href = url + '&page=e#a';
            return false;
        }
    });
};

/**
 * 添加提升战力光环间隔时间
 */
var addPromoteHaloInterval = exports.addPromoteHaloInterval = function addPromoteHaloInterval() {
    var nextTime = parseInt(Util.getCookie(_Const2.default.promoteHaloCookieName));
    if (!nextTime) return;
    var interval = nextTime - $.now();
    if (interval > 0) {
        var minutes = Math.ceil(interval / 60 / 1000);
        var hours = Math.floor(minutes / 60);
        minutes -= hours * 60;
        $('#pdLoot').append('<span id="pdHaloInterval"> (\u5149\u73AF\uFF1A' + (hours > 0 ? hours + '时' : '') + minutes + '\u5206)</span>');
    }
};

},{"./Const":5,"./Info":8,"./Log":10,"./Loot":12,"./Msg":13,"./TmpLog":20,"./Util":21}],8:[function(require,module,exports){
/* 信息模块 */
'use strict';

/**
 * 信息类
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Info = {
  // 用户ID
  uid: 0,
  // 用户名
  userName: '',
  // 是否位于首页
  isInHomePage: location.pathname === '/' || location.pathname === '/index.php',
  // 是否为移动版
  isMobile: false,
  // 当前域名是否在特殊域名下
  isInSpecialDomain: location.host.endsWith('.miaola.info') || location.host.endsWith('.miaola.work') || location.host.endsWith('.koyuki.cc'),
  // 版本号
  version: '',
  // 当前窗口
  w: typeof unsafeWindow !== 'undefined' ? unsafeWindow : window,
  /**
   * 助手设置和日志的存储位置类型
   * Default：存储在浏览器的localStorage中，设置仅按域名区分，日志同时按域名和uid区分；
   * ByUid：存储在油猴脚本的数据库中，设置和日志仅按uid区分;
   * Global：存储在油猴脚本的数据库中，各域名和各uid均使用全局设置，日志仅按uid区分；
   */
  storageType: 'Default',
  // 用户菜单区域
  $userMenu: $('#kf_information > ul'),
  // AJAX请求统计
  ajaxStat: {}
};

exports.default = Info;

},{}],9:[function(require,module,exports){
/* 物品模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.showBuyItemTips = exports.showMyInfoInItemShop = exports.buyItems = exports.sellItems = exports.useItems = exports.getItemsUsedNumInfo = exports.getLevelByName = exports.getArmsLevelInfo = exports.getArmInfo = exports.getArmClassNameByGroupName = exports.smeltArms = exports.showArmsFinalAddition = exports.addCommonArmsButton = exports.handleUselessSubProperties = exports.getArmParameterSetting = exports.bindArmLinkClickEvent = exports.sortArmsById = exports.sortArmsByGroup = exports.handleArmArea = exports.addSavedArmsInfo = exports.getMergeArmsInfo = exports.clearArmsInfo = exports.writeArmsInfo = exports.readArmsInfo = exports.openBoxes = exports.autoOpenBoxes = exports.getNextObjects = exports.init = exports.itemTypeList = exports.armTypeList = exports.armGroupList = exports.armClassList = exports.boxTypeList = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Msg = require('./Msg');

var Msg = _interopRequireWildcard(_Msg);

var _Dialog = require('./Dialog');

var Dialog = _interopRequireWildcard(_Dialog);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Config = require('./Config');

var _Log = require('./Log');

var Log = _interopRequireWildcard(_Log);

var _Script = require('./Script');

var Script = _interopRequireWildcard(_Script);

var _Public = require('./Public');

var Public = _interopRequireWildcard(_Public);

var _Loot = require('./Loot');

var Loot = _interopRequireWildcard(_Loot);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// 盒子区域
var $boxArea = void 0;
// 装备区域
var $armArea = void 0;
// 物品区域
var $itemArea = void 0;
// SafeID
var safeId = void 0;

// 盒子种类列表
var boxTypeList = exports.boxTypeList = ['普通盒子', '幸运盒子', '稀有盒子', '传奇盒子', '神秘盒子'];

// 装备类别列表
var armClassList = exports.armClassList = ['武器', '护甲', '项链'];
// 装备组别列表
var armGroupList = exports.armGroupList = ['长剑', '短弓', '法杖', '铠甲', '皮甲', '布甲'];
// 装备种类列表
var armTypeList = exports.armTypeList = ['普通的装备', '幸运的装备', '稀有的装备', '传奇的装备', '神秘的装备'];

// 道具种类列表
var itemTypeList = exports.itemTypeList = ['零时迷子的碎片', '被遗弃的告白信', '学校天台的钥匙', 'TMA最新作压缩包', 'LOLI的钱包', '棒棒糖', '蕾米莉亚同人漫画', '十六夜同人漫画', '档案室钥匙', '傲娇LOLI娇蛮音CD', '整形优惠卷', '消逝之药'];

/**
 * 初始化
 */
var init = exports.init = function init() {
    safeId = Public.getSafeId();
    if (!safeId) return;
    $boxArea = $('.kf_fw_ig1:eq(0)');
    $boxArea.attr('id', 'pdBoxArea');
    $armArea = $('.kf_fw_ig4:eq(0)');
    $armArea.attr('id', 'pdArmArea');
    $itemArea = $('.kf_fw_ig1:eq(1)');
    $itemArea.attr('id', 'pdItemArea');

    addBatchOpenBoxesLink();
    addOpenAllBoxesButton();

    if (Config.autoSaveArmsInfoEnabled) {
        addSavedArmsInfo($armArea);
    }
    handleArmArea($armArea);
    bindArmLinkClickEvent($armArea, safeId);

    addArmsButton();
    addBatchUseAndSellItemsButton();
};

/**
 * 获取下一批物品
 * @param {number} sequence 下一批物品的插入顺序，1：向前插入；2：往后添加
 * @param {function} callback 回调函数
 */
var getNextObjects = exports.getNextObjects = function getNextObjects() {
    var sequence = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    console.log('获取下一批物品Start');
    $.ajax({
        type: 'GET',
        url: 'kf_fw_ig_mybp.php?t=' + $.now(),
        timeout: _Const2.default.defAjaxTimeout,
        async: !Config.autoSaveArmsInfoEnabled
    }).done(function (html) {
        for (var index = 1; index <= 2; index++) {
            var matches = null;
            if (index === 1) {
                matches = /<tr><td width="\d+%">装备.+?\r\n(<tr.+?<\/tr>)<tr><td colspan="4">/.exec(html);
            } else {
                matches = /<tr><td width="\d+%">使用.+?\r\n(<tr.+?<\/tr>)<tr><td colspan="4">/.exec(html);
            }
            if (!matches) continue;
            var trMatches = matches[1].match(/<tr(.+?)<\/tr>/g);
            var $area = index === 1 ? $armArea : $itemArea;
            var addHtml = '';
            var newArmsInfo = { '已装备武器': 0, '已装备护甲': 0, '上次记录的最新装备': 0, '上次记录的时间': 0, '装备列表': {} };
            for (var i in trMatches) {
                var idMatches = /"wp_(\d+)"/.exec(trMatches[i]);
                if (!idMatches) continue;
                var id = parseInt(idMatches[1]);
                if (!$area.has('[id="wp_' + id + '"]').length) {
                    addHtml += trMatches[i];
                }
                if (index === 1) {
                    newArmsInfo['装备列表'][id] = trMatches[i];
                    var equippedArmMatches = /<tr id="wp_(\d+)">.+?（装备中）<span[^<>]*>[^<>]+的([^<>]+)<\/span>/.exec(trMatches[i]);
                    if (equippedArmMatches) {
                        var equippedArmId = parseInt(equippedArmMatches[1]);
                        var armClassName = getArmClassNameByGroupName(equippedArmMatches[2]);
                        if (armClassName) {
                            newArmsInfo['\u5DF2\u88C5\u5907' + armClassName] = equippedArmId;
                        }
                    }
                }
            }
            if (index === 1 && Config.autoSaveArmsInfoEnabled) {
                var armsInfo = readArmsInfo();
                if (newArmsInfo['已装备武器'] > 0) armsInfo['已装备武器'] = newArmsInfo['已装备武器'];
                if (newArmsInfo['已装备护甲'] > 0) armsInfo['已装备护甲'] = newArmsInfo['已装备护甲'];
                $.extend(armsInfo['装备列表'], newArmsInfo['装备列表']);
                writeArmsInfo(armsInfo);
            }
            if (addHtml) {
                if (sequence === 2) {
                    $area.find('> tbody > tr:last-child').before(addHtml);
                } else {
                    $area.find('> tbody > tr:nth-child(2)').after(addHtml);
                }
                if (index === 1) {
                    handleArmArea($armArea);
                }
            }
        }
        if (typeof callback === 'function') callback();
    }).fail(function () {
        setTimeout(function () {
            return getNextObjects(sequence, callback);
        }, _Const2.default.defAjaxInterval);
    });
};

/**
 * 添加批量打开盒子链接
 */
var addBatchOpenBoxesLink = function addBatchOpenBoxesLink() {
    $boxArea = $('.kf_fw_ig1:first');
    $boxArea.find('> tbody > tr:nth-child(3) > td > a[onclick^="dkhz"]').each(function () {
        var $this = $(this);
        var matches = /dkhz\('(\d+)'\)/.exec($this.attr('onclick'));
        if (!matches) return;
        $this.after('<a class="pd_highlight" href="#" data-name="openBoxes" data-id="' + matches[1] + '" style="margin-left: 10px;">\u6279\u91CF\u6253\u5F00</a>');
    });

    $boxArea.on('click', 'a[data-name="openBoxes"]', function (e) {
        e.preventDefault();
        var $this = $(this);
        var id = parseInt($this.data('id'));
        var $info = $boxArea.find('> tbody > tr:nth-child(2) > td:nth-child(' + id + ')');
        var boxType = $info.find('span:first').text().trim() + '盒子';
        if (!boxTypeList.includes(boxType)) return;
        var currentNum = parseInt($info.find('span:last').text());
        var num = parseInt(prompt('\u4F60\u8981\u6253\u5F00\u591A\u5C11\u4E2A\u3010' + boxType + '\u3011\uFF1F', currentNum));
        if (!num || num < 0) return;
        Msg.destroy();
        if (Config.autoSaveArmsInfoEnabled) {
            getNextObjects(1);
        }
        openBoxes({ id: id, boxType: boxType, num: num, safeId: safeId });
    });
};

/**
 * 添加一键开盒按钮
 */
var addOpenAllBoxesButton = function addOpenAllBoxesButton() {
    $('\n<div class="pd_item_btns" data-name="openBoxesBtns">\n  <label>\n    <input name="autoSaveArmsInfoEnabled" type="checkbox" ' + (Config.autoSaveArmsInfoEnabled ? 'checked' : '') + '> \u4FDD\u5B58\u88C5\u5907\u4FE1\u606F</input>\n    <span class="pd_cfg_tips" title="\u5728\u6279\u91CF\u6253\u5F00\u76D2\u5B50\u65F6\u81EA\u52A8\u4FDD\u5B58\u88C5\u5907\u4FE1\u606F\uFF0C\u53EF\u7A81\u7834\u88C5\u5907\u80CC\u5305\u6700\u591A\u663E\u793A10\u4EF6\u7684\u9650\u5236">[?]</span>\n  </label>\n  <button name="clearMsg" type="button" title="\u6E05\u9664\u9875\u9762\u4E0A\u6240\u6709\u7684\u6D88\u606F\u548C\u64CD\u4F5C\u7ED3\u679C">\u6E05\u9664\u6D88\u606F</button>\n  <button name="openAllBoxes" type="button" style="color: #f00;" title="\u6253\u5F00\u5168\u90E8\u76D2\u5B50">\u4E00\u952E\u5F00\u76D2</button>\n</div>\n').insertAfter($boxArea).find('[name="autoSaveArmsInfoEnabled"]').click(function () {
        var checked = $(this).prop('checked');
        if (Config.autoSaveArmsInfoEnabled !== checked) {
            (0, _Config.read)();
            Config.autoSaveArmsInfoEnabled = checked;
            (0, _Config.write)();
        }
    }).end().find('[name="clearMsg"]').click(function () {
        Msg.destroy();
        $('.pd_result').remove();
    }).end().find('[name="openAllBoxes"]').click(showOpenAllBoxesDialog);
    Public.addSlowActionChecked($('.pd_item_btns[data-name="openBoxesBtns"]'));
};

/**
 * 显示一键开盒对话框
 */
var showOpenAllBoxesDialog = function showOpenAllBoxesDialog() {
    var dialogName = 'pdOpenAllBoxesDialog';
    if ($('#' + dialogName).length > 0) return;
    Msg.destroy();
    (0, _Config.read)();

    var boxTypesOptionHtml = '';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = boxTypeList.slice(0, 4)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var boxName = _step.value;

            boxTypesOptionHtml += '<option>' + boxName + '</option>';
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var armTypesCheckedHtml = '';
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = armGroupList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var group = _step2.value;

            armTypesCheckedHtml += '<li><b>' + group + '\uFF1A</b>';
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = armTypeList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var type = _step4.value;

                    var prefix = type.split('的')[0];
                    if (prefix === '神秘') continue;
                    var name = prefix + '\u7684' + group;
                    armTypesCheckedHtml += '\n<label style="margin-right: 5px;">\n  <input type="checkbox" name="smeltArmsType" value="' + name + '" ' + (Config.defSmeltArmTypeList.includes(name) ? 'checked' : '') + '> ' + prefix + '\n</label>';
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            armTypesCheckedHtml += '</li>';
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    var itemTypesOptionHtml = '';
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = itemTypeList.slice(6)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var itemName = _step3.value;

            itemTypesOptionHtml += '<option>' + itemName + '</option>';
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    var html = '\n<div class="pd_cfg_main">\n  <fieldset style="margin-top: 5px;">\n    <legend>\u8BF7\u9009\u62E9\u60F3\u6279\u91CF\u6253\u5F00\u7684\u76D2\u5B50\u79CD\u7C7B\uFF08\u6309<b>Ctrl\u952E</b>\u6216<b>Shift\u952E</b>\u53EF\u591A\u9009\uFF09\uFF1A</legend>\n    <select name="openBoxesTypes" size="4" style="width: 320px;" multiple>' + boxTypesOptionHtml + '</select>\n  </fieldset>\n  <div style="margin-top: 5px;"><b>\u8BF7\u9009\u62E9\u6279\u91CF\u6253\u5F00\u76D2\u5B50\u540E\u60F3\u8981\u8FDB\u884C\u7684\u64CD\u4F5C\uFF08\u5982\u65E0\u9700\u64CD\u4F5C\u53EF\u4E0D\u7528\u52FE\u9009\uFF09\uFF1A</b></div>\n  <fieldset>\n    <legend>\n      <label><input name="smeltArmsAfterOpenBoxesEnabled" type="checkbox"> \u7194\u70BC\u88C5\u5907</label>\n    </legend>\n    <div>\u8BF7\u9009\u62E9\u60F3\u6279\u91CF\u7194\u70BC\u7684\u88C5\u5907\u79CD\u7C7B\uFF1A</div>\n    <ul data-name="smeltArmTypeList">' + armTypesCheckedHtml + '</ul>\n    <div>\n      <a class="pd_btn_link" href="#" data-name="selectAll">\u5168\u9009</a>\n      <a class="pd_btn_link" href="#" data-name="selectInverse">\u53CD\u9009</a>\n    </div>\n  </fieldset>\n  <fieldset>\n    <legend>\n      <label><input name="useItemsAfterOpenBoxesEnabled" type="checkbox"> \u4F7F\u7528\u9053\u5177</label>\n    </legend>\n    <div>\u8BF7\u9009\u62E9\u60F3\u6279\u91CF\u4F7F\u7528\u7684\u9053\u5177\u79CD\u7C7B\uFF08\u6309<b>Ctrl\u952E</b>\u6216<b>Shift\u952E</b>\u53EF\u591A\u9009\uFF09\uFF1A</div>\n    <select name="useItemTypes" size="6" style="width: 320px;" multiple>' + itemTypesOptionHtml + '</select>\n  </fieldset>\n  <fieldset>\n    <legend>\n      <label><input name="sellItemsAfterOpenBoxesEnabled" type="checkbox"> \u51FA\u552E\u9053\u5177</label>\n    </legend>\n    <div>\u8BF7\u9009\u62E9\u60F3\u6279\u91CF\u51FA\u552E\u7684\u9053\u5177\u79CD\u7C7B\uFF08\u6309<b>Ctrl\u952E</b>\u6216<b>Shift\u952E</b>\u53EF\u591A\u9009\uFF09\uFF1A</div>\n    <select name="sellItemTypes" size="6" style="width: 320px;" multiple>' + itemTypesOptionHtml + '</select>\n  </fieldset>\n  <div style="margin-top: 5px;">\n    <label>\n      <input name="showArmsFinalAdditionAfterOpenBoxesEnabled" type="checkbox"> \u5728\u4E00\u952E\u5F00\u76D2\u540E\u663E\u793A\u88C5\u5907\u6700\u7EC8\u52A0\u6210\n      <span class="pd_cfg_tips" title="\u5728\u4E00\u952E\u5F00\u76D2\uFF08\u5E76\u6267\u884C\u540E\u7EED\u64CD\u4F5C\uFF09\u540E\u663E\u793A\u5F53\u524D\u9875\u9762\u4E0A\u88C5\u5907\u7684\u6700\u7EC8\u52A0\u6210\u4FE1\u606F">[?]</span>\n    </label>\n  </div>\n</div>\n<div class="pd_cfg_btns">\n  <button name="open" type="button" style="color: #f00;">\u4E00\u952E\u5F00\u76D2</button>\n  <button name="save" type="button">\u4FDD\u5B58\u8BBE\u7F6E</button>\n  <button data-action="close" type="button">\u5173\u95ED</button>\n</div>';
    var $dialog = Dialog.create(dialogName, '一键开盒', html);
    var $smeltArmTypeList = $dialog.find('ul[data-name="smeltArmTypeList"]');

    /**
     * 保存设置
     */
    var saveSettings = function saveSettings() {
        (0, _Config.read)();
        var tmpBoxTypeList = $dialog.find('select[name="openBoxesTypes"]').val();
        if (!Array.isArray(tmpBoxTypeList)) tmpBoxTypeList = [];
        Config.defOpenBoxTypeList = tmpBoxTypeList;

        $dialog.find('[type="checkbox"]').each(function () {
            var $this = $(this);
            var name = $this.attr('name');
            if (name in Config) {
                Config[name] = Boolean($this.prop('checked'));
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
            var _typeList = $dialog.find('select[name="useItemTypes"]').val();
            if (Array.isArray(_typeList)) Config.defUseItemTypeList = _typeList;else Config.useItemsAfterOpenBoxesEnabled = false;
        }
        if (Config.sellItemsAfterOpenBoxesEnabled) {
            var _typeList2 = $dialog.find('select[name="sellItemTypes"]').val();
            if (Array.isArray(_typeList2)) Config.defSellItemTypeList = _typeList2;else Config.sellItemsAfterOpenBoxesEnabled = false;
        }

        (0, _Config.write)();
    };

    $dialog.find('[name="open"]').click(function () {
        if (!$dialog.find('select[name="openBoxesTypes"]').val()) {
            alert('未选择盒子种类');
            return;
        }
        if (!confirm('是否一键开盒（并执行所选操作）？')) return;
        saveSettings();
        Dialog.close(dialogName);
        if (Config.autoSaveArmsInfoEnabled) {
            getNextObjects(1);
        }
        $(document).clearQueue('OpenAllBoxes');
        $boxArea.find('> tbody > tr:nth-child(2) > td').each(function (index) {
            var $this = $(this);
            var boxType = $this.find('span:first').text().trim() + '盒子';
            if (!Config.defOpenBoxTypeList.includes(boxType)) return;
            var num = parseInt($this.find('span:last').text());
            if (!num || num < 0) return;
            var id = parseInt($boxArea.find('> tbody > tr:nth-child(3) > td:nth-child(' + (index + 1) + ') > a[data-name="openBoxes"]').data('id'));
            if (!id) return;
            $(document).queue('OpenAllBoxes', function () {
                return openBoxes({ id: id, boxType: boxType, num: num, safeId: safeId, nextActionEnabled: true });
            });
        });
        $(document).dequeue('OpenAllBoxes');
    }).end().find('[name="save"]').click(function () {
        saveSettings();
        alert('设置已保存');
    }).end().find('a[data-name="selectAll"]').click(function () {
        return Util.selectAll($smeltArmTypeList.find('input[name="smeltArmsType"]'));
    }).end().find('a[data-name="selectInverse"]').click(function () {
        return Util.selectInverse($smeltArmTypeList.find('input[name="smeltArmsType"]'));
    });

    $dialog.on('keydown', 'select[name$="Types"]', function (e) {
        if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            $(this).children().prop('selected', true);
        }
    }).find('[type="checkbox"]').each(function () {
        var $this = $(this);
        var name = $this.attr('name');
        if (name in Config) {
            $this.prop('checked', Config[name] === true);
        }
    });

    $dialog.find('select[name$="Types"]').each(function (index) {
        var $this = $(this);
        var typeList = Config.defOpenBoxTypeList;
        if (index === 1) typeList = Config.defUseItemTypeList;else if (index === 2) typeList = Config.defSellItemTypeList;
        $this.find('option').each(function () {
            var $this = $(this);
            if (typeList.includes($this.val())) {
                $this.prop('selected', true);
            }
        });
    });

    Dialog.show(dialogName);
    Script.runFunc('Item.showOpenAllBoxes_after_');
};

/**
 * 自动一键开盒
 */
var autoOpenBoxes = exports.autoOpenBoxes = function autoOpenBoxes() {
    var safeId = Public.getSafeId();
    if (!safeId) {
        $(document).dequeue('AutoAction');
        return;
    }
    $(document).clearQueue('OpenAllBoxes');
    $boxArea.find('> tbody > tr:nth-child(2) > td').each(function (index) {
        var $this = $(this);
        var boxType = $this.find('span:first').text().trim() + '盒子';
        if (!Config.defOpenBoxTypeList.includes(boxType)) return;
        var num = parseInt($this.find('span:last').text());
        if (!num || num < 0) return;
        var id = parseInt($boxArea.find('> tbody > tr:nth-child(3) > td:nth-child(' + (index + 1) + ') > a[data-name="openBoxes"]').data('id'));
        if (!id) return;
        $(document).queue('OpenAllBoxes', function () {
            return openBoxes({ id: id, boxType: boxType, num: num, safeId: safeId, nextActionEnabled: true });
        });
    });
    $(document).dequeue('OpenAllBoxes');
    $(document).dequeue('AutoAction');
};

/**
 * 打开盒子
 * @param {number} id 盒子类型ID
 * @param {string} boxType 盒子类型名称
 * @param {number} num 打开盒子数量
 * @param {string} safeId SafeID
 * @param {boolean} nextActionEnabled 是否执行后续操作
 */
var openBoxes = exports.openBoxes = function openBoxes(_ref) {
    var id = _ref.id,
        boxType = _ref.boxType,
        num = _ref.num,
        safeId = _ref.safeId,
        _ref$nextActionEnable = _ref.nextActionEnabled,
        nextActionEnabled = _ref$nextActionEnable === undefined ? false : _ref$nextActionEnable;

    var successNum = 0,
        failNum = 0,
        index = 0;
    var randomTotalNum = 0,
        randomTotalCount = 0;
    var isStop = false;
    var stat = { 'KFB': 0, '经验值': 0, '道具': 0, '装备': 0, item: {}, arm: {} };

    /**
     * 打开
     */
    var open = function open() {
        $.ajax({
            type: 'POST',
            url: 'kf_fw_ig_mybpdt.php',
            data: 'do=3&id=' + id + '&safeid=' + safeId,
            timeout: _Const2.default.defAjaxTimeout
        }).done(function (html) {
            index++;
            var msg = Util.removeHtmlTag(html);
            if (msg.includes('获得')) {
                successNum++;
                var matches = /获得\[(\d+)]KFB/.exec(msg);
                if (matches) stat['KFB'] += parseInt(matches[1]);

                matches = /获得\[(\d+)]经验值/.exec(msg);
                if (matches) stat['经验值'] += parseInt(matches[1]);

                matches = /打开盒子获得了道具\[\s*(.+?)\s*]/.exec(msg);
                if (matches) {
                    stat['道具']++;
                    var itemName = matches[1];
                    if (!(itemName in stat.item)) stat.item[itemName] = 0;
                    stat.item[itemName]++;
                }

                matches = /获得一件\[(.+?)]的?装备/.exec(msg);
                if (matches) {
                    stat['装备']++;
                    var armType = matches[1] + '装备';
                    if (!(armType in stat.arm)) stat.arm[armType] = 0;
                    stat.arm[armType]++;
                }

                matches = /随机值(\d+)/.exec(msg);
                if (matches) {
                    randomTotalCount++;
                    randomTotalNum += parseInt(matches[1]);
                }
            } else if (msg.includes('操作过快')) {
                $(document).queue('OpenBoxes', open);
            } else if (msg.includes('盒子不足') || msg.includes('错误的安全码')) {
                $(document).clearQueue('OpenBoxes');
                isStop = true;
            } else {
                failNum++;
            }

            console.log('\u7B2C' + index + '\u6B21\uFF1A' + msg);
            $('.pd_result[data-name="boxResult"]:last').append('<li><b>\u7B2C' + index + '\u6B21\uFF1A</b>' + msg + '</li>');
            Script.runFunc('Item.openBoxes_success_', msg);
        }).fail(function () {
            failNum++;
        }).always(function () {
            var length = $(document).queue('OpenBoxes').length;
            var $countdown = $('.pd_countdown:last');
            $countdown.text(length);
            var isPause = $countdown.closest('.pd_msg').data('stop');
            isStop = isStop || isPause;
            if (isPause) {
                $(document).clearQueue('OpenAllBoxes');
                nextActionEnabled = false;
            }

            if (isStop || !length) {
                Msg.remove($wait);
                var avgRandomNum = randomTotalCount > 0 ? Util.getFixedNumLocStr(randomTotalNum / randomTotalCount, 2) : 0;
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = Util.entries(stat)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var _step5$value = _slicedToArray(_step5.value, 2),
                            key = _step5$value[0],
                            value = _step5$value[1];

                        if (!value || $.type(value) === 'object' && $.isEmptyObject(value)) {
                            delete stat[key];
                        }
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }

                if (!$.isEmptyObject(stat)) {
                    Log.push('打开盒子', '\u5171\u6709`' + successNum + '`\u4E2A\u3010`' + boxType + '`\u3011\u6253\u5F00\u6210\u529F (\u5E73\u5747\u968F\u673A\u503C\u3010`' + avgRandomNum + '`\u3011)', {
                        gain: stat,
                        pay: { '盒子': -successNum }
                    });
                }

                var $currentNum = $boxArea.find('> tbody > tr:nth-child(2) > td:nth-child(' + id + ') > span:last');
                var prevNum = parseInt($currentNum.text());
                if (prevNum > 0) {
                    $currentNum.text(prevNum - successNum);
                }

                var resultStatHtml = '',
                    msgStatHtml = '';
                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = Util.entries(stat)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var _step6$value = _slicedToArray(_step6.value, 2),
                            key = _step6$value[0],
                            value = _step6$value[1];

                        var tmpHtml = '';
                        if ($.type(value) === 'object') {
                            resultStatHtml += resultStatHtml ? '<br>' : '';
                            msgStatHtml += msgStatHtml ? '<br>' : '';
                            resultStatHtml += (key === 'item' ? '道具' : '装备') + '\uFF1A';

                            var typeList = key === 'item' ? itemTypeList : armTypeList;
                            var _iteratorNormalCompletion7 = true;
                            var _didIteratorError7 = false;
                            var _iteratorError7 = undefined;

                            try {
                                for (var _iterator7 = Util.getSortedObjectKeyList(typeList, value)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                    var name = _step7.value;

                                    tmpHtml += '<i>' + name + '<em>+' + value[name].toLocaleString() + '</em></i> ';
                                }
                            } catch (err) {
                                _didIteratorError7 = true;
                                _iteratorError7 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                        _iterator7.return();
                                    }
                                } finally {
                                    if (_didIteratorError7) {
                                        throw _iteratorError7;
                                    }
                                }
                            }
                        } else {
                            tmpHtml += '<i>' + key + '<em>+' + value.toLocaleString() + '</em></i> ';
                        }
                        resultStatHtml += tmpHtml;
                        msgStatHtml += tmpHtml.trim();
                    }
                } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                        }
                    } finally {
                        if (_didIteratorError6) {
                            throw _iteratorError6;
                        }
                    }
                }

                if (msgStatHtml.length < 200) {
                    msgStatHtml = msgStatHtml.replace(/(.*)<br>/, '$1');
                }
                $('.pd_result[data-name="boxResult"]:last').append('\n<li class="pd_stat">\n  <b>\u7EDF\u8BA1\u7ED3\u679C\uFF08\u5E73\u5747\u968F\u673A\u503C\u3010<em>' + avgRandomNum + '</em>\u3011\uFF09\uFF1A</b><br>\n  ' + (resultStatHtml ? resultStatHtml : '无') + '\n</li>\n');
                console.log('\u5171\u6709' + successNum + '\u4E2A\u3010' + boxType + '\u3011\u6253\u5F00\u6210\u529F\uFF08\u5E73\u5747\u968F\u673A\u503C\u3010' + avgRandomNum + '\u3011\uFF09' + (failNum > 0 ? '\uFF0C\u5171\u6709' + failNum + '\u4E2A\u76D2\u5B50\u65E0\u6CD5\u83B7\u53D6\u7ED3\u679C' : ''));
                Msg.show('<strong>\u5171\u6709<em>' + successNum + '</em>\u4E2A\u3010' + boxType + '\u3011\u6253\u5F00\u6210\u529F\uFF08\u5E73\u5747\u968F\u673A\u503C\u3010<em>' + avgRandomNum + '</em>\u3011\uFF09' + ((failNum > 0 ? '\uFF0C\u5171\u6709<em>' + failNum + '</em>\u4E2A\u76D2\u5B50\u65E0\u6CD5\u83B7\u53D6\u7ED3\u679C' : '') + '</strong>' + (msgStatHtml.length > 25 ? '<br>' + msgStatHtml : msgStatHtml)), -1);

                Script.runFunc('Item.openBoxes_after_', stat);
                setTimeout(function () {
                    return getNextObjects(1);
                }, _Const2.default.defAjaxInterval);
                if ($(document).queue('OpenAllBoxes').length > 0) {
                    setTimeout(function () {
                        return $(document).dequeue('OpenAllBoxes');
                    }, typeof _Const2.default.specialAjaxInterval === 'function' ? _Const2.default.specialAjaxInterval() : _Const2.default.specialAjaxInterval);
                } else if (nextActionEnabled) {
                    var action = null;
                    if (Config.smeltArmsAfterOpenBoxesEnabled) {
                        action = function action() {
                            return smeltArms({ typeList: Config.defSmeltArmTypeList, safeId: safeId, nextActionEnabled: nextActionEnabled });
                        };
                    } else if (Config.useItemsAfterOpenBoxesEnabled) {
                        action = function action() {
                            return useItems({ typeList: Config.defUseItemTypeList, safeId: safeId, nextActionEnabled: nextActionEnabled });
                        };
                    } else if (Config.sellItemsAfterOpenBoxesEnabled) {
                        action = function action() {
                            return sellItems({ typeList: Config.defSellItemTypeList, safeId: safeId, nextActionEnabled: nextActionEnabled });
                        };
                    }
                    if (action) {
                        setTimeout(action, _Const2.default.minActionInterval);
                    } else if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
                        showArmsFinalAdditionAfterOpenBoxes();
                    }
                }
            } else {
                if (index % 10 === 0) {
                    setTimeout(function () {
                        return getNextObjects(1);
                    }, _Const2.default.defAjaxInterval);
                }
                setTimeout(function () {
                    return $(document).dequeue('OpenBoxes');
                }, typeof _Const2.default.specialAjaxInterval === 'function' ? _Const2.default.specialAjaxInterval() : _Const2.default.specialAjaxInterval);
            }
        });
    };

    $boxArea.parent().append('<ul class="pd_result" data-name="boxResult"><li><strong>\u3010' + boxType + '\u3011\u6253\u5F00\u7ED3\u679C\uFF1A</strong></li></ul>');
    var $wait = Msg.wait('<strong>\u6B63\u5728\u6253\u5F00\u76D2\u5B50\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em class="pd_countdown">' + num + '</em></i><a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
    $(document).clearQueue('OpenBoxes');
    $.each(new Array(num), function () {
        $(document).queue('OpenBoxes', open);
    });
    $(document).dequeue('OpenBoxes');
};

/**
 * 在一键开盒后自动显示装备最终加成信息
 */
var showArmsFinalAdditionAfterOpenBoxes = function showArmsFinalAdditionAfterOpenBoxes() {
    if (_Info2.default.w.isShowArmsFinalAddition) return;
    _Info2.default.w.isShowArmsFinalAddition = true;

    var oriEquippedArmList = [];
    var armList = [];
    $armArea.find('tr[data-id]').each(function () {
        var $this = $(this);
        var armId = parseInt($this.data('id'));
        var armClass = $this.data('class');
        if (armId && armClass) {
            armList.push({ armId: armId, armClass: armClass });
        }
        if ($this.hasClass('pd_arm_equipped')) {
            oriEquippedArmList.push({ armId: armId, armClass: armClass });
        }
    });
    if (oriEquippedArmList.length < 2 && !confirm('未在当前页面上存在已装备的该类别装备，在操作后将装备为该页面上其类别的最后一件装备，是否继续？')) return;
    if (armList.length > 0) {
        console.log('在一键开盒后自动显示装备最终加成信息Start');
        if (_Const2.default.debug) console.log(oriEquippedArmList);
        showArmsFinalAddition(armList, oriEquippedArmList, safeId);
    }
};

// 保存我的装备信息的键值名称
var myArmsInfoName = _Const2.default.storagePrefix + 'myArmsInfo2';

/**
 * 读取我的装备信息
 * @returns {{}} 装备信息对象
 */
var readArmsInfo = exports.readArmsInfo = function readArmsInfo() {
    var info = { '已装备武器': 0, '已装备护甲': 0, '上次记录的最新装备': 0, '上次记录的时间': 0, '装备列表': {} };
    var options = Util.readData(myArmsInfoName + '_' + _Info2.default.uid);
    if (!options) return info;
    try {
        options = JSON.parse(options);
    } catch (ex) {
        return info;
    }
    if (!options || $.type(options) !== 'object' || $.type(options['装备列表']) !== 'object') return info;
    info = options;
    return info;
};

/**
 * 写入我的装备信息
 * @param {{}} info 装备信息对象
 */
var writeArmsInfo = exports.writeArmsInfo = function writeArmsInfo(info) {
    return Util.writeData(myArmsInfoName + '_' + _Info2.default.uid, JSON.stringify(info));
};

/**
 * 清除我的装备信息
 */
var clearArmsInfo = exports.clearArmsInfo = function clearArmsInfo() {
    return Util.deleteData(myArmsInfoName + '_' + _Info2.default.uid);
};

/**
 * 获取合并后的装备信息
 * @param {{}} info 当前装备信息
 * @param {{}} newInfo 新装备信息
 * @returns {{}} 合并后的装备信息
 */
var getMergeArmsInfo = exports.getMergeArmsInfo = function getMergeArmsInfo(info, newInfo) {
    for (var key in newInfo) {
        if (key === '装备列表') {
            for (var armId in newInfo['装备列表']) {
                armId = parseInt(armId);
                if (!armId || armId < 0) continue;
                info['装备列表'][armId] = newInfo['装备列表'][armId];
            }
        } else {
            info[key] = newInfo[key];
        }
    }
    return info;
};

/**
 * 添加已保存的我的装备信息
 * @param {jQuery} $armArea 装备区域节点
 */
var addSavedArmsInfo = exports.addSavedArmsInfo = function addSavedArmsInfo($armArea) {
    var armsInfo = readArmsInfo();
    var addHtml = '';
    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
        for (var _iterator8 = Object.keys(armsInfo['装备列表']).reverse()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var armId = _step8.value;

            if (!$armArea.find('[id="wp_' + armId + '"]').length) {
                addHtml += armsInfo['装备列表'][armId].replace(/(<tr(?: id="wp_\d+")?)>/, '$1 data-saved="true">');
            }
        }
    } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion8 && _iterator8.return) {
                _iterator8.return();
            }
        } finally {
            if (_didIteratorError8) {
                throw _iteratorError8;
            }
        }
    }

    $armArea.find('> tbody > tr:last-child').before(addHtml);
};

/**
 * 移除指定ID的已保存的装备信息
 * @param armId 装备ID
 * @param {jQuery} $armArea 装备区域节点
 */
var removeSavedArmInfo = function removeSavedArmInfo(armId, $armArea) {
    var armsInfo = readArmsInfo();
    delete armsInfo['装备列表'][armId];
    writeArmsInfo(armsInfo);
    $armArea.find('tr[data-id="' + armId + '"]').replaceWith('<tr><td colspan="3" style="color: #777;">该装备不存在</td></tr>');
};

/**
 * 处理装备区域
 * @param {jQuery} $armArea 装备区域节点
 * @param {number} type 页面类型，0：我的物品页面；1：争夺首页点数分配对话框
 */
var handleArmArea = exports.handleArmArea = function handleArmArea($armArea) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    $armArea.find('a[onclick^="cdzb"]').removeAttr('onclick').attr('data-name', 'equip');
    $armArea.find('a[onclick^="rlzb"]').removeAttr('onclick').attr('data-name', 'smelt');

    $armArea.find('tr[id^="wp_"]').each(function () {
        var $this = $(this);
        var id = $this.attr('id');
        var $td = $this.find('td');
        $td.removeAttr('colspan').removeAttr('style').css({ 'text-align': 'left', 'padding-left': '5px' });
        $td.html($td.html().replace('（装备中）', ''));
        $this.removeAttr('id').prepend('<td id="' + id + '"><a data-name="equip" href="javascript:;">\u88C5\u5907</a></td><td><a data-name="smelt" href="javascript:;">\u7194\u70BC</a></td>').addClass('pd_arm_equipped');
    });

    var writeArmsInfoflag = false;
    var armsInfo = Config.autoSaveArmsInfoEnabled ? readArmsInfo() : {};
    $armArea.find('tr:not([data-id]) > td[id^="wp_"]').each(function (index) {
        var $this = $(this);
        var matches = /wp_(\d+)/.exec($this.attr('id'));
        if (!matches) return;
        var armId = parseInt(matches[1]);
        var $tr = $this.parent('tr');
        var $td = $tr.find('> td:nth-child(3)');
        var html = $td.html();
        var armInfo = getArmInfo(html);
        $tr.attr('data-id', armId).attr('data-class', armInfo['类别']).attr('data-group', armInfo['组别']);
        var newArmMark = false;
        if (Config.autoSaveArmsInfoEnabled) {
            if (index === 0) {
                var today = Util.getMidnightHourDate(0);
                var prev = armsInfo['上次记录的时间'] && armsInfo['上次记录的最新装备'] ? new Date(armsInfo['上次记录的时间']) : new Date(0);
                prev.setHours(0, 0, 0, 0);
                if (Math.abs(today - prev) >= _Const2.default.newArmMarkDuration * 24 * 60 * 60 * 1000) {
                    console.log('更新最新装备记录');
                    writeArmsInfoflag = true;
                    armsInfo['上次记录的最新装备'] = armId;
                    armsInfo['上次记录的时间'] = $.now();
                }
            }
            if (armId > armsInfo['上次记录的最新装备']) newArmMark = true;
        }
        $td.html((newArmMark ? '<i class="pd_new_arm_mark">[新]</i> ' : '') + '<i class="pd_arm_id">[ID: ' + armId + ']</i> ' + handleUselessSubProperties(html));
        if (Config.armsMemo[armId]) {
            $td.attr('data-memo', Config.armsMemo[armId].replace(/"/g, ''));
        }
        if (type === 0) {
            $this.prepend('<input name="armCheck" type="checkbox" value="' + armId + '">');
        }
    });

    if (Config.sortArmsByGroupEnabled) {
        sortArmsByGroup($armArea);
    }

    if (Config.autoSaveArmsInfoEnabled) {
        if (!Config.sortArmsByGroupEnabled) {
            sortArmsById($armArea);
        }

        var realEquippedWeaponId = parseInt($armArea.find('.pd_arm_equipped[data-class="武器"]:not([data-saved="true"])').data('id'));
        var realEquippedArmorId = parseInt($armArea.find('.pd_arm_equipped[data-class="护甲"]:not([data-saved="true"])').data('id'));
        if (realEquippedWeaponId > 0 && armsInfo['已装备武器'] !== realEquippedWeaponId) {
            writeArmsInfoflag = true;
            armsInfo['已装备武器'] = realEquippedWeaponId;
        }
        if (realEquippedArmorId > 0 && armsInfo['已装备护甲'] !== realEquippedArmorId) {
            writeArmsInfoflag = true;
            armsInfo['已装备护甲'] = realEquippedArmorId;
        }
        if (writeArmsInfoflag) {
            writeArmsInfo(armsInfo);
        }
        $armArea.find('.pd_arm_equipped[data-saved="true"][data-class="\u6B66\u5668"]:not([data-id="' + armsInfo['已装备武器'] + '"])').removeClass('pd_arm_equipped');
        $armArea.find('.pd_arm_equipped[data-saved="true"][data-class="\u62A4\u7532"]:not([data-id="' + armsInfo['已装备护甲'] + '"])').removeClass('pd_arm_equipped');
        if (!$armArea.find('.pd_arm_equipped[data-class="武器"]').length) {
            $armArea.find('tr[data-id="' + armsInfo['已装备武器'] + '"]').addClass('pd_arm_equipped');
        }
        if (!$armArea.find('.pd_arm_equipped[data-class="护甲"]').length) {
            $armArea.find('tr[data-id="' + armsInfo['已装备护甲'] + '"]').addClass('pd_arm_equipped');
        }
    }

    if (type === 1) {
        $armArea.find('a[data-name="equip"]').attr('data-name', 'add').text('加入');
    }

    Script.runFunc('Item.handleArmArea_after_', { $armArea: $armArea, type: type });
};

/**
 * 分组排列装备
 * @param {jQuery} $armArea 装备区域节点
 */
var sortArmsByGroup = exports.sortArmsByGroup = function sortArmsByGroup($armArea) {
    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
        for (var _iterator9 = armGroupList[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var armGroup = _step9.value;

            $armArea.find('tr[data-group="' + armGroup + '"]').insertAfter($armArea.find('tr:nth-child(2)'));
        }
    } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion9 && _iterator9.return) {
                _iterator9.return();
            }
        } finally {
            if (_didIteratorError9) {
                throw _iteratorError9;
            }
        }
    }
};

/**
 * 按ID顺序排列装备
 * @param {jQuery} $armArea 装备区域节点
 */
var sortArmsById = exports.sortArmsById = function sortArmsById($armArea) {
    var armIdList = [];
    $armArea.find('tr[data-id]').each(function () {
        armIdList.push(parseInt($(this).data('id')));
    });
    armIdList.sort(function (a, b) {
        return a - b;
    });
    var _iteratorNormalCompletion10 = true;
    var _didIteratorError10 = false;
    var _iteratorError10 = undefined;

    try {
        for (var _iterator10 = armIdList[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var armId = _step10.value;

            $armArea.find('tr[data-id="' + armId + '"]').insertAfter($armArea.find('tr:nth-child(2)'));
        }
    } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion10 && _iterator10.return) {
                _iterator10.return();
            }
        } finally {
            if (_didIteratorError10) {
                throw _iteratorError10;
            }
        }
    }
};

/**
 * 绑定装备点击事件
 * @param {jQuery} $armArea 装备区域节点
 * @param {string} safeId SafeID
 * @param {number} type 页面类型，0：我的物品页面；1：争夺首页
 */
var bindArmLinkClickEvent = exports.bindArmLinkClickEvent = function bindArmLinkClickEvent($armArea, safeId) {
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    $armArea.on('click', 'a[data-name="equip"]', function () {
        var $this = $(this);
        var $tr = $this.closest('tr');
        var armId = parseInt($tr.data('id'));
        var armClass = $tr.data('class');
        $.post('kf_fw_ig_mybpdt.php', 'do=4&id=' + armId + '&safeid=' + safeId, function (html) {
            var msg = Util.removeHtmlTag(html);
            if (/装备完毕/.test(msg)) {
                $armArea.find('.pd_arm_equipped[data-class="' + armClass + '"]').removeClass('pd_arm_equipped');
                $this.closest('tr').addClass('pd_arm_equipped');
                if (Config.autoSaveArmsInfoEnabled) {
                    var armsInfo = readArmsInfo();
                    armsInfo['\u5DF2\u88C5\u5907' + armClass] = armId;
                    writeArmsInfo(armsInfo);
                }
                if (type === 1) {
                    var $wait = Msg.wait('<strong>正在获取争夺首页信息&hellip;</strong>');
                    Loot.updateLootInfo(function () {
                        Msg.remove($wait);
                        var $armId = $('input[name="armId"]:first');
                        var $armMemo = $('input[name="armMemo"]:first');
                        $armId.val(armId);
                        $armMemo.val($('#pdArmArea > span:first').text().trim());
                        $('.pd_arm_input').each(function () {
                            $(this).val('');
                            this.defaultValue = '';
                        });
                        Script.runFunc('Item.bindArmLinkClickEvent_equip_after_', { $armArea: $armArea, type: type });
                    });
                }
            } else {
                if (Config.autoSaveArmsInfoEnabled && (msg === '错误的编号' || msg === '不是你的东西')) {
                    removeSavedArmInfo(armId, $armArea);
                }
                alert(msg);
            }
        });
    }).on('click', 'a[data-name="smelt"]', function () {
        if (!confirm('确定熔炼此装备吗？')) return;
        var $this = $(this);
        var $tr = $this.closest('tr');
        var armId = parseInt($tr.data('id'));
        $.post('kf_fw_ig_mybpdt.php', 'do=5&id=' + armId + '&safeid=' + safeId, function (html) {
            var msg = Util.removeHtmlTag(html);
            if (/装备消失/.test(msg)) {
                if (armId in Config.armsMemo) {
                    (0, _Config.read)();
                    delete Config.armsMemo[armId];
                    (0, _Config.write)();
                }

                var matches = /获得对应装备经验\[\+(\d+)]/.exec(msg);
                if (matches) {
                    var armClass = $tr.data('class');
                    var gain = {};
                    gain[armClass + '经验'] = parseInt(matches[1]);
                    Log.push('熔炼装备', '\u5171\u6709`1`\u4E2A\u3010`' + armClass + '`\u3011\u88C5\u5907\u7194\u70BC\u6210\u529F', { gain: gain, pay: { '装备': -1 } });
                }

                $tr.replaceWith('<tr><td colspan="3">' + msg + '</td></tr>');
                if (Config.autoSaveArmsInfoEnabled) {
                    removeSavedArmInfo(armId, $armArea);
                }
            } else {
                if (Config.autoSaveArmsInfoEnabled && (msg === '错误的编号' || msg === '不是你的东西')) {
                    removeSavedArmInfo(armId, $armArea);
                }
                alert(msg);
            }
        });
    }).on('click', 'a[data-name="add"]', function () {
        var $tr = $(this).closest('tr');
        var armId = parseInt($tr.data('id'));
        var armClass = $tr.data('class');
        var armInfo = getArmInfo($tr.find('> td:nth-child(3)').html());
        $('#pdAddArmDialog').parent().hide();
        if (armClass === '武器') {
            $('#pdAddWeaponMemo').val(armInfo['名称']);
            $('#pdAddWeaponId').val(armId).focus();
        } else if (armClass === '护甲') {
            $('#pdAddArmorMemo').val(armInfo['名称']);
            $('#pdAddArmorId').val(armId).focus();
        }
    }).on('mouseenter', 'tr[data-id]', function () {
        var $td = $(this).find('> td:nth-child(3)');
        $td.append('<a class="show_arm_info" data-name="showArmInfo" href="#" title="查看装备信息">查</a>');
    }).on('mouseleave', 'tr[data-id]', function () {
        $(this).find('> td:nth-child(3) .show_arm_info').remove();
    }).on('click', '.show_arm_info', function (e) {
        e.preventDefault();
        var $this = $(this);
        var $td = $(this).parent('td');
        var $tr = $this.closest('tr');
        var id = parseInt($tr.data('id'));
        $this.remove();
        var html = $td.html();
        var armInfo = getArmInfo(html);
        showArmInfoDialog(id, armInfo, $armArea);
    });
};

/**
 * 显示装备信息对话框
 * @param {number} armId 装备ID
 * @param {{}} armInfo 装备信息
 * @param {jQuery} $armArea 装备区域节点
 */
var showArmInfoDialog = function showArmInfoDialog(armId, armInfo, $armArea) {
    var dialogName = 'pdArmInfoDialog';
    if ($('#' + dialogName).length > 0) return;
    Msg.destroy();

    var html = '\n<div class="pd_cfg_main">\n  <div style="width: 550px; margin-top: 5px; padding-bottom: 5px; border-bottom: 1px solid #99f;">\n    <span style="color: ' + armInfo['颜色'] + '">' + armInfo['名称'] + '</span> - ' + armInfo['描述'] + '\n  </div>\n  <div style="margin-top: 5px;">\n    <label>\u88C5\u5907ID\uFF1A<input name="armId" type="text" value="' + armId + '" style="width: 100px;" readonly></label>\n    <a class="pd_btn_link" data-name="copy" data-target="[name=armId]" href="#">\u590D\u5236</a>\n  </div>\n  <div style="margin-top: 5px;">\n    <label>\u88C5\u5907\u53C2\u6570\u8BBE\u7F6E\uFF1A</label>\n    <a class="pd_btn_link" data-name="copy" data-target="[name=armParameterSetting]" href="#">\u590D\u5236</a><br>\n    <textarea name="armParameterSetting" rows="6" style="width: 550px;" wrap="off" style="white-space: pre;" readonly></textarea>\n  </div>\n  <div style="margin-top: 5px;">\n    <label>\n      \u88C5\u5907\u5907\u6CE8\uFF1A<input name="armMemo" type="text" maxlength="100" style="width: 200px;">\n    </label>\n  </div>\n</div>\n<div class="pd_cfg_btns">\n  <button name="saveMemo" type="submit">\u4FDD\u5B58\u5907\u6CE8</button>\n  <button data-action="close" type="button">\u5173\u95ED</button>\n</div>';
    var $dialog = Dialog.create(dialogName, '装备信息', html, 'z-index: 1003;');

    $dialog.on('click', 'a[data-name="copy"]', function (e) {
        e.preventDefault();
        var $target = $dialog.find($(this).data('target'));
        if (!Util.copyText($target)) {
            $target.select().focus();
        }
        Script.runFunc('Item.showArmInfoDialog_copy_');
    }).submit(function (e) {
        e.preventDefault();
        (0, _Config.read)();
        var value = $.trim($dialog.find('input[name="armMemo"]').val());
        var $node = $armArea.find('tr[data-id="' + armId + '"] > td:nth-child(3)');
        if (value) {
            Config.armsMemo[armId] = value;
            $node.attr('data-memo', value.replace(/"/g, ''));
        } else {
            delete Config.armsMemo[armId];
            $node.removeAttr('data-memo');
        }
        (0, _Config.write)();
        Dialog.close(dialogName);
    });

    $dialog.find('textarea[name="armParameterSetting"]').val(getArmParameterSetting(armId, armInfo));
    if (Config.armsMemo[armId]) {
        $dialog.find('input[name="armMemo"]').val(Config.armsMemo[armId]);
    }
    Dialog.show(dialogName);
    Script.runFunc('Item.showArmInfoDialog_after_');
};

// 装备属性关键词列表
var armPropertyKeyList = new Map([['增加攻击力', 'ATK'], ['增加暴击伤害', 'CRT'], ['增加技能伤害', 'SKL'], ['穿透对方意志', 'BRC'], ['生命夺取', 'LCH'], ['增加速度', 'SPD'], ['攻击', 'ATK'], ['暴击', 'CRT'], ['技能', 'SKL'], ['穿透', 'BRC'], ['吸血', 'LCH'], ['速度', 'SPD'], ['被攻击回血100+', 'HEL'], ['获得无护甲魔法盾500+', 'SLD'], ['每减少5%生命值获得额外意志', 'AMR'], ['反弹对方实际伤害15%+', 'RFL'], ['减少来自暴击的伤害10%+', 'CRD'], ['减少来自技能的伤害10%+', 'SRD'], ['回血', 'HEL'], ['护盾', 'SLD'], ['加防', 'AMR'], ['反伤', 'RFL'], ['暴减', 'CRD'], ['技减', 'SRD']]);

/**
 * 获取计算器装备参数设置
 * @param {number} armId 装备ID
 * @param {{}} armInfo 装备信息
 * @returns {string} 装备参数设置
 */
var getArmParameterSetting = exports.getArmParameterSetting = function getArmParameterSetting(armId, armInfo) {
    var info = {
        '组别': '',
        '装备ID': '',
        '神秘属性数量': 0,
        '所有的神秘属性': '',
        '主属性数量': 0,
        '所有的主属性': '',
        '从属性数量': 0,
        '所有的从属性': ''
    };

    var groupKeyList = new Map([['长剑', 'Sword'], ['短弓', 'Bow'], ['法杖', 'Staff'], ['铠甲', 'Plate'], ['皮甲', 'Leather'], ['布甲', 'Cloth']]);
    info['组别'] = groupKeyList.get(armInfo['组别']);
    info['装备ID'] = '#' + armId;

    var smKeyList = new Map([['火神秘', 'FMT'], ['雷神秘', 'LMT'], ['风神秘', 'AMT'], ['冰霜神秘', 'IMT'], ['尖刺神秘', 'TMT'], ['仇恨神秘', 'HMT']]);
    var _iteratorNormalCompletion11 = true;
    var _didIteratorError11 = false;
    var _iteratorError11 = undefined;

    try {
        for (var _iterator11 = smKeyList[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            var _step11$value = _slicedToArray(_step11.value, 2),
                key = _step11$value[0],
                value = _step11$value[1];

            if (key in armInfo) {
                info['神秘属性数量']++;
                info['所有的神秘属性'] += value + ' ';
            }
        }
    } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion11 && _iterator11.return) {
                _iterator11.return();
            }
        } finally {
            if (_didIteratorError11) {
                throw _iteratorError11;
            }
        }
    }

    var _iteratorNormalCompletion12 = true;
    var _didIteratorError12 = false;
    var _iteratorError12 = undefined;

    try {
        for (var _iterator12 = armInfo['主属性'][Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            var value = _step12.value;

            var _value$split = value.split('(', 1),
                _value$split2 = _slicedToArray(_value$split, 1),
                _value$split2$ = _value$split2[0],
                property = _value$split2$ === undefined ? '' : _value$split2$;

            property = property.trim();
            if (property) {
                info['主属性数量']++;
                info['所有的主属性'] += armPropertyKeyList.get(property) + ' ';
            }
        }
    } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion12 && _iterator12.return) {
                _iterator12.return();
            }
        } finally {
            if (_didIteratorError12) {
                throw _iteratorError12;
            }
        }
    }

    var subPropertyKeyList = new Map([['系数(x3)', 'COF'], ['力量', 'STR'], ['敏捷', 'AGI'], ['智力', 'INT'], ['体质', 'VIT'], ['灵活', 'DEX'], ['意志', 'RES']]);
    var _iteratorNormalCompletion13 = true;
    var _didIteratorError13 = false;
    var _iteratorError13 = undefined;

    try {
        for (var _iterator13 = armInfo['从属性'][Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            var _value = _step13.value;

            _value = $.trim(_value);
            if (!_value) continue;
            var matches = /(?:\[.])?(\S+?)\((\S+?)x([\d\.]+)%\)/.exec(_value);
            if (matches) {
                info['从属性数量']++;
                info['所有的从属性'] += armPropertyKeyList.get(matches[1]) + ' ' + subPropertyKeyList.get(matches[2]) + ' ' + Math.floor(parseFloat(matches[3]) * 10) + ' ';
            }
        }
    } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion13 && _iterator13.return) {
                _iterator13.return();
            }
        } finally {
            if (_didIteratorError13) {
                throw _iteratorError13;
            }
        }
    }

    var content = '\n[\u7EC4\u522B] [\u88C5\u5907ID]\n[\u795E\u79D8\u5C5E\u6027\u6570\u91CF] [\u6240\u6709\u7684\u795E\u79D8\u5C5E\u6027]\n[\u4E3B\u5C5E\u6027\u6570\u91CF] [\u6240\u6709\u7684\u4E3B\u5C5E\u6027]\n[\u4ECE\u5C5E\u6027\u6570\u91CF] [\u6240\u6709\u7684\u4ECE\u5C5E\u6027]\n'.trim();
    var _iteratorNormalCompletion14 = true;
    var _didIteratorError14 = false;
    var _iteratorError14 = undefined;

    try {
        for (var _iterator14 = Util.entries(info)[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
            var _step14$value = _slicedToArray(_step14.value, 2),
                key = _step14$value[0],
                _value2 = _step14$value[1];

            content = content.replace('[' + key + ']', $.trim(_value2));
        }
    } catch (err) {
        _didIteratorError14 = true;
        _iteratorError14 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion14 && _iterator14.return) {
                _iterator14.return();
            }
        } finally {
            if (_didIteratorError14) {
                throw _iteratorError14;
            }
        }
    }

    return content;
};

/**
 * 处理无用的从属性
 * @param {string} html 装备的HTML代码
 * @returns {string} 处理后的HTML代码
 */
var handleUselessSubProperties = exports.handleUselessSubProperties = function handleUselessSubProperties(html) {
    var armInfo = getArmInfo(html);
    var keyList = [];
    var _iteratorNormalCompletion15 = true;
    var _didIteratorError15 = false;
    var _iteratorError15 = undefined;

    try {
        for (var _iterator15 = armInfo['主属性'][Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
            var _value3 = _step15.value;

            var _value3$split = _value3.split('(', 1),
                _value3$split2 = _slicedToArray(_value3$split, 1),
                _value3$split2$ = _value3$split2[0],
                _property = _value3$split2$ === undefined ? '' : _value3$split2$;

            if (_property) {
                keyList.push(armPropertyKeyList.get(_property));
            }
        }
    } catch (err) {
        _didIteratorError15 = true;
        _iteratorError15 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion15 && _iterator15.return) {
                _iterator15.return();
            }
        } finally {
            if (_didIteratorError15) {
                throw _iteratorError15;
            }
        }
    }

    var matches = /从属性：(.+?)(<br(?:\s*\/)?>|$)/.exec(html);
    if (matches) {
        var subPropertiesHtml = '';
        var _iteratorNormalCompletion16 = true;
        var _didIteratorError16 = false;
        var _iteratorError16 = undefined;

        try {
            for (var _iterator16 = matches[1].split('。')[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                var value = _step16.value;

                if (!value) continue;
                var subMatches = /(?:^|>)([^<>]+?)\(/.exec(value);
                if (subMatches) {
                    var property = subMatches[1];
                    if (!keyList.includes(armPropertyKeyList.get(property))) {
                        value = '<span class="pd_useless_sub_property">' + value + '</span>';
                    }
                }
                subPropertiesHtml += value + '。';
            }
        } catch (err) {
            _didIteratorError16 = true;
            _iteratorError16 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion16 && _iterator16.return) {
                    _iterator16.return();
                }
            } finally {
                if (_didIteratorError16) {
                    throw _iteratorError16;
                }
            }
        }

        html = html.replace(matches[0], '从属性：' + subPropertiesHtml + matches[2]);
    }

    return html;
};

/**
 * 添加装备相关按钮
 */
var addArmsButton = function addArmsButton() {
    $('\n<div class="pd_item_btns" data-name="handleArmBtns">\n  <button name="openImOrExOrClearArmsLogDialog" type="button" title="\u5BFC\u5165/\u5BFC\u51FA/\u6E05\u9664\u5DF2\u4FDD\u5B58\u7684\u88C5\u5907\u4FE1\u606F">\u5BFC\u5165/\u5BFC\u51FA/\u6E05\u9664</button>\n  <button name="showArmsFinalAddition" type="button" title="\u663E\u793A\u5F53\u524D\u9875\u9762\u4E0A\u6240\u6709\u88C5\u5907\u7684\u6700\u7EC8\u52A0\u6210\u4FE1\u606F">\u663E\u793A\u6700\u7EC8\u52A0\u6210</button>\n  <button name="smeltSelectArms" type="button" style="color: #00f;" title="\u6279\u91CF\u7194\u70BC\u5F53\u524D\u9875\u9762\u4E0A\u6240\u9009\u7684\u88C5\u5907">\u7194\u70BC\u6240\u9009</button>\n  <button name="smeltArms" type="button" style="color: #f00;" title="\u6279\u91CF\u7194\u70BC\u6307\u5B9A\u79CD\u7C7B\u7684\u88C5\u5907">\u6279\u91CF\u7194\u70BC</button>\n</div>\n').insertAfter($armArea).find('[name="openImOrExOrClearArmsLogDialog"]').click(function () {
        Public.showCommonImportOrExportLogDialog({
            name: '装备信息',
            read: readArmsInfo,
            write: writeArmsInfo,
            merge: getMergeArmsInfo,
            callback: function callback($dialog) {
                $('<button name="clearArmsMemo" type="button" style="color: #00f;">清除备注</button> ' + '<button name="clear" type="button" style="color: #f00;">清除记录</button>').prependTo($dialog.find('.pd_cfg_btns')).filter('[name="clearArmsMemo"]').click(function () {
                    if (!confirm('是否清除所有装备的备注？')) return;
                    (0, _Config.read)();
                    Config.armsMemo = {};
                    (0, _Config.write)();
                    alert('所有装备的备注已被清除');
                    location.reload();
                }).end().filter('[name="clear"]').click(function () {
                    if (!confirm('是否清除所有已保存的装备信息？')) return;
                    clearArmsInfo();
                    alert('在本地保存的装备信息已被清除');
                    location.reload();
                });
            }
        });
    }).end().find('[name="showArmsFinalAddition"]').click(function () {
        var $arms = $armArea.find('tr[data-id]:has([name="armCheck"]:checked)');
        if (!confirm('\u662F\u5426\u663E\u793A\u5F53\u524D\u9875\u9762\u4E0A\u3010' + ($arms.length > 0 ? '所选' : '全部') + '\u3011\u88C5\u5907\u7684\u6700\u7EC8\u52A0\u6210\u4FE1\u606F\uFF1F\n\uFF08\u8B66\u544A\uFF1A\u8BF7\u4E0D\u8981\u5728\u4E89\u593A\u653B\u51FB\u9014\u4E2D\u4F7F\u7528\u6B64\u529F\u80FD\uFF01\uFF09')) return;
        if (!$arms.length) $arms = $armArea.find('tr[data-id]');
        Msg.destroy();

        var armList = [];
        $arms.each(function () {
            var $this = $(this);
            var armId = parseInt($this.data('id'));
            var armClass = $this.data('class');
            if (armId && armClass) {
                armList.push({ armId: armId, armClass: armClass });
            }
        });
        if (!armList.length) return;

        var oriEquippedArmList = [];
        $armArea.find('.pd_arm_equipped').each(function () {
            var $this = $(this);
            var armId = parseInt($this.data('id'));
            var armClass = $this.data('class');
            oriEquippedArmList.push({ armId: armId, armClass: armClass });
        });
        if (oriEquippedArmList.length < 2 && !confirm('未在当前页面上存在已装备的该类别装备，在操作后将装备为该页面上其类别的最后一件装备，是否继续？')) return;

        showArmsFinalAddition(armList, oriEquippedArmList, safeId);
    }).end().find('[name="smeltSelectArms"]').click(function () {
        var idList = [];
        $armArea.find('input[name="armCheck"]:checked').each(function () {
            idList.push(parseInt($(this).val()));
        });
        if (!idList.length || !confirm('\u662F\u5426\u7194\u70BC\u6240\u9009\u7684 ' + idList.length + ' \u4EF6\u88C5\u5907\uFF1F')) return;
        smeltArms({ idList: idList, safeId: safeId });
    }).end().find('[name="smeltArms"]').click(function () {
        return showBatchSmeltArmsDialog(safeId);
    });
    addCommonArmsButton($('.pd_item_btns[data-name="handleArmBtns"]'), $armArea);
};

/**
 * 添加装备相关的通用按钮
 * @param {jQuery} $area 要添加的区域节点
 * @param {jQuery} $armArea 装备区域节点
 */
var addCommonArmsButton = exports.addCommonArmsButton = function addCommonArmsButton($area, $armArea) {
    $('\n<label>\n  <input name="sortArmsByGroupEnabled" type="checkbox" ' + (Config.sortArmsByGroupEnabled ? 'checked' : '') + '> \u5206\u7EC4\u6392\u5217</input>\n  <span class="pd_cfg_tips" title="\u5206\u7EC4\u6392\u5217\u88C5\u5907">[?]</span>\n</label>\n<select name="select" style="width: 92px; vertical-align: middle; margin-bottom: 2px;">\n  <option>\u9009\u62E9\u88C5\u5907</option>\n  <option value="selectAll">\u5168\u9009</option>\n  <option value="selectInverse">\u53CD\u9009</option>\n  <option value="selectCancel">\u53D6\u6D88</option>\n  <option value="selectWeapon">\u9009\u62E9\u6B66\u5668</option>\n  <option value="selectArmor">\u9009\u62E9\u62A4\u7532</option>\n  <option value="selectNewArm">\u9009\u62E9\u65B0\u88C5\u5907</option>\n  <option value="selectNoMemo">\u9009\u62E9\u65E0\u5907\u6CE8\u7684\u88C5\u5907</option>\n  <option value="selectArmId">\u9009\u62E9\u6307\u5B9AID\u7684\u88C5\u5907</option>\n</select>\n<button name="copyArmParameterSetting" type="button" title="\u590D\u5236\u6240\u9009\u88C5\u5907\u7684\u8BA1\u7B97\u5668\u53C2\u6570\u8BBE\u7F6E">\u590D\u5236\u88C5\u5907\u53C2\u6570</button>\n').prependTo($area).find('[name="sortArmsByGroupEnabled"]').click(function () {
        var checked = $(this).prop('checked');
        if (Config.sortArmsByGroupEnabled !== checked) {
            (0, _Config.read)();
            Config.sortArmsByGroupEnabled = checked;
            (0, _Config.write)();
        }
        if (checked) {
            sortArmsByGroup($armArea);
        } else {
            sortArmsById($armArea);
        }
    }).end().filter('[name="select"]').change(function () {
        var $selectedArmsNum = $armArea.find('#pdSelectedArmsNum');
        $selectedArmsNum.text(0).parent().hide();

        var name = $(this).val();
        var $checkboxes = $armArea.find('input[name="armCheck"]');
        if (name === 'selectAll') {
            Util.selectAll($checkboxes);
        } else if (name === 'selectInverse') {
            Util.selectInverse($checkboxes);
        } else if (name === 'selectCancel') {
            $checkboxes.prop('checked', false);
        } else if (name === 'selectWeapon') {
            $checkboxes.prop('checked', false);
            $armArea.find('tr[data-class="武器"] input[name="armCheck"]').prop('checked', true);
        } else if (name === 'selectArmor') {
            $checkboxes.prop('checked', false);
            $armArea.find('tr[data-class="护甲"] input[name="armCheck"]').prop('checked', true);
        } else if (name === 'selectNewArm') {
            $checkboxes.prop('checked', false);
            $armArea.find('tr:has(.pd_new_arm_mark) input[name="armCheck"]').prop('checked', true);
        } else if (name === 'selectNoMemo') {
            $checkboxes.prop('checked', false);
            if (!$armArea.find('tr:has(td[data-memo])').length) {
                if (!confirm('在当前页面上未发现包含备注的装备，建议检查一下你是否清空了装备备注，是否继续选择？')) return;
            }
            var $legendEquip = $armArea.find('tr[data-id]:has(span:contains("传奇的"))').not(':has(td[data-memo])');
            if ($legendEquip.length > 0) {
                if (!confirm('\u4F60\u4E00\u5171\u9009\u62E9\u4E86 ' + $legendEquip.length + ' \u4EF6\u4F20\u5947\u88C5\u5907\uFF0C\u662F\u5426\u7EE7\u7EED\u9009\u62E9\uFF1F')) return;
            }
            $armArea.find('tr:not(:has(td[data-memo])) input[name="armCheck"]').prop('checked', true);
        } else if (name === 'selectArmId') {
            var text = $.trim(prompt('请输入要选择的装备ID（多个装备ID用空格分隔）：'));
            if (text) {
                $checkboxes.prop('checked', false);
                $armArea.find(text.split(' ').map(function (armId) {
                    return 'tr[data-id="' + armId + '"] input[name="armCheck"]';
                }).join(',')).prop('checked', true);
            }
        }

        var selectedNum = $checkboxes.filter(':checked').length;
        if (selectedNum > 0) {
            $selectedArmsNum.text(selectedNum).parent().show();
        }

        Script.runFunc('Item.addCommonArmsButton_select_change_', { name: name, $armArea: $armArea });
        this.selectedIndex = 0;
    }).end().filter('[name="copyArmParameterSetting"]').click(function () {
        var $this = $(this);
        var armInfoList = [];
        $armArea.find('input[name="armCheck"]:checked').each(function () {
            var $this = $(this);
            var id = parseInt($this.val());
            var html = $this.closest('tr').find('> td:nth-child(3)').html();
            if (!html) return;
            armInfoList.push({ id: id, info: getArmInfo(html) });
        });
        if (!armInfoList.length) return;
        var copyData = '';
        var _iteratorNormalCompletion17 = true;
        var _didIteratorError17 = false;
        var _iteratorError17 = undefined;

        try {
            for (var _iterator17 = armInfoList[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                var _step17$value = _step17.value,
                    id = _step17$value.id,
                    info = _step17$value.info;

                copyData += getArmParameterSetting(id, info) + '\n\n';
            }
        } catch (err) {
            _didIteratorError17 = true;
            _iteratorError17 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion17 && _iterator17.return) {
                    _iterator17.return();
                }
            } finally {
                if (_didIteratorError17) {
                    throw _iteratorError17;
                }
            }
        }

        $this.data('copy-text', copyData.trim());
        console.log('\u6240\u9009\u7684 ' + armInfoList.length + ' \u4EF6\u88C5\u5907\u7684\u8BA1\u7B97\u5668\u88C5\u5907\u53C2\u6570\u8BBE\u7F6E\uFF1A\n\n' + copyData.trim());
        if (!Util.copyText($this, '\u6240\u9009\u7684 ' + armInfoList.length + ' \u4EF6\u88C5\u5907\u7684\u8BA1\u7B97\u5668\u88C5\u5907\u53C2\u6570\u8BBE\u7F6E\u5DF2\u590D\u5236')) {
            alert('你的浏览器不支持复制，请打开Web控制台查看');
        }
    });

    $armArea.find('> tbody > tr:last-child > td:first-child').append('<div class="pd_highlight" style="position: absolute; left: 7px; top: 0; display: none;">(已选 <span id="pdSelectedArmsNum">0</span> 件)</div>');
    Script.runFunc('Item.addCommonArmsButton_after_', { $area: $area, $armArea: $armArea });
};

/**
 * 显示装备最终加成信息
 * @param {Object[]} armList 装备列表
 * @param {Object[]} oriEquippedArmList 原先的装备列表
 * @param {string} safeId SafeID
 */
var showArmsFinalAddition = exports.showArmsFinalAddition = function showArmsFinalAddition(armList, oriEquippedArmList, safeId) {
    var index = 0;

    /**
     * 写入装备信息
     * @param {number} armId 装备ID
     * @param {string} armClass 装备类别
     */
    var writeArmInfo = function writeArmInfo(armId, armClass) {
        $armArea.find('.pd_arm_equipped[data-class="' + armClass + '"]').removeClass('pd_arm_equipped').end().find('tr[data-id="' + armId + '"]').addClass('pd_arm_equipped');
        if (Config.autoSaveArmsInfoEnabled) {
            var armsInfo = readArmsInfo();
            armsInfo['\u5DF2\u88C5\u5907' + armClass] = armId;
            writeArmsInfo(armsInfo);
        }
    };

    /**
     * 装备
     * @param {number} armId 装备ID
     * @param {string} armClass 装备类别
     * @param {boolean} isComplete 是否操作完成
     * @param {function} callback 回调函数
     */
    var equip = function equip(_ref2) {
        var armId = _ref2.armId,
            armClass = _ref2.armClass;
        var isComplete = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        $.ajax({
            type: 'POST',
            url: 'kf_fw_ig_mybpdt.php',
            data: 'do=4&id=' + armId + '&safeid=' + safeId,
            timeout: _Const2.default.defAjaxTimeout
        }).done(function (html) {
            var msg = Util.removeHtmlTag(html);
            console.log('\u3010\u88C5\u5907ID[' + armId + ']\uFF0C\u88C5\u5907\u7C7B\u522B[' + armClass + ']\u3011\uFF1A' + msg.replace('\n', ' '));
            if (isComplete) {
                if (/装备完毕/.test(msg)) {
                    writeArmInfo(armId, armClass);
                    if (typeof callback === 'function') callback();
                } else {
                    setTimeout(function () {
                        return equip({ armId: armId, armClass: armClass }, isComplete, callback);
                    }, _Const2.default.minActionInterval);
                }
                return;
            }
            if (!/装备完毕|操作过快/.test(msg)) {
                index++;
                if (Config.autoSaveArmsInfoEnabled && (msg === '错误的编号' || msg === '不是你的东西')) {
                    removeSavedArmInfo(armId, $armArea);
                }
            }
            if (index >= armList.length) {
                complete();
                return;
            }
            if (!/装备完毕/.test(msg)) {
                setTimeout(function () {
                    return equip(armList[index]);
                }, _Const2.default.minActionInterval);
            } else {
                writeArmInfo(armId, armClass);
                setTimeout(function () {
                    return getFinalAddition({ armId: armId, armClass: armClass });
                }, _Const2.default.defAjaxInterval);
            }
        }).fail(function () {
            return setTimeout(function () {
                return equip({ armId: armId, armClass: armClass }, isComplete, callback);
            }, _Const2.default.minActionInterval);
        });
    };

    /**
     * 获取当前装备的最终加成
     * @param {number} armId 装备ID
     * @param {string} armClass 装备类别
     */
    var getFinalAddition = function getFinalAddition(_ref3) {
        var armId = _ref3.armId,
            armClass = _ref3.armClass;

        $.ajax({
            type: 'GET',
            url: 'kf_fw_ig_index.php?t=' + $.now(),
            timeout: _Const2.default.defAjaxTimeout
        }).done(function (html) {
            $wait.find('.pd_countdown').text(armList.length - (index + 1));
            if ($wait.data('stop')) {
                complete();
                return;
            }

            var matches = armClass === '武器' ? />(攻击伤害\+[^<>]+)</.exec(html) : />(受伤回血\+[^<>]+)</.exec(html);
            if (matches) {
                var info = matches[1];
                console.log('\u3010\u88C5\u5907ID[' + armId + ']\uFF0C\u88C5\u5907\u7C7B\u522B[' + armClass + ']\u3011\uFF1A' + info);
                var $armInfo = $armArea.find('tr[data-id="' + armId + '"]').find('td:nth-child(3)');
                $armInfo.find('.pd_final_addition_info').remove();
                $armInfo.append('<span class="pd_final_addition_info" title="\u6700\u7EC8\u52A0\u6210\uFF1A' + info + '"><br>\u6700\u7EC8\u52A0\u6210\uFF1A' + info + '</span>');
            }

            index++;
            if (index >= armList.length) {
                complete();
                return;
            }
            setTimeout(function () {
                return equip(armList[index]);
            }, _Const2.default.minActionInterval);
            Script.runFunc('Item.showArmsFinalAddition_show_', { armId: armId, armClass: armClass });
        }).fail(function () {
            return setTimeout(function () {
                return getFinalAddition({ armId: armId, armClass: armClass });
            }, _Const2.default.minActionInterval);
        });
    };

    /**
     * 操作完成
     */
    var complete = function complete() {
        Msg.remove($wait);
        if (oriEquippedArmList.length > 0) {
            var _$wait = Msg.wait('<strong>正在还原为之前的装备&hellip;</strong>');
            setTimeout(function () {
                return equip(oriEquippedArmList[0], true, function () {
                    if (!oriEquippedArmList[1]) {
                        Msg.remove(_$wait);
                        return;
                    }
                    setTimeout(function () {
                        return equip(oriEquippedArmList[1], true, function () {
                            Msg.remove(_$wait);
                        });
                    }, _Const2.default.minActionInterval);
                });
            }, _Const2.default.minActionInterval);
        }
        Script.runFunc('Item.showArmsFinalAddition_complete_');
    };

    var $wait = Msg.wait('<strong>\u6B63\u5728\u83B7\u53D6\u88C5\u5907\u6700\u7EC8\u52A0\u6210\u4FE1\u606F&hellip;</strong><i>\u5269\u4F59\uFF1A<em class="pd_countdown">' + armList.length + '</em></i>' + '<a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
    equip(armList[0]);
};

/**
 * 显示批量熔炼装备对话框
 */
var showBatchSmeltArmsDialog = function showBatchSmeltArmsDialog() {
    var dialogName = 'pdBatchSmeltArmsDialog';
    if ($('#' + dialogName).length > 0) return;
    Msg.destroy();
    (0, _Config.read)();

    var armTypeCheckedHtml = '';
    var _iteratorNormalCompletion18 = true;
    var _didIteratorError18 = false;
    var _iteratorError18 = undefined;

    try {
        for (var _iterator18 = armGroupList[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
            var group = _step18.value;

            armTypeCheckedHtml += '<li><b>' + group + '\uFF1A</b>';
            var _iteratorNormalCompletion19 = true;
            var _didIteratorError19 = false;
            var _iteratorError19 = undefined;

            try {
                for (var _iterator19 = armTypeList[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                    var type = _step19.value;

                    var prefix = type.split('的')[0];
                    if (prefix === '神秘') continue;
                    var name = prefix + '\u7684' + group;
                    armTypeCheckedHtml += '\n<label style="margin-right: 5px;">\n  <input type="checkbox" name="smeltArmsType" value="' + name + '" ' + (Config.defSmeltArmTypeList.includes(name) ? 'checked' : '') + '> ' + prefix + '\n</label>';
                }
            } catch (err) {
                _didIteratorError19 = true;
                _iteratorError19 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion19 && _iterator19.return) {
                        _iterator19.return();
                    }
                } finally {
                    if (_didIteratorError19) {
                        throw _iteratorError19;
                    }
                }
            }

            armTypeCheckedHtml += '</li>';
        }
    } catch (err) {
        _didIteratorError18 = true;
        _iteratorError18 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion18 && _iterator18.return) {
                _iterator18.return();
            }
        } finally {
            if (_didIteratorError18) {
                throw _iteratorError18;
            }
        }
    }

    var html = '\n<div class="pd_cfg_main">\n  <div>\u8BF7\u9009\u62E9\u60F3\u6279\u91CF\u7194\u70BC\u7684\u88C5\u5907\u79CD\u7C7B\uFF1A</div>\n  <ul data-name="smeltArmTypeList">' + armTypeCheckedHtml + '</ul>\n</div>\n<div class="pd_cfg_btns">\n  <button name="selectAll" type="button">\u5168\u9009</button>\n  <button name="selectInverse" type="button">\u53CD\u9009</button>\n  <button name="smelt" type="button" style="color: #f00;">\u7194\u70BC</button>\n  <button data-action="close" type="button">\u5173\u95ED</button>\n</div>';
    var $dialog = Dialog.create(dialogName, '批量熔炼装备', html);
    var $smeltArmTypeList = $dialog.find('ul[data-name="smeltArmTypeList"]');

    $dialog.find('[name="smelt"]').click(function () {
        var typeList = [];
        $smeltArmTypeList.find('input[name="smeltArmsType"]:checked').each(function () {
            typeList.push($(this).val());
        });
        if (!typeList.length) return;
        (0, _Config.read)();
        Config.defSmeltArmTypeList = typeList;
        (0, _Config.write)();
        if (!confirm('是否熔炼所选装备种类？')) return;
        Dialog.close(dialogName);
        smeltArms({ typeList: typeList, safeId: safeId });
    }).end().find('[name="selectAll"]').click(function () {
        return Util.selectAll($smeltArmTypeList.find('input[name="smeltArmsType"]'));
    }).end().find('[name="selectInverse"]').click(function () {
        return Util.selectInverse($smeltArmTypeList.find('input[name="smeltArmsType"]'));
    });

    Dialog.show(dialogName);
    Script.runFunc('Item.showBatchSmeltArmsDialog_after_');
};

/**
 * 熔炼装备
 * @param {string[]} typeList 想要熔炼的装备种类列表
 * @param {number[]} idList 想要熔炼的装备ID列表（用于熔炼所选，不要与typeList一起使用）
 * @param {string} safeId SafeID
 * @param {boolean} nextActionEnabled 是否执行后续操作
 */
var smeltArms = exports.smeltArms = function smeltArms(_ref4) {
    var _ref4$typeList = _ref4.typeList,
        typeList = _ref4$typeList === undefined ? [] : _ref4$typeList,
        _ref4$idList = _ref4.idList,
        idList = _ref4$idList === undefined ? [] : _ref4$idList,
        safeId = _ref4.safeId,
        _ref4$nextActionEnabl = _ref4.nextActionEnabled,
        nextActionEnabled = _ref4$nextActionEnabl === undefined ? false : _ref4$nextActionEnabl;

    var successNum = 0,
        index = 0;
    var smeltInfo = {};
    var isStop = false,
        isDeleteMemo = false;
    var smeltedArmIdList = [];

    /**
     * 熔炼
     * @param {number} armId 装备ID
     * @param {string} armClass 装备类别
     * @param {string} armGroup 装备组别
     * @param {string} armName 装备名称
     * @param {number} armNum 本轮熔炼的装备数量
     */
    var smelt = function smelt(armId, armClass, armGroup, armName, armNum) {
        index++;
        $.ajax({
            type: 'POST',
            url: 'kf_fw_ig_mybpdt.php',
            data: 'do=5&id=' + armId + '&safeid=' + safeId,
            timeout: _Const2.default.defAjaxTimeout
        }).done(function (html) {
            if (!html) return;
            var msg = Util.removeHtmlTag(html);
            console.log('\u3010' + armName + '\u3011 ' + msg);
            if (msg.includes('错误的安全码')) isStop = true;
            $('.pd_result[data-name="armResult"]:last').append('<li>\u3010' + armName + '\u3011 ' + msg + '</li>');
            $armArea.find('td[id="wp_' + armId + '"]').parent('tr').fadeOut('normal', function () {
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
                if (!(armGroup in smeltInfo[armClass])) smeltInfo[armClass][armGroup] = { num: 0, exp: 0 };
                smeltInfo[armClass][armGroup].num++;
                smeltInfo[armClass][armGroup].exp += parseInt(matches[1]);
                $wait.find('.pd_countdown').text(successNum);
            }
            Script.runFunc('Item.smeltArms_after_', msg);
        }).fail(function () {
            $('.pd_result[data-name="armResult"]:last').append('<li>\u3010' + armName + '\u3011 <span class="pd_notice">\u8FDE\u63A5\u8D85\u65F6</span></li>');
        }).always(function () {
            if (isStop || $wait.data('stop')) {
                complete();
            } else {
                if (index === armNum) setTimeout(getNextArms, _Const2.default.minActionInterval);else setTimeout(function () {
                    return $(document).dequeue('SmeltArms');
                }, _Const2.default.minActionInterval);
            }
        });
    };

    /**
     * 获取当前的装备
     */
    var getCurrentArms = function getCurrentArms() {
        var armList = [];
        $armArea.find('td[id^="wp_"]').each(function () {
            var $this = $(this);
            var $tr = $this.parent('tr');
            if ($tr.hasClass('pd_arm_equipped')) return;
            var armId = parseInt($tr.data('id'));
            var armName = $tr.find('> td:nth-child(3) > span:first').text().trim();

            var _armName$split = armName.split('的'),
                _armName$split2 = _slicedToArray(_armName$split, 2),
                armGroup = _armName$split2[1];

            var armClass = getArmClassNameByGroupName(armGroup);
            if (armName && armGroup) {
                if (typeList.length > 0 && typeList.includes(armName)) {
                    armList.push({ armId: armId, armClass: armClass, armGroup: armGroup, armName: armName });
                } else if (idList.length > 0 && idList.includes(armId)) {
                    armList.push({ armId: armId, armClass: armClass, armGroup: armGroup, armName: armName });
                }
            }
        });
        if (!armList.length) {
            complete();
            return;
        }

        index = 0;
        $(document).clearQueue('SmeltArms');
        $.each(armList, function (i, _ref5) {
            var armId = _ref5.armId,
                armClass = _ref5.armClass,
                armGroup = _ref5.armGroup,
                armName = _ref5.armName;

            $(document).queue('SmeltArms', function () {
                return smelt(armId, armClass, armGroup, armName, armList.length);
            });
        });
        $(document).dequeue('SmeltArms');
    };

    /**
     * 获取下一批装备
     */
    var getNextArms = function getNextArms() {
        getNextObjects(2, function () {
            if ($wait.data('stop')) complete();else setTimeout(getCurrentArms, _Const2.default.defAjaxInterval);
        });
    };

    /**
     * 执行后续操作
     */
    var nextAction = function nextAction() {
        var action = null;
        if (Config.useItemsAfterOpenBoxesEnabled) {
            action = function action() {
                return useItems({ typeList: Config.defUseItemTypeList, safeId: safeId, nextActionEnabled: nextActionEnabled });
            };
        } else if (Config.sellItemsAfterOpenBoxesEnabled) {
            action = function action() {
                return sellItems({ typeList: Config.defSellItemTypeList, safeId: safeId, nextActionEnabled: nextActionEnabled });
            };
        }
        if (action) {
            setTimeout(action, _Const2.default.minActionInterval);
        } else if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
            showArmsFinalAdditionAfterOpenBoxes();
        }
    };

    /**
     * 清除无效信息
     */
    var clearInfo = function clearInfo() {
        if (isDeleteMemo) (0, _Config.write)();
        if (Config.autoSaveArmsInfoEnabled) {
            var armsInfo = readArmsInfo();
            var _iteratorNormalCompletion20 = true;
            var _didIteratorError20 = false;
            var _iteratorError20 = undefined;

            try {
                for (var _iterator20 = smeltedArmIdList[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                    var armId = _step20.value;

                    delete armsInfo['装备列表'][armId];
                }
            } catch (err) {
                _didIteratorError20 = true;
                _iteratorError20 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion20 && _iterator20.return) {
                        _iterator20.return();
                    }
                } finally {
                    if (_didIteratorError20) {
                        throw _iteratorError20;
                    }
                }
            }

            writeArmsInfo(armsInfo);
        }
    };

    /**
     * 操作完成
     */
    var complete = function complete() {
        $(document).clearQueue('SmeltArms');
        Msg.remove($wait);
        if ($.isEmptyObject(smeltInfo)) {
            console.log('没有装备被熔炼！');
            clearInfo();
            if (nextActionEnabled) nextAction();
            Script.runFunc('Item.smeltArms_complete_', { nextActionEnabled: nextActionEnabled, $armArea: $armArea });
            return;
        }

        var armGroupNum = 0;
        var resultStat = '',
            resultDetailStat = '',
            msgStat = '',
            logStat = '';
        var _iteratorNormalCompletion21 = true;
        var _didIteratorError21 = false;
        var _iteratorError21 = undefined;

        try {
            for (var _iterator21 = Util.getSortedObjectKeyList(armClassList, smeltInfo)[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
                var armClass = _step21.value;

                resultDetailStat += '<b>\u3010' + armClass + '\u3011\uFF1A</b><br>';
                var armClassNum = 0;
                var gain = {};
                gain[armClass + '\u7ECF\u9A8C'] = 0;
                var _iteratorNormalCompletion22 = true;
                var _didIteratorError22 = false;
                var _iteratorError22 = undefined;

                try {
                    for (var _iterator22 = Util.getSortedObjectKeyList(armGroupList, smeltInfo[armClass])[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
                        var armGroup = _step22.value;

                        armGroupNum++;
                        var _smeltInfo$armClass$a = smeltInfo[armClass][armGroup],
                            exp = _smeltInfo$armClass$a.exp,
                            num = _smeltInfo$armClass$a.num;

                        armClassNum += num;
                        gain[armClass + '\u7ECF\u9A8C'] += exp;
                        resultDetailStat += '&nbsp;&nbsp;\u3010' + armGroup + '\u3011 <i>\u88C5\u5907<ins>-' + num + '</ins></i> <i>' + armClass + '\u7ECF\u9A8C<em>+' + exp.toLocaleString() + '</em></i><br>';
                    }
                } catch (err) {
                    _didIteratorError22 = true;
                    _iteratorError22 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion22 && _iterator22.return) {
                            _iterator22.return();
                        }
                    } finally {
                        if (_didIteratorError22) {
                            throw _iteratorError22;
                        }
                    }
                }

                var commonStat = '<i>' + armClass + '\u7ECF\u9A8C<em>+' + gain[armClass + '\u7ECF\u9A8C'].toLocaleString() + '</em></i> ';
                resultStat += commonStat;
                msgStat += commonStat.trim();
                logStat += Util.removeHtmlTag(commonStat);
                Log.push('熔炼装备', '\u5171\u6709`' + armClassNum + '`\u4E2A\u3010`' + armClass + '`\u3011\u88C5\u5907\u7194\u70BC\u6210\u529F', { gain: gain, pay: { '装备': -armClassNum } });
            }
        } catch (err) {
            _didIteratorError21 = true;
            _iteratorError21 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion21 && _iterator21.return) {
                    _iterator21.return();
                }
            } finally {
                if (_didIteratorError21) {
                    throw _iteratorError21;
                }
            }
        }

        $('.pd_result[data-name="armResult"]:last').append('\n<li class="pd_stat">\n  <b>\u7EDF\u8BA1\u7ED3\u679C\uFF08\u5171\u6709<em>' + armGroupNum + '</em>\u4E2A\u7EC4\u522B\u4E2D\u7684<em>' + successNum + '</em>\u4E2A\u88C5\u5907\u7194\u70BC\u6210\u529F\uFF09\uFF1A</b><br>\n  ' + resultStat + '<br>\n  ' + resultDetailStat + '\n</li>');
        console.log('\u5171\u6709' + armGroupNum + '\u4E2A\u7EC4\u522B\u4E2D\u7684' + successNum + '\u4E2A\u88C5\u5907\u7194\u70BC\u6210\u529F\uFF0C' + logStat);
        Msg.show('<strong>\u5171\u6709<em>' + armGroupNum + '</em>\u4E2A\u7EC4\u522B\u4E2D\u7684<em>' + successNum + '</em>\u4E2A\u88C5\u5907\u7194\u70BC\u6210\u529F</strong>' + msgStat, -1);

        clearInfo();
        setTimeout(function () {
            return getNextObjects(2);
        }, _Const2.default.defAjaxInterval);
        if (nextActionEnabled) nextAction();
        Script.runFunc('Item.smeltArms_complete_', { nextActionEnabled: nextActionEnabled, $armArea: $armArea });
    };

    if (!$.isEmptyObject(Config.armsMemo)) (0, _Config.read)();
    $armArea.parent().append('<ul class="pd_result" data-name="armResult"><li><strong>熔炼结果：</strong></li></ul>');
    var $wait = Msg.wait('<strong>正在熔炼装备中&hellip;</strong><i>已熔炼：<em class="pd_countdown">0</em></i><a class="pd_stop_action" href="#">停止操作</a>');
    getCurrentArms();
};

/**
 * 通过装备组别名获取类别名
 * @param {string} groupName 装备组别名
 * @returns {string} 装备类别名
 */
var getArmClassNameByGroupName = exports.getArmClassNameByGroupName = function getArmClassNameByGroupName(groupName) {
    switch (groupName) {
        case '长剑':
        case '短弓':
        case '法杖':
            return '武器';
        case '铠甲':
        case '皮甲':
        case '布甲':
            return '护甲';
        default:
            return '';
    }
};

/**
 * 获取指定装备情况
 * @param html 装备的HTML代码
 * @returns {{}} 当前装备情况
 */
var getArmInfo = exports.getArmInfo = function getArmInfo(html) {
    var armInfo = {
        '名称': '',
        '颜色': '#000',
        '类别': '',
        '组别': '',
        '描述': '',
        '作用': '',
        '主属性': [],
        '从属性': []
    };
    var matches = /<span style="color:([^<>]+);">([^<>]+)<\/span>/.exec(html);
    if (!matches) return armInfo;

    armInfo['颜色'] = matches[1];
    armInfo['名称'] = matches[2];

    var _matches$2$split = matches[2].split('的');

    var _matches$2$split2 = _slicedToArray(_matches$2$split, 2);

    var _matches$2$split2$ = _matches$2$split2[1];
    armInfo['组别'] = _matches$2$split2$ === undefined ? '' : _matches$2$split2$;

    armInfo['类别'] = getArmClassNameByGroupName(armInfo['组别']);

    var _html$split = html.split('</span> - ', 2);

    var _html$split2 = _slicedToArray(_html$split, 2);

    var _html$split2$ = _html$split2[1];
    armInfo['描述'] = _html$split2$ === undefined ? '' : _html$split2$;

    var description = Util.removeHtmlTag(armInfo['描述']);

    var _description$split = description.split('\n', 1);

    var _description$split2 = _slicedToArray(_description$split, 1);

    var _description$split2$ = _description$split2[0];
    armInfo['作用'] = _description$split2$ === undefined ? '' : _description$split2$;


    matches = /主属性：(.+?)\n/.exec(description);
    if (matches) armInfo['主属性'] = matches[1].split('。');

    matches = /从属性：(.+?)(\n|$)/.exec(description);
    if (matches) armInfo['从属性'] = matches[1].split('。');

    var smMatches = description.match(/([^。\s]+神秘)：(.+?)。/g);
    for (var i in smMatches) {
        var subMatches = /([^。\s]+神秘)：(.+?)。/.exec(smMatches[i]);
        if (smMatches) {
            armInfo[subMatches[1]] = subMatches[2];
        }
    }
    return armInfo;
};

/**
 * 获取装备等级情况
 * @param html 装备的HTML代码
 * @returns {Map} 装备等级情况列表
 */
var getArmsLevelInfo = exports.getArmsLevelInfo = function getArmsLevelInfo(html) {
    var armsLevelList = new Map([['武器', 0], ['护甲', 0], ['项链', 0]]);
    var matches = html.match(/value="(\S+?)等级\[\s*(\d+)\s*] 经验:(\d+)"/g);
    for (var i in matches) {
        var subMatches = /value="(\S+?)等级\[\s*(\d+)\s*] 经验:(\d+)"/.exec(matches[i]);
        armsLevelList.set(subMatches[1], { '等级': parseInt(subMatches[2]), '经验': parseInt(subMatches[3]) });
    }
    return armsLevelList;
};

/**
 * 获取指定名称的道具等级
 * @param {string} itemName 道具名称
 * @returns {number} 道具等级
 */
var getLevelByName = exports.getLevelByName = function getLevelByName(itemName) {
    switch (itemName) {
        case '零时迷子的碎片':
        case '被遗弃的告白信':
        case '学校天台的钥匙':
        case 'TMA最新作压缩包':
            return 1;
        case 'LOLI的钱包':
        case '棒棒糖':
            return 2;
        case '蕾米莉亚同人漫画':
        case '十六夜同人漫画':
            return 3;
        case '档案室钥匙':
        case '傲娇LOLI娇蛮音CD':
            return 4;
        case '整形优惠卷':
        case '消逝之药':
            return 5;
        default:
            return 0;
    }
};

/**
 * 获取道具使用情况
 * @param html 争夺首页的HTML代码
 * @returns {Map} 道具使用情况列表
 */
var getItemsUsedNumInfo = exports.getItemsUsedNumInfo = function getItemsUsedNumInfo(html) {
    var itemUsedNumList = new Map([['蕾米莉亚同人漫画', 0], ['十六夜同人漫画', 0], ['档案室钥匙', 0], ['傲娇LOLI娇蛮音CD', 0], ['消逝之药', 0], ['整形优惠卷', 0]]);
    var matches = html.match(/value="\[\s*(\d+)\s*](\S+?)"/g);
    for (var i in matches) {
        var subMatches = /value="\[\s*(\d+)\s*](\S+?)"/.exec(matches[i]);
        if (itemUsedNumList.has(subMatches[2])) {
            itemUsedNumList.set(subMatches[2], parseInt(subMatches[1]));
        }
    }
    return itemUsedNumList;
};

/**
 * 添加批量使用和出售道具按钮
 */
var addBatchUseAndSellItemsButton = function addBatchUseAndSellItemsButton() {
    $('\n<div class="pd_item_btns" data-name="handleItemsBtns">\n  <button name="useItems" type="button" style="color: #00f;" title="\u6279\u91CF\u4F7F\u7528\u6307\u5B9A\u9053\u5177">\u6279\u91CF\u4F7F\u7528</button>\n  <button name="sellItems" type="button" style="color: #f00;" title="\u6279\u91CF\u51FA\u552E\u6307\u5B9A\u9053\u5177">\u6279\u91CF\u51FA\u552E</button>\n</div>\n').insertAfter($itemArea).find('[name="useItems"]').click(function () {
        return showBatchUseAndSellItemsDialog(1, safeId);
    }).end().find('[name="sellItems"]').click(function () {
        return showBatchUseAndSellItemsDialog(2, safeId);
    });

    Public.addSlowActionChecked($('.pd_item_btns[data-name="handleItemsBtns"]'));
};

/**
 * 显示批量使用和出售道具对话框
 * @param {number} type 对话框类型，1：批量使用；2：批量出售
 */
var showBatchUseAndSellItemsDialog = function showBatchUseAndSellItemsDialog(type) {
    var dialogName = 'pdBatchUseAndSellItemsDialog';
    if ($('#' + dialogName).length > 0) return;
    Msg.destroy();
    var typeName = type === 1 ? '使用' : '出售';
    (0, _Config.read)();

    var itemTypesOptionHtml = '';
    var _iteratorNormalCompletion23 = true;
    var _didIteratorError23 = false;
    var _iteratorError23 = undefined;

    try {
        for (var _iterator23 = itemTypeList.slice(6)[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
            var itemName = _step23.value;

            itemTypesOptionHtml += '<option>' + itemName + '</option>';
        }
    } catch (err) {
        _didIteratorError23 = true;
        _iteratorError23 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion23 && _iterator23.return) {
                _iterator23.return();
            }
        } finally {
            if (_didIteratorError23) {
                throw _iteratorError23;
            }
        }
    }

    var html = '\n<div class="pd_cfg_main">\n  <div style="margin: 5px 0;">\u8BF7\u9009\u62E9\u60F3\u6279\u91CF' + typeName + '\u7684\u9053\u5177\u79CD\u7C7B\uFF08\u6309<b>Ctrl\u952E</b>\u6216<b>Shift\u952E</b>\u53EF\u591A\u9009\uFF09\uFF1A</div>\n  <select name="itemTypes" size="6" style="width: 320px;" multiple>' + itemTypesOptionHtml + '</select>\n</div>\n<div class="pd_cfg_btns">\n  <button name="sell" type="button">' + typeName + '</button>\n  <button data-action="close" type="button">\u5173\u95ED</button>\n</div>';
    var $dialog = Dialog.create(dialogName, '\u6279\u91CF' + typeName + '\u9053\u5177', html);

    $dialog.find('[name="itemTypes"]').keydown(function (e) {
        if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            $(this).children().prop('selected', true);
        }
    }).end().find('[name="sell"]').click(function () {
        var typeList = $dialog.find('[name="itemTypes"]').val();
        if (!Array.isArray(typeList)) return;
        (0, _Config.read)();
        if (type === 1) Config.defUseItemTypeList = typeList;else Config.defSellItemTypeList = typeList;
        (0, _Config.write)();
        if (!confirm('\u662F\u5426' + typeName + '\u6240\u9009\u9053\u5177\u79CD\u7C7B\uFF1F')) return;
        Dialog.close(dialogName);
        if (type === 1) useItems({ typeList: typeList, safeId: safeId });else sellItems({ typeList: typeList, safeId: safeId });
    });

    $dialog.find('[name="itemTypes"] > option').each(function () {
        var $this = $(this);
        var itemTypeList = type === 1 ? Config.defUseItemTypeList : Config.defSellItemTypeList;
        if (itemTypeList.includes($this.val())) $this.prop('selected', true);
    });

    Dialog.show(dialogName);
    Script.runFunc('Item.showBatchUseAndSellItemsDialog_after_', type);
};

/**
 * 使用道具
 * @param {string[]} typeList 想要使用的道具种类列表
 * @param {string} safeId SafeID
 * @param {boolean} nextActionEnabled 是否执行后续操作
 */
var useItems = exports.useItems = function useItems(_ref6) {
    var typeList = _ref6.typeList,
        safeId = _ref6.safeId,
        _ref6$nextActionEnabl = _ref6.nextActionEnabled,
        nextActionEnabled = _ref6$nextActionEnabl === undefined ? false : _ref6$nextActionEnabl;

    var totalSuccessNum = 0,
        totalValidNum = 0,
        totalInvalidNum = 0,
        index = 0;
    var useInfo = {};
    var tmpItemTypeList = [].concat(_toConsumableArray(typeList));
    var isStop = false;

    /**
     * 使用
     * @param {number} itemId 道具ID
     * @param {string} itemName 道具名称
     * @param {number} itemNum 本轮使用的道具数量
     */
    var use = function use(itemId, itemName, itemNum) {
        index++;
        $.ajax({
            type: 'POST',
            url: 'kf_fw_ig_mybpdt.php',
            data: 'do=1&id=' + itemId + '&safeid=' + safeId,
            timeout: _Const2.default.defAjaxTimeout
        }).done(function (html) {
            if (!html) return;
            var msg = Util.removeHtmlTag(html);
            var isDelete = false;
            if (/(成功|失败)！/.test(msg)) {
                totalSuccessNum++;
                if (!(itemName in useInfo)) useInfo[itemName] = { '道具': 0, '有效道具': 0, '无效道具': 0 };
                useInfo[itemName]['道具']++;
                if (/成功！/.test(msg)) {
                    useInfo[itemName]['有效道具']++;
                    totalValidNum++;
                } else {
                    useInfo[itemName]['无效道具']++;
                    totalInvalidNum++;
                }
                $wait.find('.pd_countdown').text(totalSuccessNum);
                isDelete = true;
            } else if (msg.includes('无法再使用')) {
                index = itemNum;
                var typeIndex = tmpItemTypeList.indexOf(itemName);
                if (typeIndex > -1) tmpItemTypeList.splice(typeIndex, 1);
            } else if (msg.includes('错误的安全码')) {
                isStop = true;
            } else {
                isDelete = true;
            }

            if (isDelete) {
                $itemArea.find('[id="wp_' + itemId + '"]').fadeOut('normal', function () {
                    $(this).remove();
                });
            }
            console.log('\u3010Lv.' + getLevelByName(itemName) + '\uFF1A' + itemName + '\u3011 ' + msg);
            $('.pd_result[data-name="itemResult"]:last').append('<li>\u3010Lv.' + getLevelByName(itemName) + '\uFF1A' + itemName + '\u3011 ' + msg + '</li>');
            Script.runFunc('Item.useItems_after_', msg);
        }).fail(function () {
            $('.pd_result[data-name="itemResult"]:last').append('<li>\u3010Lv.' + getLevelByName(itemName) + '\uFF1A' + itemName + '\u3011 <span class="pd_notice">\u8FDE\u63A5\u8D85\u65F6</span></li>');
        }).always(function () {
            if (isStop || $wait.data('stop')) {
                complete();
            } else {
                if (index === itemNum) setTimeout(getNextItems, typeof _Const2.default.specialAjaxInterval === 'function' ? _Const2.default.specialAjaxInterval() : _Const2.default.specialAjaxInterval);else setTimeout(function () {
                    return $(document).dequeue('UseItems');
                }, typeof _Const2.default.specialAjaxInterval === 'function' ? _Const2.default.specialAjaxInterval() : _Const2.default.specialAjaxInterval);
            }
        });
    };

    /**
     * 获取当前的道具
     */
    var getCurrentItems = function getCurrentItems() {
        var itemList = [];
        $itemArea.find('tr[id^="wp_"]').each(function () {
            var $this = $(this);
            var matches = /wp_(\d+)/.exec($this.attr('id'));
            if (!matches) return;
            var itemId = parseInt(matches[1]);
            var itemName = $this.find('> td:nth-child(3)').text().trim();
            if (tmpItemTypeList.includes(itemName)) itemList.push({ itemId: itemId, itemName: itemName });
        });
        if (!itemList.length) {
            complete();
            return;
        }

        index = 0;
        $(document).clearQueue('UseItems');
        $.each(itemList, function (i, _ref7) {
            var itemId = _ref7.itemId,
                itemName = _ref7.itemName;

            $(document).queue('UseItems', function () {
                return use(itemId, itemName, itemList.length);
            });
        });
        $(document).dequeue('UseItems');
    };

    /**
     * 获取下一批道具
     */
    var getNextItems = function getNextItems() {
        getNextObjects(2, function () {
            if ($wait.data('stop')) complete();else setTimeout(getCurrentItems, _Const2.default.defAjaxInterval);
        });
    };

    /**
     * 执行后续操作
     */
    var nextAction = function nextAction() {
        var action = null;
        if (Config.sellItemsAfterOpenBoxesEnabled) {
            action = function action() {
                return sellItems({ typeList: Config.defSellItemTypeList, safeId: safeId, nextActionEnabled: nextActionEnabled });
            };
        }
        if (action) {
            setTimeout(action, _Const2.default.minActionInterval);
        } else if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
            showArmsFinalAdditionAfterOpenBoxes();
        }
    };

    /**
     * 操作完成
     */
    var complete = function complete() {
        $(document).clearQueue('UseItems');
        Msg.remove($wait);
        if ($.isEmptyObject(useInfo)) {
            console.log('没有道具被使用！');
            if (nextActionEnabled) nextAction();
            Script.runFunc('Item.useItems_complete_', { nextActionEnabled: nextActionEnabled, $armArea: $armArea });
            return;
        }

        var itemTypeNum = 0;
        var resultStat = '';
        var _iteratorNormalCompletion24 = true;
        var _didIteratorError24 = false;
        var _iteratorError24 = undefined;

        try {
            for (var _iterator24 = Util.getSortedObjectKeyList(typeList, useInfo)[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
                var itemName = _step24.value;

                itemTypeNum++;
                var itemLevel = getLevelByName(itemName);
                var stat = useInfo[itemName];
                var successNum = stat['道具'];
                delete stat['道具'];
                if (stat['有效道具'] === 0) delete stat['有效道具'];
                if (stat['无效道具'] === 0) delete stat['无效道具'];
                if (!$.isEmptyObject(stat)) {
                    resultStat += '\u3010Lv.' + itemLevel + '\uFF1A' + itemName + '\u3011 <i>\u9053\u5177<ins>-' + successNum + '</ins></i> ';
                    var _iteratorNormalCompletion25 = true;
                    var _didIteratorError25 = false;
                    var _iteratorError25 = undefined;

                    try {
                        for (var _iterator25 = Util.entries(stat)[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
                            var _step25$value = _slicedToArray(_step25.value, 2),
                                key = _step25$value[0],
                                num = _step25$value[1];

                            resultStat += '<i>' + key + '<em>+' + num + '</em></i> ';
                        }
                    } catch (err) {
                        _didIteratorError25 = true;
                        _iteratorError25 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion25 && _iterator25.return) {
                                _iterator25.return();
                            }
                        } finally {
                            if (_didIteratorError25) {
                                throw _iteratorError25;
                            }
                        }
                    }

                    resultStat += '<br>';
                    Log.push('使用道具', '\u5171\u6709`' + successNum + '`\u4E2A\u3010`Lv.' + itemLevel + '\uFF1A' + itemName + '`\u3011\u9053\u5177\u88AB\u4F7F\u7528', { gain: stat, pay: { '道具': -successNum } });
                }
            }
        } catch (err) {
            _didIteratorError24 = true;
            _iteratorError24 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion24 && _iterator24.return) {
                    _iterator24.return();
                }
            } finally {
                if (_didIteratorError24) {
                    throw _iteratorError24;
                }
            }
        }

        $('.pd_result[data-name="itemResult"]:last').append('\n<li class="pd_stat">\n  <b>\u7EDF\u8BA1\u7ED3\u679C\uFF08\u5171\u6709<em>' + itemTypeNum + '</em>\u4E2A\u79CD\u7C7B\u4E2D\u7684<em>' + totalSuccessNum + '</em>\u4E2A\u9053\u5177\u88AB\u4F7F\u7528\uFF0C\n<i>\u6709\u6548\u9053\u5177<em>+' + totalValidNum + '</em></i><i>\u65E0\u6548\u9053\u5177<em>+' + totalInvalidNum + '</em></i>\uFF09\uFF1A</b><br>\n  ' + resultStat + '\n</li>');
        console.log('\u5171\u6709' + itemTypeNum + '\u4E2A\u79CD\u7C7B\u4E2D\u7684' + totalSuccessNum + '\u4E2A\u9053\u5177\u88AB\u4F7F\u7528\uFF0C\u6709\u6548\u9053\u5177+' + totalValidNum + '\uFF0C\u65E0\u6548\u9053\u5177+' + totalInvalidNum);
        Msg.show('<strong>\u5171\u6709<em>' + itemTypeNum + '</em>\u4E2A\u79CD\u7C7B\u4E2D\u7684<em>' + totalSuccessNum + '</em>\u4E2A\u9053\u5177\u88AB\u4F7F\u7528</strong>' + ('<i>\u6709\u6548\u9053\u5177<em>+' + totalValidNum + '</em></i><i>\u65E0\u6548\u9053\u5177<em>+' + totalInvalidNum + '</em></i>'), -1);

        setTimeout(function () {
            return getNextObjects(2);
        }, _Const2.default.defAjaxInterval);
        if (nextActionEnabled) nextAction();
        Script.runFunc('Item.useItems_complete_', { nextActionEnabled: nextActionEnabled, $armArea: $armArea });
    };

    $itemArea.parent().append('<ul class="pd_result" data-name="itemResult"><li><strong>使用结果：</strong></li></ul>');
    var $wait = Msg.wait('<strong>正在使用道具中&hellip;</strong><i>已使用：<em class="pd_countdown">0</em></i><a class="pd_stop_action" href="#">停止操作</a>');
    getCurrentItems();
};

/**
 * 出售道具
 * @param {string[]} typeList 想要出售的道具种类列表
 * @param {string} safeId SafeID
 * @param {boolean} nextActionEnabled 是否执行后续操作
 */
var sellItems = exports.sellItems = function sellItems(_ref8) {
    var typeList = _ref8.typeList,
        safeId = _ref8.safeId,
        _ref8$nextActionEnabl = _ref8.nextActionEnabled,
        nextActionEnabled = _ref8$nextActionEnabl === undefined ? false : _ref8$nextActionEnabl;

    var successNum = 0,
        index = 0;
    var sellInfo = {};
    var isStop = false;

    /**
     * 出售
     * @param {number} itemId 道具ID
     * @param {string} itemName 道具名称
     * @param {number} itemNum 本轮出售的道具数量
     */
    var sell = function sell(itemId, itemName, itemNum) {
        index++;
        $.ajax({
            type: 'POST',
            url: 'kf_fw_ig_mybpdt.php',
            data: 'do=2&id=' + itemId + '&safeid=' + safeId,
            timeout: _Const2.default.defAjaxTimeout
        }).done(function (html) {
            if (!html) return;
            var msg = Util.removeHtmlTag(html);
            if (msg.includes('错误的安全码')) isStop = true;
            console.log('\u3010Lv.' + getLevelByName(itemName) + '\uFF1A' + itemName + '\u3011 ' + msg);
            $('.pd_result[data-name="itemResult"]:last').append('<li>\u3010Lv.' + getLevelByName(itemName) + '\uFF1A' + itemName + '\u3011 ' + msg + '</li>');
            $itemArea.find('[id="wp_' + itemId + '"]').fadeOut('normal', function () {
                $(this).remove();
            });

            var matches = /出售该物品获得了\[\s*(\d+)\s*]KFB/.exec(msg);
            if (matches) {
                successNum++;
                if (!(itemName in sellInfo)) sellInfo[itemName] = { num: 0, sell: 0 };
                sellInfo[itemName].num++;
                sellInfo[itemName].sell += parseInt(matches[1]);
                $wait.find('.pd_countdown').text(successNum);
            }
            Script.runFunc('Item.sellItems_after_', msg);
        }).fail(function () {
            $('.pd_result[data-name="itemResult"]:last').append('<li>\u3010Lv.' + getLevelByName(itemName) + '\uFF1A' + itemName + '\u3011 <span class="pd_notice">\u8FDE\u63A5\u8D85\u65F6</span></li>');
        }).always(function () {
            if (isStop || $wait.data('stop')) {
                complete();
            } else {
                if (index === itemNum) setTimeout(getNextItems, _Const2.default.minActionInterval);else setTimeout(function () {
                    return $(document).dequeue('SellItems');
                }, _Const2.default.minActionInterval);
            }
        });
    };

    /**
     * 获取当前的道具
     */
    var getCurrentItems = function getCurrentItems() {
        var itemList = [];
        $itemArea.find('tr[id^="wp_"]').each(function () {
            var $this = $(this);
            var matches = /wp_(\d+)/.exec($this.attr('id'));
            if (!matches) return;
            var itemId = parseInt(matches[1]);
            var itemName = $this.find('> td:nth-child(3)').text().trim();
            if (typeList.includes(itemName)) itemList.push({ itemId: itemId, itemName: itemName });
        });
        if (!itemList.length) {
            complete();
            return;
        }

        index = 0;
        $(document).clearQueue('SellItems');
        $.each(itemList, function (i, _ref9) {
            var itemId = _ref9.itemId,
                itemName = _ref9.itemName;

            $(document).queue('SellItems', function () {
                return sell(itemId, itemName, itemList.length);
            });
        });
        $(document).dequeue('SellItems');
    };

    /**
     * 获取下一批道具
     */
    var getNextItems = function getNextItems() {
        getNextObjects(2, function () {
            if ($wait.data('stop')) complete();else setTimeout(getCurrentItems, _Const2.default.defAjaxInterval);
        });
    };

    /**
     * 操作完成
     */
    var complete = function complete() {
        $(document).clearQueue('SellItems');
        Msg.remove($wait);
        if ($.isEmptyObject(sellInfo)) {
            console.log('没有道具被出售！');
            if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
                showArmsFinalAdditionAfterOpenBoxes();
            }
            Script.runFunc('Item.sellItems_complete_', { nextActionEnabled: nextActionEnabled, $armArea: $armArea });
            return;
        }

        var itemTypeNum = 0,
            totalSell = 0;
        var resultStat = '';
        var _iteratorNormalCompletion26 = true;
        var _didIteratorError26 = false;
        var _iteratorError26 = undefined;

        try {
            for (var _iterator26 = Util.getSortedObjectKeyList(typeList, sellInfo)[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
                var itemName = _step26.value;

                itemTypeNum++;
                var itemLevel = getLevelByName(itemName);
                var _sellInfo$itemName = sellInfo[itemName],
                    _sell = _sellInfo$itemName.sell,
                    num = _sellInfo$itemName.num;

                totalSell += _sell;
                resultStat += '\u3010Lv.' + itemLevel + '\uFF1A' + itemName + '\u3011 <i>\u9053\u5177<ins>-' + num + '</ins></i> <i>KFB<em>+' + _sell.toLocaleString() + '</em></i><br>';
                Log.push('出售道具', '\u5171\u6709`' + num + '`\u4E2A\u3010`Lv.' + itemLevel + '\uFF1A' + itemName + '`\u3011\u9053\u5177\u51FA\u552E\u6210\u529F', { gain: { 'KFB': _sell }, pay: { '道具': -num } });
            }
        } catch (err) {
            _didIteratorError26 = true;
            _iteratorError26 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion26 && _iterator26.return) {
                    _iterator26.return();
                }
            } finally {
                if (_didIteratorError26) {
                    throw _iteratorError26;
                }
            }
        }

        $('.pd_result[data-name="itemResult"]:last').append('\n<li class="pd_stat">\n  <b>\u7EDF\u8BA1\u7ED3\u679C\uFF08\u5171\u6709<em>' + itemTypeNum + '</em>\u4E2A\u79CD\u7C7B\u4E2D\u7684<em>' + successNum + '</em>\u4E2A\u9053\u5177\u51FA\u552E\u6210\u529F\uFF09\uFF1A</b> <i>KFB<em>+' + totalSell.toLocaleString() + '</em></i><br>\n  ' + resultStat + '\n</li>');
        console.log('\u5171\u6709' + itemTypeNum + '\u4E2A\u79CD\u7C7B\u4E2D\u7684' + successNum + '\u4E2A\u9053\u5177\u51FA\u552E\u6210\u529F\uFF0CKFB+' + totalSell);
        Msg.show('<strong>\u5171\u6709<em>' + itemTypeNum + '</em>\u4E2A\u79CD\u7C7B\u4E2D\u7684<em>' + successNum + '</em>\u4E2A\u9053\u5177\u51FA\u552E\u6210\u529F</strong><i>KFB<em>+' + totalSell.toLocaleString() + '</em></i>', -1);
        setTimeout(function () {
            return getNextObjects(2);
        }, _Const2.default.defAjaxInterval);
        if (Config.showArmsFinalAdditionAfterOpenBoxesEnabled) {
            showArmsFinalAdditionAfterOpenBoxes();
        }
        Script.runFunc('Item.sellItems_complete_', { nextActionEnabled: nextActionEnabled, $armArea: $armArea });
    };

    $itemArea.parent().append('<ul class="pd_result" data-name="itemResult"><li><strong>\u51FA\u552E\u7ED3\u679C\uFF1A</strong></li></ul>');
    var $wait = Msg.wait('<strong>正在出售道具中&hellip;</strong><i>已出售：<em class="pd_countdown">0</em></i><a class="pd_stop_action" href="#">停止操作</a>');
    getCurrentItems();
};

/**
 * 购买物品
 * @param {string[]} buyItemIdList 购买物品ID列表
 */
var buyItems = exports.buyItems = function buyItems(buyItemIdList) {
    if (new Date() < Util.getDateByTime(Config.buyItemAfterTime)) {
        $(document).dequeue('AutoAction');
        return;
    }
    var index = 0,
        subIndex = 0;
    var isStop = false;
    var itemIdList = [];

    /**
     * 通过物品ID获取物品名称
     * @param {number} itemId 物品ID
     * @returns {string} 物品名称
     */
    var getItemNameById = function getItemNameById(itemId) {
        switch (parseInt(itemId)) {
            case 101:
                return '等级经验药丸';
            case 102:
                return '等级经验药丸（蛋）';
            case 103:
                return '修炼手册';
            default:
                return '未知';
        }
    };

    /**
     * 通过物品ID获取购买物品的代价
     * @param {number} itemId 物品ID
     * @returns {?{}} 购买物品的代价
     */
    var getItemPayById = function getItemPayById(itemId) {
        switch (parseInt(itemId)) {
            case 101:
                return { 'KFB': -5000 };
            case 102:
                return { 'KFB': -10000 };
            case 103:
                return { '普通盒子': -100 };
            default:
                return null;
        }
    };

    /**
     * 获取自动购买物品的Cookies有效期
     * @returns {Date} Cookies有效期的Date对象
     */
    var getCookieDate = function getCookieDate() {
        var now = new Date();
        var date = Util.getTimezoneDateByTime('00:25:00');
        if (now > date) date.setDate(date.getDate() + 1);
        return date;
    };

    /**
     * 读取购买页面信息
     */
    var readBuyInfo = function readBuyInfo() {
        console.log('读取购买页面信息Start');
        $.ajax({
            type: 'GET',
            url: 'kf_fw_ig_shop.php?t=' + $.now(),
            timeout: _Const2.default.defAjaxTimeout
        }).done(function (html) {
            if (Util.getCookie(_Const2.default.buyItemReadyCookieName)) {
                Msg.remove($wait);
                $(document).dequeue('AutoAction');
                return;
            }
            var matches = /safeid=(\w+)/.exec(html);
            if (matches) {
                Util.setCookie(_Const2.default.buyItemReadyCookieName, 1, Util.getDate('+5m'));
                var _safeId = matches[1];
                setTimeout(function () {
                    return buy(parseInt(itemIdList[index][subIndex]), _safeId);
                }, _Const2.default.defAjaxInterval);
            } else {
                Msg.remove($wait);
                Util.setCookie(_Const2.default.buyItemCookieName, 1, Util.getDate('+15m'));
                $(document).dequeue('AutoAction');
            }
        }).fail(function () {
            setTimeout(readBuyInfo, _Const2.default.defAjaxInterval);
        });
    };

    /**
     * 购买
     * @param {number} itemId 物品ID
     * @param {string} safeId SafeID
     */
    var buy = function buy(itemId, safeId) {
        $.ajax({
            type: 'POST',
            url: 'kf_fw_ig_shop.php',
            data: 'buy=' + itemId + '&safeid=' + safeId,
            timeout: _Const2.default.defAjaxTimeout
        }).done(function (html) {
            var msg = Util.removeHtmlTag(html);
            var itemName = getItemNameById(itemId);
            console.log('\u3010\u8D2D\u4E70\u7269\u54C1\u3011\u3010' + itemName + '\u3011\uFF1A' + msg);
            var isShowMsg = false;

            if (msg.includes('购买成功')) {
                index++;
                subIndex = 0;
                var matches = /\+(\d+)(武器\/护甲经验|经验)/.exec(msg);
                if (matches) {
                    var num = parseInt(matches[1]),
                        key = matches[2];
                    var gain = {},
                        pay = getItemPayById(itemId);
                    if (key === '经验') {
                        gain['经验值'] = num;
                    } else {
                        gain['武器经验'] = num;
                        gain['护甲经验'] = num;
                    }
                    if (pay) {
                        Log.push('购买物品', '\u5171\u6709`1`\u4E2A\u3010`' + itemName + '`\u3011\u8D2D\u4E70\u6210\u529F', { gain: gain, pay: pay });
                    }

                    var msgStat = '';
                    var _iteratorNormalCompletion27 = true;
                    var _didIteratorError27 = false;
                    var _iteratorError27 = undefined;

                    try {
                        for (var _iterator27 = Util.entries(gain)[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
                            var _step27$value = _slicedToArray(_step27.value, 2),
                                _key = _step27$value[0],
                                value = _step27$value[1];

                            msgStat += '<i>' + _key + '<em>+' + value.toLocaleString() + '</em></i>';
                        }
                    } catch (err) {
                        _didIteratorError27 = true;
                        _iteratorError27 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion27 && _iterator27.return) {
                                _iterator27.return();
                            }
                        } finally {
                            if (_didIteratorError27) {
                                throw _iteratorError27;
                            }
                        }
                    }

                    var _iteratorNormalCompletion28 = true;
                    var _didIteratorError28 = false;
                    var _iteratorError28 = undefined;

                    try {
                        for (var _iterator28 = Util.entries(pay)[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
                            var _step28$value = _slicedToArray(_step28.value, 2),
                                _key2 = _step28$value[0],
                                value = _step28$value[1];

                            msgStat += '<i>' + _key2 + '<ins>' + value.toLocaleString() + '</ins></i>';
                        }
                    } catch (err) {
                        _didIteratorError28 = true;
                        _iteratorError28 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion28 && _iterator28.return) {
                                _iterator28.return();
                            }
                        } finally {
                            if (_didIteratorError28) {
                                throw _iteratorError28;
                            }
                        }
                    }

                    isShowMsg = true;
                    Msg.show('<strong>\u8D2D\u4E70\u7269\u54C1\u3010' + itemName + '\u3011' + msgStat);
                    Script.runFunc('Item.buyItems_success_', msg);
                }
            } else if (msg.includes('不足')) {
                subIndex++;
                if (subIndex >= itemIdList[index].length) {
                    index++;
                    subIndex = 0;
                }
            } else {
                if (!msg.includes('操作过快')) {
                    index++;
                    subIndex = 0;
                }
                if (msg.includes('本日购买次数已用完')) {
                    if (index === 1) isShowMsg = true;
                    isStop = true;
                    Util.setCookie(_Const2.default.buyItemCookieName, 1, getCookieDate());
                }
            }
            if (!isShowMsg) {
                Msg.show('<strong>\u8D2D\u4E70\u7269\u54C1\u3010' + itemName + '\u3011\uFF1A' + msg + '</strong>');
            }
        }).fail(function () {
            index++;
            subIndex = 0;
            Msg.show('<strong>\u8D2D\u4E70\u7269\u54C1\u3010' + getItemNameById(itemId) + '\u3011\uFF1A\u8FDE\u63A5\u8D85\u65F6</strong>');
        }).always(function () {
            isStop = isStop || $wait.data('stop');
            if (isStop || index >= itemIdList.length) {
                Msg.remove($wait);
                Util.deleteCookie(_Const2.default.buyItemReadyCookieName);
                Util.setCookie(_Const2.default.buyItemCookieName, 1, getCookieDate());
                setTimeout(function () {
                    return $(document).dequeue('AutoAction');
                }, _Const2.default.minActionInterval);
                Script.runFunc('Item.buyItems_complete_');
            } else {
                setTimeout(function () {
                    return buy(parseInt(itemIdList[index][subIndex]), safeId);
                }, _Const2.default.minActionInterval);
            }
        });
    };

    var _iteratorNormalCompletion29 = true;
    var _didIteratorError29 = false;
    var _iteratorError29 = undefined;

    try {
        for (var _iterator29 = buyItemIdList[Symbol.iterator](), _step29; !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
            var value = _step29.value;

            if (!/^\d+(\|\d+)*$/.test(value)) continue;
            var arr = value.split('|').filter(function (id) {
                return id && getItemNameById(parseInt(id)) !== '未知';
            });
            if (arr.length > 0) {
                itemIdList.push(arr);
            }
        }
    } catch (err) {
        _didIteratorError29 = true;
        _iteratorError29 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion29 && _iterator29.return) {
                _iterator29.return();
            }
        } finally {
            if (_didIteratorError29) {
                throw _iteratorError29;
            }
        }
    }

    if (!itemIdList.length) {
        Util.setCookie(_Const2.default.buyItemCookieName, 1, getCookieDate());
        $(document).dequeue('AutoAction');
        return;
    }
    var $wait = Msg.wait('<strong>\u6B63\u5728\u8D2D\u4E70\u7269\u54C1\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em class="pd_countdown">' + itemIdList.length + '</em></i><a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
    readBuyInfo();
};

/**
 * 在物品商店显示当前持有的KFB和贡献
 */
var showMyInfoInItemShop = exports.showMyInfoInItemShop = function showMyInfoInItemShop() {
    $.get('profile.php?action=show&uid=' + _Info2.default.uid + '&t=' + $.now(), function (html) {
        var kfbMatches = /论坛货币：(\d+)\s*KFB/.exec(html);
        var gxMatches = /贡献数值：(\d+(?:\.\d+)?)/.exec(html);
        if (!kfbMatches && !gxMatches) return;
        var kfb = parseInt(kfbMatches[1]);
        var gx = parseFloat(gxMatches[1]);
        $('.kf_fw_ig_title1:eq(1)').append('\n<span style="margin-left: 7px;">(\u5F53\u524D\u6301\u6709 <b style="font-size: 14px;">' + kfb.toLocaleString() + '</b> KFB \u548C <b style="font-size: 14px;">' + gx + '</b> \u8D21\u732E)</span>\n');
    });
};

/**
 * 在物品商店显示购买物品提示
 */
var showBuyItemTips = exports.showBuyItemTips = function showBuyItemTips() {
    $('.kf_fw_ig1:first > tbody > tr:gt(0)').each(function (index) {
        if (index <= 1) {
            var $this = $(this);
            $this.find('td:last-child').append('<span class="pd_cfg_tips pd_highlight" title="\u7279\u522B\u63D0\u793A\uFF1A\n\u795E\u79D8\u7CFB\u6570\u975E\u795E\u79D8\u7B49\u7EA7\uFF0C\u8D2D\u4E70\u3010\u7B49\u7EA7\u7ECF\u9A8C\u836F\u4E38' + (index === 1 ? '（蛋）' : '') + '\u3011\u53EF\u80FD\u5BFC\u81F4\u795E\u79D8\u7B49\u7EA7\u4E0B\u964D\uFF0C\u8BF7\u77E5\u6089\uFF01\n\u795E\u79D8\u7B49\u7EA7\u516C\u5F0F\uFF1A\u795E\u79D8\u7CFB\u6570*((\u795E\u79D8\u7CFB\u6570*0.5)+(\u8D21\u732E*5)+(KFB*0.001)+(\u53D1\u5E16*0.01))">[?]</span>');
        }
    });
};

},{"./Config":3,"./Const":5,"./Dialog":6,"./Info":8,"./Log":10,"./Loot":12,"./Msg":13,"./Public":16,"./Script":18,"./Util":21}],10:[function(require,module,exports){
/* 日志模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMergeLog = exports.push = exports.clear = exports.write = exports.read = undefined;

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 保存日志的键值名称
var name = _Const2.default.storagePrefix + 'log';

/**
 * 读取日志
 * @returns {{}} 日志对象
 */
var read = exports.read = function read() {
    var log = {};
    var options = Util.readData(name + '_' + _Info2.default.uid);
    if (!options) return log;
    try {
        options = JSON.parse(options);
    } catch (ex) {
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
var write = exports.write = function write(log) {
    return Util.writeData(name + '_' + _Info2.default.uid, JSON.stringify(log));
};

/**
 * 清除日志
 */
var clear = exports.clear = function clear() {
    return Util.deleteData(name + '_' + _Info2.default.uid);
};

/**
 * 记录一条新日志
 * @param {string} type 日志类别
 * @param {string} action 行为
 * @param {?{}} gain 收获
 * @param {?{}} pay 付出
 */
var push = exports.push = function push(type, action) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$gain = _ref.gain,
        gain = _ref$gain === undefined ? null : _ref$gain,
        _ref$pay = _ref.pay,
        pay = _ref$pay === undefined ? null : _ref$pay;

    var log = read();
    var overdueDate = Util.getDateString(Util.getDate('-' + Config.logSaveDays + 'd'));
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Util.getObjectKeyList(log, 1)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var date = _step.value;

            if (date <= overdueDate) delete log[date];else break;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var now = new Date();
    var time = now.getTime();
    var today = Util.getDateString(now);
    var obj = { time: time, type: type, action: action };
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
var getMergeLog = exports.getMergeLog = function getMergeLog(log, newLog) {
    for (var date in newLog) {
        if (!Array.isArray(log[date])) {
            log[date] = newLog[date];
        } else {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                var _loop = function _loop() {
                    var newItem = _step2.value;

                    if (typeof newItem.time !== 'number' || typeof newItem.type !== 'string') return 'continue';
                    var index = log[date].findIndex(function (item) {
                        return newItem['time'] === item['time'] && newItem['type'] === item['type'];
                    });
                    if (index > -1) log[date][index] = newItem;else log[date].push(newItem);
                };

                for (var _iterator2 = newLog[date][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _ret = _loop();

                    if (_ret === 'continue') continue;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            log[date].sort(function (a, b) {
                return a.time > b.time ? 1 : -1;
            });
        }
    }
    return log;
};

},{"./Const":5,"./Info":8,"./Util":21}],11:[function(require,module,exports){
/* 日志对话框模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.show = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Dialog = require('./Dialog');

var Dialog = _interopRequireWildcard(_Dialog);

var _Config = require('./Config');

var _Log = require('./Log');

var Log = _interopRequireWildcard(_Log);

var _Item = require('./Item');

var Item = _interopRequireWildcard(_Item);

var _Read = require('./Read');

var Read = _interopRequireWildcard(_Read);

var _Script = require('./Script');

var Script = _interopRequireWildcard(_Script);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 显示日志对话框
 */
var show = exports.show = function show() {
    var dialogName = 'pdLogDialog';
    if ($('#' + dialogName).length > 0) return;
    (0, _Config.read)();
    Script.runFunc('LogDialog.show_before_');
    var html = '\n<div class="pd_cfg_main">\n  <div class="pd_log_nav">\n    <a class="pd_disabled_link" data-name="start" href="#">&lt;&lt;</a>\n    <a class="pd_disabled_link" data-name="prev" href="#" style="padding: 0 7px;">&lt;</a>\n    <h2 class="pd_log_date pd_custom_tips">\u6682\u65E0\u65E5\u5FD7</h2>\n    <a class="pd_disabled_link" data-name="next" href="#" style="padding: 0 7px;">&gt;</a>\n    <a class="pd_disabled_link" data-name="end" href="#">&gt;&gt;</a>\n  </div>\n  <fieldset>\n    <legend>\u65E5\u5FD7\u5185\u5BB9</legend>\n    <div>\n      <strong>\u6392\u5E8F\u65B9\u5F0F\uFF1A</strong>\n      <label title="\u6309\u65F6\u95F4\u987A\u5E8F\u6392\u5E8F"><input type="radio" name="sortType" value="time" checked> \u6309\u65F6\u95F4</label>\n      <label title="\u6309\u65E5\u5FD7\u7C7B\u522B\u6392\u5E8F"><input type="radio" name="sortType" value="type"> \u6309\u7C7B\u522B</label>\n    </div>\n    <div class="pd_stat pd_log_content">\u6682\u65E0\u65E5\u5FD7</div>\n  </fieldset>\n  <fieldset>\n    <legend>\u7EDF\u8BA1\u7ED3\u679C</legend>\n    <div>\n      <strong>\u7EDF\u8BA1\u8303\u56F4\uFF1A</strong>\n      <label title="\u663E\u793A\u5F53\u5929\u7684\u7EDF\u8BA1\u7ED3\u679C"><input type="radio" name="statType" value="current" checked> \u5F53\u5929</label>\n      <label title="\u663E\u793A\u8DDD\u8BE5\u65E5N\u5929\u5185\u7684\u7EDF\u8BA1\u7ED3\u679C"><input type="radio" name="statType" value="custom"></label>\n      <label title="\u663E\u793A\u8DDD\u8BE5\u65E5N\u5929\u5185\u7684\u7EDF\u8BA1\u7ED3\u679C"><input name="statDays" type="text" style="width: 22px;" maxlength="3"> \u5929\u5185</label>\n      <label title="\u663E\u793A\u5168\u90E8\u7EDF\u8BA1\u7ED3\u679C"><input type="radio" name="statType" value="all"> \u5168\u90E8</label>\n    </div>\n    <div class="pd_stat" data-name="stat">\u6682\u65E0\u65E5\u5FD7</div>\n  </fieldset>\n</div>\n<div class="pd_cfg_btns">\n  <span class="pd_cfg_about">\n    <a class="pd_btn_link" data-name="openImOrExLogDialog" href="#">\u5BFC\u5165/\u5BFC\u51FA\u65E5\u5FD7</a>\n    <a class="pd_btn_link" data-name="openBuyThreadLogDialog" href="#">\u67E5\u770B\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55</a>\n  </span>\n  <button data-action="close" type="button">\u5173\u95ED</button>\n  <button name="clear" type="button">\u6E05\u9664\u65E5\u5FD7</button>\n</div>';
    var $dialog = Dialog.create(dialogName, 'KFOL助手日志', html, 'width: 880px;');
    var $logNav = $dialog.find('.pd_log_nav');

    var log = Log.read();
    var dateList = [];
    var curIndex = 0;
    if (!$.isEmptyObject(log)) {
        dateList = Util.getObjectKeyList(log, 1);
        curIndex = dateList.length - 1;
        $logNav.find('.pd_log_date').attr('title', '\u603B\u5171\u8BB0\u5F55\u4E86' + dateList.length + '\u5929\u7684\u65E5\u5FD7').text(dateList[curIndex]);
        if (dateList.length > 1) {
            $logNav.find('[data-name="start"]').attr('title', dateList[0]).removeClass('pd_disabled_link');
            $logNav.find('[data-name="prev"]').attr('title', dateList[curIndex - 1]).removeClass('pd_disabled_link');
        }
    }
    $logNav.on('click', 'a[data-name]', function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.hasClass('pd_disabled_link')) return;
        var name = $this.data('name');
        if (name === 'start') {
            curIndex = 0;
        } else if (name === 'prev') {
            if (curIndex > 0) curIndex--;else return;
        } else if (name === 'next') {
            if (curIndex < dateList.length - 1) curIndex++;else return;
        } else if (name === 'end') {
            curIndex = dateList.length - 1;
        }
        $logNav.find('.pd_log_date').text(dateList[curIndex]);
        showLogContent(log, dateList[curIndex], $dialog);
        showLogStat(log, dateList[curIndex], $dialog);
        if (curIndex > 0) {
            $logNav.find('[data-name="start"]').attr('title', dateList[0]).removeClass('pd_disabled_link');
            $logNav.find('[data-name="prev"]').attr('title', dateList[curIndex - 1]).removeClass('pd_disabled_link');
        } else {
            $logNav.find('[data-name="start"], [data-name="prev"]').removeAttr('title').addClass('pd_disabled_link');
        }
        if (curIndex < dateList.length - 1) {
            $logNav.find('[data-name="next"]').attr('title', dateList[curIndex + 1]).removeClass('pd_disabled_link');
            $logNav.find('[data-name="end"]').attr('title', dateList[dateList.length - 1]).removeClass('pd_disabled_link');
        } else {
            $logNav.find('[data-name="next"], [data-name="end"]').removeAttr('title').addClass('pd_disabled_link');
        }
    });

    $dialog.find('[name="sortType"]').click(function () {
        var value = $(this).val();
        if (Config.logSortType !== value) {
            Config.logSortType = value;
            (0, _Config.write)();
            showLogContent(log, dateList[curIndex], $dialog);
        }
    }).end().find('[name="statType"]').click(function () {
        var value = $(this).val();
        if (Config.logStatType !== value) {
            Config.logStatType = value;
            (0, _Config.write)();
            showLogStat(log, dateList[curIndex], $dialog);
        }
    }).end().find('[name="statDays"]').keyup(function () {
        var days = parseInt($(this).val());
        if (days > 0 && Config.logStatDays !== days) {
            Config.logStatDays = days;
            (0, _Config.write)();
            $dialog.find('[name="statType"][value="custom"]:not(:checked)').click();
            showLogStat(log, dateList[curIndex], $dialog);
        }
    }).end().find('[name="sortType"][value="' + Config.logSortType + '"]').click().end().find('[name="statType"][value="' + Config.logStatType + '"]').click().end().find('[name="statDays"]').val(Config.logStatDays);

    $dialog.find('[name="clear"]').click(function (e) {
        e.preventDefault();
        if (confirm('是否清除所有日志？')) {
            Log.clear();
            alert('日志已清除');
            location.reload();
        }
    }).end().find('[data-name="openImOrExLogDialog"]').click(function (e) {
        e.preventDefault();
        showImportOrExportLogDialog();
    }).end().find('[data-name="openBuyThreadLogDialog"]').click(function (e) {
        e.preventDefault();
        Read.showBuyThreadLogDialog();
    });

    showLogContent(log, dateList[curIndex], $dialog);
    showLogStat(log, dateList[curIndex], $dialog);

    if ($(window).height() <= 750) $dialog.find('.pd_log_content').css('height', '192px');
    Dialog.show(dialogName);
    Script.runFunc('LogDialog.show_after_');
};

/**
 * 显示指定日期的日志内容
 * @param {{}} log 日志对象
 * @param {string} date 日志对象关键字
 * @param {jQuery} $dialog 日志对话框对象
 */
var showLogContent = function showLogContent(log, date, $dialog) {
    if (!Array.isArray(log[date])) return;
    $dialog.find('.pd_log_content').html(getLogContent(log, date, Config.logSortType)).parent().find('legend:first-child').text('\u65E5\u5FD7\u5185\u5BB9 (\u5171' + log[date].length + '\u9879)');
};

/**
 * 获取指定日期的日志内容
 * @param {{}} log 日志对象
 * @param {string} date 日志对象关键字
 * @param {string} logSortType 日志内容的排序方式
 * @returns {string} 指定日期的日志内容
 */
var getLogContent = function getLogContent(log, date, logSortType) {
    var logList = log[date];
    if (logSortType === 'type') {
        var sortTypeList = ['领取每日奖励', '提升战力光环', '争夺攻击', '捐款', '领取争夺奖励', '批量攻击', '试探攻击', '抽取神秘盒子', '抽取道具或卡片', '打开盒子', '购买物品', '使用道具', '恢复道具', '循环使用道具', '将道具转换为能量', '将卡片转换为VIP时间', '购买道具', '统计道具购买价格', '出售道具', '熔炼装备', '神秘抽奖', '统计神秘抽奖结果', '神秘等级升级', '神秘系数排名变化', '批量转账', '购买帖子', '自动存款'];
        logList.sort(function (a, b) {
            return sortTypeList.indexOf(a.type) > sortTypeList.indexOf(b.type) ? 1 : -1;
        });
    } else {
        logList.sort(function (a, b) {
            return a.time > b.time ? 1 : -1;
        });
    }

    var content = '',
        curType = '';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = logList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _step.value,
                time = _step$value.time,
                type = _step$value.type,
                action = _step$value.action,
                gain = _step$value.gain,
                pay = _step$value.pay;

            if (typeof time === 'undefined' || typeof type === 'undefined' || typeof action === 'undefined') continue;
            var d = new Date(time);
            if (logSortType === 'type') {
                if (curType !== type) {
                    content += '<h3>\u3010' + type + '\u3011</h3>';
                    curType = type;
                }
                content += '<p><b>' + Util.getTimeString(d) + '\uFF1A</b>' + action.replace(/`([^`]+?)`/g, '<b style="color: #f00;">$1</b>');
            } else {
                content += '<p><b>' + Util.getTimeString(d) + ' (' + type + ')\uFF1A</b>' + action.replace(/`([^`]+?)`/g, '<b style="color: #f00;">$1</b>');
            }

            var stat = '';
            if ($.type(gain) === 'object' && !$.isEmptyObject(gain)) {
                stat += '，';
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = Object.keys(gain)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var k = _step2.value;

                        if (k === 'item') {
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = Util.getSortedObjectKeyList(Item.itemTypeList, gain[k])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var name = _step3.value;

                                    stat += '<i>' + name + '<em>+' + gain[k][name].toLocaleString() + '</em></i> ';
                                }
                            } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                        _iterator3.return();
                                    }
                                } finally {
                                    if (_didIteratorError3) {
                                        throw _iteratorError3;
                                    }
                                }
                            }
                        } else if (k === 'arm') {
                            var _iteratorNormalCompletion4 = true;
                            var _didIteratorError4 = false;
                            var _iteratorError4 = undefined;

                            try {
                                for (var _iterator4 = Util.getSortedObjectKeyList(Item.armTypeList, gain[k])[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                    var _name = _step4.value;

                                    stat += '<i>' + _name + '<em>+' + gain[k][_name].toLocaleString() + '</em></i> ';
                                }
                            } catch (err) {
                                _didIteratorError4 = true;
                                _iteratorError4 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                        _iterator4.return();
                                    }
                                } finally {
                                    if (_didIteratorError4) {
                                        throw _iteratorError4;
                                    }
                                }
                            }
                        } else if (k === 'box') {
                            var _iteratorNormalCompletion5 = true;
                            var _didIteratorError5 = false;
                            var _iteratorError5 = undefined;

                            try {
                                for (var _iterator5 = Util.getSortedObjectKeyList(Item.boxTypeList, gain[k])[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                    var _name2 = _step5.value;

                                    stat += '<i>' + _name2 + '<em>+' + gain[k][_name2].toLocaleString() + '</em></i> ';
                                }
                            } catch (err) {
                                _didIteratorError5 = true;
                                _iteratorError5 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                        _iterator5.return();
                                    }
                                } finally {
                                    if (_didIteratorError5) {
                                        throw _iteratorError5;
                                    }
                                }
                            }
                        } else {
                            stat += '<i>' + k + '<em>+' + gain[k].toLocaleString() + '</em></i> ';
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
            if ($.type(pay) === 'object' && !$.isEmptyObject(pay)) {
                if (!stat) stat += '，';
                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = Object.keys(pay)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var _k = _step6.value;

                        if (_k === 'item') {
                            var _iteratorNormalCompletion7 = true;
                            var _didIteratorError7 = false;
                            var _iteratorError7 = undefined;

                            try {
                                for (var _iterator7 = Object.keys(pay[_k])[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                    var itemName = _step7.value;

                                    stat += '<i>' + itemName + '<ins>' + pay[_k][itemName].toLocaleString() + '</ins></i> ';
                                }
                            } catch (err) {
                                _didIteratorError7 = true;
                                _iteratorError7 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                        _iterator7.return();
                                    }
                                } finally {
                                    if (_didIteratorError7) {
                                        throw _iteratorError7;
                                    }
                                }
                            }
                        } else {
                            stat += '<i>' + _k + '<ins>' + pay[_k].toLocaleString() + '</ins></i> ';
                        }
                    }
                } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                        }
                    } finally {
                        if (_didIteratorError6) {
                            throw _iteratorError6;
                        }
                    }
                }
            }

            content += stat + '</p>';
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return content;
};

/**
 * 显示指定日期的日志统计结果
 * @param {{}} log 日志对象
 * @param {string} date 日志对象关键字
 * @param {jQuery} $dialog 日志对话框对象
 */
var showLogStat = function showLogStat(log, date, $dialog) {
    if (!Array.isArray(log[date])) return;
    $dialog.find('[data-name="stat"]').html(getLogStat(log, date, Config.logStatType));
};

/**
 * 获取指定日期的日志统计结果
 * @param {{}} log 日志对象
 * @param {string} date 日志对象关键字
 * @param {string} logStatType 日志统计范围类型
 * @returns {string} 指定日期的日志统计结果
 */
var getLogStat = function getLogStat(log, date, logStatType) {
    var rangeLog = {};

    if (logStatType === 'custom') {
        var minDate = new Date(date);
        minDate.setDate(minDate.getDate() - Config.logStatDays + 1);
        minDate = Util.getDateString(minDate);
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
            for (var _iterator8 = Util.getObjectKeyList(log, 1)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                var d = _step8.value;

                if (d >= minDate && d <= date) rangeLog[d] = log[d];
            }
        } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                    _iterator8.return();
                }
            } finally {
                if (_didIteratorError8) {
                    throw _iteratorError8;
                }
            }
        }
    } else if (logStatType === 'all') {
        rangeLog = log;
    } else {
        rangeLog[date] = log[date];
    }

    var income = {},
        expense = {},
        profit = {};
    var lootCount = 0,
        lootLevelStat = { total: 0, min: 0, max: 0 },
        lootBoxTotalNum = 0,
        lootBoxStat = {};
    var boxTotalNum = 0,
        boxStat = {},
        boxGain = { 'KFB': 0, '经验值': 0, '道具': 0, '装备': 0, item: {}, arm: {} },
        boxRandomTotalNum = 0,
        boxRandomTotalCount = 0;
    var validItemNum = 0,
        validItemStat = {},
        invalidItemNum = 0,
        invalidItemStat = {};
    var invalidKeyList = ['item', 'arm', 'box', '夺取KFB', 'VIP小时', '神秘', '燃烧伤害', '命中', '闪避', '暴击比例', '暴击几率', '防御', '有效道具', '无效道具', '长剑经验', '短弓经验', '法杖经验'];
    for (var _d in rangeLog) {
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
            for (var _iterator9 = rangeLog[_d][Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                var _step9$value = _step9.value,
                    type = _step9$value.type,
                    action = _step9$value.action,
                    gain = _step9$value.gain,
                    pay = _step9$value.pay,
                    notStat = _step9$value.notStat;

                if (typeof type === 'undefined' || typeof notStat !== 'undefined') continue;
                if ($.type(gain) === 'object') {
                    var _iteratorNormalCompletion10 = true;
                    var _didIteratorError10 = false;
                    var _iteratorError10 = undefined;

                    try {
                        for (var _iterator10 = Object.keys(gain)[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                            var k = _step10.value;

                            if (invalidKeyList.includes(k)) continue;
                            if (typeof income[k] === 'undefined') income[k] = gain[k];else income[k] += gain[k];
                        }
                    } catch (err) {
                        _didIteratorError10 = true;
                        _iteratorError10 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion10 && _iterator10.return) {
                                _iterator10.return();
                            }
                        } finally {
                            if (_didIteratorError10) {
                                throw _iteratorError10;
                            }
                        }
                    }
                }
                if ($.type(pay) === 'object') {
                    var _iteratorNormalCompletion11 = true;
                    var _didIteratorError11 = false;
                    var _iteratorError11 = undefined;

                    try {
                        for (var _iterator11 = Object.keys(pay)[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                            var _k2 = _step11.value;

                            if (invalidKeyList.includes(_k2)) continue;
                            if (typeof expense[_k2] === 'undefined') expense[_k2] = pay[_k2];else expense[_k2] += pay[_k2];
                        }
                    } catch (err) {
                        _didIteratorError11 = true;
                        _iteratorError11 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion11 && _iterator11.return) {
                                _iterator11.return();
                            }
                        } finally {
                            if (_didIteratorError11) {
                                throw _iteratorError11;
                            }
                        }
                    }
                }

                if (type === '争夺攻击' && $.type(gain) === 'object') {
                    var matches = /第`(\d+)`层/.exec(action);
                    if (matches) {
                        lootCount++;
                        var level = parseInt(matches[1]);
                        lootLevelStat.total += level;
                        if (lootLevelStat.max < level) lootLevelStat.max = level;
                        if (!lootLevelStat.min || lootLevelStat.min > level) lootLevelStat.min = level;
                        if ($.type(gain['box']) === 'object') {
                            var _iteratorNormalCompletion12 = true;
                            var _didIteratorError12 = false;
                            var _iteratorError12 = undefined;

                            try {
                                for (var _iterator12 = Util.entries(gain['box'])[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                                    var _step12$value = _slicedToArray(_step12.value, 2),
                                        key = _step12$value[0],
                                        num = _step12$value[1];

                                    lootBoxTotalNum += num;
                                    if (!(key in lootBoxStat)) lootBoxStat[key] = { total: 0, min: -1, max: -1 };
                                    lootBoxStat[key].total += num;
                                    if (lootBoxStat[key].max < num) lootBoxStat[key].max = num;
                                    if (lootBoxStat[key].min < 0 || lootBoxStat[key].min > num) lootBoxStat[key].min = num;
                                }
                            } catch (err) {
                                _didIteratorError12 = true;
                                _iteratorError12 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion12 && _iterator12.return) {
                                        _iterator12.return();
                                    }
                                } finally {
                                    if (_didIteratorError12) {
                                        throw _iteratorError12;
                                    }
                                }
                            }

                            var _iteratorNormalCompletion13 = true;
                            var _didIteratorError13 = false;
                            var _iteratorError13 = undefined;

                            try {
                                for (var _iterator13 = Item.boxTypeList[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                                    var key = _step13.value;

                                    if (!(key in gain['box']) && key in lootBoxStat) lootBoxStat[key].min = 0;
                                }
                            } catch (err) {
                                _didIteratorError13 = true;
                                _iteratorError13 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion13 && _iterator13.return) {
                                        _iterator13.return();
                                    }
                                } finally {
                                    if (_didIteratorError13) {
                                        throw _iteratorError13;
                                    }
                                }
                            }
                        }
                    }
                } else if (type === '打开盒子' && $.type(gain) === 'object' && $.type(pay) === 'object') {
                    var _matches = /【`(.+?)`】打开成功/.exec(action);
                    if (!_matches) continue;
                    var boxType = _matches[1];
                    var boxNum = Math.abs(pay['盒子']);
                    boxTotalNum += boxNum;
                    if (!(boxType in boxStat)) boxStat[boxType] = 0;
                    boxStat[boxType] += Math.abs(pay['盒子']);

                    var randomMatches = /平均随机值【`([\d\.]+)`】/.exec(action);
                    if (randomMatches) {
                        boxRandomTotalCount += boxNum;
                        boxRandomTotalNum += parseFloat(randomMatches[1]) * boxNum;
                    }

                    var _iteratorNormalCompletion14 = true;
                    var _didIteratorError14 = false;
                    var _iteratorError14 = undefined;

                    try {
                        for (var _iterator14 = Util.entries(gain)[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                            var _step14$value = _slicedToArray(_step14.value, 2),
                                _key = _step14$value[0],
                                value = _step14$value[1];

                            if (!(_key in boxGain)) continue;
                            if ($.type(value) === 'object') {
                                var _iteratorNormalCompletion15 = true;
                                var _didIteratorError15 = false;
                                var _iteratorError15 = undefined;

                                try {
                                    for (var _iterator15 = Util.entries(value)[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                                        var _step15$value = _slicedToArray(_step15.value, 2),
                                            name = _step15$value[0],
                                            num = _step15$value[1];

                                        if (!(name in boxGain[_key])) boxGain[_key][name] = 0;
                                        boxGain[_key][name] += num;
                                    }
                                } catch (err) {
                                    _didIteratorError15 = true;
                                    _iteratorError15 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion15 && _iterator15.return) {
                                            _iterator15.return();
                                        }
                                    } finally {
                                        if (_didIteratorError15) {
                                            throw _iteratorError15;
                                        }
                                    }
                                }
                            } else {
                                boxGain[_key] += value;
                            }
                        }
                    } catch (err) {
                        _didIteratorError14 = true;
                        _iteratorError14 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion14 && _iterator14.return) {
                                _iterator14.return();
                            }
                        } finally {
                            if (_didIteratorError14) {
                                throw _iteratorError14;
                            }
                        }
                    }
                } else if ((type === '使用道具' || type === '循环使用道具') && $.type(gain) === 'object') {
                    var _matches2 = /【`Lv.(\d+)：(.+?)`】/.exec(action);
                    if (_matches2) {
                        var itemLevel = parseInt(_matches2[1]);
                        if (itemLevel < 3) continue;
                        var itemName = _matches2[2];
                        if (gain['有效道具'] > 0) {
                            validItemNum += gain['有效道具'];
                            if (typeof validItemStat[itemName] === 'undefined') validItemStat[itemName] = 0;
                            validItemStat[itemName] += gain['有效道具'];
                        }
                        if (gain['无效道具'] > 0) {
                            invalidItemNum += gain['无效道具'];
                            if (typeof invalidItemStat[itemName] === 'undefined') invalidItemStat[itemName] = 0;
                            invalidItemStat[itemName] += gain['无效道具'];
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError9 = true;
            _iteratorError9 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                    _iterator9.return();
                }
            } finally {
                if (_didIteratorError9) {
                    throw _iteratorError9;
                }
            }
        }
    }

    var content = '';
    var sortStatTypeList = ['KFB', '经验值', '贡献', '转账额度', '盒子', '道具', '已使用道具', '装备', '武器经验', '护甲经验', '项链经验', '能量', '卡片'];
    content += '<strong>收获：</strong>';
    var _iteratorNormalCompletion16 = true;
    var _didIteratorError16 = false;
    var _iteratorError16 = undefined;

    try {
        for (var _iterator16 = Util.getSortedObjectKeyList(sortStatTypeList, income)[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
            var _key4 = _step16.value;

            profit[_key4] = income[_key4];
            content += '<i>' + _key4 + '<em>+' + income[_key4].toLocaleString() + '</em></i> ';
        }
    } catch (err) {
        _didIteratorError16 = true;
        _iteratorError16 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion16 && _iterator16.return) {
                _iterator16.return();
            }
        } finally {
            if (_didIteratorError16) {
                throw _iteratorError16;
            }
        }
    }

    content += '<br><strong>付出：</strong>';
    var _iteratorNormalCompletion17 = true;
    var _didIteratorError17 = false;
    var _iteratorError17 = undefined;

    try {
        for (var _iterator17 = Util.getSortedObjectKeyList(sortStatTypeList, expense)[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
            var _key5 = _step17.value;

            if (typeof profit[_key5] === 'undefined') profit[_key5] = expense[_key5];else profit[_key5] += expense[_key5];
            content += '<i>' + _key5 + '<ins>' + expense[_key5].toLocaleString() + '</ins></i> ';
        }
    } catch (err) {
        _didIteratorError17 = true;
        _iteratorError17 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion17 && _iterator17.return) {
                _iterator17.return();
            }
        } finally {
            if (_didIteratorError17) {
                throw _iteratorError17;
            }
        }
    }

    content += '<br><strong>结余：</strong>';
    var _iteratorNormalCompletion18 = true;
    var _didIteratorError18 = false;
    var _iteratorError18 = undefined;

    try {
        for (var _iterator18 = Util.getSortedObjectKeyList(sortStatTypeList, profit)[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
            var _key6 = _step18.value;

            content += '<i>' + _key6 + Util.getStatFormatNumber(profit[_key6]) + '</i> ';
        }
    } catch (err) {
        _didIteratorError18 = true;
        _iteratorError18 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion18 && _iterator18.return) {
                _iterator18.return();
            }
        } finally {
            if (_didIteratorError18) {
                throw _iteratorError18;
            }
        }
    }

    content += '<div style="margin: 5px 0; border-bottom: 1px dashed #ccccff;"></div>';
    content += '\n<strong>\u4E89\u593A\u653B\u51FB\u7EDF\u8BA1\uFF1A</strong><i>\u6B21\u6570<em>+' + lootCount + '</em></i> ';
    if (lootCount > 0) {
        content += '<i>\u5C42\u6570<span class="pd_stat_extra">(<em title="\u5E73\u5747\u503C">+' + (lootLevelStat.total / lootCount).toFixed(2) + '</em>|' + ('<em title="\u6700\u5C0F\u503C">+' + lootLevelStat.min + '</em>|<em title="\u6700\u5927\u503C">+' + lootLevelStat.max + '</em>)</span></i> ');
        content += '<i>\u76D2\u5B50<em>+' + lootBoxTotalNum.toLocaleString() + '</em></i> ';
        var _iteratorNormalCompletion19 = true;
        var _didIteratorError19 = false;
        var _iteratorError19 = undefined;

        try {
            for (var _iterator19 = Util.getSortedObjectKeyList(Item.boxTypeList, lootBoxStat)[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                var _key2 = _step19.value;

                if (!lootBoxStat[_key2].total) continue;
                content += '<i>' + _key2 + '<em>+' + lootBoxStat[_key2].total.toLocaleString() + '</em>' + ('<span class="pd_stat_extra">(<em title="\u5E73\u5747\u503C">+' + (lootBoxStat[_key2].total / lootCount).toFixed(2) + '</em>|') + ('<em title="\u6700\u5C0F\u503C">+' + lootBoxStat[_key2].min + '</em>|<em title="\u6700\u5927\u503C">+' + lootBoxStat[_key2].max + '</em>)</span></i> ');
            }
        } catch (err) {
            _didIteratorError19 = true;
            _iteratorError19 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion19 && _iterator19.return) {
                    _iterator19.return();
                }
            } finally {
                if (_didIteratorError19) {
                    throw _iteratorError19;
                }
            }
        }
    }

    var boxStatContent = '';
    var _iteratorNormalCompletion20 = true;
    var _didIteratorError20 = false;
    var _iteratorError20 = undefined;

    try {
        for (var _iterator20 = Util.getSortedObjectKeyList(Item.boxTypeList, boxStat)[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
            var _boxType = _step20.value;

            if (boxStatContent) boxStatContent += '|';
            boxStatContent += '<ins title="' + _boxType + '">-' + boxStat[_boxType].toLocaleString() + '</ins>';
        }
    } catch (err) {
        _didIteratorError20 = true;
        _iteratorError20 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion20 && _iterator20.return) {
                _iterator20.return();
            }
        } finally {
            if (_didIteratorError20) {
                throw _iteratorError20;
            }
        }
    }

    content += '<br><strong>\u76D2\u5B50\u6536\u83B7\u7EDF\u8BA1\uFF1A</strong><i>\u76D2\u5B50<ins>-' + boxTotalNum + '</ins>' + ((boxStatContent ? '<span class="pd_stat_extra">(' + boxStatContent + ')</span>' : '') + '</i> ');
    if (boxRandomTotalCount > 0) {
        content += '<i>\u5E73\u5747\u968F\u673A\u503C<em>+' + Util.getFixedNumLocStr(boxRandomTotalNum / boxRandomTotalCount, 2) + '</em></i> ';
    }
    if (boxTotalNum > 0) {
        var _iteratorNormalCompletion21 = true;
        var _didIteratorError21 = false;
        var _iteratorError21 = undefined;

        try {
            for (var _iterator21 = Util.entries(boxGain)[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
                var _step21$value = _slicedToArray(_step21.value, 2),
                    _key3 = _step21$value[0],
                    value = _step21$value[1];

                if (!value || $.type(value) === 'object' && $.isEmptyObject(value)) continue;
                if ($.type(value) === 'object') {
                    var typeList = _key3 === 'item' ? Item.itemTypeList : Item.armTypeList;
                    var _iteratorNormalCompletion22 = true;
                    var _didIteratorError22 = false;
                    var _iteratorError22 = undefined;

                    try {
                        for (var _iterator22 = Util.getSortedObjectKeyList(typeList, value)[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
                            var name = _step22.value;

                            content += '<i>' + name + '<em>+' + value[name].toLocaleString() + '</em></i> ';
                        }
                    } catch (err) {
                        _didIteratorError22 = true;
                        _iteratorError22 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion22 && _iterator22.return) {
                                _iterator22.return();
                            }
                        } finally {
                            if (_didIteratorError22) {
                                throw _iteratorError22;
                            }
                        }
                    }
                } else {
                    content += '<i>' + _key3 + '<span class="pd_stat_extra"><em>+' + value.toLocaleString() + '</em>' + ('(<em title="\u5E73\u5747\u503C">+' + Util.getFixedNumLocStr(value / boxTotalNum, 2).toLocaleString() + '</em>)</span></i> ');
                }
            }
        } catch (err) {
            _didIteratorError21 = true;
            _iteratorError21 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion21 && _iterator21.return) {
                    _iterator21.return();
                }
            } finally {
                if (_didIteratorError21) {
                    throw _iteratorError21;
                }
            }
        }
    }

    content += '<br><strong>\u6709\u6548\u9053\u5177\u7EDF\u8BA1\uFF1A</strong><i>\u6709\u6548\u9053\u5177<em>+' + validItemNum.toLocaleString() + '</em></i> ';
    var _iteratorNormalCompletion23 = true;
    var _didIteratorError23 = false;
    var _iteratorError23 = undefined;

    try {
        for (var _iterator23 = Util.getSortedObjectKeyList(Item.itemTypeList, validItemStat)[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
            var _itemName = _step23.value;

            content += '<i>' + _itemName + '<em>+' + validItemStat[_itemName].toLocaleString() + '</em></i> ';
        }
    } catch (err) {
        _didIteratorError23 = true;
        _iteratorError23 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion23 && _iterator23.return) {
                _iterator23.return();
            }
        } finally {
            if (_didIteratorError23) {
                throw _iteratorError23;
            }
        }
    }

    content += '<br><strong>\u65E0\u6548\u9053\u5177\u7EDF\u8BA1\uFF1A</strong><i>\u65E0\u6548\u9053\u5177<em>+' + invalidItemNum.toLocaleString() + '</em></i> ';
    var _iteratorNormalCompletion24 = true;
    var _didIteratorError24 = false;
    var _iteratorError24 = undefined;

    try {
        for (var _iterator24 = Util.getSortedObjectKeyList(Item.itemTypeList, invalidItemStat)[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
            var _itemName2 = _step24.value;

            content += '<i>' + _itemName2 + '<em>+' + invalidItemStat[_itemName2].toLocaleString() + '</em></i> ';
        }
    } catch (err) {
        _didIteratorError24 = true;
        _iteratorError24 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion24 && _iterator24.return) {
                _iterator24.return();
            }
        } finally {
            if (_didIteratorError24) {
                throw _iteratorError24;
            }
        }
    }

    return content;
};

/**
 * 显示导入或导出日志对话框
 */
var showImportOrExportLogDialog = function showImportOrExportLogDialog() {
    var dialogName = 'pdImOrExLogDialog';
    if ($('#' + dialogName).length > 0) return;
    var log = Log.read();
    var html = '\n<div class="pd_cfg_main">\n  <div style="margin-top: 5px;">\n    <label style="color: #f00;"><input type="radio" name="logType" value="setting" checked> \u5BFC\u5165/\u5BFC\u51FA\u65E5\u5FD7</label>\n    <label style="color: #00f;"><input type="radio" name="logType" value="text"> \u5BFC\u51FA\u65E5\u5FD7\u6587\u672C</label>\n  </div>\n  <div data-name="logSetting">\n    <strong>\u5BFC\u5165\u65E5\u5FD7\uFF1A</strong>\u5C06\u65E5\u5FD7\u5185\u5BB9\u7C98\u8D34\u5230\u6587\u672C\u6846\u4E2D\u5E76\u70B9\u51FB\u5408\u5E76\u6216\u8986\u76D6\u6309\u94AE\u5373\u53EF<br>\n    <strong>\u5BFC\u51FA\u65E5\u5FD7\uFF1A</strong>\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u522B\u5904\u5373\u53EF<br>\n    <textarea name="setting" style="width: 600px; height: 400px; word-break: break-all;"></textarea>\n  </div>\n  <div data-name="logText" style="display: none;">\n    <strong>\u5BFC\u51FA\u65E5\u5FD7\u6587\u672C</strong>\uFF1A\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u522B\u5904\u5373\u53EF\n    <div>\n      <label title="\u6309\u65F6\u95F4\u987A\u5E8F\u6392\u5E8F"><input type="radio" name="sortType2" value="time" checked> \u6309\u65F6\u95F4</label>\n      <label title="\u6309\u65E5\u5FD7\u7C7B\u522B\u6392\u5E8F"><input type="radio" name="sortType2" value="type"> \u6309\u7C7B\u522B</label>\n      <label title="\u5728\u65E5\u5FD7\u6587\u672C\u91CC\u663E\u793A\u6BCF\u65E5\u4EE5\u53CA\u5168\u90E8\u6570\u636E\u7684\u7EDF\u8BA1\u7ED3\u679C"><input type="checkbox" name="showStat" checked> \u663E\u793A\u7EDF\u8BA1</label>\n    </div>\n    <textarea name="text" style="width: 600px; height: 400px;" readonly></textarea>\n  </div>\n</div>\n<div class="pd_cfg_btns">\n  <button name="merge" type="button">\u5408\u5E76\u65E5\u5FD7</button>\n  <button name="overwrite" type="button" style="color: #f00;">\u8986\u76D6\u65E5\u5FD7</button>\n  <button data-action="close" type="button">\u5173\u95ED</button>\n</div>';

    var $dialog = Dialog.create(dialogName, '导入或导出日志', html);
    $dialog.find('[name="sortType2"], [name="showStat"]').click(function () {
        showLogText(log, $dialog);
        $dialog.find('[name="text"]').select();
    }).end().find('[name="logType"]').click(function () {
        var type = $(this).val();
        $dialog.find('[data-name="log' + (type === 'text' ? 'Setting' : 'Text') + '"]').hide();
        $dialog.find('[data-name="log' + (type === 'text' ? 'Text' : 'Setting') + '"]').show();
        $dialog.find('[data-name="log' + (type === 'text' ? 'Text' : 'Setting') + '"]').select();
    }).end().find('[name="merge"], [name="overwrite"]').click(function (e) {
        e.preventDefault();
        var name = $(this).attr('name');
        if (!confirm('\u662F\u5426\u5C06\u6587\u672C\u6846\u4E2D\u7684\u65E5\u5FD7' + (name === 'overwrite' ? '覆盖' : '合并') + '\u5230\u672C\u5730\u65E5\u5FD7\uFF1F')) return;
        var newLog = $.trim($dialog.find('[name="setting"]').val());
        if (!newLog) return;
        try {
            newLog = JSON.parse(newLog);
        } catch (ex) {
            alert('日志有错误');
            return;
        }
        if (!newLog || $.type(newLog) !== 'object') {
            alert('日志有错误');
            return;
        }
        if (name === 'merge') log = Log.getMergeLog(log, newLog);else log = newLog;
        Log.write(log);
        alert('日志已导入');
        location.reload();
    });

    Dialog.show(dialogName);
    $dialog.find('[name="sortType2"][value="' + Config.logSortType + '"]').prop('checked', true).triggerHandler('click');
    $dialog.find('[name="setting"]').val(JSON.stringify(log)).select().focus();
    Script.runFunc('LogDialog.showImportOrExportLogDialog_after_');
};

/**
 * 显示日志文本
 * @param {{}} log 日志对象
 * @param {jQuery} $dialog 导入或导出日志对话框对象
 */
var showLogText = function showLogText(log, $dialog) {
    var logSortType = $dialog.find('input[name="sortType2"]:checked').val();
    var isShowStat = $dialog.find('[name="showStat"]').prop('checked');
    var content = '',
        lastDate = '';
    var _iteratorNormalCompletion25 = true;
    var _didIteratorError25 = false;
    var _iteratorError25 = undefined;

    try {
        for (var _iterator25 = Object.keys(log)[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
            var date = _step25.value;

            if (!Array.isArray(log[date])) continue;
            if (lastDate > date) lastDate = date;
            content += '\u3010' + date + '\u3011(\u5171' + log[date].length + '\u9879)\n' + (logSortType === 'type' ? '' : '\n') + getLogContent(log, date, logSortType).replace(/<h3>/g, '\n').replace(/<\/h3>/g, '\n').replace(/<\/p>/g, '\n').replace(/(<.+?>|<\/.+?>)/g, '').replace(/`/g, '');
            if (isShowStat) {
                content += '-'.repeat(46) + '\n\u5408\u8BA1\uFF1A\n' + getLogStat(log, date, 'current').replace(/<br\s*\/?>/g, '\n').replace(/(<.+?>|<\/.+?>)/g, '') + '\n';
            }
            content += '='.repeat(46) + '\n';
        }
    } catch (err) {
        _didIteratorError25 = true;
        _iteratorError25 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion25 && _iterator25.return) {
                _iterator25.return();
            }
        } finally {
            if (_didIteratorError25) {
                throw _iteratorError25;
            }
        }
    }

    if (content && isShowStat) {
        content += '\n总计：\n' + getLogStat(log, lastDate, 'all').replace(/<br\s*\/?>/g, '\n').replace(/(<.+?>|<\/.+?>)/g, '');
    }
    $dialog.find('[name="text"]').val(content);
};

},{"./Config":3,"./Dialog":6,"./Item":9,"./Log":10,"./Read":17,"./Script":18,"./Util":21}],12:[function(require,module,exports){
/* 争夺模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPromoteHaloCostByTypeId = exports.promoteHalo = exports.getPromoteHaloInfo = exports.setHaloInfo = exports.getHaloInfo = exports.addUserLinkInHaloPage = exports.addUserLinkInPkListPage = exports.getLevelInfoList = exports.getLevelInfo = exports.getLogList = exports.getLootInfo = exports.updateLootInfo = exports.changePointsAndArms = exports.getPointByProperty = exports.getPropertyByPoint = exports.getExtraPoint = exports.getFieldNameByPointName = exports.getPointNameByFieldName = exports.getSkillAttack = exports.getCurrentAssignedPoint = exports.enhanceLootIndexPage = exports.init = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Msg = require('./Msg');

var Msg = _interopRequireWildcard(_Msg);

var _Dialog = require('./Dialog');

var Dialog = _interopRequireWildcard(_Dialog);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Config = require('./Config');

var _Log = require('./Log');

var Log = _interopRequireWildcard(_Log);

var _TmpLog = require('./TmpLog');

var TmpLog = _interopRequireWildcard(_TmpLog);

var _Script = require('./Script');

var Script = _interopRequireWildcard(_Script);

var _Public = require('./Public');

var Public = _interopRequireWildcard(_Public);

var _Item = require('./Item');

var Item = _interopRequireWildcard(_Item);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// SafeID
var safeId = void 0;
// 争夺属性区域
var $properties = void 0;
// 点数区域
var $points = void 0;
// 装备区域
var $armArea = void 0;
// 争夺记录区域容器
var $logBox = void 0;
// 争夺记录区域
var $log = void 0;
// 争夺记录
var log = '';
// 各层争夺记录列表
var logList = [];
// 各层战斗信息列表
var levelInfoList = [];
// 当前争夺属性
var propertyList = {};
// 额外点数列表
var extraPointsList = {};
// 光环信息
var haloInfo = {};
// 当前装备情况
var currentArmInfo = new Map();
// 装备等级情况列表
var armsLevelList = new Map();
// 道具使用情况列表
var itemUsedNumList = new Map();
// 修改点数可用次数
var changePointsAvailableCount = 0;
// 服务器状态
var serverStatus = '';

/**
 * 初始化
 */
var init = exports.init = function init() {
    safeId = Public.getSafeId();
    if (!safeId) return;

    $properties = $('.kf_fw_ig3:first');
    $points = $('#wdsx .kf_fw_ig1:first');
    $points.find('> tbody > tr:first-child > td').attr('id', 'pdArmArea');
    $armArea = $points.find('#pdArmArea');

    var tmpHaloInfo = TmpLog.getValue(_Const2.default.haloInfoTmpLogName);
    if (tmpHaloInfo && $.type(tmpHaloInfo) === 'object') {
        var diff = $.now() - tmpHaloInfo.time;
        if (diff >= 0 && diff < _Const2.default.tmpHaloInfoExpires * 60 * 1000) {
            delete tmpHaloInfo.time;
            setHaloInfo(tmpHaloInfo);
            enhanceLootIndexPage();
        } else readHaloInfo(true);
    } else readHaloInfo(true);
};

/**
 * 增强争夺首页
 */
var enhanceLootIndexPage = exports.enhanceLootIndexPage = function enhanceLootIndexPage() {
    Script.runFunc('Loot.enhanceLootIndexPage_before_');
    var propertiesHtml = $properties.html();
    propertyList = getLootPropertyList(propertiesHtml);
    itemUsedNumList = Item.getItemsUsedNumInfo(propertiesHtml);
    armsLevelList = Item.getArmsLevelInfo(propertiesHtml);

    var armHtml = $armArea.html();
    if (armHtml.includes('（装备中）')) {
        var _armHtml$split = armHtml.split('<br><br>'),
            _armHtml$split2 = _slicedToArray(_armHtml$split, 1),
            armInfoHtml = _armHtml$split2[0];

        var _armInfoHtml$split = armInfoHtml.split('（装备中）'),
            _armInfoHtml$split2 = _slicedToArray(_armInfoHtml$split, 3),
            _armInfoHtml$split2$ = _armInfoHtml$split2[1],
            weaponInfoHtml = _armInfoHtml$split2$ === undefined ? '' : _armInfoHtml$split2$,
            _armInfoHtml$split2$2 = _armInfoHtml$split2[2],
            armorInfoHtml = _armInfoHtml$split2$2 === undefined ? '' : _armInfoHtml$split2$2;

        currentArmInfo.set('武器', Item.getArmInfo(weaponInfoHtml));
        currentArmInfo.set('护甲', Item.getArmInfo(armorInfoHtml));
    } else {
        console.log('需要至少使用一件装备才能在此页面正常使用KFOL助手的功能');
        return;
    }

    $logBox = $('#pk_text_div');
    $log = $('#pk_text');
    log = $log.html();
    logList = getLogList(log);
    levelInfoList = getLevelInfoList(logList);

    handlePropertiesArea();
    handlePointsArea();
    addLevelPointListSelect();
    if (Config.alwaysOpenPointAreaEnabled) {
        $('#wdsx').show();
    }

    Script.runFunc('Loot.enhanceLootIndexPage_after_');
};

/**
 * 处理争夺属性区域
 */
var handlePropertiesArea = function handlePropertiesArea() {
    $properties.attr('id', 'pdPropertiesArea').find('input[value$="可分配属性"]').after('<span id="pdSurplusPoint" class="pd_property_diff" hidden>(<em></em>)</span>');

    var $serverStatus = $properties.find('> tbody > tr:first-child td:contains("错高峰福利") > span:last').attr('id', 'pdServerStatus');
    if ($serverStatus.length > 0) {
        serverStatus = $serverStatus.text().trim();
        $serverStatus.attr('id', 'pdServerStatus').data('prev-status', serverStatus);
    }

    $properties.on('change', '.pd_arm_level', function () {
        var type = $(this).data('type');
        var diffName = 'Weapon';
        if (type === '护甲') diffName = 'Armor';else if (type === '项链') diffName = 'Necklace';
        $('#pd' + diffName + 'ExpDiff em').text(armsLevelList.get(type)['经验'] - Math.pow(armsLevelList.get(type)['等级'] + 1, 2) * 2);
    });
    $properties.find('input[value^="武器等级"]').addClass('pd_arm_level').attr('data-type', '武器').after('<span id="pdWeaponExpDiff" class="pd_property_diff" title="\u4E0B\u4E00\u7EA7\u7ECF\u9A8C\u5DEE\u503C" style="color: #393;">(<em></em>)</span>').trigger('change');
    $properties.find('input[value^="护甲等级"]').addClass('pd_arm_level').attr('data-type', '护甲').after('<span id="pdArmorExpDiff" class="pd_property_diff" title="\u4E0B\u4E00\u7EA7\u7ECF\u9A8C\u5DEE\u503C" style="color: #393;">(<em></em>)</span>').trigger('change');
    $properties.find('input[value^="项链等级"]').addClass('pd_arm_level').attr('data-type', '项链').after('<span id="pdNecklaceExpDiff" class="pd_property_diff" title="\u4E0B\u4E00\u7EA7\u7ECF\u9A8C\u5DEE\u503C" style="color: #393;">(<em></em>)</span>').trigger('change');

    $('<a data-name="copyParameterSetting" href="#" style="margin-left: -20px;" title="复制计算器的部分参数设置（包括神秘系数、光环和道具数量）">复</a>').insertAfter($properties.find('input[value$="蕾米莉亚同人漫画"]')).click(function (e) {
        e.preventDefault();
        var $this = $(this);
        var coefficient = Math.floor((propertyList['可分配属性点'] - 50 - (itemUsedNumList.get('档案室钥匙') === 30 ? 30 : 0) - (itemUsedNumList.get('消逝之药') === 10 ? 120 : 0)) / 5);
        var copyText = coefficient + ' ' + Math.floor(haloInfo['全属性'] * 1000) + '\n';
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = itemUsedNumList.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var value = _step.value;

                copyText += value + ' ';
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        $this.data('copy-text', copyText.trim());
        console.log('KFOL计算器的部分参数设置：\n' + copyText.trim());
        if (!Util.copyText($this, 'KFOL计算器的部分参数设置已复制')) {
            alert('你的浏览器不支持复制，请打开Web控制台查看');
        }
    });
};

/**
 * 处理点数区域
 */
var handlePointsArea = function handlePointsArea() {
    $points.find('[type="text"]:not([readonly])').attr('type', 'number').attr('min', 1).attr('max', 9999).prop('required', true).css('width', '60px').addClass('pd_point').next('span').addClass('pd_extra_point').after('<span class="pd_sum_point" style="color: #f03; cursor: pointer;" title="点击：给该项加上或减去剩余属性点"></span>');
    $points.find('input[readonly]').attr('type', 'number').prop('disabled', true).css('width', '60px');

    var _$armArea$html$split = $armArea.html().split('<br><br>', 2),
        _$armArea$html$split2 = _slicedToArray(_$armArea$html$split, 2),
        armInfoHtml = _$armArea$html$split2[0],
        _$armArea$html$split3 = _$armArea$html$split2[1],
        finalAddAdditionHtml = _$armArea$html$split3 === undefined ? '' : _$armArea$html$split3;

    var _armInfoHtml$split3 = armInfoHtml.split('（装备中）'),
        _armInfoHtml$split4 = _slicedToArray(_armInfoHtml$split3, 3),
        _armInfoHtml$split4$ = _armInfoHtml$split4[1],
        weaponInfoHtml = _armInfoHtml$split4$ === undefined ? '' : _armInfoHtml$split4$,
        _armInfoHtml$split4$2 = _armInfoHtml$split4[2],
        armorInfoHtml = _armInfoHtml$split4$2 === undefined ? '' : _armInfoHtml$split4$2;

    var newArmHtml = '';
    if (weaponInfoHtml) newArmHtml += '（装备中）' + Item.handleUselessSubProperties(weaponInfoHtml);
    if (armorInfoHtml) newArmHtml += '（装备中）' + Item.handleUselessSubProperties(armorInfoHtml);
    if (finalAddAdditionHtml) newArmHtml += '<br><br>' + finalAddAdditionHtml;
    $armArea.html(newArmHtml);

    $('\n<tr>\n  <td>\n    \u88C5\u5907ID\u548C\u5907\u6CE8\n    <span class="pd_cfg_tips" title="\u53EF\u70B9\u51FB\u53F3\u8FB9\u7684\u201C\u66F4\u6362\u88C5\u5907\u201D\u6309\u94AE\uFF0C\u4E5F\u53EF\u624B\u52A8\u586B\u5199\u88C5\u5907ID\u3002\u7559\u7A7A\u8868\u793A\u4E0D\u66F4\u6362\u88C5\u5907\u3002\n\u5F53\u6587\u672C\u6846\u5185\u7684\u88C5\u5907ID\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u70B9\u51FB\u653B\u51FB\u6309\u94AE\u5C06\u4F1A\u81EA\u52A8\u66F4\u6362\u88C5\u5907\uFF08\u70B9\u51FB\u201C\u4FEE\u6539\u70B9\u6570\u5206\u914D\u201D\u6309\u94AE\u53EA\u4F1A\u4FEE\u6539\u70B9\u6570\u800C\u4E0D\u4F1A\u66F4\u6362\u88C5\u5907\uFF09\u3002">[?]</span>\n  </td>\n  <td>\n    <input class="pd_arm_input" name="weaponId" type="text" value="" maxlength="15" title="\u6B66\u5668ID" placeholder="\u6B66\u5668ID" style="width: 70px;">\n    <input class="pd_arm_input" name="weaponMemo" type="text" value="" maxlength="20" title="\u6B66\u5668\u5907\u6CE8" placeholder="\u6B66\u5668\u5907\u6CE8" style="width: 80px;">\n    <input class="pd_arm_input" name="armorId" type="text" value="" maxlength="15" title="\u62A4\u7532ID" placeholder="\u62A4\u7532ID" style="width: 70px;">\n    <input class="pd_arm_input" name="armorMemo" type="text" value="" maxlength="20" title="\u62A4\u7532\u5907\u6CE8" placeholder="\u62A4\u7532\u5907\u6CE8" style="width: 80px;">\n    <a class="pd_btn_link" data-name="changeArm" href="#" title="\u66F4\u6362\u5F53\u524D\u88C5\u5907">\u66F4\u6362\u88C5\u5907</a>\n  </td>\n</tr>\n').insertAfter($armArea.parent()).find('[data-name="changeArm"]').click(function (e) {
        e.preventDefault();
        addOrChangeArm(0);
    });

    $points.find('input[name="prosubmit"]').replaceWith('<button name="prosubmit" type="submit">修改点数分配</button>');
    $('<button name="changePointsAndArms" type="button" title="按照当前页面上的点数设置和装备ID进行修改" style="margin-left: 3px;">修改点数和装备</button>').insertAfter($points.find('button[name="prosubmit"]')).click(function () {
        var $wait = Msg.wait('<strong>正在修改点数和装备&hellip;</strong>');
        changePointsAndArms(-1, function (result) {
            if (result === 'success') {
                updateLootInfo(function () {
                    Msg.remove($wait);
                    Msg.show('<strong>已成功修改为指定的点数设置和装备ID</strong>', 3);
                });
            } else {
                Msg.remove($wait);
                if (result === 'ignore') {
                    alert('当前页面的点数设置和装备ID没有发生变化');
                } else if (result === 'timeout') {
                    alert('连接超时，请重试');
                }
            }
        });
    });

    var $changeCount = $points.find('> tbody > tr:last-child > td:last-child');
    $changeCount.wrapInner('<span id="pdChangeCount"></span>');
    var changeCountMatches = /当前修改配点可用\[(\d+)]次/.exec($changeCount.text());
    if (changeCountMatches) {
        changePointsAvailableCount = parseInt(changeCountMatches[1]);
    }
    var countDownMatches = /\(下次修改配点还需\[(\d+)]分钟\)/.exec($changeCount.text());
    if (countDownMatches) {
        var nextTime = Util.getDate('+' + countDownMatches[1] + 'm');
        Util.setCookie(_Const2.default.changePointsInfoCookieName, nextTime.getTime(), nextTime);
    } else {
        var count = parseInt(Util.getCookie(_Const2.default.changePointsInfoCookieName));
        if (count !== changePointsAvailableCount) {
            Util.setCookie(_Const2.default.changePointsInfoCookieName, changePointsAvailableCount + 'c', Util.getDate('+' + _Const2.default.changePointsInfoExpires + 'm'));
        }
    }

    extraPointsList = {
        '耐力': parseInt($points.find('[name="p"]').next('span').text()),
        '幸运': parseInt($points.find('[name="l"]').next('span').text())
    };

    /**
     * 显示剩余属性点
     */
    var showSurplusPoint = function showSurplusPoint() {
        var surplusPoint = propertyList['可分配属性点'] - getCurrentAssignedPoint($points.find('.pd_point'));
        $('#pdSurplusPoint').prop('hidden', surplusPoint === 0).css('color', surplusPoint !== 0 ? surplusPoint > 0 ? '#f03' : '#393' : '#000').find('em').text((surplusPoint > 0 ? '+' : '') + surplusPoint);
    };

    /**
     * 显示各项点数的额外加成
     * @param {jQuery} $point 点数字段对象
     */
    var showExtraPoint = function showExtraPoint($point) {
        var num = parseInt($point.val());
        if (!num || num < 0) num = 1;
        var extraNum = getExtraPoint(getPointNameByFieldName($point.attr('name')), num);
        $point.next('.pd_extra_point').text('+' + extraNum);
    };

    /**
     * 显示各项点数的和值
     * @param {jQuery} $point 点数字段对象
     */
    var showSumOfPoint = function showSumOfPoint($point) {
        var num = parseInt($point.val());
        if (!num || num < 0) num = 1;
        var extraNum = parseInt($point.next('.pd_extra_point').text());
        $point.next('.pd_extra_point').next('.pd_sum_point').text('=' + (num + extraNum));
    };

    $points.on('change', '.pd_point', function () {
        var $this = $(this);
        showSurplusPoint();
        showExtraPoint($this);
        showSumOfPoint($this);
    }).on('click', '.pd_sum_point', function () {
        var surplusPoint = propertyList['可分配属性点'] - getCurrentAssignedPoint($points.find('.pd_point'));
        if (!surplusPoint) return;
        var $point = $(this).prev('span').prev('.pd_point');
        if (!$point.length) return;
        var num = parseInt($point.val());
        if (isNaN(num) || num < 0) num = 0;
        num = num + surplusPoint;
        $point.val(num < 1 ? 1 : num).trigger('change');
    }).closest('form').submit(function () {
        Util.deleteCookie(_Const2.default.changePointsInfoCookieName);
        return checkPoints($points);
    }).find('.pd_point').trigger('change');
};

/**
 * 检查点数设置
 * @param {jQuery} $points 点数字段对象
 * @returns {boolean} 检查结果
 */
var checkPoints = function checkPoints($points) {
    var surplusPoint = propertyList['可分配属性点'] - getCurrentAssignedPoint($points.find('.pd_point'));
    if (surplusPoint < 0) {
        alert('剩余属性点为负，请重新填写');
        return false;
    } else if (surplusPoint > 0) {
        if (!confirm('可分配属性点尚未用完，是否继续？')) return false;
    }
    return true;
};

/**
 * 获取争夺属性列表
 * @param {string} html 争夺属性区域的HTML代码
 * @returns {{}} 争夺属性
 */
var getLootPropertyList = function getLootPropertyList(html) {
    var propertyList = {
        '攻击力': 0,
        '生命值': 0,
        '最大生命值': 0,
        '攻击速度': 0,
        '暴击几率': 0,
        '技能伤害': 0,
        '技能释放概率': 0,
        '防御': 0,
        '可分配属性点': 0
    };
    var matches = /"(\d+)攻击力"/.exec(html);
    if (matches) propertyList['攻击力'] = parseInt(matches[1]);
    matches = /"(\d+)\/(\d+)生命值"/.exec(html);
    if (matches) {
        propertyList['生命值'] = parseInt(matches[1]);
        propertyList['最大生命值'] = parseInt(matches[2]);
    }
    matches = /"(\d+)攻击速度"/.exec(html);
    if (matches) propertyList['攻击速度'] = parseInt(matches[1]);
    matches = /"(\d+(?:\.\d+)?)%减伤"/.exec(html);
    if (matches) propertyList['防御'] = parseFloat(matches[1]);
    matches = /"(\d+)\s*可分配属性"/.exec(html);
    if (matches) propertyList['可分配属性点'] = parseInt(matches[1]);
    return propertyList;
};

/**
 * 获取当前已分配的点数
 * @param {jQuery} $points 点数字段对象
 * @returns {number} 当前已分配的点数
 */
var getCurrentAssignedPoint = exports.getCurrentAssignedPoint = function getCurrentAssignedPoint($points) {
    var usedPoint = 0;
    $points.each(function () {
        var $this = $(this);
        var name = $this.attr('name');
        var point = parseInt($this.val());
        if (point && point > 0) usedPoint += point;
    });
    return usedPoint;
};

/**
 * 获取技能伤害的值
 * @param {number} power 力量总和
 * @param {number} life 体质总和
 * @param {number} intelligence 智力总和
 * @returns {number} 技能伤害的值
 */
var getSkillAttack = exports.getSkillAttack = function getSkillAttack(power, life, intelligence) {
    return power * 5 + life * 5 + intelligence * 5;
};

/**
 * 根据字段名称获取点数名称
 * @param {string} fieldName 字段名称
 * @returns {string} 点数名称
 */
var getPointNameByFieldName = exports.getPointNameByFieldName = function getPointNameByFieldName(fieldName) {
    switch (fieldName) {
        case 's1':
            return '力量';
        case 's2':
            return '体质';
        case 'd1':
            return '敏捷';
        case 'd2':
            return '灵活';
        case 'i1':
            return '智力';
        case 'i2':
            return '意志';
        case 'p':
            return '耐力';
        case 'l':
            return '幸运';
        case 'weaponId':
            return '武器ID';
        case 'weaponMemo':
            return '武器备注';
        case 'armorId':
            return '护甲ID';
        case 'armorMemo':
            return '护甲备注';
        default:
            return '';
    }
};

/**
 * 根据点数名称获取字段名称
 * @param {string} pointName 点数名称
 * @returns {string} 字段名称
 */
var getFieldNameByPointName = exports.getFieldNameByPointName = function getFieldNameByPointName(pointName) {
    switch (pointName) {
        case '力量':
            return 's1';
        case '体质':
            return 's2';
        case '敏捷':
            return 'd1';
        case '灵活':
            return 'd2';
        case '智力':
            return 'i1';
        case '意志':
            return 'i2';
        case '耐力':
            return 'p';
        case '幸运':
            return 'l';
        case '武器ID':
            return 'weaponId';
        case '武器备注':
            return 'weaponMemo';
        case '护甲ID':
            return 'armorId';
        case '护甲备注':
            return 'armorMemo';
        default:
            return '';
    }
};

/**
 * 根据指定的点数获得相应额外加成点数
 * @param {string} pointName 点数名称
 * @param {number} point 点数的值
 * @returns {number} 额外加成点数
 */
var getExtraPoint = exports.getExtraPoint = function getExtraPoint(pointName, point) {
    var elapsedMedicine = itemUsedNumList.get('消逝之药') * 5;
    var haloPercent = haloInfo['全属性'];
    switch (pointName) {
        case '力量':
            return Math.floor(point * haloPercent) + itemUsedNumList.get('蕾米莉亚同人漫画') + elapsedMedicine;
        case '体质':
            return Math.floor(point * haloPercent) + itemUsedNumList.get('蕾米莉亚同人漫画') + elapsedMedicine;
        case '敏捷':
            return Math.floor(point * haloPercent) + itemUsedNumList.get('十六夜同人漫画') + elapsedMedicine;
        case '灵活':
            return Math.floor(point * haloPercent) + itemUsedNumList.get('十六夜同人漫画') + elapsedMedicine;
        case '智力':
            return Math.floor(point * haloPercent) + elapsedMedicine;
        case '意志':
            return Math.floor((Math.floor(point * haloPercent) + elapsedMedicine + point) * (currentArmInfo.get('护甲')['组别'] === '铠甲' ? 1.1 : 1)) - point;
        default:
            return 0;
    }
};

/**
 * 根据指定的点数获得相应争夺属性的值
 * @param {string} pointName 点数名称
 * @param {number} point 点数的值
 * @returns {number} 争夺属性的值
 */
var getPropertyByPoint = exports.getPropertyByPoint = function getPropertyByPoint(pointName, point) {
    var pointValue = point + getExtraPoint(pointName, point);
    switch (pointName) {
        case '力量':
            return pointValue * 5 + haloInfo['攻击力'];
        case '体质':
            return pointValue * 20 + (itemUsedNumList.get('蕾米莉亚同人漫画') === 50 ? 700 : 0) + haloInfo['生命值'];
        case '敏捷':
            return pointValue * 2 + (itemUsedNumList.get('十六夜同人漫画') === 50 ? 100 : 0);
        case '灵活':
            return Math.round(pointValue / (pointValue + 100) * 100);
        case '智力':
            return Math.round(pointValue / (pointValue + 90) * 100);
        case '意志':
            return Math.round(pointValue / (pointValue + 150) * 100);
        default:
            return 0;
    }
};

/**
 * 根据指定的争夺属性获得相应点数的值
 * @param {string} pointName 点数名称
 * @param {number} num 争夺属性的值
 * @returns {number} 点数的值
 */
var getPointByProperty = exports.getPointByProperty = function getPointByProperty(pointName, num) {
    var elapsedMedicine = itemUsedNumList.get('消逝之药') * 5;
    var haloPercent = 1 + haloInfo['全属性'];
    var value = 0;
    switch (pointName) {
        case '力量':
            value = Math.ceil((Math.ceil((num - haloInfo['攻击力']) / 5) - itemUsedNumList.get('蕾米莉亚同人漫画') - elapsedMedicine) / haloPercent);
            break;
        case '体质':
            value = Math.ceil((Math.ceil((num - haloInfo['生命值'] - (itemUsedNumList.get('蕾米莉亚同人漫画') === 50 ? 700 : 0)) / 20) - itemUsedNumList.get('蕾米莉亚同人漫画') - elapsedMedicine) / haloPercent);
            break;
        case '敏捷':
            value = Math.ceil((Math.ceil((num - (itemUsedNumList.get('十六夜同人漫画') === 50 ? 100 : 0)) / 2) - itemUsedNumList.get('十六夜同人漫画') - elapsedMedicine) / haloPercent);
            break;
        case '灵活':
            value = Math.floor((Math.round(100 * num / (100 - num)) - itemUsedNumList.get('十六夜同人漫画') - elapsedMedicine) / haloPercent);
            break;
        case '智力':
            value = Math.floor((Math.round(90 * num / (100 - num)) - elapsedMedicine) / haloPercent);
            break;
        case '意志':
            value = Math.floor((Math.round(150 * num / (100 - num)) - elapsedMedicine) / haloPercent);
            break;
    }
    if (!isFinite(value) || value < 1) value = 1;
    return value;
};

/**
 * 添加各层点数分配方案选择框
 */
var addLevelPointListSelect = function addLevelPointListSelect() {
    $('\n<tr>\n  <td colspan="2">\n    <select id="pdLevelPointListSelect" style="margin: 5px 0;">\n      <option>\u70B9\u6570\u5206\u914D\u65B9\u6848</option>\n      <option value="0">\u9ED8\u8BA4</option>\n    </select>\n    <a class="pd_btn_link" data-name="save" href="#" title="\u5C06\u5F53\u524D\u70B9\u6570\u8BBE\u7F6E\u4FDD\u5B58\u4E3A\u65B0\u7684\u65B9\u6848">\u4FDD\u5B58</a>\n    <a class="pd_btn_link" data-name="edit" href="#" title="\u7F16\u8F91\u5404\u5C42\u70B9\u6570\u5206\u914D\u65B9\u6848">\u7F16\u8F91</a>\n    <a class="pd_btn_link" data-name="fill" href="#" title="\u8F93\u5165\u4E00\u4E32\u6570\u5B57\u6309\u987A\u5E8F\u586B\u5145\u5230\u5404\u4E2A\u70B9\u6570\u5B57\u6BB5\u4E2D">\u586B\u5145</a>\n  </td>\n</tr>').prependTo($points.find('> tbody')).find('#pdLevelPointListSelect').change(function () {
        var level = parseInt($(this).val());
        if (level > 0) {
            var points = Config.levelPointList[parseInt(level)];
            if ((typeof points === 'undefined' ? 'undefined' : _typeof(points)) !== 'object') return;
            $points.find('.pd_point, .pd_arm_input').each(function () {
                var $this = $(this);
                var pointName = getPointNameByFieldName($this.attr('name'));
                $this.val(points[pointName]);
            }).trigger('change');
        } else if (level === 0) {
            $points.find('.pd_point, .pd_arm_input').each(function () {
                $(this).val(this.defaultValue);
            }).trigger('change');
        }
    }).end().find('[data-name="save"]').click(function (e) {
        e.preventDefault();
        if (!checkPoints($points)) return;
        var $levelPointListSelect = $('#pdLevelPointListSelect');
        var level = parseInt($levelPointListSelect.val());
        level = parseInt(prompt('请输入层数：', level ? level : ''));
        if (!level || level < 0) return;

        (0, _Config.read)();
        if (level in Config.levelPointList) {
            if (!confirm('该层数已存在，是否覆盖？')) return;
        }
        var points = {};
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = Array.from($points.find('.pd_point, .pd_arm_input'))[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var elem = _step2.value;

                var $elem = $(elem);
                var name = $elem.attr('name');
                var value = $.trim($elem.val());
                if ($elem.is('.pd_point')) {
                    value = parseInt(value);
                    if (!value || value < 0) return;
                } else {
                    if (!value) continue;
                    if (name === 'weaponId' || name === 'armorId') {
                        value = parseInt(value);
                        if (!value || value < 0) return;
                    }
                }
                points[getPointNameByFieldName(name)] = value;
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        Config.levelPointList[level] = points;
        (0, _Config.write)();
        setLevelPointListSelect(Config.levelPointList);
        $levelPointListSelect.val(level);
    }).end().find('[data-name="edit"]').click(function (e) {
        e.preventDefault();
        showLevelPointListConfigDialog();
    }).end().find('[data-name="fill"]').click(function (e) {
        e.preventDefault();
        fillPoints($points);
    });
    setLevelPointListSelect(Config.levelPointList);
};

/**
 * 填充点数设置
 * @param $points
 */
var fillPoints = function fillPoints($points) {
    var value = $.trim(prompt('\u8BF7\u8F93\u5165\u4EE5\u4EFB\u610F\u5B57\u7B26\u5206\u9694\u7684\u4E00\u4E32\u6570\u5B57\uFF0C\u6309\u987A\u5E8F\u586B\u5145\u5230\u5404\u4E2A\u70B9\u6570\u5B57\u6BB5\u4E2D\uFF08\u6CE8\uFF1A5\u4F4D\u6570\u4EE5\u4E0A\u7684\u6570\u5B57\u5C06\u88AB\u5F53\u4F5C\u88C5\u5907ID\uFF09\uFF1A\n\u53EF\u76F4\u63A5\u8F93\u5165\u8BA1\u7B97\u5668\u8F93\u51FA\u7684\u70B9\u6570\u8BBE\u7F6E\uFF0C\u4F8B\uFF1A1 100 50 5 25 1  0 3 Bow #1234567 Cloth #7654321'));
    if (!value) return;
    var pointsMatches = /^\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+\d+\s+\d+\s+(\S+)\s+#(\d+)\s+(\S+)\s+#(\d+)/.exec(value);
    if (!pointsMatches) {
        pointsMatches = /^\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+\d+\s+(\S+)\s+#(\d+)/.exec(value);
    }
    if (pointsMatches) {
        $points.find('.pd_point').each(function (index) {
            if (index + 1 < pointsMatches.length) {
                $(this).val(pointsMatches[index + 1]).trigger('change');
            }
        });
        $points.find('input[name="weaponMemo"]').val(pointsMatches[7]);
        $points.find('input[name="weaponId"]').val(pointsMatches[8]);
        if (pointsMatches[9] && pointsMatches[10]) {
            $points.find('input[name="armorMemo"]').val(pointsMatches[9]);
            $points.find('input[name="armorId"]').val(pointsMatches[10]);
        }
    } else {
        var numMatches = value.match(/\b\d{1,4}\b/g);
        if (!numMatches) return;
        $points.find('.pd_point').each(function (index) {
            if (index < numMatches.length) $(this).val(parseInt(numMatches[index])).trigger('change');else return false;
        });
        var armIdMatches = value.match(/\b(\d{5,})\b/g);
        for (var i in armIdMatches) {
            var name = parseInt(i) === 0 ? 'weaponId' : 'armorId';
            $points.find('input[name="' + name + '"]').val(armIdMatches[i]);
        }
    }
};

/**
 * 设置各层点数分配方案选择框
 * @param {{}} levelPointList 各层点数分配列表
 */
var setLevelPointListSelect = function setLevelPointListSelect(levelPointList) {
    var pointListHtml = '';
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = Util.entries(levelPointList)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _step3$value = _slicedToArray(_step3.value, 2),
                level = _step3$value[0],
                points = _step3$value[1];

            if (!$.isNumeric(level)) continue;
            pointListHtml += '<option value="' + level + '">\u7B2C' + level + '\u5C42 ' + (points['武器ID'] || points['护甲ID'] ? '(装)' : '') + '</option>';
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    $('#pdLevelPointListSelect').find('option:gt(1)').remove().end().append(pointListHtml);
};

/**
 * 修改点数分配方案和装备
 * @param {number} nextLevel 下一层（设为-1表示采用当前点数分配方案）
 * @param {function} callback 回调函数
 */
var changePointsAndArms = exports.changePointsAndArms = function changePointsAndArms(nextLevel, callback) {
    if (nextLevel > 0 && Config.customPointsScriptEnabled && typeof _Const2.default.getCustomPoints === 'function') {
        var points = null;
        try {
            points = _Const2.default.getCustomPoints($.extend(getLootInfo(), { getExtraPoint: getExtraPoint, getPointByProperty: getPointByProperty, getPropertyByPoint: getPropertyByPoint }));
        } catch (ex) {
            console.log(ex);
        }
        if ($.type(points) === 'object') {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = Util.entries(points)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _step4$value = _slicedToArray(_step4.value, 2),
                        key = _step4$value[0],
                        value = _step4$value[1];

                    $points.find('input[name="' + getFieldNameByPointName(key) + '"]').val(value).trigger('change');
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            nextLevel = -1;
        } else if (typeof points === 'number') {
            nextLevel = parseInt(points);
            nextLevel = nextLevel > 1 ? nextLevel : 1;
        } else if (points === false) {
            return callback('ignore');
        } else {
            return callback('error');
        }
    }

    var nextLevelText = getCurrentLevel(logList) + 1;
    var changeLevel = nextLevel > 0 ? Math.max.apply(Math, _toConsumableArray(Object.keys(Config.levelPointList).filter(function (level) {
        return level <= nextLevel;
    }))) : -1;
    var $levelPointListSelect = $('#pdLevelPointListSelect');
    if (changeLevel > 0) $levelPointListSelect.val(changeLevel).trigger('change');else $levelPointListSelect.get(0).selectedIndex = 0;
    var isChangeWeapon = false,
        isChangeArmor = false,
        isChangePoints = false;
    $points.find('.pd_point, input[name="weaponId"], input[name="armorId"]').each(function () {
        var $this = $(this);
        var name = $this.attr('name');
        var value = $.trim($this.val());
        if (parseInt(value) > 0 && this.defaultValue !== value) {
            if (name === 'weaponId') isChangeWeapon = true;else if (name === 'armorId') isChangeArmor = true;else isChangePoints = true;
        }
    });

    if (isChangeWeapon || isChangeArmor || isChangePoints) {
        if (Config.unusedPointNumAlertEnabled && !_Info2.default.w.unusedPointNumAlert && parseInt($('#pdSurplusPoint > em').text()) > 0) {
            if (confirm('可分配属性点尚未用完，是否继续？')) _Info2.default.w.unusedPointNumAlert = true;else return callback('error');
        }

        var weaponId = parseInt($points.find('input[name="weaponId"]').val());
        var armorId = parseInt($points.find('input[name="armorId"]').val());
        var ajaxList = ['ignore', 'ignore', 'ignore'];
        if (isChangeWeapon) {
            ajaxList[0] = {
                type: 'POST',
                url: 'kf_fw_ig_mybpdt.php',
                timeout: _Const2.default.defAjaxTimeout,
                data: 'do=4&id=' + weaponId + '&safeid=' + safeId
            };
        }
        if (isChangeArmor) {
            ajaxList[1] = {
                type: 'POST',
                url: 'kf_fw_ig_mybpdt.php',
                timeout: _Const2.default.defAjaxTimeout,
                data: 'do=4&id=' + armorId + '&safeid=' + safeId
            };
        }
        if (isChangePoints) {
            ajaxList[2] = {
                type: 'POST',
                url: 'kf_fw_ig_enter.php',
                timeout: _Const2.default.defAjaxTimeout,
                data: $points.closest('form').serialize()
            };
        }

        var result = 'success';
        $(document).clearQueue('ChangePointsAndArms');
        $.each(ajaxList, function (index, ajax) {
            if (ajax === 'ignore') return;
            $(document).queue('ChangePointsAndArms', function () {
                $.ajax(ajax).done(function (html) {
                    if (index === 0) {
                        var msg = Util.removeHtmlTag(html);
                        if (/装备完毕/.test(msg)) {
                            $points.find('input[name="weaponId"], input[name="weaponMemo"]').each(function () {
                                this.defaultValue = $(this).val();
                            });
                            if (Config.autoSaveArmsInfoEnabled) {
                                var armsInfo = Item.readArmsInfo();
                                armsInfo['已装备武器'] = weaponId;
                                Item.writeArmsInfo(armsInfo);
                            }
                        } else {
                            Msg.show('<strong>\u66F4\u6362\u6B66\u5668\uFF1A' + msg + '</strong>', -1);
                            Script.runFunc('Loot.lootAttack_changePointsAndArms_error_', msg);
                            result = 'error';
                        }
                    } else if (index === 1) {
                        var _msg = Util.removeHtmlTag(html);
                        if (/装备完毕/.test(_msg)) {
                            $points.find('input[name="armorId"], input[name="armorMemo"]').each(function () {
                                this.defaultValue = $(this).val();
                            });
                            if (Config.autoSaveArmsInfoEnabled) {
                                var _armsInfo = Item.readArmsInfo();
                                _armsInfo['已装备护甲'] = armorId;
                                Item.writeArmsInfo(_armsInfo);
                            }
                        } else {
                            Msg.show('<strong>\u66F4\u6362\u62A4\u7532\uFF1A' + _msg + '</strong>', -1);
                            Script.runFunc('Loot.lootAttack_changePointsAndArms_error_', _msg);
                            result = 'error';
                        }
                    } else if (index === 2) {
                        var _Util$getResponseMsg = Util.getResponseMsg(html),
                            _msg2 = _Util$getResponseMsg.msg;

                        if (/已经重新配置加点！/.test(_msg2)) {
                            Util.deleteCookie(_Const2.default.changePointsInfoCookieName);
                            $points.find('.pd_point').each(function () {
                                this.defaultValue = $(this).val();
                            });
                        } else {
                            var matches = /你还需要等待(\d+)分钟/.exec(_msg2);
                            if (matches) {
                                var nextTime = Util.getDate('+' + parseInt(matches[1]) + 'm');
                                Util.setCookie(_Const2.default.changePointsInfoCookieName, nextTime.getTime(), nextTime);
                            }
                            Msg.show('<strong>\u7B2C<em>' + nextLevelText + '</em>\u5C42\u65B9\u6848\uFF1A' + _msg2 + '</strong>', -1);
                            Script.runFunc('Loot.lootAttack_changePointsAndArms_error_', _msg2);
                            result = 'error';
                        }
                    }
                }).fail(function () {
                    result = 'timeout';
                }).always(function () {
                    if (result === 'error' || result === 'timeout') {
                        $(document).clearQueue('ChangePointsAndArms');
                        callback(result);
                    } else if (!$(document).queue('ChangePointsAndArms').length) {
                        Script.runFunc('Loot.changePointsAndArms_success_');
                        callback(result);
                    } else {
                        setTimeout(function () {
                            return $(document).dequeue('ChangePointsAndArms');
                        }, _Const2.default.minActionInterval);
                    }
                });
            });
        });
        $(document).dequeue('ChangePointsAndArms');
    } else {
        callback('ignore');
    }
};

/**
 * 更新争夺信息
 * @param {function} callback 回调函数
 */
var updateLootInfo = exports.updateLootInfo = function updateLootInfo() {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    console.log('更新争夺信息Start');
    $.ajax({
        type: 'GET',
        url: 'kf_fw_ig_index.php?t=' + $.now(),
        timeout: _Const2.default.defAjaxTimeout
    }).done(function (html) {
        var $area = $('#wdsx', html).parent();
        log = $area.find('#pk_text').html();
        if (!log) {
            Msg.remove($('.pd_countdown').closest('.pd_msg'));
            return;
        }

        $area.find('.kf_fw_ig3:first input[type="text"]').each(function (index) {
            var value = $.trim($(this).val());
            if (!value) return;
            $properties.find('input[type="text"]:eq(' + index + ')').val(value);
        });

        var serverStatusMatches = /错高峰福利：当前服务器状态\[\s*<span style="color:(#[a-fA-F0-9]+);[^<>]+>(\S+?)<\/span>\s*\]/.exec(html);
        if (serverStatusMatches) {
            var serverStatusColor = serverStatusMatches[1];
            serverStatus = serverStatusMatches[2];
            if (_Const2.default.debug) console.log('当前服务器状态：' + serverStatus);
            $properties.find('#pdServerStatus').text(serverStatus).css('color', serverStatusColor);
        }

        var countDownMatches = /\(下次修改配点还需\[(\d+)]分钟\)/.exec(html);
        if (countDownMatches) {
            changePointsAvailableCount = 0;
            var nextTime = Util.getDate('+' + countDownMatches[1] + 'm');
            Util.setCookie(_Const2.default.changePointsInfoCookieName, nextTime.getTime(), nextTime);
            $points.find('#pdChangeCount').text('(\u4E0B\u6B21\u4FEE\u6539\u914D\u70B9\u8FD8\u9700[' + countDownMatches[1] + ']\u5206\u949F)');
        }
        var changeCountMatches = /当前修改配点可用\[(\d+)]次/.exec(html);
        if (changeCountMatches) {
            changePointsAvailableCount = parseInt(changeCountMatches[1]);
            Util.setCookie(_Const2.default.changePointsInfoCookieName, changePointsAvailableCount + 'c', Util.getDate('+' + _Const2.default.changePointsInfoExpires + 'm'));
            $points.find('#pdChangeCount').text('(\u5F53\u524D\u4FEE\u6539\u914D\u70B9\u53EF\u7528[' + changePointsAvailableCount + ']\u6B21)');
        }

        var armHtml = $area.find('.kf_fw_ig1:first > tbody > tr:first-child > td').html();
        if (armHtml.includes('（装备中）')) {
            var _armHtml$split3 = armHtml.split('<br><br>', 2),
                _armHtml$split4 = _slicedToArray(_armHtml$split3, 2),
                armInfoHtml = _armHtml$split4[0],
                _armHtml$split4$ = _armHtml$split4[1],
                finalAddAdditionHtml = _armHtml$split4$ === undefined ? '' : _armHtml$split4$;

            var _armInfoHtml$split5 = armInfoHtml.split('（装备中）'),
                _armInfoHtml$split6 = _slicedToArray(_armInfoHtml$split5, 3),
                _armInfoHtml$split6$ = _armInfoHtml$split6[1],
                weaponInfoHtml = _armInfoHtml$split6$ === undefined ? '' : _armInfoHtml$split6$,
                _armInfoHtml$split6$2 = _armInfoHtml$split6[2],
                armorInfoHtml = _armInfoHtml$split6$2 === undefined ? '' : _armInfoHtml$split6$2;

            var newArmHtml = '';
            if (weaponInfoHtml) newArmHtml += '（装备中）' + Item.handleUselessSubProperties(weaponInfoHtml);
            if (armorInfoHtml) newArmHtml += '（装备中）' + Item.handleUselessSubProperties(armorInfoHtml);
            if (finalAddAdditionHtml) newArmHtml += '<br><br>' + finalAddAdditionHtml;
            $armArea.html(newArmHtml);

            currentArmInfo.set('武器', Item.getArmInfo(weaponInfoHtml));
            currentArmInfo.set('护甲', Item.getArmInfo(armorInfoHtml));
        }

        var propertiesHtml = $properties.html();
        propertyList = getLootPropertyList(propertiesHtml);
        itemUsedNumList = Item.getItemsUsedNumInfo(propertiesHtml);
        armsLevelList = Item.getArmsLevelInfo(propertiesHtml);
        $properties.find('.pd_arm_level').trigger('change');
        $points.find('.pd_point').trigger('change');

        if (typeof callback === 'function') callback();
        Script.runFunc('Loot.updateLootInfo_after_', html);
    }).fail(function () {
        setTimeout(function () {
            return updateLootInfo(callback);
        }, _Const2.default.minActionInterval);
    });
};

/**
 * 获取当前争夺信息
 * @returns {{}} 当前争夺信息
 */
var getLootInfo = exports.getLootInfo = function getLootInfo() {
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
        availablePoint: propertyList['可分配属性点'],
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

/**
 * 显示各层点数分配方案对话框
 */
var showLevelPointListConfigDialog = function showLevelPointListConfigDialog(callback) {
    var dialogName = 'pdLevelPointListConfigDialog';
    if ($('#' + dialogName).length > 0) return;
    (0, _Config.read)();
    var html = '\n<div class="pd_cfg_main">\n  <div style="margin: 5px 0; line-height: 1.6em;">\n    \u8BF7\u586B\u5199\u5404\u5C42\u5BF9\u5E94\u7684\u70B9\u6570\u5206\u914D\u65B9\u6848\uFF0C\u76F8\u90BB\u5C42\u6570\u5982\u6570\u503C\u5B8C\u5168\u76F8\u540C\u7684\u8BDD\uFF0C\u5219\u53EA\u4FDD\u7559\u6700\u524D\u9762\u7684\u4E00\u5C42<br>\n    \uFF08\u4F8B\uFF1A11-19\u5C42\u70B9\u6570\u76F8\u540C\u7684\u8BDD\uFF0C\u5219\u53EA\u4FDD\u7559\u7B2C11\u5C42\uFF09<br>\n    \u6B66\u5668\u3001\u62A4\u7532ID\u548C\u5907\u6CE8\u4E3A\u53EF\u9009\u9879\uFF0C\u53EA\u5728\u9700\u8981\u66F4\u6362\u88C5\u5907\u65F6\u586B\u5199<br>\n    \u81EA\u5B9A\u4E49\u70B9\u6570\u5206\u914D\u65B9\u6848\u811A\u672C\u7684\u53C2\u8003\u8303\u4F8B\u8BF7\u53C2\u89C1<a href="read.php?tid=500968&spid=13270735&sf=b09" target="_blank">\u6B64\u8D3453\u697C</a>\n  </div>\n  <div style="overflow-y: auto; max-height: 400px;">\n    <table id="pdLevelPointList" style="text-align: center; white-space: nowrap;">\n      <tbody>\n        <tr>\n          <th></th><th>\u5C42\u6570</th><th>\u529B\u91CF</th><th>\u4F53\u8D28</th><th>\u654F\u6377</th><th>\u7075\u6D3B</th><th>\u667A\u529B</th><th>\u610F\u5FD7</th>\n<th>\u6B66\u5668ID</th><th>\u6B66\u5668\u5907\u6CE8</th><th>\u62A4\u7532ID</th><th>\u62A4\u7532\u5907\u6CE8</th><th></th>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n  <hr>\n  <div style="float: left; line-height: 27px;">\n    <a class="pd_btn_link" data-name="selectAll" href="#">\u5168\u9009</a>\n    <a class="pd_btn_link" data-name="selectInverse" href="#">\u53CD\u9009</a>\n    <a class="pd_btn_link pd_highlight" data-name="add" href="#">\u589E\u52A0</a>\n    <a class="pd_btn_link" data-name="deleteSelect" href="#">\u5220\u9664</a>\n  </div>\n  <div data-id="modifyArea" style="float: right;">\n    <input name="s1" type="text" maxlength="5" title="\u529B\u91CF" placeholder="\u529B\u91CF" style="width: 35px;">\n    <input name="s2" type="text" maxlength="5" title="\u4F53\u8D28" placeholder="\u4F53\u8D28" style="width: 35px;">\n    <input name="d1" type="text" maxlength="5" title="\u654F\u6377" placeholder="\u654F\u6377" style="width: 35px;">\n    <input name="d2" type="text" maxlength="5" title="\u7075\u6D3B" placeholder="\u7075\u6D3B" style="width: 35px;">\n    <input name="i1" type="text" maxlength="5" title="\u667A\u529B" placeholder="\u667A\u529B" style="width: 35px;">\n    <input name="i2" type="text" maxlength="5" title="\u610F\u5FD7" placeholder="\u610F\u5FD7" style="width: 35px;">\n    <a class="pd_btn_link" data-name="clear" href="#" title="\u6E05\u7A7A\u5404\u4FEE\u6539\u5B57\u6BB5">\u6E05\u7A7A</a>\n    <button type="button" name="modify">\u4FEE\u6539</button>\n    <span class="pd_cfg_tips" title="\u53EF\u5C06\u6240\u9009\u62E9\u7684\u5C42\u6570\u7684\u76F8\u5E94\u5C5E\u6027\u4FEE\u6539\u4E3A\u6307\u5B9A\u7684\u6570\u503C\uFF1B\u6570\u5B57\u524D\u53EF\u8BBE+/-\u53F7\uFF0C\u8868\u793A\u589E\u52A0/\u51CF\u5C11\u76F8\u5E94\u6570\u91CF\uFF1B\u4F8B\uFF1A100\u3001+5\u6216-2">[?]</span>\n  </div>\n</div>\n<div class="pd_cfg_btns">\n  <span class="pd_cfg_about"><a data-name="openImOrExLevelPointListConfigDialog" href="#">\u5BFC\u5165/\u5BFC\u51FA\u5206\u914D\u65B9\u6848</a></span>\n  <button type="submit">\u4FDD\u5B58</button>\n  <button data-action="close" type="button">\u53D6\u6D88</button>\n</div>';
    var $dialog = Dialog.create(dialogName, '各层点数分配方案', html, 'min-width: 840px;');
    var $levelPointList = $dialog.find('#pdLevelPointList > tbody');

    /**
     * 添加各层点数分配的HTML
     * @param {number} level 层数
     * @param {{}} points 点数对象
     */
    var addLevelPointHtml = function addLevelPointHtml(level, points) {
        $('\n<tr>\n  <td style="width: 25px; text-align: left;"><input type="checkbox"></td>\n  <td style="text-align: left;">\n    <label style="margin-right: 8px;">\n      \u7B2C <input name="level" type="text" value="' + (level ? level : '') + '" style="width: 30px;"> \u5C42\n    </label>\n  </td>\n  <td><input class="pd_point" name="s1" type="number" value="' + points['力量'] + '" min="1" style="width: 50px;" required></td>\n  <td><input class="pd_point" name="s2" type="number" value="' + points['体质'] + '" min="1" style="width: 50px;" required></td>\n  <td><input class="pd_point" name="d1" type="number" value="' + points['敏捷'] + '" min="1" style="width: 50px;" required></td>\n  <td><input class="pd_point" name="d2" type="number" value="' + points['灵活'] + '" min="1" style="width: 50px;" required></td>\n  <td><input class="pd_point" name="i1" type="number" value="' + points['智力'] + '" min="1" style="width: 50px;" required></td>\n  <td><input class="pd_point" name="i2" type="number" value="' + points['意志'] + '" min="1" style="width: 50px;" required></td>\n  <td><input class="pd_arm_input" name="weaponId" type="text" value="' + (points['武器ID'] ? points['武器ID'] : '') + '" maxlength="15" style="width: 65px;"></td>\n  <td><input class="pd_arm_input" name="weaponMemo" type="text" value="' + (points['武器备注'] ? points['武器备注'] : '') + '" maxlength="20" style="width: 70px;"></td>\n  <td><input class="pd_arm_input" name="armorId" type="text" value="' + (points['护甲ID'] ? points['护甲ID'] : '') + '" maxlength="15" style="width: 65px;"></td>\n  <td><input class="pd_arm_input" name="armorMemo" type="text" value="' + (points['护甲备注'] ? points['护甲备注'] : '') + '" maxlength="20" style="width: 70px;"></td>\n  <td style="text-align: left;">\n    <a class="pd_btn_link" data-name="fill" href="#">\u586B\u5145</a>\n    <a class="pd_btn_link" data-name="addArm" href="#">\u88C5\u5907</a>\n    <a class="pd_btn_link pd_highlight" data-name="delete" href="#">\u5220\u9664</a>\n  </td>\n</tr>\n<tr>\n  <td></td>\n  <td class="pd_custom_tips" title="\u5269\u4F59\u5C5E\u6027\u70B9">\u5269\u4F59\uFF1A<span data-id="surplusPoint">0</span></td>\n  <td title="\u653B\u51FB\u529B" hidden> <!-- \u4E34\u65F6\u7981\u7528 -->\n    \u653B\uFF1A<span data-id="pro_s1" style="cursor: pointer;">0</span> <a data-id="opt_s1" href="#" title="\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9">&#177;</a>\n  </td>\n  <td title="\u6700\u5927\u751F\u547D\u503C" hidden>\n    \u547D\uFF1A<span data-id="pro_s2" style="cursor: pointer;">0</span> <a data-id="opt_s2" href="#" title="\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9">&#177;</a>\n  </td>\n  <td title="\u653B\u51FB\u901F\u5EA6" hidden>\n    \u901F\uFF1A<span data-id="pro_d1" style="cursor: pointer;">0</span> <a data-id="opt_d1" href="#" title="\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9">&#177;</a>\n  </td>\n  <td title="\u66B4\u51FB\u51E0\u7387" hidden>\n    \u66B4\uFF1A<span data-id="pro_d2" style="cursor: pointer;">0</span>% <a data-id="opt_d2" href="#" title="\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9">&#177;</a>\n  </td>\n  <td title="\u6280\u80FD\u91CA\u653E\u6982\u7387" hidden>\n    \u6280\uFF1A<span data-id="pro_i1" style="cursor: pointer;">0</span>% <a data-id="opt_i1" href="#" title="\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9">&#177;</a>\n  </td>\n  <td title="\u9632\u5FA1\u51CF\u4F24" hidden>\n    \u9632\uFF1A<span data-id="pro_i2" style="cursor: pointer;">0</span>% <a data-id="opt_i2" href="#" title="\u70B9\u51FB\uFF1A\u7ED9\u8BE5\u9879\u52A0\u4E0A\u6216\u51CF\u53BB\u5269\u4F59\u5C5E\u6027\u70B9">&#177;</a>\n  </td>\n  <td class="pd_custom_tips" title="[\u98DE\u8EAB\u5288\u65A9]\u4F24\u5BB3\uFF1A\u653B\u51FB+\u4F53\u8D28\u503C*5+\u667A\u529B\u503C*5" hidden>\u6280\u4F24\uFF1A<span data-id="skillAttack">0</span></td>\n  <td hidden></td>\n  <td hidden></td>\n</tr>\n').appendTo($levelPointList).find('.pd_point').trigger('change');
    };

    $dialog.submit(function (e) {
        e.preventDefault();
        (0, _Config.read)();
        var levelPointList = {};
        var prevPoints = {};
        var isError = false,
            isSurplus = false;
        $levelPointList.find('tr:gt(0)').each(function () {
            var $this = $(this);
            if (!$this.find('.pd_point').length) return;
            var surplusPoint = propertyList['可分配属性点'] - getCurrentAssignedPoint($this.find('.pd_point'));
            if (surplusPoint > 0) isSurplus = true;else if (surplusPoint < 0) {
                isError = true;
                return false;
            }

            var level = parseInt($this.find('[name="level"]').val());
            if (!level || level < 0) return;
            var points = {};
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = Array.from($this.find('.pd_point, .pd_arm_input'))[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var elem = _step5.value;

                    var $elem = $(elem);
                    var name = $elem.attr('name');
                    var value = null;
                    value = $.trim($elem.val());
                    if ($elem.is('.pd_point')) {
                        value = parseInt(value);
                        if (!value || value < 0) return;
                    } else {
                        if (!value) continue;
                        if (name === 'weaponId' || name === 'armorId') {
                            value = parseInt(value);
                            if (!value || value < 0) return;
                        }
                    }
                    points[getPointNameByFieldName(name)] = value;
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            if (Util.deepEqual(prevPoints, points)) return;

            levelPointList[level] = points;
            prevPoints = points;
        });
        if (isSurplus) {
            if (!confirm('部分层数的可分配属性点尚未用完，是否提交？')) return;
        }
        if (isError) {
            alert('部分层数的剩余属性点为负，请重新填写');
            return;
        }
        Config.levelPointList = levelPointList;
        (0, _Config.write)();
        Dialog.close(dialogName);
        setLevelPointListSelect(Config.levelPointList);
    }).find('[data-name="add"]').click(function (e) {
        e.preventDefault();
        var points = { '力量': 1, '体质': 1, '敏捷': 1, '灵活': 1, '智力': 1, '意志': 1 };
        addLevelPointHtml(0, points);
        $levelPointList.find('[name="level"]:last').focus();
        Dialog.resize(dialogName);
    }).end().find('[data-name="deleteSelect"]').click(function (e) {
        e.preventDefault();
        var $checked = $levelPointList.find('[type="checkbox"]:checked');
        if (!$checked.length || !confirm('是否删除所选层数？')) return;
        var $line = $checked.closest('tr');
        $line.next('tr').addBack().remove();
        Dialog.resize(dialogName);
    }).end().find('[data-name="openImOrExLevelPointListConfigDialog"]').click(function (e) {
        e.preventDefault();
        Public.showCommonImportOrExportConfigDialog('各层点数分配方案', 'levelPointList', null, function () {
            $('#pdLevelPointListConfigDialog').remove();
            showLevelPointListConfigDialog(function ($dialog) {
                return $dialog.submit();
            });
        });
    }).end().find('[data-name="selectAll"]').click(function () {
        return Util.selectAll($levelPointList.find('[type="checkbox"]'));
    }).end().find('[data-name="selectInverse"]').click(function () {
        return Util.selectInverse($levelPointList.find('[type="checkbox"]'));
    });

    $levelPointList.on('click', '[data-name="fill"]', function (e) {
        e.preventDefault();
        fillPoints($(this).closest('tr'));
    }).on('click', '[data-name="delete"]', function (e) {
        e.preventDefault();
        var $line = $(this).closest('tr');
        $line.next('tr').addBack().remove();
        Dialog.resize(dialogName);
    }).on('click', '[data-name="addArm"]', function (e) {
        e.preventDefault();
        $levelPointList.find('#pdAddWeaponId, #pdAddWeaponMemo, #pdAddArmorId, #pdAddArmorMemo').removeAttr('id');
        var $tr = $(this).closest('tr');
        $tr.find('[name="weaponId"]').attr('id', 'pdAddWeaponId').end().find('[name="weaponMemo"]').attr('id', 'pdAddWeaponMemo').end().find('[name="armorId"]').attr('id', 'pdAddArmorId').end().find('[name="armorMemo"]').attr('id', 'pdAddArmorMemo');
        addOrChangeArm(1);
    }).on('change', '.pd_point', function () {
        var $this = $(this);
        var name = $this.attr('name');
        var point = parseInt($this.val());
        if (!point || point < 0) return;

        var $points = $this.closest('tr');
        var $properties = $points.next('tr');
        $properties.find('[data-id="pro_' + name + '"]').text(getPropertyByPoint(getPointNameByFieldName(name), point));
        var power = parseInt($points.find('[name="s1"]').val());
        var life = parseInt($points.find('[name="s2"]').val());
        var intelligence = parseInt($points.find('[name="i1"]').val());
        $properties.find('[data-id="skillAttack"]').text(getSkillAttack(power + getExtraPoint('力量', power), life + getExtraPoint('体质', life), intelligence + getExtraPoint('智力', intelligence)));

        var surplusPoint = propertyList['可分配属性点'] - getCurrentAssignedPoint($points.find('.pd_point'));
        $properties.find('[data-id="surplusPoint"]').text(surplusPoint).css('color', surplusPoint !== 0 ? '#f00' : '#000');
    }).on('click', '[data-id^="pro_"]', function () {
        var $this = $(this);
        var name = $this.data('id').replace('pro_', '');
        var num = parseInt(prompt('请输入数值：', $this.text()));
        if (!num || num < 0) return;
        $this.closest('tr').prev('tr').find('[name="' + name + '"]').val(getPointByProperty(getPointNameByFieldName(name), num)).trigger('change');
    }).on('click', '[data-id^="opt_"]', function (e) {
        e.preventDefault();
        var $this = $(this);
        var name = $this.data('id').replace('opt_', '');
        var $points = $this.closest('tr').prev('tr');
        var surplusPoint = propertyList['可分配属性点'] - getCurrentAssignedPoint($points.find('.pd_point'));
        if (!surplusPoint) return;
        var $point = $points.find('[name="' + name + '"]');
        if (!$point.length) return;
        var num = parseInt($point.val());
        if (isNaN(num) || num < 0) num = 0;
        num = num + surplusPoint;
        var min = parseInt($point.attr('min'));
        $point.val(num < min ? min : num).trigger('change');
    });

    $dialog.find('[name="modify"]').click(function () {
        var $checked = $levelPointList.find('[type="checkbox"]:checked');
        if (!$checked.length) return;
        var data = {};
        $dialog.find('[data-id="modifyArea"] [type="text"]').each(function () {
            var $this = $(this);
            var name = $this.attr('name');
            var value = $.trim($this.val());
            if (!value) return;
            var matches = /^(-|\+)?(\d+)$/.exec(value);
            if (!matches) {
                alert('格式不正确');
                $this.select().focus();
            }
            data[name] = {};
            if (typeof matches[1] !== 'undefined') data[name].action = matches[1] === '+' ? 'add' : 'minus';else data[name].action = 'equal';
            data[name].value = parseInt(matches[2]);
        });
        $checked.each(function () {
            var $points = $(this).closest('tr');
            $points.find('.pd_point').each(function () {
                var $this = $(this);
                var name = $this.attr('name');
                if (!(name in data)) return;
                if (data[name].action !== 'equal') {
                    var point = parseInt($this.val());
                    if (!point || point < 0) point = 0;
                    point += data[name].action === 'add' ? data[name].value : -data[name].value;
                    $this.val(point > 1 ? point : 1);
                } else $this.val(data[name].value);
            }).trigger('change');
        });
        alert('点数已修改');
    }).end().find('[data-name="clear"]').click(function (e) {
        e.preventDefault();
        $(this).closest('[data-id="modifyArea"]').find('[type="text"]').val('');
    });

    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
        for (var _iterator6 = Util.entries(Config.levelPointList)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var _step6$value = _slicedToArray(_step6.value, 2),
                level = _step6$value[0],
                points = _step6$value[1];

            if (!$.isNumeric(level)) continue;
            addLevelPointHtml(level, points);
        }
    } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
            }
        } finally {
            if (_didIteratorError6) {
                throw _iteratorError6;
            }
        }
    }

    Dialog.show(dialogName);
    if (typeof callback === 'function') callback($dialog);
};

/**
 * 加入或更换装备
 * @param {number} type 类型，0：更换装备；1：加入装备
 */
var addOrChangeArm = function addOrChangeArm(type) {
    (0, _Config.read)();
    var dialogName = 'pd' + (type === 1 ? 'Add' : 'Change') + 'ArmDialog';
    var $dialog = $('#' + dialogName).parent();
    if ($dialog.length > 0 && type === 1) {
        $dialog.fadeIn('fast');
        Dialog.resize(dialogName);
    } else {
        var $wait = Msg.wait('<strong>正在获取装备信息&hellip;</strong>');
        $.ajax({
            type: 'GET',
            url: 'kf_fw_ig_mybp.php?t=' + $.now(),
            timeout: _Const2.default.defAjaxTimeout
        }).done(function (html) {
            Msg.remove($wait);
            var matches = /<tr><td width="\d+%">装备.+?\r\n(<tr.+?<\/tr>)<tr><td colspan="4">/.exec(html);
            if (matches) {
                showAddOrChangeArmDialog(type, matches[1]);
            }
        }).fail(function () {
            return Msg.remove($wait);
        });
    }
};

/**
 * 显示加入或更换装备对话框
 * @param {number} type 类型，0：更换装备；1：加入装备
 * @param {string} armHtml 装备的HTML代码
 */
var showAddOrChangeArmDialog = function showAddOrChangeArmDialog(type, armHtml) {
    var dialogName = 'pd' + (type === 1 ? 'Add' : 'Change') + 'ArmDialog';
    if ($('#' + dialogName).length > 0) return;

    var html = '\n<div class="pd_cfg_main" style="padding: 0;">\n  <table class="kf_fw_ig4" data-name="armList" cellspacing="0" cellpadding="0" align="center" style="width: 800px;">\n    <tbody>\n      <tr hidden><td colspan="3" class="kf_fw_ig_title1">\u6211\u7684\u88C5\u5907\u80CC\u5305</td></tr>\n      <tr><td width="10%">\u88C5\u5907</td><td width="10%">\u7194\u70BC</td><td width="80%">\u540D\u79F0</td></tr>\n      ' + armHtml + '\n      <tr><td colspan="3"><span style="color:#00f;">\u4E0D\u663E\u793A\u8D85\u8FC710\u4EF6\u4EE5\u4E0A\u7684\u7269\u54C1\uFF0C\u5982\u7269\u54C1\u8D85\u8FC710\u4EF6\uFF0C\u8BF7\u7194\u70BC\u6389\u591A\u4F59\u7684\u5373\u53EF\u5168\u90E8\u663E\u793A\u3002</span></td></tr>\n    </tbody>\n  </table>\n</div>\n<div class="pd_cfg_btns">\n  ' + (type === 0 ? '<button name="manualInputArmId" type="button" title="手动输入装备ID">手动输入ID</button>' : '') + '\n  <button data-action="close" type="button">\u5173\u95ED</button>\n</div>';
    var $dialog = Dialog.create(dialogName, (type === 1 ? '加入' : '更换') + '\u88C5\u5907', html, 'min-width: 820px; z-index: 1003;');
    var $armArea = $dialog.find('.kf_fw_ig4[data-name="armList"]');

    Item.addCommonArmsButton($dialog.find('.pd_cfg_btns'), $armArea);
    if (type === 1) {
        $dialog.off('click', '[data-action="close"]').on('click', '[data-action="close"]', function () {
            $dialog.fadeOut('fast');
        });
    } else {
        $dialog.find('[name="manualInputArmId"]').click(function () {
            var value = $.trim(prompt('请输入装备ID（多个ID用空格分隔）：'));
            if (!value) return;
            var armIdList = value.split(' ');
            var $wait = Msg.wait('<strong>正在装备中&hellip;</strong>');
            $(document).clearQueue('ChangeArms');
            $.each(armIdList, function (i, armId) {
                if (!armId) return;
                $(document).queue('ChangeArms', function () {
                    $.post('kf_fw_ig_mybpdt.php', 'do=4&id=' + armId + '&safeid=' + safeId, function (html) {
                        var msg = Util.removeHtmlTag(html);
                        if (/装备完毕/.test(msg)) {
                            if (Config.autoSaveArmsInfoEnabled) {
                                var armsInfo = Item.readArmsInfo();
                                armsInfo['已装备武器'] = armsInfo['已装备护甲'] = 0;
                                Item.writeArmsInfo(armsInfo);
                            }
                        } else {
                            Msg.remove($wait);
                            alert(msg);
                        }
                    }).fail(function () {
                        $(document).clearQueue('ChangeArms');
                        Msg.remove($wait);
                        alert('连接超时');
                    }).always(function () {
                        if (!$(document).queue('ChangeArms').length) {
                            updateLootInfo(function () {
                                Msg.remove($wait);
                                Dialog.close(dialogName);
                                $('.pd_arm_input').val('');
                            });
                        } else {
                            setTimeout(function () {
                                return $(document).dequeue('ChangeArms');
                            }, _Const2.default.minActionInterval);
                        }
                    });
                });
            });
            $(document).dequeue('ChangeArms');
        });
    }

    if (Config.autoSaveArmsInfoEnabled) {
        Item.addSavedArmsInfo($armArea);
    }
    Item.handleArmArea($armArea, type);
    Item.bindArmLinkClickEvent($armArea, safeId, 1);

    Dialog.show(dialogName);
    Script.runFunc('Item.show' + (type === 1 ? 'Add' : 'Change') + 'ArmDialog_after_');
};

/**
 * 获取各层争夺记录列表
 * @param log 争夺记录
 * @returns {string[]} 各层争夺记录列表
 */
var getLogList = exports.getLogList = function getLogList(log) {
    var logList = [];
    var matches = log.match(/<li class="pk_log_j">.+?(?=\s*<li class="pk_log_j">|\s*$)/g);
    for (var i in matches) {
        var levelMatches = /在\[\s*(\d+)\s*层]/.exec(Util.removeHtmlTag(matches[i]));
        if (levelMatches) logList[parseInt(levelMatches[1])] = matches[i];
    }
    return logList;
};

/**
 * 获取该层的战斗信息
 * @param {string} levelLog 该层的争夺记录
 * @returns {{enemy: string, life: number, initLife: number, box: string}} enemy：遭遇敌人名称；life：该层剩余生命值；initLife：该层初始生命值；box：盒子名称
 */
var getLevelInfo = exports.getLevelInfo = function getLevelInfo(levelLog) {
    var info = { enemy: '', life: 0, initLife: 0, box: '' };
    if (!levelLog) return info;
    levelLog = Util.removeHtmlTag(levelLog.replace(/<\/li>/g, '</li>\n'));

    var matches = /你\((\d+)\)遭遇了\[([^\]]+)的]NPC/.exec(levelLog);
    if (matches) {
        info.initLife = parseInt(matches[1]);
        info.enemy = matches[2];
        info.enemy = info.enemy.replace('特别', '').replace('(后续更新前此路不通)', '');
    }

    matches = /生命值\[(\d+)\s*\/\s*\d+]/.exec(levelLog);
    if (matches) info.life = parseInt(matches[1]);

    matches = /敌人掉落了一个\s*\[\s*(\S+?盒子)\s*]/.exec(levelLog);
    if (matches) info.box = matches[1];

    return info;
};

/**
 * 获取各层战斗信息列表
 * @param {string[]} logList 各层争夺记录列表
 * @returns {{}[]} 各层战斗信息列表
 */
var getLevelInfoList = exports.getLevelInfoList = function getLevelInfoList(logList) {
    var levelInfoList = [];
    $.each(logList, function (level, levelLog) {
        if (!levelLog) return;
        levelInfoList[level] = getLevelInfo(levelLog);
    });
    return levelInfoList;
};

/**
 * 获取当前层数
 * @param {string[]} logList 各层争夺记录列表
 * @returns {number} 当前层数
 */
var getCurrentLevel = function getCurrentLevel(logList) {
    return logList.length - 1 >= 1 ? logList.length - 1 : 0;
};

/**
 * 在争夺排行页面添加用户链接
 */
var addUserLinkInPkListPage = exports.addUserLinkInPkListPage = function addUserLinkInPkListPage() {
    $('.kf_fw_ig1 > tbody > tr:gt(1) > td:nth-child(2)').each(function () {
        var $this = $(this);
        var userName = $this.text().trim();
        $this.html('<a class="' + (!Config.adminMemberEnabled ? 'pd_not_click_link' : '') + '" href="profile.php?action=show&username=' + userName + '" target="_blank">' + userName + '</a>');
        if (userName === _Info2.default.userName) $this.find('a').addClass('pd_highlight');
    });
};

/**
 * 在战力光环排行上添加用户链接
 */
var addUserLinkInHaloPage = exports.addUserLinkInHaloPage = function addUserLinkInHaloPage() {
    $('.kf_fw_ig1:eq(1) > tbody > tr:gt(1) > td:nth-child(2)').each(function () {
        var $this = $(this);
        var userName = $this.text().trim();
        $this.html('<a class="' + (!Config.adminMemberEnabled ? 'pd_not_click_link' : '') + '" href="profile.php?action=show&username=' + userName + '" target="_blank">' + userName + '</a>');
        if (userName === _Info2.default.userName) $this.find('a').addClass('pd_highlight');
    });
};

/**
 * 读取战力光环页面信息
 * @param {boolean} isInitLootPage 是否初始化争夺首页
 */
var readHaloInfo = function readHaloInfo() {
    var isInitLootPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    console.log('获取战力光环信息Start');
    var $wait = Msg.wait('<strong>正在获取战力光环信息，请稍候&hellip;</strong>');
    getHaloInfo().done(function (result) {
        if ($.type(result) === 'object') {
            setHaloInfo(result);
            if (isInitLootPage) enhanceLootIndexPage();else $points.find('.pd_point').trigger('change');
        }
    }).always(function (result) {
        Msg.remove($wait);
        if (result === 'timeout') {
            setTimeout(function () {
                return readHaloInfo(isInitLootPage);
            }, _Const2.default.defAjaxInterval);
        } else if (result === 'error') {
            Msg.show('<strong>战力光环信息获取失败！</strong>', -1);
        }
    });
};

/**
 * 获取战力光环信息
 * @returns {Deferred} Deferred对象
 */
var getHaloInfo = exports.getHaloInfo = function getHaloInfo() {
    return $.ajax({
        type: 'GET',
        url: 'kf_fw_ig_halo.php?t=' + $.now(),
        timeout: _Const2.default.defAjaxTimeout
    }).then(function (html) {
        var haloInfo = { '全属性': 0, '攻击力': 0, '生命值': 0 };
        var matches = /全属性\s*\+\s*(\d+(?:\.\d+)?)%/.exec(html);
        if (matches) {
            haloInfo['全属性'] = Math.round(parseFloat(matches[1]) * 10) / 1000;
            var extraMatches = /福利加成\s*\+\s*(\d+)攻击力\s*&\s*\+\s*(\d+)生命值/.exec(html);
            if (extraMatches) {
                haloInfo['攻击力'] = parseInt(extraMatches[1]);
                haloInfo['生命值'] = parseInt(extraMatches[2]);
            }
            TmpLog.setValue(_Const2.default.haloInfoTmpLogName, $.extend(haloInfo, { time: $.now() }));
            return haloInfo;
        } else return 'error';
    }, function () {
        return 'timeout';
    });
};

/**
 * 设置战力光环信息
 * @param {{}} newHaloInfo 光环信息对象
 */
var setHaloInfo = exports.setHaloInfo = function setHaloInfo(newHaloInfo) {
    haloInfo = newHaloInfo;
    if (!$('#pdHaloInfo').length) {
        var $node = $properties.find('input[type="text"]:eq(13)');
        if (!$node.length || $.trim($node.val())) return;
        $node.attr('id', 'pdHaloInfo');
        $('<a data-name="reloadHaloInfo" href="#" style="margin-left: -20px;" title="如战力光环信息不正确时，请点此重新读取">读</a>').insertAfter($node).click(function (e) {
            e.preventDefault();
            if (confirm('是否重新读取战力光环信息？')) {
                TmpLog.deleteValue(_Const2.default.haloInfoTmpLogName);
                readHaloInfo();
            }
        });
    }
    $('#pdHaloInfo').val('\u5168\u5C5E\u6027+' + Math.round(haloInfo['全属性'] * 1000) / 10 + '% (+' + haloInfo['攻击力'] + '|+' + haloInfo['生命值'] + ')');
};

/**
 * 获取战力光环页面信息
 */
var getPromoteHaloInfo = exports.getPromoteHaloInfo = function getPromoteHaloInfo() {
    Script.runFunc('Loot.getPromoteHaloInfo_before_');
    console.log('获取战力光环页面信息Start');
    var $wait = Msg.wait('<strong>正在获取战力光环信息，请稍候&hellip;</strong>');

    /**
     * 写入Cookie
     * @param {string} value 指定（相对）时间量
     * @returns {boolean} 返回false
     */
    var setCookie = function setCookie(value) {
        var nextTime = Util.getDate(value);
        Util.setCookie(_Const2.default.promoteHaloCookieName, nextTime.getTime(), nextTime);
        $(document).dequeue('AutoAction');
        return false;
    };

    /**
     * 获取个人信息
     */
    var getPersonalInfo = function getPersonalInfo() {
        $.ajax({
            type: 'GET',
            url: 'profile.php?action=show&uid=' + _Info2.default.uid + '&t=' + $.now(),
            timeout: _Const2.default.defAjaxTimeout
        }).done(function (html) {
            Msg.remove($wait);
            var regex = Config.promoteHaloCostType >= 11 ? /贡献数值：(\d+(?:\.\d+)?)/ : /论坛货币：(-?\d+)\s*KFB/;
            var matches = regex.exec(html);
            if (!matches) return setCookie('+' + _Const2.default.promoteHaloLimitNextActionInterval + 'm');
            var currency = parseFloat(matches[1]);
            if (currency > Config.promoteHaloLimit) {
                var _getPromoteHaloCostBy = getPromoteHaloCostByTypeId(Config.promoteHaloCostType),
                    num = _getPromoteHaloCostBy.num;

                var maxCount = Math.floor((currency - Config.promoteHaloLimit) / num);
                if (maxCount > 0) {
                    $wait = Msg.wait('<strong>正在获取战力光环信息，请稍候&hellip;</strong>');
                    getHaloInfo(maxCount);
                } else return setCookie('+' + _Const2.default.promoteHaloLimitNextActionInterval + 'm');
            } else return setCookie('+' + _Const2.default.promoteHaloLimitNextActionInterval + 'm');
        }).fail(function () {
            return setTimeout(getPersonalInfo, _Const2.default.defAjaxInterval);
        });
    };

    /**
     * 获取光环信息
     * @param {number} maxCount 最大提升战力光环次数（设为-1表示不限制）
     */
    var getHaloInfo = function getHaloInfo() {
        var maxCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

        $.ajax({
            type: 'GET',
            url: 'kf_fw_ig_halo.php?t=' + $.now(),
            timeout: _Const2.default.defAjaxTimeout
        }).done(function (html) {
            Msg.remove($wait);

            var safeIdMatches = /safeid=(\w+)"/.exec(html);
            if (!safeIdMatches) return setCookie('+1h');
            var safeId = safeIdMatches[1];

            var surplusMatches = /下次随机还需\[(\d+)]分钟/.exec(html);
            if (surplusMatches) {
                var promoteHaloInterval = Config.promoteHaloAutoIntervalEnabled ? _Const2.default.minPromoteHaloInterval : Config.promoteHaloInterval * 60;
                promoteHaloInterval = promoteHaloInterval < _Const2.default.minPromoteHaloInterval ? _Const2.default.minPromoteHaloInterval : promoteHaloInterval;
                return setCookie('+' + (promoteHaloInterval - (_Const2.default.minPromoteHaloInterval - parseInt(surplusMatches[1]))) + 'm');
            }

            var totalCount = 1;
            var countMatches = /当前光环随机可用\[(\d+)]次/.exec(html);
            if (Config.promoteHaloAutoIntervalEnabled && countMatches) {
                totalCount = parseInt(countMatches[1]);
                if (maxCount > -1) totalCount = totalCount > maxCount ? maxCount : totalCount;
            }

            promoteHalo(totalCount, Config.promoteHaloCostType, safeId);
        }).fail(function () {
            Msg.remove($wait);
            setTimeout(getPromoteHaloInfo, _Const2.default.defAjaxInterval);
        });
    };

    if (Config.promoteHaloLimit > 0) getPersonalInfo();else getHaloInfo();
};

/**
 * 提升战力光环
 * @param {number} totalCount 提升战力光环总次数
 * @param {number} promoteHaloCostType 自动提升战力光环的花费类型，参见{@link Config.promoteHaloCostType}
 * @param {string} safeId SafeID
 */
var promoteHalo = exports.promoteHalo = function promoteHalo(totalCount, promoteHaloCostType, safeId) {
    console.log('提升战力光环Start');
    var $wait = Msg.wait('<strong>\u6B63\u5728\u63D0\u5347\u6218\u529B\u5149\u73AF&hellip;</strong><i>\u5269\u4F59\uFF1A<em class="pd_countdown">' + totalCount + '</em></i><a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
    TmpLog.deleteValue(_Const2.default.haloInfoTmpLogName);
    var isStop = false;
    var index = 0;
    var nextTime = Util.getDate('+10m').getTime();

    /**
     * 提升
     */
    var promote = function promote() {
        $.ajax({
            type: 'GET',
            url: 'kf_fw_ig_halo.php?do=buy&id=' + promoteHaloCostType + '&safeid=' + safeId + '&t=' + $.now(),
            timeout: _Const2.default.defAjaxTimeout
        }).done(function (html) {
            Public.showFormatLog('提升战力光环', html);

            var _Util$getResponseMsg2 = Util.getResponseMsg(html),
                msg = _Util$getResponseMsg2.msg;

            var matches = /(新数值为|随机值为)\[(\d+(?:\.\d+)?)%]/.exec(msg);
            if (matches) {
                var isNew = matches[1] === '新数值为';

                nextTime = Config.promoteHaloAutoIntervalEnabled ? 0 : Util.getDate('+' + Config.promoteHaloInterval + 'h').getTime();
                var randomNum = parseFloat(matches[2]);
                var costResult = getPromoteHaloCostByTypeId(promoteHaloCostType);
                Msg.show('<strong>' + (isNew ? '\u606D\u559C\u4F60\u63D0\u5347\u4E86\u5149\u73AF\u7684\u6548\u679C\uFF01\u65B0\u6570\u503C\u4E3A\u3010<em>' + randomNum + '%</em>\u3011' : '\u4F60\u672C\u6B21\u968F\u673A\u503C\u4E3A\u3010<em>' + randomNum + '%</em>\u3011\uFF0C\u672A\u8D85\u8FC7\u5149\u73AF\u6548\u679C') + ('</strong><i>' + costResult.type + '<ins>' + (-costResult.num).toLocaleString() + '</ins></i>'));

                var pay = {};
                pay[costResult.type] = -costResult.num;
                Log.push('提升战力光环', isNew ? '\u606D\u559C\u4F60\u63D0\u5347\u4E86\u5149\u73AF\u7684\u6548\u679C\uFF01\u65B0\u6570\u503C\u4E3A\u3010`' + randomNum + '%`\u3011' : '\u4F60\u672C\u6B21\u968F\u673A\u503C\u4E3A\u3010`' + randomNum + '%`\u3011\uFF0C\u672A\u8D85\u8FC7\u5149\u73AF\u6548\u679C', { pay: pay });
                index++;
            } else {
                if (/两次操作间隔过短/.test(msg)) nextTime = Util.getDate('+10s').getTime();else isStop = true;

                matches = /你的(贡献点数|KFB)不足/.exec(msg);
                if (matches) {
                    nextTime = Util.getDate('+' + Config.promoteHaloInterval + 'h').getTime();
                    Msg.show('<strong>' + matches[1] + '\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u63D0\u5347\u6218\u529B\u5149\u73AF</strong><a href="kf_fw_ig_halo.php" target="_blank">\u624B\u52A8\u9009\u62E9</a>', -1);
                }

                matches = /你还需要等待(\d+)分钟/.exec(msg);
                if (matches) {
                    var promoteHaloInterval = Config.promoteHaloInterval * 60;
                    promoteHaloInterval = promoteHaloInterval < _Const2.default.minPromoteHaloInterval ? _Const2.default.minPromoteHaloInterval : promoteHaloInterval;
                    nextTime = Util.getDate('+' + (Config.promoteHaloInterval * 60 - (_Const2.default.minPromoteHaloInterval - parseInt(matches[1]))) + 'm').getTime();
                }
            }
        }).always(function () {
            $wait.find('.pd_countdown').text(totalCount - index);
            isStop = isStop || $wait.data('stop');
            if (isStop || index === totalCount) {
                Msg.remove($wait);
                if (nextTime > 0 || isStop) {
                    Util.setCookie(_Const2.default.promoteHaloCookieName, nextTime, new Date(nextTime));
                    setTimeout(function () {
                        return $(document).dequeue('AutoAction');
                    }, _Const2.default.minActionInterval);
                } else {
                    Util.deleteCookie(_Const2.default.promoteHaloCookieName);
                    getPromoteHaloInfo();
                }
                Script.runFunc('Loot.promoteHalo_after_');
            } else {
                setTimeout(promote, _Const2.default.promoteHaloActionInterval);
            }
        });
    };

    promote();
};

/**
 * 通过获取类型ID获取提升战力光环花费
 * @param {number} id 提升战力光环的类型ID
 * @returns {{type: string, num: number}} type：花费类型；num：花费数额
 */
var getPromoteHaloCostByTypeId = exports.getPromoteHaloCostByTypeId = function getPromoteHaloCostByTypeId(id) {
    switch (id) {
        case 1:
            return { type: 'KFB', num: 100 };
        case 2:
            return { type: 'KFB', num: 1000 };
        case 11:
            return { type: '贡献', num: 0.2 };
        case 12:
            return { type: '贡献', num: 2 };
        default:
            return { type: 'KFB', num: 0 };
    }
};

},{"./Config":3,"./Const":5,"./Dialog":6,"./Info":8,"./Item":9,"./Log":10,"./Msg":13,"./Public":16,"./Script":18,"./TmpLog":20,"./Util":21}],13:[function(require,module,exports){
/* 消息模块 */
'use strict';

/**
 * 显示消息
 * @param {string|Object} options 消息或设置对象
 * @param {string} [options.msg] 消息
 * @param {number} [options.duration={@link Config.defShowMsgDuration}] 消息显示时间（秒），-1为永久显示
 * @param {boolean} [options.clickable=true] 消息框可否手动点击消除
 * @param {boolean} [options.preventable=false] 是否阻止点击网页上的其它元素
 * @param {number} [duration] 消息显示时间（秒），-1为永久显示
 * @example
 * show('<strong>抽取道具或卡片</strong><i>道具<em>+1</em></i>', -1);
 * show({msg: '<strong>抽取神秘盒子</strong><i>KFB<em>+8</em></i>', duration: 20, clickable: false});
 * @returns {jQuery} 消息框对象
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var show = exports.show = function show(options, duration) {
    var settings = {
        msg: '',
        duration: Config.defShowMsgDuration,
        clickable: true,
        preventable: false
    };
    if ($.type(options) === 'object') {
        $.extend(settings, options);
    } else {
        settings.msg = options;
        settings.duration = typeof duration === 'undefined' ? Config.defShowMsgDuration : duration;
    }

    if ($('.pd_msg').length > 20) destroy();
    var $container = $('.pd_msg_container');
    var isFirst = $container.length === 0;
    if (!isFirst && !$('.pd_mask').length) {
        var $lastTips = $('.pd_msg:last');
        if ($lastTips.length > 0) {
            var top = $lastTips.offset().top;
            var winScrollTop = $(window).scrollTop();
            if (top < winScrollTop || top >= winScrollTop + $(window).height() - $lastTips.outerHeight() - 10) {
                destroy();
                isFirst = true;
            }
        }
    }
    if (settings.preventable && !$('.pd_mask').length) {
        $('<div class="pd_mask"></div>').appendTo('body');
    }
    if (isFirst) {
        $container = $('<div class="pd_msg_container"></div>').appendTo('body');
    }

    var $msg = $('<div class="pd_msg">' + settings.msg + '</div>').appendTo($container);
    $msg.on('click', '.pd_stop_action', function (e) {
        e.preventDefault();
        $(this).html('正在停止&hellip;').closest('.pd_msg').data('stop', true);
    });
    if (settings.clickable) {
        $msg.css('cursor', 'pointer').click(function () {
            $(this).stop(true, true).fadeOut('slow', function () {
                remove($(this));
            });
        }).find('a').click(function (e) {
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
        $container.css('top', $(window).height() / 2 - popTipsHeight / 2);
    } else {
        $container.stop(false, true).animate({ 'top': '-=' + popTipsHeight / 1.75 });
    }
    $(':focus').blur();
    var $prev = $msg.prev('.pd_msg');
    $msg.css({
        'top': $prev.length > 0 ? parseInt($prev.css('top')) + $prev.outerHeight() + 5 : 0,
        left: left
    }).fadeIn('slow');
    if (settings.duration !== -1) {
        $msg.delay(settings.duration * 1000).fadeOut('slow', function () {
            remove($(this));
        });
    }
    return $msg;
};

/**
 * 显示等待消息
 * @param {string} msg 等待消息
 * @param {boolean} preventable 是否阻止点击网页上的其它元素
 * @returns {jQuery} 消息框对象
 */
var wait = exports.wait = function wait(msg) {
    var preventable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    return show({ msg: msg, duration: -1, clickable: false, preventable: preventable });
};

/**
 * 移除指定消息框
 * @param {jQuery} $msg 消息框对象
 */
var remove = exports.remove = function remove($msg) {
    var $parent = $msg.parent();
    $msg.remove();
    if (!$('.pd_msg').length) {
        $parent.remove();
        $('.pd_mask').remove();
    } else if (!$('.pd_countdown').length) {
        $('.pd_mask').remove();
    }
};

/**
 * 销毁所有消息框
 */
var destroy = exports.destroy = function destroy() {
    $('.pd_msg_container').remove();
    $('.pd_mask').remove();
};

},{}],14:[function(require,module,exports){
/* 其它模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addGuanJianCiUserNameLink = exports.handleProfilePage = exports.addUserNameLinkInRankPage = exports.addAvatarChangeAlert = exports.syncModifyPerPageFloorNum = exports.addAutoChangeIdColorButton = exports.addMsgSelectButton = exports.modifyMyPostLink = exports.addFollowAndBlockAndMemoUserLink = exports.addFastDrawMoneyLink = exports.highlightUnReadAtTipsMsg = exports.addFastGotoThreadPageLink = exports.highlightNewPost = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Msg = require('./Msg');

var Msg = _interopRequireWildcard(_Msg);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Config = require('./Config');

var _ConfigDialog = require('./ConfigDialog');

var _TmpLog = require('./TmpLog');

var TmpLog = _interopRequireWildcard(_TmpLog);

var _Public = require('./Public');

var Public = _interopRequireWildcard(_Public);

var _Bank = require('./Bank');

var Bank = _interopRequireWildcard(_Bank);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 高亮今日新发表帖子的发表时间
 */
var highlightNewPost = exports.highlightNewPost = function highlightNewPost() {
    $('.thread1 > tbody > tr > td:last-child').has('a.bl').each(function () {
        var html = $(this).html();
        if (/\|\s*\d{2}:\d{2}<br>\n.*\d{2}:\d{2}/.test(html)) {
            html = html.replace(/(\d{2}:\d{2})<br>/, '<span class="pd_highlight">$1</span><br>');
            $(this).html(html);
        }
    });
};

/**
 * 在版块页面中添加帖子页数快捷链接
 */
var addFastGotoThreadPageLink = exports.addFastGotoThreadPageLink = function addFastGotoThreadPageLink() {
    $('.threadtit1 > a[href^="read.php"]').each(function () {
        var $link = $(this);
        var floorNum = $link.closest('td').next().find('ul > li > a').contents().eq(0).text();
        if (!floorNum || floorNum < Config.perPageFloorNum) return;
        var url = $link.attr('href');
        var totalPageNum = Math.floor(floorNum / Config.perPageFloorNum) + 1;
        var html = '';
        for (var i = 1; i < totalPageNum; i++) {
            if (i > Config.maxFastGotoThreadPageNum) {
                if (i + 1 <= totalPageNum) {
                    html += '..<a href="' + url + '&page=' + totalPageNum + '">' + totalPageNum + '</a>';
                }
                break;
            }
            html += '<a href="' + url + '&page=' + (i + 1) + '">' + (i + 1) + '</a>';
        }
        html = '<span class="pd_thread_page">&hellip;' + html + '</span>';
        $link.after(html).parent().css('white-space', 'normal');
    });
};

/**
 * 高亮at提醒页面中未读的消息
 */
var highlightUnReadAtTipsMsg = exports.highlightUnReadAtTipsMsg = function highlightUnReadAtTipsMsg() {
    if ($('.kf_share1:first').text().trim() !== '\u542B\u6709\u5173\u952E\u8BCD \u201C' + _Info2.default.userName + '\u201D \u7684\u5185\u5BB9') return;
    var timeString = Util.getCookie(_Const2.default.prevReadAtTipsCookieName);
    if (!timeString || !/^\d+日\d+时\d+分$/.test(timeString)) return;
    var prevString = '';
    $('.kf_share1:eq(1) > tbody > tr:gt(0) > td:first-child').each(function (index) {
        var $this = $(this);
        var curString = $this.text().trim();
        if (index === 0) prevString = curString;
        if (timeString < curString && prevString >= curString) {
            $this.addClass('pd_highlight');
            prevString = curString;
        } else return false;
    });
    $('.kf_share1').on('click', 'td > a', function () {
        Util.deleteCookie(_Const2.default.prevReadAtTipsCookieName);
    });
};

/**
 * 在短消息页面中添加快速取款的链接
 */
var addFastDrawMoneyLink = exports.addFastDrawMoneyLink = function addFastDrawMoneyLink() {
    if (!$('td:contains("SYSTEM")').length || !$('td:contains("收到了他人转账的贡献")').length) return;
    var $msg = $('.thread2 > tbody > tr:eq(-2) > td:last');
    var html = $msg.html();
    var matches = /给你转帐(\d+(?:\.\d+)?)贡献/.exec(html);
    if (matches) {
        var gongXian = parseFloat(matches[1]);
        $msg.html(html.replace(/会员\[(.+?)\]通过论坛银行/, '\u4F1A\u5458[<a class="' + (!Config.adminMemberEnabled ? 'pd_not_click_link' : '') + '" target="_blank" href="profile.php?action=show&username=$1">$1</a>]\u901A\u8FC7\u8BBA\u575B\u94F6\u884C').replace(matches[0], '\u7ED9\u4F60\u8F6C\u5E10<span class="pd_stat"><em>' + gongXian.toLocaleString() + '</em></span>\u8D21\u732E'));

        $('a[href^="message.php?action=write&remid="]').attr('href', '#').addClass('pd_disabled_link').click(function (e) {
            e.preventDefault();
            alert('本短消息由系统发送，请勿直接回复；如需回复，请点击给你转账的用户链接，向其发送短消息');
        });
    }
};

/**
 * 添加关注和屏蔽用户以及用户备注的链接
 */
var addFollowAndBlockAndMemoUserLink = exports.addFollowAndBlockAndMemoUserLink = function addFollowAndBlockAndMemoUserLink() {
    var matches = /(.+?)\s*详细信息/.exec($('td:contains("详细信息")').text());
    if (!matches) return;
    var userName = $.trim(matches[1]);
    $('<span>[<a href="#">关注用户</a>] [<a href="#">屏蔽用户</a>]</span><br><span>[<a href="#">添加备注</a>]</span><br>').appendTo($('a[href^="message.php?action=write&touid="]').parent()).find('a').each(function () {
        var $this = $(this);
        if ($this.is('a:contains("备注")')) {
            var str = '';
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Util.entries(Config.userMemoList)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2),
                        name = _step$value[0],
                        memo = _step$value[1];

                    if (name === userName) {
                        str = memo;
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (str !== '') {
                $this.text('修改备注').data('memo', str);
                var $info = $('.log1 > tbody > tr:last-child > td:last-child');
                $info.html('\u5907\u6CE8\uFF1A' + str + '<br>' + $info.html());
            }
        } else {
            var _str = '关注';
            var userList = Config.followUserList;
            if ($this.text().indexOf('屏蔽') > -1) {
                _str = '屏蔽';
                userList = Config.blockUserList;
            }
            if (Util.inFollowOrBlockUserList(userName, userList) > -1) {
                $this.addClass('pd_highlight').text('解除' + _str);
            }
        }
    }).click(function (e) {
        e.preventDefault();
        (0, _Config.read)();
        var $this = $(this);
        if ($this.is('a:contains("备注")')) {
            var memo = $this.data('memo');
            if (!memo) memo = '';
            var value = prompt('为此用户添加备注（要删除备注请留空）：', memo);
            if (value === null) return;
            if (!Config.userMemoEnabled) Config.userMemoEnabled = true;
            value = $.trim(value);
            if (value) {
                Config.userMemoList[userName] = value;
                $this.text('修改备注');
            } else {
                delete Config.userMemoList[userName];
                $this.text('添加备注');
            }
            $this.data('memo', value);
            (0, _Config.write)();
        } else {
            var str = '关注';
            var userList = Config.followUserList;
            if ($this.text().includes('屏蔽')) {
                str = '屏蔽';
                userList = Config.blockUserList;
                if (!Config.blockUserEnabled) Config.blockUserEnabled = true;
            } else {
                if (!Config.followUserEnabled) Config.followUserEnabled = true;
            }
            if ($this.text() === '解除' + str) {
                var index = Util.inFollowOrBlockUserList(userName, userList);
                if (index > -1) {
                    userList.splice(index, 1);
                    (0, _Config.write)();
                }
                $this.removeClass('pd_highlight').text(str + '用户');
                alert('该用户已被解除' + str);
            } else {
                if (Util.inFollowOrBlockUserList(userName, userList) === -1) {
                    if (str === '屏蔽') {
                        var type = Config.blockUserDefaultType;
                        type = prompt('请填写屏蔽类型，0：屏蔽主题和回帖；1：仅屏蔽主题；2：仅屏蔽回帖', type);
                        if (type === null) return;
                        type = parseInt(type);
                        if (isNaN(type) || type < 0 || type > 2) type = Config.blockUserDefaultType;
                        userList.push({ name: userName, type: type });
                    } else {
                        userList.push({ name: userName });
                    }
                    (0, _Config.write)();
                }
                $this.addClass('pd_highlight').text('解除' + str);
                alert('该用户已被' + str);
            }
        }
    });
};

/**
 * 修改我的回复页面里的帖子链接
 */
var modifyMyPostLink = exports.modifyMyPostLink = function modifyMyPostLink() {
    $('.t a[href^="read.php?tid="]').each(function () {
        var $this = $(this);
        $this.attr('href', $this.attr('href').replace(/&uid=\d+#(\d+)/, '&spid=$1'));
    });
};

/**
 * 在短消息页面添加选择指定短消息的按钮
 */
var addMsgSelectButton = exports.addMsgSelectButton = function addMsgSelectButton() {
    var $checkeds = $('.thread1 > tbody > tr > td:last-child > [type="checkbox"]');
    $('<input value="自定义" type="button" style="margin-right: 3px;">').insertBefore('[type="button"][value="全选"]').click(function (e) {
        e.preventDefault();
        var value = $.trim(prompt('请填写所要选择的包含指定字符串的短消息标题（可用|符号分隔多个标题）', '收到了他人转账的贡献|收到了他人转账的KFB|银行汇款通知|您的文章被评分|您的文章被删除'));
        if (value !== '') {
            $checkeds.prop('checked', false);
            var titleArr = value.split('|');
            $('.thread1 > tbody > tr > td:nth-child(2) > a').each(function () {
                var $this = $(this);
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = titleArr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var title = _step2.value;

                        if ($this.text().toLowerCase().includes(title.toLowerCase())) {
                            $this.closest('tr').find('td:last-child > input[type="checkbox"]').prop('checked', true);
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            });
        }
    }).parent().attr('colspan', 4).prev('td').attr('colspan', 3);

    $('<input value="反选" type="button" style="margin-left: 5px; margin-right: 1px;">').insertAfter('[type="button"][value="全选"]').click(function () {
        return Util.selectInverse($checkeds);
    });
};
/**
 * 添加自动更换ID颜色的按钮
 */
var addAutoChangeIdColorButton = exports.addAutoChangeIdColorButton = function addAutoChangeIdColorButton() {
    var $autoChangeIdColor = $('table div > table > tbody > tr > td:contains("自定义ID颜色")');
    $('<span class="pd_highlight">低等级没人权？没有自己喜欢的颜色？快来试试助手的<a href="#">自定义本人神秘颜色</a>的功能吧！（虽然仅限自己可见 ╮(╯▽╰)╭）</span><br>').appendTo($autoChangeIdColor).find('a').click(function (e) {
        e.preventDefault();
        (0, _ConfigDialog.show)();
    });

    var $idColors = $autoChangeIdColor.parent('tr').nextAll('tr').not('tr:last');
    if ($idColors.find('a').length <= 1) return;
    var $area = $('\n<form>\n<div data-name="autoChangeIdColorBtns" style="margin-top: 5px;">\n  <label><input name="autoChangeIdColorEnabled" class="pd_input" type="checkbox"> \u81EA\u52A8\u66F4\u6362ID\u989C\u8272</label>\n</div>\n</form>\n').appendTo($autoChangeIdColor);
    $area.find('[name="autoChangeIdColorEnabled"]').click(function () {
        var $this = $(this);
        var enabled = $this.prop('checked');
        if (enabled !== Config.autoChangeIdColorEnabled) {
            (0, _Config.read)();
            Config.autoChangeIdColorEnabled = enabled;
            (0, _Config.write)();
        }

        if (enabled) {
            $idColors.addClass('pd_id_color_select').find('td:not(:has(a))').css('cursor', 'not-allowed');
            $('\n<label class="pd_cfg_ml">\n  \u66F4\u6362\u987A\u5E8F\n  <select name="autoChangeIdColorType" style="font-size: 12px;">\n    <option value="random">\u968F\u673A</option><option value="sequence">\u987A\u5E8F</option>\n  </select>\n</label>&nbsp;\n<label>\u6BCF\u9694 <input name="autoChangeIdColorInterval" class="pd_input" style="width: 25px;" type="text" maxlength="5"> \u5C0F\u65F6</label>\n<button name="save" type="button">\u4FDD\u5B58</button>\n<button name="reset" type="button" style="margin-left: 3px;">\u91CD\u7F6E</button><br>\n<a class="pd_btn_link" data-name="selectAll" href="#">\u5168\u9009</a>\n<a class="pd_btn_link" data-name="selectInverse" href="#">\u53CD\u9009</a>\n<label><input name="changeAllAvailableIdColorEnabled" class="pd_input" type="checkbox"> \u9009\u62E9\u5F53\u524D\u6240\u6709\u53EF\u7528\u7684ID\u989C\u8272</label>\n').insertAfter($this.parent()).filter('[name="save"]').click(function () {
                var $autoChangeIdColorInterval = $area.find('[name="autoChangeIdColorInterval"]');
                var interval = parseInt($autoChangeIdColorInterval.val());
                if (isNaN(interval) || interval <= 0) {
                    alert('ID颜色更换时间间隔格式不正确');
                    $autoChangeIdColorInterval.select().focus();
                    return;
                }
                var changeAllAvailableSMColorEnabled = $area.find('[name="changeAllAvailableIdColorEnabled"]').prop('checked');
                var customChangeSMColorList = [];
                $idColors.find('[type="checkbox"]:checked').each(function () {
                    customChangeSMColorList.push(parseInt($(this).val()));
                });
                if (!changeAllAvailableSMColorEnabled && customChangeSMColorList.length <= 1) {
                    alert('必须选择2种或以上的ID颜色');
                    return;
                }
                if (customChangeSMColorList.length <= 1) customChangeSMColorList = [];

                var oriInterval = Config.autoChangeIdColorInterval;
                (0, _Config.read)();
                Config.autoChangeIdColorType = $area.find('[name="autoChangeIdColorType"]').val().toLowerCase();
                Config.autoChangeIdColorInterval = interval;
                Config.changeAllAvailableIdColorEnabled = changeAllAvailableSMColorEnabled;
                Config.customAutoChangeIdColorList = customChangeSMColorList;
                (0, _Config.write)();
                if (oriInterval !== Config.autoChangeIdColorInterval) Util.deleteCookie(_Const2.default.autoChangeIdColorCookieName);
                alert('设置保存成功');
            }).end().filter('[name="reset"]').click(function () {
                (0, _Config.read)();
                Config.autoChangeIdColorEnabled = _Config.Config.autoChangeIdColorEnabled;
                Config.autoChangeIdColorType = _Config.Config.autoChangeIdColorType;
                Config.autoChangeIdColorInterval = _Config.Config.autoChangeIdColorInterval;
                Config.changeAllAvailableIdColorEnabled = _Config.Config.changeAllAvailableIdColorEnabled;
                Config.customAutoChangeIdColorList = _Config.Config.customAutoChangeIdColorList;
                (0, _Config.write)();
                Util.deleteCookie(_Const2.default.autoChangeIdColorCookieName);
                TmpLog.deleteValue(_Const2.default.prevAutoChangeIdColorTmpLogName);
                alert('设置已重置');
                location.reload();
            }).end().filter('[data-name="selectAll"], [data-name="selectInverse"]').click(function (e) {
                e.preventDefault();
                if ($idColors.find('input[disabled]').length > 0) {
                    alert('请先取消勾选“选择当前所有可用的ID颜色”复选框');
                    $area.find('[name="changeAllAvailableIdColorEnabled"]').focus();
                    return;
                }
                if ($(this).is('[data-name="selectAll"]')) Util.selectAll($idColors.find('[type="checkbox"]'));else Util.selectInverse($idColors.find('[type="checkbox"]'));
            });

            $idColors.find('td:has(a)').each(function () {
                var $this = $(this);
                var matches = /&color=(\d+)/i.exec($this.find('a').attr('href'));
                if (matches) $this.append('<input type="checkbox" class="pd_input" value="' + matches[1] + '">');
            });

            $area.find('[name="autoChangeIdColorType"]').val(Config.autoChangeIdColorType);
            $area.find('[name="autoChangeIdColorInterval"]').val(Config.autoChangeIdColorInterval);
            $area.find('[name="changeAllAvailableIdColorEnabled"]').click(function () {
                $idColors.find('input').prop('disabled', $(this).prop('checked'));
            }).prop('checked', Config.changeAllAvailableIdColorEnabled).triggerHandler('click');
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = Config.customAutoChangeIdColorList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var id = _step3.value;

                    $idColors.find('input[value="' + id + '"]').prop('checked', true);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        } else {
            $this.parent().nextAll().remove();
            $idColors.removeClass('pd_id_color_select').find('input').remove();
        }
    });

    $idColors.on('click', 'td', function (e) {
        if (!$(e.target).is('a')) {
            var $this = $(this);
            if ($this.find('input[disabled]').length > 0) {
                alert('请先取消勾选“选择当前所有可用的ID颜色”复选框');
                $area.find('[name="changeAllAvailableIdColorEnabled"]').focus();
            } else if (!$(e.target).is('input')) {
                $this.find('input').click();
            }
        }
    });

    if (Config.autoChangeIdColorEnabled) {
        $area.find('[name="autoChangeIdColorEnabled"]').prop('checked', true).triggerHandler('click');
    }
};

/**
 * 同步修改帖子每页楼层数量
 */
var syncModifyPerPageFloorNum = exports.syncModifyPerPageFloorNum = function syncModifyPerPageFloorNum() {
    var syncConfig = function syncConfig() {
        var perPageFloorNum = parseInt($('select[name="p_num"]').val());
        if (isNaN(perPageFloorNum)) return;
        if (!perPageFloorNum) perPageFloorNum = 20;
        if (perPageFloorNum !== Config.perPageFloorNum) {
            Config.perPageFloorNum = perPageFloorNum;
            (0, _Config.write)();
        }
    };
    $('form#creator').submit(function () {
        (0, _Config.read)();
        syncConfig();
    });
    syncConfig();
};

/**
 * 在设置页面添加更换头像提醒
 */
var addAvatarChangeAlert = exports.addAvatarChangeAlert = function addAvatarChangeAlert() {
    $('input[name="uploadurl[2]"]').parent().append('<div class="pd_highlight">本反向代理服务器为了提高性能对图片设置了缓存，更换头像后可能需等待<b>最多30分钟</b>才能看到效果</div>');
};

/**
 * 在论坛排行页面为用户名添加链接
 */
var addUserNameLinkInRankPage = exports.addUserNameLinkInRankPage = function addUserNameLinkInRankPage() {
    $('.kf_no11:eq(2) > tbody > tr:gt(0) > td:nth-child(2)').each(function () {
        var $this = $(this);
        var userName = $this.text().trim();
        $this.html('<a class="' + (!Config.adminMemberEnabled ? 'pd_not_click_link' : '') + '" href="profile.php?action=show&username=' + userName + '" target="_blank">' + userName + '</a>');
        if (userName === _Info2.default.userName) $this.find('a').addClass('pd_highlight');
    });
};

/**
 * 处理个人信息页面上的元素
 */
var handleProfilePage = exports.handleProfilePage = function handleProfilePage() {
    var $area = $('.log1 > tbody > tr:last-child > td:nth-child(2)');
    $area.html($area.html().replace(/<b>在线<\/b>/, '<b style="color: #090;">在线</b>').replace(/<b>离线<\/b>/, '<b style="color: #999;">离线</b>').replace(/系统等级：(\S+)/, '系统等级：<span class="pd_highlight">$1</span>').replace(/发帖数量：(\d+)/, function (m, num) {
        return '\u53D1\u5E16\u6570\u91CF\uFF1A<span data-num="' + num + '">' + parseInt(num).toLocaleString() + '</span>';
    }).replace(/神秘等级：(-?\d+)/, function (m, num) {
        return '\u795E\u79D8\u7B49\u7EA7\uFF1A<span data-num="' + num + '">' + parseInt(num).toLocaleString() + '</span>';
    }).replace(/论坛货币：(-?\d+)/, function (m, num) {
        return '\u8BBA\u575B\u8D27\u5E01\uFF1A<span data-num="' + num + '">' + parseInt(num).toLocaleString() + '</span>';
    }).replace(/贡献数值：(-?\d+(?:\.\d+)?)/, function (m, num) {
        return '\u8D21\u732E\u6570\u503C\uFF1A<span data-num="' + num + '">' + parseFloat(num).toLocaleString() + '</span>';
    }).replace(/在线时间：(\d+)/, function (m, num) {
        return '\u5728\u7EBF\u65F6\u95F4\uFF1A<span data-num="' + num + '">' + parseInt(num).toLocaleString() + '</span>';
    }).replace(/注册时间：((\d{4})-(\d{2})-(\d{2}))/, function (m, date, year, month, day) {
        var now = new Date();
        var html = date;
        if (parseInt(month) === now.getMonth() + 1 && parseInt(day) === now.getDate() && parseInt(year) <= now.getFullYear()) html = '<span class="pd_custom_tips pd_highlight" title="\u4ECA\u5929\u662F\u8BE5\u7528\u6237\u6CE8\u518C' + (now.getFullYear() - parseInt(year)) + '\u5468\u5E74\u7EAA\u5FF5\u65E5">' + date + '</span>';
        return '注册时间：' + html;
    })).css('vertical-align', 'top');
};

/**
 * 为关键词页面链接用户名链接
 */
var addGuanJianCiUserNameLink = exports.addGuanJianCiUserNameLink = function addGuanJianCiUserNameLink() {
    $('.kf_share1 > tbody > tr:gt(1) > td.kf_share2:last-child').each(function () {
        var $this = $(this);
        var userName = $this.text().trim();
        if (userName) {
            $this.html('<a href="profile.php?action=show&username=' + userName + '">' + userName + '</a>');
        }
    });
};

},{"./Bank":2,"./Config":3,"./ConfigDialog":4,"./Const":5,"./Info":8,"./Msg":13,"./Public":16,"./TmpLog":20,"./Util":21}],15:[function(require,module,exports){
/* 发帖模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.replaceSiteLink = exports.addFillTitleBtn = exports.addRedundantKeywordWarning = exports.savePostContentWhenSubmit = exports.preventCloseWindowWhenEditPost = exports.importKfSmileEnhanceExtension = exports.addAttachChangeAlert = exports.modifyPostPreviewPage = exports.addExtraOptionInPostPage = exports.addExtraPostEditorButton = exports.removeUnpairedBBCodeInQuoteContent = exports.handleMultiQuote = undefined;

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Msg = require('./Msg');

var Msg = _interopRequireWildcard(_Msg);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Script = require('./Script');

var Script = _interopRequireWildcard(_Script);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * 处理多重回复和多重引用
 * @param {number} type 处理类型，1：多重回复；2：多重引用
 */
var handleMultiQuote = exports.handleMultiQuote = function handleMultiQuote() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    Script.runFunc('Post.handleMultiQuote_before_', type);
    if (!$('#pdClearMultiQuoteData').length) {
        if (location.pathname === '/read.php') {
            $('<a id="pdClearMultiQuoteData" style="margin-right: 7px;" title="清除在浏览器中保存的多重引用数据" href="#">清除引用数据</a>').prependTo($('input[name="diy_guanjianci"]').parent());
        } else {
            $('<a id="pdClearMultiQuoteData" style="margin-left: 7px;" title="清除在浏览器中保存的多重引用数据" href="#">清除引用数据</a>').insertAfter('input[name="diy_guanjianci"]');
        }
        $('#pdClearMultiQuoteData').click(function (e) {
            e.preventDefault();
            localStorage.removeItem(_Const2.default.multiQuoteStorageName);
            $('input[name="diy_guanjianci"]').val('');
            $(type === 2 ? '#textarea' : 'textarea[name="atc_content"]').val('');
            alert('多重引用数据已被清除');
        });
    }
    var data = localStorage[_Const2.default.multiQuoteStorageName];
    if (!data) return;
    try {
        data = JSON.parse(data);
    } catch (ex) {
        return;
    }
    if (!data || $.type(data) !== 'object' || $.isEmptyObject(data)) return;
    var tid = parseInt(Util.getUrlParam('tid')),
        fid = parseInt(Util.getUrlParam('fid'));
    if (!tid || typeof data.tid === 'undefined' || data.tid !== tid || !Array.isArray(data.quoteList)) return;
    if (type === 2 && !fid) return;
    var list = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = data.quoteList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var quote = _step.value;

            if (!Array.isArray(quote)) continue;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = quote[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _data = _step2.value;

                    list.push(_data);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    if (!list.length) {
        localStorage.removeItem(_Const2.default.multiQuoteStorageName);
        return;
    }
    var keywords = new Set();
    var content = '';
    var $keywords = $('input[name="diy_guanjianci"]');
    if (type === 2) {
        Msg.wait('<strong>\u6B63\u5728\u83B7\u53D6\u5F15\u7528\u5185\u5BB9\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em class="pd_countdown">' + list.length + '</em></i>');
        $(document).clearQueue('MultiQuote');
    }
    $.each(list, function (index, data) {
        if (typeof data.floor === 'undefined' || typeof data.pid === 'undefined') return;
        keywords.add(data.userName);
        if (type === 2) {
            $(document).queue('MultiQuote', function () {
                $.get('post.php?action=quote&fid=' + fid + '&tid=' + tid + '&pid=' + data.pid + '&article=' + data.floor + '&t=' + $.now(), function (html) {
                    var matches = /<textarea id="textarea".*?>((.|\n)+?)<\/textarea>/i.exec(html);
                    if (matches) {
                        content += Util.removeUnpairedBBCodeContent(Util.htmlDecode(matches[1]).replace(/\n{2,}/g, '\n')) + (index === list.length - 1 ? '' : '\n');
                    }
                    var $countdown = $('.pd_countdown:last');
                    $countdown.text(parseInt($countdown.text()) - 1);
                    if (index === list.length - 1) {
                        Msg.destroy();
                        var $textarea = $('#textarea');
                        $textarea.get(0).defaultValue = content;
                        $textarea.val(content).focus();
                        $keywords.trigger('change');
                    } else {
                        setTimeout(function () {
                            $(document).dequeue('MultiQuote');
                        }, 100);
                    }
                });
            });
        } else {
            content += '[quote]\u56DE ' + data.floor + '\u697C(' + data.userName + ') \u7684\u5E16\u5B50[/quote]\n';
        }
    });
    $keywords.val([].concat(_toConsumableArray(keywords)).join(','));
    $('form[name="FORM"]').submit(function () {
        localStorage.removeItem(_Const2.default.multiQuoteStorageName);
    });
    if (type === 2) {
        $(document).dequeue('MultiQuote');
    } else {
        var $textarea = $('textarea[name="atc_content"]');
        $textarea.get(0).defaultValue = content;
        $textarea.val(content).focus();
        $keywords.trigger('change');
    }
    Script.runFunc('Post.handleMultiQuote_after_', type);
};

/**
 * 去除引用内容中不配对的BBCode
 */
var removeUnpairedBBCodeInQuoteContent = exports.removeUnpairedBBCodeInQuoteContent = function removeUnpairedBBCodeInQuoteContent() {
    var $content = $('#textarea');
    var content = $content.val();
    var matches = /\[quote\](.|\r|\n)+?\[\/quote\]/.exec(content);
    if (matches) {
        var workedContent = Util.removeUnpairedBBCodeContent(matches[0]);
        if (matches[0] !== workedContent) {
            $content.val(content.replace(matches[0], workedContent));
        }
    }
};

/**
 * 在发帖页面的发帖框上添加额外的按钮
 */
var addExtraPostEditorButton = exports.addExtraPostEditorButton = function addExtraPostEditorButton() {
    var textArea = $('#textarea').get(0);
    if (!textArea) return;

    $('\n<span id="wy_post" title="\u63D2\u5165\u9690\u85CF\u5185\u5BB9" data-type="hide" style="background-position: 0 -280px;">\u63D2\u5165\u9690\u85CF\u5185\u5BB9</span>\n<span id="wy_justifyleft" title="\u5DE6\u5BF9\u9F50" data-type="left" style="background-position: 0 -360px;">\u5DE6\u5BF9\u9F50</span>\n<span id="wy_justifycenter" title="\u5C45\u4E2D" data-type="center" style="background-position: 0 -380px;">\u5C45\u4E2D</span>\n<span id="wy_justifyright" title="\u53F3\u5BF9\u9F50" data-type="right" style="background-position: 0 -400px;">\u53F3\u5BF9\u9F50</span>\n<span id="wy_subscript" title="\u4E0B\u6807" data-type="sub" style="background-position: 0 -80px;">\u4E0B\u6807</span>\n<span id="wy_superscript" title="\u4E0A\u6807" data-type="sup" style="background-position: 0 -100px;">\u4E0A\u6807</span>\n<span class="pd_editor_btn" title="\u63D2\u5165\u98DE\u884C\u6587\u5B57" data-type="fly">F</span>\n<span class="pd_editor_btn" title="\u63D2\u5165HTML5\u97F3\u9891" data-type="audio">A</span>\n<span class="pd_editor_btn" title="\u63D2\u5165HTML5\u89C6\u9891" data-type="video">V</span>\n').appendTo('#editor-button .editor-button').click(function () {
        var $this = $(this);
        var type = $this.data('type');
        var text = '';
        switch (type) {
            case 'hide':
                text = prompt('请输入神秘等级：', 5);
                break;
            case 'audio':
                {
                    text = prompt('请输入HTML5音频实际地址：\n（可直接输入网易云音乐的单曲地址，将自动转换为外链地址）', 'http://');
                    var matches = /^https?:\/\/music\.163\.com\/(?:#\/)?song\?id=(\d+)/i.exec(text);
                    if (matches) text = 'https://music.miaola.work/163/' + matches[1] + '.mp3';
                    matches = /^https?:\/\/www\.xiami\.com\/song\/(\w+)/i.exec(text);
                    if (matches) text = 'https://music.miaola.work/xiami/' + matches[1] + '.mp3';
                }
                break;
            case 'video':
                {
                    text = prompt('请输入HTML5视频实际地址：\n（可直接输入YouTube视频页面的地址，将自动转换为外链地址）', 'http://');
                    var _matches = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w\-]+)/i.exec(text);
                    if (_matches) text = 'https://video.miaola.work/youtube/' + _matches[1];
                    _matches = /^https?:\/\/youtu\.be\/([\w\-]+)$/i.exec(text);
                    if (_matches) text = 'https://video.miaola.work/youtube/' + _matches[1];
                }
                break;
        }
        if (text === null) return;

        var selText = '';
        var code = '';
        switch (type) {
            case 'hide':
                selText = Util.getSelText(textArea);
                code = '[hide=' + text + ']' + selText + '[/hide]';
                break;
            case 'left':
                selText = Util.getSelText(textArea);
                code = '[align=left]' + selText + '[/align]';
                break;
            case 'center':
                selText = Util.getSelText(textArea);
                code = '[align=center]' + selText + '[/align]';
                break;
            case 'right':
                selText = Util.getSelText(textArea);
                code = '[align=right]' + selText + '[/align]';
                break;
            case 'fly':
                selText = Util.getSelText(textArea);
                code = '[fly]' + selText + '[/fly]';
                break;
            case 'sub':
                selText = Util.getSelText(textArea);
                code = '[sub]' + selText + '[/sub]';
                break;
            case 'sup':
                selText = Util.getSelText(textArea);
                code = '[sup]' + selText + '[/sup]';
                break;
            case 'audio':
                code = '[audio]' + text + '[/audio]';
                break;
            case 'video':
                code = '[video]' + text + '[/video]';
                break;
        }
        if (!code) return;
        Util.addCode(textArea, code, selText);
        textArea.focus();
    }).mouseenter(function () {
        $(this).addClass('buttonHover');
    }).mouseleave(function () {
        $(this).removeClass('buttonHover');
    });
};

/**
 * 在发帖页面上添加额外的选项
 */
var addExtraOptionInPostPage = exports.addExtraOptionInPostPage = function addExtraOptionInPostPage() {
    $('\n<div class="pd_post_extra_option">\n  <label><input type="checkbox" name="autoAnalyzeUrl" checked> \u81EA\u52A8\u5206\u6790url</label>\n  <label style="margin-left: 5px;"><input type="checkbox" name="windCodeAutoConvert" checked> Wind Code\u81EA\u52A8\u8F6C\u6362</label>\n</div>\n').appendTo($('#menu_show').closest('td')).on('click', '[type="checkbox"]', function () {
        var $this = $(this);
        var inputName = $this.is('[name="autoAnalyzeUrl"]') ? 'atc_autourl' : 'atc_convert';
        $('form[name="FORM"]').find('[name="' + inputName + '"]').val($this.prop('checked') ? 1 : 0);
    });

    $('<input type="button" value="预览帖子" style="margin-left: 7px;">').insertAfter('[type="submit"][name="Submit"]').click(function (e) {
        e.preventDefault();
        var $form = $('form[name="preview"]');
        $form.find('input[name="atc_content"]').val($('#textarea').val());
        $form.submit();
    });
};

/**
 * 修正发帖预览页面
 */
var modifyPostPreviewPage = exports.modifyPostPreviewPage = function modifyPostPreviewPage() {
    $('table > tbody > tr.tr1 > th').css({
        'text-align': 'left',
        'font-weight': 'normal',
        'border': '1px solid #9191ff',
        'padding': '10px'
    });
};

/**
 * 在发帖页面添加更新附件提醒
 */
var addAttachChangeAlert = exports.addAttachChangeAlert = function addAttachChangeAlert() {
    $(document).on('click', '.abtn[id^="md_"]', function () {
        if (!$(document).data('attachUpdateAlert')) {
            alert('本反向代理服务器为了提高性能对图片设置了缓存，更新附件图片后可能需等待最多30分钟才能看到效果');
            $(document).data('attachUpdateAlert', true);
        }
    });
};

/**
 * 引入绯月表情增强插件
 */
var importKfSmileEnhanceExtension = exports.importKfSmileEnhanceExtension = function importKfSmileEnhanceExtension() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = 'https://kf.miaola.work/KfEmotion.min.user.js' + (typeof _Info2.default.w.resTimestamp !== 'undefined' ? '?ts=' + _Info2.default.w.resTimestamp : '');
    document.body.appendChild(script);
};

/**
 * 在撰写发帖内容时阻止关闭页面
 */
var preventCloseWindowWhenEditPost = exports.preventCloseWindowWhenEditPost = function preventCloseWindowWhenEditPost() {
    window.addEventListener('beforeunload', function (e) {
        var $textArea = $(location.pathname === '/post.php' ? '#textarea' : 'textarea[name="atc_content"]');
        var content = $textArea.val();
        if (content && content !== $textArea.get(0).defaultValue && !_Info2.default.w.isSubmit) {
            var msg = '你可能正在撰写发帖内容中，确定要关闭页面吗？';
            e.returnValue = msg;
            return msg;
        }
    });

    $('form[action="post.php?"]').submit(function () {
        _Info2.default.w.isSubmit = true;
    });
};

/**
 * 在提交时保存发帖内容
 */
var savePostContentWhenSubmit = exports.savePostContentWhenSubmit = function savePostContentWhenSubmit() {
    var $textArea = $(location.pathname === '/post.php' ? '#textarea' : 'textarea[name="atc_content"]');
    $('form[action="post.php?"]').submit(function () {
        var content = $textArea.val();
        if ($.trim(content).length > 0) sessionStorage.setItem(_Const2.default.postContentStorageName, content);
    });

    var postContent = sessionStorage.getItem(_Const2.default.postContentStorageName);
    if (postContent) {
        $('\n<div style="padding: 0 10px; line-height: 2em; text-align: left; background-color: #fefee9; border: 1px solid #99f;">\n  <a class="pd_btn_link" data-name="restore" href="#">[\u6062\u590D\u4E0A\u6B21\u63D0\u4EA4\u7684\u5185\u5BB9]</a>\n  <a class="pd_btn_link" data-name="clear" href="#">[\u6E05\u9664]</a>\n</div>\n').insertBefore($textArea).find('[data-name="restore"]').click(function (e) {
            e.preventDefault();
            $textArea.val(postContent);
            $(this).parent().find('[data-name="clear"]').click();
        }).end().find('[data-name="clear"]').click(function (e) {
            e.preventDefault();
            sessionStorage.removeItem(_Const2.default.postContentStorageName);
            $(this).parent().remove();
        });
    }
};

/**
 * 添加多余关键词警告
 */
var addRedundantKeywordWarning = exports.addRedundantKeywordWarning = function addRedundantKeywordWarning() {
    $('input[name="diy_guanjianci"]').change(function () {
        var $this = $(this);
        var keywords = $.trim($this.val()).split(',').filter(function (str) {
            return str;
        });
        if (keywords.length > 5) {
            alert('所填关键词已超过5个，多余的关键词将被忽略');
            $this.select().focus();
        }
    });
};

/**
 * 添加填充标题按钮
 */
var addFillTitleBtn = exports.addFillTitleBtn = function addFillTitleBtn() {
    $('<a class="pd_btn_link" data-name="fill" href="#" title="按照格式填充标题">填充</a>').insertAfter('#btyl').click(function (e) {
        e.preventDefault();
        var value = $.trim(prompt('\u8BF7\u6309\u683C\u5F0F\u586B\u5199\u6807\u9898\u540D\u79F0\uFF0C\u4F1A\u81EA\u52A8\u586B\u5145\u5230\u76F8\u5E94\u7684\u8868\u5355\u4E2D\uFF08\u9009\u586B\u9879\u53EF\u4E0D\u586B\uFF09\uFF1A\n\u4F8B\uFF1A[\u8BF8\u795E\u5B57\u5E55\u7EC4][Seiren][\u6E05\u604B][01-12\u5408\u96C6][\u7B80\u7E41\u65E5\u5185\u6302][1080P][\u767E\u5EA630D][3.25GB][BDRIP]\n\u6216 [\u81EA\u8D2D][\u65B0\u4F5C][nostalabel]\u5F85\u96EA\u306E\u82B1 \uFF5Esnow drop\uFF5E[MEGA\u957F\u671F][667MB][BMP]'));
        if (!value) return;
        var matches = /(\[自购\])?(\[新作\])?(.+)\[([^\[\]]+?)(\d+D|长期)?\]\[(\d+(?:\.\d+)?(?:G|M)B?)\](?:\[([^\[\]]+)\])?/i.exec(value);
        if (!matches) {
            alert('标题格式不符合标准');
            return;
        }
        $('#diy_titlezigou').prop('checked', typeof matches[1] !== 'undefined');
        $('#diy_xinzuo').prop('checked', typeof matches[2] !== 'undefined');
        $('#diy_titlewplx').val(matches[4]);
        $('#diy_titleyxqx').val(matches[5] ? matches[5] : '');
        $('#diy_titlezytj').val(matches[6]);
        $('#diy_titlezygs').val(matches[7] ? matches[7] : '');
        $('#diy_titlezpmc').val(matches[3]).trigger('change');
    });
};

/**
 * 将发帖框内的站内链接替换为官方站点的链接
 */
var replaceSiteLink = exports.replaceSiteLink = function replaceSiteLink() {
    $('form[name="FORM"]').submit(function () {
        var $textArea = $(this).find('textarea[name="atc_content"]');
        if (!$textArea.length) return;
        $textArea.val($textArea.val().replace(new RegExp(location.protocol + '//' + location.hostname.replace(/\./g, '\\.') + '/(\\w+)\\.php', 'g'), 'https://bbs.kforz.com/$1.php'));
    });
};

},{"./Const":5,"./Info":8,"./Msg":13,"./Script":18,"./Util":21}],16:[function(require,module,exports){
/* 公共模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.modifyDomainTips = exports.addSlowActionChecked = exports.changeNewTipsColor = exports.showCommonImportOrExportLogDialog = exports.showCommonImportOrExportConfigDialog = exports.turnPageViaKeyboard = exports.repairBbsErrorCode = exports.addSearchDialogLink = exports.makeSearchByBelowTwoKeyWordAvailable = exports.bindSearchTypeSelectMenuClick = exports.bindElementTitleClick = exports.showElementTitleTips = exports.changeIdColor = exports.addFastNavMenu = exports.blockThread = exports.blockUsers = exports.followUsers = exports.getDailyBonus = exports.startTimingMode = exports.getNextTimingIntervalInfo = exports.addPolyfill = exports.showFormatLog = exports.preventCloseWindowWhenActioning = exports.handleSideBarLink = exports.addConfigAndLogDialogLink = exports.appendCss = exports.checkBrowserType = exports.getSafeId = exports.getUidAndUserName = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Msg = require('./Msg');

var Msg = _interopRequireWildcard(_Msg);

var _Dialog = require('./Dialog');

var Dialog = _interopRequireWildcard(_Dialog);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Config = require('./Config');

var _ConfigDialog = require('./ConfigDialog');

var _Log = require('./Log');

var Log = _interopRequireWildcard(_Log);

var _LogDialog = require('./LogDialog');

var _TmpLog = require('./TmpLog');

var TmpLog = _interopRequireWildcard(_TmpLog);

var _Script = require('./Script');

var Script = _interopRequireWildcard(_Script);

var _Read = require('./Read');

var Read = _interopRequireWildcard(_Read);

var _Loot = require('./Loot');

var Loot = _interopRequireWildcard(_Loot);

var _Item = require('./Item');

var Item = _interopRequireWildcard(_Item);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 获取Uid和用户名
 * @returns {boolean} 是否获取成功
 */
var getUidAndUserName = exports.getUidAndUserName = function getUidAndUserName() {
    var $userName = $('#kf_topuser > a[href="javascript:;"]').eq(0);
    var $uid = _Info2.default.$userMenu.find('a[href^="profile.php?action=show&uid="]').eq(0);
    if (!$userName.length || !$uid.length) return false;
    $userName.attr('id', 'pdUserName');
    _Info2.default.userName = $.trim($userName.contents().get(0).textContent);
    if (!_Info2.default.userName) return false;
    var matches = /&uid=(\d+)/.exec($uid.attr('href'));
    if (!matches) return false;
    _Info2.default.uid = parseInt(matches[1]);
    return true;
};

/**
 * 获取用户的SafeID
 * @returns {string} 用户的SafeID
 */
var getSafeId = exports.getSafeId = function getSafeId() {
    var safeId = $('input#safeid').val();
    if (!safeId) {
        var matches = /safeid=(\w+)/i.exec($('a[href*="safeid="]:first').attr('href'));
        if (matches) safeId = matches[1];
    }
    return safeId ? safeId : '';
};

/**
 * 检查浏览器类型
 */
var checkBrowserType = exports.checkBrowserType = function checkBrowserType() {
    if (Config.browseType === 'auto') {
        _Info2.default.isMobile = /(Mobile|MIDP)/i.test(navigator.userAgent);
    } else {
        _Info2.default.isMobile = Config.browseType === 'mobile';
    }
};

/**
 * 添加CSS样式
 */
var appendCss = exports.appendCss = function appendCss() {
    $('head').append('\n<style>\n  /* \u516C\u5171 */\n  .pd_highlight { color: #f00 !important; }\n  .pd_notice, .pd_msg .pd_notice { font-style: italic; color: #666; }\n  .pd_input, .pd_cfg_main input, .pd_cfg_main select {\n    vertical-align: middle; height: auto; margin-right: 0; line-height: 22px; font-size: 12px;\n  }\n  .pd_input[type="text"], .pd_input[type="number"], .pd_cfg_main input[type="text"], .pd_cfg_main input[type="number"] {\n    height: 22px; line-height: 22px;\n  }\n  .pd_input:focus, .pd_cfg_main input[type="text"]:focus, .pd_cfg_main input[type="number"]:focus, .pd_cfg_main textarea:focus,\n      .pd_textarea:focus { border-color: #7eb4ea; }\n  .pd_textarea, .pd_cfg_main textarea { border: 1px solid #ccc; font-size: 12px; }\n  .pd_btn_link { margin-left: 4px; margin-right: 4px; }\n  .pd_custom_tips { cursor: help; }\n  .pd_disabled_link { color: #999 !important; text-decoration: none !important; cursor: default; }\n  .pd_not_click_link, .pd_not_click_link:visited { color: #000; pointer-events: none; }\n  hr {\n    box-sizing: content-box; height: 0; margin-top: 7px; margin-bottom: 7px; border: 0; border-top: 1px solid rgba(0, 0, 0, .2);\n  }\n  .pd_overflow { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n  .pd_hide { width: 0 !important; height: 0 !important; font: 0/0 a; color: transparent; background-color: transparent; border: 0 !important; }\n  .pd_stat i { display: inline-block; font-style: normal; margin-right: 3px; }\n  .pd_stat_extra em, .pd_stat_extra ins { padding: 0 2px; cursor: help; }\n  .pd_panel { position: absolute; overflow-y: auto; background-color: #fff; border: 1px solid #9191ff; opacity: 0.9; }\n  .pd_title_tips {\n    position: absolute; max-width: 470px; font-size: 12px; line-height: 1.5em;\n    padding: 2px 5px; background-color: #fcfcfc; border: 1px solid #767676; z-index: 9999;\n  }\n  .pd_search_type {\n    float: left; height: 26px; line-height: 26px; width: 65px; text-align: center;\n    border: 1px solid #ccc; border-left: none; border-right: none; cursor: pointer;\n  }\n  .pd_search_type i { font-style: normal; margin-left: 5px; font-family: sans-serif; }\n  .pd_search_type_list {\n    position: absolute; width: 63px; background-color: #fcfcfc; border: 1px solid #ccc; border-top: none; line-height: 26px;\n    text-indent: 13px; cursor: pointer; z-index: 1004;\n  }\n  .pd_search_type_list li:hover { color: #fff; background-color: #87c3cf; }\n  #alldiv > .drow:nth-child(2) { ' + (Config.navBarAlwaysTopEnabled && !location.host.endsWith('.miaola.info') ? 'position: sticky; top: 0;' : '') + ' z-index: 1001 !important; }\n  .pd_domain_tips { position: absolute; top: 0; width: 1200px; }\n  \n  /* \u6D88\u606F\u6846 */\n  .pd_mask { position: fixed; width: 100%; height: 100%; left: 0; top: 0; z-index: 1000; }\n  .pd_msg_container { position: ' + (_Info2.default.isMobile ? 'absolute' : 'fixed') + '; width: 100%; z-index: 1003; }\n  .pd_msg {\n    border: 1px solid #6ca7c0; text-shadow: 0 0 3px rgba(0, 0, 0, 0.1); border-radius: 3px; padding: 10px 40px; text-align: center;\n    font-size: 14px; position: absolute; display: none; color: #333; line-height: 1.6em; background: #f8fcfe; background-repeat: no-repeat;\n    background-image: -webkit-linear-gradient(#f9fcfe, #f6fbfe 25%, #eff7fc);\n    background-image: -moz-linear-gradient(top, #f9fcfe, #f6fbfe 25%, #eff7fc);\n    background-image: -ms-linear-gradient(#f9fcfe, #f6fbfe 25%, #eff7fc);\n    background-image: linear-gradient(#f9fcfe, #f6fbfe 25%, #eff7fc);\n  }\n  .pd_msg strong { margin-right: 5px; }\n  .pd_msg i { font-style: normal; padding-left: 10px; }\n  .pd_msg em, .pd_stat em, .pd_msg ins, .pd_stat ins { font-weight: 700; font-style: normal; color:#ff6600; padding: 0 3px; }\n  .pd_msg ins, .pd_stat ins { text-decoration: none; color: #339933; }\n  .pd_msg a { font-weight: bold; margin-left: 15px; }\n  .pd_change_domain_tips_area {\n    position: fixed;\n    top: 0;\n    width: 1198px;\n    text-align: center;\n    line-height: 50px;\n    font-size: 16px;\n    color: #842029;\n    background-color: #f8d7da;\n    border: 1px solid #f5c2c7;\n    z-index: 1002 !important;\n  }\n  \n  /* \u5E16\u5B50\u9875\u9762 */\n  .readtext .pd_goto_link { color: #000; }\n  .readtext .pd_goto_link:hover { color: #51d; }\n  .pd_multi_quote_chk { margin-right: 2px; float: right; }\n  .pd_fast_goto_floor { margin-right: 10px !important; line-height: 32px; }\n  .pd_user_memo { font-size: 12px; color: #999; margin-left: 5px; }\n  .readtext img[onclick] { width: auto; max-width: 850px; }\n  .read_fds { text-align: left !important; font-weight: normal !important; font-style: normal !important; }\n  .pd_code_area { max-height: 550px; margin-top: 1em; overflow-y: auto; font-size: 12px; font-family: Consolas, "Courier New"; }\n  .pd_code_area .pd_copy_code { position: absolute; margin-top: -1em; min-width: 5em; text-align: center; background-color: #fffbf4; height: 20px; }\n  .pd_good_post_mark { outline: 3px solid #f00; outline-offset: -3px; }\n  .pd_follow_highlight { box-shadow: 0 0 3px 1px #ff9933 !important; }\n  \n  /* \u6211\u7684\u7269\u54C1\u9875\u9762 */\n  .pd_item_btns { text-align: right; margin-top: 5px;  }\n  .pd_item_btns button, .pd_item_btns input { margin-bottom: 2px; vertical-align: middle; }\n  .pd_result { border: 1px solid #99f; padding: 5px; margin-top: 10px; line-height: 2em; }\n  .pd_arm_equipped { background-color:#eef; -webkit-box-shadow: 0 0 7px #99f; box-shadow: 0 0 7px #99f; }\n  .pd_arm_equipped > td:nth-child(3)::before { content: "\uFF08\u88C5\u5907\u4E2D\uFF09"; font-weight: bold; }\n  .pd_arm_equipped a[data-name="equip"], .pd_arm_equipped a[data-name="smelt"] { color: #777; pointer-events: none; }\n  .kf_fw_ig4 > tbody > tr > td { position: relative; }\n  .kf_fw_ig4 > tbody > tr > td[data-memo]::after {\n    content: "(" attr(data-memo) ")"; position: absolute; bottom: 0; right: 5px; padding: 0 5px; color: #777; background: rgba(252, 252, 252, .7);\n  }\n  .kf_fw_ig4 > tbody > .pd_arm_equipped > td[data-memo]::after { background: rgba(238, 238, 255, .7); }\n  .kf_fw_ig4 > tbody > tr > td > input[name="armCheck"] { position: absolute; top: 0; left: 5px; }\n  .show_arm_info { position: absolute; top: 0; right: 0; padding: 0 10px; background: rgba(252, 252, 252, .9); }\n  .pd_arm_equipped .show_arm_info { background: rgba(238, 238, 255, .9); }\n  .pd_useless_sub_property { color: #999; text-decoration: line-through; }\n  .pd_arm_id { font-style: normal; color: #999; }\n  .pd_new_arm_mark { font-style: normal; color: #f00; }\n  \n  /* \u53D1\u5E16\u9875\u9762 */\n  #pdSmilePanel img { margin: 3px; cursor: pointer; }\n  .editor-button .pd_editor_btn { background: none; text-indent: 0; line-height: 18px; cursor: default; }\n  .pd_post_extra_option { text-align: left; margin: 5px; }\n  .pd_post_extra_option input { vertical-align: middle; height: auto; margin-right: 0; }\n  \n  /* \u5176\u5B83\u9875\u9762 */\n  .pd_thread_page { margin-left: 5px; }\n  .pd_thread_page a { color: #444; padding: 0 3px; }\n  .pd_thread_page a:hover { color: #51d; }\n  .pd_card_chk { position: absolute; bottom: -8px; left: 1px; }\n  .pd_thread_goto {\n    position: absolute; top: 0; right: 0; box-sizing: border-box; width: 100%; height: 100%; visibility: hidden; z-index: 1;\n  }\n  .pd_id_color_select > td { position: relative; cursor: pointer; }\n  .pd_id_color_select > td > input { position: absolute; top: 18px; left: 10px; }\n  #pdPropertiesArea td { position: relative; }\n  #pdPropertiesArea input[type="text"] { width: 211px; }\n  .pd_property_diff { position: absolute; top: 0px; right: 5px; }\n  .pd_property_diff em { font-style: normal; }\n  .rightbox1 { overflow: hidden; }\n  .pd_rightbox1_gray, .pd_rightbox1_gray:visited, .pd_rightbox1_gray:hover { color: #b0b0ff; border-color: #b0b0ff; }\n\n  /* \u8BBE\u7F6E\u5BF9\u8BDD\u6846 */\n  .pd_cfg_ml { margin-left: 10px; }\n  .pd_cfg_box {\n    position: ' + (_Info2.default.isMobile ? 'absolute' : 'fixed') + '; border: 1px solid #9191ff; display: none; z-index: 1002;\n    -webkit-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); -moz-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);\n  }\n  .pd_cfg_box h1 {\n    text-align: center; font-size: 14px; background-color: #9191ff; color: #fff; line-height: 2em; margin: 0; padding-left: 20px;\n  }\n  .pd_cfg_box h1 span { float: right; cursor: pointer; padding: 0 10px; }\n  .pd_cfg_nav { text-align: right; margin-top: 5px; margin-bottom: -5px; }\n  .pd_cfg_main { background-color: #fcfcfc; padding: 0 10px; font-size: 12px; line-height: 24px; min-height: 50px; overflow: auto; }\n  .pd_cfg_main fieldset { border: 1px solid #ccccff; padding: 0 6px 6px; }\n  .pd_cfg_main legend { font-weight: bold; }\n  .pd_cfg_main input[type="color"] { height: 18px; width: 30px; padding: 0; }\n  .pd_cfg_tips { color: #51d; text-decoration: none; cursor: help; }\n  .pd_cfg_tips:hover { color: #ff0000; }\n  #pdConfigDialog .pd_cfg_main { overflow-x: hidden; white-space: nowrap; }\n  .pd_cfg_panel { display: inline-block; width: 400px; vertical-align: top; }\n  .pd_cfg_panel + .pd_cfg_panel { margin-left: 5px; }\n  .pd_cfg_btns { background-color: #fcfcfc; text-align: right; padding: 5px; }\n  .pd_cfg_btns input, .pd_cfg_btns button { vertical-align: middle; }\n  .pd_cfg_btns button { min-width: 80px; }\n  .pd_cfg_about { float: left; line-height: 24px; margin-left: 5px; }\n  .pd_custom_script_header { margin: 7px 0; padding: 5px; background-color: #e8e8e8; border-radius: 5px; }\n  .pd_custom_script_content { display: none; width: 750px; height: 350px; white-space: pre; }\n\n  /* \u65E5\u5FD7\u5BF9\u8BDD\u6846 */\n  .pd_log_nav { text-align: center; margin: -5px 0 -12px; font-size: 14px; line-height: 44px; }\n  .pd_log_nav a { display: inline-block; }\n  .pd_log_nav h2 { display: inline; font-size: 14px; margin-left: 7px; margin-right: 7px; }\n  .pd_log_content { height: 242px; overflow: auto; }\n  .pd_log_content h3 { display: inline-block; font-size: 12px; line-height: 22px; margin: 0; }\n  .pd_log_content h3:not(:first-child) { margin-top: 5px; }\n  .pd_log_content p { line-height: 22px; margin: 0; }\n</style>\n');

    if (location.pathname === '/read.php' && (Config.threadContentFontSize > 0 || Config.adjustThreadContentWidthEnabled)) {
        $('head').append('\n<style>\n  .readtext > table > tbody > tr > td:nth-child(2) {\n    width: ' + (Config.adjustThreadContentWidthEnabled ? 643.2 : 823.2) + 'px;\n    display: inline-block;\n    overflow-wrap: break-word;\n  }\n  .readtext > table > tbody > tr > td:nth-child(2) table { word-break: break-all; }\n</style>\n');
    }

    if (Config.customCssEnabled) {
        $('head').append('<style>' + Config.customCssContent + '</style>');
    }
};

/**
 * 添加设置和日志对话框的链接
 */
var addConfigAndLogDialogLink = exports.addConfigAndLogDialogLink = function addConfigAndLogDialogLink() {
    $('\n<li><a data-name="openConfigDialog" href="#">\u52A9\u624B\u8BBE\u7F6E</a></li>\n<li><a data-name="openLogDialog" href="#">\u52A9\u624B\u65E5\u5FD7</a></li>\n').appendTo(_Info2.default.$userMenu).find('[data-name="openConfigDialog"]').click(function (e) {
        e.preventDefault();
        (0, _ConfigDialog.show)();
    }).end().find('[data-name="openLogDialog"]').click(function (e) {
        e.preventDefault();
        (0, _LogDialog.show)();
    });
};

/**
 * 处理侧边栏链接
 */
var handleSideBarLink = exports.handleSideBarLink = function handleSideBarLink() {
    var $kfb = $('a.rightbox1[title="网站虚拟货币"]');
    $kfb.attr('id', 'pdKfb');
    var matches = /(-?\d+)KFB\s*\|\s*(-?\d+(?:\.\d+)?)贡献/.exec($kfb.text());
    if (matches) {
        var kfb = parseInt(matches[1]);
        var gongXian = parseFloat(matches[2]);
        $kfb.html('<b>' + kfb.toLocaleString() + '</b>KFB | <b>' + gongXian.toLocaleString() + '</b>\u8D21\u732E').attr('data-kfb', kfb).attr('data-gongxian', gongXian);
    }

    var $smLevel = $('a.rightbox1[href="kf_growup.php"]');
    $smLevel.attr('id', 'pdSmLevel');
    matches = /神秘(-?\d+)级 \(系数排名第\s*(\d+\+?)\s*位/.exec($smLevel.text());
    if (matches) {
        var smLevel = parseInt(matches[1]);
        var smRank = matches[2];
        $smLevel.html('\u795E\u79D8<b>' + smLevel.toLocaleString() + '</b>\u7EA7 (\u7CFB\u6570\u6392\u540D\u7B2C<b style="color: #00f;">' + smRank + '</b>\u4F4D)').attr('data-sm-level', smLevel).attr('data-sm-rank', smRank);
    }

    $('a.rightbox1[href="kf_fw_ig_index.php"]').attr('id', 'pdLoot');
};

/**
 * 在操作进行时阻止关闭页面
 * @param e
 * @returns {string} 提示消息
 */
var preventCloseWindowWhenActioning = exports.preventCloseWindowWhenActioning = function preventCloseWindowWhenActioning(e) {
    if ($('.pd_mask').length > 0) {
        var msg = '操作正在进行中，确定要关闭页面吗？';
        e.returnValue = msg;
        return msg;
    }
};

/**
 * 输出经过格式化后的控制台消息
 * @param {string} msgType 消息类别
 * @param {string} html 回应的HTML源码
 */
var showFormatLog = exports.showFormatLog = function showFormatLog(msgType, html) {
    var _Util$getResponseMsg = Util.getResponseMsg(html),
        msg = _Util$getResponseMsg.msg,
        url = _Util$getResponseMsg.url;

    console.log('\u3010' + msgType + '\u3011\u56DE\u5E94\uFF1A' + msg + (url ? '\uFF1B\u8DF3\u8F6C\u5730\u5740\uFF1A' + Util.getHostNameUrl() + url : ''));
};

/**
 * 添加兼容方法
 */
var addPolyfill = exports.addPolyfill = function addPolyfill() {
    if (!Array.prototype.includes) {
        Array.prototype.includes = function (searchElement /*, fromIndex = 0 */) {
            if (this == null) throw new TypeError('Array.prototype.includes called on null or undefined');
            var O = Object(this);
            var len = parseInt(O.length) || 0;
            if (len === 0) return false;
            var n = parseInt(arguments[1]) || 0;
            var k = void 0;
            if (n >= 0) k = n;else {
                k = len + n;
                if (k < 0) k = 0;
            }
            var currentElement = void 0;
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
            var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';

            var O = Object(this);
            var S = String(O);
            var intMaxLength = parseInt(maxLength) || 0;
            var stringLength = parseInt(S.length) || 0;
            if (intMaxLength <= stringLength) return S;
            var filler = typeof fillString === 'undefined' ? ' ' : String(fillString);
            if (filler === '') return S;
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
            var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';

            var O = Object(this);
            var S = String(O);
            var intMaxLength = parseInt(maxLength) || 0;
            var stringLength = parseInt(S.length) || 0;
            if (intMaxLength <= stringLength) return S;
            var filler = typeof fillString === 'undefined' ? ' ' : String(fillString);
            if (filler === '') return S;
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

/**
 * 获取定时模式下次操作的时间间隔信息
 * @returns {{action: string, interval: number}} action：下次操作的名称；interval：下次操作的时间间隔（秒）
 */
var getNextTimingIntervalInfo = exports.getNextTimingIntervalInfo = function getNextTimingIntervalInfo() {
    var promoteHaloInterval = -1;
    if (Config.autoPromoteHaloEnabled) {
        var value = parseInt(Util.getCookie(_Const2.default.promoteHaloCookieName));
        if (value > 0) {
            promoteHaloInterval = Math.floor((value - $.now()) / 1000);
        } else {
            promoteHaloInterval = 0;
        }
    }

    var getDailyBonusInterval = -1;
    if (Config.autoGetDailyBonusEnabled) {
        var _value = parseInt(Util.getCookie(_Const2.default.getDailyBonusCookieName));
        if (_value > 0) {
            var date = Util.getTimezoneDateByTime(_Const2.default.getDailyBonusAfterTime);
            date.setDate(date.getDate() + 1);
            var now = new Date();
            if (now > date) date.setDate(date.getDate() + 1);
            getDailyBonusInterval = Math.floor((date - now) / 1000);
        } else if (_value < 0) {
            getDailyBonusInterval = _Const2.default.getDailyBonusSpecialInterval * 60;
        } else {
            getDailyBonusInterval = 0;
        }
    }

    var buyItemInterval = -1;
    if (Config.autoBuyItemEnabled) {
        var _date = Util.getDateByTime(Config.buyItemAfterTime);
        var _now = new Date();
        if (Util.getCookie(_Const2.default.buyItemReadyCookieName)) {
            buyItemInterval = 5 * 60;
        } else if (Util.getCookie(_Const2.default.buyItemCookieName) || _now < _date) {
            if (_now > _date) _date.setDate(_date.getDate() + 1);
            buyItemInterval = Math.floor((_date - _now) / 1000);
        } else {
            buyItemInterval = 0;
        }
    }

    var intervalList = [{ action: '提升战力光环', interval: promoteHaloInterval }, { action: '自动获取每日奖励', interval: getDailyBonusInterval }, { action: '自动购买物品', interval: buyItemInterval }];
    var minAction = '',
        minInterval = -1;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = intervalList.filter(function (data) {
            return data.interval > -1;
        })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _step.value,
                action = _step$value.action,
                interval = _step$value.interval;

            if (minInterval < 0 || interval < minInterval) {
                minAction = action;
                minInterval = interval;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return { action: minInterval > 0 ? minAction : '', interval: minInterval + 1 };
};

/**
 * 启动定时模式
 */
var startTimingMode = exports.startTimingMode = function startTimingMode() {
    var _getNextTimingInterva = getNextTimingIntervalInfo(),
        action = _getNextTimingInterva.action,
        interval = _getNextTimingInterva.interval;

    if (interval === -1) return;
    var oriTitle = document.title;
    var titleItvFunc = null;
    var prevInterval = -1,
        errorNum = 0;

    /**
     * 获取经过格式化的倒计时标题
     * @param {number} type 倒计时显示类型，1：[小时:][分钟:]秒钟；2：[小时:]分钟
     * @param {number} interval 倒计时
     * @returns {string} 经过格式化的倒计时标题
     */
    var getFormatIntervalTitle = function getFormatIntervalTitle(type, interval) {
        var diff = Util.getTimeDiffInfo(Util.getDate('+' + interval + 's').getTime());
        var textInterval = diff.hours > 0 ? diff.hours + '时' : '';
        if (type === 1) textInterval += (diff.minutes > 0 ? diff.minutes + '分' : '') + diff.seconds + '秒';else textInterval += diff.minutes + '分';
        return textInterval;
    };

    /**
     * 显示定时模式标题提示
     * @param {number} interval 倒计时的时间间隔（秒）
     * @param {string} action 下次操作的名称
     * @param {boolean} isShowTitle 是否立即显示标题
     */
    var showRefreshModeTips = function showRefreshModeTips(interval) {
        var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var isShowTitle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (titleItvFunc) window.clearInterval(titleItvFunc);
        var showInterval = interval;
        console.log('\u3010\u5B9A\u65F6\u6A21\u5F0F\u3011\u5012\u8BA1\u65F6' + (action ? '(' + action + ')' : '') + '\uFF1A' + getFormatIntervalTitle(1, showInterval));
        if (Config.showTimingModeTipsType.toLowerCase() !== 'never') {
            var showIntervalTitle = function showIntervalTitle() {
                document.title = oriTitle + ' (\u5B9A\u65F6: ' + getFormatIntervalTitle(interval < 60 ? 1 : 2, showInterval) + ')';
                showInterval = interval < 60 ? showInterval - 1 : showInterval - 60;
            };
            if (isShowTitle || Config.showTimingModeTipsType.toLowerCase() === 'always' || interval < 60) showIntervalTitle();else showInterval = interval < 60 ? showInterval - 1 : showInterval - 60;
            titleItvFunc = setInterval(showIntervalTitle, _Const2.default.showRefreshModeTipsInterval * 60 * 1000);
        }
    };

    /**
     * 处理错误
     */
    var handleError = function handleError() {
        var interval = 0,
            errorText = '';
        $.ajax({
            type: 'GET',
            url: 'index.php?t=' + $.now(),
            timeout: _Const2.default.defAjaxTimeout,
            success: function success(html) {
                if (!/"kf_fw_ig_index.php"/.test(html)) {
                    interval = 10;
                    errorText = '论坛维护或其它未知情况';
                }
            },
            error: function error() {
                interval = _Const2.default.errorRefreshInterval;
                errorText = '连接超时';
            },
            complete: function complete() {
                if (interval > 0) {
                    console.log('\u5B9A\u65F6\u64CD\u4F5C\u5931\u8D25\uFF08\u539F\u56E0\uFF1A' + errorText + '\uFF09\uFF0C\u5C06\u5728' + interval + '\u5206\u949F\u540E\u91CD\u8BD5...');
                    Msg.remove($('.pd_refresh_notice').parent());
                    Msg.show('<strong class="pd_refresh_notice">\u5B9A\u65F6\u64CD\u4F5C\u5931\u8D25\uFF08\u539F\u56E0\uFF1A' + errorText + '\uFF09\uFF0C\u5C06\u5728<em>' + interval + '</em>\u5206\u949F\u540E\u91CD\u8BD5&hellip;</strong>', -1);
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
    var checkRefreshInterval = function checkRefreshInterval() {
        Msg.remove($('.pd_refresh_notice').parent());

        $(document).clearQueue('AutoAction');

        if (Config.autoPromoteHaloEnabled && !Util.getCookie(_Const2.default.promoteHaloCookieName)) {
            $(document).queue('AutoAction', function () {
                return Loot.getPromoteHaloInfo();
            });
        }

        if (Config.autoGetDailyBonusEnabled && !Util.getCookie(_Const2.default.getDailyBonusCookieName)) {
            $(document).queue('AutoAction', function () {
                return getDailyBonus();
            });
        }

        if (Config.autoBuyItemEnabled && !Util.getCookie(_Const2.default.buyItemCookieName) && !Util.getCookie(_Const2.default.buyItemReadyCookieName)) {
            $(document).queue('AutoAction', function () {
                return Item.buyItems(Config.buyItemIdList);
            });
        }

        $(document).dequeue('AutoAction');

        var _getNextTimingInterva2 = getNextTimingIntervalInfo(),
            action = _getNextTimingInterva2.action,
            interval = _getNextTimingInterva2.interval;

        if (interval > 0) errorNum = 0;
        if (interval === 0 && prevInterval === 0) {
            prevInterval = -1;
            handleError();
            return;
        } else prevInterval = interval;
        if (interval === -1) {
            if (titleItvFunc) clearInterval(titleItvFunc);
            return;
        } else if (interval === 0) interval = _Const2.default.actionFinishRetryInterval;
        setTimeout(checkRefreshInterval, interval * 1000);
        showRefreshModeTips(interval, action, true);
    };

    setTimeout(checkRefreshInterval, interval < 60 ? 60 * 1000 : interval * 1000);
    showRefreshModeTips(interval < 60 ? 60 : interval, action);
};

/**
 * 领取每日奖励
 */
var getDailyBonus = exports.getDailyBonus = function getDailyBonus() {
    Script.runFunc('Public.getDailyBonus_before_');
    console.log('领取每日奖励Start');
    var $wait = Msg.wait('<strong>正在领取每日奖励，请稍候&hellip;</strong>');

    /**
     * 获取领取每日奖励Cookies有效期
     * @returns {Date} Cookies有效期的Date对象
     */
    var getCookieDate = function getCookieDate() {
        var date = Util.getTimezoneDateByTime(_Const2.default.getDailyBonusAfterTime);
        date.setDate(date.getDate() + 1);
        if (new Date() > date) date.setDate(date.getDate() + 1);
        return date;
    };

    $.ajax({
        type: 'GET',
        url: 'kf_growup.php?t=' + $.now(),
        timeout: _Const2.default.defAjaxTimeout
    }).done(function (html) {
        var matches = /<a href="(kf_growup\.php\?ok=3&safeid=\w+)" target="_self">你可以领取\s*(\d+)KFB\s*\+\s*(\d+)经验\s*\+\s*(\d+(?:\.\d+)?)贡献/.exec(html);
        if (matches) {
            var url = matches[1];
            var gain = {};
            if (parseInt(matches[2]) > 0) gain['KFB'] = parseInt(matches[2]);
            if (parseInt(matches[3]) > 0) gain['经验值'] = parseInt(matches[3]);
            if (parseFloat(matches[4]) > 0) gain['贡献'] = parseFloat(matches[4]);

            $.get(url + '&t=' + $.now(), function (html) {
                showFormatLog('领取每日奖励', html);

                var _Util$getResponseMsg2 = Util.getResponseMsg(html),
                    msg = _Util$getResponseMsg2.msg;

                Msg.remove($wait);

                if (/领取成功/.test(msg)) {
                    Util.setCookie(_Const2.default.getDailyBonusCookieName, 1, getCookieDate());
                    var logStatText = '',
                        msgStatText = '';
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = Util.entries(gain)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var _step2$value = _slicedToArray(_step2.value, 2),
                                key = _step2$value[0],
                                num = _step2$value[1];

                            logStatText += key + '+' + num + ' ';
                            msgStatText += '<i>' + key + '<em>+' + num.toLocaleString() + '</em></i>';
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    console.log('领取每日奖励，' + logStatText);
                    Msg.show('<strong>领取每日奖励</strong>' + msgStatText);
                    if (!$.isEmptyObject(gain)) Log.push('领取每日奖励', '领取每日奖励', { gain: gain });
                    if (Config.promoteHaloLimit > 0) Util.deleteCookie(_Const2.default.promoteHaloCookieName);
                } else {
                    Util.setCookie(_Const2.default.getDailyBonusCookieName, -1, Util.getDate('+5m'));
                }
                Script.runFunc('Public.getDailyBonus_after_', msg);
            }).fail(function () {
                return Msg.remove($wait);
            });
        } else {
            Msg.remove($wait);
            Util.setCookie(_Const2.default.getDailyBonusCookieName, 1, getCookieDate());
        }
    }).fail(function () {
        Msg.remove($wait);
        $(document).queue('AutoAction', function () {
            setTimeout(getDailyBonus, _Const2.default.defAjaxInterval);
        });
    }).always(function () {
        setTimeout(function () {
            return $(document).dequeue('AutoAction');
        }, _Const2.default.minActionInterval);
    });
};

/**
 * 关注用户
 */
var followUsers = exports.followUsers = function followUsers() {
    if (!Config.followUserList.length) return;
    if (_Info2.default.isInHomePage && Config.highlightFollowUserThreadInHPEnabled) {
        $('.indexlbtc > a').each(function () {
            var $this = $(this);
            var userName = $this.attr('uname');
            if (!userName) return;
            if (Util.inFollowOrBlockUserList(userName, Config.followUserList) > -1) {
                $this.addClass('pd_highlight');
            }
        });
    } else if (location.pathname === '/thread.php') {
        $('a.bl[href^="profile.php?action=show&uid="]').each(function () {
            var $this = $(this);
            if (Util.inFollowOrBlockUserList($this.text(), Config.followUserList) > -1) {
                $this.addClass('pd_highlight');
                if (Config.highlightFollowUserThreadLinkEnabled) {
                    $this.parent('td').prev('td').prev('td').find('div > a[href^="read.php?tid="]').addClass('pd_highlight');
                }
            }
        });
    } else if (location.pathname === '/read.php') {
        $('.readidmsbottom > a[href^="profile.php?action=show"]').each(function () {
            var $this = $(this);
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
            var $this = $(this);
            if (Util.inFollowOrBlockUserList($this.text(), Config.followUserList) > -1) {
                $this.addClass('pd_highlight');
            }
        });
    } else if (location.pathname === '/search.php') {
        $('.thread1 a[href^="profile.php?action=show&uid="]').each(function () {
            var $this = $(this);
            if (Util.inFollowOrBlockUserList($this.text(), Config.followUserList) > -1) {
                $this.addClass('pd_highlight');
            }
        });
    }
};

/**
 * 屏蔽用户
 */
var blockUsers = exports.blockUsers = function blockUsers() {
    if (!Config.blockUserList.length) return;
    var num = 0;
    if (_Info2.default.isInHomePage) {
        $('.indexlbtc > a').each(function () {
            var $this = $(this);
            var userName = $this.attr('uname');
            if (!userName) return;
            var index = Util.inFollowOrBlockUserList(userName, Config.blockUserList);
            if (index > -1 && Config.blockUserList[index].type < 2) {
                num++;
                $this.parent('.indexlbtc').remove();
            }
        });
    } else if (location.pathname === '/thread.php') {
        var fid = parseInt($('input[name="f_fid"]:not([value="all"])').val());
        if (!fid) return;
        if (Config.blockUserForumType === 1 && !Config.blockUserFidList.includes(fid)) return;else if (Config.blockUserForumType === 2 && Config.blockUserFidList.includes(fid)) return;
        $('a.bl[href^="profile.php?action=show&uid="]').each(function () {
            var $this = $(this);
            var index = Util.inFollowOrBlockUserList($this.text(), Config.blockUserList);
            if (index > -1 && Config.blockUserList[index].type < 2) {
                num++;
                $this.closest('tr').remove();
            }
        });
    } else if (location.pathname === '/read.php') {
        if (Config.blockUserForumType > 0) {
            var _fid = parseInt($('input[name="fid"]:first').val());
            if (!_fid) return;
            if (Config.blockUserForumType === 1 && !Config.blockUserFidList.includes(_fid)) return;else if (Config.blockUserForumType === 2 && Config.blockUserFidList.includes(_fid)) return;
        }
        var page = Util.getCurrentThreadPage();
        $('.readidmsbottom > a[href^="profile.php?action=show"]').each(function (i) {
            var $this = $(this);
            var index = Util.inFollowOrBlockUserList(Util.getFloorUserName($this.text()), Config.blockUserList);
            if (index > -1) {
                var type = Config.blockUserList[index].type;
                if (i === 0 && page === 1 && type > 1) return;else if ((i === 0 && page !== 1 || i > 0) && type === 1) return;
                num++;
                var $floor = $this.closest('.readtext');
                $floor.prev('.readlou').remove();
                $floor.remove();
            }
        });
        $('.readtext fieldset:has(legend:contains("Quote:"))').each(function () {
            var $this = $(this);
            var text = $this.text();
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = Config.blockUserList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var data = _step3.value;

                    if (data.type === 1) continue;
                    try {
                        var regex1 = new RegExp('^Quote:\u5F15\u7528(\u7B2C\\d+\u697C|\u697C\u4E3B)' + data.name + '\u4E8E', 'i');
                        var regex2 = new RegExp('^Quote:\u56DE\\s*\\d+\u697C\\(' + data.name + '\\)\\s*\u7684\u5E16\u5B50', 'i');
                        if (regex1.test(text) || regex2.test(text)) {
                            $this.html('<legend>Quote:</legend><mark class="pd_custom_tips" title="\u88AB\u5C4F\u853D\u7528\u6237\uFF1A' + data.name + '">\u8BE5\u7528\u6237\u5DF2\u88AB\u5C4F\u853D</mark>');
                        }
                    } catch (ex) {}
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        });
    } else if (location.pathname === '/guanjianci.php' && Config.blockUserAtTipsEnabled) {
        $('.kf_share1 > tbody > tr > td:last-child').each(function () {
            var $this = $(this);
            if (Util.inFollowOrBlockUserList($this.text(), Config.blockUserList) > -1) {
                num++;
                $this.closest('tr').remove();
            }
        });
    }
    if (num > 0) console.log('\u3010\u5C4F\u853D\u7528\u6237\u3011\u5171\u6709' + num + '\u4E2A\u5E16\u5B50\u6216\u56DE\u590D\u88AB\u5C4F\u853D');
};

/**
 * 屏蔽帖子
 */
var blockThread = exports.blockThread = function blockThread() {
    if (!Config.blockThreadList.length) return;

    /**
     * 是否屏蔽帖子
     * @param {string} title 帖子标题
     * @param {string} userName 用户名
     * @param {number} fid 版块ID
     * @returns {boolean} 是否屏蔽
     */
    var isBlock = function isBlock(title, userName) {
        var fid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = Config.blockThreadList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var _step4$value = _step4.value,
                    keyWord = _step4$value.keyWord,
                    includeUser = _step4$value.includeUser,
                    excludeUser = _step4$value.excludeUser,
                    includeFid = _step4$value.includeFid,
                    excludeFid = _step4$value.excludeFid;

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
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        return false;
    };

    /**
     * 屏蔽左侧帖子推荐榜单
     * @param $area 屏蔽区域
     * @return {number} 屏蔽数量
     */
    var blockRecommendThread = function blockRecommendThread($area) {
        var tmpNum = 0;
        $area.each(function () {
            var $this = $(this);
            var title = $this.attr('title');
            if (!title) return;
            var matches = /^《(.+)》$/.exec(title);
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

    var num = 0;
    if (_Info2.default.isInHomePage) {
        num += blockRecommendThread($('.rightboxa a'));
        $('.indexlbtc a').each(function () {
            var $this = $(this);
            var title = $this.attr('title');
            if (!title) return;
            var matches = /^《(.+)》$/.exec(title);
            if (matches) {
                var uname = $this.attr('uname');
                if (isBlock(matches[1], uname)) {
                    num++;
                    $this.parent('.indexlbtc').remove();
                }
            }
        });
    } else if (location.pathname === '/thread.php') {
        num += blockRecommendThread($('.rightboxa a'));
        var fid = parseInt($('input[name="f_fid"]:not([value="all"])').val());
        if (!fid) return;
        $('.threadtit1 a[href^="read.php"]').each(function () {
            var $this = $(this);
            if (isBlock($this.text(), $this.closest('tr').find('td:last-child > a.bl').text(), fid)) {
                num++;
                $this.closest('tr').remove();
            }
        });
    } else if (location.pathname === '/read.php') {
        if (Util.getCurrentThreadPage() !== 1) return;
        var title = Read.getThreadTitle();
        if (!title) return;
        var $userName = $('.readidmsbottom > a[href^="profile.php?action=show"]').eq(0);
        if (!$userName.closest('.readtext').find('> table > tbody > tr > td:nth-child(2) > div > div:nth-child(2) > span:first-child').text().includes('楼主')) return;
        var userName = Util.getFloorUserName($userName.text());
        if (!userName) return;
        var _fid2 = parseInt($('input[name="fid"]:first').val());
        if (!_fid2) return;
        if (isBlock(title, userName, _fid2)) {
            num++;
            var $floor = $userName.closest('.readtext');
            $floor.prev('.readlou').remove();
            $floor.remove();
        }
    } else {
        num += blockRecommendThread($('.rightboxa a'));
    }
    if (num > 0) console.log('\u3010\u5C4F\u853D\u5E16\u5B50\u3011\u5171\u6709' + num + '\u4E2A\u5E16\u5B50\u88AB\u5C4F\u853D');
};

/**
 * 为顶部导航栏添加快捷导航菜单
 */
var addFastNavMenu = exports.addFastNavMenu = function addFastNavMenu() {
    var $menuBtn = $('#alldiv > .drow:nth-child(2) > .dcol > .topmenuo > .topmenuo1 > .topmenuo3:last-child > a:contains("游戏介绍")');
    if (!$menuBtn.length) return;
    $menuBtn.parent().after('\n<li class="topmenuo3">\n  <a href="javascript:;" style="width:100px;">\u5FEB\u6377\u5BFC\u822A</a>\n  <ul class="topmenuo2">\n      ' + (_Info2.default.isInSpecialDomain && !Config.showGuGuZhenInFastNavEnabled ? '' : '<li><a href="fyg_sjcdwj.php?go=play" target="_blank">咕咕镇</a></li>') + '\n      <li><a href="search.php?authorid=' + _Info2.default.uid + '">\u6211\u7684\u4E3B\u9898</a></li>\n      <li><a href="personal.php?action=post">\u6211\u7684\u56DE\u590D</a></li>\n      <li><a href="profile.php?action=favor">\u6536\u85CF</a></li>\n      <li><a href="profile.php?action=friend">\u597D\u53CB\u5217\u8868</a></li>\n      <li><a href="kf_fw_ig_index.php">\u4E89\u593A\u5956\u52B1</a></li>\n      <li><a href="kf_fw_ig_mybp.php">\u6211\u7684\u7269\u54C1</a></li>\n      <li><a href="kf_fw_ig_halo.php">\u6218\u529B\u5149\u73AF</a></li>\n      <li><a href="kf_fw_ig_shop.php">\u7269\u54C1\u5546\u5E97</a></li>\n      ' + (_Info2.default.isInSpecialDomain ? '<li><a href="https://m.miaola.work/" target="_blank">手机版</a></li>' : '') + '\n      ' + _Const2.default.customFastNavMenuContent + '\n  </ul>\n</li>');

    if (Config.adminMemberEnabled) {
        $('#alldiv > .drow:nth-child(2) > .dcol > .topmenuo > .topmenuo1 > .topmenuo3:nth-last-child(4) > a:contains("聊天交流")').next('ul').append('<li><a href="thread.php?fid=93">内部管理专用</a></li>');
    }
};

/**
 * 更换ID颜色
 */
var changeIdColor = exports.changeIdColor = function changeIdColor() {
    if (!Config.changeAllAvailableIdColorEnabled && Config.customAutoChangeIdColorList.length <= 1) return;

    /**
     * 写入Cookie
     */
    var setCookie = function setCookie() {
        var nextTime = Util.getDate('+' + Config.autoChangeIdColorInterval + 'h');
        Util.setCookie(_Const2.default.autoChangeIdColorCookieName, nextTime.getTime(), nextTime);
    };

    console.log('自动更换ID颜色Start');
    $.get('kf_growup.php?t=' + $.now(), function (html) {
        if (Util.getCookie(_Const2.default.autoChangeIdColorCookieName)) return;
        var matches = html.match(/href="kf_growup\.php\?ok=2&safeid=\w+&color=\d+"/g);
        if (matches) {
            var safeId = '';
            var safeIdMatches = /safeid=(\w+)&/i.exec(matches[0]);
            if (safeIdMatches) safeId = safeIdMatches[1];
            if (!safeId) {
                setCookie();
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
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = Config.customAutoChangeIdColorList[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var id = _step5.value;

                        if (availableIdList.includes(id)) idList.push(id);
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }
            }
            if (idList.length <= 1) {
                setCookie();
                return;
            }

            var prevId = parseInt(TmpLog.getValue(_Const2.default.prevAutoChangeIdColorTmpLogName));
            if (isNaN(prevId) || prevId < 0) prevId = 0;

            var nextId = 0;
            if (Config.autoChangeIdColorType.toLowerCase() === 'sequence') {
                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = idList.entries()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var _step6$value = _slicedToArray(_step6.value, 2),
                            _i = _step6$value[0],
                            _id = _step6$value[1];

                        if (_id > prevId) {
                            nextId = _id;
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                        }
                    } finally {
                        if (_didIteratorError6) {
                            throw _iteratorError6;
                        }
                    }
                }

                if (nextId === 0) nextId = idList[0];
            } else {
                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                    for (var _iterator7 = idList.entries()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                        var _step7$value = _slicedToArray(_step7.value, 2),
                            _i2 = _step7$value[0],
                            _id2 = _step7$value[1];

                        if (_id2 === prevId) {
                            idList.splice(_i2, 1);
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError7 = true;
                    _iteratorError7 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion7 && _iterator7.return) {
                            _iterator7.return();
                        }
                    } finally {
                        if (_didIteratorError7) {
                            throw _iteratorError7;
                        }
                    }
                }

                nextId = idList[Math.floor(Math.random() * idList.length)];
            }

            $.get('kf_growup.php?ok=2&safeid=' + safeId + '&color=' + nextId + '&t=' + $.now(), function (html) {
                setCookie();
                showFormatLog('自动更换ID颜色', html);

                var _Util$getResponseMsg3 = Util.getResponseMsg(html),
                    msg = _Util$getResponseMsg3.msg;

                if (/等级颜色修改完毕/.test(msg)) {
                    console.log('ID颜色更换为：' + nextId);
                    TmpLog.setValue(_Const2.default.prevAutoChangeIdColorTmpLogName, nextId);
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
var showElementTitleTips = exports.showElementTitleTips = function showElementTitleTips(e, title) {
    $('.pd_title_tips').remove();
    if (!title || !e.originalEvent) return;
    $('<div class="pd_title_tips">' + title.replace(/\n/g, '<br>') + '</div>').appendTo('body').css('left', e.originalEvent.pageX - 20).css('top', e.originalEvent.pageY + 15);
};

/**
 * 绑定包含title属性元素的点击事件（用于移动版浏览器）
 */
var bindElementTitleClick = exports.bindElementTitleClick = function bindElementTitleClick() {
    var excludeNodeNameList = ['A', 'IMG', 'INPUT', 'BUTTON', 'TEXTAREA', 'SELECT'];
    $(document).click(function (e) {
        var target = e.target;
        if (!target.title && !excludeNodeNameList.includes(target.nodeName) && target.parentNode && target.parentNode.title) target = target.parentNode;
        if (target.title && !excludeNodeNameList.includes(target.nodeName) && (!target.id || !target.id.startsWith('wy_')) && !$(target).is('.pd_editor_btn')) {
            showElementTitleTips(e, target.title);
        } else {
            $('.pd_title_tips').remove();
        }
    });
};

/**
 * 绑定搜索类型下拉菜单点击事件
 */
var bindSearchTypeSelectMenuClick = exports.bindSearchTypeSelectMenuClick = function bindSearchTypeSelectMenuClick() {
    $(document).on('click', '.pd_search_type', function () {
        var $menu = $(this);
        var $searchTypeList = $('.pd_search_type_list');
        if ($searchTypeList.length > 0) {
            $searchTypeList.remove();
            return;
        }
        var type = $menu.data('type');
        $searchTypeList = $('\n<ul class="pd_search_type_list">\n  <li>\u6807\u9898</li><li>\u4F5C\u8005</li><li>\u5173\u952E\u8BCD</li><li ' + (!Config.adminMemberEnabled ? 'hidden' : '') + '>\u7528\u6237\u540D</li>\n</ul>').appendTo('body');
        var offset = $menu.offset();
        $searchTypeList.css('top', offset.top + $menu.height() + 2).css('left', offset.left + 1);
        if (type === 'dialog') {
            $searchTypeList.css({
                'width': '65px',
                'left': offset.left - 1
            });
        }
        $searchTypeList.on('click', 'li', function () {
            var $this = $(this);
            var type = $this.text().trim();
            var $form = $menu.closest('form');
            var $keyWord = $form.find('input[name="keyword"], input[name="pwuser"]');
            $menu.find('span').text(type);
            if (type !== '关键词' && type !== '用户名') $form.attr('action', 'search.php?');
            if (type === '作者') $keyWord.attr('name', 'pwuser');else $keyWord.attr('name', 'keyword');
            var $searchRange = $form.find('[name="searchRange"][value="current"]');
            if ($searchRange.length > 0) {
                $searchRange.prop('disabled', type === '关键词' || type === '用户名' || !$searchRange.data('enabled'));
            }
            $searchTypeList.remove();
            $keyWord.focus();
        });
    });

    $(document).on('submit', 'form[name="pdSearchForm"]', function () {
        var $this = $(this);
        var type = $.trim($this.find('.pd_search_type > span').text());
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
var makeSearchByBelowTwoKeyWordAvailable = exports.makeSearchByBelowTwoKeyWordAvailable = function makeSearchByBelowTwoKeyWordAvailable() {
    $(document).on('submit', 'form[action="search.php?"]', function () {
        var $this = $(this);
        var $keyWord = $this.find('input[name="keyword"]');
        if (!$keyWord.length) return;
        var keyWord = $.trim($keyWord.val());
        if (!keyWord || Util.getStrByteLen(keyWord) > 2) return;
        $keyWord.val(keyWord + ' ' + keyWord);
        setTimeout(function () {
            $keyWord.val(keyWord);
        }, 200);
    });
};

/**
 * 添加搜索对话框链接
 */
var addSearchDialogLink = exports.addSearchDialogLink = function addSearchDialogLink() {
    $('<li><a data-name="search" href="#">搜索</a></li>').insertBefore(_Info2.default.$userMenu.find('> li:nth-last-child(3)')).find('[data-name="search"]').click(function (e) {
        e.preventDefault();
        var dialogName = 'pdSearchDialog';
        if ($('#' + dialogName).length > 0) return;
        var html = '\n<div class="pd_cfg_main">\n  <input name="step" value="2" type="hidden">\n  <input name="method" value="AND" type="hidden">\n  <input name="sch_area" value="0" type="hidden">\n  <input name="s_type" value="forum" type="hidden">\n  <input name="f_fid" value="all" type="hidden">\n  <input name="orderway" value="lastpost" type="hidden">\n  <input name="asc" value="DESC" type="hidden">\n  <div style="margin-top: 15px;">\n    <input class="pd_input" name="keyword" type="search" style="float: left; width: 175px; line-height: 26px;" placeholder="\u5173\u952E\u5B57">\n    <div class="pd_search_type" data-type="dialog"><span>\u6807\u9898</span><i>\u2228</i></div>\n    <button class="indloginm" name="submit" type="submit">\u641C\u7D22</button>\n  </div>\n  <div style="margin-bottom: 8px; line-height: 35px;">\n    <label><input name="searchRange" type="radio" value="all" checked> \u5168\u7AD9 </label>\n    <label><input name="searchRange" type="radio" value="current" disabled> \u672C\u7248</label>\n  </div>\n</div>';
        var $dialog = Dialog.create(dialogName, '搜索', html);

        $dialog.closest('form').attr({
            'name': 'pdSearchForm',
            'action': 'search.php?',
            'method': 'post',
            'target': '_blank'
        }).off('submit');

        var fid = parseInt($('input[name="f_fid"]:not([value="all"]), input[name="fid"]:first').val());
        if (fid) {
            $dialog.find('[name="searchRange"]').click(function () {
                var $this = $(this);
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
var repairBbsErrorCode = exports.repairBbsErrorCode = function repairBbsErrorCode() {
    _Info2.default.w.is_ie = false;
    if (location.pathname === '/read.php') _Info2.default.w.strlen = Util.getStrByteLen;
};

/**
 * 通过左右键进行翻页
 */
var turnPageViaKeyboard = exports.turnPageViaKeyboard = function turnPageViaKeyboard() {
    $(document).keydown(function (e) {
        if (e.keyCode !== 37 && e.keyCode !== 39) return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        var $page = $('.pages:first');
        var $curPage = $page.find('li > a[href="javascript:;"]');
        if (!$curPage.length) return;
        var curPage = Util.getCurrentThreadPage();
        var url = '';
        if (e.keyCode === 37) {
            if (curPage <= 1) return;
            url = $page.find('li > a:contains("上一页")').attr('href');
        } else {
            var matches = /&page=(\d+)/.exec($page.find('li:last-child > a').attr('href'));
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
var showCommonImportOrExportConfigDialog = exports.showCommonImportOrExportConfigDialog = function showCommonImportOrExportConfigDialog(title, configName, callback, callbackAfterSubmit) {
    var dialogName = 'pdCommonImOrExConfigDialog';
    if ($('#' + dialogName).length > 0) return;
    (0, _Config.read)();
    var html = '\n<div class="pd_cfg_main">\n  <div>\n    <strong>\u5BFC\u5165\u8BBE\u7F6E\uFF1A</strong>\u5C06\u8BBE\u7F6E\u5185\u5BB9\u7C98\u8D34\u5230\u6587\u672C\u6846\u4E2D\u5E76\u70B9\u51FB\u4FDD\u5B58\u6309\u94AE\u5373\u53EF<br>\n    <strong>\u5BFC\u51FA\u8BBE\u7F6E\uFF1A</strong>\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u522B\u5904\u5373\u53EF\n  </div>\n  <textarea name="commonConfig" style="width: 500px; height: 300px; word-break: break-all;"></textarea>\n</div>\n<div class="pd_cfg_btns">\n  <span class="pd_cfg_about"></span>\n  <button type="submit">\u4FDD\u5B58</button>\n  <button data-action="close" type="button">\u53D6\u6D88</button>\n</div>';
    var $dialog = Dialog.create(dialogName, '\u5BFC\u5165\u6216\u5BFC\u51FA' + title, html);
    var settings = $.type(configName) === 'object' ? configName.read() : Config[configName];

    $dialog.submit(function (e) {
        e.preventDefault();
        if (!confirm('是否导入文本框中的设置？')) return;
        var options = $.trim($dialog.find('[name="commonConfig"]').val());
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
            (0, _Config.write)();
        }
        alert('设置已导入');
        Dialog.close(dialogName);
        if (typeof callbackAfterSubmit === 'function') callbackAfterSubmit();else location.reload();
    });
    Dialog.show(dialogName);
    $dialog.find('[name="commonConfig"]').val(JSON.stringify(settings)).select().focus();
    if (typeof callback === 'function') callback($dialog);
    Script.runFunc('Public.showCommonImportOrExportConfigDialog_after_', { title: title, configName: configName });
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
var showCommonImportOrExportLogDialog = exports.showCommonImportOrExportLogDialog = function showCommonImportOrExportLogDialog(_ref) {
    var name = _ref.name,
        read = _ref.read,
        write = _ref.write,
        merge = _ref.merge,
        callback = _ref.callback,
        callbackAfterSubmit = _ref.callbackAfterSubmit;

    var dialogName = 'pdCommonImOrExLogDialog';
    if ($('#' + dialogName).length > 0) return;
    var log = read();
    var html = '\n<div class="pd_cfg_main">\n  <strong>\u5BFC\u5165' + name + '\uFF1A</strong>\u5C06' + name + '\u5185\u5BB9\u7C98\u8D34\u5230\u6587\u672C\u6846\u4E2D\u5E76\u70B9\u51FB\u5408\u5E76\u6216\u8986\u76D6\u6309\u94AE\u5373\u53EF<br>\n  <strong>\u5BFC\u51FA' + name + '\uFF1A</strong>\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u522B\u5904\u5373\u53EF<br>\n  <textarea name="log" style="width: 600px; height: 400px; word-break: break-all;"></textarea>\n</div>\n<div class="pd_cfg_btns">\n  <button name="merge" type="button" ' + (typeof merge !== 'function' ? 'hidden' : '') + '>\u5408\u5E76\u8BB0\u5F55</button>\n  <button name="overwrite" type="button" style="color: #f00;">\u8986\u76D6\u8BB0\u5F55</button>\n  <button data-action="close" type="button">\u5173\u95ED</button>\n</div>';

    var $dialog = Dialog.create(dialogName, '\u5BFC\u5165\u6216\u5BFC\u51FA' + name, html);
    $dialog.find('[name="merge"], [name="overwrite"]').click(function (e) {
        e.preventDefault();
        var action = $(this).attr('name');
        if (!confirm('\u662F\u5426\u5C06\u6587\u672C\u6846\u4E2D\u7684' + name + (action === 'overwrite' ? '覆盖' : '合并') + '\u5230\u672C\u5730\uFF1F')) return;
        var newLog = $.trim($dialog.find('[name="log"]').val());
        if (!newLog) return;
        try {
            newLog = JSON.parse(newLog);
        } catch (ex) {
            alert(name + '\u6709\u9519\u8BEF');
            return;
        }
        if (!newLog || $.type(newLog) !== 'object') {
            alert(name + '\u6709\u9519\u8BEF');
            return;
        }
        if (action === 'merge' && typeof merge === 'function') log = merge(log, newLog);else log = newLog;
        write(log);
        alert(name + '\u5DF2\u5BFC\u5165');
        if (typeof callbackAfterSubmit === 'function') callbackAfterSubmit();else location.reload();
    });

    Dialog.show(dialogName);
    $dialog.find('[name="log"]').val(JSON.stringify(log)).select().focus();
    if (typeof callback === 'function') callback($dialog);
    Script.runFunc('Public.showCommonImportOrExportLogDialog_after_', { name: name, read: read, write: write, merge: merge });
};

/**
 * 修改顶部导航栏的用户名旁新提醒的颜色
 */
var changeNewTipsColor = exports.changeNewTipsColor = function changeNewTipsColor() {
    var $msgTips = $('#pdUserName').find('span:first');
    if (!$msgTips.length) return;
    $msgTips.addClass('pd_new_tips');
    if (_Info2.default.$userMenu.find('a[href="message.php"]:contains("有新消息")').length > 0) {
        $msgTips.attr('id', 'pdNewMsgTips').css({ 'color': '#0099cc' });
    } else if (_Info2.default.$userMenu.find('a[href^="guanjianci.php?gjc="]:contains("有人@我")').length > 0) {
        $msgTips.attr('id', 'pdNewReplyTips');
    } else if (_Info2.default.$userMenu.find('a[href="kf_fw_1wkfb.php?ping=3"]:contains("有新评分")').length > 0) {
        $msgTips.attr('id', 'pdNewRateTips').css({ 'color': '#5cb85c' });
    }
};

/**
 * 添加慢速操作复选框
 * @param {jQuery} $area 待添加区域
 */
var addSlowActionChecked = exports.addSlowActionChecked = function addSlowActionChecked($area) {
    $('\n<label style="margin-right: 5px;">\n  <input name="slowActionEnabled" type="checkbox" ' + (Config.slowActionEnabled ? 'checked' : '') + '> \u6162\u901F\u64CD\u4F5C\n  <span class="pd_cfg_tips" title="\u5EF6\u957F\u90E8\u5206\u6279\u91CF\u64CD\u4F5C\u7684\u65F6\u95F4\u95F4\u9694\uFF08\u57283~7\u79D2\u4E4B\u95F4\uFF09\uFF0C\u5982\u4F7F\u7528\u9053\u5177\u3001\u6253\u5F00\u76D2\u5B50\u7B49">[?]</span>\n</label>\n').prependTo($area).find('input[name="slowActionEnabled"]').click(function () {
        var checked = $(this).prop('checked');
        $('input[name="slowActionEnabled"]').not(this).prop('checked', checked);
        if (Config.slowActionEnabled !== checked) {
            (0, _Config.read)();
            Config.slowActionEnabled = checked;
            (0, _Config.write)();
        }
    });
};

/**
 * 修改域名更换提示区域
 */
var modifyDomainTips = exports.modifyDomainTips = function modifyDomainTips() {
    $('#alldiv > .drow:first-child').has('div:contains("主域名更换")').insertBefore('#alldiv > .drow:last-child').addClass('pd_domain_tips').parent().find('> .drow:first-child').css('margin-top', '40px');
};

},{"./Config":3,"./ConfigDialog":4,"./Const":5,"./Dialog":6,"./Info":8,"./Item":9,"./Log":10,"./LogDialog":11,"./Loot":12,"./Msg":13,"./Read":17,"./Script":18,"./TmpLog":20,"./Util":21}],17:[function(require,module,exports){
/* 帖子模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addSignTips = exports.showBuyThreadLogDialog = exports.recordBuyThreadLog = exports.clearBuyThreadLog = exports.writeBuyThreadLog = exports.readBuyThreadLog = exports.getThreadTitle = exports.showAttachImageOutsideSellBox = exports.parseMediaTag = exports.addMoreSmileLink = exports.addCopyCodeLink = exports.addUserMemo = exports.modifyKFOtherDomainLink = exports.addMultiQuoteButton = exports.getMultiQuoteData = exports.handleBuyThreadBtn = exports.buyThreads = exports.showStatFloorDialog = exports.statFloor = exports.addStatAndBuyThreadBtn = exports.addCopyBuyersListOption = exports.adjustThreadContentFontSize = exports.modifyMySmColor = exports.modifyFloorSmColor = exports.fastGotoFloor = exports.addFastGotoFloorInput = exports.addFloorGotoLink = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Msg = require('./Msg');

var Msg = _interopRequireWildcard(_Msg);

var _Dialog = require('./Dialog');

var Dialog = _interopRequireWildcard(_Dialog);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Config = require('./Config');

var _Log = require('./Log');

var Log = _interopRequireWildcard(_Log);

var _Script = require('./Script');

var Script = _interopRequireWildcard(_Script);

var _Public = require('./Public');

var Public = _interopRequireWildcard(_Public);

var _Post = require('./Post');

var Post = _interopRequireWildcard(_Post);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * 为帖子里的每个楼层添加跳转链接
 */
var addFloorGotoLink = exports.addFloorGotoLink = function addFloorGotoLink() {
    var sf = Util.getThreadSfParam();
    $('.readtext').find('> table > tbody > tr > td:nth-child(2) > div > div:nth-child(2) > span:first-child').each(function () {
        var $this = $(this);
        var floorText = $this.text();
        if (!/^\d+楼/.test(floorText)) return;
        var linkName = $this.closest('.readtext').prev('.readlou').prev('a').attr('name');
        if (!linkName || !/^\d+$/.test(linkName)) return;
        var url = Util.getHostNameUrl() + 'read.php?tid=' + Util.getUrlParam('tid') + '&spid=' + linkName + (sf ? '&sf=' + sf : '');
        $this.html($this.html().replace(/(\d+)楼/, '<a class="pd_goto_link" href="' + url + '" title="\u590D\u5236\u697C\u5C42\u94FE\u63A5">$1\u697C</a>'));
        $this.find('a').click(function (e) {
            e.preventDefault();
            var $this = $(this);
            var url = $this.attr('href');
            $this.data('copy-text', url);
            if (!Util.copyText($this, '楼层链接已复制')) {
                prompt('本楼的跳转链接（请按Ctrl+C复制）：', url);
            }
        });
    });
};

/**
 * 添加快速跳转到指定楼层的输入框
 */
var addFastGotoFloorInput = exports.addFastGotoFloorInput = function addFastGotoFloorInput() {
    $('\n<li class="pd_fast_goto_floor">\n    <form>\n        \u76F4\u8FBE <input class="pd_input" style="width: 30px;" type="text" maxlength="8">\n        <span data-name="submit" style="cursor: pointer;">\u697C</span>\n    </form>\n</li>\n').appendTo($('#read_tui').parent('li').parent('.b_tit2')).submit(function (e) {
        e.preventDefault();
        var floor = parseInt($(this).find('input').val());
        if (!floor || floor < 0) return;
        var sf = Util.getThreadSfParam();
        location.href = 'read.php?tid=' + Util.getUrlParam('tid') + '&page=' + (parseInt(floor / Config.perPageFloorNum) + 1) + '&floor=' + floor + '&sf=' + sf;
    }).find('[data-name="submit"]').click(function () {
        $(this).closest('form').submit();
    });
};

/**
 * 将页面滚动到指定楼层
 */
var fastGotoFloor = exports.fastGotoFloor = function fastGotoFloor() {
    var floor = parseInt(Util.getUrlParam('floor'));
    if (!floor || floor < 0) return;
    var $floorNode = $('.readtext > table > tbody > tr > td:nth-child(2) > div > div:nth-child(2) > span:first-child:contains("' + floor + '\u697C")');
    if (!$floorNode.length) return;
    var linkName = $floorNode.closest('.readtext').prev('.readlou').prev('a').attr('name');
    if (!linkName || !/^\d+$/.test(linkName)) return;
    location.hash = '#' + linkName;
};

/**
 * 修改指定楼层的神秘颜色
 * @param {jQuery} $elem 指定楼层的发帖者的用户名链接的jQuery对象
 * @param {string} color 神秘颜色
 */
var modifyFloorSmColor = exports.modifyFloorSmColor = function modifyFloorSmColor($elem, color) {
    $elem.css('color', color).parent('.readidmsbottom').next('.readidmsbottom').find('> span:nth-child(2)').css('color', color).parent('.readidmsbottom').next('.readidmsbottom').find('> span:nth-child(2)').css('color', color);
    $elem.closest('.readtext').css('box-shadow', '1px 1px 2px 2px ' + color).find('> table > tbody > tr > td:nth-child(2) > div').css('box-shadow', '1px 1px 2px 2px ' + color);
};

/**
 * 修改本人的神秘颜色
 */
var modifyMySmColor = exports.modifyMySmColor = function modifyMySmColor() {
    var $my = $('.readidmsbottom > a[href^="profile.php?action=show&uid=' + _Info2.default.uid + '"]');
    if ($my.length > 0) {
        modifyFloorSmColor($my, Config.customMySmColor);
    }
};

/**
 * 调整帖子内容字体大小
 */
var adjustThreadContentFontSize = exports.adjustThreadContentFontSize = function adjustThreadContentFontSize() {
    if (Config.threadContentFontSize > 0 && Config.threadContentFontSize !== 12) {
        $('head').append('\n<style>\n  .readtext > table > tbody > tr > td:nth-child(2) { font-size: ' + Config.threadContentFontSize + 'px; line-height: 1.6em; width: 100%; }\n  .readtext > table > tbody > tr > td:nth-child(2) > div > div:first-child,\n  .readtext > table > tbody > tr > td:nth-child(2) > div > div:nth-child(2),\n  .readtext .read_fds {\n    font-size: 14px;\n    line-height: 22px;\n  }\n</style>\n');
    }
};

/**
 * 添加复制购买人名单和查看购买帖子记录的选项
 */
var addCopyBuyersListOption = exports.addCopyBuyersListOption = function addCopyBuyersListOption() {
    $('.readtext select[name="buyers"]').each(function () {
        $(this).find('option:first-child').after('<option value="copyList">复制名单</option><option value="openBuyThreadLogDialog">查看购买记录</option>');
    });
    $(document).on('change', 'select[name="buyers"]', function () {
        var $this = $(this);
        var name = $this.val();
        if (name === 'copyList') {
            var buyerList = $this.find('option').map(function (index) {
                var name = $(this).text();
                if (index <= 2 || name.includes('-'.repeat(11))) return null;else return name;
            }).get().join('\n');
            $this.get(0).selectedIndex = 0;
            if (!buyerList) {
                alert('暂时无人购买');
                return;
            }

            var dialogName = 'pdCopyBuyerListDialog';
            if ($('#' + dialogName).length > 0) return;
            var html = '\n<div class="pd_cfg_main">\n  <textarea name="buyerList" style="width: 200px; height: 300px; margin: 5px 0;" readonly>' + buyerList + '</textarea>\n</div>';
            var $dialog = Dialog.create(dialogName, '购买人名单', html);
            Dialog.show(dialogName);
            $dialog.find('[name="buyerList"]').select().focus();
        } else if (name === 'openBuyThreadLogDialog') {
            $this.get(0).selectedIndex = 0;
            showBuyThreadLogDialog();
        }
    });
};

/**
 * 添加统计和购买帖子的按钮
 */
var addStatAndBuyThreadBtn = exports.addStatAndBuyThreadBtn = function addStatAndBuyThreadBtn() {
    $('<span style="margin: 0 5px;">|</span><a data-name="statAndBuyThread" title="统计回帖者名单以及批量购买帖子" href="#">统计和购买</a>').insertAfter('td > a[href^="kf_tidfavor.php?action=favor&tid="]').filter('[data-name="statAndBuyThread"]').click(function (e) {
        e.preventDefault();
        if ($('#pdStatFloorDialog').length > 0) return;

        var tid = parseInt(Util.getUrlParam('tid'));
        if (!tid) return;
        var value = $.trim(prompt('统计到第几楼？（0表示统计所有楼层，可用m-n的方式来设定统计楼层的区间范围）', 0));
        if (value === '') return;
        if (!/^\d+(-\d+)?$/.test(value)) {
            alert('统计楼层格式不正确');
            return;
        }
        var sf = Util.getThreadSfParam();
        var startFloor = 0,
            endFloor = 0;
        var valueArr = value.split('-');
        if (valueArr.length === 2) {
            startFloor = parseInt(valueArr[0]);
            endFloor = parseInt(valueArr[1]);
        } else endFloor = parseInt(valueArr[0]);
        if (endFloor < startFloor) {
            alert('统计楼层格式不正确');
            return;
        }
        var matches = /(\d+)页/.exec($('.pages:eq(0) > li:last-child > a').text());
        var maxPage = matches ? parseInt(matches[1]) : 1;
        if (startFloor === 0) startFloor = 1;
        if (endFloor === 0) endFloor = maxPage * Config.perPageFloorNum - 1;
        var startPage = Math.floor(startFloor / Config.perPageFloorNum) + 1;
        var endPage = Math.floor(endFloor / Config.perPageFloorNum) + 1;
        if (endPage > maxPage) endPage = maxPage;
        if (endPage - startPage > _Const2.default.statFloorMaxPage) {
            alert('需访问的总页数不可超过' + _Const2.default.statFloorMaxPage);
            return;
        }

        Msg.destroy();
        Msg.wait('<strong>\u6B63\u5728\u7EDF\u8BA1\u697C\u5C42\u4E2D&hellip;</strong><i>\u5269\u4F59\u9875\u6570\uFF1A<em class="pd_countdown">' + (endPage - startPage + 1) + '</em></i>' + '<a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
        statFloor(tid, startPage, endPage, startFloor, endFloor, sf);
    });
};

/**
 * 统计楼层
 * @param {number} tid 帖子ID
 * @param {number} startPage 开始页数
 * @param {number} endPage 结束页数
 * @param {number} startFloor 开始楼层号
 * @param {number} endFloor 结束楼层号
 * @param {string} sf 防采集代码
 */
var statFloor = exports.statFloor = function statFloor(tid, startPage, endPage, startFloor, endFloor, sf) {
    var isStop = false;
    var floorList = [];

    /**
     * 统计
     * @param {number} page 第几页
     */
    var stat = function stat(page) {
        $.ajax({
            type: 'GET',
            url: 'read.php?tid=' + tid + '&page=' + page + '&sf=' + sf + '&t=' + $.now(),
            timeout: _Const2.default.defAjaxTimeout,
            success: function success(html) {
                $('.readtext', html.replace(/src="[^"]+"/g, '')).each(function () {
                    var data = {};
                    var $floor = $(this);
                    var $floorHeader = $floor.prev('.readlou');
                    var floor = parseInt($floorHeader.find('> div:nth-child(2) > span:first-child').text());
                    if (!floor) return;
                    if (floor < startFloor) return;
                    if (floor > endFloor) {
                        isStop = true;
                        return false;
                    }
                    data.pid = parseInt($floorHeader.prev('.readlou').prev('a').attr('name'));

                    var $user = $floorHeader.prev('.readlou').find('.readidms, .readidm');
                    var $userLink = $user.find('a[href^="profile.php?action=show&uid="]');
                    data.userName = $userLink.text();

                    data.uid = '';
                    data.sf = '';
                    var userMatches = /profile\.php\?action=show&uid=(\d+)(?:&sf=(\w+))/.exec($userLink.attr('href'));
                    if (userMatches) {
                        data.uid = parseInt(userMatches[1]);
                        data.sf = userMatches[2];
                    }

                    data.smLevel = '';
                    var matches = /(\S+) 级神秘/.exec($user.find('.readidmsbottom, .readidmbottom').text());
                    if (matches) data.smLevel = matches[1];

                    var $buyer = $floor.find('[name="buyers"]:first');
                    data.status = 0;
                    if ($buyer.length > 0) {
                        var $input = $buyer.next('input');
                        data.status = $input.length > 0 ? 1 : 2;
                        if (data.status === 1) {
                            var _matches = /此帖售价\s*(\d+)\s*KFB/.exec($buyer.parent('legend').text());
                            if (_matches) data.sell = parseInt(_matches[1]);
                            _matches = /location\.href="(.+)"/i.exec($input.attr('onclick'));
                            if (_matches) data.buyUrl = _matches[1];
                        }
                    }
                    floorList[floor] = data;
                });

                var $countdown = $('.pd_countdown:last');
                $countdown.text(parseInt($countdown.text()) - 1);
                isStop = isStop || $countdown.closest('.pd_msg').data('stop');
            },
            error: function error() {
                setTimeout(function () {
                    return stat(page);
                }, _Const2.default.defAjaxInterval);
            },
            complete: function complete() {
                if (isStop || page >= endPage) {
                    Msg.destroy();
                    showStatFloorDialog(floorList);
                } else {
                    setTimeout(function () {
                        return stat(page + 1);
                    }, _Const2.default.defAjaxInterval);
                }
            }
        });
    };

    stat(startPage);
};

/**
 * 显示统计楼层对话框
 * @param {{}[]} floorList 楼层信息列表
 */
var showStatFloorDialog = exports.showStatFloorDialog = function showStatFloorDialog(floorList) {
    var dialogName = 'pdStatFloorDialog';
    var html = '\n<div class="pd_cfg_main">\n  <div id="pdStatFloorFilter" style="margin-top: 5px;">\n    <label><input name="removeRepeatedEnabled" type="checkbox"> \u53BB\u9664\u91CD\u590D</label>\n    <label><input name="removeTopFloorEnabled" type="checkbox"> \u53BB\u9664\u697C\u4E3B</label>\n  </div>\n  <div id="pdStatFloorSelectBtns">\n    <label style="margin-left: 3px;">\u552E\u4EF7\u533A\u95F4\uFF1A</label>\n    <input name="startSell" type="number" value="1" min="1" max="100" style="width: 40px;"> -\n    <input name="endSell" type="number" value="100" min="1" max="100" style="width: 40px;">\n    <label style="margin-left: 3px;">\n      \u6BCF\u540D\u7528\u6237\u9650\u9009 <input name="limitNum" type="number" min="0" style="width: 32px;"> \u4E2A\n    </label>\n    <a class="pd_btn_link" data-name="selectFilter" href="#">\u7B5B\u9009</a><br>\n    <a class="pd_btn_link" data-name="selectAll" href="#">\u5168\u9009</a>\n    <a class="pd_btn_link" data-name="selectInverse" href="#">\u53CD\u9009</a>\n  </div>\n  <div class="pd_highlight" style="text-align: center;">\n    \u5171\u663E\u793A<b id="pdStatFloorShowCount">0</b>\u6761\u9879\u76EE\uFF0C\u5171\u9009\u62E9<b id="pdStatFloorSelectCount">0</b>\u6761\u9879\u76EE\n  </div>\n  <table style="line-height: 1.8em; text-align: center;">\n    <thead>\n      <tr>\n        <th style="width: 30px;"></th>\n        <th style="width: 65px;">\u697C\u5C42\u53F7</th>\n        <th style="width: 120px;">\u7528\u6237\u540D</th>\n        <th style="width: 80px;">\u795E\u79D8\u7B49\u7EA7</th>\n        <th style="width: 100px;">\n          \u552E\u4EF7(KFB) <span class="pd_cfg_tips" title="\u6CE8\uFF1A\u552E\u4EF7\u4FE1\u606F\u5728\u7EDF\u8BA1\u540E\u53EF\u80FD\u4F1A\u53D1\u751F\u53D8\u5316\uFF0C\u5982\u6709\u5FC5\u8981\uFF0C\u5EFA\u8BAE\u5C3D\u5FEB\u8D2D\u4E70\u5E16\u5B50">[?]</span>\n        </th>\n      </tr>\n    </thead>\n    <tbody id="pdStatFloorList"></tbody>\n  </table>\n  <textarea name="statFloorListContent" style="margin-top: 8px; width: 250px; height: 300px;" hidden></textarea>\n</div>\n\n<div class="pd_cfg_btns">\n  <button name="copyList" type="button" style="color: #00f;" title="\u590D\u5236\u6240\u6709\u6216\u6240\u9009\u697C\u5C42\u7684\u7528\u6237\u540D\u5355">\u590D\u5236\u540D\u5355</button>\n  <button name="buyThread" type="button" style="color: #f00;" title="\u6279\u91CF\u8D2D\u4E70\u6240\u9009\u697C\u5C42\u7684\u5E16\u5B50">\u8D2D\u4E70\u5E16\u5B50</button>\n  <button data-action="close" type="button">\u5173\u95ED</button>\n</div>';
    var $dialog = Dialog.create(dialogName, '统计楼层', html);
    var $statFloorFilter = $dialog.find('#pdStatFloorFilter');
    var $statFloorList = $dialog.find('#pdStatFloorList');
    var $statFloorListContent = $dialog.find('[name="statFloorListContent"]');
    var tid = Util.getUrlParam('tid');
    var sf = Util.getThreadSfParam();

    /**
     * 显示统计楼层列表
     */
    var showStatFloorList = function showStatFloorList() {
        var list = [].concat(_toConsumableArray(floorList));
        var isRemoveRepeated = $statFloorFilter.find('[name="removeRepeatedEnabled"]').prop('checked'),
            isRemoveTopFloor = $statFloorFilter.find('[name="removeTopFloorEnabled"]').prop('checked');
        if (isRemoveRepeated) {
            list = list.map(function (data, index, list) {
                if (!data) return null;else return list.findIndex(function (data2) {
                    return data2 && data2.userName === data.userName;
                }) === index ? data : null;
            });
        }
        if (isRemoveTopFloor) {
            var $topFloor = $('.readtext:first');
            if ($topFloor.prev('.readlou').prev('a').attr('name') === 'tpc') {
                var topFloorUserName = $topFloor.find('.readidmsbottom, .readidmbottom').find('a[href^="profile.php?action=show&uid="]').text();
                list = list.map(function (data) {
                    return data && data.userName !== topFloorUserName ? data : null;
                });
            }
        }
        var content = '',
            copyContent = '';
        var num = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = list.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = _slicedToArray(_step.value, 2),
                    floor = _step$value[0],
                    data = _step$value[1];

                if (!data) continue;
                content += '\n<tr>\n  <td>\n    <label>\n      <input data-status="' + data.status + '" data-sell="' + (data.sell ? data.sell : 0) + '" data-url="' + (data.buyUrl ? data.buyUrl : '') + '"\n        type="checkbox" value="' + data.userName + '">\n    </label>\n  </td>\n  <td><a href="read.php?tid=' + tid + '&spid=' + data.pid + (sf ? '&sf=' + sf : '') + '" target="_blank">' + floor + '\u697C</a></td>\n  <td><a href="profile.php?action=show&uid=' + data.uid + '&sf=' + data.sf + '" target="_blank" style="color: #000;">' + data.userName + '</a></td>\n  <td style="' + (data.smLevel.endsWith('W') || data.smLevel === 'MAX' ? 'color: #f39;' : '') + '">' + data.smLevel + '</td>\n  <td class="pd_stat">' + (data.status === 1 ? '<em>' + data.sell + '</em>' : '<span class="pd_notice">' + (!data.status ? '无' : '已买') + '</span>') + '</td>\n</tr>';
                copyContent += data.userName + '\n';
                num++;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        $statFloorList.html(content);
        $statFloorListContent.val(copyContent).data('copy-text', copyContent);
        $dialog.find('#pdStatFloorShowCount').text(num);
        $dialog.find('#pdStatFloorSelectCount').text(0);
    };

    $dialog.find('#pdStatFloorSelectBtns').on('click', '[data-name]', function (e) {
        e.preventDefault();
        var name = $(this).data('name');
        if (name === 'selectAll') Util.selectAll($statFloorList.find('[type="checkbox"]'));else if (name === 'selectInverse') Util.selectInverse($statFloorList.find('[type="checkbox"]'));else if (name === 'selectFilter') {
            var startSell = parseInt($dialog.find('[name="startSell"]').val());
            var endSell = parseInt($dialog.find('[name="endSell"]').val());
            var limitNum = parseInt($dialog.find('[name="limitNum"]').val());
            if (!limitNum || limitNum < 0) limitNum = 0;
            if (!startSell || startSell < 1 || !endSell || endSell < 1) return;
            var userStat = {};
            $statFloorList.find('[type="checkbox"]').each(function () {
                var $this = $(this);
                var status = parseInt($this.data('status'));
                if (!status) return;
                var sell = parseInt($this.data('sell'));
                var userName = $this.val();
                if (!(userName in userStat)) userStat[userName] = 0;
                userStat[userName]++;
                var isChecked = status === 1 && sell >= startSell && sell <= endSell;
                if (isChecked && limitNum > 0) {
                    if (userStat[userName] > limitNum) isChecked = false;
                }
                $this.prop('checked', isChecked);
            });
        }
        $dialog.find('#pdStatFloorSelectCount').text($statFloorList.find('[type="checkbox"]:checked').length);
    }).end().find('[name="copyList"]').click(function () {
        var $this = $(this);
        if ($this.text() === '取消复制') {
            $this.text('复制名单');
            $statFloorListContent.prop('hidden', true);
            $statFloorList.closest('table').prop('hidden', false);
            Dialog.resize(dialogName);
            return;
        }
        var type = 'all';
        var checked = $statFloorList.find('[type="checkbox"]:checked');
        if (checked.length > 0) {
            type = 'select';
            var copyContent = '';
            checked.each(function () {
                copyContent += $(this).val() + '\n';
            });
            $statFloorListContent.val(copyContent).data('copy-text', copyContent);
        }
        if (!Util.copyText($statFloorListContent, (type === 'all' ? '所有' : '所选') + '用户名单已复制')) {
            $this.text('取消复制');
            $statFloorList.closest('table').prop('hidden', true);
            $statFloorListContent.prop('hidden', false).select().focus();
            Dialog.resize(dialogName);
        }
    }).end().find('[name="buyThread"]').click(function () {
        var threadList = [];
        var totalSell = 0;
        if (!$statFloorList.find('[type="checkbox"]:checked').length) $dialog.find('[data-name="selectAll"]').click();
        $statFloorList.find('[type="checkbox"]:checked').each(function () {
            var $this = $(this);
            var url = $this.data('url');
            var sell = parseInt($this.data('sell'));
            if (url && sell > 0) {
                threadList.push({ url: url, sell: sell });
                totalSell += sell;
            }
        });
        if (!threadList.length) return;
        if (!confirm('\u4F60\u5171\u9009\u62E9\u4E86 ' + threadList.length + ' \u4E2A\u53EF\u8D2D\u4E70\u9879\uFF0C\u603B\u552E\u4EF7 ' + totalSell.toLocaleString() + ' KFB\uFF0C' + ('\u5747\u4EF7 ' + Util.getFixedNumLocStr(totalSell / threadList.length, 2) + ' KFB\uFF0C\u662F\u5426\u6279\u91CF\u8D2D\u4E70\uFF1F'))) return;
        Msg.destroy();
        Msg.wait('<strong>\u6B63\u5728\u8D2D\u4E70\u5E16\u5B50\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em class="pd_countdown">' + threadList.length + '</em></i>' + '<a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
        buyThreads(threadList);
    });

    if (Util.getCurrentThreadPage() !== 1) $statFloorFilter.find('[name="removeTopFloorEnabled"]').prop('disabled', true).parent('label').attr('title', '请在第1页进行统计');
    $statFloorFilter.on('click', '[type="checkbox"]', showStatFloorList);
    showStatFloorList();
    Dialog.show(dialogName);
    Script.runFunc('Read.showStatFloorDialog_after_');
};

/**
 * 购买帖子
 * @param {{}[]} threadList 购买帖子列表，{url}：购买帖子的URL；{sell}：购买帖子的售价
 */
var buyThreads = exports.buyThreads = function buyThreads(threadList) {
    var successNum = 0,
        failNum = 0,
        totalSell = 0;
    $(document).clearQueue('BuyThread');
    $.each(threadList, function (index, _ref) {
        var url = _ref.url,
            sell = _ref.sell;

        $(document).queue('BuyThread', function () {
            $.ajax({
                type: 'GET',
                url: url + '&t=' + $.now(),
                timeout: _Const2.default.defAjaxTimeout,
                success: function success(html) {
                    Public.showFormatLog('购买帖子', html);

                    var _Util$getResponseMsg = Util.getResponseMsg(html),
                        msg = _Util$getResponseMsg.msg;

                    if (/操作完成/.test(msg)) {
                        successNum++;
                        totalSell += sell;
                    } else failNum++;
                },
                error: function error() {
                    failNum++;
                },
                complete: function complete() {
                    var $countdown = $('.pd_countdown:last');
                    $countdown.text(parseInt($countdown.text()) - 1);
                    var isStop = $countdown.closest('.pd_msg').data('stop');
                    if (isStop) $(document).clearQueue('BuyThread');

                    if (isStop || index === threadList.length - 1) {
                        Msg.destroy();
                        if (successNum > 0) {
                            Log.push('购买帖子', '\u5171\u6709`' + successNum + '`\u4E2A\u5E16\u5B50\u8D2D\u4E70\u6210\u529F', { pay: { 'KFB': -totalSell } });
                        }
                        console.log('\u5171\u6709' + successNum + '\u4E2A\u5E16\u5B50\u8D2D\u4E70\u6210\u529F\uFF0C\u5171\u6709' + failNum + '\u4E2A\u5E16\u5B50\u8D2D\u4E70\u5931\u8D25\uFF0CKFB-' + totalSell);
                        Msg.show('<strong>\u5171\u6709<em>' + successNum + '</em>\u4E2A\u5E16\u5B50\u8D2D\u4E70\u6210\u529F' + (failNum > 0 ? '\uFF0C\u5171\u6709<em>' + failNum + '</em>\u4E2A\u5E16\u5B50\u8D2D\u4E70\u5931\u8D25' : '') + '</strong>' + ('<i>KFB<ins>-' + totalSell + '</ins></i>'), -1);
                        Script.runFunc('Read.buyThreads_after_', threadList);
                    } else {
                        setTimeout(function () {
                            return $(document).dequeue('BuyThread');
                        }, _Const2.default.defAjaxInterval);
                    }
                }
            });
        });
    });
    $(document).dequeue('BuyThread');
};

/**
 * 处理购买帖子按钮
 */
var handleBuyThreadBtn = exports.handleBuyThreadBtn = function handleBuyThreadBtn() {
    $('.readtext input[type="button"][value="愿意购买,支付KFB"]').each(function () {
        var $this = $(this);
        var matches = /此帖售价\s*(\d+)\s*KFB/.exec($this.closest('legend').contents().eq(0).text());
        if (!matches) return;
        var sell = parseInt(matches[1]);
        matches = /location\.href="(.+?)"/i.exec($this.attr('onclick'));
        if (!matches) return;
        $this.data('sell', sell).data('url', matches[1]).removeAttr('onclick').click(function (e) {
            e.preventDefault();
            var $this = $(this);
            var sell = $this.data('sell');
            var url = $this.data('url');
            if (!sell || !url) return;
            if (sell >= _Const2.default.minBuyThreadWarningSell && !confirm('\u6B64\u8D34\u552E\u4EF7 ' + sell + ' KFB\uFF0C\u662F\u5426\u8D2D\u4E70\uFF1F')) return;
            if (Config.buyThreadNoJumpEnabled) {
                var $wait = Msg.wait('<strong>正在购买帖子&hellip;</strong>');
                $.get(url + '&t=' + $.now(), function (html) {
                    Public.showFormatLog('购买帖子', html);

                    var _Util$getResponseMsg2 = Util.getResponseMsg(html),
                        msg = _Util$getResponseMsg2.msg;

                    Msg.remove($wait);
                    if (/操作完成/.test(msg)) {
                        if (Config.saveBuyThreadLogEnabled) {
                            var urlMatches = /tid=(\d+)&pid=(\d+|tpc)/.exec(url);
                            if (!urlMatches) return;
                            var fid = parseInt($('input[name="fid"]:first').val());
                            var tid = parseInt(urlMatches[1]);
                            var pid = urlMatches[2];
                            var forumName = $('a[href^="kf_tidfavor.php?action=favor"]').parent().find('a[href^="thread.php?fid="]:last').text().trim();
                            var threadTitle = getThreadTitle();
                            var userName = $this.closest('.readtext').find('.readidmsbottom, .readidmbottom').find('a[href^="profile.php?action=show"]').text().trim();
                            recordBuyThreadLog({ fid: fid, tid: tid, pid: pid, forumName: forumName, threadTitle: threadTitle, userName: userName, sell: sell });
                        }
                        location.reload();
                    } else if (/您已经购买此帖/.test(msg)) {
                        alert('你已经购买过此帖');
                        location.reload();
                    } else {
                        alert('帖子购买失败');
                    }
                });
            } else location.href = url;
        });
    });
};

/**
 * 获取多重引用数据
 * @returns {Object[]} 多重引用数据列表
 */
var getMultiQuoteData = exports.getMultiQuoteData = function getMultiQuoteData() {
    var quoteList = [];
    $('.pd_multi_quote_chk input:checked').each(function () {
        var $floor = $(this).closest('.readtext');
        var matches = /(\d+)楼/.exec($floor.find('.pd_goto_link').text());
        var floor = matches ? parseInt(matches[1]) : 0;
        var pid = $floor.prev('.readlou').prev('a').attr('name');
        var userName = Util.getFloorUserName($floor.find('.readidmsbottom > a[href^="profile.php?action=show&uid="]').text());
        if (!userName) return;
        quoteList.push({ floor: floor, pid: pid, userName: userName });
    });
    return quoteList;
};

/**
 * 添加多重回复和多重引用的按钮
 */
var addMultiQuoteButton = exports.addMultiQuoteButton = function addMultiQuoteButton() {
    var replyUrl = $('a[href^="post.php?action=reply"].b_tit2').attr('href');
    if (!replyUrl) return;
    $('<label title="多重引用" class="pd_multi_quote_chk"><input type="checkbox"> 引</label>').appendTo('.readtext > table > tbody > tr > td:nth-child(2) > div > div:nth-child(2)').find('input').click(function () {
        var tid = parseInt(Util.getUrlParam('tid'));
        var data = localStorage[_Const2.default.multiQuoteStorageName];
        if (data) {
            try {
                data = JSON.parse(data);
                if (!data || $.type(data) !== 'object' || $.isEmptyObject(data)) data = null;else if (typeof data.tid === 'undefined' || data.tid !== tid || !Array.isArray(data.quoteList)) data = null;
            } catch (ex) {
                data = null;
            }
        } else {
            data = null;
        }
        var quoteList = getMultiQuoteData();
        if (!data) {
            localStorage.removeItem(_Const2.default.multiQuoteStorageName);
            data = { tid: tid, quoteList: [] };
        }
        var page = Util.getCurrentThreadPage();
        if (quoteList.length > 0) data.quoteList[page] = quoteList;else delete data.quoteList[page];
        localStorage[_Const2.default.multiQuoteStorageName] = JSON.stringify(data);
    });
    $('.readtext:last').next('.c').next('div').find('> table > tbody > tr > td:last-child').css({ 'text-align': 'right', 'width': '320px' }).append('<span class="b_tit2" style="margin-left: 5px;"><a style="display: inline-block;" href="#" title="\u591A\u91CD\u56DE\u590D">\u56DE\u590D</a> ' + ('<a style="display: inline-block;" href="' + replyUrl + '&multiquote=1" title="\u591A\u91CD\u5F15\u7528">\u5F15\u7528</a></span>')).find('.b_tit2 > a:eq(0)').click(function (e) {
        e.preventDefault();
        Post.handleMultiQuote(1);
    });
};

/**
 * 将帖子和短消息中的绯月其它域名的链接修改为当前域名
 */
var modifyKFOtherDomainLink = exports.modifyKFOtherDomainLink = function modifyKFOtherDomainLink() {
    $('.readtext a, .thread2 a').each(function () {
        var $this = $(this);
        var url = $this.attr('href');
        if (/m\.miaola\.(info|work)\//i.test(url)) return;
        var matches = /^(https?:\/\/(?:[\w\.]+?\.)?(?:2dgal|ddgal|9gal|9baka|9moe|kfgal|2dkf|ikfol|kfacg|fygal|bakabbs|365gal|365galgame|kforz|kfmax|9shenmi|kfpromax|miaola|koyuki)\.\w+?\/)\w+\.php/i.exec(url);
        if (matches) $this.attr('href', url.replace(matches[1], Util.getHostNameUrl()));
    });
};

/**
 * 添加用户自定义备注
 */
var addUserMemo = exports.addUserMemo = function addUserMemo() {
    if ($.isEmptyObject(Config.userMemoList)) return;
    $('.readidmsbottom > a[href^="profile.php?action=show&uid="]').each(function () {
        var $this = $(this);
        var userName = Util.getFloorUserName($this.text().trim());
        var key = Object.keys(Config.userMemoList).find(function (name) {
            return name === userName;
        });
        if (!key) return;

        var memo = Config.userMemoList[key];
        $this.after('<span class="pd_custom_tips pd_user_memo" title="\u5907\u6CE8\uFF1A' + memo + '">[?]</span>');
    });
};

/**
 * 添加复制代码的链接
 */
var addCopyCodeLink = exports.addCopyCodeLink = function addCopyCodeLink() {
    $('.readtext fieldset > legend:contains("Copy code")').html('<a class="pd_copy_code" href="#">复制代码</a>').parent('fieldset').addClass('pd_code_area');
    if (!$('.pd_copy_code').length) return;
    $('#alldiv').on('click', 'a.pd_copy_code', function (e) {
        e.preventDefault();
        var $this = $(this);
        var $fieldset = $this.closest('fieldset');
        if (Util.copyText($fieldset, '代码已复制', $this.parent())) return;

        var content = $fieldset.data('content');
        if (content) {
            $fieldset.html('<legend><a class="pd_copy_code" href="#">复制代码</a></legend>' + content).removeData('content');
        } else {
            var html = $fieldset.html();
            html = html.replace(/<legend>.+?<\/legend>/i, '');
            $fieldset.data('content', html);
            html = Util.htmlDecode(html);
            var height = $fieldset.height();
            height -= 17;
            if (height < 50) height = 50;
            if (height > 540) height = 540;
            $fieldset.html('\n<legend><a class="pd_copy_code" href="#">\u8FD8\u539F\u4EE3\u7801</a></legend>\n<textarea wrap="off" class="pd_textarea" style="width: 100%; height: ' + height + 'px; line-height: 1.4em; white-space: pre;">' + html + '</textarea>\n');
            $fieldset.find('textarea').select().focus();
        }
    });
};

/**
 * 在帖子页面添加更多表情的链接
 */
var addMoreSmileLink = exports.addMoreSmileLink = function addMoreSmileLink() {
    /**
     * 添加表情代码
     * @param {string} id 表情ID
     */
    var addSmileCode = function addSmileCode(id) {
        var textArea = $('textarea[name="atc_content"]').get(0);
        if (!textArea) return;
        var code = '[s:' + id + ']';
        Util.addCode(textArea, code);
        if (_Info2.default.isMobile) textArea.blur();else textArea.focus();
    };

    var $area = $('form[action="post.php?"] > div:first > table > tbody > tr:nth-child(2) > td:first-child');
    $area.on('click', 'a[href="javascript:;"]', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        if (id) addSmileCode(id);
    }).find('a[onclick^="javascript:addsmile"]').each(function () {
        var $this = $(this);
        var matches = /addsmile\((\d+)\)/i.exec($this.attr('onclick'));
        if (matches) {
            $this.data('id', matches[1]).removeAttr('onclick').attr('href', 'javascript:;');
        }
    });

    $('<a class="pd_highlight" href="#">[更多]</a>').appendTo($area).click(function (e) {
        e.preventDefault();
        var $this = $(this);
        var $panel = $('#pdSmilePanel');
        if ($panel.length > 0) {
            $this.text('[更多]');
            $panel.remove();
            return;
        }
        $this.text('[关闭]');

        var smileImageIdList = ['48', '35', '34', '33', '32', '31', '30', '29', '28', '27', '26', '36', '37', '47', '46', '45', '44', '43', '42', '41', '40', '39', '38', '25', '24', '11', '10', '09', '08', '01', '02', '03', '04', '05', '06', '12', '13', '23', '22', '21', '20', '19', '18', '17', '16', '15', '14', '07'];
        var smileCodeIdList = [57, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 45, 46, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 34, 33, 20, 19, 18, 17, 10, 11, 12, 13, 14, 15, 21, 22, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 16];
        var html = '';
        for (var i = 0; i < smileImageIdList.length; i++) {
            html += '<img src="' + _Info2.default.w.imgpath + '/post/smile/em/em' + smileImageIdList[i] + '.gif" alt="[\u8868\u60C5]" data-id="' + smileCodeIdList[i] + '">';
        }
        html = '<div class="pd_panel" id="pdSmilePanel" style="width: 308px; height: 185px;">' + html + '</div>';

        var offset = $area.offset();
        $panel = $(html).appendTo('body');
        $panel.css('top', offset.top - $panel.height() + 10).css('left', offset.left + $area.width() - $panel.width() - 10).on('click', 'img', function () {
            var id = $(this).data('id');
            if (id) addSmileCode(id);
        });
        Script.runFunc('Read.addMoreSmileLink_after_click_');
    });
};

/**
 * 在帖子页面解析多媒体标签
 */
var parseMediaTag = exports.parseMediaTag = function parseMediaTag() {
    $('.readtext > table > tbody > tr > td:nth-child(2)').each(function () {
        var $this = $(this);
        var html = $this.html();
        if (/\[(audio|video)\](http|ftp)[^<>]+\[\/(audio|video)\]/.test(html)) {
            $this.html(html.replace(/\[audio\]((?:http|ftp)[^<>]+?)\[\/audio\](?!<\/fieldset>)/g, '<audio src="$1" controls preload="none" style="margin: 3px 0;">[你的浏览器不支持audio标签]</audio>').replace(/\[video\]((?:http|ftp)[^<>]+?)\[\/video\](?!<\/fieldset>)/g, '<video src="$1" controls preload="none" style="max-width: ' + (Config.adjustThreadContentWidthEnabled ? 627 : 820) + 'px; margin:3px 0;">' + '[\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301video\u6807\u7B7E]</video>'));
        }
    });
};

/**
 * 显示在购买框之外的附件图片
 */
var showAttachImageOutsideSellBox = exports.showAttachImageOutsideSellBox = function showAttachImageOutsideSellBox() {
    if (Util.getCurrentThreadPage() !== 1) return;
    var $area = $('.readtext:first > table > tbody > tr > td:nth-child(2)');
    if (!$area.find('select[name="buyers"]').length) return;
    var html = $area.html();
    if (/\[attachment=\d+\]/.test(html)) {
        var pid = $area.closest('.readtext').prev('.readlou').prev('.readlou').prev('a').attr('name');
        var tid = Util.getUrlParam('tid');
        $area.html(html.replace(/\[attachment=(\d+)\]/g, '<img src="job.php?action=download&pid=' + pid + '&tid=' + tid + '&aid=$1" alt="[\u9644\u4EF6\u56FE\u7247]" style="max-width: 550px;" ' + ('onclick="if(this.width>=550) window.open(\'job.php?action=download&pid=' + pid + '&tid=' + tid + '&aid=$1\');">')));
    }
};

/**
 * 获取帖子标题
 * @returns {string} 帖子标题
 */
var getThreadTitle = exports.getThreadTitle = function getThreadTitle() {
    return $('form[name="delatc"] > div:first > table > tbody > tr > td > span:first').text().trim();
};

// 保存购买帖子记录的键值名称
var buyThreadLogName = _Const2.default.storagePrefix + 'buyThreadLog';

/**
 * 读取购买帖子记录
 * @returns {{}[]} 购买帖子记录
 */
var readBuyThreadLog = exports.readBuyThreadLog = function readBuyThreadLog() {
    var log = [];
    var options = Util.readData(buyThreadLogName + '_' + _Info2.default.uid);
    if (!options) return log;
    try {
        options = JSON.parse(options);
    } catch (ex) {
        return log;
    }
    if (!options || !Array.isArray(options)) return log;
    log = options;
    return log;
};

/**
 * 写入购买帖子记录
 * @param {{}[]} log 购买帖子记录
 */
var writeBuyThreadLog = exports.writeBuyThreadLog = function writeBuyThreadLog(log) {
    return Util.writeData(buyThreadLogName + '_' + _Info2.default.uid, JSON.stringify(log));
};

/**
 * 清除购买帖子记录
 */
var clearBuyThreadLog = exports.clearBuyThreadLog = function clearBuyThreadLog() {
    return Util.deleteData(buyThreadLogName + '_' + _Info2.default.uid);
};

/**
 * 记录一条新的购买帖子记录
 * @param {number} fid 版块ID
 * @param {number} tid 帖子ID
 * @param {string} pid 楼层ID
 * @param {string} forumName 版块名称
 * @param {string} threadTitle 贴子标题
 * @param {string} userName 购买贴的所有者
 * @param {number} sell 售价
 */
var recordBuyThreadLog = exports.recordBuyThreadLog = function recordBuyThreadLog(_ref2) {
    var fid = _ref2.fid,
        tid = _ref2.tid,
        pid = _ref2.pid,
        forumName = _ref2.forumName,
        threadTitle = _ref2.threadTitle,
        userName = _ref2.userName,
        sell = _ref2.sell;

    var log = readBuyThreadLog();
    log.push($.extend({ time: $.now() }, { fid: fid, tid: tid, pid: pid, forumName: forumName, threadTitle: threadTitle, userName: userName, sell: sell }));
    log = log.sort(function (a, b) {
        return a.time - b.time;
    }).slice(-Config.saveBuyThreadLogMaxNum);
    writeBuyThreadLog(log);
};

/**
 * 显示购买帖子记录对话框
 */
var showBuyThreadLogDialog = exports.showBuyThreadLogDialog = function showBuyThreadLogDialog() {
    var dialogName = 'pdBuyThreadLogDialog';
    if ($('#' + dialogName).length > 0) return;

    var log = readBuyThreadLog();
    var html = '\n<div class="pd_cfg_main">\n  <div style="margin-top: 5px;">\n    <label>\n      \u4FDD\u5B58\u6700\u8FD1\u7684 <input name="saveBuyThreadLogMaxNum" type="number" value="' + Config.saveBuyThreadLogMaxNum + '" min="1" max="10000" style="width: 60px;"> \u6761\u8BB0\u5F55\n    </label>\n    <a class="pd_btn_link" data-name="save" href="#">\u4FDD\u5B58</a>\n  </div>\n  <fieldset>\n    <legend>\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55 <span class="pd_stat" data-name="logHeaderInfo"></span></legend>\n    <div class="pd_stat pd_log_content" id="pdBuyThreadLog" style="width: 900px; max-height: 450px; height: auto;"></div>\n  </fieldset>\n</div>\n<div class="pd_cfg_btns">\n  <span class="pd_cfg_about"><a data-name="openImOrExBuyThreadLogDialog" href="#">\u5BFC\u5165/\u5BFC\u51FA\u8D2D\u4E70\u5E16\u5B50\u8BB0\u5F55</a></span>\n  <button data-action="close" type="button">\u5173\u95ED</button>\n  <button name="clear" type="button">\u6E05\u9664\u8BB0\u5F55</button>\n</div>';
    var $dialog = Dialog.create(dialogName, '购买帖子记录', html);
    var $buyThreadLog = $dialog.find('#pdBuyThreadLog');

    $dialog.find('[data-name="save"]').click(function (e) {
        e.preventDefault();
        var num = parseInt($dialog.find('[name="saveBuyThreadLogMaxNum"]').val());
        if (!num || num > 10000 || num < 0) {
            alert('数量取值范围：1-10000');
            return;
        }
        (0, _Config.read)();
        Config.saveBuyThreadLogMaxNum = num;
        (0, _Config.write)();
        alert('设置已保存');
    }).end().find('[data-name="openImOrExBuyThreadLogDialog"]').click(function (e) {
        e.preventDefault();
        Public.showCommonImportOrExportConfigDialog('购买帖子记录', { read: readBuyThreadLog, write: writeBuyThreadLog });
    }).end().find('[name="clear"]').click(function () {
        if (confirm('是否清除所有购买帖子记录？')) {
            clearBuyThreadLog();
            alert('购买帖子记录已清除');
        }
    });

    var logInfo = {};
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = log[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var info = _step2.value;

            var date = Util.getDateString(new Date(info.time));
            if (!(date in logInfo)) logInfo[date] = [];
            logInfo[date].push(info);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    var totalSell = 0;
    var logHtml = '';
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = Object.keys(logInfo).sort(function (a, b) {
            return a > b ? 1 : -1;
        })[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _date = _step3.value;

            var currentDateHtml = '';
            var currentDateTotalSell = 0;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = logInfo[_date][Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _step4$value = _step4.value,
                        time = _step4$value.time,
                        fid = _step4$value.fid,
                        tid = _step4$value.tid,
                        pid = _step4$value.pid,
                        forumName = _step4$value.forumName,
                        threadTitle = _step4$value.threadTitle,
                        userName = _step4$value.userName,
                        sell = _step4$value.sell;

                    totalSell += sell;
                    currentDateTotalSell += sell;
                    currentDateHtml += '\n<p>\n  <b>' + Util.getTimeString(new Date(time)) + '\uFF1A</b>[<a href="thread.php?fid=' + fid + '" target="_blank">' + forumName + '</a>]\n  \u300A<a href="read.php?tid=' + tid + (pid === 'tpc' ? '' : '&spid=' + pid) + '" target="_blank">' + threadTitle + '</a>\u300B\n  &nbsp;\u53D1\u5E16\u8005\uFF1A<a class="' + (!Config.adminMemberEnabled ? 'pd_not_click_link' : '') + '" href="profile.php?action=show&username=' + userName + '" target="_blank">' + userName + '</a>\n  &nbsp;\u552E\u4EF7\uFF1A<em>' + sell + '</em>KFB\n</p>';
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            logHtml += '<h3>\u3010' + _date + '\u3011 (\u5171<em>' + logInfo[_date].length + '</em>\u9879\uFF0C\u5408\u8BA1<em>' + currentDateTotalSell.toLocaleString() + '</em>KFB)</h3>' + currentDateHtml;
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    $buyThreadLog.html(logHtml ? logHtml : '暂无购买帖子记录（需开启“保存购买帖子记录”的功能）');
    $dialog.find('[data-name="logHeaderInfo"]').html('(\u5171<em>' + log.length + '</em>\u9879\uFF0C\u603B\u552E\u4EF7<em>' + totalSell.toLocaleString() + '</em>KFB)');

    Dialog.show(dialogName);
    var $lastChild = $buyThreadLog.find('p:last');
    if ($lastChild.length > 0) {
        $lastChild.get(0).scrollIntoView();
    }
    Script.runFunc('Read.showBuyThreadLogDialog_after_');
};

/**
 * 鼠标移到到签名可显示提示
 */
var addSignTips = exports.addSignTips = function addSignTips() {
    $('.readtext > table > tbody > tr > td:nth-child(2) > div > div:nth-child(2) > span:nth-child(3)').each(function () {
        var $this = $(this);
        $this.attr('title', $this.text()).addClass('pd_custom_tips');
    });
};

},{"./Config":3,"./Const":5,"./Dialog":6,"./Info":8,"./Log":10,"./Msg":13,"./Post":15,"./Public":16,"./Script":18,"./Util":21}],18:[function(require,module,exports){
/* 自定义脚本模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleInstallScriptLink = exports.showDialog = exports.runFunc = exports.addFunc = exports.runCmd = exports.runCustomScript = undefined;

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Dialog = require('./Dialog');

var Dialog = _interopRequireWildcard(_Dialog);

var _Config = require('./Config');

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Msg = require('./Msg');

var Msg = _interopRequireWildcard(_Msg);

var _Log = require('./Log');

var Log = _interopRequireWildcard(_Log);

var _TmpLog = require('./TmpLog');

var TmpLog = _interopRequireWildcard(_TmpLog);

var _Public = require('./Public');

var Public = _interopRequireWildcard(_Public);

var _Index = require('./Index');

var Index = _interopRequireWildcard(_Index);

var _Read = require('./Read');

var Read = _interopRequireWildcard(_Read);

var _Post = require('./Post');

var Post = _interopRequireWildcard(_Post);

var _Other = require('./Other');

var Other = _interopRequireWildcard(_Other);

var _Bank = require('./Bank');

var Bank = _interopRequireWildcard(_Bank);

var _Item = require('./Item');

var Item = _interopRequireWildcard(_Item);

var _Loot = require('./Loot');

var Loot = _interopRequireWildcard(_Loot);

var _ConfigDialog = require('./ConfigDialog');

var ConfigDialog = _interopRequireWildcard(_ConfigDialog);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 默认脚本名称
var defScriptName = '未命名脚本';
// 脚本meta信息的正则表达式
var metaRegex = /\/\/\s*==UserScript==((?:.|\n)+?)\/\/\s*==\/UserScript==/i;
// 自定义方法列表
var funcList = new Map();

/**
 * 执行自定义脚本
 * @param {string} type 脚本执行时机，start：在脚本开始时执行；end：在脚本结束时执行
 */
var runCustomScript = exports.runCustomScript = function runCustomScript() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'end';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Config.customScriptList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _step.value,
                enabled = _step$value.enabled,
                trigger = _step$value.trigger,
                content = _step$value.content;

            if (enabled && trigger === type && content) {
                runCmd(content);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};

/**
 * 运行命令
 * @param {string} cmd 命令
 * @param {boolean} isOutput 是否在控制台上显示结果
 * @returns {{result: boolean, response: string}} result：是否执行成功；response：执行结果
 */
var runCmd = exports.runCmd = function runCmd(cmd) {
    var isOutput = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var result = true;
    var response = '';
    try {
        response = eval(cmd);
        if (isOutput) console.log(response);
    } catch (ex) {
        result = false;
        response = ex;
        console.log(ex);
    }
    return { result: result, response: String(response) };
};

/**
 * 添加自定义方法
 * @param {string} name 自定义方法名称
 * @param {function} func 自定义方法
 */
var addFunc = exports.addFunc = function addFunc(name, func) {
    if (!funcList.has(name)) funcList.set(name, []);
    funcList.get(name).push(func);
};

/**
 * 执行自定义方法
 * @param {string} name 自定义方法名称
 * @param {*} [data] 自定义方法参数
 */
var runFunc = exports.runFunc = function runFunc(name, data) {
    if (funcList.has(name)) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = funcList.get(name)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var func = _step2.value;

                if (typeof func === 'function') {
                    try {
                        func(data);
                    } catch (ex) {
                        console.log(ex);
                    }
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    }
};

/**
 * 获取脚本meta信息
 * @param {string} content 脚本内容
 * @returns {{}} 脚本meta信息
 */
var getScriptMeta = function getScriptMeta(content) {
    var meta = {
        name: defScriptName,
        version: '',
        trigger: 'end',
        homepage: '',
        author: ''
    };
    var matches = metaRegex.exec(content);
    if (!matches) return meta;
    var metaContent = matches[1];
    matches = /@name[ \t]+(.*)/i.exec(metaContent);
    if (matches) meta.name = matches[1];
    matches = /@version[ \t]+(.*)/i.exec(metaContent);
    if (matches) meta.version = matches[1];
    matches = /@trigger[ \t]+(.*)/i.exec(metaContent);
    if (matches) meta.trigger = matches[1].toLowerCase() === 'start' ? 'start' : 'end';
    matches = /@homepage[ \t]+(.*)/i.exec(metaContent);
    if (matches) meta.homepage = matches[1];
    matches = /@author[ \t]+(.*)/i.exec(metaContent);
    if (matches) meta.author = matches[1];
    return meta;
};

/**
 * 显示自定义脚本对话框
 * @param {?number} showIndex 要显示的脚本的序号（-1表示最后一个）
 */
var showDialog = exports.showDialog = function showDialog() {
    var showIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var dialogName = 'pdCustomScriptDialog';
    if ($('#' + dialogName).length > 0) return;
    (0, _Config.read)();
    var html = '\n<div class="pd_cfg_main">\n  <div style="margin-top: 5px;">\n    <a class="pd_highlight pd_btn_link" data-name="addNewScript" href="#">\u6DFB\u52A0\u65B0\u811A\u672C</a>\n    <a class="pd_btn_link" data-name="insertSample" href="#">\u63D2\u5165\u8303\u4F8B</a>\n  </div>\n  <div data-name="customScriptList"></div>\n</div>\n<div class="pd_cfg_btns">\n  <span class="pd_cfg_about">\n    <a class="pd_btn_link pd_highlight" href="read.php?tid=500968&sf=b09" target="_blank">\u81EA\u5B9A\u4E49\u811A\u672C\u6536\u96C6\u8D34</a>\n    <a class="pd_btn_link" data-name="openImOrExCustomScriptDialog" href="#">\u5BFC\u5165/\u5BFC\u51FA\u6240\u6709\u811A\u672C</a>\n  </span>\n  <button type="submit">\u4FDD\u5B58</button>\n  <button data-action="close" type="button">\u53D6\u6D88</button>\n  <button class="pd_highlight" name="clear" type="button">\u6E05\u7A7A</button>\n</div>';
    var $dialog = Dialog.create(dialogName, '自定义脚本', html, 'min-width: 776px;');
    var $customScriptList = $dialog.find('[data-name="customScriptList"]');

    $dialog.submit(function (e) {
        e.preventDefault();
        Config.customScriptList = [];
        $customScriptList.find('.pd_custom_script_content').each(function () {
            var $this = $(this);
            var content = $this.val();
            if (!$.trim(content)) return;
            var enabled = $this.prev().find('[type="checkbox"]').prop('checked');
            Config.customScriptList.push($.extend(getScriptMeta(content), { enabled: enabled, content: content }));
        });
        (0, _Config.write)();
        Dialog.close(dialogName);
        alert('自定义脚本修改成功（需刷新页面后才可生效）');
    }).end().find('[name="clear"]').click(function (e) {
        e.preventDefault();
        if (confirm('是否清空所有脚本？')) {
            $customScriptList.html('');
            Dialog.resize(dialogName);
        }
    });

    /**
     * 添加自定义脚本
     * @param {boolean} enabled 是否启用脚本
     * @param {string} name 脚本名称
     * @param {string} version 版本号
     * @param {url} homepage 首页
     * @param {string} trigger 脚本执行时机
     * @param {string} content 脚本内容
     */
    var addCustomScript = function addCustomScript() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$enabled = _ref.enabled,
            enabled = _ref$enabled === undefined ? true : _ref$enabled,
            _ref$name = _ref.name,
            name = _ref$name === undefined ? defScriptName : _ref$name,
            _ref$version = _ref.version,
            version = _ref$version === undefined ? '' : _ref$version,
            _ref$homepage = _ref.homepage,
            homepage = _ref$homepage === undefined ? '' : _ref$homepage,
            _ref$trigger = _ref.trigger,
            trigger = _ref$trigger === undefined ? 'end' : _ref$trigger,
            _ref$content = _ref.content,
            content = _ref$content === undefined ? '' : _ref$content;

        $customScriptList.append('\n<div class="pd_custom_script_header">\n  <input type="checkbox" ' + (enabled ? 'checked' : '') + ' title="\u662F\u5426\u542F\u7528\u6B64\u811A\u672C">\n  <a class="pd_custom_script_name" href="#" style="margin-left: 5px;">[' + name + ']</a>\n  <span data-name="version" style="margin-left: 5px; color: #666;" ' + (!version ? 'hidden' : '') + '>' + version + '</span>\n  <span data-name="trigger" style="margin-left: 5px; color: ' + (trigger === 'start' ? '#f00' : '#00f') + ';" title="\u811A\u672C\u6267\u884C\u65F6\u673A">\n    [' + (trigger === 'start' ? '开始时' : '结束时') + ']\n  </span>\n  <a data-name="homepage" href="' + homepage + '" target="_blank" style="margin-left: 5px;" ' + (!homepage ? 'hidden' : '') + '>[\u4E3B\u9875]</a>\n  <a data-name="delete" href="#" style="margin-left: 5px; color: #666;">[\u5220\u9664]</a>\n</div>\n<textarea class="pd_custom_script_content" wrap="off">' + content + '</textarea>\n');
    };

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = Config.customScriptList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var data = _step3.value;

            addCustomScript(data);
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    $dialog.find('[data-name="addNewScript"]').click(function (e) {
        e.preventDefault();
        $customScriptList.find('.pd_custom_script_content').hide();
        addCustomScript();
        $customScriptList.find('.pd_custom_script_content:last').show().focus();
        Dialog.resize(dialogName);
    }).end().find('[data-name="insertSample"]').click(function (e) {
        e.preventDefault();
        var $content = $customScriptList.find('.pd_custom_script_content:visible');
        $content.val(('\n// ==UserScript==\n// @name        ' + defScriptName + '\n// @version     1.0\n// @author      ' + _Info2.default.userName + '\n// @trigger     end\n// @homepage    read.php?tid=500968&spid=12318348\n// @description \u8FD9\u662F\u4E00\u4E2A\u672A\u547D\u540D\u811A\u672C\n// ==/UserScript==\n').trim() + '\n' + $content.val()).focus();
    }).end().find('[data-name="openImOrExCustomScriptDialog"]').click(function (e) {
        e.preventDefault();
        Public.showCommonImportOrExportConfigDialog('自定义脚本', 'customScriptList');
    });

    $customScriptList.on('click', '.pd_custom_script_name', function (e) {
        e.preventDefault();
        $dialog.find('.pd_custom_script_content').hide();
        $(this).parent().next().show().focus();
        Dialog.resize(dialogName);
    }).on('click', '[data-name="delete"]', function (e) {
        e.preventDefault();
        if (!confirm('是否删除此脚本？')) return;
        var $header = $(this).closest('.pd_custom_script_header');
        $header.next().remove();
        $header.remove();
        Dialog.resize(dialogName);
    }).on('change', '.pd_custom_script_content', function () {
        var $this = $(this);

        var _getScriptMeta = getScriptMeta($this.val()),
            name = _getScriptMeta.name,
            version = _getScriptMeta.version,
            homepage = _getScriptMeta.homepage,
            trigger = _getScriptMeta.trigger;

        var $header = $this.prev();
        $header.find('.pd_custom_script_name').text('[' + (name ? name : defScriptName) + ']');
        $header.find('[data-name="version"]').text(version).prop('hidden', !version);
        $header.find('[data-name="homepage"]').attr('href', homepage ? homepage : '').prop('hidden', !homepage);
        $header.find('[data-name="trigger"]').html('[' + (trigger === 'start' ? '开始时' : '结束时') + ']').css('color', trigger === 'start' ? '#f00' : '#00f');
    });

    Dialog.show(dialogName);
    if (typeof showIndex === 'number') $customScriptList.find('.pd_custom_script_name').eq(showIndex).click();
};

/**
 * 处理安装自定义脚本按钮
 */
var handleInstallScriptLink = exports.handleInstallScriptLink = function handleInstallScriptLink() {
    $(document).on('click', 'a[href$="#install-script"]', function (e) {
        e.preventDefault();
        var $this = $(this);
        var $area = $this.nextAll('.pd_code_area').eq(0);
        if (!$area.length) return;
        var content = Util.htmlDecode($area.html().replace(/<legend>.+?<\/legend>/i, '')).trim();
        if (!metaRegex.test(content)) return;
        (0, _Config.read)();
        var meta = getScriptMeta(content);
        var index = Config.customScriptList.findIndex(function (script) {
            return script.name === meta.name && script.author === meta.author;
        });
        var type = index > -1 ? 1 : 0;
        if (!confirm('\u662F\u5426' + (type === 1 ? '更新' : '安装') + '\u6B64\u811A\u672C\uFF1F')) return;
        Config.customScriptEnabled = true;
        var script = $.extend(meta, { enabled: true, content: content });
        if (type === 1) Config.customScriptList[index] = script;else Config.customScriptList.push(script);
        (0, _Config.write)();
        Dialog.close('pdCustomScriptDialog');
        showDialog(index);
    });
};

},{"./Bank":2,"./Config":3,"./ConfigDialog":4,"./Const":5,"./Dialog":6,"./Index":7,"./Info":8,"./Item":9,"./Log":10,"./Loot":12,"./Msg":13,"./Other":14,"./Post":15,"./Public":16,"./Read":17,"./TmpLog":20,"./Util":21}],19:[function(require,module,exports){
/* 自助评分模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleGoodPostSubmit = exports.addLinksInPage = exports.refreshWaitCheckRatePage = exports.addUnrecognizedSizeWarning = exports.showErrorSizeSubmitWarning = exports.highlightRateErrorSize = exports.checkRateSize = undefined;

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Public = require('./Public');

var Public = _interopRequireWildcard(_Public);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 检查自助评分文件大小
 * @param {string} title 帖子标题
 * @param {number} ratingSize 评分大小
 * @returns {{}} 检查结果
 */
var checkRateSize = exports.checkRateSize = function checkRateSize(title, ratingSize) {
    var titleSize = 0;
    var matches = title.match(/\b(\d+(?:\.\d+)?)\s?(M|G)B?\b/ig);
    if (matches) {
        for (var i = 0; i < matches.length; i++) {
            var sizeMatches = /(\d+(?:\.\d+)?)\s?(M|G)/i.exec(matches[i]);
            if (!sizeMatches) continue;
            var size = parseFloat(sizeMatches[1]);
            if (sizeMatches[2].toUpperCase() === 'G') size *= 1024;
            titleSize += size;
        }
    }

    if (!titleSize || !ratingSize) {
        return { type: -1 };
    } else if (titleSize > ratingSize * (100 + _Const2.default.ratingErrorSizePercent) / 100 + 1 || titleSize < ratingSize * (100 - _Const2.default.ratingErrorSizePercent) / 100 - 1) {
        return { type: 1, titleSize: titleSize, ratingSize: ratingSize };
    } else return { type: 0 };
};

/**
 * 高亮自助评分错标文件大小
 */
var highlightRateErrorSize = exports.highlightRateErrorSize = function highlightRateErrorSize() {
    $('.adp1:eq(1) a[href^="read.php?tid="]').each(function () {
        var $this = $(this);
        var title = $this.text();
        var ratingSize = 0;
        var $ratingCell = $this.parent('td').next('td');
        var matches = /认定\[(\d+)\]/i.exec($ratingCell.text());
        if (matches) {
            ratingSize = parseInt(matches[1]);
        }

        var _checkRateSize = checkRateSize(title, ratingSize),
            type = _checkRateSize.type,
            titleSize = _checkRateSize.titleSize;

        if (type === -1) {
            $ratingCell.css('color', '#ff9933').attr('title', '标题文件大小无法解析').addClass('pd_custom_tips');
        } else if (type === 1) {
            $ratingCell.addClass('pd_highlight pd_custom_tips').attr('title', '\u6807\u9898\u6587\u4EF6\u5927\u5C0F(' + titleSize.toLocaleString() + 'M)\u4E0E\u8BA4\u5B9A\u6587\u4EF6\u5927\u5C0F(' + ratingSize.toLocaleString() + 'M)\u4E0D\u4E00\u81F4');
        }
    });
};

/**
 * 在提交自助评分时显示错标文件大小警告
 */
var showErrorSizeSubmitWarning = exports.showErrorSizeSubmitWarning = function showErrorSizeSubmitWarning() {
    $('form[name="mail1"]').submit(function () {
        var ratingSize = parseFloat($('[name="psize"]').val());
        if (isNaN(ratingSize) || ratingSize <= 0) return;
        if (parseInt($('[name="psizegb"]').val()) === 2) ratingSize *= 1024;
        var title = $('.adp1 a[href^="read.php?tid="]').text();

        var _checkRateSize2 = checkRateSize(title, ratingSize),
            type = _checkRateSize2.type,
            titleSize = _checkRateSize2.titleSize;

        if (type === 1) {
            return confirm('\u6807\u9898\u6587\u4EF6\u5927\u5C0F(' + titleSize.toLocaleString() + 'M)\u4E0E\u8BA4\u5B9A\u6587\u4EF6\u5927\u5C0F(' + ratingSize.toLocaleString() + 'M)\u4E0D\u4E00\u81F4\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F');
        }
    });
};

/**
 * 在自助评分页面添加无法识别标题文件大小的警告
 */
var addUnrecognizedSizeWarning = exports.addUnrecognizedSizeWarning = function addUnrecognizedSizeWarning() {
    var $title = $('.adp1 a[href^="read.php?tid="]');
    var title = $title.text();

    var _checkRateSize3 = checkRateSize(title, 1),
        type = _checkRateSize3.type;

    if (type === -1) {
        $title.parent().append('&nbsp;<span style="color: #ff9933;">(标题文件大小无法解析)</span>');
    }
};

/**
 * 当检测到待检查的评分记录含有负数倒计时的情况下，自动刷新页面
 */
var refreshWaitCheckRatePage = exports.refreshWaitCheckRatePage = function refreshWaitCheckRatePage() {
    if (!/剩余-\d+分钟/.test($('.adp1:eq(1) > tbody > tr:last-child > td:first-child').text())) return;

    /**
     * 刷新
     */
    var refresh = function refresh() {
        console.log('自动刷新Start');
        $.ajax({
            type: 'GET',
            url: 'kf_fw_1wkfb.php?ping=2&t=' + $.now(),
            timeout: 10000
        }).done(function (html) {
            if (/剩余-\d+分钟/.test(html)) setTimeout(refresh, _Const2.default.defAjaxInterval);
        }).fail(function () {
            return setTimeout(refresh, _Const2.default.defAjaxInterval);
        });
    };

    refresh();
};

/**
 * 在页面上添加相关链接
 */
var addLinksInPage = exports.addLinksInPage = function addLinksInPage() {
    if (/\/kf_fw_1wkfb\.php\?ping=5\b/.test(location.href)) {
        $('.adp1:last > tbody > tr:gt(0) > td:last-child').each(function () {
            var $this = $(this);
            var uid = parseInt($this.text());
            $this.wrapInner('<a class="' + (uid === _Info2.default.uid ? 'pd_highlight' : '') + ' ' + (!Config.adminMemberEnabled ? 'pd_not_click_link' : '') + '" href="profile.php?action=show&uid=' + uid + '" target="_blank"></a>');
        });
    } else if (/\/kf_fw_1wkfb\.php\?ping=6\b/.test(location.href)) {
        $('.adp1:last > tbody > tr:gt(1) > td:nth-child(3)').each(function () {
            var $this = $(this);
            var userName = $this.text().trim();
            if (userName === '0') return;
            $this.wrapInner('<a class="' + (userName === _Info2.default.userName ? 'pd_highlight' : '') + ' ' + (!Config.adminMemberEnabled ? 'pd_not_click_link' : '') + '" href="profile.php?action=show&username=' + userName + '" target="_blank"></a>');
        });
        $('.adp1:last > tbody > tr:gt(1) > td:last-child').each(function () {
            var $this = $(this);
            var matches = /\[(\d+)]板块/.exec($this.text());
            if (matches) $this.wrapInner('<a href="thread.php?fid=' + matches[1] + '" target="_blank"></a>');
        });
    } else if (/\/kf_fw_1wkfb\.php\?ping=8\b/.test(location.href)) {
        $('.adp1:last > tbody > tr:gt(1) > td:last-child').each(function () {
            var $this = $(this);
            $this.html($this.html().replace(/(管理|会员):([^\[\]]+)\]/g, '$1:<a class="' + (!Config.adminMemberEnabled ? 'pd_not_click_link' : '') + '" href="profile.php?action=show&username=$2" target="_blank">$2</a>]').replace(/\[帖子:(\d+)\]/, '[帖子:<a href="read.php?tid=$1" target="_blank">$1</a>]'));
        });
    } else if (/\/kf_fw_1wkfb\.php\?ping=9\b/.test(location.href)) {
        $('.adp1:last > tbody > tr:gt(2) > td:first-child').each(function () {
            var $this = $(this);
            $this.html($this.html().replace(/UID:(\d+)/, 'UID:<a class="' + (!Config.adminMemberEnabled ? 'pd_not_click_link' : '') + '" href="profile.php?action=show&uid=$1" target="_blank">$1</a>'));
        });
    } else if (/\/kf_fw_1wkfb\.php\?do=2\b/.test(location.href)) {
        var $node1 = $('.adp1 > tbody > tr:nth-of-type(4):contains("评分会员") > td:last-child');
        $node1.wrapInner('<a class="' + (!Config.adminMemberEnabled ? 'pd_not_click_link' : '') + '" href="profile.php?action=show&username=' + $node1.text().trim() + '" target="_blank"></a>');
        var $node2 = $('.adp1 > tbody > tr:nth-of-type(10) > td:last-child:contains("异议提出人")');
        $node2.html($node2.html().replace(/：(\S+)/, '\uFF1A<a class="' + (!Config.adminMemberEnabled ? 'pd_not_click_link' : '') + '" href="profile.php?action=show&username=$1" target="_blank">$1</a>'));
    }
};

/**
 * 处理优秀帖提交
 */
var handleGoodPostSubmit = exports.handleGoodPostSubmit = function handleGoodPostSubmit() {
    $('a[id^="cztz"]').attr('data-onclick', function () {
        return $(this).attr('onclick');
    }).removeAttr('onclick');

    $('#alldiv').on('click', 'a[onclick^="cztz"]', function () {
        var $this = $(this);
        var $floor = $this.closest('.readtext');
        if ($this.data('highlight')) {
            $floor.removeClass('pd_good_post_mark');
            $this.removeData('highlight');
        } else {
            $floor.addClass('pd_good_post_mark');
            $this.data('highlight', true);
        }
    }).on('click', 'a[id^="cztz"]', function () {
        var $this = $(this);
        if ($this.data('wait')) return;
        var $floor = $this.closest('.readtext');
        var url = $floor.find('.readidmsbottom, .readidmbottom').find('a[href^="profile.php?action=show"]').attr('href');
        var flag = false;
        $('.readidmsbottom, .readidmbottom').find('a[href="' + url + '"]').each(function () {
            var $currentFloor = $(this).closest('.readtext');
            if ($currentFloor.is($floor)) return;
            if ($currentFloor.find('.read_fds:contains("本帖为优秀帖")').length > 0) {
                flag = true;
                return false;
            }
        });
        if (flag && !confirm('在当前页面中该会员已经有回帖被评为优秀帖，是否继续？')) return;

        var safeId = Public.getSafeId();
        var matches = /cztzyx\('(\d+)','(\d+|tpc)'\)/.exec($this.data('onclick'));
        if (!matches || !safeId) return;
        $this.next('.pd_good_post_msg').remove();
        $this.data('wait', true);
        $.ajax({
            type: 'POST',
            url: 'diy_read_cztz.php',
            data: 'tid=' + matches[1] + '&pid=' + matches[2] + '&safeid=' + safeId,
            timeout: _Const2.default.defAjaxTimeout
        }).done(function (html) {
            if (/已将本帖操作为优秀帖|该楼层已经是优秀帖/.test(html)) {
                var $content = $floor.find('> table > tbody > tr > td');
                if (!$content.find('.read_fds:contains("本帖为优秀帖")').length) {
                    $content.find('.readidms, .readidm').after('<fieldset class="read_fds"><legend>↓</legend>本帖为优秀帖</fieldset>');
                }
            }
            if (!/已将本楼层提交为优秀帖申请/.test(html)) {
                $floor.removeClass('pd_good_post_mark');
            }
            $this.after('<span class="pd_good_post_msg" style="margin-left: 5px; color: #777;">(' + html + ')</span>');
        }).always(function () {
            return $this.removeData('wait');
        });
    });
};

},{"./Const":5,"./Info":8,"./Public":16}],20:[function(require,module,exports){
/* 临时日志模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteValue = exports.setValue = exports.getValue = exports.clear = exports.write = exports.read = undefined;

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 保存临时日志的键值名称
var name = _Const2.default.storagePrefix + 'tmp_log';

/**
 * 读取临时日志
 * @returns {{}} 临时日志对象
 */
var read = exports.read = function read() {
    var log = {};
    var options = Util.readData(name + '_' + _Info2.default.uid);
    if (!options) return log;
    try {
        options = JSON.parse(options);
    } catch (ex) {
        return log;
    }
    if (!options || $.type(options) !== 'object') return log;
    var allowKeys = [];
    for (var k in _Const2.default) {
        if (k.endsWith('TmpLogName')) allowKeys.push(_Const2.default[k]);
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(options)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _k = _step.value;

            if (!allowKeys.includes(_k)) delete options[_k];
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    log = options;
    return log;
};

/**
 * 写入临时日志
 * @param {{}} log 临时日志对象
 */
var write = exports.write = function write(log) {
    return Util.writeData(name + '_' + _Info2.default.uid, JSON.stringify(log));
};

/**
 * 清除临时日志
 */
var clear = exports.clear = function clear() {
    return Util.deleteData(name + '_' + _Info2.default.uid);
};

/**
 * 获取指定名称的临时日志内容
 * @param {string} key 日志名称
 * @returns {*} 日志内容
 */
var getValue = exports.getValue = function getValue(key) {
    var log = read();
    return key in log ? log[key] : null;
};

/**
 * 设置指定名称的临时日志内容
 * @param {string} key 日志名称
 * @param {*} value 日志内容
 */
var setValue = exports.setValue = function setValue(key, value) {
    var log = read();
    log[key] = value;
    write(log);
};

/**
 * 删除指定名称的临时日志
 * @param {string} key 日志名称
 */
var deleteValue = exports.deleteValue = function deleteValue(key) {
    var log = read();
    if (key in log) {
        delete log[key];
        write(log);
    }
};

},{"./Const":5,"./Info":8,"./Util":21}],21:[function(require,module,exports){
/* 工具模块 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFloorUserName = exports.ajax = exports.getThreadSfParam = exports.deleteData = exports.writeData = exports.readData = exports.selectInverse = exports.selectAll = exports.inFollowOrBlockUserList = exports.entries = exports.getResponseMsg = exports.copyText = exports.getSelText = exports.addCode = exports.getStrByteLen = exports.removeUnpairedBBCodeContent = exports.getFixedNumLocStr = exports.getCurrentThreadPage = exports.compareSmLevel = exports.isEdge = exports.isIE = exports.isOpera = exports.getStatFormatNumber = exports.getSortedObjectKeyList = exports.getObjectKeyList = exports.removeHtmlTag = exports.htmlDecode = exports.htmlEncode = exports.getGBKEncodeString = exports.getUrlParam = exports.deepEqual = exports.getDifferenceSetOfObject = exports.getHostNameUrl = exports.isBetweenInTimeRange = exports.getTimeDiffInfo = exports.getTimeString = exports.getDateString = exports.getDate = exports.getMidnightHourDate = exports.getTimezoneDateByTime = exports.getDateByTime = exports.deleteCookie = exports.getCookie = exports.setCookie = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 设置Cookie
 * @param {string} name Cookie名称
 * @param {*} value Cookie值
 * @param {?Date} date Cookie有效期，留空则表示有效期为浏览器进程
 * @param {string} prefix Cookie名称前缀
 */
var setCookie = exports.setCookie = function setCookie(name, value) {
    var date = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Info2.default.uid + '_' + _Const2.default.storagePrefix;

    document.cookie = '' + prefix + name + '=' + encodeURI(value) + (!date ? '' : ';expires=' + date.toUTCString()) + ';path=/;';
};

/**
 * 获取Cookie
 * @param {string} name Cookie名称
 * @param {string} prefix Cookie名称前缀
 * @returns {?string} Cookie值
 */
var getCookie = exports.getCookie = function getCookie(name) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Info2.default.uid + '_' + _Const2.default.storagePrefix;

    var regex = new RegExp('(^| )' + prefix + name + '=([^;]*)(;|$)');
    var matches = document.cookie.match(regex);
    if (!matches) return null;else return decodeURI(matches[2]);
};

/**
 * 删除Cookie
 * @param {string} name Cookie名称
 * @param {string} prefix Cookie名称前缀
 */
var deleteCookie = exports.deleteCookie = function deleteCookie(name) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Info2.default.uid + '_' + _Const2.default.storagePrefix;

    document.cookie = '' + prefix + name + '=;expires=' + getDate('-1y').toUTCString() + ';path=/;';
};

/**
 * 返回当天指定时间的Date对象
 * @param {string} time 指定的时间（例：22:30:00）
 * @returns {Date} 指定时间的Date对象
 */
var getDateByTime = exports.getDateByTime = function getDateByTime(time) {
    var date = new Date();

    var _time$split = time.split(':'),
        _time$split2 = _slicedToArray(_time$split, 3),
        hour = _time$split2[0],
        minute = _time$split2[1],
        second = _time$split2[2];

    if (typeof hour !== 'undefined') date.setHours(parseInt(hour));
    if (typeof minute !== 'undefined') date.setMinutes(parseInt(minute));
    if (typeof second !== 'undefined') date.setSeconds(parseInt(second));
    date.setMilliseconds(0);
    return date;
};

/**
 * 返回当天根据指定时区指定时间的Date对象
 * @param {string} time 指定的时间（例：22:30:00）
 * @param {number} timezoneOffset UTC时间与本地时间之间的时间差（例：东8区为-8）
 * @returns {Date} 指定时间的Date对象
 */
var getTimezoneDateByTime = exports.getTimezoneDateByTime = function getTimezoneDateByTime(time) {
    var timezoneOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Const2.default.forumTimezoneOffset;

    var date = new Date();

    var _time$split3 = time.split(':'),
        _time$split4 = _slicedToArray(_time$split3, 3),
        hour = _time$split4[0],
        minute = _time$split4[1],
        second = _time$split4[2];

    if (typeof hour !== 'undefined') date.setUTCHours(parseInt(hour) + timezoneOffset);
    if (typeof minute !== 'undefined') date.setUTCMinutes(parseInt(minute));
    if (typeof second !== 'undefined') date.setUTCSeconds(parseInt(second));
    date.setUTCMilliseconds(0);
    var now = new Date();
    if (now.getDate() > date.getDate() || now.getMonth() > date.getMonth() || now.getFullYear() > date.getFullYear()) {
        date.setDate(date.getDate() + 1);
    }
    return date;
};

/**
 * 获取距今N天的零时整点的Date对象
 * @param {number} days 距今的天数
 * @returns {Date} 距今N天的零时整点的Date对象
 */
var getMidnightHourDate = exports.getMidnightHourDate = function getMidnightHourDate(days) {
    var date = getDateByTime('00:00:00');
    date.setDate(date.getDate() + days);
    return date;
};

/**
 * 获取在当前时间的基础上的指定（相对）时间量的Date对象
 * @param {string} value 指定（相对）时间量，+或-：之后或之前（相对于当前时间）；无符号：绝对值；Y：完整年份；y：年；M：月；d：天；h：小时；m：分；s：秒；ms：毫秒
 * @returns {?Date} 指定（相对）时间量的Date对象
 * @example
 * getDate('+2y') 获取2年后的Date对象
 * getDate('+3M') 获取3个月后的Date对象
 * getDate('-4d') 获取4天前的Date对象
 * getDate('5h') 获取今天5点的Date对象（其它时间量与当前时间一致）
 * getDate('2015Y') 获取年份为2015年的Date对象
 */
var getDate = exports.getDate = function getDate(value) {
    var date = new Date();
    var matches = /^(-|\+)?(\d+)([a-zA-Z]{1,2})$/.exec(value);
    if (!matches) return null;
    var flag = typeof matches[1] === 'undefined' ? 0 : matches[1] === '+' ? 1 : -1;
    var increment = flag === -1 ? -parseInt(matches[2]) : parseInt(matches[2]);
    var unit = matches[3];
    switch (unit) {
        case 'Y':
            date.setFullYear(increment);
            break;
        case 'y':
            date.setFullYear(flag === 0 ? increment : date.getFullYear() + increment);
            break;
        case 'M':
            date.setMonth(flag === 0 ? increment : date.getMonth() + increment);
            break;
        case 'd':
            date.setDate(flag === 0 ? increment : date.getDate() + increment);
            break;
        case 'h':
            date.setHours(flag === 0 ? increment : date.getHours() + increment);
            break;
        case 'm':
            date.setMinutes(flag === 0 ? increment : date.getMinutes() + increment);
            break;
        case 's':
            date.setSeconds(flag === 0 ? increment : date.getSeconds() + increment);
            break;
        case 'ms':
            date.setMilliseconds(flag === 0 ? increment : date.getMilliseconds() + increment);
            break;
        default:
            return null;
    }
    return date;
};

/**
 * 获取指定Date对象的日期字符串
 * @param {?Date} [date] 指定Date对象，留空表示现在
 * @param {string} separator 分隔符
 * @returns {string} 日期字符串
 */
var getDateString = exports.getDateString = function getDateString(date) {
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';

    date = date ? date : new Date();
    var month = (date.getMonth() + 1).toString();
    var day = date.getDate().toString();
    return date.getFullYear() + separator + month.padStart(2, '0') + separator + day.padStart(2, '0');
};

/**
 * 获取指定Date对象的时间字符串
 * @param {?Date} [date] 指定Date对象，留空表示现在
 * @param {string} separator 分隔符
 * @param {boolean} isShowSecond 是否显示秒钟
 * @returns {string} 时间字符串
 */
var getTimeString = exports.getTimeString = function getTimeString() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ':';
    var isShowSecond = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var hour = date.getHours().toString();
    var minute = date.getMinutes().toString();
    var second = date.getSeconds().toString();
    return hour.padStart(2, '0') + separator + minute.padStart(2, '0') + (isShowSecond ? separator : '') + (isShowSecond ? second.padStart(2, '0') : '');
};

/**
 * 获取指定时间戳距现在所剩余时间的描述
 * @param {number} timestamp 指定时间戳
 * @returns {{hours: number, minutes: number, seconds: number}} 剩余时间的描述，hours：剩余的小时数；minutes：剩余的分钟数；seconds：剩余的秒数
 */
var getTimeDiffInfo = exports.getTimeDiffInfo = function getTimeDiffInfo(timestamp) {
    var diff = timestamp - $.now();
    if (diff > 0) {
        diff = Math.floor(diff / 1000);
        var hours = Math.floor(diff / 60 / 60);
        if (hours >= 0) {
            var minutes = Math.floor((diff - hours * 60 * 60) / 60);
            if (minutes < 0) minutes = 0;
            var seconds = Math.floor(diff - hours * 60 * 60 - minutes * 60);
            if (seconds < 0) seconds = 0;
            return { hours: hours, minutes: minutes, seconds: seconds };
        }
    }
    return { hours: 0, minutes: 0, seconds: 0 };
};

/**
 * 判断指定时间是否处于规定时间段内
 * @param {Date} time 指定时间
 * @param {string} range 规定时间段，例：'08:00:15-15:30:30'或'23:30-01:20'
 * @returns {?boolean} 是否处于规定时间段内，返回null表示规定时间段格式不正确
 */
var isBetweenInTimeRange = exports.isBetweenInTimeRange = function isBetweenInTimeRange(time, range) {
    var _range$split = range.split('-'),
        _range$split2 = _slicedToArray(_range$split, 2),
        range1 = _range$split2[0],
        range2 = _range$split2[1];

    if (typeof range2 === 'undefined') return null;
    var start = getDateByTime(range1);
    var end = getDateByTime(range2);
    if (end < start) {
        if (time > end) end.setDate(end.getDate() + 1);else start.setDate(start.getDate() - 1);
    }
    return time >= start && time <= end;
};

/**
 * 获取当前域名的URL
 * @returns {string} 当前域名的URL
 */
var getHostNameUrl = exports.getHostNameUrl = function getHostNameUrl() {
    return location.protocol + '//' + location.host + '/';
};

/**
 * 获取对象A在对象B中的相对补集
 * @param {Object} a 对象A
 * @param {Object} b 对象B
 * @returns {Object} 相对补集
 */
var getDifferenceSetOfObject = exports.getDifferenceSetOfObject = function getDifferenceSetOfObject(a, b) {
    var c = {};
    if ($.type(a) !== 'object' || $.type(b) !== 'object') return c;
    $.each(b, function (key, data) {
        if (key in a) {
            if (!deepEqual(a[key], data)) c[key] = data;
        }
    });
    return c;
};

/**
 * 深度比较两个对象是否相等
 * @param {*} a
 * @param {*} b
 * @returns {boolean} 是否相等
 */
var deepEqual = exports.deepEqual = function deepEqual(a, b) {
    if (a === b) return true;
    if ($.type(a) !== $.type(b)) return false;
    if (typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b)) return true;
    if ($.isArray(a) && $.isArray(b) || $.type(a) === 'object' && $.type(b) === 'object') {
        if (a.length !== b.length) return false;
        for (var i in $.extend($.isArray(a) ? [] : {}, a, b)) {
            if (typeof a[i] === 'undefined' || typeof b[i] === 'undefined') return false;
            if (!deepEqual(a[i], b[i])) return false;
        }
        return true;
    }
    return false;
};

/**
 * 获取URL中的指定参数
 * @param {string} name 参数名称
 * @returns {?string} URL中的指定参数
 */
var getUrlParam = exports.getUrlParam = function getUrlParam(name) {
    var regex = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var matches = location.search.substring(1).match(regex);
    if (matches) return decodeURI(matches[2]);else return null;
};

/**
 * 获取经过GBK编码后的字符串
 * @param {string} str 待编码的字符串
 * @returns {string} 经过GBK编码后的字符串
 */
var getGBKEncodeString = exports.getGBKEncodeString = function getGBKEncodeString(str) {
    var img = document.createElement('img');
    img.src = 'nothing?sp=' + str;
    document.body.appendChild(img);
    var encodeStr = img.src.split('nothing?sp=').pop();
    document.body.removeChild(img);
    return encodeStr;
};

/**
 * HTML转义编码
 * @param {string} str 待编码的字符串
 * @returns {string} 编码后的字符串
 */
var htmlEncode = exports.htmlEncode = function htmlEncode(str) {
    if (!str.length) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;').replace(/\'/g, '&#39;').replace(/\"/g, '&quot;').replace(/\n/g, '<br>');
};

/**
 * HTML转义解码
 * @param {string} str 待解码的字符串
 * @returns {string} 解码后的字符串
 */
var htmlDecode = exports.htmlDecode = function htmlDecode(str) {
    if (!str.length) return '';
    return str.replace(/<br\s*\/?>/gi, '\n').replace(/&quot;/gi, '\"').replace(/&#39;/gi, '\'').replace(/&nbsp;/gi, ' ').replace(/&gt;/gi, '>').replace(/&lt;/gi, '<').replace(/&amp;/gi, '&');
};

/**
 * 去除HTML标签
 * @param html HTML代码
 * @returns {string} 去除HTML标签的文本
 */
var removeHtmlTag = exports.removeHtmlTag = function removeHtmlTag(html) {
    return html ? html.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '') : '';
};

/**
 * 获取指定对象的关键字列表
 * @param {Object} obj 指定对象
 * @param {number} sortBy 是否排序，0：不排序；1：升序；-1：降序
 * @returns {string[]} 关键字列表
 */
var getObjectKeyList = exports.getObjectKeyList = function getObjectKeyList(obj) {
    var sortBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var list = [];
    if ($.type(obj) !== 'object') return list;
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

/**
 * 获取经过排序的指定对象的关键字列表
 * @param {string[]} sortKeyList 用于排序的关键字列表
 * @param {Object} obj 指定对象
 * @returns {string[]} 关键字列表
 */
var getSortedObjectKeyList = exports.getSortedObjectKeyList = function getSortedObjectKeyList(sortKeyList, obj) {
    var list = getObjectKeyList(obj);
    list.sort(function (a, b) {
        return sortKeyList.indexOf(a) > sortKeyList.indexOf(b) ? 1 : -1;
    });
    return list;
};

/**
 * 获取经过格式化的统计数字字符串
 * @param {number} num 待处理的数字
 * @returns {string} 经过格式化的数字字符串
 */
var getStatFormatNumber = exports.getStatFormatNumber = function getStatFormatNumber(num) {
    return num >= 0 ? '<em>+' + num.toLocaleString() + '</em>' : '<ins>' + num.toLocaleString() + '</ins>';
};

/**
 * 检测浏览器是否为Opera
 * @returns {boolean} 是否为Opera
 */
var isOpera = exports.isOpera = function isOpera() {
    return typeof _Info2.default.w.opera !== 'undefined';
};

/**
 * 检测浏览器是否为IE
 * @returns {boolean} 是否为IE
 */
var isIE = exports.isIE = function isIE() {
    return typeof navigator.msMaxTouchPoints !== 'undefined';
};

/**
 * 检测浏览器是否为Edge
 * @returns {boolean} 是否为Edge
 */
var isEdge = exports.isEdge = function isEdge() {
    return navigator.appVersion && navigator.appVersion.includes('Edge');
};

/**
 * 比较神秘等级高低
 * @param {string} a
 * @param {string} b
 * @returns {number} 比较结果，-1：a小于b；0：a等于b；1：a大于b
 */
var compareSmLevel = exports.compareSmLevel = function compareSmLevel(a, b) {
    var x = a.toUpperCase() === 'MAX' ? Number.MAX_VALUE : parseInt(a);
    var y = b.toUpperCase() === 'MAX' ? Number.MAX_VALUE : parseInt(b);
    if (x > y) return 1;else if (x < y) return -1;else return 0;
};

/**
 * 获取帖子当前所在的页数
 * @returns {number} 帖子当前所在的页数
 */
var getCurrentThreadPage = exports.getCurrentThreadPage = function getCurrentThreadPage() {
    var matches = /- (\d+) -/.exec($('.pages:first > li > a[href="javascript:;"]').text());
    return matches ? parseInt(matches[1]) : 1;
};

/**
 * 获取指定小数位的本地字符串
 * @param {number} num 数字
 * @param {number} digit 指定小数位
 * @returns {string} 指定小数位的本地字符串
 */
var getFixedNumLocStr = exports.getFixedNumLocStr = function getFixedNumLocStr(num) {
    var digit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var _num$toFixed$split = num.toFixed(digit).split('.'),
        _num$toFixed$split2 = _slicedToArray(_num$toFixed$split, 2),
        iNum = _num$toFixed$split2[0],
        dNum = _num$toFixed$split2[1];

    var iStr = parseInt(iNum).toLocaleString();
    var dStr = '';
    if (typeof dNum !== 'undefined') dStr = '.' + dNum;
    return iStr + dStr;
};

/**
 * 去除不配对的BBCode
 * @param {string} content 引用内容
 * @returns {string} 去除了不配对BBCode的内容
 */
var removeUnpairedBBCodeContent = exports.removeUnpairedBBCodeContent = function removeUnpairedBBCodeContent(content) {
    var startCodeList = [/\[color=.+?\]/g, /\[backcolor=.+?\]/g, /\[size=.+?\]/g, /\[font=.+?\]/g, /\[align=.+?\]/g, /\[b\]/g, /\[i\]/g, /\[u\]/g, /\[strike\]/g, /\[sup\]/g, /\[sub\]/g];
    var endCodeList = [/\[\/color\]/g, /\[\/backcolor\]/g, /\[\/size\]/g, /\[\/font\]/g, /\[\/align\]/g, /\[\/b\]/g, /\[\/i\]/g, /\[\/u\]/g, /\[\/strike\]/g, /\[\/sup\]/g, /\[\/sub\]/g];
    for (var i = 0; i < startCodeList.length; i++) {
        var startMatches = content.match(startCodeList[i]);
        var endMatches = content.match(endCodeList[i]);
        var startMatchesNum = startMatches ? startMatches.length : 0;
        var endMatchesNum = endMatches ? endMatches.length : 0;
        if (startMatchesNum !== endMatchesNum) {
            content = content.replace(startCodeList[i], '').replace(endCodeList[i], '');
        }
    }
    return content;
};

/**
 * 获取指定字符串的字节长度（1个GBK字符按2个字节来算）
 * @param {string} str 指定字符串
 * @returns {number} 字符串的长度
 */
var getStrByteLen = exports.getStrByteLen = function getStrByteLen(str) {
    var len = 0;
    var cLen = 2;
    for (var i = 0; i < str.length; i++) {
        len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? cLen : 1;
    }
    return len;
};

/**
 * 添加BBCode
 * @param textArea 文本框
 * @param {string} code BBCode
 * @param {string} selText 选择文本
 */
var addCode = exports.addCode = function addCode(textArea, code) {
    var selText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var startPos = !selText ? code.indexOf(']') + 1 : code.indexOf(selText);
    if (typeof textArea.selectionStart !== 'undefined') {
        var prePos = textArea.selectionStart;
        textArea.value = textArea.value.substring(0, prePos) + code + textArea.value.substring(textArea.selectionEnd);
        textArea.selectionStart = prePos + startPos;
        textArea.selectionEnd = prePos + startPos + selText.length;
    } else {
        textArea.value += code;
    }
};

/**
 * 获取选择文本
 * @param textArea 文本框
 * @returns {string} 选择文本
 */
var getSelText = exports.getSelText = function getSelText(textArea) {
    return textArea.value.substring(textArea.selectionStart, textArea.selectionEnd);
};

/**
 * 复制文本
 * @param {jQuery} $target 要复制文本的目标元素
 * @param {string} msg 复制成功的消息
 * @param {jQuery} $excludeElem 要排除复制的元素
 * @returns {boolean} 是否复制成功
 */
var copyText = exports.copyText = function copyText($target) {
    var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var $excludeElem = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (!('execCommand' in document) || !$target.length) return false;
    var copyText = $target.data('copy-text');
    if (copyText) {
        $target = $('<span class="pd_hide">' + copyText.replace(/\n/g, '<br>') + '</span>').insertAfter($target);
    }
    if ($excludeElem) $excludeElem.prop('hidden', true);
    var result = null;
    if ($target.is('input, textarea')) {
        $target.select();
        result = document.execCommand('copy');
    } else {
        var s = window.getSelection();
        s.selectAllChildren($target.get(0));
        result = document.execCommand('copy');
        s.removeAllRanges();
    }
    if (copyText) $target.remove();
    if ($excludeElem) $excludeElem.removeProp('hidden');
    if (result) {
        alert(msg ? msg : '已复制');
    }
    return result;
};

/**
 * 获取服务器返回的消息
 * @param {string} html HTML代码
 * @returns {{type: number, msg: string, url: string}} type：消息类型（0：未能获得预期的回应；1：成功消息；-1：错误消息）；msg：消息内容
 */
var getResponseMsg = exports.getResponseMsg = function getResponseMsg(html) {
    var type = 0;
    var msg = '',
        url = '';
    var matches = /<span style=".+?">(.+?)<\/span><br\s*\/?><a href="(.+?)">/i.exec(html);
    if (matches) {
        type = 1;
        msg = matches[1];
        url = matches[2];
    } else {
        var _matches = /操作提示<br\s*\/?>\r\n(.+?)<br\s*\/?>\r\n<a href="javascript:history\.go\(-1\);">返回上一步操作<\/a>/i.exec(html);
        if (_matches) {
            type = -1;
            msg = _matches[1];
        }
    }
    return { type: type, msg: msg ? msg : '未能获得预期的回应', url: url };
};

/**
 * 返回指定对象由可枚举属性名和对应属性值组成的的键值对
 * @param {Object} obj 指定对象
 */
var entries = /*#__PURE__*/exports.entries = regeneratorRuntime.mark(function entries(obj) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key;

    return regeneratorRuntime.wrap(function entries$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context.prev = 3;
                    _iterator = Object.keys(obj)[Symbol.iterator]();

                case 5:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context.next = 12;
                        break;
                    }

                    key = _step.value;
                    _context.next = 9;
                    return [key, obj[key]];

                case 9:
                    _iteratorNormalCompletion = true;
                    _context.next = 5;
                    break;

                case 12:
                    _context.next = 18;
                    break;

                case 14:
                    _context.prev = 14;
                    _context.t0 = _context['catch'](3);
                    _didIteratorError = true;
                    _iteratorError = _context.t0;

                case 18:
                    _context.prev = 18;
                    _context.prev = 19;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }

                case 21:
                    _context.prev = 21;

                    if (!_didIteratorError) {
                        _context.next = 24;
                        break;
                    }

                    throw _iteratorError;

                case 24:
                    return _context.finish(21);

                case 25:
                    return _context.finish(18);

                case 26:
                case 'end':
                    return _context.stop();
            }
        }
    }, entries, this, [[3, 14, 18, 26], [19,, 21, 25]]);
});

/**
 * 获取指定用户名在关注或屏蔽列表中的索引号
 * @param {string} name 指定用户名
 * @param {Array} list 指定列表
 * @returns {number} 指定用户在列表中的索引号，-1表示不在该列表中
 */
var inFollowOrBlockUserList = exports.inFollowOrBlockUserList = function inFollowOrBlockUserList(name, list) {
    return list.findIndex(function (data) {
        return data.name && data.name === name;
    });
};

/**
 * 全选
 * @param {jQuery} $nodes 想要全选的节点的jQuery对象
 * @returns {boolean} 返回false
 */
var selectAll = exports.selectAll = function selectAll($nodes) {
    $nodes.prop('checked', true);
    return false;
};

/**
 * 反选
 * @param {jQuery} $nodes 想要反选的节点的jQuery对象
 * @returns {boolean} 返回false
 */
var selectInverse = exports.selectInverse = function selectInverse($nodes) {
    $nodes.each(function () {
        var $this = $(this);
        $this.prop('checked', !$this.prop('checked'));
    });
    return false;
};

/**
 * 读取数据
 * @param {string} key 关键字
 * @param {string} storageType 存储类型
 */
var readData = exports.readData = function readData(key) {
    var storageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Info2.default.storageType;

    return storageType === 'ByUid' || storageType === 'Global' ? GM_getValue(key) : localStorage.getItem(key);
};

/**
 * 写入数据
 * @param {string} key 关键字
 * @param {string} value 值
 * @param {string} storageType 存储类型
 */
var writeData = exports.writeData = function writeData(key, value) {
    var storageType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Info2.default.storageType;

    try {
        if (storageType === 'ByUid' || storageType === 'Global') GM_setValue(key, value);else localStorage.setItem(key, value);
    } catch (ex) {
        console.log(ex);
        alert('写入数据失败，可能是浏览器不支持所设定的存储类型或localStorage超出限额');
    }
};

/**
 * 删除数据
 * @param {string} key 关键字
 * @param {string} storageType 存储类型
 */
var deleteData = exports.deleteData = function deleteData(key) {
    var storageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Info2.default.storageType;

    if (storageType === 'ByUid' || storageType === 'Global') GM_deleteValue(key);else localStorage.removeItem(key);
};

/**
 * 获取帖子sf参数
 * @returns {string} sf参数
 */
var getThreadSfParam = exports.getThreadSfParam = function getThreadSfParam() {
    var sf = '';
    var matches = /&sf=(\w+)/.exec($('.pages:first > li:first-child > a').attr('href'));
    if (matches) {
        sf = matches[1];
    } else {
        sf = getUrlParam('sf');
    }
    return sf ? sf : '';
};

/**
 * 发起AJAX请求
 * @param {{}} param 请求参数
 */
var ajax = exports.ajax = function ajax(param) {
    if (!param.timeout) {
        param.timeout = _Const2.default.defAjaxTimeout;
    }

    if (param.url.startsWith('kf_fw_ig_index.php')) {
        var num = _Info2.default.ajaxStat['kf_fw_ig_index.php'];
        num = num ? num : 0;
        _Info2.default.ajaxStat['kf_fw_ig_index.php'] = ++num;

        if (num > 20) {
            _Info2.default.ajaxStat['kf_fw_ig_index.php'] = 0;
            setTimeout(function () {
                $.ajax(param);
            }, 60 * 1000);
            return;
        }
    }

    $.ajax(param);
};

/**
 * 获取发帖人
 * @param {string} name 处理前的发帖人
 * @returns {string} 真实发帖人
 */
var getFloorUserName = exports.getFloorUserName = function getFloorUserName(name) {
    name = $.trim(name);
    if (name.includes(' ')) {
        var arr = name.split(' ');
        return arr.length === 2 ? arr[1] : name;
    } else {
        return name;
    }
};

},{"./Const":5,"./Info":8}]},{},[1]);
