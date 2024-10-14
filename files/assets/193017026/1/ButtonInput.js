var ButtonInput = pc.createScript('buttonInput');

// initialize code called once per entity
ButtonInput.prototype.initialize = function() {
    this.entity.button.on('click', function(event) {
        this.app.fire('ui:ButtonClick',this.entity.name,this.entity);
         console.log('button');
    }, this);
};

// update code called every frame
ButtonInput.prototype.update = function(dt) {

};

// swap method called for script hot-reloading
// inherit your script state here
// ButtonInput.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/