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

        let user = new User(req.body);
        user._id = mongoose.Types.ObjectId();

        commonController.correctSave(user, commonController.status_created, res);

    }, req.body.name, req.body.surname, req.body.email);

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

            if (req.body.name)
                docResult.name = req.body.name

            if (req.body.surname)
                docResult.surname = req.body.surname

            if (req.body.phone)
                docResult.phone = req.body.phone

            if (req.body.address)
                docResult.address = req.body.address

            if (req.body.registered)
                docResult.registered = req.body.registered

            if (req.body.deleted)
                docResult.deleted = req.body.deleted

            commonController.correctSave(docResult, commonController.status_completed, res);
        })

};

