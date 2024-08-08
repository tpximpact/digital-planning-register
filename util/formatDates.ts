import { format } from "date-fns";

/**
 * Used to format dates, with no timestamp
 * Turns 2024-07-05T12:05:14.224+01:00 into 05 Jul 2024
 * @param date
 * @returns
 */
export const formatDprDate = (date: string): string => {
  return format(new Date(date), "dd MMM yyyy");
};
