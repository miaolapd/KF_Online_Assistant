/* 其它模块 */
'use strict';
import Info from './Info';
import * as Util from './Util';
import * as Msg from './Msg';
import Const from './Const';
import {
    read as readConfig,
    write as writeConfig,
    Config as defConfig,
} from './Config';
import {show as showConfigDialog} from './ConfigDialog';
import * as TmpLog from './TmpLog';
import * as Public from './Public';
import * as Bank from './Bank';

/**
 * 高亮今日新发表帖子的发表时间
 */
export const highlightNewPost = function () {
    $('.thread1 > tbody > tr > td:last-child').has('a.bl').each(function () {
        let html = $(this).html();
        if (/\|\s*\d{2}:\d{2}<br>\n.*\d{2}:\d{2}/.test(html)) {
            html = html.replace(/(\d{2}:\d{2})<br>/, '<span class="pd_highlight">$1</span><br>');
            $(this).html(html);
        }
    });
};

/**
 * 在版块页面中添加帖子页数快捷链接
 */
export const addFastGotoThreadPageLink = function () {
    $('.threadtit1 > a[href^="read.php"]').each(function () {
        let $link = $(this);
        let floorNum = $link.closest('td').next().find('ul > li > a').contents().eq(0).text();
        if (!floorNum || floorNum < Config.perPageFloorNum) return;
        let url = $link.attr('href');
        let totalPageNum = Math.floor(floorNum / Config.perPageFloorNum) + 1;
        let html = '';
        for (let i = 1; i < totalPageNum; i++) {
            if (i > Config.maxFastGotoThreadPageNum) {
                if (i + 1 <= totalPageNum) {
                    html += `..<a href="${url}&page=${totalPageNum}">${totalPageNum}</a>`;
                }
                break;
            }
            html += `<a href="${url}&page=${i + 1}">${i + 1}</a>`;
        }
        html = `<span class="pd_thread_page">&hellip;${html}</span>`;
        $link.after(html).parent().css('white-space', 'normal');
    });
};

/**
 * 高亮at提醒页面中未读的消息
 */
export const highlightUnReadAtTipsMsg = function () {
    if ($('.kf_share1:first').text().trim() !== `含有关键词 “${Info.userName}” 的内容`) return;
    let timeString = Util.getCookie(Const.prevReadAtTipsCookieName);
    if (!timeString || !/^\d+日\d+时\d+分$/.test(timeString)) return;
    let prevString = '';
    $('.kf_share1:eq(1) > tbody > tr:gt(0) > td:first-child').each(function (index) {
        let $this = $(this);
        let curString = $this.text().trim();
        if (index === 0) prevString = curString;
        if (timeString < curString && prevString >= curString) {
            $this.addClass('pd_highlight');
            prevString = curString;
        }
        else return false;
    });
    $('.kf_share1').on('click', 'td > a', function () {
        Util.deleteCookie(Const.prevReadAtTipsCookieName);
    });
};

/**
 * 在短消息页面中添加快速取款的链接
 */
export const addFastDrawMoneyLink = function () {
    if (!$('td:contains("SYSTEM")').length || !$('td:contains("收到了他人转账的贡献")').length) return;
    let $msg = $('.thread2 > tbody > tr:eq(-2) > td:last');
    let html = $msg.html();
    let matches = /给你转帐(\d+(?:\.\d+)?)贡献/.exec(html);
    if (matches) {
        let gongXian = parseFloat(matches[1]);
        $msg.html(
            html.replace(
                /会员\[(.+?)\]通过论坛银行/,
                `会员[<a class="${!Config.adminMemberEnabled ? 'pd_not_click_link' : ''}" target="_blank" href="profile.php?action=show&username=$1">$1</a>]通过论坛银行`
            ).replace(matches[0], `给你转帐<span class="pd_stat"><em>${gongXian.toLocaleString()}</em></span>贡献`)
        );

        $('a[href^="message.php?action=write&remid="]').attr('href', '#').addClass('pd_disabled_link').click(function (e) {
            e.preventDefault();
            alert('本短消息由系统发送，请勿直接回复；如需回复，请点击给你转账的用户链接，向其发送短消息');
        });
    }
};

