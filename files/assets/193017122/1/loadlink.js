var Loadlink = pc.createScript('loadlink');

// Initialize code called once per entity
Loadlink.prototype.initialize = function() {
 

    // Ajouter un écouteur d'événement au bouton
    this.button.addEventListener('click', function() {
        // URL du lien HTML que vous souhaitez charger
        const url = 'https://forms.office.com/pages/responsepage.aspx?id=XE-KYyKHXU6Q3hWTp2wMRjYDe7FlYFlEvv-zbkOOqUlUMDgxQTNWQTlNSVVVVzVXVlZTUldXUDlVSy4u';
        
        // Ouvrir l'URL dans un nouvel onglet
        window.open(url, '_blank');
    });
};

// Update code called every frame
Loadlink.prototype.update = function(dt) {
    // Aucune mise à jour nécessaire pour ce script
};

// Uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// Loadlink.prototype.swap = function(old) { };

// Learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/
