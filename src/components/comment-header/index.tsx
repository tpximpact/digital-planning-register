/* eslint-disable react/no-unescaped-entities */
import Map from "../map";
const CommentHeader = () => {
  return (
    <>
      <h1 className="govuk-heading-l">Tell us what you think</h1>

      <div className="govuk-grid-row grid-row-extra-bottom-margin">
        <div className="govuk-grid-column-one-third">
          {/* {geometryType && coordinates && (
            <Map
              geojsonData={JSON.stringify({
                type: "Feature",
                geometry: {
                  type: geometryType,
                  coordinates,
                },
              })}
            />
          )} */}
        </div>
        <div className="govuk-grid-column-two-thirds">
          <h2 className="govuk-heading-m">11 Abbey Gardens, SE16 3RQ</h2>
          <h2 className="govuk-heading-s">Application Reference</h2>
          <p className="govuk-body">SWK-23-00141-HAPP</p>
          <p className="govuk-body">
            Your feedback helps us improve developments so they meet the needs
            of people in Camden. It's important you let us know what you think.
          </p>
        </div>
      </div>
    </>
  );
};

export default CommentHeader;
