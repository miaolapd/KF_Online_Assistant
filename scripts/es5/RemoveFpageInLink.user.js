// ==UserScript==
// @name        去除帖子列表页面的帖子链接里的fpage参数
// @version     1.0
// @trigger     end
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=12884057
// ==/UserScript==
'use strict';

(function () {
    if (location.pathname !== '/thread.php') return;
    $('.threadtit1 > a[href*="fpage="]').each(function () {
        var $this = $(this);
        $this.attr('href', $this.attr('href').replace(/&fpage=\d+/i, ''));
    });
})();