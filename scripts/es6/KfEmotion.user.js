// ==UserScript==
// @name        绯月表情增强插件
// @namespace   https://greasyfork.org/users/5415
// @version     6.4.4
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
const version = '6.4.3';
// 网站是否为KfMobile
const isKfMobile = typeof Info !== 'undefined' && typeof Info.imgPath !== 'undefined';
// PC端是否也总是启用外部字体
const isAlwaysInari = false; //改为true即可启用
// 灰企鹅
const KfSmileList = [];
const KfSmileCodeList = [];
let kfImgPath = typeof imgpath !== 'undefined' ? imgpath : '';
if (isKfMobile) kfImgPath = Info.imgPath;
for (let i = 1; i < 49; i++) {
    KfSmileList.push(`/${kfImgPath}/post/smile/em/em${(i) > 9 ? i : ('0' + i)}.gif`);
    KfSmileCodeList.push(`[s:${i + 9}]`);
}
// 追加，与KF自带用文字截图贴纸【追加小企鹅】做了简单的分隔提醒
for (let i = 0; i < 204; i++) {
    KfSmileList.push(`https://sticker.inari.site/pesoguin/${i}.gif`);
    KfSmileCodeList.push(`[img]https://sticker.inari.site/pesoguin/${i}.gif[/img]`);
}

// 图片搭配自定义文字
const PtSmileList = [];
const PtSmileCodeList = [];
PtSmileList.push(`https://sticker.inari.site/PicText/Pt.png`);
PtSmileCodeList.push(`[align=center][img]此处替换为自定义图片url[/img][/align][align=center][backcolor=#FFFFFF][size=3]  [b]在此输入自定义文字[/b]  [/size][/backcolor][/align]`);
for (let i = 1; i < 38; i++) {
    PtSmileList.push(`https://sticker.inari.site/PicText/${i}.webp`);
    PtSmileCodeList.push(`[align=center][img]https://sticker.inari.site/PicText/${i}.webp[/img][/align][align=center][backcolor=#FFFFFF][size=3]  [b]请在此处输入自定义文字[/b]  [/size][/backcolor][/align]`);
}

// 常用表情
const CommonSmileList = [];
// 小日向雪花
for (let i = 1; i < 7; i++) {
    CommonSmileList.push(`https://sticker.inari.site/yukika/${i}.jpg`);
}
for (let i = 21; i < 24; i++) {
    CommonSmileList.push(`https://sticker.inari.site/yukika/${i}.jpg`);
}
// 血压
for (let i = 48; i < 54; i++) {
    CommonSmileList.push(`https://sticker.inari.site/pop/sticker (${i}).png`);
}
// Touhou（灵梦）
for (let i = 22; i < 46; i++) {
    CommonSmileList.push(`https://sticker.inari.site/touhou/reimu/${i}.jpg`);
}
// 伪中国语
for (let i = 49; i < 83; i++) {
    CommonSmileList.push(`https://sticker.inari.site/fakehan/sticker (${i}).png`);
}

// AC娘表情
const AcSmileList = [];
for (let i = 1; i < 55; i++) {
    AcSmileList.push(`https://sticker.inari.site/acfun/1/${i}.png`);
}
for (let i = 1001; i < 1041; i++) {
    AcSmileList.push(`https://sticker.inari.site/acfun/2/${i}.png`);
}
for (let i = 2001; i < 2056; i++) {
    AcSmileList.push(`https://sticker.inari.site/acfun/3/${i}.png`);
}

// S1麻将脸
const S1SmileList = [];
for (let i = 1; i < 33; i++) {
    S1SmileList.push(`https://sticker.inari.site/s1/${i}.gif`);
}
for (let i = 1; i < 229; i++) {
    S1SmileList.push(`https://sticker.inari.site/s1/${i}.png`);
}

// 阿卡林 from 摇曳百合
const AkarinSmileList = [];
for (let i = 1; i < 21; i++) {
    AkarinSmileList.push(`https://sticker.inari.site/akarin/2/akarin (${i}).gif`);
}
for (let i = 1; i < 72; i++) {
    AkarinSmileList.push(`https://sticker.inari.site/akarin/1/akarin (${i}).png`);
}

