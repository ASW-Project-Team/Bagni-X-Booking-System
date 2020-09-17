/**
 * @file The file contains the validators, that are functions used to check the
 * properties of a given object. Every validator returns true if the property
 * is fulfilled, and it is not undefined; false otherwise.
 */

const validator = require('validator');


module.exports.isNonEmptyString = (value) => {
  return value !== undefined && (typeof value === 'string' || value instanceof String) && value.length > 0 ;
}

module.exports.isEmail = (value) => {
  return value !== undefined && validator.isEmail(value + "");
}

module.exports.isDate = (value) => {
  return value !== undefined && validator.isISO8601(value + "");
}

module.exports.isPassword = (value) => {
  return value !== undefined && validator.matches(value + "",
    new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[\]:;<>,.?\/~_+-=|]).{8,32}$/));
}

module.exports.isMongoId = (value) => {
  return value !== undefined && validator.isMongoId(value + "");
}

module.exports.isPhoneNumber = (value) => {
  return value !== undefined && validator.isMobilePhone(value + "");
}

module.exports.isInt = (value) => {
  return value !== undefined && validator.isInt(value + "");
}

module.exports.isPositiveInt = (value) => {
  return value !== undefined && validator.isInt(value + "") && validator.toInt(value + '') >= 0;
}

module.exports.isFloat = (value) => {
  return value !== undefined && validator.isFloat(value + "");
}

module.exports.isPositiveFloat = (value) => {
  return value !== undefined && validator.isFloat(value + "") && validator.toFloat(value + '') >= 0;
}

module.exports.isBool = (value) => {
  return value !== undefined && validator.isBoolean(value + "");
}

module.exports.isArray = (value) => {
  return value !== undefined && Array.isArray(value);
}

module.exports.isPercent = (value) => {
  const float = validator.toFloat(value + '');
  return module.exports.isFloat(value + '') && float >= 0 && float <= 1;
}

const generateUmbrellas = (from, to) => {
  const umbrellas = [];

  for (let i = from; i <= to; i++) {
    umbrellas.push(i);
  }

  return umbrellas;
}

module.exports.isValidUmbrellaRange = async (fromUmbrella, toUmbrella, rankModel, properId) => {
  if (module.exports.isPositiveInt(fromUmbrella) && module.exports.isPositiveInt(toUmbrella)) {
    const fromUmbrellaInt = validator.toInt(fromUmbrella + '');
    const toUmbrellaInt = validator.toInt(toUmbrella + '');

    if (fromUmbrellaInt <= toUmbrellaInt) {
      let allRanks = await rankModel.find({});

      // exclude from the research th id of the rank, if present
      if (properId) {
        allRanks = allRanks.filter(rank => rank._id.toString() !== properId);
      }

      const newUmbrellas = generateUmbrellas(fromUmbrellaInt, toUmbrellaInt);

      const allUmbrellas = allRanks
          .map(rank => generateUmbrellas(rank.fromUmbrella, rank.toUmbrella))
          .reduce((prev, curr) => prev.concat(curr), newUmbrellas);

      return new Set(allUmbrellas).size === allUmbrellas.length
    }
  }
  return false;
}

module.exports.areDatesConsecutive = (dateFrom, dateTo) => {
  if (module.exports.isDate(dateFrom) && module.exports.isDate(dateTo)) {
    const dateFromObj = validator.toDate(dateFrom);
    const dateToObj = validator.toDate(dateTo);

    return dateFromObj.getTime() <= dateToObj.getTime();
  }
  return false;
}


module.exports.isService = (value) => {
  if (value !== undefined) {
    if(module.exports.isNonEmptyString(value.name)
      && module.exports.isNonEmptyString(value.description)
      && module.exports.isPositiveFloat(value.dailyPrice)
      && module.exports.isNonEmptyString(value.imageUrl)
      && module.exports.isMongoId(value.serviceId)) {
      return true;
    }
  }
  return false;
}

module.exports.isUmbrella = (value) => {
  if (value !== undefined) {
    if(module.exports.isPositiveInt(value.number)
      && module.exports.isRank(value.rankUmbrella)) {
      return true;
    }
  }
  return false;
}


module.exports.isRank = (value) => {
  if (value !== undefined) {
    if(module.exports.isNonEmptyString(value.name)
      && module.exports.isNonEmptyString(value.description)
      && module.exports.isPositiveFloat(value.dailyPrice)
      && module.exports.isPositiveInt(value.fromUmbrella)
      && module.exports.isPositiveInt(value.toUmbrella)
      && module.exports.isNonEmptyString(value.imageUrl)
      && module.exports.areSales(value.sales)
      && module.exports.isMongoId(value.rankUmbrellaId)) {
      return true;
    }
  }
  return false;
}

module.exports.areSales = (value) => {
  if (module.exports.isArray(value)) {
    const eachIsSale = value.map(item => {
      return module.exports.isPercent(item.percent)
        && module.exports.isDate(item.dateFrom)
        && module.exports.isDate(item.dateTo)
    }).reduce((prev, curr)=> prev && curr, true);

    if(eachIsSale) {
      return true;
    }
  }
  return false;
}


/**
 * Validates multiple properties, responding true if all properties are
 * not undefined
 */
module.exports.areFieldsValid = (...fields) => {
  return fields.filter(field => field === undefined).length === 0;
}
