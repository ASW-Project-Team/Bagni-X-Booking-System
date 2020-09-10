module.exports.set = function(app) {
	const homeCardsController = require('../controllers/homeController');
	const imgSupport = require('./utils/imageSupport').homeCard;

	app.route('/api/home-cards/')
		.get(homeCardsController.readHomeCards)
		.post(imgSupport, homeCardsController.createHomeCard);

	app.route('/api/home-cards/:id')
		.get(homeCardsController.readHomeCards)
		.put(imgSupport, homeCardsController.updateHomeCard)
		.delete(homeCardsController.deleteHomeCard);

	app.route('/api/home')
	  .get(homeCardsController.getHome)
};
