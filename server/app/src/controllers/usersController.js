const mongoose = require('mongoose');
Bathhouse = require("../models/firstlevelcollections/bathhouseModel")(mongoose);
Booking = require("../models/othercollections/bookingModel")(mongoose);
User = require("../models/firstlevelcollections/userModel")(mongoose);


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


/* BOOKINGS */
//const ObjectId = mongoose.Schema.Types.ObjectID
const defaultPageSize = 10;
const defaultPageId = 0; // FIXME to 1


exports.read_bookings = function(req, res) {

    let page_size = defaultPageSize;
    if (isParameterPresent(req.params.page_size)) {
        page_size = req.params.page_size;
    }

    let page_id = defaultPageId;
    if (isParameterPresent(req.params.page_size)) {
        page_id = req.params.page_id;
    }

    if (isParameterPresent(mongoose.Types.ObjectId(req.params.user_id))) {
        read_bookings_from_user(res, ObjectId(req.params.user_id), page_size, page_id);
    }
};

exports.list_bookings = function(req, res) {
    Movie.find({}, function(err, movie) {
        if (err)
            res.send(err);
        res.json(movie);
    });
};

exports.read_booking = function(req, res) {
    Booking.findById(req.params.id, (err, booking) => {
        if (err)
            res.send(err);
        else{
            if(booking == null) {
                res.status(404).send({
                    description: 'Booking not found'
                });

            } else {
                res.status(200).json(booking);
            }
        }
    });
};

exports.create_booking = function(req, res) {

    User.findById(mongoose.Types.ObjectId(req.params.id), (err, user) => {
        if (err) {
            console.log("error");
            res.send(err);
        } else {
            if(user == null) {
                console.log("User not found");
                res.status(404).json("User not found");
            } else {

/*
                let booking = new Booking(req.body);
                booking._id = mongoose.Types.ObjectId();
                user.bookings.push(booking);
*/

                // TODO checks
                let booking = new Booking();
                booking._id = mongoose.Types.ObjectId();
                booking.umbrella_id = mongoose.Types.ObjectId(req.body.umbrella_id);
                booking.price = req.body.price;
                booking.date_from = req.body.date_from;
                booking.date_to = req.body.date_to;

                user.bookings.push(booking);

                user.save((saveErr, updatedUser) => {
                    if (saveErr) {
                        res.send(saveErr);
                    }
                    // 201 -> instance created
                    res.status(201).json(updatedUser);
                });

            }
        }
    });
};

exports.update_booking = function(req, res) {
    User.findById(mongoose.Types.ObjectId(req.params.id), (errUser, user) => {
        if (errUser)
            res.send(errUser);
        else{
            if(user == null){
                res.status(404).send({
                    description: 'User not found'
                });
            }
            else{

                // FIXME aggregate

                let booking = user.bookings.find(correctId);

                if (booking !== undefined) {

                     if (req.body.umbrella_id !== undefined)
                         booking.umbrella_id = mongoose.Types.ObjectId(req.body.umbrella_id);

                     if (req.body.price !== undefined)
                         booking.price = req.body.price;

                     if (req.body.date_from !== undefined)
                         booking.date_from = req.body.date_from;

                     if (req.body.date_to !== undefined)
                         booking.date_to = req.body.date_to;

                     user.save((saveErr, updatedUser) => {
                         if (saveErr) {
                             res.send(saveErr)
                          }

                         res.status(200).json(updatedUser);
                     });
                } else {
                     res.status(404).send("Booking not found");
                 }
            }
        }
    });
};

function correctId(reqId, bookingId) {
    return reqId === bookingId;
}

exports.delete_booking = function(req, res) {
    Movie.deleteOne({_id: req.params.id}, function(err, result) {
        if (err)
            res.send(err);
        else{
            if(result.deletedCount === 0){
                res.status(404).send({
                    description: 'Movie not found'
                });
            }
            else{
                res.json({ message: 'Task successfully deleted' });
            }
        }
    });
};

function isParameterPresent(param) {
    return param !== undefined;
}

function read_bookings_from_user(res, user_id, max_page_size, page_id) {
    let skip_value = page_id * max_page_size;
    let limit_value = (page_id + 1) * max_page_size;
    User.findById(ObjectId(user_id)
        .sort({'bookings.date_from': 'desc'})
        .limit(limit_value)
        .skip(skip_value),  function(err, user){
        if (err)
            res.send(err);
        else {
            if (user == null) {
                res.status(404).send({ // fixme better 404
                    description: 'User or bookings not found'
                });
            } else {
                res.status(200);
                res.json();
            }
        }
    });
    /*User.findById(ObjectId(id), function(err, user) {
        if (err)
            res.send(err);
        else {
            if (user == null) {
                res.status(404).send({ // fixme better 404
                    description: 'User not found'
                });
            } else {
                // responds with user
                let skip_value = page_id * max_page_size;
                let limit_value = (page_id + 1) * max_page_size;
                let bookingsRequested = User.find()
                    .sort({'bookings.date_from': 'desc'})
                    .limit(limit_value)
                    .skip(skip_value)
                    .exec() // Return the promise
                    .values // Return all the values
                    .then(function (bookings) {
                        res.status(200);
                        res.json(bookingsRequested);
                    });


                res.status(200);
                res.json(bookingsRequested);
            }
        }
    });*/
}