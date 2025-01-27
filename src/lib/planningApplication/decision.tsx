/* eslint-disable react/no-unescaped-entities */
import { DprContentPage, DprPlanningApplication } from "@/types";
import { capitalizeFirstLetter, slugify } from "@/util";
import { getPrimaryApplicationTypeKey } from "./type";
import { Council } from "@/config/types";
import Link from "next/link";

/**
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
                This means that the appeal was successful, and the council's
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
                This means that the appeal was unsuccessful, and the council's
                original decision has been upheld. The planned works cannot go
                ahead.
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
