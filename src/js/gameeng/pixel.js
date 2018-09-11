function Pixel(pixelData) {

	this.sprites = pixelData.sprites;
    this.linesAmount = pixelData.linesAmount;
	this.linesLength = pixelData.linesLength;
	this.size = pixelData.size;
    this.pixelSize = pixelData.pixelSize;
	this.animSpeed = pixelData.animSpeed;
    this.framecounter = pixelData.framecounter;
    this.lastFrameUpdate = pixelData.lastFrameUpdate;
    this.colors = pixelData.colors;

    this.img = this.sprites[1][0];

    this.update = (dir) => {
        if (dir < 0) {
			if (new Date() - this.lastFrameUpdate > this.animSpeed) {
				this.lastFrameUpdate = new Date();
				this.framecounter = (this.framecounter + 1)%this.sprites[0].length;
				this.img = this.sprites[0][this.framecounter];
			}
		} else if (dir > 0) {
			if (new Date() - this.lastFrameUpdate > this.animSpeed) {
				this.lastFrameUpdate = new Date();
				this.framecounter = (this.framecounter + 1)%this.sprites[1].length;
				this.img = this.sprites[1][this.framecounter];
			}
		}
    };
};

module.exports = Pixel;