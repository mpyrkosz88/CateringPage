//libraries
const fs = require('fs');
const { validationResult } = require('express-validator');

//models
const Product = require('../models/product');


exports.postAddProducts = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const image = req.file ? 'images/' + req.file.filename : null
    const newProduct = new Product({
        name,
        price,
        image,
    });
    newProduct.save()
    .then(() => res.json("New product added!"))
    .catch(err => res.status(500).json(err))
}

exports.getProducts = (req, res, next) => {
    Product.find()
    .then(results => {
        res.json(results)
    })
    .catch(err => res.status(500).json(err));
}
    
exports.getEditProduct = (req, res, next) => {
    Product.findById(req.params.id)
    .then(product => {
        res.json(product)
    })
    .catch(err => res.status(500).json('Error: ' + err))
}

exports.postEditProduct = (req, res, next) => {
    Product.findById(req.params.id)
    .then(product => {
        product.name = req.body.name
        product.price = req.body.price
        req.file ? product.image = 'images/' + req.file.filename : null
        product.save()
        .then(() => res.status(200).json('Exercise updated!'))
        .catch(err => res.status(403).json(err));
    })
    .catch(err => res.status(500).json(err));
}

exports.deleteProduct = (req, res, next) => {
    const prodId = req.params.id;
    Product.findByIdAndDelete(prodId)
        .then(product => {
            fs.unlink(product.image, (err) => {
                if (err) {
                    throw (err);
                }
            })
        })
        .then(() => res.status(200).json('Product deleted.'))
        .catch(err => res.status(500).json('Error: ' + err));
}