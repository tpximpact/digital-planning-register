import { ContentPage } from "../ContentPage";
import { ContentSidebar } from "../ContentSidebar";
import { BackLink } from "../BackLink/BackLink";
import { PageMain } from "../PageMain";
import { DprContentPage } from "@/types";
import { JSX } from "react";

interface PageHelpTopicProps {
  title: string;
  description: string | JSX.Element;
  content: DprContentPage[];
  isSticky?: boolean;
}

export const PageHelpTopic = ({
  title,
  description,
  content,
  isSticky = true,
}: PageHelpTopicProps) => {
  return (
    <>
      <BackLink />
      <PageMain className="dpr-page-planning-process">
        <h1 className="govuk-heading-xl">{title}</h1>
        <p className="govuk-body govuk-!-margin-bottom-8">{description}</p>
        <div className="govuk-grid-row">
          <div
            className={`govuk-grid-column-one-third-from-desktop${
              isSticky ? " dpr-content-sidebar--sticky" : ""
            }`}
          >
            <ContentSidebar
              content={content}
              withHeadings={true}
              isSticky={isSticky}
            />
          </div>

          <div className="govuk-grid-column-two-thirds-from-desktop">
            <ContentPage content={content} />
          </div>
        </div>
      </PageMain>
    </>
  );
};
