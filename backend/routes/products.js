const express = require("express");
const router = express.Router();

// Exemple de produits en dur (tu pourras les remplacer par la base MongoDB plus tard)
const products = [
  {
    _id: "1",
    name: "Tarte aux pommes",
    description: "Délicieuse tarte maison avec pommes fraîches",
    price: 12,
    image: "https://via.placeholder.com/150",
  },
  {
    _id: "2",
    name: "Cake au chocolat",
    description: "Moelleux et fondant, un vrai plaisir chocolaté",
    price: 10,
    image: "https://via.placeholder.com/150",
  },
];

router.get("/", (req, res) => {
  res.json(products);
});

module.exports = router;
