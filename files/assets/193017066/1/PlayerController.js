var PlayerController = pc.createScript('playerController');

PlayerController.attributes.add('camera', {
    type: 'entity',
    description: 'Player Camera'
});

// initialize code called once per entity
PlayerController.prototype.initialize = function() {
    
    this.eulers = new pc.Vec3();
            
    this.checkRequiredComponents();
    
    // Look event
    this.app.on('input:setLookDelta', this.setLookDelta, this);
    
    // Movement events
    this.app.on('input:addForwardForce', this.addForwardForce, this);
    this.app.on('input:addLateralForce', this.addLateralForce, this);
};

// update code called every frame
PlayerController.prototype.update = function(dt) {
    
};

PlayerController.prototype.checkRequiredComponents = function(){
    if (!this.entity.collision) {
        console.error("Player Controller needs to have a 'collision' component");
    }

    if (!this.entity.rigidbody || this.entity.rigidbody.type !== pc.BODYTYPE_DYNAMIC) {
        console.error("Player Controller needs to have a DYNAMIC 'rigidbody' component");
    }
    
    if (!this.camera) {
        console.error("Player Controller needs to reference a camera component");
    }
};

PlayerController.prototype.setLookDelta = function(delta){
    this.eulers.x -= delta.x;
    this.eulers.y -= delta.y;
    this.camera.setLocalEulerAngles(this.eulers.y, this.eulers.x, 0);
};

PlayerController.prototype.addForwardForce = function(power){
    var forward = this.camera.forward;
    var force = new pc.Vec3();
    var x = forward.x * power;
    var z = forward.z * power;
    force.set(x, 0, z).normalize().scale(Math.abs(power));
    if(this.entity){
        if(this.entity.rigidbody){
            this.entity.rigidbody.applyForce(force);
        }
        
    }
};

PlayerController.prototype.addLateralForce = function(power){
    var right = this.camera.right;
    var force = new pc.Vec3();
    var x = right.x * power;
    var z = right.z * power;
    force.set(x, 0, z).normalize().scale(Math.abs(power));

    if(this.entity){
        if(this.entity.rigidbody){
            this.entity.rigidbody.applyForce(force);
        }
        
    }
    
};
