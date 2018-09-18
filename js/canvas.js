/* 
 * author：Qyujie
 */
$(function() {
	var canvas = document.getElementById("mycanvas"),
		ctx = canvas.getContext("2d"),
		arcArray = {},
		arcArrayIndex = 0,
		arcArrayNum = 0.5,
		canvasArc = {
			X: 0,
			Y: 0,
			width: canvas.width,
			height: canvas.height
		};

	function renderFrame() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if(Math.random() > arcArrayNum) {
			new arc();
		}
		for(var i in arcArray) {
			arcArray[i].X += Math.cos(arcArray[i].diarcion) * arcArray[i].speed;
			arcArray[i].Y += Math.sin(arcArray[i].diarcion) * arcArray[i].speed;
			arcArray[i].R += 0.08;
			if(!collision_detection(canvasArc, arcArray[i])) {
				delete arcArray[i];
			} else {
				drawarc(arcArray[i]);
			}

		}
		requestAnimationFrame(renderFrame); //动画
	}

	requestAnimationFrame(renderFrame);

	function arc() //圆形对象构造器
	{
		this.X = canvas.width / 2;
		this.Y = canvas.height / 2;
		this.R = 0;
		this.color = grtRandomColor();
		this.diarcion = getRandomDiarcion();
		this.speed = getRandomSpeed(1, 3);
		arcArrayIndex = 0;
		while(true) {
			if(arcArray[arcArrayIndex] == undefined) {
				arcArray[arcArrayIndex] = this;
				break;
			} else
				arcArrayIndex++;
		}

	}

	function drawarc(arc) { //绘制圆形
		ctx.fillStyle = arc.color;
		ctx.beginPath();
		ctx.arc(arc.X, arc.Y, arc.R, 0, 2 * Math.PI);
		ctx.fill();
	}

	function getRandomSpeed(minSpeed, maxSpeed) { //获得一个速度
		return Math.random() * (maxSpeed - minSpeed) + minSpeed;
	}

	function grtRandomColor() {//获得一个颜色
		return "rgba(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + "," + (Math.random() * 3 + 7) / 10 + ")";
	}

	function getRandomDiarcion() {//获得一个运动方向
		return Math.PI * 2 * Math.random();
	}

	function collision_detection(rect, arc) { //矩形与园形的碰撞检测
		if(((arc.X >= -arc.R + rect.X && arc.X <= rect.width + arc.R + rect.X) && (arc.Y >= rect.Y && arc.Y <= rect.height + rect.Y)) ||
			((arc.Y >= -arc.R + rect.Y && arc.Y <= rect.height + arc.R + rect.Y) && (arc.X >= rect.X && arc.X <= rect.width + rect.X)) ||
			Math.pow((Math.pow(arc.X - rect.X, 2) + Math.pow(arc.Y - rect.Y, 2)), 0.5) <= arc.R ||
			Math.pow((Math.pow(arc.X - rect.X, 2) + Math.pow(arc.Y - rect.height - rect.Y, 2)), 0.5) <= arc.R ||
			Math.pow((Math.pow(arc.X - rect.width - rect.X, 2) + Math.pow(arc.Y - rect.Y, 2)), 0.5) <= arc.R ||
			Math.pow((Math.pow(arc.X - rect.width - rect.X, 2) + Math.pow(arc.Y - rect.height - rect.Y, 2)), 0.5) <= arc.R)
			return true;
		else
			return false;
	}

});