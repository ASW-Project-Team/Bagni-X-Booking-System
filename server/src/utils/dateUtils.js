const MILLIS_IN_SECOND = 1000;
const SECONDS_IN_MINUTES = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAYS = 24;
const MILLIS_IN_DAY = MILLIS_IN_SECOND * SECONDS_IN_MINUTES * MINUTES_IN_HOUR * HOURS_IN_DAYS;


/**
 * Expresses the booking in terms of days. If the booking time is lower than a day, it
 * is automatically set to half day (0,5). Otherwise, days are computed.
 * @param {Date} dateFrom The booking starting date.
 * @param {Date} dateTo The booking ending date.
 * @return {number} The booking duration, in days.
 */
module.exports.getBookingDays = (dateFrom, dateTo) => {
  let millisDiff = Math.abs(dateFrom.getTime() - dateTo.getTime());

  if (millisDiff < MILLIS_IN_DAY) {
    // considerate half day, if booked for less than a day
    return 0.5;
  } else {
    // consider days between otherwise
    return Math.ceil(millisDiff / MILLIS_IN_DAY);
  }
}

/**
 * Returns the day identifier in relation to the year period, from 1 to 366.
 * @param {Date} date The input date.
 * @return {number} The day identifier in relation to the year period, from 1 to 366.
 */
module.exports.dayOfYear = (date) => {
  return Math.floor((date - new Date(date.getFullYear(), 0, 0))
    / MILLIS_IN_SECOND / SECONDS_IN_MINUTES / MINUTES_IN_HOUR / HOURS_IN_DAYS);
}

/**
 * Checks whether the given days have the same day of the year.
 * @param {Date} firstDate The first day to compare.
 * @param {Date} secondDate The second date to compare.
 * @return {boolean} Whether the given days have the same day of the year.
 */
module.exports.sameDayOfTheYear = (firstDate, secondDate) => {
  return this.dayOfYear(firstDate) === this.dayOfYear(secondDate);
}

/**
 * Sets the date hour to midnight (0.00).
 * @param {Date} date The date to update.
 * @return {Date} The updated date.
 */
module.exports.startOfTheDay = (date) => {
  date.setHours(0,0,0,0);
  return date;
}

/**
 * Wrapper for today's date.
 * @return {Date} Today's date.
 */
module.exports.today = () => new Date();

/**
 * Today's date at midnight.
 * @return {Date} Today's date at midnight.
 */
module.exports.todayMidnight = () => {
  return this.startOfTheDay(this.today());
}

/**
 * Yesterday's date at midnight.
 * @return {Date} Yesterday's date at midnight.
 */
module.exports.yesterdayMidnight = () => {
  return this.startOfTheDay(this.yesterday());
}

/**
 * Returns yesterday's date at this time.
 * @return {Date} Yesterday's date.
 */
module.exports.yesterday = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
}


module.exports.dayAfterX = (days) => {
  const dayAfterX = new Date();
  dayAfterX.setDate(dayAfterX.getDate() + days);
  return dayAfterX;
}

/**
 * Returns x days before today's date, at this time.
 * @param days {number}: the number of days to subtract.
 * @return {Date} The day before yesterday's date.
 */
module.exports.xDaysAgo = (days) => {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - days);
  return twoDaysAgo;
}

/**
 * Returns a date that corresponds to the first day of this year.
 * @return {Date} The first day of the year.
 */
module.exports.currYearStartDate = () => {
  const currYearStart = new Date();
  currYearStart.setMonth(0, 1); // set to jan 01
  currYearStart.setHours(0,0,0,0);
  return currYearStart;
}

/**
 * Returns a date that corresponds to the last date of this year.
 * @return {Date} The last day of this year.
 */
module.exports.currYearEndDate = () => {
  const currYearEnd = new Date();
  currYearEnd.setMonth(11, 32);
  currYearEnd.setHours(0,0,0,0);
  return currYearEnd;
}

/**
 * Adds a day to the given date.
 * @param {Date} date The date to modify.
 * @return {Date} The modified date.
 */
module.exports.addDay = (date) => {
  date.setDate(date.getDate() + 1);
  return date;
}

/**
 * Modifies the date, changing the year to match the current one.
 * @param {Date} date The date to modify.
 * @return {Date} the modified date.
 */
module.exports.setYearToCurrent = (date) => {
  date.setFullYear(new Date().getFullYear());
  return date;
}

/**
 * Checks whether a date is inside the given period.
 * @param {Date} periodDateFrom The period start date.
 * @param {Date} periodDateTo The period end date.
 * @param {Date} date The given date
 * @return {boolean} Whether the date is inside the given period.
 */
module.exports.dateInPeriod = (periodDateFrom, periodDateTo, date) => {
  return periodDateFrom <= date && periodDateTo >= date;
}

/**
 * Simplified wrapper for data cloning.
 * @param {Date} date the input date.
 * @return {Date} The cloned date.
 */
module.exports.cloneDate = (date) => {
  return new Date(date.getTime());
}

/**
 * The callback
 * @callback periodIterator
 * @param {Date} date The current iteration date.
 */


/**
 * Repeats the given action for each day of the given period.
 * @param {Date} dateFrom The period start date.
 * @param {Date} dateTo The period end date.
 * @param {periodIterator} callback The code to execute. The first parameter is the current date
 */
module.exports.iterateThroughPeriod = (dateFrom, dateTo, callback) => {
  for (let currentDay = dateFrom;
       currentDay < dateTo;
       this.addDay(currentDay)) {
    callback(currentDay);
  }
}

/**
 * Repeats the given action for each day of the current year.
 * @param {periodIterator} callback The code to execute. The first parameter is the current date
 */
module.exports.iterateThroughYear = (callback) => {
  this.iterateThroughPeriod(this.currYearStartDate(), this.currYearEndDate(), callback);
}
