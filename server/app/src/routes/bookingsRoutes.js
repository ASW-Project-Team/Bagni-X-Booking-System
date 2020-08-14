module.exports.set = function(app) {
	// due to not possible two or more require at the same collection
	const bookingsController = require('../controllers/bookingsController');


	app.route('/api/new-booking/checkout/')
		.post(bookingsController.create_booking)

/*	app.route('/api/bookings')
		.get(bookingsController.list_bookings); // OK*/


	/*app.route('/api/bookings/:id')
		.get(bookingsController.read_booking) // OK
		.put(bookingsController.update_booking) // PUT "id" is associated to user-id
		.post(bookingsController.create_booking) // OK
		.delete(bookingsController.delete_booking); // OK*/
};
