express = require('express');

const router = express.Router()

const shopController = require('../controllers/shop');

//get products for ordering from database
router.get('/menu', shopController.getProducts)

//add product to shopping cart
router.post('/addToCart/:id', shopController.addToCart)

//get cart
router.get('/cart', shopController.getCart)

//delete cart
router.delete('/cart-delete/:id', shopController.postCartDeleteProduct)

//get order
router.get('/get-order', shopController.getOrder)

//get orders history
router.get('/get-orders-history', shopController.getOrders)

module.exports = router