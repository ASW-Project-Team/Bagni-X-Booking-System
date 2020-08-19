const mongoose = require('mongoose');
const Feed = require("../models/feedModel")(mongoose);
const commonController = require("./commonController");

const feedName = "Feed";


/**
 * It creates a new feed.
 * @param req
 * @param res
 */
module.exports.create_feed = function(req, res) {

	commonController.areRequiredFieldsPresent(req, res, () =>{

		let feed = new Feed(req.body);
		feed._id = mongoose.Types.ObjectId();

		commonController.correctSave(feed, commonController.status_created, res);

	}, req.body.date, req.body.title);
};

/**
 * It returns the feed with the specified ID
 * @param req
 * @param res
 */
module.exports.read_feed = function(req, res) {

	commonController.findAllFromCollection(req, res, feedName, Feed, "", (err, document) =>{
		commonController.returnPages(req.body.page_id, req.body.page_size, req, res, document, "Feed");
	})
};

/**
 * Modify a news
 * @param req
 * @param res
 */
module.exports.update_feed = function(req, res) {

	commonController.findByIdFirstLevelCollection(req, res, "news", Feed, "",
		req.params.id, (err, docResult) => {

		if (req.body.date)
			docResult.date = new Date(req.body.date)

		if (req.body.title && commonController.typeOfString(req.body.title))
			docResult.title = req.body.title

	})
}


/**
 * It deletes a feed.
 * @param req
 * @param res
 */
module.exports.delete_feed = function(req, res) {

	commonController.deleteFirstLevelCollection(req, res, feedName, Feed, "", req.params.id);
};
