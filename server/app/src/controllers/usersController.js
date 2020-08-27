const mongoose = require('mongoose');
const User = require("../models/userModel")(mongoose);
const commonController = require("./commonController");
const utils = require('../authentication/utils');
const bcrypt = require('bcryptjs');
// Before this queries we have to check the permissions to interact with db

// GET OKAY
/**
 * GET a specific user
 * @param req
 * @param res
 */
exports.read_user = function(req, res) {
    commonController.findByIdFirstLevelCollection(req, res, "user",User, "",
        req.params.id, (err, docResult) =>{
            commonController.response(res, docResult);
        });
};

// POST OKAY
/**
 * POST a new user
 * @param req
 * @param res
 */
exports.create_user = function(req, res) {
    commonController.areRequiredFieldsPresent(req, res, () => {
        // FIXME More checks for email
        if (commonController.typeOfString(req.body.username)
            && commonController.typeOfString(req.body.surname)
            && commonController.typeOfString(req.body.email)){
            let user = new User(req.body);
            user._id = mongoose.Types.ObjectId();

            if(req.body.password){
                user.hash = bcrypt.hashSync(req.body.password, 10);
            }

            commonController.correctSave(user, commonController.status_created, res);
        }

    }, req.body.username, req.body.surname, req.body.email);

};

/**
 * UPDATE a specific User
 * @param req
 * @param res
 */
exports.update_user = function(req, res) {
    commonController.findByIdFirstLevelCollection(req, res, "user", User, "",
        req.params.id, (err, docResult)=>{

/*        for (let param in req.body) {
            if (req.body.hasOwnProperty(param) && param) {
                console.log(para);
                docResult.param = req.body.par;
            }
        }*/

            if (req.body.name && commonController.typeOfString(req.body.name))
                docResult.name = req.body.name

            if (req.body.surname && commonController.typeOfString(req.body.surname))
                docResult.surname = req.body.surname

            if (req.body.phone && commonController.typeOfString(req.body.phone))
                docResult.phone = req.body.phone

            // FIXME More specific control
            if (req.body.address && commonController.typeOfString(req.body.address))
                docResult.address = req.body.address

            if (req.body.registered && commonController.typeOfBoolean(req.body.registered))
                docResult.registered = req.body.registered

            if (req.body.deleted && commonController.typeOfBoolean(req.body.deleted))
                docResult.deleted = req.body.deleted

            commonController.correctSave(docResult, commonController.status_completed, res);
        })

};

exports.authenticate= function(req, res, next) {
    utils.authenticate_user(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}
