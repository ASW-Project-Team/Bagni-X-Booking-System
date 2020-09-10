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

module.exports.isInt = function (integer) {
  return integer !== undefined && validator.isInt(integer + "");
}


module.exports.isPositiveInt = function (integer) {
  return integer !== undefined && validator.isInt(integer + "") && validator.toInt(integer + '') >= 0;
}

module.exports.isFloat = (decimal) => {
  return decimal !== undefined && validator.isFloat(decimal + "");
}

module.exports.isPositiveFloat = (decimal) => {
  return decimal !== undefined && validator.isFloat(decimal + "") && validator.toFloat(decimal + '') >= 0;
}

module.exports.isBool = (boolean) => {
  return boolean !== undefined && validator.isBoolean(boolean + "");
}

module.exports.isArray = (value) => {
  return value !== undefined && Array.isArray(value);
}

module.exports.areFieldsValid = (...fields) => {
  return fields.filter(field => field === undefined).length === 0;
}


module.exports.isPercent = (value) => {
  const float = validator.toFloat(value + '');
  return module.exports.isFloat(value + '') && float >= 0 && float <= 1;
}

module.exports.isValidUmbrellaRange = async (fromUmbrella, toUmbrella, rankModel, properId) => {
  if (module.exports.isPositiveInt(fromUmbrella) && module.exports.isPositiveInt(toUmbrella)) {
    const fromUmbrellaInt = validator.toInt(fromUmbrella + '');
    const toUmbrellaInt = validator.toInt(toUmbrella + '');

    if (fromUmbrellaInt <= toUmbrellaInt) {
      let allRanks = await rankModel.find({});

      // exclude from the research th id of the rank, if present
      if (properId) {
        allRanks = allRanks.filter(rank => rank._id !== properId);
      }

      return allRanks.map(
        rank => (rank.toUmbrella < toUmbrellaInt) ||
          (rank.fromUmbrella < fromUmbrellaInt)).
        reduce((prev, curr) => prev && curr, true)
    }
  }
  return false;
}

module.exports.areDatesConsecutive = (dateFrom, dateTo) => {
  if (module.exports.isDate(dateFrom) && module.exports.isDate(dateTo)) {
    const dateFromObj = validator.toDate(dateFrom);
    const dateToObj = validator.toDate(dateTo);

    return dateFrom.getTime() <= dateTo.getTime();
  }
  return false;
}
