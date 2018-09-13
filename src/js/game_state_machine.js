const SplashState = require('./gamestates/splashscreen');
const GameLevelState = require('./gamestates/level');
const GameOverState = require('./gamestates/gameover');
const GameCompleteState = require('./gamestates/gamecomplete');

const GameView = require('./gameeng/view');

var GameStateMachine = (gameConf) => {

	this.SPLASH_STATE = 'splash_state';
	this.GAME_LEVEL_STATE = 'game_level_state';
	this.GAME_OVER_STATE = 'game_over_state';
	this.GAME_COMPLETE_STATE = 'game_complete_state';

	var gameState = null;

	this.gameSize = {width:3200, height:600};
	this.viewSize = {width:800, height:600};
	
	this.levelNumber = 0;
	this.lives = 3;

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
			case this.GAME_COMPLETE_STATE:
				gameState = GameCompleteState(this);
				break;
			default :
				break;
		}
	}

	return this;
}

module.exports = GameStateMachine;