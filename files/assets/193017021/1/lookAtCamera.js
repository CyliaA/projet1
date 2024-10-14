var LookAtCamera = pc.createScript('lookAtCamera');

LookAtCamera.attributes.add('targetEntity', {
    type: 'entity',
    description: 'The entity to click on and make look at the camera'
});

LookAtCamera.attributes.add('cameraEntity', {
    type: 'entity',
    description: 'The camera entity to look at'
});

// initialize code called once per entity
LookAtCamera.prototype.initialize = function() {
    if (this.targetEntity && this.cameraEntity) {
        this.targetEntity.element.on('click', this.onClick, this);
    }
};

LookAtCamera.prototype.onClick = function(event) {
    var targetPosition = this.targetEntity.getPosition();
    var cameraPosition = this.cameraEntity.getPosition();

    var direction = new pc.Vec3();
    direction.sub2(cameraPosition, targetPosition).normalize();

    var rotation = new pc.Quat();
    rotation.setFromMat4(new pc.Mat4().lookAt(targetPosition, cameraPosition, pc.Vec3.UP));

    this.targetEntity.setRotation(rotation);
};

// update code called every frame
LookAtCamera.prototype.update = function(dt) {
    // No update logic needed
};
