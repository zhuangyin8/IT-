/**
 * edited by zhuangyin on 2017/4/17.
 */
// JS修改CSS样式
// var step = document.getElementsByClassName('step');
// step[2].style.marginTop = '6rem';
 
//jQuery 修改CSS样式  获取所有class="step"的元素中第二个,给添加下外边距
$('.step').eq(1).css("margin-bottom","6rem");

//获取天黑请闭眼按钮的id,触发点击事件,跳转到杀人页面
// document.getElementById('start').onclick = function() {
//     window.location.href = 'kill.html';
// }

//jQuery 获取天黑请闭眼按钮的id,触发点击事件,跳转到杀人页面
$('#start').click(function(){
     window.location.href = 'kill.html';
});
