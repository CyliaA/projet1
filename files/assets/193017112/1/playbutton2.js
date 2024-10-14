// Exemple de script pour déclencher la deuxième vidéo
var PlayButton2 = pc.createScript('playButton2');

// Initialize code called once per entity
PlayButton2.prototype.initialize = function() {
    var self = this;
    this.entity.element.on('click', function() {
        self.app.fire('playVideo'); // Joue la deuxième vidéo
    });
};
