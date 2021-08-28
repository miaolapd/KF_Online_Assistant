/* 自助评分模块 */
'use strict';
import Info from './Info';
import Const from './Const';
import * as Public from './Public';

/**
 * 检查自助评分文件大小
 * @param {string} title 帖子标题
 * @param {number} ratingSize 评分大小
 * @returns {{}} 检查结果
 */
export const checkRateSize = function (title, ratingSize) {
    let titleSize = 0;
    let matches = title.match(/\b(\d+(?:\.\d+)?)\s?(M|G)B?\b/ig);
    if (matches) {
        for (let i = 0; i < matches.length; i++) {
            let sizeMatches = /(\d+(?:\.\d+)?)\s?(M|G)/i.exec(matches[i]);
            if (!sizeMatches) continue;
            let size = parseFloat(sizeMatches[1]);
            if (sizeMatches[2].toUpperCase() === 'G') size *= 1024;
            titleSize += size;
        }
    }

    if (!titleSize || !ratingSize) {
        return {type: -1};
    }
    else if (titleSize > ratingSize * (100 + Const.ratingErrorSizePercent) / 100 + 1 ||
        titleSize < ratingSize * (100 - Const.ratingErrorSizePercent) / 100 - 1
    ) {
        return {type: 1, titleSize, ratingSize};
    }
    else return {type: 0};
};

/**
 * 高亮自助评分错标文件大小
 */
export const highlightRateErrorSize = function () {
    $('.adp1:eq(1) a[href^="read.php?tid="]').each(function () {
        let $this = $(this);
        let title = $this.text();
        let ratingSize = 0;
        let $ratingCell = $this.parent('td').next('td');
        let matches = /认定\[(\d+)\]/i.exec($ratingCell.text());
        if (matches) {
            ratingSize = parseInt(matches[1]);
        }

        let {type, titleSize} = checkRateSize(title, ratingSize);
        if (type === -1) {
            $ratingCell.css('color', '#ff9933').attr('title', '标题文件大小无法解析').addClass('pd_custom_tips');
        }
        else if (type === 1) {
            $ratingCell.addClass('pd_highlight pd_custom_tips')
                .attr('title', `标题文件大小(${titleSize.toLocaleString()}M)与认定文件大小(${ratingSize.toLocaleString()}M)不一致`);
        }
    });
};

/**
 * 在提交自助评分时显示错标文件大小警告
 */
export const showErrorSizeSubmitWarning = function () {
    $('form[name="mail1"]').submit(function () {
        let ratingSize = parseFloat($('[name="psize"]').val());
        if (isNaN(ratingSize) || ratingSize <= 0) return;
        if (parseInt($('[name="psizegb"]').val()) === 2) ratingSize *= 1024;
        let title = $('.adp1 a[href^="read.php?tid="]').text();
        let {type, titleSize} = checkRateSize(title, ratingSize);
        if (type === 1) {
            return confirm(`标题文件大小(${titleSize.toLocaleString()}M)与认定文件大小(${ratingSize.toLocaleString()}M)不一致，是否继续？`);
        }
    });
};

/**
 * 在自助评分页面添加无法识别标题文件大小的警告
 */
export const addUnrecognizedSizeWarning = function () {
    let $title = $('.adp1 a[href^="read.php?tid="]');
    let title = $title.text();
    let {type} = checkRateSize(title, 1);
    if (type === -1) {
        $title.parent().append('&nbsp;<span style="color: #ff9933;">(标题文件大小无法解析)</span>');
    }
};

/**
 * 当检测到待检查的评分记录含有负数倒计时的情况下，自动刷新页面
 */
export const refreshWaitCheckRatePage = function () {
    if (!/剩余-\d+分钟/.test($('.adp1:eq(1) > tbody > tr:last-child > td:first-child').text())) return;

    /**
     * 刷新
     */
    const refresh = function () {
        console.log('自动刷新Start');
        $.ajax({
            type: 'GET',
            url: 'kf_fw_1wkfb.php?ping=2&t=' + $.now(),
            timeout: 10000,
        }).done(function (html) {
            if (/剩余-\d+分钟/.test(html)) setTimeout(refresh, Const.defAjaxInterval);
        }).fail(() => setTimeout(refresh, Const.defAjaxInterval));
    };

    refresh();
};

/**
 * 在页面上添加相关链接
 */
