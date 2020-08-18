const mongoose = require('mongoose');

const Catalog = require("../models/catalogModel")(mongoose);
const Booking = require("../models/bookingModel")(mongoose);

const Rank = require("../models/nestedSchemas/rankUmbrellaModel")(mongoose);
const Service = require("../models/nestedSchemas/serviceModel")(mongoose);
const Sale = require("../models/nestedSchemas/saleModel")(mongoose);
const Umbrella = require("../models/nestedSchemas/umbrellaModel")(mongoose);

const commonController = require("./commonController");

const CatalogId = mongoose.Types.ObjectId("5f3ba546cb999aee959eab3f");
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

            let rank = new Rank(req.body);
            rank._id = mongoose.Types.ObjectId();
            catalog.rank_umbrellas.splice(0, 0, rank);
            // catalog.rank_umbrellas.push(rank); CHECK splice

            commonController.correctSave(catalog, commonController.status_created, res);
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

            if (req.body.name)
                rankTarget.name = req.body.name

            if (req.body.description)
                rankTarget.description = req.body.description

            if (req.body.price || req.body.price >= 0)
                rankTarget.price = req.body.price

            if (req.body.from_umbrella)
                rankTarget.from_umbrella = req.body.from_umbrella

            if (req.body.to_umbrella)
                rankTarget.to_umbrella = req.body.to_umbrella

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
            if (req.body.price || req.body.price >= 0)
                serviceTarget.price = req.body.price;

            if (req.body.description)
                serviceTarget.description = req.body.description;

            if (req.body.umbrella_related)
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

                commonController.correctSave(catalog, commonController.status_created, res);

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

        }  else if ((req.body.page_id || req.body.page_id === 0) && (req.body.page_size || req.body.page_size >= 0)){

            let allSale = [];


            // FIXME filtra tutti i sales
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
        if (req.params.id) {

            let saleFound = false;

            // check hasOwnProperty
            for (let rank in catalog.rank_umbrellas){
                if (catalog.rank_umbrellas.hasOwnProperty(rank)){
                    commonController.updateCollection(catalog, catalog.rank_umbrellas[rank].sales, req, res, req.params.id, (saleResult) => {

                        saleFound = true;

                        if (req.body.percent || req.body.percent >= 0)
                            saleResult.percent = req.body.percent

                        if (req.body.date_from || req.body.date_from.getTime() >= Date.now())
                            saleResult.date_from = req.body.date_from

                        if (req.body.date_to || req.body.date_to.getTime() > req.body.date_from.getTime())
                            saleResult.date_to = req.body.date_to
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
 *
 * @param req
 * @param res
 */
module.exports.get_availability = function (req, res) {
    checkCatalog(req, res, "catalog", (errCat, catalog) => {
        // Ho tutti gli ombrelloni grazie al catalog
        commonController.findAllFromCollection(req, res, "book", Booking, ""
            ,(errBook, allBookings) =>{

                // Umbrella not free in that periods
                // Primo filtro: se la prenotazione deve ancora essere terminata
                // Secondo filtro: se la prenotazione inizia in quel periodo
                let umbrellaNumberUsed = allBookings.filter(b => b.date_to.getTime() > new Date(req.body.from).getTime()
                                                    && b.date_from.getTime() < new Date(req.body.to).getTime()
                                                    && b.confirmed
                                                    && !b.cancelled)
                                                    .flatMap(b => b.umbrellas.map(u => u.number));

                // When this cicle is terminated in rankNumberFree we have all ranks with his umbrellas
                // Al termine di questo ciclo dovrei avere tutti i rank con gli ombrelloni correlati
                let rankNumberFree = [];
                for (let rank in catalog.rank_umbrellas) {

                    if (catalog.rank_umbrellas.hasOwnProperty(rank)) {

                        for (let i = catalog.rank_umbrellas[rank].from_umbrella; i < catalog.rank_umbrellas[rank].to_umbrella; i++){

                            if (!umbrellaNumberUsed.includes(i)){

                                let elementsToAdd = [];

                                let umbrella = new Umbrella();
                                umbrella.number = i;
                                umbrella.rank_id = catalog.rank_umbrellas[rank]._id;

                                if (!rankNumberFree[rank]) {
                                    rankNumberFree[rank] = {};
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
        mongoose.Types.ObjectId(CatalogId), func);
}

