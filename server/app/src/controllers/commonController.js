const mongoose = require('mongoose');
const crypto = require('crypto')

const Booking = require('../models/bookingModel')(mongoose);
const Catalog = require('../models/catalogModel')(mongoose);
const Umbrella = require('../models/nestedSchemas/umbrellaModel')(mongoose);
const CatalogId = require('catalogController').CatalogId;

/**
 * Error for object not found.
 * @param req
 * @param res
 * @param objName
 */
module.exports.serve_plain_404 = function(req, res, objName) {
    this.notify(res, this.status_error, objName + " not found!")
};

/**
 * When create can't go good finish because obj already present.
 * @param res
 * @param document
 */
module.exports.already_present = function(res, document) {
    this.notify(res, this.status_error, document + " already present!")
}

/**
 * Error caused because not all required fields are inserted.
 * @param res
 */
module.exports.field_require_404 = function(res) {
    this.notify(res,this.status_error,"All fields are required, someone  not found!")
};

/**
 * Error caused because not authorized to an access.
 * @param res
 */
module.exports.unauthorized_401 = function(res) {
    this.notify(res,this.status_unauthorized,"Access negated!")
};

/**
 * General structure for response to sell.
 * @param res The response.
 * @param status The response of status.
 * @param jsonObject The string or json object to send.
 */
module.exports.notify = function(res, status, jsonObject){
    res.status(status).json(jsonObject);
}


/**
 * Used for save new document or updated one.
 * @param document The document to save
 * @param status The status that have to be sent in response
 * @param res The response with status and document
 */
module.exports.correctSave = function (document, status, res) {
    document.save((saveErr, updatedDocument) => {
        if (saveErr) {
            res.send(saveErr);
        }

        if (updatedDocument.hashedPassword) {
            updatedDocument.hashedPassword = "";
        }

        res.status(status).json(updatedDocument);
    });
}

/**
 * Used as nested find by id.
 * @param obj Possible object with the specified targetId.
 * @param targetId The Id that object have to do.
 * @returns {null|*} obj if Id is correct, null otherwise.
 */
module.exports.dfs = function (obj, targetId) {
    if (obj.id === targetId) {
        return obj
    }
    return null
}

/**
 * Check if exist error in the operation to do. Error could be in two scenario:
 *  . document don't exist in a collection
 *  . document is null
 * @param err The possible error
 * @param documents The documents searched
 * @param req
 * @param res
 * @param documentName Used for response in error case
 * @param deleteOperation Indicate if is a delete operation. Used because if is applied a DELETE document can't be
 *                        returned because don't exist yet.
 */
module.exports.checkError = function (err, documents, req, res, documentName, deleteOperation = false) {
    if (err)
        res.send(err);
    else {
        if (!deleteOperation && !documents) {
            this.serve_plain_404(req, res, documentName);
        }
    }
}

/**
 * Positive response to an operation
 * @param res The response given with status created and documents used
 * @param documents The documents used
 */
module.exports.response = function (res, documents) {
    res.status(this.status_completed).json(documents);
}

/**
 * GET all documents requested
 * @param err Possible error
 * @param collectionToSearch Collection where could be present
 * @param req
 * @param res
 * @param documentName Name of document, used in error case
 * @param documentsToReturn
 */
module.exports.getDocuments = function (err, collectionToSearch, req, res, documentName, documentsToReturn) {
    this.checkError(err, collectionToSearch, req, res, documentName);
    this.response(res, documentsToReturn);
}

/**
 * Function that update a class. The controls are specified externally because each control is different.
 * @param collectionToUpdate The firstLevelCollection that have to update.
 * @param collectionToSearch The collection (also nested) that documents belongs
 * @param req The specific update request
 * @param res The specific update response
 * @param id The id to search
 * @param func The callback function that is executed only if id is found. In this callback are inserted
 *          all controls.
 */
