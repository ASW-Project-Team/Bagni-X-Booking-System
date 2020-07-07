const mongoose = require('mongoose');
const Catalog = require("../models/catalogModel")(mongoose);
const Umbrella = require("../models/nestedSchemas/umbrellaModel")(mongoose);
const Rank = require("../models/nestedSchemas/rankUmbrellaModel")(mongoose);
const commonController = require("./commonController");

const CatalogId = mongoose.Types.ObjectId("5f045a72e60fd3b3c85c4145");
// Before this queries we have to check the permissions to interact with db


/**
 * The query responds have two main scenario:
 *  . if "id" is present in the params the query have to find the umbrella
 *      If it doesn't exist responds with error.
 *  . if "id" isn't present the query have to return the umbrella list
 *      If the list haven't any umbrella it returns an empty array.
 * @param req Request
 * @param res Response
 */
module.exports.read_umbrellas = function (req, res) {
    Catalog.findById(mongoose.Types.ObjectId(CatalogId), (err, catalog) => {
        commonController.checkError(err, catalog, req, res, "Catalog");

        // If par is present find the specified param ...
        if (req.params.id !== undefined) {

            let umbrellaResult = null;
            for (let umbrella of catalog.umbrellas) {
                umbrellaResult = commonController.dfs(umbrella, req.params.id);
                if (umbrellaResult) {
                    commonController.getDocuments(err, umbrella, req, res, "Umbrella");
                    break;
                }
            }
        } else {
            commonController.response(res, catalog.umbrellas);
        }
    });
};

/**
 * The query responds have two main scenario:
 *  . if "id" is present in the params the query have to find the umbrella
 *      If it doesn't exist responds with error.
 *  . if "id" isn't present the query have to return the umbrella list
 *      If the list haven't any umbrella it returns an empty array.
 * @param req Request
 * @param res Response
 */
module.exports.read_umbrellas = function (req, res) {
    Catalog.findById(mongoose.Types.ObjectId(CatalogId), (err, catalog) => {
        commonController.checkError(err, catalog, req, res, "Catalog");

        // If par is present find the specified param ...
        if (req.params.id !== undefined) {

            let umbrellaResult = null;
            for (let umbrella of catalog.umbrellas) {
                umbrellaResult = commonController.dfs(umbrella, req.params.id);
                if (umbrellaResult) {
                    if (req.body.x_position !== undefined )
                        umbrella.x_position = req.body.x_position;

                    if (req.body.y_position !== undefined )
                        umbrella.y_position = req.body.y_position;

                    if (req.body.rank_id !== undefined )
                        umbrella.rank_id = mongoose.Types.ObjectId(req.body.rank_id);

                    commonController.correct_save(catalog, commonController.status_completed, res);
                    break;
                }
            }
        }
    });
};

/**
 *
 * @param req
 * @param res
 */
module.exports.create_umbrella = function (req, res) {
    Catalog.findById(mongoose.Types.ObjectId(CatalogId), (err, catalog) => {
        commonController.checkError(err, catalog, req, res, "Catalog");

        let umbrella = new Umbrella();

        umbrella._id = mongoose.Types.ObjectId();
        umbrella.x_position = req.body.x_position;
        umbrella.y_position = req.body.y_position;
        umbrella.rank_id = mongoose.Types.ObjectId(req.body.rank_id);

        catalog.umbrellas.push(umbrella);


        commonController.correct_save(catalog, commonController.status_created, res);

    });
}

/**
 * Return all ranks if present. If there aren't any ranks return null.
 * If there is an error with Catalog return the error.
 * If catalog is null return 404.
 * @param req The request.
 * @param res The response.
 */
module.exports.read_ranks = function (req, res) {
    Catalog.findById(mongoose.Types.ObjectId(CatalogId), (err, catalog) => {
        commonController.checkError(err, catalog, req, res,"Rank");
        commonController.getDocuments(err, catalog.rank_umbrellas, req, res);
    });
}

module.exports.create_rank = function (req, res) {
    Catalog.findById(mongoose.Types.ObjectId(CatalogId), (err, catalog) => {
        commonController.checkError(err, catalog, req, res, "Catalog");

        let rank = new Rank(req.body);
        rank._id = mongoose.Types.ObjectId();
        catalog.rank_umbrellas.push(rank);

        commonController.correct_save(catalog, commonController.status_created, res);
    });
}

/**
 * Modify the rank if present. If there isn't that rank return error.
 * If there is an error with Catalog return the error.
 * If catalog is null return 404.
 * @param req The request.
 * @param res The response.
 */
module.exports.update_rank = function (req, res) {
    Catalog.findById(mongoose.Types.ObjectId(CatalogId), (err, catalog) => {
        commonController.checkError(err, catalog, req, res);
        let rankResult = null;

        for (let rank of catalog.rank_umbrellas) {
            rankResult = commonController.dfs(rank, req.params.id)
            if (rankResult) {
                if (req.body.name !== undefined)
                    rankResult.name = req.body.name

                if (req.body.description !== undefined)
                    rankResult.description = req.body.description

                if (req.body.price !== undefined)
                    rankResult.price = req.body.price

                commonController.correct_save(catalog, commonController.status_completed, res);
                break;
            }
        }

        if (!rankResult)
            commonController.serve_plain_404(req, res);
    });
}



// Read a single sale
module.exports.read_sale = function (req, res) {
    Catalog.findById(mongoose.Types.ObjectId(CatalogId), (err, catalog) => {
        if (err)
            res.send(err);
        else {
            if (catalog == null) {
                commonController.serve_plain_404(req, res);
            } else {
                Catalog.sales.findById(mongoose.Types.ObjectId(req.params.id), (errRank, sale) => {
                    commonController.getDocuments(errRank, sale, req, res);
                });
            }
        }
    });
}


/**
 * TODO Want to create a callback that automatize catalog checks
 * @param req
 * @param res
 * @param func
 */
function checkCatalog(req, res, func) {
    Catalog.findById(mongoose.Types.ObjectId(CatalogId), (err, catalog) => {
        if (err)
            res.send(err);
        else {
            if (catalog == null) {
                commonController.serve_plain_404(req, res);
            } else {
                func();
            }
        }
    });
}