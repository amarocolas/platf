const PhysicVector = require('../gameeng/physicvector');

var frames = [[
    //left
    "b**b*******b"+
    "*b*b******bb"+
    "*bbb******bw"+
    "bwbwb****bw*"+
    "*bbb**bb*b**"+
    "**b*bbbbb***"+
    "****bbbbb***"+
    "*****bwb****"+
    "****b***b***"+
    "****b***b***",

    "*b**b******b"+
    "**b*b*****bb"+
    "**bbb*****bw"+
    "*bwbwb***bw*"+
    "**bbb*bb*b**"+
    "***bbbbbb***"+
    "****bbbbb***"+
    "*****bwb****"+
    "****b***b***"+
    "*****b*b****",
],[
    //right
    "b*******b**b"+
    "bb******b*b*"+
    "wb******bbb*"+
    "*wb****bwbwb"+
    "**b*bb**bbb*"+
    "***bbbbb*b**"+
    "***bbbbb****"+
    "****bwb*****"+
    "***b***b****"+
    "***b***b****",

    "b******b**b*"+
    "bb*****b*b**"+
    "wb*****bbb**"+
    "*wb***bwbwb*"+
    "**b*bb*bbb**"+
    "***bbbbbb***"+
    "***bbbbb****"+
    "****bwb*****"+
    "***b***b****"+
    "****b*b*****",
]];

function Skunk () {
    let drawable = {};

    // sprites [ "left frames" , "right frames" ]
    drawable.sprites = frames;

    drawable.linesAmount = 10;
    drawable.linesLength = 12;
    
    drawable.pixelSize = new PhysicVector(5,5);
    drawable.animSpeed = 200;
    drawable.framecounter = 0;
    drawable.lastFrameUpdate = new Date();

    drawable.size = new PhysicVector(50,40);
    drawable.pixelSize.x = drawable.size.x/drawable.linesLength;
    drawable.pixelSize.y = drawable.size.y/drawable.linesAmount;

    drawable.colors = {
        b: "rgba(0, 0, 0, 1)",
        w: "rgba(255, 255, 255, 1)"
    };

    drawable.update = () => {

    };

    return drawable;
};

module.exports = Skunk;