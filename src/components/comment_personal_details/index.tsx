/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

"use client";
import React, { useEffect, useRef, useState } from "react";
import { emailValidation, phoneValidation, postcodeValidation } from "@/util";
import { sendGTMEvent } from "@next/third-parties/google";
import { AppConfig } from "@/config/types";
import { Details } from "../govukDpr/Details";
import { Button } from "@/components/button";

type PersonalDetailKeys = keyof PersonalDetails;
export interface PersonalDetails {
  name: string;
  address: string;
  postcode: string;
  emailAddress?: string;
  telephoneNumber?: string;
}

const CommentPersonalDetails = ({
  councilConfig,
  reference,
  navigateToPage,
  updateProgress,
  hideContinue,
}: {
  councilConfig: AppConfig["council"];
  reference: string;
  navigateToPage: (page: number, params?: object) => void;
  updateProgress: (completedPage: number) => void;
  hideContinue?: boolean;
}) => {
  const [personalDetails, setPersonalDetails] = useState<
    Partial<PersonalDetails> | undefined
  >(undefined);
  const [validationErrors, setValidationErrors] = useState<
    Partial<PersonalDetails> | undefined
  >(undefined);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const fieldRefs: Record<string, React.RefObject<HTMLDivElement>> = {
    name: useRef<HTMLDivElement>(null),
    address: useRef<HTMLDivElement>(null),
    postcode: useRef<HTMLDivElement>(null),
    emailAddress: useRef<HTMLDivElement>(null),
    telephoneNumber: useRef<HTMLDivElement>(null),
  };

  const contactPlanningAdviceLink =
    councilConfig?.pageContent
      ?.council_reference_submit_comment_personal_details
      ?.contact_planning_advice_link;
  const corporatePrivacyLink =
    councilConfig?.pageContent
      ?.council_reference_submit_comment_personal_details
      ?.corporate_privacy_statement_link;
  const planningServicePrivacyStatementLink =
    councilConfig?.pageContent
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

  const handleInputChange = (
    key: PersonalDetailKeys,
    target: EventTarget & HTMLInputElement,
  ) => {
    const { value, type, checked } = target;
    const newValue = type === "checkbox" ? checked : value;

    setPersonalDetails({
      ...personalDetails,
      [key]: newValue,
    });

    if (hasSubmitted) {
      const { [key]: removed, ...errors } = {
        ...validationErrors,
      };

      setValidationErrors(errors);
    }
  };

  const scrollToError = (errors: Partial<PersonalDetails>) => {
    const firstErrorField = Object.keys(errors)[0];
    const errorRef = fieldRefs[firstErrorField];

    if (errorRef?.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

      const input = errorRef.current.querySelector("input");
      if (input) {
        input.focus();
      }
    }
  };

  const validatePersonalDetails = (): boolean => {
    const errors: Partial<PersonalDetails> = {};

    const allErrors: Record<PersonalDetailKeys, string> = {
      name: "Your name is required",
      address: "Your address is required",
      postcode: "A valid postcode is required",
      emailAddress: "Email address must be valid",
      telephoneNumber: "Telephone number must be valid",
    };

    const allRequired: PersonalDetailKeys[] = ["name", "address", "postcode"];

    // Check if all required fields are present and not empty
    const hasAllRequired = allRequired.every(
      (key) => personalDetails?.[key] && personalDetails[key]?.trim() !== "",
    );

    if (!hasAllRequired) {
      allRequired.forEach((key) => {
        if (!personalDetails?.[key] || personalDetails[key]?.trim() === "") {
          errors[key] = allErrors[key];
        }
      });
    }

    // Validate specific fields
    if (
      personalDetails?.postcode &&
      !postcodeValidation(personalDetails.postcode)
    ) {
      errors.postcode = allErrors.postcode;
    }
    if (
      personalDetails?.emailAddress &&
      !emailValidation(personalDetails.emailAddress)
    ) {
      errors.emailAddress = allErrors.emailAddress;
    }
    if (
      personalDetails?.telephoneNumber &&
      !phoneValidation(personalDetails.telephoneNumber)
    ) {
      errors.telephoneNumber = allErrors.telephoneNumber;
    }

    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      setValidationErrors(errors);
      sendGTMEvent({
        event: "comment_validation_error",
        message: "error in personal details",
      });
      scrollToError(errors);
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

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
        <h2 className="govuk-heading-l">Your details</h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Name input */}
          <div
            ref={fieldRefs.name}
            className={`govuk-form-group ${validationErrors?.name ? "govuk-form-group--error" : ""}`}
          >
            <label className="govuk-label" htmlFor="name">
              Name
            </label>
            {validationErrors?.name && (
              <p id="name-error" className="govuk-error-message" role="alert">
                <span className="govuk-visually-hidden">Error:</span>{" "}
                {validationErrors?.name}
              </p>
            )}
            <input
              className={`govuk-input govuk-input--width-20 ${validationErrors?.name ? "govuk-input--error" : ""}`}
              id="name"
              name="name"
              type="text"
              value={personalDetails?.name ?? ""}
              onChange={(e) => handleInputChange("name", e.target)}
              autoComplete="name"
              aria-invalid={!!validationErrors?.name}
              aria-describedby={
                validationErrors?.name ? "name-error" : undefined
              }
            />
          </div>

          {/* Address input */}
          <div
            ref={fieldRefs.address}
            className={`govuk-form-group ${validationErrors?.address ? "govuk-form-group--error" : ""}`}
          >
            <label className="govuk-label" htmlFor="address">
              Address
            </label>
            {validationErrors?.address && (
              <p
                id="address-error"
                className="govuk-error-message"
                role="alert"
              >
                <span className="govuk-visually-hidden">Error:</span>{" "}
                {validationErrors?.address}
              </p>
            )}
            <input
              className={`govuk-input govuk-input--width-20 ${validationErrors?.address ? "govuk-input--error" : ""}`}
              id="address"
              name="address"
              type="text"
              value={personalDetails?.address ?? ""}
              onChange={(e) => handleInputChange("address", e.target)}
              autoComplete="street-address"
              aria-invalid={!!validationErrors?.address}
              aria-describedby={
                validationErrors?.address ? "address-error" : undefined
              }
            />
          </div>

          {/* Postcode input */}
          <div
            ref={fieldRefs.postcode}
            className={`govuk-form-group ${validationErrors?.postcode ? "govuk-form-group--error" : ""}`}
          >
            <label className="govuk-label" htmlFor="postcode">
              Postcode
            </label>
            {validationErrors?.postcode && (
              <p
                id="postcode-error"
                className="govuk-error-message"
                role="alert"
              >
                <span className="govuk-visually-hidden">Error:</span>{" "}
                {validationErrors?.postcode}
              </p>
            )}
            <input
              className={`govuk-input govuk-input--width-10 ${validationErrors?.postcode ? "govuk-input--error" : ""}`}
              id="postcode"
              name="postcode"
              type="text"
              value={personalDetails?.postcode ?? ""}
              onChange={(e) => handleInputChange("postcode", e.target)}
              autoComplete="postal-code"
              aria-invalid={!!validationErrors?.postcode}
              aria-describedby={
                validationErrors?.postcode ? "postcode-error" : undefined
              }
            />
          </div>

          {/* Email address input */}
          <div
            ref={fieldRefs.emailAddress}
            className={`govuk-form-group ${validationErrors?.emailAddress ? "govuk-form-group--error" : ""}`}
          >
            <label className="govuk-label" htmlFor="emailAddress">
              Email address
            </label>
            <div className="govuk-hint">Optional</div>
            {validationErrors?.emailAddress && (
              <p id="email-error" className="govuk-error-message" role="alert">
                <span className="govuk-visually-hidden">Error:</span>{" "}
                {validationErrors?.emailAddress}
              </p>
            )}
            <input
              className={`govuk-input govuk-input--width-20 ${validationErrors?.emailAddress ? "govuk-input--error" : ""}`}
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={personalDetails?.emailAddress ?? ""}
              onChange={(e) => handleInputChange("emailAddress", e.target)}
              spellCheck="false"
              autoComplete="email"
              aria-invalid={!!validationErrors?.emailAddress}
              aria-describedby={
                validationErrors?.emailAddress ? "email-error" : undefined
              }
            />
          </div>

          {/* Telephone number input */}
          <div
            ref={fieldRefs.telephoneNumber}
            className={`govuk-form-group ${validationErrors?.telephoneNumber ? "govuk-form-group--error" : ""}`}
          >
            <label className="govuk-label" htmlFor="telephoneNumber">
              Telephone number
            </label>
            <div className="govuk-hint">Optional</div>
            {validationErrors?.telephoneNumber && (
              <p
                id="telephone-error"
                className="govuk-error-message"
                role="alert"
              >
                <span className="govuk-visually-hidden">Error:</span>{" "}
                {validationErrors?.telephoneNumber}
              </p>
            )}
            <input
              className={`govuk-input govuk-input--width-20 ${validationErrors?.telephoneNumber ? "govuk-input--error" : ""}`}
              id="telephoneNumber"
              name="telephoneNumber"
              type="tel"
              value={personalDetails?.telephoneNumber ?? ""}
              onChange={(e) => handleInputChange("telephoneNumber", e.target)}
              autoComplete="tel"
              aria-invalid={!!validationErrors?.telephoneNumber}
              aria-describedby={
                validationErrors?.telephoneNumber
                  ? "telephone-error"
                  : undefined
              }
            />
          </div>

          <Details
            summaryText={"How we handle your data"}
            text={
              <>
                <p className="govuk-body">
                  We need your name and contact information because can only
                  formally explore comments coming from people who live close to
                  the proposed development. We will also use this to contact you
                  if the planning decision regarding this application is
                  appealed.
                </p>
                <p className="govuk-body">
                  Your comments will be made available online for the public to
                  see.
                </p>
                <p className="govuk-body">
                  We&apos;ll make sure any other personal or sensitive
                  information is removed where needed, in line with the{" "}
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
                  {contactPlanningAdviceLink ? (
                    <a
                      className="govuk-link govuk-link--no-visited-state"
                      href={contactPlanningAdviceLink}
                      target="_blank"
                    >
                      contact the Planning Advice and Information Service.
                    </a>
                  ) : (
                    "contact the Planning Advice and Information Service."
                  )}
                </p>
                <p className="govuk-body">
                  Read our{" "}
                  {corporatePrivacyLink && (
                    <>
                      <a
                        className="govuk-link govuk-link--no-visited-state"
                        href={corporatePrivacyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        corporate privacy statement
                      </a>
                      {planningServicePrivacyStatementLink && " and our "}
                    </>
                  )}
                  {planningServicePrivacyStatementLink && (
                    <>
                      <a
                        className="govuk-link govuk-link--no-visited-state"
                        href={planningServicePrivacyStatementLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        planning service statement
                      </a>
                    </>
                  )}{" "}
                  for more information.
                </p>
              </>
            }
          />

          {!hideContinue && (
            <Button variant="default" type="submit" element="button">
              Continue
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CommentPersonalDetails;
