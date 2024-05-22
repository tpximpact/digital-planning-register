export default function DesktopHeader() {
  return (
    <div className="govuk-grid-row responsive-table-row responsive-table-header ">
      <div className="govuk-grid-column-one-quarter">
        <div className="govuk-grid-column-one-half responsive-cell">
          <h2 className="govuk-heading-s">Application Reference</h2>
        </div>
        <div className="govuk-grid-column-one-half responsive-cell">
          <h2 className="govuk-heading-s">Address</h2>
        </div>
      </div>

      <div className="govuk-grid-column-one-half">
        <div className="govuk-grid-column-two-thirds responsive-cell">
          <h2 className="govuk-heading-s">Description</h2>
        </div>
        <div className="govuk-grid-column-one-third responsive-cell">
          <h2 className="govuk-heading-s">Application type</h2>
        </div>
      </div>

      <div className="govuk-grid-column-one-quarter">
        <div className="govuk-grid-column-one-half responsive-cell">
          <h2 className="govuk-heading-s">Date submitted</h2>
        </div>
        <div className="govuk-grid-column-one-half responsive-cell">
          <h2 className="govuk-heading-s">Status</h2>
        </div>
      </div>
    </div>
  );
}
