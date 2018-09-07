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