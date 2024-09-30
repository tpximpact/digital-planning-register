import { capitaliseWord } from "../../../util/capitaliseWord";
import { DprPlanningApplicationApplicant } from "@/types";
import { concatenateFieldsInOrder } from "../../../util/concatenateFieldsInOrder";

const ApplicationPeople = ({
  name,
  type,
  address,
  agent,
}: DprPlanningApplicationApplicant) => {
  return (
    <div>
      <h2 className="govuk-heading-l">People</h2>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third-from-desktop grid-row-extra-bottom-margin">
          <div className="govuk-heading-m">Applicant</div>
          {(name?.first || name?.last) && (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <div className="govuk-heading-s">Name</div>
                <p className="govuk-body">
                  {name?.first} {name?.last}
                </p>
              </div>
            </div>
          )}
          {type && (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <div className="govuk-heading-s">Type</div>
                <p className="govuk-body">{capitaliseWord(type)}</p>
              </div>
            </div>
          )}
          {address && (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <div className="govuk-heading-s">Address</div>
                <p className="govuk-body">
                  {address?.sameAsSiteAddress
                    ? "Same as site"
                    : concatenateFieldsInOrder(address ?? {}, [
                        "line1",
                        "line2",
                        "town",
                        "county",
                        "postcode",
                        "country",
                      ])}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="govuk-grid-column-one-third-from-desktop grid-row-extra-bottom-margin">
          {(agent?.name?.first || agent?.name?.last || agent?.address) && (
            <div className="govuk-heading-m">Applicants Agent</div>
          )}
          {(agent?.name?.first || agent?.name?.last) && (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <div className="govuk-heading-s">Name</div>
                <p className="govuk-body">
                  {agent?.name?.first} {agent?.name?.last}
                </p>
              </div>
            </div>
          )}
          {agent?.address && (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <div className="govuk-heading-s">Address</div>
                {concatenateFieldsInOrder(agent.address ?? {}, [
                  "line1",
                  "line2",
                  "town",
                  "county",
                  "postcode",
                  "country",
                ])}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationPeople;
