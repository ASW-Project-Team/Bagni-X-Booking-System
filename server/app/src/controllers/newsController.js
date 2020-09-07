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

		if (commonController.typeOfString(req.body.date)
			&& new Date(req.body.date).getTime() >= Date.now()
			&& commonController.typeOfString(req.body.title)
			&& commonController.typeOfString(req.body.imageUrl)
			&& (!req.body.article || commonController.typeOfString(req.body.article))){

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
 * It returns a specific news or someones in a paginated result
 * @param req: two possible scenario:
 * 				1) In request is specified par "id".
 * 				2) In request could be specified "page-id" and/or "page-to".
 * 					page-id: Which one of the incremental paginated results will be delivered. If omitted, default is 0.
 * 					page-size: Maximum size of the results. If omitted, default is 10.
 * @param res: two possible scenario:
 *				1) res:
 *					200: The news has been correctly delivered.
 *					400: The request was malformed.
 *					404: The news with the given id does not exist.
 *			 	2) res:
 * 					200: Returns the most recent news, in a paginated fashion.
 * 					400: The request was malformed.
 */
module.exports.readNews = function(req, res) {

	if (req.params.id){
		commonController.findByIdFirstLevelCollection(req, res, feedName, Feed, "", req.params.id,
			(err,news) => commonController.response(res, news));
	} else {
		commonController.findAllFromCollection(req, res, feedName, Feed, "", (err, feed) =>
			commonController.returnPages(req.query["page-id"], req.query["page-size"], req, res, feed, "Feed"))
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
			&& (!(req.body.article) || (commonController.typeOfString(req.body.article))
			&& (!(req.body.imageUrl) || commonController.typeOfString(req.body.imageUrl)))){

			commonController.checkAndActForUpdate(docResult, req, ()=>{
				if (req.body.date)
					docResult.date = new Date(req.body.date)
			}, "title", "article", "imageUrl")
				.then(commonController.correctSave(docResult, commonController.statusCompleted, res))

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

	commonController.deleteFirstLevelCollectionById(req, res, feedName, Feed, "", req.params.id);
};
