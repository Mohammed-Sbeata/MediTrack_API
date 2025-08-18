const { param, validationResult } = require('express-validator');

exports.deleteMediValidator = [
  param('id').isMongoId().withMessage('Invalid medicine ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    next();
  }
];
