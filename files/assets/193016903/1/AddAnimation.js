var AddAnimations = pc.createScript('addAnimations');
AddAnimations.attributes.add('animationAssets', { 
    type: 'json', 
    array: true, 
    title: 'Animation Assets',
    schema: [{
        name: 'stateName',
        title: 'State Name',
        type: 'string',
    }, {
        name: 'asset',
        title: 'Aseet',
        type: 'asset',
        assetType: 'animation'
    }]
});


// initialize code called once per entity
AddAnimations.prototype.initialize = function() {
    // We can add animations to the component without needing to create a state graph
    // as assignAnimation will create state if one doesn't exist
    
    // We can then later call https://developer.playcanvas.com/en/api/pc.AnimComponentLayer.html#transition
    // to play the state with that animation
    
    // To mimic the older Animation component, the state name will be the name of the asset
    for (var i = 0; i < this.animationAssets.length; ++i) {
        var animationAsset = this.animationAssets[i];
        this.entity.anim.assignAnimation(animationAsset.stateName, animationAsset.asset.resource);
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// AddAnimations.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/