var Trigger = pc.createScript('trigger');

// initialize code called once per entity
Trigger.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
    this.game = this.app.root.findByName("game");
};

Trigger.prototype.onTriggerEnter = function () {
    this.app.fire("game:pickup", 0.2);
    this.entity.destroy();
    this.app.fire("spawnI:create");
};

Trigger.prototype.update = function(dt) {
    if (this.entity.getPosition().x <= -5) {
        this.entity.destroy();
        if (this.game.script.game._state == Game.STATE_INGAME)
            this.app.fire("spawnI:create");
    }
    
    if (this.game.script.game._state == Game.STATE_GAMEOVER)
        this.entity.destroy();
};

// swap method called for script hot-reloading
// inherit your script state here
// Trigger.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/