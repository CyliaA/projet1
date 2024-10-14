var Server = pc.createScript('server');

// initialize code called once per entity
Server.prototype.initialize = function() {


// update code called every frame
Server.prototype.update = function(dt) {
// Importer les dépendances
const express = require('express');
const bodyParser = require('body-parser');
const { CosmosClient } = require('@azure/cosmos');

// Configuration Cosmos DB
const COSMOS_URL = 'https://progress-db.documents.azure.com:443/';
const COSMOS_KEY = '5yrTioyGESAfgF02MbLTlLypLLQ3FaCaRJ50vn1ZRri8ZAM8JMCEPTxf0mfGAhvfvTd8ph4CfHn6ACDb02bL2A';  // Remplace par ta clé Cosmos
const DATABASE_NAME = 'EvolutionDB';
const USERS_CONTAINER_NAME = 'Users';

// Initialiser le client Cosmos DB
const client = new CosmosClient({ endpoint: COSMOS_URL, key: COSMOS_KEY });
const database = client.database(DATABASE_NAME);
const usersContainer = database.container(USERS_CONTAINER_NAME);

// Initialiser Express.js
const app = express();
app.use(bodyParser.json());  // Pour lire les JSON dans les requêtes

// Route pour traiter les soumissions de formulaire
app.post('/submit', async (req, res) => {
    const { username, email, user_type } = req.body;

    // Vérifier que tous les champs sont présents
    if (!username || !email || !user_type) {
        return res.status(400).send('Tous les champs sont obligatoires!');
    }

    // Préparer l'objet utilisateur à insérer dans Cosmos DB
    const user = {
        user_id: `${Date.now()}`, // Génère un ID unique basé sur le timestamp
        username: username,
        email: email,
        user_type: user_type,
        created_at: new Date().toISOString()  // Ajoute un timestamp
    };

    try {
        // Insertion dans Cosmos DB
        const { resource: createdUser } = await usersContainer.items.create(user);
        console.log('Utilisateur créé:', createdUser);

        // Réponse après succès
        res.status(201).send('Utilisateur ajouté avec succès!');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error.message);
        res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur.');
    }
});

// Démarrer le serveur
/*const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

*/
};

};


// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// Server.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/