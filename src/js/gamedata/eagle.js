const PhysicVector = require('../gameeng/physicvector');

var frames = [[
    //left
    "***********m*"+
    "**********mm*"+
    "*********mmc*"+
    "**mmm****mmc*"+
    "**mwm***mmc**"+
    "*ommm***mm***"+
    "ooommmmmm**mm"+
    "o****mmmmmmm*"+
    "*****mcccmc**"+
    "*******occo**"+
    "******oo*oo**"+
    "******o**o***",
],[
    //right
    "*m***********"+
    "*mm**********"+
    "*cmm*********"+
    "*cmm****mmm**"+
    "**cmm***mwm**"+
    "***mm***mmmo*"+
    "mm**mmmmmmooo"+
    "*mmmmmmm****o"+
    "**cmcccm*****"+
    "**occo*******"+
    "**oo*oo******"+
    "***o**o******",
]];

function Eagle () {
    let drawable = {};

    // sprites [ "left frames" , "right frames" ]
    drawable.sprites = frames;

    drawable.linesAmount = 12;
    drawable.linesLength = 13;
    
    drawable.pixelSize = new PhysicVector(5,5);
    drawable.animSpeed = 200;
    drawable.framecounter = 0;
    drawable.lastFrameUpdate = new Date();

    drawable.size = new PhysicVector(40,40);
    drawable.pixelSize.x = drawable.size.x/drawable.linesLength;
    drawable.pixelSize.y = drawable.size.y/drawable.linesAmount;

    drawable.colors = {
        w: "rgba(255, 255, 255, 1)",
        m: "rgba(157, 70, 0, 1)",
        c: "rgba(222, 101, 4, 1)",
        o: "rgba(223, 156, 0, 1)"
    };

    drawable.update = () => {

    };

    return drawable;
};

module.exports = Eagle;