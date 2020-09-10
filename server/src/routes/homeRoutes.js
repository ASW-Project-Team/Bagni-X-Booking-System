module.exports.set = function(app) {
	const homeCardsController = require('../controllers/homeController');
	const homeCardImgSupport = require('../controllers/utils/imageUploader').homeCardsImgSupport;

	app.route('/api/home-cards/')
		.get(homeCardsController.readHomeCards)
		.post(homeCardImgSupport, homeCardsController.createHomeCard);

	app.route('/api/home-cards/:id')
		.get(homeCardsController.readHomeCards)
		.put(homeCardImgSupport, homeCardsController.updateHomeCard)
		.delete(homeCardsController.deleteHomeCard);

	app.route('/api/home')
	.get(homeCardsController.getHome)
};
