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

import { DprContentPage } from "@/types";
import { slugify } from "@/util/slugify";
import {
  contentApplicationStatuses,
  contentApplicationTypes,
  contentConcerns,
  contentDecisions,
  contentImportantDates,
  contentPlanningProcess,
} from "./planningApplication";
import { Council } from "@/config/types";
import Link from "next/link";

export const contentHelp = (councilConfig?: Council): DprContentPage[] => {
  return [
    {
      key: slugify("planning process"),
      title: "Overview of the planning process",
      summary:
        "Find out how the planning application process works. This is an overview of the process, but different councils and application types may have slightly unique processes",
      content: (
        <p className="govuk-body">
          Help understanding how planning applications are handled.
        </p>
      ),
      children: [...contentPlanningProcess(councilConfig)],
    },
    {
      key: slugify("Application statuses"),
      title: "Application statuses",
      summary:
        "Planning applications use different statuses to show where they are in the application process. You can find these statuses when checking the details of an application on this register.",
      content: (
        <p className="govuk-body">
          What the statuses like &lsquo;assessment in progress&rsquo; or
          &lsquo;determined&rsquo; mean for a planning application.
        </p>
      ),
      children: [...contentApplicationStatuses()],
    },
    {
      key: slugify("Important dates"),
      title: "Important dates",
      summary:
        "What the important dates are for planning applications. Explains what things like 'valid from date' mean.",
      content: (
        <p className="govuk-body">
          What the important dates are for planning applications. Explains what
          things like &lsquo;valid from date&rsquo; mean.
        </p>
      ),
      children: [...contentImportantDates()],
    },
    {
      key: slugify("decisions"),
      title: "Decisions",
      summary:
        "What kinds of outcomes different planning applications can have, because there can be more complexity than just 'granted' or 'refused'.",
      content: (
        <p className="govuk-body">
          What kinds of outcomes different planning applications can have,
          because there can be more complexity than just &lsquo;granted&rsquo;
          or &lsquo;refused&rsquo;.
        </p>
      ),
      children: [...contentDecisions(councilConfig)],
    },
    {
      key: slugify("Application types"),
      title: "Application types",
      summary: (
        <>
          <p className="govuk-body">
            The different sorts of applications that are published on the
            planning register, and what they are for.
          </p>
          <p className="govuk-body">
            This list includes only the most common application types. There are
            many more that are difficult to explain simply, due to the
            complexities of planning law. If there is an application type you
            need more information about, but do not see here, please{" "}
            {councilConfig?.contact ? (
              <Link className="govuk-link" href={councilConfig.contact}>
                contact your council
              </Link>
            ) : (
              <span>contact your council</span>
            )}{" "}
            for more information.
          </p>
        </>
      ),
      content: (
        <p className="govuk-body">
          The different sorts of applications that are published on the planning
          register, and what they are for.
        </p>
      ),
      children: [...contentApplicationTypes()],
    },
    {
      key: slugify("concerns"),
      title: "What to do if your concerns can't be addressed by planning",
      summary:
        "If you have concerns about the issues on this page, planning cannot consider them in their assessment. We know that these can be very important, and have big impacts on people, so we want to ensure you can reach the appropriate people to address them.",
      content: (
        <p className="govuk-body">
          There are some concerns that your local planning authority can&rsquo;t
          address. Find out what you can do about these issues.
        </p>
      ),
      children: [...contentConcerns(councilConfig)],
    },
  ];
};
