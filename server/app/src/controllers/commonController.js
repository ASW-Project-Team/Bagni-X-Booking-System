module.exports.serve_plain_404 = function(req, res, objName) {
    res.status(404).json(obj + ' not found');
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
module.exports.getDocuments = function (err, documents, req, res, documentName, documentsToReturn) {
    this.checkError(err, documents, req, res, documentName);
    this.response(res, documentsToReturn);
}

module.exports.status_created = 201;

module.exports.status_completed = 200;

module.exports.default_page_id = 0;

module.exports.default_page_size = 10;