const mongoose = require('mongoose');

module.exports.serve_plain_404 = function(req, res, objName) {
    res.status(404).json(objName + ' not found');
};

module.exports.field_require_404 = function(req, res) {
    res.status(404).json("All fields are required, someone  not found!");
};



    // We can return the specific modified object
module.exports.correctSave = function (document, status, res) {
    document.save((saveErr, updatedDocument) => {
        if (saveErr) {
            res.send(saveErr);
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

module.exports.checkError = function (err, documents, req, res, documentName, deleteOperation = false) {
    if (err)
        res.send(err);
    else {
        if (!deleteOperation && !documents) { // FIXME !documents
            this.serve_plain_404(req, res, documentName);
        }
    }
}

// I return all document as catalog and not the specific as the new umbrella added
module.exports.response = function (res, documents) {
    res.status(this.status_completed).json(documents);
}

// I could add also to return the specific nested document
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
    getNestedDocument(collectionToSearch, req, res, id, (documentTarget) =>  {
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
 * @param documentName
 * @param collFirstLevel
 * @param errDocName
 * @param id
 * @param func
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
 * @param documentName
 * @param collFirstLevel
 * @param errDocName
 */
module.exports.deleteFirstLevelCollection = function (req, res, documentName, collFirstLevel, errDocName) {
    collFirstLevel.deleteOne({ _id: req.body.id }, (err, docResult)  => {

        if (!errDocName)
            errDocName = documentName + "not found";


        this.checkError(err, docResult, req, res, errDocName, true);
        this.response(res, "Delete on " + documentName + " completed!");
    });
}

/**
 * Find all for a collection with control that this isn't empty.
 * @param req
 * @param res
 * @param documentName
 * @param collFirstLevel
 * @param errDocName is optional. FIXME with default
 * @param func
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
 * @param func
 * @param fieldsRequired
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
        this.field_require_404(req, res)
    }
}

module.exports.status_created = 201;

module.exports.status_completed = 200;

module.exports.default_page_id = 0;

module.exports.default_page_size = 10;