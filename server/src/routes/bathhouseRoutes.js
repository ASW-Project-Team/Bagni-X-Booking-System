module.exports.set = function (app) {
  const bathhouseController = require('../controllers/bathhouseController')
  const imgSupport = require('./utils/imageSupport').bathhouse;

  app.route('/api/bathhouse/')
    .get(bathhouseController.readBathhouse)
    .put(imgSupport, bathhouseController.updateBathhouse)
}
