module.exports.set = function(app) {
    const adminController = require('../controllers/adminsController');

    app.route('/api/admins/:id')
        .put(adminController.authenticate_admin)
        .get(adminController.change_password)
        .delete(adminController.delete_admin);

    app.route('/api/admins/')
        .post(adminController.create_admin);



};
