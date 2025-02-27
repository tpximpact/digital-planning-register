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

import { ReactNode } from "react";
import { getAppConfig } from "@/config";
import { ContentNotFound } from "@/components/ContentNotFound";
import { BackButton } from "@/components/BackButton";
import { PageTemplate } from "@/components/PageTemplate";
import { PageMain } from "@/components/PageMain";

export async function generateMetadata({
  params,
}: {
  params: { council: string };
}) {
  const council = decodeURIComponent(params.council);
  const appConfig = getAppConfig(council);

  return {
    title: {
      template: `%s | ${appConfig.council?.name ?? "Not Found"} Digital Planning Register`,
      default: `${appConfig.council?.name ?? "Not Found"}`,
    },
  };
}

export default function SiteLayout({
  params,
  children,
}: {
  params: { council: string };
  children: ReactNode;
}) {
  const council = decodeURIComponent(params.council);

  /**
   * Because of non-js requirements and a bug in nextjs - this code handles the case where the council is not found or visibility is set to private
   * This applies to all sub pages of the [council] too
   */
  const appConfig = getAppConfig(council);
  if (
    !appConfig.council ||
    ["private"].includes(appConfig.council.visibility)
  ) {
    // cant use this because of bug in nextjs
    // return notFound();

    const baseUrl = `/`;
    return (
      <PageTemplate appConfig={appConfig}>
        <BackButton baseUrl={baseUrl} />
        <PageMain>
          <ContentNotFound />
        </PageMain>
      </PageTemplate>
    );
  }

  return <PageTemplate appConfig={appConfig}>{children}</PageTemplate>;
}