// 林大B
const lindaBSmileList = [];
for (let i = 1; i < 52; i++) {
    lindaBSmileList.push(`https://sticker.inari.site/lindaB/lindaB (${i}).jpg`);
}

// 微博&贴吧
const WeiboTbSmileList = [];
for (let i = 0; i < 101; i++) {
    WeiboTbSmileList.push(`https://sticker.inari.site/weibo/${i}.png`);
}
for(let i = 1; i < 10; i++) {
    WeiboTbSmileList.push(`http://tb2.bdstatic.com/tb/editor/images/face/i_f0${i}.png`);
}
for(let i = 10; i < 34; i++) {
    WeiboTbSmileList.push(`http://tb2.bdstatic.com/tb/editor/images/face/i_f${i}.png`);
}

// 暹罗猫小红豆
const SiameseSmileList = [];
for (let i = 1; i < 25; i++) {
    SiameseSmileList.push(`https://sticker.inari.site/usr/Kawaii_Siamese/wx1/${i}.png`);
}
for (let i = 1; i < 25; i++) {
    SiameseSmileList.push(`https://sticker.inari.site/usr/Kawaii_Siamese/wx2/${i}.png`);
}
for (let i = 1; i < 41; i++) {
    SiameseSmileList.push(`https://sticker.inari.site/usr/Kawaii_Siamese/line/${i}.png`);
}

// lovelive表情（小）
const LoveliveSmallSmileList = [];
for (let i = 1; i < 42; i++) {
    LoveliveSmallSmileList.push(`https://sticker.inari.site/lovelive/2/ll (${i}).png`);
}
for (let i = 1; i < 20; i++) {
    LoveliveSmallSmileList.push(`https://sticker.inari.site/lovelive/4/ll (${i}).jpg`);
}

// 少女歌剧&公主链接
const RevPCRSmileList = [];
for (let i = 1; i < 41; i++) {
    RevPCRSmileList.push(`https://sticker.inari.site/revstar/revstar (${i}).png`);
}
for (let i = 1; i < 49; i++) {
    RevPCRSmileList.push(`https://sticker.inari.site/redive/sticker (${i}).png`);
}

// バンドリ
const BandoriSmileList = [];
for (let i = 1; i < 41; i++) {
    BandoriSmileList.push(`https://sticker.inari.site/bangdream/bangdream (${i}).png`);
}

// 随机
const RandomSmileList = [];
for (let i = 1; i < 20; i++) {
    RandomSmileList.push(`https://sticker.inari.site/rgif/${Math.ceil(Math.random()*2555)}.gif`);
}
for (let i = 1; i < 20; i++) {
    RandomSmileList.push(`https://sticker.inari.site/rwebp/${Math.ceil(Math.random()*6930)}.webp`);
}

// 自定义表情
let UserSmileList = [];
let UsersSmileList = [];
if (!localStorage.userimgst) {
    UsersSmileList = ['https://sticker.inari.site/null.jpg'];
}
else {
    try {
        UserSmileList = JSON.parse(localStorage.userimgst);
        for (let i = 0; i < UserSmileList.length; i++){
            UsersSmileList.push(`${UserSmileList[i]}?num=${i+1}`);
        }
    }
    catch (ex) {
        console.log(ex);
    }
}

/**
 * 表情菜单
 */
