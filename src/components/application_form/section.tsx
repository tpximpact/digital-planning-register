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

import {
  DprApplicationSubmissionSubtopic,
  DprApplicationSubmissionSubtopicValue,
} from "@/types";
import { Row } from "./row";

export const Section = ({
  subtopic,
  value,
}: DprApplicationSubmissionSubtopic) => {
  // if value is an array it will be an array of DprApplicationSubmissionSubtopicValue
  const renderRow = (
    value: DprApplicationSubmissionSubtopicValue[],
  ): React.ReactNode => {
    return value.map((item, i) => {
      if (Array.isArray(item.value)) {
        return renderRow(item.value);
      } else {
        return <Row key={i} {...item} />;
      }
    });
  };

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h3 className="govuk-heading-m">{subtopic}</h3>
        <div className="govuk-summary-list">{renderRow(value)}</div>
      </div>
    </div>
  );
};
