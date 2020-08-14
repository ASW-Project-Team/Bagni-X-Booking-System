module.exports.set = function(app) {
	const usersRoutes = require('./usersRoutes');
	const bookingRoutes = require('./bookingsRoutes');
	const genericRoutes = require('./genericRoutes');
	const catalogRoutes = require('./catalogRoutes');
	const feedRoutes = require('./feedRoutes');
	// todo add all required root here

	usersRoutes.set(app);
	bookingRoutes.set(app);
	catalogRoutes.set(app);
	feedRoutes.set(app);


	// the generic routes setting must be called last, handling all
	// remaining routes
	genericRoutes.set(app);
};
