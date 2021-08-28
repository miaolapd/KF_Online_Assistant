/* 银行模块 */
'use strict';
import * as Util from './Util';
import * as Msg from './Msg';
import Const from './Const';
import * as Log from './Log';
import * as TmpLog from './TmpLog';
import * as Public from './Public';
import * as Script from './Script';

// 最低转账数额
let minTransferNum = 0;
// 最高转账数额
let maxTransferNum = Number.MAX_SAFE_INTEGER;

/**
 * 对银行页面元素进行处理
 */
export const handleBankPage = function () {
    let $account = $('.bank1 > tbody > tr:nth-child(2) > td:contains("你所拥有的贡献：")');
    if (!$account.length) return;
    let html = $account.html();
    $account.html(
        html.replace(
            /你所拥有的贡献：(-?\d+(?:\.\d+)?)/,
            (m, num) => `你所拥有的贡献：<b id="pdGongXian" data-num="${num}">${parseFloat(num).toLocaleString()}</b>`
        )
    );

    let matches = /注意你转账的是贡献，最小\[(\d+(?:\.\d+)?)\]，最大\[(\d+(?:\.\d+)?)\]/.exec(html);
    if (matches) {
        minTransferNum = parseFloat(matches[1]);
        maxTransferNum = parseFloat(matches[2]);
    }

    $(document).on('change', 'input[name="to_money"]', function () {
        let $this = $(this);
        let num = parseFloat($this.val());
        if (isNaN(num) || num < minTransferNum || num > maxTransferNum) {
            alert(`转账数额的最小值为[${minTransferNum}]，最大值为[${maxTransferNum}]，超过最大值请分多次转账`);
        }
    });

    addBatchTransferButton();
};

/**
 * 将指定账户金额节点设置为指定值
 * @param {jQuery} $node 账户金额节点
 * @param {number|string} value 数值（可设为相对值，如+=50、-=100）
 */
export const setNodeValue = function ($node, value) {
    if (!$node.length) return;
    let num = 0;
    if (!$.isNumeric(value)) {
        let matches = /(\+|-)=(\d+(?:\.\d+)?)/.exec(value);
        if (!matches) return;
        let diff = parseFloat(matches[2]);
        let oldNum = parseFloat($node.data('num'));
        oldNum = oldNum ? oldNum : 0;
        num = value.startsWith('+') ? oldNum + diff : oldNum - diff;
    }
    else {
        num = parseFloat(value);
    }
    $node.text(num.toLocaleString()).data('num', num);
};

/**
 * 批量转账
 * @param {Array} users 用户列表
 * @param {string} msg 转帐附言
 */
const batchTransfer = function (users, msg) {
    let successNum = 0, failNum = 0, successMoney = 0;

    $.each(users, function (index, [userName, money]) {
        $(document).queue('Bank', function () {
            $.ajax({
                type: 'POST',
                url: 'hack.php?H_name=bank',
                timeout: Const.defAjaxTimeout,
                data: `&action=virement&pwuser=${Util.getGBKEncodeString(userName)}&to_money=${money}&memo=${Util.getGBKEncodeString(msg)}`,
                success(html) {
                    Public.showFormatLog('批量转账', html);
                    let {msg} = Util.getResponseMsg(html);
                    let msgHtml = `${userName} <em>+${money.toLocaleString()}</em>`;
                    if (/完成转帐!/.test(msg)) {
                        successNum++;
                        successMoney += money;
                    }
                    else {
                        failNum++;
                        if (/用户<b>.+?<\/b>不存在/.test(msg)) msg = '用户不存在';
                        msgHtml += ` <span class="pd_notice">(错误：${msg})</span>`;
                    }
                    $('.pd_result:last').append(`<li>${msgHtml}</li>`);
                },
                error() {
                    failNum++;
                    $('.pd_result:last').append(`
<li>
  ${userName}:${money.toLocaleString()}
  <span class="pd_notice">(错误：连接超时，转账结果未知，请到<a target="_blank" href="hack.php?H_name=bank&action=log">银行日志</a>里进行确认)</span>
</li>
`);
                },
                complete() {
                    let $countdown = $('.pd_countdown:last');
                    $countdown.text(parseInt($countdown.text()) - 1);
                    let isStop = $countdown.closest('.pd_msg').data('stop');
                    if (isStop) $(document).clearQueue('Bank');

                    if (isStop || index === users.length - 1) {
                        Msg.destroy();
                        if (successNum > 0) Log.push('批量转账', `共有\`${successNum}\`次转账成功`, {pay: {'贡献': -successMoney}});
                        setNodeValue($('#pdGongXian'), '-=' + successMoney);
                        console.log(`共有${successNum}次转账成功，共有${failNum}次转账失败，贡献-${successMoney}`);
                        $('.pd_result:last').append(
                            `<li><b>共有<em>${successNum}</em>次转账成功` +
                            `${failNum > 0 ? `，共有<em>${failNum}</em>次转账失败` : ''}：</b>贡献 <ins>-${successMoney.toLocaleString()}</ins></li>`
                        );
                        Msg.show(
                            `<strong>共有<em>${successNum}</em>次转账成功` +
                            `${failNum > 0 ? `，共有<em>${failNum}</em>次转账失败` : ''}</strong><i>贡献<ins>-${successMoney.toLocaleString()}</ins></i>`
                            , -1
                        );
                    }
                    else {
                        setTimeout(() => $(document).dequeue('Bank'), Const.bankActionInterval);
                    }
                }
            });
        });
    });

    $(document).dequeue('Bank');
};

