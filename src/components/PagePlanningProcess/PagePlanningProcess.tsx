import { BackLink } from "@/components/button";
import "./PagePlanningProcess.scss";

export type PageContent = {
  key: string;
  title: string;
  content: JSX.Element;
  children?: PageContent[];
  /**
   * Items with 'linked' set to true are linked to from the application details page, If this changes we can get rid of the linked field
   */
  linked?: boolean;
};

export interface PagePlanningProcessProps {}

export const PagePlanningProcess = ({}: PagePlanningProcessProps) => {
  return (
    <>
      <BackLink />
      <div className="govuk-main-wrapper">
        <h1 className="govuk-heading-xl">
          Help using the Digital Planning Register
        </h1>
        <div className="govuk-grid-row">
          <nav
            className="govuk-grid-column-one-third-from-desktop contents-bar"
            aria-label="Table of contents"
          >
            <h2 className="govuk-heading-l" id="contents-title">
              Contents
            </h2>

            <ul role="list" aria-labelledby="contents-title">
              <li>
                <div className="contents-bar__list-heading">
                  <a href="#application-statuses">Application statuses</a>
                </div>
                <ul role="list">
                  {contentApplicationStatuses.map((type) => (
                    <li key={type.key}>
                      <div className="contents-bar__sub-list">
                        <a href={`#${type.key}`}>{type.title}</a>
                      </div>
                      {type.children && (
                        <ul role="list">
                          {type.children.map((childType) => (
                            <li key={childType.key}>
                              <div className="contents-bar__sub-list contents-bar__sub-sub-list">
                                <a href={`#${childType.key}`}>
                                  {childType.title}
                                </a>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </li>

              <li>
                <div className="contents-bar__list-heading">
                  <a href="#important-dates">Important dates</a>
                </div>
                <ul role="list">
                  <li>
                    <div className="contents-bar__sub-list">
                      <a href="#received-date">Received date</a>
                    </div>
                  </li>
                  <li>
                    <div className="contents-bar__sub-list">
                      <a href="#validated-date">Valid from date</a>
                    </div>
                  </li>
                  <li>
                    <div className="contents-bar__sub-list">
                      <a href="#published-date">Published date</a>
                    </div>
                  </li>
                  <li>
                    <div className="contents-bar__sub-list">
                      <a href="#consultation-end-date">Consultation end date</a>
                    </div>
                  </li>
                  <li>
                    <div className="contents-bar__sub-list">
                      <a href="#decision-date">Decision date</a>
                    </div>
                  </li>
                </ul>
              </li>

              <li>
                <div className="contents-bar__list-heading">
                  <a href="#decisions">Decisions</a>
                </div>
                <ul role="list">
                  {contentDecisions.map((type) => (
                    <li key={type.key}>
                      <div className="contents-bar__sub-list">
                        <a href={`#${type.key}`}>{type.title}</a>
                      </div>
                      {type.children && (
                        <ul role="list">
                          {type.children.map((childType) => (
                            <li key={childType.key}>
                              <div className="contents-bar__sub-list contents-bar__sub-sub-list">
                                <a href={`#${childType.key}`}>
                                  {childType.title}
                                </a>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </li>

              <li>
                <div className="contents-bar__list-heading">
                  <a href="#application-types">Application types</a>
                </div>
                <ul role="list">
                  {contentApplicationTypes.map((type) => (
                    <li key={type.key}>
                      <div className="contents-bar__sub-list">
                        <a href={`#${type.key}`}>{type.title}</a>
                      </div>
                      {type.children && (
                        <ul role="list">
                          {type.children.map((childType) => (
                            <li key={childType.key}>
                              <div className="contents-bar__sub-list contents-bar__sub-sub-list">
                                <a href={`#${childType.key}`}>
                                  {childType.title}
                                </a>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>

          <div className="govuk-grid-column-two-thirds-from-desktop">
            <h2 className="govuk-heading-l" id="application-statuses">
              Application statuses
            </h2>

            {contentApplicationStatuses.map((type) => (
              <>
                <h3 key={type.key} className="govuk-heading-m" id={type.key}>
                  {type.title}
                </h3>
                {type.content}
                {type.children && (
                  <>
                    {type.children.map((type) => (
                      <>
                        <h4
                          className="govuk-heading-s"
                          key={type.key}
                          id={type.key}
                        >
                          {type.title}
                        </h4>

                        {type.content}
                      </>
                    ))}
                  </>
                )}
              </>
            ))}

            <h2 className="govuk-heading-l" id="important-dates">
              Important dates
            </h2>
            <h3 className="govuk-heading-m" id="received-date">
              Received date
            </h3>
            <p className="govuk-body">
              This is the date that the application is received by the council.
              It may not be the date it was sent, if there have been delays in
              the submission process.
            </p>

            <h3 className="govuk-heading-m" id="validated-date">
              Valid from date
            </h3>
            <p className="govuk-body">
              This is the date that the application is considered a valid
              application. Usually this will be the same as the received date,
              but sometimes applications are submitted incorrectly, and need
              correcting to be valid. This is the date that processing the
              application officially begins.
            </p>

            <h3 className="govuk-heading-m" id="published-date">
              Published date
            </h3>
            <p className="govuk-body">
              This is the date the application is registered by the council and
              published on the digital planning register. It may be different
              from the date the application is valid from, as it can take time
              to put a valid application online.
            </p>

            <h3 className="govuk-heading-m" id="consultation-end-date">
              Consultation end date
            </h3>
            <p className="govuk-body">
              This is the date that the statutory consultation will end for the
              application.
            </p>
            <p className="govuk-body">
              Once an application has been submitted, there are 21 working days
              where neighbours and the local community must be consulted. This
              is the statutory consultation period. It can go on for longer than
              21 working days, but it cannot be any less.
            </p>
            <p className="govuk-body">
              During this time, comments can be submitted for consideration by
              the planning team. Some councils allow comments to be submitted
              until a decision has been made, but they all must accept comments
              during the consultation.
            </p>

            <h3 className="govuk-heading-m" id="decision-date">
              Decision date
            </h3>
            <p className="govuk-body">
              The date the council made a formal decision to grant or refuse the
              planning application.
            </p>

            <h2 className="govuk-heading-l" id="decisions">
              Decisions
            </h2>

            {contentDecisions.map((type) => (
              <>
                <h3 key={type.key} className="govuk-heading-m" id={type.key}>
                  {type.title}
                </h3>
                {type.content}
                {type.children && (
                  <>
                    {type.children.map((type) => (
                      <>
                        <h4
                          className="govuk-heading-s"
                          key={type.key}
                          id={type.key}
                        >
                          {type.title}
                        </h4>

                        {type.content}
                      </>
                    ))}
                  </>
                )}
              </>
            ))}

            <h2 className="govuk-heading-l" id="application-types">
              Application types
            </h2>

            {contentApplicationTypes.map((type) => (
              <>
                <h3 key={type.key} className="govuk-heading-m" id={type.key}>
                  {type.title}
                </h3>
                {type.content}
                {type.children && (
                  <>
                    {type.children.map((type) => (
                      <>
                        <h4
                          className="govuk-heading-s"
                          key={type.key}
                          id={type.key}
                        >
                          {type.title}
                        </h4>

                        {type.content}
                      </>
                    ))}
                  </>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

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

/**
 * Content for the planning process page
 */
export const contentDecisions: PageContent[] = [
  {
    key: "granted",
    title: "Granted",
    content: (
      <>
        <p className="govuk-body">
          Planning applications which have been granted are given permission to
          go ahead. The work must begin within three years of approval, unless
          special circumstances apply. If the work is not started within three
          years, another application would need to be submitted.
        </p>
        <p className="govuk-body">
          Granted permissions can be conditional on certain criteria being met.
          These will be published in the decision notice for the application.
        </p>
      </>
    ),
  },
  {
    key: "refused",
    title: "Refused",
    content: (
      <>
        <p className="govuk-body">
          Refused planning applications do not have permission to go ahead. The
          applicant is not allowed to perform the work they applied to do. The
          reasons for the rejection will be included in the decision notice for
          the application.
        </p>
        <p className="govuk-body">
          Refused planning applications can be appealed by applicants or their
          agents.
        </p>
      </>
    ),
  },
  {
    key: "prior-approved",
    title: "Prior approval required and approved",
    content: (
      <>
        <p className="govuk-body">
          When a{" "}
          <a
            href="#prior_approval"
            className="govuk-link govuk-link--no-visited-state"
          >
            prior approval
          </a>{" "}
          application has been examined, it was found that the proposal requires
          prior approval to go ahead, and prior approval has been granted.
        </p>
        <p className="govuk-body">
          This means that the work proposed can go ahead, and does not require
          planning permission.
        </p>
      </>
    ),
  },
  {
    key: "prior-approval-not-required",
    title: "Prior approval not required",
    content: (
      <>
        <p className="govuk-body">
          When a{" "}
          <a
            href="#prior_approval"
            className="govuk-link govuk-link--no-visited-state"
          >
            prior approval
          </a>{" "}
          application has been examined, it was found that the proposal does not
          require prior approval to go ahead.
        </p>
        <p className="govuk-body">
          This means that the works can go ahead without prior approval or
          planning permission.
        </p>
      </>
    ),
  },
  {
    key: "prior-approval-required-and-refused",
    title: "Prior approval required and refused",
    content: (
      <>
        <p className="govuk-body">
          When a{" "}
          <a
            href="#prior_approval"
            className="govuk-link govuk-link--no-visited-state"
          >
            prior approval
          </a>{" "}
          application has been examined, it was found that the proposal requires
          prior approval to go ahead, and prior approval has been refused.
        </p>
        <p className="govuk-body">
          This means that the work proposed cannot go ahead without submitting
          an application for planning permission.
        </p>
      </>
    ),
  },
];

/**
 * Content for the planning process page
 */
export const contentApplicationTypes: PageContent[] = [
  {
    key: "householder",
    title: "Householder planning application",
    content: (
      <p className="govuk-body">
        Applying for planning permission to make changes to a single house. This
        does not include works to flats.
      </p>
    ),
  },
  {
    key: "planning_permission",
    title: "Full planning permission",
    linked: true,
    content: (
      <p className="govuk-body">
        These are the most common type of planning application, and cover a wide
        array of proposals. This can include things like extracting minerals,
        but most applications are covered by the following three kinds of full
        planning permission:
      </p>
    ),
    children: [
      {
        key: "full_minor",
        title: "Minor and changes of use",
        content: (
          <p className="govuk-body">
            Applying for planning permission to extend or alter a flat or flats,
            or a non-residential property, or change the use of a property. Also
            to get permission to construct a small building or buildings, which
            can be residential or non-residential.
          </p>
        ),
      },
      {
        key: "full_major",
        title: "Major",
        content: (
          <p className="govuk-body">
            Applying for planning permission to significantly extend a building
            or buildings, or to construct a large building or buildings. These
            can be residential or non-residential.
          </p>
        ),
      },
    ],
  },
  {
    key: "outline_planning_permission",
    title: "Outline planning permission",
    linked: true,
    content: (
      <p className="govuk-body">
        Assesses whether the nature of a development is acceptable, with details
        reserved for future applications.
      </p>
    ),
  },
  {
    key: "lawfulness_certificate",
    title: "Lawful development certificate",
    linked: true,
    content: (
      <>
        <p className="govuk-body">
          Applying for a certificate which verifies that something being
          proposed, or which has already been built, is lawful.
        </p>
        <p className="govuk-body">
          For existing buildings or changes to buildings, this certificate can
          be applied for retrospectively, and there are many ways that something
          can be deemed lawful in this situation.
        </p>
      </>
    ),
  },
  {
    key: "prior_approval",
    title: "Prior approval",
    linked: true,
    content: (
      <>
        <p className="govuk-body">
          This checks whether the proposal is considered &apos;permitted
          development&apos; according to national legislation, and assesses it
          against specific criteria before it can take place. If the proposal
          does not receive prior approval, or is no eligible for prior approval,
          then a planning application needs to be submitted. If the proposal is
          concidered &apos;permitted development&apos; then it can be done
          without further planning applications.
        </p>
        <p className="govuk-body">
          This covers a wide range of changes or additions to buildings,
          including certain changes of use, extensions to buildings,
          non-domestic solar panels, certain demolitions, etc. You can find out
          about what is eligible for permitted development by reading{" "}
          <a
            href="https://www.gov.uk/guidance/when-is-permission-required#What-are-permitted-development-rights"
            target="_blank"
          >
            the gov.uk guidance on planning.
          </a>
        </p>
      </>
    ),
  },
  {
    key: "approval_of_reserved_matters",
    title: "Approval of reserved matters",
    content: (
      <p className="govuk-body">
        An application for reserved matters provides details of a development
        once its principle has been agreed via outline planning permission. The
        level of details are similar to a full planning application.
      </p>
    ),
  },
  {
    key: "non_planning_consents",
    title: "Non-planning consents",
    content: (
      <p className="govuk-body">
        These kinds of applications cover things such as getting consent for
        advirtisements, making changes to protected trees, or dealing with
        hazardous substances. The description of these application types will
        provide more information about them.
      </p>
    ),
  },
];
