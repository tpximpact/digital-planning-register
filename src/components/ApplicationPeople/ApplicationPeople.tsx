import { DprPlanningApplication } from "@/types";
import { capitalizeFirstLetter, concatenateFieldsInOrder } from "@/util";

interface ApplicationPeopleProps {
  applicant: DprPlanningApplication["applicant"];
}

export const ApplicationPeople = ({ applicant }: ApplicationPeopleProps) => {
  const applicantName = concatenateFieldsInOrder(
    applicant.name ?? {},
    ["first", "last"],
    " ",
  );
  const applicantType = applicant?.type;
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
  const agentName = concatenateFieldsInOrder(
    applicant.agent?.name ?? {},
    ["first", "last"],
    " ",
  );
  const agentAddress = concatenateFieldsInOrder(
    applicant.agent?.address ?? {},
    ["line1", "line2", "town", "county", "postcode", "country"],
  );

  if (
    (!applicantName &&
      !applicantType &&
      !applicantAddress &&
      !agentName &&
      !agentAddress) ||
    !applicant
  ) {
    return <></>;
  }
  return (
    <section aria-labelledby="people-section" id="people">
      <h2 className="govuk-heading-l" id="people-section">
        People
      </h2>

      <p className="govuk-body">
        If you want to find out more about this application, please contact the
        case officer first.
      </p>

      <div className="govuk-grid-row">
        {(agentName || agentAddress) && (
          <div className="govuk-grid-column-one-half-from-desktop grid-row-extra-bottom-margin">
            <h3 className="govuk-heading-m">Applicant&apos;s Agent</h3>
            <p className="govuk-hint">
              This is who the applicant has engaged to manage this application
              for them.
            </p>

            {agentName && (
              <div className="govuk-grid-row">
                <div className="govuk-grid-column-full">
                  <h4 className="govuk-heading-s">
                    <span className="govuk-visually-hidden">
                      Applicant&apos;s Agent{" "}
                    </span>
                    Name
                  </h4>
                  <p className="govuk-body">{agentName}</p>
                </div>
              </div>
            )}
            {agentAddress && (
              <div className="govuk-grid-row">
                <div className="govuk-grid-column-full">
                  <h4 className="govuk-heading-s">
                    <span className="govuk-visually-hidden">
                      Applicant&apos;s Agent{" "}
                    </span>
                    Address
                  </h4>
                  <p className="govuk-body">{agentAddress}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {(applicantName || applicantType || applicantAddress) && (
          <div className="govuk-grid-column-one-half-from-desktop grid-row-extra-bottom-margin">
            <h3 className="govuk-heading-m">Applicant</h3>
            <p className="govuk-hint">
              This is who has submitted this application.
            </p>

            {applicantName && (
              <div className="govuk-grid-row">
                <div className="govuk-grid-column-full">
                  <h4 className="govuk-heading-s">
                    <span className="govuk-visually-hidden">Applicant </span>
                    Name
                  </h4>
                  <p className="govuk-body">{applicantName}</p>
                </div>
              </div>
            )}

            {applicantType && (
              <div className="govuk-grid-row">
                <div className="govuk-grid-column-full">
                  <h4 className="govuk-heading-s">
                    <span className="govuk-visually-hidden">Applicant </span>
                    Type
                  </h4>
                  <p className="govuk-body">
                    {capitalizeFirstLetter(applicantType)}
                  </p>
                </div>
              </div>
            )}

            {applicantAddress && (
              <div className="govuk-grid-row">
                <div className="govuk-grid-column-full">
                  <h4 className="govuk-heading-s">
                    <span className="govuk-visually-hidden">Applicant </span>
                    Address
                  </h4>
                  <p className="govuk-body">{applicantAddress}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
