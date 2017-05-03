// 顺计时版本
// var time = (function(){
// 	var _now = 0;
// 	function inc(){
// 		if (_now < 29) {
// 			_now ++ ;
// 		} else {
// 			_now = 0;
// 		}
// 	}
//
// 	var _cb = function(now, OF) { console.log(now) }
//
// 	function _go(){
// 		inc();
// 		_cb(_now, _now === 29);
// 	}
//
// 	return {
// 		go: function(cb){
// 			if (cb){
// 				_cb = cb;
// 			}
// 			setInterval(_go, 1000);
// 		}
// 	}
// })();

// 倒计时版本
var time = (function(){
    var _now = 29;
    function inc(){
        if (_now > 0) {
            _now -- ;
        } else {
            _now = 29;
        }
    }

    var _cb = function(now, OF) { console.log(now) }

    function _go(){
        inc();
        _cb(_now, _now === 0);
    }

    return {
        go: function(cb){
            if (cb){
                _cb = cb;
            }
            setInterval(_go, 1000);
        }
    }
})();
