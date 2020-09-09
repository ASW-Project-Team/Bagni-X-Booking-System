const mongoose = require('mongoose');
const Customer = require("../models/customerModel.js");
const Booking = require("../models/bookingModel")(mongoose);
const commonController = require("./commonController");

const Umbrella = require("../models/nestedSchemas/umbrellaModel")(mongoose)

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
			&& new Date(req.body.dateFrom).getTime() >= Date.now()
			&& new Date(req.body.dateTo).getTime() >=  new Date(req.body.dateFrom).getTime()
			&& commonController.typeOfString(req.body.userId)) {

			// Customer is present if go inside this callback
			commonController.findByIdFirstLevelCollection(req, res, "Customer", Customer,"",req.body.userId,
				() => {

					// Check if umbrella are free
				commonController.umbrellaFree(req, res, req.body.dateTo, req.body.dateFrom, req.body.umbrellas,
					(areUmbrellasFree) => {

					if (areUmbrellasFree) {

						// create umbrellas
						commonController.createUmbrellas(req, res, req.body.umbrellas, (umbrellas)=>{

							if (req.body.services){

								commonController.servicesAvailable(req, res, req.body.services, (areServicesAvailable)=>{

									if (areServicesAvailable){
										commonController.constructServices(req, res, req.body.services, (services)=>
											applyBooking(req, res, umbrellas, services)
										)

									} else
										commonController.notify(res, commonController.badRequest, "Service not available")

								})
							} else {

								applyBooking(req, res, umbrellas, "")
							}
						})
					} else
						commonController.notify(res, commonController.statusError, "Umbrella aren't free");
				})
			})
		} else
			commonController.notify(res, commonController.badRequest, "Malformed request!");

	}, req.body.userId, req.body.umbrellas, req.body.price, req.body.dateFrom, req.body.dateTo);
};

function applyBooking(req, res, umbrellas, services){

	let booking = new Booking(req.body);

	if (services)
		booking.services = services

	booking.umbrellas = umbrellas;
	booking._id = mongoose.Types.ObjectId();
	booking.userId = mongoose.Types.ObjectId(req.body.userId);

	booking.dateFrom = new Date(req.body.dateFrom);
	booking.dateTo = new Date(req.body.dateTo);
	// to confirm and to cancel
	booking.confirmed = false
	booking.cancelled = false

	// add as first element
	commonController.correctSave(booking, commonController.statusCreated, res);
}

/**
 * Get the booking specified in id
 * @param req The GET specific booking request
 * @param res The GET specific booking response
 */
