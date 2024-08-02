/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import { setConsentCookie } from "@/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Cookies = () => {
  const router = useRouter();
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean | null>(
    null,
  );
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const consentCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("consentCookie="))
      ?.split("=")[1];

    setAnalyticsConsent(consentCookie === "true");
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const analyticsValue = formData.get("cookies[analytics]") === "yes";

    await setConsentCookie(analyticsValue);
    setAnalyticsConsent(analyticsValue);
    setShowSuccess(true);
    window.scrollTo(0, 0);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.back();
  };
  return (
    <>
      <div className="govuk-main-wrapper">
        {showSuccess && (
          <div
            className="govuk-notification-banner govuk-notification-banner--success"
            role="alert"
            aria-labelledby="govuk-notification-banner-title"
            data-module="govuk-notification-banner"
          >
            <div className="govuk-notification-banner__header">
              <h2
                className="govuk-notification-banner__title"
                id="govuk-notification-banner-title"
              >
                Success
              </h2>
            </div>
            <div className="govuk-notification-banner__content">
              <p className="govuk-notification-banner__heading">
                You've set your cookie preferences.{" "}
                <Link
                  href="#"
                  className="govuk-notification-banner__link"
                  onClick={handleClick}
                >
                  Go back to the page you were looking at
                </Link>
                .
              </p>
            </div>
          </div>
        )}{" "}
        <h1 className="govuk-heading-l">Cookies</h1>
        <h3 className="govuk-heading-m">What cookies are</h3>
        <p className="govuk-body">
          Cookies are small files saved on your phone, tablet or computer when
          you visit a website.
        </p>
        <p className="govuk-body">
          We use an essential cookie to keep your data secure while you use the
          Digital Planning Register.
        </p>
        <h3 className="govuk-heading-m">Essential cookies</h3>
        <p className="govuk-body">
          Essential cookies keep your information secure while you use this
          service. We do not need to ask permission to use essential cookies.
        </p>
        <p className="govuk-body">We use the following essential cookies:</p>
        <table className="govuk-table govuk-table--small-text-until-tablet">
          <thead className="govuk-table__head">
            <tr className="govuk-table__row">
              <th scope="col" className="govuk-table__header">
                Name
              </th>
              <th scope="col" className="govuk-table__header">
                Purpose
              </th>
              <th scope="col" className="govuk-table__header">
                Expires
              </th>
            </tr>
          </thead>
          <tbody className="govuk-table__body">
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                consentCookie
              </th>
              <td className="govuk-table__cell">
                Stores your cookie preferences
              </td>
              <td className="govuk-table__cell">1 year</td>
            </tr>
          </tbody>
        </table>
        <h3 className="govuk-heading-m">Essential session storage</h3>
        <p className="govuk-body">
          This service uses session storage to temporarily store small amounts
          of data on your device. This helps the service work properly and
          improves your experience as you move through the Digital Planning
          Register process.
        </p>
        <p className="govuk-body">Session storage:</p>
        <ul className="govuk-list govuk-list--bullet">
          <li>stores data only for the duration of your browser session</li>
          <li>is deleted when you close your browser</li>
          <li>is not accessible by other websites</li>
          <li>does not send data unless you submit a form</li>
        </ul>
        <p className="govuk-body">
          We use the following session storage items:
        </p>
        <table className="govuk-table govuk-table--small-text-until-tablet">
          <thead className="govuk-table__head">
            <tr className="govuk-table__row">
              <th scope="col" className="govuk-table__header">
                Name
              </th>
              <th scope="col" className="govuk-table__header">
                Purpose
              </th>
              <th scope="col" className="govuk-table__header">
                Expires
              </th>
            </tr>
          </thead>
          <tbody className="govuk-table__body">
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                presubmission
              </th>
              <td className="govuk-table__cell">
                Tracks whether you have started the comment flow process
              </td>
              <td className="govuk-table__cell">
                When you submit a comment or close your browser
              </td>
            </tr>
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                sentiment
              </th>
              <td className="govuk-table__cell">
                Stores what was entered as the choice for sentiment
              </td>
              <td className="govuk-table__cell">
                When you submit a comment or close your browser
              </td>
            </tr>
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                selectedTopics
              </th>
              <td className="govuk-table__cell">
                Stores which boxes you checked for topics to comment on
              </td>
              <td className="govuk-table__cell">
                When you submit a comment or close your browser
              </td>
            </tr>
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                comment
              </th>
              <td className="govuk-table__cell">
                Stores the content of each topic comment box
              </td>
              <td className="govuk-table__cell">
                When you submit a comment or close your browser
              </td>
            </tr>
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                personalDetails
              </th>
              <td className="govuk-table__cell">
                Stores the data entered into the final step, such as name and
                email
              </td>
              <td className="govuk-table__cell">
                When you submit a comment or close your browser
              </td>
            </tr>
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                submissionComplete
              </th>
              <td className="govuk-table__cell">
                Tracks whether the submission was successful
              </td>
              <td className="govuk-table__cell">
                When you submit a comment or close your browser
              </td>
            </tr>
          </tbody>
        </table>
        <p className="govuk-body">
          Note: Some session storage items may include additional identifying
          information to manage multiple submissions.
        </p>
        <h3 className="govuk-heading-m">Analytics cookies</h3>
        <p className="govuk-body">
          With your permission, we use Google Analytics to collect data about
          how you use this service. This information helps us to improve our
          service.
        </p>
        <p className="govuk-body">
          Google is not allowed to use or share our analytics data with anyone.
        </p>
        <p className="govuk-body">
          Google Analytics store anonymised information about:
        </p>
        <table className="govuk-table govuk-table--small-text-until-tablet">
          <thead className="govuk-table__head">
            <tr className="govuk-table__row">
              <th scope="col" className="govuk-table__header">
                Name
              </th>
              <th scope="col" className="govuk-table__header">
                Purpose
              </th>
              <th scope="col" className="govuk-table__header">
                Expires
              </th>
            </tr>
          </thead>
          <tbody className="govuk-table__body">
            <tr className="govuk-table__row">
              <th scope="row" className="govuk-table__header">
                _ga
              </th>
              <td className="govuk-table__cell">
                Used to identify unique users
              </td>
              <td className="govuk-table__cell">2 years</td>
            </tr>
          </tbody>
        </table>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h2 className="govuk-heading-l">Change your cookie settings</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="govuk-form-group">
                <fieldset className="govuk-fieldset">
                  <legend className="govuk-fieldset__legend govuk-fieldset__legend--s">
                    Do you want to accept analytics cookies?
                  </legend>
                  <div className="govuk-radios" data-module="govuk-radios">
                    <div className="govuk-radios__item">
                      <input
                        className="govuk-radios__input"
                        id="cookies-analytics"
                        name="cookies[analytics]"
                        type="radio"
                        value="yes"
                        checked={analyticsConsent === true}
                        onChange={() => setAnalyticsConsent(true)}
                      />
                      <label
                        className="govuk-label govuk-radios__label"
                        htmlFor="cookies-analytics"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="govuk-radios__item">
                      <input
                        className="govuk-radios__input"
                        id="cookies-analytics-2"
                        name="cookies[analytics]"
                        type="radio"
                        value="no"
                        checked={analyticsConsent === false}
                        onChange={() => setAnalyticsConsent(false)}
                      />
                      <label
                        className="govuk-label govuk-radios__label"
                        htmlFor="cookies-analytics-2"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <button
                type="submit"
                className="govuk-button"
                data-module="govuk-button"
              >
                Save cookie settings
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cookies;
