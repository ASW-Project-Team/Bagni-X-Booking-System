module.exports.set = function (app) {
  const bathhouseController = require('../controllers/bathhouseController')
  const imgUpload = require('../utils/imageUpload');

  app.route('/api/bathhouse/')
    .get(bathhouseController.readBathhouse)
    .put(imgUpload.addSupport, bathhouseController.updateBathhouse)
}
