const mongoose = require('mongoose');
const User = require("../models/userModel.js")(mongoose);
const Booking = require("../models/bookingModel")(mongoose);
const commonController = require("./commonController");

const conversionDayInMilliseconds = 86400000
const dayBeforeDeleteIsPossible = 2
const collectionName = "bookings"


/**
 * Create a booking and check that parameter needed are inserted and corrected.
 * Umbrellas passed as array of number.
 * @param req
 * @param res
 */
module.exports.createBooking = function(req, res) {


	commonController.areRequiredFieldsPresent(req, res, () => {

		// Check if fields are well formatted
		if (commonController.typeOfNumber(req.body.price)
			&& new Date(req.body.date_from).getTime() >= Date.now()
			&& new Date(req.body.date_to).getTime() >=  new Date(req.body.date_from).getTime()
			&& commonController.typeOfString(req.body.user_id)
			&& ((!req.body.services) || (commonController.servicesAvailable(req, res, req.body.services)))) {

			// User is present if go inside this callback
			commonController.findByIdFirstLevelCollection(req, res, "User", User,"",req.body.user_id,
				()=>{

					// Check if umbrella are free
				commonController.umbrellaFree(req, res, req.body.date_to, req.body.date_from, req.body.umbrellas,
					(areUmbrellasFree) => {

					if (areUmbrellasFree) {

						// create umbrellas
						commonController.createUmbrellas(req, res, req.body.umbrellas, (umbrellas)=>{

							let booking = new Booking(req.body);

							booking.umbrellas = umbrellas;
							booking._id = mongoose.Types.ObjectId();
							booking.user_id = mongoose.Types.ObjectId(req.body.user_id);

							booking.date_from = new Date(req.body.date_from);
							booking.date_to = new Date(req.body.date_to);
							// to confirm and to cancel
							booking.confirmed = false
							booking.cancelled = false

							// add as first element
							commonController.correctSave(booking, commonController.status_created, res);
						})
					} else
						commonController.notify(res, commonController.status_error, "Umbrella aren't free");
				})
			})
		} else
			commonController.notify(res, commonController.badRequest, "Malformed request!");

	}, req.body.user_id, req.body.umbrellas, req.body.price, req.body.date_from, req.body.date_to);
};

/**
 * Get the booking specified in id
 * @param req The GET specific booking request
 * @param res The GET specific booking response
 */
