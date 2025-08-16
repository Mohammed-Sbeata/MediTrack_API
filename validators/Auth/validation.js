const { body } = require('express-validator');
const User = require('../../models/user');

exports.firstNameValidation = body('first_name')
  .notEmpty().withMessage('First Name is Required')
  .trim()
  .isLength({ max: 30 })
  .withMessage('First Name must be less than 30 characters')
  .matches(/^[a-zA-Z\u0600-\u06FF]+$/)
  .withMessage('First Name can only contain letters');
exports.lastNameValidation = body('last_name')
  .notEmpty().withMessage('Last Name is Required')
  .trim()
  .isLength({ max: 30 })
  .withMessage('Last Name must be less than 30 characters')
  .matches(/^[a-zA-Z\u0600-\u06FF]+$/)
  .withMessage('Last Name can only contain letters');

exports.emailValidation = body('email')
  .trim().notEmpty().withMessage('Email is Required')
  .isEmail()
  .withMessage('Please provide a valid email')
  .normalizeEmail()
  .custom(async (value) => {
    const user = await User.findOne({ email: value });
    if (user) {
      throw new Error('Email already in use');
    }
  });

exports.passwordValidation = body('password').notEmpty().withMessage('Password is Required')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
  .withMessage('Password must contain at least one uppercase, one lowercase, one number and one special character');

exports.phoneValidation = body('phone')
.notEmpty().withMessage('Phone Number is Required')
.trim()
.isMobilePhone()
.withMessage('Please provide a valid phone number');
