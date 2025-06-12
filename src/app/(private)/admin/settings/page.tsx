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

import React from "react";
import { getAppConfig } from "@/config";
import { AdminTemplate } from "../components/AdminTemplate";
import { AppConfig } from "@/config/types";

// since no data fetch on this page force it to be dynamic so it gets correct council config
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "force-dynamic";

const NavigationSettings = (navItem: AppConfig["navigation"][number]) => {
  return (
    <>
      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor="label">
          Label
        </label>
        <div id="label-hint" className="govuk-hint">
          The text shown in the navigation link
        </div>
        <input
          disabled={true}
          className="govuk-input govuk-!-width-two-thirds"
          id="label"
          name="label"
          defaultValue={navItem.label ?? ""}
          type="text"
          aria-describedby="label-hint"
        />
      </div>
      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor="href">
          Href
        </label>
        <div id="href-hint" className="govuk-hint">
          The url the navigation link points to
        </div>
        <input
          disabled={true}
          className="govuk-input govuk-!-width-two-thirds"
          id="href"
          name="href"
          defaultValue={navItem.href ?? ""}
          type="text"
          aria-describedby="href-hint"
        />
      </div>
      <div className="govuk-form-group">
        <div className="govuk-checkboxes">
          <div className="govuk-checkboxes__item">
            <input
              className="govuk-checkboxes__input"
              id="councilBase"
              name="councilBase"
              type="checkbox"
              value={navItem.councilBase ? "true" : "false"}
              defaultChecked={navItem.councilBase}
              aria-describedby="councilBase-hint"
              disabled={true}
            />
            <label
              className="govuk-label govuk-checkboxes__label"
              htmlFor="councilBase"
            >
              Council base
            </label>
            <div
              id="councilBase-hint"
              className="govuk-hint govuk-checkboxes__hint"
            >
              Whether the link is based on the council slug
            </div>
          </div>
        </div>
        <div className="govuk-checkboxes">
          <div className="govuk-checkboxes__item">
            <input
              className="govuk-checkboxes__input"
              id="showCondition"
              name="showCondition"
              type="checkbox"
              value={navItem.showCondition ? "true" : "false"}
              defaultChecked={navItem.showCondition}
              aria-describedby="showCondition-hint"
              disabled={true}
            />
            <label
              className="govuk-label govuk-checkboxes__label"
              htmlFor="showCondition"
            >
              Show condition
            </label>
            <div
              id="showCondition-hint"
              className="govuk-hint govuk-checkboxes__hint"
            >
              Whether or not the link should be shown (can be overridden by id)
            </div>
          </div>
        </div>
      </div>
      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor="id">
          Id
        </label>
        <div id="id-hint" className="govuk-hint">
          Id to check councilConfig for to determine visibility
        </div>
        <input
          disabled={true}
          className="govuk-input  govuk-!-width-two-thirds"
          id="id"
          name="id"
          defaultValue={navItem.id ?? ""}
          type="text"
          aria-describedby="id-hint"
        />
      </div>
    </>
  );
};

