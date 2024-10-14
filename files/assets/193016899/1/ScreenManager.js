var ScreenManager = pc.createScript('screenManager');

ScreenManager.attributes.add('screens', {
    type: 'entity',
    array: true,
    title: 'Screens'
});

// initialize code called once per entity
ScreenManager.prototype.initialize = function() {
    if (this.screens.length > 0) {
        this.showScreen(0); // Show the first screen by default
    }
};

// Function to show a specific screen and hide others
ScreenManager.prototype.showScreen = function(index) {
    for (var i = 0; i < this.screens.length; i++) {
        this.screens[i].enabled = (i === index);
    }
};
