var ScriptEnviro = pc.createScript('scriptEnviro');

// Ajouter des attributs pour les entités avatar
ScriptEnviro.attributes.add('avatarEntity', { type: 'entity' });

// Initialisation
ScriptEnviro.prototype.initialize = function() {
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
    //    console.error('Morph instance not found');
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
ScriptEnviro.prototype.presentWellBeingDimensions = function() {
    var texte = [
      //  "Welcome back! With a clearer understanding of your needs, I am excited to guide you through the Wellbeing Museum. You now have access to our workshops and resources, thoughtfully designed by our therapists and counselors to support you in one of the 8 dimensions of well-being. Feel free to explore each dimensions content at your own pace and see what resonates with you.",

      //  "Remember, you can focus on one dimension at a time to ensure you receive the most thorough support. If you have any questions or feel the need for additional support, you can request a one-on-one check-in with one of our Affiliate therapists or counselors. Please note that upgrading to the next package may be required for additional services" 
"Now that we have a clearer picture of your needs, I am excited to guide you through the Wellbeing Museum. Here, you will find workshops and resources, carefully designed by our Affiliates therapists and counselors, to support you across the eight dimensions of wellbeing. Feel free to explore each dimensions content at your own pace and discover what speaks to you according to your intake form recommendation.",
"You can focus on one dimension at a time. engaging in exercises and answer a couple of questions to help me provide you with more insights and feedback through our reporting. A graphical representation on your journey that you can view or download after your experience. If at any point you need more guidance. simply press the More Support button to request one on one or group support with one of our affiliate therapists or counselors. We  can also help you locate other services nearby that suit your needs and preferences. Some of our services may require an upgrade to the next package for additional services."
];

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

// Animation des morph targets
ScriptEnviro.prototype.animateMorphTargets = function(text) {
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
      //  console.log('Final morph target counts:', this.morphTargetCounts);
    }.bind(this), delay * text.length);
};

// Animation des clignements des yeux
ScriptEnviro.prototype.startEyeBlinking = function() {
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
//    console.log('Synthèse vocale supportée.');
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
function lireTexte(texte, voiceIndex = 89, volume = 1, rate = 0.9) {
    const synthese = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(texte);

    // Écouter l'événement d'achèvement de la synthèse vocale
    utterance.onend = function() {
        // Arrêter les animations si nécessaire
       // console.log('Synthèse vocale terminée.');
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
