import { DprContentPage } from "@/types";
import Link from "next/link";
import "./ContentSidebar.scss";

export interface ContentSidebarProps {
  content: DprContentPage[];
  withHeadings?: boolean;
}

export const ContentSidebar = ({
  content,
  withHeadings,
}: ContentSidebarProps) => {
  if (!content) {
    return null;
  }
  return (
    <nav
      className={`contents-bar ${withHeadings ? `contents-bar--with-headings` : ``}`}
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
        className={`contents-bar__level contents-bar__level--${depth}`}
      >
        <div className={`contents-bar__text`}>
          <Link href={`#${encodeURIComponent(c.title)}`}>{c.title}</Link>
        </div>
        {c.children && c.children.length > 0 && (
          <ul>{c.children.map((page) => renderPage(page, depth + 1))}</ul>
        )}
      </li>
    );
  };

  if (depth === 0) {
    return (
      <ul role="list" aria-labelledby="contents-title">
        {content.map((page) => renderPage(page, depth))}
      </ul>
    );
  } else {
    return <ul>{content.map((page) => renderPage(page, depth))}</ul>;
  }
};
