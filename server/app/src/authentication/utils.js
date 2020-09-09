const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const Customer = require("../models/customerModel")(mongoose);
const Admin = require("../models/adminModel")(mongoose);
const Booking = require("../models/bookingModel")(mongoose);

const config = require('./secret.json');

module.exports = {
    authenticate_customer,
    authenticate_admin,
    create,
    adminById,
    userById,
    bookingById
};


async function authenticate_customer({ username, password }) {
    const customer = await Customer.findOne({ username });
    if(customer){
        if (customer && bcrypt.compareSync(password, customer.hash)) {
            const token = jwt.sign({sub: customer.id} , config.secret, {expiresIn: '7d', audience: 'customer'});
            return {
                ...customer.toJSON(),
                token
            };
        }
    }
}

async function authenticate_admin({ username, password }) {
    let token;

    const admin = await Admin.findOne({ username });
    if (admin && bcrypt.compareSync(password, admin.hash)) {
        if(admin.root){
            token = jwt.sign({sub: admin.id}, config.secret, {expiresIn: '7d', audience: 'root'});
        }else{
            token = jwt.sign({sub: admin.id}, config.secret, {expiresIn: '7d', audience: 'admin'});
        }
        return {
            ...admin.toJSON(),
            token
        };
    }
}

async function create(userParam) {
    // validate
    if (await Customer.findOne({ username: userParam.username })) {
        throw 'E-mail address ' + userParam.username + ' is already taken';
    }

    const user = new Customer(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function userById(id) {
    return await Customer.findById(id);
}

async function adminById(id) {
    return await Admin.findById(id);
}

async function bookingById(id){
    return await Booking.findById(id);
}
