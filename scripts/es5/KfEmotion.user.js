// ==UserScript==
// @name        绯月表情增强插件
// @namespace   https://greasyfork.org/users/5415
// @version     6.6.6
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
// @include     https://*miaola.work/*
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

var version = '6.6.6';
// 网站是否为KfMobile
var isKfMobile = typeof Info !== 'undefined' && typeof Info.imgPath !== 'undefined';
// 看板娘图片自定义
var kanbanmsume = "/ys/in/read_75675456.gif";
// 看板娘大小/粘贴预览图大小自定义,支持%或px/em
var previewsize = "42%";
// 文本区域粘贴图片预览区
function imgurl() {
    var imgpreview = document.createElement("div");if (isKfMobile == true) {
        imgpreview.innerHTML = '<div id = "imgpreview" style = "position:fixed;left:5px;bottom:5px;z-index:88;cursor:pointer;" ><img class="imgpreview" src = "https://sticker.inari.site/favicon.ico" width = ' + previewsize + ' height = ' + previewsize + ' ></div>';
    } else {
        if (localStorage.imgpvpc != null) {
            var imgpvpc = localStorage.imgpvpc;var imgpvpcpush = JSON.parse(imgpvpc);
            imgpreview.innerHTML = '<div id = "imgpreview" style = "position:fixed;left:' + imgpvpcpush[0] + ';top:' + imgpvpcpush[1] + ';z-index:88;cursor:pointer;" ><img class="imgpreview" src = ' + kanbanmsume + ' width = ' + previewsize + ' height = ' + previewsize + ' ></div>';
        } else {
            imgpreview.innerHTML = '<div id = "imgpreview" style = "position:fixed;left:5px;top:40px;z-index:88;cursor:pointer;" ><img class="imgpreview" src = ' + kanbanmsume + ' width = ' + previewsize + ' height = ' + previewsize + ' ></div>';
        }
    }document.body.appendChild(imgpreview);
}imgurl();
// 可拖拽看板娘,会记录拖拽位置
var imgpv = document.getElementById("imgpreview");
window.onload = function () {
    drag(imgpv);
};
function drag(obj) {
    obj.onmousedown = function (event) {
        obj.setCapture && obj.setCapture();
        event = event || window.event;
        var cleft = obj.style.left;
        var ctop = obj.style.top;
        var ol = event.clientX - obj.offsetLeft;
        var ot = event.clientY - obj.offsetTop;
        document.onmousemove = function (event) {
            event = event || window.event;
            var left = event.clientX - ol;
            var top = event.clientY - ot;
            obj.style.left = left + "px";
            obj.style.top = top + "px";
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
            obj.releaseCapture && obj.releaseCapture();
            var vleft = obj.style.left;
            var vtop = obj.style.top;
            if (cleft == vleft && vtop == ctop) {
                $('.kfe-user-p').click();
            } else {
                var imgpvpcpull = [vleft, vtop];
                localStorage.setItem('imgpvpc', JSON.stringify(imgpvpcpull));
            };
        };return false;
    };
};

// 灰企鹅
var KfSmileList = [];
var KfSmileCodeList = [];
var kfImgPath = typeof imgpath !== 'undefined' ? imgpath : '';
if (isKfMobile) kfImgPath = Info.imgPath;
for (var i = 1; i < 49; i++) {
    KfSmileList.push('/' + kfImgPath + '/post/smile/em/em' + (i > 9 ? i : '0' + i) + '.gif');
    KfSmileCodeList.push('[s:' + (i + 9) + ']');
}
// 追加部分，与KF自带用文字截图贴纸【追加小企鹅】做了简单的分隔提醒
for (var _i = 0; _i < 204; _i++) {
    KfSmileList.push('https://sticker.inari.site/pesoguin/' + _i + '.gif');
    KfSmileCodeList.push('[img]https://sticker.inari.site/pesoguin/' + _i + '.gif[/img]');
}

// 常用表情
var CommonSmileList = [];
// 小日向雪花
for (var _i2 = 1; _i2 < 7; _i2++) {
    CommonSmileList.push('https://sticker.inari.site/yukika/' + _i2 + '.jpg');
}
for (var _i3 = 21; _i3 < 24; _i3++) {
    CommonSmileList.push('https://sticker.inari.site/yukika/' + _i3 + '.jpg');
}
// 血压
for (var _i4 = 48; _i4 < 54; _i4++) {
    CommonSmileList.push('https://sticker.inari.site/pop/sticker (' + _i4 + ').png');
}
// Touhou（灵梦）
for (var _i5 = 22; _i5 < 46; _i5++) {
    CommonSmileList.push('https://sticker.inari.site/touhou/reimu/' + _i5 + '.jpg');
}
// 伪中国语
for (var _i6 = 49; _i6 < 83; _i6++) {
    CommonSmileList.push('https://sticker.inari.site/fakehan/sticker (' + _i6 + ').png');
}

