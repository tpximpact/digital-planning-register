import { BopsV2PlanningApplicationDetail } from "@/handlers/bops/types";

interface ApplicationPeopleProps
  extends Pick<
    BopsV2PlanningApplicationDetail,
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
    <section aria-labelledby="people-section">
      <h2 className="govuk-heading-l people-section" id="people-section">
        People
      </h2>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third-from-desktop grid-row-extra-bottom-margin">
          <h3 className="govuk-heading-m">Applicant</h3>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h4 className="govuk-heading-s">Name</h4>
              <p className="govuk-body">
                {applicant_first_name} {applicant_last_name}
              </p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h4 className="govuk-heading-s">Type</h4>
              <p className="govuk-body">Company</p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h4 className="govuk-heading-s">Relationship to property</h4>
              <p className="govuk-body">No Information</p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h4 className="govuk-heading-s">Company</h4>
              <p className="govuk-body">No Information</p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h4 className="govuk-heading-s">Address</h4>
              <p className="govuk-body">No Information</p>
            </div>
          </div>
        </div>

        <div className="govuk-grid-column-one-third-from-desktop grid-row-extra-bottom-margin">
          <h3 className="govuk-heading-m">Applicants Agent</h3>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h4 className="govuk-heading-s">Name</h4>
              <p className="govuk-body">
                {agent_first_name} {agent_last_name}
              </p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h4 className="govuk-heading-s">Company</h4>
              <p className="govuk-body">No Information</p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h4 className="govuk-heading-s">Address</h4>
              <p className="govuk-body">No Information</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationPeople;
