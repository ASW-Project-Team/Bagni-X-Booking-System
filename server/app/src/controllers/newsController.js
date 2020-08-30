const mongoose = require('mongoose');
const Feed = require("../models/newsModel")(mongoose);
const commonController = require("./commonController");

const feedName = "News";


/**
 * It creates a new feed.
 * @param req:
 * 	. in params have the id to delete.
 * 	. in body have almost the required fields.
 * @param res:
 * 	. Status "Completed (200)" and document if all parameter demanded are corrected formatted.
 * 	. Status "Bad request (400)" if almost one parameter is bad formatted.
 * 	. Status "Error (404)" if some required fields isn't insert in request body.
 */
module.exports.createNews = function(req, res) {

	commonController.areRequiredFieldsPresent(req, res, () =>{

		// TODO Check if imageUrl is present
		if ((new Date(req.body.date).getTime() >= Date.now())
			&& commonController.typeOfString(req.body.title)
			&& commonController.typeOfString(req.body.imageUrl)
			&& (!(req.body.article) || (commonController.typeOfString(req.body.article)))){

			let feed = new Feed(req.body);
			feed._id = mongoose.Types.ObjectId();
			feed.date = new Date(req.body.date);

			commonController.correctSave(feed, commonController.statusCreated, res);
		} else {
			commonController.parameterBadFormatted(res);
		}

	}, req.body.date, req.body.title, req.body.imageUrl);
};

/**
 * It returns the feed with the specified ID
 * @param req
 * @param res
 */
module.exports.readNews = function(req, res) {

	if (req.params.id){
		commonController.findByIdFirstLevelCollection(req, res, feedName, Feed, "", req.params.id,
			(err,news) => commonController.response(res, news));
	} else {
		commonController.findAllFromCollection(req, res, feedName, Feed, "", (err, feed) =>
			commonController.returnPages(req.body.pageId, req.body.pageSize, req, res, feed, "Feed"))
	}

};

/**
 * Modify a news if have correct parameters.
 * @param req that have params the id to delete.
 * @param res:
 * 	. Status "Completed (200)" and document if all parameter demanded are corrected formatted.
 * 	. Status "Bad request (400)" if almost one parameter is bad formatted.
 */
module.exports.updateNews = function(req, res) {

	commonController.findByIdFirstLevelCollection(req, res, feedName, Feed, "",
		req.params.id, (err, docResult) => {

		// If correct parameter change, if not response
		if (!(req.body.date) || ((new Date(req.body.date).getTime() >= Date.now()))
			&& (!(req.body.title) || (commonController.typeOfString(req.body.title)))
			&& (!(req.body.article) || (commonController.typeOfString(req.body.article)))){

			if (req.body.date)
				docResult.date = new Date(req.body.date)

			if (req.body.title)
				docResult.title = req.body.title

			if (req.body.article)
				docResult.article = req.body.article

			if (req.body.imageUrl)
				docResult.imageUrl = req.body.imageUrl

			commonController.correctSave(docResult, commonController.statusCompleted, res);
		} else {
			commonController.parameterBadFormatted(res);
		}

	})
}


/**
 * It deletes a feed with a specified id.
 * @param req that have params the id to delete.
 * @param res
 */
module.exports.deleteNews = function(req, res) {

	commonController.deleteFirstLevelCollection(req, res, feedName, Feed, "", req.params.id);
};
