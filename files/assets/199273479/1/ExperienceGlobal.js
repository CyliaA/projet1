var ExperienceGlobal = pc.createScript('experienceGlobal');

// Ajouter des attributs CSS et HTML
ExperienceGlobal.attributes.add('css', { type: 'asset', assetType: 'css', title: 'CSS Asset' });
ExperienceGlobal.attributes.add('html', { type: 'asset', assetType: 'html', title: 'HTML Asset' });

// initialize code called once per entity
ExperienceGlobal.prototype.initialize = function() {
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

ExperienceGlobal.prototype.initializeForm = function() {

//const question1 = document.getElementById('question1').value.trim();
//const question2 = document.getElementById('question2').value.trim();
let currentQuestionIndex = 0;  // Indice de la question actuelle


  // Créer un objet JSON à partir des données saisies
    const formData = {
        "question1": question1,
        "question2": question2
    
    };


    // Liste des questions
    const questions = [
        {
            question: "How was your experience ?",
            elementId: "question-1"
        },
        {
            question: "How are you feeling ?",
            elementId: "question-2"
        }
    ];

    // Fonction pour aller à la question suivante
    this.nextQuestion = function() {
        // Masquer la question actuelle
        document.getElementById(questions[currentQuestionIndex].elementId).classList.remove("active");

        // Augmenter l'indice de la question actuelle
        currentQuestionIndex++;

        // Mettre à jour le titre de la question principale et afficher la nouvelle question
        if (currentQuestionIndex < questions.length) {
            document.getElementById(questions[currentQuestionIndex].elementId).classList.add("active");
        } else {
            // Si toutes les questions ont été répondues, soumettre le questionnaire
            this.submitSurvey();
        }
    }.bind(this); // Lier le contexte

    // Ajouter des gestionnaires d'événements pour les boutons de chaque question
    const buttons1 = document.querySelectorAll('#question-1 .rating-btn');
    buttons1.forEach(button => {
        button.onclick = () => {
            this.nextQuestion();
        };
    });

    const buttons2 = document.querySelectorAll('#question-2 .rating-btn');
    buttons2.forEach(button => {
        button.onclick = () => {
            this.nextQuestion();
        };
    });

// alert(JSON.stringify(formData, null, 2));
 
};

// Fonction pour gérer la soumission du questionnaire
ExperienceGlobal.prototype.submitSurvey = function() {
    alert("Thank you for your responses!");
    this.div.style.display = 'none'; // Masquer le conteneur après soumission
};