const MenuList = {
    KfSmile: {datatype: 'imageLink', title: 'KF自带', addr: KfSmileList, ref: KfSmileCodeList},
    Shortcut: {
        datatype: 'plain',
        title: '快捷',
        addr: [
            '[sell=100][/sell]', '[quote][/quote]', '[hide=100][/hide]', '[code][/code]', '[strike][/strike]', '[fly][/fly]','[color=#00FF00][/color]', 
            '[b][/b]', '[u][/u]', '[i][/i]', '[hr]', '[backcolor=][/backcolor]', '[url=][/url]','[img][/img]','[audio]请填写HTML5音频地址[/audio]',
            '[video]请填写HTML5视频地址[/video]','[table][/table]','[tr][/tr]','[td][/td]','[align=left][/align]','[align=center][/align]','[align=right][/align]'
        ],
        ref: [
            '出售贴sell=售价', '引用', '隐藏hide=神秘等级', '插入代码', '删除线', '跑马灯', '文字颜色', '粗体', '下划线','斜体', '水平线', '背景色', '插入链接', '插入图片',
            '插入音频','插入视频','插入表格','插入表格行','插入表格列','左对齐','居中','右对齐'
        ]
    },
    Emoji: {
        datatype: 'plain',
        title: '绘/颜文字',
        addr: [
            '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '😚', '🙂', '🤗', '🤩', '🤔', '🤨', '😐',
            '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '🥱', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑',
            '😲', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '🥵', '🥶', '😳', '🤪', '😵', '🥴', '😠', '😡',
            '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🥳', '🥺', '🤠', '🤡', '🤥', '🤫', '🤭', '🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '👻', '👽',
            '💩', '🙈', '🙉', '🙊', '🐵', '🐶', '🐷', '🐹', '🐸', '🐴', '🐢', '🐍', '🐬', '🐳', '🐓', '👀', '👩', '👨', '🧑', '👧', '👦', '🧒', '👶', '👵',
            '👴', '👳', '‍👮', '🙅', '🙆', '‍🙋', '🤷', '🤺', '💪', '🦵', '🦶', '👂', '🤏', '👈', '👉', '☝', '👆', '👇', '✌', '🤞', '🖖', '🤘', '🤙', '🖐', '✋',
            '👌', '👍', '👎', '✊', '👊', '🤛', '🤜', '🤚', '👋', '🤟', '✍', '👏', '👐', '🙌', '🤲', '🙏', '🤝', '💅', '🎈', '🧧','🎀', '🎁', '🎨', '💎','🌸',
            '⚽', '⚾', '🏀', '🏐', '🏈', '🎱', '🎳','🏓', '🏑', '🎾', '🥇', '🥈', '🥉', '🏅', '🏆', '🎮', '🎲','🔒', '🔑', '💊', '💻', '📱', '📞','💣', '🎻',
            '🎧', '📸', '📺','💽', '🚲', '🚓', '🚑', '🚒', '🚔', '🚢', '🚀', '🛸', '⛵', '🏥','🚽','🧻','⛅', '🔥', '💧', '🌞', '🌜', '🌈', '🍔', '🍟', '🍉',
            '(●・ 8 ・●)', '╰(๑◕ ▽ ◕๑)╯', '(ゝω・)', '〜♪♪', '(ﾟДﾟ≡ﾟДﾟ)', '(＾o＾)ﾉ', '(|||ﾟДﾟ)', '(`ε´ )', '(╬ﾟдﾟ)', '(|||ﾟдﾟ)', '(￣∇￣)', '(￣3￣)', '(￣ｰ￣)',
            '(￣ . ￣)', '(￣︿￣)', '(￣︶￣)', '(*´ω`*)', '(・ω・)', '(⌒▽⌒)', '(￣▽￣）', '(=・ω・=)', '(･∀･)', '(｀・ω・´)', '(〜￣△￣)〜', '(°∀°)ﾉ', '(￣3￣)',
            '╮(￣▽￣)╭', '( ´_ゝ｀)', 'のヮの', '(ﾉ؂< ๑）诶嘿☆～', '(<_<)', '(>_>)', '(;¬_¬)', '(▔□▔)/', '(ﾟДﾟ≡ﾟдﾟ)!?', 'Σ(ﾟдﾟ;)', 'Σ( ￣□￣||)', '(´；ω；`)',
            '（/TДT)/', '(^・ω・^ )', '(｡･ω･｡)', '(oﾟωﾟo)', '(●￣(ｴ)￣●)', 'ε=ε=(ノ≧∇≦)ノ', '(´･_･`)', '(-_-#)', '（￣へ￣）', '(￣ε(#￣) Σ', 'ヽ(`Д´)ﾉ', '( ´ρ`)',
            '(╯°口°)╯(┴—┴', '（#-_-)┯━┯', '_(:3」∠)_', '(笑)','(汗)', '(泣)', '(苦笑)', '(´・ω・`)', '(╯°□°）╯︵ ┻━┻','(╯‵□′)╯︵┻━┻', '( ﾟωﾟ)',
            '(　^ω^)', '(｡◕∀◕｡)', '/( ◕‿‿◕ )\\', 'ε٩( º∀º )۶з', '(￣ε(#￣)☆╰╮(￣▽￣///)', '（●´3｀）~♪', '_(:з」∠)_', 'хорошо!', '＼(^o^)／','(•̅灬•̅ )',
            '(ﾟДﾟ)', '(；°ほ°)', 'ε=ε=ε=┏(゜ロ゜;)┛', '⎝≧⏝⏝≦⎠', 'ヽ(✿ﾟ▽ﾟ)ノ', '|•ω•`)', '小学生は最高だぜ！！', '焔に舞い上がるスパークよ、邪悪な異性交際に、天罰を与え！'
        ]
    },
    PtSmile:  {datatype: 'imageLink', title: '图文', addr: PtSmileList, ref: PtSmileCodeList},
    Common:   {datatype: 'image', title: '常用', addr: CommonSmileList},
    Acfun:    {datatype: 'image', title: 'ACFUN', addr: AcSmileList},
    S1Maj:    {datatype: 'image', title: 'S1', addr: S1SmileList},
    Akari:    {datatype: 'image', title: 'Akari', addr: AkarinSmileList},
    lindaB:   {datatype: 'image', title: '林大B', addr: lindaBSmileList},
    Weibotb:  {datatype: 'image', title: '微博贴吧', addr: WeiboTbSmileList},
    Siamese:  {datatype: 'image', title: '小红豆', addr: SiameseSmileList},
    LoveLive: {datatype: 'image', title: 'LL', addr: LoveliveSmallSmileList},
    RevPCR:   {datatype: 'image', title: '少歌PCR', addr: RevPCRSmileList},
    Bandori:  {datatype: 'image', title: '邦邦', addr: BandoriSmileList},
    Random:   {datatype: 'image', title: '随机', addr: RandomSmileList},
    Userimg:  {datatype: 'image', title: '自定义', addr: UsersSmileList},
};

