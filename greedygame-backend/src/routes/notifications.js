// src/routes/notifications.js
const express = require('express');
const { auth } = require('../middleware/auth');
const ctrl = require('../controllers/notificationController');
const router = express.Router();
router.use(auth);

router.get('/', ctrl.getNotifications);

module.exports = router;
