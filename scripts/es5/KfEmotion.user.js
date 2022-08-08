// ==UserScript==
// @name        绯月表情增强插件
// @namespace   https://greasyfork.org/users/729911
// @version     6.42
// @author      eddie32,喵拉布丁,mistakey(Hazukikaguya)
// @description KF论坛专用的回复表情，插图扩展插件，在发帖时快速输入自定义表情和论坛BBCODE
// @icon        https://sticker.inari.site/favicon.ico
// @homepage    https://github.com/HazukiKaguya/Stickers_PlusPlus
// @include     https://*kfpromax.com/*
// @include     https://*9shenmi.com*
// @include     https://*kfmax.com/*
// @include     https://*bakabbs.com/*
// @include     https://*365gal.com/*
// @include     https://*365galgame.com/*
// @include     https://kfol.moe.edu.rs/*
// @include     https://*miaola.work/*
// @copyright   2014-2017, eddie32; 2020-2022, Hazukikaguya
// @grant       none
// @license     MIT
// @run-at      document-end
// @modifier-source https://raw.githubusercontent.com/miaolapd/KF_Online_Assistant/master/scripts/es6/KfEmotion.user.js
// ==/UserScript==


/**
 * 各种设置
 */
'use strict';
// 默认配置

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var updatelog = '版本V6.42, 本次更新日志: \n 支持在线表情组获取&创作者投稿贴纸组，为KF增加实时可视化编辑，代码重构分离function，修复bugs.',
    defaultSConf = {
    "version": "2.0.0",
    "kanbansize": "64",
    "kanbanimg": "https://sticker.inari.site/truenight.gif",
    "imgapi": "https://up.inari.site/api/v1/",
    "cloudapi": "https://api.inari.site/?s=App.User.",
    "onlineraw": "https://api.inari.site/?s=App.Sticker.",
    "notauthed": false,
    "realedit": false,
    "markdown": false,
    "lcimglists": false,
    "olimglists": []
},
    mqcheck = ["&multiquote"],
    uploadfile = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAAAVCAYAAADGpvm7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMGSURBVFhH7ZkxduIwEIZ/71lsCl5OYJ8Ap6Gi3c6UcIAt9wCmjLttqWgwJ8An4FFg30U7Y0kgWTaBgEkRf+/pkcgjaTRI848TTxAY6J1f6nOgZ3oNdLWK4HkRVpXqeCXVCpHnIbph8d3cIz+5dfv66F5+/InmAMZZiLQUEGKPhU+du3kd+PlO2jyDHx7oCtt1AYQzvHOAGxxOz7uKQ45m3kaw4jz5oNMtsK+P93MYAv0iVKArrCISg2hFP5mofiNZXURBPatFRLbbc5o71vPmaBsu1zPsWhfZYW7asH+letSBnDfAkjIHsliO0/u/K0ffFocvnugCyyDA8Q8LiGxlGpK/tzjHQaENIkWpxnLLkwxxU9Vpw7/x72wjyhQhBcWqJOrqIkaW5IbdDOt4SV524y/2ZFuC3Ab02P3CTiGf0rKXPKnj4FQ79JAoBS0oEKb0k4nqT3L1O/WkIb/giJBk2sadQ9qGwjQlP6gvEZcZNblIaF5zLRd3jc758qTDTxN3fzVqrNl9z17a+r94okPMHJn28T6j41Ec0X1rd9hk9JFMMZEdBhNMKdLINnYKUfWwvJbqqp+5Ml8wJi/7pHvtYMwrH2AWLT2Iob2ARXWip/Q1jQP5ewPpoEblvuBKCvhkvpeg87vRAvs01Dw10OWRF3jDqCvR+SN6yoe+/czL8YpqCy5xz/mzbiqnatR834rln9nUy49CBdrHSEbAvvZ6sw4F3FhdSwuajvRQU+HEx1OPL4/1SU6m5mwlzO+C7gD4EhTrrawWDKrt+qoYPo7ay+HkrN0KRV/iiIcSioZAaTG0hUHb2mLRJiDUKSg2jvA6AqLtjLWlTWOs8tsSNN1Hzd2PKVKPiWGbjwzbNkX4kjrobYgMUCwDlWu4fGtc1TMh0pxKqEDnJRapBHnjurTiL7DnFEBFUWDktfjAJdLH5TawHUXWzIGbaYs//BbXsPP+jlFyKahMeqPeS46kkae5JG2+Vd7992gu9EmfkJY3BHXgTA9Vx0AbQ6BfxBDoFzH8z/AlAP8BmM5ocebFmOwAAAAASUVORK5CYII=',
    notbindText = "图片上传将使用游客上传！已登录，现在你可以进行同步操作了！",
    lengtherrText = "长度不合规，位数应在以下范围内：",
    imguperrText = "图片上传失败，可能是网络原因。",
    guestupimgText = "游客上传成功！建议绑定up.inari.site图床账号到云同步账号！",
    kanbanerrText = "当前存在多个文本区，无法确认上传区域，看板娘点击上传暂不可用！",
    resText = "已重置，请刷新！";
// 本地贴纸数据源
var LocalRaws = [{ "id": 1, "desc": "AC娘表情贴纸，属于AcSmileList，AC娘。", "cover": "https://sticker.inari.site/acfun/1/1.png", "name": "_Acfun", "title": 'AC娘', "addr": "_AcSmileList", "numstart": [1, 1001, 2001], "numend": [55, 1041, 2056], "url1": ["https://sticker.inari.site/acfun/1/", "https://sticker.inari.site/acfun/2/", "https://sticker.inari.site/acfun/3/"], "url2": [".png", ".png", ".png"] }, { "id": 2, "desc": "华语第三动漫高手论坛S1的麻将脸表情包喵~", "cover": "https://sticker.inari.site/s1/1.gif", "name": "_S1", "title": 'S1', "addr": "_S1SmileList", "numstart": [1, 1], "numend": [21, 229], "url1": ["https://sticker.inari.site/s1/", "https://sticker.inari.site/s1/"], "url2": [".gif", ".png"] }, { "id": 3, "desc": "《摇曳百合》的阿卡林的表情包~", "cover": "https://sticker.inari.site/akarin/2/akarin (1).gif", "name": "_Akarin", "title": '阿卡林', "addr": "_AkarinSmileList", "numstart": [1, 1], "numend": [21, 72], "url1": ["https://sticker.inari.site/akarin/2/akarin (", "https://sticker.inari.site/akarin/1/akarin ("], "url2": [").gif", ").png"] }, { "id": 4, "desc": "小B是画师林大B练习用的看板娘，最初是在sosg论坛上出现~", "cover": "https://sticker.inari.site/lindaB/lindaB (1).jpg", "name": "_xiaoB", "title": '小B', "addr": "_xiaoBSmileList", "numstart": [1], "numend": [52], "url1": ["https://sticker.inari.site/lindaB/lindaB ("], "url2": [").jpg"] }, { "id": 5, "desc": "微博贴吧表情包", "cover": "https://sticker.inari.site/weibo/1.png", "name": "_Weitb", "title": '微博贴吧', "addr": "_WeitbSmileList", "numstart": [1, 1, 10], "numend": [101, 10, 34], "url1": ["https://sticker.inari.site/weibo/", "https://tb2.bdstatic.com/tb/editor/images/face/i_f0", "https://tb2.bdstatic.com/tb/editor/images/face/i_f"], "url2": [".png", ".png", ".png"] }, { "id": 6, "desc": "暹罗猫小红豆，世界，就是绕着猫打转！", "cover": "https://sticker.inari.site/usr/Kawaii_Siamese/line/0_show.png", "name": "_Siamese", "title": '小红豆', "addr": "_SiameseSmileList", "numstart": [1, 1, 1], "numend": [25, 25, 41], "url1": ["https://sticker.inari.site/usr/Kawaii_Siamese/wx1/", "https://sticker.inari.site/usr/Kawaii_Siamese/wx2/", "https://sticker.inari.site/usr/Kawaii_Siamese/line/"], "url2": [".png", ".png", ".png"] }, { "id": 7, "desc": "Lovelive表情贴纸~", "cover": "https://sticker.inari.site/lovelive/2/ll (1).png", "name": "_LL", "title": 'LL', "addr": "_LLSmileList", "numstart": [1, 1], "numend": [42, 20], "url1": ["https://sticker.inari.site/lovelive/2/ll (", "https://sticker.inari.site/lovelive/4/ll ("], "url2": [").png", ").jpg"] }, { "id": 8, "desc": "少女☆歌剧。去吧，两人一起，摘下那颗星。", "cover": "https://sticker.inari.site/revstar/revstar (1).png", "name": "_Revue", "title": '少歌', "addr": "_RevueSmileList", "numstart": [1], "numend": [41], "url1": ["https://sticker.inari.site/revstar/revstar ("], "url2": [").png"] }, { "id": 9, "desc": "公主连结Re:Dive。いま、新たな冒険の幕が上がる——", "cover": "https://sticker.inari.site/redive/sticker (1).png", "name": "_Redive", "title": 'PCR', "addr": "_RediveSmileList", "numstart": [1], "numend": [49], "url1": ["https://sticker.inari.site/redive/sticker ("], "url2": [").png"] }, { "id": 10, "desc": "BanG Dream！噜~ キラキラ☆ドキドキ~ ふえぇ~", "cover": "https://sticker.inari.site/bangdream/bangdream (1).png", "name": "_Bandori", "title": '邦邦', "addr": "_BandoriSmileList", "numstart": [1], "numend": [41], "url1": ["https://sticker.inari.site/bangdream/bangdream ("], "url2": [").png"] }],
    customize = defaultSConf,
    userimgst = void 0,
    loconsticker = void 0,
    loadcustom = void 0;
// 客制化配置
if (!localStorage.StickerConf) {
    loadcustom = false;localStorage.setItem('StickerConf', JSON.stringify(defaultSConf));
} else {
    loadcustom = true;customize = JSON.parse(localStorage.StickerConf);
};
if (customize.version != defaultSConf.version) {
    console.log("个性化配置版本不匹配，自动进行兼容性变更！");
    customize.version = defaultSConf.version;
    if (!customize.kanbanimg) customize.kanbanimg = defaultSConf.kanbanimg;
    if (!customize.kanbansize) customize.kanbansize = defaultSConf.kanbansize;
    if (!customize.imgapi) customize.imgapi = defaultSConf.imgapi;
    if (!customize.cloudapi) customize.cloudapi = defaultSConf.cloudapi;
    if (!customize.onlineraw) customize.onlineraw = defaultSConf.onlineraw;
    if (!customize.notauthed) customize.notauthed = defaultSConf.notauthed;
    if (!customize.realedit) customize.realedit = defaultSConf.realedit;
    if (!customize.markdown) customize.markdown = defaultSConf.markdown;
    if (!customize.lcimglists) customize.lcimglists = defaultSConf.lcimglists;
    if (!customize.olimglists) customize.olimglists = defaultSConf.olimglists;
    localStorage.setItem('StickerConf', JSON.stringify(customize));
    localStorage.removeItem('onlineraws');localStorage.removeItem('Alertless');sessionStorage.removeItem('localSmile');sessionStorage.removeItem('OnlineSmile');
    console.log("兼容性变更完成！");
};
!localStorage.userimgst ? userimgst = '["https://sticker.inari.site/null.jpg"]' : userimgst = localStorage.userimgst;
!customize.lcimglists ? loconsticker = [] : loconsticker = customize.lcimglists;

/**
 * 初始化杂项
 */
var UserSmileList = JSON.parse(userimgst),
    imgapi = customize.imgapi,
    cloudapi = customize.cloudapi,
    FinalList = [],
    FinalRaw = [],
    KfSmileList = [],
    KfSmileCodeList = [],
    RandomSmileList = [],
    UsersSmileList = [],
    MenuList = {};
var isMQ = false,
    realedits = true,
    realedit = customize.realedit,
    kfImgPath = void 0,
    olAuth = sessionStorage.OnlineSmile,
    locAuth = sessionStorage.localSmile,
    OnlineRaws = [],
    uupath = [],
    localSmile = [],
    realeditcheck = '',
    OnlineSmile = void 0,
    code_htm = void 0,
    code_num = void 0,
    OnlineRawslists = void 0,
    olhaved = void 0;
if (realedit && isMQ == false) {
    realeditcheck = 'checked';
}
if (localStorage.onlineraws) {
    OnlineRaws = JSON.parse(localStorage.onlineraws);
}
// 网站是否为KfMobile
var isKfMobile = typeof Info !== 'undefined' && typeof Info.imgPath !== 'undefined';
kfImgPath = typeof imgpath !== 'undefined' ? imgpath : '';if (isKfMobile) kfImgPath = Info.imgPath;
// 检测多重引用
for (var i = 0; i < mqcheck.length; i++) {
    if (window.location.href.indexOf(mqcheck[i]) > -1) {
        isMQ = true;
    }
}

/**
 * 初始化表情图片
 */
// 灰企鹅
if (isKfMobile) kfImgPath = Info.imgPath;for (var _i = 1; _i < 49; _i++) {
    KfSmileList.push('/' + kfImgPath + '/post/smile/em/em' + (_i > 9 ? _i : '0' + _i) + '.gif');KfSmileCodeList.push('[s:' + (_i + 9) + ']');
}
for (var _i2 = 1; _i2 < 204; _i2++) {
    KfSmileList.push('https://sticker.inari.site/pesoguin/' + _i2 + '.gif');
    KfSmileCodeList.push('[img]https://sticker.inari.site/pesoguin/' + _i2 + '.gif[/img]');
}

// 随机
RandomSmileList.push('https://sticker.inari.site/yukika/' + Math.ceil(Math.random() * 6) + '.jpg');
for (var _i3 = 0; _i3 < 29; _i3++) {
    RandomSmileList.push('https://sticker.inari.site/rwebp/' + Math.ceil(Math.random() * 6930) + '.webp');
}
for (var _i4 = 1; _i4 < 10; _i4++) {
    RandomSmileList.push('https://sticker.inari.site/rgif/' + Math.ceil(Math.random() * 2555) + '.gif');
}
// 自定义
!localStorage.userimgst ? userimgst = '["https://sticker.inari.site/null.jpg"]' : userimgst = localStorage.userimgst;
for (var _i5 = 0; _i5 < UserSmileList.length; _i5++) {
    UsersSmileList.push(UserSmileList[_i5] + '#num=' + (_i5 + 1));
}
// 来自本地数据源的表情贴纸
!customize.lcimglists ? loconsticker = [] : loconsticker = customize.lcimglists;
for (var t = 0; t < loconsticker.length; t++) {
    localSmile[t] = LocalRaws[loconsticker[t]];
}
if (locAuth == null) {
    for (var _t = 0; _t < localSmile.length; _t++) {
        localSmile[_t].addr = [];
        for (var _i6 = 0; _i6 < localSmile[_t].numstart.length; _i6++) {
            for (var ii = localSmile[_t].numstart[_i6]; ii < localSmile[_t].numend[_i6]; ii++) {
                localSmile[_t].addr.push(localSmile[_t].url1[_i6] + ii + localSmile[_t].url2[_i6]);
            }
        }
    }
    sessionStorage.setItem('localSmile', JSON.stringify(localSmile));
}
localSmile = JSON.parse(sessionStorage.localSmile);
// 来自在线数据源的表情贴纸
if (olAuth == null) {
    var onlineSmile = OnlineRaws;
    for (var s = 0; s < onlineSmile.length; s++) {
        onlineSmile[s].addr = [];for (var _i7 = 0; _i7 < onlineSmile[s].numstart.length; _i7++) {
            for (var _ii = onlineSmile[s].numstart[_i7]; _ii < onlineSmile[s].numend[_i7]; _ii++) {
                onlineSmile[s].addr.push(onlineSmile[s].url1[_i7] + _ii + onlineSmile[s].url2[_i7]);
            }
        }
    }sessionStorage.setItem('OnlineSmile', JSON.stringify(onlineSmile));
}
OnlineSmile = JSON.parse(sessionStorage.OnlineSmile);

