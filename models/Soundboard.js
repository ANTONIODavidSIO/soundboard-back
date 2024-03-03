const mongoose = require('mongoose');

const soundBoardAudioFile = new mongoose.Schema({
  files: [String], 
  triggerKey: String 
});

module.exports = mongoose.model('Soundboard', soundBoardAudioFile);
