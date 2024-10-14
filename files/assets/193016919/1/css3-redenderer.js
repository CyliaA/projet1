pc.extend(pc, function () {
    'use strict';

    var epsilon = function (value) {
        return Math.abs(value) < 1e-10 ?0 :value;
    };
    
    var app = pc.Application.getApplication();

    // the Y axis of html is the opposite of gl,so multiply by minus one
    var getCameraCSSMatrix = function (matrix) {
        var elements = matrix.data;

        return 'matrix3d(' +
            epsilon( elements[ 0 ] ) + ',' +
            epsilon( - elements[ 1 ] ) + ',' +
            epsilon( elements[ 2 ] ) + ',' +
            epsilon( elements[ 3 ] ) + ',' +
            epsilon( elements[ 4 ] ) + ',' +
            epsilon( - elements[ 5 ] ) + ',' +
            epsilon( elements[ 6 ] ) + ',' +
            epsilon( elements[ 7 ] ) + ',' +
            epsilon( elements[ 8 ] ) + ',' +
            epsilon( - elements[ 9 ] ) + ',' +
            epsilon( elements[ 10 ] ) + ',' +
            epsilon( elements[ 11 ] ) + ',' +
            epsilon( elements[ 12 ] ) + ',' +
            epsilon( - elements[ 13 ] ) + ',' +
            epsilon( elements[ 14 ] ) + ',' +
            epsilon( elements[ 15 ] ) +
            ')';
    };

    // scaleX and scaleY represent how many pixels of div equlas to one unit of model.
    var getObjectCSSMatrix = function(matrix,scaleX,scaleY) {        
        var elements = matrix.data;

        var matrix3d = 'matrix3d(' +
            epsilon( elements[ 0 ] / scaleX) + ',' +
            epsilon( elements[ 1 ] / scaleX) + ',' +
            epsilon( elements[ 2 ] / scaleX) + ',' +
            epsilon( elements[ 3 ] / scaleX) + ',' +
            epsilon( elements[ 8 ] / scaleY) + ',' +
            epsilon( elements[ 9 ] / scaleY) + ',' +
            epsilon( elements[ 10 ] / scaleY) + ',' +
            epsilon( elements[ 11 ] / scaleY) + ',' +
            epsilon( elements[ 4 ] ) + ',' +
            epsilon( elements[ 5 ] ) + ',' +
            epsilon( elements[ 6 ] ) + ',' +
            epsilon( elements[ 7 ] ) + ',' +
            epsilon( elements[ 12 ] ) + ',' +
            epsilon( elements[ 13 ] ) + ',' +
            epsilon( elements[ 14 ] ) + ',' +
            epsilon( elements[ 15 ] ) +
            ')';

        // Make sure the origin is in the center
        return 'translate(-50%,-50%)' + matrix3d;
    };

    var randomCssColor = function() {
        var r = Math.round(Math.random() * 255);
        var g = Math.round(Math.random() * 255);
        var b = Math.round(Math.random() * 255);

        return "rgb(" + r + "," + g + "," + b + ")";
    };

    // construct a css3 renderer
    var Css3Renderer = function() {
        // make sure we only have one css3 renderer
        if(app.css3Renderer)
            return app.css3Renderer;
        app.css3Renderer = this;

        // init data
        this._stageElement = null;
        this._cameras = [];
        this._cameraElements = [];
        this._defaultCameraElement = null;
        this._css3Targets = [];
        // cache
        this._cameraInvertMat = new pc.Mat4();
        this._cameraHalfSize = new pc.Vec2();

        // create a div to contain all elements
        var stageElement = document.createElement("div");
        stageElement.style.overflow = "hidden";
        stageElement.style.pointerEvents = 'auto';
        document.body.appendChild(stageElement);
        
        // have the touch device detect touches from the stage element instead
        var touchDevice = app.touch;
        if (touchDevice) {
            touchDevice.attach(stageElement);
        }
        
        if (app.elementInput) {
            app.elementInput.attach(stageElement);
        }

        // make sure the div created is behind the canvas since we want to show the div when canvas is transparent
        var canvas = document.getElementById("application-canvas");
        canvas.style.pointerEvents = "none";
        document.body.insertBefore(stageElement,canvas);

        this._stageElement = stageElement;

        // add default camera
        this._defaultCameraElement = this.addCamera(app.root.findComponent("camera"));

        var self = this;
        function onWindowResize(){
            self._width = window.innerWidth;
            self._height = window.innerHeight;
            self._widthHalf = self._width / 2;
            self._heightHalf = self._height / 2;
            self._stageElement.style.width = self._width + 'px';
            self._stageElement.style.height = self._height + 'px';
            for(var i = 0;i < self._cameraElements.length;i++) {
                self._cameraElements[i].style.width = self._width + 'px';
                self._cameraElements[i].style.height = self._height + 'px';
            }
        }
        onWindowResize();

        window.addEventListener("resize", onWindowResize, false);
    };

    Css3Renderer.prototype = {
        // start render every frame
        render: function () {
            if(this._isRendering)
                return;

            this._isRendering = true;
            app.on("update",this._renderElements,this);  
        },

        cancelRender: function() {
            app.off("update",this._renderElements,this);
            this._isRendering = false;

        },

        // add new camera
        addCamera: function (camera) {
            // make sure the camera we added is not duplicate
            if(!camera)
                return this._defaultCameraElement;
            if(this._cameras.indexOf(camera) > -1) {
                return this._cameraElements[this._cameras.indexOf(camera)];   
            }
            // create a div for this camera
            var cameraElement = document.createElement("div");
            cameraElement.style.WebkitTransformStyle = 'preserve-3d';
            cameraElement.style.transformStyle = 'preserve-3d';
            cameraElement.style.pointerEvents = 'none';
            // add to html
            this._stageElement.appendChild(cameraElement);
            // camera cache
            this._cameras.push(camera);
            this._cameraElements.push(cameraElement);

            return cameraElement;
        },

        // add new render element
        addTarget: function (target) {
            if(this._css3Targets.indexOf(target) <= -1) 
                this._css3Targets.push(target);
        },
        
        // remove render element
        removeTarget: function (target) {
            var index = this._css3Targets.indexOf(target);
            if(index !== -1) 
                this._css3Targets.splice(index, 1);
        },

        // set whether the div can be interacted
        blockEvents: function (state) {
            for(var i = 0;i < this._css3Targets.length;this._css3Targets[i++].blockEvents(state));
        },

        // render elements every frame
        _renderElements: function () {
            for(var i = 0;i < this._cameras.length;i++) {
                var tx,ty,cameraCSSMatrix,style;
                var camera = this._cameras[i];
                var cameraElement = this._cameraElements[i];
                var fov = camera.projectionMatrix.data[5] * this._heightHalf;

                // update stage div
                if(camera.projection == pc.PROJECTION_PERSPECTIVE) {
                    this._stageElement.style.WebkitPerspective = fov + 'px';
                    this._stageElement.style.perspective = fov + 'px';
                }
                else {
                    this._stageElement.style.WebkitPerspective = '';
                    this._stageElement.style.perspective = '';
                }

                // update camera
                if(camera.projection == pc.PROJECTION_ORTHOGRAPHIC) {
                    pc.Mat4._getPerspectiveHalfSize(this._cameraHalfSize, camera.fov, camera.aspectRatio, camera.nearClip, camera.horizontalFov);
                    tx = - (this._cameraHalfSize.x - this._cameraHalfSize.x) / 2;
                    ty = (this._cameraHalfSize.y - this._cameraHalfSize.y) / 2;
                }
                this._cameraInvertMat.copy(camera.entity.getWorldTransform()).invert();
                cameraCSSMatrix = camera.projection == pc.PROJECTION_ORTHOGRAPHIC ?'scale(' + fov + ')' + 'translate(' + epsilon(tx) + 'px,' + epsilon(ty) + 'px)' + getCameraCSSMatrix(this._cameraInvertMat) 
                :'translateZ(' + fov +'px)' + getCameraCSSMatrix(this._cameraInvertMat);
                style = cameraCSSMatrix + 'translate(' + this._widthHalf + 'px,' + this._heightHalf + 'px)';
                cameraElement.style.WebkitTransform = style;
                cameraElement.style.transform = style;
            }

            // update all div
            for(var j = 0;j < this._css3Targets.length;this._css3Targets[j++].updateTransform());
        }
    };

    /**
    * @class
    * @name pc.Css3Plane
    * @classdesc merge the div and entity together.
    * @description merge the div and entity together,update the domElement transform according to the entity every frame so they look the same to the viewer.
    * @param {object} dom - the dom element to show,create a new one if not exist.
    * @param {pc.Entity} entity - the entity to attach,create a new one if not exist.
    * @param {number} pixelsPerWorldUnit - represent how many pixels of div equlas to one unit of model.
    * @param {pc.CameraComponent} camera - the camera.
    */
    var Css3Plane = function (dom, entity, pixelsPerWorldUnit, camera) {        
        // create a css3 renderer if we don't have one
        if(!app.css3Renderer) {
            app.css3Renderer = new pc.Css3Renderer();
        }
        // set the renderer
        this._renderer = app.css3Renderer;

        // create a div if we don't have one
        if(!dom) {
            dom = document.createElement('div');
            dom.innerHTML = "CSS3 Plane"; 
            dom.style.backgroundColor = randomCssColor();  
            dom.style.textAlign = "center"; // 文字居中
        }
        dom.style.position = 'absolute';
        dom.style.pointerEvents = 'auto';
        this.dom = dom;

        // create an entity and add it to scene if we don't have one
        if(!entity) {
            entity = new pc.Entity();
            app.root.addChild(entity);
        }
        this.entity = entity;

        // add camera to renderer
        this.cameraElement = this._renderer.addCamera(camera);  
        // add div to cameraElement
        this.cameraElement.appendChild(dom);

        // set the max width and height
        this._maxWidth = 1920;
        this._maxHeight = 1080;
        // scaleFactor represent how many pixels of div equals to one unit of model.
        pixelsPerWorldUnit = pixelsPerWorldUnit || this._maxWidth;
        this.pixelsPerWorldUnit = new pc.Vec2(pixelsPerWorldUnit,pixelsPerWorldUnit);

        // start render
        this._renderer.addTarget(this); 
        this._renderer.render();
    };

    Css3Plane.prototype = {
        // update model materix
        updateTransform: function () {
            var modelTransform = this.entity.getWorldTransform();
            var scale = modelTransform.getScale();
            var width = Math.min(scale.x * this.pixelsPerWorldUnit.x,this._maxWidth);
            var height = Math.min(scale.z * this.pixelsPerWorldUnit.y,this._maxHeight);
            var style = getObjectCSSMatrix(modelTransform,width,height);
            
            // Safari doesn't like multi decimal numbers for width and height
            // and misaligns the iframe in the plane
            
            this.dom.style.width = Math.round(width) + "px";
            this.dom.style.height = Math.round(height) + "px";
            this.dom.style.lineHeight = this.dom.style.height;
            this.dom.style.WebkitTransform = style;
            this.dom.style.transform = style;
        },

        // set whether the div can be interacted
        blockEvents: function (state) {
            this.dom.style.pointerEvents = state ? "none" : "auto";  
        },

        // attach other plane in scene
        attachPlane: function (entity) {
            this.entity = entity;
        },
        
        disable: function () {
            this.cameraElement.removeChild(this.dom);
            this._renderer.removeTarget(this); 
        },
        
        enable: function () {
            this.cameraElement.appendChild(this.dom);
            this._renderer.addTarget(this); 
        }
    };

    return {
        Css3Renderer: Css3Renderer,
        Css3Plane: Css3Plane
    };
}());
