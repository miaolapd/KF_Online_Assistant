// ==UserScript==
// @name        绯月表情增强插件
// @namespace   https://greasyfork.org/users/5415
// @version     6.4.3
// @author      eddie32
// @description KF论坛专用的回复表情，插图扩展插件，在发帖时快速输入自定义表情和论坛BBCODE
// @icon        https://sticker.inari.site/favicon.ico
// @homepage    https://mistakey.top/KFStickers
// @include     https://*kfmax.com/*
// @include     https://*bakabbs.com/*
// @include     https://*365gal.com/*
// @include     https://*365galgame.com/*
// @include     https://kfol.moe.edu.rs/*
// @include     https://*miaola.info/*
// @copyright   2014-2017, eddie32
// @grant       none
// @license     MIT
// @run-at      document-end
// @modifier    喵拉布丁
// @modifier    mistakey
// @modifier-source https://raw.githubusercontent.com/miaolapd/KF_Online_Assistant/master/scripts/es6/KfEmotion.user.js
// ==/UserScript==
'use strict';
// 版本号

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var version = '6.4.3';
// 网站是否为KfMobile
var isKfMobile = typeof Info !== 'undefined' && typeof Info.imgPath !== 'undefined';

// 灰企鹅
var KfSmileList = [];
var KfSmileCodeList = [];
var kfImgPath = typeof imgpath !== 'undefined' ? imgpath : '';
if (isKfMobile) kfImgPath = Info.imgPath;
for (var i = 1; i < 49; i++) {
    KfSmileList.push('/' + kfImgPath + '/post/smile/em/em' + (i > 9 ? i : '0' + i) + '.gif');
    KfSmileCodeList.push('[s:' + (i + 9) + ']');
}
// 追加，与KF自带用文字截图贴纸【追加小企鹅】做了简单的分隔提醒
for (var _i = 0; _i < 204; _i++) {
    KfSmileList.push('https://sticker.inari.site/pesoguin/' + _i + '.gif');
    KfSmileCodeList.push('[img]https://sticker.inari.site/pesoguin/' + _i + '.gif[/img]');
}

// 图片搭配自定义文字
var PtSmileList = [];
var PtSmileCodeList = [];
PtSmileList.push('https://sticker.inari.site/PicText/Pt.png');
PtSmileCodeList.push('[align=center][img]\u6B64\u5904\u66FF\u6362\u4E3A\u81EA\u5B9A\u4E49\u56FE\u7247url[/img][/align][align=center][backcolor=#FFFFFF][size=3]  [b]\u5728\u6B64\u8F93\u5165\u81EA\u5B9A\u4E49\u6587\u5B57[/b]  [/size][/backcolor][/align]');
for (var _i2 = 1; _i2 < 38; _i2++) {
    PtSmileList.push('https://sticker.inari.site/PicText/' + _i2 + '.webp');
    PtSmileCodeList.push('[align=center][img]https://sticker.inari.site/PicText/' + _i2 + '.webp[/img][/align][align=center][backcolor=#FFFFFF][size=3]  [b]\u8BF7\u5728\u6B64\u5904\u8F93\u5165\u81EA\u5B9A\u4E49\u6587\u5B57[/b]  [/size][/backcolor][/align]');
}

// 常用表情
var CommonSmileList = [];
// 小日向雪花
for (var _i3 = 1; _i3 < 7; _i3++) {
    CommonSmileList.push('https://sticker.inari.site/yukika/' + _i3 + '.jpg');
}
for (var _i4 = 21; _i4 < 24; _i4++) {
    CommonSmileList.push('https://sticker.inari.site/yukika/' + _i4 + '.jpg');
}
// 血压
for (var _i5 = 48; _i5 < 54; _i5++) {
    CommonSmileList.push('https://sticker.inari.site/pop/sticker (' + _i5 + ').png');
}
// Touhou（灵梦）
for (var _i6 = 22; _i6 < 46; _i6++) {
    CommonSmileList.push('https://sticker.inari.site/touhou/reimu/' + _i6 + '.jpg');
}
// 伪中国语
for (var _i7 = 49; _i7 < 83; _i7++) {
    CommonSmileList.push('https://sticker.inari.site/fakehan/sticker (' + _i7 + ').png');
}

