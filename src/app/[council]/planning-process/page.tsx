/* eslint-disable react/no-unescaped-entities */
import { BackLink } from "@/components/button";

const PlanningProcess = () => {
  return (
    <>
      <BackLink />
      <div className="govuk-main-wrapper">
        <h1 className="govuk-heading-xl">Understanding planning</h1>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third-from-desktop contents-bar">
            <h2 className="govuk-heading-l">Contents</h2>

            <p className="list-heading govuk-body">
              <a href="#application-statuses" className="govuk-link">
                Application statuses
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#consultation-in-progress" className="govuk-link">
                Consultation in progress
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#assessment-in-progress" className="govuk-link">
                Assessment in progress
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#determined" className="govuk-link">
                Determined
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#withdrawn" className="govuk-link">
                Withdrawn
              </a>
            </p>

            <p className="list-heading govuk-body">
              <a href="#important-dates" className="govuk-link">
                Important dates
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#received-date" className="govuk-link">
                Received date
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#validated-date" className="govuk-link">
                Valid from date
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#published-date" className="govuk-link">
                Published date
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#consultation-end-date" className="govuk-link">
                Consultation end date
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#decision-date" className="govuk-link">
                Decision date
              </a>
            </p>

            <p className="list-heading govuk-body">
              <a href="#decisions" className="govuk-link">
                Decisions
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#granted" className="govuk-link">
                Granted
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#refused" className="govuk-link">
                Refused
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#prior-approved" className="govuk-link">
                Prior approval required and approved
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#prior-approval-not-required" className="govuk-link">
                Prior approval not required
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a
                href="#prior-approval-required-and-refused"
                className="govuk-link"
              >
                Prior approval required and refused
              </a>
            </p>

            <p className="list-heading govuk-body">
              <a href="#application-types" className="govuk-link">
                Application types
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#householder" className="govuk-link">
                Householder planning application
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#planning_permission" className="govuk-link">
                Full planning permission
              </a>
            </p>
            <p className="sub-list sub-sub-list govuk-body">
              <a href="#full_minor" className="govuk-link">
                Minor and changes of use
              </a>
            </p>
            <p className="sub-list sub-sub-list govuk-body">
              <a href="#full_major" className="govuk-link">
                Major
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#outline_planning_permission" className="govuk-link">
                Outline planning permission
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#lawfulness_certificate" className="govuk-link">
                Lawful development certificate
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#prior_approval" className="govuk-link">
                Prior approval
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#approval_of_reserved_matters" className="govuk-link">
                Approval of reserved matters
              </a>
            </p>
            <p className="sub-list govuk-body">
              <a href="#non_planning_consents" className="govuk-link">
                Non-planning consents
              </a>
            </p>
          </div>

          <div className="govuk-grid-column-two-thirds-from-desktop">
            <h2 className="govuk-heading-l" id="application-statuses">
              Application statuses
            </h2>
            <h3 className="govuk-heading-m" id="consultation-in-progress">
              Consultation in progress
            </h3>
            <p className="govuk-body">
              Once an application has been submitted, there are 21 days (not
              including bank holidays) where neighbours and the local community
              must be consulted. This is the statutory consultation period. It
              can go on for longer than 21 working days, but it cannot be any
              less. The council cannot make a decision until the statutory
              consultation period is over.
            </p>
            <p className="govuk-body">
              During this time and comments can be submitted for consideration
              by the planning team. Comments submitted after the statutory
              consultation period are usually considered if they are submitted
              before a decision is made.{" "}
            </p>

            <h3 className="govuk-heading-m" id="assessment-in-progress">
              Assessment in progress
            </h3>
            <p className="govuk-body">
              Once the consultation has been complete, planning applications are
              assessed. The application and all it's documentation is checked
              and considered. Comments are read and considered.
            </p>
            <p className="govuk-body">
              A decision notice is created containing the decision the council
              makes. The notice sometimes includes reasons for the decision, and
              responses to significant points raised by comments.
            </p>

            <h3 className="govuk-heading-m" id="determined">
              Determined
            </h3>
            <p className="govuk-body">
              A determined appliction has had a decision made about it, so it
              has completed its journey through the appliction process. The{" "}
              <a
                href="#decisions"
                className="govuk-link govuk-link--no-visited-state"
              >
                decision
              </a>{" "}
              is published with all the supporting documentation. Decisions can
              be appealed.
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

            <h3 className="govuk-heading-m" id="withdrawn">
              Withdrawn
            </h3>
            <p className="govuk-body">
              Planning applications can be withdrawn by the applicant, or
              sometimes by the council. This usually means they no longer intend
              to do the work they applied for. It can also mean they have
              decided to significantly change the proposed work, and may submit
              a new planning application at a later date.
            </p>

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
            <h3 className="govuk-heading-m" id="granted">
              Granted
            </h3>
            <p className="govuk-body">
              Planning applications which have been granted are given permission
              to go ahead. The work must begin within three years of approval,
              unless special circumstances apply. If the work is not started
              within three years, another application would need to be
              submitted.
            </p>
            <p className="govuk-body">
              Granted permissions can be conditional on certain criteria being
              met. These will be published in the decision notice for the
              application.
            </p>

            <h3 className="govuk-heading-m" id="refused">
              Refused
            </h3>
            <p className="govuk-body">
              Refused planning applications do not have permission to go ahead.
              The applicant is not allowed to perform the work they applied to
              do. The reasons for the rejection will be included in the decision
              notice for the application.
            </p>
            <p className="govuk-body">
              Refused planning applications can be appealed by applicants or
              their agents.
            </p>

            <h3 className="govuk-heading-m" id="prior-approved">
              Prior approval required and approved{" "}
            </h3>
            <p className="govuk-body">
              When a{" "}
              <a
                href="#prior_approval"
                className="govuk-link govuk-link--no-visited-state"
              >
                prior approval
              </a>{" "}
              application has been examined, it was found that the proposal
              requires prior approval to go ahead, and prior approval has been
              granted.
            </p>
            <p className="govuk-body">
              This means that the work proposed can go ahead, and does not
              require planning permission.
            </p>

            <h3 className="govuk-heading-m" id="prior-approval-not-required">
              Prior approval not required
            </h3>
            <p className="govuk-body">
              When a{" "}
              <a
                href="#prior_approval"
                className="govuk-link govuk-link--no-visited-state"
              >
                prior approval
              </a>{" "}
              application has been examined, it was found that the proposal does
              not require prior approval to go ahead.
            </p>
            <p className="govuk-body">
              This means that the works can go ahead without prior approval or
              planning permission.
            </p>

            <h3
              className="govuk-heading-m"
              id="prior-approval-required-and-refused"
            >
              Prior approval required and refused
            </h3>
            <p className="govuk-body">
              When a{" "}
              <a
                href="#prior_approval"
                className="govuk-link govuk-link--no-visited-state"
              >
                prior approval
              </a>{" "}
              application has been examined, it was found that the proposal
              requires prior approval to go ahead, and prior approval has been
              refused.
            </p>
            <p className="govuk-body">
              This means that the work proposed cannot go ahead without
              submitting an application for planning permission.
            </p>

            <h2 className="govuk-heading-l" id="application-types">
              Application types
            </h2>

            <h3 className="govuk-heading-m" id="householder">
              Householder
            </h3>
            <p className="govuk-body">
              Applying for planning permission to make changes to a single
              house. This does not include works to flats.
            </p>

            <h3 className="govuk-heading-m" id="planning_permission">
              Full planning permission
            </h3>
            <p className="govuk-body">
              These are the most common type of planning application, and cover
              a wide array of proposals. This can include things like extracting
              minerals, but most applications are covered by the following three
              kinds of full planning permission:
            </p>

            <h4 className="govuk-heading-s" id="full_minor">
              Minor and changes of use
            </h4>
            <p className="govuk-body">
              Applying for planning permission to extend or alter a flat or
              flats, or a non-residential property, or change the use of a
              property. Also to get permission to construct a small building or
              buildings, which can be residential or non-residential.
            </p>

            <h4 className="govuk-heading-s" id="full_major">
              Major
            </h4>
            <p className="govuk-body">
              Applying for planning permission to significantly extend a
              building or buildings, or to construct a large building or
              buildings. These can be residential or non-residential.
            </p>

            <h3 className="govuk-heading-m" id="outline_planning_permission">
              Outline planning permission
            </h3>
            <p className="govuk-body">
              Assesses whether the nature of a development is acceptable, with
              details reserved for future applications.
            </p>

            <h3 className="govuk-heading-m" id="lawfulness_certificate">
              Lawful development certificate
            </h3>
            <p className="govuk-body">
              Applying for a certificate which verifies that something being
              proposed, or which has already been built, is lawful.
            </p>
            <p className="govuk-body">
              For existing buildings or changes to buildings, this certificate
              can be applied for retrospectively, and there are many ways that
              something can be deemed lawful in this situation.
            </p>

            <h3 className="govuk-heading-m" id="prior_approval">
              Prior approval
            </h3>
            <p className="govuk-body">
              This checks whether the proposal is considered 'permitted
              development' according to national legislation, and assesses it
              against specific criteria before it can take place. If the
              proposal does not receive prior approval, or is no eligible for
              prior approval, then a planning application needs to be submitted.
              If the proposal is concidered 'permitted development' then it can
              be done without further planning applications.
            </p>
            <p className="govuk-body">
              This covers a wide range of changes or additions to buildings,
              including certain changes of use, extensions to buildings,
              non-domestic solar panels, certain demolitions, etc. You can find
              out about what is eligible for permitted development by reading{" "}
              <a
                href="https://www.gov.uk/guidance/when-is-permission-required#What-are-permitted-development-rights"
                target="_blank"
              >
                the gov.uk guidance on planning.
              </a>
            </p>

            <h3 className="govuk-heading-m" id="approval_of_reserved_matters">
              Approval of reserved matters
            </h3>
            <p className="govuk-body">
              An application for reserved matters provides details of a
              development once its principle has been agreed via outline
              planning permission. The level of details are similar to a full
              planning application.
            </p>

            <h3 className="govuk-heading-m" id="non_planning_consents">
              Non-planning consents
            </h3>
            <p className="govuk-body">
              These kinds of applications cover things such as getting consent
              for advirtisements, making changes to protected trees, or dealing
              with hazardous substances. The description of these application
              types will provide more information about them.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanningProcess;
