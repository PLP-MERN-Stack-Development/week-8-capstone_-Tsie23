import express from 'express';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';
import { validateProgress } from '../middleware/validation.js';

const router = express.Router();

// @route   GET /api/users/progress
// @desc    Get user's learning progress
// @access  Private
router.get('/progress', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('progress.templateId', 'name slug category difficulty');

    res.json({
      success: true,
      data: {
        progress: user.progress
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch progress',
        code: 'PROGRESS_ERROR'
      }
    });
  }
});

// @route   PUT /api/users/progress
// @desc    Update user's learning progress
// @access  Private
router.put('/progress', authenticate, validateProgress, async (req, res) => {
  try {
    const { templateId, completedSteps } = req.body;

    const user = await User.findById(req.user._id);
    await user.updateProgress(templateId, completedSteps);

    res.json({
      success: true,
      message: 'Progress updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to update progress',
        code: 'PROGRESS_UPDATE_ERROR'
      }
    });
  }
});

// @route   GET /api/users/progress/:templateId
// @desc    Get progress for specific template
// @access  Private
router.get('/progress/:templateId', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const progress = user.getProgressForTemplate(req.params.templateId);

    if (!progress) {
      return res.json({
        success: true,
        data: {
          progress: {
            templateId: req.params.templateId,
            completedSteps: [],
            lastAccessedAt: null
          }
        }
      });
    }

    res.json({
      success: true,
      data: {
        progress
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch template progress',
        code: 'TEMPLATE_PROGRESS_ERROR'
      }
    });
  }
});

// @route   GET /api/users/stats
// @desc    Get user learning statistics
// @access  Private
router.get('/stats', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('progress.templateId', 'name category difficulty');

    const stats = {
      totalTemplatesStarted: user.progress.length,
      totalStepsCompleted: user.progress.reduce((total, p) => total + p.completedSteps.length, 0),
      categoriesExplored: [...new Set(user.progress.map(p => p.templateId.category))],
      averageProgress: user.progress.length > 0 
        ? user.progress.reduce((total, p) => total + p.completedSteps.length, 0) / user.progress.length 
        : 0,
      lastActivity: user.progress.length > 0 
        ? Math.max(...user.progress.map(p => new Date(p.lastAccessedAt).getTime()))
        : null
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch user statistics',
        code: 'USER_STATS_ERROR'
      }
    });
  }
});

export default router;