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
                    commonController.getDocuments(err, umbrellaResult, req, res, "Umbrella");
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
 *  . if "id" is present in the params the query have to find the umbrella and modify it with the body params.
 *  . otherwise the query doesn't modify the umbrella.
 * @param req Request
 * @param res Response
 */
module.exports.update_umbrellas = function (req, res) {
    Catalog.findById(mongoose.Types.ObjectId(CatalogId), (err, catalog) => {
        commonController.checkError(err, catalog, req, res, "Catalog");

        // If par is present find the specified param ...
        if (req.params.id !== undefined) {

            let umbrellaResult = null;
            for (let umbrella of catalog.umbrellas) {
                umbrellaResult = commonController.dfs(umbrella, req.params.id);

                // Change the umbrella information, position and/or rank
                if (umbrellaResult) {
                    if (req.body.x_position !== undefined )
                        umbrellaResult.x_position = req.body.x_position;

                    if (req.body.y_position !== undefined )
                        umbrellaResult.y_position = req.body.y_position;

                    if (req.body.rank_id !== undefined )
                        umbrellaResult.rank_id = mongoose.Types.ObjectId(req.body.rank_id);

                    commonController.correct_save(catalog, commonController.status_completed, res);
                    break;
                }
            }
        }
    });
};

/**
 * Create a new umbrella, position and rank are required.
 * @param req The create umbrella request.
 * @param res The create umbrella response.
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
 * Return all ranks if present. If there aren't any ranks return "Rank not found".
 * If there is an error with Catalog return the error.
 * If catalog is null return 404.
 * @param req The request.
 * @param res The response.
 */
module.exports.read_ranks = function (req, res) {
    Catalog.findById(mongoose.Types.ObjectId(CatalogId), (err, catalog) => {
        commonController.checkError(err, catalog, req, res,"Catalog");
        commonController.getDocuments(err, catalog.rank_umbrellas, req, res, "Ranks");
    });
}


/**
 * Create a new rank. Name and price are required. Sales and description are optional.
 * @param req The create umbrella request.
 * @param res The create umbrella response.
 */
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
        commonController.checkError(err, catalog, req, res, "Catalog");
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


/**
 * Read a single sale if exist, error otherwise.
 * @param req The read sale request.
 * @param res The read sale response.
 */
module.exports.read_sale = function (req, res) {
    Catalog.findById(mongoose.Types.ObjectId(CatalogId), (err, catalog) => {
        commonController.checkError(err, catalog, req, res, "Catalog");

        // If par is present find the specified param ...
        if (req.params.id !== undefined) {

            // find in rank umbrellas
        }
        commonController.getDocuments(err, catalog.sales, req, res, "Sale");
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