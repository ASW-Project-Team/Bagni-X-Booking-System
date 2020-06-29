module.exports.set = function(app) {
    const usersController = require('../controllers/usersController');

    app.route('/api/users')
        .get(usersController.list_users)
        .post(usersController.create_user);

    app.route('/api/users/:id')
        .get(usersController.read_user)
        .put(usersController.update_user)
        .delete(usersController.delete_user);
};
