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

//post order
router.post('/post-order', isAuth, shopController.postOrder)

//get orders history
router.get('/get-orders-history', isAuth, shopController.getOrdersHistory)

module.exports = router