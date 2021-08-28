// ==UserScript==
// @name        屏蔽首页神秘系数排名
// @version     1.2
// @trigger     end
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=12708083
// ==/UserScript==
'use strict';

(function () {
    var Info = _interopRequireDefault(require('./Info')).default;
    if (Info.isInHomePage) {
        var $smRank = $('a[href="kf_growup.php"]');
        var smLevel = parseInt($smRank.data('smLevel'));
        if (smLevel) $smRank.html('\u795E\u79D8<b>' + smLevel + '</b>\u7EA7');
    }
})();