// AC娘表情
var AcSmileList = [];
for (var _i7 = 1; _i7 < 55; _i7++) {
    AcSmileList.push('https://sticker.inari.site/acfun/1/' + _i7 + '.png');
}
for (var _i8 = 1001; _i8 < 1041; _i8++) {
    AcSmileList.push('https://sticker.inari.site/acfun/2/' + _i8 + '.png');
}
for (var _i9 = 2001; _i9 < 2056; _i9++) {
    AcSmileList.push('https://sticker.inari.site/acfun/3/' + _i9 + '.png');
}

// S1麻将脸
var S1SmileList = [];
for (var _i10 = 1; _i10 < 33; _i10++) {
    S1SmileList.push('https://sticker.inari.site/s1/' + _i10 + '.gif');
}
for (var _i11 = 1; _i11 < 229; _i11++) {
    S1SmileList.push('https://sticker.inari.site/s1/' + _i11 + '.png');
}

// 阿卡林 from 摇曳百合
var AkarinSmileList = [];
for (var _i12 = 1; _i12 < 21; _i12++) {
    AkarinSmileList.push('https://sticker.inari.site/akarin/2/akarin (' + _i12 + ').gif');
}
for (var _i13 = 1; _i13 < 72; _i13++) {
    AkarinSmileList.push('https://sticker.inari.site/akarin/1/akarin (' + _i13 + ').png');
}

// 林大B
var lindaBSmileList = [];
for (var _i14 = 1; _i14 < 52; _i14++) {
    lindaBSmileList.push('https://sticker.inari.site/lindaB/lindaB (' + _i14 + ').jpg');
}

// 微博&贴吧
var WeiboTbSmileList = [];
for (var _i15 = 0; _i15 < 101; _i15++) {
    WeiboTbSmileList.push('https://sticker.inari.site/weibo/' + _i15 + '.png');
}
for (var _i16 = 1; _i16 < 10; _i16++) {
    WeiboTbSmileList.push('http://tb2.bdstatic.com/tb/editor/images/face/i_f0' + _i16 + '.png');
}
for (var _i17 = 10; _i17 < 34; _i17++) {
    WeiboTbSmileList.push('http://tb2.bdstatic.com/tb/editor/images/face/i_f' + _i17 + '.png');
}

// 暹罗猫小红豆
var SiameseSmileList = [];
for (var _i18 = 1; _i18 < 25; _i18++) {
    SiameseSmileList.push('https://sticker.inari.site/usr/Kawaii_Siamese/wx1/' + _i18 + '.png');
}
for (var _i19 = 1; _i19 < 25; _i19++) {
    SiameseSmileList.push('https://sticker.inari.site/usr/Kawaii_Siamese/wx2/' + _i19 + '.png');
}
for (var _i20 = 1; _i20 < 41; _i20++) {
    SiameseSmileList.push('https://sticker.inari.site/usr/Kawaii_Siamese/line/' + _i20 + '.png');
}

// lovelive表情（小）
var LoveliveSmallSmileList = [];
for (var _i21 = 1; _i21 < 42; _i21++) {
    LoveliveSmallSmileList.push('https://sticker.inari.site/lovelive/2/ll (' + _i21 + ').png');
}
for (var _i22 = 1; _i22 < 20; _i22++) {
    LoveliveSmallSmileList.push('https://sticker.inari.site/lovelive/4/ll (' + _i22 + ').jpg');
}

// 少女歌剧&公主链接
var RevPCRSmileList = [];
for (var _i23 = 1; _i23 < 41; _i23++) {
    RevPCRSmileList.push('https://sticker.inari.site/revstar/revstar (' + _i23 + ').png');
}
for (var _i24 = 1; _i24 < 49; _i24++) {
    RevPCRSmileList.push('https://sticker.inari.site/redive/sticker (' + _i24 + ').png');
}

// バンドリ
var BandoriSmileList = [];
for (var _i25 = 1; _i25 < 41; _i25++) {
    BandoriSmileList.push('https://sticker.inari.site/bangdream/bangdream (' + _i25 + ').png');
}

