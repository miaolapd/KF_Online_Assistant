/* 常量模块 */
'use strict';

// 通用存储数据名称前缀
const storagePrefix = 'pd_';

/**
 * 常量类
 */
const Const = {
    // 开启调试模式，true：开启；false：关闭
    debug: false,

    // UTC时间与论坛时间之间的时差（小时）
    forumTimezoneOffset: -8,
    // 在当天的指定时间之后领取每日奖励（北京时间），例：00:20:00
    getDailyBonusAfterTime: '00:20:00',
    // 新装备标志的持续时间（天）
    newArmMarkDuration: 1,
    // 获取自定义的争夺点数分配方案（函数），参考范例见：read.php?tid=500968&spid=13270735&sf=b09
    getCustomPoints: null,

    // 定时操作结束后的再判断间隔（秒），用于在定时模式中进行下一次定时时间的再判断
    actionFinishRetryInterval: 60,
    // 在连接超时的情况下获取剩余时间失败后的重试间隔（分钟），用于定时模式
    errorRefreshInterval: 1,
    // 在网页标题上显示定时模式提示的更新间隔（分钟）
    showRefreshModeTipsInterval: 1,
    // 领取每日争夺奖励时，遇见所设定的任务未完成时的重试间隔（分钟）
    getDailyBonusSpecialInterval: 30,
    // 提升战力光环的最小间隔时间（分钟）
    minPromoteHaloInterval: 480,
    // 在检测到当前持有的KFB或贡献未高于指定值时的下一次自动提升战力光环的间隔时间（分钟）
    promoteHaloLimitNextActionInterval: 480,
    // 进行批量提升战力光环操作的间隔时间（毫秒）
    promoteHaloActionInterval: 1000,
    // 临时存储的战力光环信息的有效期（分钟）
    tmpHaloInfoExpires: 420,
    // 在尚有剩余次数情况下的存储改点剩余次数信息的Cookie有效期（分钟）
    changePointsInfoExpires: 30,
    // 标记已去除首页已读at高亮提示的Cookie有效期（天）
    hideMarkReadAtTipsExpires: 3,
    // 神秘等级升级的提醒间隔（小时），设为0表示当升级时随时进行提醒
    smLevelUpAlertInterval: 3,
    // 神秘系数排名变化的提醒间隔（小时），设为0表示当排名变化时随时进行提醒
    smRankChangeAlertInterval: 22,

    // ajax请求的默认超时时间（毫秒）
    defAjaxTimeout: 30000,
    // ajax请求的默认时间间隔（毫秒）
    defAjaxInterval: 300,
    // 特殊情况下的ajax请求（如使用道具、打开盒子等）的时间间隔（毫秒），可设置为函数来返回值
    specialAjaxInterval() {
        if (Config.slowActionEnabled) return Math.floor(Math.random() * 4000) + 3000; // 慢速情况
        else return Math.floor(Math.random() * 200) + 1000; // 正常情况
    },
    // 部分操作的最小时间间隔（毫秒）
    minActionInterval: 1000,
    // 银行相关操作的时间间隔（毫秒）
    bankActionInterval: 5000,

    // 购买帖子提醒的最低售价（KFB）
    minBuyThreadWarningSell: 6,
    // 统计楼层最大能访问的帖子页数
    statFloorMaxPage: 300,
    // 可进行自助评分的版块ID列表
    selfRateFidList: [41, 67, 92, 127, 68, 163],
    // 自助评分错标范围百分比
    ratingErrorSizePercent: 3,
    // 自定义快捷导航菜单内容
    // 格式：'<li><a href="导航链接">导航项名称</a></li>'
    customFastNavMenuContent: '',

    // 通用存储数据名称前缀
    storagePrefix: storagePrefix,
    // 存储多重引用数据的LocalStorage名称
    multiQuoteStorageName: storagePrefix + 'multiQuote',
    // 保存发帖内容的SessionStorage名称
    postContentStorageName: storagePrefix + 'postContent',
    // 存储临时点数分配记录列表的LocalStorage名称
    tempPointsLogListStorageName: storagePrefix + 'tempPointsLogList',

    // 神秘等级升级提醒的临时日志名称
    smLevelUpTmpLogName: 'SmLevelUp',
    // 神秘系数排名变化提醒的临时日志名称
    smRankChangeTmpLogName: 'SmRankChange',
    // 存储上一次自动更换ID颜色的临时日志名称
    prevAutoChangeIdColorTmpLogName: 'PrevAutoChangeIdColor',
    // 存储战力光环信息的临时日志名称
    haloInfoTmpLogName: 'HaloInfo',
    // 标记在争夺完后自动一键开盒的临时日志名称
    autoOpenBoxesAfterLootTmpLogName: 'AutoOpenBoxesAfterLoot',

    // 标记已领取每日奖励的Cookie名称
    getDailyBonusCookieName: 'getDailyBonus',
    // 标记已提升战力光环的Cookie名称
    promoteHaloCookieName: 'promoteHalo',
    // 标记正在检查争夺情况的Cookie名称
    lootCheckingCookieName: 'lootChecking',
    // 标记正在进行争夺攻击的Cookie名称
    lootAttackingCookieName: 'lootAttacking',
    // 存储改点剩余次数信息的Cookie名称
    changePointsInfoCookieName: 'changePointsInfo',
    // 标记已完成自动争夺的Cookie名称
    lootCompleteCookieName: 'lootComplete',
    // 标记准备购买物品的Cookie名称
    buyItemReadyCookieName: 'buyItemReady',
    // 标记已购买物品的Cookie名称
    buyItemCookieName: 'buyItem',
    // 标记抽卡的Cookie名称
    drawCardCookieName: 'drawCard',
    // 标记已去除首页已读at高亮提示的Cookie名称
    hideReadAtTipsCookieName: 'hideReadAtTips',
    // 存储之前已读的at提醒信息的Cookie名称
    prevReadAtTipsCookieName: 'prevReadAtTips',
    // 标记已自动更换ID颜色的Cookie名称
    autoChangeIdColorCookieName: 'autoChangeIdColor',
};

export default Const;
