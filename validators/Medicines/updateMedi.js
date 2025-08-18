const { body, validationResult } = require('express-validator');

exports.updateMediValidator = [
  body('name').optional().notEmpty().withMessage('Medicine name cannot be empty'),
  body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a positive integer'),
  body('doses').optional().isArray().withMessage('Doses must be an array'),
  body('doses.*.time')
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Each dose time must be in HH:MM format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    next();
  }
];
