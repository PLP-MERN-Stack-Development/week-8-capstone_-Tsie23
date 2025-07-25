import mongoose from 'mongoose';

const glossaryTermSchema = new mongoose.Schema({
  term: {
    type: String,
    required: [true, 'Term is required'],
    unique: true,
    trim: true,
    maxlength: [100, 'Term cannot exceed 100 characters']
  },
  definition: {
    type: String,
    required: [true, 'Definition is required'],
    maxlength: [1000, 'Definition cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Frontend', 'Backend', 'Database', 'General', 'Testing', 'DevOps']
  },
  examples: [{
    type: String,
    maxlength: [500, 'Example cannot exceed 500 characters']
  }],
  relatedTerms: [{
    type: String,
    trim: true
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  tags: [{
    type: String,
    trim: true
  }],
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for search performance
glossaryTermSchema.index({ term: 'text', definition: 'text' });
glossaryTermSchema.index({ category: 1 });
glossaryTermSchema.index({ difficulty: 1 });
glossaryTermSchema.index({ tags: 1 });

export default mongoose.model('GlossaryTerm', glossaryTermSchema);