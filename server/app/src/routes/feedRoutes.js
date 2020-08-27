module.exports.set = function(app) {
	// due to not possible two or more require at the same collection
	const feedController = require('../controllers/feedController');

	app.route('/api/news/')
		.get(feedController.read_feed)
		.post(feedController.create_feed);

	app.route('/api/news/:id')
		.get(feedController.read_feed)
		.put(feedController.update_feed)
		.delete(feedController.delete_feed);
};
