var ChargerAvatar = pc.createScript('ChargerAvatar');

// Attribuer l'entité cible à partir de l'éditeur
ChargerAvatar.attributes.add('targetEntity', { type: 'entity' });

// Attribuer l'élément bouton à partir de l'éditeur
ChargerAvatar.attributes.add('buttonElement', { type: 'entity' });

// Initialise le script
ChargerAvatar.prototype.initialize = function() {
    // Assurez-vous que l'entité cible est cachée au départ
    this.targetEntity.enabled = true;

    // Ajouter un événement de clic au bouton
  //  this.buttonElement.element.on('click', this.onButtonClick, this);
};

// Fonction appelée lors du clic sur le bouton
ChargerAvatar.prototype.onButtonClick = function(event) {
    // Rendre l'entité cible visible
    this.targetEntity.enabled = false;
};
