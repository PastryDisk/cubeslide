var MoveGround = pc.createScript('moveGround');

MoveGround.attributes.add('speed', {type: 'number', default: 0.001, max: 0.005});
MoveGround.attributes.add('x1', {type: 'number'});
MoveGround.attributes.add('y1', {type: 'number'});
MoveGround.attributes.add('z1', {type: 'number'});

// initialize code called once per entity
MoveGround.prototype.initialize = function() {
    this.vec = this.entity.getLocalPosition();
    this.game = this.app.root.findByName("game");
    this.app.on("moveG:reset", this.reset, this);
};

// update code called every frame
MoveGround.prototype.update = function(dt) {
    var pos = new pc.Vec3(this.entity.getPosition().x - 20, 1, 0);
    speed = pc.math.clamp(0.00003 * this.game.script.game.getScore() + 0.001, 0.001, 0.005);
    
    if (this.entity.getPosition().x <= -14.9)
        this.entity.setPosition(9 - 0.01 * this.game.script.game.getScore(), 1, 0);
    else {    
        this.vec.lerp(this.vec, pos, speed);
        this.entity.setLocalPosition(this.vec);
    } 
};

MoveGround.prototype.reset = function () {
    this.entity.setPosition(this.x1, this.y1, this.z1);
};