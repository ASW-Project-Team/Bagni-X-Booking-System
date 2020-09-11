const RankUmbrellas = require("../models/rankUmbrellasModel");
const validators = require('../validation/validators');
const sanitizers = require('../validation/sanitizers');
const imgUploader = require('../utils/imageUploader');
const common = require('../utils/common');


/**
 * Create a new item. Required responses:
 * - 201: The item has been correctly created.
 * - 400: The request is malformed.
 * - 401: Not an admin.
 */
module.exports.createRankUmbrella = async (req, res) => {
  // Sanitization
  const name = sanitizers.toString(req.body.name);
  const description = sanitizers.toString(req.body.description);
  const dailyPrice = sanitizers.toPositiveFloat(req.body.dailyPrice);
  const { fromUmbrella, toUmbrella } = await sanitizers.toUmbrellaRange(req.body.fromUmbrella, req.body.toUmbrella, RankUmbrellas);
  const imageUrl = await imgUploader.trySyncUpload(req, res, imgUploader.types.rankUmbrella);
  const sales = sanitizers.toArray(req.body.sales, {
    dateFrom: sanitizers.toDate,
    dateTo: sanitizers.toDate,
    percent: sanitizers.toPercent
  })

  // creation flow
  await common.create(req, res, RankUmbrellas, {
    name: name,
    description: description,
    dailyPrice: dailyPrice,
    fromUmbrella: fromUmbrella,
    toUmbrella: toUmbrella,
    imageUrl: imageUrl ? imageUrl : imgUploader.defaultImage,
    sales: sales
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
module.exports.readRankUmbrellas = async (req, res) => {
  // Sanitization
  const paramId = sanitizers.toMongoId(req.params.id);
  const pageId = sanitizers.toInt(req.query['page-id']);
  const pageSize = sanitizers.toInt(req.query['page-size']);

  // read flow
  await common.read(req, res, RankUmbrellas, paramId, pageId, pageSize, { sortRules: [{ name: 1}]});
}


/**
 * Updates the given fields of the item. Required responses:
 *  - 200: The server updated the specified item.
 *  - 400: The request is malformed.
 *  - 404: An item with the given id does not exist.
 *  - 401: Not an admin.
 */
module.exports.updateRankUmbrella = async (req, res) => {
  // Sanitization
  const paramId = sanitizers.toMongoId(req.params.id);
  const name = sanitizers.toString(req.body.name);
  const description = sanitizers.toString(req.body.description);
  const dailyPrice = sanitizers.toPositiveFloat(req.body.dailyPrice);
  const { fromUmbrella, toUmbrella } = await sanitizers.toUmbrellaRange(req.body.fromUmbrella, req.body.toUmbrella, RankUmbrellas, paramId);
  const imageUrl = await imgUploader.trySyncUpload(req, res, imgUploader.types.rankUmbrella);
  const sales = sanitizers.toArray(req.body.sales, {
    dateFrom: sanitizers.toDate,
    dateTo: sanitizers.toDate,
    percent: sanitizers.toPercent
  });

  // Update flow
  await common.update(req, res, RankUmbrellas, paramId, {
    name: name,
    description: description,
    dailyPrice: dailyPrice,
    fromUmbrella: fromUmbrella,
    toUmbrella: toUmbrella,
    imageUrl: imageUrl,
    sales: sales
  });
}


/**
 * Deletes the item. Required responses:
 *  - 200: The server deleted the specified item.
 *  - 400: The request is malformed.
 *  - 404: An item with the given id does not exist.
 *  - 401: Not an admin.
 */
module.exports.deleteRankUmbrella = async (req, res) => {
  // sanitization
  const paramId = sanitizers.toMongoId(req.params.id);

  // removal flow
  await common.delete(req, res, RankUmbrellas, paramId);
}
