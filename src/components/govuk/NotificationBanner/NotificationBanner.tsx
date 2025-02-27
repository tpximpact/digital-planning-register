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

import "./NotificationBanner.scss";

interface NotificationBannerProps {
  type?: "info" | "success";
  title?: JSX.Element;
  heading?: JSX.Element;
  content?: JSX.Element;
}

export const NotificationBanner = ({
  type = "info",
  title,
  heading,
  content,
}: NotificationBannerProps) => {
  let role = "region";
  let defaultTitle = "Important";
  if (type === "success") {
    role = "alert";
    defaultTitle = "Success";
  }

  return (
    <div
      className={`govuk-notification-banner${type === "success" ? " govuk-notification-banner--success" : ""}`}
      role={role}
      aria-labelledby="govuk-notification-banner-title"
      data-module="govuk-notification-banner"
    >
      <div className="govuk-notification-banner__header">
        <h2
          className="govuk-notification-banner__title"
          id="govuk-notification-banner-title"
        >
          {title ?? defaultTitle}
        </h2>
      </div>
      {(content || heading) && (
        <div className="govuk-notification-banner__content">
          {heading && (
            <p className="govuk-notification-banner__heading">
              {/* dont forget links need govuk-notification-banner__link class */}
              {heading}
            </p>
          )}
          {content && content}
        </div>
      )}
    </div>
  );
};
