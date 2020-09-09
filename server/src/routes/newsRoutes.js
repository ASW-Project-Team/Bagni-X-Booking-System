module.exports.set = function(app) {
	const newsController = require('../controllers/newsController');
	const newsImgSupport = require('../controllers/utils/imageUploader').newsImgSupport;

	app.route('/api/news/')
		.get(newsController.readNews)
		.post(newsImgSupport, newsController.createNews);

	app.route('/api/news/:id')
		.get(newsController.readNews)
		.put(newsImgSupport, newsController.updateNews)
		.delete(newsController.deleteNews);
};
