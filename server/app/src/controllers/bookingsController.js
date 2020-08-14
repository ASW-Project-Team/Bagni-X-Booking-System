const mongoose = require('mongoose');
User = require("../models/userModel.js")(mongoose);
const Booking = require("../models/bookingModel")(mongoose);
const commonController = require("./commonController");


const ObjectId = mongoose.Schema.Types.ObjectID
const collectionName = "bookings"


/**
 * Create a booking and check that parameter are possible.
 * @param req
 * @param res
 */
exports.create_booking = function(req, res) {
	commonController.areRequiredFieldsPresent(req, res, () =>{

		if (req.body.price > 0 && new Date(req.body.date_from).getTime() >= Date.now()
			&& new Date(req.body.date_to).getTime() >  new Date(req.body.date_from).getTime()) {

			let booking = new Booking(req.body);
			booking._id = mongoose.Types.ObjectId();

			// add as first element
			commonController.correctSave(booking, commonController.status_created, res);
		}

	}, req.body.user_id, req.body.umbrella_id, req.body.price, req.body.date_from, req.body.date_to);
};

// OK
// It lists all bookings
exports.list_bookings = function(req, res) {
		Booking.find({}, function(err, feed) {
			if (err){
				res.send(err);
			}
			res.json(feed);
		});
};


// FIXME TO CHECK
/**
 *
 * @param req
 * @param res
 */
exports.read_bookings = function(req, res) {

	commonController.findAllFromCollection(req, res, collectionName, Booking
		, collectionName + " not found", (err, docResult) => {
			if (req.body.user_id)
				docResult.filter(x => mongoose.Types.ObjectId(req.body.user_id) === x.user_id);
			else
				commonController.returnPages(req.body.page_id, req.body.page_size, req, res, docResult, collectionName)
	});

}

// OK
// It returns the booking with the specified ID
exports.read_booking = function(req, res) {


	/*commonController.checkFirstLevelClass(req, res, "Booking", Booking, "Booking not found",
		mongoose.Types.ObjectId(req.params.id), (err, document) =>{
			commonController.response(res, document);
		}
	);*/

	Booking.findById(req.params.id, (err, booking) => {
		if (err)
			res.send(err);
		else{
			if(booking == null) {
				res.status(404).send({
					description: 'Booking not found'
				});
			} else {
				res.status(200).json(booking);
			}
		}
	});
};



exports.update_booking = function(req, res) {
	// todo uguale, solo che poi sovrascrivi

	User.findById(mongoose.Types.ObjectId(req.params.id), (errUser, user) => {
		if (errUser)
			res.send(errUser);
		else{
			if(user == null){
				res.status(404).send({
					description: 'User not found'
				});
			}
			else{

				// FIXME aggregate

				let booking = user.bookings.find(correctId);

				if (booking !== undefined) {

					if (req.body.umbrella_id !== undefined)
						booking.umbrella_id = mongoose.Types.ObjectId(req.body.umbrella_id);

					if (req.body.price !== undefined)
						booking.price = req.body.price;

					if (req.body.date_from !== undefined)
						booking.date_from = req.body.date_from;

					if (req.body.date_to !== undefined)
						booking.date_to = req.body.date_to;

					user.save((saveErr, updatedUser) => {
						if (saveErr) {
							res.send(saveErr)
						}

						res.status(200).json(updatedUser);
					});
				} else {
					res.status(404).send("Booking not found");
				}
			}
		}
	});
};

function correctId(reqId, bookingId) {
	return reqId === bookingId;
}

// OK
// It deletes a booking
exports.delete_booking = function(req, res) {
	Booking.deleteOne({_id: req.params.id}, function(err, result) {
		if (err)
			res.send(err);
		else{
			if(result.deletedCount === 0){
				res.status(404).send({
					description: 'Booking not found'
				});
			}
			else{
				res.json({ message: 'Task successfully deleted' });
			}
		}
	});
};

function read_bookings_from_user(res, user_id, max_page_size, page_id) {
	let skip_value = page_id * max_page_size;
	let limit_value = (page_id + 1) * max_page_size;
	User.findById(ObjectId(user_id)
		.sort({'bookings.date_from': 'desc'})
		.limit(limit_value)
		.skip(skip_value), function (err, user) {
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
