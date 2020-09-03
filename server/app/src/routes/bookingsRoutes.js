module.exports.set = function(app) {
	// due to not possible two or more require at the same collection
	const bookingsController = require('../controllers/bookingsController');


	app.route('/api/new-booking/checkout/')
		.post(bookingsController.createBooking)

	app.route('/api/bookings/customer/:id')
		.get(bookingsController.readBookings);

	app.route('/api/bookings/')
		.get(bookingsController.readBookings);

	app.route('/api/bookings/:id')
		.get(bookingsController.getBooking)
		.delete(bookingsController.deleteBooking)
		.put(bookingsController.modifyBooking);


	app.route('/api/new-booking/availability/')
		.get(bookingsController.getAvailability);
};
