module.exports.set = function(app) {
	const customersRoutes = require('./customersRoutes');
	const bookingRoutes = require('./bookingsRoutes');
	const genericRoutes = require('./genericRoutes');
	const newsRoutes = require('./newsRoutes');
	const adminRoutes = require('./adminsRoutes');
	const authRoutes = require('./authRoutes')
	const bathhouseRoutes = require('./bathhouseRoutes');
	const rankUmbrellasRoutes = require('./rankUmbrellasRoutes');
	const servicesRoutes = require('./servicesRoutes');
	const homeRoutes = require('./homeRoutes');
	const newBookingsRoutes = require('./newBookingRoutes');


	customersRoutes.set(app)
	bookingRoutes.set(app);
	newsRoutes.set(app);
	adminRoutes.set(app);
	authRoutes.set(app);
	bathhouseRoutes.set(app);
	rankUmbrellasRoutes.set(app);
	servicesRoutes.set(app);
	homeRoutes.set(app);
	newBookingsRoutes.set(app);

	// the generic routes setting must be called last, handling all
	// remaining routes
	genericRoutes.set(app);
};
