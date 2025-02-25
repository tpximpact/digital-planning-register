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
