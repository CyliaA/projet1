var Videos = pc.createScript('videos');

Videos.attributes.add('css', { type: 'asset', assetType: 'css', title: 'CSS Asset' });
Videos.attributes.add('html', { type: 'asset', assetType: 'html', title: 'HTML Asset' });

// initialize code called once per entity
Videos.prototype.initialize = function() { // DONNER LA DIMENSION

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

//this.fetchVideoLinks();

}
/*
Videos.prototype.videolinks()= function(){

    async function fetchVideoLinks() {
        try {
            const dimension = "spiritual";
            const endpoint = "https://cherrynote-fdh5bhb7d6gcg4ga.eastus-01.azurewebsites.net/playcanvas/fetch";
            const params = {
                container_id: "Videos",
                query: `SELECT c.video_id, c.link FROM c WHERE c.dimension = @dimension LIMIT 1`
            };
            params.query = params.query.replace("@dimension", `"${dimension}"`);

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params)
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }

            const data = await response.json();
            console.log("Liste des vidéos:", data);
            return data;
        } catch (error) {
            console.error("Erreur lors de la récupération des liens:", error);
        }
    }

    async function fetchQuestions(video_ids) {
        try {
            const endpoint = "https://cherrynote-fdh5bhb7d6gcg4ga.eastus-01.azurewebsites.net/playcanvas/fetch";
            const params = {
                container_id: "Questions",
                query: `SELECT c.sentence, c.response_type, c.responses FROM c WHERE c.question_id IN (@question_ids)`
            };
            params.query = params.query.replace("@dimension", `"${video_ids.join(', ')}"`);

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params)
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }

            const data = await response.json();
            console.log("Liste des vidéos:", data);
            return data;
        } catch (error) {
            console.error("Erreur lors de la récupération des liens:", error);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Variable contenant les identifiants des vidéos YouTube
        var videoIds = fetchVideoLinks();

        // Créer dynamiquement la galerie de vidéos
        function initializeVideoGallery(videoIds) {
            var videoGallery = document.getElementById('video-gallery');

            // Parcourir les identifiants de vidéo et créer les blocs de vidéos
            videoIds.forEach(function (videoId, index) {
                // Créer un bloc vidéo pour chaque identifiant YouTube
                var videoBlock = document.createElement('div');
                videoBlock.classList.add('video-block');
                videoBlock.id = 'video-' + (index + 1);

                // Ajouter l'iframe YouTube
                var iframe = document.createElement('iframe');
                iframe.src = 'https://www.youtube.com/embed/' + videoId;
                iframe.width = '100%';
                iframe.height = '100%';
                iframe.frameBorder = '0';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;

                videoBlock.appendChild(iframe);
                videoGallery.appendChild(videoBlock);
            });
        }

        // Fermer la galerie lorsque le bouton "X" est cliqué
        function initializeCloseButton() {
            var closeButton = document.getElementById('close-button');
            closeButton.addEventListener('click', function () {
                var surveyContainer = document.getElementById('survey-container');
                surveyContainer.style.display = 'none';
            });
        }

        // Initialiser la galerie de vidéos et le bouton de fermeture
        initializeVideoGallery(videoIds);
        initializeCloseButton();
    });

};

// update code called every frame
// Videos.prototype.update = function(dt) {

// };

//initialize("spiritual");

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// Videos.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/
*/
