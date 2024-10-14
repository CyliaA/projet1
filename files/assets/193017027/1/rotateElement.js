var RotateElement = pc.createScript('rotateElement');

// Ajouter des attributs pour les angles
RotateElement.attributes.add('angleX', { type: 'number', default: 0, title: 'Angle X' });
RotateElement.attributes.add('angleY', { type: 'number', default: 0, title: 'Angle Y' });
RotateElement.attributes.add('angleZ', { type: 'number', default: 0, title: 'Angle Z' });

// Initialisation
RotateElement.prototype.initialize = function() {
    // Ajouter un écouteur pour le clic sur l'entité
    this.entity.element.on('click', this.rotate, this);
};

// Méthode pour faire tourner l'entité selon les angles spécifiés
RotateElement.prototype.rotate = function() {
    var currentRotation = this.entity.getEulerAngles();
    currentRotation.x += this.angleX;
    currentRotation.y += this.angleY;
    currentRotation.z += this.angleZ;
    this.entity.setEulerAngles(currentRotation);
};
