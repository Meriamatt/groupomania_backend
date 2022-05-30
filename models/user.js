const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //name: { type: String},
  //lastName: { type: String},
  //bio: { type: String},
  //profileImageUrl: { type: String},
  isAdmin: { type: Boolean},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);