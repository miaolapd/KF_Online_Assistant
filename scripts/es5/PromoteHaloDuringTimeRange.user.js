// ==UserScript==
// @name        在指定时间段内提升战力光环
// @version     1.0
// @trigger     start
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=13137937
// @description 在指定时间段内才开启自动提升战力光环的功能
// ==/UserScript==
'use strict';

(function () {
    // 在指定时间段内才开启自动提升战力光环的功能，例：'18:00:00-23:59:59'
    var timeRange = '18:00:00-23:59:59';

    var Util = require('./Util');
    var writeConfig = require('./Config').write;
    var oriEnabled = Config.autoPromoteHaloEnabled;
    Config.autoPromoteHaloEnabled = Util.isBetweenInTimeRange(new Date(), timeRange);
    if (Config.autoPromoteHaloEnabled !== oriEnabled) {
        console.log('【自动提升战力光环】设置被修改为：' + Config.autoPromoteHaloEnabled);
        writeConfig();
    }
})();