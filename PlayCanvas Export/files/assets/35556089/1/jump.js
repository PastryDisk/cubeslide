var Jump = pc.createScript('jump');

// initialize code called once per entity
Jump.prototype.initialize = function() {
    this.game = this.app.root.findByName("game");
    this.app.on('jump:reset', this.reset, this);
};

// update code called every frame
Jump.prototype.update = function(dt) {
    
    var posY = this.entity.getPosition().y;
    //checks y position to make sure not already jumping
    if (this.game.script.game._state == Game.STATE_INGAME &&  posY <= 2.1 && this.app.keyboard.wasPressed(pc.KEY_SPACE)) {
        if (this.game.script.game.getScore() <= 15) {
            this.entity.rigidbody.applyImpulse(0,6,0);
        }
        else {
            this.entity.rigidbody.applyImpulse(0,5,0);
        }
    }
    
    if (posY <= 2.05 && !this.entity.sound.slot("slide").isPlaying)
        this.entity.sound.play("slide");
    
    if (posY > 2.05 && this.entity.sound.slot("slide").isPlaying)
        this.entity.sound.stop("slide");
};

Jump.prototype.reset = function () {
    this.entity.rigidbody.applyImpulse(0,4,0);
};

// swap method called for script hot-reloading
// inherit your script state here
// Jump.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/