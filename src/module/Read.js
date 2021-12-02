/* 帖子模块 */
'use strict';
import Info from './Info';
import * as Util from './Util';
import * as Msg from './Msg';
import * as Dialog from './Dialog';
import Const from './Const';
import {read as readConfig, write as writeConfig} from './Config';
import * as Log from './Log';
import * as Script from './Script';
import * as Public from './Public';
import * as Post from './Post';

/**
 * 为帖子里的每个楼层添加跳转链接
 */
export const addFloorGotoLink = function () {
    let sf = Util.getThreadSfParam();
    $('.readtext').find('> table > tbody > tr > td:nth-child(2) > div > div:nth-child(2) > span:first-child').each(function () {
        let $this = $(this);
        let floorText = $this.text();
        if (!/^\d+楼/.test(floorText)) return;
        let linkName = $this.closest('.readtext').prev('.readlou').prev('a').attr('name');
        if (!linkName || !/^\d+$/.test(linkName)) return;
        let url = `${Util.getHostNameUrl()}read.php?tid=${Util.getUrlParam('tid')}&spid=${linkName}${sf ? '&sf=' + sf : ''}`;
        $this.html($this.html().replace(/(\d+)楼/, `<a class="pd_goto_link" href="${url}" title="复制楼层链接">$1楼</a>`));
        $this.find('a').click(function (e) {
            e.preventDefault();
            let $this = $(this);
            let url = $this.attr('href');
            $this.data('copy-text', url);
            if (!Util.copyText($this, '楼层链接已复制')) {
                prompt('本楼的跳转链接（请按Ctrl+C复制）：', url);
            }
        });
    });
};

/**
 * 添加快速跳转到指定楼层的输入框
 */
export const addFastGotoFloorInput = function () {
    $(`
<li class="pd_fast_goto_floor">
    <form>
        直达 <input class="pd_input" style="width: 30px;" type="text" maxlength="8">
        <span data-name="submit" style="cursor: pointer;">楼</span>
    </form>
</li>
`).appendTo($('#read_tui').parent('li').parent('.b_tit2'))
        .submit(function (e) {
            e.preventDefault();
            let floor = parseInt($(this).find('input').val());
            if (!floor || floor < 0) return;
            let sf = Util.getThreadSfParam();
            location.href = `read.php?tid=${Util.getUrlParam('tid')}&page=${parseInt(floor / Config.perPageFloorNum) + 1}&floor=${floor}&sf=${sf}`;
        })
        .find('[data-name="submit"]').click(function () {
        $(this).closest('form').submit();
    });
};

/**
 * 将页面滚动到指定楼层
 */
export const fastGotoFloor = function () {
    let floor = parseInt(Util.getUrlParam('floor'));
    if (!floor || floor < 0) return;
    let $floorNode = $(`.readtext > table > tbody > tr > td:nth-child(2) > div > div:nth-child(2) > span:first-child:contains("${floor}楼")`);
    if (!$floorNode.length) return;
    let linkName = $floorNode.closest('.readtext').prev('.readlou').prev('a').attr('name');
    if (!linkName || !/^\d+$/.test(linkName)) return;
    location.hash = '#' + linkName;
};

/**
 * 修改指定楼层的神秘颜色
 * @param {jQuery} $elem 指定楼层的发帖者的用户名链接的jQuery对象
 * @param {string} color 神秘颜色
 */
export const modifyFloorSmColor = function ($elem, color) {
    $elem.css('color', color).parent('.readidmsbottom').next('.readidmsbottom').find('> span:nth-child(2)').css('color', color)
        .parent('.readidmsbottom').next('.readidmsbottom').find('> span:nth-child(2)').css('color', color);
    $elem.closest('.readtext').css('box-shadow', `1px 1px 2px 2px ${color}`).find('> table > tbody > tr > td:nth-child(2) > div').css('box-shadow', `1px 1px 2px 2px ${color}`);
};

/**
 * 修改本人的神秘颜色
 */
export const modifyMySmColor = function () {
    let $my = $(`.readidmsbottom > a[href^="profile.php?action=show&uid=${Info.uid}"]`);
    if ($my.length > 0) {
        modifyFloorSmColor($my, Config.customMySmColor);
    }
};

/**
 * 调整帖子内容字体大小
 */
export const adjustThreadContentFontSize = function () {
    if (Config.threadContentFontSize > 0 && Config.threadContentFontSize !== 12) {
        $('head').append(`
<style>
  .readtext > table > tbody > tr > td:nth-child(2) { font-size: ${Config.threadContentFontSize}px; line-height: 1.6em; width: 100%; }
  .readtext > table > tbody > tr > td:nth-child(2) > div > div:first-child,
  .readtext > table > tbody > tr > td:nth-child(2) > div > div:nth-child(2),
  .readtext .read_fds {
    font-size: 14px;
    line-height: 22px;
  }
</style>
`);
    }
};

/**
 * 添加复制购买人名单和查看购买帖子记录的选项
 */
