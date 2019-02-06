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
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.bio)) {
    errors.bio = 'Bio field is required';
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Phone field is required';
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = 'City Field is required';
  }
  if (Validator.isEmpty(data.state)) {
    errors.state = 'State Field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

/// might not need this validation..
