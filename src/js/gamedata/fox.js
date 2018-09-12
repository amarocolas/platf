const PhysicVector = require('../gameeng/physicvector');

var frames = [[
    //left
    "o*o*******o"+
    "ooo******oo"+
    "ror******oo"+
    "ooo*****o**"+
    "*o*ooooo***"+
    "***ooooo***"+
    "***ooooooo*"+
    "**oo****oo*"+
    "**o******o*",

    "o*o******o*"+
    "ooo******oo"+
    "ror******oo"+
    "ooo*****o**"+
    "*o*ooooo***"+
    "***ooooo***"+
    "***ooooooo*"+
    "*oo*****oo*"+
    "*o********o",
],[
    //right
    "o*******o*o"+
    "oo******ooo"+
    "oo******ror"+
    "**o*****ooo"+
    "***ooooo*o*"+
    "***ooooo***"+
    "*ooooooo***"+
    "*oo****oo**"+
    "*o******o**",

    "*o******o*o"+
    "oo******ooo"+
    "oo******ror"+
    "**o*****ooo"+
    "***ooooo*o*"+
    "***ooooo***"+
    "*ooooooo***"+
    "*oo*****oo*"+
    "o********o*",
]];

function Fox () {
    let drawable = {};

    // sprites [ "left frames" , "right frames" ]
    drawable.sprites = frames;

    drawable.linesAmount = 9;
    drawable.linesLength = 11;
    
    drawable.pixelSize = new PhysicVector(5,5);
    drawable.animSpeed = 200;
    drawable.framecounter = 0;
    drawable.lastFrameUpdate = new Date();

    drawable.size = new PhysicVector(60,50);
    drawable.pixelSize.x = drawable.size.x/drawable.linesLength;
    drawable.pixelSize.y = drawable.size.y/drawable.linesAmount;

    drawable.colors = {
        o: "rgba(223, 156, 0, 1)",
        r: "rgba(255, 0, 0, 1)"
    };

    drawable.update = () => {

    };

    return drawable;
};

module.exports = Fox;