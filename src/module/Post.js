/* 发帖模块 */
'use strict';
import Info from './Info';
import * as Util from './Util';
import * as Msg from './Msg';
import Const from './Const';
import * as Script from './Script';

/**
 * 处理多重回复和多重引用
 * @param {number} type 处理类型，1：多重回复；2：多重引用
 */
export const handleMultiQuote = function (type = 1) {
    Script.runFunc('Post.handleMultiQuote_before_', type);
    if (!$('#pdClearMultiQuoteData').length) {
        if(location.pathname === '/read.php') {
            $('<a id="pdClearMultiQuoteData" style="margin-right: 7px;" title="清除在浏览器中保存的多重引用数据" href="#">清除引用数据</a>')
                .prependTo($('input[name="diy_guanjianci"]').parent());
        }
        else {
            $('<a id="pdClearMultiQuoteData" style="margin-left: 7px;" title="清除在浏览器中保存的多重引用数据" href="#">清除引用数据</a>')
                .insertAfter('input[name="diy_guanjianci"]');
        }
        $('#pdClearMultiQuoteData').click(function (e) {
            e.preventDefault();
            localStorage.removeItem(Const.multiQuoteStorageName);
            $('input[name="diy_guanjianci"]').val('');
            $(type === 2 ? '#textarea' : 'textarea[name="atc_content"]').val('');
            alert('多重引用数据已被清除');
        });
    }
    let data = localStorage[Const.multiQuoteStorageName];
    if (!data) return;
    try {
        data = JSON.parse(data);
    }
    catch (ex) {
        return;
    }
    if (!data || $.type(data) !== 'object' || $.isEmptyObject(data)) return;
    let tid = parseInt(Util.getUrlParam('tid')),
        fid = parseInt(Util.getUrlParam('fid'));
    if (!tid || typeof data.tid === 'undefined' || data.tid !== tid || !Array.isArray(data.quoteList)) return;
    if (type === 2 && !fid) return;
    let list = [];
    for (let quote of data.quoteList) {
        if (!Array.isArray(quote)) continue;
        for (let data of quote) {
            list.push(data);
        }
    }
    if (!list.length) {
        localStorage.removeItem(Const.multiQuoteStorageName);
        return;
    }
    let keywords = new Set();
    let content = '';
    let $keywords = $('input[name="diy_guanjianci"]');
    if (type === 2) {
        Msg.wait(`<strong>正在获取引用内容中&hellip;</strong><i>剩余：<em class="pd_countdown">${list.length}</em></i>`);
        $(document).clearQueue('MultiQuote');
    }
    $.each(list, function (index, data) {
        if (typeof data.floor === 'undefined' || typeof data.pid === 'undefined') return;
        keywords.add(data.userName);
        if (type === 2) {
            $(document).queue('MultiQuote', function () {
                $.get(`post.php?action=quote&fid=${fid}&tid=${tid}&pid=${data.pid}&article=${data.floor}&t=${$.now()}`,
                    function (html) {
                        let matches = /<textarea id="textarea".*?>((.|\n)+?)<\/textarea>/i.exec(html);
                        if (matches) {
                            content += Util.removeUnpairedBBCodeContent(
                                Util.htmlDecode(matches[1]).replace(/\n{2,}/g, '\n')
                            ) + (index === list.length - 1 ? '' : '\n');
                        }
                        let $countdown = $('.pd_countdown:last');
                        $countdown.text(parseInt($countdown.text()) - 1);
                        if (index === list.length - 1) {
                            Msg.destroy();
                            let $textarea = $('#textarea');
                            $textarea.get(0).defaultValue = content;
                            $textarea.val(content).focus();
                            $keywords.trigger('change');
                        }
                        else {
                            setTimeout(function () {
                                $(document).dequeue('MultiQuote');
                            }, 100);
                        }
                    });
            });
        }
        else {
            content += `[quote]回 ${data.floor}楼(${data.userName}) 的帖子[/quote]\n`;
        }
    });
    $keywords.val([...keywords].join(','));
    $('form[name="FORM"]').submit(function () {
        localStorage.removeItem(Const.multiQuoteStorageName);
    });
    if (type === 2) {
        $(document).dequeue('MultiQuote');
    }
    else {
        let $textarea = $('textarea[name="atc_content"]');
        $textarea.get(0).defaultValue = content;
        $textarea.val(content).focus();
        $keywords.trigger('change');
    }
    Script.runFunc('Post.handleMultiQuote_after_', type);
};

/**
 * 去除引用内容中不配对的BBCode
 */
export const removeUnpairedBBCodeInQuoteContent = function () {
    let $content = $('#textarea');
    let content = $content.val();
    let matches = /\[quote\](.|\r|\n)+?\[\/quote\]/.exec(content);
    if (matches) {
        let workedContent = Util.removeUnpairedBBCodeContent(matches[0]);
        if (matches[0] !== workedContent) {
            $content.val(content.replace(matches[0], workedContent));
        }
    }
};

/**
 * 在发帖页面的发帖框上添加额外的按钮
 */
