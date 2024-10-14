var EnableEntityOnClick = pc.createScript('enabledEntity');

// Add attribute to reference the entity to be disabled
EnableEntityOnClick.attributes.add('targetEntity', {
    type: 'entity',
    title: 'Target Entity',
    description: 'The entity to disable when the button is clicked'
});

// initialize code called once per entity
EnableEntityOnClick.prototype.initialize = function() {
    this.entity.button.on('click', this.onClick, this);
};

EnableEntityOnClick.prototype.onClick = function() {
    if (this.targetEntity) {
        this.targetEntity.enabled = true;
    }
};
