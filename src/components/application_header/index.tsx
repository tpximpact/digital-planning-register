import React from "react";
import { firstLetterUppercase } from "../../../util/capitaliseWord";

export const ApplicationHeader = ({
  reference,
  address,
}: {
  reference: string;
  address: any;
}) => {
  return (
    <div className="govuk-grid-row grid-row-extra-bottom-margin ">
      <div className="govuk-grid-column-one-quarter">
        <h2 className="govuk-heading-s">Application Reference</h2>
        <p className="govuk-body">{reference}</p>
      </div>
      <div className="govuk-grid-column-one-quarter">
        <h2 className="govuk-heading-s">Address</h2>
        <div className="govuk-body">
          {address.address_1 && `${firstLetterUppercase(address.address_1)}, `}
          {address.address_2 && `${firstLetterUppercase(address.address_2)}, `}
          {address.town && `${firstLetterUppercase(address.town)}, `}
          {address.postcode}
        </div>
      </div>
    </div>
  );
};

export default ApplicationHeader;
