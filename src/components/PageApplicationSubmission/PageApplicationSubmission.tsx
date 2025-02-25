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

import { BackButton } from "@/components/BackButton";
import ApplicationForm from "../application_form";
import { PageMain } from "../PageMain";
import { formatDateTimeToDprDateTime } from "@/util";

export interface PageApplicationSubmissionProps {
  reference: string;
  // allowing any here because this type will be replaced soon
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  applicationSubmissionData?: any;
  submittedAt?: string;
  council?: string;
}

export const PageApplicationSubmission = ({
  reference,
  applicationSubmissionData,
  submittedAt,
  council,
}: PageApplicationSubmissionProps) => {
  const baseUrl = `/${council}`;
  return (
    <>
      <BackButton baseUrl={`${baseUrl}/${reference}`} />
      <PageMain>
        <h1 className="govuk-heading-xl">Application form as submitted</h1>
        <p className="govuk-body">
          This is the full application form as submitted by the applicant to the
          planning team.
        </p>
        <div className="govuk-grid-row grid-row-extra-bottom-margin">
          <div className="govuk-grid-column-one-half">
            <h2 className="govuk-heading-m">Application Reference</h2>
            <p>{reference}</p>
          </div>

          <div className="govuk-grid-column-one-half">
            <h2 className="govuk-heading-m">Submitted</h2>
            <div>
              {submittedAt ? (
                formatDateTimeToDprDateTime(submittedAt)
              ) : (
                <p className="govuk-body">Date not available</p>
              )}
            </div>
          </div>
        </div>
        {applicationSubmissionData && applicationSubmissionData.length > 0 ? (
          <ApplicationForm submissionData={applicationSubmissionData} />
        ) : (
          <p className="govuk-body">Submission data not available</p>
        )}
      </PageMain>
    </>
  );
};
