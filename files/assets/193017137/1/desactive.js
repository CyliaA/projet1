var Desactive = pc.createScript('desactive');

// Add attribute to reference the entity to be disabled
Desactive.attributes.add('targetEntity', {
    type: 'entity',
    title: 'Target Entity',
    description: 'The entity to disable when the button is clicked'
});

// initialize code called once per entity
Desactive.prototype.initialize = function() {
    this.entity.button.on('click', this.onClick, this);
};

Desactive.prototype.onClick = function() {
    if (this.targetEntity) {
        this.targetEntity.enabled = false;
    }
};
