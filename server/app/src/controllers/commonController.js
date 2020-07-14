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
 * @param classToUpdate The firstLevelCollection that have to update.
 * @param classToSearch The collection (also nested) that documents belongs
 * @param req The specific update request
 * @param res The specific update response
 * @param id The id to search
 * @param func The callback function that is executed only if id is found. In this callback are inserted
 *          all controls.
 */
module.exports.updateClass = function (classToUpdate, classToSearch, req, res, id, func) {

    this.getNestedDocument(classToSearch, req, res, id, (documentTarget) => {
        func(documentTarget);
        this.correct_save(classToUpdate, this.status_created, res);
    });
}

/**
 *
 * @param classToSearch
 * @param req
 * @param res
 * @param id
 * @param err
 * @param documentName
 */
module.exports.returnNestedDocument = function (classToSearch, req, res, id, err, documentName) {
    getNestedDocument(classToSearch, req, res, id, (documentTarget) =>  {
        this.getDocuments(err, classToSearch, req, res, documentName, documentTarget);
    });
}

/**
 * Find an element in a nested collection.
 * @param classToSearch
 * @param classToSearch The collection (also nested) that documents belongs
 * @param req The specific update request
 * @param res The specific update response
 * @param id The id to search
 * @param func The callback function that is executed only if id is found.
 */
module.exports.getNestedDocument = function(classToSearch, req, res, id, func) {

    if (id !== undefined) {
        let documentTarget = null;

        // Check if blocks infinite time
        let foundElement = false;

        for (let document of classToSearch) {
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


module.exports.status_created = 201;

module.exports.status_completed = 200;

module.exports.default_page_id = 0;

module.exports.default_page_size = 10;