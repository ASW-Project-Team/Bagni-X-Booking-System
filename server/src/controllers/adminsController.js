const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const validators = require('./utils/validators');
const sanitizers = require('./utils/sanitizers');
const responseGen = require('./utils/responseGenerator');
const common = require('./utils/common');


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
  // 1. fields sanitization
  const paramId = sanitizers.toMongoId(req.params.id);
  const pageId = sanitizers.toInt(req.params['page-id']);
  const pageSize = sanitizers.toInt(req.params['page-size']);

  // 2. try the extraction
  if (validators.isMongoId(paramId)) {
    // if the id is present and valid, return the correspondent
    // admin non-secret data
    const foundItem = await Admin.findOne({ _id: paramId })

    // admin not present in the db, 404
    if (!foundItem) {
      responseGen.respondNotFound(res, 'Admin')
      return;
    }

    const responseItemData = common.filterSensitiveInfoObj(foundItem);
    responseGen.respondOK(res, responseItemData)
    return;
  }

  // if the id is not present, or not valid, return returns the customers, in
  // alphabetic order, and paginated
  const items = await Admin.find().sort({username: 1});
  const customersDataNonSensitive = common.filterSensitiveInfo(items);
  const paginatedResults = common.filterByPage(pageId, pageSize, customersDataNonSensitive);
  responseGen.respondOK(res, paginatedResults);
}


/**
 * Modifies admin data. Required responses:
 * - 200: All fields are corrected, the item has been modified.
 * - 400: Malformed request.
 * - 401: The admin was not correctly authenticated.
 * - 404: An admin with the given id does not exist.
 */
module.exports.updateAdmin = async function (req, res) {
  // 1. sanitization
  const paramId = sanitizers.toMongoId(req.params.id);
  const username = sanitizers.toString(req.body.username);
  const password = sanitizers.toPassword(req.body.password);

  // 2. fields validation
  if (!validators.isMongoId(paramId)) {
    responseGen.respondMalformedRequest(res)
    return;
  }

  // 3. updates the admin, if exists
  const adminFound = await Admin.findOneAndUpdate(
    { _id: paramId },
    {
      username: username,
      hash: validators.isPassword(password) ? bcrypt.hashSync(password, 10) : undefined
    },
    { omitUndefined: true, new: true }
  );

  // 4. if the admin not exists, respond 404
  if (!adminFound) {
    responseGen.respondNotFound(res, 'Admin')
    return;
  }

  // 5. request completed
  responseGen.respondOK(res)
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
  // 1. sanitization
  const paramId = sanitizers.toMongoId(req.params.id);
  const queryUsername = sanitizers.toString(req.query.username);

  // 2. try the removal
  let removedAdmin;
  if (validators.isMongoId(paramId)) {
    // find the admin by the id, if present
    removedAdmin = await Admin.findOneAndRemove({ _id: paramId });

  } else if (validators.isNonEmptyString(queryUsername)) {
    // find the admin by the username in query params, if the id is not present
    removedAdmin = await Admin.findOneAndRemove({ username: queryUsername });

  } else {
    // If no indication is present, the request is malformed
    responseGen.respondMalformedRequest(res)
    return;
  }

  // 3. If the admin is not found, respond 404
  if (!removedAdmin) {
    responseGen.respondNotFound(res, 'Admin')
    return;
  }

  // 4. request completed
  responseGen.respondOK(res);
}
