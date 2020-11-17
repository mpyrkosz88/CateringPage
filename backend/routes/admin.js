const express = require('express');

const router = express.Router()

const shopController = require('../controllers/shop');

// router.get('/', shopController.funkcja)

router.post('/add', (req, res, next) => {
    console.log('post dziala');
    next()
})

router.get('/test', (req, res, next) => {
    console.log('get dziala');
    next()
})

module.exports = router