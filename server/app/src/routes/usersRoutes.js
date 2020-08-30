module.exports.set = function(app) {
    const usersController = require('../controllers/usersController');

    app.route('/api/customers/:id')
        .get(usersController.readUser)
        .put(usersController.updateUser)
        .delete(usersController.deleteUserLogically);

    app.route('/api/customers/')
        .get(usersController.readUser)
        .post(usersController.createUser);



};
