const expressJwt = require('express-jwt');
const utils = require('./utils.js');
const config = require('./secret.json');
console.log(config);
module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked: tokenCorrect })
        .unless({ path: [
                            // Public routes that don't require authentication
                            '/api/home/',
                            '/api/feed/',
                            '/api/auth/customers/register/',
                            '/api/auth/customers/login/',
                            '/api/auth/admin/login/',
                            new RegExp('/api/feed/*')
                        ]
    });
}

async function tokenCorrect(req, payload, done) {
    // The URL of the request
    let urlRequest = req.originalUrl;

    // The request REST method
    let methodRequest = req.method;

    // The id of the user inside the token
    let id = payload.sub;

    // Roots that a customer can't navigate
    let pathNotAllowedCustomer = [ '/api/customers/',
                                   '/api/auth/admin/register/',
                              //'/api/bookings/',
                              //'/api/catalog/ranks/'
                                ];

    // Roots that an admin can't navigate
    let pathNotAllowedAdmin = [];

    let splittedUrl = urlRequest.split('/');

    const customer = await utils.userById(payload.sub);
    if(customer){
        // Roots that only admin can navigate or the id isn't correct
        if(pathNotAllowedCustomer.includes(urlRequest) ||
            isRequestCorrect(splittedUrl, id)){
                return done(null, true);
        }
    }

    const admin = await utils.adminById(payload.sub);
    if(admin){
        // Roots that only customer can navigate
        if(pathNotAllowedAdmin.includes(req.originalUrl)){
            return done(null, true);
        }
        // The admin can't modify a user
        if(splittedUrl[2] !== undefined) {
            if (splittedUrl[2] === 'customers' && methodRequest === 'PUT') {
                return done(null, true);
            }
        }
        // The admin must be root to create a user
        if(splittedUrl[4] !== undefined ) {
            if (!(splittedUrl[4] === 'register' && admin.root)) {
                return done(null, true);
            }
        }
    }

    // revoke token if customer or admin no longer exists
    if (!admin && !customer) {
        return done(null, true);
    }
    done();
};


function isRequestCorrect(customerInUrl, id){
    if('customers' === customerInUrl[2] && id !== customerInUrl[3]){
        return false;
    }
    return true;
}