import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const users = [
  {
    name: 'Demo User',
    username: 'demo',
    email: 'demo@codecompass.com',
    password: 'demo123',
    isBeginnerMode: true
  },
  {
    name: 'Advanced User',
    username: 'advanced',
    email: 'advanced@codecompass.com',
    password: 'advanced123',
    isBeginnerMode: false
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await User.deleteMany({});
  for (const user of users) {
    const newUser = new User(user);
    await newUser.save();
  }
  console.log('Demo users seeded!');
  mongoose.disconnect();
}

seed(); 