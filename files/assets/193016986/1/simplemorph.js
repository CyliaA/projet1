var SimpleMorph = pc.createScript('simpleMorph');

SimpleMorph.attributes.add('morphTargets', {
    type: 'json',
    array: true,
    schema: [{
        name: 'name',
        type: 'string',
        title: 'Morph Target Name'
    }, {
        name: 'weight',
        type: 'number',
        title: 'Morph Target Weight'
    }]
});

// Initialize the script
SimpleMorph.prototype.initialize = function() {
    console.log("Initializing script...");

    // Ensure the entity has a model component
    if (this.entity.model) {
        var meshInstances = this.entity.model.meshInstances;
        if (meshInstances.length > 0) {
            for (var i = 0; i < meshInstances.length; i++) {
                var morphInstance = meshInstances[i].morphInstance;
                if (morphInstance) {
                    this.morphInstance = morphInstance;
                    console.log("Morph instance found in mesh instance " + i + ". Script initialized.");

                    // Map morph target names to indices
                    this.morphTargetIndices = {};
                    var morphTargets = morphInstance.morph._targets;
                    for (var j = 0; j < morphTargets.length; j++) {
                        this.morphTargetIndices[morphTargets[j].name] = j;
                    }

                    break;
                }
            }
        } else {
            console.error("No mesh instances found in the model.");
        }

        if (!this.morphInstance) {
            console.error("No morph instance found in any mesh instance.");
        }
    } else {
        console.error("Entity does not have a model component");
    }
};

// Update the script every frame
SimpleMorph.prototype.update = function(dt) {
    console.log("Updating script...");

    // Ensure morphInstance is defined
    if (!this.morphInstance) {
        console.log("Morph instance not found.");
        return;
    }

    // Update weights for all morph targets
    for (var i = 0; i < this.morphTargets.length; i++) {
        var target = this.morphTargets[i];
        var index = this.morphTargetIndices[target.name];

        if (index !== undefined) {
            // Increase the weight when pressing the space bar
            if (this.app.keyboard.isPressed(pc.KEY_SPACE)) {
                target.weight = Math.min(target.weight + dt, 1);  // Ensure weight doesn't exceed 1
            } else {
                target.weight = Math.max(target.weight - dt, 0);  // Decrease weight when not pressing
            }

            // Set the morph target weight
            this.morphInstance.setWeight(index, target.weight);

            // Log the current weight for debugging purposes
            console.log("Current weight for morph target '" + target.name + "': " + target.weight);
        } else {
            console.error("Morph target '" + target.name + "' not found.");
        }
    }
};





