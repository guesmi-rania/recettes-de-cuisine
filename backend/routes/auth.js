const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Clé secrète pour JWT (mettre dans .env en prod)
const JWT_SECRET = process.env.JWT_SECRET || "secret_jwt_key";

// Route POST pour s'inscrire
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérifier si l'email existe déjà
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer et sauvegarder le client
    const newClient = new Client({ name, email, password: hashedPassword });
    await newClient.save();

    res.status(201).json({ message: "Inscription réussie !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route POST pour se connecter
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trouver le client
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Comparer les mots de passe
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Créer un token JWT
    const token = jwt.sign(
      { id: client._id, email: client.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Connexion réussie",
      token,
      client: {
        id: client._id,
        name: client.name,
        email: client.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
