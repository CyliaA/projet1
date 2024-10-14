var Gestionclick8 = pc.createScript('gestionclick8');

// Initialize code called once per entity
Gestionclick8.prototype.initialize = function() {
    var app = this.app;

    // Get the PlayButton entity
    this.buttonEntity = app.root.findByName('Start8'); // Change 'Start8' to the name of your button entity
     this.experience = app.root.findByName('Screenexp1');
    
    // Hide the button initially
    if (this.buttonEntity) {
        this.buttonEntity.enabled = true; // Show the button at the start
        this.buttonEntity.button.on('click', this.onButtonClick, this);
    } else {
        console.error('Button entity not found');
    }

    // Listen for the videoEnded8 event to show the next8 button
    app.on('videoEnded8', this.onVideoEnded, this);

    // Get the NextButton entity
    this.nextButtonEntity = app.root.findByName('Next8'); // Change 'next8' to the name of your next button entity

    // Hide the next button initially
    if (this.nextButtonEntity) {
        this.nextButtonEntity.enabled = false; // Hide the next button initially
    } else {
        console.error('Next button entity not found');
    }
};

Gestionclick8.prototype.onButtonClick = function() {
    console.log("Start8 button clicked");
    // Hide the button and play the video
    if (this.buttonEntity) {
        this.buttonEntity.enabled = false;
    }
    this.app.fire('playVideo8', { message: 'Playing video 8!' });
};

Gestionclick8.prototype.onVideoEnded = function() {
    console.log("Video8 ended event received");
    // Show the next button when the video ends
    if (this.nextButtonEntity) {
        this.nextButtonEntity.enabled = true;
         this.experience.enabled = true;
    }
};
