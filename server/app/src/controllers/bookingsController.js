const mongoose = require('mongoose');
User = require("../models/userModel.js")(mongoose);
const Booking = require("../models/bookingModel")(mongoose);
const commonController = require("./commonController");


const collectionName = "bookings"


/**
 * Create a booking and check that parameter needed are inserted and corrected.
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

	}, req.body.user_id, req.body.umbrellas, req.body.price, req.body.date_from, req.body.date_to);
};

/**
 * Get the booking specified in id
 * @param req The GET specific booking request
 * @param res The GET specific booking response
 */
exports.get_booking = function(req, res) {
	commonController.findByIdFirstLevelCollection(req, res, "book", Booking, "book not found",
		req.params.id, (err, docResult)=>{
			commonController.response(res, docResult);
		});
}

exports.modify_booking = function(req, res) {

	commonController.findByIdFirstLevelCollection(req, res, "book", Booking, "book not found",
		req.params.id, (err, docResult)=>{

			if (req.body.user_id)
				docResult.user_id = req.body.user_id

			if (req.body.umbrellas)
				docResult.umbrellas = req.body.umbrellas

			if (req.body.confirmed)
				docResult.confirmed = req.body.confirmed

			if (req.body.cancelled)
				docResult.cancelled = req.body.cancelled

			if ((req.body.date_from) && (req.body.date_from.getTime() > Date.now()))
				docResult.date_from = req.body.date_from

			if ((req.body.date_to) && (req.body.date_to.getTime() > docResult.date_from.getTime()))
				docResult.date_to = req.body.date_to

			if ((req.body.price) && (req.body.price >= 0))
				docResult.price = req.body.price;

			if (req.body.services)
				docResult.services = req.body.services

			commonController.correctSave(docResult, commonController.status_completed, res);
		})
}


/**
 * GET bookings.
 * Two possible scenarios:
 * 	. get a specific user and get all his bookings
 * 	. get page_id and page_size: in this case return bookings from id to size.
 * 		In this case there are default value both for id and size.
 * @param req The specified GET request
 * @param res The specified GET response
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

/**
 * DELETE Booking specified by id
 * @param req The specific DELETE request
 * @param res The specific DELETE response
 */
exports.delete_booking = function(req, res) {

	commonController.deleteFirstLevelCollection(req, res, collectionName, Booking, "", req.params.id);
}
