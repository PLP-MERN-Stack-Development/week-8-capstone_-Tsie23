import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userProgressSchema = new mongoose.Schema({
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
    required: true
  },
  completedSteps: [{
    type: String,
    required: true
  }],
  lastAccessedAt: {
    type: Date,
    default: Date.now
  },
  timeSpent: {
    type: Number,
    default: 0
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  mode: {
    type: String,
    enum: ['beginner', 'intermediate'],
    default: 'beginner'
  },
  progress: [userProgressSchema],
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    },
    notifications: {
      type: Boolean,
      default: true
    },
    language: {
      type: String,
      default: 'en'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLoginAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for performance
userSchema.index({ email: 1 });
userSchema.index({ 'progress.templateId': 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update progress method
userSchema.methods.updateProgress = function(templateId, completedSteps) {
  const existingProgress = this.progress.find(p => 
    p.templateId.toString() === templateId.toString()
  );
  
  if (existingProgress) {
    existingProgress.completedSteps = completedSteps;
    existingProgress.lastAccessedAt = new Date();
  } else {
    this.progress.push({
      templateId,
      completedSteps,
      lastAccessedAt: new Date()
    });
  }
  
  return this.save();
};

// Get user progress for template
userSchema.methods.getProgressForTemplate = function(templateId) {
  return this.progress.find(p => 
    p.templateId.toString() === templateId.toString()
  );
};

export default mongoose.model('User', userSchema);