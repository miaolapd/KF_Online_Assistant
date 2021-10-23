/* 配置模块 */
'use strict';
import Info from './Info';
import * as Util from './Util';
import Const from './Const';
import * as Log from './Log';
import * as TmpLog from './TmpLog';
import * as Item from './Item';
import * as Read from './Read';

// 保存设置的键值名称
const name = Const.storagePrefix + 'config';

/**
 * 配置类
 */
export const Config = {
    // 是否开启定时模式，可按时进行自动操作（包括自动领取每日奖励、自动提升战力光环、自动争夺，需开启相关功能），只在论坛首页生效（不开启此模式的话只能在刷新页面后才会进行操作），true：开启；false：关闭
    timingModeEnabled: false,
    // 在首页的网页标题上显示定时模式提示的方案，auto：停留一分钟后显示；always：总是显示；never：不显示
    showTimingModeTipsType: 'auto',

    // 是否自动领取每日奖励，true：开启；false：关闭
    autoGetDailyBonusEnabled: false,

    // 争夺各层分配点数列表，例：{1:{"力量":1,"体质":2,"敏捷":3,"灵活":4,"智力":5,"意志":6}, 10:{"力量":6,"体质":5,"敏捷":4,"灵活":3,"智力":2,"意志":1}}
    levelPointList: {},
    // 是否使用自定义点数分配脚本（在设置了相应的自定义脚本的情况下，仅限自动攻击相关按钮有效），true：开启；false：关闭
    customPointsScriptEnabled: false,
    // 是否在攻击时如有剩余属性点则进行提醒（仅限自动攻击相关按钮有效），true：开启；false：关闭
    unusedPointNumAlertEnabled: true,
    // 是否总是打开个人属性/装备界面，true：开启；false：关闭
    alwaysOpenPointAreaEnabled: false,

    // 是否自动提升战力光环，true：开启；false：关闭
    autoPromoteHaloEnabled: false,
    // 自动提升战力光环的花费类型，1：花费100KFB；2：花费1000KFB；11：花费0.2贡献；12：花费2贡献
    promoteHaloCostType: 1,
    // 自动提升战力光环的间隔时间（小时），最低值：8
    promoteHaloInterval: 8,
    // 是否自动判断提升战力光环的间隔时间（在有剩余次数时尽可能使用），true：开启；false：关闭
    promoteHaloAutoIntervalEnabled: true,
    // 在操作后所剩余的KFB或贡献高于指定值时才自动提升战力光环，设为0表示不限制
    promoteHaloLimit: 0,

    // 是否自动购买物品，true：开启；false：关闭
    autoBuyItemEnabled: false,
    // 购买物品ID列表，例：['101','103|102']
    buyItemIdList: [],
    // 在当天的指定时间之后购买物品（本地时间），例：00:40:00
    buyItemAfterTime: '00:40:00',

    // 是否在神秘等级升级后进行提醒，只在首页生效，true：开启；false：关闭
    smLevelUpAlertEnabled: false,
    // 是否在神秘系数排名发生变化时进行提醒，只在首页生效，true：开启；false：关闭
    smRankChangeAlertEnabled: false,
    // 在首页帖子链接旁显示快速跳转至页末的链接，true：开启；false：关闭
    homePageThreadFastGotoLinkEnabled: true,

    // 是否在版块页面中显示帖子页数快捷链接，true：开启；false：关闭
    showFastGotoThreadPageEnabled: false,
    // 在帖子页数快捷链接中显示页数链接的最大数量
    maxFastGotoThreadPageNum: 5,
    // 帖子每页楼层数量，用于电梯直达和帖子页数快捷链接等功能，如果修改了论坛设置里的“文章列表每页个数”，请在此修改成相同的数目
    perPageFloorNum: 20,
    // 是否在版块页面中高亮今日新发表帖子的发表时间，true：开启；false：关闭
    highlightNewPostEnabled: true,

    // 帖子内容字体大小，设为0表示使用默认大小，推荐值：14
    threadContentFontSize: 0,
    // 自定义本人的神秘颜色（包括帖子页面的ID显示颜色和楼层边框颜色，仅自己可见），例：#009cff，如无需求可留空
    customMySmColor: '',
    // 是否将帖子中的绯月其它域名的链接修改为当前域名，true：开启；false：关闭
    modifyKfOtherDomainEnabled: true,
    // 是否在帖子页面开启多重回复和多重引用的功能，true：开启；false：关闭
    multiQuoteEnabled: true,
    // 是否在楼层内的用户名旁显示该用户的自定义备注，true：开启；false：关闭
    userMemoEnabled: false,
    // 用户自定义备注列表，格式：{'用户名':'备注'}，例：{'李四':'张三的马甲','王五':'张三的另一个马甲'}
    userMemoList: {},
    // 是否在帖子页面解析多媒体标签，true：开启；false：关闭
    parseMediaTagEnabled: true,
    // 是否在帖子和搜索页面通过左右键进行翻页，true：开启；false：关闭
    turnPageViaKeyboardEnabled: false,
    // 是否在购买帖子时页面不跳转，true：开启；false：关闭
    buyThreadNoJumpEnabled: true,
    // 是否保存购买帖子记录（需同时开启“在购买帖子时页面不跳转”的功能），true：开启；false：关闭
    saveBuyThreadLogEnabled: false,
    // 购买帖子记录的最大保存数量
    saveBuyThreadLogMaxNum: 2000,
    // 是否在撰写发帖内容时阻止关闭页面，true：开启；false：关闭
    preventCloseWindowWhenEditPostEnabled: true,
    // 是否在提交时自动保存发帖内容，以便在出现意外情况时能够恢复发帖内容，true：开启；false：关闭
    autoSavePostContentWhenSubmitEnabled: false,
    // 是否在发帖框上显示绯月表情增强插件（仅在miaola.work域名下生效），true：开启；false：关闭
    kfSmileEnhanceExtensionEnabled: false,

    // 默认的消息显示时间（秒），设置为-1表示永久显示
    defShowMsgDuration: -1,
    // 是否禁用jQuery的动画效果（推荐在配置较差的机器上使用），true：开启；false：关闭
    animationEffectOffEnabled: false,
    // 在页面上方显示搜索对话框的链接，true：开启；false：关闭
    showSearchLinkEnabled: true,
    // 是否为顶部导航栏添加快捷导航菜单，true：开启；false：关闭
    addFastNavMenuEnabled: true,
    // 是否修改顶部用户菜单旁的新提醒的颜色，true：开启；false：关闭
    changeNewTipsColorEnabled: true,
    // 是否为页面添加自定义的CSS内容，true：开启；false：关闭
    customCssEnabled: false,
    // 自定义CSS的内容
    customCssContent: '',
    // 是否执行自定义的脚本，true：开启；false：关闭
    customScriptEnabled: false,
    // 自定义脚本列表
    customScriptList: [],
    // 浏览器类型，auto：自动检测；desktop：桌面版；mobile：移动版
    browseType: 'auto',
	// 是否为管理成员，true：开启；false：关闭
	adminMemberEnabled: false,
    // 是否保持顶部导航栏置顶，true：开启；false：关闭
    navBarAlwaysTopEnabled: true,
    // 是否在快捷导航中显示咕咕镇的链接，true：开启；false：关闭
    showGuGuZhenInFastNavEnabled: false,

    // 是否开启关注用户的功能，true：开启；false：关闭
    followUserEnabled: false,
    // 关注用户列表，格式：[{name:'用户名'}]，例：[{name:'张三'}, {name:'李四'}]
    followUserList: [],
    // 是否高亮所关注用户在首页下的帖子链接，true：开启；false：关闭
    highlightFollowUserThreadInHPEnabled: true,
    // 是否高亮所关注用户在帖子列表页面下的帖子链接，true：开启；false：关闭
    highlightFollowUserThreadLinkEnabled: true,
    // 是否高亮所关注用户在帖子页面下的楼层的边框，true：开启；false：关闭
    highlightFollowUserFloorEnabled: true,
    // 是否开启屏蔽用户的功能，true：开启；false：关闭
    blockUserEnabled: false,
    // 屏蔽用户的默认屏蔽类型，0：屏蔽主题和回贴；1：仅屏蔽主题；2：仅屏蔽回贴
    blockUserDefaultType: 0,
    // 是否屏蔽被屏蔽用户的@提醒，true：开启；false：关闭
    blockUserAtTipsEnabled: true,
    // 屏蔽用户的版块屏蔽范围，0：所有版块；1：包括指定的版块；2：排除指定的版块
    blockUserForumType: 0,
    // 屏蔽用户的版块ID列表，例：[16, 41, 67, 57, 84, 92, 127, 68, 163, 182, 9]
    blockUserFidList: [],
    // 屏蔽用户列表，格式：[{name:'用户名', type:屏蔽类型}]，例：[{name:'张三', type:0}, {name:'李四', type:1}]
    blockUserList: [],
    // 是否开启屏蔽标题中包含指定关键字的帖子的功能，true：开启；false：关闭
    blockThreadEnabled: false,
    // 屏蔽帖子的默认版块屏蔽范围，0：所有版块；1：包括指定的版块；2：排除指定的版块
    blockThreadDefForumType: 0,
    // 屏蔽帖子的默认版块ID列表，例：[16, 41, 67, 57, 84, 92, 127, 68, 163, 182, 9]
    blockThreadDefFidList: [],
    // 屏蔽帖子的关键字列表，格式：[{keyWord:'关键字', includeUser:['包括的用户名'], excludeUser:['排除的用户名'], includeFid:[包括指定的版块ID], excludeFid:[排除指定的版块ID]}]
    // 关键字可使用普通字符串或正则表达式（正则表达式请使用'/abc/'的格式），includeUser、excludeUser、includeFid和excludeFid这三项为可选
    // 例：[{keyWord: '标题1'}, {keyWord: '标题2', includeUser:['用户名1', '用户名2'], includeFid: [5, 56]}, {keyWord: '/关键字A.*关键字B/i', excludeFid: [92, 127, 68]}]
    blockThreadList: [],

    // 日志保存天数
    logSaveDays: 30,
    // 日志内容的排序方式，time：按时间顺序排序；type：按日志类别排序
    logSortType: 'time',
    // 日志统计范围类型，current：显示当天统计结果；custom：显示距该日N天内的统计结果；all：显示全部统计结果
    logStatType: 'current',
    // 显示距该日N天内的统计结果（用于日志统计范围）
    logStatDays: 7,

    // 是否自动更换ID颜色，true：开启；false：关闭
    autoChangeIdColorEnabled: false,
    // 自动更换ID颜色的更换顺序类型，random：随机；sequence：顺序
    autoChangeIdColorType: 'random',
    // 自动更换ID颜色的时间间隔（小时）
    autoChangeIdColorInterval: 24,
    // 是否从当前所有可用的ID颜色中进行更换，true：开启；false：关闭
    changeAllAvailableIdColorEnabled: true,
    // 自定义自动更换ID颜色的颜色ID列表，例：[1,8,13,20]
    customAutoChangeIdColorList: [],

    // 是否延长部分批量操作的时间间隔（如使用道具、打开盒子等），true：开启；false：关闭
    slowActionEnabled: false,
    // 是否自动保存我的装备信息，true：开启；false：关闭
    autoSaveArmsInfoEnabled: false,
    // 是否分组排列装备，true：开启；false：关闭
    sortArmsByGroupEnabled: false,
    // 装备备注，格式：{装备ID:'备注信息'}，例：{123456:'备注信息'}
    armsMemo: {},
    // 是否在打开盒子后熔炼装备，true：开启；false：关闭
    smeltArmsAfterOpenBoxesEnabled: false,
    // 是否在打开盒子后使用道具，true：开启；false：关闭
    useItemsAfterOpenBoxesEnabled: false,
    // 是否在打开盒子后出售道具，true：开启；false：关闭
    sellItemsAfterOpenBoxesEnabled: false,
    // 默认的批量打开的盒子种类列表，例：['普通盒子', '幸运盒子', '稀有盒子']
    defOpenBoxTypeList: [],
    // 默认的批量熔炼的装备种类列表，例：['普通的长剑', '幸运的长剑', '普通的短弓']
    defSmeltArmTypeList: [],
    // 默认的批量使用的道具种类列表，例：['蕾米莉亚同人漫画', '整形优惠卷']
    defUseItemTypeList: [],
    // 默认的批量出售的道具种类列表，例：['蕾米莉亚同人漫画', '整形优惠卷']
    defSellItemTypeList: [],
	// 是否在一键开盒后显示装备最终加成，true：开启；false：关闭
	showArmsFinalAdditionAfterOpenBoxesEnabled: false,
};

