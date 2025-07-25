import mongoose from 'mongoose';

const fileNodeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['file', 'folder'],
    required: true
  },
  path: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  boilerplate: String,
  tool: {
    type: String,
    required: true
  },
  imports: [String],
  exports: [String]
});

// Add recursive children field after schema is defined
fileNodeSchema.add({ children: [fileNodeSchema] });

const dependencySchema = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['import', 'component', 'api', 'data'],
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const codeFlowSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  files: [{
    type: String,
    required: true
  }],
  order: {
    type: Number,
    required: true
  }
});

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Template name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'fullstack', 'mobile', 'testing'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  fileStructure: [fileNodeSchema],
  dependencies: [dependencySchema],
  codeFlow: [codeFlowSchema],
  metadata: {
    estimatedTime: {
      type: Number,
      default: 0
    },
    prerequisites: [String],
    learningObjectives: [String]
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  stats: {
    views: {
      type: Number,
      default: 0
    },
    completions: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    }
  }
}, {
  timestamps: true
});

// Indexes for performance
templateSchema.index({ category: 1, difficulty: 1 });
templateSchema.index({ tags: 1 });
templateSchema.index({ slug: 1 });
templateSchema.index({ isPublished: 1 });

// Generate slug from name
templateSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Increment view count
templateSchema.methods.incrementViews = function() {
  this.stats.views += 1;
  return this.save();
};

export default mongoose.model('Template', templateSchema);