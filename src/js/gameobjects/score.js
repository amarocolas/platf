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