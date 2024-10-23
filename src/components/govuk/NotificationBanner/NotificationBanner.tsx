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
