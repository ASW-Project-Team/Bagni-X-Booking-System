module.exports.set = function(app) {
    const adminController = require('../controllers/adminsController');

    app.route('/api/admins/authenticate/')
        .get(adminController.authenticateAdmin);


    app.route('/api/admins/change_password/')
        .put(adminController.changePassword);


    app.route('/api/admins/')
        .delete(adminController.deleteAdmin)
        .post(adminController.createAdmin);


};
