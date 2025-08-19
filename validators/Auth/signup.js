const validations = require('./validation');
const validatorResult = require('../../middlewares/Validator/validator');

exports.signupValidator = [
  validations.nameValidation,
  validations.emailValidation,
  validations.passwordValidation,
  validations.birthValidation,
  validations.genderValidation,
  validatorResult
];
