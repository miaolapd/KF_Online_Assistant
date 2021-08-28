// ==UserScript==
// @name        发帖常用文本
// @version     1.6
// @trigger     end
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=12878948
// @description 在发帖框旁会显示常用文本列表框，选择相应项目即可在文本框里快速添加相应文本
// ==/UserScript==
'use strict';

(function () {
    if (location.pathname !== '/read.php' && location.pathname !== '/post.php') return;

    /**
     * 常用文本列表
     * 可在此增删自定义的常用文本，有三种定义方式：
     * 1. 只在option标签内定义了文本的项目：
     *    常用文本列表框和发帖框里最终显示的均为option标签内的文本，例：'<option>常用文本1</option>'
     * 2. 定义了value属性的项目：
     *    option标签内的文本会显示在常用文本列表框内，而发帖框里最终显示的将是value属性里的文本
     *    例：'<option value="这里是常用文本2！">常用文本2</option>'
     * 3. 定义了data-action属性的项目：
     *    option标签内的文本会显示在常用文本列表框内，而发帖框里最终显示的将是经过（动作列表中与data-action相匹配的）自定义函数所处理过的文本
     *    例：'<option data-action="动作标签">常用文本3...</option>'
     */
    var textList = ['<option style="color: #f00;" data-action="红包">快捷红包&hellip;</option>', '<option>感谢楼主的分享！</option>', '<option value="恭喜楼主！[s:44]">恭喜楼主！</option>'];

    // 动作列表：用于定义常用文本列表中与data-action属性相匹配的自定义函数，返回经过自定义函数处理的字符串
    var actionList = {
        '默认': function _() {
            return '';
        },
        '红包': function _() {
            var kfb = parseInt(prompt('请输入价格：', 100)); // 此处可以修改购买框的预设价格
            return !isNaN(kfb) ? '[' + 'sell=' + kfb + ']感谢楼主的红包！[/sell]' : '';
        }
    };

    $('<select style="width: 115px; margin-left: 10px;"><option data-action="默认" selected>发帖常用文本</option>' + textList.join('') + '</select>').insertAfter(location.pathname === '/read.php' ? 'input[name="Submit"]' : '[name="diy_guanjianci"]').change(function () {
        var $selectItem = $(this.selectedOptions[0]);
        var text = '';
        var action = $selectItem.data('action');
        if (action) {
            if (typeof actionList[action] === 'function') text = actionList[action]();
        } else {
            text = $selectItem.val();
        }
        if (text) {
            var $textArea = $(location.pathname === '/post.php' ? '#textarea' : '[name="atc_content"]');
            var content = $textArea.val();
            content += (content && !/\n$/.test(content) ? '\n' : '') + text;
            $textArea.val(content).focus();
            $textArea.get(0).selectionStart = content.length;
            $textArea.get(0).selectionEnd = content.length;
            this.selectedIndex = 0;
        }
    });
})();