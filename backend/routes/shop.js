express = require('express');

const router = express.Router()

const shopController = require('../controllers/shop');

router.get('/menu', shopController.getProducts)


module.exports = router