/**
 * 添加关注和屏蔽用户以及用户备注的链接
 */
export const addFollowAndBlockAndMemoUserLink = function () {
    let matches = /(.+?)\s*详细信息/.exec($('td:contains("详细信息")').text());
    if (!matches) return;
    let userName = $.trim(matches[1]);
    $('<span>[<a href="#">关注用户</a>] [<a href="#">屏蔽用户</a>]</span><br><span>[<a href="#">添加备注</a>]</span><br>')
        .appendTo($('a[href^="message.php?action=write&touid="]').parent())
        .find('a').each(function () {
        let $this = $(this);
        if ($this.is('a:contains("备注")')) {
            let str = '';
            for (let [name, memo] of Util.entries(Config.userMemoList)) {
                if (name === userName) {
                    str = memo;
                    break;
                }
            }
            if (str !== '') {
                $this.text('修改备注').data('memo', str);
                let $info = $('.log1 > tbody > tr:last-child > td:last-child');
                $info.html(`备注：${str}<br>${$info.html()}`);
            }
        }
        else {
            let str = '关注';
            let userList = Config.followUserList;
            if ($this.text().indexOf('屏蔽') > -1) {
                str = '屏蔽';
                userList = Config.blockUserList;
            }
            if (Util.inFollowOrBlockUserList(userName, userList) > -1) {
                $this.addClass('pd_highlight').text('解除' + str);
            }
        }
    }).click(function (e) {
        e.preventDefault();
        readConfig();
        let $this = $(this);
        if ($this.is('a:contains("备注")')) {
            let memo = $this.data('memo');
            if (!memo) memo = '';
            let value = prompt('为此用户添加备注（要删除备注请留空）：', memo);
            if (value === null) return;
            if (!Config.userMemoEnabled) Config.userMemoEnabled = true;
            value = $.trim(value);
            if (value) {
                Config.userMemoList[userName] = value;
                $this.text('修改备注');
            }
            else {
                delete Config.userMemoList[userName];
                $this.text('添加备注');
            }
            $this.data('memo', value);
            writeConfig();
        }
        else {
            let str = '关注';
            let userList = Config.followUserList;
            if ($this.text().includes('屏蔽')) {
                str = '屏蔽';
                userList = Config.blockUserList;
                if (!Config.blockUserEnabled) Config.blockUserEnabled = true;
            }
            else {
                if (!Config.followUserEnabled) Config.followUserEnabled = true;
            }
            if ($this.text() === '解除' + str) {
                let index = Util.inFollowOrBlockUserList(userName, userList);
                if (index > -1) {
                    userList.splice(index, 1);
                    writeConfig();
                }
                $this.removeClass('pd_highlight').text(str + '用户');
                alert('该用户已被解除' + str);
            }
            else {
                if (Util.inFollowOrBlockUserList(userName, userList) === -1) {
                    if (str === '屏蔽') {
                        let type = Config.blockUserDefaultType;
                        type = prompt('请填写屏蔽类型，0：屏蔽主题和回帖；1：仅屏蔽主题；2：仅屏蔽回帖', type);
                        if (type === null) return;
                        type = parseInt(type);
                        if (isNaN(type) || type < 0 || type > 2) type = Config.blockUserDefaultType;
                        userList.push({name: userName, type: type});
                    }
                    else {
                        userList.push({name: userName});
                    }
                    writeConfig();
                }
                $this.addClass('pd_highlight').text('解除' + str);
                alert('该用户已被' + str);
            }
        }
    });
};

/**
 * 修改我的回复页面里的帖子链接
 */
