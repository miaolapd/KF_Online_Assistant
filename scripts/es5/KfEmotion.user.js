// ==UserScript==
// @name        绯月表情增强插件
// @namespace   https://greasyfork.org/users/729911
// @version     6.42.42
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
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @license     MIT
// @run-at      document-end
// @modifier-source https://raw.githubusercontent.com/miaolapd/KF_Online_Assistant/master/scripts/es6/KfEmotion.user.js
// ==/UserScript==


/**
 * 各种设置
 */
'use strict';
// 默认配置&本地贴纸源

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var updatelog = '版本V6.42.42, 本次更新日志: \n 实装看板娘触控拖动支持&云同步账号记住账号密码；优化看板娘拖动代码&其他代码。',
    defaultSConf = {
    "version": "2.1.0",
    "kanbansize": "64",
    "kanbanimg": "https://sticker.inari.site/truenight.gif",
    "imgapi": "https://up.inari.site/api/v1/",
    "cloudapi": "https://api.inari.site/?s=App.User_User.",
    "onlineraw": "https://api.inari.site/?s=App.Sticker.",
    "notauthed": false,
    "realedit": false,
    "markdown": false,
    "lcimglists": [],
    "olimglists": []
},
    mqcheck = ["&multiquote"],
    FinalList = [],
    FinalRaw = [],
    KfSmileList = [],
    KfSmileCodeList = [],
    RandomSmileList = [],
    UsersSmileList = [],
    MenuList = {},
    uploadfile = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAAAVCAYAAADGpvm7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMGSURBVFhH7ZkxduIwEIZ/71lsCl5OYJ8Ap6Gi3c6UcIAt9wCmjLttqWgwJ8An4FFg30U7Y0kgWTaBgEkRf+/pkcgjaTRI848TTxAY6J1f6nOgZ3oNdLWK4HkRVpXqeCXVCpHnIbph8d3cIz+5dfv66F5+/InmAMZZiLQUEGKPhU+du3kd+PlO2jyDHx7oCtt1AYQzvHOAGxxOz7uKQ45m3kaw4jz5oNMtsK+P93MYAv0iVKArrCISg2hFP5mofiNZXURBPatFRLbbc5o71vPmaBsu1zPsWhfZYW7asH+letSBnDfAkjIHsliO0/u/K0ffFocvnugCyyDA8Q8LiGxlGpK/tzjHQaENIkWpxnLLkwxxU9Vpw7/x72wjyhQhBcWqJOrqIkaW5IbdDOt4SV524y/2ZFuC3Ab02P3CTiGf0rKXPKnj4FQ79JAoBS0oEKb0k4nqT3L1O/WkIb/giJBk2sadQ9qGwjQlP6gvEZcZNblIaF5zLRd3jc758qTDTxN3fzVqrNl9z17a+r94okPMHJn28T6j41Ec0X1rd9hk9JFMMZEdBhNMKdLINnYKUfWwvJbqqp+5Ml8wJi/7pHvtYMwrH2AWLT2Iob2ARXWip/Q1jQP5ewPpoEblvuBKCvhkvpeg87vRAvs01Dw10OWRF3jDqCvR+SN6yoe+/czL8YpqCy5xz/mzbiqnatR834rln9nUy49CBdrHSEbAvvZ6sw4F3FhdSwuajvRQU+HEx1OPL4/1SU6m5mwlzO+C7gD4EhTrrawWDKrt+qoYPo7ay+HkrN0KRV/iiIcSioZAaTG0hUHb2mLRJiDUKSg2jvA6AqLtjLWlTWOs8tsSNN1Hzd2PKVKPiWGbjwzbNkX4kjrobYgMUCwDlWu4fGtc1TMh0pxKqEDnJRapBHnjurTiL7DnFEBFUWDktfjAJdLH5TawHUXWzIGbaYs//BbXsPP+jlFyKahMeqPeS46kkae5JG2+Vd7992gu9EmfkJY3BHXgTA9Vx0AbQ6BfxBDoFzH8z/AlAP8BmM5ocebFmOwAAAAASUVORK5CYII=',
    nullimg = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
    lengtherrT = "长度不合规，位数应在以下范围内：",
    guestupimgT = "游客上传成功！建议绑定up.inari.site图床账号到云同步账号！",
    imgunbindT = '检测到没有绑定图床账号，是否绑定？不绑定则',
    notbindT = "图片上传将使用游客上传！",
    lenlimiT = "只支持英文、数字和有限的特殊符号如@_",
    notokenT = "未找到有效Token，请先登录！",
    doneT = "操作已完成！",
    errT = "操作失败，请打开控制台查看错误信息",
    resT = "已重置，请刷新！",
    igoT = "非法输入，请检查！",
    renT = "失败！返回码：",
    exiT = '操作已取消！';
var LocalRaws = [{ "id": 1, "desc": "AC娘表情贴纸，属于AcSmileList，AC娘。", "cover": "https://sticker.inari.site/acfun/1/1.png", "name": "_Acfun", "title": 'AC娘', "addr": "_AcSmileList", "numstart": [1, 1001, 2001], "numend": [55, 1041, 2056], "url1": ["https://sticker.inari.site/acfun/1/", "https://sticker.inari.site/acfun/2/", "https://sticker.inari.site/acfun/3/"], "url2": [".png", ".png", ".png"] }, { "id": 2, "desc": "华语第三动漫高手论坛S1的麻将脸表情包喵~", "cover": "https://sticker.inari.site/s1/1.gif", "name": "_S1", "title": 'S1', "addr": "_S1SmileList", "numstart": [1, 1], "numend": [21, 229], "url1": ["https://sticker.inari.site/s1/", "https://sticker.inari.site/s1/"], "url2": [".gif", ".png"] }, { "id": 3, "desc": "《摇曳百合》的阿卡林的表情包~", "cover": "https://sticker.inari.site/akarin/2/akarin (1).gif", "name": "_Akarin", "title": '阿卡林', "addr": "_AkarinSmileList", "numstart": [1, 1], "numend": [21, 72], "url1": ["https://sticker.inari.site/akarin/2/akarin (", "https://sticker.inari.site/akarin/1/akarin ("], "url2": [").gif", ").png"] }, { "id": 4, "desc": "小B是画师林大B练习用的看板娘，最初是在sosg论坛上出现~", "cover": "https://sticker.inari.site/lindaB/lindaB (1).jpg", "name": "_xiaoB", "title": '小B', "addr": "_xiaoBSmileList", "numstart": [1], "numend": [52], "url1": ["https://sticker.inari.site/lindaB/lindaB ("], "url2": [").jpg"] }, { "id": 5, "desc": "微博贴吧表情包", "cover": "https://sticker.inari.site/weibo/1.png", "name": "_Weitb", "title": '微博贴吧', "addr": "_WeitbSmileList", "numstart": [1, 1, 10], "numend": [101, 10, 34], "url1": ["https://sticker.inari.site/weibo/", "https://tb2.bdstatic.com/tb/editor/images/face/i_f0", "https://tb2.bdstatic.com/tb/editor/images/face/i_f"], "url2": [".png", ".png", ".png"] }, { "id": 6, "desc": "暹罗猫小红豆，世界，就是绕着猫打转！", "cover": "https://sticker.inari.site/usr/Kawaii_Siamese/line/0_show.png", "name": "_Siamese", "title": '小红豆', "addr": "_SiameseSmileList", "numstart": [1, 1, 1], "numend": [25, 25, 41], "url1": ["https://sticker.inari.site/usr/Kawaii_Siamese/wx1/", "https://sticker.inari.site/usr/Kawaii_Siamese/wx2/", "https://sticker.inari.site/usr/Kawaii_Siamese/line/"], "url2": [".png", ".png", ".png"] }, { "id": 7, "desc": "Lovelive表情贴纸~", "cover": "https://sticker.inari.site/lovelive/2/ll (1).png", "name": "_LL", "title": 'LL', "addr": "_LLSmileList", "numstart": [1, 1], "numend": [42, 20], "url1": ["https://sticker.inari.site/lovelive/2/ll (", "https://sticker.inari.site/lovelive/4/ll ("], "url2": [").png", ").jpg"] }, { "id": 8, "desc": "少女☆歌剧。去吧，两人一起，摘下那颗星。", "cover": "https://sticker.inari.site/revstar/revstar (1).png", "name": "_Revue", "title": '少歌', "addr": "_RevueSmileList", "numstart": [1], "numend": [41], "url1": ["https://sticker.inari.site/revstar/revstar ("], "url2": [").png"] }, { "id": 9, "desc": "公主连结Re:Dive。いま、新たな冒険の幕が上がる——", "cover": "https://sticker.inari.site/redive/sticker (1).png", "name": "_Redive", "title": 'PCR', "addr": "_RediveSmileList", "numstart": [1], "numend": [49], "url1": ["https://sticker.inari.site/redive/sticker ("], "url2": [").png"] }, { "id": 10, "desc": "BanG Dream！噜~ キラキラ☆ドキドキ~ ふえぇ~", "cover": "https://sticker.inari.site/bangdream/bangdream (1).png", "name": "_Bandori", "title": '邦邦', "addr": "_BandoriSmileList", "numstart": [1], "numend": [41], "url1": ["https://sticker.inari.site/bangdream/bangdream ("], "url2": [").png"] }],
    ww = window.innerWidth || document.body.clientWidth,
    wh = window.innerHeight || document.body.clientHeight,
    customize = defaultSConf,
    loadcustom = true,
    isMQ = false,
    realedits = true,
    realeditcheck = '',
    userimgst = void 0,
    loclist = void 0,
    $dialog = void 0,
    $textAreas = void 0,
    $root = void 0,
    $node = void 0,
    $node1 = void 0,
    $this = void 0,
    $panel = void 0,
    file = void 0,
    formData = void 0,
    FileData = void 0,
    reader = void 0,
    img = void 0,
    begin = void 0,
    OnlineRawslists = void 0,
    olhaved = void 0,
    HeContent = void 0,
    OnlineRaws = [],
    uupath = [],
    localSmile = [],
    i = void 0,
    s = void 0,
    l = void 0,
    t = void 0,
    aId = void 0,
    aToken = void 0,
    user = void 0,
    pass = void 0,
    loginf = void 0,
    temp = void 0;
// 客制化配置
if (localStorage.StickerConf) {
    customize = JSON.parse(localStorage.StickerConf);
} else {
    loadcustom = false;localStorage.setItem('StickerConf', JSON.stringify(defaultSConf));
}
if (customize.version != defaultSConf.version) {
    console.log("个性化配置版本不匹配，自动进行兼容性变更！");
    customize.version = defaultSConf.version;
    customize.cloudapi = defaultSConf.cloudapi;
    if (!customize.kanbanimg) customize.kanbanimg = defaultSConf.kanbanimg;
    if (!customize.kanbansize) customize.kanbansize = defaultSConf.kanbansize;
    if (!customize.imgapi) customize.imgapi = defaultSConf.imgapi;
    //if (!customize.cloudapi) customize.cloudapi = defaultSConf.cloudapi;
    if (!customize.onlineraw) customize.onlineraw = defaultSConf.onlineraw;
    if (!customize.notauthed) customize.notauthed = defaultSConf.notauthed;
    if (!customize.realedit) customize.realedit = defaultSConf.realedit;
    if (!customize.markdown) customize.markdown = defaultSConf.markdown;
    if (!customize.lcimglists) customize.lcimglists = defaultSConf.lcimglists;
    if (!customize.olimglists) customize.olimglists = defaultSConf.olimglists;
    localStorage.setItem('StickerConf', JSON.stringify(customize));
    localStorage.removeItem('onlineraws');localStorage.removeItem('Alertless');sessionStorage.removeItem('localSmile');sessionStorage.removeItem('OnlineSmile');
    console.log(doneT);
};

