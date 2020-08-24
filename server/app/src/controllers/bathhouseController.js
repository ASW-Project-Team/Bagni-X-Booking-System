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
    commonController.findByIdFirstLevelCollection(req, res, "catalog", Catalog, "Catalog",
        mongoose.Types.ObjectId(CatalogID), (err, catalog)=>{


    });
}