var YoutubeExternalControls = pc.createScript('youtubeExternalControls');
YoutubeExternalControls.attributes.add('youTubePlane', {type: 'entity'});

YoutubeExternalControls.attributes.add('playPauseButton', {type: 'entity'});
YoutubeExternalControls.attributes.add('stopButton', {type: 'entity'});
YoutubeExternalControls.attributes.add('seekForwardButton', {type: 'entity'});
YoutubeExternalControls.attributes.add('seekBackButton', {type: 'entity'});

YoutubeExternalControls.attributes.add('pauseIconAsset', {type: 'asset', assetType: 'texture'});
YoutubeExternalControls.attributes.add('playIconAsset', {type: 'asset', assetType: 'texture'});

YoutubeExternalControls.attributes.add('seekAmountSecs', {type: 'number'});


// initialize code called once per entity
YoutubeExternalControls.prototype.initialize = function() {
    this.youTubePlane.on('youtubeready', this._onYouTubePlaneReady, this);
    
    this.on('destroy', function() {
         this.youTubePlane.off('youtubeready', this._onYouTubePlaneReady, this);
    }, this);

    this.playPauseButton.button.on('click', function () {
        // If playing or buffering
        if (this._player.getPlayerState() === 1 || this._player.getPlayerState() === 3) {
            this._player.pauseVideo();
        } else {
            this._player.playVideo();
        }
    }, this);

    this.stopButton.button.on('click', function () {
        this._player.stopVideo();
    }, this);

    this.seekForwardButton.button.on('click', function () {
        var time = this._player.getCurrentTime();
        time += this.seekAmountSecs;
        
        this._player.seekTo(time);
    }, this);

    this.seekBackButton.button.on('click', function () {
        var time = this._player.getCurrentTime();
        time -= this.seekAmountSecs;
        
        this._player.seekTo(time);
    }, this);
    
    this._setButtonState(false);
    
    this._playPauseButtonIcon = this.playPauseButton.findByName('Icon').element;
};


YoutubeExternalControls.prototype.update = function (dt) {
    if (this._player) {
        // If playing or buffering
        if (this._player.getPlayerState() === 1 || this._player.getPlayerState() === 3) {
            this._playPauseButtonIcon.texture = this.pauseIconAsset.resource;
        } else {
            this._playPauseButtonIcon.texture = this.playIconAsset.resource;
        }
    }
};


YoutubeExternalControls.prototype._onYouTubePlaneReady = function(player) {
    this._player = player;
    this._setButtonState(true);
};


YoutubeExternalControls.prototype._setButtonState = function (state) {
    this.playPauseButton.button.active = state;
    this.stopButton.button.active = state;
    this.seekForwardButton.button.active = state;
    this.seekBackButton.button.active = state;
};

// swap method called for script hot-reloading
// inherit your script state here
// YoutubeExternalControls.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/