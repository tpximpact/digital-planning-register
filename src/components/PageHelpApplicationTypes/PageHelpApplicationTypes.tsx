/* eslint-disable react/no-unescaped-entities */
import { ContentPage } from "../ContentPage";
import { ContentSidebar } from "../ContentSidebar";
import { BackLink } from "../BackLink/BackLink";
import { PageMain } from "../PageMain";
import { contentApplicationTypes } from "./PageHelpApplicationTypesContent";

export interface ApplicationTypesProps {
  params: {
    council: string;
  };
}

export const PageHelpApplicationTypes = ({ params }: ApplicationTypesProps) => {
  const content = contentApplicationTypes(params?.council);
  return (
    <>
      <BackLink />
      <PageMain className="dpr-page-planning-process">
        <h1 className="govuk-heading-xl">Application types</h1>
        <p className="govuk-body govuk-!-margin-bottom-8">
          The different sorts of applications that are published on the planning
          register, and what they are for.
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
