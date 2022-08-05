import { Constants } from "./Constants";
import moment from "moment";
import * as _ from "lodash";

export const DateUtils = {
  convertUTCTs2LocalDate,
  convertUTCTs2Date,
  getUTCTsAtStartDate,
  getUTCTsAtEndDate,
  getUTCTsAtCurrentHour,
  getUTCTsAtStartDateWithTimeZone,
  formatDate,
  getTimeDiff,
  convertUTCTs2LocalTs,
  convertLocalTs2UTCTs,
  getPreviousDateByDuration,
  getLocalTimeZone,
  getDateRangeByUnit,
  getGMTString,
};

/**
 * Convert timestamp from UTC to local date.
 *
 * @param timestamp number milliseconds
 *
 */
function convertUTCTs2LocalDate(timestamp: number) {
  return new Date(timestamp);
}

/**
 * Convert UTC timestamp to date
 *
 * @param timestamp
 */
function convertUTCTs2Date(timestamp: number) {
  const newDate = new Date(timestamp);
  const utcDate = newDate.toUTCString();

  return Date.parse(utcDate);
}

/**
 * Get UTC timestamp at start date 00:00:00
 *
 * @param date
 *
 */
function getUTCTsAtStartDate(date: Date) {
  const newDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
    0
  );

  return convertUTCTs2Date(newDate.getTime());
}

/**
 * Get UTC timestamp at end date 25:59:59.999
 *
 * @param date
 *
 */
function getUTCTsAtEndDate(date: Date) {
  const newDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999
  );
  return convertUTCTs2Date(newDate.getTime());
}

/**
 * Get UTC timestamp at end date 25:59:59.999
 *
 * @param date
 *
 */
function getUTCTsAtCurrentHour(date: Date) {
  const now = new Date();

  const newDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    now.getHours(),
    0,
    0,
    0
  );
  return convertUTCTs2Date(newDate.getTime());
}

/**
 * Get UTC timestamp at start date + timezone
 *
 * @param date
 *
 */
function getUTCTsAtStartDateWithTimeZone(date: Date) {
  const newDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    getLocalTimeZone(),
    0,
    0,
    0
  );

  return convertUTCTs2Date(newDate.getTime());
}
/**
 * Format date
 *
 * @param timeStamp
 * @param fm
 */
function formatDate(timeStamp: number, fm: string) {
  if (timeStamp) {
    const newDate = new Date(timeStamp);
    const d = newDate;

    switch (fm) {
      // case 'relative-time':
      //   return moment(d).format('D/MM/YYYY');
      case "absolute-time":
        return moment(d).format("D MMM YYYY"); // 14 Jan 2020
      case "time-only":
        return moment(d).format("h:mm A"); // 2:00 PM
      case "24-hours-clock":
        return moment(d).format("H:mm"); // 14:00
      case "time_seconds":
        return moment(d).format("H:mm:ss"); // 10:28:41
      case "m-d-y":
        return moment(d).format("D MMM YYYY"); // 14 Jan 2020
      case "weekday":
        return moment(d).format("ddd, D MMM YYYY"); // Fri, 6 Jan 2020
      case "timezone":
        return moment(d).format("D MMM YYYY, h:mm A Z"); // 6 Jan 2020, 4:00 PM EDT'
      case "date+time":
        return moment(d).format("D MMM YYYY, h:mm A"); // 14 Jan 2020, 2:00 PM
      case "date+time-edit":
        return moment(d).format("DD/MM/YYYY h:mm:ss"); // 23/02/2020 2:00:03 PM
      case "date-edit":
        return moment(d).format("DD/MM/YYYY"); // 02/23/2020
      case "date-chart":
        return moment(d).format("YYYY-MM-DD"); // 2020-03-22
      case "date-time-chart":
        return moment(d).format("YYYY-MM-DD HH:mm:ss"); // 2020-03-22
      case "month-year":
        return moment(d).format("MMM YYYY"); // Jan 2020
      case "date":
        return moment(d).format("D"); // 23
      case "date-for-name":
        return moment(d).format("DDMMYYYYhhmmss"); // 26082021233500
      default:
        return moment(d).format("D MMM YYYY");
    }
  } else {
    return Constants.EMPTY_VALUE_DEFAULT;
  }
}

