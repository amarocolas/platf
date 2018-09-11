const PhysicVector = require('../gameeng/physicvector');

var whiteChicken = [[
    //left
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
],[
    //right
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
]];

var brownChicken = [[
    //left
    "*gwg*******"+
    "ywbm*******"+
    "*mwg*******"+
    "***m*****ww"+
    "***gwgmgm**"+
    "***mmwgmw**"+
    "***gwmwg***"+
    "***wgmgw***"+
    "****y*y****"+
    "****y*y****"+
    "****y*y****",

    "*gwg*******"+
    "ywbm*******"+
    "*mwg*******"+
    "***m*****ww"+
    "***gwgmgm**"+
    "***mmwgmw**"+
    "***gwmwg***"+
    "***wgmgw***"+
    "****y*y****"+
    "***y***y***"+
    "**y*****y**"
],[
    //right
    "*******gwg*"+
    "*******wbmy"+
    "*******mwg*"+
    "ww*****m***"+
    "**mgmgwg***"+
    "**wmgwmm***"+
    "***gwmwg***"+
    "***wgmgw***"+
    "****y*y****"+
    "****y*y****"+
    "****y*y****",

    "*******gwg*"+
    "*******wbmy"+
    "*******mwg*"+
    "ww*****m***"+
    "**mgmgwg***"+
    "**wmgwmm***"+
    "***gwmwg***"+
    "***wgmgw***"+
    "****y*y****"+
    "***y***y***"+
    "**y*****y**"
]];

var blackChicken = [[
    //left
    "rr*********"+
    "*rr********"+
    "*bbb*******"+
    "ybwb*******"+
    "*bbb*******"+
    "*r*b*****bb"+
    "***bbbbbb**"+
    "***bbbbbb**"+
    "***bbbbb***"+
    "***bbbbb***"+
    "****y*y****"+
    "****y*y****"+
    "****y*y****",

    "rr*********"+
    "*rr********"+
    "*bbb*******"+
    "ybwb*******"+
    "*bbb*******"+
    "*r*b*****bb"+
    "***bbbbbb**"+
    "***bbbbbb**"+
    "***bbbbb***"+
    "***bbbbb***"+
    "****y*y****"+
    "***y***y***"+
    "**y*****y**"
],[
    //right
    "*********rr"+
    "********rr*"+
    "*******bbb*"+
    "*******bwby"+
    "*******bbb*"+
    "bb*****b*r*"+
    "**bbbbbb***"+
    "**bbbbbb***"+
    "***bbbbb***"+
    "***bbbbb***"+
    "****y*y****"+
    "****y*y****"+
    "****y*y****",

    "*********rr"+
    "********rr*"+
    "*******bbb*"+
    "*******bwby"+
    "*******bbb*"+
    "bb*****b*r*"+
    "**bbbbbb***"+
    "**bbbbbb***"+
    "***bbbbb***"+
    "***bbbbb***"+
    "****y*y****"+
    "***y***y***"+
    "**y*****y**"
]];

function getHero() {

    let hero = {};

    // sprites [ "left frames" , "right frames" ]
    hero.sprites = brownChicken;

    hero.linesAmount = 11;
	hero.linesLength = 11;
    hero.pixelSize = new PhysicVector(5,5);
    hero.animSpeed = 200;
    hero.framecounter = 0;
    hero.lastFrameUpdate = new Date();

    hero.size = new PhysicVector(44,40);
    hero.pixelSize.x = hero.size.x/hero.linesLength;
    hero.pixelSize.y = hero.size.y/hero.linesAmount;

    hero.colors = {
        w: "rgba(255, 255, 255, 1)",
        b: "rgba(0, 0, 0, 1)",
        r: "rgba(255, 0, 0, 1)",
        y: "rgba(255, 192, 0, 1)",
        g: "rgba(155, 155, 155, 1)",
        m: "rgba(143, 73, 0, 1)"
    };

    return hero;
};

module.exports = getHero;