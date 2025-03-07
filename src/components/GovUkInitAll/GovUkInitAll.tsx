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
import { initAll } from "govuk-frontend";
import { useState, useEffect } from "react";

/**
 * Initialises the GovUK components
 * We do it this way as using react methods cause them to load twice, which is actually correct its just that the gov-uk code isn't designed to be used in this way
 * https://govuk-design-system-team-docs.netlify.app/support/communicating-with-users/common-responses/#making-gov-uk-frontend-work-with-javascript-frameworks
 *
 * We can also use this pattern to just enable specific govuk Scripts instead of initAll we can do
 * import { Header, createAll } from "govuk-frontend";
 * createAll(Header);
 * This will become the pattern when we start moving to pattern libraries - or because of the above recreate any govuk interactions in react ourselves.
 * @returns
 */
export const GovUkInitAll = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // NB this will trigger everything twice but the other option will give us a permanent warning about the mismatching classes
  // I'd rather have body class="js-enabled js-enabled" than that

  // <Script id="js-detection" strategy="beforeInteractive">
  //   {`document.body.className += ' js-enabled' + ('noModule' in HTMLScriptElement.prototype ? ' govuk-frontend-supported' : '');`}
  // </Script>;

  if (isClient && typeof window !== "undefined") {
    // add in govuk-frontend-supported class to body if the browser supports ES6 modules
    document.body.className +=
      " js-enabled" +
      ("noModule" in HTMLScriptElement.prototype
        ? " govuk-frontend-supported"
        : "");

    // initialise all the govuk components
    // tbh might not need this unless we're using any of these components https://frontend.design-system.service.gov.uk/javascript-api-reference/
    initAll();
  }

  return null;
};