/**
 * 表情菜单
*/
MenuList['KfSmile'] = { datatype: 'imageLink', title: '小企鹅', desc: 'KF论坛的小企鹅表情', addr: KfSmileList, ref: KfSmileCodeList };
MenuList['Shortcut'] = {
    datatype: 'plain', title: '快捷', desc: '发帖实用BBcode',
    addr: ['[sell=100][/sell]', '[quote][/quote]', '[backcolor=#000][color=#000]在此输入[/color][/backcolor]', '[hide=100][/hide]', '[code][/code]', '[strike][/strike]', '[fly][/fly]', '[color=#00FF00][/color]', '[b][/b]', '[u][/u]', '[i][/i]', '[hr]', '[backcolor=][/backcolor]', '[url=][/url]', '[img][/img]', '[url=][img][/img][/url]', '[table][/table]', '[tr][/tr]', '[td][/td]', '[align=left][/align]', '[align=center][/align]', '[align=right][/align]', '[audio][/audio]', '[video][/video]', '[email][/email]', '[list][/list]', '[/align]这里是签名档内容，可以随意修改，支持bbcode，实验性功能，喵拉手机版不显示，编辑帖子后如果有修改说明会导致喵拉手机版重复显示两次内容。', '[align=center][img]此处替换为自定义图片url[/img][/align][align=center][backcolor=#FFF][size=3]  [b]在此输入自定义文字[/b]  [/size][/backcolor][/align]'],
    ref: ['出售贴sell=售价', '引用', '隐藏(黑条)', '隐藏hide=神秘等级', '插入代码', '删除线', '跑马灯', '文字颜色', '粗体', '下划线', '斜体', '水平线', '背景色', '插入链接', '插入图片', '插入超链接图片', '插入表格', '插入表格行', '插入表格列', '左对齐', '居中', '右对齐', '插入音频', '插入视频', 'Email', '插入列表', '签名档[实验性功能]', '自定义表情配文字']
};
MenuList['Markdown'] = {
    datatype: 'plain', title: 'M↓', desc: 'Markdown语法，如需全局更换为markdown请前往【自定义】-》【个性设置】，勾选【使用Markdown取代BBcode】',
    addr: ['> ', '**', '****', '---', '~~~~', '<u></u>', '``', '[]()', '![]()', '# '],
    ref: ['引用', '斜体', '粗体', '分割线', '删除线', '下划线', '代码', '链接', '图片', '标题']
};
MenuList['Random'] = { datatype: 'image', title: '随机', desc: '从随机表情贴纸池里随机抽取表情贴纸！', addr: RandomSmileList }, MenuList['Userimg'] = { datatype: 'image', title: '自定义', desc: '你自己新增的表情贴纸都在这里！', addr: UsersSmileList };
MenuList['Kaomoji'] = {
    datatype: 'plain',
    title: ':)',
    desc: '颜文字',
    addr: ['(●・ 8 ・●)', '╰(๑◕ ▽ ◕๑)╯', '(ゝω・)', '〜♪♪', '(ﾟДﾟ≡ﾟДﾟ)', '(＾o＾)ﾉ', '(|||ﾟДﾟ)', '(`ε´ )', '(╬ﾟдﾟ)', '(|||ﾟдﾟ)', '(￣∇￣)', '(￣3￣)', '(￣ｰ￣)', '(￣ . ￣)', '(￣︿￣)', '(￣︶￣)', '(*´ω`*)', '(・ω・)', '(⌒▽⌒)', '(￣▽￣）', '(=・ω・=)', '(･∀･)', '(｀・ω・´)', '(〜￣△￣)〜', '(°∀°)ﾉ', '(￣3￣)', '╮(￣▽￣)╭', '( ´_ゝ｀)', 'のヮの', '(ﾉ؂< ๑）诶嘿☆～', '(<_<)', '(>_>)', '(;¬_¬)', '(▔□▔)/', '(ﾟДﾟ≡ﾟдﾟ)!?', 'Σ(ﾟдﾟ;)', 'Σ( ￣□￣||)', '(´；ω；`)', '（/TДT)/', '(^・ω・^ )', '(｡･ω･｡)', '(oﾟωﾟo)', '(●￣(ｴ)￣●)', 'ε=ε=(ノ≧∇≦)ノ', '(´･_･`)', '(-_-#)', '（￣へ￣）', '(￣ε(#￣) Σ', 'ヽ(`Д´)ﾉ', '( ´ρ`)', '(╯°口°)╯(┴—┴', '（#-_-)┯━┯', '_(:3」∠)_', '(笑)', '(汗)', '(泣)', '(苦笑)', '(´・ω・`)', '(╯°□°）╯︵ ┻━┻', '(╯‵□′)╯︵┻━┻', '( ﾟωﾟ)', '(　^ω^)', '(｡◕∀◕｡)', '/( ◕‿‿◕ )\\', 'ε٩( º∀º )۶з', '(￣ε(#￣)☆╰╮(￣▽￣///)', '（●´3｀）~♪', '_(:з」∠)_', 'хорошо!', '＼(^o^)／', '(•̅灬•̅ )', '(ﾟДﾟ)', '(；°ほ°)', 'ε=ε=ε=┏(゜ロ゜;)┛', '⎝≧⏝⏝≦⎠', 'ヽ(✿ﾟ▽ﾟ)ノ', '|•ω•`)', '小学生は最高だぜ！！', '焔に舞い上がるスパークよ、邪悪な異性交際に、天罰を与え！']
};
for (var _s = 0; _s < localSmile.length; _s++) {
    MenuList['' + localSmile[_s].name] = { datatype: 'image', title: localSmile[_s].title, desc: localSmile[_s].desc, addr: localSmile[_s].addr };
}
for (var _s2 = 0; _s2 < OnlineSmile.length; _s2++) {
    MenuList['' + OnlineSmile[_s2].name] = { datatype: 'image', title: OnlineSmile[_s2].title, desc: OnlineSmile[_s2].desc, addr: OnlineSmile[_s2].addr };
}

/**
 * 添加BBCode
 * @param textArea 文本框
 * @param {string} code BBCode
 * @param {string} selText 选择文本
 */
var addCode = function addCode(textArea, code) {
    var selText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var startPos = void 0;
    if (customize.markdown == false) {
        startPos = !selText ? code.indexOf('[img]') > -1 || code.indexOf(']') < 0 ? code.length : code.indexOf(']') + 1 : code.indexOf(selText);
    } else if (customize.markdown == true) {
        startPos = !selText ? code.indexOf('[]') > -1 && code.length < 10 ? code.length - 1 : code.indexOf('*') > -1 || code.indexOf('`') > -1 || code.indexOf('<') > -1 || code.indexOf('~') > -1 ? Math.floor(code.length / 2) : code.length : code.indexOf(selText);
    }
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
    for (var _i8 = 0; _i8 < data.addr.length; _i8++) {
        if (data.datatype === 'image') {
            html += '<img class="kfe-smile" src="' + data.addr[_i8] + '" alt="[\u8868\u60C5]">';
        } else if (data.datatype === 'imageLink') {
            var ref = typeof data.ref !== 'undefined' && typeof data.ref[_i8] !== 'undefined' ? data.ref[_i8] : '';
            html += '<img class="kfe-smile" data-code="' + ref + '" src="' + data.addr[_i8] + '" alt="[\u8868\u60C5]">';
        } else if (data.datatype === 'plain') {
            var _ref = typeof data.ref !== 'undefined' && typeof data.ref[_i8] !== 'undefined' ? data.ref[_i8] : data.addr[_i8];
            html += '<a class="kfe-smile-text" data-code="' + data.addr[_i8] + '"  href="#">' + _ref + '</a>';
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
        html += '<a class="kfe-sub-menu" data-key="' + key + '" href="#" title="' + data.desc + '">' + data.title + '</a>';
    });
    return html;
};

/**
 * 创建容器
 * @param textArea 文本框
 */
// 看板娘
var kfekanban = document.createElement("div");
if (isKfMobile == true) {
    kfekanban.innerHTML = '<div id = "kfekanban" style = "position:fixed;left:5px;top:300px;z-index:88;cursor:pointer;" >\n  <img class="kfekanban" src = ' + customize.kanbanimg + ' width ="32%"} height ="32%"}></div>';
} else {
    if (localStorage.imgpvpc != null) {
        var imgpvpc = localStorage.imgpvpc;var imgpvpcpush = JSON.parse(imgpvpc);
        kfekanban.innerHTML = '<div id = "kfekanban" style = "position:fixed;left:' + imgpvpcpush[0] + ';top:' + imgpvpcpush[1] + ';z-index:88;cursor:pointer;" >\n  <img class="kfekanban" src = ' + customize.kanbanimg + ' width =' + (customize.kanbansize + "%") + ' height =' + (customize.kanbansize + "%") + '></div>';
    } else {
        kfekanban.innerHTML = '<div id = "kfekanban" style = "position:fixed;left:5px;top:40px;z-index:88;cursor:pointer;" >\n  <img class="kfekanban" src = ' + customize.kanbanimg + ' width =' + (customize.kanbansize + "%") + ' height =' + (customize.kanbansize + "%") + '></div>';
    }
}document.body.appendChild(kfekanban);
var imgpv = document.getElementById("kfekanban");window.onload = function () {
    drag(imgpv);
};
// 表情商店相关
var KfeDialogHtml = '\n <form>\n <div class="kfe-shop_box" id="Kfe-shop-dialog" style="display: block; top: 8px; left: 336px;">\n   <sheader><logo>&nbsp;&nbsp;&nbsp;\u8868\u60C5\u8D34\u7EB8\u5546\u5E97 | Sticker Shop</logo>\n     <span class="kfe-close-shop">\xD7&nbsp;&nbsp;</span></sheader>\n     <div class="kfe-shop_main" ><br>\n     <div class="Kfe-list-content"></div>\n </div>\n <div class="pd_cfg_btns"></div>\n <div class="sticker-pages"><div class="Kfe-list-pagination"></div></div>\n <div class="kfe-shop_footer">\n     <a target="_blank" href="https://stickers.inari.site/terms">Terms Of Service/\u670D\u52A1\u6761\u6B3E</a> | <a target="_blank" href="https://stickers.inari.site/rules">Privacy Policy/\u9690\u79C1\u7B56\u7565</a> | <a target="_blank" href="https://stickers.inari.site/qa">Q&A/\u5E38\u89C1\u95EE\u9898</a> |\n     \xA9mistakey&nbsp;&nbsp;\n   </div></div></form>\n ',
    KfeUploadHtml = '<form><div class="kfe-shop_box" id="Kfe-shop-dialog" style="display: block; top: 8px; left: 336px;">\n    <sheader><logo>&nbsp;&nbsp;&nbsp;\u8868\u60C5\u8D34\u7EB8\u5546\u5E97 | Sticker Shop</logo><span class="kfe-close-shop">\xD7&nbsp;&nbsp;</span></sheader>\n    <div class="kfe-shop_main" ><br>\n    <div class="Kfe-list-content">\n    <h3>\u5F00\u53D1\u6587\u6863: \u6807\u51C6\u5316\u6570\u636E\u6E90\u683C\u5F0F</h3>\n    <p>{"id":int,"desc":"\u8FD9\u91CC\u662F\u63CF\u8FF0\uFF0C\u9F20\u6807\u79FB\u5230\u8BE5\u5206\u7EC4\u65F6\u4F1A\u663E\u793A","cover":"url","name":"_Name","title":"\u5C55\u793A\u7684\u540D\u5B57","addr":"_NameList","numstart":[int,int,...],"numend":[int,int,...],"url1":["url\u524D1","url\u524D2",...],"url2":["url\u540E1","url\u540E1",...]};</p>\n    </div>\n    </div>\n    <div class="sticker-pages"><div class="Kfe-list-pagination">\n    </div>\n    </div>\n    <div class="kfe-shop_footer">\n    <a target="_blank" href="https://stickers.inari.site/terms">Terms Of Service/\u670D\u52A1\u6761\u6B3E</a> | <a target="_blank" href="https://stickers.inari.site/rules">Privacy Policy/\u9690\u79C1\u7B56\u7565</a> | <a target="_blank" href="https://stickers.inari.site/qa">Q&A/\u5E38\u89C1\u95EE\u9898</a> |\n    \xA9mistakey&nbsp;&nbsp;</div>\n</div></form>',
    KfelogedUp = '<form method="POST" action="https://api.inari.site/?s=App.Examples_Upload.Go" target="NoRefreash" enctype="multipart/form-data">\n    <p><b>\u68C0\u6D4B\u5230\u5DF2\u767B\u5F55\uFF0C\u53EF\u4EE5\u5728\u6B64\u76F4\u63A5\u4E0A\u4F20\u8868\u60C5\u8D34\u7EB8\u7EC4\u538B\u7F29\u5305(\u6700\u592750M)\u5E76\u83B7\u53D6\u8FD4\u56DE\u503C</b></p>\n    <input class=\'Kfe-pagination-nowpage-button\' type="file" name="file">\n    <input class=\'Kfe-pagination-nowpage-button\' type="submit"></form>\n    <iframe src="" frameborder="0" name="NoRefreash" style="width:100%;height:42px"></iframe>',
    KfeunlogUp = '<p><b>\u672A\u767B\u5F55\u6216\u767B\u5F55\u5931\u6548\uFF0C\u767B\u5F55\u540E\u521B\u4F5C\u8005\u53EF\u4EE5\u76F4\u63A5\u5728\u6B64\u4E0A\u4F20\u8868\u60C5\u8D34\u7EB8\u7EC4\u538B\u7F29\u5305\u5E76\u83B7\u53D6\u8FD4\u56DE\u503C</b></p>',
    KfetextUp = '<h3>\u8BF7\u6309\u5982\u4E0B\u683C\u5F0F\u586B\u5199""\u5185\u7684\u5185\u5BB9\uFF0C\u7136\u540E\u90AE\u4EF6\u5185\u5BB9\u81F3 <a herf="mailto:Hazukikaguya@office.inari.site">Hazukikaguya@office.inari.site</a></h3><p>\n    \u540D\u79F0: "\u8FD9\u91CC\u586B\u5199\u5C55\u793A\u5728\u5546\u5E97\u9875\u9762\u7684\u63CF\u8FF0\u540D\u79F0"<br>\n    \u4F5C\u8005: "\u8FD9\u91CC\u586B\u5199\u4F5C\u8005"<br>\n    \u63CF\u8FF0: "\u8FD9\u91CC\u662F\u63CF\u8FF0\uFF0C\u9F20\u6807\u79FB\u5230\u8BE5\u5206\u7EC4\u65F6\u4F1A\u663E\u793A"<br>\n    \u6807\u9898: "\u8FD9\u91CC\u586B\u5199\u542F\u7528\u540E\u5C55\u793A\u7684\u540D\u5B57\uFF08\u5982\u90A6\u90A6/S1/AC\u5A18 \u8FD9\u79CD\u7B80\u77ED\u7684\uFF09"<br>\n    \u5C01\u9762: "\u8FD9\u91CC\u586B\u5199\u5C55\u793A\u5728\u5546\u5E97\u9875\u9762\u7684\u5C01\u9762\u56FE\u7247\u7684url\u94FE\u63A5\uFF0C\u5EFA\u8BAE\u4F7F\u7528\u90AE\u4EF6\u9644\u4EF6"<br>\n    \u94FE\u63A5: "\u8FD9\u91CC\u586B\u5199\u53EF\u4E0B\u8F7D\u5E16\u7EB8\u7EC4\u7684url/\u538B\u7F29\u5305\u3002\u767B\u5F55\u7528\u6237\u53EF\u5728\u6B64\u9875\u9762\u4E0A\u4F20\u538B\u7F29\u5305\u5E76\u590D\u5236\u8FD4\u56DE\u503C\uFF0C\u4F46\u8FD8\u662F\u5EFA\u8BAE\u521B\u4F5C\u8005\u76F4\u63A5\u4F7F\u7528\u90AE\u4EF6\u9644\u4EF6"</p>',
    KfeItemHtml = '\n <div class="sticker-item">\n <div class="sticker-item-img"><img style="width: 50px; height: 50px;"/></div>\n <div class="sticker-item-name"></div>\n </div>\n ',
    KfePaginationItemHtml = '\n <div class="Kfe-pagination-item-button"></div>\n ',
    KfeNowPageHtml = '\n <div class="Kfe-pagination-nowpage-button"></div>\n ',
    prevNextPageHtml = '\n <div class="Kfe-pagination-prev-next"></div>\n ';
