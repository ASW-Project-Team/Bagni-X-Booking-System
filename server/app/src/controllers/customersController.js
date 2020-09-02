const mongoose = require('mongoose');

const Customer = require("../models/customerModel")(mongoose);
const commonController = require("./commonController");

/**
 * GET a specific customer or paginated.
 * @param req
 * @param res
 */
module.exports.readCustomer = function(req, res) {
    if (req.params.id){
        commonController.findByIdFirstLevelCollection(req, res, "Customer",Customer, "",
            req.params.id, (err, docResult) => {

                if (!req.body.deleted)
                    commonController.response(res, docResult)
                else
                    commonController.notify(res, commonController.statusError,
                        "The customer with the given id does not exist, or it has been logically deleted.")
            })
    } else {
        commonController.findAllFromCollection(req, res, "Customer",Customer,"",
            (err, customers)=>{

                // Return tot pages
                commonController.returnPages(req.query["page-id"], req.query["page-size"], req, res, customers,
                    "Customers")
        })
    }

};

/**
 * POST a new customer
 * @param req that in body have required fields:
 *  . name
 *  . surname
 *  . email
 *  . pass
 * and not required fields:
 *  . phone
 *  . address
 * @param res:
 *  . If body params are all correct responds with "Status created (200)" and the json for customer
 *  . If not responds with "Status Bad Format (400)".
 */
module.exports.createCustomer = function(req, res) {
    commonController.areRequiredFieldsPresent(req, res, () => {

        if (commonController.typeOfString(req.body.name)
            && commonController.typeOfString(req.body.surname)
            && commonController.checkEmail(req.body.email)
            && commonController.typeOfString(req.body.password)
            && commonController.typeOfBoolean(req.body.registered)
            && (!(req.body.phone) || (commonController.typeOfString(req.body.phone)))
            && (!(req.body.address) || (commonController.typeOfString(req.body.address)))){

            commonController.checkPassword(res, req.body.password, ()=>{
                let customer = new Customer(req.body);
                customer._id = mongoose.Types.ObjectId();

                customer.salt = commonController.genRandomString(commonController.saltLength);
                customer.hashedPassword = commonController.sha512(req.body.password, customer.salt);
                // When customer is created isn't registered or deleted

                customer.deleted = false;

                commonController.correctSave(customer, commonController.statusCreated, res);
            });

        } else {
            commonController.parameterBadFormatted(res);
        }

    }, req.body.name, req.body.surname, req.body.email, req.body.password, req.body.registered);

};

/**
 * UPDATE a specific Customer
 * @param req that in body could have fields:
 *  . name
 *  . surname
 *  . email
 *  . pass
 *  . phone
 *  . address
 * @param res:
 *  . If body params are all correct responds with "Status completed (201)" and the json for customer
 *  . If not responds with "Status Bad Format (400)".
 */
module.exports.updateCustomer = function(req, res) {
    commonController.findByIdFirstLevelCollection(req, res, "customer", Customer, "",
        req.params.id, (err, customer)=>{

        if ((!(req.body.name) ||commonController.typeOfString(req.body.name))
            && (!(req.body.surname) || commonController.typeOfString(req.body.surname))
            && (!(req.body.email) ||commonController.checkEmail(req.body.email))
            && (!(req.body.phone) || (commonController.typeOfString(req.body.phone)))
            && (!(req.body.address) || (commonController.typeOfString(req.body.address)))
            && (!(req.body.password) || commonController.typeOfString(req.body.password))) {

            if (req.body.password){
                commonController.checkPassword(res, req.body.password,()=>{
                    customer.hashedPassword = commonController.sha512(req.body.password,
                        customer.salt);

                    applyCustomersModify(req, customer, res)

                });
            } else {

                applyCustomersModify(req, customer, res)

            }

        } else {
            commonController.parameterBadFormatted(res)
        }
    });
};

/**
 * DELETE LOGICALLY a Customer
 * @param req
 * @param res
 */
module.exports.deleteCustomerLogically = function (req, res) {
    commonController.findByIdFirstLevelCollection(req, res, "customerser", Customer, "",
        req.params.id, (err, customerResult)=>{

            customerResult.deleted = true;
            commonController.correctSave(customerResult, commonController.statusCompleted, res);
    });
}

/**
 * Apply PUT changes
 * @param req
 * @param docResult
 * @param res
 */
function applyCustomersModify(req, docResult, res){

    if (req.body.name)
        docResult.name = req.body.name

    if (req.body.surname)
        docResult.surname = req.body.surname

    if (req.body.phone)
        docResult.phone = req.body.phone

    if (req.body.email)
        docResult.email = req.body.email

    if (req.body.address)
        docResult.address = req.body.address

    if (req.body.registered)
        docResult.registered = req.body.registered

    if (req.body.deleted)
        docResult.deleted = req.body.deleted

    commonController.correctSave(docResult, commonController.statusCompleted, res);
}
