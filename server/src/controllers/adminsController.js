const Admin = require('../models/adminModel');
const authUtils = require('../authentication/utils');
const bcrypt = require('bcryptjs');
const validators = require('./utils/validators');
const sanitizers = require('./utils/sanitizers');
const responseGen = require('./utils/responseGenerator');
const common = require('./utils/common');


/**
 * Create a non-root admin, in the database, authenticates it and returns its
 * data (except passwords). Required responses:
 * - 201: The admin has been correctly authenticated.
 * - 400: The request is malformed, or the admin is present yet.
 * - 401: The requester admin is not root.
 */
module.exports.createAdmin = async function (req, res) {
  // 1. fields sanitization
  const username = sanitizers.toString(req.body.username);
  const password = sanitizers.toPassword(req.body.password);

  // 2. fields validation
  if (!validators.areFieldsValid(username, password)) {
    responseGen.respondMalformedRequest(res)
    return
  }

  // 3. controls if admin exists yet
  const adminFound = await Admin.findOne({ username: username })
  if (adminFound) {
    responseGen.respondAlreadyPresent(res)
    return;
  }

  // 4. creates a new admin with the given credentials, and saves it
  const adminToInsert = new Admin({
    root: false,
    username: username,
    hash: bcrypt.hashSync(password, 10),
  })
  const generatedAdmin = await adminToInsert.save();

  // 5. returns the admin data and the jwt
  const responseAdminData = common.filterSensitiveInfoObj(generatedAdmin);
  responseAdminData.jwt = authUtils.generateAdminToken(generatedAdmin);
  console.log(responseAdminData);
  console.log(responseAdminData.jwt);
  responseGen.respondCreated(res, responseAdminData);
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


/**
 * Modifies admin data. Required responses:
 * - 200: All fields are corrected, the item has been modified.
 * - 400: Malformed request.
 * - 401: The admin was not correctly authenticated.
 * - 404: An admin with the given id does not exist.
 */
module.exports.modifyAdmin = async function (req, res) {
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
 * Return all admins, or only the admin with the given id. Required responses:
 * For "admin:id":
 *  - 200: The server returned the specified admin.
 *  - 401: The admin was not correctly authenticated.
 *  - 404: An admin with the given id does not exist.
 * For all admins:
 *  - 200: The server returned the admins list.
 *  - 401: The admin that do the operation was not correctly authenticated.
 */
module.exports.returnAdmins = async function (req, res) {
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
 * Checks if username and password are present inside the database. Required
 * responses:
 *  - 200: Right combination username/password.
 *  - 400: Wrong combination username/password.
 */
module.exports.authenticateAdmin = async function (req, res) {
  // 1. fields sanitization
  const username = sanitizers.toString(req.body.username);
  const password = sanitizers.toPassword(req.body.password);

  // 2. fields validation
  if (!validators.areFieldsValid(username, password)) {
    responseGen.respondMalformedRequest(res)
    return;
  }

  // 3. search the admin, if present, by username
  const foundAdmin = await Admin.findOne({ username: username });

  // 4. if the username/password combination is not valid, or the admin is not
  //    present, return an error. The 404 is not used here, to not give too
  //    much information to attackers.
  if (!foundAdmin || !bcrypt.compareSync(password, foundAdmin.hash)) {
    responseGen.respondRequestError(res, 'Incorrect username/password combination.')
    return;
  }

  // returns the admin data and the jwt
  const responseAdminData = common.filterSensitiveInfoObj(foundAdmin);
  responseAdminData.jwt = authUtils.generateAdminToken(foundAdmin);
  responseGen.respondCreated(res, responseAdminData);
}
