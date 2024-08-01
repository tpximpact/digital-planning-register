/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import { setConsentCookie } from "@/actions";
import Link from "next/link";

type BannerState = "initial" | "accepted" | "rejected" | "hidden";

export default function CookieBanner() {
  const [bannerState, setBannerState] = useState<BannerState>("initial");

  useEffect(() => {
    const consentCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("consentCookie="))
      ?.split("=")[1];

    if (consentCookie) {
      setBannerState("hidden");
    } else if (consentCookie === "true") {
      setBannerState("accepted");
    } else if (consentCookie === "false") {
      setBannerState("rejected");
    } else {
      setBannerState("initial");
    }
  }, []);

  const handleAccept = () => {
    setConsentCookie(true);
    setBannerState("accepted");
  };

  const handleReject = () => {
    setConsentCookie(false);
    setBannerState("rejected");
  };

  const handleHide = () => {
    setBannerState("hidden");
  };

  if (bannerState === "hidden") {
    return null;
  }
  return (
    <>
      <div
        className="govuk-cookie-banner"
        data-nosnippet
        role="region"
        aria-label="Cookies on Digital Planning Register"
      >
        {bannerState === "initial" && (
          <div className="govuk-cookie-banner__message govuk-width-container">
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-two-thirds">
                <h2 className="govuk-cookie-banner__heading govuk-heading-m">
                  Cookies on Digital Planning Register
                </h2>
                <div className="govuk-cookie-banner__content">
                  <p className="govuk-body">
                    We use some essential cookies to make this service work.
                  </p>
                  <p className="govuk-body">
                    We'd also like to use analytics cookies so we can understand
                    how you use the service and make improvements.
                  </p>
                </div>
              </div>
            </div>
            <div className="govuk-button-group">
              <button
                type="button"
                className="govuk-button"
                data-module="govuk-button"
                onClick={handleAccept}
              >
                Accept analytics cookies
              </button>
              <button
                type="button"
                className="govuk-button"
                data-module="govuk-button"
                onClick={handleReject}
              >
                Reject analytics cookies
              </button>
              <Link className="govuk-link" href="/cookie-policy">
                View cookies
              </Link>
            </div>
          </div>
        )}
        {(bannerState === "accepted" || bannerState === "rejected") && (
          <div
            className="govuk-cookie-banner__message govuk-width-container"
            role="alert"
          >
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-two-thirds">
                <div className="govuk-cookie-banner__content">
                  <p className="govuk-body">
                    {`You've ${bannerState === "accepted" ? "accepted" : "rejected"} `}
                    additional cookies. You can{" "}
                    <Link className="govuk-link" href="/cookie-policy">
                      change your cookie settings
                    </Link>{" "}
                    at any time.
                  </p>
                </div>
              </div>
            </div>
            <div className="govuk-button-group">
              <button
                type="button"
                className="govuk-button"
                data-module="govuk-button"
                onClick={handleHide}
              >
                Hide cookie message
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
