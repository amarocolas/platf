const PhysicVector = require('../gameeng/physicvector');
const Brick = require('./brick');

function Explosion(){

	this.color = "rgba(250, 250, 250, 1)";
	this.parts = [];

	var opacity = 1;

	this.setColor = function(_c, _o){
		_c = _c.substring(_c.indexOf('('), _c.lastIndexOf(','))
		this.color = "hsla" + _c + ", " + _o + ")";
	}

	this.init = function(_x, _y, _width, _heigth){
		var _l = 5;
		var centerX = _x + _width/2;
		var centerY = _y + _heigth/2;
		var xAmount = Math.floor(_width/5);
		var yAmount = Math.floor(_heigth/5);

		for(var i = 0; i < xAmount; i++)
		{
			for(var t = 0; t < yAmount; t++)
			{
				var part = new Part();
				var partX = _x + (_l * i);
				var partY =  _y + (_l * t);
				part.speed = {x:(partX - centerX)/5, y:(partY - centerY)/5};
				part.init( partX, partY, _l);
				this.parts.push(part);
			}
		}
	}

	this.update = function(){
		var isOver;

		if(opacity > 0) 
		{
			opacity -= .02;
		
			this.setColor(this.color, opacity);

			for(var i = 0; i < this.parts.length; i++)
			{
				this.parts[i].update();
				this.parts[i].setColor(this.color);	
			}

			isOver = false;
		}else{
			isOver = true;
		}

		return isOver;
	}

	this.destroy = function(){
		
		for(var i = 0; i < this.parts.length; i++)
		{
			this.parts[i] = null;
		}
	}
}

function Part(){
	this.size.x = 100;
	this.size.y = 20;
	this.color = "rgba(250, 250, 250, 1)";
	this.speed = new PhysicVector(0, 0);
	var gravity = .5;

	this.update = function(){
		this.speed.y += gravity;

		this.pos.x += this.speed.x;
		this.pos.y += this.speed.y;
	}

	this.setColor = function(_c){
		this.color = _c;
	}

	this.init = function(_x, _y, _l){
		this.pos.x = _x;
		this.pos.y = _y;
		this.size.x = this.size.y = _l;
	}
}

Part.prototype = new Brick();

module.exports = Explosion;