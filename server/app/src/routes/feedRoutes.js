module.exports.set = function(app) {
	// due to not possible two or more require at the same collection
	const feedController = require('../controllers/feedController');

	app.route('/api/feed/')
		.get(feedController.read_feed)
		.delete(feedController.delete_feed)
		.post(feedController.create_feed);
};
