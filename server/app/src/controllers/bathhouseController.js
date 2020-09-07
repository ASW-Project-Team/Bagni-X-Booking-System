const mongoose = require('mongoose');

const HomeCard = require("../models/nestedSchemas/homeCardModel")(mongoose);
const Bathhouse = require("../models/bathhouseModel")(mongoose);

const commonController = require("./commonController");


/**
 * Return all information of bathhouse
 * @param req GET
 * @param res:
 *          200: Return all the info of bathhouse
 *          404: Bathhouse not founded
 */
module.exports.getBathhouse = function (req, res) {

    commonController.findBathhouse(req, res, (bath)=>
        commonController.response(res, bath)
    )
}

/**
 * Return information for the start date of the season and for the finish date of the season.
 * @param req GET
 * @param res:
 *          200: Return object compound of:
 *              . "seasonDateFrom" => date of start season
 *              . "seasonDateTo" => date of finish season
 *          404: Bathhouse not founded
 */
module.exports.getDateOfSeason = function (req, res) {

    commonController.findBathhouse(req, res, (bath)=>{

        let bathSeason = {}

        bathSeason["seasonDateFrom"] = bath.seasonDateFrom
        bathSeason["seasonDateTo"] = bath.seasonDateTo

        commonController.response(res, bathSeason)
    })

}


/**
 * Modify information about bathhouse.
 * @param req PUT with these body params possibles:
 *  . name
 *  . logoUrl
 *  . seasonDateFrom
 *  . seasonDateTo
 *  . mainHomeCard
 *  . homeCards
 * @param res:
 *          200: Return the bathhouse already modified.
 *          400: Parameters are bad formatted.
 *          404: Bathhouse not found.
 */
module.exports.modifyBathhouse = function (req, res) {

    commonController.findBathhouse(req, res, (bath)=>{

        if (!req.body.name || commonController.typeOfString(req.body.name)
            && !req.body.logoUrl || commonController.typeOfString(req.body.logoUrl)
            && !req.body.seasonDateFrom || commonController.typeOfString(req.body.seasonDateFrom)
            && !req.body.seasonDateTo || commonController.typeOfString(req.body.seasonDateTo)
            && !req.body.mainHomeCard ||
                controlForCard(req.body.mainHomeCard.image, req.body.mainHomeCard.title, req.body.mainHomeCard.header,
                    req.body.mainHomeCard.description)
            && !req.body.homeCards ||
                    req.body.homeCards.every(hc => controlForCard(hc.image, hc.title, hc.header, hc.description))) {

            const bathParams = Object.freeze({
                "name":"name",
                "logoUrl":"logoUrl",
                "seasonDateFrom":"seasonDateFrom",
                "seasonDateTo":"seasonDateTo",
                "mainHomeCard":"mainHomeCard",
                "homeCards":"homeCards"
            })

            if (req.body.mainHomeCard)
                req.body.mainHomeCard["_id"] = mongoose.Types.ObjectId()

            if (req.body.homeCards)
                req.body.homeCards.forEach(hc => hc["_id"] = mongoose.Types.ObjectId())

            commonController.checkAndActForUpdate(bath, req,"", bathParams.mainHomeCard, bathParams.logoUrl,
                bathParams.seasonDateFrom,bathParams.seasonDateTo, bathParams.mainHomeCard, bathParams.homeCards)
                .then(commonController.correctSave(bath, commonController.statusCompleted, res))
        } else
            commonController.parameterBadFormatted(res)

    })
}

/**
 * Create a bathhouse.
 * @param req:
 * @param res:
 *          200: Return the bathhouse already constructed.
 *          400: Parameters are bad formatted.
 */
module.exports.createBathhouse = function (req, res) {

    commonController.areRequiredFieldsPresent(req, res, ()=>{

        if (commonController.typeOfString(req.body.name)
            && commonController.typeOfString(req.body.logoUrl)
            && commonController.typeOfString(req.body.seasonDateFrom)
            && commonController.typeOfString(req.body.seasonDateTo)
            && controlForCard(req.body.mainHomeCard.image, req.body.mainHomeCard.title, req.body.mainHomeCard.header,
                req.body.mainHomeCard.description)
            && !req.body.homeCards ||
            req.body.homeCards.every(hc => controlForCard(hc.image, hc.title, hc.header, hc.description))) {

            let bathhouse = new Bathhouse(req.body)
            bathhouse._id = mongoose.Types.ObjectId()
            bathhouse.mainHomeCard["_id"] = mongoose.Types.ObjectId()
            bathhouse.homeCards.forEach(hc => hc["_id"] = mongoose.Types.ObjectId())

            commonController.correctSave(bathhouse, commonController.statusCreated, res)
        } else
            commonController.parameterBadFormatted(res)

    }, req.body.name, req.body.logoUrl, req.body.seasonDateFrom, req.body.seasonDateTo, req.body.mainHomeCard)


}

/**
 * Return info for home page
 * @param req
 * @param res:
 *          200: The query was correctly served:
 *              properties:
 *                  . mainHomeCard.
 *                  . [homeCards].
 *                  . [rankUmbrellas].
 *                  . [services].
 *          400: The request is malformed.
 */
