var GestionButton = pc.createScript('gestionClick');

// initialize code called once per entity
GestionButton.prototype.initialize = function() {
    var app = this.app;
    
    // Get the PlayButton entity
    this.buttonEntity = app.root.findByName('StartIntroduction'); // Change 'PlayButton' to the name of your button entity
    

    // Hide the button initially
    if (this.buttonEntity) {
        this.buttonEntity.enabled = true; // Show the button at the start
        this.buttonEntity.button.on('click', this.onButtonClick, this);
    } else {
        console.error('Button entity not found');
    }

  
};

GestionButton.prototype.onButtonClick = function() {
    // Hide the button and play the video
    if (this.buttonEntity) {
        this.buttonEntity.enabled = false;
    }
    this.app.fire('playVideo');
};
