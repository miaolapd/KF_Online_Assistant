// ==UserScript==
// @name        统计各楼层的彩票数字（ft1073833专用版）
// @version     1.5
// @trigger     end
// @author      喵拉布丁
// @homepage    read.php?tid=500968&spid=12522542
// @description 用于统计ft1073833争夺彩票中各楼层的数字，在标题包含指定关键字的帖子的顶楼下方会显示“彩票统计”的按钮，点击即可进行彩票统计
// ==/UserScript==
'use strict';

function _slicedToArray(e, i) { return _iterableToArrayLimit(e, i) || _unsupportedIterableToArray(e, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, t) { var e = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (Array.isArray(r) && (null == e || e === ("undefined" != typeof Symbol && [][Symbol.iterator]) || e === []["@@iterator"])) return r; if (null != e) { var l, n, i, a, u = [], o = !0, f = !1; try { if (i = (e = e.call(r)).next, 0 === t) { if (Object(e) !== e) return; o = !1; } else for (; !(o = (l = i.call(e)).done) && (u.push(l.value), u.length !== t); o = !0); } catch (r) { f = !0, n = r; } finally { try { if (!o && null != e.return && (a = e.return(), Object(a) !== a)) return; } finally { if (f) throw n; } } return u; } }
function _createForOfIteratorHelper(e, t) { var _n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"]; if (!_n) { if (Array.isArray(e) || (_n = _unsupportedIterableToArray(e)) || t && e && "number" == typeof e.length) { _n && (e = _n); var o = 0, F = function F() {}; return { s: F, n: function n() { return o >= e.length ? { done: !0 } : { done: !1, value: e[o++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var a, u, i = !0; return { s: function s() { _n = _n.call(e); }, n: function n() { i = !0; var r = _n.next(); return r.done ? { done: !0 } : { value: r.value, done: i = !1 }; }, e: function e(r) { a = !0, u = r; }, f: function f() { try { i || null == _n.return || _n.return(); } finally { if (a) throw u; } } }; }
function _unsupportedIterableToArray(t, e) { if (t) { if ("string" == typeof t) return _arrayLikeToArray(t, e); var o = {}.toString.call(t).slice(8, -1); return "Object" === o && t.constructor && (o = t.constructor.name), "Map" === o || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? _arrayLikeToArray(t, e) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function () {
  // 匹配彩票数字的正则表达式
  var numberRegex = /【\s*(\d+)\s*】/;
  // 各等奖中与中奖数字相差的范围
  var levelRangeList = [0, 5, 50];
  // 在标题包含指定关键字的帖子里显示彩票统计的按钮（留空表示任意标题均可）
  var threadTitle = '每周红包';
  var Util = _interopRequireWildcard(require('./Util'));
  var Msg = _interopRequireWildcard(require('./Msg'));
  var Dialog = _interopRequireWildcard(require('./Dialog'));
  var Const = _interopRequireDefault(require('./Const')).default;
  var Read = _interopRequireWildcard(require('./Read'));
  if (location.pathname !== '/read.php' || Util.getCurrentThreadPage() !== 1) return;
  if (threadTitle && !Read.getThreadTitle().includes(threadTitle)) return;
  $('<li><a href="#" title="统计各楼层的彩票数字">[彩票统计]</a></li>').insertBefore('.readtext:first + .readlou > div > .pages > li:first-child').click(function (e) {
    e.preventDefault();
    var tid = Util.getUrlParam('tid');
    if (!tid) return;
    var targetNumber = prompt('请输入本次的中奖数字', 0);
    if (targetNumber === null) return;
    targetNumber = parseInt(targetNumber);
    if (isNaN(targetNumber) || targetNumber < 0) {
      alert('中奖数字格式不正确');
      return;
    }
    var matches = /(\d+)页/.exec($('.pages:eq(0) > li:last-child > a').text());
    var maxPage = matches ? parseInt(matches[1]) : 1;
    var $wait = Msg.wait("<strong>\u6B63\u5728\u7EDF\u8BA1\u6570\u5B57\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em class=\"pd_countdown\">".concat(maxPage, "</em></i>") + "<a class=\"pd_stop_action\" href=\"#\">\u505C\u6B62\u64CD\u4F5C</a>");
    $(document).clearQueue('StatLottery');
    var isStop = false;
    var floorList = [];
    $.each(new Array(maxPage), function (index) {
      $(document).queue('StatLottery', function () {
        $.ajax({
          type: 'GET',
          url: "read.php?tid=".concat(tid, "&page=").concat(index + 1, "&t=").concat(new Date().getTime()),
          timeout: Const.defAjaxTimeout,
          success: function success(html) {
            var matches = html.match(/<a name=\d+><\/a>(.|\n|\r\n)+?<span style=".+?">\d+楼<\/span> <span style=".+?">(.|\n|\r\n)+?<\/td><\/tr><\/table>\r\n<\/div>/gi);
            for (var i in matches) {
              var floorMatches = /<a name=(\d+)><\/a>(?:.|\n|\r\n)+?<span style=".+?">(\d+)楼<\/span>(?:.|\n|\r\n)+?<a href="profile\.php\?action=show&uid=\d+".+?>(.+?)<\/a>((?:.|\n|\r\n)+)$/i.exec(matches[i]);
              if (!floorMatches) continue;
              var pid = parseInt(floorMatches[1]);
              var floor = parseInt(floorMatches[2]);
              var name = floorMatches[3];
              var content = floorMatches[4].replace(/<fieldset><legend>Quote:(.|\n|\r\n)+?<\/fieldset>/gi, '');
              var numberMatches = numberRegex.exec(content);
              floorList[floor] = {
                pid: pid,
                name: name,
                number: numberMatches ? parseInt(numberMatches[1]) : -1
              };
            }
          },
          error: function error() {
            isStop = true;
            alert('因连接超时，统计彩票数字操作中止');
          },
          complete: function complete() {
            var $countdown = $('.pd_countdown:last');
            $countdown.text(parseInt($countdown.text()) - 1);
            isStop = isStop || $countdown.closest('.pd_msg').data('stop');
            if (isStop) $(document).clearQueue('StatLottery');
            if (isStop || index === maxPage - 1) {
              Msg.remove($wait);
              //console.log(floorList);
              var numberList = {};
              for (var i = 1; i < floorList.length; i++) {
                var _floorList$i = floorList[i],
                  pid = _floorList$i.pid,
                  floor = _floorList$i.floor,
                  name = _floorList$i.name,
                  number = _floorList$i.number;
                if (pid && number >= 0) {
                  if (typeof numberList[name] === 'undefined') {
                    numberList[name] = {
                      floor: i,
                      pid: pid,
                      number: number
                    };
                  } else {
                    floorList[i].number = -2;
                  }
                }
              }
              //console.log(numberList);

              var dialogHtml = "\n<div class=\"pd_cfg_main\">\n  <div style=\"width: 400px; max-height: 550px; overflow: auto; background-color: #fff; margin: 5px 0; line-height: 20px;\" id=\"pdStatLotteryList\"></div>\n</div>";
              var $dialog = Dialog.create('pd_stat_lottery', '彩票统计', dialogHtml);
              var floorContent = '';
              var normalNum = 0,
                errorNum = 0,
                repeatNum = 0;
              for (var _i = 1; _i < floorList.length; _i++) {
                var _floorList$_i = floorList[_i],
                  _pid = _floorList$_i.pid,
                  _name = _floorList$_i.name,
                  _number = _floorList$_i.number;
                if (_pid) {
                  floorContent += "\n<li>\n  \u3010<a target=\"_blank\" href=\"read.php?tid=".concat(tid, "&spid=").concat(_pid, "\">").concat(_i, "\u697C</a>\u3011").concat(_name, "\uFF1A").concat(_number > 0 ? "<span class=\"pd_highlight\">".concat(_number, "</span>") : "<span class=\"pd_notice\">".concat(_number === -2 ? '重复回贴' : '格式不正确', "</span>"), "\n</li>");
                  if (_number === -1) errorNum++;else if (_number === -2) repeatNum++;else if (_number >= 0) normalNum++;
                } else {
                  floorContent += "<li>\u3010".concat(_i, "\u697C\u3011<span class=\"pd_notice\">\u672A\u627E\u5230\u8BE5\u697C\u5C42</span></li>");
                }
              }
              floorContent = "\n<ul style=\"margin-top: 10px;\">\n  <li><strong>\u697C\u5C42\u7EDF\u8BA1\u60C5\u51B5\uFF1A</strong></li>\n  <li>\n    \uFF08\u6B63\u5E38\u7EDF\u8BA1\uFF1A<b class=\"pd_highlight\">".concat(normalNum, "</b>\u4E2A\uFF1B\u683C\u5F0F\u4E0D\u6B63\u786E\uFF1A<b class=\"pd_highlight\">").concat(errorNum, "</b>\u4E2A\uFF1B\u91CD\u590D\u56DE\u8D34\uFF1A<b class=\"pd_highlight\">").concat(repeatNum, "</b>\u4E2A\uFF09\n  </li>\n  ").concat(floorContent ? floorContent : '<li class="pd_notice">无</li>', "\n</ul>");
              var levelContentList = new Array(levelRangeList.length);
              var _iterator = _createForOfIteratorHelper(Util.entries(numberList)),
                _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var _step$value = _slicedToArray(_step.value, 2),
                    _name2 = _step$value[0],
                    _step$value$ = _step$value[1],
                    _pid2 = _step$value$.pid,
                    _floor = _step$value$.floor,
                    _number2 = _step$value$.number;
                  if (_number2 >= 0) {
                    for (var _i2 = 0; _i2 < levelContentList.length; _i2++) {
                      if (_number2 >= targetNumber - levelRangeList[_i2] && _number2 <= targetNumber + levelRangeList[_i2]) {
                        if (typeof levelContentList[_i2] === 'undefined') levelContentList[_i2] = '';
                        levelContentList[_i2] += "\n<li>\n  \u3010<a target=\"_blank\" href=\"read.php?tid=".concat(tid, "&spid=").concat(_pid2, "\">").concat(_floor, "\u697C</a>\u3011").concat(_name2, "\uFF1A<span class=\"pd_highlight\">").concat(_number2, "</span>\n</li>");
                        break;
                      }
                    }
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              var resultContent = "<div><strong>\u4E2D\u5956\u60C5\u51B5 (\u4E2D\u5956\u6570\u5B57\u3010<span class=\"pd_highlight\">".concat(targetNumber, "</span>\u3011)\uFF1A</strong></div>");
              var _iterator2 = _createForOfIteratorHelper(levelContentList.entries()),
                _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var _step2$value = _slicedToArray(_step2.value, 2),
                    _i3 = _step2$value[0],
                    levelContent = _step2$value[1];
                  resultContent += "<ul><li><b class=\"pd_highlight\">".concat(_i3 + 1, "\u7B49\u5956(\xB1").concat(levelRangeList[_i3], ")\uFF1A</b></li>");
                  if (levelContent) resultContent += levelContent;else resultContent += '<li class="pd_notice">空缺</li>';
                  resultContent += '</ul>';
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              $dialog.find('#pdStatLotteryList').html(resultContent + floorContent);
              Dialog.show('pd_stat_lottery');
            } else {
              setTimeout(function () {
                return $(document).dequeue('StatLottery');
              }, Const.defAjaxInterval);
            }
          }
        });
      });
    });
    $(document).dequeue('StatLottery');
  });
})();