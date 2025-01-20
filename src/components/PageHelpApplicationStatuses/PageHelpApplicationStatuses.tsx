import { ContentPage } from "../ContentPage";
import { ContentSidebar } from "../ContentSidebar";
import { BackLink } from "../BackLink/BackLink";
import { PageMain } from "../PageMain";
import { contentApplicationStatuses } from "./PageHelpApplicationStatusesContent";

export interface ApplicationStatusesProps {
  params: {
    council: string;
  };
}

export const PageHelpApplicationStatuses = ({
  params,
}: ApplicationStatusesProps) => {
  const content = contentApplicationStatuses;
  return (
    <>
      <BackLink />
      <PageMain className="dpr-page-planning-process">
        <h1 className="govuk-heading-xl">Application statuses</h1>
        <p className="govuk-body govuk-!-margin-bottom-8">
          Planning applications use different statuses to show where they are in
          the application process. You can find these statuses when checking the
          details of an application on this register.
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
