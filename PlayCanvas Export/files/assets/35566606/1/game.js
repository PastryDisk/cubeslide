var Game = pc.createScript('game');

Game.attributes.add('uiInGame', {type: 'entity'});
Game.attributes.add('uiGameOver', {type: 'entity'});

Game.STATE_INGAME = 'ingame';
Game.STATE_GAMEOVER = 'gameover';

// initialize code called once per entity
Game.prototype.initialize = function() {
    this._state = Game.STATE_INGAME;
    this._score = 0;
    this._scoref = 0;
    
    this.uiInGame.enabled = true;
    this.uiGameOver.enabled = false;
    
    this.app.on("ui:reset", this.reset, this);
};

// Call this to move from INGAME to GAMEOVER
Game.prototype.gameOver = function () {
    this._state = Game.STATE_GAMEOVER;
    this.app.fire("game:gameover");
    this.uiInGame.enabled = false;
    this.uiGameOver.enabled = true;
};

// Call this to move from GAMEOVER to INGAME
Game.prototype.reset = function () {    
    this.app.fire("game:reset");
    this.resetScore();
    this._state = Game.STATE_INGAME;
    this.uiGameOver.enabled = false;
    this.uiInGame.enabled = true;
};

// return the current score
Game.prototype.getScore = function () {
    return this._score;
};

// add a value to the score
Game.prototype.update = function () {
    if (this._state == Game.STATE_INGAME) {
        this._score += 0.01;
        this.app.fire("game:score", Math.floor(this._score));
    }    
    
    if (this._state == Game.STATE_GAMEOVER && Math.floor(this._score) > this._scoref) {
        this.app.fire("game:high", Math.floor(this._score));
        this._scoref = Math.floor(this._score);
    }
};

// reset the score
Game.prototype.resetScore = function () {
    this._score = 0;
    this.app.fire("game:score", this._score);
};  
