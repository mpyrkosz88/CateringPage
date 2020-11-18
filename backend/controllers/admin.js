//libraries
const fs = require('fs');
const path = require('path');

//models
const Product = require('../models/product');

//controllers

exports.postAddProducts = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const image = req.file.filename
    console.log(image);

    const newProduct = new Product({
        name,
        price,
        image,
    });

    newProduct.save()
    .then(() => {
        res.json("New product added!");
    })
    .catch(err =>{
        res.status(400).json(err);
    })
}