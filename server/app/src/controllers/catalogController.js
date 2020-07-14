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

            returnNestedDocument(catalog.umbrellas, req, res, req.params.id, err, documentName);
            /*  getNestedDocument(catalog.umbrellas, req, res, req.params.id, (umbrellaResult) => {
                commonController.getDocuments(err, catalog.umbrellas, req, res, "umbrellaResult", umbrellaResult);
            });*/

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

        updateClass(catalog, catalog.umbrellas, req, res, req.params.id, (umbrellaTarget) => {
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

        areRequiredFieldsPresent(req, res, () =>{

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

        areRequiredFieldsPresent(req, res, () =>{

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

        updateClass(catalog, catalog.rank_umbrellas, req, res, req.params.id,(rankTarget) => {

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

        areRequiredFieldsPresent(req, res, () =>{

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

            returnNestedDocument(catalog.services, req, res, req.params.id, err, documentName);
        } else {
            // Return tot pages
            returnPages(req.body.page_id, req.body.page_size, req, res, catalog.services, "Services");
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

        updateClass(catalog, catalog.services, req, res, req.params.id,(serviceTarget) =>{
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

        getNestedDocument(catalog.rank_umbrellas, req, res, req.body.rank_id, (rank) => {

            areRequiredFieldsPresent(req, res, () =>{

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

            for (let rank in catalog.rank_umbrellas){
                saleResult = returnNestedDocument(catalog.rank_umbrellas[rank].sales, req, res, req.params.id, err, "Sale");
                if (saleResult !== null)
                    break;

            }

            if (saleResult === null)
                commonController.serve_plain_404(req, res, "Sale");

        } else {
            // TODO
            //commonController.getDocuments(err, catalog.sales, req, res, "Sale", "target");
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

            for (let rank in catalog.rank_umbrellas){

                updateClass(catalog, catalog.rank_umbrellas[rank].sales, req, res, req.params.id, (saleResult) => {

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
    Catalog.findById(mongoose.Types.ObjectId(CatalogId), (err, catalog, documentName) => {
        commonController.checkError(err, catalog, req, res, "Catalog");
        func(err, catalog, documentName);
    });
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
function updateClass(classToUpdate, classToSearch, req, res, id, func) {

    getNestedDocument(classToSearch, req, res, id, (documentTarget) => {
        func(documentTarget);
        commonController.correct_save(classToUpdate, commonController.status_created, res);
    });
}

function returnNestedDocument(classToSearch, req, res, id, err, documentName) {
    getNestedDocument(classToSearch, req, res, id, (documentTarget) =>  {
        commonController.getDocuments(err, classToSearch, req, res, documentName, documentTarget);
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
function getNestedDocument(classToSearch, req, res, id, func) {

    if (id !== undefined) {
        let documentTarget = null;

        // Check if blocks infinite time
        let foundElement = false;

        for (let document of classToSearch) {
            documentTarget = commonController.dfs(document, id);
            if (documentTarget) {
                foundElement = true;
                break;
            }
        }

        if (foundElement)
            func(documentTarget);
        else // So we can manipulate also more than two nested level collection. See sale read or put.
            return  commonController.serve_plain_404(req, res, "Elem");
    } else
        commonController.serve_plain_404(req, res, "Id in url");

}

/**
 * Return the specified elements.
 * @param id Where first element start.
 * @param size Number of maximum elements.
 * @param req The specific request.
 * @param res The specific response.
 * @param classToSearch The class where elements are taken.
 * @param className The class name.
 */
function returnPages(id, size, req, res, classToSearch, className) {


    let pageId = commonController.default_page_id;
    if ((id !== undefined) && (id !== null) && (id >= 0)) {
        pageId = id;
    }

    let pageSize = commonController.default_page_size;
    if ((size !== undefined) && (size !== null) && (size >= 1)) {
        pageSize = size;
    }

    let pages = classToSearch;
    // Return error if there aren't any service present with that id

    if (pageId >= pages.length) {
        commonController.serve_plain_404(req, res, className);
    }
    // Get the resultant pages
    if (pageId + pageSize >= pages.length ) {
        pageSize = pages.length - pageId;
    }

    commonController.response(res, pages.slice(pageId, pageSize));
}

/**
 *
 * @param req
 * @param res
 * @param func
 * @param fieldsRequired
 */
function areRequiredFieldsPresent(req, res, func, ...fieldsRequired) {

    let toSave = true;
    for (let field in fieldsRequired){
        if (fieldsRequired[field] === undefined) {
            toSave = false;
        }
    }
    if (toSave) {
        func();
    } else {
        commonController.field_require_404(req, res)
    }
}