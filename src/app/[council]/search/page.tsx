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

import { UnknownSearchParams } from "@/types";
import { getAppConfig } from "@/config";
import { PageMain } from "@/components/PageMain";
import { validateSearchParams } from "@/lib/planningApplication/search";
import { FormSearchFull } from "@/components/FormSearchFull";
import { createPathFromParams } from "@/lib/navigation";

interface PageProps {
  params: {
    council: string;
  };
  searchParams?: UnknownSearchParams;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { council } = params;
  const appConfig = getAppConfig(council);
  const validSearchParams = validateSearchParams(appConfig, searchParams);
  return (
    <PageMain>
      <FormSearchFull
        action={createPathFromParams(params, "/search-form")}
        councilSlug={council}
        searchParams={validSearchParams}
        appConfig={appConfig}
      />
    </PageMain>
  );
}
