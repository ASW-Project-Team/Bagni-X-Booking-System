module.exports.set = function(app) {
    const catalogController = require('../controllers/catalogController');

    app.route('/api/catalog/rank-umbrellas/:id')
        .get(catalogController.readRanks)
        .put(catalogController.updateRank)
        .delete(catalogController.deleteRank);

    app.route('/api/catalog/rank-umbrellas/')
        .get(catalogController.readRanks)
        .post(catalogController.createRank);

    app.route('/api/catalog/sales/')
        .get(catalogController.readSales)
        .post(catalogController.createSale);

    app.route('/api/catalog/sales/:id')
        .get(catalogController.readSales)
        .put(catalogController.updateSale)
        .delete(catalogController.deleteSale);

    app.route('/api/catalog/services/')
        .get(catalogController.readServices)
        .post(catalogController.createService);

    app.route('/api/catalog/services/:id')
        .get(catalogController.readServices)
        .put(catalogController.updateService)
        .delete(catalogController.deleteService);




}