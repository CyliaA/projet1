var ButtonHandler = pc.createScript('buttonHandler');

ButtonHandler.attributes.add('screenManager', { type: 'entity' });
ButtonHandler.attributes.add('screenIndex', { type: 'number', default: 0 });

// initialize code called once per entity
ButtonHandler.prototype.initialize = function() {
    this.entity.button.on('click', this.onClick, this);
};

// Called when the button is clicked
ButtonHandler.prototype.onClick = function() {
    var screenManagerEntity = this.screenManager;
    if (screenManagerEntity) {
        var screenManagerScript = screenManagerEntity.script.screenManager;
        if (screenManagerScript) {
            screenManagerScript.showScreen(this.screenIndex);
        }
    }
};
