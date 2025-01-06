import { AppConfig } from "@/config/types";
import { CouncilCards } from "@/components/CouncilCards";

export interface PageLandingProps {
  councils: AppConfig["councils"];
}

export const PageLanding = ({ councils }: PageLandingProps) => {
  return (
    <>
      <h1 className="govuk-heading-l">
        Welcome to the Digital Planning Register
      </h1>
      <p className="govuk-body">
        This site allows you to find planning applications submitted through the
        Open Digital Planning system for your local council planning authority.
      </p>
      <p className="govuk-body">
        Not all planning applications will be available through this register,
        and you may need to check individual council&apos;s websites to see what
        records are kept here.
      </p>

      {councils && councils.length > 0 ? (
        <>
          <CouncilCards councils={councils} />
        </>
      ) : null}
    </>
  );
};
