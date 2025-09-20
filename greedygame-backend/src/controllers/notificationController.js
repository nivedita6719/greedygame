// src/controllers/notificationController.js
const Todo = require('../models/Todo');

exports.getNotifications = async (req, res) => {
  const now = new Date();
  const in4h = new Date(now.getTime() + 4 * 60 * 60 * 1000);

  // upcoming due in next 4 hours and not completed
  const upcoming = await Todo.find({
    user: req.user._id,
    status: 'upcoming',
    dueAt: { $gte: now, $lte: in4h }
  }).sort({ dueAt: 1 });

  // recently completed (you can filter timeframe if wanted)
  const completed = await Todo.find({
    user: req.user._id,
    status: 'completed'
  }).sort({ updatedAt: -1 }).limit(20);

  res.json({ upcoming, completed });
};
