import { capitaliseWord } from "./capitaliseWord";
import { isAfter, isBefore, isEqual } from "date-fns";

export function definedStatus(status: string, end_date: string) {
  const is_day_after = isAfter(new Date(end_date), new Date());
  const is_day_before = isBefore(new Date(end_date), new Date());
  const is_same_day = isEqual(new Date(end_date), new Date());
  const apiStatus = [
    "in_assessment",
    "assessment",
    "in_progress",
    "awaiting_determination",
    "awaiting_correction",
  ];
  const isMatchStatus = apiStatus.find((el) => el == status);

  return isMatchStatus && (is_day_after || is_same_day)
    ? "Consultation in progress"
    : isMatchStatus && is_day_before
      ? "Assessment in progress"
      : capitaliseWord(status?.replace(/_/g, " "));
}
