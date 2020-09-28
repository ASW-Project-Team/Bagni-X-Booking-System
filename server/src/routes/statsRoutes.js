module.exports.set = function (app) {
  const statsController = require('../controllers/statsController')

  app.route('/api/stats/current')
    .get(statsController.currentStats)

  app.route('/api/stats/seasons/:id')
    .get(statsController.seasonStats);

  app.route('/api/stats/seasons')
    .get(statsController.lastSeasonStats)
    .post(statsController.closeCurrentSeason);
}
