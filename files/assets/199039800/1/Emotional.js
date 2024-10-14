var Emotional = pc.createScript('emotional');

Emotional.attributes.add('css', { type: 'asset', assetType: 'css', title: 'CSS Asset' });
Emotional.attributes.add('html', { type: 'asset', assetType: 'html', title: 'HTML Asset' });

Emotional.prototype.initialize = function() {
    // Créer l'élément STYLE
    var style = document.createElement('style');
    document.head.appendChild(style);
    style.innerHTML = this.css.resource || '';

    // Ajouter l'HTML
    this.div = document.createElement('div');
    this.div.classList.add('container');
    
    // Ajouter des identifiants uniques à chaque entité
    var uniqueId = this.entity.getGuid();  // Utilisation de l'identifiant unique de l'entité
    this.div.innerHTML = this.html.resource.replace(/{{uniqueId}}/g, uniqueId); // Remplacement des IDs dynamiques
    document.body.appendChild(this.div);

    // Initialiser le formulaire
    this.initializeForm(uniqueId);
};

// update code called every frame
Emotional.prototype.initializeForm = function(uniqueId) {
    // Fonction pour charger les vidéos YouTube
    function addYouTubeVideo(blockId, youtubeUrl) {
        const videoBlock = document.getElementById(blockId);
        const iframe = document.createElement('iframe');
        iframe.src = youtubeUrl.replace('watch?v=', 'embed/');
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
  

        // Clear the placeholder and add the video
        videoBlock.innerHTML = '';
        videoBlock.appendChild(iframe);
    }

    

    // Ajouter les vidéos YouTube dynamiquement avec des identifiants uniques
    addYouTubeVideo('video-' + uniqueId + '-1', 'https://www.youtube.com/watch?v=RJ4C4CMoZL0');
    addYouTubeVideo('video-' + uniqueId + '-2', 'https://www.youtube.com/watch?v=eOjnsLtHIpQ');
    addYouTubeVideo('video-' + uniqueId + '-3', 'https://www.youtube.com/watch?v=3LruOZbOPTs');
    addYouTubeVideo('video-' + uniqueId + '-4', 'https://www.youtube.com/watch?v=J9W50bmbDac');

    // Fonction pour fermer la galerie vidéo
    document.getElementById('close-button-' + uniqueId).addEventListener('click', function() {
        // Masquer la galerie vidéo et le bouton "X"
        document.querySelector('.survey-container-' + uniqueId).style.display = 'none';
        document.getElementById('close-button-' + uniqueId).style.display = 'none';
    }.bind(this));
};
