/*const express = require('express');
const mongoose = require('mongoose');

// Initialiser l'application Express
const app = express();
app.use(express.json());

// Connexion à MongoDB (utilise ton URL locale)
mongoose.connect('mongodb://localhost:27017/playcanvas_project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Définir un modèle de données pour les avatars
const AvatarSchema = new mongoose.Schema({
    userId: String,
    color: String,
    accessories: [String],
    stats: {
        health: Number,
        strength: Number,
    },
});

const Avatar = mongoose.model('Avatar', AvatarSchema);

// Endpoint pour créer un avatar
app.post('/avatars', async (req, res) => {
    const avatar = new Avatar(req.body);
    await avatar.save();
    res.send(avatar);
});

// Endpoint pour récupérer un avatar par ID
app.get('/avatars/:id', async (req, res) => {
    try {
        const avatar = await Avatar.findById(req.params.id);
        if (!avatar) return res.status(404).send('Avatar not found');
        res.send(avatar);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
