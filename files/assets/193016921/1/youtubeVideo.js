var YouTubeVideo = pc.createScript('youTubeVideo');

YouTubeVideo.attributes.add('videoUrl', { type: 'string', default: '' });

YouTubeVideo.prototype.initialize = function() {
    var iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.top = '50%';
    iframe.style.left = '50%';
    iframe.style.transform = 'translate(-50%, -50%)';
    iframe.style.width = '80vw'; // Utilisez des unités vh/vw pour être réactif à la taille de l'écran
    iframe.style.height = '45vw'; // Ajustez ce rapport pour conserver les proportions de l'iframe
    iframe.style.border = 'none';
    iframe.src = this.videoUrl;
     // Activer le plein écran
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('mozallowfullscreen', '');
    iframe.setAttribute('msallowfullscreen', '');
    iframe.setAttribute('oallowfullscreen', '');
    iframe.setAttribute('webkitallowfullscreen', '');

    document.body.appendChild(iframe);

    // Supprimer l'iframe lorsque l'entité est détruite
    this.on('destroy', function() {
        document.body.removeChild(iframe);
    });

    // Écoutez les changements de taille de l'écran
    window.addEventListener('resize', function() {
        iframe.style.width = '80vw';
        iframe.style.height = '45vw';
    });
};
