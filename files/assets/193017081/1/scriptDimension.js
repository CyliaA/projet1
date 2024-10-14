var AvatarChat = pc.createScript('scriptDimension');

// Ajouter des attributs pour les entités avatar
AvatarChat.attributes.add('avatarEntity', { type: 'entity' });
AvatarChat.attributes.add('buttonEntity', { type: 'entity' });

// Initialisation
AvatarChat.prototype.initialize = function() {
    // Référence à l'avatar
  //  this.avatar = this.avatarEntity.model;
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

    // Charger les voix disponibles
    loadVoices().then(() => {
        // Ajouter un écouteur d'événements pour le bouton "Start"
        var startButton = this.buttonEntity.element; // Accéder à l'élément du bouton
        if (startButton) {
            // S'assurer que l'événement n'est ajouté qu'une seule fois
            if (!this.buttonEntity._hasClickEvent) {
                startButton.on('click', () => {
                    // Démarrer la présentation des dimensions du bien-être
                    this.presentWellBeingDimensions();
                    // Démarrer le clignotement des yeux
                    this.startEyeBlinking();
                });
                this.buttonEntity._hasClickEvent = true; // Marquer comme ajouté
            }
        } else {
            console.error('Bouton non trouvé.');
        }
    });
};

// Fonction pour présenter les 8 dimensions du bien-être avec animation morph
AvatarChat.prototype.presentWellBeingDimensions = function() {
    var dimensions = [
"How doe it work ? ",

"Our museum is here to guide you through the 8 dimensions of well-being, offering daily dose of support workshops to help with  your daily challenges. Let me introduce you to each dimension:",

"First, the  Emotional and intellectual Well-being. This focuses on understanding and managing your feelings, and nurturing a positive outlook on life.",

"Next is Behavioral Well-being. This dimension helps you build healthy habits and practices that enhance your overall wellness.",

"Our third dimension is Environmental Well-being. Here, we emphasize living in harmony with our surroundings and taking care of our planet.",

"Then we have Social Well-being. This dimension is about fostering meaningful connections and building a supportive network of relationships.",

"We continue with the Spiritual Well-being. This dimension guides you in finding purpose and meaning in life, through practices like meditation, prayer, or personal reflection.",
"The sixth dimension is financial well-being. It involves managing your finances effectively to reduce stress and ensure long-term financial security.",
"The seventh dimension is physical well-being. This involves maintaining a healthy body through exercise, a balanced diet, and proper care.",
"Lastly, the eighth dimension is occupational well-being. This includes job satisfaction, stress management, and work-life balance."
    ];

    var currentIndex = 0;
    var delay = 3000; // 7 secondes entre les messages

    var speakNext = () => {
        if (currentIndex < dimensions.length) {
            // Lire le texte avec synthèse vocale
            lireTexte(dimensions[currentIndex]);
            // Animer les morph targets pour le texte actuel
            this.animateMorphTargets(dimensions[currentIndex]);
            currentIndex++;
            setTimeout(speakNext, delay);
        }
    };

    speakNext();
};

// Animation des morph targets
AvatarChat.prototype.animateMorphTargets = function(text) {
    var morphInstance = this.morphInstance;
    var morphTargetIndices = this.morphTargetIndices;

    // Mapper les phonèmes aux morph targets
    var phonemeToMorphTarget = {
      //  'h': 'mouthOpen',
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
    };

    var delay = 300; // Délai entre les phonèmes en ms
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
                        setTimeout(function() {
                            morphInstance.setWeight(index, 0);
                        }, delay);
                    }
                }
            }.bind(this), delay*currentIndex);
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
    var blinkInterval = 2000; // Intervalle de clignotement en ms

    var blink = function() {
        blinkTargets.forEach(function(target) {
            var index = morphTargetIndices[target];
            if (index !== undefined) {
                morphInstance.setWeight(index, 0.6);
                setTimeout(function() {
                    morphInstance.setWeight(index, 0);
                }, 50); // Durée du clignotement
            }
        });

        // Planifier le prochain clignotement
        setTimeout(blink, blinkInterval);
    };

    // Démarrer le premier clignotement après un délai aléatoire
    setTimeout(blink, Math.random() * blinkInterval);
};

// Vérifier si la synthèse vocale est supportée
if ('speechSynthesis' in window) {
  //  console.log('Synthèse vocale supportée.');
} else {
   // console.log('Synthèse vocale non supportée dans ce navigateur.');
}

// Fonction pour obtenir les voix disponibles
function loadVoices() {
    return new Promise((resolve) => {
        const id = setInterval(() => {
            voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                clearInterval(id);
                resolve();
            }
        }, 10);
    });
}

// Fonction pour lire le texte avec la synthèse vocale
function lireTexte(texte, voiceIndex = 89, volume = 1, rate = 1) {
    const synthese = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(texte);

    if (voices.length > 0) {
        // Vérifier si l'index de la voix est valide
        if (voiceIndex >= 0 && voiceIndex < voices.length) {
            utterance.voice = voices[voiceIndex];
        } else {
            console.warn(`L'index de la voix ${voiceIndex} est invalide. Utilisation de la voix par défaut.`);
            utterance.voice = voices[0]; // Utiliser la première voix disponible
        }
    }

    utterance.volume = volume;
    utterance.rate = rate;

    synthese.speak(utterance);
}
