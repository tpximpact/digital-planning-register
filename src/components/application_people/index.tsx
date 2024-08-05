import { V2PlanningApplicationsReference } from "@/types";

interface ApplicationPeopleProps
  extends Pick<
    V2PlanningApplicationsReference,
    | "applicant_first_name"
    | "applicant_last_name"
    | "agent_first_name"
    | "agent_last_name"
  > {}

const ApplicationPeople = ({
  applicant_first_name,
  applicant_last_name,
  agent_first_name,
  agent_last_name,
}: ApplicationPeopleProps) => {
  return (
    <div>
      <h2 className="govuk-heading-l">People</h2>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third-from-desktop grid-row-extra-bottom-margin">
          <div className="govuk-heading-m">Applicant</div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <div className="govuk-heading-s">Name</div>
              <p className="govuk-body">
                {applicant_first_name} {applicant_last_name}
              </p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <div className="govuk-heading-s">Type</div>
              <p className="govuk-body">Company</p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <div className="govuk-heading-s">Relationship to property</div>
              <p className="govuk-body">No Information</p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <div className="govuk-heading-s">Company</div>
              <p className="govuk-body">No Information</p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <div className="govuk-heading-s">Address</div>
              <p className="govuk-body">No Information</p>
            </div>
          </div>
        </div>

        <div className="govuk-grid-column-one-third-from-desktop grid-row-extra-bottom-margin">
          <div className="govuk-heading-m">Applicants Agent</div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <div className="govuk-heading-s">Name</div>
              <p className="govuk-body">
                {agent_first_name} {agent_last_name}
              </p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <div className="govuk-heading-s">Company</div>
              <p className="govuk-body">No Information</p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <div className="govuk-heading-s">Address</div>
              <p className="govuk-body">No Information</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPeople;
