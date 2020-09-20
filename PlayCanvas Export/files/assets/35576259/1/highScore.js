var HighScore = pc.createScript('highScore');

// initialize code called once per entity
HighScore.prototype.initialize = function() {
    this.score = this.entity.findByName("Score");
    this.score.element.text = "High Score: 0";
    
    this.app.on("game:high", this._changeHighScore, this);
};

HighScore.prototype._changeHighScore = function (newScore) {
    // Update the text
    this.score.element.text = "High Score: " + newScore.toString();
};