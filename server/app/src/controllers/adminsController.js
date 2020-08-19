const mongoose = require('mongoose');
const Admin = require("../models/adminModel")(mongoose);
const commonController = require("./commonController");

// TODO Check se esiste già quell'username

module.exports.authenticate_admin = function(req, res) {
    commonController.findAllFromCollection(req, res, "admin", Admin, "",
        (err, docResult) => {
            // docResult.filter(x=>)
        })
};

// TODO Check se esiste già quell'username

module.exports.create_admin = function(req, res) {
    commonController.areRequiredFieldsPresent(req, res, () =>{

        if ((req.body.username && req.body.password)
            && commonController.typeOfString(req.body.username)
            && commonController.typeOfString(req.body.password)){

            // If someone pass root = true
            req.body.root = false

            let admin = new Admin(req.body)
            admin._id = mongoose.Types.ObjectId();
            admin.salt = commonController.genRandomString(commonController.salt_length);
            admin.password = commonController.sha512(req.body.password, admin.salt);

            commonController.correctSave(admin, commonController.status_created, res);
        }

    }, req.body.username, req.body.password)
};



module.exports.delete_admin = function(req, res) {

};


module.exports.change_password = function(req, res) {

};

