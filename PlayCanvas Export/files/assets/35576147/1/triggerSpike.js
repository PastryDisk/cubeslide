var TriggerSpike = pc.createScript('triggerSpike');

// initialize code called once per entity
TriggerSpike.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
    this.game = this.app.root.findByName("game");
};

// update code called every frame
TriggerSpike.prototype.update = function(dt) {
    if (this.entity.getPosition().x <= -5) {
        this.entity.destroy();
        if (this.game.script.game._state == Game.STATE_INGAME)
            this.app.fire("spawnS:create");
    }
    
    if (this.game.script.game._state == Game.STATE_GAMEOVER)
        this.entity.destroy();
};

TriggerSpike.prototype.onTriggerEnter = function () {
    
    this.app.fire("game:damage", 0.3);
};

// swap method called for script hot-reloading
// inherit your script state here
// TriggerSpike.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/