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

import { DprApplication } from "@/types";
import { capitalizeFirstLetter, concatenateFieldsInOrder } from "@/util";
import "./ApplicationPeople.scss";
import { Agent } from "@/types/odp-types/schemas/prototypeApplication/data/Applicant";

interface ApplicationPeopleProps {
  applicant?: DprApplication["submission"]["data"]["applicant"];
  caseOfficer?: DprApplication["data"]["caseOfficer"];
}

export const ApplicationPeople = ({
  applicant,
  caseOfficer,
}: ApplicationPeopleProps) => {
  const agent =
    applicant && "agent" in applicant ? (applicant as Agent).agent : undefined;
  const hasPeople = caseOfficer || agent || applicant;
  if (!hasPeople) {
    return null;
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
        {caseOfficer && (
          <ApplicationPeopleCaseOfficer caseOfficer={caseOfficer} />
        )}

        {agent && <ApplicationPeopleAgent agent={agent} />}

        {applicant && <ApplicationPeopleApplicant applicant={applicant} />}
      </div>
    </section>
  );
};

/**
 * Gets the fields needed to show the case officer section
 * @param caseOfficer
 * @returns
 */
export const getCaseOfficerFields = (
  caseOfficer: DprApplication["data"]["caseOfficer"],
) => {
  const caseOfficerName = caseOfficer.name;
  return { caseOfficerName };
};

/**
 * Shows the case officer details
 * @param param0
 * @returns
 */
export const ApplicationPeopleCaseOfficer = ({
  caseOfficer,
}: {
  caseOfficer: DprApplication["data"]["caseOfficer"];
}) => {
  const { caseOfficerName } = getCaseOfficerFields(caseOfficer);

  if (!caseOfficerName) {
    return null;
  }
  return (
    <div className="dpr-application-people__grid-item">
      <h3 className="govuk-heading-m">Case Officer</h3>
      <p className="govuk-hint">
        This is the individual at the council who is currently responsible for
        assessing this application.
      </p>
      <div>
        <h4 className="govuk-heading-s">
          <span className="govuk-visually-hidden">Case Officer </span>
          Name
        </h4>
        <p className="govuk-body">{caseOfficerName}</p>
      </div>
    </div>
  );
};

/**
 * Gets the agent fields needed to show the agent section
 * @param agent
 * @returns
 */
export const getAgentFields = (agent: Agent["agent"]) => {
  const agentName = concatenateFieldsInOrder(
    agent?.name,
    ["first", "last"],
    " ",
  );

  // using `as unknown as Record<string, string>` to avoid TS error converting Agent interface to Record<string, string>
  const agentAddress = concatenateFieldsInOrder(agent.address, [
    "line1",
    "line2",
    "town",
    "county",
    "postcode",
    "country",
  ]);

  return { agentName, agentAddress };
};

/**
 * Shows the agent part of an Applicant data type
 * @param param0
 * @returns
 */
export const ApplicationPeopleAgent = ({
  agent,
}: {
  agent: Agent["agent"];
}) => {
  const { agentName, agentAddress } = getAgentFields(agent);

  if (!agentName && !agentAddress) {
    return null;
  }

  return (
    <div className="dpr-application-people__grid-item">
      <h3 className="govuk-heading-m">Applicant&apos;s Agent</h3>
      <p className="govuk-hint">
        This is who the applicant has engaged to manage this application for
        them.
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
  );
};

/**
 * Exports all the fields needed to show the applicant section
 * @param applicant
 * @returns
 */
export const getApplicantFields = (
  applicant: DprApplication["submission"]["data"]["applicant"],
) => {
  const applicantName = concatenateFieldsInOrder(
    applicant.name,
    ["first", "last"],
    " ",
  );

  const applicantType = applicant?.type;
  const applicantAddress = applicant.address?.sameAsSiteAddress
    ? "Same as site address"
    : concatenateFieldsInOrder(applicant.address, [
        "line1",
        "line2",
        "town",
        "county",
        "postcode",
        "country",
      ]);

  return { applicantName, applicantType, applicantAddress };
};

/**
 * Shows the applicant section
 * @param param0
 * @returns
 */
export const ApplicationPeopleApplicant = ({
  applicant,
}: {
  applicant: DprApplication["submission"]["data"]["applicant"];
}) => {
  const { applicantName, applicantType, applicantAddress } =
    getApplicantFields(applicant);

  if (!applicantName || !applicantType || !applicantAddress) {
    return null;
  }

  return (
    <div className="dpr-application-people__grid-item">
      <h3 className="govuk-heading-m">Applicant</h3>
      <p className="govuk-hint">This is who has submitted this application.</p>

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
          <p className="govuk-body">{capitalizeFirstLetter(applicantType)}</p>
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
  );
};
