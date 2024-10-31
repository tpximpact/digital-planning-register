import { DprApplicationSubmissionSubtopicValue } from "@/types";
import { ApplicationMapLoader } from "../ApplicationMap";

export const Row = ({
  description,
  value,
  map,
}: DprApplicationSubmissionSubtopicValue): React.ReactNode => {
  if (!map && value === null) {
    return null;
  }

  return (
    <dl className="govuk-summary-list__row">
      <dt className="govuk-summary-list__key">{description}</dt>
      <dd className="govuk-summary-list__value">
        {/* show a map if map is present */}
        {map && (
          <ApplicationMapLoader
            reference={`${description.split(" ").join("-")}-application-submission`}
            mapData={map}
            description=""
            mapType="application-show"
          />
        )}
        {typeof value === "string" ? (
          <p className="govuk-body">{value}</p>
        ) : (
          <>{value}</>
        )}
      </dd>
    </dl>
  );
};
