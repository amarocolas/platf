(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const GameStateMachine = require('./game_state_machine');

function Game () {
	var animFrame = window.requestAnimationFrame ||
	            window.webkitRequestAnimationFrame ||
    	        window.mozRequestAnimationFrame    ||
        	    window.oRequestAnimationFrame      ||
            	window.msRequestAnimationFrame     ||
				null ,
		gameStateMachine = GameStateMachine(),
		update = () => {
			gameStateMachine.update();
			gameStateMachine.draw();
		},
		setup = () => {
			gameStateMachine.setState(gameStateMachine.SPLASH_STATE);

			if ( animFrame !== null ) {
				var recursiveAnim = function() {
					update();
					animFrame( recursiveAnim );
				};
				animFrame( recursiveAnim );
			} else {
				animFrame = window.setInterval(update, 20);
			}
		};

	setup();
};

module.exports = Game;
},{"./game_state_machine":2}],2:[function(require,module,exports){
const SplashState = require('./gamestates/splashscreen');
const GameLevelState = require('./gamestates/level');
const GameOverState = require('./gamestates/gameover');

const GameView = require('./gameeng/view');

var GameStateMachine = (gameConf) => {

	this.SPLASH_STATE = 'splash_state';
	this.GAME_LEVEL_STATE = 'game_level_state';
	this.GAME_OVER_STATE = 'game_over_state';

	var gameState = null;

	this.gameSize = {width:3200, height:600};
	this.viewSize = {width:800, height:600};
	
	this.view = new GameView(this.gameSize);
	this.view.init('game_canvas');
	this.view.size(this.viewSize.width, this.viewSize.height);

	this.update = function()
	{
		if(gameState != null) gameState.update();	
	}

	this.draw = function()
	{
		if(gameState != null) gameState.draw();
	}

	this.destroy = function()
	{
		if(gameState != null) gameState.destroy();
	}

	this.getState = function()
	{
		var res = "no_state_set";
		if(gameState != null) res = gameState.getState();
		return res;
	}

	this.setState = function(newState)
	{
		if(gameState != null) this.destroy();

		switch (newState){
		
			case this.SPLASH_STATE:
				gameState = SplashState(this);
				break;
			case this.GAME_LEVEL_STATE:
				gameState = GameLevelState(this);
				break;
			case this.GAME_OVER_STATE:
				gameState = GameOverState(this);
				break;
			default :
				break;
		}
	}

	return this;
}

module.exports = GameStateMachine;
},{"./gameeng/view":8,"./gamestates/gameover":14,"./gamestates/level":15,"./gamestates/splashscreen":16}],3:[function(require,module,exports){
function CollisionDetection () {

	// ellipse X rectangle collision

	this.ellipseRectCollision = function (el, rect){
		var result = false;

		if( ball.y + ball.radius > rect.pos.y &&
			ball.y - ball.radius < rect.pos.y + rect.size.y &&
			ball.x + ball.radius > rect.pos.x &&
			ball.x - ball.radius < rect.pos.x + rect.size.x ){

			result = true;
		}

		return result;
	}

	// rectangle X rectangle collision

	this.rectCollision = function (r1, r2) {
		var result = false;
	
		if ( (r1.pos.x < r2.pos.x + r2.size.x && r1.pos.x + r1.size.y > r2.pos.x) && 
			 (r1.pos.y + r1.size.y > r2.pos.y && r1.pos.y < r2.pos.y + r2.size.y) ){
			result = true;
		}

		return result;
	}
}


module.exports = CollisionDetection;
},{}],4:[function(require,module,exports){
//basic event system
event = {};
event.subs = [];
event.subsIndex = [];
event.published = {};

event.sub = function(to,cb){

    var ci = event.subsIndex.indexOf(to);

    if (ci == -1){
        event.subsIndex.push(to);
        event.subs.push([]);
        ci = event.subsIndex.length-1;
    }

    event.subs[ci].push({'to':to,'cb':cb});
}

event.pub = function(to,param){
    var triggerIndex = event.subsIndex.indexOf(to);

    event.published[to] = param || true;
    
    if (triggerIndex == -1) return null;

    for (var i=0, len = event.subs[triggerIndex].length; i < len; i++)
    {
        event.subs[triggerIndex][i].cb(param);
    }
}

event.executeAfter = function(to,cb){
	
	if (event.published[to]){
		cb(event.published[to]);
	}
	else{
		event.sub(to,cb);	
	}
}

module.exports = event;
},{}],5:[function(require,module,exports){
function ImageElement(image){
	var imgElem = document.createElement("img");
	imgElem.src = image;

	return imgElem;
}

module.exports = ImageElement;
},{}],6:[function(require,module,exports){
function PhysicVector(x, y){

    this.x = x;
    this.y = y;

    this.add = function(vec){
        this.x += vec.x;
        this.y += vec.y;
    };

    this.sub = function(vec){
        this.x -= vec.x;
        this.y -= vec.y;
    };

    this.mult = function(num){
        this.x *= num;
        this.y *= num;
    };

    this.div = function(num){
        this.x = this.x/num;
        this.y = this.y/num;
    };

    this.getVec = function(){
        return new PhysicVector(this.x, this.y);
    };

    this.mag = function(){
        return Math.sqrt( (this.x * this.x) + (this.y * this.y) );
    }

    this.limit = function(value){
        if (this.mag() > value){
            
            this.div(this.mag());
            this.mult(value);
        }
    }
}

module.exports = PhysicVector;
},{}],7:[function(require,module,exports){
const PhysicVector = require('../gameeng/physicvector');

var galinhaleft	=[	
    "*www*******"+
    "ywbw*******"+
    "*www*******"+
    "***w*****ww"+
    "***wwwwww**"+
    "***wwwwww**"+
    "***wwwww***"+
    "***wwwww***"+
    "****y*y****"+
    "****y*y****"+
    "****y*y****",

    "*www*******"+
    "ywbw*******"+
    "*www*******"+
    "***w*****ww"+
    "***wwwwww**"+
    "***wwwwww**"+
    "***wwwww***"+
    "***wwwww***"+
    "****y*y****"+
    "***y***y***"+
    "**y*****y**"
];

var galinharight=[	
    "*******www*"+
    "*******wbwy"+
    "*******www*"+
    "ww*****w***"+
    "**wwwwww***"+
    "**wwwwww***"+
    "***wwwww***"+
    "***wwwww***"+
    "****y*y****"+
    "****y*y****"+
    "****y*y****",

    "*******www*"+
    "*******wbwy"+
    "*******www*"+
    "ww*****w***"+
    "**wwwwww***"+
    "**wwwwww***"+
    "***wwwww***"+
    "***wwwww***"+
    "****y*y****"+
    "***y***y***"+
    "**y*****y**"
];

function Pixel() {

    this.linesAmount = 11;
	this.linesLength = 11;
    this.pixelSize = new PhysicVector(5,5);
    this.img = galinhaleft[0];
	this.animSpeed = 200;
    this.framecounter = 0;
    this.lastFrameUpdate = new Date();

    this.colors = {
        w: "rgba(255, 255, 255, 1)",
        b: "rgba(0, 0, 0, 1)",
        y: "rgba(255, 255, 0, 1)"
    };

    this.update = (dir) => {
        if (dir < 0) {
			if (new Date() - this.lastFrameUpdate > this.animSpeed) {
				this.lastFrameUpdate = new Date();
				this.framecounter = (this.framecounter + 1)%galinhaleft.length;
				this.img = galinhaleft[this.framecounter];
			}
		} else if (dir > 0) {
			if (new Date() - this.lastFrameUpdate > this.animSpeed) {
				this.lastFrameUpdate = new Date();
				this.framecounter = (this.framecounter + 1)%galinharight.length;
				this.img = galinharight[this.framecounter];
			}
		}
    };
};

module.exports = Pixel;
},{"../gameeng/physicvector":6}],8:[function(require,module,exports){
const PhysicVector = require('./physicvector');
const ImageElement = require('./imageelement');

function GameView(gameSize){
	this.pos = new PhysicVector(0, 0);
	this.cameraSize = new PhysicVector(800, 600);
	this.gameSize = gameSize;

	var _bgColor = "rgba(200, 200, 200, 1)";

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
},{"./imageelement":5,"./physicvector":6}],9:[function(require,module,exports){
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
},{"../gameeng/physicvector":6}],10:[function(require,module,exports){
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
},{"../gameeng/physicvector":6,"./brick":9}],11:[function(require,module,exports){
const PhysicVector = require('../gameeng/physicvector');
const Pixel = require('../gameeng/pixel');

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
	
	this.shape = 'pxl';
	this.drawable = new Pixel();

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
		this.size.x = 44;
		this.size.y = 40;
		this.drawable.pixelSize.x = this.size.x/this.drawable.linesLength;
		this.drawable.pixelSize.y = this.size.y/this.drawable.linesAmount;

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
},{"../gameeng/physicvector":6,"../gameeng/pixel":7,"./brick":9}],12:[function(require,module,exports){
const Brick = require('./brick');
const Explosion = require('./explosion');

function Level(){
	
	var bricksToRemove = [],
		explosions = [],
		gameSize;
		
	this.elements = [];
	this.levelExit = null;

	//PUBLIC FUNCTIONS

	this.init = function(_gameSize, intLvl){
		var blocks = intLvl.blocks;
		var levelStuff = intLvl.levelStuff;

		gameSize = _gameSize;
		
		for (var index in blocks)
		{
			var block = blocks[index];
			var brick = new Brick();
			brick.brickType = 'ground';
			brick.init(block.x, block.y);
			brick.setSize(block.width, block.height);
			brick.setColor(block.color);
			this.elements.push(brick);
		}

		for (var index in levelStuff) {

			var thing = levelStuff[index];
			var brick = new Brick();
			brick.brickType = 'thing';
			brick.init(thing.x,thing.y);
			brick.setSize(thing.width, thing.height);
			brick.setColor(thing.color);
			this.elements.push(brick);
		}

		if (intLvl.levelExit) {
			this.levelExit = intLvl.levelExit;
			var brick = new Brick();
			brick.init(this.levelExit.x,this.levelExit.y);
			brick.setSize(this.levelExit.width, this.levelExit.height);
			brick.setColor(this.levelExit.color);
			this.levelExit = brick;
		}
		explosions = [];
	}

	this.update = function(){

		for(var i = bricksToRemove.length; i > 0; i--)
		{
			this.elements.splice(bricksToRemove[i - 1], 1);
			bricksToRemove.pop();
		}

		for(var w = explosions.length; w > 0; w--)
		{
			
			if(explosions[w-1].update())
			{
				explosions[w - 1].destroy();
				explosions.splice(w - 1, 1);
			}
		}
	}

	this.addExplosion = function(elem)
	{
		var expl = new Explosion();
		expl.init(elem.pos.x, elem.pos.y, elem.size.x, elem.size.y);
		expl.setColor(elem.color, 1);
		if(explosions == undefined)
		{
			explosions = [expl];
		}else{
			explosions.push(expl);
		}
	}

	this.draw = function(view){
		for(var i=0; i < this.elements.length; i++)
		{	
			view.draw(this.elements[i]);
		}
		
		view.draw(this.levelExit);
		for(var w = explosions.length; w > 0; w--)
		{
			for(var t = 0; t < explosions[w - 1].parts.length; t++)
			{
				view.draw(explosions[w - 1].parts[t]);
			}
		}
	}

	// PRIVATE FUNCTIONS

	this.removeBrick = function(index){
		this.addExplosion(this.elements[index]);
		bricksToRemove.push(index);
	}
}

module.exports = Level;
},{"./brick":9,"./explosion":10}],13:[function(require,module,exports){
function Score(){

	this.points = 0;
	this.lives = 3;
	var view;

	this.addPoint = function(){
		this.points++;
		if(view != null) this.draw(view);
	}

	this.setView = function(_view){
		view = _view;
		this.draw(view);
	}

	this.draw = function(){
		//view = _view;
		//view.clear();

		view.draw({shape:'score', color:"#35C115", lives:this.lives, points:this.points} );
	}
}

module.exports = Score;
},{}],14:[function(require,module,exports){
const Score = require('../gameobjects/score');

function GameOverState(_stateMachine)
{	
	var stateMachine = _stateMachine;
	var gameSize = stateMachine.gameSize;

	var init = function(){

		stateMachine.view.draw({shape:'rectangle',color:'rgba(255,255,255,0.8)',x:0,y:0,width:gameSize.width,height:gameSize.width});
		stateMachine.view.drawText({text:'game over',font:"bold 98pt sans-serif",x:70,y:300});
	}

	this.update = function(){

	}

	this.draw = function(){
		
	}

	this.destroy = function(){
		stateMachine.view.clean();
	}

	this.getState = function(){
		return 'game_over_state';
	}

	init();

	return this;
}

module.exports =GameOverState;
},{"../gameobjects/score":13}],15:[function(require,module,exports){
const CollisionDetection = require('../gameeng/collisiondetection');
const event = require('../gameeng/event');

const Score = require('../gameobjects/score');
const Hero = require('../gameobjects/hero');
const Level = require('../gameobjects/level');

const getIntro = require('../levels');

function GameLevelState(_stateMachine) {
	var stateMachine = _stateMachine;
	var gameSize = stateMachine.gameSize;

	var hero = new Hero();
	var gameLevel = new Level();
	var score = new Score();
	var colCheck = new CollisionDetection();
	
	var init = function(){
		hero.init(gameSize);
		gameLevel.init(gameSize, getIntro());

		score.setView(stateMachine.view);

		registerEvents();
	}

	this.update = function(){
		
		for(var i=0; i < gameLevel.elements.length; i++)
		{
			if (gameLevel.elements[i].brickType &&
				typeof gameLevel.elements[i].brickType !== 'undefined' &&
				colCheck.rectCollision(hero, gameLevel.elements[i]))
			{
				switch (gameLevel.elements[i].brickType) {
					case 'thing':
						gameLevel.removeBrick(i);
						break;
					case 'ground':
						if (hero.y + (hero.height * .4) > gameLevel.elements[i].pos.y && 
							hero.y < gameLevel.elements[i].pos.y + gameLevel.elements[i].size.y) {
							
						} else {
							hero.hasHittenGround(gameLevel.elements[i]);
						}
						break;
					default:
						break;
				}
			}
		}

		hero.update();
		gameLevel.update();
		
		if(colCheck.rectCollision(hero, gameLevel.levelExit) ){
			event.pub("nextLevel");
		}
	}

	this.draw = function(){
		stateMachine.view.clear();
		stateMachine.view.centerOnElement(hero.pos);
		stateMachine.view.draw(hero);
		gameLevel.draw(stateMachine.view);
		score.draw();
	}

	this.destroy = function(){
		deregisterEvents();
	}

	this.getState = function(){
		return 'game_level_state';
	}

	var registerEvents = function(){
		
		event.sub("gameover",function(){
			stateMachine.setState(stateMachine.GAME_OVER_STATE);
		})

		event.sub("nextLevel",function(){
			stateMachine.setState(stateMachine.SPLASH_STATE);
		})
		
		event.sub("brickhit",function(){
			score.addPoint();
		})
	}

	var deregisterEvents = function(){
		event.sub("gameover",function(){
			
		})

		event.sub("nextLevel",function(){
			
		})
		
		event.sub("brickhit",function(){
			
		})
	}

	init();

	return this;
}

module.exports = GameLevelState;
},{"../gameeng/collisiondetection":3,"../gameeng/event":4,"../gameobjects/hero":11,"../gameobjects/level":12,"../gameobjects/score":13,"../levels":18}],16:[function(require,module,exports){
const Score = require('../gameobjects/score');

function SplashState(_stateMachine)
{	
	var stateMachine = _stateMachine;
	var gameSize = stateMachine.gameSize;

	var i = 0;
	var timerStamp;
	var score = new Score();

	var init = function(){
		timerStamp = new Date().getTime();
		addEventHandlers();

		//scoreView.init('score');
		score.setView(stateMachine.view);
	}

	this.update = function(){
		if(new Date().getTime() > timerStamp + 500)
		{
			timerStamp = new Date().getTime();
			i++;
		}
	}

	this.draw = function(){
		if (i % 2){
			stateMachine.view.clear();
		}
		else{
			stateMachine.view.drawText({text:"Press enter to start",font:"bold 48pt sans-serif",x:100,y:300});
		}

		score.draw();
	}

	this.destroy = function(){
		removeEventHandlers();
		stateMachine.view.clean();
	}

	this.getState = function(){
		return 'splash_state';
	}

	var addEventHandlers = function(){
		document.addEventListener('keydown', onKeyDown);
	}

	var removeEventHandlers = function(){
		document.removeEventListener('keydown', onKeyDown);
	}

	function onKeyDown(e){
			
		switch (e.keyCode){
		
		case 13:
			stateMachine.view.clear();
			stateMachine.setState(stateMachine.GAME_LEVEL_STATE);
			break;
		}	
	}

	init();

	return this;
}

module.exports = SplashState;
},{"../gameobjects/score":13}],17:[function(require,module,exports){
const Game = require('./game');

Game();
},{"./game":1}],18:[function(require,module,exports){
function getIntro(){
	var level = {};

	level.blocks=[
		{x: 50, y: 520, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 100, y: 400, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 300, y: 400, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 600, y: 400, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 800, y: 400, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 1000, y: 350, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 1200, y: 350, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 1600, y: 350, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 1800, y: 350, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 2000, y: 350, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 2200, y: 350, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 2400, y: 350, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 2600, y: 235, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 2800, y: 235, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 3000, y: 235, width: 100, height: 30, color: "hsla(213, 100%, 90%, .4)"},
		{x: 0, y: 550, width: 3200, height: 50, color: "#A3B6BD"}
	];

	level.levelStuff = [
		{x: 200, y: 355, width: 30, height: 30, color: "hsla(120, 100%, 90%, .6)"},
		{x: 200, y: 325, width: 30, height: 30, color: "hsla(120, 100%, 90%, .6)"},
		{x: 200, y: 295, width: 30, height: 30, color: "hsla(120, 100%, 90%, .6)"},
		{x: 200, y: 265, width: 30, height: 30, color: "hsla(120, 100%, 90%, .6)"},
		{x: 230, y: 355, width: 30, height: 30, color: "hsla(120, 100%, 90%, .6)"}
	];

	level.levelExit = {x: 3150, y: 400, width: 50, height: 100, color: "hsla(322, 0%, 0%, 1)"};

	return level;

}

module.exports = getIntro;
},{}]},{},[17]);
