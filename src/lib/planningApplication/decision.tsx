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
  DprDecisionSummary,
  DprPlanningApplication,
} from "@/types";
import { capitalizeFirstLetter, slugify } from "@/util";
import { getPrimaryApplicationTypeKey } from "./type";
import { Council } from "@/config/types";
import Link from "next/link";
import {
  PostSubmissionAssessment,
  PriorApprovalAssessmentBase,
} from "@/types/odp-types/schemas/postSubmissionApplication/data/Assessment";
import { PostSubmissionApplication } from "@/types/odp-types/schemas/postSubmissionApplication";

/**
 * @deprecated Use getApplicationDprDecisionSummary in future when using PostSubmission schema
 * Returns a formatted decision string based on the application type.
 *
 * For "prior_approval" application types, it returns a specific message
 * based on the decision. For other application types, it capitalizes the decision.
 *
 * @param {string} decision - The decision string to be formatted.
 * @param {string} application_type - The type of the application.
 * @returns {string} - The formatted decision string.
 */
export const getApplicationDecisionSummary = (
  applicationType: DprPlanningApplication["applicationType"],
  decision?: string,
): string | undefined => {
  if (!decision) {
    return undefined;
  }

  const applicationPrimaryTypeKey =
    getPrimaryApplicationTypeKey(applicationType);

  if (applicationPrimaryTypeKey === "pa") {
    const priorApprovalMap: Record<string, string> = {
      granted: "Prior approval required and approved",
      not_required: "Prior approval not required",
      refused: "Prior approval required and refused",
    };
    return priorApprovalMap[decision] || capitalizeFirstLetter(decision);
  } else {
    return capitalizeFirstLetter(decision);
  }
};

/**
 *  Returns positive, neutral or negative based on the decision provided.
 *
 * @param {string} status - The status formatted
 * @returns {string} - Class that define the status color
 */
export function getApplicationDecisionSummarySentiment(status: string) {
  const decisionDefined: Record<string, string> = {
    Granted: "positive",
    "Prior approval required and approved": "positive",
    "Prior approval not required": "positive",
    "Prior approval required and refused": "negative",
    Refused: "negative",
  };

  return decisionDefined[status] || undefined;
}

/**
 *
 *
 * Determines the decision summary for a given application.
 * replaces getApplicationDecisionSummary
 *
 * For most applications this will return
 * Granted
 * Refused
 *
 * If prior approval is required we return
 * Prior approval required and approved
 * Prior approval not required
 * Prior approval required and refused
 *
 * If priorApprovalRequired is not there:
 * Granted
 * Refused
 *
 * If priorApprovalRequired is true:
 * councilDecision: granted -> Prior approval required and approved
 * councilDecision: refused -> Prior approval required and refused
 *
 * If priorApprovalRequired is false:
 * councilDecision: granted -> Prior approval not required
 * councilDecision: refused -> Prior approval not required
 *
 *
 * @param application
 * @returns  DprDecisionSummary | undefined
 */
export const getApplicationDprDecisionSummary = (
  application:
    | PostSubmissionApplication
    | Omit<
        DprApplication,
        "applicationStatusSummary" | "applicationDecisionSummary"
      >,
): DprDecisionSummary | undefined => {
  if (!application.data.assessment) {
    return undefined;
  }
  const assessment = application.data.assessment as
    | PostSubmissionAssessment
    | PriorApprovalAssessmentBase;

  const decision = assessment?.councilDecision || assessment?.committeeDecision;

  if (!decision) {
    return undefined;
  }

  const priorApprovalRequired = (assessment as PriorApprovalAssessmentBase)
    ?.priorApprovalRequired;

  if (priorApprovalRequired === undefined) {
    return capitalizeFirstLetter(decision) as DprDecisionSummary;
  }

  if (priorApprovalRequired) {
    return `Prior approval required and ${
      decision === "granted" ? "approved" : "refused"
    }`;
  }

  return "Prior approval not required";
};

