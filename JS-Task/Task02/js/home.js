/**
 * Edited by zhuan_f on 4/19/2017.
 */
// JavaScript 获取"简化版"按钮的id,触发点击事件,跳转到参数设置页面
// document.getElementById("sample").onclick = function() {
//    window.location.href = "setting.html";
// }

//jQuery实现
$("#sample").click(function () {
    //1.window.location.href方式
    window.location.href = "setting.html";
});


$("html,body").animate({scrollTop:'100px'},1000);
