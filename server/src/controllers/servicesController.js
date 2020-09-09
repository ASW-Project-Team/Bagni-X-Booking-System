const Services = require("../models/servicesModel");
const validators = require('./utils/validators');
const sanitizers = require('./utils/sanitizers');
const responseGen = require('./utils/responseGenerator');
const imgUploader = require('./utils/imageUploader');
const common = require('./utils/common');


/**
 * Create a new item. Required responses:
 * - 201: The item has been correctly created.
 * - 400: The request is malformed.
 * - 401: Not an admin.
 */
module.exports.createService = async (req, res) => {
  // 1. fields sanitization
  const name = sanitizers.toString(req.body.name);
  const description = sanitizers.toString(req.body.description);
  const dailyPrice = sanitizers.toPositiveFloat(req.body.dailyPrice);
  const imageUrl = await imgUploader.trySyncUpload(req, res, imgUploader.types.rankUmbrella);

  // 2. fields validation
  if (!validators.areFieldsValid(name, description, dailyPrice)) {
    responseGen.respondMalformedRequest(res)
    return;
  }

  // 3. creates a new item with the given credentials, and saves it
  const itemToInsert = new Services({
    name: name,
    description: description,
    dailyPrice: dailyPrice,
    imageUrl: imageUrl ? imageUrl : imgUploader.defaultImage,
  });
  const generatedItem = await itemToInsert.save();

  // 5. returns the item data
  const responseItemData = common.filterSensitiveInfoObj(generatedItem);
  responseGen.respondCreated(res, responseItemData);
}


/**
 * Updates the given fields of the item. Required responses:
 *  - 200: The server updated the specified item.
 *  - 400: The request is malformed.
 *  - 404: An item with the given id does not exist.
 *  - 401: Not an admin.
 */
module.exports.updateService = async (req, res) => {
  // 1. fields sanitization
  const paramId = sanitizers.toMongoId(req.params.id);
  const name = sanitizers.toString(req.body.name);
  const description = sanitizers.toString(req.body.description);
  const dailyPrice = sanitizers.toPositiveFloat(req.body.dailyPrice);
  const imageUrl = await imgUploader.trySyncUpload(req, res, imgUploader.types.rankUmbrella);

  // 2. fields validation
  if (!validators.isMongoId(paramId)) {
    responseGen.respondMalformedRequest(res)
    return;
  }

  // 3. updates the item, if exists
  const rankFound = await Services.findOneAndUpdate(
    { _id: paramId },
    {
      name: name,
      description: description,
      dailyPrice: dailyPrice,
      imageUrl: imageUrl,
    },
    { omitUndefined: true, new: true }
  );

  // 4. if the item not exists, respond 404
  if (!rankFound) {
    responseGen.respondNotFound(res, 'Service')
    return;
  }

  // 5. request completed
  responseGen.respondOK(res)
}


/**
 * Return all items, in a paginated fashion, or only the item with
 * the given id. Required responses:
 * For get by id:
 *  - 200: The server returned the specified item.
 *  - 400: The request is malformed.
 *  - 401: Not an admin.
 *  - 404: An item with the given id does not exist.
 * For get all:
 *  - 200: The server returned the paginated item list.
 *  - 400: The request is malformed.
 *  - 401: Not an admin.
 */

module.exports.readServices = async (req, res) => {
// 1. fields sanitization
  const paramId = sanitizers.toMongoId(req.params.id);
  const pageId = sanitizers.toInt(req.params['page-id']);
  const pageSize = sanitizers.toInt(req.params['page-size']);

  // 2. try the extraction
  if (validators.isMongoId(paramId)) {
    // if the id is present and valid, return the correspondent
    // admin non-secret data
    const foundItem = await Services.findOne({ _id: paramId })

    // admin not present in the db, 404
    if (!foundItem) {
      responseGen.respondNotFound(res, 'Service')
      return;
    }

    const responseItemData = common.filterSensitiveInfoObj(foundItem);
    responseGen.respondOK(res, responseItemData)
    return;
  }

  // if the id is not present, or not valid, return returns the news, ordered
  // from the most recent, and paginated
  const items = await Services.find().sort({name: 1});
  const customersDataNonSensitive = common.filterSensitiveInfo(items);
  const paginatedResults = common.filterByPage(pageId, pageSize, customersDataNonSensitive);
  responseGen.respondOK(res, paginatedResults);
}


/**
 * Deletes the item. Required responses:
 *  - 200: The server deleted the specified item.
 *  - 400: The request is malformed.
 *  - 404: An item with the given id does not exist.
 *  - 401: Not an admin.
 */
module.exports.deleteService = async (req, res) => {
  // 1. sanitization
  const paramId = sanitizers.toMongoId(req.params.id);

  // 2. try the removal
  let removedItem;
  if (validators.isMongoId(paramId)) {
    // find the admin by the id, if present
    removedItem = await Services.findOneAndRemove({ _id: paramId });

  } else {
    // If no indication is present, the request is malformed
    responseGen.respondMalformedRequest(res)
    return;
  }

  // 3. If the item is not found, respond 404
  if (!removedItem) {
    responseGen.respondNotFound(res, 'Service')
    return;
  }

  // 4. request completed
  responseGen.respondOK(res);
}
