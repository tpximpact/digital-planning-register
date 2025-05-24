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

import {
  DprApplication,
  DprContentPage,
  DprPlanningApplication,
  DprStatusSummary,
} from "@/types";
import { capitalizeFirstLetter, isDate, slugify } from "@/util";
import Link from "next/link";

import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { Council } from "@/config/types";
import { PostSubmissionApplication } from "@/types/odp-types/schemas/postSubmissionApplication";
import {
  PostSubmissionAssessment,
  PriorApprovalAssessment,
} from "@/types/odp-types/schemas/postSubmissionApplication/data/Assessment";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.utc().isUTC();

/**
 * The valid application types
 */
export const validApplicationStatusSummaries: DprStatusSummary[] = [
  "Application submitted",
  "Application returned",
  "Consultation in progress",
  "Assessment in progress",
  "Determined",
  "Withdrawn",
  "Appeal lodged",
  "Appeal validated",
  "Appeal in progress",
  "Appeal decided",
  "Unknown",
];

/**
 * The valid application types that are public and therefor on DPR
 */
export const validPublicApplicationStatusSummaries: DprStatusSummary[] = [
  "Consultation in progress",
  "Assessment in progress",
  "Determined",
  "Withdrawn",
  "Appeal lodged",
  "Appeal validated",
  "Appeal in progress",
  "Appeal decided",
];

/**
 *
 * @deprecated Use getApplicationDprStatusSummary in future when using PostSubmission schema
 * Determines the formatted status based on the provided status and consultation start/end date.
 *
 * @param {string} status - The current status, which may include underscores.
 * @param {string | null} start_date - The start date of the status in YYYY-MM-DD format, or null if not applicable.
 * @param {string | null} end_date - The end date of the status in YYYY-MM-DD format, or null if not applicable.
 * @returns {string} - The formatted status string.
 * If status is one of: "assessment_in_progress", "in_assessment", "to_be_reviewed", "awaiting_determination", "in_committee",
 *   then:
 *      - If both consultation start_date and end_date are provided and today is between them,
 *        return "Consultation in progress".
 *      - Otherwise, return "Assessment in progress".
 *
 * - If status is "closed", return "Closed".
 * - If status is "determined", return "Determined".
 * - If status is "returned", return "Returned".
 * - If status is "withdrawn", return "Application withdrawn".
 *
 * - If status is one of:
 *    "Appeal lodged", "Appeal valid", "Appeal started",
 *   return the status as-is.
 *
 * - If status is one of:
 *    "Appeal determined", "Appeal allowed", "Appeal dismissed", "Appeal split decision", "Appeal withdrawn",
 *   return "Appeal determined".
 *
 * - All others fall through and are formatted by replacing underscores with spaces and capitalizing.
 *
 */
export const getApplicationStatusSummary = (
  status: DprPlanningApplication["application"]["status"],
  start_date?: string | null,
  end_date?: string | null,
): string => {
  if (status === null || status === undefined) return "";

  const assessmentStatuses = [
    "assessment_in_progress",
    "in_assessment",
    "to_be_reviewed",
    "awaiting_determination",
    "in_committee",
  ];
  if (assessmentStatuses.includes(status)) {
    if (start_date && end_date && isDate(start_date) && isDate(end_date)) {
      const consultationStartDate: Dayjs = dayjs.utc(start_date);
      const consultationEndDate: Dayjs = dayjs.utc(end_date);
      const now: Dayjs = dayjs.utc();
      if (
        now.isSameOrAfter(consultationStartDate, "day") &&
        (now.isSame(consultationEndDate, "day") ||
          now.isBefore(consultationEndDate, "day"))
      ) {
        return "Consultation in progress";
      }
    }
    return "Assessment in progress";
  }

  const finalStatuses: Record<string, string> = {
    closed: "Closed",
    determined: "Determined",
    returned: "Returned",
    withdrawn: "Application withdrawn",
  };
  if (finalStatuses[status]) {
    return finalStatuses[status];
  }

  const appealStatuses = [
    "Appeal lodged",
    "Appeal valid",
    "Appeal started",
    "Appeal withdrawn",
  ];
  if (appealStatuses.includes(status)) {
    return status;
  }

  const appealStatusesDetermined = [
    "Appeal determined",
    "Appeal allowed",
    "Appeal dismissed",
    "Appeal split decision",
  ];
  if (appealStatusesDetermined.includes(status)) {
    return "Appeal decided";
  }

  return capitalizeFirstLetter(status?.replace(/_/g, " "));
};

