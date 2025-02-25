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
import "./ContentSidebar.scss";

export interface ContentSidebarProps {
  content: DprContentPage[];
  withHeadings?: boolean;
  isSticky?: boolean;
}

export const ContentSidebar = ({
  content,
  withHeadings,
  isSticky,
}: ContentSidebarProps) => {
  if (!content || content.length === 0) {
    return null;
  }
  return (
    <nav
      className={`dpr-content-sidebar${withHeadings ? ` dpr-content-sidebar--with-headings` : ``}${isSticky ? ` dpr-content-sidebar--sticky` : ``}`}
      aria-label="Table of contents"
    >
      <h2 className="govuk-heading-l" id="contents-title">
        Contents
      </h2>
      <NestedContentList content={content} depth={0} />
    </nav>
  );
};

const NestedContentList = ({
  content,
  depth = 0,
}: {
  content: DprContentPage[];
  depth: number;
}) => {
  const renderPage = (c: DprContentPage, depth: number = 0) => {
    return (
      <li
        key={c.key}
        className={`dpr-content-sidebar__level dpr-content-sidebar__level--${depth}`}
      >
        <div className={`dpr-content-sidebar__text`}>
          <a href={`#${c.key}`}>{c.title}</a>
        </div>
        {c.children && c.children.length > 0 && (
          <ul>{c.children.map((page) => renderPage(page, depth + 1))}</ul>
        )}
      </li>
    );
  };

  if (depth === 0) {
    return (
      <ul aria-labelledby="contents-title">
        {content.map((page) => renderPage(page, depth))}
      </ul>
    );
  } else {
    return <ul>{content.map((page) => renderPage(page, depth))}</ul>;
  }
};
