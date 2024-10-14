var CameraMovement = pc.createScript('cameraMovement');

CameraMovement.attributes.add('mouseSpeed', { type: 'number', default: 1.4, description: 'Mouse Sensitivity' });
CameraMovement.attributes.add('touchSensitivity', { type: 'number', default: 5, description: 'Touch Sensitivity' });

//const isDebug = false;

// Called once after all resources are loaded and before the first update
CameraMovement.prototype.initialize = function () {
    this.eulers = new pc.Vec3();
    this.touchCoords = new pc.Vec2();

    var app = this.app;
    app.mouse.on("mousemove", this.onMouseMove, this);

    var canvas = app.graphicsDevice.canvas;

    // if ("onpointerlockchange" in document) {
    //     document.addEventListener('pointerlockchange', lockChangeAlert, false);
    // } else if ("onmozpointerlockchange" in document) {
    //     document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
    // }

    // function lockChangeAlert() {
    //     if (document.pointerLockElement === canvas ||
    //         document.mozPointerLockElement === canvas) {
    //         if (isDebug)
    //             console.log('The pointer lock status is now locked');

    //     } else {
    //         if (isDebug)
    //             console.log('The pointer lock status is now unlocked');
    //     }
    // }

    this.isMouseDown = false;
    this.app.mouse.on("mousedown", function () {
        this.isMouseDown = true;
    }, this);

    this.app.mouse.on("mouseup", function () {
        this.isMouseDown = false;
    }, this);

    this.lastLTouchPoint = new pc.Vec2();
    this.LTouchStartPoint = new pc.Vec2();
    this.LTouch = null;
    this.Rid = -1;
    this.Lid = -1;
    this.velZ = 0;
    this.velX = 0;

    this.rayEnd = app.root.findByName('RaycastEndPoint TPC');

    if (app.touch) {
        app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
        app.touch.on(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
        app.touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchEnd, this);
        app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
    }

    this.on('destroy', function () {
        if (this.app.touch) {
            this.app.touch.off(pc.EVENT_TOUCHSTART);
            this.app.touch.off(pc.EVENT_TOUCHEND);
            this.app.touch.off(pc.EVENT_TOUCHCANCEL);
            this.app.touch.off(pc.EVENT_TOUCHMOVE);
        }
        this.app.mouse.off("mousedown");
        this.app.mouse.off("mousemove");

   //     if ("onpointerlockchange" in document) {
     //       document.removeEventListener('pointerlockchange', lockChangeAlert, false);
       // } else if ("onmozpointerlockchange" in document) {
         //   document.removeEventListener('mozpointerlockchange', lockChangeAlert, false);
     //   }

    }.bind(this));

};

CameraMovement.prototype.update = function (dt) {
    this.velZ = this.Lid != -1 ? this.lastLTouchPoint.y - this.LTouchStartPoint.y : 0;
    this.velX = this.Lid != -1 ? this.lastLTouchPoint.x - this.LTouchStartPoint.x : 0;
};

CameraMovement.prototype.postUpdate = function (dt) {
    var originEntity = this.entity.parent;

    var targetY = this.eulers.x + 170;
    var targetX = this.eulers.y;

    var targetAng = new pc.Vec3(-targetX, targetY, 0);

    originEntity.setEulerAngles(targetAng);

    this.entity.setPosition(this.getWorldPoint());

    this.entity.lookAt(originEntity.getPosition());
};

CameraMovement.prototype.onMouseMove = function (e) {
    if (this.isMouseDown) {
        this.eulers.x -= ((this.mouseSpeed * e.dx) / 60) % 360;
        this.eulers.y = Math.max(Math.min(this.eulers.y + ((this.mouseSpeed * e.dy) / 60) % 360, 89.99), -89.99);
    }
};

CameraMovement.prototype.onTouchStart = function (e) {
    e.changedTouches.forEach(function (touch) {
        var device = this.app.graphicsDevice;
        if (touch.x > device.width * 0.5 / window.devicePixelRatio && this.Rid == -1) {
            this.Rid = touch.id;
            this.touchCoords.set(touch.x, touch.y);
        }
        if (touch.x <= device.width * 0.5 / window.devicePixelRatio && this.Lid == -1) {
            this.Lid = touch.id;
            this.LTouchStartPoint.set(touch.x, touch.y);
            this.lastLTouchPoint.set(touch.x, touch.y);
        }
    }, this);
};

CameraMovement.prototype.onTouchEnd = function (e) {
    e.changedTouches.forEach(function (touch) {
        if (this.Rid == touch.id) {
            this.Rid = -1;
        }
        if (this.Lid == touch.id) {
            this.Lid = -1;
        }
    }, this);
};

CameraMovement.prototype.onTouchMove = function (e) {
    this.RTouch = e.getTouchById(this.Rid, e.touches);
    this.LTouch = e.getTouchById(this.Lid, e.touches);

    if (this.RTouch) {

        var dx = (this.RTouch.x - this.touchCoords.x) * this.touchSensitivity;
        var dy = (this.RTouch.y - this.touchCoords.y) * this.touchSensitivity;

        this.eulers.x -= ((this.touchSensitivity * dx) / 60) % 360;
        this.eulers.y += ((this.touchSensitivity * dy) / 60) % 360;

        if (this.eulers.x < 0) this.eulers.x += 360;
        if (this.eulers.y < 0) this.eulers.y += 360;

        this.touchCoords.set(this.RTouch.x, this.RTouch.y);
    }
    if (this.LTouch) {
        this.lastLTouchPoint.set(this.LTouch.x, this.LTouch.y);
    }
};

CameraMovement.prototype.getWorldPoint = function () {
    var from = this.entity.parent.getPosition();
    var to = this.rayEnd.getPosition();

    var hitPoint = to;

    var app = this.app;
    var hit = app.systems.rigidbody.raycastFirst(from, to);

    return hit ? hit.point : to;
};