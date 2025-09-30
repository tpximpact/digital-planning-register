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
import { ApplicationForm } from "@/components/ApplicationForm";
import { PageMain } from "@/components/PageMain";
import { ContextSetterWithSuspense } from "@/components/ContextSetter";

export interface PageApplicationSubmissionProps {
  reference: string;
  council: string;
  applicationSubmissionData?: unknown;
}

export const PageApplicationSubmission = ({
  reference,
  applicationSubmissionData,
  council,
}: PageApplicationSubmissionProps) => {
  return (
    <>
      <BackButton baseUrl={`/${council}/${reference}`} />
      <PageMain>
        <ContextSetterWithSuspense
          councilSlug={council}
          reference={reference}
        />
        <h1 className="govuk-heading-xl">Application form as submitted</h1>

        {applicationSubmissionData ? (
          <>
            <p className="govuk-body">
              This is the full application form as submitted by the applicant to
              the planning team.
            </p>
            <ApplicationForm submissionData={applicationSubmissionData} />
          </>
        ) : (
          <p className="govuk-body">Submission data not available</p>
        )}
      </PageMain>
    </>
  );
};
