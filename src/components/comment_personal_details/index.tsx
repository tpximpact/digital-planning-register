/* eslint-disable react/no-unescaped-entities */
import config from "../../../util/config.json";
const CommentPersonalDetails = ({ council }: { council: string }) => {
  const councilConfig = config as any;
  const contactPlanningAdvice = councilConfig[council]?.contact_planning_advice;
  const corporatePrivacy = councilConfig[council]?.corporate_privacy_statement;
  const planningServicePrivacyStatement =
    councilConfig[council]?.planning_service_privacy_statement;
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="govuk-heading-l">Your details</h1>
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="name">
            Name
          </label>
          <input
            className="govuk-input govuk-input--width-20"
            id="name"
            name="name"
            type="text"
          />
        </div>
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="address">
            Address
          </label>
          <input
            className="govuk-input govuk-input--width-20"
            id="address"
            name="address"
            type="text"
          />
        </div>
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="postcode">
            Postcode
          </label>
          <input
            className="govuk-input govuk-input--width-10"
            id="postcode"
            name="postcode"
            type="text"
          />
        </div>
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="email-address">
            Email address
          </label>
          <div className="govuk-hint">Optional</div>
          <input
            className="govuk-input govuk-input--width-20"
            id="email-address"
            name="email-address"
            type="text"
          />
        </div>
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="telephone-number">
            Telephone number
          </label>
          <div className="govuk-hint">Optional</div>
          <input
            className="govuk-input govuk-input--width-20"
            id="telephone-number"
            name="telephone-number"
            type="text"
          />
        </div>
        <div className="govuk-form-group">
          <div className="govuk-checkboxes" data-module="govuk-checkboxes">
            <div className="govuk-checkboxes__item">
              <input
                className="govuk-checkboxes__input"
                id="consent"
                name="consent"
                type="checkbox"
                value="carcasses"
              />
              <label
                className="govuk-label govuk-checkboxes__label"
                htmlFor="consent"
              >
                I consent to Lambeth Council using my data for the purposes of
                assessing this planning application
              </label>
            </div>
          </div>
        </div>
        <details className="govuk-details">
          <summary className="govuk-details__summary">
            <span className="govuk-details__summary-text">
              How we handle your data
            </span>
          </summary>
          <div className="govuk-details__text">
            We need your name and contact information because can only formally
            explore comments coming from people who live close to the proposed
            development. We will also use this to contact you if the planning
            decision regarding this application is appealed. Your comments will
            be made available online for the public to see. We will not include
            your name, address, telephone number or email address. We'll make
            sure any other personal or sensitive information is removed where
            needed, in line with the{" "}
            <a
              className="govuk-link govuk-link--no-visited-state"
              href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/personal-information-what-is-it/what-is-personal-information-a-guide/"
              target="_blank"
            >
              General Data Protection Regulation (GDPR).
            </a>
            If you have concerns about any data you have sent being published,
            <a
              className="govuk-link govuk-link--no-visited-state"
              href={contactPlanningAdvice}
              target="_blank"
            >
              contact the Planning Advice and Information Service.
            </a>
            Read our
            <a
              className="govuk-link govuk-link--no-visited-state"
              href={corporatePrivacy}
              target="_blank"
            >
              corporate privacy statement
            </a>{" "}
            and our{" "}
            <a
              className="govuk-link govuk-link--no-visited-state"
              href={planningServicePrivacyStatement}
              target="_blank"
            >
              planning service statement
            </a>{" "}
            for more information.
          </div>
        </details>
        <button
          type="submit"
          className="govuk-button"
          data-module="govuk-button"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
export default CommentPersonalDetails;
