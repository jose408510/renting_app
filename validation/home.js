const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateHome(data) {
  let errors = {};

  data.street = !isEmpty(data.street) ? data.street : '';
  data.zip = !isEmpty(data.zip) ? data.zip : '';
  data.state = !isEmpty(data.state) ? data.state : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.addinfo = !isEmpty(data.addinfo) ? data.addinfo : '';
  data.yearbuilt = !isEmpty(data.yearbuilt) ? data.yearbuilt : '';
  data.rooms = !isEmpty(data.rooms) ? data.rooms : '';
  data.bathroom = !isEmpty(data.bathroom) ? data.bathroom : '';
  data.parking = !isEmpty(data.parking) ? data.parking : '';
  data.price = !isEmpty(data.price) ? data.price : '';

  if (Validator.isEmpty(data.street)) {
    errors.street = 'Street is required';
  }

  if (Validator.isEmpty(data.zip)) {
    errors.zip = 'Zip is required';
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = 'State is required';
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = 'City is required';
  }
  if (Validator.isEmpty(data.addinfo)) {
    errors.addinfo = 'Additional information field is required';
  }
  if (Validator.isEmpty(data.yearbuilt)) {
    errors.yearbuilt = 'Year built is required';
  }
  if (Validator.isEmpty(data.rooms)) {
    errors.rooms = 'Rooms field is required';
  }
  if (Validator.isEmpty(data.bathroom)) {
    errors.bathroom = 'bathroom field is required';
  }
  if (Validator.isEmpty(data.parking)) {
    errors.parking = 'Parking field is required';
  }
  if (Validator.isEmpty(data.price)) {
    errors.price = 'Price field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};