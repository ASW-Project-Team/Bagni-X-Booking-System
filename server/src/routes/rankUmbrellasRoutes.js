module.exports.set = function (app) {
  const rankUmbrellasController = require('../controllers/rankUmbrellasController')
  const rankUmbrellasImgSupport = require('../controllers/utils/imageUploader').rankUmbrellasImgSupport;

  app.route('/api/catalog/rank-umbrellas/:id')
    .get(rankUmbrellasController.readRankUmbrellas)
    .put(rankUmbrellasImgSupport, rankUmbrellasController.updateRankUmbrella)
    .delete(rankUmbrellasController.deleteRankUmbrella)

  app.route('/api/catalog/rank-umbrellas/')
    .get(rankUmbrellasController.readRankUmbrellas)
    .post(rankUmbrellasImgSupport, rankUmbrellasController.createRankUmbrella)
}
