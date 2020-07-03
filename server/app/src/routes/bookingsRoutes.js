module.exports.set = function(app) {
	// due to not possible two or more require at the same collection
	const bookingsController = require('../controllers/usersController');

	app.route('/api/bookings')
		.get(bookingsController.list_bookings)
		.post(bookingsController.create_booking);

	app.route('/api/bookings/:id')
		.get(bookingsController.read_booking)
		.put(bookingsController.update_booking)
		.delete(bookingsController.delete_booking);
};
