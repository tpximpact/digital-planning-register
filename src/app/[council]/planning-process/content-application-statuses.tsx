import { PageContent } from "./page";

/**
 * Content for the planning process page
 */
export const contentApplicationStatuses: PageContent[] = [
  {
    key: "consultation-in-progress",
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
    key: "assessment-in-progress",
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
    key: "determined",
    title: "Determined",
    content: (
      <>
        <p className="govuk-body">
          A determined appliction has had a decision made about it, so it has
          completed its journey through the appliction process. The{" "}
          <a
            href="#decisions"
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
            href="#refused"
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
    key: "withdrawn",
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