const Settings = () => {
  const appConfig = getAppConfig();

  return (
    <AdminTemplate
      title="Settings"
      active="Settings"
      description={
        <>
          <p className="govuk-body">
            This section is for administrators to view and manage the
            application configuration settings.
          </p>
          <div className="govuk-body-s">
            <p className="govuk-body-s govuk-!-margin-bottom-2">Contents</p>
            <ul className="govuk-list govuk-list--spaced govuk-list--bullet govuk-body-s">
              <li>
                <a
                  href="#defaults"
                  className="govuk-link govuk-link--no-visited-state"
                >
                  Defaults
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="govuk-link govuk-link--no-visited-state"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#navigation"
                  className="govuk-link govuk-link--no-visited-state"
                >
                  Navigation
                </a>
              </li>
            </ul>
          </div>
        </>
      }
      mainSection={
        <>
          {/* Defaults */}
          <fieldset
            id="defaults"
            className="govuk-fieldset grid-row-extra-bottom-margin"
            aria-describedby="defaults-hint"
          >
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
              <h2 className="govuk-fieldset__heading">Defaults</h2>
            </legend>
            <div id="defaults-hint" className="govuk-hint">
              Default settings for the application
            </div>

            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="resultsPerPage">
                Results per page
              </label>
              <div id="resultsPerPage-hint" className="govuk-hint">
                Default results per page value
              </div>
              <input
                disabled={true}
                className="govuk-input govuk-input--width-10"
                id="resultsPerPage"
                name="resultsPerPage"
                defaultValue={appConfig.defaults?.resultsPerPage ?? ""}
                type="number"
                aria-describedby="resultsPerPage-hint"
              />
            </div>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="revalidate">
                Revalidate
              </label>
              <div id="revalidate-hint" className="govuk-hint">
                Default revalidate value
              </div>
              <input
                disabled={true}
                className="govuk-input govuk-input--width-10"
                id="revalidate"
                name="revalidate"
                defaultValue={appConfig.defaults?.revalidate ?? ""}
                type="text"
                aria-describedby="osMapProxyUrl-hint"
              />
            </div>
          </fieldset>
          <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--visible" />
          {/* Features */}
          <fieldset
            id="features"
            className="govuk-fieldset grid-row-extra-bottom-margin"
            aria-describedby="features-hint"
          >
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
              <h2 className="govuk-fieldset__heading">Features</h2>
            </legend>
            <div id="features-hint" className="govuk-hint">
              These are features that can be toggled on or off in the
              application.
            </div>
            <div className="govuk-form-group">
              <div className="govuk-checkboxes">
                <div className="govuk-checkboxes__item">
                  <input
                    className="govuk-checkboxes__input"
                    id="getApplicationIdFromPrivateEndpoint"
                    name="getApplicationIdFromPrivateEndpoint"
                    type="checkbox"
                    value={
                      appConfig.features?.getApplicationIdFromPrivateEndpoint
                        ? "true"
                        : "false"
                    }
                    defaultChecked={
                      appConfig.features?.getApplicationIdFromPrivateEndpoint
                    }
                    aria-describedby="getApplicationIdFromPrivateEndpoint-hint"
                    disabled={true}
                  />
                  <label
                    className="govuk-label govuk-checkboxes__label"
                    htmlFor="getApplicationIdFromPrivateEndpoint"
                  >
                    Get applicationId from private endpoint
                  </label>
                  <div
                    id="getApplicationIdFromPrivateEndpoint-hint"
                    className="govuk-hint govuk-checkboxes__hint"
                  >
                    Set this to true to fetch id from the BOPs private endpoint
                    for submitting comments
                  </div>
                </div>
              </div>
            </div>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="osMapProxyUrl">
                OS Map Proxy URL
              </label>
              <div id="osMapProxyUrl-hint" className="govuk-hint">
                This is set to the <code>OS_MAP_PROXY_URL</code> environment
                variable
                <br />
                This is done so that we don&#39;t need to provide{" "}
                <code>OS_MAP_PROXY_URL</code> at build time so the map component
                can access it
              </div>
              <input
                disabled={true}
                className="govuk-input  govuk-!-width-two-thirds"
                id="osMapProxyUrl"
                name="osMapProxyUrl"
                defaultValue={appConfig.features?.osMapProxyUrl ?? ""}
                type="text"
                aria-describedby="osMapProxyUrl-hint"
              />
            </div>
          </fieldset>
          <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--visible" />
          {/* Navigation */}
          <fieldset
            id="navigation"
            className="govuk-fieldset grid-row-extra-bottom-margin"
            aria-describedby="navigation-hint"
          >
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
              <h2 className="govuk-fieldset__heading">Navigation</h2>
            </legend>
            <div id="navigation-hint" className="govuk-hint">
              Navigation links
            </div>
            {appConfig.navigation.map((navItem, i) => (
              <>
                <NavigationSettings
                  key={navItem.id ?? navItem.label}
                  {...navItem}
                />
                {i < appConfig.navigation.length - 1 && (
                  <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                )}
              </>
            ))}
          </fieldset>
        </>
      }
    />
  );
};

export default Settings;
