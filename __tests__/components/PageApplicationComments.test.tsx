import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PageApplicationComments } from "@/components/PageApplicationComments";
import { createAppConfig } from "@mocks/appConfigFactory";
import { generatePagination } from "@mocks/dprApplicationFactory";
import { generateApplicationSubmission } from "@mocks/odpApplicationSubmission";

describe("PageApplicationComments", () => {
  it("renders comments when API returns data", async () => {
    const appConfig = createAppConfig("public-council-1");
    const pagination = generatePagination();
    const application = generateApplicationSubmission;

    render(
      <PageApplicationComments
        reference="123"
        application={application}
        appConfig={appConfig}
        params={{ council: "public-council-1", reference: "123" }}
        type="public"
        pagination={pagination}
        searchParams={{ page: 1, resultsPerPage: 10 }}
      />,
    );

    expect(await screen.findByText("Comment #1")).toBeInTheDocument();
  });
});
