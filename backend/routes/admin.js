const express = require('express');

const router = express.Router()

const adminController = require('../controllers/admin');

const isAdmin = require('../middleware/is-admin');

router.post('/add', isAdmin, adminController.postAddProducts)

router.get('/edit', isAdmin, adminController.getProducts)

router.get('/edit/:id', isAdmin, adminController.getEditProduct)

router.post('/update/:id', isAdmin, adminController.postEditProduct)

router.delete('/delete/:id', isAdmin, adminController.deleteProduct)

router.get('/get-users', isAdmin, adminController.getUsers)

router.get('/get-users/:id', isAdmin, adminController.getUsersHistory)

router.get('/get-orders', isAdmin, adminController.getOrders)

module.exports = router