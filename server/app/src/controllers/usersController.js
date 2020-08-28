const mongoose = require('mongoose');
const User = require("../models/userModel")(mongoose);
const commonController = require("./commonController");

/**
 * GET a specific user or paginated.
 * @param req
 * @param res
 */
module.exports.read_user = function(req, res) {
    if (req.params.id){
        commonController.findByIdFirstLevelCollection(req, res, "user",User, "",
            req.params.id, (err, docResult) => {

                if (!req.body.deleted)
                    commonController.response(res, docResult)
                else
                    commonController.notify(res, commonController.status_error,
                        "The user with the given id does not exist, or it has been logically deleted.")
            })
    } else {
        commonController.findAllFromCollection(req, res, "User",User,"",
            (err, users)=>{

                // Return tot pages
                commonController.returnPages(req.body.page_id, req.body.page_size, req, res, users, "Users")
        })
    }

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
            && commonController.typeOfString(req.body.password)
            && commonController.typeOfBoolean(req.body.registered)
            && (!(req.body.phone) || (commonController.typeOfString(req.body.phone)))
            && (!(req.body.address) || (commonController.typeOfString(req.body.address)))){

            commonController.checkPassword(res, req.body.password, ()=>{
                let user = new User(req.body);
                user._id = mongoose.Types.ObjectId();

                user.salt = commonController.genRandomString(commonController.salt_length);
                user.hashedPassword = commonController.sha512(req.body.password, user.salt);
                // When user is created isn't registered or deleted

                user.deleted = false;

                commonController.correctSave(user, commonController.status_created, res);
            });

        } else {
            commonController.parameterBadFormatted(res);
        }

    }, req.body.name, req.body.surname, req.body.email, req.body.password, req.body.registered);

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

                    applyUsersModify(req, docResult, res)

                });
            } else {

                applyUsersModify(req, docResult, res)

            }

        } else {
            commonController.parameterBadFormatted(res)
        }
    });
};

/**
 * DELETE LOGICALLY a user
 * @param req
 * @param res
 */
module.exports.delete_user_logically = function (req, res) {
    commonController.findByIdFirstLevelCollection(req, res, "user", User, "",
        req.params.id, (err, userResult)=>{

            userResult.deleted = true;
            commonController.correctSave(userResult, commonController.status_completed, res);
    });
}

/**
 * Apply PUT changes
 * @param req
 * @param docResult
 * @param res
 */
function applyUsersModify(req, docResult, res){

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

    commonController.correctSave(docResult, commonController.status_completed, res);
}
