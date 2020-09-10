/*
 * Sanitizers functions are thought to transform the input in the specified
 * format. If it is not possible, or the input is undefined, they return undefined.
 */

const validator = require('validator')
const myValidators = require('./validators')

module.exports.toInt = (value) => {
  if (value !== undefined)
    return validator.toInt(value + '')
}

module.exports.toPositiveInt = (value) => {
  if (myValidators.isPositiveInt(value))
    return validator.toInt(value + '')
}

module.exports.toBool = (value) => {
  if (value !== undefined)
    return validator.toBoolean(value + '')
}

module.exports.toDate = (value) => {
  if (value !== undefined)
    return validator.toDate(value + '')
}

module.exports.toString = (value) => {
  if (value !== undefined)
    return validator.escape(value + '')
}

module.exports.toPassword = (value) => {
  if (myValidators.isPassword(value))
    return module.exports.toString(value)
}

module.exports.toMongoId = (value) => {
  if (myValidators.isMongoId(value)) {
    return module.exports.toString(value)
  }
}

module.exports.toPhone = (value) => {
  if (myValidators.isPhoneNumber(value)) {
    return module.exports.toString(value)
  }
}

module.exports.toFloat = (value) => {
  if (value !== undefined)
    return validator.toFloat(value + '')
}

module.exports.toPositiveFloat = (value) => {
  if (myValidators.isPositiveFloat(value))
    return validator.toFloat(value + '')
}

module.exports.toEmail = (value) => {
  if (myValidators.isEmail(value))
    return module.exports.toString(value)
}



/**
 * Returns the array, if all items of the array are valid, following the
 * given properties.
 * @param {Array} array
 * @param {Object} fieldsValidators
 */
module.exports.toArray = (array, fieldsValidators) => {
  if (myValidators.isArray(array) && array.length > 0) {
    const allItemsValid =
      array.map(item =>
        Object.keys(item).
          map(key => fieldsValidators[key](item[key])).
          reduce((prev, curr) => prev && curr, true)).
        reduce((prev, curr) => prev && curr, true)

    if (allItemsValid) {
      return array
    }
  }
}


module.exports.toUmbrellaRange = async (fromUmbrella, toUmbrella, rankModel, properId) => {
  if (await myValidators.isValidUmbrellaRange(fromUmbrella, toUmbrella, rankModel, properId)) {
    const fromUmbrellaInt = validator.toInt(fromUmbrella + '');
    const toUmbrellaInt = validator.toInt(toUmbrella + '');
    return { fromUmbrella: fromUmbrellaInt, toUmbrella: toUmbrellaInt }
  }
  return { fromUmbrella: undefined, toUmbrella: undefined }
}
