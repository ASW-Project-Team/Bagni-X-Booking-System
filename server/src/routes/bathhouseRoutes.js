module.exports.set = function (app) {
  const bathhouseController = require('../controllers/bathhouseController')
  const bathhouseImgSupport = require('../controllers/utils/imageUploader').bathhouseImgSupport;

  app.route('/api/bathhouse/')
    .get(bathhouseController.readBathhouse)
    .put(bathhouseImgSupport, bathhouseController.updateBathhouse)
}