// AC娘表情
var AcSmileList = [];
for (var _i8 = 1; _i8 < 55; _i8++) {
    AcSmileList.push('https://sticker.inari.site/acfun/1/' + _i8 + '.png');
}
for (var _i9 = 1001; _i9 < 1041; _i9++) {
    AcSmileList.push('https://sticker.inari.site/acfun/2/' + _i9 + '.png');
}
for (var _i10 = 2001; _i10 < 2056; _i10++) {
    AcSmileList.push('https://sticker.inari.site/acfun/3/' + _i10 + '.png');
}

// S1麻将脸
var S1SmileList = [];
for (var _i11 = 1; _i11 < 33; _i11++) {
    S1SmileList.push('https://sticker.inari.site/s1/' + _i11 + '.gif');
}
for (var _i12 = 1; _i12 < 229; _i12++) {
    S1SmileList.push('https://sticker.inari.site/s1/' + _i12 + '.png');
}

// 阿卡林 from 摇曳百合
var AkarinSmileList = [];
for (var _i13 = 1; _i13 < 21; _i13++) {
    AkarinSmileList.push('https://sticker.inari.site/akarin/2/akarin (' + _i13 + ').gif');
}
for (var _i14 = 1; _i14 < 72; _i14++) {
    AkarinSmileList.push('https://sticker.inari.site/akarin/1/akarin (' + _i14 + ').png');
}

// 林大B
var lindaBSmileList = [];
for (var _i15 = 1; _i15 < 52; _i15++) {
    lindaBSmileList.push('https://sticker.inari.site/lindaB/lindaB (' + _i15 + ').jpg');
}

// 微博&贴吧
var WeiboTbSmileList = [];
for (var _i16 = 0; _i16 < 101; _i16++) {
    WeiboTbSmileList.push('https://sticker.inari.site/weibo/' + _i16 + '.png');
}
for (var _i17 = 1; _i17 < 10; _i17++) {
    WeiboTbSmileList.push('http://tb2.bdstatic.com/tb/editor/images/face/i_f0' + _i17 + '.png');
}
for (var _i18 = 10; _i18 < 34; _i18++) {
    WeiboTbSmileList.push('http://tb2.bdstatic.com/tb/editor/images/face/i_f' + _i18 + '.png');
}

// 暹罗猫小红豆
var SiameseSmileList = [];
for (var _i19 = 1; _i19 < 25; _i19++) {
    SiameseSmileList.push('https://sticker.inari.site/usr/Kawaii_Siamese/wx1/' + _i19 + '.png');
}
for (var _i20 = 1; _i20 < 25; _i20++) {
    SiameseSmileList.push('https://sticker.inari.site/usr/Kawaii_Siamese/wx2/' + _i20 + '.png');
}
for (var _i21 = 1; _i21 < 41; _i21++) {
    SiameseSmileList.push('https://sticker.inari.site/usr/Kawaii_Siamese/line/' + _i21 + '.png');
}

// lovelive表情（小）
var LoveliveSmallSmileList = [];
for (var _i22 = 1; _i22 < 42; _i22++) {
    LoveliveSmallSmileList.push('https://sticker.inari.site/lovelive/2/ll (' + _i22 + ').png');
}
for (var _i23 = 1; _i23 < 20; _i23++) {
    LoveliveSmallSmileList.push('https://sticker.inari.site/lovelive/4/ll (' + _i23 + ').jpg');
}

// 少女歌剧&公主链接
var RevPCRSmileList = [];
for (var _i24 = 1; _i24 < 41; _i24++) {
    RevPCRSmileList.push('https://sticker.inari.site/revstar/revstar (' + _i24 + ').png');
}
for (var _i25 = 1; _i25 < 49; _i25++) {
    RevPCRSmileList.push('https://sticker.inari.site/redive/sticker (' + _i25 + ').png');
}

