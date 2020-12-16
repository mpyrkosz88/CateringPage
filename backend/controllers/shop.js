//libraries
const fs = require('fs');
const path = require('path');
const mongoose = require("mongoose");

//models
const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');

//controllers

exports.getProducts = (req, res, next) => {
    Product.find()
    .then(results => {
        res.json(results)
    })
    .catch(err => res.status(500).json('Error:' + err));
}

exports.addToCart = (req, res, next) => {
    const prodId = req.params.id;
    const userId = req.userId
    console.log(userId);
    Product.findById(prodId)
        .then(product => {
            User.findById(userId)
            .then(user => {
                return user.addToCart(product)
            })
    })
    .then(() => res.json("Added to cart"))
    .catch(err => res.status(500).json('Error: ' + err));
}

exports.getCart = (req, res, next) => {
    const userId = req.userId
    User.findById(userId)
    .then(user => {
        user
        .populate('cart.items.itemId')
        .execPopulate()
        .then(cartItems => {
            const cart = cartItems.cart.items
            res.json(cart)
        })
    })
    .catch(err => res.status(500).json('Error: ' + err));
}

exports.postCartDeleteProduct = (req, res, next) => {
    const userId = req.userId
    const prodId = req.params.id;
    User.findById(userId)
      .then(user =>user.removeFromCart(prodId))
      .catch(err => res.status(500).json('Error: ' + err));
  };

  exports.getOrder = (req, res, next) => {
    const userId = req.userId
    User.findById(userId)
    .then(user => {
        user
        .populate('cart.items.itemId', {'name': 1, 'price': 1})
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(data => {
              return {
                  name: data.itemId.name,
                  price: data.itemId.price,
                  quantity: data.quantity,
              }
          })
            const order = new Order({
                user: {
                    email: user.email,
                    userId: user._id,
                },
                products: products,
                timeDate: new Date().toISOString()
            })
            return order.save()
        })
        .then(() => user.clearCart())
        })
    .then(() => res.json("Order has been sent"))
    .catch(err => res.status(500).json('Error: ' + err));
  }

  exports.getOrders = (req, res, next) => {
      Order.find({'user.userId':req.userId})
        .then((results) => res.json(results))
        .catch(err => res.status(500).json('Error: ' + err));
  }