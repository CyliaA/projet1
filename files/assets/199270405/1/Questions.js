var Questions = pc.createScript('questions');

Questions.attributes.add('css', { type: 'asset', assetType: 'css', title: 'CSS Asset' });
Questions.attributes.add('html', { type: 'asset', assetType: 'html', title: 'HTML Asset' });

Questions.prototype.initialize = function() {
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

  
    this.questionList(uniqueId);
};

// update code called every frame
Questions.prototype.questionList = function(uniqueId) {
  // let questions = []; // Initialize an empty array to hold the questions
//let currentQuestionIndex = 0; // Index of the current question

// Function to fetch questions from the API
/*async function fetchQuestions() {
    try {
        const response = await fetch('https://cherrynote-fdh5bhb7d6gcg4ga.eastus-01.azurewebsites.net/playcanvas'); // Replace with your API endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

  //  const query: "SELECT c.dimension, c.sentence, c.responses FROM c WHERE c.question_id = @question_id",
  

        questions = await response.json(); // Parse JSON response
        displayQuestion(); // Display the first question after fetching
    } catch (error) {
        console.error('Error fetching questions:', error);
        alert('Failed to load questions. Please try again later.');
    }
}
*/
// Construire l'URL avec des paramètres query
//const endpointUrl = `https://cherrynote-fdh5bhb7d6gcg4ga.eastus-01.azurewebsites.net/playcanvas?container_id=Questions&query=${encodeURIComponent(finalData)}`;
/*
// Envoyer la requête GET
fetch(endpointUrl, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'  // Ce header peut être omis dans le cas de GET
    }
})
.then(response => response.json())  // Parse la réponse en JSON
.then(data => {
    console.log('Success:', data);  // Gérer la réponse ici
})
.catch(error => {
    console.error('Error:', error);  // Gérer les erreurs ici
});


// Function to display the current question
function displayQuestion() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = ""; // Clear previous content

    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) {
        submitSurvey(); // No questions left to display, submit the survey
        return;
    }

    // Create and append the question title
    const questionTitle = document.createElement("h1");
    questionTitle.innerText = currentQuestion.question;
    questionContainer.appendChild(questionTitle);

    // Create answer options based on question type
    if (currentQuestion.type === "multiple") {
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

    } else if (currentQuestion.type === "single") {
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
    alert("Submitted!"); 
}



// Fetch questions when the page loads
fetchQuestions();
*/


let currentQuestionIndex = 0; // Index of the current question

// Questions array with types and possible answers
const questions = [
    {
        id: 1,
        question: "How often do you exercise in a week?",
        type: "multiple-choice", // Can be 'multiple-choice', 'single-choice', or 'text'
        answers: ["Not at all", "1-2 times", "3-4 times", "5-7 times", "More than 7 times a week"]
    },
    {
        id: 2,
        question: "How often do you feel a sense of accomplishment after exercising?",
        type: "multiple-choice",
        answers: ["Everytime", "Most of the time", "Sometimes", "Rarely", "Never", "Not applicable"]
    },
    {
        id: 3,
        question: "Please describe your typical exercise routine:",
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

}

// Display the first question initially
displayQuestion();


};
