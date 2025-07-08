const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Client = require("../models/Client");

// 🔐 Clé secrète (définie dans .env et récupérée ici)
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

// ✅ Inscription
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const existing = await Client.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = new Client({
      name,
      email,
      password: hashedPassword,
    });

    await newClient.save();
    res.status(201).json({ message: "Inscription réussie !" });
  } catch (err) {
    console.error("Erreur inscription:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    const isValid = await bcrypt.compare(password, client.password);
    if (!isValid) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

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
  } catch (err) {
    console.error("Erreur login:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
