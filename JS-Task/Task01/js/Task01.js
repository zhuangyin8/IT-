/**
 * Created by zhuan_f on 2017/4/5.
 */
var boxBody = document.getElementsByTagName("body");// 通过HTML标签名获取元素节点
var boxItems = document.getElementsByClassName("square");// 通过元素类名获取属性节点
//如何产生随机颜色(#fffff)?如何将3种不同的颜色分别添加到九宫格的随机3个小格子的样式?
//如何产生不重复的3个1-9的随机数?如何将其存入数组中?
var original;
var color;
var n;
//产生元素值为0-8的随机不重复的数组
function randomBox() {
    //声明一个数组
    original = [];
    //给原始数组original赋值
    for (var i = 0; i < 9; i++) {
        original[i] = i;
    }
    //随机排序
    original.sort(function () {
        return 0.5 - Math.random();
    });
}

//机的颜色值使其不能等于ffff00，需要优化
function randomColor() {
    color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ","
        + Math.floor(Math.random() * 256) + ")";
    //    Math.random() 函数返回 [0-1) 的浮点值伪随机数（大于等于0，小于1）。
    //    Math.floor(x) 函数返回小于或等于数 "x" 的最大整数。
}

//box配色
function changeBox() {
    randomBox();
    // randomColor();
    // boxItems[original[2]].style = "background: #" + color[0]
    // boxItems[original[5]].style = "background: #" + color[1]
    // boxItems[original[8]].style = "background: #" + color[2]
    for (var i = 3; i < 6; i++) {
        randomColor();
        // boxItems[original[i]].style = "background: " + color;
        boxItems[original[i]].style.background = color;
    }
}
//初始化
function initializeColor() {
    // 给九宫格的小格子的背景颜色初始化为orange
    for (var color in boxItems) {
        boxItems[color].style = "background: ffff00";
    }
    changeBox();
}
//延迟函数
function delay() {
    n = setInterval(initializeColor, 2000);
}
// 通过元素id获取  开启 开始闪 事件
document.getElementById("start").onclick = function () {
    clearInterval(n);
    delay();
}
// 通过元素id获取  开启 结束闪 事件
document.getElementById("reset").onclick = function () {
    // boxColor.removeAttribute("style"), value = "background-color: orange";

    // for (var color in boxItems) {
    //     boxItems[color].style = "background:#ffff00";
    // }

    

    clearInterval(n);
}


