import { slugify } from "@/util";
import "./ApplicationDataField.scss";

export interface ApplicationDataFieldProps {
  title: string;
  value?: string | JSX.Element;
  infoIcon?: JSX.Element;
  className?: string;
  isFull?: boolean;
}

/**
 * MUST be wrapped with <dl> tag
 * @param param0
 * @returns
 */
export const ApplicationDataField = ({
  title,
  value,
  infoIcon,
  isFull,
}: ApplicationDataFieldProps) => {
  if (value) {
    return (
      <div
        className={`dpr-application-data-field dpr-application-data-field--${slugify(title)} ${isFull ? "dpr-application-data-field--full" : ""}`}
      >
        <dt>
          <p className="govuk-heading-s">{title}</p>
        </dt>
        <dd>
          {value}
          {infoIcon}
        </dd>
      </div>
    );
  } else {
    return null;
  }
};
