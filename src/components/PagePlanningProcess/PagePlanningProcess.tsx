import { ContentPage } from "../ContentPage";
import { contentPlanningProcess } from "./PagePlanningProcessContent";
import { ContentSidebar } from "../ContentSidebar";
import { BackLink } from "../BackLink/BackLink";
import { PageMain } from "../PageMain";

export interface PagePlanningProcessProps {}

export const PagePlanningProcess = ({}: PagePlanningProcessProps) => {
  return (
    <>
      <BackLink />
      <PageMain className="dpr-page-planning-process">
        <h1 className="govuk-heading-xl">
          Help using the Digital Planning Register
        </h1>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third-from-desktop">
            <ContentSidebar
              content={contentPlanningProcess()}
              withHeadings={true}
            />
          </div>

          <div className="govuk-grid-column-two-thirds-from-desktop">
            <ContentPage content={contentPlanningProcess()} />
          </div>
        </div>
      </PageMain>
    </>
  );
};
