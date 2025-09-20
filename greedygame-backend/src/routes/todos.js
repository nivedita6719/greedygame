// src/routes/todos.js
const express = require('express');
const { auth } = require('../middleware/auth');
const { body } = require('express-validator');
const ctrl = require('../controllers/todoController');

const router = express.Router();
router.use(auth);

router.post('/',
  body('title').notEmpty(),
  body('dueAt').notEmpty().isISO8601(),
  ctrl.createTodo
);

router.get('/', ctrl.listTodos);
router.get('/:id', ctrl.getTodo);
router.patch('/:id', ctrl.updateTodo);
router.delete('/:id', ctrl.deleteTodo);

module.exports = router;
