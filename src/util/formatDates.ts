import { format } from "date-fns";

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
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "Invalid Date";
  }
  return format(parsedDate, "dd MMM yyyy");
};

/**
 * Formats a date string into "dd MMM yyyy hh:mm aa" format.
 * Turns "2024-07-05T12:05:14.224+01:00" into "05 Jul 2024 12:05 PM".
 *
 * @param {string} date - The date string to be formatted.
 * @returns {string} - The formatted date and time string.
 *
 * @example
 * // Returns "05 Jul 2024 12:05 PM"
 * formatDprDateTime("2024-07-05T12:05:14.224+01:00");
 */
export const formatDprDateTime = (date: string): string => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "Invalid Date";
  }
  return format(parsedDate, "dd MMM yyyy hh:mm aa");
};
