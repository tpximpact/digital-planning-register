/* eslint-disable react/no-unescaped-entities */
import { BackLink } from "../BackLink/BackLink";
import { PageMain } from "../PageMain";
import { getAppConfig } from "@/config";
import Link from "next/link";
import { ContentSignposting } from "../ContentSignposting";
import { PageHelpContent } from "./PageHelpContent";
export interface PageHelpProps {
  council: string;
}

export const PageHelp = ({ council }: PageHelpProps) => {
  const councilConfig = getAppConfig(council);
  const councilLink = councilConfig?.council?.contact;
  const pages = PageHelpContent;

  return (
    <>
      <BackLink />
      <PageMain className="dpr-page-planning-process">
        <h1 className="govuk-heading-xl">
          Help using the Digital Planning Register
        </h1>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <p className="govuk-body">
              In these pages you can find information to help you to understand
              the planning process, explanations of what specialised planning
              words mean, how you can engage with planning applications, and
              where you go to find out more.
            </p>
            <p className="govuk-body grid-row-extra-bottom-margin">
              If you cannot find the information you are looking for, you can
              always{" "}
              {councilLink ? (
                <Link className="govuk-link" href={councilLink}>
                  contact your council
                </Link>
              ) : (
                <span>contact your council</span>
              )}{" "}
              for more help.
            </p>
            <h2 className="govuk-heading-l">Topics</h2>
            <ContentSignposting pages={pages} council={council} />
          </div>
        </div>
      </PageMain>
    </>
  );
};
