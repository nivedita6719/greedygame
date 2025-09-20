// src/models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  dueAt: { type: Date, required: true, index: true },
  status: { type: String, enum: ['upcoming','completed'], default: 'upcoming' }
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);
