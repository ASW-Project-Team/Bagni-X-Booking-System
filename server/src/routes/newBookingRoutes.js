module.exports.set = function(app) {
	const newBookingController = require('../controllers/newBookingController');

	app.route('/api/new-booking/season')
		.get(newBookingController.season)

	app.route('/api/new-booking/availability')
		.get(newBookingController.availability)

	app.route('/api/new-booking/checkout')
		.post(newBookingController.checkout)
};
