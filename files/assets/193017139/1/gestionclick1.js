var Gestionclick1 = pc.createScript('gestionclick1');

// Initialize code called once per entity
Gestionclick1.prototype.initialize = function() {
    var app = this.app;

    // Get the PlayButton entity
    this.buttonEntity = app.root.findByName('Start1'); // Change 'Start1' to the name of your button entity
    
    // Hide the button initially
    if (this.buttonEntity) {
        this.buttonEntity.enabled = true; // Show the button at the start
        this.buttonEntity.button.on('click', this.onButtonClick, this);
    } else {
        console.error('Button entity not found');
    }

    // Listen for the videoEnded1 event to show the next1 button
    app.on('videoEnded1', this.onVideoEnded, this);

    // Get the NextButton entity
    this.nextButtonEntity = app.root.findByName('Next1'); // Change 'next1' to the name of your next button entity

    // Hide the next button initially
    if (this.nextButtonEntity) {
        this.nextButtonEntity.enabled = false; // Hide the next button initially
    } else {
        console.error('Next button entity not found');
    }
};

Gestionclick1.prototype.onButtonClick = function() {
    console.log("Start1 button clicked");
    // Hide the button and play the video
    if (this.buttonEntity) {
        this.buttonEntity.enabled = false;
    }
    this.app.fire('playVideo1', { message: 'Playing video 1!' });
};

Gestionclick1.prototype.onVideoEnded = function() {
    console.log("Video ended event received");
    // Show the next button when the video ends
    if (this.nextButtonEntity) {
        this.nextButtonEntity.enabled = true;
    }
};
