var GestionButton = pc.createScript('gestionButton');

// initialize code called once per entity
GestionButton.prototype.initialize = function() {
    var app = this.app;
    
    // Get the PlayButton entity
    this.buttonEntity = app.root.findByName('StartIntroduction'); // Change 'PlayButton' to the name of your button entity
    this.buttonEntity1 = app.root.findByName('ExploreDimensions');

    // Hide the button initially
    if (this.buttonEntity) {
        this.buttonEntity.enabled = true; // Show the button at the start
        this.buttonEntity.button.on('click', this.onButtonClick, this);
    } else {
        console.error('Button entity not found');
    }

    // Listen for video ended event to show the button again
    app.on('videoEnded', function() {
        if (this.buttonEntity) {
            this.buttonEntity1.enabled = true;
        }
    }, this);
};

GestionButton.prototype.onButtonClick = function() {
    // Hide the button and play the video
    if (this.buttonEntity) {
        this.buttonEntity.enabled = false;
    }
    this.app.fire('playVideo');
};
