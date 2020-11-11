const Booking = require("../models/bookingModel");
const Bathhouse = require("../models/bathhouseModel");
const common = require('../utils/common');
const Seasons = require('../models/seasonsModel')
const sanitizers = require('../utils/sanitizers');
const responseGen = require('../utils/responseGenerator');
const dateUtils = require('../utils/dateUtils')

/**
 * Returns the number of occupied umbrellas in the specified date, given an array of bookings
 * @param {Date} date The specified date.
 * @param {Booking[]} bookings An array of bookings-
 * @return {number} The number of occupied umbrellas, in the specified date.
 */
const getDailyOccupation = (date, bookings) => {
  return bookings
    .filter(booking => dateUtils.dateInPeriod(booking.dateFrom, booking.dateTo, date))
    .map(booking => booking.umbrellas)
    .reduce((prev, curr) => prev.concat(curr), [])
    .length;
}


/**
 * Gets the benchmark season from the database, it takes the dates to the current
 * year, and it transforms all elements in plain java objects.
 *  @return {Promise<{date: Date, percent: number}[]>}
 */
const getBenchmarkSeason = async () => {
  const benchmarkSeasonFull = await Seasons.findOne({ year: 0 });
  const benchmarkSeason = benchmarkSeasonFull.data;

  benchmarkSeason.forEach(item => {
    dateUtils.setYearToCurrent(item.date);
  })

  return benchmarkSeason.toObject();
}


/**
 * Gets the average season from the database, it takes the dates to the current
 * year, and it transforms all elements in plain java objects.
 *  @return {Promise<{date: Date, percent: number}[]>}
 */
const getAvgSeason = async () => {
  const avgSeasonFull = await Seasons.findOne({ year: -1 });
  const avgSeason = avgSeasonFull.data;

  avgSeason.forEach(item => {
    dateUtils.setYearToCurrent(item.date);
  })

  return avgSeason.toObject();
}


/**
 * Gets the occupation data of the current season, as a normalized data.
 * @param {Booking[]} allBookings
 * @param {number} totalUmbrellas
 * @return {{date: Date, percent: number}[]}
 */
const getSeasonHistoricalOccupation = (allBookings, totalUmbrellas) => {
  const historicalOccupation = [];

  dateUtils.iterateThroughPeriod(dateUtils.currYearStartDate(), dateUtils.today(),
    (currentDate) => {
    historicalOccupation.push({
      date: dateUtils.cloneDate(currentDate),
      percent: getDailyOccupation(currentDate, allBookings) / totalUmbrellas
    });
  });

  return historicalOccupation;
}


/**
 * Gets the forecast occupation data of the current season, as a normalized data.
 * @return {Promise<{date: Date, percent: number}[]>}
 */
const getSeasonProjectionOccupation = async (lastHistoricalOccupationValue) => {
  const benchmark = await getBenchmarkSeason();
  const benchmarkIncrements = [];
  for (let i = 0; i < benchmark.length; i++) {
    // after middle sept., every increment is -1 (security constraint)
      if(benchmark[i] && benchmark[i + 1]) {
        if(benchmark[i].date.getTime() > new Date('2020-09-15')) {
          benchmarkIncrements.push({
            date: benchmark[i + 1].date,
            percent: -0.01
          });

        } else {
          benchmarkIncrements.push({
            date: benchmark[i + 1].date,
            percent: benchmark[i].percent - benchmark[i + 1].percent
          });
        }
    }
  }

  const projectionOccupation = [];
  let currentPercent = lastHistoricalOccupationValue;

  dateUtils.iterateThroughPeriod(
    dateUtils.addDay(dateUtils.todayMidnight()), dateUtils.currYearEndDate(),
    (currentDate) => {
      const currentIncrement = benchmarkIncrements
        .filter(item => dateUtils.sameDayOfTheYear(item.date, currentDate))[0];
      // safety check
      if (currentIncrement) {
        currentPercent = currentPercent + currentIncrement.percent;
        if (currentPercent > 1) currentPercent = 1;
        if (currentPercent < 0) currentPercent = 0;

        projectionOccupation.push({
          date: dateUtils.cloneDate(currentDate),
          percent: currentPercent
        });
      }
    });

  return projectionOccupation;
}

/**
 * The controller returns statistical data about the current season,
 * both historical and forecast.
 */