/**
 * 添加BBCode
 * @param textArea 文本框
 * @param {string} code BBCode
 * @param {string} selText 选择文本
 */
const addCode = function (textArea, code, selText = '') {
    let startPos = !selText ? (code.indexOf('[img]') > -1 || code.indexOf(']') < 0 ? code.length : code.indexOf(']') + 1) : code.indexOf(selText);
    if (typeof textArea.selectionStart !== 'undefined') {
        let prePos = textArea.selectionStart;
        textArea.value = textArea.value.substring(0, prePos) + code + textArea.value.substring(textArea.selectionEnd);
        textArea.selectionStart = prePos + startPos;
        textArea.selectionEnd = prePos + startPos + selText.length;
    }
    else {
        textArea.value += code;
    }
};

/**
 * 显示放大的表情图片
 * @param {jQuery} $img 表情图片对象
 */
const showZoomInImage = function ($img) {
    if ($img.get(0).naturalWidth <= $img.height()) return;
    let offset = $img.offset();
    let $zoomIn = $(`<img class="kfe-zoom-in" src="${$img.attr('src')}" alt="[预览图片]">`).appendTo('body');
    let windowWidth = $(window).width();
    let zoomInWidth = $zoomIn.outerWidth();
    let top = offset.top - $zoomIn.outerHeight() - 5;
    let left = offset.left + $img.width() / 2 - zoomInWidth / 2;
    if (left < 0) left = 0;
    else if (left + zoomInWidth > windowWidth) left = windowWidth - zoomInWidth;
    $zoomIn.css({top, left});
};

/**
 * 获取表情面板的HTML代码
 * @param {string} key 菜单关键字
 * @returns {string} 表情面板内容
 */
