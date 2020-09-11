/**
 * @file The module contains a middleware responsible of securing the api
 * endpoints, via manual token authentication.
 */

const jwt = require('jsonwebtoken')
const config = require('../../config.json');
const respGen = require('./responseGenerator')
const Customer = require('../models/customerModel')
const Admin = require('../models/adminModel')
const sanitizers = require('./sanitizers')
const bcrypt = require('bcrypt');

/**
 * Lists endpoints that not require authentication, neither JWT.
 * @type {{url: string|RegExp, methods: [string]}[]}
 */
const freeEndpoints = [
  { url: new RegExp('^\/home\/?$'), methods: ['GET'] },
  { url: new RegExp('^\/news\/?$'), methods: ['GET'] },
  { url: new RegExp('^\/news\/.*$'), methods: ['GET'] },
  { url: new RegExp('^\/auth\/customers\/register\/?$'), methods: ['POST'] },
  { url: new RegExp('^\/auth\/customers\/login\/?$'), methods: ['POST'] },
  { url: new RegExp('^\/auth\/admins\/login\/?$'), methods: ['POST'] },
]

/**
 * Lists endpoints accessible to all authenticated customers (or admins).
 * @type {{url: string|RegExp, methods: [string]}[]}
 */
const allCustomersEndpoints = [
  { url: new RegExp('^\/new-booking\/.+$'), methods: ['GET', 'POST'] },
  { url: new RegExp('^\/stats\/?$'), methods: ['GET'] },
]

/**
 * Lists endpoints accessible only from the involved customer (or admins).
 * @type {{url: string|RegExp, methods: [string]}[]}
 */
const customerSpecificEndpoints = [
  { url: new RegExp('^\/customers\/.+$'), methods: ['GET', 'DELETE'] },
  { url: new RegExp('^\/bookings\/customer\/.+$'), methods: ['GET'] },
  { url: new RegExp('^\/bookings\/.+$'), methods: ['GET', 'DELETE'] },
]

/**
 * Lists endpoints accessible only from admins.
 * @type {{url: string|RegExp, methods: [string]}[]}
 */
