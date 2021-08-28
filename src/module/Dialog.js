/* 对话框模块 */
'use strict';
import Info from './Info';
import * as Util from './Util';
import * as Public from './Public';

/**
 * 创建对话框
 * @param {string} id 对话框ID
 * @param {string} title 对话框标题
 * @param {string} content 对话框内容
 * @param {string} style 对话框样式
 * @returns {jQuery} 对话框的jQuery对象
 */
export const create = function (id, title, content, style = '') {
    let html = `
<form>
<div class="pd_cfg_box" id="${id}" style="${style}">
  <h1>${title}<span data-action="close">&times;</span></h1>
  ${content}
</div>
</form>`;
    let $dialog = $(html).appendTo('body');
    $dialog.on('click', '.pd_cfg_tips', function (e) {
        if (Info.isMobile) Public.showElementTitleTips(e, this.title);
        return false;
    }).on('click', 'a.pd_disabled_link', () => false)
        .on('click', '[data-action="close"]', () => close(id))
        .keydown(function (e) {
            if (e.keyCode === 27) {
                return close(id);
            }
        })
        .find('legend [type="checkbox"]').click(function () {
        let $this = $(this);
        let checked = $this.prop('checked');
        if (Util.isOpera() || Util.isEdge())
            $this.closest('fieldset').find('input, select, textarea, button').not('legend input').prop('disabled', !checked);
        else $this.closest('fieldset').prop('disabled', !checked);
    }).end().find('input[data-disabled]').click(function () {
        let $this = $(this);
        let checked = $this.prop('checked');
        $($this.data('disabled')).each(function () {
            let $this = $(this);
            if ($this.is('a')) {
                if (checked) $this.removeClass('pd_disabled_link');
                else $this.addClass('pd_disabled_link');
            }
            else {
                $this.prop('disabled', !checked);
            }
        });
    }).end().find('input[data-mutex]').click(function () {
        let $this = $(this);
        let checked = $this.prop('checked');
        $($this.data('mutex')).each(function () {
            let $this = $(this);
            if ($this.is('a')) {
                if (checked) $this.addClass('pd_disabled_link');
                else $this.removeClass('pd_disabled_link');
            }
            else {
                $this.prop('disabled', checked);
            }
        });
    });
    if (!Info.isMobile) {
        $(window).on('resize.' + id, () => resize(id));
    }
    return $dialog;
};

/**
 * 显示或调整对话框
 * @param {string} id 对话框ID
 */
export const show = function (id) {
    let $dialog = $('#' + id);
    if (!$dialog.length) return;
    $dialog.find('legend [type="checkbox"]').each(function () {
        $(this).triggerHandler('click');
    }).end().find('input[data-disabled], input[data-mutex]').each(function () {
        $(this).triggerHandler('click');
    });
    $dialog.fadeIn('fast');
    resize(id);
    $dialog.find('input:first, select:first, a:first, textarea:first, button:first').eq(0).focus();
};

/**
 * 调整对话框大小和位置
 * @param {string} id 对话框ID
 */
export const resize = function (id) {
    let $dialog = $('#' + id);
    let windowHeight = $(window).height();
    $dialog.find('.pd_cfg_main').css('max-height', windowHeight - 80);
    let dialogWidth = $dialog.outerWidth(), windowWidth = $(window).width();
    let left = windowWidth / 2 - dialogWidth / 2;
    if (left + dialogWidth > windowWidth) left = windowWidth - dialogWidth - 20;
    if (left < 0) left = 0;
    let top = windowHeight / 2 - $dialog.outerHeight() / 2;
    if (top < 0) top = 0;
    $dialog.css({top, left});
};

/**
 * 关闭对话框
 * @param {string} id 对话框ID
 * @returns {boolean} 返回false
 */
export const close = function (id) {
    $('#' + id).fadeOut('fast', function () {
        $(this).parent('form').remove();
    });
    if (!Info.isMobile) {
        $(window).off('resize.' + id);
    }
    return false;
};