module.exports.updateCollection = function (collectionToUpdate, collectionToSearch, req, res, id, func) {

    this.getNestedDocument(collectionToSearch, req, res, id, (documentTarget) => {
        func(documentTarget);
        this.correctSave(collectionToUpdate, this.status_created, res);
    });
}

/**
 * Used to do GET for nested documents. It's return the elements that query wants.
 * This function have different scenario:
 *  . if "id" is present return the specific document.
 *  . if "id" isn't present return error.
 * @param collectionToSearch The nested collection where query do the search.
 * @param req The GET request.
 * @param res The GET response.
 * @param id The id to search.
 * @param err The error is used if document isn't present.
 * @param documentName The name of document used if doc is not present.
 */
module.exports.returnNestedDocument = function (collectionToSearch, req, res, id, err, documentName) {
    this.getNestedDocument(collectionToSearch, req, res, id, (documentTarget) =>  {
        this.getDocuments(err, collectionToSearch, req, res, documentName, documentTarget);
    });
}

/**
 * Find an element in a nested collection.
 * @param collectionToSearch The collection (also nested) that documents belongs
 * @param req The specific update request
 * @param res The specific update response
 * @param id The id to search
 * @param func The callback function that is executed only if id is found.
 */
module.exports.getNestedDocument = function(collectionToSearch, req, res, id, func) {

    if (id) {
        let documentTarget = null;

        // Check if blocks infinite time
        let foundElement = false;

        for (let document of collectionToSearch) {
            documentTarget = this.dfs(document, id);
            if (documentTarget) {
                foundElement = true;
                break;
            }
        }

        if (foundElement)
            func(documentTarget);
        else // So we can manipulate also more than two nested level collection. See sale read or put.
            return  this.serve_plain_404(req, res, "Elem");
    } else
        this.serve_plain_404(req, res, "Id in url");

}

/**
 * Find by id for first level class that tracks scenario of error.
 * @param req
 * @param res
 * @param documentName Name used only in case of error
 * @param collFirstLevel Collection where is searched the id
 * @param errDocName Document name used only in case of error.
 * @param id Id to search
 * @param func Callback applied if find is correctly done
 */
module.exports.findByIdFirstLevelCollection = function (req, res, documentName, collFirstLevel, errDocName, id, func) {
    collFirstLevel.findById(mongoose.Types.ObjectId(id), (err, docResult, docResultName) => {
        this.checkError(err, docResult, req, res, errDocName);
        func(err, docResult, docResultName);
    });
}

/**
 * Delete by id for first level class that tracks scenario of error.
 * @param req
 * @param res
 * @param documentName Name used only in case of error.
 * @param collFirstLevel Collection where is searched the id.
 * @param errDocName Document name used only in case of error.
 */
module.exports.deleteFirstLevelCollection = function (req, res, documentName, collFirstLevel, errDocName) {
/*   this.deleteFirstLevelCollectionByProperty(req, res, documentName, collFirstLevel, errDocName,
       "_id", req.params.id);*/

     collFirstLevel.deleteOne({ "_id": req.params.id }, (err, docResult)  => {

        if (!errDocName)
            errDocName = documentName + "not found";


        this.checkError(err, docResult, req, res, errDocName, true);
        this.response(res, "Delete on " + documentName + " completed!");
    });
}

/**
 * Delete by id for first level class that tracks scenario of error.
 * @param req
 * @param res
 * @param documentName Name used only in case of error.
 * @param collFirstLevel Collection where is searched the id.
 * @param errDocName Document name used only in case of error.
 */
module.exports.deleteFirstLevelCollectionByUsername = function (req, res, documentName, collFirstLevel,
                                                                errDocName) {

/*    this.deleteFirstLevelCollectionByProperty(req, res, documentName, collFirstLevel, errDocName,
        "username", req.body.username);*/

    collFirstLevel.deleteOne({ "username": req.body.username }, (err, docResult)  => {


        if (!errDocName)
            errDocName = documentName + "not found";


        this.checkError(err, docResult, req, res, errDocName, true);
        this.response(res, "Delete on " + documentName + " completed!");
    });
}

