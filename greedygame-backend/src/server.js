// src/server.js
require('dotenv').config();
const path = require("path");

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const todoRoutes = require('./routes/todos');
const notiRoutes = require('./routes/notifications');

const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/notifications', notiRoutes);

app.get('/', (req,res) => res.send('GreedyGame Backend API'));

const PORT = process.env.PORT || 4000;

connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));
}).catch(err => {
  console.error('DB connection failed', err);
});
