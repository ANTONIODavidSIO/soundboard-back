const router = require('express').Router();
const Soundboard = require('../models/Soundboard');

// Charger les soundboards
router.get('/soundboards', async (req, res) => {
  res.setHeader('Access-Contronl-Allow-Origin', 'http://localhost:3000'),
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'),
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization')
  const soundboards = await Soundboard.find();
  res.json(soundboards);
});

// Ajouter une soundboard
router.post('/soundboards', async (req, res) => {
  const { name, file } = req.body;
  const newSoundboard = new Soundboard({ name, file });
  await newSoundboard.save();
  res.json(newSoundboard);
});

// Supprimer une soundboard
router.delete('/soundboards/:id', async (req, res) => {
  const soundboardId = req.params.id;
  await Soundboard.findByIdAndDelete(soundboardId);
  res.json({ message: 'Soundboard supprimée' });
});

module.exports = router;