var MorphAnimation = pc.createScript('morphAnimation');

// Add attributes for the avatar entity
MorphAnimation.attributes.add('avatarEntity', { type: 'entity' });

// Initialization
MorphAnimation.prototype.initialize = function() {
    this.avatar = this.avatarEntity.model;
    this.morphInstance = null;

    if (this.avatar) {
        var meshInstances = this.avatar.meshInstances;
        if (meshInstances.length > 0) {
            for (var i = 0; i < meshInstances.length; i++) {
                var morphInstance = meshInstances[i].morphInstance;
                if (morphInstance) {
                    this.morphInstance = morphInstance;

                    // Map morph target names to indices
                    this.morphTargetIndices = {};
                    var morphTargets = morphInstance.morph._targets;
                    for (var j = 0; j < morphTargets.length; j++) {
                        this.morphTargetIndices[morphTargets[j].name] = j;
                    }
                    break;
                }
            }
        }
    }

    if (!this.morphInstance) {
        console.error('Morph instance not found');
        return;
    }
};

// Animate morph targets
MorphAnimation.prototype.animateMorphTargets = function(text) {
    var morphInstance = this.morphInstance;
    var morphTargetIndices = this.morphTargetIndices;

    var phonemeToMorphTarget = {
        'h': 'mouthOpen',
        'e': 'viseme_E',
        'l': 'viseme_I',
        'o': 'viseme_O',
        'i': 'viseme_I',
        'a': 'viseme_aa',
        'm': 'mouthClosed',
        'y': 'mouthSmile',
        'r': 'viseme_RR',
        't': 'viseme_TH',
        'u': 'viseme_U',
        's': 'viseme_SS',
        'n': 'viseme_nn',
        'd': 'viseme_DD',
        'p': 'viseme_PP',
        'k': 'viseme_kk'
    };

    var delay = 200; // Delay between phonemes in ms
    var currentIndex = 0;

    for (var i = 0; i < text.length; i++) {
        (function(i) {
            setTimeout(function() {
                var char = text[i];
                var targetName = phonemeToMorphTarget[char];
                if (targetName) {
                    var index = morphTargetIndices[targetName];
                    if (index !== undefined) {
                        morphInstance.setWeight(index, 0.8);
                        setTimeout(function() {
                            morphInstance.setWeight(index, 0);
                        }, delay);
                    }
                }
            }, delay * currentIndex);
            currentIndex++;
        })(i);
    }
};
