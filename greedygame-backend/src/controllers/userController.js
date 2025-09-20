// src/controllers/userController.js
const User = require('../models/User');

exports.getMe = async (req, res) => {
  res.json({ user: req.user });
};

exports.updateMe = async (req, res) => {
  try {
    const { name, avatarUrl } = req.body;
    if (name) req.user.name = name;
    if (avatarUrl !== undefined) req.user.avatarUrl = avatarUrl;
    await req.user.save();
    res.json({ user: req.user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Superuser endpoints:
exports.listUsers = async (req, res) => {
  const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
  res.json({ users });
};

exports.setRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body; // expected 'user' or 'superuser'
    if (!['user','superuser'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.role = role;
    await user.save();
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
