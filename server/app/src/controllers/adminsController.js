const mongoose = require('mongoose');
const Admin = require("../models/adminModel")(mongoose);
const commonController = require("./commonController");

/**
 * Check if admin is authenticated or not.
 * This mechanism is used due to not help cracker that want to attach DB.
 * @param req
 * @param res:
 *        200: The customer has been correctly authenticated and responds with a JSON that have fields
 *             "username", "authenticate" (true), and "jwt".
 *        400: The request is malformed or email/pw combination is not correct.
 */
module.exports.authenticateAdmin = function(req, res) {

    findAdmin(req, res, req.body.username, req.body.password,
        (elemFounded) => {

        if (req.body.password && commonController.typeOfString(req.body.password)
        && (elemFounded.hashedPassword === commonController.sha512(req.body.password, elemFounded.salt))){

            let response = {}

            response["username"] = req.body.username;
            response["authenticate"] = true;
            //response["jwt"] =

            commonController.response(res, response);
        }
        else{

            // Email and password aren't corrected.
            commonController.parameterBadFormatted(res);
        }

        // User don't exist.
    }, () => commonController.parameterBadFormatted(res))
};

/**
 * Create a admin that isn't root. This admin topology can't create new admin.
 * @param req
 * @param res:
 *               201: The customer has been correctly authenticated.
 *               400: The request is malformed, or the user is present yet.
 *               401: The client is not root, or email-password combination of the root is wrong.
 */
module.exports.createAdmin = function(req, res) {

    findAdmin(req, res, req.body.username, req.body.password,
        () => {

        commonController.alreadyPresent(res, "admin");
        }, () => {

        if (req.body.password && commonController.typeOfString(req.body.password)){
            commonController.checkPassword(res, req.body.password, ()=>{

                // If someone pass root = true
                req.body.root = false

                let admin = new Admin(req.body)
                admin._id = mongoose.Types.ObjectId();
                admin.salt = commonController.genRandomString(commonController.saltLength);
                admin.hashedPassword = commonController.sha512(req.body.password, admin.salt);

                commonController.correctSave(admin, commonController.statusCreated, res)

            })
        } else
            commonController.parameterBadFormatted(res)

    })
};


/**
 * DELETE by username and by id
 * @param req
 * @param res:
 *              200: The admin has been correctly removed
 *              401: The root was not correctly authenticated.
 *              404: A admin with the given id/username does not exist.
 */
module.exports.deleteAdmin = function(req, res) {

    if (req.query.username) {
        commonController.deleteFirstLevelCollectionByUsername(req, res, "admins", Admin,
            "", req.query.username);
    } else if (req.params.id) {
        commonController.deleteFirstLevelCollectionById(req, res, "admins", Admin, "", req.params.id);
    }
};


/**
 * Request PUT that permits to modify admin's parameter.
 * @param req
 * @param res:
 *          200: All fields are corrected, the item has been modified.
 *          400: Malformed request.
 *          401: The admin was not correctly authenticated.
 *          404: An admin with the given id does not exist.
 */
module.exports.modifyAdmin = function(req, res){

    if (req.params.id) {

        commonController.findByIdFirstLevelCollection(req, res, "admin", Admin, "", req.params.id,
            (admin)=>{

            if ((!(req.body.username) || commonController.typeOfString(req.body.username))
                && (!(req.body.password) || commonController.typeOfString(req.body.password))){

                if (req.body.password){
                    commonController.checkPassword(res, req.body.password, ()=>{

                        applyAdmin(req.body.username, req.body.password, admin, req, res, req.params.id)
                    })
                } else
                    applyAdmin(req.body.username, req.body.password, admin, req, res, req.params.id)
            } else
                commonController.parameterBadFormatted(res)
            });
    } else
        commonController.parameterBadFormatted(res)
}

/**
 * Return all admins or only the admin vy the given id.
 * @param req
 * @param res:
 *  Responses for "admin:id":
 *          200: The server returned the specified admin.
 *          401: The admin was not correctly authenticated.
 *          404: An admin with the given id does not exist.
 *  Responses for all "admins":
 *          200: The server returned the admin's list.
 *          401: The admin that do the operation was not correctly authenticated.
 *          404: All admin.
 */
module.exports.returnAdmins = function (req, res) {

    if (req.params.id)
        commonController.findByIdFirstLevelCollection(req,res,"Admin", Admin, "",req.params.id,
            (err, admin) => commonController.response(res, admin))
    else
        commonController.findAllFromCollection( req, res, "Admins",Admin, "",
            (err, admins) => commonController.response(res, admins))
}

/**
 * Find an admin by his username.
 * @param req
 * @param res
 * @param username
 * @param funcFounded
 * @param funcNotFounded
 */
function findAdmin(req, res, username, funcFounded, funcNotFounded) {
    commonController.areRequiredFieldsPresent(req, res, () =>{


        if (username && commonController.typeOfString(username)) {


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

function applyAdmin(username, password, admin, req, res, id) {

    commonController.findByIdFirstLevelCollection(req, res, "Admin", Admin, "", id, (err, admin)=>{

        if (username)
            admin.username = username

        if (password)
            admin.hashedPassword = commonController.sha512(password, admin.salt)

        commonController.correctSave(admin, commonController.statusCompleted, res)
    })
}