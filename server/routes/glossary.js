import express from 'express';
import GlossaryTerm from '../models/GlossaryTerm.js';
import { validateQuery } from '../middleware/validation.js';

const router = express.Router();

// @route   GET /api/glossary
// @desc    Get all glossary terms
// @access  Public
router.get('/', validateQuery, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      category,
      difficulty,
      search
    } = req.query;

    const query = { isPublished: true };
    
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$text = { $search: search };
    }

    const terms = await GlossaryTerm.find(query)
      .sort(search ? { score: { $meta: 'textScore' } } : { term: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await GlossaryTerm.countDocuments(query);

    res.json({
      success: true,
      data: terms,
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
        message: 'Failed to fetch glossary terms',
        code: 'FETCH_ERROR'
      }
    });
  }
});

// @route   GET /api/glossary/search
// @desc    Search glossary terms
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Search query is required',
          code: 'MISSING_QUERY'
        }
      });
    }

    const terms = await GlossaryTerm.find({
      $text: { $search: q },
      isPublished: true
    })
    .sort({ score: { $meta: 'textScore' } })
    .limit(20);

    res.json({
      success: true,
      data: terms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Search failed',
        code: 'SEARCH_ERROR'
      }
    });
  }
});

// @route   GET /api/glossary/categories
// @desc    Get all categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await GlossaryTerm.distinct('category', { isPublished: true });
    
    res.json({
      success: true,
      data: categories.sort()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch categories',
        code: 'CATEGORIES_ERROR'
      }
    });
  }
});

export default router;