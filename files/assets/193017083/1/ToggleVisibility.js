var ToggleVisibility = pc.createScript('toggleVisibility');

// Ajouter des attributs pour les entités bouton et cible
ToggleVisibility.attributes.add('buttonEntity', { type: 'entity', title: 'Button Entity' });
ToggleVisibility.attributes.add('targetEntity', { type: 'entity', title: 'Target Entity' });

// Initialisation
ToggleVisibility.prototype.initialize = function() {
    // Vérifier si les entités sont définies
    if (!this.buttonEntity || !this.targetEntity) {
        console.error('Les entités bouton et cible doivent être définies.');
        return;
    }

    // Attacher l'événement de clic du bouton à la méthode 'onButtonClick'
    this.buttonEntity.element.on('click', this.onButtonClick, this);
};

// Fonction pour gérer le clic du bouton
ToggleVisibility.prototype.onButtonClick = function(event) {
    // Inverser la visibilité de l'entité cible
    this.targetEntity.enabled = !this.targetEntity.enabled;
};
