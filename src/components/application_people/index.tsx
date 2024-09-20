import { concatenateFieldsInOrder } from "@/util";
import { capitaliseWord } from "../../../util/capitaliseWord";
import { DprPlanningApplication } from "@/types";

export interface ApplicationPeopleProps
  extends Pick<DprPlanningApplication, "applicant"> {}

const ApplicationPeople = ({ applicant }: ApplicationPeopleProps) => {
  const applicantFullName = `${applicant.name.title} ${applicant.name.first} ${applicant.name.last}`;
  const applicantAddress = applicant.address?.sameAsSiteAddress
    ? "Same as site address"
    : concatenateFieldsInOrder(applicant.address ?? {}, [
        "line1",
        "line2",
        "town",
        "county",
        "postcode",
        "country",
      ]);

  const applicationAgentFullName =
    applicant.agent &&
    `${applicant.agent.name.title} ${applicant.agent.name.first} ${applicant.agent.name.last}`;

  const applicantAgentAddress =
    applicant.agent &&
    concatenateFieldsInOrder(applicant.agent.address ?? {}, [
      "line1",
      "line2",
      "town",
      "county",
      "postcode",
      "country",
    ]);
  return (
    <div>
      <h2 className="govuk-heading-l">People</h2>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third-from-desktop grid-row-extra-bottom-margin">
          <div className="govuk-heading-m">Applicant</div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <div className="govuk-heading-s">Name</div>
              <p className="govuk-body">{applicantFullName}</p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <div className="govuk-heading-s">Type</div>
              <p className="govuk-body">{capitaliseWord(applicant.type)}</p>
            </div>
          </div>

          {applicant.ownership?.interest && (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <div className="govuk-heading-s">Relationship to property</div>
                <p className="govuk-body">{applicant.ownership?.interest}</p>
              </div>
            </div>
          )}

          {applicant.company?.name && (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <div className="govuk-heading-s">Company</div>
                <p className="govuk-body">{applicant.company?.name}</p>
              </div>
            </div>
          )}

          {applicantAddress && (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <div className="govuk-heading-s">Address</div>
                <p className="govuk-body">{applicantAddress}</p>
              </div>
            </div>
          )}
        </div>
        {applicant.agent && (
          <div className="govuk-grid-column-one-third-from-desktop grid-row-extra-bottom-margin">
            <div className="govuk-heading-m">Applicants Agent</div>

            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <div className="govuk-heading-s">Name</div>
                <p className="govuk-body">{applicationAgentFullName}</p>
              </div>
            </div>

            {applicant.agent?.company?.name && (
              <div className="govuk-grid-row">
                <div className="govuk-grid-column-full">
                  <div className="govuk-heading-s">Company</div>
                  <p className="govuk-body">{applicant.agent?.company?.name}</p>
                </div>
              </div>
            )}

            {applicantAgentAddress && (
              <div className="govuk-grid-row">
                <div className="govuk-grid-column-full">
                  <div className="govuk-heading-s">Address</div>
                  <p className="govuk-body">{applicantAgentAddress}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationPeople;
