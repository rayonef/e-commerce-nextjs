
import mongoose from 'mongoose';
 
const { Number, ObjectId } = mongoose.Schema.Types;
 
const CartSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  products: [
    {
      quantity: {
        type: Number,
        default: 1
      },
      product: {
        type: ObjectId,
        ref: 'Product'
      }
    }
  ]
}, {
  timestamps: true
});
const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);
module.exports = Cart; 