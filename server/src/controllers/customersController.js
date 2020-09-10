const Customer = require("../models/customerModel");
const sanitizers = require('./utils/sanitizers');
const common = require('./utils/common');
const auth = require('./utils/auth');


/**
 * Create an unregistered customer in the database, authenticates it
 * and returns its data (except passwords). Required responses:
 * - 201: The customer has been correctly authenticated.
 * - 400: The request is malformed, or the admin is present yet.
 */
module.exports.createUnregisteredCustomer = async function(req, res) {
  // Sanitization
  const email = sanitizers.toEmail(req.body.email);
  const name = sanitizers.toString(req.body.name);
  const surname = sanitizers.toString(req.body.surname);
  const phone = sanitizers.toPhone(req.body.phone);
  const address = sanitizers.toString(req.body.address);

  // creation flow
  await common.create(req, res, Customer, {
    email: email,
    name: name,
    surname: surname,
    registered: false,
    deleted: false,
    phone: phone,
    address: address
  }, ['email', 'phone', 'address']
  );
};


/**
 * Return all customers, or only the customer with the given id, paginated.
 * Required responses:
 * For "customer:id":
 *  - 200: The server returned the specified customer.
 *  - 401: The admin/customer was not correctly authenticated.
 *  - 404: An customer with the given id does not exist.
 * For all customers:
 *  - 200: The server returned the customers list.
 *  - 401: The admin that do the operation was not correctly authenticated.
 */
module.exports.readCustomer = async function(req, res) {
  // Sanitization
  const paramId = sanitizers.toMongoId(req.params.id);
  const pageId = sanitizers.toInt(req.params['page-id']);
  const pageSize = sanitizers.toInt(req.params['page-size']);

  // reading flow
  await common.read(req, res, Customer, paramId, pageId, pageSize,
    [{ surname: 1}, { name: 1}], true);
};


/**
 * Modifies customer data. Required responses:
 * - 200: All fields are corrected, the item has been modified.
 * - 400: Malformed request.
 * - 401: The customer was not correctly authenticated.
 * - 404: An customer with the given id does not exist.
 */
module.exports.updateCustomer = async function(req, res) {
  // Sanitization
  const paramId = sanitizers.toMongoId(req.params.id);
  const email = sanitizers.toEmail(req.body.email);
  const password = sanitizers.toPassword(req.body.password);
  const name = sanitizers.toString(req.body.name);
  const surname = sanitizers.toString(req.body.surname);
  const phone = sanitizers.toPhone(req.body.phone);
  const address = sanitizers.toString(req.body.address);
  const deleted = sanitizers.toBool(req.body.deleted);

  // todo check if email is taken?

  // Update flow
  await common.update(req, res, Customer, paramId, {
    email: email,
    hash: password ? auth.createHash(password) : undefined,
    name: name,
    surname: surname,
    deleted: deleted,
    phone: phone,
    address: address
  });
};


/**
 * Deletes a customer logcally by the db, using the id parameter. Required
 * responses:
 * - 200: The customer has been correctly removed.
 * - 400: Malformed request.
 * - 401: Not correctly authenticated.
 * - 404: A customer with the given id does not exist.
 */
module.exports.deleteCustomerLogically = async function (req, res) {
  // Sanitization
  const paramId = sanitizers.toMongoId(req.params.id);

  // Deletion flow
  await common.delete(req, res, Customer, paramId, true);
}

