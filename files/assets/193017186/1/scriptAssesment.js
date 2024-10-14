var ScriptAssesment = pc.createScript('scriptAssesment');

// Ajouter des attributs pour les entités avatar
ScriptAssesment.attributes.add('avatarEntity', { type: 'entity' });

// Initialisation
ScriptAssesment.prototype.initialize = function() {
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

    // Charger les voix disponibles et démarrer l'animation
    loadVoices().then(() => {
        // Démarrer la présentation des dimensions du bien-être
        this.presentWellBeingDimensions();
        // Démarrer le clignotement des yeux
        this.startEyeBlinking();
    });
};

// Fonction pour présenter les dimensions du bien-être avec animation morph
ScriptAssesment.prototype.presentWellBeingDimensions = function() {
    var texte = [
     //"Hello and welcome I am Doctor Boost, I am your virtual coach, Let's take a moment to delve deeper into your needs. This will help me tailor our workshop resources to best meet your unique reality. Are you ready to begin your assessment? Please wait while I help you complete it."     
   // "Hello and Welcome to the Cogni Wellbeing Hub. i am doctor boost, i am your virtual coach. Before we begin, take a deep breath. count 1 to 10 and breathe. as you count backward to 1 open your eyes. We are about to embark on a therapeutic journey through the height dimensions of well-being. When you are ready, Click Start to begin your assessment. Please wait while I help you complete it."
   "Hello, and welcom to the Cogni Wellbeing Museum! I'm Dr. Boost, I will be your virtual coach. Before we begin, let’s take a moment to relax. Close your eyes and take a deep breath. Count slowly from 1 to 10. and as you exhale, release any tension.  Slowly count backward to 1 and gently open your eyes. You are about to embark on a self-guided journey through the eight dimensions of well-being. When you’re ready, click 'Start' to begin your assessment. "//Do you need my assistance?" 
    ]


    var currentIndex = 0;
    var delay = 3000; // Délai entre les messages en ms

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

// Vérifier si la synthèse vocale est supportée
if ('speechSynthesis' in window) {
   console.log('Synthèse vocale supportée.');
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
 loadVoices().then(() => {
        console.log("Available voices:", this.voices);
    });

// Fonction pour lire le texte avec la synthèse vocale
function lireTexte(texte, voiceIndex = 89, volume = 1, rate = 0.9) {
    const synthese = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(texte);

    // Écouter l'événement d'achèvement de la synthèse vocale
    utterance.onend = function() {
        // Arrêter les animations si nécessaire
        console.log('Synthèse vocale terminée.');
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

};


// Animation des morph targets
ScriptAssesment.prototype.animateMorphTargets = function(text) {
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
ScriptAssesment.prototype.startEyeBlinking = function() {
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

