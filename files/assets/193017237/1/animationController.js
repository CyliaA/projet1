// Créez un script PlayCanvas pour gérer des boutons et des animations
var AnimationController = pc.createScript('animationController');

// Ajouter des attributs pour les entités bouton et animation
AnimationController.attributes.add('buttonEntity', {
    type: 'entity',
    title: 'Button Entity',
    description: 'L\'entité du bouton qui déclenchera l\'animation'
});

AnimationController.attributes.add('animationName', {
    type: 'string',
    title: 'Animation Name',
    description: 'Le nom de l\'animation à jouer'
});

AnimationController.prototype.initialize = function() {
    // Vérifiez si le bouton est défini

        this.buttonEntity.element.on('click', this.onClick, this);

};

AnimationController.prototype.onClick = function() {
    var animation = this.entity.animation;
    if (animation && this.animationName) {
        animation.play(this.animationName);
    } else {
        console.warn('Le composant Animation n\'est pas trouvé sur l\'entité ou le nom de l\'animation est manquant.');
    }
};