// 随机
var RandomSmileList = [];
for (var _i26 = 1; _i26 < 20; _i26++) {
    RandomSmileList.push('https://sticker.inari.site/rgif/' + Math.ceil(Math.random() * 2555) + '.gif');
}
for (var _i27 = 1; _i27 < 20; _i27++) {
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
        for (var _i28 = 0; _i28 < UserSmileList.length; _i28++) {
            UsersSmileList.push(UserSmileList[_i28] + '#num=' + (_i28 + 1));
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
        addr: ['[sell=100][/sell]', '[quote][/quote]', '[hide=100][/hide]', '[code][/code]', '[strike][/strike]', '[fly][/fly]', '[color=#00FF00][/color]', '[b][/b]', '[u][/u]', '[i][/i]', '[hr]', '[backcolor=][/backcolor]', '[url=][/url]', '[img][/img]', '[audio]请填写HTML5音频地址[/audio]', '[video]请填写HTML5视频地址[/video]', '[table][/table]', '[tr][/tr]', '[td][/td]', '[align=left][/align]', '[align=center][/align]', '[align=right][/align]', '[align=center][img]此处替换为自定义图片url[/img][/align][align=center][backcolor=#FFFFFF][size=3]  [b]在此输入自定义文字[/b]  [/size][/backcolor][/align]'],
        ref: ['出售贴sell=售价', '引用', '隐藏hide=神秘等级', '插入代码', '删除线', '跑马灯', '文字颜色', '粗体', '下划线', '斜体', '水平线', '背景色', '插入链接', '插入图片', '插入音频', '插入视频', '插入表格', '插入表格行', '插入表格列', '左对齐', '居中', '右对齐', '自定义图片搭配文字']
    },
    Emoji: {
        datatype: 'plain',
        title: '绘/颜文字',
        addr: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '😚', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '🥱', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '🥵', '🥶', '😳', '🤪', '😵', '🥴', '😠', '😡', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🥳', '🥺', '🤠', '🤡', '🤥', '🤫', '🤭', '🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '👻', '👽', '💩', '🙈', '🙉', '🙊', '🐵', '🐶', '🐷', '🐹', '🐸', '🐴', '🐢', '🐍', '🐬', '🐳', '🐓', '👀', '👩', '👨', '🧑', '👧', '👦', '🧒', '👶', '👵', '👴', '👳', '‍👮', '🙅', '🙆', '‍🙋', '🤷', '🤺', '💪', '🦵', '🦶', '👂', '🤏', '👈', '👉', '☝', '👆', '👇', '✌', '🤞', '🖖', '🤘', '🤙', '🖐', '✋', '👌', '👍', '👎', '✊', '👊', '🤛', '🤜', '🤚', '👋', '🤟', '✍', '👏', '👐', '🙌', '🤲', '🙏', '🤝', '💅', '🎈', '🧧', '🎀', '🎁', '🎨', '💎', '🌸', '⚽', '⚾', '🏀', '🏐', '🏈', '🎱', '🎳', '🏓', '🏑', '🎾', '🥇', '🥈', '🥉', '🏅', '🏆', '🎮', '🎲', '🔒', '🔑', '💊', '💻', '📱', '📞', '💣', '🎻', '🎧', '📸', '📺', '💽', '🚲', '🚓', '🚑', '🚒', '🚔', '🚢', '🚀', '🛸', '⛵', '🏥', '🚽', '🧻', '⛅', '🔥', '💧', '🌞', '🌜', '🌈', '🍔', '🍟', '🍉', '(●・ 8 ・●)', '╰(๑◕ ▽ ◕๑)╯', '(ゝω・)', '〜♪♪', '(ﾟДﾟ≡ﾟДﾟ)', '(＾o＾)ﾉ', '(|||ﾟДﾟ)', '(`ε´ )', '(╬ﾟдﾟ)', '(|||ﾟдﾟ)', '(￣∇￣)', '(￣3￣)', '(￣ｰ￣)', '(￣ . ￣)', '(￣︿￣)', '(￣︶￣)', '(*´ω`*)', '(・ω・)', '(⌒▽⌒)', '(￣▽￣）', '(=・ω・=)', '(･∀･)', '(｀・ω・´)', '(〜￣△￣)〜', '(°∀°)ﾉ', '(￣3￣)', '╮(￣▽￣)╭', '( ´_ゝ｀)', 'のヮの', '(ﾉ؂< ๑）诶嘿☆～', '(<_<)', '(>_>)', '(;¬_¬)', '(▔□▔)/', '(ﾟДﾟ≡ﾟдﾟ)!?', 'Σ(ﾟдﾟ;)', 'Σ( ￣□￣||)', '(´；ω；`)', '（/TДT)/', '(^・ω・^ )', '(｡･ω･｡)', '(oﾟωﾟo)', '(●￣(ｴ)￣●)', 'ε=ε=(ノ≧∇≦)ノ', '(´･_･`)', '(-_-#)', '（￣へ￣）', '(￣ε(#￣) Σ', 'ヽ(`Д´)ﾉ', '( ´ρ`)', '(╯°口°)╯(┴—┴', '（#-_-)┯━┯', '_(:3」∠)_', '(笑)', '(汗)', '(泣)', '(苦笑)', '(´・ω・`)', '(╯°□°）╯︵ ┻━┻', '(╯‵□′)╯︵┻━┻', '( ﾟωﾟ)', '(　^ω^)', '(｡◕∀◕｡)', '/( ◕‿‿◕ )\\', 'ε٩( º∀º )۶з', '(￣ε(#￣)☆╰╮(￣▽￣///)', '（●´3｀）~♪', '_(:з」∠)_', 'хорошо!', '＼(^o^)／', '(•̅灬•̅ )', '(ﾟДﾟ)', '(；°ほ°)', 'ε=ε=ε=┏(゜ロ゜;)┛', '⎝≧⏝⏝≦⎠', 'ヽ(✿ﾟ▽ﾟ)ノ', '|•ω•`)', '小学生は最高だぜ！！', '焔に舞い上がるスパークよ、邪悪な異性交際に、天罰を与え！']
    },
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
    for (var _i29 = 0; _i29 < data.addr.length; _i29++) {
        if (data.datatype === 'image') {
            html += '<img class="kfe-smile" src="' + data.addr[_i29] + '" alt="[\u8868\u60C5]">';
        } else if (data.datatype === 'imageLink') {
            var ref = typeof data.ref !== 'undefined' && typeof data.ref[_i29] !== 'undefined' ? data.ref[_i29] : '';
            html += '<img class="kfe-smile" data-code="' + ref + '" src="' + data.addr[_i29] + '" alt="[\u8868\u60C5]">';
        } else if (data.datatype === 'plain') {
            var _ref = typeof data.ref !== 'undefined' && typeof data.ref[_i29] !== 'undefined' ? data.ref[_i29] : data.addr[_i29];
            html += '<a class="kfe-smile-text" data-code="' + data.addr[_i29] + '" href="#">' + _ref + '</a>';
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
    var $container = $('\n<div class="kfe-container">\n  <div class="kfe-menu">\n    <span class="kfe-close-panel" title="Created by eddie32; Modified by \u55B5\u62C9\u5E03\u4E01, mistakey; Version ' + version + '" style="cursor: pointer;"><b>\u56E7\u2468</b></span>\n    ' + getSubMenuHtml() + '\n    <span class="kfe-close-panel">[-]</span>&nbsp;\n    <input type="button" class="kfe-user-c" value="\u589E">\n    <input type="button" class="kfe-user-r" value="\u67E5">\n    <input type="button" class="kfe-user-u" value="\u6539">\n    <input type="button" class="kfe-user-d" value="\u5220">&nbsp;&nbsp;\n    <input type="button" class="kfe-user-a" value="\u8D26\u53F7">\n    <input type="button" class="kfe-user-y" value="\u4E91\u540C\u6B65">\n    <input type="button" class="kfe-user-s" value="\u4E0A\u4F20\u56FE\u7247">\n    <input type= "file"  class="kfe-user-p" accept="image/*" style="display:none" >\n  </div>\n</div>\n').insertBefore($(textArea));
    // 文本区域直接上传图片并预览
    document.querySelector('textarea').addEventListener('paste', function (event) {
        event.preventDefault();
        // 修复粘贴文字功能
        addCode(textArea, event.clipboardData.getData('text'));
        var pd = event.clipboardData.items[0];
        if (!/^image\/[jpeg|png|gif|jpg]/.test(pd.type)) {
            return;
        }
        var file = event.clipboardData.items[0].getAsFile();
        // 让文件名使用时间戳
        var name = JSON.stringify(new Date().getTime());
        var files = new File([file], name + "." + file.name.substr(file.name.lastIndexOf('.') + 1), {
            type: file.type,
            lastModified: file.lastModified
        });
        var formData = new FormData();
        formData.append('file', files);
        var reader = new FileReader();
        reader.onload = function (_ref2) {
            var target = _ref2.target;

            setTimeout(function () {
                $(".imgpreview").attr('src', target.result);
            }, 400);
            setTimeout(function () {
                if (isKfMobile == true) {
                    $(".imgpreview").attr('src', 'https://sticker.inari.site/favicon.ico');
                } else {
                    $(".imgpreview").attr('src', kanbanmsume);
                }
            }, 5000);
        };
        reader.readAsDataURL(files);
        //验证登录，使用token或游客上传
        var authdata = localStorage.logindata;
        if (authdata == null) {
            setTimeout(function () {
                alert('抱歉！粘贴上传图片功能仅限已登录表情贴纸云同步账号的用户！');
            }, 1000);
        } else {
            var authList = JSON.parse(authdata);
            if (authList.length == 2) {
                $.ajax({
                    url: 'https://up.inari.site/api/v1/upload',
                    type: 'POST',
                    dataType: 'json',
                    data: formData,
                    // 告诉jQuery不要去设置Content-Type请求头
                    contentType: false,
                    // 告诉jQuery不要去处理发送的数据
                    processData: false
                }).done(function (data) {
                    if (data.status == true) {
                        var inaridata = data.data;
                        var inarilinks = inaridata.links;
                        alert('游客上传成功！建议绑定up.inari.site图床账号到云同步账号！');
                        addCode(textArea, inarilinks.bbcode);
                    } else if (data.status == false) {
                        alert(data.message);
                    } else {
                        alert('未知错误，' + data);
                    }
                }).fail(function (data) {
                    alert('图片上传失败');
                });
            } else if (authList.length == 3) {
                $.ajax({
                    url: 'https://up.inari.site/api/v1/upload',
                    type: 'POST',
                    dataType: 'json',
                    data: formData,
                    // 告诉jQuery不要去设置Content-Type请求头
                    contentType: false,
                    // 告诉jQuery不要去处理发送的数据
                    processData: false,
                    //设置Header的token
                    beforeSend: function beforeSend(xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + authList[2]);
                    }
                }).done(function (data) {
                    if (data.status == true) {
                        var inaridata = data.data;
                        var inarilinks = inaridata.links;
                        addCode(textArea, inarilinks.bbcode);
                    } else if (data.status == false) {
                        alert(data.message);
                    } else {
                        alert('未知错误，' + data);
                    }
                }).fail(function (data) {
                    alert('图片上传失败');
                });
            }
        }
    });
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
            if (/(http:|https:).*.(png|jpg|jpeg|gif|webp|bmp|tif)+.*$/i.test(userimgaddrmt[mt])) {
                addList.push(userimgaddrmt[mt]);
            }
            //任意无协议前缀的图片url，默认增加https协议前缀
            else if (/[a-zA-Z0-9\-\.]+\.+[a-zA-Z]+\/.*.(png|jpg|jpeg|gif|webp|bmp|tif)+.*$/i.test(userimgaddrmt[mt])) {
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
                if (/(http:\/\/|https:\/\/).*.(png|jpg|jpeg|gif|webp|bmp|tif)+.*$/i.test(usreplace)) {
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
                            for (var _i30 = userimgd; _i30 <= _UserSmileList2.length; _i30++) {
                                _UserSmileList2[_i30 - 1] = _UserSmileList2[_i30];
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
    }).on('click', '.kfe-user-y', function (e) {
        e.preventDefault();
        if (localStorage.logindata != null) {
            var tokendata = localStorage.logindata;
            var tokenList = JSON.parse(tokendata);
            var syncid = tokenList[0];
            var synctoken = tokenList[1];
            if (confirm('【确定】同步云端数据到本地，【取消】同步本地数据到云端')) {
                //第一步：创建需要的对象
                var dlRequest = new XMLHttpRequest();
                //第二步：打开连接
                dlRequest.open('POST', 'https://api.inari.site/?s=App.User_User.picsdata&user_id=' + syncid + '&token=' + synctoken, true);
                //设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
                dlRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                //发送请求 将情头体写在send中
                dlRequest.send('name=teswe&ee=ef');
                //请求后的回调接口，可将请求成功后要执行的程序写在其中
                dlRequest.onreadystatechange = function () {
                    //验证请求是否发送成功
                    if (dlRequest.readyState == 4 && dlRequest.status == 200) {
                        //获取到服务端返回的数据
                        var dljson = dlRequest.responseText;
                        var download = JSON.parse(dljson);
                        if (download.ret == 200) {
                            if (confirm('确定同步【云端数据到本地】吗？这是最后一次确认！')) {
                                var dldata = download.data;
                                var dlpicsList = dldata.picsdata;
                                if (dlpicsList != "") {
                                    var _UserSmileList3 = dlpicsList.split(',');
                                    localStorage.setItem('userimgst', JSON.stringify(_UserSmileList3));
                                    alert("已同步云端数据到本地，请刷新！");
                                } else {
                                    alert("云端数据为空！同步到本地操作已取消！");
                                }
                            } else {
                                alert("云端数据同步到本地操作已取消！");
                            }
                        } else {
                            alert('Token已失效，请重新登录！');
                        }
                    }
                };
            } else {
                if (confirm('确定同步【本地数据到云端】吗？这是最后一次确认！')) {
                    if (localStorage.userimgst != null) {
                        var userimgst = localStorage.userimgst;
                        var _UserSmileList4 = JSON.parse(userimgst);
                        var upRequest = new XMLHttpRequest();
                        upRequest.open('POST', 'https://api.inari.site/?s=App.User_User.picsupdate&user_id=' + syncid + '&token=' + synctoken + '&picsdata=' + _UserSmileList4, true);
                        upRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        upRequest.send('name=teswe&ee=ef');
                        upRequest.onreadystatechange = function () {
                            if (upRequest.readyState == 4 && upRequest.status == 200) {
                                var upjson = upRequest.responseText;
                                console.log(upjson);
                                var upload = JSON.parse(upjson);
                                console.log(upload.data);
                                if (upload.ret == 200) {
                                    alert("已同步本地数据到云端！");
                                } else {
                                    alert('Token已失效，请重新登录！');
                                }
                            }
                        };
                    } else {
                        alert("本地数据为空！同步到云端操作已取消！");
                    }
                } else {
                    alert("本地数据同步到云端操作已取消！");
                }
            }
        } else {
            alert('未找到有效Token，请先登录！');
        }
    }).on('click', '.kfe-user-a', function (e) {
        e.preventDefault();
        if (confirm('【确定】登录已有账号，【取消】进行账号注册')) {
            var username = prompt("用户名", 'username');
            if (username.length >= 1 && username.length <= 50) {
                var password = prompt("密码", 'password');
                if (password.length >= 6 && password.length <= 20) {
                    //调用登录api
                    var loginRequest = new XMLHttpRequest();
                    loginRequest.open('POST', 'https://api.inari.site/?s=App.User_User.Login&username=' + username + '&password=' + password, true);
                    loginRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    loginRequest.send('name=teswe&ee=ef');
                    loginRequest.onreadystatechange = function () {
                        if (loginRequest.readyState == 4 && loginRequest.status == 200) {
                            var loginjson = loginRequest.responseText;
                            var login = JSON.parse(loginjson);
                            //200状态码
                            if (login.ret == 200) {
                                var logindata = login.data;
                                //登入成功
                                if (logindata.is_login == true) {
                                    //账号id与token储存
                                    localStorage.removeItem('logindata');
                                    var logindarray = [logindata.user_id, logindata.token];
                                    localStorage.setItem('logindata', JSON.stringify(logindarray));
                                    // 检测绑定图床Token信息的方法
                                    var getokenRequest = new XMLHttpRequest();
                                    getokenRequest.open('POST', 'https://api.inari.site/?s=App.User_User.Tutoken&user_id=' + logindata.user_id + '&token=' + logindata.token, true);
                                    getokenRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                    getokenRequest.send('name=teswe&ee=ef');
                                    getokenRequest.onreadystatechange = function () {
                                        if (getokenRequest.readyState == 4 && getokenRequest.status == 200) {
                                            var getokentext = getokenRequest.responseText;
                                            var getokenjson = JSON.parse(getokentext);
                                            if (getokenjson.ret == 200) {
                                                var tkdata = getokenjson.data;
                                                var gtoken = tkdata.tutoken;
                                                if (gtoken != null) {
                                                    localStorage.removeItem('logindata');
                                                    var gtokenarray = [logindata.user_id, logindata.token, gtoken];
                                                    localStorage.setItem('logindata', JSON.stringify(gtokenarray));
                                                    alert('你可以进行同步操作了！');
                                                } else {
                                                    if (confirm('检测到没有绑定up.inari.site图床的Token，是否绑定？【确定】绑定Token 【取消】则不绑定，上传图片将使用游客上传')) {
                                                        var inariuser = prompt("inari图床账号邮箱", 'example@example.mail');
                                                        var inaripass = prompt("inari图床账号密码", 'password');
                                                        var formData = '{ "email":"' + inariuser + '" , "password":"' + inaripass + '" }';
                                                        $.ajax({
                                                            url: 'https://up.inari.site/api/v1/tokens',
                                                            type: 'POST',
                                                            dataType: 'json',
                                                            data: formData,
                                                            // 告诉jQuery不要去设置Content-Type请求头
                                                            contentType: "application/json",
                                                            // 告诉jQuery不要去处理发送的数据
                                                            processData: false
                                                        }).done(function (data) {
                                                            if (data.status == true) {
                                                                var tokendata = data.data;
                                                                var token = tokendata.token;
                                                                localStorage.removeItem('logindata');
                                                                var tokenarray = [logindata.user_id, logindata.token, token];
                                                                localStorage.setItem('logindata', JSON.stringify(tokenarray));
                                                                var tokenRequest = new XMLHttpRequest();
                                                                tokenRequest.open('POST', 'https://api.inari.site/?s=App.User_User.tupdate&user_id=' + logindata.user_id + '&token=' + logindata.token + '&tupdate=' + token, true);
                                                                tokenRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                                                tokenRequest.send('name=teswe&ee=ef');
                                                                tokenRequest.onreadystatechange = function () {
                                                                    if (tokenRequest.readyState == 4 && tokenRequest.status == 200) {
                                                                        var tokentext = tokenRequest.responseText;
                                                                        var tokenjson = JSON.parse(tokentext);
                                                                        if (tokenjson.ret == 200) {
                                                                            alert("已绑定图床Token，现在你可以进行同步操作了！");
                                                                            return;
                                                                        } else {
                                                                            alert('你依然可以进行同步操作。图床账号绑定失败！异常请求返回码：' + tokenjson.ret);
                                                                        }
                                                                    } else if (tokenRequest.readyState == 4 && tokenRequest.status != 200) {
                                                                        alert('你依然可以进行同步操作。图床账号绑定失败！异常请求状态码：' + tokenRequest.status);
                                                                    }
                                                                };
                                                            } else if (data.status == false) {
                                                                alert(data.message);
                                                            }
                                                        }).fail(function (data) {
                                                            alert('你依然可以进行同步操作。Oops！图床账号绑定失败！可能是服务器错误或网络问题！');
                                                        });
                                                    } else {
                                                        alert('图床账号未绑定，你可以进行同步操作了！');
                                                    }
                                                }
                                            } else {
                                                alert('你依然可以进行同步操作。检测是否绑定了图床账号失败！返回码：' + getokenjson.ret);
                                            }
                                        } else if (getokenRequest.readyState == 4 && getokenRequest.status != 200) {
                                            alert('你依然可以进行同步操作。异常的请求！状态码：' + getokenRequest.status);
                                        }
                                    };
                                }
                                //登入失败
                                else if (logindata.is_login == false) {
                                        alert('Oops！用户名或密码错误！请检查！');
                                    }
                            }
                            //400状态码
                            else if (login.ret == 400) {
                                    alert('Oops！该账号还没有注册，请注册！');
                                } else {
                                    alert('Oops！异常的错误！返回码：' + login.ret);
                                }
                        }
                    };
                } else {
                    alert('密码长度不合规，密码位数应在6-20位范围');
                }
            } else {
                alert('用户名长度不合规，用户名位数应在1-50位范围');
            }
        } else {
            var regname = prompt("用户名，1-50位，只支持英文、数字和有限的特殊符号如@_", 'username');
            if (regname.length >= 1 && regname.length <= 20) {
                var regpswd1 = prompt("输入6-20位密码，只支持英文、数字和有限的特殊符号如@_", 'password');
                var regpswd2 = prompt("确认密码", 'password');
                if (regpswd1.length >= 6 && regpswd1.length <= 20) {
                    if (regpswd1 == regpswd2) {
                        //调用注册api
                        var regRequest = new XMLHttpRequest();
                        regRequest.open('POST', 'https://api.inari.site/?s=App.User_User.Register&username=' + regname + '&password=' + regpswd2, true);
                        regRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        regRequest.send('name=teswe&ee=ef');
                        regRequest.onreadystatechange = function () {
                            if (regRequest.readyState == 4 && regRequest.status == 200) {
                                var regjson = regRequest.responseText;
                                var reg = JSON.parse(regjson);
                                //注册成功
                                if (reg.ret == 200) {
                                    //调用登录api
                                    var _loginRequest = new XMLHttpRequest();
                                    _loginRequest.open('POST', 'https://api.inari.site/?s=App.User_User.Login&username=' + regname + '&password=' + regpswd2, true);
                                    _loginRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                    _loginRequest.send('name=teswe&ee=ef');
                                    _loginRequest.onreadystatechange = function () {
                                        if (_loginRequest.status === 200 && _loginRequest.readyState === 4) {
                                            var loginjson = _loginRequest.responseText;
                                            var login = JSON.parse(loginjson);
                                            var logindata = login.data;
                                            //账号id与token储存
                                            localStorage.removeItem('logindata');
                                            var logindarray = [logindata.user_id, logindata.token];
                                            localStorage.setItem('logindata', JSON.stringify(logindarray));
                                            if (confirm('是否绑定up.inari.site图床账号？【确定】绑定【取消】则不绑定，上传图片将使用游客上传')) {
                                                // 写获取token的方法
                                                var inariuser = prompt("inari图床账号邮箱", 'example@example.com');
                                                var inaripass = prompt("inari图床账号密码", 'password');
                                                var formData = '{ "email":"' + inariuser + '" , "password":"' + inaripass + '" }';
                                                $.ajax({
                                                    url: 'https://up.inari.site/api/v1/tokens',
                                                    type: 'POST',
                                                    dataType: 'json',
                                                    data: formData,
                                                    contentType: "application/json",
                                                    processData: false
                                                }).done(function (data) {
                                                    if (data.status == true) {
                                                        var tokendata = data.data;
                                                        var token = tokendata.token;
                                                        localStorage.removeItem('logindata');
                                                        var tokenarray = [logindata.user_id, logindata.token, token];
                                                        localStorage.setItem('logindata', JSON.stringify(tokenarray));
                                                        var tokenRequest = new XMLHttpRequest();
                                                        tokenRequest.open('POST', 'https://api.inari.site/?s=App.User_User.tupdate&user_id=' + logindata.user_id + '&token=' + logindata.token + '&tupdate=' + token, true);
                                                        tokenRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                                        tokenRequest.send('name=teswe&ee=ef');
                                                        tokenRequest.onreadystatechange = function () {
                                                            if (tokenRequest.readyState == 4 && tokenRequest.status == 200) {
                                                                var tokentext = tokenRequest.responseText;
                                                                var tokenjson = JSON.parse(tokentext);
                                                                if (tokenjson.ret == 200) {
                                                                    alert("已绑定图床Token，现在你可以进行同步操作了！");
                                                                } else {
                                                                    alert('你依然可以进行同步操作。图床账号绑定失败！异常请求返回码：' + tokenjson.ret);
                                                                }
                                                            } else if (tokenRequest.readyState == 4 && tokenRequest.status != 200) {
                                                                alert('你依然可以进行同步操作。图床账号绑定失败！异常请求状态码：' + tokenRequest.status);
                                                            };
                                                        };
                                                    } else if (data.status == false) {
                                                        alert(data.message);
                                                    }
                                                    return;
                                                }).fail(function (data) {
                                                    alert('你依然可以进行同步操作。Oops！图床账号绑定失败！可能是服务器错误或网络问题！');
                                                });
                                                event.preventDefault();
                                            } else {
                                                alert("已自动登录，现在你可以进行同步操作了！");
                                            }
                                        }
                                    };
                                }
                                //注册失败
                                else if (reg.ret != 200) {
                                        alert('Oops！' + reg.msg + '注册失败！返回码：' + reg.ret);
                                    }
                            } else if (regRequest.readyState == 4 && regRequest.status != 200) {
                                alert('用户名或密码不合规，只支持英文、数字和有限的特殊符号如@_');
                            }
                        };
                    } else {
                        alert("两次密码不一致，注册操作已取消！");
                    }
                } else {
                    alert("密码长度不合规，须在6-20位范围内，注册操作已取消！");
                }
            } else {
                alert("用户名长度不合规，须在1-50位范围内，注册操作已取消！");
            }
        }
        return;
    }).on('click', '.kfe-user-s', function (e) {
        $('.kfe-user-p').click();
    }).on('change', '.kfe-user-p', function (e) {
        e.preventDefault();
        var formData = new FormData();
        var file = this.files[0];
        formData = new FormData();
        formData.append('file', file);
        //验证登录，使用token或游客上传
        var authdata = localStorage.logindata;
        if (authdata == null) {
            $.ajax({
                url: 'https://up.inari.site/api/v1/upload',
                type: 'POST',
                dataType: 'json',
                data: formData,
                // 告诉jQuery不要去设置Content-Type请求头
                contentType: false,
                // 告诉jQuery不要去处理发送的数据
                processData: false
            }).done(function (data) {
                if (data.status == true) {
                    var inaridata = data.data;
                    var inarilinks = inaridata.links;
                    alert('游客上传成功！建议登录云同步账号并绑定up.inari.site图床账号！');
                    addCode(textArea, inarilinks.bbcode);
                } else if (data.status == false) {
                    alert(data.message);
                } else {
                    alert('未知错误，' + data);
                }
            }).fail(function (data) {
                alert('图片上传失败');
            });
        } else {
            var authList = JSON.parse(authdata);
            if (authList.length == 2) {
                $.ajax({
                    url: 'https://up.inari.site/api/v1/upload',
                    type: 'POST',
                    dataType: 'json',
                    data: formData,
                    // 告诉jQuery不要去设置Content-Type请求头
                    contentType: false,
                    // 告诉jQuery不要去处理发送的数据
                    processData: false
                }).done(function (data) {
                    if (data.status == true) {
                        var inaridata = data.data;
                        var inarilinks = inaridata.links;
                        alert('游客上传成功！建议绑定up.inari.site图床账号到云同步账号！');
                        addCode(textArea, inarilinks.bbcode);
                    } else if (data.status == false) {
                        alert(data.message);
                    } else {
                        alert('未知错误，' + data);
                    }
                }).fail(function (data) {
                    alert('图片上传失败');
                });
            } else if (authList.length == 3) {
                $.ajax({
                    url: 'https://up.inari.site/api/v1/upload',
                    type: 'POST',
                    dataType: 'json',
                    data: formData,
                    // 告诉jQuery不要去设置Content-Type请求头
                    contentType: false,
                    // 告诉jQuery不要去处理发送的数据
                    processData: false,
                    //设置Header的token
                    beforeSend: function beforeSend(xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + authList[2]);
                    }
                }).done(function (data) {
                    if (data.status == true) {
                        var inaridata = data.data;
                        var inarilinks = inaridata.links;
                        addCode(textArea, inarilinks.bbcode);
                        alert('上传成功！');
                    } else if (data.status == false) {
                        alert(data.message);
                    } else {
                        alert('未知错误，' + data);
                    }
                }).fail(function (data) {
                    alert('图片上传失败');
                });
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