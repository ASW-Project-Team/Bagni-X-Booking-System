var mongoose = require('mongoose');
//Movie = require("../models/whatYouNeed.js")(mongoose);

exports.list_bookings = function(req, res) {
	Movie.find({}, function(err, movie) {
		if (err)
			res.send(err);
		res.json(movie);
	});
};

exports.read_booking = function(req, res) {
	Movie.findById(req.params.id, function(err, movie) {
		if (err)
			res.send(err);
		else{
			if(movie==null){
				res.status(404).send({
					description: 'Movie not found'
				});
			}
			else{
				res.json(movie);
			}
		}
	});
};

exports.create_booking = function(req, res) {
	var new_movie = new Movie(req.body);
	new_movie.save(function(err, movie) {
		if (err)
			res.send(err);
		res.status(201).json(movie);
	});
};

exports.update_booking = function(req, res) {
	Movie.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, movie) {
		if (err)
			res.send(err);
		else{
			if(movie == null){
				res.status(404).send({
					description: 'Movie not found'
				});
			}
			else{
				res.json(movie);
			}
		}
	});
};

exports.delete_booking = function(req, res) {
	Movie.deleteOne({_id: req.params.id}, function(err, result) {
		if (err)
			res.send(err);
		else{
			if(result.deletedCount === 0){
				res.status(404).send({
					description: 'Movie not found'
				});
			}
			else{
				res.json({ message: 'Task successfully deleted' });
			}
		}
  });
};
