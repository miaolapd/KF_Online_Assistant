// ==UserScript==
// @name        发帖时自动附加额外内容
// @version     2.0
// @trigger     end
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=12635726
// @description 在发帖时自动附加额外内容；可设置多组文本（发帖时将随机挑选一个进行附加），还可设置为函数；请勿加入过于影响论坛版面的文字（禁止加入图片、链接和购买框，字数有250字的限制）
// ==/UserScript==
'use strict';
(function () {
    const Util = _interopRequireWildcard(require('./Util'));
    const Info = _interopRequireDefault(require('./Info')).default;
    if (location.pathname !== '/read.php' && location.pathname !== '/post.php') return;

    const options = {
        // 附加在内容末尾的文本，如不需要则留空，可设置多组文本（发帖时将随机挑选一个进行附加），还可设置为函数（\n表示换行符）
        // 例：['\n文本1'] 或 ['\n文本1','\n文本2'] 或 function () { return '\n文本3'; }
        addText: [''],
        // 附加在内容开头的文本，如不需要则留空，可设置多组文本（发帖时将随机挑选一个进行附加），还可设置为函数（\n表示换行符）
        // 例：['文本1\n'] 或 ['文本1\n','文本2\n'] 或 function () { return '文本3\n'; }
        insertText: [''],
        // 如果原文本框内容包含了指定文本则不附加，留空表示不启用，可使用正则表达式，例：'文本4'或/Text.*4/i
        excludeText: '',
        // 附加内容的类型，0：任何时候都附加；1：只在发表新主题时附加；2：只在发表新回复时附加
        attachType: 0,
        // 在原文本框内容的字数不超过指定字数时才附加，-1表示不限制
        attachWhenLteWordNum: -1,
        // 在发帖框旁显示“不附加额外内容”的选项，true：开启；false：关闭
        showNoAttachOptionEnabled: false,
    };

    let action = Util.getUrlParam('action');
    if (action === 'modify') return;
    else if (options.attachType === 1 && (location.pathname === '/read.php' || action === 'reply' || action === 'quote')) return;
    else if (options.attachType === 2 && location.pathname === '/post.php' && !action) return;

    let _strlen = Info.w.strlen;
    Info.w.strlen = function (str) {
        let length = typeof _strlen !== 'undefined' ? _strlen(str) : str.length;
        if (length > 0 && length < 12) length = 12;
        return length;
    };

    let $form = $('form[name="FORM"][action="post.php?"]');
    if (options.showNoAttachOptionEnabled) {
        let switchHtml = '<input type="checkbox" name="noAttach" class="pd_input"> 不附加额外内容';
        if (location.pathname === '/post.php') $form.find('.pd_post_extra_option').append(`<br><label>${switchHtml}</label>`);
        else $form.find('input[name="Submit"]').after(`<label style="margin-left: 7px;">${switchHtml}</label>`);
    }
    $form.submit(function () {
        let $this = $(this);
        let $textArea = $this.find(location.pathname === '/post.php' ? '#textarea' : '[name="atc_content"]');
        let content = $textArea.val();
        if (!content) return;
        if (options.showNoAttachOptionEnabled && $this.find('[name="noAttach"]').prop('checked')) return;
        if (options.excludeText) {
            if ($.type(options.excludeText) === 'regexp') {
                if (options.excludeText.test(content)) return;
            }
            else {
                if (content.toLowerCase().includes(options.excludeText.toLowerCase())) return;
            }
        }
        if (options.attachWhenLteWordNum > -1 && content.length > options.attachWhenLteWordNum) return;

        const handleText = function (text) {
            text = text.substring(0, 250).replace(/\[(img|url|sell|audio|video).+?\/(img|url|sell|audio|video)\]/gi, '[代码已屏蔽]');
            let matches = text.match(/\[size=\d+\]/gi);
            for (let i in matches) {
                let size = parseInt(/\d+/.exec(matches[i])[0]);
                if (size >= 4) text = text.replace(matches[i], '[size=1]');
            }
            return text;
        };

        const getText = function (text) {
            if (typeof text === 'function')
                return Util.removeUnpairedBBCodeContent(handleText(text().toString()));
            else
                return Util.removeUnpairedBBCodeContent(handleText(text[Math.floor(Math.random() * text.length)]));
        };

        if (handleText('[img]test[/img]').includes('[img]')) return;
        $textArea.val(getText(options.insertText) + content + getText(options.addText));
    });
})();