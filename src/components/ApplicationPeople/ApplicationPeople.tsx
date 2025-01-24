import { DprPlanningApplication } from "@/types";
import { capitalizeFirstLetter, concatenateFieldsInOrder } from "@/util";
import "./ApplicationPeople.scss";

interface ApplicationPeopleProps {
  applicant?: DprPlanningApplication["applicant"];
  caseOfficer?: DprPlanningApplication["officer"];
}

export const ApplicationPeople = ({
  applicant,
  caseOfficer,
}: ApplicationPeopleProps) => {
  const applicantName = concatenateFieldsInOrder(
    applicant?.name ?? {},
    ["first", "last"],
    " ",
  );
  const applicantType = applicant?.type;
  const applicantAddress = applicant?.address?.sameAsSiteAddress
    ? "Same as site address"
    : concatenateFieldsInOrder(applicant?.address ?? {}, [
        "line1",
        "line2",
        "town",
        "county",
        "postcode",
        "country",
      ]);
  const agentName = concatenateFieldsInOrder(
    applicant?.agent?.name ?? {},
    ["first", "last"],
    " ",
  );
  const agentAddress = concatenateFieldsInOrder(
    applicant?.agent?.address ?? {},
    ["line1", "line2", "town", "county", "postcode", "country"],
  );

  if (
    !caseOfficer?.name &&
    !applicantName &&
    !applicantType &&
    !applicantAddress &&
    !agentName &&
    !agentAddress
  ) {
    return <></>;
  }

  return (
    <section
      aria-labelledby="people-section"
      className="dpr-application-people"
      id="people"
    >
      <h2 className="govuk-heading-l" id="people-section">
        People
      </h2>

      <p className="govuk-body">
        If you want to find out more about this application, please contact the
        case officer first.
      </p>

      <div className="dpr-application-people__grid">
        {caseOfficer?.name && (
          <div className="dpr-application-people__grid-item">
            <h3 className="govuk-heading-m">Case Officer</h3>
            <p className="govuk-hint">
              This is the individual at the council who is currently responsible
              for assessing this application.
            </p>
            <div>
              <h4 className="govuk-heading-s">
                <span className="govuk-visually-hidden">Case Officer </span>
                Name
              </h4>
              <p className="govuk-body">{caseOfficer.name}</p>
            </div>
          </div>
        )}

        {(agentName || agentAddress) && (
          <div className="dpr-application-people__grid-item">
            <h3 className="govuk-heading-m">Applicant&apos;s Agent</h3>
            <p className="govuk-hint">
              This is who the applicant has engaged to manage this application
              for them.
            </p>

            {agentName && (
              <div>
                <h4 className="govuk-heading-s">
                  <span className="govuk-visually-hidden">
                    Applicant&apos;s Agent{" "}
                  </span>
                  Name
                </h4>
                <p className="govuk-body">{agentName}</p>
              </div>
            )}
            {agentAddress && (
              <div>
                <h4 className="govuk-heading-s">
                  <span className="govuk-visually-hidden">
                    Applicant&apos;s Agent{" "}
                  </span>
                  Address
                </h4>
                <p className="govuk-body">{agentAddress}</p>
              </div>
            )}
          </div>
        )}

        {(applicantName || applicantType || applicantAddress) && (
          <div className="dpr-application-people__grid-item">
            <h3 className="govuk-heading-m">Applicant</h3>
            <p className="govuk-hint">
              This is who has submitted this application.
            </p>

            {applicantName && (
              <div>
                <h4 className="govuk-heading-s">
                  <span className="govuk-visually-hidden">Applicant </span>
                  Name
                </h4>
                <p className="govuk-body">{applicantName}</p>
              </div>
            )}

            {applicantType && (
              <div>
                <h4 className="govuk-heading-s">
                  <span className="govuk-visually-hidden">Applicant </span>
                  Type
                </h4>
                <p className="govuk-body">
                  {capitalizeFirstLetter(applicantType)}
                </p>
              </div>
            )}

            {applicantAddress && (
              <div>
                <h4 className="govuk-heading-s">
                  <span className="govuk-visually-hidden">Applicant </span>
                  Address
                </h4>
                <p className="govuk-body">{applicantAddress}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
