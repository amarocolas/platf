var heroSprite	= [{
	name: "chicken_walk",
	speed: .5,
	linesAmount : 11,
	linesLength : 11,
	frames:	[
				"*www*******"+
				"ywbw*******"+
				"*www*******"+
				"***w*****ww"+
				"***wwwwww**"+
				"***wwwwww**"+
				"***wwwww***"+
				"***wwwww***"+
				"****y*y****"+
				"****y*y****"+
				"****y*y****",

				"*www*******"+
				"ywbw*******"+
				"*www*******"+
				"***w*****ww"+
				"***wwwwww**"+
				"***wwwwww**"+
				"***wwwww***"+
				"***wwwww***"+
				"****y*y****"+
				"***y***y***"+
				"**y*****y**",
			],
	colorScheme: {
		y: "rgba(255, 255, 0, 1)",
		b: "rgba(0, 0, 0, 1)",
		w: "rgba(0, 0, 0, 1)"
	}
}];

var createSprites = function(spriteObjects, objectSize) {
	var sprites = {};

	spriteObjects.forEach(sprite => {
		var spr = {};

		spr.size = new PhysicVector(
			objectSize.x/sprite.linesLength,
			objectSize.y/sprite.linesAmount
		);
		
		spr.frames = [];

		sprite.frames.forEach((frame) => {
			var f = [];
			for (var i = 0; i < frame.length; i++) {
				let pxl = {};
				pxl.pos = new PhysicVector(
					i % sprite.linesLength * spr.size.x,
					Math.floor(i/sprite.linesAmount) * spr.size.y
				);
				pxl.color = sprite.colorScheme[frame] || "";
				f.push(pxl);
			}
			spr.frames.push(f);
		});

		sprites[sprite.name] = spr;
	});

	return sprites;
};