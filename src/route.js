const express = require('express');
const router = express.Router();
const upload = require('./multer');
const { Soundboard, File } = require('./mongoose');

router.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  const name = req.body.name;

  const newFile = new File({
    filename: file.filename,
    contentType: file.mimetype
  });

  await newFile.save();

  const newSoundboard = new Soundboard({
    name,
    file: newFile._id
  });

  await newSoundboard.save();

  res.send({
    success: true,
    message: 'File uploaded successfully.'
  });
});

module.exports = router;