export const addExtraPostEditorButton = function () {
    let textArea = $('#textarea').get(0);
    if (!textArea) return;

    $(`
<span id="wy_post" title="插入隐藏内容" data-type="hide" style="background-position: 0 -280px;">插入隐藏内容</span>
<span id="wy_justifyleft" title="左对齐" data-type="left" style="background-position: 0 -360px;">左对齐</span>
<span id="wy_justifycenter" title="居中" data-type="center" style="background-position: 0 -380px;">居中</span>
<span id="wy_justifyright" title="右对齐" data-type="right" style="background-position: 0 -400px;">右对齐</span>
<span id="wy_subscript" title="下标" data-type="sub" style="background-position: 0 -80px;">下标</span>
<span id="wy_superscript" title="上标" data-type="sup" style="background-position: 0 -100px;">上标</span>
<span class="pd_editor_btn" title="插入飞行文字" data-type="fly">F</span>
<span class="pd_editor_btn" title="插入HTML5音频" data-type="audio">A</span>
<span class="pd_editor_btn" title="插入HTML5视频" data-type="video">V</span>
`).appendTo('#editor-button .editor-button').click(function () {
        let $this = $(this);
        let type = $this.data('type');
        let text = '';
        switch (type) {
            case 'hide':
                text = prompt('请输入神秘等级：', 5);
                break;
            case 'audio': {
                text = prompt('请输入HTML5音频实际地址：\n（可直接输入网易云音乐的单曲地址，将自动转换为外链地址）', 'http://');
                let matches = /^https?:\/\/music\.163\.com\/(?:#\/)?song\?id=(\d+)/i.exec(text);
                if (matches) text = `https://music.miaola.work/163/${matches[1]}.mp3`;
                matches = /^https?:\/\/www\.xiami\.com\/song\/(\w+)/i.exec(text);
                if (matches) text = `https://music.miaola.work/xiami/${matches[1]}.mp3`;
            }
                break;
            case 'video': {
                text = prompt('请输入HTML5视频实际地址：\n（可直接输入YouTube视频页面的地址，将自动转换为外链地址）', 'http://');
                let matches = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w\-]+)/i.exec(text);
                if (matches) text = `https://video.miaola.work/youtube/${matches[1]}`;
                matches = /^https?:\/\/youtu\.be\/([\w\-]+)$/i.exec(text);
                if (matches) text = `https://video.miaola.work/youtube/${matches[1]}`;
            }
                break;
        }
        if (text === null) return;

        let selText = '';
        let code = '';
        switch (type) {
            case 'hide':
                selText = Util.getSelText(textArea);
                code = `[hide=${text}]${selText}[/hide]`;
                break;
            case 'left':
                selText = Util.getSelText(textArea);
                code = `[align=left]${selText}[/align]`;
                break;
            case 'center':
                selText = Util.getSelText(textArea);
                code = `[align=center]${selText}[/align]`;
                break;
            case 'right':
                selText = Util.getSelText(textArea);
                code = `[align=right]${selText}[/align]`;
                break;
            case 'fly':
                selText = Util.getSelText(textArea);
                code = `[fly]${selText}[/fly]`;
                break;
            case 'sub':
                selText = Util.getSelText(textArea);
                code = `[sub]${selText}[/sub]`;
                break;
            case 'sup':
                selText = Util.getSelText(textArea);
                code = `[sup]${selText}[/sup]`;
                break;
            case 'audio':
                code = `[audio]${text}[/audio]`;
                break;
            case 'video':
                code = `[video]${text}[/video]`;
                break;
        }
        if (!code) return;
        Util.addCode(textArea, code, selText);
        textArea.focus();
    }).mouseenter(function () {
        $(this).addClass('buttonHover');
    }).mouseleave(function () {
        $(this).removeClass('buttonHover');
    });
};

/**
 * 在发帖页面上添加额外的选项
 */
export const addExtraOptionInPostPage = function () {
    $(`
<div class="pd_post_extra_option">
  <label><input type="checkbox" name="autoAnalyzeUrl" checked> 自动分析url</label>
  <label style="margin-left: 5px;"><input type="checkbox" name="windCodeAutoConvert" checked> Wind Code自动转换</label>
</div>
`).appendTo($('#menu_show')
        .closest('td'))
        .on('click', '[type="checkbox"]', function () {
            let $this = $(this);
            let inputName = $this.is('[name="autoAnalyzeUrl"]') ? 'atc_autourl' : 'atc_convert';
            $('form[name="FORM"]').find(`[name="${inputName}"]`).val($this.prop('checked') ? 1 : 0);
        });

    $('<input type="button" value="预览帖子" style="margin-left: 7px;">')
        .insertAfter('[type="submit"][name="Submit"]')
        .click(function (e) {
            e.preventDefault();
            let $form = $('form[name="preview"]');
            $form.find('input[name="atc_content"]').val($('#textarea').val());
            $form.submit();
        });
};

/**
 * 修正发帖预览页面
 */
export const modifyPostPreviewPage = function () {
    $('table > tbody > tr.tr1 > th').css({
        'text-align': 'left',
        'font-weight': 'normal',
        'border': '1px solid #9191ff',
        'padding': '10px',
    });
};

