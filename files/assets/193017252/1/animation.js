var Animation = pc.createScript('animation');


function loadStateGraph(callback) {
    var animStateGraph = {
        "layers": [
            {
                "name": "locomotion",
                "states": [
                    {
                        "name": "START"
                    },
                    {
                        "name": "Idle",
                        "speed": 1.0
                    },
                    {
                        "name": "Walking",
                        "speed": 1.0
                    },
                    {
                        "name": "Greet",
                        "speed": 1.35
                    },
                    {
                        "name": "Sitting",
                        "speed": 1.0
                    },
                    {
                        "name": "END"
                    }
                ],
                "transitions": [
                    {
                        "from": "START",
                        "to": "Idle",
                        "time": 0,
                        "priority": 0
                    },
                    {
                        "from": "Idle",
                        "to": "Walking",
                        "time": 0.1,
                        "priority": 0,
                        "conditions": [
                            {
                                "parameterName": "speed",
                                "predicate": "GREATER_THAN",
                                "value": 0
                            }
                        ]
                    },
                    {
                        "from": "Idle",
                        "to": "Greet",
                        "time": 0.1,
                        "priority": 0,
                        "transitionOffset": 0.0,
                        "conditions": [
                            {
                                "parameterName": "jump",
                                "predicate": "EQUAL_TO",
                                "value": true
                            }
                        ]
                    },
                    {
                        "from": "Greet",
                        "to": "Walking",
                        "time": 0.1,
                        "priority": 0,
                        "conditions": [
                            {
                                "parameterName": "jump",
                                "predicate": "EQUAL_TO",
                                "value": true
                            }
                        ]
                    },
                    {
                        "from": "Sitting",
                        "to": "Idle",
                        "priority": 0,
                        "exitTime": 0.75
                    },
                    {
                        "from": "Greet",
                        "to": "Idle",
                        "time": 0.1,
                        "priority": 0,
                        "conditions": [
                            {
                                "parameterName": "speed",
                                "predicate": "LESS_THAN_EQUAL_TO",
                                "value": 0
                            }
                        ]
                    },
                    {
                        "from": "Walking",
                        "to": "Idle",
                        "time": 0.1,
                        "priority": 0,
                        "conditions": [
                            {
                                "parameterName": "speed",
                                "predicate": "GREATER_THAN",
                                "value": 1
                            }
                        ]
                    },
              
                ]
            }
        ],
        "parameters": {
            "speed": {
                "name": "speed",
                "type": "INTEGER",
                "value": 0
            },
            "Sitting": {
                "name": "jump",
                "type": "TRIGGER",
                "value": false
            }
        }
    };


    var stateGraphAsset = new pc.Asset('stateGraphModel', 'animstategraph', null, animStateGraph);
    stateGraphAsset.once('load', function (loadedAsset) {
        this.stateGraph = loadedAsset.resource;
        callback();
    }.bind(this));
    pc.app.assets.add(stateGraphAsset);
    pc.app.assets.load(stateGraphAsset);
}

function addAnimComponent() {

    var modelEntity = this.entity;

    modelEntity.addComponent('anim', {
        activate: true,
    });
    modelEntity.anim.loadStateGraph(this.stateGraph);
    var locomotionLayer = modelEntity.anim.findAnimationLayer('locomotion');
    locomotionLayer.assignAnimation('Idle', pc.app.assets.find('Idle').resource);
    locomotionLayer.assignAnimation('Greet', pc.app.assets.find('Greet').resource);
    locomotionLayer.assignAnimation('Walking', pc.app.assets.find('Walking').resource);
    locomotionLayer.assignAnimation('Sitting', pc.app.assets.find('Sitting').resource);

    modelEntity.enabled = true;
}

// initialize code called once per entity
Animation.prototype.initialize = function() {
    loadStateGraph.bind(this)(
        addAnimComponent.bind(this)
    );
};

// update code called every frame
Animation.prototype.update = function(dt) {
};

// swap method called for script hot-reloading
// inherit your script state here
// Animation.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/