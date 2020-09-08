module.exports.set = function(app) {
    const adminController = require('../controllers/adminsController');

    app.route('/api/admins/')
        .get(adminController.returnAdmins);

    app.route('/api/admins/:id')
        .get(adminController.returnAdmins)
        .put(adminController.modifyAdmin)
        .delete(adminController.deleteAdmin);
};
