// ==UserScript==
// @name        自定义指定用户的头像
// @version     1.2
// @trigger     end
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=12418035
// @description 将指定用户的头像修改为自定义的头像，也可以用来更换指定用户的卡片头像的图片（需该用户正在使用卡片作为头像）
// ==/UserScript==
'use strict';
(function () {
    if (location.pathname !== '/read.php') return;
    // 格式：{userName: '用户名', url: '新头像URL', width: 头像宽度(可选), height: 头像高度(可选), oldUrlString: '原头像URL的文件名(可选)'}
    // 注：oldUrlString表示仅当指定用户的原头像URL包含了指定文件名的情况下，才替换成新头像（意即在该用户再次更换了新头像后就不进行替换了），如无需求请留空
    const avatarList = [
        {userName: '张三', url: 'xxx.jpg', width: 140, height: 140},
        {userName: '李四', url: 'http://xxx/xxx.jpg', width: 140, height: 140, oldUrlString: '93957.jpg'},
        {userName: '信仰风', url: 'ys/card/30002.png', oldUrlString: '20002.png'},
    ];

    $('.readidmsbottom > a[href^="profile.php?action=show&uid="], .readidmleft > a').each(function () {
        let $this = $(this);
        let userName = $this.text().trim();
        let avatar = avatarList.find(avatar => avatar.userName === userName);
        if (!avatar) return;
        let type = $this.is('.readidmleft > a') ? 2 : 1;
        let $img = null;
        if (type === 2) $img = $this.closest('.readidm');
        else $img = $this.parent('.readidmsbottom').prev('.readidmstop').find('img');
        if (avatar.oldUrlString) {
            let url = '';
            if (type === 2) url = $img.css('background-image');
            else url = $img.attr('src');
            if (!url.includes(avatar.oldUrlString)) return;
        }
        //console.log('替换了【' + avatar.userName + '】的头像：' + avatar.url);
        if (type === 2) {
            $img.css('background-image', `url("${avatar.url}")`);
        }
        else {
            $img.attr('src', avatar.url);
            if (avatar.width) $img.css('width', avatar.width + 'px');
            if (avatar.height) $img.css('height', avatar.height + 'px');
        }
    });
})();