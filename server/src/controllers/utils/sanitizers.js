/*
 * Sanitizers functions are thought to transform the input in the specified
 * format. If it is not possible, or the input is undefined, they return undefined.
 */

const validator = require('validator');
const myValidators = require('validators');

module.exports.toInt = (value) => {
  if (value !== undefined)
    return validator.toInt(value + '');
}

module.exports.toBool = (value) => {
  if (value !== undefined)
    return validator.toBoolean(value + '');
}

module.exports.toDate = (value) => {
  if (value !== undefined)
    return validator.toDate(value + '');
}

module.exports.toString = (value) => {
  if (value !== undefined)
    return validator.escape(value + '');
}

module.exports.toPassword = (value) => {
  if (myValidators.isPassword(value))
    return module.exports.toString(value);
}

module.exports.toMongoId = (value) => {
  if (myValidators.isMongoId(value)) {
    return module.exports.toString(value);
  }
}

module.exports.toPhone = (value) => {
  if (myValidators.isPhoneNumber(value)) {
    return module.exports.toString(value);
  }
}

module.exports.toFloat = (value) => {
  if (value !== undefined)
    return validator.toFloat(value + '');
}

module.exports.toEmail = (value) => {
  if(myValidators.isEmail())
    return module.exports.toString(value);
}