/**
 * DELETE by a property for first level class that tracks scenario of error.
 * @param req
 * @param res
 * @param documentName Name used only in case of error.
 * @param collFirstLevel Collection where is searched the id.
 * @param errDocName Document name used only in case of error.
 * @param propertyName
 * @param propertyValue
 */
/*module.exports.deleteFirstLevelCollectionByProperty = function(req, res, documentName, collFirstLevel, errDocName,
                                                                propertyName, propertyValue) {


    collFirstLevel.deleteOne({ propertyName: propertyValue }, (err, docResult)  => {

        console.log(propertyName);
        console.log(propertyValue);

        if (!errDocName)
            errDocName = documentName + " not found";


        this.checkError(err, docResult, req, res, errDocName, true);
        this.response(res, "Delete on " + documentName + " completed!");
    });
}*/

/**
 * Find all for a collection with control that this isn't empty.
 * @param req
 * @param res
 * @param documentName Name used only in case of error.
 * @param collFirstLevel Collection where is searched elements.
 * @param errDocName Document name used only in case of error.
 * @param func Function applied if findAll correctly applied.
 */
module.exports.findAllFromCollection = function (req, res, documentName, collFirstLevel, errDocName, func) {
    collFirstLevel.find({}, (err, docResult) => {

        if (!errDocName){
            errDocName = documentName + "not found";
        }

        this.checkError(err, docResult, req, res, errDocName);
        func(err, docResult, documentName);
    });
}

/**
 * Return the specified elements.
 * @param id Where first element start.
 * @param size Number of maximum elements.
 * @param req The specific request.
 * @param res The specific response.
 * @param arrayToSearch The class where elements are taken.
 * @param collectionName The class name.
 */
module.exports.returnPages = function (id, size, req, res, arrayToSearch, collectionName) {

    let pageId = this.default_page_id;
    if (id) {
        pageId = id;
    }

    let pageSize = this.default_page_size;
    if (size) {
        pageSize = size;
    }

    let pages = arrayToSearch;
    // Return error if there aren't any collection present with that id

    if (pageId >= pages.length) {

        this.serve_plain_404(req, res, collectionName);

    } else {

        // Get the resultant pages
        if (pageId + pageSize >= pages.length ) {
            pageSize = pages.length - pageId;
        }

        this.response(res, pages.slice(pageId, pageSize));
    }

}

/**
 * Control if fields required are present. It's used in POST because user can't create document
 * without required fields.
 * @param req
 * @param res
 * @param func Function applied if findAll correctly applied.
 * @param fieldsRequired The fields that are requested because not optional.
 */
module.exports.areRequiredFieldsPresent = function (req, res, func, ...fieldsRequired) {

    let toSave = true;
    for (let field in fieldsRequired){
        if (fieldsRequired[field] === undefined) {
            toSave = false;
        }
    }
    if (toSave) {
        func();
    } else {
        this.field_require_404(res)
    }
}

module.exports.typeOfString = function (par) {

    return typeOfType(par,"string")
}

module.exports.typeOfBoolean = function (par) {

    return typeOfType(par, "boolean")
}

module.exports.typeOfNumber = function (par) {

    return typeOfType(par, "number")
}

