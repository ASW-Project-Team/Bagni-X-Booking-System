module.exports.set = function(app) {
    const usersController = require('../controllers/usersController');

    app.route('/api/customers/:id')
        .get(usersController.read_user)
        .put(usersController.update_user);

    app.route('/api/customers/')
        .post(usersController.create_user);

    

};
