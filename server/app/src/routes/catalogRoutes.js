module.exports.set = function(app) {
    const catalogController = require('../controllers/catalogController');

    app.route('/api/catalog/ranks/')
        .get(catalogController.readRanks)
        .post(catalogController.createRank);

    app.route('/api/catalog/ranks/:id')
        .get(catalogController.readRanks)
        .put(catalogController.updateRank);

    app.route('/api/catalog/sales/')
        .get(catalogController.readSales)
        .post(catalogController.createSale);

    app.route('/api/catalog/sales/:id')
        .get(catalogController.readSales)
        .put(catalogController.update_sale);

    app.route('/api/catalog/services/')
        .get(catalogController.readServices)
        .post(catalogController.createService);

    app.route('/api/catalog/services/:id')
        .put(catalogController.updateService)
        .get(catalogController.readServices);

    app.route('/api/new-booking/availability/')
        .get(catalogController.get_availability);


}