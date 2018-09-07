function PhysicVector(x, y){

    this.x = x;
    this.y = y;

    this.add = function(vec){
        this.x += vec.x;
        this.y += vec.y;
    };

    this.sub = function(vec){
        this.x -= vec.x;
        this.y -= vec.y;
    };

    this.mult = function(num){
        this.x *= num;
        this.y *= num;
    };

    this.div = function(num){
        this.x = this.x/num;
        this.y = this.y/num;
    };

    this.getVec = function(){
        return new PhysicVector(this.x, this.y);
    };

    this.mag = function(){
        return Math.sqrt( (this.x * this.x) + (this.y * this.y) );
    }

    this.limit = function(value){
        if (this.mag() > value){
            
            this.div(this.mag());
            this.mult(value);
        }
    }
}

module.exports = PhysicVector;