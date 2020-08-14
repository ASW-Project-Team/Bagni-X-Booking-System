const mongoose = require('mongoose');
const Catalog = require("../models/catalogModel")(mongoose);
const Umbrella = require("../models/nestedSchemas/umbrellaModel")(mongoose);
const Rank = require("../models/nestedSchemas/rankUmbrellaModel")(mongoose);
const Service = require("../models/nestedSchemas/serviceModel")(mongoose);
const Sale = require("../models/nestedSchemas/saleModel")(mongoose);
const commonController = require("./commonController");

const CatalogId = mongoose.Types.ObjectId("5f081889b5653238cfc16a3d");
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
    checkCatalog(req, res, "Umbrella", (err, catalog, documentName) => {


        // If par is present find the specified param ...
        if (req.params.id !== undefined) {

            commonController.returnNestedDocument(catalog.umbrellas, req, res, req.params.id, err, documentName);

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
    checkCatalog(req, res, "Umbrella", (err, catalog) => {

        commonController.updateCollection(catalog, catalog.umbrellas, req, res, req.params.id, (umbrellaTarget) => {
            // Change the umbrella information, position and/or rank
            if (umbrellaTarget) {
                if (req.body.x_position !== undefined )
                    umbrellaTarget.x_position = req.body.x_position;

                if (req.body.y_position !== undefined )
                    umbrellaTarget.y_position = req.body.y_position;

                if (req.body.rank_id !== undefined )
                    umbrellaTarget.rank_id = mongoose.Types.ObjectId(req.body.rank_id);
            }
        });

    });
};

/**
 * Create a new umbrella, position and rank are required.
 * @param req The create umbrella request.
 * @param res The create umbrella response.
 */
module.exports.create_umbrella = function (req, res) {
    checkCatalog(req, res, "Umbrella", (err, catalog) => {

        commonController.areRequiredFieldsPresent(req, res, () =>{

            // FIXME Here are more checks
            let umbrella = new Umbrella(req.body);
            umbrella._id = mongoose.Types.ObjectId();
            // add as first element
            catalog.umbrellas.splice(0, 0, umbrella);

            commonController.correct_save(catalog, commonController.status_created, res);
        }, req.body.x_position, req.body.y_position, req.body.rank_id);
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
    // To check
    checkCatalog(req, res, "Ranks", (err, catalog, documentName) => {
        commonController.getDocuments(err, catalog.rank_umbrellas, req, res, documentName, catalog.rank_umbrellas);
    });

}


/**
 * Create a new rank. Name and price are required. Sales and description are optional.
 * @param req The create umbrella request.
 * @param res The create umbrella response.
 */
module.exports.create_rank = function (req, res) {
    checkCatalog(req, res, "Rank", (err, catalog)  => {

        commonController.areRequiredFieldsPresent(req, res, () =>{

            let rank = new Rank(req.body);
            rank._id = mongoose.Types.ObjectId();
            catalog.rank_umbrellas.splice(0, 0, rank);
            // catalog.rank_umbrellas.push(rank); CHECK splice

            commonController.correct_save(catalog, commonController.status_created, res);
        }, req.body.name, req.body.price);

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
    checkCatalog(req, res, "Rank", (err, catalog)  => {

        commonController.updateCollection(catalog, catalog.rank_umbrellas, req, res, req.params.id,(rankTarget) => {

            if (req.body.name !== undefined)
                rankTarget.name = req.body.name

            if (req.body.description !== undefined)
                rankTarget.description = req.body.description

            if (req.body.price !== undefined)
                rankTarget.price = req.body.price

        });
    });
}


module.exports.create_service = function(req, res) {
    checkCatalog(req, res, "Service", (err, catalog)  => {

        commonController.areRequiredFieldsPresent(req, res, () =>{

            if (req.body.price >= 0){

                let service = new Service(req.body);
                service._id = mongoose.Types.ObjectId();

                catalog.services.splice(0, 0, service);

                commonController.correct_save(catalog, commonController.status_created, res);
            }
        }, req.body.umbrella_related, req.body.price);


    });
}

/**
 * The query GET return two possible scenario:
 *  . if "id" is present in the params, the query have to find the specified service
 *  . if "id" is not present, the query have to return some services based on body params "page_id" and "page_size"
 *      Query Param "page_id": indicate position ...
 *          If not specified we assume id is 1 (the oldest page)
 *      Query Param "page_size": the number of page that have to be shown
 *          If not specified we assume 10 pages
 * @param req
 * @param res
 */
module.exports.read_services = function (req, res) {

    checkCatalog(req, res, "Service", (err, catalog, documentName) => {
        // If par is present find the specified param ...
        if (req.params.id !== undefined) {

            commonController.returnNestedDocument(catalog.services, req, res, req.params.id, err, documentName);
        } else {
            // Return tot pages
            commonController.returnPages(req.body.page_id, req.body.page_size, req, res, catalog.services, "Services");
        }
    });
}

/**
 * The query PUT return two possible scenario:
 *  . if "id" is present in the params, the query have to find the specified service and modify it
 *      as requested with the query params
 *  . otherwise return error
 * @param req The update service request
 * @param res The update service response
 */
module.exports.update_service = function (req, res) {
    checkCatalog(req, res, "Service", (err, catalog)  => {

        commonController.updateCollection(catalog, catalog.services, req, res, req.params.id,(serviceTarget) =>{
            if (req.body.price !== undefined)
                serviceTarget.price = req.body.price;

            if (req.body.description !== undefined)
                serviceTarget.description = req.body.description;

            if (req.body.umbrella_related !== undefined)
                serviceTarget.umbrella_related = req.body.umbrella_related;
        });
    });
}

/**
 * Create a sale for a specific rank.
 * @param req The specific request.
 * @param res The specific response.
 */
module.exports.create_sale = function (req, res) {
    checkCatalog(req, res, "Sale", (err, catalog) => {

        commonController.getNestedDocument(catalog.rank_umbrellas, req, res, req.body.rank_id, (rank) => {

            commonController.areRequiredFieldsPresent(req, res, () =>{

                let sale = new Sale(req.body);
                sale._id = mongoose.Types.ObjectId();

                rank.sales.splice(0,0, sale);

                commonController.correct_save(catalog, commonController.status_created, res);

            }, req.body.percent, req.body.date_from, req.body.date_to);

        });

    });
}


/**
 * Two possible scenario:
 *  . if param "id" is present: Read a single sale if "id" exist, error otherwise.
 *  . Read from "page_id" to "page_id" + "page_size" sales.
 * @param req The read sale request.
 * @param res The read sale response.
 */
module.exports.read_sales = function (req, res) {
    checkCatalog(req, res, "Sale", (err, catalog)  => {

        // If par is present find the specified param ...
        if (req.params.id !== undefined) {

            let saleResult = null;

            // check hasOwnProperty
            for (let rank in catalog.rank_umbrellas){
                saleResult = commonController.returnNestedDocument(catalog.rank_umbrellas[rank].sales, req, res, req.params.id, err, "Sale");
                if (saleResult !== null)
                    break;

            }

            if (saleResult === null)
                commonController.serve_plain_404(req, res, "Sale");

        }  else if ((req.body.page_id !== undefined) && (req.body.page_size !== undefined)){

            let allSale = [];


            // FIXME filtra tutti i sales
            for (let rank in catalog.rank_umbrellas) {
                for (let sale in catalog.rank_umbrellas[rank].sales){
                    allSale.splice(0, 0, catalog.rank_umbrellas[rank].sales[sale]);
                }
            }

            console.log(Date.now());
            for (let i = 0; i < allSale.length; i++) {
                console.log(allSale[i].date_to);
            }

            let allSaleRequested = allSale.filter(x => x.date_to > Date.now()).sort(function (a,b) {
                    return new Date(a.date_to) - new Date(b.date_to);
                }
            );

            // Return tot pages
            commonController.returnPages(req.body.page_id, req.body.page_size, req, res, allSaleRequested, "Sales");

        } else {
            commonController.serve_plain_404(req, res, "Sale")
        }

    });
}

/**
 * Update a specific sale if present. If not present return error.
 * @param req The specific request.
 * @param res The specific response.
 */
module.exports.update_sale = function (req, res) {
    checkCatalog(req, res, "Sale", (err, catalog)  => {

        // If par is present find the specified param ...
        if (req.params.id !== undefined) {

            let saleFound = false;

            // check hasOwnProperty
            for (let rank in catalog.rank_umbrellas){

                commonController.updateCollection(catalog, catalog.rank_umbrellas[rank].sales, req, res, req.params.id, (saleResult) => {

                    saleFound = true;

                    if (req.body.percent !== undefined)
                        saleResult.percent = req.body.percent

                    if (req.body.date_from !== undefined)
                        saleResult.date_from = req.body.date_from

                    if (req.body.date_to !== undefined)
                        saleResult.date_to = req.body.date_to
                });

                if (saleFound)
                    break;

            }

            if (!saleFound)
                commonController.serve_plain_404(req, res, "Sale");
        }
    });
}



/**
 * A function that automatize control of id.
 * @param req The specific request
 * @param res The specific response
 * @param documentName The document that have to be founded.
 * @param func The callback executed only if document exist and is found.
 */
function checkCatalog(req, res, documentName, func) {

    commonController.checkFirstLevelClass(req, res, documentName, Catalog, "Catalog",
        mongoose.Types.ObjectId(CatalogId), func);
}


