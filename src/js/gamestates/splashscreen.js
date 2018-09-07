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