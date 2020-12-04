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
    .catch(err => res.status(400).json('Error:' + err));
}

exports.addToCart = (req, res, next) => {
    const prodId = req.params.id;
    Product.findById(prodId)
    .then(product => {
        return req.user.addToCart(product)
        .then(() => res.json("Added to cart"))
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

  exports.getOrder = (req, res, next) => {
    //   let products
      req.user
      .populate('cart.items.itemId', {'name': 1, 'price': 1})
      .execPopulate()
      .then(user => {
          const products = user.cart.items.map(data => {
              console.log(data.itemId);
              console.log(data.quantity);
              return {
                  name: data.itemId.name,
                  price: data.itemId.price,
                  quantity: data.quantity,
              }
          })
            const order = new Order({
                user: {
                    userId: user.userId,
                },
                products: products,
                timeDate: new Date().toISOString()
            })
            return order.save()
        })
        .then(() => req.user.clearCart())
        .then(() => res.json("Order has been sent"))
        .catch(err => res.status(500).json('Error: ' + err));
  }

  exports.getOrders = (req, res, next) => {
      Order.find({'user.userId':req.user.userId})
        .then((results) => res.json(results))
        .catch(err => res.status(500).json('Error: ' + err));
  }