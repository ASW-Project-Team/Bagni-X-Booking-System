const Booking = require('../models/bookingModel');
const Bathhouse = require("../models/bathhouseModel");
const RankUmbrella = require('../models/rankUmbrellasModel');
const Service = require('../models/servicesModel');
const sanitizers = require('./utils/sanitizers');
const validators = require('./utils/validators');

const common = require('./utils/common');
const respFilters = require('./utils/responseFilters');
const respGenerator = require('./utils/responseGenerator');

/**
 * Creates an array with all the umbrella extracted from the ranks, in a format
 * used from the client to book umbrellas.
 * @return {Promise<{number: number, rankId: string}[]>}
 */
const generateAllUmbrellas = async () => {
  const rankUmbrellas = await RankUmbrella.find();

  return rankUmbrellas.map(rank => {
    let umbrellas = [];

    for (let i = rank.fromUmbrella; i <= rank.toUmbrella; i++) {
      umbrellas.push({
        number: i,
        rankId: rank._id
      })
    }

    return umbrellas;
  }).reduce((prev, curr) => prev.concat(curr), []);
}


/**
 * Creates an array with only the available umbrellas, in a format
 * used from the client to book umbrellas.
 * @return {Promise<{number: number, rankId: string}[]>}
 */
const generateAvailableUmbrellas = async (dateFrom, dateTo) => {
  const allBookings = await Booking.find();
  const involvedBookings = allBookings.filter(book =>
    book.dateFrom.getTime() <= dateFrom.getTime() && book.dateTo.getTime() > dateFrom.getTime()
    || book.dateFrom.getTime() < dateTo.getTime() && book.dateTo.getTime() >= dateTo.getTime()
    || book.dateFrom.getTime() >= dateFrom.getTime() && book.dateTo.getTime() <= dateTo.getTime()
    || book.dateFrom.getTime() >= dateFrom.getTime() && book.dateTo.getTime() >= dateTo.getTime());

  const involvedUmbrNumbers = involvedBookings.map(book => {
    return book.umbrellas.map(umbrella => {
      return umbrella.number;
    });

  }).reduce((prev, curr) => {prev.concat(curr)}, []);

  const allUmbrellas = await generateAllUmbrellas();

  return allUmbrellas.filter(umbrella => !involvedUmbrNumbers.includes(umbrella.number));
}


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

  const availableUmbrellas = await generateAvailableUmbrellas(dateFrom, dateTo);
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
