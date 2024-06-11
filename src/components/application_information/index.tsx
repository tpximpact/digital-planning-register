import { BoundaryGeojson } from "../../../util/type";
import Map from "../map";
import { format } from "date-fns";
import { capitaliseWord } from "../../../util/capitaliseWord";
import { definedStatus } from "../../../util/formatStatus";
import ButtonDetails from "@/components/button_details";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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
  council: { council: string };
};

const ApplicationInformation = ({
  reference,
  application_type,
  site,
  received_date,
  result_flag,
  determination_date,
  status,
  consultation,
  boundary_geojson,
  description,
  in_assessment_at,
  council,
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

  const actionHandler = async (
    council: any,
    reference: string,
    _formData: FormData,
  ) => {
    "use server";
    cookies().set("council", council as string);
    cookies().set("reference", reference);
    redirect(`/${council}/comment`);
  };
  const updateActionHandler = actionHandler.bind(null, council, reference);
  return (
    <div>
      <div className="govuk-grid-row grid-row-extra-bottom-margin">
        <div className="govuk-grid-column-one-third-from-desktop">
          <h2 className="govuk-heading-s">Application Reference</h2>
          <p className="govuk-body" role="application-reference">
            {reference}
          </p>
        </div>

        <div className="govuk-grid-column-two-thirds-from-desktop">
          <h2 className="govuk-heading-s">Address</h2>
          <p className="govuk-body">
            {site?.address_1}, {site?.postcode}{" "}
          </p>
        </div>
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third app-map">
          {geometryType && coordinates && (
            <Map
              geojsonData={JSON.stringify({
                type: "Feature",
                geometry: {
                  type: geometryType,
                  coordinates,
                },
              })}
            />
          )}
        </div>

        <div className="govuk-grid-column-two-thirds-from-desktop key-info">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              <h2 className="govuk-heading-s">Application Type</h2>
              <p className="govuk-body" role="application-type">
                {capitaliseWord(application_type?.replace(/_/g, " ") as string)}
              </p>
            </div>

            <div className="govuk-grid-column-one-half">
              <h2 className="govuk-heading-s">Status</h2>

              <p
                className="govuk-tag--blue govuk-body"
                role="application-status"
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
              <h2 className="govuk-heading-s">Received date</h2>
              <p className="govuk-body">
                {received_date
                  ? format(new Date(received_date as string), "dd MMM yyyy")
                  : "Date not available"}
              </p>
            </div>
            <div className="govuk-grid-column-one-half">
              <h2 className="govuk-heading-s">Consultation end date</h2>
              <p className="govuk-body">
                {consultation?.end_date
                  ? format(new Date(consultation?.end_date), "dd MMM yyyy")
                  : "Date not available"}
              </p>
            </div>

            {/* <div className="govuk-grid-column-one-half">
              <h2 className="govuk-heading-s">Valid from date</h2>
              <p className="govuk-body">
                {in_assessment_at
                  ? format(new Date(in_assessment_at), "dd MMM yyyy")
                  : "Date not available"}
              </p>
            </div> */}
          </div>

          <div className="govuk-grid-row">
            {/* <div className="govuk-grid-column-one-half">
              <h2 className="govuk-heading-s">Published date</h2>
              <p className="govuk-body">
                {received_date
                  ? format(new Date(received_date as string), "dd MMM yyyy")
                  : "Date not available"}
              </p>
            </div> */}

            {/* <div className="govuk-grid-column-one-half">
              <h2 className="govuk-heading-s">Consultation end date</h2>
              <p className="govuk-body">
                {consultation?.end_date
                  ? format(new Date(consultation?.end_date), "dd MMM yyyy")
                  : "Date not available"}
              </p>
            </div> */}
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              <h2 className="govuk-heading-s">Decision Date</h2>
              <p className="govuk-body">
                {determination_date
                  ? format(new Date(determination_date), "dd MMM yyyy")
                  : "Date not available"}
              </p>
            </div>

            <div className="govuk-grid-column-one-half">
              <h2 className="govuk-heading-s">Decision</h2>

              {result_flag && (
                <p
                  className="govuk-tag--yellow govuk-body"
                  style={{ maxWidth: "fit-content", padding: "2px 10px" }}
                >
                  {capitaliseWord(result_flag)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <h2 className="govuk-heading-l">Description</h2>
      <p className="govuk-body" role="application-description">
        {description}
      </p>
      <div className="govuk-grid-row grid-row-extra-bottom-margin extra-top-margin">
        <div className="govuk-grid-column-full">
          <ButtonDetails actionHandler={updateActionHandler} />
          {/* <a
            href={`/${council}/comment`}
            role="button"
            className="govuk-button govuk-button--primary"
            data-module="govuk-button"
          >
            Comment on this application
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default ApplicationInformation;
