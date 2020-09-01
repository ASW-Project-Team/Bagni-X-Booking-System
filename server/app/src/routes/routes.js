module.exports.set = function(app) {
	const usersRoutes = require('./usersRoutes');
	const bookingRoutes = require('./bookingsRoutes');
	const genericRoutes = require('./genericRoutes');
	const catalogRoutes = require('./catalogRoutes');
	const feedRoutes = require('./newsRoutes');
	const adminRoutes = require('./adminsRoutes');
	const authRoutes = require('./authRoutes')
	usersRoutes.set(app);
	bookingRoutes.set(app);
	catalogRoutes.set(app);
	feedRoutes.set(app);
	adminRoutes.set(app);
	authRoutes.set(app);

	// the generic routes setting must be called last, handling all
	// remaining routes
	genericRoutes.set(app);
};
