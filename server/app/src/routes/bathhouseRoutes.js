module.exports.set = function(app) {
    // due to not possible two or more require at the same collection
    const homeCardController = require('../controllers/bathhouseController');

    app.route('/api/home/')
    //.get(feedController.read_feed);

}