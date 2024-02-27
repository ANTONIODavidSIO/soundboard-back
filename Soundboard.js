const mongoose = require('mongoose');

const soundBoardAudioFile = new mongoose.Schema({
  files: [String], // Stockez les chemins d'accès des fichiers audio
  triggerKey: String // Stockez la touche de déclenchement du clavier
});

module.exports = mongoose.model('Soundboard', soundBoardAudioFile);
