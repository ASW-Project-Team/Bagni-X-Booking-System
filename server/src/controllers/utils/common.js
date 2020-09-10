const validators = require('./validators');
const responseGen = require('./responseGenerator');
const respFilters = require('./responseFilters');


/*
 * The module includes entire creation, modification and deletion routines,
 * customizable in some parts.
 *
 */

/**
 * Insert all, validate all. fields are in format {name: value}
 */
module.exports.create = async (req, res, model, fields, config) => {
  if(!config) {
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
  const responseItemData = respFilters.filterSensitiveInfoObj(generatedItem);
  responseGen.respondCreated(res, responseItemData);
}


module.exports.update = async (req, res, model, paramId, fields, config) => {
  if(!config) {
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
  let findAndUpdateQuery = model.findOne({ _id: paramId});

  if (config.checkLogicalDeletion) {
    findAndUpdateQuery.where({deleted: false});
  }

  findAndUpdateQuery.setOptions({ omitUndefined: true, new: true });
  findAndUpdateQuery.update(fields);

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
    let findItemQuery = model.findOne({ _id: paramId});

    if (config.checkLogicalDeletion) {
      findItemQuery.where({ eleted: false });
    }

    const foundItem = await findItemQuery.exec();

    // admin not present in the db, 404
    if (!foundItem) {
      responseGen.respondNotFound(res, model.modelName);
      return;
    }

    const responseItemData = respFilters.filterSensitiveInfoObj(foundItem);
    responseGen.respondOK(res, responseItemData)
    return;
  }

  // if the id is not present, or not valid, return returns the news, ordered
  // from the most recent, and paginated
  let itemsQuery =  model.find();

  config.sortRules.forEach(rule => { itemsQuery = itemsQuery.sort(rule) });

  if (config.checkLogicalDeletion) {
    itemsQuery = itemsQuery.where({ deleted: false });
  }

  const items = await itemsQuery.exec();
  const customersDataNonSensitive = respFilters.filterSensitiveInfo(items);
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
      removedItem = await model.findOneAndRemove({ _id: paramId });

    } else {
      removedItem = await Customer.findOneAndUpdate({ _id: paramId }, { deleted: true });
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
