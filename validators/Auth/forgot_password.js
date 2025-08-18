const { body } = require('express-validator');
const validatorResult = require('../../middlewares/Validator/validator')

exports.forgotPasswordValidator = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(), validatorResult
];