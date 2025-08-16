const { body } = require('express-validator');
const validatorResult = require('../../middlewares/validator/validator')


exports.loginValidator = [
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .exists()
    .withMessage('Password is required'),
  (req, res, next) => {
    if (!req.body.email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email is required' 
      });
    }
    next();
  }, validatorResult
];