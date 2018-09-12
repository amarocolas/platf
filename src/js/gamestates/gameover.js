const Score = require('../gameobjects/score');

function GameOverState(_stateMachine)
{	
	var stateMachine = _stateMachine;
	var gameSize = stateMachine.gameSize;

	var init = function(){

		stateMachine.view.draw({shape:'rectangle',color:'rgba(255,255,255,0.8)',pos:{x:0,y:0},size:{x:gameSize.width,y:gameSize.width}});
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