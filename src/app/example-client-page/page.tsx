"use client";

import React from "react";

import { trackClient } from "@/lib/DprAnalytics";
import { AClientComponent } from "@/components/a_client_component";
// import { AServerComponent } from "@/components/a_server_component";

const ExampleClientPage = () => {
  return (
    <div className="govuk-main-wrapper">
      <h1
        className="govuk-heading-l"
        onClick={() => {
          trackClient("Example client page title clicked", {
            message: "hello",
          });
        }}
      >
        Example page (also click me)
      </h1>
      {/* no can do! */}
      {/* <AServerComponent /> */}
      <br />
      <AClientComponent text="Hello" />
    </div>
  );
};

export default ExampleClientPage;
