// src/routes/users.js
// const express = require('express');
// const { auth, requireRole } = require('../middleware/auth');
// const ctrl = require('../controllers/userController');
// const router = express.Router();

// router.use(auth);

// router.get('/me', ctrl.getMe);
// router.patch('/me', ctrl.updateMe);

// // Superuser-only
// router.get('/', requireRole('superuser'), ctrl.listUsers);
// router.patch('/:id/role', requireRole('superuser'), ctrl.setRole);

// module.exports = router;
// const multer = require('multer')
// const path = require('path')
// const fs = require('fs')

// const uploadDir = path.join(__dirname, '../../uploads')
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// })

// const upload = multer({ storage })

// // New endpoint for avatar upload
// router.post('/me/avatar', auth, upload.single('avatar'), async (req, res) => {
//   req.user.avatarUrl = `/uploads/${req.file.filename}`
//   await req.user.save()
//   res.json({ user: req.user })
// })
// src/routes/users.js
const express = require("express");
const { auth, requireRole } = require("../middleware/auth");
const ctrl = require("../controllers/userController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// ----------------- Existing routes -----------------
router.use(auth);

router.get("/me", ctrl.getMe);
router.patch("/me", ctrl.updateMe);

// Superuser-only
router.get("/", requireRole("superuser"), ctrl.listUsers);
router.patch("/:id/role", requireRole("superuser"), ctrl.setRole);

// ----------------- Avatar Upload -----------------
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Endpoint for avatar upload
router.post("/me/avatar", auth, upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // save uploaded file path to user model
    req.user.avatarUrl = `/uploads/${req.file.filename}`;
    await req.user.save();

    res.json({ user: req.user });
  } catch (err) {
    console.error("Avatar upload error:", err.message);
    res.status(500).json({ error: "Failed to upload avatar" });
  }
});

// ----------------- Export router -----------------
module.exports = router;