module.exports.getHomeServicesRank = function (req, res) {

    let docReturn = {}

    commonController.findCatalog(req, res, (errCat, catalog)=>{

        docReturn["services"] = catalog.services
        docReturn["rankUmbrellas"] = catalog.rankUmbrellas

        commonController.findBathhouse(req, res,  (bathhouse)=>{

            docReturn["mainHomeCard"] = bathhouse.mainHomeCard
            docReturn["homeCards"] = bathhouse.homeCards

            commonController.response(res, docReturn)
        });

    });
}

/**
 * Insert a new home card.
 * @param req
 * @param res:
 *              200: The modification has been accepted by the server.
 *              400: The request is malformed.
 *              401: The admin was not correctly authenticated.
 */
module.exports.insertHomeCard = function (req, res) {

    commonController.findBathhouse(req, res, ( bathhouse) => {

        commonController.areRequiredFieldsPresent(req, res, ()=>{

            if (controlForCard(req.body.image, req.body.title, req.body.header, req.body.description)){

                let homeCard = new HomeCard(req.body)
                homeCard._id = new mongoose.Types.ObjectId()

                bathhouse.homeCards.splice(0,0, homeCard)

                commonController.correctSave(bathhouse, commonController.statusCreated, res, homeCard);
            } else
                commonController.parameterBadFormatted(res)

        }, req.body.image, req.body.title, req.body.header)
    })


}

/**
 *
 * @param image
 * @param title
 * @param header
 * @param description
 * @returns {boolean|boolean}
 */
function controlForCard(image, title, header, description) {
    return (commonController.typeOfString(image)
        && commonController.typeOfString(title)
        && commonController.typeOfBoolean(header)
        && (!(description) || commonController.typeOfString(description)))
}

/**
 * Return a specific home card by find with _id
 * @param req: GET request with _id
 * @param res:
 *          200: The server returned the desired data.
 *          400: The request is malformed.
 *          401: The admin was not correctly authenticated.
 *          404: The home card with the given id does not exist.
 */
module.exports.getHomeCard = function (req, res) {

    findHomeCard(req, req.params.id, res, (homeCard) => commonController.response(res, homeCard))

}

/**
 * Request of modification for some fields of the given home card.
 * @param req have "_id"
 * @param res:
 *        200: The modification has been accepted by the server.
 *        400: The request is malformed.
 *        401: The admin was not correctly authenticated.
 *        404: The home card with the given id does not exist.
 */
module.exports.modifyHomeCard = function (req, res) {

    findHomeCard(req, req.params.id, res, (homeCard, bathhouse)=>{

        if ((!(req.body.image) || commonController.typeOfString(req.body.image))
            && (!(req.body.title) || commonController.typeOfString(req.body.title))
            && (!(req.body.header) || commonController.typeOfBoolean(req.body.header))
            && (!(req.body.description) || commonController.typeOfString(req.body.description))
            && (!(req.body.seasonDateFrom) || commonController.typeOfString(req.body.seasonDateFrom))
            && (!(req.body.seasonDateTo) || commonController.typeOfString(req.body.seasonDateTo))){

            let dateFrom = new Date(homeCard.seasonDateFrom)
            if (req.body.seasonDateFrom)
                dateFrom = new Date(req.body.seasonDateFrom)

            let dateTo = new Date(homeCard.seasonDateTo)
            if (req.body.seasonDateTo)
                dateTo = new Date(req.body.seasonDateTo)

            if (dateTo.getTime() >= dateFrom.getTime()){

                const bathhouseParams = Object.freeze({
                    "image":"image",
                    "title":"title",
                    "header":"header",
                    "description":"description"
                })

                commonController.checkAndActForUpdate(homeCard, req, "",
                    bathhouseParams.image, bathhouseParams.header, bathhouseParams.title, bathhouseParams.description)
                    .then(commonController.correctSave(bathhouse, commonController.statusCompleted, res,homeCard))

            } else
                commonController.notify(res, commonController.badRequest, "Error in season's date!")



        } else
          commonController.parameterBadFormatted(res)
    });
}

/**
 * DELETE a specific homeCard
 * @param req have "_id"
 * @param res:
 *      200: The deletion has been accepted by the server.
 *      401: The admin was not correctly authenticated.
 *      404: The home card with the given id does not exist.
 */
module.exports.deleteHomeCard = function (req, res) {
    commonController.findBathhouse(req, res, (bathhouse)=>{

        if (req.params.id){

            bathhouse.homeCards = bathhouse.homeCards.filter(elem => !elem._id.equals(mongoose.Types.ObjectId(req.params.id)))
            bathhouse.save()

            commonController.response(res, commonController.deleteOperationCompleted)
        } else
            commonController.parameterBadFormatted(res)
    });

}

/**
 * Used for find an home Card. This function already includes common controls.
 * @param req
 * @param id
 * @param res
 * @param func with param homeCard if  it's found
 */
function findHomeCard(req, id, res, func) {

    if (id){

        commonController.findBathhouse(req, res, (bathhouse) => {

            commonController.getNestedDocument(bathhouse.homeCards, req, res, id, (homeCard) =>
                func(homeCard, bathhouse)
            )

        });

    } else
        commonController.notify(res, commonController.badRequest, "Id don't inserted")
}

