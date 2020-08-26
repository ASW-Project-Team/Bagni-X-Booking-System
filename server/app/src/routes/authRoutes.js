module.exports.set = function(app) {
    const usersController = require('../controllers/usersController');
    const adminsController = require('../controllers/adminsController');

    app.route('/api/auth/customers/signup/')
        .post(usersController.create_user)

    app.route('/api/auth/customers/signin/')
        .post(usersController.authenticate)

    app.route('/api/auth/admin/signup/')
        .post(adminsController.create_admin)

    app.route('/api/auth/admin/signin/')
        .post(adminsController.authenticate)

};
