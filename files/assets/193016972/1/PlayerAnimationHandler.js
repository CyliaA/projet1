var PlayerAnimationHandler = pc.createScript('playerAnimationHandler');

PlayerAnimationHandler.attributes.add('blendTime', { type: 'number', default: 0.2 });
PlayerAnimationHandler.attributes.add('velMin', { type: 'number', default: 10});
PlayerAnimationHandler.attributes.add('velMax', { type: 'number', default: 50});

PlayerAnimationHandler.prototype.initialize = function () {
    var app = this.app;
    var camera = app.root.findByName('ModelTPC');
    this.cameraScript = camera.script.cameraMovement;

    app.keyboard.on(pc.EVENT_KEYDOWN, this.keyChange, this);
    app.keyboard.on(pc.EVENT_KEYUP, this.keyChange, this);

    this.on('destroy', function(){
        this.app.keyboard.off(pc.EVENT_KEYDOWN);
        this.app.keyboard.off(pc.EVENT_KEYUP);
    }.bind(this));

    this.direction = 'Idle';
    this.setDirection('Idle');
};

/*PlayerAnimationHandler.prototype.update = function (dt) {
   if (this.cameraScript.LTouch){
      var tempDirection = this.direction;

        this.checkTouch();

    if (tempDirection !== this.direction) {
           this.setDirection(this.direction);
       }
    }
};
*/


PlayerAnimationHandler.prototype.checkButtons = function () {
    var app = this.app;

    var w = app.keyboard.isPressed(pc.KEY_W) || app.keyboard.isPressed(pc.KEY_UP);
    var a = app.keyboard.isPressed(pc.KEY_A) || app.keyboard.isPressed(pc.KEY_LEFT);
    var s = app.keyboard.isPressed(pc.KEY_S) || app.keyboard.isPressed(pc.KEY_DOWN);
    var d = app.keyboard.isPressed(pc.KEY_D) || app.keyboard.isPressed(pc.KEY_RIGHT);

    if (w && !s) {
        if (a && !d) {
            this.direction = 'Walking'; // Run Forward Left
        } else if (d && !a) {
            this.direction = 'Walking'; //Run Forward Right
        } else {
            this.direction = 'Walking'; // Run Forward
        }
    } else if (s && !w) {
        if (a && !d) {
            this.direction = 'WalkBack'; // Run Backward Left
        } else if (d && !a) {
            this.direction = 'WalkBack'; // Run Backward Right
        } else {
            this.direction = 'WalkBack'; // Run Backward
        }
    } else if (a && !d) {
        this.direction = 'WalkLeft'; // Run Left
    } else if (d && !a) {
        this.direction = 'WalkRight'; // Run Right
    } else {
        this.direction = 'Idle'; // Idle
    }
};

PlayerAnimationHandler.prototype.checkTouch = function() {
    var app = this.app;

    if (this.cameraScript.velZ < -this.velMax && this.cameraScript.velX < -this.velMax) {this.direction = 'Walking';} // Run Forward Left
    else if (this.cameraScript.velZ < -this.velMax && this.cameraScript.velX > this.velMax) {this.direction = 'Walking';} // Run Forward Right
    else if (this.cameraScript.velZ < 0 && this.cameraScript.velX < this.velMax && this.cameraScript.velX > -this.velMax) {this.direction = 'Walking';} // Run Forward
    else if (this.cameraScript.velZ > this.velMax && this.cameraScript.velX < -this.velMax) {this.direction = 'WalkBack';} // Run Backward Left
    else if (this.cameraScript.velZ > this.velMax && this.cameraScript.velX > this.velMax) {this.direction = 'WalkBack';} // Run Backward Right
    else if (this.cameraScript.velZ > 0 && this.cameraScript.velX < this.velMax && this.cameraScript.velX > -this.velMax) {this.direction = 'WalkBack';} // Run Backward
    else if (this.cameraScript.velZ < this.velMax && this.cameraScript.velZ > -this.velMax && this.cameraScript.velX < -this.velMin) {this.direction = 'WalkLeft';} // Run Left
    else if (this.cameraScript.velZ < this.velMax && this.cameraScript.velZ > -this.velMax && this.cameraScript.velX > this.velMin) {this.direction = 'WalkRight';} // Run Right
    else {this.direction = 'Idle';} // Idle
};

PlayerAnimationHandler.prototype.keyChange = function (e) {
    var tempDirection = this.direction;

    this.checkButtons();

    if (tempDirection !== this.direction) {
        this.setDirection(this.direction);
    }
};

PlayerAnimationHandler.prototype.setDirection = function (direction) {
    this.direction = direction;
    this.entity.animation.play(direction, this.blendTime);
};

