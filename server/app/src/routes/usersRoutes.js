module.exports.set = function(app) {
    const usersController = require('../controllers/customersController');

    app.route('/api/customers/:id')
        .get(usersController.readUser)
        .put(usersController.updateCustomer)
        .delete(usersController.deleteCustomerLogically);

    app.route('/api/customers/')
        .get(usersController.readUser)
        .post(usersController.createCustomer);



};