export const addLinksInPage = function () {
    if (/\/kf_fw_1wkfb\.php\?ping=5\b/.test(location.href)) {
        $('.adp1:last > tbody > tr:gt(0) > td:last-child').each(function () {
            let $this = $(this);
            let uid = parseInt($this.text());
            $this.wrapInner(`<a class="${uid === Info.uid ? 'pd_highlight' : ''} ${!Config.adminMemberEnabled ? 'pd_not_click_link' : ''}" href="profile.php?action=show&uid=${uid}" target="_blank"></a>`);
        });
    }
    else if (/\/kf_fw_1wkfb\.php\?ping=6\b/.test(location.href)) {
        $('.adp1:last > tbody > tr:gt(1) > td:nth-child(3)').each(function () {
            let $this = $(this);
            let userName = $this.text().trim();
            if (userName === '0') return;
            $this.wrapInner(`<a class="${userName === Info.userName ? 'pd_highlight' : ''} ${!Config.adminMemberEnabled ? 'pd_not_click_link' : ''}" href="profile.php?action=show&username=${userName}" target="_blank"></a>`);
        });
        $('.adp1:last > tbody > tr:gt(1) > td:last-child').each(function () {
            let $this = $(this);
            let matches = /\[(\d+)]板块/.exec($this.text());
            if (matches) $this.wrapInner(`<a href="thread.php?fid=${matches[1]}" target="_blank"></a>`);
        });
    }
    else if (/\/kf_fw_1wkfb\.php\?ping=8\b/.test(location.href)) {
        $('.adp1:last > tbody > tr:gt(1) > td:last-child').each(function () {
            let $this = $(this);
            $this.html(
                $this.html().replace(/(管理|会员):([^\[\]]+)\]/g, `$1:<a class="${!Config.adminMemberEnabled ? 'pd_not_click_link' : ''}" href="profile.php?action=show&username=$2" target="_blank">$2</a>]`)
                    .replace(/\[帖子:(\d+)\]/, '[帖子:<a href="read.php?tid=$1" target="_blank">$1</a>]')
            );
        });
    }
    else if (/\/kf_fw_1wkfb\.php\?ping=9\b/.test(location.href)) {
        $('.adp1:last > tbody > tr:gt(2) > td:first-child').each(function () {
            let $this = $(this);
            $this.html(
                $this.html().replace(/UID:(\d+)/, `UID:<a class="${!Config.adminMemberEnabled ? 'pd_not_click_link' : ''}" href="profile.php?action=show&uid=$1" target="_blank">$1</a>`)
            );
        });
    }
    else if (/\/kf_fw_1wkfb\.php\?do=2\b/.test(location.href)) {
        let $node1 = $('.adp1 > tbody > tr:nth-of-type(4):contains("评分会员") > td:last-child');
        $node1.wrapInner(`<a class="${!Config.adminMemberEnabled ? 'pd_not_click_link' : ''}" href="profile.php?action=show&username=${$node1.text().trim()}" target="_blank"></a>`);
        let $node2 = $('.adp1 > tbody > tr:nth-of-type(10) > td:last-child:contains("异议提出人")');
        $node2.html($node2.html().replace(/：(\S+)/, `：<a class="${!Config.adminMemberEnabled ? 'pd_not_click_link' : ''}" href="profile.php?action=show&username=$1" target="_blank">$1</a>`));
    }
};

/**
 * 处理优秀帖提交
 */
export const handleGoodPostSubmit = function () {
    $('a[id^="cztz"]').attr('data-onclick', function () {
        return $(this).attr('onclick');
    }).removeAttr('onclick');

    $('#alldiv').on('click', 'a[onclick^="cztz"]', function () {
        let $this = $(this);
        let $floor = $this.closest('.readtext');
        if ($this.data('highlight')) {
            $floor.removeClass('pd_good_post_mark');
            $this.removeData('highlight');
        }
        else {
            $floor.addClass('pd_good_post_mark');
            $this.data('highlight', true);
        }
    }).on('click', 'a[id^="cztz"]', function () {
        let $this = $(this);
        if ($this.data('wait')) return;
        let $floor = $this.closest('.readtext');
        let url = $floor.find('.readidmsbottom, .readidmbottom').find('a[href^="profile.php?action=show"]').attr('href');
        let flag = false;
        $('.readidmsbottom, .readidmbottom').find(`a[href="${url}"]`).each(function () {
            let $currentFloor = $(this).closest('.readtext');
            if ($currentFloor.is($floor)) return;
            if ($currentFloor.find('.read_fds:contains("本帖为优秀帖")').length > 0) {
                flag = true;
                return false;
            }
        });
        if (flag && !confirm('在当前页面中该会员已经有回帖被评为优秀帖，是否继续？')) return;

        let safeId = Public.getSafeId();
        let matches = /cztzyx\('(\d+)','(\d+|tpc)'\)/.exec($this.data('onclick'));
        if (!matches || !safeId) return;
        $this.next('.pd_good_post_msg').remove();
        $this.data('wait', true);
        $.ajax({
            type: 'POST',
            url: 'diy_read_cztz.php',
            data: `tid=${matches[1]}&pid=${matches[2]}&safeid=${safeId}`,
            timeout: Const.defAjaxTimeout,
        }).done(function (html) {
            if (/已将本帖操作为优秀帖|该楼层已经是优秀帖/.test(html)) {
                let $content = $floor.find('> table > tbody > tr > td');
                if (!$content.find('.read_fds:contains("本帖为优秀帖")').length) {
                    $content.find('.readidms, .readidm').after('<fieldset class="read_fds"><legend>↓</legend>本帖为优秀帖</fieldset>');
                }
            }
            if (!/已将本楼层提交为优秀帖申请/.test(html)) {
                $floor.removeClass('pd_good_post_mark');
            }
            $this.after(`<span class="pd_good_post_msg" style="margin-left: 5px; color: #777;">(${html})</span>`);
        }).always(() => $this.removeData('wait'));
    });
};
