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
    const maxTotalPage = 3;

    const Const = require('./Const').default;
    const Msg = require('./Msg');

    let $appendToTarget = $('.adp1:eq(1) > tbody > tr:first-child > td:nth-child(2)');
    $('<a class="pd_btn_link pd_highlight" data-name="findMyThread" href="#">[查找我的帖子]</a>').appendTo($appendToTarget).click(function (e) {
        e.preventDefault();
        let currentPage = 1, totalPage = 1;
        let threadList = [];

        /**
         * 获取我的帖子信息
         * @param {number} page 页数
         */
        const getThread = function (page) {
            $.ajax({
                type: 'GET',
                url: `search.php?authorid=${Info.uid}&page=${page}&t=${$.now()}`,
                timeout: Const.defAjaxTimeout,
            }).done(function (html) {
                let pageMatches = /">…(\d+)页<\/a>/.exec(html);
                if (pageMatches) {
                    totalPage = parseInt(pageMatches[1]);
                    totalPage = totalPage > maxTotalPage ? maxTotalPage : totalPage;
                }

                let threadMatches = html.match(/read\.php\?tid=\d+/g);
                if (threadMatches) {
                    threadList = threadList.concat(threadMatches);
                }
                $wait.find('.pd_countdown').text(currentPage);
                currentPage++;
            }).fail(function () {
                setTimeout(() => getThread(page), Const.defAjaxInterval);
            }).always(function () {
                if (currentPage > totalPage || $wait.data('stop')) {
                    Msg.remove($wait);
                    let num = 0;
                    $('.adp1:eq(1) a[href^="read.php?tid="]').each(function () {
                        let $this = $(this);
                        let urlMatches = /read\.php\?tid=\d+/.exec($this.attr('href'));
                        if (urlMatches && threadList.includes(urlMatches[0])) {
                            num++;
                            $this.css('background-color', '#ff0');
                        }
                    });
                    Msg.show(`<strong>共找到<em>${num}</em>个帖子</strong>`);
                }
                else {
                    setTimeout(() => getThread(currentPage), Const.defAjaxInterval);
                }
            });
        };

        let $wait = Msg.wait(
            `<strong>正在获取帖子信息&hellip;</strong><i>已获取：<em class="pd_countdown">0</em></i><a class="pd_stop_action" href="#">停止操作</a>`
        );
        getThread(currentPage);
    });
})();