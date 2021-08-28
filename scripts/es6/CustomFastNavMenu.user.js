// ==UserScript==
// @name        自定义快捷导航菜单
// @version     1.0
// @trigger     start
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=13082960
// @description 可为快捷导航菜单添加自定义的导航内容
// ==/UserScript==
'use strict';
const Const = require('./Const').default;
// 自定义侧边栏导航内容
// 格式：'<li><a href="导航链接">导航项名称</a></li>'
Const.customFastNavMenuContent =
    '<li><a href="test1.php">导航项1</a></li>' +
    '<li><a href="test2.php">导航项2</a></li>' +
    '<li><a href="test3.php">导航项3</a></li>';