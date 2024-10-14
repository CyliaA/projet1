var TouchBtns = pc.createScript('touchBtns');

// initialize code called once per entity
TouchBtns.prototype.initialize = function() {
    this.entity.button.on('pressedstart', function(event) {
        this.app.fire('ui:TouchBtnStart',this.entity.name);
        // console.log('button');
    }, this);
    this.entity.button.on('pressedend', function(event) {
        this.app.fire('ui:TouchBtnEnd',this.entity.name);
        // console.log('button');
    }, this);
};

// update code called every frame
TouchBtns.prototype.update = function(dt) {

};

// swap method called for script hot-reloading
// inherit your script state here
// TouchBtns.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/