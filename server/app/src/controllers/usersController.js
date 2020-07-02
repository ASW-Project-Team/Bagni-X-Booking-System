const mongoose = require('mongoose');
User = require("../models/firstlevelcollections/userModel.js")(mongoose);

const ObjectId = mongoose.Schema.Types.ObjectID
// Before this queries we have to check the permissions to interact with db


exports.read_user = function(req, res) {
    User.findById(ObjectId(req.params.id), function(err, user) {
        if (err)
            res.send(err);
        else {
            if(user == null) {
                res.status(404).send({ // fixme better 404
                    description: 'User not found'
                });
            } else{
                // responds with user
                res.status(200);
                res.json(user);
            }
        }
    });
};

// POST
exports.create_user = function(req, res) {
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        registered: req.body.registered,
    });

    // 201 -> istance created
    user.save((saveErr, savedUser) => {
        res.status(201).send({ data: savedUser });
    });
};


// customer modify PUT
exports.customer_update_user = function(req, res) {
    User.findById(ObjectId(req.params.id), (err, user) => {
        // This assumes all the fields of the object is present in the body.
        // TODO check se i campi ci sono o no e check che siano ben formattati
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.phone = req.body.phone;
        user.email = req.body.email;
        user.address = req.body.address;

        user.save((saveErr, updatedUser) => {
            res.staut(200).send({ data: updatedUser });
        });
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