/**
 * 初始化杂项
 */
customize.lcimglists ? loclist = customize.lcimglists : loclist = [];
localStorage.userimgst ? userimgst = localStorage.userimgst : userimgst = '["https://sticker.inari.site/null.jpg"]';
var UserSmileList = JSON.parse(userimgst),
    iApi = customize.imgapi,
    cApi = customize.cloudapi,
    olApi = customize.onlineraw;
var realedit = customize.realedit;
if (realedit && isMQ == false) {
    realeditcheck = 'checked';
}
if (localStorage.onlineraws) {
    OnlineRaws = JSON.parse(localStorage.onlineraws);
}
// 网站是否为KfMobile
var isKfMobile = typeof Info !== 'undefined' && typeof Info.imgPath !== 'undefined';
var kfImgPath = typeof imgpath !== 'undefined' ? imgpath : '';if (isKfMobile) kfImgPath = Info.imgPath;
// 检测多重引用
for (i = 0; i < mqcheck.length; i++) {
    if (window.location.href.indexOf(mqcheck[i]) > -1) {
        isMQ = true;
    }
}

/**
 * 初始化表情图片
 */
// 灰企鹅
for (i = 1; i < 49; i++) {
    KfSmileList.push('/' + kfImgPath + '/post/smile/em/em' + (i > 9 ? i : '0' + i) + '.gif');KfSmileCodeList.push('[s:' + (i + 9) + ']');
}
for (i = 1; i < 204; i++) {
    KfSmileList.push('https://sticker.inari.site/pesoguin/' + i + '.gif');KfSmileCodeList.push('[img]https://sticker.inari.site/pesoguin/' + i + '.gif[/img]');
}
// 随机
RandomSmileList.push('https://sticker.inari.site/yukika/' + Math.ceil(Math.random() * 6) + '.jpg');
for (var _i = 0; _i < 29; _i++) {
    RandomSmileList.push('https://sticker.inari.site/rwebp/' + Math.ceil(Math.random() * 6930) + '.webp');
}
for (var _i2 = 1; _i2 < 10; _i2++) {
    RandomSmileList.push('https://sticker.inari.site/rgif/' + Math.ceil(Math.random() * 2555) + '.gif');
}
// 自定义
for (i = 0; i < UserSmileList.length; i++) {
    UsersSmileList.push(UserSmileList[i] + '#num=' + (i + 1));
}
// 来自本地数据源的表情贴纸
for (i = 0; i < loclist.length; i++) {
    localSmile[i] = LocalRaws[loclist[i]];
}
if (!sessionStorage.localSmile) {
    for (i = 0; i < localSmile.length; i++) {
        localSmile[i].addr = [];for (s = 0; s < localSmile[i].numstart.length; s++) {
            for (t = localSmile[i].numstart[s]; t < localSmile[i].numend[s]; t++) {
                localSmile[i].addr.push(localSmile[i].url1[s] + t + localSmile[i].url2[s]);
            }
        }
    }
    sessionStorage.setItem('localSmile', JSON.stringify(localSmile));
}
localSmile = JSON.parse(sessionStorage.localSmile);
// 来自在线数据源的表情贴纸
if (!sessionStorage.OnlineSmile) {
    var onlineSmile = OnlineRaws;
    for (i = 0; i < onlineSmile.length; i++) {
        onlineSmile[i].addr = [];for (s = 0; s < onlineSmile[i].numstart.length; s++) {
            for (t = onlineSmile[i].numstart[s]; t < onlineSmile[i].numend[s]; t++) {
                onlineSmile[i].addr.push(onlineSmile[i].url1[s] + t + onlineSmile[i].url2[s]);
            }
        }
    }sessionStorage.setItem('OnlineSmile', JSON.stringify(onlineSmile));
}
var OnlineSmile = JSON.parse(sessionStorage.OnlineSmile);

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
for (i = 0; i < localSmile.length; i++) {
    MenuList['' + localSmile[i].name] = { datatype: 'image', title: localSmile[i].title, desc: localSmile[i].desc, addr: localSmile[i].addr };
}
for (i = 0; i < OnlineSmile.length; i++) {
    MenuList['' + OnlineSmile[i].name] = { datatype: 'image', title: OnlineSmile[i].title, desc: OnlineSmile[i].desc, addr: OnlineSmile[i].addr };
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
    var offset = $img.offset(),
        $zoomIn = $('<img class="kfe-zoom-in" src="' + $img.attr('src') + '" alt="[\u9884\u89C8\u56FE\u7247]">').appendTo('body'),
        windowWidth = $(window).width(),
        zoomInWidth = $zoomIn.outerWidth(),
        top = offset.top - $zoomIn.outerHeight() - 5,
        left = offset.left + $img.width() / 2 - zoomInWidth / 2;
    if (left < 0) left = 0;else if (left + zoomInWidth > windowWidth) left = windowWidth - zoomInWidth;
    $zoomIn.css({ top: top, left: left });
};

