/**
 * edited by zhuangyin on 2017/4/17.
 */

// 通过input框、拉动按钮、+ -符号控制人数，且互相关联， 若超出范围则弹出提示框
// 为了让代码更加健壮，对用户输入的数字进行检验判断，当输入框内不是一个4-18之间的数字时，弹出弹框提示
var textNum = document.getElementById("text");
//获取输入框中用户输入的值  获取text的值
var rangeNum = document.getElementById("range");
//获取人数设置拖动条的值   获取range的值
var btnSub = document.getElementById("sub");
//获取-号按钮的值
var btnAdd = document.getElementById("add");

/*
 * jQuery实现 获取 输入框的值赋值给人数设置拖动条实时动态显示,方便用户判断
 */

// JavaScript 实现 获取人数设置拖动条的值赋值给输入框的值实时动态显示,方便用户判断
// onchange 在元素值改变时触发。当值改变时检查输入字段
// onchange 属性适用于：<input>、<textarea> 以及 <select> 元素。
rangeNum.onchange = function rangeChange() {
  textNum.value = rangeNum.value;
  //将range的值给number
};
/*
 *
 * 对玩家人数进行判断
 *
 * onblur 事件 当元素失去焦点
 * 对输入框的数字失去焦点,判断是否符合要求
 * 如果不符合要求(玩家人数<4),提示用户并将玩家人数自动设置为4
 * 如果不符合要求(玩家人数>18),提示用户并将玩家人数自动设置为4
 * 如果符合要求(4<玩家人数<18),将将人数设置拖动条的值赋值给输入框
 */
textNum.onblur = function textChange() {
  if (textNum.value < 4) {
    alert("人数少于4人不能开始游戏哦");
    textNum.value = 4;
  } else if (textNum.value > 18) {
    alert("人数多于18位不能进行游戏哦");
    textNum.value = 18;
  } else {
    rangeNum.value = textNum.value;
    //         将number的值给range

  }
};

btnSub.onclick = function btnSub() {
  //点击-号时range和text值一起减少
  textNum.value--;
  if (textNum.value < 4) {
    alert("人数少于4人不能开始游戏哦");
    textNum.value = 4;
  } else {
    rangeNum.value = textNum.value;
  }
};

btnAdd.onclick = function btnAdd() {
  //点击+号时range和text值一起增加
  textNum.value++;
  if (textNum.value > 18) {
    alert("人数多于18位不能进行游戏哦");
    textNum.value = 18;
  } else {
    rangeNum.value = textNum.value;
  }
};

/*
 将杀手和平民身份打乱，准备分配给1-N号玩家身份
 */
// var allPlayer;
// var player = "";
//获取显示玩家身份区域的值
$("#identifyGet").click(function() {
  player = "";
  //清空显示区域的元素
  var killer = [];
  //杀手数组的声明
  var civy = [];
  //平民数组的声明
  if (textNum.value >= 4 && textNum.value <= 8) {
    //不同人数范围设置不同的杀手数量
    killer.length = 1;
  } else if (textNum.value >= 9 && textNum.value <= 11) {
    killer.length = 2;
  } else if (textNum.value >= 12 && textNum.value <= 15) {
    killer.length = 3;
  } else if (textNum.value >= 16 && textNum.value <= 18) {
    killer.length = 4;
  } else {
    alert('人数不满足条件，请重新设置人数哦');
    //之前已经判断人数后，几乎不可能出现，但是为了保险起见
  }
  for (var i = 0; i < killer.length; i++) {
    //生成杀手数组
    killer[i] = "杀手";
  }
  for (var j = 0; j < textNum.value - killer.length; j++) {
    //生成平民数组
    civy[j] = "平民";
  }

  //将杀手和平民的数组合并并玩家数组将数组的顺序打乱后输出
  var all = killer.concat(civy);
  Array.prototype.shuffle = function() {
    var input = this;
    for (var i = input.length - 1; i >= 0; i--) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var itemAtIndex = input[randomIndex];
      input[randomIndex] = input[i];
      input[i] = itemAtIndex;
    }
    return input;
  }
  all.shuffle();
  //玩家数组调用洗牌算法

  for (var m = 0; m < all.length; m++) {
    //输出打乱的数组，即分配玩家身份，且在页面中显示
    if (all[m] == "杀手") {
      player += "<li><span></span>" + (m + 1) + "号" + "&nbsp;&nbsp;" + all[m] + "</li>";
    } else {
      player += "<li><i></i>" + (m + 1) + "号" + "&nbsp;&nbsp;" + all[m] + "</li>";
    }
    //获取点击设置按钮的值
    identifyShow.innerHTML = player;
    //设置显示区域的html
  }
  allPlayer = JSON.stringify(all);
  //使用JSON.stringify()把JavaScript对象转换为JSON字符串
  sessionStorage.all = allPlayer;
  //把字符串储存到缓存中
});

//jQuery 实现点击"去分牌"按钮时先检查是否设置玩家身份
$("#allot").click(function() {
  if (allPlayer != null) {
    window.location.href = "show.html";
    //已配置身份转到下一个页面
  } else {
    alert("请先点击设置玩家身份哦");
  }
});

// javScript 实现点击"去分牌"按钮时先检查是否设置玩家身份
// document.getElementById("allot").onclick = function allot() {
//     if (allPlayer != null) {
//         window.location.href = "show.html";
//         //已配置身份转到下一个页面
//     } else {
//         alert("请先点击设置玩家身份哦");
//     }
// }
// ;
