module.exports.set = function(app) {
    const catalogController = require('../controllers/catalogController');

    app.route('/api/catalog/umbrellas/:id')
        .get(catalogController.read_umbrellas)
        .put(catalogController.update_umbrellas);

    app.route('/api/catalog/umbrellas/')
        .get(catalogController.read_umbrellas)
        .post(catalogController.create_umbrella);

    app.route('/api/catalog/ranks/')
        .get(catalogController.read_ranks)
        .post(catalogController.create_rank);

    app.route('/api/catalog/ranks/:id')
        .put(catalogController.update_rank);

    app.route('/api/catalog/sales/:id')
        .get(catalogController.read_sale);

    app.route('/api/catalog/services/')
        .post(catalogController.create_service);

    app.route('/api/catalog/services/:id')
        .get(catalogController.read_services);
}