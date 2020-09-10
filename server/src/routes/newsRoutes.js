module.exports.set = function(app) {
	const newsController = require('../controllers/newsController');
	const imgSupport = require('./utils/imageSupport').news;

	app.route('/api/news/')
		.get(newsController.readNews)
		.post(imgSupport, newsController.createNews);

	app.route('/api/news/:id')
		.get(newsController.readNews)
		.put(imgSupport, newsController.updateNews)
		.delete(newsController.deleteNews);
};
