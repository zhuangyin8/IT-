var light = (function ($) {
    var WAIT = 2000;
    var fsm = StateMachine.create({
        initial: 'green',  // 初始状态

        events: [
            // 正常情况下的红绿灯变化
            {name: 'warn', from: 'green', to: 'yellow'},
            {name: 'panic', from: 'yellow', to: 'red'},
            {name: 'calm', from: 'red', to: 'yellow'},
            {name: 'clear', from: 'yellow', to: 'green'},
            // 以下三个是强制转换颜色
            {name: 'toRed', from: ['green', 'red', 'yellow'], to: 'red'},
            {name: 'toYellow', from: ['green', 'red', 'yellow'], to: 'yellow'},
            {name: 'toGreen', from: ['green', 'red', 'yellow'], to: 'green'}
        ]
    });

    // fsm.onyellow = function(){
    // 	alert('!');
    // }

    // 每次事件发生前 应该把灯一瞬间熄灭
    fsm.onbeforeevent = function (ev) {
        $('.cir').attr('class', 'cir');
    }
    //然后再渲染上颜色
    fsm.onafterevent = function (ev) {
        console.log('STATE CHANGE');
        console.log(ev);
        console.log(fsm.current);

        $('#' + fsm.current).addClass('color-' + fsm.current);
    }

    time.go(function (now, OF) {
        // // 剩余时间数字提示 （不足10前面补0）
        $('time').html((now < 10 ? ('0' + now.toString()) : now.toString()) + '<br />');

        if (OF) {//这里跟 Verilog HDL 里 FSM 的 Three Always 写法很像
            // toNextState();
            switch (fsm.current) {
                case 'red':
                    fsm.calm();
                    // 注意黄灯自己会一秒后转移到别的状态
                    setTimeout(function () {
                        fsm.clear();
                    }, 1000);
                    break;
                case 'yellow':
                    // do nothing
                    break;
                case 'green':
                    fsm.warn();
                    // 注意黄灯自己会一秒后转移到别的状态
                    setTimeout(function () {
                        fsm.panic()
                    }, 1000);
                    break;
                default:
                // reset
            }
        } else {

        }
    });

    $('#red-btn').click(function () {
        fsm.toRed();
    });
    $('#yellow-btn').click(function () {
        var pre = fsm.current;
        fsm.toYellow();
        setTimeout(function () {
            if (pre == 'red') {
                fsm.clear();
            } else if (pre == 'green') {
                fsm.panic();
            }
        }, 1000);
    });
    $('#green-btn').click(function () {
        fsm.toGreen();
    });

})($); 