$(document).on("click", "#Kfe-shop-dialog .sticker-item", function (e) {
    var selctedid = $(e.target).parents(".sticker-item").data("id"),
        selctedtext = JSON.parse($(e.target).parents(".sticker-item").data("content"));
    localStorage.onlineraws ? OnlineRawslists = JSON.parse(localStorage.onlineraws) : OnlineRawslists = [];
    OnlineRawslists == [] ? olhaved = false : olhaved = OnlineRawslists.some(function (o) {
        return o.id === selctedid;
    });
    if (olhaved == false) {
        if (confirm("是否选择启用ID为" + $(e.target).parents(".sticker-item").data("id") + "的在线表情贴纸" + $(e.target).parents(".sticker-item").text())) {
            customize.olimglists.push(selctedid);
            OnlineRawslists.push(selctedtext);
            localStorage.setItem('onlineraws', JSON.stringify(OnlineRawslists));
            localStorage.setItem('StickerConf', JSON.stringify(customize));
            sessionStorage.removeItem('OnlineSmile');
        } else {
            alert("启用操作取消");
        }
    } else if (olhaved == true) {
        if (confirm("是否选择停用ID为" + $(e.target).parents(".sticker-item").data("id") + "的在线表情贴纸" + $(e.target).parents(".sticker-item").text())) {
            var indexToRemove = OnlineRawslists.findIndex(function (orl) {
                return orl.id === selctedid;
            });OnlineRawslists.splice(indexToRemove, 1);
            customize.olimglists.splice(customize.olimglists.indexOf(selctedid), 1);
            localStorage.setItem('onlineraws', JSON.stringify(OnlineRawslists));
            localStorage.setItem('StickerConf', JSON.stringify(customize));
            sessionStorage.removeItem('OnlineSmile');
        } else {
            alert("停用操作取消");
        }
    }
}).on("click", "#Kfe-shop-dialog .Kfe-pagination-item-button", function (e) {
    $(document).find('.kfe-shop_box').hide();
    var $dialog = $("#Kfe-shop-dialog")[0];
    $("body").append(KfeDialogHtml);
    KfeLoadSticker($(e.target).data("id"));
}).on("click", "#Kfe-shop-dialog .Kfe-pagination-prev-next", function (e) {
    $(document).find('.kfe-shop_box').hide();
    var $dialog = $("#Kfe-shop-dialog")[0];
    $("body").append(KfeDialogHtml);
    KfeLoadSticker($(e.target).data("id"));
}).on('click', '.kfe-close-shop', function (e) {
    $(document).find('.kfe-shop_box').hide();
});
// 表情菜单
var createContainer = function createContainer(textArea) {
    var $container = $('<div class="kfe-container">\n     <div class="kfe-menu" id="smilepndw" style="text-align:left;">\n     <input type= "file"  class="kfe-user-p" id="kfe-user-p" accept="image/*" style="display:none;" >\n     <input type="button" class="kfe-user-t" value="\u4E0A\u4F20\u56FE\u7247" style="display:none" >\n     <input type="button" class="kfe-user-y" value="\u4E91\u540C\u6B65">\n     <input type="button" class="kfe-user-i" value="\u81EA\u5B9A\u4E49">\n     <input type="button" class="kfe-user-g" value="\u8868\u60C5\u7EC4\u8BBE\u7F6E">&nbsp;\n     <span class="kfe-close-panel" title="KF\u8868\u60C5\u589E\u5F3A\u63D2\u4EF6by eddie32,\u55B5\u62C9\u5E03\u4E01,mistakey(Hazukikaguya)\uFF0C' + updatelog + '" style="cursor: pointer;"><b>\u2468</b></span>\n     ' + getSubMenuHtml() + '<span class="kfe-close-panel">[-]</span>&nbsp;<input type="checkbox" class="realeditclick" id="realedit" value="realedit" ' + realeditcheck + '>\u53EF\u89C6\u5316\u7F16\u8F91\n\n     <div class="kfe-diy-panel" style="display:none">\n     <input type="button" class="kfe-user-c" value="\u6DFB\u52A0\u8D34\u7EB8">&nbsp;\n     <input type="button" class="kfe-user-r" value="\u5BFC\u51FA\u8D34\u7EB8">&nbsp;\n     <input type="button" class="kfe-user-u" value="\u4FEE\u6539\u8D34\u7EB8">&nbsp;\n     <input type="button" class="kfe-user-d" value="\u5220\u9664\u8D34\u7EB8">&nbsp;\n     <input type="button" class="kfe-user-cfg" value="\u4E2A\u6027\u8BBE\u7F6E">\n     <div class="kfe-conf-panel" style="display:none">\n     <table><tr><td>\n     <li><input type="text" class="conftext" id="kanbanimg" value="">&nbsp;<input type="button" class="kfe-res-kanbanimg" value="\u9ED8\u8BA4">\uFF08\u770B\u677F\u5A18\u56FE\u7247URL\uFF09<input type="button" class="kfe-res-kanbanloc" value="\u91CD\u7F6E\u770B\u677F\u5A18\u4F4D\u7F6E"></li>\n     <li><input type="number" class="conftext" id="kanbansize" value="">&nbsp;<input type="button" class="kfe-res-kanbansize" value="\u9ED8\u8BA4">\uFF08\u770B\u677F\u5A18/\u8D34\u56FE\u9884\u89C8\u5927\u5C0F\uFF09</li>\n     <li><input type="text" class="conftext" id="onlineraw" value="">&nbsp;<input type="button" class="kfe-res-onlineraw" value="\u9ED8\u8BA4">\uFF08\u5728\u7EBF\u8D34\u7EB8\u4ED3\u5E93API\uFF09&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" class="kfe-res-all" value="\u5168\u90E8\u521D\u59CB\u5316"></li>\n     <li><input type="text" class="conftext" id="imgapi" value="">&nbsp;<input type="button" class="kfe-res-imgapi" value="\u9ED8\u8BA4">\uFF08\u56FE\u7247\u4E0A\u4F20\u56FE\u5E8AAPI\uFF09</li>\n     <li><input type="text" class="conftext" id="olimglists" disabled="true" value="">&nbsp;<input type="button" class="kfe-res-olimglists" value="\u9ED8\u8BA4">\uFF08\u5DF2\u9009\u5728\u7EBF\u8D34\u7EB8ID\u6570\u7EC4\uFF09&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" class="kfe-conf-close" value="\u5173\u95ED\u5217\u8868"></li>\n     <li><input type="checkbox" class="confbt" id="writeable" value="writeable"><span style="cursor: help;color:red" title="\u8BF7\u786E\u5B9A\u4F60\u77E5\u9053\u4F60\u5728\u505A\u4EC0\u4E48\uFF01\u5728\u6B64\u4FEE\u6539\uFF08\u7279\u522B\u662F\u589E\u52A0\uFF01\uFF09\u5DF2\u9009\u5728\u7EBF\u8D34\u7EB8\u7EC4ID\u6570\u7EC4\u53EF\u80FD\u4F1A\u53D1\u751F\u4E0D\u53EF\u9884\u77E5\u7684\u9519\u8BEF\uFF01">\u7F16\u8F91ID\u6570\u7EC4\u3010!\u3011</span>\n     <input type="checkbox" class="confbt" id="markdown" value="markdown">\u4F7F\u7528Markdown\u53D6\u4EE3BBcode&nbsp;\n     <input type="checkbox" class="confbt" id="notauthed" value="auth">\u663E\u793A\u672A\u7ECF\u9A8C\u8BC1\u7684\u6570\u636E\u6E90</li>\n     </td></tr></table></div></div>\n     <div class="kfe-acc-panel" style="display:none">\n     <input type="button" class="kfe-user-reg" value="\u6CE8\u518C">&nbsp;\n     <input type="button" class="kfe-user-log" value="\u767B\u5F55">&nbsp;\n     <input type="button" class="kfe-user-img" value="\u7ED1\u5B9A\u56FE\u5E8A">&nbsp;\n     <input type="button" class="kfe-user-ltc" value="\u4E0A\u4F20\u4E91\u7AEF">&nbsp;\n     <input type="button" class="kfe-user-ctl" value="\u6062\u590D\u672C\u5730">&nbsp;\n     <input type="button" class="kfe-user-out" value="\u9000\u51FA\u767B\u5F55"></div>\n     <div class="kfe-bqz-panel" style="display:none">\n     <input type="button" class="kfe-user-loc" value="\u542F\u7528\u7684\u672C\u5730\u8868\u60C5">&nbsp;\n     <input type="button" class="kfe-user-oln" value="\u6D4F\u89C8\u8868\u60C5\u7EC4\u5546\u5E97">&nbsp;\n     <input type="button" class="kfe-user-raw" value="\u5411\u8D34\u7EB8\u5546\u5E97\u6295\u7A3F">&nbsp;\n     <div class="kfe-loc-panel" style="display:none"><table><tr>\n     <td><li><input type="checkbox" class="locbt" id="ng0" value="0">AC\u5A18</li></td>\n     <td><li><input type="checkbox" class="locbt" id="ng1" value="1">S1\u9EBB\u5C06\u8138</li></td>\n     <td><li><input type="checkbox" class="locbt" id="ng3" value="3">\u770B\u677F\u5A18\u5C0FB</li></td>\n     <td><li><input type="checkbox" class="locbt" id="ng4" value="4">\u5FAE\u535A\u8D34\u5427</li></td>\n     <td><li><input type="checkbox" class="locbt" id="ng2" value="2">\u963F\u5361\u6797</li></td></tr><tr>\n     <td><li><input type="checkbox" class="locbt" id="ng9" value="9">\u90A6\u90A6</li></td>\n     <td><li><input type="checkbox" class="locbt" id="ng6" value="6">LoveLive</li></td>\n     <td><li><input type="checkbox" class="locbt" id="ng8" value="8">\u516C\u4E3B\u94FE\u63A5R</li></td>\n     <td><li><input type="checkbox" class="locbt" id="ng7" value="7">\u5C11\u5973\u6B4C\u5267</li></td>\n     <td><li><input type="checkbox" class="locbt" id="ng5" value="5">\u5C0F\u7EA2\u8C46</li></td>\n     <td><input type="button" class="kfe-loc-close"value="\u5173\u95ED\u5217\u8868" ></td></tr>\n     </table></div></div></div>\n\n     <div class="KfeHtmlEditerP" id="Htmlediterpannel" style="display:none;text-align:left;width=100%" >\n     <div class="KfeHtmlediterF" id="Htmlediter">\n         <button class="Heditm" data-edit="undo" title="\u64A4\u9500(Ctrl+Z)">\u21A9\uFE0F</button>\n         <button class="Heditm" data-edit="redo" title="\u91CD\u505A(Ctrl+Y)">\u21AA\uFE0F</button>\n         <button class="Heditms" id="HEDurl" title="\u63D2\u5165\u94FE\u63A5">\uD83D\uDD17</button>\n         <button class="Heditms" id="HEDimg" title="\u63D2\u5165\u56FE\u7247">\uD83D\uDDBC\uFE0F</button>\n         <button class="Heditms" id="HEDaudio" title="\u63D2\u5165HTML5\u97F3\u9891">\uD83C\uDFB5</button>\n         <button class="Heditms" id="HEDvideo" title="\u63D2\u5165HTML5\u89C6\u9891">\uD83C\uDF9E\uFE0F</button>\n         <button class="Heditm" data-edit="quote" title="\u63D2\u5165\u5F15\u7528\u5185\u5BB9">\uD83D\uDCAC</button>\n         <button class="Heditm" data-edit="code" title="\u63D2\u5165\u4EE3\u7801\u5185\u5BB9" >\uD83D\uDCC4</button>\n         <button class="Heditm" data-edit="hide" title="\u63D2\u5165\u9690\u85CF\u5185\u5BB9">\uD83D\uDCA1</button>\n         <button class="Heditm" data-edit="sell" title="\u63D2\u5165\u51FA\u552E\u5185\u5BB9">\uD83E\uDE99</button>\n         <button class="Heditm" data-edit="bold" title="\u7C97\u4F53"><b>B</b></button>\n         <button class="Heditm" data-edit="italic" title="\u659C\u4F53"><i><b>I</b></i></button>\n         <button class="Heditm" data-edit="underline" title="\u4E0B\u5212\u7EBF"><u><b>U</b></u></button>\n         <button class="Heditm" data-edit="strikeThrough" title="\u5220\u9664\u7EBF"><s><b>A</b></s></button>\n         <button class="Heditm" data-edit="hr" title="\u63D2\u5165\u6C34\u5E73\u7EBF" ><b>\u4E00</b></button>\n         <input  class="Heditms" type=\'color\' onblur="document.execCommand(\'forecolor\',false,this.value)" title="\u5B57\u4F53\u989C\u8272">\n         <input  class="Heditms" type=\'color\' onblur="document.execCommand(\'backcolor\',false,this.value)" title="\u80CC\u666F\u989C\u8272">\n         <button class="Heditm" data-edit="justifyLeft" title="\u5DE6\u5BF9\u9F50"><b>\u2906</b></button>\n         <button class="Heditm" data-edit="justifyCenter" title="\u5C45\u4E2D"><b>\u27FA</b></button>\n         <button class="Heditm" data-edit="justifyRight" title="\u53F3\u5BF9\u9F50"><b>\u2907</b></button>\n         <button class="Heditm" data-edit="Subscript" title="\u4E0B\u6807">X<b>,</b></button>\n         <button class="Heditm" data-edit="Superscript" title="\u4E0A\u6807">X<b>\'</b></button>\n         <span title="\u5B57\u4F53\u5927\u5C0F\u8BBE\u7F6E">\n         <button class="Heditm" data-edit="fontSize:1">s</button>\n         <button class="Heditm" data-edit="fontSize:3">M</button>\n         <button class="Heditm" data-edit="fontSize:5">L</button>\n         <button class="Heditm" data-edit="fontSize:7"><b>L</b></button>\n       </span>\n         <button class="Heditm" data-edit="removeFormat" title="\u6E05\u9664\u9009\u4E2D\u6587\u672C\u7684\u683C\u5F0F"><b>\u2A2F</b></button>\n\n\n     </div>\n     <div class="KfeHtmlEditer" id="Htmleditarea" contenteditable="true" spellcheck="false" style="height: 300px;overflow:auto;background:white;border:1px dashed #000;outline:none;margin: 0px; height: 300px;margin: 0px; " ></div>\n\n     </div>\n\n     </div>').insertBefore($(textArea));
    if (isKfMobile == true) {
        $('<button class="btn btn-secondary upload-image-btn ml-1" title="\u4E0A\u4F20\u56FE\u7247" onclick="$(\'.kfe-user-p\').click();">\n             <i class="fa fa-picture-o" aria-hidden="true"></i>\u4E0A\u4F20\u56FE\u7247</button>').insertAfter($("#smileDropdownBtn"));
    } else {
        $('<a>&nbsp;</a><input type="button" class="kfe-user-pt" value="\u4E0A\u4F20\u56FE\u7247" onclick="$(\'.kfe-user-p\').click();">').insertAfter($('[name="Submit"][value!="全站搜索"]'));
    }
    if (realedit == true && isMQ == false) {
        var $realP = $container.find('#Htmlediterpannel'),
            $realPHE = $container.find('#Htmleditarea');
        $realPHE[0].innerHTML = bb2html(textArea.value);
        $realP.show();$('textarea').hide();$('#editor-button').hide();
    } else if (realedit == false) {
        var _$realP = $container.find('#Htmlediterpannel').hide(),
            _$realPHE = $container.find('#Htmleditarea');
        _$realPHE[0].innerHTML = bb2html(textArea.innerHTML);
        _$realP.show();_$realP.hide();
    }
    $container.on('click', '.kfe-sub-menu', function (e) {
        e.preventDefault();
        $container.find('.kfe-acc-panel').hide();
        $container.find('.kfe-bqz-panel').hide();
        var $this = $(this),
            key = $this.data('key');
        if (!key) return;
        $container.find('.kfe-sub-menu').removeClass('kfe-sub-menu-active');
        $this.addClass('kfe-sub-menu-active');
        $container.find('.kfe-smile-panel').hide();
        var $panel = $container.find('.kfe-smile-panel[data-key="' + key + '"]');
        if ($panel.length > 0) {
            $panel.show();
        } else {
            $('#smilepndw').append($(getSmilePanelHtml(key))).show();
            var $panels = $container.find('.kfe-smile-panel[data-key="' + key + '"]');
            $panels.show();
        }
    }).on('click', '.kfe-smile, .kfe-smile-text', function (e) {
        e.preventDefault();
        var $this = $(this),
            code = $this.data('code');
        if (realedit == true) {
            if (!code) {
                document.execCommand('insertImage', false, $this.attr('src'));
            } else {
                document.execCommand('insertText', false, code);
            }
        } else if (realedit == false) {
            if (customize.markdown == false) {
                if (!code) code = '[img]' + $this.attr('src') + '[/img]';addCode(textArea, code);
            } else if (customize.markdown == true) {
                if (!code) code = '![](' + $this.attr('src') + ')';addCode(textArea, code);
            }
        }
        if (/(Mobile|MIDP)/i.test(navigator.userAgent)) textArea.blur();else textArea.focus();
    }).on('mouseenter', '.kfe-smile', function () {
        $('.kfe-zoom-in').remove();
        showZoomInImage($(this));
    }).on('mouseleave', '.kfe-smile', function () {
        $('.kfe-zoom-in').remove();
    }).on('change', '.kfe-user-p', function (e) {
        e.preventDefault();var file = this.files[0];
        if (file != null) {
            var formData = new FormData();
            formData.append('file', file);
            upimgfunc(formData, textArea);
        }
    }).on('click', '.kfe-user-t', function (e) {
        e.preventDefault();
        $('#kfe-user-p').click();
    }).on('click', '.kfe-user-g', function (e) {
        e.preventDefault();
        $container.find('.kfe-smile-panel').hide();
        $container.find('.kfe-diy-panel').hide();
        $container.find('.kfe-acc-panel').hide();
        var $this = $(this);
        $container.find('.kfe-user-g').removeClass('kfe-user-g-active');
        $this.addClass('kfe-user-g-active');
        $container.find('.kfe-diy-panel').hide();
        var $panel = $container.find('.kfe-bqz-panel');
        $panel.show();
    }).on('click', '.kfe-user-i', function (e) {
        e.preventDefault();
        $container.find('.kfe-acc-panel').hide();
        $container.find('.kfe-bqz-panel').hide();
        var $this = $(this);
        $container.find('.kfe-user-i').removeClass('kfe-user-i-active');
        $this.addClass('kfe-user-i-active');
        $container.find('.kfe-diy-panel').hide();
        var $panel = $container.find('.kfe-diy-panel');
        $panel.show();
    }).on('click', '.kfe-user-y', function (e) {
        e.preventDefault();
        $container.find('.kfe-smile-panel').hide();
        $container.find('.kfe-diy-panel').hide();
        $container.find('.kfe-bqz-panel').hide();
        var $this = $(this);
        $container.find('.kfe-user-y').removeClass('kfe-user-y-active');
        $this.addClass('kfe-user-y-active');
        $container.find('.kfe-acc-panel').hide();
        var $panel = $container.find('.kfe-acc-panel');
        $panel.show();
    }).on('click', '.kfe-user-c', function (e) {
        e.preventDefault();usercfunc();
    }).on('click', '.kfe-user-r', function (e) {
        e.preventDefault();userrfunc();
    }).on('click', '.kfe-user-u', function (e) {
        e.preventDefault();userufunc();
    }).on('click', '.kfe-user-d', function (e) {
        e.preventDefault();userdfunc();
    }).on('click', '.kfe-user-ctl', function (e) {
        e.preventDefault();
        if (localStorage.logindata != null) {
            ctlfunc();
        } else {
            alert('未找到有效Token，请先登录！');
        };
    }).on('click', '.kfe-user-ltc', function (e) {
        e.preventDefault();
        if (localStorage.logindata != null) {
            ltcfunc();
        } else {
            alert('未找到有效Token，请先登录！');
        };
    }).on('click', '.kfe-user-log', function (e) {
        e.preventDefault();
        if (localStorage.logindata == null) {
            loginfunc();
        } else {
            alert('请勿重复登录！如需更换账号或Token过期请先登出再登录！');
        };
    }).on('click', '.kfe-user-img', function (e) {
        e.preventDefault();
        if (localStorage.logindata != null) {
            imgbindcheckfunc();
        } else {
            alert('请登录云同步账号后再进行绑定！');
        }
    }).on('click', '.kfe-user-reg', function (e) {
        e.preventDefault();
        if (localStorage.logindata == null) {
            regfunc();
        } else {
            alert("检测到您已登录！如需更换账号请先登出！");
        }
    }).on('click', '.kfe-user-out', function (e) {
        e.preventDefault();
        localStorage.removeItem('logindata');alert('已登出账号！');
    }).on('click', '.kfe-user-loc', function (e) {
        e.preventDefault();
        if (customize.lcimglists == false) {
            for (var _i9 = 0; _i9 < 10; _i9++) {
                $(['.locbt']["#ng" + _i9]).attr("checked", true);
            }
        } else if (customize.lcimglists != false) {
            var checklcg = customize.lcimglists;for (var _i10 = 0; _i10 < checklcg.length; _i10++) {
                $("#ng" + checklcg[_i10]).attr("checked", true);
            }
        } else {
            alert("发生错误");
        };
        $container.find('.kfe-diy-panel').hide();
        var $this = $(this);
        $container.find('.kfe-user-loc').removeClass('kfe-user-loc-active');
        $this.addClass('kfe-user-loc-active');
        $container.find('.kfe-loc-panel').hide();
        var $panel = $container.find('.kfe-loc-panel');
        $panel.show();
    }).on('click', '.kfe-user-oln', function (e) {
        e.preventDefault();
        KfeShowDialog();
    }).on('click', '.kfe-user-raw', function (e) {
        e.preventDefault();KfeShowUpload();
    }).on('click', '.kfe-user-cfg', function (e) {
        e.preventDefault();
        // 载入个性化设置状态
        $("#kanbanimg").attr("value", customize.kanbanimg);
        $("#kanbansize").attr("value", customize.kanbansize);
        $("#onlineraw").attr("value", customize.onlineraw);
        $("#imgapi").attr("value", customize.imgapi);
        $("#olimglists").attr("value", customize.olimglists);
        $("#notauthed").attr("checked", customize.notauthed);
        $("#markdown").attr("checked", customize.markdown);
        var $panel = $container.find('.kfe-conf-panel');
        $panel.show();
    }).on('click', '.locbt', function (e) {
        var thenum = e.target.value,
            locimgs = customize.lcimglists;
        if (e.target.checked == false) {
            locimgs = locimgs.filter(function (item) {
                return item != thenum;
            });
        } else {
            locimgs.push(thenum);
        }
        customize.lcimglists = locimgs;
        localStorage.setItem('StickerConf', JSON.stringify(customize));
        sessionStorage.removeItem('localSmile');
    }).on('click', '.kfe-res-kanbanimg', function () {
        customize.kanbanimg = defaultSConf.kanbanimg;
        localStorage.setItem('StickerConf', JSON.stringify(customize));
        alert(resText);
    }).on('click', '.kfe-res-kanbansize', function () {
        customize.kanbansize = defaultSConf.kanbansize;
        localStorage.setItem('StickerConf', JSON.stringify(customize));
        alert(resText);
    }).on('click', '.kfe-res-onlineraw', function () {
        customize.onlineraw = defaultSConf.onlineraw;
        localStorage.setItem('StickerConf', JSON.stringify(customize));
        alert(resText);
    }).on('click', '.kfe-res-imgapi', function () {
        customize.imgapi = defaultSConf.imgapi;
        localStorage.setItem('StickerConf', JSON.stringify(customize));
        alert(resText);
    }).on('click', '.kfe-res-olimglists', function () {
        customize.olimglists = defaultSConf.olimglists;
        localStorage.setItem('StickerConf', JSON.stringify(customize));
        alert(resText);
    }).on('click', '.kfe-res-kanbanloc', function () {
        localStorage.setItem('imgpvpc', JSON.stringify(["5px", "100px"]));
        alert(resText);
    }).on('click', '.kfe-res-all', function () {
        var todefault = defaultSConf;
        todefault.lcimglists = customize.lcimglists;
        localStorage.setItem('StickerConf', JSON.stringify(todefault));
        localStorage.setItem('imgpvpc', JSON.stringify(["5px", "100px"]));
        sessionStorage.removeItem('localSmile');sessionStorage.removeItem('OnlineSmile');
        alert("已重置，请刷新！");
    }).on('click', '.Heditm', function (e) {
        e.preventDefault();
        var cmd_val = this.getAttribute("data-edit").split(":");
        var CQSHcon = false;
        if (window.getSelection) {
            CQSHcon = window.getSelection().toString();
        }
        if (cmd_val[0] == 'hr') {
            document.execCommand("insertHTML", false, "<hr>");
        } else if (cmd_val[0] == 'code' || cmd_val[0] == 'quote') {
            if (CQSHcon == false) {
                document.execCommand("insertHTML", false, '<br><fieldset><legend>' + cmd_val[0] + ':</legend>\u6B64\u5904\u8F93\u5165' + cmd_val[0] + '\u5185\u5BB9</fieldset><br>');
            } else {
                document.execCommand("insertHTML", false, '<br><fieldset><legend>' + cmd_val[0] + ':</legend>' + CQSHcon + '</fieldset><br>');
            }
        } else if (cmd_val[0] == 'sell') {
            if (CQSHcon == false) {
                document.execCommand("insertHTML", false, '<br><fieldset><legend>' + cmd_val[0] + '=10</legend>\u6B64\u5904\u8F93\u5165' + cmd_val[0] + '\u5185\u5BB9</fieldset><br>');
            } else {
                document.execCommand("insertHTML", false, '<br><fieldset><legend>' + cmd_val[0] + '=10</legend>' + CQSHcon + '</fieldset><br>');
            }
        } else if (cmd_val[0] == 'hide') {
            if (CQSHcon == false) {
                document.execCommand("insertHTML", false, '<br><fieldset><legend>' + cmd_val[0] + '=300</legend>\u6B64\u5904\u8F93\u5165' + cmd_val[0] + '\u5185\u5BB9</fieldset><br>');
            } else {
                document.execCommand("insertHTML", false, '<br><fieldset><legend>' + cmd_val[0] + '=300</legend>' + CQSHcon + '</fieldset><br>');
            }
        } else {
            document.execCommand(cmd_val[0], false, cmd_val[1]);
        }
    }).on('click', '#HEDurl', function (e) {
        e.preventDefault();var URLcon = false;
        if (window.getSelection) {
            URLcon = window.getSelection().toString();
        }
        if (URLcon == false) {
            var HEDurl = prompt("请输入要插入的url", 'https://');
            if (HEDurl) {
                var HEDurlT = prompt("请输入插入的url的描述文字，否则默认使用url作为描述文字", '');
                if (HEDurlT) {
                    if (HEDurlT.length > 2) {
                        document.execCommand("insertHTML", false, '<a href="' + HEDurl + '">' + HEDurlT + '</a>');
                    } else {
                        document.execCommand('CreateLink', HEDurl, HEDurl);
                    }
                } else {
                    document.execCommand('CreateLink', HEDurl, HEDurl);
                }
            }
        } else {
            var HEDurlTU = prompt("请输入要插入的url，否则默认使用选中文本作为url链接", '');
            if (HEDurlTU) {
                if (HEDurlTU.length > 2) {
                    console.log(HEDurlTU);
                    document.execCommand('CreateLink', URLcon, HEDurlTU);
                } else {
                    document.execCommand('CreateLink', URLcon, URLcon);
                }
            } else {
                document.execCommand('CreateLink', URLcon, URLcon);
            }
        }
    }).on('click', '#HEDimg', function (e) {
        e.preventDefault();
        var HEDimg = prompt("请输入要插入的图片url", 'https://');
        document.execCommand("insertHTML", false, '<img src="' + HEDimg + '" border="0">');
    }).on('click', '#HEDaudio', function (e) {
        e.preventDefault();
        var HEDaudio = prompt('请输入HTML5音频实际地址：\n（可直接输入网易云音乐的单曲地址，喵拉将自动转换为外链地址）', 'https://');
        if (HEDaudio) {
            var matches = /^https?:\/\/music\.163\.com\/(?:#\/)?song\?id=(\d+)/i.exec(HEDaudio);
            if (matches) HEDaudio = 'https://music.miaola.work/163/' + matches[1] + '.mp3';
            matches = /^https?:\/\/www\.xiami\.com\/song\/(\w+)/i.exec(HEDaudio);
            if (matches) HEDaudio = 'https://music.miaola.work/xiami/' + matches[1] + '.mp3';
            document.execCommand("insertHTML", false, '<audio src="' + HEDaudio + '" controls="" preload="none" style="margin: 3px 0;">[\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301audio\u6807\u7B7E]</audio><br>');
        }
    }).on('click', '#HEDvideo', function (e) {
        e.preventDefault();
        var HEDvideo = prompt('请输入HTML5视频实际地址：\n（可直接输入YouTube视频页面的地址，喵拉将自动转换为外链地址）', 'https://');
        if (HEDvideo) {
            var matches = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w\-]+)/i.exec(HEDvideo);
            if (matches) HEDvideo = 'https://video.miaola.work/youtube/' + matches[1];
            matches = /^https?:\/\/youtu\.be\/([\w\-]+)$/i.exec(HEDvideo);
            if (matches) HEDvideo = 'https://video.miaola.work/youtube/' + matches[1];
            document.execCommand("insertHTML", false, '<video src="' + HEDvideo + '" controls="" preload="none" style="margin: 3px 0;">[\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301video\u6807\u7B7E]</video><br>');
        }
    }).on('click', '#notauthed', function (e) {
        customize.notauthed = e.target.checked;
        localStorage.setItem('StickerConf', JSON.stringify(customize));
    }).on('click', '#markdown', function (e) {
        customize.markdown = e.target.checked;
        localStorage.setItem('StickerConf', JSON.stringify(customize));
    }).on('click', '#writeable', function (e) {
        e.target.checked ? $("#olimglists").attr("disabled", false) : $("#olimglists").attr("disabled", true);
    }).on('click', '#realedit', function (e) {
        var $panel = $('#Htmlediterpannel');
        var $tempRHArea = $container.find('#Htmleditarea');
        if (e.target.checked) {
            var TeContent = bb2html(textArea.value);
            $tempRHArea[0].innerHTML = TeContent;
            $panel.show();$('textarea').hide();$('#editor-button').hide();customize.realedit = true, realedit = true;
            localStorage.setItem('StickerConf', JSON.stringify(customize));
        } else {
            if (realedits == false) {
                realedits = true;
                $('textarea').show();$('#editor-button').show();
                customize.realedit = false;
                localStorage.setItem('StickerConf', JSON.stringify(customize));
            } else {
                $('textarea').show();$('#editor-button').show();
                var HeContent = html2bb($tempRHArea[0].innerHTML);
                textArea.innerHTML = HeContent;
                textArea.innerText = HeContent;
                textArea.value = HeContent;
                $panel.hide();customize.realedit = false, realedit = false;
                localStorage.setItem('StickerConf', JSON.stringify(customize));
            }
        }
    }).on('blur', '#Htmleditarea', function (e) {
        var HeContent = html2bb(e.target.innerHTML);
        textArea.innerHTML = HeContent;
        textArea.innerText = HeContent;
        textArea.value = HeContent;
    }).on('keydown', '#Htmleditarea', function (e) {
        if (e.keyCode === 13) {
            document.execCommand('insertHTML', false, '<br>&zwnj;');
            //e.preventDefault();
        }
    }).on('paste', '#Htmleditarea', function (e) {
        var isimg = event.clipboardData.files;
        if (isimg.length > 0) {
            event.preventDefault();
            var pd = event.clipboardData.items[0];
            if (!/^image\/[jpeg|png|gif|jpg]/.test(pd.type)) {
                return;
            }
            var file = event.clipboardData.items[0].getAsFile();
            // 让文件名使用时间戳
            var name = JSON.stringify(new Date().getTime());
            var files = new File([file], name + "." + file.name.substr(file.name.lastIndexOf('.') + 1), {
                type: file.type, lastModified: file.lastModified
            });
            var formData = new FormData(),
                reader = new FileReader();formData.append('file', files);
            reader.readAsDataURL(files);upimgfunc(formData, textArea);
        } else ;
    }).on('blur', '#kanbanimg', function (e) {
        customize.kanbanimg = e.target.value;
        localStorage.setItem('StickerConf', JSON.stringify(customize));
    }).on('blur', '#kanbansize', function (e) {
        customize.kanbansize = e.target.value;
        localStorage.setItem('StickerConf', JSON.stringify(customize));
    }).on('blur', '#onlineraw', function (e) {
        customize.onlineraw = e.target.value;
        localStorage.setItem('StickerConf', JSON.stringify(customize));
    }).on('blur', '#imgapi', function (e) {
        customize.imgapi = e.target.value;
        localStorage.setItem('StickerConf', JSON.stringify(customize));
    }).on('blur', '#olimglists', function (e) {
        var TempList = void 0,
            TempLists = void 0;
        e.target.value == "" ? TempLists = [] : TempList = qc(e.target.value.match(/\d+/g).map(function (o) {
            return +o;
        }));
        $.ajax({ url: customize.onlineraw + 'GetListR&page=1&perpage=1', type: 'POST', contentType: false, processData: false }).done(function (data) {
            if (data.ret == 200) {
                var ttotal = data.data,
                    total = ttotal.total;
                for (var _i11 = 0; _i11 < TempList.length; _i11++) {
                    if (TempList[_i11] <= total) {
                        get1stfunc(TempList[_i11]);
                    }
                }
            } else {
                alert('发生' + data.ret + '错误，' + data.msg);
            }
        }).fail(function (data) {
            alert("未知错误，请打开控制台查看！");console.log(data);
        });
    }).on('click', '.kfe-loc-close', function () {
        $container.find('.kfe-loc-panel').hide();
    }).on('click', '.kfe-conf-close', function () {
        $container.find('.kfe-conf-panel').hide();
    }).find('.kfe-close-panel').click(function () {
        $container.find('.kfe-smile-panel').hide();
        $container.find('.kfe-diy-panel').hide();
        $container.find('.kfe-acc-panel').hide();
        $container.find('.kfe-bqz-panel').hide();
    });
    // 文本区域直接上传图片并预览
    document.querySelector('textarea').addEventListener('paste', function (event) {
        var isfiles = event.clipboardData.files;
        if (isfiles.length > 0) {
            event.preventDefault();
            var pd = event.clipboardData.items[0];
            if (!/^image\/[jpeg|png|gif|jpg]/.test(pd.type)) {
                return;
            }
            var file = event.clipboardData.items[0].getAsFile();
            // 让文件名使用时间戳
            var name = JSON.stringify(new Date().getTime());
            var files = new File([file], name + "." + file.name.substr(file.name.lastIndexOf('.') + 1), {
                type: file.type, lastModified: file.lastModified
            });
            var formData = new FormData(),
                reader = new FileReader();formData.append('file', files);
            reader.onload = function (_ref2) {
                var target = _ref2.target;

                setTimeout(function () {
                    $(".kfekanban").attr('src', target.result);
                }, 400);
                setTimeout(function () {
                    if (isKfMobile == true) {
                        $(".kfekanban").attr('src', 'https://sticker.inari.site/favicon.ico');
                    } else {
                        $(".kfekanban").attr('src', customize.kanbanimg);
                    }
                }, 4000);
            };
            reader.readAsDataURL(files);upimgfunc(formData, textArea);
        } else ;
    });
};

