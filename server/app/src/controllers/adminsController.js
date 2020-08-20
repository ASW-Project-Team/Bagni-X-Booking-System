const mongoose = require('mongoose');
const Admin = require("../models/adminModel")(mongoose);
const commonController = require("./commonController");


module.exports.authenticate_admin = function(req, res) {
    commonController.findAllFromCollection(req, res, "admin", Admin, "",
        (err, docResult) => {
            let admin = docResult.filter(x => x.username === req.body.username
                             && commonController.sha512(req.body.password, x.salt) === x.salt);
            if (admin)
                commonController.response(res, "Authenticated");
            else
                commonController.serve_plain_404(req, res, "admin");
        })
};


module.exports.create_admin = function(req, res) {
    commonController.areRequiredFieldsPresent(req, res, () =>{


        if ((req.body.username && req.body.password)
            && commonController.typeOfString(req.body.username)
            && commonController.typeOfString(req.body.password)) {


            Admin.find({"username": req.body.username}, (err, docs) => {

                console.log(docs);

                if (!docs){

                    // If someone pass root = true
                    req.body.root = false

                    let admin = new Admin(req.body)
                    admin._id = mongoose.Types.ObjectId();
                    admin.salt = commonController.genRandomString(commonController.salt_length);
                    admin.password = commonController.sha512(req.body.password, admin.salt);

                    commonController.correctSave(admin, commonController.status_created, res)
                } else {
                    commonController.already_present(res, "admin");
                }
            });
        }

    }, req.body.username, req.body.password)
};



module.exports.delete_admin = function(req, res) {

};


module.exports.change_password = function(req, res) {

};

