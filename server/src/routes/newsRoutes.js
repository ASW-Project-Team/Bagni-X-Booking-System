module.exports.set = function(app) {
	const newsController = require('../controllers/newsController');
	const imgUpload = require('../utils/imageUpload');

	app.route('/api/news/')
		.get(newsController.readNews)
		.post(imgUpload.addSupport, newsController.createNews);

	app.route('/api/news/:id')
		.get(newsController.readNews)
		.put(imgUpload.addSupport, newsController.updateNews)
		.delete(newsController.deleteNews);
};
