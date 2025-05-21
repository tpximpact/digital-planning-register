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

import { ApiV1 } from "@/actions/api";
import {
  ContextSetterProps,
  ContextSetter,
  ContextSetterSkeleton,
} from "@/components/ContextSetter";
import { Suspense } from "react";

export const ContextSetterWithSuspense = ({
  councilSlug,
  reference,
  application,
  showFeedbackBlurb = false,
}: ContextSetterProps) => {
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

  if (!councilSlug || !reference) {
    return <ContextSetterSkeleton />;
  }

  return (
    <Suspense fallback={<ContextSetterSkeleton />}>
      <ContextSetterLoader
        reference={reference}
        councilSlug={councilSlug}
        showFeedbackBlurb={showFeedbackBlurb}
      />
    </Suspense>
  );
};

const ContextSetterLoader = async ({
  councilSlug,
  reference,
  showFeedbackBlurb = false,
}: ContextSetterProps) => {
  const response = await ApiV1.show("appConfig", councilSlug, reference);
  const application = response.data;

  return (
    <ContextSetter
      councilSlug={councilSlug}
      reference={reference}
      application={application}
      showFeedbackBlurb={showFeedbackBlurb}
    />
  );
};
