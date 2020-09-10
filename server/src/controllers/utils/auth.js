const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../authentication/secret.json');


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


module.exports.passwordValid = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}


module.exports.createHash = (password) => {
  return bcrypt.hashSync(password, 10);
}
