import mongoose from 'mongoose';

const fileStructureSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  dependencies: [{
    type: String
  }],
  order: {
    type: Number,
    required: true
  },
  boilerplate: {
    type: String,
    default: ''
  }
}, { _id: false });

// Add the self-referencing children field after schema creation
fileStructureSchema.add({
  children: [fileStructureSchema]
});

const codeFlowSchema = new mongoose.Schema({
  step: {
    type: Number,
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
  code: {
    type: String,
    default: ''
  },
  estimatedTime: {
    type: Number, // in minutes
    default: 30
  }
}, { _id: false });

const projectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  tech: [{
    type: String,
    required: true
  }],
  color: {
    type: String,
    default: 'bg-gradient-to-r from-blue-500 to-purple-500'
  },
  icon: {
    type: String,
    default: 'Code'
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  estimatedHours: {
    type: Number,
    default: 10
  },
  fileStructure: [fileStructureSchema],
  codeFlow: [codeFlowSchema],
  dependencies: [{
    type: String,
    required: true
  }],
  setupInstructions: [{
    type: String,
    required: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  prerequisites: [{
    type: String
  }],
  learningObjectives: [{
    type: String
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for total files count
projectSchema.virtual('totalFiles').get(function() {
  const countFiles = (nodes) => {
    let count = 0;
    nodes.forEach(node => {
      if (node.type === 'file') count++;
      if (node.children) count += countFiles(node.children);
    });
    return count;
  };
  return countFiles(this.fileStructure);
});

// Index for better search performance
projectSchema.index({ name: 'text', description: 'text', tags: 'text' });
projectSchema.index({ isActive: 1, featured: -1 });
projectSchema.index({ difficulty: 1 });

export default mongoose.model('Project', projectSchema);