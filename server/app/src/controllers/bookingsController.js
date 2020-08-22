const mongoose = require('mongoose');
User = require("../models/userModel.js")(mongoose);
const Booking = require("../models/bookingModel")(mongoose);
const commonController = require("./commonController");


const collectionName = "bookings"


/**
 * Create a booking and check that parameter needed are inserted and corrected.
 * Umbrellas passed as array of number.
 * @param req
 * @param res
 */
exports.create_booking = function(req, res) {

	commonController.areRequiredFieldsPresent(req, res, () =>{

		// Check if fields are well formatted
		if (req.body.price >= 0
			&& new Date(req.body.from).getTime() >= Date.now()
			&& new Date(req.body.to).getTime() >=  new Date(req.body.from).getTime()
			&& ((!req.body.services) || (commonController.servicesAvailable(req, res, req.body.services)))) {

			// Check if umbrella are free
			commonController.umbrellaFree(req, res, req.body.to, req.body.from, req.body.umbrellas,
				(areUmbrellasFree) => {

				if (areUmbrellasFree){
					// create umbrellas
					commonController.createUmbrellas(req, res, req.body.umbrellas, (umbrellas)=>{

						let booking = new Booking(req.body);

						booking.umbrellas = umbrellas;
						booking._id = mongoose.Types.ObjectId();

						booking.date_from = req.body.from;
						booking.date_to = req.body.to;
						// to confirm and to cancel
						booking.confirmed = false
						booking.cancelled = false

						// add as first element
						commonController.correctSave(booking, commonController.status_created, res);
					})
				} else {
					commonController.notify(res, commonController.status_error, "Umbrella aren't free");
				}

			})

		} else {
			commonController.notify(res, commonController.bad_request, "Parameters wrong");
		}

	}, req.body.user_id, req.body.umbrellas, req.body.price, req.body.from, req.body.to);
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


/**
 * Modify booking:
 * 	. umbrella are passed as an array of numbers in req.body.umbrellas
 * 	N.B. Date are passed as from and to
 * @param req
 * @param res
 */
module.exports.modify_booking = function(req, res) {

	// TODO checck if umbrellas are free
	commonController.findByIdFirstLevelCollection(req, res, "book", Booking, "book not found",
		req.params.id, (err, docResult)=>{

			let from = docResult.date_from
			let to = docResult.date_to

			if (req.body.user_id)
				docResult.user_id = req.body.user_id

			if ((req.body.date_from)
				&& (new Date(req.body.date_from).getTime() >= Date.now())){
				docResult.date_from = new Date(req.body.date_from)
				from = docResult.date_from;
			}

			if ((req.body.date_to)
				&& (new Date(req.body.date_to).getTime() >= docResult.date_from.getTime())){
				docResult.date_to = new Date(req.body.date_to)

				to = docResult.date_to;
			}


			if (req.body.umbrellas){
				let oldUmbrellas = docResult.umbrellas;
				docResult.umbrellas = [];

				if (commonController.umbrellaFree(req, res, to, from, req.body.umbrellas))
					docResult.umbrellas = commonController.createUmbrellas(req.body.umbrellas);
				else
					docResult = oldUmbrellas;
			}

			if (req.body.confirmed && commonController.typeOfBoolean(req.body.confirmed))
				docResult.confirmed = req.body.confirmed

			if (req.body.cancelled && commonController.typeOfBoolean(req.body.confirmed))
				docResult.cancelled = req.body.cancelled

			if ((req.body.price)
				|| (req.body.price >= 0))
				docResult.price = req.body.price;

			if (req.body.services){
				let oldServices = docResult.services;
				docResult.services = [];

				if (commonController.servicesAvailable(req, res, req.body.services))
					docResult.services = req.body.services;
				else
					docResult = oldServices;
			}


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


