/*
 * Checks the given properties of the field, and also check whether the field is
 * undefined.
 */

const validator = require('validator');

const passwordPattern = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[\]:;<>,.?\/~_+-=|]).{8,32}$/);

module.exports.isNonEmptyString = function (string) {
  return string !== undefined && (typeof string === 'string' || string instanceof String) && string.length > 0 ;
}

module.exports.isEmail = function (string) {
  return string !== undefined && validator.isEmail(string + "");
}

module.exports.isDate = function (string) {
  return string !== undefined && validator.isISO8601(string + "");
}

module.exports.isPassword = function (string) {
  return string !== undefined && validator.matches(string + "", passwordPattern);
}

module.exports.isMongoId = function (string) {
  return string !== undefined && validator.isMongoId(string + "", passwordPattern);
}

module.exports.isPhoneNumber = function (string) {
  return string !== undefined && validator.isMobilePhone(string + "");
}

module.exports.isInteger = function (integer) {
  return integer !== undefined && validator.isInteger(integer + "");
}

module.exports.isFloat = (decimal) => {
  return decimal !== undefined && validator.isFloat(decimal + "");
}

module.exports.isBool = (boolean) => {
  return boolean !== undefined && validator.isBoolean(boolean + "");
}

module.exports.areFieldsValid = (...fields) => {
  return fields.filter(field => field === undefined).length === 0;
}
