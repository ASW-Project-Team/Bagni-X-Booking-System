const News = require("../models/newsModel");
const validators = require('./utils/validators');
const sanitizers = require('./utils/sanitizers');
const responseGen = require('./utils/responseGenerator');
const imgUploader = require('./utils/imageUpload');
const common = require('./utils/common');

/**
 * Create a new article. Required responses:
 * - 201: The item has been correctly created.
 * - 400: The request is malformed.
 * - 401: Not admin.
 */
module.exports.createNews = async function(req, res) {
	// 1. fields sanitization
	const date = sanitizers.toDate(req.body.date);
	const title = sanitizers.toString(req.body.title);
	const article = sanitizers.toString(req.body.article);
	const imageUrl = await imgUploader.trySyncUpload(req, res, imgUploader.types.news);

	// 2. fields validation
	if (!validators.areFieldsValid(date, title, article)) {
		responseGen.respondMalformedRequest(res)
		return;
	}
	// 3. creates a new item with the given data, and saves it
	const newsToInsert = new News({
		date: date,
		title: title,
		article: article,
		imageUrl: imageUrl ? imageUrl : imgUploader.defaultImage
	});
	const generatedNews = await newsToInsert.save();

	// 4. returns the item data
	const responseItemData = common.filterSensitiveInfoObj(generatedNews);
	responseGen.respondCreated(res, responseItemData);
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
	// 1. fields sanitization
	const paramId = sanitizers.toMongoId(req.params.id);
	const pageId = sanitizers.toInt(req.params['page-id']);
	const pageSize = sanitizers.toInt(req.params['page-size']);

	// 2. try the extraction
	if (validators.isMongoId(paramId)) {
		// if the id is present and valid, return the correspondent
		// admin non-secret data
		const foundItem = await News.findOne({ _id: paramId })

		// admin not present in the db, 404
		if (!foundItem) {
			responseGen.respondNotFound(res, 'News')
			return;
		}

		const responseItemData = common.filterSensitiveInfoObj(foundItem);
		responseGen.respondOK(res, responseItemData)
		return;
	}

	// if the id is not present, or not valid, return returns the news, ordered
	// from the most recent, and paginated
	const items = await News.find().sort({date: -1});
	const customersDataNonSensitive = common.filterSensitiveInfo(items);
	const paginatedResults = common.filterByPage(pageId, pageSize, customersDataNonSensitive);
	responseGen.respondOK(res, paginatedResults);
};


/**
 * Modify a news if have correct parameters.
 * @param req that have params the id to delete.
 * @param res:
 * 	. Status "Completed (200)" and document if all parameter demanded are corrected formatted.
 * 	. Status "Bad request (400)" if almost one parameter is bad formatted.
 */
module.exports.updateNews = async function(req, res) {
	// 1. sanitization
	const imageUrl = await imgUploader.trySyncUpload(req, res, imgUploader.types.news);
	const paramId = sanitizers.toMongoId(req.params.id);
	const title = sanitizers.toString(req.body.title);
	const date = sanitizers.toDate(req.body.date);
	const article = sanitizers.toString(req.body.article);

	// 2. fields validation
	if (!validators.isMongoId(paramId)) {
		responseGen.respondMalformedRequest(res)
		return;
	}

	// 3. updates the admin, if exists
	const newsFound = await News.findOneAndUpdate(
		{ _id: paramId },
		{
			date: date,
			title: title,
			article: article,
			imageUrl: imageUrl
		},
		{ omitUndefined: true, new: true }
	);

	// 4. if the admin not exists, respond 404
	if (!newsFound) {
		responseGen.respondNotFound(res, 'News')
		return;
	}

	// 5. request completed
	responseGen.respondOK(res)
}


/**
 * Deletes a news, by id (parameter). Required responses:
 * - 200: The item has been correctly removed.
 * - 400: Malformed request.
 * - 401: The admin was not correctly authenticated.
 * - 404: An item with the given id/username does not exist.
 */
module.exports.deleteNews = async function(req, res) {
	// 1. sanitization
	const paramId = sanitizers.toMongoId(req.params.id);

	// 2. try the removal
	let removedItem;
	if (validators.isMongoId(paramId)) {
		// find the admin by the id, if present
		removedItem = await News.findOneAndRemove({ _id: paramId });

	} else {
		// If no indication is present, the request is malformed
		responseGen.respondMalformedRequest(res)
		return;
	}

	// 3. If the admin is not found, respond 404
	if (!removedItem) {
		responseGen.respondNotFound(res, 'News')
		return;
	}

	// 4. request completed
	responseGen.respondOK(res);
};
