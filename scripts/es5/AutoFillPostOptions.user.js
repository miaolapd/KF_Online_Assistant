// ==UserScript==
// @name        在发帖时自动填充指定选项
// @version     1.0
// @trigger     end
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=13742299
// @description 在发帖时为指定版块自动填充所设定的选项
// ==/UserScript==
'use strict';

(function () {
    if (location.pathname !== '/post.php' || $('input[name="action"]').val() !== 'new') return;

    // 发帖选项列表，格式：{版块ID: {'帖子分类': '帖子分类名称', '网盘类型': '网盘名称', '有效期限': '有效期限', '资源体积': '资源体积', '资源格式': '资源格式名称', '资源名称': '资源名称', '是否自购': true, '是否新作': true}}
    // 注：只需设定需要自动填充的选项，不必非要设定所有选项
    // 例：{92: {'帖子分类': '完结动画', '网盘类型': '百度', '有效期限': '长期', '资源格式': 'BDRIP', '资源名称': '', '是否自购': true, '是否新作': true}}
    var postOptionList = {
        92: { '帖子分类': '完结动画', '网盘类型': '百度', '有效期限': '长期', '资源格式': 'BDRIP' },
        68: { '帖子分类': '动漫音乐', '网盘类型': 'MEGA', '有效期限': '30D', '资源格式': 'FLAC', '是否自购': true }
    };

    var fid = parseInt($('input[name="fid"]').val());
    if (!(fid in postOptionList)) return;

    /**
     * 获取字段名称
     * @param {string} key 选项名称
     * @returns {string} 字段名称
     */
    var getFieldName = function getFieldName(key) {
        switch (key) {
            case '网盘类型':
                return '#diy_titlewplx';
            case '资源体积':
                return '#diy_titlezytj';
            case '有效期限':
                return '#diy_titleyxqx';
            case '资源格式':
                return '#diy_titlezygs';
            case '资源名称':
                return '#diy_titlezpmc';
            case '是否自购':
                return '#diy_titlezigou';
            case '是否新作':
                return '#diy_xinzuo';
            default:
                return key;
        }
    };

    $.each(postOptionList[fid], function (key, value) {
        if (key === '帖子分类') {
            var $threadType = $('select[name="p_type"]');
            var threadTypeId = $threadType.find('option').filter(function (i, elem) {
                return $(elem).text() === value;
            }).attr('value');
            if (threadTypeId) {
                $threadType.val(threadTypeId);
            }
        } else {
            if (typeof value === 'boolean') {
                $(getFieldName(key)).prop('checked', value);
            } else {
                $(getFieldName(key)).val(value);
            }
        }
    });
    $('#diy_titlezpmc').trigger('change');
})();