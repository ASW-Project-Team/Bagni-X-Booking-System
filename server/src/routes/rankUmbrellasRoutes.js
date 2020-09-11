module.exports.set = function (app) {
  const rankUmbrellasController = require('../controllers/rankUmbrellasController')
  const imgUpload = require('../utils/imageUpload');

  app.route('/api/catalog/rank-umbrellas/:id')
    .get(rankUmbrellasController.readRankUmbrellas)
    .put(imgUpload.addSupport, rankUmbrellasController.updateRankUmbrella)
    .delete(rankUmbrellasController.deleteRankUmbrella)

  app.route('/api/catalog/rank-umbrellas/')
    .get(rankUmbrellasController.readRankUmbrellas)
    .post(imgUpload.addSupport, rankUmbrellasController.createRankUmbrella)
}
