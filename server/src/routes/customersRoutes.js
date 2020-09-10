module.exports.set = function(app) {
  const customersController = require('../controllers/customersController');

  app.route('/api/customers/:id')
    .get(customersController.readCustomer)
    .put(customersController.updateCustomer)
    .delete(customersController.deleteCustomerLogically);

  app.route('/api/customers/')
    .get(customersController.readCustomer)
    .post(customersController.createUnregisteredCustomer);
};