export const addCopyBuyersListOption = function () {
    $('.readtext select[name="buyers"]').each(function () {
        $(this).find('option:first-child').after('<option value="copyList">复制名单</option><option value="openBuyThreadLogDialog">查看购买记录</option>');
    });
    $(document).on('change', 'select[name="buyers"]', function () {
        let $this = $(this);
        let name = $this.val();
        if (name === 'copyList') {
            let buyerList = $this.find('option').map(function (index) {
                let name = $(this).text();
                if (index <= 2 || name.includes('-'.repeat(11))) return null;
                else return name;
            }).get().join('\n');
            $this.get(0).selectedIndex = 0;
            if (!buyerList) {
                alert('暂时无人购买');
                return;
            }

            const dialogName = 'pdCopyBuyerListDialog';
            if ($('#' + dialogName).length > 0) return;
            let html = `
<div class="pd_cfg_main">
  <textarea name="buyerList" style="width: 200px; height: 300px; margin: 5px 0;" readonly>${buyerList}</textarea>
</div>`;
            let $dialog = Dialog.create(dialogName, '购买人名单', html);
            Dialog.show(dialogName);
            $dialog.find('[name="buyerList"]').select().focus();
        } else if (name === 'openBuyThreadLogDialog') {
            $this.get(0).selectedIndex = 0;
            showBuyThreadLogDialog();
        }
    });
};

/**
 * 添加统计和购买帖子的按钮
 */
export const addStatAndBuyThreadBtn = function () {
    $('<span style="margin: 0 5px;">|</span><a data-name="statAndBuyThread" title="统计回帖者名单以及批量购买帖子" href="#">统计和购买</a>')
        .insertAfter('td > a[href^="kf_tidfavor.php?action=favor&tid="]')
        .filter('[data-name="statAndBuyThread"]')
        .click(function (e) {
            e.preventDefault();
            if ($('#pdStatFloorDialog').length > 0) return;

            let tid = parseInt(Util.getUrlParam('tid'));
            if (!tid) return;
            let value = $.trim(prompt('统计到第几楼？（0表示统计所有楼层，可用m-n的方式来设定统计楼层的区间范围）', 0));
            if (value === '') return;
            if (!/^\d+(-\d+)?$/.test(value)) {
                alert('统计楼层格式不正确');
                return;
            }
            let sf = Util.getThreadSfParam();
            let startFloor = 0, endFloor = 0;
            let valueArr = value.split('-');
            if (valueArr.length === 2) {
                startFloor = parseInt(valueArr[0]);
                endFloor = parseInt(valueArr[1]);
            } else endFloor = parseInt(valueArr[0]);
            if (endFloor < startFloor) {
                alert('统计楼层格式不正确');
                return;
            }
            let matches = /(\d+)页/.exec($('.pages:eq(0) > li:last-child > a').text());
            let maxPage = matches ? parseInt(matches[1]) : 1;
            if (startFloor === 0) startFloor = 1;
            if (endFloor === 0) endFloor = maxPage * Config.perPageFloorNum - 1;
            let startPage = Math.floor(startFloor / Config.perPageFloorNum) + 1;
            let endPage = Math.floor(endFloor / Config.perPageFloorNum) + 1;
            if (endPage > maxPage) endPage = maxPage;
            if (endPage - startPage > Const.statFloorMaxPage) {
                alert('需访问的总页数不可超过' + Const.statFloorMaxPage);
                return;
            }

            Msg.destroy();
            Msg.wait(
                `<strong>正在统计楼层中&hellip;</strong><i>剩余页数：<em class="pd_countdown">${endPage - startPage + 1}</em></i>` +
                `<a class="pd_stop_action" href="#">停止操作</a>`
            );
            statFloor(tid, startPage, endPage, startFloor, endFloor, sf);
        });
};

/**
 * 统计楼层
 * @param {number} tid 帖子ID
 * @param {number} startPage 开始页数
 * @param {number} endPage 结束页数
 * @param {number} startFloor 开始楼层号
 * @param {number} endFloor 结束楼层号
 * @param {string} sf 防采集代码
 */
export const statFloor = function (tid, startPage, endPage, startFloor, endFloor, sf) {
    let isStop = false;
    let floorList = [];

    /**
     * 统计
     * @param {number} page 第几页
     */
    const stat = function (page) {
        $.ajax({
            type: 'GET',
            url: `read.php?tid=${tid}&page=${page}&sf=${sf}&t=${$.now()}`,
            timeout: Const.defAjaxTimeout,
            success(html) {
                $('.readtext', html.replace(/src="[^"]+"/g, '')).each(function () {
                    let data = {};
                    let $floor = $(this);
                    let $floorHeader = $floor.prev('.readlou');
                    let floor = parseInt($floorHeader.find('> div:nth-child(2) > span:first-child').text());
                    if (!floor) return;
                    if (floor < startFloor) return;
                    if (floor > endFloor) {
                        isStop = true;
                        return false;
                    }
                    data.pid = parseInt($floorHeader.prev('.readlou').prev('a').attr('name'));

                    let $user = $floorHeader.prev('.readlou').find('.readidms, .readidm');
                    let $userLink = $user.find('a[href^="profile.php?action=show&uid="]');
                    data.userName = $userLink.text();

                    data.uid = '';
                    data.sf = '';
                    let userMatches = /profile\.php\?action=show&uid=(\d+)(?:&sf=(\w+))/.exec($userLink.attr('href'));
                    if (userMatches) {
                        data.uid = parseInt(userMatches[1]);
                        data.sf = userMatches[2];
                    }

                    data.smLevel = '';
                    let matches = /(\S+) 级神秘/.exec($user.find('.readidmsbottom, .readidmbottom').text());
                    if (matches) data.smLevel = matches[1];

                    let $buyer = $floor.find('[name="buyers"]:first');
                    data.status = 0;
                    if ($buyer.length > 0) {
                        let $input = $buyer.next('input');
                        data.status = $input.length > 0 ? 1 : 2;
                        if (data.status === 1) {
                            let matches = /此帖售价\s*(\d+)\s*KFB/.exec($buyer.parent('legend').text());
                            if (matches) data.sell = parseInt(matches[1]);
                            matches = /location\.href="(.+)"/i.exec($input.attr('onclick'));
                            if (matches) data.buyUrl = matches[1];
                        }
                    }
                    floorList[floor] = data;
                });

                let $countdown = $('.pd_countdown:last');
                $countdown.text(parseInt($countdown.text()) - 1);
                isStop = isStop || $countdown.closest('.pd_msg').data('stop');
            },
            error() {
                setTimeout(() => stat(page), Const.defAjaxInterval);
            },
            complete() {
                if (isStop || page >= endPage) {
                    Msg.destroy();
                    showStatFloorDialog(floorList);
                } else {
                    setTimeout(() => stat(page + 1), Const.defAjaxInterval);
                }
            }
        });
    };

    stat(startPage);
};

