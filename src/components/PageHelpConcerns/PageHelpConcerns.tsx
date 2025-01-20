/* eslint-disable react/no-unescaped-entities */
import { ContentPage } from "../ContentPage";
import { ContentSidebar } from "../ContentSidebar";
import { BackLink } from "../BackLink/BackLink";
import { PageMain } from "../PageMain";
import { contentConcerns } from "./PageHelpConcernsContent";

export interface ConcernsProps {
  params: {
    council: string;
  };
}

export const PageHelpConcerns = ({ params }: ConcernsProps) => {
  const content = contentConcerns(params?.council);
  return (
    <>
      <BackLink />
      <PageMain className="dpr-page-planning-process">
        <h1 className="govuk-heading-xl">
          What can you do if your concerns can't be addressed by planning?
        </h1>
        <p className="govuk-body">
          If you have concerns about the issues on this page, planning cannot
          consider them in their asessment.
        </p>
        <p className="govuk-body govuk-!-margin-bottom-8">
          We know that these can be very important, and have big impacts on
          people, so we want to ensure you can reach the appropriate people to
          address them.
        </p>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third-from-desktop">
            <ContentSidebar content={content} withHeadings={true} />
          </div>

          <div className="govuk-grid-column-two-thirds-from-desktop">
            <ContentPage content={content} />
          </div>
        </div>
      </PageMain>
    </>
  );
};
