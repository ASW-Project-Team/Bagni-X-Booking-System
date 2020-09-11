const News = require("../models/newsModel");
const sanitizers = require('../validation/sanitizers');
const imgUploader = require('../utils/imageUploader');
const common = require('../utils/common');


/**
 * Create a new article. Required responses:
 * - 201: The item has been correctly created.
 * - 400: The request is malformed.
 * - 401: Not admin.
 */
module.exports.createNews = async function(req, res) {
	// Sanitization
	const date = sanitizers.toDate(req.body.date);
	const title = sanitizers.toString(req.body.title);
	const article = sanitizers.toString(req.body.article);
	const imageUrl = await imgUploader.trySyncUpload(req, res, imgUploader.types.news);

	// creation flow
	await common.create(req, res, News, {
		date: date,
		title: title,
		article: article,
		imageUrl: imageUrl ? imageUrl : imgUploader.defaultImage
	});
};


/**
 * Return all news, or only the news with the given id. Required responses:
 * For "news:id":
 *  - 200: The server returned the specified item.
 *  - 404: A news with the given id does not exist.
 * For all news:
 *  - 200: The server returned the news list.
 */
module.exports.readNews = async function(req, res) {
	// Sanitization
	const paramId = sanitizers.toMongoId(req.params.id);
	const pageId = sanitizers.toInt(req.query['page-id']);
	const pageSize = sanitizers.toInt(req.query['page-size']);

	// read flow
	await common.read(req, res, News, paramId, pageId, pageSize, { sortRules: [{ date: -1}]});
};


/**
 * Modify a news if have correct parameters.
 * @param req that have params the id to delete.
 * @param res:
 * 	. Status "Completed (200)" and document if all parameter demanded are corrected formatted.
 * 	. Status "Bad request (400)" if almost one parameter is bad formatted.
 */
module.exports.updateNews = async function(req, res) {
	// Sanitization
	const paramId = sanitizers.toMongoId(req.params.id);
	const title = sanitizers.toString(req.body.title);
	const article = sanitizers.toString(req.body.article);
	const date = sanitizers.toDate(req.body.date);
	const imageUrl = await imgUploader.trySyncUpload(req, res, imgUploader.types.news);

	// Update flow
	await common.update(req, res, News, paramId, {
		date: date,
		title: title,
		article: article,
		imageUrl: imageUrl
	});
}


/**
 * Deletes a news, by id (parameter). Required responses:
 * - 200: The item has been correctly removed.
 * - 400: Malformed request.
 * - 401: The admin was not correctly authenticated.
 * - 404: An item with the given id/username does not exist.
 */
module.exports.deleteNews = async function(req, res) {
	// sanitization
	const paramId = sanitizers.toMongoId(req.params.id);

	// removal flow
	await common.delete(req, res, News, paramId);
};
