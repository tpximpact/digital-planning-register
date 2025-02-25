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

import { ContentNotFound } from "@/components/ContentNotFound";
import { PageMain } from "@/components/PageMain";
import { PageTemplate } from "@/components/PageTemplate";
import { getAppConfig } from "@/config";
import { AppConfig } from "@/config/types";

export default function NotFound({
  councilConfig,
}: {
  councilConfig: AppConfig["council"];
}) {
  const appConfig = getAppConfig();
  return (
    <PageTemplate appConfig={appConfig}>
      <PageMain>
        <ContentNotFound councilConfig={councilConfig} />
      </PageMain>
    </PageTemplate>
  );
}
