const ApplicationLocation = () => {
    return(
        <>
        {/* Add real data when available */}
            <h2 className="govuk-heading-l" role="location-title">Location</h2>
            <div className="govuk-grid-row  grid-row-extra-bottom-margin">   
                <div className="govuk-grid-column">
                    <div className="govuk-grid-column-one-quarter">
                        <h3 className="govuk-heading-s">Property type</h3>
                        <p className="govuk-body">Smallholding</p>
                    </div>
                </div>

            <div className="govuk-grid-column">
                <div className="govuk-grid-column-one-quarter">
                    <h3 className="govuk-heading-s">Region</h3>
                    <p className="govuk-body">London</p>
                </div>
            </div>

            <div className="govuk-grid-column">
                <div className="govuk-grid-column-one-quarter">
                    <h3 className="govuk-heading-s">Local authority district</h3>
                    <p className="govuk-body">Camden</p>
                </div>
            </div>

            <div className="govuk-grid-column">
                <div className="govuk-grid-column-one-quarter">
                    <h3 className="govuk-heading-s">Energy Performance Certificate</h3>
                    <p className="govuk-body">(string)</p>
                </div>
            </div>
        </div>
        </>
    )
}
export default ApplicationLocation