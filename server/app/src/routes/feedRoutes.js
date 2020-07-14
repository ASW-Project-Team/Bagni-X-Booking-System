module.exports.set = function(app) {
	// due to not possible two or more require at the same collection
	const feedController = require('../controllers/feedController');

	app.route('/api/feed/:id')
		.get(feedController.read_feed)
};
