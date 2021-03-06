const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    products: [
        {
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true
          },
          quantity: {
            type: Number,
            required: true
          },
        }
      ],
      user: {
        email: {
          type: String,
          required: true
        },
        userId: {
          type: String,
          required: true,
          ref: 'User'
        }
      },
      comments: {
        type: String,
      },
      timeDate: {
        type: String,
        required: true
      }
},
// { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema);