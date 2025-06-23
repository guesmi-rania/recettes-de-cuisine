const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

// Inscription client
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérifier si l'email existe déjà
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    // Créer un nouveau client
    const newClient = new Client({ name, email, password });
    await newClient.save();

    res.status(201).json({ message: "Client enregistré avec succès !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

module.exports = router;
