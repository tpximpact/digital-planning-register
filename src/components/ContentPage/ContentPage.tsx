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
import { slugify } from "@/util";

export interface ContentPageProps {
  content: DprContentPage[];
}

export const ContentPage = ({ content }: ContentPageProps) => {
  return renderContent(content);
};

const renderContent = (items: DprContentPage[], depth: number = 0) => {
  return items.map((item, index) => {
    let heading;
    const id = item.title;

    if (depth === 0) {
      heading = (
        <h2 className="govuk-heading-l" id={slugify(id)}>
          {item.title}
        </h2>
      );
    } else if (depth === 1) {
      heading = (
        <h3 key={id} className="govuk-heading-m" id={slugify(id)}>
          {item.title}
        </h3>
      );
    } else {
      heading = (
        <h4 className="govuk-heading-s" key={id} id={slugify(id)}>
          {item.title}
        </h4>
      );
    }

    return (
      <div key={index}>
        {heading}
        {item.content}
        {item.children && renderContent(item.children, depth + 1)}
      </div>
    );
  });
};
