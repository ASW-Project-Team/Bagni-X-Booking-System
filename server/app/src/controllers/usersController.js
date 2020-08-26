const mongoose = require('mongoose');
const User = require("../models/userModel")(mongoose);
const commonController = require("./commonController");

// Before this queries we have to check the permissions to interact with db

// GET OKAY
/**
 * GET a specific user
 * @param req
 * @param res
 */
module.exports.read_user = function(req, res) {
    commonController.findByIdFirstLevelCollection(req, res, "user",User, "",
        req.params.id, (err, docResult) =>{

            if (!req.body.deleted)
                commonController.response(res, docResult)
            else
                commonController.notify(res, commonController.status_error, "Utente eliminato")
        });
};

/**
 * POST a new user
 * @param req that in body have required fields:
 *  . name
 *  . surname
 *  . email
 *  . pass
 * and not required fields:
 *  . phone
 *  . address
 * @param res:
 *  . If body params are all correct responds with "Status created (200)" and the json for user
 *  . If not responds with "Status Bad Format (400)".
 */
module.exports.create_user = function(req, res) {
    commonController.areRequiredFieldsPresent(req, res, () => {

        // FIXME More checks for email
        if (commonController.typeOfString(req.body.name)
            && commonController.typeOfString(req.body.surname)
            && commonController.typeOfString(req.body.email)
            && commonController.typeOfString(req.body.pass)
            && (!(req.body.phone) || (commonController.typeOfString(req.body.phone)))
            && (!(req.body.address) || (commonController.typeOfString(req.body.address)))){

            commonController.checkPassword(res, req.body.pass, ()=>{
                let user = new User(req.body);
                user._id = mongoose.Types.ObjectId();

                // When user is created isn't registered or deleted
                user.registered = false;
                user.deleted = false;

                commonController.correctSave(user, commonController.status_created, res);
            });

        } else {
            commonController.parameter_bad_formatted(res);
        }

    }, req.body.name, req.body.surname, req.body.email, req.body.pass);

};

/**
 * UPDATE a specific User
 * @param req that in body could have fields:
 *  . name
 *  . surname
 *  . email
 *  . pass
 *  . phone
 *  . address
 * @param res:
 *  . If body params are all correct responds with "Status completed (201)" and the json for user
 *  . If not responds with "Status Bad Format (400)".
 */
module.exports.update_user = function(req, res) {
    commonController.findByIdFirstLevelCollection(req, res, "user", User, "",
        req.params.id, (err, docResult)=>{

        if ((!(req.body.name) ||commonController.typeOfString(req.body.name))
            && (!(req.body.surname) || commonController.typeOfString(req.body.surname))
            && (!(req.body.email) ||commonController.typeOfString(req.body.email))
            && (!(req.body.phone) || (commonController.typeOfString(req.body.phone)))
            && (!(req.body.address) || (commonController.typeOfString(req.body.address)))
            && (!(req.body.pass) || commonController.typeOfString(req.body.pass))) {

            if (req.body.pass){
                commonController.checkPassword(res, req.body.pass,()=>{
                    docResult.hashedPassword = commonController.sha512(req.body.pass,
                        docResult.salt);

                    applyUsersModify(req, docResult)

                    commonController.correctSave(docResult, commonController.status_completed, res);

                });
            } else {

                applyUsersModify(req, docResult)

                commonController.correctSave(docResult, commonController.status_completed, res);
            }

            commonController.parameter_bad_formatted(res)
        }
    });
};

function applyUsersModify(req, docResult){

    if (req.body.name)
        docResult.name = req.body.name

    if (req.body.surname)
        docResult.surname = req.body.surname

    if (req.body.phone)
        docResult.phone = req.body.phone

    if (req.body.email)
        docResult.email = req.body.email

    if (req.body.address)
        docResult.address = req.body.address

    if (req.body.registered)
        docResult.registered = req.body.registered

    if (req.body.deleted)
        docResult.deleted = req.body.deleted

}
