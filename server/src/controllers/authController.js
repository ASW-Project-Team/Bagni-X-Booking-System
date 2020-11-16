const Admin = require('../models/adminModel');
const Customer = require('../models/customerModel');
const auth = require('../utils/authentication');
const validators = require('../utils/validators');
const sanitizers = require('../utils/sanitizers');
const responseGen = require('../utils/responseGenerator');
const respFilters = require('../utils/responseFilters');


/**
 * Create a non-root admin, in the database, authenticates it and returns its
 * data (except passwords). Required responses:
 * - 201: The admin has been correctly authenticated.
 * - 400: The request is malformed, or the admin is present yet.
 * - 401: The requester admin is not root.
 */
module.exports.registerAdmin = async function (req, res) {
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
    responseGen.respondRequestError(res, "È già presente un admin con questo username!");
    return;
  }

  // 4. creates a new admin with the given credentials, and saves it
  const adminToInsert = new Admin({
    root: false,
    username: username,
    hash: auth.createHash(password),
  })
  const generatedAdmin = await adminToInsert.save();

  // 5. returns the admin data and the jwt
  const responseAdminData = respFilters.cleanObject(generatedAdmin);
  responseAdminData.jwt = auth.generateAdminToken(generatedAdmin);
  console.log(responseAdminData);
  console.log(responseAdminData.jwt);
  responseGen.respondCreated(res, responseAdminData);
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
  const password = sanitizers.toString(req.body.password);

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
  if (!foundAdmin || !auth.passwordValid(password, foundAdmin.hash)) {
    responseGen.respondRequestError(res, 'Username o password errati! Ricontrolla le credenziali.')
    return;
  }

  // returns the admin data and the jwt
  const responseAdminData = respFilters.cleanObject(foundAdmin);
  responseAdminData.jwt = auth.generateAdminToken(foundAdmin);
  responseGen.respondCreated(res, responseAdminData);
}


/**
 * Checks if username and password are present inside the database. Required
 * responses:
 *  - 200: Right combination username/password.
 *  - 400: Wrong combination username/password.
 */
module.exports.authenticateCustomer = async function (req, res) {
  // 1. fields sanitization
  const email = sanitizers.toString(req.body.email);
  const password = sanitizers.toString(req.body.password);

  // 2. fields validation
  if (!validators.areFieldsValid(email, password)) {
    responseGen.respondMalformedRequest(res)
    return;
  }

  // 3. search the customer, if present, by email
  const foundCustomer = await Customer.findOne({ email: email }).where({deleted: false});

  // 4. if the username/password combination is not valid, or the customer is not
  //    present, return an error. The 404 is not used here, to not give too
  //    much information to attackers.
  if (!foundCustomer || !auth.passwordValid(password, foundCustomer.hash)) {
    responseGen.respondRequestError(res, 'Email o password errati! Ricontrolla le credenziali.')
    return;
  }

  // returns the customer data and the jwt
  const responseCustomerData = respFilters.cleanObject(foundCustomer);
  responseCustomerData.jwt = auth.generateCustomerToken(foundCustomer);
  responseGen.respondCreated(res, responseCustomerData);
}


/**
 * Create a customer in the database, authenticates it and returns its
 * data (except passwords). Required responses:
 * - 201: The customer has been correctly authenticated.
 * - 400: The request is malformed, or the admin is present yet.
 */
module.exports.registerCustomer = async function(req, res) {
  // 1. fields sanitization
  const email = sanitizers.toEmail(req.body.email);
  const password = sanitizers.toPassword(req.body.password);
  const name = sanitizers.toString(req.body.name);
  const surname = sanitizers.toString(req.body.surname);
  const phone = sanitizers.toPhone(req.body.phone);
  const address = sanitizers.toString(req.body.address);

  // 2. fields validation
  if (!validators.areFieldsValid(email, password, name, surname)) {
    responseGen.respondMalformedRequest(res)
    return;
  }

  // 3. controls if customer exists yet
  const customerFound = await Customer.findOne({ email: email }).where({registered: true});
  if (customerFound) {
    responseGen.respondAlreadyPresent(res)
    return;
  }

  // 4. creates a new customer with the given credentials, and saves it
  const customerToInsert = new Customer({
    email: email,
    hash: auth.createHash(password),
    name: name,
    surname: surname,
    registered: true,
    deleted: false,
    phone: phone,
    address: address
  })
  const generatedCustomer = await customerToInsert.save();

  // 5. returns the customer data and the jwt
  const responseCustomerData = respFilters.cleanObject(generatedCustomer);
  responseCustomerData.jwt = auth.generateCustomerToken(generatedCustomer);
  responseGen.respondCreated(res, responseCustomerData);
};
