const router = require('express').Router();
const multer = require('multer');
const Soundboard = require('../models/Soundboard');
const path = require('path');
const fs = require('fs-extra');



const upload = multer({dest: 'uploads/'});

// Charger les soundboards
router.get('/soundboards', async (req, res) => {
  res.setHeader('Access-Contronl-Allow-Origin', 'http://localhost:3000'),
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'),
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization')
  const soundboards = await Soundboard.find();
  res.json(soundboards);
});

// Ajouter une soundboard
router.post('/soundboards', upload.any(), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("Fichier manquant");
  }

  const file = req.files[0];
  const name = req.body.name; // Utilisez le nom du fichier envoyé dans le formulaire

  // Construisez le chemin du fichier
  const filePath = path.join('uploads',`${file.filename}.mp3`);

  try {
   

    // Créez une nouvelle instance de Soundboard en utilisant le chemin du fichier
    const newSoundboard = new Soundboard({ name, file: filePath});

    // Enregistrez la soundboard dans la base de données
    await newSoundboard.save();

    // Réponse avec la nouvelle soundboard
    res.json(newSoundboard);
  } catch (error) {
    console.error("Erreur lors du déplacement du fichier :", error);
    return res.status(500).send("Erreur lors du déplacement du fichier");
  }
});



// Supprimer une soundboard
router.delete('/soundboards/:id', async (req, res) => {
  const soundboardId = req.params.id;
  await Soundboard.findByIdAndDelete(soundboardId);
  res.json({ message: 'Soundboard supprimée' });
});

module.exports = router;