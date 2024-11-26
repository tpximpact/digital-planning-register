import { isAfter, isBefore, isEqual } from "date-fns";
import { DprContentPage, DprPlanningApplication } from "@/types";
import { capitalizeFirstLetter, slugify } from "@/util";

/**
 * Determines the formatted status based on the provided status and end date.
 *
 * @param {string} status - The current status, which may include underscores.
 * @param {string | null} end_date - The end date of the status in ISO format, or null if not applicable.
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
  end_date?: string,
) => {
  const relevantStatus = [
    "in_assessment",
    "assessment_in_progress",
    "awaiting_determination",
  ];

  if (!end_date || !relevantStatus.includes(status)) {
    return capitalizeFirstLetter(status?.replace(/_/g, " "));
  }

  if (relevantStatus.includes(status)) {
    const endDate = new Date(end_date);
    const today = new Date();
    if (isAfter(endDate, today) || isEqual(endDate, today)) {
      return "Consultation in progress";
    } else if (isBefore(endDate, today)) {
      return "Assessment in progress";
    }
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

export const contentApplicationStatuses: DprContentPage[] = [
  {
    key: slugify("Consultation in progress"),
    title: "Consultation in progress",
    content: (
      <>
        <p className="govuk-body">
          Once an application has been submitted, there are 21 days (not
          including bank holidays) where neighbours and the local community must
          be consulted. This is the statutory consultation period. It can go on
          for longer than 21 working days, but it cannot be any less. The
          council cannot make a decision until the statutory consultation period
          is over.
        </p>
        <p className="govuk-body">
          During this time and comments can be submitted for consideration by
          the planning team. Comments submitted after the statutory consultation
          period are usually considered if they are submitted before a decision
          is made.{" "}
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
          Once the consultation has been complete, planning applications are
          assessed. The application and all it&apos;s documentation is checked
          and considered. Comments are read and considered.
        </p>
        <p className="govuk-body">
          A decision notice is created containing the decision the council
          makes. The notice sometimes includes reasons for the decision, and
          responses to significant points raised by comments.
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
          A determined application has had a decision made about it, so it has
          completed its journey through the application process. The{" "}
          <a
            href={`#${slugify("Decisions")}`}
            className="govuk-link govuk-link--no-visited-state"
          >
            decision
          </a>{" "}
          is published with all the supporting documentation. Decisions can be
          appealed.
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
          Planning applications can be withdrawn by the applicant, or sometimes
          by the council. This usually means they no longer intend to do the
          work they applied for. It can also mean they have decided to
          significantly change the proposed work, and may submit a new planning
          application at a later date.
        </p>
      </>
    ),
  },
];
