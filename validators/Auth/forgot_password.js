const { body } = require('express-validator');
const validatorResult = require('../../middlewares/validator/validator')

exports.forgotPasswordValidator = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(), validatorResult
];