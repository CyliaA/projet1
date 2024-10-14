var CameraAnimation = pc.createScript('cameraAnimation');

// Attributs pour la caméra et l'élément cible
CameraAnimation.attributes.add('targetEntity', { type: 'entity' });
CameraAnimation.attributes.add('duration', { type: 'number', default: 2.0 });
CameraAnimation.attributes.add('startDelay', { type: 'number', default: 1.0 });
CameraAnimation.attributes.add('offsetX', { type: 'number', default: 0 }); // Décalage de position sur l'axe X
CameraAnimation.attributes.add('offsetY', { type: 'number', default: 0 }); // Décalage de position sur l'axe Y
CameraAnimation.attributes.add('offsetZ', { type: 'number', default: 0 });

// Initialisation
CameraAnimation.prototype.initialize = function() {
    this.startTime = 0;
    this.animating = false;
    this.startPosition = this.entity.getPosition().clone();
    this.startRotation = this.entity.getRotation().clone();

    // Démarrer l'animation après un délai spécifié
    setTimeout(() => {
        this.startAnimation();
    }, this.startDelay * 1000);
};

// Démarrer l'animation
CameraAnimation.prototype.startAnimation = function() {
    if (this.targetEntity) {
        this.startTime = Date.now();
        this.startPosition = this.entity.getPosition().clone();
        this.startRotation = this.entity.getRotation().clone();
        this.animating = true;
    } else {
        console.error('Cible de la caméra non définie.');
    }
};

// Mettre à jour l'animation chaque frame
CameraAnimation.prototype.update = function(dt) {
    if (this.animating) {
        var elapsedTime = (Date.now() - this.startTime) / 1000;
        var t = elapsedTime / this.duration;

        if (t >= 1) {
            t = 1;
            this.animating = false;
        }

        // Interpoler la position et la rotation
        var targetPosition = this.targetEntity.getPosition().clone().add(new pc.Vec3(this.offsetX, this.offsetY, this.offsetZ)); // Appliquer les décalages sur les axes X et Y
        var targetRotation = this.targetEntity.getRotation().clone();

        var currentPosition = new pc.Vec3().lerp(this.startPosition, targetPosition, t);
        var currentRotation = new pc.Quat().slerp(this.startRotation, targetRotation, t);

        this.entity.setPosition(currentPosition);
        this.entity.setRotation(currentRotation);

        // Arrêter l'animation une fois terminée
        if (!this.animating) {
            this.entity.setPosition(targetPosition);
            this.entity.setRotation(targetRotation);
        }
    }
};
