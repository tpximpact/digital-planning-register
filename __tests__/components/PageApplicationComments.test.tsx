import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PageApplicationComments } from "@/components/PageApplicationComments";
import { createAppConfig } from "@mocks/appConfigFactory";
import {
  generatePagination,
  generateComment,
} from "@mocks/dprApplicationFactory";
import { generateApplicationSubmission } from "@mocks/odpApplicationSubmission";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => {
    const params = new URLSearchParams();
    return {
      get: (key: string) => params.get(key),
      set: (key: string, value: string) => params.set(key, value),
      toString: () => params.toString(),
    };
  },
}));

describe("PageApplicationComments", () => {
  it("renders comments when API returns data", async () => {
    const appConfig = createAppConfig("public-council-1");
    const comments = generateComment();
    const pagination = generatePagination();
    const application = generateApplicationSubmission;

    render(
      <PageApplicationComments
        reference="123"
        comments={[comments]}
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
