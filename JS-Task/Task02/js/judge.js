
var allPlayer = sessionStorage.all;
var all = JSON.parse(allPlayer);
console.log(all);//获取缓存中的身份信息
var i;
var play = '';
for (i = 0; i < all.length; i++) {
    play += '<div class="main-box">' + '<div class="main-box-hide"></div>' +
        '<div class="main-box-open">' + all[i] + '</div>' +
        '<div class="main-box-number">' + (i + 1) + '号</div>' + '</div>';
    console.log(play);
    $('main').eq(0).html(play);
}
// 点击开始游戏按钮,跳转到下一页
$('#startGame').click(function() {
    window.location.href = 'step.html';
});
