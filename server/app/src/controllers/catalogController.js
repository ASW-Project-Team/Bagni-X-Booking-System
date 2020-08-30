const mongoose = require('mongoose');

const Catalog = require("../models/catalogModel")(mongoose);

const Rank = require("../models/nestedSchemas/rankUmbrellaModel")(mongoose);
const Service = require("../models/nestedSchemas/serviceModel")(mongoose);
const Sale = require("../models/nestedSchemas/saleModel")(mongoose);
const Umbrella = require("../models/nestedSchemas/umbrellaModel")(mongoose);

const commonController = require("./commonController");

const CatalogId = "5f40f4125c935b69a7f0626f";
// Before this queries we have to check the permissions to interact with db


/**
 * Return all ranks if present. If there aren't any ranks return "Rank not found".
 * If there is an error with Catalog return the error.
 * If catalog is null return 404.
 * @param req The request.
 * @param res The response.
 */
module.exports.readRanks = function (req, res) {

    checkCatalog(req,res,"Catalog", (err, catalog)=>{

        if (req.params.id)
            commonController.getNestedDocument(catalog.rankUmbrellas, req, res, req.params.id,
                (rank) => commonController.response(res, rank))
        else
            commonController.getDocuments(err, catalog.rankUmbrellas, req, res, "Ranks", catalog.rankUmbrellas);

    })
}


/**
 * Create a new rank. Name and price are required. Sales and description are optional.
 * @param req The create umbrella request.
 * @param res The create umbrella response.
 */
module.exports.createRank = function (req, res) {
    checkCatalog(req, res, "Rank", (err, catalog)  => {

        commonController.areRequiredFieldsPresent(req, res, () =>{

            if (commonController.typeOfNumber(req.body.price)
                && commonController.typeOfNumber(req.body.fromUmbrella)
                && commonController.typeOfNumber(req.body.toUmbrella)
                && req.body.toUmbrella >= req.body.fromUmbrella){

                if (checkIfUmbrellasHaveAlreadyRanks(catalog, req.body.fromUmbrella, req.body.toUmbrella)) {

                    let rank = new Rank(req.body);
                    rank._id = mongoose.Types.ObjectId();
                    catalog.rankUmbrellas.splice(0, 0, rank);

                    commonController.correctSave(catalog, commonController.statusCreated, res);

                } else {
                    commonController.notify(res, commonController.statusError, "Umbrellas belongs to another rank");
                }

            } else {
                commonController.parameterBadFormatted(res);
            }

        }, req.body.name, req.body.price, req.body.fromUmbrella, req.body.toUmbrella);

    });
}

/**
 * Modify the rank if present. If there isn't that rank return error.
 * If there is an error with Catalog return the error.
 * If catalog is null return 404.
 * @param req The request.
 * @param res The response.
 */
module.exports.updateRank = function (req, res) {
    checkCatalog(req, res, "Rank", (err, catalog)  => {

        commonController.updateCollection(catalog, catalog.rankUmbrellas, req, res, req.params.id,async (rankTarget) => {


            if ((!(req.body.name) || commonController.typeOfString(req.body.name))
                && (!(req.body.description) || commonController.typeOfString(req.body.description))
                && (!(req.body.price) || commonController.typeOfNumber(req.body.price))
                && (!(req.body.fromUmbrella) || commonController.typeOfNumber(req.body.fromUmbrella))
                && (!(req.body.toUmbrella) || commonController.typeOfNumber(req.body.toUmbrella))
                && (!(req.body.sales)) || checkSale(req.body.sales)){

                let fromUmbrella = rankTarget.fromUmbrella
                if (req.body.fromUmbrella)
                    fromUmbrella = req.body.fromUmbrella

                let toUmbrella = rankTarget.toUmbrella
                if (req.body.toUmbrella)
                    toUmbrella = req.body.toUmbrella


                if (toUmbrella >= fromUmbrella
                    && !checkIfUmbrellasHaveAlreadyRanks(catalog, fromUmbrella, toUmbrella)) {

                    updateAppliedForRanks(req, res, rankTarget, catalog);

                } else {

                    commonController.parameterBadFormatted(res);
                }
            } else {

                commonController.parameterBadFormatted(res);
            }
        });
    });
}

function checkSale(sales){

    let saleCheck = true;

    for (const saleResult of sales){

        let dateFrom = new Date(saleResult.dateFrom);
        let dateTo = new Date(saleResult.dateTo);

        if (!(commonController.typeOfNumber(saleResult.percent)
            && (dateTo)
            && (dateFrom)
            && (dateTo.getTime() >= dateFrom.getTime())
            && (dateFrom.getTime() >= Date.now()))) {

            // Return for maximize performance
            saleCheck = false;
        }
    }


    return saleCheck;
}

