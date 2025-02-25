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
          <span className="govuk-heading-s">{title}</span>
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
