var VideoTexture1 = pc.createScript('videoTexture1');

VideoTexture1.attributes.add('videoAsset', {
    title: 'Video Asset',
    description: 'MP4 video asset to play back on this video texture.',
    type: 'asset'
});

VideoTexture1.attributes.add('videoUrl', {
    title: 'Video Url',
    description: 'URL to use if there is no video asset selected',
    type: 'string'
});

VideoTexture1.attributes.add('playEvent', {
    title: 'Play Event',
    description: 'Event that is fired as soon as the video texture is ready to play.',
    type: 'string',
    default: ''
});

// Initialize code called once per entity
VideoTexture1.prototype.initialize = function() {
    var app = this.app;
    
    var video = document.createElement('video');
    video.loop = false;
    video.muted = false;
    video.playsInline = true;
    video.crossOrigin = "anonymous";
    video.autoplay = false;

    var style = video.style;
    style.width = '1px';
    style.height = '1px';
    style.position = 'absolute';
    style.opacity = '0';
    style.zIndex = '-1000';
    style.pointerEvents = 'none';
    document.body.appendChild(video);

    this.videoTexture = new pc.Texture(app.graphicsDevice, {
        format: pc.PIXELFORMAT_R8_G8_B8,
        minFilter: pc.FILTER_LINEAR_MIPMAP_LINEAR,
        magFilter: pc.FILTER_LINEAR,
        addressU: pc.ADDRESS_CLAMP_TO_EDGE,
        addressV: pc.ADDRESS_CLAMP_TO_EDGE,
        mipmaps: true
    });
    this.videoTexture.setSource(video);

    video.addEventListener('canplaythrough', function(e) {
        app.fire(this.playEvent, this.videoTexture);
    }.bind(this));

    video.src = this.videoAsset ? this.videoAsset.getFileUrl() : this.videoUrl;
    video.load();

    this.app.on('playVideo1', function(data) {
        console.log(data.message); // Affiche "Playing video 1!"
        video.play();
    });

    video.addEventListener('ended', function() {
        this.app.fire('videoEnded1');
    }.bind(this));

    this.on('destroy', function() {
        this.videoTexture.destroy();
        video.remove();
    }, this);
};

// Update code called every frame
VideoTexture1.prototype.update = function(dt) {
    this.videoTexture.upload();
};
