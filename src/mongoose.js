const mongoose = require('mongoose');

const SoundboardSchema = new mongoose.Schema({
  name: String,
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  }
});

const FileSchema = new mongoose.Schema({
  filename: String,
  contentType: String
});

const Soundboard = mongoose.model('Soundboard', SoundboardSchema);
const File = mongoose.model('File', FileSchema);

module.exports = { Soundboard, File };
