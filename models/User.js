const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  // verificationToken: { type: String, default: null },
  // resetToken: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
