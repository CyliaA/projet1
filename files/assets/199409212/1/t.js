/*

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
*/


/*

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



function navigateToNextStep() {
    if (currentStep < steps.length) {
        const nextStep = steps[currentStep];

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
        }, 1000);
    } else {
        addMessage("Thank you for completing the questionnaire.", 'bot');
        console.log('Form data:', formData);
    }
}

*/