const getSmilePanelHtml = function (key) {
    let data = MenuList[key];
    if (!data) return '';
    let html = '';
    for (let i = 0; i < data.addr.length; i++) {
        if (data.datatype === 'image') {
            html += `<img class="kfe-smile" src="${data.addr[i]}" alt="[表情]">`;
        }
        else if (data.datatype === 'imageLink') {
            let ref = typeof data.ref !== 'undefined' && typeof data.ref[i] !== 'undefined' ? data.ref[i] : '';
            html += `<img class="kfe-smile" data-code="${ref}" src="${data.addr[i]}" alt="[表情]">`;
        }
        else if (data.datatype === 'plain') {
            let ref = typeof data.ref !== 'undefined' && typeof data.ref[i] !== 'undefined' ? data.ref[i] : data.addr[i];
            html += `<a class="kfe-smile-text" data-code="${data.addr[i]}" href="#">${ref}</a>`;
        }
    }
    return `<div class="kfe-smile-panel" data-key="${key}">${html}</div>`;
};

/**
 * 获取子菜单的HTML代码
 * @returns {string} 子菜单内容
 */
const getSubMenuHtml = function () {
    let html = '';
    $.each(MenuList, function (key, data) {
        html += `<a class="kfe-sub-menu" data-key="${key}" href="#" title="${data.title}">${data.title}</a>`;
    });
    return html;
};

/**
 * 创建容器
 * @param textArea 文本框
 */
