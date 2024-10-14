var Init = pc.createScript('init');

// initialize code called once per entity
Init.prototype.initialize = function () {
    const element = this.entity;

    // Liste des sons à jouer
    this.sounds = ['Son1.mp3', 'Son2.mp3', 'Son3.mp3']; // Ajoute autant de sons que tu veux
    this.currentSoundIndex = 0;  // Index pour suivre la musique actuelle

    // Ajouter le premier slot sonore
    this.addSoundSlot(this.sounds[this.currentSoundIndex]);

    // Récupérer l'entité du bouton dans PlayCanvas
    const buttonEntity = this.app.root.findByName('Music'); // Change 'changeSoundButton' par le nom de ton entité bouton

    if (buttonEntity) {
        // Gestionnaire de clic pour changer de musique
        buttonEntity.element.on('click', this.changeMusic, this);
    } else {
        console.warn("Entité avec le nom 'changeSoundButton' non trouvée.");
    }
};

// Fonction pour ajouter un slot sonore et jouer le son
Init.prototype.addSoundSlot = function (soundName) {
    const element = this.entity;
    const asset = this.app.assets.find(soundName, 'audio');

    if (asset) {
        const slotName = 'musicSlot';

        // Supprimer l'ancien slot s'il existe
        if (element.sound.slot(slotName)) {
            element.sound.removeSlot(slotName);
        }

        // Ajouter le nouveau slot sonore
        element.sound.addSlot(slotName, {
            asset: asset,
            autoPlay: true,
            loop: true,
            overlap: true
        });

        element.sound.play(slotName);
    } else {
        console.warn(`Asset avec le nom '${soundName}' non trouvé.`);
    }
};

// Fonction pour changer la musique
Init.prototype.changeMusic = function () {
    // Incrémenter l'index pour passer à la musique suivante
    this.currentSoundIndex = (this.currentSoundIndex + 1) % this.sounds.length;

    // Ajouter et jouer le son correspondant
    this.addSoundSlot(this.sounds[this.currentSoundIndex]);
};

// update code called every frame
Init.prototype.update = function (dt) {
    // Aucune mise à jour nécessaire dans l'implémentation actuelle
};

// swap method called for script hot-reloading
// inherit your script state here
// Init.prototype.swap = function(old) { };

// to learn plus sur l'anatomie des scripts, lis:
// https://developer.playcanvas.com/en/user-manual/scripting/
