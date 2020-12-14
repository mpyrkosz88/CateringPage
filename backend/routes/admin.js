const express = require('express');

const router = express.Router()

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is-auth');

router.post('/add', isAuth, adminController.postAddProducts)

router.get('/edit', isAuth, adminController.getProducts)

router.get('/edit/:id', isAuth, adminController.getEditProduct)

router.post('/update/:id', isAuth, adminController.postEditProduct)

router.delete('/delete/:id', isAuth, adminController.deleteProduct)


module.exports = router