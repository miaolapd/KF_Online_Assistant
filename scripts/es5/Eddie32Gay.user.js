// ==UserScript==
// @name        eddie32基佬化
// @version     1.5
// @trigger     start
// @author      喵拉布丁
// @homepage    read.php?tid=601954
// @description 将eddie32的发言内容中的指定关键词替换为其它词语
// ==/UserScript==
'use strict';

(function () {
    if (location.pathname !== '/read.php') return;
    var Util = require('./Util');

    // 替换目标用户列表
    var replaceUserList = ['eddie32', '徳井青空'];

    // 替换关键词列表，支持正则表达式，例：[/妹子/g, '基佬'], [/关键词A/g, '关键词B']
    var replaceList = [[/(妹|mei)(子|纸|zi|zhi)/ig, '基佬'], [/她/g, '他'], [/女(生|孩|人)/g, '男$1'], [/(哦|o|欧)派/ig, '大雕♂'], [/(妹|抱|亲|吻|脱|约|恋|摸|搂|抚|kiss|\bmei\b)/ig, '$1♂']];

    var replaceKeyword = function replaceKeyword($elem) {
        var html = $elem.html();
        var oriHtml = html;
        for (var i in replaceList) {
            html = html.replace(replaceList[i][0], replaceList[i][1]);
        }
        if (html !== oriHtml) $elem.html(html);
    };

    $('.readidmsbottom > a, .readidmleft > a').each(function () {
        var $this = $(this);
        if (!replaceUserList.includes($this.text())) return;
        replaceKeyword($this.closest('td'));
    });

    if (Util.getCurrentThreadPage() === 1 && replaceUserList.includes($('a[name="tpc"]').next('.readlou').next('div').next('.readtext').find('.readidmsbottom > a, .readidmleft > a').text())) {
        replaceKeyword($('.pages:first').closest('tbody').find('> tr:first-child > td > span'));
    }
})();