/**
 * 显示统计楼层对话框
 * @param {{}[]} floorList 楼层信息列表
 */
export const showStatFloorDialog = function (floorList) {
    const dialogName = 'pdStatFloorDialog';
    let html = `
<div class="pd_cfg_main">
  <div id="pdStatFloorFilter" style="margin-top: 5px;">
    <label><input name="removeRepeatedEnabled" type="checkbox"> 去除重复</label>
    <label><input name="removeTopFloorEnabled" type="checkbox"> 去除楼主</label>
  </div>
  <div id="pdStatFloorSelectBtns">
    <label style="margin-left: 3px;">售价区间：</label>
    <input name="startSell" type="number" value="1" min="1" max="100" style="width: 40px;"> -
    <input name="endSell" type="number" value="100" min="1" max="100" style="width: 40px;">
    <label style="margin-left: 3px;">
      每名用户限选 <input name="limitNum" type="number" min="0" style="width: 32px;"> 个
    </label>
    <a class="pd_btn_link" data-name="selectFilter" href="#">筛选</a><br>
    <a class="pd_btn_link" data-name="selectAll" href="#">全选</a>
    <a class="pd_btn_link" data-name="selectInverse" href="#">反选</a>
  </div>
  <div class="pd_highlight" style="text-align: center;">
    共显示<b id="pdStatFloorShowCount">0</b>条项目，共选择<b id="pdStatFloorSelectCount">0</b>条项目
  </div>
  <table style="line-height: 1.8em; text-align: center;">
    <thead>
      <tr>
        <th style="width: 30px;"></th>
        <th style="width: 65px;">楼层号</th>
        <th style="width: 120px;">用户名</th>
        <th style="width: 80px;">神秘等级</th>
        <th style="width: 100px;">
          售价(KFB) <span class="pd_cfg_tips" title="注：售价信息在统计后可能会发生变化，如有必要，建议尽快购买帖子">[?]</span>
        </th>
      </tr>
    </thead>
    <tbody id="pdStatFloorList"></tbody>
  </table>
  <textarea name="statFloorListContent" style="margin-top: 8px; width: 250px; height: 300px;" hidden></textarea>
</div>

<div class="pd_cfg_btns">
  <button name="copyList" type="button" style="color: #00f;" title="复制所有或所选楼层的用户名单">复制名单</button>
  <button name="buyThread" type="button" style="color: #f00;" title="批量购买所选楼层的帖子">购买帖子</button>
  <button data-action="close" type="button">关闭</button>
</div>`;
    let $dialog = Dialog.create(dialogName, '统计楼层', html);
    let $statFloorFilter = $dialog.find('#pdStatFloorFilter');
    let $statFloorList = $dialog.find('#pdStatFloorList');
    let $statFloorListContent = $dialog.find('[name="statFloorListContent"]');
    let tid = Util.getUrlParam('tid');
    let sf = Util.getThreadSfParam();

    /**
     * 显示统计楼层列表
     */
    const showStatFloorList = function () {
        let list = [...floorList];
        let isRemoveRepeated = $statFloorFilter.find('[name="removeRepeatedEnabled"]').prop('checked'),
            isRemoveTopFloor = $statFloorFilter.find('[name="removeTopFloorEnabled"]').prop('checked');
        if (isRemoveRepeated) {
            list = list.map((data, index, list) => {
                if (!data) return null;
                else return list.findIndex(data2 => data2 && data2.userName === data.userName) === index ? data : null;
            });
        }
        if (isRemoveTopFloor) {
            let $topFloor = $('.readtext:first');
            if ($topFloor.prev('.readlou').prev('a').attr('name') === 'tpc') {
                let topFloorUserName = $topFloor.find('.readidmsbottom, .readidmbottom').find('a[href^="profile.php?action=show&uid="]').text();
                list = list.map(data => data && data.userName !== topFloorUserName ? data : null);
            }
        }
        let content = '', copyContent = '';
        let num = 0;
        for (let [floor, data] of list.entries()) {
            if (!data) continue;
            content += `
<tr>
  <td>
    <label>
      <input data-status="${data.status}" data-sell="${data.sell ? data.sell : 0}" data-url="${data.buyUrl ? data.buyUrl : ''}"
        type="checkbox" value="${data.userName}">
    </label>
  </td>
  <td><a href="read.php?tid=${tid}&spid=${data.pid}${sf ? '&sf=' + sf : ''}" target="_blank">${floor}楼</a></td>
  <td><a href="profile.php?action=show&uid=${data.uid}&sf=${data.sf}" target="_blank" style="color: #000;">${data.userName}</a></td>
  <td style="${data.smLevel.endsWith('W') || data.smLevel === 'MAX' ? 'color: #f39;' : ''}">${data.smLevel}</td>
  <td class="pd_stat">${data.status === 1 ? `<em>${data.sell}</em>` : `<span class="pd_notice">${!data.status ? '无' : '已买'}</span>`}</td>
</tr>`;
            copyContent += data.userName + '\n';
            num++;
        }
        $statFloorList.html(content);
        $statFloorListContent.val(copyContent).data('copy-text', copyContent);
        $dialog.find('#pdStatFloorShowCount').text(num);
        $dialog.find('#pdStatFloorSelectCount').text(0);
    };

    $dialog.find('#pdStatFloorSelectBtns').on('click', '[data-name]', function (e) {
        e.preventDefault();
        let name = $(this).data('name');
        if (name === 'selectAll') Util.selectAll($statFloorList.find('[type="checkbox"]'));
        else if (name === 'selectInverse') Util.selectInverse($statFloorList.find('[type="checkbox"]'));
        else if (name === 'selectFilter') {
            let startSell = parseInt($dialog.find('[name="startSell"]').val());
            let endSell = parseInt($dialog.find('[name="endSell"]').val());
            let limitNum = parseInt($dialog.find('[name="limitNum"]').val());
            if (!limitNum || limitNum < 0) limitNum = 0;
            if (!startSell || startSell < 1 || !endSell || endSell < 1) return;
            let userStat = {};
            $statFloorList.find('[type="checkbox"]').each(function () {
                let $this = $(this);
                let status = parseInt($this.data('status'));
                if (!status) return;
                let sell = parseInt($this.data('sell'));
                let userName = $this.val();
                if (!(userName in userStat)) userStat[userName] = 0;
                userStat[userName]++;
                let isChecked = status === 1 && sell >= startSell && sell <= endSell;
                if (isChecked && limitNum > 0) {
                    if (userStat[userName] > limitNum) isChecked = false;
                }
                $this.prop('checked', isChecked);
            });
        }
        $dialog.find('#pdStatFloorSelectCount').text($statFloorList.find('[type="checkbox"]:checked').length);
    }).end().find('[name="copyList"]').click(function () {
        let $this = $(this);
        if ($this.text() === '取消复制') {
            $this.text('复制名单');
            $statFloorListContent.prop('hidden', true);
            $statFloorList.closest('table').prop('hidden', false);
            Dialog.resize(dialogName);
            return;
        }
        let type = 'all';
        let checked = $statFloorList.find('[type="checkbox"]:checked');
        if (checked.length > 0) {
            type = 'select';
            let copyContent = '';
            checked.each(function () {
                copyContent += $(this).val() + '\n';
            });
            $statFloorListContent.val(copyContent).data('copy-text', copyContent);
        }
        if (!Util.copyText($statFloorListContent, (type === 'all' ? '所有' : '所选') + '用户名单已复制')) {
            $this.text('取消复制');
            $statFloorList.closest('table').prop('hidden', true);
            $statFloorListContent.prop('hidden', false).select().focus();
            Dialog.resize(dialogName);
        }
    }).end().find('[name="buyThread"]').click(function () {
        let threadList = [];
        let totalSell = 0;
        if (!$statFloorList.find('[type="checkbox"]:checked').length) $dialog.find('[data-name="selectAll"]').click();
        $statFloorList.find('[type="checkbox"]:checked').each(function () {
            let $this = $(this);
            let url = $this.data('url');
            let sell = parseInt($this.data('sell'));
            if (url && sell > 0) {
                threadList.push({url, sell});
                totalSell += sell;
            }
        });
        if (!threadList.length) return;
        if (!confirm(
            `你共选择了 ${threadList.length} 个可购买项，总售价 ${totalSell.toLocaleString()} KFB，` +
            `均价 ${Util.getFixedNumLocStr(totalSell / threadList.length, 2)} KFB，是否批量购买？`
        )
        ) return;
        Msg.destroy();
        Msg.wait(
            `<strong>正在购买帖子中&hellip;</strong><i>剩余：<em class="pd_countdown">${threadList.length}</em></i>` +
            `<a class="pd_stop_action" href="#">停止操作</a>`
        );
        buyThreads(threadList);
    });

    if (Util.getCurrentThreadPage() !== 1)
        $statFloorFilter.find('[name="removeTopFloorEnabled"]').prop('disabled', true).parent('label').attr('title', '请在第1页进行统计');
    $statFloorFilter.on('click', '[type="checkbox"]', showStatFloorList);
    showStatFloorList();
    Dialog.show(dialogName);
    Script.runFunc('Read.showStatFloorDialog_after_');
};

