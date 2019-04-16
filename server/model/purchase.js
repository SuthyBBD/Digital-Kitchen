const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {normalizeErrors} = require('../helpers/mongoose');

const purchaseSchema = new Schema({
  totalPrice: Number,
  quantity: Number,
  createdAt: {type: Date, default: Date.now},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  product: {type: Schema.Types.ObjectId, ref: 'Product'}
});

//Sending the model to database
module.exports = mongoose.model('Purchase', purchaseSchema);


// bookingSchema.pre('remove', function(next) {
//    this.model('User').update({'_id': this.user}, {$pull: {bookings: this._id}}, () => {
//       next();
//    })
// })