function updateAppliedForRanks(req, res, rankTarget, catalog){

    if (req.body.name)
        rankTarget.name = req.body.name

    if (req.body.fromUmbrella)
        rankTarget.fromUmbrella = req.body.fromUmbrella

    if (req.body.toUmbrella)
        rankTarget.toUmbrella = req.body.toUmbrella

    if (req.body.description)
        rankTarget.description = req.body.description

    if (req.body.price)
        rankTarget.price = req.body.price

    if (req.body.sales) {

        let salesToAdd = [];

        for (const sale of req.body.sales) {

            let saleToAdd = {}

            saleToAdd["_id"] = mongoose.Types.ObjectId()
            saleToAdd["percent"] = sale.percent
            saleToAdd["dateFrom"] = new Date(sale.dateFrom)
            saleToAdd["dateTo"] = new Date(sale.dateTo)

            salesToAdd.splice(0,0, saleToAdd)
        }

        rankTarget.sales = salesToAdd
    }

    commonController.correctSave(catalog, commonController.statusCompleted, res, rankTarget)
}

/**
 * Create a service. Need some required fields:
 *  . price of the service
 *  . umbrellaRelated indicates if is service is general or related to umbrella
 * @param req
 * @param res
 */
module.exports.createService = function(req, res) {
    checkCatalog(req, res, "Service", (err, catalog)  => {

        commonController.areRequiredFieldsPresent(req, res, () =>{

            if (commonController.typeOfNumber(req.body.price)
                && (commonController.typeOfBoolean(req.body.umbrellaRelated))
                && (!(req.body.description) || (commonController.typeOfString(req.body.description)))){

                let service = new Service(req.body);
                service._id = mongoose.Types.ObjectId();

                catalog.services.splice(0, 0, service);

                commonController.correctSave(catalog, commonController.statusCreated, res, service);
            } else
                commonController.parameterBadFormatted(res)

        }, req.body.umbrellaRelated, req.body.price);

    });
}

/**
 * The query GET return two possible scenario:
 *  . if "id" is present in the params, the query have to find the specified service
 *  . if "id" is not present, the query have to return some services based on body params "pageId" and "pageSize"
 *      Query Param "pageId": indicate position ...
 *          If not specified we assume id is 1 (the oldest page)
 *      Query Param "pageSize": the number of page that have to be shown
 *          If not specified we assume 10 pages
 * @param req
 * @param res
 */
