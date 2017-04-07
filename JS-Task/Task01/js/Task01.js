/**
 * Created by zhuan_f on 2017/4/5.
 */
var boxItem = document.getElementsByTagName("body");// 通过HTML标签名获取元素节点
var boxColor = document.getElementsByClassName("square");// 通过元素类名获取属性节点
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
    //排序
    original.sort(function() {
        return 0.5 - Math.random();
    });
}

//取3个6位随机数
function randomColor() {
    color = [];
    for (var i = 0; i <= 2; i++) {
        color.push(Math.floor(Math.random() * (0xFFFFFF)).toString(16));
    }
    //随机的颜色值使其不能等于ffff00，需要优化
    for (var i = 0; i < 3; i++) {
        if (color[i] === "ffff00") {
            color[i] -= 111111;
        }
    }
}

//box配色
function changeBox() {
    randomBox();
    randomColor();
    boxColor[original[2]].style = "background: #" + color[0]
    boxColor[original[5]].style = "background: #" + color[1]
    boxColor[original[8]].style = "background: #" + color[2]
}
//初始化
function changeColor() {
    // 给九宫格的小格子的背景颜色初始化为orange
    for (var color in boxColor) {
        boxColor[color].style = "background: ffff00";
    }
    changeBox();
}
//延迟函数
function wait() {
    n = setInterval(changeColor, 1000);
}
// 通过元素id获取  开启 开始闪 事件
document.getElementById("start").onclick = function () {
    clearInterval(n);
    wait();
}
// 通过元素id获取  开启 结束闪 事件
document.getElementById("reset").onclick = function () {
    // boxColor.removeAttribute("style"), value = "background-color: orange"
    for (var color in boxColor) {
        boxColor[color].style = "background:#ffff00";
    }
    clearInterval(n);
}


