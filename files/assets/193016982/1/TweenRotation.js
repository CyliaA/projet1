var TweenRotation = pc.createScript('tweenRotation');

TweenRotation.attributes.add('RotationSpeed', {type: 'number'});

TweenRotation.prototype.initialize = function() {
    
};

TweenRotation.prototype.update = function(dt) {
    var x = this.entity.getLocalEulerAngles().x;
    var y = this.entity.getLocalEulerAngles().y;
    var z = this.entity.getLocalEulerAngles().z - this.RotationSpeed * dt;
    
    this.entity.setLocalEulerAngles(x,y,z);
};
