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
        <p className="govuk-body">We do not use any essential cookies.</p>
        <h3 className="govuk-heading-m">Essential session storage</h3>
        <p className="govuk-body">
          This service uses session storage to temporarily store small amounts
          of data on your device. This helps the service work properly and
          improves your experience as you move through the Register process.
        </p>
        <p className="govuk-body">Session storage:</p>
        <ul className="govuk-list govuk-list--bullet">
          <li>stores data only for the duration of your browser session</li>
          <li>is deleted when you close your browser</li>
          <li>is not accessible by other websites</li>
          <li>does not send data unless you submit a form</li>
        </ul>
        <h3 className="govuk-heading-m">Session storage items we use</h3>
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
            <tr
              className="govuk-table__row"
              style={{ borderBottom: "1px solid #b1b4b6" }}
            >
              <td className="govuk-table__cell">presubmission</td>
              <td className="govuk-table__cell">
                Tracks whether users have started the comment flow process
              </td>
              <td className="govuk-table__cell">
                When you submit a comment or close your browser
              </td>
            </tr>
            <tr
              className="govuk-table__row"
              style={{ borderBottom: "1px solid #b1b4b6" }}
            >
              <td className="govuk-table__cell">sentiment</td>
              <td className="govuk-table__cell">
                Stores what was entered as the choice for sentiment
              </td>
              <td className="govuk-table__cell">
                When you submit a comment or close your browser
              </td>
            </tr>
            <tr
              className="govuk-table__row"
              style={{ borderBottom: "1px solid #b1b4b6" }}
            >
              <td className="govuk-table__cell">selectedTopics</td>
              <td className="govuk-table__cell">
                Stores which boxes you checked for topics to comment on
              </td>
              <td className="govuk-table__cell">
                When you submit a comment or close your browser
              </td>
            </tr>
            <tr
              className="govuk-table__row"
              style={{ borderBottom: "1px solid #b1b4b6" }}
            >
              <td className="govuk-table__cell">comment</td>
              <td className="govuk-table__cell">
                Stores the content of each topic comment box
              </td>
              <td className="govuk-table__cell">
                When you submit a comment or close your browser
              </td>
            </tr>
            <tr
              className="govuk-table__row"
              style={{ borderBottom: "1px solid #b1b4b6" }}
            >
              <td className="govuk-table__cell">personalDetails</td>
              <td className="govuk-table__cell">
                Stores the data entered into the final step, such as name and
                email
              </td>
              <td className="govuk-table__cell">
                When you submit a comment or close your browser
              </td>
            </tr>
            <tr
              className="govuk-table__row"
              style={{ borderBottom: "1px solid #b1b4b6" }}
            >
              <td className="govuk-table__cell">submissionComplete</td>
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

      {/* <noscript>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h2 className="govuk-heading-l">Change your cookie settings</h2>
            <p className="govuk-body">
              We cannot change your cookie settings at the moment because
              JavaScript is not running in your browser. To fix this, try:
            </p>
            <ul className="govuk-list govuk-list--bullet">
              <li>turning on JavaScript in your browser settings</li>
              <li>reloading this page</li>
            </ul>
          </div>
        </div>
      </noscript> */}
    </>
  );
};

export default Cookies;
