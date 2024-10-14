var YesNo = pc.createScript('yesNo');

YesNo.attributes.add('css', { type: 'asset', assetType: 'css', title: 'CSS Asset' });
YesNo.attributes.add('html', { type: 'asset', assetType: 'html', title: 'HTML Asset' });

YesNo.prototype.initialize = function () {
    // Créer et appliquer le style CSS
    var style = document.createElement('style');
    document.head.appendChild(style);
    style.innerHTML = this.css.resource || '';

    // Ajouter le HTML
    this.div = document.createElement('div');
    this.div.classList.add('cont1');
    this.div.innerHTML = this.html.resource || '';
    document.body.appendChild(this.div);

    // Initialiser les boutons Yes/No
    this.YesNo();
};

YesNo.prototype.YesNo = function () {
    let voices = [];

    // Vérifier si la synthèse vocale est supportée
    if ('speechSynthesis' in window) {
        console.log('Synthèse vocale supportée.');
    } else {
        console.log('Synthèse vocale non supportée.');
    }

    // Fonction pour lire le texte avec la synthèse vocale
    function lireTexte(texte, voiceIndex = 89, volume = 1, rate = 0.9) {
        const synthese = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(texte);

        if (voices.length > 0) {
            utterance.voice = voices[voiceIndex];
        }

        utterance.volume = volume;
        utterance.rate = rate;

        synthese.speak(utterance);
    }

 document.getElementById('assistance-button-yes').addEventListener('click', function () {
   // lireTexte("Thank you for your confirmation.", 89);
    console.log('Assistance confirmed.');
    document.querySelector('.element').style.display = 'none';

    // Déclenchement de l'événement d'assistance confirmée
    document.dispatchEvent(new Event('assistance-confirmed'));
});

document.getElementById('assistance-button-no').addEventListener('click', function () {
    window.speechSynthesis.cancel();
    console.log('Assistance declined.');
    document.querySelector('.element').style.display = 'none';

    // Déclenchement de l'événement d'assistance refusée
    document.dispatchEvent(new Event('assistance-declined'));
});

};
