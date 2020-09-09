module.exports.set = function (app) {
  const servicesController = require('../controllers/servicesController')
  const servicesImgSupport = require('../controllers/utils/imageUploader').servicesImgSupport;

  app.route('/api/catalog/services/:id')
    .get(servicesController.readServices)
    .put(servicesImgSupport, servicesController.updateService)
    .delete(servicesController.deleteService)

  app.route('/api/catalog/services/')
    .get(servicesController.readServices)
    .post(servicesImgSupport, servicesController.createService)
}
