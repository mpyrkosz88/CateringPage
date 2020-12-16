const express = require('express');
const { body } = require('express-validator');

const router = express.Router()

const adminController = require('../controllers/admin');

const isAdmin = require('../middleware/is-admin');

router.post('/add',
    [
        body('name').isString(),
        body('price').isFloat()

    ],
    isAdmin, adminController.postAddProducts)

router.get('/edit', isAdmin, adminController.getProducts)

router.get('/edit/:id', isAdmin, adminController.getEditProduct)

router.post('/update/:id',
    [
        body('name').isString().isLength({min:5}).withMessage('Please enter longer name.'),
        body('price').isFloat()
    ],
    isAdmin, adminController.postEditProduct)

router.delete('/delete/:id', isAdmin, adminController.deleteProduct)

module.exports = router