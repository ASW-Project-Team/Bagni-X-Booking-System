module.exports.set = function (app) {
  const servicesController = require('../controllers/servicesController')
  const imgUpload = require('../utils/imageUpload');

  app.route('/api/catalog/services/:id')
    .get(servicesController.readServices)
    .put(imgUpload.addSupport, servicesController.updateService)
    .delete(servicesController.deleteService)

  app.route('/api/catalog/services/')
    .get(servicesController.readServices)
    .post(imgUpload.addSupport, servicesController.createService)
}
