/* eslint-disable react/no-unescaped-entities */
import { BackLink } from "../BackLink/BackLink";
import { PageMain } from "../PageMain";
import Link from "next/link";
import { ContentSignposting } from "../ContentSignposting";
import { Council } from "@/config/types";
import { contentHelp } from "@/lib/help";
export interface PageHelpProps {
  councilConfig: Council;
}

export const PageHelp = ({ councilConfig }: PageHelpProps) => {
  const councilLink = councilConfig?.contact;

  const content = contentHelp(councilConfig);

  return (
    <>
      <BackLink />
      <PageMain>
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
            <ContentSignposting pages={content} council={councilConfig.slug} />
          </div>
        </div>
      </PageMain>
    </>
  );
};
