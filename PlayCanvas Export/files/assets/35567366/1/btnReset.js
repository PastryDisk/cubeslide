var BtnReset = pc.createScript('btnReset');

// initialize code called once per entity
BtnReset.prototype.initialize = function() {
    // mouse events
    this.entity.element.on('mousedown', this.onPress, this);

    // touch events
    this.entity.element.on('touchstart', this.onPress, this);
    
    this.on('enable', this.onEnable, this);
    this.on('disable', this.onDisable, this);
};

// When we press the element assign the active texture
BtnReset.prototype.onPress = function (event) {
    this.app.fire("ui:reset");
    this.app.fire("moveB:reset");
    this.app.fire("jump:reset");
    this.app.fire("moveG:reset");
    this.app.fire("spawnI:create");
    this.app.fire("spawnS:create");
};