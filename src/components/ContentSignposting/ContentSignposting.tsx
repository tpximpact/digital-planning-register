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
import Link from "next/link";
import { DprContentPage } from "@/types";
import "./ContentSignposting.scss";

interface ContentSignpostingProps {
  pages: DprContentPage[];
  council: string;
}

export const ContentSignposting: React.FC<ContentSignpostingProps> = ({
  pages,
  council,
}) => {
  return (
    <nav aria-label="Table of contents" className="dpr-content-signposting">
      <ul className="dpr-content-signposting__links">
        {pages.map((page) => (
          <li key={page.key} className="dpr-content-signposting__links-item">
            <h3 className="govuk-heading-s">
              <Link
                href={`/${council}/help/${page.key}`}
                className="dpr-content-signposting__topic-link govuk-link"
              >
                {page.title}
              </Link>
            </h3>
            <div className="dpr-content-signposting__topic">{page.content}</div>
          </li>
        ))}
      </ul>
    </nav>
  );
};
