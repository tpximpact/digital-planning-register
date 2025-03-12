/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * Try to do all date parsing in this file
 * By default, Day.js parses and displays in local time but we want to use UTC for accuracy
 * We're also converting all dates to UTC to avoid timezone issues and keep accuracy
 *
 * There are two kinds of dates in the ODP schema
 * date YYYY-MM-DD and date-time YYYY-MM-DDTHH:MM:SSZ.
 *
 * Because of timezones, we must be careful with the methods we choose to display dates, not datetimes.
 * Without UTC the date 2024-06-12 will be returned as 2024-06-11T23:00:00.000Z when we're in GMT (UTC+1) which would
 * mean that a consultation will be displayed as ending a day earlier than it actually did in the frontend!
 *
 * We're also not displaying on the frontend any timezone information, so for accuracy we display 02 April 2024 in
 * UTC and uses <time datetime=""> to display the full date or datetime
 *
 */
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

const dateTimeFormat = "DD MMM YYYY hh:mm A";
const dateFormat = "D MMM YYYY";
const DmyFormat = "DD-MM-YYYY";

/**
 * is date in YYYY-MM-DD format
 * @param date
 * @returns
 */
export const isDate = (date: string): boolean => {
  return dayjs(date, "YYYY-MM-DD", true).isValid();
};

/**
 * is date in 2024-07-02T11:37:35.069Z format
 * @param date
 * @returns
 */
export const isDateTime = (date: string): boolean => {
  const formats = [
    "YYYY-MM-DDTHH:mm:ss.SSS[Z]",
    "YYYY-MM-DDTHH:mm:ss[Z]",
    "YYYY-MM-DDTHH:mm:ss.SSSZ",
    "YYYY-MM-DDTHH:mm:ssZ",
  ];

  for (const format of formats) {
    const parsedDate = dayjs.utc(date, format, true);
    if (parsedDate.isValid()) {
      return true;
    }
  }

  return false;
};

/**
 * 2024-07-05T12:05:14.224+01:00 > 2024-07-05T11:05:14.224Z
 *
 * Converts a date string with a time and timezone offset to a UTC date string.
 * Mostly used in the BOPS handlers to convert dateTimes to UTC.
 *
 * NB 2024-07-02T00:00:00.000+01:00 will be returned as 2024-07-01T23:00:00Z in this
 * function as thats the correct result for the conversion
 *
 *
 *
 * @param dateString
 * @returns
 */
export const convertDateTimeToUtc = (dateString: string): string => {
  return dayjs(dateString).utc().format();
};

/**
 *
 * 2024-07-02 > 02 Jul 2024
 * Formats 'YYYY-MM-DD' date strings into the Dpr "D MMM YYYY" format.
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} - The formatted date string.
 *
 */
export const formatDateToDprDate = (dateString: string): string => {
  if (!isDate(dateString)) {
    return "Invalid Date";
  }
  const date: Dayjs = dayjs.utc(dateString);
  if (!date.isValid()) {
    return "Invalid Date";
  }
  return date.format(dateFormat);
};

/**
 *
 * 2024-07-02T11:37:35.069Z > 02 Jul 2024
 * Formats UTC ISO8601 datetime strings into the Dpr "D MMM YYYY" format.
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} - The formatted date string.
 *
 */
export const formatDateTimeToDprDate = (dateString: string): string => {
  if (!isDateTime(dateString)) {
    return "Invalid Date";
  }
  const date: Dayjs = dayjs.utc(dateString);
  if (!date.isValid()) {
    return "Invalid Date";
  }
  return date.format(dateFormat);
};

/**
 *
 * 2024-07-02T11:37:35.069Z > 02 Jul 2024 11:37 AM
 * Formats UTC ISO8601 datetime strings into the Dpr "DD MMM YYYY hh:mm A" format.
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} - The formatted date string.
 *
 */
export const formatDateTimeToDprDateTime = (dateString: string): string => {
  if (!isDateTime(dateString)) {
    return "Invalid Date";
  }
  const date: Dayjs = dayjs.utc(dateString);
  if (!date.isValid()) {
    return "Invalid Date";
  }
  return date.format(dateTimeFormat);
};

/**
 *
 * 2024-07-02T11:37:35.069Z > 02-07-2024
 * Formats UTC ISO8601 datetime strings into the Dpr "DD-MM-YYYY" format.
 * Only used for documents (currently)
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} - The formatted date string.
 *
 */
export const formatDateTimeToDmyDate = (dateString: string): string => {
  if (!isDateTime(dateString)) {
    return "Invalid Date";
  }
  const date: Dayjs = dayjs.utc(dateString);
  if (!date.isValid()) {
    return "Invalid Date";
  }
  return date.format(DmyFormat);
};

/**
 * Converts Date() to "YYYY-MM-DD" format.
 * Doesn't use dayjs.
 * Used in mocks only
 * @param date
 * @returns
 */
export const formatDateToYmd = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
