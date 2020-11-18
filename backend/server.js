const path = require('path');
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer'); 

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, new Date().getTime() + '-' + fileName);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

const uri = process.env.ATLAS_URI;
mongoose
.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const adminRoutes = require('./routes/admin');

app.use('/', adminRoutes);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})