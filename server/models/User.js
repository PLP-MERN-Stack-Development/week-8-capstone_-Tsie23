import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [20, 'Username cannot exceed 20 characters'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  isBeginnerMode: {
    type: Boolean,
    default: true
  },
  completedProjects: [{
    projectId: {
      type: String,
      required: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 100,
      min: 0,
      max: 100
    }
  }],
  preferences: {
    darkMode: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    },
    mode: {
      type: String,
      enum: ['beginner', 'intermediate'],
      default: 'beginner'
    },
    selectedProject: {
      type: String,
      default: ''
    },
    selectedProject: {
      type: String,
      default: 'mern'
    },
    notifications: {
      type: Boolean,
      default: true
    }
  },
  completedProjects: [{
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for completion percentage
userSchema.virtual('completionPercentage').get(function() {
  if (this.completedProjects.length === 0) return 0;
  const totalProgress = this.completedProjects.reduce((sum, project) => sum + project.progress, 0);
  return Math.round(totalProgress / this.completedProjects.length);
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update lastLogin on login
userSchema.pre('findOneAndUpdate', function(next) {
  if (this.getUpdate().$set && this.getUpdate().$set.lastLogin) {
    this.getUpdate().$set.lastLogin = new Date();
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get user without password
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export default mongoose.model('User', userSchema);