/**
 * Get time diff between 2 timestamps
 *
 * @param t1
 * @param t2
 * @param unit unit of Time
 */
function getTimeDiff(
  t1: number,
  t2: number,
  unit: moment.unitOfTime.DurationConstructor = "days"
) {
  if (!t1 || !t2) return Constants.EMPTY_VALUE_DEFAULT;

  // include the start date
  return moment(new Date(t2)).diff(moment(new Date(t1)), unit) + 1;
}

/**
 * DruidTime is UTC timestamp so we need convert it to local timestamp in UI
 *
 * @param {number} timestamp Ex: From 00:00:00 UTC
 * @return {*}  {number}         To   00:00:00 GMT+7
 */
function convertUTCTs2LocalTs(timestamp: number): number {
  const timeZoneOffset = new Date().getTimezoneOffset();
  return timestamp + timeZoneOffset * 60000;
}

/**
 * Convert timestamp from local to UTC
 *
 * @param {number} timestamp Ex: From 00:00:00 GMT+7
 * @return {*}  {number}         To   00:00:00 UTC
 */
function convertLocalTs2UTCTs(timestamp: number): number {
  const timeZoneOffset = new Date().getTimezoneOffset();
  return timestamp - timeZoneOffset * 60000;
}

/**
 * Get local time zone
 */
function getLocalTimeZone() {
  return -new Date().getTimezoneOffset() / 60;
}

/**
 * Get the previous date with duration including start date (+1)
 *
 * @param endDate
 * @param duration
 * @param unit
 *
 * @return {Date} previous date by duration
 */
function getPreviousDateByDuration(
  endDate: Date,
  duration: number = 1,
  unit: string = "days"
) {
  const startDate = _.cloneDeep(
    new Date(DateUtils.getUTCTsAtStartDate(endDate))
  );
  switch (unit) {
    case "days":
      return moment(startDate)
        .add(-duration + 1, unit)
        .toDate();
    case "months":
      return moment(startDate).add(-duration, unit).add(1, "days").toDate();
    case "years":
      return moment(startDate).add(-duration, unit).add(1, "days").toDate();
  }
}

/**
 * Get start/end date of the selected date by unit (week or month).
 *
 * @param selectedTs selected date in timestamp format
 * @param unit unit of date range
 *
 * @returns {object} {startRange, endRange(, startMonth, endMonth)}
 */
function getDateRangeByUnit(
  selectedTs: number,
  unit: "week" | "month" = "week"
) {
  if (!selectedTs) {
    selectedTs = new Date().getTime();
  }

  const selectedDate = new Date(selectedTs);

  switch (unit) {
    case "month":
      const startMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
      );
      const endMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0
      );

      const startRange = getWeekRangeOfDate(startMonth.getTime())?.startRange;
      return {
        startRange,
        endRange: startRange + (7 * 6 - 1) * 24 * 60 * 60 * 1000,
        startMonth,
        endMonth,
      };
    default:
      return getWeekRangeOfDate(selectedTs);
  }
}

/**
 *
 * Get start/end date of the week from selected date.
 *
 * @param selectedTs selected date in timestamp format
 *
 * @returns {object} {startWeek, endWeek} start/end date of the week from selected date
 */
function getWeekRangeOfDate(selectedTs: number) {
  if (!selectedTs) {
    selectedTs = new Date().getTime();
  }

  const selectedDate = new Date(selectedTs);

  const selectedDateInWeekday = selectedDate.getDay();
  const startWeek =
    selectedDate.getTime() - selectedDateInWeekday * 24 * 60 * 60 * 1000;
  const endWeek = startWeek + 6 * 24 * 60 * 60 * 1000;

  return {
    startRange: startWeek,
    endRange: endWeek,
  };
}

/**
 *
 * Get GMT time.
 *
 * @param null
 *
 * @returns GMT time
 */
function getGMTString() {
  const gmt = getLocalTimeZone();
  if (gmt < 0) {
    return "GMT-" + gmt;
  } else {
    return "GMT+" + gmt;
  }
}
