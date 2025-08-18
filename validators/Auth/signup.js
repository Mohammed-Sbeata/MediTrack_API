const validations = require('./validation')
const validatorResult = require('../../middlewares/Validator/validator')

exports.signupValidator = [
  validations.firstNameValidation,
  validations.lastNameValidation,
  validations.emailValidation,
  validations.passwordValidation,
  validations.phoneValidation,
  validatorResult
];