module.exports.set = function(app) {
    const usersController = require('../controllers/usersController');
    const adminsController = require('../controllers/adminsController');

    app.route('/api/auth/customers/register/')
        .post(usersController.create_user)

    app.route('/api/auth/customers/login/')
        .post(usersController.authenticate)

    app.route('/api/auth/admin/register/')
        .post(adminsController.create_admin)

    app.route('/api/auth/admin/login/')
        .post(adminsController.authenticate)

};
