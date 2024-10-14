var SimpleMorphButton = pc.createScript('simpleMorphButton');

// Ajoute une propriété pour définir les morph targets
SimpleMorphButton.attributes.add('audioEntity', { type: 'entity' });
SimpleMorphButton.attributes.add('morphEntity', { type: 'entity' });
SimpleMorphButton.attributes.add('morphTargets', {
    type: 'json',
    array: true,
    schema: [{
        name: 'name',
        type: 'string',
        title: 'Morph Target Name'
    }]
});
SimpleMorphButton.attributes.add('audioSlotName', { type: 'string', default: 'Slot 1' }); // Nom du slot de son

// Initialisation
SimpleMorphButton.prototype.initialize = function() {
    // Référence au bouton
    this.button = this.entity.element;
    // Référence à l'audio
    this.audioSource = this.audioEntity.sound;
    // Référence à l'instance de morph
    this.morphInstance = null;

    // Assure que l'entité morphEntity a un composant modèle
    if (this.morphEntity.model) {
        var meshInstances = this.morphEntity.model.meshInstances;
        if (meshInstances.length > 0) {
            for (var i = 0; i < meshInstances.length; i++) {
                var morphInstance = meshInstances[i].morphInstance;
                if (morphInstance) {
                    this.morphInstance = morphInstance;

                    // Map morph target names to indices
                    this.morphTargetIndices = {};
                    var morphTargets = morphInstance.morph._targets;
                    for (var j = 0; j < morphTargets.length; j++) {
                        this.morphTargetIndices[morphTargets[j].name] = j;
                    }
                    break;
                }
            }
        }
    }

    // Ajouter un écouteur d'événement pour le bouton
    this.button.on('click', this.onButtonClick, this);
};

// Callback pour le clic sur le bouton
SimpleMorphButton.prototype.onButtonClick = function() {
    // Démarre la lecture de l'audio
    this.audioSource.play(this.audioSlotName);
    // Démarre l'animation
    this.startAnimation();
};

// Fonction pour animer les morph targets
SimpleMorphButton.prototype.startAnimation = function() {
    var duration = this.audioSource.slot(this.audioSlotName).duration * 1000; // Convertir en millisecondes
    var startTime = Date.now();
    var morphInstance = this.morphInstance;
    var morphTargetIndices = this.morphTargetIndices;
    var morphTargets = this.morphTargets;

    // Fonction d'animation simple
    var animate = function() {
        var elapsedTime = Date.now() - startTime;

        if (elapsedTime < duration) {
            var progress = elapsedTime / duration;

            // Met à jour les poids des morph targets
            morphTargets.forEach(function(target) {
                var index = morphTargetIndices[target.name];
                if (index !== undefined) {
                    var weight = Math.sin(progress * Math.PI * 2); // Animation sinusoïdale simple
                    morphInstance.setWeight(index, weight);
                }
            });

            // Continue l'animation au frame suivant
            requestAnimationFrame(animate);
        } else {
            // Réinitialise les poids des morph targets
            morphTargets.forEach(function(target) {
                var index = morphTargetIndices[target.name];
                if (index !== undefined) {
                    morphInstance.setWeight(index, 0);
                }
            });
        }
    };

    // Démarre l'animation
    animate();
};