const createContainer = function (textArea) {
    let $container = $(`
<div class="kfe-container">
  <div class="kfe-menu">
    <span class="kfe-close-panel" title="Created by eddie32; Modified by 喵拉布丁, mistakey; Version ${version}" style="cursor: pointer;"><b>囧⑨</b></span>
    ${getSubMenuHtml()}
    <span class="kfe-close-panel">[-]</span>
    <input type="button" class="kfe-user-c" value="增">
    <input type="button" class="kfe-user-r" value="查">
    <input type="button" class="kfe-user-u" value="改">
    <input type="button" class="kfe-user-d" value="删">
  </div>
</div>
`).insertBefore($(textArea));
    $container.on('click', '.kfe-sub-menu', function (e) {
        e.preventDefault();
        let $this = $(this);
        let key = $this.data('key');
        if (!key) return;
        $container.find('.kfe-sub-menu').removeClass('kfe-sub-menu-active');
        $this.addClass('kfe-sub-menu-active');
        $container.find('.kfe-smile-panel').hide();
        let $panel = $container.find(`.kfe-smile-panel[data-key="${key}"]`);
        if ($panel.length > 0) $panel.show();
        else $(getSmilePanelHtml(key)).appendTo($container).show();
    }).on('click', '.kfe-smile, .kfe-smile-text', function (e) {
        e.preventDefault();
        let $this = $(this);
        let code = $this.data('code');
        if (!code) code = `[img]${$this.attr('src')}[/img]`;
        addCode(textArea, code);
        if (/(Mobile|MIDP)/i.test(navigator.userAgent)) textArea.blur();
        else textArea.focus();
    }).on('mouseenter', '.kfe-smile', function () {
        $('.kfe-zoom-in').remove();
        showZoomInImage($(this));
    }).on('mouseleave', '.kfe-smile', function () {
        $('.kfe-zoom-in').remove();
    }).on('click', '.kfe-user-c', function (e) {
        e.preventDefault();
        let userimgaddr = prompt("请输入要添加的贴纸的URL，添加多个请用半角,隔开贴纸URL（添加后刷新页面生效）", "https://sticker.inari.site/inari.png");
        if (!userimgaddr) return;

        let userimgaddrmt = userimgaddr.split(',');
        let addList = [];
        for (let mt = 0; mt < userimgaddrmt.length; mt++) {
            //含http/https协议前缀的完整图片url，请确保未开启防盗链
            if (/(http:|https:).*.(png|jpg|jpeg|gif|webp|bmp|tif)$/i.test(userimgaddrmt[mt])) {
                addList.push(userimgaddrmt[mt]);
            }
            //任意无协议前缀的图片url，默认增加https协议前缀
            else if (/[a-zA-Z0-9\-\.]+\.+[a-zA-Z]+\/.*.(png|jpg|jpeg|gif|webp|bmp|tif)$/i.test(userimgaddrmt[mt])) {
                addList.push('https://'+userimgaddrmt[mt]);
            }
            //由sticker.inari.site托管的用户贴纸组
            else if (/[A-Za-z0-9\_\/]+\/+[0-9\/]+.(png|jpg|jpeg|gif|webp)$/i.test(userimgaddrmt[mt])) {
                addList.push('https://sticker.inari.site/usr/'+userimgaddrmt[mt]);
            }
        }
        
        if (addList.length < userimgaddrmt.length){
            alert('含有非法输入，请检查是否有图片url错误');
        }
        
        if (addList.length > 0) {
            let userSmileList = [];
            if (localStorage.userimgst) {
                try {
                    userSmileList = JSON.parse(localStorage.userimgst);
                }
                catch (ex) {
                    console.log(ex);
                    userSmileList = [];
                }
            }

            userSmileList = [...userSmileList, ...addList];
            localStorage.setItem('userimgst', JSON.stringify(userSmileList));
            alert('贴纸已添加，请刷新');
        }
    }).on('click', '.kfe-user-r', function (e) {
        e.preventDefault();
        if (UserSmileList !="https://sticker.inari.site/null.jpg"){
            prompt("自定义表情贴纸已导出，请复制",UserSmileList);
        }
        else {
            alert("自定义表情贴纸为空！");
        }
    }).on('click', '.kfe-user-u', function (e) {
        e.preventDefault();
        let userimgu = prompt("请输入要替换的贴纸序号", "1");
            if (/[0-9]$/i.test(userimgu)) {
             let userimgst = localStorage.userimgst;
             let UserSmileList = JSON.parse(userimgst);
              if (userimgu > UserSmileList.length) {
                alert('序号超出贴纸数，请检查');
              }
              else if (userimgu == 0) {
                 alert('非法输入，请检查！');
              }
              else if (userimgu <= UserSmileList.length) {
                let usreplace = prompt("请输入用于替换的图片url", "https://sticker.inari.site/inari.png");
                    let j = userimgu;
                    if (/(http:\/\/|https:\/\/).*.(png|jpg|jpeg|gif|webp|bmp|tif)$/i.test(usreplace)) {
                        if (confirm('确定替换序号为【'+userimgu+'】的贴纸吗？这是最后一次确认！')) {
                        UserSmileList[j - 1] = usreplace;
                        localStorage.setItem('userimgst', JSON.stringify(UserSmileList));
                        alert('已替换指定序号贴纸，请刷新');
                        }
                    }
                    else if(usreplace==null){}
                    else {
                        alert('非法输入，请检查！');
                    }
             }
            }
            else if (userimgu == null) { }
            else {
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
          }
          else {
              let userimgd = prompt("请输入要删除贴纸的序号", "1");
              if (/[0-9]$/i.test(userimgd)) {
               let userimgst = localStorage.userimgst;
               let UserSmileList = JSON.parse(userimgst);
               if (userimgd > UserSmileList.length) {
                alert('序号超出贴纸数，请检查');
               }
               else if (userimgd == 0) {
                 alert('非法输入，请检查！');
               }
               else if (userimgd <= UserSmileList.length) {
                 if (confirm('确定删除序号为【'+userimgd+'】的贴纸吗？这是最后一次确认！')) {
                   for (let i = userimgd; i <= UserSmileList.length; i++) {
                        UserSmileList[i - 1] = UserSmileList[i];
                    }
                    UserSmileList.pop();
                   localStorage.setItem('userimgst', JSON.stringify(UserSmileList));
                   alert('已删除指定序号贴纸，请刷新');
                 }
                }
                else {
                        alert('非法输入，请检查！');
                }
             }
             else if (userimgd == null) { }
             else {
                alert('非法输入，请检查！');
             }
          }
        }
    }).find('.kfe-close-panel').click(function () {
        $container.find('.kfe-smile-panel').hide();
    });
};

