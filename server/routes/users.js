import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.toJSON());
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user preferences
router.put('/preferences', auth, [
  body('isBeginnerMode').optional().isBoolean(),
  body('darkMode').optional().isBoolean(),
  body('selectedProject').optional().isString().trim(),
  body('notifications').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { isBeginnerMode, darkMode, selectedProject, notifications } = req.body;
    
    const updateData = {};
    if (typeof isBeginnerMode === 'boolean') updateData.isBeginnerMode = isBeginnerMode;
    if (typeof darkMode === 'boolean') updateData['preferences.darkMode'] = darkMode;
    if (selectedProject) updateData['preferences.selectedProject'] = selectedProject;
    if (typeof notifications === 'boolean') updateData['preferences.notifications'] = notifications;

    const user = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.toJSON());
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Mark project as completed
router.post('/complete-project', auth, [
  body('projectId').notEmpty().withMessage('Project ID is required'),
  body('progress').optional().isInt({ min: 0, max: 100 }).withMessage('Progress must be between 0 and 100')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { projectId, progress = 100 } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if project already completed
    const existingProject = user.completedProjects.find(
      project => project.projectId === projectId
    );
    
    if (existingProject) {
      // Update progress if higher
      if (progress > existingProject.progress) {
        existingProject.progress = progress;
        existingProject.completedAt = new Date();
      }
    } else {
      // Add new completed project
      user.completedProjects.push({ 
        projectId, 
        progress,
        completedAt: new Date()
      });
    }
    
    await user.save();
    
    res.json({ 
      message: 'Project progress updated successfully',
      completedProjects: user.completedProjects
    });
  } catch (error) {
    console.error('Complete project error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get user statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const stats = {
      totalProjects: user.completedProjects.length,
      completionPercentage: user.completionPercentage,
      lastLogin: user.lastLogin,
      memberSince: user.createdAt,
      isBeginnerMode: user.isBeginnerMode,
      recentProjects: user.completedProjects
        .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
        .slice(0, 5)
    };

    res.json(stats);
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, [
  body('name').optional().trim().isLength({ min: 1, max: 50 }).withMessage('Name must be between 1 and 50 characters'),
  body('username').optional().trim().isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { name, username } = req.body;
    const updateData = {};
    
    if (name) updateData.name = name;
    if (username) {
      // Check if username is already taken
      const existingUser = await User.findOne({ 
        username, 
        _id: { $ne: req.userId } 
      });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }
      updateData.username = username;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.toJSON());
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;