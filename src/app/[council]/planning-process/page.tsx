import { BackLink } from "@/components/button";
import { contentApplicationTypes } from "./content-application-types";
import { contentDecisions } from "./content-decisions";
import { contentApplicationStatuses } from "./content-application-statuses";
import NotFound from "@/app/not-found";
import { getCouncilConfig } from "@/lib/config";

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

type Props = {
  params: { reference: string; council: string };
};

const PlanningProcess = async ({ params }: Props) => {
  const { council } = params;
  const councilConfig = getCouncilConfig(council);

  return (
    <>
      {councilConfig?.visibility === "private" ? (
        <NotFound params={params} />
      ) : (
        <>
          <BackLink />
          <div className="govuk-main-wrapper">
            <h1 className="govuk-heading-xl">Understanding planning</h1>
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-one-third-from-desktop contents-bar">
                <h2 className="govuk-heading-l">Contents</h2>

                <p className="contents-bar__list-heading">
                  <a href="#application-statuses">Application statuses</a>
                </p>
                {contentApplicationStatuses.map((type) => (
                  <>
                    <p key={type.key} className="contents-bar__sub-list">
                      <a href={`#${type.key}`}>{type.title}</a>
                    </p>
                    {type.children && (
                      <>
                        {type.children.map((type) => (
                          <p
                            key={type.key}
                            className="contents-bar__sub-list contents-bar__sub-sub-list"
                          >
                            <a href={`#${type.key}`}>{type.title}</a>
                          </p>
                        ))}
                      </>
                    )}
                  </>
                ))}

                <p className="contents-bar__list-heading">
                  <a href="#important-dates">Important dates</a>
                </p>
                <p className="contents-bar__sub-list">
                  <a href="#received-date">Received date</a>
                </p>
                <p className="contents-bar__sub-list">
                  <a href="#validated-date">Valid from date</a>
                </p>
                <p className="contents-bar__sub-list">
                  <a href="#published-date">Published date</a>
                </p>
                <p className="contents-bar__sub-list">
                  <a href="#consultation-end-date">Consultation end date</a>
                </p>
                <p className="contents-bar__sub-list">
                  <a href="#decision-date">Decision date</a>
                </p>

                <p className="contents-bar__list-heading">
                  <a href="#decisions">Decisions</a>
                </p>
                {contentDecisions.map((type) => (
                  <>
                    <p key={type.key} className="contents-bar__sub-list">
                      <a href={`#${type.key}`}>{type.title}</a>
                    </p>
                    {type.children && (
                      <>
                        {type.children.map((type) => (
                          <p
                            key={type.key}
                            className="contents-bar__sub-list contents-bar__sub-sub-list"
                          >
                            <a href={`#${type.key}`}>{type.title}</a>
                          </p>
                        ))}
                      </>
                    )}
                  </>
                ))}

                <p className="contents-bar__list-heading">
                  <a href="#application-types">Application types</a>
                </p>
                {contentApplicationTypes.map((type) => (
                  <>
                    <p key={type.key} className="contents-bar__sub-list">
                      <a href={`#${type.key}`}>{type.title}</a>
                    </p>
                    {type.children && (
                      <>
                        {type.children.map((type) => (
                          <p
                            key={type.key}
                            className="contents-bar__sub-list contents-bar__sub-sub-list"
                          >
                            <a href={`#${type.key}`}>{type.title}</a>
                          </p>
                        ))}
                      </>
                    )}
                  </>
                ))}
              </div>

              <div className="govuk-grid-column-two-thirds-from-desktop">
                <h2 className="govuk-heading-l" id="application-statuses">
                  Application statuses
                </h2>

                {contentApplicationStatuses.map((type) => (
                  <>
                    <h3
                      key={type.key}
                      className="govuk-heading-m"
                      id={type.key}
                    >
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
                  This is the date that the application is received by the
                  council. It may not be the date it was sent, if there have
                  been delays in the submission process.
                </p>

                <h3 className="govuk-heading-m" id="validated-date">
                  Valid from date
                </h3>
                <p className="govuk-body">
                  This is the date that the application is considered a valid
                  application. Usually this will be the same as the received
                  date, but sometimes applications are submitted incorrectly,
                  and need correcting to be valid. This is the date that
                  processing the application officially begins.
                </p>

                <h3 className="govuk-heading-m" id="published-date">
                  Published date
                </h3>
                <p className="govuk-body">
                  This is the date the application is registered by the council
                  and published on the digital planning register. It may be
                  different from the date the application is valid from, as it
                  can take time to put a valid application online.
                </p>

                <h3 className="govuk-heading-m" id="consultation-end-date">
                  Consultation end date
                </h3>
                <p className="govuk-body">
                  This is the date that the statutory consultation will end for
                  the application.
                </p>
                <p className="govuk-body">
                  Once an application has been submitted, there are 21 working
                  days where neighbours and the local community must be
                  consulted. This is the statutory consultation period. It can
                  go on for longer than 21 working days, but it cannot be any
                  less.
                </p>
                <p className="govuk-body">
                  During this time, comments can be submitted for consideration
                  by the planning team. Some councils allow comments to be
                  submitted until a decision has been made, but they all must
                  accept comments during the consultation.
                </p>

                <h3 className="govuk-heading-m" id="decision-date">
                  Decision date
                </h3>
                <p className="govuk-body">
                  The date the council made a formal decision to grant or refuse
                  the planning application.
                </p>

                <h2 className="govuk-heading-l" id="decisions">
                  Decisions
                </h2>

                {contentDecisions.map((type) => (
                  <>
                    <h3
                      key={type.key}
                      className="govuk-heading-m"
                      id={type.key}
                    >
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
                    <h3
                      key={type.key}
                      className="govuk-heading-m"
                      id={type.key}
                    >
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
      )}
    </>
  );
};

export default PlanningProcess;
