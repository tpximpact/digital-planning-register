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

import { Editor } from "./ApplicationForm.Code";
import "./ApplicationForm.scss";
import React from "react";

interface ApplicationFormProps {
  submissionData: unknown;
}

/**
 * This ApplicationForm is designed to be used with an application
 * that is a valid application submission however currently we're typing it as
 * unknown since theres not enough validation from the current backend until we
 * check it ourselves
 * @param param0
 * @returns
 */
export const ApplicationForm = ({ submissionData }: ApplicationFormProps) => {
  if (!submissionData) {
    return null;
  }

  return (
    <div className="dpr-application-form">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <Editor submissionData={submissionData} />
        </div>
      </div>
    </div>
  );
};