const allAdminsEndpoints = [
  { url: new RegExp('^\/customers\/?$'), methods: ['GET', 'POST'] },
  { url: new RegExp('^\/customers\/.+$'), methods: ['PUT', 'POST'] },
  { url: new RegExp('^\/news\/.+$'), methods: ['POST', 'PUT', 'DELETE'] },
  { url: new RegExp('^\/home-cards\/?$'), methods: ['GET'] },
  {
    url: new RegExp('^\/home-cards\/.*$'),
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  { url: new RegExp('^\/bathhouse\/?$'), methods: ['GET', 'PUT'] },
  {
    url: new RegExp('^\/catalog\/.+$'),
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
  },
  { url: new RegExp('^\/bookings\/.+$'), methods: ['PUT'] },
  { url: new RegExp('^\/bookings\/?$'), methods: ['GET'] },
]

/**
 * Lists endpoints accessible only from the interested admin (or the root).
 * @type {{url: string|RegExp, methods: [string]}[]}
 */
const adminSpecificEndpoints = [
  { url: new RegExp('^\/admins\/.+'), methods: ['GET', 'PUT', 'POST', 'DELETE'], },
]

/**
 * Lists endpoints accessible only from the root admin.
 * @type {{url: string|RegExp, methods: [string]}[]}
 */
const rootEndpoints = [
  { url: new RegExp('^\/auth\/admins\/register\/?$'), methods: ['POST'] },
  { url: new RegExp('^\/admins\/?$'), methods: ['GET'] },
]

/**
 * Lists endpoints that require a JWT.
 * @type {{url: string|RegExp, methods: [string]}[]}
 */
const securedEndpoints = rootEndpoints.concat(adminSpecificEndpoints).
  concat(allAdminsEndpoints).
  concat(customerSpecificEndpoints).
  concat(allCustomersEndpoints)


/**
 * Checks whether the given endpoint is in the endpoint list.
 * @param {{url: string, method: string}} endpoint
 * @param {Array.<{url: string|RegExp, methods: string[]}>} allowedEndpoints
 * @return {boolean}
 */
const endpointMatches = (endpoint, allowedEndpoints) => {
  let endpointMatch = false
  allowedEndpoints.forEach(({ url, methods }) => {
    if (url instanceof RegExp && endpoint.url.match(url) || url ===
      endpoint.url) {
      if (methods.includes(endpoint.method)) {
        endpointMatch = true
      }
    }
  })
  return endpointMatch
}


/**
 * Tries to retrive and parse the token. Responds undefined if the token is
 * not found, or not parsable.
 * @return {string|null}
 */
const parseToken = async (authHeader) => {
  // Gather the jwt access token from the request header
  const token = authHeader && authHeader.split(' ')[1]

  // case no token found
  if (token == null) {
    return undefined;
  }

  // try verification
  try {
    return await jwt.verify(token, config.jwtSecret)
  } catch (e) {
    // case wrong token, or expired
    return undefined;
  }
}

/**
 * Utility to extract the id part of the url.
 * @param {string} url - The url.
 * @return {string} The id part.
 */
const getInlineParam = (url) => {
  const parts = url.split('/')
  return parts[parts.length - 1]
}


/**
 * If the admin-customer no longer exits in the db, the token is revoked
 * @param token
 * @return {Promise<boolean>}
 */
const isTokenRevoked = async (token) => {
  if (token.aud === 'root' || token.aud  === 'admin') {
    const admin = await Admin.findById(token.sub)
    if (!admin) {
      return true;
    }
  } else if (token.aud === 'customer') {
    const customer = await Customer.findById(token.sub)
    if (!customer) {
      return true;
    }
  }
  return false;
}


/**
 * For each endpoint checks the required security level. Returns true if the
 * given user has the required privileges, false otherwise.
 * @param {{url:string, method: string}} endpoint - the endpoint to verify.
 * @param {string} audience - the aud field of the token.
 * @param {string} userId - The sub field of the token.
 * @param {Object} req - The request object.
 * @return {boolean} True if the given user has the required privileges,
 * false otherwise.
 */
const endpointsCheck = (endpoint, audience, userId, req) => {
  // secure endpoints verification
  switch (true) {
    case endpointMatches(endpoint, rootEndpoints):
      if (audience === 'root') {
        return true;
      }
      break;

    case endpointMatches(endpoint, adminSpecificEndpoints):
      if (audience === 'root') {
        return true;
      } else if (audience === 'admin') {
        const paramId = sanitizers.toString(getInlineParam(endpoint.url))
        if (paramId === userId) {
          return true;
        }
      }
      break;
    case endpointMatches(endpoint, allAdminsEndpoints):
      if (audience === 'admin' || audience === 'root') {
        return true;
      }
      break;
    case endpointMatches(endpoint, customerSpecificEndpoints):
      if (audience === 'admin' || audience === 'root') {
        return true;

      } else if (audience === 'customer') {
        let custId;
        if (endpoint.url.match(new RegExp('^\/bookings\/customer\/.+$'))) {
          custId = sanitizers.toString(getInlineParam(endpoint.url))
        } else {
          custId = sanitizers.toString(req.body.customerId);
        }

        if (custId === userId) {
          return true;
        }
      }

      break;
    case endpointMatches(endpoint, allCustomersEndpoints):
      if (audience === 'admin' || audience === 'root' || audience === 'customer') {
        return true;
      }
      break;
  }
  return false;
}


/**
 * Middleware module that checks whether the client is authorized to access
 * the specified API endpoint.
 */
module.exports.middleware = async (req, res, next) => {
  const endpoint = { url: req.url, method: req.method }

  // pass, for the free routes
  if (endpointMatches(endpoint, freeEndpoints)) {
    return next();
  }

  // respond 404 with non-existing API routes
  if (!endpointMatches(endpoint, securedEndpoints)) {
    return respGen.respondNotFoundRoute(res)
  }

  // SECURED ZONE: from here, a JWT is required
  const parsedToken = await parseToken(req.headers['authorization']);

  // token not found, or not valid
  if (!parsedToken) {
    return respGen.respondUnauthorized(res);
  }

  // control if token is revoked
  if (await isTokenRevoked(parsedToken)) {
    return respGen.respondUnauthorized(res);
  }

  // checks the security level required for each endpoint
  if (!endpointsCheck(endpoint, parsedToken.aud, parsedToken.sub, req)) {
    return respGen.respondUnauthorized(res);
  }

  return next();
}


/**
 * Generates the token for the given admin.
 */
module.exports.generateAdminToken = function(admin) {
  return jwt.sign(
    { sub: admin.id },
    config.jwtSecret,
    { expiresIn: '7d', audience: admin.root ? 'root' : 'admin' });
}


/**
 * Generates the token for the given customer.
 */
module.exports.generateCustomerToken = function(customer) {
  return jwt.sign(
    { sub: customer.id },
    config.jwtSecret,
    { expiresIn: '7d', audience: 'customer' });
}


module.exports.passwordValid = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}


module.exports.createHash = (password) => {
  return bcrypt.hashSync(password, 10);
}
