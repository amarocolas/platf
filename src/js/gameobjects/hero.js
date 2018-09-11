const PhysicVector = require('../gameeng/physicvector');
const Pixel = require('../gameeng/pixel');

const getHero = require('../gamedata/hero');

const Brick = require('./brick');

function Hero(){
	
	var isLeft = false,
		isRight = false,
		isJump = false,
		hitGround = false,
		isGrounded = false,
		ground = 0;
		dir = 0,
		accel = new PhysicVector(0, 0),
		vel = new PhysicVector(0, 0),
		GRAVITY = .5,
		maxSpeed = 30,
		atr = .1;
	
	this.shape = 'drawable';
	this.drawable = new Pixel(getHero());
	this.size = this.drawable.size;
	
	//GET USER INPUT
	
	var getKeyDownInput = function(event) {
	    if(event.keyCode == 37 || event.keyCode == 65) {
	        isLeft = true;
	    } else if(event.keyCode == 39 || event.keyCode == 68) {
	        isRight = true;
	    } else if (event.keyCode == 38 || event.keyCode == 87){
	    	if (hitGround) {
	    		hitGround = false;
	    		isJump = true;
	    	}
	    }
	}

	var getKeyUpInput = function(event) {
		if (event.keyCode == 37 || event.keyCode == 65) {
	        isLeft = false;
	    } else if (event.keyCode == 39 || event.keyCode == 68) {
        	isRight = false;
	    }
	}

	var addListeners = function(){
		document.addEventListener('keydown', getKeyDownInput);
		document.addEventListener('keyup', getKeyUpInput);	
	}

	var removeListeners = function(){
		document.removeEventListener('keydown', getKeyDownInput);
		document.removeEventListener('keyup', getKeyUpInput);
	}

	var getDir = function(){
		var result = 0;
		
		if(isRight) ++result;
		if(isLeft) --result;

		return result;
	}

	var addForce = function(force) {
		vel.add(force);
	}

	//PUBLIC FUNCTIONS

	this.init = function(_gameSize){
		this.pos.x = this.pos.y = 0;
		addListeners();
	}

	this.update = function(){

		var dir = getDir();

		accel.add(new PhysicVector(dir + (-vel.x * atr), GRAVITY));

		vel.add(accel);
		vel.limit(maxSpeed);

		if(Math.abs(vel.x) > 8) vel.x = 8 * (vel.x/Math.abs(vel.x));
		if(Math.abs(vel.x) < 1) vel.x = 0;

		if (isGrounded && hitGround) {
			vel.y = 0;
			this.pos.y = ground;
			if(isJump) {
				isJump = false;
				addForce(new PhysicVector(0, -10));
			};
		}

		isGrounded = false;

		this.pos.add(vel);
		accel.mult(0);

		this.drawable.update(dir);
	}

	this.hitWall = function(wallx){
		
	}

	this.hasHittenGround = function(rect) {
		hitGround = true;
		isGrounded = true;
		ground = rect.pos.y - this.size.y;
	}

	this.destroy = function(){
		removeListeners();
	}
};

Hero.prototype = new Brick();

module.exports = Hero;