/**
 * 方法功能区
 * @param textArea 文本框
 */
// 实验性功能，在KF论坛修复旧的失效的表情贴纸的显示。
var x = document.getElementsByTagName("img");
for (var _i12 = 0; _i12 < x.length; _i12++) {
    x[_i12].src = x[_i12].src.replace(/mistake.tech\/emote/g, "sticker.inari.site");
    x[_i12].src = x[_i12].src.replace(/http:\/\/o6smnd6uw.bkt.clouddn.com\/xds3\/akari/g, "https://sticker.inari.site/akarin/akarin");
    x[_i12].src = x[_i12].src.replace(/http:\/\/o6smnd6uw.bkt.clouddn.com\/xds\/2233/g, "https://sticker.inari.site/bili/2233");
    x[_i12].src = x[_i12].src.replace(/http:\/\/o6smnd6uw.bkt.clouddn.com\/lovelive\/Lovelive2nd/g, "https://sticker.inari.site/lovelive/Lovelive2nd");
    x[_i12].src = x[_i12].src.replace(/http:\/\/smilell2.eclosionstudio.com\/Small\/Lovelive2nd/g, "https://sticker.inari.site/lovelive/Lovelive2nd");
}
// 修复实时编辑模式下phpwind的回复某楼
$(document).on('click', "a[title='回复此楼']", function (e) {
    var rpstr = e.target.getAttribute("onclick");
    rpstr = rpstr.replace(/postreply\('*([^\'\"]*)','[^\'\"]*'\);/g, '$1');
    $('.KfeHtmlEditer')[0].innerHTML += '<fieldset><legend>quote:</legend>' + rpstr + '</fieldset><br>';
}).on('click', "a[title='多重回复']", function () {
    if (realedit == true) {
        realedits = false;
    }
    $('textarea').show();$('.KfeHtmlEditerP').hide();
}).on("change", "#attachment_1", function (e) {
    var FileData = e.target.files[0];
    if (!/image\/\w+/.test(FileData.type)) {
        uupath[0] = uploadfile;
    } else {
        var upreader = new FileReader();
        upreader.readAsDataURL(FileData);
        upreader.onload = function (e) {
            uupath[0] = this.result;
        };
    }
}).on("change", "#attachment_2", function (e) {
    var FileData = e.target.files[0];
    if (!/image\/\w+/.test(FileData.type)) {
        uupath[1] = uploadfile;
    } else {
        var upreader = new FileReader();
        upreader.readAsDataURL(FileData);
        upreader.onload = function (e) {
            uupath[1] = this.result;
        };
    }
}).on("change", "#attachment_3", function (e) {
    var FileData = e.target.files[0];
    if (!/image\/\w+/.test(FileData.type)) {
        uupath[2] = uploadfile;
    } else {
        var upreader = new FileReader();
        upreader.readAsDataURL(FileData);
        upreader.onload = function (e) {
            uupath[2] = this.result;
        };
    }
}).on("change", "#attachment_4", function (e) {
    var FileData = e.target.files[0];
    if (!/image\/\w+/.test(FileData.type)) {
        uupath[3] = uploadfile;
    } else {
        var upreader = new FileReader();
        upreader.readAsDataURL(FileData);
        upreader.onload = function (e) {
            uupath[3] = this.result;
        };
    }
}).on("change", "#attachment_5", function (e) {
    var FileData = e.target.files[0];
    if (!/image\/\w+/.test(FileData.type)) {
        uupath[4] = uploadfile;
    } else {
        var upreader = new FileReader();
        upreader.readAsDataURL(FileData);
        upreader.onload = function (e) {
            uupath[4] = this.result;
        };
    }
}).on("change", "#attachment_6", function (e) {
    var FileData = e.target.files[0];
    if (!/image\/\w+/.test(FileData.type)) {
        uupath[5] = uploadfile;
    } else {
        var upreader = new FileReader();
        upreader.readAsDataURL(FileData);
        upreader.onload = function (e) {
            uupath[5] = this.result;
        };
    }
}).on("change", "#attachment_7", function (e) {
    var FileData = e.target.files[0];
    if (!/image\/\w+/.test(FileData.type)) {
        uupath[6] = uploadfile;
    } else {
        var upreader = new FileReader();
        upreader.readAsDataURL(FileData);
        upreader.onload = function (e) {
            uupath[6] = this.result;
        };
    }
}).on("change", "#attachment_8", function (e) {
    var FileData = e.target.files[0];
    if (!/image\/\w+/.test(FileData.type)) {
        uupath[7] = uploadfile;
    } else {
        var upreader = new FileReader();
        upreader.readAsDataURL(FileData);
        upreader.onload = function (e) {
            uupath[7] = this.result;
        };
    }
}).on("change", "#attachment_9", function (e) {
    var FileData = e.target.files[0];
    if (!/image\/\w+/.test(FileData.type)) {
        uupath[8] = uploadfile;
    } else {
        var upreader = new FileReader();
        upreader.readAsDataURL(FileData);
        upreader.onload = function (e) {
            uupath[8] = this.result;
        };
    }
}).on("change", "#attachment_10", function (e) {
    var FileData = e.target.files[0];
    if (!/image\/\w+/.test(FileData.type)) {
        uupath[9] = uploadfile;
    } else {
        var upreader = new FileReader();
        upreader.readAsDataURL(FileData);
        upreader.onload = function (e) {
            uupath[9] = this.result;
        };
    }
}).on("click", "#att_span1 .abtn", function (e) {
    $('.KfeHtmlEditer')[0].innerHTML += '<img src="' + uupath[0] + '" type="upload_1" width="240">';
}).on("click", "#att_span2 .abtn", function (e) {
    $('.KfeHtmlEditer')[0].innerHTML += '<img src="' + uupath[1] + '" type="upload_2" width="240">';
}).on("click", "#att_span3 .abtn", function (e) {
    $('.KfeHtmlEditer')[0].innerHTML += '<img src="' + uupath[2] + '" type="upload_3" width="240">';
}).on("click", "#att_span4 .abtn", function (e) {
    $('.KfeHtmlEditer')[0].innerHTML += '<img src="' + uupath[3] + '" type="upload_4" width="240">';
}).on("click", "#att_span5 .abtn", function (e) {
    $('.KfeHtmlEditer')[0].innerHTML += '<img src="' + uupath[4] + '" type="upload_5" width="240">';
}).on("click", "#att_span6 .abtn", function (e) {
    $('.KfeHtmlEditer')[0].innerHTML += '<img src="' + uupath[5] + '" type="upload_6" width="240">';
}).on("click", "#att_span7 .abtn", function (e) {
    $('.KfeHtmlEditer')[0].innerHTML += '<img src="' + uupath[6] + '" type="upload_7" width="240">';
}).on("click", "#att_span8 .abtn", function (e) {
    $('.KfeHtmlEditer')[0].innerHTML += '<img src="' + uupath[7] + '" type="upload_8" width="240">';
}).on("click", "#att_span9 .abtn", function (e) {
    $('.KfeHtmlEditer')[0].innerHTML += '<img src="' + uupath[8] + '" type="upload_9" width="240">';
}).on("click", "#att_span10 .abtn", function (e) {
    $('.KfeHtmlEditer')[0].innerHTML += '<img src="' + uupath[9] + '" type="upload_10" width="240">';
});

