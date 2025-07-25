import { body, param, query, validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: errors.array()
      }
    });
  }
  
  next();
};

// User validation rules
export const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('mode')
    .optional()
    .isIn(['beginner', 'intermediate'])
    .withMessage('Mode must be either beginner or intermediate'),
  handleValidationErrors
];

export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Template validation rules
export const validateTemplateId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid template ID'),
  handleValidationErrors
];

// Progress validation rules
export const validateProgress = [
  body('templateId')
    .isMongoId()
    .withMessage('Invalid template ID'),
  body('completedSteps')
    .isArray()
    .withMessage('Completed steps must be an array'),
  body('completedSteps.*')
    .isString()
    .withMessage('Each completed step must be a string'),
  handleValidationErrors
];

// Query validation rules
export const validateQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('category')
    .optional()
    .isIn(['frontend', 'backend', 'fullstack', 'mobile', 'testing'])
    .withMessage('Invalid category'),
  query('difficulty')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Invalid difficulty level'),
  handleValidationErrors
];