/**
 * @file Sanitizers transform the input in the specified format.
 * If it is not possible, or the function returns undefined. This is useful
 * for validation and for document updating.
 */

const validator = require('validator')
const customValidators = require('./validators')

module.exports.toInt = (value) => {
  if (value !== undefined)
    return validator.toInt(value + '')
}

module.exports.toPositiveInt = (value) => {
  if (customValidators.isPositiveInt(value))
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
  if (customValidators.isPassword(value))
    return module.exports.toString(value)
}

module.exports.toMongoId = (value) => {
  if (customValidators.isMongoId(value)) {
    return module.exports.toString(value)
  }
}

module.exports.toPhone = (value) => {
  if (customValidators.isPhoneNumber(value)) {
    return module.exports.toString(value)
  }
}

module.exports.toFloat = (value) => {
  if (value !== undefined)
    return validator.toFloat(value + '')
}

module.exports.toPercent = (value) => {
  if (customValidators.isPercent(value))
    return validator.toFloat(value + '')
}

module.exports.toPositiveFloat = (value) => {
  if (customValidators.isPositiveFloat(value))
    return validator.toFloat(value + '')
}

module.exports.toEmail = (value) => {
  if (customValidators.isEmail(value))
    return module.exports.toString(value)
}

/**
 * Takes an array as input, and tries to sanitize all elements of it, using
 * the given functions in the second parameter. If only one object cannot be
 * sanitized, the function returns undefined.
 */
module.exports.toArray = (array, itemSanitizers) => {
  // esegui sanitization per tutti gli oggetti; se anche solo un oggetto ha un undefined, invalida
  if (customValidators.isArray(array) && array.length >= 0) {
    const allItemsValid = array.map(item => {
      Object.entries(item).
        map(([key, value]) => {
          if (itemSanitizers[key]) {
            return itemSanitizers[key](value);
          }
          return undefined;
        }).reduce(((prev, curr) => prev !== undefined && curr !== undefined),
          true);
    });

    if (allItemsValid) {
      return array;
    }
  }
}

/**
 * Works like {@link toArray}, but taking a single sanitizer function as
 * second parameter, that will be applied to the whole object, rather than to
 * each field.
 */
module.exports.toArrayOfSchemas = (array, itemSanitizer) => {
  if (customValidators.isArray(array)) {
    const allItemsValid = array.map(item => itemSanitizer(item))
     .reduce(((prev, curr) => prev !== undefined && curr !== undefined) ,true);

    if (allItemsValid) {
      return array;
    }
  }
}

module.exports.toArrayOfServices = (array) => {
  return module.exports.toArrayOfSchemas(array, module.exports.toService);
}

module.exports.toArrayOfUmbrellas = (array) => {
  return module.exports.toArrayOfSchemas(array, module.exports.toUmbrella);
}

module.exports.toService = (value) => {
  if (customValidators.isService(value)) {
    return value;
  }
}

module.exports.toUmbrella = (value) => {
  if (customValidators.isUmbrella(value)) {
      return value;
  }
}

module.exports.toUmbrellaRange = async (fromUmbrella, toUmbrella, rankModel, properId) => {
  if (await customValidators.isValidUmbrellaRange(fromUmbrella, toUmbrella, rankModel, properId)) {
    return {
      fromUmbrella: module.exports.toInt(fromUmbrella),
      toUmbrella: module.exports.toInt(toUmbrella)
    }
  }
  return { fromUmbrella: undefined, toUmbrella: undefined }
}