/**
 * 初始化
 */
export const init = function () {
    Info.w.Config = $.extend(true, {}, Config);
    if (typeof GM_getValue !== 'undefined') {
        Info.storageType = GM_getValue('StorageType');
        if (Info.storageType !== 'ByUid' && Info.storageType !== 'Global') Info.storageType = 'Default';
    }
    read();
};

/**
 * 读取设置
 */
export const read = function () {
    let options = Util.readData(Info.storageType === 'ByUid' ? name + '_' + Info.uid : name);
    if (!options) return;
    try {
        options = JSON.parse(options);
    }
    catch (ex) {
        return;
    }
    if (!options || $.type(options) !== 'object' || $.isEmptyObject(options)) return;
    options = normalize(options);
    Info.w.Config = $.extend(true, {}, Config, options);
};

/**
 * 写入设置
 */
export const write = function () {
    let options = Util.getDifferenceSetOfObject(Config, Info.w.Config);
    Util.writeData(Info.storageType === 'ByUid' ? name + '_' + Info.uid : name, JSON.stringify(options));
};

/**
 * 清空设置
 */
export const clear = () => Util.deleteData(Info.storageType === 'ByUid' ? name + '_' + Info.uid : name);

/**
 * 更改存储类型
 * @param {string} storageType 要更改的存储类型
 */
