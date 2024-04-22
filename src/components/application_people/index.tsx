import { Data } from "../../../util/type";

const ApplicationPeople = ({
  applicant_first_name,
  applicant_last_name,
  agent_first_name,
  agent_last_name,
}: Data) => {
  return (
    <div className="">
      <h2 className="govuk-heading-l">People</h2>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third-from-desktop grid-row-extra-bottom-margin">
          <h3 className="govuk-heading-m">Applicant</h3>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h4 className="govuk-heading-s">Name</h4>
              <p className="govuk-body" role="applicant-name">
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
              <p className="govuk-body">Occupier</p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h4 className="govuk-heading-s">Company</h4>
              <p className="govuk-body">JoSmith Ltd</p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h4 className="govuk-heading-s">Address</h4>
              <p className="govuk-body">
                19 Road Street, Placeton, Cityville, PO5 7CO
              </p>
            </div>
          </div>
        </div>

        <div className="govuk-grid-column-one-third-from-desktop grid-row-extra-bottom-margin">
          <h3 className="govuk-heading-m">Applicants Agent</h3>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h4 className="govuk-heading-s">Name</h4>
              <p className="govuk-body" role="agent-name">
                {agent_first_name} {agent_last_name}
              </p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h4 className="govuk-heading-s">Company</h4>
              <p className="govuk-body">JoanDoe Ltd</p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h4 className="govuk-heading-s">Address</h4>
              <p className="govuk-body">
                19 Road Street, Placeton, Cityville, PO5 7CO
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPeople;
