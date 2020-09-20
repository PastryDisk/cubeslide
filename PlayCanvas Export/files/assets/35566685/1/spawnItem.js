var SpawnItem = pc.createScript('spawnItem');

SpawnItem.attributes.add('material', {type: 'asset', assetType: 'material'});


// initialize code called once per entity
SpawnItem.prototype.initialize = function() {
    this.spawnItem();
    this.app.on("spawnI:create", this.spawnItem, this);
};

// update code called every frame
SpawnItem.prototype.update = function(dt) {
    
};

SpawnItem.prototype.spawnItem = function () {
    var entity = new pc.Entity();
    
    entity.addComponent("model", {type: 'plane'});
    entity.addComponent("collision", {type: 'box', halfExtents: [0.25,0.25,0.25]});
 
    
    //Adding script to spawned entities
    entity.addComponent("script");
    entity.script.create("trigger");
    entity.script.create("moveItem");
    
    entity.model.material = this.material.resource;
    entity.setLocalPosition(pc.math.random(5,7),3.5,0);
    entity.setEulerAngles(90,0,90);
    entity.setLocalScale(0.5,0.5,0.5);
    this.app.root.addChild(entity);    
};


// swap method called for script hot-reloading
// inherit your script state here
// SpawnItem.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/