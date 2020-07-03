module.exports.set = function(app) {
    const usersController = require('../controllers/usersController');

    app.route('/api/customers/:id')
        .get(usersController.read_user)
        .put(usersController.update_user)
        .delete(usersController.delete_user);

    app.route('/api/customers/')
        .post(usersController.create_user);
    /* used: {
    "name": "userName",
    "surname": "userSurname",
    "phone": "000000000",
    "email": "user.email@gmail.com",
    "address": "addressUser",
    "registered": true
    }*/




};
