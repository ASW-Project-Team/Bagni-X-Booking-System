const Customer = require("../models/customerModel");
const validators = require('./utils/validators');
const sanitizers = require('./utils/sanitizers');
const responseGen = require('./utils/responseGenerator');
const respFilters = require('./utils/responseFilters');
const common = require('./utils/common');
const auth = require('./utils/auth');



/**
 * Create an unregistered customer in the database, authenticates it
 * and returns its data (except passwords). Required responses:
 * - 201: The customer has been correctly authenticated.
 * - 400: The request is malformed, or the admin is present yet.
 */
module.exports.createUnregisteredCustomer = async function(req, res) {
  // 1. fields sanitization
  const email = sanitizers.toEmail(req.body.email);
  const password = sanitizers.toPassword(req.body.password);
  const name = sanitizers.toString(req.body.name);
  const surname = sanitizers.toString(req.body.surname);
  const phone = sanitizers.toPhone(req.body.phone);
  const address = sanitizers.toString(req.body.address);

  // 2. fields validation
  if (!validators.areFieldsValid(name, surname)) {
    responseGen.respondMalformedRequest(res)
    return;
  }

  // 3. controls if customer exists yet
  const customerFound = await Customer.findOne({ email: email });
  if (customerFound) {
    responseGen.respondAlreadyPresent(res)
    return;
  }

  // 4. creates a new customer with the given credentials, and saves it
  const customerToInsert = new Customer({
    email: email,
    hash: password ? auth.createHash(password) : undefined,
    name: name,
    surname: surname,
    registered: false,
    deleted: false,
    phone: phone,
    address: address
  })
  const generatedCustomer = await customerToInsert.save();

  // 5. returns the customer data and the jwt
  const responseCustomerData = respFilters.filterSensitiveInfoObj(generatedCustomer);
  responseGen.respondCreated(res, responseCustomerData);
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


  // 2. try the extraction
  if (validators.isMongoId(paramId)) {
    // if the id is present and valid, return the correspondent
    // admin non-secret data
    const foundCustomer = await Customer.findOne({ _id: paramId })

    // customer not present in the db, 404
    if (!foundCustomer || foundCustomer.deleted) {
      responseGen.respondNotFound(res, 'Customer')
      return;
    }

    const responseCustomerData = respFilters.filterSensitiveInfoObj(foundCustomer);
    responseGen.respondOK(res, responseCustomerData)
    return;
  }

  // if the id is not present, or not valid, return returns the customers, in
  // alphabetic order, and paginated
  const customers = await Customer.find({deleted: false})
  .sort({surname: 1}).sort({name: 1});
  const customersDataNonSensitive = respFilters.filterSensitiveInfo(customers);
  const paginatedResults = respFilters.filterByPage(pageId, pageSize, customersDataNonSensitive);
  responseGen.respondOK(res, paginatedResults);
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
  // 1. sanitization
  const paramId = sanitizers.toMongoId(req.params.id);

  // 2. try the removal
  let removedCustomer;
  if (validators.isMongoId(paramId)) {
    // find the admin by the id, if present
    removedCustomer = await Customer.findOneAndUpdate({ _id: paramId }, { deleted: true });

  } else {
    // If no indication is present, the request is malformed
    responseGen.respondMalformedRequest(res)
    return;
  }

  // 3. If the admin is not found, respond 404
  if (!removedCustomer) {
    responseGen.respondNotFound(res, 'Customer')
    return;
  }

  // 4. request completed
  responseGen.respondOK(res);
}

