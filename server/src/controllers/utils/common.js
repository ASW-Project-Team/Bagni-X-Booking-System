const validators = require('./validators');
const sanitizers = require('./sanitizers');
const responseGen = require('./responseGenerator');
const imgUploader = require('./imageUploader');
const respFilters = require('./responseFilters');


/*
 * The module includes entire creation, modification and deletion routines,
 * customizable in some parts.
 *
 */

/**
 * Insert all, validate all. fields are in format {name: value}
 */
module.exports.create = async (req,res,model, fields) => {
  // validation
  if (!validators.areFieldsValid(...Object.values(fields))) {
    responseGen.respondMalformedRequest(res)
    return;
  }

  // todo for customer/admin, check if exists

  // creates a new item with the given credentials, and saves it
  const itemToInsert = new model(fields);
  const generatedItem = await itemToInsert.save();

  // returns the item data
  const responseItemData = respFilters.filterSensitiveInfoObj(generatedItem);
  responseGen.respondCreated(res, responseItemData);
}



module.exports.update = async (req, res, model, paramId, fields) => {
  // fields validation
  if (!validators.isMongoId(paramId)) {
    responseGen.respondMalformedRequest(res)
    return;
  }

  // todo for customer, check deleted field

  // updates the item, if exists
  const itemFound = await model.findOneAndUpdate({ _id: paramId },
    fields, { omitUndefined: true, new: true });

  // 4. if the item not exists, respond 404
  if (!itemFound) {
    responseGen.respondNotFound(res, model.modelName)
    return;
  }

  // 5. request completed
  responseGen.respondOK(res)
}


module.exports.read = async (req, res, model, paramId, pageId, pageSize, sortRulesArray) => {
  // 2. try the extraction
  if (validators.isMongoId(paramId)) {
    // todo for customer, check delete field

    // if the id is present and valid, return the correspondent
    // item non-secret data
    const foundItem = await model.findOne({ _id: paramId })

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
  const itemsQuery =  model.find();
  sortRulesArray.forEach(rule => itemsQuery.sort(rule));
  const items = await itemsQuery.exec();
  const customersDataNonSensitive = respFilters.filterSensitiveInfo(items);
  const paginatedResults = respFilters.filterByPage(pageId, pageSize, customersDataNonSensitive);
  responseGen.respondOK(res, paginatedResults);
}


module.exports.delete = async (req, res, model, paramId) => {
  // try the removal
  let removedItem;
  if (validators.isMongoId(paramId)) {
    // find the admin by the id, if present
    removedItem = await model.findOneAndRemove({ _id: paramId });

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
