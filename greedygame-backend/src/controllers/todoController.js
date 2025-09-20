// src/controllers/todoController.js
const { validationResult } = require('express-validator');
const Todo = require('../models/Todo');

const ensureFutureDate = (date) => {
  return new Date(date) > new Date();
};

exports.createTodo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, description, dueAt } = req.body;
    if (!ensureFutureDate(dueAt)) return res.status(400).json({ message: 'dueAt must be in the future' });

    const todo = await Todo.create({
      user: req.user._id,
      title, description, dueAt
    });
    res.json({ todo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listTodos = async (req, res) => {
  const { status } = req.query;
  const q = { user: req.user._id };
  if (status) q.status = status;
  const todos = await Todo.find(q).sort({ dueAt: 1 });
  res.json({ todos });
};

exports.getTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ message: 'Not found' });
  if (!todo.user.equals(req.user._id) && req.user.role !== 'superuser')
    return res.status(403).json({ message: 'Forbidden' });
  res.json({ todo });
};

exports.updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ message: 'Not found' });
  if (!todo.user.equals(req.user._id) && req.user.role !== 'superuser')
    return res.status(403).json({ message: 'Forbidden' });

  const { title, description, dueAt, status } = req.body;
  if (dueAt && !ensureFutureDate(dueAt)) return res.status(400).json({ message: 'dueAt must be future' });

  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (dueAt !== undefined) todo.dueAt = dueAt;
  if (status !== undefined && ['upcoming','completed'].includes(status)) todo.status = status;

  await todo.save();
  res.json({ todo });
};

exports.deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ message: 'Not found' });
  if (!todo.user.equals(req.user._id) && req.user.role !== 'superuser')
    return res.status(403).json({ message: 'Forbidden' });
  await todo.remove();
  res.json({ message: 'Deleted' });
};
