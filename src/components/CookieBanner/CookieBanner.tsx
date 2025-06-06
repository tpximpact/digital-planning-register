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

import React, { useState, useEffect } from "react";
import { clearAnalyticsCookies, setConsentCookie } from "@/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { TextButton } from "../TextButton";
import "./CookieBanner.scss";

type BannerState = "initial" | "accepted" | "rejected" | "hidden";

export function CookieBanner() {
  const [bannerState, setBannerState] = useState<BannerState | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkCookieConsent = () => {
      const consentCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("consentCookie="))
        ?.split("=")[1];

      if (consentCookie === "true" || consentCookie === "false") {
        return "hidden";
      } else {
        return "initial";
      }
    };

    setBannerState(checkCookieConsent());
  }, []);

  const handleAccept = async () => {
    await setConsentCookie(true);
    setBannerState("accepted");
    router.refresh();
  };

  const handleReject = async () => {
    await setConsentCookie(false);
    clearAnalyticsCookies();
    setBannerState("rejected");
    router.refresh();
  };

  const handleHide = () => {
    setBannerState("hidden");
  };

  if (bannerState === null || bannerState === "hidden") {
    return null;
  }

  return (
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
                  We&#39;d also like to use analytics cookies so we can
                  understand how you use the service and make improvements.
                </p>
              </div>
            </div>
          </div>
          <div className="govuk-button-group">
            <Button element="button" onClick={handleAccept} variant="default">
              Accept analytics cookies
            </Button>
            <Button element="button" onClick={handleReject} variant="default">
              Reject analytics cookies
            </Button>
            <TextButton element="link" href="/cookie-policy">
              View cookies
            </TextButton>
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
                  analytics cookies. You can{" "}
                  <Link className="govuk-link" href="/cookie-policy">
                    change your cookie settings
                  </Link>{" "}
                  at any time.
                </p>
              </div>
            </div>
          </div>
          <div className="govuk-button-group">
            <Button onClick={handleHide} element="button" variant="default">
              Hide cookie message
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
