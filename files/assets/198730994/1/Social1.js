var Social1 = pc.createScript('social1');

Social1.attributes.add('css', { type: 'asset', assetType: 'css', title: 'CSS Asset' });
Social1.attributes.add('html', { type: 'asset', assetType: 'html', title: 'HTML Asset' });
//Social.attributes.add('targetEntity', { type: 'entity', title: 'Entity to Disable' }); // Ajout d'un attribut pour l'entité à désactiver

// initialize code called once per entity
Social1.prototype.initialize = function() {
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

// update code called every frame
Social1.prototype.initializeForm = function() {
    let currentQuestionIndex = 0;  // Indice de la question actuelle

    const questions = [
        {
            question: "How well do you feel you are currently balancing the various roles in your life (e.g., work, family, personal time)?",
            elementId: "question-1"
        },
        {
            question: "Which life role do you find the hardest to balance ?",
            elementId: "question-2"
        },
        {
            question: "What strategies have you found most helpful in balancing your different life roles ?",
            elementId: "question-3"
        }
    ];

    // Afficher la première question
    document.getElementById("main-question").innerText = questions[currentQuestionIndex].question;
    document.getElementById(questions[currentQuestionIndex].elementId).classList.add("active");

    // Fonction pour aller à la question suivante
    this.nextQuestion = function() {
        // Masquer la question actuelle
        document.getElementById(questions[currentQuestionIndex].elementId).classList.remove("active");

        // Augmenter l'indice de la question actuelle
        currentQuestionIndex++;

        // Mettre à jour le titre de la question principale
        if (currentQuestionIndex < questions.length) {
            document.getElementById("main-question").innerText = questions[currentQuestionIndex].question;
            // Afficher la nouvelle question
            document.getElementById(questions[currentQuestionIndex].elementId).classList.add("active");
        } else {
            // Si toutes les questions ont été répondues, soumettre le questionnaire
            this.submitSurvey();
        }
    }.bind(this); // Lier le contexte

    // Ajouter des gestionnaires d'événements pour les boutons
    const buttons1 = document.querySelectorAll('#question-1 .rating-btn');
    buttons1.forEach(button => {
        button.onclick = this.nextQuestion;
    });

    const buttons2 = document.querySelectorAll('#question-2 .rating-btn');
    buttons2.forEach(button => {
        button.onclick = this.nextQuestion;
    });

// Pour le textarea de la question 3, nous avons un bouton de soumission
document.querySelector('#question-3 .submit-btn').onclick = this.submitSurvey.bind(this); // Lier le contexte

};

// Fonction pour gérer la soumission du questionnaire
Social1.prototype.submitSurvey = function() {
    // Récupérer les réponses ici si nécessaire
    const routine = document.getElementById("exercise_routine").value;
    alert("Thank you for your responses!");
    
    // Fermer ou masquer le conteneur après la soumission
    this.div.style.display = 'none'; // Masquer le conteneur

    // Désactiver l'entité cible
    if (this.targetEntity) {
        this.targetEntity.enabled = false; // Désactiver l'entité
    }
};
