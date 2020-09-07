const mongoose = require('mongoose');


const Rank = require("../models/nestedSchemas/rankUmbrellaModel")(mongoose);
const Service = require("../models/nestedSchemas/serviceModel")(mongoose);
const Sale = require("../models/nestedSchemas/saleModel")(mongoose);

const commonController = require("./commonController");

// Before this queries we have to check the permissions to interact with db

/**
 * It returns a specific ranks or someones in a paginated result
 * @param req: two possible scenario:
 * 				1) In request is specified par "id".
 * 				2) In request could be specified "page-id" and/or "page-to".
 * 					page-id: Which one of the incremental paginated results will be delivered. If omitted, default is 0.
 * 					page-size: Maximum size of the results. If omitted, default is 10.
 * @param res: two possible scenario:
 *				1) res:
 *					200: The ranks has been correctly delivered.
 *					400: The request was malformed.
 *					404: The ranks with the given id does not exist.
 *			 	2) res:
 * 					200: Returns the most recent ranks, in a paginated fashion.
 * 					400: The request was malformed.
 */
module.exports.readRanks = function (req, res) {

    commonController.findCatalog(req,res, (err, catalog)=>{

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
 * @param res:
 *          201: All fields are corrected, the item has been inserted.
 *          400: Malformed request.
 *          401: The admin was not correctly authenticated.
 *          404: Catalog ins't found
 */
module.exports.createRank = function (req, res) {
    commonController.findCatalog(req, res, (err, catalog)  => {

        commonController.areRequiredFieldsPresent(req, res, () =>{

            if (commonController.typeOfNumber(req.body.price)
                && commonController.typeOfNumber(req.body.fromUmbrella)
                && commonController.typeOfNumber(req.body.toUmbrella)
                && req.body.toUmbrella >= req.body.fromUmbrella
                && commonController.typeOfString(req.body.name)
                && (!(req.body.description) || commonController.typeOfString(req.body.description))
                && (!(req.body.sales) || checkSales(req.body.sales))){

                if (!checkIfUmbrellasHaveAlreadyRanks(catalog, req.body.fromUmbrella, req.body.toUmbrella)) {

                    let rank = new Rank(req.body);
                    rank._id = mongoose.Types.ObjectId();

                    let sales = []

                    for (const sale of req.body.sales) {
                        sales.splice(0,0,sale)
                        sales[0]._id = mongoose.Types.ObjectId()
                    }

                    rank.sales = sales

                    catalog.rankUmbrellas.splice(0, 0, rank);

                    commonController.correctSave(catalog, commonController.statusCreated, res);

                } else {
                    commonController.notify(res, commonController.badRequest, "Umbrellas belongs to another rank!");
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
 * @param req The request.
 * @param res:
 *             200: All fields are corrected, the item has been modified.
 *             400: Malformed request.
 *             401: The admin was not correctly authenticated.
 *             404: Two scenario:
 *                      . a RankUmbrella with the given id does not exist.
 *                      . catalog does not exist.
 */
module.exports.updateRank = function (req, res) {
    commonController.findCatalog(req, res,  (err, catalog)  => {

        commonController.getNestedDocument(catalog.rankUmbrellas, req, res, req.params.id,async (rankTarget) => {


            if ((!(req.body.name) || commonController.typeOfString(req.body.name))
                && (!(req.body.description) || commonController.typeOfString(req.body.description))
                && (!(req.body.price) || commonController.typeOfNumber(req.body.price))
                && (!(req.body.fromUmbrella) || commonController.typeOfNumber(req.body.fromUmbrella))
                && (!(req.body.toUmbrella) || commonController.typeOfNumber(req.body.toUmbrella))
                && (!(req.body.sales)) || checkSales(req.body.sales)){

                let fromUmbrella = rankTarget.fromUmbrella
                if (req.body.fromUmbrella)
                    fromUmbrella = req.body.fromUmbrella

                let toUmbrella = rankTarget.toUmbrella
                if (req.body.toUmbrella)
                    toUmbrella = req.body.toUmbrella


                if (toUmbrella >= fromUmbrella
                    && !checkIfUmbrellasHaveAlreadyRanks(catalog, fromUmbrella, toUmbrella, req.params.id)) {

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

function checkSales(sales){

    let saleCheck = true;

    for (const saleResult of sales){

        let dateFrom = new Date(saleResult.dateFrom);
        let dateTo = new Date(saleResult.dateTo);

        if (!((saleResult.percent && saleResult.percent<=1)
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

    const ranksParameter = Object.freeze({"name":"name", "fromUmbrella":"fromUmbrella", "toUmbrella":"toUmbrella",
                                            "description":"description", "price":"price"})

    commonController.checkAndActForUpdate(rankTarget, req, ()=>{
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
   }, ranksParameter.name, ranksParameter.description, ranksParameter.price, ranksParameter.fromUmbrella, ranksParameter.toUmbrella )
        .then(commonController.correctSave(catalog, commonController.statusCompleted, res, rankTarget))
    /*
    if (commonController.typeOfString(req.body.name))
        rankTarget.name = req.body.name

    if (commonController.typeOfNumber(req.body.fromUmbrella))
        rankTarget.fromUmbrella = req.body.fromUmbrella

    if (commonController.typeOfNumber(req.body.toUmbrella))
        rankTarget.toUmbrella = req.body.toUmbrella

    if (commonController.typeOfString(req.body.description))
        rankTarget.description = req.body.description

    if (commonController.typeOfNumber(req.body.price))
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

    commonController.correctSave(catalog, commonController.statusCompleted, res, rankTarget)*/
}

/**
 * DELETE a Rank
 * @param req
 * @param res
 */
module.exports.deleteRank = function (req, res) {

    commonController.deleteInCatalog(req, res, req.params.id, (catalog) =>
        catalog.rankUmbrellas = catalog.rankUmbrellas.filter(elem => !elem._id.equals(mongoose.Types.ObjectId(req.params.id)))
    )

}

/**
 * Create a service. Need some required fields:
 *  . price of the service
 *  . umbrellaRelated indicates if is service is general or related to umbrella
 * @param req
 * @param res
 */
module.exports.createService = function(req, res) {
    commonController.findCatalog(req, res,  (err, catalog)  => {

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
 * It returns a specific services or someones in a paginated result.
 * @param req: two possible scenario:
 * 				1) In request is specified par "id".
 * 				2) In request could be specified "page-id" and/or "page-to".
 * 					page-id: Which one of the incremental paginated results will be delivered. If omitted, default is 0.
 * 					page-size: Maximum size of the results. If omitted, default is 10.
 * @param res: two possible scenario:
 *				1) res:
 *					200: The services has been correctly delivered.
 *					400: The request was malformed.
 *					404: The news with the given id does not exist.
 *			 	2) res:
 * 					200: Returns the most recent news, in a paginated fashion.
 * 					400: The request was malformed.
 */
module.exports.readServices = function (req, res) {

    commonController.findCatalog(req, res,  (err, catalog, documentName) => {
        // If par is present find the specified param ...
        if (req.params.id) {

            commonController.returnNestedDocument(catalog.services, req, res, req.params.id, err, documentName);
        } else {
            // Return tot pages
            commonController.returnPages(req.query["page-id"], req.query["page-size"], req, res, catalog.services, "Services");
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
    commonController.findCatalog(req, res,  (err, catalog)  => {

        commonController.getNestedDocument(catalog.services, req, res, req.params.id,(serviceTarget) =>{

            if (!(req.body.price) || commonController.typeOfNumber(req.body.price)
                && (!(req.body.umbrellaRelated) || commonController.typeOfBoolean(req.body.umbrellaRelated))
                && (!(req.body.description) || commonController.typeOfString(req.body.description))){

                if (commonController.typeOfNumber(req.body.price))
                    serviceTarget.price = req.body.price;

                if (req.body.description)
                    serviceTarget.description = req.body.description;

                if (commonController.typeOfBoolean(req.body.umbrellaRelated))
                    serviceTarget.umbrellaRelated = req.body.umbrellaRelated;

                commonController.correctSave(catalog, commonController.statusCompleted, res, serviceTarget);
            }


        });
    });
}

/**
 * DELETE a specific Service.
 * @param req: contains id in url-path
 * @param res:
 *          200: The Service has been correctly removed.
 *          400: Malformed request.
 *          401: The admin was not correctly authenticated.
 *          404: A Service with the given id does not exist.
 */
module.exports.deleteService = function(req, res) {

    commonController.deleteInCatalog(req, res, req.params.id, (catalog) =>
        catalog.services = catalog.services.filter(elem => !elem._id.equals(mongoose.Types.ObjectId(req.params.id))))

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
    commonController.findCatalog(req, res,  (err, catalog) => {

        commonController.getNestedDocument(catalog.rankUmbrellas, req, res, req.body.rankId, (rank) => {

            commonController.areRequiredFieldsPresent(req, res, () => {

                if (commonController.typeOfNumber(req.body.percent)
                    && req.body.percent <= 1
                    && commonController.typeOfString(req.body.dateFrom)
                    && commonController.typeOfString(req.body.dateTo)
                    && new Date(req.body.dateFrom).getTime() >= Date.now()
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
 * It returns a specific sale or someones in a paginated result
 * @param req: two possible scenario:
 * 				1) In request is specified par "id".
 * 				2) In request could be specified "page-id" and/or "page-to".
 * 					page-id: Which one of the incremental paginated results will be delivered. If omitted, default is 0.
 * 					page-size: Maximum size of the results. If omitted, default is 10.
 * @param res: two possible scenario:
 *				1) res:
 *					200: The sale has been correctly delivered.
 *					400: The request was malformed.
 *					404: The sale with the given id does not exist.
 *			 	2) res:
 * 					200: Returns the most recent sales, in a paginated fashion.
 * 					400: The request was malformed.
 */
module.exports.readSales = function (req, res) {
    commonController.findCatalog(req, res,  (err, catalog)  => {

        // If par is present find the specified param ...
        if (req.params.id) {

            let saleResult = null;

            // check hasOwnProperty
            for (const rank of catalog.rankUmbrellas){
                saleResult = commonController.returnNestedDocument(rank.sales,
                    req, res, req.params.id, err, "Sale", false)
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

            commonController.returnPages(req.query["page-id"], req.query["page-size"], req, res, allSaleRequested, "Sales");

        }

    });
}

/**
 * Update a specific sale if present. If not present return error.
 * @param req The specific request.
 * @param res The specific response.
 */
module.exports.updateSale = function (req, res) {
    commonController.findCatalog(req, res,  async (err, catalog)  => {

        // If par is present find the specified param ...
        if (req.params.id
            && (!req.body.percent ||  (commonController.typeOfNumber(req.body.percent) && req.body.percent <= 1))
            && (!req.body.dateFrom || commonController.typeOfString(req.body.dateFrom))
            && (!req.body.dateTo || commonController.typeOfString(req.body.dateTo))) {

            let saleFound = false;

            for (const rank of catalog.rankUmbrellas){
                await commonController.getNestedDocument(rank.sales, req, res,
                    req.params.id,  (saleResult) => {

                    saleFound = true;

                    let dateFrom = saleResult.dateFrom;
                    let dateTo = saleResult.dateTo;

                    if (req.body.dateFrom)
                        dateFrom = new Date(req.body.dateFrom)

                    if (req.body.dateTo)
                        dateTo = new Date(req.body.dateTo)

                    if ((dateTo.getTime() >= dateFrom.getTime())
                        && (dateFrom.getTime() >= Date.now())){

                        const saleParams  = Object.freeze({"percent":"percent", "dateFrom":"dateFrom","dateTo":"dateTo"})

                        commonController.checkAndActForUpdate(saleResult, req, "", saleParams)

/*                        if (req.body.percent)
                            saleResult.percent = req.body.percent

                        if (req.body.dateFrom)
                            saleResult.dateFrom = dateFrom

                        if (req.body.dateTo)
                            saleResult.dateTo = dateTo

                       commonController.correctSave(catalog, commonController.statusCompleted, res, saleResult)*/

                    } else
                        commonController.parameterBadFormatted(res)

                },false);

                if (saleFound)
                    break;

            }

            if (!saleFound)
                commonController.servePlain404(req, res, "Sale");
        } else
            commonController.notify(res, commonController.badRequest, "Id not present")
    });
}

/**
 * DELETE sale that have the specific id
 * @param req: id in path
 * @param res:
 *            200: The Sale has been correctly removed.
 *            400: Malformed request.
 *            401: The admin was not correctly authenticated.
 *            404: A Service with the given id does not exist.
 */
module.exports.deleteSale = function (req, res) {

    commonController.deleteInCatalog(req, res, req.params.id, (catalog) =>{

        let counter = 0;

        for (let rank of catalog.rankUmbrellas){
            catalog.rankUmbrellas[counter].sales = rank.sales.filter(sl => (!sl._id.equals(req.params.id)))
            counter++;
        }
    })
}


/**
 * Check if umbrellas belongs to some ranks already present.
 * @param catalog
 * @param fromUmbrella
 * @param toUmbrella
 * @param id: Used only in PUT request to check that umbrellas don't belong to another rank.
 *            If umbrellas already belongs to this booking this function return false,
 *            otherwise return true.
 * @returns {boolean}
 */
function checkIfUmbrellasHaveAlreadyRanks(catalog, fromUmbrella, toUmbrella, id=undefined) {

    let checker = false;

    for (const rank of catalog.rankUmbrellas) {
        if (!(id) || !rank._id.equals(id)
             (fromUmbrella <= rank.toUmbrella)
            && (toUmbrella >= rank.fromUmbrella)){

            checker = true
            break
        }

    }

    return checker
}

