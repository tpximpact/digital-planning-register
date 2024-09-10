import React from "react";
import CouncilCards from "@/components/council_cards";
import { MainContentTemplate } from "@/components/templates/MainContentTemplate";

const Main = () => {
  return (
    <MainContentTemplate>
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

      <h2 className="govuk-heading-m">
        Select your council to start exploring planning applications in your
        area
      </h2>
      <CouncilCards />
    </MainContentTemplate>
  );
};

export default Main;