export const changeStorageType = function (storageType) {
    let log = Log.read();
    let tmpLog = TmpLog.read();
    let armsInfo = Item.readArmsInfo();
    let buyThreadLog = Read.readBuyThreadLog();
    Info.storageType = storageType;
    if (typeof GM_setValue !== 'undefined') GM_setValue('StorageType', Info.storageType);
    if (!Util.deepEqual(Config, Info.w.Config) || !$.isEmptyObject(log)) {
        if (confirm('是否将助手设置和日志转移到对应存储类型中？（对应存储类型中的数据将被覆盖）')) {
            write();
            Log.write(log);
            TmpLog.write(tmpLog);
            Item.writeArmsInfo(armsInfo);
            Read.writeBuyThreadLog(buyThreadLog);
        }
    }
};

/**
 * 获取经过规范化的Config对象
 * @param {{}} options 待处理的Config对象
 * @returns {{}} 经过规范化的Config对象
 */
export const normalize = function (options) {
    let settings = {};
    if ($.type(options) !== 'object') return settings;
    for (let [key, value] of Util.entries(options)) {
        if (key in Config && $.type(value) === $.type(Config[key])) {
            settings[key] = value;
        }
    }
    return settings;
};

/**
 * 清除数据
 * @param {string} name 要清除的数据名称
 */
export const clearData = function (name) {
    if (name === 'cookies') {
        for (let key in Const) {
            if (/CookieName$/.test(key)) {
                Util.deleteCookie(Const[key]);
            }
        }
    }
    else if (name === 'tmpData') {
        TmpLog.clear();
        localStorage.removeItem(Const.multiQuoteStorageName);
        localStorage.removeItem(Const.tempPointsLogListStorageName);
    }
    else if (name === 'config') {
        clear();
    }
    else if (name === 'log') {
        Log.clear();
    }
    else if (name === 'armsInfo') {
        Item.clearArmsInfo();
    }
    else if (name === 'buyThreadLog') {
        Read.clearBuyThreadLog();
    }
};