/**
 * 验证批量转账的字段值是否正确
 * @param {jQuery} $transfer 批量转账区域对象
 * @returns {boolean} 是否正确
 */
const batchTransferVerify = function ($transfer) {
    let $bankUsers = $transfer.find('[name="users"]');
    let users = $bankUsers.val();
    if (!/^\s*\S+\s*$/m.test(users) || /^\s*:/m.test(users) || /:/.test(users) && /:(\D|$)/m.test(users)) {
        alert('用户列表格式不正确');
        $bankUsers.select().focus();
        return false;
    }
    if (/^\s*\S+?:0*(\.0\d+)?\s*$/m.test(users)) {
        alert(`转帐数额不能小于[${minTransferNum}]贡献`);
        $bankUsers.select().focus();
        return false;
    }
    let $bankMoney = $transfer.find('[name="transfer_money"]');
    let money = parseFloat($bankMoney.val());
    if (/^\s*[^:]+\s*$/m.test(users)) {
        if (!$.isNumeric(money)) {
            alert('通用转账数额格式不正确');
            $bankMoney.select().focus();
            return false;
        }
        else if (money < minTransferNum) {
            alert(`转帐数额不能小于${minTransferNum}贡献`);
            $bankMoney.select().focus();
            return false;
        }
    }
    return true;
};

/**
 * 添加批量转账的按钮
 */