export const contentDecisions = (councilConfig?: Council): DprContentPage[] => {
  return [
    {
      key: slugify("Council decisions"),
      title: "Council decisions",
      content: (
        <>
          <p className="govuk-body">
            These are the possible outcomes for a planning application when it
            is assessed by the local council planning authority. Unless these
            decisions are appealed, they are final.
          </p>
        </>
      ),
      children: [
        {
          key: slugify("Granted"),
          title: "Granted",
          content: (
            <>
              {" "}
              <p className="govuk-body">
                Planning applications which have been granted are given
                permission to go ahead. The work must begin within three years
                of approval, unless special circumstances apply. If the work is
                not started within three years, another application would need
                to be submitted.
              </p>
              <p className="govuk-body">
                Granted permissions can be conditional on certain criteria being
                met. These will be published in the decision notice for the
                application.
              </p>
            </>
          ),
        },
        {
          key: slugify("Refused"),
          title: "Refused",
          content: (
            <>
              {" "}
              <p className="govuk-body">
                Refused planning applications do not have permission to go
                ahead. The applicant is not allowed to perform the work they
                applied to do. The reasons for the rejection will be included in
                the decision notice for the application.
              </p>
              <p className="govuk-body">
                Refused planning applications can be appealed by applicants or
                their agents.
              </p>
            </>
          ),
        },
        {
          key: slugify("Prior approval required and approved"),
          title: "Prior approval required and approved",
          content: (
            <>
              <p className="govuk-body">
                When a{" "}
                <a
                  href={`/${councilConfig?.slug}/help/application-types#prior-approval`}
                >
                  prior approval
                </a>{" "}
                application has been examined, it was found that the proposal
                requires prior approval, and prior approval has been granted.
              </p>
              <p className="govuk-body">
                This means that the work proposed can go ahead, and does not
                require planning permission.
              </p>
            </>
          ),
        },
        {
          key: slugify("Prior approval not required"),
          title: "Prior approval not required",
          content: (
            <>
              <p className="govuk-body">
                When a{" "}
                <a
                  href={`/${councilConfig?.slug}/help/application-types#prior-approval`}
                >
                  prior approval
                </a>{" "}
                application has been examined, it was found that the proposal
                does not require prior approval.
              </p>
              <p className="govuk-body">
                This means that the works can go ahead without prior approval or
                planning permission.
              </p>
            </>
          ),
        },
        {
          key: slugify("Prior approval required and refused"),
          title: "Prior approval required and refused",
          content: (
            <>
              {" "}
              <p className="govuk-body">
                When a{" "}
                <a
                  href={`/${councilConfig?.slug}/help/application-types#prior-approval`}
                >
                  prior approval
                </a>{" "}
                application has been examined, it was found that the proposal
                requires prior approval, and prior approval has been refused.
              </p>
              <p className="govuk-body">
                This means that the work proposed cannot go ahead without
                submitting an application for planning permission.
              </p>
            </>
          ),
        },
      ],
    },
    {
      key: slugify("Appeal decisions"),
      title: "Appeal decisions",
      content: (
        <>
          <p className="govuk-body">
            These are the possible outcomes for applications that go through the
            appeal process. Only refused planning applications, and certificates
            of lawful development, can be appealed.
          </p>{" "}
          <p className="govuk-body">
            This is handled by the{" "}
            <Link
              className="govuk-link"
              href="https://www.gov.uk/government/organisations/planning-inspectorate"
            >
              planning inspectorate
            </Link>
            . These decisions are final.
          </p>
        </>
      ),
      children: [
        {
          key: slugify("Allowed"),
          title: "Allowed",
          content: (
            <>
              <p className="govuk-body">
                This means that the appeal was successful, and the council&#39;s
                original decision has been overturned. The planned works can now
                go ahead.
              </p>
            </>
          ),
        },
        {
          key: slugify("Dismissed"),
          title: "Dismissed",
          content: (
            <>
              <p className="govuk-body">
                This means that the appeal was unsuccessful, and the
                council&#39;s original decision has been upheld. The planned
                works cannot go ahead.
              </p>
            </>
          ),
        },
        {
          key: slugify("Split decision"),
          title: "Split decision",
          content: (
            <>
              <p className="govuk-body">
                This means that part of the appeal has been allowed, and part of
                the appeal has been dismissed. Some of the application has been
                given permission to go ahead, but not all of it. To find out
                more, you will need to explore the appeal documents.
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
                The applicant has withdrawn their appeal. The council decision
                still stands, and the planned works cannot go ahead.
              </p>
            </>
          ),
        },
      ],
    },
  ];
};
