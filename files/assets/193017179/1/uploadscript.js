var Uploadscript = pc.createScript('uploadscript');


Uploadscript.attributes.add('css', { type: 'asset', assetType: 'css', title: 'CSS Asset' });
Uploadscript.attributes.add('html', { type: 'asset', assetType: 'html', title: 'HTML Asset' });

Uploadscript.prototype.initialize = function () {
    // create STYLE element
    var style = document.createElement('style');

    // append to head
    document.head.appendChild(style);
    style.innerHTML = this.css.resource || '';

    // Add the HTML
    this.div = document.createElement('div');
    this.div.classList.add('container');
    this.div.innerHTML = this.html.resource || '';

    // append to body
    document.body.appendChild(this.div);

    // Initialize the chatbot functionality
    this.initializeform();
};

Uploadscript.prototype.initializeform = function () {
    // Déclaration des variables globales
let voices = [];
let formData = {};
let currentStep = 0;
let groupIndex = null;
let subQuestionIndex = 0;

// Vérifier si la synthèse vocale est supportée
if ('speechSynthesis' in window) {
    console.log('Synthèse vocale supportée.');
} else {
    console.log('Synthèse vocale non supportée dans ce navigateur.');
}

// Fonction pour obtenir les voix disponibles
function loadVoices() {
    return new Promise((resolve) => {
        const id = setInterval(() => {
            voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                clearInterval(id);
                resolve();
            }
        }, 10);
    });
}

// Charger les voix disponibles et commencer le chat
loadVoices().then(() => {
  //  console.log("Voices disponibles:");
    voices.forEach((voice, index) => {
      //  console.log(`${index}: ${voice.name} (${voice.lang})`);
    });

    // Commencer le chat avec la première question après que les voix sont chargées
    addMessage(steps[currentStep].question, 'bot');
    if (steps[currentStep].type === "radio") {
        addRadioButtons(steps[currentStep].options);
    }
});

// Fonction pour lire le texte avec la synthèse vocale
function lireTexte(texte, voiceIndex = 89, volume = 1, rate = 1) {
    const synthese = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(texte);

    if (voices.length > 0) {
        utterance.voice = voices[voiceIndex];
    }

    utterance.volume = volume;
    utterance.rate = rate;

    synthese.speak(utterance);
}

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
    {
        question: "Please provide the email address where you would like to receive your summary report. You can also provide your referring provider's email",
        type: "text",
        field: "email"
    },
    {
        question: "Which gender do you identify with?",
        type: "radio",
        field: "gender",
        options: [
            { text: 'Women', value: 'women' },
            { text: 'Men', value: 'men' },
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
            { text: "Yes, it's an emergency. I will leave to contact 911 or go to the nearest emergency center", value: 'no' },
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
        question: "What type of therapeutic pathway do you prefer?",
        type: "radio",
        field: "type",
        options: [
            { text: 'Self-guided with professional video', value: 'video' },
            { text: 'Self-guided  assisted with avatar', value: 'avatar' },
            { text: 'Group support without individual sessions', value: 'group' },
            { text: 'Specialized group therapy with individual sessions', value: 'specialized' },
        ]
    },
    {
        question: "How frequently do you wish to be contacted by our team for follow-up or additional support?",
        type: "radio",
        field: "sessions",
        options: [
            { text: 'Weekly', value: '1' },
            { text: 'Monthly', value: '2' },
            { text: 'Yearly', value: '3' },
            { text: 'Based on my needs', value: '4' }
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
            'emotional': 15,
            'spiritual': 16,
            'behavioral': 17,
            'physical': 18,
            'environmental': 19,
            'financial': 20,
            'occupational': 21,
            'social': 22
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

//Environmental
/*
{
    type: 'group',
    questions: [

        //Q1
        {
            question: "",
            type: "radio",
            field: "environmental",
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' }
            ]
        },

        //Q2
        {
            question: "",
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
            question: "",
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
            question: "",
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
            question: "",
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
            question: "",
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
            question: "",
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
            question: "",
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
            question: "",
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
            question: "",
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
*/
];

// Fonction pour ajouter un message au chat
function addMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    if (sender === 'bot') {
        lireTexte(text);
    }
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

        radio.addEventListener('change', function() {
            addMessage(option.text, 'user');
            handleUserResponse(option.value);
            chatBox.removeChild(radioContainer);
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

// Fonction pour afficher la prochaine question ou sous-question
function navigateToNextStep() {
    if (currentStep < steps.length) {
        const nextStep = steps[currentStep];
        if (nextStep.type === 'group') {
            groupIndex = currentStep;
            subQuestionIndex = 0;
            showSubQuestion();
        } else {
            setTimeout(() => {
                addMessage(nextStep.question, 'bot');
                if (nextStep.type === "radio") {
                    addRadioButtons(nextStep.options);
                }
            }, 1000);
        }
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
        formData[question.field] = response;
        subQuestionIndex++;
        showSubQuestion();
    } else {
        groupIndex = null;
        subQuestionIndex = 0;
        navigateToNextStep();
    }
}

// Event listener pour le bouton d'envoi
document.getElementById('send-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput !== '') {
        addMessage(userInput, 'user');
        formData[steps[currentStep].field] = userInput;
        document.getElementById('user-input').value = '';
        handleUserResponse(userInput);
    }
});

// Fonction de validation d'email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


};


