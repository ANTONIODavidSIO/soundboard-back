
const express = require('express');
const mongoose = require('mongoose');
const soundBoardAudioFile = require('./Soundboard');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.get('/soundBoardAudioFile', async (req, res) => {
  try {
    const soundBoardAudioFiles = await soundBoardAudioFile.find();
    res.json(soundBoardAudioFiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/soundBoardAudioFile', async (req, res) => {
  const soundboard = new Soundboard({
    files: req.body.files,
    triggerKey: req.body.triggerKey
  });

  try {
    const newSoundboard = await soundboard.save();
    res.status(201).json(newSoundboard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/audioDB')
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
