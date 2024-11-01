import { DprContentPage } from "@/types";
import Link from "next/link";
import "./ContentSidebar.scss";

export interface ContentSidebarProps {
  content: DprContentPage[];
}

export const ContentSidebar = ({ content }: ContentSidebarProps) => {
  console.log(content);
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
        : `contents-bar__${depth} contents-bar__list-heading`;

    return (
      <li key={c.key}>
        <div className={className}>
          <Link href={`#${encodeURIComponent(c.title)}`}>{c.title}</Link>
        </div>
        {c.children && c.children.length > 0 && (
          <ul>{c.children.map((page) => renderPage(page, depth + 1))}</ul>
        )}
      </li>
    );
  };

  // if (depth === 0) {
  //   return (
  //     <ul role="list" aria-labelledby="contents-title">
  //       {content.map(renderPage, depth + 1)}
  //     </ul>
  //   );
  // } else {
  return <ul>{content.map((page) => renderPage(page, depth))}</ul>;
  // }
};

// const renderContent = (items: DprContentPage[], depth: number = 0) => {
//   return items.map((item, index) => {
//     const noUl = depth === 0 ? true : false;
//     const className =
//       depth === 0
//         ? "contents-bar__list-heading"
//         : depth === 1
//           ? "contents-bar__sub-list"
//           : "contents-bar__sub-list contents-bar__sub-sub-list";

//     return (
//       <ListWrapper key={index} noUl={noUl}>
//         <li>
//           <div className={className}>
//             <Link href={`#${encodeURIComponent(item.title)}`}>
//               {item.title}
//             </Link>
//           </div>
//           {item.children && renderContent(item.children, depth + 1)}
//         </li>
//       </ListWrapper>
//     );
//   });
// };

// const ListWrapper = ({ children, noUl }: { children: any; noUl: boolean }) => {
//   return noUl ? <>{children}</> : <ul role="list">{children}</ul>;
// };
