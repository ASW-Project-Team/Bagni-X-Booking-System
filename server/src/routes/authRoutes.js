module.exports.set = function(app) {
    const authController = require('../controllers/authController');

    app.route('/api/auth/customers/register')
        .post(authController.registerCustomer)

    app.route('/api/auth/customers/login')
        .post(authController.authenticateCustomer)

    app.route('/api/auth/admins/register')
        .post(authController.registerAdmin)

    app.route('/api/auth/admins/login')
        .post(authController.authenticateAdmin)
};
