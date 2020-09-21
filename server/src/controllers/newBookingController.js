const Booking = require('../models/bookingModel');
const Bathhouse = require("../models/bathhouseModel");
const RankUmbrella = require('../models/rankUmbrellasModel');
const Service = require('../models/servicesModel');
const sanitizers = require('../utils/sanitizers');
const validators = require('../utils/validators');

const common = require('../utils/common');
const respFilters = require('../utils/responseFilters');
const respGenerator = require('../utils/responseGenerator');

/**
 */
module.exports.season = async (req, res) => {
  const bathhouse = await Bathhouse.findOne();

  respGenerator.respondOK(res, {
    seasonStart: bathhouse.seasonStart,
    seasonEnd: bathhouse.seasonEnd
  });
}

/**
 */
module.exports.availability = async (req, res) => {
  const dateFrom = sanitizers.toDate(req.query['date-from']);
  const dateTo = sanitizers.toDate(req.query['date-to']);

  if (!validators.areFieldsValid(dateFrom, dateTo)) {
    respGenerator.respondMalformedRequest(res);
    return;
  }

  const availableUmbrellas = await common.generateAvailableUmbrellas(dateFrom, dateTo);
  const rankUmbrellas = await RankUmbrella.find();
  const services = await Service.find();

  respGenerator.respondOK(res, {
    availableUmbrellas: availableUmbrellas,
    rankUmbrellas: respFilters.clean(rankUmbrellas),
    services: respFilters.clean(services)
  });
}


/**
 */
module.exports.checkout = async (req, res) => {
  const customerId = sanitizers.toMongoId(req.body.customerId);
  const umbrellas = sanitizers.toArrayOfUmbrellas(req.body.umbrellas);
  const price = sanitizers.toPositiveFloat(req.body.price);
  const dateFrom = sanitizers.toDate(req.body.dateFrom);
  const dateTo = sanitizers.toDate(req.body.dateTo);
  const services = sanitizers.toArrayOfServices(req.body.services);

  await common.create(req, res, Booking, {
    customerId: customerId,
    dateFrom: dateFrom,
    dateTo: dateTo,
    confirmed: false,
    cancelled: false,
    umbrellas: umbrellas,
    services: services,
    price: price
  });
}
