var DesktopInput = pc.createScript('desktopInput');

DesktopInput.attributes.add('moveSensitivity', {
    type: 'number',
    default: 50,
    description: 'Adjusts the speed of player movement'
});

DesktopInput.attributes.add('lookSensitivity', {
    type: 'number',
    default: 0.25,
    description: 'Adjusts the sensitivity of looking'
});

var moveForward = false;
var moveBackward = false;
var moveRight = false;
var moveLeft = false;
var onMobile = false;

// initialize code called once per entity
DesktopInput.prototype.initialize = function() {
    var self = this;
    var app = this.app;

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // is mobile..

        onMobile = true;
        // this.VRButton.enabled = true;
    }

    // Listen for mouse move events
    app.mouse.on("mousemove", this.onMouseMove, this);

    // when the mouse is clicked hide the cursor
    // app.mouse.on("mousedown", function () {
    //     app.mouse.enablePointerLock();
    //     self.Clicked();
    // }, this);  
    app.mouse.on("mousedown",this._onMouseDown, this);   

    this.lastTouchPoint = new pc.Vec2();
    this.lastPinchMidPoint = new pc.Vec2();
    this.lastPinchDistance = 0;

    if (this.app.touch) {
        // Use the same callback for the touchStart, touchEnd and touchCancel events as they 
        // all do the same thing which is to deal the possible multiple touches to the screen
        this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStartEndCancel, this);
        this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchStartEndCancel, this);
        this.app.touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchStartEndCancel, this);
        
        this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        
        this.on('destroy', function() {
            this.app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStartEndCancel, this);
            this.app.touch.off(pc.EVENT_TOUCHEND, this.onTouchStartEndCancel, this);
            this.app.touch.off(pc.EVENT_TOUCHCANCEL, this.onTouchStartEndCancel, this);

            this.app.touch.off(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        });
    }

    this.app.on('ui:TouchBtnStart', function(value) {
        self.ButtonStart(value);
    });
    this.app.on('ui:TouchBtnEnd', function(value) {
        self.ButtonEnd(value);
    });
};

// update code called every frame
DesktopInput.prototype.ButtonStart = function(name) {
    if(name == "UpBtn"){
        moveForward = true;
    }
    else if(name == "DownBtn"){
        moveBackward = true;
    }
    else if(name == "RightBtn"){
        moveRight = true;
    }
    else if(name == "LeftBtn"){
        moveLeft = true;
    }
};

DesktopInput.prototype.ButtonEnd = function(name) {
    if(name == "UpBtn"){
        moveForward = false;
    }
    if(name == "DownBtn"){
        moveBackward = false;
    }
    if(name == "RightBtn"){
        moveRight = false;
    }
    if(name == "LeftBtn"){
        moveLeft = false;
    }
};


// update code called every frame
DesktopInput.prototype.update = function(dt) {
    var app = this.app;
    if(this.entity){
        if(this.entity.enabled){
            if (app.keyboard.isPressed(pc.KEY_LEFT) || moveLeft) {
                console.log("firing");
                app.fire('input:addLateralForce', -this.moveSensitivity);
            }

            if (app.keyboard.isPressed(pc.KEY_RIGHT) || moveRight) {
                app.fire('input:addLateralForce', this.moveSensitivity);
            }

            if (app.keyboard.isPressed(pc.KEY_UP) || moveForward) {
                app.fire('input:addForwardForce', this.moveSensitivity);
            }

            if (app.keyboard.isPressed(pc.KEY_DOWN) || moveBackward) {
                app.fire('input:addForwardForce', -this.moveSensitivity);
            }
        }
    }
    
};

DesktopInput.prototype.onMouseMove = function (e) {    
    // If pointer is disabled or the left mouse button is down update the camera from mouse movement
    if (pc.Mouse.isPointerLocked() || e.buttons[0]) {
        var delta = new pc.Vec2(this.lookSensitivity * e.dx, this.lookSensitivity * e.dy);
        this.app.fire('input:setLookDelta', delta);
    }            
};


DesktopInput.prototype._onMouseDown = function (event) {    
    // If pointer is disabled or the left mouse button is down update the camera from mouse movement
     //this.app.mouse.enablePointerLock();   
     //console.log('MouseDown');
     if(this.entity.children){
         if(this.entity.children[0]){
             var from = this.entity.children[0].getPosition();

                // The pc.Vec3 to raycast to (the click position projected onto the camera's far clip plane)
                var to = this.entity.children[0].camera.screenToWorld(event.x, event.y, this.entity.children[0].camera.farClip);

                // Raycast between the two points and return the closest hit result
                var result = this.app.systems.rigidbody.raycastFirst(from, to);
                
                // If there was a hit, store the entity
                if (result) {
                console.log('Result : '+ result.entity.name);
                if(result.entity.tags.has('Video')){
                    console.log('Video');
                    result.entity.parent.fire('ui:VideoTest',"Video");
                }
            
            }       
         }
     }
     
};




DesktopInput.prototype.getPinchDistance = function (pointA, pointB) {
    // Return the distance between the two points
    var dx = pointA.x - pointB.x;
    var dy = pointA.y - pointB.y;    
    
    return Math.sqrt((dx * dx) + (dy * dy));
};


DesktopInput.prototype.calcMidPoint = function (pointA, pointB, result) {
    result.set(pointB.x - pointA.x, pointB.y - pointA.y);
    result.scale(0.5);
    result.x += pointA.x;
    result.y += pointA.y;
};


DesktopInput.prototype.onTouchStartEndCancel = function(event) {
    // We only care about the first touch for camera rotation. As the user touches the screen, 
    // we stored the current touch position
    var touches = event.touches;
    if (touches.length == 1) {
        this.lastTouchPoint.set(touches[0].x, touches[0].y);
    
    } else if (touches.length == 2) {
        // If there are 2 touches on the screen, then set the pinch distance
        this.lastPinchDistance = this.getPinchDistance(touches[0], touches[1]);
        this.calcMidPoint(touches[0], touches[1], this.lastPinchMidPoint);
    }
};


DesktopInput.fromWorldPoint = new pc.Vec3();
DesktopInput.toWorldPoint = new pc.Vec3();
DesktopInput.worldDiff = new pc.Vec3();




DesktopInput.pinchMidPoint = new pc.Vec2();

DesktopInput.prototype.onTouchMove = function(event) {
    var pinchMidPoint = DesktopInput.pinchMidPoint;
    
    // We only care about the first touch for camera rotation. Work out the difference moved since the last event
    // and use that to update the camera target position 
    var touches = event.touches;
    if (touches.length == 1) {
        var touch = touches[0];
        
        // this.orbitCamera.pitch -= (touch.y - this.lastTouchPoint.y) * this.orbitSensitivity;
        // this.orbitCamera.yaw -= (touch.x - this.lastTouchPoint.x) * this.orbitSensitivity;

        var delta = new pc.Vec2( (touch.x - this.lastTouchPoint.x) * this.lookSensitivity, (touch.y - this.lastTouchPoint.y) * this.lookSensitivity);
        this.app.fire('input:setLookDelta', delta);
        
        this.lastTouchPoint.set(touch.x, touch.y);
    
    }
};
