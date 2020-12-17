const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please type product name"],
    },
    price: {
        type: Number,
        required: [true, "Please type price"]
    },
    image: {
        type: String,
        required: [true, "Please add image"],
    }
})

module.exports = mongoose.model('Product', productSchema, 'products');