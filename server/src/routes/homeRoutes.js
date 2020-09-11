module.exports.set = function(app) {
	const homeCardsController = require('../controllers/homeController');
	const imgUpload = require('../utils/imageUpload');

	app.route('/api/home-cards/')
		.get(homeCardsController.readHomeCards)
		.post(imgUpload.addSupport, homeCardsController.createHomeCard);

	app.route('/api/home-cards/:id')
		.get(homeCardsController.readHomeCards)
		.put(imgUpload.addSupport, homeCardsController.updateHomeCard)
		.delete(homeCardsController.deleteHomeCard);

	app.route('/api/home')
	  .get(homeCardsController.getHome)
};
