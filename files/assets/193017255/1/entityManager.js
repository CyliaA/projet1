var EntityManager = pc.createScript('entityManager');

// Ajoute un attribut pour stocker les entités à gérer
EntityManager.attributes.add('entities', {
    type: 'entity',
    array: true,
    title: 'Entities'
});

// Cette fonction est appelée une seule fois à l'initialisation de l'entité
EntityManager.prototype.initialize = function() {
    if (this.entities.length > 0) {
        this.showEntity(0); // Affiche la première entité par défaut
    }
};

// Fonction pour afficher une entité spécifique et cacher les autres
EntityManager.prototype.showEntity = function(index) {
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].enabled = (i === index);
    }
};

// Fonction pour masquer toutes les entités
EntityManager.prototype.hideAllEntities = function() {
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].enabled = false;
    }
};

// Fonction pour afficher une entité spécifique par son nom
EntityManager.prototype.showEntityByName = function(name) {
    for (var i = 0; i < this.entities.length; i++) {
        if (this.entities[i].name === name) {
            this.showEntity(i);
            break;
        }
    }
};
