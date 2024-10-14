var IframePlane = pc.createScript('iframePlane');
IframePlane.attributes.add('iframeUrl', {type: 'string'});
IframePlane.attributes.add('pixelsPerUnit', {
    type: 'number', 
    default: 640, 
    description: 'Number of canvas pixels per unit of world space. The larger the number, the higher the resolution of the iframe.'
});


// initialize code called once per entity
IframePlane.prototype.initialize = function() {
    // WARNING: IframePlane does not work with touch events
    
    var element;
    
    if (this.iframeUrl) {
        element = document.createElement("iframe");
        element.src = this.iframeUrl;
        element.style.border = '0px';
    } else {
        element = null;
    }

    this._css3Plane = new pc.Css3Plane(element, this.entity, this.pixelsPerUnit);
    
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
    
    this.on('enable', function() {
        this._css3Plane.enable();
    }, this);
    
    this.on('disable', function() {
        this._css3Plane.disable();
    }, this);
};