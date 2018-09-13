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

	this.draw = function(numLives, level){
		view.draw({shape:'score', color:"#35C115", lives:numLives, level: level + 1, points:this.points} );
	}
}

module.exports = Score;