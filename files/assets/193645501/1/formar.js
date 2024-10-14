var FormAr = pc.createScript('formAr');

// Méthode d'initialisation
FormAr.prototype.initialize = function() {
    // Initialiser l'état du formulaire
    this._isArOn = false;

    // Enregistrer les écouteurs pour le mode AR
    this._registerListeners('on');
    this.on('destroy', this._onDestroy, this);



};

// Méthode appelée lorsque l'entité est détruite
FormAr.prototype._onDestroy = function() {
    this._registerListeners('off');
};

// Enregistrer ou désenregistrer les écouteurs d'événements
FormAr.prototype._registerListeners = function(onOrOff) {
    this.app[onOrOff]('ar:available', this._onArAvailable, this);
    this.app[onOrOff]('ar:onStart', this._onArStart, this);
    this.app[onOrOff]('ar:onEnd', this._onArEnd, this);
};

// Gestionnaire pour la disponibilité de l'AR
FormAr.prototype._onArAvailable = function(available) {
    if (available) {
        this._showForm();
    } else {
        this._hideForm();
    }
};

// Gestionnaire pour le démarrage de l'AR
FormAr.prototype._onArStart = function() {
    this._isArOn = true;
    this._showForm();
};

// Gestionnaire pour la fin de l'AR
FormAr.prototype._onArEnd = function() {
    this._isArOn = false;
    this._hideForm();
};

// Méthode pour afficher le formulaire HTML
FormAr.prototype._showForm = function() {
    var formElement = document.getElementsByTagName('html+css');
    if (formElement) {
        formElement.style.display = 'block'; // Affiche le formulaire
    }
};

// Méthode pour cacher le formulaire HTML
FormAr.prototype._hideForm = function() {
    var formElement = document.getElementsByTagName('html+css')
    if (formElement) {
        formElement.style.display = 'none'; // Cache le formulaire
    }
};