/**
* 获取表情面板的HTML代码
* @param {string} key 菜单关键字
* @returns {string} 表情面板内容
*/
var getSmilePanelHtml = function getSmilePanelHtml(key) {
    var data = MenuList[key];if (!data) return '';
    var html = '',
        ref = void 0;for (i = 0; i < data.addr.length; i++) {
        if (data.datatype === 'image') {
            html += '<img class="kfe-smile" src="' + data.addr[i] + '" alt="[\u8868\u60C5]">';
        } else if (data.datatype === 'imageLink') {
            ref = typeof data.ref !== 'undefined' && typeof data.ref[i] !== 'undefined' ? data.ref[i] : '';
            html += '<img class="kfe-smile" data-code="' + ref + '" src="' + data.addr[i] + '" alt="[\u8868\u60C5]">';
        } else if (data.datatype === 'plain') {
            ref = typeof data.ref !== 'undefined' && typeof data.ref[i] !== 'undefined' ? data.ref[i] : data.addr[i];
            html += '<a class="kfe-smile-text" data-code="' + data.addr[i] + '"  href="#">' + ref + '</a>';
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
    if (localStorage.imgmoveMb != null) {
        var imgmoveMb = JSON.parse(localStorage.imgmoveMb);
        kfekanban.innerHTML = '<div id = "kfekanban" style = "position:fixed;left:' + Math.floor(imgmoveMb[0] * ww) + 'px;top:' + Math.floor(imgmoveMb[1] * wh) + 'px;z-index:88;cursor:pointer;" >\n  <img class="kfekanban" src = ' + customize.kanbanimg + ' width =' + (Math.floor(customize.kanbansize / 2) + "%") + ' height =' + (Math.floor(customize.kanbansize / 2) + "%") + '></div>';
    } else {
        kfekanban.innerHTML = '<div id = "kfekanban" style = "position:fixed;left:5px;top:300px;z-index:88;cursor:pointer;" >\n  <img class="kfekanban" src = ' + customize.kanbanimg + ' width =' + (Math.floor(customize.kanbansize / 2) + "%") + ' height =' + (Math.floor(customize.kanbansize / 2) + "%") + '></div>';
    }
} else {
    if (localStorage.imgmovePc != null) {
        var imgmovePc = JSON.parse(localStorage.imgmovePc);
        kfekanban.innerHTML = '<div id = "kfekanban" style = "position:fixed;left:' + Math.floor(imgmovePc[0] * ww) + 'px;top:' + Math.floor(imgmovePc[1] * wh) + 'px;z-index:88;cursor:pointer;" >\n  <img class="kfekanban" src = ' + customize.kanbanimg + ' width =' + (customize.kanbansize + "%") + ' height =' + (customize.kanbansize + "%") + '></div>';
    } else {
        kfekanban.innerHTML = '<div id = "kfekanban" style = "position:fixed;left:5px;top:100px;z-index:88;cursor:pointer;" >\n  <img class="kfekanban" src = ' + customize.kanbanimg + ' width =' + (customize.kanbansize + "%") + ' height =' + (customize.kanbansize + "%") + '></div>';
    }
}document.body.appendChild(kfekanban);
var imgpv = document.getElementById("kfekanban");window.onload = function () {
    drag(imgpv);
};
// 表情商店相关
var KfeDialogHtml = '\n  <form>\n  <div class="kfe-shop_box" id="Kfe-shop-dialog" style="display: block; top: 8px; left: 336px;">\n    <sheader><logo>&nbsp;&nbsp;&nbsp;\u8868\u60C5\u8D34\u7EB8\u5546\u5E97 | Sticker Shop</logo>\n      <span class="kfe-close-shop">\xD7&nbsp;&nbsp;</span></sheader>\n      <div class="kfe-shop_main" ><br>\n      <div class="Kfe-list-content"></div>\n  </div>\n  <div class="pd_cfg_btns"></div>\n  <div class="sticker-pages"><div class="Kfe-list-pagination"></div></div>\n  <div class="kfe-shop_footer">\n      <a target="_blank" href="https://stickers.inari.site/terms">Terms Of Service/\u670D\u52A1\u6761\u6B3E</a> | <a target="_blank" href="https://stickers.inari.site/rules">Privacy Policy/\u9690\u79C1\u7B56\u7565</a> | <a target="_blank" href="https://stickers.inari.site/qa">Q&A/\u5E38\u89C1\u95EE\u9898</a> |\n      \xA9mistakey&nbsp;&nbsp;\n    </div></div></form>\n  ',
    KfeUploadHtml = '<form><div class="kfe-shop_box" id="Kfe-shop-dialog" style="display: block; top: 8px; left: 336px;">\n     <sheader><logo>&nbsp;&nbsp;&nbsp;\u8868\u60C5\u8D34\u7EB8\u5546\u5E97 | Sticker Shop</logo><span class="kfe-close-shop">\xD7&nbsp;&nbsp;</span></sheader>\n     <div class="kfe-shop_main" ><br>\n     <div class="Kfe-list-content">\n     <h3>\u5F00\u53D1\u6587\u6863: \u6807\u51C6\u5316\u6570\u636E\u6E90\u683C\u5F0F</h3>\n     <p>{"id":int,"desc":"\u8FD9\u91CC\u662F\u63CF\u8FF0\uFF0C\u9F20\u6807\u79FB\u5230\u8BE5\u5206\u7EC4\u65F6\u4F1A\u663E\u793A","cover":"url","name":"_Name","title":"\u5C55\u793A\u7684\u540D\u5B57","addr":"_NameList","numstart":[int,int,...],"numend":[int,int,...],"url1":["url\u524D1","url\u524D2",...],"url2":["url\u540E1","url\u540E1",...]};</p>\n     </div>\n     </div>\n     <div class="sticker-pages"><div class="Kfe-list-pagination">\n     </div>\n     </div>\n     <div class="kfe-shop_footer">\n     <a target="_blank" href="https://stickers.inari.site/terms">Terms Of Service/\u670D\u52A1\u6761\u6B3E</a> | <a target="_blank" href="https://stickers.inari.site/rules">Privacy Policy/\u9690\u79C1\u7B56\u7565</a> | <a target="_blank" href="https://stickers.inari.site/qa">Q&A/\u5E38\u89C1\u95EE\u9898</a> |\n     \xA9mistakey&nbsp;&nbsp;</div>\n </div></form>',
    KfelogedUp = '<form method="POST" action="https://api.inari.site/?s=App.Examples_Upload.Go" target="NoRefreash" enctype="multipart/form-data">\n     <p><b>\u68C0\u6D4B\u5230\u5DF2\u767B\u5F55\uFF0C\u53EF\u4EE5\u5728\u6B64\u76F4\u63A5\u4E0A\u4F20\u8868\u60C5\u8D34\u7EB8\u7EC4\u538B\u7F29\u5305(\u6700\u592750M)\u5E76\u83B7\u53D6\u8FD4\u56DE\u503C</b></p>\n     <input class=\'Kfe-pagination-nowpage-button\' type="file" name="file">\n     <input class=\'Kfe-pagination-nowpage-button\' type="submit"></form>\n     <iframe src="" frameborder="0" name="NoRefreash" style="width:100%;height:42px"></iframe>',
    KfeunlogUp = '<p><b>\u672A\u767B\u5F55\u6216\u767B\u5F55\u5931\u6548\uFF0C\u767B\u5F55\u540E\u521B\u4F5C\u8005\u53EF\u4EE5\u76F4\u63A5\u5728\u6B64\u4E0A\u4F20\u8868\u60C5\u8D34\u7EB8\u7EC4\u538B\u7F29\u5305\u5E76\u83B7\u53D6\u8FD4\u56DE\u503C</b></p>',
    KfetextUp = '<h3>\u8BF7\u6309\u5982\u4E0B\u683C\u5F0F\u586B\u5199""\u5185\u7684\u5185\u5BB9\uFF0C\u7136\u540E\u90AE\u4EF6\u5185\u5BB9\u81F3 <a herf="mailto:Hazukikaguya@office.inari.site">Hazukikaguya@office.inari.site</a></h3><p>\n     \u540D\u79F0: "\u8FD9\u91CC\u586B\u5199\u5C55\u793A\u5728\u5546\u5E97\u9875\u9762\u7684\u63CF\u8FF0\u540D\u79F0"<br>\n     \u4F5C\u8005: "\u8FD9\u91CC\u586B\u5199\u4F5C\u8005"<br>\n     \u63CF\u8FF0: "\u8FD9\u91CC\u662F\u63CF\u8FF0\uFF0C\u9F20\u6807\u79FB\u5230\u8BE5\u5206\u7EC4\u65F6\u4F1A\u663E\u793A"<br>\n     \u6807\u9898: "\u8FD9\u91CC\u586B\u5199\u542F\u7528\u540E\u5C55\u793A\u7684\u540D\u5B57\uFF08\u5982\u90A6\u90A6/S1/AC\u5A18 \u8FD9\u79CD\u7B80\u77ED\u7684\uFF09"<br>\n     \u5C01\u9762: "\u8FD9\u91CC\u586B\u5199\u5C55\u793A\u5728\u5546\u5E97\u9875\u9762\u7684\u5C01\u9762\u56FE\u7247\u7684url\u94FE\u63A5\uFF0C\u5EFA\u8BAE\u4F7F\u7528\u90AE\u4EF6\u9644\u4EF6"<br>\n     \u94FE\u63A5: "\u8FD9\u91CC\u586B\u5199\u53EF\u4E0B\u8F7D\u5E16\u7EB8\u7EC4\u7684url/\u538B\u7F29\u5305\u3002\u767B\u5F55\u7528\u6237\u53EF\u5728\u6B64\u9875\u9762\u4E0A\u4F20\u538B\u7F29\u5305\u5E76\u590D\u5236\u8FD4\u56DE\u503C\uFF0C\u4F46\u8FD8\u662F\u5EFA\u8BAE\u521B\u4F5C\u8005\u76F4\u63A5\u4F7F\u7528\u90AE\u4EF6\u9644\u4EF6"</p>',
    KfeItemHtml = '\n  <div class="sticker-item">\n  <div class="sticker-item-img"><img style="width: 50px; height: 50px;"/></div>\n  <div class="sticker-item-name"></div>\n  </div>\n  ',
    KfePaginationItemHtml = '\n  <div class="Kfe-pagination-item-button"></div>\n  ',
    KfeNowPageHtml = '\n  <div class="Kfe-pagination-nowpage-button"></div>\n  ',
    prevNextPageHtml = '\n  <div class="Kfe-pagination-prev-next"></div>\n  ';
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
    var $container = $('<div class="kfe-container">\n      <div class="kfe-menu" id="smilepndw" style="text-align:left;">\n      <input type= "file"  class="kfe-user-p" id="kfe-user-p" accept="image/*" style="display:none;" >\n      <input type="button" class="kfe-user-t" value="\u4E0A\u4F20\u56FE\u7247" style="display:none" >\n      <input type="button" class="kfe-user-y" value="\u4E91\u540C\u6B65">\n      <input type="button" class="kfe-user-i" value="\u81EA\u5B9A\u4E49">\n      <input type="button" class="kfe-user-g" value="\u8868\u60C5\u7EC4\u8BBE\u7F6E">&nbsp;\n      <span class="kfe-close-panel" title="KF\u8868\u60C5\u589E\u5F3A\u63D2\u4EF6by eddie32,\u55B5\u62C9\u5E03\u4E01,mistakey(Hazukikaguya)\uFF0C' + updatelog + '" style="cursor: pointer;"><b>\u2468</b></span>\n      ' + getSubMenuHtml() + '<span class="kfe-close-panel">[-]</span>&nbsp;<input type="checkbox" class="realeditclick" id="realedit" value="realedit" ' + realeditcheck + '>\u53EF\u89C6\u5316\u7F16\u8F91\n \n      <div class="kfe-diy-panel" style="display:none">\n      <input type="button" class="kfe-user-c" value="\u6DFB\u52A0\u8D34\u7EB8">&nbsp;\n      <input type="button" class="kfe-user-r" value="\u5BFC\u51FA\u8D34\u7EB8">&nbsp;\n      <input type="button" class="kfe-user-u" value="\u4FEE\u6539\u8D34\u7EB8">&nbsp;\n      <input type="button" class="kfe-user-d" value="\u5220\u9664\u8D34\u7EB8">&nbsp;\n      <input type="button" class="kfe-user-cfg" value="\u4E2A\u6027\u8BBE\u7F6E">\n      <div class="kfe-conf-panel" style="display:none">\n      <table><tr><td>\n      <li><input type="text" class="conftext" id="kanbanimg" value="">&nbsp;<input type="button" class="kfe-res-kanbanimg" value="\u9ED8\u8BA4">\uFF08\u770B\u677F\u5A18\u56FE\u7247URL\uFF09</li>\n      <li><input type="number" class="conftext" id="kanbansize" value="">&nbsp;<input type="button" class="kfe-res-kanbansize" value="\u9ED8\u8BA4">\uFF08\u770B\u677F\u5A18\u5927\u5C0F\uFF0C\u79FB\u52A8\u7AEF/2\uFF09</li>\n      <li><input type="text" class="conftext" id="onlineraw" value="">&nbsp;<input type="button" class="kfe-res-onlineraw" value="\u9ED8\u8BA4">\uFF08\u5728\u7EBF\u8D34\u7EB8\u4ED3\u5E93API\uFF09</li>\n      <li><input type="text" class="conftext" id="imgapi" value="">&nbsp;<input type="button" class="kfe-res-imgapi" value="\u9ED8\u8BA4">\uFF08\u56FE\u7247\u4E0A\u4F20\u56FE\u5E8AAPI\uFF09</li>\n      <li><input type="text" class="conftext" id="olimglists" disabled="true" value="">&nbsp;<input type="button" class="kfe-res-olimglists" value="\u9ED8\u8BA4">\uFF08\u5DF2\u9009\u5728\u7EBF\u8D34\u7EB8ID\u6570\u7EC4\uFF09</li>\n      <li><input type="checkbox" class="confbt" id="writeable" value="writeable"><span style="cursor: help;color:red" title="\u8BF7\u786E\u5B9A\u4F60\u77E5\u9053\u4F60\u5728\u505A\u4EC0\u4E48\uFF01\u5728\u6B64\u4FEE\u6539\uFF08\u7279\u522B\u662F\u589E\u52A0\uFF01\uFF09\u5DF2\u9009\u5728\u7EBF\u8D34\u7EB8\u7EC4ID\u6570\u7EC4\u53EF\u80FD\u4F1A\u53D1\u751F\u4E0D\u53EF\u9884\u77E5\u7684\u9519\u8BEF\uFF01">\u7F16\u8F91ID\u6570\u7EC4\u3010!\u3011</span>\n      <input type="checkbox" class="confbt" id="markdown" value="markdown">\u7528M\u2193\u53D6\u4EE3BBcode\n      <input type="checkbox" class="confbt" id="notauthed" value="auth">\u663E\u793A\u672A\u9A8C\u8BC1\u8D34\u7EB8\u7EC4</li>\n      <li><input type="button" class="kfe-res-kanbanloc" value="\u91CD\u7F6E\u770B\u677F\u4F4D\u7F6E">&nbsp;&nbsp;<input type="button" class="kfe-res-hidekanban" value="\u9690\u85CF\u770B\u677F\u5A18">&nbsp;&nbsp;<input type="button" class="kfe-res-all" value="\u5168\u90E8\u521D\u59CB\u5316">&nbsp;&nbsp;<input type="button" class="kfe-conf-close" value="\u5173\u95ED\u5217\u8868"></li>\n      </td></tr></table></div></div>\n      <div class="kfe-acc-panel" style="display:none">\n      <input type="button" class="kfe-user-reg" value="\u6CE8\u518C">&nbsp;\n      <input type="button" class="kfe-user-log" value="\u767B\u5F55">&nbsp;\n      <input type="button" class="kfe-user-img" value="\u7ED1\u5B9A\u56FE\u5E8A">&nbsp;\n      <input type="button" class="kfe-user-ltc" value="\u4E0A\u4F20\u4E91\u7AEF">&nbsp;\n      <input type="button" class="kfe-user-ctl" value="\u6062\u590D\u672C\u5730">&nbsp;\n      <input type="button" class="kfe-user-out" value="\u9000\u51FA\u767B\u5F55"></div>\n      <div class="kfe-bqz-panel" style="display:none">\n      <input type="button" class="kfe-user-loc" value="\u542F\u7528\u7684\u672C\u5730\u8868\u60C5">&nbsp;\n      <input type="button" class="kfe-user-oln" value="\u6D4F\u89C8\u8868\u60C5\u7EC4\u5546\u5E97">&nbsp;\n      <input type="button" class="kfe-user-raw" value="\u5411\u8D34\u7EB8\u5546\u5E97\u6295\u7A3F">&nbsp;\n      <div class="kfe-loc-panel" style="display:none"><table><tr>\n      <td><li><input type="checkbox" class="locbt" id="ng0" value="0">AC\u5A18</li></td>\n      <td><li><input type="checkbox" class="locbt" id="ng1" value="1">S1\u9EBB\u5C06\u8138</li></td>\n      <td><li><input type="checkbox" class="locbt" id="ng3" value="3">\u770B\u677F\u5A18\u5C0FB</li></td>\n      <td><li><input type="checkbox" class="locbt" id="ng4" value="4">\u5FAE\u535A\u8D34\u5427</li></td>\n      <td><li><input type="checkbox" class="locbt" id="ng2" value="2">\u963F\u5361\u6797</li></td></tr><tr>\n      <td><li><input type="checkbox" class="locbt" id="ng9" value="9">\u90A6\u90A6</li></td>\n      <td><li><input type="checkbox" class="locbt" id="ng6" value="6">LoveLive</li></td>\n      <td><li><input type="checkbox" class="locbt" id="ng8" value="8">\u516C\u4E3B\u94FE\u63A5R</li></td>\n      <td><li><input type="checkbox" class="locbt" id="ng7" value="7">\u5C11\u5973\u6B4C\u5267</li></td>\n      <td><li><input type="checkbox" class="locbt" id="ng5" value="5">\u5C0F\u7EA2\u8C46</li></td>\n      <td><input type="button" class="kfe-loc-close"value="\u5173\u95ED\u5217\u8868" ></td></tr>\n      </table></div></div></div>\n \n      <div class="KfeHtmlEditerP" id="Htmlediterpannel" style="display:none;text-align:left;width=100%" >\n      <div class="KfeHtmlediterF" id="Htmlediter">\n          <button class="Heditm" data-edit="undo" title="\u64A4\u9500(Ctrl+Z)">\u21A9\uFE0F</button>\n          <button class="Heditm" data-edit="redo" title="\u91CD\u505A(Ctrl+Y)">\u21AA\uFE0F</button>\n          <button class="Heditms" id="HEDurl" title="\u63D2\u5165\u94FE\u63A5">\uD83D\uDD17</button>\n          <button class="Heditms" id="HEDimg" title="\u63D2\u5165\u56FE\u7247">\uD83D\uDDBC\uFE0F</button>\n          <button class="Heditms" id="HEDaudio" title="\u63D2\u5165HTML5\u97F3\u9891">\uD83C\uDFB5</button>\n          <button class="Heditms" id="HEDvideo" title="\u63D2\u5165HTML5\u89C6\u9891">\uD83C\uDF9E\uFE0F</button>\n          <button class="Heditm" data-edit="quote" title="\u63D2\u5165\u5F15\u7528\u5185\u5BB9">\uD83D\uDCAC</button>\n          <button class="Heditm" data-edit="code" title="\u63D2\u5165\u4EE3\u7801\u5185\u5BB9" >\uD83D\uDCC4</button>\n          <button class="Heditm" data-edit="hide" title="\u63D2\u5165\u9690\u85CF\u5185\u5BB9">\uD83D\uDCA1</button>\n          <button class="Heditm" data-edit="sell" title="\u63D2\u5165\u51FA\u552E\u5185\u5BB9">\uD83E\uDE99</button>\n          <button class="Heditm" data-edit="bold" title="\u7C97\u4F53"><b>B</b></button>\n          <button class="Heditm" data-edit="italic" title="\u659C\u4F53"><i><b>I</b></i></button>\n          <button class="Heditm" data-edit="underline" title="\u4E0B\u5212\u7EBF"><u><b>U</b></u></button>\n          <button class="Heditm" data-edit="strikeThrough" title="\u5220\u9664\u7EBF"><s><b>A</b></s></button>\n          <button class="Heditm" data-edit="hr" title="\u63D2\u5165\u6C34\u5E73\u7EBF" ><b>\u4E00</b></button>\n          <input  class="Heditms" type=\'color\' onblur="document.execCommand(\'forecolor\',false,this.value)" title="\u5B57\u4F53\u989C\u8272">\n          <input  class="Heditms" type=\'color\' onblur="document.execCommand(\'backcolor\',false,this.value)" title="\u80CC\u666F\u989C\u8272">\n          <button class="Heditm" data-edit="justifyLeft" title="\u5DE6\u5BF9\u9F50"><b>\u2906</b></button>\n          <button class="Heditm" data-edit="justifyCenter" title="\u5C45\u4E2D"><b>\u27FA</b></button>\n          <button class="Heditm" data-edit="justifyRight" title="\u53F3\u5BF9\u9F50"><b>\u2907</b></button>\n          <button class="Heditm" data-edit="Subscript" title="\u4E0B\u6807">X<b>,</b></button>\n          <button class="Heditm" data-edit="Superscript" title="\u4E0A\u6807">X<b>\'</b></button>\n          <span title="\u5B57\u4F53\u5927\u5C0F\u8BBE\u7F6E">\n          <button class="Heditm" data-edit="fontSize:1">s</button>\n          <button class="Heditm" data-edit="fontSize:3">M</button>\n          <button class="Heditm" data-edit="fontSize:5">L</button>\n          <button class="Heditm" data-edit="fontSize:7"><b>L</b></button>\n        </span>\n          <button class="Heditm" data-edit="removeFormat" title="\u6E05\u9664\u9009\u4E2D\u6587\u672C\u7684\u683C\u5F0F"><b>\u2A2F</b></button>\n \n \n      </div>\n      <div class="KfeHtmlEditer" id="Htmleditarea" contenteditable="true" spellcheck="false" style="height: 300px;overflow:auto;background:white;border:1px dashed #000;outline:none;margin: 0px; height: 300px;margin: 0px; " ></div>\n \n      </div>\n \n      </div>').insertBefore($(textArea));
    if (isKfMobile == true) {
        $('<button class="btn btn-secondary upload-image-btn ml-1" title="\u4E0A\u4F20\u56FE\u7247" onclick="$(\'.kfe-user-p\').click();">\n              <i class="fa fa-picture-o" aria-hidden="true"></i>\u4E0A\u4F20\u56FE\u7247</button>').insertAfter($("#smileDropdownBtn"));
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
        e.preventDefault();$container.find('.kfe-acc-panel').hide();$container.find('.kfe-bqz-panel').hide();$this = $(this);var key = $this.data('key');if (!key) return;
        $container.find('.kfe-sub-menu').removeClass('kfe-sub-menu-active');$this.addClass('kfe-sub-menu-active');$container.find('.kfe-smile-panel').hide();
        $container.find('.kfe-conf-panel').hide();$panel = $container.find('.kfe-smile-panel[data-key="' + key + '"]');
        if ($panel.length > 0) {
            $panel.show();
        } else {
            $('#smilepndw').append($(getSmilePanelHtml(key))).show();var $panels = $container.find('.kfe-smile-panel[data-key="' + key + '"]');$panels.show();
        }
    }).on('click', '.kfe-smile, .kfe-smile-text', function (e) {
        e.preventDefault();$this = $(this);var code = $this.data('code');
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
        $('.kfe-zoom-in').remove();showZoomInImage($(this));
    }).on('mouseleave', '.kfe-smile', function () {
        $('.kfe-zoom-in').remove();
    }).on('change', '.kfe-user-p', function (e) {
        e.preventDefault();file = this.files[0];
        if (file != null) {
            formData = new FormData();formData.append('file', file);upimgfunc(formData, textArea);
        }
    }).on('click', '.kfe-user-t', function (e) {
        e.preventDefault();$('#kfe-user-p').click();
    }).on('click', '.kfe-user-g', function (e) {
        e.preventDefault();$container.find('.kfe-smile-panel').hide();$container.find('.kfe-diy-panel').hide();$container.find('.kfe-acc-panel').hide();
        $this = $(this);$container.find('.kfe-user-g').removeClass('kfe-user-g-active');$this.addClass('kfe-user-g-active');
        $container.find('.kfe-diy-panel').hide();$panel = $container.find('.kfe-bqz-panel');$panel.show();
    }).on('click', '.kfe-user-i', function (e) {
        e.preventDefault();$container.find('.kfe-acc-panel').hide();$container.find('.kfe-bqz-panel').hide();$this = $(this);
        $container.find('.kfe-user-i').removeClass('kfe-user-i-active');$this.addClass('kfe-user-i-active');
        $container.find('.kfe-diy-panel').hide();$panel = $container.find('.kfe-diy-panel');$panel.show();
    }).on('click', '.kfe-user-y', function (e) {
        e.preventDefault();$container.find('.kfe-smile-panel').hide();$container.find('.kfe-diy-panel').hide();$container.find('.kfe-bqz-panel').hide();
        $this = $(this);$container.find('.kfe-user-y').removeClass('kfe-user-y-active');$this.addClass('kfe-user-y-active');
        $container.find('.kfe-acc-panel').hide();$panel = $container.find('.kfe-acc-panel');$panel.show();
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
            alert(notokenT);
        };
    }).on('click', '.kfe-user-ltc', function (e) {
        e.preventDefault();
        if (localStorage.logindata != null) {
            ltcfunc();
        } else {
            alert(notokenT);
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
        e.preventDefault();localStorage.removeItem('logindata');GM_deleteValue('sppuid');GM_deleteValue('spptoken');
        if (confirm("是否同时清除记住的云同步账号&密码？")) {
            GM_deleteValue('user');GM_deleteValue('pass');
        }
        alert(doneT);
    }).on('click', '.kfe-user-loc', function (e) {
        e.preventDefault();temp = customize.lcimglists.length;
        if (temp == 0) {
            console.log('none');
        } else if (temp != 0) {
            t = customize.lcimglists;for (i = 0; i < t.length; i++) {
                $("#ng" + t[i]).attr("checked", true);
            }
        } else {
            alert(errT);console.log('当前已选本地贴纸组数据为：' + customize.lcimglists);
        };
        $container.find('.kfe-diy-panel').hide();$this = $(this);$container.find('.kfe-user-loc').removeClass('kfe-user-loc-active');
        $this.addClass('kfe-user-loc-active');$container.find('.kfe-loc-panel').hide();$panel = $container.find('.kfe-loc-panel');$panel.show();
    }).on('click', '.kfe-user-oln', function (e) {
        e.preventDefault();
        KfeShowDialog();
    }).on('click', '.kfe-user-raw', function (e) {
        e.preventDefault();KfeShowUpload();
    }).on('click', '.kfe-user-cfg', function (e) {
        e.preventDefault();$container.find('.kfe-smile-panel').hide();
        // 载入个性化
        $("#kanbanimg").attr("value", customize.kanbanimg);
        $("#kanbansize").attr("value", customize.kanbansize);
        $("#onlineraw").attr("value", customize.onlineraw);
        $("#imgapi").attr("value", customize.imgapi);
        $("#olimglists").attr("value", customize.olimglists);
        $("#notauthed").attr("checked", customize.notauthed);
        $("#markdown").attr("checked", customize.markdown);
        $panel = $container.find('.kfe-conf-panel');$panel.show();
    }).on('click', '.locbt', function (e) {
        i = e.target.value;customize.lcimglists ? temp = customize.lcimglists : temp = [];
        if (e.target.checked == false) {
            temp = temp.filter(function (item) {
                return item != i;
            });
        } else {
            temp.push(i);
        }
        customize.lcimglists = temp;localStorage.setItem('StickerConf', JSON.stringify(customize));sessionStorage.removeItem('localSmile');
    }).on('click', '.kfe-res-kanbanimg', function () {
        customize.kanbanimg = defaultSConf.kanbanimg;localStorage.setItem('StickerConf', JSON.stringify(customize));alert(resT);
    }).on('click', '.kfe-res-kanbansize', function () {
        customize.kanbansize = defaultSConf.kanbansize;localStorage.setItem('StickerConf', JSON.stringify(customize));alert(resT);
    }).on('click', '.kfe-res-onlineraw', function () {
        customize.onlineraw = defaultSConf.onlineraw;localStorage.setItem('StickerConf', JSON.stringify(customize));alert(resT);
    }).on('click', '.kfe-res-imgapi', function () {
        customize.imgapi = defaultSConf.imgapi;localStorage.setItem('StickerConf', JSON.stringify(customize));alert(resT);
    }).on('click', '.kfe-res-olimglists', function () {
        customize.olimglists = defaultSConf.olimglists;localStorage.setItem('StickerConf', JSON.stringify(customize));alert(resT);
    }).on('click', '.kfe-res-kanbanloc', function () {
        localStorage.removeItem('imgmovePc');localStorage.removeItem('imgmoveMb');alert(resT);
    }).on('click', '.kfe-res-hidekanban', function () {
        customize.kanbanimg = nullimg;localStorage.setItem('StickerConf', JSON.stringify(customize));alert(doneT + '请刷新！');
    }).on('click', '.kfe-res-all', function () {
        temp = defaultSConf;temp.lcimglists = customize.lcimglists;
        localStorage.setItem('StickerConf', JSON.stringify(temp));localStorage.removeItem('imgmovePc');localStorage.removeItem('imgmoveMb');
        sessionStorage.removeItem('localSmile');sessionStorage.removeItem('OnlineSmile');alert(resT);
    }).on('click', '.Heditm', function (e) {
        e.preventDefault();var cmd_val = this.getAttribute("data-edit").split(":");var CQSHcon = false;
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
                    document.execCommand('CreateLink', URLcon, HEDurlTU);
                } else {
                    document.execCommand('CreateLink', URLcon, URLcon);
                }
            } else {
                document.execCommand('CreateLink', URLcon, URLcon);
            }
        }
    }).on('click', '#HEDimg', function (e) {
        e.preventDefault();temp = prompt("请输入要插入的图片url", 'https://');
        if (temp) {
            document.execCommand("insertHTML", false, '<img src="' + temp + '" border="0">');
        }
    }).on('click', '#HEDaudio', function (e) {
        e.preventDefault();
        var HEDaudio = prompt('请输入HTML5音频实际地址：\n（可直接输入网易云音乐的单曲地址，喵拉将自动转换为外链地址）', 'https://');
        if (HEDaudio) {
            temp = /^https?:\/\/music\.163\.com\/(?:#\/)?song\?id=(\d+)/i.exec(HEDaudio);
            if (temp) HEDaudio = 'https://music.miaola.work/163/' + temp[1] + '.mp3';
            temp = /^https?:\/\/www\.xiami\.com\/song\/(\w+)/i.exec(HEDaudio);
            if (temp) HEDaudio = 'https://music.miaola.work/xiami/' + temp[1] + '.mp3';
            document.execCommand("insertHTML", false, '<audio src="' + HEDaudio + '" controls="" preload="none" style="margin: 3px 0;">[\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301audio\u6807\u7B7E]</audio><br>');
        }
    }).on('click', '#HEDvideo', function (e) {
        e.preventDefault();
        var HEDvideo = prompt('请输入HTML5视频实际地址：\n（可直接输入YouTube视频页面的地址，喵拉将自动转换为外链地址）', 'https://');
        if (HEDvideo) {
            temp = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w\-]+)/i.exec(HEDvideo);
            if (temp) HEDvideo = 'https://video.miaola.work/youtube/' + temp[1];
            temp = /^https?:\/\/youtu\.be\/([\w\-]+)$/i.exec(HEDvideo);
            if (temp) HEDvideo = 'https://video.miaola.work/youtube/' + temp[1];
            document.execCommand("insertHTML", false, '<video src="' + HEDvideo + '" controls="" preload="none" style="margin: 3px 0;">[\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301video\u6807\u7B7E]</video><br>');
        }
    }).on('click', '#notauthed', function (e) {
        customize.notauthed = e.target.checked;localStorage.setItem('StickerConf', JSON.stringify(customize));
    }).on('click', '#markdown', function (e) {
        customize.markdown = e.target.checked;localStorage.setItem('StickerConf', JSON.stringify(customize));
    }).on('click', '#writeable', function (e) {
        e.target.checked ? $("#olimglists").attr("disabled", false) : $("#olimglists").attr("disabled", true);
    }).on('click', '#realedit', function (e) {
        $panel = $('#Htmlediterpannel');
        temp = $container.find('#Htmleditarea');
        if (e.target.checked) {
            var TeContent = bb2html(textArea.value);temp[0].innerHTML = TeContent;
            if ($('#spp-reply-textarea').length > 0) {
                var spptextarea = $('#spp-reply-textarea'),
                    sppcontent = bb2html(spptextarea[0].value);temp[0].innerHTML = sppcontent;
            }
            $panel.show();$('textarea').hide();$('#editor-button').hide();customize.realedit = true, realedit = true;localStorage.setItem('StickerConf', JSON.stringify(customize));
        } else {
            if (realedits == false) {
                realedits = true;$('textarea').show();$('#editor-button').show();customize.realedit = false;localStorage.setItem('StickerConf', JSON.stringify(customize));
            } else {
                $('textarea').show();$('#editor-button').show();HeContent = html2bb(temp[0].innerHTML);
                textArea.innerHTML = HeContent;textArea.innerText = HeContent;textArea.value = HeContent;if ($('#spp-reply-textarea').length > 0) {
                    var _spptextarea = $('#spp-reply-textarea');_spptextarea[0].innerHTML = HeContent;_spptextarea[0].innerText = HeContent;_spptextarea[0].value = HeContent;
                }
                $panel.hide();customize.realedit = false;realedit = false;localStorage.setItem('StickerConf', JSON.stringify(customize));
            }
        }
    }).on('blur', '#Htmleditarea', function (e) {
        HeContent = html2bb(e.target.innerHTML);
        textArea.innerHTML = HeContent;
        textArea.innerText = HeContent;
        textArea.value = HeContent;
    }).on('keydown', '#Htmleditarea', function (e) {
        if (e.keyCode === 13) {
            document.execCommand('insertHTML', false, '<br>&nbsp;');
        }
    }).on('paste', '#Htmleditarea', function (e) {
        temp = event.clipboardData.files;
        if (temp.length > 0) {
            event.preventDefault();
            var pd = event.clipboardData.items[0];
            if (!/^image\/[jpeg|png|gif|jpg]/.test(pd.type)) {
                return;
            }
            var _file = event.clipboardData.items[0].getAsFile();
            temp = JSON.stringify(new Date().getTime());
            var files = new File([_file], temp + "." + _file.name.substr(_file.name.lastIndexOf('.') + 1), { type: _file.type, lastModified: _file.lastModified });
            formData = new FormData();reader = new FileReader();formData.append('file', files);
            reader.readAsDataURL(files);upimgfunc(formData, textArea);
        } else ;
    }).on('blur', '#kanbanimg', function (e) {
        customize.kanbanimg = e.target.value;localStorage.setItem('StickerConf', JSON.stringify(customize));
    }).on('blur', '#kanbansize', function (e) {
        customize.kanbansize = e.target.value;localStorage.setItem('StickerConf', JSON.stringify(customize));
    }).on('blur', '#onlineraw', function (e) {
        customize.onlineraw = e.target.value;localStorage.setItem('StickerConf', JSON.stringify(customize));
    }).on('blur', '#imgapi', function (e) {
        customize.imgapi = e.target.value;localStorage.setItem('StickerConf', JSON.stringify(customize));
    }).on('blur', '#olimglists', function (e) {
        e.target.value == "" ? temp = [] : temp = qc(e.target.value.match(/\d+/g).map(function (o) {
            return +o;
        }));
        $.ajax({ url: customize.onlineraw + 'GetListR&page=1&perpage=1', type: 'POST', contentType: false, processData: false }).done(function (data) {
            if (data.ret == 200) {
                for (i = 0; i < temp.length; i++) {
                    if (temp[i] <= data.data.total) {
                        get1stfunc(temp[i]);
                    }
                }
            } else {
                alert('发生' + data.ret + '错误，' + data.msg);
            }
        }).fail(function (data) {
            alert(errT);console.log(data);
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
    // 文本区域直接上传图片(文件名使用时间戳)并预览
    document.querySelector('textarea').addEventListener('paste', function (event) {
        temp = event.clipboardData.files;
        if (temp.length > 0) {
            event.preventDefault();var pd = event.clipboardData.items[0];
            if (!/^image\/[jpeg|png|gif|jpg]/.test(pd.type)) {
                return;
            }
            file = event.clipboardData.items[0].getAsFile();
            temp = JSON.stringify(new Date().getTime());
            var files = new File([file], temp + "." + file.name.substr(file.name.lastIndexOf('.') + 1), { type: file.type, lastModified: file.lastModified });
            formData = new FormData();reader = new FileReader();formData.append('file', files);
            reader.onload = function (_ref) {
                var target = _ref.target;

                setTimeout(function () {
                    $(".kfekanban").attr('src', target.result);
                }, 400);
                setTimeout(function () {
                    $(".kfekanban").attr('src', customize.kanbanimg);
                }, 4000);
            };
            reader.readAsDataURL(files);upimgfunc(formData, textArea);
        }
    });
};

/**
 * 方法功能区
 * @param textArea 文本框
 */
// 表情商店方法
var KfeShowDialog = function KfeShowDialog() {
    $dialog = $("#Kfe-shop-dialog")[0];$("body").append(KfeDialogHtml);KfeLoadSticker(1);
};
var KfeLoadSticker = function KfeLoadSticker(thePage) {
    var success = function success(data) {
        loadStickerList(data.data.items);loadStickerListPagination(data.data);
    };
    customize.notauthed == false ? temp = "GetList" : temp = "GetListR";
    $.ajax({ url: olApi + temp + '&page=' + thePage + '&perpage=20', type: 'POST', dataType: 'json' }).done(function (data) {
        if (data.ret == 200) {
            success(data);
        } else {
            alert(data.msg + ' 操作' + renT + data.ret);
        }
    }).fail(function (data) {
        alert(errT);console.log(data);
    });
};
var KfeShowUpload = function KfeShowUpload() {
    $dialog = $("#Kfe-shop-dialog")[0];$("body").append(KfeUploadHtml);var $root = $("#Kfe-shop-dialog .Kfe-list-content");
    if (localStorage.logindata != null) {
        loginf = JSON.parse(localStorage.logindata);aId = loginf[0];aToken = loginf[1];
        $.ajax({ url: cApi + 'CheckSession&user_id=' + aId + '&token=' + aToken, type: 'POST', dataType: 'json' }).done(function (data) {
            if (data.ret == 200) {
                temp = data.data.is_login;
                if (temp == true) {
                    $root.append($(KfelogedUp));
                } else {
                    $root.append($(KfeunlogUp));
                }
            } else {
                $root.append($(KfeunlogUp));
            }
        }).fail(function (data) {
            $root.append($(KfeunlogUp));console.log(data);
        });
    } else {
        $root.append($(KfeunlogUp));
    };$root.append($(KfetextUp));
};
var loadStickerList = function loadStickerList(items) {
    $root = $("#Kfe-shop-dialog .Kfe-list-content");$root.empty();
    $.each(items, function (_, o) {
        temp = JSON.parse(o.content);$node = $(KfeItemHtml).prop("title", temp.desc).data("id", o.id).data("content", o.content).find("img").prop("src", temp.cover).end().find(".sticker-item-name").text(o.title).end();$root.append($node);
    });
};
var loadStickerListPagination = function loadStickerListPagination(data) {
    var total = Math.ceil(data.total / 20),
        page = data.page,
        id = void 0;$root = $("#Kfe-shop-dialog .Kfe-list-pagination");
    if (page != 1) {
        $root.append($(KfePaginationItemHtml).data("id", 1).text("回首页"));$root.append($(prevNextPageHtml).data("id", page - 1).text("上一页"));
    }
    if (total < 12 || page < 7) {
        for (i = 1; i < page; ++i) {
            id = i;$node = $(KfePaginationItemHtml).data("id", id).text(id);$root.append($node);
        }
        $node1 = $(KfeNowPageHtml).data("id", page).text(page);$root.append($node1);
        for (i = page; i < total; ++i) {
            id = i + 1;$node = $(KfePaginationItemHtml).data("id", id).text(id);$root.append($node);
        }
    } else if (total > 11 && page + 5 < total) {
        for (i = page - 5; i < page; ++i) {
            id = i;$node = $(KfePaginationItemHtml).data("id", id).text(id);$root.append($node);
        }
        $node1 = $(KfeNowPageHtml).data("id", page).text(page);$root.append($node1);
        for (i = page; i < page + 5; ++i) {
            id = i + 1;$node = $(KfePaginationItemHtml).data("id", id).text(id);$root.append($node);
        }
    } else if (total > 11 && page + 6 > total) {
        for (i = total - 10; i < page; ++i) {
            id = i;$node = $(KfePaginationItemHtml).data("id", id).text(id);$root.append($node);
        }
        $node1 = $(KfeNowPageHtml).data("id", page).text(page);$root.append($node1);
        for (i = page; i < total; ++i) {
            id = i + 1;$node = $(KfePaginationItemHtml).data("id", id).text(id);$root.append($node);
        }
    }
    if (page != total) {
        $root.append($(prevNextPageHtml).data("id", page + 1).text("下一页"));$root.append($(KfePaginationItemHtml).data("id", total).text("去末页"));
    }
};
// 实验性功能，在KF论坛修复旧的失效的表情贴纸的显示。
s = document.getElementsByTagName("img");
for (i = 0; i < s.length; i++) {
    s[i].src = s[i].src.replace(/mistake.tech\/emote/g, "sticker.inari.site");
    s[i].src = s[i].src.replace(/http:\/\/o6smnd6uw.bkt.clouddn.com\/xds3\/akari/g, "https://sticker.inari.site/akarin/akarin");
    s[i].src = s[i].src.replace(/http:\/\/o6smnd6uw.bkt.clouddn.com\/xds\/2233/g, "https://sticker.inari.site/bili/2233");
    s[i].src = s[i].src.replace(/http:\/\/o6smnd6uw.bkt.clouddn.com\/lovelive\/Lovelive2nd/g, "https://sticker.inari.site/lovelive/Lovelive2nd");
    s[i].src = s[i].src.replace(/http:\/\/smilell2.eclosionstudio.com\/Small\/Lovelive2nd/g, "https://sticker.inari.site/lovelive/Lovelive2nd");
}
// 修复实时编辑模式下phpwind的回复某楼
$(document).on('click', "a[title='回复此楼']", function (e) {
    temp = e.target.getAttribute("onclick").replace(/postreply\('*([^\'\"]*)','[^\'\"]*'\);/g, '$1');
    $('.KfeHtmlEditer')[0].innerHTML += '<fieldset><legend>quote:</legend>' + temp + '</fieldset><br>';
}).on('click', "a[title='多重回复']", function () {
    if (realedit == true) {
        realedits = false;
    };$('textarea').show();$('.KfeHtmlEditerP').hide();
}).on("change", "#attachment_1", function (e) {
    num = 0;readFile(e, num);
}).on("change", "#attachment_2", function (e) {
    num = 1;readFile(e, num);
}).on("change", "#attachment_3", function (e) {
    num = 2;readFile(e, num);
}).on("change", "#attachment_4", function (e) {
    num = 3;readFile(e, num);
}).on("change", "#attachment_5", function (e) {
    num = 4;readFile(e, num);
}).on("change", "#attachment_6", function (e) {
    num = 5;readFile(e, num);
}).on("change", "#attachment_7", function (e) {
    num = 6;readFile(e, num);
}).on("change", "#attachment_8", function (e) {
    num = 7;readFile(e, num);
}).on("change", "#attachment_9", function (e) {
    num = 8;readFile(e, num);
}).on("change", "#attachment_10", function (e) {
    num = 9;readFile(e, num);
}).on("click", "#att_span1 .abtn", function () {
    num = 0;attspan(num);
}).on("click", "#att_span2 .abtn", function () {
    num = 1;attspan(num);
}).on("click", "#att_span3 .abtn", function () {
    num = 2;attspan(num);
}).on("click", "#att_span4 .abtn", function () {
    num = 3;attspan(num);
}).on("click", "#att_span5 .abtn", function () {
    num = 4;attspan(num);
}).on("click", "#att_span6 .abtn", function () {
    num = 5;attspan(num);
}).on("click", "#att_span7 .abtn", function () {
    num = 6;attspan(num);
}).on("click", "#att_span8 .abtn", function () {
    num = 7;attspan(num);
}).on("click", "#att_span9 .abtn", function () {
    num = 8;attspan(num);
}).on("click", "#att_span10 .abtn", function () {
    num = 9;attspan(num);
});
function readFile(e, num) {
    FileData = e.target.files[0];if (!/image\/\w+/.test(FileData.type)) {
        uupath[num] = uploadfile;
    } else {
        temp = new FileReader();temp.readAsDataURL(FileData);temp.onload = function (e) {
            uupath[num] = this.result;
        };
    }
}
function attspan(num) {
    $('.KfeHtmlEditer')[num].innerHTML += '<img src="' + uupath[num] + '" type="upload_1" width="240">';
}
// html2bb&bb2html
function html2bb(str) {
    str = str.replace(/<img[^>]*smile=\"(\d+)\"[^>]*>/ig, '[s:$1]');
    str = str.replace(/<img[^>]*type=\"(attachment|upload)\_(\d+)\"[^>]*>/ig, '[$1=$2]');
    var code_htm = new Array();
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
    for (i in code_htm) {
        str = str.replace("[\twind_phpcode_" + i + "\t]", code_htm[i]);
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
    var code_htm = new Array();
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
    for (i in code_htm) {
        str = str.replace("[\twind_phpcode_" + i + "\t]", code_htm[i]);
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
        FileData = $('#attachment_' + attid)[0].files[0];
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
        img = imgmaxwh(path, 320);
        if (img.width == 0) {
            return '<img src="' + path + '" type="' + type + '_' + attid + '" width="240" />';
        } else {
            return '<img src="' + path + '" type="' + type + '_' + attid + '" width="' + img.width + '" />';
        }
    }
}
function imgmaxwh(url, maxwh) {
    img = new Image();img.src = url;if (img.width > maxwh || img.width > maxwh) {
        img.width = img.width / img.height > 1 ? maxwh : maxwh * img.width / img.height;
    }
    return img;
}
function smilepath(NewCode) {
    var stemp = NewCode - 9;
    if (NewCode < 19) {
        return '<img src="/' + kfImgPath + '/post/smile/em/em0' + stemp + '.gif" smile="' + NewCode + '" />';
    } else {
        return '<img src="/' + kfImgPath + '/post/smile/em/em' + stemp + '.gif" smile="' + NewCode + '" />';
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
    temp = [['align', 1, 'align='], ['align', 1, 'text-align:'], ['backcolor', 2, 'background-color:'], ['color', 2, 'color:'], ['font', 1, 'font-family:'], ['b', 0, 'font-weight:', 'bold'], ['i', 0, 'font-style:', 'italic'], ['u', 0, 'text-decoration:', 'underline'], ['strike', 0, 'text-decoration:', 'line-through']];style = style.toLowerCase();
    for (i = 0; i < temp.length; i++) {
        begin = style.indexOf(temp[i][2]);
        if (begin == -1) {
            continue;
        }
        var value = findvalue(style, temp[i][2]);
        if (temp[i][1] == 2 && value.indexOf('rgb') != -1) {
            value = WYSIWYD._colorToRgb(value);
        }
        if (temp[i][1] == 0) {
            if (value == temp[i][3]) {
                code = '[' + temp[i][0] + ']' + code + '[/' + temp[i][0] + ']';
            }
        } else {
            code = '[' + temp[i][0] + '=' + value + ']' + code + '[/' + temp[i][0] + ']';
        }
        style = style.replace(temp[i][2], '');
    }
    return code;
}
function searchtag(tagname, str, action, type) {
    var tag = void 0;if (type == 2) {
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
        var strlower = str.toLowerCase();begin = strlower.indexOf(head, strpos);
        if (begin == -1) {
            break;
        }
        var strlen = str.length;
        for (i = begin + head_len; i < strlen; i++) {
            if (str.charAt(i) == tag[1]) break;
        }
        if (i >= strlen) break;
        var firsttag = i,
            style = str.substr(begin + head_len, firsttag - begin - head_len),
            end = strlower.indexOf(foot, firsttag);
        if (end == -1) break;
        var nexttag = strlower.indexOf(head, firsttag);
        while (nexttag != -1 && end != -1) {
            if (nexttag > end) break;end = strlower.indexOf(foot, end + foot_len);nexttag = strlower.indexOf(head, nexttag + head_len);
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
    var width = void 0;if (style.substr(0, 1) == '=') {
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
        t = style.charAt(i);
        if (start == 0) {
            if (t == '"' || t == "'") {
                start = i + 1;
            } else if (t != ' ') {
                start = i;
            }
            continue;
        }
        if (t == '"' || t == "'" || t == ';') {
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
    temp = ['width=', 'width:'];s = '';
    style = style.toLowerCase();
    for (i in temp) {
        if (style.indexOf(temp[i]) == -1) {
            continue;
        }
        s = '=' + findvalue(style, temp[i]);break;
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
    temp = { 'size': 'size=', 'color': 'color=', 'font': 'face=', 'backcolor': 'background-color:' };
    style = style.toLowerCase();
    for (i in temp) {
        t = style.indexOf(temp[i]);if (t == -1) {
            continue;
        }
        s = findvalue(style, temp[i]);if (in_array(i, ['backcolor', 'color']) && s.indexOf('rgb') != -1) {
            s = WYSIWYD._colorToRgb(s);
        }
        str = '[' + i + '=' + s + ']' + str + '[/' + i + ']';
    }
    return str;
}
// CURD方法
function usercfunc() {
    temp = prompt("请输入要添加的贴纸的URL，添加多个请用半角,隔开贴纸URL（添加后刷新页面生效）", "https://sticker.inari.site/inari.png");
    if (!temp) return;t = temp.split(',');s = [];
    for (i = 0; i < t.length; i++) {
        if (/(http:\/\/|https:\/\/).*.(png|jpg|jpeg|gif|webp|bmp|tif)+.*$/i.test(t[i])) {
            s.push(t[i]);
        } else if (/[a-zA-Z0-9\-\.]+\.+[a-zA-Z]+\/.*.(png|jpg|jpeg|gif|webp|bmp|tif)+.*$/i.test(t[i])) {
            s.push('https://' + t[i]);
        } else if (/[A-Za-z0-9\_\/]+\/+[0-9\/]+.(png|jpg|jpeg|gif|webp)$/i.test(t[i])) {
            s.push('https://sticker.inari.site/usr/' + t[i]);
        }
    }
    if (s.length < t.length) {
        alert('可能存在图片url错误，' + igoT);
    }
    if (s.length > 0) {
        temp = [];if (localStorage.userimgst) {
            try {
                temp = JSON.parse(localStorage.userimgst);
            } catch (ex) {
                console.log(ex);temp = [];
            }
        }
        temp = [].concat(_toConsumableArray(temp), _toConsumableArray(s));localStorage.setItem('userimgst', JSON.stringify(temp));alert(doneT);location.reload();
    }
}
function userufunc() {
    i = prompt("请输入要替换的贴纸的序号", "1");
    if (/[0-9]$/i.test(i)) {
        temp = JSON.parse(localStorage.userimgst);
        if (i > temp.length) {
            alert('序号超出贴纸数，' + igoT);
        } else if (i == 0) {
            alert(igoT);
        } else if (i <= temp.length) {
            s = prompt("请输入用于替换的图片url", "https://sticker.inari.site/inari.png");
            if (/(http:\/\/|https:\/\/).*.(png|jpg|jpeg|gif|webp|bmp|tif)+.*$/i.test(s)) {
                if (confirm('确定替换序号为' + i + '的贴纸吗？这是最后一次确认！')) {
                    temp[i - 1] = s;localStorage.setItem('userimgst', JSON.stringify(temp));
                    alert(doneT);location.reload();
                }
            } else if (s == null) {
                console.log('none');
            } else {
                alert(igoT);
            }
        } else if (i == null) {} else {
            alert(igoT);
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
            t = prompt("请输入要删除的贴纸的序号", "1");
            if (/[0-9]$/i.test(t)) {
                temp = JSON.parse(localStorage.userimgst);
                if (t > temp.length) {
                    alert('序号超出贴纸数，' + igoT);
                } else if (t == 0) {
                    alert(igoT);
                } else if (t <= temp.length) {
                    if (confirm('确定删除【序号为' + t + '的贴纸】吗？这是【最后一次】确认！')) {
                        for (i = t; i <= temp.length; i++) {
                            temp[i - 1] = temp[i];
                        }
                        temp.pop();localStorage.setItem('userimgst', JSON.stringify(temp));
                        alert(doneT);location.reload();
                    }
                } else {
                    alert(igoT);
                }
            } else if (t == null) {} else {
                alert(igoT);
            }
        }
    }
}
// 注册&登录方法
function loginfunc() {
    user = prompt("用户名", GM_getValue('user', 'username'));
    if (user != null && user.length <= 50) {
        pass = prompt("密码", GM_getValue('pass', 'password'));
        if (pass != null && pass.length >= 6 && pass.length <= 20) {
            $.ajax({ url: cApi + 'Login&username=' + user + '&password=' + pass, type: 'POST', dataType: 'json' }).done(function (data) {
                if (data.ret == 200) {
                    temp = data.data;GM_setValue('user', user);GM_setValue('pass', pass);GM_setValue('sppuid', temp.user_id);GM_setValue('spptoken', temp.token);
                    if (temp.is_login == true) {
                        localStorage.setItem('logindata', JSON.stringify([temp.user_id, temp.token]));imgbindcheckfunc();
                    } else if (temp.is_login == false) {
                        alert('Oops！用户名或密码错误！请检查！');
                    }
                } else {
                    alert('Oops！' + data.ret + '错误！' + data.msg);
                }
            }).fail(function (data) {
                alert(errT);console.log(data);
            });
        } else {
            pass == null ? alert('登录' + exiT) : alert('密码' + lengtherrT + '6-20位');
        }
    } else {
        user == null ? alert('登录' + exiT) : alert('用户名' + lengtherrT + '1-50位');
    }
}
function regfunc() {
    user = prompt("请输入1-50位用户名，" + lenlimiT, 'username');
    if (user != null && user.length >= 1 && user.length <= 20) {
        pass = prompt("请输入6-20位密码，" + lenlimiT, 'password');
        if (pass != null && pass.length >= 6 && pass.length <= 20) {
            temp = prompt("确认密码", 'password');
            if (pass == temp) {
                $.ajax({ url: cApi + 'Register&username=' + user + '&password=' + pass, type: 'POST', dataType: 'json' }).done(function (data) {
                    if (data.ret == 200) {
                        temp = data.data;localStorage.setItem('logindata', JSON.stringify([temp.user_id, temp.token]));
                        GM_setValue('user', user);GM_setValue('pass', pass);GM_setValue('sppuid', temp.user_id);GM_setValue('spptoken', temp.token);
                        if (confirm(imgunbindT)) {
                            imgbindfunc();
                        } else {
                            alert(notbindT);
                        }
                    } else if (data.ret != 200) {
                        alert('Oops！' + data.ret + '注册' + renT + data.msg);
                    }
                }).fail(function (data) {
                    alert(errT);console.log(data);
                });
            } else {
                alert("两次密码不一致，注册" + exiT);
            }
        } else {
            pass == null ? alert('注册' + exiT) : alert('密码' + lengtherrT + '6-20位');
        }
    } else {
        user == null ? alert('注册' + exiT) : alert('用户名' + lengtherrT + '1-50位');
    }
}
// 绑定检测&图床绑定方法
function imgbindcheckfunc() {
    loginf = JSON.parse(localStorage.logindata);aId = loginf[0];aToken = loginf[1], $.ajax({ url: cApi + 'Tutoken&user_id=' + aId + '&token=' + aToken, type: 'POST', dataType: 'json' }).done(function (data) {
        if (data.ret == 200) {
            temp = data.data;
            if (temp.tutoken != "") {
                localStorage.setItem('logindata', JSON.stringify([aId, aToken, temp.tutoken]));alert("检测到您已绑定图床账号！上传图片将使用绑定的图床账号！");
            } else if (confirm(imgunbindT + notbindT)) {
                imgbindfunc();
            } else {
                alert(notbindT);
            }
        } else {
            alert("检测图床绑定状态" + renT + data.ret);
        }
    }).fail(function (data) {
        alert(errT);console.log(data);
    });
}
function imgbindfunc() {
    user = prompt("图床账号邮箱", 'example@example.mail');pass = prompt("图床账号密码", 'password');formData = '{ "email":"' + user + '" , "password":"' + pass + '" }';
    $.ajax({ url: iApi + 'tokens', type: 'POST', dataType: 'json', data: formData, contentType: "application/json", processData: false }).done(function (data) {
        if (data.status == true) {
            loginf = JSON.parse(localStorage.logindata);aId = loginf[0];aToken = loginf[1];temp = data.data.token;
            localStorage.setItem('logindata', JSON.stringify([aId, aToken, temp]));
            $.ajax({ url: cApi + 'tupdate&user_id=' + aId + '&token=' + aToken + '&tupdate=' + temp, type: 'POST', dataType: 'json' }).done(function (data) {
                if (data.ret == 200) {
                    alert("已绑定图床账号！");
                } else {
                    alert(data.msg + ' 图床账号绑定' + renT + data.ret);
                }
            }).fail(function (data) {
                alert(errT);console.log(data);
            });
        } else if (data.status == false) {
            alert(data.message);
        }
    }).fail(function (data) {
        alert(errT);console.log(data);
    });
}
// 上载&同步方法
function ltcfunc() {
    loginf = JSON.parse(localStorage.logindata);aId = loginf[0];aToken = loginf[1];
    temp = localStorage.userimgst;
    if (temp != null) {
        $.ajax({ url: cApi + 'picsupdate&user_id=' + aId + '&token=' + aToken + '&picsdata=' + JSON.parse(temp), type: 'POST', dataType: 'json' }).done(function (data) {
            if (data.ret == 200) {
                if (confirm('确定同步【本地数据到云端】吗？这是最后一次确认！')) {
                    alert(doneT);
                } else {
                    alert(exiT);
                }
            } else {
                alert(data.msg + '同步操作' + renT + data.ret);
            }
        }).fail(function (data) {
            alert(errT);console.log(data);
        });
    } else {
        alert('本地数据为空！同步到云端' + exiT);
    }
}
function ctlfunc() {
    loginf = JSON.parse(localStorage.logindata);aId = loginf[0];aToken = loginf[1];
    $.ajax({ url: cApi + 'picsdata&user_id=' + aId + '&token=' + aToken, type: 'POST', dataType: 'json' }).done(function (data) {
        if (data.ret == 200) {
            temp = data.data.picsdata;if (temp != "") {
                if (confirm('确定同步【云端数据到本地】吗？这是最后一次确认！')) {
                    localStorage.setItem('userimgst', JSON.stringify(temp.split(',')));alert(doneT);location.reload();
                } else {
                    alert(exiT);
                }
            } else {
                alert("云端数据为空！同步到本地" + exiT);
            }
        } else {
            alert(data.msg + '同步操作' + renT + data.ret);
        }
    }).fail(function (data) {
        alert(errT);console.log(data);
    });
}
// 上传图片方法
function upimgfunc(formData, textArea) {
    if (!textArea) textArea = $('textarea')[0];
    temp = localStorage.logindata;
    if (temp == null) {
        $.ajax({ url: iApi + 'upload', type: 'POST', dataType: 'json', data: formData, contentType: false, processData: false }).done(function (data) {
            if (data.status == true) {
                temp = data.data.links;setTimeout(function () {
                    alert(guestupimgT);
                }, 1000);
                if (realedit == true) {
                    document.execCommand('insertImage', false, temp.url);
                } else if (realedit == false) {
                    if (customize.markdown == false) {
                        addCode(textArea, temp.bbcode);
                    } else if (customize.markdown == true) {
                        addCode(textArea, '![](' + temp.url + ')');
                    }
                }
            } else if (data.status == false) {
                alert(data.message);
            } else {
                alert(errT);console.log(data);
            }
        }).fail(function (data) {
            alert(errT);console.log(data);
        });
    } else {
        loginf = JSON.parse(temp);if (loginf.length == 2) {
            $.ajax({ url: iApi + 'upload', type: 'POST', dataType: 'json', data: formData, contentType: false, processData: false }).done(function (data) {
                if (data.status == true) {
                    temp = data.data.links;
                    if (realedit == true) {
                        document.execCommand('insertImage', false, temp.url);
                    } else if (realedit == false) {
                        if (customize.markdown == false) {
                            addCode(textArea, temp.bbcode);
                        } else if (customize.markdown == true) {
                            addCode(textArea, '![](' + temp.url + ')');
                        }
                    }
                    if (!localStorage.Alertless) {
                        alert(guestupimgT);localStorage.setItem('Alertless', true);
                    }
                } else if (data.status == false) {
                    alert(data.message);
                } else {
                    alert(errT);console.log(data);
                }
            }).fail(function (data) {
                alert(errT);console.log(data);
            });
        } else if (loginf.length == 3) {
            $.ajax({
                url: iApi + 'upload', type: 'POST', dataType: 'json', data: formData, contentType: false, processData: false,
                beforeSend: function beforeSend(xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + loginf[2]);
                }
            }).done(function (data) {
                if (data.status == true) {
                    temp = data.data.links;
                    if (realedit == true) {
                        document.execCommand('insertImage', false, temp.url);
                    } else if (realedit == false) {
                        if (customize.markdown == false) {
                            addCode(textArea, temp.bbcode);
                        } else if (customize.markdown == true) {
                            addCode(textArea, '![](' + temp.url + ')');
                        }
                    }
                } else if (data.status == false) {
                    alert(data.message);
                } else {
                    alert(errT);console.log(data);
                }
            }).fail(function (data) {
                alert(errT);console.log(data);
            });
        }
    }
}
// 单个在线贴纸获取方法
function get1stfunc(e) {
    $.ajax({ url: customize.onlineraw + 'Get&id=' + e, type: 'POST', contentType: false, processData: false }).done(function (data) {
        if (data.ret == 200) {
            FinalList.push(e);FinalRaw.push(JSON.parse(data.data.content));customize.olimglists = FinalList;
            localStorage.setItem('onlineraws', JSON.stringify(FinalRaw));localStorage.setItem('StickerConf', JSON.stringify(customize));sessionStorage.removeItem('OnlineSmile');
        } else {
            console.log(data.ret + '错误，' + data.msg);
        }
    }).fail(function (data) {
        alert(errT);console.log(data);
    });
}
// 数组去重
function qc(arr) {
    temp = new Set(arr);return Array.from(temp);
}
// 看板娘可拖拽,会记录拖拽位置
function drag(obj) {
    ww = window.innerWidth || document.body.clientWidth;wh = window.innerHeight || document.body.clientHeight;
    obj.onmousedown = function (event) {
        obj.setCapture && obj.setCapture();event = event || window.event;
        l = obj.style.left;t = obj.style.top;var ol = event.clientX - obj.offsetLeft,
            ot = event.clientY - obj.offsetTop;
        document.onmousemove = function (event) {
            event = event || window.event;obj.style.left = event.clientX - ol + "px";obj.style.top = event.clientY - ot + "px";
        };
        document.onmouseup = function () {
            document.onmousemove = null;document.onmouseup = null;
            obj.releaseCapture && obj.releaseCapture();i = obj.style.left;s = obj.style.top;
            if (l == i && t == s) {
                $textAreas = $("textarea");if (!$textAreas.length) return;
                if ($textAreas.length == 1) {
                    $('.kfe-user-p').click();
                } else {
                    alert("当前存在多个文本区，无法确认上传区域，看板娘点击上传暂不可用！");
                }
            } else {
                if (parseInt(i) < 0) {
                    obj.style.left = '0px';i = 0;
                } else if (parseInt(i) > 0.95 * ww) {
                    i = 0.95;obj.style.left = 0.95 * ww + 'px';
                } else if (parseInt(i) < 0.95 * ww) {
                    i = parseInt(i) / ww;
                }
                if (parseInt(s) < 0) {
                    obj.style.top = 0.1 * wh + 'px';s = 0.1;
                } else if (parseInt(s) > 0.9 * wh) {
                    s = 0.9;obj.style.top = 0.9 * wh + 'px';
                } else if (parseInt(s) < 0.9 * wh) {
                    s = parseInt(s) / wh;
                }
                localStorage.setItem('imgmovePc', JSON.stringify([i, s]));
            };
        };return false;
    };
    obj.addEventListener('touchmove', function (event) {
        event.preventDefault();
        if (event.targetTouches.length == 1) {
            var touch = event.targetTouches[0];
            if (touch.clientX >= 0) {
                if (touch.clientX < ww - 60) {
                    obj.style.left = touch.clientX + 'px';l = touch.clientX / ww;
                } else {
                    obj.style.left = 0.82 * ww + 'px';l = 0.82;
                }
            } else if (touch.clientX < 0) {
                obj.style.left = '0px';l = 0;
            }
            if (touch.clientY > 0) {
                if (touch.clientY < 0.99 * wh) {
                    obj.style.top = touch.clientY + 'px';t = touch.clientY / wh;
                } else {
                    obj.style.top = 0.99 * wh + 'px';t = 0.99;
                }
            } else if (touch.clientY < 0.05 * wh) {
                obj.style.top = 0.05 * wh + 'px';t = 0.05;
            }
            localStorage.setItem('imgmoveMb', JSON.stringify([l, t]));
        }
    });return false;
};
// 看板娘网页缩放跟随
window.onresize = function () {
    temp = $('#kfekanban');ww = window.innerWidth || document.body.clientWidth;wh = window.innerHeight || document.body.clientHeight;
    if (isKfMobile) {
        if (localStorage.imgmoveMb != null) {
            var _imgmoveMb = JSON.parse(localStorage.imgmoveMb);temp[0].style.left = _imgmoveMb[0] * ww + 'px';temp[0].style.top = _imgmoveMb[1] * wh + 'px';
        }
    } else {
        if (localStorage.imgmovePc != null) {
            var _imgmovePc = JSON.parse(localStorage.imgmovePc);temp[0].style.left = _imgmovePc[0] * ww + 'px';temp[0].style.top = _imgmovePc[1] * wh + 'px';
        }
    }
};

/**
 * 添加CSS
 */
var appendCss = function appendCss() {
    $('head').append('\n  <style>\n    .kfe-container { padding: 5px; vertical-align: middle; font: 12px/1.7em "sans-serif"; }\n    .kfe-menu { margin-bottom: 5px; }\n    .kfe-sub-menu { margin: 0 5px; text-decoration: none; border-bottom: 2px solid transparent; }\n    .kfe-sub-menu:hover, .kfe-sub-menu:focus { text-decoration: none; border-color: deeppink; }\n    a.kfe-sub-menu-active { color: black }\n    .kfe-smile-panel { display: none; height: 136px; padding: 5px 3px; overflow-y: auto; border-top: 1px solid #ddd; }\n    .kfe-smile-panel[data-key="Shortcut"] { height: auto; }\n    .kfe-smile-panel[data-key="Markdown"] { height: auto; }\n    .kfe-smile { display: inline-block; max-width: 60px; max-height: 60px; cursor: pointer; }\n    .kfe-smile-text { display: inline-block; padding: 3px 5px; }\n    .kfe-smile-text:hover { color: #fff !important; background-color: #2b2b2b; text-decoration: none; }\n    .kfe-close-panel { cursor: pointer; }\n    .kfe-zoom-in {\n      position: absolute; max-width: 150px; max-height: 150px; background-color: #fcfcfc; border: 3px solid rgba(242, 242, 242, 0.6);\n      border-radius: 2px; box-shadow: 0 0 3px rgb(102, 102, 102);\n    }\n    .kfe-shop_box sheader {height: 42px;background: rgb(49, 49, 49);display: block;font-size: 100%;margin: 0px;padding: 0px;color: rgb(115, 115, 115);font-family: "Helvetica Neue", Helvetica, arial, sans-serif;line-height: 1.231;}\n    .kfe-shop_box sheader logo{float: left;margin: 25px 2px 0px 30px;font-size: 150%;padding: 0px;display: block;margin-block-start: 0.67em;margin-block-end: 0.67em;margin-inline-start: 0px;margin-inline-end: 0px;color:#fff;}\n    .kfe-shop_box sheader span { float: right; margin: 25px 2px 0px 30px;font-size: 150%;padding: 0px;display: block;margin-block-start: 0.67em;margin-block-end: 0.67em;margin-inline-start: 0px;margin-inline-end: 0px;color:#fff;}\n    .kfe-shop_nav { text-align: right; margin-top: 5px; margin-bottom: -5px; }\n    .kfe-shop_main fieldset { border: 1px solid #ccccff; padding: 0 6px 6px; }\n    .kfe-shop_main legend { font-weight: bold; }\n    .Kfe-list-content {display: block;margin-block-start: 0em;margin-block-end: 1em;margin-inline-start: 0px;margin-inline-end: 0px;padding-inline-start: 40px;list-style-type: disc;line-height: 20px;background-color: #fcfcfc}\n    .sticker-item-img {text-align: center;}\n    .kfe-shop_main input[type="color"] { height: 18px; width: 30px; padding: 0; }\n    .kfe-shop_tips { color: #51d; text-decoration: none; cursor: help; }\n    .kfe-shop_tips:hover { color: #ff0000; }\n    #pdConfigDialog .kfe-shop_main { overflow-x: hidden; white-space: nowrap; }\n    .kfe-shop_panel { display: inline-block; width: 400px; vertical-align: top; }\n    .kfe-shop_panel + .kfe-shop_panel { margin-left: 5px; }\n    .kfe-shop_btns { background-color: #fcfcfc; text-align: right; padding: 5px; }\n    .kfe-shop_btns input, .kfe-shop_btns button { vertical-align: middle; }\n    .kfe-shop_btns button { min-width: 64px; }\n    .Kfe-pagination-item-button {border-style: none;display: inline-block; text-align: center; margin: 5px;}\n    .Kfe-pagination-nowpage-button {    border: 1px solid #e5e5e5;color: #00b84f;min-width: 30px;display: inline-block; text-align: center; margin: 5px;}\n    .Kfe-pagination-prev-next {border-style: none;display: inline-block; text-align: center; margin: 5px;}\n    .sticker-pages {background-color: #fcfcfc;padding: 8px 0 6px 10px;position: relative;color: #707072;font-size: 10px;margin: 0;text-align: center;width: 100%; }\n    .kfe-shop_footer {background-color: #f7f7fc;border-top: 1px solid #e6e6e6;padding: 8px 0 6px 10px;position: relative;color: #707072;font-size: 10px;margin: 0;}\n    .kfe-shop_footer a{color: #707072;font-size: 10px;}\n    .pd_custom_script_header { margin: 7px 0; padding: 5px; background-color: #e8e8e8; border-radius: 5px; }\n    .pd_custom_script_content { display: none; width: 750px; height: 350px; white-space: pre; }\n    .Heditm { border-style: none;display: inline-block; text-align: center;width: 26px;height: 20px;cursor: pointer;}\n    .Heditms { border-style: none;display: inline-block; text-align: center;width: 26px;height: 20px;cursor: pointer;}\n    .KfeHtmlEditer img {max-width:500px}\n    .KfeHtmlEditer video {max-width:500px}\n    </style>');
    if (isKfMobile == false) {
        $('head').append('<style>\n    .kfe-shop_box {\n      position: fixed;display: none; z-index: 1002;\n      -webkit-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); -moz-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);max-width: 1000px;\n      left:0 !important;right:0 !important;margin:auto;}\n    .kfe-shop_main { background-color: #fcfcfc; padding: 0 10px; font-size: 12px; line-height: 24px; height: 450px;max-height: 450px;}\n    .sticker-item {    display: inline-block;margin: 0 60px 26px 0;vertical-align: top;width: 128px;}\n    .sticker-item-name {    color: #737373;font-size: 12px;line-height: 1.2;max-height: 38.2px;text-align: center;word-break: break-word;-webkit-line-clamp: 2;-webkit-box-orient: vertical;display: -webkit-box;overflow: hidden;width: 120px}\n  </style>');
    } else if (isKfMobile == true) {
        $('head').append('<style>\n    #readPage .kfe-container, #writeMessagePage .kfe-container { margin-top: -10px; }\n    .kfe-shop_box {\n      position: fixed;display: none; z-index: 1002;\n      -webkit-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); -moz-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);max-width: 400px;\n      left:0 !important;right:0 !important;top:50px !important;margin:auto;}\n    .kfe-shop_main { background-color: #fcfcfc; padding: 0 10px; font-size: 12px; line-height: 24px; height: 520px;max-height: 600px;}\n    .sticker-item { display: inline-block;margin: 0 10px 22px 0;vertical-align: top;width: 72px;}\n    .sticker-item-name {    color: #737373;font-size: 12px;line-height: 1.2;max-height: 38.2px;text-align: center;word-break: break-word;-webkit-line-clamp: 2;-webkit-box-orient: vertical;display: -webkit-box;overflow: hidden;width: 72px}\n  </style>');
    }
};

/**
 * 初始化
 */
var init = function init() {
    var $textAreas = $("textarea");if (!$textAreas.length) return;appendCss();$textAreas.each(function () {
        createContainer(this);
    });
};
if (loadcustom == false) {
    localStorage.setItem('imgpvpc', JSON.stringify(["5px", "100px"]));
    alert('首次使用，部署默认设置。您可以在【自定义】->【个性设置】中完成个性化设置！');
    customize.lcimglists = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];localStorage.setItem('StickerConf', JSON.stringify(customize));
    localStorage.removeItem('onlineraws');localStorage.removeItem('Alertless');sessionStorage.removeItem('localSmile');sessionStorage.removeItem('OnlineSmile');
    alert('当前表情贴纸组为默认设置，您可以在【表情组设置->启用的本地表情组/表情组商店】中选择要启用的表情组！');
};
init();