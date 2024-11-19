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
