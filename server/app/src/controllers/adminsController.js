const mongoose = require('mongoose');
const Admin = require("../models/adminModel")(mongoose);
const commonController = require("./commonController");

/**
 * Check if admin is authenticated or not.
 * @param req
 * @param res with 403 if:
 *  . password is wrong or
 *  . username is wrong
 * This mechanism is used due to not help cracker that want to attach DB.
 *        If username and password are right responds also with a Json object with username,
 *        authenticate=true and jwt.
 */
module.exports.authenticate_admin = function(req, res) {

    findAdmin(req, res, req.body.username, req.body.password,
        (elemFounded) => {

            if (elemFounded.hashedPassword === commonController.sha512(req.body.password, elemFounded.salt)){

                let response = {}

                response["username"] = req.body.username;
                response["authenticate"] = true;
                //response["jwt"] =

                commonController.response(res, response);
            }
            else{

                commonController.unauthorized_401(res);
            }

        }, () =>{

            commonController.unauthorized_401(res);


        });

/*    commonController.findAllFromCollection(req, res, "admin", Admin, "",
        (err, docResult) => {
            let admin = docResult.filter(x => x.username === req.body.username
                             && commonController.sha512(req.body.password, x.salt) === x.hashedPassword);
            if (admin)
                commonController.response(res, "Authenticated");
            else
                commonController.serve_plain_404(req, res, "admin");
        })*/
};

/**
 * Create a admin that isn't root. This admin topology can't create new admin.
 * @param req
 * @param res
 */
module.exports.create_admin = function(req, res) {
    findAdmin(req, res, req.body.username, req.body.password,
        () => {

        commonController.already_present(res, "admin");

        }, () => {

        commonController.checkPassword(res, req.body.password, ()=>{

            // If someone pass root = true
            req.body.root = false

            let admin = new Admin(req.body)
            admin._id = mongoose.Types.ObjectId();
            admin.salt = commonController.genRandomString(commonController.salt_length);
            admin.hashedPassword = commonController.sha512(req.body.password, admin.salt);

            commonController.correctSave(admin, commonController.status_created, res)

        })
        /*    if (req.body.password.length>=8){

                req.body.root = false

                let admin = new Admin(req.body)
                admin._id = mongoose.Types.ObjectId();
                admin.salt = commonController.genRandomString(commonController.salt_length);
                admin.hashedPassword = commonController.sha512(req.body.password, admin.salt);

                commonController.correctSave(admin, commonController.status_created, res)
            } else {

                commonController.notify(res, commonController.bad_request, "Password too short");
            }*/
    })
};


/**
 * DELETE by username
 * @param req
 * @param res
 */
module.exports.delete_admin = function(req, res) {
    if (req.body.username){
        commonController.deleteFirstLevelCollectionByUsername(req, res, "admins", Admin,
            "", req.body.username);
    }
/*    else if (req.params.id) {
        commonController.deleteFirstLevelCollection(req, res, "admins", Admin, "", req.params.id);
    }*/
};


/**
 * Change password of a specific username.
 * @param req
 * @param res:
 *  . 200 and object if username is found
 *  . 404 if username isn't found.
 */
module.exports.change_password = function(req, res) {

    findAdmin(req, res, req.body.username, req.body.password,
        (adminFounded) => {

            commonController.updatePassword(res, req.body.password, adminFounded);

        }, () =>{

            commonController.serve_plain_404(req, res, "admin")

        })
};

/**
 * Find an admin by his username.
 * @param req
 * @param res
 * @param username
 * @param password
 * @param funcFounded
 * @param funcNotFounded
 */
function findAdmin(req, res, username, password, funcFounded, funcNotFounded) {
    commonController.areRequiredFieldsPresent(req, res, () =>{


        if ((username && password)
            && commonController.typeOfString(username)
            && commonController.typeOfString(password)) {


            Admin.find({"username": username}, (err, docs) => {

                if (docs.length !== 0){

                    funcFounded(docs[0]);
                } else {

                    funcNotFounded();
                }
            });
        }

    }, req.body.username, req.body.password)
}