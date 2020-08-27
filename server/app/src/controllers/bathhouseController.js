const mongoose = require('mongoose');

const HomeCard = require("../models/nestedSchemas/homeCardModel")(mongoose);
const Services = require("../models/nestedSchemas/serviceModel")(mongoose);
const Rank = require("../models/nestedSchemas/rankUmbrellaModel")(mongoose);

const Catalog = require("../models/catalogModel")(mongoose);
const Bathhouse = require("../models/bathhouseModel")(mongoose);

const commonController = require("./commonController");

const CatalogID = "5f40f4125c935b69a7f0626f";

// TODO
const BathhouseID = "";


module.exports.getHomeServicesRank = function (req, res) {

    let docReturn = {}

    commonController.findByIdFirstLevelCollection(req, res, "catalog", Catalog, "Catalog",
        CatalogID, (errCat, catalog)=>{

        docReturn["services"] = catalog.services
        docReturn["ranks"] = catalog.rank_umbrellas

        commonController.findByIdFirstLevelCollection(req, res, "bathhouse", Bathhouse,
            "Bathhouse", BathhouseID, (errBath, bathhouse)=>{

           docReturn["main"] = bathhouse.main_home_card
           docReturn["home cards"] = bathhouse.home_cards

                commonController.response(res, docReturn)
        });

    });
}