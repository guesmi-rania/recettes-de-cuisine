const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const bcrypt = require("bcryptjs");

// POST /api/clients/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérifie si l'email existe déjà
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    // Hash du mot de passe avant sauvegarde
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crée et enregistre le client avec le mot de passe hashé
    const newClient = new Client({ name, email, password: hashedPassword });
    await newClient.save();

    res.status(201).json({ message: "Client enregistré avec succès !" });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// POST /api/clients/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Recherche le client par email
    const client = await Client.findOne({ email });

    if (!client) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // Compare le mot de passe fourni avec le hash stocké
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    res.json({ message: "Connexion réussie", token: "fake-jwt-token" });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