/**
 * 购买帖子
 * @param {{}[]} threadList 购买帖子列表，{url}：购买帖子的URL；{sell}：购买帖子的售价
 */
export const buyThreads = function (threadList) {
    let successNum = 0, failNum = 0, totalSell = 0;
    $(document).clearQueue('BuyThread');
    $.each(threadList, function (index, {url, sell}) {
        $(document).queue('BuyThread', function () {
            $.ajax({
                type: 'GET',
                url: url + '&t=' + $.now(),
                timeout: Const.defAjaxTimeout,
                success(html) {
                    Public.showFormatLog('购买帖子', html);
                    let {msg} = Util.getResponseMsg(html);
                    if (/操作完成/.test(msg)) {
                        successNum++;
                        totalSell += sell;
                    } else failNum++;
                },
                error() {
                    failNum++;
                },
                complete() {
                    let $countdown = $('.pd_countdown:last');
                    $countdown.text(parseInt($countdown.text()) - 1);
                    let isStop = $countdown.closest('.pd_msg').data('stop');
                    if (isStop) $(document).clearQueue('BuyThread');

                    if (isStop || index === threadList.length - 1) {
                        Msg.destroy();
                        if (successNum > 0) {
                            Log.push('购买帖子', `共有\`${successNum}\`个帖子购买成功`, {pay: {'KFB': -totalSell}});
                        }
                        console.log(`共有${successNum}个帖子购买成功，共有${failNum}个帖子购买失败，KFB-${totalSell}`);
                        Msg.show(
                            `<strong>共有<em>${successNum}</em>个帖子购买成功${failNum > 0 ? `，共有<em>${failNum}</em>个帖子购买失败` : ''}</strong>` +
                            `<i>KFB<ins>-${totalSell}</ins></i>`
                            , -1
                        );
                        Script.runFunc('Read.buyThreads_after_', threadList);
                    } else {
                        setTimeout(() => $(document).dequeue('BuyThread'), Const.defAjaxInterval);
                    }
                }
            });
        });
    });
    $(document).dequeue('BuyThread');
};