/**
 *
 * Roughly determines the DPR status summary based on the provided application.
 * There are a lot of specific details missing in this function we're
 * relying on the data source to be accurate
 *
 * "Application submitted"
 * "Application returned"
 * "Consultation in progress"
 * "Assessment in progress"
 * "Determined"
 * "Withdrawn"
 * "Appeal lodged"
 * "Appeal validated"
 * "Appeal in progress"
 * "Appeal decided"
 * "Unknown"
 * @param application
 * @returns
 */
export const getApplicationDprStatusSummary = (
  application:
    | PostSubmissionApplication
    | Omit<
        DprApplication,
        "applicationStatusSummary" | "applicationDecisionSummary"
      >,
): DprStatusSummary => {
  const { stage, status } = application.data.application;

  const { submission, validation, consultation, assessment, appeal } =
    application.data;

  if (application.data.application.withdrawnAt) {
    return "Withdrawn";
  }

  if (stage === "submission" && status === "undetermined" && submission) {
    return "Application submitted";
  }

  if (stage === "validation" && status === "returned" && validation) {
    return "Application returned";
  }

  let consultationCurrentlyActive: boolean = false;
  if (consultation) {
    const consultationStartDate: Dayjs = dayjs.utc(consultation.startDate);
    const consultationEndDate: Dayjs = dayjs.utc(consultation.endDate);
    const now: Dayjs = dayjs.utc();
    consultationCurrentlyActive =
      now.isSameOrAfter(consultationStartDate, "day") &&
      now.isBefore(consultationEndDate, "day");
  }

  if (stage === "consultation" && status === "undetermined" && consultation) {
    if (consultationCurrentlyActive) {
      return "Consultation in progress";
    } else {
      return "Assessment in progress";
    }
  }

  if (stage === "assessment") {
    const hasAssessmentDecisionData =
      (assessment as PostSubmissionAssessment | PriorApprovalAssessment)
        ?.planningOfficerDecision ||
      (assessment as PostSubmissionAssessment | PriorApprovalAssessment)
        ?.committeeDecision;

    if (status === "determined" && hasAssessmentDecisionData) {
      return "Determined";
    } else {
      return "Assessment in progress";
    }
  }

  if (stage === "appeal" && appeal) {
    if (appeal.decision) {
      switch (appeal.decision) {
        case "allowed":
        case "dismissed":
        case "splitDecision":
        case "withdrawn":
          return "Appeal decided";
      }
    }

    if (appeal.lodgedDate && appeal.validatedDate && appeal.startedDate) {
      return "Appeal in progress";
    }

    if (appeal.lodgedDate && appeal.validatedDate && !appeal.startedDate) {
      return "Appeal validated";
    }

    if (appeal.lodgedDate && !appeal.validatedDate && !appeal.startedDate) {
      return "Appeal lodged";
    }
  }

  return "Unknown";
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

export const contentApplicationStatuses = (
  councilConfig?: Council,
): DprContentPage[] => {
  const council = councilConfig?.slug;
  return [
    {
      key: slugify("Council process"),
      title: "Council process",
      content: (
        <>
          <p className="govuk-body">
            These statuses apply to applications being handled by the local
            council planning authority.
          </p>
        </>
      ),
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
                  href={`/${council}/help/decisions`}
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
                  href={`/${council}/help/decisions/#${slugify("Refused")}`}
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
      content: (
        <>
          <p className="govuk-body">
            These statuses apply to applications that are going through the
            appeal process, or have gone through it. Appeals are handled by the{" "}
            <Link
              className="govuk-link"
              href="https://www.gov.uk/government/organisations/planning-inspectorate"
            >
              planning inspectorate
            </Link>
            .
          </p>
        </>
      ),
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
          title: "Appeal validated",
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
        {
          key: slugify("Appeal withdrawn"),
          title: "Appeal withdrawn",
          content: (
            <>
              <p className="govuk-body">
                The applicant has withdrawn their appeal from consideration by
                the planning inspectorate. They can lodge another appeal in
                future, if they wish.
              </p>
            </>
          ),
        },
      ],
    },
  ];
};
