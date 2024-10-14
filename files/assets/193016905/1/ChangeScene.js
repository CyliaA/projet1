var ChangeScene = pc.createScript('changeScene');
ChangeScene.attributes.add('sceneName', {type: 'string'});

// initialize code called once per entity
ChangeScene.prototype.initialize = function() {
      this.entity.button.once('click', function() {
        this.app.scenes.changeScene(this.sceneName);
    }, this);
};




// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// ChangeScene.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/