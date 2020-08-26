const mongoose = require('mongoose');

const Catalog = require("../models/catalogModel")(mongoose);
const Booking = require("../models/bookingModel")(mongoose);

const Rank = require("../models/nestedSchemas/rankUmbrellaModel")(mongoose);
const Service = require("../models/nestedSchemas/serviceModel")(mongoose);
const Sale = require("../models/nestedSchemas/saleModel")(mongoose);
const Umbrella = require("../models/nestedSchemas/umbrellaModel")(mongoose);

const commonController = require("./commonController");

const Catalog_id = "5f40f4125c935b69a7f0626f";
// Before this queries we have to check the permissions to interact with db


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

            if (commonController.typeOfNumber(req.body.price)
                && commonController.typeOfNumber(req.body.from_umbrella)
                && commonController.typeOfNumber(req.body.to_umbrella)
                && req.body.to_umbrella >= req.body.from_umbrella){

                if (checkIfUmbrellasHaveAlreadyRanks(catalog, req.body.from_umbrella, req.body.to_umbrella)) {

                    let rank = new Rank(req.body);
                    rank._id = mongoose.Types.ObjectId();
                    catalog.rank_umbrellas.splice(0, 0, rank);

                    commonController.correctSave(catalog, commonController.status_created, res);

                } else {
                    commonController.notify(res, commonController.status_error, "Umbrellas belongs to another rank");
                }

            } else {
                commonController.parameter_bad_formatted(res);
            }

        }, req.body.name, req.body.price, req.body.from_umbrella, req.body.to_umbrella);

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

            if (!(req.body.name) || (commonController.typeOfString(req.body.name))
                && (!(req.body.description) || commonController.typeOfString(req.body.description))
                && (!(req.body.price) || commonController.typeOfNumber(req.body.price))
                && (!(req.body.from_umbrella) || commonController.typeOfNumber(req.body.from_umbrella))
                && (!(req.body.to_umbrella) || commonController.typeOfNumber(req.body.to_umbrella))){

                // FIXME I have to save the changes
                let oldFromUmbrella = rankTarget.from_umbrella;
                let oldToUmbrella = rankTarget.to_umbrella;

                rankTarget.from_umbrella = -1;
                rankTarget.to_umbrella = -1;

                if (checkIfUmbrellasHaveAlreadyRanks(catalog, req.body.from_umbrella, req.body.to_umbrella)) {

                    rankTarget.from_umbrella = req.body.from_umbrella;
                    rankTarget.to_umbrella = req.body.to_umbrella

                    if (req.body.name)
                        rankTarget.name = req.body.name

                    if (req.body.description)
                        rankTarget.description = req.body.description

                    if (req.body.price)
                        rankTarget.price = req.body.price

                    if (req.body.sales)
                        rankTarget.sales = req.body.sales

                    commonController.correctSave(rankTarget, commonController.status_completed, res)

                } else {

                    rankTarget.from_umbrella = oldFromUmbrella;
                    rankTarget.to_umbrella = oldToUmbrella;
                    commonController.parameter_bad_formatted(res);
                }

            }

        });
    });
}


/**
 * Create a service. Need some required fields:
 *  . price of the service
 *  . umbrella_related indicates if is service is general or related to umbrella
 * @param req
 * @param res
 */
