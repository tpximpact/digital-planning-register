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

import { ContentPage } from "../ContentPage";
import { ContentSidebar } from "../ContentSidebar";
import { BackLink } from "../BackLink/BackLink";
import { PageMain } from "../PageMain";
import { DprContentPage } from "@/types";

interface PageHelpTopicProps {
  title: string;
  summary?: string | JSX.Element;
  content?: DprContentPage[];
  isSticky?: boolean;
}

export const PageHelpTopic = ({
  title,
  summary,
  content,
  isSticky = true,
}: PageHelpTopicProps) => {
  return (
    <>
      <BackLink />
      <PageMain>
        <h1 className="govuk-heading-xl">{title}</h1>
        {summary && (
          <p className="govuk-body govuk-!-margin-bottom-8">{summary}</p>
        )}
        {content && (
          <div className="govuk-grid-row">
            <div
              className={`govuk-grid-column-one-third-from-desktop${
                isSticky ? " dpr-content-sidebar--sticky" : ""
              }`}
            >
              <ContentSidebar
                content={content}
                withHeadings={true}
                isSticky={isSticky}
              />
            </div>

            <div className="govuk-grid-column-two-thirds-from-desktop">
              <ContentPage content={content} />
            </div>
          </div>
        )}
      </PageMain>
    </>
  );
};
