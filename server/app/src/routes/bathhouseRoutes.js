module.exports.set = function(app) {
    // due to not possible two or more require at the same collection
    const bathhouseController = require('../controllers/bathhouseController');

    app.route('/api/home/')
    //.get(bathhouseController.read_feed);

}