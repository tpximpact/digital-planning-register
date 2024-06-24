/* eslint-disable react/no-unescaped-entities */
import { redirect } from "next/navigation";
import config from "../../../util/config.json";
import { capitaliseWord } from "../../../util/capitaliseWord";
import { cookies } from "next/headers";
import { Config } from "../../../util/type";
import { getCookie } from "@/actions";

const CommentPersonalDetails = async ({
  council,
  reference,
  applicationId,
  searchParams,
}: {
  council: string;
  reference: string;
  applicationId: number;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const councilConfig: Config = config;
  const contactPlanningAdvice = councilConfig[council]?.contact_planning_advice;
  const corporatePrivacy = councilConfig[council]?.corporate_privacy_statement;
  const planningServicePrivacyStatement =
    councilConfig[council]?.planning_service_privacy_statement;

  const personalDetailsCookie = await getCookie("personalDetails", reference);
  const personalDetails = personalDetailsCookie
    ? JSON.parse(personalDetailsCookie)
    : {};

  const errorCookies = await getCookie("validationErrors", reference);
  const validationErrors = errorCookies ? JSON.parse(errorCookies) : {};
  const isEditing = searchParams.edit === "true";
  const isConsentChecked = personalDetails.consent === "on";

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="govuk-heading-l">Your details</h1>
        <form
          action={`/${council}/${reference}/submit-comment-redirect?page=4`}
          method="POST"
        >
          <input type="hidden" name="council" value={council} />
          <input type="hidden" name="reference" value={reference} />{" "}
          <input type="hidden" name="applicationId" value={applicationId} />
          <input
            type="hidden"
            name="isEditing"
            value={isEditing ? "true" : "false"}
          />
          <div
            className={`govuk-form-group ${
              validationErrors.name ? "govuk-form-group--error" : ""
            }`}
          >
            <label className="govuk-label" htmlFor="name">
              Name
            </label>
            {validationErrors.name && (
              <p id="form-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> Your name
                is required
              </p>
            )}
            <input
              className={`govuk-input govuk-input--width-20 ${
                validationErrors.name ? "govuk-input--error" : ""
              }`}
              id="name"
              name="name"
              type="text"
              defaultValue={personalDetails.name || ""}
            />
          </div>
          <div
            className={`govuk-form-group ${
              validationErrors.address ? "govuk-form-group--error" : ""
            }`}
          >
            <label className="govuk-label" htmlFor="address">
              Address
            </label>
            {validationErrors.address && (
              <p id="form-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> Your
                address is required
              </p>
            )}
            <input
              className={`govuk-input govuk-input--width-20 ${
                validationErrors.address ? "govuk-input--error" : ""
              }`}
              id="address"
              name="address"
              type="text"
              defaultValue={personalDetails.address || ""}
            />
          </div>
          <div
            className={`govuk-form-group ${
              validationErrors.postcode ? "govuk-form-group--error" : ""
            }`}
          >
            <label className="govuk-label" htmlFor="postcode">
              Postcode
            </label>
            {validationErrors.postcode && (
              <p id="form-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> A valid
                postcode is required
              </p>
            )}
            <input
              className={`govuk-input govuk-input--width-10 ${
                validationErrors.postcode ? "govuk-input--error" : ""
              }`}
              id="postcode"
              name="postcode"
              type="text"
              defaultValue={personalDetails.postcode || ""}
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
              defaultValue={personalDetails.emailAddress || ""}
            />
          </div>
          <div
            className={`govuk-form-group ${validationErrors.telephoneNumber ? "govuk-form-group--error" : ""}`}
          >
            <label className="govuk-label" htmlFor="telephone-number">
              Telephone number
            </label>
            <div className="govuk-hint">Optional</div>
            {validationErrors.telephoneNumber && (
              <p id="form-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span>A valid
                telephone number is required
              </p>
            )}
            <input
              className={`govuk-input govuk-input--width-20 ${validationErrors.telephoneNumber ? "govuk-input--error" : ""}`}
              id="telephone-number"
              name="telephone-number"
              type="text"
              defaultValue={personalDetails.telephoneNumber || ""}
            />
          </div>
          <div
            className={`govuk-form-group ${
              validationErrors.consent ? "govuk-form-group--error" : ""
            }`}
          >
            {validationErrors.consent && (
              <p id="form-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error: </span> You need
                to consent
              </p>
            )}
            <div className="govuk-checkboxes" data-module="govuk-checkboxes">
              <div className="govuk-checkboxes__item">
                <input
                  className={`govuk-checkboxes__input ${
                    validationErrors.consent ? "govuk-input--error" : ""
                  }`}
                  id="consent"
                  name="consent"
                  type="checkbox"
                  value="on"
                  defaultChecked={isConsentChecked}
                />
                <label
                  className="govuk-label govuk-checkboxes__label"
                  htmlFor="consent"
                >
                  I consent to {capitaliseWord(council)} Council using my data
                  for the purposes of assessing this planning application
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
              <p className="govuk-body">
                We need your name and contact information because can only
                formally explore comments coming from people who live close to
                the proposed development. We will also use this to contact you
                if the planning decision regarding this application is appealed.
              </p>
              <p className="govuk-body">
                Your comments will be made available online for the public to
                see. We will not include your name, address, telephone number or
                email address.
              </p>
              <p className="govuk-body">
                We'll make sure any other personal or sensitive information is
                removed where needed, in line with the{" "}
                <a
                  className="govuk-link govuk-link--no-visited-state"
                  href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/personal-information-what-is-it/what-is-personal-information-a-guide/"
                  target="_blank"
                >
                  General Data Protection Regulation (GDPR).
                </a>{" "}
                {""}
                If you have concerns about any data you have sent being
                published,{" "}
                <a
                  className="govuk-link govuk-link--no-visited-state"
                  href={contactPlanningAdvice}
                  target="_blank"
                >
                  contact the Planning Advice and Information Service.
                </a>
              </p>
              <p className="govuk-body">
                Read our {""}
                <a
                  className="govuk-link govuk-link--no-visited-state"
                  href={corporatePrivacy}
                  target="_blank"
                >
                  {""}
                  corporate privacy statement
                </a>
                and our {""}
                <a
                  className="govuk-link govuk-link--no-visited-state"
                  href={planningServicePrivacyStatement}
                  target="_blank"
                >
                  planning service statement
                </a>{" "}
                {""}
                for more information.
              </p>
            </div>
          </details>
          <button
            type="submit"
            className="govuk-button"
            data-module="govuk-button"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
export default CommentPersonalDetails;
