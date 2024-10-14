var Active = pc.createScript('active');

// Add attribute to reference the entity to be disabled
Active.attributes.add('targetEntity', {
    type: 'entity',
    title: 'Target Entity',
    description: 'The entity to disable when the button is clicked'
});

// initialize code called once per entity
Active.prototype.initialize = function() {
    this.entity.button.on('click', this.onClick, this);
};

Active.prototype.onClick = function() {
    if (this.targetEntity) {
        this.targetEntity.enabled = true;
    }
};
