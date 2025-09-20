// src/routes/auth.js
// const express = require('express');
// const { body } = require('express-validator');
// const ctrl = require('../controllers/authController');

// const router = express.Router();

// router.post('/register',
//   body('name').notEmpty(),
//   body('email').isEmail(),
//   body('password').isLength({ min: 6 }),
//   ctrl.register
// );

// router.post('/login', ctrl.login);

// // google login
// router.post('/google', ctrl.googleAuth);

// module.exports = router;
const express = require('express');
const ctrl = require('../controllers/authController');
const router = express.Router();

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.post('/google', ctrl.googleAuth);
router.post('/refresh', ctrl.refresh);
router.post('/logout', ctrl.logout);

module.exports = router;
