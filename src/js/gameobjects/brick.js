const PhysicVector = require('../gameeng/physicvector');

function Brick(){

	this.pos = new PhysicVector(0, 0),
	this.size = new PhysicVector(100, 20),
	this.color = "#AAAAAA";
	this.shape = "rectangle";

	this.setColor = function(_c){
		this.color = _c;
	}

	this.setSize = function(_w, _h){
		this.size.x = _w;
		this.size.y = _h;
	}

	this.init = function(_x, _y){
		this.pos.x = _x;
		this.pos.y = _y;
	}

	this.draw = function(view){
		view.draw(this);
	}

	this.update = function(){
		
	}

	this.destroy = function(){
		
	}
}

module.exports = Brick;