const expressJwt = require('express-jwt');
const utils = require('./utils.js');
const config = require('./secret.json');
module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked: tokenCorrect })
        .unless({ path: [
                            // Public routes that don't require authentication
                            '/api/home/',
                            '/api/auth/customers/register/',
                            '/api/auth/customers/login/',
                            '/api/auth/admins/login/',
                            { url: '/api/news/', methods: ['GET'] },
                            { url: new RegExp('/api/news/*'), methods: ['GET']},
                            { url: new RegExp('/assets/*'), methods: ['GET']},
                            { url: new RegExp('^((?!/api).)*$')}
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

    // The audience (security purposes)
    let audience = payload.aud;

    // Roots that a customer can't navigate
    let pathNotAllowedCustomer = ['/api/customers/',
                                  '/api/auth/admin/register/',
                                  '/api/admins/',
                                  '/api/home-cards/',
                                  '/api/bookings/'
                                ];

    let splittedUrl = urlRequest.split('/');

    switch(audience) {
        case 'customer':
            // Security level: customer
            // Roots that only admin can navigate
            if (pathNotAllowedCustomer.includes(urlRequest)){
                return done(null, true);
            }
            // Roots that only the specific customer can navigate
            if(!isRequestCorrect(splittedUrl, id)) {
                return done(null, true);
            }
            if (splittedUrl[2] !== undefined) {
                // Customers can't create, modify or delete news
                if (splittedUrl[2] === 'news' && (methodRequest === 'POST' || methodRequest === 'PUT' || methodRequest === 'DELETE')) {
                    return done(null, true);
                }
                // Customers can't do nothing on admins
                if(splittedUrl[2] === 'admins'){
                    return done(null, true);
                }
                // Customers can't do nothing on home cards
                if(splittedUrl[2] === 'home-cards'){
                    return done(null, true);
                }
                // Customers can't do nothing on catalog
                if(splittedUrl[2] === 'catalog'){
                    return done(null, true);
                }
                // Customers can't modify a booking
                if('bookings' === splittedUrl[2] && methodRequest === 'PUT'){
                    return done(null, true);
                }
            }
            break;
        case 'admin':
            // Security level: admin
            if(splittedUrl[2] !== undefined) {
                // The admin can't modify a user
                if (splittedUrl[2] === 'customers' && methodRequest === 'PUT') {
                    return done(null, true);
                }
                // The admin can't see all the users
                if(splittedUrl[2] === 'admins' && splittedUrl[3] === ''){
                    return done(null, true);
                }
                // The admin can't delete admins
                if(splittedUrl[2] === 'admins' && methodRequest === 'DELETE'){
                    return done(null, true);
                }
                // Roots that only the specific admin can navigate
                if(!isRequestCorrect(splittedUrl, id)){
                    return done(null, true);
                }
            }
            // The admin must be root to create another admin
            if(splittedUrl[4] !== undefined ) {
                if ((splittedUrl[4] === 'register')) {
                    return done(null, true);
                }
            }
            break;
        case 'root':
            // Security level: root admin
            // The root admin can't modify a user
            if(splittedUrl[2] !== undefined) {
                if (splittedUrl[2] === 'customers' && methodRequest === 'PUT') {
                    return done(null, true);
                }
            }
            break;
        default:
            // No audience
            return done(null, true);
    }

    // Security check
    // if the user no longer exits in the db, the token is revoked
    const customer = await utils.userById(payload.sub);
    if (!(customer)) {
        const admin = await utils.adminById(payload.sub);
        if(!(admin)){
            return done(null, true);
        }
    }
    done();
}


async function isRequestCorrect(userInUrl, id){
    if('customers' === userInUrl[2] && id !== userInUrl[3]){
        return false;
    }
    if('admins' === userInUrl[2] && id !== userInUrl[3]){
        return false;
    }
    if('bookings' === userInUrl[2] && 'customer' === userInUrl[3]){
        const booking = await utils.bookingById(id);
        if(booking.userId !== id){
            return false;
        }
    }
    return true;
}