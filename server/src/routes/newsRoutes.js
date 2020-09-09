module.exports.set = function(app) {
	// due to not possible two or more require at the same collection
	const newsController = require('../controllers/newsController');
	const newsImgSupport = require('../controllers/utils/imageUpload').newsImgSupport;

	app.route('/api/news/')
		.get(newsController.readNews)
		.post(newsImgSupport, newsController.createNews);

	app.route('/api/news/:id')
		.get(newsController.readNews)
		.put(newsImgSupport, newsController.updateNews)
		.delete(newsController.deleteNews);
};