/**
 * 处理购买帖子按钮
 */
export const handleBuyThreadBtn = function () {
    $('.readtext input[type="button"][value="愿意购买,支付KFB"]').each(function () {
        let $this = $(this);
        let matches = /此帖售价\s*(\d+)\s*KFB/.exec($this.closest('legend').contents().eq(0).text());
        if (!matches) return;
        let sell = parseInt(matches[1]);
        matches = /location\.href="(.+?)"/i.exec($this.attr('onclick'));
        if (!matches) return;
        $this.data('sell', sell).data('url', matches[1]).removeAttr('onclick').click(function (e) {
            e.preventDefault();
            let $this = $(this);
            let sell = $this.data('sell');
            let url = $this.data('url');
            if (!sell || !url) return;
            if (sell >= Const.minBuyThreadWarningSell && !confirm(`此贴售价 ${sell} KFB，是否购买？`)) return;
            if (Config.buyThreadNoJumpEnabled) {
                let $wait = Msg.wait('<strong>正在购买帖子&hellip;</strong>');
                $.get(url + '&t=' + $.now(), function (html) {
                    Public.showFormatLog('购买帖子', html);
                    let {msg} = Util.getResponseMsg(html);
                    Msg.remove($wait);
                    if (/操作完成/.test(msg)) {
                        if (Config.saveBuyThreadLogEnabled) {
                            let urlMatches = /tid=(\d+)&pid=(\d+|tpc)/.exec(url);
                            if (!urlMatches) return;
                            let fid = parseInt($('input[name="fid"]:first').val());
                            let tid = parseInt(urlMatches[1]);
                            let pid = urlMatches[2];
                            let forumName = $('a[href^="kf_tidfavor.php?action=favor"]').parent().find('a[href^="thread.php?fid="]:last').text().trim();
                            let threadTitle = getThreadTitle();
                            let userName = $this.closest('.readtext').find('.readidmsbottom, .readidmbottom').find('a[href^="profile.php?action=show"]').text().trim();
                            recordBuyThreadLog({fid, tid, pid, forumName, threadTitle, userName, sell});
                        }
                        location.reload();
                    } else if (/您已经购买此帖/.test(msg)) {
                        alert('你已经购买过此帖');
                        location.reload();
                    } else {
                        alert('帖子购买失败');
                    }
                });
            } else location.href = url;
        });
    });
};

/**
 * 获取多重引用数据
 * @returns {Object[]} 多重引用数据列表
 */
export const getMultiQuoteData = function () {
    let quoteList = [];
    $('.pd_multi_quote_chk input:checked').each(function () {
        let $floor = $(this).closest('.readtext');
        let matches = /(\d+)楼/.exec($floor.find('.pd_goto_link').text());
        let floor = matches ? parseInt(matches[1]) : 0;
        let pid = $floor.prev('.readlou').prev('a').attr('name');
        let userName = Util.getFloorUserName($floor.find('.readidmsbottom > a[href^="profile.php?action=show&uid="]').text());
        if (!userName) return;
        quoteList.push({floor: floor, pid: pid, userName: userName});
    });
    return quoteList;
};

/**
 * 添加多重回复和多重引用的按钮
 */
