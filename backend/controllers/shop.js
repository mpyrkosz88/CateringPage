//libraries
const fs = require('fs');
const path = require('path');

//models
const Product = require('../models/product');

//controllers

exports.getProducts = (req, res, next) => {
    Product.find()
    .then(results => {
        res.json(results)
    })
    .catch(err => res.status(400).json('Error:' + err));
    
}