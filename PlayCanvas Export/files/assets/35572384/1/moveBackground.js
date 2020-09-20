var MoveBackground = pc.createScript('moveBackground');

MoveBackground.attributes.add('speed', {type: 'number', default: 0.001, max: 0.005});
MoveBackground.attributes.add('x1', {type: 'number'});
MoveBackground.attributes.add('y1', {type: 'number'});
MoveBackground.attributes.add('z1', {type: 'number'});

// initialize code called once per entity
MoveBackground.prototype.initialize = function() {
    this.vec = this.entity.getLocalPosition();
    this.game = this.app.root.findByName("game");
    this.app.on("moveB:reset", this.reset, this);
};

// update code called every frame
MoveBackground.prototype.update = function(dt) {
    
    var pos = new pc.Vec3(this.entity.getPosition().x - 20, 2.689, -3.468);
    speed = pc.math.clamp(0.00003 * this.game.script.game.getScore() + 0.001, 0.001, 0.005);
    
    if (this.entity.getPosition().x <= -14.9)
        this.entity.setPosition(30 - 0.03 * this.game.script.game.getScore(), 2.689, -3.468);
    else {    
        this.vec.lerp(this.vec, pos, speed);
        this.entity.setLocalPosition(this.vec);
    }
      
};

MoveBackground.prototype.reset = function () {
    this.entity.setPosition(this.x1, this.y1, this.z1);
};