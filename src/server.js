const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const multer = require('multer');
const path = require('path')

const router = require('./routes');

// app.use('/uploads', express.static('uploads'))
app.use('/static', express.static(path.join(__dirname, 'uploads')))

app.use(express.json());
//app.use(multer().fields([{ name: 'file', maxCount: 1 }, { name: 'name' }]));
app.use(cors({
  exposedHeader:['Authorization'],
}));
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/audioDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB database connected');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB database connection error:', err);
});