export const addMultiQuoteButton = function () {
    let replyUrl = $('a[href^="post.php?action=reply"].b_tit2').attr('href');
    if (!replyUrl) return;
    $('<label title="多重引用" class="pd_multi_quote_chk"><input type="checkbox"> 引</label>')
        .appendTo('.readtext > table > tbody > tr > td:nth-child(2) > div > div:nth-child(2)')
        .find('input')
        .click(function () {
            let tid = parseInt(Util.getUrlParam('tid'));
            let data = localStorage[Const.multiQuoteStorageName];
            if (data) {
                try {
                    data = JSON.parse(data);
                    if (!data || $.type(data) !== 'object' || $.isEmptyObject(data)) data = null;
                    else if (typeof data.tid === 'undefined' || data.tid !== tid || !Array.isArray(data.quoteList)) data = null;
                } catch (ex) {
                    data = null;
                }
            } else {
                data = null;
            }
            let quoteList = getMultiQuoteData();
            if (!data) {
                localStorage.removeItem(Const.multiQuoteStorageName);
                data = {tid: tid, quoteList: []};
            }
            let page = Util.getCurrentThreadPage();
            if (quoteList.length > 0) data.quoteList[page] = quoteList;
            else delete data.quoteList[page];
            localStorage[Const.multiQuoteStorageName] = JSON.stringify(data);
        });
    $('.readtext:last').next('.c').next('div')
        .find('> table > tbody > tr > td:last-child')
        .css({'text-align': 'right', 'width': '320px'})
        .append(`<span class="b_tit2" style="margin-left: 5px;"><a style="display: inline-block;" href="#" title="多重回复">回复</a> ` +
            `<a style="display: inline-block;" href="${replyUrl}&multiquote=1" title="多重引用">引用</a></span>`)
        .find('.b_tit2 > a:eq(0)')
        .click(function (e) {
            e.preventDefault();
            Post.handleMultiQuote(1);
        });
};

/**
 * 将帖子和短消息中的绯月其它域名的链接修改为当前域名
 */
