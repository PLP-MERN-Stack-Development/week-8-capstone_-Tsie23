import express from 'express';
import Template from '../models/Template.js';
import { authenticate } from '../middleware/auth.js';
import { validateTemplateId, validateQuery } from '../middleware/validation.js';

const router = express.Router();

// @route   GET /api/templates
// @desc    Get all templates
// @access  Public
router.get('/', validateQuery, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      difficulty,
      search
    } = req.query;

    const query = { isPublished: true };
    
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const templates = await Template.find(query)
      .select('-fileStructure -dependencies -codeFlow')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Template.countDocuments(query);

    res.json({
      success: true,
      data: templates,
      meta: {
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch templates',
        code: 'FETCH_ERROR'
      }
    });
  }
});

// @route   GET /api/templates/:id
// @desc    Get template by ID
// @access  Public
router.get('/:id', validateTemplateId, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    
    if (!template || !template.isPublished) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Template not found',
          code: 'NOT_FOUND'
        }
      });
    }

    // Increment view count
    await template.incrementViews();

    res.json({
      success: true,
      data: template
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch template',
        code: 'FETCH_ERROR'
      }
    });
  }
});

// @route   GET /api/templates/slug/:slug
// @desc    Get template by slug
// @access  Public
router.get('/slug/:slug', async (req, res) => {
  try {
    const template = await Template.findOne({ 
      slug: req.params.slug,
      isPublished: true 
    });
    
    if (!template) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Template not found',
          code: 'NOT_FOUND'
        }
      });
    }

    // Increment view count
    await template.incrementViews();

    res.json({
      success: true,
      data: template
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch template',
        code: 'FETCH_ERROR'
      }
    });
  }
});

// @route   GET /api/templates/categories/stats
// @desc    Get template statistics by category
// @access  Public
router.get('/categories/stats', async (req, res) => {
  try {
    const stats = await Template.aggregate([
      { $match: { isPublished: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgRating: { $avg: '$stats.rating' },
          totalViews: { $sum: '$stats.views' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch statistics',
        code: 'STATS_ERROR'
      }
    });
  }
});

export default router;