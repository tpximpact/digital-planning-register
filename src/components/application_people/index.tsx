import { BopsV2PlanningApplicationDetail } from "@/types/api/bops";
import { capitaliseWord } from "../../../util/capitaliseWord";
interface ApplicationPeopleProps
  extends Pick<
    BopsV2PlanningApplicationDetail,
    | "applicant_first_name"
    | "applicant_last_name"
    | "applicant_type"
    | "applicant_address"
    | "agent_first_name"
    | "agent_last_name"
    | "agent_address"
  > {}

const ApplicationPeople = ({
  applicant_first_name,
  applicant_last_name,
  applicant_type,
  applicant_address,
  agent_first_name,
  agent_last_name,
  agent_address,
}: ApplicationPeopleProps) => {
  return (
    <div>
      <h2 className="govuk-heading-l">People</h2>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third-from-desktop grid-row-extra-bottom-margin">
          <div className="govuk-heading-m">Applicant</div>
          {(applicant_first_name || applicant_last_name) && (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <div className="govuk-heading-s">Name</div>
                <p className="govuk-body">
                  {applicant_first_name} {applicant_last_name}
                </p>
              </div>
            </div>
          )}
          {applicant_type && (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <div className="govuk-heading-s">Type</div>
                <p className="govuk-body">{capitaliseWord(applicant_type)}</p>
              </div>
            </div>
          )}
          {applicant_address && (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <div className="govuk-heading-s">Address</div>
                <p className="govuk-body">{applicant_address}</p>
              </div>
            </div>
          )}
        </div>

        <div className="govuk-grid-column-one-third-from-desktop grid-row-extra-bottom-margin">
          <div className="govuk-heading-m">Applicants Agent</div>
          {(agent_first_name || agent_last_name) && (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <div className="govuk-heading-s">Name</div>
                <p className="govuk-body">
                  {agent_first_name} {agent_last_name}
                </p>
              </div>
            </div>
          )}
          {agent_address && (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <div className="govuk-heading-s">Address</div>
                <p className="govuk-body">{agent_address}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationPeople;