const addBatchTransferButton = function () {
    let $area = $(`
<tr id="pdBankTransferArea">
  <td style="vertical-align: top;">
    使用说明：<br>每行一名用户，<br>如需单独设定转账数额，<br>可写为“用户名:贡献”<br>（注意是<b>英文冒号</b>）<br>例子：<br>
    <pre style="border: 1px solid #9999ff; padding: 5px;">张三\n李四:0.1\n王五:1.2\n信仰风</pre>
  </td>
  <td>
  <form>
    <div style="display: inline-block;">
      <label>用户列表：<br>
        <textarea class="pd_textarea" name="users" style="width: 270px; height: 250px;"></textarea>
      </label>
    </div>
    <div style="display: inline-block; margin-left: 10px;">
      <label>通用转帐数额（如所有用户都已设定单独数额则可留空）：<br>
        <input class="pd_input" name="transfer_money" type="text" style="width: 217px;">
      </label><br>
      <label style="margin-top: 5px;">转帐附言（可留空）：<br>
        <textarea class="pd_textarea" name="msg" style="width: 225px; height: 206px;"></textarea>
      </label>
    </div>
    <div>
      <button type="submit">批量转账</button>
      <button type="reset">重置</button>
      <button name="random" type="button" title="为用户列表上的每个用户设定指定范围内的随机数额">随机数额</button>
      <br><span class="pd_highlight">（注意：你转给对方的是贡献，每名用户的转账数额可超过单次转账的最大值，助手会自动分多次转账）</span>
      ${Util.isIE() || Util.isEdge() ? '<br><span class="pd_highlight">注：IE和Edge浏览器在批量转账给中文名用户时会出现乱码，请使用其它浏览器进行批量转账</span>' : ''}
    </div>
  </form>
  </td>
</tr>
`).insertAfter('.bank1 > tbody > tr:nth-child(2)');

    $area.find('form').submit(function (e) {
        e.preventDefault();
        Msg.destroy();
        if (!batchTransferVerify($area)) return;

        let commonMoney = parseFloat($area.find('[name="transfer_money"]').val());
        if (!commonMoney) commonMoney = 0;
        let msg = $area.find('[name="msg"]').val();
        let users = [];
        for (let line of $area.find('[name="users"]').val().split('\n')) {
            line = $.trim(line);
            if (!line) continue;

            let userName = line;
            let strMoney = 0;
            if (line.includes(':')) {
                [userName, strMoney] = line.split(':');
                userName = $.trim(userName);
                if (typeof strMoney === 'undefined') continue;
            }
            else {
                strMoney = commonMoney;
            }

            let money = parseFloat(strMoney);
            money = Math.floor(money * 10) / 10;
            if (money > maxTransferNum) {
                let count = Math.floor((money * 10) / (maxTransferNum * 10));
                let addNum = (money * 10) % (maxTransferNum * 10) / 10;
                for (let i = 1; i <= count; i++) {
                    users.push([userName, maxTransferNum]);
                }
                if (addNum >= 0.1) {
                    users.push([userName, addNum]);
                }
            }
            else {
                users.push([userName, money]);
            }
        }
        if (!users.length) return;

        let totalMoney = 0;
        let realUsers = [];
        for (let [user, money] of users) {
            totalMoney += money;
            if (!realUsers.includes(user)) {
                realUsers.push(user);
            }
        }

        let $gongXian = $('#pdGongXian');
        if ($gongXian.length > 0 && Math.floor(totalMoney * 10) > Math.floor(parseFloat($gongXian.data('num')) * 10)) {
            alert(`你当前没有[${totalMoney.toLocaleString()}]贡献可供转账`);
            return;
        }
        if (!confirm(`共计[${realUsers.length}]名用户，总计[${totalMoney.toLocaleString()}]贡献，是否转账？`)) return;
        if (totalMoney > maxTransferNum && !confirm(`你真的要转账[${totalMoney.toLocaleString()}]贡献？请注意你转给对方的是贡献，是否继续？`)) return;

        Msg.wait(
            `<strong>正在批量转账中，请耐心等待&hellip;</strong><i>剩余：<em class="pd_countdown">${users.length}</em></i>` +
            `<a class="pd_stop_action" href="#">停止操作</a>`
        );
        $area.find('> td:last-child').append('<ul class="pd_result pd_stat"><li><strong>转账结果：</strong></li></ul>');
        batchTransfer(users, msg);
    }).find('[name="random"]').click(function () {
        let userList = [];
        for (let line of $area.find('[name="users"]').val().split('\n')) {
            line = $.trim(line);
            if (!line) continue;
            userList.push($.trim(line.split(':')[0]));
        }
        if (!userList.length) return;

        let range = prompt('设定随机数额的范围（注：最低转账数额为0.1贡献）', '0.1-1');
        if (range === null) return;
        range = $.trim(range);
        if (!/^\d+(?:\.\d+)?-\d+(?:\.\d+)?$/.test(range)) {
            alert('随机数额范围格式不正确');
            return;
        }
        let arr = range.split('-');
        let min = parseFloat(arr[0]), max = parseFloat(arr[1]);
        if (max < min) {
            alert('最大值不能低于最小值');
            return;
        }

        let content = '';
        for (let userName of userList) {
            content += userName + ':' + (Math.floor((Math.random() * (max - min + 0.1) + min) * 10) / 10) + '\n';
        }
        $area.find('[name="users"]').val(content);
    });
};
