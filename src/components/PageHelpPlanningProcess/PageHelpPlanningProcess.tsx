import { ContentPage } from "../ContentPage";
import { ContentSidebar } from "../ContentSidebar";
import { BackLink } from "../BackLink/BackLink";
import { PageMain } from "../PageMain";
import { contentPlanningProcess } from "./PageHelpPlanningProcessContent";
import { c } from "openapi-typescript";

export interface PlanningProcessProps {
  params: {
    council: string;
  };
}

export const PageHelpPlanningProcess = ({ params }: PlanningProcessProps) => {
  const content = contentPlanningProcess(params?.council);
  const isSticky = true;
  return (
    <>
      <BackLink />
      <PageMain className="dpr-page-planning-process">
        <h1 className="govuk-heading-xl">Overview of the planning process</h1>
        <p className="govuk-body govuk-!-margin-bottom-8">
          Find out how the planning application process works. This is an
          overview of the process, but different councils and application types
          may have slightly unique processes
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
