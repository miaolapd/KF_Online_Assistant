// ==UserScript==
// @name        在待检查的评分记录页面上查找我的帖子
// @version     1.2
// @trigger     end
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=13688853
// @description 在待检查的评分记录页面上添加“查找我的帖子”按钮，点击此按钮会在页面上显示当前用户最近发表的帖子的数目并将其高亮
// ==/UserScript==
'use strict';

(function () {
    if (!/\/kf_fw_1wkfb\.php\?ping=2\b/.test(location.href)) return;
    // 我的主题的最大查找页数
    var maxTotalPage = 3;

    var Const = require('./Const').default;
    var Msg = require('./Msg');

    var $appendToTarget = $('.adp1:eq(1) > tbody > tr:first-child > td:nth-child(2)');
    $('<a class="pd_btn_link pd_highlight" data-name="findMyThread" href="#">[查找我的帖子]</a>').appendTo($appendToTarget).click(function (e) {
        e.preventDefault();
        var currentPage = 1,
            totalPage = 1;
        var threadList = [];

        /**
         * 获取我的帖子信息
         * @param {number} page 页数
         */
        var getThread = function getThread(page) {
            $.ajax({
                type: 'GET',
                url: 'search.php?authorid=' + Info.uid + '&page=' + page + '&t=' + $.now(),
                timeout: Const.defAjaxTimeout
            }).done(function (html) {
                var pageMatches = /">…(\d+)页<\/a>/.exec(html);
                if (pageMatches) {
                    totalPage = parseInt(pageMatches[1]);
                    totalPage = totalPage > maxTotalPage ? maxTotalPage : totalPage;
                }

                var threadMatches = html.match(/read\.php\?tid=\d+/g);
                if (threadMatches) {
                    threadList = threadList.concat(threadMatches);
                }
                $wait.find('.pd_countdown').text(currentPage);
                currentPage++;
            }).fail(function () {
                setTimeout(function () {
                    return getThread(page);
                }, Const.defAjaxInterval);
            }).always(function () {
                if (currentPage > totalPage || $wait.data('stop')) {
                    Msg.remove($wait);
                    var num = 0;
                    $('.adp1:eq(1) a[href^="read.php?tid="]').each(function () {
                        var $this = $(this);
                        var urlMatches = /read\.php\?tid=\d+/.exec($this.attr('href'));
                        if (urlMatches && threadList.includes(urlMatches[0])) {
                            num++;
                            $this.css('background-color', '#ff0');
                        }
                    });
                    Msg.show('<strong>\u5171\u627E\u5230<em>' + num + '</em>\u4E2A\u5E16\u5B50</strong>');
                } else {
                    setTimeout(function () {
                        return getThread(currentPage);
                    }, Const.defAjaxInterval);
                }
            });
        };

        var $wait = Msg.wait('<strong>\u6B63\u5728\u83B7\u53D6\u5E16\u5B50\u4FE1\u606F&hellip;</strong><i>\u5DF2\u83B7\u53D6\uFF1A<em class="pd_countdown">0</em></i><a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
        getThread(currentPage);
    });
})();