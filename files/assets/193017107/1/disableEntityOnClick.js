var DisableEntityOnClick = pc.createScript('disableEntityOnClick');

// Add attribute to reference the entity to be disabled
DisableEntityOnClick.attributes.add('targetEntity', {
    type: 'entity',
    title: 'Target Entity',
    description: 'The entity to disable when the button is clicked'
});

// initialize code called once per entity
DisableEntityOnClick.prototype.initialize = function() {
    this.entity.button.on('click', this.onClick, this);
};

DisableEntityOnClick.prototype.onClick = function() {
    if (this.targetEntity) {
        this.targetEntity.enabled = false;
    }
};
