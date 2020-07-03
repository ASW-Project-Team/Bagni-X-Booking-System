module.exports.set = function(app) {
	const usersRoutes = require('./usersRoutes');
	const bookingRoutes = require('./bookingsRoutes');
	const genericRoutes = require('./genericRoutes');
	// todo add all required root here

	usersRoutes.set(app);
	bookingRoutes.set(app);

	// the generic routes setting must be called last, handling all
	// remaining routes
	genericRoutes.set(app);
};
