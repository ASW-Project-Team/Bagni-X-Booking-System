module.exports.set = function (app) {
  const rankUmbrellasController = require('../controllers/rankUmbrellasController')
  const imgSupport = require('./utils/imageSupport').rankUmbrella;

  app.route('/api/catalog/rank-umbrellas/:id')
    .get(rankUmbrellasController.readRankUmbrellas)
    .put(imgSupport, rankUmbrellasController.updateRankUmbrella)
    .delete(rankUmbrellasController.deleteRankUmbrella)

  app.route('/api/catalog/rank-umbrellas/')
    .get(rankUmbrellasController.readRankUmbrellas)
    .post(imgSupport, rankUmbrellasController.createRankUmbrella)
}
