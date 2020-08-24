module.exports.set = function(app) {
    const usersController = require('../controllers/usersController');

    app.route('/api/auth/customers/signup/')
        .post(usersController.create_user)

    app.route('/api/auth/customers/signin/')
        .post(usersController.authenticate)

};