module.exports.readServices = function (req, res) {

    checkCatalog(req, res, "Service", (err, catalog, documentName) => {
        // If par is present find the specified param ...
        if (req.params.id) {

            commonController.returnNestedDocument(catalog.services, req, res, req.params.id, err, documentName);
        } else {
            // Return tot pages
            commonController.returnPages(req.body.pageId, req.body.pageSize, req, res, catalog.services, "Services");
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
module.exports.updateService = function (req, res) {
    checkCatalog(req, res, "Service", (err, catalog)  => {

        commonController.updateCollection(catalog, catalog.services, req, res, req.params.id,(serviceTarget) =>{

            if (!(req.body.price) || commonController.typeOfNumber(req.body.price)
                && (!(req.body.umbrellaRelated) || commonController.typeOfString(req.body.umbrellaRelated))
                && (!(req.body.description) || commonController.typeOfString(req.body.description))){

                if (req.body.price)
                    serviceTarget.price = req.body.price;

                if (req.body.description)
                    serviceTarget.description = req.body.description;

                if (req.body.umbrellaRelated)
                    serviceTarget.umbrellaRelated = req.body.umbrellaRelated;

                commonController.correctSave(catalog, commonController.statusCompleted, res, serviceTarget);
            }


        });
    });
}

/**
 * Create a sale for a specific rank. Fields needed:
 *  . "percent" of sale
 *  . "dateFrom" the sale start
 *  . "dateTo" the sale start
 * @param req The specific request.
 * @param res The specific response.
 */
module.exports.createSale = function (req, res) {
    checkCatalog(req, res, "Sale", (err, catalog) => {

        commonController.getNestedDocument(catalog.rankUmbrellas, req, res, req.body.rankId, (rank) => {

            commonController.areRequiredFieldsPresent(req, res, () => {

                if (commonController.typeOfNumber(req.body.percent)
                    && new Date(req.body.dateTo).getTime() >= new Date(req.body.dateFrom).getTime()) {

                    let sale = new Sale(req.body);
                    sale._id = mongoose.Types.ObjectId();

                    rank.sales.splice(0,0, sale);

                    commonController.correctSave(catalog, commonController.statusCreated, res, sale);
                } else
                    commonController.parameterBadFormatted(res)

            }, req.body.percent, req.body.dateFrom, req.body.dateTo);

        });

    });
}


/**
 * Two possible scenario:
 *  . if param "id" is present: Read a single sale if "id" exist, error otherwise.
 *  . Read from "pageId" to "pageId" + "pageSize" sales.
 * @param req The read sale request.
 * @param res The read sale response.
 */
module.exports.readSales = function (req, res) {
    checkCatalog(req, res, "Sale", (err, catalog)  => {

        // If par is present find the specified param ...
        if (req.params.id) {

            let saleResult = null;

            // check hasOwnProperty
            for (const rank of catalog.rankUmbrellas){
                saleResult = commonController.returnNestedDocument(rank.sales,
                    req, res, req.params.id, err, "Sale")
                if (saleResult !== null)
                    break;
            }

            if (!saleResult)
                commonController.servePlain404(req, res, "Sale");

        } else {

            let allSale = [];

            for (const rank of catalog.rankUmbrellas) {
                for (const sale of rank.sales) {
                    allSale.splice(0, 0, sale);
                }
            }


            let allSaleRequested = allSale.filter(x => x.dateTo.getTime() >= Date.now())
                .sort(function (a,b) {
                    return new Date(a.dateTo) - new Date(b.dateTo);
                }
            );

            commonController.returnPages(req.body.pageId, req.body.pageSize, req, res, allSaleRequested, "Sales");

        }

    });
}

// TODO Test if sale found function
/**
 * Update a specific sale if present. If not present return error.
 * @param req The specific request.
 * @param res The specific response.
 */
module.exports.updateSale = function (req, res) {
    checkCatalog(req, res, "Sale", async (err, catalog)  => {

        // If par is present find the specified param ...
        if (req.params.id) {

            let saleFound = false;

            for (const rank of catalog.rankUmbrellas){
                await commonController.updateCollection(catalog, rank.sales, req, res,
                    req.params.id,  (saleResult) => {

                    saleFound = true;

                    let dateFrom = saleResult.dateFrom;
                    let dateTo = saleResult.dateTo;

                    if (req.body.dateFrom)
                        dateFrom = new Date(req.body.dateFrom)

                    if (req.body.dateTo)
                        dateTo = new Date(req.body.dateTo)

                    if ((!(req.body.percent) || commonController.typeOfNumber(req.body.percent))
                        && (dateTo.getTime() >= dateFrom.getTime())
                        && (dateFrom.getTime() >= Date.now())){

                        if (req.body.percent)
                            saleResult.percent = req.body.percent

                        if (req.body.dateFrom)
                            saleResult.dateFrom = new Date(req.body.dateFrom)

                        if (req.body.dateTo)
                            saleResult.dateTo = new Date(req.body.dateTo)

                       commonController.correctSave(catalog, commonController.statusCompleted, res, saleResult)

                    }

                },false);

                if (saleFound)
                    break;

            }

            if (!saleFound)
                commonController.servePlain404(req, res, "Sale");
        } else {
            commonController.notify(res, commonController.badRequest, "Id not present")
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
module.exports.getAvailability = function (req, res) {

    checkCatalog(req, res, "catalog", async (errCat, catalog) => {

        // Umbrella not free in that periods
        // First filter: if book is not finished
        // Second filter: if bool started in that period
        await commonController.umbrellaUsed(req, res, req.body.dateFrom, req.body.dateTo, (umbrellaNumberUsed)=>{

            let rankNumberFree = [];
            let rankNumber = -1

            for (const rank of catalog.rankUmbrellas) {

                rankNumber++
                if (rank) {

                    for (let umbrellaNumber = rank.fromUmbrella; umbrellaNumber <= rank.toUmbrella; umbrellaNumber++){

                        if (!umbrellaNumberUsed.includes(umbrellaNumber)){

                            let elementsToAdd = [];

                            let umbrella = new Umbrella();
                            umbrella.number = umbrellaNumber;

                            if (!rankNumberFree[rankNumber]) {
                                rankNumberFree[rankNumber] = {};
                                rankNumberFree[rankNumber]["id"] = rank._id;
                                rankNumberFree[rankNumber]["name"] = rank.name;
                                rankNumberFree[rankNumber]["description"] = rank.description;
                                rankNumberFree[rankNumber]["price"] = rank.price;
                                rankNumberFree[rankNumber]["imageUrl"] = rank.price;
                                rankNumberFree[rankNumber]["availableUmbrellas"] = [];
                            } else {
                                elementsToAdd = rankNumberFree[rankNumber]["availableUmbrellas"];
                            }

                            elementsToAdd.splice(0,0,umbrella);

                            rankNumberFree[rankNumber]["availableUmbrellas"] = elementsToAdd;
                        }
                    }
                }
            }

            let availability = {};

            availability["services"] = catalog.services;
            availability["ranks"] = rankNumberFree;

            commonController.response(res, availability);
        });
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
        CatalogId, func);
}

/**
 * Check if umbrellas belongs to some ranks already present.
 * @param catalog
 * @param fromUmbrella
 * @param toUmbrella
 * @returns {boolean}
 */
function checkIfUmbrellasHaveAlreadyRanks(catalog, fromUmbrella, toUmbrella) {
    let counter = 0;

    for (const rank of catalog.rankUmbrellas) {
        if ((fromUmbrella <= rank.toUmbrella)
            && (toUmbrella >= rank.fromUmbrella)){

            counter++
        }

    }

    return counter > 1;
}
