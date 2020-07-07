const mongoose = require('mongoose');
const User = require("../models/userModel")(mongoose);
const genericController = require("./genericController");

// Before this queries we have to check the permissions to interact with db

// GET OKAY
exports.read_user = function(req, res) {
    User.findById(mongoose.Types.ObjectId(req.params.id), (err, user) => {
        if (err)
            res.send(err);
        else {
            if (user == null) {
                genericController.serve_plain_404(req, res);
            } else {
                // responds with user
                res.status(200).json(user);
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
    genericController.correct_save(newUser, 201, res);
};


// PUT OKAY
// TODO add checkers for params checkers
exports.update_user = function(req, res) {
    User.findById(mongoose.Types.ObjectId(req.params.id), (err, user) => {
        if (err)
            res.send(err);
        else if (user == null) {
            genericController.serve_plain_404(req, res);
        } else {

            // FIXME Check that elements are corrected formatted
            if (req.body.deleted === true){
                // DELETE
                user.deleted = true;

            } else {
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
            genericController.correct_save(user, 200, res);
        }
    });
};

