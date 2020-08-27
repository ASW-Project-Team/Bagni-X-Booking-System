const mongoose = require('mongoose');

const Catalog = require("../models/catalogModel")(mongoose);
const Bathhouse = require("../models/bathhouseModel")(mongoose);

const commonController = require("./commonController");

const CatalogID = "5f40f4125c935b69a7f0626f";

const BathhouseID = "5f41345d9ca3ce59d9777862";


module.exports.getHomeServicesRank = function (req, res) {

    let docReturn = {}

    commonController.findByIdFirstLevelCollection(req, res, "catalog", Catalog, "Catalog",
        CatalogID, (errCat, catalog)=>{

        docReturn["services"] = catalog.services
        docReturn["ranks"] = catalog.rank_umbrellas

        commonController.findByIdFirstLevelCollection(req, res, "bathhouse", Bathhouse,
            "bathhouse", BathhouseID, (errBath, bathhouse)=>{

           docReturn["main"] = bathhouse.main_home_card
           docReturn["home cards"] = bathhouse.home_cards

                commonController.response(res, docReturn)
        });

    });
}