function typeOfType(par, parType) {

    let isCorrectType = false;

    if (typeof par === parType)
        isCorrectType = true;

    return isCorrectType;
}

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
module.exports.genRandomString = function(length){

    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
module.exports.sha512 = function(password, salt){
    let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    return hash.digest('hex');

};

/**
 * Update password if succeed password check.
 * There is a supposition that field to update is hashedPassword
 * @param res two scenario:
 *  . if too short return Bad Request
 *  . otherwise return the Object without password visible
 * @param password
 * @param elem
 */
module.exports.updatePassword = function(res, password, elem) {

    this.checkPassword(res, password, ()=>{

       elem.hashedPassword = this.sha512(password, elem.salt);

       this.correctSave(elem, this.status_created, res);
    });
}

/**
 * Check if password have almost the requested length.
 * @param res: If shorter than requested length return Bad Request
 * @param password
 * @param func
 */
module.exports.checkPassword = function(res, password, func){

    if (password.length >= this.password_length){
        func()
    } else {
        this.notify(res, this.bad_request, "Password too short");
    }
}

/**
 * Umbrella not free.
 * @param req
 * @param res
 * @param to
 * @param from
 * @returns {*[]}
 */
module.exports.umbrellaUsed = function (req, res, to, from){

    this.findAllFromCollection(req, res, "book", Booking, ""
        ,(errBook, allBookings) => {
            // Umbrella not free in that periods
            // First filter: if book is not finished
            // Second filter: if bool started in that period
            return allBookings.filter(b => b.date_to.getTime() > new Date(from).getTime()
                && b.date_from.getTime() < new Date(to).getTime()
                && b.confirmed
                && !b.cancelled)
                .flatMap(b => b.umbrellas.map(u => u.number));
        });
    return [];
}

/**
 * Umbrella not free.
 * @param req
 * @param res
 * @param to
 * @param from
 * @param umbrellas
 * @returns {*[]}
 */
module.exports.umbrellaFree = function (req, res, to, from, umbrellas){


    this.findByIdFirstLevelCollection(req, res, "catalog", Catalog, "Catalog",
        mongoose.Types.ObjectId(CatalogId), (err, catalog)=>{
            this.findAllFromCollection(req, res, "book", Booking, ""
                ,() => {

                    let umbrellaUsedInPeriod = this.umbrellaUsed(req, res, to, from);

                    let umbrellaNumberFree = [];
                    for (let rank in catalog.rank_umbrellas) {

                        if (catalog.rank_umbrellas.hasOwnProperty(rank)) {

                            for (let i = catalog.rank_umbrellas[rank].from_umbrella;
                                 i < catalog.rank_umbrellas[rank].to_umbrella;
                                 i++){

                                if (!umbrellaUsedInPeriod.includes(i)){


                                    umbrellaNumberFree.push(i);
                                }
                            }
                        }
                    }

                    return umbrellas.every(u => umbrellaNumberFree.includes(u.number));
                });
        });

    return false;
}

/**
 * Create umbrellas from numbers.
 * @param umbrellasNumber
 * @returns {[]}
 */
module.exports.createUmbrellas = function(umbrellasNumber){

    let umbrellas = [];

    for (let umbrellaNumber in umbrellasNumber) {
        let umbrella = new Umbrella();
        umbrella.number = umbrellasNumber;

        this.findByIdFirstLevelCollection(req, res, "catalog", Catalog, "Catalog",
            mongoose.Types.ObjectId(CatalogId), (err, catalog)=> {

                for (let rank of catalog.rank_umbrellas) {
                    if ((umbrella.number <= rank.to_umbrella)
                        && (umbrella.number >= rank.from_umbrella)){
                        umbrella.rank_id = rank._id;
                    }
                }

        });


        umbrellas.push(umbrella);
    }

    return umbrellas;
}

/**
 * Check if service_ids exists or not.
 * @param req
 * @param res
 * @param services
 * @returns {boolean}
 */
module.exports.servicesAvailable = function (req, res, services){
    this.findByIdFirstLevelCollection(req, res, "catalog", Catalog, "Catalog",
        mongoose.Types.ObjectId(CatalogId), (err, catalog)=>{

        let catalogServices = catalog.services.map(x => x._id);
        return services.every(s => catalogServices.includes(s));

        });
    return false;
}

module.exports.status_created = 201;

module.exports.status_completed = 200;

module.exports.status_error = 404;

module.exports.default_page_id = 0;

module.exports.default_page_size = 10;

module.exports.salt_length = 48;

module.exports.status_unauthorized = 401;

module.exports.bad_request = 400;

module.exports.password_length = 8;