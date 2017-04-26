/**
 * Editor by zhuangyin on 2017/4/21.
 */
// var allPlayer = sessionStorage.all;
// var all = JSON.parse(allPlayer);
//将SessionSorage 存储的数据解析为JSON 
// JSON.parse() 方法解析一个JSON字符串，构造由字符串描述的JavaScript值或对象。
// 返回值:Object对应给定的JSON文本。
var all = JSON.parse(sessionStorage.all);
//声明空字符串存储
var player = "";
//获取缓存中的身份信息
for (i = 0; i < all.length; i++) {
    player += '<div class="main-box">' + '<div class="main-box-hide"></div>' + '<div class="main-box-open">' 
    + all[i] + '</div>' + '<div class="main-box-number">' + (i + 1) + '号</div>' + '</div>';
    $("main").html(player);
}

// 点击开始游戏按钮,跳转到下一页
$('#startGame').click(function() {
    window.location.href = 'step.html';
});
