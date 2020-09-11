const Services = require("../models/servicesModel");
const sanitizers = require('../utils/sanitizers');
const imgUploader = require('../utils/imageUpload');
const common = require('../utils/common');


/**
 * Create a new item. Required responses:
 * - 201: The item has been correctly created.
 * - 400: The request is malformed.
 * - 401: Not an admin.
 */
module.exports.createService = async (req, res) => {
  // Sanitization
  const name = sanitizers.toString(req.body.name);
  const description = sanitizers.toString(req.body.description);
  const dailyPrice = sanitizers.toPositiveFloat(req.body.dailyPrice);
  const imageUrl = await imgUploader.syncUpload(req, res);

  // creation flow
  await common.create(req, res, Services, {
    name: name,
    description: description,
    dailyPrice: dailyPrice,
    imageUrl: imageUrl ? imageUrl : imgUploader.defaultImage,
  });
}


/**
 * Updates the given fields of the item. Required responses:
 *  - 200: The server updated the specified item.
 *  - 400: The request is malformed.
 *  - 404: An item with the given id does not exist.
 *  - 401: Not an admin.
 */
module.exports.updateService = async (req, res) => {
  // Sanitization
  const paramId = sanitizers.toMongoId(req.params.id);
  const name = sanitizers.toString(req.body.name);
  const description = sanitizers.toString(req.body.description);
  const dailyPrice = sanitizers.toPositiveFloat(req.body.dailyPrice);
  const imageUrl = await imgUploader.syncUpload(req, res);

  // Update flow
  await common.update(req, res, Services, paramId, {
    name: name,
    description: description,
    dailyPrice: dailyPrice,
    imageUrl: imageUrl,
  });
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
  // Sanitization
  const paramId = sanitizers.toMongoId(req.params.id);
  const pageId = sanitizers.toInt(req.query['page-id']);
  const pageSize = sanitizers.toInt(req.query['page-size']);

  // read flow
  await common.read(req, res, Services, paramId, pageId, pageSize, { sortRules: [{ name: 1}]});
}


/**
 * Deletes the item. Required responses:
 *  - 200: The server deleted the specified item.
 *  - 400: The request is malformed.
 *  - 404: An item with the given id does not exist.
 *  - 401: Not an admin.
 */
module.exports.deleteService = async (req, res) => {
  // sanitization
  const paramId = sanitizers.toMongoId(req.params.id);

  // removal flow
  await common.delete(req, res, Services, paramId);
}
