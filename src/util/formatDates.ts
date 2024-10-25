// import { format, parseISO } from "date-fns";
// import { toZonedTime } from "date-fns-tz";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";

// Extend dayjs with the plugins
dayjs.extend(utc);
dayjs.extend(customParseFormat);

// TODO all dates should be ISO format before formatting

/**
 * Formats any date string into "dd MMM yyyy" format.
 * Turns "2024-07-02T11:37:35.069Z" into "02 Jul 2024".
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} - The formatted date string.
 *
 * @example
 * // Returns "02 Jul 2024"
 * formatDateString("2024-07-02T11:37:35.069Z");
 */
export const formatDprDate = (dateString: string): string => {
  const date = dayjs(dateString);
  if (!date.isValid()) {
    return "Invalid Date";
  }
  return date.format("DD MMM YYYY");
};

/**
 * Formats an ISO date string into "dd MMM yyyy hh:mm aa" format in UTC.
 * Turns "2024-07-02T11:37:35.069Z" into "02 Jul 2024 11:37 AM".
 *
 * @param {string} isoDateString - The ISO date string to be formatted.
 * @returns {string} - The formatted date string.
 *
 * @example
 * // Returns "02 Jul 2024 11:37 AM"
 * formatIsoDateTime("2024-07-02T11:37:35.069Z");
 */
export const formatIsoDateTime = (isoDateString: string): string => {
  const date = dayjs.utc(isoDateString);
  if (!date.isValid()) {
    return "Invalid Date";
  }
  return date.format("DD MMM YYYY hh:mm A");
};
