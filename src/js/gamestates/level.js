const CollisionDetection = require('../gameeng/collisiondetection');
const event = require('../gameeng/event');

const Score = require('../gameobjects/score');
const Hero = require('../gameobjects/hero');
const Level = require('../gameobjects/level');

const getLevel = require('../gamedata/levels');

function GameLevelState(_stateMachine) {
	var stateMachine = _stateMachine;
	var gameSize = stateMachine.gameSize;

	var hero = new Hero();
	var gameLevel = new Level();
	var score = new Score();
	var colCheck = new CollisionDetection();
	
	var init = function(){
		hero.init(gameSize);
		gameLevel.init(gameSize, getLevel(stateMachine.levelNumber));

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

		gameLevel.enemies.forEach(enem => {
			if (colCheck.rectCollision(hero, enem)) {
				event.pub("gameover");
			};
		});

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
			if (stateMachine.levelNumber < 3) {
				stateMachine.levelNumber += 1;
				stateMachine.setState(stateMachine.GAME_LEVEL_STATE);
			} else {
				stateMachine.setState(stateMachine.SPLASH_STATE);
			}
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