import { capitaliseWord } from "../../../util/capitaliseWord";
import { DprPlanningApplication } from "@/types";
import { concatenateFieldsInOrder } from "../../../util/concatenateFieldsInOrder";

export interface ApplicationPeopleProps
  extends Pick<DprPlanningApplication, "applicant"> {}
import { BopsV2PlanningApplicationDetail } from "@/handlers/bops/types";

interface ApplicationPeopleProps
  extends Pick<
    BopsV2PlanningApplicationDetail,
    | "applicant_first_name"
    | "applicant_last_name"
    | "agent_first_name"
    | "agent_last_name"
  > {}

const ApplicationPeople = ({ applicant }: ApplicationPeopleProps) => {
  return (
    <div>
      <h2 className="govuk-heading-l">People</h2>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third-from-desktop grid-row-extra-bottom-margin">
          <div className="govuk-heading-m">Applicant</div>
          {(applicant?.name?.first || applicant?.name?.last) && (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <div className="govuk-heading-s">Name</div>
                <p className="govuk-body">
                  {applicant?.name?.first} {applicant?.name?.last}
                </p>
              </div>
            </div>
          )}
          {applicant?.type && (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <div className="govuk-heading-s">Type</div>
                <p className="govuk-body">{capitaliseWord(applicant.type)}</p>
              </div>
            </div>
          )}
          {applicant?.address && (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <div className="govuk-heading-s">Address</div>
                <p className="govuk-body">
                  {applicant?.address?.sameAsSiteAddress
                    ? "Same as site"
                    : concatenateFieldsInOrder(applicant.address ?? {}, [
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
          <div className="govuk-heading-m">Applicants Agent</div>
          {(applicant?.agent?.name?.first || applicant?.agent?.name?.last) && (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <div className="govuk-heading-s">Name</div>
                <p className="govuk-body">
                  {applicant.agent?.name?.first} {applicant.agent?.name?.last}
                </p>
              </div>
            </div>
          )}
          {applicant?.agent?.address && (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-full">
                <div className="govuk-heading-s">Address</div>
                {concatenateFieldsInOrder(applicant?.agent.address ?? {}, [
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
