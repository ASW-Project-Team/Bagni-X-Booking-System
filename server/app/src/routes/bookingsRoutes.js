module.exports.set = function(app) {
	// due to not possible two or more require at the same collection
	const bookingsController = require('../controllers/bookingsController');


	app.route('/api/new-booking/checkout/')
		.post(bookingsController.create_booking)

	app.route('/api/bookings')
		.get(bookingsController.read_bookings);

	app.route('/api/bookings/:id')
		.get(bookingsController.get_booking)
		.delete(bookingsController.delete_booking)
		.put(bookingsController.modify_booking);
};
