var SpeechContent = pc.createScript('speechContent');

// Ajout des attributs pour les autres scripts
SpeechContent.attributes.add('morphAnimation', { type: 'script' }); // Référence au script d'animation
SpeechContent.attributes.add('voiceSynthesis', { type: 'script' }); // Référence au script de synthèse vocale
SpeechContent.attributes.add('buttonEntity', { type: 'entity' }); // Référence à l'entité du bouton

// Initialisation
SpeechContent.prototype.initialize = function() {
    if (this.buttonEntity) {
        var startButton = this.buttonEntity.element;

        if (startButton) {
            startButton.on('click', () => {
                this.presentWellBeingDimensions();
            });
        } else {
            console.error('L\'entité du bouton n\'a pas de composant élément.');
        }
    } else {
        console.error('buttonEntity n\'est pas défini. Assurez-vous de l\'avoir attribué dans l\'éditeur.');
    }
};

// Présentation des 8 dimensions du bien-être
SpeechContent.prototype.presentWellBeingDimensions = function() {
    var dimensions = [
        "Hello and welcome to this immersive 3D environment. I am your virtual guide, and today we will explore the 8 dimensions of well-being.",
        "Let's start with the first dimension: physical well-being. This involves maintaining a healthy body through exercise, a balanced diet, and proper care.",
        "The second dimension is emotional well-being. This includes understanding and managing your emotions, as well as developing a positive attitude.",
        "The third dimension is intellectual well-being. It’s about stimulating your mind through learning, problem-solving, and creativity.",
        "The fourth dimension is social well-being. This involves creating and maintaining healthy and enriching relationships with others.",
        "The fifth dimension is spiritual well-being. This concerns the search for meaning and purpose in life, and can include meditation, prayer, or other spiritual practices.",
        "The sixth dimension is environmental well-being. This means living in harmony with our environment and taking care of the planet.",
        "The seventh dimension is occupational well-being. This includes job satisfaction, stress management, and work-life balance.",
        "Finally, the eighth dimension is financial well-being. It involves managing your finances effectively to reduce stress and ensure long-term financial security.",
        "Thank you for joining me in this presentation of the 8 dimensions of well-being. Explore our environment to learn more about each of them."
    ];

    var currentIndex = 0;
    var delay = 7000; // 7 secondes entre les messages

    var speakNext = () => {
        if (currentIndex < dimensions.length) {
            this.voiceSynthesis.readText(dimensions[currentIndex]);
            this.morphAnimation.animateMorphTargets(dimensions[currentIndex]);
            currentIndex++;
            setTimeout(speakNext, delay);
        }
    };

    speakNext();
};
