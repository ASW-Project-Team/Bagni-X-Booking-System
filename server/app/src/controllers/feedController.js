const mongoose = require('mongoose');
const Feed = require("../models/feedModel")(mongoose);
const commonController = require("./commonController");

// It lists all feed
exports.list_feed = function(req, res) {
		Feed.find({}, function(err, feed) {
			if (err){
				res.send(err);
			}
			res.json(feed);
		});
};


// It creates a new feed.
exports.create_booking = function(req, res) {
		let newFeed = new Feed(req.body);
		newFeed._id = mongoose.Types.ObjectId();
		// 201 -> instance created
		newFeed.save(function(err, savedFeed) {
		if (err){
			res.send(err);
		}
		res.status(201).json(savedFeed);
		});
};

// It returns the feed with the specified ID
exports.read_feed = function(req, res) {
	Feed.findById(req.params.id, (err, feed) => {
		if (err)
			res.send(err);
		else{
			if(feed == null) {
				res.status(404).send({
					description: 'Feed not found'
				});
			} else {
				res.status(200).json(feed);
			}
		}
	});
};


// It deletes a feed
exports.delete_feed= function(req, res) {
	Feed.deleteOne({_id: req.params.id}, function(err, result) {
		if (err)
			res.send(err);
		else{
			if(result.deletedCount === 0){
				res.status(404).send({
					description: 'Feed not found'
				});
			}
			else{
				res.json({ message: 'Task successfully deleted' });
			}
		}
	});
};
