var health = pc.createScript('Health');

// The entity that shows the fill image
health.attributes.add('progressImage', {type: 'entity'});
// The maximum width of the fill image
health.attributes.add('progressImageMaxWidth', {type: 'number'});

health.prototype.initialize = function() {
    this.paused = false;
    
    // Get the "Game" Entity and start listening for events
    this.game = this.app.root.findByName("game");

    this.app.on("game:reset", this.reset, this);
    this.app.on("game:pickup", this.pickup, this);
    this.app.on("game:damage", this.damage, this);
    
    // initialize progress to 0
    this.setHealth(1);
    // if true the progress bar will increase
    // otherwise it will decrease in update
    this.increase = false;
};

// Set progress - value is between 0 and 1
health.prototype.setHealth = function (value) {
    // clamp value between 0 and 1
    value = pc.math.clamp(value, 0, 1);

    this.progress = value;

    // find the desired width of our progress fill image
    var width = pc.math.lerp(0, this.progressImageMaxWidth, value);
    // set the width of the fill image element
    this.progressImage.element.width = width;

    // Set the width of the element's rect (rect.z) to be the same
    // value as our 0-1 progress.
    // This is so that the fill image will only show the portion
    // of the texture that is visible
    this.progressImage.element.rect.z = value;
    // force rect update
    this.progressImage.element.rect = this.progressImage.element.rect;
};

health.prototype.reset = function () {
    this.setHealth(1);    
};

health.prototype.pickup = function (numb) {
    this.setHealth(this.progress + numb);
};

health.prototype.damage = function (numb) {
    this.setHealth(this.progress - numb);
};

// Increase or decrease the progress automatically
health.prototype.update = function(dt) {
    var diff = 0.001;
    this.setHealth(this.progress - diff);
    
    if(this.progress === 0)
        this.game.script.game.gameOver();
};