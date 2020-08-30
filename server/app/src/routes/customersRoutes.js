module.exports.set = function(app) {
    const usersController = require('../controllers/customersController');

    app.route('/api/customers/:id')
        .get(usersController.readCustomer)
        .put(usersController.updateCustomer)
        .delete(usersController.deleteCustomerLogically);

    app.route('/api/customers/')
        .get(usersController.readCustomer)
        .post(usersController.createCustomer);



};
