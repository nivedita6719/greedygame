// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String }, // not present for Google-only accounts
  googleId: { type: String, default: null },
  avatarUrl: { type: String, default: null },
  role: { type: String, enum: ['user','superuser'], default: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
