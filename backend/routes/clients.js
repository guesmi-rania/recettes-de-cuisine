const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const bcrypt = require("bcryptjs");

// Inscription client
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérifier si l'email existe déjà
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouveau client avec mot de passe hashé
    const newClient = new Client({ name, email, password: hashedPassword });
    await newClient.save();

    res.status(201).json({ message: "Client enregistré avec succès !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

module.exports = router;
