var SpawnSpike = pc.createScript('spawnSpike');

SpawnSpike.attributes.add('material', {type: 'asset', assetType: 'material'});

// initialize code called once per entity
SpawnSpike.prototype.initialize = function() {
    
    this.spawnSpike();
    this.app.on("spawnS:create", this.spawnSpike, this);
    
};

// update code called every frame
SpawnSpike.prototype.update = function(dt) {
    
    
};


SpawnSpike.prototype.spawnSpike = function () {
    var entity = new pc.Entity();
    
    entity.addComponent("model", {type: 'asset', asset: '35555540'});
    entity.addComponent("collision", {type: 'box', halfExtents: [0.22,0.25,0.4]});
 
    
    //Adding script to spawned entities
    entity.addComponent("script");
    entity.script.create("triggerSpike");
    entity.script.create("moveItem");
    
    entity.model.material = this.material.resource;
    entity.setLocalPosition(pc.math.random(7,10),2,0);
    entity.setEulerAngles(0,90,0);
    this.app.root.addChild(entity);
    
    
    
};


// swap method called for script hot-reloading
// inherit your script state here
// SpawnItem.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/