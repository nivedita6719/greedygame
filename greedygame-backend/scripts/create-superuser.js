// scripts/create-superuser.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../src/models/User');

async function main() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/greedygame';
  await mongoose.connect(uri);
  const email = process.env.SUPERUSER_EMAIL || 'admin@greedygame.local';
  const name = process.env.SUPERUSER_NAME || 'Admin';
  const pass = process.env.SUPERUSER_PASSWORD || 'AdminPass123';

  let user = await User.findOne({ email });
  if (user) {
    user.role = 'superuser';
    await user.save();
    console.log('Superuser role assigned to existing user', email);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(pass, 10);
  user = await User.create({ name, email, passwordHash, role: 'superuser' });
  console.log('Superuser created:', email);
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
