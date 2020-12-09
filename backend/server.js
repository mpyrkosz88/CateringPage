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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

const uri = process.env.ATLAS_URI;
mongoose
.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
)
// .then(result => {
//   const user = new User({
//     userId: 123,
//     name: "ja",
// });
// user.save();
// })
// .catch(err => console.log(err))


const User = require("./models/user");

app.use((req, res, next) => {
  const userId = "5fbfd4e5540f7d4c245431f9"
  User.findById(userId)
      .then(user => {
        if (!user) {
          return next();
        }
        req.user = user;
        next();
      })
      .catch(err => {
        next(new Error(err));
      });
});



const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// routes

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


app.use('/', adminRoutes);
app.use('/', shopRoutes);
app.use('/', authRoutes);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
