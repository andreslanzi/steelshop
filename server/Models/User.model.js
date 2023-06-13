const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    role: String
  },
  {
    versionKey: false
  }
);

const User = mongoose.model('users', userSchema);

module.exports = User;