module.exports.getBooking = function(req, res) {

	commonController.findByIdFirstLevelCollection(req, res, "book", Booking, "",
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
module.exports.modifyBooking = function(req, res) {


	bookingAndUmbrellaServiceCustomerChecks(req, res);

}


/**
 * GET bookings.
 * Two possible scenarios:
 * 	. get a specific customer and get all his bookings
 * 	. get page-id and page-size: in this case return bookings from id to size.
 * 		In this case there are default value both for id and size.
 * @param req The specified GET request
 * @param res The specified GET response
 */
module.exports.readBookings = function(req, res) {

	commonController.findAllFromCollection(req, res, collectionName, Booking
		, "", (err, bookings) => {
			if (req.params.id) {

				let bookingsFiltered = bookings.filter(x => x.userId.equals(req.params.id));

				if (!bookingsFiltered)
					commonController.servePlain404(req, res, collectionName)
				else
					commonController.response(res, bookingsFiltered)

			}
			else
				commonController.returnPages(parseInt(req.query["page-id"]), parseInt(req.query["page-size"]), req, res, bookings, collectionName)
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
			if (Date.now().valueOf() <= (booking.dateFrom.valueOf() - (conversionDayInMilliseconds * dayBeforeDeleteIsPossible))){
				commonController.deleteFirstLevelCollectionById(req, res, collectionName, Booking, "", req.params.id);
			} else
				commonController.parameterBadFormatted(res)
		});
}

/**
 * GET function that want to return elements of bath available in a well specified period.
 * @param req composed by:
 * 			. "date-from": param in query, the date from which search available umbrellas.
 * 			. "date-from": param in query, the finish date to which search available umbrellas.
 * @param res:
 *  		200:
 *  			. services available.
 *  			. ranks If not don't return that rank.
 *  			. availableUmbrellas that are all the umbrellas free in that period.
 *  		404: if catalog isn't found.
 */
module.exports.getAvailability = function (req, res) {

	commonController.findCatalog(req, res,  async (errCat, catalog) => {

		// Umbrella not free in that periods
		// First filter: if book is not finished
		// Second filter: if bool started in that period
		commonController.umbrellaUsed(req, res, req.query["date-to"], req.query["date-from"], (umbrellaNumberUsed)=>{

			let rankNumberFree = [];
			let rankNumber = -1

			let umbrellas = []

			for (const rank of catalog.rankUmbrellas) {

				rankNumber++
				if (rank) {

					for (let umbrellaNumber = rank.fromUmbrella; umbrellaNumber <= rank.toUmbrella; umbrellaNumber++){

						if (!umbrellaNumberUsed.includes(umbrellaNumber)){

							let elementsToAdd = [];

							let umbrella = {};

							umbrella["number"] = umbrellaNumber;

							if (!rankNumberFree[rankNumber]) {
								rankNumberFree[rankNumber] = {};
								rankNumberFree[rankNumber]["id"] = rank._id;
								rankNumberFree[rankNumber]["name"] = rank.name;
								rankNumberFree[rankNumber]["description"] = rank.description;
								rankNumberFree[rankNumber]["price"] = rank.price;
								rankNumberFree[rankNumber]["imageUrl"] = rank.imageUrl;
								rankNumberFree[rankNumber]["fromUmbrella"] = rank.fromUmbrella;
								rankNumberFree[rankNumber]["toUmbrella"] = rank.toUmbrella
							}

							umbrella["rankId"] = rank._id
							umbrellas.splice(0,0,umbrella);

							rankNumberFree[rankNumber]["availableUmbrellas"] = elementsToAdd;
						}
					}
				}
			}

			let availability = {};

			availability["services"] = catalog.services;
			availability["ranks"] = rankNumberFree;

			availability["availableUmbrellas"] = umbrellas.sort((a, b) => a.number - b.number)

			commonController.response(res, availability);
		});
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

		let from = doc.dateFrom;
		let to = doc.dateTo;

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

async function bookingAndUmbrellaServiceCustomerChecks(req, res) {

	// Check if bookings exist
	await commonController.findByIdFirstLevelCollection(req, res, "book", Booking, "book not found",
		req.params.id, async (err, docResult)=> {

			if (docResult){
				if (checkParams(req.body.dateFrom, req.body.dateTo, req.body.price,
					req.body.confirmed, req.body.cancelled, docResult)) {

					await umbrellaServiceAndCustomerChecks(req, res, docResult)
				}
			} else {
				commonController.parameterBadFormatted(res)
			}
		});

}

async function umbrellaServiceAndCustomerChecks(req, res, docResult) {

	if (req.body.umbrellas) {

		// Check if umbrellas are free
		let to = docResult.dateTo
		if (req.body.dateTo)
			to = req.body.dateTo

		let from = docResult.dateFrom
		if (req.body.dateFrom)
			from = req.body.dateFrom

		let oldUmbrellas = docResult.umbrellas

		// If not do this, the old umbrellas are considered busy but we could change this
		docResult.umbrellas = []
		await docResult.save();

		await commonController.umbrellaFree(req, res, to, from, req.body.umbrellas,
			async (areUmbrellasFree) => {
				if (areUmbrellasFree){

					await serviceAndCustomerChecks(req, res, docResult);
				} else {
					// Return to the precedent situation
					docResult.umbrellas = oldUmbrellas
					await docResult.save()

					commonController.parameterBadFormatted(res);
				}
			});
	} else {
		await serviceAndCustomerChecks(req, res, docResult);
	}
}

async function serviceAndCustomerChecks(req, res, docResult) {

	if (req.body.services) {

		// Check if customer exist
		await commonController.servicesAvailable(req, res, req.body.services, async (areServicesAvailable)=>{

			if (areServicesAvailable){

				await commonController.constructServices(req, res, req.body.services,
					async (services)=>{
						req.body.services = services
						await customerExist(req, res, docResult);
					})
			} else {
				commonController.parameterBadFormatted(res);
			}
		});
	} else {
		await customerExist(req, res, docResult)
	}

}

async function customerExist(req, res, docResult) {

	if (req.body.userId){

		// Check if user exist
		await commonController.customerExist(req, res, req.body.userId, async (isCustomerPresent)=>{

			if (isCustomerPresent) {

				await applyChanges(req, res, req.body.dateFrom, req.body.dateTo, req.body.price,
					req.body.confirmed, req.body.cancelled, req.body.userId, req.body.umbrellas,
					req.body.services, docResult);

			} else {
				commonController.parameterBadFormatted(res);
			}
		});
	} else {
		await applyChanges(req, res, req.body.dateFrom, req.body.dateTo, req.body.price,
			req.body.confirmed, req.body.cancelled, req.body.userId, req.body.umbrellas,
			req.body.services, docResult);
	}
}


async function applyChanges(req, res, reqFrom, reqTo, price, confirmed, cancelled, userId,
							umbrellas, services, doc){

	if (userId)
		doc.userId = userId

	if (reqFrom)
		doc.dateFrom = new Date(reqFrom)

	if (reqTo)
		doc.dateTo = new Date(reqTo)

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
			commonController.correctSave(doc, commonController.statusCompleted, res);
		})
	} else {

		await commonController.correctSave(doc, commonController.statusCompleted, res);
	}

}
