const mongoose = require('mongoose');

const Customer = require("../models/customerModel")(mongoose);
const commonController = require("./commonController");
const authUtils = require('../authentication/utils');
const bcrypt = require('bcryptjs');
const validators = require('./utils/validators');
const responseGen = require('./utils/responseGenerator');


const areEmailAndPwValid = function (email, password) {
    return validators.isEmail(email) && validators.isPassword(password)
}


/**
 * Create a customer in the database, authenticates it and returns its
 * data (except passwords). Required responses:
 * - 201: The customer has been correctly authenticated.
 * - 400: The request is malformed, or the admin is present yet.
 */
module.exports.createCustomer = async function(req, res) {
  // 1. fields sanitization
  const email = req.bodyString('email');
  const password = req.bodyString('password');
  const name = req.bodyString('name');
  const surname = req.bodyString('surname');
  const phone = req.bodyString('phone');
  const address = req.bodyString('address');
  const registered = req.bodyString('registered');

  // 2. fields validation
  if (!validators.isEmail(email) || !validators.isPassword(password)
    || !validators.isFullString(name) || !validators.isFullString(surname)
    || !validators.isBoolean(registered)) {
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
  const hash = bcrypt.hashSync(password, 10)
  const customerToInsert = new Customer({
    _id: mongoose.Types.ObjectId(),
    email: email,
    hash: hash,
    name: name,
    surname: surname,
    registered: registered,
    deleted: false,
    phone: validators.isPhoneNumber(phone) ? phone : undefined,
    address: validators.isFullString(address) ? address : undefined
  })

  const generatedCustomer = await customerToInsert.save();

  // 5. returns the customer data and the jwt
  const responseCustomerData = {
    id: generatedCustomer._id,
    email: generatedCustomer.email,
    name: generatedCustomer.name,
    surname: generatedCustomer.surname,
    registered: generatedCustomer.registered,
    deleted: generatedCustomer.deleted,
    phone: generatedCustomer.phone,
    address: generatedCustomer.address,
    jwt: authUtils.generateCustomerToken(generatedCustomer)
  }
  responseGen.respondCreated(res, responseCustomerData);
};


/**
 * Modifies customer data. Required responses:
 * - 200: All fields are corrected, the item has been modified.
 * - 400: Malformed request.
 * - 401: The customer was not correctly authenticated.
 * - 404: An customer with the given id does not exist.
 */
module.exports.updateCustomer = async function(req, res) {
  // 1. fields sanitization
  const email = req.bodyString('email');
  const password = req.bodyString('password');
  const name = req.bodyString('name');
  const surname = req.bodyString('surname');
  const phone = req.bodyString('phone');
  const address = req.bodyString('address');
  const paramId = req.paramString('id')
  const deleted = req.bodyString('deleted');


  // 2. fields validation
  if (!validators.isMongoId(paramId)) {
    responseGen.respondMalformedRequest(res)
    return
  }

  // 3. updates the customer, if exists
  const customerFound = await Customer.findOneAndUpdate(
    { _id: paramId },
    {
      email: validators.isEmail(email) ? email : undefined,
      hash: validators.isPassword(password) ? bcrypt.hashSync(password, 10) : undefined,
      name: validators.isFullString(name) ? name : undefined,
      surname: validators.isFullString(surname) ? surname : undefined,
      deleted: validators.isBoolean(deleted) ? deleted : undefined,
      phone: validators.isPhoneNumber(phone) ? phone : undefined,
      address: validators.isFullString(address) ? address : undefined
    },
    {
      omitUndefined: true, // if fields are undefined, they will not be updated
      new: true, // if true, return the modified document rather than the original. defaults to false
    })

  // 4. if the customer not exists, respond 404
  if (!customerFound) {
    responseGen.respondNotFound(res, 'Customer')
    return;
  }

  // 5. request completed
  responseGen.respondOK(res)
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
  const paramId = req.paramString('id')

  // 2. try the removal
  let removedCustomer;
  if (validators.isMongoId(paramId)) {
    // find the admin by the id, if present
    removedCustomer = await Customer.findAndModify({ _id: paramId }, { deleted: true });

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
  // 1. fields sanitization
  const paramId = req.paramString('id');

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

    const responseCustomerData = {
      id: foundCustomer._id,
      email: foundCustomer.email,
      name: foundCustomer.name,
      surname: foundCustomer.surname,
      registered: foundCustomer.registered,
      deleted: foundCustomer.deleted,
      phone: foundCustomer.phone,
      address: foundCustomer.address,
    }

    responseGen.respondOK(res, responseCustomerData)
    return;
  }

  // if the id is not present, or not valid, return returns the customers, in
  // a paginated fashion
  const customers = await Customer.find();

  // Return tot pages todo
  commonController.returnPages(req.query["page-id"], req.query["page-size"], req, res, customers, "Customers")
};


/**
 * Checks if username and password are present inside the database. Required
 * responses:
 *  - 200: Right combination username/password.
 *  - 400: Wrong combination username/password.
 */
module.exports.authenticateCustomer = async function (req, res) {
    // 1. fields sanitization
    const email = req.bodyString('email');
    const password = req.bodyString('password');

    // 2. fields validation
    if (!areEmailAndPwValid(email, password)) {
        responseGen.respondMalformedRequest(res)
        return;
    }

    // 3. search the customer, if present, by email
    const foundCustomer = await Customer.findOne({ email: email });

    // 4. if the username/password combination is not valid, or the customer is not
    //    present, return an error. The 404 is not used here, to not give too
    //    much information to attackers.
    if (!foundCustomer || !bcrypt.compareSync(password, foundCustomer.hash)) {
        responseGen.respondRequestError(res, 'Incorrect username/password combination.')
        return;
    }

    // returns the customer data and the jwt
    const responseCustomerData = {
        id: foundCustomer._id,
        name: foundCustomer.name,
        surname: foundCustomer.surname,
        phone: foundCustomer.phone,
        address: foundCustomer.address,
        registered: foundCustomer.registered,
        deleted: foundCustomer.deleted,
        jwt: authUtils.generateCustomerToken(foundCustomer),
    }
    responseGen.respondCreated(res, responseCustomerData);
}