export const modifyKFOtherDomainLink = function () {
    $('.readtext a, .thread2 a').each(function () {
        let $this = $(this);
        let url = $this.attr('href');
        if (/m\.miaola\.(info|work)\//i.test(url)) return;
        let matches = /^(https?:\/\/(?:[\w\.]+?\.)?(?:2dgal|ddgal|9gal|9baka|9moe|kfgal|2dkf|ikfol|kfacg|fygal|bakabbs|365gal|365galgame|kforz|kfmax|9shenmi|miaola|koyuki)\.\w+?\/)\w+\.php/i.exec(url);
        if (matches) $this.attr('href', url.replace(matches[1], Util.getHostNameUrl()));
    });
};

/**
 * 添加用户自定义备注
 */
export const addUserMemo = function () {
    if ($.isEmptyObject(Config.userMemoList)) return;
    $('.readidmsbottom > a[href^="profile.php?action=show&uid="]').each(function () {
        let $this = $(this);
        let userName = Util.getFloorUserName($this.text().trim());
        let key = Object.keys(Config.userMemoList).find(name => name === userName);
        if (!key) return;

        let memo = Config.userMemoList[key];
        $this.after(`<span class="pd_custom_tips pd_user_memo" title="备注：${memo}">[?]</span>`);
    });
};

/**
 * 添加复制代码的链接
 */
export const addCopyCodeLink = function () {
    $('.readtext fieldset > legend:contains("Copy code")').html('<a class="pd_copy_code" href="#">复制代码</a>')
        .parent('fieldset').addClass('pd_code_area');
    if (!$('.pd_copy_code').length) return;
    $('#alldiv').on('click', 'a.pd_copy_code', function (e) {
        e.preventDefault();
        let $this = $(this);
        let $fieldset = $this.closest('fieldset');
        if (Util.copyText($fieldset, '代码已复制', $this.parent())) return;

        let content = $fieldset.data('content');
        if (content) {
            $fieldset.html('<legend><a class="pd_copy_code" href="#">复制代码</a></legend>' + content).removeData('content');
        } else {
            let html = $fieldset.html();
            html = html.replace(/<legend>.+?<\/legend>/i, '');
            $fieldset.data('content', html);
            html = Util.htmlDecode(html);
            let height = $fieldset.height();
            height -= 17;
            if (height < 50) height = 50;
            if (height > 540) height = 540;
            $fieldset.html(`
<legend><a class="pd_copy_code" href="#">还原代码</a></legend>
<textarea wrap="off" class="pd_textarea" style="width: 100%; height: ${height}px; line-height: 1.4em; white-space: pre;">${html}</textarea>
`);
            $fieldset.find('textarea').select().focus();
        }
    });
};

/**
 * 在帖子页面添加更多表情的链接
 */
export const addMoreSmileLink = function () {
    /**
     * 添加表情代码
     * @param {string} id 表情ID
     */
    const addSmileCode = function (id) {
        let textArea = $('textarea[name="atc_content"]').get(0);
        if (!textArea) return;
        let code = `[s:${id}]`;
        Util.addCode(textArea, code);
        if (Info.isMobile) textArea.blur();
        else textArea.focus();
    };

    let $area = $('form[action="post.php?"] > div:first > table > tbody > tr:nth-child(2) > td:first-child');
    $area.on('click', 'a[href="javascript:;"]', function (e) {
        e.preventDefault();
        let id = $(this).data('id');
        if (id) addSmileCode(id);
    }).find('a[onclick^="javascript:addsmile"]').each(function () {
        let $this = $(this);
        let matches = /addsmile\((\d+)\)/i.exec($this.attr('onclick'));
        if (matches) {
            $this.data('id', matches[1]).removeAttr('onclick').attr('href', 'javascript:;');
        }
    });

    $('<a class="pd_highlight" href="#">[更多]</a>')
        .appendTo($area)
        .click(function (e) {
            e.preventDefault();
            let $this = $(this);
            let $panel = $('#pdSmilePanel');
            if ($panel.length > 0) {
                $this.text('[更多]');
                $panel.remove();
                return;
            }
            $this.text('[关闭]');

            let smileImageIdList = ['48', '35', '34', '33', '32', '31', '30', '29', '28', '27', '26', '36', '37', '47', '46', '45', '44',
                '43', '42', '41', '40', '39', '38', '25', '24', '11', '10', '09', '08', '01', '02', '03', '04', '05', '06', '12', '13', '23',
                '22', '21', '20', '19', '18', '17', '16', '15', '14', '07'];
            let smileCodeIdList = [57, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 45, 46, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 34, 33, 20,
                19, 18, 17, 10, 11, 12, 13, 14, 15, 21, 22, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 16];
            let html = '';
            for (let i = 0; i < smileImageIdList.length; i++) {
                html += `<img src="${Info.w.imgpath}/post/smile/em/em${smileImageIdList[i]}.gif" alt="[表情]" data-id="${smileCodeIdList[i]}">`;
            }
            html = `<div class="pd_panel" id="pdSmilePanel" style="width: 308px; height: 185px;">${html}</div>`;

            let offset = $area.offset();
            $panel = $(html).appendTo('body');
            $panel.css('top', offset.top - $panel.height() + 10)
                .css('left', offset.left + $area.width() - $panel.width() - 10)
                .on('click', 'img', function () {
                    let id = $(this).data('id');
                    if (id) addSmileCode(id);
                });
            Script.runFunc('Read.addMoreSmileLink_after_click_');
        });
};

/**
 * 在帖子页面解析多媒体标签
 */
export const parseMediaTag = function () {
    $('.readtext > table > tbody > tr > td:nth-child(2)').each(function () {
        let $this = $(this);
        let html = $this.html();
        if (/\[(audio|video)\](http|ftp)[^<>]+\[\/(audio|video)\]/.test(html)) {
            $this.html(
                html.replace(
                    /\[audio\]((?:http|ftp)[^<>]+?)\[\/audio\](?!<\/fieldset>)/g,
                    '<audio src="$1" controls preload="none" style="margin: 3px 0;">[你的浏览器不支持audio标签]</audio>'
                ).replace(
                    /\[video\]((?:http|ftp)[^<>]+?)\[\/video\](?!<\/fieldset>)/g,
                    `<video src="$1" controls preload="none" style="max-width: ${Config.adjustThreadContentWidthEnabled ? 627 : 820}px; margin:3px 0;">` +
                    `[你的浏览器不支持video标签]</video>`
                )
            );
        }
    });
};

/**
 * 显示在购买框之外的附件图片
 */
export const showAttachImageOutsideSellBox = function () {
    if (Util.getCurrentThreadPage() !== 1) return;
    let $area = $('.readtext:first > table > tbody > tr > td:nth-child(2)');
    if (!$area.find('select[name="buyers"]').length) return;
    let html = $area.html();
    if (/\[attachment=\d+\]/.test(html)) {
        let pid = $area.closest('.readtext').prev('.readlou').prev('.readlou').prev('a').attr('name');
        let tid = Util.getUrlParam('tid');
        $area.html(
            html.replace(
                /\[attachment=(\d+)\]/g,
                `<img src="job.php?action=download&pid=${pid}&tid=${tid}&aid=$1" alt="[附件图片]" style="max-width: 550px;" ` +
                `onclick="if(this.width>=550) window.open('job.php?action=download&pid=${pid}&tid=${tid}&aid=$1');">`
            )
        );
    }
};

/**
 * 获取帖子标题
 * @returns {string} 帖子标题
 */
export const getThreadTitle = function () {
    return $('form[name="delatc"] > div:first > table > tbody > tr > td > span:first').text().trim();
};

// 保存购买帖子记录的键值名称
const buyThreadLogName = Const.storagePrefix + 'buyThreadLog';

/**
 * 读取购买帖子记录
 * @returns {{}[]} 购买帖子记录
 */
export const readBuyThreadLog = function () {
    let log = [];
    let options = Util.readData(buyThreadLogName + '_' + Info.uid);
    if (!options) return log;
    try {
        options = JSON.parse(options);
    } catch (ex) {
        return log;
    }
    if (!options || !Array.isArray(options)) return log;
    log = options;
    return log;
};

/**
 * 写入购买帖子记录
 * @param {{}[]} log 购买帖子记录
 */
export const writeBuyThreadLog = log => Util.writeData(buyThreadLogName + '_' + Info.uid, JSON.stringify(log));

/**
 * 清除购买帖子记录
 */
export const clearBuyThreadLog = () => Util.deleteData(buyThreadLogName + '_' + Info.uid);

/**
 * 记录一条新的购买帖子记录
 * @param {number} fid 版块ID
 * @param {number} tid 帖子ID
 * @param {string} pid 楼层ID
 * @param {string} forumName 版块名称
 * @param {string} threadTitle 贴子标题
 * @param {string} userName 购买贴的所有者
 * @param {number} sell 售价
 */
export const recordBuyThreadLog = function ({fid, tid, pid, forumName, threadTitle, userName, sell}) {
    let log = readBuyThreadLog();
    log.push($.extend({time: $.now()}, {fid, tid, pid, forumName, threadTitle, userName, sell}));
    log = log.sort((a, b) => a.time - b.time).slice(-Config.saveBuyThreadLogMaxNum);
    writeBuyThreadLog(log);
};

/**
 * 显示购买帖子记录对话框
 */
export const showBuyThreadLogDialog = function () {
    const dialogName = 'pdBuyThreadLogDialog';
    if ($('#' + dialogName).length > 0) return;

    let log = readBuyThreadLog();
    let html = `
<div class="pd_cfg_main">
  <div style="margin-top: 5px;">
    <label>
      保存最近的 <input name="saveBuyThreadLogMaxNum" type="number" value="${Config.saveBuyThreadLogMaxNum}" min="1" max="10000" style="width: 60px;"> 条记录
    </label>
    <a class="pd_btn_link" data-name="save" href="#">保存</a>
  </div>
  <fieldset>
    <legend>购买帖子记录 <span class="pd_stat" data-name="logHeaderInfo"></span></legend>
    <div class="pd_stat pd_log_content" id="pdBuyThreadLog" style="width: 900px; max-height: 450px; height: auto;"></div>
  </fieldset>
</div>
<div class="pd_cfg_btns">
  <span class="pd_cfg_about"><a data-name="openImOrExBuyThreadLogDialog" href="#">导入/导出购买帖子记录</a></span>
  <button data-action="close" type="button">关闭</button>
  <button name="clear" type="button">清除记录</button>
</div>`;
    let $dialog = Dialog.create(dialogName, '购买帖子记录', html);
    let $buyThreadLog = $dialog.find('#pdBuyThreadLog');

    $dialog.find('[data-name="save"]').click(function (e) {
        e.preventDefault();
        let num = parseInt($dialog.find('[name="saveBuyThreadLogMaxNum"]').val());
        if (!num || num > 10000 || num < 0) {
            alert('数量取值范围：1-10000');
            return;
        }
        readConfig();
        Config.saveBuyThreadLogMaxNum = num;
        writeConfig();
        alert('设置已保存');
    }).end().find('[data-name="openImOrExBuyThreadLogDialog"]').click(function (e) {
        e.preventDefault();
        Public.showCommonImportOrExportConfigDialog('购买帖子记录', {read: readBuyThreadLog, write: writeBuyThreadLog});
    }).end().find('[name="clear"]').click(function () {
        if (confirm('是否清除所有购买帖子记录？')) {
            clearBuyThreadLog();
            alert('购买帖子记录已清除');
        }
    });

    let logInfo = {};
    for (let info of log) {
        let date = Util.getDateString(new Date(info.time));
        if (!(date in logInfo)) logInfo[date] = [];
        logInfo[date].push(info);
    }
    let totalSell = 0;
    let logHtml = '';
    for (let date of Object.keys(logInfo).sort((a, b) => a > b ? 1 : -1)) {
        let currentDateHtml = '';
        let currentDateTotalSell = 0;
        for (let {time, fid, tid, pid, forumName, threadTitle, userName, sell} of logInfo[date]) {
            totalSell += sell;
            currentDateTotalSell += sell;
            currentDateHtml += `
<p>
  <b>${Util.getTimeString(new Date(time))}：</b>[<a href="thread.php?fid=${fid}" target="_blank">${forumName}</a>]
  《<a href="read.php?tid=${tid}${pid === 'tpc' ? '' : '&spid=' + pid}" target="_blank">${threadTitle}</a>》
  &nbsp;发帖者：<a class="${!Config.adminMemberEnabled ? 'pd_not_click_link' : ''}" href="profile.php?action=show&username=${userName}" target="_blank">${userName}</a>
  &nbsp;售价：<em>${sell}</em>KFB
</p>`;
        }
        logHtml += `<h3>【${date}】 (共<em>${logInfo[date].length}</em>项，合计<em>${currentDateTotalSell.toLocaleString()}</em>KFB)</h3>${currentDateHtml}`;
    }
    $buyThreadLog.html(logHtml ? logHtml : '暂无购买帖子记录（需开启“保存购买帖子记录”的功能）');
    $dialog.find('[data-name="logHeaderInfo"]').html(`(共<em>${log.length}</em>项，总售价<em>${totalSell.toLocaleString()}</em>KFB)`);

    Dialog.show(dialogName);
    let $lastChild = $buyThreadLog.find('p:last');
    if ($lastChild.length > 0) {
        $lastChild.get(0).scrollIntoView();
    }
    Script.runFunc('Read.showBuyThreadLogDialog_after_');
};

/**
 * 鼠标移到到签名可显示提示
 */
export const addSignTips = function () {
    $('.readtext > table > tbody > tr > td:nth-child(2) > div > div:nth-child(2) > span:nth-child(3)').each(function () {
        let $this = $(this);
        $this.attr('title', $this.text()).addClass('pd_custom_tips');
    });
};