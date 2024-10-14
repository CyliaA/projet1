// Créer un nouveau script appelé 'SpeechSynthesisButton'
var SpeechSynthesisButton = pc.createScript('speech');

// Initialiser le script
SpeechSynthesisButton.prototype.initialize = function() {
    // Vérifier si la synthèse vocale est supportée
    if ('speechSynthesis' in window) {
        console.log('Synthèse vocale supportée.');
        this.loadVoices(); // Charger les voix disponibles
    } else {
        console.log('Synthèse vocale non supportée dans ce navigateur.');
    }

    // Ajouter un événement de clic au bouton existant
    var button = document.getElementById('myButtonId'); // Remplacez 'myButtonId' par l'ID de votre bouton
    console.log('Bouton trouvé:', button); // Vérifiez si le bouton est trouvé

    if (button) {
        button.addEventListener('click', () => {
            this.speak("Bonjour! Bienvenue dans la synthèse vocale dans PlayCanvas.");
        });
    } else {
        console.error('Bouton non trouvé ! Assurez-vous que l\'ID est correct.');
    }
};

// Fonction pour obtenir les voix disponibles
SpeechSynthesisButton.prototype.loadVoices = function() {
    return new Promise((resolve) => {
        const id = setInterval(() => {
            this.voices = window.speechSynthesis.getVoices();
            if (this.voices.length > 0) {
                clearInterval(id);
                resolve();
            }
        }, 10);
    });
};

// Fonction pour lire un texte
SpeechSynthesisButton.prototype.speak = function(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Optionnel : choisir une voix spécifique
    const selectedVoice = this.voices.find(voice => voice.name === 'Google UK English Male'); // Changez le nom de la voix selon vos préférences
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    // Optionnel : définir d'autres paramètres
    utterance.pitch = 1; // Tonalité (0 à 2)
    utterance.rate = 1;  // Vitesse de lecture (0.1 à 10)

    // Lire le texte
    window.speechSynthesis.speak(utterance);
};

// Optionnel : Ajoutez un script pour gérer la mise à jour si nécessaire
SpeechSynthesisButton.prototype.update = function(dt) {
    // Vous pouvez ajouter une logique ici si nécessaire
};