module.exports.create_service = function(req, res) {
    checkCatalog(req, res, "Service", (err, catalog)  => {

        commonController.areRequiredFieldsPresent(req, res, () =>{

            if (commonController.typeOfNumber(req.body.price)
                && (commonController.typeOfBoolean(req.body.umbrella_related))
                && (!(req.body.description) || (commonController.typeOfString(req.body.description)))){

                let service = new Service(req.body);
                service._id = mongoose.Types.ObjectId();

                catalog.services.splice(0, 0, service);

                commonController.correctSave(catalog, commonController.status_created, res);
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
        if (req.params.id) {

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

            if (!(req.body.price) || commonController.typeOfNumber(req.body.price)
                && (!(req.body.umbrella_related) || commonController.typeOfString(req.body.umbrella_related))
                && (!(req.body.description) || commonController.typeOfString(req.body.description))){

                if (req.body.price)
                    serviceTarget.price = req.body.price;

                if (req.body.description)
                    serviceTarget.description = req.body.description;

                if (req.body.umbrella_related)
                    serviceTarget.umbrella_related = req.body.umbrella_related;
            }


        });
    });
}

/**
 * Create a sale for a specific rank. Fields needed:
 *  . "percent" of sale
 *  . "date_from" the sale start
 *  . "date_to" the sale start
 * @param req The specific request.
 * @param res The specific response.
 */
module.exports.create_sale = function (req, res) {
    checkCatalog(req, res, "Sale", (err, catalog) => {

        commonController.getNestedDocument(catalog.rank_umbrellas, req, res, req.body.rank_id, (rank) => {

            commonController.areRequiredFieldsPresent(req, res, () => {

                if ((req.body.percent
                    || req.body.percent >= 0)
                    && new Date(req.body.date_to).getTime() >= new Date(req.body.date_from).getTime()) {

                    let sale = new Sale(req.body);
                    sale._id = mongoose.Types.ObjectId();

                    rank.sales.splice(0,0, sale);

                    commonController.correctSave(catalog, commonController.status_created, res);
                }

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
        if (req.params.id) {

            let saleResult = null;

            // check hasOwnProperty
            for (let rank in catalog.rank_umbrellas){
                if (catalog.rank_umbrellas.hasOwnProperty(rank)){
                    saleResult = commonController.returnNestedDocument(catalog.rank_umbrellas[rank].sales, req, res, req.params.id, err, "Sale");
                    if (saleResult !== null)
                        break;
                }

            }

            if (!saleResult)
                commonController.serve_plain_404(req, res, "Sale");

        } else {

            let allSale = [];

            for (let rank in catalog.rank_umbrellas) {
                if (catalog.rank_umbrellas.hasOwnProperty(rank)) {
                    for (let sale in catalog.rank_umbrellas[rank].sales) {
                        if (catalog.rank_umbrellas[rank].sales.hasOwnProperty(sale))
                            allSale.splice(0, 0, catalog.rank_umbrellas[rank].sales[sale]);
                    }
                }
            }


            let allSaleRequested = allSale.filter(x => x.date_to.getTime() > Date.now()).sort(function (a,b) {
                    return new Date(a.date_to) - new Date(b.date_to);
                }
            );

            commonController.returnPages(req.body.page_id, req.body.page_size, req, res, allSaleRequested, "Sales");

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
        if (req.params.id) {

            let saleFound = false;

            // check hasOwnProperty
            for (let rank in catalog.rank_umbrellas){
                if (catalog.rank_umbrellas.hasOwnProperty(rank)){
                    commonController.updateCollection(catalog, catalog.rank_umbrellas[rank].sales, req, res, req.params.id, (saleResult) => {

                        saleFound = true;

                        if (req.body.percent || req.body.percent >= 0)
                            saleResult.percent = req.body.percent

                        if (req.body.date_from
                            && new Date(req.body.date_from).getTime() >= Date.now())
                            saleResult.date_from = new Date(req.body.date_from)

                        if (req.body.date_to
                            && new Date(req.body.date_to).getTime() > new Date(req.body.date_from).getTime())
                            saleResult.date_to = new Date(req.body.date_to)
                    });

                    if (saleFound)
                        break;
                }
            }

            if (!saleFound)
                commonController.serve_plain_404(req, res, "Sale");
        }
    });
}


/**
 * Return:
 *  . services available.
 *  . ranks with the available umbrellas in that period. If not don't return that rank.
 * @param req
 * @param res
 */
module.exports.get_availability = function (req, res) {
    checkCatalog(req, res, "catalog", (errCat, catalog) => {
        // Get all bookings
        commonController.findAllFromCollection(req, res, "book", Booking, ""
            ,(errBook, allBookings) =>{

                // Umbrella not free in that periods
                // First filter: if book is not finished
                // Second filter: if bool started in that period
                let umbrellaNumberUsed = commonController.umbrellaUsed(req, res, req.body.from, req.body.to);
/*                let umbrellaNumberUsed = allBookings.filter(b => b.date_to.getTime() > new Date(req.body.from).getTime()
                                                    && b.date_from.getTime() < new Date(req.body.to).getTime()
                                                    && b.confirmed
                                                    && !b.cancelled)
                                                    .flatMap(b => b.umbrellas.map(u => u.number));*/

                // When this cicle is terminated in rankNumberFree we have all ranks with his umbrellas
                let rankNumberFree = [];
                for (let rank in catalog.rank_umbrellas) {

                    if (catalog.rank_umbrellas.hasOwnProperty(rank)) {

                        for (let i = catalog.rank_umbrellas[rank].from_umbrella;
                             i < catalog.rank_umbrellas[rank].to_umbrella;
                             i++){

                            if (!umbrellaNumberUsed.includes(i)){

                                let elementsToAdd = [];

                                let umbrella = new Umbrella();
                                umbrella.number = i;

                                if (!rankNumberFree[rank]) {
                                    rankNumberFree[rank] = {};
                                    rankNumberFree[rank]["id"] = catalog.rank_umbrellas[rank]._id;
                                    rankNumberFree[rank]["name"] = catalog.rank_umbrellas[rank].name;
                                    rankNumberFree[rank]["description"] = catalog.rank_umbrellas[rank].description;
                                    rankNumberFree[rank]["price"] = catalog.rank_umbrellas[rank].price;
                                    rankNumberFree[rank]["umbrellas"] = [];
                                } else {
                                    elementsToAdd = rankNumberFree[rank]["umbrellas"];
                                }

                                elementsToAdd.push(umbrella);

                                rankNumberFree[rank]["umbrellas"] = elementsToAdd;
                            }
                        }
                    }
                }

                let availability = {};

                availability["services"] = catalog.services;
                availability["ranks"] = rankNumberFree;

                commonController.response(res, availability);
            })
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

    commonController.findByIdFirstLevelCollection(req, res, documentName, Catalog, "Catalog",
        Catalog_id, func);
}

/**
 * Check if umbrellas belongs to some ranks already present.
 * @param catalog
 * @param from_umbrella
 * @param to_umbrella
 * @returns {boolean}
 */
function checkIfUmbrellasHaveAlreadyRanks(catalog, from_umbrella, to_umbrella) {
    let umbrellasAreFree = true;

    for (let rank in catalog.rank_umbrellas) {
        if (catalog.rank_umbrellas.hasOwnProperty(rank)){
            if ((from_umbrella <= catalog.rank_umbrellas[rank].to_umbrella)
                && (to_umbrella >= catalog.rank_umbrellas[rank].from_umbrella)){

                umbrellasAreFree = false;
            }
        }
    }

    return umbrellasAreFree;
}
