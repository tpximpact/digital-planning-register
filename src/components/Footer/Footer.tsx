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

import { AppConfig } from "@/config/types";
import "./Footer.scss";
import { OdpLogo } from "./OdpLogo";

export const Footer = ({
  councilConfig,
}: {
  councilConfig?: AppConfig["council"];
}) => {
  const privacyPolicy =
    councilConfig?.pageContent?.privacy_policy?.privacy_policy_link;

  return (
    <footer className="govuk-footer">
      <div className="govuk-width-container">
        <div className="govuk-footer__meta">
          <div className="govuk-footer__meta-item">
            <OdpLogo width={300} height={100} />
          </div>
          <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
            <h2 className="govuk-visually-hidden">Support links</h2>
            <ul className="govuk-footer__inline-list">
              {councilConfig && (
                <li className="govuk-footer__inline-list-item">
                  <a className="govuk-footer__link" href={`/`}>
                    Choose a different council
                  </a>
                </li>
              )}
              {privacyPolicy && (
                <li className="govuk-footer__inline-list-item">
                  <a className="govuk-footer__link" href={privacyPolicy}>
                    Privacy policy
                  </a>
                </li>
              )}
              <li className="govuk-footer__inline-list-item">
                <a className="govuk-footer__link" href={`/cookie-policy`}>
                  Cookie policy
                </a>
              </li>
              <li className="govuk-footer__inline-list-item">
                <a
                  className="govuk-footer__link"
                  href={`/accessibility-statement`}
                >
                  Accessibility statement
                </a>
              </li>
            </ul>
            <svg
              aria-hidden="true"
              focusable="false"
              className="govuk-footer__licence-logo"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 483.2 195.7"
              height="17"
              width="41"
            >
              <path
                fill="currentColor"
                d="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"
              />
            </svg>
            <span className="govuk-footer__licence-description">
              All content is available under the{" "}
              <a
                className="govuk-footer__link"
                href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
                rel="license"
              >
                Open Government Licence v3.0
              </a>
              , except where otherwise stated
            </span>
          </div>
          <div className="govuk-footer__meta-item"></div>
        </div>
      </div>
    </footer>
  );
};
