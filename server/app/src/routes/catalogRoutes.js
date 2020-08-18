module.exports.set = function(app) {
    const catalogController = require('../controllers/catalogController');

    app.route('/api/catalog/ranks/')
        .get(catalogController.read_ranks)
        .post(catalogController.create_rank);

    app.route('/api/catalog/ranks/:id')
        .put(catalogController.update_rank);

    app.route('/api/catalog/sales/')
        .get(catalogController.read_sales)
        .post(catalogController.create_sale);

    app.route('/api/catalog/sales/:id')
        .get(catalogController.read_sales)
        .put(catalogController.update_sale);

    app.route('/api/catalog/services/')
        .get(catalogController.read_services)
        .post(catalogController.create_service);

    app.route('/api/catalog/services/:id')
        .put(catalogController.update_service)
        .get(catalogController.read_services);

    app.route('/api/new-booking/availability/')
        .get(catalogController.get_availability);


}