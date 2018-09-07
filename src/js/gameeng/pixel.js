const PhysicVector = require('../gameeng/physicvector');

var galinhaleft	=[	
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
    "**y*****y**"
];

var galinharight=[	
    "*******www*"+
    "*******wbwy"+
    "*******www*"+
    "ww*****w***"+
    "**wwwwww***"+
    "**wwwwww***"+
    "***wwwww***"+
    "***wwwww***"+
    "****y*y****"+
    "****y*y****"+
    "****y*y****",

    "*******www*"+
    "*******wbwy"+
    "*******www*"+
    "ww*****w***"+
    "**wwwwww***"+
    "**wwwwww***"+
    "***wwwww***"+
    "***wwwww***"+
    "****y*y****"+
    "***y***y***"+
    "**y*****y**"
];

function Pixel() {

    this.linesAmount = 11;
	this.linesLength = 11;
    this.pixelSize = new PhysicVector(5,5);
    this.img = galinhaleft[0];
	this.animSpeed = 200;
    this.framecounter = 0;
    this.lastFrameUpdate = new Date();

    this.colors = {
        w: "rgba(255, 255, 255, 1)",
        b: "rgba(0, 0, 0, 1)",
        y: "rgba(255, 255, 0, 1)"
    };

    this.update = (dir) => {
        if (dir < 0) {
			if (new Date() - this.lastFrameUpdate > this.animSpeed) {
				this.lastFrameUpdate = new Date();
				this.framecounter = (this.framecounter + 1)%galinhaleft.length;
				this.img = galinhaleft[this.framecounter];
			}
		} else if (dir > 0) {
			if (new Date() - this.lastFrameUpdate > this.animSpeed) {
				this.lastFrameUpdate = new Date();
				this.framecounter = (this.framecounter + 1)%galinharight.length;
				this.img = galinharight[this.framecounter];
			}
		}
    };
};

module.exports = Pixel;