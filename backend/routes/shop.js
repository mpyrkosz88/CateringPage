const express = require('express');

const router = express.Router()

const shopController = require('../controllers/shop');

const isAuth = require('../middleware/is-auth');

//get products for ordering from database
router.get('/menu', shopController.getProducts)

//add product to shopping cart
router.post('/addToCart/:id', isAuth, shopController.addToCart)

//get cart
router.get('/cart', isAuth, shopController.getCart)

//delete cart
router.delete('/cart-delete/:id', isAuth, shopController.postCartDeleteProduct)

//get order
router.get('/get-order', isAuth, shopController.getOrder)

//get orders history
router.get('/get-orders-history', isAuth, shopController.getOrders)

module.exports = router