const express = require('express');
const app = express();
const port = 3000;

const router = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Ajout de la configuration de la base de données MongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/audioDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB database connected');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB database connection error:', err);
});
