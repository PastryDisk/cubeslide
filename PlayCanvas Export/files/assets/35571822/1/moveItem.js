var MoveItem = pc.createScript('moveItem');

MoveItem.attributes.add('speed', {type: 'number', default: 0.002, max: 0.005});

// initialize code called once per entity
MoveItem.prototype.initialize = function() {
    this.vec = this.entity.getLocalPosition();
    this.game = this.app.root.findByName("game");
};

// update code called every frame
MoveItem.prototype.update = function(dt) {
    var pos = new pc.Vec3(-10, this.vec.y, 0);
    speed = pc.math.clamp(0.00006 * this.game.script.game.getScore() + 0.002, 0.002, 0.005);
    this.vec.lerp(this.vec, pos, speed);
    this.entity.setLocalPosition(this.vec);
};


// swap method called for script hot-reloading
// inherit your script state here
// MoveItem.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/