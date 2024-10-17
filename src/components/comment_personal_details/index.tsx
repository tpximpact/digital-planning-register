"use client";
import React, { useEffect, useRef, useState } from "react";
import { capitaliseWord } from "@/util";
import { emailValidation, phoneValidation, postcodeValidation } from "@/util";
import { getAppConfig } from "@/config";

interface PersonalDetails {
  name: string;
  address: string;
  postcode: string;
  emailAddress: string;
  telephoneNumber: string;
  consent: boolean;
}

interface ValidationErrors {
  name?: string;
  address?: string;
  postcode?: string;
  emailAddress?: string;
  telephoneNumber?: string;
  consent?: string;
}

const CommentPersonalDetails = ({
  council,
  reference,
  navigateToPage,
  isEditing,
  updateProgress,
  hideContinue,
}: {
  council: string;
  reference: string;
  navigateToPage: (page: number, params?: object) => void;
  isEditing: boolean;
  updateProgress: (completedPage: number) => void;
  hideContinue?: boolean;
}) => {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    name: "",
    address: "",
    postcode: "",
    emailAddress: "",
    telephoneNumber: "",
    consent: false,
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );

  const appConfig = getAppConfig(council);
  const contactPlanningAdviceLink =
    appConfig?.council?.pageContent
      ?.council_reference_submit_comment_personal_details
      ?.contact_planning_advice_link;
  const corporatePrivacyLink =
    appConfig?.council?.pageContent
      ?.council_reference_submit_comment_personal_details
      ?.corporate_privacy_statement_link;
  const planningServicePrivacyStatementLink =
    appConfig?.council?.pageContent
      ?.council_reference_submit_comment_personal_details
      ?.planning_service_privacy_statement_link;

  useEffect(() => {
    const storedDetails = sessionStorage.getItem(
      `personalDetails_${reference}`,
    );
    if (storedDetails) {
      setPersonalDetails(JSON.parse(storedDetails));
    }
  }, [reference]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPersonalDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setValidationErrors({});
  };

  const validatePersonalDetails = (): boolean => {
    const errors: ValidationErrors = {};
    if (!personalDetails.name) errors.name = "Your name is required";
    if (!personalDetails.address) errors.address = "Your address is required";
    if (!postcodeValidation(personalDetails.postcode))
      errors.postcode = "A valid postcode is required";
    if (
      personalDetails.emailAddress &&
      !emailValidation(personalDetails.emailAddress)
    )
      errors.emailAddress = "Email address must be valid";
    if (
      personalDetails.telephoneNumber &&
      !phoneValidation(personalDetails.telephoneNumber)
    )
      errors.telephoneNumber = "Telephone number must be valid";
    if (!personalDetails.consent) errors.consent = "You need to consent";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePersonalDetails()) {
      sessionStorage.setItem(
        `personalDetails_${reference}`,
        JSON.stringify(personalDetails),
      );
      updateProgress(4);
      navigateToPage(5);
    }
  };

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="govuk-heading-l">Your details</h1>
        <form onSubmit={handleSubmit}>
          {/* Name input */}
          <div
            className={`govuk-form-group ${validationErrors.name ? "govuk-form-group--error" : ""}`}
          >
            <label className="govuk-label" htmlFor="name">
              Name
            </label>
            {validationErrors.name && (
              <p id="name-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span>{" "}
                {validationErrors.name}
              </p>
            )}
            <input
              className={`govuk-input govuk-input--width-20 ${validationErrors.name ? "govuk-input--error" : ""}`}
              id="name"
              name="name"
              type="text"
              value={personalDetails.name}
              onChange={handleInputChange}
            />
          </div>

          {/* Address input */}
          <div
            className={`govuk-form-group ${validationErrors.address ? "govuk-form-group--error" : ""}`}
          >
            <label className="govuk-label" htmlFor="address">
              Address
            </label>
            {validationErrors.address && (
              <p id="address-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span>{" "}
                {validationErrors.address}
              </p>
            )}
            <input
              className={`govuk-input govuk-input--width-20 ${validationErrors.address ? "govuk-input--error" : ""}`}
              id="address"
              name="address"
              type="text"
              value={personalDetails.address}
              onChange={handleInputChange}
            />
          </div>

          {/* Postcode input */}
          <div
            className={`govuk-form-group ${validationErrors.postcode ? "govuk-form-group--error" : ""}`}
          >
            <label className="govuk-label" htmlFor="postcode">
              Postcode
            </label>
            {validationErrors.postcode && (
              <p id="postcode-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span>{" "}
                {validationErrors.postcode}
              </p>
            )}
            <input
              className={`govuk-input govuk-input--width-10 ${validationErrors.postcode ? "govuk-input--error" : ""}`}
              id="postcode"
              name="postcode"
              type="text"
              value={personalDetails.postcode}
              onChange={handleInputChange}
              autoComplete="postal-code"
            />
          </div>

          {/* Email address input */}
          <div
            className={`govuk-form-group ${validationErrors.emailAddress ? "govuk-form-group--error" : ""}`}
          >
            <label className="govuk-label" htmlFor="emailAddress">
              Email address
            </label>
            <div className="govuk-hint">Optional</div>
            {validationErrors.emailAddress && (
              <p id="email-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span>{" "}
                {validationErrors.emailAddress}
              </p>
            )}
            <input
              className={`govuk-input govuk-input--width-20 ${validationErrors.emailAddress ? "govuk-input--error" : ""}`}
              id="emailAddress"
              name="emailAddress"
              type="text"
              value={personalDetails.emailAddress}
              onChange={handleInputChange}
              spellCheck="false"
              autoComplete="email"
            />
          </div>

          {/* Telephone number input */}
          <div
            className={`govuk-form-group ${validationErrors.telephoneNumber ? "govuk-form-group--error" : ""}`}
          >
            <label className="govuk-label" htmlFor="telephoneNumber">
              Telephone number
            </label>
            <div className="govuk-hint">Optional</div>
            {validationErrors.telephoneNumber && (
              <p id="telephone-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span>{" "}
                {validationErrors.telephoneNumber}
              </p>
            )}
            <input
              className={`govuk-input govuk-input--width-20 ${validationErrors.telephoneNumber ? "govuk-input--error" : ""}`}
              id="telephoneNumber"
              name="telephoneNumber"
              type="tel"
              value={personalDetails.telephoneNumber}
              onChange={handleInputChange}
              autoComplete="tel"
            />
          </div>

          {/* Consent checkbox */}
          <div
            className={`govuk-form-group ${validationErrors.consent ? "govuk-form-group--error" : ""}`}
          >
            {validationErrors.consent && (
              <p id="consent-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error: </span>{" "}
                {validationErrors.consent}
              </p>
            )}
            <div className="govuk-checkboxes" data-module="govuk-checkboxes">
              <div className="govuk-checkboxes__item">
                <input
                  className={`govuk-checkboxes__input ${validationErrors.consent ? "govuk-input--error" : ""}`}
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={personalDetails.consent}
                  onChange={handleInputChange}
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
                see.
              </p>
              <p className="govuk-body">
                We&apos;ll make sure any other personal or sensitive information
                is removed where needed, in line with the{" "}
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
                  href={contactPlanningAdviceLink}
                  target="_blank"
                >
                  contact the Planning Advice and Information Service.
                </a>
              </p>
              <p className="govuk-body">
                Read our {""}
                <a
                  className="govuk-link govuk-link--no-visited-state"
                  href={corporatePrivacyLink}
                  target="_blank"
                >
                  {""}
                  corporate privacy statement
                </a>
                and our {""}
                <a
                  className="govuk-link govuk-link--no-visited-state"
                  href={planningServicePrivacyStatementLink}
                  target="_blank"
                >
                  planning service statement
                </a>{" "}
                {""}
                for more information.
              </p>
            </div>
          </details>
          {!hideContinue && (
            <button
              type="submit"
              className="govuk-button"
              data-module="govuk-button"
            >
              Continue
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CommentPersonalDetails;
