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

import { DprApplication, DprDocument, SearchParams } from "@/types";
import { BackButton } from "@/components/BackButton";
import { AppConfig } from "@/config/types";
import { ApplicationDetails } from "../ApplicationDetails";
import { PageMain } from "../PageMain";
import { ContentNotFound } from "../ContentNotFound";

export interface PageShowProps {
  appConfig: AppConfig;
  application: DprApplication | null;
  documents: DprDocument[] | null;
  params: {
    council: string;
    reference: string;
  };
  searchParams?: SearchParams;
}

export const PageShow = ({
  appConfig,
  application,
  documents,
  params,
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
          documents={documents}
          appConfig={appConfig}
        />
      </PageMain>
    </>
  );
};
