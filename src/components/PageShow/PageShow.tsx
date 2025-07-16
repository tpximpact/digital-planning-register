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

import { DprApplication, DprDocument } from "@/types";
import { BackButton } from "@/components/BackButton";
import { AppConfig } from "@/config/types";
import { ApplicationDetails } from "../ApplicationDetails";
import { PageMain } from "../PageMain";
import { ContentNotFound } from "../ContentNotFound";
import type {
  PublicCommentSummary,
  SpecialistCommentSummary,
} from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/CommentSummary.ts";

export interface PageShowProps {
  appConfig: AppConfig;
  application: DprApplication | null;
  documents?: DprDocument[];
  publicCommentSummary?: PublicCommentSummary;
  specialistCommentSummary?: SpecialistCommentSummary;
  params: {
    council: string;
    reference: string;
  };
}

export const PageShow = ({
  appConfig,
  application,
  params,
  documents,
  publicCommentSummary,
  specialistCommentSummary,
}: PageShowProps) => {
  const { council, reference } = params;

  if (!application) {
    return (
      <PageMain>
        <ContentNotFound councilConfig={appConfig.council} />
      </PageMain>
    );
  }
  const baseUrl = `/${council}`;
  return (
    <>
      <BackButton baseUrl={baseUrl} />
      <PageMain>
        <ApplicationDetails
          reference={reference}
          application={application}
          appConfig={appConfig}
          // this enables us to show this component in storybook without needing to fetch documents
          {...(documents !== undefined ? { documents } : {})}
          // this enables us to show this component in storybook without needing to fetch comments
          {...(specialistCommentSummary !== undefined
            ? { specialistCommentSummary: specialistCommentSummary }
            : {})}
          // this enables us to show this component in storybook without needing to fetch comments
          {...(publicCommentSummary !== undefined
            ? { publicCommentSummary: publicCommentSummary }
            : {})}
        />
      </PageMain>
    </>
  );
};
