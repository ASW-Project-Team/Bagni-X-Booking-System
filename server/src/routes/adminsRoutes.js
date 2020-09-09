module.exports.set = function(app) {
    const adminController = require('../controllers/adminsController');

    app.route('/api/admins/')
        .get(adminController.readAdmins);

    app.route('/api/admins/:id')
        .get(adminController.readAdmins)
        .put(adminController.updateAdmin)
        .delete(adminController.deleteAdmin);
};
