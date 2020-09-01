const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const User = require("../models/userModel")(mongoose);
const Admin = require("../models/adminModel")(mongoose);
//const Booking = require("../models/bookingModel")(mongoose);

const config = require('./secret.json');

module.exports = {
    authenticate_customer,
    authenticate_admin,
    create,
    adminById,
    userById
};


async function authenticate_customer({ username, password }) {
    const user = await User.findOne({ username });
    if(user){
        if (user && bcrypt.compareSync(password, user.hash)) {
            const token = jwt.sign({sub: user.id} , config.secret, {expiresIn: '7d', audience: 'customer'});
            return {
                ...user.toJSON(),
                token
            };
        }
    }
}

async function authenticate_admin({ username, password }) {
    const admin = await Admin.findOne({ username });
    if (admin && bcrypt.compareSync(password, admin.hash)) {
        const token = jwt.sign({sub: admin.id}, config.secret, {expiresIn: '7d', audience: 'admin'});
        return {
            ...admin.toJSON(),
            token
        };
    }
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'E-mail address ' + userParam.username + ' is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function userById(id) {
    return await User.findById(id);
}

async function adminById(id) {
    return await Admin.findById(id);
}

