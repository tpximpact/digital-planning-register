const ApplicationConstraints = () => {
    return(
    <>
        <h2 className="govuk-heading-l" role="constraints-title">Constraints</h2>
        <p className="govuk-body"><em>Planning constraints, guidance and designations that intersect with the proposed site</em></p>

        <div className="govuk-grid-row">    
            <div className="govuk-grid-column-one-third">
                <h3 className="govuk-heading-s">General policy</h3>
                <p className="govuk-body">Article 4 direction areas</p>
                <p className="govuk-body"><a href="#" className="govuk-link govuk-link--no-visited-state">Source</a></p>
            </div>

            <div className="govuk-grid-column-one-third">
                <h3 className="govuk-heading-s">Heritage conservation area</h3>
                <p className="govuk-body"><a href="#" className="govuk-link govuk-link--no-visited-state">Source</a></p>
            </div>
    
            <div className="govuk-grid-column-one-third">
                <h3 className="govuk-heading-s">General policy</h3>
                <p className="govuk-body">Classified roads</p>
                <p className="govuk-body"><a href="#" className="govuk-link govuk-link--no-visited-state">Source</a></p>
            </div>
        </div>

        <div className="govuk-grid-row grid-row-extra-bottom-margin">
            <div className="govuk-grid-column-two-thirds">
                 <h3 className="govuk-heading-m">Sources</h3>
                <p className="govuk-body"><em>A list of open data requests or websites that explain how these constraints were sourced</em></p>
                <p className="govuk-body"><a href="#" className="govuk-link govuk-link--no-visited-state">DE-9IM spatial relationship definition of intersects</a></p>
            </div>
        </div> 
    </>
    )
}

export default ApplicationConstraints