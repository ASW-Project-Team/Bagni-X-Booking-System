module.exports.set = function(app) {
    const bathhouseController = require('../controllers/bathhouseController');

    app.route('/api/home/')
        .get(bathhouseController.getHomeServicesRank);

    app.route('/api/home-card/:id')
        .get(bathhouseController.getHomeCard)
        .put(bathhouseController.modifyHomeCard)
        .delete(bathhouseController.deleteHomeCard);

    app.route('/api/home-card/')
        .post(bathhouseController.insertHomeCard);

    app.route('/api/new-booking/season/')
        .get(bathhouseController.getDateOfSeason);

    app.route('/api/bathhouse')
        .get(bathhouseController.getBathhouse)
        .put(bathhouseController.modifyBathhouse)
        .post(bathhouseController.createBathhouse);
}