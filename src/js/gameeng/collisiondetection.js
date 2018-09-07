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