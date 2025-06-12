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

import React from "react";
import { getAppConfig } from "@/config";
import { CouncilDetail } from "@/app/(private)/admin/components/CouncilDetail";
import { UnknownSearchParams } from "@/types";
import { getValueFromUnknownSearchParams } from "@/lib/search";
import { AdminTemplate } from "@/app/(private)/admin/components/AdminTemplate";

// since no data fetch on this page force it to be dynamic so it gets correct council config
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams?: UnknownSearchParams;
}

const Page = ({ searchParams }: PageProps) => {
  const councilSlug = searchParams
    ? getValueFromUnknownSearchParams(searchParams, "council")
    : undefined;

  const appConfig = getAppConfig(councilSlug);

  if (!appConfig.council) {
    return (
      <AdminTemplate
        title={`Error: Valid council not specified`}
        mainSection={
          <p className="govuk-body">
            Please specify a valid council in the URL.
          </p>
        }
      />
    );
  }

  return (
    <AdminTemplate
      title={`${appConfig.council.name} details`}
      description={
        <p className="govuk-body">
          This section provides detailed information about the council and its
          configuration.
        </p>
      }
      mainSection={
        <CouncilDetail
          council={appConfig.council}
          key={`${appConfig.council.slug}_details`}
        />
      }
    />
  );
};

export default Page;
