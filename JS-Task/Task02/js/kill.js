/**
 * edited by zhuangyin on 2017/4/17.
 */
//点击 播放音乐
$("#play").click(// 播放音频
function() {
    var audio = document.getElementById("music");
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

//打印玩家身份牌
var allPlayer = sessionStorage.all;

var all = JSON.parse(allPlayer);

var play = "";
//存放玩家身份牌信息
var oStatus = [];
//存放单个玩家的生存状态的数组
var statusAll = '';
//存放所有玩家的生存状态的字符串
for (var i = 0; i < all.length; i++) {
    play += '<div class="main-content-part"><div class="main-content-part-role-name">' + all[i] + '</div><div class="main-content-part-role-num">' + (i + 1) + '号' + '</div>' + '</div> ';
    oStatus[i] = {};
    //数组中的每个元素都是一个对象，包括身份、号码、状态
    oStatus[i].num = i + 1;
    oStatus[i].identity = all[i];
    oStatus[i].status = "alive";
    oStatus[i].day = 1;
    console.log(oStatus);
    $('#main-content').html(play);
}
var allName = document.getElementsByClassName("main-content-part-role-name");
var x;
var killPeople;
//死亡玩家号码
for (var j = 0; j < oStatus.length; j++) {
    //先把已经死亡的玩家标记出来
    if (oStatus[j].status == "killed" || oStatus[j].status == "voted") {
        allName[j].style.background = "#9b9b9b";
    }
}
for (x = 0; x < allName.length; x++) {
    allName[x].index = x;
    allName[x].onclick = function() {
        //如果某玩家卡牌被点击，则记录并改变这个玩家的状态
        if (all[this.index] == '杀手') {
            alert('不能杀死同伙哦');
        } else {
            if (killPeople !== undefined) {
                //先检查有没有被选中的人，如果有则将之前选择玩家的状态颜色还原
                allName[killPeople].style.background = "#f5c97b";
                oStatus[killPeople].status = "alive";
            }
            allName[this.index].style.background = "red";
            killPeople = this.index;
            oStatus[this.index].status = "killed";
            //             console.log(oStatus);
            statusAll = JSON.stringify(oStatus);
            sessionStorage.oStatus = statusAll;
            //             console.log(statusAll);
        }
    }
}

//判断是否有选身份
$('#kill').click(function() {
    if (killPeople === undefined) {
        //杀手没有选择玩家头像,无法点击"杀人"按钮
        alert("请选择一个玩家");
    } else {
        //杀手选择玩家头像,点击杀死按钮,直接跳转到下一页面
        window.location.href = "daytime.html";
    }
});
