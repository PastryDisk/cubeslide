var Score = pc.createScript('score');

// initialize code called once per entity
Score.prototype.initialize = function() {
    this.score = this.entity.findByName("Score");
    
    this.on('enable', this.onEnable, this);
    
    this.onEnable();
};

Score.prototype.onEnable = function () {
    // listen for score events on the game object and update the score
    this.app.on("game:score", this._changeScore, this);
    this._changeScore(0);
};

Score.prototype._changeScore = function (newScore) {
    // Update the text
    this.score.element.text = newScore.toString();
};