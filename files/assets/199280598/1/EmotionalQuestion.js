//Handling emotions in 15 minute
var EmotionalQuestion = pc.createScript('emotionalQuestion');

EmotionalQuestion.attributes.add('css', { type: 'asset', assetType: 'css', title: 'CSS Asset' });
EmotionalQuestion.attributes.add('html', { type: 'asset', assetType: 'html', title: 'HTML Asset' });

EmotionalQuestion.prototype.initialize = function() {
    // Créer l'élément STYLE
    var style = document.createElement('style');
    document.head.appendChild(style);
    style.innerHTML = this.css.resource || '';

   // Ajouter l'HTML
    this.div = document.createElement('div');
    this.div.classList.add('container');
    this.div.innerHTML = this.html.resource || '';
    
    // Ajouter des identifiants uniques à chaque entité
    var uniqueId = this.entity.getGuid();  // Utilisation de l'identifiant unique de l'entité
    document.body.appendChild(this.div);

  
    this.questionList(uniqueId);
};

// update code called every frame
EmotionalQuestion.prototype.questionList = function(uniqueId) {


let currentQuestionIndex = 0; // Index of the current question

// Questions array with types and possible answers
const questions = [
    {
        id: 1,
        question: "How often do you try to handle difficult emotions in a short time frame (like 15 minutes) ?",
        type: "single-choice", // Can be 'multiple-choice', 'single-choice', or 'text'
        answers: ["Always","Often", "Sometimes", "Rarely", "Never"]
    },
    {
        id: 2,
        question: "How effective are short practices (like the 15-minute exercise) in managing your emotions ?",
        type: "signle-choice",
        answers: ["Very effective","Somewhat effective", "Neutral", "Not effective at all"]
    },
    {
        id: 3,
        question: "What emotions do you find the hardest to handle quickly, and why?",
        type: "text", // Text input
        answers: [] // No answers needed for text input
    },
      {
        id: 4,
        question: "Can you describe a situation where you successfully handled your emotions in 15 minutes or less?",
        type: "text", // Text input
        answers: [] // No answers needed for text input
    }
];

// Function to display the current question
function displayQuestion() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = ""; // Clear previous content

    const currentQuestion = questions[currentQuestionIndex];

    // Create and append the question title
    const questionTitle = document.createElement("h1");
    questionTitle.innerText = currentQuestion.question;
    questionContainer.appendChild(questionTitle);

    // Create answer options based on question type
    if (currentQuestion.type === "multiple-choice") {
        currentQuestion.answers.forEach(answer => {
            const label = document.createElement("label");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = `question-${currentQuestion.id}`;
            checkbox.value = answer;
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(answer));
            questionContainer.appendChild(label);
        });
        const nextButton = document.createElement("button");
        nextButton.innerText = "Next";
        nextButton.onclick = nextQuestion;
        questionContainer.appendChild(nextButton);

    } else if (currentQuestion.type === "single-choice") {
        currentQuestion.answers.forEach(answer => {
            const label = document.createElement("label");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `question-${currentQuestion.id}`;
            radio.value = answer;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(answer));
            questionContainer.appendChild(label);
        });
        const nextButton = document.createElement("button");
        nextButton.innerText = "Next";
        nextButton.onclick = nextQuestion;
        questionContainer.appendChild(nextButton);

    } else if (currentQuestion.type === "text") {
        const textarea = document.createElement("textarea");
        textarea.placeholder = "Describe your routine...";
        questionContainer.appendChild(textarea);
        const submitButton = document.createElement("button");
        submitButton.innerText = "Submit";
        submitButton.onclick = submitSurvey;
        questionContainer.appendChild(submitButton);
    }
}

// Function to go to the next question
function nextQuestion() {
    // Increment question index
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion(); // Display the next question
    } else {
        submitSurvey(); // Submit the survey if there are no more questions
    }
}



 

// Function to handle survey submission
function submitSurvey() {
    alert("Submitted!"); // You can implement actual submission logic here
  //  this.div.style.display = 'none'; // Masquer le conteneur après soumission
}

// Display the first question initially
displayQuestion();


};
