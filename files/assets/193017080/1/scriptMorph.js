var AvatarChat = pc.createScript('scriptMorph');

// Ajouter des attributs pour les entités avatar
AvatarChat.attributes.add('avatarEntity', { type: 'entity' });
AvatarChat.attributes.add('buttonEntity', { type: 'entity' });

// Initialisation
AvatarChat.prototype.initialize = function() {
    // Référence à l'avatar
    this.avatar = this.avatarEntity.model;
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
            startButton.on('click', () => {
                // Démarrer la présentation des dimensions du bien-être
                this.presentWellBeingDimensions();
                // Démarrer le clignotement des yeux
                this.startEyeBlinking();
            });
        } else {
            console.error('Bouton non trouvé.');
        }
    });
};

// Fonction pour présenter les 8 dimensions du bien-être avec animation morph
AvatarChat.prototype.presentWellBeingDimensions = function() {
    var texte = [
"Let's start with the first dimension: emotional well-being. This includes understanding and managing your emotions, as well as developing a positive attitude.",
"The second dimension is behavioral well-being. This involves adopting healthy behaviors and habits that contribute to overall well-being.",
"The third dimension is environmental well-being. This means living in harmony with our environment and taking care of the planet.",
"The fourth dimension is social well-being. This involves creating and maintaining healthy and enriching relationships with others.",
"The fifth dimension is spiritual well-being. This concerns the search for meaning and purpose in life, and can include meditation, prayer, or other spiritual practices.",
"The sixth dimension is financial well-being. It involves managing your finances effectively to reduce stress and ensure long-term financial security.",
"The seventh dimension is physical well-being. This involves maintaining a healthy body through exercise, a balanced diet, and proper care.",
"Finally, the eighth dimension is occupational well-being. This includes job satisfaction, stress management, and work-life balance.",
"Thank you for joining me in this presentation of the 8 dimensions of well-being.",
"Now it's time for your assessment. When you're ready, take a deep breath and click the start button to begin."
    ];

    var currentIndex = 0;
    var delay = 3000; // 7 secondes entre les messages

    var speakNext = () => {
        if (currentIndex < texte.length) {
            // Lire le texte avec synthèse vocale
            lireTexte(texte[currentIndex]);
            // Animer les morph targets pour le texte actuel
            this.animateMorphTargets(texte[currentIndex]);
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
    };

    var delay = 200; // Délai entre les phonèmes en ms
    var currentIndex = 0;

    // Animer les phonèmes
    for (var i = 0; i < text.length; i++) {
        (function(i) {
            setTimeout(function() {
                var char = text[i];
                var targetName = phonemeToMorphTarget[char];
                if (targetName) {
                    var index = morphTargetIndices[targetName];
                    if (index !== undefined) {
                        morphInstance.setWeight(index, 0.5);
                        this.morphTargetCounts[targetName]++;
                        setTimeout(function() {
                            morphInstance.setWeight(index, 0);
                        }, delay);
                    }
                }
            }.bind(this), 70 * currentIndex);
            currentIndex++;
        }).call(this, i);
    }

    // Afficher le compteur final après toutes les animations
    setTimeout(function() {
     //   console.log('Final morph target counts:', this.morphTargetCounts);
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
 //   console.log('Synthèse vocale supportée.');
} else {
    console.log('Synthèse vocale non supportée dans ce navigateur.');
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

    // Écouter l'événement d'achèvement de la synthèse vocale
    utterance.onend = function() {
        // Arrêter les animations si nécessaire
      //  console.log('Synthèse vocale terminée.');
    };

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
