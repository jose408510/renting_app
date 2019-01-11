const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateInfo(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.bio = !isEmpty(data.bio) ? data.bio : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.state = !isEmpty(data.state) ? data.state : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'School field is required';
  }

  if (Validator.isEmpty(data.bio)) {
    errors.bio = 'Degree field is required';
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Field of study field is required';
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = 'From date field is required';
  }
  if (Validator.isEmpty(data.state)) {
    errors.state = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};