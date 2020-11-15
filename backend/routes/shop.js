const express = require('express');

const router = express.Router()

router.get('/test', (req, res, next) => {
    console.log('get dziala');
    next()
})

module.exports = router