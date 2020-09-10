const Admin = require('../models/adminModel');
const sanitizers = require('./utils/sanitizers');
const common = require('./utils/common');
const auth = require('./utils/auth');



/**
 * Return all admins, or only the admin with the given id. Required responses:
 * For "admin:id":
 *  - 200: The server returned the specified admin.
 *  - 401: The admin was not correctly authenticated.
 *  - 404: An admin with the given id does not exist.
 * For all admins:
 *  - 200: The server returned the admins list.
 *  - 401: The admin that do the operation was not correctly authenticated.
 */
module.exports.readAdmins = async function (req, res) {
  // Sanitization
  const paramId = sanitizers.toMongoId(req.params.id);
  const pageId = sanitizers.toInt(req.query['page-id']);
  const pageSize = sanitizers.toInt(req.query['page-size']);

  // read flow
  await common.read(req, res, Admin, paramId, pageId, pageSize,
    { sortRules: [{ username: 1 }] });
}


/**
 * Modifies admin data. Required responses:
 * - 200: All fields are corrected, the item has been modified.
 * - 400: Malformed request.
 * - 401: The admin was not correctly authenticated.
 * - 404: An admin with the given id does not exist.
 */
module.exports.updateAdmin = async function (req, res) {
  // Sanitization
  const paramId = sanitizers.toMongoId(req.params.id);
  const username = sanitizers.toString(req.body.username);
  const password = sanitizers.toPassword(req.body.password);

  // Update flow
  await common.update(req, res, Admin, paramId, {
    username: username,
    hash: password ? auth.createHash(password) : undefined,
    name: name,
  });
}


/**
 * Deletes an admin, by id (parameter) or by username (query). Required
 * responses:
 * - 200: The admin has been correctly removed.
 * - 400: Malformed request.
 * - 401: The root was not correctly authenticated.
 * - 404: A admin with the given id/username does not exist.
 */
module.exports.deleteAdmin = async function (req, res) {
  // sanitization
  const paramId = sanitizers.toMongoId(req.params.id);

  // removal flow
  await common.delete(req, res, Admin, paramId);
}
