import React from "react";

interface ApplicationHeaderProps {
  reference: string;
  address?: string;
}

export const ApplicationHeader = ({
  reference,
  address,
}: ApplicationHeaderProps) => {
  return (
    <div className="govuk-grid-row grid-row-extra-bottom-margin ">
      <div className="govuk-grid-column-one-quarter">
        <h2 className="govuk-heading-s">Application Reference</h2>
        <p className="govuk-body">{reference}</p>
      </div>
      {address && (
        <div className="govuk-grid-column-one-quarter">
          <h2 className="govuk-heading-s">Address</h2>
          <div className="govuk-body">{address}</div>
        </div>
      )}
    </div>
  );
};

export default ApplicationHeader;
