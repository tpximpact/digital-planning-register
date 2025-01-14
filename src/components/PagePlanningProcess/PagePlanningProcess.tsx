/* eslint-disable react/no-unescaped-entities */
import { ContentPage } from "../ContentPage";
import { contentPlanningProcess } from "./PagePlanningProcessContent";
import { ContentSidebar } from "../ContentSidebar";
import { BackLink } from "../BackLink/BackLink";
import { PageMain } from "../PageMain";
import { getAppConfig } from "@/config";
import Link from "next/link";
import { ContentSignposting } from "../ContentSignposting";
import { slugify } from "@/util";

export interface PagePlanningProcessProps {
  council: string;
}

export const PagePlanningProcess = ({ council }: PagePlanningProcessProps) => {
  const councilConfig = getAppConfig(council);
  const councilLink = councilConfig?.council?.contact || "#";
  console.log(council);
  const pages = [
    {
      key: slugify("Overview of the planning process"),
      title: "Overview of the planning process",
      content: (
        <p className="govuk-body">
          Help understanding how planning applications are handled.
        </p>
      ),
    },
    {
      key: slugify("Application statuses"),
      title: "Application statuses",
      content: (
        <p className="govuk-body">
          What the statuses like 'assessment in progress' or 'determined' mean.
        </p>
      ),
    },
    {
      key: slugify("Important dates"),
      title: "Important dates",
      content: (
        <p className="govuk-body">
          Explains what things like 'valid from date' mean.
        </p>
      ),
    },
    {
      key: slugify("decisions"),
      title: "Decisions",
      content: (
        <p className="govuk-body">
          What kinds of outcomes different planning applications can have,
          because there can be more complexity than just 'granted' or 'refused'.
        </p>
      ),
    },
    {
      key: slugify("Application types"),
      title: "Application types",
      content: (
        <p className="govuk-body">
          The different sorts of applications that are published on the planning
          register, and what they are for.
        </p>
      ),
    },
    {
      key: slugify(
        "What to do if your concerns can't be addressed by planning",
      ),
      title: "What to do if your concerns can't be addressed by planning",
      content: (
        <p className="govuk-body">
          There are some concerns that your local planning authority can't
          address. Find out what you can do about these issues.
        </p>
      ),
    },
  ];

  return (
    <>
      <BackLink />
      <PageMain className="dpr-page-planning-process">
        <h1 className="govuk-heading-xl">
          Help using the Digital Planning Register
        </h1>
        <p className="govuk-body">
          In these pages you can find information to help you to understand the
          planning process, explanations of what specialised planning words
          mean, how you can engage with planning applications, and where you go
          to find out more.
        </p>
        <p className="govuk-body grid-row-extra-bottom-margin">
          If you cannot find the information you are looking for, you can always{" "}
          <Link className="govuk-link" href={councilLink}>
            contact your council
          </Link>
          for more help.
        </p>
        <h2 className="govuk-heading-l">Topics</h2>
        <ContentSignposting pages={pages} council={council} />

        {/* Uncomment if required */}
        {/* <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third-from-desktop">
            <ContentSidebar
              content={contentPlanningProcess()}
              withHeadings={true}
            />
          </div>

          <div className="govuk-grid-column-two-thirds-from-desktop">
            <ContentPage content={contentPlanningProcess()} />
          </div>
        </div> */}
      </PageMain>
    </>
  );
};
