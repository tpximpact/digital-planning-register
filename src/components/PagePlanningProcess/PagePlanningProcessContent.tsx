import { DprContentPage } from "@/types";
import { slugify } from "@/util";

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

export const contentApplicationTypes: DprContentPage[] = [
  {
    key: slugify("Householder planning application"),
    title: "Householder planning application",
    content: (
      <p className="govuk-body">
        Applying for planning permission to make changes to a single house. This
        does not include works to flats.
      </p>
    ),
  },
  {
    key: slugify("Full planning permission"),
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
        key: slugify("Minor and changes of use"),
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
        key: slugify("Major"),
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
    key: slugify("Outline planning permission"),
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
    key: slugify("Lawful development certificate"),
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
    key: slugify("Prior approval"),
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
    key: slugify("Approval of reserved matters"),
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
    key: slugify("Non-planning consents"),
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

export const contentPlanningProcess = (): DprContentPage[] => [
  {
    key: slugify("Application statuses"),
    title: "Application statuses",
    children: contentApplicationStatuses,
  },
  {
    key: slugify("Important dates"),
    title: "Important dates",
    children: [
      {
        key: slugify("Received date"),
        title: "Received date",
        content: (
          <>
            <p className="govuk-body">
              This is the date that the application is received by the council.
              It may not be the date it was sent, if there have been delays in
              the submission process.
            </p>
          </>
        ),
      },
      {
        key: slugify("Valid from date"),
        title: "Valid from date",
        content: (
          <>
            <p className="govuk-body">
              This is the date that the application is considered a valid
              application. Usually this will be the same as the received date,
              but sometimes applications are submitted incorrectly, and need
              correcting to be valid. This is the date that processing the
              application officially begins.
            </p>
          </>
        ),
      },
      {
        key: slugify("Published date"),
        title: "Published date",
        content: (
          <>
            <p className="govuk-body">
              This is the date the application is registered by the council and
              published on the digital planning register. It may be different
              from the date the application is valid from, as it can take time
              to put a valid application online.
            </p>
          </>
        ),
      },
      {
        key: slugify("Consultation end date"),
        title: "Consultation end date",
        content: (
          <>
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
          </>
        ),
      },
      {
        key: slugify("Decision date"),
        title: "Decision date",
        content: (
          <>
            <p className="govuk-body">
              The date the council made a formal decision to grant or refuse the
              planning application.
            </p>
          </>
        ),
      },
    ],
  },
  {
    key: slugify("Decisions"),
    title: "Decisions",
    children: [
      {
        key: slugify("Granted"),
        title: "Granted",
        content: (
          <>
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
          </>
        ),
      },
      {
        key: slugify("Refused"),
        title: "Refused",
        content: (
          <>
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
          </>
        ),
      },
      {
        key: slugify("Prior approval required and refused"),
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
              application has been examined, it was found that the proposal
              requires prior approval to go ahead, and prior approval has been
              refused.
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
    key: slugify("Application types"),
    title: "Application types",
    children: contentApplicationTypes,
  },
];
