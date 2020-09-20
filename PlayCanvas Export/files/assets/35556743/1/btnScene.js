var BtnScene = pc.createScript('btnScene');

BtnScene.attributes.add("sceneName", {type: "string", default: "", title: "Scene Name to Load"});

// initialize code called once per entity
BtnScene.prototype.initialize = function() {
    // mouse events
    this.entity.element.on('mousedown', this.onPress, this);

    // touch events
    this.entity.element.on('touchstart', this.onPress, this);
};

BtnScene.prototype.loadScene = function (sceneName) {
    // Get a reference to the scene's root object
    var oldHierarchy = this.app.root.findByName ('Root');
    
    // Get the path to the scene
    var scene = this.app.scenes.find(sceneName);
    
    // Load the scenes entity hierarchy
    this.app.scenes.loadScene(scene.url, function (err, scene) {
        if (!err) {
            oldHierarchy.destroy();
            pc.ComponentSystem.initialize(scene.root);
            pc.ComponentSystem.postInitialize(scene.root);
        } else {
            console.error(err);
        }
    });
};

// When we press the element assign the active texture
BtnScene.prototype.onPress = function (event) {
    this.loadScene(this.sceneName);
};