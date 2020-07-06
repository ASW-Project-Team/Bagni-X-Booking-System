const mongoose = require('mongoose');
User = require("../models/userModel.js")(mongoose);

const ObjectId = mongoose.Schema.Types.ObjectID
const defaultPageSize = 10;
const defaultPageId = 0;


exports.read_bookings = function(req, res) {

	let page_size = defaultPageSize;
	if (isParameterPresent(req.params.page_size)) {
		page_size = req.params.page_size;
	}

	let page_id = defaultPageId;
	if (isParameterPresent(req.params.page_size)) {
		page_id = req.params.page_id;
	}

	if (isParameterPresent(ObjectId(req.params.user_id))) {
		read_bookings_from_user(res, ObjectId(req.params.user_id), page_size, page_id);
	}
};

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

function isParameterPresent(param) {
	return param !== undefined;
}

function read_bookings_from_user(res, user_id, max_page_size, page_id) {
	let skip_value = page_id * max_page_size;
	let limit_value = (page_id + 1) * max_page_size;
	User.findById(ObjectId(user_id)
		.sort({'bookings.date_from': 'desc'})
		.limit(limit_value)
		.skip(skip_value),  function(err, user){
		if (err)
			res.send(err);
		else {
			if (user == null) {
				res.status(404).send({ // fixme better 404
					description: 'User or bookings not found'
				});
			} else {
				res.status(200);
				res.json();
			}
		}
	});
	/*User.findById(ObjectId(id), function(err, user) {
		if (err)
			res.send(err);
		else {
			if (user == null) {
				res.status(404).send({ // fixme better 404
					description: 'User not found'
				});
			} else {
				// responds with user
				let skip_value = page_id * max_page_size;
				let limit_value = (page_id + 1) * max_page_size;
				let bookingsRequested = User.find()
					.sort({'bookings.date_from': 'desc'})
					.limit(limit_value)
					.skip(skip_value)
					.exec() // Return the promise
					.values // Return all the values
					.then(function (bookings) {
						res.status(200);
						res.json(bookingsRequested);
					});


				res.status(200);
				res.json(bookingsRequested);
			}
		}
	});*/
}
