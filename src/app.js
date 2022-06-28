'use strict';
import Info from './module/Info';
import {init as initConfig} from './module/Config';
import * as Util from './module/Util';
import Const from './module/Const';
import * as Msg from './module/Msg';
import * as Dialog from './module/Dialog';
import * as Log from './module/Log';
import * as TmpLog from './module/TmpLog';
import * as Script from './module/Script';
import * as Public from './module/Public';
import * as Index from './module/Index';
import * as Read from './module/Read';
import * as Post from './module/Post';
import * as Other from './module/Other';
import * as Bank from './module/Bank';
import * as Item from './module/Item';
import * as Loot from './module/Loot';
import * as SelfRate from './module/SelfRate';
import * as ConfigDialog from './module/ConfigDialog';

// 版本号
const version = '14.3.3';

/**
 * 导出模块
 */
const exportModule = function () {
    try {
        Info.w.Info = require('./module/Info').default;
        Info.w.Util = require('./module/Util');
        Info.w.Const = require('./module/Const').default;
        Info.w.Msg = require('./module/Msg');
        Info.w.Dialog = require('./module/Dialog');
        Info.w.Log = require('./module/Log');
        Info.w.TmpLog = require('./module/TmpLog');
        Info.w.Public = require('./module/Public');
        Info.w.Index = require('./module/Index');
        Info.w.Read = require('./module/Read');
        Info.w.Post = require('./module/Post');
        Info.w.Other = require('./module/Other');
        Info.w.Bank = require('./module/Bank');
        Info.w.Item = require('./module/Item');
        Info.w.Loot = require('./module/Loot');
        Info.w.SelfRate = require('./module/SelfRate');
        Info.w.Script = require('./module/Script');
        const Conf = require('./module/Config');
        Info.w.readConfig = Conf.read;
        Info.w.writeConfig = Conf.write;
    } catch (ex) {
        console.log(ex);
    }
};

/**
 * 初始化
 */
const init = function () {
    let startDate = new Date();
    //console.log('【KF Online助手】启动');
    Info.version = version;
    if (!Public.getUidAndUserName()) return;
    Public.addPolyfill();
    exportModule();
    initConfig();
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
    Info.$userMenu.find('a[href^="login.php?action=quit"]').click(() => confirm('是否退出账号？'));
    if (Config.changeNewTipsColorEnabled) Public.changeNewTipsColor();

    //Public.handleSideBarLink(); //临时屏蔽
    // if (parseInt(Util.getCookie(Const.lootCompleteCookieName)) === 2) {
    //     $('#pdLoot').addClass('pd_rightbox1_gray');
    // } //临时屏蔽

    if (Info.isInHomePage) {
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
        if (Info.isInSpecialDomain) Post.addAttachChangeAlert();
    } else if (location.pathname === '/kf_fw_ig_mybp.php') {
        Item.init();
    } else if (location.pathname === '/kf_fw_ig_shop.php') {
        Item.showMyInfoInItemShop();
        Item.showBuyItemTips();
    } else if (location.pathname === '/kf_fw_ig_pklist.php') {
        Loot.addUserLinkInPkListPage();
    } else if (location.pathname === '/kf_fw_ig_halo.php') {
        $('.kf_fw_ig1:first').on('click', 'a[href^="kf_fw_ig_halo.php?do=buy&id="]', () => {
            if (!confirm('是否提升战力光环？')) return false;
            TmpLog.deleteValue(Const.haloInfoTmpLogName);
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
        if (Info.isInSpecialDomain) Other.addAvatarChangeAlert();
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
    if (Info.isMobile) Public.bindElementTitleClick();
    if (Info.isInSpecialDomain) {
        if (['/read.php', '/post.php', '/message.php'].includes(location.pathname)) {
            if (Config.kfSmileEnhanceExtensionEnabled) Post.importKfSmileEnhanceExtension();
            Post.replaceSiteLink();
        }
    }

    $(document).clearQueue('AutoAction');

    if (Config.autoPromoteHaloEnabled && !Util.getCookie(Const.promoteHaloCookieName)) {
        $(document).queue('AutoAction', () => Loot.getPromoteHaloInfo());
    }

    if (Config.autoGetDailyBonusEnabled && !Util.getCookie(Const.getDailyBonusCookieName)) {
        $(document).queue('AutoAction', () => Public.getDailyBonus());
    }

    if ((Info.isInHomePage || location.pathname === '/kf_fw_ig_index.php') && Config.autoBuyItemEnabled &&
        !Util.getCookie(Const.buyItemCookieName) && !Util.getCookie(Const.buyItemReadyCookieName)
    ) {
        $(document).queue('AutoAction', () => Item.buyItems(Config.buyItemIdList));
    }

    $(document).dequeue('AutoAction');

    if (Config.autoChangeIdColorEnabled && !Util.getCookie(Const.autoChangeIdColorCookieName)) {
        Public.changeIdColor();
    }

    if (Config.timingModeEnabled && (Info.isInHomePage || location.pathname === '/kf_fw_ig_index.php' || /kf_fw_ig_mybp\.php\?openboxes=true/.test(location.href))) {
        Public.startTimingMode();
    }

    if (Config.customScriptEnabled) Script.runCustomScript('end');

    let endDate = new Date();
    console.log(`【KF Online助手】初始化耗时：${endDate - startDate}ms`);
};

if (typeof jQuery !== 'undefined') {
    $(document).ready(init);
}
