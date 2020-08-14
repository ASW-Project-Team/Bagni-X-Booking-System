const mongoose = require('mongoose');
const User = require("../models/userModel")(mongoose);
const commonController = require("./commonController");

// Before this queries we have to check the permissions to interact with db

// GET OKAY
exports.read_user = function(req, res) {
    User.findById(mongoose.Types.ObjectId(req.params.id), (err, user) => {
        if (err)
            res.send(err);
        else {
            if (user == null) {
                commonController.serve_plain_404(req, res);
            } else {
                // responds with user
                res.status(commonController.status_completed).json(user);
            }
        }
    });
};

// POST OKAY
// TODO add checkers for params
exports.create_user = function(req, res) {
    let newUser = new User(req.body);
    newUser._id = mongoose.Types.ObjectId();

    // 201 -> instance created
    commonController.correctSave(newUser, commonController.status_created, res);
};


// PUT OKAY
// TODO add checkers for params checkers
exports.update_user = function(req, res) {
    User.findById(mongoose.Types.ObjectId(req.params.id), (err, user) => {
        if (err)
            res.send(err);
        else if (user == null) {
            commonController.serve_plain_404(req, res);
        } else {

            if (req.body.deleted !== undefined) { // "deleted": true
                // DELETE
                user.deleted = req.body.deleted;
            } else {
                // FIXME Check that elements are corrected formatted
                // UPDATE
                if (req.body.name !== undefined)
                    user.name = req.body.name;

                if (req.body.surname !== undefined)
                    user.surname = req.body.surname;

                if (req.body.phone !== undefined)
                    user.phone = req.body.phone;

                if (req.body.email !== undefined)
                    user.email = req.body.email;

                if (req.body.address !== undefined)
                    user.address = req.body.address;

            }
            commonController.correctSave(user, commonController.status_completed, res);
        }
    });
};

