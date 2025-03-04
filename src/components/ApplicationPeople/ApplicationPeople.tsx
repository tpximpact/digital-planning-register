/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

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
  const applicantName = concatenateFieldsInOrder<string>(
    applicant?.name ?? {},
    ["first", "last"],
    " ",
  );
  const applicantType = applicant?.type;
  const applicantAddress = applicant?.address?.sameAsSiteAddress
    ? "Same as site address"
    : concatenateFieldsInOrder<string>(applicant?.address ?? {}, [
        "line1",
        "line2",
        "town",
        "county",
        "postcode",
        "country",
      ]);
  const agentName = concatenateFieldsInOrder<string>(
    applicant?.agent?.name ?? {},
    ["first", "last"],
    " ",
  );
  const agentAddress = concatenateFieldsInOrder<string>(
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
