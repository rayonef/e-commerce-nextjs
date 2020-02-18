
import mongoose from 'mongoose';
 
const { String, Number, ObjectId } = mongoose.Schema.Types;
 
const OrderSchema = new mongoose.Schema({
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
  ],
  email: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});
console.log(mongoose.models);
const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
module.exports = Order; 