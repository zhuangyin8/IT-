
/*
 * JQuery Ball 1.0
 * http://zTree.me/
 *
 * Copyright (c) 2010 Hunter.z
 *
 * Licensed same as jquery - MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * email: hunter.z@263.net
 * Date: 2012-12-12
 */
(function($){
	var BallTools = {
		css3Transition : function(dom, style) {
			var list = ["transition", "msTransition", "OTransition", "MozTransition", "webkitTransition"];
			for (var i=0, l=list.length; i<l; i++) {
				dom.style[list[i]] = style;
			}
		},
		getRand : function(num) {
			return Math.round(Math.random()*num);
		},
		getDarkColor : function(color, num) {
			return {
				r : (color.r >= num) ? (color.r - num) : 0,
				g : (color.g >= num) ? (color.g - num) : 0,
				b : (color.b >= num) ? (color.b - num) : 0
			}
		},
		getLightColor : function(color, num) {
			return {
				r : (color.r + num <= 255) ? (color.r + num) : 255,
				g : (color.g + num <= 255) ? (color.g + num) : 255,
				b : (color.b + num <= 255) ? (color.b + num) : 255
			}
		}
	}
	var Ball = function(id, boxObj, zoom) {
		this.defaultR = 15;
		this.r = Math.round(this.defaultR-zoom/1.8);
		this.x = BallTools.getRand(BOXSIZE.w*.8);
		this.y = BallTools.getRand(BOXSIZE.h*.8);
		this.speed_x = 0;
		this.speed_y = 0;
		this.id = id;
		this.selected = false;
		
		this.color = {
				r : BallTools.getRand(255),
				g : BallTools.getRand(255),
				b : BallTools.getRand(255)
		}
		this.draw = function() {
			darkColor1 = BallTools.getDarkColor(this.color, 80),
			darkColor2 = BallTools.getDarkColor(this.color, 200),
			lightColor1 = BallTools.getLightColor(this.color, 60),
			lightColor2 = BallTools.getLightColor(this.color, 20);
			
			if (!this.canvas) {
				this.canvas = document.createElement('CANVAS');
				this.canvas = $(this.canvas);
				boxObj.append(this.canvas.get(0));
				BallTools.css3Transition(this.canvas.get(0), "all 0.05s");
				this.canvas.css({
					top: this.y + "px",
					left: this.x + "px"
				})
			}
			this.canvas.attr({
				"title": this.id,
				"width": this.r*2 + "px",
				"height": this.r*2 + "px"
			});
			var ctx = this.canvas.get(0).getContext("2d");
			ctx.beginPath();
			var gradient = ctx.createRadialGradient(this.r, this.r, 0, this.r, this.r, this.r);
			gradient.addColorStop(0, "rgba("+this.color.r+", "+this.color.g+", "+this.color.b+", 1)");
			gradient.addColorStop(0.8, "rgba("+darkColor1.r+", "+darkColor1.g+", "+darkColor1.b+", 1)");
			gradient.addColorStop(1, "rgba("+darkColor2.r+", "+darkColor2.g+", "+darkColor2.b+", 1)");
			ctx.fillStyle = gradient;
			ctx.arc(this.r, this.r, this.r, Math.PI*2, false);
			ctx.fill();
			
			ctx.beginPath();
			var lightR = this.r/3;
			var gradient = ctx.createRadialGradient(lightR*2, lightR*2, 0, lightR*2, lightR*2, lightR);
			gradient.addColorStop(0, "rgba("+lightColor1.r+", "+lightColor1.g+", "+lightColor1.b+", 1)");
			gradient.addColorStop(0.6, "rgba("+lightColor2.r+", "+lightColor2.g+", "+lightColor2.b+", 1)");
			gradient.addColorStop(1, "rgba("+this.color.r+", "+this.color.g+", "+this.color.b+", 1)");
			ctx.fillStyle = gradient;
			ctx.arc(lightR*2, lightR*2, lightR, Math.PI*2, false);
			ctx.fill();
			
		}
		
		this.move = function() {
			this.canvas.css({
				top: this.y + "px",
				left: this.x + "px"
			})
		}
		
		this.draw();

	}

	var Box = function(options) {
		this.defaultSpeed = {x:0, y:29};
		this.windSpeed = {x:7, y:8.7};
		this.resistance = {x:-0.1, y:-0.3};
		this.open = false;
		this.selectedY = 0;
		this.maxBallCount = 100;
		this.init = function(options) {
			this.boxList = options.boxList;
			this.outputDiv = options.outputDiv;
			this.rewardDiv = options.rewardDiv;
			this.rewardType = options.rewardType;
			if (this.rewardType == "nameType") {
				this.nameList = options.nameList;
			} else {
				this.numberMin = options.numberMin;
				this.numberMax = options.numberMax;
			}
			this.boxSize = options.boxSize;
			this.balls = [];
			//风力系统
			this.windFlag = false;
			this.powerWindList = [
  			[[ 0.0, 1.0], [-0.3, 0.1], [-0.5, 0.1], [-1.5,-1.0], [-2.0,-1.0], [-999, -2.5], [ 2.0,-1.0], [ 1.5,-1.0], [ 0.5, 0.1], [ 0.3, 0.1], [ 0.0, 1.0]],
			[[ 0.0, 1.2], [-0.2, 0.2], [-0.4, 0.1], [-1.2,-1.5], [-1.5,-1.2], [-999, -2.6], [ 1.5,-1.2], [ 1.2,-1.5], [ 0.4, 0.1], [ 0.2, 0.2], [ 0.0, 1.2]],
			[[ 0.0, 1.5], [-0.1, 0.3], [-0.3, 0.0], [-0.5,-2.0], [-0.8,-1.5], [-999, -4.0], [ 0.8,-1.5], [ 0.5,-2.0], [ 0.3, 0.0], [ 0.1, 0.3], [ 0.0, 1.5]],
			[[ 0.0, 1.8], [-0.0, 0.0], [-0.1, 0.0], [-0.2,-2.3], [-0.3,-2.4], [-999, -5.5], [ 0.3,-2.4], [ 0.2,-2.3], [ 0.1, 0.0], [ 0.0, 0.0], [ 0.0, 1.8]],
			[[ 0.0, 1.1], [ 0.0, 0.1], [ 0.0, 0.0], [-999,-2.5], [-0.1,-2.3], [-999, -7.3], [ 0.1,-2.3], [-999,-2.5], [ 0.0, 0.0], [ 0.0, 0.1], [ 0.0, 1.1]],
			[[ 0.1, 1.6], [ 0.0, 0.2], [ 0.0, 0.0], [-999,-2.7], [-0.1,-1.9], [-999, -8.3], [ 0.1,-1.9], [-999,-2.7], [ 0.0, 0.0], [ 0.0, 0.2], [-0.1, 1.6]],
			[[ 0.3, 2.5], [ 0.1, 0.5], [ 0.0, 0.1], [-999,-2.8], [-0.1,-1.5], [-999, -8.4], [ 0.1,-1.5], [-999,-2.8], [ 0.0, 0.1], [-0.1, 0.5], [-0.3, 2.5]],
			[[ 0.5, 3.0], [ 0.3, 0.8], [ 0.1, 0.2], [ 0.1, 1.5], [ 0.1, 1.8], [ 0.0, -8.5], [-0.1, 1.8], [-0.1, 1.5], [-0.1, 0.2], [-0.3, 0.8], [-0.5, 3.0]],
			[[ 0.8, 3.5], [ 0.5, 1.1], [ 0.3, 0.5], [ 0.1, 0.8], [ 0.1, 1.5], [ 0.0, -9.0], [-0.1, 1.5], [-0.1, 0.8], [-0.3, 0.5], [-0.5, 1.1], [-0.8, 3.5]],
			[[ 1.0, 0.0], [ 1.0, 0.0], [ 0.5, 0.0], [ 0.3, 0.3], [ 0.1, 1.3], [ 0.0,-10.8], [-0.1, 1.3], [-0.3, 0.3], [-0.5, 0.0], [-1.0, 0.0], [-1.0, 0.0]]
			];
			
			(function() {
				//初始化彩球
				if (this.rewardType == "nameType") {
					for(var i=0; i<this.nameList.length && i<this.maxBallCount; i++) {
						var curLevel = i%this.boxList.length;
						this.balls.push(new Ball(this.nameList[i], this.boxList.eq(curLevel), curLevel));
					}
				} else {
					for(var i=0; i<this.maxBallCount && (i+this.numberMin) <= this.numberMax; i++) {
						var curLevel = i%this.boxList.length;
						this.balls.push(new Ball(i+this.numberMin, this.boxList.eq(curLevel), curLevel));
					}
				}
			}).apply(this);
			
			//this.powerSystem();

		}
		
		this.getArea = function(ball) {
//			console.log(ball.x + "," + ball.y);
			return {
				x: parseInt(Math.abs(ball.x+20)/(this.boxSize.w/(this.powerWindList.length))),
				y: parseInt(ball.y/(this.boxSize.h/(this.powerWindList.length)))
			}
		}
		
		//启动重力
		this.powerStart = function(windFlag) {
//			for(var i=0,j=this.balls.length; i<j; i++) {
//				var ball = this.balls[i];
//			}
			if (!!this.isWorking) {
				return;
			}
			this.windFlag = !!windFlag;
			this.isWorking = true;
			this.powerSystem();
		};
		this.powerOff = function() {
			for(var i=0,j=this.balls.length; i<j; i++) {
				var ball = this.balls[i];
				ball.speed_x = 0;
				ball.speed_y = 0;
			}
			this.isWorking = false;
			this.windFlag = false;
			if (this.timer) {
				clearTimeout(this.timer);
			}
			initBtn();
			
		};
		this.powerSystem = function() {
			var selectedIndex = -1, tmpArea = {}, areaGroupNum = 2;
			
			showSelectedBall.apply(this);
			for(var i=0,j=this.balls.length; i<j; i++) {
				var ball = this.balls[i],
				onBorder_x = false,
				onBorder_y = false,
				maxX = this.boxSize.w - ball.r*2,
				maxY = this.boxSize.h - ball.r*2;
				
				if (ball.selected) {
					selectedIndex = i;
					continue;
				}
				
				//边缘控制
				if (ball.speed_x !== 0 && ball.x == 0 || ball.x == this.boxSize.w - ball.r*2) {
					ball.speed_x = (-1-1.5*this.resistance.x)*ball.speed_x;
					onBorder_x = true;
				}				
				if (ball.speed_y !== 0 && ball.y == 0 || ball.y == this.boxSize.h - ball.r*2) {
					ball.speed_y = (-1-1.5*this.resistance.y)*ball.speed_y;
					onBorder_y = true;
				}
				
				//风力
				if (this.windFlag) {
					var ballArea = this.getArea(ball),
					tmpAreaIndex = ballArea.y + "_" + ballArea.x;
					
					if (!tmpArea[tmpAreaIndex]) {
						tmpArea[tmpAreaIndex] = 1;
					} else {
						tmpArea[tmpAreaIndex]++;
					}
					var weakParam = parseInt(tmpArea[tmpAreaIndex]/(areaGroupNum));
					if (weakParam>1) {
						weakParam = 0.1*weakParam + (BallTools.getRand(100)%10)/20;
					}
						
//					console.log(ballArea.y +"," + ballArea.x);
					var wind = this.powerWindList[ballArea.y][ballArea.x];
					var windX = this.windSpeed.x * (wind[0] == -999 ? (0.5-ball.x%2)*BallTools.getRand(5) : wind[0]) * (1+weakParam);
					var windY = this.windSpeed.y * wind[1] * (1-weakParam);
					
					ball.speed_x += windX;
					ball.speed_y += windY;
				}
				
				if (!onBorder_x) {
					ball.speed_x = (ball.speed_x + this.defaultSpeed.x) * (1 + 1.5*this.resistance.x);
				}
				if (!onBorder_y) {
					if (maxY - ball.y > this.defaultSpeed.y) {
						ball.speed_y = (ball.speed_y + this.defaultSpeed.y) * (1 + this.resistance.y); 
					} else {
						ball.speed_y = parseInt((ball.speed_y + (maxY - ball.y)) * (1 + this.resistance.y)); 
					}
				}
				
//				console.log(ball.speed_x + ",   " + ball.x);
				if (ball.speed_x != 0 || ball.speed_y != 0 ) {
					//if (ball.speed_x > 0 && ball.speed_x < 1)
					ball.x += ball.speed_x;
					ball.y += ball.speed_y;
					ball.x = Math.round(ball.x);
					ball.y = Math.round(ball.y);
					
					if (ball.x > maxX) {
						ball.x = maxX;
					} else if (ball.x < 0) {
						ball.x = 0;
					}
					if (ball.y > maxY) {
						ball.y = maxY;
					} else if (ball.y < 0) {
						ball.y = 0;
					}
					
					if (Math.abs(ball.speed_x) < 0.5) {
						ball.speed_x = 0;
					}
					if (Math.abs(ball.speed_y) < 0.5) {
						ball.speed_y = 0;
					}
					ball.move();
					
					if (this.open && ball.y === 0 && (ball.x > maxX/2-ball.r*.5) && (ball.x > maxX/2+ball.r*.5)) {
						this.open = false;
						ball.selected = true;
					}
				}
			}
						
			if (selectedIndex >= 0) {
				this.selectedBall = this.balls.splice(selectedIndex,1)[0];
//				this.selectedBall.canvas.css({"display": "none"});
			}
			
			if (this.balls.length > 0) {
				var _this = this;
				this.timer = setTimeout(function(){
					_this.powerSystem();
				}, 70);
			} else {
				this.powerOff();
				showSelectedBall.apply(this);
			}			
			
		}
		
		this.startCheer = function(ball) {
			if (this.windFlag) {
				return;
			}
			this.rewardDiv.hide();
			if (this.rewardDiv.radioTimer) {
				clearTimeout(this.rewardDiv.radioTimer);
			}
			if (this.rewardDiv.timer) {
				clearTimeout(this.rewardDiv.timer);
			}
			if (this.curRewardBall && this.curRewardBall  != ball) {
				this.curRewardBall.canvas.removeClass("cur");
			}
			playAudio(lotteryAudio);
			ball.canvas.addClass("cur");
			this.curRewardBall = ball;
			this.rewardDiv.children("#rewardName").html(ball.id);
			var _this = this;
			this.rewardDiv.radioTimer = setTimeout(function(){
				playAudio(cheerAudio);
			}, 500);
			this.rewardDiv.slideDown(2000, function() {
				_this.rewardDiv.timer = setTimeout(function(){
					_this.rewardDiv.fadeOut(300);
					ball.canvas.removeClass("cur");
				}, 1000);
				
			});
		}
		
		var outputPath = [[430, 100], [446, 80], [420, 30], [550, 16], [650, 19], [700, 19], [780, 40], [790, 220], [750, 580] ],
		outBallList = [];
		
		var showSelectedBall = function() {
			if (!!this.selectedBall) {
				var ball = this.selectedBall;
				outBallList.push(ball);
				ball.outIndex = outBallList.length -1;
				if (!ball.pathIndex) {
					ball.pathIndex = 1;
				}
				BallTools.css3Transition(ball.canvas.get(0), "all 0s");
				ball.r = ball.defaultR;
				this.outputDiv.append(ball.canvas);
				ball.x = outputPath[0][0];
				ball.y = outputPath[0][1];
				ball.move();
				ball.draw();
				
				this.selectedBall = null;
				
				var _this = this;
				setTimeout(function() {
					playAudio(selectBallAudio);
					selectBallRoll.apply(_this, [ball]);
				}, 50);
				
			}
		}
		var selectBallRoll = function(ball) {
			var _this = this;
			if (ball.pathIndex < outputPath.length-1) {
				BallTools.css3Transition(ball.canvas.get(0), "all 0.1s");
				ball.x = outputPath[ball.pathIndex][0];
				ball.y = outputPath[ball.pathIndex][1];
			} else {
				BallTools.css3Transition(ball.canvas.get(0), "all 0.5s");
				ball.x = outputPath[ball.pathIndex][0] + parseInt((ball.outIndex)/10) * ball.r*2.5;
				ball.y = outputPath[ball.pathIndex][1] - ((ball.outIndex)%10) * ball.r*2.5;
				
			}
			ball.move();
			if (ball.pathIndex < outputPath.length-1) {
				setTimeout(function() {
					ball.pathIndex++;
					selectBallRoll.apply(_this, [ball]);
				}, 100);
			} else {
				setTimeout(function() {
					$("#boxFront").append(ball.canvas);
					ball.canvas.addClass("reward");
					ball.canvas.bind("click", function() {
						_this.startCheer(ball)
					});
				}, 300);
			}
		}

		this.init(options);
	}

	var boxList = $("div.ballBox"),
	BOXSIZE = {w:boxList.width(), h:boxList.height()}, balls = [];
	
	var numberTypeRadio = $("#numberType"), nameTypeRadio = $("#nameType"),
	numberMin = $("#numberMin"), numberMax = $("#numberMax"),
	nameTxt = $("#nameTxt"),
	submitSetting = $("#submitSetting"),
	StartColorBall = function() {
		
		var rewardType = nameTypeRadio.attr("checked") ? nameTypeRadio.attr("id") : numberTypeRadio.attr("id"),
		min = parseInt(numberMin.get(0).value, 10),
		max = parseInt(numberMax.get(0).value, 10),
		nameList = $.trim(nameTxt.get(0).value).split(" ");
		
		if (rewardType == "nameType") {
			if (nameList.length == 0) {
				alert("请输入名称列表！");
				nameTxt.get(0).focus();
				return;
			}
		} else {
			if (isNaN(min)) {
				alert("最小数字只能输入整数");
				numberMin.get(0).focus();
				return;
			}
			if (isNaN(max)) {
				alert("最大数字只能输入整数");
				numberMax.get(0).focus();
				return;
			}
			if (min > max) {
				alert("最小数字应该小于最大数字");
				numberMin.get(0).focus();
				return;
			}
		}
		
		$(".setting").fadeOut(300);
		
		window.colorBall = new Box({
			boxList : boxList,
			outputDiv : $("div.output"),
			rewardDiv : $("div.rewardInfo"),
			rewardType : rewardType,
			numberMin : min,
			numberMax : max,
			nameList : nameList,
			boxSize: BOXSIZE
		});
		window.colorBall.powerStart();
	}, 
	ResetColorBall = function() {
		
	},
	SetRewardType = function() {
		var rewardType = nameTypeRadio.attr("checked") ? nameTypeRadio.attr("id") : numberTypeRadio.attr("id");
		if (rewardType == "nameType") {
			$("#numberSetting").fadeOut(500);
			$("#nameSetting").fadeIn(500);
		} else {
			$("#nameSetting").fadeOut(500);
			$("#numberSetting").fadeIn(500);
		}
	};
	
	numberTypeRadio.bind("change", SetRewardType);
	nameTypeRadio.bind("change", SetRewardType);
	
	submitSetting.bind("click", StartColorBall);
	
	
	
	var onOffDiv = $("#myonoffDiv"), onOffSwitch = $("#myonoffswitch"), luckyBtn = $("#luckyBtn"),
	backgroundAudio = $("#backgroundAudio"),
	buttonAudio = $("#buttonAudio"),
	cheerAudio = $("#cheerAudio"),
	lotteryAudio = $("#lotteryAudio"),
	selectBallAudio = $("#selectBallAudio"),
	
	initBtn = function() {
		onOffSwitch.attr("checked", true);
		luckyBtn.removeClass("orange").addClass("gray");
		stopBgAudio(backgroundAudio);
	},
	playBgAudio = function(audioObj, isAuto) {
		var audio = audioObj.get(0);
		if (audio.autoTimer) {
			clearTimeout(audio.autoTimer)
		}
		if (!isAuto) {
			if (audio.readyState == 4) {
				audio.currentTime = 0;
				audio.volume = 0.1;
			} else {
				audio.autoTimer = setTimeout(function() {
					playBgAudio(audioObj);
				}, 200);
				return;
			}
		} else if (audio.volume < 0.9) {
			audio.volume += 0.1;
		} else {
			audio.volume = 1;
		}
		audio.play();
		if (audio.volume < 1) {
			audio.autoTimer = setTimeout(function() {
				playBgAudio(audioObj, true);
			}, 200);
		}
	},
	stopBgAudio = function(audioObj) {
		var audio = audioObj.get(0);
		if (audio.autoTimer) {
			clearTimeout(audio.autoTimer)
		}
		if (!!audio.paused) {
			return;
		}
		if (audio.volume > 0.1) {
			audio.volume -= 0.1;
		} else {
			audio.volume = 0;
		}
		if (audio.volume > 0) {
			audio.autoTimer = setTimeout(function() {
				stopBgAudio(audioObj);
			}, 10/((1-audio.volume)*(1-audio.volume)));
		} else {
			audio.pause();
		}
	},
	playAudio = function(audioObj) {
		var audio = audioObj.get(0);
		try {
			audio.pause();
			audio.currentTime = 0;
			audio.play();
		} catch(e) {}
	};
	
	onOffDiv.bind("click", function(e) {
		var isOn = !onOffSwitch.attr("checked");
		if (isOn) {
			if (window.colorBall.windFlag) {
				return;
			}
			luckyBtn.addClass("orange").removeClass("gray");
			playAudio(buttonAudio);
			playBgAudio(backgroundAudio);
			
			boxList.fadeIn(1000, function() {
				window.colorBall.windFlag = true;
			});
//			window.colorBall.powerStart(true);
			
		} else {
			if (!window.colorBall.windFlag) {
				return;
			}
			initBtn();
			window.colorBall.windFlag = false;
			buttonAudio.get(0).play();
			
			boxList.fadeOut(3000, function() {
			});
//			window.colorBall.powerOff();
			
		}
	});
	luckyBtn.bind("click", function(e) {
		if (luckyBtn.hasClass("gray")) {
			return;
		}
		window.colorBall.open = true;
		playAudio(buttonAudio);
	});
	
	
})(jQuery);