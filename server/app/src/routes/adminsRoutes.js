module.exports.set = function(app) {
    const adminController = require('../controllers/adminsController');

/*    app.route('/api/admins/:id')
        .delete(adminController.delete_admin);*/


    app.route('/api/admins/authenticate/')
        .get(adminController.authenticate_admin);


    app.route('/api/admins/change_password/')
        .put(adminController.change_password);


    app.route('/api/admins/')
        .delete(adminController.delete_admin)
        .post(adminController.create_admin);


};
