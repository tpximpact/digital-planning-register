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
    <nav aria-label="Help topics" className="content-signposting">
      <ul className="help-links" role="list">
        {pages.map((page) => (
          <li key={page.key} className="help-links__item">
            <article className="help-topic">
              <h3 className="govuk-heading-s">
                <Link
                  href={`/${council}/help/${page.key}`}
                  className="govuk-link"
                >
                  {page.title}
                </Link>
              </h3>
              <div className="help-topic__content">{page.content}</div>
            </article>
          </li>
        ))}
      </ul>
    </nav>
  );
};
