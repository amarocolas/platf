const PhysicVector = require('../gameeng/physicvector');

var frames = [[
    //left
    "bb**bb"+
    "*b***b"+
    "bbbbbb"+
    "brbrbb"+
    "bbbbbb"+
    "brbrbb"+
    "rbrbrb"+
    "bbbbbb"+
    "**bbb*"+
    "**bbb*"+
    "**bbb*"+
    "*b**b*"+
    "bb*bb*",

    "bb**bb"+
    "*b***b"+
    "bbbbbb"+
    "brbrbb"+
    "bbbbbb"+
    "brbrbb"+
    "rbrbrb"+
    "bbbbbb"+
    "**bbb*"+
    "**bbb*"+
    "**bbb*"+
    "**b**b"+
    "*bb*bb"
],[
    //right
    "bb**bb"+
    "b***b*"+
    "bbbbbb"+
    "bbrbrb"+
    "bbbbbb"+
    "bbrbrb"+
    "brbrbr"+
    "bbbbbb"+
    "*bbb**"+
    "*bbb**"+
    "*bbb**"+
    "b**b**"+
    "bb*bb*",

    "bb**bb"+
    "b***b*"+
    "bbbbbb"+
    "bbrbrb"+
    "bbbbbb"+
    "bbrbrb"+
    "brbrbr"+
    "bbbbbb"+
    "*bbb**"+
    "*bbb**"+
    "*bbb**"+
    "*b**b*"+
    "*bb*bb"
]];

function Rabbit () {
    let drawable = {};

    // sprites [ "left frames" , "right frames" ]
    drawable.sprites = frames;

    drawable.linesAmount = 13;
    drawable.linesLength = 6;
    
    drawable.pixelSize = new PhysicVector(5,5);
    drawable.animSpeed = 200;
    drawable.framecounter = 0;
    drawable.lastFrameUpdate = new Date();

    drawable.size = new PhysicVector(32,40);
    drawable.pixelSize.x = drawable.size.x/drawable.linesLength;
    drawable.pixelSize.y = drawable.size.y/drawable.linesAmount;

    drawable.colors = {
        b: "rgba(0, 0, 0, 1)",
        r: "rgba(255, 0, 0, 1)"
    };

    drawable.update = () => {

    };

    return drawable;
};

module.exports = Rabbit;