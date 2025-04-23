const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');
const app = express();

mongoose.connect('mongodb://localhost/douceurs_du_chef', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

app.listen(5000, () => {
  console.log('Serveur démarré sur http://localhost:5000');
});
