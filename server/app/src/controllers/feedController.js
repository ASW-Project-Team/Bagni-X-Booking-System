const mongoose = require('mongoose');
const Feed = require("../models/feedModel")(mongoose);
const commonController = require("./commonController");

const feedName = "Feed";


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
module.exports.create_feed = function(req, res) {

	commonController.areRequiredFieldsPresent(req, res, () =>{

		if ((new Date(req.body.date).getTime() >= Date.now())
			&& commonController.typeOfString(req.body.title)
			&& (!(req.body.description) || (commonController.typeOfString(req.body.description)))){

			let feed = new Feed(req.body);
			feed._id = mongoose.Types.ObjectId();
			feed.date = new Date(req.body.date);

			commonController.correctSave(feed, commonController.status_created, res);
		} else {
			commonController.parameter_bad_formatted(res);
		}

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
 * Modify a news if have correct parameters.
 * @param req that have params the id to delete.
 * @param res:
 * 	. Status "Completed (200)" and document if all parameter demanded are corrected formatted.
 * 	. Status "Bad request (400)" if almost one parameter is bad formatted.
 */
module.exports.update_feed = function(req, res) {

	commonController.findByIdFirstLevelCollection(req, res, "news", Feed, "",
		req.params.id, (err, docResult) => {

		// If correct parameter change, if not response
		if (!(req.body.date) || ((new Date(req.body.date).getTime() >= Date.now()))
			&& (!(req.body.title) || (commonController.typeOfString(req.body.title)))
			&& (!(req.body.description) || (commonController.typeOfString(req.body.description)))){

			if (req.body.date)
				docResult.date = new Date(req.body.date)

			if (req.body.title)
				docResult.title = req.body.title

			if (req.body.description)
				docResult.description = req.body.description

			commonController.correctSave(docResult, commonController.status_completed, res);
		} else {
			commonController.parameter_bad_formatted(res);
		}

	})
}


/**
 * It deletes a feed with a specified id.
 * @param req that have params the id to delete.
 * @param res
 */
module.exports.delete_feed = function(req, res) {

	commonController.deleteFirstLevelCollection(req, res, feedName, Feed, "", req.params.id);
};
