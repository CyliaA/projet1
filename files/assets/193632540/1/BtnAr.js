var BtnAr = pc.createScript('btnAr');

/** Attributes */

/** Lifecycle Methods */

/**
 * Initialize - setup internal state, resources, listeners.
 */
BtnAr.prototype.initialize = function() {
    this._registerListeners('on');
    this.on('destroy', this._onDestroy, this);

      this.html = this.app.root.findByName('html+css');
};

/**
 * Destroy - clean up resources, listeners.
 */
BtnAr.prototype._onDestroy = function() {
    this._registerListeners('off');
};

/** Event Handlers */

/**
 * Register this script's listeners which need to be cleared on entity destruction.
 *
 * @param {string} onOrOff - "on" for attaching the listeners; use "off" for detaching.
 */
BtnAr.prototype._registerListeners = function(onOrOff) {
    this.entity.button[onOrOff]('click', this._onClick, this);

    this.app[onOrOff]('ar:available', this._onArAvailable, this);
    this.app[onOrOff]('ar:onStart', this._onArStart, this);
    this.app[onOrOff]('ar:onEnd', this._onArEnd, this);
};

BtnAr.prototype._onClick = function() {
    if (!this._isArOn) {
        this.app.fire('ar:request:start');
    } else {
        this.app.fire('ar:request:end');
    }
};

BtnAr.prototype._onArAvailable = function(available) {
    this.entity.enabled = available;
};

BtnAr.prototype._onArStart = function() {
    this._isArOn = true;
    // Activer l'entité contenant le formulaire HTML
   // this.html.enabled = true;
  // Forcer la visibilité du formulaire HTML
   // var formElement = document.getElementsByTagName('html+css');
    //if (formElement) {
  //      formElement.style.display = 'block';
  //  }
};

BtnAr.prototype._onArEnd = function() {
    this._isArOn = false;

    // Optionnel: cacher le formulaire HTML lorsque l'AR se termine
//    var formElement = document.getElementsByTagName('html+css');
 //   if (formElement) {
  //      formElement.style.display = 'none';
   // }
};