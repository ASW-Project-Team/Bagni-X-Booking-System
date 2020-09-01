const mongoose = require('mongoose');

const HomeCard = require("../models/nestedSchemas/homeCardModel")(mongoose);

const commonController = require("./commonController");


/**
 * Return info for home page
 * @param req
 * @param res:
 *          200: The query was correctly served:
 *              properties:
 *                  . mainCard.
 *                  . [homeCards].
 *                  . [rankUmbrellas].
 *                  . [services].
 *          400: The request is malformed.
 */
module.exports.getHomeServicesRank = function (req, res) {

    let docReturn = {}

    commonController.findCatalog(req, res, "catalog", (errCat, catalog)=>{

        docReturn["services"] = catalog.services
        docReturn["rankUmbrellas"] = catalog.rankUmbrellas

        commonController.findBathhouse(req, res,  (errBath, bathhouse)=>{

            docReturn["mainCard"] = bathhouse.mainHomeCard
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

    commonController.findBathhouse(req, res, (err, bathhouse) => {

        commonController.areRequiredFieldsPresent(req, res, ()=>{

            if (commonController.typeOfString(req.body.image)
                && commonController.typeOfString(req.body.title)
                && commonController.typeOfBoolean(req.body.header)
                && (!(req.body.description) || commonController.typeOfString(req.body.description))){

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
            && (!(req.body.description) || commonController.typeOfString(req.body.description))){

            if (req.body.image)
                homeCard.image = req.body.image

            if (req.body.title)
                homeCard.title = req.body.title

            if (req.body.header)
                homeCard.header = req.body.header

            if (req.body.description)
                homeCard.description = req.body.description

            commonController.correctSave(bathhouse, commonController.statusCompleted, res,homeCard)

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
    commonController.findBathhouse(req, res, (errBath, bathhouse)=>{

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

        commonController.findBathhouse(req, res, (errBath, bathhouse) => {

            commonController.getNestedDocument(bathhouse.homeCards, req, res, id, (homeCard) =>
                func(homeCard, bathhouse)
            )

        });

    } else
        commonController.notify(res, commonController.badRequest, "Id don't inserted")
}

