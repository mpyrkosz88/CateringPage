//libraries
const fs = require('fs');
const path = require('path');
const mongoose = require("mongoose");

//models
const Product = require('../models/product');
const User = require('../models/user');

//controllers

exports.getProducts = (req, res, next) => {
    Product.find()
    .then(results => {
        res.json(results)
    })
    .catch(err => res.status(400).json('Error:' + err));
}

exports.addToCart = (req, res, next) => {
    const prodId = req.params.id;
    Product.findById(prodId)
    .then(product => {
        return req.user.addToCart(product);
      })
    .catch(err => res.status(500).json('Error: ' + err));
}

exports.getCart = (req, res, next) => {
    req.user
    .populate('cart.items.itemId')
    .execPopulate()
    .then(user => {
        const cart = user.cart.items
        res.json(cart)
    })
    .catch(err => res.status(500).json('Error: ' + err));
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.params.id;
    req.user.removeFromCart(prodId)
      .then(() => res.status(200).json('Product deleted.'))
      .catch(err => res.status(500).json('Error: ' + err));
  };
