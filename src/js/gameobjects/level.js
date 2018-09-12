const Brick = require('./brick');
const Enemy = require('./enemy');
const Explosion = require('./explosion');

function Level(){
	
	var bricksToRemove = [],
		explosions = [],
		gameSize;
		
	this.elements = [];
	this.enemies = [];
	this.levelExit = null;

	//PUBLIC FUNCTIONS

	this.init = function(_gameSize, intLvl){
		var blocks = intLvl.blocks;
		var levelStuff = intLvl.levelStuff;
		var enemies = intLvl.enemies;

		gameSize = _gameSize;
		
		blocks.forEach( elem => {
			var brick = new Brick();
			brick.brickType = 'ground';
			brick.init(elem.x, elem.y);
			brick.setSize(elem.width, elem.height);
			brick.setColor(elem.color);
			this.elements.push(brick);
		});

		levelStuff.forEach(elem => {
			var brick = new Brick();
			brick.brickType = 'thing';
			brick.init(elem.x,elem.y);
			brick.setSize(elem.width, elem.height);
			brick.setColor(elem.color);
			this.elements.push(brick);
		});

		enemies.forEach( elem => {
			var enemy = new Enemy();
			enemy.brickType = 'enemy';
			enemy.init(elem.x,elem.y,elem.type);
			this.enemies.push(enemy);
		});

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

		this.enemies.forEach( elem => {
			elem.update();
		});
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

		this.enemies.forEach( elem => {
			view.draw(elem);
		});
		
		view.draw(this.levelExit);
		for(var w = explosions.length; w > 0; w--)
		{
			for(var t = 0; t < explosions[w - 1].parts.length; t++)
			{
				view.draw(explosions[w - 1].parts[t], true);
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