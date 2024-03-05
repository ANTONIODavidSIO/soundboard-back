const mongoose = require('mongoose');

const soundBoardAudioFile = new mongoose.Schema({
  file: String, 
  name: String
});

module.exports = mongoose.model('Soundboard', soundBoardAudioFile);
