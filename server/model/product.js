const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  brand: {type: String, required: true, max: [30, 'Character limit exceeded']},
  name: {type: String, required: true, max: [128, 'Character limit exceeded']},
  description: {type: String, required: true, max: [128, 'Character limit exceeded']},
  retailPrice: {type: Number, required: true},
  dkPrice: {type: Number, required: true},
  image: {type: String, required: true},
  createdDate: {type: Date, default: Date.now},
  active: Boolean,
  stockCount: Number
});

module.exports = mongoose.model('Product', productSchema);
