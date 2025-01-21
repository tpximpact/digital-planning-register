/* eslint-disable react/no-unescaped-entities */
import { ContentPage } from "../ContentPage";
import { ContentSidebar } from "../ContentSidebar";
import { BackLink } from "../BackLink/BackLink";
import { PageMain } from "../PageMain";
import { contentImportantDates } from "@/lib/planningApplication/date";

export const PageHelpImportantDates = () => {
  const content = contentImportantDates();
  const isSticky = true;
  return (
    <>
      <BackLink />
      <PageMain className="dpr-page-planning-process">
        <h1 className="govuk-heading-xl">Important dates</h1>
        <p className="govuk-body govuk-!-margin-bottom-8">
          What the important dates are for planning applications. Explains what
          things like 'valid from date' mean.
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
