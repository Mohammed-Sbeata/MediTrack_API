const { body, validationResult } = require('express-validator');

exports.addMediValidator = [
  body('name').notEmpty().withMessage('Medicine name is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  body('doses')
    .isArray({ min: 1 })
    .withMessage('Doses must be an array with at least one time'),
  body('doses.*.time')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Each dose time must be in HH:MM format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    next();
  }
];
