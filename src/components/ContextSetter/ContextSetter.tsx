import { DprApplication } from "@/types";
import ApplicationMap from "../ApplicationMap";
import Link from "next/link";

export interface ContextSetterProps {
  councilSlug: string;
  application: DprApplication;
  text?: JSX.Element;
}

export const ContextSetter = ({
  councilSlug,
  application,
  text,
}: ContextSetterProps) => {
  const reference = application.application.reference;
  const applicationLink =
    (councilSlug && reference) ?? `/${councilSlug}/${reference}`;
  return (
    <div className="govuk-grid-row grid-row-extra-bottom-margin">
      <p></p>
      <div className="govuk-grid-column-one-quarter">
        <ApplicationMap
          staticMap={true}
          reference={reference}
          mapData={application.property.boundary.site}
          zoom={24}
          modifier={"context-setter"}
        />
      </div>
      <div className="govuk-grid-column-three-quarters">
        {application.property.address.singleLine && (
          <h2 className="govuk-heading-m">
            {application.property.address.singleLine}
          </h2>
        )}
        {reference && (
          <>
            <h2 className="govuk-heading-s">Application Reference</h2>
            <p>
              {applicationLink ? (
                <Link
                  className="govuk-link"
                  href={`/${councilSlug}/${reference}`}
                >
                  {reference}
                </Link>
              ) : (
                <>{reference}</>
              )}
            </p>
          </>
        )}

        {text && <>{text}</>}
      </div>
    </div>
  );
};