// html2bb&bb2html
function html2bb(str) {
    str = str.replace(/<img[^>]*smile=\"(\d+)\"[^>]*>/ig, '[s:$1]');
    str = str.replace(/<img[^>]*type=\"(attachment|upload)\_(\d+)\"[^>]*>/ig, '[$1=$2]');
    code_htm = new Array();code_num = 0;
    str = str.replace(/(\r\n|\n|\r)/ig, '');
    str = str.replace(/<p[^>\/]*\/>/ig, '\n');
    str = str.replace(/\son[\w]{3,16}\s?=\s*([\'\"]).+?\1/ig, '');
    str = str.replace(/<fieldset><legend>(Quote|code):<\/legend>(.+?)<\/fieldset>/ig, '[$1]$2[/$1]');
    str = str.replace(/<fieldset><legend>(sell|hide)=(.+?)<\/legend>(.+?)<\/fieldset>/ig, '[$1=$2]$3[/$1]');
    str = str.replace(/<(audio|video)[^>]*src=[\'\"\s]*([^\'\"]*)[^>]*>(.+?)<\/(audio|video)>/ig, '[$1]$2[/$1]');
    str = str.replace(/<(audio|video) src=[\'\"\s]*([^\'\"]*) controls="" preload="none" style="margin: 3px 0;">\[你的浏览器不支持(audio|video)标签\]<\/(audio|video)>/ig, '[$1]$2[/$1]');
    str = str.replace(/<hr[^>]*>/ig, '[hr]');
    str = str.replace(/<(sub|sup|u|strike|b|i|pre)>/ig, '[$1]');
    str = str.replace(/<\/(sub|sup|u|strike|b|i|pre)>/ig, '[/$1]');
    str = str.replace(/<(\/)?strong>/ig, '[$1b]');
    str = str.replace(/<(\/)?em>/ig, '[$1i]');
    str = str.replace(/<(\/)?blockquote([^>]*)>/ig, '[$1blockquote]');
    str = str.replace(/<img[^>]*src=[\'\"\s]*([^\'\"]+)[^>]*>/ig, '[img]$1[/img]');
    str = str.replace(/<a[^>]*href=[\'\"\s]*([^\'\"]*)[^>]*>(.+?)<\/a>/ig, '[url=$1]$2[/url]');
    str = str.replace(/<h([1-6]+)([^>]*)>(.*?)<\/h\1>/ig, function ($1, $2, $3, $4) {
        return h($3, $4, $2);
    });
    str = searchtag('table', str, 'table', 1);
    str = searchtag('font', str, 'Font', 1);
    str = searchtag('div', str, 'dsc', 1);
    str = searchtag('p', str, 'p', 1);
    str = searchtag('span', str, 'dsc', 1);
    str = searchtag('ol', str, 'list', 1);
    str = searchtag('ul', str, 'list', 1);
    for (var _i13 in code_htm) {
        str = str.replace("[\twind_phpcode_" + _i13 + "\t]", code_htm[_i13]);
    }
    str = str.replace(/&nbsp;/ig, ' ');
    str = str.replace(/<br[^>]*>/ig, '\n');
    str = str.replace(/<[^>]*?>/ig, '');
    str = str.replace(/&amp;/ig, '&');
    str = str.replace(/&quot;/ig, '"');
    str = str.replace(/&lt;/ig, '<');
    str = str.replace(/&gt;/ig, '>');
    return str;
}
function bb2html(str) {
    code_htm = new Array();code_num = 0;
    str = str.replace(/&(?!(#[0-9]+|[a-z]+);)/ig, '&amp;');
    str = str.replace(/</ig, '&lt;');
    str = str.replace(/>/ig, '&gt;');
    str = str.replace(/\n/ig, '<br />');
    str = str.replace(/\[(quote|code)\](.+?)\[\/(quote|code)\]/ig, '<fieldset><legend>$1:</legend>$2</fieldset>');
    str = str.replace(/\[(sell|hide)=(.+?)\](.+?)\[\/(sell|hide)\]/ig, '<fieldset><legend>$1=$2</legend>$3</fieldset>');
    str = str.replace(/\[(audio|video)\](.+?)\[\/(audio|video)\]/ig, '<$1 src="$2" controls="" preload="none" style="margin: 3px 0;">[你的浏览器不支持$1标签]</$1>');
    str = str.replace(/\[hr\]/ig, '<hr />');
    str = str.replace(/\[\/(size|color|font|backcolor)\]/ig, '</font>');
    str = str.replace(/\[(sub|sup|u|i|strike|b|blockquote|li)\]/ig, '<$1>');
    str = str.replace(/\[(quote|code)\]/ig, '<fieldset><legend>$1:</legend>');
    str = str.replace(/\[\/(quote|code)\]/ig, '</fieldset>');
    str = str.replace(/\[\/(sub|sup|u|i|strike|b|blockquote|li)\]/ig, '</$1>');
    str = str.replace(/\[size=(\d+?)\]/ig, '<font size="$1">');
    str = str.replace(/\[color=([^\[\<]+?)\]/ig, '<font color="$1">');
    str = str.replace(/\[backcolor=([^\[\<]+?)\]/ig, '<font style="background-color:$1">');
    str = str.replace(/\[font=([^\[\<]+?)\]/ig, '<font face="$1">');
    str = str.replace(/\[list=(a|A|1)\](.+?)\[\/list\]/ig, '<ol type="$1">$2</ol>');
    str = str.replace(/\[(\/)?list\]/ig, '<$1ul>');
    str = str.replace(/\[(attachment|upload)=(\d+)\]/ig, function ($1, $2, $3) {
        return attpath($3, $2);
    });
    str = str.replace(/\[s:(\d+)\]/ig, function ($1, $2) {
        return smilepath($2);
    });
    str = str.replace(/\[img\]([^\[]*)\[\/img\]/ig, '<img src="$1" border="0" />');
    str = str.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/ig, '<a href="$1">$2</a>');
    str = searchtag('table', str, 'tableshow', 2);
    str = str.replace(/\[\/align\]/ig, '</p>');
    str = str.replace(/\[(\/)?h([1-6])\]/ig, '<$1h$2>');
    str = str.replace(/\[align=(left|center|right|justify)\]/ig, '<p align="$1">');
    for (var _i14 in code_htm) {
        str = str.replace("[\twind_phpcode_" + _i14 + "\t]", code_htm[_i14]);
    }
    return str;
}
// 杂项
function attpath(attid, type) {
    var path = '',
        upath = false;
    if (type == 'attachment' && IsElement('atturl_' + attid)) {
        path = getObj('atturl_' + attid).innerHTML;
    } else if (type == 'upload' && IsElement('attachment_' + attid)) {
        var FileData = $('#attachment_' + attid)[0].files[0];
        if (!/image\/\w+/.test(FileData.type)) {
            path = '';upath = false;
        } else {
            path = uupath[attid - 1];upath = true;
        }
    }
    if (!path) {
        return '[' + type + '=' + attid + ']';
    } else {
        if (!path.match(/\.(jpg|gif|png|bmp|jpeg)$/ig) && upath == false) {
            path = imgpath + '/' + stylepath + '/file/zip.gif';
        }
        var img = imgmaxwh(path, 320);
        if (img.width == 0) {
            return '<img src="' + path + '" type="' + type + '_' + attid + '" width="240" />';
        } else {
            return '<img src="' + path + '" type="' + type + '_' + attid + '" width="' + img.width + '" />';
        }
    }
}
function smilepath(NewCode) {
    var NewCodes = NewCode - 9;
    if (NewCode < 19) {
        return '<img src="/' + kfImgPath + '/post/smile/em/em0' + NewCodes + '.gif" smile="' + NewCode + '" />';
    } else {
        return '<img src="/' + kfImgPath + '/post/smile/em/em' + NewCodes + '.gif" smile="' + NewCode + '" />';
    }
}
function h(style, code, size) {
    size = 7 - size;code = '[size=' + size + '][b]' + code + '[/b][/size]';return p(style, code);
}
function p(style, code) {
    if (style.indexOf('align=') != -1) {
        style = findvalue(style, 'align=');
        style = style.replace(/[[^>]*(left|center|right|justify)[^>]*]/ig, '$1');
        code = '[align=' + style + ']' + code + '[/align]';
    } else {
        code += "\n";
    }
    return code;
}
function dsc(style, code) {
    var styles = [['align', 1, 'align='], ['align', 1, 'text-align:'], ['backcolor', 2, 'background-color:'], ['color', 2, 'color:'], ['font', 1, 'font-family:'], ['b', 0, 'font-weight:', 'bold'], ['i', 0, 'font-style:', 'italic'], ['u', 0, 'text-decoration:', 'underline'], ['strike', 0, 'text-decoration:', 'line-through']];
    style = style.toLowerCase();
    for (var _i15 = 0; _i15 < styles.length; _i15++) {
        var begin = style.indexOf(styles[_i15][2]);
        if (begin == -1) {
            continue;
        }
        var value = findvalue(style, styles[_i15][2]);
        if (styles[_i15][1] == 2 && value.indexOf('rgb') != -1) {
            value = WYSIWYD._colorToRgb(value);
        }
        if (styles[_i15][1] == 0) {
            if (value == styles[_i15][3]) {
                code = '[' + styles[_i15][0] + ']' + code + '[/' + styles[_i15][0] + ']';
            }
        } else {
            code = '[' + styles[_i15][0] + '=' + value + ']' + code + '[/' + styles[_i15][0] + ']';
        }
        style = style.replace(styles[_i15][2], '');
    }
    return code;
}
function searchtag(tagname, str, action, type) {
    var tag = void 0,
        begin = void 0;if (type == 2) {
        tag = ['[', ']'];
    } else {
        tag = ['<', '>'];
    }
    var head = tag[0] + tagname,
        head_len = head.length,
        foot = tag[0] + '/' + tagname + tag[1],
        foot_len = foot.length,
        strpos = 0;
    do {
        var strlower = str.toLowerCase(),
            _i16 = void 0;begin = strlower.indexOf(head, strpos);
        if (begin == -1) {
            break;
        }
        var strlen = str.length;
        for (_i16 = begin + head_len; _i16 < strlen; _i16++) {
            if (str.charAt(_i16) == tag[1]) break;
        }
        if (_i16 >= strlen) break;
        var firsttag = _i16,
            style = str.substr(begin + head_len, firsttag - begin - head_len),
            end = strlower.indexOf(foot, firsttag);
        if (end == -1) break;
        var nexttag = strlower.indexOf(head, firsttag);
        while (nexttag != -1 && end != -1) {
            if (nexttag > end) break;
            end = strlower.indexOf(foot, end + foot_len);
            nexttag = strlower.indexOf(head, nexttag + head_len);
        }
        if (end == -1) {
            strpos = firsttag;continue;
        }
        firsttag++;
        var findstr = str.substr(firsttag, end - firsttag);
        str = str.substr(0, begin) + eval(action)(style, findstr, tagname) + str.substr(end + foot_len);
        strpos = begin;
    } while (begin != -1);return str;
}
function tableshow(style, str) {
    var width = void 0;
    if (style.substr(0, 1) == '=') {
        width = style.substr(1);
    } else {
        width = '100%';
    }
    str = str.replace(/\[td=(\d{1,2}),(\d{1,2})(,(\d{1,3}%?))?\]/ig, '<td colspan="$1" rowspan="$2" width="$4">');
    str = str.replace(/\[(tr|td)\]/ig, '<$1>');
    str = str.replace(/\[\/(tr|td)\]/ig, '</$1>');
    return '<table width=' + width + ' class="t" cellspacing=0>' + str + '</table>';
}
function findvalue(style, find) {
    var firstpos = style.indexOf(find) + find.length,
        len = style.length,
        start = 0,
        i = void 0;
    for (i = firstpos; i < len; i++) {
        var t_char = style.charAt(i);
        if (start == 0) {
            if (t_char == '"' || t_char == "'") {
                start = i + 1;
            } else if (t_char != ' ') {
                start = i;
            }
            continue;
        }
        if (t_char == '"' || t_char == "'" || t_char == ';') {
            break;
        }
    }
    return style.substr(start, i - start);
}
function table(style, str) {
    str = str.replace(/<tr([^>]*)>/ig, '[tr]');
    str = str.replace(/<\/tr>/ig, '[/tr]');
    str = searchtag('td', str, 'td', 1);
    str = searchtag('th', str, 'td', 1);
    var styles = ['width=', 'width:'],
        s = '';;
    style = style.toLowerCase();
    for (var _i17 in styles) {
        if (style.indexOf(styles[_i17]) == -1) {
            continue;
        }
        s = '=' + findvalue(style, styles[_i17]);break;
    }
    return '[table' + s + ']' + str + '[/table]';
}
function td(style, str) {
    if (style == '') {
        return '[td]' + str + '[/td]';
    }
    var colspan = 1,
        rowspan = 1,
        width = '',
        value = void 0;
    if (style.indexOf('colspan=') != -1) {
        value = findvalue(style, 'colspan=');if (value > 1) colspan = value;
    }
    if (style.indexOf('rowspan=') != -1) {
        value = findvalue(style, 'rowspan=');if (value > 1) rowspan = value;
    }
    if (style.indexOf('width=') != -1) {
        width = findvalue(style, 'width=');
    }
    if (width == '') {
        return (colspan == 1 && rowspan == 1 ? '[td]' : '[td=' + colspan + ',' + rowspan + ']') + str + '[/td]';
    } else {
        return '[td=' + colspan + ',' + rowspan + ',' + width + ']' + str + '[/td]';
    }
}
function list(type, code, tagname) {
    code = code.replace(/<(\/)?li>/ig, '[$1li]');
    if (tagname == 'ul') {
        return '[list]' + code + '[/list]';
    }
    if (type && type.indexOf('type=') != '-1') {
        type = findvalue(type, 'type=');
        if (type != 'a' && type != 'A' && type != '1') {
            type = '1';
        }
        return '[list=' + type + ']' + code + '[/list]';
    } else {
        return '[list=1]' + code + '[/list]';
    }
}
function Font(style, str) {
    var styles = new Array();
    styles = { 'size': 'size=', 'color': 'color=', 'font': 'face=', 'backcolor': 'background-color:' };
    style = style.toLowerCase();
    for (var st in styles) {
        var begin = style.indexOf(styles[st]);
        if (begin == -1) {
            continue;
        }
        var value = findvalue(style, styles[st]);
        if (in_array(st, ['backcolor', 'color']) && value.indexOf('rgb') != -1) {
            value = WYSIWYD._colorToRgb(value);
        }
        str = '[' + st + '=' + value + ']' + str + '[/' + st + ']';
    }
    return str;
}
// CURD方法
function usercfunc() {
    var userimgc = prompt("请输入要添加的贴纸的URL，添加多个请用半角,隔开贴纸URL（添加后刷新页面生效）", "https://sticker.inari.site/inari.png");
    if (!userimgc) return;var userimgcmt = userimgc.split(',');var addList = [];
    for (var mt = 0; mt < userimgcmt.length; mt++) {
        //含http/https协议前缀的完整图片url，请确保未开启防盗链
        if (/(http:\/\/|https:\/\/).*.(png|jpg|jpeg|gif|webp|bmp|tif)+.*$/i.test(userimgcmt[mt])) {
            addList.push(userimgcmt[mt]);
        }
        //任意无协议前缀的图片url，默认增加https协议前缀
        else if (/[a-zA-Z0-9\-\.]+\.+[a-zA-Z]+\/.*.(png|jpg|jpeg|gif|webp|bmp|tif)+.*$/i.test(userimgcmt[mt])) {
                addList.push('https://' + userimgcmt[mt]);
            }
            //由sticker.inari.site托管的用户贴纸组
            else if (/[A-Za-z0-9\_\/]+\/+[0-9\/]+.(png|jpg|jpeg|gif|webp)$/i.test(userimgcmt[mt])) {
                    addList.push('https://sticker.inari.site/usr/' + userimgcmt[mt]);
                }
    }if (addList.length < userimgcmt.length) {
        alert('含有非法输入，请检查是否有图片url错误');
    }
    if (addList.length > 0) {
        var userSmileList = [];
        if (localStorage.userimgst) {
            try {
                userSmileList = JSON.parse(localStorage.userimgst);
            } catch (ex) {
                console.log(ex);userSmileList = [];
            }
        }
        userSmileList = [].concat(_toConsumableArray(userSmileList), addList);
        localStorage.setItem('userimgst', JSON.stringify(userSmileList));
        alert('贴纸已添加');location.reload();
    }
}
function userufunc() {
    var userimgu = prompt("请输入要替换的贴纸的序号", "1");
    if (/[0-9]$/i.test(userimgu)) {
        var _userimgst = localStorage.userimgst,
            _UserSmileList = JSON.parse(_userimgst);
        if (userimgu > _UserSmileList.length) {
            alert('序号超出贴纸数，请检查');
        } else if (userimgu == 0) {
            alert('非法输入，请检查！');
        } else if (userimgu <= _UserSmileList.length) {
            var usreplace = prompt("请输入用于替换的图片url", "https://sticker.inari.site/inari.png"),
                j = userimgu;
            if (/(http:\/\/|https:\/\/).*.(png|jpg|jpeg|gif|webp|bmp|tif)+.*$/i.test(usreplace)) {
                if (confirm('确定替换序号为' + userimgu + '的贴纸吗？这是最后一次确认！')) {
                    _UserSmileList[j - 1] = usreplace;localStorage.setItem('userimgst', JSON.stringify(_UserSmileList));
                    alert('已替换指定序号的贴纸');location.reload();
                }
            } else if (usreplace == null) {} else if (usreplace == 0) {
                alert('非法输入，请检查！');
            } else {
                alert('非法输入，请检查！');
            }
        } else if (userimgu == null) {} else {
            alert('非法输入，请检查！');
        }
    }
}
function userrfunc() {
    if (UserSmileList != "https://sticker.inari.site/null.jpg") {
        prompt("自定义表情贴纸已导出，请复制", UserSmileList);
    } else {
        alert("自定义表情贴纸为空！");
    }
}
function userdfunc() {
    if (confirm('确定删除自定义表情贴纸吗？')) {
        if (confirm('【确定】清空自定义贴纸，【取消】删除指定贴纸。')) {
            if (confirm('确定【清空自定义贴纸】吗？这是【最后一次】确认')) {
                localStorage.removeItem('userimgst');alert('已清空自定义贴纸');location.reload();
            }
        } else {
            var userimgd = prompt("请输入要删除的贴纸的序号", "1");
            if (/[0-9]$/i.test(userimgd)) {
                var _userimgst2 = localStorage.userimgst,
                    _UserSmileList2 = JSON.parse(_userimgst2);
                if (userimgd > _UserSmileList2.length) {
                    alert('序号超出贴纸数，请检查');
                } else if (userimgd == 0) {
                    alert('非法输入，请检查！');
                } else if (userimgd <= _UserSmileList2.length) {
                    if (confirm('确定删除【序号为' + userimgd + '的贴纸】吗？这是【最后一次】确认！')) {
                        for (var _i18 = userimgd; _i18 <= _UserSmileList2.length; _i18++) {
                            _UserSmileList2[_i18 - 1] = _UserSmileList2[_i18];
                        }
                        _UserSmileList2.pop();localStorage.setItem('userimgst', JSON.stringify(_UserSmileList2));
                        alert('已删除指定序号的贴纸！');location.reload();
                    }
                } else {
                    alert('非法输入，请检查！');
                }
            } else if (userimgd == null) {} else {
                alert('非法输入，请检查！');
            }
        }
    }
}
// 表情商店方法
var KfeShowDialog = function KfeShowDialog() {
    var $dialog = $("#Kfe-shop-dialog")[0];$("body").append(KfeDialogHtml);KfeLoadSticker(1);
};
var KfeLoadSticker = function KfeLoadSticker(thePage) {
    var success = function success(data) {
        loadStickerList(data.data.items);loadStickerListPagination(data.data);
    };
    var onlineRaw = customize.onlineraw,
        authornot = void 0;
    customize.notauthed == false ? authornot = "GetList" : authornot = "GetListR";
    var PageRequest = new XMLHttpRequest();
    PageRequest.open('POST', onlineRaw + authornot + '&page=' + thePage + '&perpage=20', true);
    PageRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    PageRequest.send('name=teswe&ee=ef');
    PageRequest.onreadystatechange = function () {
        if (PageRequest.readyState == 4 && PageRequest.status == 200) {
            var pagejson = PageRequest.responseText;
            var pageload = JSON.parse(pagejson);
            if (pageload.ret == 200) {
                success(pageload);
            } else {
                alert('发生异常！' + pageload.msg);
            }
        } else if (PageRequest.readyState == 4 && PageRequest.status != 200) {
            alert('发生错误！错误状态码：' + PageRequest.status);
        }
    };
};
var KfeShowUpload = function KfeShowUpload() {
    var $dialog = $("#Kfe-shop-dialog")[0];$("body").append(KfeUploadHtml);var $root = $("#Kfe-shop-dialog .Kfe-list-content");
    if (localStorage.logindata != null) {
        var tokenList = JSON.parse(localStorage.logindata),
            syncid = tokenList[0],
            synctoken = tokenList[1];
        var upRequest = new XMLHttpRequest();
        upRequest.open('POST', 'https://api.inari.site/?s=App.User_User.CheckSession&user_id=' + syncid + '&token=' + synctoken, true);
        upRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        upRequest.send('name=teswe&ee=ef');upRequest.onreadystatechange = function () {
            if (upRequest.readyState == 4 && upRequest.status == 200) {
                var upjson = upRequest.responseText,
                    upload = JSON.parse(upjson);
                if (upload.ret == 200) {
                    var logornot = upload.data.is_login;
                    if (logornot == true) {
                        $root.append($(KfelogedUp));
                    } else {
                        $root.append($(KfeunlogUp));
                    }
                } else {
                    $root.append($(KfePunlogUp));
                }
            } else if (upRequest.readyState == 4 && upRequest.status != 200) {
                $root.append($(KfeunlogUp));
            }
        };
    } else {
        $root.append($(KfeunlogUp));
    };$root.append($(KfetextUp));
};
var loadStickerList = function loadStickerList(items) {
    var $root = $("#Kfe-shop-dialog .Kfe-list-content");$root.empty();
    $.each(items, function (_, o) {
        var content = JSON.parse(o.content);
        var $node = $(KfeItemHtml).prop("title", content.desc).data("id", o.id).data("content", o.content).find("img").prop("src", content.cover).end().find(".sticker-item-name").text(o.title).end();
        $root.append($node);
    });
};
var loadStickerListPagination = function loadStickerListPagination(data) {
    var total = Math.ceil(data.total / 20),
        page = data.page,
        $root = $("#Kfe-shop-dialog .Kfe-list-pagination");
    if (page != 1) {
        $root.append($(KfePaginationItemHtml).data("id", 1).text("回首页"));
        $root.append($(prevNextPageHtml).data("id", page - 1).text("上一页"));
    }
    if (total < 12 || page < 7) {
        for (var _i19 = 1; _i19 < page; ++_i19) {
            var id = _i19,
                $node = $(KfePaginationItemHtml).data("id", id).text(id);$root.append($node);
        }
        var $node1 = $(KfeNowPageHtml).data("id", page).text(page);
        $root.append($node1);
        for (var _i20 = page; _i20 < total; ++_i20) {
            var _id = _i20 + 1,
                _$node = $(KfePaginationItemHtml).data("id", _id).text(_id);$root.append(_$node);
        }
    } else if (total > 11 && page + 5 < total) {
        for (var _i21 = page - 5; _i21 < page; ++_i21) {
            var _id2 = _i21,
                _$node3 = $(KfePaginationItemHtml).data("id", _id2).text(_id2);$root.append(_$node3);
        }
        var _$node2 = $(KfeNowPageHtml).data("id", page).text(page);
        $root.append(_$node2);
        for (var _i22 = page; _i22 < page + 5; ++_i22) {
            var _id3 = _i22 + 1,
                _$node4 = $(KfePaginationItemHtml).data("id", _id3).text(_id3);$root.append(_$node4);
        }
    } else if (total > 11 && page + 6 > total) {
        for (var _i23 = total - 10; _i23 < page; ++_i23) {
            var _id4 = _i23,
                _$node6 = $(KfePaginationItemHtml).data("id", _id4).text(_id4);$root.append(_$node6);
        }
        var _$node5 = $(KfeNowPageHtml).data("id", page).text(page);$root.append(_$node5);
        for (var _i24 = page; _i24 < total; ++_i24) {
            var _id5 = _i24 + 1,
                _$node7 = $(KfePaginationItemHtml).data("id", _id5).text(_id5);$root.append(_$node7);
        }
    }
    if (page != total) {
        $root.append($(prevNextPageHtml).data("id", page + 1).text("下一页"));
        $root.append($(KfePaginationItemHtml).data("id", total).text("去末页"));
    }
};
// 注册&登录方法
function loginfunc() {
    var username = prompt("用户名", 'username');
    if (username != null && username.length <= 50) {
        var password = prompt("密码", 'password');
        if (password != null && password.length >= 6 && password.length <= 20) {
            var loginRequest = new XMLHttpRequest();
            loginRequest.open('POST', 'https://api.inari.site/?s=App.User_User.Login&username=' + username + '&password=' + password, true);
            loginRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            loginRequest.send('name=teswe&ee=ef');loginRequest.onreadystatechange = function () {
                if (loginRequest.readyState == 4 && loginRequest.status == 200) {
                    var loginjson = loginRequest.responseText,
                        login = JSON.parse(loginjson);
                    if (login.ret == 200) {
                        var logindata = login.data;if (logindata.is_login == true) {
                            localStorage.setItem('logindata', JSON.stringify([logindata.user_id, logindata.token]));imgbindcheckfunc();
                        } else if (logindata.is_login == false) {
                            alert('Oops！用户名或密码错误！请检查！');
                        }
                    } else {
                        alert('Oops！' + login.ret + '错误！' + login.msg);
                    }
                }
            };
        } else {
            password == null ? alert('取消登录！') : alert('密码' + lengtherrText + '6-20位');
        }
    } else {
        username == null ? alert('取消登录！') : alert('用户名' + lengtherrText + '1-50位');
    }
}
function regfunc() {
    var regname = prompt("用户名，1-50位，只支持英文、数字和有限的特殊符号如@_", 'username');
    if (regname.length >= 1 && regname.length <= 20) {
        var regpswd1 = prompt("输入6-20位密码，只支持英文、数字和有限的特殊符号如@_", 'password');
        var regpswd2 = prompt("确认密码", 'password');if (regpswd1.length >= 6 && regpswd1.length <= 20) {
            if (regpswd1 == regpswd2) {
                var regRequest = new XMLHttpRequest();regRequest.open('POST', 'https://api.inari.site/?s=App.User_User.Register&username=' + regname + '&password=' + regpswd2, true);
                regRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");regRequest.send('name=teswe&ee=ef');regRequest.onreadystatechange = function () {
                    if (regRequest.readyState == 4 && regRequest.status == 200) {
                        var regjson = regRequest.responseText;var reg = JSON.parse(regjson);if (reg.ret == 200) {
                            var loginRequest = new XMLHttpRequest();
                            loginRequest.open('POST', 'https://api.inari.site/?s=App.User_User.Login&username=' + regname + '&password=' + regpswd2, true);
                            loginRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");loginRequest.send('name=teswe&ee=ef');loginRequest.onreadystatechange = function () {
                                if (loginRequest.status === 200 && loginRequest.readyState === 4) {
                                    var loginjson = loginRequest.responseText;var login = JSON.parse(loginjson);var logindata = login.data;
                                    localStorage.setItem('logindata', JSON.stringify([logindata.user_id, logindata.token]));
                                    if (confirm('是否绑定up.inari.site图床账号？【确定】绑定【取消】则不绑定，上传图片将使用游客上传')) {
                                        imgbindfunc();
                                    } else {
                                        alert(notbindText);
                                    }
                                }
                            };
                        } else if (reg.ret != 200) {
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
// 绑定检测&图床绑定方法
function imgbindcheckfunc() {
    var tokenList = JSON.parse(localStorage.logindata),
        syncid = tokenList[0],
        synctoken = tokenList[1],
        getokenRequest = new XMLHttpRequest();
    getokenRequest.open('POST', 'https://api.inari.site/?s=App.User_User.Tutoken&user_id=' + syncid + '&token=' + synctoken, true);
    getokenRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    getokenRequest.send('name=teswe&ee=ef');getokenRequest.onreadystatechange = function () {
        if (getokenRequest.readyState == 4 && getokenRequest.status == 200) {
            var getokentext = getokenRequest.responseText,
                getokenjson = JSON.parse(getokentext);
            if (getokenjson.ret == 200) {
                var tkdata = getokenjson.data,
                    gtoken = tkdata.tutoken;
                if (gtoken != "") {
                    localStorage.setItem('logindata', JSON.stringify([syncid, synctoken, gtoken]));
                    alert('检测到您已绑定图床账号！上传图片将使用绑定的图床账号！');
                } else {
                    if (confirm('检测到没有绑定图床账号，是否绑定？不绑定则上传图片将使用游客上传！')) {
                        imgbindfunc();
                    } else {
                        alert(notbindText);
                    }
                }
            } else {
                alert('检测是否绑定了图床账号失败！返回码：' + getokenjson.ret);
            }
        } else if (getokenRequest.readyState == 4 && getokenRequest.status != 200) {
            alert('异常的请求！状态码：' + getokenRequest.status);
        }
    };
}
function imgbindfunc() {
    var inariuser = prompt("inari图床账号邮箱", 'example@example.mail'),
        inaripass = prompt("inari图床账号密码", 'password'),
        formData = '{ "email":"' + inariuser + '" , "password":"' + inaripass + '" }';
    $.ajax({ url: imgapi + 'tokens', type: 'POST', dataType: 'json', data: formData, contentType: "application/json", processData: false }).done(function (data) {
        if (data.status == true) {
            var tokenTList = JSON.parse(localStorage.logindata),
                synctid = tokenTList[0],
                syncttoken = tokenTList[1];
            var tokendata = data.data,
                token = tokendata.token,
                tokenarray = [synctid, syncttoken, token];
            localStorage.setItem('logindata', JSON.stringify(tokenarray));var tokenRequest = new XMLHttpRequest();
            tokenRequest.open('POST', 'https://api.inari.site/?s=App.User_User.tupdate&user_id=' + synctid + '&token=' + syncttoken + '&tupdate=' + token, true);
            tokenRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            tokenRequest.send('name=teswe&ee=ef');tokenRequest.onreadystatechange = function () {
                if (tokenRequest.readyState == 4 && tokenRequest.status == 200) {
                    var tokentext = tokenRequest.responseText,
                        tokenjson = JSON.parse(tokentext);
                    if (tokenjson.ret == 200) {
                        alert("已绑定图床账号！");
                    } else {
                        alert('图床账号绑定失败！' + tokenjson.msg);
                    }
                } else if (tokenRequest.readyState == 4 && tokenRequest.status != 200) {
                    alert('图床账号绑定失败！异常请求状态码：' + tokenRequest.status);
                }
            };
        } else if (data.status == false) {
            alert(data.message);
        }
    }).fail(function (data) {
        alert('Oops！图床账号绑定失败！可能是服务器错误或网络问题！' + data);
    });
}
// 上载&同步方法
function ltcfunc() {
    var tokenList = JSON.parse(localStorage.logindata),
        syncid = tokenList[0],
        synctoken = tokenList[1];
    if (confirm('确定同步【本地数据到云端】吗？这是最后一次确认！')) {
        var _userimgst3 = localStorage.userimgst;
        if (_userimgst3 != null) {
            var _UserSmileList3 = JSON.parse(_userimgst3),
                upRequest = new XMLHttpRequest();
            upRequest.open('POST', 'https://api.inari.site/?s=App.User_User.picsupdate&user_id=' + syncid + '&token=' + synctoken + '&picsdata=' + _UserSmileList3, true);
            upRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            upRequest.send('name=teswe&ee=ef');upRequest.onreadystatechange = function () {
                if (upRequest.readyState == 4 && upRequest.status == 200) {
                    var upjson = upRequest.responseText,
                        upload = JSON.parse(upjson);
                    if (upload.ret == 200) {
                        alert("已同步本地数据到云端！");
                    } else {
                        alert('Token已失效，请重新登录！');
                    }
                } else if (upRequest.readyState == 4 && upRequest.status != 200) {
                    alert('发生错误！错误状态码：' + upRequest.status);
                }
            };
        } else {
            alert('本地数据为空！同步到云端操作已取消！');
        }
    }
}
function ctlfunc() {
    var tokendata = localStorage.logindata,
        tokenList = JSON.parse(tokendata);
    var syncid = tokenList[0],
        synctoken = tokenList[1];
    var dlRequest = new XMLHttpRequest();
    dlRequest.open('POST', 'https://api.inari.site/?s=App.User_User.picsdata&user_id=' + syncid + '&token=' + synctoken, true);
    dlRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    dlRequest.send('name=teswe&ee=ef');
    dlRequest.onreadystatechange = function () {
        if (dlRequest.readyState == 4 && dlRequest.status == 200) {
            var dljson = dlRequest.responseText,
                download = JSON.parse(dljson);
            if (download.ret == 200) {
                if (confirm('确定同步【云端数据到本地】吗？这是最后一次确认！')) {
                    var dldata = download.data,
                        dlpicsList = dldata.picsdata;if (dlpicsList != "") {
                        localStorage.setItem('userimgst', JSON.stringify(dlpicsList.split(',')));
                        alert("已同步云端数据到本地！");location.reload();
                    } else {
                        alert("云端数据为空！同步到本地操作已取消！");
                    }
                }
            } else {
                alert('Token已失效，请重新登录！');
            }
        } else if (dlRequest.readyState == 4 && dlRequest.status != 200) {
            alert('发生错误！错误状态码：' + dlRequest.status);
        }
    };
}
// 上传图片方法
function upimgfunc(formData, textArea) {
    if (!textArea) textArea = $('textarea')[0];
    var authdata = localStorage.logindata;
    if (authdata == null) {
        $.ajax({ url: imgapi + 'upload', type: 'POST', dataType: 'json', data: formData, contentType: false, processData: false }).done(function (data) {
            if (data.status == true) {
                var inaridata = data.data,
                    inarilinks = inaridata.links;
                setTimeout(function () {
                    alert(guestupimgText);
                }, 1000);
                if (realedit == true) {
                    document.execCommand('insertImage', false, inarilinks.url);
                } else {
                    if (customize.markdown == false) {
                        addCode(textArea, inarilinks.bbcode);
                    } else if (customize.markdown == true) {
                        addCode(textArea, '![](' + inarilinks.url + ')');
                    }
                }
            } else if (data.status == false) {
                alert(data.message);
            } else {
                alert('发生未知错误，' + data);
            }
        }).fail(function (data) {
            alert(imguperrText + data);
        });
    } else {
        var authList = JSON.parse(authdata);if (authList.length == 2) {
            $.ajax({ url: imgapi + 'upload', type: 'POST', dataType: 'json', data: formData, contentType: false, processData: false }).done(function (data) {
                if (data.status == true) {
                    var inaridata = data.data,
                        inarilinks = inaridata.links;
                    if (realedit == true) {
                        document.execCommand('insertImage', false, inarilinks.url);
                    } else {
                        if (customize.markdown == false) {
                            addCode(textArea, inarilinks.bbcode);
                        } else if (customize.markdown == true) {
                            addCode(textArea, '![](' + inarilinks.url + ')');
                        }
                    }
                    if (!localStorage.Alertless) {
                        alert(guestupimgText);localStorage.setItem('Alertless', true);
                    }
                } else if (data.status == false) {
                    alert(data.message);
                } else {
                    alert('发生未知错误，' + data);
                }
            }).fail(function (data) {
                alert(imguperrText + data);
            });
        } else if (authList.length == 3) {
            $.ajax({
                url: imgapi + 'upload', type: 'POST', dataType: 'json', data: formData, contentType: false, processData: false,
                beforeSend: function beforeSend(xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + authList[2]);
                }
            }).done(function (data) {
                if (data.status == true) {
                    var inaridata = data.data,
                        inarilinks = inaridata.links;
                    if (realedit == true) {
                        document.execCommand('insertImage', false, inarilinks.url);
                    } else {
                        if (customize.markdown == false) {
                            addCode(textArea, inarilinks.bbcode);
                        } else if (customize.markdown == true) {
                            addCode(textArea, '![](' + inarilinks.url + ')');
                        }
                    }
                } else if (data.status == false) {
                    alert(data.message);
                } else {
                    alert('发生未知错误，' + data);
                }
            }).fail(function (data) {
                alert(imguperrText + data);
            });
        }
    }
}
// 单个在线贴纸获取方法
function get1stfunc(e) {
    $.ajax({ url: customize.onlineraw + 'Get&id=' + e, type: 'POST', contentType: false, processData: false }).done(function (data) {
        if (data.ret == 200) {
            var sigstk = data.data,
                thestkc = sigstk.content;
            FinalList.push(e);FinalRaw.push(JSON.parse(thestkc));customize.olimglists = FinalList;
            localStorage.setItem('onlineraws', JSON.stringify(FinalRaw));
            localStorage.setItem('StickerConf', JSON.stringify(customize));
            sessionStorage.removeItem('OnlineSmile');
        } else {
            console.log(data.ret + '错误，' + data.msg);
        }
    }).fail(function (data) {
        console.log(data);
    });
}
// 数组去重
function qc(arr) {
    var s1 = new Set(arr);return Array.from(s1);
}
// 看板娘可拖拽,会记录拖拽位置
function drag(obj) {
    obj.onmousedown = function (event) {
        obj.setCapture && obj.setCapture();event = event || window.event;
        var cleft = obj.style.left,
            ctop = obj.style.top,
            ol = event.clientX - obj.offsetLeft,
            ot = event.clientY - obj.offsetTop;
        document.onmousemove = function (event) {
            event = event || window.event;var left = event.clientX - ol,
                top = event.clientY - ot;
            obj.style.left = left + "px";obj.style.top = top + "px";
        };
        document.onmouseup = function () {
            document.onmousemove = null;document.onmouseup = null;
            obj.releaseCapture && obj.releaseCapture();var vleft = obj.style.left,
                vtop = obj.style.top;
            if (cleft == vleft && vtop == ctop) {
                var $textAreas = $("textarea");
                if (!$textAreas.length) return;
                if ($textAreas.length == 1) {
                    $('.kfe-user-p').click();
                } else {
                    alert(kanbanerrText);
                }
            } else {
                localStorage.setItem('imgpvpc', JSON.stringify([vleft, vtop]));
            };
        };
        return false;
    };
};

/**
 * 添加CSS
 */
var appendCss = function appendCss() {
    $('head').append('\n <style>\n   .kfe-container { padding: 5px; vertical-align: middle; font: 12px/1.7em "sans-serif"; }\n   .kfe-menu { margin-bottom: 5px; }\n   .kfe-sub-menu { margin: 0 5px; text-decoration: none; border-bottom: 2px solid transparent; }\n   .kfe-sub-menu:hover, .kfe-sub-menu:focus { text-decoration: none; border-color: deeppink; }\n   a.kfe-sub-menu-active { color: black }\n   .kfe-smile-panel { display: none; height: 136px; padding: 5px 3px; overflow-y: auto; border-top: 1px solid #ddd; }\n   .kfe-smile-panel[data-key="Shortcut"] { height: auto; }\n   .kfe-smile-panel[data-key="Markdown"] { height: auto; }\n   .kfe-smile { display: inline-block; max-width: 60px; max-height: 60px; cursor: pointer; }\n   .kfe-smile-text { display: inline-block; padding: 3px 5px; }\n   .kfe-smile-text:hover { color: #fff !important; background-color: #2b2b2b; text-decoration: none; }\n   .kfe-close-panel { cursor: pointer; }\n   .kfe-zoom-in {\n     position: absolute; max-width: 150px; max-height: 150px; background-color: #fcfcfc; border: 3px solid rgba(242, 242, 242, 0.6);\n     border-radius: 2px; box-shadow: 0 0 3px rgb(102, 102, 102);\n   }\n   .kfe-shop_box sheader {height: 42px;background: rgb(49, 49, 49);display: block;font-size: 100%;margin: 0px;padding: 0px;color: rgb(115, 115, 115);font-family: "Helvetica Neue", Helvetica, arial, sans-serif;line-height: 1.231;}\n   .kfe-shop_box sheader logo{float: left;margin: 25px 2px 0px 30px;font-size: 150%;padding: 0px;display: block;margin-block-start: 0.67em;margin-block-end: 0.67em;margin-inline-start: 0px;margin-inline-end: 0px;color:#fff;}\n   .kfe-shop_box sheader span { float: right; margin: 25px 2px 0px 30px;font-size: 150%;padding: 0px;display: block;margin-block-start: 0.67em;margin-block-end: 0.67em;margin-inline-start: 0px;margin-inline-end: 0px;color:#fff;}\n   .kfe-shop_nav { text-align: right; margin-top: 5px; margin-bottom: -5px; }\n   .kfe-shop_main fieldset { border: 1px solid #ccccff; padding: 0 6px 6px; }\n   .kfe-shop_main legend { font-weight: bold; }\n   .Kfe-list-content {display: block;margin-block-start: 0em;margin-block-end: 1em;margin-inline-start: 0px;margin-inline-end: 0px;padding-inline-start: 40px;list-style-type: disc;line-height: 20px;background-color: #fcfcfc}\n   .sticker-item-img {text-align: center;}\n   .kfe-shop_main input[type="color"] { height: 18px; width: 30px; padding: 0; }\n   .kfe-shop_tips { color: #51d; text-decoration: none; cursor: help; }\n   .kfe-shop_tips:hover { color: #ff0000; }\n   #pdConfigDialog .kfe-shop_main { overflow-x: hidden; white-space: nowrap; }\n   .kfe-shop_panel { display: inline-block; width: 400px; vertical-align: top; }\n   .kfe-shop_panel + .kfe-shop_panel { margin-left: 5px; }\n   .kfe-shop_btns { background-color: #fcfcfc; text-align: right; padding: 5px; }\n   .kfe-shop_btns input, .kfe-shop_btns button { vertical-align: middle; }\n   .kfe-shop_btns button { min-width: 64px; }\n   .Kfe-pagination-item-button {border-style: none;display: inline-block; text-align: center; margin: 5px;}\n   .Kfe-pagination-nowpage-button {    border: 1px solid #e5e5e5;color: #00b84f;min-width: 30px;display: inline-block; text-align: center; margin: 5px;}\n   .Kfe-pagination-prev-next {border-style: none;display: inline-block; text-align: center; margin: 5px;}\n   .sticker-pages {background-color: #fcfcfc;padding: 8px 0 6px 10px;position: relative;color: #707072;font-size: 10px;margin: 0;text-align: center;width: 100%; }\n   .kfe-shop_footer {background-color: #f7f7fc;border-top: 1px solid #e6e6e6;padding: 8px 0 6px 10px;position: relative;color: #707072;font-size: 10px;margin: 0;}\n   .kfe-shop_footer a{color: #707072;font-size: 10px;}\n   .pd_custom_script_header { margin: 7px 0; padding: 5px; background-color: #e8e8e8; border-radius: 5px; }\n   .pd_custom_script_content { display: none; width: 750px; height: 350px; white-space: pre; }\n   .Heditm { border-style: none;display: inline-block; text-align: center;width: 26px;height: 20px;cursor: pointer;}\n   .Heditms { border-style: none;display: inline-block; text-align: center;width: 26px;height: 20px;cursor: pointer;}\n   .KfeHtmlEditer img {max-width:500px}\n   .KfeHtmlEditer video {max-width:500px}\n   </style>');
    if (isKfMobile == false) {
        $('head').append('<style>\n   .kfe-shop_box {\n     position: fixed;display: none; z-index: 1002;\n     -webkit-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); -moz-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);max-width: 1000px;\n     left:0 !important;right:0 !important;margin:auto;}\n   .kfe-shop_main { background-color: #fcfcfc; padding: 0 10px; font-size: 12px; line-height: 24px; height: 450px;max-height: 450px;}\n   .sticker-item {    display: inline-block;margin: 0 60px 26px 0;vertical-align: top;width: 128px;}\n   .sticker-item-name {    color: #737373;font-size: 12px;line-height: 1.2;max-height: 38.2px;text-align: center;word-break: break-word;-webkit-line-clamp: 2;-webkit-box-orient: vertical;display: -webkit-box;overflow: hidden;width: 120px}\n </style>');
    } else if (isKfMobile == true) {
        $('head').append('<style>\n   #readPage .kfe-container, #writeMessagePage .kfe-container { margin-top: -10px; }\n   .kfe-shop_box {\n     position: fixed;display: none; z-index: 1002;\n     -webkit-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); -moz-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);max-width: 400px;\n     left:0 !important;right:0 !important;top:50px !important;margin:auto;}\n   .kfe-shop_main { background-color: #fcfcfc; padding: 0 10px; font-size: 12px; line-height: 24px; height: 520px;max-height: 600px;}\n   .sticker-item { display: inline-block;margin: 0 10px 22px 0;vertical-align: top;width: 72px;}\n   .sticker-item-name {    color: #737373;font-size: 12px;line-height: 1.2;max-height: 38.2px;text-align: center;word-break: break-word;-webkit-line-clamp: 2;-webkit-box-orient: vertical;display: -webkit-box;overflow: hidden;width: 72px}\n </style>');
    }
};

/**
 * 初始化
 */
var init = function init() {
    var $textAreas = $("textarea");
    if (!$textAreas.length) return;
    appendCss();
    $textAreas.each(function () {
        createContainer(this);
    });
};
if (loadcustom == false) {
    localStorage.setItem('imgpvpc', JSON.stringify(["5px", "100px"]));
    alert('首次使用，部署默认设置。您可以在【自定义】->【个性设置】中完成个性化设置！');
    customize.lcimglists = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    localStorage.setItem('StickerConf', JSON.stringify(customize));
    localStorage.removeItem('onlineraws');localStorage.removeItem('Alertless');sessionStorage.removeItem('localSmile');sessionStorage.removeItem('OnlineSmile');
    alert('当前表情贴纸组为默认设置，您可以在【表情组设置->启用的本地表情组/表情组商店】中选择要启用的表情组！');
};
init();