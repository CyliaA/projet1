var Redirect = pc.createScript('redirect');

// Ajoutez un attribut pour l'URL
Redirect.attributes.add('url', { type: 'string', title: 'URL' });

// Ajoutez des attributs pour les dimensions de la fenêtre
Redirect.attributes.add('width', { type: 'number', title: 'Width', default: 600 });
Redirect.attributes.add('height', { type: 'number', title: 'Height', default: 400 });

// Initialisation du script
Redirect.prototype.initialize = function() {
    // Utilisez la méthode on pour écouter l'événement de clic sur cette entité
    this.entity.element.on('click', this.onClick, this);
};

// Fonction appelée lorsqu'on clique sur l'entité
Redirect.prototype.onClick = function(event) {
    // Calculer la position pour centrer la fenêtre popup
    var left = (screen.width / 2) - (this.width / 2);
    var top = (screen.height / 2) - (this.height / 2);
    
    // Options pour la fenêtre popup
    var options = `width=${this.width},height=${this.height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`;
    
    // Ouvrir l'URL dans une nouvelle fenêtre popup
    window.open(this.url, 'popup', options);
};

// Update code called every frame
Redirect.prototype.update = function(dt) {
    // Aucun code de mise à jour nécessaire pour ce script
};

// Uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// Redirect.prototype.swap = function(old) { };