module.exports.getBooking = function(req, res) {

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


	bookingAndUmbrellaServiceUserChecks(req, res);

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
module.exports.readBookings = function(req, res) {

	commonController.findAllFromCollection(req, res, collectionName, Booking
		, "", (err, docResult) => {
			if (req.params.id) {

				let docs = docResult.filter(x => mongoose.Types.ObjectId(req.params.id) === x.user_id);

				if (!docs)
					commonController.serve_plain_404(req, res, "Bookings")
				else
					commonController.response(res, docs)

			}
			else
				commonController.returnPages(req.body.page_id, req.body.page_size, req, res, docResult, collectionName)
		});

}

/**
 * DELETE Booking specified by id
 * @param req The specific DELETE request
 * @param res The specific DELETE response
 */
module.exports.deleteBooking = function(req, res) {

	commonController.findByIdFirstLevelCollection(req, res, collectionName, Booking, "", req.params.id,
		(err, booking)=>{
			if (Date.now().valueOf() <= (booking.date_from.valueOf() - (conversionDayInMilliseconds * dayBeforeDeleteIsPossible))){
				commonController.deleteFirstLevelCollection(req, res, collectionName, Booking, "", req.params.id);
			} else
				commonController.parameterBadFormatted(res)
		});
}

/**
 * Check if params are correct.
 * @param reqFrom
 * @param reqTo
 * @param price
 * @param confirmed
 * @param cancelled
 * @param doc
 * @returns {boolean}
 */
function checkParams(reqFrom, reqTo, price, confirmed, cancelled, doc){

	let paramsOk = false;

	if ((!(price) || (commonController.typeOfNumber(price)))
		&& (!(confirmed) || commonController.typeOfBoolean(confirmed))
		&& (!(cancelled) || commonController.typeOfBoolean(cancelled))){

		let from = doc.date_from;
		let to = doc.date_to;

		if ((reqFrom)
			&& (new Date(reqFrom).getTime() >= Date.now()))
			from = new Date(reqFrom)

		if ((reqTo)
			&& (new Date(reqTo).getTime() >= Date.now()))
			to = new Date(reqTo)

		if (to.getTime() >= from.getTime()){
			paramsOk = true;
		}
	}

	return paramsOk;
}

async function bookingAndUmbrellaServiceUserChecks(req, res) {

	// Check if bookings exist
	await commonController.findByIdFirstLevelCollection(req, res, "book", Booking, "book not found",
		req.params.id, async (err, docResult)=> {

			if (docResult){
				if (checkParams(req.body.from, req.body.to, req.body.price,
					req.body.confirmed, req.body.cancelled, docResult)) {

					await umbrellaServiceAndUserChecks(req, res, docResult)
				}
			} else {
				commonController.parameterBadFormatted(res)
			}
		});

}

async function umbrellaServiceAndUserChecks(req, res, docResult) {

	if (req.body.umbrellas) {

		// Check if umbrellas are free
		let to = docResult.date_to
		if (req.body.date_to)
			to = req.body.date_to

		let from = docResult.date_from
		if (req.body.date_from)
			from = req.body.date_from

		let oldUmbrellas = docResult.umbrellas

		// If not do this, the old umbrellas are considered busy but we could change this
		docResult.umbrellas=[]
		await docResult.save();

		await commonController.umbrellaFree(req, res, to, from, req.body.umbrellas,
			async (areUmbrellasFree) => {
				if (areUmbrellasFree){

					await serviceAndUserChecks(req, res, docResult);
				} else {
					// Return to the precedent situation
					docResult.umbrellas = oldUmbrellas
					await docResult.save()

					commonController.parameterBadFormatted(res);
				}
			});
	} else {
		await serviceAndUserChecks(req, res, docResult);
	}
}

async function serviceAndUserChecks(req, res, docResult) {

	if (req.body.services) {

		// Check if user exist
		await commonController.servicesAvailable(req, res, req.body.services, async (areServicesAvailable)=>{

			if (areServicesAvailable){

				await userExist(req, res, docResult);
			} else {
				commonController.parameterBadFormatted(res);
			}
		});
	} else {
		await userExist(req, res, docResult)
	}

}

async function userExist(req, res, docResult) {

	if (req.body.user_id){

		// Check if user exist
		await commonController.userExist(req, res, req.body.user_id, async (isUserPresent)=>{

			if (isUserPresent) {

				await applyChanges(req, res, req.body.from, req.body.to, req.body.price,
					req.body.confirmed, req.body.cancelled, req.body.user_id, req.body.umbrellas,
					req.body.services, docResult);

			} else {
				commonController.parameterBadFormatted(res);
			}
		});
	} else {
		await applyChanges(req, res, req.body.from, req.body.to, req.body.price,
			req.body.confirmed, req.body.cancelled, req.body.user_id, req.body.umbrellas,
			req.body.services, docResult);
	}
}


async function applyChanges(req, res, reqFrom, reqTo, price, confirmed, cancelled, user_id,
							umbrellas, services, doc){

	if (user_id)
		doc.user_id = user_id

	if (reqFrom)
		doc.date_from = new Date(reqFrom)

	if (reqTo)
		doc.date_to = new Date(reqTo)

	if (confirmed)
		doc.confirmed = confirmed

	if (cancelled)
		doc.cancelled = cancelled

	if (price)
		doc.price = price;

	if (services)
		doc.services = services;

	if (umbrellas){

		await commonController.createUmbrellas(req, res, umbrellas,(umbrellasReturned)=>{
			doc.umbrellas = umbrellasReturned;
			commonController.correctSave(doc, commonController.status_completed, res);
		})
	} else {

		await commonController.correctSave(doc, commonController.status_completed, res);
	}

}