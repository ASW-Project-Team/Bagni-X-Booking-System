const Booking = require('../models/bookingModel');
const validators = require('../utils/validators');
const sanitizers = require('../utils/sanitizers');
const common = require('../utils/common');
const respFilters = require('../utils/responseFilters');
const responseGen = require('../utils/responseGenerator');
const dayBeforeDeleteIsPossible = 2



const bookingDeleteLimit = () => {
	const date = new Date();
	date.setDate(date.getDate() - dayBeforeDeleteIsPossible);
	date.setHours(0,0,0,0);
	return date;
}

/**
 */
module.exports.readBookings = async (req, res) => {
	// Sanitization
	const paramId = sanitizers.toMongoId(req.params.id);
	const pageId = sanitizers.toInt(req.params['page-id']);
	const pageSize = sanitizers.toInt(req.params['page-size']);

	// read flow
	await common.read(req, res, Booking, paramId, pageId, pageSize,
		{ sortRules: [{ dateFrom: -1 }, { dateTo: -1 }] });
}


module.exports.readCustomerBookings = async (req, res) => {
	// Sanitization
	const paramUserId = sanitizers.toMongoId(req.params.id);
	const pageId = sanitizers.toInt(req.query['page-id']);
	const pageSize = sanitizers.toInt(req.query['page-size']);

	if (!validators.isMongoId(paramUserId)) {
		responseGen.respondMalformedRequest(res);
	}

	// if the id is not present, or not valid, return returns the news, ordered
	// from the most recent, and paginated
	let items = await Booking.find({customerId: paramUserId}).sort({dateFrom: -1}).sort({dateTo: -1});

	const itemsDataNonSensitive = respFilters.clean(items);
	const paginatedResults = respFilters.filterByPage(pageId, pageSize, itemsDataNonSensitive);
	responseGen.respondOK(res, paginatedResults);
}


module.exports.deleteBooking = async (req, res) => {
	// sanitization
	const paramId = sanitizers.toMongoId(req.params.id);

	// the booking cannot be cancelled the the 2 days before
	if (new Date().getTime() > bookingDeleteLimit().getTime()) {
		responseGen.respondRequestError(res, `The booking cannot be cancelled in the previous ${dayBeforeDeleteIsPossible} days before the start.`);
		return;
	}

	// checks if the id is well formed
	if (!validators.isMongoId(paramId)) {
		responseGen.respondMalformedRequest(res)
		return;
	}

	// tries to update the item, setting the cancelled field to true
	const itemFound = await Booking.findOneAndUpdate({ _id: paramId }, { cancelled: true });

	// if the item is not found, respond 404
	if (!itemFound) {
		responseGen.respondNotFound(res, Booking.modelName);
		return;
	}

	// request completed
	responseGen.respondOK(res);
}


/**
 * Modify booking:
 * 	. umbrella are passed as an array of numbers in req.body.umbrellas
 * 	N.B. Date are passed as from and to
 * @param req
 * @param res
 */
module.exports.modifyBooking = async (req, res) => {
	const paramId = sanitizers.toMongoId(req.params.id)
	const userId = sanitizers.toMongoId(req.body.userId);
	const umbrellas = sanitizers.toArrayOfUmbrellas(req.body.umbrellas);
	const price = sanitizers.toPositiveFloat(req.body.price);
	const confirmed = sanitizers.toArrayOfUmbrellas(req.body.confirmed);
	const cancelled = sanitizers.toPositiveFloat(req.body.cancelled);
	const dateFrom = sanitizers.toDate(req.body.dateFrom);
	const dateTo = sanitizers.toDate(req.body.dateTo);
	const services = sanitizers.toArrayOfServices(req.body.services);

	await common.update(req, res, Booking, paramId,{
		userId: userId,
		dateFrom: dateFrom,
		dateTo: dateTo,
		confirmed: confirmed,
		cancelled: cancelled,
		umbrellas: umbrellas,
		services: services,
		price: price
	});
}
