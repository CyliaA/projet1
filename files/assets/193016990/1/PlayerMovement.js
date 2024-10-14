var PlayerMovement = pc.createScript('playerMovement');

PlayerMovement.attributes.add('speed', { type: 'number', default: 0.09 });

PlayerMovement.prototype.initialize = function () {
    var app = this.app;
    var camera = app.root.findByName('Camera TPC');
    this.cameraScript = camera.script.cameraMovement;

    this.force = new pc.Vec3();
    this.forceX = new pc.Vec3();
    this.forceZ = new pc.Vec3();

    this.app.on("thirdPersonMovementSpeed", this.changePlayerSpeed.bind(this));
    this.on('destroy', function(){
        this.app.off("thirdPersonMovementSpeed");
    }.bind(this));
};

PlayerMovement.prototype.changePlayerSpeed = function () {
    this.speed = this.speed + 0.02;
};

PlayerMovement.prototype.update = function (dt) {
    var app = this.app;

    this.force = pc.Vec3.ZERO.clone();

    var forward = this.entity.forward;
    var right = this.entity.right;

    if (app.keyboard.isPressed(pc.KEY_A) || app.keyboard.isPressed(pc.KEY_LEFT)) {
        this.force.x -= right.x;
        this.force.z -= right.z;
    }

    if (app.keyboard.isPressed(pc.KEY_D) || app.keyboard.isPressed(pc.KEY_RIGHT)) {
        this.force.x += right.x;
        this.force.z += right.z;
    }

    if (app.keyboard.isPressed(pc.KEY_W) || app.keyboard.isPressed(pc.KEY_UP)) {
        this.force.x += forward.x;
        this.force.z += forward.z;
    }

    if (app.keyboard.isPressed(pc.KEY_S) || app.keyboard.isPressed(pc.KEY_DOWN)) {
        this.force.x -= forward.x;
        this.force.z -= forward.z;
    }

    this.forceX.copy(this.entity.right).scale(this.cameraScript.velX * this.speed);
    this.forceZ.copy(this.entity.forward).scale(this.cameraScript.velZ * this.speed);
    if (this.cameraScript.LTouch){
        this.force = this.forceX.add(this.forceZ).normalize().scale(80);
}

    if (this.force.x !== 0 || this.force.z !== 0) {
        var pos = new pc.Vec3(this.force.x * dt, 0, this.force.z * dt);
        pos.normalize().scale(this.speed);
        pos.add(this.entity.getPosition());

        var targetY = this.cameraScript.eulers.x + 180;
        var rot = new pc.Vec3(0, targetY, 0);

        this.entity.rigidbody.teleport(pos, rot);
    }
};
