var YoutubePlane = pc.createScript('youtubePlane');
YoutubePlane.attributes.add('videoId', {type: 'string'});
YoutubePlane.attributes.add('pixelsPerUnit', {
    type: 'number', 
    default: 640, 
    description: 'Number of canvas pixels per unit of world space. The larger the number, the higher the resolution of the iframe.'
});

// YouTube API reference can be found here: https://developers.google.com/youtube/iframe_api_referenc

window.youTubeReady = false;
function onYouTubeIframeAPIReady() {
    window.youTubeReady = true;
}

if (window.document) {
    // Load the YouTube API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// initialize code called once per entity
YoutubePlane.prototype.initialize = function() {    
    this._createdPlane = false;
};


YoutubePlane.prototype.update = function (dt) {
    if (window.YT && window.YT.loaded && !this._createdPlane) {
        this.onYoutubeApiReady();
        this._createdPlane = true;
    }
};


YoutubePlane.prototype.onYoutubeApiReady = function () {    
    var self = this;
    
    var element = null;
    var youTubeWrapper = document.createElement('div');
    youTubeWrapper.id = this.entity.getGuid();
    youTubeWrapper.style.border = '0px';
    
    if (this.videoId) {
        element = document.createElement('div');    
        element.style.border = '0px';
        
        element.appendChild(youTubeWrapper);
    } 
    
    this._css3Plane = new pc.Css3Plane(element, this.entity, this.pixelsPerUnit);

    if (this.videoId) {
        this._player = new YT.Player(this.entity.getGuid(), {
            height: '100%',
            width: '100%',
            events: {
                'onReady': function() {
                    self.entity.fire('youtubeready', self._player);
                 }
            }
        });
        
        // Workaround to get iOS to play videos inline and Android to play videos unmuted
        var iframe = document.getElementById(self.entity.getGuid());
        iframe.src = 'https://www.youtube.com/embed/' + this.videoId + '?enablejsapi=1&controls=0&playsinline=1&origin=' + encodeURI(window.location.origin);
    }

    var material = new pc.StandardMaterial();
    material.depthWrite = true;
    material.redWrite = false;
    material.greenWrite = false;
    material.blueWrite = false;
    material.alphaWrite = false;
    material.blendType = pc.BLEND_NONE;
    material.opacity = 0;
    material.update();

    this.entity.render.material = material;

    this.on('destroy', function() {
        this._css3Plane.disable();
    }, this);
    
    this.on('enable', function() {
        this._css3Plane.enable();
    }, this);
    
    this.on('disable', function() {
        this._css3Plane.disable();
    }, this);
};