import React from "react";
import { cookies } from "next/headers";
import { ExampleSchemaProps, exampleServerAction } from "@/actions";
import { ApiResponse } from "@/types";
import { AServerComponent } from "@/components/a_server_component";
import { AClientComponent } from "@/components/a_client_component";
import { trackServer } from "@/lib/DprAnalytics";

async function fetchData(): Promise<ApiResponse<ExampleSchemaProps | null>> {
  const response = await exampleServerAction();

  trackServer("dataFetch", {
    message: `"data" fetched successfully`,
  });

  return response;
}

const ExampleServerPage = async () => {
  cookies();

  const response = await fetchData();
  console.log(response);

  return (
    <div className="govuk-main-wrapper">
      <h1 className="govuk-heading-l">Example page</h1>
      <p className="govuk-body">
        {response.data?.data.exampleKey
          ? response.data?.data.exampleKey
          : "not loaded"}
      </p>
      <AServerComponent />
      <br />
      <AClientComponent text="Client component" />
    </div>
  );
};

export default ExampleServerPage;
