const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 1, max: 300 })) {
    errors.text = 'Text field must be less than 300 characters';
  }
  if (!Validator.isLength(data.text, { min: 1, max: 300 })) {
    errors.text = 'Text field must be less than 300 characters';
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field can't be empty";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
