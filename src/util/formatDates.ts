import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";

/**
 * Formats a date string into "dd MMM yyyy" format.
 * Turns "2024-07-05T12:05:14.224+01:00" into "05 Jul 2024".
 *
 * @param {string} date - The date string to be formatted.
 * @returns {string} - The formatted date string.
 *
 * @example
 * // Returns "05 Jul 2024"
 * formatDprDate("2024-07-05T12:05:14.224+01:00");
 */
export const formatDprDate = (date: string): string => {
  try {
    const parsedDate = new Date(date);
    const zonedDate = toZonedTime(parsedDate, "UTC");
    return format(zonedDate, "dd MMM yyyy");
  } catch (error) {
    console.error("Invalid date string:", date);
    return "Invalid Date";
  }
};

/**
 * Formats an ISO date string into "dd MMM yyyy hh:mm aa" format.
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
  try {
    const date = parseISO(isoDateString);
    const zonedDate = toZonedTime(date, "UTC");
    return format(zonedDate, "dd MMM yyyy hh:mm aa");
  } catch (error) {
    console.error("Invalid date string:", isoDateString);
    return "Invalid Date";
  }
};
