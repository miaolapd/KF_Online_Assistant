/* 信息模块 */
'use strict';

/**
 * 信息类
 */
const Info = {
    // 用户ID
    uid: 0,
    // 用户名
    userName: '',
    // 是否位于首页
    isInHomePage: location.pathname === '/' || location.pathname === '/index.php',
    // 是否为移动版
    isMobile: false,
    // 当前域名是否在特殊域名下
    isInSpecialDomain: location.host.endsWith('.miaola.info') || location.host.endsWith('.miaola.work') || location.host.endsWith('.koyuki.cc'),
    // 版本号
    version: '',
    // 当前窗口
    w: typeof unsafeWindow !== 'undefined' ? unsafeWindow : window,
    /**
     * 助手设置和日志的存储位置类型
     * Default：存储在浏览器的localStorage中，设置仅按域名区分，日志同时按域名和uid区分；
     * ByUid：存储在油猴脚本的数据库中，设置和日志仅按uid区分;
     * Global：存储在油猴脚本的数据库中，各域名和各uid均使用全局设置，日志仅按uid区分；
     */
    storageType: 'Default',
    // 用户菜单区域
    $userMenu: $('#kf_information > ul'),
    // AJAX请求统计
    ajaxStat: {},
};

export default Info;
