const Booking = require("../models/bookingModel");
const Bathhouse = require("../models/bathhouseModel");
const common = require('../utils/common');
const RankUmbrella = require("../models/rankUmbrellasModel");

const responseGen = require('../utils/responseGenerator');

const getDailyOccupation = async (date, bookings) => {
  return bookings.filter(booking => {
    return booking.dateFrom.getTime() <= date.getTime() && booking.dateTo.getTime() >= date.getTime();
  }).map(booking => booking.umbrellas).reduce((prev,curr)=>prev.concat(curr), []).length;
}

module.exports.currentSeason = async (req,res) => {
  const bathhouse = await Bathhouse.findOne();
  const allBookings = await Booking.find();

  if (!(bathhouse.seasonStart.getTime() <= Date.now() && bathhouse.seasonEnd.getTime() >= Date.now())) {
    responseGen.respondOK(res, { outOfSeason: true});
    return;
  }

  const today = Date.now();
  const todayOccupation = await getDailyOccupation(today, allBookings);

  // retrieves yesterday w. Javascript Date API
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayOccupation = await getDailyOccupation(yesterday, allBookings);

  const totUmbrellasArray = await common.generateAllUmbrellas();
  const totalUmbrellas = totUmbrellasArray.length;


  const allDailyOccupations = [];
  let currentDay = bathhouse.seasonStart;
  do {
    allDailyOccupations.push(await getDailyOccupation(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  } while (currentDay.getTime() < Date.now())

  const avgDailyOccupations = []; // {date:dsfd, percent:asdasd}

  let currentGroup = [];
  let currentDate;
  for (let i = 0; i < allDailyOccupations.length; i++) {
    if (i % 3 === 0) {
      // agg elem
      if (currentGroup.length >= 3 && currentDate) {
        let avgOccupation = (currentGroup.pop() + currentGroup.pop() + currentGroup.pop()) / 3;
        avgDailyOccupations.push({
          date: currentDate,
          percent: avgOccupation
        });
      }
      currentDate = new Date();
    } else {
      // media su elem
      const occupationPercent = 100 * allDailyOccupations[i] / totalUmbrellas;
      currentGroup.push(occupationPercent);
    }
  }

  responseGen.respondOK(res, {
    outOfSeason: false,
    dailyOccupation: {
      totalUmbrellas: totalUmbrellas,
      todayOccupation: todayOccupation,
      yesterdayOccupation: yesterdayOccupation
    },
    currentSeasonProjection: avgDailyOccupations
  });
}

module.exports.pastSeason = async (req,res) => {

}
