module.exports.set = function(app) {
    const customerController = require('../controllers/customersController');
    const adminsController = require('../controllers/adminsController');

    app.route('/api/auth/customers/register/')
        .post(customerController.createCustomer)

    app.route('/api/auth/customers/login/')
        .post(customerController.authenticateCustomer)

    app.route('/api/auth/admins/register/')
        .post(adminsController.createAdmin)

    app.route('/api/auth/admins/login/')
        .post(adminsController.authenticateAdmin)

};
