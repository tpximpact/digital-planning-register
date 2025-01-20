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
    <ul className="help-links">
      {pages.map((page) => (
        <li key={page.key}>
          <h3 className="govuk-heading-s">
            <Link href={`/${council}/help/${page.key}`} className="govuk-link">
              {page.title}
            </Link>
          </h3>
          {page.content}
        </li>
      ))}
    </ul>
  );
};
