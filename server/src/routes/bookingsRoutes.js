module.exports.set = function(app) {
	const bookingsController = require('../controllers/bookingsController');

	app.route('/api/bookings/customer/:id')
		.get(bookingsController.readCustomerBookings);

	app.route('/api/bookings/')
		.get(bookingsController.readBookings);

	app.route('/api/bookings/:id')
		.get(bookingsController.readBookings)
		.delete(bookingsController.deleteBooking)
		.put(bookingsController.modifyBooking);
};
