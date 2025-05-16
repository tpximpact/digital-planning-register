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
"use client";
import { ApiV1 } from "@/actions/api";
import { ApiResponse, DprApplication, DprShowApiResponse } from "@/types";
import { Suspense } from "react";
import {
  ContextSetter,
  ContextSetterSkeleton,
} from "../ContextSetter/ContextSetter";
import { getAppConfigClientSide } from "@/config/getAppConfigClientSide";

async function fetchData({
  params,
}: {
  params: { councilSlug: string; reference: string };
}): Promise<{
  response: ApiResponse<DprShowApiResponse>;
}> {
  const { reference, councilSlug } = params;
  const appConfig = await getAppConfigClientSide(councilSlug);

  const response = await ApiV1.show(
    appConfig.council?.dataSource ?? "none",
    councilSlug,
    reference,
  );

  return { response };
}

export interface ContextSetterWithSuspenseProps {
  councilSlug: string;
  reference: string;
  application?: DprApplication;
  showFeedbackBlurb?: boolean;
}

export function ContextSetterWithSuspense({
  councilSlug,
  reference,
  application,
  showFeedbackBlurb = false,
}: ContextSetterWithSuspenseProps) {
  if (application) {
    return (
      <ContextSetter
        councilSlug={councilSlug}
        reference={reference}
        application={application}
        showFeedbackBlurb={showFeedbackBlurb}
      />
    );
  }

  // Otherwise, use the async loader wrapped in Suspense.
  return (
    <Suspense fallback={<ContextSetterSkeleton />}>
      <ContextSetterLoader
        reference={reference}
        councilSlug={councilSlug}
        showFeedbackBlurb={showFeedbackBlurb}
      />
    </Suspense>
  );
}

async function ContextSetterLoader({
  councilSlug,
  reference,
  showFeedbackBlurb,
}: {
  councilSlug: string;
  reference: string;
  showFeedbackBlurb?: boolean;
}) {
  const { response } = await fetchData({
    params: { councilSlug, reference },
  });
  const application = response.data;
  const appConfig = await getAppConfigClientSide(councilSlug);
  const council = appConfig.council;

  return (
    <ContextSetter
      councilSlug={councilSlug}
      reference={reference}
      application={application}
      showFeedbackBlurb={showFeedbackBlurb}
      council={council}
    />
  );
}
