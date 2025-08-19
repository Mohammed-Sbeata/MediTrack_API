const { body } = require('express-validator');
const User = require('../../models/user');
const moment = require('moment'); // npm install moment


exports.nameValidation = body('name')
  .notEmpty().withMessage('Name is required')
  .trim()
  .isLength({ max: 50 })
  .withMessage('Name must be less than 50 characters')
  .matches(/^[a-zA-Z\u0600-\u06FF\s]+$/)
  .withMessage('Name can only contain letters and spaces');

exports.emailValidation = body('email')
  .trim()
  .notEmpty().withMessage('Email is required')
  .isEmail().withMessage('Please provide a valid email')
  .normalizeEmail()
  .custom(async (value) => {
    const user = await User.findOne({ email: value });
    if (user) {
      throw new Error('Email already in use');
    }
  });

exports.passwordValidation = body('password')
  .notEmpty().withMessage('Password is required')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
  .withMessage('Password must contain at least one uppercase, one lowercase, one number, and one special character');

  
exports.birthValidation = body('birth')
  .notEmpty().withMessage('Birth date is required')
  .custom((value) => {
    if (!moment(value, "DD-MM-YYYY", true).isValid()) {
      throw new Error("Birth date must be in DD-MM-YYYY format");
    }
    return true;
  });

exports.genderValidation = body('gender')
  .notEmpty().withMessage('Gender is required')
  .isIn(['Male', 'Female']).withMessage('Gender must be either Male or Female');
