/**
 * edited by zhuangyin on 2017/4/17.
 */
// JS修改CSS样式
var step = document.getElementsByClassName('content-step-part');
step[2].style.marginTop = '5rem';

//
// $('.content-step-part')

//获取天黑请闭眼按钮的id,触发点击事件,跳转到杀人页面
// document.getElementById('start').onclick = function() {
//     window.location.href = 'kill.html';
// }

//jQuery 获取天黑请闭眼按钮的id,触发点击事件,跳转到杀人页面
$('#start').click(function(){
     window.location.href = 'kill.html';
});
