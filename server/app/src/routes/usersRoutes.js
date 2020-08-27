module.exports.set = function(app) {
    const usersController = require('../controllers/usersController');

    app.route('/api/customers/:id')
        .get(usersController.read_user)
        .put(usersController.update_user)
        .delete(usersController.delete_user_logically);

    app.route('/api/customers/')
        .get(usersController.read_user)
        .post(usersController.create_user);



};
