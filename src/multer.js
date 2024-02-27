const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/audioDB',
  options: { useNewUrlParser: true, useUnifiedTopology: true }
});

const upload = multer({ storage });

module.exports = upload;
