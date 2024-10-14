var Locomotion = pc.createScript('locomotion');

// initialize code called once per entity
Locomotion.prototype.initialize = function() {
    this.app.mouse.disableContextMenu();
    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    
    this.characterDirection = new pc.Vec3(1, 0, 0);
    this.targetPosition = new pc.Vec3(2,0,1.5);
};

Locomotion.prototype.onMouseDown = function (event) {
    if (event.button !== 0) return;
    // Set the character target position to a position on the plane that the user has clicked
    var cameraEntity = this.app.root.findByName('Camera');
    var near = cameraEntity.camera.screenToWorld(event.x, event.y, 0.1);
    var far = cameraEntity.camera.screenToWorld(event.x, event.y, 1000.0);
    var result = this.app.systems.rigidbody.raycastFirst(far, near);
    if (result) {
        this.targetPosition = new pc.Vec3(result.point.x, 0, result.point.z);
        this.entity.anim.setInteger('speed', 1);
    }
};

function speedForState(state) {
    switch (state) {
        case 'Walking':
            return 2.0;
        case 'Sitting':
            return 4.0;
        case 'Greet':
        case 'Idle':
            return 0.0;
        default:
            return 0.0;
    }
}

// update code called every frame
Locomotion.prototype.postUpdate = function(dt) {
    
    // Check for jumping event
    if(this.app.keyboard.wasPressed(pc.KEY_SPACE)) {
        var isJumping = this.entity.anim.baseLayer.activeState === 'Sitting';
        if (!isJumping) {
            this.jumpTime = 0;
            this.entity.anim.setTrigger('Sitting');
        }
        this.entity.anim.setTrigger('Sitting');
    }
    
    // Check for jogging event    
    if (this.app.keyboard.wasPressed(pc.KEY_X)) {
        if (this.entity.anim.baseLayer.activeState === 'Walking') {
            this.entity.anim.setInteger('speed', 2);
        }
    }
    else if (this.app.keyboard.wasReleased(pc.KEY_X)) {
        if (this.entity.anim.baseLayer.activeState === 'Greet') {
            this.entity.anim.setInteger('speed', 1);
        }
    }

    this.isMoving = !this.entity.position.equals(this.targetPosition);
    if (this.isMoving) {
        // Update position if target position is not the same as entity position. Base the movement speed on the current state
        // Move the character along X & Z axis based on click target position & make character face click direction
        var moveSpeed = speedForState(this.entity.anim.baseLayer.activeState);
        if (this.entity.anim.baseLayer.transitioning) {
            var prevMoveSpeed = speedForState(this.entity.anim.baseLayer.previousState);
            var progress = this.entity.anim.baseLayer.transitionProgress;
            moveSpeed = (prevMoveSpeed * (1.0 - progress)) + (moveSpeed * progress);
        }
        var distance = this.targetPosition.clone().sub(this.entity.position);
        var direction = distance.clone().normalize();
        this.characterDirection = new pc.Vec3().sub(direction);
        var movement = direction.clone().scale(dt * moveSpeed);
        if (movement.length() < distance.length()) {
            this.entity.setPosition(this.entity.position.clone().add(movement));
        } else {
            this.entity.position = this.targetPosition;
        }
    } else {
        this.entity.anim.setInteger('speed', 0);
    }
    this.entity.lookAt(this.entity.position.clone().add(this.characterDirection));

};

// swap method called for script hot-reloading
// inherit your script state here
// Locomotion.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/