const bcrypt = require('bcrypt'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    min: [4, 'Invalid length, cannot be less than 4 characters'],
    max: [32, 'Invalid length, cannot be greater than 32 characters']
  },
  email: {
    type: String,
    min: [4, 'Invalid length, cannot be less than 4 characters'],
    max: [32, 'Invalid length, cannot be greater than 32 characters'],
    unique: true,
    lowercase: true,
    required: 'Email is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    min: [4, 'Invalid length, cannot be less than 4 characters'],
    max: [32, 'Invalid length, cannot be greater than 32 characters'],
    required: 'Password is required'
  },
  isAdmin: {
    type: Boolean, default: false
  },
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  purchases: [{type: Schema.Types.ObjectId, ref: 'Purchase'}]
});

userSchema.methods.passwordMatch = function (requestedPassword) {

  return bcrypt.compareSync(requestedPassword, this.password);
};

userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      user.password = hash;
      next();
    });
  });
});


module.exports = mongoose.model('User', userSchema);
