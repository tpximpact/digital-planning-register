import { BackLink } from "@/components/button";
import { ContentPage } from "../ContentPage";
import { contentPlanningProcess } from "./PagePlanningProcessContent";
import { ContentSidebar } from "../ContentSidebar";

export interface PagePlanningProcessProps {}

export const PagePlanningProcess = ({}: PagePlanningProcessProps) => {
  return (
    <>
      <BackLink />
      <div className="govuk-main-wrapper">
        <h1 className="govuk-heading-xl">
          Help using the Digital Planning Register
        </h1>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third-from-desktop contents-bar">
            <ContentSidebar content={contentPlanningProcess()} />
          </div>

          <div className="govuk-grid-column-two-thirds-from-desktop">
            <ContentPage content={contentPlanningProcess()} />
          </div>
        </div>
      </div>
    </>
  );
};
