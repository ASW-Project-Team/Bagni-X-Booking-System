const validators = require('./validators');
const responseGen = require('./responseGenerator');
const respFilters = require('./responseFilters');
const RankUmbrella = require('../models/rankUmbrellasModel')


/*
 * The module includes entire creation, modification and deletion routines,
 * customizable in some parts.
 *
 */

/**
 * Insert all, validate all. fields are in format {name: value}
 */
module.exports.create = async (req, res, model, fields, config) => {
  if (!config) {
    config = {};
  }

  // validation
  let nonRequiredFields = config.nonRequiredFields ? config.nonRequiredFields : [];
  let requiredFields = Object.entries(fields).filter(([key, value]) => !nonRequiredFields.includes(key)).map(([key, value]) => value);
  if (!validators.areFieldsValid(...requiredFields)) {
    responseGen.respondMalformedRequest(res)
    return;
  }

  // creates a new item with the given credentials, and saves it
  const itemToInsert = new model(fields);
  const generatedItem = await itemToInsert.save();

  // returns the item data
  const responseItemData = respFilters.cleanObject(generatedItem);
  responseGen.respondCreated(res, responseItemData);
}


module.exports.update = async (req, res, model, paramId, fields, config) => {
  if (!config) {
    config = {};
  }

  // fields validation
  if (!validators.isMongoId(paramId)) {
    responseGen.respondMalformedRequest(res)
    return;
  }

  // updates the item, if exists
  // if the id is present and valid, return the correspondent
  // item non-secret data
  let findAndUpdateQuery = model.findOne({_id: paramId});

  if (config.checkLogicalDeletion) {
    findAndUpdateQuery.where({deleted: false});
  }

  findAndUpdateQuery.setOptions({omitUndefined: true, new: true});
  findAndUpdateQuery.updateOne(fields);

  const itemFound = await findAndUpdateQuery.exec();

  // 4. if the item not exists, respond 404
  if (!itemFound) {
    responseGen.respondNotFound(res, model.modelName)
    return;
  }

  // 5. request completed
  responseGen.respondOK(res)
}


module.exports.read = async (req, res, model, paramId, pageId, pageSize, config) => {
  if (!config) {
    config = {};
  }

  // 2. try the extraction
  if (validators.isMongoId(paramId)) {

    // if the id is present and valid, return the correspondent
    // item non-secret data
    let findItemQuery = model.findOne({_id: paramId});

    if (config.checkLogicalDeletion) {
      findItemQuery.where({deleted: false});
    }

    const foundItem = await findItemQuery.exec();

    // admin not present in the db, 404
    if (!foundItem) {
      responseGen.respondNotFound(res, model.modelName);
      return;
    }

    const responseItemData = respFilters.clean(foundItem);
    responseGen.respondOK(res, responseItemData)
    return;
  }

  // if the id is not present, or not valid, return returns the news, ordered
  // from the most recent, and paginated
  let itemsQuery = model.find();

  config.sortRules.forEach(rule => {
    itemsQuery = itemsQuery.sort(rule)
  });

  if (config.checkLogicalDeletion) {
    itemsQuery = itemsQuery.where({deleted: false});
  }

  const items = await itemsQuery.exec();
  const customersDataNonSensitive = respFilters.clean(items);
  const paginatedResults = respFilters.filterByPage(pageId, pageSize, customersDataNonSensitive);
  responseGen.respondOK(res, paginatedResults);
}


module.exports.delete = async (req, res, model, paramId, config) => {
  if (!config) {
    config = {};
  }

  // try the removal
  let removedItem;
  if (validators.isMongoId(paramId)) {
    if (!config.logicalDeletion) {
      // find the admin by the id, if present
      removedItem = await model.findOneAndRemove({_id: paramId});

    } else {
      removedItem = await model.findOneAndUpdate({_id: paramId}, {deleted: true});
    }

  } else {
    // If no indication is present, the request is malformed
    responseGen.respondMalformedRequest(res)
    return;
  }

  // If the item is not found, respond 404
  if (!removedItem) {
    responseGen.respondNotFound(res, model.modelName);
    return;
  }

  // request completed
  responseGen.respondOK(res);
}

/**
 * Creates an array with all the umbrella extracted from the ranks, in a format
 * used from the client to book umbrellas.
 * @return {Promise<{number: number, rankId: string}[]>}
 */
module.exports.generateAllUmbrellas = async () => {
  const rankUmbrellas = await RankUmbrella.find();

  return rankUmbrellas.map(rank => {
    let umbrellas = [];

    for (let i = rank.fromUmbrella; i <= rank.toUmbrella; i++) {
      umbrellas.push({
        number: i,
        rankUmbrellaId: rank._id
      })
    }

    return umbrellas;
  }).reduce((prev, curr) => prev.concat(curr), []);
}


/**
 * Creates an array with only the available umbrellas, in a format
 * used from the client to book umbrellas.
 * @return {Promise<{number: number, rankId: string}[]>}
 */
module.exports.generateAvailableUmbrellas = async (dateFrom, dateTo) => {
  const allBookings = await Booking.find();
  const involvedBookings = allBookings.filter(book =>
    book.dateFrom.getTime() <= dateFrom.getTime() && book.dateTo.getTime() > dateFrom.getTime()
    || book.dateFrom.getTime() < dateTo.getTime() && book.dateTo.getTime() >= dateTo.getTime()
    || book.dateFrom.getTime() >= dateFrom.getTime() && book.dateTo.getTime() <= dateTo.getTime()
    || book.dateFrom.getTime() >= dateFrom.getTime() && book.dateTo.getTime() >= dateTo.getTime());

  const involvedUmbrNumbers = involvedBookings.map(book => {
    return book.umbrellas.map(umbrella => {
      return umbrella.number;
    });

  }).reduce((prev, curr) => prev.concat(curr), []);

  const allUmbrellas = await this.generateAllUmbrellas();

  return allUmbrellas.filter(umbrella => !involvedUmbrNumbers.includes(umbrella.number));
}
