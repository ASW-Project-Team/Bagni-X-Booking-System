const mongoose = require('mongoose');
const User = require("../models/userModel")(mongoose);

// Before this queries we have to check the permissions to interact with db

// GET OKAY
exports.read_user = function(req, res) {
    User.findById(mongoose.Types.ObjectId(req.params.id), (err, user) => {
        if (err)
            res.send(err);
        else {
            if (user == null) {
                res.status(404).json('User not found'); // fixme better 404
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
    newUser.save(function(err, savedUser) {
        if (err)
            res.send(err);

        res.status(201).json(savedUser);
    });
};


// PUT OKAY
// TODO add checkers for params checkers
exports.update_user = function(req, res) {
    User.findById(mongoose.Types.ObjectId(req.params.id), (err, user) => {
        if (err)
            res.send(err);
        else if (user == null) {
            res.status(404).send({ // fixme better 404
                description: 'User not found'
            });
        } else {

            // FIXME Check that elements are corrected formatted
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

            user.save((saveErr, updatedUser) => {
                if (saveErr) {
                    res.send(saveErr);
                }
                res.status(200).json(updatedUser);
            });
        }
    });
};

// DELETE
exports.delete_user = function(req, res) {
    User.findById(ObjectId(req.params.id), (err, user) => {
        // This assumes all the fields of the object is present in the body.
        user.deleted = true;

        user.save((saveErr, updatedUser) => {
            res.send({ data: updatedUser });
        });
    });
};

