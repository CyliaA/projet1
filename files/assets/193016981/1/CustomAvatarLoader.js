var CustomAvatarLoader = pc.createScript('customAvatarLoader');

CustomAvatarLoader.attributes.add('css', { type: 'asset', assetType: 'css', title: 'CSS Asset' });
CustomAvatarLoader.attributes.add('html', { type: 'asset', assetType: 'html', title: 'HTML Asset' });
CustomAvatarLoader.attributes.add("LoadAvatarBtn", { type: "entity" });
CustomAvatarLoader.attributes.add("LoadingScreen", { type: "entity" });

CustomAvatarLoader.instance = null;

window.addEventListener("message", function (event) {
    if (event.origin === "https://rarerooms.readyplayer.me") {
        CustomAvatarLoader.instance.LoadNewAvatar(event.data);
    }
}, false);

// initialize code called once per entity
CustomAvatarLoader.prototype.initialize = function () {
    CustomAvatarLoader.instance = this;
    this.GlbURL = null;
    this.iframeWidth = window.innerWidth;
    this.iframeHeight = window.innerHeight;
    this.app.on("BtnManager:LoadAvatarButtonClick", this.customAvatarSelection.bind(this));

    this.on('destroy', function () {
        this.app.off("BtnManager:LoadAvatarButtonClick", this.customAvatarSelection.bind(this));
    }.bind(this));

    this.setupIframe();
    this.isMobile = false;

    if (pc.platform.mobile || pc.platform.android || pc.platform.ios) { // Mobile
        let avatarIframe = document.getElementById("avatarIframe");
        avatarIframe.style.width = this.iframeWidth + "px";
        avatarIframe.style.height = this.iframeHeight + "px";
        avatarIframe.style.border = "none";
        this.isMobile = true;
    } else { // Desktop
        let avatarIframe = document.getElementById("avatarIframe");
        avatarIframe.style.width = "900px";
        avatarIframe.style.height = "650px";
        avatarIframe.style.border = "none";
        this.isMobile = false;
    }
};

CustomAvatarLoader.prototype.LoadNewAvatar = function (data) {
    let iframe = document.getElementById('avatarIframe');
    let avatarDiv = document.getElementById('avatarDiv');
    iframe.style.display = "none";
    avatarDiv.style.display = "none";
    this.loadGLBModelFromURL(data);
};

CustomAvatarLoader.prototype.loadGLBModelFromURL = function (modelURL) {
    var self = this;
    this.GlbURL = modelURL;
    this.app.fire("LoadingMenu:SetLoading", true, "Loading Avatar..");
    let name = "model_" + (Math.floor(Math.random() * 10000));
    let cacheURL = modelURL + "?cacheBuster=" + (Math.floor(Math.random() * 10000));

    this.LoadingScreen.enabled = true;
    utils.loadGlbContainerFromUrl(cacheURL, null, name, function (err, asset) {
        if (asset.resources[0].model)
            this.app.root.findByName("ModelTPC").model.asset = asset.resources[0].model.id;
        else {
            console.log(asset.resources);
        }
        this.LoadAvatarBtn.enabled = true;
        this.LoadingScreen.enabled = false;
    }.bind(this));
};

CustomAvatarLoader.prototype.setupIframe = function () {
    // create STYLE element
    var style = document.createElement('style');

    // append to head
    document.head.appendChild(style);
    style.innerHTML = this.css.resource || '';

    // Add the HTML
    this.div = document.createElement('div');
    this.div.id = "avatarDiv";
    this.div.classList.add('avatarContrainer');
    this.div.innerHTML = this.html.resource || '';
    this.div.style.display = "none";
    // append to body
    // can be appended somewhere else
    // it is recommended to have some container element
    // to prevent iOS problems of overfloating elements off the screen
    var canvas = document.getElementById("application-canvas");
    // canvas.style.pointerEvents = "none";
    //document.body.insertBefore(this.div,canvas);
    document.body.appendChild(this.div);
};

CustomAvatarLoader.prototype.customAvatarSelection = function () {
    this.LoadAvatarBtn.enabled = false;
    let iframe = document.getElementById('avatarIframe');
    let avatarDiv = document.getElementById('avatarDiv');

    iframe.src = 'https://rarerooms.readyplayer.me/avatar?id=668ea6c97a0772243ce4dac3'; // Change this to your custom subdomain
    iframe.style.display = "block";
    avatarDiv.style.display = "block";
};

// update code called every frame
CustomAvatarLoader.prototype.update = function (dt) {

};