import { BoundaryGeojson } from "../../../util/type";
import dynamic from "next/dynamic";
import { format } from "date-fns";
import { capitaliseWord } from "../../../util/capitaliseWord";
import { definedDecision } from "../../..//util/formatDecision";
import { definedStatus } from "../../../util/formatStatus";
import ButtonDetails from "@/components/button_details";

const DynamicMap = dynamic(() => import("../map"), {
  ssr: false,
  loading: () => <div>Loading map...</div>,
});

type ApplicationInfo = {
  reference: string;
  application_type: string;
  site: { address_1: string; postcode: string };
  received_date: string;
  result_flag: string;
  determination_date: string;
  status: string;
  consultation: { end_date: string };
  boundary_geojson: BoundaryGeojson;
  description: string;
  in_assessment_at: string;
  council: string;
  id: number;
  decision: string;
};

const ApplicationInformation = ({
  reference,
  application_type,
  site,
  received_date,
  result_flag,
  decision,
  determination_date,
  status,
  consultation,
  boundary_geojson,
  description,
  in_assessment_at,
  council,
  id,
}: ApplicationInfo) => {
  const boundaryGeojson = boundary_geojson;

  let geometryType: "Polygon" | "MultiPolygon" | undefined;
  let coordinates: number[][][] | number[][][][] | undefined;

  if (boundaryGeojson?.type === "Feature") {
    geometryType = boundaryGeojson.geometry?.type;
    coordinates = boundaryGeojson.geometry?.coordinates;
  } else if (boundaryGeojson?.type === "FeatureCollection") {
    const features = boundaryGeojson.features;
    if (features && features.length > 0) {
      geometryType = features[0].geometry?.type;
      coordinates = features[0].geometry?.coordinates;
    }
  }

  const geojsonData =
    geometryType && coordinates
      ? JSON.stringify({
          type: "Feature",
          geometry: {
            type: geometryType,
            coordinates,
          },
        })
      : null;

  return (
    <div>
      <div className="govuk-grid-row grid-row-extra-bottom-margin">
        <div className="govuk-grid-column-one-third-from-desktop">
          <div className="govuk-heading-s">Application Reference</div>
          <p className="govuk-body" id="application-reference">
            {reference}
          </p>
        </div>

        <div className="govuk-grid-column-two-thirds-from-desktop">
          <div className="govuk-heading-s">Address</div>
          <p className="govuk-body">
            {site?.address_1}, {site?.postcode}{" "}
          </p>
        </div>
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third app-map">
          {geojsonData && <DynamicMap geojsonData={geojsonData} />}
        </div>

        <div className="govuk-grid-column-two-thirds-from-desktop key-info">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              <div className="govuk-heading-s">Application Type</div>
              <p className="govuk-body" id="application-type">
                {capitaliseWord(application_type?.replace(/_/g, " ") as string)}
              </p>
            </div>

            <div className="govuk-grid-column-one-half">
              <div className="govuk-heading-s">Status</div>

              <p
                className="govuk-tag--blue govuk-body"
                id="application-status"
                style={{ maxWidth: "fit-content", padding: "2px 10px" }}
              >
                {definedStatus(
                  status as string,
                  consultation?.end_date as string,
                )}
              </p>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              <div className="govuk-heading-s">Received date</div>
              <p className="govuk-body">
                {received_date
                  ? format(new Date(received_date as string), "dd MMM yyyy")
                  : "Date not available"}
              </p>
            </div>
            <div className="govuk-grid-column-one-half">
              <div className="govuk-heading-s">Consultation end date</div>
              <p className="govuk-body">
                {consultation?.end_date
                  ? format(new Date(consultation?.end_date), "dd MMM yyyy")
                  : "Date not available"}
              </p>
            </div>

            {/* <div className="govuk-grid-column-one-half">
      <div className="govuk-heading-s">Valid from date</div>
      <p className="govuk-body">
        {in_assessment_at
          ? format(new Date(in_assessment_at), "dd MMM yyyy")
          : "Date not available"}
      </p>
    </div> */}
          </div>

          <div className="govuk-grid-row">
            {/* <div className="govuk-grid-column-one-half">
      <div className="govuk-heading-s">Published date</div>
      <p className="govuk-body">
        {received_date
          ? format(new Date(received_date as string), "dd MMM yyyy")
          : "Date not available"}
      </p>
    </div> */}

            {/* <div className="govuk-grid-column-one-half">
      <div className="govuk-heading-s">Consultation end date</div>
      <p className="govuk-body">
        {consultation?.end_date
          ? format(new Date(consultation?.end_date), "dd MMM yyyy")
          : "Date not available"}
      </p>
    </div> */}
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              {determination_date && decision && (
                <>
                  <div className="govuk-heading-s">Decision Date</div>
                  <p className="govuk-body">
                    {format(new Date(determination_date), "dd MMM yyyy")}
                  </p>
                </>
              )}
            </div>

            <div className="govuk-grid-column-one-half">
              {decision && determination_date && (
                <>
                  <div className="govuk-heading-s">Decision</div>
                  <p
                    className="govuk-tag--yellow govuk-body"
                    style={{ maxWidth: "fit-content", padding: "2px 10px" }}
                  >
                    {definedDecision(decision, application_type as string)}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="govuk-heading-l">Description</div>
      <p className="govuk-body" id="application-description">
        {description}
      </p>
      <div className="govuk-grid-row grid-row-extra-bottom-margin extra-top-margin">
        <div className="govuk-grid-column-full">
          <ButtonDetails
            council={council}
            reference={reference}
            applicationId={id}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationInformation;
