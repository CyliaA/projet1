var Addsupport = pc.createScript('addsupport');

Addsupport.attributes.add('css', { type: 'asset', assetType: 'css', title: 'CSS Asset' });
Addsupport.attributes.add('html', { type: 'asset', assetType: 'html', title: 'HTML Asset' });

// Initialize code called once per entity
Addsupport.prototype.initialize = function() {
    // Créer l'élément STYLE
    var style = document.createElement('style');
    document.head.appendChild(style);
    style.innerHTML = this.css.resource || '';

    // Ajouter l'HTML
    this.div = document.createElement('div');
    this.div.classList.add('container');
    this.div.innerHTML = this.html.resource || '';
    document.body.appendChild(this.div);

    // Initialiser le formulaire
    this.initializeForm();
};

// Initialize form and handle interaction
Addsupport.prototype.initializeForm = function() {
    let currentQuestionIndex = 0;

    const questions = [
        {
            question: "Do you need more support?",
            elementId: "question-1"
        },
        {
            question: "Please describe what you feel:",
            elementId: "question-2"
        }
    ];

    // Fonction pour afficher la question actuelle
    const showQuestion = (index) => {
        // Masquer toutes les questions
        questions.forEach(q => {
            document.getElementById(q.elementId).classList.remove('active');
        });

        // Afficher la question actuelle
        if (index < questions.length) {
            document.getElementById("main-question").innerText = questions[index].question;
            document.getElementById(questions[index].elementId).classList.add("active");
        } else {
            this.submitSurvey();  // Soumettre si on dépasse le nombre de questions
        }
    };

    // Afficher la première question
    showQuestion(currentQuestionIndex);

    // Gestionnaire de clic pour les boutons "Yes" et "No"
    const buttons = document.querySelectorAll('.rating-btn');  // Sélectionner tous les boutons
    buttons.forEach(button => {
        button.onclick = () => {
            const answer = button.getAttribute('data-answer');  // Récupérer la réponse "yes" ou "no"

            if (answer === 'yes') {
                currentQuestionIndex++;  // Passer à la question suivante
                showQuestion(currentQuestionIndex);  // Afficher la question suivante
            } else if (answer === 'no') {
                this.submitSurvey();  // Soumettre et fermer le questionnaire si "No"
            }
        };
    });

    // Gestionnaire de clic pour le bouton Submit
    const submitButton = document.querySelector('.submit-btn');  // Assurez-vous qu'il y a un bouton de soumission avec la classe 'submit-btn'
    if (submitButton) {
        submitButton.onclick = () => {
            this.submitSurvey();  // Soumettre et fermer le formulaire quand "Submit" est cliqué
        };
    }
};

// Fonction pour gérer la soumission du questionnaire
Addsupport.prototype.submitSurvey = function() {
    // Vous pouvez récupérer les réponses ici si nécessaire
    const routine = document.getElementById("exercise_routine") ? document.getElementById("exercise_routine").value : '';
    alert("Thank you for your responses!");

    // Masquer le conteneur après la soumission
    this.div.style.display = 'none'; // Masquer le conteneur

    // Désactiver l'entité cible (si nécessaire)
    if (this.targetEntity) {
        this.targetEntity.enabled = false; // Désactiver l'entité
    }
};
