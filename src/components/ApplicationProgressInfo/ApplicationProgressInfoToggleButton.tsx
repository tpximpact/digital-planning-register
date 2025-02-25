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

import { StringLiteral } from "typescript";
import "./ApplicationProgressInfoToggleButton.scss";

export interface ApplicationProgressInfoToggleButtonProps {
  showText: string;
  hideText: string;
  textContinued: string;
  title?: string;
  toggleAll?: () => void;
  openAll: boolean;
  isStatic?: boolean;
}

export const ApplicationProgressInfoToggleButton = ({
  showText = "Show",
  hideText = "Hide",
  textContinued = "all sections",
  title = "Click to expand all sections",
  toggleAll,
  openAll,
  isStatic,
}: ApplicationProgressInfoToggleButtonProps) => {
  const content = (
    <>
      <span
        className={`dpr-progress-info__chevron ${openAll ? "dpr-progress-info__chevron--down" : ""}`}
      ></span>
      <span className="dpr-progress-info__toggle-button-text">
        {openAll ? showText : hideText} {textContinued}
      </span>
    </>
  );

  if (isStatic) {
    return (
      <span
        className="dpr-progress-info__toggle-button dpr-progress-info__toggle-button--static"
        role="button"
        aria-expanded={!openAll}
      >
        {content}
      </span>
    );
  } else {
    return (
      <button
        className="dpr-progress-info__toggle-button"
        onClick={toggleAll ? toggleAll : undefined}
        type="button"
        title={title}
        aria-expanded={!openAll}
      >
        {content}
      </button>
    );
  }
};
