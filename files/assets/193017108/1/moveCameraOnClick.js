var MoveCameraOnClick = pc.createScript('moveCameraOnClick');

// Add attribute to reference the target entity
MoveCameraOnClick.attributes.add('targetEntity', {
    type: 'entity',
    title: 'Target Entity',
    description: 'The entity to move the camera to when the button is clicked'
});

// Add attribute to reference the camera entity
MoveCameraOnClick.attributes.add('cameraEntity', {
    type: 'entity',
    title: 'Camera Entity',
    description: 'The camera entity that will be moved'
});

// initialize code called once per entity
MoveCameraOnClick.prototype.initialize = function() {
    this.entity.button.on('click', this.onClick, this);
};

MoveCameraOnClick.prototype.onClick = function() {
    if (this.targetEntity && this.cameraEntity) {
        var targetPosition = this.targetEntity.getPosition();
        this.cameraEntity.setPosition(targetPosition);
        
        // Optionally, you can also update the camera's rotation to match the target entity
        var targetRotation = this.targetEntity.getRotation();
        this.cameraEntity.setRotation(targetRotation);
    }
};
