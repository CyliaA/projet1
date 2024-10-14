var UsernamePage = pc.createScript('usernamePage');

// Ajout des attributs pour les ressources CSS et HTML
UsernamePage.attributes.add('css', { type: 'asset', assetType: 'css', title: 'CSS Asset' });
UsernamePage.attributes.add('html', { type: 'asset', assetType: 'html', title: 'HTML Asset' });
//UsernamePage.attributes.add('targetEntity', { type: 'entity', title: 'Entity to Disable' }); // Attribut pour l'entité à désactiver

// Initialisation du script appelée une fois par entité
UsernamePage.prototype.initialize = function() {
    // Créer l'élément <style> et ajouter le CSS
    var style = document.createElement('style');
    document.head.appendChild(style);
    style.innerHTML = this.css.resource || '';

    // Créer un élément <div> pour ajouter l'HTML
    this.div = document.createElement('div');
    this.div.classList.add('container');
    this.div.innerHTML = this.html.resource || '';
    document.body.appendChild(this.div);
    

    // Initialiser le formulaire
    this.initializeForm();
    this.submitSurvey();
};

// Initialiser le formulaire et lier l'événement de soumission
UsernamePage.prototype.initializeForm = function() {
    // Lier la fonction de soumission au bouton Submit
    var submitButton = this.div.querySelector('.submit-btn');
    var self = this;  // Conserver la référence à 'this'
    if (submitButton) {
        submitButton.addEventListener('click', function(event) {
            event.preventDefault();  // Empêche le rechargement de la page
            self.submitSurvey();  // Utilisation de 'self' pour le contexte correct
        });
    } 
    // self.submitSurvey();
   // this.submitSurvey();
};// Fonction pour gérer la soumission du formulaire

// Fonction pour gérer la soumission du formulaire
UsernamePage.prototype.submitSurvey = function() {


    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const userType = document.querySelector('input[name="user_type"]:checked') ? 
                     document.querySelector('input[name="user_type"]:checked').value : '';
    const currentDate= new Date();


    // Extract the year, month, and day and format them as yyyy-mm-dd
    const formattedDate = currentDate.getFullYear() + '-' +
                        String(currentDate.getMonth() + 1).padStart(2, '0') + '-' +
                        String(currentDate.getDate()).padStart(2, '0');


    // Vérifier si tous les champs sont remplis
    if (!username || !email || !userType) {
        alert("Please fill all the fields and select a user type.");
        return;
    }

    // Vérifier si l'email est valide
    if (!this.validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Créer un objet JSON à partir des données saisies
    const formData = {
        "username": username,
        "email": email,
        "role": userType,
        "created_at": formattedDate
    };

    // Afficher l'objet JSON dans la console
    // console.log('Form Data in JSON:', JSON.stringify(formData, null, 2));

    // Optionnel : Afficher les données JSON dans un alert pour test
    //alert(JSON.stringify(formData, null, 2));

    // Masquer le conteneur après soumission
    this.div.style.display = 'none';

    // Désactiver l'entité cible si elle est définie
    if (this.targetEntity) {
        this.targetEntity.enabled = false; // Désactiver l'entité
    }
    
    // console.log("Storing data in localStorage:", formData);
    localStorage.setItem('userData', JSON.stringify(formData, null, 2));

}

// Fonction de validation de l'email
UsernamePage.prototype.validateEmail = function(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};