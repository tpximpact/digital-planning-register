/* eslint-disable react/no-unescaped-entities */

import { getAppConfig } from "@/config";
import { DprContentPage } from "@/types";
import { slugify } from "@/util";
import Link from "next/link";

export const contentPlanningProcess = (council: string): DprContentPage[] => {
  const appConfig = getAppConfig(council);
  const localPlanLink =
    appConfig?.council?.pageContent?.help?.planning_process
      ?.council_local_plan_link;

  const materialConsiderationsLink =
    appConfig?.council?.pageContent
      ?.council_reference_submit_comment_pre_submission
      ?.what_happens_to_your_comments_link;
  return [
    {
      key: slugify("Submitting an application"),
      title: "Submitting an application",
      content: (
        <>
          <p className="govuk-body">
            An application can be submitted by the person who wants to apply
            (the applicant) or by a professional with experience of planning
            applications (an agent) acting on the applicant's behalf.
          </p>
          <p className="govuk-body">
            When an application is submitted through a service like Planning
            Portal or PlanX, it is passed directly to the local planning
            authority to be worked on.
          </p>
        </>
      ),
    },
    {
      key: slugify("Application validation"),
      title: "Application validation",
      content: (
        <>
          <p className="govuk-body">
            Before an application can be assessed, the planning authority first
            needs to ensure it is valid. This means making sure it has included
            all the necessary information and documents.
          </p>
          <p className="govuk-body">
            If an application is missing information, planning officers may need
            to contact the applicant, which will delay the validation process.
          </p>
          <p className="govuk-body">
            Once an application is validated, it is published on the planning
            register.
          </p>
        </>
      ),
    },
    {
      key: slugify("Public consultation"),
      title: "Public consultation",
      content: (
        <>
          <p className="govuk-body">
            The public must be consulted for some applications. For example,
            people may need to be notified about changes proposed to a
            neighbouring building.
          </p>
          <p className="govuk-body">
            For large developments like shopping centres or housing estates, the
            local community must be informed and given the opportunity to
            support or object to the proposed work.
          </p>
          <p className="govuk-body">
            Consultations have to go on for at least 21 days, excluding bank
            holidays and public holidays. The council must wait until the
            consultation period ends before they make their decision.
          </p>
          <p className="govuk-body">
            Applicants can make changes to their application in response to
            comments that are published, to address any issues raised.
          </p>
          <p className="govuk-body">
            Applications that don't need a public consultation will be assessed
            immediately.{" "}
          </p>
        </>
      ),
    },
    {
      key: slugify("Application Assessment"),
      title: "Application Assessment",
      content: (
        <>
          <p className="govuk-body">
            An application is assessed by a planning case officer. They check
            that the application meets all relevant policies, which are set out
            in the council's{" "}
            {localPlanLink ? (
              <Link className="govuk-link" href={localPlanLink} target="_blank">
                Local Plan
              </Link>
            ) : (
              <span>Local Plan</span>
            )}
          </p>
          <p className="govuk-body">
            If the application had a public consultation, they will also review
            all the comments they received. They must consider all comments
            which are related to{" "}
            {materialConsiderationsLink ? (
              <Link
                className="govuk-link"
                href={materialConsiderationsLink}
                target="_blank"
              >
                material considerations
              </Link>
            ) : (
              <span>material considerations</span>
            )}
            . The case officer may also consult with experts, such as specialist
            officers within the council and relevant government bodies.
          </p>
          <p className="govuk-body">
            The council may contact the applicant and suggest changes to the
            application to meet the council's policies. This will delay the
            assessment process.
          </p>
          <p className="govuk-body">
            All decisions are reviewed by supervising members of the planning
            office, so no one person can make a decision alone. Sometimes a
            planning application will need to be decided by a planning committee
            made up of elected councillors. They will make the final decision
            after the application has been assessed by an officer.
          </p>
        </>
      ),
    },
    {
      key: slugify("Decisions"),
      title: "Decisions",
      content: (
        <>
          <p className="govuk-body">
            When a decision is made a decision notice is published which
            contains all the information about the assessment of the
            application. The decision notice will explain why an application was
            granted or refused, and if there are any special considerations or
            measures. If a consultation was done, this decision notice includes
            responses to all relevant points raised by comments.
          </p>
        </>
      ),
    },
    {
      key: slugify("Appeals"),
      title: "Appeals",
      content: (
        <>
          <p className="govuk-body">
            If an applicant or an affected community do not agree with the
            council's decision on a planning application, they can register an
            appeal with the planning inspectorate.
          </p>
          <p className="govuk-body">
            The planning inspectorate will check that the council has followed
            due process, taken everything into account that they should have,
            and no corruption or other illegal activity has occurred.
          </p>
          <p className="govuk-body">
            Once the planning inspectorate has completed their process, the
            council's original decision will either be repealed or upheld. The
            planning inspectorate's decision is final.
          </p>
        </>
      ),
    },
  ];
};
