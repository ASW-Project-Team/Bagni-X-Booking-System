const HomeCard = require("../models/homeCardModel");
const RankUmbrella = require('../models/rankUmbrellasModel');
const Service = require('../models/servicesModel');
const sanitizers = require('../validation/sanitizers');
const imgUploader = require('../utils/imageUploader');
const common = require('../utils/common');
const respFilters = require('../utils/responseFilters');
const respGenerator = require('../utils/responseGenerator');

/**
 * Create a new item. Required responses:
 * - 201: The item has been correctly created.
 * - 400: The request is malformed.
 * - 401: Not an admin.
 */
module.exports.createHomeCard = async (req, res) => {
  // Sanitization
  const title = sanitizers.toString(req.body.title);
  const description = sanitizers.toString(req.body.description);
  const isMainCard = sanitizers.toBool(req.body.isMainCard);
  const orderingIndex = sanitizers.toPositiveInt(req.body.orderingIndex)
  const imageUrl = await imgUploader.trySyncUpload(req, res, imgUploader.types.homeCard);

  // creation flow
  await common.create(req, res, HomeCard, {
    title: title,
    description: description,
    isMainCard: isMainCard,
    orderingIndex: orderingIndex,
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
module.exports.updateHomeCard = async (req, res) => {
  // Sanitization
  const paramId = sanitizers.toMongoId(req.params.id);
  // Sanitization
  const title = sanitizers.toString(req.body.title);
  const description = sanitizers.toString(req.body.description);
  const isMainCard = sanitizers.toBool(req.body.isMainCard);
  const orderingIndex = sanitizers.toPositiveInt(req.body.orderingIndex)
  const imageUrl = await imgUploader.trySyncUpload(req, res, imgUploader.types.homeCard);

  // Update flow
  await common.update(req, res, HomeCard, paramId, {
    title: title,
    description: description,
    isMainCard: isMainCard,
    orderingIndex: orderingIndex,
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
module.exports.readHomeCards = async (req, res) => {
  // Sanitization
  const paramId = sanitizers.toMongoId(req.params.id);
  const pageId = sanitizers.toInt(req.query['page-id']);
  const pageSize = sanitizers.toInt(req.query['page-size']);

  // read flow
  await common.read(req, res, HomeCard, paramId, pageId, pageSize, { sortRules: [{ orderingIndex: 1}]});
}


/**
 * Deletes the item. Required responses:
 *  - 200: The server deleted the specified item.
 *  - 400: The request is malformed.
 *  - 404: An item with the given id does not exist.
 *  - 401: Not an admin.
 */
module.exports.deleteHomeCard = async (req, res) => {
  // sanitization
  const paramId = sanitizers.toMongoId(req.params.id);

  // removal flow
  await common.delete(req, res, HomeCard, paramId);
}

/**
 * Returns data to display inside the home screen.
 */
module.exports.getHome = async (req, res) => {
  const mainCardFromDb = await HomeCard.findOne({ isMainCard: true});
  const mainCard = respFilters.cleanObject(mainCardFromDb);

  const homeCardsFromDb = await HomeCard.find({ isMainCard: false }).sort({ orderingIndex: 1});
  const homeCards = respFilters.clean(homeCardsFromDb);

  const rankUmbrellasFromDb = await Service.find().sort({ name: 1});
  const rankUmbrellas = respFilters.clean(rankUmbrellasFromDb);

  const servicesFromDb = await Service.find().sort({ name: 1});
  const services = respFilters.clean(servicesFromDb);

  respGenerator.respondOK(res, {
    mainCard: mainCard,
    homeCards: homeCards,
    rankUmbrellas: rankUmbrellas,
    services: services
  });
}
