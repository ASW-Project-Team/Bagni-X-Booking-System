const mongoose = require('mongoose');

module.exports.serve_plain_404 = function(req, res, objName) {
    res.status(404).json(objName + ' not found');
};

module.exports.field_require_404 = function(req, res) {
    res.status(404).json("All fields are required, someone  not found!");
};



    // We can return the specific modified object
module.exports.correct_save = function (document, status, res) {
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

module.exports.checkError = function (err, documents, req, res, documentName) {
    if (err)
        res.send(err);
    else {
        if (documents == null) {
            this.serve_plain_404(req, res, documentName);
        }
    }
}

// I return all document as catalog and not the specific as the new umbrella added
module.exports.response = function (res, documents) {
    // if (documents != null)
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
        this.correct_save(collectionToUpdate, this.status_created, res);
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

    if (id !== undefined) {
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

module.exports.checkFirstLevelClass = function (req, res, documentName, collFirstLevel, errDocName, id, func) {
    collFirstLevel.findById(mongoose.Types.ObjectId(id), (err, catalog, documentName) => {
        this.checkError(err, catalog, req, res, errDocName);
        func(err, catalog, documentName);
    });
}

/**
 * Return the specified elements.
 * @param id Where first element start.
 * @param size Number of maximum elements.
 * @param req The specific request.
 * @param res The specific response.
 * @param collectionToSearch The class where elements are taken.
 * @param collectionName The class name.
 */
module.exports.returnPages = function (id, size, req, res, collectionToSearch, collectionName) {

    let pageId = this.default_page_id;
    if ((id !== undefined) && (id !== null) && (id >= 0)) {
        pageId = id;
    }

    let pageSize = this.default_page_size;
    if ((size !== undefined) && (size !== null) && (size >= 1)) {
        pageSize = size;
    }

    let pages = collectionToSearch;
    // Return error if there aren't any service present with that id

    if (pageId >= pages.length) {
        this.serve_plain_404(req, res, collectionName);
    }
    // Get the resultant pages
    if (pageId + pageSize >= pages.length ) {
        pageSize = pages.length - pageId;
    }

    this.response(res, pages.slice(pageId, pageSize));
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