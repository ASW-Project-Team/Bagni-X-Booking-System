module.exports.set = function (app) {
  const servicesController = require('../controllers/servicesController')
  const imgSupport = require('../utils/imageSupport').service;

  app.route('/api/catalog/services/:id')
    .get(servicesController.readServices)
    .put(imgSupport, servicesController.updateService)
    .delete(servicesController.deleteService)

  app.route('/api/catalog/services/')
    .get(servicesController.readServices)
    .post(imgSupport, servicesController.createService)
}
