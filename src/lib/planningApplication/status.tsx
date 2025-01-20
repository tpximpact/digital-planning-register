import { DprContentPage, DprPlanningApplication } from "@/types";
import { capitalizeFirstLetter, isDate, slugify } from "@/util";

import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.utc().isUTC();

/**
 * Determines the formatted status based on the provided status and end date.
 *
 * @param {string} status - The current status, which may include underscores.
 * @param {string | null} end_date - The end date of the status in YYYY-MM-DD format, or null if not applicable.
 * @returns {string} - The formatted status string.
 *
 * If `end_date` is null, the status is returned with underscores replaced by spaces and capitalized.
 * If `end_date` is provided and the status is one of the specified match statuses, the function will
 * return "Consultation in progress" if the end date is today or in the future, or "Assessment in progress"
 * if the end date is in the past. Otherwise, the status is returned with underscores replaced by spaces
 * and capitalized.
 */
export const getApplicationStatusSummary = (
  status: DprPlanningApplication["application"]["status"],
  consultationEndDate?: string,
) => {
  const isRelevantStatus = [
    "in_assessment",
    "assessment_in_progress",
    "awaiting_determination",
  ].includes(status);

  const isEndDateValid = consultationEndDate
    ? isDate(consultationEndDate)
    : false;

  if (isRelevantStatus && isEndDateValid) {
    const date: Dayjs = dayjs.utc(consultationEndDate);

    if (date.isSameOrAfter(dayjs(), "day")) {
      // if consultation is today or in the future
      return "Consultation in progress";
    } else if (date.isBefore(dayjs(), "day")) {
      // if consultation is before today
      return "Assessment in progress";
    }
  } else {
    return capitalizeFirstLetter(status?.replace(/_/g, " "));
  }
};

/**
 *  Returns positive, neutral or negative based on the status provided.
 *
 * @param {string} status - The status formatted
 * @returns {string} - Class that define the status color
 */
export function getApplicationStatusSummarySentiment(status: string) {
  const statusDefined: Record<string, string> = {
    Determined: "positive",
    "Consultation in progress": "neutral",
    "Assessment in progress": "neutral",
    Withdrawn: "negative",
  };

  return statusDefined[status] || undefined;
}
