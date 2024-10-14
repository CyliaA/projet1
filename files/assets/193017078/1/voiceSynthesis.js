var VoiceSynthesis = pc.createScript('voiceSynthesis');

// Initialization
VoiceSynthesis.prototype.initialize = function() {
    this.voices = [];

    loadVoices().then(() => {
        console.log("Available voices:", this.voices);
    });
};

// Load available voices
function loadVoices() {
    return new Promise((resolve) => {
        const id = setInterval(() => {
            this.voices = window.speechSynthesis.getVoices();
            if (this.voices.length > 0) {
                clearInterval(id);
                resolve();
            }
        }, 10);
    });
}

// Read text with voice synthesis
VoiceSynthesis.prototype.readText = function(text, voiceIndex = 89, volume = 1, rate = 1) {
    const synthese = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    if (this.voices.length > 0) {
        if (voiceIndex >= 0 && voiceIndex < this.voices.length) {
            utterance.voice = this.voices[voiceIndex];
        } else {
            console.warn(`Voice index ${voiceIndex} is invalid. Using default voice.`);
            utterance.voice = this.voices[0];
        }
    }

    utterance.volume = volume;
    utterance.rate = rate;
    synthese.speak(utterance);
};
