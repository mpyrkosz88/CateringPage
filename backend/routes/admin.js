const express = require('express');

const router = express.Router()

const adminController = require('../controllers/admin');

router.post('/add', adminController.postAddProducts)

router.get('/edit', adminController.getProducts)

router.get('/edit/:id', adminController.getEditProduct)

router.post('/update/:id', adminController.postEditProduct)

router.delete('/delete/:id', adminController.deleteProduct)


module.exports = router