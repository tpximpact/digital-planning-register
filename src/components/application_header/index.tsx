import React from "react";
import { capitaliseWord } from "../../../util/capitaliseWord";

import { V2PlanningApplicationsReference } from "@/types";

interface ApplicationHeaderProps
  extends Pick<V2PlanningApplicationsReference, "site"> {
  reference: string;
}

export const ApplicationHeader = ({
  reference,
  site,
}: ApplicationHeaderProps) => {
  return (
    <div className="govuk-grid-row grid-row-extra-bottom-margin ">
      <div className="govuk-grid-column-one-quarter">
        <h2 className="govuk-heading-s">Application Reference</h2>
        <p className="govuk-body">{reference}</p>
      </div>
      <div className="govuk-grid-column-one-quarter">
        <h2 className="govuk-heading-s">Address</h2>
        <div className="govuk-body">
          {site.address_1 && `${capitaliseWord(site.address_1)}, `}
          {site.address_2 && `${capitaliseWord(site.address_2)}, `}
          {site.town && `${capitaliseWord(site.town)}, `}
          {site.postcode}
        </div>
      </div>
    </div>
  );
};

export default ApplicationHeader;
