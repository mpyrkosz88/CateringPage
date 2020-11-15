const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose
.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const shopRoutes = require('./routes/shop');

app.use('/', shopRoutes);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})