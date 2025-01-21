/* eslint-disable react/no-unescaped-entities */
import { ContentPage } from "../ContentPage";
import { ContentSidebar } from "../ContentSidebar";
import { BackLink } from "../BackLink/BackLink";
import { PageMain } from "../PageMain";
import { contentDecisions } from "./PageHelpDecisionsContent";

export interface DecisionsProps {
  params: {
    council: string;
  };
}

export const PageHelpDecisions = ({ params }: DecisionsProps) => {
  const content = contentDecisions(params?.council);
  const isSticky = true;
  return (
    <>
      <BackLink />
      <PageMain className="dpr-page-planning-process">
        <h1 className="govuk-heading-xl">Decisions</h1>
        <p className="govuk-body govuk-!-margin-bottom-8">
          What kinds of outcomes different planning applications can have,
          because there can be more complexity than just 'granted' or 'refused'.
        </p>

        <div className="govuk-grid-row">
          <div
            className={`govuk-grid-column-one-third-from-desktop${isSticky ? " dpr-content-sidebar--sticky" : ""}`}
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
