const PhysicVector = require('../gameeng/physicvector');
const Pixel = require('../gameeng/pixel');

const Rabbit = require("../gamedata/rabbit");
const Fox = require("../gamedata/fox");
const Skunk = require("../gamedata/skunk");
const Eagle = require("../gamedata/eagle");

const Brick = require('./brick');

function Enemy() {
    this.shape = 'drawable';
    this.pos = new PhysicVector(0,0);
    this.initPos = new PhysicVector(0,0);
    this.dir = 1;
    this.update = () => {};

    var setup = (type) => {
        
        switch (type) {
            case "rabbit":
                this.drawable = new Pixel(Rabbit());
                break;
            case "fox":
                this.drawable = new Pixel(Fox());
                break;
            case "skunk":
                this.drawable = new Pixel(Skunk());
                break;
            case "eagle":
                this.drawable = new Pixel(Eagle());
                break;
            default:
                break;
        }

        this.speed = 2;
        this.dist = 100;
        this.pos = this.initPos;
        this.update = () => {
            console.log("updating");
            this.pos.x = this.pos.x + this.dir * this.speed;
        }
        this.size = this.drawable.size;
    };

    this.init = (posX, posY, type) => {
        this.initPos.x = posX;
        this.initPos.y = posY;
        setup(type);
    };
};

Enemy.prototype = new Brick();

module.exports = Enemy;