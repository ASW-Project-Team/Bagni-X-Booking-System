module.exports.serve_plain_404 = function(req, res, obj) {
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

module.exports.response = function (res, documents) {
    res.status(this.status_completed).json(documents);
}

module.exports.getDocuments = function (err, documents, req, res, documentName) {
    checkError(err, documents, req, res, documentName);
    response(res, documents);
}

module.exports.status_created = 201;

module.exports.status_completed = 200;