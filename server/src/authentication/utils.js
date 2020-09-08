const jwt = require('jsonwebtoken');
const config = require('./secret.json');


/**
 * Generates the token for the given admin.
 */
module.exports.generateAdminToken = function(admin) {
  return jwt.sign(
    { sub: admin.id },
    config.secret,
    { expiresIn: '7d', audience: admin.root ? 'root' : 'admin' });
}


/**
 * Generates the token for the given customer.
 */
module.exports.generateCustomerToken = function(customer) {
  return jwt.sign(
    { sub: customer.id },
    config.secret,
    { expiresIn: '7d', audience: 'customer' });
}
