function GameCompleteState(_stateMachine)
{	
	var stateMachine = _stateMachine;
	var gameSize = stateMachine.gameSize;

	var init = function(){
		
		stateMachine.view.draw({shape:'rectangle',color:'rgba(255,255,255,0.8)',pos:{
			x:stateMachine.view.pos.x,
			y:stateMachine.view.pos.x
		},size:{x:gameSize.width,y:gameSize.width}});
		stateMachine.view.drawText({
			text:'SVEN IS HOME',font:"bold 48pt sans-serif",
			x:Math.abs(stateMachine.view.pos.x) + 150,
			y:stateMachine.view.pos.y + 300
		});

		addEventHandlers();
	}

	this.update = function(){

	}

	this.draw = function(){
		
	}

	this.destroy = function(){
		removeEventHandlers();
		stateMachine.view.clean();
	}

	this.getState = function(){
		return 'game_over_state';
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
			stateMachine.levelNumber = 0;
			stateMachine.lives = 3;
			stateMachine.view.clear();
			stateMachine.setState(stateMachine.GAME_LEVEL_STATE);
			break;
		}	
	}

	init();

	return this;
}

module.exports = GameCompleteState;