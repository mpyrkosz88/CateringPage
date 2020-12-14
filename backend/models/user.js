const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "User",
  },
  userData: 
    {
      fname: {
        type: String,
        required: true,
      },
      lname: {
        type: String,
        required: true
      },
      street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      phone: {
        type: Number,
        required: true
      }
    }
  ,
  // resetToken:String,
  // resetTokenExpiration: Date,
  cart: {
    items: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSchema.methods.addToCart = function(item) {
  const cartItemIndex = this.cart.items.findIndex(cp => {
    return cp.itemId.toString() === item._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartItemIndex >= 0) {
    newQuantity = this.cart.items[cartItemIndex].quantity + 1;
    updatedCartItems[cartItemIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      itemId: item._id,
      quantity: newQuantity
    });
  }
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function(itemId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item._id.toString() !== itemId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function() {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
