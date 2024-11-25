import { BopsV2PlanningApplicationDetail } from "@/handlers/bops/types";

interface ApplicationPeopleProps
  extends Pick<
    BopsV2PlanningApplicationDetail,
    | "applicant_first_name"
    | "applicant_last_name"
    | "agent_first_name"
    | "agent_last_name"
  > {}

export const ApplicationPeople = ({
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
              <dl>
                <dt className="govuk-heading-s">Name</dt>
                <dd className="govuk-body">
                  {applicant_first_name} {applicant_last_name}
                </dd>
              </dl>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <dl>
                <dt className="govuk-heading-s">Type</dt>
                <dd className="govuk-body">Company</dd>
              </dl>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <dl>
                <dt className="govuk-heading-s">Relationship to property</dt>
                <dd className="govuk-body">No Information</dd>
              </dl>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <dl>
                <dt className="govuk-heading-s">Company</dt>
                <dd className="govuk-body">No Information</dd>
              </dl>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <dl>
                <dt className="govuk-heading-s">Address</dt>
                <dd className="govuk-body">No Information</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="govuk-grid-column-one-third-from-desktop grid-row-extra-bottom-margin">
          <h3 className="govuk-heading-m">Applicants Agent</h3>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <dl>
                <dt className="govuk-heading-s">Name</dt>
                <dd className="govuk-body">
                  {agent_first_name} {agent_last_name}
                </dd>
              </dl>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <dl>
                <dt className="govuk-heading-s">Company</dt>
                <dd className="govuk-body">No Information</dd>
              </dl>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <dl>
                <dt className="govuk-heading-s">Address</dt>
                <dd className="govuk-body">No Information</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
