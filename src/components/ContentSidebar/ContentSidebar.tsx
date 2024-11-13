import { DprContentPage } from "@/types";
import Link from "next/link";
import "./ContentSidebar.scss";

export interface ContentSidebarProps {
  content: DprContentPage[];
}

export const ContentSidebar = ({ content }: ContentSidebarProps) => {
  if (!content) {
    return null;
  }
  return (
    <nav className="contents-bar" aria-label="Table of contents">
      <h2 className="govuk-heading-l" id="contents-title">
        Contents
      </h2>
      <NestedContentList content={content} depth={0} />
      {/* <ul role="list" aria-labelledby="contents-title">
        {renderContent(content)}
      </ul> */}
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
    const className =
      depth > 0
        ? `contents-bar__${depth} contents-bar__sub-list`
        : `${c.title === ""}`
          ? `contents-bar__${depth} contents-bar__empty-heading`
          : `contents-bar__${depth} contents-bar__list-heading`;

    return (
      <li key={c.key}>
        {c.title !== "" && (
          <div className={className}>
            <Link href={`#${c.title}`}>{c.title}</Link>
          </div>
        )}
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