module.exports.currentStats = async (req, res) => {
  const bathhouseInfo = await Bathhouse.findOne();
  const allBookings = await Booking.find();
  const outOfSeason = !dateUtils.dateInPeriod(bathhouseInfo.seasonStart, bathhouseInfo.seasonEnd, dateUtils.today());
  const todayOccupation = getDailyOccupation(dateUtils.today(), allBookings);
  const yesterdayOccupation = getDailyOccupation(dateUtils.yesterday(), allBookings);
  const totalUmbrellas = await common.totNumberOfUmbrellas();

  const historicalOccupation = getSeasonHistoricalOccupation(allBookings, totalUmbrellas);
  const projectionOccupation = await getSeasonProjectionOccupation(historicalOccupation[historicalOccupation.length - 1].percent);
  const benchmark = await getBenchmarkSeason();
  const averageOccupation = await getAvgSeason();

  responseGen.respondOK(res, {
    outOfSeason: outOfSeason,
    dailyOccupation: {
      totalUmbrellas: totalUmbrellas,
      todayOccupation: todayOccupation,
      yesterdayOccupation: yesterdayOccupation
    },
    currentSeasonHistorical: historicalOccupation,
    currentSeasonProjection: projectionOccupation,
    benchmark: benchmark,
    avgSeason: averageOccupation
  });
}

const computeSeasonStats = async (req, res, year) => {
  const seasonYear = year;

  if (!seasonYear || seasonYear === 0) {
    responseGen.respondMalformedRequest(res);
    return;
  }

  const season = await Seasons.findOne({year: seasonYear});

  if (!season) {
    responseGen.respondNotFound(res, Seasons.modelName);
    return;
  }

  const benchmark = await getBenchmarkSeason();
  const averageOccupation = await getAvgSeason();

  const allSeasons = await Seasons.find();
  const allActualSeasons = allSeasons.filter(item => item.year !== 0 && item.year !== -1);
  const availableYears = allActualSeasons.map(item => item.year);
  responseGen.respondOK(res, {
    availableYears: availableYears,
    season: season.data,
    benchmark: benchmark,
    avgSeason: averageOccupation,
    currentYear: year
  });
}


/**
 * The controller returns statistical data about the given season.
 */
module.exports.seasonStats = async (req, res) => {
  const seasonYear = sanitizers.toInt(req.params.id);
  await computeSeasonStats(req, res, seasonYear);
}


/**
 * The controller returns statistical data about the most recent available season.
 */
module.exports.lastSeasonStats = async (req, res) => {
  const allSeasons = await Seasons.find();
  const allActualSeasons = allSeasons.filter(item => item.year !== 0 && item.year !== -1);
  const lastAvailableYear = allActualSeasons
    .map(item => item.year)
    .reduce((prev, curr) => prev >= curr ? prev : curr, 0);

  await computeSeasonStats(req, res, lastAvailableYear);
}


/**
 * The controller tries to generate a season aggregate record for the current year,
 * and saves it into the database.
 */
module.exports.closeCurrentSeason = async (req, res) => {
  // try the creation and the insertion of year's aggregate data
  const allBookings = await Booking.find();
  const totalUmbrellas = await common.totNumberOfUmbrellas();

  const seasonOccupation = [];
  dateUtils.iterateThroughYear((currentDate) => {
    seasonOccupation.push({
      date: dateUtils.cloneDate(currentDate),
      percent: getDailyOccupation(currentDate, allBookings) / totalUmbrellas
    });
  });

  let currSeason = await Seasons.findOne({ year: dateUtils.today().getFullYear() });
  if (!currSeason) {
    currSeason = new Seasons();
  }
  currSeason.year = dateUtils.today().getFullYear();
  currSeason.data = seasonOccupation;
  await currSeason.save();

  // re-computes average
  const allSeasons = await Seasons.find();
  const allActualSeasons = allSeasons.filter(item => item.year !== 0 && item.year !== -1);

  const avgData = [];
  dateUtils.iterateThroughYear((currentDate) => {
    const currentAvgData = allActualSeasons
      .map(season => season.data.filter(item => dateUtils.sameDayOfTheYear(item.date, currentDate))[0].percent)
      .reduce((prev, curr) => { return prev + curr }, 0) / allActualSeasons.length;

    avgData.push({
      date: dateUtils.cloneDate(currentDate),
      percent: currentAvgData
    });
  });

  let avgSeason = await Seasons.findOne({ year: -1 });
  avgSeason.data = avgData;
  await avgSeason.save();

  responseGen.respondOK(res);
}
