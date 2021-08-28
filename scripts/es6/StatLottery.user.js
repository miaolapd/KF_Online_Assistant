// ==UserScript==
// @name        统计各楼层的彩票数字（ft1073833专用版）
// @version     1.5
// @trigger     end
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=12522542
// @description 用于统计ft1073833争夺彩票中各楼层的数字，在标题包含指定关键字的帖子的顶楼下方会显示“彩票统计”的按钮，点击即可进行彩票统计
// ==/UserScript==
'use strict';
(function () {
    // 匹配彩票数字的正则表达式
    const numberRegex = /【\s*(\d+)\s*】/;
    // 各等奖中与中奖数字相差的范围
    const levelRangeList = [0, 5, 50];
    // 在标题包含指定关键字的帖子里显示彩票统计的按钮（留空表示任意标题均可）
    const threadTitle = '每周红包';

    const Util = _interopRequireWildcard(require('./Util'));
    const Msg = _interopRequireWildcard(require('./Msg'));
    const Dialog = _interopRequireWildcard(require('./Dialog'));
    const Const = _interopRequireDefault(require('./Const')).default;
    const Read = _interopRequireWildcard(require('./Read'));

    if (location.pathname !== '/read.php' || Util.getCurrentThreadPage() !== 1) return;
    if (threadTitle && !Read.getThreadTitle().includes(threadTitle)) return;
    $('<li><a href="#" title="统计各楼层的彩票数字">[彩票统计]</a></li>')
        .insertBefore('.readtext:first + .readlou > div > .pages > li:first-child')
        .click(function (e) {
            e.preventDefault();
            let tid = Util.getUrlParam('tid');
            if (!tid) return;
            let targetNumber = prompt('请输入本次的中奖数字', 0);
            if (targetNumber === null) return;
            targetNumber = parseInt(targetNumber);
            if (isNaN(targetNumber) || targetNumber < 0) {
                alert('中奖数字格式不正确');
                return;
            }

            let matches = /(\d+)页/.exec($('.pages:eq(0) > li:last-child > a').text());
            let maxPage = matches ? parseInt(matches[1]) : 1;
            let $wait = Msg.wait(
                `<strong>正在统计数字中&hellip;</strong><i>剩余：<em class="pd_countdown">${maxPage}</em></i>` +
                `<a class="pd_stop_action" href="#">停止操作</a>`
            );

            $(document).clearQueue('StatLottery');
            let isStop = false;
            let floorList = [];
            $.each(new Array(maxPage), function (index) {
                $(document).queue('StatLottery', function () {
                    $.ajax({
                        type: 'GET',
                        url: `read.php?tid=${tid}&page=${index + 1}&t=${new Date().getTime()}`,
                        timeout: Const.defAjaxTimeout,
                        success (html) {
                            let matches = html.match(/<a name=\d+><\/a>(.|\n|\r\n)+?<span style=".+?">\d+楼<\/span> <span style=".+?">(.|\n|\r\n)+?<\/td><\/tr><\/table>\r\n<\/div>/gi);
                            for (let i in matches) {
                                let floorMatches = /<a name=(\d+)><\/a>(?:.|\n|\r\n)+?<span style=".+?">(\d+)楼<\/span>(?:.|\n|\r\n)+?<a href="profile\.php\?action=show&uid=\d+".+?>(.+?)<\/a>((?:.|\n|\r\n)+)$/i.exec(matches[i]);
                                if (!floorMatches) continue;
                                let pid = parseInt(floorMatches[1]);
                                let floor = parseInt(floorMatches[2]);
                                let name = floorMatches[3];
                                let content = floorMatches[4].replace(/<fieldset><legend>Quote:(.|\n|\r\n)+?<\/fieldset>/gi, '');
                                let numberMatches = numberRegex.exec(content);
                                floorList[floor] = {
                                    pid,
                                    name,
                                    number: numberMatches ? parseInt(numberMatches[1]) : -1,
                                };
                            }
                        },
                        error () {
                            isStop = true;
                            alert('因连接超时，统计彩票数字操作中止');
                        },
                        complete () {
                            let $countdown = $('.pd_countdown:last');
                            $countdown.text(parseInt($countdown.text()) - 1);
                            isStop = isStop || $countdown.closest('.pd_msg').data('stop');
                            if (isStop) $(document).clearQueue('StatLottery');

                            if (isStop || index === maxPage - 1) {
                                Msg.remove($wait);
                                //console.log(floorList);
                                let numberList = {};
                                for (let i = 1; i < floorList.length; i++) {
                                    let {pid, floor, name, number} = floorList[i];
                                    if (pid && number >= 0) {
                                        if (typeof numberList[name] === 'undefined') {
                                            numberList[name] = {floor: i, pid, number};
                                        }
                                        else {
                                            floorList[i].number = -2;
                                        }
                                    }
                                }
                                //console.log(numberList);

                                let dialogHtml = `
<div class="pd_cfg_main">
  <div style="width: 400px; max-height: 550px; overflow: auto; background-color: #fff; margin: 5px 0; line-height: 20px;" id="pdStatLotteryList"></div>
</div>`;
                                let $dialog = Dialog.create('pd_stat_lottery', '彩票统计', dialogHtml);

                                let floorContent = '';
                                let normalNum = 0, errorNum = 0, repeatNum = 0;
                                for (let i = 1; i < floorList.length; i++) {
                                    let {pid, name, number} = floorList[i];
                                    if (pid) {
                                        floorContent += `
<li>
  【<a target="_blank" href="read.php?tid=${tid}&spid=${pid}">${i}楼</a>】${name}：${number > 0 ? `<span class="pd_highlight">${number}</span>` : `<span class="pd_notice">${number === -2 ? '重复回贴' : '格式不正确'}</span>`}
</li>`;
                                        if (number === -1) errorNum++;
                                        else if (number === -2) repeatNum++;
                                        else if (number >= 0) normalNum++;
                                    }
                                    else {
                                        floorContent += `<li>【${i}楼】<span class="pd_notice">未找到该楼层</span></li>`;
                                    }
                                }
                                floorContent = `
<ul style="margin-top: 10px;">
  <li><strong>楼层统计情况：</strong></li>
  <li>
    （正常统计：<b class="pd_highlight">${normalNum}</b>个；格式不正确：<b class="pd_highlight">${errorNum}</b>个；重复回贴：<b class="pd_highlight">${repeatNum}</b>个）
  </li>
  ${floorContent ? floorContent : '<li class="pd_notice">无</li>'}
</ul>`;

                                let levelContentList = new Array(levelRangeList.length);
                                for (let [name, {pid, floor, number}] of Util.entries(numberList)) {
                                    if (number >= 0) {
                                        for (let i = 0; i < levelContentList.length; i++) {
                                            if (number >= targetNumber - levelRangeList[i] && number <= targetNumber + levelRangeList[i]) {
                                                if (typeof levelContentList[i] === 'undefined') levelContentList[i] = '';
                                                levelContentList[i] += `
<li>
  【<a target="_blank" href="read.php?tid=${tid}&spid=${pid}">${floor}楼</a>】${name}：<span class="pd_highlight">${number}</span>
</li>`;
                                                break;
                                            }
                                        }
                                    }
                                }
                                let resultContent = `<div><strong>中奖情况 (中奖数字【<span class="pd_highlight">${targetNumber}</span>】)：</strong></div>`;
                                for (let [i, levelContent] of levelContentList.entries()) {
                                    resultContent += `<ul><li><b class="pd_highlight">${i + 1}等奖(±${levelRangeList[i]})：</b></li>`;
                                    if (levelContent) resultContent += levelContent;
                                    else resultContent += '<li class="pd_notice">空缺</li>';
                                    resultContent += '</ul>';
                                }

                                $dialog.find('#pdStatLotteryList').html(resultContent + floorContent);
                                Dialog.show('pd_stat_lottery');
                            }
                            else {
                                setTimeout(() => $(document).dequeue('StatLottery'), Const.defAjaxInterval);
                            }
                        }
                    });
                });
            });
            $(document).dequeue('StatLottery');
        });
}());