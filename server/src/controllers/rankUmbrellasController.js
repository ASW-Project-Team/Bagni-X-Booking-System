const RankUmbrellas = require("../models/rankUmbrellasModel");
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
module.exports.createRankUmbrella = async (req, res) => {
  // 1. fields sanitization
  const name = sanitizers.toString(req.body.name);
  const description = sanitizers.toString(req.body.description);
  const dailyPrice = sanitizers.toPositiveFloat(req.body.dailyPrice);
  const { fromUmbrella, toUmbrella } = await sanitizers.toUmbrellaRange(req.body.fromUmbrella, req.body.toUmbrella, RankUmbrellas);
  const imageUrl = await imgUploader.trySyncUpload(req, res, imgUploader.types.rankUmbrella);
  const sales = sanitizers.toArray(req.body.sales, {
    dateFrom: validators.isDate,
    dateTo: validators.isDate,
    percent: validators.isPercent
  })

  // 2. fields validation
  if (!validators.areFieldsValid(name, description, dailyPrice, fromUmbrella, toUmbrella, sales)) {
    responseGen.respondMalformedRequest(res)
    return;
  }

  // 3. creates a new item with the given credentials, and saves it
  const rankToInsert = new RankUmbrellas({
    name: name,
    description: description,
    dailyPrice: dailyPrice,
    fromUmbrella: fromUmbrella,
    toUmbrella: toUmbrella,
    imageUrl: imageUrl ? imageUrl : imgUploader.defaultImage,
    sales: sales
  });
  const generatedRank = await rankToInsert.save();

  // 5. returns the customer data and the jwt
  const responseRankData = common.filterSensitiveInfoObj(generatedRank);
  responseGen.respondCreated(res, responseRankData);
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
  // 1. fields sanitization
  const paramId = sanitizers.toMongoId(req.params.id);
  const pageId = sanitizers.toInt(req.params['page-id']);
  const pageSize = sanitizers.toInt(req.params['page-size']);

  // 2. try the extraction
  if (validators.isMongoId(paramId)) {
    // if the id is present and valid, return the correspondent
    // admin non-secret data
    const foundItem = await RankUmbrellas.findOne({ _id: paramId })

    // admin not present in the db, 404
    if (!foundItem) {
      responseGen.respondNotFound(res, 'Rank umbrellas')
      return;
    }

    const responseItemData = common.filterSensitiveInfoObj(foundItem);
    responseGen.respondOK(res, responseItemData)
    return;
  }

  // if the id is not present, or not valid, return returns the news, ordered
  // from the most recent, and paginated
  const items = await RankUmbrellas.find().sort({name: 1});
  const customersDataNonSensitive = common.filterSensitiveInfo(items);
  const paginatedResults = common.filterByPage(pageId, pageSize, customersDataNonSensitive);
  responseGen.respondOK(res, paginatedResults);
}


/**
 * Updates the given fields of the item. Required responses:
 *  - 200: The server updated the specified item.
 *  - 400: The request is malformed.
 *  - 404: An item with the given id does not exist.
 *  - 401: Not an admin.
 */
module.exports.updateRankUmbrella = async (req, res) => {
  // 1. fields sanitization
  const paramId = sanitizers.toMongoId(req.params.id);
  const name = sanitizers.toString(req.body.name);
  const description = sanitizers.toString(req.body.description);
  const dailyPrice = sanitizers.toPositiveFloat(req.body.dailyPrice);
  const { fromUmbrella, toUmbrella } = await sanitizers.toUmbrellaRange(req.body.fromUmbrella, req.body.toUmbrella, RankUmbrellas, paramId);
  const imageUrl = await imgUploader.trySyncUpload(req, res, imgUploader.types.rankUmbrella);
  const sales = sanitizers.toArray(req.body.sales, {
    dateFrom: validators.isDate,
    dateTo: validators.isDate,
    percent: validators.isPercent
  });

  // 2. fields validation
  if (!validators.isMongoId(paramId)) {
    responseGen.respondMalformedRequest(res)
    return;
  }

  // 3. updates the item, if exists
  const rankFound = await RankUmbrellas.findOneAndUpdate(
    { _id: paramId },
    {
      name: name,
      description: description,
      dailyPrice: dailyPrice,
      fromUmbrella: fromUmbrella,
      toUmbrella: toUmbrella,
      imageUrl: imageUrl,
      sales: sales
    },
    { omitUndefined: true, new: true }
  );

  // 4. if the item not exists, respond 404
  if (!rankFound) {
    responseGen.respondNotFound(res, 'Rank umbrella')
    return;
  }

  // 5. request completed
  responseGen.respondOK(res)
}


/**
 * Deletes the item. Required responses:
 *  - 200: The server deleted the specified item.
 *  - 400: The request is malformed.
 *  - 404: An item with the given id does not exist.
 *  - 401: Not an admin.
 */
module.exports.deleteRankUmbrella = async (req, res) => {
  // 1. sanitization
  const paramId = sanitizers.toMongoId(req.params.id);

  // 2. try the removal
  let removedItem;
  if (validators.isMongoId(paramId)) {
    // find the admin by the id, if present
    removedItem = await RankUmbrellas.findOneAndRemove({ _id: paramId });

  } else {
    // If no indication is present, the request is malformed
    responseGen.respondMalformedRequest(res)
    return;
  }

  // 3. If the item is not found, respond 404
  if (!removedItem) {
    responseGen.respondNotFound(res, 'Rank umbrella')
    return;
  }

  // 4. request completed
  responseGen.respondOK(res);
}
