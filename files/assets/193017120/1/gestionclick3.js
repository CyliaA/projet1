var Gestionclick3 = pc.createScript('gestionclick3');

// Initialize code called once per entity
Gestionclick3.prototype.initialize = function() {
    var app = this.app;

    // Get the PlayButton entity
    this.buttonEntity = app.root.findByName('Start3'); // Change 'Start3' to the name of your button entity

    this.experience = app.root.findByName('Screenexp1');
    
    // Hide the button initially
    if (this.buttonEntity) {
        this.buttonEntity.enabled = true; // Show the button at the start
        this.buttonEntity.button.on('click', this.onButtonClick, this);
    } else {
        console.error('Button entity not found');
    }

    // Listen for the videoEnded3 event to show the next1 button
    app.on('videoEnded3', this.onVideoEnded, this);

    // Get the NextButton entity
    this.nextButtonEntity = app.root.findByName('Next3'); // Change 'next1' to the name of your next button entity

    // Hide the next button initially
    if (this.nextButtonEntity) {
        this.nextButtonEntity.enabled = false; // Hide the next button initially
    } else {
        console.error('Next button entity not found');
    }
};

Gestionclick3.prototype.onButtonClick = function() {
    // Hide the button and play the video
    if (this.buttonEntity) {
        this.buttonEntity.enabled = false;
    }
    this.app.fire('playVideo3', { message: 'Playing video 3!' });
     
};

Gestionclick3.prototype.onVideoEnded = function() {
    // Show the next button when the video ends
    if (this.nextButtonEntity) {
        this.nextButtonEntity.enabled = true;
        this.experience.enabled = true;
    }
 
};
