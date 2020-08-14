const mongoose = require('mongoose');
const Feed = require("../models/feedModel")(mongoose);
const commonController = require("./commonController");

const feedName = "Feed";

// It creates a new feed.
exports.create_feed = function(req, res) {

	commonController.areRequiredFieldsPresent(req, res, () =>{

		let feed = new Feed(req.body);
		feed._id = mongoose.Types.ObjectId();

		commonController.correctSave(feed, commonController.status_created, res);

	}, req.body.date, req.body.title);
};

// It returns the feed with the specified ID
exports.read_feed = function(req, res) {

	commonController.findAllFromCollection(req, res, feedName, Feed, "", (err, document) =>{
		commonController.returnPages(req.body.page_id, req.body.page_size, req, res, document, "Feed");
	})
};


// It deletes a feed
exports.delete_feed = function(req, res) {

	commonController.deleteFirstLevelCollection(req, res, feedName, Feed, "", req.params.id);
};
