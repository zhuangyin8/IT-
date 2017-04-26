/**
 * Created by wanwn on 2017/2/18.
 */
var allPlayer = sessionStorage.all;
var all = JSON.parse(allPlayer);
//获取上个页面的身份信息
//打印所有玩家身份
var clickNum = 1;
//定义点击按钮被点击的次数
var playNum = 2;
//定义玩家的号数
$("#btnShow").click(function() {
    if (clickNum > 2 * all.length - 1) {
        //1号玩家初始状态就是隐藏,之后每个玩家查看身份及传递身份需要点击两次按钮，所以当点击总次数超过玩家人数*2-1时，跳转到下一个页面
        window.location.href = 'judge.html';
    } else if (clickNum % 2 == 0) {
        //当点击次数为偶数次时，显示翻牌前的图片,隐藏身份页面,
        $('.main-show-cover').show();
        $('.main-show-open').hide();
        $('#playerRole').hide();
        $('.main-show-open-warn').hide();
        //         $('#playerNum').text(playNum);
        $('#playerNum').html(playNum);
        $('#btnShow').html('查看' + playNum + '号身份');
        playNum++;
    } else {
        //当点击次数为奇数次时，显示n号玩家身份信息,隐藏翻牌前的图片
        $('.main-show-cover').hide();
        $('.main-show-open').show();
        $('.main-show-open-warn').show();
        $('#playerRole').show().text('角色：' + all[playNum - 2]);
        if (playNum < all.length + 1) {
            $('#btnShow').html('隐藏并传递给' + playNum + '号');
        } else {
            $('#btnShow').html('查看法官台本');
        }
    }
    clickNum++;
    //一次点击事件结束后总次数加1
});
