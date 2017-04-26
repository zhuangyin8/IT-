/**
 * edited by zhuangyin on 2017/4/17.
 */
var statusAll = sessionStorage.fettle;
var fettle = JSON.parse(statusAll);
console.log(fettle);
// 读取所有玩家的信息
var killer = 0;
//存放活着的杀手人数
var civy = 0;
//存放活着的平民人数
var diePeople = 0;
//存放死亡玩家人数
var play = '';
for (var i = 0; i < fettle.length; i++) {
    //显示死亡玩家身份信息
    if (fettle[i].status == 'killed') {
        play += fettle[i].num + '号被杀手杀死了，其真实身份是' + fettle[i].identity + '<br>';
        $('#main-content').html(play);
    }
    if (fettle[i].status == 'voted') {
        play += fettle[i].num + '号被投票投死了，其真实身份是' + fettle[i].identity + '<br>';
        $('#main-content').html(play);
    }
}
for (var n = 0; n < fettle.length; n++) {
    //记录总共死亡人数
    if (fettle[n].status == 'killed' || fettle[n].status == 'voted') {
        diePeople++;
    }
}
// console.log(diePeople);
for (var m = 0; m < fettle.length; m++) {
    // 记录存活的杀手人数和平民人数
    if (fettle[m].status == 'alive') {
        if (fettle[m].identity == '平民') {
            civy++;
        } else {
            killer++;
        }
    }
}

// 当杀手人数大于等于平民人数时游戏结束，或者当杀手人数为0时结束游戏
// console.log(civy, killer);
if (civy <= killer) {
    $('#vote').text('杀手获胜，查看结果').click(function() {
        window.location.href = 'result.html';
    });
} else if (killer === 0) {
    $('#vvote').text('平民获胜，查看结果').click(function() {
        window.location.href = 'result.html';
    });
} else if ((diePeople + 2) % 2 === 0) {
    $('#vote').text('第' + (diePeople + 2) / 2 + '天').click(function() {
        window.location.href = 'goKill.html';
    });
} else {
    $('#vote').text('去投票').click(function() {
        window.location.href = 'vote.html';
    });
}
