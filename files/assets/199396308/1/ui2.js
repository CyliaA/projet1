var Ui2 = pc.createScript('ui2');

Ui2.attributes.add('css', { type: 'asset', assetType: 'css', title: 'CSS Asset' });
Ui2.attributes.add('html', { type: 'asset', assetType: 'html', title: 'HTML Asset' });

Ui2.prototype.initialize = function () {
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

Ui2.prototype.initializeForm = function () {
// Déclaration des variables globales



// Mise à jour de l'événement du bouton "Yes" pour définir assistanceConfirmed
document.getElementById('assistance-button-yes').addEventListener('click', function () {
    console.log('Assistance confirmed.');

    const element = document.querySelector('.element');
    if (element) {
        element.style.display = 'none';
    } else {
        console.warn("L'élément avec la classe 'element' n'a pas été trouvé.");
    }

    // Définir que l'assistance est confirmée
    assistanceConfirmed = true;

    // Déclencher l'événement personnalisé 'assistance-confirmed'
    const confirmationEvent = new Event('assistance-confirmed');
    document.dispatchEvent(confirmationEvent);

    // Lire la question à l'étape actuelle si nécessaire
    if (typeof currentStep !== 'undefined' && currentStep < steps.length) {
        const nextStep = steps[currentStep];

        if (nextStep) {
            lireTexte(nextStep.question); // Lire la question actuelle
            //addMessage(nextStep.question, 'bot'); // Ajouter le message dans le chat

            // Passer à l'étape suivante
         //   currentStep++;

            // Si c'est une question "radio", ajouter les boutons radio
            if (nextStep.type === "radio") {
               // addRadioButtons(nextStep.options);
            }
        } else {
            console.warn("La prochaine étape est indéfinie.");
        }
    } else {
        console.warn("L'étape actuelle est indéfinie ou dépassée.");
    }
});

// Mise à jour de l'événement du bouton "No"
document.getElementById('assistance-button-no').addEventListener('click', function () {
    window.speechSynthesis.cancel();
    console.log('Assistance declined.');
    document.querySelector('.element').style.display = 'none';
    document.dispatchEvent(new Event('assistance-declined'));

    // Si l'utilisateur refuse l'assistance, on pourrait éventuellement faire autre chose ici
    assistanceConfirmed = false; // Définir l'assistance à "non confirmée"
});


    document.getElementById('assistance-button-no').addEventListener('click', function () {
        window.speechSynthesis.cancel();
        console.log('Assistance declined.');
        document.querySelector('.element').style.display = 'none';
        document.dispatchEvent(new Event('assistance-declined'));
    });


let formData = {};
let currentStep = 0;
let groupIndex = null;
let subQuestionIndex = 0;



loadVoices().then(() => {
        voices.forEach((voice, index) => {
            // Affichez les voix disponibles si nécessaire
        });

        // Commencer le chat avec la première question
        addMessage(steps[currentStep].question, 'bot'); // Cela ne s'exécute qu'une seule fois maintenant
        if (steps[currentStep].type === "radio") {
            addRadioButtons(steps[currentStep].options);
        }
    });



const steps = [
    {
        question: "Do you consent to your data being collected?",
        type: "radio",
        field: "consent",
        options: [
            { text: 'Yes', value: 'yes' },
            { text: 'No', value: 'no' }
        ]
    },
    /*{
        question: "Please provide the email address where you would like to receive your summary report. You can also provide your referring provider's email",
        type: "text",
        field: "email"
    },
*/
    {
        question: "Which gender do you identify with?",
        type: "radio",
        field: "gender",
        options: [
            { text: 'Woman', value: 'woman' },
            { text: 'Man', value: 'man' },
            { text: 'Non binary', value: 'nonbinary' },
            { text: 'Prefer not to say', value: 'notsay' }
        ]
    },
    {
        question: "Which age group do you belong to?",
        type: "radio",
        field: "age",
        options: [
            { text: '14-18', value: '14_18' },
            { text: '18-25', value: '18_25' },
            { text: '25-35', value: '25_35' },
            { text: 'Over 35', value: '35_over' }
        ]
    },
    {
        question: "What is your ethnic origin?",
        type: "radio",
        field: "origin",
        options: [
            { text: 'Asian', value: 'asian' },
            { text: 'Black/African', value: 'black_african' },
            { text: 'First Nations-Native or Indigenous', value: 'first_nations' },
            { text: 'Hispanic or Latino', value: 'hispanic' },
            { text: 'biracial', value: 'biracial' },
            { text: 'White or Caucasian', value: 'white' },
            { text: 'Pacific Islander', value: 'pacific' },
            { text: 'Prefer not to say', value: 'prefer_not_to_say' },
            { text: 'Other', value: 'other' }
        ]
    },
    {
        question: "What is your current status?",
        type: "radio",
        field: "status",
        options: [
            { text: 'High School Student', value: 'high_school' },
            { text: 'College Student', value: 'college' },
            { text: 'University Student', value: 'university' },
            { text: 'Employed full-time', value: 'full_time' },
            { text: 'Employed part-time', value: 'part_time' },
            { text: 'Self-employed', value: 'sel' },
            { text: 'Unemployed', value: 'unemployed' },
            { text: 'Retired', value: 'retired' },
            { text: 'Other', value: 'other' }
        ]
    },
    {
        question: "What is your relationship status?",
        type: "radio",
        field: "relation",
        options: [
            { text: 'Single', value: 'single' },
            { text: 'In a relationship', value: 'relationship' },
            { text: 'Married', value: 'married' },
            { text: 'Divorced', value: 'divorced' },
            { text: 'Widowed', value: 'widowed' },
            { text: 'Other', value: 'other' }
        ]
    },
    {
        question: "Where do you live?",
        type: "radio",
        field: "live",
        options: [
            { text: 'California', value: 'California' },
            { text: 'Vermont', value: 'Vermont' },
            { text: 'New England', value: 'New_England' },
            { text: 'Massachusetts', value: 'Massachusetts' },
            { text: 'New Hampshire', value: 'New_Hampshire' },
            { text: 'New York', value: 'New_York' },
            { text: 'New Jersey', value: 'New_Jersey' },
            { text: 'Atlanta', value: 'Atlanta' },
            { text: 'Florida', value: 'Florida' },
            { text: 'Quebec', value: 'Quebec' },
            { text: 'Ontario', value: 'Ontario' },
            { text: 'Alberta', value: 'Alberta' },
            { text: 'British Columbia', value: 'British_Columbia' },
            { text: 'Other in Canada', value: 'Other_in_Canada' },
            { text: 'Other in the US', value: 'Other_in_the_US' },
            { text: 'Other in the world', value: 'Other_in_the_world' }
        ]
    },
    {
        question: "Are you currently in an emergency situation?",
        type: "radio",
        field: "emergency",
        options: [
            { text: "Yes, it's an emergency. I will leave to contact 911 or go to the nearest emergency center", value: 'urgent' },
            { text: "No emergency; I'll proceed with the questionnaire to find the appropriate support", value: 'yes' }
        ]
    },
    {
        question: "On a scale of 1 to 10, where 1 indicates poor mental health and wellness, and 10 indicates excellent mental health and wellness, how would you rate your current mental well-being?",
        type: "radio",
        field: "scale",
        options: [
            { text: '1', value: '1' },
            { text: '2', value: '2' },
            { text: '3', value: '3' },
            { text: '4', value: '4' },
            { text: '5', value: '5' },
            { text: '6', value: '6' },
            { text: '7', value: '7' },
            { text: '8', value: '8' },
            { text: '9', value: '9' },
            { text: '10', value: '10' }
        ]
    },
    {
        question: "In the past 1 or 2 weeks, please select up to three options that best describe how you have been feeling?",
        type: "radio",
        field: "feeling",
        options: [
            { text: '😊 Calm', value: 'calm' },
            { text: '😡 Angry', value: 'angry' },
            { text: '😔 Hopeless', value: 'hopeless' },
            { text: '😢 Sad', value: 'sad' },
            { text: '😠 Frustrated', value: 'frustrated' },
            { text: '😄 Happy', value: 'happy' },
            { text: '😃 Excited', value: 'excited' },
            { text: '😒 Annoyed', value: 'annoyed' },
            { text: '😌 Relaxed', value: 'relaxed' }
        ]
    },
   
    {
        question: "On a scale of 1 to 10, where 1 signifies it's not important at all, and 10 represents it's extremely important, how important is it to receive culturally sensitive support?",
        type: "radio",
        field: "important_scale",
        options: [
            { text: 'Extremely not important', value: '1' },
            { text: 'Not important', value: '2' },
            { text: 'Neutral', value: '3' },
            { text: 'Quite important', value: '4' },
            { text: 'Extremely important', value: '5' }
        ]
    },

    {
        question: "Here are the eight Wellbeing Dimensions. Please select the one that best suits your current needs to begin your self-assessment",
        type: "radio",
        field: "dimensions",
        options: [
            { text: 'Emotional', value: 'emotional' },
            { text: 'Spiritual', value: 'spiritual' },
            { text: 'Behavioral', value: 'behavioral' },
            { text: 'Physical', value: 'physical' },
            { text: 'Environmental', value: 'environmental' },
            { text: 'Financial', value: 'financial' },
            { text: 'Occupational', value: 'occupational' },
            { text: 'Social', value: 'social' }
        ],
        next: {
            'emotional': 12,
            'spiritual': 13,
            'behavioral': 14,
            'physical': 15,
            'environmental': 16,
            'financial': 17,
            'occupational': 18,
            'social': 19
        }
    },
   
  // Groupe de questions pour 'Emotional'
  {
    type: 'group',
    questions: [

        //Q1
        {
            question: "I find healthy ways to cope with stress (e.g. exercise, meditation, social support, self-care activities, etc.)",
            type: "radio",
            field: "emotional1",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },

        //Q2
        {
            question: "I often experience feelings of happiness and contentment.",
            type: "radio",
            field: "emotional2",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q3 
        
        {
            question: "I accept responsibility for my own actions.",
            type: "radio",
            field: "emotional3",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        }, 
        //Q4
        {
            question: "I am able to set priorities.",
            type: "radio",
            field: "emotional4",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q5
        {
            question: "I feel good about myself and believe others like me for who I am.",
            type: "radio",
            field: "emotional5",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q6
        {
            question: "I am flexible and able to adapt/adjust to life’s changes in a positive way.",
            type: "radio",
            field: "emotional6",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q7
        {
            question: "I can express all ranges of feelings (i.e. hurt, sadness, fear, anger, joy, etc.) and manage emotion-related behaviors in a healthy way.",
            type: "radio",
            field: "emotional7",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q8
        {
            question: "I handle setbacks or disappointments with resilience.",
            type: "radio",
            field: "emotional8",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q9
        {
            question: "I do not let my emotions get the better of me. I think before I act.",
            type: "radio",
            field: "emotional9",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q10
        {
            question: "I maintain a balanced relationship with social media and other outlets.",
            type: "radio",
            field: "emotional10",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        }, 
        {
            question: "Thank you for your interest! Your registration is now complete.",
            type: "end"
        }
    ]
},
    // Ajoutez des sections similaires pour d'autres dimensions
  
    // Groupe de questions pour 'Spritual'
  {
    type: 'group',
    questions: [

        //Q1
        {
            question: "I take time to think about what is important in life – who I am, what I value, where I fit in, where I’m going.",
            type: "radio",
            field: "spiritual1",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },

        //Q2
        {
            question: "I make time for relaxation during the day.",
            type: "radio",
            field: "spiritual2",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q3 
        
        {
            question: "I have a belief system in place (religious, agnostic, atheist, spiritual, etc.).",
            type: "radio",
            field: "spiritual3",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        }, 
        //Q4
        {
            question: "My values guide my decisions and actions.",
            type: "radio",
            field: "spiritual4",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q5
        {
            question: "I have a sense of purpose in my life.",
            type: "radio",
            field: "spiritual5",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q6
        {
            question: "I am tolerant and accepting of the view of others.",
            type: "radio",
            field: "spiritual6",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q7
        {
            question: "I utilize resources to improve my well-being.",
            type: "radio",
            field: "spiritual7",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q8
        {
            question: "I am active in communities or causes I care about.",
            type: "radio",
            field: "spiritual8",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q9
        {
            question: "I am able to set, communicate and enforce boundaries.",
            type: "radio",
            field: "spiritual9",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q10
        {
            question: "I work to create balance and peace within my interpersonal relationships, community and the world.",
            type: "radio",
            field: "spiritual10",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        }, 
        {
            question: "Thank you for your interest! Your registration is now complete.",
            type: "end"
        }
    ]
},
/////// Behavioral 
{
    type: 'group',
    questions: [

        //Q1
        {
            question: "I feel overwhelmed by daily tasks and responsibilities.",
            type: "radio",
            field: "behavioral1",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },

        //Q2
        {
            question: "I find it easy to maintain a balanced routine in my life.",
            type: "radio",
            field: "behavioral2",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q3 
        
        {
            question: "I often experience difficulty concentrating or focusing on tasks.",
            type: "radio",
            field: "behavioral3",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        }, 
        //Q4
        {
            question: "I feel emotionally stable and resilient in stressful situations.",
            type: "radio",
            field: "behavioral4",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q5
        {
            question: "I engage in regular physical activity or exercise.",
            type: "radio",
            field: "behavioral5",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q6
        {
            question: "I have healthy sleep patterns and feel rested upon waking.",
            type: "radio",
            field: "behavioral6",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q7
        {
            question: "I actively seek out social interactions and support from others",
            type: "radio",
            field: "behavioral7",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q8
        {
            question: "I effectively manage and cope with changes in my life.",
            type: "radio",
            field: "behavioral8",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q9
        {
            question: "I prioritize time for relaxation and self-care activities.",
            type: "radio",
            field: "behavioral9",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q10
        {
            question: "I communicate openly and effectively with others about my feelings and emotions.",
            type: "radio",
            field: "behavioral10",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        }, 
        {
            question: "Thank you for your interest! Your registration is now complete.",
            type: "end"
        }
    ]
},

/////Physical

{
    type: 'group',
    questions: [

        //Q1
        {
            question: "I manage my weight in healthy ways.",
            type: "radio",
            field: "physical1",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },

        //Q2
        {
            question: "I maintain regular exercise habits and do not allow my weight or physical appearance to impact my self-esteem.",
            type: "radio",
            field: "physical2",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q3 
        
        {
            question: "I get 7-9 hours of sleep each night and feel rested in the morning.",
            type: "radio",
            field: "physical3",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        }, 
        //Q4
        {
            question: "I seek advice from health care professionals if I have a health concern I cannot solve on my own.",
            type: "radio",
            field: "physical4",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q5
        {
            question: "I do not use or avoid harmful use of drugs (over-the-counter, prescription and illicit).",
            type: "radio",
            field: "physical5",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q6
        {
            question: "I drink alcohol responsibly (i.e. designated sober driver, avoid binge drinking, etc.)",
            type: "radio",
            field: "physical6",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q7
        {
            question: "I protect my skin from sun damage by using sunscreen and have great skin hygiene.",
            type: "radio",
            field: "physical7",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q8
        {
            question: "I maintain healthy eating patterns that include fruits and vegetables.",
            type: "radio",
            field: "physical8",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q9
        {
            question: "I stay hydrated and drink water throughout the day.",
            type: "radio",
            field: "physical9",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q10
        {
            question: "I protect myself from STIs and unwanted pregnancy by either abstaining from sexual behaviors or using proper protection, such as condoms.",
            type: "radio",
            field: "physical10",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        }, 
        {
            question: "Thank you for your interest! Your registration is now complete.",
            type: "end"
        }
    ]
},

/////Environmental

{
    type: 'group',
    questions: [

        //Q1
        {
            question: "Extreme weather events (e.g., hurricanes, wildfires) make me feel anxious or stressed.",
            type: "radio",
            field: "environmental1",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },

        //Q2
        {
            question: "Changes in seasonal weather patterns impact my mood and energy levels.",
            type: "radio",
            field: "environmental2",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q3 
        
        {
            question: "Air quality issues (e.g., pollution, smoke) affect my physical health and wellbeing.",
            type: "radio",
            field: "environmental3",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        }, 
        //Q4
        {
            question: "Concerns about climate change impact my daily life decisions (e.g., transportation choices, food consumption).",
            type: "radio",
            field: "environmental4",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q5
        {
            question: "I feel a sense of loss or grief about environmental degradation caused by climate change.",
            type: "radio",
            field: "environmental5",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q6
        {
            question: "I actively seek out information about climate change and its impact on my local environment.",
            type: "radio",
            field: "environmental6",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q7
        {
            question: "I feel a sense of responsibility to take action to mitigate climate change.",
            type: "radio",
            field: "environmental7",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q8
        {
            question: "The availability of clean water and food security concerns affect my overall wellbeing.",
            type: "radio",
            field: "environmental8",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q9
        {
            question: "I experience emotional distress when witnessing environmental damage caused by climate change.",
            type: "radio",
            field: "environmental9",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q10
        {
            question: "I engage in  activities that promote environmental sustainability ,and brings me a sense of fulfillment or purpose.",
            type: "radio",
            field: "environmental10",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        }, 
        {
            question: "Thank you for your interest! Your registration is now complete.",
            type: "end"
        }
    ]
},
/////Financial

{
    type: 'group',
    questions: [

        //Q1
        {
            question: "I have enough income to meet my basic needs (food, shelter, utilities).",
            type: "radio",
            field: "financial1",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },

        //Q2
        {
            question: "I regularly budget and track my expenses.",
            type: "radio",
            field: "financial2",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q3 
        
        {
            question: "I have savings set aside for emergencies.",
            type: "radio",
            field: "financial3",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        }, 
        //Q4
        {
            question: "I have access to affordable and nutritious food options.",
            type: "radio",
            field: "financial4",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q5
        {
            question: "I am able to comfortably manage my debt obligations (e.g., loans, credit cards).",
            type: "radio",
            field: "financial5",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q6
        {
            question: "I am satisfied with my current housing situation.",
            type: "radio",
            field: "financial6",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q7
        {
            question: "I prioritize spending on essential items over discretionary purchases.",
            type: "radio",
            field: "financial7",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q8
        {
            question: "I feel confident in making financial decisions for my future.",
            type: "radio",
            field: "financial8",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q9
        {
            question: "I am proactive in seeking financial advice or education.",
            type: "radio",
            field: "financial9",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q10
        {
            question: "I  keep my financial information safe by using secure passwords, PINs and dual authentication., and  I know my credit score.",
            type: "radio",
            field: "financial10",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        }, 
        {
            question: "Thank you for your interest! Your registration is now complete.",
            type: "end"
        }
    ]
},
/////Occupational

{
    type: 'group',
    questions: [

        //Q1
        {
            question: "I am able to balance work, play, school and other aspects of my life.",
            type: "radio",
            field: "occupational1",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },

        //Q2
        {
            question: "I take advantage of opportunities to learn new skills that can enhance my future employment opportunities.",
            type: "radio",
            field: "occupational2",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q3 
        
        {
            question: "I know what skills are necessary for the occupations I am interested in.",
            type: "radio",
            field: "occupational3",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        }, 
        //Q4
        {
            question: "I strive to develop good work habits (dependability, initiative, etc.).",
            type: "radio",
            field: "occupational4",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q5
        {
            question: "I work effectively with others.",
            type: "radio",
            field: "occupational5",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q6
        {
            question: "I have confidence in my job search skill (resume writing, interviewing, cover letters, networking, etc.)",
            type: "radio",
            field: "occupational6",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q7
        {
            question: "I have explored different career options.",
            type: "radio",
            field: "occupational7",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q8
        {
            question: "I know where to find employment opportunities (job service, online, etc.)",
            type: "radio",
            field: "occupational8",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q9
        {
            question: "I manage my time effectively.",
            type: "radio",
            field: "occupational9",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q10
        {
            question: "I have participated in internships or volunteer work.",
            type: "radio",
            field: "occupational10",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        }, 
        {
            question: "Thank you for your interest! Your registration is now complete.",
            type: "end"
        }
    ]
},
/////Social

{
    type: 'group',
    questions: [

        //Q1
        {
            question: "I am satisfied with my social life.",
            type: "radio",
            field: "social1",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },

        //Q2
        {
            question: "I am involved in at least one community or group activities.",
            type: "radio",
            field: "social2",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q3 
        
        {
            question: "I maintain a network of supportive friends, family and social contacts.",
            type: "radio",
            field: "social3",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        }, 
        //Q4
        {
            question: "I have at least one meaningful relationship in my life.",
            type: "radio",
            field: "social4",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q5
        {
            question: "I am accepting of the diversity of others (race, ethnicity, religion, gender, ability, sexual orientation, etc.)",
            type: "radio",
            field: "social5",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q6
        {
            question: "I am able to prioritize my own needs by saying “no” to others’ requests for my time.",
            type: "radio",
            field: "social6",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q7
        {
            question: "I have someone I can talk to about my feelings and struggles.",
            type: "radio",
            field: "social7",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q8
        {
            question: "I participate in social activities and enjoy being with people who are different from me.",
            type: "radio",
            field: "social8",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q9
        {
            question: "I give and take equally in my relationships.",
            type: "radio",
            field: "social9",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },
        //Q10
        {
            question: "I plan time with my family and friends.",
            type: "radio",
            field: "social10",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        }, 
        {
            question: "Thank you for your time and providing thoughtful responses. Your registration is now complete. I command  on wanting to improving your well-being.",
            type: "end"
        }
    ]
}
];

// Fonction pour ajouter un message au chat
function addMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);

    // N'affiche pas les messages de l'utilisateur pour les questions radio
    if (sender === 'user' && steps[currentStep].type === 'radio') {
        return; // Ne pas afficher le message de l'utilisateur pour les réponses radio
    }

    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Lire le texte pour les messages du bot
   // if (sender === 'bot') {
      //  lireTexte(text);
   // }
}

// Fonction pour ajouter des boutons radio
function addRadioButtons(options) {
    const chatBox = document.getElementById('chat-box');
    const radioContainer = document.createElement('div');
    radioContainer.classList.add('message', 'bot-message', 'radio-group');


    options.forEach(option => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'radioGroup';
        radio.value = option.value;

        // radio.disabled = true; // Désactiver le bouton radio si déjà coché
        
 
        // Ajouter un événement au changement de sélection
        radio.addEventListener('change', function() {
            handleUserResponse(option.value);
           
       //   if (currentStep == 15) {
         //    chatBox.removeChild(radioContainer); // Retirer le groupe de boutons radio
          // }
        });

       
        label.appendChild(radio);
        label.appendChild(document.createTextNode(option.text));
        radioContainer.appendChild(label);
    });
    
    chatBox.appendChild(radioContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}


// Fonction de gestion des réponses de l'utilisateur
function handleUserResponse(response) {
    const step = steps[currentStep];

    

    // Enregistrer la réponse dans formData
    formData[step.field] = response;

    // Gestion de la réponse "no"
    if (response === 'no') {
        addMessage("Thanks for your answer", 'bot');
        addMessage("You do not wish to continue. The assessment is now closed.", 'bot');
     //   lireTexte("Thanks for your answer. You do not wish to continue. The assessment is now closed.");
        currentStep = steps.length;
        return;
    }
    // Gestion de la réponse "non"
    if (response === 'urgent') {
        addMessage("Thanks for your answer", 'bot');
        addMessage("You must call 9 1 1 or go to the nearest emergency center.The assessment is now closed", 'bot');
        lireTexte("You must call 9 1 1 or go to the nearest emergency center.The assessment is now closed");
   formData[step.field] = response;
        currentStep = steps.length;
        return;
    }

    // Si une section de type "group" est en cours
    if (groupIndex !== null) {
        handleSubQuestionResponse(response);
    } else {
        // Passer à l'étape suivante en fonction de la réponse
        if (step.next && step.next[response] !== undefined) {
            currentStep = step.next[response];
        } else {
            currentStep++;
        }
        navigateToNextStep();
    }
}

function navigateToNextStep() {
    if (currentStep < steps.length) {
        const nextStep = steps[currentStep];
        if (nextStep.type === 'group') {
            groupIndex = currentStep;
            subQuestionIndex = 0;
            showSubQuestion();
        } else {
        setTimeout(() => {
            // Ajouter le message de la prochaine question
            addMessage(nextStep.question, 'bot');
               
            // Vérifier si l'assistance a été confirmée avant de lire la question
            if (assistanceConfirmed) {
                lireTexte(nextStep.question); // Lire la question si assistance est confirmée
            }

            // Vérifier le type de la prochaine question et ajouter des éléments en conséquence
            if (nextStep.type === "radio") {
                addRadioButtons(nextStep.options);
            } else if (nextStep.type === "text") {
                addTextField(nextStep.field);
            }
        }, 1000);}
    } else {
        addMessage("Thank you for completing the questionnaire.", 'bot');
        console.log('Form data:', formData);
    }
}

// Fonction pour afficher les sous-questions
function showSubQuestion() {
    if (groupIndex !== null && subQuestionIndex < steps[groupIndex].questions.length) {
        const group = steps[groupIndex];
        const question = group.questions[subQuestionIndex];

        setTimeout(() => {
            addMessage(question.question, 'bot');
            if (question.type === "radio") {
                addRadioButtons(question.options);
            }
        }, 1000);
    } else {
        groupIndex = null;
        subQuestionIndex = 0;
        navigateToNextStep();
    }
}

// Fonction de gestion des réponses aux sous-questions
function handleSubQuestionResponse(response) {
    const group = steps[groupIndex];
    if (group && subQuestionIndex < group.questions.length) {
        const question = group.questions[subQuestionIndex];
        formData[question.question] = response;
        subQuestionIndex++;
        showSubQuestion();
    } else {
        groupIndex = null;
        subQuestionIndex = 0;
        navigateToNextStep();
    }
}


// Fonction pour ajouter un champ de texte
function addTextField(field) {
    const chatBox = document.getElementById('chat-box');
    const textFieldContainer = document.createElement('div');
    textFieldContainer.classList.add('input-container'); // Ajout de la classe pour le style

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = "Enter your e-mail address"; // Placeholder pour le champ d'email
    input.required = true; // Champ obligatoire

    // Création du bouton d'envoi
    const sendButton = document.createElement('button');
    sendButton.innerText = "Send";
    sendButton.addEventListener('click', function() {
        const email = input.value; // Récupérer la valeur du champ d'e-mail
        if (validateEmail(email)) { // Vérifier le format de l'e-mail
            formData[field] = email; // Enregistrer la réponse
            document.getElementById('email-error').style.display = 'none'; // Cacher l'erreur si valide
            waitingForResponse = false; // L'utilisateur a répondu
            currentStep++; // Passer à l'étape suivante
            navigateToNextStep();
        } else {
            // Afficher un message d'erreur si l'e-mail n'est pas valide
            document.getElementById('email-error').style.display = 'block'; // Afficher l'erreur
        }
    });

    textFieldContainer.appendChild(input);
    textFieldContainer.appendChild(sendButton);
    chatBox.appendChild(textFieldContainer);
    waitingForResponse = true; // Attendre la réponse de l'utilisateur
}

// Ajout de l'écouteur d'événements pour le bouton send answer
document.getElementById('send-btn').addEventListener('click', function() {
    // Vérifier si toutes les questions ont été répondues
    for (const step of steps) {
        if (!formData[step.field]) {
         //   addMessage("Please answer all questions before sending", 'bot');
            return; // Ne pas quitter si une question n'est pas répondue
        }
    }

    // Afficher un message de confirmation
    if (confirm("Are you sure you want to send? Your responses will be saved.")) {
        addMessage("Thank you for your participation. Your responses have been saved.", 'bot');
        lireTexte("Thank you for your participation. Your responses have been saved.");
        console.log('Form data :', formData);
        
        

        // Retrieve the JSON data from localStorage
        const jsonData = localStorage.getItem('userData');
        console.log("Retrieved data:", jsonData);  // Check if data is retrieved

        if (jsonData) {
            const parsedData = JSON.parse(jsonData);
            console.log("Parsed JSON data:", parsedData);  // Use the JSON data as needed
            const finalData = {
                ...parsedData,
                "intake_form": formData
            }
            
            // Define the endpoint URL
            const endpointUrl = 'https://cherrynote-fdh5bhb7d6gcg4ga.eastus-01.azurewebsites.net/playcanvas/save';  // Ensure this URL is correct and uses HTTPS

            // Define the body data
            const requestBody = {
                "container_id": "Users",
                "query": finalData
            };

            // Send the POST request using fetch
            fetch(endpointUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // Specify the content type as JSON
                },
                body: JSON.stringify(requestBody)  // Convert the body object to a JSON string
            })
            .then(response => response.json())  // Parse the response as JSON
            .then(data => {
                console.log('Success:', data);  // Handle the response data here
            })
            .catch(error => {
                console.error('Error:', error);  // Handle any errors here
            });

        } else {
            console.log("No data found in localStorage.");
        }





        // Ici, vous pouvez ajouter une logique pour envoyer formData à un serveur si nécessaire
        document.querySelector('.chat-container').style.display = 'none';
    }
});

// Ajout de l'écouteur d'événements pour le bouton Quitter
document.getElementById('exit-btn').addEventListener('click', function() {

    // Afficher un message de confirmation
    if (confirm("Are you sure you want to quit? ")) {
        addMessage("Thank you", 'bot');
        lireTexte("Thank you");
        
        // Ici, vous pouvez ajouter une logique pour envoyer formData à un serveur si nécessaire
        document.querySelector('.chat-container').style.display = 'none';
    }
});


}