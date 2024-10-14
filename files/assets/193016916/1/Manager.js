var Manager = pc.createScript('manager');

// initialize code called once per entity
Manager.prototype.initialize = function() {
    this._videoEntity1 = this.app.root.findByName('Video 1');
    this._videoEntity2 = this.app.root.findByName('Video 2');
};

// update code called every frame
Manager.prototype.update = function(dt) {
    if (this.app.keyboard.wasPressed(pc.KEY_1)) {
        const videoScript = this._videoEntity1.script.videoTexture;
        if (videoScript.video.paused) {
            videoScript.video.play();
        } else {
            videoScript.video.pause();
        }
    }

    if (this.app.keyboard.wasPressed(pc.KEY_2)) {
         const videoScript = this._videoEntity2.script.videoTexture;
        if (videoScript.video.paused) {
            videoScript.video.play();
        } else {
            videoScript.video.pause();
        }       
    }
};
