//libraries
const fs = require('fs');
const path = require('path');

//models
const Product = require('../models/product');

//controllers

exports.postAddProducts = (req, res, next) => {
    const baseUrl = req.protocol + "://" + req.get('host');
    const name = req.body.name;
    const price = req.body.price;
    const image = baseUrl + '/images/' + req.file.filename
 
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

exports.getProducts = (req, res, next) => {
    Product.find()
    .then(results => {
        res.json(results)
    })
    .catch(err => res.status(400).json('Error:' + err));
}
    
exports.getEditProduct = (req, res, next) => {
    Product.findById(req.params.id)
    .then(product => {
        console.log(product)
        res.json(product)
    })
    .catch(err => res.status(400).json('Error: ' + err))
}

exports.postEditProduct = (req, res, next) => {
    Product.findById(req.params.id)
    .then(product => {
        const baseUrl = req.protocol + "://" + req.get('host');
        console.log(req.file)
        product.name = req.body.name
        product.price = req.body.price
        req.file ? product.image = baseUrl + '/images/' + req.file.filename : null
    product.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err))

    })
    .catch(err => res.status(400).json('Error: ' + err))
}

exports.deleteProduct = (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}
