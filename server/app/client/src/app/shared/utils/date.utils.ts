import {CostItem} from "../models/component-specific/booking-summary.model";

export class DateUtils {
  static readonly MILLIS_IN_SECOND = 1000;
  static readonly SECONDS_IN_MINUTES = 60;
  static readonly MINUTES_IN_HOUR = 60;
  static readonly HOURS_IN_DAYS = 24;
  static readonly MILLIS_IN_DAY = DateUtils.MILLIS_IN_SECOND * DateUtils.SECONDS_IN_MINUTES * DateUtils.MINUTES_IN_HOUR * DateUtils.HOURS_IN_DAYS;

  /**
   * Expresses the booking in terms of days. If the booking time is lower than a day, it
   * is automatically set to half day (0,5). Otherwise, days are computed.
   */
  static getBookingDays(dateFrom: Date, dateTo: Date): number {
    let millisDiff = Math.abs(dateFrom.getTime() - dateTo.getTime());

    if (millisDiff < DateUtils.MILLIS_IN_DAY) {
      // considerate half day, if booked for less than a day
      return 0.5;
    } else {
      // consider days between otherwise
      return Math.ceil(millisDiff / DateUtils.MILLIS_IN_DAY);
    }
  }

  static addDay(date: Date): Date {
    let newDate = new Date(date)
    newDate.setDate(date.getDate() + 1);
    return newDate;
  }

  static addHalfDay(date: Date): Date {
    let newDate = new Date(date)
    newDate.setTime(date.getTime() + 12*60*60*1000);
    return newDate;
  }
}
