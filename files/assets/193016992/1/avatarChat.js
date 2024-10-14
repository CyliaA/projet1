var AvatarChat = pc.createScript('avatarChat');

// Ajouter des attributs pour les entités avatar et audio
AvatarChat.attributes.add('avatarEntity', { type: 'entity' });
AvatarChat.attributes.add('audioEntity', { type: 'entity' });
AvatarChat.attributes.add('audioSlotName', { type: 'string', default: 'Slot 1' });

// Initialisation
AvatarChat.prototype.initialize = function() {
    // Référence à l'avatar
    this.avatar = this.avatarEntity.model;
    // Référence à l'audio
    this.audioSource = this.audioEntity.sound;
    // Référence à l'instance de morph
    this.morphInstance = null;

    // Assure que l'entité avatarEntity a un composant modèle
    if (this.avatar) {
        var meshInstances = this.avatar.meshInstances;
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

    // Vérifier si la morphInstance a été trouvée
    if (!this.morphInstance) {
        console.error('Morph instance not found');
        return;
    }

    // Initialiser les compteurs
    this.morphTargetCounts = {};
    for (var target in this.morphTargetIndices) {
        this.morphTargetCounts[target] = 0;
    }

    // Ajouter un écouteur pour le clic sur un bouton
    this.entity.element.on('click', this.onStartConversation, this);
};

// Démarrer la conversation
AvatarChat.prototype.onStartConversation = function() {
    // Jouer l'audio
    if (this.audioSource) {
        this.audioSource.play(this.audioSlotName);
        // Synchroniser l'animation des morph targets avec l'audio
        this.animateMorphTargets();
        // Démarrer le clignotement des yeux
        this.startEyeBlinking();
    } else {
        console.error('Audio source not found or audio slot name is incorrect');
    }
};

// Animation des morph targets
AvatarChat.prototype.animateMorphTargets = function() {
    var morphInstance = this.morphInstance;
    var morphTargetIndices = this.morphTargetIndices;

    // Mapper les phonèmes aux morph targets
    var phonemeToMorphTarget = {
        'h': 'mouthOpen',
        'e': 'viseme_E',
        'l': 'viseme_I',
        'o': 'viseme_O',
        'i': 'viseme_I',
        'a': 'viseme_aa',
        'm': 'mouthClosed',
        'y': 'mouthSmile',
        'r': 'viseme_RR',
        't': 'viseme_TH',
        'u': 'viseme_U',
        's': 'viseme_SS',
        'n': 'viseme_nn',
        'd': 'viseme_DD',
        'p': 'viseme_PP',
        'k': 'viseme_kk'
//viseme_CH

    };

    var text = "Hello i am docrot boost i am your virtual guide assistant";
    var delay = 200; // Délai entre les phonèmes en ms

    var currentIndex = 0;
    for (var i = 0; i < text.length; i++) {
        (function(i) {
            setTimeout(function() {
                var char = text[i];
                var targetName = phonemeToMorphTarget[char];
                if (targetName) {
                    var index = morphTargetIndices[targetName];
                    if (index !== undefined) {
                        // Activer la morph target
                        morphInstance.setWeight(index, 0.8);
                        // Incrémenter le compteur de la morph target
                        this.morphTargetCounts[targetName]++;
                        console.log('Activating morph target:', targetName, 'Count:', this.morphTargetCounts[targetName]);
                        setTimeout(function() {
                            morphInstance.setWeight(index, 0);
                        }, delay);
                    }
                }
            }.bind(this), delay * currentIndex);
            currentIndex++;
        }).call(this, i);
    }

    // Afficher le compteur final après toutes les animations
    setTimeout(function() {
        console.log('Final morph target counts:', this.morphTargetCounts);
    }.bind(this), delay * text.length);
};

// Animation des clignements des yeux
AvatarChat.prototype.startEyeBlinking = function() {
    var morphInstance = this.morphInstance;
    var morphTargetIndices = this.morphTargetIndices;

    var blinkTargets = ['eyeBlinkLeft', 'eyeBlinkRight'];
    var blinkInterval = 2000; // Intervalle de clignement en ms

    var blink = function() {
        blinkTargets.forEach(function(target) {
            var index = morphTargetIndices[target];
            if (index !== undefined) {
                morphInstance.setWeight(index, 0.6);
                setTimeout(function() {
                    morphInstance.setWeight(index, 0);
                }, 50); // Durée du clignement
            }
        });

        // Planifier le prochain clignement
        setTimeout(blink, blinkInterval);
    };

    // Démarrer le premier clignement après un délai aléatoire
    setTimeout(blink, Math.random() * blinkInterval);
};
