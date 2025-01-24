/* eslint-disable react/no-unescaped-entities */
import { DprContentPage, DprPlanningApplication } from "@/types";
import { capitalizeFirstLetter, isDate, slugify } from "@/util";
import Link from "next/link";

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

export const contentApplicationStatuses = (): DprContentPage[] => {
  return [
    {
      key: slugify("Council process"),
      title: "Council process",
      children: [
        {
          key: slugify("Consultation in progress"),
          title: "Consultation in progress",
          content: (
            <>
              <p className="govuk-body">
                Once an application has been submitted, there are 21 days (not
                including bank holidays) where neighbours and the local
                community must be consulted. This is the statutory consultation
                period. It can go on for longer than 21 working days, but it
                cannot be any less. The council cannot make a decision until the
                statutory consultation period is over.
              </p>
              <p className="govuk-body">
                During this time and comments can be submitted for consideration
                by the planning team. Comments submitted after the statutory
                consultation period are usually considered if they are submitted
                before a decision is made.{" "}
              </p>
            </>
          ),
        },
        {
          key: slugify("Assessment in progress"),
          title: "Assessment in progress",
          content: (
            <>
              <p className="govuk-body">
                Once the consultation has been complete, planning applications
                are assessed. The application and all it&apos;s documentation is
                checked and considered. Comments are read and considered.
              </p>
              <p className="govuk-body">
                A decision notice is created containing the decision the council
                makes. The notice sometimes includes reasons for the decision,
                and responses to significant points raised by comments.
              </p>
            </>
          ),
        },
        {
          key: slugify("Determined"),
          title: "Determined",
          content: (
            <>
              <p className="govuk-body">
                A determined application has had a decision made about it, so it
                has completed its journey through the application process. The{" "}
                <a
                  href={`#${slugify("Decisions")}`}
                  className="govuk-link govuk-link--no-visited-state"
                >
                  decision
                </a>{" "}
                is published with all the supporting documentation. Decisions
                can be appealed.
              </p>
              <p className="govuk-body">
                Determined planning applications which have been{" "}
                <a
                  href={`#${slugify("Refused")}`}
                  className="govuk-link govuk-link--no-visited-state"
                >
                  refused
                </a>{" "}
                can be appealed by applicants or their agents.
              </p>
            </>
          ),
        },
        {
          key: slugify("Withdrawn"),
          title: "Withdrawn",
          content: (
            <>
              <p className="govuk-body">
                Planning applications can be withdrawn by the applicant, or
                sometimes by the council. This usually means they no longer
                intend to do the work they applied for. It can also mean they
                have decided to significantly change the proposed work, and may
                submit a new planning application at a later date.
              </p>
            </>
          ),
        },
      ],
    },
    {
      key: slugify("Appeals process"),
      title: "Appeals process",
      children: [
        {
          key: slugify("Appeal lodged"),
          title: "Appeal lodged",
          content: (
            <>
              <p className="govuk-body">
                An appeal has been lodged with the planning inspectorate. At
                this stage the appeal still needs to be checked to ensure it is
                valid, then it can be processed.
              </p>
            </>
          ),
        },
        {
          key: slugify("Appeal validated"),
          title: "Appeal decision",
          content: (
            <>
              <p className="govuk-body">
                The appeal has been confirmed to be valid. This appeal can now
                be examined in detail by the planning inspectorate, but progress
                has not yet begun.
              </p>
            </>
          ),
        },
        {
          key: slugify("Appeal in progress"),
          title: "Appeal in progress",
          content: (
            <>
              <p className="govuk-body">
                The planning inspectorate is considering the appeal.{" "}
                <Link
                  className="govuk-link"
                  href="https://www.gov.uk/guidance/appeals-average-timescales-for-arranging-inquiries-and-hearings"
                >
                  There is guidance available on how long this process is likely
                  to take.
                </Link>
              </p>
            </>
          ),
        },
        {
          key: slugify("Appeal decided"),
          title: "Appeal decided",
          content: (
            <>
              <p className="govuk-body">
                The planning inspectorate has published their decision about the
                appeal. This decision is final.
              </p>
            </>
          ),
        },
      ],
    },
  ];
};