// バンドリ
var BandoriSmileList = [];
for (var _i26 = 1; _i26 < 41; _i26++) {
    BandoriSmileList.push('https://sticker.inari.site/bangdream/bangdream (' + _i26 + ').png');
}

// 随机
var RandomSmileList = [];
for (var _i27 = 1; _i27 < 20; _i27++) {
    RandomSmileList.push('https://sticker.inari.site/rgif/' + Math.ceil(Math.random() * 2555) + '.gif');
}
for (var _i28 = 1; _i28 < 20; _i28++) {
    RandomSmileList.push('https://sticker.inari.site/rwebp/' + Math.ceil(Math.random() * 6930) + '.webp');
}

// 自定义表情
var UserSmileList = [];
var UsersSmileList = [];
if (!localStorage.userimgst) {
    UsersSmileList = ['https://sticker.inari.site/null.jpg'];
} else {
    try {
        UserSmileList = JSON.parse(localStorage.userimgst);
        for (var _i29 = 0; _i29 < UserSmileList.length; _i29++) {
            UsersSmileList.push(UserSmileList[_i29] + '?num=' + (_i29 + 1));
        }
    } catch (ex) {
        console.log(ex);
    }
}

/**
 * 表情菜单
 */
var MenuList = {
    KfSmile: { datatype: 'imageLink', title: 'KF自带', addr: KfSmileList, ref: KfSmileCodeList },
    Shortcut: {
        datatype: 'plain',
        title: '快捷',
        addr: ['[sell=100][/sell]', '[quote][/quote]', '[hide=100][/hide]', '[code][/code]', '[strike][/strike]', '[fly][/fly]', '[color=#00FF00][/color]', '[b][/b]', '[u][/u]', '[i][/i]', '[hr]', '[backcolor=][/backcolor]', '[url=][/url]', '[img][/img]', '[audio]请填写HTML5音频地址[/audio]', '[video]请填写HTML5视频地址[/video]', '[table][/table]', '[tr][/tr]', '[td][/td]', '[align=left][/align]', '[align=center][/align]', '[align=right][/align]'],
        ref: ['出售贴sell=售价', '引用', '隐藏hide=神秘等级', '插入代码', '删除线', '跑马灯', '文字颜色', '粗体', '下划线', '斜体', '水平线', '背景色', '插入链接', '插入图片', '插入音频', '插入视频', '插入表格', '插入表格行', '插入表格列', '左对齐', '居中', '右对齐']
    },
    Emoji: {
        datatype: 'plain',
        title: '绘/颜文字',
        addr: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '😚', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '🥱', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '🥵', '🥶', '😳', '🤪', '😵', '🥴', '😠', '😡', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🥳', '🥺', '🤠', '🤡', '🤥', '🤫', '🤭', '🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '👻', '👽', '💩', '🙈', '🙉', '🙊', '🐵', '🐶', '🐷', '🐹', '🐸', '🐴', '🐢', '🐍', '🐬', '🐳', '🐓', '👀', '👩', '👨', '🧑', '👧', '👦', '🧒', '👶', '👵', '👴', '👳', '‍👮', '🙅', '🙆', '‍🙋', '🤷', '🤺', '💪', '🦵', '🦶', '👂', '🤏', '👈', '👉', '☝', '👆', '👇', '✌', '🤞', '🖖', '🤘', '🤙', '🖐', '✋', '👌', '👍', '👎', '✊', '👊', '🤛', '🤜', '🤚', '👋', '🤟', '✍', '👏', '👐', '🙌', '🤲', '🙏', '🤝', '💅', '🎈', '🧧', '🎀', '🎁', '🎨', '💎', '🌸', '⚽', '⚾', '🏀', '🏐', '🏈', '🎱', '🎳', '🏓', '🏑', '🎾', '🥇', '🥈', '🥉', '🏅', '🏆', '🎮', '🎲', '🔒', '🔑', '💊', '💻', '📱', '📞', '💣', '🎻', '🎧', '📸', '📺', '💽', '🚲', '🚓', '🚑', '🚒', '🚔', '🚢', '🚀', '🛸', '⛵', '🏥', '🚽', '🧻', '⛅', '🔥', '💧', '🌞', '🌜', '🌈', '🍔', '🍟', '🍉', '(●・ 8 ・●)', '╰(๑◕ ▽ ◕๑)╯', '(ゝω・)', '〜♪♪', '(ﾟДﾟ≡ﾟДﾟ)', '(＾o＾)ﾉ', '(|||ﾟДﾟ)', '(`ε´ )', '(╬ﾟдﾟ)', '(|||ﾟдﾟ)', '(￣∇￣)', '(￣3￣)', '(￣ｰ￣)', '(￣ . ￣)', '(￣︿￣)', '(￣︶￣)', '(*´ω`*)', '(・ω・)', '(⌒▽⌒)', '(￣▽￣）', '(=・ω・=)', '(･∀･)', '(｀・ω・´)', '(〜￣△￣)〜', '(°∀°)ﾉ', '(￣3￣)', '╮(￣▽￣)╭', '( ´_ゝ｀)', 'のヮの', '(ﾉ؂< ๑）诶嘿☆～', '(<_<)', '(>_>)', '(;¬_¬)', '(▔□▔)/', '(ﾟДﾟ≡ﾟдﾟ)!?', 'Σ(ﾟдﾟ;)', 'Σ( ￣□￣||)', '(´；ω；`)', '（/TДT)/', '(^・ω・^ )', '(｡･ω･｡)', '(oﾟωﾟo)', '(●￣(ｴ)￣●)', 'ε=ε=(ノ≧∇≦)ノ', '(´･_･`)', '(-_-#)', '（￣へ￣）', '(￣ε(#￣) Σ', 'ヽ(`Д´)ﾉ', '( ´ρ`)', '(╯°口°)╯(┴—┴', '（#-_-)┯━┯', '_(:3」∠)_', '(笑)', '(汗)', '(泣)', '(苦笑)', '(´・ω・`)', '(╯°□°）╯︵ ┻━┻', '(╯‵□′)╯︵┻━┻', '( ﾟωﾟ)', '(　^ω^)', '(｡◕∀◕｡)', '/( ◕‿‿◕ )\\', 'ε٩( º∀º )۶з', '(￣ε(#￣)☆╰╮(￣▽￣///)', '（●´3｀）~♪', '_(:з」∠)_', 'хорошо!', '＼(^o^)／', '(•̅灬•̅ )', '(ﾟДﾟ)', '(；°ほ°)', 'ε=ε=ε=┏(゜ロ゜;)┛', '⎝≧⏝⏝≦⎠', 'ヽ(✿ﾟ▽ﾟ)ノ', '|•ω•`)', '小学生は最高だぜ！！', '焔に舞い上がるスパークよ、邪悪な異性交際に、天罰を与え！']
    },
    PtSmile: { datatype: 'imageLink', title: '图文', addr: PtSmileList, ref: PtSmileCodeList },
    Common: { datatype: 'image', title: '常用', addr: CommonSmileList },
    Acfun: { datatype: 'image', title: 'ACFUN', addr: AcSmileList },
    S1Maj: { datatype: 'image', title: 'S1', addr: S1SmileList },
    Akari: { datatype: 'image', title: 'Akari', addr: AkarinSmileList },
    lindaB: { datatype: 'image', title: '林大B', addr: lindaBSmileList },
    Weibotb: { datatype: 'image', title: '微博贴吧', addr: WeiboTbSmileList },
    Siamese: { datatype: 'image', title: '小红豆', addr: SiameseSmileList },
    LoveLive: { datatype: 'image', title: 'LL', addr: LoveliveSmallSmileList },
    RevPCR: { datatype: 'image', title: '少歌PCR', addr: RevPCRSmileList },
    Bandori: { datatype: 'image', title: '邦邦', addr: BandoriSmileList },
    Random: { datatype: 'image', title: '随机', addr: RandomSmileList },
    Userimg: { datatype: 'image', title: '自定义', addr: UsersSmileList }
};

