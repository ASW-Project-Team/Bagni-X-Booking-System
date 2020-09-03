module.exports.set = function(app) {
	// due to not possible two or more require at the same collection
	const newsController = require('../controllers/newsController');

	app.route('/api/news/')
		.get(newsController.readNews)
		.post(newsController.createNews);

	app.route('/api/news/:id')
		.get(newsController.readNews)
		.put(newsController.updateNews)
		.delete(newsController.deleteNews);
};