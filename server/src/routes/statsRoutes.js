module.exports.set = function (app) {
  const statsController = require('../controllers/statsController')

  app.route('/api/stats/current-season')
    .get(statsController.currentSeason)

  app.route('/api/stats/past-season/:id')
    .get(statsController.pastSeason)

}