// code区域支持ASCII画显示
    let codepenEle = document.getElementsByClassName("pd_code_area")
     for(let code of codepenEle){
        code.style.fontFamily= "MS PGothic";
    }

/**
 * 添加CSS
 */
const appendCss = function () {
    $('head').append(`
<style>
  .kfe-container { padding: 5px; vertical-align: middle; font: 12px/1.7em "sans-serif"; }
  .kfe-menu { margin-bottom: 5px; }
  .kfe-sub-menu { margin: 0 4px; text-decoration: none; border-bottom: 2px solid transparent; }
  .kfe-sub-menu:hover, .kfe-sub-menu:focus { text-decoration: none; border-color: deeppink; }
  a.kfe-sub-menu-active { color: black }
  .kfe-smile-panel { display: none; height: 136px; padding: 5px 3px; overflow-y: auto; border-top: 1px solid #ddd; }
  .kfe-smile-panel[data-key="Shortcut"] { height: auto; }
  .kfe-smile { display: inline-block; max-width: 60px; max-height: 60px; cursor: pointer; }
  .kfe-smile-text { display: inline-block; padding: 3px 5px; }
  .kfe-smile-text:hover { color: #fff !important; background-color: #2b2b2b; text-decoration: none; }
  .kfe-close-panel { cursor: pointer; }
  .kfe-zoom-in {
    position: absolute; max-width: 150px; max-height: 150px; background-color: #fcfcfc; border: 3px solid rgba(242, 242, 242, 0.6);
    border-radius: 2px; box-shadow: 0 0 3px rgb(102, 102, 102);
  }
  .pd_code_area{ line-height:14px; }/* 设置code的DIV行距行高14px */
</style>
`);
    
    if (isAlwaysInari == true) {
        $('head').append(`
<style>
  @font-face{
    font-family: "MS PGothic";
    src: url("https://sticker.inari.site/home/MS-PGothic.ttf");
  }
  .pre-scrollable{ line-height:14px ;font-family: MS PGothic; }/* 设置code的DIV行距行高14px 字体为MS PGothic */
  .kfe-container { padding: 5px; vertical-align: middle; font: 12px/1.7em "sans-serif"; }
  .kfe-menu { margin-bottom: 5px; }
  .kfe-sub-menu { margin: 0 5px; text-decoration: none; border-bottom: 2px solid transparent; }
  .kfe-sub-menu:hover, .kfe-sub-menu:focus { text-decoration: none; border-color: deeppink; }
  a.kfe-sub-menu-active { color: black }
  .kfe-smile-panel { display: none; height: 136px; padding: 5px 3px; overflow-y: auto; border-top: 1px solid #ddd; }
  .kfe-smile-panel[data-key="Shortcut"] { height: auto; }
  .kfe-smile { display: inline-block; max-width: 60px; max-height: 60px; cursor: pointer; }
  .kfe-smile-text { display: inline-block; padding: 3px 5px; }
  .kfe-smile-text:hover { color: #fff !important; background-color: #2b2b2b; text-decoration: none; }
  .kfe-close-panel { cursor: pointer; }
  .kfe-zoom-in {
    position: absolute; max-width: 150px; max-height: 150px; background-color: #fcfcfc; border: 3px solid rgba(242, 242, 242, 0.6);
    border-radius: 2px; box-shadow: 0 0 3px rgb(102, 102, 102);
  }
</style>
`);
   }
    
    if (isKfMobile) {
        $('head').append(`
<style>
  #readPage .kfe-container, #writeMessagePage .kfe-container { margin-top: -10px; }
  .kfe-menu { white-space: nowrap; overflow-x: auto; }
   @font-face{font-family: "MS PGothic";
    src: url("https://sticker.inari.site/home/MS-PGothic.ttf");}
  .pre-scrollable{ line-height:14px ;font-family: MS PGothic; }/* 设置code的DIV行距行高14px 字体为MS PGothic */
</style>
`);
    }
};

/**
 * 初始化
 */
const init = function () {
    let $textAreas = $('textarea');
    if (!$textAreas.length) return;
    appendCss();
    $textAreas.each(function () {
        createContainer(this);
    });
};

init();
