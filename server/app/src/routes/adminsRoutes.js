module.exports.set = function(app) {
    const adminController = require('../controllers/adminsController');

/*    app.route('/api/admins/:id')
        .delete(adminController.delete_admin);*/
    
    app.route('/api/admins/')
        .delete(adminController.delete_admin)
        .put(adminController.change_password)
        .post(adminController.create_admin);



};
