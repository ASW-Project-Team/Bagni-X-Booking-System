const mongoose = require('mongoose');

const Customer = require("../models/customerModel")(mongoose);
const commonController = require("./commonController");


/**
 * It returns a specific customer or someones in a paginated result.
 * @param req: two possible scenario:
 * 				1) In request is specified par "id".
 * 				2) In request could be specified "page-id" and/or "page-to".
 * 					page-id: Which one of the incremental paginated results will be delivered. If omitted, default is 0.
 * 					page-size: Maximum size of the results. If omitted, default is 10.
 * @param res: two possible scenario:
 *				1) res:
 *					200: The customer has been correctly delivered.
 *					400: The request was malformed.
 *					404: The customer with the given id does not exist.
 *			 	2) res:
 * 					200: Returns the most recent customers, in a paginated fashion.
 * 					400: The request was malformed.
 */
module.exports.readCustomer = function(req, res) {
    if (req.params.id){
        commonController.findByIdFirstLevelCollection(req, res, "Customer",Customer, "",
            req.params.id, (err, docResult) => {

                if (!docResult.deleted)
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
            && commonController.checkPassword(req.body.password)
            && commonController.typeOfBoolean(req.body.registered)
            && (!(req.body.phone) || (commonController.checkPhone(req.body.phone)))
            && (!(req.body.address) || (commonController.typeOfString(req.body.address)))){

            if (req.body.email){
                findEmailInPostMethod(req.body.email, res,
                    () => applyCustomer(res, req))
            } else
                applyCustomer(res, req)

        } else
            commonController.parameterBadFormatted(res)

    }, req.body.name, req.body.surname, req.body.email, req.body.password, req.body.registered);

};

function applyCustomer(res, req){
    let customer = new Customer(req.body);
    customer._id = mongoose.Types.ObjectId();

    customer.salt = commonController.genRandomString(commonController.saltLength)
    customer.hashedPassword = commonController.sha512(req.body.password, customer.salt)

    // When customer is created isn't registered or deleted
    customer.deleted = false;

    commonController.correctSave(customer, commonController.statusCreated, res)
}

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
            && (!req.body.email
                || commonController.checkEmail(req.body.email))
            && (!(req.body.phone) || (commonController.checkPhone(req.body.phone)))
            && (!(req.body.address) || (commonController.typeOfString(req.body.address)))
            && (!(req.body.password) || commonController.checkPassword(req.body.password))) {

            if (req.body.password)
                customer.hashedPassword = commonController.sha512(req.body.password, customer.salt);

            if (req.body.email){
                findEmailInPutMethod(req.body.email, req.params.id, res,
                    ()=> {
                        applyCustomersModify(req, customer, res)
                    })
            } else
                applyCustomersModify(req, customer, res)

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
    commonController.findByIdFirstLevelCollection(req, res, "customer", Customer, "",
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

    commonController.checkAndActForUpdate(docResult, req,"" ,
        "name", "surname", "phone", "email", "address", "registered", "deleted")
        .then(commonController.correctSave(docResult, commonController.statusCompleted, res))
}

/**
 * Return if email is already present.
 * @param email
 * @param res
 * @param funcNotFounded function if email isn't founded
 * @returns {boolean}
 */
async function findEmailInPostMethod(email, res, funcNotFounded) {

    await findEmail(email,undefined, res, funcNotFounded)

}

async function findEmail(email, id, res, funcNotFounded) {

    await Customer.find({"email": email}, (err, customer) => {

        let emailFind = false

        if (customer[0]){
            for (let i in customer){
                if (customer.hasOwnProperty(i)
                    && (!(id) || !customer[i]._id.equals(id))
                    && !customer[i].deleted) {

                    emailFind = true
                    break;
                }
            }
        }

        if (!emailFind)
            funcNotFounded()
        else
            commonController.parameterBadFormatted(res)

    });
}

/**
 * Find if in a DB a user different from the customer that do the PUT request have already that email.
 * @param email of the customer who do the PUT operation
 * @param id of the customer who do the PUT operation
 * @param res
 * @param funcNotFounded
 * @returns {Promise<void>}
 */
async function findEmailInPutMethod(email, id, res, funcNotFounded) {

    await findEmail(email, id, res, funcNotFounded)
}