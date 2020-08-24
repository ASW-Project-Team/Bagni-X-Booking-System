const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const User = require("../../models/userModel")(mongoose); ;

const config = require('./config.json');

module.exports = {
    authenticate,
    create,
    getById
};


async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secretUser, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
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

async function getById(id) {
    return await User.findById(id);
}