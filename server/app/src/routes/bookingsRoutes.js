module.exports.set = function(app) {
	const bookingsController = require('../controllers/bookingsController');

	app.route('/api/bookings')
		.get(bookingsController.list_bookings)
		.post(bookingsController.create_booking);

	app.route('/api/bookings/:id')
		.get(bookingsController.read_booking)
		.put(bookingsController.update_booking)
		.delete(bookingsController.delete_booking);
};