/**
 * 在发帖页面添加更新附件提醒
 */
export const addAttachChangeAlert = function () {
    $(document).on('click', '.abtn[id^="md_"]', function () {
        if (!$(document).data('attachUpdateAlert')) {
            alert('本反向代理服务器为了提高性能对图片设置了缓存，更新附件图片后可能需等待最多30分钟才能看到效果');
            $(document).data('attachUpdateAlert', true);
        }
    });
};

/**
 * 引入绯月表情增强插件
 */
export const importKfSmileEnhanceExtension = function () {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = 'https://kf.miaola.work/KfEmotion.min.user.js' + (typeof Info.w.resTimestamp !== 'undefined' ? '?ts=' + Info.w.resTimestamp : '');
    document.body.appendChild(script);
};

/**
 * 在撰写发帖内容时阻止关闭页面
 */
export const preventCloseWindowWhenEditPost = function () {
    window.addEventListener('beforeunload', function (e) {
        let $textArea = $(location.pathname === '/post.php' ? '#textarea' : 'textarea[name="atc_content"]');
        let content = $textArea.val();
        if (content && content !== $textArea.get(0).defaultValue && !Info.w.isSubmit) {
            let msg = '你可能正在撰写发帖内容中，确定要关闭页面吗？';
            e.returnValue = msg;
            return msg;
        }
    });

    $('form[action="post.php?"]').submit(function () {
        Info.w.isSubmit = true;
    });
};

/**
 * 在提交时保存发帖内容
 */
export const savePostContentWhenSubmit = function () {
    let $textArea = $(location.pathname === '/post.php' ? '#textarea' : 'textarea[name="atc_content"]');
    $('form[action="post.php?"]').submit(function () {
        let content = $textArea.val();
        if ($.trim(content).length > 0) sessionStorage.setItem(Const.postContentStorageName, content);
    });

    let postContent = sessionStorage.getItem(Const.postContentStorageName);
    if (postContent) {
        $(`
<div style="padding: 0 10px; line-height: 2em; text-align: left; background-color: #fefee9; border: 1px solid #99f;">
  <a class="pd_btn_link" data-name="restore" href="#">[恢复上次提交的内容]</a>
  <a class="pd_btn_link" data-name="clear" href="#">[清除]</a>
</div>
`).insertBefore($textArea).find('[data-name="restore"]').click(function (e) {
            e.preventDefault();
            $textArea.val(postContent);
            $(this).parent().find('[data-name="clear"]').click();
        }).end().find('[data-name="clear"]').click(function (e) {
            e.preventDefault();
            sessionStorage.removeItem(Const.postContentStorageName);
            $(this).parent().remove();
        });
    }
};

/**
 * 添加多余关键词警告
 */
export const addRedundantKeywordWarning = function () {
    $('input[name="diy_guanjianci"]').change(function () {
        let $this = $(this);
        let keywords = $.trim($this.val()).split(',').filter(str => str);
        if (keywords.length > 5) {
            alert('所填关键词已超过5个，多余的关键词将被忽略');
            $this.select().focus();
        }
    });
};

/**
 * 添加填充标题按钮
 */
export const addFillTitleBtn = function () {
    $('<a class="pd_btn_link" data-name="fill" href="#" title="按照格式填充标题">填充</a>').insertAfter('#btyl').click(function (e) {
        e.preventDefault();
        let value = $.trim(
            prompt(`请按格式填写标题名称，会自动填充到相应的表单中（选填项可不填）：
例：[诸神字幕组][Seiren][清恋][01-12合集][简繁日内挂][1080P][百度30D][3.25GB][BDRIP]
或 [自购][新作][nostalabel]待雪の花 ～snow drop～[MEGA长期][667MB][BMP]`)
        );
        if (!value) return;
        let matches = /(\[自购\])?(\[新作\])?(.+)\[([^\[\]]+?)(\d+D|长期)?\]\[(\d+(?:\.\d+)?(?:G|M)B?)\](?:\[([^\[\]]+)\])?/i.exec(value);
        if (!matches) {
            alert('标题格式不符合标准');
            return;
        }
        $('#diy_titlezigou').prop('checked', typeof matches[1] !== 'undefined');
        $('#diy_xinzuo').prop('checked', typeof matches[2] !== 'undefined');
        $('#diy_titlewplx').val(matches[4]);
        $('#diy_titleyxqx').val(matches[5] ? matches[5] : '');
        $('#diy_titlezytj').val(matches[6]);
        $('#diy_titlezygs').val(matches[7] ? matches[7] : '');
        $('#diy_titlezpmc').val(matches[3]).trigger('change');
    });
};

/**
 * 将发帖框内的站内链接替换为官方站点的链接
 */
export const replaceSiteLink = function () {
    $('form[name="FORM"]').submit(function () {
            let $textArea = $(this).find('textarea[name="atc_content"]');
            if (!$textArea.length) return;
            $textArea.val(
                $textArea.val().replace(
                    new RegExp(`${location.protocol}//${location.hostname.replace(/\./g, '\\.')}/(\\w+)\\.php`, 'g'),
                    'https://bbs.kforz.com/$1.php'
                )
            )
        }
    );
};
