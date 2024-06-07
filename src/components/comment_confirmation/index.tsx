/* eslint-disable react/no-unescaped-entities */
import Map from "../map";
const CommentConfirmation = () => {
  return (
    <>
      <div className="govuk-panel govuk-panel--confirmation">
        <h1 className="govuk-panel__title">Application complete</h1>
        <div className="govuk-panel__body">
          Your reference number
          <br />
          <strong>HDJ2123F</strong>
        </div>
      </div>
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
      <h2 className="govuk-heading-m">
        Discover other planning applications in your area
      </h2>
      <p className="govuk-body">
        If you're interested in learning more about planning applications in
        your area, you can view all currently active applications and provide
        comments on them.
      </p>

      <a
        href="/camden"
        role="button"
        className="govuk-button govuk-button--secondary button-extra-right-margin"
        data-module="govuk-button"
      >
        Back to application search
      </a>
    </>
  );
};

export default CommentConfirmation;
