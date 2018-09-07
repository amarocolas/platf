const PhysicVector = require('./physicvector');
const ImageElement = require('./imageelement');

function GameView(gameSize){
	this.pos = new PhysicVector(0, 0);
	this.cameraSize = new PhysicVector(800, 600);
	this.gameSize = gameSize;

	var _bgColor = "rgba(0, 224, 255, 1)";

	var canvas;
	var ctx;

 	this.init = function(id){
 		canvas = document.getElementById(id);
 		ctx = canvas.getContext("2d");
 		ctx.canvas.width  = this.cameraSize.x;
 		ctx.canvas.height = this.cameraSize.y;
 	}
 	
 	this.clear = function(){
		ctx.fillStyle = _bgColor;
		ctx.fillRect(0, 0, _width, _height);
	}

	this.clean = function(){
		ctx.fillRect(0, 0, _width, _height);
		ctx.clearRect(0, 0, _width, _height);
	}

	this.draw = function(object){
		switch (object.shape)
		{
			case "rectangle":
				ctx.fillStyle = object.color;
				ctx.fillRect(
					this.pos.x + object.pos.x, 
					this.pos.y + object.pos.y, 
					object.size.x, 
					object.size.y
				);
				ctx.fillStyle = "hsla(0, 0%, 0%, .3)";
				ctx.fillRect(
					this.pos.x + object.pos.x, 
					this.pos.y + object.pos.y + object.size.y - 2,
					object.size.x, 
					2
				);
				ctx.fillRect(
					this.pos.x + object.pos.x,
					this.pos.y + object.pos.y,
					2,
					object.size.y - 2
				);
				break;
			case "score":
				ctx.fillStyle = object.color;
				ctx.font = "bold 32pt sans-serif"
				ctx.fillText("Kip",10,40);
				ctx.fillText("lives "+(object.lives || 0),_width-200,40);
				break;
			case "image":
				ctx.drawImage(
					object.img, 
					this.pos.x + object.pos.x, 
					this.pos.y + object.pos.y, 
					object.size.x, 
					object.size.y
				);
				break;
			case "pxl":
				let totalAmount = object.drawable.linesLength * object.drawable.linesAmount;
				for(var i = 0; i < totalAmount; i++) {
					var posX = i % object.drawable.linesLength;
					var posY = Math.floor(i/object.drawable.linesAmount);
					if (object.drawable.colors[object.drawable.img[i]]) {
						ctx.fillStyle = object.drawable.colors[object.drawable.img[i]];
						ctx.fillRect(
							this.pos.x + object.pos.x + object.drawable.pixelSize.x * posX,
							this.pos.y + object.pos.y + object.drawable.pixelSize.y * posY,
							object.drawable.pixelSize.x,
							object.drawable.pixelSize.y
						);
					}
				}
				break;
			default:
				break;
		}	
	}
	
	this.drawText = function(o){
		var context = ctx;
		context.fillStyle="#35C115";
		context.font=o.font;
		context.shadowOffsetX=4;
		context.shadowOffsetY=4;
		context.shadowBlur=3;
		context.fillText(
			o.text, 
			this.pos.x + o.x, 
			this.pos.y + o.y
		);
		context.strokeText(
			o.text, 
			this.pos.x + o.x, 
			this.pos.y + o.y
		);
	}

	this.centerOnElement = function(elemPos) {
		var elemX = elemPos.x | 0;
		var elemY = elemPos.y | 0;

		this.moveCamera({
			x: this.cameraSize.x/2 - elemX,
			y: this.cameraSize.y/2 - elemY
		})
	}

	this.moveCamera = function(diff) {
		var diffX = diff.x | 0;
		var diffY = diff.y | 0;

		this.pos.x = diffX;
		this.pos.y = diffY;

		if (this.pos.x > 0) {
			this.pos.x = 0;
		} else if(this.pos.x < this.cameraSize.x - this.gameSize.width ) {
			this.pos.x = this.cameraSize.x - this.gameSize.width;
		}
		
		if (this.pos.y > 0) {
			this.pos.y = 0;
		} else if(this.pos.y < this.cameraSize.y - this.gameSize.height) {
			this.pos.y = this.cameraSize.y - this.gameSize.height;
		}

		return this.pos;
	}

	this.bgColor = function(value){
		_bgColor = value;
	}

	this.size = function(width, height){
		_width = width;
		_height = height;

		ctx.canvas.width  = _width;
 		ctx.canvas.height = _height;
	}
}

module.exports = GameView;