module.exports.set = function(app) {
	const usersRoutes = require('./usersRoutes');
	const bookingRoutes = require('./bookingsRoutes');
	const genericRoutes = require('./genericRoutes');
	const catalogRoutes = require('./catalogRoutes');
	const newsRoutes = require('./newsRoutes');
	const adminRoutes = require('./adminsRoutes');
	const bathhouseRoutes = require('./bathhouseRoutes');

	usersRoutes.set(app);
	bookingRoutes.set(app);
	catalogRoutes.set(app);
	newsRoutes.set(app);
	adminRoutes.set(app);
	bathhouseRoutes.set(app);

	// the generic routes setting must be called last, handling all
	// remaining routes
	genericRoutes.set(app);
};