/**
 * 添加BBCode
 * @param textArea 文本框
 * @param {string} code BBCode
 * @param {string} selText 选择文本
 */
var addCode = function addCode(textArea, code) {
    var selText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var startPos = !selText ? code.indexOf('[img]') > -1 || code.indexOf(']') < 0 ? code.length : code.indexOf(']') + 1 : code.indexOf(selText);
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
 * 显示放大的表情图片
 * @param {jQuery} $img 表情图片对象
 */
var showZoomInImage = function showZoomInImage($img) {
    if ($img.get(0).naturalWidth <= $img.height()) return;
    var offset = $img.offset();
    var $zoomIn = $('<img class="kfe-zoom-in" src="' + $img.attr('src') + '" alt="[\u9884\u89C8\u56FE\u7247]">').appendTo('body');
    var windowWidth = $(window).width();
    var zoomInWidth = $zoomIn.outerWidth();
    var top = offset.top - $zoomIn.outerHeight() - 5;
    var left = offset.left + $img.width() / 2 - zoomInWidth / 2;
    if (left < 0) left = 0;else if (left + zoomInWidth > windowWidth) left = windowWidth - zoomInWidth;
    $zoomIn.css({ top: top, left: left });
};

/**
 * 获取表情面板的HTML代码
 * @param {string} key 菜单关键字
 * @returns {string} 表情面板内容
 */
var getSmilePanelHtml = function getSmilePanelHtml(key) {
    var data = MenuList[key];
    if (!data) return '';
    var html = '';
    for (var _i30 = 0; _i30 < data.addr.length; _i30++) {
        if (data.datatype === 'image') {
            html += '<img class="kfe-smile" src="' + data.addr[_i30] + '" alt="[\u8868\u60C5]">';
        } else if (data.datatype === 'imageLink') {
            var ref = typeof data.ref !== 'undefined' && typeof data.ref[_i30] !== 'undefined' ? data.ref[_i30] : '';
            html += '<img class="kfe-smile" data-code="' + ref + '" src="' + data.addr[_i30] + '" alt="[\u8868\u60C5]">';
        } else if (data.datatype === 'plain') {
            var _ref = typeof data.ref !== 'undefined' && typeof data.ref[_i30] !== 'undefined' ? data.ref[_i30] : data.addr[_i30];
            html += '<a class="kfe-smile-text" data-code="' + data.addr[_i30] + '" href="#">' + _ref + '</a>';
        }
    }
    return '<div class="kfe-smile-panel" data-key="' + key + '">' + html + '</div>';
};

/**
 * 获取子菜单的HTML代码
 * @returns {string} 子菜单内容
 */
var getSubMenuHtml = function getSubMenuHtml() {
    var html = '';
    $.each(MenuList, function (key, data) {
        html += '<a class="kfe-sub-menu" data-key="' + key + '" href="#" title="' + data.title + '">' + data.title + '</a>';
    });
    return html;
};

/**
 * 创建容器
 * @param textArea 文本框
 */
var createContainer = function createContainer(textArea) {
    var $container = $('\n<div class="kfe-container">\n  <div class="kfe-menu">\n    <span class="kfe-close-panel" title="Created by eddie32; Modified by \u55B5\u62C9\u5E03\u4E01, mistakey; Version ' + version + '" style="cursor: pointer;"><b>\u56E7\u2468</b></span>\n    ' + getSubMenuHtml() + '\n    <span class="kfe-close-panel">[-]</span>\n    <input type="button" class="kfe-user-c" value="\u589E">\n    <input type="button" class="kfe-user-r" value="\u67E5">\n    <input type="button" class="kfe-user-u" value="\u6539">\n    <input type="button" class="kfe-user-d" value="\u5220">\n  </div>\n</div>\n').insertBefore($(textArea));
    $container.on('click', '.kfe-sub-menu', function (e) {
        e.preventDefault();
        var $this = $(this);
        var key = $this.data('key');
        if (!key) return;
        $container.find('.kfe-sub-menu').removeClass('kfe-sub-menu-active');
        $this.addClass('kfe-sub-menu-active');
        $container.find('.kfe-smile-panel').hide();
        var $panel = $container.find('.kfe-smile-panel[data-key="' + key + '"]');
        if ($panel.length > 0) $panel.show();else $(getSmilePanelHtml(key)).appendTo($container).show();
    }).on('click', '.kfe-smile, .kfe-smile-text', function (e) {
        e.preventDefault();
        var $this = $(this);
        var code = $this.data('code');
        if (!code) code = '[img]' + $this.attr('src') + '[/img]';
        addCode(textArea, code);
        if (/(Mobile|MIDP)/i.test(navigator.userAgent)) textArea.blur();else textArea.focus();
    }).on('mouseenter', '.kfe-smile', function () {
        $('.kfe-zoom-in').remove();
        showZoomInImage($(this));
    }).on('mouseleave', '.kfe-smile', function () {
        $('.kfe-zoom-in').remove();
    }).on('click', '.kfe-user-c', function (e) {
        e.preventDefault();
        var userimgaddr = prompt("请输入要添加的贴纸的URL，添加多个请用半角,隔开贴纸URL（添加后刷新页面生效）", "https://sticker.inari.site/inari.png");
        if (!userimgaddr) return;

        var userimgaddrmt = userimgaddr.split(',');
        var addList = [];
        for (var mt = 0; mt < userimgaddrmt.length; mt++) {
            //含http/https协议前缀的完整图片url，请确保未开启防盗链
            if (/(http:|https:).*.(png|jpg|jpeg|gif|webp|bmp|tif)$/i.test(userimgaddrmt[mt])) {
                addList.push(userimgaddrmt[mt]);
            }
            //任意无协议前缀的图片url，默认增加https协议前缀
            else if (/[a-zA-Z0-9\-\.]+\.+[a-zA-Z]+\/.*.(png|jpg|jpeg|gif|webp|bmp|tif)$/i.test(userimgaddrmt[mt])) {
                    addList.push('https://' + userimgaddrmt[mt]);
                }
                //由sticker.inari.site托管的用户贴纸组
                else if (/[A-Za-z0-9\_\/]+\/+[0-9\/]+.(png|jpg|jpeg|gif|webp)$/i.test(userimgaddrmt[mt])) {
                        addList.push('https://sticker.inari.site/usr/' + userimgaddrmt[mt]);
                    }
        }

        if (addList.length < userimgaddrmt.length) {
            alert('含有非法输入，请检查是否有图片url错误');
        }

        if (addList.length > 0) {
            var userSmileList = [];
            if (localStorage.userimgst) {
                try {
                    userSmileList = JSON.parse(localStorage.userimgst);
                } catch (ex) {
                    console.log(ex);
                    userSmileList = [];
                }
            }

            userSmileList = [].concat(_toConsumableArray(userSmileList), addList);
            localStorage.setItem('userimgst', JSON.stringify(userSmileList));
            alert('贴纸已添加，请刷新');
        }
    }).on('click', '.kfe-user-r', function (e) {
        e.preventDefault();
        if (UserSmileList != "https://sticker.inari.site/null.jpg") {
            prompt("自定义表情贴纸已导出，请复制", UserSmileList);
        } else {
            alert("自定义表情贴纸为空！");
        }
    }).on('click', '.kfe-user-u', function (e) {
        e.preventDefault();
        var userimgu = prompt("请输入要替换的贴纸序号", "1");
        if (/[0-9]$/i.test(userimgu)) {
            var userimgst = localStorage.userimgst;
            var _UserSmileList = JSON.parse(userimgst);
            if (userimgu > _UserSmileList.length) {
                alert('序号超出贴纸数，请检查');
            } else if (userimgu == 0) {
                alert('非法输入，请检查！');
            } else if (userimgu <= _UserSmileList.length) {
                var usreplace = prompt("请输入用于替换的图片url", "https://sticker.inari.site/inari.png");
                var j = userimgu;
                if (/(http:\/\/|https:\/\/).*.(png|jpg|jpeg|gif|webp|bmp|tif)$/i.test(usreplace)) {
                    if (confirm('确定替换序号为【' + userimgu + '】的贴纸吗？这是最后一次确认！')) {
                        _UserSmileList[j - 1] = usreplace;
                        localStorage.setItem('userimgst', JSON.stringify(_UserSmileList));
                        alert('已替换指定序号贴纸，请刷新');
                    }
                } else if (usreplace == null) {} else {
                    alert('非法输入，请检查！');
                }
            }
        } else if (userimgu == null) {} else {
            alert('非法输入，请检查！');
        }
    }).on('click', '.kfe-user-d', function (e) {
        e.preventDefault();
        if (confirm('要删除自定义表情贴纸？')) {
            if (confirm('[确定]删除全部贴纸，[取消]删除指定贴纸。')) {
                if (confirm('确定删除全部自定义贴纸吗？')) {
                    localStorage.removeItem('userimgst');
                    alert('已删除全部自定义贴纸，请刷新');
                }
            } else {
                var userimgd = prompt("请输入要删除贴纸的序号", "1");
                if (/[0-9]$/i.test(userimgd)) {
                    var userimgst = localStorage.userimgst;
                    var _UserSmileList2 = JSON.parse(userimgst);
                    if (userimgd > _UserSmileList2.length) {
                        alert('序号超出贴纸数，请检查');
                    } else if (userimgd == 0) {
                        alert('非法输入，请检查！');
                    } else if (userimgd <= _UserSmileList2.length) {
                        if (confirm('确定删除序号为【' + userimgd + '】的贴纸吗？这是最后一次确认！')) {
                            for (var _i31 = userimgd; _i31 <= _UserSmileList2.length; _i31++) {
                                _UserSmileList2[_i31 - 1] = _UserSmileList2[_i31];
                            }
                            _UserSmileList2.pop();
                            localStorage.setItem('userimgst', JSON.stringify(_UserSmileList2));
                            alert('已删除指定序号贴纸，请刷新');
                        }
                    } else {
                        alert('非法输入，请检查！');
                    }
                } else if (userimgd == null) {} else {
                    alert('非法输入，请检查！');
                }
            }
        }
    }).find('.kfe-close-panel').click(function () {
        $container.find('.kfe-smile-panel').hide();
    });
};

/**
 * 添加CSS
 */
var appendCss = function appendCss() {
    $('head').append('\n<style>\n  .kfe-container { padding: 5px; vertical-align: middle; font: 12px/1.7em "sans-serif"; }\n  .kfe-menu { margin-bottom: 5px; }\n  .kfe-sub-menu { margin: 0 4px; text-decoration: none; border-bottom: 2px solid transparent; }\n  .kfe-sub-menu:hover, .kfe-sub-menu:focus { text-decoration: none; border-color: deeppink; }\n  a.kfe-sub-menu-active { color: black }\n  .kfe-smile-panel { display: none; height: 136px; padding: 5px 3px; overflow-y: auto; border-top: 1px solid #ddd; }\n  .kfe-smile-panel[data-key="Shortcut"] { height: auto; }\n  .kfe-smile { display: inline-block; max-width: 60px; max-height: 60px; cursor: pointer; }\n  .kfe-smile-text { display: inline-block; padding: 3px 5px; }\n  .kfe-smile-text:hover { color: #fff !important; background-color: #2b2b2b; text-decoration: none; }\n  .kfe-close-panel { cursor: pointer; }\n  .kfe-zoom-in {\n    position: absolute; max-width: 150px; max-height: 150px; background-color: #fcfcfc; border: 3px solid rgba(242, 242, 242, 0.6);\n    border-radius: 2px; box-shadow: 0 0 3px rgb(102, 102, 102);\n  }\n</style>\n');
    if (isKfMobile) {
        $('head').append('\n<style>\n  #readPage .kfe-container, #writeMessagePage .kfe-container { margin-top: -10px; }\n  .kfe-menu { white-space: nowrap; overflow-x: auto; }\n</style>\n');
    }
};

/**
 * 初始化
 */
var init = function init() {
    var $textAreas = $('textarea');
    if (!$textAreas.length) return;
    appendCss();
    $textAreas.each(function () {
        createContainer(this);
    });
};

init();