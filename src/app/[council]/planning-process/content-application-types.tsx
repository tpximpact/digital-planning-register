import { PageContent } from "./page";

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
