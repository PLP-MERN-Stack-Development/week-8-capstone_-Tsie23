import express from 'express';
import Project from '../models/Project.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all projects with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      difficulty, 
      tech, 
      featured, 
      search 
    } = req.query;

    // Build filter object
    const filter = { isActive: true };
    
    if (difficulty) filter.difficulty = difficulty;
    if (featured !== undefined) filter.featured = featured === 'true';
    if (tech) filter.tech = { $in: tech.split(',') };
    if (search) {
      filter.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get projects with pagination
    const projects = await Project.find(filter)
      .select('-fileStructure -codeFlow') // Exclude large fields for list view
      .sort({ featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Project.countDocuments(filter);

    res.json({
      projects,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        hasNext: skip + projects.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get project by ID with full details
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ 
      id: req.params.id, 
      isActive: true 
    });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get featured projects
router.get('/featured/list', async (req, res) => {
  try {
    const projects = await Project.find({ 
      isActive: true, 
      featured: true 
    })
    .select('-fileStructure -codeFlow')
    .sort({ createdAt: -1 })
    .limit(6);

    res.json(projects);
  } catch (error) {
    console.error('Get featured projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get project statistics
router.get('/:id/stats', async (req, res) => {
  try {
    const project = await Project.findOne({ 
      id: req.params.id, 
      isActive: true 
    });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const stats = {
      totalFiles: project.totalFiles,
      dependencies: project.dependencies.length,
      setupSteps: project.setupInstructions.length,
      codeFlowSteps: project.codeFlow.length,
      estimatedHours: project.estimatedHours,
      difficulty: project.difficulty
    };

    res.json(stats);
  } catch (error) {
    console.error('Get project stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new project (admin only)
router.post('/', auth, async (req, res) => {
  try {
    // In a real app, you'd check if user is admin
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Project ID already exists' });
    }
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update project (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete project (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { id: req.params.id },
      { isActive: false },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;