export const modifyMyPostLink = function () {
    $('.t a[href^="read.php?tid="]').each(function () {
        let $this = $(this);
        $this.attr('href', $this.attr('href').replace(/&uid=\d+#(\d+)/, '&spid=$1'));
    });
};

/**
 * 在短消息页面添加选择指定短消息的按钮
 */
export const addMsgSelectButton = function () {
    let $checkeds = $('.thread1 > tbody > tr > td:last-child > [type="checkbox"]');
    $('<input value="自定义" type="button" style="margin-right: 3px;">').insertBefore('[type="button"][value="全选"]')
        .click(function (e) {
            e.preventDefault();
            let value = $.trim(
                prompt('请填写所要选择的包含指定字符串的短消息标题（可用|符号分隔多个标题）', '收到了他人转账的贡献|收到了他人转账的KFB|银行汇款通知|您的文章被评分|您的文章被删除')
            );
            if (value !== '') {
                $checkeds.prop('checked', false);
                let titleArr = value.split('|');
                $('.thread1 > tbody > tr > td:nth-child(2) > a').each(function () {
                    let $this = $(this);
                    for (let title of titleArr) {
                        if ($this.text().toLowerCase().includes(title.toLowerCase())) {
                            $this.closest('tr').find('td:last-child > input[type="checkbox"]').prop('checked', true);
                        }
                    }
                });
            }
        })
        .parent()
        .attr('colspan', 4)
        .prev('td')
        .attr('colspan', 3);

    $('<input value="反选" type="button" style="margin-left: 5px; margin-right: 1px;">')
        .insertAfter('[type="button"][value="全选"]')
        .click(() => Util.selectInverse($checkeds));
};
/**
 * 添加自动更换ID颜色的按钮
 */
export const addAutoChangeIdColorButton = function () {
    let $autoChangeIdColor = $('table div > table > tbody > tr > td:contains("自定义ID颜色")');
    $('<span class="pd_highlight">低等级没人权？没有自己喜欢的颜色？快来试试助手的<a href="#">自定义本人神秘颜色</a>的功能吧！（虽然仅限自己可见 ╮(╯▽╰)╭）</span><br>')
        .appendTo($autoChangeIdColor)
        .find('a')
        .click(function (e) {
            e.preventDefault();
            showConfigDialog();
        });

    let $idColors = $autoChangeIdColor.parent('tr').nextAll('tr').not('tr:last');
    if ($idColors.find('a').length <= 1) return;
    let $area = $(`
<form>
<div data-name="autoChangeIdColorBtns" style="margin-top: 5px;">
  <label><input name="autoChangeIdColorEnabled" class="pd_input" type="checkbox"> 自动更换ID颜色</label>
</div>
</form>
`).appendTo($autoChangeIdColor);
    $area.find('[name="autoChangeIdColorEnabled"]').click(function () {
        let $this = $(this);
        let enabled = $this.prop('checked');
        if (enabled !== Config.autoChangeIdColorEnabled) {
            readConfig();
            Config.autoChangeIdColorEnabled = enabled;
            writeConfig();
        }

        if (enabled) {
            $idColors.addClass('pd_id_color_select').find('td:not(:has(a))').css('cursor', 'not-allowed');
            $(`
<label class="pd_cfg_ml">
  更换顺序
  <select name="autoChangeIdColorType" style="font-size: 12px;">
    <option value="random">随机</option><option value="sequence">顺序</option>
  </select>
</label>&nbsp;
<label>每隔 <input name="autoChangeIdColorInterval" class="pd_input" style="width: 25px;" type="text" maxlength="5"> 小时</label>
<button name="save" type="button">保存</button>
<button name="reset" type="button" style="margin-left: 3px;">重置</button><br>
<a class="pd_btn_link" data-name="selectAll" href="#">全选</a>
<a class="pd_btn_link" data-name="selectInverse" href="#">反选</a>
<label><input name="changeAllAvailableIdColorEnabled" class="pd_input" type="checkbox"> 选择当前所有可用的ID颜色</label>
`).insertAfter($this.parent()).filter('[name="save"]').click(function () {
                let $autoChangeIdColorInterval = $area.find('[name="autoChangeIdColorInterval"]');
                let interval = parseInt($autoChangeIdColorInterval.val());
                if (isNaN(interval) || interval <= 0) {
                    alert('ID颜色更换时间间隔格式不正确');
                    $autoChangeIdColorInterval.select().focus();
                    return;
                }
                let changeAllAvailableSMColorEnabled = $area.find('[name="changeAllAvailableIdColorEnabled"]').prop('checked');
                let customChangeSMColorList = [];
                $idColors.find('[type="checkbox"]:checked').each(function () {
                    customChangeSMColorList.push(parseInt($(this).val()));
                });
                if (!changeAllAvailableSMColorEnabled && customChangeSMColorList.length <= 1) {
                    alert('必须选择2种或以上的ID颜色');
                    return;
                }
                if (customChangeSMColorList.length <= 1) customChangeSMColorList = [];

                let oriInterval = Config.autoChangeIdColorInterval;
                readConfig();
                Config.autoChangeIdColorType = $area.find('[name="autoChangeIdColorType"]').val().toLowerCase();
                Config.autoChangeIdColorInterval = interval;
                Config.changeAllAvailableIdColorEnabled = changeAllAvailableSMColorEnabled;
                Config.customAutoChangeIdColorList = customChangeSMColorList;
                writeConfig();
                if (oriInterval !== Config.autoChangeIdColorInterval)
                    Util.deleteCookie(Const.autoChangeIdColorCookieName);
                alert('设置保存成功');
            }).end().filter('[name="reset"]').click(function () {
                readConfig();
                Config.autoChangeIdColorEnabled = defConfig.autoChangeIdColorEnabled;
                Config.autoChangeIdColorType = defConfig.autoChangeIdColorType;
                Config.autoChangeIdColorInterval = defConfig.autoChangeIdColorInterval;
                Config.changeAllAvailableIdColorEnabled = defConfig.changeAllAvailableIdColorEnabled;
                Config.customAutoChangeIdColorList = defConfig.customAutoChangeIdColorList;
                writeConfig();
                Util.deleteCookie(Const.autoChangeIdColorCookieName);
                TmpLog.deleteValue(Const.prevAutoChangeIdColorTmpLogName);
                alert('设置已重置');
                location.reload();
            }).end().filter('[data-name="selectAll"], [data-name="selectInverse"]').click(function (e) {
                e.preventDefault();
                if ($idColors.find('input[disabled]').length > 0) {
                    alert('请先取消勾选“选择当前所有可用的ID颜色”复选框');
                    $area.find('[name="changeAllAvailableIdColorEnabled"]').focus();
                    return;
                }
                if ($(this).is('[data-name="selectAll"]')) Util.selectAll($idColors.find('[type="checkbox"]'));
                else Util.selectInverse($idColors.find('[type="checkbox"]'));
            });

            $idColors.find('td:has(a)').each(function () {
                let $this = $(this);
                let matches = /&color=(\d+)/i.exec($this.find('a').attr('href'));
                if (matches) $this.append(`<input type="checkbox" class="pd_input" value="${matches[1]}">`);
            });

            $area.find('[name="autoChangeIdColorType"]').val(Config.autoChangeIdColorType);
            $area.find('[name="autoChangeIdColorInterval"]').val(Config.autoChangeIdColorInterval);
            $area.find('[name="changeAllAvailableIdColorEnabled"]').click(function () {
                $idColors.find('input').prop('disabled', $(this).prop('checked'));
            }).prop('checked', Config.changeAllAvailableIdColorEnabled).triggerHandler('click');
            for (let id of Config.customAutoChangeIdColorList) {
                $idColors.find(`input[value="${id}"]`).prop('checked', true);
            }
        }
        else {
            $this.parent().nextAll().remove();
            $idColors.removeClass('pd_id_color_select').find('input').remove();
        }
    });

    $idColors.on('click', 'td', function (e) {
        if (!$(e.target).is('a')) {
            let $this = $(this);
            if ($this.find('input[disabled]').length > 0) {
                alert('请先取消勾选“选择当前所有可用的ID颜色”复选框');
                $area.find('[name="changeAllAvailableIdColorEnabled"]').focus();
            }
            else if (!$(e.target).is('input')) {
                $this.find('input').click();
            }
        }
    });

    if (Config.autoChangeIdColorEnabled) {
        $area.find('[name="autoChangeIdColorEnabled"]').prop('checked', true).triggerHandler('click');
    }
};

/**
 * 同步修改帖子每页楼层数量
 */
export const syncModifyPerPageFloorNum = function () {
    const syncConfig = function () {
        let perPageFloorNum = parseInt($('select[name="p_num"]').val());
        if (isNaN(perPageFloorNum)) return;
        if (!perPageFloorNum) perPageFloorNum = 10;
        if (perPageFloorNum !== Config.perPageFloorNum) {
            Config.perPageFloorNum = perPageFloorNum;
            writeConfig();
        }
    };
    $('form#creator').submit(() => {
        readConfig();
        syncConfig();
    });
    syncConfig();
};

/**
 * 在设置页面添加更换头像提醒
 */
export const addAvatarChangeAlert = function () {
    $('input[name="uploadurl[2]"]')
        .parent().append('<div class="pd_highlight">本反向代理服务器为了提高性能对图片设置了缓存，更换头像后可能需等待<b>最多30分钟</b>才能看到效果</div>');
};

/**
 * 在论坛排行页面为用户名添加链接
 */
export const addUserNameLinkInRankPage = function () {
    $('.kf_no11:eq(2) > tbody > tr:gt(0) > td:nth-child(2)').each(function () {
        let $this = $(this);
        let userName = $this.text().trim();
        $this.html(`<a class="${!Config.adminMemberEnabled ? 'pd_not_click_link' : ''}" href="profile.php?action=show&username=${userName}" target="_blank">${userName}</a>`);
        if (userName === Info.userName) $this.find('a').addClass('pd_highlight');
    });
};

/**
 * 处理个人信息页面上的元素
 */
export const handleProfilePage = function () {
    let $area = $('.log1 > tbody > tr:last-child > td:nth-child(2)');
    $area.html(
        $area.html().replace(/<b>在线<\/b>/, '<b style="color: #090;">在线</b>')
            .replace(/<b>离线<\/b>/, '<b style="color: #999;">离线</b>')
            .replace(/系统等级：(\S+)/, '系统等级：<span class="pd_highlight">$1</span>')
            .replace(/发帖数量：(\d+)/, (m, num) => `发帖数量：<span data-num="${num}">${parseInt(num).toLocaleString()}</span>`)
            .replace(/神秘等级：(-?\d+)/, (m, num) => `神秘等级：<span data-num="${num}">${parseInt(num).toLocaleString()}</span>`)
            .replace(/论坛货币：(-?\d+)/, (m, num) => `论坛货币：<span data-num="${num}">${parseInt(num).toLocaleString()}</span>`)
            .replace(/贡献数值：(-?\d+(?:\.\d+)?)/, (m, num) => `贡献数值：<span data-num="${num}">${parseFloat(num).toLocaleString()}</span>`)
            .replace(/在线时间：(\d+)/, (m, num) => `在线时间：<span data-num="${num}">${parseInt(num).toLocaleString()}</span>`)
            .replace(/注册时间：((\d{4})-(\d{2})-(\d{2}))/, (m, date, year, month, day) => {
                let now = new Date();
                let html = date;
                if (parseInt(month) === now.getMonth() + 1 && parseInt(day) === now.getDate() && parseInt(year) <= now.getFullYear())
                    html = `<span class="pd_custom_tips pd_highlight" title="今天是该用户注册${now.getFullYear() - parseInt(year)}周年纪念日">${date}</span>`;
                return '注册时间：' + html;
            })
    ).css('vertical-align', 'top');
};

/**
 * 为关键词页面链接用户名链接
 */
export const addGuanJianCiUserNameLink = function () {
    $('.kf_share1 > tbody > tr:gt(1) > td.kf_share2:last-child').each(function () {
        let $this = $(this);
        let userName = $this.text().trim();
        if (userName) {
            $this.html(`<a href="profile.php?action=show&username=${userName}">${userName}</a>`);
        }
    });
};