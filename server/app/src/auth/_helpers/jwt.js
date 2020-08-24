const expressJwt = require('express-jwt');
const userService = require('./utils.js');
const config = require('./config.json');
console.log(config);
module.exports = jwt;

function jwt() {
    const secret = config.secretUser;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/home',
            '/api/feed',
            '/api/auth/customers/signup/',
            '/api/auth/customers/signin/',
            '/api/auth/admin/signin/'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};