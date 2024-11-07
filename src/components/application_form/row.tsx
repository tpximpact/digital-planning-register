import { DprApplicationSubmissionSubtopicValue } from "@/types";
import ApplicationMap from "../application_map";

export const Row = ({
  description,
  value,
  map,
}: DprApplicationSubmissionSubtopicValue): React.ReactNode => {
  if (!map && value === null) {
    return null;
  }

  // @todo apply <SummaryList /> <SummaryCard /> components here
  return (
    <dl className="govuk-summary-list__row">
      <dt className="govuk-summary-list__key">{description}</dt>
      <dd className="govuk-summary-list__value">
        {/* show a map if map is present */}
        {map && (
          <ApplicationMap
            mapData={map}
            reference={`${description.split(" ").join("-")}-application-submission`}
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
